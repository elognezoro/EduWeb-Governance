"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { GraduationCap, ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

const DISMISS_KEY = "eduweb:academy-promo-dismissed";

/**
 * Vignette flottante « EduLex Academy » :
 * - reste fixe à l'écran (ne disparaît pas au défilement, quel que soit l'endroit) ;
 * - apparaît dès que la souris bouge (ou au premier contact tactile / à la frappe) ;
 * - peut être fermée par l'utilisateur, son choix étant mémorisé.
 */
export function AcademyPromo() {
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(true); // supposé fermé tant que le stockage n'est pas lu (évite un flash)
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    let d = false;
    try {
      d = localStorage.getItem(DISMISS_KEY) === "1";
    } catch {}
    setDismissed(d);
  }, []);

  useEffect(() => {
    if (dismissed) return;
    const reveal = () => setVisible(true);
    window.addEventListener("mousemove", reveal);
    window.addEventListener("touchstart", reveal, { passive: true });
    window.addEventListener("keydown", reveal);
    // Filet de sécurité (appareils sans souris) : afficher après un court délai.
    const t = window.setTimeout(reveal, 4000);
    return () => {
      window.removeEventListener("mousemove", reveal);
      window.removeEventListener("touchstart", reveal);
      window.removeEventListener("keydown", reveal);
      window.clearTimeout(t);
    };
  }, [dismissed]);

  const close = () => {
    setVisible(false);
    setDismissed(true);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {}
  };

  if (!mounted || dismissed) return null;

  return createPortal(
    <div
      role="complementary"
      aria-label="EduLex Academy"
      className={cn(
        "fixed bottom-4 left-4 z-40 w-72 max-w-[calc(100vw-2rem)] transition-all duration-500 ease-out",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 to-brand-800 p-5 text-white shadow-glow ring-1 ring-black/10">
        <button
          type="button"
          onClick={close}
          aria-label="Fermer"
          title="Fermer"
          className="absolute right-3 top-3 flex size-7 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/25 hover:text-white"
        >
          <X className="size-4" />
        </button>
        <span className="flex size-10 items-center justify-center rounded-2xl bg-white/15">
          <GraduationCap className="size-5" />
        </span>
        <p className="mt-3 pr-6 text-sm font-bold">EduLex Academy</p>
        <p className="mt-1 text-[13px] leading-snug text-white/85">
          Apprenez les textes, progressez par défis.
        </p>
        <Link
          href="/academy"
          className="mt-4 inline-flex items-center gap-1.5 rounded-2xl bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur transition-colors hover:bg-white/25"
        >
          Commencer <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>,
    document.body
  );
}
