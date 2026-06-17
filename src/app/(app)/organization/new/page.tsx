import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Building2 } from "lucide-react";
import { requireUser, hasPermission } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { currentMinistryWhere } from "@/lib/government";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { OrganizationForm } from "@/components/organization/organization-form";

export const metadata: Metadata = { title: "Nouvelle organisation" };

export default async function NewOrganizationPage() {
  const user = await requireUser();
  if (!hasPermission(user, "organization:manage")) redirect("/organization");

  const minWhere = await currentMinistryWhere(prisma);
  const ci = await prisma.country.findUnique({ where: { code: "CI" }, select: { id: true } });
  const [countries, ministries] = await Promise.all([
    prisma.country.findMany({ where: { isActive: true }, orderBy: { order: "asc" }, select: { id: true, name: true, code: true, namespace: true } }),
    ci ? prisma.ministry.findMany({ where: { ...minWhere, countryId: ci.id }, orderBy: [{ order: "asc" }, { name: "asc" }], select: { id: true, name: true } }) : Promise.resolve([]),
  ]);

  return (
    <div className="space-y-6">
      <Link href="/organization" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-brand-700">
        <ArrowLeft className="size-4" /> Retour à l'organisation
      </Link>
      <PageHeader title="Nouvelle organisation" description="Créez une organisation cliente." icon={Building2} />
      <Card><CardContent className="p-6"><OrganizationForm countries={countries} ministries={ministries} /></CardContent></Card>
    </div>
  );
}
