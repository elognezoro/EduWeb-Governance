"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, hasPermission } from "@/lib/auth";
import { writeAudit } from "@/lib/audit";
import { buildAssessmentsForCountry } from "@/lib/assessments";

export type ActionResult = { ok: true; id?: string } | { ok: false; error: string };

const clean = (v?: string) => (v && v.length > 0 ? v : undefined);

async function guard() {
  const user = await getCurrentUser();
  if (!user) return { user: null, error: "Non authentifié." as const };
  if (!hasPermission(user, "academy:manage")) return { user, error: "Permission requise (academy:manage)." as const };
  return { user, error: null };
}

const choiceSchema = z.object({ label: z.string().trim().min(1), isCorrect: z.boolean() });

const questionSchema = z.object({
  lessonId: z.string().min(1, "Leçon requise."),
  type: z.string().min(1),
  prompt: z.string().trim().min(5, "Énoncé requis (5 caractères min.)."),
  explanation: z.string().trim().optional(),
  difficulty: z.string().default("EASY"),
  points: z.coerce.number().int().min(1).max(100).default(10),
  level: z.coerce.number().int().min(1).max(5).default(1),
  status: z.string().default("PUBLISHED"),
  legalTextId: z.string().optional(),
  articleRef: z.string().trim().optional(),
  sectorId: z.string().optional(),
  choices: z.array(choiceSchema).min(2, "Au moins deux réponses."),
});
export type QuestionInput = z.infer<typeof questionSchema>;

export async function createQuestion(input: QuestionInput): Promise<ActionResult> {
  const g = await guard();
  if (g.error) return { ok: false, error: g.error };
  const parsed = questionSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
  const d = parsed.data;

  if (!d.choices.some((c) => c.isCorrect)) return { ok: false, error: "Marquez au moins une bonne réponse." };

  // Pays hérité de la leçon → parcours
  const lesson = await prisma.academyLesson.findUnique({ where: { id: d.lessonId }, include: { unit: { include: { path: true } } } });
  if (!lesson) return { ok: false, error: "Leçon introuvable." };

  const question = await prisma.question.create({
    data: {
      lessonId: d.lessonId,
      type: d.type,
      prompt: d.prompt,
      explanation: clean(d.explanation),
      difficulty: d.difficulty,
      points: d.points,
      level: d.level,
      status: d.status,
      legalTextId: clean(d.legalTextId),
      articleRef: clean(d.articleRef),
      sectorId: clean(d.sectorId),
      countryId: lesson.unit.path.countryId ?? undefined,
      choices: { create: d.choices.map((c, i) => ({ label: c.label, isCorrect: c.isCorrect, order: i })) },
    },
  });

  await writeAudit({ userId: g.user!.id, action: "create", module: "academy", entityType: "Question", entityId: question.id });
  revalidatePath("/academy/admin");
  redirect("/academy/admin");
}

export async function setQuestionStatus(id: string, status: "PUBLISHED" | "DRAFT" | "SUSPENDED"): Promise<ActionResult> {
  const g = await guard();
  if (g.error) return { ok: false, error: g.error };
  await prisma.question.update({ where: { id }, data: { status } });
  await writeAudit({ userId: g.user!.id, action: "status", module: "academy", entityType: "Question", entityId: id });
  revalidatePath("/academy/admin");
  return { ok: true };
}

export async function deleteQuestion(id: string): Promise<ActionResult> {
  const g = await guard();
  if (g.error) return { ok: false, error: g.error };
  await prisma.question.delete({ where: { id } });
  await writeAudit({ userId: g.user!.id, action: "delete", module: "academy", entityType: "Question", entityId: id });
  revalidatePath("/academy/admin");
  return { ok: true };
}

// La génération des évaluations (5 niveaux de compétence, par catégorie) vit
// désormais dans @/lib/assessments (réutilisée par la page Academy en auto).
export type GenerateResult =
  | { ok: true; created: number; skipped: number; total: number }
  | { ok: false; error: string };

export async function generateCountryAssessments(countryId: string): Promise<GenerateResult> {
  const g = await guard();
  if (g.error) return { ok: false, error: g.error };
  if (!countryId) return { ok: false, error: "Sélectionnez un pays précis avant de générer les modules." };
  const res = await buildAssessmentsForCountry(countryId);
  if ("error" in res) return { ok: false, error: res.error };
  await writeAudit({ userId: g.user!.id, action: "generate_assessments", module: "academy", metadata: { countryId, ...res } });
  revalidatePath("/academy");
  return { ok: true, created: res.created, skipped: res.skipped, total: res.total };
}

export type GenerateAllResult =
  | { ok: true; countriesProcessed: number; created: number; skipped: number; details: { label: string; created: number; skipped: number; total: number }[] }
  | { ok: false; error: string };

/** Génère les modules d'évaluation pour TOUS les pays disposant de textes validés. */
export async function generateAllAssessments(): Promise<GenerateAllResult> {
  const g = await guard();
  if (g.error) return { ok: false, error: g.error };

  const countries = await prisma.country.findMany({ where: { isActive: true }, select: { id: true } });
  const details: { label: string; created: number; skipped: number; total: number }[] = [];
  let created = 0;
  let skipped = 0;
  let processed = 0;

  for (const c of countries) {
    const res = await buildAssessmentsForCountry(c.id);
    if ("error" in res) continue; // pays sans textes validés → ignoré
    processed++;
    created += res.created;
    skipped += res.skipped;
    details.push(res);
  }

  if (processed === 0) {
    return { ok: false, error: "Aucun pays ne dispose de textes validés (V3–V4, en vigueur, publics)." };
  }

  await writeAudit({ userId: g.user!.id, action: "generate_assessments_all", module: "academy", metadata: { processed, created, skipped } });
  revalidatePath("/academy");
  return { ok: true, countriesProcessed: processed, created, skipped, details };
}

// Création express d'une leçon (pour rattacher des questions)
const lessonSchema = z.object({ unitId: z.string().min(1, "Unité requise."), title: z.string().trim().min(2, "Titre requis.") });
export async function createLesson(input: z.infer<typeof lessonSchema>): Promise<ActionResult> {
  const g = await guard();
  if (g.error) return { ok: false, error: g.error };
  const parsed = lessonSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
  const count = await prisma.academyLesson.count({ where: { unitId: parsed.data.unitId } });
  const lesson = await prisma.academyLesson.create({ data: { unitId: parsed.data.unitId, title: parsed.data.title, order: count + 1 } });
  await writeAudit({ userId: g.user!.id, action: "create", module: "academy", entityType: "AcademyLesson", entityId: lesson.id });
  revalidatePath("/academy/admin");
  return { ok: true, id: lesson.id };
}
