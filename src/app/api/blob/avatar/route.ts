import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { uploadToBlob, validateUpload } from "@/lib/blob";
import { writeAudit } from "@/lib/audit";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non authentifié." }, { status: 401 });

  const form = await req.formData();
  const v = validateUpload(form.get("file"));
  if (!v.ok) return NextResponse.json({ error: v.error }, { status: 400 });

  try {
    const stored = await uploadToBlob(v.file, `avatars/${user.id}`);
    await prisma.user.update({ where: { id: user.id }, data: { avatarUrl: stored.url } });
    await writeAudit({ userId: user.id, action: "upload", module: "user", entityType: "User", entityId: user.id, metadata: { kind: "avatar" } });
    revalidatePath("/account");
    return NextResponse.json({ ok: true, url: stored.url });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
