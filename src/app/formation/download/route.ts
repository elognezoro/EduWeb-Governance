import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { buildFormationDocx } from "@/lib/formation-docx";

export const dynamic = "force-dynamic";

/** Génère et renvoie le support de formation au format Word (.docx), à jour, éditable. */
export async function GET() {
  const user = await getCurrentUser();
  if (!user) return new NextResponse("Authentification requise.", { status: 401 });

  const buf = await buildFormationDocx();
  return new NextResponse(new Uint8Array(buf), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": 'attachment; filename="EduWeb-Governance-Support-de-formation.docx"',
      "Cache-Control": "no-store",
    },
  });
}
