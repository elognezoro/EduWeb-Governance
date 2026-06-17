import type { Metadata } from "next";
import { Gauge, TrendingUp, TrendingDown, Minus, CalendarClock, ListChecks } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getScoreReport, scoreLabel } from "@/lib/score";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { AdviceCard } from "@/components/evaluation/advice-card";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Évaluation" };

const TONE: Record<string, { text: string; bar: string; ring: string }> = {
  brand: { text: "text-brand-700", bar: "bg-brand-500", ring: "ring-brand-200" },
  gold: { text: "text-gold-600", bar: "bg-gold-400", ring: "ring-gold-300" },
  danger: { text: "text-danger-600", bar: "bg-danger-500", ring: "ring-danger-200" },
};
const weekFmt = new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "2-digit" });

export default async function EvaluationPage() {
  const user = await requireUser();
  const r = await getScoreReport(prisma, user.id, 4);
  const { label, tone } = scoreLabel(r.current);
  const t = TONE[tone];
  const hasData = r.weeks.some((w) => w.total > 0);

  return (
    <div className="space-y-7">
      <PageHeader title="Évaluation" description="Votre score de productivité et son évolution sur 4 semaines." icon={Gauge} />

      {/* Score courant */}
      <Card>
        <CardContent className="flex flex-col items-center gap-4 p-7 sm:flex-row sm:items-center sm:gap-7">
          <div className={cn("flex size-28 shrink-0 flex-col items-center justify-center rounded-full ring-8", t.ring)}>
            <span className={cn("text-4xl font-extrabold leading-none", t.text)}>{r.current}</span>
            <span className="text-xs font-semibold text-slate-400">/ 100</span>
          </div>
          <div className="text-center sm:text-left">
            <p className={cn("text-lg font-extrabold", t.text)}>{label}</p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500">
              {r.trend > 0 ? <><TrendingUp className="size-4 text-brand-600" /> +{r.trend} pts vs semaine précédente</>
              : r.trend < 0 ? <><TrendingDown className="size-4 text-danger-500" /> {r.trend} pts vs semaine précédente</>
              : <><Minus className="size-4 text-slate-400" /> Stable vs semaine précédente</>}
            </p>
            <p className="mt-2 text-sm text-slate-400">Calculé sur vos rendez-vous honorés et vos activités validées.</p>
          </div>
        </CardContent>
      </Card>

      {/* Conseils IA — à la demande, ciblés sur le secteur faible */}
      <AdviceCard current={r.current} trend={r.trend} hasData={hasData} />

      {/* Évolution 4 semaines */}
      <Card>
        <CardContent className="p-6">
          <p className="mb-4 text-sm font-bold text-institutional-900">Évolution sur 4 semaines</p>
          <div className="flex h-44 items-end justify-around gap-3">
            {r.weeks.map((w, i) => {
              const last = i === r.weeks.length - 1;
              return (
                <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                  <span className={cn("text-sm font-bold", last ? t.text : "text-slate-400")}>{w.score}</span>
                  <div
                    className={cn("w-full max-w-14 rounded-t-xl transition-all", last ? t.bar : "bg-slate-200")}
                    style={{ height: `${Math.max(w.score, 2)}%` }}
                    title={`${w.done}/${w.total} réalisé(s)`}
                  />
                  <span className="text-[11px] font-medium text-slate-400">{weekFmt.format(w.to)}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Détail semaine courante */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card><CardContent className="flex items-center gap-3 p-5">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700"><CalendarClock className="size-5" /></span>
          <div><p className="text-2xl font-extrabold text-institutional-900">{r.breakdown.rdv.done}<span className="text-base font-semibold text-slate-400"> / {r.breakdown.rdv.total}</span></p><p className="text-sm text-slate-500">RDV honorés (7 j)</p></div>
        </CardContent></Card>
        <Card><CardContent className="flex items-center gap-3 p-5">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-institutional-50 text-institutional-700"><ListChecks className="size-5" /></span>
          <div><p className="text-2xl font-extrabold text-institutional-900">{r.breakdown.activites.done}<span className="text-base font-semibold text-slate-400"> / {r.breakdown.activites.total}</span></p><p className="text-sm text-slate-500">Activités validées (7 j)</p></div>
        </CardContent></Card>
      </div>
    </div>
  );
}
