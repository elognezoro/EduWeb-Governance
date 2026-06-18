"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { NAVIGATION } from "@/config/navigation";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/config/navigation";

function isActive(href: string, pathname: string): boolean {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
}

/** Groupe contenant la route active (ouvert par défaut), sinon le premier groupe. */
function activeGroupTitle(pathname: string): string | null {
  for (const group of NAVIGATION) {
    if (group.items.some((i) => isActive(i.href, pathname))) return group.title;
  }
  return NAVIGATION[0]?.title ?? null;
}

function NavItemLink({ item, pathname, collapsed, onNavigate }: { item: NavItem; pathname: string; collapsed: boolean; onNavigate?: () => void }) {
  const active = isActive(item.href, pathname);
  const Icon = item.icon;
  return (
    <li>
      <Link
        href={item.href}
        onClick={onNavigate}
        title={collapsed ? item.label : undefined}
        className={cn(
          "group flex items-center rounded-2xl text-sm font-semibold transition-all",
          collapsed ? "mx-auto size-11 justify-center" : "gap-3 px-3 py-2.5",
          active ? "bg-white text-brand-900 shadow-sm" : "text-institutional-900 hover:bg-white/60 hover:text-brand-900",
        )}
      >
        <Icon className={cn("size-[18px] shrink-0", active ? "text-brand-700" : "text-brand-800 group-hover:text-brand-900")} />
        {!collapsed && <span className="flex-1">{item.label}</span>}
        {!collapsed && item.badge && (
          <span className="rounded-full bg-institutional-50 px-2 py-0.5 text-[10px] font-bold text-institutional-700">{item.badge}</span>
        )}
      </Link>
    </li>
  );
}

/** Liste de navigation partagée par la barre latérale (desktop) et le tiroir (mobile). */
export function NavLinks({ onNavigate, collapsed = false }: { onNavigate?: () => void; collapsed?: boolean }) {
  const pathname = usePathname();
  // Accordéon à ouverture unique : ouvrir une catégorie ferme les autres.
  const [openGroup, setOpenGroup] = useState<string | null>(() => activeGroupTitle(pathname));

  // Mode rail (réduit) : pas d'accordéon, toutes les icônes restent accessibles.
  if (collapsed) {
    return (
      <nav className="flex-1 space-y-6 overflow-y-auto overflow-x-hidden px-2 pb-6">
        {NAVIGATION.map((group) => (
          <ul key={group.title} className="space-y-1">
            {group.items.map((item) => (
              <NavItemLink key={item.href} item={item} pathname={pathname} collapsed onNavigate={onNavigate} />
            ))}
          </ul>
        ))}
      </nav>
    );
  }

  return (
    <nav className="flex-1 space-y-1.5 overflow-y-auto overflow-x-hidden px-4 pb-6">
      {NAVIGATION.map((group) => {
        const isOpen = openGroup === group.title;
        const hasActive = group.items.some((i) => isActive(i.href, pathname));
        return (
          <div key={group.title}>
            <button
              type="button"
              data-group={group.title}
              onClick={() => setOpenGroup((g) => (g === group.title ? null : group.title))}
              aria-expanded={isOpen}
              className={cn(
                "flex w-full items-center justify-between rounded-2xl px-3 py-2 text-[11px] font-bold uppercase tracking-wider transition-colors",
                hasActive ? "text-black" : "text-slate-900 hover:bg-white/50 hover:text-black",
              )}
            >
              <span>{group.title}</span>
              <ChevronDown className={cn("size-4 shrink-0 transition-transform duration-200", isOpen ? "rotate-180" : "rotate-0")} />
            </button>
            {isOpen && (
              <ul className="mb-1 mt-1 space-y-1">
                {group.items.map((item) => (
                  <NavItemLink key={item.href} item={item} pathname={pathname} collapsed={false} onNavigate={onNavigate} />
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </nav>
  );
}
