import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Upload } from "lucide-react";
import { requireUser, hasPermission } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getSelectedCountryCode } from "@/lib/country";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { ImportForm } from "@/components/edulex/import-form";

export const metadata: Metadata = { title: "Import EduLex" };

export default async function ImportPage() {
  const user = await requireUser();
  if (!hasPermission(user, "edulex:create") && !hasPermission(user, "edulex:manage")) redirect("/edulex");

  const code = await getSelectedCountryCode();
  const countries = await prisma.country.findMany({ where: { isActive: true }, orderBy: { order: "asc" }, select: { id: true, name: true, code: true } });
  const defaultCountry = countries.find((c) => c.code === code) ?? countries.find((c) => c.id === user.countryId);

  return (
    <div className="space-y-6">
      <Link href="/edulex" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-brand-700"><ArrowLeft className="size-4" /> Retour à EduLex</Link>
      <PageHeader title="Import d'amorçage" description="Importez en masse des textes réglementaires (marqués V0)." icon={Upload} />
      <Card><CardContent className="p-6">
        <ImportForm countries={countries.map((c) => ({ id: c.id, name: c.name, code: c.code }))} defaultCountryId={defaultCountry?.id} />
      </CardContent></Card>
    </div>
  );
}
