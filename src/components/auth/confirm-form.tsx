"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Loader2, CheckCircle2, AlertCircle, MailCheck, LogIn } from "lucide-react";
import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { confirmAccount, resendConfirmationEmail } from "@/app/(auth)/register/actions";

type Phase = "loading" | "success" | "error";

export function ConfirmForm({ token }: { token: string }) {
  const [phase, setPhase] = useState<Phase>(token ? "loading" : "error");
  const [message, setMessage] = useState<string>(token ? "" : "Lien de confirmation incomplet.");
  const [email, setEmail] = useState("");
  const [resent, setResent] = useState(false);
  const [resending, setResending] = useState(false);
  const ran = useRef(false);

  useEffect(() => {
    if (!token || ran.current) return;
    ran.current = true; // garde contre le double-appel (StrictMode) qui consommerait le jeton deux fois
    confirmAccount(token)
      .then((res) => {
        if (res.ok) setPhase("success");
        else { setPhase("error"); setMessage(res.error); }
      })
      .catch(() => { setPhase("error"); setMessage("Une erreur est survenue. Réessayez."); });
  }, [token]);

  async function resend(e: React.FormEvent) {
    e.preventDefault();
    setResending(true);
    try { await resendConfirmationEmail({ email }); setResent(true); }
    catch { /* réponse générique de toute façon */ setResent(true); }
    finally { setResending(false); }
  }

  if (phase === "loading") {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-card p-5 text-sm text-slate-600">
        <Loader2 className="size-5 shrink-0 animate-spin text-brand-700" /> Confirmation de votre compte en cours…
      </div>
    );
  }

  if (phase === "success") {
    return (
      <div className="rounded-3xl border border-brand-100 bg-brand-50 p-6 text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-brand-100">
          <CheckCircle2 className="size-6 text-brand-700" />
        </span>
        <h2 className="mt-4 text-lg font-bold text-institutional-900">Compte confirmé ✓</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Votre compte est désormais <strong>actif</strong>. Vous pouvez vous connecter.
        </p>
        <Link
          href="/login"
          className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-brand-700 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-800"
        >
          <LogIn className="size-4" /> Se connecter
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2 rounded-2xl border border-danger-100 bg-red-50 p-4 text-sm font-medium text-danger-600">
        <AlertCircle className="mt-0.5 size-5 shrink-0" />
        <span>{message || "Lien de confirmation invalide ou expiré."}</span>
      </div>
      {resent ? (
        <div className="flex items-start gap-2 rounded-2xl border border-brand-100 bg-brand-50 p-4 text-sm text-slate-600">
          <MailCheck className="mt-0.5 size-5 shrink-0 text-brand-700" />
          <span>Si un compte non confirmé correspond à cette adresse, un nouvel e-mail de confirmation vient d'être envoyé. Pensez à vérifier vos courriers indésirables.</span>
        </div>
      ) : (
        <form onSubmit={resend} className="space-y-2">
          <Label htmlFor="email">Recevoir un nouvel e-mail de confirmation</Label>
          <Input id="email" type="email" autoComplete="email" placeholder="vous@exemple.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Button type="submit" className="w-full" disabled={resending}>
            {resending ? <Loader2 className="size-4 animate-spin" /> : <MailCheck className="size-4" />} Renvoyer le lien
          </Button>
        </form>
      )}
    </div>
  );
}
