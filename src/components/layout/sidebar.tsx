"use client";

import { useEffect, useState } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Brand } from "./brand";
import { NavLinks } from "./nav-links";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "eduweb:sidebar-collapsed";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Restaure l'état rabattu (persisté) après le montage — évite l'animation au chargement.
  useEffect(() => {
    setCollapsed(localStorage.getItem(STORAGE_KEY) === "1");
    setMounted(true);
  }, []);

  const toggle = () =>
    setCollapsed((c) => {
      const next = !c;
      try { localStorage.setItem(STORAGE_KEY, next ? "1" : "0"); } catch {}
      return next;
    });

  return (
    <aside
      className={cn(
        "no-print hidden shrink-0 flex-col border-r border-black/10 bg-[#579C70] lg:flex",
        collapsed ? "w-[4.75rem]" : "w-72",
        mounted && "transition-[width] duration-300"
      )}
    >
      <div className={cn("flex h-16 items-center", collapsed ? "justify-center px-2" : "justify-between pl-6 pr-3")}>
        {!collapsed && <Brand framed />}
        <button
          type="button"
          onClick={toggle}
          aria-label={collapsed ? "Déployer la barre latérale" : "Rabattre la barre latérale"}
          aria-pressed={collapsed}
          title={collapsed ? "Déployer" : "Rabattre"}
          className="flex size-9 shrink-0 items-center justify-center rounded-2xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-ink"
        >
          {collapsed ? <PanelLeftOpen className="size-5" /> : <PanelLeftClose className="size-5" />}
        </button>
      </div>

      <NavLinks collapsed={collapsed} />

      {/* La mention « EduLex Academy » est désormais une vignette flottante (AcademyPromo),
          présente sur toutes les pages et l'accueil. */}
    </aside>
  );
}
