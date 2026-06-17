"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarOff, Plus, Trash2, Loader2, AlertCircle, AlertTriangle, ShieldAlert, SlidersHorizontal, User as UserIcon, ChevronDown,
} from "lucide-react";
import { Input, Label } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ABSENCE_MOTIFS, ABSENCE_MOTIF_MAP } from "@/lib/enums";
import { MotifBarChart } from "@/components/absences/motif-bar-chart";
import { recordAbsence, deleteAbsence, saveAbsencePolicy } from "@/app/(app)/absences/actions";

const TONE_CHIP: Record<string, string> = {
  brand: "bg-brand-50 text-brand-700",
  info: "bg-institutional-50 text-institutional-700",
  gold: "bg-gold-50 text-gold-600",
  warning: "bg-amber-50 text-amber-700",
  danger: "bg-red-50 text-danger-600",
  neutral: "bg-slate-100 text-slate-600",
  success: "bg-brand-50 text-brand-700",
};

export interface ClientAgent {
  id: string;
  name: string;
  context: string | null;
  isSelf: boolean;
  canEdit: boolean;
  summary: { byMotif: Record<string, number>; total: number; percent: number; overThreshold: boolean; overQuota: boolean };
  records: { id: string; motif: string; startISO: string; endISO: string; days: number; note: string | null }[];
}

const dateFmt = new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
function fdate(iso: string) {
  return dateFmt.format(new Date(iso));
}
function daysInclusive(start: string, end: string): number {
  const a = new Date(start).setHours(0, 0, 0, 0);
  const b = new Date(end).setHours(0, 0, 0, 0);
  if (Number.isNaN(a) || Number.isNaN(b)) return 0;
  return Math.max(1, Math.round((b - a) / 86_400_000) + 1);
}

