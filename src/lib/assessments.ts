import "server-only";
import { prisma } from "./prisma";
import { generateForCountry, type BuildResult } from "./assessments-core";

export { VALIDATED_LEVELS, ELIGIBLE_STATUSES, ELIGIBLE_TEXT_FILTER } from "./assessments-core";
export type { BuildResult };

/** Génère (ou complète) les évaluations 5 niveaux d'un pays. Idempotent. */
export function buildAssessmentsForCountry(countryId: string): Promise<BuildResult> {
  return generateForCountry(prisma, countryId);
}

/** Auto-génération idempotente, silencieuse (n'interrompt jamais le rendu). */
export async function ensureAssessmentsForCountry(countryId: string): Promise<void> {
  try {
    await generateForCountry(prisma, countryId);
  } catch {
    /* best-effort */
  }
}
