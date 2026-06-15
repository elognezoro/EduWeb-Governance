import * as React from "react";
import { cn } from "@/lib/utils";
import type { Tone } from "@/lib/enums";

const TONE_CLASSES: Record<Tone, string> = {
  neutral: "bg-slate-100 text-slate-600 ring-slate-200",
  brand: "bg-brand-50 text-brand-700 ring-brand-600/20",
  info: "bg-institutional-50 text-institutional-700 ring-institutional-600/20",
  success: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  warning: "bg-amber-50 text-amber-700 ring-amber-600/20",
  danger: "bg-red-50 text-red-700 ring-red-600/20",
  gold: "bg-gold-100 text-gold-600 ring-gold-500/30",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  dot?: boolean;
}

export function Badge({ tone = "neutral", dot, className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset",
        TONE_CLASSES[tone],
        className
      )}
      {...props}
    >
      {dot && <span className="size-1.5 rounded-full bg-current opacity-70" />}
      {children}
    </span>
  );
}
