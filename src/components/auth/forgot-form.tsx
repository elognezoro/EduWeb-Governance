"use client";

import { useState, useTransition } from "react";
import { Loader2, AlertCircle, CheckCircle2, Send } from "lucide-react";
import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { requestPasswordReset } from "@/app/(auth)/password-actions";

export function ForgotForm() {
  const [email, setEmail] = useState("");
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    start(async () => {
      const res = await requestPasswordReset({ email });
      if (res.ok) setSent(true);
      else setError(res.error);
    });
  }

  if (sent) {
    return (
      <div className="flex items-start gap-2 rounded-2xl border border-brand-100 bg-brand-50/60 p-4 text-sm text-ink">
        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-600" />
        <span>
          Si un compte existe pour <b>{email}</b>, un lien de réinitialisation vient d'être envoyé.
          Vérifiez votre boîte de réception (et le dossier spam). Le lien est valable 1&nbsp;heure.
        </span>
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
        <Label htmlFor="email">Adresse e-mail</Label>
        <Input id="email" type="email" autoComplete="email" placeholder="vous@institution.gouv" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />} Envoyer le lien
      </Button>
    </form>
  );
}
