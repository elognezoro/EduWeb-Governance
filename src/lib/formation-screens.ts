// Données des « aperçus d'écran » par module — partagées entre la page /formation
// (schéma SVG annoté) et l'export Word (emplacement réservé pour une vraie capture).

export interface ScreenSchema {
  titre: string;
  navIndex: number;
  callouts: string[];
}

export const SCREEN_SCHEMAS: Record<string, ScreenSchema> = {
  M2: { titre: "Tableau de bord", navIndex: 1, callouts: ["Filtre Pays / subdivision (barre supérieure)", "Cartes d'indicateurs (KPI)", "Bouton « Nouvelle activité »", "Graphiques et activités récentes"] },
  M3: { titre: "Organisation & organigramme", navIndex: 0, callouts: ["Ministère / organisation : zone d'accueil (dépôt)", "Filtre Pays pour restreindre le périmètre", "Boutons « + Organisation » / « + Structure »", "Structure : déplacer, éditer, supprimer (super admin)"] },
  M5: { titre: "Activités", navIndex: 3, callouts: ["Navigation : module Activités", "Recherche et filtres par statut", "Bouton « Nouvelle activité »", "Liste des activités (Brouillon → Consolidé)"] },
  M6: { titre: "Validation hiérarchique", navIndex: 4, callouts: ["Navigation : module Validation", "Filtre de périmètre", "Bouton « Examiner »", "File des activités à statuer (« · à vous »)"] },
  M7: { titre: "Autorisations d'absence", navIndex: 2, callouts: ["Navigation : module Absences", "Réglage de la politique (congé, seuil)", "Demander / valider une absence", "Comptabilité par motif + alertes de seuil"] },
  M9: { titre: "Référentiel EduLex", navIndex: 0, callouts: ["Navigation : module EduLex", "Recherche de textes réglementaires", "Dépôt / import d'un texte", "Niveau de vérification V0 → V4 et confidentialité"] },
};
