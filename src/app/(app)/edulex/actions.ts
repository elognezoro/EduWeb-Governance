"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, hasPermission } from "@/lib/auth";
import { writeAudit } from "@/lib/audit";
import { formatLegalCode, buildCodeParts } from "@/lib/edulex-code";

export type ActionResult = { ok: true; id?: string } | { ok: false; error: string };

const clean = (v?: string) => (v && v.length > 0 ? v : undefined);
function toDate(v?: string) {
  if (!v) return undefined;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

// ── Dépôt d'un texte (codification automatique) ───────────────────────────────
const depositSchema = z.object({
  title: z.string().trim().min(3, "Titre requis (3 caractères min.)."),
  officialNumber: z.string().trim().optional(),
  countryId: z.string().min(1, "Pays requis."),
  jurisdictionId: z.string().optional(),
  ministryId: z.string().optional(),
  sectorId: z.string().optional(),
  type: z.string().min(1, "Type requis."),
  language: z.string().default("fr"),
  confidentiality: z.string().default("PUBLIC"),
  status: z.string().default("PENDING"),
  signatureDate: z.string().optional(),
  publicationDate: z.string().optional(),
  effectiveDate: z.string().optional(),
  summary: z.string().trim().optional(),
  sourceUrl: z.string().trim().optional(),
});
export type DepositInput = z.infer<typeof depositSchema>;

export async function createLegalText(input: DepositInput): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Non authentifié." };
  if (!hasPermission(user, "edulex:create")) return { ok: false, error: "Permission requise (edulex:create)." };

  const parsed = depositSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
  const d = parsed.data;

  const [country, ministry, jurisdiction, sector] = await Promise.all([
    prisma.country.findUnique({ where: { id: d.countryId } }),
    d.ministryId ? prisma.ministry.findUnique({ where: { id: d.ministryId } }) : null,
    d.jurisdictionId ? prisma.jurisdiction.findUnique({ where: { id: d.jurisdictionId } }) : null,
    d.sectorId ? prisma.sector.findUnique({ where: { id: d.sectorId } }) : null,
  ]);
  if (!country) return { ok: false, error: "Pays introuvable." };

  const sig = toDate(d.signatureDate);
  const pub = toDate(d.publicationDate);
  const year = (sig ?? pub ?? new Date()).getFullYear();

  // Numéro séquentiel par pays + année, puis garantie d'unicité du code.
  const base = await prisma.legalText.count({ where: { countryId: d.countryId, code: { contains: `-${year}-` } } });
  let num = base + 1;
  let code = "";
  for (let i = 0; i < 50; i++) {
    code = formatLegalCode(
      buildCodeParts({
        countryCode: country.code,
        ministryCode: ministry?.code,
        jurisdictionCode: jurisdiction?.code,
        sectorCode: sector?.code,
        type: d.type,
        year,
        num,
        version: 1,
      })
    );
    const exists = await prisma.legalText.findUnique({ where: { code } });
    if (!exists) break;
    num++;
  }

  const text = await prisma.legalText.create({
    data: {
      code,
      title: d.title,
      officialNumber: clean(d.officialNumber),
      countryId: d.countryId,
      jurisdictionId: clean(d.jurisdictionId),
      ministryId: clean(d.ministryId),
      sectorId: clean(d.sectorId),
      type: d.type,
      status: d.status,
      verificationLevel: "V0",
      language: d.language,
      confidentiality: d.confidentiality,
      signatureDate: sig,
      publicationDate: pub,
      effectiveDate: toDate(d.effectiveDate),
      summary: clean(d.summary),
      sourceUrl: clean(d.sourceUrl),
      currentVersion: 1,
      depositedById: user.id,
      versions: { create: { version: 1, note: "Dépôt initial.", verificationLevel: "V0", status: d.status } },
    },
  });

  await writeAudit({ userId: user.id, action: "create", module: "edulex", entityType: "LegalText", entityId: text.id, metadata: { code } });
  revalidatePath("/edulex");
  redirect(`/edulex/texts/${text.id}`);
}

