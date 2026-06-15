import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, Pencil } from "lucide-react";
import { requireUser, hasPermission } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { ActivityForm } from "@/components/activities/activity-form";

export const metadata: Metadata = { title: "Modifier l'activité" };

function getDescription(data: string | null): string {
  if (!data) return "";
  try {
    const p = JSON.parse(data);
    return typeof p?.description === "string" ? p.description : "";
  } catch {
    return "";
  }
}

const isoDay = (d: Date | null) => (d ? d.toISOString().slice(0, 10) : "");

export default async function EditActivityPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await params;

  const activity = await prisma.activity.findUnique({
    where: { id },
    include: { legalTexts: { select: { id: true } } },
  });
  if (!activity || activity.deletedAt) notFound();

  const isAuthor = activity.authorId === user.id;
  if (!isAuthor && !hasPermission(user, "activity:update")) redirect(`/activities/${id}`);
  if (!["DRAFT", "TO_CORRECT", "REJECTED"].includes(activity.status)) redirect(`/activities/${id}`);

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
      <Link href={`/activities/${id}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-brand-700">
        <ArrowLeft className="size-4" /> Retour à l'activité
      </Link>
      <PageHeader title="Modifier l'activité" description="Mettez à jour les informations puis enregistrez." icon={Pencil} />
      <Card>
        <CardContent className="p-6">
          <ActivityForm
            structures={structures}
            texts={texts}
            initial={{
              id: activity.id,
              title: activity.title,
              description: getDescription(activity.data),
              structureId: activity.structureId,
              periodStart: isoDay(activity.periodStart),
              periodEnd: isoDay(activity.periodEnd),
              legalTextIds: activity.legalTexts.map((t) => t.id),
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
