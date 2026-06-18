"use client";

import { useState, useTransition } from "react";
import { Loader2, Save, AlertCircle, Check, Clock } from "lucide-react";
import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { saveInactivityTimeout } from "@/app/(app)/admin/actions";

const PRESETS = [5, 10, 15, 30, 60, 120];

export function InactivityTimeoutForm({ current }: { current: number | null }) {
  const [enabled, setEnabled] = useState(current != null);
  const [minutes, setMinutes] = useState<number>(current ?? 30);
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    const value = enabled ? Number(minutes) : null;
    if (enabled && (!Number.isInteger(value) || (value as number) < 1 || (value as number) > 1440)) {
      setMsg({ ok: false, text: "Indiquez un entier entre 1 et 1440 minutes." });
      return;
    }
    start(async () => {
      const res = await saveInactivityTimeout(value);
      setMsg(res.ok ? { ok: true, text: "Réglage enregistré." } : { ok: false, text: res.error });
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <p className="text-sm text-slate-500">
        Ferme automatiquement la session de tout utilisateur après une période d'inactivité (aucune
        action souris ou clavier). L'utilisateur est averti juste avant et peut rester connecté.
      </p>

      <label className="flex items-center gap-3">
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          onClick={() => setEnabled((v) => !v)}
          className={cn(
            "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors",
            enabled ? "bg-brand-600" : "bg-slate-300"
          )}
        >
          <span className={cn("inline-block size-5 transform rounded-full bg-white shadow transition-transform", enabled ? "translate-x-5" : "translate-x-0.5")} />
        </button>
        <span className="text-sm font-semibold text-ink">
          {enabled ? "Déconnexion automatique activée" : "Déconnexion automatique désactivée"}
        </span>
      </label>

      {enabled && (
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="idle">Délai d'inactivité (minutes)</Label>
            <Input
              id="idle"
              type="number"
              min={1}
              max={1440}
              step={1}
              value={minutes}
              onChange={(e) => setMinutes(parseInt(e.target.value || "0", 10))}
              className="max-w-[10rem]"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setMinutes(p)}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
                  minutes === p ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                {p < 60 ? `${p} min` : `${p / 60} h`}
              </button>
            ))}
          </div>
        </div>
      )}

      {msg && (
        <div
          className={cn(
            "flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-medium",
            msg.ok ? "border-brand-100 bg-brand-50 text-brand-700" : "border-danger-100 bg-red-50 text-danger-600"
          )}
        >
          {msg.ok ? <Check className="size-4 shrink-0" /> : <AlertCircle className="size-4 shrink-0" />} {msg.text}
        </div>
      )}

      <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
        <Button type="submit" disabled={pending}>
          {pending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          Enregistrer
        </Button>
        <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
          <Clock className="size-3.5" /> S'applique à toutes les sessions, vous compris.
        </span>
      </div>
    </form>
  );
}
