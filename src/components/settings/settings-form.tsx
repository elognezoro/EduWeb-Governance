"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Check, Save, Bell, BellOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { saveSettings } from "@/app/(app)/parametres/actions";

const PERIODS = [
  { v: "", l: "Profil par défaut" },
  { v: "semaine", l: "Semaine" },
  { v: "quinzaine", l: "Quinzaine" },
  { v: "mois", l: "Mois" },
];

export function SettingsForm({ defaultBilanPeriode, remindersEnabled }: { defaultBilanPeriode: string | null; remindersEnabled: boolean }) {
  const router = useRouter();
  const [period, setPeriod] = useState(defaultBilanPeriode ?? "");
  const [reminders, setReminders] = useState(remindersEnabled);
  const [pending, start] = useTransition();
  const [saved, setSaved] = useState(false);

  const dirty = (period || null) !== (defaultBilanPeriode ?? null) || reminders !== remindersEnabled;

  function save() {
    start(async () => {
      const r = await saveSettings({ defaultBilanPeriode: period || null, remindersEnabled: reminders });
      if (r.ok) { setSaved(true); router.refresh(); }
    });
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-bold text-institutional-900">Période de bilan par défaut</p>
        <p className="text-sm text-slate-500">Période affichée à l'ouverture du bilan.</p>
        <div className="inline-flex flex-wrap rounded-2xl border border-slate-200 bg-card p-1">
          {PERIODS.map((p) => (
            <button
              key={p.v}
              type="button"
              onClick={() => { setPeriod(p.v); setSaved(false); }}
              className={cn("rounded-xl px-4 py-1.5 text-sm font-semibold transition-colors", period === p.v ? "bg-brand-600 text-white shadow-sm" : "text-slate-500 hover:text-ink")}
            >
              {p.l}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 p-4">
        <div className="flex items-center gap-3">
          <span className={cn("flex size-10 items-center justify-center rounded-2xl", reminders ? "bg-brand-50 text-brand-700" : "bg-slate-100 text-slate-400")}>
            {reminders ? <Bell className="size-5" /> : <BellOff className="size-5" />}
          </span>
          <div>
            <p className="text-sm font-bold text-institutional-900">Rappels des rendez-vous</p>
            <p className="text-sm text-slate-500">Notification avant chaque RDV (selon le délai choisi).</p>
          </div>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={reminders}
          aria-label="Activer les rappels"
          onClick={() => { setReminders((v) => !v); setSaved(false); }}
          className={cn("relative h-6 w-11 shrink-0 rounded-full transition-colors", reminders ? "bg-brand-600" : "bg-slate-300")}
        >
          <span className={cn("absolute top-0.5 size-5 rounded-full bg-white shadow transition-all", reminders ? "left-[1.375rem]" : "left-0.5")} />
        </button>
      </div>

      <Button onClick={save} disabled={pending || !dirty}>
        {pending ? <Loader2 className="size-4 animate-spin" /> : saved && !dirty ? <Check className="size-4" /> : <Save className="size-4" />}
        {saved && !dirty ? "Paramètres enregistrés" : "Enregistrer"}
      </Button>
    </div>
  );
}
