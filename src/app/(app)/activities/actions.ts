"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, hasPermission, roleKeys, isSuperAdmin } from "@/lib/auth";
import { getValidationHierarchy } from "@/lib/validation-hierarchy";
import { writeAudit } from "@/lib/audit";

export type ActionResult = { ok: true; id?: string } | { ok: false; error: string };

const activitySchema = z.object({
  title: z.string().trim().min(3, "Le titre doit comporter au moins 3 caractères."),
  description: z.string().trim().optional(),
  structureId: z.string().optional(),
  periodStart: z.string().optional(),
  periodEnd: z.string().optional(),
  legalTextIds: z.array(z.string()).optional(),
});

export type ActivityInput = z.infer<typeof activitySchema>;

function toDate(v?: string) {
  if (!v) return undefined;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

// ── Création ──────────────────────────────────────────────────────────────────
export async function createActivity(input: ActivityInput): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Non authentifié." };

  const parsed = activitySchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
  const d = parsed.data;

  const activity = await prisma.activity.create({
    data: {
      title: d.title,
      authorId: user.id,
      organizationId: user.organizationId ?? undefined,
      structureId: d.structureId || user.structureId || undefined,
      countryId: user.countryId ?? undefined,
      status: "DRAFT",
      data: JSON.stringify({ description: d.description ?? "" }),
      periodStart: toDate(d.periodStart),
      periodEnd: toDate(d.periodEnd),
      legalTexts: d.legalTextIds?.length
        ? { connect: d.legalTextIds.map((id) => ({ id })) }
        : undefined,
    },
  });

  await writeAudit({ userId: user.id, action: "create", module: "activity", entityType: "Activity", entityId: activity.id });
  revalidatePath("/activities");
  redirect(`/activities/${activity.id}`);
}

// ── Mise à jour (brouillon / à corriger) ──────────────────────────────────────
export async function updateActivity(id: string, input: ActivityInput): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Non authentifié." };

  const existing = await prisma.activity.findUnique({ where: { id } });
  if (!existing || existing.deletedAt) return { ok: false, error: "Activité introuvable." };
  if (existing.authorId !== user.id && !hasPermission(user, "activity:update"))
    return { ok: false, error: "Vous n'êtes pas autorisé à modifier cette activité." };
  if (!["DRAFT", "TO_CORRECT", "REJECTED"].includes(existing.status))
    return { ok: false, error: "Seule une activité en brouillon ou à corriger peut être modifiée." };

  const parsed = activitySchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
  const d = parsed.data;

  await prisma.activity.update({
    where: { id },
    data: {
      title: d.title,
      structureId: d.structureId || undefined,
      data: JSON.stringify({ description: d.description ?? "" }),
      periodStart: toDate(d.periodStart),
      periodEnd: toDate(d.periodEnd),
      legalTexts: { set: (d.legalTextIds ?? []).map((tid) => ({ id: tid })) },
    },
  });

  await writeAudit({ userId: user.id, action: "update", module: "activity", entityType: "Activity", entityId: id });
  revalidatePath(`/activities/${id}`);
  revalidatePath("/activities");
  return { ok: true, id };
}

// ── Soumission ────────────────────────────────────────────────────────────────
export async function submitActivity(id: string): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Non authentifié." };

  const activity = await prisma.activity.findUnique({ where: { id } });
  if (!activity || activity.deletedAt) return { ok: false, error: "Activité introuvable." };
  if (activity.authorId !== user.id) return { ok: false, error: "Seul l'auteur peut soumettre cette activité." };
  if (!["DRAFT", "TO_CORRECT", "REJECTED"].includes(activity.status))
    return { ok: false, error: "Cette activité ne peut pas être soumise dans son état actuel." };

  await prisma.$transaction([
    // La soumission (re)démarre la chaîne de validation au premier niveau.
    prisma.activity.update({ where: { id }, data: { status: "SUBMITTED", submittedAt: new Date(), validationLevel: 0 } }),
    prisma.validationAction.create({
      data: { activityId: id, actorId: user.id, decision: "SUBMIT", fromStatus: activity.status, toStatus: "SUBMITTED" },
    }),
  ]);

  await writeAudit({ userId: user.id, action: "submit", module: "activity", entityType: "Activity", entityId: id });
  revalidatePath(`/activities/${id}`);
  revalidatePath("/activities");
  revalidatePath("/validation");
  return { ok: true };
}

// ── Suppression (soft delete) ────────────────────────────────────────────────
export async function deleteActivity(id: string): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Non authentifié." };

  const activity = await prisma.activity.findUnique({ where: { id } });
  if (!activity || activity.deletedAt) return { ok: false, error: "Activité introuvable." };
  if (activity.authorId !== user.id && !hasPermission(user, "activity:delete"))
    return { ok: false, error: "Vous n'êtes pas autorisé à supprimer cette activité." };

  await prisma.activity.update({ where: { id }, data: { deletedAt: new Date() } });
  await writeAudit({ userId: user.id, action: "delete", module: "activity", entityType: "Activity", entityId: id });
  revalidatePath("/activities");
  redirect("/activities");
}

