"use client";

import { useMemo, useState } from "react";
import {
  BookOpen, Search, Printer, ChevronDown, Compass, ListChecks,
  Lightbulb, Ban, KeyRound, GraduationCap, UnfoldVertical, FoldVertical,
} from "lucide-react";
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
  const allKeys = useMemo(() => ROLE_GUIDE_META.filter((r) => guideByKey.has(r.key)).map((r) => r.key), [guideByKey]);

  const [open, setOpen] = useState<Set<string>>(() => new Set(myRoles.filter((k) => guideByKey.has(k))));
  const [q, setQ] = useState("");

  const toggle = (key: string) =>
    setOpen((prev) => { const n = new Set(prev); n.has(key) ? n.delete(key) : n.add(key); return n; });

  const matches = (key: string) => {
    const meta = roleMeta(key);
    if (!meta) return false;
    const s = q.trim().toLowerCase();
    return !s || meta.name.toLowerCase().includes(s) || meta.group.toLowerCase().includes(s);
  };

  return (
    <div className="space-y-6">
      {/* Barre d'outils */}
      <div className="flex flex-wrap items-center gap-2.5 print:hidden">
        <div className="relative min-w-[14rem] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher un rôle…"
            className="h-11 w-full rounded-2xl border border-slate-200 bg-card pl-9 pr-3 text-sm shadow-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
          />
        </div>
        <Button type="button" variant="outline" size="sm" onClick={() => setOpen(new Set(allKeys))}>
          <UnfoldVertical className="size-4" /> Tout déployer
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => setOpen(new Set())}>
          <FoldVertical className="size-4" /> Tout replier
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => window.print()}>
          <Printer className="size-4" /> Imprimer / PDF
        </Button>
      </div>

      {/* Préambule didactique */}
      <div className="rounded-3xl border border-brand-100 bg-brand-50/40 p-5 print:border-slate-200">
        <p className="flex items-center gap-2 text-sm font-bold text-brand-800">
          <GraduationCap className="size-4" /> Support de formation
        </p>
        <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-slate-600">
          Sélectionnez un rôle pour dérouler son guide. Chaque guide présente, dans l'ordre,
          les accès du rôle, les procédures pas à pas, les bonnes pratiques et les limites.
          Vos propres rôles sont ouverts par défaut.
        </p>
      </div>

      {/* Accordéon par périmètre */}
      {GUIDE_GROUP_ORDER.map((group) => {
        const items = ROLE_GUIDE_META.filter((r) => r.group === group && guideByKey.has(r.key) && matches(r.key));
        if (items.length === 0) return null;
        return (
          <section key={group} className="space-y-3">
            <h2 className="flex items-center gap-2 px-1 text-xs font-bold uppercase tracking-wider text-slate-400">
              <span className={cn("inline-block size-2 rounded-full", group === "Système" ? "bg-amber-400" : group === "Gouvernance" ? "bg-brand-500" : group === "EduLex" ? "bg-institutional-500" : "bg-emerald-500")} />
              {group}
            </h2>
            <div className="space-y-3">
              {items.map((r) => (
                <AccordionItem
                  key={r.key}
                  name={r.name}
                  group={r.group}
                  guide={guideByKey.get(r.key)!}
                  isMine={myRoles.includes(r.key)}
                  open={open.has(r.key)}
                  onToggle={() => toggle(r.key)}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function AccordionItem({
  name, group, guide, isMine, open, onToggle,
}: {
  name: string; group: GuideGroup; guide: RoleGuide; isMine: boolean; open: boolean; onToggle: () => void;
}) {
  return (
    <div className={cn("overflow-hidden rounded-3xl border bg-card transition-shadow", open ? "border-brand-200 shadow-card" : "border-slate-200")}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-slate-50/70"
      >
        <span className={cn("inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ring-1", GROUP_TONE[group])}>{group}</span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-base font-extrabold text-institutional-900 sm:text-lg">{name}</span>
          {guide.tagline && <span className="mt-0.5 block truncate text-sm text-brand-700">{guide.tagline}</span>}
        </span>
        {isMine && <span className="hidden shrink-0 rounded-full bg-brand-600 px-2.5 py-1 text-[11px] font-bold text-white sm:inline">Votre rôle</span>}
        <ChevronDown className={cn("size-5 shrink-0 text-slate-400 transition-transform duration-200", open && "rotate-180")} />
      </button>

      {open && <GuideBody guide={guide} />}
    </div>
  );
}

function GuideBody({ guide }: { guide: RoleGuide }) {
  return (
    <div className="space-y-9 border-t border-slate-100 px-5 py-7 sm:px-8 sm:py-9">
      {guide.intro && (
        <p className="max-w-4xl border-l-4 border-brand-200 pl-4 text-[15px] leading-relaxed text-slate-700">{guide.intro}</p>
      )}

      {guide.access.length > 0 && (
        <Section n={1} icon={Compass} title="Vos accès">
          <ul className="space-y-2.5">
            {guide.access.map((a, i) => (
              <li key={i} className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
                <KeyRound className="mt-0.5 size-4 shrink-0 text-institutional-600" />
                <div className="min-w-0">
                  <p className="font-bold text-ink">{a.module}</p>
                  <p className="mt-0.5 text-[15px] leading-relaxed text-slate-600">{a.what}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {guide.workflows.length > 0 && (
        <Section n={2} icon={ListChecks} title="Procédures pas à pas">
          <div className="space-y-6">
            {guide.workflows.map((w, i) => (
              <div key={i}>
                <p className="flex items-center gap-2.5 text-[15px] font-bold text-institutional-900">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">{i + 1}</span>
                  {w.title}
                </p>
                <ol className="ml-3.5 mt-3 space-y-2.5 border-l-2 border-brand-100 pl-5">
                  {w.steps.map((s, j) => (
                    <li key={j} className="relative text-[15px] leading-relaxed text-slate-700">
                      <span className="absolute -left-[1.7rem] flex size-5 items-center justify-center rounded-full bg-slate-100 text-[11px] font-bold text-slate-500">{j + 1}</span>
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </Section>
      )}

      {guide.tips.length > 0 && (
        <Section n={3} icon={Lightbulb} title="Bonnes pratiques">
          <ul className="space-y-2">
            {guide.tips.map((t, i) => (
              <li key={i} className="flex gap-2.5 rounded-2xl bg-emerald-50/50 p-3.5 text-[15px] leading-relaxed text-slate-700">
                <Lightbulb className="mt-0.5 size-4 shrink-0 text-emerald-600" /> {t}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {guide.limits.length > 0 && (
        <Section n={4} icon={Ban} title="Ce que vous ne pouvez pas faire">
          <ul className="space-y-2">
            {guide.limits.map((t, i) => (
              <li key={i} className="flex gap-2.5 rounded-2xl bg-red-50/50 p-3.5 text-[15px] leading-relaxed text-slate-700">
                <Ban className="mt-0.5 size-4 shrink-0 text-danger-500" /> {t}
              </li>
            ))}
          </ul>
        </Section>
      )}
    </div>
  );
}

function Section({ n, icon: Icon, title, children }: { n: number; icon: typeof Compass; title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h3 className="flex items-center gap-3 border-b border-slate-100 pb-2.5">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-institutional-900 text-sm font-extrabold text-white">{n}</span>
        <Icon className="size-[18px] text-brand-600" />
        <span className="text-base font-extrabold uppercase tracking-wide text-institutional-900">{title}</span>
      </h3>
      <div className="sm:pl-11">{children}</div>
    </section>
  );
}
