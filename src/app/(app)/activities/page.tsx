import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardList, Plus, Search, Calendar } from "lucide-react";
import { requireUser, hasPermission } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getSelectedCountryCode } from "@/lib/country";
import { PageHeader } from "@/components/layout/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { EmptyState } from "@/components/ui/empty-state";
import { buttonVariants } from "@/components/ui/button";
import { ACTIVITY_STATUS } from "@/lib/enums";
import { cn, formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Activités" };

export default async function ActivitiesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const user = await requireUser();
  const { status, q } = await searchParams;
  const code = await getSelectedCountryCode();

  let countryId: string | undefined;
  if (code !== "ALL") {
    const c = await prisma.country.findUnique({ where: { code } });
    countryId = c?.id;
  }

  const seeAll = hasPermission(user, "admin:manage"); // super_admin : tout l'inventaire
  const canReadOrg = hasPermission(user, "activity:validate"); // validateurs : leur organisation
  const scope = seeAll
    ? {}
    : canReadOrg
      ? user.organizationId
        ? { organizationId: user.organizationId }
        : {}
      : { authorId: user.id };
  const where = {
    deletedAt: null,
    ...scope,
    ...(countryId ? { countryId } : {}),
    ...(status ? { status } : {}),
    ...(q ? { title: { contains: q } } : {}),
  };
  const canReadAll = seeAll || canReadOrg;

  const activities = await prisma.activity.findMany({
    where,
    orderBy: { updatedAt: "desc" },
    include: { author: true, structure: true, _count: { select: { legalTexts: true } } },
    take: 100,
  });

  return (
    <div className="space-y-7">
      <PageHeader
        title="Activités"
        description={canReadAll ? "Activités de votre organisation." : "Vos activités."}
        icon={ClipboardList}
        actions={
          <Link href="/activities/new" className={cn(buttonVariants({ variant: "primary", size: "sm" }))}>
            <Plus className="size-4" /> Nouvelle activité
          </Link>
        }
      />

      {/* Filtres */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <FilterChip href="/activities" label="Toutes" active={!status} />
          {ACTIVITY_STATUS.map((s) => (
            <FilterChip key={s.value} href={`/activities?status=${s.value}`} label={s.label} active={status === s.value} />
          ))}
        </div>
        <form action="/activities" className="relative w-full sm:w-64">
          {status && <input type="hidden" name="status" value={status} />}
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            name="q"
            defaultValue={q ?? ""}
            placeholder="Rechercher…"
            className="h-10 w-full rounded-2xl border border-slate-200 bg-card pl-10 pr-4 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
          />
        </form>
      </div>

      {/* Liste */}
      {activities.length ? (
        <div className="overflow-hidden rounded-3xl border border-slate-100 bg-card shadow-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                <th className="px-5 py-3">Activité</th>
                <th className="hidden px-5 py-3 md:table-cell">Structure</th>
                <th className="hidden px-5 py-3 lg:table-cell">Auteur</th>
                <th className="hidden px-5 py-3 sm:table-cell">Mise à jour</th>
                <th className="px-5 py-3">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activities.map((a) => (
                <tr key={a.id} className="group transition-colors hover:bg-slate-50">
                  <td className="px-5 py-3.5">
                    <Link href={`/activities/${a.id}`} className="font-semibold text-ink group-hover:text-brand-700">
                      {a.title}
                    </Link>
                    {a._count.legalTexts > 0 && (
                      <span className="ml-2 text-xs text-slate-400">· {a._count.legalTexts} texte(s)</span>
                    )}
                  </td>
                  <td className="hidden px-5 py-3.5 text-slate-500 md:table-cell">{a.structure?.name ?? "—"}</td>
                  <td className="hidden px-5 py-3.5 text-slate-500 lg:table-cell">{a.author.firstName} {a.author.lastName}</td>
                  <td className="hidden px-5 py-3.5 text-slate-400 sm:table-cell">
                    <span className="inline-flex items-center gap-1"><Calendar className="size-3.5" /> {formatDate(a.updatedAt)}</span>
                  </td>
                  <td className="px-5 py-3.5"><StatusBadge value={a.status} map={Object.fromEntries(ACTIVITY_STATUS.map((s) => [s.value, s]))} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          icon={ClipboardList}
          title={status || q ? "Aucune activité ne correspond" : "Aucune activité"}
          description="Créez votre première activité pour démarrer le suivi."
          action={
            <Link href="/activities/new" className={cn(buttonVariants({ variant: "primary", size: "sm" }))}>
              <Plus className="size-4" /> Nouvelle activité
            </Link>
          }
        />
      )}
    </div>
  );
}

function FilterChip({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors",
        active ? "bg-brand-700 text-white" : "bg-card text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
      )}
    >
      {label}
    </Link>
  );
}
