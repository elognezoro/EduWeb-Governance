import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ClipboardList } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { ActivityForm } from "@/components/activities/activity-form";

export const metadata: Metadata = { title: "Nouvelle activité" };

export default async function NewActivityPage() {
  const user = await requireUser();

  const [structures, texts] = await Promise.all([
    prisma.structure.findMany({
      where: { deletedAt: null, ...(user.organizationId ? { organizationId: user.organizationId } : {}) },
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
    prisma.legalText.findMany({
      where: { deletedAt: null, ...(user.countryId ? { countryId: user.countryId } : {}) },
      orderBy: { updatedAt: "desc" },
      select: { id: true, code: true, title: true },
      take: 50,
    }),
  ]);

  return (
    <div className="space-y-6">
      <Link href="/activities" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-brand-700">
        <ArrowLeft className="size-4" /> Retour aux activités
      </Link>
      <PageHeader title="Nouvelle activité" description="Renseignez l'activité puis enregistrez-la en brouillon." icon={ClipboardList} />
      <Card>
        <CardContent className="p-6">
          <ActivityForm structures={structures} texts={texts} />
        </CardContent>
      </Card>
    </div>
  );
}
