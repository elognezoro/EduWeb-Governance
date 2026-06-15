import type { Metadata } from "next";
import Link from "next/link";
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  FileBarChart,
  Scale,
  ShieldAlert,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getSelectedCountryCode } from "@/lib/country";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Flag } from "@/components/ui/flag";
import { KPICard } from "@/components/dashboard/kpi-card";
import { ReferralCard } from "@/components/dashboard/referral-card";
import { ActivityTrendChart, type TrendPoint } from "@/components/dashboard/activity-trend-chart";
import { StatusDonut } from "@/components/dashboard/status-donut";
import { StatusBadge } from "@/components/ui/status-badge";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { ACTIVITY_STATUS_MAP, VERIFICATION_LEVEL, metaOf, type Tone } from "@/lib/enums";
import { formatDate, formatNumber, initials } from "@/lib/utils";

export const metadata: Metadata = { title: "Tableau de bord" };

const TONE_HEX: Record<Tone, string> = {
  neutral: "#94A3B8",
  brand: "#0F766E",
  info: "#1D4ED8",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#DC2626",
  gold: "#D97706",
};

export default async function DashboardPage() {
  const user = await requireUser();
  const code = await getSelectedCountryCode();

  let countryId: string | undefined;
  let countryLabel = "tous les pays";
  if (code !== "ALL") {
    const c = await prisma.country.findUnique({ where: { code } });
    countryId = c?.id;
    countryLabel = c?.namespace || c?.name || code;
  }
  const actWhere = { deletedAt: null, ...(countryId ? { countryId } : {}) };
  const textWhere = { deletedAt: null, ...(countryId ? { countryId } : {}) };

  const [
    totalActivities,
    validatedActivities,
    pendingActivities,
    reportsCount,
    legalTotal,
    legalToVerify,
    academyPaths,
    grouped,
    recent,
    recentTexts,
  ] = await Promise.all([
    prisma.activity.count({ where: actWhere }),
    prisma.activity.count({ where: { ...actWhere, status: "VALIDATED" } }),
    prisma.activity.count({ where: { ...actWhere, status: { in: ["SUBMITTED", "IN_REVIEW", "TO_CORRECT"] } } }),
    prisma.report.count({ where: { status: "GENERATED", ...(countryId ? { countryId } : {}) } }),
    prisma.legalText.count({ where: textWhere }),
    prisma.legalText.count({ where: { ...textWhere, OR: [{ status: "TO_VERIFY" }, { verificationLevel: "V0" }] } }),
    prisma.academyPath.count({ where: { isPublished: true, ...(countryId ? { countryId } : {}) } }),
    prisma.activity.groupBy({ by: ["status"], where: actWhere, _count: { _all: true } }),
    prisma.activity.findMany({ where: actWhere, orderBy: { createdAt: "desc" }, take: 6, include: { author: true } }),
    prisma.legalText.findMany({ where: textWhere, orderBy: { updatedAt: "desc" }, take: 5, include: { country: true } }),
  ]);

  // Donut des statuts d'activités
  const donut = grouped
    .map((g) => {
      const meta = metaOf(ACTIVITY_STATUS_MAP, g.status);
      return { name: meta.label, value: g._count._all, color: TONE_HEX[meta.tone] };
    })
    .sort((a, b) => b.value - a.value);

  // Tendance des 6 derniers mois
  const since = new Date();
  since.setMonth(since.getMonth() - 5);
  since.setDate(1);
  since.setHours(0, 0, 0, 0);
  const acts = await prisma.activity.findMany({
    where: { ...actWhere, createdAt: { gte: since } },
    select: { createdAt: true, status: true },
  });
  const months: TrendPoint[] = [];
  const fmt = new Intl.DateTimeFormat("fr-FR", { month: "short" });
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    months.push({ month: fmt.format(d), saisies: 0, validees: 0 });
  }
  for (const a of acts) {
    const idx = 5 - (new Date().getMonth() - a.createdAt.getMonth() + 12 * (new Date().getFullYear() - a.createdAt.getFullYear()));
    if (idx >= 0 && idx < 6) {
      months[idx].saisies += 1;
      if (a.status === "VALIDATED" || a.status === "CONSOLIDATED") months[idx].validees += 1;
    }
  }

  return (
    <div className="space-y-7">
      <PageHeader
        title={`Bonjour, ${user.firstName} 👋`}
        description={`Vue d'ensemble · ${countryLabel}`}
        actions={
          <Link href="/activities/new" className="inline-flex items-center gap-2 rounded-2xl bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-brand-800">
            <ClipboardList className="size-4" /> Nouvelle activité
          </Link>
        }
      />

      {/* Parrainage / agent commercial : lien d'invitation (code promo) — en tête de page */}
      <ReferralCard />

      {/* KPI */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KPICard label="Activités saisies" value={formatNumber(totalActivities)} icon={ClipboardList} tone="brand" delta={8} />
        <KPICard label="Activités validées" value={formatNumber(validatedActivities)} icon={CheckCircle2} tone="info" delta={5} />
        <KPICard label="En attente de validation" value={formatNumber(pendingActivities)} icon={Clock} tone="gold" hint="Soumises, en examen ou à corriger" />
        <KPICard label="Rapports générés" value={formatNumber(reportsCount)} icon={FileBarChart} tone="neutral" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KPICard label="Textes EduLex disponibles" value={formatNumber(legalTotal)} icon={Scale} tone="info" />
        <KPICard label="Textes à vérifier" value={formatNumber(legalToVerify)} icon={ShieldAlert} tone="danger" hint="Statut « à vérifier » ou niveau V0" />
        <KPICard label="Parcours Academy publiés" value={formatNumber(academyPaths)} icon={GraduationCap} tone="gold" />
        <KPICard label="Taux de validation" value={`${totalActivities ? Math.round((validatedActivities / totalActivities) * 100) : 0}%`} icon={CheckCircle2} tone="brand" />
      </div>

      {/* Graphiques */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Évolution des activités</CardTitle>
            <CardDescription>Saisies et validations sur les 6 derniers mois</CardDescription>
          </CardHeader>
          <CardContent>
            <ActivityTrendChart data={months} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Répartition par statut</CardTitle>
            <CardDescription>Activités par état du workflow</CardDescription>
          </CardHeader>
          <CardContent>
            {donut.length ? (
              <StatusDonut data={donut} />
            ) : (
              <p className="py-10 text-center text-sm text-slate-400">Aucune activité pour ce périmètre.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Feed + EduLex */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Activités récentes</CardTitle>
              <CardDescription>Dernières saisies sur le périmètre</CardDescription>
            </div>
            <Link href="/activities" className="text-sm font-semibold text-brand-700 hover:underline">
              Tout voir
            </Link>
          </CardHeader>
          <CardContent>
            {recent.length ? (
              <ul className="divide-y divide-slate-100">
                {recent.map((a) => (
                  <li key={a.id} className="flex items-center gap-3 py-3">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-slate-100 text-xs font-bold text-slate-500">
                      {initials(a.author.firstName, a.author.lastName)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ink">{a.title}</p>
                      <p className="text-xs text-slate-400">
                        {a.author.firstName} {a.author.lastName} · {formatDate(a.createdAt)}
                      </p>
                    </div>
                    <StatusBadge value={a.status} map={ACTIVITY_STATUS_MAP} />
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                icon={ClipboardList}
                title="Aucune activité pour l'instant"
                description="Les activités saisies apparaîtront ici."
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>EduLex — récents</CardTitle>
              <CardDescription>Textes mis à jour</CardDescription>
            </div>
            <Link href="/edulex" className="text-brand-700 hover:underline">
              <ArrowRight className="size-4" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentTexts.length ? (
              recentTexts.map((t) => (
                <Link
                  key={t.id}
                  href={`/edulex/texts/${t.id}`}
                  className="block rounded-2xl border border-slate-100 p-3 transition-colors hover:bg-slate-50"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] text-slate-400">{t.code}</span>
                    <Badge tone={metaOf(VERIFICATION_LEVEL.reduce((m, o) => ({ ...m, [o.value]: o }), {}), t.verificationLevel).tone}>
                      {t.verificationLevel}
                    </Badge>
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm font-semibold text-ink">{t.title}</p>
                  <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-slate-400"><Flag code={t.country.code} className="w-4" /> {t.country.namespace || t.country.name}</p>
                </Link>
              ))
            ) : (
              <p className="py-6 text-center text-sm text-slate-400">Aucun texte disponible.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
