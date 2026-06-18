"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, hasPermission, isSuperAdmin } from "@/lib/auth";
import { writeAudit } from "@/lib/audit";

export type ActionResult = { ok: true; id?: string } | { ok: false; error: string };

async function guard() {
  const user = await getCurrentUser();
  if (!user) return { user: null, error: "Non authentifié." as const };
  if (!hasPermission(user, "organization:manage")) return { user, error: "Permission requise (organization:manage)." as const };
  return { user, error: null };
}

/** Suppressions (structures, organisations) : réservées au super administrateur. */
async function superGuard() {
  const user = await getCurrentUser();
  if (!user) return { user: null, error: "Non authentifié." as const };
  if (!isSuperAdmin(user)) return { user, error: "Suppression réservée au super administrateur." as const };
  return { user, error: null };
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50);
}

const clean = (v?: string) => (v && v.length > 0 ? v : undefined);

// ── Organisation ──────────────────────────────────────────────────────────────
const orgSchema = z.object({
  name: z.string().trim().min(2, "Nom requis (2 caractères min.)."),
  type: z.string().optional(),
  countryId: z.string().optional(),
});

export async function createOrganization(input: z.infer<typeof orgSchema>): Promise<ActionResult> {
  const g = await guard();
  if (g.error) return { ok: false, error: g.error };
  const parsed = orgSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
  const d = parsed.data;

  const base = slugify(d.name) || "organisation";
  let slug = base;
  let i = 2;
  while (await prisma.organization.findUnique({ where: { slug } })) slug = `${base}-${i++}`;

  const org = await prisma.organization.create({
    data: { name: d.name, slug, type: clean(d.type), countryId: clean(d.countryId) },
  });
  await writeAudit({ userId: g.user!.id, action: "create", module: "organization", entityType: "Organization", entityId: org.id });
  revalidatePath("/organization");
  redirect("/organization");
}

// ── Structure ─────────────────────────────────────────────────────────────────
const structureSchema = z.object({
  name: z.string().trim().min(2, "Nom requis (2 caractères min.)."),
  type: z.string().min(1, "Type requis."),
  organizationId: z.string().min(1, "Organisation requise."),
  parentId: z.string().optional(),
  ministryId: z.string().optional(),
  countryId: z.string().optional(),
  regionId: z.string().optional(),
  managerId: z.string().optional(),
});
export type StructureInput = z.infer<typeof structureSchema>;

/** Subdivisions administratives d'un pays (pour le formulaire de structure). */
export async function regionsForCountryId(countryId: string): Promise<{ id: string; name: string }[]> {
  const user = await getCurrentUser();
  if (!user || !countryId) return [];
  return prisma.region.findMany({ where: { countryId }, orderBy: { name: "asc" }, select: { id: true, name: true } });
}

export async function createStructure(input: StructureInput): Promise<ActionResult> {
  const g = await guard();
  if (g.error) return { ok: false, error: g.error };
  const parsed = structureSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
  const d = parsed.data;

  const created = await prisma.structure.create({
    data: {
      name: d.name,
      type: d.type,
      organizationId: d.organizationId,
      parentId: clean(d.parentId),
      ministryId: clean(d.ministryId),
      countryId: clean(d.countryId),
      regionId: clean(d.regionId),
      managerId: clean(d.managerId),
    },
  });
  await writeAudit({ userId: g.user!.id, action: "create", module: "organization", entityType: "Structure", entityId: created.id });
  revalidatePath("/organization");
  redirect("/organization");
}

export async function updateStructure(id: string, input: StructureInput): Promise<ActionResult> {
  const g = await guard();
  if (g.error) return { ok: false, error: g.error };
  const parsed = structureSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
  const d = parsed.data;

  if (d.parentId === id) return { ok: false, error: "Une structure ne peut pas être son propre parent." };

  await prisma.structure.update({
    where: { id },
    data: {
      name: d.name,
      type: d.type,
      organizationId: d.organizationId,
      parentId: clean(d.parentId),
      ministryId: clean(d.ministryId) ?? null,
      countryId: clean(d.countryId),
      regionId: clean(d.regionId),
      managerId: clean(d.managerId),
    },
  });
  await writeAudit({ userId: g.user!.id, action: "update", module: "organization", entityType: "Structure", entityId: id });
  revalidatePath("/organization");
  return { ok: true, id };
}

// ── Déplacement d'une structure dans l'organigramme (glisser-déposer) ───────────
const moveSchema = z.object({
  id: z.string().min(1),
  parentId: z.string().nullable().optional(),      // null = racine ; absent = inchangé
  ministryId: z.string().nullable().optional(),    // null = détaché d'un ministère
  organizationId: z.string().optional(),
});
export type MoveStructureInput = z.infer<typeof moveSchema>;

