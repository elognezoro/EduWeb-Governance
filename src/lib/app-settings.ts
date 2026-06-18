import "server-only";
import { prisma } from "./prisma";

const SINGLETON_ID = "singleton";
const CACHE_TTL_MS = 30_000; // propagation d'un changement de réglage : ≤ 30 s entre instances

let cache: { value: number | null; at: number } | null = null;

/**
 * Délai d'inactivité global (en minutes) avant déconnexion automatique, ou null si désactivé.
 * Mis en cache 30 s par instance pour éviter une lecture base à chaque requête.
 * En cas d'erreur base, on NE mémorise PAS (pour ne pas figer « désactivé » par erreur) :
 * on renvoie la dernière valeur connue si elle existe, sinon null sans cacher.
 */
export async function getInactivityTimeoutMinutes(): Promise<number | null> {
  const now = Date.now();
  if (cache && now - cache.at < CACHE_TTL_MS) return cache.value;
  try {
    const s = await prisma.appSetting.findUnique({
      where: { id: SINGLETON_ID },
      select: { inactivityTimeoutMinutes: true },
    });
    const value = s?.inactivityTimeoutMinutes ?? null;
    cache = { value, at: now };
    return value;
  } catch {
    // Lecture impossible : on ne grave pas un état « inconnu » dans le cache → on réessaiera.
    return cache?.value ?? null;
  }
}

/** Définit le délai d'inactivité (null = désactivé) et rafraîchit le cache local. */
export async function setInactivityTimeoutMinutes(minutes: number | null, byUserId: string): Promise<void> {
  await prisma.appSetting.upsert({
    where: { id: SINGLETON_ID },
    create: { id: SINGLETON_ID, inactivityTimeoutMinutes: minutes, updatedById: byUserId },
    update: { inactivityTimeoutMinutes: minutes, updatedById: byUserId },
  });
  cache = { value: minutes, at: Date.now() };
}
