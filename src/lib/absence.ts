import "server-only";
import type { PrismaClient } from "@prisma/client";
import { ABSENCE_MOTIFS } from "./enums";

export const MOTIF_VALUES = ABSENCE_MOTIFS.map((m) => m.value);

export interface AbsencePolicyValues {
  annualQuotaDays: number;
  warningThresholdDays: number;
}
export const DEFAULT_POLICY: AbsencePolicyValues = { annualQuotaDays: 30, warningThresholdDays: 20 };

/** Nombre de jours d'absence, jours calendaires inclus (min. 1). */
export function daysInclusive(start: Date, end: Date): number {
  const a = new Date(start).setHours(0, 0, 0, 0);
  const b = new Date(end).setHours(0, 0, 0, 0);
  return Math.max(1, Math.round((b - a) / 86_400_000) + 1);
}

/** Politique globale (ou valeurs par défaut si non encore configurée). */
export async function getPolicy(prisma: PrismaClient): Promise<AbsencePolicyValues> {
  const p = await prisma.absencePolicy.findUnique({ where: { scope: "GLOBAL" } });
  return p
    ? { annualQuotaDays: p.annualQuotaDays, warningThresholdDays: p.warningThresholdDays }
    : DEFAULT_POLICY;
}

export interface AgentSummary {
  byMotif: Record<string, number>;
  total: number;
  ratio: number; // total / quota annuel
  percent: number; // round(ratio * 100)
  overThreshold: boolean;
  overQuota: boolean;
}

export function summarize(records: { motif: string; days: number }[], policy: AbsencePolicyValues): AgentSummary {
  const byMotif: Record<string, number> = {};
  for (const v of MOTIF_VALUES) byMotif[v] = 0;
  let total = 0;
  for (const r of records) {
    byMotif[r.motif] = (byMotif[r.motif] ?? 0) + r.days;
    total += r.days;
  }
  const ratio = policy.annualQuotaDays > 0 ? total / policy.annualQuotaDays : 0;
  return {
    byMotif,
    total,
    ratio,
    percent: Math.round(ratio * 100),
    overThreshold: total >= policy.warningThresholdDays,
    overQuota: total > policy.annualQuotaDays,
  };
}

export interface ManagedAgent {
  id: string;
  firstName: string;
  lastName: string;
  structure: { name: string } | null;
  ministry: { name: string } | null;
}

/** Agents suivis : reports directs du supérieur, ou tous les agents actifs si `all`. */
export async function getManagedAgents(prisma: PrismaClient, managerId: string, all: boolean): Promise<ManagedAgent[]> {
  return prisma.user.findMany({
    where: all ? { deletedAt: null, isActive: true, id: { not: managerId } } : { deletedAt: null, managerId },
    orderBy: [{ lastName: "asc" }, { firstName: "asc" }],
    select: {
      id: true,
      firstName: true,
      lastName: true,
      structure: { select: { name: true } },
      ministry: { select: { name: true } },
    },
  });
}

/** Total des jours d'absence **approuvés** cumulés d'un agent sur une année. */
export async function agentYearTotal(prisma: PrismaClient, agentId: string, year: number): Promise<number> {
  const agg = await prisma.absenceRecord.aggregate({ where: { agentId, year, status: "APPROVED" }, _sum: { days: true } });
  return agg._sum.days ?? 0;
}
