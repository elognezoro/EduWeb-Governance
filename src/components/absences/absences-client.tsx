"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarOff, Plus, Trash2, Loader2, AlertCircle, AlertTriangle, ShieldAlert, SlidersHorizontal,
  User as UserIcon, ChevronDown, Send, Check, X, Inbox,
} from "lucide-react";
import { Input, Label } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ABSENCE_MOTIFS, ABSENCE_MOTIF_MAP, ABSENCE_STATUS_MAP } from "@/lib/enums";
import { MotifBarChart } from "@/components/absences/motif-bar-chart";
import { recordAbsence, requestAbsence, decideAbsence, deleteAbsence, saveAbsencePolicy } from "@/app/(app)/absences/actions";

const TONE_CHIP: Record<string, string> = {
  brand: "bg-brand-50 text-brand-700",
  info: "bg-institutional-50 text-institutional-700",
  gold: "bg-gold-50 text-gold-600",
  warning: "bg-amber-50 text-amber-700",
  danger: "bg-red-50 text-danger-600",
  neutral: "bg-slate-100 text-slate-600",
  success: "bg-brand-50 text-brand-700",
};

export interface ClientRecord {
  id: string;
  motif: string;
  startISO: string;
  endISO: string;
  days: number;
  note: string | null;
  status: string; // PENDING | APPROVED | REFUSED
  decisionNote: string | null;
}

export interface ClientAgent {
  id: string;
  name: string;
  context: string | null;
  isSelf: boolean;
  canEdit: boolean;
  summary: { byMotif: Record<string, number>; total: number; percent: number; overThreshold: boolean; overQuota: boolean };
  records: ClientRecord[];
}

const dateFmt = new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
const fdate = (iso: string) => dateFmt.format(new Date(iso));
function daysInclusive(start: string, end: string): number {
  const a = new Date(start).setHours(0, 0, 0, 0);
  const b = new Date(end).setHours(0, 0, 0, 0);
  if (Number.isNaN(a) || Number.isNaN(b)) return 0;
  return Math.max(1, Math.round((b - a) / 86_400_000) + 1);
}

function StatusPill({ status }: { status: string }) {
  const meta = ABSENCE_STATUS_MAP[status] ?? { label: status, tone: "neutral" };
  return <span className={cn("inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold", TONE_CHIP[meta.tone] ?? TONE_CHIP.neutral)}>{meta.label}</span>;
}

type RunFn = (fn: () => Promise<{ ok: boolean; error?: string }>, after?: () => void) => void;

