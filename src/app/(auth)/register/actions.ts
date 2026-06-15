"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { writeAudit } from "@/lib/audit";

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
 * Auto-inscription publique. Le compte est créé **inactif** (en attente de
 * validation par un administrateur) : il ne pourra se connecter qu'après
 * activation. Aucune session n'est ouverte ici.
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
      isActive: false, // en attente de validation par un administrateur
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

  return { ok: true };
}
