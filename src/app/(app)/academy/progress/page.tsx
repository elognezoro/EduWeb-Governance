import type { Metadata } from "next";
import Link from "next/link";
import { Trophy, Flame, Star, GraduationCap, Scale, RefreshCw, Award } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { BadgeIcon } from "@/components/academy/badge-icon";

export const metadata: Metadata = { title: "Ma progression" };

export default async function ProgressPage() {
  const user = await requireUser();

  const [xp, progress, badges, recos] = await Promise.all([
    prisma.userXP.findUnique({ where: { userId: user.id } }),
    prisma.userProgress.findMany({ where: { userId: user.id }, include: { path: { include: { category: true } } }, orderBy: { updatedAt: "desc" } }),
    prisma.userBadge.findMany({ where: { userId: user.id }, include: { badge: true }, orderBy: { awardedAt: "desc" } }),
    prisma.reviewRecommendation.findMany({ where: { userId: user.id }, include: { legalText: { select: { id: true, code: true, title: true } } }, orderBy: { createdAt: "desc" }, take: 8 }),
  ]);

  const totalXp = xp?.totalXp ?? 0;
  const level = xp?.level ?? 1;
  const xpInLevel = totalXp % 100;

  return (
    <div className="space-y-7">
      <PageHeader title="Ma progression" description="Votre maîtrise réglementaire en un coup d'œil." icon={Trophy} />

      {/* Bandeau XP */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card><CardContent className="flex items-center gap-3 p-5">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-gold-100 text-gold-600"><Star className="size-6" /></span>
          <div><p className="text-2xl font-extrabold text-institutional-900">{totalXp}</p><p className="text-sm text-slate-500">XP cumulés</p></div>
        </CardContent></Card>
        <Card><CardContent className="p-5">
          <div className="flex items-center gap-3">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700"><GraduationCap className="size-6" /></span>
            <div><p className="text-2xl font-extrabold text-institutional-900">Niveau {level}</p><p className="text-sm text-slate-500">{xpInLevel}/100 vers niveau {level + 1}</p></div>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-brand-600" style={{ width: `${xpInLevel}%` }} /></div>
        </CardContent></Card>
        <Card><CardContent className="flex items-center gap-3 p-5">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-red-50 text-danger-500"><Flame className="size-6" /></span>
          <div><p className="text-2xl font-extrabold text-institutional-900">{xp?.streak ?? 0} jour(s)</p><p className="text-sm text-slate-500">Série d'apprentissage</p></div>
        </CardContent></Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Parcours */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><GraduationCap className="size-4 text-brand-700" /> Mes parcours</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {progress.length ? progress.map((p) => (
                <Link key={p.id} href={`/academy/path/${p.pathId}`} className="block rounded-2xl border border-slate-100 p-4 hover:bg-slate-50">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-ink">{p.path.title}</span>
                    <span className="text-sm font-bold text-brand-700">{p.progress}%</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-brand-600" style={{ width: `${p.progress}%` }} /></div>
                </Link>
              )) : <EmptyState icon={GraduationCap} title="Aucun parcours démarré" description="Lancez un parcours depuis Academy." />}
            </CardContent>
          </Card>

          {/* Textes à revoir */}
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><RefreshCw className="size-4 text-brand-700" /> Textes à revoir</CardTitle></CardHeader>
            <CardContent>
              {recos.length ? (
                <ul className="space-y-2">
                  {recos.filter((r) => r.legalText).map((r) => (
                    <li key={r.id}>
                      <Link href={`/edulex/texts/${r.legalText!.id}`} className="flex items-center justify-between rounded-2xl border border-slate-100 px-3 py-2.5 hover:bg-slate-50">
                        <span className="flex items-center gap-2 text-sm font-medium text-ink"><Scale className="size-4 text-slate-400" /> {r.legalText!.title}</span>
                        <span className="font-mono text-[11px] text-slate-400">{r.legalText!.code}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : <p className="text-sm text-slate-400">Aucune recommandation. Continuez ainsi !</p>}
            </CardContent>
          </Card>
        </div>

        {/* Badges */}
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Award className="size-4 text-brand-700" /> Mes badges</CardTitle></CardHeader>
          <CardContent>
            {badges.length ? (
              <div className="grid grid-cols-2 gap-3">
                {badges.map((b) => (
                  <div key={b.badgeId} className="flex flex-col items-center rounded-2xl border border-gold-200 bg-gold-50/60 p-3 text-center">
                    <BadgeIcon name={b.badge.icon} className="size-7 text-gold-600" />
                    <p className="mt-1.5 text-xs font-bold text-institutional-900">{b.badge.name}</p>
                  </div>
                ))}
              </div>
            ) : <p className="text-sm text-slate-400">Pas encore de badge. Répondez à des quiz pour en gagner !</p>}
            <Link href="/academy/badges" className="mt-4 block text-center text-sm font-semibold text-brand-700 hover:underline">Voir tous les badges →</Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
