"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, hasPermission } from "@/lib/auth";
import { writeAudit } from "@/lib/audit";
import { ACTIVITY_STATUS_MAP, metaOf } from "@/lib/enums";

export type ActionResult = { ok: true; id?: string } | { ok: false; error: string };

const schema = z.object({
  title: z.string().trim().min(3, "Titre requis (3 caractères min.)."),
  period: z.string().min(1),
  countryId: z.string().optional(),
  organizationId: z.string().optional(),
  structureId: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
});
export type ReportInput = z.infer<typeof schema>;

const clean = (v?: string) => (v && v.length > 0 ? v : undefined);
function toDate(v?: string) {
  if (!v) return undefined;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

export async function generateReport(input: ReportInput): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Non authentifié." };
  if (!hasPermission(user, "report:create") && !hasPermission(user, "report:manage"))
    return { ok: false, error: "Permission requise (report:create)." };

  const parsed = schema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
  const d = parsed.data;

  const countryId = clean(d.countryId);
  const organizationId = clean(d.organizationId);
  const structureId = clean(d.structureId);
  const from = toDate(d.from);
  const to = toDate(d.to);

  const where = {
    deletedAt: null,
    status: { in: ["VALIDATED", "CONSOLIDATED"] },
    ...(countryId ? { countryId } : {}),
    ...(organizationId ? { organizationId } : {}),
    ...(structureId ? { structureId } : {}),
    ...(from || to ? { createdAt: { ...(from ? { gte: from } : {}), ...(to ? { lte: to } : {}) } } : {}),
  };

  const activities = await prisma.activity.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { author: true, structure: true, legalTexts: { select: { code: true, title: true } } },
  });

  // Indicateurs
  const byStatus: Record<string, number> = {};
  const legalRefs = new Map<string, { code: string; title: string }>();
  for (const a of activities) {
    const label = metaOf(ACTIVITY_STATUS_MAP, a.status).label;
    byStatus[label] = (byStatus[label] ?? 0) + 1;
    for (const t of a.legalTexts) legalRefs.set(t.code, t);
  }

  const [country, organization, structure] = await Promise.all([
    countryId ? prisma.country.findUnique({ where: { id: countryId } }) : null,
    organizationId ? prisma.organization.findUnique({ where: { id: organizationId } }) : null,
    structureId ? prisma.structure.findUnique({ where: { id: structureId } }) : null,
  ]);

  const content = {
    generatedAt: new Date().toISOString(),
    period: d.period,
    from: from?.toISOString() ?? null,
    to: to?.toISOString() ?? null,
    scope: {
      country: country ? country.name : "Tous les pays",
      organization: organization?.name ?? "Toutes les organisations",
      structure: structure?.name ?? "Toutes les structures",
    },
    indicators: { total: activities.length, byStatus },
    activities: activities.map((a) => ({
      title: a.title,
      status: metaOf(ACTIVITY_STATUS_MAP, a.status).label,
      author: `${a.author.firstName} ${a.author.lastName}`,
      structure: a.structure?.name ?? "—",
      date: a.createdAt.toISOString(),
    })),
    legalRefs: [...legalRefs.values()],
  };

  const report = await prisma.report.create({
    data: {
      title: d.title,
      period: d.period,
      status: "GENERATED",
      content: JSON.stringify(content),
      countryId,
      organizationId,
      structureId,
      generatedById: user.id,
    },
  });

  await writeAudit({ userId: user.id, action: "generate", module: "report", entityType: "Report", entityId: report.id });
  revalidatePath("/reports");
  redirect(`/reports/${report.id}`);
}

export async function deleteReport(id: string): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Non authentifié." };
  if (!hasPermission(user, "report:manage") && !hasPermission(user, "report:create"))
    return { ok: false, error: "Permission requise." };

  await prisma.report.delete({ where: { id } });
  await writeAudit({ userId: user.id, action: "delete", module: "report", entityType: "Report", entityId: id });
  revalidatePath("/reports");
  redirect("/reports");
}
