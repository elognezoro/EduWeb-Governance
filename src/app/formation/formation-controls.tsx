"use client";

import Link from "next/link";
import { Printer, ArrowLeft, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FormationControls() {
  return (
    <div className="fm-no-print sticky top-0 z-20 border-b border-slate-200 bg-card/95 backdrop-blur print:hidden">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-3 px-5 py-3">
        <Link href="/guide" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-brand-700">
          <ArrowLeft className="size-4" /> Retour aux guides
        </Link>
        <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-slate-400">
          <Info className="size-3.5" /> Astuce : activez « En-têtes et pieds de page » dans la boîte d'impression pour la numérotation.
        </span>
        <Button type="button" onClick={() => window.print()}>
          <Printer className="size-4" /> Imprimer / Enregistrer en PDF
        </Button>
      </div>
    </div>
  );
}
