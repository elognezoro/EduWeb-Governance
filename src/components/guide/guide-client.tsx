"use client";

import { useMemo, useState } from "react";
import {
  BookOpen, Search, Printer, Compass, KeyRound, ListChecks,
  Lightbulb, Ban, BadgeCheck, ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  GUIDES, ROLE_GUIDE_META, GUIDE_GROUP_ORDER, roleMeta,
  type RoleGuide, type GuideGroup,
} from "@/lib/guide-data";

const GROUP_TONE: Record<GuideGroup, string> = {
  "Système": "bg-amber-50 text-amber-700 ring-amber-100",
  "Gouvernance": "bg-brand-50 text-brand-700 ring-brand-100",
  "EduLex": "bg-institutional-50 text-institutional-700 ring-institutional-100",
  "Academy": "bg-emerald-50 text-emerald-700 ring-emerald-100",
};

export function GuideClient({ myRoles }: { myRoles: string[] }) {
  const guideByKey = useMemo(() => {
    const m = new Map<string, RoleGuide>();
    for (const g of GUIDES) m.set(g.roleKey, g);
    return m;
  }, []);

  const mine = ROLE_GUIDE_META.filter((r) => myRoles.includes(r.key));
  const firstKey = mine[0]?.key ?? ROLE_GUIDE_META.find((r) => guideByKey.has(r.key))?.key ?? ROLE_GUIDE_META[0].key;

  const [selected, setSelected] = useState(firstKey);
  const [q, setQ] = useState("");

  const matches = (key: string) => {
    const meta = roleMeta(key);
    if (!meta) return false;
    const s = q.trim().toLowerCase();
    return !s || meta.name.toLowerCase().includes(s) || meta.group.toLowerCase().includes(s);
  };

  const current = guideByKey.get(selected);
  const currentMeta = roleMeta(selected);

  return (
    <div className="grid gap-6 lg:grid-cols-[20rem_1fr]">
      {/* Colonne gauche : sélection du rôle */}
      <aside className="space-y-4 print:hidden">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher un rôle…"
            className="h-11 w-full rounded-2xl border border-slate-200 bg-card pl-9 pr-3 text-sm shadow-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
          />
        </div>

        {mine.length > 0 && (
          <div className="space-y-1.5">
            <p className="px-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">Vos rôles</p>
            {mine.filter((r) => matches(r.key)).map((r) => (
              <RoleButton key={r.key} k={r.key} name={r.name} group={r.group} active={selected === r.key} mine onClick={() => setSelected(r.key)} />
            ))}
          </div>
        )}

        {GUIDE_GROUP_ORDER.map((group) => {
          const items = ROLE_GUIDE_META.filter((r) => r.group === group && matches(r.key));
          if (items.length === 0) return null;
          return (
            <div key={group} className="space-y-1.5">
              <p className="px-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">{group}</p>
              {items.map((r) => (
                <RoleButton key={r.key} k={r.key} name={r.name} group={r.group} active={selected === r.key} mine={myRoles.includes(r.key)} onClick={() => setSelected(r.key)} />
              ))}
            </div>
          );
        })}
      </aside>

      {/* Colonne droite : guide détaillé */}
      <div>
        {current && currentMeta ? (
          <GuideDetail guide={current} name={currentMeta.name} group={currentMeta.group} isMine={myRoles.includes(selected)} />
        ) : (
          <Card><CardContent className="flex flex-col items-center gap-3 p-12 text-center text-slate-400">
            <BookOpen className="size-8" />
            <p className="font-semibold">Guide en préparation pour ce rôle.</p>
          </CardContent></Card>
        )}
      </div>
    </div>
  );
}

