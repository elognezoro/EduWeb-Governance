"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, Plus, Trash2, Save, Loader2, Check, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { saveValidationHierarchy } from "@/app/(app)/admin/actions";

interface Role { key: string; name: string }

export function ValidationHierarchyEditor({
  levels,
  governanceRoles,
}: {
  levels: { roleKey: string; name: string }[];
  governanceRoles: Role[];
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [chain, setChain] = useState<string[]>(levels.map((l) => l.roleKey));
  const [toAdd, setToAdd] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nameByKey = useMemo(() => new Map(governanceRoles.map((r) => [r.key, r.name])), [governanceRoles]);
  const available = governanceRoles.filter((r) => !chain.includes(r.key));

  const initial = levels.map((l) => l.roleKey).join("|");
  const dirty = chain.join("|") !== initial;

  function move(i: number, dir: -1 | 1) {
    setChain((c) => {
      const n = [...c];
      const j = i + dir;
      if (j < 0 || j >= n.length) return c;
      [n[i], n[j]] = [n[j], n[i]];
      return n;
    });
    setSaved(false);
  }
  function remove(i: number) {
    setChain((c) => c.filter((_, idx) => idx !== i));
    setSaved(false);
  }
  function add() {
    if (!toAdd) return;
    setChain((c) => [...c, toAdd]);
    setToAdd("");
    setSaved(false);
  }
  function save() {
    setError(null);
    start(async () => {
      const res = await saveValidationHierarchy(chain);
      if (res.ok) { setSaved(true); router.refresh(); }
      else setError(res.error);
    });
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-500">
        Une activité soumise franchit ces niveaux <strong>dans l'ordre</strong> : chaque niveau doit valider avant
        de passer au suivant ; le dernier niveau prononce la validation finale. Une chaîne vide rétablit la
        validation en une seule étape.
      </p>

      {/* Chaîne ordonnée */}
      {chain.length > 0 ? (
        <ol className="space-y-2">
          {chain.map((key, i) => (
            <li key={key} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-card p-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                {i + 1}
              </span>
              <span className="flex-1 text-sm font-semibold text-ink">{nameByKey.get(key) ?? key}</span>
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Monter"
                  className="flex size-8 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-ink disabled:opacity-30">
                  <ArrowUp className="size-4" />
                </button>
                <button type="button" onClick={() => move(i, 1)} disabled={i === chain.length - 1} aria-label="Descendre"
                  className="flex size-8 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-ink disabled:opacity-30">
                  <ArrowDown className="size-4" />
                </button>
                <button type="button" onClick={() => remove(i)} aria-label="Retirer"
                  className="flex size-8 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-red-50 hover:text-danger-600">
                  <Trash2 className="size-4" />
                </button>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <div className="flex items-center gap-2 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
          <GitBranch className="size-4" /> Aucun niveau : validation en une seule étape (tout valideur habilité).
        </div>
      )}

      {/* Ajout d'un niveau */}
      {available.length > 0 && (
        <div className="flex items-center gap-2">
          <Select value={toAdd} onChange={(e) => setToAdd(e.target.value)} className="flex-1">
            <option value="">— Ajouter un niveau (rôle) —</option>
            {available.map((r) => <option key={r.key} value={r.key}>{r.name}</option>)}
          </Select>
          <Button type="button" variant="outline" onClick={add} disabled={!toAdd}>
            <Plus className="size-4" /> Ajouter
          </Button>
        </div>
      )}

      <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
        <Button onClick={save} disabled={pending || !dirty}>
          {pending ? <Loader2 className="size-4 animate-spin" /> : saved && !dirty ? <Check className="size-4" /> : <Save className="size-4" />}
          {saved && !dirty ? "Hiérarchie enregistrée" : "Enregistrer la hiérarchie"}
        </Button>
        {error && <p className="text-sm font-medium text-danger-600">{error}</p>}
      </div>
    </div>
  );
}
