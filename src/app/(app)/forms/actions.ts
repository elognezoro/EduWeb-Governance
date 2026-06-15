"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, hasPermission } from "@/lib/auth";
import { writeAudit } from "@/lib/audit";

export type ActionResult = { ok: true; id?: string } | { ok: false; error: string };

async function guard() {
  const user = await getCurrentUser();
  if (!user) return { user: null, error: "Non authentifié." as const };
  if (!hasPermission(user, "form:manage")) return { user, error: "Permission requise (form:manage)." as const };
  return { user, error: null };
}

// ── Création ──────────────────────────────────────────────────────────────────
const createSchema = z.object({
  title: z.string().trim().min(2, "Titre requis (2 caractères min.)."),
  description: z.string().trim().optional(),
});

export async function createForm(input: z.infer<typeof createSchema>): Promise<ActionResult> {
  const g = await guard();
  if (g.error) return { ok: false, error: g.error };
  const parsed = createSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };

  const form = await prisma.activityForm.create({
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
      status: "DRAFT",
      createdById: g.user!.id,
      organizationId: g.user!.organizationId ?? undefined,
    },
  });
  await writeAudit({ userId: g.user!.id, action: "create", module: "form", entityType: "ActivityForm", entityId: form.id });
  revalidatePath("/forms");
  redirect(`/forms/${form.id}`);
}

// ── Enregistrement complet (métadonnées + champs) ──────────────────────────────
const fieldSchema = z.object({
  label: z.string().trim().min(1, "Libellé de champ requis."),
  fieldKey: z.string().trim().min(1),
  type: z.string().min(1),
  required: z.boolean(),
  order: z.number().int(),
  options: z.array(z.string()).optional(),
});

const saveSchema = z.object({
  title: z.string().trim().min(2, "Titre requis."),
  description: z.string().trim().optional(),
  fields: z.array(fieldSchema),
});
export type FormSaveInput = z.infer<typeof saveSchema>;

export async function saveForm(id: string, input: FormSaveInput): Promise<ActionResult> {
  const g = await guard();
  if (g.error) return { ok: false, error: g.error };
  const parsed = saveSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
  const d = parsed.data;

  const form = await prisma.activityForm.findUnique({ where: { id } });
  if (!form || form.deletedAt) return { ok: false, error: "Formulaire introuvable." };

  await prisma.$transaction([
    prisma.activityFormField.deleteMany({ where: { formId: id } }),
    prisma.activityForm.update({
      where: { id },
      data: {
        title: d.title,
        description: d.description,
        fields: {
          create: d.fields.map((f, i) => ({
            label: f.label,
            fieldKey: f.fieldKey,
            type: f.type,
            required: f.required,
            order: i,
            config: f.options && f.options.length ? JSON.stringify({ options: f.options }) : null,
          })),
        },
      },
    }),
  ]);

  await writeAudit({ userId: g.user!.id, action: "update", module: "form", entityType: "ActivityForm", entityId: id });
  revalidatePath(`/forms/${id}`);
  revalidatePath("/forms");
  return { ok: true, id };
}

// ── Cycle de vie ──────────────────────────────────────────────────────────────
export async function publishForm(id: string): Promise<ActionResult> {
  const g = await guard();
  if (g.error) return { ok: false, error: g.error };
  const form = await prisma.activityForm.findUnique({ where: { id }, include: { _count: { select: { fields: true } } } });
  if (!form) return { ok: false, error: "Formulaire introuvable." };
  if (form._count.fields === 0) return { ok: false, error: "Ajoutez au moins un champ avant de publier." };

  await prisma.activityForm.update({ where: { id }, data: { status: "PUBLISHED", version: { increment: 1 } } });
  await writeAudit({ userId: g.user!.id, action: "publish", module: "form", entityType: "ActivityForm", entityId: id });
  revalidatePath(`/forms/${id}`);
  revalidatePath("/forms");
  return { ok: true };
}

export async function setFormStatus(id: string, status: "DRAFT" | "ARCHIVED"): Promise<ActionResult> {
  const g = await guard();
  if (g.error) return { ok: false, error: g.error };
  await prisma.activityForm.update({ where: { id }, data: { status } });
  await writeAudit({ userId: g.user!.id, action: status === "ARCHIVED" ? "archive" : "update", module: "form", entityType: "ActivityForm", entityId: id });
  revalidatePath(`/forms/${id}`);
  revalidatePath("/forms");
  return { ok: true };
}

export async function deleteForm(id: string): Promise<ActionResult> {
  const g = await guard();
  if (g.error) return { ok: false, error: g.error };
  await prisma.activityForm.update({ where: { id }, data: { deletedAt: new Date() } });
  await writeAudit({ userId: g.user!.id, action: "delete", module: "form", entityType: "ActivityForm", entityId: id });
  revalidatePath("/forms");
  redirect("/forms");
}
