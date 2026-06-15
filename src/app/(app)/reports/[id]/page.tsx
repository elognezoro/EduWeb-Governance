import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FileBarChart, Globe2, Building2, CalendarRange, ClipboardList, Scale } from "lucide-react";
import { requireUser, fullName } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PrintButton } from "@/components/reports/print-button";
import { REPORT_PERIOD_MAP } from "@/lib/enums";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Rapport" };

interface ReportContent {
  generatedAt: string;
  period: string;
  from: string | null;
  to: string | null;
  scope: { country: string; organization: string; structure: string };
  indicators: { total: number; byStatus: Record<string, number> };
  activities: { title: string; status: string; author: string; structure: string; date: string }[];
  legalRefs: { code: string; title: string }[];
}

function parse(content: string | null): ReportContent | null {
  if (!content) return null;
  try { return JSON.parse(content) as ReportContent; } catch { return null; }
}

export default async function ReportDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireUser();
  const { id } = await params;

  const report = await prisma.report.findUnique({ where: { id }, include: { generatedBy: true, country: true, organization: true, structure: true } });
  if (!report) notFound();
  const c = parse(report.content);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between no-print">
        <Link href="/reports" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-brand-700">
          <ArrowLeft className="size-4" /> Retour aux rapports
        </Link>
        <PrintButton />
      </div>

      {/* Page de garde */}
      <Card>
        <CardContent className="p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700"><FileBarChart className="size-3.5" /> Rapport institutionnel</span>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-institutional-900">{report.title}</h1>
              <p className="mt-1 text-sm text-slate-400">
                Généré le {formatDate(report.createdAt)}{report.generatedBy ? ` par ${fullName(report.generatedBy)}` : ""}
              </p>
            </div>
            <Badge tone="info">{REPORT_PERIOD_MAP[report.period ?? ""]?.label ?? report.period}</Badge>
          </div>

          {c && (
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <ScopeItem icon={Globe2} label="Pays" value={c.scope.country} />
              <ScopeItem icon={Building2} label="Organisation" value={c.scope.organization} />
              <ScopeItem icon={CalendarRange} label="Période" value={c.from || c.to ? `${formatDate(c.from)} → ${formatDate(c.to)}` : "Toutes périodes"} />
            </div>
          )}
        </CardContent>
      </Card>

      {!c ? (
        <Card><CardContent className="p-8 text-center text-sm text-slate-400">Contenu du rapport indisponible.</CardContent></Card>
      ) : (
        <>
          {/* Indicateurs */}
          <Card>
            <CardContent className="p-6">
              <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-400"><ClipboardList className="size-4" /> Indicateurs</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                <div className="rounded-2xl bg-brand-50 px-5 py-3 text-center">
                  <p className="text-2xl font-extrabold text-brand-700">{c.indicators.total}</p>
                  <p className="text-xs font-medium text-brand-800">Activités consolidées</p>
                </div>
                {Object.entries(c.indicators.byStatus).map(([label, n]) => (
                  <div key={label} className="rounded-2xl bg-slate-50 px-5 py-3 text-center">
                    <p className="text-2xl font-extrabold text-institutional-900">{n}</p>
                    <p className="text-xs font-medium text-slate-500">{label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activités */}
          <Card>
            <CardContent className="p-6">
              <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-400"><ClipboardList className="size-4" /> Activités réalisées</h2>
              {c.activities.length ? (
                <table className="mt-4 w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                      <th className="py-2 pr-4">Activité</th>
                      <th className="hidden py-2 pr-4 sm:table-cell">Auteur</th>
                      <th className="hidden py-2 pr-4 md:table-cell">Structure</th>
                      <th className="py-2">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {c.activities.map((a, i) => (
                      <tr key={i}>
                        <td className="py-2.5 pr-4 font-medium text-ink">{a.title}</td>
                        <td className="hidden py-2.5 pr-4 text-slate-500 sm:table-cell">{a.author}</td>
                        <td className="hidden py-2.5 pr-4 text-slate-500 md:table-cell">{a.structure}</td>
                        <td className="py-2.5"><Badge tone="success">{a.status}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="mt-4 text-sm text-slate-400">Aucune activité consolidée sur ce périmètre.</p>
              )}
            </CardContent>
          </Card>

          {/* Références réglementaires */}
          <Card>
            <CardContent className="p-6">
              <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-400"><Scale className="size-4" /> Références réglementaires EduLex</h2>
              {c.legalRefs.length ? (
                <ul className="mt-4 space-y-2">
                  {c.legalRefs.map((t) => (
                    <li key={t.code} className="flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-2.5">
                      <span className="text-sm font-medium text-ink">{t.title}</span>
                      <span className="font-mono text-[11px] text-slate-400">{t.code}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm text-slate-400">Aucune référence réglementaire citée.</p>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

function ScopeItem({ icon: Icon, label, value }: { icon: typeof Globe2; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5 rounded-2xl bg-slate-50 p-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-slate-400" />
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
        <p className="text-sm font-medium text-ink">{value}</p>
      </div>
    </div>
  );
}
