"use client";

import { useState, useMemo, useRef, useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Globe, ChevronDown, Check, Search, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Flag } from "@/components/ui/flag";

const ALL = "ALL";

export interface CountryOption { code: string; name: string; flag: string | null; namespace: string | null }
export interface SubdivisionOption { id: string; name: string; code: string | null }

function usePopover() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);
  return { open, setOpen, ref };
}

const setCookie = (name: string, value: string) => {
  document.cookie = `${name}=${value}; path=/; max-age=${60 * 60 * 24 * 365}`;
};

function Row({ leading, label, hint, selected, onClick }: { leading?: ReactNode; label: string; hint?: string | null; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn("flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-left text-sm transition-colors hover:bg-slate-50", selected && "bg-brand-50")}
    >
      {leading !== undefined && <span className="flex w-5 shrink-0 items-center justify-center">{leading}</span>}
      <span className="min-w-0 flex-1 truncate text-ink">
        {label}
        {hint && <span className="ml-1 text-xs text-slate-400">· {hint}</span>}
      </span>
      {selected && <Check className="size-4 shrink-0 text-brand-700" />}
    </button>
  );
}

const panelCls = "absolute right-0 z-50 mt-2 w-72 rounded-2xl border border-slate-100 bg-card p-2 shadow-xl";
const searchCls = "h-9 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm focus:border-brand-600 focus:bg-card focus:outline-none focus:ring-2 focus:ring-brand-600/20";
const triggerCls = "flex items-center gap-2 rounded-2xl border border-slate-200 bg-card px-3 py-2 text-sm font-semibold text-ink transition-colors hover:border-slate-300 hover:bg-slate-50";

export function GeoFilter({
  countries, currentCountry, subdivisions, currentSubdivision,
}: {
  countries: CountryOption[]; currentCountry: string;
  subdivisions: SubdivisionOption[]; currentSubdivision: string;
}) {
  const router = useRouter();
  const selected = countries.find((c) => c.code === currentCountry);
  const selectedSub = subdivisions.find((s) => s.id === currentSubdivision);

  const cp = usePopover();
  const [cq, setCq] = useState("");
  const filteredCountries = useMemo(() => {
    const q = cq.trim().toLowerCase();
    if (!q) return countries;
    return countries.filter((c) => (c.namespace ?? "").toLowerCase().includes(q) || c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q));
  }, [cq, countries]);

  function chooseCountry(code: string) {
    setCookie("edulex_country", code);
    setCookie("edulex_subdivision", ALL); // une subdivision dépend du pays → on réinitialise
    cp.setOpen(false); setCq("");
    router.refresh();
  }

  const sp = usePopover();
  const [sq, setSq] = useState("");
  const filteredSubs = useMemo(() => {
    const q = sq.trim().toLowerCase();
    if (!q) return subdivisions;
    return subdivisions.filter((s) => s.name.toLowerCase().includes(q) || (s.code ?? "").toLowerCase().includes(q));
  }, [sq, subdivisions]);

  function chooseSub(id: string) {
    setCookie("edulex_subdivision", id);
    sp.setOpen(false); setSq("");
    router.refresh();
  }

  const countryLabel = currentCountry === ALL ? "Tous les pays" : selected?.namespace || selected?.name || "Pays";
  const subLabel = currentSubdivision === ALL || !selectedSub ? "Toutes subdivisions" : selectedSub.name;

  return (
    <div className="flex items-center gap-2">
      {/* Sélecteur de pays */}
      <div className="relative" ref={cp.ref}>
        <button type="button" onClick={() => cp.setOpen((o) => !o)} className={triggerCls} aria-label="Filtre pays">
          {currentCountry === ALL ? <Globe className="size-4 text-brand-700" /> : <Flag code={selected?.code} className="w-5" />}
          <span className="hidden max-w-[10rem] truncate sm:inline">{countryLabel}</span>
          <ChevronDown className="size-4 text-slate-400" />
        </button>
        {cp.open && (
          <div className={panelCls}>
            <div className="relative mb-1.5">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input autoFocus value={cq} onChange={(e) => setCq(e.target.value)} placeholder="Rechercher un pays…" className={searchCls} />
            </div>
            <p className="px-2.5 pb-1 pt-1 text-[11px] font-bold uppercase tracking-wide text-slate-400">Filtre pays · EduLex</p>
            <div className="max-h-72 overflow-y-auto">
              <Row leading="🌍" label="Tous les pays" selected={currentCountry === ALL} onClick={() => chooseCountry(ALL)} />
              {filteredCountries.map((c) => (
                <Row key={c.code} leading={<Flag code={c.code} />} label={c.namespace ? `${c.namespace} (${c.name})` : c.name} hint={c.code} selected={c.code === currentCountry} onClick={() => chooseCountry(c.code)} />
              ))}
              {filteredCountries.length === 0 && <p className="px-3 py-5 text-center text-sm text-slate-400">Aucun pays trouvé</p>}
            </div>
          </div>
        )}
      </div>

      {/* Sélecteur de subdivision (visible si un pays précis est choisi et possède des subdivisions) */}
      {currentCountry !== ALL && subdivisions.length > 0 && (
        <div className="relative hidden md:block" ref={sp.ref}>
          <button type="button" onClick={() => sp.setOpen((o) => !o)} className={triggerCls} aria-label="Filtre subdivision">
            <MapPin className="size-4 text-institutional-700" />
            <span className="max-w-[9rem] truncate">{subLabel}</span>
            <ChevronDown className="size-4 text-slate-400" />
          </button>
          {sp.open && (
            <div className={panelCls}>
              <div className="relative mb-1.5">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <input autoFocus value={sq} onChange={(e) => setSq(e.target.value)} placeholder="Rechercher une subdivision…" className={searchCls} />
              </div>
              <p className="px-2.5 pb-1 pt-1 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                Subdivisions · {selected?.namespace || selected?.name} ({subdivisions.length})
              </p>
              <div className="max-h-72 overflow-y-auto">
                <Row label="Toutes les subdivisions" selected={currentSubdivision === ALL} onClick={() => chooseSub(ALL)} />
                {filteredSubs.map((s) => (
                  <Row key={s.id} label={s.name} hint={s.code} selected={s.id === currentSubdivision} onClick={() => chooseSub(s.id)} />
                ))}
                {filteredSubs.length === 0 && <p className="px-3 py-5 text-center text-sm text-slate-400">Aucune subdivision trouvée</p>}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
