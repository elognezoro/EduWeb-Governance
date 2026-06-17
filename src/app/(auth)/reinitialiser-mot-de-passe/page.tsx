import type { Metadata } from "next";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Brand } from "@/components/layout/brand";
import { peekResetToken } from "@/lib/password-reset";
import { ResetForm } from "@/components/auth/reset-form";

export const metadata: Metadata = { title: "Nouveau mot de passe" };

export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  const valid = token ? await peekResetToken(token) : null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-6 py-12">
      <div className="w-full max-w-sm">
        <Brand href="/" className="h-12" />
        <h1 className="mt-8 text-2xl font-extrabold tracking-tight text-institutional-900">Nouveau mot de passe</h1>

        {token && valid ? (
          <>
            <p className="mt-2 text-sm text-slate-500">Choisissez un nouveau mot de passe pour votre compte.</p>
            <div className="mt-6">
              <ResetForm token={token} />
            </div>
          </>
        ) : (
          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-2 rounded-2xl border border-danger-100 bg-red-50 p-4 text-sm font-medium text-danger-600">
              <AlertCircle className="mt-0.5 size-5 shrink-0" />
              <span>Ce lien de réinitialisation est invalide ou a expiré (il est valable 1&nbsp;heure et à usage unique).</span>
            </div>
            <Link href="/mot-de-passe-oublie" className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-card px-5 text-sm font-semibold text-ink transition-colors hover:bg-slate-50">
              Refaire une demande
            </Link>
          </div>
        )}

        <p className="mt-6 text-center text-sm text-slate-400">
          <Link href="/login" className="font-semibold text-brand-700 hover:underline">← Retour à la connexion</Link>
        </p>
      </div>
    </div>
  );
}
