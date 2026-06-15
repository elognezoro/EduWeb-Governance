"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Send, Pencil, Trash2, Loader2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { submitActivity, deleteActivity } from "@/app/(app)/activities/actions";

export function ActivityAuthorActions({
  id,
  canEdit,
  canSubmit,
}: {
  id: string;
  canEdit: boolean;
  canSubmit: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function submit() {
    setError(null);
    startTransition(async () => {
      const res = await submitActivity(id);
      if (!res.ok) setError(res.error);
      else router.refresh();
    });
  }

  function remove() {
    startTransition(async () => {
      const res = await deleteActivity(id);
      if (res && !res.ok) setError(res.error);
    });
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {canSubmit && (
          <Button onClick={submit} disabled={pending}>
            {pending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
            Soumettre à validation
          </Button>
        )}
        {canEdit && (
          <Link href={`/activities/${id}/edit`} className={cn(buttonVariants({ variant: "outline" }))}>
            <Pencil className="size-4" /> Modifier
          </Link>
        )}
        {!confirming ? (
          <Button variant="ghost" onClick={() => setConfirming(true)} disabled={pending} className="text-danger-500 hover:bg-red-50">
            <Trash2 className="size-4" /> Supprimer
          </Button>
        ) : (
          <span className="inline-flex items-center gap-2 rounded-2xl bg-red-50 px-3 py-1.5 text-sm">
            <span className="font-medium text-danger-600">Confirmer ?</span>
            <button onClick={remove} disabled={pending} className="font-bold text-danger-600 hover:underline">Oui, supprimer</button>
            <button onClick={() => setConfirming(false)} className="text-slate-500 hover:underline">Annuler</button>
          </span>
        )}
      </div>
      {error && <p className="text-sm font-medium text-danger-600">{error}</p>}
    </div>
  );
}
