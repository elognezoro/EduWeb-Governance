"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle, Save, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { Input, Label } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createQuestion, type QuestionInput } from "@/app/(app)/academy/admin/actions";

interface LessonOpt { id: string; label: string }
interface TextOpt { id: string; code: string; title: string }
interface SectorOpt { id: string; name: string }

const TYPES = [
  { value: "QCU", label: "QCU (une seule bonne réponse)" },
  { value: "QCM", label: "QCM (plusieurs bonnes réponses)" },
  { value: "TRUE_FALSE", label: "Vrai / Faux" },
];

export function QuestionForm({ lessons, legalTexts, sectors }: { lessons: LessonOpt[]; legalTexts: TextOpt[]; sectors: SectorOpt[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [lessonId, setLessonId] = useState(lessons[0]?.id ?? "");
  const [type, setType] = useState("QCU");
  const [prompt, setPrompt] = useState("");
  const [explanation, setExplanation] = useState("");
  const [difficulty, setDifficulty] = useState("EASY");
  const [points, setPoints] = useState(10);
  const [level, setLevel] = useState(1);
  const [status, setStatus] = useState("PUBLISHED");
  const [legalTextId, setLegalTextId] = useState("");
  const [articleRef, setArticleRef] = useState("");
  const [sectorId, setSectorId] = useState("");
  const [choices, setChoices] = useState<{ label: string; isCorrect: boolean }[]>([
    { label: "", isCorrect: true },
    { label: "", isCorrect: false },
  ]);

  function changeType(t: string) {
    setType(t);
    if (t === "TRUE_FALSE") setChoices([{ label: "Vrai", isCorrect: false }, { label: "Faux", isCorrect: true }]);
  }

  function setChoice(i: number, patch: Partial<{ label: string; isCorrect: boolean }>) {
    setChoices((prev) => prev.map((c, idx) => {
      if (idx !== i) {
        // QCU / TRUE_FALSE : une seule bonne réponse
        if (patch.isCorrect && type !== "QCM") return { ...c, isCorrect: false };
        return c;
      }
      return { ...c, ...patch };
    }));
  }
  const addChoice = () => setChoices((p) => [...p, { label: "", isCorrect: false }]);
  const removeChoice = (i: number) => setChoices((p) => p.filter((_, idx) => idx !== i));

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const payload: QuestionInput = {
      lessonId, type, prompt, explanation: explanation || undefined,
      difficulty, points, level, status,
      legalTextId: legalTextId || undefined,
      articleRef: articleRef || undefined,
      sectorId: sectorId || undefined,
      choices: choices.filter((c) => c.label.trim()),
    };
    startTransition(async () => {
      const res = await createQuestion(payload);
      if (res && !res.ok) setError(res.error);
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {error && (
        <div className="flex items-center gap-2 rounded-2xl border border-danger-100 bg-red-50 px-4 py-3 text-sm font-medium text-danger-600">
          <AlertCircle className="size-4 shrink-0" /> {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Leçon de rattachement *</Label>
          <Select value={lessonId} onChange={(e) => setLessonId(e.target.value)} required>
            {lessons.map((l) => <option key={l.id} value={l.id}>{l.label}</option>)}
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Type de question *</Label>
          <Select value={type} onChange={(e) => changeType(e.target.value)}>
            {TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Énoncé *</Label>
        <Textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Posez la question…" required />
      </div>

      {/* Réponses */}
      <div className="space-y-2">
        <Label>Réponses (cochez la/les bonne(s)) *</Label>
        <div className="space-y-2">
          {choices.map((c, i) => (
            <div key={i} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setChoice(i, { isCorrect: !c.isCorrect })}
                className={cn("flex size-9 shrink-0 items-center justify-center rounded-xl border-2 transition-colors", c.isCorrect ? "border-brand-500 bg-brand-50 text-brand-700" : "border-slate-200 text-slate-300 hover:border-brand-200")}
                title="Marquer comme correcte"
              >
                <CheckCircle2 className="size-5" />
              </button>
              <Input value={c.label} onChange={(e) => setChoice(i, { label: e.target.value })} placeholder={`Réponse ${i + 1}`} className="flex-1" />
              {choices.length > 2 && type !== "TRUE_FALSE" && (
                <button type="button" onClick={() => removeChoice(i)} className="text-slate-400 hover:text-danger-500"><Trash2 className="size-4" /></button>
              )}
            </div>
          ))}
        </div>
        {type !== "TRUE_FALSE" && (
          <Button type="button" variant="outline" size="sm" onClick={addChoice}><Plus className="size-4" /> Ajouter une réponse</Button>
        )}
      </div>

      <div className="space-y-2">
        <Label>Explication pédagogique (feedback)</Label>
        <Textarea value={explanation} onChange={(e) => setExplanation(e.target.value)} placeholder="Affichée après la réponse pour expliquer…" />
      </div>

      {/* Liaison texte source */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Texte EduLex source</Label>
          <Select value={legalTextId} onChange={(e) => setLegalTextId(e.target.value)}>
            <option value="">— Aucun —</option>
            {legalTexts.map((t) => <option key={t.id} value={t.id}>{t.title}</option>)}
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Article / disposition</Label>
          <Input value={articleRef} onChange={(e) => setArticleRef(e.target.value)} placeholder="Ex. Article 12" />
        </div>
        <div className="space-y-2">
          <Label>Secteur</Label>
          <Select value={sectorId} onChange={(e) => setSectorId(e.target.value)}>
            <option value="">—</option>
            {sectors.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </Select>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-2">
            <Label>Difficulté</Label>
            <Select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option value="EASY">Facile</option><option value="MEDIUM">Moyen</option><option value="HARD">Difficile</option>
            </Select>
          </div>
          <div className="space-y-2"><Label>Points</Label><Input type="number" min={1} max={100} value={points} onChange={(e) => setPoints(Number(e.target.value))} /></div>
          <div className="space-y-2"><Label>Niveau</Label><Input type="number" min={1} max={5} value={level} onChange={(e) => setLevel(Number(e.target.value))} /></div>
        </div>
      </div>

      <div className="space-y-2 sm:max-w-xs">
        <Label>Statut</Label>
        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="PUBLISHED">Publiée</option><option value="DRAFT">Brouillon</option><option value="SUSPENDED">Suspendue</option>
        </Select>
      </div>

      <div className="flex items-center gap-3 border-t border-slate-100 pt-5">
        <Button type="submit" disabled={pending}>
          {pending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />} Créer la question
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.back()} disabled={pending}>Annuler</Button>
      </div>
    </form>
  );
}
