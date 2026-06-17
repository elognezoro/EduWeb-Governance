"use client";

import { useState, useTransition } from "react";
import { Sparkles, Lightbulb, Loader2, AlertCircle, RefreshCw, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAdvice } from "@/app/(app)/evaluation/actions";

export function AdviceCard({ current, trend, hasData }: { current: number; trend: number; hasData: boolean }) {
  const [pending, start] = useTransition();
  const [tips, setTips] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tried, setTried] = useState(false);

  const lowScore = trend < 0 || current < 50;

  const run = () =>
    start(async () => {
      setError(null);
      const res = await getAdvice();
      setTried(true);
      if (res.ok) {
        setTips(res.tips);
      } else {
        setTips(null);
        setError(
          res.error === "missing_key"
            ? "Les conseils IA ne sont pas encore activés sur ce serveur."
            : "Impossible de générer vos conseils pour le moment. Réessayez."
        );
      }
    });

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-2xl bg-gold-50 text-gold-600">
            <Sparkles className="size-5" />
          </span>
          <div>
            <p className="font-bold text-institutional-900">Conseils IA</p>
            <p className="text-xs text-slate-400">Recommandations personnalisées selon votre productivité.</p>
          </div>
        </div>

        {!hasData ? (
          <p className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-500">
            Ajoutez des rendez-vous et des activités pour obtenir des conseils personnalisés.
          </p>
        ) : tips ? (
          <div className="mt-4 space-y-2.5">
            <ul className="space-y-2.5">
              {tips.map((t, i) => (
                <li key={i} className="flex items-start gap-2.5 rounded-2xl border border-gold-100 bg-gold-50/40 p-3.5">
                  <Lightbulb className="mt-0.5 size-4 shrink-0 text-gold-500" />
                  <span className="text-sm text-ink">{t}</span>
                </li>
              ))}
            </ul>
            <Button variant="ghost" size="sm" onClick={run} disabled={pending}>
              {pending ? <Loader2 className="size-4 animate-spin" /> : <RefreshCw className="size-4" />} Régénérer
            </Button>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            <p className="flex items-start gap-2 text-sm text-slate-600">
              {lowScore ? (
                <>Votre score mérite un coup de pouce — obtenez des conseils ciblés sur votre point faible.</>
              ) : (
                <>
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-600" /> Belle dynamique ! Vous pouvez tout
                  de même demander des pistes pour aller plus loin.
                </>
              )}
            </p>
            <Button variant={lowScore ? "primary" : "outline"} size="sm" onClick={run} disabled={pending}>
              {pending ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}{" "}
              {pending ? "Génération…" : "Obtenir mes conseils"}
            </Button>
            {tried && error && (
              <p className="flex items-center gap-2 rounded-2xl border border-danger-100 bg-red-50 px-4 py-3 text-sm font-medium text-danger-600">
                <AlertCircle className="size-4 shrink-0" /> {error}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
