import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  AlertTriangle,
  ExternalLink,
  Download,
  CalendarDays,
  Building2,
  Globe2,
  Scale,
  History,
  Link2,
  Gavel,
} from "lucide-react";
import { requireUser, hasPermission, fullName } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { VerificationBadge } from "@/components/ui/verification-badge";
import { Flag } from "@/components/ui/flag";
import { ValidationPanel } from "@/components/edulex/validation-panel";
import {
  LEGAL_STATUS_MAP,
  LEGAL_TYPE_MAP,
  CONFIDENTIALITY_MAP,
  metaOf,
} from "@/lib/enums";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Texte EduLex" };

const RELATION_LABELS: Record<string, string> = {
  REPLACES: "Remplace",
  MODIFIES: "Modifie",
  ABROGATES: "Abroge",
  RELATED: "Lié à",
  CITES: "Cite",
};

const LOG_LABELS: Record<string, string> = {
  LEVEL_CHANGE: "Niveau de vérification",
  STATUS_CHANGE: "Changement de statut",
  PUBLISH: "Publication",
  VERIFY_DOC: "Vérification documentaire",
  LEGAL_REVIEW: "Vérification juridique",
  APPROVE: "Approbation",
};

export default async function LegalTextDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireUser();
  const { id } = await params;

  const text = await prisma.legalText.findUnique({
    where: { id },
    include: {
      country: true,
      ministry: true,
      sector: true,
      jurisdiction: true,
      category: true,
      depositedBy: true,
      validatedBy: true,
      versions: { orderBy: { version: "desc" } },
      relationsFrom: { include: { target: true } },
      validationLog: { include: { actor: true }, orderBy: { createdAt: "desc" } },
    },
  });

  if (!text || text.deletedAt) notFound();

  const canValidate = hasPermission(user, "edulex:validate");
  const canPublish = hasPermission(user, "edulex:publish");
  const isUnverified = text.verificationLevel === "V0";
  const isObsolete = ["ABROGATED", "REPLACED", "SUSPENDED"].includes(text.status);
  const typeMeta = metaOf(LEGAL_TYPE_MAP, text.type);

  const meta = [
    { icon: Globe2, label: "Pays", value: <span className="inline-flex items-center gap-1.5"><Flag code={text.country.code} className="w-4" /> {text.country.namespace || text.country.name}</span> },
    { icon: Scale, label: "Juridiction", value: text.jurisdiction?.name ?? "—" },
    { icon: Building2, label: "Ministère émetteur", value: text.ministry?.name ?? "—" },
    { icon: Scale, label: "Secteur", value: text.sector?.name ?? "—" },
    { icon: CalendarDays, label: "Signature", value: formatDate(text.signatureDate) },
    { icon: CalendarDays, label: "Publication", value: formatDate(text.publicationDate) },
    { icon: CalendarDays, label: "Entrée en vigueur", value: formatDate(text.effectiveDate) },
  ];

  return (
    <div className="space-y-6">
      <Link href="/edulex" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-brand-700">
        <ArrowLeft className="size-4" /> Retour à EduLex
      </Link>

      {/* Avertissements */}
      {(isUnverified || isObsolete) && (
        <div className="flex items-start gap-2.5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-medium text-amber-800">
          <AlertTriangle className="mt-0.5 size-5 shrink-0" />
          <div>
            {isUnverified && <p>Ce texte est au niveau <strong>V0</strong> : entrée non vérifiée. Ne pas considérer comme juridiquement certifié.</p>}
            {isObsolete && <p>Ce texte n'est pas en vigueur (<strong>{metaOf(LEGAL_STATUS_MAP, text.status).label}</strong>). Vérifiez la version applicable.</p>}
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Colonne principale */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={typeMeta.tone}>{typeMeta.label}</Badge>
                <StatusBadge value={text.status} map={LEGAL_STATUS_MAP} />
                <VerificationBadge level={text.verificationLevel} />
                <Badge tone={metaOf(CONFIDENTIALITY_MAP, text.confidentiality).tone}>
                  {metaOf(CONFIDENTIALITY_MAP, text.confidentiality).label}
                </Badge>
              </div>
              <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-institutional-900">
                {text.title}
              </h1>
              <p className="mt-2 font-mono text-xs text-slate-400">
                {text.code}{text.officialNumber ? ` · N° ${text.officialNumber}` : ""}
              </p>

              {text.summary && (
                <div className="mt-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Résumé analytique</p>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-slate-600">{text.summary}</p>
                </div>
              )}

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a
                  href={`/edulex/texts/${text.id}/download?format=pdf`}
                  className="inline-flex items-center gap-1.5 rounded-2xl bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
                >
                  <Download className="size-4" /> Télécharger (PDF)
                </a>
                <a
                  href={`/edulex/texts/${text.id}/download?format=md`}
                  className="inline-flex items-center gap-1.5 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:border-brand-200 hover:text-brand-700"
                >
                  <Download className="size-4" /> Markdown
                </a>
                {text.sourceUrl && (
                  <a
                    href={text.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-institutional-700 hover:underline"
                  >
                    <ExternalLink className="size-4" /> Consulter la source officielle
                  </a>
                )}
              </div>

              {text.category && (
                <p className="mt-3 text-sm text-slate-500">
                  Catégorie : <span className="font-semibold text-slate-700">{text.category.name}</span>
                </p>
              )}
            </CardContent>
          </Card>

          {/* Relations */}
          {text.relationsFrom.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Link2 className="size-4 text-brand-700" /> Relations avec d'autres textes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {text.relationsFrom.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/edulex/texts/${rel.target.id}`}
                    className="flex items-center justify-between rounded-2xl border border-slate-100 p-3 hover:bg-slate-50"
                  >
                    <span className="text-sm">
                      <span className="font-semibold text-brand-700">{RELATION_LABELS[rel.type] ?? rel.type}</span>{" "}
                      <span className="text-ink">{rel.target.title}</span>
                    </span>
                    <span className="font-mono text-[11px] text-slate-400">{rel.target.code}</span>
                  </Link>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Versions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><History className="size-4 text-brand-700" /> Historique des versions</CardTitle>
            </CardHeader>
            <CardContent>
              {text.versions.length ? (
                <ol className="relative space-y-4 border-l-2 border-slate-100 pl-5">
                  {text.versions.map((v) => (
                    <li key={v.id} className="relative">
                      <span className="absolute -left-[1.6rem] top-1 size-3 rounded-full border-2 border-white bg-brand-500" />
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-institutional-900">Version {v.version}</span>
                        {v.verificationLevel && <VerificationBadge level={v.verificationLevel} />}
                      </div>
                      {v.note && <p className="mt-0.5 text-sm text-slate-500">{v.note}</p>}
                      <p className="mt-0.5 text-xs text-slate-400">{formatDate(v.createdAt)}</p>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-sm text-slate-400">Version {text.currentVersion} (initiale).</p>
              )}
            </CardContent>
          </Card>

          {/* Journal de validation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Gavel className="size-4 text-brand-700" /> Journal de validation</CardTitle>
            </CardHeader>
            <CardContent>
              {text.validationLog.length ? (
                <ol className="relative space-y-4 border-l-2 border-slate-100 pl-5">
                  {text.validationLog.map((a) => (
                    <li key={a.id} className="relative">
                      <span className="absolute -left-[1.6rem] top-1 size-3 rounded-full border-2 border-white bg-brand-500" />
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-bold text-institutional-900">{LOG_LABELS[a.decision] ?? a.decision}</span>
                        <span className="text-sm text-ink">{fullName(a.actor)}</span>
                        <span className="text-xs text-slate-400">{formatDate(a.createdAt)}</span>
                      </div>
                      {(a.fromLevel || a.fromStatus) && (
                        <p className="mt-0.5 text-xs text-slate-500">
                          {a.fromLevel && a.toLevel ? `Niveau ${a.fromLevel} → ${a.toLevel}.` : ""}
                          {a.fromStatus && a.toStatus ? ` Statut ${a.fromStatus} → ${a.toStatus}.` : ""}
                        </p>
                      )}
                      {a.comment && <p className="mt-0.5 text-sm text-slate-500">« {a.comment} »</p>}
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-sm text-slate-400">Aucune action de validation enregistrée.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Métadonnées */}
        <div className="space-y-6">
          {canValidate && (
            <ValidationPanel id={text.id} currentLevel={text.verificationLevel} currentStatus={text.status} canPublish={canPublish} currentSource={text.sourceUrl} />
          )}
          <Card>
            <CardHeader>
              <CardTitle>Métadonnées</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {meta.map((m) => {
                const Icon = m.icon;
                return (
                  <div key={m.label} className="flex items-start gap-3">
                    <Icon className="mt-0.5 size-4 shrink-0 text-slate-400" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{m.label}</p>
                      <p className="text-sm font-medium text-ink">{m.value}</p>
                    </div>
                  </div>
                );
              })}
              <div className="border-t border-slate-100 pt-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Langue · Version</p>
                <p className="text-sm font-medium text-ink">{text.language.toUpperCase()} · v{text.currentVersion}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Traçabilité</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Déposé par</p>
                <p className="font-medium text-ink">{text.depositedBy ? `${text.depositedBy.firstName} ${text.depositedBy.lastName}` : "—"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Validé par</p>
                <p className="font-medium text-ink">{text.validatedBy ? `${text.validatedBy.firstName} ${text.validatedBy.lastName}` : "—"}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
