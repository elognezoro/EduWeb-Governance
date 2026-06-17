"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, isSuperAdmin } from "@/lib/auth";
import { writeAudit } from "@/lib/audit";
import { MOTIF_VALUES, daysInclusive, getPolicy } from "@/lib/absence";
import { ABSENCE_MOTIF_MAP } from "@/lib/enums";

export type ActionResult = { ok: true } | { ok: false; error: string };

const dateFields = {
  motif: z.string().refine((v) => MOTIF_VALUES.includes(v), "Motif invalide."),
  startDate: z.string().min(1, "Date de début requise."),
  endDate: z.string().min(1, "Date de fin requise."),
  days: z.coerce.number().int().positive().max(366).optional(),
  note: z.string().trim().max(500).optional(),
};
const END_AFTER_START = { message: "La date de fin doit être postérieure ou égale à la date de début.", path: ["endDate"] };

const recordSchema = z
  .object({ agentId: z.string().min(1, "Agent requis."), ...dateFields })
  .refine((d) => new Date(d.endDate) >= new Date(d.startDate), END_AFTER_START);
const requestSchema = z
  .object({ ...dateFields })
  .refine((d) => new Date(d.endDate) >= new Date(d.startDate), END_AFTER_START);

export type RecordInput = z.infer<typeof recordSchema>;
export type RequestInput = z.infer<typeof requestSchema>;

type AgentLite = { id: string; firstName: string; lastName: string; managerId: string | null };

/** Total des jours **approuvés** d'un agent pour une année. */
async function approvedTotal(agentId: string, year: number): Promise<number> {
  return (await prisma.absenceRecord.aggregate({ where: { agentId, year, status: "APPROVED" }, _sum: { days: true } }))._sum.days ?? 0;
}

/** Alerte au franchissement du seuil (au concerné + supérieur). */
async function notifyThresholdCrossing(
  agent: AgentLite, prevTotal: number, newTotal: number, year: number, motif: string,
  policy: { warningThresholdDays: number; annualQuotaDays: number }
) {
  if (!(prevTotal < policy.warningThresholdDays && newTotal >= policy.warningThresholdDays)) return;
  const motifLabel = ABSENCE_MOTIF_MAP[motif]?.label ?? motif;
  const agentName = `${agent.firstName} ${agent.lastName}`.trim();
  const recipients = new Set<string>([agent.id]);
  if (agent.managerId) recipients.add(agent.managerId);
  await prisma.notification.createMany({
    data: [...recipients].map((uid) => ({
      userId: uid,
      type: "ABSENCE_ALERT",
      title: "Seuil d'absences atteint",
      body: uid === agent.id
        ? `Vous avez cumulé ${newTotal} jour(s) d'absence en ${year} (seuil d'alerte : ${policy.warningThresholdDays} j, congé annuel : ${policy.annualQuotaDays} j). Dernier motif : ${motifLabel}.`
        : `${agentName} a cumulé ${newTotal} jour(s) d'absence en ${year} (seuil d'alerte : ${policy.warningThresholdDays} j). Dernier motif : ${motifLabel}.`,
      link: "/absences",
    })),
  });
}

const fmtDay = new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short", year: "numeric" });

