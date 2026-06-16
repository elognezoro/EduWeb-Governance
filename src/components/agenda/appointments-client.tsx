"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CalendarPlus, MapPin, Bell, Pencil, Trash2, Check, Loader2, AlertCircle } from "lucide-react";
import { Input, Label } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  createAppointment,
  updateAppointment,
  deleteAppointment,
  toggleAppointmentDone,
  type AppointmentInput,
} from "@/app/(app)/rendez-vous/actions";

export interface Appt {
  id: string;
  title: string;
  startAtISO: string;
  location: string | null;
  notes: string | null;
  reminderMinutes: number;
  done: boolean;
}

const REMINDERS = [
  { v: 0, l: "Aucun rappel" },
  { v: 5, l: "5 min avant" },
  { v: 60, l: "1 h avant" },
  { v: 1440, l: "1 jour avant" },
];
const reminderLabel = (m: number) => REMINDERS.find((r) => r.v === m)?.l ?? `${m} min avant`;

const fmt = new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "2-digit", month: "long", hour: "2-digit", minute: "2-digit" });
function toLocalInput(iso: string) {
  const d = new Date(iso);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}

function ApptForm({ initial, submitLabel, onSubmit, onCancel, pending }: {
  initial?: Appt;
  submitLabel: string;
  onSubmit: (input: AppointmentInput) => void;
  onCancel?: () => void;
  pending: boolean;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [startAt, setStartAt] = useState(initial ? toLocalInput(initial.startAtISO) : "");
  const [location, setLocation] = useState(initial?.location ?? "");
  const [notes, setNotes] = useState(initial?.notes ?? "");
  const [reminder, setReminder] = useState(String(initial?.reminderMinutes ?? 60));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!startAt) return;
    onSubmit({ title, startAt: new Date(startAt).toISOString(), location: location || undefined, notes: notes || undefined, reminderMinutes: Number(reminder) });
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5 sm:col-span-2">
          <Label>Titre</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="ex. Réunion de coordination" required />
        </div>
        <div className="space-y-1.5">
          <Label>Date et heure</Label>
          <Input type="datetime-local" value={startAt} onChange={(e) => setStartAt(e.target.value)} required />
        </div>
        <div className="space-y-1.5">
          <Label>Lieu</Label>
          <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="ex. Salle A / Visio" />
        </div>
        <div className="space-y-1.5">
          <Label>Rappel</Label>
          <Select value={reminder} onChange={(e) => setReminder(e.target.value)}>
            {REMINDERS.map((r) => <option key={r.v} value={r.v}>{r.l}</option>)}
          </Select>
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label>Notes</Label>
          <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes éventuelles…" className="min-h-16" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button type="submit" disabled={pending}>
          {pending ? <Loader2 className="size-4 animate-spin" /> : <CalendarPlus className="size-4" />} {submitLabel}
        </Button>
        {onCancel && <Button type="button" variant="ghost" onClick={onCancel} disabled={pending}>Annuler</Button>}
      </div>
    </form>
  );
}

function ApptCard({ a, onEdit, onDelete, onToggle, busy }: {
  a: Appt;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
  busy: boolean;
}) {
  const past = new Date(a.startAtISO).getTime() < Date.now();
  return (
    <li className={cn("rounded-2xl border border-slate-100 bg-card p-4 transition-colors", a.done && "opacity-70")}>
      <div className="flex items-start gap-3">
        <button type="button" onClick={onToggle} disabled={busy} aria-label={a.done ? "Marquer non fait" : "Marquer fait"}
          className={cn("mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-lg border transition-colors", a.done ? "border-brand-600 bg-brand-600 text-white" : "border-slate-300 text-transparent hover:border-brand-400")}>
          <Check className="size-4" />
        </button>
        <div className="min-w-0 flex-1">
          <p className={cn("font-semibold text-ink", a.done && "line-through")}>{a.title}</p>
          <p className="mt-0.5 text-sm font-medium text-brand-700">{fmt.format(new Date(a.startAtISO))}</p>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
            {a.location && <span className="inline-flex items-center gap-1"><MapPin className="size-3.5" /> {a.location}</span>}
            {a.reminderMinutes > 0 && !past && <span className="inline-flex items-center gap-1"><Bell className="size-3.5" /> {reminderLabel(a.reminderMinutes)}</span>}
          </div>
          {a.notes && <p className="mt-2 whitespace-pre-wrap text-sm text-slate-500">{a.notes}</p>}
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button type="button" onClick={onEdit} disabled={busy} aria-label="Modifier" className="flex size-8 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-ink">
            <Pencil className="size-4" />
          </button>
          <button type="button" onClick={onDelete} disabled={busy} aria-label="Supprimer" className="flex size-8 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-red-50 hover:text-danger-600">
            <Trash2 className="size-4" />
          </button>
        </div>
      </div>
    </li>
  );
}

