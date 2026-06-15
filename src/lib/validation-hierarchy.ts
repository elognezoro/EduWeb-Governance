import "server-only";
import { prisma } from "./prisma";

/** Nom du workflow unique servant de hiérarchie de validation des activités. */
export const WF_NAME = "Hiérarchie de validation";

export interface HierarchyLevel {
  roleKey: string;
  name: string;
  /** Index 0-based du niveau dans la chaîne. */
  order: number;
}

/** Étapes ordonnées de la hiérarchie de validation active (vide si non configurée). */
export async function getValidationHierarchy(): Promise<HierarchyLevel[]> {
  const wf = await prisma.workflow.findFirst({
    where: { name: WF_NAME, isActive: true },
    include: { steps: { orderBy: { order: "asc" } } },
  });
  if (!wf) return [];
  const keys = wf.steps.map((s) => s.roleKey).filter((k): k is string => Boolean(k));
  if (keys.length === 0) return [];
  const roles = await prisma.role.findMany({ where: { key: { in: keys } }, select: { key: true, name: true } });
  const nameByKey = new Map(roles.map((r) => [r.key, r.name]));
  return wf.steps
    .filter((s) => s.roleKey)
    .map((s, i) => ({ roleKey: s.roleKey as string, name: nameByKey.get(s.roleKey as string) ?? (s.roleKey as string), order: i }));
}
