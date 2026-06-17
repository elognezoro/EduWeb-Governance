import "server-only";
import { randomBytes, createHash } from "crypto";
import { prisma } from "./prisma";

const TTL_MS = 60 * 60 * 1000; // 1 heure

function hashToken(raw: string): string {
  return createHash("sha256").update(raw).digest("hex");
}

/**
 * Crée un jeton de réinitialisation pour un utilisateur et renvoie le jeton
 * BRUT (à mettre dans le lien e-mail). Seul son hachage est stocké.
 * Les anciens jetons inutilisés de l'utilisateur sont invalidés.
 */
export async function createResetToken(userId: string): Promise<string> {
  const raw = randomBytes(32).toString("hex");
  await prisma.passwordResetToken.deleteMany({ where: { userId, usedAt: null } });
  await prisma.passwordResetToken.create({
    data: { userId, tokenHash: hashToken(raw), expiresAt: new Date(Date.now() + TTL_MS) },
  });
  return raw;
}

/** Vérifie (sans consommer) qu'un jeton brut est valide ; renvoie l'userId ou null. */
export async function peekResetToken(raw: string): Promise<string | null> {
  if (!raw) return null;
  const token = await prisma.passwordResetToken.findUnique({ where: { tokenHash: hashToken(raw) } });
  if (!token || token.usedAt || token.expiresAt < new Date()) return null;
  return token.userId;
}

/**
 * Consomme un jeton et réinitialise le mot de passe **dans une seule
 * transaction atomique** : marque le jeton utilisé (usage unique, anti-rejeu),
 * met à jour le hash, purge les autres jetons et déconnecte toutes les sessions.
 * Renvoie l'userId en cas de succès, sinon null (jeton invalide/expiré/déjà utilisé)
 * — et dans ce cas rien n'est modifié (le jeton reste utilisable si l'échec était transitoire).
 */
export async function consumeTokenAndResetPassword(raw: string, passwordHash: string): Promise<string | null> {
  if (!raw) return null;
  const tokenHash = hashToken(raw);
  return prisma.$transaction(async (tx) => {
    const token = await tx.passwordResetToken.findUnique({ where: { tokenHash } });
    if (!token || token.usedAt || token.expiresAt < new Date()) return null;
    const upd = await tx.passwordResetToken.updateMany({
      where: { id: token.id, usedAt: null },
      data: { usedAt: new Date() },
    });
    if (upd.count !== 1) return null; // course : déjà consommé entre-temps
    await tx.user.update({ where: { id: token.userId }, data: { passwordHash } });
    await tx.passwordResetToken.deleteMany({ where: { userId: token.userId } });
    await tx.session.deleteMany({ where: { userId: token.userId } }); // déconnecte partout
    return token.userId;
  });
}
