import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { QuizPlayer } from "@/components/academy/quiz-player";

export const metadata: Metadata = { title: "Leçon Academy" };

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  await requireUser();
  const { id } = await params;

  const lesson = await prisma.academyLesson.findUnique({
    where: { id },
    include: {
      unit: { select: { pathId: true, title: true } },
      questions: {
        where: { status: "PUBLISHED" },
        orderBy: { createdAt: "asc" },
        select: { id: true, type: true, prompt: true, choices: { orderBy: { order: "asc" }, select: { id: true, label: true } } },
      },
    },
  });

  if (!lesson) notFound();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link href={`/academy/path/${lesson.unit.pathId}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-brand-700">
        <ArrowLeft className="size-4" /> Retour au parcours
      </Link>

      <div>
        <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-brand-700"><BookOpen className="size-4" /> {lesson.unit.title}</p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-institutional-900">{lesson.title}</h1>
      </div>

      <QuizPlayer
        lessonId={lesson.id}
        lessonTitle={lesson.title}
        pathId={lesson.unit.pathId}
        questions={lesson.questions}
      />
    </div>
  );
}
