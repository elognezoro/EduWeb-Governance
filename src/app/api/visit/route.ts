import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/** Enregistre une visite (appelé au chargement de la page d'accueil). */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const path = typeof body?.path === "string" ? body.path.slice(0, 200) : null;
    await prisma.visit.create({ data: { path } });
  } catch {
    /* best-effort */
  }
  return NextResponse.json({ ok: true });
}
