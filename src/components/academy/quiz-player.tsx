"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, XCircle, ArrowRight, Loader2, Trophy, Scale, Sparkles, RotateCcw, AlertTriangle } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { submitAnswer, finishLesson, type AnswerResult } from "@/app/(app)/academy/actions";

interface Choice { id: string; label: string }
interface Q { id: string; type: string; prompt: string; choices: Choice[] }
type Feedback = Extract<AnswerResult, { ok: true }>;

export function QuizPlayer({ lessonId, lessonTitle, pathId, questions }: { lessonId: string; lessonTitle: string; pathId: string; questions: Q[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [xpGained, setXpGained] = useState(0);
  const [finalProgress, setFinalProgress] = useState<number | null>(null);

  if (questions.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-200 bg-card p-10 text-center">
        <p className="text-sm text-slate-500">Cette leçon n'a pas encore de questions publiées.</p>
        <Link href={`/academy/path/${pathId}`} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-4")}>Retour au parcours</Link>
      </div>
    );
  }

  const q = questions[index];
  const multi = q.type === "QCM";
  const isLast = index === questions.length - 1;

  function toggle(choiceId: string) {
    if (feedback) return;
    setSelected((prev) => {
      if (multi) {
        const next = new Set(prev);
        next.has(choiceId) ? next.delete(choiceId) : next.add(choiceId);
        return next;
      }
      return new Set([choiceId]);
    });
  }

  function validate() {
    if (selected.size === 0) return;
    setError(null);
    startTransition(async () => {
      const res = await submitAnswer(q.id, [...selected]);
      if (!res.ok) { setError(res.error); return; }
      setFeedback(res);
      if (res.isCorrect) setCorrectCount((c) => c + 1);
      setXpGained((x) => x + res.earnedXp);
    });
  }

  function next() {
    if (isLast) {
      startTransition(async () => {
        const res = await finishLesson(lessonId);
        if (res.ok) setFinalProgress(res.progress);
        setDone(true);
        router.refresh();
      });
      return;
    }
    setIndex((i) => i + 1);
    setSelected(new Set());
    setFeedback(null);
  }

  if (done) {
    const pct = Math.round((correctCount / questions.length) * 100);
    const great = pct >= 80;
    return (
      <div className="rounded-3xl bg-gradient-to-br from-brand-700 to-institutional-900 p-8 text-center text-white shadow-glow">
        <Trophy className="mx-auto size-14 text-gold-300" />
        <h2 className="mt-3 text-2xl font-extrabold">{great ? "Excellent !" : "Leçon terminée"}</h2>
        <p className="mt-1 opacity-85">{lessonTitle}</p>
        <div className="mx-auto mt-6 flex max-w-sm justify-center gap-3">
          <div className="flex-1 rounded-2xl bg-white/10 p-4"><p className="text-3xl font-extrabold">{correctCount}/{questions.length}</p><p className="text-xs opacity-80">Bonnes réponses</p></div>
          <div className="flex-1 rounded-2xl bg-white/10 p-4"><p className="text-3xl font-extrabold text-gold-300">+{xpGained}</p><p className="text-xs opacity-80">XP gagnés</p></div>
          {finalProgress !== null && <div className="flex-1 rounded-2xl bg-white/10 p-4"><p className="text-3xl font-extrabold">{finalProgress}%</p><p className="text-xs opacity-80">Parcours</p></div>}
        </div>
        <div className="mt-7 flex justify-center gap-3">
          <Link href={`/academy/path/${pathId}`} className={cn(buttonVariants({ variant: "secondary" }))}>Retour au parcours</Link>
          <button onClick={() => { setIndex(0); setSelected(new Set()); setFeedback(null); setDone(false); setCorrectCount(0); setXpGained(0); }} className={cn(buttonVariants({ variant: "gold" }))}>
            <RotateCcw className="size-4" /> Recommencer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Progression */}
      <div className="flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-brand-600 transition-all" style={{ width: `${(index / questions.length) * 100}%` }} />
        </div>
        <span className="text-xs font-semibold text-slate-400">{index + 1} / {questions.length}</span>
      </div>

      <div className="rounded-3xl border border-slate-100 bg-card p-6 shadow-card">
        <div className="flex items-center gap-2">
          <Badge tone="brand">{q.type}</Badge>
          {xpGained > 0 && <span className="inline-flex items-center gap-1 text-xs font-bold text-gold-600"><Sparkles className="size-3.5" /> {xpGained} XP</span>}
        </div>
        <h2 className="mt-3 text-lg font-bold text-institutional-900">{q.prompt}</h2>

        <div className="mt-5 space-y-2.5">
          {q.choices.map((c) => {
            const isSel = selected.has(c.id);
            const isCorrectChoice = feedback?.correctChoiceIds.includes(c.id);
            const showWrong = feedback && isSel && !isCorrectChoice;
            return (
              <button
                key={c.id}
                type="button"
                disabled={!!feedback || pending}
                onClick={() => toggle(c.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left text-sm font-medium transition-all",
                  !feedback && isSel && "border-brand-500 bg-brand-50 text-brand-800",
                  !feedback && !isSel && "border-slate-100 hover:border-brand-200 hover:bg-slate-50",
                  feedback && isCorrectChoice && "border-brand-500 bg-brand-50 text-brand-800",
                  showWrong && "border-danger-300 bg-red-50 text-danger-600",
                  feedback && !isCorrectChoice && !showWrong && "border-slate-100 opacity-60"
                )}
              >
                <span className={cn("flex size-5 shrink-0 items-center justify-center rounded-full border-2", isSel || (feedback && isCorrectChoice) ? "border-current" : "border-slate-300")}>
                  {feedback && isCorrectChoice && <CheckCircle2 className="size-4" />}
                  {showWrong && <XCircle className="size-4" />}
                </span>
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback pédagogique */}
      {feedback && (
        <div className={cn("rounded-3xl border p-5", feedback.isCorrect ? "border-brand-200 bg-brand-50/60" : "border-danger-100 bg-red-50")}>
          <p className={cn("flex items-center gap-2 font-bold", feedback.isCorrect ? "text-brand-700" : "text-danger-600")}>
            {feedback.isCorrect ? <><CheckCircle2 className="size-5" /> Bonne réponse{feedback.earnedXp > 0 ? ` · +${feedback.earnedXp} XP` : ""}</> : <><XCircle className="size-5" /> Réponse incorrecte</>}
          </p>
          {feedback.explanation && <p className="mt-2 text-sm text-slate-600">{feedback.explanation}</p>}
          {feedback.legalText && (
            <div className="mt-3 flex flex-wrap items-center gap-2 rounded-2xl bg-white/70 px-3 py-2 text-sm">
              <Scale className="size-4 text-institutional-700" />
              <span className="font-medium text-ink">{feedback.legalText.title}</span>
              {feedback.articleRef && <span className="text-slate-400">· {feedback.articleRef}</span>}
              <span className="font-mono text-[11px] text-slate-400">{feedback.legalText.code}</span>
              {feedback.legalText.verificationLevel === "V0" && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600"><AlertTriangle className="size-3.5" /> à vérifier</span>
              )}
              <Link href={`/edulex/texts/${feedback.legalText.id}`} className="ml-auto text-xs font-semibold text-brand-700 hover:underline">Voir le texte →</Link>
            </div>
          )}
        </div>
      )}

      {error && <p className="text-sm font-medium text-danger-600">{error}</p>}

      <div className="flex justify-end">
        {!feedback ? (
          <Button onClick={validate} disabled={selected.size === 0 || pending}>
            {pending ? <Loader2 className="size-4 animate-spin" /> : null} Valider
          </Button>
        ) : (
          <Button onClick={next} disabled={pending}>
            {pending ? <Loader2 className="size-4 animate-spin" /> : null}
            {isLast ? "Terminer la leçon" : "Question suivante"} <ArrowRight className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
