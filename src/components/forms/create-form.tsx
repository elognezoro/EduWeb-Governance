"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle, ArrowRight } from "lucide-react";
import { Input, Label } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createForm } from "@/app/(app)/forms/actions";

export function CreateForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const res = await createForm({ title, description: description || undefined });
      if (res && !res.ok) setError(res.error);
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {error && (
        <div className="flex items-center gap-2 rounded-2xl border border-danger-100 bg-red-50 px-4 py-3 text-sm font-medium text-danger-600">
          <AlertCircle className="size-4 shrink-0" /> {error}
        </div>
      )}
      <div className="space-y-2"><Label htmlFor="t">Titre du formulaire *</Label><Input id="t" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex. Fiche de compte rendu d'activité" required /></div>
      <div className="space-y-2"><Label htmlFor="d">Description</Label><Textarea id="d" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="À quoi sert ce formulaire ?" /></div>
      <div className="flex items-center gap-3 border-t border-slate-100 pt-5">
        <Button type="submit" disabled={pending}>
          {pending ? <Loader2 className="size-4 animate-spin" /> : <ArrowRight className="size-4" />} Créer et composer les champs
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.back()} disabled={pending}>Annuler</Button>
      </div>
    </form>
  );
}
