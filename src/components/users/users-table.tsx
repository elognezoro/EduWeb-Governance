"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, Loader2, X, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, initials } from "@/lib/utils";
import { deleteUser, deleteUsers } from "@/app/(app)/users/actions";

export interface UserRow {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  roles: string[];
  structure: string | null;
}

export function UsersTable({ users, currentUserId }: { users: UserRow[]; currentUserId: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [confirmRow, setConfirmRow] = useState<string | null>(null);
  const [confirmBulk, setConfirmBulk] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectableIds = users.filter((u) => u.id !== currentUserId).map((u) => u.id);
  const allSelected = selectableIds.length > 0 && selectableIds.every((id) => selected.has(id));

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }
  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(selectableIds));
  }

  function removeOne(id: string) {
    setError(null);
    startTransition(async () => {
      const res = await deleteUser(id);
      if (!res.ok) setError(res.error);
      else { setConfirmRow(null); setSelected((p) => { const n = new Set(p); n.delete(id); return n; }); router.refresh(); }
    });
  }
  function removeBulk() {
    setError(null);
    startTransition(async () => {
      const res = await deleteUsers([...selected]);
      if (!res.ok) setError(res.error);
      else { setConfirmBulk(false); setSelected(new Set()); router.refresh(); }
    });
  }

  return (
    <div className="space-y-3">
      {/* Barre d'actions groupées */}
      {selected.size > 0 && (
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
                <span className="font-medium text-danger-600">Supprimer {selected.size} compte(s) ?</span>
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
              <th className="w-10 px-4 py-3">
                <input type="checkbox" checked={allSelected} onChange={toggleAll} aria-label="Tout sélectionner"
                  className="size-4 rounded border-slate-300 text-brand-600 focus:ring-brand-600" />
              </th>
              <th className="px-3 py-3">Utilisateur</th>
              <th className="hidden px-5 py-3 lg:table-cell">Rôles</th>
              <th className="hidden px-5 py-3 md:table-cell">Structure</th>
              <th className="px-5 py-3">Statut</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((u) => {
              const isSelf = u.id === currentUserId;
              return (
                <tr key={u.id} className={cn("group transition-colors hover:bg-slate-50", selected.has(u.id) && "bg-brand-50/40")}>
                  <td className="px-4 py-3">
                    <input type="checkbox" checked={selected.has(u.id)} onChange={() => toggle(u.id)} disabled={isSelf}
                      aria-label={`Sélectionner ${u.firstName} ${u.lastName}`}
                      className="size-4 rounded border-slate-300 text-brand-600 focus:ring-brand-600 disabled:opacity-40" />
                  </td>
                  <td className="px-3 py-3">
                    <Link href={`/users/${u.id}`} className="flex items-center gap-3">
                      <span className="flex size-9 items-center justify-center rounded-xl bg-brand-50 text-xs font-bold text-brand-700">{initials(u.firstName, u.lastName)}</span>
                      <span>
                        <span className="block font-semibold text-ink group-hover:text-brand-700">{u.firstName} {u.lastName}{isSelf && <span className="ml-1.5 text-xs font-medium text-slate-400">(vous)</span>}</span>
                        <span className="block text-xs text-slate-400">{u.email}</span>
                      </span>
                    </Link>
                  </td>
                  <td className="hidden px-5 py-3 lg:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {u.roles.slice(0, 2).map((r) => <Badge key={r} tone="brand">{r}</Badge>)}
                      {u.roles.length > 2 && <span className="text-xs text-slate-400">+{u.roles.length - 2}</span>}
                      {u.roles.length === 0 && <span className="text-xs text-slate-400">—</span>}
                    </div>
                  </td>
                  <td className="hidden px-5 py-3 text-slate-500 md:table-cell">{u.structure ?? "—"}</td>
                  <td className="px-5 py-3"><Badge tone={u.isActive ? "success" : "neutral"} dot>{u.isActive ? "Actif" : "Inactif"}</Badge></td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end">
                      {isSelf ? (
                        <span className="text-xs text-slate-300">—</span>
                      ) : confirmRow === u.id ? (
                        <span className="inline-flex items-center gap-2 text-xs">
                          <button onClick={() => removeOne(u.id)} disabled={pending} className="inline-flex items-center gap-1 font-bold text-danger-600 hover:underline">
                            {pending && <Loader2 className="size-3 animate-spin" />} Confirmer
                          </button>
                          <button onClick={() => setConfirmRow(null)} className="text-slate-400 hover:underline">Annuler</button>
                        </span>
                      ) : (
                        <button onClick={() => setConfirmRow(u.id)} title="Supprimer" className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-danger-500">
                          <Trash2 className="size-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
