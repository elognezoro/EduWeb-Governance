"use client";

import { useMemo, useState, useTransition, type ReactNode, type DragEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Network, MapPin, Users, Pencil, GripVertical, Landmark, Building2, AlertCircle, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [overKey, setOverKey] = useState<string | null>(null);

  const byId = useMemo(() => new Map(structures.map((s) => [s.id, s])), [structures]);
  const minName = useMemo(() => new Map(ministries.map((m) => [m.id, m.name])), [ministries]);
  const orgName = useMemo(() => new Map(organizations.map((o) => [o.id, o.name])), [organizations]);

  // Descendants de la structure en cours de glissement (interdits comme cible).
  const invalid = useMemo(() => {
    const set = new Set<string>();
    if (!draggedId) return set;
    const childrenOf = new Map<string, string[]>();
    for (const s of structures) if (s.parentId) (childrenOf.get(s.parentId) ?? childrenOf.set(s.parentId, []).get(s.parentId)!).push(s.id);
    set.add(draggedId);
    const stack = [draggedId];
    while (stack.length) {
      const cur = stack.pop()!;
      for (const c of childrenOf.get(cur) ?? []) if (!set.has(c)) { set.add(c); stack.push(c); }
    }
    return set;
  }, [draggedId, structures]);

  function move(target: { parentId?: string | null; ministryId?: string | null; organizationId?: string }) {
    if (!draggedId) return;
    const id = draggedId;
    setError(null);
    start(async () => {
      const res = await moveStructure({ id, ...target });
      if (!res.ok) setError(res.error);
      else router.refresh();
    });
  }

  const withMin = structures.filter((s) => s.ministryId);
  const noMin = structures.filter((s) => !s.ministryId);
  const groups = ministries.map((m) => ({ m, items: withMin.filter((s) => s.ministryId === m.id) })).filter((g) => g.items.length > 0);

  function context(n: OrgNode): string | null {
    if (n.parentId && byId.has(n.parentId)) return `↳ sous ${byId.get(n.parentId)!.name}`;
    if (n.ministryId && minName.has(n.ministryId)) return `🏛 ${minName.get(n.ministryId)}`;
    return orgName.get(n.organizationId) ?? null;
  }

  // Zone de dépôt « apex » (en-tête ministère / organisation).
  function dropZoneProps(key: string, target: { parentId?: string | null; ministryId?: string | null; organizationId?: string }) {
    if (!canManage) return {};
    return {
      onDragOver: (e: DragEvent) => { if (draggedId) { e.preventDefault(); setOverKey(key); } },
      onDragLeave: () => setOverKey((k) => (k === key ? null : k)),
      onDrop: (e: DragEvent) => { if (draggedId) { e.preventDefault(); setOverKey(null); move(target); } },
    };
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
          const dropKey = `s:${n.id}`;
          const isDragged = draggedId === n.id;
          const canDrop = canManage && !!draggedId && !invalid.has(n.id);
          return (
            <li key={n.id} className="mt-2">
              <div
                draggable={canManage}
                onDragStart={(e) => { setDraggedId(n.id); e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/plain", n.id); }}
                onDragEnd={() => { setDraggedId(null); setOverKey(null); }}
                onDragOver={(e) => { if (canDrop) { e.preventDefault(); setOverKey(dropKey); } }}
                onDragLeave={() => setOverKey((k) => (k === dropKey ? null : k))}
                onDrop={(e) => { if (canDrop) { e.preventDefault(); setOverKey(null); move({ parentId: n.id, ministryId: n.ministryId, organizationId: n.organizationId }); } }}
                className={cn(
                  "group flex items-center gap-2.5 rounded-2xl border bg-card px-4 py-2.5 transition-colors",
                  canManage && "cursor-move",
                  isDragged ? "border-slate-200 opacity-40" : "border-slate-100 hover:bg-slate-50",
                  overKey === dropKey && "border-brand-300 bg-brand-50/50 ring-2 ring-brand-400"
                )}
              >
                {canManage && <GripVertical className="size-4 shrink-0 text-slate-300 group-hover:text-slate-400" />}
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
                <span className="hidden items-center gap-1 text-xs text-slate-400 sm:flex"><Users className="size-3.5" /> {n.memberCount}</span>
                {canManage && (
                  <Link href={`/organization/structures/${n.id}`} className="text-slate-400 opacity-0 transition-opacity hover:text-brand-700 group-hover:opacity-100">
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
      {error && (
        <div className="flex items-center gap-2 rounded-2xl border border-danger-100 bg-red-50 px-4 py-3 text-sm font-medium text-danger-600">
          <AlertCircle className="size-4 shrink-0" /> {error}
        </div>
      )}
      {canManage && (
        <p className="flex items-center gap-2 text-xs text-slate-400">
          {pending ? <Loader2 className="size-3.5 animate-spin" /> : <GripVertical className="size-3.5" />}
          Glissez une structure sur un ministère, une organisation ou une autre structure pour la déplacer.
        </p>
      )}

      {/* Par ministère technique (apex = ministère) */}
      {groups.length > 0 && (
        <section className="space-y-5">
          <h2 className="text-xs font-bold uppercase tracking-wide text-slate-400">Par ministère technique</h2>
          {groups.map(({ m, items }) => (
            <Card key={m.id}>
              <CardContent className="p-6">
                <div
                  {...dropZoneProps(`m:${m.id}`, { parentId: null, ministryId: m.id })}
                  className={cn("flex items-center gap-3 rounded-2xl p-1 transition-colors", overKey === `m:${m.id}` && "bg-brand-50/60 ring-2 ring-brand-400")}
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-700"><Landmark className="size-5" /></span>
                  <div>
                    <h3 className="font-extrabold text-institutional-900">{m.name}</h3>
                    <p className="text-xs text-slate-400">{items.length} structure(s) rattachée(s)</p>
                  </div>
                </div>
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
                  <div
                    {...dropZoneProps(`o:${org.id}`, { parentId: null, ministryId: null, organizationId: org.id })}
                    className={cn("flex flex-wrap items-center justify-between gap-3 rounded-2xl p-1 transition-colors", overKey === `o:${org.id}` && "bg-brand-50/60 ring-2 ring-brand-400")}
                  >
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
                    <div className="flex items-center gap-2">
                      {org.type && <Badge tone="neutral">{org.type}</Badge>}
                      {canManage && <FileUpload purpose="logo" entityId={org.id} accept="image/*" label="Logo" variant="ghost" />}
                    </div>
                  </div>
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
