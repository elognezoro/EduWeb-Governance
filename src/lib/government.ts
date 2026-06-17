import "server-only";
import type { PrismaClient, Prisma } from "@prisma/client";

/**
 * IDs des gouvernements **en vigueur** — un par pays : entrée en vigueur passée
 * la plus récente, et non encore terminé (endDate nul ou futur).
 */
export async function inForceGovernmentIds(prisma: PrismaClient): Promise<string[]> {
  const now = new Date();
  const govs = await prisma.government.findMany({
    where: { effectiveDate: { lte: now }, OR: [{ endDate: null }, { endDate: { gt: now } }] },
    orderBy: { effectiveDate: "desc" },
    select: { id: true, countryId: true },
  });
  const byCountry = new Map<string, string>();
  for (const g of govs) if (!byCountry.has(g.countryId)) byCountry.set(g.countryId, g.id);
  return [...byCountry.values()];
}

/**
 * Clause Prisma pour ne retenir que les ministères du **gouvernement en vigueur**
 * (ou les ministères non rattachés à un gouvernement daté).
 */
export async function currentMinistryWhere(prisma: PrismaClient): Promise<Prisma.MinistryWhereInput> {
  const ids = await inForceGovernmentIds(prisma);
  return { OR: [{ governmentId: null }, { governmentId: { in: ids } }] };
}
