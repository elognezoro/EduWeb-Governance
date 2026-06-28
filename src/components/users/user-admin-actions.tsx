"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Power, KeyRound, Loader2, Check, Trash2 } from "lucide-react";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import { toggleUserActive, resetUserPassword, deleteUser } from "@/app/(app)/users/actions";

export function UserAdminActions({
  id,
  isActive,
  isSelf,
}: {
  id: string;
  isActive: boolean;
  isSelf: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [pwd, setPwd] = useState("");
  const [done, setDone] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);

  function remove() {
    setError(null);
    startTransition(async () => {
      const res = await deleteUser(id);
      if (!res.ok) setError(res.error);
      else router.push("/users");
    });
  }

  function toggle() {
    setError(null);
    startTransition(async () => {
      const res = await toggleUserActive(id);
      if (!res.ok) setError(res.error);
      else router.refresh();
    });
  }

  function reset() {
    setError(null);
    setDone(false);
    startTransition(async () => {
      const res = await resetUserPassword(id, pwd);
      if (!res.ok) setError(res.error);
      else {
        setPwd("");
        setDone(true);
      }
    });
  }

  return (
    <div className="space-y-4">
      <div>
        <Button
          variant={isActive ? "danger" : "primary"}
          onClick={toggle}
          disabled={pending || isSelf}
          className="w-full"
        >
          {pending ? <Loader2 className="size-4 animate-spin" /> : <Power className="size-4" />}
          {isActive ? "Désactiver le compte" : "Activer le compte"}
        </Button>
        {isSelf && <p className="mt-1.5 text-xs text-slate-400">Vous ne pouvez pas désactiver votre propre compte.</p>}
      </div>

      <div className="space-y-2 border-t border-slate-100 pt-4">
        <p className="flex items-center gap-1.5 text-sm font-semibold text-ink"><KeyRound className="size-4 text-slate-400" /> Réinitialiser le mot de passe</p>
        <PasswordInput value={pwd} onChange={(e) => { setPwd(e.target.value); setDone(false); }} placeholder="Nouveau mot de passe (min. 8)" minLength={8} />
        <Button variant="outline" onClick={reset} disabled={pending || pwd.length < 8} className="w-full">
          {done ? <Check className="size-4 text-brand-600" /> : <KeyRound className="size-4" />}
          {done ? "Mot de passe réinitialisé" : "Réinitialiser"}
        </Button>
      </div>

      <div className="space-y-2 border-t border-slate-100 pt-4">
        {!confirmDel ? (
          <Button variant="ghost" onClick={() => setConfirmDel(true)} disabled={pending || isSelf} className="w-full text-danger-500 hover:bg-red-50">
            <Trash2 className="size-4" /> Supprimer le compte
          </Button>
        ) : (
          <div className="rounded-2xl bg-red-50 p-3">
            <p className="text-sm font-medium text-danger-600">Supprimer définitivement ce compte ?</p>
            <div className="mt-2 flex gap-2">
              <Button variant="danger" size="sm" onClick={remove} disabled={pending}>
                {pending && <Loader2 className="size-4 animate-spin" />} Oui, supprimer
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setConfirmDel(false)} disabled={pending}>Annuler</Button>
            </div>
          </div>
        )}
        {isSelf && <p className="text-xs text-slate-400">Vous ne pouvez pas supprimer votre propre compte.</p>}
      </div>

      {error && <p className="text-sm font-medium text-danger-600">{error}</p>}
    </div>
  );
}
