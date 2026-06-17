"use server";

import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export interface ReminderAppt {
  id: string;
  title: string;
  location: string | null;
  startAtISO: string;
  reminderMinutes: number;
}

/**
 * RDV à venir (non faits, avec rappel actif) de l'utilisateur courant.
 * Consommé par la coque mobile pour programmer des notifications locales.
 */
export async function getUpcomingReminders(): Promise<ReminderAppt[]> {
  const user = await requireUser();
  const rows = await prisma.appointment.findMany({
    where: {
      userId: user.id,
      done: false,
      reminderMinutes: { gt: 0 },
      startAt: { gt: new Date() },
    },
    orderBy: { startAt: "asc" },
    take: 64,
    select: { id: true, title: true, location: true, startAt: true, reminderMinutes: true },
  });
  return rows.map((a) => ({
    id: a.id,
    title: a.title,
    location: a.location,
    startAtISO: a.startAt.toISOString(),
    reminderMinutes: a.reminderMinutes,
  }));
}
