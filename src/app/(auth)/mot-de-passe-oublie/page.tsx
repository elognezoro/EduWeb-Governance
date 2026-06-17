import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Brand } from "@/components/layout/brand";
import { getCurrentUser } from "@/lib/auth";
import { ForgotForm } from "@/components/auth/forgot-form";

export const metadata: Metadata = { title: "Mot de passe oublié" };

export default async function ForgotPasswordPage() {
  if (await getCurrentUser()) redirect("/dashboard");

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-6 py-12">
      <div className="w-full max-w-sm">
        <Brand href="/" className="h-12" />
        <h1 className="mt-8 text-2xl font-extrabold tracking-tight text-institutional-900">Mot de passe oublié</h1>
        <p className="mt-2 text-sm text-slate-500">
          Saisissez votre adresse e-mail : si un compte y est associé, vous recevrez un lien pour définir un nouveau mot de passe.
        </p>
        <div className="mt-6">
          <ForgotForm />
        </div>
        <p className="mt-6 text-center text-sm text-slate-400">
          <Link href="/login" className="font-semibold text-brand-700 hover:underline">← Retour à la connexion</Link>
        </p>
      </div>
    </div>
  );
}
