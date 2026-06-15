import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const MONTHS = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];

function startsFor(g: string): Date[] {
  const now = new Date();
  const s: Date[] = [];
  if (g === "hour") {
    const b = new Date(now); b.setMinutes(0, 0, 0);
    for (let i = 23; i >= 0; i--) { const d = new Date(b); d.setHours(b.getHours() - i); s.push(d); }
  } else if (g === "week") {
    const b = new Date(now); b.setHours(0, 0, 0, 0);
    for (let i = 11; i >= 0; i--) { const d = new Date(b); d.setDate(b.getDate() - i * 7); s.push(d); }
  } else if (g === "month") {
    for (let i = 11; i >= 0; i--) s.push(new Date(now.getFullYear(), now.getMonth() - i, 1));
  } else if (g === "year") {
    for (let i = 4; i >= 0; i--) s.push(new Date(now.getFullYear() - i, 0, 1));
  } else {
    // day (défaut)
    const b = new Date(now); b.setHours(0, 0, 0, 0);
    for (let i = 29; i >= 0; i--) { const d = new Date(b); d.setDate(b.getDate() - i); s.push(d); }
  }
  return s;
}

function label(g: string, d: Date): string {
  if (g === "hour") return String(d.getHours()).padStart(2, "0") + "h";
  if (g === "month") return MONTHS[d.getMonth()];
  if (g === "year") return String(d.getFullYear());
  return String(d.getDate()).padStart(2, "0") + "/" + String(d.getMonth() + 1).padStart(2, "0");
}

function bucketIndex(starts: Date[], ts: Date): number {
  const t = ts.getTime();
  let idx = 0;
  for (let i = 0; i < starts.length; i++) { if (t >= starts[i].getTime()) idx = i; else break; }
  return idx;
}

/** Séries temporelles (visites + comptes créés) selon la granularité demandée. */
export async function GET(req: Request) {
  const g = new URL(req.url).searchParams.get("g") || "day";
  const starts = startsFor(g);
  const windowStart = starts[0];

  const [visits, users] = await Promise.all([
    prisma.visit.findMany({ where: { createdAt: { gte: windowStart } }, select: { createdAt: true } }),
    prisma.user.findMany({ where: { createdAt: { gte: windowStart } }, select: { createdAt: true } }),
  ]);

  const data = starts.map((d) => ({ label: label(g, d), vues: 0, comptes: 0 }));
  for (const v of visits) data[bucketIndex(starts, v.createdAt)].vues++;
  for (const u of users) data[bucketIndex(starts, u.createdAt)].comptes++;

  return NextResponse.json({ data });
}
