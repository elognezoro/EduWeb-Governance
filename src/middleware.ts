import { NextResponse, type NextRequest } from "next/server";

const COOKIE_NAME = process.env.SESSION_COOKIE_NAME || "eduweb_session";

/**
 * Garde-fou léger (edge) : redirige vers /login si aucun cookie de session.
 * La validité réelle de la session est revérifiée côté serveur dans le layout
 * de l'espace connecté (accès base de données).
 */
export function middleware(req: NextRequest) {
  const hasSession = Boolean(req.cookies.get(COOKIE_NAME)?.value);
  if (!hasSession) {
    const url = new URL("/login", req.url);
    url.searchParams.set("from", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/organization/:path*",
    "/users/:path*",
    "/forms/:path*",
    "/activities/:path*",
    "/validation/:path*",
    "/reports/:path*",
    "/edulex/:path*",
    "/academy/:path*",
    "/notifications/:path*",
    "/archives/:path*",
    "/admin/:path*",
    "/account/:path*",
  ],
};
