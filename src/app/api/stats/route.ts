import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/** Compteurs en temps réel : visites, utilisateurs actifs, comptes créés. */
export async function GET() {
  const [visits, users, accounts] = await Promise.all([
    prisma.visit.count(),
    prisma.user.count({ where: { deletedAt: null } }),
    prisma.user.count(),
  ]);
  return NextResponse.json({ visits, users, accounts });
}
