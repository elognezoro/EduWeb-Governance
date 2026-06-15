"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Trash2, Loader2 } from "lucide-react";
import { setQuestionStatus, deleteQuestion } from "@/app/(app)/academy/admin/actions";

export function QuestionAdminActions({ id, status }: { id: string; status: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const toggle = () =>
    startTransition(async () => {
      await setQuestionStatus(id, status === "PUBLISHED" ? "DRAFT" : "PUBLISHED");
      router.refresh();
    });
  const remove = () =>
    startTransition(async () => {
      await deleteQuestion(id);
      router.refresh();
    });

  return (
    <div className="flex items-center gap-1">
      {pending && <Loader2 className="size-4 animate-spin text-slate-400" />}
      <button onClick={toggle} disabled={pending} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-brand-700" title={status === "PUBLISHED" ? "Dépublier" : "Publier"}>
        {status === "PUBLISHED" ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
      </button>
      <button onClick={remove} disabled={pending} className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-danger-500" title="Supprimer">
        <Trash2 className="size-4" />
      </button>
    </div>
  );
}
