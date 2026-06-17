"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, isSuperAdmin } from "@/lib/auth";
import { writeAudit } from "@/lib/audit";
import { MOTIF_VALUES, daysInclusive, getPolicy } from "@/lib/absence";
import { ABSENCE_MOTIF_MAP } from "@/lib/enums";

export type ActionResult = { ok: true } | { ok: false; error: string };

const recordSchema = z
  .object({
    agentId: z.string().min(1, "Agent requis."),
    motif: z.string().refine((v) => MOTIF_VALUES.includes(v), "Motif invalide."),
    startDate: z.string().min(1, "Date de début requise."),
    endDate: z.string().min(1, "Date de fin requise."),
    days: z.coerce.number().int().positive().max(366).optional(),
    note: z.string().trim().max(500).optional(),
  })
  .refine((d) => new Date(d.endDate) >= new Date(d.startDate), {
    message: "La date de fin doit être postérieure ou égale à la date de début.",
    path: ["endDate"],
  });

export type RecordInput = z.infer<typeof recordSchema>;

/** Le supérieur (ou l'admin) comptabilise une absence autorisée pour un agent. */
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
  const prevTotal = (await prisma.absenceRecord.aggregate({ where: { agentId: agent.id, year }, _sum: { days: true } }))._sum.days ?? 0;
  const newTotal = prevTotal + days;

  await prisma.absenceRecord.create({
    data: {
      agentId: agent.id,
      recordedById: user.id,
      motif: d.motif,
      startDate: start,
      endDate: end,
      days,
      note: d.note || undefined,
      year,
    },
  });

  // Alerte automatique quand le cumul franchit le seuil (au concerné + supérieur).
  if (prevTotal < policy.warningThresholdDays && newTotal >= policy.warningThresholdDays) {
    const motifLabel = ABSENCE_MOTIF_MAP[d.motif]?.label ?? d.motif;
    const agentName = `${agent.firstName} ${agent.lastName}`.trim();
    const recipients = new Set<string>([agent.id]);
    if (agent.managerId) recipients.add(agent.managerId);
    await prisma.notification.createMany({
      data: [...recipients].map((uid) => ({
        userId: uid,
        type: "ABSENCE_ALERT",
        title: "Seuil d'absences atteint",
        body:
          uid === agent.id
            ? `Vous avez cumulé ${newTotal} jour(s) d'absence en ${year} (seuil d'alerte : ${policy.warningThresholdDays} j, congé annuel : ${policy.annualQuotaDays} j). Dernier motif : ${motifLabel}.`
            : `${agentName} a cumulé ${newTotal} jour(s) d'absence en ${year} (seuil d'alerte : ${policy.warningThresholdDays} j). Dernier motif : ${motifLabel}.`,
        link: "/absences",
      })),
    });
  }

  await writeAudit({ userId: user.id, action: "create", module: "absence", entityType: "AbsenceRecord", entityId: agent.id, metadata: { motif: d.motif, days, year } });
  revalidatePath("/absences");
  return { ok: true };
}

export async function deleteAbsence(id: string): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Non authentifié." };

  const rec = await prisma.absenceRecord.findUnique({
    where: { id },
    select: { id: true, agent: { select: { managerId: true } } },
  });
  if (!rec) return { ok: false, error: "Enregistrement introuvable." };
  if (!isSuperAdmin(user) && rec.agent.managerId !== user.id)
    return { ok: false, error: "Vous n'êtes pas autorisé à supprimer cette absence." };

  await prisma.absenceRecord.delete({ where: { id } });
  await writeAudit({ userId: user.id, action: "delete", module: "absence", entityType: "AbsenceRecord", entityId: id });
  revalidatePath("/absences");
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
