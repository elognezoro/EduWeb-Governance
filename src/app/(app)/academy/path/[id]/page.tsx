import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, GraduationCap, Lock, PlayCircle, BookOpen } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Parcours Academy" };

export default async function AcademyPathPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireUser();
  const { id } = await params;

  const path = await prisma.academyPath.findUnique({
    where: { id },
    include: {
      category: true,
      country: true,
      units: {
        orderBy: { order: "asc" },
        include: { lessons: { orderBy: { order: "asc" }, include: { _count: { select: { questions: true } } } } },
      },
    },
  });

  if (!path) notFound();

  return (
    <div className="space-y-6">
      <Link href="/academy" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-brand-700">
        <ArrowLeft className="size-4" /> Retour à Academy
      </Link>

      <div className="rounded-3xl bg-gradient-to-br from-brand-700 to-institutional-900 p-7 text-white shadow-glow">
        <div className="flex items-center gap-2">
          <Badge tone="gold">Niveau {path.level}</Badge>
          <span className="text-sm opacity-80">{path.category.name}</span>
        </div>
        <h1 className="mt-3 flex items-center gap-2 text-2xl font-extrabold">
          <GraduationCap className="size-7" /> {path.title}
        </h1>
        {path.description && <p className="mt-2 max-w-2xl opacity-85">{path.description}</p>}
      </div>

      <div className="space-y-4">
        {path.units.length ? (
          path.units.map((unit, idx) => (
            <Card key={unit.id}>
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-2xl bg-brand-50 text-sm font-bold text-brand-700">
                    {idx + 1}
                  </span>
                  <h3 className="flex-1 font-bold text-institutional-900">{unit.title}</h3>
                  {unit.requiresId && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400">
                      <Lock className="size-3.5" /> Prérequis
                    </span>
                  )}
                </div>
                <ul className="mt-3 space-y-2 pl-12">
                  {unit.lessons.map((lesson) => (
                    <li key={lesson.id}>
                      <Link
                        href={`/academy/lesson/${lesson.id}`}
                        className="group flex items-center justify-between rounded-2xl border border-slate-100 px-3 py-2.5 transition-all hover:border-brand-200 hover:bg-brand-50/40"
                      >
                        <span className="flex items-center gap-2 text-sm font-medium text-ink group-hover:text-brand-700">
                          <BookOpen className="size-4 text-slate-400 group-hover:text-brand-600" /> {lesson.title}
                        </span>
                        <span className="flex items-center gap-3 text-xs text-slate-400">
                          {lesson._count.questions} question(s)
                          <PlayCircle className="size-5 text-brand-600" />
                        </span>
                      </Link>
                    </li>
                  ))}
                  {unit.lessons.length === 0 && (
                    <li className="text-sm text-slate-400">Leçons à venir.</li>
                  )}
                </ul>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-8 text-center text-sm text-slate-500">
              Les unités et le lecteur de quiz interactif (QCM, vrai/faux, cas pratiques…) seront
              activés en <strong>Phase 4</strong>. Le socle de données Academy est déjà en place.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
