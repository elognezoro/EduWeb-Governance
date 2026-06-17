import type { Metadata } from "next";
import { Award } from "lucide-react";
import { requireUser, isSuperAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getSelectedCountryCode } from "@/lib/country";
import { getPolicy } from "@/lib/absence";
import { getDistinctions, ciMessage } from "@/lib/distinctions";
import { PageHeader } from "@/components/layout/page-header";
import { DistinctionsClient, type ClientAgent } from "@/components/distinctions/distinctions-client";

export const metadata: Metadata = { title: "Distinctions" };

const SEL = {
  id: true, firstName: true, lastName: true, gender: true,
  structure: { select: { name: true } }, ministry: { select: { name: true } },
} as const;

export default async function DistinctionsPage({ searchParams }: { searchParams: Promise<{ year?: string }> }) {
  const user = await requireUser();
  const admin = isSuperAdmin(user);
  const sp = await searchParams;

  const cy = new Date().getFullYear();
  const years = [cy, cy - 1, cy - 2];
  const parsedYear = Number(sp.year);
  const year = Number.isInteger(parsedYear) && parsedYear >= 2000 && parsedYear <= cy + 1 ? parsedYear : cy;
  if (!years.includes(year)) years.unshift(year);

  const [countryCode, policy, self, managed] = await Promise.all([
    getSelectedCountryCode(),
    getPolicy(prisma),
    prisma.user.findUnique({ where: { id: user.id }, select: SEL }),
    prisma.user.findMany({
      where: admin ? { deletedAt: null, isActive: true, id: { not: user.id } } : { deletedAt: null, managerId: user.id },
      orderBy: [{ lastName: "asc" }, { firstName: "asc" }],
      select: SEL,
    }),
  ]);
  const ciSelected = countryCode === "CI";

  const roster = [
    ...(self ? [{ ...self, isSelf: true }] : []),
    ...managed.map((m) => ({ ...m, isSelf: false })),
  ];
  const agentIds = roster.map((r) => r.id);
  const distinctions = await getDistinctions(prisma, agentIds, year, policy);

  const agents: ClientAgent[] = roster.map((a) => {
    const d = distinctions.get(a.id);
    const latest = d?.latest ?? null;
    const ci = ciSelected && latest && latest.performance ? ciMessage(latest.performance, a.gender) : null;
    return {
      id: a.id,
      name: `${a.firstName} ${a.lastName}`.trim(),
      context: a.structure?.name ?? a.ministry?.name ?? null,
      isSelf: a.isSelf,
      goodCount: d?.goodCount ?? 0,
      quarters: d?.quarters ?? [],
      latest,
      ciMessage: ci,
    };
  });

  return (
    <div className="space-y-7">
      <PageHeader
        title="Distinctions & rappels à l'ordre"
        description="Récompenses virtuelles trimestrielles selon la régularité du reporting et le respect des seuils d'absence."
        icon={Award}
      />
      <DistinctionsClient agents={agents} quota={policy.annualQuotaDays} ciSelected={ciSelected} year={year} years={years} />
    </div>
  );
}