export function AbsencesClient({
  policy, canManagePolicy, editableAgents, agents, year, years,
}: {
  policy: { annualQuotaDays: number; warningThresholdDays: number };
  canManagePolicy: boolean;
  editableAgents: { id: string; name: string }[];
  agents: ClientAgent[];
  year: number;
  years: number[];
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const run = (fn: () => Promise<{ ok: boolean; error?: string }>, after?: () => void) => {
    setError(null);
    start(async () => {
      const res = await fn();
      if (!res.ok) setError(res.error ?? "Action impossible.");
      else { after?.(); router.refresh(); }
    });
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="flex items-center gap-2 rounded-2xl border border-danger-100 bg-red-50 px-4 py-3 text-sm font-medium text-danger-600">
          <AlertCircle className="size-4 shrink-0" /> {error}
        </div>
      )}

      {/* Politique : quota annuel + seuil d'alerte */}
      <PolicyCard policy={policy} canManage={canManagePolicy} pending={pending} onSave={(v) => run(() => saveAbsencePolicy(v))} />

      {/* Sélecteur d'année + formulaire d'enregistrement */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-2xl border border-slate-200 bg-card p-1">
          {years.map((y) => (
            <button
              key={y}
              type="button"
              onClick={() => router.push(`/absences?year=${y}`)}
              className={cn(
                "rounded-xl px-4 py-1.5 text-sm font-semibold transition-colors",
                y === year ? "bg-brand-600 text-white shadow-sm" : "text-slate-500 hover:text-ink"
              )}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      {editableAgents.length > 0 && (
        <RecordForm agents={editableAgents} quota={policy.annualQuotaDays} pending={pending} onSubmit={(input) => run(() => recordAbsence(input))} />
      )}

      {/* Agents suivis */}
      <div className="space-y-4">
        {agents.length === 0 ? (
          <Card><CardContent className="p-6 text-sm text-slate-500">
            Aucun agent à suivre. Les agents dont vous êtes le supérieur hiérarchique apparaîtront ici.
          </CardContent></Card>
        ) : (
          agents.map((a) => (
            <AgentCard key={a.id} agent={a} quota={policy.annualQuotaDays} threshold={policy.warningThresholdDays} pending={pending}
              onDelete={(id) => run(() => deleteAbsence(id))} />
          ))
        )}
      </div>
    </div>
  );
}

function PolicyCard({ policy, canManage, pending, onSave }: {
  policy: { annualQuotaDays: number; warningThresholdDays: number };
  canManage: boolean;
  pending: boolean;
  onSave: (v: { annualQuotaDays: number; warningThresholdDays: number }) => void;
}) {
  const [edit, setEdit] = useState(false);
  const [quota, setQuota] = useState(String(policy.annualQuotaDays));
  const [threshold, setThreshold] = useState(String(policy.warningThresholdDays));

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-2xl bg-brand-50 text-brand-700"><SlidersHorizontal className="size-5" /></span>
            <div>
              <p className="font-bold text-institutional-900">Politique d'absences</p>
              <p className="text-xs text-slate-400">Congé annuel réglementaire&nbsp;: <b>{policy.annualQuotaDays} j</b> · Seuil d'alerte&nbsp;: <b>{policy.warningThresholdDays} j</b></p>
            </div>
          </div>
          {canManage && !edit && <Button size="sm" variant="outline" onClick={() => setEdit(true)}>Modifier</Button>}
        </div>
        {canManage && edit && (
          <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
            <div className="space-y-1.5">
              <Label>Congé annuel réglementaire (jours)</Label>
              <Input type="number" min={1} max={366} value={quota} onChange={(e) => setQuota(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Seuil d'alerte (jours cumulés)</Label>
              <Input type="number" min={1} max={366} value={threshold} onChange={(e) => setThreshold(e.target.value)} />
            </div>
            <div className="flex gap-2">
              <Button size="sm" disabled={pending} onClick={() => onSave({ annualQuotaDays: Number(quota), warningThresholdDays: Number(threshold) })}>
                {pending ? <Loader2 className="size-4 animate-spin" /> : null} Enregistrer
              </Button>
              <Button size="sm" variant="ghost" disabled={pending} onClick={() => setEdit(false)}>Annuler</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function RecordForm({ agents, quota, pending, onSubmit }: {
  agents: { id: string; name: string }[];
  quota: number;
  pending: boolean;
  onSubmit: (input: { agentId: string; motif: string; startDate: string; endDate: string; days: number; note?: string }) => void;
}) {
  const [open, setOpen] = useState(false);
  const [agentId, setAgentId] = useState(agents[0]?.id ?? "");
  const [motif, setMotif] = useState(ABSENCE_MOTIFS[0].value);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [daysTouched, setDaysTouched] = useState(false);
  const [days, setDays] = useState("");

  const auto = useMemo(() => (startDate && endDate ? daysInclusive(startDate, endDate) : 0), [startDate, endDate]);
  const effectiveDays = daysTouched ? days : auto ? String(auto) : "";

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!agentId || !startDate || !endDate) return;
    onSubmit({ agentId, motif, startDate, endDate, days: Number(effectiveDays || auto), note: undefined });
    setStartDate(""); setEndDate(""); setDays(""); setDaysTouched(false); setOpen(false);
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="flex items-center gap-2 font-bold text-institutional-900"><CalendarOff className="size-4 text-brand-700" /> Comptabiliser une absence</p>
          {!open && <Button size="sm" onClick={() => setOpen(true)}><Plus className="size-4" /> Ajouter</Button>}
        </div>
        {open && (
          <form onSubmit={submit} className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Agent</Label>
              <Select value={agentId} onChange={(e) => setAgentId(e.target.value)} required>
                {agents.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Motif</Label>
              <Select value={motif} onChange={(e) => setMotif(e.target.value)}>
                {ABSENCE_MOTIFS.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Du</Label>
              <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label>Au</Label>
              <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label>Nombre de jours {auto > 0 && <span className="font-normal text-slate-400">(auto&nbsp;: {auto})</span>}</Label>
              <Input type="number" min={1} max={366} value={effectiveDays}
                onChange={(e) => { setDaysTouched(true); setDays(e.target.value); }}
                placeholder={auto ? String(auto) : "—"} required />
            </div>
            <div className="flex items-end gap-2">
              <Button type="submit" disabled={pending}>
                {pending ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />} Enregistrer
              </Button>
              <Button type="button" variant="ghost" onClick={() => setOpen(false)} disabled={pending}>Annuler</Button>
            </div>
            <p className="text-xs text-slate-400 sm:col-span-2">Quota annuel réglementaire de référence&nbsp;: {quota} jours.</p>
          </form>
        )}
      </CardContent>
    </Card>
  );
}

function AgentCard({ agent, quota, threshold, pending, onDelete }: {
  agent: ClientAgent;
  quota: number;
  threshold: number;
  pending: boolean;
  onDelete: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const s = agent.summary;
  const barTone = s.overQuota ? "bg-danger-500" : s.overThreshold ? "bg-gold-400" : "bg-brand-500";
  const pct = Math.min(s.percent, 100);

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-2xl bg-institutional-50 text-institutional-700"><UserIcon className="size-5" /></span>
            <div>
              <p className="font-semibold text-ink">{agent.name}{agent.isSelf && <span className="ml-2 text-xs font-medium text-slate-400">(moi)</span>}</p>
              {agent.context && <p className="text-xs text-slate-400">{agent.context}</p>}
            </div>
          </div>
          {s.overQuota ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-danger-600"><ShieldAlert className="size-3.5" /> Quota dépassé</span>
          ) : s.overThreshold ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700"><AlertTriangle className="size-3.5" /> Seuil atteint</span>
          ) : null}
        </div>

        {/* Ratio sur le congé annuel */}
        <div className="mt-4">
          <div className="flex items-end justify-between text-sm">
            <span className="font-medium text-slate-500">Cumul d'absences</span>
            <span className="font-semibold text-institutional-900">{s.total} / {quota} j <span className="font-normal text-slate-400">· {s.percent}%</span></span>
          </div>
          <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-slate-100">
            <div className={cn("h-full rounded-full transition-all", barTone)} style={{ width: `${pct}%` }} />
          </div>
        </div>

        {/* Diagramme des jours par motif */}
        {s.total > 0 ? (
          <div className="mt-4">
            <p className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-400">Jours d'absence par motif</p>
            <MotifBarChart byMotif={s.byMotif} />
          </div>
        ) : (
          <p className="mt-3 text-sm text-slate-400">Aucune absence enregistrée sur l'année.</p>
        )}

        {/* Liste des enregistrements */}
        {agent.records.length > 0 && (
          <div className="mt-4">
            <button type="button" onClick={() => setOpen((o) => !o)} className="inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:text-brand-800">
              <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} /> {agent.records.length} enregistrement{agent.records.length > 1 ? "s" : ""}
            </button>
            {open && (
              <ul className="mt-2 space-y-2">
                {agent.records.map((r) => {
                  const meta = ABSENCE_MOTIF_MAP[r.motif];
                  return (
                    <li key={r.id} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 p-3">
                      <div className="min-w-0">
                        <span className={cn("inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold", TONE_CHIP[meta?.tone ?? "neutral"])}>{meta?.label ?? r.motif}</span>
                        <p className="mt-1 text-sm text-ink">{fdate(r.startISO)} → {fdate(r.endISO)} · <b>{r.days} j</b></p>
                        {r.note && <p className="text-xs text-slate-400">{r.note}</p>}
                      </div>
                      {agent.canEdit && (
                        <button type="button" onClick={() => onDelete(r.id)} disabled={pending} aria-label="Supprimer"
                          className="flex size-8 shrink-0 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-red-50 hover:text-danger-600">
                          <Trash2 className="size-4" />
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
