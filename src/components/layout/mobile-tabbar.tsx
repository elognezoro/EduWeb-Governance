"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Scale, ClipboardList, GraduationCap, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { label: "Tableau", href: "/dashboard", icon: LayoutDashboard },
  { label: "EduLex", href: "/edulex", icon: Scale },
  { label: "Activités", href: "/activities", icon: ClipboardList },
  { label: "Academy", href: "/academy", icon: GraduationCap },
];

/** Barre d'onglets mobile (sous lg) : accès rapide aux espaces clés + « Plus » (tiroir complet). */
export function MobileTabBar() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <nav
      aria-label="Navigation rapide"
      className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-slate-200/70 bg-card/90 shadow-[0_-8px_24px_-16px_rgba(15,23,42,0.25)] backdrop-blur-md lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-around px-1">
        {TABS.map((t) => {
          const active = isActive(t.href);
          const Icon = t.icon;
          return (
            <li key={t.href} className="flex-1">
              <Link
                href={t.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative flex flex-col items-center gap-1 px-1 pb-1.5 pt-2 text-[11px] font-semibold transition-colors",
                  active ? "text-brand-700" : "text-slate-400 hover:text-slate-600"
                )}
              >
                <span className={cn("absolute top-0 h-0.5 w-7 rounded-full bg-brand-600 transition-opacity", active ? "opacity-100" : "opacity-0")} />
                <span className={cn("flex size-9 items-center justify-center rounded-2xl transition-colors", active ? "bg-brand-50 text-brand-700" : "text-slate-400 group-hover:bg-slate-100")}>
                  <Icon className="size-5" />
                </span>
                {t.label}
              </Link>
            </li>
          );
        })}
        <li className="flex-1">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("eduweb:open-nav"))}
            aria-label="Ouvrir le menu complet"
            className="group flex w-full flex-col items-center gap-1 px-1 pb-1.5 pt-2 text-[11px] font-semibold text-slate-400 transition-colors hover:text-slate-600"
          >
            <span className="flex size-9 items-center justify-center rounded-2xl text-slate-400 transition-colors group-hover:bg-slate-100">
              <Menu className="size-5" />
            </span>
            Plus
          </button>
        </li>
      </ul>
    </nav>
  );
}
