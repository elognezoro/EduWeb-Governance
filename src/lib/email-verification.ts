import "server-only";
import { randomBytes, createHash } from "crypto";
import { prisma } from "./prisma";

const TTL_MS = 24 * 60 * 60 * 1000; // 24 heures

function hashToken(raw: string): string {
  return createHash("sha256").update(raw).digest("hex");
}

/**
 * Crée un jeton de confirmation de compte et renvoie le jeton BRUT (à mettre
 * dans le lien e-mail). Seul son hachage est stocké. Les anciens jetons non
 * utilisés de l'utilisateur sont invalidés.
 */
export async function createVerificationToken(userId: string): Promise<string> {
  const raw = randomBytes(32).toString("hex");
  await prisma.emailVerificationToken.deleteMany({ where: { userId, usedAt: null } });
  await prisma.emailVerificationToken.create({
    data: { userId, tokenHash: hashToken(raw), expiresAt: new Date(Date.now() + TTL_MS) },
  });
  return raw;
}

/**
 * Consomme un jeton et ACTIVE le compte (isActive = true) dans une seule
 * transaction atomique : marque le jeton utilisé (usage unique), active le
 * compte, purge les autres jetons. Renvoie { id, email } ou null si le jeton
 * est invalide / expiré / déjà utilisé (et rien n'est alors modifié).
 */
export async function consumeVerificationToken(raw: string): Promise<{ id: string; email: string } | null> {
  if (!raw) return null;
  const tokenHash = hashToken(raw);
  return prisma.$transaction(async (tx) => {
    const token = await tx.emailVerificationToken.findUnique({ where: { tokenHash } });
    if (!token || token.usedAt || token.expiresAt < new Date()) return null;
    const upd = await tx.emailVerificationToken.updateMany({
      where: { id: token.id, usedAt: null },
      data: { usedAt: new Date() },
    });
    if (upd.count !== 1) return null; // course : déjà consommé entre-temps
    const user = await tx.user.update({
      where: { id: token.userId },
      data: { isActive: true },
      select: { id: true, email: true },
    });
    await tx.emailVerificationToken.deleteMany({ where: { userId: token.userId } });
    return user;
  });
}
