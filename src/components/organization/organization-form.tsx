"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle, Save } from "lucide-react";
import { Input, Label } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { CountrySelect } from "@/components/ui/country-select";
import { SearchSelect } from "@/components/ui/search-select";
import { Button } from "@/components/ui/button";
import { ORGANIZATION_TYPES } from "@/lib/enums";
import { createOrganization } from "@/app/(app)/organization/actions";

export function OrganizationForm({ countries, ministries }: {
  countries: { id: string; name: string; code: string; namespace?: string | null }[];
  ministries: { id: string; name: string }[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [countryId, setCountryId] = useState("");
  const [pickedMinistry, setPickedMinistry] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const res = await createOrganization({ name, type: type || undefined, countryId: countryId || undefined });
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
      {ministries.length > 0 && (
        <div className="space-y-2">
          <Label htmlFor="min">Ministère du gouvernement actuel <span className="font-normal text-slate-400">(Côte d'Ivoire — pré-remplit le nom)</span></Label>
          <SearchSelect
            id="min"
            value={pickedMinistry}
            onChange={(v) => {
              setPickedMinistry(v);
              const m = ministries.find((x) => x.id === v);
              if (m) { setName(m.name); setType("MINISTRY"); }
            }}
            options={ministries.map((m) => ({ value: m.id, label: m.name }))}
            emptyLabel="— Saisie libre —"
            placeholder="— Choisir un ministère —"
            searchPlaceholder="Rechercher un ministère…"
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">Nom de l'organisation *</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex. Ministère de l'Éducation nationale" required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select id="type" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">—</option>
            {ORGANIZATION_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="cty">Pays</Label>
          <CountrySelect id="cty" value={countryId} onChange={setCountryId} countries={countries} emptyLabel="—" placeholder="— Pays —" />
        </div>
      </div>
      <div className="flex items-center gap-3 border-t border-slate-100 pt-5">
        <Button type="submit" disabled={pending}>
          {pending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          Créer l'organisation
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.back()} disabled={pending}>Annuler</Button>
      </div>
    </form>
  );
}
