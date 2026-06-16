"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export type ActionResult = { ok: true } | { ok: false; error: string };

const schema = z.object({
  title: z.string().trim().min(1, "Titre requis."),
  startAt: z.string().min(1, "Date et heure requises."),
  location: z.string().trim().optional(),
  notes: z.string().trim().optional(),
  reminderMinutes: z.coerce.number().int().refine((n) => [0, 5, 60, 1440].includes(n), "Délai de rappel invalide."),
});
export type AppointmentInput = z.infer<typeof schema>;

function parseDate(v: string): Date | null {
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
}

async function ownedAppointment(id: string, userId: string) {
  const a = await prisma.appointment.findUnique({ where: { id }, select: { id: true, userId: true } });
  return a && a.userId === userId ? a : null;
}

export async function createAppointment(input: AppointmentInput): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Non authentifié." };
  const p = schema.safeParse(input);
  if (!p.success) return { ok: false, error: p.error.issues[0].message };
  const startAt = parseDate(p.data.startAt);
  if (!startAt) return { ok: false, error: "Date et heure invalides." };

  await prisma.appointment.create({
    data: {
      userId: user.id,
      title: p.data.title,
      startAt,
      location: p.data.location || null,
      notes: p.data.notes || null,
      reminderMinutes: p.data.reminderMinutes,
    },
  });
  revalidatePath("/rendez-vous");
  return { ok: true };
}

export async function updateAppointment(id: string, input: AppointmentInput): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Non authentifié." };
  if (!(await ownedAppointment(id, user.id))) return { ok: false, error: "Rendez-vous introuvable." };
  const p = schema.safeParse(input);
  if (!p.success) return { ok: false, error: p.error.issues[0].message };
  const startAt = parseDate(p.data.startAt);
  if (!startAt) return { ok: false, error: "Date et heure invalides." };

  await prisma.appointment.update({
    where: { id },
    data: { title: p.data.title, startAt, location: p.data.location || null, notes: p.data.notes || null, reminderMinutes: p.data.reminderMinutes },
  });
  revalidatePath("/rendez-vous");
  return { ok: true };
}

export async function deleteAppointment(id: string): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Non authentifié." };
  if (!(await ownedAppointment(id, user.id))) return { ok: false, error: "Rendez-vous introuvable." };
  await prisma.appointment.delete({ where: { id } });
  revalidatePath("/rendez-vous");
  return { ok: true };
}

export async function toggleAppointmentDone(id: string): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Non authentifié." };
  const a = await prisma.appointment.findUnique({ where: { id }, select: { userId: true, done: true } });
  if (!a || a.userId !== user.id) return { ok: false, error: "Rendez-vous introuvable." };
  await prisma.appointment.update({ where: { id }, data: { done: !a.done } });
  revalidatePath("/rendez-vous");
  return { ok: true };
}
