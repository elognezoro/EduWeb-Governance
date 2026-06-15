/**
 * Codification internationale EduLex.
 * Format : COUNTRY-JUR-SECTOR-TYPE-YEAR-NUM-VERSION
 * Ex. CI-MENA-EDU-DEC-2026-004-V1
 */

function abbr(s: string | null | undefined, fallback: string): string {
  if (!s) return fallback;
  return s
    .toUpperCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 6) || fallback;
}

export interface CodeParts {
  country: string;
  jur: string;
  sector: string;
  type: string;
  year: number;
  num: number;
  version: number;
}

export function formatLegalCode(p: CodeParts): string {
  const num = String(p.num).padStart(3, "0");
  return [
    p.country.toUpperCase(),
    abbr(p.jur, "GEN"),
    abbr(p.sector, "GEN"),
    p.type.toUpperCase(),
    p.year,
    num,
    `V${p.version}`,
  ].join("-");
}

export function buildCodeParts(input: {
  countryCode: string;
  ministryCode?: string | null;
  jurisdictionCode?: string | null;
  sectorCode?: string | null;
  type: string;
  year: number;
  num: number;
  version?: number;
}): CodeParts {
  return {
    country: input.countryCode,
    jur: input.ministryCode || input.jurisdictionCode || "GEN",
    sector: input.sectorCode || "GEN",
    type: input.type,
    year: input.year,
    num: input.num,
    version: input.version ?? 1,
  };
}
