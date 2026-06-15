"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAVIGATION } from "@/config/navigation";
import { cn } from "@/lib/utils";

/** Liste de navigation partagée par la barre latérale (desktop) et le tiroir (mobile). */
export function NavLinks({ onNavigate, collapsed = false }: { onNavigate?: () => void; collapsed?: boolean }) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex-1 space-y-6 overflow-y-auto overflow-x-hidden pb-6", collapsed ? "px-2" : "px-4")}>
      {NAVIGATION.map((group) => (
        <div key={group.title}>
          {!collapsed && (
            <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {group.title}
            </p>
          )}
          <ul className="space-y-1">
            {group.items.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(item.href + "/");
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    title={collapsed ? item.label : undefined}
                    className={cn(
                      "group flex items-center rounded-2xl text-sm font-semibold transition-all",
                      collapsed ? "mx-auto size-11 justify-center" : "gap-3 px-3 py-2.5",
                      active
                        ? "bg-brand-50 text-brand-800 shadow-sm"
                        : "text-slate-600 hover:bg-slate-50 hover:text-ink"
                    )}
                  >
                    <Icon
                      className={cn(
                        "size-[18px] shrink-0",
                        active ? "text-brand-700" : "text-slate-400 group-hover:text-slate-600"
                      )}
                    />
                    {!collapsed && <span className="flex-1">{item.label}</span>}
                    {!collapsed && item.badge && (
                      <span className="rounded-full bg-institutional-50 px-2 py-0.5 text-[10px] font-bold text-institutional-700">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