// ── Décisions de validation hiérarchique ──────────────────────────────────────
const DECISION_TO_STATUS: Record<string, string> = {
  VALIDATE: "VALIDATED",
  REJECT: "REJECTED",
  REQUEST_CORRECTION: "TO_CORRECT",
  CONSOLIDATE: "CONSOLIDATED",
};

async function decide(
  id: string,
  decision: "VALIDATE" | "REJECT" | "REQUEST_CORRECTION" | "CONSOLIDATE",
  comment?: string
): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Non authentifié." };
  if (!hasPermission(user, "activity:validate"))
    return { ok: false, error: "Vous n'avez pas la permission de valider." };

  const activity = await prisma.activity.findUnique({ where: { id } });
  if (!activity || activity.deletedAt) return { ok: false, error: "Activité introuvable." };

  const validStates = ["SUBMITTED", "IN_REVIEW", "TO_CORRECT", "VALIDATED"];
  if (!validStates.includes(activity.status))
    return { ok: false, error: "Cette activité n'est pas dans un état validable." };
  if (decision === "CONSOLIDATE" && activity.status !== "VALIDATED")
    return { ok: false, error: "Seule une activité validée peut être consolidée." };
  if ((decision === "REJECT" || decision === "REQUEST_CORRECTION") && !comment?.trim())
    return { ok: false, error: "Un commentaire est requis pour un rejet ou une demande de correction." };

  // Statut cible + niveau hiérarchique résultant.
  const hierarchy = decision === "VALIDATE" ? await getValidationHierarchy() : [];
  let toStatus = DECISION_TO_STATUS[decision];
  let newLevel = activity.validationLevel ?? 0;
  const notifType: string =
    decision === "VALIDATE" ? "VALIDATED" : decision === "REJECT" ? "REJECTED" : decision === "REQUEST_CORRECTION" ? "CORRECTION" : "VALIDATED";
  let notifTitle =
    decision === "VALIDATE" ? "Activité validée"
    : decision === "REJECT" ? "Activité rejetée"
    : decision === "REQUEST_CORRECTION" ? "Correction demandée"
    : "Activité consolidée";
  let notifBody = `« ${activity.title} » — ${comment?.trim() || "voir le détail"}.`;

  if (decision === "VALIDATE" && hierarchy.length > 0) {
    const level = Math.min(Math.max(activity.validationLevel ?? 0, 0), hierarchy.length - 1);
    const step = hierarchy[level];
    // Seul le rôle du niveau courant (ou l'admin système) peut statuer à ce niveau.
    if (!isSuperAdmin(user) && !roleKeys(user).includes(step.roleKey)) {
      return {
        ok: false,
        error: `Cette activité attend la validation du niveau « ${step.name} » (${level + 1}/${hierarchy.length}). Vous n'êtes pas habilité à statuer à ce niveau.`,
      };
    }
    const isLast = level + 1 >= hierarchy.length;
    toStatus = isLast ? "VALIDATED" : "IN_REVIEW";
    newLevel = isLast ? hierarchy.length : level + 1;
    if (!isLast) {
      notifTitle = `Validation intermédiaire (${level + 1}/${hierarchy.length})`;
      notifBody = `« ${activity.title} » validée au niveau « ${step.name} ». En attente du niveau « ${hierarchy[level + 1].name} ».`;
    }
  } else if (decision === "REJECT" || decision === "REQUEST_CORRECTION") {
    newLevel = 0; // la chaîne repart de zéro à la prochaine soumission
  }

  await prisma.$transaction([
    prisma.activity.update({ where: { id }, data: { status: toStatus, validationLevel: newLevel } }),
    prisma.validationAction.create({
      data: { activityId: id, actorId: user.id, decision, comment: comment?.trim() || undefined, fromStatus: activity.status, toStatus },
    }),
    prisma.notification.create({
      data: { userId: activity.authorId, type: notifType, title: notifTitle, body: notifBody, link: `/activities/${id}` },
    }),
  ]);

  await writeAudit({ userId: user.id, action: decision.toLowerCase(), module: "validation", entityType: "Activity", entityId: id, metadata: { comment, level: newLevel } });
  revalidatePath(`/activities/${id}`);
  revalidatePath("/validation");
  revalidatePath("/activities");
  revalidatePath("/dashboard");
  return { ok: true };
}

export async function validateActivity(id: string, comment?: string) {
  return decide(id, "VALIDATE", comment);
}
export async function rejectActivity(id: string, comment: string) {
  return decide(id, "REJECT", comment);
}
export async function requestCorrection(id: string, comment: string) {
  return decide(id, "REQUEST_CORRECTION", comment);
}
export async function consolidateActivity(id: string) {
  return decide(id, "CONSOLIDATE");
}
