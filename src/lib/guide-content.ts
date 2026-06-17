// AUTO-GÉNÉRÉ — contenu des guides d'utilisateur par rôle.
// Rédigé puis révisé par un atelier multi-agents, ancré sur le code réel.
// Ne pas éditer à la main : régénérer via l'atelier « role-user-guides ».
import type { RoleGuide } from "./guide-data";

export const GUIDES: RoleGuide[] = [
  {
    "roleKey": "super_admin",
    "tagline": "Administrateur système disposant de l'accès complet à EduWeb Governance, garant du paramétrage, de la sécurité et du bon fonctionnement de la plateforme pour l'ensemble des pays et des organisations.",
    "intro": "Le Super Administrateur EduWeb est le compte le plus puissant de la plateforme : son périmètre est le système entier et il détient l'ensemble des permissions (organisation, utilisateurs, formulaires, activités, rapports, EduLex, Academy et administration). Il voit et gère les données de tous les pays, de toutes les organisations et de toutes les structures, sans la restriction d'organisation qui s'applique aux autres rôles. Il est responsable de la configuration de la plateforme (organigramme, comptes et rôles, hiérarchie de validation), de la supervision du référentiel réglementaire EduLex et de l'espace de formation Academy. À ce titre, il intervient à la fois comme administrateur technique, comme gestionnaire de la gouvernance et comme dernier recours pour débloquer ou superviser n'importe quel module.",
    "access": [
      {
        "module": "Tableau de bord (/dashboard)",
        "what": "Consultez la vue d'ensemble personnalisée à la connexion : les KPI de gouvernance (activités saisies, validées, en attente de validation, rapports générés), les KPI EduLex et Academy (textes disponibles, textes à vérifier, parcours Academy publiés, taux de validation), le graphique d'évolution des activités et le donut de répartition par statut, le feed des activités récentes et la carte EduLex récents. Le filtre Pays de la barre supérieure restreint le périmètre des données ; sans filtre, vous voyez tous les pays. Vous disposez aussi du bouton Nouvelle activité, de la carte Programme de parrainage commercial et de la carte Mes demandes d'absence."
      },
      {
        "module": "Accueil public (/)",
        "what": "Page vitrine marketing de la plateforme. Pour vous, utilisateur connecté, l'entrée Accueil de la navigation latérale mène en réalité au tableau de bord interne."
      },
      {
        "module": "Rendez-vous (/rendez-vous)",
        "what": "Gérez votre agenda personnel : créez un rendez-vous (titre, date et heure, lieu, rappel, notes), consultez les listes À venir et Passés & faits, marquez un rendez-vous fait ou non fait, modifiez ou supprimez chaque entrée. Ce module est strictement personnel : vous ne voyez que vos propres rendez-vous."
      },
      {
        "module": "Bilan & synthèse (/bilan)",
        "what": "Consultez votre synthèse personnelle (rendez-vous honorés et activités validées) sur la période choisie (Semaine, Quinzaine, Mois), avec taux de réalisation, cartes de détail et listes Faits / Non faits, puis exportez le tout en PDF via Exporter en PDF."
      },
      {
        "module": "Évaluation (/evaluation)",
        "what": "Consultez votre score de productivité personnel (0–100), l'indicateur de tendance et le graphique d'évolution sur 4 semaines, et générez vos Conseils IA via Obtenir mes conseils (puis Régénérer). Module strictement personnel."
      },
      {
        "module": "Distinctions & rappels à l'ordre (/distinctions)",
        "what": "En tant que super-admin, vous voyez la distinction de TOUS les agents actifs (et non seulement de vos subordonnés) : compteur de distinctions par agent, bouclier ou émoticône sur les 4 trimestres (T1–T4), détail des critères du trimestre courant (régularité du reporting, affaires personnelles, raison médicale) et message de style ivoirien avec lecture audio lorsque le pays CI est sélectionné. Le sélecteur d'année permet de remonter jusqu'à deux ans en arrière."
      },
      {
        "module": "Mon profil (/account)",
        "what": "Gérez votre propre compte : changez la photo de profil, choisissez votre type de profil (Personnel, École, Entreprise, Association) qui adapte la terminologie de l'interface et la période de bilan par défaut, et consultez vos informations (e-mail, organisation, pays) ainsi que vos badges de rôles."
      },
      {
        "module": "Organisation & structures (/organization)",
        "what": "Accès complet (organization:read et organization:manage) : consultez l'organigramme des ministères techniques et des organisations clientes ; créez une organisation cliente (bouton Organisation) et une structure (bouton Structure) ; réorganisez l'arborescence par glisser-déposer (avec garde anti-cycle) ; modifiez une structure (icône crayon) et supprimez-la (suppression refusée s'il reste des sous-structures) ; téléversez le logo d'une organisation. Le filtre Pays/subdivision de la barre supérieure peut restreindre l'affichage (bandeau « Organigramme filtré »)."
      },
      {
        "module": "Utilisateurs (/users)",
        "what": "Accès complet (user:read, user:manage et admin:manage) : vous voyez les comptes de TOUTES les organisations. Recherchez, créez un compte (Nouvel utilisateur) avec ses rôles groupés par périmètre et son supérieur hiérarchique, importez des comptes en masse via Importer (CSV) avec le Modèle CSV, modifiez un compte (Enregistrer), administrez-le (Désactiver/Activer le compte, Réinitialiser le mot de passe, Supprimer le compte), et déléguez des droits directs au-delà des rôles via les lots préréglés ou la sélection granulaire par module. Vous pouvez aussi supprimer plusieurs comptes en masse (suppression douce). Restriction : vous ne pouvez pas désactiver ni supprimer votre propre compte."
      },
      {
        "module": "Formulaires d'activités (/forms)",
        "what": "Accès complet (form:read, form:manage et admin:manage) : vous voyez les formulaires de toutes les organisations. Créez un formulaire (Nouveau formulaire), composez ses champs dans le concepteur (tous les types : texte court, texte long, date, nombre, liste déroulante, boutons radio, cases à cocher, fichier joint, image, tableau répétable, champ calculé, lien vers un texte EduLex), réordonnez et supprimez des champs, gérez le cycle de vie (Publier, Repasser en brouillon, Archiver) et supprimez le formulaire. Statuts : Brouillon, Publié, Archivé."
      },
      {
        "module": "Activités (/activities)",
        "what": "Accès complet et global (activity:create, read, update, validate, delete et admin:manage) : vous voyez TOUT l'inventaire des activités, tous statuts et tous pays confondus (Brouillon, Soumis, En examen, Validé, Rejeté, À corriger, Consolidé, Archivé). Créez une activité, modifiez celle d'un autre, joignez et téléchargez des pièces, consultez le détail et l'historique de validation, et statuez (Valider, Demander correction, Rejeter, Consolider) en respectant le niveau attendu du circuit. Vous pouvez aussi supprimer une activité."
      },
      {
        "module": "Validation hiérarchique (/validation)",
        "what": "Accès complet (activity:validate et admin:manage) : consultez la file des activités à statuer (Soumis, En examen, À corriger) au-delà de votre seule organisation, repérez le niveau courant et la mention « · à vous », ouvrez le détail via Examiner pour statuer (la décision s'effectue sur la fiche de l'activité), et lisez le bandeau Circuit de validation récapitulant les niveaux ordonnés."
      },
      {
        "module": "Autorisations d'absence (/absences)",
        "what": "Accès global (par lien hiérarchique ; le super-admin a un accès global, sans clé de permission dédiée) : vous supervisez la comptabilité des absences de tous les agents. Vous pouvez régler la politique d'absences (congé annuel réglementaire, seuil d'alerte), demander une absence pour vous-même, approuver ou refuser les demandes, comptabiliser directement une absence validée d'office, consulter le suivi par agent (cumul approuvé sur quota, graphiques par motif, alertes Seuil atteint et Quota dépassé) et supprimer un enregistrement. Motifs : Affaires personnelles, Congé réglementaire, Formation, Raison médicale, Force majeure institutionnelle. Seules les absences Approuvées sont comptées."
      },
      {
        "module": "Reporting institutionnel (/reports)",
        "what": "Accès complet (report:create, read, export, manage et admin:manage) : vous voyez les rapports de toutes les organisations. Générez un rapport (titre, périodicité, périmètre Pays/Organisation/Structure, période) agrégeant les activités au statut Validé/Consolidé, consultez-le, imprimez/exportez-le et supprimez-le. Statuts : Brouillon, Généré, Archivé."
      },
      {
        "module": "EduLex — référentiel réglementaire (/edulex)",
        "what": "Accès complet (edulex:read, create, validate, manage) : consultez les 4 KPI et la liste, recherchez et filtrez les textes (Catégorie, Statut, Type, Niveau), déposez un texte (Déposer un texte), accédez à la File de validation et à tous les liens de référentiel (Pays, Ministères, Secteurs, Import d'amorçage). Le filtre Pays restreint l'affichage."
      },
      {
        "module": "Fiche d'un texte EduLex (/edulex/texts/[id])",
        "what": "Accès complet (edulex:read, validate, publish, update, create, manage) : lisez toutes les métadonnées et badges (Type, Statut, Niveau de vérification V0–V4, Confidentialité), téléchargez (PDF, Markdown, source officielle) et téléversez les documents source, consultez relations, historique des versions et journal de validation, puis pilotez tout le circuit V0→V4 via le panneau Validation à partir de sources officielles (Source officielle (URL), commentaire, niveau, changement de Statut via Appliquer) et publiez le texte (Publier — mettre en vigueur)."
      },
      {
        "module": "Déposer un texte EduLex (/edulex/texts/new)",
        "what": "Accès complet (edulex:create) : remplissez le formulaire guidé (titre officiel, pays, type, ministère émetteur, secteur, juridiction, numéro officiel, dates, statut initial, confidentialité, langue, résumé analytique, URL source officielle) et déposez le texte, créé au niveau V0 avec son code EduLex généré automatiquement."
      },
      {
        "module": "Validation EduLex (file) (/edulex/validation)",
        "what": "Accès complet (edulex:read, validate) : parcourez la file des textes à vérifier, consultez les compteurs Textes à traiter et Non vérifiés (V0), et ouvrez une fiche via Examiner pour statuer. La file est restreinte au pays sélectionné."
      },
      {
        "module": "Import d'amorçage EduLex (/edulex/import)",
        "what": "Accès complet (edulex:create, manage) : choisissez le pays d'affectation, collez des données CSV/TSV, prévisualisez puis importez en masse des textes créés au statut Importé non vérifié et au niveau V0."
      },
      {
        "module": "Pays & juridictions EduLex (/edulex/countries)",
        "what": "Accès complet (edulex:read, manage) : consultez la grille des pays (drapeau, nom, namespace/code, nombre de textes) et ajoutez un pays (carte Ajouter un pays)."
      },
      {
        "module": "Ministères & gouvernements EduLex (/edulex/ministries)",
        "what": "Accès complet (edulex:read, manage) : déclarez un gouvernement, ajoutez un ministère, consultez les gouvernements par pays et leur statut (À venir / En vigueur / Archivé), supprimez un gouvernement, et éditez ou supprimez les ministères à l'unité ou par lot."
      },
      {
        "module": "Secteurs réglementaires EduLex (/edulex/sectors)",
        "what": "Accès complet (edulex:read, manage) : ajoutez un secteur (rattaché à un pays ou marqué International) et éditez ou supprimez les secteurs à l'unité ou par lot."
      },
      {
        "module": "EduLex Academy (/academy)",
        "what": "Accès complet (academy:read, manage) : consultez votre progression (XP, série, niveau), les 5 niveaux de compétence, les catégories et les parcours, et, grâce à academy:manage, générez les modules d'évaluation officiels via Générer — [pays] et Générer pour tous les pays."
      },
      {
        "module": "Parcours / Leçon / Progression / Badges / Classement Academy",
        "what": "Consultez et suivez les parcours (unités, leçons, prérequis), répondez aux quiz (QCU, QCM, Vrai/Faux) et recevez le feedback relié au texte EduLex source, suivez Ma progression (XP, niveau, série, textes à revoir), parcourez la galerie de Badges & trophées et le Classement citoyen."
      },
      {
        "module": "Administration Academy (/academy/admin)",
        "what": "Accès complet (academy:manage) : consultez les KPI des questions (au total, Publiées), créez une question (Nouvelle question) reliée à son texte EduLex source, et changez le statut (Publiée/Brouillon/Suspendue) ou supprimez une question."
      },
      {
        "module": "Notifications (/notifications)",
        "what": "Consultez vos 50 dernières notifications, ouvrez une notification pour la marquer lue et suivre son lien, et utilisez Tout marquer comme lu."
      },
      {
        "module": "Paramètres (/parametres)",
        "what": "Réglez vos préférences personnelles : période de bilan par défaut et activation des rappels de rendez-vous, puis Enregistrer."
      },
      {
        "module": "Archives (/archives)",
        "what": "Accès global (admin:manage) : consultez la vue consolidée de TOUT le système : activités consolidées/archivées, textes EduLex obsolètes (abrogés, remplacés, suspendus, archivés) et formulaires archivés, sans restriction d'organisation."
      },
      {
        "module": "Administration (/admin)",
        "what": "Accès complet (admin:read, admin:manage, organization:manage) : consultez les statistiques globales (utilisateurs, pays, rôles, permissions, textes EduLex), éditez la Hiérarchie de validation (par rôles de gouvernance) et consultez vos rôles. Les actions d'audit sont journalisées automatiquement en arrière-plan."
      }
    ],
    "workflows": [
      {
        "title": "Créer un nouvel utilisateur et lui attribuer ses rôles",
        "steps": [
          "Ouvrez le module Utilisateurs (/users) depuis la navigation.",
          "Cliquez sur Nouvel utilisateur (page /users/new).",
          "Renseignez les champs obligatoires : Prénom, Nom, E-mail, Genre et Mot de passe initial (8 caractères minimum).",
          "Précisez si besoin Téléphone, Organisation, Structure, Pays et Ministère.",
          "Désignez le Supérieur hiérarchique si l'agent doit pouvoir soumettre des demandes d'absence.",
          "Cochez les Rôles requis, groupés par périmètre (Système, Gouvernance, EduLex, Academy).",
          "Cliquez sur Créer l'utilisateur. Au besoin, rouvrez ensuite la fiche (/users/[id]) pour déléguer des droits supplémentaires via les lots préréglés ou la sélection granulaire par module, puis Enregistrer."
        ]
      },
      {
        "title": "Importer des comptes en masse par fichier CSV",
        "steps": [
          "Dans Utilisateurs (/users), cliquez sur Importer (CSV) (page /users/import).",
          "Téléchargez le gabarit via Modèle CSV pour respecter les colonnes attendues.",
          "Préparez votre fichier avec les colonnes requises (email, prenom, nom, motdepasse, roles) et, si besoin, telephone, pays (code ISO), organisation, structure, ministere.",
          "Importez le fichier dans la page d'import.",
          "Vérifiez l'aperçu des lignes détectées, corrigez les anomalies éventuelles, puis lancez l'import.",
          "Contrôlez ensuite dans la liste des utilisateurs que les comptes apparaissent bien avec leurs rôles et leur statut Actif."
        ]
      },
      {
        "title": "Administrer un compte existant (désactivation, mot de passe, délégation)",
        "steps": [
          "Dans Utilisateurs (/users), recherchez l'agent puis ouvrez sa fiche (/users/[id]).",
          "Modifiez si nécessaire le profil de l'agent puis cliquez sur Enregistrer.",
          "Dans la section Administration, utilisez Désactiver/Activer le compte, Réinitialiser le mot de passe ou Supprimer le compte (avec confirmation) selon le besoin.",
          "Pour étendre les droits sans changer les rôles, ouvrez la Délégation de droits : appliquez un lot préréglé (+ Valideur EduLex, + Valideur + publication EduLex, + Valideur d'activités, + Éditeur Academy) ou sélectionnez les droits par module.",
          "Cliquez sur Enregistrer (N droits) pour appliquer la délégation.",
          "Au besoin, consultez la dernière connexion affichée sur la fiche pour vérifier l'activité du compte."
        ]
      },
      {
        "title": "Configurer la hiérarchie de validation des activités",
        "steps": [
          "Ouvrez le module Administration (/admin).",
          "Repérez la section Hiérarchie de validation (éditeur ValidationHierarchyEditor).",
          "Définissez l'ordre des niveaux de validation par rôles de gouvernance (niveau 1, niveau 2, etc.).",
          "Enregistrez la configuration.",
          "Vérifiez le résultat depuis le module Validation hiérarchique (/validation) : le bandeau Circuit de validation doit refléter les niveaux ordonnés que vous venez de définir."
        ]
      },
      {
        "title": "Construire et faire évoluer l'organigramme",
        "steps": [
          "Ouvrez Organisation & structures (/organization).",
          "Créez l'organisation cliente via le bouton Organisation (Nom, Type, Pays) ; pour un ministère ivoirien, utilisez la liste de pré-remplissage qui fixe automatiquement le nom et le type Ministère, puis Créer l'organisation.",
          "Ajoutez les structures via le bouton Structure : renseignez Nom, Type, Organisation, éventuellement Structure parente, Ministère de rattachement, Pays, Subdivision/région et Responsable, puis Créer la structure.",
          "Réorganisez l'arborescence par glisser-déposer en faisant glisser une structure sur un ministère, une organisation ou une autre structure (la garde anti-cycle bloque les déplacements créant une boucle).",
          "Pour corriger une structure, cliquez sur l'icône crayon, modifiez puis Enregistrer ; pour la supprimer, utilisez Supprimer puis Confirmer (après avoir d'abord rattaché ailleurs ou supprimé ses sous-structures).",
          "Téléversez le logo d'une organisation via le bouton Logo de son en-tête."
        ]
      },
      {
        "title": "Faire progresser un texte EduLex jusqu'au niveau V4 et le mettre en vigueur",
        "steps": [
          "Ouvrez EduLex (/edulex) puis File de validation (/edulex/validation), ou ouvrez directement la fiche du texte.",
          "Cliquez sur Examiner pour ouvrir la fiche du texte (/edulex/texts/[id]).",
          "Dans le panneau Validation à partir de sources officielles, saisissez la Source officielle (URL) et un commentaire justificatif.",
          "Choisissez le Niveau de vérification visé (par exemple V3 puis V4) et, le cas échéant, ajustez le Statut du texte, puis cliquez sur Appliquer.",
          "Vérifiez que le badge de niveau et le journal de validation reflètent bien la progression.",
          "Lorsque le texte est prêt, cliquez sur Publier (mettre en vigueur) pour le faire entrer en vigueur ; contrôlez ensuite que les avertissements V0 ou « non en vigueur » ont disparu."
        ]
      },
      {
        "title": "Générer les modules d'évaluation Academy à partir des textes officiels",
        "steps": [
          "Ouvrez EduLex Academy (/academy).",
          "Localisez la carte Modules d'évaluation officiels (visible grâce à academy:manage).",
          "Pour un seul pays, sélectionnez-le dans la barre supérieure puis cliquez sur Générer — [pays].",
          "Pour couvrir l'ensemble, cliquez sur Générer pour tous les pays.",
          "Vérifiez ensuite dans Administration Academy (/academy/admin) que les questions ont bien été créées et ajustez leur statut (Publiée/Brouillon/Suspendue) si nécessaire."
        ]
      },
      {
        "title": "Générer un rapport institutionnel consolidé",
        "steps": [
          "Ouvrez Reporting institutionnel (/reports).",
          "Cliquez sur Générer un rapport (/reports/new).",
          "Renseignez le Titre, la Périodicité (Hebdomadaire, Mensuel, Trimestriel, Semestriel, Annuel ou Personnalisé) et le périmètre Pays / Organisation / Structure.",
          "Définissez la période De/À.",
          "Lancez la génération : le rapport agrège les activités au statut Validé/Consolidé en indicateurs et liste les références EduLex citées.",
          "Ouvrez le rapport (/reports/[id]), vérifiez la page de garde et les indicateurs, puis imprimez/exportez-le avec le bouton d'impression."
        ]
      }
    ],
    "tips": [
      "Utilisez le filtre Pays de la barre supérieure comme un commutateur de périmètre : sans filtre vous voyez tous les pays, mais l'activer permet de cibler une juridiction précise (utile pour EduLex, les activités, le reporting et l'organigramme).",
      "Avant de créer des comptes ou de générer des rapports, assurez-vous que l'organigramme (organisations, structures, supérieurs hiérarchiques) est à jour : le circuit d'absences et la chaîne de validation des activités en dépendent directement.",
      "Renseignez systématiquement le Supérieur hiérarchique d'un nouvel agent, faute de quoi celui-ci ne pourra pas soumettre de demande d'absence (le bouton Envoyer au supérieur exige un supérieur hiérarchique défini).",
      "Préférez la délégation de droits granulaire (lots préréglés ou sélection par module sur la fiche utilisateur) plutôt que d'accorder trop de rôles complets : cela limite les permissions au strict nécessaire.",
      "Lors d'un import EduLex d'amorçage, utilisez d'abord Prévisualiser pour contrôler les lignes détectées : les textes étant créés en V0 (Importé non vérifié), planifiez ensuite leur passage par la file de validation.",
      "Pour les imports d'utilisateurs en masse, partez toujours du Modèle CSV afin d'éviter les erreurs de colonnes et utilisez des codes ISO valides pour le pays.",
      "Consultez régulièrement le module Administration (/admin) pour suivre les statistiques globales et garder l'éditeur de Hiérarchie de validation cohérent avec votre organisation réelle ; rappelez-vous que vos actions sensibles sont journalisées automatiquement (audit).",
      "Pensez à publier (mettre en vigueur) les textes EduLex une fois certifiés : tant qu'ils restent en V0 ou non en vigueur, les avertissements correspondants s'affichent aux utilisateurs et aux apprenants Academy."
    ],
    "limits": [
      "Vous ne pouvez pas désactiver ni supprimer votre propre compte (action bloquée, même pour le super-admin).",
      "Vous ne pouvez pas supprimer une structure qui possède encore des sous-structures : il faut d'abord les rattacher ailleurs ou les supprimer.",
      "Vous ne pouvez pas déplacer une structure de manière à créer une boucle hiérarchique : la garde anti-cycle refuse le glisser-déposer (« Déplacement impossible : cela créerait un cycle hiérarchique »).",
      "Vous ne pouvez pas publier un formulaire vide : au moins un champ est requis avant de pouvoir le publier (la version n'est incrémentée qu'à la publication).",
      "Vous ne pouvez pas statuer sur une activité à un niveau pour lequel vous n'êtes pas habilité dans le circuit : l'affichage bloque la décision si le niveau attendu ne correspond pas (même si, en tant que super-admin, vous voyez l'ensemble de l'inventaire).",
      "Vous ne pouvez pas approuver deux fois la même demande d'absence : la transition de validation est atomique (anti-double-validation), et une demande d'absence ne peut être envoyée que si l'agent a un supérieur hiérarchique défini.",
      "La gestion fine du RBAC (édition complète des rôles et des permissions) n'est pas encore disponible dans l'interface : elle est annoncée pour des phases ultérieures ; en attendant, vous attribuez des rôles existants et déléguez des droits par module.",
      "Les Conseils IA de l'Évaluation ne sont disponibles que si la fonctionnalité IA est activée côté serveur (clé Anthropic présente) ; à défaut, un message d'état le signale.",
      "Le module Rendez-vous et la page Mon profil restent strictement personnels : vous ne gérez que vos propres rendez-vous et votre propre profil, ces écrans ne donnent pas accès à ceux des autres utilisateurs."
    ]
  },
  {
    "roleKey": "institution_admin",
    "tagline": "Structure les organisations et les comptes, conçoit les formulaires, pilote le reporting institutionnel et valide les activités, dans le périmètre de Gouvernance de son organisation.",
    "intro": "L'Administrateur institutionnel est le responsable opérationnel de la gouvernance d'une organisation cliente (ministère, institution, réseau, association ou entreprise) sur la plateforme. Il met en place et fait vivre l'organigramme, gère les comptes utilisateurs, leurs rôles et leur supérieur hiérarchique, conçoit les formulaires de saisie et produit les rapports consolidés. Il intervient également dans la chaîne de validation hiérarchique des activités, sans toutefois les créer ni les modifier. Son périmètre de données se limite à sa propre organisation et suit le filtre Pays de la barre supérieure ; il ne dispose ni des droits d'administration de plateforme (admin:read, admin:manage), ni des droits d'édition d'EduLex ou d'Academy, qu'il consulte uniquement.",
    "access": [
      {
        "module": "Tableau de bord (/dashboard et Accueil /)",
        "what": "Consultez votre vue d'ensemble à la connexion : en-tête « Bonjour, {Prénom} » avec le sous-titre « Vue d'ensemble · {pays} », carte du programme de parrainage commercial (code promo de 8 caractères, lien d'invitation, boutons Copier/Partager, compteur de filleuls), carte « Mes demandes d'absence » (4 dernières, plus badge « N à valider » et lien « Traiter → » si vous êtes supérieur hiérarchique). Lisez les KPI de gouvernance (Activités saisies, Activités validées, En attente de validation, Rapports générés, Textes EduLex disponibles, Textes à vérifier, Parcours Academy publiés, Taux de validation), le graphique « Évolution des activités », le donut « Répartition par statut », le feed « Activités récentes » et la carte « EduLex — récents ». Le périmètre des données suit le filtre Pays de la barre supérieure. Remarque : le bouton « Nouvelle activité » mène à /activities/new, qui requiert le droit de création d'activité dont vous ne disposez pas."
      },
      {
        "module": "Accueil public (/ landing)",
        "what": "Page vitrine publique de la plateforme, accessible avant connexion. Pour vous, utilisateur connecté, l'entrée « Accueil » de la navigation latérale mène au tableau de bord interne. Aucune action de gouvernance n'y est requise."
      },
      {
        "module": "Organisation & structures (/organization)",
        "what": "Avec organization:manage, vous gérez pleinement l'organigramme : créez une organisation cliente (bouton « Organisation » → /organization/new : Nom, Type — Ministère, Institution, Réseau, Association, Entreprise / Société —, Pays, avec la liste « Ministère du gouvernement actuel (Côte d'Ivoire) » qui pré-remplit le nom et fixe le type sur Ministère) ; créez des structures (bouton « Structure » → /organization/structures/new : Nom, Type, Organisation, Structure parente, Ministère de rattachement, Pays, Subdivision / région, Responsable) ; réorganisez par glisser-déposer (garde anti-cycle : « Déplacement impossible : cela créerait un cycle hiérarchique. ») ; modifiez une structure (icône crayon → /organization/structures/[id], bouton « Enregistrer ») ; supprimez une structure (refusée tant qu'il reste des sous-structures) ; téléversez le logo d'une organisation (bouton « Logo »). Un bandeau « Organigramme filtré » apparaît lorsqu'un filtre Pays / subdivision est actif."
      },
      {
        "module": "Utilisateurs (/users)",
        "what": "Avec user:manage, vous gérez les comptes : recherche ; création d'un compte (« Nouvel utilisateur » → /users/new : Prénom, Nom, E-mail, Téléphone, Genre, Mot de passe initial — min. 8 caractères —, Organisation, Structure, Pays, Ministère, Supérieur hiérarchique, Rôles groupés par périmètre Système / Gouvernance / EduLex / Academy) ; import CSV en masse (« Importer (CSV) » → /users/import, colonnes requises email, prenom, nom, motdepasse, roles ; « Modèle CSV ») ; modification d'un compte (/users/[id] : « Enregistrer », « Désactiver/Activer le compte », « Réinitialiser le mot de passe », « Supprimer le compte ») ; délégation de droits directs (lots préréglés ou sélection granulaire par module, « Enregistrer (N droits) ») ; suppression individuelle ou en masse (« Supprimer la sélection », soft delete). Vous ne pouvez pas désactiver ni supprimer votre propre compte. Sans admin:manage, la liste est limitée à votre organisation."
      },
      {
        "module": "Formulaires d'activités (/forms)",
        "what": "Avec form:manage, vous concevez et gérez les formulaires de saisie : création (« Nouveau formulaire » → /forms/new) ; composition des champs dans le concepteur (/forms/[id] : « Ajouter un champ », Libellé, Type — Texte court, Texte long, Date, Nombre, Liste déroulante, Boutons radio, Cases à cocher, Fichier joint, Image, Tableau répétable, Champ calculé, Lien vers un texte EduLex —, indicateur Requis, réordonnancement par flèches haut/bas, suppression) ; enregistrement (« Enregistrer », confirmation « ✓ Enregistré ») ; cycle de vie (« Publier » — refusé sans champ, incrémente la version —, « Repasser en brouillon », « Archiver ») ; suppression (« Supprimer le formulaire »). Statuts : Brouillon, Publié, Archivé. Sans admin:manage, le périmètre est limité à votre organisation."
      },
      {
        "module": "Activités (/activities)",
        "what": "Avec activity:read et activity:validate, vous consultez la liste filtrable par statut (Toutes, Brouillon, Soumis, En examen, Validé, Rejeté, À corriger, Consolidé, Archivé) et par titre des activités de votre organisation, ainsi que le détail de chacune (textes EduLex associés, informations, « Historique de validation », pièces jointes téléchargeables). Vous statuez via l'encadré « Décision de validation » : « Valider », « Demander correction », « Rejeter » (commentaire obligatoire pour le rejet et la demande de correction) et « Consolider » (sur une activité déjà validée). L'affichage indique le niveau courant (« Niveau X/Y · nom ») et bloque l'action si vous n'êtes pas habilité au niveau attendu. Vous ne disposez pas de activity:create, activity:update ni activity:delete : vous ne créez, ne modifiez ni ne supprimez les activités des agents."
      },
      {
        "module": "Validation hiérarchique (/validation)",
        "what": "Avec activity:validate, vous consultez la file des activités à statuer (Soumis, En examen, À corriger) avec auteur, structure, date de soumission et niveau, le bandeau « Circuit de validation » et les compteurs « En attente de décision » / « Validées (organisation) ». Les entrées marquées « · à vous » correspondent aux niveaux où vous êtes habilité. Cliquez « Examiner » pour ouvrir l'activité (/activities/[id]) et y statuer."
      },
      {
        "module": "Autorisations d'absence (/absences)",
        "what": "L'accès ne dépend d'aucune permission dédiée mais du lien hiérarchique. Vous pouvez demander une absence pour vous-même si un supérieur vous est défini. En tant que supérieur de vos agents (leur managerId), vous validez ou refusez leurs demandes (« Approuver » / « Refuser » avec motif facultatif puis « Confirmer le refus »), pouvez les comptabiliser directement (« Comptabiliser directement (validée d'office) »), régler la politique d'absences (« Congé annuel réglementaire (jours) », « Seuil d'alerte (jours cumulés) ») et suivre les ratios, alertes « Seuil atteint » / « Quota dépassé » et historiques par agent. Motifs : Affaires personnelles, Congé réglementaire, Formation, Raison médicale, Force majeure institutionnelle. Statuts : En attente / Approuvée / Refusée."
      },
      {
        "module": "Reporting institutionnel (/reports)",
        "what": "Avec report:manage et report:export, vous gérez le reporting consolidé : générez un rapport (« Générer un rapport » → /reports/new : Titre, Périodicité — Hebdomadaire, Mensuel, Trimestriel, Semestriel, Annuel, Personnalisé —, périmètre Pays / Organisation / Structure, période De/À) qui agrège les activités au statut Validé / Consolidé en indicateurs et références EduLex citées ; consultez un rapport (/reports/[id] : page de garde, indicateurs, tableaux « Activités réalisées » et « Références réglementaires EduLex ») ; imprimez ou exportez (bouton d'impression PrintButton) ; supprimez un rapport. Statuts : Brouillon, Généré, Archivé. Sans admin:manage, le périmètre est limité à votre organisation."
      },
      {
        "module": "EduLex — référentiel réglementaire (/edulex)",
        "what": "Avec edulex:read uniquement, vous consultez : les 4 KPI (Textes au total, En vigueur, À vérifier (V0 / à vérifier), Certifiés V4), la recherche par mot-clé et les filtres (Catégorie, Statut, Type, Niveau), et vous ouvrez la fiche d'un texte via sa carte. Les boutons « Déposer un texte » et « File de validation », ainsi que les liens de référentiel (Pays, Ministères, Secteurs, Import d'amorçage), ne vous sont pas accessibles : ils requièrent edulex:create, edulex:validate ou edulex:manage."
      },
      {
        "module": "Fiche d'un texte EduLex (/edulex/texts/[id])",
        "what": "Avec edulex:read, vous lisez la fiche détaillée : badges Type / Statut / Niveau de vérification (V0→V4) / Confidentialité (Public, Restreint, Confidentiel), avertissements (« niveau V0 : entrée non vérifiée », « pas en vigueur »), documents source, relations entre textes (Remplace, Modifie, Abroge, Lié à, Cite), historique des versions, journal de validation et traçabilité « Déposé par » / « Validé par ». Vous pouvez télécharger le texte (PDF, Markdown, source officielle). Le panneau de validation V0→V4, le changement de statut, le téléversement de document source et la publication ne vous sont pas ouverts (edulex:validate, edulex:update, edulex:publish requis)."
      },
      {
        "module": "EduLex Academy (/academy)",
        "what": "Avec academy:read, vous accédez à l'espace de formation citoyenne : hero (XP, Série, Niveau), accès rapides (Ma progression, Badges & trophées, Classement), les 5 Niveaux de compétence (Découverte, Compréhension, Application, Maîtrise, Expert / Référent), les filtres par catégorie et les « Parcours disponibles » (« Commencer »). Sans academy:manage, la carte « Modules d'évaluation officiels » et les boutons « Générer » ne vous sont pas accessibles."
      },
      {
        "module": "Parcours Academy (/academy/path/[id])",
        "what": "Avec academy:read, vous parcourez les unités numérotées d'un parcours, repérez les prérequis (cadenas) et ouvrez une leçon."
      },
      {
        "module": "Leçon Academy / quiz (/academy/lesson/[id])",
        "what": "Avec academy:read, vous suivez le lecteur de quiz : répondre puis « Valider », lire le feedback pédagogique relié au texte EduLex source, passer à la question suivante, terminer la leçon et voir l'écran de fin (bonnes réponses, XP gagnés, % de parcours)."
      },
      {
        "module": "Ma progression (Academy) (/academy/progress)",
        "what": "Avec academy:read, vous consultez votre tableau de bord d'apprenant : XP cumulés, niveau, série, avancement de vos parcours, « Textes à revoir » et vos badges."
      },
      {
        "module": "Badges & trophées (Academy) (/academy/badges)",
        "what": "Avec academy:read, vous consultez la galerie des badges (obtenus avec date, ou « À débloquer ») et le ratio « X / Y badge(s) obtenu(s) »."
      },
      {
        "module": "Classement citoyen (Academy) (/academy/leaderboard)",
        "what": "Avec academy:read, vous consultez le top 50 par XP cumulés et niveau et repérez votre propre ligne « (vous) »."
      },
      {
        "module": "Rendez-vous (/rendez-vous)",
        "what": "Module personnel ouvert à tout utilisateur : gérez votre agenda (création d'un RDV avec Titre, Date et heure, Lieu, Rappel, Notes ; listes « À venir » et « Passés & faits » ; « Marquer fait », « Modifier », « Supprimer »). Vous ne voyez que vos propres rendez-vous."
      },
      {
        "module": "Bilan & synthèse (/bilan)",
        "what": "Module personnel : consultez votre synthèse de RDV honorés et d'activités validées sur la période choisie (onglets Semaine, Quinzaine, Mois), le taux de réalisation, et exportez en PDF (« Exporter en PDF »)."
      },
      {
        "module": "Évaluation (/evaluation)",
        "what": "Module personnel : consultez votre score de productivité /100, la tendance par rapport à la semaine précédente, l'évolution sur 4 semaines et générez des « Conseils IA » (« Obtenir mes conseils », « Régénérer »)."
      },
      {
        "module": "Distinctions & rappels à l'ordre (/distinctions)",
        "what": "Module personnel et hiérarchique : consultez votre distinction trimestrielle et, en tant que supérieur, celles de vos subordonnés (sélecteur d'année, critères Régularité du reporting / Affaires personnelles / Raison médicale, message style ivoirien avec lecture audio quand le pays CI est sélectionné)."
      },
      {
        "module": "Mon profil (/account)",
        "what": "Gérez votre compte : avatar (« Changer la photo »), badges de rôles, et choix du « Type de profil » (Personnel, École, Entreprise, Association) qui adapte la terminologie de l'interface et la période de bilan par défaut. Trois cartes d'informations : E-mail, Organisation, Pays."
      },
      {
        "module": "Notifications (/notifications)",
        "what": "Consultez vos 50 dernières notifications (validations, publications EduLex, défis Academy, seuils d'absence, échéances), marquez une notification lue en la cliquant et utilisez « Tout marquer comme lu »."
      },
      {
        "module": "Paramètres (/parametres)",
        "what": "Réglez vos préférences personnelles : « Période de bilan par défaut » et activation des « Rappels des rendez-vous », puis « Enregistrer »."
      },
      {
        "module": "Archives (/archives)",
        "what": "Page accessible avec un périmètre limité : sans admin:manage, l'affichage se restreint à votre organisation. Consultez les activités consolidées / archivées, les textes EduLex obsolètes (Abrogé, Remplacé, Suspendu, Archivé) et les formulaires archivés. L'accès à l'ensemble des organisations relève d'admin:manage, dont vous ne disposez pas."
      },
      {
        "module": "Administration (/admin)",
        "what": "Accès partiel via organization:manage : vous pouvez éditer la « Hiérarchie de validation » (ValidationHierarchyEditor, par rôles de gouvernance) et consulter « Vos rôles ». Les statistiques globales et la gestion fine de la plateforme relèvent d'admin:read et admin:manage, dont vous ne disposez pas."
      },
      {
        "module": "Mot de passe oublié / Réinitialiser le mot de passe",
        "what": "Pages publiques d'auto-dépannage de connexion : saisie de l'e-mail pour recevoir un lien (valable 1 heure, usage unique), puis définition d'un nouveau mot de passe (min. 8 caractères) à partir du lien reçu."
      }
    ],
    "workflows": [
      {
        "title": "Mettre en place l'organigramme de votre organisation",
        "steps": [
          "Ouvrez « Organisation & structures » (/organization).",
          "Cliquez sur le bouton « Organisation » pour ouvrir /organization/new.",
          "Renseignez Nom de l'organisation, Type (Ministère, Institution, Réseau, Association, Entreprise / Société) et Pays ; au besoin, utilisez la liste « Ministère du gouvernement actuel » pour pré-remplir le nom et fixer le type sur Ministère.",
          "Cliquez sur « Créer l'organisation ».",
          "Revenez sur /organization, cliquez sur le bouton « Structure » et renseignez Nom, Type, Organisation, Structure parente (ou « — Aucune (racine) — »), Ministère de rattachement, Pays, Subdivision / région et Responsable.",
          "Cliquez sur « Créer la structure ».",
          "Pour ajuster la hiérarchie, glissez-déposez une structure sur un ministère, une organisation ou une autre structure (tout déplacement créant un cycle est bloqué).",
          "Téléversez éventuellement le logo via le bouton « Logo » dans l'en-tête de l'organisation."
        ]
      },
      {
        "title": "Créer un compte utilisateur et lui attribuer son supérieur hiérarchique",
        "steps": [
          "Ouvrez « Utilisateurs » (/users), puis cliquez sur « Nouvel utilisateur » (/users/new).",
          "Renseignez les champs requis : Prénom, Nom, E-mail, Genre, Mot de passe initial (min. 8 caractères).",
          "Complétez Téléphone, Organisation, Structure, Pays et Ministère.",
          "Sélectionnez le « Supérieur hiérarchique » : ce lien conditionne le suivi et le circuit des absences de l'agent.",
          "Cochez les Rôles requis, groupés par périmètre (Système, Gouvernance, EduLex, Academy).",
          "Cliquez sur « Créer l'utilisateur ».",
          "Pour créer plusieurs comptes d'un coup, utilisez plutôt « Importer (CSV) » après avoir téléchargé le « Modèle CSV » (colonnes email, prenom, nom, motdepasse, roles requises)."
        ]
      },
      {
        "title": "Déléguer des droits ponctuels à un utilisateur sans changer ses rôles",
        "steps": [
          "Ouvrez « Utilisateurs » (/users) et cliquez sur l'utilisateur concerné (/users/[id]).",
          "Allez dans la section « Délégation de droits ».",
          "Appliquez un lot préréglé (« + Valideur EduLex », « + Valideur + publication EduLex », « + Valideur d'activités », « + Éditeur Academy ») ou choisissez les droits granulaires par module.",
          "Cliquez sur « Enregistrer (N droits) » pour confirmer la délégation."
        ]
      },
      {
        "title": "Concevoir et publier un formulaire de saisie d'activités",
        "steps": [
          "Ouvrez « Formulaires d'activités » (/forms), puis cliquez sur « Nouveau formulaire » (/forms/new) et saisissez un titre.",
          "Dans le concepteur (/forms/[id]), cliquez sur « Ajouter un champ », renseignez le Libellé, choisissez le Type (Texte court, Texte long, Date, Nombre, Liste déroulante, Boutons radio, Cases à cocher, Fichier joint, Image, Tableau répétable, Champ calculé, Lien vers un texte EduLex) et indiquez si le champ est Requis.",
          "Pour les listes déroulantes, boutons radio et cases à cocher, saisissez les « Options séparées par des virgules ».",
          "Réordonnez les champs avec les flèches haut / bas et supprimez ceux qui sont inutiles.",
          "Cliquez sur « Enregistrer » (la confirmation « ✓ Enregistré » s'affiche).",
          "Cliquez sur « Publier » : le formulaire doit comporter au moins un champ, et sa version est incrémentée.",
          "Au besoin, utilisez ultérieurement « Repasser en brouillon » ou « Archiver »."
        ]
      },
      {
        "title": "Valider, faire corriger ou consolider une activité",
        "steps": [
          "Ouvrez « Validation hiérarchique » (/validation) pour voir la file des activités à statuer (Soumis, En examen, À corriger).",
          "Repérez les entrées marquées « · à vous » (niveaux où vous êtes habilité) et vérifiez le bandeau « Circuit de validation ».",
          "Cliquez sur « Examiner » pour ouvrir le détail de l'activité (/activities/[id]).",
          "Vérifiez le niveau courant affiché (« Niveau X/Y · nom »), les informations, les pièces jointes et les textes EduLex associés.",
          "Dans l'encadré « Décision de validation », choisissez « Valider », « Demander correction » ou « Rejeter » (un commentaire est obligatoire pour le rejet et la demande de correction).",
          "Pour clôturer un cycle, utilisez « Consolider » sur une activité déjà validée."
        ]
      },
      {
        "title": "Générer et exporter un rapport institutionnel consolidé",
        "steps": [
          "Ouvrez « Reporting institutionnel » (/reports), puis cliquez sur « Générer un rapport » (/reports/new).",
          "Saisissez le Titre, choisissez la Périodicité (Hebdomadaire, Mensuel, Trimestriel, Semestriel, Annuel, Personnalisé) et définissez le périmètre Pays / Organisation / Structure ainsi que la période De / À.",
          "Validez la génération : le rapport agrège les activités au statut Validé / Consolidé en indicateurs et liste les références EduLex citées.",
          "Ouvrez le rapport (/reports/[id]) pour vérifier la page de garde, les indicateurs et les tableaux « Activités réalisées » et « Références réglementaires EduLex ».",
          "Cliquez sur le bouton d'impression (PrintButton) pour imprimer ou exporter le rapport.",
          "Supprimez un rapport obsolète si nécessaire."
        ]
      },
      {
        "title": "Régler la politique d'absences et traiter les demandes de vos agents",
        "steps": [
          "Ouvrez « Autorisations d'absence » (/absences).",
          "Dans la carte « Politique d'absences », cliquez sur « Modifier » pour fixer le « Congé annuel réglementaire (jours) » et le « Seuil d'alerte (jours cumulés) ».",
          "Dans la carte « Demandes à valider », examinez chaque demande de vos agents (motif, dates, jours).",
          "Cliquez sur « Approuver », ou sur « Refuser » puis saisissez le « Motif du refus » et « Confirmer le refus ».",
          "Pour enregistrer une absence sans demande préalable, utilisez « Comptabiliser directement (validée d'office) » : renseignez Agent, Motif, dates et jours, puis « Enregistrer ».",
          "Surveillez les ratios par agent et les alertes « Seuil atteint » / « Quota dépassé »."
        ]
      }
    ],
    "tips": [
      "Utilisez systématiquement le filtre Pays de la barre supérieure : il restreint les KPI, l'organigramme, les activités, les rapports et EduLex au périmètre voulu (à défaut, « tous les pays »).",
      "Avant de créer des comptes, finalisez l'organigramme : pouvoir rattacher chaque utilisateur à la bonne Organisation, à la bonne Structure et au bon Supérieur hiérarchique évite des corrections ultérieures.",
      "Définissez toujours un Supérieur hiérarchique pour vos agents : sans lui, ils ne peuvent pas envoyer de demande d'absence et le circuit de validation des activités peut se bloquer.",
      "Composez vos formulaires avant de publier : « Publier » est refusé tant qu'aucun champ n'existe et incrémente la version ; réservez ce bouton aux évolutions abouties.",
      "Préférez l'import CSV (« Importer (CSV) ») pour les créations de comptes en masse ; téléchargez d'abord le « Modèle CSV » pour respecter les colonnes requises (email, prenom, nom, motdepasse, roles).",
      "Pour un besoin temporaire, privilégiez la « Délégation de droits » plutôt qu'un nouveau rôle : les lots préréglés (par exemple « + Valideur d'activités ») sont rapides et réversibles.",
      "Le rejet et la demande de correction d'une activité exigent un commentaire : rédigez une consigne claire pour que l'agent sache exactement quoi corriger.",
      "Vérifiez le niveau « Niveau X/Y · nom » avant de statuer : si vous n'êtes pas habilité au niveau attendu, l'action est bloquée ; ajustez au besoin la « Hiérarchie de validation » dans /admin.",
      "Avant de générer un rapport, assurez-vous que les activités concernées sont bien au statut Validé ou Consolidé, car seules celles-ci sont agrégées.",
      "Consultez régulièrement le centre de « Notifications » pour ne pas manquer les demandes d'absence à valider, les activités soumises et les franchissements de seuil."
    ],
    "limits": [
      "Vous ne pouvez ni créer, ni modifier, ni supprimer les activités des agents : vous n'avez ni activity:create, ni activity:update, ni activity:delete. Le bouton « Nouvelle activité » (tableau de bord et /activities/new) requiert activity:create, dont vous ne disposez pas.",
      "Vous ne pouvez pas éditer le référentiel EduLex : avec edulex:read seul, le dépôt de texte (/edulex/texts/new), la file de validation, la progression V0→V4, le téléversement de source, le changement de statut, la publication et les référentiels Pays / Ministères / Secteurs / Import vous sont fermés.",
      "Vous ne pouvez pas administrer EduLex Academy : sans academy:manage, vous ne générez pas de modules d'évaluation et vous ne créez ni ne gérez les questions de quiz (/academy/admin et /academy/admin/questions/new).",
      "Vous ne disposez pas d'admin:manage : votre périmètre sur les utilisateurs, formulaires, rapports et archives reste limité à votre organisation ; vous ne voyez ni l'ensemble des organisations, ni la totalité de l'inventaire d'activités.",
      "Vous n'avez pas admin:read : les statistiques globales de la plateforme et la consultation des journaux d'audit ne vous sont pas accessibles ; dans l'espace d'Administration, vous pouvez seulement éditer la « Hiérarchie de validation » (via organization:manage).",
      "Vous ne pouvez pas désactiver, réinitialiser ni supprimer votre propre compte.",
      "La suppression d'une structure est refusée tant qu'elle comporte des sous-structures : rattachez-les d'abord ailleurs ou supprimez-les.",
      "Pour les absences, vous n'agissez que dans le cadre de votre lien hiérarchique : vous ne validez et n'enregistrez que pour les agents dont vous êtes le supérieur, et vous ne demandez pour vous-même que si un supérieur vous est défini."
    ]
  },
  {
    "roleKey": "national_manager",
    "tagline": "Piloter la consolidation nationale des activités validées et produire les rapports institutionnels de gouvernance éducative.",
    "intro": "Le Responsable national / central est l'autorité de gouvernance qui supervise, au niveau central, la qualité et la validation des activités remontées par les structures. Il statue sur les activités qui lui sont soumises (valider, demander correction, rejeter, consolider), génère et exporte les rapports institutionnels consolidés, et consulte le référentiel réglementaire EduLex ainsi que l'espace EduLex Academy en lecture seule. Son périmètre fonctionnel relève de la Gouvernance : il ne configure ni les organisations, ni les comptes, ni les formulaires de saisie, et n'édite pas le référentiel EduLex. Le périmètre de ses données suit le filtre Pays sélectionné dans la barre supérieure et reste, pour les activités et rapports, limité à son organisation.",
    "access": [
      {
        "module": "Tableau de bord (/dashboard et Accueil /)",
        "what": "Consultez votre vue d'ensemble personnalisée à la connexion : l'en-tête « Bonjour, {Prénom} » avec le sous-titre « Vue d'ensemble · {pays} », les 4 KPI de gouvernance (« Activités saisies », « Activités validées », « En attente de validation » — soumises, en examen ou à corriger —, « Rapports générés ») et les 4 KPI de référentiel/formation (« Textes EduLex disponibles », « Textes à vérifier » — statut « à vérifier » ou niveau V0 —, « Parcours Academy publiés », « Taux de validation »). Vous y trouvez le graphique « Évolution des activités » (saisies et validations sur 6 mois), le donut « Répartition par statut », le feed « Activités récentes » (6 dernières, lien « Tout voir » vers /activities), la carte « EduLex — récents » (5 textes, liens vers les fiches) et votre carte « Mes demandes d'absence ». La carte « Programme de parrainage commercial » et le bouton « Nouvelle activité » sont affichés mais relèvent d'autres usages ou droits (voir Limites)."
      },
      {
        "module": "Activités (/activities)",
        "what": "Consultez (activity:read) les activités relevant de votre organisation : liste filtrable par statut (Toutes, Brouillon, Soumis, En examen, Validé, Rejeté, À corriger, Consolidé, Archivé), recherche par titre et filtre Pays. Ouvrez le détail d'une activité pour voir les textes EduLex associés, les informations (auteur, structure, pays, période, date de soumission), les pièces jointes (téléchargement) et l'« Historique de validation » (Soumission, Validation, Rejet, Demande de correction, Consolidation). Grâce à activity:validate, vous disposez de l'encadré « Décision de validation » : « Valider », « Demander correction », « Rejeter » (commentaire obligatoire pour rejet et correction) et « Consolider » (sur une activité déjà validée). L'affichage indique le niveau courant (« Niveau X/Y · nom ») et vous bloque si vous n'êtes pas habilité au niveau attendu."
      },
      {
        "module": "Validation hiérarchique (/validation)",
        "what": "Accédez à la file d'attente des activités à statuer (statuts Soumis, En examen, À corriger) avec les compteurs « En attente de décision » et « Validées (organisation) ». Chaque entrée affiche l'auteur, la structure, la date de soumission et le niveau courant, avec la mention « · à vous » lorsque vous êtes habilité à ce niveau. Cliquez « Examiner » pour ouvrir le détail de l'activité et statuer (la décision s'effectue sur /activities/[id]). Le bandeau « Circuit de validation : 1. … → 2. … » vous rappelle l'ordre des niveaux. Détenant activity:validate, vous pouvez réellement statuer et non simplement consulter la file."
      },
      {
        "module": "Reporting institutionnel (/reports)",
        "what": "Générez (report:create), consultez (report:read) et exportez (report:export) les rapports consolidés relevant de votre organisation. Via « Générer un rapport » (/reports/new), renseignez le Titre, la Périodicité (Hebdomadaire, Mensuel, Trimestriel, Semestriel, Annuel, Personnalisé), le périmètre Pays / Organisation / Structure et la période De/À ; le rapport agrège les activités aux statuts Validé et Consolidé en indicateurs (total, répartition par statut) et références EduLex citées. Consultez un rapport (/reports/[id]) : page de garde (périmètre Pays/Organisation/Période), indicateurs « Activités consolidées » et par statut, tableau « Activités réalisées », « Références réglementaires EduLex ». Imprimez/exportez via le bouton d'impression « PrintButton ». La suppression de rapports relève de report:manage (voir Limites)."
      },
      {
        "module": "EduLex — référentiel réglementaire (/edulex)",
        "what": "Consultez (edulex:read) le référentiel réglementaire international restreint au pays sélectionné : les 4 KPI (« Textes au total », « En vigueur », « À vérifier (V0 / à vérifier) », « Certifiés V4 »), la recherche par mot-clé (titre, code, numéro officiel, résumé, tags) et les filtres Catégorie, Statut, Type, Niveau (boutons « Filtrer » / « Réinitialiser »). Ouvrez la fiche d'un texte via sa carte (badge type/statut, niveau de vérification, drapeau pays). Les boutons « Déposer un texte », « File de validation » et les liens de référentiel (Pays, Ministères, Secteurs, Import d'amorçage) ne s'affichent pas pour vous, faute des droits edulex:create / validate / manage."
      },
      {
        "module": "Fiche d'un texte EduLex (/edulex/texts/[id])",
        "what": "Consultez (edulex:read) la vue détaillée d'un texte : badges Type, Statut, Niveau de vérification (V0→V4) et Confidentialité (Public/Restreint/Confidentiel), avertissements (« Ce texte est au niveau V0 : entrée non vérifiée », « Ce texte n'est pas en vigueur »), relations entre textes (Remplace / Modifie / Abroge / Lié à / Cite), « Historique des versions », « Journal de validation » et traçabilité « Déposé par » / « Validé par ». Vous pouvez télécharger le texte (« Télécharger (PDF) », « Markdown », « Consulter la source officielle »). Le panneau de validation V0→V4, le téléversement de document source et la publication ne vous sont pas accessibles (droits edulex:validate / update / publish requis)."
      },
      {
        "module": "EduLex Academy (/academy)",
        "what": "Consultez (academy:read) l'espace de formation citoyenne (« EduLex CI Academy » lorsque le pays sélectionné est la Côte d'Ivoire) : le hero avec votre « XP », votre « Série » et votre « Niveau », les accès rapides « Ma progression », « Badges & trophées », « Classement », les 5 « Niveaux de compétence » (Découverte, Compréhension, Application, Maîtrise, Expert / Référent), le filtre « Catégories de parcours » et la section « Parcours disponibles » (« Commencer »). Les boutons de génération des modules d'évaluation relèvent de academy:manage et ne vous sont pas proposés."
      },
      {
        "module": "Parcours Academy (/academy/path/[id])",
        "what": "Consultez (academy:read) le détail d'un parcours : en-tête (badge « Niveau N », catégorie, titre, description), unités numérotées et leur marqueur « Prérequis » (cadenas), accès aux leçons (avec le nombre de questions) et retour à Academy."
      },
      {
        "module": "Leçon Academy — quiz (/academy/lesson/[id])",
        "what": "Suivez (academy:read) le lecteur de quiz interactif : répondez aux questions (QCU, QCM, Vrai/Faux) puis « Valider », lisez le feedback pédagogique relié au texte EduLex source (« Voir le texte → », avec mention « à vérifier » si V0), enchaînez « Question suivante » et « Terminer la leçon », et consultez l'écran de fin (bonnes réponses, « XP gagnés », % de parcours, « Recommencer »)."
      },
      {
        "module": "Ma progression — Academy (/academy/progress)",
        "what": "Consultez (academy:read) votre tableau de bord d'apprenant : « XP cumulés », « Niveau N », « Série d'apprentissage » (jours), l'avancement de « Mes parcours », les « Textes à revoir » (recommandations ouvrant la fiche EduLex) et « Mes badges »."
      },
      {
        "module": "Badges & trophées — Academy (/academy/badges)",
        "what": "Consultez (academy:read) la galerie des badges : le ratio « X / Y badge(s) obtenu(s) », les badges obtenus (« Obtenu le [date] ») et ceux encore « À débloquer » (cadenas)."
      },
      {
        "module": "Classement citoyen — Academy (/academy/leaderboard)",
        "what": "Consultez (academy:read) le classement des apprenants par XP cumulés et niveau : le top 50 (rang/médaille, initiales, nom, « Niveau N », série, total XP), avec votre propre ligne mise en évidence (« (vous) »)."
      },
      {
        "module": "Rendez-vous (/rendez-vous)",
        "what": "Gérez votre agenda personnel (accès individuel, sans permission dédiée ; vous ne voyez que vos propres RDV) : créez un rendez-vous (Titre, Date et heure, Lieu, Rappel, Notes) via « Ajouter le rendez-vous », consultez les listes « À venir » et « Passés & faits », cochez « Marquer fait » / « Marquer non fait », « Modifier » (« Enregistrer ») ou « Supprimer »."
      },
      {
        "module": "Bilan & synthèse (/bilan)",
        "what": "Consultez votre synthèse personnelle des rendez-vous honorés et activités validées sur la période choisie (onglets « Semaine », « Quinzaine », « Mois »), la carte « Taux de réalisation », les cartes « Rendez-vous honorés » et « Activités validées », et les listes « Faits » / « Non faits ». Exportez en PDF via « Exporter en PDF »."
      },
      {
        "module": "Évaluation (/evaluation)",
        "what": "Consultez votre score de productivité personnel (0–100) avec son libellé qualitatif, l'indicateur de tendance (« +N pts / -N pts / Stable vs semaine précédente »), le graphique « Évolution sur 4 semaines » et les détails « RDV honorés (7 j) » / « Activités validées (7 j) ». Générez vos « Conseils IA » via « Obtenir mes conseils » puis « Régénérer » (un message s'affiche si la fonctionnalité IA n'est pas activée sur le serveur)."
      },
      {
        "module": "Distinctions & rappels à l'ordre (/distinctions)",
        "what": "Consultez votre distinction trimestrielle (et, le cas échéant, celles de vos subordonnés) : règles de régularité du reporting et seuils d'absence, sélecteur d'année, état des trimestres T1–T4, détail des critères (Reporting ≥ 50 %, Affaires personnelles < 20 %, Raison médicale < 40 %) et message ivoirien (nouchi) avec lecture audio lorsque le pays CI est sélectionné."
      },
      {
        "module": "Mon profil (/account)",
        "what": "Gérez votre compte personnel : avatar (« Changer la photo »), badges de rôles, et carte « Type de profil » (Personnel, École, Entreprise, Association) qui adapte la terminologie de l'interface et la période de bilan par défaut. Consultez vos cartes « E-mail », « Organisation » et « Pays »."
      },
      {
        "module": "Autorisations d'absence (/absences)",
        "what": "Accédez à la comptabilité des absences selon votre lien hiérarchique (aucune clé de permission dédiée). Demandez une absence pour vous-même via « Demander une absence » (Motif — Affaires personnelles, Congé réglementaire, Formation, Raison médicale, Force majeure institutionnelle —, dates Du/Au, jours auto-calculés, Note au supérieur, « Envoyer au supérieur », à condition d'avoir un supérieur défini), suivez vos demandes et leur statut, et annulez une demande En attente. Si des agents vous sont rattachés (vous êtes leur supérieur), la carte « Demandes à valider », l'enregistrement direct (« Comptabiliser directement ») et le réglage de la « Politique d'absences » deviennent disponibles."
      },
      {
        "module": "Notifications (/notifications)",
        "what": "Consultez vos 50 dernières notifications (échéances, validations, publications EduLex, défis Academy, seuils d'absence), marquez-en une comme lue en la cliquant (et suivez son lien) et utilisez « Tout marquer comme lu »."
      },
      {
        "module": "Paramètres (/parametres)",
        "what": "Réglez vos préférences personnelles : « Période de bilan par défaut » (Profil par défaut / Semaine / Quinzaine / Mois) et interrupteur « Rappels des rendez-vous », puis « Enregistrer »."
      },
      {
        "module": "Accueil — page publique (/)",
        "what": "Page vitrine marketing accessible avant connexion (piliers Gouvernance administrative, EduLex, Academy, statistiques en direct). Une fois connecté, l'entrée « Accueil » de la navigation latérale vous mène au tableau de bord interne."
      },
      {
        "module": "Mot de passe oublié / Réinitialiser le mot de passe",
        "what": "En cas de difficulté de connexion, saisissez votre e-mail sur /mot-de-passe-oublie pour recevoir un lien de réinitialisation (valable 1 heure, usage unique), puis définissez un nouveau mot de passe (min. 8 caractères) sur /reinitialiser-mot-de-passe."
      }
    ],
    "workflows": [
      {
        "title": "Valider une activité soumise au niveau national",
        "steps": [
          "Sélectionnez le pays concerné dans la barre supérieure pour cadrer votre périmètre.",
          "Ouvrez « Validation hiérarchique » (/validation) et repérez les entrées portant la mention « · à vous » au niveau courant.",
          "Cliquez « Examiner » sur l'activité à traiter pour ouvrir son détail.",
          "Vérifiez les informations (auteur, structure, période), les pièces jointes et les textes EduLex associés, ainsi que l'« Historique de validation ».",
          "Dans l'encadré « Décision de validation », contrôlez l'indication « Niveau X/Y · nom » pour confirmer que vous êtes habilité au niveau attendu.",
          "Cliquez « Valider » pour faire progresser l'activité au niveau suivant du circuit."
        ]
      },
      {
        "title": "Demander une correction ou rejeter une activité",
        "steps": [
          "Depuis « Validation hiérarchique » ou « Activités », ouvrez le détail de l'activité concernée.",
          "Dans l'encadré « Décision de validation », choisissez « Demander correction » si le dossier est récupérable, ou « Rejeter » s'il doit être abandonné.",
          "Saisissez le commentaire (obligatoire pour ces deux décisions) en expliquant précisément les éléments à corriger ou le motif du rejet.",
          "Confirmez la décision : l'activité repasse « À corriger » (visible par son auteur) ou « Rejeté ».",
          "Vérifiez que l'« Historique de validation » a bien enregistré votre demande de correction ou votre rejet."
        ]
      },
      {
        "title": "Consolider une activité validée",
        "steps": [
          "Dans « Activités » (/activities), filtrez la liste sur le statut « Validé ».",
          "Ouvrez l'activité que vous souhaitez intégrer au reporting consolidé.",
          "Dans l'encadré « Décision de validation », cliquez « Consolider » (disponible uniquement sur une activité au statut Validé).",
          "Confirmez : l'activité passe au statut « Consolidé » et devient éligible à l'agrégation dans les rapports.",
          "Contrôlez la trace de consolidation dans l'« Historique de validation »."
        ]
      },
      {
        "title": "Générer un rapport institutionnel consolidé",
        "steps": [
          "Ouvrez « Reporting institutionnel » (/reports), puis cliquez « Générer un rapport » (/reports/new).",
          "Renseignez le Titre du rapport et choisissez la Périodicité (Hebdomadaire, Mensuel, Trimestriel, Semestriel, Annuel ou Personnalisé).",
          "Définissez le périmètre Pays / Organisation / Structure adapté à votre échelon national.",
          "Indiquez la période De/À : le rapport agrège alors les activités aux statuts Validé et Consolidé en indicateurs et références EduLex citées.",
          "Lancez la génération, puis ouvrez le rapport (/reports/[id]) pour vérifier la page de garde, les indicateurs « Activités consolidées » et par statut, le tableau « Activités réalisées » et les « Références réglementaires EduLex »."
        ]
      },
      {
        "title": "Exporter ou imprimer un rapport",
        "steps": [
          "Dans « Reporting institutionnel » (/reports), ouvrez le rapport voulu (statut Généré de préférence).",
          "Vérifiez l'exactitude des indicateurs et des références réglementaires sur la fiche /reports/[id].",
          "Cliquez le bouton d'impression « PrintButton » pour lancer l'export / l'impression (votre permission report:export y donne droit).",
          "Choisissez l'impression papier ou l'enregistrement en PDF dans la boîte de dialogue de votre navigateur, puis diffusez le document aux autorités concernées."
        ]
      },
      {
        "title": "Vérifier le fondement réglementaire EduLex d'une activité",
        "steps": [
          "Dans le détail d'une activité, repérez les textes EduLex associés.",
          "Cliquez sur un texte pour ouvrir sa fiche (/edulex/texts/[id]).",
          "Lisez les badges Type, Statut et Niveau de vérification (V0→V4) et tenez compte des avertissements (« niveau V0 : entrée non vérifiée » ou « n'est pas en vigueur »).",
          "Au besoin, téléchargez le texte (« Télécharger (PDF) » / « Markdown ») ou ouvrez « Consulter la source officielle ».",
          "Utilisez l'« Historique des versions » et le « Journal de validation » pour apprécier la fiabilité du texte avant de statuer sur l'activité."
        ]
      },
      {
        "title": "Suivre votre charge de validation depuis le tableau de bord",
        "steps": [
          "À la connexion, ouvrez le « Tableau de bord » (/dashboard).",
          "Confirmez le pays affiché dans le sous-titre « Vue d'ensemble · {pays} » (ajustez le filtre Pays si nécessaire).",
          "Lisez le KPI « En attente de validation » pour mesurer le volume d'activités soumises, en examen ou à corriger.",
          "Consultez le KPI « Taux de validation » et le donut « Répartition par statut » pour évaluer l'avancement.",
          "Cliquez « Tout voir » sous « Activités récentes » pour basculer vers /activities, ou ouvrez /validation pour traiter directement la file."
        ]
      },
      {
        "title": "Demander une absence et la faire valider par votre supérieur",
        "steps": [
          "Ouvrez « Autorisations d'absence » (/absences), puis « Demander une absence » → « Nouvelle demande ».",
          "Choisissez le Motif (Affaires personnelles, Congé réglementaire, Formation, Raison médicale ou Force majeure institutionnelle) et renseignez les dates Du/Au (le nombre de jours est calculé automatiquement).",
          "Ajoutez une « Note au supérieur » expliquant le contexte, puis cliquez « Envoyer au supérieur » (un supérieur hiérarchique doit être défini sur votre compte).",
          "Suivez le statut de votre demande (En attente / Approuvée / Refusée) et, le cas échéant, la note de refus.",
          "Annulez vous-même une demande encore « En attente » si elle n'est plus justifiée."
        ]
      }
    ],
    "tips": [
      "Réglez systématiquement le filtre Pays de la barre supérieure avant de valider ou de générer un rapport : tout votre périmètre de données (activités, file de validation, EduLex, rapports) en dépend.",
      "Avant de cliquer « Valider », vérifiez l'indication « Niveau X/Y · nom » : si l'écran vous bloque, c'est que vous n'êtes pas habilité au niveau attendu — l'activité doit d'abord franchir les niveaux antérieurs.",
      "Pour un rejet ou une demande de correction, rédigez un commentaire précis et actionnable : il est obligatoire et constitue la consigne que l'auteur verra pour reprendre son dossier.",
      "Ne générez vos rapports qu'après avoir consolidé les activités pertinentes : seuls les statuts Validé et Consolidé sont agrégés dans les indicateurs.",
      "Méfiez-vous des textes EduLex au niveau V0 (« entrée non vérifiée ») ou « pas en vigueur » lorsqu'ils servent de fondement à une activité ; appuyez vos décisions sur des textes vérifiés plutôt que sur des entrées non confirmées.",
      "Utilisez la file « Validation hiérarchique » pour le quotidien (mention « · à vous ») et le module « Activités » pour les recherches ciblées par statut ou par titre.",
      "Consultez régulièrement le centre de « Notifications » : vous y êtes alerté des nouvelles soumissions à valider et, si vous encadrez des agents, des seuils d'absence les concernant."
    ],
    "limits": [
      "Vous ne pouvez pas créer ni modifier le contenu d'une activité : la création (« Nouvelle activité ») relève de activity:create et la modification du contenu d'une activité d'un autre relève de activity:update ; vous intervenez en validation, pas en saisie.",
      "Vous ne pouvez pas supprimer une activité dont vous n'êtes pas l'auteur (réservé à activity:delete) ni voir l'inventaire au-delà de votre organisation (réservé à admin:manage).",
      "Vous ne pouvez pas supprimer un rapport : la gestion/suppression des rapports exige report:manage.",
      "Vous ne pouvez pas éditer le référentiel EduLex : déposer un texte (edulex:create), statuer dans la file de validation ou faire progresser le niveau V0→V4 (edulex:validate), publier (edulex:publish), modifier (edulex:update), importer en masse ou gérer les Pays, Ministères, Secteurs (edulex:manage) vous sont fermés ; vous êtes en lecture seule.",
      "Vous ne pouvez pas administrer EduLex Academy : générer les modules d'évaluation, créer ou gérer les questions de quiz relève de academy:manage.",
      "Vous ne pouvez pas gérer l'organisation et les structures (organization:read/manage) ni les comptes utilisateurs, rôles et délégations (user:read/manage), y compris la création, l'import CSV ou la réinitialisation de mots de passe.",
      "Vous ne pouvez pas concevoir de formulaires de saisie (form:read/manage : création, composition, publication, archivage).",
      "Vous n'avez pas accès aux Archives consolidées (admin:manage) ni à l'espace Administration — hiérarchie de validation, statistiques globales, audit — qui requièrent admin:read / admin:manage / organization:manage.",
      "Concernant les absences, vous demandez vos propres congés ; valider, enregistrer d'office ou régler la politique n'est possible que pour les agents qui vous sont hiérarchiquement rattachés (en tant que leur supérieur)."
    ]
  },
  {
    "roleKey": "regional_manager",
    "tagline": "Validez les activités de votre périmètre, suivez leur consolidation et appuyez-vous sur le référentiel réglementaire EduLex et les rapports institutionnels pour piloter la gouvernance de votre région.",
    "intro": "Le Responsable régional / intermédiaire est un maillon clé du circuit de validation hiérarchique de la gouvernance éducative. Il consulte et statue (valider, demander correction, rejeter, consolider) sur les activités saisies par les agents de son périmètre, au niveau qui lui est attribué dans la chaîne de validation. Il peut, lorsque c'est nécessaire, modifier directement une activité d'un autre agent pour la corriger. Il dispose en outre d'un accès en consultation aux rapports consolidés et au référentiel réglementaire EduLex, qui éclairent ses décisions. Ses droits se limitent à la gouvernance opérationnelle : il ne crée pas d'activités, ne configure ni les organisations, ni les comptes utilisateurs, ni les formulaires, et ne génère ni rapports ni textes réglementaires.",
    "access": [
      {
        "module": "Tableau de bord (/dashboard et Accueil /)",
        "what": "À la connexion, vous disposez d'une vue d'ensemble personnalisée de votre périmètre, ajustée par le filtre Pays de la barre supérieure. Vous y consultez vos KPI de gouvernance — « Activités saisies », « Activités validées », « En attente de validation » (soumises, en examen ou à corriger), « Rapports générés », « Textes EduLex disponibles », « Textes à vérifier », « Parcours Academy publiés » et « Taux de validation » —, le graphique « Évolution des activités » sur 6 mois, le donut « Répartition par statut », le feed « Activités récentes » (avec lien « Tout voir » vers la liste des activités) et la carte « EduLex — récents » menant aux fiches de textes. La carte « Mes demandes d'absence » récapitule votre situation personnelle, et la carte de parrainage commercial reste disponible. Le bouton « Nouvelle activité » figure sur cette page, mais la création d'activités ne relève pas de votre rôle (voir Limites)."
      },
      {
        "module": "Activités (/activities)",
        "what": "C'est votre module central. Vous consultez la liste des activités de votre périmètre, filtrable par statut (Toutes, Brouillon, Soumis, En examen, Validé, Rejeté, À corriger, Consolidé, Archivé) et par pays, avec recherche par titre. Vous ouvrez le détail de chaque activité pour examiner ses textes EduLex associés, ses informations (auteur, structure, pays, période, date de soumission), ses pièces jointes et son « Historique de validation ». Grâce à activity:validate, vous utilisez l'encadré « Décision de validation » pour « Valider », « Demander correction » ou « Rejeter » (commentaire obligatoire pour le rejet et la correction) au niveau qui vous est attribué, et « Consolider » une activité déjà validée ; l'écran indique le niveau courant (« Niveau X/Y · nom ») et bloque toute décision si vous n'êtes pas habilité au niveau attendu. Grâce à activity:update, vous pouvez modifier une activité d'un autre agent lorsqu'elle est en Brouillon, À corriger ou Rejeté. Vous ne créez pas d'activités et ne supprimez pas celles d'autrui."
      },
      {
        "module": "Validation hiérarchique (/validation)",
        "what": "Vous y trouvez la file d'attente des activités à statuer (statuts Soumis, En examen, À corriger), avec les compteurs « En attente de décision » et « Validées (organisation) ». Chaque entrée affiche l'auteur, la structure, la date de soumission et le niveau courant, avec la mention « · à vous » lorsque vous êtes habilité à ce niveau. Le bandeau « Circuit de validation : 1. … → 2. … » rappelle l'ordonnancement des niveaux. Vous cliquez « Examiner » pour ouvrir le détail de l'activité et statuer. Disposant de la permission activity:validate, vous pouvez effectivement statuer, et non seulement consulter la file."
      },
      {
        "module": "Reporting institutionnel (/reports)",
        "what": "En consultation uniquement (report:read). Vous parcourez le tableau des rapports consolidés (titre, périodicité, auteur, date, statut Brouillon/Généré/Archivé) limités à votre organisation, et vous ouvrez un rapport (/reports/[id]) pour lire sa page de garde (périmètre Pays/Organisation/Période), ses indicateurs « Activités consolidées » et la répartition par statut, le tableau « Activités réalisées » et les « Références réglementaires EduLex ». Vous ne pouvez ni générer, ni exporter, ni supprimer un rapport."
      },
      {
        "module": "EduLex — référentiel réglementaire (/edulex)",
        "what": "En consultation uniquement (edulex:read). Vous consultez les 4 KPI (« Textes au total », « En vigueur », « À vérifier (V0 / à vérifier) », « Certifiés V4 »), vous recherchez par mot-clé (titre, code, numéro officiel, résumé, tags) et filtrez par Catégorie, Statut, Type et Niveau, puis vous ouvrez la fiche d'un texte via sa carte. Les boutons « Déposer un texte », « File de validation » et les liens de référentiel (Pays, Ministères, Secteurs, Import d'amorçage) ne vous sont pas proposés, faute des droits correspondants."
      },
      {
        "module": "Fiche d'un texte EduLex (/edulex/texts/[id])",
        "what": "En consultation uniquement (edulex:read). Vous lisez les badges Type, Statut, Niveau de vérification (V0→V4) et Confidentialité (Public/Restreint/Confidentiel), les avertissements éventuels (« Ce texte est au niveau V0 : entrée non vérifiée », « Ce texte n'est pas en vigueur »), et vous téléchargez le texte (« Télécharger (PDF) », « Markdown », « Consulter la source officielle »). Vous consultez les relations entre textes (Remplace / Modifie / Abroge / Lié à / Cite), l'« Historique des versions », le « Journal de validation » et la traçabilité « Déposé par » / « Validé par ». Le panneau de validation V0→V4 et de changement de statut ne vous est pas accessible."
      },
      {
        "module": "Autorisations d'absence (/absences)",
        "what": "L'accès à ce module ne dépend pas d'une permission dédiée mais du lien hiérarchique. Pour vous-même, vous pouvez « Demander une absence » dès lors qu'un supérieur hiérarchique vous est défini (motifs : Affaires personnelles, Congé réglementaire, Formation, Raison médicale, Force majeure institutionnelle), suivre vos demandes et annuler une demande En attente. Si des agents vous sont rattachés (vous êtes leur supérieur), vous voyez la carte « Demandes à valider » pour « Approuver » ou « Refuser » leurs demandes, comptabiliser une absence d'office, régler la politique d'absences et suivre le cumul approuvé par agent sur le quota."
      },
      {
        "module": "Mon profil (/account)",
        "what": "Vous gérez votre compte personnel : avatar (« Changer la photo »), affichage du nom et des badges de rôle, et choix du « Type de profil » (Personnel, École, Entreprise, Association) qui adapte la terminologie de l'interface et la période de bilan par défaut. Vous y consultez vos cartes E-mail, Organisation et Pays."
      },
      {
        "module": "Outils personnels de productivité (/rendez-vous, /bilan, /evaluation, /distinctions)",
        "what": "Ces espaces personnels vous sont ouverts comme à tout utilisateur. Rendez-vous : agenda personnel (création, rappels, suivi de vos propres RDV). Bilan & synthèse : synthèse de vos RDV honorés et activités validées sur une période, avec taux de réalisation et export PDF. Évaluation : score de productivité personnel (0–100) sur 4 semaines, avec « Conseils IA » à la demande. Distinctions & rappels à l'ordre : vos récompenses trimestrielles, et celles de vos subordonnés, selon la régularité du reporting et le respect des seuils d'absence (messages en style ivoirien et lecture audio lorsque le pays CI est sélectionné)."
      },
      {
        "module": "Notifications (/notifications)",
        "what": "Vous consultez vos 50 dernières notifications (échéances, validations, publications EduLex, défis Academy, seuils d'absence), les marquez lues en cliquant pour suivre le lien vers la ressource concernée, et utilisez « Tout marquer comme lu »."
      },
      {
        "module": "Paramètres (/parametres)",
        "what": "Vous réglez vos préférences personnelles : « Période de bilan par défaut » (Profil par défaut / Semaine / Quinzaine / Mois) et activation des « Rappels des rendez-vous », puis « Enregistrer »."
      },
      {
        "module": "Aide à la connexion (/mot-de-passe-oublie, /reinitialiser-mot-de-passe)",
        "what": "En cas d'oubli, vous saisissez votre e-mail pour recevoir un lien de réinitialisation (valable 1 heure, à usage unique), puis vous définissez un nouveau mot de passe (min. 8 caractères) depuis le lien reçu."
      }
    ],
    "workflows": [
      {
        "title": "Valider une activité soumise par un agent de votre périmètre",
        "steps": [
          "Ouvrez « Validation hiérarchique » (/validation) et repérez dans la file les activités au statut Soumis ou En examen portant la mention « · à vous » au niveau courant.",
          "Cliquez « Examiner » sur l'activité concernée pour ouvrir son détail (/activities/[id]).",
          "Lisez l'« Historique de validation », les informations (auteur, structure, période), les pièces jointes et les textes EduLex associés afin de vérifier la conformité.",
          "Dans l'encadré « Décision de validation », vérifiez l'indication « Niveau X/Y · nom » confirmant que vous êtes bien habilité à ce niveau.",
          "Cliquez « Valider » pour faire progresser l'activité au niveau suivant du circuit.",
          "Vérifiez que le compteur « En attente de décision » a diminué et que l'activité apparaît désormais comme validée."
        ]
      },
      {
        "title": "Demander une correction ou rejeter une activité non conforme",
        "steps": [
          "Depuis « Validation hiérarchique » ou « Activités », ouvrez le détail de l'activité à traiter.",
          "Dans l'encadré « Décision de validation », choisissez « Demander correction » si l'activité doit être amendée par l'auteur, ou « Rejeter » si elle doit être écartée.",
          "Saisissez le commentaire — obligatoire pour la correction comme pour le rejet — en précisant clairement les motifs et les éléments à reprendre.",
          "Confirmez la décision ; l'activité repasse au statut « À corriger » (renvoyée à l'auteur) ou « Rejeté ».",
          "Suivez l'entrée « À corriger » dans la file : l'agent pourra modifier puis re-soumettre, et l'activité vous reviendra pour une nouvelle décision."
        ]
      },
      {
        "title": "Corriger directement une activité au lieu de la renvoyer",
        "steps": [
          "Ouvrez « Activités » (/activities) et filtrez sur le statut Brouillon, À corriger ou Rejeté pour cibler les activités modifiables.",
          "Ouvrez l'activité de l'agent concerné et cliquez « Modifier » (/activities/[id]/edit) — votre permission activity:update vous autorise à éditer l'activité d'un autre agent.",
          "Ajustez le titre, la description, la structure, la période ou la liaison aux textes EduLex selon le besoin.",
          "Enregistrez vos modifications.",
          "Laissez l'agent re-soumettre l'activité corrigée, puis statuez normalement dans le circuit lorsqu'elle vous revient."
        ]
      },
      {
        "title": "Consolider une activité validée",
        "steps": [
          "Dans « Activités » (/activities), filtrez sur le statut Validé pour lister les activités prêtes à être consolidées.",
          "Ouvrez le détail de l'activité validée concernée.",
          "Dans l'encadré « Décision de validation », cliquez « Consolider ».",
          "Confirmez l'action ; l'activité passe au statut Consolidé et devient éligible à l'agrégation dans les rapports institutionnels.",
          "Vérifiez la trace de l'opération dans l'« Historique de validation » de l'activité."
        ]
      },
      {
        "title": "Vérifier le fondement réglementaire d'une activité dans EduLex",
        "steps": [
          "Depuis le détail d'une activité, ouvrez l'un des textes EduLex associés, ou rendez-vous dans « EduLex » (/edulex).",
          "Recherchez le texte par mot-clé (titre, code, numéro officiel, résumé, tags) et affinez avec les filtres Catégorie, Statut, Type, Niveau.",
          "Ouvrez la fiche du texte et vérifiez son Statut (« En vigueur » ou non) et son Niveau de vérification (V0→V4) ; tenez compte des avertissements « Ce texte est au niveau V0 : entrée non vérifiée » ou « Ce texte n'est pas en vigueur ».",
          "Au besoin, téléchargez le texte (« Télécharger (PDF) » / « Markdown ») ou « Consulter la source officielle », et examinez les relations (Remplace / Modifie / Abroge / Lié à / Cite).",
          "Reportez ce constat dans votre décision de validation de l'activité."
        ]
      },
      {
        "title": "Consulter un rapport institutionnel de votre organisation",
        "steps": [
          "Ouvrez « Reporting institutionnel » (/reports) et repérez le rapport recherché dans le tableau (titre, périodicité, auteur, date, statut).",
          "Cliquez sur le rapport pour ouvrir sa fiche (/reports/[id]).",
          "Lisez la page de garde (périmètre Pays/Organisation/Période) puis les indicateurs « Activités consolidées » et la répartition par statut.",
          "Parcourez le tableau « Activités réalisées » et la section « Références réglementaires EduLex » pour relier les contributions aux textes cités.",
          "Utilisez ces éléments pour suivre l'avancement de votre périmètre ; la génération et l'export du rapport relèvent d'un autre rôle."
        ]
      },
      {
        "title": "Valider une demande d'absence d'un de vos agents",
        "steps": [
          "Ouvrez « Autorisations d'absence » (/absences) ; si des agents vous sont rattachés, repérez la carte « Demandes à valider ».",
          "Examinez la demande (agent, motif, dates, nombre de jours, note au supérieur) ainsi que le suivi du cumul approuvé sur quota de l'agent.",
          "Cliquez « Approuver » pour la valider, ou « Refuser » en renseignant éventuellement le « Motif du refus » puis « Confirmer le refus ».",
          "Surveillez les éventuelles alertes « Seuil atteint » ou « Quota dépassé » sur l'agent concerné.",
          "L'agent est notifié de la décision ; seules les absences Approuvées sont comptabilisées dans son suivi annuel."
        ]
      }
    ],
    "tips": [
      "Traitez en priorité les entrées portant la mention « · à vous » dans la file de validation : ce sont les activités dont vous êtes effectivement le valideur au niveau courant. Les autres avancent à un autre niveau du circuit.",
      "Avant chaque décision, ouvrez l'« Historique de validation » de l'activité : il retrace les soumissions, validations, rejets, demandes de correction et consolidations antérieures et évite les décisions redondantes.",
      "Pour un rejet ou une demande de correction, rédigez un commentaire précis et actionnable (le commentaire est obligatoire) : l'agent doit comprendre exactement quoi reprendre avant de re-soumettre.",
      "Méfiez-vous des textes EduLex au niveau V0 (non vérifié) ou non « En vigueur » avant de fonder une validation sur eux : l'avertissement affiché sur la fiche signale une entrée à confirmer.",
      "Réservez la modification directe d'une activité (activity:update) aux corrections mineures, plus rapides qu'un aller-retour ; sinon, privilégiez « Demander correction » pour responsabiliser l'auteur.",
      "Ne consolidez qu'une activité déjà au statut Validé : la consolidation la rend agrégeable dans les rapports institutionnels, c'est une étape de clôture.",
      "Suivez le KPI « Taux de validation » et le donut « Répartition par statut » du tableau de bord pour détecter les activités qui s'accumulent « En attente de validation » dans votre périmètre.",
      "Utilisez le filtre Pays de la barre supérieure pour cadrer précisément le périmètre de vos activités, rapports et textes EduLex."
    ],
    "limits": [
      "Vous ne créez pas d'activités : la permission activity:create ne vous est pas attribuée. Le bouton « Nouvelle activité » peut s'afficher dans l'interface, mais votre rôle consiste à statuer sur les activités saisies par les agents, non à les saisir.",
      "Vous ne pouvez pas supprimer l'activité d'un autre agent (droit activity:delete non attribué) : vous statuez et corrigez, mais ne supprimez pas leurs contributions.",
      "Vous ne pouvez ni générer, ni exporter, ni supprimer de rapport institutionnel : votre accès au Reporting est en lecture seule (report:read uniquement).",
      "Vous ne pouvez pas déposer, modifier, valider, publier, importer ni gérer de texte EduLex : votre accès au référentiel est en consultation seule (edulex:read). Le panneau de validation V0→V4, la « File de validation » et les référentiels Pays/Ministères/Secteurs ne vous sont pas ouverts.",
      "Vous ne gérez pas les organisations ni les structures : création, modification, glisser-déposer de l'organigramme et logos relèvent de organization:manage.",
      "Vous ne gérez pas les comptes utilisateurs : création, import CSV, activation/désactivation, réinitialisation de mot de passe, suppression et délégation de droits relèvent de user:manage.",
      "Vous ne concevez pas de formulaires de saisie : création, composition, publication et archivage relèvent de form:manage.",
      "Vous n'avez pas accès à l'administration de la plateforme ni à l'éditeur de la hiérarchie de validation (admin:read / admin:manage / organization:manage), ni aux Archives consolidées globales (admin:manage).",
      "Vous n'administrez pas EduLex Academy (création de questions, génération de modules d'évaluation, gestion des statuts), réservée à academy:manage ; l'apprentissage citoyen lui-même requiert la permission academy:read, non incluse dans votre rôle.",
      "Votre périmètre de validation se limite au niveau du circuit qui vous est attribué : si vous n'êtes pas habilité au niveau courant d'une activité, l'interface bloque votre décision."
    ]
  },
  {
    "roleKey": "local_manager",
    "tagline": "Piloter, saisir et valider les activités de son service en s'appuyant sur le référentiel réglementaire EduLex.",
    "intro": "Le Responsable local / chef de service est l'animateur de proximité de la gouvernance des activités au sein de sa structure. Il crée et tient à jour les activités de son périmètre, les fait progresser dans le circuit de validation et statue, à son niveau, sur les contributions qui lui sont soumises : valider, demander correction, rejeter ou consolider. Il consulte librement le référentiel réglementaire EduLex pour rattacher ses activités aux textes en vigueur, mais il ne le modifie pas. Son périmètre de données suit le filtre Pays de la barre supérieure et, pour les activités, l'organisation à laquelle il est rattaché.",
    "access": [
      {
        "module": "Tableau de bord (/dashboard et Accueil /)",
        "what": "Vue d'ensemble à la connexion : en-tête « Bonjour, {Prénom} · {pays} », bouton « Nouvelle activité », carte du programme de parrainage commercial (code promo, lien d'invitation, boutons Copier/Partager, compteur de filleuls), carte « Mes demandes d'absence » (4 dernières, avec badge « N à valider » et lien « Traiter → » lorsqu'il est supérieur hiérarchique). KPI d'activités : « Activités saisies », « Activités validées », « En attente de validation » (soumises, en examen ou à corriger), « Rapports générés ». KPI réglementaires : « Textes EduLex disponibles », « Textes à vérifier », « Parcours Academy publiés », « Taux de validation ». Graphique « Évolution des activités » (6 mois), donut « Répartition par statut », feed « Activités récentes » (lien « Tout voir ») et carte « EduLex — récents ». Les données suivent le filtre Pays de la barre supérieure."
      },
      {
        "module": "Activités (/activities)",
        "what": "Cœur du rôle. Consulter la liste filtrable par statut (Toutes, Brouillon, Soumis, En examen, Validé, Rejeté, À corriger, Consolidé, Archivé) et la recherche par titre, sur le périmètre de son organisation. Créer une activité (« Nouvelle activité »), la modifier — y compris l'activité d'un autre agent grâce à activity:update —, la soumettre à validation, joindre et télécharger des pièces (PDF, image, Word, Excel), et consulter le détail (textes EduLex associés, informations, « Historique de validation »). Statuer comme validateur via l'encadré « Décision de validation » : « Valider », « Demander correction », « Rejeter » (commentaire obligatoire pour rejet et correction) et « Consolider » sur une activité validée, en respectant le niveau courant indiqué (« Niveau X/Y · nom »)."
      },
      {
        "module": "Validation hiérarchique (/validation)",
        "what": "File d'attente des activités à statuer (Soumis, En examen, À corriger) de son organisation, avec compteurs « En attente de décision » et « Validées (organisation) ». Pour chaque entrée : auteur, structure, date de soumission et niveau courant, avec la mention « · à vous » lorsqu'il est habilité au niveau attendu. Bouton « Examiner » pour ouvrir le détail et statuer (sur /activities/[id]). Disposant d'activity:validate, il statue pleinement. Le bandeau « Circuit de validation » rappelle l'ordre des niveaux."
      },
      {
        "module": "EduLex — référentiel réglementaire (/edulex)",
        "what": "Consultation seule (edulex:read). Voir les 4 KPI (« Textes au total », « En vigueur », « À vérifier (V0 / à vérifier) », « Certifiés V4 »), rechercher par mot-clé (titre, code, numéro officiel, résumé, tags), filtrer par Catégorie, Statut, Type et Niveau, et ouvrir la fiche d'un texte via sa carte. Les boutons « Déposer un texte » et « File de validation », ainsi que les liens de référentiel (Pays, Ministères, Secteurs, Import d'amorçage), ne lui sont pas proposés."
      },
      {
        "module": "Fiche d'un texte EduLex (/edulex/texts/[id])",
        "what": "Lecture détaillée d'un texte : badges Type, Statut, Niveau de vérification (V0→V4) et Confidentialité (Public/Restreint/Confidentiel), avertissements (« niveau V0 : entrée non vérifiée », « texte n'est pas en vigueur »), relations entre textes (Remplace / Modifie / Abroge / Lié à / Cite), « Historique des versions », « Journal de validation » et traçabilité « Déposé par » / « Validé par ». Téléchargements disponibles : « Télécharger (PDF) », « Markdown », « Consulter la source officielle ». Le panneau « Validation à partir de sources officielles » (V0→V4) et le téléversement de document source ne sont pas accessibles (réservés aux validateurs/éditeurs EduLex)."
      },
      {
        "module": "Rendez-vous (/rendez-vous)",
        "what": "Agenda personnel : créer un rendez-vous (Titre, Date et heure, Lieu, Rappel, Notes), consulter ses listes « À venir » et « Passés & faits », marquer fait/non fait, modifier et supprimer. Il ne voit que ses propres rendez-vous."
      },
      {
        "module": "Bilan & synthèse (/bilan)",
        "what": "Synthèse personnelle de ses rendez-vous honorés et activités validées sur une période choisie (onglets « Semaine », « Quinzaine », « Mois »), avec taux de réalisation, cartes de détail et listes « Faits » / « Non faits ». Export PDF via « Exporter en PDF »."
      },
      {
        "module": "Évaluation (/evaluation)",
        "what": "Score de productivité personnel (0–100) calculé sur ses rendez-vous honorés et activités validées, indicateur de tendance vs semaine précédente, graphique d'évolution sur 4 semaines, cartes de détail de la semaine et carte « Conseils IA » (bouton « Obtenir mes conseils », « Régénérer »)."
      },
      {
        "module": "Distinctions & rappels à l'ordre (/distinctions)",
        "what": "Consulter sa propre distinction trimestrielle et celles de ses subordonnés : compteur de distinctions, bouclier ou émoticône par trimestre (T1–T4), détail des critères (Reporting ≥ 50 %, Affaires personnelles < 20 %, Raison médicale < 40 %), sélecteur d'année, et message ivoirien (nouchi) avec lecture audio lorsque le pays CI est sélectionné. L'accès repose sur le lien hiérarchique (sa distinction + celles de ses subordonnés)."
      },
      {
        "module": "Autorisations d'absence (/absences)",
        "what": "Accès fondé sur le lien hiérarchique (aucune permission dédiée). En tant qu'agent, il demande une absence pour lui-même (« Demander une absence ») s'il a un supérieur défini, suit son cumul approuvé sur quota et peut annuler sa propre demande en attente. En tant que supérieur de ses agents, il valide/refuse leurs demandes (« Demandes à valider »), peut comptabiliser une absence directement (« validée d'office ») et régler la « Politique d'absences » (congé réglementaire et seuil d'alerte)."
      },
      {
        "module": "Mon profil (/account)",
        "what": "Consulter et personnaliser son compte : avatar (« Changer la photo »), nom et badges de rôles, choix du « Type de profil » (🏠 Personnel, 🎓 École, 🏢 Entreprise, 🤝 Association) qui adapte la terminologie de l'interface, et cartes « E-mail » / « Organisation » / « Pays »."
      },
      {
        "module": "Notifications (/notifications)",
        "what": "Centre de notifications in-app : lister ses 50 dernières notifications (validations, échéances, publications EduLex, seuils d'absence), les marquer lues en cliquant et suivre leurs liens, et « Tout marquer comme lu »."
      },
      {
        "module": "Paramètres (/parametres)",
        "what": "Préférences personnelles : « Période de bilan par défaut » (Profil par défaut / Semaine / Quinzaine / Mois) et interrupteur « Rappels des rendez-vous », enregistrés via « Enregistrer »."
      },
      {
        "module": "Accueil public (/), Mot de passe oublié et Réinitialisation",
        "what": "Pages publiques accessibles à tous : vitrine marketing et piliers du produit, demande de lien de réinitialisation par e-mail (« Envoyer le lien »), puis définition d'un nouveau mot de passe à partir du lien reçu (valable 1 heure, à usage unique)."
      }
    ],
    "workflows": [
      {
        "title": "Créer et soumettre une activité de son service",
        "steps": [
          "Depuis le tableau de bord ou le module Activités, cliquez sur « Nouvelle activité » (page /activities/new).",
          "Renseignez le Titre et la description, sélectionnez la Structure concernée, puis la Période (dates de début et de fin).",
          "Dans la section de liaison EduLex, rattachez l'activité aux textes réglementaires pertinents (issus du référentiel que vous pouvez consulter).",
          "Enregistrez : l'activité est créée au statut Brouillon.",
          "Ouvrez le détail de l'activité et, si besoin, cliquez sur « Joindre un document » pour ajouter une pièce (PDF, image, Word, Excel).",
          "Lorsque l'activité est complète, cliquez sur « Soumettre à validation » : la chaîne de validation démarre au premier niveau."
        ]
      },
      {
        "title": "Statuer sur une activité qui vous est soumise",
        "steps": [
          "Ouvrez le module « Validation hiérarchique » (/validation) pour voir la file des activités en attente de votre organisation.",
          "Repérez les entrées portant la mention « · à vous » : ce sont celles dont le niveau courant correspond à votre habilitation.",
          "Cliquez sur « Examiner » pour ouvrir le détail de l'activité (/activities/[id]).",
          "Lisez la description, les pièces jointes, les textes EduLex associés et l'« Historique de validation ».",
          "Dans l'encadré « Décision de validation », choisissez l'action : « Valider » pour faire avancer l'activité, ou « Demander correction » / « Rejeter » en saisissant un commentaire (obligatoire).",
          "Vérifiez l'indication « Niveau X/Y · nom » : l'action n'est possible que si vous êtes habilité au niveau attendu."
        ]
      },
      {
        "title": "Corriger puis re-soumettre une activité renvoyée « À corriger »",
        "steps": [
          "Dans Activités, filtrez la liste sur le statut « À corriger » (ou « Rejeté »).",
          "Ouvrez l'activité concernée et lisez le commentaire du validateur dans l'« Historique de validation ».",
          "Cliquez sur « Modifier » (/activities/[id]/edit) et apportez les corrections demandées (contenu, période, liaisons EduLex, pièces jointes).",
          "Enregistrez vos modifications.",
          "Cliquez à nouveau sur « Soumettre à validation » pour relancer le circuit."
        ]
      },
      {
        "title": "Consolider une activité validée",
        "steps": [
          "Ouvrez une activité au statut « Validé » depuis le module Activités.",
          "Dans l'encadré « Décision de validation », cliquez sur « Consolider ».",
          "Confirmez l'action : l'activité passe au statut Consolidé et devient exploitable pour le reporting institutionnel et les archives.",
          "Vérifiez l'« Historique de validation », qui enregistre l'étape de consolidation."
        ]
      },
      {
        "title": "Rattacher une activité au bon texte EduLex",
        "steps": [
          "Avant ou pendant la saisie d'une activité, ouvrez le module EduLex (/edulex).",
          "Recherchez le texte par mot-clé (titre, code, numéro officiel, résumé, tags) et affinez avec les filtres Catégorie, Statut, Type, Niveau.",
          "Ouvrez la fiche du texte pour vérifier son Statut (en vigueur) et son Niveau de vérification ; méfiez-vous des textes au niveau V0 signalés « entrée non vérifiée ».",
          "Notez le texte retenu, revenez à votre activité et ajoutez-le dans la section de liaison aux textes EduLex.",
          "Après création, vérifiez dans le détail de l'activité que les « textes EduLex associés » sont corrects."
        ]
      },
      {
        "title": "Demander une autorisation d'absence pour vous-même",
        "steps": [
          "Ouvrez le module « Autorisations d'absence » (/absences).",
          "Assurez-vous qu'un supérieur hiérarchique vous est attribué (sans lui, l'envoi est impossible).",
          "Cliquez sur « Demander une absence » puis « Nouvelle demande ».",
          "Choisissez le Motif (Affaires personnelles, Congé réglementaire, Formation, Raison médicale, Force majeure institutionnelle), les dates Du/Au (le nombre de jours se calcule automatiquement) et ajoutez une note au supérieur.",
          "Cliquez sur « Envoyer au supérieur » ; suivez ensuite le statut (En attente / Approuvée / Refusée) dans votre historique et sur le tableau de bord."
        ]
      },
      {
        "title": "Valider ou refuser une demande d'absence de l'un de vos agents",
        "steps": [
          "Dans « Autorisations d'absence » (/absences), repérez la carte « Demandes à valider » (visible parce que vous êtes le supérieur de vos agents).",
          "Examinez la demande : agent, motif, dates, nombre de jours et note.",
          "Cliquez sur « Approuver » pour la valider, ou sur « Refuser » puis saisissez le « Motif du refus » (facultatif) et confirmez via « Confirmer le refus ».",
          "Au besoin, utilisez « Comptabiliser directement (validée d'office) » pour enregistrer une absence sans demande préalable (Agent, Motif, dates, jours).",
          "Surveillez les alertes « Seuil atteint » / « Quota dépassé » dans le suivi par agent."
        ]
      }
    ],
    "tips": [
      "Utilisez le filtre Pays de la barre supérieure pour cadrer vos KPI, vos activités et le référentiel EduLex sur le bon périmètre avant de travailler.",
      "Avant de soumettre une activité, rattachez-la systématiquement aux textes EduLex en vigueur : cela facilite la validation et alimente les références réglementaires des rapports institutionnels.",
      "Traitez la file de « Validation hiérarchique » régulièrement et priorisez les entrées marquées « · à vous » pour ne pas allonger les délais de validation de votre service.",
      "Pour tout rejet ou demande de correction, rédigez un commentaire clair et actionnable : il est obligatoire et guide l'agent dans sa reprise.",
      "Consultez le module « Évaluation » et ses « Conseils IA » pour suivre votre régularité, et le module « Distinctions » pour situer la performance de reporting de vos subordonnés, trimestre par trimestre.",
      "Réglez votre « Période de bilan par défaut » dans Paramètres en cohérence avec votre type de profil (École, Entreprise…) afin que le module Bilan affiche d'emblée la bonne période.",
      "En présence d'un texte EduLex au niveau V0 (« entrée non vérifiée »), restez prudent : signalez-le à un validateur EduLex plutôt que de fonder une activité importante dessus."
    ],
    "limits": [
      "Vous ne pouvez pas supprimer une activité dont vous n'êtes pas l'auteur : la suppression d'une activité d'autrui relève de la permission activity:delete, que vous n'avez pas.",
      "Vous ne pouvez ni déposer, ni modifier, ni valider, ni publier, ni importer un texte EduLex : votre accès au référentiel est en lecture seule (le panneau de validation V0→V4 et le téléversement de source vous sont masqués).",
      "Vous ne gérez pas les référentiels EduLex (Pays, Ministères, Secteurs, Import d'amorçage) : ces écrans requièrent edulex:manage/create.",
      "Vous n'avez pas accès à la gestion des comptes utilisateurs (/users) ni à la délégation de droits, ni à la gestion de l'organigramme et des structures (/organization).",
      "Vous ne pouvez pas concevoir de formulaires de saisie (/forms) ni générer, exporter ou gérer des rapports institutionnels (/reports) : ces modules exigent respectivement form:manage et report:create/manage.",
      "Vous n'accédez pas à l'espace d'administration (/admin), à l'éditeur de la hiérarchie de validation, ni aux Archives (/archives), qui nécessitent admin:read / admin:manage.",
      "Côté EduLex Academy, vous n'avez aucune permission academy:* : vous ne suivez pas les parcours, ne consultez ni votre progression, ni vos badges ou le classement, et ne gérez pas les questions de quiz (le tableau de bord en affiche seulement un KPI).",
      "Votre pouvoir de validation est borné par le niveau du circuit : vous ne pouvez statuer que sur les activités dont le niveau courant correspond à votre habilitation, et l'application bloque toute décision hors de ce niveau.",
      "Votre périmètre se limite à votre organisation : vous ne voyez pas l'inventaire global des activités, réservé aux profils disposant d'admin:manage."
    ]
  },
  {
    "roleKey": "director_general",
    "tagline": "Piloter, contrôler et valider la gouvernance des activités à l'échelle de son périmètre, et en rendre compte par des rapports institutionnels.",
    "intro": "Le Directeur Général est un responsable de haut niveau du périmètre Gouvernance. Il dispose d'une vue d'ensemble en consultation sur l'organigramme, les comptes utilisateurs, les formulaires et les activités de son organisation. Sa mission opérationnelle principale est de valider hiérarchiquement les activités qui remontent jusqu'à lui dans le circuit de validation, puis de produire et d'exporter des rapports institutionnels consolidés. Il consulte également le référentiel réglementaire EduLex et suit les contenus de formation EduLex Academy, sans pouvoir y créer ni y modifier de contenu.",
    "access": [
      {
        "module": "Tableau de bord (/dashboard et Accueil /)",
        "what": "Consultation de la vue d'ensemble personnalisée : KPI de gouvernance (activités saisies, validées, en attente de validation, rapports générés ; textes EduLex disponibles et à vérifier, parcours Academy publiés, taux de validation), graphique « Évolution des activités » sur 6 mois, donut « Répartition par statut », feed des activités récentes, carte « EduLex — récents » et programme de parrainage. Le périmètre des données suit le filtre Pays de la barre supérieure. Le bouton « Nouvelle activité » est affiché et mène vers /activities/new, mais faute de la permission activity:create, vous ne pouvez pas y enregistrer d'activité."
      },
      {
        "module": "Accueil (page d'accueil publique) (/)",
        "what": "Page vitrine publique accessible librement ; pour un utilisateur connecté, l'entrée « Accueil » de la navigation latérale renvoie vers le tableau de bord interne."
      },
      {
        "module": "Rendez-vous (/rendez-vous)",
        "what": "Gestion complète de votre agenda personnel : créer, modifier, supprimer vos propres rendez-vous, les marquer faits ou non faits, définir un rappel (5 min / 1 h / 1 jour avant) et des notes. Chaque utilisateur ne voit que ses propres RDV."
      },
      {
        "module": "Bilan & synthèse (/bilan)",
        "what": "Consulter votre synthèse personnelle (rendez-vous honorés et activités validées) sur la période choisie (Semaine, Quinzaine, Mois), avec taux de réalisation, et l'exporter en PDF."
      },
      {
        "module": "Évaluation (/evaluation)",
        "what": "Consulter votre score de productivité personnel (0–100), sa tendance hebdomadaire et l'évolution sur 4 semaines, et générer vos « Conseils IA » à la demande."
      },
      {
        "module": "Distinctions & rappels à l'ordre (/distinctions)",
        "what": "Consulter votre propre distinction trimestrielle et celles de vos subordonnés (régularité du reporting, respect des seuils d'absence), avec le détail des critères par trimestre (T1–T4). En contexte Côte d'Ivoire, message en nouchi avec lecture audio."
      },
      {
        "module": "Mon profil (/account)",
        "what": "Consulter vos informations de compte (e-mail, organisation, pays) et vos rôles, changer votre photo de profil et choisir votre type de profil (Personnel, École, Entreprise, Association), qui adapte la terminologie de l'interface et la période de bilan par défaut."
      },
      {
        "module": "Organisation & structures (/organization)",
        "what": "Consultation seule (organization:read). Vous parcourez l'organigramme hiérarchique : ministères, organisations clientes et structures rattachées, avec pour chaque structure son type, son responsable, sa région et son nombre de membres. Le filtre Pays/subdivision de la barre supérieure restreint l'affichage (bandeau « Organigramme filtré »). Vous ne pouvez ni créer, ni modifier, ni déplacer, ni supprimer une organisation ou une structure."
      },
      {
        "module": "Utilisateurs (/users)",
        "what": "Consultation seule (user:read). Vous parcourez et recherchez la liste des comptes (initiales, e-mail, rôles, structure de rattachement, statut Actif/Inactif), limitée à votre organisation. Vous ne pouvez ni créer, ni modifier, ni importer, ni activer/désactiver, ni supprimer un compte, ni déléguer des droits."
      },
      {
        "module": "Formulaires d'activités (/forms)",
        "what": "Consultation seule (form:read). Vous visualisez les formulaires de saisie (titre, description, nombre de champs, version, statut Brouillon/Publié/Archivé) et leur composition. Vous ne pouvez ni créer, ni composer, ni publier, ni archiver, ni supprimer un formulaire."
      },
      {
        "module": "Activités (/activities)",
        "what": "Consultation (activity:read) et validation (activity:validate). Vous consultez la liste filtrable par statut (Toutes, Brouillon, Soumis, En examen, Validé, Rejeté, À corriger, Consolidé, Archivé) et par titre, ouvrez le détail d'une activité (textes EduLex associés, informations, « Historique de validation ») et téléchargez les pièces jointes. Sur l'encadré « Décision de validation », lorsque vous êtes habilité au niveau courant, vous pouvez « Valider », « Demander correction », « Rejeter » (commentaire obligatoire) et « Consolider » une activité validée. Ne disposant pas de activity:create/update/delete, vous ne créez, ne modifiez et ne supprimez pas d'activité."
      },
      {
        "module": "Validation hiérarchique (/validation)",
        "what": "Accès à la file d'attente des activités à statuer (statuts Soumis, En examen, À corriger), avec compteurs « En attente de décision » et « Validées (organisation) », bandeau « Circuit de validation » et mention « · à vous » aux niveaux où vous êtes habilité. Vous cliquez « Examiner » pour ouvrir l'activité et statuer. Grâce à activity:validate, vous pouvez statuer et pas seulement consulter."
      },
      {
        "module": "Autorisations d'absence (/absences)",
        "what": "Accès régi par le lien hiérarchique, sans clé de permission dédiée. Vous demandez une absence pour vous-même (si un supérieur hiérarchique vous est défini) ; en tant que supérieur de vos agents, vous validez ou refusez leurs demandes, pouvez comptabiliser directement une absence (validée d'office), régler la politique d'absences de vos agents (congé réglementaire et seuil d'alerte), et suivez les cumuls par agent et par motif."
      },
      {
        "module": "Reporting institutionnel (/reports)",
        "what": "Création (report:create), consultation (report:read) et export (report:export). Vous générez un rapport consolidé (titre, périodicité, périmètre Pays/Organisation/Structure, période) à partir des activités au statut Validé/Consolidé, le consultez en détail (indicateurs, activités réalisées, références EduLex), et l'imprimez/exportez. Ne disposant pas de report:manage, la suppression d'un rapport ne vous est pas ouverte."
      },
      {
        "module": "EduLex — référentiel réglementaire (/edulex)",
        "what": "Consultation seule (edulex:read). Vous consultez les 4 KPI (Textes au total, En vigueur, À vérifier, Certifiés V4), recherchez par mot-clé, filtrez par Catégorie/Statut/Type/Niveau et ouvrez les fiches de texte. Les boutons « Déposer un texte », « File de validation » et les liens de référentiel (Pays, Ministères, Secteurs, Import d'amorçage) ne vous sont pas accessibles, faute de edulex:create/validate/manage."
      },
      {
        "module": "Fiche d'un texte EduLex (/edulex/texts/[id])",
        "what": "Consultation seule (edulex:read). Vous lisez les métadonnées, badges (type, statut, niveau V0–V4, confidentialité Public/Restreint/Confidentiel), relations entre textes, historique des versions et journal de validation, et téléchargez les documents (PDF, Markdown, source officielle). Vous ne disposez ni du panneau de validation V0→V4, ni de la publication, ni du téléversement de source."
      },
      {
        "module": "EduLex Academy (/academy)",
        "what": "Consultation et apprentissage (academy:read). Vous accédez au hero (XP, série, niveau), aux 5 niveaux de compétence, aux catégories et aux parcours disponibles. Les boutons de génération des modules d'évaluation (réservés à academy:manage) ne vous sont pas proposés."
      },
      {
        "module": "Parcours Academy (/academy/path/[id])",
        "what": "Consultation du détail d'un parcours (unités numérotées, leçons, prérequis) et ouverture des leçons (academy:read)."
      },
      {
        "module": "Leçon Academy — quiz (/academy/lesson/[id])",
        "what": "Suivi des quiz interactifs : répondre aux questions, lire le feedback relié au texte EduLex source, gagner des XP et suivre votre progression (academy:read)."
      },
      {
        "module": "Ma progression (Academy) (/academy/progress)",
        "what": "Consultation de votre tableau de bord d'apprenant : XP cumulés, niveau, série, avancement des parcours, badges et textes EduLex à revoir (academy:read)."
      },
      {
        "module": "Badges & trophées (Academy) (/academy/badges)",
        "what": "Consultation de la galerie des badges, obtenus (avec date) ou « À débloquer » (academy:read)."
      },
      {
        "module": "Classement citoyen (Academy) (/academy/leaderboard)",
        "what": "Consultation du classement des apprenants par XP et niveau, avec repérage de votre propre ligne « (vous) » (academy:read)."
      },
      {
        "module": "Notifications (/notifications)",
        "what": "Centre de notifications in-app : lister vos 50 dernières notifications (échéances, validations, publications EduLex, défis Academy, seuils d'absence), les marquer lues et suivre leurs liens, ou « Tout marquer comme lu »."
      },
      {
        "module": "Paramètres (/parametres)",
        "what": "Régler vos préférences personnelles : période de bilan par défaut et activation des rappels de rendez-vous."
      },
      {
        "module": "Mot de passe oublié / Réinitialiser le mot de passe",
        "what": "Pages d'auto-dépannage de connexion accessibles à tout utilisateur : demander un lien de réinitialisation par e-mail (valable 1 heure, usage unique) et définir un nouveau mot de passe à partir du lien reçu."
      }
    ],
    "workflows": [
      {
        "title": "Valider une activité qui remonte jusqu'à vous dans le circuit",
        "steps": [
          "Ouvrez « Validation hiérarchique » (/validation) depuis la navigation latérale.",
          "Repérez dans la file les entrées portant la mention « · à vous » : ce sont les activités dont le niveau courant correspond à votre habilitation.",
          "Cliquez sur « Examiner » pour ouvrir le détail de l'activité (/activities/[id]).",
          "Vérifiez le titre, l'auteur, la structure, la période, les pièces jointes et les textes EduLex associés, ainsi que l'« Historique de validation ».",
          "Dans l'encadré « Décision de validation », contrôlez le niveau indiqué (« Niveau X/Y · nom »).",
          "Cliquez sur « Valider » pour faire progresser l'activité au niveau suivant du circuit."
        ]
      },
      {
        "title": "Demander une correction ou rejeter une activité",
        "steps": [
          "Depuis « Validation hiérarchique » (/validation) ou « Activités » (/activities), ouvrez l'activité concernée et son encadré « Décision de validation ».",
          "Si le contenu doit être corrigé par l'auteur, cliquez sur « Demander correction » ; pour un refus, cliquez sur « Rejeter ».",
          "Saisissez le commentaire (obligatoire pour le rejet comme pour la demande de correction) en expliquant précisément le motif.",
          "Confirmez la décision : l'activité repart vers l'auteur avec votre commentaire, tracé dans l'« Historique de validation »."
        ]
      },
      {
        "title": "Consolider une activité validée",
        "steps": [
          "Ouvrez « Activités » (/activities) et filtrez sur le statut « Validé ».",
          "Sélectionnez l'activité à intégrer aux bilans et ouvrez son détail.",
          "Dans l'encadré « Décision de validation », cliquez sur « Consolider ».",
          "Vérifiez dans l'« Historique de validation » que l'étape de consolidation est bien enregistrée : l'activité (statut Consolidé) devient disponible pour l'agrégation dans les rapports."
        ]
      },
      {
        "title": "Générer un rapport institutionnel consolidé",
        "steps": [
          "Ouvrez « Reporting institutionnel » (/reports) puis cliquez sur « Générer un rapport » (/reports/new).",
          "Renseignez le Titre et choisissez la Périodicité (Hebdomadaire, Mensuel, Trimestriel, Semestriel, Annuel ou Personnalisé).",
          "Définissez le périmètre (Pays / Organisation / Structure) et la période De/À.",
          "Lancez la génération : la plateforme agrège les activités au statut Validé/Consolidé en indicateurs (total, répartition par statut) et recense les références EduLex citées.",
          "Ouvrez le rapport (/reports/[id]) pour vérifier la page de garde, les indicateurs et le tableau « Activités réalisées »."
        ]
      },
      {
        "title": "Exporter ou imprimer un rapport",
        "steps": [
          "Dans « Reporting institutionnel » (/reports), ouvrez le rapport voulu (/reports/[id]).",
          "Contrôlez le périmètre, les indicateurs « Activités consolidées » et la liste des « Références réglementaires EduLex ».",
          "Cliquez sur le bouton d'impression (« PrintButton ») pour imprimer ou exporter le rapport en vue de sa diffusion."
        ]
      },
      {
        "title": "Valider ou refuser une demande d'absence d'un de vos agents",
        "steps": [
          "Ouvrez « Autorisations d'absence » (/absences) ; le tableau de bord vous signale aussi un badge « N à valider » avec le lien « Traiter → ».",
          "Dans la carte « Demandes à valider », repérez la demande de l'agent (motif, dates, nombre de jours, note).",
          "Cliquez sur « Approuver » pour la comptabiliser, ou sur « Refuser ».",
          "En cas de refus, saisissez le « Motif du refus » (facultatif) puis cliquez sur « Confirmer le refus » ; l'agent est notifié de la décision."
        ]
      },
      {
        "title": "Suivre la gouvernance depuis le tableau de bord avec le filtre Pays",
        "steps": [
          "Ouvrez le tableau de bord (/dashboard).",
          "Dans la barre supérieure, sélectionnez le Pays souhaité pour restreindre le périmètre des données (sinon « tous les pays »).",
          "Lisez les KPI (activités saisies, validées, en attente de validation, rapports générés ; taux de validation) et le graphique « Évolution des activités ».",
          "Cliquez « Tout voir » sous « Activités récentes » pour basculer vers /activities, ou ouvrez un texte de la carte « EduLex — récents » pour le consulter."
        ]
      }
    ],
    "tips": [
      "Utilisez le filtre Pays de la barre supérieure avant de générer un rapport ou de consulter l'organigramme : tous les KPI, listes et agrégats suivent ce périmètre.",
      "Avant de générer un rapport, consolidez les activités validées concernées : seules les activités au statut Validé/Consolidé sont agrégées dans les indicateurs.",
      "Sur l'encadré « Décision de validation », vérifiez toujours le niveau affiché (« Niveau X/Y ») : vous ne pouvez statuer que si vous êtes habilité au niveau courant.",
      "Appuyez-vous sur le bandeau « Circuit de validation » de la file (/validation) pour situer votre niveau dans l'enchaînement des rôles avant de statuer.",
      "Motivez systématiquement vos décisions de « Demander correction » et de « Rejeter » : le commentaire est obligatoire et reste tracé dans l'historique pour l'auteur et les niveaux suivants.",
      "Consultez régulièrement le Centre de notifications (/notifications) : il vous alerte des activités à valider, des demandes d'absence et des franchissements de seuil.",
      "Surveillez la carte « Distinctions » de vos subordonnés pour repérer les agents dont la régularité de reporting est à redresser.",
      "Le badge « N à valider » sur le tableau de bord et le lien « Traiter → » vous mènent rapidement aux demandes d'absence en attente."
    ],
    "limits": [
      "Vous ne pouvez pas créer, modifier ni supprimer d'activité : la saisie (activity:create), la mise à jour (activity:update) et la suppression (activity:delete) relèvent des agents et des rôles dotés de ces droits ; votre rôle se limite à consulter et à statuer.",
      "Vous ne pouvez pas gérer l'organigramme : créer une organisation ou une structure, les déplacer par glisser-déposer, les modifier ou les supprimer exige organization:manage, que vous n'avez pas (consultation seule).",
      "Vous ne pouvez pas gérer les comptes utilisateurs : créer, modifier, importer, activer/désactiver, réinitialiser un mot de passe, supprimer ou déléguer des droits relèvent de user:manage.",
      "Vous ne pouvez pas concevoir de formulaires : créer, composer, publier, archiver ou supprimer un formulaire exige form:manage (vous ne faites que consulter).",
      "Vous ne pouvez pas supprimer un rapport : cette action requiert report:manage, qui ne vous est pas attribué.",
      "Vous ne pouvez pas alimenter ni faire évoluer le référentiel EduLex : déposer un texte, le faire progresser de V0 à V4, le publier, l'importer ou gérer les pays, ministères et secteurs requièrent edulex:create/validate/publish/manage. Votre accès est en lecture seule.",
      "Vous ne pouvez pas administrer EduLex Academy : générer les modules d'évaluation ou créer/gérer les questions de quiz exige academy:manage ; vous accédez aux parcours en tant qu'apprenant uniquement.",
      "Vous n'avez pas accès aux espaces d'administration et d'archives (/admin, /archives) ni à l'édition de la hiérarchie de validation : ces fonctions requièrent admin:read/manage ou organization:manage."
    ]
  },
  {
    "roleKey": "director",
    "tagline": "Le Directeur supervise, valide et consolide les activités des agents de sa structure, puis génère les rapports institutionnels, en s'appuyant sur le référentiel EduLex en consultation.",
    "intro": "Le Directeur est un responsable hiérarchique du domaine Gouvernance. Son rôle central est de statuer sur les activités et contributions des agents de son organisation : il les consulte, peut les modifier et surtout les valider, demander leur correction, les rejeter ou les consolider dans la chaîne de validation. Il génère et consulte les rapports institutionnels consolidés. Il dispose par ailleurs d'un accès en lecture au référentiel réglementaire EduLex et à EduLex Academy, afin de se tenir informé du cadre légal et des contenus de formation. Son périmètre de données est généralement limité à son organisation et au pays sélectionné dans la barre supérieure. À noter : le Directeur ne crée pas lui-même d'activités (cette action relève de la permission activity:create, qui ne lui est pas attribuée).",
    "access": [
      {
        "module": "Tableau de bord (/dashboard et Accueil /)",
        "what": "Consulter sa vue d'ensemble personnalisée : KPI de gouvernance (Activités saisies, Activités validées, En attente de validation, Rapports générés, Textes EduLex disponibles, Textes à vérifier, Parcours Academy publiés, Taux de validation), graphique « Évolution des activités » sur 6 mois et donut « Répartition par statut », feed des activités récentes, carte « EduLex — récents », ses demandes d'absence et son programme de parrainage. Si le Directeur est supérieur hiérarchique, il voit le badge « N à valider » et le lien « Traiter → » vers les absences. Le périmètre suit le filtre Pays de la barre supérieure."
      },
      {
        "module": "Accueil public (/)",
        "what": "Consulter la page vitrine marketing de la plateforme (piliers Gouvernance, EduLex, Academy). Une fois connecté, l'entrée « Accueil » de la navigation latérale mène au tableau de bord interne."
      },
      {
        "module": "Rendez-vous (/rendez-vous)",
        "what": "Gérer son agenda personnel : ajouter, modifier et supprimer ses rendez-vous, définir un rappel (5 min / 1 h / 1 jour avant), marquer un RDV fait ou non fait. Chaque utilisateur ne voit que ses propres rendez-vous."
      },
      {
        "module": "Bilan & synthèse (/bilan)",
        "what": "Consulter la synthèse personnelle de ses rendez-vous honorés et activités validées sur la période choisie (Semaine / Quinzaine / Mois), avec taux de réalisation, et l'exporter en PDF."
      },
      {
        "module": "Évaluation (/evaluation)",
        "what": "Consulter son score de productivité personnel (0–100), sa tendance sur 4 semaines, et obtenir à la demande des « Conseils IA » personnalisés."
      },
      {
        "module": "Distinctions & rappels à l'ordre (/distinctions)",
        "what": "Consulter sa propre distinction trimestrielle et, en tant que supérieur, celles de ses subordonnés (régularité du reporting, seuils d'absence), avec messages adaptés et lecture audio si le pays Côte d'Ivoire est sélectionné."
      },
      {
        "module": "Mon profil (/account)",
        "what": "Consulter ses informations de compte et ses rôles, changer sa photo de profil, et choisir son type de profil (Personnel / École / Entreprise / Association) qui adapte la terminologie de l'interface et la période de bilan par défaut."
      },
      {
        "module": "Formulaires d'activités (/forms)",
        "what": "Consulter en lecture seule les formulaires de saisie : titre, description, nombre de champs, version et statut (Brouillon, Publié, Archivé). Le Directeur ne peut ni créer, ni composer, ni publier, ni archiver, ni supprimer de formulaire (form:read uniquement)."
      },
      {
        "module": "Activités (/activities)",
        "what": "Consulter les activités de son périmètre (organisation), filtrer par statut (Toutes, Brouillon, Soumis, En examen, Validé, Rejeté, À corriger, Consolidé, Archivé) et rechercher par titre ; modifier une activité, y compris celle d'un autre agent (activity:update) ; consulter le détail, les pièces jointes, les textes EduLex associés et l'« Historique de validation » ; et statuer en tant que validateur via l'encadré « Décision de validation » : « Valider », « Demander correction », « Rejeter » (commentaire obligatoire pour rejet/correction) et « Consolider » une activité validée, dans la limite du niveau auquel il est habilité. Le Directeur ne crée pas d'activités (activity:create non attribué) et ne peut pas supprimer celle d'un autre agent (activity:delete non attribué)."
      },
      {
        "module": "Validation hiérarchique (/validation)",
        "what": "Consulter la file d'attente des activités à statuer (Soumis, En examen, À corriger) avec le niveau courant et le repère « · à vous », voir le bandeau « Circuit de validation », et cliquer « Examiner » pour ouvrir l'activité et statuer. Le Directeur disposant de la permission activity:validate, il peut décider et pas seulement consulter."
      },
      {
        "module": "Autorisations d'absence (/absences)",
        "what": "L'accès ne dépend d'aucune clé de permission dédiée mais du lien hiérarchique. Le Directeur peut demander une absence pour lui-même s'il a un supérieur hiérarchique défini. En tant que supérieur de ses agents, il peut approuver ou refuser leurs demandes, comptabiliser directement une absence validée d'office, régler la « Politique d'absences » (congé annuel réglementaire, seuil d'alerte) et consulter le suivi par agent (cumul sur quota, alertes « Seuil atteint » / « Quota dépassé »)."
      },
      {
        "module": "Reporting institutionnel (/reports)",
        "what": "Générer un rapport consolidé via « Générer un rapport » (Titre, Périodicité, périmètre Pays/Organisation/Structure, période De/À), consulter un rapport (page de garde, indicateurs, tableau « Activités réalisées », « Références réglementaires EduLex ») et l'imprimer. Le Directeur peut créer et consulter les rapports (report:create, report:read) ; sans report:manage ni report:export, il ne dispose pas des droits de gestion/suppression. Le périmètre est limité à son organisation."
      },
      {
        "module": "EduLex — référentiel réglementaire (/edulex)",
        "what": "Consulter le référentiel : les 4 KPI (Textes au total, En vigueur, À vérifier, Certifiés V4), rechercher par mot-clé, filtrer par Catégorie / Statut / Type / Niveau, et ouvrir la fiche d'un texte. Accès en lecture seule (edulex:read) : pas de dépôt de texte, pas de file de validation, pas de référentiels Pays / Ministères / Secteurs en écriture."
      },
      {
        "module": "Fiche d'un texte EduLex (/edulex/texts/[id])",
        "what": "Consulter une fiche : badges Type / Statut / Niveau de vérification (V0→V4) / Confidentialité, avertissements (« niveau V0 : entrée non vérifiée », « texte non en vigueur »), télécharger (PDF, Markdown), consulter la source officielle, voir les relations entre textes, l'« Historique des versions », le « Journal de validation » et la traçabilité « Déposé par » / « Validé par ». Le panneau de validation V0→V4 et de changement de statut n'est pas accessible (lecture seule)."
      },
      {
        "module": "EduLex Academy (/academy)",
        "what": "Accéder à l'espace de formation citoyenne : voir son XP, sa série et son niveau, les accès rapides (Ma progression, Badges & trophées, Classement), les 5 niveaux de compétence (Découverte, Compréhension, Application, Maîtrise, Expert / Référent), filtrer par catégories et ouvrir les parcours disponibles. Le Directeur ne dispose pas des boutons de génération des modules d'évaluation (réservés à academy:manage)."
      },
      {
        "module": "Parcours Academy (/academy/path/[id])",
        "what": "Consulter le détail d'un parcours : ses unités numérotées, leurs marqueurs de prérequis et l'accès aux leçons et quiz."
      },
      {
        "module": "Leçon Academy / quiz (/academy/lesson/[id])",
        "what": "Suivre les quiz interactifs d'une leçon : répondre aux questions, lire le feedback relié au texte EduLex source, gagner des XP et terminer la leçon."
      },
      {
        "module": "Ma progression Academy (/academy/progress)",
        "what": "Consulter son tableau de bord d'apprenant : XP cumulés, niveau, série, avancement des parcours, badges et « Textes à revoir »."
      },
      {
        "module": "Badges & trophées Academy (/academy/badges)",
        "what": "Consulter la galerie des badges (obtenus avec date ou « À débloquer ») et son ratio d'obtention."
      },
      {
        "module": "Classement citoyen Academy (/academy/leaderboard)",
        "what": "Consulter le classement des apprenants par XP et niveau, et repérer sa propre ligne « (vous) »."
      },
      {
        "module": "Notifications (/notifications)",
        "what": "Consulter ses 50 dernières notifications (échéances, validations, publications EduLex, défis Academy, seuils d'absence), les marquer lues une à une ou « Tout marquer comme lu », et suivre leurs liens."
      },
      {
        "module": "Paramètres (/parametres)",
        "what": "Régler ses préférences personnelles : période de bilan par défaut et activation des rappels de rendez-vous."
      },
      {
        "module": "Mot de passe oublié / Réinitialiser le mot de passe",
        "what": "Utiliser l'auto-dépannage de connexion : demander un lien de réinitialisation par e-mail (valable 1 heure) et définir un nouveau mot de passe (min. 8 caractères)."
      }
    ],
    "workflows": [
      {
        "title": "Valider une activité soumise par un agent",
        "steps": [
          "Ouvrez « Validation hiérarchique » (/validation) dans la navigation, ou le module « Activités » filtré sur le statut « Soumis ».",
          "Repérez dans la file une activité portant la mention « · à vous » sur le niveau courant, puis cliquez « Examiner ».",
          "Sur la fiche de l'activité, lisez le détail : description, structure, période, pièces jointes et textes EduLex associés, ainsi que l'« Historique de validation ».",
          "Dans l'encadré « Décision de validation », vérifiez l'indication « Niveau X/Y · nom » pour confirmer que vous êtes habilité à statuer.",
          "Cliquez « Valider » pour faire avancer l'activité au niveau suivant du circuit.",
          "Vérifiez que l'« Historique de validation » enregistre bien votre décision."
        ]
      },
      {
        "title": "Demander une correction ou rejeter une activité",
        "steps": [
          "Ouvrez l'activité concernée depuis la file de validation ou le module « Activités ».",
          "Dans l'encadré « Décision de validation », choisissez « Demander correction » si l'activité est incomplète, ou « Rejeter » si elle n'est pas recevable.",
          "Saisissez le commentaire (obligatoire pour la demande de correction comme pour le rejet) en expliquant clairement ce qui doit être corrigé.",
          "Confirmez la décision : l'activité repasse au statut « À corriger » (ou « Rejeté ») et l'auteur est informé via ses notifications.",
          "Suivez le retour de l'agent et reprenez la validation une fois l'activité re-soumise."
        ]
      },
      {
        "title": "Consolider une activité validée",
        "steps": [
          "Ouvrez une activité déjà au statut « Validé » depuis le module « Activités ».",
          "Dans l'encadré « Décision de validation », cliquez « Consolider ».",
          "Vérifiez que le statut passe à « Consolidé » : l'activité devient alors éligible à l'agrégation dans les rapports institutionnels.",
          "Au besoin, retrouvez les éléments consolidés via le module « Activités » filtré sur « Consolidé », ou via les « Archives » (colonne Activités, statut Consolidé/Archivé) si vous y avez accès."
        ]
      },
      {
        "title": "Générer un rapport institutionnel consolidé",
        "steps": [
          "Ouvrez le module « Reporting institutionnel » (/reports) puis cliquez « Générer un rapport ».",
          "Renseignez le Titre, puis choisissez la Périodicité (Hebdomadaire, Mensuel, Trimestriel, Semestriel, Annuel ou Personnalisé).",
          "Définissez le périmètre (Pays / Organisation / Structure) et la période De/À.",
          "Lancez la génération : la plateforme agrège les activités au statut Validé / Consolidé en indicateurs (total, répartition par statut) et liste les références EduLex citées.",
          "Ouvrez le rapport généré pour vérifier la page de garde, les indicateurs « Activités consolidées » et le tableau « Activités réalisées ».",
          "Imprimez le rapport via le bouton d'impression."
        ]
      },
      {
        "title": "Approuver ou refuser une demande d'absence d'un agent",
        "steps": [
          "Ouvrez le module « Autorisations d'absence » (/absences), ou suivez le lien « Traiter → » depuis le tableau de bord si un badge « N à valider » est affiché.",
          "Dans la carte « Demandes à valider », examinez chaque demande : agent, motif, dates et nombre de jours.",
          "Cliquez « Approuver » pour l'accepter, ou « Refuser » puis saisissez le « Motif du refus » (facultatif) et cliquez « Confirmer le refus ».",
          "Au besoin, ajustez la « Politique d'absences » (Congé annuel réglementaire, Seuil d'alerte) via le bouton « Modifier ».",
          "Surveillez les alertes « Seuil atteint » et « Quota dépassé » dans le suivi par agent pour anticiper les dépassements."
        ]
      },
      {
        "title": "Comptabiliser directement une absence pour un agent",
        "steps": [
          "Dans « Autorisations d'absence » (/absences), ouvrez « Comptabiliser directement (validée d'office) » puis « Ajouter ».",
          "Sélectionnez l'Agent concerné et le Motif (Affaires personnelles, Congé réglementaire, Formation, Raison médicale ou Force majeure institutionnelle).",
          "Renseignez les dates Du / Au ; le nombre de jours est calculé automatiquement.",
          "Cliquez « Enregistrer » : l'absence est comptabilisée immédiatement (validée d'office), sans circuit de demande.",
          "Vérifiez le cumul de l'agent sur son quota et les éventuelles alertes de franchissement de seuil."
        ]
      },
      {
        "title": "Consulter un texte EduLex lié à une activité",
        "steps": [
          "Ouvrez le module « EduLex » (/edulex), ou cliquez directement sur un texte associé depuis la fiche d'une activité.",
          "Recherchez le texte par mot-clé (titre, code, numéro officiel, résumé, tags) ou filtrez par Catégorie / Statut / Type / Niveau.",
          "Ouvrez la fiche du texte et vérifiez ses badges (Type, Statut, Niveau de vérification V0→V4, Confidentialité).",
          "Tenez compte des avertissements éventuels (« niveau V0 : entrée non vérifiée », « texte non en vigueur ») avant de vous appuyer sur ce texte.",
          "Téléchargez le PDF ou le Markdown, ou consultez la source officielle pour disposer du document de référence."
        ]
      }
    ],
    "tips": [
      "Travaillez par lot depuis « Validation hiérarchique » : la mention « · à vous » identifie d'un coup d'œil les activités où vous êtes effectivement habilité à statuer.",
      "Pour un rejet ou une demande de correction, rédigez un commentaire précis et actionnable : l'agent ne dispose que de votre note pour corriger sa contribution.",
      "Avant de générer un rapport, pensez à consolider les activités validées concernées : seules les activités au statut Validé / Consolidé sont agrégées.",
      "Utilisez le filtre Pays de la barre supérieure pour cadrer le périmètre de vos KPI, de vos activités et de vos rapports.",
      "Vérifiez le niveau de vérification d'un texte EduLex (V0 à V4) avant de l'utiliser comme référence : un texte au niveau V0 n'est pas vérifié.",
      "Consultez votre « Évaluation » et vos « Distinctions » pour suivre la régularité de votre reporting et celle de vos subordonnés.",
      "Renseignez un supérieur hiérarchique sur votre fiche si vous devez vous-même soumettre une demande d'absence."
    ],
    "limits": [
      "Vous ne créez pas d'activités : l'action « Nouvelle activité » relève de la permission activity:create, qui ne vous est pas attribuée. Vous pouvez en revanche modifier l'activité d'un autre agent (activity:update) et statuer dessus.",
      "Vous ne pouvez pas supprimer une activité d'un autre agent (activity:delete non attribué).",
      "Vous ne pouvez pas créer, composer, publier, archiver ni supprimer de formulaire de saisie : le module « Formulaires » est en lecture seule pour vous (form:read, pas form:manage).",
      "Vous ne pouvez pas déposer, modifier, valider, publier, importer ni archiver de texte EduLex, ni gérer les référentiels Pays / Ministères / Secteurs : votre accès EduLex est strictement en consultation (edulex:read).",
      "Vous ne pouvez pas faire progresser un texte dans le circuit V0→V4 : le panneau de validation EduLex et la file de validation EduLex vous sont fermés.",
      "Vous ne gérez pas les contenus Academy : pas de génération de modules d'évaluation, pas de création ou d'édition de questions de quiz, pas d'administration Academy (réservés à academy:manage).",
      "Vous ne gérez pas les comptes utilisateurs ni l'organigramme : création/modification d'utilisateurs, délégation de droits, organisations et structures sont hors de votre périmètre (user:manage / organization:manage requis).",
      "Vous ne disposez pas des droits de gestion ou de suppression des rapports, ni d'un export dédié, au-delà de la génération et de la consultation/impression (report:manage et report:export non attribués).",
      "Vous n'avez pas accès à l'espace d'administration de la plateforme, aux journaux d'audit ni à l'éditeur de la hiérarchie de validation (admin:read / admin:manage), et votre périmètre de données reste limité à votre organisation."
    ]
  },
  {
    "roleKey": "deputy_director",
    "tagline": "Piloter, modifier et valider les activités de gouvernance de sa structure, en s'appuyant sur le référentiel EduLex et la formation citoyenne.",
    "intro": "Le Sous-Directeur est un cadre de l'encadrement intermédiaire de la chaîne de gouvernance administrative. Il saisit et fait progresser les activités de sa structure, intervient dans le circuit de validation hiérarchique pour statuer sur les contributions qui lui sont soumises, et veille à la cohérence du reporting institutionnel qu'il consulte. Son périmètre couvre la Gouvernance : il agit sur les activités (création, consultation, modification, validation), consulte les rapports consolidés, et dispose d'un accès en lecture au référentiel réglementaire EduLex et à EduLex Academy. Il ne gère ni les organisations, ni les comptes utilisateurs, ni les formulaires, et ne dépose ni ne valide ni ne publie de textes réglementaires.",
    "access": [
      {
        "module": "Tableau de bord (/dashboard et Accueil /)",
        "what": "Consulte sa vue d'ensemble personnalisée : les KPI de gouvernance (Activités saisies, Activités validées, En attente de validation, Rapports générés, Textes EduLex disponibles, Textes à vérifier, Parcours Academy publiés, Taux de validation), le graphique « Évolution des activités » et le donut de répartition par statut, le feed des activités récentes, la carte « EduLex — récents » et le programme de parrainage. La carte « Mes demandes d'absence » affiche ses dernières demandes ; en tant que supérieur, il y voit le badge « N à valider » et le lien « Traiter → » vers le module Absences. Le bouton « Nouvelle activité » (vers /activities/new) lui est accessible. Le périmètre des données suit le filtre Pays de la barre supérieure."
      },
      {
        "module": "Accueil (landing publique) (/)",
        "what": "Page vitrine publique accessible avant connexion ; une fois connecté, l'entrée « Accueil » de la navigation latérale le mène au tableau de bord interne."
      },
      {
        "module": "Rendez-vous (/rendez-vous)",
        "what": "Gère son agenda personnel : crée, modifie et supprime ses propres rendez-vous, les marque faits / non faits, renseigne lieu, rappel et notes. Il ne voit que ses propres rendez-vous."
      },
      {
        "module": "Bilan & synthèse (/bilan)",
        "what": "Consulte sa synthèse personnelle (rendez-vous honorés et activités validées) sur la période choisie (Semaine, Quinzaine, Mois), avec son taux de réalisation, et exporte le bilan en PDF."
      },
      {
        "module": "Évaluation (/evaluation)",
        "what": "Consulte son score de productivité personnel (0–100), sa tendance hebdomadaire et son évolution sur 4 semaines, et génère à la demande des « Conseils IA » personnalisés."
      },
      {
        "module": "Distinctions & rappels à l'ordre (/distinctions)",
        "what": "Consulte sa propre distinction trimestrielle et celles de ses subordonnés (régularité du reporting et respect des seuils d'absence), par année, avec messages adaptés à la Côte d'Ivoire lorsque le pays CI est sélectionné."
      },
      {
        "module": "Mon profil (/account)",
        "what": "Consulte et personnalise son compte : photo de profil, informations (e-mail, organisation, pays), badges de rôles, et choisit son type de profil (Personnel, École, Entreprise, Association) qui adapte la terminologie de l'interface et la période de bilan par défaut."
      },
      {
        "module": "Activités (/activities)",
        "what": "Cœur de son rôle. Crée des activités (« Nouvelle activité » : titre, description, structure, période, liaison à des textes EduLex), les modifie — y compris une activité dont il n'est pas l'auteur, grâce à activity:update, aux statuts Brouillon / À corriger / Rejeté —, joint des documents, soumet à validation, consulte le détail et l'« Historique de validation ». En tant que validateur (activity:validate), il statue via l'encadré « Décision de validation » : « Valider », « Demander correction », « Rejeter » (commentaire obligatoire pour rejet ou correction) et « Consolider » une activité validée, dans la limite du niveau auquel il est habilité. Il filtre par statut, recherche par titre et filtre par pays."
      },
      {
        "module": "Validation hiérarchique (/validation)",
        "what": "Consulte la file des activités à statuer (Soumis, En examen, À corriger), avec auteur, structure, date et niveau courant. Grâce à activity:validate, il ouvre chaque entrée via « Examiner » pour statuer sur la fiche de l'activité, et voit le bandeau récapitulant le circuit de validation ainsi que le repère « · à vous » aux niveaux dont il a la charge."
      },
      {
        "module": "Reporting institutionnel (/reports)",
        "what": "Consulte uniquement (report:read) les rapports consolidés : le tableau des rapports (titre, périodicité, auteur, date, statut) et la fiche d'un rapport (page de garde, indicateurs « Activités consolidées » et par statut, tableau des activités réalisées, références réglementaires EduLex). Il ne peut ni générer, ni exporter, ni supprimer de rapport."
      },
      {
        "module": "EduLex — référentiel réglementaire (/edulex)",
        "what": "Consulte uniquement (edulex:read) : les 4 KPI (Textes au total, En vigueur, À vérifier, Certifiés V4), la recherche par mot-clé et les filtres (Catégorie, Statut, Type, Niveau), et ouvre les fiches de textes. Les boutons « Déposer un texte », « File de validation » et les liens de référentiel (Pays, Ministères, Secteurs, Import d'amorçage) ne lui sont pas proposés."
      },
      {
        "module": "Fiche d'un texte EduLex (/edulex/texts/[id])",
        "what": "Consulte la fiche détaillée d'un texte : badges (Type, Statut, Niveau de vérification V0→V4, Confidentialité), avertissements (« niveau V0 : entrée non vérifiée », « n'est pas en vigueur »), relations entre textes, historique des versions et journal de validation. Il télécharge les documents (« Télécharger (PDF) », « Markdown », « Consulter la source officielle »). Il n'a accès ni au panneau de validation V0→V4, ni au téléversement de document source (réservés aux validateurs et éditeurs EduLex)."
      },
      {
        "module": "EduLex Academy (/academy)",
        "what": "Consulte l'espace de formation citoyenne (academy:read) : son XP, sa série et son niveau, les accès rapides (Ma progression, Badges & trophées, Classement), les 5 niveaux de compétence (Découverte, Compréhension, Application, Maîtrise, Expert / Référent), les catégories et les parcours disponibles. Les boutons de génération de modules d'évaluation (réservés à academy:manage) ne lui sont pas proposés."
      },
      {
        "module": "Parcours Academy (/academy/path/[id])",
        "what": "Consulte un parcours : son en-tête, ses unités numérotées, les marqueurs de prérequis, et ouvre les leçons."
      },
      {
        "module": "Leçon Academy / quiz (/academy/lesson/[id])",
        "what": "Répond aux quiz interactifs (QCU, QCM, Vrai / Faux), lit le feedback pédagogique relié au texte EduLex source, gagne des XP et termine la leçon."
      },
      {
        "module": "Ma progression (Academy) (/academy/progress)",
        "what": "Consulte son tableau de bord d'apprenant : XP cumulés, niveau, série, avancement des parcours, badges obtenus et textes EduLex recommandés à revoir."
      },
      {
        "module": "Badges & trophées (Academy) (/academy/badges)",
        "what": "Consulte la galerie de badges : ceux obtenus (avec date) et ceux encore à débloquer."
      },
      {
        "module": "Classement citoyen (Academy) (/academy/leaderboard)",
        "what": "Consulte le classement des apprenants par XP et niveau, et repère sa propre ligne « (vous) »."
      },
      {
        "module": "Notifications (/notifications)",
        "what": "Consulte ses 50 dernières notifications (échéances, validations, publications EduLex, défis Academy, seuils d'absence), et les marque lues individuellement ou via « Tout marquer comme lu »."
      },
      {
        "module": "Paramètres (/parametres)",
        "what": "Règle ses préférences personnelles : période de bilan par défaut et activation des rappels de rendez-vous, puis enregistre."
      },
      {
        "module": "Autorisations d'absence (/absences)",
        "what": "Module accessible sans clé de permission dédiée, selon le lien hiérarchique. Il demande une absence pour lui-même s'il a un supérieur hiérarchique défini ; et, en tant que supérieur de ses agents, il valide ou refuse leurs demandes, comptabilise une absence d'office et règle la politique d'absences de son périmètre."
      },
      {
        "module": "Mot de passe oublié / Réinitialiser le mot de passe",
        "what": "Pages d'auto-dépannage de connexion : il demande un lien de réinitialisation par e-mail puis définit un nouveau mot de passe."
      }
    ],
    "workflows": [
      {
        "title": "Créer et soumettre une nouvelle activité",
        "steps": [
          "Depuis le tableau de bord ou le module Activités, cliquez sur « Nouvelle activité » (page /activities/new).",
          "Renseignez le Titre, la description, la Structure et la Période (début / fin).",
          "Liez, le cas échéant, les textes EduLex pertinents à l'activité.",
          "Enregistrez : l'activité est créée au statut Brouillon.",
          "Sur la fiche de l'activité, cliquez « Joindre un document » pour ajouter les pièces justificatives (PDF, image, Word, Excel).",
          "Quand l'activité est complète, cliquez « Soumettre à validation » pour démarrer la chaîne de validation au premier niveau."
        ]
      },
      {
        "title": "Valider, corriger ou rejeter une activité qui vous est soumise",
        "steps": [
          "Ouvrez le module « Validation hiérarchique » (/validation) pour consulter la file des activités à statuer.",
          "Repérez les entrées portant le repère « · à vous » : ce sont celles dont vous avez la charge au niveau courant.",
          "Cliquez « Examiner » pour ouvrir le détail de l'activité.",
          "Dans l'encadré « Décision de validation », vérifiez le niveau courant indiqué (« Niveau X/Y · nom »).",
          "Choisissez « Valider » pour faire progresser l'activité, ou « Demander correction » / « Rejeter » en saisissant le commentaire obligatoire.",
          "Vérifiez ensuite l'« Historique de validation » de la fiche pour confirmer la prise en compte de votre décision."
        ]
      },
      {
        "title": "Consolider une activité validée",
        "steps": [
          "Dans le module Activités, filtrez par statut « Validé » pour repérer les activités prêtes à la consolidation.",
          "Ouvrez l'activité concernée.",
          "Dans l'encadré « Décision de validation », cliquez « Consolider ».",
          "Vérifiez dans l'« Historique de validation » que l'entrée « Consolidation » a bien été enregistrée."
        ]
      },
      {
        "title": "Modifier une activité à corriger ou rejetée",
        "steps": [
          "Dans le module Activités, filtrez par statut « À corriger » ou « Rejeté ».",
          "Ouvrez l'activité visée (y compris si elle a été saisie par un autre agent de votre périmètre, grâce à votre droit de modification activity:update).",
          "Cliquez « Modifier » (page /activities/[id]/edit) et apportez les corrections demandées dans le commentaire de validation.",
          "Ajustez si besoin les pièces jointes et la liaison aux textes EduLex.",
          "Enregistrez, puis cliquez « Soumettre à validation » pour relancer le circuit."
        ]
      },
      {
        "title": "Consulter un rapport institutionnel et ses références EduLex",
        "steps": [
          "Ouvrez le module « Reporting institutionnel » (/reports).",
          "Repérez le rapport voulu dans le tableau (titre, périodicité, auteur, date, statut).",
          "Cliquez sur le rapport pour ouvrir sa fiche (/reports/[id]).",
          "Lisez la page de garde (périmètre Pays / Organisation / Période) et les indicateurs « Activités consolidées » et par statut.",
          "Parcourez le tableau « Activités réalisées » puis la section « Références réglementaires EduLex ».",
          "Au besoin, ouvrez une référence EduLex citée pour en consulter la fiche détaillée."
        ]
      },
      {
        "title": "Vérifier un texte EduLex lié à une activité",
        "steps": [
          "Ouvrez le module EduLex (/edulex).",
          "Recherchez le texte par mot-clé (titre, code, numéro officiel, résumé, tags) ou affinez avec les filtres Catégorie, Statut, Type, Niveau.",
          "Ouvrez la fiche du texte via sa carte.",
          "Vérifiez les badges Type, Statut et Niveau de vérification (V0→V4), et tenez compte des avertissements éventuels (« niveau V0 : entrée non vérifiée », « n'est pas en vigueur »).",
          "Téléchargez le document si nécessaire (« Télécharger (PDF) », « Markdown ») ou consultez la source officielle.",
          "Reportez-vous à ce texte pour fiabiliser la liaison EduLex de vos activités."
        ]
      },
      {
        "title": "Demander une absence pour vous-même",
        "steps": [
          "Ouvrez le module « Autorisations d'absence » (/absences).",
          "Cliquez « Demander une absence » puis « Nouvelle demande ».",
          "Choisissez le Motif (Affaires personnelles, Congé réglementaire, Formation, Raison médicale, Force majeure institutionnelle) et renseignez les dates Du / Au (le nombre de jours se calcule automatiquement).",
          "Ajoutez une « Note au supérieur » si nécessaire.",
          "Cliquez « Envoyer au supérieur » (un supérieur hiérarchique doit être défini sur votre compte).",
          "Suivez le statut de la demande (En attente / Approuvée / Refusée) ; vous pouvez annuler votre propre demande tant qu'elle est En attente."
        ]
      },
      {
        "title": "Traiter une demande d'absence d'un de vos agents",
        "steps": [
          "Ouvrez le module « Autorisations d'absence » (/absences).",
          "Dans la carte « Demandes à valider », repérez la demande de l'agent (motif, dates, nombre de jours, note).",
          "Cliquez « Approuver », ou « Refuser » en renseignant le « Motif du refus » (facultatif) puis « Confirmer le refus ».",
          "Consultez le suivi par agent (cumul approuvé sur quota, pourcentage, alertes de seuil) pour situer la décision.",
          "Au besoin, réglez la « Politique d'absences » (congé annuel réglementaire, seuil d'alerte) via « Modifier »."
        ]
      }
    ],
    "tips": [
      "Avant de soumettre une activité, liez systématiquement les textes EduLex pertinents : ils alimentent la section « Références réglementaires EduLex » des rapports consolidés.",
      "Vérifiez le niveau du texte EduLex que vous citez : un texte en V0 est une entrée non vérifiée et un texte « pas en vigueur » est signalé par un avertissement ; privilégiez les textes en vigueur et certifiés V4.",
      "Utilisez le filtre Pays de la barre supérieure pour cadrer le périmètre de vos KPI, de vos activités et de la file de validation.",
      "Dans la file de validation, concentrez-vous d'abord sur les entrées marquées « · à vous » : ce sont celles que vous êtes habilité à traiter au niveau courant.",
      "En cas de rejet ou de demande de correction, rédigez un commentaire clair et actionnable : il guide l'agent dans la reprise de son activité.",
      "Suivez vos KPI « En attente de validation » et « Taux de validation » sur le tableau de bord pour éviter l'engorgement de la file.",
      "Maintenez la régularité de votre reporting : le module Distinctions évalue chaque trimestre la régularité (score ≥ 50 %) et le respect des seuils d'absence.",
      "Consultez le module Academy pour rester à jour sur les textes réglementaires : les quiz renvoient directement au texte EduLex source."
    ],
    "limits": [
      "Vous ne pouvez pas générer, exporter, gérer ni supprimer de rapport : le module Reporting vous est ouvert en consultation seule (report:read).",
      "Vous ne pouvez pas déposer, modifier, valider, publier, importer ni archiver de texte EduLex : votre accès au référentiel est en lecture seule (edulex:read) ; le panneau de validation V0→V4 et le téléversement de source ne vous sont pas proposés.",
      "Vous ne pouvez ni créer, ni modifier, ni administrer les contenus d'EduLex Academy (parcours, leçons, questions de quiz, génération de modules) : vous y êtes apprenant (academy:read).",
      "Vous ne pouvez pas gérer l'organigramme ni les structures : cela relève de organization:manage.",
      "Vous ne pouvez pas gérer les comptes utilisateurs (création, import, rôles, délégation de droits, supérieur hiérarchique) : cela relève de user:manage.",
      "Vous ne pouvez pas créer ni configurer de formulaires de saisie (form:manage).",
      "Vous ne pouvez pas supprimer l'activité d'un autre agent (activity:delete non détenu) ; votre droit porte sur la création, la consultation, la modification et la validation des activités.",
      "Sans la permission admin:manage, votre périmètre reste limité à votre organisation : vous ne voyez ni l'inventaire global des activités, ni les rapports hors de votre organisation, ni les Archives consolidées globales.",
      "Vous n'avez pas accès à l'espace d'Administration (/admin, éditeur de la hiérarchie de validation) ni à l'Administration Academy.",
      "Dans le module Absences, vous ne réglez la politique et ne validez / comptabilisez des absences que pour les agents dont vous êtes le supérieur hiérarchique défini ; vous ne pouvez pas valider votre propre demande."
    ]
  },
  {
    "roleKey": "agent",
    "tagline": "Saisir et faire avancer ses activités de gouvernance, en s'appuyant sur le référentiel EduLex et la formation Academy.",
    "intro": "Vous êtes Agent (contributeur) au sein du périmètre Gouvernance de la plateforme. Votre mission principale est de créer, documenter et tenir à jour les activités et contributions qui vous sont confiées, puis de les soumettre à votre supérieur pour validation hiérarchique. Vous travaillez d'abord sur vos propres données : vos activités, votre agenda, votre bilan et votre évaluation personnelle. La permission activity:update vous permet en outre de modifier une activité dont vous n'êtes pas l'auteur. Vous disposez par ailleurs d'un accès en consultation au référentiel réglementaire EduLex, aux formulaires de saisie et à l'espace de formation citoyenne EduLex Academy.",
    "access": [
      {
        "module": "Tableau de bord (/dashboard et Accueil /)",
        "what": "Vous consultez votre vue d'ensemble personnalisée à la connexion : vos 4 KPI d'activités (Activités saisies, Activités validées, En attente de validation, Rapports générés), les KPI EduLex et Academy en lecture, le graphique « Évolution des activités » et le donut « Répartition par statut », le feed « Activités récentes », la carte « EduLex — récents », votre carte « Programme de parrainage commercial » (code promo, lien d'invitation, boutons Copier et Partager) et votre carte « Mes demandes d'absence ». Le bouton « Nouvelle activité » vous amène directement à la création. Si vous encadrez des agents, un badge « N à valider » et un lien « Traiter → » vers /absences peuvent s'afficher. Le périmètre des données suit le filtre Pays de la barre supérieure."
      },
      {
        "module": "Accueil public (/)",
        "what": "Page vitrine accessible librement ; une fois connecté, l'entrée « Accueil » de la navigation latérale vous mène à votre tableau de bord interne."
      },
      {
        "module": "Activités (/activities)",
        "what": "C'est votre module central. Vous créez de nouvelles activités (« Nouvelle activité »), vous les modifiez tant qu'elles sont en Brouillon, À corriger ou Rejeté, vous les soumettez à validation, vous y joignez des pièces (PDF, image, Word, Excel) et téléchargez les pièces existantes, vous liez des textes EduLex, et vous consultez le détail ainsi que l'« Historique de validation ». Vous filtrez la liste par statut (Toutes, Brouillon, Soumis, En examen, Validé, Rejeté, À corriger, Consolidé, Archivé) et recherchez par titre. Par défaut vous ne voyez que vos propres activités. La permission activity:update vous autorise aussi à modifier une activité dont vous n'êtes pas l'auteur."
      },
      {
        "module": "Validation hiérarchique (/validation)",
        "what": "Vous pouvez consulter la file des activités et le bandeau « Circuit de validation » à titre informatif, mais sans la permission activity:validate vous ne pouvez pas statuer : l'avertissement « Vous pouvez consulter la file mais pas statuer » s'affiche. Vous suivez ainsi où en sont les activités dans le circuit."
      },
      {
        "module": "Formulaires d'activités (/forms)",
        "what": "Accès en consultation (form:read) : vous parcourez les formulaires de saisie disponibles et leurs cartes (titre, description, nombre de champs, version, statut Brouillon / Publié / Archivé), ce qui vous aide à comprendre les champs attendus lors de la saisie d'une activité. Vous ne pouvez ni créer ni modifier de formulaire."
      },
      {
        "module": "EduLex — référentiel réglementaire (/edulex)",
        "what": "Accès en lecture (edulex:read) : vous consultez les 4 KPI (Textes au total, En vigueur, À vérifier, Certifiés V4), recherchez par mot-clé, filtrez par Catégorie / Statut / Type / Niveau, et ouvrez la fiche de n'importe quel texte. Les boutons « Déposer un texte », « File de validation » et les liens de référentiel (Pays, Ministères, Secteurs, Import) ne vous sont pas proposés."
      },
      {
        "module": "Fiche d'un texte EduLex (/edulex/texts/[id])",
        "what": "En lecture : vous lisez les badges Type, Statut, Niveau de vérification (V0–V4) et Confidentialité (Public / Restreint / Confidentiel), les avertissements (texte V0 non vérifié, texte non en vigueur), vous téléchargez le PDF / Markdown ou consultez la source officielle, et vous consultez les relations entre textes (Remplace / Modifie / Abroge / Lié à / Cite), l'historique des versions, le journal de validation et la traçabilité « Déposé par » / « Validé par ». Le panneau de validation V0→V4 ne vous est pas accessible."
      },
      {
        "module": "EduLex Academy (/academy)",
        "what": "Accès apprenant (academy:read) : vous voyez votre XP, votre série et votre niveau, les 5 niveaux de compétence (Découverte, Compréhension, Application, Maîtrise, Expert / Référent), les catégories de parcours et les parcours disponibles, et vous lancez un parcours via « Commencer ». Les boutons de génération de modules d'évaluation (réservés à academy:manage) ne vous sont pas proposés."
      },
      {
        "module": "Parcours Academy (/academy/path/[id])",
        "what": "Vous parcourez les unités numérotées et leurs leçons, repérez les prérequis (cadenas) et ouvrez une leçon."
      },
      {
        "module": "Leçon Academy / quiz (/academy/lesson/[id])",
        "what": "Vous répondez aux questions (QCU, QCM, Vrai / Faux), lisez le feedback pédagogique relié au texte EduLex source, gagnez des XP et suivez votre progression jusqu'à « Terminer la leçon »."
      },
      {
        "module": "Ma progression (Academy) (/academy/progress)",
        "what": "Vous consultez vos XP cumulés, votre niveau, votre série, l'avancement de vos parcours, vos « Textes à revoir » recommandés et vos badges."
      },
      {
        "module": "Badges & trophées (Academy) (/academy/badges)",
        "what": "Vous consultez la galerie complète des badges, ceux obtenus (avec date) et ceux encore « À débloquer »."
      },
      {
        "module": "Classement citoyen (Academy) (/academy/leaderboard)",
        "what": "Vous consultez le top 50 des apprenants par XP et niveau et repérez votre propre ligne marquée « (vous) »."
      },
      {
        "module": "Rendez-vous (/rendez-vous)",
        "what": "Votre agenda personnel : vous créez, modifiez, supprimez et marquez « fait » vos rendez-vous (titre, date / heure, lieu, rappel, notes), et consultez les listes « À venir » et « Passés & faits ». Vous ne voyez que vos propres RDV."
      },
      {
        "module": "Bilan & synthèse (/bilan)",
        "what": "Vous consultez votre synthèse personnelle (RDV honorés et activités validées) sur la période choisie (Semaine / Quinzaine / Mois), votre taux de réalisation, et vous exportez le tout en PDF via « Exporter en PDF »."
      },
      {
        "module": "Évaluation (/evaluation)",
        "what": "Vous consultez votre score de productivité personnel /100, son libellé qualitatif, sa tendance, le graphique d'évolution sur 4 semaines, et vous générez vos « Conseils IA » personnalisés via le bouton « Obtenir mes conseils » (sous réserve que la fonctionnalité IA soit activée sur le serveur)."
      },
      {
        "module": "Distinctions & rappels à l'ordre (/distinctions)",
        "what": "Vous consultez votre propre distinction trimestrielle (bouclier ou émoticône larme), le détail des critères du trimestre (Régularité du reporting ≥ 50 %, Affaires personnelles < 20 %, Raison médicale < 40 % du congé annuel) et le message ivoirien avec lecture audio quand le pays CI est sélectionné. Si vous encadrez des agents, vous voyez aussi leurs distinctions."
      },
      {
        "module": "Autorisations d'absence (/absences)",
        "what": "L'accès ne dépend d'aucune permission dédiée mais du lien hiérarchique. En tant qu'agent disposant d'un supérieur (managerId), vous demandez une absence pour vous-même, suivez votre cumul approuvé sur quota, vos jours par motif, l'historique de vos demandes et leur statut (En attente / Approuvée / Refusée), et vous annulez votre propre demande tant qu'elle est En attente. Si vous êtes vous-même supérieur d'autres agents, vous pouvez valider, comptabiliser et régler la politique pour eux ; sinon ces actions ne vous sont pas proposées."
      },
      {
        "module": "Mon profil (/account)",
        "what": "Vous consultez vos informations (E-mail, Organisation, Pays), vos rôles, changez votre photo de profil et choisissez votre « Type de profil » (Personnel, École, Entreprise, Association), ce qui adapte la terminologie de l'interface — notamment le nom du module Activités — et la période de bilan par défaut."
      },
      {
        "module": "Notifications (/notifications)",
        "what": "Vous listez vos 50 dernières notifications (échéances, validations, décisions d'absence, défis Academy, seuils), les marquez lues une à une ou via « Tout marquer comme lu », et suivez leurs liens vers la ressource concernée."
      },
      {
        "module": "Paramètres (/parametres)",
        "what": "Vous réglez votre « Période de bilan par défaut » (Profil par défaut / Semaine / Quinzaine / Mois) et activez / désactivez les « Rappels des rendez-vous », puis enregistrez."
      },
      {
        "module": "Mot de passe oublié / Réinitialiser le mot de passe",
        "what": "En cas de perte d'accès, vous demandez un lien de réinitialisation par e-mail (valable 1 heure, usage unique) puis définissez un nouveau mot de passe (min. 8 caractères)."
      }
    ],
    "workflows": [
      {
        "title": "Créer et soumettre une activité à validation",
        "steps": [
          "Depuis le tableau de bord ou le module Activités, cliquez sur « Nouvelle activité » (ou ouvrez /activities/new).",
          "Renseignez le Titre et la description, sélectionnez la Structure, définissez la Période (début / fin).",
          "Si pertinent, liez un ou plusieurs textes EduLex dans la section dédiée pour étayer votre contribution.",
          "Enregistrez : l'activité est créée au statut Brouillon.",
          "Ouvrez l'activité, cliquez sur « Joindre un document » pour ajouter vos pièces justificatives (PDF, image, Word, Excel).",
          "Relisez le contenu, puis cliquez sur « Soumettre à validation » : la chaîne de validation démarre au premier niveau et l'activité passe en Soumis."
        ]
      },
      {
        "title": "Corriger une activité renvoyée « À corriger »",
        "steps": [
          "Ouvrez le module Activités et filtrez la liste sur le statut « À corriger » (ou « Rejeté »).",
          "Ouvrez l'activité concernée et consultez l'« Historique de validation » pour lire le commentaire du validateur expliquant la correction demandée.",
          "Cliquez sur « Modifier » (/activities/[id]/edit) et apportez les ajustements demandés (texte, période, pièces jointes, liens EduLex).",
          "Enregistrez vos modifications.",
          "Cliquez de nouveau sur « Soumettre à validation » pour relancer le circuit."
        ]
      },
      {
        "title": "Modifier l'activité d'un autre agent (activity:update)",
        "steps": [
          "Ouvrez le module Activités et recherchez par titre, ou filtrez par statut, l'activité concernée dont vous n'êtes pas l'auteur.",
          "Ouvrez sa fiche et vérifiez l'auteur, la structure et le statut courant dans les informations.",
          "Cliquez sur « Modifier » (/activities/[id]/edit) : la permission activity:update vous autorise à éditer cette activité.",
          "Apportez vos ajustements (titre, description, période, liens EduLex, pièces jointes), en cohérence avec la contribution de l'auteur.",
          "Enregistrez. Note : vous ne pouvez pas statuer sur l'activité (valider / corriger / rejeter / consolider), faute de la permission activity:validate."
        ]
      },
      {
        "title": "Étayer une activité avec un texte EduLex",
        "steps": [
          "Avant ou pendant la saisie, ouvrez EduLex (/edulex) et recherchez le texte pertinent par mot-clé (titre, code, numéro officiel, tags).",
          "Ouvrez la fiche du texte : vérifiez son Niveau de vérification (méfiez-vous d'un V0 « non vérifié ») et son Statut (idéalement « En vigueur »).",
          "Notez le code / l'identifiant du texte.",
          "Revenez à votre activité en cours de création ou d'édition et liez ce texte dans la section de liaison EduLex.",
          "Enregistrez : la référence apparaîtra dans le détail de l'activité et pourra être reprise dans les rapports consolidés."
        ]
      },
      {
        "title": "Demander une autorisation d'absence",
        "steps": [
          "Ouvrez le module Autorisations d'absence (/absences). Assurez-vous au préalable qu'un supérieur hiérarchique est bien défini sur votre compte (sinon l'envoi est impossible).",
          "Cliquez sur « Demander une absence » puis « Nouvelle demande ».",
          "Choisissez le Motif (Affaires personnelles, Congé réglementaire, Formation, Raison médicale, Force majeure institutionnelle).",
          "Renseignez les dates Du / Au ; le Nombre de jours se calcule automatiquement. Ajoutez une Note au supérieur si besoin.",
          "Cliquez sur « Envoyer au supérieur ». Suivez ensuite le statut (En attente / Approuvée / Refusée) dans l'historique ; vous pouvez annuler une demande tant qu'elle est En attente."
        ]
      },
      {
        "title": "Suivre votre productivité et obtenir des conseils IA",
        "steps": [
          "Ouvrez le module Évaluation (/evaluation) pour consulter votre score /100 et son libellé qualitatif.",
          "Regardez l'indicateur de tendance (« +N pts vs semaine précédente ») et le graphique d'évolution sur 4 semaines.",
          "Examinez les deux cartes de détail (« RDV honorés (7 j) » et « Activités validées (7 j) ») pour repérer votre point faible.",
          "Cliquez sur « Obtenir mes conseils » dans la carte « Conseils IA » et lisez les 2–3 recommandations personnalisées ; utilisez « Régénérer » si besoin. Si la fonctionnalité IA n'est pas activée sur le serveur, un message d'état vous l'indique.",
          "Pour un suivi périodique, ouvrez le module Bilan (/bilan), choisissez la période, et exportez votre synthèse via « Exporter en PDF »."
        ]
      },
      {
        "title": "Suivre une formation citoyenne sur EduLex Academy",
        "steps": [
          "Ouvrez EduLex Academy (/academy) et repérez votre XP, votre série et votre niveau dans le hero.",
          "Filtrez par « Catégories de parcours » puis choisissez un parcours adapté à votre niveau et cliquez sur « Commencer ».",
          "Dans le parcours, ouvrez une unité puis une leçon (en respectant les éventuels prérequis marqués d'un cadenas).",
          "Répondez aux questions du quiz et cliquez sur « Valider » ; lisez le feedback pédagogique et le lien « Voir le texte → » vers le texte EduLex source.",
          "Enchaînez les questions jusqu'à « Terminer la leçon », puis suivez votre avancement dans « Ma progression » et vos récompenses dans « Badges & trophées »."
        ]
      },
      {
        "title": "Planifier un rendez-vous et activer ses rappels",
        "steps": [
          "Ouvrez d'abord Paramètres (/parametres) et activez « Rappels des rendez-vous » si vous souhaitez des rappels par défaut, puis enregistrez.",
          "Ouvrez le module Rendez-vous (/rendez-vous) et cliquez sur « Ajouter » dans le bloc « Nouveau rendez-vous ».",
          "Renseignez le Titre, la Date et heure, le Lieu, le délai de Rappel (Aucun / 5 min / 1 h / 1 jour avant) et vos Notes.",
          "Cliquez sur « Ajouter le rendez-vous » : il apparaît dans la liste « À venir ».",
          "Une fois le rendez-vous tenu, cochez « Marquer fait » ; les RDV honorés alimentent automatiquement votre Bilan et votre Évaluation."
        ]
      }
    ],
    "tips": [
      "Soignez le titre et la description de vos activités et joignez systématiquement vos pièces justificatives : un dossier complet accélère la validation et réduit les renvois « À corriger ».",
      "Avant de soumettre, vérifiez que les textes EduLex liés sont bien « En vigueur » et de préférence d'un niveau de vérification élevé : un texte V0 « non vérifié » affaiblit votre contribution.",
      "Consultez le module Formulaires (en lecture) pour anticiper les champs attendus avant de saisir une activité.",
      "Marquez vos rendez-vous comme « fait » dès qu'ils sont tenus : ce sont eux, avec vos activités validées, qui nourrissent votre score d'Évaluation, votre Bilan et vos Distinctions trimestrielles.",
      "Pour viser une distinction, maintenez un score de reporting du trimestre ≥ 50 % et gardez vos absences sous les seuils (affaires personnelles < 20 %, raison médicale < 40 % du congé annuel).",
      "Définissez correctement votre « Type de profil » dans Mon profil : il adapte la terminologie (vos « Activités » peuvent devenir « Mes tâches », « Séances & cours », « Missions » ou « Actions ») et votre période de bilan par défaut.",
      "Consultez régulièrement vos Notifications pour ne pas manquer une demande de correction, une décision d'absence ou une échéance, et utilisez « Tout marquer comme lu » pour faire le tri.",
      "Utilisez le filtre Pays de la barre supérieure de façon cohérente : il conditionne le périmètre de vos données sur le tableau de bord, EduLex et Academy."
    ],
    "limits": [
      "Vous ne pouvez pas statuer sur les activités (Valider, Demander correction, Rejeter, Consolider) : cela requiert la permission activity:validate, réservée aux validateurs. Dans la file de Validation hiérarchique, vous êtes en consultation seule.",
      "Vous ne pouvez pas supprimer une activité dont vous n'êtes pas l'auteur : cela requiert activity:delete, que votre rôle ne possède pas.",
      "Vous ne pouvez pas générer ni gérer de rapports institutionnels (/reports) : cela relève des permissions report:create / read / export / manage, absentes de votre rôle.",
      "Vous ne créez ni ne configurez de formulaires de saisie : vous les consultez seulement (form:read, pas form:manage).",
      "Sur EduLex, vous êtes en lecture seule : pas de dépôt de texte, pas de validation V0→V4, pas de publication, d'import ni de gestion des référentiels (pays, ministères, secteurs) — tout cela exige edulex:create / validate / publish / import / manage.",
      "Sur Academy, vous êtes apprenant : vous ne créez pas de questions de quiz et ne générez pas de modules d'évaluation (réservé à academy:manage), et vous n'accédez pas à l'Administration Academy.",
      "Vous ne gérez ni l'organigramme et les structures (organization:manage) ni les comptes utilisateurs, leurs rôles et leurs droits (user:manage).",
      "Vous n'accédez pas à l'espace d'Administration de la plateforme (admin:read / admin:manage) ni aux Archives consolidées de l'organisation (admin:manage requis).",
      "Dans le module Absences, vous demandez en principe pour vous-même et un supérieur hiérarchique doit être défini sur votre compte pour soumettre une demande. La validation des demandes d'autrui, la comptabilisation d'office et le réglage de la politique ne vous sont ouverts que si vous êtes vous-même le supérieur hiérarchique des agents concernés."
    ]
  },
  {
    "roleKey": "auditor",
    "tagline": "Le regard indépendant qui consulte, vérifie et trace l'ensemble de la gouvernance, des activités validées aux rapports et au référentiel EduLex, sans jamais altérer les données.",
    "intro": "Le Contrôleur / auditeur est un profil de surveillance et de vérification au sein du périmètre Gouvernance de la plateforme. Il dispose d'un accès strictement en lecture, ouvert par quatre permissions : consultation des activités et de leur historique de validation, des rapports institutionnels consolidés, du référentiel réglementaire EduLex et des journaux de l'espace d'administration. Sa mission est d'observer, de contrôler la conformité et la traçabilité des opérations, sans pouvoir créer, modifier, valider ni supprimer quoi que ce soit. Le périmètre des données qu'il visualise suit le filtre Pays sélectionné dans la barre supérieure et, sauf droit d'administration étendu, peut se limiter au cadre organisationnel auquel il est rattaché.",
    "access": [
      {
        "module": "Tableau de bord (/dashboard et Accueil /)",
        "what": "Consulte la vue d'ensemble à la connexion : les KPI de gouvernance (« Activités saisies », « Activités validées », « En attente de validation », « Rapports générés », « Textes EduLex disponibles », « Textes à vérifier », « Parcours Academy publiés », « Taux de validation »), le graphique « Évolution des activités », le donut « Répartition par statut », le feed « Activités récentes » et la carte « EduLex — récents ». Le périmètre des données suit le filtre Pays de la barre supérieure. Les cartes personnelles (parrainage, demandes d'absence) restent présentes, mais le contrôle s'exerce sur les indicateurs de gouvernance."
      },
      {
        "module": "Activités (/activities)",
        "what": "Consulte en lecture seule le suivi des activités/contributions : liste filtrable par statut (Toutes, Brouillon, Soumis, En examen, Validé, Rejeté, À corriger, Consolidé, Archivé) et recherche par titre. Ouvre le détail d'une activité pour examiner ses textes EduLex associés, ses informations (auteur, structure, pays, période, date de soumission), ses pièces jointes téléchargeables et son « Historique de validation » (Soumission, Validation, Rejet, Demande de correction, Consolidation). Il ne peut ni créer, ni modifier, ni soumettre, ni statuer, ni supprimer."
      },
      {
        "module": "Validation hiérarchique (/validation)",
        "what": "Consulte la file d'attente des activités à statuer (statuts Soumis, En examen, À corriger) avec l'auteur, la structure, la date de soumission et le niveau courant, ainsi que le bandeau « Circuit de validation : 1. … → 2. … ». N'ayant pas la permission activity:validate, il voit l'avertissement « Vous pouvez consulter la file mais pas statuer » : il peut « Examiner » une activité pour en lire le détail, mais ne peut pas la valider, la rejeter, demander une correction ni la consolider."
      },
      {
        "module": "Reporting institutionnel (/reports)",
        "what": "Consulte en lecture seule les rapports consolidés : tableau listant titre, périodicité, auteur, date et statut (Brouillon, Généré, Archivé). Ouvre un rapport (/reports/[id]) pour examiner sa page de garde (périmètre Pays/Organisation/Période), ses indicateurs « Activités consolidées » et par statut, le tableau « Activités réalisées » et les « Références réglementaires EduLex ». Il peut imprimer la fiche d'un rapport via le bouton d'impression, mais ne peut ni générer, ni gérer/supprimer de rapport (réservé à report:create/manage)."
      },
      {
        "module": "EduLex — référentiel réglementaire (/edulex)",
        "what": "Consulte le référentiel réglementaire : les 4 KPI (« Textes au total », « En vigueur », « À vérifier (V0 / à vérifier) », « Certifiés V4 »), la recherche par mot-clé et les filtres Catégorie, Statut, Type, Niveau. Ouvre la fiche d'un texte via sa carte. Les boutons « Déposer un texte », « File de validation » et les liens de référentiel (Pays, Ministères, Secteurs, Import) ne s'affichent pas, faute des droits edulex:create/validate/manage."
      },
      {
        "module": "Fiche d'un texte EduLex (/edulex/texts/[id])",
        "what": "Consulte en détail un texte réglementaire : badges Type, Statut, Niveau de vérification (V0→V4) et Confidentialité (Public/Restreint/Confidentiel), avertissements (« Ce texte est au niveau V0 : entrée non vérifiée », « Ce texte n'est pas en vigueur »), téléchargements (« Télécharger (PDF) », « Markdown », « Consulter la source officielle »), relations entre textes (Remplace / Modifie / Abroge / Lié à / Cite), « Historique des versions », « Journal de validation » et traçabilité « Déposé par » / « Validé par ». Le panneau « Validation à partir de sources officielles » (changement de niveau V0→V4 et de statut) ne lui est pas accessible (réservé à edulex:validate/publish)."
      },
      {
        "module": "Pays & juridictions EduLex (/edulex/countries)",
        "what": "Consulte la grille des pays (drapeau, nom, namespace/code, nombre de texte(s), badge code, marqueur « inactif »). La carte « Ajouter un pays » ne s'affiche pas (réservée à edulex:manage)."
      },
      {
        "module": "Ministères & gouvernements EduLex (/edulex/ministries)",
        "what": "Consulte les gouvernements par pays (badge de statut À venir / En vigueur / Archivé, date d'entrée en vigueur, nombre de ministères, lien source) et le tableau des ministères (Ministère, Code, Pays, Gouvernement). Les cartes « Déclarer un gouvernement » / « Ajouter un ministère » et les actions d'édition ou de suppression sont masquées (réservées à edulex:manage)."
      },
      {
        "module": "Secteurs réglementaires EduLex (/edulex/sectors)",
        "what": "Consulte le tableau des secteurs (Secteur, Code, Pays/International, nombre de Textes). La carte « Ajouter un secteur » et l'édition/suppression de secteurs ne lui sont pas proposées (réservées à edulex:manage)."
      },
      {
        "module": "Administration (/admin)",
        "what": "Accède en consultation à l'espace d'administration grâce à admin:read : visualise les statistiques globales de la plateforme (« Utilisateurs », « Pays », « Rôles », « Permissions », « Textes EduLex ») et la liste « Vos rôles ». C'est son point d'entrée privilégié pour l'audit. Il ne peut pas éditer la « Hiérarchie de validation » (réservée à admin:manage / organization:manage)."
      },
      {
        "module": "Notifications (/notifications)",
        "what": "Consulte ses 50 dernières notifications (titre, corps, date, pastille lu/non lu), clique une notification pour la marquer lue et suivre son lien, et utilise « Tout marquer comme lu ». Ce centre l'alerte notamment des publications EduLex et des validations utiles à son suivi."
      },
      {
        "module": "Mon profil (/account)",
        "what": "Consulte et gère sa propre page « Mon compte » : avatar, nom, badges de rôles, cartes E-mail / Organisation / Pays. Il peut changer sa photo et choisir son type de profil (Personnel, École, Entreprise, Association), ce qui adapte la terminologie de l'interface et sa période de bilan par défaut."
      },
      {
        "module": "Paramètres (/parametres)",
        "what": "Règle ses préférences personnelles : « Période de bilan par défaut » (Profil par défaut / Semaine / Quinzaine / Mois) et l'interrupteur « Rappels des rendez-vous », puis enregistre."
      },
      {
        "module": "Outils personnels (Rendez-vous, Bilan & synthèse, Évaluation, Distinctions)",
        "what": "Comme tout utilisateur, il dispose de ses outils personnels : agenda de Rendez-vous (/rendez-vous), Bilan & synthèse de ses RDV et activités avec export PDF (/bilan), score d'Évaluation de productivité avec Conseils IA (/evaluation) et ses Distinctions trimestrielles (/distinctions). Ces espaces sont strictement personnels et indépendants de sa fonction d'audit."
      }
    ],
    "workflows": [
      {
        "title": "Contrôler la traçabilité de la validation d'une activité",
        "steps": [
          "Ouvrez le module Activités via le menu latéral (/activities).",
          "Au besoin, sélectionnez le pays concerné dans la barre supérieure pour cadrer le périmètre.",
          "Filtrez la liste sur le statut pertinent (par exemple « Validé » ou « Consolidé ») et, si nécessaire, recherchez l'activité par son titre.",
          "Cliquez sur l'activité pour ouvrir sa fiche détaillée.",
          "Consultez la section « Historique de validation » et vérifiez la chronologie des événements (Soumission, Validation, Rejet, Demande de correction, Consolidation) ainsi que les commentaires associés.",
          "Contrôlez les informations d'en-tête (auteur, structure, pays, période, date de soumission) et, le cas échéant, téléchargez les pièces jointes pour examen.",
          "Consignez tout écart de circuit constaté ; vous restez en consultation et ne pouvez pas modifier l'activité."
        ]
      },
      {
        "title": "Examiner la file de validation hiérarchique en cours",
        "steps": [
          "Ouvrez le module Validation hiérarchique (/validation) via le menu latéral.",
          "Sélectionnez au besoin le pays concerné dans la barre supérieure.",
          "Parcourez la file des activités en attente (auteur, structure, date de soumission, niveau courant) et relevez les compteurs « En attente de décision » et « Validées (organisation) ».",
          "Lisez le bandeau « Circuit de validation : 1. … → 2. … » pour vérifier l'ordonnancement des niveaux par rôle.",
          "Cliquez « Examiner » sur une entrée pour ouvrir le détail de l'activité et contrôler son historique.",
          "Notez les éventuels retards ou anomalies de circuit ; l'avertissement « Vous pouvez consulter la file mais pas statuer » rappelle que vous ne pouvez pas valider, rejeter, corriger ni consolider."
        ]
      },
      {
        "title": "Vérifier la conformité d'un rapport institutionnel",
        "steps": [
          "Ouvrez le module Reporting institutionnel (/reports).",
          "Repérez le rapport à contrôler dans le tableau (titre, périodicité, auteur, date, statut Généré ou Archivé).",
          "Cliquez sur le rapport pour ouvrir sa page (/reports/[id]).",
          "Examinez la page de garde et le périmètre annoncé (Pays / Organisation / Période).",
          "Vérifiez la cohérence des indicateurs « Activités consolidées » et de la répartition par statut avec le tableau « Activités réalisées ».",
          "Contrôlez la section « Références réglementaires EduLex » pour valider l'ancrage juridique du rapport.",
          "Au besoin, imprimez la fiche du rapport (bouton d'impression) pour archivage, puis recoupez les chiffres en retournant au module Activités avec les mêmes statuts et la même période. Vous ne pouvez ni générer ni supprimer le rapport."
        ]
      },
      {
        "title": "Auditer le niveau de vérification et l'historique d'un texte EduLex",
        "steps": [
          "Ouvrez le module EduLex (/edulex) et, si besoin, fixez le pays dans la barre supérieure.",
          "Utilisez le champ « Rechercher par mot-clé… » ou les filtres Catégorie / Statut / Type / Niveau pour isoler le texte concerné.",
          "Cliquez sur la carte du texte pour ouvrir sa fiche (/edulex/texts/[id]).",
          "Lisez les badges Type, Statut, Niveau de vérification (V0→V4) et Confidentialité, en tenant compte des avertissements (« Ce texte est au niveau V0 : entrée non vérifiée », « Ce texte n'est pas en vigueur »).",
          "Consultez le « Journal de validation » et l'« Historique des versions » pour retracer le cheminement V0→V4 et les acteurs.",
          "Vérifiez la traçabilité « Déposé par » / « Validé par » et, au besoin, ouvrez « Consulter la source officielle » ou téléchargez le PDF / Markdown pour recoupement.",
          "Examinez les relations (Remplace / Modifie / Abroge / Lié à / Cite) pour situer le texte dans son contexte réglementaire."
        ]
      },
      {
        "title": "Identifier les textes réglementaires à vérifier (non certifiés)",
        "steps": [
          "Ouvrez le module EduLex (/edulex).",
          "Sélectionnez le pays à contrôler dans la barre supérieure.",
          "Lisez le KPI « À vérifier (V0 / à vérifier) » pour mesurer le volume de textes non vérifiés.",
          "Appliquez le filtre Niveau sur « V0 » (et/ou le filtre Statut correspondant) puis cliquez « Filtrer ».",
          "Parcourez les cartes affichées et ouvrez les fiches concernées pour examiner leur source et leur journal de validation.",
          "Consignez les textes manquant de vérification afin de les signaler aux validateurs EduLex ; vous ne pouvez pas faire progresser le niveau vous-même."
        ]
      },
      {
        "title": "Examiner les statistiques globales depuis l'espace d'administration",
        "steps": [
          "Ouvrez le module Administration (/admin) via le menu latéral.",
          "Consultez le bloc de statistiques : « Utilisateurs », « Pays », « Rôles », « Permissions », « Textes EduLex ».",
          "Recoupez ces volumes avec les KPI du Tableau de bord et des modules Activités, Reporting et EduLex pour repérer d'éventuelles incohérences.",
          "Vérifiez la section « Vos rôles » pour confirmer votre propre périmètre de droits.",
          "Consignez vos observations d'audit ; l'édition de la « Hiérarchie de validation » ne vous est pas ouverte (réservée à l'administration)."
        ]
      },
      {
        "title": "Réaliser un point de contrôle périodique multi-modules",
        "steps": [
          "Connectez-vous et ouvrez le Tableau de bord pour une lecture d'ensemble des KPI de gouvernance.",
          "Fixez le périmètre en sélectionnant le pays voulu dans la barre supérieure.",
          "Dans Activités, contrôlez les volumes par statut et le « Taux de validation », en ouvrant quelques fiches pour vérifier les historiques de validation ; complétez par un coup d'œil à la file Validation hiérarchique pour les décisions en cours.",
          "Dans Reporting institutionnel, ouvrez les rapports récents et contrôlez la cohérence des indicateurs et des références EduLex citées.",
          "Dans EduLex, vérifiez les KPI de vérification (V0, En vigueur, Certifiés V4) et l'état du référentiel (Pays, Ministères, Secteurs) en lecture.",
          "Terminez dans Administration en relevant les statistiques globales, puis consolidez vos constats dans votre propre rapport d'audit (hors plateforme)."
        ]
      }
    ],
    "tips": [
      "Utilisez systématiquement le filtre Pays de la barre supérieure avant de lire des indicateurs : il cadre le périmètre des données et évite de comparer des chiffres « tous pays » avec des chiffres nationaux.",
      "Pour un audit fiable, raisonnez sur les statuts « Validé » et « Consolidé » des activités : ce sont eux qui alimentent les rapports et reflètent les contributions réellement entérinées.",
      "L'« Historique de validation » d'une activité et le « Journal de validation » d'un texte EduLex sont vos meilleures preuves de traçabilité : examinez-les avant de conclure à une non-conformité.",
      "Recoupez les chiffres entre modules (Tableau de bord, Activités, Reporting, Administration) : une divergence entre le « Taux de validation » et le contenu d'un rapport est un bon signal d'alerte.",
      "Appuyez-vous sur les badges de Niveau de vérification (V0→V4) et de Confidentialité pour juger de la fiabilité d'un texte ; un texte en V0 reste une « entrée non vérifiée ».",
      "Consultez régulièrement vos Notifications : elles vous signalent les publications EduLex et les validations, utiles pour déclencher un contrôle au bon moment.",
      "Pour conserver vos constats, utilisez les téléchargements disponibles en lecture (PDF / Markdown d'un texte EduLex, pièces jointes d'une activité, impression d'un rapport via sa fiche) plutôt que de retranscrire manuellement."
    ],
    "limits": [
      "Vous ne pouvez créer, modifier, soumettre, valider, demander une correction, rejeter, consolider ni supprimer aucune activité (réservé aux agents et validateurs disposant d'activity:create/update/validate/delete) ; dans la file Validation hiérarchique, vous consultez mais ne statuez pas.",
      "Vous ne pouvez pas générer, exporter ni gérer/supprimer de rapport institutionnel (réservé à report:create/export/manage) ; vous vous limitez à la consultation et à l'impression des rapports.",
      "Vous ne pouvez pas déposer, importer, modifier, faire progresser de niveau (V0→V4), publier ni archiver un texte EduLex, ni gérer les référentiels Pays, Ministères ou Secteurs (réservé à edulex:create/update/validate/publish/archive/import/manage).",
      "Le panneau de validation EduLex (V0→V4 et changement de statut) sur la fiche d'un texte ne vous est pas accessible, et le bouton « File de validation » ne s'affiche pas sur /edulex faute du droit edulex:validate.",
      "Vous ne gérez pas les utilisateurs : ni création, modification, import, activation/désactivation, réinitialisation de mot de passe, suppression ou délégation de droits (réservé à user:manage) ; le module Utilisateurs ne relève pas de vos permissions.",
      "Vous ne gérez pas l'organisation et les structures (organigramme, création/déplacement par glisser-déposer, suppression, logo), ni les formulaires d'activités (conception, publication, archivage) — réservés à organization:manage et form:manage.",
      "Dans l'Administration, vous consultez les statistiques et vos rôles mais ne pouvez pas éditer la « Hiérarchie de validation » (réservé à admin:manage / organization:manage).",
      "Vous n'intervenez pas dans EduLex Academy ni dans son administration (questions, génération d'évaluations), ces espaces relevant des permissions academy:read/manage.",
      "La vue consolidée des Archives (/archives) ne vous est pas ouverte, car elle requiert le droit admin:manage que vous ne détenez pas.",
      "Sauf droit d'administration étendu (admin:manage), votre lecture peut être restreinte au périmètre de votre propre organisation et ne couvre pas nécessairement l'intégralité de l'inventaire de la plateforme."
    ]
  },
  {
    "roleKey": "reader",
    "tagline": "Observer la gouvernance éducative en toute transparence : consulter les activités, les rapports institutionnels, le référentiel EduLex et l'espace de formation Academy, sans jamais créer, modifier ni valider de données.",
    "intro": "Le « Lecteur simple » est un profil d'observation au sein du périmètre Gouvernance. Il dispose d'un accès en lecture seule aux activités (activity:read), aux rapports institutionnels (report:read), au référentiel réglementaire EduLex (edulex:read) et à l'espace de formation EduLex Academy (academy:read). Il peut consulter, parcourir, télécharger les ressources mises à disposition et suivre des leçons de formation, mais il ne crée, ne modifie, ne valide, ne publie ni ne supprime aucune donnée de gouvernance. Il bénéficie par ailleurs des espaces personnels communs à tout utilisateur connecté (agenda, bilan, évaluation, profil, notifications, paramètres), ainsi que du circuit d'absences fondé sur son lien hiérarchique.",
    "access": [
      {
        "module": "Tableau de bord (/dashboard et Accueil /)",
        "what": "Consulter à la connexion sa vue d'ensemble personnalisée : l'en-tête « Bonjour, {Prénom} · {pays} », les huit KPI de gouvernance (« Activités saisies », « Activités validées », « En attente de validation », « Rapports générés », « Textes EduLex disponibles », « Textes à vérifier », « Parcours Academy publiés », « Taux de validation »), le graphique « Évolution des activités », le donut « Répartition par statut », le feed « Activités récentes » (lien « Tout voir » vers /activities) et la carte « EduLex — récents ». Le périmètre des données suit le filtre Pays de la barre supérieure (sinon « tous les pays »). La carte « Programme de parrainage commercial » permet de copier ou de partager son code promo (8 caractères) et son lien d'invitation, et la carte « Mes demandes d'absence » affiche ses 4 dernières demandes avec leur statut (En attente / Approuvée / Refusée). Le bouton « Nouvelle activité » est affiché, mais il conduit à un formulaire de création qui dépasse les droits de lecture seule du rôle."
      },
      {
        "module": "Accueil public (/)",
        "what": "Pour un utilisateur connecté, l'entrée « Accueil » de la navigation latérale mène au tableau de bord. La page vitrine publique reste consultable : présentation des trois piliers (Gouvernance administrative, EduLex, EduLex Academy), statistiques de fréquentation en direct, et liens Produit / EduLex / Academy / Contact."
      },
      {
        "module": "Activités (/activities)",
        "what": "Consulter le suivi des activités relevant de son périmètre de lecture (activity:read). Filtrer la liste par statut (Toutes, Brouillon, Soumis, En examen, Validé, Rejeté, À corriger, Consolidé, Archivé) et rechercher par titre. Ouvrir le détail d'une activité pour lire les textes EduLex associés, les informations (auteur, structure, pays, période, date de soumission), les pièces jointes (et les télécharger) et l'« Historique de validation » (Soumission, Validation, Rejet, Demande de correction, Consolidation). Lecture seule : aucun bouton de création, de modification, de soumission, de décision (Valider / Demander correction / Rejeter / Consolider) ni de suppression ne lui est ouvert."
      },
      {
        "module": "Reporting institutionnel (/reports)",
        "what": "Consulter le tableau des rapports consolidés (titre, périodicité, auteur, date, statut Brouillon / Généré / Archivé) dans la limite de son périmètre. Ouvrir un rapport (/reports/[id]) pour lire sa page de garde (périmètre Pays / Organisation / Période), ses indicateurs « Activités consolidées » et la répartition par statut, le tableau « Activités réalisées » et les « Références réglementaires EduLex ». Avec la seule permission report:read, le lecteur ne peut ni générer un rapport (report:create), ni l'exporter ou l'imprimer (report:export), ni le supprimer (report:manage)."
      },
      {
        "module": "EduLex — référentiel réglementaire (/edulex)",
        "what": "Consulter les 4 KPI (« Textes au total », « En vigueur », « À vérifier (V0 / à vérifier) », « Certifiés V4 »), rechercher par mot-clé (titre, code, numéro officiel, résumé, tags) et filtrer par Catégorie, Statut, Type et Niveau (boutons « Filtrer » / « Réinitialiser »). Ouvrir la fiche d'un texte via sa carte (badge type/statut, niveau de vérification, drapeau pays). Le périmètre est restreint par le filtre Pays de la barre supérieure. Les boutons « Déposer un texte » et « File de validation », ainsi que les liens de référentiel (Pays, Ministères, Secteurs, Import d'amorçage), ne sont pas affichés pour ce rôle : ils requièrent edulex:create, edulex:validate ou edulex:manage."
      },
      {
        "module": "Fiche d'un texte EduLex (/edulex/texts/[id])",
        "what": "Lire l'intégralité des métadonnées d'un texte : badges Type, Statut, Niveau de vérification (V0→V4) et Confidentialité (Public / Restreint / Confidentiel), ainsi que les avertissements (« Ce texte est au niveau V0 : entrée non vérifiée », « Ce texte n'est pas en vigueur »). Télécharger le texte (« Télécharger (PDF) », « Markdown ») et « Consulter la source officielle ». Consulter les relations entre textes (Remplace / Modifie / Abroge / Lié à / Cite), l'« Historique des versions », le « Journal de validation » et la traçabilité « Déposé par » / « Validé par ». Le panneau de validation V0→V4, le changement de statut, la publication et le téléversement d'un document source restent fermés (réservés à edulex:validate, edulex:publish et edulex:update)."
      },
      {
        "module": "EduLex Academy (/academy)",
        "what": "Accéder à l'espace de formation citoyenne (« EduLex CI Academy » lorsque le pays sélectionné est la Côte d'Ivoire). Voir son hero personnel « XP / Série / Niveau », utiliser les accès rapides (« Ma progression », « Badges & trophées », « Classement »), consulter les 5 niveaux de compétence (Découverte, Compréhension, Application, Maîtrise, Expert / Référent), filtrer par « Catégories de parcours » et ouvrir un parcours via « Commencer ». La carte « Modules d'évaluation officiels » est visible, mais les boutons de génération (« Générer — [pays] » / « Générer pour tous les pays ») sont réservés à academy:manage."
      },
      {
        "module": "Parcours Academy (/academy/path/[id])",
        "what": "Consulter le détail d'un parcours (badge « Niveau N », catégorie, titre, description), parcourir les unités numérotées et leurs marqueurs « Prérequis » (cadenas), et ouvrir une leçon (avec son nombre de questions)."
      },
      {
        "module": "Leçon Academy — quiz (/academy/lesson/[id])",
        "what": "Suivre le lecteur de quiz interactif : répondre aux questions (QCU, QCM, Vrai / Faux), cliquer « Valider », lire le feedback pédagogique (« Bonne réponse · +X XP » ou « Réponse incorrecte ») avec le bloc « Voir le texte → » relié au texte EduLex source (mention « à vérifier » si V0), enchaîner avec « Question suivante » puis « Terminer la leçon », et consulter l'écran de fin (bonnes réponses, XP gagnés, % de parcours, « Recommencer »)."
      },
      {
        "module": "Ma progression Academy (/academy/progress)",
        "what": "Consulter son tableau de bord d'apprenant : « XP cumulés », « Niveau N », « Série d'apprentissage », l'avancement de « Mes parcours », les « Textes à revoir » (recommandations issues des réponses incorrectes, ouvrant la fiche EduLex) et « Mes badges »."
      },
      {
        "module": "Badges & trophées Academy (/academy/badges)",
        "what": "Voir le ratio « X / Y badge(s) obtenu(s) » et parcourir tous les badges (icône, nom, description), avec la mention « Obtenu le [date] » ou « À débloquer » (cadenas)."
      },
      {
        "module": "Classement citoyen Academy (/academy/leaderboard)",
        "what": "Consulter le top 50 des apprenants (rang / médaille, initiales, nom, « Niveau N », série, total XP) et repérer sa propre ligne, mise en évidence par le repère « (vous) »."
      },
      {
        "module": "Rendez-vous (/rendez-vous)",
        "what": "Gérer son agenda personnel (chaque utilisateur ne voit que ses propres rendez-vous) : créer un rendez-vous via « Ajouter » (Titre, Date et heure, Lieu, Rappel, Notes), consulter les listes « À venir » et « Passés & faits », cocher « Marquer fait / non fait », « Modifier » ou « Supprimer » un rendez-vous. Espace personnel, non soumis aux permissions de gouvernance."
      },
      {
        "module": "Bilan & synthèse (/bilan)",
        "what": "Consulter sa synthèse personnelle de rendez-vous honorés et d'activités validées sur la période choisie (onglets « Semaine », « Quinzaine », « Mois »), avec le « Taux de réalisation », les cartes « Rendez-vous honorés » et « Activités validées », et les listes « Faits » / « Non faits ». Exporter son bilan personnel en PDF via « Exporter en PDF ». Espace personnel distinct du reporting institutionnel."
      },
      {
        "module": "Évaluation (/evaluation)",
        "what": "Consulter son score de productivité personnel (0–100) avec libellé qualitatif et indicateur de tendance vs semaine précédente, le graphique « Évolution sur 4 semaines » et les cartes « RDV honorés (7 j) » et « Activités validées (7 j) ». Demander des « Conseils IA » via « Obtenir mes conseils » puis « Régénérer » (sous réserve que la fonctionnalité IA soit activée sur le serveur)."
      },
      {
        "module": "Distinctions & rappels à l'ordre (/distinctions)",
        "what": "Consulter sa propre distinction trimestrielle (et, le cas échéant, celles de ses subordonnés s'il en a) : compteur de distinctions, bouclier (belle performance) ou émoticône larme (performance à redresser) par trimestre (T1–T4), détail des critères (Régularité du reporting ≥ 50 %, Affaires personnelles < 20 %, Raison médicale < 40 %), sélecteur d'année, et message au style ivoirien (nouchi) avec lecture audio lorsque le pays CI est sélectionné."
      },
      {
        "module": "Mon profil (/account)",
        "what": "Consulter et personnaliser son compte : avatar (ou initiales), nom complet, badges de rôles ; « Changer la photo » ; choisir son « Type de profil » (🏠 Personnel, 🎓 École, 🏢 Entreprise, 🤝 Association), qui adapte la terminologie de l'interface (par exemple le module Activités) et la période de bilan par défaut ; consulter ses cartes E-mail, Organisation et Pays."
      },
      {
        "module": "Autorisations d'absence (/absences)",
        "what": "L'accès ne dépend d'aucune permission dédiée mais du lien hiérarchique. Si un supérieur (managerId) lui est défini, le lecteur peut « Demander une absence » pour lui-même (Motif, dates Du/Au, jours auto-calculés, Note au supérieur, « Envoyer au supérieur »), consulter son suivi (cumul approuvé sur quota, jours par motif, historique) et annuler sa propre demande « En attente ». Il ne valide pas les demandes d'autrui, ne comptabilise pas d'absence d'office et ne règle pas la politique d'absences (réservé au supérieur hiérarchique et à l'administration)."
      },
      {
        "module": "Notifications (/notifications)",
        "what": "Consulter ses 50 dernières notifications (échéances, validations, publications EduLex, défis Academy, seuils d'absence), cliquer une notification pour la marquer lue et suivre son lien, et utiliser « Tout marquer comme lu »."
      },
      {
        "module": "Paramètres (/parametres)",
        "what": "Régler ses préférences personnelles : « Période de bilan par défaut » (Profil par défaut / Semaine / Quinzaine / Mois), activer ou désactiver « Rappels des rendez-vous » (interrupteur), puis « Enregistrer »."
      }
    ],
    "workflows": [
      {
        "title": "Consulter l'état d'avancement des activités",
        "steps": [
          "Dans la navigation latérale, ouvrez « Activités » (/activities).",
          "Le cas échéant, sélectionnez un pays dans le filtre Pays de la barre supérieure pour cadrer le périmètre.",
          "Utilisez les filtres de statut (Toutes, Brouillon, Soumis, En examen, Validé, Rejeté, À corriger, Consolidé, Archivé) pour cibler ce que vous cherchez.",
          "Saisissez un titre dans le champ de recherche pour retrouver une activité précise.",
          "Cliquez sur une activité pour ouvrir son détail.",
          "Lisez les informations (auteur, structure, pays, période, date de soumission), les textes EduLex associés et l'« Historique de validation » pour comprendre où en est le dossier ; au besoin, téléchargez les pièces jointes existantes."
        ]
      },
      {
        "title": "Lire un rapport institutionnel consolidé",
        "steps": [
          "Ouvrez « Reporting institutionnel » (/reports) dans la navigation latérale.",
          "Repérez le rapport voulu dans le tableau grâce au titre, à la périodicité, à l'auteur, à la date et au statut (Brouillon, Généré, Archivé).",
          "Cliquez sur le rapport pour ouvrir sa fiche (/reports/[id]).",
          "Lisez la page de garde (périmètre Pays / Organisation / Période), les indicateurs « Activités consolidées » et la répartition par statut.",
          "Parcourez le tableau « Activités réalisées » et la section « Références réglementaires EduLex » pour relier les chiffres aux textes cités.",
          "Note : la génération, l'export et l'impression ne sont pas ouverts à votre rôle ; pour obtenir une version PDF, sollicitez un profil disposant de report:export."
        ]
      },
      {
        "title": "Rechercher et consulter un texte du référentiel EduLex",
        "steps": [
          "Ouvrez « EduLex » (/edulex).",
          "Au besoin, fixez le pays dans la barre supérieure pour restreindre le référentiel à la juridiction voulue.",
          "Saisissez un mot-clé dans « Rechercher par mot-clé… » (titre, code, numéro officiel, résumé ou tags).",
          "Affinez avec les filtres Catégorie, Statut, Type et Niveau, puis cliquez « Filtrer » (« Réinitialiser » pour repartir de zéro).",
          "Cliquez sur la carte d'un texte pour ouvrir sa fiche.",
          "Sur la fiche, lisez les badges Type / Statut / Niveau de vérification / Confidentialité, repérez les avertissements (« V0 : entrée non vérifiée », « pas en vigueur »), puis consultez les relations, l'« Historique des versions » et le « Journal de validation ».",
          "Pour conserver le texte, utilisez « Télécharger (PDF) », « Markdown » ou « Consulter la source officielle »."
        ]
      },
      {
        "title": "Vérifier la fiabilité d'un texte avant de s'y appuyer",
        "steps": [
          "Ouvrez la fiche du texte concerné (/edulex/texts/[id]).",
          "Lisez le badge « Niveau de vérification » : un niveau V0 affiche l'avertissement « entrée non vérifiée », tandis que V4 indique un texte certifié.",
          "Vérifiez le badge « Statut » et l'avertissement éventuel « Ce texte n'est pas en vigueur ».",
          "Consultez le « Journal de validation » et la mention « Validé par » pour connaître la traçabilité.",
          "Examinez les relations (Remplace / Modifie / Abroge) pour vous assurer qu'aucun texte plus récent ne le supplante.",
          "En cas de doute sur un texte non vérifié, signalez-le à un valideur EduLex : vous ne pouvez pas faire évoluer son niveau de vérification vous-même."
        ]
      },
      {
        "title": "Suivre une leçon EduLex Academy et gagner des XP",
        "steps": [
          "Ouvrez « EduLex Academy » (/academy).",
          "Repérez votre « XP », votre « Série » et votre « Niveau » dans le hero, puis filtrez les « Catégories de parcours » si besoin.",
          "Cliquez « Commencer » sur un parcours de la section « Parcours disponibles ».",
          "Dans le parcours (/academy/path/[id]), ouvrez une unité puis une leçon en respectant les marqueurs « Prérequis ».",
          "Répondez à chaque question (QCU, QCM, Vrai / Faux) puis cliquez « Valider » ; lisez le feedback et le bloc « Voir le texte → » qui renvoie au texte EduLex source.",
          "Enchaînez avec « Question suivante » jusqu'à « Terminer la leçon », puis consultez l'écran de fin (bonnes réponses, XP gagnés, % de parcours).",
          "Suivez ensuite « Textes à revoir » dans « Ma progression » (/academy/progress) pour consolider les points liés à vos réponses incorrectes."
        ]
      },
      {
        "title": "Demander une autorisation d'absence",
        "steps": [
          "Assurez-vous qu'un supérieur hiérarchique vous est rattaché : sans lui, l'envoi est impossible. Au besoin, faites définir ce lien par un gestionnaire de comptes (user:manage).",
          "Ouvrez « Autorisations d'absence » (/absences).",
          "Cliquez « Demander une absence » puis « Nouvelle demande ».",
          "Choisissez le Motif (Affaires personnelles, Congé réglementaire, Formation, Raison médicale, Force majeure institutionnelle), renseignez les dates Du / Au (le nombre de jours se calcule automatiquement) et ajoutez une « Note au supérieur ».",
          "Cliquez « Envoyer au supérieur ».",
          "Suivez ensuite la décision dans votre historique et dans le centre de Notifications (Approuvée / Refusée) ; vous pouvez annuler une demande tant qu'elle est « En attente »."
        ]
      },
      {
        "title": "Personnaliser son espace et suivre sa productivité",
        "steps": [
          "Ouvrez « Mon profil » (/account) et choisissez votre « Type de profil » (Personnel, École, Entreprise, Association) pour adapter la terminologie de l'interface et la période de bilan par défaut.",
          "Ouvrez « Paramètres » (/parametres), réglez la « Période de bilan par défaut », activez « Rappels des rendez-vous » si utile, puis « Enregistrer ».",
          "Dans « Rendez-vous » (/rendez-vous), créez vos rendez-vous via « Ajouter » et marquez-les « fait » au fur et à mesure pour alimenter votre suivi personnel.",
          "Ouvrez « Bilan & synthèse » (/bilan), choisissez la période et consultez votre taux de réalisation ; exportez-le via « Exporter en PDF ».",
          "Ouvrez « Évaluation » (/evaluation) pour voir votre score et son évolution, puis cliquez « Obtenir mes conseils » pour des recommandations IA personnalisées (si la fonctionnalité est activée sur le serveur)."
        ]
      }
    ],
    "tips": [
      "Utilisez systématiquement le filtre Pays de la barre supérieure : il recadre le tableau de bord, les activités, EduLex et Academy sur la juridiction qui vous intéresse (sinon « tous les pays »).",
      "Avant de citer un texte EduLex, vérifiez son niveau de vérification (visez V4) et son statut « En vigueur » : un badge V0 signale une entrée non vérifiée.",
      "Sur la fiche d'un texte, le « Journal de validation » et les relations (Remplace / Abroge / Modifie) vous évitent de vous appuyer sur une version dépassée.",
      "Filtrez les activités par statut « Validé » ou « Consolidé » pour ne consulter que les contributions fiabilisées qui alimentent les rapports.",
      "Téléchargez les versions PDF ou Markdown des textes EduLex pour les conserver hors ligne, d'autant que vous ne pouvez pas exporter les rapports institutionnels vous-même.",
      "Consultez régulièrement le centre de Notifications : il centralise les décisions d'absence, les publications EduLex et les défis Academy.",
      "Dans Academy, suivez « Textes à revoir » dans « Ma progression » : ces recommandations ciblent les textes liés à vos réponses incorrectes et renforcent votre compréhension réglementaire."
    ],
    "limits": [
      "Ne peut pas créer, modifier, soumettre ni supprimer d'activité, ni statuer dessus (Valider, Demander correction, Rejeter, Consolider) : ces actions requièrent activity:create / update / validate / delete. Le bouton « Nouvelle activité » du tableau de bord reste donc hors de portée du rôle.",
      "Ne peut pas générer, exporter, imprimer ni supprimer de rapport institutionnel : générer requiert report:create, exporter ou imprimer report:export, supprimer report:manage.",
      "Ne peut pas déposer, modifier, valider, publier, archiver ni importer de texte EduLex, ni faire progresser un texte de V0 à V4 : ces actions relèvent de edulex:create / update / validate / publish / archive / import / manage.",
      "Ne peut pas gérer les référentiels EduLex (Pays, Ministères, gouvernements, Secteurs) ni utiliser l'import d'amorçage : réservé à edulex:manage.",
      "Ne peut pas créer ou gérer les questions de quiz, ni générer les modules d'évaluation officiels dans Academy : réservé à academy:manage.",
      "N'a pas accès aux modules Organisation & structures (organization:read / manage), Utilisateurs (user:read / manage) ni Formulaires d'activités (form:read / manage).",
      "N'a pas accès à l'espace Administration ni aux Archives (admin:read / manage).",
      "Ne peut pas valider les demandes d'absence d'autres agents, comptabiliser une absence d'office ni régler la politique d'absences : ces actions sont réservées au supérieur hiérarchique et à l'administration. Sans supérieur hiérarchique défini, il ne peut même pas soumettre sa propre demande.",
      "Ne peut pas créer ou gérer des comptes utilisateurs ni se voir déléguer ou déléguer des droits : aucune permission de gestion (manage) ne lui est attribuée."
    ]
  },
  {
    "roleKey": "edulex_super_admin",
    "tagline": "Autorité technique du référentiel réglementaire EduLex : du dépôt d'un texte à sa certification V4, sa mise en vigueur, son import en masse et son archivage.",
    "intro": "Le Super Administrateur EduLex est l'autorité technique de référence du module EduLex, le référentiel réglementaire international de la plateforme (un texte = un pays + une juridiction + un niveau de vérification V0 à V4). Il maîtrise l'intégralité du cycle de vie d'un texte : dépôt, vérification à partir de sources officielles, progression dans le circuit V0 vers V4, mise en vigueur (publication), archivage des textes obsolètes et import en masse par amorçage CSV/TSV. Il administre également les référentiels d'appui d'EduLex : pays et juridictions, gouvernements et ministères émetteurs, secteurs réglementaires. Son périmètre est strictement réglementaire : il ne dispose d'aucun droit sur la gouvernance administrative (organisations, utilisateurs, formulaires, activités, rapports) ni sur l'administration d'EduLex Academy.",
    "access": [
      {
        "module": "EduLex — référentiel réglementaire (/edulex)",
        "what": "Accès complet. Il consulte les 4 KPI (Textes au total, En vigueur, À vérifier V0 / à vérifier, Certifiés V4), recherche par mot-clé (titre, code, numéro officiel, résumé, tags) et filtre par Catégorie, Statut, Type et Niveau (boutons « Filtrer » / « Réinitialiser »). Grâce à edulex:create il dispose du bouton « Déposer un texte », grâce à edulex:validate du bouton « File de validation », et grâce à edulex:manage des liens de référentiel « Pays », « Ministères », « Secteurs » et « Import d'amorçage ». Le périmètre des textes affichés suit le filtre Pays de la barre supérieure."
      },
      {
        "module": "Fiche d'un texte EduLex (/edulex/texts/[id])",
        "what": "Vue détaillée et pilotage complet. Il lit les badges Type, Statut, Niveau (V0 à V4) et Confidentialité (Public / Restreint / Confidentiel), télécharge le texte (PDF, Markdown, source officielle), téléverse un document source PDF, consulte les relations entre textes (Remplace / Modifie / Abroge / Lié à / Cite), l'historique des versions et le journal de validation. Disposant d'edulex:validate, il utilise le panneau « Validation à partir de sources officielles » : saisie de la source officielle (URL) et d'un commentaire, choix du niveau de vérification V0–V4 et changement du statut via « Appliquer » ; disposant d'edulex:publish, il actionne « Publier (mettre en vigueur) ». Ses droits edulex:update et edulex:manage lui permettent d'éditer le texte."
      },
      {
        "module": "Déposer un texte EduLex (/edulex/texts/new)",
        "what": "Accès complet (edulex:create). Il renseigne le formulaire guidé (Titre officiel, Pays, Type, Ministère émetteur, Secteur, Juridiction, Numéro officiel, dates de signature / publication / entrée en vigueur, Statut initial, Confidentialité, Langue, Résumé analytique, URL source officielle), visualise l'« Aperçu du code » EduLex généré automatiquement en direct, puis soumet via « Déposer le texte ». Le texte est créé au niveau V0 (non vérifié)."
      },
      {
        "module": "Validation EduLex (file) (/edulex/validation)",
        "what": "Accès complet avec pouvoir de statuer (edulex:validate). Il consulte les compteurs « Textes à traiter » et « Non vérifiés (V0) », parcourt la file (titre, code, drapeau pays, statut, niveau) restreinte au pays sélectionné, et clique « Examiner » pour ouvrir la fiche d'un texte et le faire progresser dans le circuit V0 vers V4."
      },
      {
        "module": "Import d'amorçage EduLex (/edulex/import)",
        "what": "Accès complet (edulex:create et edulex:manage). Il choisit le « Pays d'affectation », colle des données CSV / TSV (colonnes attendues : titre, type, numéro officiel, code ministère, code secteur, résumé ; en-tête et séparateur détectés automatiquement), « Prévisualise » les lignes détectées, puis lance « Importer N ligne(s) ». Les textes sont créés au statut « Importé non vérifié » et au niveau V0."
      },
      {
        "module": "Pays & juridictions EduLex (/edulex/countries)",
        "what": "Consultation et gestion (edulex:read et edulex:manage). Il consulte la grille des pays (drapeau, nom, namespace / code, nombre de textes, marqueur inactif) et, grâce à edulex:manage, utilise la carte « Ajouter un pays »."
      },
      {
        "module": "Ministères & gouvernements EduLex (/edulex/ministries)",
        "what": "Consultation et gestion (edulex:read et edulex:manage). Il déclare un gouvernement (« Déclarer un gouvernement », statut piloté par les dates : À venir / En vigueur / Archivé), ajoute un ministère (« Ajouter un ministère ») rattaché à un gouvernement, supprime un gouvernement, et édite ou supprime les ministères unitairement ou par lot dans le tableau (Ministère, Code, Pays, Gouvernement)."
      },
      {
        "module": "Secteurs réglementaires EduLex (/edulex/sectors)",
        "what": "Consultation et gestion (edulex:read et edulex:manage). Il ajoute un secteur (« Ajouter un secteur »), consulte le tableau (Secteur, Code, Pays / International, nombre de Textes) et édite ou supprime les secteurs unitairement ou par lot."
      },
      {
        "module": "Archives (/archives)",
        "what": "Consultation des textes EduLex obsolètes via la colonne « Textes obsolètes » (Abrogé / Remplacé / Suspendu / Archivé), qui renvoie vers la fiche du texte. Note : la vue complète des archives (activités, formulaires, et le corpus au-delà de sa propre organisation) suppose le droit admin:manage, qu'il ne possède pas ; son périmètre y reste donc limité à son organisation."
      },
      {
        "module": "Tableau de bord (/dashboard et Accueil /)",
        "what": "Consultation, accessible à tout utilisateur connecté. La carte « EduLex — récents » (5 textes mis à jour, badge niveau V0–V4, pays) et les KPI « Textes EduLex disponibles » et « Textes à vérifier » lui sont particulièrement utiles pour piloter le référentiel. Le périmètre suit le filtre Pays de la barre supérieure."
      },
      {
        "module": "Accueil public (/)",
        "what": "Page vitrine publique consultable ; le pilier « EduLex — référentiel international » renvoie vers son module de travail."
      },
      {
        "module": "Rendez-vous (/rendez-vous)",
        "what": "Agenda personnel, accessible à tout utilisateur connecté : il y crée, modifie, marque faits et supprime ses propres rendez-vous, avec rappels."
      },
      {
        "module": "Bilan & synthèse (/bilan)",
        "what": "Synthèse personnelle accessible à tout utilisateur : consultation par période (Semaine / Quinzaine / Mois), taux de réalisation et export PDF de son propre bilan."
      },
      {
        "module": "Évaluation (/evaluation)",
        "what": "Score de productivité personnel (0–100) accessible à tout utilisateur, avec évolution sur 4 semaines et « Conseils IA » à la demande."
      },
      {
        "module": "Distinctions & rappels à l'ordre (/distinctions)",
        "what": "Consultation de ses propres distinctions trimestrielles et de celles de ses éventuels subordonnés ; la vue globale sur tous les agents actifs relève du super-administrateur de gouvernance et non des permissions EduLex de ce rôle."
      },
      {
        "module": "Mon profil (/account)",
        "what": "Page personnelle accessible à tout utilisateur : photo de profil, consultation de ses rôles (dont edulex_super_admin), choix du type de profil et des préférences associées."
      },
      {
        "module": "Notifications (/notifications)",
        "what": "Centre de notifications personnel : il y reçoit notamment les publications EduLex et autres échéances, marque les notifications lues et suit leurs liens."
      },
      {
        "module": "Paramètres (/parametres)",
        "what": "Préférences personnelles : période de bilan par défaut et activation des rappels de rendez-vous."
      },
      {
        "module": "EduLex Academy (/academy et sous-pages)",
        "what": "Consultation citoyenne uniquement. Ce rôle ne possède pas academy:manage : il parcourt les parcours, leçons, badges et classement comme apprenant, mais ne voit ni n'actionne les boutons de génération des modules d'évaluation ni l'administration des questions."
      },
      {
        "module": "Mot de passe oublié / Réinitialiser (/mot-de-passe-oublie, /reinitialiser-mot-de-passe)",
        "what": "Auto-dépannage de connexion, accessible à tout utilisateur : demande d'un lien de réinitialisation (valable 1 heure, usage unique) et définition d'un nouveau mot de passe."
      }
    ],
    "workflows": [
      {
        "title": "Déposer un nouveau texte réglementaire (création en V0)",
        "steps": [
          "Dans la barre supérieure, sélectionnez le Pays concerné pour cadrer le dépôt.",
          "Ouvrez le module « EduLex », puis cliquez sur « Déposer un texte ».",
          "Renseignez les champs obligatoires : « Titre officiel * », « Pays * » et « Type * » (Décret, Loi, Ordonnance, Arrêté, Convention internationale, etc.).",
          "Complétez « Ministère émetteur », « Secteur », « Juridiction » et « Numéro officiel », puis vérifiez l'« Aperçu du code » EduLex qui se met à jour en direct.",
          "Saisissez « Date de signature », « Date de publication » et « Entrée en vigueur », puis choisissez « Statut initial », « Confidentialité » (Public / Restreint / Confidentiel) et « Langue » (Français / Anglais).",
          "Renseignez le « Résumé analytique » et l'« URL source officielle ».",
          "Cliquez sur « Déposer le texte ». Le texte est créé au niveau V0 (non vérifié) et doit suivre le circuit de validation."
        ]
      },
      {
        "title": "Faire progresser un texte de V0 vers un niveau supérieur (ex. V3)",
        "steps": [
          "Ouvrez « EduLex » puis cliquez sur « File de validation » (ou ouvrez la fiche du texte depuis sa carte).",
          "Sur la fiche du texte (/edulex/texts/[id]), repérez le panneau « Validation à partir de sources officielles ».",
          "Renseignez la « Source officielle (URL) » qui justifie la vérification, puis ajoutez un commentaire de contrôle.",
          "Dans « Niveau de vérification », sélectionnez le niveau cible (par exemple V3).",
          "Si nécessaire, ajustez le « Statut du texte » dans le même panneau, puis cliquez sur « Appliquer » pour enregistrer le nouveau niveau et le statut.",
          "Vérifiez dans le « Journal de validation » que la progression et la traçabilité « Validé par » sont bien enregistrées."
        ]
      },
      {
        "title": "Mettre un texte en vigueur (publication)",
        "steps": [
          "Assurez-vous au préalable que le texte a atteint un niveau de vérification suffisant et que sa source officielle est documentée.",
          "Ouvrez la fiche du texte (/edulex/texts/[id]).",
          "Dans le panneau de validation, cliquez sur « Publier (mettre en vigueur) » — action permise par votre permission edulex:publish.",
          "Vérifiez que le badge Statut passe à « En vigueur » et que l'avertissement « Ce texte n'est pas en vigueur » a disparu.",
          "Contrôlez la prise en compte dans le KPI « En vigueur » sur la page EduLex."
        ]
      },
      {
        "title": "Importer un lot de textes par amorçage CSV/TSV",
        "steps": [
          "Ouvrez « EduLex » puis cliquez sur le lien « Import d'amorçage ».",
          "Choisissez le « Pays d'affectation » des textes à importer.",
          "Collez vos « Données CSV / TSV collées » en respectant les colonnes attendues (titre, type, numéro officiel, code ministère, code secteur, résumé) ; l'en-tête et le séparateur (virgule, point-virgule ou tabulation) sont détectés automatiquement.",
          "Cliquez sur « Prévisualiser » et vérifiez la table des lignes détectées (Titre / Type / N° / Min. / Sect.).",
          "Cliquez sur « Importer N ligne(s) ». Les textes sont créés au statut « Importé non vérifié » et au niveau V0.",
          "Suivez le lien « Voir EduLex → » puis traitez ces entrées via la « File de validation »."
        ]
      },
      {
        "title": "Enrichir les référentiels d'appui (pays, gouvernement, ministère, secteur)",
        "steps": [
          "Pour un pays manquant : ouvrez « EduLex » → « Pays », puis utilisez la carte « Ajouter un pays ».",
          "Pour un nouvel émetteur : ouvrez « EduLex » → « Ministères », utilisez « Déclarer un gouvernement » (en précisant la date d'entrée en vigueur) puis « Ajouter un ministère » rattaché à ce gouvernement.",
          "Pour un domaine de classification : ouvrez « EduLex » → « Secteurs » et utilisez « Ajouter un secteur » (rattaché à un pays ou marqué International).",
          "Mettez à jour ou supprimez les entrées obsolètes via les tableaux (édition unitaire ou suppression par lot).",
          "Vérifiez ensuite que ces référentiels sont bien proposés lors du dépôt d'un texte."
        ]
      },
      {
        "title": "Archiver un texte obsolète et tracer ses relations",
        "steps": [
          "Ouvrez la fiche du texte concerné (/edulex/texts/[id]).",
          "Dans le panneau de validation, changez le « Statut du texte » vers un statut d'obsolescence (Abrogé, Remplacé, Suspendu ou Archivé) puis cliquez sur « Appliquer ».",
          "Documentez les relations du texte (Remplace / Modifie / Abroge / Lié à / Cite) afin de conserver la cohérence du référentiel.",
          "Vérifiez que le texte apparaît dans la vue « Archives » (colonne « Textes obsolètes ») et qu'il n'est plus compté parmi les textes « En vigueur »."
        ]
      },
      {
        "title": "Rechercher et auditer l'état du référentiel d'un pays",
        "steps": [
          "Sélectionnez le Pays voulu dans la barre supérieure.",
          "Ouvrez « EduLex » et lisez les 4 KPI (Total, En vigueur, À vérifier, Certifiés V4) pour mesurer la qualité du référentiel.",
          "Utilisez le champ « Rechercher par mot-clé… » puis affinez avec les filtres Catégorie / Statut / Type / Niveau.",
          "Ouvrez la « File de validation » pour repérer les textes encore non vérifiés (V0) à traiter en priorité.",
          "Ouvrez les fiches concernées pour vérifier sources, niveaux et journaux de validation, et planifiez les vérifications à mener."
        ]
      }
    ],
    "tips": [
      "Avant tout dépôt, import ou vérification, sélectionnez le bon Pays dans la barre supérieure : EduLex restreint l'affichage et la file de validation au pays choisi.",
      "Tout texte fraîchement déposé ou importé naît en V0 (non vérifié) : traitez-le rapidement via la « File de validation » pour réduire le KPI « À vérifier ».",
      "Renseignez systématiquement une « Source officielle (URL) » et un commentaire dans le panneau de validation : ils alimentent le « Journal de validation » et la traçabilité « Validé par ».",
      "Réservez la « Publication (mise en vigueur) » aux textes dont le niveau de vérification et les sources sont solides : c'est l'acte qui rend le texte officiellement en vigueur dans la plateforme.",
      "Pour les imports de masse, passez toujours par « Prévisualiser » avant « Importer » afin de corriger les colonnes mal alignées avant la création des textes.",
      "Tenez les référentiels d'appui (gouvernements, ministères, secteurs) à jour : ils conditionnent la qualité de la codification automatique et le rattachement correct des textes.",
      "Surveillez le KPI « Certifiés V4 » sur la page EduLex pour piloter la montée en qualité globale du corpus réglementaire.",
      "Documentez les relations entre textes (Remplace / Abroge / Modifie) au moment d'archiver un texte, pour garder un référentiel cohérent et navigable."
    ],
    "limits": [
      "Il ne gère ni l'organigramme ni les structures et organisations : la création, la modification, le glisser-déposer et la suppression dans /organization sont réservés aux détenteurs d'organization:manage.",
      "Il ne gère pas les comptes utilisateurs : créer, importer, modifier, désactiver, réinitialiser un mot de passe ou déléguer des droits dans /users requiert user:manage, qu'il ne possède pas.",
      "Il ne conçoit pas de formulaires de saisie (/forms) : cela nécessite form:manage.",
      "Il ne crée, ne modifie ni ne valide d'activités ou contributions (/activities, /validation) : cela relève d'activity:create / update / validate, hors de son périmètre.",
      "Il ne génère ni ne gère de rapports institutionnels (/reports) : la création et la gestion exigent report:create / manage.",
      "Il n'administre pas EduLex Academy : générer les modules d'évaluation et gérer les questions de quiz requiert academy:manage ; il n'accède à Academy qu'en consultation citoyenne.",
      "Il ne configure pas la plateforme via l'espace Administration (/admin) ni n'édite la hiérarchie de validation : ces actions requièrent admin:read / manage ou organization:manage, qu'il ne possède pas.",
      "Il ne valide pas les demandes d'absence d'autres agents et ne règle pas la politique d'absences : cela dépend du lien hiérarchique (supérieur / managerId), indépendant de ses permissions EduLex.",
      "Il ne dispose pas d'admin:manage : son périmètre dans les vues partagées (Archives, et de manière générale les données affichées au-delà d'une seule organisation) reste limité ; côté EduLex, son action reste par ailleurs cadrée par le filtre Pays de la barre supérieure."
    ]
  },
  {
    "roleKey": "edulex_country_admin",
    "tagline": "Responsable national du référentiel réglementaire EduLex : il dépose, importe, vérifie, certifie et met en vigueur les textes officiels de son pays, du niveau brut V0 jusqu'à la certification V4.",
    "intro": "L'Administrateur pays (EduLex) est le responsable national du référentiel réglementaire EduLex. Son périmètre est strictement centré sur EduLex : il pilote l'intégralité du cycle de vie des textes (lois, décrets, arrêtés, conventions…) de son pays, depuis le dépôt et l'import en masse jusqu'à la validation V0→V4 et la mise en vigueur. Il administre également les référentiels structurants d'EduLex (pays, gouvernements et ministères émetteurs, secteurs réglementaires). Il ne dispose en revanche d'aucun droit sur la gouvernance administrative générale (organisations, comptes utilisateurs, formulaires, activités, rapports) ni sur l'administration d'EduLex Academy, qui relèvent d'autres rôles.",
    "access": [
      {
        "module": "Tableau de bord (/dashboard et Accueil /)",
        "what": "Consultez votre vue d'ensemble personnalisée à la connexion. Pour votre périmètre, les cartes les plus pertinentes sont les KPI « Textes EduLex disponibles » et « Textes à vérifier » (statut « à vérifier » ou niveau V0), ainsi que la carte « EduLex — récents » listant les 5 derniers textes mis à jour (code, badge de niveau V0–V4, pays) avec un lien direct vers chaque fiche /edulex/texts/{id}. Le périmètre des données suit le filtre Pays sélectionné dans la barre supérieure. Les cartes d'activités, d'absences et de parrainage restent affichées mais ne relèvent pas de votre rôle."
      },
      {
        "module": "EduLex — référentiel réglementaire (/edulex)",
        "what": "C'est votre cœur de métier. Vous consultez les 4 KPI (« Textes au total », « En vigueur », « À vérifier (V0 / à vérifier) », « Certifiés V4 »), recherchez par mot-clé et filtrez par Catégorie, Statut, Type et Niveau. Disposant de edulex:create, vous voyez le bouton « Déposer un texte » ; disposant de edulex:validate, vous voyez « File de validation » ; disposant de edulex:manage, vous accédez aux liens de référentiel « Pays », « Ministères », « Secteurs » et « Import d'amorçage ». Vous ouvrez chaque fiche de texte via sa carte. Le périmètre est restreint au pays sélectionné dans la barre supérieure."
      },
      {
        "module": "Fiche d'un texte EduLex (/edulex/texts/[id])",
        "what": "Vous disposez d'un accès complet : lecture des badges (Type, Statut, Niveau V0→V4, Confidentialité), téléchargement (PDF, Markdown, source officielle), et — grâce à edulex:update — téléversement d'un document source PDF. Grâce à edulex:validate, vous utilisez le panneau « Validation à partir de sources officielles » : saisie de la source officielle (URL) et d'un commentaire, choix du niveau de vérification (V0–V4), changement de statut via « Appliquer ». Grâce à edulex:publish, vous utilisez « Publier (mettre en vigueur) ». Vous consultez les relations entre textes (Remplace / Modifie / Abroge / Lié à / Cite), l'historique des versions, le journal de validation et la traçabilité « Déposé par / Validé par »."
      },
      {
        "module": "Déposer un texte EduLex (/edulex/texts/new)",
        "what": "Grâce à edulex:create, vous créez un nouveau texte via le formulaire guidé : aperçu du code EduLex généré automatiquement en direct, saisie du titre officiel, pays, type, ministère émetteur, secteur, juridiction, numéro officiel, dates (signature, publication, entrée en vigueur), statut initial, confidentialité, langue, résumé analytique et URL source officielle. Le texte est créé au niveau V0 (non vérifié) et entre dans le circuit de validation."
      },
      {
        "module": "Validation EduLex — file (/edulex/validation)",
        "what": "Grâce à edulex:validate, vous accédez à la file des textes à faire progresser dans le circuit V0→V4 (statuts En attente / À vérifier / Importé non vérifié / Brouillon). Vous consultez les compteurs « Textes à traiter » et « Non vérifiés (V0) », parcourez la liste (titre, code, drapeau pays, statut, niveau) et cliquez « Examiner » pour ouvrir la fiche et statuer. La file est restreinte au pays sélectionné."
      },
      {
        "module": "Import d'amorçage EduLex (/edulex/import)",
        "what": "Grâce à edulex:create et edulex:manage, vous importez des textes en masse : choix du pays d'affectation, collage de données CSV/TSV (colonnes attendues titre, type, numéro officiel, code ministère, code secteur, résumé), prévisualisation des lignes détectées, puis « Importer N ligne(s) ». Les textes sont créés au statut « Importé non vérifié » et au niveau V0."
      },
      {
        "module": "Pays & juridictions EduLex (/edulex/countries)",
        "what": "Grâce à edulex:manage, vous consultez la grille des pays (drapeau, nom, namespace/code, nombre de textes, marqueur inactif) et pouvez ajouter un pays via la carte « Ajouter un pays »."
      },
      {
        "module": "Ministères & gouvernements EduLex (/edulex/ministries)",
        "what": "Grâce à edulex:manage, vous gérez les émetteurs : déclarer un gouvernement (« Déclarer un gouvernement »), ajouter un ministère (« Ajouter un ministère »), supprimer un gouvernement, et éditer/supprimer les ministères unitairement ou par lot. Vous visualisez les gouvernements par pays avec leur badge de statut (À venir / En vigueur / Archivé), leur date d'entrée en vigueur et leur nombre de ministères."
      },
      {
        "module": "Secteurs réglementaires EduLex (/edulex/sectors)",
        "what": "Grâce à edulex:manage, vous ajoutez un secteur (« Ajouter un secteur »), consultez le tableau des secteurs (Secteur, Code, Pays/International, nombre de Textes) et éditez ou supprimez un secteur, unitairement ou par lot."
      },
      {
        "module": "Archives (/archives)",
        "what": "Vous pouvez consulter la colonne « Textes obsolètes » (Abrogé / Remplacé / Suspendu / Archivé) et ouvrir chaque fiche EduLex concernée. Sans droit admin:manage, le périmètre des archives est limité à votre organisation ; les colonnes Activités et Formulaires ne relèvent pas de votre rôle."
      },
      {
        "module": "Notifications (/notifications)",
        "what": "Vous recevez et consultez vos notifications in-app, notamment les publications EduLex et les échéances de validation. Cliquez une notification pour la marquer lue et suivre son lien, ou utilisez « Tout marquer comme lu »."
      },
      {
        "module": "Mon profil (/account)",
        "what": "Vous gérez votre compte personnel : avatar (« Changer la photo »), consultation de vos rôles, e-mail, organisation et pays, et choix du type de profil qui adapte la terminologie de l'interface."
      },
      {
        "module": "Paramètres (/parametres)",
        "what": "Vous réglez vos préférences personnelles : période de bilan par défaut et activation des rappels de rendez-vous."
      },
      {
        "module": "Modules personnels (Rendez-vous, Bilan, Évaluation, Distinctions)",
        "what": "Ces modules (agenda personnel, synthèse de réalisation, score de productivité, récompenses trimestrielles) restent accessibles à tout utilisateur connecté pour son propre suivi, mais ne font pas partie de vos responsabilités EduLex."
      }
    ],
    "workflows": [
      {
        "title": "Déposer un nouveau texte réglementaire",
        "steps": [
          "Sélectionnez votre pays dans le filtre Pays de la barre supérieure pour cadrer le périmètre.",
          "Ouvrez le module EduLex (/edulex), puis cliquez sur « Déposer un texte ».",
          "Vérifiez l'« Aperçu du code » EduLex qui se génère automatiquement et se met à jour en direct au fil de votre saisie.",
          "Renseignez les champs obligatoires : « Titre officiel * », « Pays * » et « Type * » (Décret, Loi, Ordonnance, Arrêté, Convention internationale…).",
          "Complétez les métadonnées : « Ministère émetteur », « Secteur », « Juridiction », « Numéro officiel ».",
          "Saisissez les dates (« Date de signature », « Date de publication », « Entrée en vigueur »), puis choisissez « Statut initial », « Confidentialité » et « Langue ».",
          "Renseignez le « Résumé analytique » et l'« URL source officielle ».",
          "Cliquez sur « Déposer le texte ». Le texte est créé au niveau V0 (non vérifié) et entre dans le circuit de validation."
        ]
      },
      {
        "title": "Importer des textes en masse (amorçage CSV/TSV)",
        "steps": [
          "Depuis EduLex (/edulex), cliquez sur le lien de référentiel « Import d'amorçage » (/edulex/import).",
          "Choisissez le « Pays d'affectation ».",
          "Collez vos données dans « Données CSV / TSV collées » en respectant les colonnes attendues : titre, type, numéro officiel, code ministère, code secteur, résumé (séparateur virgule, point-virgule ou tabulation ; l'en-tête est détecté automatiquement).",
          "Cliquez sur « Prévisualiser » et contrôlez la table des lignes détectées (Titre / Type / N° / Min. / Sect.).",
          "Cliquez sur « Importer N ligne(s) ». Les textes sont créés au statut « Importé non vérifié » et au niveau V0.",
          "Suivez le lien « Voir EduLex → » pour retrouver les textes importés, qui devront ensuite passer par la file de validation."
        ]
      },
      {
        "title": "Faire progresser un texte de V0 vers un niveau supérieur (ex. V3)",
        "steps": [
          "Ouvrez la file via le bouton « File de validation » d'EduLex (/edulex/validation), restreinte à votre pays.",
          "Repérez le texte à traiter dans la liste (titre, code, drapeau, statut, niveau) et cliquez sur « Examiner » pour ouvrir sa fiche.",
          "Dans le panneau « Validation à partir de sources officielles », renseignez la « Source officielle (URL) » et un commentaire justifiant la vérification.",
          "Sélectionnez le « Niveau de vérification » cible (par exemple V3) après avoir confronté le contenu du texte à la source officielle.",
          "Si nécessaire, ajustez le « Statut du texte », puis cliquez sur « Appliquer » pour enregistrer le nouveau niveau et le commentaire.",
          "Vérifiez dans le « Journal de validation » que l'opération est bien tracée à votre nom (« Validé par »)."
        ]
      },
      {
        "title": "Certifier (V4) puis mettre un texte en vigueur",
        "steps": [
          "Ouvrez la fiche du texte concerné (/edulex/texts/[id]), idéalement déjà validé à un niveau élevé.",
          "Assurez-vous d'avoir téléversé ou consulté le document source PDF de référence (« Téléverser un document source (PDF) » si besoin).",
          "Dans le panneau « Validation à partir de sources officielles », fixez le « Niveau de vérification » sur V4, avec une source officielle (URL) et un commentaire, puis cliquez sur « Appliquer ».",
          "Cliquez sur « Publier (mettre en vigueur) » pour rendre le texte officiellement en vigueur.",
          "Contrôlez que les avertissements « Ce texte est au niveau V0 : entrée non vérifiée » et « Ce texte n'est pas en vigueur » ont bien disparu de la fiche.",
          "Vérifiez la traçabilité finale (« Déposé par » / « Validé par ») et l'historique des versions."
        ]
      },
      {
        "title": "Déclarer un gouvernement et ses ministères émetteurs",
        "steps": [
          "Depuis EduLex (/edulex), ouvrez le lien de référentiel « Ministères » (/edulex/ministries).",
          "Dans la carte « Déclarer un gouvernement », renseignez le gouvernement et sa date d'entrée en vigueur (le statut À venir / En vigueur / Archivé se calcule selon les dates).",
          "Dans la carte « Ajouter un ministère », créez chaque ministère émetteur en l'associant au pays et au gouvernement concernés.",
          "Vérifiez le tableau des ministères (Ministère, Code, Pays, Gouvernement) et corrigez au besoin via l'édition unitaire ou par lot.",
          "Supprimez un gouvernement obsolète via son bouton de suppression si nécessaire."
        ]
      },
      {
        "title": "Gérer le référentiel des secteurs et des pays",
        "steps": [
          "Pour les secteurs, ouvrez « Secteurs » depuis EduLex (/edulex/sectors) et utilisez la carte « Ajouter un secteur », en le rattachant à un pays ou en le marquant « International ».",
          "Contrôlez le tableau des secteurs (Secteur, Code, Pays/International, nombre de Textes) et éditez ou supprimez les entrées erronées (unitairement ou par lot).",
          "Pour les pays, ouvrez « Pays » depuis EduLex (/edulex/countries) ; consultez la grille (drapeau, code, namespace, nombre de textes) et ajoutez un pays manquant via la carte « Ajouter un pays »."
        ]
      },
      {
        "title": "Vérifier l'état de couverture du référentiel de son pays",
        "steps": [
          "Sélectionnez votre pays dans le filtre Pays de la barre supérieure.",
          "Sur le tableau de bord, lisez les KPI « Textes EduLex disponibles » et « Textes à vérifier » pour mesurer le volume restant à traiter.",
          "Ouvrez EduLex (/edulex) et examinez les 4 KPI : « Textes au total », « En vigueur », « À vérifier (V0 / à vérifier) », « Certifiés V4 ».",
          "Utilisez les filtres Statut et Niveau pour isoler les textes en V0 ou « à vérifier » et planifier votre travail de validation.",
          "Consultez le module Archives (/archives) pour identifier les textes obsolètes (Abrogé / Remplacé / Suspendu / Archivé) à signaler ou à remplacer."
        ]
      }
    ],
    "tips": [
      "Sélectionnez toujours votre pays dans le filtre de la barre supérieure avant de travailler : EduLex, la file de validation et les KPI sont tous restreints au pays actif.",
      "Un texte fraîchement déposé ou importé est en V0 (non vérifié) : ne le considérez jamais comme fiable tant qu'il n'a pas franchi le circuit de validation à partir d'une source officielle.",
      "Renseignez systématiquement la « Source officielle (URL) » et un commentaire dans le panneau de validation : c'est ce qui rend la progression V0→V4 traçable et auditable.",
      "Pour les gros volumes (amorçage d'un nouveau pays ou d'une législature), préférez l'« Import d'amorçage » CSV/TSV au dépôt unitaire, puis traitez la file de validation par lots.",
      "Déclarez les gouvernements et ministères AVANT de déposer les textes : vous pourrez ainsi rattacher chaque texte à son ministère émetteur dès le dépôt.",
      "Ne publiez (« mettre en vigueur ») qu'un texte dûment vérifié : la publication retire les avertissements et le rend visible comme texte de référence, y compris pour les modules de formation et les rapports d'autres rôles.",
      "Surveillez le KPI « À vérifier (V0) » du tableau de bord et de la page EduLex : c'est votre indicateur de dette de vérification à résorber.",
      "Utilisez le centre de Notifications pour réagir rapidement aux échéances de validation et aux publications EduLex."
    ],
    "limits": [
      "Vous ne pouvez pas gérer les organisations ni les structures de l'organigramme (réservé à organization:manage).",
      "Vous ne pouvez pas créer, modifier, importer ni supprimer de comptes utilisateurs, ni leur attribuer des rôles ou déléguer des droits (réservé à user:manage).",
      "Vous ne pouvez pas concevoir ni publier de formulaires de saisie (réservé à form:manage).",
      "Vous n'avez aucun droit sur les activités/contributions : ni création, ni modification, ni validation hiérarchique, ni consolidation (réservé aux rôles activity:*). La file de Validation hiérarchique (/validation) ne fait pas partie de vos attributions.",
      "Vous ne pouvez pas générer, exporter ni gérer les rapports institutionnels (réservé aux rôles report:*).",
      "Vous n'administrez pas EduLex Academy : vous ne créez pas de questions de quiz, ne gérez pas leur statut et ne générez pas les modules d'évaluation (réservé à academy:manage). N'ayant pas non plus academy:read, vous ne suivez pas les parcours comme apprenant, sauf si ce droit vous est accordé séparément.",
      "Vous n'accédez pas à l'espace d'Administration de la plateforme : statistiques globales, éditeur de la hiérarchie de validation et journaux d'audit (réservé à admin:read / admin:manage / organization:manage).",
      "Votre périmètre est limité au pays sélectionné et, hors EduLex, à votre propre organisation : faute de admin:manage, vous ne voyez pas au-delà (les Archives, par exemple, restent limitées à votre organisation).",
      "Les absences relèvent du lien hiérarchique (demande pour soi, validation par le supérieur) et non d'une permission EduLex : ce module n'entre pas dans vos attributions de rôle."
    ]
  },
  {
    "roleKey": "edulex_ministry_admin",
    "tagline": "Constituer, vérifier et fiabiliser le référentiel réglementaire EduLex de son ministère, du dépôt d'un texte jusqu'à sa certification.",
    "intro": "L'Administrateur ministériel (EduLex) est le responsable documentaire du référentiel réglementaire EduLex au sein de son ministère technique. Il dépose les nouveaux textes (lois, décrets, arrêtés, conventions, etc.), renseigne leurs métadonnées, met à jour les fiches existantes et fait progresser les textes dans le circuit de vérification (niveaux V0 à V4) à partir de sources officielles. Son périmètre est strictement limité à EduLex : il ne gère ni les activités, ni les comptes utilisateurs, ni l'Academy. Les données qu'il manipule restent encadrées par le filtre Pays sélectionné dans la barre supérieure.",
    "access": [
      {
        "module": "Tableau de bord (/dashboard)",
        "what": "Consultez votre vue d'ensemble à la connexion. Pour votre rôle, les blocs utiles sont les deux KPI EduLex « Textes EduLex disponibles » et « Textes à vérifier » (statut « à vérifier » ou niveau V0), ainsi que la carte « EduLex — récents » qui liste les 5 derniers textes mis à jour (code, badge de niveau V0–V4, pays) avec un lien direct vers chaque fiche (/edulex/texts/{id}). Le périmètre des données suit le filtre Pays de la barre supérieure. Les autres cartes (parrainage, demandes d'absence, KPI et graphiques d'activités/rapports) restent affichées mais ne relèvent pas de vos attributions."
      },
      {
        "module": "Accueil — page publique (/)",
        "what": "Page vitrine accessible avant connexion : présentation des trois piliers et accès au pilier « EduLex — référentiel international ». Sert d'entrée vers /login. Aucune action de gestion ici. Une fois connecté, l'entrée « Accueil » de la navigation latérale mène à votre tableau de bord."
      },
      {
        "module": "EduLex — référentiel réglementaire (/edulex)",
        "what": "C'est votre écran central. Vous consultez les 4 KPI (« Textes au total », « En vigueur », « À vérifier (V0 / à vérifier) », « Certifiés V4 »), recherchez par mot-clé (titre, code, numéro officiel, résumé, tags) et filtrez par Catégorie, Statut, Type et Niveau (boutons « Filtrer » et « Réinitialiser »). Grâce à edulex:create, le bouton « Déposer un texte » (vers /edulex/texts/new) vous est ouvert ; grâce à edulex:validate, le bouton « File de validation » (vers /edulex/validation) l'est également. Vous ouvrez n'importe quelle fiche via sa carte (badge type/statut, niveau de vérification, drapeau pays). Des liens de référentiel (« Pays », « Ministères », « Secteurs », « Import d'amorçage ») peuvent figurer dans cette page, mais les écrans qu'ils ouvrent exigent edulex:manage que vous n'avez pas : ils ne vous sont pas réellement exploitables."
      },
      {
        "module": "Fiche d'un texte EduLex (/edulex/texts/[id])",
        "what": "Vous lisez l'intégralité d'une fiche : badges Type, Statut, Niveau de vérification (V0→V4) et Confidentialité (Public/Restreint/Confidentiel), avertissements (« Ce texte est au niveau V0 : entrée non vérifiée », « Ce texte n'est pas en vigueur »), téléchargements (« Télécharger (PDF) », « Markdown », « Consulter la source officielle »), relations entre textes (Remplace / Modifie / Abroge / Lié à / Cite), « Historique des versions » et « Journal de validation ». Avec edulex:update, vous éditez les métadonnées et téléversez un document source PDF (« Téléverser un document source (PDF) »). Avec edulex:validate, vous disposez du panneau « Validation à partir de sources officielles » : vous saisissez une « Source officielle (URL) » et un commentaire, choisissez le « Niveau de vérification » (V0–V4) et changez le « Statut du texte » via « Appliquer ». Le bouton « Publier (mettre en vigueur) » requiert edulex:publish, que vous n'avez PAS : la mise en vigueur ne vous est pas ouverte."
      },
      {
        "module": "Déposer un texte EduLex (/edulex/texts/new)",
        "what": "Avec edulex:create, vous créez un nouveau texte. L'« Aperçu du code » EduLex se génère et se met à jour en direct. Vous renseignez les champs obligatoires (« Titre officiel * », « Pays * », « Type * ») puis les champs complémentaires (Ministère émetteur, Secteur, Juridiction, Numéro officiel, dates de signature/publication/entrée en vigueur, Statut initial, Confidentialité, Langue, Résumé analytique, URL source officielle). Vous soumettez via « Déposer le texte » : le texte est créé au niveau V0 (non vérifié) et entre dans le circuit de validation."
      },
      {
        "module": "Validation EduLex — file (/edulex/validation)",
        "what": "Avec edulex:validate, vous accédez à la file des textes à vérifier (statuts En attente / À vérifier / Importé non vérifié / Brouillon, niveaux V0–V2), restreinte au pays sélectionné. Vous lisez les compteurs « Textes à traiter » et « Non vérifiés (V0) », parcourez la liste (titre, code, drapeau, statut, niveau) et cliquez « Examiner » pour ouvrir la fiche et statuer."
      },
      {
        "module": "Notifications (/notifications)",
        "what": "Centre de notifications in-app, accessible à tout utilisateur connecté. Vous y retrouvez notamment les publications EduLex et les échéances qui vous concernent. Listez vos 50 dernières notifications (titre, corps, date, pastille lu/non lu), cliquez sur l'une d'elles pour la marquer lue et suivre son lien, ou utilisez « Tout marquer comme lu »."
      }
    ],
    "workflows": [
      {
        "title": "Déposer un nouveau texte réglementaire dans EduLex",
        "steps": [
          "Dans la barre supérieure, sélectionnez le Pays concerné pour cadrer votre saisie.",
          "Ouvrez le module « EduLex — référentiel réglementaire » (/edulex).",
          "Cliquez sur « Déposer un texte » pour ouvrir le formulaire /edulex/texts/new.",
          "Renseignez les champs obligatoires : « Titre officiel * », « Pays * » et « Type * » (Décret, Loi, Ordonnance, Arrêté, Convention internationale, etc.). Vérifiez l'« Aperçu du code » EduLex qui se met à jour en direct.",
          "Complétez « Ministère émetteur », « Secteur », « Juridiction » et « Numéro officiel ».",
          "Saisissez les dates (« Date de signature », « Date de publication », « Entrée en vigueur »), puis « Statut initial », « Confidentialité » (Public/Restreint/Confidentiel) et « Langue » (Français/Anglais).",
          "Rédigez le « Résumé analytique » et collez l'« URL source officielle ».",
          "Cliquez sur « Déposer le texte ». Le texte est enregistré au niveau V0 (non vérifié) et entre dans le circuit de validation."
        ]
      },
      {
        "title": "Corriger ou enrichir les métadonnées d'un texte existant",
        "steps": [
          "Depuis /edulex, recherchez le texte par mot-clé (titre, code, numéro officiel, résumé, tags) ou repérez-le via la carte « EduLex — récents » du tableau de bord.",
          "Ouvrez sa fiche (/edulex/texts/[id]).",
          "Vérifiez les badges et avertissements (« Ce texte est au niveau V0 : entrée non vérifiée », « Ce texte n'est pas en vigueur ») pour identifier ce qui doit être corrigé.",
          "Grâce à votre droit edulex:update, modifiez les métadonnées erronées ou incomplètes (type, numéro officiel, dates, secteur, résumé, etc.).",
          "Si vous disposez d'un PDF officiel, utilisez « Téléverser un document source (PDF) » pour l'attacher à la fiche.",
          "Enregistrez vos modifications et vérifiez qu'elles apparaissent bien dans la fiche et dans l'« Historique des versions »."
        ]
      },
      {
        "title": "Traiter la file de validation EduLex",
        "steps": [
          "Sélectionnez au préalable le Pays dans la barre supérieure : la file est restreinte à ce pays.",
          "Dans /edulex, cliquez sur « File de validation » (ou ouvrez directement /edulex/validation).",
          "Consultez les compteurs « Textes à traiter » et « Non vérifiés (V0) » pour mesurer la charge.",
          "Parcourez la liste (titre, code, drapeau, statut, niveau de vérification) et repérez les textes prioritaires (V0 / à vérifier).",
          "Cliquez sur « Examiner » en face d'un texte pour ouvrir sa fiche et procéder à la vérification."
        ]
      },
      {
        "title": "Faire progresser un texte d'un niveau de vérification (ex. V0 vers V2)",
        "steps": [
          "Ouvrez la fiche du texte concerné (/edulex/texts/[id]).",
          "Localisez le panneau « Validation à partir de sources officielles » (visible grâce à edulex:validate).",
          "Renseignez la « Source officielle (URL) » qui justifie la vérification et ajoutez un commentaire traçant le contrôle effectué.",
          "Choisissez le nouveau « Niveau de vérification » dans la liste (V0–V4) en cohérence avec la qualité de la source consultée.",
          "Si nécessaire, ajustez le « Statut du texte ».",
          "Cliquez sur « Appliquer » pour enregistrer la progression de niveau et la décision.",
          "Vérifiez que le « Journal de validation » enregistre bien votre intervention et que la traçabilité « Validé par » est mise à jour."
        ]
      },
      {
        "title": "Vérifier un texte importé ou en V0 et le fiabiliser",
        "steps": [
          "Depuis /edulex/validation, ouvrez un texte au statut « Importé non vérifié » ou au niveau V0 via « Examiner ».",
          "Lisez l'avertissement « Ce texte est au niveau V0 : entrée non vérifiée » et téléchargez la source (« Consulter la source officielle », « Télécharger (PDF) »).",
          "Contrôlez les métadonnées (titre, type, numéro officiel, dates) face au document officiel ; corrigez-les si besoin grâce à votre droit edulex:update.",
          "Dans le panneau « Validation à partir de sources officielles », saisissez l'URL de la source et un commentaire, puis relevez le « Niveau de vérification » (par ex. V0 vers V1 ou V2).",
          "Cliquez sur « Appliquer ».",
          "Si le texte doit être mis en vigueur, transmettez-le à un profil disposant de edulex:publish : la publication ne vous est pas ouverte."
        ]
      },
      {
        "title": "Suivre l'état de fiabilité du référentiel depuis le tableau de bord",
        "steps": [
          "Ouvrez le tableau de bord (/dashboard).",
          "Lisez le KPI « Textes EduLex disponibles » pour le volume total et le KPI « Textes à vérifier » pour la charge restante (statut « à vérifier » ou niveau V0).",
          "Consultez la carte « EduLex — récents » et cliquez sur un texte (code + badge de niveau V0–V4) pour ouvrir directement sa fiche.",
          "Au besoin, basculez vers /edulex pour affiner avec les filtres Catégorie / Statut / Type / Niveau et planifier les textes à traiter en priorité."
        ]
      }
    ],
    "tips": [
      "Sélectionnez toujours le bon Pays dans la barre supérieure avant de déposer ou de vérifier un texte : tous les écrans EduLex (référentiel, file de validation) sont filtrés par ce périmètre.",
      "Renseignez systématiquement une « URL source officielle » fiable lors du dépôt : elle conditionne ensuite votre capacité à justifier la montée en niveau de vérification.",
      "N'attribuez un niveau élevé (V3, V4) qu'avec une source officielle solide à l'appui, et documentez toujours le commentaire du panneau de validation pour assurer la traçabilité « Validé par ».",
      "Surveillez le KPI « Textes à vérifier » du tableau de bord et le compteur « Non vérifiés (V0) » de la file pour prioriser le traitement et éviter l'accumulation d'entrées non vérifiées.",
      "Avant de relever un niveau, contrôlez les métadonnées (type, numéro officiel, dates) face au document source et corrigez-les grâce à votre droit de mise à jour : une fiche propre fiabilise toute la chaîne.",
      "Téléversez le document source en PDF sur la fiche dès que vous le possédez : cela facilite les contrôles ultérieurs et la consultation par les autres acteurs."
    ],
    "limits": [
      "Vous ne pouvez pas mettre un texte en vigueur : le bouton « Publier (mettre en vigueur) » exige la permission edulex:publish, que vous n'avez pas.",
      "Vous ne pouvez pas archiver de texte (edulex:archive non accordé), ni importer en masse via /edulex/import (l'import d'amorçage requiert edulex:manage).",
      "Vous n'accédez pas aux référentiels de gestion EduLex : « Pays & juridictions » (/edulex/countries), « Ministères & gouvernements » (/edulex/ministries) et « Secteurs réglementaires » (/edulex/sectors) requièrent edulex:manage. Même si leurs liens apparaissent dans /edulex, vous ne pouvez pas y ajouter ni modifier de données.",
      "Vous ne gérez ni l'organisation et les structures (/organization), ni les comptes utilisateurs, rôles et délégations (/users) : ces modules exigent organization:manage / user:manage.",
      "Vous n'intervenez pas dans la gouvernance des activités : ni création/validation d'activités (/activities, /validation), ni formulaires d'activités (/forms), ni rapports institutionnels (/reports), faute des permissions activity, form et report.",
      "Vous n'avez aucun droit de gestion sur EduLex Academy : la création de questions et la génération de modules d'évaluation (/academy/admin, /academy/admin/questions/new) requièrent academy:manage.",
      "Vous n'accédez pas à l'espace d'administration et d'audit de la plateforme (/admin) ni aux archives (/archives), qui dépendent de admin:read / admin:manage / organization:manage."
    ]
  },
  {
    "roleKey": "edulex_depositor",
    "tagline": "Alimenter le référentiel EduLex en déposant, en important et en tenant à jour les textes réglementaires, avant leur vérification par les valideurs.",
    "intro": "Le Service technique déposant (EduLex) est l'agent chargé d'enrichir le référentiel réglementaire EduLex de l'État de Côte d'Ivoire. Sa mission consiste à saisir de nouveaux textes (lois, décrets, arrêtés, conventions…), à les importer en masse à partir de listes existantes et à corriger leurs métadonnées, le tout dans le périmètre EduLex. Tout texte qu'il dépose est créé au niveau V0 (non vérifié) et reste en attente du circuit de validation : le déposant prépare la matière première, mais ne la certifie pas. Il dispose par ailleurs des outils personnels communs à tout utilisateur connecté (tableau de bord, agenda, profil, notifications…).",
    "access": [
      {
        "module": "Tableau de bord (/dashboard et Accueil /)",
        "what": "Consultez votre vue d'ensemble à la connexion. Pour votre rôle, les éléments utiles sont les KPI EduLex (« Textes EduLex disponibles » et « Textes à vérifier », qui comptent les textes au statut « à vérifier » ou au niveau V0) et la carte « EduLex — récents », qui liste les 5 derniers textes mis à jour avec leur code, leur badge de niveau (V0–V4) et leur pays, chacun cliquable vers sa fiche. Le bouton « Nouvelle activité », les cartes d'absence et le programme de parrainage restent affichés mais relèvent d'autres usages. Le périmètre des données suit le filtre Pays de la barre supérieure."
      },
      {
        "module": "Accueil — page publique (/)",
        "what": "Page vitrine accessible avant connexion : présentation des trois piliers (Gouvernance, EduLex, Academy), statistiques en direct, et boutons « Se connecter » / « Créer un compte ». Une fois connecté, l'entrée « Accueil » de la navigation latérale mène à votre tableau de bord interne."
      },
      {
        "module": "EduLex — référentiel réglementaire (/edulex)",
        "what": "C'est votre espace central. Vous consultez les 4 KPI (« Textes au total », « En vigueur », « À vérifier (V0 / à vérifier) », « Certifiés V4 »), vous recherchez par mot-clé (titre, code, numéro officiel, résumé, tags) et vous filtrez par Catégorie, Statut, Type et Niveau. Grâce à votre permission edulex:create, le bouton « Déposer un texte » (vers /edulex/texts/new) vous est ouvert, ainsi que les liens de référentiel « Pays », « Ministères », « Secteurs » et « Import d'amorçage ». Vous ouvrez la fiche de n'importe quel texte via sa carte. La « File de validation » ne vous est PAS proposée (réservée à edulex:validate)."
      },
      {
        "module": "Déposer un texte EduLex (/edulex/texts/new)",
        "what": "Cœur de votre mission (permission edulex:create). Vous renseignez le formulaire guidé : « Aperçu du code » EduLex généré et mis à jour en direct, « Titre officiel * », « Pays * », « Type * » (Décret, Loi, Ordonnance, Arrêté, Convention internationale…), « Ministère émetteur », « Secteur », « Juridiction », « Numéro officiel », les dates (signature, publication, entrée en vigueur), « Statut initial », « Confidentialité » (Public / Restreint / Confidentiel), « Langue » (Français / Anglais), « Résumé analytique » et « URL source officielle ». Vous soumettez via « Déposer le texte » : le texte est créé au niveau V0 (non vérifié)."
      },
      {
        "module": "Fiche d'un texte EduLex (/edulex/texts/[id])",
        "what": "Vous lisez toutes les métadonnées et les badges (Type, Statut, Niveau V0→V4, Confidentialité), les avertissements (« niveau V0 : entrée non vérifiée », « n'est pas en vigueur »), les relations entre textes (Remplace / Modifie / Abroge / Lié à / Cite), l'« Historique des versions », le « Journal de validation » et la traçabilité « Déposé par / Validé par ». Vous téléchargez le PDF ou le Markdown et consultez la source officielle. Grâce à edulex:update, vous disposez du droit d'édition : vous pouvez téléverser un document source PDF et corriger les informations du texte. En revanche, le panneau « Validation à partir de sources officielles » (niveaux V0→V4, changement de statut, « Publier ») ne vous est PAS accessible : il requiert edulex:validate / edulex:publish."
      },
      {
        "module": "Import d'amorçage EduLex (/edulex/import)",
        "what": "Accessible grâce à votre permission edulex:create (ce module est ouvert aux profils disposant d'edulex:create ou d'edulex:manage) ; c'est le levier qui concrétise votre mission d'import en masse. Vous choisissez le « Pays d'affectation », collez vos « Données CSV / TSV collées » (colonnes attendues : titre, type, numéro officiel, code ministère, code secteur, résumé ; séparateur virgule, point-virgule ou tabulation, en-tête détecté automatiquement), vous « Prévisualisez » les lignes détectées, puis lancez « Importer N ligne(s) ». Les textes sont créés au statut « Importé non vérifié » et au niveau V0."
      },
      {
        "module": "Pays & juridictions EduLex (/edulex/countries)",
        "what": "Consultation (edulex:read) : vous parcourez la grille des pays (drapeau, nom, namespace/code, nombre de textes, marqueur « inactif »). La carte « Ajouter un pays » ne s'affiche pas pour vous (elle exige edulex:manage). Utile pour vérifier le bon rattachement géographique d'un texte avant de le déposer."
      },
      {
        "module": "Ministères & gouvernements EduLex (/edulex/ministries)",
        "what": "Consultation (edulex:read) : vous visualisez les gouvernements par pays (badge « À venir » / « En vigueur » / « Archivé », date d'entrée en vigueur, nombre de ministères) et le tableau des ministères (Ministère, Code, Pays, Gouvernement). Les actions de gestion (déclarer un gouvernement, ajouter/éditer/supprimer un ministère) ne vous sont PAS ouvertes (edulex:manage). Référence précieuse pour saisir correctement le « Ministère émetteur » lors d'un dépôt."
      },
      {
        "module": "Secteurs réglementaires EduLex (/edulex/sectors)",
        "what": "Consultation (edulex:read) : vous lisez le tableau des secteurs (Secteur, Code, Pays/International, nombre de textes). La carte « Ajouter un secteur » et l'édition/suppression ne vous sont PAS accessibles (edulex:manage). Vous l'utilisez pour identifier le bon « Secteur » à associer à un texte."
      },
      {
        "module": "Mon profil (/account)",
        "what": "Vous consultez vos informations (avatar, nom, badges de rôles, e-mail, organisation, pays), changez votre photo de profil et choisissez votre « Type de profil » (Personnel / École / Entreprise / Association), qui adapte la terminologie de l'interface et la période de bilan par défaut."
      },
      {
        "module": "Paramètres (/parametres)",
        "what": "Vous réglez vos préférences personnelles : « Période de bilan par défaut » et activation/désactivation des « Rappels des rendez-vous », puis « Enregistrer »."
      },
      {
        "module": "Notifications (/notifications)",
        "what": "Vous consultez vos 50 dernières notifications (échéances, publications EduLex, décisions…), cliquez une notification pour la marquer lue et suivre son lien, ou « Tout marquer comme lu »."
      },
      {
        "module": "Rendez-vous (/rendez-vous)",
        "what": "Agenda personnel : vous créez, modifiez, marquez « fait / non fait » et supprimez vos propres rendez-vous, avec titre, date/heure, lieu, rappel et notes."
      },
      {
        "module": "Bilan & synthèse (/bilan)",
        "what": "Synthèse personnelle de vos rendez-vous honorés et activités validées sur une période choisie (Semaine / Quinzaine / Mois), avec taux de réalisation et export PDF."
      },
      {
        "module": "Évaluation (/evaluation)",
        "what": "Votre score de productivité personnel (0–100), son évolution sur 4 semaines et des « Conseils IA » générés à la demande."
      },
      {
        "module": "Distinctions & rappels à l'ordre (/distinctions)",
        "what": "Vous consultez votre propre distinction trimestrielle (régularité du reporting et respect des seuils d'absence) ; lorsque le pays Côte d'Ivoire est sélectionné, les messages s'affichent en style ivoirien avec lecture audio."
      }
    ],
    "workflows": [
      {
        "title": "Déposer un nouveau texte réglementaire dans EduLex",
        "steps": [
          "Dans la navigation, ouvrez « EduLex » (/edulex).",
          "Au besoin, sélectionnez d'abord le pays concerné dans le filtre Pays de la barre supérieure (ex. Côte d'Ivoire) pour cadrer la codification.",
          "Cliquez sur le bouton « Déposer un texte » : vous arrivez sur /edulex/texts/new.",
          "Observez l'« Aperçu du code » EduLex en haut : il se met à jour en direct au fil de votre saisie.",
          "Renseignez les champs obligatoires : « Titre officiel * », « Pays * » et « Type * » (Décret, Loi, Ordonnance, Arrêté, Convention internationale…).",
          "Complétez les métadonnées : « Ministère émetteur », « Secteur », « Juridiction », « Numéro officiel ».",
          "Saisissez les dates : « Date de signature », « Date de publication », « Entrée en vigueur ».",
          "Choisissez « Statut initial », « Confidentialité » (Public / Restreint / Confidentiel) et « Langue » (Français / Anglais).",
          "Rédigez le « Résumé analytique » et collez l'« URL source officielle » (très utile aux futurs valideurs).",
          "Cliquez sur « Déposer le texte » : le texte est créé au niveau V0 (non vérifié) et entre dans le circuit de validation."
        ]
      },
      {
        "title": "Importer une liste de textes en masse (amorçage)",
        "steps": [
          "Depuis /edulex, cliquez sur le lien « Import d'amorçage » (ou rendez-vous sur /edulex/import).",
          "Sélectionnez le « Pays d'affectation » de tous les textes du lot.",
          "Préparez vos données aux colonnes attendues : titre, type, numéro officiel, code ministère, code secteur, résumé (séparateur virgule, point-virgule ou tabulation ; l'en-tête est détecté automatiquement).",
          "Collez-les dans le champ « Données CSV / TSV collées ».",
          "Cliquez sur « Prévisualiser » et vérifiez la table affichée (Titre / Type / N° / Min. / Sect.) ligne par ligne.",
          "Corrigez vos données et reprévisualisez si une ligne est mal interprétée.",
          "Cliquez sur « Importer N ligne(s) » : le message « X texte(s) importé(s)… en V0 » confirme l'opération.",
          "Suivez le lien « Voir EduLex → » pour retrouver les textes importés (statut « Importé non vérifié », niveau V0)."
        ]
      },
      {
        "title": "Corriger les métadonnées d'un texte déjà déposé",
        "steps": [
          "Depuis /edulex, recherchez le texte par mot-clé (titre, code, numéro officiel) ou via la carte « EduLex — récents » du tableau de bord.",
          "Ouvrez sa fiche en cliquant sur sa carte (/edulex/texts/[id]).",
          "Vérifiez les badges (Type, Statut, Niveau, Confidentialité) et repérez d'éventuelles erreurs de saisie.",
          "Grâce à votre droit d'édition (edulex:update), corrigez les informations erronées du texte et enregistrez.",
          "Si la correction concerne la pièce officielle, utilisez « Téléverser un document source (PDF) » pour joindre le bon document.",
          "Notez bien : vous ne pouvez ni changer le niveau de vérification (V0→V4), ni modifier le statut, ni publier le texte — ces actions reviennent aux valideurs."
        ]
      },
      {
        "title": "Préparer un dépôt de qualité en vérifiant les référentiels",
        "steps": [
          "Avant de déposer, ouvrez « Ministères » (/edulex/ministries) pour repérer le « Ministère émetteur » et son code exacts dans le gouvernement « En vigueur » du pays.",
          "Ouvrez « Secteurs » (/edulex/sectors) pour identifier le « Secteur » et son code adaptés au texte.",
          "Ouvrez « Pays » (/edulex/countries) pour confirmer le bon pays / namespace de rattachement.",
          "Revenez sur « Déposer un texte » et reportez ces valeurs vérifiées dans le formulaire pour éviter tout rejet ultérieur."
        ]
      },
      {
        "title": "Suivre l'avancement de vos textes en attente de vérification",
        "steps": [
          "Ouvrez le Tableau de bord (/dashboard).",
          "Consultez le KPI « Textes à vérifier » (statut « à vérifier » ou niveau V0) pour mesurer le volume en attente.",
          "Parcourez la carte « EduLex — récents » et cliquez un texte pour ouvrir sa fiche.",
          "Sur la fiche, lisez le « Journal de validation » et la traçabilité « Validé par » pour situer le texte dans le circuit.",
          "Consultez vos Notifications (/notifications) : les publications EduLex et les décisions vous y sont signalées.",
          "Si un texte revient avec une remarque, corrigez-le via son édition, puis laissez les valideurs reprendre le circuit."
        ]
      }
    ],
    "tips": [
      "Renseignez toujours l'« URL source officielle » et un « Résumé analytique » clair lors d'un dépôt : ce sont les éléments sur lesquels les valideurs s'appuieront pour faire monter le texte de V0 à V4.",
      "Avant un import en masse, faites systématiquement un « Prévisualiser » et contrôlez chaque colonne : un en-tête mal détecté ou un mauvais code ministère/secteur se propage à toutes les lignes.",
      "Vérifiez les codes de ministère et de secteur dans /edulex/ministries et /edulex/sectors AVANT de saisir ou d'importer, pour garantir un rattachement juste du premier coup.",
      "Sélectionnez le bon pays dans le filtre de la barre supérieure avant de déposer ou d'importer : la codification EduLex et le périmètre des données en dépendent.",
      "Gardez à l'esprit que tout texte que vous créez naît en V0 (« entrée non vérifiée ») : ne le présentez jamais comme certifié tant qu'un valideur ne l'a pas fait progresser dans le circuit.",
      "Surveillez le KPI « Textes à vérifier » du tableau de bord pour ne pas laisser s'accumuler des textes V0 sans suivi, et gardez vos notifications à l'œil pour être alerté des décisions."
    ],
    "limits": [
      "Vous ne pouvez pas valider ni faire progresser un texte dans le circuit de vérification V0→V4 : le panneau « Validation à partir de sources officielles » et la « File de validation » (/edulex/validation) sont réservés au rôle disposant d'edulex:validate.",
      "Vous ne pouvez pas publier un texte ni le « mettre en vigueur » (réservé à edulex:publish), ni l'archiver (edulex:archive).",
      "Vous ne pouvez pas exporter le référentiel (edulex:export) ni gérer les référentiels — ajouter un pays, déclarer un gouvernement, créer/éditer/supprimer un ministère ou un secteur : toutes ces actions exigent edulex:manage.",
      "Vous n'avez pas accès à la gestion des comptes utilisateurs (/users), à l'organigramme et aux structures (/organization), ni à la délégation de droits — ces modules relèvent de user:manage et organization:manage.",
      "Vous ne pilotez ni les formulaires d'activités (/forms), ni le reporting institutionnel (/reports), ni la validation hiérarchique des activités (/validation) : ce sont des permissions de gouvernance distinctes (form, report, activity).",
      "Côté EduLex Academy, vous restez un simple apprenant le cas échéant : vous ne pouvez ni gérer les questions de quiz, ni générer les modules d'évaluation, ni administrer l'espace (academy:manage).",
      "Vous n'avez pas accès à l'espace d'administration (/admin), aux archives consolidées (/archives) ni aux journaux d'audit : ces vues requièrent admin:read / admin:manage."
    ]
  },
  {
    "roleKey": "edulex_doc_validator",
    "tagline": "Garant de la fiabilité du référentiel réglementaire EduLex, vous vérifiez les textes à partir de leurs sources officielles et les faites progresser dans le circuit de certification, du niveau V0 au niveau V4.",
    "intro": "En tant que Validateur documentaire (EduLex), vous assurez le contrôle qualité du référentiel réglementaire international de la plateforme. Votre mission consiste à examiner les textes déposés ou importés (lois, décrets, conventions, arrêtés, etc.), à confronter leurs métadonnées et leur contenu aux sources officielles, puis à attribuer le niveau de vérification approprié (V0 à V4) et à statuer sur le statut du texte. Votre périmètre est strictement limité à EduLex : vous consultez les textes accessibles selon le filtre Pays de la barre supérieure et vous intervenez sur la file de validation. Vous ne déposez pas, n'importez pas et ne publiez pas vous-même les textes, et vous ne modifiez pas leurs métadonnées : votre rôle est celui du vérificateur de confiance qui certifie l'exactitude des entrées à partir de sources faisant foi.",
    "access": [
      {
        "module": "Tableau de bord (/dashboard)",
        "what": "Vous consultez votre vue d'ensemble personnalisée à la connexion. Les indicateurs « Textes EduLex disponibles » et « Textes à vérifier » (statut « à vérifier » ou niveau V0) vous donnent un aperçu immédiat de la charge de vérification, et la carte « EduLex — récents » liste les 5 derniers textes mis à jour (code, badge de niveau V0–V4, pays) avec des liens directs vers leur fiche. Le périmètre des données suit le filtre Pays choisi dans la barre supérieure. Les autres widgets (activités, rapports, parrainage, demandes d'absence) restent affichés mais relèvent de fonctions personnelles, sans lien avec votre mission de validation."
      },
      {
        "module": "EduLex — référentiel réglementaire (/edulex)",
        "what": "Vous consultez la liste des textes accessibles, restreinte par le filtre Pays. Vous voyez les 4 KPI (« Textes au total », « En vigueur », « À vérifier (V0 / à vérifier) », « Certifiés V4 »), vous recherchez par mot-clé (titre, code, numéro officiel, résumé, tags) et vous filtrez par Catégorie, Statut, Type et Niveau. Grâce à votre permission edulex:validate, le bouton « File de validation » est disponible et vous mène vers /edulex/validation. Vous ouvrez la fiche de n'importe quel texte via sa carte. En revanche, le bouton « Déposer un texte » et les liens de référentiel (Pays, Ministères, Secteurs, Import d'amorçage) ne vous sont pas ouverts, faute des permissions edulex:create et edulex:manage."
      },
      {
        "module": "Validation EduLex — file d'attente (/edulex/validation)",
        "what": "C'est votre poste de travail principal. Vous y voyez les compteurs « Textes à traiter » et « Non vérifiés (V0) », restreints au pays sélectionné. Vous parcourez la liste des textes à vérifier (titre, code, drapeau pays, statut, niveau de vérification), couvrant les statuts En attente, À vérifier, Importé non vérifié et Brouillon, ou les niveaux V0 à V2. Vous cliquez « Examiner » sur chaque entrée pour ouvrir sa fiche et statuer. Disposant de edulex:validate, vous n'avez pas l'avertissement de consultation seule : vous pouvez réellement traiter la file."
      },
      {
        "module": "Fiche d'un texte EduLex (/edulex/texts/[id])",
        "what": "Vous lisez l'intégralité de la fiche : badges Type, Statut, Niveau de vérification (V0→V4) et Confidentialité (Public/Restreint/Confidentiel), ainsi que les avertissements « Ce texte est au niveau V0 : entrée non vérifiée » et « Ce texte n'est pas en vigueur ». Vous téléchargez les documents (PDF, Markdown) et consultez la source officielle, vous examinez les relations entre textes (Remplace / Modifie / Abroge / Lié à / Cite), l'« Historique des versions » et le « Journal de validation ». Surtout, le panneau « Validation à partir de sources officielles » vous est ouvert (edulex:validate) : vous y saisissez une « Source officielle (URL) » et un commentaire, vous choisissez le « Niveau de vérification » (V0–V4) et vous changez le « Statut du texte » via « Appliquer ». Votre intervention est tracée dans la rubrique « Validé par ». En revanche, le bouton « Publier (mettre en vigueur) » ne vous est pas accessible (il exige edulex:publish), et le téléversement d'un document source PDF comme la modification des métadonnées relèvent d'un droit d'édition (edulex:update) que vous n'avez pas."
      },
      {
        "module": "Rendez-vous (/rendez-vous)",
        "what": "Module personnel ouvert à tout utilisateur connecté : vous gérez votre propre agenda (création, modification, suppression de rendez-vous, marquage « fait », rappels). Sans lien direct avec la validation EduLex, mais utile pour organiser vos sessions de vérification."
      },
      {
        "module": "Bilan & synthèse (/bilan)",
        "what": "Module personnel : vous consultez la synthèse de vos rendez-vous honorés et activités validées sur une période (Semaine, Quinzaine, Mois), avec taux de réalisation et export PDF. Outil de suivi de votre propre productivité."
      },
      {
        "module": "Évaluation (/evaluation)",
        "what": "Module personnel : vous consultez votre score de productivité (0–100), son évolution sur 4 semaines, et vous pouvez demander des « Conseils IA ». Cadre votre activité individuelle, indépendamment du référentiel."
      },
      {
        "module": "Distinctions & rappels à l'ordre (/distinctions)",
        "what": "Module personnel et hiérarchique : vous voyez votre propre distinction trimestrielle (et celles de vos éventuels subordonnés) selon la régularité du reporting et le respect des seuils d'absence, avec messages adaptés à la Côte d'Ivoire."
      },
      {
        "module": "Mon profil (/account)",
        "what": "Vous consultez et ajustez votre compte : photo de profil, nom, badges de rôles (dont votre rôle de validateur EduLex), e-mail, organisation, pays, et choix du « Type de profil » qui adapte la terminologie de l'interface."
      },
      {
        "module": "Autorisations d'absence (/absences)",
        "what": "Accès relationnel (non lié à une permission RBAC) : vous demandez vos propres absences si un supérieur hiérarchique vous est défini, et vous suivez vos demandes et quotas. Les fonctions de validation des demandes ne vous concernent que si des agents vous sont rattachés."
      },
      {
        "module": "Notifications (/notifications)",
        "what": "Vous consultez vos 50 dernières notifications (échéances, validations, publications EduLex, seuils d'absence), vous les marquez lues en cliquant et suivez leurs liens, ou « Tout marquer comme lu ». C'est ici que vous êtes alerté des publications et mouvements EduLex qui vous concernent."
      },
      {
        "module": "Paramètres (/parametres)",
        "what": "Vous réglez vos préférences personnelles : période de bilan par défaut et activation des rappels de rendez-vous."
      }
    ],
    "workflows": [
      {
        "title": "Prendre en charge la file de validation EduLex",
        "steps": [
          "Dans la barre supérieure, sélectionnez le Pays (et éventuellement la subdivision) dont vous souhaitez vérifier les textes, afin de restreindre le périmètre.",
          "Ouvrez le module EduLex puis cliquez sur « File de validation » (ou rendez-vous directement sur /edulex/validation).",
          "Lisez les compteurs « Textes à traiter » et « Non vérifiés (V0) » pour mesurer la charge.",
          "Parcourez la liste : repérez chaque texte par son titre, son code, son drapeau pays, son statut et son niveau de vérification.",
          "Cliquez sur « Examiner » en regard du texte à traiter pour ouvrir sa fiche détaillée."
        ]
      },
      {
        "title": "Vérifier un texte à partir de sa source officielle et lui attribuer un niveau (ex. faire passer un texte de V0 à V3)",
        "steps": [
          "Sur la fiche du texte (/edulex/texts/[id]), lisez les badges Type, Statut et Niveau, et tenez compte de l'avertissement « Ce texte est au niveau V0 : entrée non vérifiée ».",
          "Téléchargez le document via « Télécharger (PDF) » ou « Markdown », et cliquez sur « Consulter la source officielle » pour confronter le contenu et les métadonnées (numéro officiel, dates, ministère émetteur) à la source réelle.",
          "Consultez le « Journal de validation » et l'« Historique des versions » pour comprendre les vérifications déjà effectuées.",
          "Dans le panneau « Validation à partir de sources officielles », renseignez le champ « Source officielle (URL) » avec le lien faisant foi, puis ajoutez un commentaire justifiant votre décision.",
          "Sélectionnez le « Niveau de vérification » correspondant à votre degré de contrôle (par exemple V3) dans la liste V0–V4.",
          "Cliquez sur « Appliquer » pour enregistrer le nouveau niveau, puis vérifiez que votre intervention apparaît bien dans la rubrique « Validé par » et dans le journal de validation."
        ]
      },
      {
        "title": "Mettre à jour le statut d'un texte sans le publier",
        "steps": [
          "Ouvrez la fiche du texte concerné depuis la file de validation ou la liste EduLex.",
          "Dans le panneau « Validation à partir de sources officielles », ajustez le champ « Statut du texte » vers le statut adéquat (par exemple pour signaler qu'il est prêt à être mis en vigueur).",
          "Documentez ce changement dans le commentaire et, le cas échéant, dans le champ « Source officielle (URL) ».",
          "Cliquez sur « Appliquer » pour enregistrer le statut.",
          "Si le texte doit être mis en vigueur, n'utilisez pas le bouton « Publier (mettre en vigueur) » : il vous est inaccessible. Signalez plutôt au profil habilité à la publication (titulaire de edulex:publish) que le texte est vérifié et prêt."
        ]
      },
      {
        "title": "Repérer rapidement les textes à vérifier depuis le tableau de bord",
        "steps": [
          "Connectez-vous : le tableau de bord s'affiche par défaut.",
          "Choisissez le Pays voulu dans la barre supérieure pour cadrer les données.",
          "Lisez le KPI « Textes à vérifier » (statut « à vérifier » ou niveau V0) pour estimer le volume restant.",
          "Dans la carte « EduLex — récents », ouvrez l'un des 5 textes récemment mis à jour via son lien pour en contrôler le niveau.",
          "Pour traiter l'ensemble, basculez vers /edulex puis « File de validation »."
        ]
      },
      {
        "title": "Rechercher et filtrer un texte précis à contrôler dans le référentiel",
        "steps": [
          "Ouvrez le module EduLex (/edulex).",
          "Saisissez un mot-clé (titre, code, numéro officiel, résumé ou tag) dans le champ « Rechercher par mot-clé… ».",
          "Affinez avec les filtres Catégorie, Statut, Type et surtout Niveau (pour isoler les V0/V1 à traiter), puis cliquez « Filtrer ».",
          "Ouvrez la fiche du texte ciblé en cliquant sur sa carte.",
          "Procédez à la vérification via le panneau de validation, puis utilisez « Réinitialiser » pour repartir d'une recherche vierge."
        ]
      },
      {
        "title": "Contrôler les relations et l'historique d'un texte avant de statuer",
        "steps": [
          "Ouvrez la fiche du texte depuis la file de validation ou la liste EduLex.",
          "Consultez la rubrique des relations (Remplace / Modifie / Abroge / Lié à / Cite) : un texte abrogé ou remplacé doit recevoir un statut cohérent et non un niveau de certification avancé.",
          "Parcourez l'« Historique des versions » pour repérer les évolutions successives du texte.",
          "Lisez le « Journal de validation » pour identifier qui est déjà intervenu et à quel niveau.",
          "Une fois la cohérence établie, renseignez la « Source officielle (URL) » et un commentaire, choisissez le niveau et le statut, puis cliquez sur « Appliquer »."
        ]
      },
      {
        "title": "Suivre les publications et alertes EduLex via les notifications",
        "steps": [
          "Ouvrez le centre de notifications (/notifications).",
          "Repérez les notifications relatives aux validations et publications EduLex grâce à leur pastille « non lu ».",
          "Cliquez sur une notification pour la marquer lue et suivre son lien vers le texte concerné.",
          "Vérifiez sur la fiche que le texte a bien évolué dans le circuit (niveau, statut, journal de validation).",
          "Si plus rien ne requiert votre attention, cliquez sur « Tout marquer comme lu »."
        ]
      }
    ],
    "tips": [
      "Sélectionnez toujours le Pays (et la subdivision) dans la barre supérieure avant d'attaquer la file : la file de validation et les KPI sont restreints au périmètre choisi, ce qui évite de mélanger les juridictions.",
      "Renseignez systématiquement le champ « Source officielle (URL) » et un commentaire avant d'appliquer un niveau ou un statut : ces éléments alimentent le « Journal de validation » et la traçabilité « Validé par », gage de confiance du référentiel.",
      "Procédez par paliers de niveau (V0 → V1 → … → V4) selon le degré réel de contrôle effectué ; ne sautez pas directement à V4 (certifié) sans avoir confronté le texte à sa source officielle faisant foi.",
      "Servez-vous du KPI « Textes à vérifier » du tableau de bord et du compteur « Non vérifiés (V0) » de la file comme indicateurs de priorisation quotidienne.",
      "Avant de statuer, consultez les relations (Remplace / Modifie / Abroge) et l'historique des versions : un texte peut avoir été abrogé ou remplacé, ce qui oriente le statut à retenir.",
      "Vous pouvez ajuster le statut d'un texte (par exemple le préparer à la mise en vigueur) via « Appliquer », mais sa publication effective revient à un titulaire de edulex:publish : prévenez-le une fois le texte vérifié et prêt."
    ],
    "limits": [
      "Vous ne pouvez pas déposer un nouveau texte (« Déposer un texte » / /edulex/texts/new) : cela requiert la permission edulex:create.",
      "Vous ne pouvez pas importer des textes en masse (Import d'amorçage CSV/TSV, /edulex/import) : réservé à edulex:create / edulex:manage.",
      "Vous ne pouvez pas publier un texte ni le mettre en vigueur : le bouton « Publier (mettre en vigueur) » exige edulex:publish, que vous n'avez pas.",
      "Vous ne pouvez pas modifier les métadonnées du texte ni téléverser un document source PDF : ces actions relèvent d'un droit d'édition (edulex:update).",
      "Vous ne pouvez pas gérer les référentiels EduLex — Pays & juridictions, Ministères & gouvernements, Secteurs : ces pages et leurs ajouts/suppressions exigent edulex:manage.",
      "Vous n'avez pas accès aux modules de gouvernance (Activités, Validation hiérarchique, Reporting, Formulaires, Organisation, Utilisateurs) ni à EduLex Academy et son administration : aucune de leurs permissions (activity, report, form, organization, user, academy) ne vous est attribuée.",
      "Vous n'avez pas accès aux espaces d'administration et d'audit (/admin, /archives), qui requièrent admin:read / admin:manage."
    ]
  },
  {
    "roleKey": "edulex_legal_validator",
    "tagline": "Garant de la fiabilité du référentiel réglementaire EduLex : vous vérifiez, certifiez et mettez en vigueur les textes officiels.",
    "intro": "Le Validateur juridique (EduLex) est responsable de la qualité et de la traçabilité du référentiel réglementaire EduLex. Sa mission consiste à examiner les textes déposés ou importés, à les faire progresser dans le circuit de vérification (du niveau V0 « non vérifié » jusqu'à V4 « certifié »), à ajuster leur statut et à les publier (mettre en vigueur) à partir de sources officielles. Son périmètre est strictement limité à EduLex : il ne dépose pas de nouveaux textes, n'administre pas les référentiels (pays, ministères, secteurs) et n'intervient ni sur les activités, ni sur la formation Academy. Le périmètre des données qu'il consulte suit le filtre Pays sélectionné dans la barre supérieure.",
    "access": [
      {
        "module": "Tableau de bord (/dashboard et Accueil)",
        "what": "Vous consultez votre vue d'ensemble personnalisée à la connexion. Pour votre rôle, surveillez en priorité les KPI EduLex : « Textes EduLex disponibles » et surtout « Textes à vérifier » (textes au statut « à vérifier » ou au niveau V0), ainsi que la carte « EduLex — récents » listant les 5 derniers textes mis à jour (code, badge de niveau V0–V4, pays) avec un lien direct vers chaque fiche. Le périmètre des chiffres suit le filtre Pays de la barre supérieure."
      },
      {
        "module": "EduLex — référentiel réglementaire (/edulex)",
        "what": "Vous consultez les 4 KPI (« Textes au total », « En vigueur », « À vérifier (V0 / à vérifier) », « Certifiés V4 »), recherchez un texte par mot-clé (titre, code, numéro officiel, résumé, tags) et filtrez par Catégorie, Statut, Type et Niveau. Grâce à votre permission edulex:validate, vous disposez du bouton « File de validation » qui ouvre votre file de travail. Vous ouvrez la fiche de n'importe quel texte via sa carte. En revanche, le bouton « Déposer un texte » et les liens de référentiel (Pays, Ministères, Secteurs, Import d'amorçage) ne vous sont pas proposés, faute des permissions edulex:create et edulex:manage."
      },
      {
        "module": "Validation EduLex (file) (/edulex/validation)",
        "what": "C'est votre file de travail principale. Vous y voyez les compteurs « Textes à traiter » et « Non vérifiés (V0) », et parcourez la liste des textes à vérifier (titre, code, drapeau pays, statut, niveau de vérification), restreinte au pays sélectionné. Vous cliquez « Examiner » pour ouvrir la fiche d'un texte et le faire progresser. Grâce à edulex:validate, vous pouvez réellement statuer (et non simplement consulter) : l'avertissement « Vous pouvez consulter la file mais pas statuer » ne s'affiche donc pas pour vous."
      },
      {
        "module": "Fiche d'un texte EduLex (/edulex/texts/[id])",
        "what": "Cœur de votre activité. Vous lisez l'ensemble des métadonnées et badges (Type, Statut, Niveau de vérification V0→V4, Confidentialité), les avertissements (« Ce texte est au niveau V0 : entrée non vérifiée », « Ce texte n'est pas en vigueur »), les relations entre textes (Remplace / Modifie / Abroge / Lié à / Cite), l'« Historique des versions » et le « Journal de validation ». Vous téléchargez le texte (PDF, Markdown) et consultez la source officielle. Surtout, vous disposez du panneau « Validation à partir de sources officielles » (permission edulex:validate) : vous y saisissez une « Source officielle (URL) » et un commentaire, choisissez le « Niveau de vérification » (V0–V4), changez le « Statut du texte » via « Appliquer », et — grâce à edulex:publish — vous utilisez « Publier (mettre en vigueur) ». Vous consultez aussi la traçabilité « Déposé par » / « Validé par ». Note : le téléversement d'un document source PDF relève de l'édition (edulex:update) et ne vous est pas ouvert."
      },
      {
        "module": "Pays, Ministères & Secteurs EduLex (/edulex/countries, /edulex/ministries, /edulex/sectors)",
        "what": "Votre permission edulex:read vous donne accès en consultation à ces référentiels (grille des pays, gouvernements et ministères par pays, secteurs et nombre de textes rattachés) pour comprendre le contexte d'un texte à valider. En revanche, les cartes et boutons de gestion (Ajouter un pays, Déclarer un gouvernement, Ajouter un ministère, Ajouter un secteur, éditer ou supprimer) requièrent edulex:manage et ne vous sont pas proposés."
      },
      {
        "module": "Notifications (/notifications)",
        "what": "Vous listez vos 50 dernières notifications (validations, publications EduLex, échéances), les marquez lues en cliquant pour suivre le lien vers la ressource concernée, et utilisez « Tout marquer comme lu ». C'est là que vous recevez les alertes vous signalant les textes à traiter et les publications."
      },
      {
        "module": "Mon profil (/account)",
        "what": "Vous consultez vos informations de compte (e-mail, organisation, pays), votre avatar et vos badges de rôle (dont la clé edulex_legal_validator), changez votre photo de profil et choisissez votre « Type de profil », qui adapte la terminologie de l'interface et votre période de bilan par défaut."
      },
      {
        "module": "Paramètres (/parametres)",
        "what": "Vous réglez vos préférences personnelles : « Période de bilan par défaut » et activation des « Rappels des rendez-vous », puis enregistrez."
      },
      {
        "module": "Rendez-vous (/rendez-vous)",
        "what": "Module personnel ouvert à tout utilisateur : vous gérez votre agenda (ajouter, modifier, supprimer un rendez-vous, marquer fait/non fait, définir un rappel). Sans rapport direct avec EduLex, mais disponible pour votre organisation personnelle."
      },
      {
        "module": "Bilan & synthèse (/bilan)",
        "what": "Vous consultez votre synthèse personnelle (rendez-vous honorés et activités validées) sur une période choisie, avec taux de réalisation, et exportez un PDF. Ce module agrège des données personnelles, indépendamment de votre rôle EduLex."
      },
      {
        "module": "Évaluation (/evaluation)",
        "what": "Vous consultez votre score de productivité personnel (0–100), son évolution sur 4 semaines, et générez des « Conseils IA » à la demande. Module personnel."
      },
      {
        "module": "Distinctions & rappels à l'ordre (/distinctions)",
        "what": "Vous voyez votre propre distinction trimestrielle (et celles de vos éventuels subordonnés) selon la régularité de votre reporting et le respect des seuils d'absence, avec messages adaptés à la Côte d'Ivoire lorsque le pays CI est sélectionné."
      },
      {
        "module": "Autorisations d'absence (/absences)",
        "what": "Module sans permission dédiée, régi par le lien hiérarchique. Si un supérieur hiérarchique vous est défini, vous pouvez « Demander une absence » pour vous-même, suivre le statut de vos demandes (En attente / Approuvée / Refusée) et annuler une demande En attente. Vous ne validez les demandes d'autrui que si des agents vous sont rattachés comme subordonnés."
      }
    ],
    "workflows": [
      {
        "title": "Traiter la file de validation EduLex au quotidien",
        "steps": [
          "Sélectionnez le pays concerné dans le filtre Pays de la barre supérieure (ou laissez « tous les pays » pour une vue globale).",
          "Depuis le tableau de bord, repérez le KPI « Textes à vérifier », puis ouvrez /edulex et cliquez sur le bouton « File de validation » (ou accédez directement à /edulex/validation).",
          "Consultez les compteurs « Textes à traiter » et « Non vérifiés (V0) » pour mesurer la charge.",
          "Parcourez la liste (titre, code, drapeau pays, statut, niveau) et cliquez « Examiner » sur le texte à traiter pour ouvrir sa fiche.",
          "Procédez à la vérification du texte comme décrit dans les procédures suivantes."
        ]
      },
      {
        "title": "Faire progresser un texte du niveau V0 vers un niveau supérieur (ex. V3)",
        "steps": [
          "Ouvrez la fiche du texte (/edulex/texts/[id]) depuis la file de validation, la carte « EduLex — récents » du tableau de bord ou la liste /edulex.",
          "Lisez les badges et l'avertissement « Ce texte est au niveau V0 : entrée non vérifiée », puis vérifiez les métadonnées et le contenu.",
          "Dans le panneau « Validation à partir de sources officielles », saisissez la « Source officielle (URL) » qui justifie la vérification et rédigez un commentaire explicite.",
          "Choisissez le « Niveau de vérification » cible (par exemple V3) en cohérence avec le degré de preuve apporté par la source.",
          "Cliquez sur « Appliquer » pour enregistrer le nouveau niveau, puis vérifiez dans le « Journal de validation » et l'« Historique des versions » que l'opération est tracée."
        ]
      },
      {
        "title": "Mettre un texte en vigueur (publier)",
        "steps": [
          "Assurez-vous au préalable que le texte a atteint un niveau de vérification suffisant et que sa source officielle est renseignée.",
          "Sur la fiche du texte, dans le panneau « Validation à partir de sources officielles », ajustez si nécessaire le « Statut du texte » puis cliquez « Appliquer ».",
          "Cliquez sur « Publier (mettre en vigueur) » (action permise par votre permission edulex:publish) pour faire passer le texte « en vigueur ».",
          "Vérifiez que l'avertissement « Ce texte n'est pas en vigueur » a disparu et que le statut affiché reflète bien la mise en vigueur.",
          "Contrôlez la traçabilité « Validé par » et le « Journal de validation »."
        ]
      },
      {
        "title": "Examiner un texte importé non vérifié",
        "steps": [
          "Dans /edulex/validation, repérez les textes au statut « Importé non vérifié » et au niveau V0 (souvent issus d'un import d'amorçage).",
          "Cliquez « Examiner » pour ouvrir la fiche.",
          "Comparez les métadonnées (titre officiel, numéro officiel, type, ministère émetteur, secteur) à la source réelle, et téléchargez le texte (PDF / Markdown) ou consultez la source officielle pour contrôle.",
          "Dans le panneau de validation, renseignez la « Source officielle (URL) » et le commentaire, choisissez le niveau de vérification adéquat, puis cliquez « Appliquer ».",
          "Publiez le texte si et seulement s'il est confirmé en vigueur ; sinon, laissez-le au statut approprié pour un complément ultérieur."
        ]
      },
      {
        "title": "Retrouver rapidement un texte précis à vérifier",
        "steps": [
          "Ouvrez /edulex.",
          "Saisissez un mot-clé dans le champ « Rechercher par mot-clé… » (titre, code, numéro officiel, résumé ou tag).",
          "Affinez avec les filtres Catégorie, Statut, Type et Niveau, puis cliquez « Filtrer » (ou « Réinitialiser » pour repartir de zéro).",
          "Ouvrez la fiche du texte via sa carte (repérez le badge de niveau V0–V4 et le drapeau pays).",
          "Procédez à la vérification ou à la publication selon le besoin."
        ]
      },
      {
        "title": "Suivre les alertes et publications via les notifications",
        "steps": [
          "Ouvrez /notifications régulièrement (ou cliquez l'indicateur de notifications).",
          "Repérez les notifications relatives aux textes à vérifier et aux publications EduLex (pastille non lu).",
          "Cliquez une notification pour la marquer lue et suivre son lien vers la fiche du texte concernée.",
          "Traitez le texte depuis sa fiche, puis utilisez « Tout marquer comme lu » une fois la file résorbée."
        ]
      }
    ],
    "tips": [
      "Sélectionnez systématiquement le bon pays dans la barre supérieure avant de travailler : la file /edulex/validation et les KPI EduLex sont restreints au pays choisi.",
      "Renseignez toujours une « Source officielle (URL) » fiable et un commentaire clair avant d'appliquer un niveau de vérification : c'est la base de la traçabilité « Validé par » et du journal de validation.",
      "Ne réservez les niveaux élevés (V3, V4 « certifié ») qu'aux textes adossés à une source officielle vérifiable ; gardez V0 pour les entrées non vérifiées et les imports bruts.",
      "Distinguez bien deux gestes : changer le « Statut » et le « Niveau de vérification » via « Appliquer », et « Publier (mettre en vigueur) ». Ne publiez qu'un texte réellement entré en vigueur.",
      "Utilisez le KPI « Textes à vérifier » du tableau de bord comme indicateur de charge quotidien, et la carte « EduLex — récents » pour repérer les mises à jour récentes.",
      "Avant de publier, vérifiez les relations du texte (Remplace / Abroge / Modifie) pour éviter de mettre en vigueur un texte qui en remplacerait un autre resté actif.",
      "Consultez le « Journal de validation » et l'« Historique des versions » après chaque action pour confirmer que l'opération a bien été enregistrée."
    ],
    "limits": [
      "Vous ne pouvez pas déposer de nouveau texte (/edulex/texts/new) ni utiliser l'import d'amorçage (/edulex/import) : ces actions exigent la permission edulex:create, que vous n'avez pas — le bouton « Déposer un texte » ne vous est pas proposé.",
      "Vous ne pouvez pas téléverser un document source PDF sur une fiche de texte ni modifier le contenu d'un texte : cela relève de edulex:update.",
      "Vous consultez les référentiels EduLex (Pays, Ministères, Secteurs) mais ne les administrez pas : ajouter, déclarer un gouvernement, éditer ou supprimer un pays (/edulex/countries), un ministère (/edulex/ministries) ou un secteur (/edulex/sectors) requiert edulex:manage.",
      "Vous ne pouvez pas archiver, importer ni exporter en masse le référentiel (edulex:archive, edulex:import, edulex:export, edulex:manage).",
      "Vous n'intervenez pas sur les Activités, la Validation hiérarchique, les Formulaires, les Rapports, ni sur la consultation des Archives : ces modules requièrent des permissions activity / form / report / admin que votre rôle ne possède pas.",
      "Vous n'avez aucun accès aux modules EduLex Academy en tant que gestionnaire ou auteur (academy:read/manage) : pas de création de questions, de génération de modules d'évaluation ni de gestion des parcours.",
      "Vous ne gérez pas les utilisateurs, l'organisation/organigramme ni l'espace Administration (/admin) : ces fonctions relèvent de user:manage, organization:manage et admin:read/manage.",
      "Dans le module Absences, vous ne validez les demandes d'autrui que si des agents vous sont rattachés hiérarchiquement ; vous ne réglez la politique d'absences que si vous êtes supérieur ou administrateur."
    ]
  },
  {
    "roleKey": "academy_editor",
    "tagline": "Concevez, alimentez et publiez les questions de quiz d'EduLex Academy et générez les modules d'évaluation officiels, pour une formation citoyenne fidèle aux textes réglementaires.",
    "intro": "L'Éditeur EduLex Academy est responsable du contenu pédagogique de la formation citoyenne adossée au référentiel réglementaire EduLex. À ce titre, vous créez et gérez les questions de quiz reliées aux textes officiels, vous pilotez leur statut (Publiée, Brouillon, Suspendue) et vous déclenchez la génération des modules d'évaluation officiels par pays. Les parcours, unités et leçons ne se rédigent pas à la main : ils sont produits automatiquement par cette génération à partir des textes validés ; votre travail d'édition porte sur les questions et leur rattachement. Votre périmètre se limite à l'espace Academy : vous n'intervenez ni sur le référentiel EduLex lui-même, ni sur la gouvernance administrative (activités, absences, organisations, utilisateurs). Vous disposez en complément des pages personnelles communes à tout utilisateur connecté (tableau de bord, profil, agenda, notifications, paramètres).",
    "access": [
      {
        "module": "Tableau de bord (/dashboard et Accueil /)",
        "what": "Vous consultez votre vue d'ensemble personnalisée à la connexion : vos KPI (dont « Parcours Academy publiés » et « Textes EduLex disponibles »), le graphique « Évolution des activités », le donut « Répartition par statut », vos demandes d'absence et la carte « EduLex — récents ». Le périmètre suit le filtre Pays de la barre supérieure. C'est une page de consultation, sans action d'édition propre à votre rôle."
      },
      {
        "module": "Accueil (page d'accueil publique) (/)",
        "what": "Vous accédez à la vitrine marketing (piliers Gouvernance, EduLex, Academy ; statistiques en direct via LiveStats). Pour un compte connecté, l'entrée « Accueil » de la navigation latérale mène à votre tableau de bord interne."
      },
      {
        "module": "EduLex Academy (/academy)",
        "what": "C'est votre espace principal. Vous voyez le hero (XP, Série, Niveau de l'apprenant), les accès rapides (Ma progression, Badges & trophées, Classement), les 5 Niveaux de compétence, le filtre par Catégories de parcours et les Parcours disponibles. Grâce à academy:manage, vous disposez en plus de la carte « Modules d'évaluation officiels » avec les boutons « Générer — [pays] » et « Générer pour tous les pays », qui produisent automatiquement les modules à partir des textes officiels validés du pays sélectionné."
      },
      {
        "module": "Administration Academy (/academy/admin)",
        "what": "Réservée à academy:manage, c'est votre console d'édition. Vous consultez les KPI « Questions au total » et « Publiées », ainsi que le tableau de toutes les questions (énoncé, nombre de réponses/tentatives, texte source, leçon, type, statut). Vous changez le statut d'une question (Publiée, Brouillon, Suspendue) ou la supprimez, et vous ouvrez la création via « Nouvelle question »."
      },
      {
        "module": "Nouvelle question (Academy) (/academy/admin/questions/new)",
        "what": "Réservée à academy:manage, vous y créez une question de quiz : choix de la « Leçon de rattachement * » et du « Type de question * » (QCU / QCM / Vrai / Faux), saisie de l'« Énoncé * », des « Réponses » (en cochant la ou les bonnes) et de l'« Explication pédagogique (feedback) ». Vous reliez la question au « Texte EduLex source », à l'« Article / disposition » et au « Secteur », puis définissez Difficulté (Facile / Moyen / Difficile), Points, Niveau et Statut avant de « Créer la question »."
      },
      {
        "module": "Parcours Academy (/academy/path/[id])",
        "what": "Vous consultez le détail d'un parcours : en-tête (badge Niveau, catégorie, titre, description), unités numérotées, marqueurs de prérequis (cadenas) et accès aux leçons (avec leur nombre de questions). Vous ouvrez chaque leçon pour vérifier le rendu de vos quiz."
      },
      {
        "module": "Leçon Academy (quiz) (/academy/lesson/[id])",
        "what": "Vous parcourez le lecteur de quiz tel que le voit l'apprenant : enchaînement des questions publiées, feedback « Bonne réponse · +X XP » ou « Réponse incorrecte » avec explication et bloc « Voir le texte → » (mention « à vérifier » si le texte source est en V0), attribution d'XP et écran de fin. Cela vous sert à relire et valider concrètement vos questions publiées."
      },
      {
        "module": "Ma progression (Academy) (/academy/progress)",
        "what": "Vous consultez le tableau de bord de l'apprenant : XP cumulés, Niveau, Série, avancement des parcours, « Textes à revoir » et badges. Utile pour observer l'expérience produite par vos contenus."
      },
      {
        "module": "Badges & trophées (Academy) (/academy/badges)",
        "what": "Vous consultez la galerie des badges (ratio obtenus/total ; « Obtenu le [date] » ou « À débloquer ») afin de comprendre la mécanique de récompense reliée aux quiz."
      },
      {
        "module": "Classement citoyen (Academy) (/academy/leaderboard)",
        "what": "Vous consultez le top 50 des apprenants (rang/médaille, niveau, série, total XP) avec le repère « (vous) », pour suivre l'engagement généré par vos parcours."
      },
      {
        "module": "Mon profil (/account)",
        "what": "Page personnelle : vous consultez vos informations (e-mail, organisation, pays) et vos badges de rôle, changez votre photo et choisissez votre « Type de profil », qui adapte la terminologie de l'interface et la période de bilan par défaut."
      },
      {
        "module": "Rendez-vous (/rendez-vous)",
        "what": "Votre agenda personnel : vous créez, modifiez, marquez « fait » et supprimez vos propres rendez-vous, avec rappels."
      },
      {
        "module": "Bilan & synthèse (/bilan)",
        "what": "Votre synthèse personnelle (rendez-vous honorés, activités validées) sur la période choisie, avec taux de réalisation et export PDF."
      },
      {
        "module": "Évaluation (/evaluation)",
        "what": "Votre score de productivité personnel (0–100), son évolution sur 4 semaines et les « Conseils IA » générés à la demande."
      },
      {
        "module": "Distinctions & rappels à l'ordre (/distinctions)",
        "what": "Vous consultez votre distinction trimestrielle, calculée selon la régularité du reporting et le respect des seuils d'absence ; vous voyez aussi celles de vos éventuels subordonnés si un lien hiérarchique vous en désigne."
      },
      {
        "module": "Autorisations d'absence (/absences)",
        "what": "Sans permission dédiée, l'accès dépend du lien hiérarchique : si un supérieur vous est défini, vous pouvez « Demander une absence » pour vous-même et suivre vos demandes."
      },
      {
        "module": "Notifications (/notifications)",
        "what": "Vous consultez vos 50 dernières notifications (dont les défis Academy), les marquez lues individuellement ou via « Tout marquer comme lu » et suivez leurs liens."
      },
      {
        "module": "Paramètres (/parametres)",
        "what": "Vos préférences personnelles : « Période de bilan par défaut » et activation des « Rappels des rendez-vous », enregistrées via « Enregistrer »."
      },
      {
        "module": "Mot de passe oublié (/mot-de-passe-oublie) et Réinitialiser le mot de passe (/reinitialiser-mot-de-passe)",
        "what": "Pages d'auto-dépannage de connexion : vous demandez un lien de réinitialisation par e-mail puis définissez un nouveau mot de passe (lien valable 1 heure, à usage unique)."
      }
    ],
    "workflows": [
      {
        "title": "Créer et publier une nouvelle question de quiz reliée à un texte EduLex",
        "steps": [
          "Dans la navigation, ouvrez « EduLex Academy » puis « Administration Academy » (/academy/admin).",
          "Cliquez sur « Nouvelle question » pour ouvrir le formulaire (/academy/admin/questions/new).",
          "Sélectionnez la « Leçon de rattachement * » à laquelle la question appartiendra, puis le « Type de question * » (QCU, QCM ou Vrai / Faux).",
          "Saisissez l'« Énoncé * », puis renseignez les « Réponses » en cochant la ou les bonnes ; utilisez « Ajouter une réponse » autant de fois que nécessaire.",
          "Rédigez l'« Explication pédagogique (feedback) » qui s'affichera après la réponse de l'apprenant.",
          "Reliez la question à son « Texte EduLex source », précisez l'« Article / disposition » et le « Secteur » pour assurer la traçabilité réglementaire.",
          "Définissez « Difficulté » (Facile / Moyen / Difficile), « Points » et « Niveau », puis réglez « Statut » sur Publiée pour la rendre active (ou Brouillon pour la garder en préparation).",
          "Cliquez sur « Créer la question » ; elle apparaît alors dans le tableau de l'Administration Academy."
        ]
      },
      {
        "title": "Mettre une question existante en ligne, la suspendre ou la supprimer",
        "steps": [
          "Ouvrez « Administration Academy » (/academy/admin).",
          "Repérez la question dans le tableau (énoncé, texte source, leçon, type, statut) ; appuyez-vous sur les KPI « Questions au total » et « Publiées » pour le contexte.",
          "Via les actions de la question, basculez son statut : Publiée pour la diffuser, Brouillon pour la retravailler, ou Suspendue pour la retirer temporairement sans perdre l'historique des tentatives.",
          "Si une question est erronée ou obsolète, utilisez l'action de suppression pour la retirer définitivement.",
          "Vérifiez le rendu : ouvrez la leçon concernée (/academy/lesson/[id]) et déroulez le quiz pour confirmer que la question s'affiche et se corrige correctement."
        ]
      },
      {
        "title": "Générer les modules d'évaluation officiels pour un pays",
        "steps": [
          "Ouvrez « EduLex Academy » (/academy).",
          "Sélectionnez le pays voulu dans le filtre Pays de la barre supérieure (par exemple la Côte d'Ivoire ; l'espace devient alors « EduLex CI Academy »).",
          "Descendez jusqu'à la carte « Modules d'évaluation officiels ».",
          "Cliquez sur « Générer — [pays] » pour produire automatiquement les modules à partir des textes officiels validés de ce pays, ou sur « Générer pour tous les pays » pour un traitement global.",
          "Attendez la fin de la génération, puis vérifiez les nouveaux parcours et leçons dans « Parcours disponibles »."
        ]
      },
      {
        "title": "Relire et valider un parcours avant diffusion aux apprenants",
        "steps": [
          "Depuis « EduLex Academy » (/academy), filtrez si besoin par « Catégories de parcours » puis ouvrez le parcours visé via « Commencer » (/academy/path/[id]).",
          "Vérifiez l'en-tête (badge Niveau, catégorie, titre, description) et l'enchaînement des unités numérotées, en notant les marqueurs « Prérequis » (cadenas).",
          "Ouvrez chaque leçon (avec son nombre de questions) pour entrer dans le lecteur de quiz (/academy/lesson/[id]).",
          "Répondez aux questions et contrôlez le feedback : « Bonne réponse · +X XP » ou « Réponse incorrecte », ainsi que l'exactitude de l'explication et du bloc « Voir le texte → ».",
          "Si une question doit être corrigée, retournez dans « Administration Academy » pour ajuster son statut ou la republier, puis relisez à nouveau la leçon."
        ]
      },
      {
        "title": "Assurer la cohérence d'une leçon : du texte EduLex source à la question",
        "steps": [
          "Dans « Administration Academy » (/academy/admin), identifiez la leçon et le texte source à couvrir grâce à la colonne « texte source » du tableau.",
          "Cliquez « Nouvelle question » et rattachez-la à la bonne leçon et au bon « Texte EduLex source », en renseignant précisément l'« Article / disposition ».",
          "Calibrez « Niveau », « Points » et « Difficulté » de façon homogène avec les autres questions de la leçon.",
          "Rédigez une « Explication pédagogique » qui renvoie clairement à la disposition citée, afin que le bloc « Voir le texte → » soit pertinent pour l'apprenant.",
          "Publiez la question, puis suivez son impact via « Ma progression », « Badges & trophées » et « Classement citoyen » pour mesurer l'engagement."
        ]
      }
    ],
    "tips": [
      "Reliez systématiquement chaque question à son « Texte EduLex source » et à l'« Article / disposition » : c'est ce lien qui alimente le bloc « Voir le texte → » et garantit la traçabilité réglementaire de la formation.",
      "Si le texte source est encore au niveau V0, le lecteur de quiz affichera la mention « à vérifier » ; privilégiez la création de questions sur des textes officiels validés pour ne pas enseigner une information non vérifiée.",
      "Utilisez le statut « Brouillon » pour préparer vos questions sereinement, et « Suspendue » plutôt que la suppression lorsqu'une question doit être retirée temporairement : vous conservez ainsi l'historique des tentatives.",
      "Avant de générer les modules d'évaluation officiels, vérifiez que le bon pays est sélectionné dans la barre supérieure : la génération s'appuie sur les textes validés de ce pays.",
      "Calibrez « Difficulté », « Points » et « Niveau » de façon homogène d'une leçon à l'autre pour préserver une progression cohérente le long des 5 Niveaux de compétence (Découverte, Compréhension, Application, Maîtrise, Expert / Référent).",
      "Testez toujours vos questions publiées en jouant réellement le quiz dans la leçon (/academy/lesson/[id]) afin de confirmer la bonne réponse attendue et la clarté du feedback.",
      "Surveillez le KPI « Publiées » du tableau d'administration et le « Classement citoyen » pour mesurer le volume de contenu actif et l'engagement réel des apprenants."
    ],
    "limits": [
      "Vous ne rédigez pas à la main les parcours, unités ou leçons : ces éléments sont produits par la génération des « Modules d'évaluation officiels » à partir des textes validés. Votre édition directe porte sur les questions de quiz et leur rattachement.",
      "Vous ne pouvez pas créer, modifier, valider, publier, archiver ni importer de textes dans le référentiel EduLex (/edulex, /edulex/texts/new, /edulex/validation, /edulex/import) : ces actions relèvent des permissions edulex:* que vous n'avez pas. Vous reliez seulement vos questions à des textes existants.",
      "Vous ne gérez pas les référentiels EduLex (Pays, Ministères, Gouvernements, Secteurs) : ces pages requièrent edulex:manage.",
      "Vous ne gérez pas les comptes utilisateurs ni les délégations de droits (/users) : créer un compte, importer en CSV, activer/désactiver ou déléguer des droits (y compris le lot « + Éditeur Academy ») relève de user:manage.",
      "Vous ne gérez pas l'organigramme et les structures (/organization) : la création, le déplacement par glisser-déposer et la suppression de structures relèvent de organization:manage.",
      "Vous n'intervenez pas dans la gouvernance administrative : créer ou valider des activités (/activities, /validation), générer des rapports (/reports) ou concevoir des formulaires (/forms) requiert les permissions activity:*, report:* et form:* qui ne vous sont pas accordées.",
      "Vous n'avez pas accès à l'espace d'Administration de la plateforme (/admin) ni aux Archives consolidées (/archives), réservés aux permissions admin:read / admin:manage.",
      "Concernant les absences (/absences), vous ne pouvez pas valider, refuser ou comptabiliser les demandes d'autres agents ni régler la politique d'absences : seul un supérieur hiérarchique (managerId) ou un administrateur le peut. Vous pouvez uniquement demander une absence pour vous-même si un supérieur vous est défini."
    ]
  },
  {
    "roleKey": "academy_learner",
    "tagline": "Apprendre la reglementation educative de maniere ludique et progresser a son rythme au sein d'EduLex Academy.",
    "intro": "Le Citoyen apprenant est l'utilisateur de la formation citoyenne d'EduWeb Governance. Son perimetre se limite a EduLex Academy : il suit des parcours, repond a des quiz relies aux textes officiels, gagne des points d'experience (XP), debloque des badges et se situe parmi les autres apprenants dans le classement. Il dispose de la seule permission academy:read, qui lui ouvre un acces en consultation et en participation a l'espace de formation, sans aucun pouvoir de configuration ni d'administration. Il beneficie par ailleurs des outils personnels communs a tout compte (profil, agenda, bilan, evaluation, parametres, notifications), qui ne dependent d'aucune permission de gouvernance.",
    "access": [
      {
        "module": "Tableau de bord (/dashboard) et Accueil (/)",
        "what": "A la connexion, vous accedez a votre vue d'ensemble personnalisee. En tant que citoyen apprenant, l'element le plus pertinent est le KPI « Parcours Academy publies », qui indique le nombre de parcours disponibles. La carte « Programme de parrainage commercial » (code promo, lien d'invitation, boutons Copier et Partager) et les autres KPI s'affichent egalement, mais en consultation seule : aucune donnee de gouvernance n'y est modifiable. Les cartes liees aux absences ou a la validation hierarchique n'apparaissent que si vous etes rattache a un superieur ou a des agents, ce qui n'est pas le cas d'un apprenant simple."
      },
      {
        "module": "Accueil public (/)",
        "what": "Page vitrine de la plateforme. Vous pouvez y cliquer sur le pilier « EduLex Academy » pour entrer dans l'espace de formation, ainsi que sur les liens de navigation (Produit, EduLex, Academy, Contact). Pour un utilisateur connecte, l'entree « Accueil » de la navigation laterale mene au tableau de bord interne."
      },
      {
        "module": "EduLex Academy (/academy)",
        "what": "C'est votre espace principal. Vous consultez le hero affichant vos XP, votre serie (jours consecutifs d'apprentissage) et votre niveau. Vous accedez aux raccourcis « Ma progression », « Badges & trophees » et « Classement ». Vous visualisez les 5 niveaux de competence (Decouverte, Comprehension, Application, Maitrise, Expert / Referent), filtrez les parcours par categorie et ouvrez un parcours disponible via « Commencer ». Lorsque le pays selectionne est la Cote d'Ivoire, l'espace s'intitule « EduLex CI Academy ». Vous ne disposez pas de la carte de generation des modules d'evaluation officiels, reservee au role de gestion."
      },
      {
        "module": "Parcours Academy (/academy/path/[id])",
        "what": "Vous consultez le detail d'un parcours : son badge « Niveau N », sa categorie, sa description, ses unites numerotees et leurs lecons. Vous reperez les unites marquees « Prerequis » (cadenas) et ouvrez une lecon (avec son nombre de questions) pour demarrer son quiz. Le bouton « Retour a Academy » vous ramene a la liste des parcours."
      },
      {
        "module": "Lecon Academy / quiz (/academy/lesson/[id])",
        "what": "Vous repondez aux questions du quiz (QCU, QCM, Vrai/Faux), validez chaque reponse et lisez le feedback pedagogique (« Bonne reponse · +X XP » ou « Reponse incorrecte »), avec l'explication et le bloc « Voir le texte → » vers le texte EduLex source. Vous enchainez les questions, terminez la lecon et consultez l'ecran de fin (bonnes reponses, XP gagnes, pourcentage de parcours), avec la possibilite de revenir au parcours ou de recommencer."
      },
      {
        "module": "Ma progression (/academy/progress)",
        "what": "Vous suivez vos « XP cumules », votre « Niveau N » (barre de progression), votre « Serie d'apprentissage », l'avancement de chacun de vos parcours, les « Textes a revoir » recommandes (issus de vos reponses incorrectes) et vos badges obtenus. Consultation uniquement."
      },
      {
        "module": "Badges & trophees (/academy/badges)",
        "what": "Vous parcourez la galerie complete des badges, voyez votre ratio « X / Y badge(s) obtenu(s) », la date d'obtention de chacun et ceux encore « A debloquer » (cadenas). Consultation uniquement."
      },
      {
        "module": "Classement citoyen (/academy/leaderboard)",
        "what": "Vous consultez le top 50 des apprenants classes par XP cumules et niveau, avec les medailles du top 3, l'indicateur de serie et le repere « (vous) » sur votre propre ligne mise en evidence. Consultation uniquement."
      },
      {
        "module": "Mon profil (/account)",
        "what": "Vous gerez votre compte : avatar (bouton « Changer la photo »), nom, badges de roles, et surtout le « Type de profil » (Personnel, Ecole, Entreprise, Association) qui adapte la terminologie de l'interface et la periode de bilan par defaut. Vous y consultez votre e-mail, votre organisation et votre pays."
      },
      {
        "module": "Rendez-vous (/rendez-vous)",
        "what": "Agenda personnel : vous creez, modifiez, marquez « fait » et supprimez vos propres rendez-vous (titre, date/heure, lieu, rappel, notes). Vous ne voyez que vos propres RDV."
      },
      {
        "module": "Bilan & synthese (/bilan)",
        "what": "Synthese personnelle de vos rendez-vous honores et activites validees sur la periode choisie (onglets Semaine, Quinzaine, Mois), avec taux de realisation et bouton « Exporter en PDF »."
      },
      {
        "module": "Evaluation (/evaluation)",
        "what": "Score de productivite personnel (0–100) sur 4 semaines, avec « Conseils IA » generes a la demande via le bouton « Obtenir mes conseils ». Outil personnel de suivi (un message d'etat s'affiche en l'absence de donnees ou si l'IA n'est pas activee sur le serveur)."
      },
      {
        "module": "Distinctions & rappels a l'ordre (/distinctions)",
        "what": "Recompenses virtuelles trimestrielles fondees sur la regularite du reporting et le respect des seuils d'absence. Vous y consultez votre propre distinction (bouclier ou emoticone), le detail du trimestre courant (T1–T4) et, quand le pays Cote d'Ivoire est selectionne, un message en style ivoirien avec lecture audio. Acces personnel, sans permission dediee."
      },
      {
        "module": "Notifications (/notifications)",
        "what": "Centre de notifications in-app : vous listez vos 50 dernieres notifications (dont les defis Academy), les marquez lues en cliquant (et suivez leur lien), et utilisez « Tout marquer comme lu »."
      },
      {
        "module": "Parametres (/parametres)",
        "what": "Vos preferences personnelles : « Periode de bilan par defaut » et interrupteur « Rappels des rendez-vous », enregistres via « Enregistrer »."
      },
      {
        "module": "Mot de passe oublie (/mot-de-passe-oublie) et Reinitialiser le mot de passe (/reinitialiser-mot-de-passe)",
        "what": "Auto-depannage de connexion : vous demandez un lien de reinitialisation par e-mail (valable 1 heure, usage unique) puis definissez un nouveau mot de passe (min. 8 caracteres)."
      }
    ],
    "workflows": [
      {
        "title": "Demarrer votre premier parcours de formation",
        "steps": [
          "Depuis la navigation, ouvrez « EduLex Academy » (/academy).",
          "Reperez en haut vos XP, votre serie et votre niveau, puis parcourez la section « Parcours disponibles ».",
          "Utilisez les boutons « Categories de parcours » pour filtrer selon le domaine qui vous interesse.",
          "Sur la carte d'un parcours adapte a votre niveau, cliquez sur « Commencer ».",
          "Sur la page du parcours, reperez l'unite 1 et ouvrez sa premiere lecon (le nombre de questions est indique)."
        ]
      },
      {
        "title": "Repondre a un quiz et gagner des XP",
        "steps": [
          "Ouvrez une lecon depuis un parcours (/academy/lesson/[id]).",
          "Lisez l'enonce, selectionnez votre/vos reponse(s) selon le type (QCU, QCM ou Vrai/Faux), puis cliquez sur « Valider ».",
          "Lisez le feedback affiche : « Bonne reponse · +X XP » ou « Reponse incorrecte », avec l'explication pedagogique.",
          "Pour approfondir, cliquez sur « Voir le texte → » afin d'ouvrir le texte EduLex source (notez la mention « a verifier » si le texte est au niveau V0).",
          "Cliquez sur « Question suivante » jusqu'a la derniere, puis sur « Terminer la lecon ».",
          "Sur l'ecran de fin, consultez vos bonnes reponses, vos « XP gagnes » et votre pourcentage de parcours ; choisissez « Retour au parcours » ou « Recommencer »."
        ]
      },
      {
        "title": "Suivre votre progression et reviser vos points faibles",
        "steps": [
          "Depuis Academy, cliquez sur le raccourci « Ma progression » (/academy/progress).",
          "Consultez vos « XP cumules », votre « Niveau N » (barre de progression) et votre « Serie d'apprentissage ».",
          "Dans « Mes parcours », reperez ceux dont le pourcentage est le plus faible pour les poursuivre.",
          "Dans « Textes a revoir », cliquez sur une recommandation pour ouvrir la fiche EduLex correspondant a une question manquee.",
          "Revenez a Academy et relancez la lecon concernee pour ameliorer votre score."
        ]
      },
      {
        "title": "Debloquer et suivre vos badges",
        "steps": [
          "Depuis Academy, cliquez sur « Badges & trophees » (/academy/badges).",
          "Lisez votre ratio « X / Y badge(s) obtenu(s) » en haut de page.",
          "Parcourez les badges « Obtenu le [date] » pour voir vos reussites.",
          "Identifiez les badges « A debloquer » (cadenas) et lisez leur description pour comprendre la condition a remplir.",
          "Retournez sur les parcours concernes pour accomplir l'objectif et debloquer le badge."
        ]
      },
      {
        "title": "Vous situer dans le classement citoyen",
        "steps": [
          "Depuis Academy, cliquez sur « Classement » (/academy/leaderboard).",
          "Parcourez le top 50 (rang/medaille, initiales, nom, « Niveau N », serie, total XP).",
          "Reperez votre propre ligne, mise en evidence avec la mention « (vous) ».",
          "Notez l'ecart d'XP avec les apprenants situes juste au-dessus de vous.",
          "Retournez sur Academy pour enchainer des lecons et gagner les XP necessaires a votre progression dans le classement."
        ]
      },
      {
        "title": "Adapter l'interface a votre profil",
        "steps": [
          "Ouvrez « Mon profil » (/account).",
          "Dans la carte « Type de profil », choisissez l'option qui vous correspond : Personnel, Ecole, Entreprise ou Association.",
          "Constatez que le choix actif est mis en evidence et que la terminologie de l'interface s'adapte partout.",
          "Si vous le souhaitez, cliquez sur « Changer la photo » pour personnaliser votre avatar (image uniquement)."
        ]
      },
      {
        "title": "Activer vos rappels et planifier une session d'etude",
        "steps": [
          "Ouvrez « Parametres » (/parametres), activez l'interrupteur « Rappels des rendez-vous », puis cliquez sur « Enregistrer ».",
          "Ouvrez « Rendez-vous » (/rendez-vous) et cliquez sur « Ajouter ».",
          "Saisissez un titre (ex. « Session de revision Academy »), la date et l'heure, le lieu et un delai de rappel.",
          "Cliquez sur « Ajouter le rendez-vous » : il apparait dans la liste « A venir ».",
          "Une fois la session faite, cochez « Marquer fait » pour la suivre dans votre bilan."
        ]
      },
      {
        "title": "Faire le point sur votre regularite (bilan et evaluation)",
        "steps": [
          "Ouvrez « Bilan & synthese » (/bilan) et choisissez la periode (Semaine, Quinzaine ou Mois).",
          "Lisez votre « Taux de realisation » ainsi que vos rendez-vous honores et activites validees ; exportez au besoin via « Exporter en PDF ».",
          "Ouvrez « Evaluation » (/evaluation) pour consulter votre score de productivite et son evolution sur 4 semaines.",
          "Cliquez sur « Obtenir mes conseils » pour generer 2 a 3 recommandations personnalisees, puis « Regenerer » si besoin."
        ]
      }
    ],
    "tips": [
      "Maintenez votre « Serie » d'apprentissage : revenir chaque jour sur Academy, meme pour une seule lecon, fait progresser votre serie et votre regularite.",
      "Apres chaque reponse incorrecte, lisez l'explication et cliquez sur « Voir le texte → » : c'est le moyen le plus rapide de retenir la regle officielle.",
      "Consultez regulierement « Textes a revoir » dans Ma progression : cette liste cible precisement vos lacunes issues de vos erreurs.",
      "Visez les badges « A debloquer » comme objectifs : leur description indique l'action concrete a realiser.",
      "Si un texte affiche la mention « a verifier » (niveau V0), considerez son contenu avec prudence : l'entree n'est pas encore certifiee.",
      "Activez vos rappels dans Parametres et planifiez vos sessions dans Rendez-vous pour ancrer une habitude d'apprentissage.",
      "Surveillez vos Notifications : les defis Academy et les nouveautes y sont signales."
    ],
    "limits": [
      "Vous ne pouvez pas creer, modifier ni publier de parcours, de lecons ou de quiz : ces actions relevent du role de gestion Academy (academy:create/update/publish/manage).",
      "Vous n'avez pas acces a l'Administration Academy (/academy/admin) ni a la creation de questions (/academy/admin/questions/new) : impossible de gerer le statut des questions ou d'en ajouter.",
      "La carte « Modules d'evaluation officiels » et ses boutons « Generer — [pays] » et « Generer pour tous les pays » ne vous sont pas accessibles.",
      "Vous ne consultez ni ne gerez le referentiel EduLex (textes, pays, ministeres, secteurs, file de validation) : vous n'ouvrez les fiches de textes que via le lien « Voir le texte → » d'un quiz, sans pouvoir les deposer, valider, publier ni modifier.",
      "Vous n'avez aucun acces aux modules de gouvernance : Organisation & structures, Utilisateurs, Formulaires d'activites, Activites, Validation hierarchique, Reporting institutionnel et Archives vous sont fermes.",
      "Vous ne gerez pas les comptes ni les roles d'autres utilisateurs et ne pouvez pas deleguer de droits.",
      "Vous ne consultez ni les journaux d'audit ni l'espace d'administration de la plateforme (/admin) : les permissions admin:read et admin:manage ne sont pas detenues par ce role.",
      "Les outils personnels (profil, agenda, bilan, evaluation, distinctions, parametres, notifications) restent strictement individuels : ils n'affichent que vos propres donnees et n'ouvrent aucun acces de gouvernance."
    ]
  },
  {
    "roleKey": "public_authorized",
    "tagline": "Citoyen et public autorisé qui consulte librement le référentiel réglementaire EduLex et se forme à la gouvernance éducative via EduLex Academy.",
    "intro": "Le rôle « Public autorisé » s'adresse aux citoyens et aux personnes habilitées qui accèdent à la plateforme pour s'informer et se former, sans aucune responsabilité de gestion. Son périmètre se limite à la consultation du référentiel réglementaire international EduLex et à la formation citoyenne via EduLex Academy. Il dispose des seuls droits de lecture edulex:read et academy:read : il parcourt les textes réglementaires et suit les parcours de formation, mais ne dépose, ne modifie ni ne valide aucune donnée. C'est un rôle d'observateur-apprenant, sans accès aux modules de gouvernance interne (organisation, utilisateurs, activités, rapports, absences).",
    "access": [
      {
        "module": "Accueil (page d'accueil publique) (/)",
        "what": "Consulter la page vitrine de la plateforme : découvrir les trois piliers (Gouvernance administrative, EduLex, EduLex Academy), voir les statistiques de fréquentation en direct (LiveStats), et naviguer vers EduLex (/edulex) ou EduLex Academy (/academy) via les piliers cliquables et les liens de la barre de navigation (Produit, EduLex, Academy, Contact)."
      },
      {
        "module": "Tableau de bord (/dashboard)",
        "what": "Une fois connecté, l'entrée « Accueil » de la navigation latérale ouvre le tableau de bord personnalisé. Vous y consultez en lecture les indicateurs qui relèvent de votre périmètre : KPI « Textes EduLex disponibles » et « Textes à vérifier », « Parcours Academy publiés », la carte « EduLex — récents » (5 textes mis à jour avec code, badge de niveau V0–V4 et pays, liens vers les fiches), et la carte « Programme de parrainage commercial » (code promo, lien d'invitation, boutons Copier / Partager). Les actions de gouvernance (bouton « Nouvelle activité », files de validation) ne vous sont pas destinées."
      },
      {
        "module": "EduLex — référentiel réglementaire (/edulex)",
        "what": "Consulter le référentiel réglementaire international en lecture seule : voir les 4 KPI (Textes au total, En vigueur, À vérifier [V0 / à vérifier], Certifiés V4), rechercher par mot-clé (titre, code, numéro officiel, résumé, tags), filtrer par Catégorie, Statut, Type et Niveau (boutons « Filtrer » / « Réinitialiser »), et ouvrir la fiche d'un texte via sa carte. Le périmètre est restreint par le filtre Pays de la barre supérieure. Les boutons « Déposer un texte » et « File de validation » ainsi que les liens de référentiel (Pays, Ministères, Secteurs, Import d'amorçage) ne vous sont pas visibles."
      },
      {
        "module": "Fiche d'un texte EduLex (/edulex/texts/[id])",
        "what": "Lire en détail un texte réglementaire : ses badges (Type, Statut, Niveau de vérification V0→V4, Confidentialité), les avertissements éventuels (« Ce texte est au niveau V0 : entrée non vérifiée », « Ce texte n'est pas en vigueur »), télécharger le PDF ou le Markdown, consulter la source officielle, et parcourir les relations entre textes (Remplace / Modifie / Abroge / Lié à / Cite), l'« Historique des versions », le « Journal de validation » et la traçabilité « Déposé par » / « Validé par ». Le panneau de validation V0→V4 et le téléversement de document source restent inaccessibles (réservés aux validateurs / éditeurs)."
      },
      {
        "module": "EduLex Academy (/academy)",
        "what": "Accéder à l'espace de formation citoyenne (« EduLex CI Academy » quand le pays sélectionné est la Côte d'Ivoire) : voir le hero avec vos XP, votre Série et votre Niveau, utiliser les accès rapides (Ma progression, Badges & trophées, Classement), consulter les 5 Niveaux de compétence (Découverte, Compréhension, Application, Maîtrise, Expert / Référent), filtrer par Catégories de parcours, parcourir les Parcours disponibles et en ouvrir un (« Commencer »). La carte « Modules d'évaluation officiels » et ses boutons de génération n'apparaissent pas (réservés à academy:manage)."
      },
      {
        "module": "Parcours Academy (/academy/path/[id])",
        "what": "Consulter le détail d'un parcours : son en-tête (badge « Niveau N », catégorie, titre, description), ses unités numérotées et leurs marqueurs de prérequis (cadenas), ouvrir une leçon (avec le nombre de questions), et revenir à Academy."
      },
      {
        "module": "Leçon Academy (quiz) (/academy/lesson/[id])",
        "what": "Suivre un quiz interactif : répondre aux questions (QCU, QCM, Vrai / Faux) et « Valider », lire le feedback pédagogique (« Bonne réponse · +X XP » ou « Réponse incorrecte ») avec l'explication et le bloc « Voir le texte → » vers le texte EduLex source (avec mention « à vérifier » si V0), passer à la « Question suivante », « Terminer la leçon », puis consulter l'écran de fin (bonnes réponses, XP gagnés, % de parcours, « Retour au parcours », « Recommencer »)."
      },
      {
        "module": "Ma progression (Academy) (/academy/progress)",
        "what": "Consulter votre tableau de bord d'apprenant : XP cumulés, Niveau (barre de progression), Série d'apprentissage, le pourcentage d'avancement de « Mes parcours », les « Textes à revoir » recommandés (ouvrant la fiche EduLex) et « Mes badges »."
      },
      {
        "module": "Badges & trophées (Academy) (/academy/badges)",
        "what": "Parcourir la galerie de tous les badges : voir le ratio « X / Y badge(s) obtenu(s) », l'icône, le nom et la description de chaque badge, ainsi que la date d'obtention (« Obtenu le [date] ») ou la mention « À débloquer »."
      },
      {
        "module": "Classement citoyen (Academy) (/academy/leaderboard)",
        "what": "Consulter le classement des apprenants : le top 50 (rang / médaille, initiales, nom, « Niveau N », série, total XP) et repérer votre propre ligne mise en évidence avec « (vous) »."
      },
      {
        "module": "Notifications (/notifications)",
        "what": "Consulter vos 50 dernières notifications in-app (notamment publications EduLex et défis Academy), cliquer une notification pour la marquer lue et suivre son lien, et utiliser « Tout marquer comme lu »."
      },
      {
        "module": "Mon profil (/account)",
        "what": "Gérer votre compte personnel : voir l'avatar (ou vos initiales), votre nom complet et vos badges de rôles, changer votre photo de profil (images uniquement), consulter vos cartes E-mail / Organisation / Pays, et choisir votre « Type de profil » (Personnel, École, Entreprise, Association) qui adapte la terminologie de l'interface."
      },
      {
        "module": "Paramètres (/parametres)",
        "what": "Régler vos préférences personnelles : « Période de bilan par défaut » et activation / désactivation des « Rappels des rendez-vous », puis « Enregistrer »."
      },
      {
        "module": "Mot de passe oublié (/mot-de-passe-oublie) et Réinitialiser le mot de passe (/reinitialiser-mot-de-passe)",
        "what": "En cas de perte d'accès, demander un lien de réinitialisation par e-mail (valable 1 heure, à usage unique), puis définir un nouveau mot de passe (min. 8 caractères) à partir du lien reçu."
      }
    ],
    "workflows": [
      {
        "title": "Rechercher et consulter un texte réglementaire dans EduLex",
        "steps": [
          "Depuis le menu, ouvrez « EduLex » (/edulex).",
          "Si besoin, sélectionnez un pays dans le filtre Pays de la barre supérieure pour restreindre le périmètre (sinon tous les pays s'affichent).",
          "Saisissez un terme dans le champ « Rechercher par mot-clé… » (titre, code, numéro officiel, résumé ou tag).",
          "Affinez avec les filtres Catégorie, Statut, Type et Niveau, puis cliquez « Filtrer » (ou « Réinitialiser » pour repartir de zéro).",
          "Cliquez sur la carte du texte voulu pour ouvrir sa fiche complète.",
          "Sur la fiche, lisez les badges (Type, Statut, Niveau V0→V4, Confidentialité) et tenez compte des avertissements éventuels (« niveau V0 : entrée non vérifiée », « texte non en vigueur »)."
        ]
      },
      {
        "title": "Télécharger un texte officiel et vérifier sa fiabilité",
        "steps": [
          "Ouvrez la fiche du texte concerné depuis EduLex (/edulex/texts/[id]).",
          "Utilisez « Télécharger (PDF) » ou « Markdown » pour récupérer le contenu.",
          "Cliquez « Consulter la source officielle » pour vérifier le texte auprès de l'émetteur.",
          "Vérifiez le niveau de vérification (V4 = certifié, V0 = entrée non vérifiée) et le statut (En vigueur ou non) avant de vous y fier.",
          "Consultez le « Journal de validation » et la traçabilité « Déposé par » / « Validé par » pour évaluer la fiabilité de l'information."
        ]
      },
      {
        "title": "Démarrer un parcours de formation dans EduLex Academy",
        "steps": [
          "Ouvrez « Academy » (/academy) depuis le menu ou le pilier « EduLex Academy » de la page d'accueil.",
          "Repérez vos XP, votre Série et votre Niveau dans le hero.",
          "Filtrez les parcours via les boutons « Catégories de parcours » selon le thème souhaité.",
          "Dans « Parcours disponibles », choisissez une carte adaptée à votre niveau et cliquez « Commencer ».",
          "Sur la page du parcours, parcourez les unités numérotées (un cadenas signale un prérequis à débloquer) et ouvrez la première leçon disponible."
        ]
      },
      {
        "title": "Répondre à un quiz et gagner des XP",
        "steps": [
          "Depuis un parcours, ouvrez une leçon (/academy/lesson/[id]).",
          "Sélectionnez votre/vos réponse(s) à la question, puis cliquez « Valider ».",
          "Lisez le feedback (« Bonne réponse · +X XP » ou « Réponse incorrecte ») et son explication ; cliquez « Voir le texte → » pour consulter le texte EduLex source.",
          "Cliquez « Question suivante » et répétez jusqu'à « Terminer la leçon ».",
          "Sur l'écran de fin, notez vos bonnes réponses, vos « XP gagnés » et le % de progression du parcours ; choisissez « Retour au parcours » ou « Recommencer »."
        ]
      },
      {
        "title": "Suivre sa progression, ses badges et son classement",
        "steps": [
          "Ouvrez « Ma progression » (/academy/progress) depuis les accès rapides d'Academy.",
          "Consultez vos XP cumulés, votre Niveau et votre Série d'apprentissage.",
          "Dans « Mes parcours », repérez le pourcentage d'avancement de chacun ; dans « Textes à revoir », cliquez une recommandation pour réviser le texte EduLex correspondant.",
          "Ouvrez « Badges & trophées » (/academy/badges) pour voir les badges obtenus et ceux « À débloquer ».",
          "Ouvrez « Classement » (/academy/leaderboard) pour situer votre rang parmi les apprenants (votre ligne est marquée « (vous) »)."
        ]
      },
      {
        "title": "Personnaliser son compte et ses préférences",
        "steps": [
          "Ouvrez « Mon profil » (/account).",
          "Cliquez « Changer la photo » pour mettre à jour votre avatar (images uniquement).",
          "Choisissez votre « Type de profil » (Personnel, École, Entreprise, Association) pour adapter la terminologie de l'interface.",
          "Ouvrez « Paramètres » (/parametres) pour régler la « Période de bilan par défaut » et activer / désactiver les « Rappels des rendez-vous ».",
          "Cliquez « Enregistrer » pour valider vos préférences."
        ]
      },
      {
        "title": "Récupérer l'accès à son compte en cas d'oubli du mot de passe",
        "steps": [
          "Sur l'écran de connexion, cliquez le lien « Mot de passe oublié » (/mot-de-passe-oublie).",
          "Saisissez votre « Adresse e-mail » et cliquez « Envoyer le lien ».",
          "Ouvrez l'e-mail reçu (lien valable 1 heure, à usage unique) et suivez-le.",
          "Sur la page de réinitialisation, saisissez un « Nouveau mot de passe » (min. 8 caractères) et confirmez-le.",
          "Cliquez « Réinitialiser le mot de passe », puis « Se connecter »."
        ]
      }
    ],
    "tips": [
      "Utilisez systématiquement le filtre Pays de la barre supérieure dans EduLex pour ne consulter que la juridiction qui vous intéresse (par exemple la Côte d'Ivoire).",
      "Fiez-vous au niveau de vérification : un texte certifié V4 et « En vigueur » est fiable ; un texte V0 porte la mention « entrée non vérifiée » et doit être utilisé avec prudence.",
      "Dans une leçon, cliquez toujours « Voir le texte → » après une réponse : cela vous renvoie au texte officiel et ancre l'apprentissage sur la source réglementaire réelle.",
      "Consultez régulièrement « Textes à revoir » dans Ma progression : ces recommandations ciblent les notions où vous avez répondu incorrectement.",
      "Maintenez votre « Série d'apprentissage » en revenant chaque jour : la régularité fait progresser votre niveau et votre rang au classement.",
      "Surveillez vos notifications : elles vous signalent les nouvelles publications EduLex et les défis Academy."
    ],
    "limits": [
      "Vous ne pouvez pas déposer, modifier, valider, publier, archiver ni importer de texte EduLex : ces actions exigent les droits edulex:create, edulex:update, edulex:validate, edulex:publish ou edulex:manage (les boutons « Déposer un texte » et « File de validation » et le panneau de validation V0→V4 ne vous sont pas accessibles).",
      "Vous ne pouvez pas accéder aux référentiels EduLex (Pays, Ministères, Secteurs, Import d'amorçage), réservés aux gestionnaires (edulex:manage).",
      "Dans Academy, vous ne pouvez ni créer, modifier ou publier de parcours, leçons ou questions, ni générer les modules d'évaluation officiels : cela relève d'academy:manage (Administration Academy, Nouvelle question).",
      "Vous n'avez aucun accès aux modules de gouvernance interne : Organisation & structures, Utilisateurs, Formulaires d'activités, Activités, Validation hiérarchique, Reporting institutionnel, Autorisations d'absence, Archives et Administration vous sont fermés.",
      "Vous ne pouvez pas gérer d'autres comptes ni attribuer de rôles ou de permissions : la gestion des utilisateurs requiert user:manage.",
      "Vous n'intervenez dans aucun circuit de validation (ni des activités, ni des textes EduLex, ni des absences) : votre rôle est strictement consultatif et formatif.",
      "Les préférences « Période de bilan par défaut » et « Rappels des rendez-vous » restent réglables, mais les modules Bilan, Rendez-vous, Évaluation et Distinctions qu'elles concernent ne font pas partie de votre périmètre de gouvernance."
    ]
  }
];
