import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ShieldCheck, Scale, GraduationCap } from "lucide-react";
import { Brand } from "@/components/layout/brand";
import { LoginForm } from "@/components/auth/login-form";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = { title: "Connexion" };

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) redirect("/dashboard");

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Volet formulaire */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-sm">
          <Brand href="/" className="h-14 sm:h-16" />
          <h1 className="mt-10 text-3xl font-extrabold tracking-tight text-institutional-900">
            Bienvenue 👋
          </h1>
          <p className="mt-2 text-base text-slate-500">
            Connectez-vous pour accéder à votre espace de gouvernance.
          </p>
          <div className="mt-8">
            <LoginForm />
          </div>
          <p className="mt-8 text-center text-sm text-slate-400">
            Pas encore de compte ?{" "}
            <Link href="/register" className="font-semibold text-brand-700 hover:underline">
              Créer un compte
            </Link>
          </p>
        </div>
      </div>

      {/* Volet illustratif */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-institutional-900 via-brand-800 to-brand-700 lg:block">
        <div className="pointer-events-none absolute -right-24 top-0 size-[28rem] rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 size-96 rounded-full bg-gold-400/20 blur-3xl" />
        <div className="relative flex h-full flex-col items-center justify-center gap-10 px-10 py-12 text-white xl:gap-12 xl:px-16">
          {/* Logo imposant sur fond clair (lisible sur le dégradé) */}
          <div className="w-full max-w-xl rounded-[2.25rem] bg-card p-10 shadow-2xl ring-1 ring-white/30 xl:p-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="EduWeb Governance"
              className="mx-auto w-full max-w-lg object-contain"
            />
          </div>

          <h2 className="text-center text-4xl font-extrabold leading-tight tracking-tight xl:text-[2.75rem]">
            Une plateforme,<br />trois ambitions.
          </h2>

          <ul className="w-full max-w-xl space-y-5">
            {[
              { icon: ShieldCheck, title: "Gouvernance sécurisée", text: "Validation hiérarchique tracée, RBAC et audit complet." },
              { icon: Scale, title: "EduLex international", text: "Textes réglementaires par pays, codifiés et vérifiés V0→V4." },
              { icon: GraduationCap, title: "EduLex Academy", text: "Apprentissage ludique : parcours, quiz, XP et badges." },
            ].map((f) => {
              const Icon = f.icon;
              return (
                <li key={f.title} className="flex items-center gap-4">
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                    <Icon className="size-6" />
                  </span>
                  <div>
                    <p className="text-lg font-bold">{f.title}</p>
                    <p className="text-[15px] opacity-80">{f.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
