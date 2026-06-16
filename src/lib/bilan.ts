import "server-only";
import type { PrismaClient } from "@prisma/client";

export type Periode = "semaine" | "quinzaine" | "mois";

const PERIODES: Record<Periode, { days: number; label: string }> = {
  semaine: { days: 7, label: "7 derniers jours" },
  quinzaine: { days: 15, label: "15 derniers jours" },
  mois: { days: 30, label: "30 derniers jours" },
};

/** Statuts d'activité considérés comme « faits ». */
const ACTIVITY_DONE = ["VALIDATED", "CONSOLIDATED"];

export function normalizePeriode(v: string | undefined): Periode {
  return v === "quinzaine" || v === "mois" ? v : "semaine";
}

export interface BilanItem {
  title: string;
  when: Date;
  done: boolean;
  detail: string;
}

export interface Bilan {
  periode: Periode;
  label: string;
  from: Date;
  to: Date;
  rdv: { total: number; done: number };
  activites: { total: number; done: number };
  total: number;
  done: number;
  percent: number;
  items: BilanItem[];
}

/** Synthèse RDV + activités de l'utilisateur sur la période choisie. */
export async function getBilan(prisma: PrismaClient, userId: string, periode: Periode): Promise<Bilan> {
  const { days, label } = PERIODES[periode];
  const to = new Date();
  const from = new Date(to.getTime() - days * 24 * 3600 * 1000);

  const [rdv, activites] = await Promise.all([
    prisma.appointment.findMany({ where: { userId, startAt: { gte: from, lte: to } }, select: { title: true, startAt: true, done: true }, orderBy: { startAt: "asc" } }),
    prisma.activity.findMany({ where: { authorId: userId, deletedAt: null, createdAt: { gte: from, lte: to } }, select: { title: true, status: true, createdAt: true }, orderBy: { createdAt: "asc" } }),
  ]);

  const rdvDone = rdv.filter((r) => r.done).length;
  const actDone = activites.filter((a) => ACTIVITY_DONE.includes(a.status)).length;
  const total = rdv.length + activites.length;
  const done = rdvDone + actDone;

  const items: BilanItem[] = [
    ...rdv.map((r) => ({ title: r.title, when: r.startAt, done: r.done, detail: "Rendez-vous" })),
    ...activites.map((a) => ({ title: a.title, when: a.createdAt, done: ACTIVITY_DONE.includes(a.status), detail: "Activité" })),
  ].sort((a, b) => b.when.getTime() - a.when.getTime());

  return {
    periode,
    label,
    from,
    to,
    rdv: { total: rdv.length, done: rdvDone },
    activites: { total: activites.length, done: actDone },
    total,
    done,
    percent: total > 0 ? Math.round((done / total) * 100) : 0,
    items,
  };
}
