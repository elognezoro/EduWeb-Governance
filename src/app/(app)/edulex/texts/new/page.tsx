import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, FilePlus2 } from "lucide-react";
import { requireUser, hasPermission } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getSelectedCountryCode } from "@/lib/country";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { DepositForm } from "@/components/edulex/deposit-form";

export const metadata: Metadata = { title: "Déposer un texte" };

export default async function NewLegalTextPage() {
  const user = await requireUser();
  if (!hasPermission(user, "edulex:create")) redirect("/edulex");

  const code = await getSelectedCountryCode();
  const [countries, ministries, sectors, jurisdictions] = await Promise.all([
    prisma.country.findMany({ where: { isActive: true }, orderBy: { order: "asc" }, select: { id: true, code: true, name: true } }),
    prisma.ministry.findMany({ orderBy: [{ country: { order: "asc" } }, { order: "asc" }, { name: "asc" }], select: { id: true, code: true, name: true, countryId: true } }),
    prisma.sector.findMany({ orderBy: { name: "asc" }, select: { id: true, code: true, name: true } }),
    prisma.jurisdiction.findMany({ orderBy: { name: "asc" }, select: { id: true, code: true, name: true, countryId: true } }),
  ]);

  const defaultCountry = countries.find((c) => c.code === code) ?? countries.find((c) => c.id === user.countryId);

  return (
    <div className="space-y-6">
      <Link href="/edulex" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-brand-700">
        <ArrowLeft className="size-4" /> Retour à EduLex
      </Link>
      <PageHeader title="Déposer un texte EduLex" description="Formulaire guidé avec codification automatique." icon={FilePlus2} />
      <Card>
        <CardContent className="p-6">
          <DepositForm countries={countries} ministries={ministries} sectors={sectors} jurisdictions={jurisdictions} defaultCountryId={defaultCountry?.id} />
        </CardContent>
      </Card>
    </div>
  );
}
