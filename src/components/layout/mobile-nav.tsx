"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { Brand } from "./brand";
import { NavLinks } from "./nav-links";

/** Navigation mobile : bouton « hamburger » + tiroir latéral (off-canvas) sous lg. */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  // Ouverture depuis ailleurs (barre d'onglets mobile « Plus »).
  useEffect(() => {
    const openNav = () => setOpen(true);
    window.addEventListener("eduweb:open-nav", openNav);
    return () => window.removeEventListener("eduweb:open-nav", openNav);
  }, []);

  // Verrouille le défilement de fond + fermeture à la touche Échap.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le menu"
        aria-expanded={open}
        className="flex size-10 items-center justify-center rounded-2xl text-slate-600 transition-colors hover:bg-slate-100 lg:hidden"
      >
        <Menu className="size-5" />
      </button>

      {open &&
        createPortal(
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Voile */}
            <div
              className="absolute inset-0 bg-ink/40 backdrop-blur-sm animate-fade-in"
              onClick={() => setOpen(false)}
            />
            {/* Tiroir */}
            <aside className="absolute inset-y-0 left-0 flex w-72 max-w-[82%] flex-col border-r border-slate-100 bg-card shadow-2xl animate-slide-in-left">
              <div className="flex h-16 items-center justify-between px-5">
                <Brand />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Fermer le menu"
                  className="flex size-9 items-center justify-center rounded-2xl text-slate-500 transition-colors hover:bg-slate-100"
                >
                  <X className="size-5" />
                </button>
              </div>
              <NavLinks onNavigate={() => setOpen(false)} />
            </aside>
          </div>,
          document.body
        )}
    </>
  );
}
