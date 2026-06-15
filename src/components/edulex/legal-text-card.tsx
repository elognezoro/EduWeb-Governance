import Link from "next/link";
import { AlertTriangle, CalendarDays, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { VerificationBadge } from "@/components/ui/verification-badge";
import { Flag } from "@/components/ui/flag";
import { LEGAL_STATUS_MAP, LEGAL_TYPE_MAP, metaOf } from "@/lib/enums";
import { formatDate } from "@/lib/utils";

export interface LegalTextCardData {
  id: string;
  code: string;
  title: string;
  type: string;
  status: string;
  verificationLevel: string;
  summary: string | null;
  publicationDate: Date | null;
  country: { code: string; name: string; namespace: string | null; flag: string | null };
}

export function LegalTextCard({ text }: { text: LegalTextCardData }) {
  const isUnverified = text.verificationLevel === "V0";
  const isObsolete = ["ABROGATED", "REPLACED", "SUSPENDED"].includes(text.status);
  const typeMeta = metaOf(LEGAL_TYPE_MAP, text.type);

  return (
    <div className="group relative flex flex-col rounded-3xl border border-slate-100 bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-glow">
      {/* Lien « étiré » : toute la carte est cliquable, sauf les boutons en z-10. */}
      <Link href={`/edulex/texts/${text.id}`} aria-label={text.title} className="absolute inset-0 rounded-3xl" />

      <div className="flex items-center justify-between gap-2">
        <Badge tone={typeMeta.tone}>{typeMeta.label}</Badge>
        <span className="font-mono text-[11px] text-slate-400">{text.code}</span>
      </div>

      <h3 className="mt-3 line-clamp-2 font-bold text-institutional-900 group-hover:text-brand-700">
        {text.title}
      </h3>

      {text.summary && (
        <p className="mt-1.5 line-clamp-2 text-sm text-slate-500">{text.summary}</p>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <StatusBadge value={text.status} map={LEGAL_STATUS_MAP} />
        <VerificationBadge level={text.verificationLevel} />
      </div>

      {(isUnverified || isObsolete) && (
        <div className="mt-3 flex items-center gap-1.5 rounded-xl bg-amber-50 px-2.5 py-1.5 text-xs font-semibold text-amber-700">
          <AlertTriangle className="size-3.5 shrink-0" />
          {isUnverified
            ? "Donnée non vérifiée (V0) — à confirmer avant usage."
            : "Texte non en vigueur — vérifiez la version applicable."}
        </div>
      )}

      <div className="mt-auto flex items-center justify-between gap-2 pt-4 text-xs text-slate-400">
        <span className="inline-flex items-center gap-1.5"><Flag code={text.country.code} className="w-4" /> {text.country.namespace || text.country.name}</span>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1"><CalendarDays className="size-3.5" /> {formatDate(text.publicationDate)}</span>
          <a
            href={`/edulex/texts/${text.id}/download?format=pdf`}
            download
            title="Télécharger la fiche (PDF)"
            aria-label="Télécharger la fiche"
            className="relative z-10 inline-flex size-7 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
          >
            <Download className="size-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
