import { PrismaClient } from "@prisma/client";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { generateForCountry } from "../src/lib/assessments-core";

// Corpus versionnés à charger au seed (national + international).
const CORPUS_FILES = ["edulex-ci-corpus.json", "edulex-global-corpus.json"];

/** Importe tous les corpus versionnés puis génère leurs évaluations. */
export async function seedCorpus(prisma: PrismaClient): Promise<void> {
  for (const f of CORPUS_FILES) await seedCorpusFile(prisma, f);
}

function slug(s: string): string {
  return (
    s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 45) || "cat"
  );
}

interface CorpusText {
  code: string; title: string; officialNumber: string | null; type: string;
  status: string; verificationLevel: string; language: string; confidentiality: string;
  summary: string | null; sourceUrl: string | null; signatureDate: string | null;
  effectiveDate: string | null; currentVersion: number; categoryName: string | null; tags: string[];
}

/**
 * Importe un corpus EduLex (fichier JSON versionné) pour un pays/espace donné,
 * puis génère les évaluations 5 niveaux. Idempotent — reproductible au déploiement.
 */
async function seedCorpusFile(prisma: PrismaClient, fileName: string): Promise<void> {
  const file = join(process.cwd(), "prisma", "data", fileName);
  if (!existsSync(file)) { console.log(`ℹ️  Corpus ${fileName} absent — ignoré.`); return; }
  const corpus = JSON.parse(readFileSync(file, "utf-8")) as { country: string; texts: CorpusText[] };

  const country = await prisma.country.findUnique({ where: { code: corpus.country }, select: { id: true } });
  if (!country) { console.log(`⚠️  Pays ${corpus.country} introuvable — corpus ignoré.`); return; }
  const depositor = await prisma.user.findFirst({ where: { roles: { some: { role: { key: "super_admin" } } } }, select: { id: true } });

  const catCache = new Map<string, string>();
  async function categoryId(name: string | null): Promise<string | undefined> {
    if (!name) return undefined;
    const key = "lt-" + slug(name);
    if (catCache.has(key)) return catCache.get(key)!;
    const cat = await prisma.legalTextCategory.upsert({ where: { key }, update: {}, create: { name, key } });
    catCache.set(key, cat.id);
    return cat.id;
  }

  let created = 0;
  let skipped = 0;
  for (const t of corpus.texts) {
    if (await prisma.legalText.findUnique({ where: { code: t.code } })) { skipped++; continue; }
    const catId = await categoryId(t.categoryName);
    await prisma.legalText.create({
      data: {
        code: t.code, title: t.title, officialNumber: t.officialNumber || undefined,
        countryId: country.id, categoryId: catId, type: t.type, status: t.status,
        verificationLevel: t.verificationLevel, language: t.language, confidentiality: t.confidentiality,
        summary: t.summary || undefined, sourceUrl: t.sourceUrl || undefined,
        signatureDate: t.signatureDate ? new Date(t.signatureDate) : undefined,
        effectiveDate: t.effectiveDate ? new Date(t.effectiveDate) : undefined,
        currentVersion: t.currentVersion,
        depositedById: depositor?.id,
        validatedById: t.verificationLevel === "V3" || t.verificationLevel === "V4" ? depositor?.id : undefined,
        tags: t.tags.length ? { connectOrCreate: t.tags.map((name) => ({ where: { name }, create: { name } })) } : undefined,
        versions: { create: { version: t.currentVersion, note: `Corpus EduLex ${corpus.country} (seed).`, status: t.status, verificationLevel: t.verificationLevel } },
      },
    });
    created++;
  }
  console.log(`📚 Corpus EduLex ${corpus.country} : ${created} texte(s) importé(s), ${skipped} déjà présent(s).`);

  // Évaluations 5 niveaux par catégorie (idempotent).
  const gen = await generateForCountry(prisma, country.id);
  if ("error" in gen) console.log(`   Évaluations : ${gen.error}`);
  else console.log(`   Évaluations : ${gen.created} module(s) généré(s), ${gen.skipped} déjà à jour, sur ${gen.total} texte(s) validé(s).`);
}
