"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle, FileBarChart } from "lucide-react";
import { Input, Label } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { CountrySelect } from "@/components/ui/country-select";
import { Button } from "@/components/ui/button";
import { REPORT_PERIODS } from "@/lib/enums";
import { generateReport } from "@/app/(app)/reports/actions";

interface Opt { id: string; name: string }

export function ReportForm({ countries, organizations, structures }: { countries: { id: string; name: string; code: string }[]; organizations: Opt[]; structures: Opt[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [period, setPeriod] = useState("MONTHLY");
  const [countryId, setCountryId] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [structureId, setStructureId] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const res = await generateReport({
        title, period,
        countryId: countryId || undefined,
        organizationId: organizationId || undefined,
        structureId: structureId || undefined,
        from: from || undefined,
        to: to || undefined,
      });
      if (res && !res.ok) setError(res.error);
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {error && (
        <div className="flex items-center gap-2 rounded-2xl border border-danger-100 bg-red-50 px-4 py-3 text-sm font-medium text-danger-600">
          <AlertCircle className="size-4 shrink-0" /> {error}
        </div>
      )}

      <div className="space-y-2"><Label htmlFor="t">Titre du rapport *</Label><Input id="t" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex. Rapport mensuel d'activités — Juin 2026" required /></div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="p">Périodicité *</Label>
          <Select id="p" value={period} onChange={(e) => setPeriod(e.target.value)}>
            {REPORT_PERIODS.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="c">Pays</Label>
          <CountrySelect id="c" value={countryId} onChange={setCountryId} countries={countries} emptyLabel="Tous les pays" placeholder="Tous les pays" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="o">Organisation</Label>
          <Select id="o" value={organizationId} onChange={(e) => setOrganizationId(e.target.value)}>
            <option value="">Toutes les organisations</option>
            {organizations.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="s">Structure</Label>
          <Select id="s" value={structureId} onChange={(e) => setStructureId(e.target.value)}>
            <option value="">Toutes les structures</option>
            {structures.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </Select>
        </div>
        <div className="space-y-2"><Label htmlFor="from">Du</Label><Input id="from" type="date" value={from} onChange={(e) => setFrom(e.target.value)} /></div>
        <div className="space-y-2"><Label htmlFor="to">Au</Label><Input id="to" type="date" value={to} onChange={(e) => setTo(e.target.value)} /></div>
      </div>

      <div className="rounded-2xl bg-slate-50 px-4 py-3 text-xs text-slate-500">
        Le rapport consolide les activités <strong>validées et consolidées</strong> du périmètre choisi, avec indicateurs et références réglementaires EduLex utilisées.
      </div>

      <div className="flex items-center gap-3 border-t border-slate-100 pt-5">
        <Button type="submit" disabled={pending}>
          {pending ? <Loader2 className="size-4 animate-spin" /> : <FileBarChart className="size-4" />} Générer le rapport
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.back()} disabled={pending}>Annuler</Button>
      </div>
    </form>
  );
}
