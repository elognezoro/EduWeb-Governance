import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import type { ScoreReport } from "@/lib/score";

export interface AdviceResult {
  ok: boolean;
  tips: string[];
  /** "missing_key" | "empty" | "api" — pour message UI. */
  error?: string;
}

const MODEL = "claude-opus-4-8";

/** L'application est-elle configurée pour les conseils IA ? (clé présente côté serveur) */
export function adviceConfigured(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

const WEAK_LABEL: Record<string, string> = {
  rdv: "les rendez-vous (assiduité / présence)",
  activites: "les activités (validation / aboutissement)",
};

/**
 * Génère 2 à 3 conseils concrets, ciblés sur le secteur le plus faible.
 * Nécessite ANTHROPIC_API_KEY côté serveur ; renvoie un échec propre si absente.
 */
export async function generateAdvice(report: ScoreReport, profileLabel: string): Promise<AdviceResult> {
  if (!adviceConfigured()) return { ok: false, tips: [], error: "missing_key" };

  const client = new Anthropic();
  const weak = report.weakest ? WEAK_LABEL[report.weakest] : "l'organisation générale";

  const data = {
    profil: profileLabel,
    scoreActuel: report.current,
    evolutionVsSemainePrecedente: report.trend,
    secteurLePlusFaible: report.weakest,
    semaineCourante: {
      rendezVous: report.breakdown.rdv,
      activites: report.breakdown.activites,
    },
    historiqueScores: report.weeks.map((w) => w.score),
  };

  const system = `Tu es un coach de productivité bienveillant, concret et concis pour l'application EduWeb Governance.
À partir des données de productivité d'un utilisateur (profil : ${profileLabel}), tu génères 2 à 3 conseils en français.
Règles :
- Chaque conseil tient en une phrase, à l'impératif, directement applicable dès cette semaine.
- Cible en priorité le secteur le plus faible.
- Sois concret et spécifique : pas de généralités, pas de remplissage, pas d'emoji.
- Tutoie l'utilisateur et garde un ton encourageant.`;

  try {
    const res = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system,
      output_config: {
        effort: "low",
        format: {
          type: "json_schema",
          schema: {
            type: "object",
            properties: {
              tips: { type: "array", items: { type: "string" } },
            },
            required: ["tips"],
            additionalProperties: false,
          },
        },
      },
      messages: [
        {
          role: "user",
          content: `Voici mes données de productivité (JSON) :\n${JSON.stringify(data)}\n\nLe secteur le plus faible est : ${weak}.\nDonne-moi 2 à 3 conseils ciblés.`,
        },
      ],
    });

    const block = res.content.find((b) => b.type === "text");
    if (!block || block.type !== "text") return { ok: false, tips: [], error: "empty" };

    const parsed = JSON.parse(block.text) as { tips?: unknown };
    const tips = Array.isArray(parsed.tips)
      ? parsed.tips.filter((t): t is string => typeof t === "string" && t.trim().length > 0).slice(0, 3)
      : [];

    if (tips.length === 0) return { ok: false, tips: [], error: "empty" };
    return { ok: true, tips };
  } catch (e) {
    console.error("generateAdvice error", e);
    return { ok: false, tips: [], error: "api" };
  }
}
