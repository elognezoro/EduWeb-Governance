import type { Metadata } from "next";
import { CalendarOff } from "lucide-react";
import { requireUser, isSuperAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";
import { getPolicy, getManagedAgents, summarize } from "@/lib/absence";
import { AbsencesClient, type ClientAgent } from "@/components/absences/absences-client";

export const metadata: Metadata = { title: "Absences" };

export default async function AbsencesPage({ searchParams }: { searchParams: Promise<{ year?: string }> }) {
  const user = await requireUser();
  const admin = isSuperAdmin(user);
  const sp = await searchParams;

  const cy = new Date().getFullYear();
  const years = [cy, cy - 1, cy - 2];
  const parsedYear = Number(sp.year);
  const year = Number.isInteger(parsedYear) && parsedYear >= 2000 && parsedYear <= cy + 1 ? parsedYear : cy;
  if (!years.includes(year)) years.unshift(year);

  const [policy, managed, self] = await Promise.all([
    getPolicy(prisma),
    getManagedAgents(prisma, user.id, admin),
    prisma.user.findUnique({
      where: { id: user.id },
      select: { id: true, firstName: true, lastName: true, structure: { select: { name: true } }, ministry: { select: { name: true } } },
    }),
  ]);

  const managedIds = new Set(managed.map((m) => m.id));
  // Liste affichée : soi-même (en tête) puis les agents suivis (sans doublon).
  const roster = [
    ...(self && !managedIds.has(self.id) ? [{ ...self, isSelf: true }] : []),
    ...managed.map((m) => ({ ...m, isSelf: false })),
  ];
  const rosterIds = roster.map((r) => r.id);

  const records = rosterIds.length
    ? await prisma.absenceRecord.findMany({
        where: { agentId: { in: rosterIds }, year },
        orderBy: { startDate: "desc" },
        select: { id: true, agentId: true, motif: true, startDate: true, endDate: true, days: true, note: true },
      })
    : [];

  const byAgent = new Map<string, typeof records>();
  for (const r of records) {
    const arr = byAgent.get(r.agentId) ?? [];
    arr.push(r);
    byAgent.set(r.agentId, arr);
  }

  const ctx = (a: { structure: { name: string } | null; ministry: { name: string } | null }) => a.structure?.name ?? a.ministry?.name ?? null;

  const agents: ClientAgent[] = roster.map((a) => {
    const recs = byAgent.get(a.id) ?? [];
    const canEdit = admin || managedIds.has(a.id);
    return {
      id: a.id,
      name: `${a.firstName} ${a.lastName}`.trim(),
      context: ctx(a),
      isSelf: a.isSelf,
      canEdit,
      summary: (() => {
        const s = summarize(recs, policy);
        return { byMotif: s.byMotif, total: s.total, percent: s.percent, overThreshold: s.overThreshold, overQuota: s.overQuota };
      })(),
      records: recs.map((r) => ({ id: r.id, motif: r.motif, startISO: r.startDate.toISOString(), endISO: r.endDate.toISOString(), days: r.days, note: r.note })),
    };
  });

  const editableAgents = agents.filter((a) => a.canEdit).map((a) => ({ id: a.id, name: a.name }));
  const canManagePolicy = admin || managed.length > 0;

  return (
    <div className="space-y-7">
      <PageHeader
        title="Autorisations d'absence"
        description="Comptabilisez, par agent et par motif, les jours d'absence autorisée, avec ratio sur le congé annuel et alerte au seuil."
        icon={CalendarOff}
      />
      <AbsencesClient
        policy={policy}
        canManagePolicy={canManagePolicy}
        editableAgents={editableAgents}
        agents={agents}
        year={year}
        years={years}
      />
    </div>
  );
}
