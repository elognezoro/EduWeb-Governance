"use client";

import { useEffect, useRef, useState } from "react";
import { Eye, Users, UserPlus } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { cn } from "@/lib/utils";

const GRANULARITIES: { key: string; label: string }[] = [
  { key: "hour", label: "Heure" },
  { key: "day", label: "Jour" },
  { key: "week", label: "Semaine" },
  { key: "month", label: "Mois" },
  { key: "year", label: "Année" },
];

const BRAND = "#0F766E";
const INSTITUTIONAL = "#1D4ED8";

interface Counts { visits: number; users: number; accounts: number }
interface Point { label: string; vues: number; comptes: number }

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);
  useEffect(() => {
    const from = prev.current, to = value;
    prev.current = value;
    if (from === to) { setDisplay(to); return; }
    const start = performance.now(), dur = 700;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <>{display.toLocaleString("fr-FR")}</>;
}

export function LiveStats() {
  const [counts, setCounts] = useState<Counts>({ visits: 0, users: 0, accounts: 0 });
  const [g, setG] = useState("day");
  const [series, setSeries] = useState<Point[]>([]);

  useEffect(() => {
    let active = true;
    const load = () => fetch("/api/stats").then((r) => r.json()).then((d) => { if (active) setCounts(d); }).catch(() => {});
    load();
    const id = setInterval(load, 5000);
    return () => { active = false; clearInterval(id); };
  }, []);

  useEffect(() => {
    let active = true;
    const load = () => fetch(`/api/stats/series?g=${g}`).then((r) => r.json()).then((d) => { if (active) setSeries(d.data ?? []); }).catch(() => {});
    load();
    const id = setInterval(load, 15000);
    return () => { active = false; clearInterval(id); };
  }, [g]);

  const cards = [
    { key: "visits", label: "Visites", value: counts.visits, icon: Eye, tone: "bg-brand-50 text-brand-700" },
    { key: "users", label: "Utilisateurs actifs", value: counts.users, icon: Users, tone: "bg-institutional-50 text-institutional-700" },
    { key: "accounts", label: "Comptes créés", value: counts.accounts, icon: UserPlus, tone: "bg-gold-100 text-gold-600" },
  ];

  return (
    <div className="space-y-6">
      {/* Bandeau temps réel */}
      <div className="flex items-center justify-center gap-2">
        <span className="relative flex size-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-75" />
          <span className="relative inline-flex size-2.5 rounded-full bg-brand-600" />
        </span>
        <span className="text-sm font-semibold text-brand-700">En direct · mis à jour en continu</span>
      </div>

      {/* Compteurs */}
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.key} className="rounded-3xl border border-slate-100 bg-card p-6 shadow-card">
              <span className={cn("flex size-11 items-center justify-center rounded-2xl", c.tone)}>
                <Icon className="size-5" />
              </span>
              <p className="mt-4 text-3xl font-extrabold tracking-tight text-institutional-900 tabular-nums">
                <AnimatedNumber value={c.value} />
              </p>
              <p className="mt-0.5 text-sm font-medium text-slate-500">{c.label}</p>
            </div>
          );
        })}
      </div>

      {/* Diagramme évolutif */}
      <div className="rounded-3xl border border-slate-100 bg-card p-5 shadow-card sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-bold text-institutional-900">Évolution de la fréquentation</h3>
            <p className="text-sm text-slate-500">Visites et comptes créés dans le temps.</p>
          </div>
          <div className="flex flex-wrap gap-1 rounded-2xl bg-slate-100 p-1">
            {GRANULARITIES.map((gr) => (
              <button
                key={gr.key}
                onClick={() => setG(gr.key)}
                className={cn(
                  "rounded-xl px-3 py-1.5 text-xs font-semibold transition-colors",
                  g === gr.key ? "bg-card text-brand-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                {gr.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={series} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <defs>
                {/* Visites en bleu, Comptes créés en vert */}
                <linearGradient id="gVues" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={INSTITUTIONAL} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={INSTITUTIONAL} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gComptes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={BRAND} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={BRAND} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF2F6" vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#94A3B8" }} tickLine={false} axisLine={false} interval="preserveStartEnd" minTickGap={16} />
              <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} tickLine={false} axisLine={false} allowDecimals={false} width={40} />
              <Tooltip
                contentStyle={{ borderRadius: 14, border: "1px solid #E2E8F0", fontSize: 12 }}
                labelStyle={{ fontWeight: 700, color: "#0F172A" }}
              />
              <Area type="monotone" dataKey="vues" name="Visites" stroke={INSTITUTIONAL} strokeWidth={2} fill="url(#gVues)" />
              <Area type="monotone" dataKey="comptes" name="Comptes créés" stroke={BRAND} strokeWidth={2} fill="url(#gComptes)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5"><span className="size-2.5 rounded-full" style={{ background: INSTITUTIONAL }} /> Visites</span>
          <span className="inline-flex items-center gap-1.5"><span className="size-2.5 rounded-full" style={{ background: BRAND }} /> Comptes créés</span>
        </div>
      </div>
    </div>
  );
}
