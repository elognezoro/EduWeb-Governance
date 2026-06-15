import type { PrismaClient } from "@prisma/client";
import { LEGAL_STATUS_MAP, metaOf } from "./enums";

// ── Moteur de génération des évaluations (5 niveaux) — sans dépendance serveur ─
// Prend un client Prisma en paramètre : utilisable côté serveur (lib/assessments)
// ET au seed (reproductible en production).
export const VALIDATED_LEVELS = ["V1", "V2", "V3", "V4"];
// En vigueur, modifié, ou document de référence officiel → exploités avec épreuves.
export const ELIGIBLE_STATUSES = ["IN_FORCE", "MODIFIED", "REFERENCE"];

/** Filtre Prisma des textes éligibles aux évaluations (hors countryId). */
export const ELIGIBLE_TEXT_FILTER = {
  deletedAt: null,
  status: { in: ELIGIBLE_STATUSES },
  verificationLevel: { in: VALIDATED_LEVELS },
  confidentiality: "PUBLIC",
} as const;

const TYPE_LABEL: Record<string, string> = {
  CONST: "Constitution", LOI: "Loi", ORD: "Ordonnance", DEC: "Décret",
  ARR: "Arrêté", CIRC: "Circulaire", REC: "Recommandation", CODE: "Code", DOC: "Document",
  CONV: "Convention internationale", TRAITE: "Traité", DECL: "Déclaration",
  PACTE: "Pacte international", PROTO: "Protocole", REGL: "Règlement", STATUTS: "Statuts",
};
const LEVELS = [
  { n: 1, name: "Découverte", objective: "Identifier les notions de base." },
  { n: 2, name: "Compréhension", objective: "Comprendre le sens général." },
  { n: 3, name: "Application", objective: "Appliquer un texte à une situation." },
  { n: 4, name: "Maîtrise", objective: "Analyser liens et implications." },
  { n: 5, name: "Expert / Référent", objective: "Conseiller, contrôler ou former." },
];
const VL_LABEL: Record<string, string> = {
  V0: "V0 — non vérifié", V1: "V1 — vérification documentaire", V2: "V2 — service technique",
  V3: "V3 — validation juridique", V4: "V4 — certifié",
};

