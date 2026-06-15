import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Globe2 } from "lucide-react";
import { requireUser, hasPermission } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flag } from "@/components/ui/flag";
import { CountryAdd } from "@/components/edulex/reference-forms";

export const metadata: Metadata = { title: "Pays & juridictions" };

export default async function CountriesPage() {
  const user = await requireUser();
  const canManage = hasPermission(user, "edulex:manage");

  const countries = await prisma.country.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { legalTexts: true, ministries: true } } },
  });

  return (
    <div className="space-y-6">
      <Link href="/edulex" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-brand-700"><ArrowLeft className="size-4" /> Retour à EduLex</Link>
      <PageHeader title="Pays & juridictions" description="Le filtre pays est au cœur d'EduLex international." icon={Globe2} />

      {canManage && (
        <Card><CardHeader><CardTitle>Ajouter un pays</CardTitle></CardHeader><CardContent><CountryAdd /></CardContent></Card>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {countries.map((c) => (
          <div key={c.id} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-card p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <Flag code={c.code} className="w-9 rounded-md" />
              <div>
                <p className="font-semibold text-ink">{c.name}</p>
                <p className="text-xs text-slate-400">{c.namespace ?? c.code} · {c._count.legalTexts} texte(s)</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <Badge tone="neutral">{c.code}</Badge>
              {!c.isActive && <span className="text-[11px] text-slate-400">inactif</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
