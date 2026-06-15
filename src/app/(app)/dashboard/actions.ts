"use server";

import { randomBytes } from "crypto";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export type ReferralInfo = { ok: true; code: string; count: number } | { ok: false; error: string };

/** Code promo lisible : 8 caractères alphanumériques majuscules (sans caractères ambigus). */
function genCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = randomBytes(8);
  let out = "";
  for (let i = 0; i < 8; i++) out += alphabet[bytes[i] % alphabet.length];
  return out;
}

/**
 * Renvoie le code de parrainage (code promo) de l'utilisateur courant, en le
 * générant à la première demande. Sert de base au lien d'invitation pour
 * l'abonnement, au profit de l'agent commercial qui le partage.
 */
export async function ensureReferralCode(): Promise<ReferralInfo> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Non authentifié." };

  let code = user.referralCode;
  if (!code) {
    for (let i = 0; i < 20; i++) {
      const candidate = genCode();
      if (!(await prisma.user.findUnique({ where: { referralCode: candidate } }))) {
        await prisma.user.update({ where: { id: user.id }, data: { referralCode: candidate } });
        code = candidate;
        break;
      }
    }
    if (!code) return { ok: false, error: "Impossible de générer un code unique. Réessayez." };
  }

  const count = await prisma.user.count({ where: { referredById: user.id, deletedAt: null } });
  return { ok: true, code, count };
}
