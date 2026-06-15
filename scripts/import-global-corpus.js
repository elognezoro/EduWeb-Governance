// Corpus international EduLex Global : textes réels et vérifiables, classés par domaine.
// Idempotent (par code). Exporte aussi prisma/data/edulex-global-corpus.json.
const fs = require("fs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function slug(s) {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 45) || "cat";
}

// Catégories Academy (chips) propres au global.
const ACADEMY_CATS = [
  { name: "Économie et finances internationales", key: "economie", icon: "TrendingUp", order: 17 },
  { name: "Intelligence artificielle", key: "ia", icon: "Cpu", order: 18 },
  { name: "Textes canoniques", key: "canonique", icon: "BookMarked", order: 19 },
];

// Textes internationaux réels (réf. officielles + sources). V3 = validation juridique.
const TEXTS = [
  // Éducation
  { code: "GLOBAL-EDU-CONV-1960-001-V3", domain: "Éducation", type: "CONV", title: "Convention concernant la lutte contre la discrimination dans le domaine de l'enseignement", ref: "UNESCO — 14 décembre 1960", date: "1960-12-14", url: "https://www.unesco.org/fr/legal-affairs/convention-against-discrimination-education", summary: "Interdit toute discrimination dans l'accès à l'éducation et consacre le droit à l'éducation pour tous.", tags: ["éducation", "discrimination", "UNESCO", "droit à l'éducation"] },
  { code: "GLOBAL-EDU-DECL-2015-002-V3", domain: "Éducation", type: "DECL", title: "Éducation 2030 — Objectif de développement durable n°4 (ODD 4)", ref: "Agenda 2030 des Nations Unies — 25 septembre 2015", date: "2015-09-25", url: "https://sdgs.un.org/goals/goal4", summary: "Assurer une éducation inclusive, équitable et de qualité et promouvoir des possibilités d'apprentissage tout au long de la vie.", tags: ["éducation", "ODD", "agenda 2030", "ONU"] },
  // Santé
  { code: "GLOBAL-SAN-CONST-1946-001-V3", domain: "Santé", type: "CONST", title: "Constitution de l'Organisation mondiale de la Santé", ref: "OMS — 22 juillet 1946 (en vigueur 1948)", date: "1946-07-22", url: "https://www.who.int/fr/about/governance/constitution", summary: "Définit la santé comme un état de complet bien-être et institue l'OMS comme autorité directrice en santé internationale.", tags: ["santé", "OMS", "bien-être", "droit à la santé"] },
  { code: "GLOBAL-SAN-REGL-2005-002-V3", domain: "Santé", type: "REGL", title: "Règlement sanitaire international (RSI 2005)", ref: "OMS — 23 mai 2005", date: "2005-05-23", url: "https://www.who.int/fr/publications/i/item/9789241580496", summary: "Cadre juridique mondial de prévention et de riposte aux urgences de santé publique de portée internationale.", tags: ["santé", "OMS", "urgence sanitaire", "épidémie"] },
  { code: "GLOBAL-SAN-CONV-2003-003-V3", domain: "Santé", type: "CONV", title: "Convention-cadre de l'OMS pour la lutte antitabac (CCLAT)", ref: "OMS — 21 mai 2003", date: "2003-05-21", url: "https://fctc.who.int/fr", summary: "Premier traité international de santé publique visant à réduire la consommation de tabac.", tags: ["santé", "tabac", "OMS", "prévention"] },
  // Droits humains
  { code: "GLOBAL-DH-DECL-1948-001-V3", domain: "Droits humains", type: "DECL", title: "Déclaration universelle des droits de l'homme", ref: "Résolution 217 A (III) — 10 décembre 1948", date: "1948-12-10", url: "https://www.un.org/fr/universal-declaration-human-rights/", summary: "Énonce les droits fondamentaux inaliénables de tout être humain ; texte de référence des droits humains.", tags: ["droits humains", "ONU", "libertés", "dignité"] },
  { code: "GLOBAL-DH-PACTE-1966-002-V3", domain: "Droits humains", type: "PACTE", title: "Pacte international relatif aux droits civils et politiques", ref: "Résolution 2200 A (XXI) — 16 décembre 1966", date: "1966-12-16", url: "https://www.ohchr.org/fr/instruments-mechanisms/instruments/international-covenant-civil-and-political-rights", summary: "Garantit les droits civils et politiques (vie, liberté, procès équitable, expression, vote).", tags: ["droits humains", "droits civils", "ONU", "libertés politiques"] },
  { code: "GLOBAL-DH-CONV-1989-003-V3", domain: "Droits humains", type: "CONV", title: "Convention relative aux droits de l'enfant", ref: "Résolution 44/25 — 20 novembre 1989", date: "1989-11-20", url: "https://www.ohchr.org/fr/instruments-mechanisms/instruments/convention-rights-child", summary: "Reconnaît les droits civils, politiques, économiques, sociaux et culturels des enfants.", tags: ["droits de l'enfant", "ONU", "protection", "enfance"] },
  // Économie
  { code: "GLOBAL-ECO-ACCO-1994-001-V3", domain: "Économie", type: "TRAITE", title: "Accord de Marrakech instituant l'Organisation mondiale du commerce", ref: "Accord de Marrakech — 15 avril 1994", date: "1994-04-15", url: "https://www.wto.org/french/docs_f/legal_f/04-wto_f.htm", summary: "Établit l'OMC et le cadre multilatéral des échanges commerciaux internationaux.", tags: ["économie", "commerce international", "OMC", "échanges"] },
  { code: "GLOBAL-ECO-STATUTS-1944-002-V3", domain: "Économie", type: "STATUTS", title: "Statuts du Fonds monétaire international", ref: "Accords de Bretton Woods — 22 juillet 1944", date: "1944-07-22", url: "https://www.imf.org/external/french/index.htm", summary: "Institue le FMI et les règles de coopération monétaire et de stabilité financière internationale.", tags: ["économie", "FMI", "monétaire", "finances internationales"] },
  // Environnement
  { code: "GLOBAL-ENV-ACCO-2015-001-V3", domain: "Environnement", type: "TRAITE", title: "Accord de Paris sur le climat", ref: "CCNUCC — 12 décembre 2015", date: "2015-12-12", url: "https://unfccc.int/fr/processus-et-reunions/l-accord-de-paris/qu-est-ce-que-l-accord-de-paris", summary: "Vise à limiter le réchauffement mondial bien en deçà de 2 °C par rapport à l'ère préindustrielle.", tags: ["environnement", "climat", "CCNUCC", "réchauffement"] },
  { code: "GLOBAL-ENV-CONV-1992-002-V3", domain: "Environnement", type: "CONV", title: "Convention-cadre des Nations Unies sur les changements climatiques (CCNUCC)", ref: "Sommet de Rio — 9 mai 1992", date: "1992-05-09", url: "https://unfccc.int/fr", summary: "Cadre intergouvernemental de lutte contre le changement climatique.", tags: ["environnement", "climat", "ONU", "GES"] },
  { code: "GLOBAL-ENV-PROTO-1987-003-V3", domain: "Environnement", type: "PROTO", title: "Protocole de Montréal relatif à des substances qui appauvrissent la couche d'ozone", ref: "16 septembre 1987", date: "1987-09-16", url: "https://www.unep.org/ozonaction", summary: "Élimine progressivement les substances appauvrissant la couche d'ozone.", tags: ["environnement", "ozone", "Montréal", "atmosphère"] },
  { code: "GLOBAL-ENV-CONV-1992-004-V3", domain: "Environnement", type: "CONV", title: "Convention sur la diversité biologique", ref: "Sommet de Rio — 5 juin 1992", date: "1992-06-05", url: "https://www.cbd.int/", summary: "Conservation de la biodiversité, usage durable et partage des avantages.", tags: ["environnement", "biodiversité", "Rio", "écosystèmes"] },
  // Numérique
  { code: "GLOBAL-NUM-REGL-2016-001-V3", domain: "Numérique", type: "REGL", title: "Règlement général sur la protection des données (RGPD)", ref: "Règlement (UE) 2016/679 — 27 avril 2016", date: "2016-04-27", url: "https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32016R0679", summary: "Encadre le traitement des données à caractère personnel et les droits des personnes concernées.", tags: ["numérique", "données personnelles", "RGPD", "vie privée"] },
  { code: "GLOBAL-NUM-CONV-2001-002-V3", domain: "Numérique", type: "CONV", title: "Convention sur la cybercriminalité (Convention de Budapest)", ref: "Conseil de l'Europe, STE n°185 — 23 novembre 2001", date: "2001-11-23", url: "https://www.coe.int/fr/web/cybercrime/the-budapest-convention", summary: "Harmonise les infractions pénales liées à l'informatique et la coopération internationale.", tags: ["numérique", "cybercriminalité", "Budapest", "coopération"] },
  // Intelligence artificielle
  { code: "GLOBAL-IA-RECO-2021-001-V3", domain: "Intelligence artificielle", type: "REC", title: "Recommandation sur l'éthique de l'intelligence artificielle", ref: "UNESCO — 23 novembre 2021", date: "2021-11-23", url: "https://www.unesco.org/fr/artificial-intelligence/recommendation-ethics", summary: "Premier cadre normatif mondial sur l'éthique de l'IA (droits humains, transparence, responsabilité).", tags: ["intelligence artificielle", "éthique", "UNESCO", "IA responsable"] },
  { code: "GLOBAL-IA-REGL-2024-002-V3", domain: "Intelligence artificielle", type: "REGL", title: "Règlement établissant des règles harmonisées concernant l'intelligence artificielle (AI Act)", ref: "Règlement (UE) 2024/1689 — 13 juin 2024", date: "2024-06-13", url: "https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=OJ:L_202401689", summary: "Encadre les systèmes d'IA selon une approche fondée sur les risques.", tags: ["intelligence artificielle", "AI Act", "Union européenne", "risques"] },
  // Textes canoniques
  { code: "GLOBAL-CAN-CODE-1983-001-V3", domain: "Textes canoniques", type: "CODE", title: "Code de droit canonique (Codex Iuris Canonici)", ref: "Constitution apostolique Sacrae Disciplinae Leges — 25 janvier 1983", date: "1983-01-25", url: "https://www.vatican.va/archive/cod-iuris-canonici/cic_index_fr.html", summary: "Recueil officiel des lois de l'Église catholique latine.", tags: ["droit canonique", "Église catholique", "Vatican", "canon"] },
  { code: "GLOBAL-CAN-CODE-1990-002-V3", domain: "Textes canoniques", type: "CODE", title: "Code des canons des Églises orientales (CCEO)", ref: "Constitution apostolique Sacri Canones — 18 octobre 1990", date: "1990-10-18", url: "https://www.vatican.va/", summary: "Code de droit canonique propre aux Églises catholiques orientales.", tags: ["droit canonique", "Églises orientales", "Vatican", "canon"] },
];

