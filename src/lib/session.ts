import "server-only";
import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { prisma } from "./prisma";

const COOKIE_NAME = process.env.SESSION_COOKIE_NAME || "eduweb_session";
const SESSION_TTL_DAYS = 30;

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

/** Charge l'utilisateur courant à partir du cookie de session (ou null). */
export async function getSessionUser() {
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

  return session.user;
}

export const SESSION_COOKIE_NAME = COOKIE_NAME;
