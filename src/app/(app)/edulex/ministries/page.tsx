import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Building2, Landmark, ExternalLink } from "lucide-react";
import { requireUser, hasPermission } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flag } from "@/components/ui/flag";
import { EmptyState } from "@/components/ui/empty-state";
import { MinistryAdd } from "@/components/edulex/reference-forms";
import { GovernmentAdd } from "@/components/edulex/government-add";
import { GovernmentDeleteButton } from "@/components/edulex/government-delete-button";
import { ReferenceDeleteTable } from "@/components/edulex/reference-delete-table";
import { deleteMinistry, deleteMinistries, updateMinistry } from "@/app/(app)/edulex/reference-actions";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Ministères & gouvernements" };

export default async function MinistriesPage() {
  const user = await requireUser();
  const canManage = hasPermission(user, "edulex:manage");

  const [ministries, countries, governments] = await Promise.all([
    prisma.ministry.findMany({
      orderBy: [{ country: { order: "asc" } }, { order: "asc" }, { name: "asc" }],
      include: { country: true, government: { select: { name: true } } },
    }),
    prisma.country.findMany({ where: { isActive: true }, orderBy: { order: "asc" }, select: { id: true, name: true, code: true, namespace: true } }),
    prisma.government.findMany({
      orderBy: [{ country: { order: "asc" } }, { effectiveDate: "desc" }],
      include: { country: { select: { code: true, name: true, namespace: true } }, _count: { select: { ministries: true } } },
    }),
  ]);

  // Gouvernement en vigueur par pays = date d'entrée en vigueur passée la plus récente.
  const now = new Date();
  const currentByCountry = new Map<string, string>();
  for (const g of governments) {
    if (g.effectiveDate <= now && !currentByCountry.has(g.countryId)) currentByCountry.set(g.countryId, g.id);
  }
  const statusOf = (g: (typeof governments)[number]) => {
    if (g.effectiveDate > now) return { label: "À venir", tone: "info" as const };
    if (currentByCountry.get(g.countryId) === g.id) return { label: "En vigueur", tone: "success" as const };
    return { label: "Archivé", tone: "neutral" as const };
  };

  // Regroupe les gouvernements par pays (en conservant l'ordre).
  const byCountry: { code: string; label: string; govs: typeof governments }[] = [];
  for (const g of governments) {
    let bucket = byCountry.find((b) => b.code === g.country.code);
    if (!bucket) { bucket = { code: g.country.code, label: g.country.namespace || g.country.name, govs: [] }; byCountry.push(bucket); }
    bucket.govs.push(g);
  }

  return (
    <div className="space-y-6">
      <Link href="/edulex" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-brand-700"><ArrowLeft className="size-4" /> Retour à EduLex</Link>
      <PageHeader title="Ministères & gouvernements" description="Référentiel des émetteurs, organisé par gouvernement en vigueur." icon={Building2} />

      {canManage && (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Landmark className="size-4 text-brand-700" /> Déclarer un gouvernement</CardTitle></CardHeader>
            <CardContent><GovernmentAdd countries={countries} /></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Ajouter un ministère</CardTitle></CardHeader>
            <CardContent><MinistryAdd countries={countries} /></CardContent>
          </Card>
        </div>
      )}

      {/* Gouvernements (par pays), avec statut piloté par date */}
      {byCountry.length > 0 && (
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Landmark className="size-4 text-brand-700" /> Gouvernements</CardTitle></CardHeader>
          <CardContent className="space-y-5">
            {byCountry.map((bucket) => (
              <div key={bucket.code}>
                <p className="flex items-center gap-1.5 text-sm font-bold text-institutional-900"><Flag code={bucket.code} className="w-4" /> {bucket.label}</p>
                <ul className="mt-2 space-y-2">
                  {bucket.govs.map((g) => {
                    const st = statusOf(g);
                    return (
                      <li key={g.id} className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-100 px-3.5 py-2.5">
                        <div>
                          <span className="font-semibold text-ink">{g.name}</span>
                          <span className="ml-2 align-middle"><Badge tone={st.tone} dot>{st.label}</Badge></span>
                          <p className="mt-0.5 text-xs text-slate-500">
                            Entrée en vigueur le {formatDate(g.effectiveDate)}
                            {g.endDate ? ` · jusqu'au ${formatDate(g.endDate)}` : ""} · {g._count.ministries} ministère(s)
                            {g.sourceUrl ? (
                              <>
                                {" · "}
                                <a href={g.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 text-brand-700 hover:underline">
                                  source <ExternalLink className="size-3" />
                                </a>
                              </>
                            ) : null}
                          </p>
                        </div>
                        {canManage && <GovernmentDeleteButton id={g.id} />}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Liste des ministères (avec leur gouvernement de rattachement) */}
      {ministries.length ? (
        <ReferenceDeleteTable
          headers={["Ministère", "Code", "Pays", "Gouvernement"]}
          canManage={canManage}
          entityLabel="ministère"
          onDeleteOne={deleteMinistry}
          onDeleteMany={deleteMinistries}
          onUpdate={updateMinistry}
          items={ministries.map((m) => ({
            id: m.id,
            name: m.name,
            code: m.code,
            cells: [
              <span className="font-medium text-ink">{m.name}</span>,
              m.code ? <Badge tone="neutral">{m.code}</Badge> : <span className="text-slate-300">—</span>,
              <span className="inline-flex items-center gap-1.5 text-slate-500"><Flag code={m.country.code} className="w-4" /> {m.country.name}</span>,
              m.government ? <span className="text-slate-500">{m.government.name}</span> : <span className="text-slate-300">—</span>,
            ],
          }))}
        />
      ) : <EmptyState icon={Building2} title="Aucun ministère" description="Ajoutez le premier émetteur." />}
    </div>
  );
}