export function AbsencesClient({
  policy, canManagePolicy, editableAgents, selfCanRequest, agents, year, years,
}: {
  policy: { annualQuotaDays: number; warningThresholdDays: number };
  canManagePolicy: boolean;
  editableAgents: { id: string; name: string }[];
  selfCanRequest: boolean;
  agents: ClientAgent[];
  year: number;
  years: number[];
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const run: RunFn = (fn, after) => {
    setError(null);
    start(async () => {
      const res = await fn();
      if (!res.ok) setError(res.error ?? "Action impossible.");
      else { after?.(); router.refresh(); }
    });
  };

  // Demandes en attente que JE dois valider (agents que je gère).
  const toValidate = agents
    .filter((a) => a.canEdit && !a.isSelf)
    .flatMap((a) => a.records.filter((r) => r.status === "PENDING").map((r) => ({ ...r, agentName: a.name })));

  return (
    <div className="space-y-6">
      {error && (
        <div className="flex items-center gap-2 rounded-2xl border border-danger-100 bg-red-50 px-4 py-3 text-sm font-medium text-danger-600">
          <AlertCircle className="size-4 shrink-0" /> {error}
        </div>
      )}

      <PolicyCard policy={policy} canManage={canManagePolicy} pending={pending} onSave={(v) => run(() => saveAbsencePolicy(v))} />

      {/* Sélecteur d'année */}
      <div className="inline-flex rounded-2xl border border-slate-200 bg-card p-1">
        {years.map((y) => (
          <button key={y} type="button" onClick={() => router.push(`/absences?year=${y}`)}
            className={cn("rounded-xl px-4 py-1.5 text-sm font-semibold transition-colors", y === year ? "bg-brand-600 text-white shadow-sm" : "text-slate-500 hover:text-ink")}>
            {y}
          </button>
        ))}
      </div>

      {/* Demandes à valider (supérieur) */}
      {toValidate.length > 0 && <ValidationQueue items={toValidate} pending={pending} run={run} />}

      {/* Demander une absence (agent) */}
      {selfCanRequest && <RequestForm quota={policy.annualQuotaDays} pending={pending} onSubmit={(input) => run(() => requestAbsence(input))} />}

      {/* Enregistrement direct (supérieur) */}
      {editableAgents.length > 0 && (
        <RecordForm agents={editableAgents} quota={policy.annualQuotaDays} pending={pending} onSubmit={(input) => run(() => recordAbsence(input))} />
      )}

      {/* Agents suivis */}
      <div className="space-y-4">
        {agents.length === 0 ? (
          <Card><CardContent className="p-6 text-sm text-slate-500">Aucun agent à suivre pour le moment.</CardContent></Card>
        ) : (
          agents.map((a) => (
            <AgentCard key={a.id} agent={a} quota={policy.annualQuotaDays} pending={pending}
              onDelete={(id) => run(() => deleteAbsence(id))} />
          ))
        )}
      </div>
    </div>
  );
}

function ValidationQueue({ items, pending, run }: {
  items: (ClientRecord & { agentName: string })[];
  pending: boolean;
  run: RunFn;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <p className="flex items-center gap-2 font-bold text-institutional-900">
          <Inbox className="size-4 text-brand-700" /> Demandes à valider
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">{items.length}</span>
        </p>
        <ul className="mt-4 space-y-2.5">
          {items.map((r) => <DecideRow key={r.id} r={r} pending={pending} run={run} />)}
        </ul>
      </CardContent>
    </Card>
  );
}

function DecideRow({ r, pending, run }: { r: ClientRecord & { agentName: string }; pending: boolean; run: RunFn }) {
  const [refusing, setRefusing] = useState(false);
  const [reason, setReason] = useState("");
  const meta = ABSENCE_MOTIF_MAP[r.motif];

  return (
    <li className="rounded-2xl border border-amber-100 bg-amber-50/40 p-3.5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-ink">{r.agentName}</p>
          <p className="mt-0.5 text-sm text-slate-600">
            <span className={cn("mr-2 inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold", TONE_CHIP[meta?.tone ?? "neutral"])}>{meta?.label ?? r.motif}</span>
            {fdate(r.startISO)} → {fdate(r.endISO)} · <b>{r.days} j</b>
          </p>
          {r.note && <p className="mt-1 text-xs text-slate-500">« {r.note} »</p>}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button size="sm" disabled={pending} onClick={() => run(() => decideAbsence({ id: r.id, decision: "APPROVE" }))}>
            <Check className="size-4" /> Approuver
          </Button>
          <Button size="sm" variant="outline" disabled={pending} onClick={() => setRefusing((v) => !v)}>
            <X className="size-4" /> Refuser
          </Button>
        </div>
      </div>
      {refusing && (
        <div className="mt-3 flex flex-wrap items-end gap-2">
          <div className="min-w-0 flex-1 space-y-1.5">
            <Label>Motif du refus (facultatif)</Label>
            <Input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="ex. période chargée, effectif insuffisant…" />
          </div>
          <Button size="sm" variant="danger" disabled={pending}
            onClick={() => run(() => decideAbsence({ id: r.id, decision: "REFUSE", note: reason || undefined }), () => { setRefusing(false); setReason(""); })}>
            {pending ? <Loader2 className="size-4 animate-spin" /> : <X className="size-4" />} Confirmer le refus
          </Button>
        </div>
      )}
    </li>
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

/** Formulaire de DEMANDE d'absence par l'agent (pour lui-même). */
function RequestForm({ quota, pending, onSubmit }: {
  quota: number;
  pending: boolean;
  onSubmit: (input: { motif: string; startDate: string; endDate: string; days: number; note?: string }) => void;
}) {
  const [open, setOpen] = useState(false);
  const [motif, setMotif] = useState(ABSENCE_MOTIFS[0].value);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [daysTouched, setDaysTouched] = useState(false);
  const [days, setDays] = useState("");
  const [note, setNote] = useState("");

  const auto = useMemo(() => (startDate && endDate ? daysInclusive(startDate, endDate) : 0), [startDate, endDate]);
  const effectiveDays = daysTouched ? days : auto ? String(auto) : "";

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!startDate || !endDate) return;
    onSubmit({ motif, startDate, endDate, days: Number(effectiveDays || auto), note: note || undefined });
    setStartDate(""); setEndDate(""); setDays(""); setDaysTouched(false); setNote(""); setOpen(false);
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="flex items-center gap-2 font-bold text-institutional-900"><Send className="size-4 text-brand-700" /> Demander une absence</p>
          {!open && <Button size="sm" onClick={() => setOpen(true)}><Plus className="size-4" /> Nouvelle demande</Button>}
        </div>
        {open && (
          <form onSubmit={submit} className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
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
                onChange={(e) => { setDaysTouched(true); setDays(e.target.value); }} placeholder={auto ? String(auto) : "—"} required />
            </div>
            <div className="space-y-1.5">
              <Label>Note au supérieur <span className="font-normal text-slate-400">(facultatif)</span></Label>
              <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Précision éventuelle…" />
            </div>
            <div className="flex items-end gap-2 sm:col-span-2">
              <Button type="submit" disabled={pending}>
                {pending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />} Envoyer au supérieur
              </Button>
              <Button type="button" variant="ghost" onClick={() => setOpen(false)} disabled={pending}>Annuler</Button>
              <p className="ml-auto text-xs text-slate-400">Quota annuel&nbsp;: {quota} j. La demande sera soumise à votre supérieur.</p>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}

/** Enregistrement DIRECT par le supérieur (validé d'office). */
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
          <p className="flex items-center gap-2 font-bold text-institutional-900"><CalendarOff className="size-4 text-brand-700" /> Comptabiliser directement <span className="text-xs font-normal text-slate-400">(validée d'office)</span></p>
          {!open && <Button size="sm" variant="outline" onClick={() => setOpen(true)}><Plus className="size-4" /> Ajouter</Button>}
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
                onChange={(e) => { setDaysTouched(true); setDays(e.target.value); }} placeholder={auto ? String(auto) : "—"} required />
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

function AgentCard({ agent, quota, pending, onDelete }: {
  agent: ClientAgent;
  quota: number;
  pending: boolean;
  onDelete: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const s = agent.summary;
  const barTone = s.overQuota ? "bg-danger-500" : s.overThreshold ? "bg-gold-400" : "bg-brand-500";
  const pct = Math.min(s.percent, 100);
  const pendingCount = agent.records.filter((r) => r.status === "PENDING").length;

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
          <div className="flex items-center gap-2">
            {pendingCount > 0 && <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">{pendingCount} en attente</span>}
            {s.overQuota ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-danger-600"><ShieldAlert className="size-3.5" /> Quota dépassé</span>
            ) : s.overThreshold ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700"><AlertTriangle className="size-3.5" /> Seuil atteint</span>
            ) : null}
          </div>
        </div>

        {/* Ratio (jours approuvés) sur le congé annuel */}
        <div className="mt-4">
          <div className="flex items-end justify-between text-sm">
            <span className="font-medium text-slate-500">Cumul d'absences approuvées</span>
            <span className="font-semibold text-institutional-900">{s.total} / {quota} j <span className="font-normal text-slate-400">· {s.percent}%</span></span>
          </div>
          <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-slate-100">
            <div className={cn("h-full rounded-full transition-all", barTone)} style={{ width: `${pct}%` }} />
          </div>
        </div>

        {s.total > 0 ? (
          <div className="mt-4">
            <p className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-400">Jours d'absence par motif (approuvés)</p>
            <MotifBarChart byMotif={s.byMotif} />
          </div>
        ) : (
          <p className="mt-3 text-sm text-slate-400">Aucune absence approuvée sur l'année.</p>
        )}

        {/* Historique des demandes / enregistrements */}
        {agent.records.length > 0 && (
          <div className="mt-4">
            <button type="button" onClick={() => setOpen((o) => !o)} className="inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:text-brand-800">
              <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} /> {agent.records.length} demande{agent.records.length > 1 ? "s" : ""} / enregistrement{agent.records.length > 1 ? "s" : ""}
            </button>
            {open && (
              <ul className="mt-2 space-y-2">
                {agent.records.map((r) => {
                  const meta = ABSENCE_MOTIF_MAP[r.motif];
                  const canCancel = agent.isSelf && r.status === "PENDING";
                  return (
                    <li key={r.id} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 p-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={cn("inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold", TONE_CHIP[meta?.tone ?? "neutral"])}>{meta?.label ?? r.motif}</span>
                          <StatusPill status={r.status} />
                        </div>
                        <p className="mt-1 text-sm text-ink">{fdate(r.startISO)} → {fdate(r.endISO)} · <b>{r.days} j</b></p>
                        {r.note && <p className="text-xs text-slate-400">« {r.note} »</p>}
                        {r.status === "REFUSED" && r.decisionNote && <p className="text-xs text-danger-600">Refus : {r.decisionNote}</p>}
                      </div>
                      {(agent.canEdit || canCancel) && (
                        <button type="button" onClick={() => onDelete(r.id)} disabled={pending} aria-label={canCancel ? "Annuler la demande" : "Supprimer"}
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
