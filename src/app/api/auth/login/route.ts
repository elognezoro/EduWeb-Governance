import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";
import { createSession } from "@/lib/session";

const schema = z.object({
  email: z.string().email("Adresse e-mail invalide."),
  password: z.string().min(1, "Mot de passe requis."),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Données invalides." },
      { status: 400 }
    );
  }

  const { email, password } = parsed.data;
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  // Message générique : on ne révèle pas si l'e-mail existe.
  const invalid = NextResponse.json(
    { error: "Identifiants incorrects." },
    { status: 401 }
  );

  if (!user || !user.isActive) return invalid;
  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) return invalid;

  const ipAddress =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? undefined;
  const userAgent = req.headers.get("user-agent") ?? undefined;

  await createSession(user.id, { ipAddress, userAgent });
  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });

  return NextResponse.json({ ok: true });
}
