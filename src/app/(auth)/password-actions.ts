"use server";

import { z } from "zod";
import { after } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { createResetToken, consumeTokenAndResetPassword } from "@/lib/password-reset";
import { sendPasswordResetEmail, emailConfigured } from "@/lib/email";
import { writeAudit } from "@/lib/audit";
import { appOrigin } from "@/lib/app-url";

export type ResetResult = { ok: true } | { ok: false; error: string };

const emailSchema = z.object({ email: z.string().trim().email("Adresse e-mail invalide.") });

/** Demande de réinitialisation — réponse TOUJOURS générique (anti-énumération). */
export async function requestPasswordReset(input: { email: string }): Promise<ResetResult> {
  const parsed = emailSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
  const email = parsed.data.email.toLowerCase();
  const origin = await appOrigin();

  const user = await prisma.user.findUnique({ where: { email }, select: { id: true, isActive: true, deletedAt: true } });

  if (user && user.isActive && !user.deletedAt) {
    const userId = user.id;
    // Création du jeton + envoi e-mail APRÈS la réponse : le temps de réponse ne
    // dépend pas de l'existence du compte (anti-énumération par timing), et l'envoi
    // reste fiable (waitUntil) côté serverless.
    after(async () => {
      try {
        const raw = await createResetToken(userId);
        const link = `${origin}/reinitialiser-mot-de-passe?token=${raw}`;
        const sent = await sendPasswordResetEmail(email, link);
        if (!sent && !emailConfigured()) {
          // Repli de mise en route : tant que l'e-mail n'est pas configuré, le lien
          // est journalisé côté serveur (accessible à l'admin via les logs).
          console.warn(`[reset] e-mail non configuré — lien de réinitialisation pour ${email} : ${link}`);
        }
        await writeAudit({ userId, action: "password_reset_request", module: "user", entityType: "User", entityId: userId });
      } catch (e) {
        console.error("[reset] échec de la demande en arrière-plan", e);
      }
    });
  }

  // Même réponse, que le compte existe ou non.
  return { ok: true };
}

const resetSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(8, "Mot de passe d'au moins 8 caractères requis."),
});

/** Réinitialise le mot de passe à partir d'un jeton valide à usage unique. */
export async function resetPassword(input: { token: string; password: string }): Promise<ResetResult> {
  const parsed = resetSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
  const { token, password } = parsed.data;

  const passwordHash = await hashPassword(password);
  const userId = await consumeTokenAndResetPassword(token, passwordHash);
  if (!userId) return { ok: false, error: "Lien invalide ou expiré. Veuillez refaire une demande." };

  await writeAudit({ userId, action: "password_reset", module: "user", entityType: "User", entityId: userId });
  return { ok: true };
}
