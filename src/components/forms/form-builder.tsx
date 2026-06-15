"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, ArrowUp, ArrowDown, Save, Loader2, AlertCircle, Send, Archive, Undo2, GripVertical } from "lucide-react";
import { Input, Label } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FIELD_TYPES, FIELD_TYPE_MAP, FORM_STATUS_MAP, metaOf } from "@/lib/enums";
import { saveForm, publishForm, setFormStatus, deleteForm } from "@/app/(app)/forms/actions";

interface FieldState {
  uid: string;
  label: string;
  type: string;
  required: boolean;
  optionsText: string;
}

export interface FormBuilderInitial {
  id: string;
  title: string;
  description: string;
  status: string;
  version: number;
  fields: { label: string; type: string; required: boolean; options: string[] }[];
}

let counter = 0;
const newUid = () => `f${Date.now()}_${counter++}`;

function slugify(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 40);
}

export function FormBuilder({ initial }: { initial: FormBuilderInitial }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const [title, setTitle] = useState(initial.title);
  const [description, setDescription] = useState(initial.description);
  const [fields, setFields] = useState<FieldState[]>(
    initial.fields.map((f) => ({ uid: newUid(), label: f.label, type: f.type, required: f.required, optionsText: f.options.join(", ") }))
  );

  function addField() {
    setFields((p) => [...p, { uid: newUid(), label: "", type: "TEXT", required: false, optionsText: "" }]);
  }
  function update(uid: string, patch: Partial<FieldState>) {
    setFields((p) => p.map((f) => (f.uid === uid ? { ...f, ...patch } : f)));
    setSaved(false);
  }
  function remove(uid: string) {
    setFields((p) => p.filter((f) => f.uid !== uid));
  }
  function move(uid: string, dir: -1 | 1) {
    setFields((p) => {
      const i = p.findIndex((f) => f.uid === uid);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= p.length) return p;
      const next = [...p];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }

  function save() {
    setError(null);
    setSaved(false);
    const used = new Set<string>();
    const payloadFields = fields.map((f, i) => {
      let key = slugify(f.label) || `champ_${i + 1}`;
      while (used.has(key)) key = `${key}_${i}`;
      used.add(key);
      const hasOptions = FIELD_TYPE_MAP[f.type]?.hasOptions;
      const options = hasOptions ? f.optionsText.split(",").map((o) => o.trim()).filter(Boolean) : undefined;
      return { label: f.label, fieldKey: key, type: f.type, required: f.required, order: i, options };
    });
    startTransition(async () => {
      const res = await saveForm(initial.id, { title, description, fields: payloadFields });
      if (!res.ok) setError(res.error);
      else { setSaved(true); router.refresh(); }
    });
  }

  function lifecycle(fn: () => Promise<{ ok: boolean; error?: string }>) {
    setError(null);
    startTransition(async () => {
      const res = await fn();
      if (!res.ok) setError(res.error ?? "Action impossible.");
      else router.refresh();
    });
  }

  const statusMeta = metaOf(FORM_STATUS_MAP, initial.status);

  return (
    <div className="space-y-6">
      {error && (
        <div className="flex items-center gap-2 rounded-2xl border border-danger-100 bg-red-50 px-4 py-3 text-sm font-medium text-danger-600">
          <AlertCircle className="size-4 shrink-0" /> {error}
        </div>
      )}

      {/* Métadonnées + statut */}
      <div className="rounded-3xl border border-slate-100 bg-card p-6 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <Badge tone={statusMeta.tone}>{statusMeta.label} · v{initial.version}</Badge>
          <div className="flex gap-2">
            {initial.status === "PUBLISHED" ? (
              <>
                <Button size="sm" variant="outline" onClick={() => lifecycle(() => setFormStatus(initial.id, "DRAFT"))} disabled={pending}><Undo2 className="size-4" /> Repasser en brouillon</Button>
                <Button size="sm" variant="ghost" onClick={() => lifecycle(() => setFormStatus(initial.id, "ARCHIVED"))} disabled={pending}><Archive className="size-4" /> Archiver</Button>
              </>
            ) : (
              <Button size="sm" variant="gold" onClick={() => lifecycle(() => publishForm(initial.id))} disabled={pending}><Send className="size-4" /> Publier</Button>
            )}
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2"><Label htmlFor="t">Titre du formulaire *</Label><Input id="t" value={title} onChange={(e) => { setTitle(e.target.value); setSaved(false); }} /></div>
          <div className="space-y-2"><Label htmlFor="d">Description</Label><Textarea id="d" value={description} onChange={(e) => { setDescription(e.target.value); setSaved(false); }} /></div>
        </div>
      </div>

      {/* Champs */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-400">Champs ({fields.length})</h3>
          <Button size="sm" variant="outline" onClick={addField}><Plus className="size-4" /> Ajouter un champ</Button>
        </div>

        {fields.length === 0 && (
          <p className="rounded-2xl border border-dashed border-slate-200 bg-card px-4 py-8 text-center text-sm text-slate-400">
            Aucun champ. Cliquez sur « Ajouter un champ » pour composer votre formulaire.
          </p>
        )}

        {fields.map((f, i) => {
          const hasOptions = FIELD_TYPE_MAP[f.type]?.hasOptions;
          return (
            <div key={f.uid} className="rounded-2xl border border-slate-100 bg-card p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="mt-2 flex flex-col items-center gap-1 text-slate-300">
                  <button type="button" onClick={() => move(f.uid, -1)} disabled={i === 0} className="hover:text-brand-700 disabled:opacity-30"><ArrowUp className="size-4" /></button>
                  <GripVertical className="size-4" />
                  <button type="button" onClick={() => move(f.uid, 1)} disabled={i === fields.length - 1} className="hover:text-brand-700 disabled:opacity-30"><ArrowDown className="size-4" /></button>
                </span>
                <div className="grid flex-1 gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5"><Label>Libellé</Label><Input value={f.label} onChange={(e) => update(f.uid, { label: e.target.value })} placeholder="Ex. Date de l'activité" /></div>
                  <div className="space-y-1.5">
                    <Label>Type</Label>
                    <Select value={f.type} onChange={(e) => update(f.uid, { type: e.target.value })}>
                      {FIELD_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </Select>
                  </div>
                  {hasOptions && (
                    <div className="space-y-1.5 sm:col-span-2"><Label>Options (séparées par des virgules)</Label><Input value={f.optionsText} onChange={(e) => update(f.uid, { optionsText: e.target.value })} placeholder="Option A, Option B, Option C" /></div>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button type="button" onClick={() => remove(f.uid)} className="text-slate-400 hover:text-danger-500"><Trash2 className="size-4" /></button>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    <input type="checkbox" checked={f.required} onChange={(e) => update(f.uid, { required: e.target.checked })} className="size-3.5 rounded border-slate-300 text-brand-600" />
                    Requis
                  </label>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Barre d'enregistrement */}
      <div className="sticky bottom-4 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white/90 p-3 shadow-card backdrop-blur">
        <Button onClick={save} disabled={pending}>
          {pending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />} Enregistrer
        </Button>
        {saved && <span className="text-sm font-medium text-brand-700">✓ Enregistré</span>}
        <div className="ml-auto">
          <Button variant="ghost" onClick={() => lifecycle(() => deleteForm(initial.id))} disabled={pending} className="text-danger-500 hover:bg-red-50">
            <Trash2 className="size-4" /> Supprimer le formulaire
          </Button>
        </div>
      </div>
    </div>
  );
}
