"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Menu déroulant léger (sans dépendance) : ferme au clic extérieur et sur Échap.
 */
export function Menu({
  trigger,
  children,
  align = "end",
  triggerClassName,
  contentClassName,
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "start" | "end";
  triggerClassName?: string;
  contentClassName?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={triggerClassName}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {trigger}
      </button>
      {open && (
        <div
          role="menu"
          onClick={() => setOpen(false)}
          className={cn(
            "absolute z-50 mt-2 min-w-56 overflow-hidden rounded-2xl border border-slate-100 bg-card p-1.5 shadow-card animate-scale-in",
            align === "end" ? "right-0" : "left-0",
            contentClassName
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export function MenuItem({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      role="menuitem"
      className={cn(
        "flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm text-ink transition-colors hover:bg-slate-50",
        className
      )}
      {...props}
    />
  );
}

export function MenuLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
      {children}
    </div>
  );
}

export function MenuSeparator() {
  return <div className="my-1 h-px bg-slate-100" />;
}
