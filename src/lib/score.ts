import "server-only";
import type { PrismaClient } from "@prisma/client";

const ACTIVITY_DONE = ["VALIDATED", "CONSOLIDATED"];
const WEEK_MS = 7 * 24 * 3600 * 1000;

export interface WeekScore {
  from: Date;
  to: Date;
  done: number;
  total: number;
  score: number;
}

export interface ScoreReport {
  current: number;
  trend: number; // delta vs semaine précédente
  weeks: WeekScore[]; // de la plus ancienne à la plus récente
  breakdown: { rdv: { done: number; total: number }; activites: { done: number; total: number } };
  weakest: "rdv" | "activites" | null; // secteur le plus faible (pour conseils IA)
}

/** Score de productivité (0-100) de la semaine courante + évolution sur N semaines. */
export async function getScoreReport(prisma: PrismaClient, userId: string, weeks = 4): Promise<ScoreReport> {
  const now = new Date();
  const windowStart = new Date(now.getTime() - weeks * WEEK_MS);

  const [rdv, acts] = await Promise.all([
    prisma.appointment.findMany({ where: { userId, startAt: { gte: windowStart, lte: now } }, select: { startAt: true, done: true } }),
    prisma.activity.findMany({ where: { authorId: userId, deletedAt: null, createdAt: { gte: windowStart, lte: now } }, select: { createdAt: true, status: true } }),
  ]);

  const buckets: WeekScore[] = [];
  for (let i = weeks - 1; i >= 0; i--) {
    const to = new Date(now.getTime() - i * WEEK_MS);
    const from = new Date(to.getTime() - WEEK_MS);
    const rIn = rdv.filter((r) => r.startAt >= from && r.startAt < to);
    const aIn = acts.filter((a) => a.createdAt >= from && a.createdAt < to);
    const total = rIn.length + aIn.length;
    const done = rIn.filter((r) => r.done).length + aIn.filter((a) => ACTIVITY_DONE.includes(a.status)).length;
    buckets.push({ from, to, done, total, score: total > 0 ? Math.round((done / total) * 100) : 0 });
  }

  const current = buckets[buckets.length - 1].score;
  const trend = current - (buckets[buckets.length - 2]?.score ?? current);

  // Détail de la semaine courante.
  const cFrom = new Date(now.getTime() - WEEK_MS);
  const rNow = rdv.filter((r) => r.startAt >= cFrom);
  const aNow = acts.filter((a) => a.createdAt >= cFrom);
  const breakdown = {
    rdv: { done: rNow.filter((r) => r.done).length, total: rNow.length },
    activites: { done: aNow.filter((a) => ACTIVITY_DONE.includes(a.status)).length, total: aNow.length },
  };
  const rate = (x: { done: number; total: number }) => (x.total > 0 ? x.done / x.total : 1);
  let weakest: ScoreReport["weakest"] = null;
  if (breakdown.rdv.total > 0 || breakdown.activites.total > 0) {
    weakest = rate(breakdown.rdv) <= rate(breakdown.activites) ? "rdv" : "activites";
  }

  return { current, trend, weeks: buckets, breakdown, weakest };
}

export function scoreLabel(s: number): { label: string; tone: "brand" | "gold" | "danger" } {
  if (s >= 75) return { label: "Excellente productivité", tone: "brand" };
  if (s >= 50) return { label: "Bonne productivité", tone: "brand" };
  if (s >= 30) return { label: "Productivité moyenne", tone: "gold" };
  return { label: "Productivité à améliorer", tone: "danger" };
}
