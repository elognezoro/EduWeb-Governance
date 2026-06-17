import type { Metadata } from "next";
import { CalendarClock } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";
import { AppointmentsClient, type Appt } from "@/components/agenda/appointments-client";

export const metadata: Metadata = { title: "Rendez-vous" };

export default async function RendezVousPage() {
  const user = await requireUser();
  const rows = await prisma.appointment.findMany({ where: { userId: user.id }, orderBy: { startAt: "asc" } });
  const appointments: Appt[] = rows.map((a) => ({
    id: a.id,
    title: a.title,
    startAtISO: a.startAt.toISOString(),
    location: a.location,
    notes: a.notes,
    reminderMinutes: a.reminderMinutes,
    done: a.done,
  }));

  return (
    <div className="space-y-7">
      <PageHeader title="Rendez-vous" description="Votre agenda personnel — RDV, rappels et suivi." icon={CalendarClock} />
      <AppointmentsClient appointments={appointments} remindersEnabled={user.remindersEnabled} />
    </div>
  );
}
