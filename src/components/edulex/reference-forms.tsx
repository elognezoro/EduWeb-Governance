"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Loader2, AlertCircle } from "lucide-react";
import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CountrySelect } from "@/components/ui/country-select";
import { createMinistry, createSector, createCountry } from "@/app/(app)/edulex/reference-actions";

interface C { id: string; name: string; code: string }

function useAdd(fn: () => Promise<{ ok: boolean; error?: string }>, reset: () => void) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const run = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    start(async () => {
      const res = await fn();
      if (!res.ok) setError(res.error ?? "Erreur.");
      else { reset(); router.refresh(); }
    });
  };
  return { pending, error, run };
}

function ErrBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-danger-100 bg-red-50 px-4 py-3 text-sm font-medium text-danger-600">
      <AlertCircle className="size-4 shrink-0" /> {children}
    </div>
  );
}

const fieldGrid = "grid gap-3 sm:grid-cols-2";
const field = "space-y-1.5";
const submitBtn = "w-full sm:w-auto";

export function MinistryAdd({ countries }: { countries: C[] }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [countryId, setCountryId] = useState(countries[0]?.id ?? "");
  const { pending, error, run } = useAdd(() => createMinistry({ name, code: code || undefined, countryId }), () => { setName(""); setCode(""); });
  return (
    <form onSubmit={run} className="space-y-3">
      {error && <ErrBox>{error}</ErrBox>}
      <div className={fieldGrid}>
        <div className={`${field} sm:col-span-2`}>
          <Label htmlFor="min-name">Nom du ministère</Label>
          <Input id="min-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="ex. Ministère de l'Éducation nationale" required />
        </div>
        <div className={field}>
          <Label htmlFor="min-code">Code</Label>
          <Input id="min-code" value={code} onChange={(e) => setCode(e.target.value)} placeholder="ex. MENA" />
        </div>
        <div className={field}>
          <Label>Pays</Label>
          <CountrySelect countries={countries} value={countryId} onChange={setCountryId} placeholder="Pays" />
        </div>
      </div>
      <Button type="submit" disabled={pending} className={submitBtn}>
        {pending ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />} Ajouter le ministère
      </Button>
    </form>
  );
}

export function SectorAdd({ countries }: { countries: C[] }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [countryId, setCountryId] = useState("");
  const { pending, error, run } = useAdd(() => createSector({ name, code: code || undefined, countryId: countryId || undefined }), () => { setName(""); setCode(""); });
  return (
    <form onSubmit={run} className="space-y-3">
      {error && <ErrBox>{error}</ErrBox>}
      <div className={fieldGrid}>
        <div className={`${field} sm:col-span-2`}>
          <Label htmlFor="sec-name">Nom du secteur</Label>
          <Input id="sec-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="ex. Éducation et formation" required />
        </div>
        <div className={field}>
          <Label htmlFor="sec-code">Code</Label>
          <Input id="sec-code" value={code} onChange={(e) => setCode(e.target.value)} placeholder="ex. EDU" />
        </div>
        <div className={field}>
          <Label>Pays</Label>
          <CountrySelect countries={countries} value={countryId} onChange={setCountryId} emptyLabel="Tous les pays" placeholder="Tous les pays" />
        </div>
      </div>
      <Button type="submit" disabled={pending} className={submitBtn}>
        {pending ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />} Ajouter le secteur
      </Button>
    </form>
  );
}

export function CountryAdd() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [flag, setFlag] = useState("");
  const [namespace, setNamespace] = useState("");
  const { pending, error, run } = useAdd(() => createCountry({ name, code, flag: flag || undefined, namespace: namespace || undefined }), () => { setName(""); setCode(""); setFlag(""); setNamespace(""); });
  return (
    <form onSubmit={run} className="space-y-3">
      {error && <ErrBox>{error}</ErrBox>}
      <div className={fieldGrid}>
        <div className={`${field} sm:col-span-2`}>
          <Label htmlFor="cty-name">Nom du pays</Label>
          <Input id="cty-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="ex. Côte d'Ivoire" required />
        </div>
        <div className={field}>
          <Label htmlFor="cty-code">Code ISO</Label>
          <Input id="cty-code" value={code} onChange={(e) => setCode(e.target.value)} placeholder="ex. CI" required />
        </div>
        <div className={field}>
          <Label htmlFor="cty-flag">Drapeau (emoji)</Label>
          <Input id="cty-flag" value={flag} onChange={(e) => setFlag(e.target.value)} placeholder="🇨🇮" />
        </div>
        <div className={`${field} sm:col-span-2`}>
          <Label htmlFor="cty-ns">Namespace</Label>
          <Input id="cty-ns" value={namespace} onChange={(e) => setNamespace(e.target.value)} placeholder="ex. EduLex CI" />
        </div>
      </div>
      <Button type="submit" disabled={pending} className={submitBtn}>
        {pending ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />} Ajouter le pays
      </Button>
    </form>
  );
}
