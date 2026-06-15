/**
 * Seed de démonstration EduWeb Governance.
 *
 * ⚠️  Données FICTIVES à but de démonstration — ne pas présenter comme officielles.
 *     Mot de passe commun aux comptes de test : « password123 ».
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  SYSTEM_ROLES,
  PERMISSION_MODULES,
  PERMISSION_ACTIONS,
} from "../src/lib/enums";
import { seedCorpus } from "./seed-corpus";

const prisma = new PrismaClient();

// Mapping rôle → permissions ("*" = toutes).
const ROLE_PERMS: Record<string, string[] | "*"> = {
  super_admin: "*",
  institution_admin: ["organization:manage", "user:manage", "form:manage", "activity:read", "activity:validate", "report:manage", "report:export", "edulex:read", "academy:read"],
  national_manager: ["activity:read", "activity:validate", "report:create", "report:read", "report:export", "edulex:read", "academy:read"],
  regional_manager: ["activity:read", "activity:validate", "activity:update", "report:read", "edulex:read"],
  local_manager: ["activity:create", "activity:read", "activity:update", "activity:validate", "edulex:read"],
  director_general: ["organization:read", "user:read", "form:read", "activity:read", "activity:validate", "report:create", "report:read", "report:export", "edulex:read", "academy:read"],
  director: ["form:read", "activity:read", "activity:update", "activity:validate", "report:create", "report:read", "edulex:read", "academy:read"],
  deputy_director: ["activity:create", "activity:read", "activity:update", "activity:validate", "report:read", "edulex:read", "academy:read"],
  agent: ["activity:create", "activity:read", "activity:update", "form:read", "edulex:read", "academy:read"],
  auditor: ["activity:read", "report:read", "edulex:read", "admin:read"],
  reader: ["activity:read", "report:read", "edulex:read", "academy:read"],
  edulex_super_admin: ["edulex:manage", "edulex:read", "edulex:create", "edulex:update", "edulex:validate", "edulex:publish", "edulex:archive", "edulex:import", "edulex:export"],
  edulex_country_admin: ["edulex:manage", "edulex:read", "edulex:create", "edulex:update", "edulex:validate", "edulex:publish"],
  edulex_ministry_admin: ["edulex:read", "edulex:create", "edulex:update", "edulex:validate"],
  edulex_depositor: ["edulex:create", "edulex:read", "edulex:update", "edulex:import"],
  edulex_doc_validator: ["edulex:read", "edulex:validate"],
  edulex_legal_validator: ["edulex:read", "edulex:validate", "edulex:publish"],
  academy_editor: ["academy:manage", "academy:create", "academy:read", "academy:update", "academy:publish"],
  academy_learner: ["academy:read"],
  public_authorized: ["academy:read", "edulex:read"],
};

async function clean() {
  // Suppression dans l'ordre enfants → parents (idempotence du seed).
  await prisma.questionAttempt.deleteMany();
  await prisma.questionChoice.deleteMany();
  await prisma.question.deleteMany();
  await prisma.academyLesson.deleteMany();
  await prisma.academyUnit.deleteMany();
  await prisma.userProgress.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.academyPath.deleteMany();
  await prisma.academyCategory.deleteMany();
  await prisma.challengeAttempt.deleteMany();
  await prisma.challenge.deleteMany();
  await prisma.reviewRecommendation.deleteMany();
  await prisma.userBadge.deleteMany();
  await prisma.badge.deleteMany();
  await prisma.userXP.deleteMany();
  await prisma.validationAction.deleteMany();
  await prisma.activityAttachment.deleteMany();
  await prisma.legalValidationAction.deleteMany();
  await prisma.legalTextVersion.deleteMany();
  await prisma.legalTextRelation.deleteMany();
  await prisma.legalTextAttachment.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.report.deleteMany();
  await prisma.reportTemplate.deleteMany();
  await prisma.legalText.deleteMany();
  await prisma.legalTextCategory.deleteMany();
  await prisma.legalTextTag.deleteMany();
  await prisma.jurisdiction.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.fileAsset.deleteMany();
  await prisma.workflowStep.deleteMany();
  await prisma.workflow.deleteMany();
  await prisma.activityFormField.deleteMany();
  await prisma.activityForm.deleteMany();
  await prisma.session.deleteMany();
  await prisma.userRole.deleteMany();
  await prisma.user.deleteMany();
  await prisma.structure.deleteMany();
  await prisma.region.deleteMany();
  await prisma.ministry.deleteMany();
  await prisma.sector.deleteMany();
  await prisma.organization.deleteMany();
  await prisma.permission.deleteMany();
  await prisma.role.deleteMany();
  await prisma.country.deleteMany();
}

function monthsAgo(n: number): Date {
  const d = new Date();
  d.setMonth(d.getMonth() - n);
  return d;
}

async function main() {
  console.log("🌱 Nettoyage…");
  await clean();

  // ── Pays ──────────────────────────────────────────────────────────────────
  console.log("🌍 Pays…");
  const countryData = [
    { code: "CI", name: "Côte d'Ivoire", namespace: "EduLex CI", flag: "🇨🇮", order: 1 },
    { code: "SN", name: "Sénégal", namespace: "EduLex SN", flag: "🇸🇳", order: 2 },
    { code: "BJ", name: "Bénin", namespace: "EduLex BJ", flag: "🇧🇯", order: 3 },
    { code: "CM", name: "Cameroun", namespace: "EduLex CM", flag: "🇨🇲", order: 4 },
    { code: "FR", name: "France", namespace: "EduLex FR", flag: "🇫🇷", order: 5 },
    { code: "GLOBAL", name: "International", namespace: "EduLex Global", flag: "🌐", order: 6 },
  ];
  const countries: Record<string, string> = {};
  for (const c of countryData) {
    const created = await prisma.country.create({ data: c });
    countries[c.code] = created.id;
  }

  // ── Permissions ─────────────────────────────────────────────────────────────
  console.log("🔐 Permissions & rôles…");
  for (const module of PERMISSION_MODULES) {
    for (const action of PERMISSION_ACTIONS) {
      await prisma.permission.create({
        data: { key: `${module}:${action}`, module, action },
      });
    }
  }
  const allPerms = await prisma.permission.findMany();
  const permByKey: Record<string, string> = {};
  for (const p of allPerms) permByKey[p.key] = p.id;

  // ── Rôles ─────────────────────────────────────────────────────────────────
  const roles: Record<string, string> = {};
  for (const r of SYSTEM_ROLES) {
    const wanted = ROLE_PERMS[r.key];
    const permIds =
      wanted === "*"
        ? allPerms.map((p) => ({ id: p.id }))
        : (wanted ?? []).map((k) => ({ id: permByKey[k] })).filter((x) => x.id);
    const role = await prisma.role.create({
      data: {
        key: r.key,
        name: r.name,
        scope: r.scope,
        isSystem: true,
        permissions: { connect: permIds },
      },
    });
    roles[r.key] = role.id;
  }

  // ── Secteurs, ministères, juridiction (CI) ──────────────────────────────────
  console.log("🏛️  Secteurs, ministères, structures…");
  const secEdu = await prisma.sector.create({ data: { name: "Éducation et formation", code: "EDU", countryId: countries.CI } });
  const secSup = await prisma.sector.create({ data: { name: "Enseignement supérieur et recherche", code: "SUP", countryId: countries.CI } });
  await prisma.sector.create({ data: { name: "Fonction publique", code: "FP", countryId: countries.CI } });

  const minEdu = await prisma.ministry.create({ data: { name: "Ministère de l'Éducation nationale et de l'Alphabétisation", code: "MENA", countryId: countries.CI, sectorId: secEdu.id } });
  const minSup = await prisma.ministry.create({ data: { name: "Ministère de l'Enseignement supérieur et de la Recherche scientifique", code: "MESRS", countryId: countries.CI, sectorId: secSup.id } });

  const jurCI = await prisma.jurisdiction.create({ data: { name: "République de Côte d'Ivoire", code: "CI", countryId: countries.CI } });

  // ── Organisations & structures ──────────────────────────────────────────────
  const orgEduweb = await prisma.organization.create({ data: { name: "EduWeb", slug: "eduweb", type: "COMPANY", countryId: countries.CI } });
  const orgMin = await prisma.organization.create({ data: { name: "Ministère de démonstration", slug: "ministere-demo", type: "MINISTRY", countryId: countries.CI } });

  const dirCentrale = await prisma.structure.create({ data: { name: "Direction Centrale de la Pédagogie", type: "DIRECTION", organizationId: orgMin.id, countryId: countries.CI } });
  const serviceFormation = await prisma.structure.create({ data: { name: "Service de la Formation Continue", type: "SERVICE", organizationId: orgMin.id, parentId: dirCentrale.id, countryId: countries.CI } });
  await prisma.structure.create({ data: { name: "Direction Régionale des Lagunes", type: "REGION", organizationId: orgMin.id, parentId: dirCentrale.id, countryId: countries.CI } });

  // ── Utilisateurs ────────────────────────────────────────────────────────────
  console.log("👤 Utilisateurs…");
  const hash = bcrypt.hashSync("password123", 10);
  const userSpecs = [
    { email: "admin@eduweb.ci", firstName: "Awa", lastName: "Koné", roles: ["super_admin"], orgId: orgEduweb.id },
    { email: "directeur@eduweb.ci", firstName: "Jean", lastName: "Brou", roles: ["institution_admin", "national_manager"], orgId: orgMin.id, structureId: dirCentrale.id },
    { email: "agent@eduweb.ci", firstName: "Fatou", lastName: "Diarra", roles: ["agent"], orgId: orgMin.id, structureId: serviceFormation.id, ministryId: minEdu.id },
    { email: "juriste@eduweb.ci", firstName: "Koffi", lastName: "N'Guessan", roles: ["edulex_legal_validator", "edulex_doc_validator"], orgId: orgMin.id, ministryId: minEdu.id },
    { email: "apprenant@eduweb.ci", firstName: "Aya", lastName: "Touré", roles: ["academy_learner"] },
  ];
  const users: Record<string, string> = {};
  for (const u of userSpecs) {
    const created = await prisma.user.create({
      data: {
        email: u.email,
        passwordHash: hash,
        firstName: u.firstName,
        lastName: u.lastName,
        isActive: true,
        countryId: countries.CI,
        organizationId: u.orgId,
        structureId: u.structureId,
        ministryId: u.ministryId,
        roles: { create: u.roles.map((rk) => ({ roleId: roles[rk] })) },
      },
    });
    users[u.email] = created.id;
  }
  // Manager de la direction
  await prisma.structure.update({ where: { id: dirCentrale.id }, data: { managerId: users["directeur@eduweb.ci"] } });

  // ── Textes EduLex ───────────────────────────────────────────────────────────
  console.log("⚖️  Textes EduLex…");
  const juristeId = users["juriste@eduweb.ci"];

  const constitution = await prisma.legalText.create({
    data: {
      code: "CI-PR-CST-CONST-2016-001-V3",
      title: "Constitution de la République de Côte d'Ivoire",
      officialNumber: "2016-886",
      countryId: countries.CI,
      jurisdictionId: jurCI.id,
      type: "CONST",
      status: "IN_FORCE",
      verificationLevel: "V3",
      language: "fr",
      confidentiality: "PUBLIC",
      signatureDate: new Date("2016-11-08"),
      publicationDate: new Date("2016-11-09"),
      effectiveDate: new Date("2016-11-08"),
      summary: "Loi fondamentale fixant l'organisation des pouvoirs publics, les droits et devoirs fondamentaux et les institutions de la République.",
      sourceUrl: "https://www.gouv.ci",
      currentVersion: 3,
      depositedById: juristeId,
      validatedById: juristeId,
      versions: {
        create: [
          { version: 1, note: "Texte initial indexé.", verificationLevel: "V1", createdAt: monthsAgo(10) },
          { version: 2, note: "Métadonnées complétées par le service technique.", verificationLevel: "V2", createdAt: monthsAgo(6) },
          { version: 3, note: "Validation juridique.", verificationLevel: "V3", createdAt: monthsAgo(2) },
        ],
      },
    },
  });

  const loi1995 = await prisma.legalText.create({
    data: {
      code: "CI-MENA-EDU-LOI-1995-007-V1",
      title: "Loi n°95-696 relative à l'enseignement (ancienne)",
      officialNumber: "95-696",
      countryId: countries.CI,
      jurisdictionId: jurCI.id,
      ministryId: minEdu.id,
      sectorId: secEdu.id,
      type: "LOI",
      status: "ABROGATED",
      verificationLevel: "V3",
      publicationDate: new Date("1995-09-07"),
      summary: "Ancienne loi relative à l'enseignement, abrogée et remplacée par la loi d'orientation de 2015.",
      depositedById: juristeId,
    },
  });

  const loi2015 = await prisma.legalText.create({
    data: {
      code: "CI-MENA-EDU-LOI-2015-635-V2",
      title: "Loi d'orientation sur l'École n°2015-635",
      officialNumber: "2015-635",
      countryId: countries.CI,
      jurisdictionId: jurCI.id,
      ministryId: minEdu.id,
      sectorId: secEdu.id,
      type: "LOI",
      status: "IN_FORCE",
      verificationLevel: "V4",
      publicationDate: new Date("2015-09-17"),
      effectiveDate: new Date("2015-09-17"),
      summary: "Loi d'orientation définissant les finalités du système éducatif ivoirien et l'obligation scolaire.",
      sourceUrl: "https://www.gouv.ci",
      currentVersion: 2,
      depositedById: juristeId,
      validatedById: juristeId,
    },
  });

  await prisma.legalText.create({
    data: {
      code: "CI-MENA-EDU-DEC-2026-004-V1",
      title: "Décret relatif à la formation continue des enseignants",
      officialNumber: "2026-004",
      countryId: countries.CI,
      jurisdictionId: jurCI.id,
      ministryId: minEdu.id,
      sectorId: secEdu.id,
      type: "DEC",
      status: "IN_FORCE",
      verificationLevel: "V2",
      publicationDate: monthsAgo(3),
      summary: "Modalités d'organisation de la formation continue et du perfectionnement des personnels enseignants.",
      depositedById: juristeId,
    },
  });

  await prisma.legalText.create({
    data: {
      code: "CI-MESRS-SUP-ARR-2026-012-V1",
      title: "Arrêté portant organisation des examens universitaires",
      officialNumber: "2026-012",
      countryId: countries.CI,
      jurisdictionId: jurCI.id,
      ministryId: minSup.id,
      sectorId: secSup.id,
      type: "ARR",
      status: "IN_FORCE",
      verificationLevel: "V1",
      publicationDate: monthsAgo(1),
      summary: "Organisation et déroulement des sessions d'examens dans les établissements d'enseignement supérieur.",
      depositedById: juristeId,
    },
  });

  await prisma.legalText.create({
    data: {
      code: "CI-MENA-EDU-CIRC-2024-099-V0",
      title: "Circulaire relative à la rentrée scolaire (import non vérifié)",
      countryId: countries.CI,
      ministryId: minEdu.id,
      sectorId: secEdu.id,
      type: "CIRC",
      status: "IMPORTED_UNVERIFIED",
      verificationLevel: "V0",
      publicationDate: monthsAgo(8),
      summary: "Entrée importée automatiquement, non encore vérifiée par un service technique.",
    },
  });

  await prisma.legalText.create({
    data: {
      code: "GLOBAL-UNESCO-EDU-REC-2023-001-V1",
      title: "Recommandation de l'UNESCO sur l'éducation à la citoyenneté mondiale",
      countryId: countries.GLOBAL,
      type: "REC",
      status: "IN_FORCE",
      verificationLevel: "V2",
      language: "fr",
      publicationDate: new Date("2023-11-20"),
      summary: "Cadre international pour l'éducation à la citoyenneté mondiale et au développement durable.",
      sourceUrl: "https://www.unesco.org",
    },
  });

  // Relation : la loi de 2015 remplace celle de 1995
  await prisma.legalTextRelation.create({
    data: { sourceId: loi2015.id, targetId: loi1995.id, type: "REPLACES", note: "Abrogation de l'ancienne loi." },
  });

  // ── Activités ───────────────────────────────────────────────────────────────
  console.log("📋 Activités…");
  const agentId = users["agent@eduweb.ci"];
  const activitySpecs = [
    { title: "Atelier de formation continue – Région des Lagunes", status: "VALIDATED", month: 4, link: [loi2015.id] },
    { title: "Campagne d'alphabétisation des adultes", status: "CONSOLIDATED", month: 3, link: [] },
    { title: "Mission de supervision pédagogique", status: "IN_REVIEW", month: 2, link: [] },
    { title: "Rapport mensuel d'activités pédagogiques", status: "SUBMITTED", month: 1, link: [] },
    { title: "Séminaire sur l'éducation à la citoyenneté", status: "VALIDATED", month: 1, link: [constitution.id] },
    { title: "Préparation de la rentrée scolaire", status: "DRAFT", month: 0, link: [] },
  ];
  for (const a of activitySpecs) {
    await prisma.activity.create({
      data: {
        title: a.title,
        authorId: agentId,
        organizationId: orgMin.id,
        structureId: serviceFormation.id,
        countryId: countries.CI,
        status: a.status,
        createdAt: monthsAgo(a.month),
        submittedAt: a.status === "DRAFT" ? null : monthsAgo(a.month),
        legalTexts: a.link.length ? { connect: a.link.map((id) => ({ id })) } : undefined,
        validationActions:
          a.status === "VALIDATED" || a.status === "CONSOLIDATED"
            ? { create: { actorId: users["directeur@eduweb.ci"], decision: "VALIDATE", comment: "Validé après vérification.", fromStatus: "SUBMITTED", toStatus: a.status } }
            : undefined,
      },
    });
  }

  // ── Rapport ─────────────────────────────────────────────────────────────────
  await prisma.report.create({
    data: {
      title: "Rapport mensuel d'activités — Direction Centrale",
      period: "MONTHLY",
      status: "GENERATED",
      countryId: countries.CI,
      organizationId: orgMin.id,
      structureId: dirCentrale.id,
      generatedById: users["directeur@eduweb.ci"],
      createdAt: monthsAgo(1),
    },
  });

  // ── EduLex Academy ──────────────────────────────────────────────────────────
  console.log("🎓 EduLex Academy…");
  const catData = [
    { name: "Constitution et institutions", key: "constitution", icon: "Landmark", order: 1 },
    { name: "Droits et devoirs du citoyen", key: "droits", icon: "Scale", order: 2 },
    { name: "Éducation et formation", key: "education", icon: "BookOpen", order: 3 },
    { name: "Fonction publique", key: "fonction-publique", icon: "Briefcase", order: 4 },
    { name: "Enseignement supérieur et recherche", key: "sup", icon: "GraduationCap", order: 5 },
    { name: "Santé", key: "sante", icon: "HeartPulse", order: 6 },
    { name: "Foncier rural", key: "foncier-rural", icon: "Sprout", order: 7 },
    { name: "Foncier urbain", key: "foncier-urbain", icon: "Building2", order: 8 },
    { name: "Citoyenneté", key: "citoyennete", icon: "Users", order: 9 },
    { name: "État civil", key: "etat-civil", icon: "IdCard", order: 10 },
    { name: "Environnement et développement durable", key: "environnement", icon: "Leaf", order: 11 },
    { name: "Arts et Culture", key: "arts-culture", icon: "Palette", order: 12 },
    { name: "Finances publiques et fiscalité", key: "finances", icon: "Landmark", order: 13 },
    { name: "Commerce et industrie", key: "commerce", icon: "Store", order: 14 },
    { name: "Agriculture, pêche et ressources animales", key: "agriculture", icon: "Sprout", order: 15 },
    { name: "Communication, médias et numérique", key: "communication", icon: "Radio", order: 16 },
    { name: "Économie et finances internationales", key: "economie", icon: "TrendingUp", order: 17 },
    { name: "Intelligence artificielle", key: "ia", icon: "Cpu", order: 18 },
    { name: "Textes canoniques", key: "canonique", icon: "BookMarked", order: 19 },
  ];
  const cats: Record<string, string> = {};
  for (const c of catData) {
    const created = await prisma.academyCategory.create({ data: c });
    cats[c.key] = created.id;
  }

  const path = await prisma.academyPath.create({
    data: {
      title: "Constitution et citoyenneté",
      description: "Découvrez la loi fondamentale ivoirienne, vos droits et vos devoirs de citoyen.",
      categoryId: cats.constitution,
      countryId: countries.CI,
      level: 1,
      order: 1,
      isPublished: true,
    },
  });

  const unit1 = await prisma.academyUnit.create({ data: { title: "Les fondamentaux de la Constitution", pathId: path.id, order: 1 } });
  const unit2 = await prisma.academyUnit.create({ data: { title: "Droits et devoirs du citoyen", pathId: path.id, order: 2, requiresId: unit1.id } });

  const lesson1 = await prisma.academyLesson.create({ data: { title: "Qu'est-ce que la Constitution ?", unitId: unit1.id, order: 1 } });
  await prisma.academyLesson.create({ data: { title: "Les institutions de la République", unitId: unit1.id, order: 2 } });
  await prisma.academyLesson.create({ data: { title: "Libertés et droits fondamentaux", unitId: unit2.id, order: 1 } });

  // Questions reliées au texte source
  const q1 = await prisma.question.create({
    data: {
      lessonId: lesson1.id,
      type: "QCU",
      prompt: "Quel texte constitue la loi fondamentale de la Côte d'Ivoire ?",
      explanation: "La Constitution est la norme suprême : elle fonde la République et prime sur les autres textes.",
      difficulty: "EASY",
      level: 1,
      points: 10,
      status: "PUBLISHED",
      legalTextId: constitution.id,
      articleRef: "Préambule",
      countryId: countries.CI,
      sectorId: secEdu.id,
    },
  });
  await prisma.questionChoice.createMany({
    data: [
      { questionId: q1.id, label: "La Constitution", isCorrect: true, order: 1 },
      { questionId: q1.id, label: "Un décret présidentiel", isCorrect: false, order: 2 },
      { questionId: q1.id, label: "Un arrêté ministériel", isCorrect: false, order: 3 },
      { questionId: q1.id, label: "Une circulaire", isCorrect: false, order: 4 },
    ],
  });

  const q2 = await prisma.question.create({
    data: {
      lessonId: lesson1.id,
      type: "TRUE_FALSE",
      prompt: "Une circulaire a une valeur juridique supérieure à la Constitution.",
      explanation: "Faux. La hiérarchie des normes place la Constitution au sommet ; une circulaire est un acte d'application de rang très inférieur.",
      difficulty: "EASY",
      level: 1,
      points: 10,
      status: "PUBLISHED",
      legalTextId: constitution.id,
      countryId: countries.CI,
    },
  });
  await prisma.questionChoice.createMany({
    data: [
      { questionId: q2.id, label: "Vrai", isCorrect: false, order: 1 },
      { questionId: q2.id, label: "Faux", isCorrect: true, order: 2 },
    ],
  });

  // ── Badges ──────────────────────────────────────────────────────────────────
  console.log("🏅 Badges…");
  const badgeData = [
    { key: "citoyen-averti", name: "Citoyen averti", icon: "ShieldCheck", description: "A complété un premier parcours de citoyenneté." },
    { key: "defenseur-droits", name: "Défenseur des droits", icon: "Scale", description: "Maîtrise des droits et devoirs fondamentaux." },
    { key: "maitre-procedures", name: "Maître des procédures", icon: "ClipboardCheck", description: "Excellence sur les procédures administratives." },
    { key: "referent-constitution", name: "Référent Constitution", icon: "Landmark", description: "Expert de la loi fondamentale." },
    { key: "expert-fonction-publique", name: "Expert Fonction publique", icon: "Briefcase", description: "Maîtrise du statut de la fonction publique." },
    { key: "ambassadeur-conformite", name: "Ambassadeur de la conformité", icon: "BadgeCheck", description: "Promeut la conformité réglementaire." },
    { key: "veilleur-edulex", name: "Veilleur réglementaire EduLex", icon: "Eye", description: "Suit l'évolution des textes." },
    { key: "explorateur-international", name: "Explorateur EduLex International", icon: "Globe2", description: "A exploré des textes de plusieurs pays." },
  ];
  const badges: Record<string, string> = {};
  for (const b of badgeData) {
    const created = await prisma.badge.create({ data: b });
    badges[b.key] = created.id;
  }

  // ── Progression & gamification (apprenant) ──────────────────────────────────
  const apprenantId = users["apprenant@eduweb.ci"];
  await prisma.userXP.create({ data: { userId: apprenantId, totalXp: 120, level: 2, streak: 3, lastActivityDate: new Date() } });
  await prisma.userXP.create({ data: { userId: agentId, totalXp: 40, level: 1, streak: 1, lastActivityDate: new Date() } });
  await prisma.userProgress.create({ data: { userId: apprenantId, pathId: path.id, status: "IN_PROGRESS", progress: 40 } });
  await prisma.userBadge.create({ data: { userId: apprenantId, badgeId: badges["citoyen-averti"] } });

  // ── Notifications ────────────────────────────────────────────────────────────
  await prisma.notification.createMany({
    data: [
      { userId: agentId, type: "VALIDATED", title: "Activité validée", body: "Votre « Atelier de formation continue » a été validé.", isRead: false },
      { userId: agentId, type: "DEADLINE", title: "Échéance proche", body: "Le rapport mensuel doit être soumis avant la fin du mois.", isRead: false },
      { userId: juristeId, type: "TEXT_PUBLISHED", title: "Texte à vérifier", body: "Une circulaire importée (V0) attend une vérification documentaire.", isRead: false },
    ],
  });

  // Corpus officiel EduLex CI (textes validés) + évaluations 5 niveaux — reproductible en production.
  await seedCorpus(prisma);

  console.log("✅ Seed terminé.");
  console.log("   Comptes : admin@eduweb.ci · agent@eduweb.ci · juriste@eduweb.ci · directeur@eduweb.ci · apprenant@eduweb.ci");
  console.log("   Mot de passe : password123");
}

main()
  .catch((e) => {
    console.error("❌ Seed échoué :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
