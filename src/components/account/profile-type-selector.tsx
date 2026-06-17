"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { PROFILE_TYPES, PROFILE_META, type ProfileType } from "@/lib/profile";
import { setProfileType } from "@/app/(app)/account/actions";

export function ProfileTypeSelector({ current }: { current: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();

  function pick(t: ProfileType) {
    if (t === current || pending) return;
    start(async () => {
      const r = await setProfileType(t);
      if (r.ok) router.refresh();
    });
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {PROFILE_TYPES.map((t) => {
        const m = PROFILE_META[t];
        const active = t === current;
        return (
          <button
            key={t}
            type="button"
            onClick={() => pick(t)}
            disabled={pending}
            aria-pressed={active}
            className={cn(
              "flex flex-col items-center gap-1.5 rounded-2xl border p-4 text-sm font-semibold transition-colors disabled:opacity-60",
              active ? "border-brand-300 bg-brand-50 text-brand-700" : "border-slate-200 text-slate-500 hover:border-slate-300 hover:text-ink"
            )}
          >
            <span className="text-2xl leading-none">{m.emoji}</span>
            {m.label}
            {active && pending && <Loader2 className="size-3.5 animate-spin" />}
          </button>
        );
      })}
    </div>
  );
}
