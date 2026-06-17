/**
 * Énumérations métier centralisées.
 *
 * SQLite ne supporte pas les `enum` Prisma : les valeurs sont stockées en
 * `String` et validées / libellées ici. Chaque entrée porte un libellé FR et
 * une « tonalité » visuelle utilisée par les badges (StatusBadge, etc.).
 */

export type Tone =
  | "neutral"
  | "brand"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "gold";

export interface OptionMeta {
  value: string;
  label: string;
  tone: Tone;
  description?: string;
}

function indexBy(options: OptionMeta[]): Record<string, OptionMeta> {
  return Object.fromEntries(options.map((o) => [o.value, o]));
}

// ── Statut d'une activité ───────────────────────────────────────────────────
export const ACTIVITY_STATUS: OptionMeta[] = [
  { value: "DRAFT", label: "Brouillon", tone: "neutral" },
  { value: "SUBMITTED", label: "Soumis", tone: "info" },
  { value: "IN_REVIEW", label: "En examen", tone: "warning" },
  { value: "VALIDATED", label: "Validé", tone: "success" },
  { value: "REJECTED", label: "Rejeté", tone: "danger" },
  { value: "TO_CORRECT", label: "À corriger", tone: "warning" },
  { value: "CONSOLIDATED", label: "Consolidé", tone: "brand" },
  { value: "ARCHIVED", label: "Archivé", tone: "neutral" },
];
export const ACTIVITY_STATUS_MAP = indexBy(ACTIVITY_STATUS);

// ── Statut d'un texte réglementaire EduLex ──────────────────────────────────
export const LEGAL_STATUS: OptionMeta[] = [
  { value: "IN_FORCE", label: "En vigueur", tone: "success" },
  { value: "ABROGATED", label: "Abrogé", tone: "danger" },
  { value: "MODIFIED", label: "Modifié", tone: "warning" },
  { value: "REFERENCE", label: "Document de référence", tone: "info" },
  { value: "REPLACED", label: "Remplacé", tone: "warning" },
  { value: "SUSPENDED", label: "Suspendu", tone: "danger" },
  { value: "PENDING", label: "En attente de validation", tone: "info" },
  { value: "TO_VERIFY", label: "À vérifier", tone: "warning" },
  { value: "ARCHIVED", label: "Archivé", tone: "neutral" },
  { value: "DRAFT", label: "Brouillon", tone: "neutral" },
  { value: "IMPORTED_UNVERIFIED", label: "Importé non vérifié", tone: "warning" },
];
export const LEGAL_STATUS_MAP = indexBy(LEGAL_STATUS);

// ── Niveau de vérification (V0 → V4) ────────────────────────────────────────
export const VERIFICATION_LEVEL: OptionMeta[] = [
  { value: "V0", label: "V0 · Non vérifié", tone: "neutral", description: "Entrée importée ou indexée, non encore vérifiée." },
  { value: "V1", label: "V1 · Vérif. documentaire", tone: "info", description: "Vérification documentaire minimale." },
  { value: "V2", label: "V2 · Service technique", tone: "info", description: "Vérification par le service technique." },
  { value: "V3", label: "V3 · Validation juridique", tone: "brand", description: "Validation juridique ou institutionnelle." },
  { value: "V4", label: "V4 · Certifié", tone: "gold", description: "Texte officiellement certifié dans la base." },
];
export const VERIFICATION_LEVEL_MAP = indexBy(VERIFICATION_LEVEL);

// ── Type de texte ───────────────────────────────────────────────────────────
export const LEGAL_TYPE: OptionMeta[] = [
  { value: "CONST", label: "Constitution", tone: "brand" },
  { value: "LOI", label: "Loi", tone: "info" },
  { value: "ORD", label: "Ordonnance", tone: "info" },
  { value: "DEC", label: "Décret", tone: "info" },
  { value: "ARR", label: "Arrêté", tone: "neutral" },
  { value: "CIRC", label: "Circulaire", tone: "neutral" },
  { value: "REC", label: "Recommandation", tone: "neutral" },
  // Normes internationales (EduLex Global)
  { value: "CONV", label: "Convention internationale", tone: "brand" },
  { value: "TRAITE", label: "Traité", tone: "brand" },
  { value: "DECL", label: "Déclaration", tone: "info" },
  { value: "PACTE", label: "Pacte international", tone: "info" },
  { value: "PROTO", label: "Protocole", tone: "info" },
  { value: "REGL", label: "Règlement", tone: "info" },
  { value: "STATUTS", label: "Statuts", tone: "neutral" },
  { value: "CODE", label: "Code", tone: "brand" },
];
export const LEGAL_TYPE_MAP = indexBy(LEGAL_TYPE);

