import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Settings2, Plus, HelpCircle, CheckCircle2 } from "lucide-react";
import { requireUser, hasPermission } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { buttonVariants } from "@/components/ui/button";
import { QuestionAdminActions } from "@/components/academy/question-admin-actions";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Administration Academy" };

const STATUS_TONE: Record<string, "success" | "neutral" | "warning"> = { PUBLISHED: "success", DRAFT: "neutral", SUSPENDED: "warning" };
const STATUS_LABEL: Record<string, string> = { PUBLISHED: "Publiée", DRAFT: "Brouillon", SUSPENDED: "Suspendue" };

export default async function AcademyAdminPage() {
  const user = await requireUser();
  if (!hasPermission(user, "academy:manage")) redirect("/academy");

  const [questions, published] = await Promise.all([
    prisma.question.findMany({
      orderBy: { createdAt: "desc" },
      include: { lesson: { include: { unit: { include: { path: true } } } }, legalText: { select: { code: true } }, _count: { select: { choices: true, attempts: true } } },
      take: 100,
    }),
    prisma.question.count({ where: { status: "PUBLISHED" } }),
  ]);

  return (
    <div className="space-y-7">
      <PageHeader
        title="Administration Academy"
        description="Créez et gérez les questions reliées aux textes EduLex."
        icon={Settings2}
        actions={
          <Link href="/academy/admin/questions/new" className={cn(buttonVariants({ variant: "primary", size: "sm" }))}>
            <Plus className="size-4" /> Nouvelle question
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Card><CardContent className="flex items-center gap-3 p-5">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700"><HelpCircle className="size-5" /></span>
          <div><p className="text-2xl font-extrabold text-institutional-900">{questions.length}</p><p className="text-sm text-slate-500">Questions au total</p></div>
        </CardContent></Card>
        <Card><CardContent className="flex items-center gap-3 p-5">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700"><CheckCircle2 className="size-5" /></span>
          <div><p className="text-2xl font-extrabold text-institutional-900">{published}</p><p className="text-sm text-slate-500">Publiées</p></div>
        </CardContent></Card>
      </div>

      {questions.length ? (
        <div className="overflow-hidden rounded-3xl border border-slate-100 bg-card shadow-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                <th className="px-5 py-3">Question</th>
                <th className="hidden px-5 py-3 lg:table-cell">Leçon</th>
                <th className="hidden px-5 py-3 sm:table-cell">Type</th>
                <th className="px-5 py-3">Statut</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {questions.map((q) => (
                <tr key={q.id} className="hover:bg-slate-50">
                  <td className="max-w-md px-5 py-3">
                    <p className="truncate font-medium text-ink">{q.prompt}</p>
                    <p className="text-xs text-slate-400">{q._count.choices} réponse(s) · {q._count.attempts} tentative(s){q.legalText ? ` · ${q.legalText.code}` : ""}</p>
                  </td>
                  <td className="hidden px-5 py-3 text-slate-500 lg:table-cell">{q.lesson?.title ?? "—"}</td>
                  <td className="hidden px-5 py-3 sm:table-cell"><Badge tone="brand">{q.type}</Badge></td>
                  <td className="px-5 py-3"><Badge tone={STATUS_TONE[q.status] ?? "neutral"} dot>{STATUS_LABEL[q.status] ?? q.status}</Badge></td>
                  <td className="px-5 py-3"><div className="flex justify-end"><QuestionAdminActions id={q.id} status={q.status} /></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState icon={HelpCircle} title="Aucune question" description="Créez la première question de quiz." />
      )}
    </div>
  );
}
