import "server-only";
import { headers } from "next/headers";

const CANONICAL_ORIGIN = "https://governance.eduweb.ci";

/**
 * Origine de l'application pour construire les liens des e-mails.
 * - URL de confiance configurée (APP_URL / NEXT_PUBLIC_APP_URL) si présente ;
 * - sinon, en PRODUCTION on n'utilise JAMAIS l'en-tête Host (injection → lien
 *   empoisonné) : on retombe sur l'origine canonique codée en dur ;
 * - hors production seulement, repli sur l'hôte de la requête (dev/preview).
 */
export async function appOrigin(): Promise<string> {
  const configured = process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL;
  if (configured) return configured.replace(/\/+$/, "");
  if (process.env.NODE_ENV === "production") return CANONICAL_ORIGIN;
  const h = await headers();
  const host = h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  return host ? `${proto}://${host}` : CANONICAL_ORIGIN;
}
