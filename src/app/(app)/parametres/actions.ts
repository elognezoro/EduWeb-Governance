"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export type ActionResult = { ok: true } | { ok: false; error: string };

const PERIODES = ["semaine", "quinzaine", "mois"];

export async function saveSettings(input: { defaultBilanPeriode: string | null; remindersEnabled: boolean }): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Non authentifié." };
  const period = input.defaultBilanPeriode && PERIODES.includes(input.defaultBilanPeriode) ? input.defaultBilanPeriode : null;
  await prisma.user.update({ where: { id: user.id }, data: { defaultBilanPeriode: period, remindersEnabled: !!input.remindersEnabled } });
  revalidatePath("/", "layout");
  revalidatePath("/parametres");
  revalidatePath("/bilan");
  return { ok: true };
}
