"use client";

import Link from "next/link";
import { Printer, ArrowLeft, FileText } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FormationControls() {
  return (
    <div className="fm-no-print sticky top-0 z-20 border-b border-slate-200 bg-card/95 backdrop-blur print:hidden">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-3 px-5 py-3">
        <Link href="/guide" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-brand-700">
          <ArrowLeft className="size-4" /> Retour aux guides
        </Link>
        <a
          href="/formation/download"
          className={cn(buttonVariants({ variant: "outline" }), "ml-auto")}
          download
        >
          <FileText className="size-4" /> Télécharger en Word (.docx)
        </a>
        <Button type="button" onClick={() => window.print()}>
          <Printer className="size-4" /> Imprimer / PDF
        </Button>
      </div>
    </div>
  );
}
