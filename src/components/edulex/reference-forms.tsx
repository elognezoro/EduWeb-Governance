"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
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

export function MinistryAdd({ countries }: { countries: C[] }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [countryId, setCountryId] = useState(countries[0]?.id ?? "");
  const { pending, error, run } = useAdd(() => createMinistry({ name, code: code || undefined, countryId }), () => { setName(""); setCode(""); });
  return (
    <form onSubmit={run} className="grid gap-2 sm:grid-cols-[1fr_120px_160px_auto]">
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nom du ministère" required />
      <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Code (MENA)" />
      <CountrySelect countries={countries} value={countryId} onChange={setCountryId} placeholder="Pays" />
      <Button type="submit" disabled={pending}>{pending ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />} Ajouter</Button>
      {error && <p className="text-sm font-medium text-danger-600 sm:col-span-4">{error}</p>}
    </form>
  );
}

export function SectorAdd({ countries }: { countries: C[] }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [countryId, setCountryId] = useState("");
  const { pending, error, run } = useAdd(() => createSector({ name, code: code || undefined, countryId: countryId || undefined }), () => { setName(""); setCode(""); });
  return (
    <form onSubmit={run} className="grid gap-2 sm:grid-cols-[1fr_120px_160px_auto]">
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nom du secteur" required />
      <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Code (EDU)" />
      <CountrySelect countries={countries} value={countryId} onChange={setCountryId} emptyLabel="Tous les pays" placeholder="Tous les pays" />
      <Button type="submit" disabled={pending}>{pending ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />} Ajouter</Button>
      {error && <p className="text-sm font-medium text-danger-600 sm:col-span-4">{error}</p>}
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
    <form onSubmit={run} className="grid gap-2 sm:grid-cols-[1fr_100px_80px_1fr_auto]">
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nom du pays" required />
      <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Code ISO" required />
      <Input value={flag} onChange={(e) => setFlag(e.target.value)} placeholder="🏳️" />
      <Input value={namespace} onChange={(e) => setNamespace(e.target.value)} placeholder="Namespace (EduLex XX)" />
      <Button type="submit" disabled={pending}>{pending ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />} Ajouter</Button>
      {error && <p className="text-sm font-medium text-danger-600 sm:col-span-5">{error}</p>}
    </form>
  );
}
