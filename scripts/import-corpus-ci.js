// Import du corpus EduLex CI (fichier Excel enrichi) → LegalText, par catégories et statuts.
// Idempotent : un code déjà présent est ignoré.
const path = require("path");
const XLSX = require("xlsx");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const FILE = process.argv[2] || "C:/Users/elogn/Downloads/EduLex_CI_Corpus_enrichi_Constitution_2026-06-07 (2).xlsx";

const TYPE_MAP = {
  "constitution": "CONST", "loi": "LOI", "loi organique": "LOI", "ordonnance": "ORD",
  "décret": "DEC", "arrêté": "ARR", "circulaire": "CIRC", "décision": "ARR",
  "procédure": "CIRC", "code": "CODE", "recueil": "REC", "guide fiscal": "DOC",
  "référence": "DOC", "base de données": "DOC", "texte / index": "DOC",
};
function mapType(t) { return TYPE_MAP[(t || "").trim().toLowerCase()] || "DOC"; }

// Statut FIDÈLE au contenu Excel (colonne « Statut dans la base »).
function mapStatus(s) {
  const x = (s || "").toLowerCase();
  if (/en vigueur modifié/.test(x)) return "MODIFIED";               // en vigueur (modifié), même si « à vérifier »
  if (x.includes("à vérifier") || x.includes("indexé")) return "TO_VERIFY"; // index Loidici, présumé/à vérifier
  if (x.includes("en vigueur") || x.includes("applicable") || x.includes("présumé en vigueur")) return "IN_FORCE";
  if (/document de référence|source de preuve|source de collecte|recueil/.test(x)) return "REFERENCE"; // doc. de référence officiel
  return "TO_VERIFY";
}

function vlevel(code) { const m = (code || "").match(/-V(\d)$/); return m ? "V" + m[1] : "V0"; }
function broadSector(s) { return ((s || "").split("/")[0] || "").trim() || "Autres"; }
function slug(s) {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 45) || "cat";
}
function parseDate(v) {
  const m = (v || "").toString().trim().match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return null;
  const d = new Date(`${m[1]}-${m[2]}-${m[3]}T00:00:00Z`);
  return isNaN(d.getTime()) ? null : d;
}
function firstUrl(v) {
  const u = (v || "").toString().split(/[;\s]+/).find((x) => /^https?:\/\//.test(x));
  return u || null;
}
function tagsOf(v) {
  return [...new Set((v || "").toString().split(/[;,]/).map((x) => x.trim()).filter((x) => x && x.length <= 40))].slice(0, 8);
}

(async () => {
  const ci = await prisma.country.findUnique({ where: { code: "CI" }, select: { id: true } });
  const admin = await prisma.user.findFirst({ where: { roles: { some: { role: { key: "super_admin" } } } }, select: { id: true } });
  const wb = XLSX.readFile(FILE);
  const rows = XLSX.utils.sheet_to_json(wb.Sheets["RegText_CI"], { header: 1, defval: "" }).slice(4)
    .filter((r) => (r[0] || "").toString().trim()); // code présent

  const catCache = new Map();
  async function categoryFor(secteur) {
    const name = broadSector(secteur);
    const key = "lt-" + slug(name);
    if (catCache.has(key)) return catCache.get(key);
    const cat = await prisma.legalTextCategory.upsert({ where: { key }, update: {}, create: { name, key } });
    catCache.set(key, cat.id);
    return cat.id;
  }

  let imported = 0, skipped = 0;
  const byLevel = {};

  for (const r of rows) {
    const code = (r[0] || "").toString().trim();
    if (await prisma.legalText.findUnique({ where: { code } })) { skipped++; continue; }

    const level = vlevel(code);
    const type = mapType(r[3]);
    const status = mapStatus(r[9]);
    const categoryId = await categoryFor(r[1]);
    const officialNumber = (r[4] || "").toString().trim();
    const refClean = officialNumber && !/à renseigner|^—?$/i.test(officialNumber) ? officialNumber.slice(0, 300) : null;
    const tags = tagsOf(r[11]);

    await prisma.legalText.create({
      data: {
        code,
        title: (r[7] || "").toString().trim() || code,
        officialNumber: refClean,
        countryId: ci.id,
        categoryId,
        type,
        status,
        verificationLevel: level,
        language: "fr",
        confidentiality: "PUBLIC",
        summary: (r[8] || "").toString().trim() || null,
        sourceUrl: firstUrl(r[12]),
        signatureDate: parseDate(r[5]),
        effectiveDate: parseDate(r[6]),
        currentVersion: Number(level.slice(1)) || 1,
        depositedById: admin.id,
        validatedById: (level === "V3" || level === "V4") ? admin.id : null,
        tags: tags.length ? { connectOrCreate: tags.map((name) => ({ where: { name }, create: { name } })) } : undefined,
        versions: { create: { version: Number(level.slice(1)) || 1, note: "Import corpus EduLex CI (Excel enrichi).", status, verificationLevel: level } },
      },
    });
    imported++;
    byLevel[level] = (byLevel[level] || 0) + 1;
  }

  const totalCI = await prisma.legalText.count({ where: { countryId: ci.id } });
  const cats = await prisma.legalTextCategory.count();
  console.log(`Importés : ${imported} | ignorés (déjà présents) : ${skipped}`);
  console.log("Par niveau :", JSON.stringify(byLevel));
  console.log("Total textes CI :", totalCI, "| catégories de textes :", cats);
  await prisma.$disconnect();
})().catch((e) => { console.error(e); process.exit(1); });
