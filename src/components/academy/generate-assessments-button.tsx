"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Globe2, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { generateCountryAssessments, generateAllAssessments } from "@/app/(app)/academy/admin/actions";
import { cn } from "@/lib/utils";

/**
 * Génération des modules d'évaluation à partir des textes validés :
 * — pour le pays sélectionné (si `countryId`) ;
 * — pour tous les pays disposant de textes validés.
 */
export function GenerateAssessmentsButton({ countryId, countryLabel }: { countryId?: string; countryLabel?: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  function runCountry() {
    if (!countryId) return;
    setMsg(null);
    start(async () => {
      const res = await generateCountryAssessments(countryId);
      if (res.ok) {
        setMsg({ ok: true, text: `${res.created} module(s) généré(s), ${res.skipped} déjà à jour — sur ${res.total} texte(s) validé(s).` });
        router.refresh();
      } else {
        setMsg({ ok: false, text: res.error });
      }
    });
  }

  function runAll() {
    setMsg(null);
    start(async () => {
      const res = await generateAllAssessments();
      if (res.ok) {
        setMsg({ ok: true, text: `${res.created} module(s) généré(s) sur ${res.countriesProcessed} pays (${res.skipped} déjà à jour).` });
        router.refresh();
      } else {
        setMsg({ ok: false, text: res.error });
      }
    });
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex flex-wrap gap-2">
        {countryId && (
          <button
            type="button"
            onClick={runCountry}
            disabled={pending}
            className="inline-flex items-center gap-2 rounded-2xl bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-800 disabled:opacity-60"
          >
            {pending ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
            Générer — {countryLabel}
          </button>
        )}
        <button
          type="button"
          onClick={runAll}
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-2xl border border-brand-200 bg-card px-4 py-2 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50 disabled:opacity-60"
        >
          {pending ? <Loader2 className="size-4 animate-spin" /> : <Globe2 className="size-4" />}
          Générer pour tous les pays
        </button>
      </div>
      {msg && (
        <p className={cn("inline-flex items-center gap-1.5 text-sm font-medium", msg.ok ? "text-brand-700" : "text-danger-600")}>
          {msg.ok ? <CheckCircle2 className="size-4 shrink-0" /> : <AlertCircle className="size-4 shrink-0" />} {msg.text}
        </p>
      )}
    </div>
  );
}
