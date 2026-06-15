import "server-only";
import { cookies } from "next/headers";
import { prisma } from "./prisma";

export const COUNTRY_COOKIE = "edulex_country";
export const SUBDIVISION_COOKIE = "edulex_subdivision";
export const ALL_COUNTRIES = "ALL";

/** Tous les pays actifs, triés (déclinaisons EduLex en tête, puis ordre alphabétique). */
export async function getCountries() {
  return prisma.country.findMany({
    where: { isActive: true },
    orderBy: [{ order: "asc" }, { name: "asc" }],
  });
}

/**
 * Code du pays sélectionné dans la barre supérieure (cookie), ou "ALL".
 * Le filtre pays est central pour EduLex (international par conception).
 */
export async function getSelectedCountryCode(): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore.get(COUNTRY_COOKIE)?.value || ALL_COUNTRIES;
}

/** Subdivisions administratives de 1er niveau du pays donné (par code ISO). */
export async function getSubdivisionsForCode(code: string) {
  if (!code || code === ALL_COUNTRIES) return [];
  const country = await prisma.country.findUnique({ where: { code }, select: { id: true } });
  if (!country) return [];
  return prisma.region.findMany({
    where: { countryId: country.id },
    orderBy: { name: "asc" },
    select: { id: true, name: true, code: true },
  });
}

/** Identifiant de la subdivision sélectionnée (cookie), ou "ALL". */
export async function getSelectedSubdivision(): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore.get(SUBDIVISION_COOKIE)?.value || ALL_COUNTRIES;
}
