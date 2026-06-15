import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, ArrowRight, AlertTriangle, ShieldAlert } from "lucide-react";
import { requireUser, hasPermission } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getSelectedCountryCode } from "@/lib/country";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { VerificationBadge } from "@/components/ui/verification-badge";
import { Flag } from "@/components/ui/flag";
import { EmptyState } from "@/components/ui/empty-state";
import { LEGAL_STATUS_MAP } from "@/lib/enums";

export const metadata: Metadata = { title: "Validation EduLex" };

export default async function EduLexValidationPage() {
  const user = await requireUser();
  const canValidate = hasPermission(user, "edulex:validate");
  const code = await getSelectedCountryCode();

  let countryId: string | undefined;
  if (code !== "ALL") {
    const c = await prisma.country.findUnique({ where: { code } });
    countryId = c?.id;
  }

  const where = {
    deletedAt: null,
    ...(countryId ? { countryId } : {}),
    OR: [
      { status: { in: ["PENDING", "TO_VERIFY", "IMPORTED_UNVERIFIED", "DRAFT"] } },
      { verificationLevel: { in: ["V0", "V1", "V2"] } },
    ],
  };

  const [texts, v0Count] = await Promise.all([
    prisma.legalText.findMany({ where, orderBy: { updatedAt: "desc" }, include: { country: true }, take: 100 }),
    prisma.legalText.count({ where: { deletedAt: null, verificationLevel: "V0", ...(countryId ? { countryId } : {}) } }),
  ]);

  return (
    <div className="space-y-7">
      <PageHeader title="Validation EduLex" description="Textes à vérifier et à faire progresser dans le circuit V0 → V4." icon={ShieldCheck} />

      {!canValidate && (
        <div className="flex items-start gap-3 rounded-3xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <ShieldAlert className="mt-0.5 size-5 shrink-0" />
          <p>Votre profil n'a pas la permission <code>edulex:validate</code>. Vous pouvez consulter la file mais pas statuer.</p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Card><CardContent className="flex items-center gap-3 p-5">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-gold-100 text-gold-600"><ShieldCheck className="size-5" /></span>
          <div><p className="text-2xl font-extrabold text-institutional-900">{texts.length}</p><p className="text-sm text-slate-500">Textes à traiter</p></div>
        </CardContent></Card>
        <Card><CardContent className="flex items-center gap-3 p-5">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-red-50 text-danger-500"><AlertTriangle className="size-5" /></span>
          <div><p className="text-2xl font-extrabold text-institutional-900">{v0Count}</p><p className="text-sm text-slate-500">Non vérifiés (V0)</p></div>
        </CardContent></Card>
      </div>

      {texts.length ? (
        <div className="space-y-3">
          {texts.map((t) => (
            <Link key={t.id} href={`/edulex/texts/${t.id}`} className="flex items-center gap-4 rounded-3xl border border-slate-100 bg-card p-4 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-glow">
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-ink">{t.title}</p>
                <p className="inline-flex items-center gap-1.5 font-mono text-[11px] text-slate-400">{t.code} · <Flag code={t.country.code} className="w-4" /> {t.country.name}</p>
              </div>
              <StatusBadge value={t.status} map={LEGAL_STATUS_MAP} />
              <VerificationBadge level={t.verificationLevel} />
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700">Examiner <ArrowRight className="size-4" /></span>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState icon={ShieldCheck} title="File vide" description="Aucun texte en attente de vérification sur ce périmètre." />
      )}
    </div>
  );
}
