// Guides d'utilisateur par rôle.
// Le contenu (GUIDES) est rédigé puis révisé par un atelier multi-agents, ancré
// sur le code réel de la plateforme. Les métadonnées de rôle (libellé, périmètre)
// proviennent de SYSTEM_ROLES (src/lib/enums.ts) et du seed RBAC.

export type GuideGroup = "Système" | "Gouvernance" | "EduLex" | "Academy";

export interface RoleGuideMeta {
  key: string;
  name: string;
  group: GuideGroup;
}

export interface RoleGuide {
  roleKey: string;
  tagline: string;
  intro: string;
  access: { module: string; what: string }[];
  workflows: { title: string; steps: string[] }[];
  tips: string[];
  limits: string[];
}

/** Ordre et regroupement d'affichage des rôles dans le guide. */
export const ROLE_GUIDE_META: RoleGuideMeta[] = [
  { key: "super_admin", name: "Super Administrateur EduWeb", group: "Système" },
  { key: "institution_admin", name: "Administrateur institutionnel", group: "Gouvernance" },
  { key: "national_manager", name: "Responsable national / central", group: "Gouvernance" },
  { key: "regional_manager", name: "Responsable régional / intermédiaire", group: "Gouvernance" },
  { key: "local_manager", name: "Responsable local / chef de service", group: "Gouvernance" },
  { key: "director_general", name: "Directeur Général", group: "Gouvernance" },
  { key: "director", name: "Directeur", group: "Gouvernance" },
  { key: "deputy_director", name: "Sous-Directeur", group: "Gouvernance" },
  { key: "agent", name: "Agent / contributeur", group: "Gouvernance" },
  { key: "auditor", name: "Contrôleur / auditeur", group: "Gouvernance" },
  { key: "reader", name: "Lecteur simple", group: "Gouvernance" },
  { key: "edulex_super_admin", name: "Super Administrateur EduLex", group: "EduLex" },
  { key: "edulex_country_admin", name: "Administrateur pays (EduLex)", group: "EduLex" },
  { key: "edulex_ministry_admin", name: "Administrateur ministériel (EduLex)", group: "EduLex" },
  { key: "edulex_depositor", name: "Service technique déposant (EduLex)", group: "EduLex" },
  { key: "edulex_doc_validator", name: "Validateur documentaire (EduLex)", group: "EduLex" },
  { key: "edulex_legal_validator", name: "Validateur juridique (EduLex)", group: "EduLex" },
  { key: "academy_editor", name: "Éditeur EduLex Academy", group: "Academy" },
  { key: "academy_learner", name: "Citoyen apprenant", group: "Academy" },
  { key: "public_authorized", name: "Public autorisé", group: "Academy" },
];

export const GUIDE_GROUP_ORDER: GuideGroup[] = ["Système", "Gouvernance", "EduLex", "Academy"];

export function roleMeta(key: string): RoleGuideMeta | undefined {
  return ROLE_GUIDE_META.find((r) => r.key === key);
}

// Contenu généré — rempli par l'atelier de rédaction (voir GUIDES_GENERATED).
export { GUIDES } from "./guide-content";
