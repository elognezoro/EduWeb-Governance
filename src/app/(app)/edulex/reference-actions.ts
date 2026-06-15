"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, hasPermission } from "@/lib/auth";
import { writeAudit } from "@/lib/audit";

export type ActionResult = { ok: true } | { ok: false; error: string };

const clean = (v?: string) => (v && v.length > 0 ? v : undefined);

async function guard() {
  const user = await getCurrentUser();
  if (!user) return { user: null, error: "Non authentifié." as const };
  if (!hasPermission(user, "edulex:manage")) return { user, error: "Permission requise (edulex:manage)." as const };
  return { user, error: null };
}

const ministrySchema = z.object({ name: z.string().trim().min(2, "Nom requis."), code: z.string().trim().optional(), countryId: z.string().min(1, "Pays requis.") });
export async function createMinistry(input: z.infer<typeof ministrySchema>): Promise<ActionResult> {
  const g = await guard();
  if (g.error) return { ok: false, error: g.error };
  const p = ministrySchema.safeParse(input);
  if (!p.success) return { ok: false, error: p.error.issues[0].message };
  const max = await prisma.ministry.aggregate({ where: { countryId: p.data.countryId }, _max: { order: true } });
  // Rattache le ministère au gouvernement en vigueur du pays (s'il existe).
  const currentGov = await prisma.government.findFirst({ where: { countryId: p.data.countryId, effectiveDate: { lte: new Date() } }, orderBy: { effectiveDate: "desc" }, select: { id: true } });
  const m = await prisma.ministry.create({ data: { name: p.data.name, code: clean(p.data.code)?.toUpperCase(), order: (max._max.order ?? 0) + 1, countryId: p.data.countryId, governmentId: currentGov?.id } });
  await writeAudit({ userId: g.user!.id, action: "create", module: "edulex", entityType: "Ministry", entityId: m.id });
  revalidatePath("/edulex/ministries");
  return { ok: true };
}

const sectorSchema = z.object({ name: z.string().trim().min(2, "Nom requis."), code: z.string().trim().optional(), countryId: z.string().optional() });
export async function createSector(input: z.infer<typeof sectorSchema>): Promise<ActionResult> {
  const g = await guard();
  if (g.error) return { ok: false, error: g.error };
  const p = sectorSchema.safeParse(input);
  if (!p.success) return { ok: false, error: p.error.issues[0].message };
  const s = await prisma.sector.create({ data: { name: p.data.name, code: clean(p.data.code)?.toUpperCase(), countryId: clean(p.data.countryId) } });
  await writeAudit({ userId: g.user!.id, action: "create", module: "edulex", entityType: "Sector", entityId: s.id });
  revalidatePath("/edulex/sectors");
  return { ok: true };
}

const countrySchema = z.object({
  name: z.string().trim().min(2, "Nom requis."),
  code: z.string().trim().min(2, "Code ISO requis."),
  namespace: z.string().trim().optional(),
  flag: z.string().trim().optional(),
});
export async function createCountry(input: z.infer<typeof countrySchema>): Promise<ActionResult> {
  const g = await guard();
  if (g.error) return { ok: false, error: g.error };
  const p = countrySchema.safeParse(input);
  if (!p.success) return { ok: false, error: p.error.issues[0].message };
  const code = p.data.code.toUpperCase();
  if (await prisma.country.findUnique({ where: { code } })) return { ok: false, error: "Ce code pays existe déjà." };
  const count = await prisma.country.count();
  const c = await prisma.country.create({ data: { name: p.data.name, code, namespace: clean(p.data.namespace), flag: clean(p.data.flag), order: count + 1 } });
  await writeAudit({ userId: g.user!.id, action: "create", module: "edulex", entityType: "Country", entityId: c.id });
  revalidatePath("/edulex/countries");
  return { ok: true };
}

// ── Suppression des ministères ─────────────────────────────────────────────────
export async function deleteMinistry(id: string): Promise<ActionResult> {
  const g = await guard();
  if (g.error) return { ok: false, error: g.error };
  try {
    await prisma.ministry.delete({ where: { id } });
  } catch {
    return { ok: false, error: "Suppression impossible : ce ministère est encore référencé." };
  }
  await writeAudit({ userId: g.user!.id, action: "delete", module: "edulex", entityType: "Ministry", entityId: id });
  revalidatePath("/edulex/ministries");
  return { ok: true };
}

export async function deleteMinistries(ids: string[]): Promise<{ ok: true; deleted: number } | { ok: false; error: string }> {
  const g = await guard();
  if (g.error) return { ok: false, error: g.error };
  const targets = [...new Set(ids)];
  if (!targets.length) return { ok: false, error: "Aucun ministère sélectionné." };
  let deleted = 0;
  for (const id of targets) {
    try { await prisma.ministry.delete({ where: { id } }); deleted++; } catch { /* référencé : on ignore */ }
  }
  await writeAudit({ userId: g.user!.id, action: "delete_bulk", module: "edulex", entityType: "Ministry", metadata: { deleted } });
  revalidatePath("/edulex/ministries");
  if (deleted === 0) return { ok: false, error: "Aucune suppression : éléments référencés." };
  return { ok: true, deleted };
}