(async () => {
  const country = await prisma.country.findUnique({ where: { code: "GLOBAL" }, select: { id: true } });
  if (!country) { console.log("Pays GLOBAL introuvable."); await prisma.$disconnect(); return; }
  const admin = await prisma.user.findFirst({ where: { roles: { some: { role: { key: "super_admin" } } } }, select: { id: true } });

  for (const c of ACADEMY_CATS) await prisma.academyCategory.upsert({ where: { key: c.key }, update: { name: c.name, order: c.order, icon: c.icon }, create: c });

  const catCache = new Map();
  async function categoryId(name) {
    const key = "lt-" + slug(name);
    if (catCache.has(key)) return catCache.get(key);
    const cat = await prisma.legalTextCategory.upsert({ where: { key }, update: {}, create: { name, key } });
    catCache.set(key, cat.id);
    return cat.id;
  }

  let created = 0, skipped = 0;
  for (const t of TEXTS) {
    if (await prisma.legalText.findUnique({ where: { code: t.code } })) { skipped++; continue; }
    const catId = await categoryId(t.domain);
    await prisma.legalText.create({
      data: {
        code: t.code, title: t.title, officialNumber: t.ref, countryId: country.id, categoryId: catId,
        type: t.type, status: "IN_FORCE", verificationLevel: "V3", language: "fr", confidentiality: "PUBLIC",
        summary: t.summary, sourceUrl: t.url, signatureDate: new Date(t.date), effectiveDate: new Date(t.date),
        currentVersion: 1, depositedById: admin?.id, validatedById: admin?.id,
        tags: { connectOrCreate: t.tags.map((name) => ({ where: { name }, create: { name } })) },
        versions: { create: { version: 1, note: "Corpus international EduLex Global (référence officielle).", status: "IN_FORCE", verificationLevel: "V3" } },
      },
    });
    created++;
  }

  // Export JSON versionné.
  const all = await prisma.legalText.findMany({ where: { countryId: country.id, deletedAt: null }, orderBy: { code: "asc" }, select: { code: true, title: true, officialNumber: true, type: true, status: true, verificationLevel: true, language: true, confidentiality: true, summary: true, sourceUrl: true, signatureDate: true, effectiveDate: true, currentVersion: true, category: { select: { name: true } }, tags: { select: { name: true } } } });
  const data = all.map((t) => ({ code: t.code, title: t.title, officialNumber: t.officialNumber, type: t.type, status: t.status, verificationLevel: t.verificationLevel, language: t.language, confidentiality: t.confidentiality, summary: t.summary, sourceUrl: t.sourceUrl, signatureDate: t.signatureDate ? t.signatureDate.toISOString().slice(0, 10) : null, effectiveDate: t.effectiveDate ? t.effectiveDate.toISOString().slice(0, 10) : null, currentVersion: t.currentVersion, categoryName: t.category ? t.category.name : null, tags: t.tags.map((x) => x.name) }));
  fs.writeFileSync("prisma/data/edulex-global-corpus.json", JSON.stringify({ country: "GLOBAL", generatedAt: new Date().toISOString().slice(0, 10), count: data.length, texts: data }, null, 2));

  console.log(`Global : ${created} importés, ${skipped} déjà présents. Total textes GLOBAL : ${all.length}. JSON exporté.`);
  await prisma.$disconnect();
})().catch((e) => { console.error(e); process.exit(1); });
