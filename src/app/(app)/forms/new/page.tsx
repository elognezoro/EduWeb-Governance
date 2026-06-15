import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, FileText } from "lucide-react";
import { requireUser, hasPermission } from "@/lib/auth";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { CreateForm } from "@/components/forms/create-form";

export const metadata: Metadata = { title: "Nouveau formulaire" };

export default async function NewFormPage() {
  const user = await requireUser();
  if (!hasPermission(user, "form:manage")) redirect("/forms");

  return (
    <div className="space-y-6">
      <Link href="/forms" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-brand-700">
        <ArrowLeft className="size-4" /> Retour aux formulaires
      </Link>
      <PageHeader title="Nouveau formulaire" description="Donnez un titre, puis composez les champs." icon={FileText} />
      <Card><CardContent className="p-6"><CreateForm /></CardContent></Card>
    </div>
  );
}