// ── Avancement du niveau de vérification (V0 → V4) ────────────────────────────
const LEVELS = ["V0", "V1", "V2", "V3", "V4"];

// Niveaux « validés » : la vérification doit s'appuyer sur une source officielle.
const SOURCE_REQUIRED_LEVELS = ["V3", "V4"];

export async function setVerificationLevel(id: string, toLevel: string, comment?: string, sourceUrl?: string): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Non authentifié." };
  if (!hasPermission(user, "edulex:validate")) return { ok: false, error: "Permission requise (edulex:validate)." };
  if (!LEVELS.includes(toLevel)) return { ok: false, error: "Niveau invalide." };

  const text = await prisma.legalText.findUnique({ where: { id } });
  if (!text || text.deletedAt) return { ok: false, error: "Texte introuvable." };

  const newSource = sourceUrl?.trim() || undefined;
  const effectiveSource = newSource || text.sourceUrl || undefined;
  // Validation juridique (V3) / certification (V4) : une source officielle est obligatoire.
  if (SOURCE_REQUIRED_LEVELS.includes(toLevel) && !effectiveSource) {
    return { ok: false, error: `Une source officielle (URL) est requise pour valider en ${toLevel}.` };
  }

  const logComment = [effectiveSource ? `Source officielle : ${effectiveSource}` : null, comment?.trim() || null]
    .filter(Boolean)
    .join(" · ") || undefined;

  await prisma.$transaction([
    prisma.legalText.update({ where: { id }, data: { verificationLevel: toLevel, ...(newSource ? { sourceUrl: newSource } : {}), ...(SOURCE_REQUIRED_LEVELS.includes(toLevel) ? { validatedById: user.id } : {}) } }),
    prisma.legalValidationAction.create({
      data: { legalTextId: id, actorId: user.id, decision: SOURCE_REQUIRED_LEVELS.includes(toLevel) ? "LEGAL_REVIEW" : "LEVEL_CHANGE", comment: logComment, fromLevel: text.verificationLevel, toLevel },
    }),
  ]);

  await writeAudit({ userId: user.id, action: "verify", module: "edulex", entityType: "LegalText", entityId: id, metadata: { toLevel, source: effectiveSource ?? null } });
  revalidatePath(`/edulex/texts/${id}`);
  revalidatePath("/edulex");
  revalidatePath("/edulex/validation");
  return { ok: true };
}

// ── Changement de statut (incl. publication) ──────────────────────────────────
export async function setLegalStatus(id: string, toStatus: string, comment?: string, sourceUrl?: string): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Non authentifié." };
  if (!hasPermission(user, "edulex:validate")) return { ok: false, error: "Permission requise (edulex:validate)." };
  if (toStatus === "IN_FORCE" && !hasPermission(user, "edulex:publish"))
    return { ok: false, error: "La mise en vigueur requiert la permission edulex:publish." };

  const text = await prisma.legalText.findUnique({ where: { id } });
  if (!text || text.deletedAt) return { ok: false, error: "Texte introuvable." };

  const newSource = sourceUrl?.trim() || undefined;
  const effectiveSource = newSource || text.sourceUrl || undefined;
  // Mise en vigueur : s'appuyer sur une source officielle.
  if (toStatus === "IN_FORCE" && !effectiveSource) {
    return { ok: false, error: "Une source officielle (URL) est requise pour mettre un texte en vigueur." };
  }

  const logComment = [effectiveSource ? `Source officielle : ${effectiveSource}` : null, comment?.trim() || null]
    .filter(Boolean)
    .join(" · ") || undefined;

  await prisma.$transaction([
    prisma.legalText.update({
      where: { id },
      data: { status: toStatus, ...(newSource ? { sourceUrl: newSource } : {}), ...(toStatus === "IN_FORCE" ? { validatedById: user.id } : {}) },
    }),
    prisma.legalValidationAction.create({
      data: { legalTextId: id, actorId: user.id, decision: toStatus === "IN_FORCE" ? "PUBLISH" : "STATUS_CHANGE", comment: logComment, fromStatus: text.status, toStatus },
    }),
  ]);

  await writeAudit({ userId: user.id, action: "status", module: "edulex", entityType: "LegalText", entityId: id, metadata: { toStatus, source: effectiveSource ?? null } });
  revalidatePath(`/edulex/texts/${id}`);
  revalidatePath("/edulex");
  revalidatePath("/edulex/validation");
  return { ok: true };
}