export function AppointmentsClient({ appointments }: { appointments: Appt[] }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const run = (fn: () => Promise<{ ok: boolean; error?: string }>, after?: () => void) => {
    setError(null);
    start(async () => {
      const res = await fn();
      if (!res.ok) setError(res.error ?? "Action impossible.");
      else { after?.(); router.refresh(); }
    });
  };

  const now = Date.now();
  const upcoming = appointments.filter((a) => !a.done && new Date(a.startAtISO).getTime() >= now);
  const others = appointments.filter((a) => a.done || new Date(a.startAtISO).getTime() < now);

  return (
    <div className="space-y-6">
      {error && (
        <div className="flex items-center gap-2 rounded-2xl border border-danger-100 bg-red-50 px-4 py-3 text-sm font-medium text-danger-600">
          <AlertCircle className="size-4 shrink-0" /> {error}
        </div>
      )}

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="flex items-center gap-2 font-bold text-institutional-900"><CalendarPlus className="size-4 text-brand-700" /> Nouveau rendez-vous</p>
            {!adding && <Button size="sm" onClick={() => { setAdding(true); setEditId(null); }}><CalendarPlus className="size-4" /> Ajouter</Button>}
          </div>
          {adding && (
            <div className="mt-4">
              <ApptForm
                submitLabel="Ajouter le rendez-vous"
                pending={pending}
                onCancel={() => setAdding(false)}
                onSubmit={(input) => run(() => createAppointment(input), () => setAdding(false))}
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Section title={`À venir (${upcoming.length})`} empty="Aucun rendez-vous à venir.">
        {upcoming.map((a) =>
          editId === a.id ? (
            <li key={a.id} className="rounded-2xl border border-brand-200 bg-card p-4">
              <ApptForm initial={a} submitLabel="Enregistrer" pending={pending} onCancel={() => setEditId(null)}
                onSubmit={(input) => run(() => updateAppointment(a.id, input), () => setEditId(null))} />
            </li>
          ) : (
            <ApptCard key={a.id} a={a} busy={pending}
              onEdit={() => { setEditId(a.id); setAdding(false); }}
              onDelete={() => run(() => deleteAppointment(a.id))}
              onToggle={() => run(() => toggleAppointmentDone(a.id))} />
          )
        )}
      </Section>

      {others.length > 0 && (
        <Section title={`Passés & faits (${others.length})`} empty="">
          {others.map((a) =>
            editId === a.id ? (
              <li key={a.id} className="rounded-2xl border border-brand-200 bg-card p-4">
                <ApptForm initial={a} submitLabel="Enregistrer" pending={pending} onCancel={() => setEditId(null)}
                  onSubmit={(input) => run(() => updateAppointment(a.id, input), () => setEditId(null))} />
              </li>
            ) : (
              <ApptCard key={a.id} a={a} busy={pending}
                onEdit={() => { setEditId(a.id); setAdding(false); }}
                onDelete={() => run(() => deleteAppointment(a.id))}
                onToggle={() => run(() => toggleAppointmentDone(a.id))} />
            )
          )}
        </Section>
      )}
    </div>
  );
}

function Section({ title, empty, children }: { title: string; empty: string; children: React.ReactNode }) {
  const arr = Array.isArray(children) ? children : [children];
  const hasItems = arr.some(Boolean) && arr.flat().filter(Boolean).length > 0;
  return (
    <div>
      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">{title}</p>
      {hasItems ? <ul className="space-y-2">{children}</ul> : empty ? <p className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-400">{empty}</p> : null}
    </div>
  );
}
