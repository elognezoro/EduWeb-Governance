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
  if (!hasPermission(user, "edulex:create") && !hasPermission(user, "edulex:update") && !hasPermission(user, "edulex:manage"))
    return NextResponse.json({ error: "Permission requise (edulex:update)." }, { status: 403 });

  const text = await prisma.legalText.findUnique({ where: { id }, select: { id: true, deletedAt: true } });
  if (!text || text.deletedAt) return NextResponse.json({ error: "Texte introuvable." }, { status: 404 });

  const form = await req.formData();
  const v = validateUpload(form.get("file"));
  if (!v.ok) return NextResponse.json({ error: v.error }, { status: 400 });

  try {
    const stored = await uploadToBlob(v.file, `edulex/${id}`);
    await prisma.fileAsset.create({
      data: {
        filename: stored.filename,
        mimeType: stored.mimeType,
        size: stored.size,
        url: stored.url,
        uploadedById: user.id,
        legalAttachments: { create: { legalTextId: id, isOfficial: true } },
      },
    });
    await writeAudit({ userId: user.id, action: "upload", module: "edulex", entityType: "LegalText", entityId: id, metadata: { kind: "source", filename: stored.filename } });
    revalidatePath(`/edulex/texts/${id}`);
    return NextResponse.json({ ok: true, url: stored.url });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
