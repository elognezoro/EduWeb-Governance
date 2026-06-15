import type { Metadata } from "next";
import { Award, Lock } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeIcon } from "@/components/academy/badge-icon";
import { cn, formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Badges" };

export default async function BadgesPage() {
  const user = await requireUser();

  const [badges, earned] = await Promise.all([
    prisma.badge.findMany({ orderBy: { name: "asc" } }),
    prisma.userBadge.findMany({ where: { userId: user.id } }),
  ]);
  const earnedMap = new Map(earned.map((e) => [e.badgeId, e.awardedAt]));

  return (
    <div className="space-y-7">
      <PageHeader
        title="Badges & trophées"
        description={`${earned.length} / ${badges.length} badge(s) obtenu(s).`}
        icon={Award}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {badges.map((b) => {
          const got = earnedMap.has(b.id);
          return (
            <Card key={b.id} className={cn(!got && "opacity-70")}>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <span className={cn("flex size-16 items-center justify-center rounded-3xl", got ? "bg-gold-100 text-gold-600" : "bg-slate-100 text-slate-400")}>
                  {got ? <BadgeIcon name={b.icon} className="size-8" /> : <Lock className="size-7" />}
                </span>
                <h3 className="mt-3 font-bold text-institutional-900">{b.name}</h3>
                {b.description && <p className="mt-1 text-xs text-slate-500">{b.description}</p>}
                {got ? (
                  <span className="mt-3 rounded-full bg-gold-100 px-3 py-0.5 text-xs font-bold text-gold-700">Obtenu le {formatDate(earnedMap.get(b.id)!)}</span>
                ) : (
                  <span className="mt-3 rounded-full bg-slate-100 px-3 py-0.5 text-xs font-semibold text-slate-400">À débloquer</span>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
