import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ClipboardList, CalendarRange, Building2, User, Scale, History, Paperclip, Download, type LucideIcon } from "lucide-react";
import { FileUpload } from "@/components/ui/file-upload";
import { requireUser, hasPermission, fullName, roleKeys, isSuperAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getValidationHierarchy } from "@/lib/validation-hierarchy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Badge } from "@/components/ui/badge";
import { Flag } from "@/components/ui/flag";
import type { ReactNode } from "react";
import { ACTIVITY_STATUS_MAP, metaOf } from "@/lib/enums";
import { formatDate } from "@/lib/utils";
import { ActivityAuthorActions } from "@/components/activities/activity-actions";
import { ValidationActions } from "@/components/activities/validation-actions";

export const metadata: Metadata = { title: "Activité" };

const DECISION_META: Record<string, { label: string; tone: "neutral" | "success" | "danger" | "warning" | "brand" | "info" }> = {
  SUBMIT: { label: "Soumission", tone: "info" },
  VALIDATE: { label: "Validation", tone: "success" },
  REJECT: { label: "Rejet", tone: "danger" },
  REQUEST_CORRECTION: { label: "Demande de correction", tone: "warning" },
  CONSOLIDATE: { label: "Consolidation", tone: "brand" },
};

function getDescription(data: string | null): string {
  if (!data) return "";
  try {
    const parsed = JSON.parse(data);
    return typeof parsed?.description === "string" ? parsed.description : "";
  } catch {
    return "";
  }
}

export default async function ActivityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await params;

  const activity = await prisma.activity.findUnique({
    where: { id },
    include: {
      author: true,
      structure: true,
      country: true,
      legalTexts: true,
      validationActions: { include: { actor: true }, orderBy: { createdAt: "desc" } },
      attachments: { include: { fileAsset: true } },
    },
  });

  if (!activity || activity.deletedAt) notFound();

  const isAuthor = activity.authorId === user.id;
  const canValidate = hasPermission(user, "activity:validate");
  const canAttach = isAuthor || hasPermission(user, "activity:update") || hasPermission(user, "activity:validate");
  const editable = ["DRAFT", "TO_CORRECT", "REJECTED"].includes(activity.status);
  const description = getDescription(activity.data);
  const fmtSize = (b: number) => (b > 1048576 ? `${(b / 1048576).toFixed(1)} Mo` : `${Math.max(1, Math.round(b / 1024))} Ko`);

  // Hiérarchie de validation : niveau courant attendu et habilitation de l'utilisateur.
  const hierarchy = await getValidationHierarchy();
  const lvl = activity.validationLevel ?? 0;
  const step = hierarchy[lvl];
  const levelInfo =
    hierarchy.length > 0 && step && ["SUBMITTED", "IN_REVIEW"].includes(activity.status)
      ? { current: lvl + 1, total: hierarchy.length, name: step.name, canActNow: isSuperAdmin(user) || roleKeys(user).includes(step.roleKey) }
      : null;

  return (
    <div className="space-y-6">
      <Link href="/activities" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-brand-700">
        <ArrowLeft className="size-4" /> Retour aux activités
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-bold text-brand-700">
                  <ClipboardList className="size-3.5" /> Activité
                </span>
                <StatusBadge value={activity.status} map={ACTIVITY_STATUS_MAP} />
              </div>
              <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-institutional-900">{activity.title}</h1>
              {description ? (
                <p className="mt-3 whitespace-pre-wrap text-[15px] leading-relaxed text-slate-600">{description}</p>
              ) : (
                <p className="mt-3 text-sm italic text-slate-400">Aucune description.</p>
              )}
            </CardContent>
          </Card>

          {/* Textes EduLex liés */}
          {activity.legalTexts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Scale className="size-4 text-brand-700" /> Textes EduLex associés</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {activity.legalTexts.map((t) => (
                  <Link key={t.id} href={`/edulex/texts/${t.id}`} className="flex items-center justify-between rounded-2xl border border-slate-100 p-3 hover:bg-slate-50">
                    <span className="text-sm font-medium text-ink">{t.title}</span>
                    <span className="font-mono text-[11px] text-slate-400">{t.code}</span>
                  </Link>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Pièces jointes */}
          {(activity.attachments.length > 0 || canAttach) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Paperclip className="size-4 text-brand-700" /> Pièces jointes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {activity.attachments.length > 0 ? (
                  <ul className="space-y-2">
                    {activity.attachments.map((a) => (
                      <li key={a.id}>
                        <a href={a.fileAsset.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 p-3 transition-colors hover:bg-slate-50">
                          <span className="flex min-w-0 items-center gap-2 text-sm font-medium text-ink">
                            <Download className="size-4 shrink-0 text-brand-700" />
                            <span className="truncate">{a.fileAsset.filename}</span>
                          </span>
                          <span className="shrink-0 text-xs text-slate-400">{fmtSize(a.fileAsset.size)}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-slate-400">Aucune pièce jointe.</p>
                )}
                {canAttach && (
                  <FileUpload purpose="activity" entityId={activity.id} accept="application/pdf,image/*,.doc,.docx,.xls,.xlsx" label="Joindre un document" />
                )}
              </CardContent>
            </Card>
          )}

          {/* Décision de validation */}
          {canValidate && <ValidationActions id={activity.id} status={activity.status} levelInfo={levelInfo} />}

          {/* Historique */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><History className="size-4 text-brand-700" /> Historique de validation</CardTitle>
            </CardHeader>
            <CardContent>
              {activity.validationActions.length ? (
                <ol className="relative space-y-4 border-l-2 border-slate-100 pl-5">
                  {activity.validationActions.map((va) => {
                    const m = DECISION_META[va.decision] ?? { label: va.decision, tone: "neutral" as const };
                    return (
                      <li key={va.id} className="relative">
                        <span className="absolute -left-[1.6rem] top-1 size-3 rounded-full border-2 border-white bg-brand-500" />
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge tone={m.tone}>{m.label}</Badge>
                          <span className="text-sm font-semibold text-ink">{fullName(va.actor)}</span>
                          <span className="text-xs text-slate-400">{formatDate(va.createdAt)}</span>
                        </div>
                        {va.comment && <p className="mt-1 text-sm text-slate-500">« {va.comment} »</p>}
                      </li>
                    );
                  })}
                </ol>
              ) : (
                <p className="text-sm text-slate-400">Aucune action pour le moment.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Colonne latérale */}
        <div className="space-y-6">
          {isAuthor && (
            <Card>
              <CardHeader><CardTitle>Actions</CardTitle></CardHeader>
              <CardContent>
                <ActivityAuthorActions id={activity.id} canEdit={editable} canSubmit={editable} />
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader><CardTitle>Informations</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Row icon={User} label="Auteur" value={fullName(activity.author)} />
              <Row icon={Building2} label="Structure" value={activity.structure?.name ?? "—"} />
              <Row icon={Scale} label="Pays" value={activity.country ? <span className="inline-flex items-center gap-1.5"><Flag code={activity.country.code} className="w-4" /> {activity.country.name}</span> : "—"} />
              <Row icon={CalendarRange} label="Période" value={activity.periodStart || activity.periodEnd ? `${formatDate(activity.periodStart)} → ${formatDate(activity.periodEnd)}` : "—"} />
              <Row icon={History} label="Soumise le" value={formatDate(activity.submittedAt)} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Row({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-slate-400" />
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
        <p className="text-sm font-medium text-ink">{value}</p>
      </div>
    </div>
  );
}
