"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle, Save } from "lucide-react";
import { Input, Label } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { SearchSelect } from "@/components/ui/search-select";
import { CountrySelect } from "@/components/ui/country-select";
import { Button } from "@/components/ui/button";
import { createUser, updateUser, type UserInput } from "@/app/(app)/users/actions";

interface Opt { id: string; name: string }
interface RoleOpt { id: string; name: string; scope: string }

const SCOPE_LABELS: Record<string, string> = {
  SYSTEM: "Système",
  GOVERNANCE: "Gouvernance",
  EDULEX: "EduLex",
  ACADEMY: "Academy",
};

export interface UserFormInitial {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organizationId: string | null;
  structureId: string | null;
  countryId: string | null;
  ministryId: string | null;
  roleIds: string[];
}

export function UserForm({
  roles,
  organizations,
  structures,
  countries,
  ministries,
  initial,
}: {
  roles: RoleOpt[];
  organizations: Opt[];
  structures: Opt[];
  countries: { id: string; name: string; code: string }[];
  ministries: Opt[];
  initial?: UserFormInitial;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [firstName, setFirstName] = useState(initial?.firstName ?? "");
  const [lastName, setLastName] = useState(initial?.lastName ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");
  const [phone, setPhone] = useState(initial?.phone ?? "");
  const [password, setPassword] = useState("");
  const [organizationId, setOrganizationId] = useState(initial?.organizationId ?? "");
  const [structureId, setStructureId] = useState(initial?.structureId ?? "");
  const [countryId, setCountryId] = useState(initial?.countryId ?? "");
  const [ministryId, setMinistryId] = useState(initial?.ministryId ?? "");
  const [roleIds, setRoleIds] = useState<Set<string>>(new Set(initial?.roleIds ?? []));

  function toggleRole(id: string) {
    setRoleIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const grouped = ["SYSTEM", "GOVERNANCE", "EDULEX", "ACADEMY"].map((scope) => ({
    scope,
    items: roles.filter((r) => r.scope === scope),
  }));

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const payload: UserInput = {
      firstName, lastName, email, phone: phone || undefined,
      organizationId: organizationId || undefined,
      structureId: structureId || undefined,
      countryId: countryId || undefined,
      ministryId: ministryId || undefined,
      roleIds: [...roleIds],
      password: initial ? undefined : password,
    };
    startTransition(async () => {
      const res = initial ? await updateUser(initial.id, payload) : await createUser(payload);
      if (res && !res.ok) setError(res.error);
      else if (initial && res?.ok) {
        router.push(`/users/${initial.id}`);
        router.refresh();
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {error && (
        <div className="flex items-center gap-2 rounded-2xl border border-danger-100 bg-red-50 px-4 py-3 text-sm font-medium text-danger-600">
          <AlertCircle className="size-4 shrink-0" /> {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2"><Label htmlFor="fn">Prénom *</Label><Input id="fn" value={firstName} onChange={(e) => setFirstName(e.target.value)} required /></div>
        <div className="space-y-2"><Label htmlFor="ln">Nom *</Label><Input id="ln" value={lastName} onChange={(e) => setLastName(e.target.value)} required /></div>
        <div className="space-y-2"><Label htmlFor="em">E-mail *</Label><Input id="em" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
        <div className="space-y-2"><Label htmlFor="ph">Téléphone</Label><Input id="ph" value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
        {!initial && (
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="pw">Mot de passe initial * <span className="font-normal text-slate-400">(min. 8 caractères)</span></Label>
            <Input id="pw" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
          </div>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="org">Organisation</Label>
          <Select id="org" value={organizationId} onChange={(e) => setOrganizationId(e.target.value)}>
            <option value="">—</option>
            {organizations.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="str">Structure</Label>
          <Select id="str" value={structureId} onChange={(e) => setStructureId(e.target.value)}>
            <option value="">—</option>
            {structures.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="cty">Pays</Label>
          <CountrySelect id="cty" value={countryId} onChange={setCountryId} countries={countries} emptyLabel="—" placeholder="— Pays —" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="min">Ministère</Label>
          <SearchSelect
            id="min"
            value={ministryId}
            onChange={setMinistryId}
            options={ministries.map((o) => ({ value: o.id, label: o.name }))}
            emptyLabel="—"
            placeholder="— Sélectionner un ministère —"
            searchPlaceholder="Rechercher un ministère…"
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label>Rôles *</Label>
        <div className="grid gap-4 sm:grid-cols-2">
          {grouped.filter((g) => g.items.length > 0).map((g) => (
            <div key={g.scope} className="rounded-2xl border border-slate-100 p-3">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">{SCOPE_LABELS[g.scope]}</p>
              <div className="space-y-1.5">
                {g.items.map((r) => (
                  <label key={r.id} className="flex cursor-pointer items-center gap-2.5 rounded-xl px-2 py-1.5 hover:bg-slate-50">
                    <input type="checkbox" checked={roleIds.has(r.id)} onChange={() => toggleRole(r.id)} className="size-4 rounded border-slate-300 text-brand-600 focus:ring-brand-600" />
                    <span className="text-sm text-ink">{r.name}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-slate-100 pt-5">
        <Button type="submit" disabled={pending}>
          {pending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          {initial ? "Enregistrer" : "Créer l'utilisateur"}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.back()} disabled={pending}>Annuler</Button>
      </div>
    </form>
  );
}
