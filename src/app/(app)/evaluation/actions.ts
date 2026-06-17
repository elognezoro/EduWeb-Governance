"use server";

import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getScoreReport } from "@/lib/score";
import { profileMeta } from "@/lib/profile";
import { generateAdvice, type AdviceResult } from "@/lib/advice";

/** Génère à la demande 2-3 conseils IA ciblés sur le secteur le plus faible de l'utilisateur. */
export async function getAdvice(): Promise<AdviceResult> {
  const user = await requireUser();
  const report = await getScoreReport(prisma, user.id, 4);
  const meta = profileMeta(user.profileType);
  return generateAdvice(report, meta.label);
}