function RoleButton({ k, name, group, active, mine, onClick }: { k: string; name: string; group: GuideGroup; active: boolean; mine?: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-role={k}
      className={cn(
        "flex w-full items-center gap-2 rounded-2xl px-3 py-2.5 text-left text-sm font-semibold transition-colors",
        active ? "bg-brand-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-50"
      )}
    >
      <span className={cn("size-2 shrink-0 rounded-full", active ? "bg-white" : "bg-brand-400")} />
      <span className="min-w-0 flex-1 truncate">{name}</span>
      {mine && <span className={cn("rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase", active ? "bg-white/20 text-white" : "bg-brand-50 text-brand-700")}>Vous</span>}
      <ChevronRight className={cn("size-4 shrink-0", active ? "text-white/70" : "text-slate-300")} />
    </button>
  );
}

function Section({ icon: Icon, title, children }: { icon: typeof Compass; title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-institutional-800">
        <Icon className="size-4 text-brand-600" /> {title}
      </h3>
      {children}
    </section>
  );
}

function GuideDetail({ guide, name, group, isMine }: { guide: RoleGuide; name: string; group: GuideGroup; isMine: boolean }) {
  return (
    <Card>
      <CardContent className="space-y-8 p-6 sm:p-8">
        {/* En-tête */}
        <header className="space-y-3 border-b border-slate-100 pb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ring-1", GROUP_TONE[group])}>
              <BadgeCheck className="size-3.5" /> {group}
            </span>
            {isMine && <Badge tone="brand">Votre rôle</Badge>}
          </div>
          <h2 className="text-2xl font-extrabold text-institutional-900">{name}</h2>
          {guide.tagline && <p className="text-base font-semibold text-brand-700">{guide.tagline}</p>}
          {guide.intro && <p className="max-w-3xl text-sm leading-relaxed text-slate-600">{guide.intro}</p>}
          <div className="pt-1 print:hidden">
            <Button type="button" variant="outline" size="sm" onClick={() => window.print()}>
              <Printer className="size-4" /> Imprimer / Enregistrer en PDF
            </Button>
          </div>
        </header>

        {guide.access.length > 0 && (
          <Section icon={Compass} title="Ce à quoi vous avez accès">
            <ul className="grid gap-3 sm:grid-cols-2">
              {guide.access.map((a, i) => (
                <li key={i} className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                  <p className="flex items-center gap-1.5 text-sm font-bold text-ink"><KeyRound className="size-3.5 text-institutional-600" /> {a.module}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{a.what}</p>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {guide.workflows.length > 0 && (
          <Section icon={ListChecks} title="Vos tâches pas à pas">
            <div className="space-y-4">
              {guide.workflows.map((w, i) => (
                <div key={i} className="rounded-2xl border border-slate-100 p-4">
                  <p className="mb-2.5 flex items-center gap-2 text-sm font-bold text-institutional-900">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">{i + 1}</span>
                    {w.title}
                  </p>
                  <ol className="space-y-1.5 pl-1">
                    {w.steps.map((s, j) => (
                      <li key={j} className="flex gap-2.5 text-sm leading-relaxed text-slate-600">
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[11px] font-bold text-slate-500">{j + 1}</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </Section>
        )}

        <div className="grid gap-6 sm:grid-cols-2">
          {guide.tips.length > 0 && (
            <Section icon={Lightbulb} title="Bonnes pratiques">
              <ul className="space-y-2">
                {guide.tips.map((t, i) => (
                  <li key={i} className="flex gap-2 rounded-2xl bg-emerald-50/60 p-3 text-sm leading-relaxed text-slate-700">
                    <Lightbulb className="mt-0.5 size-4 shrink-0 text-emerald-600" /> {t}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {guide.limits.length > 0 && (
            <Section icon={Ban} title="Ce que vous ne pouvez pas faire">
              <ul className="space-y-2">
                {guide.limits.map((t, i) => (
                  <li key={i} className="flex gap-2 rounded-2xl bg-red-50/60 p-3 text-sm leading-relaxed text-slate-700">
                    <Ban className="mt-0.5 size-4 shrink-0 text-danger-500" /> {t}
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
