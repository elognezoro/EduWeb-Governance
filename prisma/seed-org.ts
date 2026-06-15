import { PrismaClient } from "@prisma/client";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

const WF_NAME = "Hiérarchie de validation";

interface OrgConfig {
  country: string;
  government: { name: string; effectiveDate: string; endDate: string | null; sourceUrl: string | null };
  ministries: { name: string; code: string | null; order: number; sectorCode: string | null }[];
  validationHierarchy: string[];
}

/**
 * Configuration institutionnelle versionnée : gouvernement daté, composition
 * ministérielle complète et hiérarchie de validation. Idempotent (clés métier).
 */
export async function seedOrg(prisma: PrismaClient): Promise<void> {
  const file = join(process.cwd(), "prisma", "data", "eduweb-org.json");
  if (!existsSync(file)) { console.log("ℹ️  eduweb-org.json absent — config institutionnelle ignorée."); return; }
  const cfg = JSON.parse(readFileSync(file, "utf-8")) as OrgConfig;

  const country = await prisma.country.findUnique({ where: { code: cfg.country }, select: { id: true } });
  if (!country) { console.log(`⚠️  Pays ${cfg.country} introuvable — config ignorée.`); return; }

  // ── Gouvernement (find-or-create par pays + nom) ───────────────────────────
  const govData = {
    effectiveDate: new Date(cfg.government.effectiveDate),
    endDate: cfg.government.endDate ? new Date(cfg.government.endDate) : null,
    sourceUrl: cfg.government.sourceUrl ?? undefined,
  };
  let gov = await prisma.government.findFirst({ where: { countryId: country.id, name: cfg.government.name }, select: { id: true } });
  if (gov) {
    await prisma.government.update({ where: { id: gov.id }, data: govData });
  } else {
    gov = await prisma.government.create({ data: { countryId: country.id, name: cfg.government.name, ...govData }, select: { id: true } });
  }

  // ── Ministères (rattachés au gouvernement, secteur par code) ───────────────
  const sectors = await prisma.sector.findMany({ where: { countryId: country.id }, select: { id: true, code: true } });
  const sectorIdByCode = new Map(sectors.filter((s) => s.code).map((s) => [s.code as string, s.id]));

  let created = 0, updated = 0;
  for (const m of cfg.ministries) {
    const sectorId = m.sectorCode ? sectorIdByCode.get(m.sectorCode) ?? null : null;
    const existing = m.code
      ? await prisma.ministry.findFirst({ where: { countryId: country.id, code: m.code }, select: { id: true } })
      : await prisma.ministry.findFirst({ where: { countryId: country.id, name: m.name }, select: { id: true } });
    const data = { name: m.name, code: m.code ?? undefined, order: m.order, governmentId: gov.id, sectorId };
    if (existing) {
      await prisma.ministry.update({ where: { id: existing.id }, data });
      updated++;
    } else {
      await prisma.ministry.create({ data: { ...data, countryId: country.id } });
      created++;
    }
  }

  // ── Hiérarchie de validation (Workflow + étapes) ───────────────────────────
  const valid = new Set(
    (await prisma.role.findMany({ where: { key: { in: cfg.validationHierarchy }, scope: "GOVERNANCE" }, select: { key: true } })).map((r) => r.key)
  );
  const keys = cfg.validationHierarchy.filter((k) => valid.has(k));
  const steps = keys.map((k, i) => ({ order: i, name: `Niveau ${i + 1}`, roleKey: k }));
  const wf = await prisma.workflow.findFirst({ where: { name: WF_NAME }, select: { id: true } });
  if (wf) {
    await prisma.workflowStep.deleteMany({ where: { workflowId: wf.id } });
    await prisma.workflow.update({ where: { id: wf.id }, data: { isActive: true, steps: { create: steps } } });
  } else {
    await prisma.workflow.create({ data: { name: WF_NAME, description: "Chaîne de validation hiérarchique des activités.", isActive: true, steps: { create: steps } } });
  }

  console.log(`🏛️  Config institutionnelle : « ${cfg.government.name} », ministères ${created} créé(s) / ${updated} mis à jour, hiérarchie ${keys.length} niveau(x).`);
}