// ── Niveau de confidentialité ───────────────────────────────────────────────
export const CONFIDENTIALITY: OptionMeta[] = [
  { value: "PUBLIC", label: "Public", tone: "success" },
  { value: "RESTRICTED", label: "Restreint", tone: "warning" },
  { value: "CONFIDENTIAL", label: "Confidentiel", tone: "danger" },
];
export const CONFIDENTIALITY_MAP = indexBy(CONFIDENTIALITY);

// ── Statut d'une question Academy ───────────────────────────────────────────
export const QUESTION_STATUS: OptionMeta[] = [
  { value: "DRAFT", label: "Brouillon", tone: "neutral" },
  { value: "PUBLISHED", label: "Publiée", tone: "success" },
  { value: "SUSPENDED", label: "Suspendue", tone: "danger" },
];
export const QUESTION_STATUS_MAP = indexBy(QUESTION_STATUS);

// ── Niveaux de compétence Academy ───────────────────────────────────────────
export const ACADEMY_LEVELS = [
  { level: 1, name: "Découverte", objective: "Identifier les notions de base." },
  { level: 2, name: "Compréhension", objective: "Comprendre le sens général." },
  { level: 3, name: "Application", objective: "Appliquer un texte à une situation." },
  { level: 4, name: "Maîtrise", objective: "Analyser liens et implications." },
  { level: 5, name: "Expert / Référent", objective: "Conseiller, contrôler ou former." },
] as const;

// ── Types de champs de formulaire ───────────────────────────────────────────
export const FIELD_TYPES: { value: string; label: string; hasOptions?: boolean }[] = [
  { value: "TEXT", label: "Texte court" },
  { value: "TEXTAREA", label: "Texte long" },
  { value: "DATE", label: "Date" },
  { value: "NUMBER", label: "Nombre" },
  { value: "SELECT", label: "Liste déroulante", hasOptions: true },
  { value: "RADIO", label: "Boutons radio", hasOptions: true },
  { value: "CHECKBOX", label: "Cases à cocher", hasOptions: true },
  { value: "FILE", label: "Fichier joint" },
  { value: "IMAGE", label: "Image" },
  { value: "TABLE", label: "Tableau répétable" },
  { value: "CALCULATED", label: "Champ calculé" },
  { value: "EDULEX_LINK", label: "Lien vers un texte EduLex" },
];
export const FIELD_TYPE_MAP = Object.fromEntries(FIELD_TYPES.map((f) => [f.value, f]));

// ── Statut d'un formulaire ──────────────────────────────────────────────────
export const FORM_STATUS: OptionMeta[] = [
  { value: "DRAFT", label: "Brouillon", tone: "neutral" },
  { value: "PUBLISHED", label: "Publié", tone: "success" },
  { value: "ARCHIVED", label: "Archivé", tone: "warning" },
];
export const FORM_STATUS_MAP = indexBy(FORM_STATUS);

// ── Périodicité d'un rapport ────────────────────────────────────────────────
export const REPORT_PERIODS: { value: string; label: string }[] = [
  { value: "WEEKLY", label: "Hebdomadaire" },
  { value: "MONTHLY", label: "Mensuel" },
  { value: "QUARTERLY", label: "Trimestriel" },
  { value: "SEMESTRIAL", label: "Semestriel" },
  { value: "ANNUAL", label: "Annuel" },
  { value: "CUSTOM", label: "Personnalisé" },
];
export const REPORT_PERIOD_MAP = Object.fromEntries(REPORT_PERIODS.map((p) => [p.value, p]));

// ── Statut d'un rapport ─────────────────────────────────────────────────────
export const REPORT_STATUS: OptionMeta[] = [
  { value: "DRAFT", label: "Brouillon", tone: "neutral" },
  { value: "GENERATED", label: "Généré", tone: "success" },
  { value: "ARCHIVED", label: "Archivé", tone: "warning" },
];
export const REPORT_STATUS_MAP = indexBy(REPORT_STATUS);

