"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";
import { deleteGovernment } from "@/app/(app)/edulex/reference-actions";

export function GovernmentDeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [confirm, setConfirm] = useState(false);

  function run() {
    start(async () => {
      await deleteGovernment(id);
      router.refresh();
    });
  }

  if (!confirm) {
    return (
      <button type="button" onClick={() => setConfirm(true)} title="Supprimer le gouvernement" className="rounded-xl p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-danger-600">
        <Trash2 className="size-4" />
      </button>
    );
  }
  return (
    <span className="inline-flex items-center gap-2 text-xs">
      Supprimer ?
      <button type="button" onClick={run} disabled={pending} className="inline-flex items-center gap-1 font-semibold text-danger-600">
        {pending ? <Loader2 className="size-3 animate-spin" /> : "Oui"}
      </button>
      <button type="button" onClick={() => setConfirm(false)} className="font-semibold text-slate-500">Non</button>
    </span>
  );
}
