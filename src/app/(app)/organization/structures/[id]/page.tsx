import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, Network } from "lucide-react";
import { requireUser, hasPermission, isSuperAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { currentMinistryWhere } from "@/lib/government";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { StructureForm } from "@/components/organization/structure-form";

export const metadata: Metadata = { title: "Modifier la structure" };

export default async function EditStructurePage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  if (!hasPermission(user, "organization:manage")) redirect("/organization");
  const { id } = await params;

  const minWhere = await currentMinistryWhere(prisma);
  const [structure, organizations, structures, countries, ministries, users] = await Promise.all([
    prisma.structure.findUnique({ where: { id } }),
    prisma.organization.findMany({ where: { deletedAt: null }, orderBy: { name: "asc" }, select: { id: true, name: true } }),
    prisma.structure.findMany({ where: { deletedAt: null }, orderBy: { name: "asc" }, select: { id: true, name: true } }),
    prisma.country.findMany({ where: { isActive: true }, orderBy: { order: "asc" }, select: { id: true, name: true, code: true } }),
    prisma.ministry.findMany({ where: minWhere, orderBy: [{ country: { order: "asc" } }, { order: "asc" }, { name: "asc" }], select: { id: true, name: true } }),
    prisma.user.findMany({ where: { deletedAt: null, isActive: true }, orderBy: { lastName: "asc" }, select: { id: true, firstName: true, lastName: true } }),
  ]);

  if (!structure || structure.deletedAt) notFound();
  const managers = users.map((u) => ({ id: u.id, name: `${u.firstName} ${u.lastName}` }));

  return (
    <div className="space-y-6">
      <Link href="/organization" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-brand-700">
        <ArrowLeft className="size-4" /> Retour à l'organisation
      </Link>
      <PageHeader title="Modifier la structure" description={structure.name} icon={Network} />
      <Card>
        <CardContent className="p-6">
          <StructureForm
            organizations={organizations}
            structures={structures}
            countries={countries}
            ministries={ministries}
            managers={managers}
            canDelete={isSuperAdmin(user)}
            initial={{
              id: structure.id,
              name: structure.name,
              type: structure.type,
              organizationId: structure.organizationId,
              parentId: structure.parentId,
              ministryId: structure.ministryId,
              countryId: structure.countryId,
              regionId: structure.regionId,
              managerId: structure.managerId,
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