export async function moveStructure(input: MoveStructureInput): Promise<ActionResult> {
  const g = await guard();
  if (g.error) return { ok: false, error: g.error };
  const parsed = moveSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
  const d = parsed.data;

  // Arbre complet : sert à la garde anti-cycle ET à la propagation aux descendants.
  const all = await prisma.structure.findMany({ where: { deletedAt: null }, select: { id: true, parentId: true } });
  const parentOf = new Map(all.map((s) => [s.id, s.parentId]));

  // Garde anti-cycle : le nouveau parent ne peut être la structure elle-même
  // ni l'un de ses descendants.
  if (d.parentId) {
    if (d.parentId === d.id) return { ok: false, error: "Une structure ne peut pas être son propre parent." };
    let cur: string | null = d.parentId;
    const seen = new Set<string>();
    while (cur) {
      if (cur === d.id) return { ok: false, error: "Déplacement impossible : cela créerait un cycle hiérarchique." };
      if (seen.has(cur)) break;
      seen.add(cur);
      cur = parentOf.get(cur) ?? null;
    }
  }

  // Sous-arbre déplacé : les descendants suivent le ministère / l'organisation du nœud déplacé
  // (leur structure interne — parentId — est conservée).
  const childrenOf = new Map<string, string[]>();
  for (const s of all) if (s.parentId) (childrenOf.get(s.parentId) ?? childrenOf.set(s.parentId, []).get(s.parentId)!).push(s.id);
  const descendants: string[] = [];
  const visited = new Set<string>([d.id]);
  const stack = [d.id];
  while (stack.length) {
    const curId = stack.pop()!;
    for (const childId of childrenOf.get(curId) ?? []) {
      if (!visited.has(childId)) { visited.add(childId); descendants.push(childId); stack.push(childId); }
    }
  }

  const subtreeData = {
    ministryId: d.ministryId,
    ...(d.organizationId ? { organizationId: d.organizationId } : {}),
  };

  await prisma.$transaction([
    prisma.structure.update({
      where: { id: d.id },
      data: { parentId: d.parentId, ...subtreeData },
    }),
    ...(descendants.length
      ? [prisma.structure.updateMany({ where: { id: { in: descendants } }, data: subtreeData })]
      : []),
  ]);
  await writeAudit({ userId: g.user!.id, action: "move", module: "organization", entityType: "Structure", entityId: d.id, metadata: { parentId: d.parentId, ministryId: d.ministryId, descendants: descendants.length } });
  revalidatePath("/organization");
  return { ok: true };
}

/** Logique partagée de suppression (douce) d'une structure. */
async function softDeleteStructure(id: string, userId: string): Promise<ActionResult> {
  const children = await prisma.structure.count({ where: { parentId: id, deletedAt: null } });
  if (children > 0) return { ok: false, error: "Supprimez ou rattachez d'abord les sous-structures." };
  await prisma.structure.update({ where: { id }, data: { deletedAt: new Date() } });
  await writeAudit({ userId, action: "delete", module: "organization", entityType: "Structure", entityId: id });
  return { ok: true, id };
}

/** Suppression depuis la fiche structure : redirige vers l'organigramme en cas de succès. */
export async function deleteStructure(id: string): Promise<ActionResult> {
  const g = await superGuard();
  if (g.error) return { ok: false, error: g.error };
  const res = await softDeleteStructure(id, g.user!.id);
  if (!res.ok) return res;
  revalidatePath("/organization");
  redirect("/organization");
}

/** Suppression « en place » depuis l'organigramme : renvoie le résultat (le client rafraîchit). */
export async function deleteStructureInline(id: string): Promise<ActionResult> {
  const g = await superGuard();
  if (g.error) return { ok: false, error: g.error };
  const res = await softDeleteStructure(id, g.user!.id);
  if (res.ok) revalidatePath("/organization");
  return res;
}

/** Suppression (douce) d'une organisation et, en cascade, de ses structures rattachées. */
export async function deleteOrganization(id: string): Promise<ActionResult> {
  const g = await superGuard();
  if (g.error) return { ok: false, error: g.error };

  const org = await prisma.organization.findFirst({ where: { id, deletedAt: null }, select: { id: true } });
  if (!org) return { ok: false, error: "Organisation introuvable." };

  const now = new Date();
  await prisma.$transaction([
    prisma.structure.updateMany({ where: { organizationId: id, deletedAt: null }, data: { deletedAt: now } }),
    prisma.organization.update({ where: { id }, data: { deletedAt: now } }),
  ]);
  await writeAudit({ userId: g.user!.id, action: "delete", module: "organization", entityType: "Organization", entityId: id });
  revalidatePath("/organization");
  return { ok: true, id };
}
