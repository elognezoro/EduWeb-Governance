import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/session";
import { getInactivityTimeoutMinutes } from "@/lib/app-settings";

/**
 * Battement de cœur : appelé par le veilleur d'inactivité côté client lorsqu'il
 * détecte une activité réelle (souris, clavier…). getSessionUser marque l'activité
 * (lastActiveAt) — ce qui fait glisser le délai d'inactivité côté serveur.
 */
export async function POST() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ ok: false }, { status: 401 });
  const timeoutMinutes = await getInactivityTimeoutMinutes();
  return NextResponse.json({ ok: true, timeoutMinutes: timeoutMinutes ?? null });
}
