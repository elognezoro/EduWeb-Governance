import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Plus, ListChecks } from "lucide-react";
import { requireUser, hasPermission } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { EmptyState } from "@/components/ui/empty-state";
import { buttonVariants } from "@/components/ui/button";
import { FORM_STATUS_MAP } from "@/lib/enums";
import { cn, formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Formulaires" };

export default async function FormsPage() {
  const user = await requireUser();
  const canManage = hasPermission(user, "form:manage");

  const forms = await prisma.activityForm.findMany({
    where: { deletedAt: null, ...(user.organizationId && !hasPermission(user, "admin:manage") ? { organizationId: user.organizationId } : {}) },
    orderBy: { updatedAt: "desc" },
    include: { _count: { select: { fields: true, activities: true } } },
  });

  return (
    <div className="space-y-7">
      <PageHeader
        title="Formulaires d'activités"
        description="Concevez des formulaires personnalisés et versionnés."
        icon={FileText}
        actions={canManage && (
          <Link href="/forms/new" className={cn(buttonVariants({ variant: "primary", size: "sm" }))}><Plus className="size-4" /> Nouveau formulaire</Link>
        )}
      />

      {forms.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {forms.map((f) => (
            <Link key={f.id} href={`/forms/${f.id}`} className="group flex flex-col rounded-3xl border border-slate-100 bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-glow">
              <div className="flex items-center justify-between">
                <span className="flex size-10 items-center justify-center rounded-2xl bg-brand-50 text-brand-700"><FileText className="size-5" /></span>
                <StatusBadge value={f.status} map={FORM_STATUS_MAP} />
              </div>
              <h3 className="mt-3 font-bold text-institutional-900 group-hover:text-brand-700">{f.title}</h3>
              {f.description && <p className="mt-1 line-clamp-2 text-sm text-slate-500">{f.description}</p>}
              <div className="mt-auto flex items-center justify-between pt-4 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1"><ListChecks className="size-3.5" /> {f._count.fields} champ(s) · v{f.version}</span>
                <span>{formatDate(f.updatedAt)}</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState icon={FileText} title="Aucun formulaire" description="Créez votre premier formulaire d'activité." />
      )}
    </div>
  );
}
