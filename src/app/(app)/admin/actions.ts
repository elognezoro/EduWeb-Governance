"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, isSuperAdmin } from "@/lib/auth";
import { writeAudit } from "@/lib/audit";
import { WF_NAME } from "@/lib/validation-hierarchy";
import { setInactivityTimeoutMinutes } from "@/lib/app-settings";

export type ActionResult = { ok: true } | { ok: false; error: string };

/** Zone Administration : réservée à l'administrateur système (super administrateur). */
async function adminGuard() {
  const user = await getCurrentUser();
  if (!user) return { user: null, error: "Non authentifié." as const };
  if (!isSuperAdmin(user)) return { user, error: "Action réservée à l'administrateur système (super administrateur)." as const };
  return { user, error: null };
}

/**
 * Définit la hiérarchie de validation : une chaîne ordonnée de rôles de gouvernance.
 * Un tableau vide désactive la hiérarchie (retour à la validation en une étape).
 */
export async function saveValidationHierarchy(roleKeys: string[]): Promise<ActionResult> {
  const g = await adminGuard();
  if (g.error) return { ok: false, error: g.error };

  // Ne conserver que des rôles de gouvernance existants, sans doublon, dans l'ordre fourni.
  const valid = await prisma.role.findMany({
    where: { key: { in: [...new Set(roleKeys)] }, scope: "GOVERNANCE" },
    select: { key: true },
  });
  const validSet = new Set(valid.map((r) => r.key));
  const seen = new Set<string>();
  const finalKeys = roleKeys.filter((k) => validSet.has(k) && !seen.has(k) && (seen.add(k), true));

  const steps = finalKeys.map((k, i) => ({ order: i, name: `Niveau ${i + 1}`, roleKey: k }));
  const existing = await prisma.workflow.findFirst({ where: { name: WF_NAME }, select: { id: true } });

  if (existing) {
    await prisma.$transaction([
      prisma.workflowStep.deleteMany({ where: { workflowId: existing.id } }),
      prisma.workflow.update({
        where: { id: existing.id },
        data: { isActive: true, steps: { create: steps } },
      }),
    ]);
  } else {
    await prisma.workflow.create({
      data: {
        name: WF_NAME,
        description: "Chaîne de validation hiérarchique des activités.",
        isActive: true,
        steps: { create: steps },
      },
    });
  }

  await writeAudit({ userId: g.user!.id, action: "set_hierarchy", module: "admin", metadata: { roleKeys: finalKeys } });
  revalidatePath("/admin");
  revalidatePath("/validation");
  return { ok: true };
}

/**
 * Délai d'inactivité global avant déconnexion automatique de toute session.
 * Réservé au super administrateur. `minutes` = null désactive la fonction.
 */
export async function saveInactivityTimeout(minutes: number | null): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user || !isSuperAdmin(user)) return { ok: false, error: "Action réservée au super administrateur." };

  let value: number | null = null;
  if (minutes !== null && minutes !== undefined) {
    if (!Number.isInteger(minutes) || minutes < 1 || minutes > 1440) {
      return { ok: false, error: "Le délai doit être un entier entre 1 et 1440 minutes (24 h)." };
    }
    value = minutes;
  }

  await setInactivityTimeoutMinutes(value, user.id);
  await writeAudit({ userId: user.id, action: "set_inactivity_timeout", module: "admin", metadata: { minutes: value } });
  revalidatePath("/", "layout");
  revalidatePath("/admin");
  return { ok: true };
}