export async function deleteLegalText(id: string): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Non authentifié." };
  if (!hasPermission(user, "edulex:manage")) return { ok: false, error: "Permission requise (edulex:manage)." };

  await prisma.legalText.update({ where: { id }, data: { deletedAt: new Date() } });
  await writeAudit({ userId: user.id, action: "delete", module: "edulex", entityType: "LegalText", entityId: id });
  revalidatePath("/edulex");
  redirect("/edulex");
}

// ── Import d'amorçage (CSV → textes V0 « importé non vérifié ») ────────────────
export interface ImportRow {
  title: string;
  type?: string;
  officialNumber?: string;
  ministryCode?: string;
  sectorCode?: string;
  summary?: string;
}

export async function importLegalTexts(
  countryId: string,
  rows: ImportRow[]
): Promise<{ ok: true; imported: number; skipped: number } | { ok: false; error: string }> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Non authentifié." };
  if (!hasPermission(user, "edulex:create") && !hasPermission(user, "edulex:manage"))
    return { ok: false, error: "Permission requise (edulex:create)." };

  const country = await prisma.country.findUnique({ where: { id: countryId } });
  if (!country) return { ok: false, error: "Pays introuvable." };

  const [ministries, sectors] = await Promise.all([
    prisma.ministry.findMany({ where: { countryId }, select: { code: true } }),
    prisma.sector.findMany({ select: { code: true } }),
  ]);
  const minByCode = new Map(ministries.filter((m) => m.code).map((m) => [m.code!.toUpperCase(), m.code!]));
  const secByCode = new Map(sectors.filter((s) => s.code).map((s) => [s.code!.toUpperCase(), s.code!]));

  const year = new Date().getFullYear();
  let num = (await prisma.legalText.count({ where: { countryId, code: { contains: `-${year}-` } } })) + 1;
  let imported = 0;
  let skipped = 0;

  for (const row of rows) {
    if (!row.title?.trim()) { skipped++; continue; }
    const type = (row.type || "DOC").toUpperCase();
    const ministryCode = row.ministryCode ? minByCode.get(row.ministryCode.toUpperCase()) : undefined;
    const sectorCode = row.sectorCode ? secByCode.get(row.sectorCode.toUpperCase()) : undefined;

    let code = "";
    for (let i = 0; i < 50; i++) {
      code = formatLegalCode(buildCodeParts({ countryCode: country.code, ministryCode, sectorCode, type, year, num, version: 1 }));
      if (!(await prisma.legalText.findUnique({ where: { code } }))) break;
      num++;
    }

    await prisma.legalText.create({
      data: {
        code,
        title: row.title.trim(),
        officialNumber: clean(row.officialNumber),
        countryId,
        type,
        status: "IMPORTED_UNVERIFIED",
        verificationLevel: "V0",
        language: "fr",
        confidentiality: "PUBLIC",
        summary: clean(row.summary),
        currentVersion: 1,
        depositedById: user.id,
        versions: { create: { version: 1, note: "Import d'amorçage (non vérifié).", verificationLevel: "V0", status: "IMPORTED_UNVERIFIED" } },
      },
    });
    imported++;
    num++;
  }

  await writeAudit({ userId: user.id, action: "import", module: "edulex", entityType: "LegalText", metadata: { imported, skipped, countryId } });
  revalidatePath("/edulex");
  return { ok: true, imported, skipped };
}