// ── Demande d'absence par l'agent (soumise au supérieur) ────────────────────
/** L'agent soumet une demande d'absence à son supérieur hiérarchique (statut PENDING). */
export async function requestAbsence(input: RequestInput): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Non authentifié." };

  const parsed = requestSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
  const d = parsed.data;

  const me = await prisma.user.findUnique({ where: { id: user.id }, select: { id: true, firstName: true, lastName: true, managerId: true } });
  if (!me) return { ok: false, error: "Compte introuvable." };
  if (!me.managerId) return { ok: false, error: "Aucun supérieur hiérarchique n'est défini pour votre compte. Contactez l'administrateur." };

  const start = new Date(d.startDate);
  const end = new Date(d.endDate);
  const days = d.days && d.days > 0 ? d.days : daysInclusive(start, end);
  const year = start.getFullYear();
  const motifLabel = ABSENCE_MOTIF_MAP[d.motif]?.label ?? d.motif;

  await prisma.absenceRecord.create({
    data: { agentId: me.id, recordedById: me.id, status: "PENDING", motif: d.motif, startDate: start, endDate: end, days, note: d.note || undefined, year },
  });

  await prisma.notification.create({
    data: {
      userId: me.managerId,
      type: "ABSENCE_REQUEST",
      title: "Demande d'absence à valider",
      body: `${me.firstName} ${me.lastName} demande ${days} j (${motifLabel}) du ${fmtDay.format(start)} au ${fmtDay.format(end)}.`,
      link: "/absences",
    },
  });

  await writeAudit({ userId: me.id, action: "request", module: "absence", entityType: "AbsenceRecord", entityId: me.id, metadata: { motif: d.motif, days, year } });
  revalidatePath("/absences");
  revalidatePath("/dashboard");
  return { ok: true };
}

// ── Décision du supérieur sur une demande ───────────────────────────────────
const decideSchema = z.object({
  id: z.string().min(1),
  decision: z.enum(["APPROVE", "REFUSE"]),
  note: z.string().trim().max(500).optional(),
});
export type DecideInput = z.infer<typeof decideSchema>;

/** Le supérieur (ou l'admin) approuve ou refuse une demande d'absence en attente. */
export async function decideAbsence(input: DecideInput): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Non authentifié." };

  const parsed = decideSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
  const d = parsed.data;

  const rec = await prisma.absenceRecord.findUnique({
    where: { id: d.id },
    select: { id: true, status: true, motif: true, days: true, year: true, startDate: true, endDate: true,
      agent: { select: { id: true, firstName: true, lastName: true, managerId: true } } },
  });
  if (!rec) return { ok: false, error: "Demande introuvable." };
  if (!isSuperAdmin(user) && rec.agent.managerId !== user.id)
    return { ok: false, error: "Vous n'êtes pas le supérieur hiérarchique de cet agent." };
  if (rec.status !== "PENDING") return { ok: false, error: "Cette demande a déjà été traitée." };

  const approved = d.decision === "APPROVE";
  const policy = await getPolicy(prisma);
  const prevTotal = approved ? await approvedTotal(rec.agent.id, rec.year) : 0;

  // Transition atomique : le garde « PENDING » est dans le WHERE de l'écriture.
  // Si une autre décision a été commitée entre-temps (double-clic, 2 sessions),
  // count === 0 et on s'arrête avant tout effet de bord (anti-rejeu).
  const updated = await prisma.absenceRecord.updateMany({
    where: { id: rec.id, status: "PENDING" },
    data: { status: approved ? "APPROVED" : "REFUSED", decidedById: user.id, decidedAt: new Date(), decisionNote: d.note || undefined },
  });
  if (updated.count === 0) return { ok: false, error: "Cette demande a déjà été traitée." };

  const motifLabel = ABSENCE_MOTIF_MAP[rec.motif]?.label ?? rec.motif;
  await prisma.notification.create({
    data: {
      userId: rec.agent.id,
      type: "ABSENCE_DECISION",
      title: approved ? "Demande d'absence approuvée" : "Demande d'absence refusée",
      body: `${approved ? "Approuvée" : "Refusée"} : ${motifLabel}, ${rec.days} j du ${fmtDay.format(rec.startDate)} au ${fmtDay.format(rec.endDate)}.${d.note ? ` Motif : ${d.note}` : ""}`,
      link: "/absences",
    },
  });

  if (approved) await notifyThresholdCrossing(rec.agent, prevTotal, prevTotal + rec.days, rec.year, rec.motif, policy);

  await writeAudit({ userId: user.id, action: approved ? "approve" : "refuse", module: "absence", entityType: "AbsenceRecord", entityId: rec.id });
  revalidatePath("/absences");
  revalidatePath("/dashboard");
  return { ok: true };
}

