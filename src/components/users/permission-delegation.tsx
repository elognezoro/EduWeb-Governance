"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Loader2, Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { setUserDirectPermissions } from "@/app/(app)/users/actions";

interface Perm { key: string; module: string; action: string; description?: string | null }

// Préréglages « ensemble de tâches » (délégation en un clic).
const PRESETS: { label: string; keys: string[] }[] = [
  { label: "Valideur EduLex", keys: ["edulex:validate"] },
  { label: "Valideur + publication EduLex", keys: ["edulex:validate", "edulex:publish"] },
  { label: "Valideur d'activités", keys: ["activity:validate"] },
  { label: "Éditeur Academy", keys: ["academy:manage"] },
];

const MODULE_LABELS: Record<string, string> = {
  edulex: "EduLex (textes)", activity: "Activités", validation: "Validation",
  report: "Rapports", form: "Formulaires", organization: "Organisation",
  user: "Utilisateurs", academy: "Academy", admin: "Administration",
};

export function PermissionDelegation({ userId, allPermissions, currentKeys }: { userId: string; allPermissions: Perm[]; currentKeys: string[] }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [selected, setSelected] = useState<Set<string>>(new Set(currentKeys));
  const [saved, setSaved] = useState(false);

  const byModule = useMemo(() => {
    const m = new Map<string, Perm[]>();
    for (const p of allPermissions) { if (!m.has(p.module)) m.set(p.module, []); m.get(p.module)!.push(p); }
    return [...m.entries()];
  }, [allPermissions]);

  const dirty = useMemo(() => {
    const cur = new Set(currentKeys);
    return cur.size !== selected.size || [...selected].some((k) => !cur.has(k));
  }, [selected, currentKeys]);

  function toggle(key: string) {
    setSelected((s) => { const n = new Set(s); n.has(key) ? n.delete(key) : n.add(key); return n; });
    setSaved(false);
  }
  function applyPreset(keys: string[]) {
    setSelected((s) => { const n = new Set(s); keys.forEach((k) => n.add(k)); return n; });
    setSaved(false);
  }
  function save() {
    start(async () => {
      const res = await setUserDirectPermissions(userId, [...selected]);
      if (res.ok) { setSaved(true); router.refresh(); }
    });
  }

  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-500">
        Droits accordés <strong>directement</strong> à cet utilisateur, en plus de ses rôles. Choisissez un lot (préréglage) ou cochez activité par activité.
      </p>

      {/* Préréglages — ensemble de tâches */}
      <div>
        <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-400"><Zap className="size-3.5" /> Lots de tâches</p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button key={p.label} type="button" onClick={() => applyPreset(p.keys)} className="rounded-2xl border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 transition-colors hover:bg-brand-100">
              + {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Granulaire — par activité (permission) */}
      <div className="max-h-72 space-y-3 overflow-y-auto pr-1">
        {byModule.map(([mod, perms]) => (
          <div key={mod}>
            <p className="mb-1 text-[11px] font-bold uppercase tracking-wide text-slate-400">{MODULE_LABELS[mod] ?? mod}</p>
            <div className="grid grid-cols-2 gap-1.5">
              {perms.map((p) => {
                const on = selected.has(p.key);
                return (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => toggle(p.key)}
                    title={p.description ?? p.key}
                    className={cn(
                      "flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-left text-xs font-medium transition-colors",
                      on ? "border-brand-300 bg-brand-50 text-brand-700" : "border-slate-200 text-slate-500 hover:border-slate-300"
                    )}
                  >
                    <span className={cn("flex size-4 shrink-0 items-center justify-center rounded-md", on ? "bg-brand-600 text-white" : "ring-1 ring-slate-300")}>
                      {on && <Check className="size-3" />}
                    </span>
                    {p.action}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <Button onClick={save} disabled={pending || !dirty} className="w-full">
        {pending ? <Loader2 className="size-4 animate-spin" /> : saved ? <Check className="size-4" /> : <ShieldCheck className="size-4" />}
        {saved && !dirty ? "Droits enregistrés" : `Enregistrer (${selected.size} droit${selected.size > 1 ? "s" : ""})`}
      </Button>
    </div>
  );
}
