import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, hasPermission } from "@/lib/auth";
import { uploadToBlob, validateUpload } from "@/lib/blob";
import { writeAudit } from "@/lib/audit";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  if (!hasPermission(user, "organization:manage")) return NextResponse.json({ error: "Permission requise (organization:manage)." }, { status: 403 });

  const form = await req.formData();
  const orgId = String(form.get("orgId") ?? "");
  if (!orgId) return NextResponse.json({ error: "Organisation manquante." }, { status: 400 });
  const v = validateUpload(form.get("file"));
  if (!v.ok) return NextResponse.json({ error: v.error }, { status: 400 });

  const org = await prisma.organization.findUnique({ where: { id: orgId }, select: { id: true } });
  if (!org) return NextResponse.json({ error: "Organisation introuvable." }, { status: 404 });

  try {
    const stored = await uploadToBlob(v.file, `logos/${orgId}`);
    await prisma.organization.update({ where: { id: orgId }, data: { logoUrl: stored.url } });
    await writeAudit({ userId: user.id, action: "upload", module: "organization", entityType: "Organization", entityId: orgId, metadata: { kind: "logo" } });
    revalidatePath("/organization");
    return NextResponse.json({ ok: true, url: stored.url });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
