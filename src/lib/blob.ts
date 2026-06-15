import "server-only";
import { put } from "@vercel/blob";

/** Taille maximale acceptée (limite des fonctions serverless Vercel ≈ 4,5 Mo). */
export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024; // 4 Mo

export interface StoredFile {
  url: string;
  filename: string;
  mimeType: string;
  size: number;
}

/**
 * Téléverse un fichier vers Vercel Blob (stockage public) et renvoie son URL.
 * Utilise `BLOB_READ_WRITE_TOKEN` (fourni par Vercel / .env local).
 */
export async function uploadToBlob(file: File, prefix: string): Promise<StoredFile> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("Stockage non configuré (BLOB_READ_WRITE_TOKEN manquant).");
  }
  const safeName = (file.name || "fichier").replace(/[^a-zA-Z0-9._-]+/g, "_").slice(-80);
  const blob = await put(`${prefix}/${safeName}`, file, { access: "public", addRandomSuffix: true });
  return {
    url: blob.url,
    filename: file.name || safeName,
    mimeType: file.type || "application/octet-stream",
    size: file.size,
  };
}

/** Valide un fichier reçu (présence + taille). */
export function validateUpload(file: unknown): { ok: true; file: File } | { ok: false; error: string } {
  if (!(file instanceof File) || file.size === 0) return { ok: false, error: "Aucun fichier reçu." };
  if (file.size > MAX_UPLOAD_BYTES) return { ok: false, error: "Fichier trop volumineux (max 4 Mo)." };
  return { ok: true, file };
}
