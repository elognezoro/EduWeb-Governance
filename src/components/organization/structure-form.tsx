"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle, Save, Trash2 } from "lucide-react";
import { Input, Label } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { CountrySelect } from "@/components/ui/country-select";
import { SearchSelect } from "@/components/ui/search-select";
import { Button } from "@/components/ui/button";
import { STRUCTURE_TYPES } from "@/lib/enums";
import { createStructure, updateStructure, deleteStructure, regionsForCountryId, type StructureInput } from "@/app/(app)/organization/actions";

interface Opt { id: string; name: string }

export interface StructureFormInitial {
  id: string;
  name: string;
  type: string;
  organizationId: string;
  parentId: string | null;
  ministryId: string | null;
  countryId: string | null;
  regionId: string | null;
  managerId: string | null;
}

export function StructureForm({
  organizations,
  structures,
  countries,
  ministries,
  managers,
  initial,
}: {
  organizations: Opt[];
  structures: Opt[];
  countries: { id: string; name: string; code: string }[];
  ministries: Opt[];
  managers: Opt[];
  initial?: StructureFormInitial;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);

  const [name, setName] = useState(initial?.name ?? "");
  const [type, setType] = useState(initial?.type ?? "");
  const [organizationId, setOrganizationId] = useState(initial?.organizationId ?? organizations[0]?.id ?? "");
  const [parentId, setParentId] = useState(initial?.parentId ?? "");
  const [ministryId, setMinistryId] = useState(initial?.ministryId ?? "");
  const [countryId, setCountryId] = useState(initial?.countryId ?? "");
  const [regionId, setRegionId] = useState(initial?.regionId ?? "");
  const [regions, setRegions] = useState<Opt[]>([]);
  const [regionsLoading, setRegionsLoading] = useState(false);
  const [managerId, setManagerId] = useState(initial?.managerId ?? "");
  const firstLoad = useRef(true);

  // Charge les subdivisions du pays choisi ; réinitialise la subdivision en cas de changement de pays.
  useEffect(() => {
    let active = true;
    if (!countryId) {
      setRegions([]);
      if (!firstLoad.current) setRegionId("");
      firstLoad.current = false;
      return;
    }
    setRegionsLoading(true);
    regionsForCountryId(countryId).then((rs) => {
      if (!active) return;
      setRegions(rs);
      setRegionsLoading(false);
      if (!firstLoad.current) setRegionId("");
      firstLoad.current = false;
    });
    return () => { active = false; };
  }, [countryId]);

  const parentOptions = structures.filter((s) => s.id !== initial?.id);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const payload: StructureInput = {
      name, type, organizationId,
      parentId: parentId || undefined,
      ministryId: ministryId || undefined,
      countryId: countryId || undefined,
      regionId: regionId || undefined,
      managerId: managerId || undefined,
    };
    startTransition(async () => {
      const res = initial ? await updateStructure(initial.id, payload) : await createStructure(payload);
      if (res && !res.ok) setError(res.error);
      else if (initial && res?.ok) { router.push("/organization"); router.refresh(); }
    });
  }

  function remove() {
    startTransition(async () => {
      const res = await deleteStructure(initial!.id);
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

      <div className="space-y-2">
        <Label htmlFor="name">Nom de la structure *</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex. Service de la Formation Continue" required />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="type">Type *</Label>
          <Select id="type" value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="">— Choisir —</option>
            {STRUCTURE_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="org">Organisation *</Label>
          <Select id="org" value={organizationId} onChange={(e) => setOrganizationId(e.target.value)} required>
            {organizations.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="parent">Structure parente</Label>
          <Select id="parent" value={parentId} onChange={(e) => setParentId(e.target.value)}>
            <option value="">— Aucune (racine) —</option>
            {parentOptions.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="min">Ministère de rattachement <span className="font-normal text-slate-400">(chaîne hiérarchique)</span></Label>
          <SearchSelect
            id="min"
            value={ministryId}
            onChange={setMinistryId}
            options={ministries.map((m) => ({ value: m.id, label: m.name }))}
            emptyLabel="—"
            placeholder="— Aucun —"
            searchPlaceholder="Rechercher un ministère…"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cty">Pays</Label>
          <CountrySelect id="cty" value={countryId} onChange={setCountryId} countries={countries} emptyLabel="—" placeholder="— Pays —" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="reg">Subdivision / région</Label>
          <Select id="reg" value={regionId} onChange={(e) => setRegionId(e.target.value)} disabled={!countryId || regionsLoading}>
            <option value="">
              {!countryId ? "— Choisir un pays d'abord —" : regionsLoading ? "Chargement…" : regions.length ? "— Aucune —" : "Aucune subdivision disponible"}
            </option>
            {regions.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="mgr">Responsable</Label>
          <Select id="mgr" value={managerId} onChange={(e) => setManagerId(e.target.value)}>
            <option value="">—</option>
            {managers.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5">
        <Button type="submit" disabled={pending}>
          {pending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          {initial ? "Enregistrer" : "Créer la structure"}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.back()} disabled={pending}>Annuler</Button>
        {initial && (
          <div className="ml-auto">
            {!confirming ? (
              <Button type="button" variant="ghost" onClick={() => setConfirming(true)} className="text-danger-500 hover:bg-red-50">
                <Trash2 className="size-4" /> Supprimer
              </Button>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-2xl bg-red-50 px-3 py-1.5 text-sm">
                <span className="font-medium text-danger-600">Confirmer ?</span>
                <button type="button" onClick={remove} disabled={pending} className="font-bold text-danger-600 hover:underline">Oui</button>
                <button type="button" onClick={() => setConfirming(false)} className="text-slate-500 hover:underline">Non</button>
              </span>
            )}
          </div>
        )}
      </div>
    </form>
  );
}
