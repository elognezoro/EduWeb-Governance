import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Upload, Globe2, ShieldCheck, GraduationCap, Gift } from "lucide-react";
import { Brand } from "@/components/layout/brand";
import { RegisterForm } from "@/components/auth/register-form";
import { getCurrentUser } from "@/lib/auth";
import { getCountries, getSelectedCountryCode } from "@/lib/country";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Créer un compte" };

export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ pays?: string; ref?: string }> }) {
  const user = await getCurrentUser();
  if (user) redirect("/dashboard");

  const sp = await searchParams;
  const countries = await getCountries();
  const opts = countries.map((c) => ({ id: c.id, name: c.name, code: c.code, namespace: c.namespace }));

  // Pré-sélection du pays : paramètre ?pays=CODE, sinon contexte EduLex (cookie).
  const cookieCode = await getSelectedCountryCode();
  const presetCode = sp.pays?.trim().toUpperCase() || (cookieCode && cookieCode !== "ALL" ? cookieCode : undefined);
  const preset = presetCode ? countries.find((c) => c.code.toUpperCase() === presetCode) : undefined;
  const defaultCountryId = preset?.id ?? "";
  const presetLabel = preset?.namespace || preset?.name;

  // Code promo / parrainage : ?ref=CODE → on retrouve le parrain (agent commercial).
  const refCode = sp.ref?.trim().toUpperCase() || "";
  const sponsor = refCode
    ? await prisma.user.findUnique({ where: { referralCode: refCode }, select: { firstName: true, lastName: true } })
    : null;

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Volet formulaire */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-md">
          <Brand href="/" className="h-14 sm:h-16" />
          <h1 className="mt-8 text-3xl font-extrabold tracking-tight text-institutional-900">
            Créer un compte{presetLabel ? <> — <span className="text-brand-700">{presetLabel}</span></> : ""}
          </h1>
          <p className="mt-2 text-base text-slate-500">
            Rejoignez EduWeb Governance.{" "}
            {presetLabel
              ? "Votre pays est pré-renseigné — vous pouvez le modifier."
              : "Indiquez votre pays pour adapter votre espace."}
          </p>

          {refCode && (
            <div className="mt-5 flex items-center gap-2 rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-700">
              <Gift className="size-4 shrink-0" />
              <span>
                Code promo <strong className="font-mono">{refCode}</strong> appliqué
                {sponsor ? <> — invitation de {sponsor.firstName} {sponsor.lastName}</> : null}.
              </span>
            </div>
          )}

          <div className="mt-6">
            <RegisterForm countries={opts} defaultCountryId={defaultCountryId} defaultRef={refCode} />
          </div>

          {/* Inscription par cohorte (CSV) — réservée aux administrateurs */}
          <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Upload className="size-4 text-brand-600" /> Inscription par cohorte (CSV)
            </p>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              L'enregistrement groupé d'une cohorte par dépôt de fichier CSV est réservé aux
              administrateurs, depuis l'espace Utilisateurs.{" "}
              <Link href="/users/import" className="font-semibold text-brand-700 hover:underline">
                Accéder à l'import (administrateur)
              </Link>
              .
            </p>
          </div>

          <p className="mt-6 text-center text-sm text-slate-400">
            Déjà un compte ?{" "}
            <Link href="/login" className="font-semibold text-brand-700 hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>

      {/* Volet illustratif */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-institutional-900 via-brand-800 to-brand-700 lg:block">
        <div className="pointer-events-none absolute -right-24 top-0 size-[28rem] rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 size-96 rounded-full bg-gold-400/20 blur-3xl" />
        <div className="relative flex h-full flex-col justify-center gap-10 px-10 py-12 text-white xl:px-16">
          <h2 className="text-4xl font-extrabold leading-tight tracking-tight xl:text-[2.75rem]">
            Bienvenue dans une<br />gouvernance maîtrisée.
          </h2>
          <ul className="w-full max-w-xl space-y-5">
            {[
              { icon: Globe2, title: "Votre pays au cœur de l'espace", text: "Textes et contenus adaptés à votre pays dès l'inscription." },
              { icon: ShieldCheck, title: "Comptes validés", text: "Chaque inscription est vérifiée par un administrateur avant activation." },
              { icon: GraduationCap, title: "EduLex Academy", text: "Apprenez les textes et progressez par défis, parcours et badges." },
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
