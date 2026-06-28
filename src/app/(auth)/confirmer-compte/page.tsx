import type { Metadata } from "next";
import Link from "next/link";
import { Brand } from "@/components/layout/brand";
import { ConfirmForm } from "@/components/auth/confirm-form";

export const metadata: Metadata = { title: "Confirmation de compte" };

export default async function ConfirmAccountPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-6 py-12">
      <div className="w-full max-w-sm">
        <Brand href="/" className="h-12" />
        <h1 className="mt-8 text-2xl font-extrabold tracking-tight text-institutional-900">Confirmation de compte</h1>
        <p className="mt-2 text-sm text-slate-500">Activation de votre compte EduWeb Governance.</p>
        <div className="mt-6">
          <ConfirmForm token={token ?? ""} />
        </div>
        <p className="mt-6 text-center text-sm text-slate-400">
          <Link href="/login" className="font-semibold text-brand-700 hover:underline">← Retour à la connexion</Link>
        </p>
      </div>
    </div>
  );
}
