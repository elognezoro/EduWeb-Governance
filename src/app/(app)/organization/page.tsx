import type { Metadata } from "next";
import Link from "next/link";
import { Building2, Plus, Users, Pencil, Network, MapPin } from "lucide-react";
import { requireUser, hasPermission } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getSelectedCountryCode, getSelectedSubdivision } from "@/lib/country";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flag } from "@/components/ui/flag";
import { EmptyState } from "@/components/ui/empty-state";
import { FileUpload } from "@/components/ui/file-upload";
import { buttonVariants } from "@/components/ui/button";
import { STRUCTURE_TYPE_MAP } from "@/lib/enums";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Organisation" };

interface Node {
  id: string;
  name: string;
  type: string;
  parentId: string | null;
  manager: { firstName: string; lastName: string } | null;
  region: { name: string } | null;
  _count: { members: number };
}

function StructureTree({ nodes, parentId, canManage, depth = 0 }: { nodes: Node[]; parentId: string | null; canManage: boolean; depth?: number }) {
  // À la racine, on inclut aussi les structures « orphelines » (dont le parent
  // n'existe plus / hors périmètre) afin qu'aucune structure ne soit masquée.
  const ids = new Set(nodes.map((n) => n.id));
  const children = nodes.filter((n) =>
    parentId === null ? n.parentId === null || !ids.has(n.parentId) : n.parentId === parentId
  );
  if (children.length === 0) return null;

  return (
    <ul className={cn(depth > 0 && "ml-4 border-l border-slate-100 pl-4")}>
      {children.map((n) => {
        const typeLabel = STRUCTURE_TYPE_MAP[n.type]?.label ?? n.type;
        return (
          <li key={n.id} className="mt-2">
            <div className="group flex items-center gap-3 rounded-2xl border border-slate-100 bg-card px-4 py-2.5 transition-colors hover:bg-slate-50">
              <Network className="size-4 shrink-0 text-brand-600" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink">{n.name}</p>
                <p className="flex flex-wrap items-center gap-x-1 text-xs text-slate-400">
                  {typeLabel}
                  {n.manager && <> · {n.manager.firstName} {n.manager.lastName}</>}
                  {n.region && <span className="inline-flex items-center gap-0.5 text-institutional-600">· <MapPin className="size-3" /> {n.region.name}</span>}
                </p>
              </div>
              <span className="hidden items-center gap-1 text-xs text-slate-400 sm:flex"><Users className="size-3.5" /> {n._count.members}</span>
              {canManage && (
                <Link href={`/organization/structures/${n.id}`} className="text-slate-400 opacity-0 transition-opacity hover:text-brand-700 group-hover:opacity-100">
                  <Pencil className="size-4" />
                </Link>
              )}
            </div>
            <StructureTree nodes={nodes} parentId={n.id} canManage={canManage} depth={depth + 1} />
          </li>
        );
      })}
    </ul>
  );
}

export default async function OrganizationPage() {
  const user = await requireUser();
  const canManage = hasPermission(user, "organization:manage");

  const [code, subId] = await Promise.all([getSelectedCountryCode(), getSelectedSubdivision()]);
  const country = code !== "ALL" ? await prisma.country.findUnique({ where: { code }, select: { id: true, code: true, name: true } }) : null;
  const subdivision = subId !== "ALL" ? await prisma.region.findUnique({ where: { id: subId }, select: { id: true, name: true } }) : null;
  const filtered = Boolean(country || subdivision);

  const structureWhere = {
    deletedAt: null,
    ...(country ? { countryId: country.id } : {}),
    ...(subdivision ? { regionId: subdivision.id } : {}),
  };

  const [organizations, structures] = await Promise.all([
    prisma.organization.findMany({ where: { deletedAt: null }, orderBy: { name: "asc" }, include: { country: true, _count: { select: { structures: true } } } }),
    prisma.structure.findMany({ where: structureWhere, orderBy: { name: "asc" }, include: { manager: { select: { firstName: true, lastName: true } }, region: { select: { name: true } }, _count: { select: { members: true } } } }),
  ]);

  return (
    <div className="space-y-7">
      <PageHeader
        title="Organisation & structures"
        description="Organisations clientes et organigramme hiérarchique."
        icon={Building2}
        actions={
          canManage && (
            <div className="flex gap-2">
              <Link href="/organization/structures/new" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}><Plus className="size-4" /> Structure</Link>
              <Link href="/organization/new" className={cn(buttonVariants({ variant: "primary", size: "sm" }))}><Plus className="size-4" /> Organisation</Link>
            </div>
          )
        }
      />

      {filtered && (
        <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-institutional-100 bg-institutional-50/60 px-4 py-2.5 text-sm text-institutional-900">
          <MapPin className="size-4 shrink-0 text-institutional-700" />
          <span className="font-semibold">Organigramme filtré :</span>
          {country && <span className="inline-flex items-center gap-1"><Flag code={country.code} className="w-4" /> {country.name}</span>}
          {subdivision && <span className="inline-flex items-center gap-1">· <MapPin className="size-3" /> {subdivision.name}</span>}
          <span className="ml-auto text-xs text-slate-500">Ajustez via le filtre pays / subdivision (barre supérieure).</span>
        </div>
      )}

      {organizations.length ? (
        <div className="space-y-5">
          {organizations.map((org) => {
            const orgStructures = structures.filter((s) => s.organizationId === org.id);
            return (
              <Card key={org.id}>
                <CardContent className="p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {org.logoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={org.logoUrl} alt={org.name} className="size-11 shrink-0 rounded-2xl object-cover ring-1 ring-slate-200" />
                      ) : (
                        <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-institutional-50 text-institutional-700"><Building2 className="size-5" /></span>
                      )}
                      <div>
                        <h2 className="font-extrabold text-institutional-900">{org.name}</h2>
                        <p className="inline-flex items-center gap-1 text-xs text-slate-400">{org.country && <><Flag code={org.country.code} className="w-4" /> {org.country.name} · </>}{org._count.structures} structure(s)</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {org.type && <Badge tone="neutral">{org.type}</Badge>}
                      {canManage && <FileUpload purpose="logo" entityId={org.id} accept="image/*" label="Logo" variant="ghost" />}
                    </div>
                  </div>

                  <div className="mt-4">
                    {orgStructures.length ? (
                      <StructureTree nodes={orgStructures} parentId={null} canManage={canManage} />
                    ) : (
                      <p className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-400">{filtered ? "Aucune structure sur ce périmètre." : "Aucune structure pour cette organisation."}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <EmptyState icon={Building2} title="Aucune organisation" description="Créez une première organisation cliente." />
      )}
    </div>
  );
}
