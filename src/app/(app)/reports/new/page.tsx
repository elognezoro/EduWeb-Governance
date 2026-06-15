import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, FileBarChart } from "lucide-react";
import { requireUser, hasPermission } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { ReportForm } from "@/components/reports/report-form";

export const metadata: Metadata = { title: "Générer un rapport" };

export default async function NewReportPage() {
  const user = await requireUser();
  if (!hasPermission(user, "report:create") && !hasPermission(user, "report:manage")) redirect("/reports");

  const [countries, organizations, structures] = await Promise.all([
    prisma.country.findMany({ where: { isActive: true }, orderBy: { order: "asc" }, select: { id: true, name: true, code: true } }),
    prisma.organization.findMany({ where: { deletedAt: null }, orderBy: { name: "asc" }, select: { id: true, name: true } }),
    prisma.structure.findMany({ where: { deletedAt: null }, orderBy: { name: "asc" }, select: { id: true, name: true } }),
  ]);

  return (
    <div className="space-y-6">
      <Link href="/reports" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-brand-700">
        <ArrowLeft className="size-4" /> Retour aux rapports
      </Link>
      <PageHeader title="Générer un rapport" description="Choisissez le périmètre et la période." icon={FileBarChart} />
      <Card><CardContent className="p-6"><ReportForm countries={countries} organizations={organizations} structures={structures} /></CardContent></Card>
    </div>
  );
}
