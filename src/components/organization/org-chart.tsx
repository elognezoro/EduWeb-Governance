"use client";

import { useEffect, useMemo, useRef, useState, useTransition, type ReactNode, type DragEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Network, MapPin, Users, Pencil, Move, X, Landmark, Building2,
  AlertCircle, Loader2, ArrowDownToLine, GripVertical,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flag } from "@/components/ui/flag";
import { EmptyState } from "@/components/ui/empty-state";
import { FileUpload } from "@/components/ui/file-upload";
import { cn } from "@/lib/utils";
import { STRUCTURE_TYPE_MAP } from "@/lib/enums";
import { moveStructure } from "@/app/(app)/organization/actions";

export interface OrgNode {
  id: string;
  name: string;
  type: string;
  parentId: string | null;
  ministryId: string | null;
  organizationId: string;
  managerName: string | null;
  regionName: string | null;
  memberCount: number;
}
export interface OrgMinistry { id: string; name: string }
export interface OrgOrganization { id: string; name: string; type: string | null; countryCode: string | null; countryName: string | null; logoUrl: string | null }

type MoveTarget = { parentId?: string | null; ministryId?: string | null; organizationId?: string };

/** Applique un déplacement localement (mise à jour optimiste) : le nœud + son sous-arbre suivent. */
function applyMove(list: OrgNode[], id: string, target: MoveTarget): OrgNode[] {
  const childrenOf = new Map<string, string[]>();
  for (const s of list) if (s.parentId) (childrenOf.get(s.parentId) ?? childrenOf.set(s.parentId, []).get(s.parentId)!).push(s.id);
  const sub = new Set<string>();
  const stack = [id];
  while (stack.length) { const c = stack.pop()!; for (const ch of childrenOf.get(c) ?? []) if (!sub.has(ch)) { sub.add(ch); stack.push(ch); } }
  return list.map((n) => {
    if (n.id === id) return { ...n, parentId: target.parentId ?? null, ministryId: target.ministryId ?? null, organizationId: target.organizationId ?? n.organizationId };
    if (sub.has(n.id)) return { ...n, ministryId: target.ministryId ?? null, organizationId: target.organizationId ?? n.organizationId };
    return n;
  });
}

