import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardCheck, Download, CalendarClock, ListChecks, CheckCircle2, Circle } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getBilan, normalizePeriode, type Periode } from "@/lib/bilan";
import { profileMeta } from "@/lib/profile";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Bilan" };

const PERIODS: { v: Periode; label: string }[] = [
  { v: "semaine", label: "Semaine" },
  { v: "quinzaine", label: "Quinzaine" },
  { v: "mois", label: "Mois" },
];

const fmt = new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });

export default async function BilanPage({ searchParams }: { searchParams: Promise<{ periode?: string }> }) {
  const user = await requireUser();
  const sp = await searchParams;
  const periode = sp.periode ? normalizePeriode(sp.periode) : profileMeta(user.profileType).defaultPeriode;
  const b = await getBilan(prisma, user.id, periode);

  const faits = b.items.filter((i) => i.done);
  const nonFaits = b.items.filter((i) => !i.done);

  return (
    <div className="space-y-7">
      <PageHeader title="Bilan & synthèse" description="Vos rendez-vous et activités réalisés sur la période." icon={ClipboardCheck} />

      {/* Sélecteur de période + export */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-2xl border border-slate-200 bg-card p-1">
          {PERIODS.map((p) => (
            <Link
              key={p.v}
              href={`/bilan?periode=${p.v}`}
              className={cn(
                "rounded-xl px-4 py-1.5 text-sm font-semibold transition-colors",
                periode === p.v ? "bg-brand-600 text-white shadow-sm" : "text-slate-500 hover:text-ink"
              )}
            >
              {p.label}
            </Link>
          ))}
        </div>
        <a href={`/bilan/pdf?periode=${periode}`} className={cn(buttonVariants({ variant: "outline" }))}>
          <Download className="size-4" /> Exporter en PDF
        </a>
      </div>

      {/* Taux de réalisation */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Taux de réalisation · {b.label}</p>
              <p className="mt-1 text-4xl font-extrabold text-institutional-900">{b.percent}<span className="text-2xl text-slate-400">%</span></p>
            </div>
            <p className="text-sm font-medium text-slate-500">{b.done} / {b.total} réalisé{b.done > 1 ? "s" : ""}</p>
          </div>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-brand-600 transition-all" style={{ width: `${b.percent}%` }} />
          </div>
        </CardContent>
      </Card>

      {/* Détail RDV / Activités */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card><CardContent className="flex items-center gap-3 p-5">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700"><CalendarClock className="size-5" /></span>
          <div><p className="text-2xl font-extrabold text-institutional-900">{b.rdv.done}<span className="text-base font-semibold text-slate-400"> / {b.rdv.total}</span></p><p className="text-sm text-slate-500">Rendez-vous honorés</p></div>
        </CardContent></Card>
        <Card><CardContent className="flex items-center gap-3 p-5">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-institutional-50 text-institutional-700"><ListChecks className="size-5" /></span>
          <div><p className="text-2xl font-extrabold text-institutional-900">{b.activites.done}<span className="text-base font-semibold text-slate-400"> / {b.activites.total}</span></p><p className="text-sm text-slate-500">Activités validées</p></div>
        </CardContent></Card>
      </div>

      {/* Listes faits / non faits */}
      <div className="grid gap-4 lg:grid-cols-2">
        <ItemList title={`Faits (${faits.length})`} items={faits} done />
        <ItemList title={`Non faits (${nonFaits.length})`} items={nonFaits} done={false} />
      </div>
    </div>
  );
}

function ItemList({ title, items, done }: { title: string; items: { title: string; when: Date; detail: string }[]; done: boolean }) {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="mb-3 flex items-center gap-2 text-sm font-bold text-institutional-900">
          {done ? <CheckCircle2 className="size-4 text-brand-600" /> : <Circle className="size-4 text-slate-300" />} {title}
        </p>
        {items.length ? (
          <ul className="space-y-2">
            {items.map((i, idx) => (
              <li key={idx} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 p-3">
                <span className="min-w-0">
                  <span className={cn("block truncate text-sm font-medium text-ink", done && "line-through decoration-slate-300")}>{i.title}</span>
                  <span className="text-xs text-slate-400">{i.detail} · {fmt.format(i.when)}</span>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-400">Rien sur la période.</p>
        )}
      </CardContent>
    </Card>
  );
}
