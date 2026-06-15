import type { Metadata } from "next";
import { Trophy, Flame, Medal } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { cn, initials } from "@/lib/utils";

export const metadata: Metadata = { title: "Classement" };

const MEDAL = ["text-gold-500", "text-slate-400", "text-amber-700"];

export default async function LeaderboardPage() {
  const me = await requireUser();

  const ranking = await prisma.userXP.findMany({
    orderBy: [{ totalXp: "desc" }, { level: "desc" }],
    take: 50,
    include: { user: { select: { id: true, firstName: true, lastName: true } } },
  });

  return (
    <div className="space-y-7">
      <PageHeader title="Classement citoyen" description="Les apprenants les plus assidus du référentiel EduLex." icon={Trophy} />

      {ranking.length ? (
        <Card>
          <CardContent className="p-0">
            <ul className="divide-y divide-slate-100">
              {ranking.map((r, i) => {
                const isMe = r.user.id === me.id;
                return (
                  <li key={r.id} className={cn("flex items-center gap-4 px-5 py-3.5", isMe && "bg-brand-50/60")}>
                    <span className="flex w-8 justify-center">
                      {i < 3 ? <Medal className={cn("size-5", MEDAL[i])} /> : <span className="text-sm font-bold text-slate-400">{i + 1}</span>}
                    </span>
                    <span className="flex size-9 items-center justify-center rounded-xl bg-institutional-50 text-xs font-bold text-institutional-700">
                      {initials(r.user.firstName, r.user.lastName)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-ink">{r.user.firstName} {r.user.lastName}{isMe && <span className="ml-2 text-xs font-bold text-brand-700">(vous)</span>}</p>
                      <p className="text-xs text-slate-400">Niveau {r.level}</p>
                    </div>
                    {r.streak > 0 && <span className="hidden items-center gap-1 text-xs font-semibold text-danger-500 sm:flex"><Flame className="size-3.5" /> {r.streak}</span>}
                    <span className="text-right font-extrabold text-gold-600">{r.totalXp} <span className="text-xs font-medium text-slate-400">XP</span></span>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      ) : (
        <EmptyState icon={Trophy} title="Classement vide" description="Répondez à des quiz pour apparaître au classement." />
      )}
    </div>
  );
}
