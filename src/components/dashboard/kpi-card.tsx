import * as React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

const TONES = {
  brand: "bg-brand-50 text-brand-700",
  info: "bg-institutional-50 text-institutional-700",
  gold: "bg-gold-100 text-gold-600",
  danger: "bg-red-50 text-danger-500",
  neutral: "bg-slate-100 text-slate-600",
} as const;

export function KPICard({
  label,
  value,
  icon: Icon,
  tone = "brand",
  delta,
  hint,
}: {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  tone?: keyof typeof TONES;
  delta?: number;
  hint?: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-card p-5 shadow-card transition-transform hover:-translate-y-0.5">
      <div className="flex items-start justify-between">
        <span className={cn("flex size-11 items-center justify-center rounded-2xl", TONES[tone])}>
          <Icon className="size-5" />
        </span>
        {typeof delta === "number" && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-bold",
              delta >= 0 ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-danger-500"
            )}
          >
            {delta >= 0 ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
            {Math.abs(delta)}%
          </span>
        )}
      </div>
      <p className="mt-4 text-3xl font-extrabold tracking-tight text-institutional-900">{value}</p>
      <p className="mt-1 text-sm font-medium text-slate-500">{label}</p>
      {hint && <p className="mt-2 text-xs text-slate-400">{hint}</p>}
    </div>
  );
}
