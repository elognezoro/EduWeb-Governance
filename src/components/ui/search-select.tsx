"use client";

import { useState, useMemo, useRef, useEffect, type ReactNode } from "react";
import { ChevronDown, Check, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption { value: string; label: string; leading?: ReactNode }

/**
 * Liste déroulante avec champ de recherche rapide (combobox).
 * Contrôlé : `value` + `onChange`, utilisable comme un <Select>.
 */
export function SearchSelect({
  value,
  onChange,
  options,
  placeholder = "— Sélectionner —",
  emptyLabel,
  searchPlaceholder = "Rechercher…",
  disabled,
  id,
}: {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  /** Si défini, ajoute une entrée pour vider la sélection (ex. « — Aucun — »). */
  emptyLabel?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  id?: string;
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);

  const selected = options.find((o) => o.value === value);
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return options;
    return options.filter((o) => o.label.toLowerCase().includes(s));
  }, [q, options]);

  function choose(v: string) { onChange(v); setOpen(false); setQ(""); }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        id={id}
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex h-11 w-full items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-card px-4 text-left text-sm text-ink shadow-sm transition-colors hover:border-slate-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          open && "border-brand-600 ring-2 ring-brand-600/20"
        )}
      >
        <span className="flex min-w-0 items-center gap-2">
          {selected?.leading && <span className="flex shrink-0 items-center">{selected.leading}</span>}
          <span className={cn("truncate", !selected && "text-slate-400")}>{selected ? selected.label : placeholder}</span>
        </span>
        <ChevronDown className="size-4 shrink-0 text-slate-400" />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full min-w-[18rem] max-w-[calc(100vw-3rem)] rounded-2xl border border-slate-100 bg-card p-2 shadow-xl">
          <div className="relative mb-1.5">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={searchPlaceholder}
              className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm focus:border-brand-600 focus:bg-card focus:outline-none focus:ring-2 focus:ring-brand-600/20"
            />
          </div>
          <div className="max-h-64 overflow-y-auto">
            {emptyLabel !== undefined && (
              <Row label={emptyLabel} muted selected={value === ""} onClick={() => choose("")} />
            )}
            {filtered.map((o) => (
              <Row key={o.value} label={o.label} leading={o.leading} selected={o.value === value} onClick={() => choose(o.value)} />
            ))}
            {filtered.length === 0 && <p className="px-3 py-4 text-center text-sm text-slate-400">Aucun résultat</p>}
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, leading, selected, onClick, muted }: { label: string; leading?: ReactNode; selected: boolean; onClick: () => void; muted?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn("flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-left text-sm transition-colors hover:bg-slate-50", selected && "bg-brand-50")}
    >
      {leading && <span className="flex shrink-0 items-center">{leading}</span>}
      <span className={cn("min-w-0 flex-1 truncate", muted ? "text-slate-400" : "text-ink")}>{label}</span>
      {selected && <Check className="size-4 shrink-0 text-brand-700" />}
    </button>
  );
}