// Rattache un secteur de texte (LegalTextCategory) à une catégorie Academy (chip).
// L'ordre compte : la première correspondance gagne.
export function academyKeyForSector(sector: string): string {
  const s = (sector || "").toLowerCase();
  if (/constitution|institution|gouvernance|référentiel|journal officiel|codes? juridiques|lois? et décrets/.test(s)) return "constitution";
  if (/enseignement supérieur|mesrs|recherche/.test(s)) return "sup";
  if (/éducation|education|scolaire|enseignement|alphabétisation|manuels/.test(s)) return "education";
  if (/santé|sanitaire|paramédical/.test(s)) return "sante";
  if (/fiscalit|impôt|fisc|finances? publiques|budget|trésor|comptabilité publique|nomenclature budgétaire/.test(s)) return "finances";
  if (/commerce|industrie|\bpme\b|artisanat|réglementation économique/.test(s)) return "commerce";
  if (/environnement|développement durable|forêts|climat|eaux et forêts|évaluation environnementale|eau|assainissement|salubrité/.test(s)) return "environnement";
  if (/agriculture|coopératives|ressources animales|pêche|aquaculture|élevage|vétérinaire/.test(s)) return "agriculture";
  if (/intelligence artificielle|\bia\b|algorithm|apprentissage automatique/.test(s)) return "ia";
  if (/économie|\beconomie\b|monétaire|finances internationales|commerce mondial|développement économique/.test(s)) return "economie";
  if (/canon|ecclésiast|religieu|saint-siège|\béglise\b|liturg|sacré/.test(s)) return "canonique";
  if (/communication|médias|numérique|données|presse|audiovisuel/.test(s)) return "communication";
  if (/\barts?\b|culture|patrimoine|musée/.test(s)) return "arts-culture";
  if (/fonction publique|administration publique|administration territoriale|concours|emploi|travail/.test(s)) return "fonction-publique";
  if (/état civil|etat civil|personnes|famille/.test(s)) return "etat-civil";
  if (/construction|urbanisme|urbain/.test(s)) return "foncier-urbain";
  if (/foncier|rural/.test(s)) return "foncier-rural";
  if (/justice|droit|citoyen|sécurité juridique/.test(s)) return "droits";
  return "evaluations-officielles"; // catch-all
}
function shuffle<T>(arr: T[]): T[] { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function pick<T>(pool: T[], n: number, excl: (v: T) => boolean): T[] { return shuffle(pool.filter((v) => !excl(v))).slice(0, n); }

export type BuildResult = { created: number; skipped: number; total: number; label: string } | { error: string };

/**
 * Génère (ou complète) les évaluations d'un pays : un parcours par catégorie
 * disposant d'au moins un texte validé, couvrant les 5 niveaux de compétence.
 * Idempotent. Prend le client Prisma en paramètre.
 */
export async function generateForCountry(prisma: PrismaClient, countryId: string): Promise<BuildResult> {
  const country = await prisma.country.findUnique({ where: { id: countryId }, select: { id: true, name: true, namespace: true } });
  if (!country) return { error: "Pays introuvable." };
  const label = country.namespace || country.name;

  const texts = await prisma.legalText.findMany({
    where: { countryId, ...ELIGIBLE_TEXT_FILTER },
    orderBy: [{ type: "asc" }, { title: "asc" }],
    select: {
      id: true, code: true, title: true, officialNumber: true, type: true, verificationLevel: true,
      status: true, summary: true, category: { select: { name: true } }, tags: { select: { name: true } },
    },
  });
  if (texts.length === 0) return { error: `Aucun texte officiel en vigueur et vérifié (V1→V4, public) disponible pour ${label}.` };

  await prisma.academyCategory.upsert({
    where: { key: "evaluations-officielles" },
    update: {},
    create: { name: "Évaluations officielles", key: "evaluations-officielles", icon: "ShieldCheck", order: 99, description: "Modules générés automatiquement à partir des textes validés." },
  });
  const cats = await prisma.academyCategory.findMany({ select: { id: true, name: true, key: true } });
  const catByKey = new Map(cats.map((c) => [c.key, c]));
  const allCatNames = cats.map((c) => c.name);

  const allTitles = texts.map((t) => t.title);
  const allKeywords = [...new Set(texts.flatMap((t) => t.tags.map((x) => x.name)))];
  const allTypeLabels = [...new Set(texts.map((t) => TYPE_LABEL[t.type] || t.type))];
  const allRefs = [...new Set(texts.map((t) => t.officialNumber || t.code))];
  const vlLabels = Object.values(VL_LABEL);

  const evalPaths = await prisma.academyPath.findMany({ where: { countryId, title: { startsWith: "Évaluations" } }, select: { id: true } });
  const evalPathIds = evalPaths.map((p) => p.id);
  const coveredRows = evalPathIds.length
    ? await prisma.question.findMany({ where: { legalTextId: { in: texts.map((t) => t.id) }, lesson: { unit: { pathId: { in: evalPathIds } } } }, select: { legalTextId: true } })
    : [];
  const covered = new Set(coveredRows.map((r) => r.legalTextId));

  const struct = new Map<string, { lessonIds: string[] }>();
  async function ensureCategory(catKey: string) {
    if (struct.has(catKey)) return struct.get(catKey)!;
    const cat = catByKey.get(catKey) || catByKey.get("evaluations-officielles")!;
    const title = `Évaluations — ${cat.name} · ${label}`;
    let path = await prisma.academyPath.findFirst({ where: { countryId, categoryId: cat.id, title } });
    if (!path) {
      path = await prisma.academyPath.create({
        data: {
          title,
          description: `Épreuves progressives sur les 5 niveaux de compétence, tirées des textes officiels vérifiés de ${label} — ${cat.name}, avec leurs références officielles.`,
          categoryId: cat.id, countryId, level: 1, order: 50, isPublished: true,
        },
      });
    }
    const lessonIds: string[] = [];
    let prevUnitId: string | undefined;
    for (const lvl of LEVELS) {
      const unitTitle = `Niveau ${lvl.n} · ${lvl.name}`;
      let unit = await prisma.academyUnit.findFirst({ where: { pathId: path.id, title: unitTitle } });
      if (!unit) unit = await prisma.academyUnit.create({ data: { pathId: path.id, title: unitTitle, order: lvl.n, requiresId: prevUnitId } });
      prevUnitId = unit.id;
      const lessonTitle = `Épreuve — ${lvl.name}`;
      let lesson = await prisma.academyLesson.findFirst({ where: { unitId: unit.id, title: lessonTitle } });
      if (!lesson) lesson = await prisma.academyLesson.create({ data: { unitId: unit.id, title: lessonTitle, order: 1, content: lvl.objective } });
      lessonIds.push(lesson.id);
    }
    const entry = { lessonIds };
    struct.set(catKey, entry);
    return entry;
  }

  function buildQuestion(t: (typeof texts)[number], n: number, domain: string) {
    const ref = t.officialNumber || t.code;
    const typeLabel = TYPE_LABEL[t.type] || t.type;
    const theme = t.tags[0]?.name || domain;
    if (n === 1) {
      const d = pick(allCatNames, 3, (x) => x === domain);
      return { difficulty: "EASY", points: 10, prompt: `À quel domaine se rattache « ${t.title} » (${t.code}) ?`, choices: [{ label: domain, isCorrect: true }, ...d.map((x) => ({ label: x, isCorrect: false }))] };
    }
    if (n === 2) {
      if (t.summary && t.summary.trim().length > 20) {
        const d = pick(allTitles, 3, (x) => x === t.title);
        const obj = t.summary.trim().slice(0, 160);
        return { difficulty: "EASY", points: 10, prompt: `Quel texte correspond à cet objet : « ${obj}${t.summary.trim().length > 160 ? "…" : ""} » ?`, choices: [{ label: t.title, isCorrect: true }, ...d.map((x) => ({ label: x, isCorrect: false }))] };
      }
      if (t.tags.length) {
        const d = pick(allKeywords, 3, (k) => t.tags.some((x) => x.name === k));
        return { difficulty: "EASY", points: 10, prompt: `Quel mot-clé caractérise « ${t.title} » ?`, choices: [{ label: t.tags[0].name, isCorrect: true }, ...d.map((x) => ({ label: x, isCorrect: false }))] };
      }
      const d = pick(allTypeLabels, 3, (x) => x === typeLabel);
      return { difficulty: "EASY", points: 10, prompt: `De quel type de norme relève « ${t.title} » ?`, choices: [{ label: typeLabel, isCorrect: true }, ...d.map((x) => ({ label: x, isCorrect: false }))] };
    }
    if (n === 3) {
      const d = pick(allTitles, 3, (x) => x === t.title);
      return { difficulty: "MEDIUM", points: 15, prompt: `Un usager s'informe au sujet de « ${theme} » : quel texte officiel doit-il consulter ?`, choices: [{ label: t.title, isCorrect: true }, ...d.map((x) => ({ label: x, isCorrect: false }))] };
    }
    if (n === 4) {
      const good = VL_LABEL[t.verificationLevel] || t.verificationLevel;
      const d = pick(vlLabels, 3, (x) => x === good);
      return { difficulty: "HARD", points: 20, prompt: `Quel est le niveau de vérification du texte « ${t.title} » dans EduLex ?`, choices: [{ label: good, isCorrect: true }, ...d.map((x) => ({ label: x, isCorrect: false }))] };
    }
    const d = pick(allRefs, 3, (x) => x === ref);
    return { difficulty: "HARD", points: 25, prompt: `En tant que référent, quelle est la référence officielle du texte « ${t.title} » ?`, choices: [{ label: ref, isCorrect: true }, ...d.map((x) => ({ label: x, isCorrect: false }))] };
  }

  let created = 0;
  let skipped = 0;

  for (const t of texts) {
    if (covered.has(t.id)) { skipped++; continue; }
    const catKey = academyKeyForSector(t.category?.name || "");
    const domain = (catByKey.get(catKey) || catByKey.get("evaluations-officielles")!).name;
    const { lessonIds } = await ensureCategory(catKey);
    const ref = t.officialNumber || t.code;
    const typeLabel = TYPE_LABEL[t.type] || t.type;
    const statusLabel = metaOf(LEGAL_STATUS_MAP, t.status).label;
    const explanation = `Statut : ${statusLabel} · Référence officielle : ${ref} · Type : ${typeLabel} · Niveau de vérification : ${t.verificationLevel}.`;

    for (const lvl of LEVELS) {
      const q = buildQuestion(t, lvl.n, domain);
      await prisma.question.create({
        data: {
          lessonId: lessonIds[lvl.n - 1], type: "QCU", prompt: q.prompt, explanation,
          difficulty: q.difficulty, points: q.points, level: lvl.n, status: "PUBLISHED",
          legalTextId: t.id, articleRef: t.code, countryId,
          choices: { create: shuffle(q.choices).map((c, i) => ({ label: c.label.slice(0, 200), isCorrect: c.isCorrect, order: i })) },
        },
      });
    }
    created++;
  }

  return { created, skipped, total: texts.length, label };
}
