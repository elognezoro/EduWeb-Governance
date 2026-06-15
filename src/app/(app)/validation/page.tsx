import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Clock, ArrowRight, ShieldAlert } from "lucide-react";
import { requireUser, hasPermission, fullName, roleKeys, isSuperAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getSelectedCountryCode } from "@/lib/country";
import { getValidationHierarchy } from "@/lib/validation-hierarchy";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { EmptyState } from "@/components/ui/empty-state";
import { ACTIVITY_STATUS_MAP } from "@/lib/enums";
import { cn, formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Validation" };

export default async function ValidationPage() {
  const user = await requireUser();
  const canValidate = hasPermission(user, "activity:validate");
  const code = await getSelectedCountryCode();

  let countryId: string | undefined;
  if (code !== "ALL") {
    const c = await prisma.country.findUnique({ where: { code } });
    countryId = c?.id;
  }

  const seeAll = hasPermission(user, "admin:manage");
  const orgScope = seeAll ? {} : user.organizationId ? { organizationId: user.organizationId } : {};
  const pendingStatuses = ["SUBMITTED", "IN_REVIEW", "TO_CORRECT"];
  const where = {
    deletedAt: null,
    status: { in: pendingStatuses },
    ...orgScope,
    ...(countryId ? { countryId } : {}),
  };

  const [pending, validatedCount, hierarchy] = await Promise.all([
    prisma.activity.findMany({ where, orderBy: { submittedAt: "asc" }, include: { author: true, structure: true } }),
    prisma.activity.count({ where: { deletedAt: null, status: "VALIDATED", ...orgScope } }),
    getValidationHierarchy(),
  ]);
  const myRoles = roleKeys(user);
  const sa = isSuperAdmin(user);

  return (
    <div className="space-y-7">
      <PageHeader title="Validation hiérarchique" description="Examinez et statuez sur les activités soumises." icon={CheckCircle2} />

      {hierarchy.length > 0 && (
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-2xl border border-brand-100 bg-brand-50/60 px-4 py-2.5 text-xs font-semibold text-brand-800">
          <span className="uppercase tracking-wide text-brand-600">Circuit de validation :</span>
          {hierarchy.map((h, i) => (
            <span key={h.roleKey} className="inline-flex items-center gap-2">
              {i > 0 && <span className="text-brand-400">→</span>}
              <span className="rounded-full bg-card px-2 py-0.5">{i + 1}. {h.name}</span>
            </span>
          ))}
        </div>
      )}

      {!canValidate && (
        <div className="flex items-start gap-3 rounded-3xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <ShieldAlert className="mt-0.5 size-5 shrink-0" />
          <p>Votre profil n'a pas la permission de validation (<code>activity:validate</code>). Vous pouvez consulter la file mais pas statuer.</p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Card><CardContent className="flex items-center gap-3 p-5">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-gold-100 text-gold-600"><Clock className="size-5" /></span>
          <div><p className="text-2xl font-extrabold text-institutional-900">{pending.length}</p><p className="text-sm text-slate-500">En attente de décision</p></div>
        </CardContent></Card>
        <Card><CardContent className="flex items-center gap-3 p-5">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700"><CheckCircle2 className="size-5" /></span>
          <div><p className="text-2xl font-extrabold text-institutional-900">{validatedCount}</p><p className="text-sm text-slate-500">Validées (organisation)</p></div>
        </CardContent></Card>
      </div>

      {pending.length ? (
        <div className="space-y-3">
          {pending.map((a) => {
            const lvl = a.validationLevel ?? 0;
            const step = hierarchy[lvl];
            const mine = !!step && (sa || myRoles.includes(step.roleKey));
            return (
              <Link key={a.id} href={`/activities/${a.id}`} className="flex items-center gap-4 rounded-3xl border border-slate-100 bg-card p-4 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-glow">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-ink">{a.title}</p>
                  <p className="text-xs text-slate-400">
                    {fullName(a.author)} · {a.structure?.name ?? "—"} · soumise le {formatDate(a.submittedAt)}
                  </p>
                </div>
                {hierarchy.length > 0 && step && (
                  <span className={cn(
                    "hidden shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold lg:inline-flex lg:items-center",
                    mine ? "bg-brand-100 text-brand-700" : "bg-slate-100 text-slate-500"
                  )}>
                    Niveau {lvl + 1}/{hierarchy.length} · {step.name}{mine ? " · à vous" : ""}
                  </span>
                )}
                <StatusBadge value={a.status} map={ACTIVITY_STATUS_MAP} />
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700">Examiner <ArrowRight className="size-4" /></span>
              </Link>
            );
          })}
        </div>
      ) : (
        <EmptyState icon={CheckCircle2} title="Rien à valider" description="Aucune activité en attente sur votre périmètre. Beau travail !" />
      )}
    </div>
  );
}
