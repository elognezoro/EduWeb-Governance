import "server-only";
import { cache } from "react";
import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { getInactivityTimeoutMinutes } from "./app-settings";

const COOKIE_NAME = process.env.SESSION_COOKIE_NAME || "eduweb_session";
const SESSION_TTL_DAYS = 30;
const TOUCH_THROTTLE_MS = 30_000; // n'écrit lastActiveAt qu'au plus une fois / 30 s
const INACTIVITY_GRACE_MS = 75_000; // marge serveur (> plus long battement client) : le client déconnecte en premier, le serveur sert de filet

function newToken(): string {
  return randomBytes(32).toString("hex");
}

/** Crée une session en base et pose le cookie httpOnly. */
export async function createSession(
  userId: string,
  meta?: { ipAddress?: string; userAgent?: string }
): Promise<void> {
  const sessionToken = newToken();
  const expiresAt = new Date(Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000);

  await prisma.session.create({
    data: {
      sessionToken,
      userId,
      expiresAt,
      ipAddress: meta?.ipAddress,
      userAgent: meta?.userAgent,
    },
  });

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

/** Détruit la session courante (base + cookie). */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (token) {
    await prisma.session.deleteMany({ where: { sessionToken: token } });
    cookieStore.delete(COOKIE_NAME);
  }
}

/** Charge l'utilisateur courant à partir du cookie de session (ou null). Mémoïsé par requête. */
export const getSessionUser = cache(async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const session = await prisma.session.findUnique({
    where: { sessionToken: token },
    include: {
      user: {
        include: {
          country: true,
          organization: true,
          structure: true,
          roles: { include: { role: { include: { permissions: true } } } },
          directPermissions: true,
        },
      },
    },
  });

  if (!session || session.expiresAt < new Date() || !session.user.isActive) {
    return null;
  }

  // Délai d'inactivité global (déconnexion automatique paramétrée par le super admin).
  const timeoutMin = await getInactivityTimeoutMinutes();
  const now = Date.now();
  const lastActive = session.lastActiveAt.getTime();
  if (timeoutMin && timeoutMin > 0 && now - lastActive > timeoutMin * 60_000 + INACTIVITY_GRACE_MS) {
    // Inactivité confirmée (au-delà de la marge) : on FERME DURABLEMENT la session en base,
    // pour qu'un changement ultérieur du délai global ne puisse pas la « ressusciter ».
    try { await prisma.session.deleteMany({ where: { sessionToken: token } }); } catch {
      // suppression non bloquante
    }
    return null;
  }
  // Fait glisser le délai en marquant l'activité (écriture limitée à 1 / 30 s).
  if (now - lastActive > TOUCH_THROTTLE_MS) {
    try {
      await prisma.session.update({ where: { sessionToken: token }, data: { lastActiveAt: new Date() } });
    } catch {
      // Touche non bloquante : on n'échoue pas l'authentification pour un échec d'écriture.
    }
  }

  return session.user;
});

export const SESSION_COOKIE_NAME = COOKIE_NAME;
