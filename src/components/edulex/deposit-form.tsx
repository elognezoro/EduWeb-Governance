"use client";

import { useState, useTransition, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle, FilePlus2, Hash } from "lucide-react";
import { Input, Label } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { SearchSelect } from "@/components/ui/search-select";
import { CountrySelect } from "@/components/ui/country-select";
import { Button } from "@/components/ui/button";
import { LEGAL_TYPE, LEGAL_STATUS, CONFIDENTIALITY } from "@/lib/enums";
import { formatLegalCode, buildCodeParts } from "@/lib/edulex-code";
import { createLegalText, type DepositInput } from "@/app/(app)/edulex/actions";

interface C { id: string; code: string; name: string }
interface M { id: string; code: string | null; name: string; countryId: string }
interface S { id: string; code: string | null; name: string }
interface J { id: string; code: string | null; name: string; countryId: string }

export function DepositForm({
  countries, ministries, sectors, jurisdictions, defaultCountryId,
}: {
  countries: C[]; ministries: M[]; sectors: S[]; jurisdictions: J[]; defaultCountryId?: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [f, setF] = useState<DepositInput>({
    title: "", officialNumber: "", countryId: defaultCountryId ?? countries[0]?.id ?? "",
    jurisdictionId: "", ministryId: "", sectorId: "", type: "DEC",
    language: "fr", confidentiality: "PUBLIC", status: "PENDING",
    signatureDate: "", publicationDate: "", effectiveDate: "", summary: "", sourceUrl: "",
  });
  const set = (patch: Partial<DepositInput>) => setF((p) => ({ ...p, ...patch }));

  // Pays filtrés pour ministères/juridictions
  const country = countries.find((c) => c.id === f.countryId);
  const ministry = ministries.find((m) => m.id === f.ministryId);
  const sector = sectors.find((s) => s.id === f.sectorId);
  const jur = jurisdictions.find((j) => j.id === f.jurisdictionId);

  const codePreview = useMemo(() => {
    if (!country) return "—";
    const year = (f.signatureDate || f.publicationDate ? new Date(f.signatureDate || f.publicationDate || "") : new Date()).getFullYear() || new Date().getFullYear();
    return formatLegalCode(buildCodeParts({
      countryCode: country.code, ministryCode: ministry?.code, jurisdictionCode: jur?.code,
      sectorCode: sector?.code, type: f.type, year, num: 1, version: 1,
    }));
  }, [country, ministry, sector, jur, f.type, f.signatureDate, f.publicationDate]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const res = await createLegalText(f);
      if (res && !res.ok) setError(res.error);
    });
  }

  const myMinistries = ministries.filter((m) => m.countryId === f.countryId);
  const myJur = jurisdictions.filter((j) => j.countryId === f.countryId);

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {error && (
        <div className="flex items-center gap-2 rounded-2xl border border-danger-100 bg-red-50 px-4 py-3 text-sm font-medium text-danger-600">
          <AlertCircle className="size-4 shrink-0" /> {error}
        </div>
      )}

      {/* Aperçu du code */}
      <div className="flex items-center gap-3 rounded-2xl border border-institutional-100 bg-institutional-50/60 p-4">
        <Hash className="size-5 shrink-0 text-institutional-700" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-institutional-700">Code EduLex (généré automatiquement)</p>
          <p className="font-mono text-sm font-bold text-institutional-900">{codePreview}</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Titre officiel *</Label>
        <Input id="title" value={f.title} onChange={(e) => set({ title: e.target.value })} placeholder="Ex. Décret relatif à…" required />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Pays *</Label>
          <CountrySelect countries={countries} value={f.countryId} onChange={(v) => set({ countryId: v, ministryId: "", jurisdictionId: "" })} />
        </div>
        <div className="space-y-2">
          <Label>Type *</Label>
          <Select value={f.type} onChange={(e) => set({ type: e.target.value })} required>
            {LEGAL_TYPE.map((t) => <option key={t.value} value={t.value}>{t.label} ({t.value})</option>)}
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Ministère émetteur</Label>
          <SearchSelect
            value={f.ministryId ?? ""}
            onChange={(v) => set({ ministryId: v })}
            options={myMinistries.map((m) => ({ value: m.id, label: m.code ? `${m.name} (${m.code})` : m.name }))}
            emptyLabel="— Aucun —"
            placeholder="— Sélectionner un ministère —"
            searchPlaceholder="Rechercher un ministère…"
          />
        </div>
        <div className="space-y-2">
          <Label>Secteur</Label>
          <Select value={f.sectorId} onChange={(e) => set({ sectorId: e.target.value })}>
            <option value="">—</option>
            {sectors.map((s) => <option key={s.id} value={s.id}>{s.name}{s.code ? ` (${s.code})` : ""}</option>)}
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Juridiction</Label>
          <Select value={f.jurisdictionId} onChange={(e) => set({ jurisdictionId: e.target.value })}>
            <option value="">—</option>
            {myJur.map((j) => <option key={j.id} value={j.id}>{j.name}</option>)}
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Numéro officiel</Label>
          <Input value={f.officialNumber} onChange={(e) => set({ officialNumber: e.target.value })} placeholder="Ex. 2026-004" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2"><Label>Date de signature</Label><Input type="date" value={f.signatureDate} onChange={(e) => set({ signatureDate: e.target.value })} /></div>
        <div className="space-y-2"><Label>Date de publication</Label><Input type="date" value={f.publicationDate} onChange={(e) => set({ publicationDate: e.target.value })} /></div>
        <div className="space-y-2"><Label>Entrée en vigueur</Label><Input type="date" value={f.effectiveDate} onChange={(e) => set({ effectiveDate: e.target.value })} /></div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label>Statut initial</Label>
          <Select value={f.status} onChange={(e) => set({ status: e.target.value })}>
            {LEGAL_STATUS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Confidentialité</Label>
          <Select value={f.confidentiality} onChange={(e) => set({ confidentiality: e.target.value })}>
            {CONFIDENTIALITY.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Langue</Label>
          <Select value={f.language} onChange={(e) => set({ language: e.target.value })}>
            <option value="fr">Français</option>
            <option value="en">Anglais</option>
          </Select>
        </div>
      </div>

      <div className="space-y-2"><Label>Résumé analytique</Label><Textarea value={f.summary} onChange={(e) => set({ summary: e.target.value })} placeholder="Objet et portée du texte…" /></div>
      <div className="space-y-2"><Label>URL source officielle</Label><Input value={f.sourceUrl} onChange={(e) => set({ sourceUrl: e.target.value })} placeholder="https://…" /></div>

      <div className="rounded-2xl bg-amber-50 px-4 py-3 text-xs font-medium text-amber-700">
        Le texte est déposé au niveau <strong>V0 (non vérifié)</strong>. Il devra suivre le circuit de validation avant d'être certifié.
      </div>

      <div className="flex items-center gap-3 border-t border-slate-100 pt-5">
        <Button type="submit" disabled={pending}>
          {pending ? <Loader2 className="size-4 animate-spin" /> : <FilePlus2 className="size-4" />} Déposer le texte
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.back()} disabled={pending}>Annuler</Button>
      </div>
    </form>
  );
}
