import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, Flame, Star, Trophy, Sparkles, BookOpen, ArrowRight, ShieldCheck } from "lucide-react";
import { requireUser, hasPermission } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getSelectedCountryCode } from "@/lib/country";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { GenerateAssessmentsButton } from "@/components/academy/generate-assessments-button";
import { ACADEMY_LEVELS } from "@/lib/enums";
import { ensureAssessmentsForCountry, ELIGIBLE_TEXT_FILTER } from "@/lib/assessments";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "EduLex Academy" };

const LEVEL_TONE = ["neutral", "info", "brand", "gold", "danger"] as const;

export default async function AcademyPage({ searchParams }: { searchParams: Promise<{ cat?: string }> }) {
  const user = await requireUser();
  const code = await getSelectedCountryCode();
  const activeCat = (await searchParams).cat || null;

  let countryId: string | undefined;
  let countryLabel = "Tous les pays";
  let isCI = false;
  if (code !== "ALL") {
    const c = await prisma.country.findUnique({ where: { code } });
    countryId = c?.id;
    countryLabel = c?.namespace || c?.name || code;
    isCI = c?.code === "CI";
  }

  // Génération automatique (idempotente) : dès qu'une catégorie a ≥ 1 texte validé,
  // ses épreuves sur les 5 niveaux de compétence sont créées, sans action manuelle.
  if (countryId) await ensureAssessmentsForCountry(countryId);

  const [categories, paths, xp] = await Promise.all([
    prisma.academyCategory.findMany({ orderBy: { order: "asc" } }),
    prisma.academyPath.findMany({
      where: { isPublished: true, ...(countryId ? { countryId } : {}), ...(activeCat ? { categoryId: activeCat } : {}) },
      orderBy: [{ level: "asc" }, { order: "asc" }],
      include: { category: true, country: true, _count: { select: { units: true } } },
      take: 24,
    }),
    prisma.userXP.findUnique({ where: { userId: user.id } }),
  ]);
  const activeCatName = activeCat ? categories.find((c) => c.id === activeCat)?.name ?? null : null;

  const spaceName = isCI ? "EduLex CI Academy" : "EduLex Academy";
  const canManage = hasPermission(user, "academy:manage");
  const validatedCount = countryId
    ? await prisma.legalText.count({ where: { countryId, ...ELIGIBLE_TEXT_FILTER } })
    : 0;

  return (
    <div className="space-y-7">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-institutional-900 p-8 text-white shadow-glow">
        <div className="pointer-events-none absolute -right-10 -top-10 size-56 rounded-full bg-gold-400/20 blur-3xl" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold backdrop-blur">
              <Sparkles className="size-3.5" /> {countryLabel}
            </span>
            <h1 className="mt-3 flex items-center gap-2 text-3xl font-extrabold tracking-tight">
              <GraduationCap className="size-8" /> {spaceName}
            </h1>
            <p className="mt-2 max-w-xl opacity-85">
              Apprenez les textes, comprenez vos droits, progressez par défis. Chaque question
              cite son texte source et son niveau de confiance.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="rounded-2xl bg-white/10 px-5 py-4 text-center backdrop-blur">
              <Star className="mx-auto size-5 text-gold-300" />
              <p className="mt-1 text-2xl font-extrabold">{xp?.totalXp ?? 0}</p>
              <p className="text-xs opacity-80">XP</p>
            </div>
            <div className="rounded-2xl bg-white/10 px-5 py-4 text-center backdrop-blur">
              <Flame className="mx-auto size-5 text-gold-300" />
              <p className="mt-1 text-2xl font-extrabold">{xp?.streak ?? 0}</p>
              <p className="text-xs opacity-80">Série</p>
            </div>
            <div className="rounded-2xl bg-white/10 px-5 py-4 text-center backdrop-blur">
              <Trophy className="mx-auto size-5 text-gold-300" />
              <p className="mt-1 text-2xl font-extrabold">{xp?.level ?? 1}</p>
              <p className="text-xs opacity-80">Niveau</p>
            </div>
          </div>
        </div>
      </div>

      {/* Accès rapide */}
      <div className="flex flex-wrap gap-2">
        {[
          { href: "/academy/progress", label: "Ma progression", icon: Star },
          { href: "/academy/badges", label: "Badges & trophées", icon: Trophy },
          { href: "/academy/leaderboard", label: "Classement", icon: Flame },
        ].map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-card px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:border-brand-200 hover:text-brand-700">
            <Icon className="size-4 text-brand-700" /> {label}
          </Link>
        ))}
      </div>

      {/* Niveaux de compétence */}
      <div>
        <h2 className="text-lg font-extrabold text-institutional-900">Niveaux de compétence</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {ACADEMY_LEVELS.map((lvl, i) => (
            <Card key={lvl.level}>
              <CardContent className="p-4">
                <Badge tone={LEVEL_TONE[i]}>Niveau {lvl.level}</Badge>
                <p className="mt-2 font-bold text-institutional-900">{lvl.name}</p>
                <p className="mt-0.5 text-xs text-slate-500">{lvl.objective}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Catégories */}
      {categories.length > 0 && (
        <div>
          <h2 className="text-lg font-extrabold text-institutional-900">Catégories de parcours</h2>
          <p className="mt-1 text-sm text-slate-500">Cliquez sur une catégorie pour accéder à ses parcours et épreuves.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {categories.map((c) => {
              const active = activeCat === c.id;
              return (
                <Link
                  key={c.id}
                  href={`/academy?cat=${c.id}#parcours`}
                  scroll={false}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-2xl border px-3.5 py-2 text-sm font-semibold transition-colors",
                    active
                      ? "border-brand-300 bg-brand-50 text-brand-700"
                      : "border-slate-200 bg-card text-slate-600 hover:border-brand-200 hover:text-brand-700"
                  )}
                >
                  <BookOpen className="size-4 text-brand-700" /> {c.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Modules d'évaluation par pays — tirés automatiquement des textes validés */}
      <Card>
        <CardContent className="p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                <ShieldCheck className="size-5" />
              </span>
              <div>
                <p className="font-bold text-institutional-900">Modules d'évaluation officiels</p>
                <p className="mt-0.5 text-sm text-slate-500">
                  {countryId && validatedCount > 0 ? (
                    <>
                      Générés automatiquement à partir des <strong>{validatedCount}</strong> texte(s) officiel(s)
                      en vigueur et vérifié(s) de {countryLabel}, sur les <strong>5 niveaux de compétence</strong>, avec leurs références officielles.
                    </>
                  ) : countryId ? (
                    <>Aucun texte officiel en vigueur pour {countryLabel} pour l'instant. Lancez la génération sur tous les pays disposant de textes vérifiés.</>
                  ) : (
                    <>Les épreuves sont générées automatiquement à partir des textes officiels en vigueur et vérifiés de chaque pays, avec leurs références officielles.</>
                  )}
                </p>
              </div>
            </div>
            {canManage && (
              <GenerateAssessmentsButton countryId={countryId} countryLabel={countryLabel} />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Parcours */}
      <div id="parcours" className="scroll-mt-24">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-extrabold text-institutional-900">
            Parcours disponibles
            {activeCatName ? <span className="font-bold text-brand-700"> · {activeCatName}</span> : null}
          </h2>
          <div className="flex items-center gap-3">
            {activeCat && (
              <Link href="/academy#parcours" scroll={false} className="text-sm font-semibold text-brand-700 hover:underline">
                Tout afficher
              </Link>
            )}
            <span className="text-sm text-slate-400">{paths.length} parcours</span>
          </div>
        </div>
        {paths.length ? (
          <div className="mt-3 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {paths.map((p) => (
              <Link
                key={p.id}
                href={`/academy/path/${p.id}`}
                className="group flex flex-col rounded-3xl border border-slate-100 bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-glow"
              >
                <div className="flex items-center justify-between">
                  <Badge tone={LEVEL_TONE[Math.min(p.level - 1, 4)]}>Niveau {p.level}</Badge>
                  <span className="text-xs font-semibold text-slate-400">{p._count.units} unité(s)</span>
                </div>
                <h3 className="mt-3 font-bold text-institutional-900 group-hover:text-brand-700">{p.title}</h3>
                {p.description && <p className="mt-1 line-clamp-2 text-sm text-slate-500">{p.description}</p>}
                <div className="mt-auto flex items-center justify-between pt-4 text-xs text-slate-400">
                  <span>{p.category.name}</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-brand-700">
                    Commencer <ArrowRight className="size-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            className="mt-3"
            icon={GraduationCap}
            title={activeCatName ? `Aucun parcours dans « ${activeCatName} » pour ce pays` : "Aucun parcours publié pour ce pays"}
            description={activeCat ? "Sélectionnez une autre catégorie, ou « Tout afficher »." : "Changez le filtre pays ou revenez plus tard : de nouveaux parcours arrivent."}
          />
        )}
      </div>
    </div>
  );
}
