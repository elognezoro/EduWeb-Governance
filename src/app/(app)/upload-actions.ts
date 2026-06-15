"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, hasPermission } from "@/lib/auth";
import { writeAudit } from "@/lib/audit";

export type FinalizeResult = { ok: true; url: string } | { ok: false; error: string };

export interface FinalizeInput {
  purpose: "avatar" | "logo" | "edulex" | "activity";
  entityId: string;
  url: string;
  filename: string;
  size: number;
  contentType?: string;
}

/** Enregistre en base un fichier déjà téléversé sur Vercel Blob (upload direct client). */
export async function finalizeUpload(input: FinalizeInput): Promise<FinalizeResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Non authentifié." };

  // L'URL doit provenir du stockage Blob (anti-injection d'URL arbitraire).
  if (!/^https:\/\/[a-z0-9.-]+\.blob\.vercel-storage\.com\//i.test(input.url)) {
    return { ok: false, error: "URL de fichier invalide." };
  }
  const mimeType = input.contentType || "application/octet-stream";
  const filename = (input.filename || "fichier").slice(0, 200);
  const size = Number.isFinite(input.size) ? Math.max(0, Math.floor(input.size)) : 0;

  switch (input.purpose) {
    case "avatar": {
      await prisma.user.update({ where: { id: user.id }, data: { avatarUrl: input.url } });
      await writeAudit({ userId: user.id, action: "upload", module: "user", entityType: "User", entityId: user.id, metadata: { kind: "avatar" } });
      revalidatePath("/account");
      return { ok: true, url: input.url };
    }
    case "logo": {
      if (!hasPermission(user, "organization:manage")) return { ok: false, error: "Permission requise (organization:manage)." };
      const org = await prisma.organization.findUnique({ where: { id: input.entityId }, select: { id: true } });
      if (!org) return { ok: false, error: "Organisation introuvable." };
      await prisma.organization.update({ where: { id: org.id }, data: { logoUrl: input.url } });
      await writeAudit({ userId: user.id, action: "upload", module: "organization", entityType: "Organization", entityId: org.id, metadata: { kind: "logo" } });
      revalidatePath("/organization");
      return { ok: true, url: input.url };
    }
    case "edulex": {
      if (!hasPermission(user, "edulex:update") && !hasPermission(user, "edulex:create") && !hasPermission(user, "edulex:manage"))
        return { ok: false, error: "Permission requise (edulex:update)." };
      const text = await prisma.legalText.findUnique({ where: { id: input.entityId }, select: { id: true, deletedAt: true } });
      if (!text || text.deletedAt) return { ok: false, error: "Texte introuvable." };
      await prisma.fileAsset.create({
        data: { filename, mimeType, size, url: input.url, uploadedById: user.id, legalAttachments: { create: { legalTextId: text.id, isOfficial: true } } },
      });
      await writeAudit({ userId: user.id, action: "upload", module: "edulex", entityType: "LegalText", entityId: text.id, metadata: { kind: "source", filename } });
      revalidatePath(`/edulex/texts/${text.id}`);
      return { ok: true, url: input.url };
    }
    case "activity": {
      const activity = await prisma.activity.findUnique({ where: { id: input.entityId }, select: { id: true, authorId: true, deletedAt: true } });
      if (!activity || activity.deletedAt) return { ok: false, error: "Activité introuvable." };
      if (activity.authorId !== user.id && !hasPermission(user, "activity:update") && !hasPermission(user, "activity:validate"))
        return { ok: false, error: "Vous n'êtes pas autorisé à joindre un document." };
      await prisma.fileAsset.create({
        data: { filename, mimeType, size, url: input.url, uploadedById: user.id, activityAttachments: { create: { activityId: activity.id } } },
      });
      await writeAudit({ userId: user.id, action: "upload", module: "activity", entityType: "Activity", entityId: activity.id, metadata: { kind: "attachment", filename } });
      revalidatePath(`/activities/${activity.id}`);
      return { ok: true, url: input.url };
    }
    default:
      return { ok: false, error: "Type de téléversement inconnu." };
  }
}