export function OrgChart({
  structures, ministries, organizations, canManage, filtered,
}: {
  structures: OrgNode[];
  ministries: OrgMinistry[];
  organizations: OrgOrganization[];
  canManage: boolean;
  filtered: boolean;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [live, setLive] = useState("");
  const [movingId, setMovingId] = useState<string | null>(null); // sélection « au clic »
  const [draggedId, setDraggedId] = useState<string | null>(null); // glisser-déposer
  const [overKey, setOverKey] = useState<string | null>(null);

  // Mise à jour optimiste : on affiche le résultat immédiatement, on réconcilie ensuite.
  const [override, setOverride] = useState<OrgNode[] | null>(null);
  const sig = useMemo(() => structures.map((s) => `${s.id}:${s.parentId}:${s.ministryId}:${s.organizationId}`).join("|"), [structures]);
  const prevSig = useRef(sig);
  useEffect(() => { if (sig !== prevSig.current) { prevSig.current = sig; setOverride(null); } }, [sig]);
  const nodes = override ?? structures;

  const activeId = movingId ?? draggedId; // structure en cours de relocalisation (clic ou glisser)

  const byId = useMemo(() => new Map(nodes.map((s) => [s.id, s])), [nodes]);
  const minName = useMemo(() => new Map(ministries.map((m) => [m.id, m.name])), [ministries]);
  const orgName = useMemo(() => new Map(organizations.map((o) => [o.id, o.name])), [organizations]);

  // Descendants de la structure active (cibles interdites) + elle-même.
  const invalid = useMemo(() => {
    const set = new Set<string>();
    if (!activeId) return set;
    const childrenOf = new Map<string, string[]>();
    for (const s of nodes) if (s.parentId) (childrenOf.get(s.parentId) ?? childrenOf.set(s.parentId, []).get(s.parentId)!).push(s.id);
    set.add(activeId);
    const stack = [activeId];
    while (stack.length) { const cur = stack.pop()!; for (const c of childrenOf.get(cur) ?? []) if (!set.has(c)) { set.add(c); stack.push(c); } }
    return set;
  }, [activeId, nodes]);

  const moving = movingId ? byId.get(movingId) ?? null : null;

  function move(target: MoveTarget) {
    const id = movingId ?? draggedId;
    if (!id || pending) return;
    const name = byId.get(id)?.name ?? "Structure";
    setError(null);
    setMovingId(null);
    setDraggedId(null);
    setOverKey(null);
    setOverride(applyMove(nodes, id, target)); // ⚡ affichage immédiat
    setLive(`Déplacement de ${name}…`);
    start(async () => {
      const res = await moveStructure({ id, ...target });
      if (!res.ok) { setError(res.error); setLive(`Échec du déplacement : ${res.error}`); setOverride(null); }
      else { setLive(`${name} déplacée avec succès.`); router.refresh(); }
    });
  }

  function toggleMove(id: string) {
    setError(null);
    const opening = movingId !== id;
    setMovingId(opening ? id : null);
    setLive(opening ? `Mode déplacement activé pour ${byId.get(id)?.name ?? ""}. Choisissez une destination.` : "Déplacement annulé.");
  }

  const withMin = nodes.filter((s) => s.ministryId);
  const noMin = nodes.filter((s) => !s.ministryId);
  const groups = ministries.map((m) => ({ m, items: withMin.filter((s) => s.ministryId === m.id) })).filter((g) => g.items.length > 0);

  function context(n: OrgNode): string | null {
    if (n.parentId && byId.has(n.parentId)) return `↳ sous ${byId.get(n.parentId)!.name}`;
    if (n.ministryId && minName.has(n.ministryId)) return `🏛 ${minName.get(n.ministryId)}`;
    return orgName.get(n.organizationId) ?? null;
  }

  // En-tête d'apex (ministère / organisation) : cible de dépôt (clic ou glisser).
  function ApexDropZone({ label, target, dropKey, children, className }: { label: string; target: MoveTarget; dropKey: string; children: ReactNode; className?: string }) {
    const armed = !!activeId;
    const clickable = !!movingId;
    const highlighted = clickable || overKey === dropKey;
    return (
      <div
        onClick={clickable ? () => move(target) : undefined}
        onKeyDown={clickable ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); move(target); } } : undefined}
        role={clickable ? "button" : undefined}
        tabIndex={clickable ? 0 : undefined}
        aria-label={clickable ? `Déplacer ici : ${label}` : undefined}
        onDragOver={(e: DragEvent) => { if (draggedId) { e.preventDefault(); setOverKey(dropKey); } }}
        onDragLeave={() => setOverKey((k) => (k === dropKey ? null : k))}
        onDrop={(e: DragEvent) => { if (draggedId) { e.preventDefault(); move(target); } }}
        className={cn(
          "rounded-2xl p-2 transition-all",
          armed && "ring-2 ring-brand-300",
          highlighted && "bg-brand-50/60 ring-brand-500",
          clickable && "cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-500",
          className,
        )}
      >
        {children}
        {armed && (
          <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-brand-700">
            <ArrowDownToLine className="size-3.5" /> Déposer ici — {label}
          </p>
        )}
      </div>
    );
  }

  const renderNodes = (list: OrgNode[], parentId: string | null, depth: number): ReactNode => {
    const ids = new Set(list.map((n) => n.id));
    const children = list.filter((n) => (parentId === null ? n.parentId === null || !ids.has(n.parentId) : n.parentId === parentId));
    if (children.length === 0) return null;
    return (
      <ul className={cn(depth > 0 && "ml-4 border-l border-slate-100 pl-4")}>
        {children.map((n) => {
          const typeLabel = STRUCTURE_TYPE_MAP[n.type]?.label ?? n.type;
          const ctx = context(n);
          const isMoving = movingId === n.id;
          const isBlocked = !!activeId && invalid.has(n.id);
          const isTarget = !!activeId && !invalid.has(n.id);
          const clickTarget = !!movingId && isTarget;
          const dropKey = `s:${n.id}`;
          const highlighted = clickTarget || overKey === dropKey;
          const moveTarget: MoveTarget = { parentId: n.id, ministryId: n.ministryId, organizationId: n.organizationId };
          return (
            <li key={n.id} className="mt-2">
              <div
                draggable={canManage && !movingId}
                onDragStart={(e: DragEvent) => { setDraggedId(n.id); setMovingId(null); e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/plain", n.id); }}
                onDragEnd={() => { setDraggedId(null); setOverKey(null); }}
                onDragOver={(e: DragEvent) => { if (draggedId && isTarget) { e.preventDefault(); setOverKey(dropKey); } }}
                onDragLeave={() => setOverKey((k) => (k === dropKey ? null : k))}
                onDrop={(e: DragEvent) => { if (draggedId && isTarget) { e.preventDefault(); move(moveTarget); } }}
                onClick={clickTarget ? () => move(moveTarget) : undefined}
                onKeyDown={clickTarget ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); move(moveTarget); } } : undefined}
                role={clickTarget ? "button" : undefined}
                tabIndex={clickTarget ? 0 : undefined}
                aria-label={clickTarget ? `Déplacer sous ${n.name}` : undefined}
                className={cn(
                  "group flex items-center gap-2.5 rounded-2xl border bg-card px-4 py-2.5 transition-all focus:outline-none",
                  isMoving ? "border-brand-400 bg-brand-50 ring-2 ring-brand-400"
                    : highlighted ? "cursor-pointer border-brand-400 bg-brand-50 ring-2 ring-brand-300 focus:ring-2 focus:ring-brand-400"
                    : isBlocked ? "border-slate-100 opacity-40"
                    : cn("border-slate-100 hover:bg-slate-50", canManage && !movingId && "cursor-move"),
                )}
              >
                {canManage && (!movingId || isMoving) && (
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); toggleMove(n.id); }}
                    aria-label={isMoving ? `Annuler le déplacement de ${n.name}` : `Déplacer ${n.name}`}
                    title={isMoving ? "Annuler le déplacement" : "Déplacer (ou glisser-déposer la ligne)"}
                    className={cn(
                      "shrink-0 rounded-lg p-1.5 transition-colors",
                      isMoving ? "bg-brand-600 text-white hover:bg-brand-700" : "text-slate-300 hover:bg-slate-100 hover:text-slate-600",
                    )}
                  >
                    {isMoving ? <X className="size-4" /> : <GripVertical className="size-4" />}
                  </button>
                )}
                <Network className="size-4 shrink-0 text-brand-600" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">{n.name}</p>
                  <p className="flex flex-wrap items-center gap-x-1 text-xs text-slate-400">
                    {typeLabel}
                    {n.managerName && <> · {n.managerName}</>}
                    {n.regionName && <span className="inline-flex items-center gap-0.5 text-institutional-600">· <MapPin className="size-3" /> {n.regionName}</span>}
                  </p>
                  {ctx && <p className="truncate text-[11px] text-slate-300">{ctx}</p>}
                </div>
                {isTarget && (
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-brand-600 px-2.5 py-1 text-[11px] font-bold text-white">
                    <ArrowDownToLine className="size-3" /> <span className="hidden sm:inline">Déposer ici</span>
                  </span>
                )}
                {isMoving && (
                  <span className="shrink-0 rounded-full bg-brand-100 px-2.5 py-1 text-[11px] font-bold text-brand-700">En déplacement</span>
                )}
                {!isTarget && (
                  <span className="hidden items-center gap-1 text-xs text-slate-400 sm:flex"><Users className="size-3.5" /> {n.memberCount}</span>
                )}
                {canManage && !movingId && (
                  <Link href={`/organization/structures/${n.id}`} onClick={(e) => e.stopPropagation()} draggable={false} className="text-slate-400 opacity-0 transition-opacity hover:text-brand-700 group-hover:opacity-100">
                    <Pencil className="size-4" />
                  </Link>
                )}
              </div>
              {renderNodes(list, n.id, depth + 1)}
            </li>
          );
        })}
      </ul>
    );
  };

  const empty = groups.length === 0 && organizations.length === 0;

  return (
    <div className="space-y-6">
      <div className="sr-only" role="status" aria-live="polite">{live}</div>
      {error && (
        <div role="alert" className="flex items-center gap-2 rounded-2xl border border-danger-100 bg-red-50 px-4 py-3 text-sm font-medium text-danger-600">
          <AlertCircle className="size-4 shrink-0" /> {error}
        </div>
      )}

      {/* Bandeau de déplacement actif (mode clic) */}
      {canManage && moving && (
        <div className="sticky top-2 z-20 flex flex-wrap items-center gap-3 rounded-2xl border border-brand-300 bg-brand-50 px-4 py-3 shadow-sm">
          {pending ? <Loader2 className="size-4 shrink-0 animate-spin text-brand-700" /> : <Move className="size-4 shrink-0 text-brand-700" />}
          <p className="text-sm text-brand-900">
            Déplacement de <b>{moving.name}</b> — cliquez sa nouvelle destination : un ministère, une organisation ou une structure parente (surlignés en vert).
          </p>
          <Button type="button" variant="ghost" size="sm" onClick={() => setMovingId(null)} disabled={pending} className="ml-auto">
            <X className="size-4" /> Annuler
          </Button>
        </div>
      )}

      {/* Aide */}
      {canManage && !moving && (
        <p className="flex items-center gap-2 text-xs text-slate-400">
          <Move className="size-3.5" />
          Glissez-déposez une structure sur sa destination, ou cliquez son icône <GripVertical className="inline size-3.5" /> puis la zone d'accueil surlignée.
        </p>
      )}

      {/* Par ministère technique (apex = ministère) */}
      {groups.length > 0 && (
        <section className="space-y-5">
          <h2 className="text-xs font-bold uppercase tracking-wide text-slate-400">Par ministère technique</h2>
          {groups.map(({ m, items }) => (
            <Card key={m.id}>
              <CardContent className="p-6">
                <ApexDropZone label={`racine de ${m.name}`} dropKey={`m:${m.id}`} target={{ parentId: null, ministryId: m.id }}>
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-700"><Landmark className="size-5" /></span>
                    <div>
                      <h3 className="font-extrabold text-institutional-900">{m.name}</h3>
                      <p className="text-xs text-slate-400">{items.length} structure(s) rattachée(s)</p>
                    </div>
                  </div>
                </ApexDropZone>
                <div className="mt-4">{renderNodes(items, null, 0)}</div>
              </CardContent>
            </Card>
          ))}
        </section>
      )}

      {/* Organisations clientes */}
      {organizations.length > 0 && (
        <section className="space-y-5">
          {groups.length > 0 && <h2 className="text-xs font-bold uppercase tracking-wide text-slate-400">Organisations clientes</h2>}
          {organizations.map((org) => {
            const orgStructures = noMin.filter((s) => s.organizationId === org.id);
            return (
              <Card key={org.id}>
                <CardContent className="p-6">
                  <ApexDropZone label={`racine de ${org.name}`} dropKey={`o:${org.id}`} target={{ parentId: null, ministryId: null, organizationId: org.id }}>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {org.logoUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={org.logoUrl} alt={org.name} className="size-11 shrink-0 rounded-2xl object-cover ring-1 ring-slate-200" />
                        ) : (
                          <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-institutional-50 text-institutional-700"><Building2 className="size-5" /></span>
                        )}
                        <div>
                          <h2 className="font-extrabold text-institutional-900">{org.name}</h2>
                          <p className="inline-flex items-center gap-1 text-xs text-slate-400">{org.countryCode && <><Flag code={org.countryCode} className="w-4" /> {org.countryName} · </>}{orgStructures.length} structure(s)</p>
                        </div>
                      </div>
                      {!activeId && (
                        <div className="flex items-center gap-2">
                          {org.type && <Badge tone="neutral">{org.type}</Badge>}
                          {canManage && <FileUpload purpose="logo" entityId={org.id} accept="image/*" label="Logo" variant="ghost" />}
                        </div>
                      )}
                    </div>
                  </ApexDropZone>
                  <div className="mt-4">
                    {orgStructures.length ? renderNodes(orgStructures, null, 0) : (
                      <p className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-400">{filtered ? "Aucune structure sur ce périmètre." : "Aucune structure non rattachée à un ministère."}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </section>
      )}

      {empty && <EmptyState icon={Building2} title="Aucune organisation" description="Créez une première organisation cliente." />}
    </div>
  );
}
