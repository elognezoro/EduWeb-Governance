import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, hasPermission } from "@/lib/auth";
import { uploadToBlob, validateUpload } from "@/lib/blob";
import { writeAudit } from "@/lib/audit";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non authentifié." }, { status: 401 });

  const activity = await prisma.activity.findUnique({ where: { id }, select: { id: true, authorId: true, deletedAt: true } });
  if (!activity || activity.deletedAt) return NextResponse.json({ error: "Activité introuvable." }, { status: 404 });
  // L'auteur ou un profil habilité peut joindre un document.
  if (activity.authorId !== user.id && !hasPermission(user, "activity:update") && !hasPermission(user, "activity:validate"))
    return NextResponse.json({ error: "Vous n'êtes pas autorisé à joindre un document." }, { status: 403 });

  const form = await req.formData();
  const v = validateUpload(form.get("file"));
  if (!v.ok) return NextResponse.json({ error: v.error }, { status: 400 });

  try {
    const stored = await uploadToBlob(v.file, `activities/${id}`);
    await prisma.fileAsset.create({
      data: {
        filename: stored.filename,
        mimeType: stored.mimeType,
        size: stored.size,
        url: stored.url,
        uploadedById: user.id,
        activityAttachments: { create: { activityId: id } },
      },
    });
    await writeAudit({ userId: user.id, action: "upload", module: "activity", entityType: "Activity", entityId: id, metadata: { kind: "attachment", filename: stored.filename } });
    revalidatePath(`/activities/${id}`);
    return NextResponse.json({ ok: true, url: stored.url });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
