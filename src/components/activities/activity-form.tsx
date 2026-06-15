"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle, Save, Link2 } from "lucide-react";
import { Input, Label } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { createActivity, updateActivity, type ActivityInput } from "@/app/(app)/activities/actions";

interface Option { id: string; name: string }
interface TextOption { id: string; code: string; title: string }

export interface ActivityFormInitial {
  id: string;
  title: string;
  description: string;
  structureId: string | null;
  periodStart: string;
  periodEnd: string;
  legalTextIds: string[];
}

export function ActivityForm({
  structures,
  texts,
  initial,
}: {
  structures: Option[];
  texts: TextOption[];
  initial?: ActivityFormInitial;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [structureId, setStructureId] = useState(initial?.structureId ?? "");
  const [periodStart, setPeriodStart] = useState(initial?.periodStart ?? "");
  const [periodEnd, setPeriodEnd] = useState(initial?.periodEnd ?? "");
  const [selected, setSelected] = useState<Set<string>>(new Set(initial?.legalTextIds ?? []));

  function toggleText(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const payload: ActivityInput = {
      title,
      description,
      structureId: structureId || undefined,
      periodStart: periodStart || undefined,
      periodEnd: periodEnd || undefined,
      legalTextIds: [...selected],
    };
    startTransition(async () => {
      const res = initial
        ? await updateActivity(initial.id, payload)
        : await createActivity(payload);
      // createActivity redirige côté serveur ; on ne reçoit res qu'en cas d'erreur.
      if (res && !res.ok) {
        setError(res.error);
      } else if (initial && res?.ok) {
        router.push(`/activities/${initial.id}`);
        router.refresh();
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {error && (
        <div className="flex items-center gap-2 rounded-2xl border border-danger-100 bg-red-50 px-4 py-3 text-sm font-medium text-danger-600">
          <AlertCircle className="size-4 shrink-0" /> {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="title">Intitulé de l'activité *</Label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex. Atelier de formation continue – Région des Lagunes" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Décrivez l'activité, ses objectifs et ses résultats…" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="structure">Structure</Label>
          <Select id="structure" value={structureId} onChange={(e) => setStructureId(e.target.value)}>
            <option value="">— Aucune / par défaut —</option>
            {structures.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="ps">Début de période</Label>
            <Input id="ps" type="date" value={periodStart} onChange={(e) => setPeriodStart(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pe">Fin de période</Label>
            <Input id="pe" type="date" value={periodEnd} onChange={(e) => setPeriodEnd(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-1.5"><Link2 className="size-4 text-brand-700" /> Textes EduLex associés</Label>
        {texts.length ? (
          <div className="grid max-h-56 gap-2 overflow-y-auto rounded-2xl border border-slate-100 p-3 sm:grid-cols-2">
            {texts.map((t) => (
              <label key={t.id} className="flex cursor-pointer items-start gap-2.5 rounded-xl p-2 hover:bg-slate-50">
                <input type="checkbox" checked={selected.has(t.id)} onChange={() => toggleText(t.id)} className="mt-0.5 size-4 rounded border-slate-300 text-brand-600 focus:ring-brand-600" />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-ink">{t.title}</span>
                  <span className="block font-mono text-[11px] text-slate-400">{t.code}</span>
                </span>
              </label>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400">Aucun texte disponible pour ce périmètre.</p>
        )}
      </div>

      <div className="flex items-center gap-3 border-t border-slate-100 pt-5">
        <Button type="submit" disabled={pending}>
          {pending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          {initial ? "Enregistrer les modifications" : "Créer le brouillon"}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.back()} disabled={pending}>
          Annuler
        </Button>
      </div>
    </form>
  );
}
