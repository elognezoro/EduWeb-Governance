import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { requireUser, hasPermission } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { QuestionForm } from "@/components/academy/question-form";

export const metadata: Metadata = { title: "Nouvelle question" };

export default async function NewQuestionPage() {
  const user = await requireUser();
  if (!hasPermission(user, "academy:manage")) redirect("/academy");

  const [lessons, legalTexts, sectors] = await Promise.all([
    prisma.academyLesson.findMany({ orderBy: { title: "asc" }, include: { unit: { include: { path: true } } } }),
    prisma.legalText.findMany({ where: { deletedAt: null }, orderBy: { updatedAt: "desc" }, select: { id: true, code: true, title: true }, take: 100 }),
    prisma.sector.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
  ]);

  const lessonOpts = lessons.map((l) => ({ id: l.id, label: `${l.unit.path.title} › ${l.unit.title} › ${l.title}` }));

  return (
    <div className="space-y-6">
      <Link href="/academy/admin" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-brand-700">
        <ArrowLeft className="size-4" /> Retour à l'administration
      </Link>
      <PageHeader title="Nouvelle question" description="Reliez chaque question à son texte source." icon={HelpCircle} />
      <Card>
        <CardContent className="p-6">
          {lessonOpts.length ? (
            <QuestionForm lessons={lessonOpts} legalTexts={legalTexts} sectors={sectors} />
          ) : (
            <EmptyState icon={HelpCircle} title="Aucune leçon" description="Créez d'abord un parcours, une unité et une leçon (données de seed disponibles)." />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
