"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export type AnswerResult =
  | {
      ok: true;
      isCorrect: boolean;
      correctChoiceIds: string[];
      explanation: string | null;
      earnedXp: number;
      totalXp: number;
      level: number;
      legalText: { id: string; code: string; title: string; verificationLevel: string } | null;
      articleRef: string | null;
    }
  | { ok: false; error: string };

const levelFor = (xp: number) => Math.floor(xp / 100) + 1;
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

function setEquals(a: string[], b: string[]) {
  if (a.length !== b.length) return false;
  const sb = new Set(b);
  return a.every((x) => sb.has(x));
}

export async function submitAnswer(questionId: string, choiceIds: string[]): Promise<AnswerResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Non authentifié." };

  const question = await prisma.question.findUnique({
    where: { id: questionId },
    include: { choices: true, legalText: { select: { id: true, code: true, title: true, verificationLevel: true } } },
  });
  if (!question) return { ok: false, error: "Question introuvable." };

  const correctChoiceIds = question.choices.filter((c) => c.isCorrect).map((c) => c.id);
  const isCorrect = setEquals(choiceIds, correctChoiceIds);

  // XP attribué une seule fois par question (pas de farming).
  const priorCorrect = await prisma.questionAttempt.findFirst({ where: { userId: user.id, questionId, isCorrect: true } });
  const earnedXp = isCorrect && !priorCorrect ? question.points : 0;

  await prisma.questionAttempt.create({
    data: { questionId, userId: user.id, isCorrect, answer: JSON.stringify(choiceIds), earnedXp },
  });

  // Mise à jour XP / niveau / série
  let totalXp = 0;
  let level = 1;
  const existing = await prisma.userXP.findUnique({ where: { userId: user.id } });
  if (earnedXp > 0 || !existing) {
    const now = new Date();
    let streak = existing?.streak ?? 0;
    if (existing?.lastActivityDate) {
      const diff = (startOfDay(now) - startOfDay(existing.lastActivityDate)) / 86_400_000;
      streak = diff === 0 ? streak : diff === 1 ? streak + 1 : 1;
    } else {
      streak = 1;
    }
    totalXp = (existing?.totalXp ?? 0) + earnedXp;
    level = levelFor(totalXp);
    await prisma.userXP.upsert({
      where: { userId: user.id },
      create: { userId: user.id, totalXp, level, streak, lastActivityDate: now },
      update: { totalXp, level, streak, lastActivityDate: now },
    });
  } else {
    totalXp = existing.totalXp;
    level = existing.level;
  }

  // Recommandation de révision si échec
  if (!isCorrect && question.legalTextId) {
    await prisma.reviewRecommendation.create({
      data: { userId: user.id, legalTextId: question.legalTextId, questionId, reason: "Réponse incorrecte au quiz." },
    });
  }

  revalidatePath("/academy/progress");
  return {
    ok: true,
    isCorrect,
    correctChoiceIds,
    explanation: question.explanation,
    earnedXp,
    totalXp,
    level,
    legalText: question.legalText,
    articleRef: question.articleRef,
  };
}

export async function finishLesson(lessonId: string): Promise<{ ok: true; progress: number } | { ok: false; error: string }> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Non authentifié." };

  const lesson = await prisma.academyLesson.findUnique({ where: { id: lessonId }, include: { unit: true } });
  if (!lesson) return { ok: false, error: "Leçon introuvable." };
  const pathId = lesson.unit.pathId;

  const totalQuestions = await prisma.question.count({ where: { status: "PUBLISHED", lesson: { unit: { pathId } } } });
  const correctAttempts = await prisma.questionAttempt.findMany({
    where: { userId: user.id, isCorrect: true, question: { lesson: { unit: { pathId } } } },
    select: { questionId: true },
  });
  const correctDistinct = new Set(correctAttempts.map((a) => a.questionId)).size;
  const progress = totalQuestions > 0 ? Math.round((correctDistinct / totalQuestions) * 100) : 0;
  const status = progress >= 100 ? "COMPLETED" : "IN_PROGRESS";

  await prisma.userProgress.upsert({
    where: { userId_pathId: { userId: user.id, pathId } },
    create: { userId: user.id, pathId, progress, status },
    update: { progress, status },
  });

  // Badge de complétion (idempotent)
  if (progress >= 100) {
    const badge = await prisma.badge.findUnique({ where: { key: "citoyen-averti" } });
    if (badge) {
      await prisma.userBadge.upsert({
        where: { userId_badgeId: { userId: user.id, badgeId: badge.id } },
        create: { userId: user.id, badgeId: badge.id },
        update: {},
      });
    }
  }

  revalidatePath("/academy");
  revalidatePath("/academy/progress");
  revalidatePath(`/academy/path/${pathId}`);
  return { ok: true, progress };
}