// ── Suppression des secteurs ──────────────────────────────────────────────────
export async function deleteSector(id: string): Promise<ActionResult> {
  const g = await guard();
  if (g.error) return { ok: false, error: g.error };
  try {
    await prisma.sector.delete({ where: { id } });
  } catch {
    return { ok: false, error: "Suppression impossible : ce secteur est encore référencé." };
  }
  await writeAudit({ userId: g.user!.id, action: "delete", module: "edulex", entityType: "Sector", entityId: id });
  revalidatePath("/edulex/sectors");
  return { ok: true };
}

export async function deleteSectors(ids: string[]): Promise<{ ok: true; deleted: number } | { ok: false; error: string }> {
  const g = await guard();
  if (g.error) return { ok: false, error: g.error };
  const targets = [...new Set(ids)];
  if (!targets.length) return { ok: false, error: "Aucun secteur sélectionné." };
  let deleted = 0;
  for (const id of targets) {
    try { await prisma.sector.delete({ where: { id } }); deleted++; } catch { /* référencé */ }
  }
  await writeAudit({ userId: g.user!.id, action: "delete_bulk", module: "edulex", entityType: "Sector", metadata: { deleted } });
  revalidatePath("/edulex/sectors");
  if (deleted === 0) return { ok: false, error: "Aucune suppression : éléments référencés." };
  return { ok: true, deleted };
}

// ── Mise à jour (nom + code) ───────────────────────────────────────────────────
const refUpdateSchema = z.object({ name: z.string().trim().min(2, "Nom requis (2 caractères min.)."), code: z.string().trim().optional() });

export async function updateMinistry(id: string, input: z.infer<typeof refUpdateSchema>): Promise<ActionResult> {
  const g = await guard();
  if (g.error) return { ok: false, error: g.error };
  const p = refUpdateSchema.safeParse(input);
  if (!p.success) return { ok: false, error: p.error.issues[0].message };
  await prisma.ministry.update({ where: { id }, data: { name: p.data.name, code: clean(p.data.code)?.toUpperCase() ?? null } });
  await writeAudit({ userId: g.user!.id, action: "update", module: "edulex", entityType: "Ministry", entityId: id });
  revalidatePath("/edulex/ministries");
  return { ok: true };
}

export async function updateSector(id: string, input: z.infer<typeof refUpdateSchema>): Promise<ActionResult> {
  const g = await guard();
  if (g.error) return { ok: false, error: g.error };
  const p = refUpdateSchema.safeParse(input);
  if (!p.success) return { ok: false, error: p.error.issues[0].message };
  await prisma.sector.update({ where: { id }, data: { name: p.data.name, code: clean(p.data.code)?.toUpperCase() ?? null } });
  await writeAudit({ userId: g.user!.id, action: "update", module: "edulex", entityType: "Sector", entityId: id });
  revalidatePath("/edulex/sectors");
  return { ok: true };
}

// ── Gouvernements (cabinets datés) ─────────────────────────────────────────────
const governmentSchema = z.object({
  countryId: z.string().min(1, "Pays requis."),
  name: z.string().trim().min(2, "Nom du gouvernement requis."),
  effectiveDate: z.string().min(1, "Date d'entrée en vigueur requise."),
  sourceUrl: z.string().trim().optional(),
});

export async function createGovernment(input: z.infer<typeof governmentSchema>): Promise<ActionResult> {
  const g = await guard();
  if (g.error) return { ok: false, error: g.error };
  const p = governmentSchema.safeParse(input);
  if (!p.success) return { ok: false, error: p.error.issues[0].message };
  const eff = new Date(p.data.effectiveDate);
  if (isNaN(eff.getTime())) return { ok: false, error: "Date d'entrée en vigueur invalide." };

  const existingCount = await prisma.government.count({ where: { countryId: p.data.countryId } });
  const gov = await prisma.government.create({
    data: { countryId: p.data.countryId, name: p.data.name, effectiveDate: eff, sourceUrl: clean(p.data.sourceUrl) },
  });
  // Premier gouvernement déclaré pour ce pays : adopte les ministères existants encore non rattachés.
  if (existingCount === 0) {
    await prisma.ministry.updateMany({ where: { countryId: p.data.countryId, governmentId: null }, data: { governmentId: gov.id } });
  }
  // Clôture automatique du gouvernement précédent (le plus récent avant celui-ci, encore ouvert).
  const prev = await prisma.government.findFirst({
    where: { countryId: p.data.countryId, id: { not: gov.id }, effectiveDate: { lt: eff }, endDate: null },
    orderBy: { effectiveDate: "desc" },
  });
  if (prev) await prisma.government.update({ where: { id: prev.id }, data: { endDate: eff } });

  await writeAudit({ userId: g.user!.id, action: "create", module: "edulex", entityType: "Government", entityId: gov.id });
  revalidatePath("/edulex/ministries");
  return { ok: true };
}

export async function deleteGovernment(id: string): Promise<ActionResult> {
  const g = await guard();
  if (g.error) return { ok: false, error: g.error };
  // Détache les ministères avant suppression (ils restent rattachés au pays).
  await prisma.ministry.updateMany({ where: { governmentId: id }, data: { governmentId: null } });
  await prisma.government.delete({ where: { id } });
  await writeAudit({ userId: g.user!.id, action: "delete", module: "edulex", entityType: "Government", entityId: id });
  revalidatePath("/edulex/ministries");
  return { ok: true };
}
