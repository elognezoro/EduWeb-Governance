"use client";

import { useState } from "react";
import Link from "next/link";
import { UserPlus, Loader2, AlertCircle, MailCheck, LogIn } from "lucide-react";
import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CountrySelect, type CountryOpt } from "@/components/ui/country-select";
import { registerAccount } from "@/app/(auth)/register/actions";

export function RegisterForm({ countries, defaultCountryId = "", defaultRef = "" }: { countries: CountryOpt[]; defaultCountryId?: string; defaultRef?: string }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [countryId, setCountryId] = useState(defaultCountryId);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!countryId) { setError("Veuillez indiquer votre pays."); return; }
    if (password.length < 8) { setError("Le mot de passe doit comporter au moins 8 caractères."); return; }
    if (password !== confirm) { setError("Les mots de passe ne correspondent pas."); return; }

    setLoading(true);
    try {
      const res = await registerAccount({ firstName, lastName, email, password, countryId, phone, ref: defaultRef });
      if (!res.ok) { setError(res.error); return; }
      setDone(true);
    } catch {
      setError("Une erreur est survenue. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-3xl border border-brand-100 bg-brand-50 p-6 text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-brand-100">
          <MailCheck className="size-6 text-brand-700" />
        </span>
        <h2 className="mt-4 text-lg font-bold text-institutional-900">Compte créé 🎉</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Votre compte est <strong>en attente de validation</strong> par un administrateur.
          Vous pourrez vous connecter dès qu'il aura été activé.
        </p>
        <Link
          href="/login"
          className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-brand-700 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-800"
        >
          <LogIn className="size-4" /> Aller à la connexion
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 rounded-2xl border border-danger-100 bg-red-50 px-4 py-3 text-sm font-medium text-danger-600">
          <AlertCircle className="size-4 shrink-0" />
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">Prénom</Label>
          <Input id="firstName" autoComplete="given-name" placeholder="Awa" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Nom</Label>
          <Input id="lastName" autoComplete="family-name" placeholder="Koné" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Adresse e-mail</Label>
        <Input id="email" type="email" autoComplete="email" placeholder="vous@exemple.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="country">Pays</Label>
        <CountrySelect id="country" countries={countries} value={countryId} onChange={setCountryId} placeholder="— Indiquez votre pays —" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">
          Téléphone <span className="font-normal text-slate-400">(facultatif)</span>
        </Label>
        <Input id="phone" type="tel" autoComplete="tel" placeholder="+225 0700000000" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="password">Mot de passe</Label>
          <Input id="password" type="password" autoComplete="new-password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm">Confirmer</Label>
          <Input id="confirm" type="password" autoComplete="new-password" placeholder="••••••••" value={confirm} onChange={(e) => setConfirm(e.target.value)} required minLength={8} />
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? <Loader2 className="size-4 animate-spin" /> : <UserPlus className="size-4" />}
        Créer mon compte
      </Button>
    </form>
  );
}
