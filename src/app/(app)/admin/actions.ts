"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, hasPermission, isSuperAdmin } from "@/lib/auth";
import { writeAudit } from "@/lib/audit";
import { WF_NAME } from "@/lib/validation-hierarchy";

export type ActionResult = { ok: true } | { ok: false; error: string };

/** Admin système (super admin) ou administrateur (admin:manage / organization:manage). */
async function adminGuard() {
  const user = await getCurrentUser();
  if (!user) return { user: null, error: "Non authentifié." as const };
  const allowed =
    isSuperAdmin(user) || hasPermission(user, "admin:manage") || hasPermission(user, "organization:manage");
  if (!allowed) return { user, error: "Réservé à l'administrateur système et aux administrateurs." as const };
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
