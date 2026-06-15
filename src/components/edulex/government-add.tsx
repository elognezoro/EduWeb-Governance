"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, AlertCircle } from "lucide-react";
import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CountrySelect, type CountryOpt } from "@/components/ui/country-select";
import { createGovernment } from "@/app/(app)/edulex/reference-actions";

export function GovernmentAdd({ countries, defaultCountryId = "" }: { countries: CountryOpt[]; defaultCountryId?: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [countryId, setCountryId] = useState(defaultCountryId);
  const [name, setName] = useState("");
  const [effectiveDate, setEffectiveDate] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!countryId) { setError("Sélectionnez un pays."); return; }
    start(async () => {
      const res = await createGovernment({ countryId, name, effectiveDate, sourceUrl });
      if (!res.ok) setError(res.error);
      else { setName(""); setEffectiveDate(""); setSourceUrl(""); router.refresh(); }
    });
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      {error && (
        <div className="flex items-center gap-2 rounded-2xl border border-danger-100 bg-red-50 px-4 py-3 text-sm font-medium text-danger-600">
          <AlertCircle className="size-4 shrink-0" /> {error}
        </div>
      )}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label>Pays</Label>
          <CountrySelect countries={countries} value={countryId} onChange={setCountryId} placeholder="Pays" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="gov-name">Nom du gouvernement</Label>
          <Input id="gov-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="ex. Gouvernement Beugré Mambé" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="gov-date">Date d'entrée en vigueur</Label>
          <Input id="gov-date" type="date" value={effectiveDate} onChange={(e) => setEffectiveDate(e.target.value)} required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="gov-src">Source officielle (URL)</Label>
          <Input id="gov-src" value={sourceUrl} onChange={(e) => setSourceUrl(e.target.value)} placeholder="https://…" />
        </div>
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />} Enregistrer le gouvernement
      </Button>
      <p className="text-xs text-slate-400">
        Le gouvernement devient automatiquement « en vigueur » dès sa date d'entrée en vigueur ; le précédent est alors archivé.
      </p>
    </form>
  );
}
