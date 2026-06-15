"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { List, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TocItem { id: string; text: string; level: number }

function slugify(s: string): string {
  return (
    s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 60) || "section"
  );
}

/** Sommaire flottant et transparent : scrute les titres de <main> et suit le défilement. */
export function FloatingToc() {
  const pathname = usePathname();
  const [items, setItems] = useState<TocItem[]>([]);
  const [active, setActive] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Monté côté client : nécessaire pour le portail vers <body> (évite le SSR).
  useEffect(() => setMounted(true), []);

  // Refermer le panneau au changement de page.
  useEffect(() => setOpen(false), [pathname]);

  // Fermeture au clic extérieur et à la touche Échap.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => { if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);

  // Collecte des titres (avec un léger délai pour laisser le rendu se faire).
  useEffect(() => {
    const collect = () => {
      const main = document.querySelector("main");
      if (!main) return;
      // Le sommaire liste les intitulés de blocs (rubriques) : titres de section (h2)
      // et de carte (h3). Le titre de page lui-même (h1) est volontairement exclu.
      const heads = Array.from(main.querySelectorAll("h2, h3")) as HTMLElement[];
      const used = new Set<string>();
      const next: TocItem[] = [];
      for (const h of heads) {
        const text = (h.textContent || "").trim();
        if (!text) continue;
        if (h.offsetParent === null && h.getClientRects().length === 0) continue; // masqué
        let id = h.id;
        if (!id) {
          const base = slugify(text);
          let cand = base;
          let n = 2;
          while (used.has(cand) || document.getElementById(cand)) cand = `${base}-${n++}`;
          id = cand;
          h.id = id;
        }
        used.add(id);
        const level = h.tagName === "H2" ? 1 : 2;
        next.push({ id, text, level });
      }
      setItems(next);
    };
    const t = setTimeout(collect, 100);
    return () => clearTimeout(t);
  }, [pathname]);

  // Surlignage de la rubrique courante au défilement.
  useEffect(() => {
    if (items.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-12% 0px -70% 0px", threshold: 0 }
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [items]);

  // Sommaire dès qu'il y a au moins 2 rubriques à parcourir.
  if (items.length < 2 || !mounted) return null;

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.history.replaceState(null, "", `#${id}`);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  // Portail vers <body> : échappe à tout ancêtre transformé/filtré (animate-fade-in,
  // backdrop, drawer) qui ferait perdre l'ancrage « fixed » au viewport.
  return createPortal(
    <div ref={rootRef} className="fixed bottom-[5.5rem] left-3 z-40 lg:bottom-4">
      {/* Panneau du sommaire — ouvert au-dessus du bouton */}
      {open && (
        <nav
          aria-label="Sommaire de la page"
          className="absolute bottom-full left-0 mb-3 max-h-[60vh] w-72 origin-bottom-left animate-fade-in overflow-y-auto rounded-2xl bg-card/95 p-3 shadow-card ring-1 ring-black/5 backdrop-blur-md"
        >
          <span className="mb-2 flex items-center gap-1.5 pl-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            <List className="size-3" /> Sur cette page
          </span>
          <ul className="space-y-0.5">
            {items.map((it) => {
              const isActive = active === it.id;
              return (
                <li key={it.id} style={{ paddingLeft: (it.level - 1) * 12 }}>
                  <button
                    type="button"
                    onClick={() => go(it.id)}
                    title={it.text}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs transition-colors",
                      isActive ? "bg-brand-50 font-semibold text-brand-700" : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                    )}
                  >
                    <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", isActive ? "bg-brand-500" : "bg-slate-300")} />
                    <span className="truncate">{it.text}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      )}

      {/* Bouton rond flottant (pastille verte) */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Sommaire de la page"
        aria-expanded={open}
        className={cn(
          "flex size-12 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg ring-1 ring-black/10 transition-all duration-200 hover:bg-brand-700 hover:shadow-glow",
          open && "bg-brand-700"
        )}
      >
        {open ? <X className="size-5" /> : <List className="size-5" />}
      </button>
    </div>,
    document.body
  );
}
