"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Loader2, AlertCircle, CheckCircle2, KeyRound, LogIn } from "lucide-react";
import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { resetPassword } from "@/app/(auth)/password-actions";

export function ResetForm({ token }: { token: string }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password.length < 8) return setError("Mot de passe d'au moins 8 caractères requis.");
    if (password !== confirm) return setError("Les deux mots de passe ne correspondent pas.");
    start(async () => {
      const res = await resetPassword({ token, password });
      if (res.ok) setDone(true);
      else setError(res.error);
    });
  }

  if (done) {
    return (
      <div className="space-y-4">
        <div className="flex items-start gap-2 rounded-2xl border border-brand-100 bg-brand-50/60 p-4 text-sm text-ink">
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-600" />
          <span>Votre mot de passe a été mis à jour. Vous pouvez maintenant vous connecter.</span>
        </div>
        <Link href="/login" className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-brand-700 px-5 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-brand-800">
          <LogIn className="size-4" /> Se connecter
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 rounded-2xl border border-danger-100 bg-red-50 px-4 py-3 text-sm font-medium text-danger-600">
          <AlertCircle className="size-4 shrink-0" /> {error}
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="pw">Nouveau mot de passe <span className="font-normal text-slate-400">(min. 8 caractères)</span></Label>
        <Input id="pw" type="password" autoComplete="new-password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="pw2">Confirmer le mot de passe</Label>
        <Input id="pw2" type="password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? <Loader2 className="size-4 animate-spin" /> : <KeyRound className="size-4" />} Réinitialiser le mot de passe
      </Button>
    </form>
  );
}
