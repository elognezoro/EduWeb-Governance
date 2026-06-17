import "server-only";
import type { PrismaClient } from "@prisma/client";
import type { AbsencePolicyValues } from "./absence";

// Seuils de performance (fixés par le cahier des charges).
export const PERSONAL_MAX_PCT = 20; // affaires personnelles < 20% du congé annuel
export const MEDICAL_MAX_PCT = 40; // raison médicale < 40% du congé annuel
export const REPORTING_MIN_PCT = 50; // régularité du reporting : score du trimestre ≥ 50%

const ACTIVITY_DONE = ["VALIDATED", "CONSOLIDATED"];

export type QuarterState = "upcoming" | "current" | "past";
export type Performance = "good" | "bad";

export interface QuarterDistinction {
  quarter: number; // 1..4
  state: QuarterState;
  performance: Performance | null; // null si trimestre à venir
  reportingScore: number; // 0..100 sur le trimestre
  reportingDone: number;
  reportingTotal: number;
  reportingOk: boolean;
  personalDays: number; // cumul depuis le 1er janvier, jusqu'à la fin du trimestre
  medicalDays: number;
  personalPct: number; // / quota annuel
  medicalPct: number;
  personalOk: boolean;
  medicalOk: boolean;
}

export interface AgentDistinctions {
  quarters: QuarterDistinction[]; // 4
  goodCount: number; // « belles performances » accumulées (trimestres évalués)
  latest: QuarterDistinction | null; // trimestre courant si commencé, sinon dernier passé
}

export const CI_MESSAGES = {
  goodM: "Bro, t'es un dur ! Continue ainsi et le pays sera fier de toi !",
  goodF: "Non, y a pas femme pour toi ! On peut faire ça ? Tu bara propre !",
  goodN: "Belle performance ! Continue ainsi, le pays sera fier de toi.",
  bad: "C'est comment ? Le pays compte sur toi ! Toi-même il faut voir. Science un peu.",
};

export function ciMessage(perf: Performance, gender: string | null | undefined): string {
  if (perf === "bad") return CI_MESSAGES.bad;
  return gender === "M" ? CI_MESSAGES.goodM : gender === "F" ? CI_MESSAGES.goodF : CI_MESSAGES.goodN;
}

function quarterWindow(year: number, q: number): { start: Date; end: Date } {
  return { start: new Date(year, (q - 1) * 3, 1), end: new Date(year, q * 3, 1) };
}

/** Distinctions trimestrielles de chaque agent pour une année (calculées des données). */
export async function getDistinctions(
  prisma: PrismaClient,
  agentIds: string[],
  year: number,
  policy: AbsencePolicyValues
): Promise<Map<string, AgentDistinctions>> {
  const result = new Map<string, AgentDistinctions>();
  if (agentIds.length === 0) return result;

  const now = new Date();
  const yearStart = new Date(year, 0, 1);
  const yearEnd = new Date(year + 1, 0, 1);

  const [activities, absences] = await Promise.all([
    prisma.activity.findMany({
      where: { authorId: { in: agentIds }, deletedAt: null, createdAt: { gte: yearStart, lt: yearEnd } },
      select: { authorId: true, createdAt: true, status: true },
    }),
    prisma.absenceRecord.findMany({
      where: { agentId: { in: agentIds }, year, status: "APPROVED" },
      select: { agentId: true, motif: true, startDate: true, days: true },
    }),
  ]);

  const actByAgent = new Map<string, { createdAt: Date; status: string }[]>();
  for (const a of activities) {
    const arr = actByAgent.get(a.authorId) ?? [];
    arr.push({ createdAt: a.createdAt, status: a.status });
    actByAgent.set(a.authorId, arr);
  }
  const absByAgent = new Map<string, { motif: string; startDate: Date; days: number }[]>();
  for (const r of absences) {
    const arr = absByAgent.get(r.agentId) ?? [];
    arr.push({ motif: r.motif, startDate: r.startDate, days: r.days });
    absByAgent.set(r.agentId, arr);
  }

  const quota = policy.annualQuotaDays > 0 ? policy.annualQuotaDays : 30;

  for (const agentId of agentIds) {
    const acts = actByAgent.get(agentId) ?? [];
    const abs = absByAgent.get(agentId) ?? [];

    const quarters: QuarterDistinction[] = [];
    for (let q = 1; q <= 4; q++) {
      const { start, end } = quarterWindow(year, q);
      const state: QuarterState = start > now ? "upcoming" : end > now ? "current" : "past";

      // Reporting : activités du trimestre.
      const inQ = acts.filter((a) => a.createdAt >= start && a.createdAt < end);
      const reportingTotal = inQ.length;
      const reportingDone = inQ.filter((a) => ACTIVITY_DONE.includes(a.status)).length;
      const reportingScore = reportingTotal > 0 ? Math.round((reportingDone / reportingTotal) * 100) : 0;
      const reportingOk = reportingTotal > 0 && reportingScore >= REPORTING_MIN_PCT;

      // Absences : cumul depuis le 1er janvier jusqu'à la fin du trimestre.
      const through = abs.filter((r) => r.startDate < end);
      const personalDays = through.filter((r) => r.motif === "PERSONAL").reduce((s, r) => s + r.days, 0);
      const medicalDays = through.filter((r) => r.motif === "MEDICAL").reduce((s, r) => s + r.days, 0);
      const personalPct = Math.round((personalDays / quota) * 100);
      const medicalPct = Math.round((medicalDays / quota) * 100);
      const personalOk = personalPct < PERSONAL_MAX_PCT;
      const medicalOk = medicalPct < MEDICAL_MAX_PCT;

      const performance: Performance | null =
        state === "upcoming" ? null : reportingOk && personalOk && medicalOk ? "good" : "bad";

      quarters.push({
        quarter: q, state, performance,
        reportingScore, reportingDone, reportingTotal, reportingOk,
        personalDays, medicalDays, personalPct, medicalPct, personalOk, medicalOk,
      });
    }

    const goodCount = quarters.filter((q) => q.performance === "good").length;
    const current = quarters.find((q) => q.state === "current");
    const lastPast = [...quarters].reverse().find((q) => q.state === "past");
    const latest = current ?? lastPast ?? null;

    result.set(agentId, { quarters, goodCount, latest });
  }

  return result;
}
