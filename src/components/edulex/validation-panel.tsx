"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ShieldCheck, AlertCircle, CheckCircle2, Link2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { VERIFICATION_LEVEL, LEGAL_STATUS } from "@/lib/enums";
import { cn } from "@/lib/utils";
import { setVerificationLevel, setLegalStatus } from "@/app/(app)/edulex/actions";

export function ValidationPanel({
  id, currentLevel, currentStatus, canPublish, currentSource,
}: {
  id: string; currentLevel: string; currentStatus: string; canPublish: boolean; currentSource?: string | null;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [comment, setComment] = useState("");
  const [source, setSource] = useState(currentSource ?? "");
  const [status, setStatus] = useState(currentStatus);
  const [error, setError] = useState<string | null>(null);

  function run(fn: () => Promise<{ ok: boolean; error?: string }>) {
    setError(null);
    startTransition(async () => {
      const res = await fn();
      if (!res.ok) setError(res.error ?? "Action impossible.");
      else { setComment(""); router.refresh(); }
    });
  }

  return (
    <div className="space-y-4 rounded-3xl border border-brand-100 bg-brand-50/40 p-5">
      <p className="flex items-center gap-2 text-sm font-bold text-institutional-900">
        <ShieldCheck className="size-4 text-brand-700" /> Validation à partir de sources officielles
      </p>

      {/* Source officielle de vérification */}
      <div>
        <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <Link2 className="size-3.5" /> Source officielle (URL)
        </p>
        <Input
          value={source}
          onChange={(e) => setSource(e.target.value)}
          placeholder="https://… (Journal Officiel / SGG / portail ministériel)"
          className="bg-card"
        />
        <p className="mt-1 text-[11px] text-slate-400">
          Obligatoire pour valider en <strong>V3</strong> (juridique) / <strong>V4</strong> (certifié) et pour la mise en vigueur.
        </p>
      </div>

      <Textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Commentaire de validation (facultatif)…" className="min-h-16 bg-card" />

      {/* Niveau de vérification */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Niveau de vérification</p>
        <div className="flex flex-wrap gap-2">
          {VERIFICATION_LEVEL.map((lvl) => (
            <button
              key={lvl.value}
              type="button"
              disabled={pending || lvl.value === currentLevel}
              onClick={() => run(() => setVerificationLevel(id, lvl.value, comment, source))}
              className={cn(
                "rounded-xl px-3 py-1.5 text-xs font-bold transition-colors disabled:cursor-default",
                lvl.value === currentLevel
                  ? "bg-brand-700 text-white"
                  : "bg-card text-slate-600 ring-1 ring-slate-200 hover:bg-brand-50 hover:text-brand-700"
              )}
              title={lvl.description}
            >
              {lvl.value}
            </button>
          ))}
        </div>
      </div>

      {/* Statut */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Statut du texte</p>
        <div className="flex gap-2">
          <Select value={status} onChange={(e) => setStatus(e.target.value)} className="bg-card">
            {LEGAL_STATUS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </Select>
          <Button size="sm" variant="outline" disabled={pending || status === currentStatus} onClick={() => run(() => setLegalStatus(id, status, comment, source))}>
            Appliquer
          </Button>
        </div>
      </div>

      {canPublish && currentStatus !== "IN_FORCE" && (
        <Button variant="primary" disabled={pending} onClick={() => run(() => setLegalStatus(id, "IN_FORCE", comment, source))} className="w-full">
          {pending ? <Loader2 className="size-4 animate-spin" /> : <CheckCircle2 className="size-4" />} Publier (mettre en vigueur)
        </Button>
      )}

      {error && <p className="flex items-center gap-1.5 text-sm font-medium text-danger-600"><AlertCircle className="size-4" /> {error}</p>}
    </div>
  );
}
