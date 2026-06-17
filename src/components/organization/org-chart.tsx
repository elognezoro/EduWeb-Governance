"use client";

import { useMemo, useState, useTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Network, MapPin, Users, Pencil, Move, X, Landmark, Building2,
  AlertCircle, Loader2, ArrowDownToLine,
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
  // Déplacement « au clic » : on sélectionne une structure, puis on clique sa destination.
  const [movingId, setMovingId] = useState<string | null>(null);
  const [live, setLive] = useState(""); // annonces pour lecteurs d'écran

  const byId = useMemo(() => new Map(structures.map((s) => [s.id, s])), [structures]);
  const minName = useMemo(() => new Map(ministries.map((m) => [m.id, m.name])), [ministries]);
  const orgName = useMemo(() => new Map(organizations.map((o) => [o.id, o.name])), [organizations]);

  // Descendants de la structure en cours de déplacement (cibles interdites) + elle-même.
  const invalid = useMemo(() => {
    const set = new Set<string>();
    if (!movingId) return set;
    const childrenOf = new Map<string, string[]>();
    for (const s of structures) if (s.parentId) (childrenOf.get(s.parentId) ?? childrenOf.set(s.parentId, []).get(s.parentId)!).push(s.id);
    set.add(movingId);
    const stack = [movingId];
    while (stack.length) {
      const cur = stack.pop()!;
      for (const c of childrenOf.get(cur) ?? []) if (!set.has(c)) { set.add(c); stack.push(c); }
    }
    return set;
  }, [movingId, structures]);

  const moving = movingId ? byId.get(movingId) ?? null : null;

  function move(target: MoveTarget) {
    if (!movingId || pending) return;
    const id = movingId;
    const name = byId.get(id)?.name ?? "Structure";
    setError(null);
    start(async () => {
      const res = await moveStructure({ id, ...target });
      if (!res.ok) { setError(res.error); setLive(`Échec du déplacement : ${res.error}`); }
      else { setMovingId(null); setLive(`${name} déplacée avec succès.`); router.refresh(); }
    });
  }

  function toggleMove(id: string) {
    setError(null);
    const opening = movingId !== id;
    setMovingId(opening ? id : null);
    setLive(opening ? `Mode déplacement activé pour ${byId.get(id)?.name ?? ""}. Choisissez une destination.` : "Déplacement annulé.");
  }

  const withMin = structures.filter((s) => s.ministryId);
  const noMin = structures.filter((s) => !s.ministryId);
  const groups = ministries.map((m) => ({ m, items: withMin.filter((s) => s.ministryId === m.id) })).filter((g) => g.items.length > 0);

  function context(n: OrgNode): string | null {
    if (n.parentId && byId.has(n.parentId)) return `↳ sous ${byId.get(n.parentId)!.name}`;
    if (n.ministryId && minName.has(n.ministryId)) return `🏛 ${minName.get(n.ministryId)}`;
    return orgName.get(n.organizationId) ?? null;
  }

  // En-tête d'apex (ministère / organisation) : devient une cible cliquable pendant un déplacement.
  function ApexDropZone({ label, target, children, className }: { label: string; target: MoveTarget; children: ReactNode; className?: string }) {
    const armed = !!movingId;
    return (
      <div
        onClick={armed ? () => move(target) : undefined}
        onKeyDown={armed ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); move(target); } } : undefined}
        role={armed ? "button" : undefined}
        tabIndex={armed ? 0 : undefined}
        aria-label={armed ? `Déplacer ici : ${label}` : undefined}
        className={cn(
          "rounded-2xl p-2 transition-all",
          armed && "cursor-pointer ring-2 ring-brand-300 hover:ring-brand-500 hover:bg-brand-50/60 focus:outline-none focus:ring-2 focus:ring-brand-500",
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

  const renderNodes = (nodes: OrgNode[], parentId: string | null, depth: number): ReactNode => {
    const ids = new Set(nodes.map((n) => n.id));
    const children = nodes.filter((n) => (parentId === null ? n.parentId === null || !ids.has(n.parentId) : n.parentId === parentId));
    if (children.length === 0) return null;
    return (
      <ul className={cn(depth > 0 && "ml-4 border-l border-slate-100 pl-4")}>
        {children.map((n) => {
          const typeLabel = STRUCTURE_TYPE_MAP[n.type]?.label ?? n.type;
          const ctx = context(n);
          const isMoving = movingId === n.id;
          const isBlocked = !!movingId && invalid.has(n.id);
          const isTarget = !!movingId && !invalid.has(n.id);
          return (
            <li key={n.id} className="mt-2">
              <div
                onClick={isTarget ? () => move({ parentId: n.id, ministryId: n.ministryId, organizationId: n.organizationId }) : undefined}
                onKeyDown={isTarget ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); move({ parentId: n.id, ministryId: n.ministryId, organizationId: n.organizationId }); } } : undefined}
                role={isTarget ? "button" : undefined}
                tabIndex={isTarget ? 0 : undefined}
                aria-label={isTarget ? `Déplacer sous ${n.name}` : undefined}
                className={cn(
                  "group flex items-center gap-2.5 rounded-2xl border bg-card px-4 py-2.5 transition-all focus:outline-none",
                  isMoving && "border-brand-400 bg-brand-50 ring-2 ring-brand-400",
                  isTarget && "cursor-pointer border-brand-200 bg-brand-50/30 hover:border-brand-400 hover:bg-brand-50 hover:ring-2 hover:ring-brand-300 focus:ring-2 focus:ring-brand-400",
                  isBlocked && "border-slate-100 opacity-40",
                  !movingId && "border-slate-100 hover:bg-slate-50",
                )}
              >
                {canManage && (!movingId || isMoving) && (
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); toggleMove(n.id); }}
                    aria-label={isMoving ? `Annuler le déplacement de ${n.name}` : `Déplacer ${n.name}`}
                    title={isMoving ? "Annuler le déplacement" : "Déplacer cette structure"}
                    className={cn(
                      "shrink-0 rounded-lg p-1.5 transition-colors",
                      isMoving ? "bg-brand-600 text-white hover:bg-brand-700" : "text-slate-300 hover:bg-slate-100 hover:text-slate-600",
                    )}
                  >
                    {isMoving ? <X className="size-4" /> : <Move className="size-4" />}
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
                  <Link href={`/organization/structures/${n.id}`} onClick={(e) => e.stopPropagation()} className="text-slate-400 opacity-0 transition-opacity hover:text-brand-700 group-hover:opacity-100">
                    <Pencil className="size-4" />
                  </Link>
                )}
              </div>
              {renderNodes(nodes, n.id, depth + 1)}
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

      {/* Bandeau de déplacement actif */}
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

      {/* Aide quand aucun déplacement en cours */}
      {canManage && !moving && (
        <p className="flex items-center gap-2 text-xs text-slate-400">
          <Move className="size-3.5" />
          Cliquez l'icône de déplacement d'une structure, puis choisissez sa destination parmi les zones surlignées.
        </p>
      )}

      {/* Par ministère technique (apex = ministère) */}
      {groups.length > 0 && (
        <section className="space-y-5">
          <h2 className="text-xs font-bold uppercase tracking-wide text-slate-400">Par ministère technique</h2>
          {groups.map(({ m, items }) => (
            <Card key={m.id}>
              <CardContent className="p-6">
                <ApexDropZone label={`racine de ${m.name}`} target={{ parentId: null, ministryId: m.id }}>
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

      {/* Organisations clientes (structures non rattachées à un ministère) */}
      {organizations.length > 0 && (
        <section className="space-y-5">
          {groups.length > 0 && <h2 className="text-xs font-bold uppercase tracking-wide text-slate-400">Organisations clientes</h2>}
          {organizations.map((org) => {
            const orgStructures = noMin.filter((s) => s.organizationId === org.id);
            return (
              <Card key={org.id}>
                <CardContent className="p-6">
                  <ApexDropZone label={`racine de ${org.name}`} target={{ parentId: null, ministryId: null, organizationId: org.id }}>
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
                      {!movingId && (
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
