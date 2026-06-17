import type { Metadata } from "next";
import Link from "next/link";
import { Building2, Plus, MapPin } from "lucide-react";
import { requireUser, hasPermission } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getSelectedCountryCode, getSelectedSubdivision } from "@/lib/country";
import { currentMinistryWhere } from "@/lib/government";
import { PageHeader } from "@/components/layout/page-header";
import { Flag } from "@/components/ui/flag";
import { buttonVariants } from "@/components/ui/button";
import { OrgChart, type OrgNode, type OrgOrganization } from "@/components/organization/org-chart";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Organisation" };

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

  const minWhere = await currentMinistryWhere(prisma);
  const [organizations, structures, ministries] = await Promise.all([
    prisma.organization.findMany({ where: { deletedAt: null }, orderBy: { name: "asc" }, select: { id: true, name: true, type: true, logoUrl: true, country: { select: { code: true, name: true } } } }),
    prisma.structure.findMany({ where: structureWhere, orderBy: { name: "asc" }, select: { id: true, name: true, type: true, parentId: true, ministryId: true, organizationId: true, manager: { select: { firstName: true, lastName: true } }, region: { select: { name: true } }, _count: { select: { members: true } } } }),
    prisma.ministry.findMany({ where: { ...minWhere, ...(country ? { countryId: country.id } : {}) }, orderBy: [{ order: "asc" }, { name: "asc" }], select: { id: true, name: true } }),
  ]);

  const nodes: OrgNode[] = structures.map((s) => ({
    id: s.id, name: s.name, type: s.type, parentId: s.parentId, ministryId: s.ministryId, organizationId: s.organizationId,
    managerName: s.manager ? `${s.manager.firstName} ${s.manager.lastName}`.trim() : null,
    regionName: s.region?.name ?? null,
    memberCount: s._count.members,
  }));
  const orgs: OrgOrganization[] = organizations.map((o) => ({
    id: o.id, name: o.name, type: o.type, countryCode: o.country?.code ?? null, countryName: o.country?.name ?? null, logoUrl: o.logoUrl ?? null,
  }));

  return (
    <div className="space-y-7">
      <PageHeader
        title="Organisation & structures"
        description="Organigramme hiérarchique : ministères techniques et organisations clientes."
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

      <OrgChart structures={nodes} ministries={ministries} organizations={orgs} canManage={canManage} filtered={filtered} />
    </div>
  );
}
