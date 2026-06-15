import type { Metadata } from "next";
import Link from "next/link";
import { Archive, ClipboardList, Scale, FileText } from "lucide-react";
import { requireUser, hasPermission } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { EmptyState } from "@/components/ui/empty-state";
import { ACTIVITY_STATUS_MAP, LEGAL_STATUS_MAP, FORM_STATUS_MAP } from "@/lib/enums";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Archives" };

export default async function ArchivesPage() {
  const user = await requireUser();
  const seeAll = hasPermission(user, "admin:manage");
  const orgScope = seeAll ? {} : user.organizationId ? { organizationId: user.organizationId } : {};

  const [activities, texts, forms] = await Promise.all([
    prisma.activity.findMany({
      where: { deletedAt: null, status: { in: ["CONSOLIDATED", "ARCHIVED"] }, ...orgScope },
      orderBy: { updatedAt: "desc" }, take: 25, include: { structure: true },
    }),
    prisma.legalText.findMany({
      where: { deletedAt: null, status: { in: ["ABROGATED", "REPLACED", "SUSPENDED", "ARCHIVED"] } },
      orderBy: { updatedAt: "desc" }, take: 25, include: { country: true },
    }),
    prisma.activityForm.findMany({
      where: { deletedAt: null, status: "ARCHIVED", ...orgScope },
      orderBy: { updatedAt: "desc" }, take: 25,
    }),
  ]);

  const empty = activities.length === 0 && texts.length === 0 && forms.length === 0;

  return (
    <div className="space-y-7">
      <PageHeader title="Archives" description="Activités consolidées, textes obsolètes et formulaires archivés." icon={Archive} />

      {empty ? (
        <EmptyState icon={Archive} title="Archives vides" description="Les éléments consolidés, abrogés ou archivés apparaîtront ici." />
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Activités */}
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><ClipboardList className="size-4 text-brand-700" /> Activités</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {activities.length ? activities.map((a) => (
                <Link key={a.id} href={`/activities/${a.id}`} className="block rounded-2xl border border-slate-100 p-3 hover:bg-slate-50">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-medium text-ink">{a.title}</span>
                    <StatusBadge value={a.status} map={ACTIVITY_STATUS_MAP} />
                  </div>
                  <p className="mt-0.5 text-xs text-slate-400">{a.structure?.name ?? "—"} · {formatDate(a.updatedAt)}</p>
                </Link>
              )) : <p className="text-sm text-slate-400">Aucune activité archivée.</p>}
            </CardContent>
          </Card>

          {/* Textes obsolètes */}
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Scale className="size-4 text-brand-700" /> Textes obsolètes</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {texts.length ? texts.map((t) => (
                <Link key={t.id} href={`/edulex/texts/${t.id}`} className="block rounded-2xl border border-slate-100 p-3 hover:bg-slate-50">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-medium text-ink">{t.title}</span>
                    <StatusBadge value={t.status} map={LEGAL_STATUS_MAP} />
                  </div>
                  <p className="mt-0.5 font-mono text-[11px] text-slate-400">{t.code}</p>
                </Link>
              )) : <p className="text-sm text-slate-400">Aucun texte obsolète.</p>}
            </CardContent>
          </Card>

          {/* Formulaires */}
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><FileText className="size-4 text-brand-700" /> Formulaires</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {forms.length ? forms.map((f) => (
                <Link key={f.id} href={`/forms/${f.id}`} className="block rounded-2xl border border-slate-100 p-3 hover:bg-slate-50">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-medium text-ink">{f.title}</span>
                    <StatusBadge value={f.status} map={FORM_STATUS_MAP} />
                  </div>
                  <p className="mt-0.5 text-xs text-slate-400">v{f.version} · {formatDate(f.updatedAt)}</p>
                </Link>
              )) : <p className="text-sm text-slate-400">Aucun formulaire archivé.</p>}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
