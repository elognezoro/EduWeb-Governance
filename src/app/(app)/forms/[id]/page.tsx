import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, FileText } from "lucide-react";
import { requireUser, hasPermission } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";
import { FormBuilder } from "@/components/forms/form-builder";

export const metadata: Metadata = { title: "Composer le formulaire" };

function parseOptions(config: string | null): string[] {
  if (!config) return [];
  try {
    const p = JSON.parse(config);
    return Array.isArray(p?.options) ? p.options : [];
  } catch {
    return [];
  }
}

export default async function FormBuilderPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  if (!hasPermission(user, "form:manage")) redirect("/forms");
  const { id } = await params;

  const form = await prisma.activityForm.findUnique({
    where: { id },
    include: { fields: { orderBy: { order: "asc" } } },
  });
  if (!form || form.deletedAt) notFound();

  return (
    <div className="space-y-6">
      <Link href="/forms" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-brand-700">
        <ArrowLeft className="size-4" /> Retour aux formulaires
      </Link>
      <PageHeader title="Concepteur de formulaire" description={form.title} icon={FileText} />
      <FormBuilder
        initial={{
          id: form.id,
          title: form.title,
          description: form.description ?? "",
          status: form.status,
          version: form.version,
          fields: form.fields.map((f) => ({ label: f.label, type: f.type, required: f.required, options: parseOptions(f.config) })),
        }}
      />
    </div>
  );
}
