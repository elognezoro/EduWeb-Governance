import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { getCurrentUser, hasPermission } from "@/lib/auth";

/**
 * Génère un jeton d'upload direct client → Vercel Blob (sans limite de taille).
 * La persistance en base se fait ensuite via l'action serveur `finalizeUpload`.
 */
export async function POST(req: Request): Promise<NextResponse> {
  const body = (await req.json()) as HandleUploadBody;
  try {
    const json = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (_pathname, clientPayload) => {
        const user = await getCurrentUser();
        if (!user) throw new Error("Non authentifié.");
        const purpose = clientPayload ? (JSON.parse(clientPayload).purpose as string) : "";
        const allowed =
          purpose === "avatar" ? true
          : purpose === "activity" ? true
          : purpose === "logo" ? hasPermission(user, "organization:manage")
          : purpose === "edulex" ? (hasPermission(user, "edulex:update") || hasPermission(user, "edulex:create") || hasPermission(user, "edulex:manage"))
          : false;
        if (!allowed) throw new Error("Permission refusée pour ce téléversement.");
        return { addRandomSuffix: true, tokenPayload: clientPayload ?? undefined };
      },
      // Persistance assurée côté client (finalizeUpload) → pas besoin du webhook.
      onUploadCompleted: async () => {},
    });
    return NextResponse.json(json);
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}