// ── Enregistrement direct par le supérieur (validé d'office) ────────────────
/** Le supérieur (ou l'admin) comptabilise directement une absence approuvée. */
export async function recordAbsence(input: RecordInput): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Non authentifié." };

  const parsed = recordSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
  const d = parsed.data;

  const agent = await prisma.user.findUnique({
    where: { id: d.agentId },
    select: { id: true, firstName: true, lastName: true, managerId: true, deletedAt: true },
  });
  if (!agent || agent.deletedAt) return { ok: false, error: "Agent introuvable." };
  if (!isSuperAdmin(user) && agent.managerId !== user.id)
    return { ok: false, error: "Vous n'êtes pas le supérieur hiérarchique de cet agent." };

  const start = new Date(d.startDate);
  const end = new Date(d.endDate);
  const days = d.days && d.days > 0 ? d.days : daysInclusive(start, end);
  const year = start.getFullYear();

  const policy = await getPolicy(prisma);
  const prevTotal = await approvedTotal(agent.id, year);

  await prisma.absenceRecord.create({
    data: { agentId: agent.id, recordedById: user.id, status: "APPROVED", decidedById: user.id, decidedAt: new Date(),
      motif: d.motif, startDate: start, endDate: end, days, note: d.note || undefined, year },
  });

  await notifyThresholdCrossing(agent, prevTotal, prevTotal + days, year, d.motif, policy);

  await writeAudit({ userId: user.id, action: "create", module: "absence", entityType: "AbsenceRecord", entityId: agent.id, metadata: { motif: d.motif, days, year } });
  revalidatePath("/absences");
  revalidatePath("/dashboard");
  return { ok: true };
}

export async function deleteAbsence(id: string): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Non authentifié." };

  const rec = await prisma.absenceRecord.findUnique({
    where: { id },
    select: { id: true, agentId: true, status: true, agent: { select: { managerId: true } } },
  });
  if (!rec) return { ok: false, error: "Enregistrement introuvable." };

  const isManager = isSuperAdmin(user) || rec.agent.managerId === user.id;
  const canCancelOwn = rec.agentId === user.id && rec.status === "PENDING"; // l'agent annule sa propre demande en attente
  if (!isManager && !canCancelOwn) return { ok: false, error: "Vous n'êtes pas autorisé à supprimer cet enregistrement." };

  await prisma.absenceRecord.delete({ where: { id } });
  await writeAudit({ userId: user.id, action: "delete", module: "absence", entityType: "AbsenceRecord", entityId: id });
  revalidatePath("/absences");
  revalidatePath("/dashboard");
  return { ok: true };
}

const policySchema = z.object({
  annualQuotaDays: z.coerce.number().int().min(1, "Quota annuel ≥ 1.").max(366),
  warningThresholdDays: z.coerce.number().int().min(1, "Seuil ≥ 1.").max(366),
});

export type PolicyInput = z.infer<typeof policySchema>;

/** Admin ou supérieur : règle le quota annuel + le seuil d'alerte (politique globale). */
export async function saveAbsencePolicy(input: PolicyInput): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Non authentifié." };

  const isManager = (await prisma.user.count({ where: { managerId: user.id, deletedAt: null } })) > 0;
  if (!isSuperAdmin(user) && !isManager)
    return { ok: false, error: "Seuls un administrateur ou un supérieur hiérarchique peuvent régler la politique." };

  const parsed = policySchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
  const d = parsed.data;

  await prisma.absencePolicy.upsert({
    where: { scope: "GLOBAL" },
    create: { scope: "GLOBAL", annualQuotaDays: d.annualQuotaDays, warningThresholdDays: d.warningThresholdDays, updatedById: user.id },
    update: { annualQuotaDays: d.annualQuotaDays, warningThresholdDays: d.warningThresholdDays, updatedById: user.id },
  });

  await writeAudit({ userId: user.id, action: "update", module: "absence", entityType: "AbsencePolicy", entityId: "GLOBAL", metadata: d });
  revalidatePath("/absences");
  return { ok: true };
}