// ── Motifs d'autorisation d'absence ─────────────────────────────────────────
export const ABSENCE_MOTIFS: OptionMeta[] = [
  { value: "PERSONAL", label: "Affaires personnelles", tone: "info", description: "Demande de permission pour affaires personnelles." },
  { value: "STATUTORY", label: "Congé réglementaire", tone: "brand", description: "Congé annuel réglementaire." },
  { value: "TRAINING", label: "Formation", tone: "gold", description: "Absence pour formation." },
  { value: "FORCE_MAJEURE", label: "Force majeure institutionnelle", tone: "warning", description: "Travaux de réhabilitation, fermeture institutionnelle, etc." },
];
export const ABSENCE_MOTIF_MAP = indexBy(ABSENCE_MOTIFS);

// ── Types de structures ─────────────────────────────────────────────────────
export const STRUCTURE_TYPES: { value: string; label: string }[] = [
  { value: "DIRECTION", label: "Direction" },
  { value: "SOUS_DIRECTION", label: "Sous-direction" },
  { value: "SERVICE", label: "Service" },
  { value: "ANTENNE", label: "Antenne" },
  { value: "REGION", label: "Direction régionale" },
  { value: "COORDINATION", label: "Coordination" },
  { value: "EQUIPE", label: "Équipe" },
];
export const STRUCTURE_TYPE_MAP = Object.fromEntries(STRUCTURE_TYPES.map((s) => [s.value, s]));

// ── Types d'organisations ───────────────────────────────────────────────────
export const ORGANIZATION_TYPES: { value: string; label: string }[] = [
  { value: "MINISTRY", label: "Ministère" },
  { value: "INSTITUTION", label: "Institution" },
  { value: "NETWORK", label: "Réseau" },
  { value: "ASSOCIATION", label: "Association" },
  { value: "COMPANY", label: "Entreprise / Société" },
];

// ── Rôles système ───────────────────────────────────────────────────────────
export interface RoleSeed {
  key: string;
  name: string;
  scope: "GOVERNANCE" | "EDULEX" | "ACADEMY" | "SYSTEM";
}

export const SYSTEM_ROLES: RoleSeed[] = [
  // Gouvernance
  { key: "super_admin", name: "Super Administrateur EduWeb", scope: "SYSTEM" },
  { key: "institution_admin", name: "Administrateur institutionnel", scope: "GOVERNANCE" },
  { key: "national_manager", name: "Responsable national / central", scope: "GOVERNANCE" },
  { key: "regional_manager", name: "Responsable régional / intermédiaire", scope: "GOVERNANCE" },
  { key: "local_manager", name: "Responsable local / chef de service", scope: "GOVERNANCE" },
  { key: "director_general", name: "Directeur Général", scope: "GOVERNANCE" },
  { key: "director", name: "Directeur", scope: "GOVERNANCE" },
  { key: "deputy_director", name: "Sous-Directeur", scope: "GOVERNANCE" },
  { key: "agent", name: "Agent / contributeur", scope: "GOVERNANCE" },
  { key: "auditor", name: "Contrôleur / auditeur", scope: "GOVERNANCE" },
  { key: "reader", name: "Lecteur simple", scope: "GOVERNANCE" },
  // EduLex
  { key: "edulex_super_admin", name: "Super Administrateur EduLex", scope: "EDULEX" },
  { key: "edulex_country_admin", name: "Administrateur pays", scope: "EDULEX" },
  { key: "edulex_ministry_admin", name: "Administrateur ministériel", scope: "EDULEX" },
  { key: "edulex_depositor", name: "Service technique déposant", scope: "EDULEX" },
  { key: "edulex_doc_validator", name: "Validateur documentaire", scope: "EDULEX" },
  { key: "edulex_legal_validator", name: "Validateur juridique", scope: "EDULEX" },
  // Academy
  { key: "academy_editor", name: "Éditeur EduLex Academy", scope: "ACADEMY" },
  { key: "academy_learner", name: "Citoyen apprenant", scope: "ACADEMY" },
  { key: "public_authorized", name: "Public autorisé", scope: "ACADEMY" },
];

// ── Permissions (RBAC fin) ──────────────────────────────────────────────────
export const PERMISSION_ACTIONS = [
  "create", "read", "update", "delete", "validate",
  "publish", "archive", "export", "import", "manage",
] as const;

export const PERMISSION_MODULES = [
  "organization", "user", "form", "activity", "validation",
  "report", "edulex", "academy", "admin",
] as const;

/** Résout libellé + tonalité pour une valeur de statut, avec repli sûr. */
export function metaOf(
  map: Record<string, OptionMeta>,
  value: string | null | undefined
): OptionMeta {
  if (value && map[value]) return map[value];
  return { value: value ?? "—", label: value ?? "—", tone: "neutral" };
}
