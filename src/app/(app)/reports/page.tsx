import type { Metadata } from "next";
import Link from "next/link";
import { FileBarChart, Plus } from "lucide-react";
import { requireUser, hasPermission, fullName } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { Badge } from "@/components/ui/badge";
import { Flag } from "@/components/ui/flag";
import { EmptyState } from "@/components/ui/empty-state";
import { buttonVariants } from "@/components/ui/button";
import { REPORT_STATUS_MAP, REPORT_PERIOD_MAP } from "@/lib/enums";
import { cn, formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Rapports" };

export default async function ReportsPage() {
  const user = await requireUser();
  const canGenerate = hasPermission(user, "report:create") || hasPermission(user, "report:manage");

  const reports = await prisma.report.findMany({
    where: { ...(user.organizationId && !hasPermission(user, "admin:manage") ? { organizationId: user.organizationId } : {}) },
    orderBy: { createdAt: "desc" },
    include: { generatedBy: true, country: true, organization: true },
  });

  return (
    <div className="space-y-7">
      <PageHeader
        title="Reporting institutionnel"
        description="Rapports consolidés à partir des activités validées."
        icon={FileBarChart}
        actions={canGenerate && (
          <Link href="/reports/new" className={cn(buttonVariants({ variant: "primary", size: "sm" }))}><Plus className="size-4" /> Générer un rapport</Link>
        )}
      />

      {reports.length ? (
        <div className="overflow-hidden rounded-3xl border border-slate-100 bg-card shadow-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                <th className="px-5 py-3">Rapport</th>
                <th className="hidden px-5 py-3 md:table-cell">Périodicité</th>
                <th className="hidden px-5 py-3 lg:table-cell">Généré par</th>
                <th className="hidden px-5 py-3 sm:table-cell">Date</th>
                <th className="px-5 py-3">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reports.map((r) => (
                <tr key={r.id} className="group transition-colors hover:bg-slate-50">
                  <td className="px-5 py-3.5">
                    <Link href={`/reports/${r.id}`} className="font-semibold text-ink group-hover:text-brand-700">{r.title}</Link>
                    {r.country && <span className="ml-2 inline-flex items-center gap-1 text-xs text-slate-400"><Flag code={r.country.code} className="w-4" /> {r.country.name}</span>}
                  </td>
                  <td className="hidden px-5 py-3.5 md:table-cell"><Badge tone="info">{REPORT_PERIOD_MAP[r.period ?? ""]?.label ?? r.period}</Badge></td>
                  <td className="hidden px-5 py-3.5 text-slate-500 lg:table-cell">{r.generatedBy ? fullName(r.generatedBy) : "—"}</td>
                  <td className="hidden px-5 py-3.5 text-slate-400 sm:table-cell">{formatDate(r.createdAt)}</td>
                  <td className="px-5 py-3.5"><StatusBadge value={r.status} map={REPORT_STATUS_MAP} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          icon={FileBarChart}
          title="Aucun rapport"
          description="Générez un premier rapport à partir des activités validées."
          action={canGenerate && <Link href="/reports/new" className={cn(buttonVariants({ variant: "primary", size: "sm" }))}><Plus className="size-4" /> Générer un rapport</Link>}
        />
      )}
    </div>
  );
}
