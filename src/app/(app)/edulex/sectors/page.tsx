import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Layers } from "lucide-react";
import { requireUser, hasPermission } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flag } from "@/components/ui/flag";
import { EmptyState } from "@/components/ui/empty-state";
import { SectorAdd } from "@/components/edulex/reference-forms";
import { ReferenceDeleteTable } from "@/components/edulex/reference-delete-table";
import { deleteSector, deleteSectors, updateSector } from "@/app/(app)/edulex/reference-actions";

export const metadata: Metadata = { title: "Secteurs" };

export default async function SectorsPage() {
  const user = await requireUser();
  const canManage = hasPermission(user, "edulex:manage");

  const [sectors, countries] = await Promise.all([
    prisma.sector.findMany({ orderBy: { name: "asc" }, include: { country: true, _count: { select: { legalTexts: true } } } }),
    prisma.country.findMany({ where: { isActive: true }, orderBy: { order: "asc" }, select: { id: true, name: true, code: true } }),
  ]);

  return (
    <div className="space-y-6">
      <Link href="/edulex" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-brand-700"><ArrowLeft className="size-4" /> Retour à EduLex</Link>
      <PageHeader title="Secteurs réglementaires" description="Domaines de classification des textes." icon={Layers} />

      {canManage && (
        <Card><CardHeader><CardTitle>Ajouter un secteur</CardTitle></CardHeader><CardContent><SectorAdd countries={countries} /></CardContent></Card>
      )}

      {sectors.length ? (
        <ReferenceDeleteTable
          headers={["Secteur", "Code", "Pays", "Textes"]}
          canManage={canManage}
          entityLabel="secteur"
          onDeleteOne={deleteSector}
          onDeleteMany={deleteSectors}
          onUpdate={updateSector}
          items={sectors.map((s) => ({
            id: s.id,
            name: s.name,
            code: s.code,
            cells: [
              <span className="font-medium text-ink">{s.name}</span>,
              s.code ? <Badge tone="brand">{s.code}</Badge> : <span className="text-slate-300">—</span>,
              s.country
                ? <span className="inline-flex items-center gap-1.5 text-slate-500"><Flag code={s.country.code} className="w-4" /> {s.country.name}</span>
                : <span className="text-slate-400">International</span>,
              <span className="text-slate-500">{s._count.legalTexts}</span>,
            ],
          }))}
        />
      ) : <EmptyState icon={Layers} title="Aucun secteur" description="Ajoutez le premier secteur." />}
    </div>
  );
}
