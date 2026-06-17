"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Award, User as UserIcon, Check, X, Megaphone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SpeakButton } from "@/components/distinctions/speak-button";

export interface ClientQuarter {
  quarter: number;
  state: "upcoming" | "current" | "past";
  performance: "good" | "bad" | null;
  reportingScore: number;
  reportingDone: number;
  reportingTotal: number;
  reportingOk: boolean;
  personalDays: number;
  medicalDays: number;
  personalPct: number;
  medicalPct: number;
  personalOk: boolean;
  medicalOk: boolean;
}

export interface ClientAgent {
  id: string;
  name: string;
  context: string | null;
  isSelf: boolean;
  goodCount: number;
  quarters: ClientQuarter[];
  latest: ClientQuarter | null;
  ciMessage: string | null;
}

const BAD_EMOJI = "😢";

export function DistinctionsClient({
  agents, quota, ciSelected, year, years,
}: {
  agents: ClientAgent[];
  quota: number;
  ciSelected: boolean;
  year: number;
  years: number[];
}) {
  const router = useRouter();

  return (
    <div className="space-y-6">
      {/* Règles + sélecteur d'année */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-2xl bg-gold-50 text-gold-600"><Award className="size-5" /></span>
              <div>
                <p className="font-bold text-institutional-900">Distinctions trimestrielles</p>
                <p className="text-xs text-slate-400">Une distinction par trimestre, cumulée sur l'année.</p>
              </div>
            </div>
            <div className="inline-flex rounded-2xl border border-slate-200 bg-card p-1">
              {years.map((y) => (
                <button key={y} type="button" onClick={() => router.push(`/distinctions?year=${y}`)}
                  className={cn("rounded-xl px-4 py-1.5 text-sm font-semibold transition-colors", y === year ? "bg-brand-600 text-white shadow-sm" : "text-slate-500 hover:text-ink")}>
                  {y}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-3">
            <Rule label="Régularité du reporting" hint="score du trimestre ≥ 50%" />
            <Rule label="Affaires personnelles" hint={`< 20% du congé annuel (${quota} j)`} />
            <Rule label="Raison médicale" hint={`< 40% du congé annuel (${quota} j)`} />
          </div>
          <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1.5"><Image src="/distinctions/shield.png" alt="Bouclier" width={18} height={18} className="rounded" /> Belle performance</span>
            <span className="inline-flex items-center gap-1.5"><span className="text-base leading-none">{BAD_EMOJI}</span> Performance à redresser</span>
          </p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {agents.length === 0 ? (
          <Card><CardContent className="p-6 text-sm text-slate-500">Aucun agent à suivre pour le moment.</CardContent></Card>
        ) : (
          agents.map((a) => <AgentCard key={a.id} agent={a} />)
        )}
      </div>

      {ciSelected && (
        <p className="text-center text-xs text-slate-400">Messages adaptés à la Côte d'Ivoire (pays sélectionné).</p>
      )}
    </div>
  );
}

function Rule({ label, hint }: { label: string; hint: string }) {
  return (
    <div className="rounded-2xl border border-slate-100 px-3 py-2">
      <p className="font-semibold text-ink">{label}</p>
      <p className="text-xs text-slate-400">{hint}</p>
    </div>
  );
}

function ShieldBadge({ size }: { size: number }) {
  return (
    <span className="inline-flex items-center justify-center rounded-2xl bg-white p-1 ring-1 ring-gold-200">
      <Image src="/distinctions/shield.png" alt="Belle performance" width={size} height={size} />
    </span>
  );
}

function QuarterCell({ q }: { q: ClientQuarter }) {
  return (
    <div className="flex flex-1 flex-col items-center gap-1.5">
      <span className="text-[11px] font-bold uppercase tracking-wide text-slate-400">T{q.quarter}</span>
      <div className={cn(
        "flex size-16 items-center justify-center rounded-2xl border",
        q.performance === "good" ? "border-gold-200 bg-gold-50/40"
          : q.performance === "bad" ? "border-amber-100 bg-amber-50/50"
          : "border-dashed border-slate-200 bg-slate-50"
      )}>
        {q.performance === "good" ? <Image src="/distinctions/shield.png" alt="Belle performance" width={46} height={46} />
          : q.performance === "bad" ? <span className="text-3xl leading-none">{BAD_EMOJI}</span>
          : <span className="text-lg text-slate-300">—</span>}
      </div>
      {q.state === "current" ? <span className="text-[10px] font-semibold text-brand-600">en cours</span>
        : q.state === "upcoming" ? <span className="text-[10px] text-slate-400">à venir</span>
        : <span className="text-[10px] text-slate-300">terminé</span>}
    </div>
  );
}

function Criteria({ ok, label, hint }: { ok: boolean; label: string; hint: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className={cn("flex size-5 shrink-0 items-center justify-center rounded-full", ok ? "bg-brand-100 text-brand-700" : "bg-red-100 text-danger-600")}>
        {ok ? <Check className="size-3.5" /> : <X className="size-3.5" />}
      </span>
      <span className="text-ink">{label}</span>
      <span className="text-xs text-slate-400">({hint})</span>
    </div>
  );
}

function AgentCard({ agent }: { agent: ClientAgent }) {
  const latest = agent.latest;
  const good = latest?.performance === "good";

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-2xl bg-institutional-50 text-institutional-700"><UserIcon className="size-5" /></span>
            <div>
              <p className="font-semibold text-ink">{agent.name}{agent.isSelf && <span className="ml-2 text-xs font-medium text-slate-400">(moi)</span>}</p>
              {agent.context && <p className="text-xs text-slate-400">{agent.context}</p>}
            </div>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-gold-50 px-3 py-1 text-sm font-semibold text-gold-600">
            <Award className="size-4" /> {agent.goodCount} distinction{agent.goodCount > 1 ? "s" : ""}
          </span>
        </div>

        {/* Distinctions par trimestre */}
        <div className="mt-4 flex gap-2">
          {agent.quarters.map((q) => <QuarterCell key={q.quarter} q={q} />)}
        </div>

        {/* Détail du trimestre courant */}
        {latest && (
          <div className="mt-4 space-y-1.5 rounded-2xl border border-slate-100 p-3">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Évaluation T{latest.quarter} {latest.state === "current" ? "(en cours)" : ""}
            </p>
            <Criteria ok={latest.reportingOk} label={`Reporting : ${latest.reportingScore}% (${latest.reportingDone}/${latest.reportingTotal})`} hint="≥ 50%" />
            <Criteria ok={latest.personalOk} label={`Affaires personnelles : ${latest.personalDays} j (${latest.personalPct}%)`} hint="< 20%" />
            <Criteria ok={latest.medicalOk} label={`Raison médicale : ${latest.medicalDays} j (${latest.medicalPct}%)`} hint="< 40%" />
          </div>
        )}

        {/* Message Côte d'Ivoire (texte + audio) */}
        {agent.ciMessage && (
          <div className={cn("mt-4 rounded-2xl border p-4", good ? "border-brand-100 bg-brand-50/60" : "border-amber-100 bg-amber-50/60")}>
            <p className="flex items-start gap-2 text-sm font-medium text-ink">
              <Megaphone className={cn("mt-0.5 size-4 shrink-0", good ? "text-brand-600" : "text-amber-600")} />
              <span>« {agent.ciMessage} »</span>
            </p>
            <div className="mt-3">
              <SpeakButton text={agent.ciMessage} className={good ? "bg-brand-600 text-white hover:bg-brand-700" : "bg-amber-500 text-white hover:bg-amber-600"} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
