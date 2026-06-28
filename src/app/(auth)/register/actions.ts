"use server";

import { after } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { writeAudit } from "@/lib/audit";
import { appOrigin } from "@/lib/app-url";
import { createVerificationToken, consumeVerificationToken } from "@/lib/email-verification";
import { sendAccountConfirmationEmail, emailConfigured } from "@/lib/email";

export type RegisterResult = { ok: true } | { ok: false; error: string };

/** Rôle attribué par défaut à toute auto-inscription publique. */
const DEFAULT_ROLE_KEY = "academy_learner";

const schema = z.object({
  firstName: z.string().trim().min(1, "Prénom requis."),
  lastName: z.string().trim().min(1, "Nom requis."),
  email: z.string().trim().email("Adresse e-mail invalide."),
  password: z.string().min(8, "Mot de passe d'au moins 8 caractères requis."),
  countryId: z.string().trim().min(1, "Veuillez indiquer votre pays."),
  phone: z.string().trim().optional(),
  ref: z.string().trim().optional(), // code promo / parrainage
});

export type RegisterInput = z.infer<typeof schema>;

/**
 * Auto-inscription publique. Le compte est créé **inactif** puis un e-mail de
 * confirmation est envoyé : le compte s'active automatiquement dès que
 * l'utilisateur clique sur le lien. Aucune session n'est ouverte ici.
 */
export async function registerAccount(input: RegisterInput): Promise<RegisterResult> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
  const d = parsed.data;

  const email = d.email.toLowerCase();
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return { ok: false, error: "Un compte avec cet e-mail existe déjà." };

  // Le pays est obligatoire et doit exister / être actif.
  const country = await prisma.country.findFirst({
    where: { id: d.countryId, isActive: true },
    select: { id: true },
  });
  if (!country) return { ok: false, error: "Pays invalide. Sélectionnez un pays dans la liste." };

  const role = await prisma.role.findFirst({ where: { key: DEFAULT_ROLE_KEY }, select: { id: true } });

  // Parrainage : rattache le nouveau compte à l'agent commercial via son code promo.
  let referredById: string | undefined;
  if (d.ref && d.ref.length > 0) {
    const referrer = await prisma.user.findUnique({ where: { referralCode: d.ref.toUpperCase() }, select: { id: true } });
    referredById = referrer?.id;
  }

  const created = await prisma.user.create({
    data: {
      email,
      passwordHash: await hashPassword(d.password),
      firstName: d.firstName,
      lastName: d.lastName,
      phone: d.phone && d.phone.length > 0 ? d.phone : undefined,
      countryId: country.id,
      referredById,
      isActive: false, // activé automatiquement après confirmation de l'e-mail
      roles: role ? { create: [{ roleId: role.id }] } : undefined,
    },
  });

  await writeAudit({
    userId: created.id,
    action: "register",
    module: "user",
    entityType: "User",
    entityId: created.id,
    metadata: { self: true, pending: true, referredById: referredById ?? null },
  });

  // Envoi de l'e-mail de confirmation APRÈS la réponse (fiable en serverless).
  const origin = await appOrigin();
  after(async () => {
    try {
      const raw = await createVerificationToken(created.id);
      const link = `${origin}/confirmer-compte?token=${raw}`;
      const sent = await sendAccountConfirmationEmail(email, link, d.firstName);
      if (!sent && !emailConfigured()) {
        console.warn(`[register] e-mail non configuré — lien de confirmation pour ${email} : ${link}`);
      }
    } catch (e) {
      console.error("[register] échec de l'envoi de l'e-mail de confirmation", e);
    }
  });

  return { ok: true };
}

/** Confirme un compte à partir d'un jeton : active le compte (usage unique). */
export async function confirmAccount(token: string): Promise<{ ok: true; email: string } | { ok: false; error: string }> {
  if (!token || typeof token !== "string") return { ok: false, error: "Lien invalide." };
  const user = await consumeVerificationToken(token);
  if (!user) return { ok: false, error: "Lien de confirmation invalide ou expiré. Demandez un nouvel e-mail de confirmation." };
  await writeAudit({ userId: user.id, action: "email_verified", module: "user", entityType: "User", entityId: user.id, metadata: { self: true } });
  return { ok: true, email: user.email };
}

/** Renvoie un e-mail de confirmation. Réponse TOUJOURS générique (anti-énumération). */
export async function resendConfirmationEmail(input: { email: string }): Promise<RegisterResult> {
  const parsed = z.object({ email: z.string().trim().email() }).safeParse(input);
  if (!parsed.success) return { ok: false, error: "Adresse e-mail invalide." };
  const email = parsed.data.email.toLowerCase();
  const origin = await appOrigin();

  const user = await prisma.user.findUnique({ where: { email }, select: { id: true, isActive: true, deletedAt: true, firstName: true } });
  // On n'envoie que si le compte existe, n'est pas supprimé et n'est PAS déjà actif.
  if (user && !user.isActive && !user.deletedAt) {
    const u = user;
    after(async () => {
      try {
        const raw = await createVerificationToken(u.id);
        const link = `${origin}/confirmer-compte?token=${raw}`;
        await sendAccountConfirmationEmail(email, link, u.firstName);
      } catch (e) {
        console.error("[register] échec renvoi confirmation", e);
      }
    });
  }
  return { ok: true };
}
