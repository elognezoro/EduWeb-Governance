import * as React from "react";
import { cn } from "@/lib/utils";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white/60 px-6 py-16 text-center",
        className
      )}
    >
      {Icon && (
        <span className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
          <Icon className="size-7" />
        </span>
      )}
      <h3 className="text-lg font-bold text-institutional-900">{title}</h3>
      {description && (
        <p className="mt-1.5 max-w-md text-sm text-slate-500">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
