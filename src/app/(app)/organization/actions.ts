"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, hasPermission } from "@/lib/auth";
import { writeAudit } from "@/lib/audit";

export type ActionResult = { ok: true; id?: string } | { ok: false; error: string };

async function guard() {
  const user = await getCurrentUser();
  if (!user) return { user: null, error: "Non authentifié." as const };
  if (!hasPermission(user, "organization:manage")) return { user, error: "Permission requise (organization:manage)." as const };
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

export async function deleteStructure(id: string): Promise<ActionResult> {
  const g = await guard();
  if (g.error) return { ok: false, error: g.error };

  const children = await prisma.structure.count({ where: { parentId: id, deletedAt: null } });
  if (children > 0) return { ok: false, error: "Supprimez ou rattachez d'abord les sous-structures." };

  await prisma.structure.update({ where: { id }, data: { deletedAt: new Date() } });
  await writeAudit({ userId: g.user!.id, action: "delete", module: "organization", entityType: "Structure", entityId: id });
  revalidatePath("/organization");
  redirect("/organization");
}
