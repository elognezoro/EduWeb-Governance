import type { Metadata } from "next";
import Link from "next/link";
import { Scale, Search, Plus, Globe2, ShieldCheck, AlertTriangle, FileCheck2, Filter } from "lucide-react";
import { requireUser, hasPermission } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getSelectedCountryCode } from "@/lib/country";
import { PageHeader } from "@/components/layout/page-header";
import { KPICard } from "@/components/dashboard/kpi-card";
import { LegalTextCard } from "@/components/edulex/legal-text-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Select } from "@/components/ui/select";
import { Button, buttonVariants } from "@/components/ui/button";
import { LEGAL_STATUS, LEGAL_TYPE, VERIFICATION_LEVEL } from "@/lib/enums";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "EduLex" };

export default async function EduLexPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; type?: string; level?: string; category?: string }>;
}) {
  const user = await requireUser();
  const { q, status, type, level, category } = await searchParams;
  const code = await getSelectedCountryCode();

  const canCreate = hasPermission(user, "edulex:create");
  const canValidate = hasPermission(user, "edulex:validate");
  const canManage = hasPermission(user, "edulex:manage");

  let countryId: string | undefined;
  let countryLabel = "tous les pays";
  if (code !== "ALL") {
    const c = await prisma.country.findUnique({ where: { code } });
    countryId = c?.id;
    countryLabel = c?.namespace || c?.name || code;
  }

  const baseScope = { deletedAt: null, ...(countryId ? { countryId } : {}) };
  const where = {
    ...baseScope,
    ...(status ? { status } : {}),
    ...(type ? { type } : {}),
    ...(level ? { verificationLevel: level } : {}),
    ...(category ? { categoryId: category } : {}),
    ...(q
      ? {
          OR: [
            { title: { contains: q } },
            { code: { contains: q } },
            { officialNumber: { contains: q } },
            { summary: { contains: q } },
            { tags: { some: { name: { contains: q } } } },
          ],
        }
      : {}),
  };

  const categories = await prisma.legalTextCategory.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } });

  const [texts, total, inForce, toVerify, certified] = await Promise.all([
    prisma.legalText.findMany({ where, orderBy: { updatedAt: "desc" }, take: 48, include: { country: true } }),
    prisma.legalText.count({ where: baseScope }),
    prisma.legalText.count({ where: { ...baseScope, status: "IN_FORCE" } }),
    prisma.legalText.count({ where: { ...baseScope, OR: [{ status: "TO_VERIFY" }, { verificationLevel: "V0" }] } }),
    prisma.legalText.count({ where: { ...baseScope, verificationLevel: "V4" } }),
  ]);

  const hasFilters = Boolean(q || status || type || level || category);

  return (
    <div className="space-y-7">
      <PageHeader
        title="EduLex — référentiel réglementaire"
        description={`Référentiel international · ${countryLabel}. Filtre pays dans la barre supérieure.`}
        icon={Scale}
        actions={
          <div className="flex gap-2">
            {canValidate && (
              <Link href="/edulex/validation" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
                <ShieldCheck className="size-4" /> File de validation
              </Link>
            )}
            {canCreate && (
              <Link href="/edulex/texts/new" className={cn(buttonVariants({ variant: "primary", size: "sm" }))}>
                <Plus className="size-4" /> Déposer un texte
              </Link>
            )}
          </div>
        }
      />

      <div className="flex items-start gap-3 rounded-3xl border border-institutional-100 bg-institutional-50/60 p-4">
        <Globe2 className="mt-0.5 size-5 shrink-0 text-institutional-700" />
        <p className="text-sm text-institutional-900">
          <strong>EduLex est international par conception.</strong> Chaque texte est rattaché à un pays,
          une juridiction et un niveau de vérification. <em>EduLex CI</em> n'est qu'une déclinaison nationale.
          Les textes <strong>V0</strong> (non vérifiés) et non en vigueur sont signalés.
        </p>
      </div>

      {(canManage || canCreate) && (
        <div className="flex flex-wrap gap-2">
          {[
            { href: "/edulex/countries", label: "Pays", show: canManage },
            { href: "/edulex/ministries", label: "Ministères", show: canManage },
            { href: "/edulex/sectors", label: "Secteurs", show: canManage },
            { href: "/edulex/import", label: "Import d'amorçage", show: canCreate || canManage },
          ].filter((l) => l.show).map((l) => (
            <Link key={l.href} href={l.href} className="rounded-2xl border border-slate-200 bg-card px-3.5 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:border-brand-200 hover:text-brand-700">
              {l.label}
            </Link>
          ))}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KPICard label="Textes au total" value={total} icon={Scale} tone="info" />
        <KPICard label="En vigueur" value={inForce} icon={FileCheck2} tone="brand" />
        <KPICard label="À vérifier (V0 / à vérifier)" value={toVerify} icon={AlertTriangle} tone="danger" />
        <KPICard label="Certifiés V4" value={certified} icon={ShieldCheck} tone="gold" />
      </div>

      {/* Recherche avancée */}
      <form action="/edulex" className="rounded-3xl border border-slate-100 bg-card p-4 shadow-card">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            name="q"
            defaultValue={q ?? ""}
            placeholder="Rechercher par mot-clé : titre, code, numéro officiel, résumé…"
            className="h-11 w-full rounded-2xl border border-slate-200 bg-card pl-11 pr-4 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
          />
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Select name="category" defaultValue={category ?? ""}>
            <option value="">Toutes les catégories</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </Select>
          <Select name="status" defaultValue={status ?? ""}>
            <option value="">Tous les statuts</option>
            {LEGAL_STATUS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </Select>
          <Select name="type" defaultValue={type ?? ""}>
            <option value="">Tous les types</option>
            {LEGAL_TYPE.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </Select>
          <Select name="level" defaultValue={level ?? ""}>
            <option value="">Tous les niveaux</option>
            {VERIFICATION_LEVEL.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
          </Select>
        </div>
        <div className="mt-3 flex gap-2">
          <Button type="submit"><Filter className="size-4" /> Filtrer</Button>
          {hasFilters && <Link href="/edulex" className={cn(buttonVariants({ variant: "ghost" }))}>Réinitialiser</Link>}
        </div>
      </form>

      {texts.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {texts.map((t) => (
            <LegalTextCard
              key={t.id}
              text={{
                id: t.id, code: t.code, title: t.title, type: t.type, status: t.status,
                verificationLevel: t.verificationLevel, summary: t.summary, publicationDate: t.publicationDate,
                country: { code: t.country.code, name: t.country.name, namespace: t.country.namespace, flag: t.country.flag },
              }}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Scale}
          title={hasFilters ? "Aucun texte ne correspond" : "Aucun texte pour ce pays"}
          description={hasFilters ? "Ajustez les filtres ou le pays sélectionné." : "Déposez un premier texte ou changez le filtre pays."}
        />
      )}
    </div>
  );
}
