"use client";

import { useState, useTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2, AlertCircle, Pencil, Save, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface RefItem {
  id: string;
  cells: ReactNode[];
  /** Valeurs brutes pour l'édition en ligne (nom = colonne 0, code = colonne 1). */
  name?: string;
  code?: string | null;
}
type OneResult = { ok: boolean; error?: string };
type ManyResult = { ok: boolean; error?: string; deleted?: number };

export function ReferenceDeleteTable({
  headers,
  items,
  canManage,
  onDeleteOne,
  onDeleteMany,
  onUpdate,
  entityLabel = "élément",
}: {
  headers: string[];
  items: RefItem[];
  canManage: boolean;
  onDeleteOne: (id: string) => Promise<OneResult>;
  onDeleteMany: (ids: string[]) => Promise<ManyResult>;
  /** Si fourni, active l'édition en ligne (nom + code). */
  onUpdate?: (id: string, data: { name: string; code: string }) => Promise<OneResult>;
  entityLabel?: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [confirmRow, setConfirmRow] = useState<string | null>(null);
  const [confirmBulk, setConfirmBulk] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editCode, setEditCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  const allSelected = items.length > 0 && items.every((i) => selected.has(i.id));
  const toggle = (id: string) => setSelected((p) => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleAll = () => setSelected(allSelected ? new Set() : new Set(items.map((i) => i.id)));

  function startEdit(it: RefItem) {
    setError(null); setConfirmRow(null);
    setEditId(it.id); setEditName(it.name ?? ""); setEditCode(it.code ?? "");
  }
  function saveEdit(id: string) {
    if (!onUpdate) return;
    setError(null);
    startTransition(async () => {
      const res = await onUpdate(id, { name: editName, code: editCode });
      if (!res.ok) setError(res.error ?? "Modification impossible.");
      else { setEditId(null); router.refresh(); }
    });
  }
  function removeOne(id: string) {
    setError(null);
    startTransition(async () => {
      const res = await onDeleteOne(id);
      if (!res.ok) setError(res.error ?? "Suppression impossible.");
      else { setConfirmRow(null); setSelected((p) => { const n = new Set(p); n.delete(id); return n; }); router.refresh(); }
    });
  }
  function removeBulk() {
    setError(null);
    startTransition(async () => {
      const res = await onDeleteMany([...selected]);
      if (!res.ok) setError(res.error ?? "Suppression impossible.");
      else { setConfirmBulk(false); setSelected(new Set()); router.refresh(); }
    });
  }

  return (
    <div className="space-y-3">
      {canManage && selected.size > 0 && (
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-brand-100 bg-brand-50/60 px-4 py-2.5">
          <span className="text-sm font-semibold text-brand-800">{selected.size} sélectionné(s)</span>
          <button onClick={() => setSelected(new Set())} className="text-xs font-medium text-slate-500 hover:underline">Tout désélectionner</button>
          <div className="ml-auto">
            {!confirmBulk ? (
              <Button size="sm" variant="danger" onClick={() => setConfirmBulk(true)} disabled={pending}>
                <Trash2 className="size-4" /> Supprimer la sélection
              </Button>
            ) : (
              <span className="inline-flex items-center gap-2 text-sm">
                <span className="font-medium text-danger-600">Supprimer {selected.size} {entityLabel}(s) ?</span>
                <button onClick={removeBulk} disabled={pending} className="inline-flex items-center gap-1 font-bold text-danger-600 hover:underline">
                  {pending && <Loader2 className="size-3.5 animate-spin" />} Oui, supprimer
                </button>
                <button onClick={() => setConfirmBulk(false)} className="text-slate-500 hover:underline">Annuler</button>
              </span>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 rounded-2xl border border-danger-100 bg-red-50 px-4 py-3 text-sm font-medium text-danger-600">
          <AlertCircle className="size-4 shrink-0" /> {error}
        </div>
      )}

      <div className="overflow-hidden rounded-3xl border border-slate-100 bg-card shadow-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
              {canManage && (
                <th className="w-10 px-4 py-3">
                  <input type="checkbox" checked={allSelected} onChange={toggleAll} aria-label="Tout sélectionner"
                    className="size-4 rounded border-slate-300 text-brand-600 focus:ring-brand-600" />
                </th>
              )}
              {headers.map((h) => <th key={h} className="px-5 py-3">{h}</th>)}
              {canManage && <th className="px-5 py-3 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((it) => {
              const editing = editId === it.id;
              return (
                <tr key={it.id} className={cn("transition-colors hover:bg-slate-50", selected.has(it.id) && "bg-brand-50/40", editing && "bg-brand-50/30")}>
                  {canManage && (
                    <td className="px-4 py-3">
                      <input type="checkbox" checked={selected.has(it.id)} onChange={() => toggle(it.id)} disabled={editing} aria-label="Sélectionner"
                        className="size-4 rounded border-slate-300 text-brand-600 focus:ring-brand-600 disabled:opacity-40" />
                    </td>
                  )}
                  {it.cells.map((c, i) => {
                    if (editing && onUpdate && i === 0) return <td key={i} className="px-5 py-2"><Input value={editName} onChange={(e) => setEditName(e.target.value)} autoFocus /></td>;
                    if (editing && onUpdate && i === 1) return <td key={i} className="px-5 py-2"><Input value={editCode} onChange={(e) => setEditCode(e.target.value)} placeholder="Code" className="max-w-[9rem] uppercase" /></td>;
                    return <td key={i} className="px-5 py-3">{c}</td>;
                  })}
                  {canManage && (
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-1">
                        {editing ? (
                          <>
                            <Button size="sm" onClick={() => saveEdit(it.id)} disabled={pending}>
                              {pending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />} Enregistrer
                            </Button>
                            <button onClick={() => setEditId(null)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100" title="Annuler"><X className="size-4" /></button>
                          </>
                        ) : confirmRow === it.id ? (
                          <span className="inline-flex items-center gap-2 text-xs">
                            <button onClick={() => removeOne(it.id)} disabled={pending} className="inline-flex items-center gap-1 font-bold text-danger-600 hover:underline">
                              {pending && <Loader2 className="size-3 animate-spin" />} Confirmer
                            </button>
                            <button onClick={() => setConfirmRow(null)} className="text-slate-400 hover:underline">Annuler</button>
                          </span>
                        ) : (
                          <>
                            {onUpdate && (
                              <button onClick={() => startEdit(it)} title="Modifier" className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-brand-700">
                                <Pencil className="size-4" />
                              </button>
                            )}
                            <button onClick={() => setConfirmRow(it.id)} title="Supprimer" className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-danger-500">
                              <Trash2 className="size-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
