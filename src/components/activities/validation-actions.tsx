"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, XCircle, RotateCcw, Layers, Loader2, GitBranch, Lock } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  validateActivity,
  rejectActivity,
  requestCorrection,
  consolidateActivity,
} from "@/app/(app)/activities/actions";

interface LevelInfo { current: number; total: number; name: string; canActNow: boolean }

export function ValidationActions({ id, status, levelInfo }: { id: string; status: string; levelInfo?: LevelInfo | null }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);

  const canDecide = ["SUBMITTED", "IN_REVIEW", "TO_CORRECT"].includes(status);
  const canConsolidate = status === "VALIDATED";
  // Avec une hiérarchie active, seul le rôle du niveau courant peut statuer.
  const blockedByLevel = !!levelInfo && !levelInfo.canActNow;

  function run(fn: () => Promise<{ ok: boolean; error?: string }>) {
    setError(null);
    startTransition(async () => {
      const res = await fn();
      if (!res.ok) setError(res.error ?? "Action impossible.");
      else {
        setComment("");
        router.refresh();
      }
    });
  }

  if (!canDecide && !canConsolidate) return null;

  return (
    <div className="space-y-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-bold text-institutional-900">Décision de validation</p>
        {levelInfo && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-0.5 text-[11px] font-bold text-brand-700">
            <GitBranch className="size-3.5" /> Niveau {levelInfo.current}/{levelInfo.total} · {levelInfo.name}
          </span>
        )}
      </div>

      {blockedByLevel && canDecide && (
        <div className="flex items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          <Lock className="mt-0.5 size-4 shrink-0" />
          <p>Cette activité attend la validation du niveau « <strong>{levelInfo!.name}</strong> ». Vous n'êtes pas habilité à statuer à ce niveau.</p>
        </div>
      )}

      {canDecide && !blockedByLevel && (
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Commentaire (obligatoire pour un rejet ou une demande de correction)…"
          className="min-h-20 bg-card"
        />
      )}

      <div className="flex flex-wrap gap-2">
        {canDecide && !blockedByLevel && (
          <>
            <Button onClick={() => run(() => validateActivity(id, comment))} disabled={pending}>
              {pending ? <Loader2 className="size-4 animate-spin" /> : <CheckCircle2 className="size-4" />} Valider
            </Button>
            <Button variant="gold" onClick={() => run(() => requestCorrection(id, comment))} disabled={pending}>
              <RotateCcw className="size-4" /> Demander correction
            </Button>
            <Button variant="danger" onClick={() => run(() => rejectActivity(id, comment))} disabled={pending}>
              <XCircle className="size-4" /> Rejeter
            </Button>
          </>
        )}
        {canConsolidate && (
          <Button variant="secondary" onClick={() => run(() => consolidateActivity(id))} disabled={pending}>
            {pending ? <Loader2 className="size-4 animate-spin" /> : <Layers className="size-4" />} Consolider
          </Button>
        )}
      </div>

      {error && <p className="text-sm font-medium text-danger-600">{error}</p>}
    </div>
  );
}
