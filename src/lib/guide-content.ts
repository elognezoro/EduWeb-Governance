// AUTO-GÉNÉRÉ — contenu des guides d'utilisateur par rôle.
// Rédigé puis révisé par un atelier multi-agents, ancré sur le code réel.
// Ne pas éditer à la main : régénérer via l'atelier « role-user-guides ».
import type { RoleGuide } from "./guide-data";

export const GUIDES: RoleGuide[] = [
  {
    "roleKey": "super_admin",
    "tagline": "Garant suprême de la plateforme EduWeb : vous gouvernez l'ensemble du système, de l'organigramme des ministères au référentiel EduLex et à l'Academy, sans aucune restriction d'accès.",
    "intro": "Le Super Administrateur EduWeb est le titulaire du périmètre SYSTÈME. Il dispose de la totalité des permissions de la plateforme : gestion des organisations et des structures, des comptes et des rôles, des formulaires, des activités et de leur validation, des rapports, du référentiel réglementaire EduLex et de l'EduLex Academy, ainsi que de l'espace d'administration et des journaux d'audit. À ce titre, il configure le socle de gouvernance, supervise l'ensemble des organisations clientes et des pays, et conserve des prérogatives exclusives que nul autre rôle ne détient, notamment la suppression des structures et des organisations et le réglage de la déconnexion automatique par inactivité. Son action s'exerce sur l'intégralité du système, au-delà du périmètre d'une organisation unique.",
    "access": [
      {
        "module": "Accueil (/)",
        "what": "Consulter la vitrine publique de la plateforme, les trois piliers (Gouvernance administrative, EduLex, EduLex Academy), les statistiques en temps réel (LiveStats) et accéder à l'espace via « Se connecter » ou « Accéder à la plateforme »."
      },
      {
        "module": "Tableau de bord (/dashboard)",
        "what": "Disposer de la vue d'ensemble personnalisée sur le périmètre Pays/subdivision sélectionné : les KPI (Activités saisies, Activités validées, En attente de validation, Rapports générés, Textes EduLex disponibles, Textes à vérifier, Parcours Academy publiés, Taux de validation), les graphiques « Évolution des activités » et « Répartition par statut », les feeds d'activités et d'EduLex récents, le bloc « Mes demandes d'absence » (avec badge « N à valider » et lien « Traiter → ») et la carte de parrainage commercial. Lancer une « Nouvelle activité »."
      },
      {
        "module": "Rendez-vous (/rendez-vous)",
        "what": "Gérer votre agenda personnel privé : ajouter, modifier, supprimer des rendez-vous, définir un rappel (5 min / 1 h / 1 jour avant), et cocher « fait » / « non fait ». Ces RDV alimentent votre propre Bilan et votre Évaluation."
      },
      {
        "module": "Bilan & synthèse (/bilan)",
        "what": "Consulter votre bilan personnel de réalisation par période (Semaine / Quinzaine / Mois), lire le « Taux de réalisation » et les listes « Faits » / « Non faits », et exporter le bilan en PDF."
      },
      {
        "module": "Évaluation (/evaluation)",
        "what": "Consulter votre score de productivité personnel /100, la tendance vs semaine précédente, l'évolution sur 4 semaines, et générer des « Conseils IA » personnalisés."
      },
      {
        "module": "Distinctions & rappels à l'ordre (/distinctions)",
        "what": "Accès élargi propre au super administrateur : voir la fiche de distinction de TOUS les agents actifs (et non des seuls subordonnés), par année (année courante, N-1, N-2) et par trimestre (écusson de belle performance ou émoticône de redressement), consulter le détail des règles d'attribution (régularité du reporting ≥ 50 %, affaires personnelles < 20 %, raison médicale < 40 %) et écouter les messages en style ivoirien quand le pays sélectionné est la Côte d'Ivoire."
      },
      {
        "module": "Mon profil (/account)",
        "what": "Consulter votre identité, vos rôles et informations clés ; changer votre photo et votre type de profil (Personnel / École / Entreprise / Association), ce qui adapte la terminologie du module Activités et la période de bilan par défaut."
      },
      {
        "module": "Organisation & structures (/organization)",
        "what": "Visualiser l'organigramme complet (ministères techniques et organisations clientes) ; créer (« + Structure », « + Organisation »), éditer (crayon), ajouter un logo, et réorganiser les structures par glisser-déposer ou au clic (poignée GripVertical → « Déposer ici »). Prérogative EXCLUSIVE du super administrateur : SUPPRIMER une structure ou une organisation (suppression en cascade des structures rattachées) via le dialogue de confirmation."
      },
      {
        "module": "Nouvelle organisation (/organization/new)",
        "what": "Créer une organisation cliente : pré-remplir le nom via la liste recherchable des ministères du gouvernement ivoirien actuel (ou « — Saisie libre — »), choisir le type (Ministère, Institution, Réseau, Association, Entreprise / Société) et le pays."
      },
      {
        "module": "Nouvelle / Modifier structure (/organization/structures/new • /[id])",
        "what": "Créer ou modifier une structure : nom, type (Direction, Sous-direction, Service, Antenne, Direction régionale, Coordination, Équipe), organisation, structure parente, ministère de rattachement, pays, subdivision/région et responsable. Sur la fiche d'édition, vous seul disposez du bouton « Supprimer » (refusé si des sous-structures existent)."
      },
      {
        "module": "Utilisateurs (/users)",
        "what": "Consulter l'annuaire de TOUS les comptes au-delà d'une seule organisation (grâce à admin:manage) ; rechercher, sélectionner en masse, supprimer (suppression douce unitaire ou groupée), télécharger le modèle CSV, importer et créer un nouvel utilisateur."
      },
      {
        "module": "Nouvel utilisateur / Fiche (/users/new • /[id])",
        "what": "Créer un compte (profil, rattachements, supérieur hiérarchique, rôles), éditer un agent, activer/désactiver son compte (la désactivation coupe les sessions), réinitialiser son mot de passe (min. 8 car.) et lui déléguer des permissions directes au-delà de ses rôles (carte « Délégation de droits »)."
      },
      {
        "module": "Importer des utilisateurs (/users/import)",
        "what": "Enregistrer plusieurs comptes en une fois via un CSV (colonnes email, prénom, nom, mot de passe, rôles, etc.), consulter l'aide sur les colonnes et les clés de rôle valides, et lire le rapport d'import (importés / ignorés + erreurs par ligne)."
      },
      {
        "module": "Formulaires d'activités (/forms)",
        "what": "Parcourir TOUS les formulaires au-delà d'une organisation (admin:manage) ; ouvrir le concepteur et créer un « Nouveau formulaire »."
      },
      {
        "module": "Nouveau formulaire / Concepteur (/forms/new • /[id])",
        "what": "Créer un formulaire, composer ses champs (tous les types : texte court/long, date, nombre, listes, radio, cases, fichier, image, tableau répétable, champ calculé, lien EduLex), réordonner, gérer le cycle de vie (Publier, Repasser en brouillon, Archiver) avec versionnage, et supprimer."
      },
      {
        "module": "Activités (/activities)",
        "what": "Voir TOUT l'inventaire des activités (admin:manage), filtrer par statut (Brouillon, Soumis, En examen, Validé, Rejeté, À corriger, Consolidé, Archivé), rechercher, ouvrir le détail et créer une « Nouvelle activité »."
      },
      {
        "module": "Nouvelle / Détail / Modifier activité (/activities/new • /[id] • /[id]/edit)",
        "what": "Créer/éditer une activité, joindre des documents, l'associer à des textes EduLex, la soumettre au circuit de validation, consulter l'historique, et — disposant d'activity:validate — statuer (Valider, Demander correction, Rejeter, Consolider) au niveau hiérarchique requis."
      },
      {
        "module": "Validation hiérarchique (/validation)",
        "what": "Voir la file de validation au-delà de votre organisation (admin:manage), consulter le circuit de validation et les niveaux attendus, et statuer sur les activités en attente (Soumis / En examen / À corriger)."
      },
      {
        "module": "Autorisations d'absence (/absences)",
        "what": "Voir TOUS les agents (et non vos seuls subordonnés) ; régler la politique d'absences (« Modifier » le congé annuel réglementaire et le seuil d'alerte) ; approuver / refuser les demandes, comptabiliser une absence d'office, supprimer un enregistrement, et demander vous-même une absence si un supérieur hiérarchique vous est défini."
      },
      {
        "module": "Reporting institutionnel (/reports)",
        "what": "Consulter TOUS les rapports au-delà d'une organisation (admin:manage) ; ouvrir un rapport et lancer « Générer un rapport »."
      },
      {
        "module": "Générer / Détail du rapport (/reports/new • /[id])",
        "what": "Composer un rapport (titre, périodicité, pays, organisation, structure, dates), agréger les activités au statut « Validé » ou « Consolidé », consulter le détail (indicateurs, activités, références EduLex), imprimer et supprimer."
      },
      {
        "module": "EduLex — référentiel (/edulex)",
        "what": "Consulter les 4 KPI, rechercher en plein texte et filtrer (catégorie, statut, type, niveau V0–V4) ; « Déposer un texte », accéder à la « File de validation » et aux raccourcis référentiels (Pays, Ministères, Secteurs, Import d'amorçage) grâce à edulex:create/manage."
      },
      {
        "module": "Déposer un texte EduLex (/edulex/texts/new)",
        "what": "Déposer un nouveau texte réglementaire (code EduLex auto-généré, titre, pays, type, ministère émetteur, secteur, juridiction, dates, statut initial, confidentialité, langue, résumé, URL source). Le texte est toujours créé au niveau V0."
      },
      {
        "module": "Fiche d'un texte EduLex (/edulex/texts/[id])",
        "what": "Consulter les métadonnées, télécharger PDF/Markdown, téléverser des documents source, gérer les relations entre textes ; via le panneau « Validation à partir de sources officielles », faire progresser le texte V0→V4 et changer son statut ; « Publier (mettre en vigueur) » grâce à edulex:publish."
      },
      {
        "module": "Validation EduLex (/edulex/validation)",
        "what": "Voir la file des textes à vérifier (compteurs « Textes à traiter » et « Non vérifiés (V0) »), examiner chaque texte et statuer via le panneau de validation (edulex:validate)."
      },
      {
        "module": "Import d'amorçage EduLex (/edulex/import)",
        "what": "Importer en masse des textes par collage CSV/TSV, choisir le pays d'affectation, prévisualiser puis importer (tous marqués V0)."
      },
      {
        "module": "EduLex — Pays & juridictions (/edulex/countries)",
        "what": "Consulter la liste des pays et leurs compteurs ; AJOUTER un pays (nom, code ISO, drapeau, namespace) grâce à edulex:manage."
      },
      {
        "module": "EduLex — Ministères & gouvernements (/edulex/ministries)",
        "what": "Déclarer un gouvernement, ajouter / éditer / supprimer (unitaire ou multiple) des ministères émetteurs par pays, et supprimer un gouvernement (edulex:manage)."
      },
      {
        "module": "EduLex — Secteurs réglementaires (/edulex/sectors)",
        "what": "Ajouter, éditer et supprimer (unitaire ou multiple) des secteurs de classification, rattachables à un pays ou internationaux (edulex:manage)."
      },
      {
        "module": "EduLex Academy (/academy)",
        "what": "Consulter le profil de progression, les 5 niveaux de compétence (Découverte, Compréhension, Application, Maîtrise, Expert / Référent), les catégories et parcours publiés ; via academy:manage, « Générer » les modules d'évaluation officiels pour un pays ou pour tous les pays."
      },
      {
        "module": "Academy — Parcours (/academy/path/[id])",
        "what": "Consulter les unités, prérequis et leçons d'un parcours et lancer un quiz."
      },
      {
        "module": "Academy — Leçon / Quiz (/academy/lesson/[id])",
        "what": "Répondre aux quiz, lire le feedback pédagogique relié au texte EduLex source et terminer la leçon."
      },
      {
        "module": "Academy — Ma progression (/academy/progress)",
        "what": "Consulter vos XP, niveau, série, parcours en cours, badges et « Textes à revoir »."
      },
      {
        "module": "Academy — Badges & trophées (/academy/badges)",
        "what": "Consulter la galerie de badges et votre état d'obtention."
      },
      {
        "module": "Academy — Classement citoyen (/academy/leaderboard)",
        "what": "Consulter le classement des apprenants et repérer votre position."
      },
      {
        "module": "Administration Academy (/academy/admin)",
        "what": "Gérer les questions de quiz (academy:manage) : créer une « Nouvelle question », publier / dépublier et supprimer, consulter le tableau (réponses, tentatives, texte lié, statut)."
      },
      {
        "module": "Academy — Nouvelle question (/academy/admin/questions/new)",
        "what": "Créer une question reliée à une leçon (parcours › unité › leçon), à un texte EduLex source et à un secteur, avec énoncé et choix de réponse."
      },
      {
        "module": "Notifications (/notifications)",
        "what": "Consulter les 50 dernières notifications in-app, « Tout marquer comme lu » et ouvrir le lien associé à chacune."
      },
      {
        "module": "Paramètres (/parametres)",
        "what": "Régler vos préférences personnelles : période de bilan par défaut et activation des rappels de rendez-vous."
      },
      {
        "module": "Archives (/archives)",
        "what": "Voir la vue consolidée des éléments archivés/obsolètes sur TOUT le périmètre (admin:manage) : activités consolidées/archivées, textes EduLex obsolètes (Abrogé / Remplacé / Suspendu / Archivé) et formulaires archivés."
      },
      {
        "module": "Administration (/admin)",
        "what": "Consulter les statistiques RBAC (Utilisateurs, Pays, Rôles, Permissions, Textes EduLex) ; éditer la « Hiérarchie de validation » des activités (ordonner les rôles valideurs, ajouter/retirer un niveau, enregistrer) ; et — réglage EXCLUSIF du super administrateur — activer la déconnexion automatique par inactivité et fixer le délai (1 à 1440 min)."
      }
    ],
    "workflows": [
      {
        "title": "Mettre en place une nouvelle organisation cliente et son organigramme",
        "steps": [
          "Ouvrez « Organisation & structures » (/organization).",
          "Cliquez « + Organisation » pour ouvrir /organization/new.",
          "Dans la liste recherchable « Ministère du gouvernement actuel », choisissez un ministère ivoirien (le nom et le type « Ministère » se pré-remplissent) ou sélectionnez « — Saisie libre — » et renseignez le champ « Nom de l'organisation * ».",
          "Choisissez le « Type » et le « Pays », puis cliquez « Créer l'organisation ».",
          "De retour sur /organization, cliquez « + Structure » pour ouvrir /organization/structures/new.",
          "Renseignez « Nom de la structure * », « Type * », l'« Organisation * » créée, la « Structure parente » (— Aucune (racine) — pour l'apex), le ministère de rattachement, le « Pays », la « Subdivision / région » et le « Responsable », puis cliquez « Créer la structure ».",
          "Réorganisez si besoin par glisser-déposer (ou via la poignée GripVertical puis « Déposer ici ») pour positionner la structure sous le bon ministère ou parent."
        ]
      },
      {
        "title": "Créer un compte agent et lui déléguer un droit de validation",
        "steps": [
          "Ouvrez « Utilisateurs » (/users) puis cliquez « Nouvel utilisateur » (/users/new).",
          "Renseignez Prénom *, Nom *, E-mail *, Genre * et le « Mot de passe initial * » (min. 8 caractères).",
          "Définissez les rattachements : Organisation, Structure, Pays, Ministère et surtout le « Supérieur hiérarchique (pour le suivi des absences) ».",
          "Cochez au moins un rôle dans les groupes Système / Gouvernance / EduLex / Academy, puis cliquez « Créer l'utilisateur ».",
          "Sur la fiche [id], ouvrez la carte « Délégation de droits » (PermissionDelegation) et attribuez une permission directe au-delà de ses rôles (par exemple activity:validate).",
          "Au besoin, depuis la carte « Administration », activez/désactivez le compte ou réinitialisez le mot de passe (min. 8 caractères)."
        ]
      },
      {
        "title": "Configurer le circuit de validation des activités et la sécurité des sessions",
        "steps": [
          "Ouvrez l'« Administration » (/admin).",
          "Dans « Hiérarchie de validation », ajoutez un niveau via « Ajouter un niveau (rôle) » et ordonnez la chaîne de rôles valideurs avec « Monter » / « Descendre » (ou « Retirer »).",
          "Cliquez « Enregistrer la hiérarchie » (laisser la chaîne vide rétablit une validation en une seule étape).",
          "Dans la carte « Sécurité des sessions — déconnexion automatique » (réservée au super administrateur), activez l'interrupteur.",
          "Renseignez le « Délai d'inactivité (minutes) » entre 1 et 1440, ou utilisez un préréglage (5/10/15/30/60/120).",
          "Cliquez « Enregistrer » pour appliquer la déconnexion automatique."
        ]
      },
      {
        "title": "Déposer un texte EduLex et le faire certifier jusqu'au niveau V4",
        "steps": [
          "Depuis « EduLex » (/edulex), cliquez « Déposer un texte » (/edulex/texts/new).",
          "Renseignez « Titre officiel * », « Pays * », « Type * », le ministère émetteur, le secteur, les dates et le « Résumé analytique », puis cliquez « Déposer le texte » (il est créé en V0).",
          "Ouvrez sa fiche (/edulex/texts/[id]) ; dans le panneau « Validation à partir de sources officielles », renseignez la « Source officielle (URL) » et un commentaire.",
          "Cliquez successivement les boutons de niveau (V1, V2, V3 puis V4) à mesure que vous vérifiez le texte, ajustez le « Statut du texte » et cliquez « Appliquer ».",
          "Une fois certifié, cliquez « Publier (mettre en vigueur) » pour le faire passer en vigueur.",
          "Vérifiez la traçabilité (« Déposé par », « Validé par », langue et version) au bas de la fiche."
        ]
      },
      {
        "title": "Régler la politique d'absences et traiter les demandes d'un agent",
        "steps": [
          "Ouvrez « Autorisations d'absence » (/absences).",
          "Dans la carte « Politique d'absences », cliquez « Modifier » pour fixer le « Congé annuel réglementaire » et le « Seuil d'alerte », puis enregistrez.",
          "Sélectionnez l'année concernée dans le sélecteur d'année (année courante ou l'une des 2 précédentes).",
          "Dans la carte « Demandes à valider (N) », pour chaque demande cliquez « Approuver », ou « Refuser » en saisissant le « Motif du refus (facultatif) » puis « Confirmer le refus ».",
          "Pour enregistrer une absence sans demande, utilisez « Comptabiliser directement (validée d'office) » → « Ajouter » : choisissez l'Agent, le Motif, les dates et le nombre de jours, puis « Enregistrer ».",
          "Contrôlez la barre de ratio « Cumul d'absences approuvées » et les pastilles « Seuil atteint » / « Quota dépassé » par agent."
        ]
      },
      {
        "title": "Importer en masse des textes EduLex par amorçage CSV",
        "steps": [
          "Ouvrez « EduLex » (/edulex) puis le raccourci « Import d'amorçage » (/edulex/import).",
          "Choisissez le « Pays d'affectation » dans le sélecteur drapeau + nom.",
          "Collez vos « Données CSV / TSV collées » avec les colonnes titre, type, numéro officiel, code ministère, code secteur, résumé (séparateur virgule / point-virgule / tabulation, en-tête auto-détecté).",
          "Cliquez « Prévisualiser » et vérifiez le tableau (Titre, Type, N°, Min., Sect.).",
          "Cliquez « Importer N ligne(s) » et lisez le message « N texte(s) importé(s)…, X ignoré(s) en V0 ».",
          "Suivez le lien « Voir EduLex → », puis ouvrez la « File de validation » (/edulex/validation) pour faire progresser les textes hors du niveau V0."
        ]
      },
      {
        "title": "Publier un module d'évaluation Academy et gérer ses questions",
        "steps": [
          "Ouvrez « EduLex Academy » (/academy).",
          "Dans la carte « Modules d'évaluation officiels », cliquez « Générer — <pays> » (ou « Générer pour tous les pays ») pour produire les modules à partir des textes en vigueur et vérifiés.",
          "Ouvrez l'« Administration Academy » (/academy/admin) et cliquez « Nouvelle question » (/academy/admin/questions/new).",
          "Sélectionnez la leçon (« parcours › unité › leçon »), reliez la question à un texte EduLex source et à un secteur, puis saisissez l'énoncé et les choix.",
          "De retour sur /academy/admin, utilisez « Publier » / « Dépublier » pour basculer le statut des questions et « Supprimer » celles à retirer.",
          "Contrôlez dans le tableau le nombre de réponses, de tentatives et le code du texte lié."
        ]
      }
    ],
    "tips": [
      "Utilisez le filtre Pays / subdivision de la barre supérieure pour cadrer l'ensemble des modules (Tableau de bord, Organisation, Activités, Validation, EduLex…) sur le périmètre exact que vous voulez superviser ; un bandeau « Organigramme filtré » vous le confirme dans /organization.",
      "La suppression d'une organisation est irréversible et CASCADE sur toutes ses structures rattachées : lisez bien le décompte « Cette organisation et ses N structure(s) rattachée(s) seront supprimées » avant de confirmer.",
      "Avant de supprimer une structure, rattachez ou supprimez d'abord ses sous-structures, sinon l'opération est refusée (« Supprimez ou rattachez d'abord les sous-structures »).",
      "Préférez la délégation de droits ponctuelle (carte « Délégation de droits ») pour accorder une permission précise à un agent sans lui attribuer un rôle complet.",
      "Pour les imports de comptes, téléchargez d'abord le « modèle » CSV et appuyez-vous sur le panneau « Clés de rôle valides » : le serveur valide ligne par ligne et vous renvoie les erreurs précises à corriger.",
      "Tout nouveau texte EduLex (dépôt ou import) naît en V0 : planifiez systématiquement son passage dans la « File de validation » avant toute publication, et renseignez la « Source officielle (URL) ».",
      "Ne générez les modules d'évaluation Academy qu'après avoir certifié et mis en vigueur les textes sources, puisque ces modules s'appuient sur les textes en vigueur et vérifiés.",
      "Activez la déconnexion automatique par inactivité (/admin) pour renforcer la sécurité des sessions, surtout sur des postes partagés.",
      "Consultez régulièrement /distinctions (vue sur tous les agents actifs) et /absences pour repérer les franchissements de seuils et les baisses de régularité du reporting."
    ],
    "limits": [
      "Vous ne pouvez pas consulter les rendez-vous d'un autre utilisateur : l'agenda (/rendez-vous) est strictement privé et rattaché au seul compte connecté.",
      "Vous ne pouvez pas vous désactiver ni vous supprimer vous-même : la désactivation de son propre compte et l'auto-sélection en suppression sont bloquées (/users et fiche utilisateur).",
      "Vous ne pouvez statuer sur une activité que si vous êtes habilité au niveau hiérarchique attendu ; si l'activité attend un autre niveau, le message « Vous n'êtes pas habilité à statuer à ce niveau » s'affiche, même pour vous.",
      "Vous ne pouvez pas demander une absence pour vous-même si aucun supérieur hiérarchique n'est défini sur votre compte (le circuit de demande exige un supérieur destinataire).",
      "Le Bilan (/bilan) et l'Évaluation (/evaluation) restent personnels : ils mesurent VOTRE productivité (RDV honorés, activités validées) et ne donnent pas un score consolidé d'autres agents.",
      "Vous ne créez pas de question de quiz sans passer par la chaîne parcours › unité › leçon : sans leçon existante, /academy/admin/questions/new vous invite d'abord à créer parcours/unité/leçon.",
      "L'édition de la « Hiérarchie de validation » (/admin) n'est pas une prérogative exclusive : elle est aussi ouverte à admin:manage et organization:manage ; seul le réglage de la déconnexion automatique par inactivité vous est réservé.",
      "Les actions restent encadrées par les garde-fous fonctionnels (anti-cycle au déplacement de structures, transition atomique anti-double-décision sur les absences, jeton de réinitialisation à usage unique valable 1 h) : ces règles s'appliquent à tous, y compris au super administrateur."
    ]
  },
  {
    "roleKey": "institution_admin",
    "tagline": "Pilote la gouvernance d'une organisation : structures, comptes, formulaires, validation des activités et reporting institutionnel.",
    "intro": "L'Administrateur institutionnel est le gestionnaire de référence du périmètre Gouvernance d'une organisation cliente. Il administre l'organigramme et les structures, crée et gère les comptes utilisateurs et leurs rôles, conçoit les formulaires de saisie, valide les activités dans le circuit hiérarchique et produit les rapports institutionnels consolidés. Il consulte le référentiel réglementaire EduLex et l'espace EduLex Academy en lecture seule, sans pouvoir y modifier de contenu. Son action s'exerce dans le périmètre de son organisation (et du filtre Pays/subdivision actif), à l'exclusion des prérogatives réservées au super administrateur.",
    "access": [
      {
        "module": "Tableau de bord (/dashboard)",
        "what": "Consulter sa vue d'ensemble personnalisée : KPI d'activités (saisies, validées, en attente, taux de validation), rapports générés, textes EduLex disponibles et à vérifier, parcours Academy publiés ; lire les graphiques d'évolution et de répartition, le feed d'activités récentes et les textes EduLex récents ; lancer « Nouvelle activité » ; suivre le bloc « Mes demandes d'absence » et la carte de parrainage commercial."
      },
      {
        "module": "Rendez-vous (/rendez-vous)",
        "what": "Gérer son agenda personnel privé : ajouter, modifier, supprimer des rendez-vous, régler les rappels et marquer « fait » ; ces RDV honorés alimentent le Bilan et l'Évaluation."
      },
      {
        "module": "Bilan & synthèse (/bilan)",
        "what": "Consulter son bilan personnel de réalisation par période (Semaine / Quinzaine / Mois), lire le taux de réalisation et les listes faits / non faits, exporter en PDF."
      },
      {
        "module": "Évaluation (/evaluation)",
        "what": "Consulter son score de productivité personnel /100, la tendance vs semaine précédente, l'évolution sur 4 semaines, et générer des « Conseils IA »."
      },
      {
        "module": "Distinctions & rappels à l'ordre (/distinctions)",
        "what": "Consulter sa propre fiche de distinctions trimestrielles et celle de ses subordonnés directs ; changer d'année, lire les règles d'attribution et le détail du trimestre, écouter le message en style ivoirien quand le pays est la Côte d'Ivoire."
      },
      {
        "module": "Mon profil (/account)",
        "what": "Consulter son identité, ses rôles, e-mail, organisation et pays ; changer sa photo et son type de profil (Personnel / École / Entreprise / Association)."
      },
      {
        "module": "Organisation & structures (/organization)",
        "what": "Visualiser l'organigramme et, via organization:manage, le gérer : créer des organisations et des structures, les éditer, les réorganiser par glisser-déposer ou au clic, ajouter un logo d'organisation. La suppression de structures et d'organisations reste réservée au super administrateur."
      },
      {
        "module": "Nouvelle organisation (/organization/new)",
        "what": "Créer une organisation cliente (Ministère, Institution, Réseau, Association, Entreprise / Société) : pré-remplir via un ministère du gouvernement ivoirien actuel, fixer le nom, le type et le pays."
      },
      {
        "module": "Nouvelle / Modifier structure (/organization/structures/new • /[id])",
        "what": "Ajouter ou modifier une structure : nom, type (Direction, Sous-direction, Service, Antenne, Direction régionale, Coordination, Équipe), organisation, structure parente, ministère de rattachement, pays/subdivision, responsable. Le bouton « Supprimer » n'apparaît qu'au super administrateur."
      },
      {
        "module": "Utilisateurs (/users)",
        "what": "Consulter l'annuaire des comptes de son organisation (recherche, rôles, structure, statut) et le gérer : créer un compte, importer un CSV, télécharger le modèle, supprimer (suppression douce, unitaire ou groupée). Sans admin:manage, la liste reste limitée à sa propre organisation."
      },
      {
        "module": "Nouvel / Fiche utilisateur (/users/new • /[id])",
        "what": "Créer un compte (profil, rattachements, supérieur hiérarchique, rôles) ; éditer un agent ; activer/désactiver son compte ; réinitialiser son mot de passe ; déléguer des permissions directes (ex. activity:validate)."
      },
      {
        "module": "Importer des utilisateurs (/users/import)",
        "what": "Enregistrer plusieurs comptes en une fois via un fichier CSV (colonnes email, prénom, nom, mot de passe, rôles, etc.), avec validation ligne par ligne et liste des erreurs."
      },
      {
        "module": "Formulaires d'activités (/forms)",
        "what": "Consulter les formulaires de son organisation (statut Brouillon / Publié / Archivé, nombre de champs, version) et en créer de nouveaux ; ouvrir le concepteur de chaque formulaire. Sans admin:manage, la liste reste limitée à sa propre organisation."
      },
      {
        "module": "Nouveau / Concepteur de formulaire (/forms/new • /[id])",
        "what": "Créer un formulaire (titre + description), composer ses champs (types variés, requis, options, réordonnancement), enregistrer, publier, repasser en brouillon, archiver, supprimer ; gérer le versionnage."
      },
      {
        "module": "Activités (/activities)",
        "what": "En tant que validateur (activity:validate), voir les activités de son organisation ; filtrer par statut (Toutes, Brouillon, Soumis, En examen, Validé, Rejeté, À corriger, Consolidé, Archivé), rechercher, ouvrir le détail ; créer une activité via « Nouvelle activité »."
      },
      {
        "module": "Nouvelle / Détail / Modifier activité (/activities/new • /[id] • /[id]/edit)",
        "what": "Créer et soumettre ses propres activités ; consulter le détail (textes EduLex liés, pièces jointes, historique) ; et statuer au niveau hiérarchique requis : « Valider », « Demander correction », « Rejeter », puis « Consolider » une activité validée, avec commentaire obligatoire pour un rejet ou une demande de correction."
      },
      {
        "module": "Validation hiérarchique (/validation)",
        "what": "Traiter la file des activités à examiner sur le périmètre de l'organisation : voir le circuit de validation, les compteurs, le niveau attendu et le marqueur « · à vous », puis « Examiner » pour statuer."
      },
      {
        "module": "Autorisations d'absence (/absences)",
        "what": "Demander une absence pour soi si un supérieur est défini ; et, en tant que supérieur hiérarchique, approuver/refuser les demandes de ses subordonnés, comptabiliser une absence d'office, supprimer un enregistrement et régler la politique d'absences (quota annuel et seuil d'alerte)."
      },
      {
        "module": "Reporting institutionnel (/reports)",
        "what": "Consulter et gérer les rapports consolidés de son organisation : tableau (périodicité, auteur, statut), ouvrir un rapport et lancer « Générer un rapport ». Sans admin:manage, la liste reste limitée à sa propre organisation."
      },
      {
        "module": "Générer / Détail rapport (/reports/new • /[id])",
        "what": "Composer un rapport en choisissant périmètre et période (agrégation des activités Validé/Consolidé), consulter le rapport généré (indicateurs, activités, références EduLex), l'imprimer et le supprimer."
      },
      {
        "module": "EduLex — référentiel (/edulex)",
        "what": "Consulter le référentiel réglementaire en lecture seule : KPI, recherche plein texte, filtres par catégorie/statut/type/niveau (V0 à V4), et ouverture des fiches de textes. Pas d'accès aux boutons de dépôt, de validation, d'import ni aux raccourcis référentiels."
      },
      {
        "module": "Fiche d'un texte EduLex (/edulex/texts/[id])",
        "what": "Consulter le détail d'un texte (métadonnées, documents source, relations, historique des versions, journal de validation), télécharger le PDF/Markdown et ouvrir la source officielle. Aucune action de validation, de publication ni de modification."
      },
      {
        "module": "EduLex Academy (/academy)",
        "what": "Consulter l'espace de formation : profil de progression, 5 niveaux de compétence, catégories et parcours publiés du pays sélectionné, et ouvrir un parcours. Pas de génération de modules d'évaluation (réservée à academy:manage)."
      },
      {
        "module": "Academy — Parcours / Leçon (/academy/path/[id] • /academy/lesson/[id])",
        "what": "Suivre un parcours, lancer les quiz de leçon, répondre aux questions et lire le feedback pédagogique relié aux textes EduLex."
      },
      {
        "module": "Academy — Progression / Badges / Classement (/academy/progress • /badges • /leaderboard)",
        "what": "Consulter ses XP, niveau, série et parcours en cours, les textes à revoir, la galerie de badges et le classement citoyen où sa position est surlignée."
      },
      {
        "module": "Notifications (/notifications)",
        "what": "Consulter le centre de notifications in-app (validations, échéances, seuils d'absence, décisions), tout marquer comme lu et ouvrir le lien associé."
      },
      {
        "module": "Paramètres (/parametres)",
        "what": "Régler ses préférences personnelles : période de bilan par défaut et activation des rappels de rendez-vous."
      },
      {
        "module": "Mot de passe oublié / Réinitialisation (/mot-de-passe-oublie • /reinitialiser-mot-de-passe)",
        "what": "Demander et définir un nouveau mot de passe via le lien reçu par e-mail (jeton valable 1 heure, à usage unique)."
      }
    ],
    "workflows": [
      {
        "title": "Créer une structure et la rattacher à l'organigramme",
        "steps": [
          "Ouvrir le menu « Organisation & structures » (/organization).",
          "Cliquer « + Structure » pour ouvrir le formulaire de création.",
          "Renseigner « Nom de la structure * » et choisir le « Type * » (Direction, Sous-direction, Service, Antenne, Direction régionale, Coordination, Équipe).",
          "Sélectionner l'« Organisation * » et, si besoin, la « Structure parente » (ou « — Aucune (racine) — »).",
          "Préciser le « Ministère de rattachement », le « Pays », la « Subdivision / région » et le « Responsable ».",
          "Cliquer « Créer la structure ».",
          "De retour sur l'organigramme, ajuster son emplacement par glisser-déposer ou via l'icône de déplacement (poignée), puis cliquer la destination surlignée en vert."
        ]
      },
      {
        "title": "Créer un compte utilisateur et lui attribuer ses rôles",
        "steps": [
          "Ouvrir « Utilisateurs » (/users) puis cliquer « Nouvel utilisateur ».",
          "Saisir Prénom *, Nom *, E-mail *, Genre * et le « Mot de passe initial * » (au moins 8 caractères).",
          "Renseigner les rattachements : Organisation, Structure, Pays, Ministère.",
          "Définir le « Supérieur hiérarchique (pour le suivi des absences) » (pré-rempli depuis le responsable de la structure si laissé vide).",
          "Cocher au moins un rôle dans les périmètres Système / Gouvernance / EduLex / Academy.",
          "Cliquer « Créer l'utilisateur ».",
          "Si nécessaire, rouvrir la fiche pour activer/désactiver le compte, réinitialiser le mot de passe ou déléguer une permission directe via la carte « Délégation de droits »."
        ]
      },
      {
        "title": "Importer plusieurs utilisateurs via un fichier CSV",
        "steps": [
          "Depuis « Utilisateurs » (/users), cliquer « Télécharger le modèle » pour récupérer le gabarit CSV.",
          "Compléter les colonnes requises (email*, prenom*, nom*, motdepasse* d'au moins 8 caractères, roles* séparés par « | ») et les colonnes facultatives (telephone, pays, organisation, structure, ministere).",
          "Cliquer « Importer (CSV) » pour ouvrir /users/import.",
          "S'appuyer sur les panneaux « Colonnes du fichier » et « Clés de rôle valides » pour vérifier la conformité.",
          "Téléverser le fichier et lancer l'import.",
          "Lire le compte rendu (nombre d'importés / ignorés et erreurs par ligne) et corriger les lignes rejetées si besoin."
        ]
      },
      {
        "title": "Concevoir et publier un formulaire d'activité",
        "steps": [
          "Ouvrir « Formulaires d'activités » (/forms) puis cliquer « Nouveau formulaire ».",
          "Saisir le titre et la description, puis créer le formulaire pour ouvrir le concepteur.",
          "Cliquer « Ajouter un champ », renseigner le « Libellé », choisir le « Type » et cocher « Requis » si nécessaire ; pour les types à options, remplir « Options (séparées par des virgules) ».",
          "Réordonner les champs avec les flèches haut/bas et supprimer les champs superflus.",
          "Cliquer « Enregistrer » (attendre la mention « ✓ Enregistré »).",
          "Cliquer « Publier » (au moins un champ requis ; la version est incrémentée).",
          "Au besoin, « Repasser en brouillon », « Archiver » ou « Supprimer le formulaire »."
        ]
      },
      {
        "title": "Valider une activité dans le circuit hiérarchique",
        "steps": [
          "Ouvrir « Validation hiérarchique » (/validation) et repérer les activités portant le marqueur « · à vous » à votre niveau.",
          "Cliquer « Examiner » pour ouvrir la fiche de l'activité.",
          "Lire la description, les « Textes EduLex associés », les pièces jointes et l'« Historique de validation ».",
          "Dans la zone de décision, saisir un commentaire (obligatoire pour un rejet ou une demande de correction).",
          "Cliquer « Valider », « Demander correction » ou « Rejeter » selon le cas.",
          "Une validation au dernier niveau passe l'activité à « Validé » ; sinon elle passe « En examen » et l'auteur est notifié.",
          "Sur une activité validée, cliquer « Consolider » pour la rendre disponible au reporting."
        ]
      },
      {
        "title": "Générer un rapport institutionnel consolidé",
        "steps": [
          "Ouvrir « Reporting institutionnel » (/reports) puis cliquer « Générer un rapport ».",
          "Saisir le Titre (au moins 3 caractères) et choisir la Périodicité (Hebdomadaire, Mensuel, Trimestriel, Semestriel, Annuel ou Personnalisé).",
          "Définir le périmètre : Pays, Organisation, Structure et les dates « de » / « à ».",
          "Lancer la génération : le rapport agrège les activités au statut « Validé » ou « Consolidé » du périmètre.",
          "Consulter le rapport généré : page de garde, « Indicateurs », « Activités réalisées » et « Références réglementaires EduLex ».",
          "Cliquer « Imprimer » pour l'éditer ou le diffuser."
        ]
      },
      {
        "title": "Traiter une demande d'absence d'un subordonné",
        "steps": [
          "Ouvrir « Autorisations d'absence » (/absences) et sélectionner l'année concernée.",
          "Repérer la carte « Demandes à valider (N) ».",
          "Pour chaque demande, examiner le motif (Affaires personnelles, Congé réglementaire, Formation, Raison médicale, Force majeure institutionnelle), les dates et le nombre de jours.",
          "Cliquer « Approuver », ou « Refuser » en renseignant éventuellement le « Motif du refus (facultatif) » puis « Confirmer le refus » ; l'agent est notifié.",
          "Si besoin, utiliser « Comptabiliser directement (validée d'office) » pour enregistrer une absence approuvée d'office.",
          "Cliquer « Modifier » sur la carte « Politique d'absences » pour ajuster le quota annuel et le seuil d'alerte si vous encadrez des subordonnés."
        ]
      },
      {
        "title": "Créer et soumettre une activité au circuit de validation",
        "steps": [
          "Depuis le Tableau de bord ou « Activités » (/activities), cliquer « Nouvelle activité ».",
          "Renseigner l'« Intitulé de l'activité * » (au moins 3 caractères) et la « Description ».",
          "Choisir la « Structure » (limitée à votre organisation) et préciser le « Début de période » / la « Fin de période ».",
          "Cocher les « Textes EduLex associés » pertinents, puis cliquer « Créer le brouillon ».",
          "Joindre si besoin des pièces (« Joindre un document » : PDF, image, Word, Excel) depuis le détail de l'activité.",
          "Cliquer « Soumettre à validation » : la chaîne de validation démarre au niveau 0 et le supérieur compétent est sollicité."
        ]
      }
    ],
    "tips": [
      "Activez le filtre Pays / subdivision de la barre supérieure avant de gérer l'organigramme, les utilisateurs ou de générer un rapport : il restreint le périmètre affiché et évite les erreurs de portée.",
      "Renseignez systématiquement le « Supérieur hiérarchique » à la création d'un compte : il conditionne le suivi et la validation des absences de l'agent.",
      "Avant de publier un formulaire, vérifiez que tous les champs nécessaires sont présents et correctement marqués « Requis » : la publication incrémente la version et fige le modèle de saisie.",
      "Pour valider une activité, vérifiez le badge « Niveau X/Y » : vous ne pouvez statuer qu'au niveau hiérarchique qui vous est attribué ; sinon un message vous l'indiquera.",
      "Rédigez un commentaire clair lors d'une demande de correction ou d'un rejet : il est obligatoire et guide l'auteur pour corriger son activité.",
      "Ne consolidez une activité validée que lorsqu'elle est prête à entrer dans le reporting : seules les activités « Validé » ou « Consolidé » alimentent les rapports.",
      "Pour les imports CSV d'utilisateurs, partez toujours du modèle téléchargé et utilisez les « Clés de rôle valides » affichées pour éviter les rejets de lignes.",
      "Consultez régulièrement le centre de Notifications : il remonte les soumissions à valider, les seuils d'absence franchis et les décisions à traiter."
    ],
    "limits": [
      "Vous ne pouvez pas supprimer une structure ni une organisation : cette action est réservée au super administrateur (le bouton « Supprimer » et l'icône corbeille correspondante n'apparaissent qu'à lui).",
      "Vous ne pouvez pas, par défaut, voir au-delà de votre propre organisation (utilisateurs, formulaires, activités, rapports) : la vue globale exige la permission admin:manage que ce rôle ne possède pas.",
      "Vous n'avez pas accès à l'espace Archives (/archives), qui requiert admin:manage.",
      "Vous n'avez pas accès à l'espace Administration / audit (/admin) : la consultation des journaux, le réglage de la hiérarchie de validation ou de la déconnexion automatique relèvent d'admin:read/manage ou du super administrateur.",
      "Sur EduLex, vous êtes en lecture seule : vous ne pouvez ni déposer un texte, ni le valider (V0→V4), ni le publier, ni l'importer, ni gérer les référentiels Pays, Ministères et Secteurs (permissions edulex:create/validate/publish/manage non détenues).",
      "Sur EduLex Academy, vous ne pouvez pas administrer le contenu : aucune génération de modules d'évaluation, ni création/gestion de questions de quiz (réservées à academy:manage).",
      "Vous ne pouvez pas vous désactiver vous-même ni vous supprimer de l'annuaire des utilisateurs.",
      "Vous ne pouvez approuver, refuser ou comptabiliser des absences que pour vos subordonnés ; le réglage global de la politique d'absences et la gestion de tous les agents relèvent du supérieur hiérarchique concerné ou du super administrateur."
    ]
  },
  {
    "roleKey": "national_manager",
    "tagline": "Garant national de la qualité du reporting institutionnel : il valide les contributions des structures, consolide les activités et produit des rapports consolidés en s'appuyant sur le référentiel EduLex.",
    "intro": "Le Responsable national / central est un acteur de pilotage du périmètre Gouvernance. Il consulte et valide les activités remontées par les structures de son organisation, les consolide, puis transforme les contributions validées en rapports institutionnels qu'il génère et exporte. Il dispose d'un accès en lecture au référentiel réglementaire EduLex et à EduLex Academy pour appuyer son analyse, mais n'intervient ni sur la configuration de la plateforme, ni sur la gestion des comptes, des organisations, des formulaires ou des référentiels. Son action se concentre sur la chaîne de validation des activités et la production de rapports fiables.",
    "access": [
      {
        "module": "Tableau de bord (/dashboard)",
        "what": "Consulte sa vue d'ensemble personnalisée selon le périmètre pays/subdivision : KPI d'activités saisies, validées, en attente de validation, rapports générés, textes EduLex disponibles, textes à vérifier, parcours Academy publiés et taux de validation. Lit le graphique « Évolution des activités » et le donut « Répartition par statut », parcourt « Activités récentes » (« Tout voir » vers /activities), « EduLex — récents » (ouverture d'un texte) et le bloc « Mes demandes d'absence ». Peut consulter et exploiter la carte de parrainage commercial. Le bouton « Nouvelle activité » est accessible : la création d'activité est ouverte à tout utilisateur authentifié."
      },
      {
        "module": "Rendez-vous (/rendez-vous)",
        "what": "Gère son agenda personnel privé : ajoute, modifie, supprime ses rendez-vous (titre, date/heure, lieu, rappel, notes), les marque « fait » / « non fait » et consulte les sections « À venir » et « Passés & faits ». Ces RDV honorés alimentent son Bilan et son Évaluation."
      },
      {
        "module": "Bilan & synthèse (/bilan)",
        "what": "Consulte son bilan personnel de réalisation sur la période choisie (Semaine / Quinzaine / Mois) : taux de réalisation combinant RDV honorés et activités validées, cartes « Rendez-vous honorés » et « Activités validées », listes « Faits » et « Non faits ». Exporte le bilan en PDF (« Exporter en PDF »)."
      },
      {
        "module": "Évaluation (/evaluation)",
        "what": "Consulte son score de productivité personnel (0–100), sa tendance vs semaine précédente, l'évolution sur 4 semaines et le détail « RDV honorés (7 j) » / « Activités validées (7 j) ». Génère des « Conseils IA » personnalisés (« Obtenir mes conseils » / « Régénérer »)."
      },
      {
        "module": "Distinctions & rappels à l'ordre (/distinctions)",
        "what": "Consulte sa propre fiche de distinctions trimestrielles et celle de ses subordonnés directs : cumul de distinctions, emblèmes par trimestre, détail Reporting / Affaires personnelles / Raison médicale, et changement d'année. Écoute le message en style ivoirien (nouchi) quand le pays sélectionné est la Côte d'Ivoire."
      },
      {
        "module": "Mon profil (/account)",
        "what": "Consulte son identité, ses rôles (badges), son e-mail, son organisation et son pays. Change sa photo d'avatar et son type de profil (Personnel / École / Entreprise / Association), qui adapte la terminologie de l'interface et la période de bilan par défaut."
      },
      {
        "module": "Activités (/activities)",
        "what": "Suit les activités de son organisation : sa permission activity:validate lui donne la visibilité sur l'ensemble de l'organisation. Filtre par statut (Toutes, Brouillon, Soumis, En examen, Validé, Rejeté, À corriger, Consolidé, Archivé), recherche par intitulé, lit le tableau (Activité, Structure, Auteur, Mise à jour, Statut) et ouvre chaque activité. Peut créer une nouvelle activité, action ouverte à tout authentifié."
      },
      {
        "module": "Détail / Validation d'une activité (/activities/[id])",
        "what": "Ouvre le détail d'une activité (description, textes EduLex associés, pièces jointes téléchargeables, informations, historique de validation). Au niveau hiérarchique requis, statue via le panneau de décision : saisit un commentaire (obligatoire pour rejet / demande de correction) puis « Valider », « Demander correction » ou « Rejeter », et « Consolider » une activité validée. Un message l'informe lorsqu'il n'est pas habilité au niveau attendu (« Cette activité attend la validation du niveau … »)."
      },
      {
        "module": "Validation hiérarchique (/validation)",
        "what": "Accède à la file d'attente des activités à examiner (Soumis / En examen / À corriger) sur son organisation. Lit le bandeau « Circuit de validation », les compteurs « En attente de décision » et « Validées (organisation) », repère les activités marquées « · à vous » selon son niveau, et ouvre chaque activité via « Examiner » pour statuer."
      },
      {
        "module": "Reporting institutionnel (/reports)",
        "what": "Consulte les rapports consolidés de son organisation (tableau : Rapport, Périodicité, Généré par, Date, Statut), ouvre un rapport et lance la génération d'un nouveau rapport (« Générer un rapport »)."
      },
      {
        "module": "Générer un rapport / Détail du rapport (/reports/new • /reports/[id])",
        "what": "Compose un rapport via ReportForm (titre, périodicité, pays, organisation, structure, dates) à partir des activités au statut « Validé » ou « Consolidé ». Consulte le rapport généré (page de garde, indicateurs, activités réalisées, références EduLex), l'imprime/exporte via « Imprimer » et peut le supprimer (report:create autorise la suppression)."
      },
      {
        "module": "EduLex — référentiel réglementaire (/edulex)",
        "what": "Consulte le référentiel en lecture seule : 4 KPI (Textes au total, En vigueur, À vérifier (V0 / à vérifier), Certifiés V4), recherche plein texte (« Rechercher par mot-clé… » puis « Filtrer »), filtres par catégorie / statut / type / niveau (V0–V4) et ouverture des fiches de texte. Les boutons « Déposer un texte », « File de validation » et les raccourcis de gestion des référentiels (Pays / Ministères / Secteurs / Import) ne lui sont pas proposés."
      },
      {
        "module": "Fiche d'un texte EduLex (/edulex/texts/[id])",
        "what": "Consulte le détail complet d'un texte (métadonnées, traçabilité « Déposé par » / « Validé par », relations entre textes, historique des versions, journal de validation). Télécharge le texte (« Télécharger (PDF) » / « Markdown ») et ouvre « Consulter la source officielle ». Les panneaux de validation V0→V4, de publication et de téléversement de documents ne lui sont pas accessibles."
      },
      {
        "module": "EduLex Academy (/academy)",
        "what": "Consulte l'espace de formation citoyenne : profil de progression (XP, Série, Niveau), 5 niveaux de compétence (Découverte, Compréhension, Application, Maîtrise, Expert / Référent), catégories et parcours publiés pour le pays sélectionné, et lance un parcours via « Commencer ». La génération de modules d'évaluation officiels lui est masquée (réservée à academy:manage)."
      },
      {
        "module": "Academy — Parcours / Leçon / Quiz",
        "what": "Ouvre un parcours (unités, leçons, prérequis), lance une leçon, répond aux quiz (QCM ou choix unique), lit le feedback pédagogique relié au texte EduLex source, progresse de question en question et termine la leçon."
      },
      {
        "module": "Academy — Ma progression / Badges / Classement",
        "what": "Consulte son tableau de bord d'apprentissage (XP cumulés, niveau, série, parcours en cours, textes à revoir), la galerie de badges (obtenus / à débloquer) et le classement citoyen où sa propre ligne est surlignée (« vous »)."
      },
      {
        "module": "Notifications (/notifications)",
        "what": "Consulte ses 50 dernières notifications (validations, échéances, publications EduLex, décisions, seuils d'absence), marque tout comme lu et ouvre le lien associé à chaque notification."
      },
      {
        "module": "Paramètres (/parametres)",
        "what": "Règle ses préférences personnelles : période de bilan affichée par défaut et activation des rappels de rendez-vous, puis enregistre."
      },
      {
        "module": "Mot de passe oublié / Réinitialisation",
        "what": "Utilise l'auto-dépannage de mot de passe : demande d'un lien par e-mail valable 1 heure (usage unique), puis définition d'un nouveau mot de passe d'au moins 8 caractères."
      }
    ],
    "workflows": [
      {
        "title": "Valider une activité soumise par une structure",
        "steps": [
          "Ouvrez « Validation hiérarchique » (/validation) depuis le menu.",
          "Repérez les activités portant le marqueur « · à vous » : elles attendent une décision à votre niveau hiérarchique.",
          "Cliquez « Examiner » sur l'activité concernée pour ouvrir sa fiche (/activities/{id}).",
          "Lisez la description, les « Textes EduLex associés », les « Pièces jointes » et l'« Historique de validation ».",
          "Dans le panneau de décision, saisissez un commentaire si nécessaire (il est obligatoire pour une demande de correction ou un rejet).",
          "Cliquez « Valider ». Si vous êtes au dernier niveau du circuit, l'activité passe à « Validé » ; sinon elle passe à « En examen » et l'auteur est notifié."
        ]
      },
      {
        "title": "Demander une correction ou rejeter une contribution",
        "steps": [
          "Depuis « Validation hiérarchique », cliquez « Examiner » sur l'activité à traiter.",
          "Vérifiez l'intitulé, la période, les textes EduLex associés et les pièces jointes.",
          "Dans la zone de commentaire du panneau de décision, expliquez clairement ce qui doit être corrigé (commentaire obligatoire).",
          "Cliquez « Demander correction » pour renvoyer l'activité à son auteur, ou « Rejeter » pour la refuser.",
          "L'auteur est automatiquement notifié de votre décision et de votre commentaire."
        ]
      },
      {
        "title": "Consolider une activité validée",
        "steps": [
          "Ouvrez la fiche d'une activité au statut « Validé » (/activities/{id}).",
          "Vérifiez via la carte de détail que les pièces jointes et les références EduLex sont complètes.",
          "Dans le panneau de décision, cliquez « Consolider ».",
          "L'activité passe au statut « Consolidé » et devient éligible à l'intégration dans un rapport institutionnel."
        ]
      },
      {
        "title": "Générer un rapport institutionnel consolidé",
        "steps": [
          "Ouvrez « Reporting institutionnel » (/reports), puis cliquez « Générer un rapport » (/reports/new).",
          "Dans ReportForm, saisissez un titre (au moins 3 caractères) et choisissez la « Périodicité » (Hebdomadaire, Mensuel, Trimestriel, Semestriel, Annuel ou Personnalisé).",
          "Définissez le périmètre : « Pays », « Organisation », « Structure », ainsi que les dates « de » et « à ».",
          "Lancez la génération : le rapport agrège les activités au statut « Validé » ou « Consolidé » du périmètre, calcule les indicateurs et collecte les références réglementaires EduLex citées.",
          "Vous êtes redirigé vers le rapport généré : vérifiez la page de garde, les « Indicateurs », les « Activités réalisées » et les « Références réglementaires EduLex »."
        ]
      },
      {
        "title": "Exporter ou imprimer un rapport",
        "steps": [
          "Ouvrez « Reporting institutionnel » (/reports) et cliquez sur le rapport voulu pour ouvrir son détail (/reports/{id}).",
          "Contrôlez le contenu (page de garde, indicateurs, activités réalisées, références EduLex).",
          "Cliquez « Imprimer » pour produire la version exportable du rapport (impression ou enregistrement PDF via la boîte de dialogue du navigateur).",
          "Diffusez le document obtenu aux destinataires institutionnels concernés."
        ]
      },
      {
        "title": "Vérifier une référence réglementaire dans EduLex",
        "steps": [
          "Ouvrez « EduLex » (/edulex) depuis le menu.",
          "Saisissez un mot-clé dans « Rechercher par mot-clé… » puis cliquez « Filtrer », ou affinez via les listes Catégorie / Statut / Type / Niveau (V0–V4).",
          "Cliquez sur la carte du texte recherché pour ouvrir sa fiche (/edulex/texts/{id}).",
          "Consultez les métadonnées, le niveau de vérification (V0 à V4) et la traçabilité (« Déposé par », « Validé par »).",
          "Téléchargez le texte (« Télécharger (PDF) » ou « Markdown ») ou ouvrez « Consulter la source officielle » pour appuyer votre validation d'activité ou votre rapport."
        ]
      },
      {
        "title": "Suivre son bilan de réalisation personnel",
        "steps": [
          "Ouvrez « Bilan & synthèse » (/bilan).",
          "Choisissez la période via les onglets « Semaine » / « Quinzaine » / « Mois ».",
          "Lisez le « Taux de réalisation » ainsi que les cartes « Rendez-vous honorés » et « Activités validées ».",
          "Parcourez les listes « Faits » et « Non faits » pour identifier les éléments en retard.",
          "Cliquez « Exporter en PDF » pour conserver une trace de votre bilan sur la période."
        ]
      }
    ],
    "tips": [
      "Traitez en priorité la file « Validation hiérarchique » et repérez les activités marquées « · à vous » : ce sont les seules sur lesquelles vous pouvez statuer à votre niveau.",
      "Avant de valider une activité, ouvrez ses « Textes EduLex associés » et ses pièces jointes : un rapport consolidé n'est fiable que si les activités sources le sont.",
      "Pour un rejet ou une demande de correction, rédigez un commentaire précis et actionnable : il est notifié à l'auteur et conditionne la qualité de la nouvelle soumission.",
      "Consolidez les activités validées avant de générer un rapport : seules les activités « Validé » ou « Consolidé » sont agrégées dans le reporting.",
      "Renseignez le périmètre (Pays, Organisation, Structure, dates) avec soin dans ReportForm : il détermine exactement les activités prises en compte.",
      "Servez-vous du filtre Pays de la barre supérieure pour cadrer le tableau de bord, les activités et EduLex sur le périmètre national que vous pilotez.",
      "Surveillez le « Centre de notifications » pour ne manquer aucune soumission d'activité ni décision à prendre."
    ],
    "limits": [
      "Vous ne pouvez pas gérer les comptes utilisateurs : créer, importer, modifier, activer/désactiver ou déléguer des droits relève de user:manage (module /users).",
      "Vous ne pouvez pas gérer l'organigramme : créer, éditer, déplacer ou supprimer des organisations et structures relève d'organization:manage (la suppression étant réservée au super administrateur).",
      "Vous ne pouvez pas concevoir de formulaires de saisie : la création et la configuration des formulaires relèvent de form:manage (module /forms).",
      "Dans EduLex, votre accès est en lecture seule : vous ne pouvez ni déposer un texte, ni le faire progresser dans le circuit V0→V4, ni le publier, ni importer, ni gérer les référentiels Pays / Ministères / Secteurs (permissions edulex:create / validate / publish / import / manage).",
      "Dans Academy, vous ne pouvez pas administrer le contenu : générer des modules d'évaluation, créer ou publier des questions relève d'academy:manage.",
      "Vous n'avez pas accès à l'espace d'administration (/admin), aux Archives (/archives, réservées à admin:manage) ni à l'édition de la hiérarchie de validation, réservés aux profils administrateur / super administrateur.",
      "Vous statuez uniquement au niveau hiérarchique requis du circuit de validation : si une activité attend un autre niveau, vous ne pouvez pas la valider, même en la consultant.",
      "La validation et la gestion des autorisations d'absence (approuver, refuser, comptabiliser, régler la politique) sont réservées au super administrateur ou au supérieur hiérarchique disposant de subordonnés ; vous pouvez en revanche demander vos propres absences si un supérieur vous est défini."
    ]
  },
  {
    "roleKey": "regional_manager",
    "tagline": "Examiner, valider et faire avancer les activités de votre périmètre, en vous appuyant sur le référentiel EduLex et les rapports institutionnels.",
    "intro": "Le Responsable régional / intermédiaire est un maillon du circuit de validation hiérarchique : il examine les activités et contributions remontées au sein de son organisation et statue dessus (valider, demander une correction, rejeter ou consolider) au niveau hiérarchique qui lui est attribué. Disposant d'activity:update, il peut aussi corriger une activité en cours d'instruction. Il dispose d'une vue de lecture seule sur les rapports institutionnels et sur l'ensemble du référentiel réglementaire EduLex, qui lui sert d'appui pour apprécier la conformité des activités. Son périmètre relève de la Gouvernance administrative et reste circonscrit à son organisation : il ne crée pas d'activités, ne génère pas de rapports et n'administre ni les comptes, ni les structures, ni le référentiel. Comme tout utilisateur, il pilote en parallèle son agenda, son bilan et son évaluation personnels.",
    "access": [
      {
        "module": "Tableau de bord (/dashboard)",
        "what": "Vue d'ensemble de votre périmètre : vous consultez les KPI (Activités saisies, Activités validées, En attente de validation, Rapports générés, Textes EduLex disponibles, Textes à vérifier, Taux de validation), le graphique « Évolution des activités », le donut « Répartition par statut », le feed « Activités récentes » (lien « Tout voir » vers /activities) et le bloc « EduLex — récents » (ouverture d'un texte, flèche vers /edulex). Le bloc « Mes demandes d'absence » et la carte de parrainage commercial restent disponibles. Le bouton « Nouvelle activité » peut apparaître, mais la saisie d'activités ne relève pas de votre rôle : votre travail porte sur la validation."
      },
      {
        "module": "Activités (/activities)",
        "what": "Cœur de votre travail. Disposant d'activity:validate, vous voyez toutes les activités de votre organisation (et pas seulement les vôtres). Vous filtrez par statut via les puces (Toutes, Brouillon, Soumis, En examen, Validé, Rejeté, À corriger, Consolidé, Archivé), recherchez par intitulé, lisez le tableau (Activité et nombre de textes EduLex liés, Structure, Auteur, Mise à jour, Statut) et ouvrez chaque fiche pour statuer. Le filtre Pays de la barre supérieure s'applique."
      },
      {
        "module": "Détail / Modifier une activité (/activities/[id] • /activities/[id]/edit)",
        "what": "Vous consultez la fiche complète : badge de statut, description, « Textes EduLex associés », « Pièces jointes » (téléchargement des documents), « Informations » (auteur, structure, pays, période, date de soumission) et « Historique de validation ». Grâce à activity:validate, le panneau de décision (ValidationActions) vous est ouvert : vous saisissez un commentaire (obligatoire pour un rejet ou une demande de correction) puis cliquez « Valider », « Demander correction » ou « Rejeter », et « Consolider » sur une activité validée — uniquement lorsque l'activité attend votre niveau hiérarchique. Grâce à activity:update, vous pouvez aussi modifier le contenu d'une activité (formulaire ActivityForm, « Enregistrer les modifications »)."
      },
      {
        "module": "Validation hiérarchique (/validation)",
        "what": "Votre file de travail dédiée. Vous y voyez le bandeau « Circuit de validation », les compteurs « En attente de décision » et « Validées (organisation) », et la liste des activités en attente (auteur, structure, date de soumission) avec la pastille « Niveau X/Y · nom » et le marqueur « · à vous » quand vous êtes habilité au niveau courant. Le lien « Examiner » ouvre la fiche pour statuer. Le périmètre est celui de votre organisation ; le filtre Pays s'applique."
      },
      {
        "module": "Reporting institutionnel (/reports)",
        "what": "En lecture seule (report:read) : vous consultez la liste des rapports de votre organisation (Rapport et pays, Périodicité, Généré par, Date, Statut) et ouvrez un rapport pour le lire. Vous ne disposez pas de report:create/manage : le bouton « Générer un rapport » ne s'affiche pas pour vous."
      },
      {
        "module": "Détail du rapport (/reports/[id])",
        "what": "Vous consultez le rapport généré : page de garde, « Indicateurs » (activités consolidées et répartition par statut), « Activités réalisées » (tableau Activité / Auteur / Structure / Statut) et « Références réglementaires EduLex ». Vous pouvez l'imprimer (bouton « Imprimer »). Vous ne pouvez pas le supprimer (réservé à report:manage/create)."
      },
      {
        "module": "EduLex — référentiel réglementaire (/edulex)",
        "what": "En lecture (edulex:read) : vous consultez les 4 KPI (Textes au total, En vigueur, À vérifier, Certifiés V4), recherchez en plein texte, filtrez par catégorie / statut / type / niveau (V0–V4), réinitialisez les filtres et ouvrez la fiche d'un texte. Les boutons « Déposer un texte », « File de validation » et les raccourcis référentiels (Pays, Ministères, Secteurs, Import d'amorçage) ne s'affichent pas pour vous (ils requièrent edulex:create/validate/manage)."
      },
      {
        "module": "Fiche d'un texte EduLex (/edulex/texts/[id])",
        "what": "En lecture : vous consultez les métadonnées, téléchargez le texte (« Télécharger (PDF) » et « Markdown »), ouvrez « Consulter la source officielle », parcourez les « Documents source », les « Relations avec d'autres textes », l'« Historique des versions » et le « Journal de validation », et lisez la traçabilité (Déposé par, Validé par, langue, version). Le panneau de validation V0→V4 et le bouton « Publier (mettre en vigueur) » ne vous sont pas ouverts."
      },
      {
        "module": "Rendez-vous (/rendez-vous)",
        "what": "Votre agenda personnel et privé : vous ajoutez un rendez-vous (Titre, Date et heure, Lieu, Rappel, Notes), le marquez « fait » / « non fait », le modifiez ou le supprimez, et consultez les sections « À venir » et « Passés & faits ». Ces RDV honorés alimentent votre Bilan et votre Évaluation."
      },
      {
        "module": "Bilan & synthèse (/bilan)",
        "what": "Votre bilan personnel de réalisation : vous choisissez la période (Semaine / Quinzaine / Mois), lisez le « Taux de réalisation » combinant RDV honorés et activités validées, consultez les cartes et les listes « Faits » / « Non faits », et exportez le bilan en PDF (« Exporter en PDF »)."
      },
      {
        "module": "Évaluation (/evaluation)",
        "what": "Votre score de productivité personnel (0–100) : vous consultez le score et son libellé, la tendance vs semaine précédente, le graphique « Évolution sur 4 semaines » et le détail (RDV honorés et activités validées sur 7 j), et générez des « Conseils IA » à la demande (« Obtenir mes conseils » / « Régénérer »)."
      },
      {
        "module": "Distinctions & rappels à l'ordre (/distinctions)",
        "what": "Vous consultez votre propre fiche de distinctions trimestrielles — et, le cas échéant, celle de vos subordonnés directs : changement d'année, règles d'attribution (régularité du reporting, affaires personnelles, raison médicale), cumul de distinctions, détail du trimestre courant et écoute du message en style ivoirien quand le pays est la Côte d'Ivoire."
      },
      {
        "module": "Autorisations d'absence (/absences)",
        "what": "En tant qu'utilisateur authentifié, vous pouvez « Demander une absence » pour vous-même (Motif, Du/Au, Nombre de jours, Note au supérieur) à condition qu'un supérieur hiérarchique vous soit défini, et annuler votre propre demande tant qu'elle est « En attente ». Si des agents vous sont rattachés comme subordonnés, la carte « Demandes à valider » vous permet d'approuver / refuser leurs demandes, de comptabiliser une absence d'office et de régler la politique d'absences ; sinon, vous ne gérez que votre propre comptabilité."
      },
      {
        "module": "Mon profil (/account)",
        "what": "Vous consultez votre identité, vos rôles (badges) et vos informations (e-mail, organisation, pays), changez votre photo et choisissez votre « Type de profil » (🏠 Personnel / 🎓 École / 🏢 Entreprise / 🤝 Association), qui adapte la terminologie de l'interface et la période de bilan par défaut."
      },
      {
        "module": "Notifications (/notifications)",
        "what": "Centre de notifications in-app : vous recevez les alertes de soumission, de décision et d'échéance (50 dernières, non lues surlignées), marquez « Tout marquer comme lu » et cliquez une notification pour la marquer lue et ouvrir son lien."
      },
      {
        "module": "Paramètres (/parametres)",
        "what": "Vos préférences personnelles : « Période de bilan par défaut » (Profil par défaut / Semaine / Quinzaine / Mois) et activation des « Rappels des rendez-vous », puis « Enregistrer »."
      }
    ],
    "workflows": [
      {
        "title": "Valider une activité soumise à votre niveau",
        "steps": [
          "Ouvrez « Validation hiérarchique » (/validation).",
          "Repérez dans la liste une activité portant le marqueur « · à vous » sur la pastille « Niveau X/Y · nom » : c'est une activité en attente de votre décision.",
          "Cliquez « Examiner » pour ouvrir la fiche de l'activité.",
          "Lisez la description, les « Textes EduLex associés », les « Pièces jointes » et l'« Historique de validation » pour apprécier la conformité.",
          "Dans le panneau de décision, saisissez si besoin un commentaire dans la zone prévue.",
          "Cliquez « Valider ». Si vous êtes au dernier niveau, l'activité passe à « Validé » ; sinon elle passe « En examen » et remonte au niveau suivant. L'auteur est notifié."
        ]
      },
      {
        "title": "Demander une correction ou rejeter une activité",
        "steps": [
          "Depuis /validation ou /activities, ouvrez la fiche de l'activité concernée (« Examiner » ou clic sur la ligne).",
          "Vérifiez que la pastille indique bien votre niveau (« · à vous ») ; sinon le message « Cette activité attend la validation du niveau « … ». Vous n'êtes pas habilité à statuer à ce niveau. » s'affiche.",
          "Dans le panneau de décision, rédigez OBLIGATOIREMENT un commentaire expliquant le motif (il est exigé pour une demande de correction ou un rejet).",
          "Cliquez « Demander correction » pour renvoyer l'activité à son auteur afin qu'il l'amende, ou « Rejeter » pour la refuser.",
          "L'auteur reçoit une notification ; le motif que vous avez saisi est consigné dans l'« Historique de validation »."
        ]
      },
      {
        "title": "Consolider une activité validée",
        "steps": [
          "Ouvrez la fiche d'une activité dont le statut est « Validé » (via /activities filtré sur la puce « Validé »).",
          "Assurez-vous d'être au niveau hiérarchique requis pour statuer.",
          "Dans le panneau de décision, ajoutez éventuellement un commentaire.",
          "Cliquez « Consolider » : l'activité devient « Consolidé » et pourra être agrégée dans le reporting institutionnel.",
          "Vérifiez la trace de l'opération dans l'« Historique de validation »."
        ]
      },
      {
        "title": "Corriger une activité avant ou pendant l'instruction",
        "steps": [
          "Ouvrez la fiche de l'activité concernée depuis /activities ou /validation.",
          "Cliquez « Modifier » pour ouvrir le formulaire (ActivityForm).",
          "Ajustez l'« Intitulé de l'activité », la « Description », la « Structure », la période (« Début » / « Fin de période ») ou les « Textes EduLex associés » (cases à cocher).",
          "Cliquez « Enregistrer les modifications ».",
          "Reprenez l'instruction : la décision (Valider / Demander correction / Rejeter / Consolider) reste subordonnée à votre niveau hiérarchique."
        ]
      },
      {
        "title": "Suivre la charge de validation depuis le tableau de bord",
        "steps": [
          "Ouvrez « Tableau de bord » (/dashboard).",
          "Consultez le KPI « En attente de validation » (« Soumises, en examen ou à corriger ») pour mesurer le volume restant à traiter.",
          "Lisez le « Taux de validation (%) » et le donut « Répartition par statut » pour situer l'avancement de votre périmètre.",
          "Cliquez « Tout voir » dans « Activités récentes » pour basculer vers /activities, ou ouvrez directement /validation pour traiter la file.",
          "Filtrez les activités par puce de statut (Soumis, En examen, À corriger) afin de prioriser votre travail."
        ]
      },
      {
        "title": "Vérifier la conformité réglementaire d'une activité via EduLex",
        "steps": [
          "Sur la fiche d'une activité, repérez la section « Textes EduLex associés ».",
          "Cliquez sur un texte cité, ou ouvrez « EduLex » (/edulex) et recherchez le texte par mot-clé / code / numéro officiel.",
          "Sur la fiche du texte (/edulex/texts/[id]), vérifiez son statut (En vigueur, Abrogé, Suspendu…) et son niveau de vérification (V0–V4) : un avertissement signale un texte V0 (non vérifié) ou obsolète.",
          "Au besoin, téléchargez le PDF ou ouvrez « Consulter la source officielle » pour confirmer le contenu.",
          "Revenez à l'activité pour fonder votre décision de validation sur cette vérification."
        ]
      },
      {
        "title": "Consulter un rapport institutionnel de votre périmètre",
        "steps": [
          "Ouvrez « Reporting institutionnel » (/reports).",
          "Repérez le rapport voulu dans le tableau (Périodicité, Généré par, Date, Statut).",
          "Cliquez sur la ligne pour ouvrir le détail (/reports/[id]).",
          "Lisez la page de garde, les « Indicateurs », le tableau « Activités réalisées » et les « Références réglementaires EduLex ».",
          "Cliquez « Imprimer » si vous avez besoin d'une version papier ou PDF."
        ]
      },
      {
        "title": "Demander une autorisation d'absence pour vous-même",
        "steps": [
          "Ouvrez « Autorisations d'absence » (/absences) — vérifiez au préalable qu'un supérieur hiérarchique vous est attribué.",
          "Cliquez « Demander une absence » puis « Nouvelle demande ».",
          "Choisissez le Motif (Affaires personnelles, Congé réglementaire, Formation, Raison médicale, Force majeure institutionnelle), renseignez « Du » et « Au » (le « Nombre de jours » se calcule automatiquement) et ajoutez une « Note au supérieur ».",
          "Cliquez « Envoyer au supérieur » : la demande passe « En attente » et votre supérieur est notifié.",
          "Suivez la décision dans l'historique ; tant qu'elle est « En attente », vous pouvez l'annuler vous-même."
        ]
      }
    ],
    "tips": [
      "Travaillez en priorité depuis la file « Validation hiérarchique » (/validation) : le marqueur « · à vous » vous indique sans ambiguïté les activités où vous êtes effectivement habilité à statuer, ce qui évite de perdre du temps sur des dossiers attendant un autre niveau.",
      "Avant de valider, ouvrez systématiquement les « Textes EduLex associés » et vérifiez leur niveau de vérification : un texte resté en V0 (non vérifié) ou un statut « Abrogé / Suspendu / Remplacé » doit vous alerter sur la conformité de l'activité.",
      "Pour un rejet ou une demande de correction, soignez le commentaire : il est obligatoire, il est notifié à l'auteur et il reste consigné dans l'« Historique de validation ». Un motif clair accélère la mise en conformité.",
      "Le bandeau « Circuit de validation » en haut de /validation rappelle l'enchaînement des niveaux : consultez-le pour savoir à qui l'activité remonte après votre décision.",
      "Utilisez le filtre Pays de la barre supérieure et les puces de statut sur /activities pour cibler rapidement les dossiers « Soumis », « En examen » ou « À corriger ».",
      "Suivez votre productivité de validateur via /bilan et /evaluation : vos activités validées y sont reflétées, et les « Conseils IA » peuvent cibler votre point faible.",
      "Activez les « Rappels des rendez-vous » dans /parametres pour ne pas manquer vos réunions de coordination, qui comptent dans votre bilan."
    ],
    "limits": [
      "Vous ne pouvez pas créer d'activité : votre rôle n'a pas activity:create. Même si le bouton « Nouvelle activité » apparaît, la saisie relève des agents contributeurs.",
      "Vous ne pouvez pas supprimer une activité dont vous n'êtes pas l'auteur (activity:delete non accordé) ; vous pouvez la modifier (activity:update) et statuer dessus, mais pas l'effacer.",
      "Vous ne pouvez statuer que lorsque l'activité attend votre niveau hiérarchique : à un autre niveau, le message « Vous n'êtes pas habilité à statuer à ce niveau » s'affiche.",
      "Vous ne pouvez pas générer, exporter ni supprimer de rapport (report:read seulement) : la génération relève de report:create/manage. Vous lisez et imprimez uniquement.",
      "Vous n'avez aucun droit sur le référentiel EduLex au-delà de la lecture : pas de dépôt de texte, pas de validation V0→V4, pas de publication, ni de gestion des pays, ministères ou secteurs (edulex:create/validate/publish/manage non accordés).",
      "Vous ne pouvez pas gérer les comptes utilisateurs (création, import CSV, activation/désactivation, délégation de droits) ni consulter l'annuaire au-delà de votre organisation : aucune permission user:* ne vous est attribuée.",
      "Vous ne pouvez pas gérer l'organisation et les structures (organigramme, création, déplacement, suppression) : aucune permission organization:* ne vous est attribuée.",
      "Vous ne pouvez pas concevoir ni configurer de formulaires de saisie (form:* non accordé).",
      "Vous n'avez pas accès à EduLex Academy (academy:* non accordé) ni à l'administration / aux journaux d'audit (admin:read/manage non accordé), donc ni aux Archives (/archives) ni à l'espace /admin.",
      "Dans le module Absences, vous ne pouvez approuver, refuser, comptabiliser d'office ou régler la politique que si des agents vous sont rattachés comme subordonnés ; sinon vous gérez uniquement vos propres demandes."
    ]
  },
  {
    "roleKey": "local_manager",
    "tagline": "Animer et fiabiliser le reporting de votre service : saisir, suivre et valider les activités de votre périmètre, en vous appuyant sur le référentiel réglementaire EduLex.",
    "intro": "En tant que Responsable local / chef de service, vous pilotez le suivi des activités de votre service au sein de la plateforme de gouvernance. Vous créez et mettez à jour des activités, et surtout vous statuez sur celles soumises par vos agents en les validant, en demandant des corrections ou en les rejetant au niveau hiérarchique qui vous est attribué dans le circuit. Vous consultez librement le référentiel EduLex pour rattacher vos activités aux textes réglementaires pertinents. Vous ne configurez ni l'organigramme, ni les comptes utilisateurs, ni les formulaires, et ne générez pas les rapports institutionnels : votre mission est opérationnelle, centrée sur la production et le contrôle des activités.",
    "access": [
      {
        "module": "Tableau de bord (/dashboard)",
        "what": "Votre vue d'ensemble personnalisée (« Bonjour, <prénom> »). Vous consultez les KPI (Activités saisies, Activités validées, En attente de validation, Textes EduLex disponibles, Textes à vérifier, Taux de validation), le graphique « Évolution des activités », le donut « Répartition par statut », le feed « Activités récentes » (« Tout voir » vers /activities) et le bloc « EduLex — récents ». Vous lancez une « Nouvelle activité ». Vous suivez aussi « Mes demandes d'absence » et la carte de parrainage commercial. Certains KPI affichés (Rapports générés, Parcours Academy publiés) relèvent de modules que vos permissions n'ouvrent pas."
      },
      {
        "module": "Rendez-vous (/rendez-vous)",
        "what": "Votre agenda personnel privé : vous ajoutez, modifiez, supprimez vos rendez-vous, réglez un rappel (5 min / 1 h / 1 jour avant) et les marquez « fait » / « non fait ». Les RDV honorés alimentent votre Bilan et votre Évaluation."
      },
      {
        "module": "Bilan & synthèse (/bilan)",
        "what": "Votre bilan personnel de réalisation. Vous choisissez la période (Semaine / Quinzaine / Mois), lisez votre « Taux de réalisation » (RDV honorés + activités validées), parcourez les listes « Faits » / « Non faits » et exportez le tout en PDF."
      },
      {
        "module": "Évaluation (/evaluation)",
        "what": "Votre score de productivité personnel (0–100). Vous consultez la tendance vs semaine précédente, l'évolution sur 4 semaines, le détail RDV honorés / activités validées (7 j), et générez des « Conseils IA » personnalisés."
      },
      {
        "module": "Distinctions & rappels à l'ordre (/distinctions)",
        "what": "Votre fiche de distinctions trimestrielles et celle de vos subordonnés directs. Vous changez d'année, consultez les règles d'attribution, l'état des 4 trimestres et le détail (reporting, affaires personnelles, raison médicale). Lecture audio du message en style ivoirien quand le pays sélectionné est la Côte d'Ivoire."
      },
      {
        "module": "Mon profil (/account)",
        "what": "Votre page de compte : vous consultez identité, rôles, e-mail, organisation, pays ; vous changez votre photo et votre « Type de profil » (🏠 Personnel / 🎓 École / 🏢 Entreprise / 🤝 Association), qui adapte la terminologie de l'interface et votre période de bilan par défaut."
      },
      {
        "module": "Activités (/activities)",
        "what": "Cœur de votre rôle. Disposant d'activity:validate, vous voyez les activités de votre organisation (et non vos seules activités). Vous filtrez par statut (Toutes, Brouillon, Soumis, En examen, Validé, Rejeté, À corriger, Consolidé, Archivé), recherchez par intitulé, ouvrez une fiche et lancez une « Nouvelle activité »."
      },
      {
        "module": "Nouvelle activité / Détail / Modifier (/activities/new, /activities/[id], /activities/[id]/edit)",
        "what": "Vous créez un brouillon (Intitulé ≥ 3 caractères, Description, Structure limitée à votre organisation, Début/Fin de période, « Textes EduLex associés »), l'enregistrez, le soumettez à validation, et le modifiez (activity:update). Sur le détail, vous consultez les textes liés, joignez/téléchargez des pièces (PDF, image, Word, Excel), les informations et l'« Historique de validation ». Grâce à activity:validate, vous statuez via le panneau de décision : « Valider », « Demander correction », « Rejeter » (commentaire obligatoire pour correction/rejet) et « Consolider » une activité validée — uniquement au niveau hiérarchique qui vous est attribué."
      },
      {
        "module": "Validation hiérarchique (/validation)",
        "what": "Votre file de travail principale. Vous voyez le bandeau « Circuit de validation », les compteurs « En attente de décision » / « Validées (organisation) », et la liste des activités à examiner sur le périmètre de votre organisation, avec la pastille « Niveau X/Y · nom » et le marqueur « · à vous » quand vous êtes habilité au niveau courant. Le lien « Examiner » ouvre la fiche pour statuer."
      },
      {
        "module": "EduLex — référentiel réglementaire (/edulex)",
        "what": "En lecture seule (edulex:read). Vous consultez les 4 KPI, recherchez en plein texte (puis « Filtrer »), affinez par catégorie / statut / type / niveau (V0–V4) et ouvrez la fiche d'un texte. Les boutons « Déposer un texte », « File de validation » et les raccourcis référentiels (Pays, Ministères, Secteurs, Import) ne vous sont pas proposés."
      },
      {
        "module": "Fiche d'un texte EduLex (/edulex/texts/[id])",
        "what": "En lecture seule. Vous consultez les métadonnées, téléchargez le texte (PDF / Markdown), ouvrez la source officielle, et lisez les relations entre textes, l'historique des versions et le journal de validation. Vous ne disposez pas des panneaux de validation V0→V4, de publication ni du téléversement de documents source."
      },
      {
        "module": "Autorisations d'absence (/absences)",
        "what": "En tant qu'agent, vous demandez une absence pour vous-même (si un supérieur hiérarchique vous est défini) et suivez vos demandes ; vous pouvez annuler votre propre demande tant qu'elle est En attente. Si vous êtes le supérieur hiérarchique d'agents, vous pouvez en plus approuver/refuser leurs demandes, comptabiliser une absence d'office et régler la politique — ces actions dépendent de votre position hiérarchique (ou du statut de super administrateur), et non d'une permission de rôle."
      },
      {
        "module": "Notifications (/notifications)",
        "what": "Votre centre de notifications : validations, décisions, échéances, seuils d'absence. Vous marquez tout comme lu et ouvrez le lien associé à chaque notification."
      },
      {
        "module": "Paramètres (/parametres)",
        "what": "Vos préférences : période de bilan affichée par défaut et activation des rappels de rendez-vous."
      },
      {
        "module": "Mot de passe oublié / Nouveau mot de passe (/mot-de-passe-oublie, /reinitialiser-mot-de-passe)",
        "what": "Auto-dépannage : vous demandez un lien de réinitialisation par e-mail (valable 1 heure, usage unique) et définissez un nouveau mot de passe via le lien reçu."
      }
    ],
    "workflows": [
      {
        "title": "Créer et soumettre une activité de votre service",
        "steps": [
          "Depuis le Tableau de bord ou la page Activités, cliquez sur « Nouvelle activité » (vers /activities/new).",
          "Renseignez l'« Intitulé de l'activité * » (au moins 3 caractères) et la « Description ».",
          "Sélectionnez la « Structure » concernée (limitée à votre organisation) et précisez le « Début de période » et la « Fin de période ».",
          "Cochez les « Textes EduLex associés » pertinents pour rattacher l'activité au référentiel réglementaire.",
          "Cliquez sur « Créer le brouillon ».",
          "Sur la fiche de l'activité, ajoutez si besoin des pièces jointes via « Joindre un document » (PDF, image, Word, Excel).",
          "Lorsque l'activité est prête, cliquez sur « Soumettre à validation » : la chaîne de validation démarre au niveau 0 et le validateur compétent est notifié."
        ]
      },
      {
        "title": "Valider une activité soumise par un agent",
        "steps": [
          "Ouvrez le module « Validation hiérarchique » (/validation).",
          "Repérez les activités portant le marqueur « · à vous » : ce sont celles attendant une décision à votre niveau hiérarchique.",
          "Cliquez sur « Examiner » pour ouvrir la fiche de l'activité (vers /activities/{id}).",
          "Vérifiez l'intitulé, la description, les « Textes EduLex associés », les pièces jointes et l'« Historique de validation ».",
          "Dans le panneau de décision, cliquez sur « Valider ». Au dernier niveau du circuit, l'activité passe à « Validé » ; sinon elle passe à « En examen » et remonte au niveau suivant.",
          "L'auteur est automatiquement notifié de votre décision."
        ]
      },
      {
        "title": "Demander une correction ou rejeter une activité",
        "steps": [
          "Depuis « Validation hiérarchique » ou le détail d'une activité, ouvrez la fiche concernée.",
          "Dans le panneau de décision (ValidationActions), saisissez impérativement un commentaire : il est obligatoire pour une demande de correction ou un rejet.",
          "Cliquez sur « Demander correction » si l'activité doit être amendée par l'auteur, ou sur « Rejeter » si elle ne peut être retenue.",
          "Vérifiez que votre commentaire explicite clairement les attentes : l'auteur le retrouvera dans l'« Historique de validation ».",
          "Validez : l'auteur est notifié et l'activité prend le statut « À corriger » ou « Rejeté »."
        ]
      },
      {
        "title": "Consolider une activité validée",
        "steps": [
          "Ouvrez la fiche d'une activité dont le statut est « Validé » (vers /activities/{id}).",
          "Vérifiez que l'activité est bien finalisée et destinée à entrer dans les bilans consolidés.",
          "Dans le panneau de décision (activity:validate requise), cliquez sur « Consolider ».",
          "L'activité prend le statut « Consolidé » et devient mobilisable dans les rapports institutionnels, générés par les profils habilités au reporting."
        ]
      },
      {
        "title": "Rattacher une activité au bon texte réglementaire EduLex",
        "steps": [
          "Avant ou pendant la saisie d'une activité, ouvrez EduLex (/edulex) en consultation.",
          "Utilisez le champ « Rechercher par mot-clé… » puis « Filtrer », ou affinez par catégorie / statut / type / niveau (V0–V4).",
          "Ouvrez la fiche du texte pertinent pour vérifier son statut (« En vigueur » de préférence) et son niveau de vérification.",
          "Revenez à la fiche de votre activité (création ou modification) et cochez ce texte dans « Textes EduLex associés ».",
          "Enregistrez : la référence apparaîtra dans le détail de l'activité et pourra alimenter les « Références réglementaires EduLex » des rapports consolidés."
        ]
      },
      {
        "title": "Modifier une activité renvoyée pour correction",
        "steps": [
          "Depuis vos Notifications ou la page Activités, ouvrez une activité au statut « À corriger » ou « Rejeté » dont vous êtes l'auteur.",
          "Lisez le commentaire du validateur dans l'« Historique de validation » pour comprendre les attentes.",
          "Cliquez sur « Modifier » puis ajustez l'intitulé, la description, la structure, la période ou les « Textes EduLex associés ».",
          "Cliquez sur « Enregistrer les modifications ».",
          "Cliquez sur « Soumettre à validation » : la chaîne de validation redémarre au niveau 0."
        ]
      },
      {
        "title": "Demander une autorisation d'absence",
        "steps": [
          "Ouvrez le module « Autorisations d'absence » (/absences).",
          "Cliquez sur « Demander une absence » puis « Nouvelle demande » (possible uniquement si un supérieur hiérarchique vous est défini).",
          "Choisissez le « Motif » (Affaires personnelles, Congé réglementaire, Formation, Raison médicale, Force majeure institutionnelle).",
          "Renseignez les dates « Du » et « Au » ; le « Nombre de jours » se calcule automatiquement.",
          "Ajoutez une « Note au supérieur » si nécessaire, puis cliquez sur « Envoyer au supérieur » : une demande « En attente » est créée et votre supérieur est notifié."
        ]
      }
    ],
    "tips": [
      "Privilégiez la file « Validation hiérarchique » (/validation) pour traiter vos décisions : le marqueur « · à vous » vous signale immédiatement les activités relevant de votre niveau, sans parcourir tout l'inventaire.",
      "Pour une demande de correction ou un rejet, soyez précis dans le commentaire obligatoire : l'auteur s'appuie dessus pour amender son activité, ce qui évite des allers-retours.",
      "Avant de valider, ouvrez les pièces jointes et vérifiez la cohérence des « Textes EduLex associés » : un rattachement réglementaire juste renforce la qualité des rapports consolidés.",
      "Rattachez de préférence vos activités à des textes EduLex « En vigueur » et de niveau de vérification élevé ; un texte V0 reste « non vérifié ».",
      "Tenez votre agenda Rendez-vous à jour et marquez les RDV « faits » : avec les activités validées, ils nourrissent votre Bilan, votre Évaluation et vos Distinctions trimestrielles.",
      "Surveillez le KPI « En attente de validation » du Tableau de bord et vos Notifications pour ne laisser aucune activité de votre service stagner dans le circuit.",
      "Consultez le bandeau « Circuit de validation » dans /validation pour savoir à quel niveau vous intervenez et qui statue avant et après vous."
    ],
    "limits": [
      "Vous ne pouvez pas gérer l'organigramme : créer, éditer, déplacer ou supprimer des organisations et structures relève d'organization:manage (la suppression étant réservée au super administrateur). Votre rôle ne porte aucune permission organization.",
      "Vous ne gérez pas les comptes utilisateurs : créer, importer, modifier, activer/désactiver des comptes ou déléguer des permissions nécessite user:manage.",
      "Vous ne concevez pas de formulaires de saisie : créer, configurer, publier ou archiver un formulaire exige form:manage.",
      "Vous ne générez pas de rapports institutionnels : composer, exporter ou supprimer un rapport requiert report:create ou report:manage ; votre rôle ne porte aucune permission report. La consolidation d'activités prépare néanmoins la matière de ces rapports.",
      "Sur EduLex, vous êtes en lecture seule : vous ne pouvez pas déposer un texte (edulex:create), le faire progresser V0→V4 (edulex:validate), le publier (edulex:publish), l'importer (edulex:import) ni gérer les pays, ministères et secteurs (edulex:manage).",
      "Vous n'accédez pas à EduLex Academy via vos permissions de rôle (academy:read non attribuée) ni à son administration (academy:manage).",
      "Vous n'avez pas accès aux Archives consolidées (/archives) ni à l'espace d'Administration / audit (/admin), réservés à admin:manage / admin:read et au super administrateur.",
      "Vous ne statuez que sur les activités relevant de votre niveau hiérarchique : si une activité attend un autre niveau, le message « Cette activité attend la validation du niveau … Vous n'êtes pas habilité à statuer à ce niveau » s'affiche.",
      "L'approbation ou le refus des demandes d'absence de vos agents, la comptabilisation d'office et le réglage de la politique d'absences dépendent de votre position de supérieur hiérarchique (ou du statut de super administrateur), et non d'une permission de rôle."
    ]
  },
  {
    "roleKey": "director_general",
    "tagline": "Piloter la gouvernance administrative : valider les contributions des structures, consolider l'information dans des rapports institutionnels et s'appuyer sur le référentiel EduLex et l'Academy, en consultation.",
    "intro": "En tant que Directeur Général, vous occupez un poste de pilotage au sein du périmètre Gouvernance de la plateforme. Vous supervisez le travail des structures placées sous votre autorité : vous consultez l'organigramme, les comptes utilisateurs et les formulaires de saisie, vous validez les activités qui remontent dans votre circuit de validation et vous produisez des rapports institutionnels à partir des contributions consolidées. Vous disposez d'un accès en lecture au référentiel réglementaire EduLex et à EduLex Academy, pour appuyer vos décisions sur des textes de référence. Votre rôle est avant tout un rôle de supervision, de validation et de restitution : vous ne créez ni ne modifiez les référentiels structurants (organisations, comptes utilisateurs, formulaires, textes EduLex), réservés à d'autres profils.",
    "access": [
      {
        "module": "Accueil (/)",
        "what": "Consulter la vitrine publique de la plateforme (trois piliers, statistiques en temps réel, points de réassurance) et accéder à votre espace via « Se connecter » ou « Accéder à la plateforme »."
      },
      {
        "module": "Tableau de bord (/dashboard)",
        "what": "Disposer de la vue d'ensemble personnalisée de votre périmètre : KPI d'activités saisies, validées, en attente de validation, rapports générés, textes EduLex disponibles et à vérifier, parcours Academy publiés et taux de validation. Lire le graphique « Évolution des activités » et le donut « Répartition par statut », parcourir le feed « Activités récentes » (« Tout voir » vers /activities) et le bloc « EduLex — récents ». Vous y retrouvez aussi votre bloc « Mes demandes d'absence » (avec le badge « N à valider » si vous avez des subordonnés) et la carte « Programme de parrainage commercial »."
      },
      {
        "module": "Rendez-vous (/rendez-vous)",
        "what": "Tenir votre agenda personnel : ajouter un rendez-vous (titre, date et heure, lieu, rappel, notes), le marquer « fait », le modifier ou le supprimer, et consulter les sections « À venir » et « Passés & faits ». Ces rendez-vous honorés alimentent votre Bilan et votre Évaluation."
      },
      {
        "module": "Bilan & synthèse (/bilan)",
        "what": "Consulter votre bilan personnel de réalisation sur la période choisie (Semaine / Quinzaine / Mois) : taux de réalisation, cartes « Rendez-vous honorés » et « Activités validées », listes « Faits » et « Non faits ». Exporter le bilan en PDF."
      },
      {
        "module": "Évaluation (/evaluation)",
        "what": "Suivre votre score de productivité personnel (0–100), sa tendance vs semaine précédente et son évolution sur 4 semaines, et générer des « Conseils IA » personnalisés à la demande."
      },
      {
        "module": "Distinctions & rappels à l'ordre (/distinctions)",
        "what": "Consulter votre fiche de distinctions trimestrielles et celles de vos subordonnés directs : cumul de distinctions, écusson de belle performance ou émoticône par trimestre, détail des règles (régularité du reporting ≥ 50 %, affaires personnelles < 20 %, raison médicale < 40 % du congé annuel), avec lecture audio des messages en style ivoirien quand le pays sélectionné est la Côte d'Ivoire. Changer l'année consultée (année courante, N-1, N-2)."
      },
      {
        "module": "Mon profil (/account)",
        "what": "Consulter votre identité, vos rôles et vos informations clés (e-mail, organisation, pays), changer votre photo et choisir votre type de profil (Personnel / École / Entreprise / Association), qui adapte la terminologie de l'interface et la période de bilan par défaut."
      },
      {
        "module": "Organisation & structures (/organization)",
        "what": "Visualiser l'organigramme hiérarchique en lecture seule (organization:read) : ministères techniques, organisations clientes et leurs structures rattachées (type, responsable, région, nombre de membres), avec le bandeau « Organigramme filtré » lorsqu'un filtre Pays/subdivision est actif. Vous ne disposez pas d'organization:manage : vous ne créez, ne déplacez ni ne modifiez aucune structure ou organisation."
      },
      {
        "module": "Utilisateurs (/users)",
        "what": "Consulter l'annuaire des comptes de votre organisation en lecture (user:read) : rechercher un agent, voir avatar, nom, e-mail, rôles, structure et statut Actif/Inactif. Vous ne pouvez ni créer, ni importer, ni supprimer, ni modifier des comptes (réservé à user:manage)."
      },
      {
        "module": "Fiche utilisateur (/users/[id])",
        "what": "Ouvrir la fiche d'un agent en consultation (identité, rattachements, rôles, activité du compte : date de création, dernière connexion). Vous n'avez pas accès aux actions d'administration (activer/désactiver, réinitialiser le mot de passe, déléguer des droits), qui exigent user:manage."
      },
      {
        "module": "Formulaires d'activités (/forms)",
        "what": "Consulter en lecture (form:read) les formulaires de saisie de votre organisation : titre, description, nombre de champs, version et statut (Brouillon / Publié / Archivé), et ouvrir un formulaire pour en examiner la composition. Vous ne pouvez pas créer ni configurer de formulaire (réservé à form:manage)."
      },
      {
        "module": "Activités (/activities)",
        "what": "Suivre les activités/contributions de votre organisation (activity:validate vous donne la vue organisation) : filtrer par statut (Toutes, Brouillon, Soumis, En examen, Validé, Rejeté, À corriger, Consolidé, Archivé), rechercher par intitulé et ouvrir une activité. Vous pouvez aussi créer une nouvelle activité via « Nouvelle activité »."
      },
      {
        "module": "Détail / Nouvelle activité (/activities/[id], /activities/new)",
        "what": "Créer une activité au brouillon et la soumettre au circuit, consulter le détail complet (textes EduLex associés, pièces jointes, informations, historique de validation), et surtout STATUER en tant que valideur (activity:validate) : commenter puis « Valider », « Demander correction », « Rejeter », et « Consolider » une activité validée, lorsque vous êtes habilité au niveau hiérarchique requis."
      },
      {
        "module": "Validation hiérarchique (/validation)",
        "what": "Travailler depuis votre file d'attente de validation : voir le circuit de validation, les compteurs « En attente de décision » et « Validées (organisation) », la liste des activités à examiner avec le niveau attendu et le marqueur « · à vous », puis « Examiner » pour statuer. C'est votre poste de travail principal de validation."
      },
      {
        "module": "Autorisations d'absence (/absences)",
        "what": "Demander une absence pour vous-même si un supérieur hiérarchique vous est défini, et — si des subordonnés vous sont rattachés — valider/refuser leurs demandes, comptabiliser des absences d'office, régler la politique d'absences et supprimer des enregistrements. Consulter les ratios, seuils et historiques de vos agents suivis (seules les absences approuvées sont comptées dans le ratio sur le congé annuel)."
      },
      {
        "module": "Reporting institutionnel (/reports)",
        "what": "Consulter (report:read) et générer (report:create) des rapports consolidés à partir des activités validées/consolidées de votre organisation : tableau des rapports (titre, périodicité, généré par, date, statut) et bouton « Générer un rapport »."
      },
      {
        "module": "Générer / Détail du rapport (/reports/new, /reports/[id])",
        "what": "Composer un rapport (titre, périodicité, pays, organisation, structure, dates) qui agrège les activités « Validé » ou « Consolidé », consulter le rapport généré (page de garde, indicateurs, activités réalisées, références réglementaires EduLex) et l'exporter via « Imprimer »."
      },
      {
        "module": "EduLex — référentiel réglementaire (/edulex)",
        "what": "Consulter (edulex:read) le référentiel : KPI (total, en vigueur, à vérifier, certifiés V4), recherche plein texte, filtres par catégorie/statut/type/niveau (V0 à V4), et ouverture des fiches de textes. Vous n'avez pas les droits de dépôt, de validation ou de gestion (les boutons « Déposer un texte », « File de validation » et les référentiels Pays/Ministères/Secteurs ne vous sont pas ouverts)."
      },
      {
        "module": "Fiche d'un texte EduLex (/edulex/texts/[id])",
        "what": "Consulter en lecture le détail complet d'un texte (métadonnées, documents source, relations entre textes, historique des versions, journal de validation, traçabilité) et télécharger le PDF/Markdown ou ouvrir la source officielle. Vous ne pouvez ni valider (V0→V4), ni publier, ni modifier le texte."
      },
      {
        "module": "EduLex Academy (/academy)",
        "what": "Consulter (academy:read) l'espace de formation citoyenne : votre profil de progression (XP, Série, Niveau), les 5 niveaux de compétence (Découverte, Compréhension, Application, Maîtrise, Expert / Référent), les catégories et parcours publiés pour le pays sélectionné, et démarrer un parcours via « Commencer »."
      },
      {
        "module": "Academy — Parcours / Leçon / Quiz",
        "what": "Suivre un parcours (unités, leçons, prérequis), répondre aux quiz (choix unique ou multiple), lire le feedback pédagogique relié au texte EduLex source, et gagner des XP."
      },
      {
        "module": "Academy — Progression / Badges / Classement",
        "what": "Consulter votre tableau de bord d'apprentissage (XP cumulés, niveau, série, parcours en cours, textes à revoir), votre galerie de badges (obtenus / à débloquer) et le classement citoyen où votre ligne est surlignée."
      },
      {
        "module": "Notifications (/notifications)",
        "what": "Consulter votre centre de notifications in-app (échéances, validations, publications EduLex, défis Academy, seuils d'absence, décisions), marquer une notification lue ou « Tout marquer comme lu »."
      },
      {
        "module": "Paramètres (/parametres)",
        "what": "Régler vos préférences personnelles : période de bilan affichée par défaut et activation des rappels de rendez-vous."
      },
      {
        "module": "Mot de passe oublié / Réinitialisation",
        "what": "Demander un lien de réinitialisation par e-mail et définir un nouveau mot de passe via le lien reçu (valable 1 heure, usage unique)."
      }
    ],
    "workflows": [
      {
        "title": "Valider une activité remontée dans votre circuit",
        "steps": [
          "Ouvrez « Validation hiérarchique » (/validation) depuis le menu.",
          "Repérez dans la liste une activité portant la pastille « Niveau X/Y · nom » et le marqueur « · à vous » (c'est votre niveau).",
          "Cliquez « Examiner » pour ouvrir la fiche de l'activité (/activities/{id}).",
          "Lisez la description, les « Textes EduLex associés », les « Pièces jointes » et l'« Historique de validation ».",
          "Dans le panneau de décision (ValidationActions), saisissez un commentaire (obligatoire en cas de rejet ou de demande de correction).",
          "Cliquez « Valider » pour approuver à votre niveau : une validation au dernier niveau passe l'activité à « Validé », sinon elle passe « En examen » et l'auteur est notifié."
        ]
      },
      {
        "title": "Demander une correction ou rejeter une contribution",
        "steps": [
          "Depuis « Validation hiérarchique », ouvrez l'activité concernée via « Examiner ».",
          "Vérifiez que vous êtes bien habilité au niveau courant (sinon le message « Cette activité attend la validation du niveau « … ». Vous n'êtes pas habilité à statuer à ce niveau. » s'affiche).",
          "Dans la zone de commentaire, motivez précisément votre décision (le commentaire est obligatoire ici).",
          "Cliquez « Demander correction » pour renvoyer l'activité à l'auteur en vue d'ajustements, ou « Rejeter » pour la refuser.",
          "L'auteur est automatiquement notifié ; suivez ensuite la resoumission éventuelle dans votre file."
        ]
      },
      {
        "title": "Consolider une activité validée",
        "steps": [
          "Dans « Activités » (/activities), filtrez par la puce « Validé ».",
          "Ouvrez une activité validée relevant de votre périmètre.",
          "Dans le panneau de validation, cliquez « Consolider » pour la marquer comme consolidée.",
          "L'activité devient éligible à l'agrégation dans vos rapports institutionnels."
        ]
      },
      {
        "title": "Générer puis exporter un rapport institutionnel",
        "steps": [
          "Ouvrez « Reporting institutionnel » (/reports) puis cliquez « Générer un rapport » (/reports/new).",
          "Renseignez le Titre (≥ 3 caractères) et choisissez la Périodicité (Hebdomadaire à Personnalisé).",
          "Définissez le périmètre : Pays, Organisation, Structure, et les dates « de » / « à ».",
          "Validez la génération : le rapport agrège les activités « Validé » ou « Consolidé » et collecte les références EduLex citées, puis vous redirige vers le rapport.",
          "Sur la fiche du rapport, vérifiez la page de garde, les « Indicateurs », les « Activités réalisées » et les « Références réglementaires EduLex ».",
          "Cliquez « Imprimer » pour exporter le rapport."
        ]
      },
      {
        "title": "Suivre l'activité de votre périmètre depuis le tableau de bord",
        "steps": [
          "Ouvrez « Tableau de bord » (/dashboard).",
          "Au besoin, ajustez le filtre Pays/subdivision dans la barre supérieure pour cadrer votre périmètre.",
          "Lisez les KPI « Activités saisies », « Activités validées », « En attente de validation » et « Taux de validation ».",
          "Analysez le graphique « Évolution des activités » et le donut « Répartition par statut ».",
          "Parcourez « Activités récentes » et cliquez « Tout voir » pour basculer dans /activities, ou ouvrez directement une activité en attente."
        ]
      },
      {
        "title": "Traiter les demandes d'absence de vos subordonnés",
        "steps": [
          "Ouvrez « Autorisations d'absence » (/absences) ; sélectionnez l'année concernée.",
          "Dans la carte « Demandes à valider (N) », examinez chaque demande (motif, dates, nombre de jours, note au supérieur).",
          "Cliquez « Approuver » pour comptabiliser l'absence, ou « Refuser » puis saisissez éventuellement le « Motif du refus (facultatif) » et « Confirmer le refus ».",
          "Au besoin, utilisez « Comptabiliser directement (validée d'office) » pour enregistrer une absence (Agent, Motif, Du/Au, Nombre de jours) → « Enregistrer ».",
          "Surveillez les pastilles « Seuil atteint » / « Quota dépassé » et la barre de ratio des absences approuvées par agent."
        ]
      },
      {
        "title": "S'appuyer sur EduLex pour fiabiliser une décision",
        "steps": [
          "Ouvrez « EduLex » (/edulex).",
          "Recherchez le texte pertinent via « Rechercher par mot-clé… » puis « Filtrer », ou affinez par catégorie, statut, type et niveau (V0 à V4).",
          "Ouvrez la carte du texte pour consulter sa fiche détaillée (métadonnées, journal de validation, niveau de vérification).",
          "Vérifiez le niveau (privilégiez les textes « En vigueur » et certifiés V4) et téléchargez le PDF si besoin.",
          "Reliez votre lecture à l'activité ou au rapport concerné en vous référant aux « Textes EduLex associés »."
        ]
      }
    ],
    "tips": [
      "Travaillez de préférence depuis « Validation hiérarchique » : le marqueur « · à vous » identifie immédiatement les activités où vous êtes habilité à statuer, ce qui évite de perdre du temps sur des niveaux qui ne vous concernent pas.",
      "Rédigez toujours un commentaire clair lors d'une demande de correction ou d'un rejet : il est obligatoire, devient visible dans l'« Historique de validation » et guide l'auteur vers une resoumission correcte.",
      "Avant de générer un rapport, vérifiez d'abord dans /activities que les activités utiles sont bien au statut « Validé » ou « Consolidé » : seules celles-ci sont agrégées.",
      "Consolidez les activités validées que vous souhaitez voir remonter dans vos rapports institutionnels ; sans consolidation, elles restent au stade « Validé ».",
      "Calez le filtre Pays/subdivision de la barre supérieure sur votre périmètre avant de lire le tableau de bord, les activités ou EduLex : tous ces écrans s'y adaptent.",
      "Consultez régulièrement vos « Distinctions » et celles de vos subordonnés directs : c'est un indicateur synthétique de la régularité du reporting et du respect des seuils d'absence.",
      "Surveillez le centre de « Notifications » : validations, décisions, seuils d'absence et publications EduLex y remontent et vous évitent de manquer une demande en attente.",
      "Privilégiez les textes EduLex « En vigueur » et certifiés V4 lorsque vous justifiez une décision ; un texte V0 (non vérifié) doit être utilisé avec prudence."
    ],
    "limits": [
      "Vous ne pouvez pas créer, modifier, déplacer ni supprimer des structures ou des organisations dans l'organigramme (réservé à organization:manage et, pour la suppression, au super administrateur).",
      "Vous ne pouvez pas créer, importer, modifier, activer/désactiver ni supprimer des comptes utilisateurs, ni réinitialiser un mot de passe ou déléguer des droits (réservé à user:manage).",
      "Vous ne pouvez pas créer ni configurer de formulaires de saisie, ni les publier ou les archiver : vous les consultez seulement (réservé à form:manage).",
      "Côté EduLex, vous êtes en lecture seule : pas de dépôt de texte, pas de validation V0→V4, pas de publication, ni de gestion des référentiels Pays, Ministères et Secteurs, ni d'import d'amorçage (réservés à edulex:create / validate / publish / manage).",
      "Côté Academy, vous êtes apprenant et consultant : vous ne pouvez pas créer de questions, publier/dépublier de parcours ni générer les modules d'évaluation officiels (réservé à academy:manage).",
      "Vous ne pouvez pas configurer la plateforme dans l'espace Administration (statistiques RBAC, hiérarchie de validation, déconnexion automatique) ni accéder aux Archives consolidées, qui exigent admin:read/manage ou organization:manage.",
      "Votre périmètre de validation et de reporting est limité à votre organisation : vous ne voyez pas l'inventaire global réservé au super administrateur (admin:manage).",
      "Vous ne pouvez statuer sur une activité que lorsque vous êtes au niveau hiérarchique attendu ; si ce n'est pas le cas, la plateforme vous l'indique et bloque la décision.",
      "Le réglage de la politique d'absences et la validation des demandes ne sont possibles que si des subordonnés vous sont rattachés ; sinon vous ne pouvez que demander une absence pour vous-même (et uniquement si un supérieur hiérarchique vous est défini)."
    ]
  },
  {
    "roleKey": "director",
    "tagline": "Superviser, modifier et valider les activités de votre périmètre, et produire les rapports institutionnels qui en découlent.",
    "intro": "En tant que Directeur, vous êtes un acteur clé de la gouvernance administrative. Vous supervisez les activités saisies sur le périmètre de votre organisation, vous statuez sur elles dans le circuit de validation hiérarchique et vous consolidez l'effort de reporting. Votre droit de validation (activity:validate) vous place comme échelon décisionnel sur les contributions de vos équipes, et votre droit de modification (activity:update) vous permet de corriger ou d'ajuster une activité. Vous générez et consultez les rapports consolidés, et vous vous appuyez en lecture sur le référentiel réglementaire EduLex ainsi que sur EduLex Academy. Votre périmètre de données suit le filtre Pays / subdivision sélectionné dans la barre supérieure.",
    "access": [
      {
        "module": "Tableau de bord (/dashboard)",
        "what": "Consultez votre vue d'ensemble personnalisée : les KPI Activités saisies, Activités validées, En attente de validation, Rapports générés, Textes EduLex disponibles, Textes à vérifier, Parcours Academy publiés et Taux de validation. Lisez le graphique « Évolution des activités » et le donut « Répartition par statut », parcourez « Activités récentes » (lien « Tout voir » vers /activities), « EduLex — récents » (ouverture d'un texte) et le bloc « Mes demandes d'absence ». Si des agents vous sont rattachés, ce bloc affiche le badge « N à valider » et le lien « Traiter → » (vers /absences). La carte de parrainage permet de copier votre code promo et votre lien d'invitation. Note : votre rôle ne dispose pas d'activity:create ; le raccourci « Nouvelle activité » ne vous est donc pas destiné."
      },
      {
        "module": "Activités (/activities)",
        "what": "Consultez le suivi des activités. Grâce à votre droit activity:validate, vous voyez les activités de votre organisation (et non vos seules contributions). Filtrez par statut via les puces (Toutes, Brouillon, Soumis, En examen, Validé, Rejeté, À corriger, Consolidé, Archivé), recherchez par intitulé et ouvrez une activité pour en voir le détail. Le filtre Pays de la barre supérieure s'applique."
      },
      {
        "module": "Détail / Modifier une activité (/activities/[id] • /activities/[id]/edit)",
        "what": "Consultez le détail d'une activité : statut, description, « Textes EduLex associés », « Pièces jointes » (téléchargement), « Informations » (auteur, structure, pays, période) et « Historique de validation ». Grâce à activity:update, vous pouvez modifier une activité via « Enregistrer les modifications ». Grâce à activity:validate, vous statuez via le panneau de décision : zone de commentaire (obligatoire pour un rejet ou une demande de correction) puis « Valider », « Demander correction » ou « Rejeter », et « Consolider » sur une activité validée — uniquement au niveau hiérarchique dont vous êtes responsable. Si vous n'êtes pas au bon niveau, le message « Vous n'êtes pas habilité à statuer à ce niveau » s'affiche."
      },
      {
        "module": "Validation hiérarchique (/validation)",
        "what": "Accédez à votre file d'attente des activités à examiner (Soumis / En examen / À corriger) sur le périmètre de votre organisation. Lisez le bandeau « Circuit de validation », les compteurs « En attente de décision » et « Validées (organisation) », repérez la pastille « Niveau X/Y · nom » et le marqueur « · à vous » qui indique que vous êtes habilité au niveau courant, puis cliquez « Examiner » pour statuer. Disposant d'activity:validate, vous pouvez décider et non seulement consulter."
      },
      {
        "module": "Reporting institutionnel (/reports)",
        "what": "Consultez les rapports consolidés de votre organisation (titre, périodicité, généré par, date, statut). Grâce à report:create, le bouton « Générer un rapport » vous est ouvert (vers /reports/new). Ouvrez un rapport pour en voir le détail."
      },
      {
        "module": "Générer un rapport / Détail du rapport (/reports/new • /reports/[id])",
        "what": "Composez un rapport via le formulaire (Titre ≥ 3 caractères, Périodicité, Pays, Organisation, Structure, dates « de » / « à ») — il agrège les activités au statut « Validé » ou « Consolidé » du périmètre choisi et collecte les références EduLex citées. Consultez le détail généré (page de garde, « Indicateurs », « Activités réalisées », « Références réglementaires EduLex ») et utilisez « Imprimer ». Vous pouvez également supprimer un rapport (report:create)."
      },
      {
        "module": "Formulaires d'activités (/forms)",
        "what": "En lecture seule (form:read) : parcourez les formulaires de saisie de votre organisation (titre, description, nombre de champs, version, statut Brouillon / Publié / Archivé) et ouvrez un formulaire pour consulter sa configuration. Vous ne pouvez ni créer ni modifier un formulaire (réservé à form:manage)."
      },
      {
        "module": "EduLex — référentiel réglementaire (/edulex)",
        "what": "En lecture seule (edulex:read) : consultez les 4 KPI (Textes au total, En vigueur, À vérifier, Certifiés V4), recherchez en plein texte, filtrez par catégorie, statut, type et niveau (V0–V4), et ouvrez la fiche d'un texte. Les boutons « Déposer un texte », « File de validation » et les raccourcis référentiels (Pays, Ministères, Secteurs, Import) ne vous sont pas accessibles."
      },
      {
        "module": "Fiche d'un texte EduLex (/edulex/texts/[id])",
        "what": "Consultez le détail d'un texte : métadonnées, documents source, relations entre textes, historique des versions et journal de validation. Téléchargez le texte (« Télécharger (PDF) » / « Markdown ») et ouvrez « Consulter la source officielle ». Vous ne disposez pas du panneau de validation V0→V4 ni de la publication (réservés à edulex:validate / edulex:publish)."
      },
      {
        "module": "EduLex Academy (/academy)",
        "what": "En lecture (academy:read) : consultez le hero (XP, Série, Niveau), les accès « Ma progression », « Badges & trophées », « Classement », les 5 niveaux de compétence (Découverte, Compréhension, Application, Maîtrise, Expert / Référent) et les catégories de parcours, et lancez un parcours via « Commencer ». La génération des modules d'évaluation officiels (academy:manage) ne vous est pas ouverte."
      },
      {
        "module": "Academy — Parcours, Leçon/Quiz, Progression, Badges, Classement",
        "what": "Suivez un parcours (/academy/path/[id]), répondez aux quiz des leçons avec feedback relié à EduLex (/academy/lesson/[id]), consultez votre progression personnelle — XP, niveau, série, parcours, « Textes à revoir » — sur /academy/progress, votre galerie de badges (/academy/badges) et le classement citoyen (/academy/leaderboard)."
      },
      {
        "module": "Rendez-vous (/rendez-vous)",
        "what": "Gérez votre agenda personnel : ajoutez un rendez-vous (Titre, Date et heure, Lieu, Rappel, Notes), cochez « fait » / « non fait », modifiez ou supprimez un RDV, et consultez « À venir » et « Passés & faits ». Vos RDV honorés alimentent votre Bilan et votre Évaluation."
      },
      {
        "module": "Bilan & synthèse (/bilan)",
        "what": "Consultez votre bilan personnel de réalisation : choisissez la période (Semaine / Quinzaine / Mois), lisez le « Taux de réalisation », les cartes « Rendez-vous honorés » et « Activités validées », et les listes « Faits » / « Non faits ». Exportez le bilan en PDF."
      },
      {
        "module": "Évaluation (/evaluation)",
        "what": "Consultez votre score de productivité personnel (0–100), sa tendance vs semaine précédente, l'évolution sur 4 semaines et le détail de la semaine. Générez 2-3 « Conseils IA » personnalisés via « Obtenir mes conseils » / « Régénérer »."
      },
      {
        "module": "Distinctions & rappels à l'ordre (/distinctions)",
        "what": "Consultez votre propre fiche de distinctions trimestrielles et, si des agents vous sont rattachés, celle de vos subordonnés directs : cumul, emblème de belle performance, état des 4 trimestres et détail (Reporting ≥ 50 %, Affaires personnelles < 20 %, Raison médicale < 40 %). Changez d'année et, lorsque le pays sélectionné est la Côte d'Ivoire, écoutez le message en style ivoirien."
      },
      {
        "module": "Autorisations d'absence (/absences)",
        "what": "Demandez une absence pour vous-même (Motif parmi Affaires personnelles / Congé réglementaire / Formation / Raison médicale / Force majeure institutionnelle, Du / Au, Nombre de jours, Note au supérieur → « Envoyer au supérieur ») si un supérieur hiérarchique est défini. Si des agents vous sont rattachés comme subordonnés, vous accédez à « Demandes à valider » (Approuver / Refuser avec motif), à « Comptabiliser directement (validée d'office) », au réglage de la politique d'absences (quota annuel et seuil d'alerte) et à la suppression d'enregistrements. Seules les absences approuvées sont comptées dans le ratio sur le congé annuel."
      },
      {
        "module": "Mon profil (/account)",
        "what": "Consultez votre identité, vos rôles et vos informations (e-mail, organisation, pays). Changez votre photo et votre « Type de profil » (Personnel / École / Entreprise / Association), qui adapte la terminologie de l'interface."
      },
      {
        "module": "Notifications (/notifications)",
        "what": "Consultez vos 50 dernières notifications (validations, échéances, publications EduLex, défis Academy, seuils d'absence, décisions), cliquez une notification pour la marquer lue et ouvrir son lien associé, et utilisez « Tout marquer comme lu »."
      },
      {
        "module": "Paramètres (/parametres)",
        "what": "Réglez votre « Période de bilan par défaut » (Profil par défaut / Semaine / Quinzaine / Mois) et activez ou désactivez les « Rappels des rendez-vous », puis « Enregistrer »."
      }
    ],
    "workflows": [
      {
        "title": "Valider une activité soumise par un agent",
        "steps": [
          "Ouvrez « Validation hiérarchique » (/validation) depuis le menu.",
          "Repérez dans la liste les activités portant la pastille « Niveau X/Y · nom » et le marqueur « · à vous » (vous êtes habilité au niveau courant).",
          "Cliquez « Examiner » sur l'activité concernée pour ouvrir sa fiche (/activities/{id}).",
          "Lisez la description, les « Textes EduLex associés », les « Pièces jointes » et l'« Historique de validation ».",
          "Dans le panneau de décision, saisissez si besoin un commentaire, puis cliquez « Valider ».",
          "Vérifiez le résultat : une validation au dernier niveau fait passer l'activité à « Validé » ; sinon elle passe à « En examen » et l'auteur est notifié."
        ]
      },
      {
        "title": "Demander une correction ou rejeter une activité",
        "steps": [
          "Depuis « Validation hiérarchique » (/validation) ou « Activités » (/activities), ouvrez la fiche de l'activité à examiner.",
          "Assurez-vous que le badge « Niveau X/Y » correspond bien à votre échelon (sinon le message d'inhabilitation s'affiche).",
          "Dans la zone de commentaire du panneau de décision, rédigez un motif clair — ce commentaire est OBLIGATOIRE pour une demande de correction ou un rejet.",
          "Cliquez « Demander correction » pour renvoyer l'activité à l'auteur, ou « Rejeter » pour la refuser.",
          "Confirmez : l'auteur est automatiquement notifié de votre décision et du commentaire associé."
        ]
      },
      {
        "title": "Modifier une activité avant de statuer",
        "steps": [
          "Ouvrez la fiche de l'activité depuis « Activités » (/activities).",
          "Cliquez « Modifier » pour accéder au formulaire d'édition (/activities/{id}/edit).",
          "Ajustez l'« Intitulé de l'activité », la « Description », la « Structure », le « Début de période » / « Fin de période » ou les « Textes EduLex associés » selon le besoin.",
          "Cliquez « Enregistrer les modifications ».",
          "Revenez à la fiche et statuez via le panneau de décision (Valider / Demander correction / Rejeter)."
        ]
      },
      {
        "title": "Consolider une activité validée",
        "steps": [
          "Ouvrez « Activités » (/activities) et filtrez par la puce « Validé ».",
          "Ouvrez la fiche d'une activité validée relevant de votre niveau.",
          "Dans le panneau de décision, cliquez « Consolider ».",
          "Vérifiez que le statut passe à « Consolidé » : l'activité devient éligible à l'agrégation dans un rapport."
        ]
      },
      {
        "title": "Générer un rapport institutionnel consolidé",
        "steps": [
          "Ouvrez « Reporting institutionnel » (/reports), puis cliquez « Générer un rapport » (/reports/new).",
          "Renseignez le « Titre » (≥ 3 caractères) et choisissez la « Périodicité » (Hebdomadaire à Personnalisé).",
          "Sélectionnez le périmètre : Pays, Organisation, Structure, puis les dates « de » et « à ».",
          "Lancez la génération : la plateforme agrège les activités « Validé » ou « Consolidé » du périmètre et collecte les références EduLex citées.",
          "Sur le détail du rapport, vérifiez la page de garde, les « Indicateurs », les « Activités réalisées » et les « Références réglementaires EduLex ».",
          "Cliquez « Imprimer » pour produire la version imprimable."
        ]
      },
      {
        "title": "Vérifier un texte EduLex cité dans une activité",
        "steps": [
          "Ouvrez la fiche de l'activité concernée et repérez la section « Textes EduLex associés ».",
          "Cliquez le texte pour ouvrir sa fiche (/edulex/texts/{id}), ou passez par « EduLex » (/edulex) et recherchez-le par mot-clé.",
          "Consultez les métadonnées, le niveau de vérification (V0–V4), le statut et le « Journal de validation ».",
          "Téléchargez le texte (« Télécharger (PDF) » ou « Markdown ») ou ouvrez « Consulter la source officielle » pour appuyer votre décision de validation."
        ]
      },
      {
        "title": "Traiter une demande d'absence d'un subordonné",
        "steps": [
          "Ouvrez « Autorisations d'absence » (/absences).",
          "Dans la carte « Demandes à valider (N) », repérez la demande de l'agent concerné (motif, période, nombre de jours).",
          "Cliquez « Approuver » pour valider, ou « Refuser » en renseignant éventuellement le « Motif du refus » puis « Confirmer le refus ».",
          "Vérifiez la mise à jour : seules les absences approuvées sont comptées dans le ratio sur le congé annuel, et l'agent est notifié de la décision."
        ]
      }
    ],
    "tips": [
      "Avant de statuer, vérifiez toujours le badge « Niveau X/Y · nom du niveau » : vous ne pouvez décider qu'au niveau hiérarchique dont vous êtes responsable. Le marqueur « · à vous » dans la file de validation vous l'indique d'un coup d'œil.",
      "Un commentaire est obligatoire pour « Demander correction » et « Rejeter » : rédigez-le de façon précise et actionnable pour que l'auteur sache exactement quoi corriger.",
      "Avant de générer un rapport, consolidez les activités validées pertinentes : le rapport n'agrège que les statuts « Validé » et « Consolidé ».",
      "Utilisez le filtre Pays / subdivision de la barre supérieure pour cadrer votre périmètre : Activités, Validation, Reporting et EduLex le respectent.",
      "Ouvrez systématiquement les « Textes EduLex associés » et les pièces jointes d'une activité avant de la valider, pour vérifier la conformité réglementaire.",
      "Gardez un œil sur le KPI « Taux de validation » et le bloc « En attente de validation » du tableau de bord pour ne pas laisser s'accumuler les activités en attente.",
      "Consultez régulièrement vos « Notifications » : les soumissions, décisions et seuils d'absence y remontent en temps réel."
    ],
    "limits": [
      "Vous ne pouvez pas créer d'activité : votre rôle n'a pas activity:create (le raccourci « Nouvelle activité » ne vous est pas destiné).",
      "Vous ne pouvez pas concevoir ni configurer de formulaires de saisie : la création, l'édition, la publication et l'archivage relèvent de form:manage — vous êtes en lecture seule (form:read).",
      "Vous ne pouvez pas alimenter ni valider le référentiel EduLex : déposer un texte, statuer dans la file de validation V0→V4, publier, importer ou gérer les référentiels (pays, ministères, secteurs) exigent edulex:create / validate / publish / manage, que vous n'avez pas.",
      "Vous ne pouvez pas administrer EduLex Academy : créer ou publier des questions, ou générer les modules d'évaluation officiels nécessite academy:manage.",
      "Vous ne pouvez pas gérer l'organisation ni les structures (créer, éditer, déplacer, supprimer) : cela relève d'organization:manage et, pour les suppressions, du super administrateur.",
      "Vous ne pouvez pas gérer les comptes utilisateurs : créer, importer, modifier, activer/désactiver, réinitialiser un mot de passe ou déléguer des droits relèvent de user:manage.",
      "Vous n'avez pas accès à l'espace d'Administration (/admin), aux Archives consolidées (/archives), ni à la configuration de la hiérarchie de validation : ils requièrent admin:read / admin:manage (ou organization:manage pour la hiérarchie).",
      "Pour le reporting, vous disposez de report:create et report:read (générer, consulter, imprimer, supprimer un rapport), mais pas de report:export ni report:manage : vous ne pouvez pas exporter les rapports au-delà de l'impression ni gérer l'ensemble du parc de rapports."
    ]
  },
  {
    "roleKey": "deputy_director",
    "tagline": "Piloter la saisie et la validation hiérarchique des activités de sa sous-direction, en s'appuyant sur le référentiel EduLex et le suivi de performance.",
    "intro": "En tant que Sous-Directeur, vous êtes un responsable intermédiaire du périmètre Gouvernance. Vous créez, suivez et modifiez les activités de votre organisation, et vous exercez un rôle de valideur dans le circuit de validation hiérarchique des contributions. Vous consultez les rapports institutionnels consolidés, le référentiel réglementaire EduLex et l'espace EduLex Academy à des fins de référence, sans pouvoir gérer ces référentiels. Vous disposez par ailleurs des outils personnels de productivité (agenda, bilan, évaluation, distinctions) communs à tous les agents.",
    "access": [
      {
        "module": "Tableau de bord (/dashboard)",
        "what": "Vue d'ensemble de votre périmètre : vous consultez les KPI (Activités saisies, Activités validées, En attente de validation, Rapports générés, Textes EduLex disponibles, Textes à vérifier, Parcours Academy publiés, Taux de validation), le graphique « Évolution des activités » et le donut « Répartition par statut », le feed des activités récentes (« Tout voir » vers /activities) et les textes EduLex récents. Vous lancez une nouvelle activité via « Nouvelle activité ». Vous y voyez aussi le bloc « Mes demandes d'absence » (avec le badge « N à valider » si des agents vous sont rattachés) et la carte de parrainage commercial."
      },
      {
        "module": "Activités (/activities)",
        "what": "Cœur de votre travail. Grâce à activity:validate, vous voyez l'ensemble des activités de votre organisation (pas seulement les vôtres). Vous filtrez par statut (Toutes, Brouillon, Soumis, En examen, Validé, Rejeté, À corriger, Consolidé, Archivé), recherchez par intitulé, ouvrez une activité et créez une nouvelle activité."
      },
      {
        "module": "Nouvelle activité / Détail / Modifier (/activities/new • /activities/[id] • /activities/[id]/edit)",
        "what": "Vous créez des activités (intitulé, description, structure, période, textes EduLex associés), soumettez vos brouillons au circuit de validation, joignez et téléchargez des pièces jointes, et consultez l'« Historique de validation ». Grâce à activity:update, vous pouvez modifier des activités de votre organisation. En tant que valideur (activity:validate), vous statuez sur les activités au niveau hiérarchique requis : « Valider », « Demander correction », « Rejeter » (commentaire obligatoire pour un refus ou une correction) et « Consolider » une activité déjà validée. La suppression n'est possible que sur vos propres activités (en tant qu'auteur), à l'état brouillon, à corriger ou rejeté."
      },
      {
        "module": "Validation hiérarchique (/validation)",
        "what": "Votre file de valideur : activités au statut Soumis / En examen / À corriger sur votre organisation. Vous voyez le rappel du circuit de validation, les compteurs (En attente de décision, Validées), la pastille « Niveau X/Y » et le marqueur « · à vous » quand vous êtes habilité au niveau courant, puis « Examiner » pour ouvrir la fiche et statuer."
      },
      {
        "module": "Reporting institutionnel (/reports)",
        "what": "En lecture seule (report:read). Vous consultez la liste des rapports consolidés de votre organisation (titre, périodicité, généré par, date, statut) et ouvrez un rapport pour le lire. Le bouton « Générer un rapport » ne vous est pas proposé."
      },
      {
        "module": "Détail du rapport (/reports/[id])",
        "what": "Vous consultez le détail d'un rapport généré : page de garde, « Indicateurs » (activités consolidées et répartition par statut), tableau des « Activités réalisées » et « Références réglementaires EduLex ». Vous pouvez l'imprimer. Vous ne pouvez ni générer ni supprimer de rapport."
      },
      {
        "module": "EduLex — référentiel réglementaire (/edulex)",
        "what": "En lecture seule (edulex:read). Vous consultez les 4 KPI (Textes au total, En vigueur, À vérifier, Certifiés V4), effectuez une recherche plein texte, filtrez par catégorie, statut, type et niveau (V0–V4), et ouvrez la fiche d'un texte. Les boutons « Déposer un texte », « File de validation » et les raccourcis référentiels (Pays, Ministères, Secteurs, Import) ne vous sont pas proposés."
      },
      {
        "module": "Fiche d'un texte EduLex (/edulex/texts/[id])",
        "what": "En lecture (edulex:read), vous consultez les métadonnées d'un texte, téléchargez le PDF ou le Markdown, ouvrez la source officielle si renseignée, et parcourez les « Relations avec d'autres textes », l'« Historique des versions » et le « Journal de validation ». Vous ne disposez pas du panneau de validation V0→V4 ni du bouton « Publier »."
      },
      {
        "module": "EduLex Academy (/academy)",
        "what": "En lecture (academy:read). Vous consultez votre profil de progression (XP, Série, Niveau), les 5 niveaux de compétence (Découverte, Compréhension, Application, Maîtrise, Expert / Référent), les catégories et parcours publiés pour le pays sélectionné, et lancez un parcours avec « Commencer »."
      },
      {
        "module": "Academy — Parcours / Leçon / Progression / Badges / Classement",
        "what": "Vous suivez les formations citoyennes : ouvrir un parcours et ses unités, jouer le quiz d'une leçon avec feedback relié au texte EduLex source, suivre votre progression (XP, niveau, série, parcours en cours, textes à revoir), consulter vos badges et vous situer dans le classement citoyen."
      },
      {
        "module": "Rendez-vous (/rendez-vous)",
        "what": "Votre agenda personnel et privé : vous ajoutez des rendez-vous (titre, date et heure, lieu, rappel, notes), les marquez « fait », les modifiez ou les supprimez. Les RDV honorés alimentent votre Bilan et votre Évaluation."
      },
      {
        "module": "Bilan & synthèse (/bilan)",
        "what": "Votre bilan personnel de réalisation : vous choisissez la période (Semaine / Quinzaine / Mois), lisez votre taux de réalisation combinant RDV honorés et activités validées, parcourez les listes « Faits » / « Non faits », et exportez le bilan en PDF."
      },
      {
        "module": "Évaluation (/evaluation)",
        "what": "Votre score de productivité personnel (0–100), sa tendance vs semaine précédente et son évolution sur 4 semaines. Vous générez des « Conseils IA » personnalisés et consultez le détail (RDV honorés et activités validées sur 7 jours)."
      },
      {
        "module": "Distinctions & rappels à l'ordre (/distinctions)",
        "what": "Vous consultez votre fiche de récompenses trimestrielles et, le cas échéant, celle de vos subordonnés directs : cumul de distinctions, écusson ou émoticône par trimestre, et détail des critères (régularité du reporting, affaires personnelles, raison médicale). En Côte d'Ivoire, vous pouvez écouter le message en style ivoirien."
      },
      {
        "module": "Autorisations d'absence (/absences)",
        "what": "Vous demandez vos propres absences (motif, dates, nombre de jours, note au supérieur) si un supérieur hiérarchique vous est défini, et suivez le statut de vos demandes. Si des agents vous sont rattachés comme supérieur hiérarchique, vous traitez aussi leurs demandes (Approuver / Refuser), comptabilisez des absences d'office et réglez la politique d'absences ; à défaut, vous n'avez accès qu'à la partie « demander pour soi »."
      },
      {
        "module": "Mon profil (/account)",
        "what": "Vous consultez votre identité, vos rôles et vos informations (e-mail, organisation, pays), changez votre photo et choisissez votre type de profil (Personnel, École, Entreprise, Association), qui adapte la terminologie et la période de bilan par défaut."
      },
      {
        "module": "Notifications (/notifications)",
        "what": "Centre de notifications in-app : validations, décisions, échéances, publications EduLex, défis Academy, seuils d'absence. Vous marquez tout comme lu et ouvrez le lien associé à chaque notification."
      },
      {
        "module": "Paramètres (/parametres)",
        "what": "Vos préférences personnelles : période de bilan par défaut et activation des rappels de rendez-vous, puis « Enregistrer »."
      }
    ],
    "workflows": [
      {
        "title": "Créer et soumettre une activité au circuit de validation",
        "steps": [
          "Depuis le Tableau de bord ou la page Activités, cliquez « Nouvelle activité » (vers /activities/new).",
          "Renseignez l'« Intitulé de l'activité * » (au moins 3 caractères) et la « Description ».",
          "Sélectionnez la « Structure » concernée (limitée à votre organisation) et fixez le « Début de période » et la « Fin de période ».",
          "Cochez les « Textes EduLex associés » pertinents pour relier l'activité au référentiel réglementaire.",
          "Cliquez « Créer le brouillon ».",
          "Sur la fiche de l'activité, téléversez si besoin une pièce jointe via « Joindre un document » (PDF, image, Word, Excel).",
          "Cliquez « Soumettre à validation » : la chaîne de validation démarre au niveau 0 et le valideur du premier niveau est notifié."
        ]
      },
      {
        "title": "Modifier une activité de votre organisation",
        "steps": [
          "Depuis /activities, ouvrez l'activité à modifier puis accédez à sa page d'édition (/activities/[id]/edit).",
          "Ajustez l'intitulé, la description, la structure, la période ou les « Textes EduLex associés ».",
          "Cliquez « Enregistrer les modifications ».",
          "Rappel : la suppression d'une activité n'est possible que sur vos propres activités (en tant qu'auteur) et tant qu'elle est à l'état brouillon, à corriger ou rejeté."
        ]
      },
      {
        "title": "Valider une activité de votre organisation",
        "steps": [
          "Ouvrez « Validation hiérarchique » (/validation) pour voir la file des activités en attente sur votre périmètre.",
          "Repérez une activité portant le marqueur « · à vous » sur la pastille « Niveau X/Y » : vous êtes alors habilité à statuer au niveau courant.",
          "Cliquez « Examiner » pour ouvrir la fiche de l'activité.",
          "Lisez la description, les « Textes EduLex associés », les « Pièces jointes » et l'« Historique de validation ».",
          "Dans la zone de décision (ValidationActions), saisissez un commentaire si nécessaire.",
          "Cliquez « Valider ». Si vous êtes au dernier niveau, l'activité passe à « Validé » ; sinon elle passe à « En examen » et l'auteur est notifié.",
          "Si l'activité indique « Vous n'êtes pas habilité à statuer à ce niveau », laissez le valideur du niveau attendu intervenir."
        ]
      },
      {
        "title": "Demander une correction ou rejeter une activité",
        "steps": [
          "Depuis /validation, cliquez « Examiner » sur l'activité concernée.",
          "Dans la zone de décision, saisissez un commentaire : il est obligatoire pour une demande de correction ou un rejet.",
          "Cliquez « Demander correction » pour renvoyer l'activité à l'auteur, ou « Rejeter » pour la refuser.",
          "L'auteur est automatiquement notifié de votre décision et de votre commentaire."
        ]
      },
      {
        "title": "Consolider une activité validée",
        "steps": [
          "Ouvrez une activité au statut « Validé » depuis /activities ou /validation.",
          "Dans la zone de décision (ValidationActions), cliquez « Consolider ».",
          "L'activité passe au statut « Consolidé » et devient éligible à l'agrégation dans les rapports institutionnels."
        ]
      },
      {
        "title": "Demander une autorisation d'absence",
        "steps": [
          "Ouvrez « Autorisations d'absence » (/absences) ; assurez-vous qu'un supérieur hiérarchique vous est défini.",
          "Cliquez « Demander une absence » puis « Nouvelle demande ».",
          "Choisissez le « Motif » (Affaires personnelles, Congé réglementaire, Formation, Raison médicale, Force majeure institutionnelle).",
          "Indiquez les dates « Du » et « Au » (le « Nombre de jours » se calcule automatiquement) et rédigez la « Note au supérieur ».",
          "Cliquez « Envoyer au supérieur » : la demande est créée au statut « En attente » et votre supérieur est notifié.",
          "Suivez ensuite le statut (En attente / Approuvée / Refusée) ; vous pouvez annuler votre propre demande tant qu'elle est « En attente »."
        ]
      },
      {
        "title": "Traiter les demandes d'absence de vos subordonnés",
        "steps": [
          "Ouvrez « Autorisations d'absence » (/absences) ; cette étape suppose que des agents vous sont rattachés comme supérieur hiérarchique.",
          "Dans la carte « Demandes à valider (N) », ouvrez chaque demande en attente.",
          "Cliquez « Approuver », ou « Refuser » en renseignant au besoin le « Motif du refus (facultatif) » puis « Confirmer le refus ».",
          "L'agent est notifié de la décision ; seules les absences approuvées sont comptées dans le ratio sur le congé annuel.",
          "Au besoin, utilisez « Comptabiliser directement (validée d'office) » pour enregistrer une absence approuvée, ou « Modifier » la « Politique d'absences » (quota annuel et seuil d'alerte)."
        ]
      },
      {
        "title": "Suivre sa performance et exporter son bilan",
        "steps": [
          "Tenez votre agenda à jour dans « Rendez-vous » et cochez chaque RDV honoré comme « fait ».",
          "Veillez à faire valider vos activités via le circuit de validation.",
          "Ouvrez « Bilan & synthèse » (/bilan) et choisissez la période (Semaine / Quinzaine / Mois).",
          "Lisez votre « Taux de réalisation » et parcourez les listes « Faits » et « Non faits ».",
          "Cliquez « Exporter en PDF » pour télécharger le bilan.",
          "Ouvrez « Évaluation » (/evaluation) pour consulter votre score sur 100 et cliquez « Obtenir mes conseils » pour des recommandations personnalisées."
        ]
      },
      {
        "title": "S'appuyer sur EduLex pour documenter une activité",
        "steps": [
          "Ouvrez « EduLex » (/edulex) et utilisez la recherche par mot-clé ou les filtres (catégorie, statut, type, niveau V0–V4).",
          "Ouvrez la fiche d'un texte pertinent pour vérifier son statut (En vigueur) et son niveau de vérification.",
          "Au besoin, téléchargez le PDF ou le Markdown, ou ouvrez la source officielle.",
          "Repérez le texte, puis lors de la création ou de l'édition de l'activité, cochez-le dans « Textes EduLex associés » pour assurer la traçabilité réglementaire."
        ]
      }
    ],
    "tips": [
      "Avant de statuer, vérifiez toujours la pastille « Niveau X/Y » et le marqueur « · à vous » : vous ne pouvez valider qu'au niveau hiérarchique où vous êtes habilité.",
      "Pour un rejet ou une demande de correction, rédigez un commentaire clair et actionnable : l'auteur le reçoit directement et s'en sert pour reprendre l'activité.",
      "Reliez systématiquement vos activités aux « Textes EduLex associés » : ces références remontent dans les rapports institutionnels et renforcent la valeur réglementaire de votre reporting.",
      "Soumettez vos activités au fil de l'eau plutôt qu'en fin de période : votre taux de validation et votre score d'Évaluation s'en trouvent améliorés.",
      "Joignez les pièces justificatives (PDF, image, Word, Excel) dès la création de l'activité pour faciliter le travail des valideurs.",
      "Consultez régulièrement vos « Notifications » : décisions de validation, échéances et seuils d'absence y remontent en temps réel.",
      "Marquez vos rendez-vous honorés comme « fait » : RDV honorés et activités validées alimentent votre Bilan, votre Évaluation et vos Distinctions trimestrielles."
    ],
    "limits": [
      "Vous ne pouvez pas déposer, modifier, valider, publier, importer ni archiver des textes EduLex, ni gérer les référentiels Pays, Ministères et Secteurs (réservé à edulex:create / validate / publish / import / archive / manage).",
      "Vous ne pouvez pas générer, exporter ni gérer de rapports : vous les consultez et les imprimez seulement (la génération relève de report:create / report:manage).",
      "Vous n'administrez pas EduLex Academy : vous ne créez pas de questions, parcours, unités ou leçons, et ne générez pas les modules d'évaluation officiels (réservé à academy:manage).",
      "Vous n'avez pas accès à la gestion des utilisateurs ni à l'annuaire : consultation, création, import, activation/désactivation et délégation de droits relèvent de user:read / user:manage.",
      "Vous ne gérez pas l'organigramme : consultation, création, déplacement et logo relèvent de organization:read / organization:manage, et la suppression de structures et d'organisations est réservée au super administrateur.",
      "Vous ne concevez pas de formulaires de saisie (consultation et configuration réservées à form:read / form:manage).",
      "Vous n'accédez ni à l'espace d'Administration (statistiques RBAC, hiérarchie de validation, sécurité des sessions) ni aux Archives consolidées, qui requièrent admin:read / admin:manage.",
      "La suppression d'une activité ne vous est ouverte que sur vos propres activités (en tant qu'auteur), faute de la permission activity:delete.",
      "Vous ne traitez les demandes d'absence, ne comptabilisez d'office ni ne réglez la politique d'absences que si des agents vous sont rattachés comme supérieur hiérarchique (ou si vous êtes super administrateur) ; sinon vous ne faites que demander vos propres absences."
    ]
  },
  {
    "roleKey": "agent",
    "tagline": "Saisir, documenter et faire valider ses activités au quotidien, en s'appuyant sur le référentiel EduLex et la formation citoyenne Academy.",
    "intro": "Vous êtes Agent (contributeur) au sein du périmètre Gouvernance de la plateforme EduWeb Governance. Votre mission première est de saisir vos activités et contributions, de les documenter (textes EduLex associés, pièces jointes) puis de les soumettre au circuit de validation hiérarchique. Vous consultez le référentiel réglementaire EduLex et les formulaires de saisie de votre organisation, et vous vous formez librement via EduLex Academy. Vous disposez également des outils personnels de productivité (rendez-vous, bilan, évaluation, demandes d'absence) rattachés à votre seul compte.",
    "access": [
      {
        "module": "Tableau de bord (/dashboard)",
        "what": "Votre page d'accueil après connexion (« Bonjour, <prénom> »). Vous y consultez vos indicateurs clés (Activités saisies, Activités validées, En attente de validation, Textes EduLex disponibles, Textes à vérifier, Parcours Academy publiés, Taux de validation), le graphique « Évolution des activités » et le donut « Répartition par statut ». Vous y lancez une « Nouvelle activité », ouvrez vos « Activités récentes » (« Tout voir »), consultez les textes « EduLex — récents », suivez le bloc « Mes demandes d'absence » et utilisez la carte « Programme de parrainage commercial » (copier votre code promo, copier ou partager votre lien d'invitation). Note : le KPI « Rapports générés » peut s'afficher, mais le module Reporting institutionnel ne vous est pas ouvert."
      },
      {
        "module": "Activités (/activities)",
        "what": "Le suivi de VOS propres activités : ne disposant pas d'activity:validate, votre périmètre se limite aux activités que vous avez créées. Vous filtrez par statut (Toutes, Brouillon, Soumis, En examen, Validé, Rejeté, À corriger, Consolidé, Archivé), recherchez par intitulé, ouvrez une activité et lancez « Nouvelle activité »."
      },
      {
        "module": "Nouvelle activité / Détail / Modifier (/activities/new • /activities/[id] • /activities/[id]/edit)",
        "what": "Vous créez un brouillon (Intitulé ≥ 3 caractères, Description, Structure, Début et Fin de période, « Textes EduLex associés »), l'enregistrez puis le modifiez (activity:update / en tant qu'auteur). Sur le détail, vous joignez et téléchargez des pièces (PDF, image, Word, Excel), consultez les textes EduLex liés, les informations et l'« Historique de validation ». En tant qu'auteur d'un brouillon (ou d'une activité « à corriger » / « rejetée »), vous pouvez « Soumettre à validation », « Modifier » et « Supprimer ». Vous NE pouvez PAS valider, demander une correction, rejeter ni consolider (réservé à activity:validate)."
      },
      {
        "module": "Formulaires d'activités (/forms et /forms/[id])",
        "what": "Consultation seule (form:read). Vous parcourez les formulaires de votre organisation (titre, description, nombre de champs, version, statut Brouillon / Publié / Archivé) et ouvrez un formulaire pour en voir la structure. Vous ne pouvez ni créer, ni configurer, ni publier, ni archiver un formulaire (réservé à form:manage)."
      },
      {
        "module": "EduLex — référentiel réglementaire (/edulex)",
        "what": "Consultation (edulex:read). Vous lisez les 4 KPI (Textes au total, En vigueur, À vérifier, Certifiés V4), effectuez une recherche plein texte (« Rechercher par mot-clé… » puis « Filtrer ») et filtrez par catégorie, statut, type et niveau de vérification (V0–V4). Vous ouvrez la fiche d'un texte. Les boutons « Déposer un texte », « File de validation » et les raccourcis référentiels (Pays, Ministères, Secteurs, Import d'amorçage) ne s'affichent pas pour vous (ils exigent edulex:create / validate / manage)."
      },
      {
        "module": "Fiche d'un texte EduLex (/edulex/texts/[id])",
        "what": "Consultation et téléchargement (edulex:read). Vous lisez les métadonnées, téléchargez le texte (PDF, Markdown), ouvrez la source officielle, consultez les documents source, les relations entre textes, l'historique des versions et le journal de validation. Vous ne disposez d'aucun panneau de validation ni du bouton « Publier » (réservés à edulex:validate / publish), et vous ne pouvez pas téléverser de document source (edulex:update / create / manage)."
      },
      {
        "module": "EduLex Academy (/academy)",
        "what": "Espace de formation citoyenne (academy:read). Vous consultez votre profil de progression (XP, Série, Niveau), les 5 niveaux de compétence (Découverte, Compréhension, Application, Maîtrise, Expert / Référent), les catégories et parcours publiés, et démarrez un parcours (« Commencer »). Les boutons de génération de modules d'évaluation officiels (academy:manage) ne vous sont pas proposés."
      },
      {
        "module": "Academy — Parcours (/academy/path/[id])",
        "what": "Vous consultez les unités numérotées et leurs leçons (avec d'éventuels prérequis verrouillés) et lancez le quiz d'une leçon (nombre de questions indiqué)."
      },
      {
        "module": "Academy — Leçon / Quiz (/academy/lesson/[id])",
        "what": "Vous répondez aux questions (choix unique ou multiple selon le type QCM), validez, lisez le feedback pédagogique (« Bonne réponse · +X XP » ou « Réponse incorrecte ») relié au texte EduLex source, naviguez entre les questions et terminez la leçon (récapitulatif : bonnes réponses, XP gagnés, % de parcours, possibilité de recommencer)."
      },
      {
        "module": "Academy — Ma progression (/academy/progress)",
        "what": "Vous suivez vos XP cumulés, votre niveau et l'avancement vers le suivant, votre série d'apprentissage, vos parcours en cours et les « Textes à revoir » (renvois vers EduLex)."
      },
      {
        "module": "Academy — Badges & trophées (/academy/badges)",
        "what": "Vous consultez la galerie des badges et votre état d'obtention (« Obtenu le <date> » ou « À débloquer » verrouillé)."
      },
      {
        "module": "Academy — Classement citoyen (/academy/leaderboard)",
        "what": "Vous consultez le classement des 50 apprenants les plus assidus (trié par XP puis niveau) et repérez votre propre position (ligne surlignée, « (vous) »)."
      },
      {
        "module": "Rendez-vous (/rendez-vous)",
        "what": "Votre agenda personnel et strictement privé. Vous ajoutez un rendez-vous (Titre, Date et heure, Lieu, Rappel, Notes), le marquez « fait » / « non fait », le modifiez ou le supprimez, et consultez « À venir » et « Passés & faits ». Les RDV honorés alimentent votre Bilan et votre Évaluation."
      },
      {
        "module": "Bilan & synthèse (/bilan)",
        "what": "Votre bilan personnel de réalisation. Vous choisissez la période (Semaine / Quinzaine / Mois), lisez votre « Taux de réalisation » combinant rendez-vous honorés et activités validées, parcourez les listes « Faits » / « Non faits » et exportez le tout en PDF."
      },
      {
        "module": "Évaluation (/evaluation)",
        "what": "Votre score de productivité personnel (0–100), sa tendance par rapport à la semaine précédente et l'évolution sur 4 semaines. Vous générez à la demande vos « Conseils IA » (« Obtenir mes conseils » / « Régénérer ») ciblés sur votre point faible."
      },
      {
        "module": "Distinctions & rappels à l'ordre (/distinctions)",
        "what": "Vous consultez votre propre fiche de récompenses trimestrielles (écusson « Belle performance » ou émoticône « Performance à redresser »), changez d'année (année courante, N-1, N-2) et lisez le détail des critères (régularité du reporting ≥ 50 %, affaires personnelles < 20 %, raison médicale < 40 %). En Côte d'Ivoire, vous pouvez écouter le message en style ivoirien (bouton de lecture audio)."
      },
      {
        "module": "Autorisations d'absence (/absences)",
        "what": "Vous demandez vos propres absences. Sur votre carte « moi », « Demander une absence » → « Nouvelle demande » : Motif, Du / Au, Nombre de jours (auto-calculé), Note au supérieur → « Envoyer au supérieur » (possible seulement si un supérieur hiérarchique vous est défini). Vous suivez le statut de vos demandes (En attente / Approuvée / Refusée + motif), votre cumul approuvé vs quota annuel, et pouvez annuler une demande tant qu'elle est « En attente ». Vous ne pouvez pas approuver/refuser, comptabiliser pour autrui ni régler la politique d'absences."
      },
      {
        "module": "Mon profil / Mon compte (/account)",
        "what": "Vous consultez votre identité, vos rôles, votre e-mail, votre organisation et votre pays. Vous changez votre photo et choisissez votre « Type de profil » (Personnel, École, Entreprise, Association), ce qui adapte la terminologie du module Activités et votre période de bilan par défaut."
      },
      {
        "module": "Notifications (/notifications)",
        "what": "Votre centre de notifications in-app (validations de vos activités, décisions d'absence, échéances de RDV, défis Academy…). Vous cliquez une notification pour la marquer lue et ouvrir son lien, ou « Tout marquer comme lu »."
      },
      {
        "module": "Paramètres (/parametres)",
        "what": "Vos préférences personnelles : « Période de bilan par défaut » (Profil par défaut / Semaine / Quinzaine / Mois) et activation des « Rappels des rendez-vous », puis « Enregistrer »."
      }
    ],
    "workflows": [
      {
        "title": "Créer et soumettre une nouvelle activité",
        "steps": [
          "Depuis le Tableau de bord ou la page Activités, cliquez « Nouvelle activité ».",
          "Renseignez l'« Intitulé de l'activité » (au moins 3 caractères) et la « Description ».",
          "Sélectionnez la « Structure » concernée, puis renseignez le « Début de période » et la « Fin de période ».",
          "Cochez les « Textes EduLex associés » pertinents pour rattacher votre activité au référentiel réglementaire.",
          "Cliquez « Créer le brouillon » : l'activité est enregistrée au statut Brouillon.",
          "Sur le détail, ajoutez vos pièces justificatives via « Joindre un document » (PDF, image, Word, Excel).",
          "Quand tout est complet, cliquez « Soumettre à validation » : l'activité entre dans le circuit de validation au niveau 0 et votre supérieur est notifié."
        ]
      },
      {
        "title": "Corriger une activité renvoyée « à corriger » ou « rejetée »",
        "steps": [
          "Ouvrez Notifications et cliquez la notification de décision pour ouvrir l'activité concernée (ou retrouvez-la dans Activités via la puce de statut « À corriger » / « Rejeté »).",
          "Lisez l'« Historique de validation » pour comprendre le commentaire du valideur (demande de correction ou motif de rejet).",
          "Cliquez « Modifier » et ajustez l'intitulé, la description, la période, les textes EduLex associés ou les pièces jointes selon les remarques.",
          "Cliquez « Enregistrer les modifications ».",
          "Cliquez « Soumettre à validation » pour relancer la chaîne de validation depuis le niveau 0."
        ]
      },
      {
        "title": "Documenter une activité avec le bon texte EduLex",
        "steps": [
          "Ouvrez EduLex (référentiel réglementaire).",
          "Utilisez le champ « Rechercher par mot-clé… » puis « Filtrer », ou affinez via les listes Catégories / Statuts / Types / Niveaux (V0–V4).",
          "Ouvrez la fiche du texte pour vérifier son intitulé, son statut (privilégiez « En vigueur ») et son niveau de vérification.",
          "Au besoin, téléchargez le texte (« Télécharger (PDF) » ou « Markdown ») ou ouvrez « Consulter la source officielle ».",
          "Revenez à votre activité, cliquez « Modifier » et cochez ce texte dans « Textes EduLex associés », puis « Enregistrer les modifications »."
        ]
      },
      {
        "title": "Demander une autorisation d'absence",
        "steps": [
          "Ouvrez Autorisations d'absence.",
          "Sur votre carte « moi », cliquez « Demander une absence » pour ouvrir « Nouvelle demande » (disponible seulement si un supérieur hiérarchique vous est défini).",
          "Choisissez le « Motif » (Affaires personnelles, Congé réglementaire, Formation, Raison médicale, Force majeure institutionnelle).",
          "Saisissez les dates « Du » et « Au » ; le « Nombre de jours » se calcule automatiquement.",
          "Ajoutez une « Note au supérieur » puis cliquez « Envoyer au supérieur » : la demande passe « En attente » et votre supérieur est notifié.",
          "Suivez la décision dans l'historique de votre carte et dans Notifications ; tant qu'elle est « En attente », vous pouvez l'annuler via l'icône corbeille."
        ]
      },
      {
        "title": "Suivre sa productivité et obtenir des conseils",
        "steps": [
          "Tenez votre agenda à jour dans Rendez-vous : ajoutez vos RDV et cochez-les « fait » une fois honorés.",
          "Ouvrez Bilan & synthèse, choisissez la période (Semaine / Quinzaine / Mois) et lisez votre « Taux de réalisation ».",
          "Cliquez « Exporter en PDF » pour conserver une trace de votre bilan.",
          "Ouvrez Évaluation pour consulter votre score /100 et sa tendance vs la semaine précédente.",
          "Dans la carte « Conseils IA », cliquez « Obtenir mes conseils » (ou « Régénérer ») pour recevoir 2-3 recommandations ciblées sur votre point faible."
        ]
      },
      {
        "title": "Se former via EduLex Academy",
        "steps": [
          "Ouvrez EduLex Academy et repérez vos compteurs XP, Série et Niveau.",
          "Filtrez les « Catégories de parcours » et cliquez « Commencer » sur un parcours adapté à votre niveau.",
          "Sélectionnez une leçon (le nombre de questions est indiqué) pour lancer le quiz.",
          "Répondez à chaque question, cliquez « Valider », lisez le feedback et suivez le renvoi « Voir le texte → » vers la fiche EduLex.",
          "Cliquez « Question suivante » jusqu'à « Terminer la leçon », puis consultez vos XP gagnés.",
          "Vérifiez votre avancement dans Ma progression et vos récompenses dans Badges & trophées."
        ]
      }
    ],
    "tips": [
      "Travaillez toujours au brouillon d'abord : enregistrez, complétez les pièces jointes et relisez avant de cliquer « Soumettre à validation », car la soumission démarre officiellement le circuit hiérarchique au niveau 0.",
      "Rattachez systématiquement vos activités aux bons textes EduLex « En vigueur » : ces références réglementaires sont collectées par la plateforme et crédibilisent votre contribution.",
      "Adaptez votre « Type de profil » dans Mon compte (Personnel, École, Entreprise, Association) : il ajuste la terminologie du module Activités et votre période de bilan par défaut.",
      "Marquez vos rendez-vous comme « fait » dès qu'ils sont honorés : Bilan et Évaluation se nourrissent des RDV honorés et des activités validées.",
      "Anticipez vos demandes d'absence : seules les absences APPROUVÉES sont comptabilisées, et le respect des seuils (affaires personnelles < 20 %, raison médicale < 40 % du congé annuel) influe sur vos distinctions trimestrielles.",
      "Visez un reporting trimestriel ≥ 50 % : la régularité conditionne votre écusson « Belle performance » dans Distinctions.",
      "Consultez Notifications régulièrement : c'est là qu'arrivent les validations, demandes de correction et décisions d'absence qui appellent une action de votre part.",
      "Activez les « Rappels des rendez-vous » dans Paramètres pour ne manquer aucune échéance."
    ],
    "limits": [
      "Vous ne pouvez pas valider, demander une correction, rejeter ni consolider une activité (réservé aux profils disposant d'activity:validate, dans la Validation hiérarchique).",
      "Vous ne voyez et ne gérez que VOS propres activités : vous n'accédez pas à l'inventaire de toute l'organisation (réservé à activity:validate / admin:manage).",
      "Vous ne pouvez pas créer, configurer, publier ni archiver un formulaire : vous consultez uniquement ceux de votre organisation (création réservée à form:manage).",
      "Vous n'avez pas accès au Reporting institutionnel : vous ne pouvez ni générer, ni consulter, ni exporter des rapports (réservé à report:read / create / manage).",
      "Côté EduLex, vous ne pouvez pas déposer de texte, le faire progresser dans le circuit V0→V4, le publier, l'importer ni gérer les référentiels Pays / Ministères / Secteurs (réservé à edulex:create / validate / publish / manage).",
      "Côté Academy, vous apprenez mais ne pouvez pas administrer le contenu : pas de création de questions ni de génération de modules d'évaluation (réservé à academy:manage).",
      "Vous ne gérez pas l'organisation ni les structures (organigramme, création, déplacement, suppression) : ces actions relèvent d'organization:manage et, pour les suppressions, du super administrateur.",
      "Vous ne gérez pas les comptes utilisateurs (création, import CSV, activation/désactivation, délégation de droits) : réservé à user:manage.",
      "Sur les absences, vous ne pouvez pas approuver/refuser une demande, comptabiliser une absence pour un autre agent, ni régler le quota annuel et le seuil d'alerte (réservé au supérieur hiérarchique ou au super administrateur).",
      "Vous n'accédez pas à l'espace d'Administration ni aux Archives consolidées de l'organisation (réservé à admin:read / admin:manage)."
    ]
  },
  {
    "roleKey": "auditor",
    "tagline": "Le regard indépendant qui consulte, vérifie et trace l'activité institutionnelle, le reporting et le référentiel EduLex, sans jamais les modifier.",
    "intro": "En tant que Contrôleur / auditeur, vous êtes le garant de la transparence et de la conformité au sein du périmètre Gouvernance de la plateforme EduWeb Governance. Votre mission est d'observer, de vérifier et de tracer : vous consultez les activités saisies et validées, les rapports institutionnels, le référentiel réglementaire EduLex et l'espace d'administration. Vous disposez d'un droit de lecture étendu (activity:read, report:read, edulex:read, admin:read) mais d'aucun pouvoir de création, de modification ou de validation, ce qui préserve votre indépendance vis-à-vis des données que vous contrôlez. Votre rôle est essentiel pour attester de la régularité des processus de reporting et de la fiabilité du référentiel.",
    "access": [
      {
        "module": "Tableau de bord (/dashboard)",
        "what": "Vous consultez la vue d'ensemble du périmètre sélectionné (pays / subdivision) : les KPI Activités saisies, Activités validées, En attente de validation, Rapports générés, Textes EduLex disponibles, Textes à vérifier et Taux de validation, ainsi que le graphique « Évolution des activités » et le donut « Répartition par statut ». Vous lisez le feed « Activités récentes » et le bloc « EduLex — récents » pour orienter vos contrôles. Vous ne créez pas d'activité : le bouton « Nouvelle activité » requiert activity:create, que vous n'avez pas. Les blocs « Mes demandes d'absence » et « Programme de parrainage commercial » sont des éléments personnels, sans portée d'audit."
      },
      {
        "module": "Activités (/activities)",
        "what": "Vous consultez le suivi des activités et contributions sur votre périmètre. Vous filtrez par statut via les puces (Toutes, Brouillon, Soumis, En examen, Validé, Rejeté, À corriger, Consolidé, Archivé), vous recherchez par intitulé et vous lisez le tableau (Activité, Structure, Auteur, Mise à jour, Statut). C'est votre point d'entrée principal pour repérer les anomalies de circuit. Le bouton « Nouvelle activité » ne vous est pas accessible."
      },
      {
        "module": "Détail d'une activité (/activities/[id])",
        "what": "Vous ouvrez le détail de chaque activité pour examiner sa description, les « Textes EduLex associés », les « Pièces jointes » (que vous pouvez télécharger), les « Informations » (auteur, structure, pays, période, date de soumission) et surtout l'« Historique de validation » (chronologie : Soumission, Validation, Rejet, Demande de correction, Consolidation, avec auteur, date et commentaire). C'est le cœur de votre travail de traçabilité. Vous ne pouvez ni modifier, ni soumettre, ni statuer sur l'activité."
      },
      {
        "module": "Validation hiérarchique (/validation)",
        "what": "Vous pouvez consulter la file d'attente des activités à examiner (statuts Soumis / En examen / À corriger), le bandeau « Circuit de validation », les compteurs et la pastille « Niveau X/Y · nom » de chaque activité. N'ayant pas activity:validate, un avertissement vous rappelle que vous pouvez consulter la file mais pas statuer : cette vue vous sert uniquement à contrôler que les activités progressent normalement dans le circuit."
      },
      {
        "module": "Reporting institutionnel (/reports)",
        "what": "Vous consultez la liste des rapports consolidés : le tableau Rapport (titre + pays), Périodicité, Généré par, Date et Statut (Brouillon / Généré / Archivé). Vous l'utilisez pour vérifier la régularité et la couverture du reporting. Le bouton « Générer un rapport » ne vous est pas accessible (réservé à report:create / report:manage)."
      },
      {
        "module": "Détail d'un rapport (/reports/[id])",
        "what": "Vous ouvrez et lisez le rapport généré : page de garde (titre, date et auteur de génération, périodicité, périmètre Pays/Organisation/Période), les « Indicateurs » (activités consolidées et répartition par statut), le tableau « Activités réalisées » et les « Références réglementaires EduLex ». Vous pouvez utiliser le bouton « Imprimer » pour conserver une copie de contrôle. Vous ne pouvez ni supprimer ni régénérer le rapport."
      },
      {
        "module": "EduLex — référentiel réglementaire (/edulex)",
        "what": "Vous consultez le référentiel : les 4 KPI (Textes au total, En vigueur, À vérifier, Certifiés V4), la recherche plein texte, les filtres par catégorie, statut, type et niveau de vérification (V0 à V4), et vous ouvrez la fiche de chaque texte. Vous identifiez ainsi les textes non vérifiés (V0) ou obsolètes. Vous ne voyez pas le bouton « Déposer un texte » (edulex:create) ni les raccourcis de gestion des référentiels (Pays / Ministères / Secteurs / Import), réservés à edulex:create / edulex:manage."
      },
      {
        "module": "Fiche d'un texte EduLex (/edulex/texts/[id])",
        "what": "Vous consultez le détail complet d'un texte : métadonnées, documents source PDF (téléchargeables via « Télécharger (PDF) » et « Markdown »), lien « Consulter la source officielle », « Relations avec d'autres textes », « Historique des versions », « Journal de validation » et traçabilité (« Déposé par », « Validé par », langue, version). Vous vérifiez le niveau de vérification et le statut. Le panneau « Validation à partir de sources officielles » (V0→V4), le téléversement de documents source et le bouton « Publier » ne vous sont pas accessibles (ils requièrent edulex:validate / edulex:update / edulex:publish)."
      },
      {
        "module": "Validation EduLex (/edulex/validation)",
        "what": "Vous pouvez consulter la file des textes à vérifier : les compteurs « Textes à traiter » et « Non vérifiés (V0) », ainsi que la liste des textes (titre, code, pays, statut, niveau de vérification). N'ayant pas edulex:validate, un bandeau d'avertissement vous rappelle que vous ne pouvez pas statuer : cette file vous sert à mesurer l'arriéré de vérification du référentiel."
      },
      {
        "module": "Administration (/admin)",
        "what": "Grâce à admin:read, vous consultez l'espace de configuration en lecture : les statistiques RBAC (Utilisateurs, Pays, Rôles, Permissions, Textes EduLex), la « Hiérarchie de validation » des activités (la chaîne des rôles valideurs configurée) et vos propres rôles. C'est votre référence pour comprendre et auditer le circuit de validation. Vous ne pouvez ni modifier la hiérarchie, ni régler la déconnexion automatique par inactivité (réservés à admin:manage / organization:manage / super administrateur)."
      },
      {
        "module": "Mon profil / Mon compte (/account)",
        "what": "Vous consultez votre identité, vos rôles (badges), votre type de profil et vos informations clés (e-mail, organisation, pays). Vous pouvez changer votre photo et votre type de profil. Module personnel commun à tout utilisateur connecté."
      },
      {
        "module": "Notifications (/notifications)",
        "what": "Vous consultez votre centre de notifications in-app (validations, publications EduLex, décisions, échéances). Vous marquez les notifications comme lues (« Tout marquer comme lu ») et ouvrez le lien associé à chacune. Module personnel commun à tout utilisateur connecté."
      },
      {
        "module": "Paramètres (/parametres)",
        "what": "Vous réglez vos préférences personnelles : la « Période de bilan par défaut » et l'activation des « Rappels des rendez-vous », puis vous enregistrez. Module personnel commun à tout utilisateur connecté."
      }
    ],
    "workflows": [
      {
        "title": "Contrôler la traçabilité du circuit de validation d'une activité",
        "steps": [
          "Ouvrez le menu « Activités » (/activities).",
          "Filtrez via les puces de statut, par exemple « Validé » ou « Consolidé » pour cibler les activités achevées, ou « Rejeté » / « À corriger » pour examiner les anomalies.",
          "Au besoin, recherchez une activité précise par son intitulé dans le champ « Rechercher… ».",
          "Cliquez sur la ligne d'une activité pour ouvrir son détail (/activities/{id}).",
          "Faites défiler jusqu'à la section « Historique de validation » et examinez la chronologie : Soumission, Validation, Rejet, Demande de correction, Consolidation, avec pour chacune l'auteur, la date et le commentaire.",
          "Vérifiez la cohérence avec le badge « Niveau X/Y · nom du niveau » et comparez avec le circuit officiel consulté dans Administration.",
          "Si nécessaire, téléchargez les pièces jointes depuis la section « Pièces jointes » pour archiver vos éléments de contrôle."
        ]
      },
      {
        "title": "Vérifier la conformité du circuit de validation configuré",
        "steps": [
          "Ouvrez le menu « Administration » (/admin).",
          "Consultez les statistiques RBAC (Utilisateurs, Pays, Rôles, Permissions, Textes EduLex) pour cadrer le périmètre.",
          "Lisez la section « Hiérarchie de validation » : notez l'ordre des rôles valideurs constituant la chaîne (niveau 1 → niveau 2 → …).",
          "Repassez sur une activité validée (via /activities) et confrontez son « Historique de validation » à la chaîne officielle pour confirmer que chaque niveau requis a bien statué.",
          "Consultez « Vos rôles » pour documenter votre propre habilitation dans votre rapport d'audit."
        ]
      },
      {
        "title": "Auditer la fiabilité d'un texte du référentiel EduLex",
        "steps": [
          "Ouvrez le menu « EduLex » (/edulex).",
          "Lisez les 4 KPI, en particulier « À vérifier (V0 / à vérifier) » et « Certifiés V4 », pour mesurer le niveau de fiabilité global.",
          "Utilisez le filtre « Tous les niveaux » pour isoler les textes en V0 (non vérifiés), ou le filtre « Tous les statuts » pour repérer les textes Abrogé / Remplacé / Suspendu.",
          "Cliquez sur une carte de texte pour ouvrir sa fiche (/edulex/texts/{id}).",
          "Examinez le « Journal de validation », l'« Historique des versions » et la traçabilité (« Déposé par », « Validé par », langue, version).",
          "Téléchargez le texte (« Télécharger (PDF) » ou « Markdown ») et, si l'« URL source officielle » est renseignée, ouvrez « Consulter la source officielle » pour confronter le contenu certifié à la source.",
          "Consignez tout texte resté en V0 ou tout écart entre le statut affiché et la source officielle."
        ]
      },
      {
        "title": "Mesurer l'arriéré de vérification du référentiel EduLex",
        "steps": [
          "Ouvrez le menu « EduLex » puis « Validation EduLex » (/edulex/validation).",
          "Relevez les deux compteurs : « Textes à traiter » et « Non vérifiés (V0) » pour quantifier l'arriéré.",
          "Parcourez la liste des textes en attente (titre, code, pays, statut, niveau de vérification) afin d'identifier les statuts En attente / À vérifier / Importé non vérifié / Brouillon.",
          "Cliquez « Examiner » sur un texte pour ouvrir sa fiche et consulter son journal de validation (vous ne pouvez pas statuer, le bandeau d'avertissement le rappelle).",
          "Consignez le volume et l'ancienneté des textes non vérifiés comme indicateur de risque dans votre rapport d'audit."
        ]
      },
      {
        "title": "Vérifier la régularité et la couverture du reporting institutionnel",
        "steps": [
          "Ouvrez le menu « Reporting institutionnel » (/reports).",
          "Parcourez le tableau et repérez la colonne « Périodicité » (Hebdomadaire, Mensuel, Trimestriel, Semestriel, Annuel, Personnalisé) pour vérifier que les échéances attendues sont couvertes.",
          "Contrôlez la colonne « Statut » : un rapport resté « Brouillon » sur une période close peut signaler un manquement.",
          "Cliquez sur un rapport pour ouvrir son détail (/reports/{id}).",
          "Lisez la page de garde (périmètre, date et auteur de génération), les « Indicateurs » et le tableau « Activités réalisées » ; vérifiez que les activités agrégées sont bien en statut « Validé » ou « Consolidé ».",
          "Contrôlez la section « Références réglementaires EduLex » pour vous assurer que les textes cités existent et sont à jour.",
          "Cliquez sur « Imprimer » pour conserver une copie de contrôle datée."
        ]
      },
      {
        "title": "Démarrer un audit de périmètre depuis le tableau de bord",
        "steps": [
          "Ouvrez le menu « Tableau de bord » (/dashboard).",
          "Le cas échéant, ajustez le filtre Pays / subdivision dans la barre supérieure pour cibler le périmètre à contrôler.",
          "Lisez les KPI clés : « En attente de validation », « Taux de validation (%) » et « Textes à vérifier » pour détecter les zones à risque.",
          "Analysez le graphique « Évolution des activités » et le donut « Répartition par statut » pour repérer des tendances anormales (forte proportion de rejets, stagnation des validations).",
          "Depuis « Activités récentes », cliquez « Tout voir » pour approfondir dans le module Activités ; depuis « EduLex — récents », ouvrez un texte signalé pour vérification.",
          "Consignez les points d'attention pour les traiter via les workflows de contrôle dédiés."
        ]
      },
      {
        "title": "Tracer le périmètre RBAC pour un rapport d'audit",
        "steps": [
          "Ouvrez le menu « Administration » (/admin).",
          "Relevez les statistiques RBAC : nombre d'Utilisateurs, de Pays, de Rôles, de Permissions et de Textes EduLex pour documenter la volumétrie de la plateforme.",
          "Notez la composition de la « Hiérarchie de validation » comme référence de gouvernance.",
          "Croisez ces chiffres avec les KPI du tableau de bord (textes à vérifier, taux de validation) pour étayer vos conclusions.",
          "Conservez vos relevés (impressions de rapports, fiches EduLex téléchargées) comme pièces justificatives de l'audit."
        ]
      }
    ],
    "tips": [
      "Utilisez systématiquement le filtre Pays / subdivision de la barre supérieure pour cadrer votre contrôle sur un périmètre précis avant de tirer des conclusions.",
      "Sur une activité, l'« Historique de validation » est votre meilleure source de preuve : il horodate chaque décision, son auteur et son commentaire. Privilégiez-le aux seuls badges de statut.",
      "Dans EduLex, croisez toujours le niveau de vérification (V0 à V4) avec le statut du texte : un texte « En vigueur » mais resté en V0 mérite d'être signalé.",
      "Pour conserver une preuve d'audit, utilisez « Imprimer » sur les rapports et « Télécharger (PDF) » / « Markdown » sur les fiches EduLex plutôt que de simples captures d'écran.",
      "Comparez la « Hiérarchie de validation » lue dans Administration avec les historiques réels des activités : tout écart révèle un contournement du circuit.",
      "Les files /validation (activités) et /edulex/validation vous sont accessibles en consultation seule : exploitez-les pour mesurer les arriérés et la fluidité des circuits, sans pouvoir statuer.",
      "Surveillez vos Notifications pour ne pas manquer les publications EduLex et les décisions qui touchent votre périmètre de contrôle."
    ],
    "limits": [
      "Vous ne pouvez ni créer, ni modifier, ni soumettre, ni supprimer une activité ; les boutons « Nouvelle activité », « Modifier » et les actions auteur ne vous sont pas accessibles (réservés aux agents / auteurs).",
      "Vous ne pouvez pas valider, rejeter, demander une correction ni consolider une activité : ces décisions relèvent de la permission activity:validate (validateurs hiérarchiques), que vous n'avez pas. La file /validation vous est consultable, mais vous n'y statuez pas.",
      "Vous ne pouvez pas générer ni supprimer de rapport, ni exporter via report:export : la génération relève de report:create / report:manage. Vous vous limitez à consulter et imprimer les rapports existants.",
      "Dans EduLex, vous ne pouvez ni déposer un texte (edulex:create), ni le faire progresser dans le circuit V0→V4 (edulex:validate), ni le publier (edulex:publish), ni téléverser de documents source, ni gérer les référentiels Pays / Ministères / Secteurs ni l'import d'amorçage (edulex:manage). La file /edulex/validation vous est consultable mais vous n'y statuez pas.",
      "Vous n'avez pas accès à la gestion des utilisateurs (/users), de l'organigramme (/organization) ni des formulaires (/forms) : ces modules requièrent user:*, organization:* ou form:*, hors de votre périmètre.",
      "Dans Administration, votre accès est en lecture seule (admin:read) : vous ne pouvez ni modifier la hiérarchie de validation, ni régler la déconnexion automatique par inactivité (réservés à admin:manage, organization:manage ou au super administrateur).",
      "Vous n'avez pas accès aux consoles de gestion d'EduLex Academy (academy:manage) ni, plus largement, à aucune console de configuration : votre rôle est strictement d'observation et de contrôle.",
      "Vous n'avez pas accès aux Archives consolidées (/archives), qui requièrent admin:manage."
    ]
  },
  {
    "roleKey": "reader",
    "tagline": "Consulter l'ensemble de la gouvernance éducative — activités, rapports, référentiel EduLex et Academy — sans créer, modifier, valider ni supprimer aucune donnée métier.",
    "intro": "Le Lecteur simple est un profil de consultation dont le périmètre couvre la gouvernance éducative en Côte d'Ivoire. Il dispose de droits de lecture sur quatre domaines : les activités et contributions, les rapports institutionnels, le référentiel réglementaire EduLex et la plateforme de formation EduLex Academy. Il observe, suit l'avancement et s'informe, mais ne crée, ne modifie, ne valide et ne supprime aucune donnée de gouvernance. Il conserve néanmoins l'usage de ses espaces personnels (compte, agenda, bilan, notifications, formation) et peut suivre les parcours Academy comme tout apprenant. C'est un rôle d'observation et de veille, adapté à un décideur, un auditeur ou un partenaire qui doit comprendre l'état du système sans intervenir dessus.",
    "access": [
      {
        "module": "Accueil (page d'accueil publique) — /",
        "what": "Vous accédez librement à la vitrine publique avant ou après connexion : présentation des trois piliers (Gouvernance administrative, EduLex référentiel international, EduLex Academy), statistiques de fréquentation en temps réel (LiveStats : heure, jour, semaine, mois, année) et points de réassurance. Vous naviguez via le menu (Produit, EduLex, Academy, Contact) et ouvrez les espaces accessibles depuis les cartes des piliers."
      },
      {
        "module": "Tableau de bord — /dashboard",
        "what": "C'est votre point d'entrée personnalisé (« Bonjour, <prénom> ») sur le périmètre pays/subdivision sélectionné. Vous consultez les KPI : Activités saisies, Activités validées, En attente de validation, Rapports générés, Textes EduLex disponibles, Textes à vérifier, Parcours Academy publiés, Taux de validation. Vous lisez le graphique « Évolution des activités », le donut « Répartition par statut », le feed « Activités récentes » (avec « Tout voir » vers /activities) et le bloc « EduLex — récents » (ouverture d'un texte). Le bouton « Nouvelle activité » ne vous est pas proposé (il requiert activity:create). Le bloc « Mes demandes d'absence » et la carte de parrainage relèvent de votre usage personnel."
      },
      {
        "module": "Activités — /activities",
        "what": "Vous consultez la liste de suivi des activités et contributions accessibles à votre périmètre (vos propres activités, le filtre Pays de la barre supérieure s'appliquant). Vous filtrez par statut via les puces (Toutes, Brouillon, Soumis, En examen, Validé, Rejeté, À corriger, Consolidé, Archivé), recherchez par intitulé et lisez le tableau (Activité, Structure, Auteur, Mise à jour, Statut). Vous n'avez pas le bouton « Nouvelle activité » (activity:create requis)."
      },
      {
        "module": "Détail d'une activité — /activities/[id]",
        "what": "Vous ouvrez la fiche d'une activité pour la consulter en lecture : badge de statut, description, « Textes EduLex associés », « Pièces jointes » (vous pouvez télécharger les documents joints), « Informations » (auteur, structure, pays, période, date de soumission) et « Historique de validation » (chronologie des soumissions, validations, rejets, demandes de correction, consolidations). Vous ne disposez d'aucune action de modification, de soumission, de suppression, de décision de validation, ni du téléversement de pièces jointes."
      },
      {
        "module": "Reporting institutionnel — /reports",
        "what": "Vous consultez la liste des rapports consolidés produits à partir des activités validées/consolidées : tableau Rapport (titre + pays), Périodicité (Hebdomadaire / Mensuel / Trimestriel / Semestriel / Annuel / Personnalisé), Généré par, Date, Statut (Brouillon / Généré / Archivé). Vous ouvrez un rapport pour le lire. Le bouton « Générer un rapport » ne vous est pas proposé (il exige report:create ou report:manage)."
      },
      {
        "module": "Détail d'un rapport — /reports/[id]",
        "what": "Vous lisez le rapport généré dans son intégralité : page de garde (titre, « Généré le … par … », badge de périodicité, périmètre Pays/Organisation/Période), bloc « Indicateurs » (activités consolidées et répartition par statut), tableau « Activités réalisées » (Activité / Auteur / Structure / Statut) et « Références réglementaires EduLex ». Vous pouvez l'imprimer via le bouton « Imprimer ». Vous ne pouvez ni générer ni supprimer un rapport."
      },
      {
        "module": "EduLex — référentiel réglementaire — /edulex",
        "what": "Vous consultez le référentiel réglementaire international, restreint au périmètre du filtre Pays. Vous lisez les 4 KPI (Textes au total, En vigueur, À vérifier, Certifiés V4), effectuez une recherche plein texte (« Rechercher par mot-clé… » puis « Filtrer »), filtrez par catégorie, statut, type et niveau (V0 à V4), réinitialisez les filtres et ouvrez la fiche détaillée d'un texte. Les boutons « Déposer un texte », « File de validation » et les raccourcis référentiels (Pays, Ministères, Secteurs, Import d'amorçage) ne s'affichent pas pour vous (ils requièrent edulex:create/validate/manage)."
      },
      {
        "module": "Fiche d'un texte EduLex — /edulex/texts/[id]",
        "what": "Vous lisez le détail complet d'un texte : métadonnées, documents source, relations entre textes (Remplace, Modifie, Abroge, Lié à, Cite), historique des versions, journal de validation et traçabilité (« Déposé par », « Validé par », langue, version). Vous téléchargez le texte (boutons « Télécharger (PDF) » et « Markdown ») et ouvrez « Consulter la source officielle » si l'URL est renseignée. Vous voyez les avertissements pour les textes V0 (non vérifié) ou obsolètes (Abrogé / Remplacé / Suspendu). Vous ne disposez ni du panneau de validation V0→V4, ni du bouton « Publier », ni du téléversement de documents source."
      },
      {
        "module": "EduLex Academy — /academy",
        "what": "Vous accédez à l'espace de formation citoyenne (intitulé « EduLex CI Academy » lorsque le pays est la Côte d'Ivoire). Vous voyez votre profil de progression (XP, Série, Niveau), les 5 niveaux de compétence (Découverte, Compréhension, Application, Maîtrise, Expert/Référent), filtrez les catégories de parcours et ouvrez un parcours publié via « Commencer ». La carte « Modules d'évaluation officiels » (boutons « Générer ») ne vous est pas proposée (academy:manage requis)."
      },
      {
        "module": "Academy — Parcours — /academy/path/[id]",
        "what": "Vous consultez le détail d'un parcours (niveau, catégorie, description) et la liste de ses unités et leçons, y compris les mentions de prérequis (cadenas). Vous cliquez une leçon (nombre de questions affiché) pour lancer son quiz."
      },
      {
        "module": "Academy — Leçon / Quiz — /academy/lesson/[id]",
        "what": "Vous suivez le quiz interactif d'une leçon : répondre aux questions (choix unique ou multiple selon le type), valider, lire le feedback (« Bonne réponse · +X XP » ou « Réponse incorrecte ») avec explication et renvoi « Voir le texte → » vers la fiche EduLex (badge « à vérifier » si la source est V0), naviguer avec « Question suivante » puis « Terminer la leçon », et consulter l'écran de fin (bonnes réponses, XP gagnés, % de parcours, « Recommencer »). À ce titre, vous gagnez des XP et faites progresser votre profil d'apprenant."
      },
      {
        "module": "Academy — Ma progression — /academy/progress",
        "what": "Vous consultez votre tableau de bord d'apprentissage personnel : XP cumulés, niveau et avancement vers le niveau suivant (barre « n/100 »), série d'apprentissage, « Mes parcours » (pourcentage et barre), « Textes à revoir » (recommandations reliées à EduLex) et « Mes badges »."
      },
      {
        "module": "Academy — Badges & trophées — /academy/badges",
        "what": "Vous parcourez la galerie de tous les badges (X / Y obtenus). Pour chacun : icône, nom, description et statut (« Obtenu le <date> » ou « À débloquer » pour les badges verrouillés)."
      },
      {
        "module": "Academy — Classement citoyen — /academy/leaderboard",
        "what": "Vous consultez le classement des 50 apprenants les plus assidus (rang/médaille, initiales, nom, niveau, série, total XP) et repérez votre propre position, surlignée avec la mention « (vous) »."
      },
      {
        "module": "Notifications — /notifications",
        "what": "Vous consultez votre centre de notifications in-app (les 50 dernières, non lues surlignées) : validations, publications EduLex, défis Academy, échéances, décisions, seuils d'absence. Vous cliquez une notification pour la marquer lue et ouvrir le lien associé, et utilisez « Tout marquer comme lu »."
      },
      {
        "module": "Mon profil (Mon compte) — /account",
        "what": "Vous consultez votre page personnelle : nom, avatar, rôles (badges), e-mail, organisation et pays. Vous pouvez changer votre photo et votre « Type de profil » (Personnel, École, Entreprise, Association), ce qui adapte la terminologie de l'interface et la période de bilan par défaut."
      },
      {
        "module": "Paramètres — /parametres",
        "what": "Vous réglez vos préférences personnelles : « Période de bilan par défaut » (Profil par défaut / Semaine / Quinzaine / Mois) et activation des « Rappels des rendez-vous », puis « Enregistrer »."
      },
      {
        "module": "Espaces personnels — Rendez-vous, Bilan, Évaluation, Distinctions, Absences",
        "what": "Ces espaces (agenda /rendez-vous, bilan /bilan, score d'évaluation /evaluation, distinctions et rappels à l'ordre /distinctions, autorisations d'absence /absences) sont rattachés à votre propre compte et restent disponibles pour votre usage individuel : ils ne dépendent pas des permissions métier de gouvernance. Vous y gérez vos rendez-vous, suivez votre taux de réalisation, demandez une absence à votre supérieur le cas échéant, mais ces espaces ne relèvent pas de votre fonction de lecteur de gouvernance."
      }
    ],
    "workflows": [
      {
        "title": "Suivre l'avancement des activités et lire l'historique de validation",
        "steps": [
          "Ouvrez le menu et accédez à « Activités » (/activities).",
          "Vérifiez le filtre Pays de la barre supérieure pour cadrer le périmètre affiché.",
          "Utilisez les puces de statut pour cibler ce qui vous intéresse, par exemple « En examen » ou « Validé ».",
          "Affinez si besoin avec le champ « Rechercher… » en saisissant un intitulé.",
          "Cliquez sur la ligne d'une activité pour ouvrir sa fiche détaillée.",
          "Lisez la description, les « Textes EduLex associés » et les « Informations » (auteur, structure, période, date de soumission).",
          "Déroulez l'« Historique de validation » pour suivre la chronologie (Soumission, Validation, Rejet, Demande de correction, Consolidation) avec auteurs, dates et commentaires.",
          "Si une pièce jointe est utile, cliquez pour la télécharger."
        ]
      },
      {
        "title": "Consulter et imprimer un rapport institutionnel",
        "steps": [
          "Accédez à « Reporting institutionnel » (/reports).",
          "Repérez le rapport voulu dans le tableau à l'aide de la périodicité, de la date ou du nom du générateur.",
          "Cliquez sur le rapport pour ouvrir son détail.",
          "Lisez la page de garde (périmètre Pays/Organisation/Période), le bloc « Indicateurs » et le tableau « Activités réalisées ».",
          "Parcourez les « Références réglementaires EduLex » citées.",
          "Cliquez sur « Imprimer » pour obtenir une version papier ou un PDF via la boîte d'impression du navigateur."
        ]
      },
      {
        "title": "Rechercher un texte réglementaire dans EduLex et le télécharger",
        "steps": [
          "Vérifiez le filtre Pays de la barre supérieure (par ex. Côte d'Ivoire) pour cadrer le périmètre.",
          "Ouvrez « EduLex » (/edulex).",
          "Saisissez un mot-clé dans « Rechercher par mot-clé… » (titre, code, numéro officiel, résumé ou étiquette) puis cliquez « Filtrer ».",
          "Affinez avec les listes « Toutes les catégories », « Tous les statuts », « Tous les types » et « Tous les niveaux » (V0 à V4) ; utilisez « Réinitialiser » pour repartir à zéro.",
          "Cliquez sur la carte du texte pour ouvrir sa fiche détaillée.",
          "Vérifiez le statut et le niveau de vérification (avertissement si V0 ou texte obsolète).",
          "Téléchargez le document via « Télécharger (PDF) » ou « Markdown », ou ouvrez « Consulter la source officielle »."
        ]
      },
      {
        "title": "Vérifier la fiabilité d'un texte avant de s'y appuyer",
        "steps": [
          "Ouvrez la fiche du texte concerné (/edulex/texts/<id>).",
          "Repérez le badge de niveau de vérification : un texte certifié « V4 » est le plus fiable, un « V0 » est non vérifié.",
          "Lisez les avertissements éventuels (V0 non vérifié, ou statut Abrogé / Remplacé / Suspendu).",
          "Consultez le « Journal de validation » pour voir qui a validé le texte et à quel niveau.",
          "Examinez les « Relations avec d'autres textes » (Remplace, Modifie, Abroge, Lié à, Cite) pour vérifier qu'il n'a pas été supplanté.",
          "Vérifiez la traçabilité (« Déposé par », « Validé par », version) avant de citer le texte."
        ]
      },
      {
        "title": "Se former via un parcours EduLex Academy",
        "steps": [
          "Ouvrez « EduLex Academy » (/academy).",
          "Repérez votre niveau et vos XP dans le hero, puis filtrez les « Catégories de parcours ».",
          "Cliquez « Commencer » sur un parcours pour ouvrir son détail (/academy/path/<id>).",
          "Sélectionnez une leçon (le nombre de questions est indiqué ; certaines unités exigent un prérequis).",
          "Répondez à chaque question puis cliquez « Valider » et lisez le feedback et l'explication.",
          "Au besoin, suivez le renvoi « Voir le texte → » pour consulter la fiche EduLex source.",
          "Cliquez « Question suivante » jusqu'à « Terminer la leçon », puis consultez l'écran de fin (XP gagnés, % de parcours)."
        ]
      },
      {
        "title": "Suivre sa progression et ses badges Academy",
        "steps": [
          "Ouvrez « Ma progression » (/academy/progress) depuis Academy.",
          "Consultez vos « XP cumulés », votre niveau et la barre « n/100 vers le niveau suivant ».",
          "Vérifiez votre « Série d'apprentissage » et l'avancement de « Mes parcours ».",
          "Cliquez un texte dans « Textes à revoir » pour réviser via sa fiche EduLex.",
          "Ouvrez « Badges & trophées » (/academy/badges) pour voir les badges obtenus et ceux « À débloquer ».",
          "Ouvrez « Classement citoyen » (/academy/leaderboard) pour situer votre position (ligne « (vous) »)."
        ]
      },
      {
        "title": "Rester informé via le tableau de bord et les notifications",
        "steps": [
          "Ouvrez le « Tableau de bord » (/dashboard) à chaque connexion.",
          "Vérifiez le filtre Pays/subdivision pour cadrer les indicateurs.",
          "Lisez les KPI (Activités validées, En attente de validation, Textes à vérifier, Taux de validation) et les graphiques de tendance.",
          "Cliquez « Tout voir » sous « Activités récentes » pour basculer vers la liste complète, ou ouvrez un texte depuis « EduLex — récents ».",
          "Ouvrez « Notifications » (/notifications) pour prendre connaissance des nouveautés (validations, publications EduLex, défis Academy).",
          "Cliquez une notification pour la marquer lue et ouvrir le contenu associé, ou utilisez « Tout marquer comme lu »."
        ]
      }
    ],
    "tips": [
      "Réglez le filtre Pays de la barre supérieure avant toute consultation : il restreint le périmètre affiché dans le tableau de bord, les activités, les rapports et EduLex, et évite les lectures hors champ.",
      "Avant de citer un texte EduLex, vérifiez systématiquement son niveau de vérification (privilégiez les V4 certifiés) et son statut (« En vigueur » plutôt qu'« Abrogé », « Remplacé » ou « Suspendu »).",
      "Pour conserver une trace, utilisez les téléchargements « PDF » / « Markdown » d'un texte EduLex et le bouton « Imprimer » d'un rapport plutôt que des captures d'écran.",
      "Combinez la recherche plein texte et les listes de filtres (catégorie, statut, type, niveau) dans EduLex pour isoler rapidement un texte ; le lien « Réinitialiser » remet tous les filtres à zéro.",
      "Consultez régulièrement vos notifications : les publications EduLex et les décisions de validation y remontent, ce qui vous évite de surveiller manuellement chaque module.",
      "Dans une activité, dépliez l'« Historique de validation » : il révèle où en est le circuit (niveau attendu, commentaires des valideurs) sans que vous ayez à intervenir.",
      "Adaptez votre « Type de profil » dans Mon compte et la « Période de bilan par défaut » dans Paramètres pour que la terminologie et les périodes correspondent à votre usage."
    ],
    "limits": [
      "Vous ne pouvez pas créer ni modifier d'activité : le bouton « Nouvelle activité », l'édition et la soumission au circuit sont réservés aux auteurs/agents (activity:create / activity:update).",
      "Vous ne pouvez pas valider, rejeter, demander une correction ni consolider une activité : ces décisions exigent activity:validate, et la file « Validation hiérarchique » (/validation) ne vous est pas destinée.",
      "Vous ne pouvez pas générer ni supprimer de rapport : la génération exige report:create ou report:manage ; vous vous limitez à consulter et imprimer l'existant. Vous ne disposez pas non plus de l'export (report:export).",
      "Vous ne pouvez ni déposer, ni importer, ni faire évoluer (V0→V4), ni publier, ni archiver un texte EduLex : le dépôt, la file de validation, l'import d'amorçage et la gestion des référentiels (Pays, Ministères, Secteurs) sont fermés (edulex:create/validate/publish/manage). Vous ne pouvez pas non plus téléverser de documents source sur une fiche.",
      "Vous ne pouvez pas administrer Academy : la génération des modules d'évaluation officiels et la console de questions (/academy/admin) exigent academy:manage ; vous êtes apprenant et observateur, pas gestionnaire.",
      "Vous n'avez pas accès aux modules de structure et de comptes : Organisation & structures (/organization), Utilisateurs (/users) et Formulaires (/forms) requièrent les permissions organization, user ou form, que vous ne possédez pas.",
      "Vous n'avez pas accès à l'espace d'administration et d'audit (/admin), aux Archives (/archives) ni à la configuration de la hiérarchie de validation : ces fonctions exigent admin:read ou admin:manage.",
      "Vos écritures se limitent à votre espace personnel (photo et type de profil, préférences, rendez-vous, demandes d'absence) et à votre activité d'apprenant Academy (réponses aux quiz, gain d'XP) : aucune donnée de gouvernance ne peut être modifiée depuis votre rôle."
    ]
  },
  {
    "roleKey": "edulex_super_admin",
    "tagline": "Gardien du référentiel réglementaire EduLex : déposer, vérifier, certifier et mettre en vigueur les textes de droit éducatif, et administrer leurs référentiels (pays, ministères, secteurs).",
    "intro": "Le Super Administrateur EduLex est le responsable du référentiel réglementaire international EduLex au sein de la plateforme EduWeb Governance. Son périmètre se limite strictement à EduLex : il maîtrise l'intégralité du cycle de vie d'un texte réglementaire, depuis le dépôt initial en V0 (non vérifié) jusqu'à la certification V4 et la mise en vigueur, en passant par l'import en masse et le téléchargement des versions officielles. Il administre également les référentiels structurants d'EduLex (pays et juridictions, ministères et gouvernements, secteurs de classification). Malgré son intitulé, ce rôle n'est pas un super administrateur de la plateforme : il ne gère ni les comptes utilisateurs, ni l'organigramme, ni les activités de gouvernance, les rapports ou EduLex Academy, qui relèvent d'autres rôles.",
    "access": [
      {
        "module": "EduLex — référentiel réglementaire (/edulex)",
        "what": "Cœur du rôle. Consulter les 4 KPI (Textes au total, En vigueur, À vérifier (V0 / à vérifier), Certifiés V4), effectuer une recherche plein texte et filtrer par catégorie, statut, type et niveau (V0–V4). Accéder à tous les leviers : « Déposer un texte » (edulex:create), « File de validation » (edulex:validate) et les raccourcis référentiels « Pays », « Ministères », « Secteurs » et « Import d'amorçage » (edulex:manage / create). Ouvrir n'importe quelle fiche de texte."
      },
      {
        "module": "Déposer un texte EduLex (/edulex/texts/new)",
        "what": "Créer un nouveau texte réglementaire via le formulaire guidé : titre officiel, pays, type, ministère émetteur, secteur, juridiction, numéro officiel, dates (signature, publication, entrée en vigueur), statut initial, confidentialité, langue, résumé analytique et URL source. Le code EduLex est généré automatiquement et le texte est toujours déposé en V0 (non vérifié)."
      },
      {
        "module": "Fiche d'un texte EduLex (/edulex/texts/[id])",
        "what": "Disposer de tous les droits sur la fiche : télécharger le texte (PDF, Markdown), consulter et téléverser des documents source (badge « Officiel »), voir les relations entre textes, l'historique des versions et le journal de validation. Faire progresser le texte via le panneau « Validation à partir de sources officielles » (source officielle URL, commentaire, boutons de niveau V0→V4, sélecteur de statut + « Appliquer »), puis « Publier (mettre en vigueur) » (edulex:publish). Archiver un texte via le sélecteur de statut (statut « Archivé »)."
      },
      {
        "module": "Validation EduLex (/edulex/validation)",
        "what": "Piloter la file de travail des textes à vérifier : consulter les compteurs « Textes à traiter » et « Non vérifiés (V0) », parcourir la liste (titre, code, drapeau + pays, badge de statut, badge de niveau) et cliquer « Examiner » pour ouvrir une fiche et statuer. Disposant d'edulex:validate, vous faites effectivement progresser les textes dans le circuit V0 → V4."
      },
      {
        "module": "Import d'amorçage EduLex (/edulex/import)",
        "what": "Importer en masse des textes par collage CSV/TSV : choisir le pays d'affectation, coller les données (titre, type, numéro officiel, code ministère, code secteur, résumé), prévisualiser puis importer. Tous les textes importés sont marqués V0."
      },
      {
        "module": "EduLex — Pays & juridictions (/edulex/countries)",
        "what": "Consulter la liste des pays (drapeau, nom, namespace/code, nombre de textes, code ISO) et, grâce à edulex:manage, ajouter un pays via la carte dédiée (nom du pays, code ISO, drapeau emoji, namespace)."
      },
      {
        "module": "EduLex — Ministères & gouvernements (/edulex/ministries)",
        "what": "Administrer les ministères émetteurs (edulex:manage) : déclarer un gouvernement, ajouter / éditer / supprimer (unitairement ou en masse) des ministères, et supprimer un gouvernement. Consulter les gouvernements par pays avec leurs dates d'entrée en vigueur et leur statut (À venir / En vigueur / Archivé)."
      },
      {
        "module": "EduLex — Secteurs réglementaires (/edulex/sectors)",
        "what": "Gérer les secteurs de classification (edulex:manage) : ajouter un secteur (nom, code, pays ou « Tous les pays »), éditer, supprimer unitairement ou en masse, et consulter le nombre de textes par secteur."
      },
      {
        "module": "Tableau de bord (/dashboard)",
        "what": "Disposer d'une vue d'ensemble. Les indicateurs relevant de votre rôle (edulex:read) sont « Textes EduLex disponibles » et « Textes à vérifier » (statut à vérifier ou niveau V0), ainsi que le bloc « EduLex — récents » d'où ouvrir directement un texte ou rejoindre /edulex. Les autres KPI et blocs (activités, validation, rapports, Academy) restent affichés mais ne relèvent pas de votre périmètre."
      },
      {
        "module": "Archives (/archives)",
        "what": "Consulter la colonne « Textes obsolètes » : les textes EduLex Abrogés / Remplacés / Suspendus / Archivés y sont listés (à l'échelle de la plateforme) et cliquables vers leur fiche. Les colonnes Activités et Formulaires y figurent aussi mais ne concernent pas votre rôle."
      },
      {
        "module": "Notifications (/notifications)",
        "what": "Recevoir et consulter les notifications in-app pertinentes (notamment les publications EduLex et événements liés au référentiel). Marquer une notification comme lue ou « Tout marquer comme lu »."
      },
      {
        "module": "Mon profil (/account)",
        "what": "Consulter son identité, ses rôles (badge « Super Administrateur EduLex »), son e-mail, son organisation et son pays. Changer sa photo et son type de profil (qui adapte la terminologie de l'interface)."
      },
      {
        "module": "Paramètres (/parametres)",
        "what": "Régler ses préférences personnelles : période de bilan par défaut et activation des rappels de rendez-vous."
      },
      {
        "module": "Modules personnels (Rendez-vous, Bilan, Évaluation, Distinctions, Absences)",
        "what": "Modules accessibles à tout utilisateur authentifié, pour votre propre suivi : tenir votre agenda, suivre votre taux de réalisation, votre score de productivité et vos distinctions, et demander une absence à votre supérieur. Aux Distinctions et Absences, vous voyez votre fiche et celle de vos éventuels subordonnés directs uniquement — pas l'ensemble des agents. Ces modules ne relèvent pas du périmètre EduLex."
      }
    ],
    "workflows": [
      {
        "title": "Déposer un nouveau texte réglementaire (V0)",
        "steps": [
          "Depuis le menu, ouvrez « EduLex » (/edulex).",
          "Cliquez sur le bouton « Déposer un texte » (visible grâce à votre permission edulex:create).",
          "Renseignez « Titre officiel * », sélectionnez le « Pays * » (drapeau + nom) et le « Type * » (Loi, Décret, Arrêté, Convention internationale…).",
          "Complétez le « Ministère émetteur » (recherche), le « Secteur », la « Juridiction » et le « Numéro officiel ».",
          "Saisissez les dates : « Date de signature », « Date de publication » et « Entrée en vigueur ».",
          "Choisissez le « Statut initial », la « Confidentialité » (Public / Restreint / Confidentiel) et la « Langue » (Français / Anglais).",
          "Rédigez le « Résumé analytique » et indiquez l'« URL source officielle ».",
          "Vérifiez l'aperçu du « Code EduLex (généré automatiquement) », puis cliquez « Déposer le texte ». Le texte est créé au niveau V0 (non vérifié)."
        ]
      },
      {
        "title": "Faire progresser un texte dans le circuit de vérification (V0 → V4)",
        "steps": [
          "Ouvrez « EduLex » puis cliquez « File de validation » (/edulex/validation), ou ouvrez directement la fiche du texte concerné.",
          "Repérez le texte à traiter dans la liste (titre, code, badge de statut et de niveau de vérification) et cliquez « Examiner ».",
          "Sur la fiche, ouvrez le panneau « Validation à partir de sources officielles ».",
          "Renseignez la « Source officielle (URL) » sur laquelle vous fondez la vérification et, si utile, un « Commentaire de validation (facultatif) ».",
          "Cliquez sur le bouton du niveau visé (V1, V2, V3 puis V4 pour la certification finale), en respectant la progression.",
          "Au besoin, ajustez le « Statut du texte » via le sélecteur, puis cliquez « Appliquer ».",
          "Vérifiez que le « Journal de validation » et la traçabilité (« Validé par », niveau, version) reflètent bien votre décision."
        ]
      },
      {
        "title": "Publier un texte certifié et le mettre en vigueur",
        "steps": [
          "Ouvrez la fiche du texte concerné (/edulex/texts/[id]).",
          "Assurez-vous que le texte a atteint le niveau de vérification requis et que son statut n'est pas déjà « En vigueur ».",
          "Cliquez sur « Publier (mettre en vigueur) » (bouton disponible grâce à votre permission edulex:publish).",
          "Confirmez que le statut bascule bien et que les avertissements V0 / obsolète ont disparu.",
          "Vérifiez la traçabilité finale (« Déposé par », « Validé par », langue, version) et, si besoin, téléchargez la version officielle en PDF ou Markdown."
        ]
      },
      {
        "title": "Importer en masse des textes d'amorçage",
        "steps": [
          "Depuis « EduLex », cliquez le raccourci « Import d'amorçage » (/edulex/import).",
          "Sélectionnez le « Pays d'affectation » (drapeau + nom).",
          "Collez vos « Données CSV / TSV » dans la zone prévue (colonnes : titre, type, numéro officiel, code ministère, code secteur, résumé ; séparateur virgule, point-virgule ou tabulation ; en-tête auto-détecté).",
          "Cliquez « Prévisualiser » et vérifiez le tableau (Titre, Type, N°, Min., Sect.).",
          "Cliquez « Importer N ligne(s) » ; lisez le message de bilan (« N texte(s) importé(s)…, X ignoré(s) en V0 »).",
          "Suivez le lien « Voir EduLex → » pour retrouver les textes importés, tous marqués V0, et planifier leur vérification."
        ]
      },
      {
        "title": "Ajouter un ministère émetteur au référentiel",
        "steps": [
          "Depuis « EduLex », cliquez le raccourci « Ministères » (/edulex/ministries).",
          "Si le gouvernement concerné n'existe pas encore, utilisez d'abord la carte « Déclarer un gouvernement ».",
          "Dans la carte « Ajouter un ministère », saisissez le « Nom du ministère », son « Code » (ex. MENA) et son « Pays ».",
          "Cliquez « Ajouter le ministère ».",
          "Vérifiez son apparition dans le tableau (Ministère, Code, Pays, Gouvernement) ; éditez ou supprimez ultérieurement si nécessaire."
        ]
      },
      {
        "title": "Ajouter un secteur ou un pays au référentiel EduLex",
        "steps": [
          "Pour un secteur : depuis « EduLex », ouvrez « Secteurs » (/edulex/sectors), renseignez « Nom du secteur », « Code » (ex. EDU) et « Pays » (ou « Tous les pays »), puis cliquez « Ajouter le secteur ».",
          "Pour un pays : ouvrez « Pays » (/edulex/countries), remplissez la carte « Ajouter un pays » avec « Nom du pays », « Code ISO », « Drapeau (emoji) » et « Namespace », puis cliquez « Ajouter le pays ».",
          "Contrôlez la prise en compte dans la liste (nombre de textes, code ISO, ministères rattachés)."
        ]
      },
      {
        "title": "Joindre un document source officiel à un texte",
        "steps": [
          "Ouvrez la fiche du texte concerné (/edulex/texts/[id]).",
          "Dans la section « Documents source », téléversez le fichier PDF officiel (autorisé grâce à edulex:update / create / manage).",
          "Repérez le badge « Officiel » sur le document de référence.",
          "Au besoin, renseignez ou corrigez l'« URL source officielle » et vérifiez le lien « Consulter la source officielle ».",
          "Contrôlez la cohérence avec le « Journal de validation » avant de poursuivre la vérification du texte."
        ]
      },
      {
        "title": "Retirer du circuit un texte obsolète (archivage)",
        "steps": [
          "Ouvrez la fiche du texte concerné (/edulex/texts/[id]).",
          "Dans le panneau de validation, ouvrez le sélecteur « Statut du texte ».",
          "Choisissez le statut adéquat selon le cas : « Abrogé », « Remplacé », « Suspendu » ou « Archivé », puis cliquez « Appliquer ».",
          "Le cas échéant, documentez la relation correspondante (Remplace, Abroge, Modifie…) avec le texte qui s'y substitue.",
          "Retrouvez ensuite le texte dans la vue « Archives » (colonne « Textes obsolètes »)."
        ]
      }
    ],
    "tips": [
      "Déposez toujours un texte avec son « URL source officielle » et un « Résumé analytique » soignés : ils facilitent la vérification ultérieure et alimentent les feedbacks pédagogiques d'EduLex Academy.",
      "Travaillez la file « Validation EduLex » en priorisant le compteur « Non vérifiés (V0) » : ce sont les textes les plus risqués tant qu'ils ne sont pas certifiés.",
      "Respectez la progression du niveau de vérification (V0 → V1 → V2 → V3 → V4) et appuyez chaque montée de niveau sur une source officielle renseignée dans le panneau de validation, pour une traçabilité irréprochable.",
      "Avant tout import d'amorçage, normalisez vos données (codes ministère et secteur exacts) et utilisez systématiquement « Prévisualiser » pour limiter les lignes ignorées.",
      "Créez d'abord les référentiels (pays, gouvernement, ministère, secteur) avant d'importer ou de déposer des textes, afin que les rattachements soient correctement résolus.",
      "Utilisez le filtre Pays de la barre supérieure pour cadrer votre travail sur une déclinaison nationale (ex. Côte d'Ivoire) sans perdre la vision internationale du référentiel.",
      "Ne publiez (« mettre en vigueur ») qu'un texte dont le niveau et le statut sont confirmés : la publication retire les avertissements et rend le texte pleinement exploitable sur la plateforme.",
      "Surveillez vos « Notifications » : les publications et événements EduLex y remontent et vous aident à suivre l'état du référentiel."
    ],
    "limits": [
      "Malgré son intitulé, ce rôle n'est pas le super administrateur de la plateforme : il ne bénéficie d'aucun droit transversal hors EduLex et les fonctions « réservées au super administrateur » (suppression de structures/organisations, déconnexion automatique, etc.) ne lui sont pas ouvertes.",
      "Vous ne pouvez pas gérer les comptes utilisateurs : créer, importer, modifier, activer/désactiver, supprimer ou déléguer des droits relève de user:manage, absente de votre périmètre.",
      "Vous ne pouvez pas administrer l'organigramme : créer, éditer, déplacer ou supprimer des organisations et structures requiert organization:manage, hors de votre portée.",
      "Vous ne pouvez pas créer ni configurer les formulaires d'activités (form:manage), ni concevoir leurs champs.",
      "Vous ne pouvez pas créer, valider ni consolider les activités et contributions de gouvernance (activity:create / validate), ni statuer dans la « Validation hiérarchique ».",
      "Vous ne pouvez pas générer ni gérer les rapports institutionnels (report:create / manage) du module Reporting.",
      "Vous ne pouvez pas administrer EduLex Academy au-delà de la consultation : générer les modules d'évaluation, créer ou publier des questions de quiz exige academy:manage, que vous ne possédez pas.",
      "Vous n'avez pas accès à l'espace « Administration » (/admin) : statistiques RBAC, hiérarchie de validation des activités et déconnexion automatique requièrent admin:read / admin:manage / organization:manage.",
      "Vous ne disposez pas d'admin:manage : aux Archives, vous voyez bien tous les textes EduLex obsolètes, mais aucune vision transversale des activités ou formulaires hors de votre organisation.",
      "Concernant les autorisations d'absence, vous n'agissez qu'en tant qu'utilisateur (demander pour vous-même) ; approuver, refuser ou régler la politique d'absences suppose d'être supérieur hiérarchique. De même, aux Distinctions, vous ne voyez que votre fiche et celle de vos subordonnés directs, et non l'ensemble des agents."
    ]
  },
  {
    "roleKey": "edulex_country_admin",
    "tagline": "Pilote national du référentiel réglementaire EduLex : il dépose, vérifie, certifie et publie les textes officiels de son pays, et tient à jour les référentiels (pays, ministères, secteurs) qui les structurent.",
    "intro": "L'Administrateur pays (EduLex) est le responsable du référentiel réglementaire EduLex pour son périmètre national. Il est habilité à déposer de nouveaux textes (lois, décrets, arrêtés, conventions...), à les faire progresser dans le circuit de vérification des niveaux V0 à V4, à fixer leur statut (En vigueur, Abrogé, Modifié, Remplacé, Suspendu...) puis à les publier (mise en vigueur). Il administre également les référentiels qui sous-tendent EduLex : pays et juridictions, ministères émetteurs et gouvernements, secteurs réglementaires, ainsi que l'import d'amorçage en masse. Son action est strictement cantonnée au domaine EduLex : il n'intervient ni sur la gouvernance administrative (organisations, utilisateurs, activités, formulaires, rapports) ni sur l'administration d'Academy.",
    "access": [
      {
        "module": "EduLex — référentiel réglementaire (/edulex)",
        "what": "Point d'entrée principal du rôle. Vous consultez les 4 KPI (Textes au total, En vigueur, À vérifier [V0 / à vérifier], Certifiés V4), effectuez une recherche plein texte (titre, code, numéro officiel, résumé, étiquettes) puis « Filtrer », et filtrez par catégorie, statut, type et niveau de vérification (V0 à V4). Grâce à vos permissions create, validate et manage, vous disposez des boutons « Déposer un texte » et « File de validation », ainsi que de tous les raccourcis référentiels (« Pays », « Ministères », « Secteurs », « Import d'amorçage »). Vous ouvrez n'importe quelle fiche de texte de votre périmètre via sa carte (LegalTextCard)."
      },
      {
        "module": "Déposer un texte EduLex (/edulex/texts/new)",
        "what": "Avec edulex:create, vous accédez à ce formulaire guidé. Vous visualisez l'aperçu en temps réel du code EduLex généré automatiquement, puis renseignez le titre officiel, le pays, le type, le ministère émetteur, le secteur, la juridiction, le numéro officiel, les dates (signature, publication, entrée en vigueur), le statut initial, la confidentialité (Public / Restreint / Confidentiel), la langue (Français / Anglais), le résumé analytique et l'URL source officielle, avant de déposer le texte (toujours créé au niveau V0, non vérifié)."
      },
      {
        "module": "Fiche d'un texte EduLex (/edulex/texts/[id])",
        "what": "Cœur de votre travail de vérification. Vous téléchargez le texte (PDF / Markdown), ouvrez la source officielle, consultez et téléversez des documents source (via edulex:update / create / manage), examinez les relations entre textes (Remplace, Modifie, Abroge, Lié à, Cite), l'historique des versions et le journal de validation. Grâce à edulex:validate, vous utilisez le panneau « Validation à partir de sources officielles » : vous renseignez la source officielle (URL) et un commentaire de validation, appliquez un niveau V0/V1/V2/V3/V4 et fixez le statut du texte via le sélecteur puis « Appliquer ». Avec edulex:publish, vous disposez du bouton « Publier (mettre en vigueur) » (visible si le statut n'est pas déjà En vigueur). Vous consultez aussi la traçabilité : Déposé par, Validé par, langue et version."
      },
      {
        "module": "Validation EduLex (/edulex/validation)",
        "what": "Votre file de travail. Vous consultez les deux compteurs (« Textes à traiter », « Non vérifiés (V0) »), parcourez la liste des textes à traiter (titre, code, drapeau + pays, badge de statut, badge de niveau de vérification) et cliquez « Examiner » pour ouvrir une fiche et statuer. Disposant d'edulex:validate, vous pouvez réellement statuer (et non pas seulement consulter la file)."
      },
      {
        "module": "Import d'amorçage EduLex (/edulex/import)",
        "what": "Avec edulex:create et edulex:manage, vous importez des textes en masse : vous choisissez le pays d'affectation, collez les données CSV/TSV (colonnes : titre, type, numéro officiel, code ministère, code secteur, résumé), prévisualisez le tableau (Titre, Type, N°, Min., Sect.) puis lancez l'import. Tous les textes importés sont marqués V0 et rattachés au pays choisi."
      },
      {
        "module": "EduLex — Pays & juridictions (/edulex/countries)",
        "what": "Grâce à edulex:manage, vous consultez la liste des pays (drapeau, nom, namespace/code, nombre de textes, badge code ISO, mention « inactif » le cas échéant) et utilisez la carte « Ajouter un pays » (Nom du pays, Code ISO, Drapeau emoji, Namespace)."
      },
      {
        "module": "EduLex — Ministères & gouvernements (/edulex/ministries)",
        "what": "Avec edulex:manage, vous déclarez des gouvernements (statut piloté par date : À venir / En vigueur / Archivé), ajoutez, éditez et supprimez des ministères émetteurs (Nom du ministère, Code ex. MENA, Pays), consultez les gouvernements par pays et supprimez un gouvernement. Vous pouvez réaliser la suppression unitaire ou multiple de ministères dans le tableau (Ministère, Code, Pays, Gouvernement)."
      },
      {
        "module": "EduLex — Secteurs réglementaires (/edulex/sectors)",
        "what": "Avec edulex:manage, vous ajoutez un secteur (Nom du secteur, Code ex. EDU, Pays ou « Tous les pays »), éditez et supprimez les secteurs (unitairement ou en lot) via le tableau (Secteur, Code, Pays/International, nombre de Textes)."
      },
      {
        "module": "EduLex Academy (/academy)",
        "what": "Accès en consultation uniquement, dans la mesure où Academy s'adosse au référentiel EduLex : vous pouvez voir l'espace de formation, les niveaux de compétence et les parcours publiés pour le pays sélectionné, mais vous ne disposez PAS d'academy:manage et ne pouvez donc ni générer les modules d'évaluation officiels ni administrer les questions de quiz."
      }
    ],
    "workflows": [
      {
        "title": "Déposer un nouveau texte réglementaire dans EduLex",
        "steps": [
          "Depuis le menu, ouvrez « EduLex » (/edulex).",
          "Cliquez sur le bouton « Déposer un texte » pour ouvrir le formulaire /edulex/texts/new.",
          "Renseignez le « Titre officiel », sélectionnez le « Pays », le « Type » de texte, puis le « Ministère émetteur » (recherche), le « Secteur » et la « Juridiction ».",
          "Saisissez le « Numéro officiel » et les dates : « Date de signature », « Date de publication » et « Entrée en vigueur ».",
          "Choisissez le « Statut initial », la « Confidentialité » (Public / Restreint / Confidentiel) et la « Langue » (Français / Anglais).",
          "Rédigez le « Résumé analytique » et collez l'« URL source officielle ». Vérifiez l'aperçu du code EduLex généré automatiquement.",
          "Cliquez sur « Déposer le texte ». Le texte est enregistré au niveau V0 (non vérifié) et devra suivre le circuit de validation avant certification."
        ]
      },
      {
        "title": "Vérifier un texte et le faire progresser dans le circuit V0 → V4",
        "steps": [
          "Ouvrez « EduLex » puis cliquez sur « File de validation » (/edulex/validation), ou appuyez-vous sur le KPI « À vérifier (V0 / à vérifier) ».",
          "Repérez un texte « à traiter » ou « Non vérifié (V0) » et cliquez sur « Examiner » pour ouvrir sa fiche.",
          "Comparez le texte avec sa source : ouvrez « Consulter la source officielle » et, au besoin, téléversez le PDF officiel dans « Documents source ».",
          "Dans le panneau « Validation à partir de sources officielles », renseignez le champ « Source officielle (URL) » et un « Commentaire de validation ».",
          "Cliquez sur le bouton du niveau cible (par exemple V1, V2, V3, jusqu'à V4 lorsque la source est pleinement confirmée).",
          "Si nécessaire, ajustez le « Statut du texte » via le sélecteur puis cliquez sur « Appliquer ». Le journal de validation conserve la trace de votre décision."
        ]
      },
      {
        "title": "Certifier (V4) puis publier un texte en vigueur",
        "steps": [
          "Ouvrez la fiche du texte concerné (/edulex/texts/[id]).",
          "Dans le panneau « Validation à partir de sources officielles », renseignez la source officielle (URL) et le commentaire, puis appliquez le niveau « V4 » pour certifier le texte.",
          "Vérifiez les métadonnées et les dates d'entrée en vigueur.",
          "Si le statut n'est pas encore « En vigueur », cliquez sur le bouton « Publier (mettre en vigueur) ».",
          "Contrôlez dans la traçabilité (« Validé par », version) que la publication a bien été enregistrée."
        ]
      },
      {
        "title": "Maintenir le cycle de vie d'un texte (Abrogé, Modifié, Remplacé, Suspendu)",
        "steps": [
          "Ouvrez la fiche du texte concerné (/edulex/texts/[id]) ; les textes obsolètes affichent un avertissement.",
          "Dans le panneau de validation, renseignez la « Source officielle (URL) » justifiant le changement et un « Commentaire de validation ».",
          "Dans le sélecteur « Statut du texte », choisissez le nouveau statut (Abrogé, Modifié, Remplacé, Suspendu...) puis cliquez sur « Appliquer ».",
          "Vérifiez que le texte remonte dans le journal de validation et apparaît, le cas échéant, dans les Archives (textes obsolètes : Abrogé / Remplacé / Suspendu / Archivé)."
        ]
      },
      {
        "title": "Importer en masse des textes par collage CSV/TSV",
        "steps": [
          "Depuis « EduLex », cliquez sur le raccourci « Import d'amorçage » (/edulex/import).",
          "Sélectionnez le « Pays d'affectation » (les textes importés y seront rattachés).",
          "Collez vos données dans « Données CSV / TSV collées » en respectant les colonnes : titre, type, numéro officiel, code ministère, code secteur, résumé.",
          "Cliquez sur « Prévisualiser » et contrôlez le tableau (Titre, Type, N°, Min., Sect.).",
          "Cliquez sur « Importer N ligne(s) ». Notez le message « N texte(s) importé(s)…, X ignoré(s) en V0 », puis suivez « Voir EduLex → ».",
          "Reprenez chaque texte importé via la « File de validation » pour le faire monter au-dessus de V0."
        ]
      },
      {
        "title": "Déclarer un gouvernement et ajouter un ministère émetteur",
        "steps": [
          "Depuis « EduLex », ouvrez le raccourci « Ministères » (/edulex/ministries).",
          "Dans la carte « Déclarer un gouvernement », renseignez le gouvernement en vigueur et ses dates d'entrée en vigueur pour votre pays.",
          "Dans la carte « Ajouter un ministère », saisissez le « Nom du ministère », son « Code » (ex. MENA) et le « Pays », puis cliquez sur « Ajouter le ministère ».",
          "Vérifiez la présence du ministère dans le tableau (Ministère, Code, Pays, Gouvernement).",
          "Au besoin, éditez ou supprimez un ministère obsolète depuis ce même tableau."
        ]
      },
      {
        "title": "Ajouter un secteur réglementaire",
        "steps": [
          "Depuis « EduLex », ouvrez le raccourci « Secteurs » (/edulex/sectors).",
          "Dans la carte « Ajouter un secteur », saisissez le « Nom du secteur » et son « Code » (ex. EDU).",
          "Choisissez le « Pays » de rattachement, ou « Tous les pays » pour un secteur international.",
          "Cliquez sur « Ajouter le secteur » et vérifiez sa présence dans le tableau (Secteur, Code, Pays/International, nombre de Textes).",
          "Le secteur devient ensuite sélectionnable lors du dépôt d'un texte EduLex."
        ]
      },
      {
        "title": "Référencer un nouveau pays dans EduLex",
        "steps": [
          "Depuis « EduLex », ouvrez le raccourci « Pays » (/edulex/countries).",
          "Repérez la carte « Ajouter un pays ».",
          "Renseignez le « Nom du pays », le « Code ISO », le « Drapeau (emoji) » et le « Namespace ».",
          "Cliquez sur « Ajouter le pays ».",
          "Vérifiez son apparition dans la liste des pays (drapeau, nom, namespace, nombre de textes, code ISO)."
        ]
      }
    ],
    "tips": [
      "Travaillez toujours à partir de la source officielle : avant de monter un texte de V1 à V4, renseignez systématiquement le champ « Source officielle (URL) » et téléversez le PDF officiel dans « Documents source » pour garantir la traçabilité.",
      "Réservez le niveau V4 et la publication aux textes dont la source est pleinement confirmée : une fois « En vigueur », un texte alimente Academy (modules d'évaluation officiels) et les « Références réglementaires EduLex » des rapports — la rigueur de votre vérification engage tout le référentiel.",
      "Après chaque import d'amorçage, gardez à l'esprit que tous les textes restent en V0 : planifiez leur reprise via la « File de validation » pour qu'ils sortent du statut « Non vérifié ».",
      "Renseignez les codes normalisés (code ISO pays, code ministère type MENA, code secteur type EDU) de façon cohérente : ils conditionnent le rapprochement des lignes lors des imports CSV/TSV.",
      "Utilisez le filtre Pays de la barre supérieure pour cadrer votre périmètre national et éviter de traiter par erreur des textes d'un autre pays.",
      "Saisissez un commentaire de validation explicite à chaque changement de niveau ou de statut : il est conservé dans le « Journal de validation » et facilitera les contrôles ultérieurs.",
      "Tenez à jour les gouvernements et leurs dates d'entrée en vigueur : le statut À venir / En vigueur / Archivé des ministères en dépend, et donc la justesse du champ « Ministère émetteur » des textes.",
      "Lorsqu'un texte est abrogé, remplacé ou suspendu, mettez à jour son statut sans tarder : il bascule alors dans les Archives et cesse d'alimenter Academy et les rapports avec une référence périmée."
    ],
    "limits": [
      "Il ne gère pas les organisations ni l'organigramme : aucun accès à la création, l'édition ou la réorganisation des structures (/organization), réservées à organization:manage.",
      "Il ne gère pas les comptes utilisateurs : il ne peut ni créer, ni importer, ni modifier, ni activer/désactiver des comptes, ni déléguer des permissions (/users), faute de user:manage.",
      "Il n'intervient pas sur les activités ni sur leur circuit de validation : il ne crée, ne soumet, ni ne valide d'activités (/activities, /validation), qui relèvent des permissions activity.",
      "Il ne conçoit pas les formulaires de saisie (/forms), réservés à form:manage.",
      "Il ne génère ni ne gère les rapports institutionnels (/reports), qui requièrent les permissions report.",
      "Côté Academy, il est en consultation seule : il ne peut ni générer les modules d'évaluation officiels, ni créer/publier/supprimer des questions de quiz (/academy/admin), faute d'academy:manage.",
      "Il n'accède pas à l'espace d'Administration de la plateforme (/admin) ni aux Archives globales (/archives), qui relèvent d'admin:read / admin:manage, ni au réglage de la hiérarchie de validation ou de la déconnexion automatique par inactivité.",
      "Il n'est pas super administrateur : il ne réalise pas les suppressions en cascade d'organisations ou de structures réservées à ce profil.",
      "Sur les absences (/absences), il n'agit que pour son propre compte (demander une absence) comme tout utilisateur authentifié ; il n'approuve, ne refuse ni ne comptabilise les absences d'autrui que s'il est par ailleurs supérieur hiérarchique — ce n'est pas une prérogative de ce rôle EduLex."
    ]
  },
  {
    "roleKey": "edulex_ministry_admin",
    "tagline": "Constituer, faire vivre et vérifier le référentiel réglementaire EduLex de votre ministère, du dépôt d'un texte jusqu'à sa certification V0 à V4.",
    "intro": "En tant qu'Administrateur ministériel (EduLex), vous êtes le pilier documentaire et réglementaire de la plateforme pour votre périmètre. Vous déposez les nouveaux textes (lois, décrets, arrêtés, conventions internationales, etc.), vous enrichissez leur documentation et vous faites progresser chaque texte dans le circuit de vérification V0 à V4 à partir de sources officielles. Votre champ d'action couvre exclusivement le module EduLex (référentiel réglementaire international et ses déclinaisons nationales) : vous travaillez sur le fond réglementaire, sans intervenir sur la gouvernance administrative (activités, rapports, organigramme, comptes) ni sur EduLex Academy.",
    "access": [
      {
        "module": "EduLex — référentiel réglementaire (/edulex)",
        "what": "C'est votre espace central. Vous consultez les 4 KPI (Textes au total, En vigueur, À vérifier, Certifiés V4), vous lancez une recherche plein texte (titre, code, numéro officiel, résumé, étiquettes) et appliquez les filtres (catégorie, statut, type, niveau V0–V4). Vos permissions edulex:create et edulex:validate ouvrent les boutons « Déposer un texte » et « File de validation », et edulex:create rend accessible le raccourci « Import d'amorçage ». Vous ouvrez la fiche de n'importe quel texte via sa carte."
      },
      {
        "module": "Déposer un texte EduLex (/edulex/texts/new)",
        "what": "Grâce à edulex:create, vous déposez de nouveaux textes réglementaires : titre officiel, pays, type, ministère émetteur, secteur, juridiction, numéro officiel, dates (signature, publication, entrée en vigueur), statut initial, confidentialité, langue, résumé analytique et URL source. Le code EduLex est généré automatiquement et le texte est toujours créé au niveau V0 (non vérifié)."
      },
      {
        "module": "Fiche d'un texte EduLex (/edulex/texts/[id])",
        "what": "Vous consultez l'intégralité d'un texte (métadonnées, documents source, relations entre textes, historique des versions, journal de validation) et le téléchargez (PDF / Markdown). Avec edulex:update et edulex:create, vous téléversez des documents source PDF (badge « Officiel »). Avec edulex:validate, vous utilisez le panneau « Validation à partir de sources officielles » : renseigner l'URL source, ajouter un commentaire, appliquer un niveau V0/V1/V2/V3/V4, et changer le statut du texte via le sélecteur puis « Appliquer »."
      },
      {
        "module": "Validation EduLex (/edulex/validation)",
        "what": "Votre file de travail principale. Vous y voyez les compteurs « Textes à traiter » et « Non vérifiés (V0) », vous parcourez les textes en attente (statuts En attente / À vérifier / Importé non vérifié / Brouillon, niveaux V0/V1/V2) et vous cliquez « Examiner » pour ouvrir la fiche et statuer. Votre permission edulex:validate vous autorise à statuer pleinement, et non en simple consultation."
      },
      {
        "module": "Import d'amorçage EduLex (/edulex/import)",
        "what": "Accessible avec votre permission edulex:create. Vous choisissez le pays d'affectation, collez des données CSV/TSV (titre, type, numéro officiel, code ministère, code secteur, résumé), prévisualisez puis importez en masse. Tous les textes importés sont créés en V0 (non vérifié) et devront passer le circuit de vérification."
      },
      {
        "module": "EduLex — Pays & juridictions (/edulex/countries)",
        "what": "Accessible en lecture (edulex:read) : vous consultez la liste des pays avec leur namespace, le nombre de textes et de ministères, et le code ISO. La carte « Ajouter un pays » exige edulex:manage, que vous n'avez pas : vous ne pouvez donc pas créer de pays."
      },
      {
        "module": "EduLex — Ministères & gouvernements (/edulex/ministries)",
        "what": "Accessible en lecture (edulex:read) : vous consultez les gouvernements par pays (dates d'entrée en vigueur, statut À venir / En vigueur / Archivé) et le tableau des ministères émetteurs. La déclaration de gouvernement et l'ajout/édition/suppression de ministères exigent edulex:manage : ces actions ne relèvent pas de votre rôle."
      },
      {
        "module": "EduLex — Secteurs réglementaires (/edulex/sectors)",
        "what": "Accessible en lecture (edulex:read) : vous consultez le tableau des secteurs (nom, code, pays ou international, nombre de textes). L'ajout, l'édition et la suppression de secteurs exigent edulex:manage et vous sont fermés."
      },
      {
        "module": "Tableau de bord (/dashboard)",
        "what": "Vue d'ensemble de votre périmètre. Avec edulex:read, vous suivez en particulier les KPI « Textes EduLex disponibles » et « Textes à vérifier » (statut à vérifier ou niveau V0), le bloc « EduLex — récents » dont vous ouvrez chaque texte, et la flèche menant au référentiel. Vous lisez aussi les KPI et graphiques généraux et le bloc de vos demandes d'absence. Note : vous n'avez pas la permission activity:create, le bouton « Nouvelle activité » ne relève donc pas de votre rôle."
      },
      {
        "module": "Archives (/archives)",
        "what": "Cette vue consolidée des éléments obsolètes (dont les textes EduLex Abrogé / Remplacé / Suspendu / Archivé) requiert la permission admin:manage, que vous n'avez pas. Vous retrouvez néanmoins les textes obsolètes en filtrant directement par statut dans le module EduLex."
      },
      {
        "module": "Mon profil (/account)",
        "what": "Page personnelle : vous consultez votre nom, vos rôles, votre e-mail, votre organisation et votre pays. Vous pouvez changer votre photo et votre type de profil (Personnel, École, Entreprise, Association)."
      },
      {
        "module": "Notifications (/notifications)",
        "what": "Centre de notifications in-app : vous y êtes notamment alerté des publications et des validations EduLex vous concernant. Vous marquez les notifications comme lues et ouvrez leur lien associé."
      },
      {
        "module": "Rendez-vous, Bilan, Évaluation, Distinctions, Absences, Paramètres",
        "what": "Espaces personnels ouverts à tout utilisateur connecté : agenda privé (/rendez-vous), bilan de réalisation et export PDF (/bilan), score de productivité (/evaluation), distinctions trimestrielles (/distinctions), demande d'absence pour vous-même si un supérieur est défini (/absences), et préférences personnelles (/parametres)."
      }
    ],
    "workflows": [
      {
        "title": "Déposer un nouveau texte réglementaire dans EduLex",
        "steps": [
          "Depuis le menu, ouvrez « EduLex » (/edulex).",
          "Cliquez sur « Déposer un texte » (visible car vous avez edulex:create).",
          "Observez l'aperçu en temps réel du « Code EduLex (généré automatiquement) » qui se construit au fil de votre saisie.",
          "Renseignez les champs obligatoires : « Titre officiel * », « Pays * » (sélecteur drapeau + nom) et « Type * » (Loi, Décret, Arrêté, Convention internationale, etc.).",
          "Complétez les métadonnées utiles : « Ministère émetteur » (recherche), « Secteur », « Juridiction », « Numéro officiel ».",
          "Saisissez les dates : « Date de signature », « Date de publication » et « Entrée en vigueur ».",
          "Choisissez le « Statut initial », la « Confidentialité » (Public / Restreint / Confidentiel) et la « Langue » (Français / Anglais).",
          "Rédigez le « Résumé analytique » et collez l'« URL source officielle ».",
          "Cliquez sur « Déposer le texte ». Le texte est enregistré au niveau V0 (non vérifié) et entre dans le circuit de vérification."
        ]
      },
      {
        "title": "Faire progresser un texte dans le circuit de vérification (par ex. de V2 à V3)",
        "steps": [
          "Ouvrez « EduLex » puis cliquez sur « File de validation » (/edulex/validation), accessible grâce à edulex:validate.",
          "Repérez le texte à traiter à l'aide des compteurs « Textes à traiter » et « Non vérifiés (V0) » et de son badge de niveau.",
          "Cliquez sur « Examiner » pour ouvrir la fiche du texte.",
          "Dans le panneau « Validation à partir de sources officielles », renseignez le champ « Source officielle (URL) » qui justifie la montée de niveau.",
          "Ajoutez si besoin un « Commentaire de validation (facultatif) » documentant votre contrôle.",
          "Cliquez sur le bouton du niveau visé (ici V3) pour appliquer la certification.",
          "Au besoin, ajustez le « Statut du texte » via le sélecteur puis cliquez sur « Appliquer ».",
          "Vérifiez que le « Journal de validation » de la fiche enregistre bien votre intervention (qui, quand, niveau atteint)."
        ]
      },
      {
        "title": "Compléter la documentation source d'un texte existant",
        "steps": [
          "Dans « EduLex », recherchez le texte via le champ « Rechercher par mot-clé… » (titre, code, numéro officiel, résumé, étiquettes) puis cliquez « Filtrer ».",
          "Affinez si nécessaire avec les listes « Toutes les catégories », « Tous les statuts », « Tous les types » et « Tous les niveaux ».",
          "Cliquez sur la carte du texte (LegalTextCard) pour ouvrir sa fiche détaillée.",
          "Vérifiez les avertissements éventuels (texte V0 non vérifié, ou obsolète : Abrogé / Remplacé / Suspendu).",
          "Si une source manque, téléversez un « Document source » PDF (badge « Officiel »), grâce à vos permissions edulex:update et edulex:create.",
          "Contrôlez les sections « Relations avec d'autres textes », « Historique des versions » et la traçabilité (« Déposé par », « Validé par », langue, version).",
          "Si une métadonnée doit être corrigée à la montée de niveau, documentez-la dans le « Commentaire de validation » du panneau, puis appliquez le niveau ou le statut adapté."
        ]
      },
      {
        "title": "Importer en masse un lot de textes à amorcer",
        "steps": [
          "Depuis « EduLex », ouvrez le raccourci « Import d'amorçage » (page /edulex/import, accessible via edulex:create).",
          "Sélectionnez le « Pays d'affectation » (sélecteur drapeau + nom).",
          "Collez vos « Données CSV / TSV » dans la zone prévue, en respectant les colonnes : titre, type, numéro officiel, code ministère, code secteur, résumé (séparateur virgule / point-virgule / tabulation, en-tête auto-détecté).",
          "Cliquez sur « Prévisualiser » et vérifiez le tableau (Titre, Type, N°, Min., Sect.).",
          "Cliquez sur « Importer N ligne(s) » : un message confirme « N texte(s) importé(s)…, X ignoré(s) en V0 ».",
          "Suivez le lien « Voir EduLex → », puis planifiez la vérification de ces textes, tous créés au niveau V0."
        ]
      },
      {
        "title": "Résorber votre file des textes non vérifiés (V0)",
        "steps": [
          "Ouvrez « EduLex » et lisez le KPI « À vérifier (V0 / à vérifier) » pour mesurer la charge.",
          "Cliquez sur « File de validation » (/edulex/validation) et consultez le compteur « Non vérifiés (V0) ».",
          "Parcourez la liste (titre, code, drapeau + pays, badge de statut, badge de niveau).",
          "Pour chaque texte, cliquez « Examiner », contrôlez la source officielle et faites-le monter d'un niveau de vérification depuis le panneau de validation.",
          "Répétez l'opération jusqu'à résorber les textes V0, en documentant systématiquement l'URL source et un commentaire de validation."
        ]
      },
      {
        "title": "Préparer un texte vérifié pour sa mise en vigueur (limite à connaître)",
        "steps": [
          "Faites progresser le texte jusqu'au niveau de vérification requis depuis sa fiche, à l'aide de votre permission edulex:validate.",
          "Sur la fiche, repérez le bouton « Publier (mettre en vigueur) » : il n'apparaît que pour les profils disposant de la permission edulex:publish.",
          "Constatez que cette mise en vigueur ne fait pas partie de vos permissions (vous avez read, create, update et validate, mais pas publish).",
          "Signalez le texte prêt à un profil disposant d'edulex:publish (via une note ou le suivi interne) pour qu'il procède à la publication finale."
        ]
      }
    ],
    "tips": [
      "Déposez toujours un texte avec son « URL source officielle » et son « Résumé analytique » : cela facilite la recherche plein texte et la future vérification par niveau.",
      "Avant de faire monter un texte d'un niveau, renseignez systématiquement la « Source officielle (URL) » dans le panneau de validation : c'est la preuve documentaire de votre contrôle, consignée dans le journal.",
      "Le code EduLex se génère automatiquement à partir des métadonnées : renseignez Pays, Type et Ministère émetteur avant de finaliser pour obtenir une codification cohérente.",
      "Pour les imports d'amorçage volumineux, soignez les colonnes « code ministère » et « code secteur » : un bon rattachement évite des textes mal classés à reprendre manuellement.",
      "Utilisez le KPI « Textes à vérifier » du tableau de bord comme indicateur quotidien de votre charge, puis basculez vers la « File de validation » pour traiter.",
      "Filtrez par statut (Abrogé / Remplacé / Suspendu) dans EduLex pour retrouver les textes obsolètes, puisque la vue Archives consolidée ne vous est pas ouverte.",
      "Activez et consultez régulièrement vos notifications : vous y êtes alerté des publications et des étapes de validation EduLex vous concernant."
    ],
    "limits": [
      "Vous ne pouvez pas publier (mettre en vigueur) un texte ni l'archiver : ces actions relèvent des permissions edulex:publish et edulex:archive, que vous n'avez pas.",
      "Vous ne gérez pas les référentiels structurants : l'ajout/édition/suppression de pays, de gouvernements, de ministères et de secteurs exige edulex:manage (vous y avez seulement accès en lecture).",
      "Vous ne disposez pas de fonction d'export du référentiel (edulex:export).",
      "Vous n'avez aucun droit sur EduLex Academy : ni génération de modules d'évaluation, ni création/publication de questions de quiz (permissions academy:* absentes).",
      "Vous ne pouvez pas créer, modifier ou valider d'activités, ni générer de rapports institutionnels : les permissions activity:* et report:* ne font pas partie de votre rôle.",
      "Vous n'intervenez pas sur l'organigramme : la consultation et la gestion des organisations et structures (organization:read/manage) vous sont fermées.",
      "Vous ne gérez pas les comptes utilisateurs ni les rôles : la création, l'import et la modération d'utilisateurs (user:read/manage) ne relèvent pas de votre rôle.",
      "Vous ne concevez pas de formulaires de saisie (form:read/manage absentes).",
      "Vous n'accédez pas à l'espace d'administration ni aux journaux d'audit, ni à la vue Archives consolidée (permissions admin:read/manage absentes).",
      "Concernant les absences, vous pouvez demander une autorisation pour vous-même (si un supérieur hiérarchique est défini), mais pas approuver ou refuser celles d'autrui : cela est réservé au supérieur hiérarchique ou au super administrateur."
    ]
  },
  {
    "roleKey": "edulex_depositor",
    "tagline": "Alimenter le référentiel réglementaire EduLex en y déposant de nouveaux textes officiels et en complétant leurs documents source, avant leur vérification et leur certification par d'autres.",
    "intro": "Le Service technique déposant (EduLex) est l'agent chargé de constituer et d'enrichir le fonds documentaire réglementaire de la plateforme. Son rôle consiste à déposer de nouveaux textes (lois, décrets, arrêtés, conventions, etc.), à les compléter en y joignant les documents source officiels (PDF), et à importer des lots de textes en masse par collage CSV/TSV. Tous les textes qu'il dépose ou importe entrent au niveau V0 (non vérifié) et devront ensuite suivre le circuit de vérification V0→V4 conduit par d'autres agents avant d'être certifiés et mis en vigueur. Son périmètre est strictement limité à EduLex : il ne vérifie pas, ne publie pas, n'archive pas, n'exporte pas et ne gère pas les référentiels (pays, ministères, secteurs).",
    "access": [
      {
        "module": "EduLex — référentiel réglementaire (/edulex)",
        "what": "Point d'entrée du référentiel. Vous consultez les 4 indicateurs (« Textes au total », « En vigueur », « À vérifier (V0 / à vérifier) », « Certifiés V4 »), recherchez un texte en plein texte (titre, code, numéro officiel, résumé, étiquettes) via « Rechercher par mot-clé… » puis « Filtrer », et affinez par « Toutes les catégories », « Tous les statuts », « Tous les types » et « Tous les niveaux » (V0 à V4), avec « Réinitialiser ». Grâce à edulex:create, le bouton « Déposer un texte » (→ /edulex/texts/new) vous est accessible, ainsi que les raccourcis référentiels « Pays », « Ministères », « Secteurs » et « Import d'amorçage » (la gestion des trois premiers reste toutefois réservée à edulex:manage : vous ne faites qu'y accéder en consultation). Vous ouvrez chaque carte de texte (LegalTextCard) pour consulter sa fiche détaillée. Le bouton « File de validation » ne vous est PAS proposé : il est réservé à edulex:validate."
      },
      {
        "module": "Déposer un texte EduLex (/edulex/texts/new)",
        "what": "Cœur de votre mission (edulex:create). Vous remplissez le formulaire guidé de dépôt : « Titre officiel », « Pays », « Type », « Ministère émetteur » (recherche), « Secteur », « Juridiction », « Numéro officiel », les dates (« Date de signature », « Date de publication », « Entrée en vigueur »), le « Statut initial », la « Confidentialité » (Public / Restreint / Confidentiel), la « Langue » (Français / Anglais), le « Résumé analytique » et l'« URL source officielle ». Vous suivez en temps réel l'aperçu du « Code EduLex (généré automatiquement) », puis cliquez « Déposer le texte ». Le texte est toujours créé au niveau V0 (non vérifié)."
      },
      {
        "module": "Fiche d'un texte EduLex (/edulex/texts/[id])",
        "what": "Vous consultez le détail complet d'un texte : métadonnées, documents source, relations entre textes (Remplace, Modifie, Abroge, Lié à, Cite), historique des versions, journal de validation et traçabilité (« Déposé par », « Validé par », langue, version). Vous téléchargez le texte (« Télécharger (PDF) », « Markdown ») et ouvrez « Consulter la source officielle » si l'URL est renseignée. Grâce à edulex:update et edulex:create, vous pouvez téléverser des « Documents source » (PDF) pour compléter un texte existant, avec badge « Officiel ». En revanche, le panneau « Validation à partir de sources officielles » (boutons de niveau V0→V4, sélecteur de statut + « Appliquer ») et le bouton « Publier (mettre en vigueur) » ne vous sont PAS accessibles : ils requièrent edulex:validate et edulex:publish, que vous n'avez pas."
      },
      {
        "module": "Import d'amorçage EduLex (/edulex/import)",
        "what": "Grâce à edulex:create, vous importez des textes en masse par collage de données CSV/TSV. Vous choisissez le « Pays d'affectation », collez les « Données CSV / TSV collées » (colonnes : titre, type, numéro officiel, code ministère, code secteur, résumé ; séparateur virgule / point-virgule / tabulation ; en-tête auto-détecté), cliquez « Prévisualiser » pour contrôler le tableau (Titre, Type, N°, Min., Sect.), puis « Importer N ligne(s) ». Tous les textes importés sont marqués V0 (non vérifié) et affectés au pays choisi ; le message de résultat indique le nombre importé et le nombre ignoré, avec le lien « Voir EduLex → »."
      }
    ],
    "workflows": [
      {
        "title": "Déposer un nouveau texte réglementaire (à l'unité)",
        "steps": [
          "Depuis le référentiel /edulex, cliquez sur le bouton « Déposer un texte ».",
          "Renseignez le « Titre officiel » et sélectionnez le « Pays » (drapeau + nom) ; observez le « Code EduLex (généré automatiquement) » se construire en temps réel.",
          "Choisissez le « Type » (Loi, Décret, Arrêté, Convention internationale, etc.) et précisez le « Ministère émetteur » (recherche), le « Secteur », la « Juridiction » et le « Numéro officiel ».",
          "Saisissez les dates pertinentes : « Date de signature », « Date de publication », « Entrée en vigueur ».",
          "Sélectionnez le « Statut initial », le niveau de « Confidentialité » (Public / Restreint / Confidentiel) et la « Langue » (Français / Anglais).",
          "Rédigez un « Résumé analytique » clair et fidèle, puis renseignez l'« URL source officielle ».",
          "Cliquez « Déposer le texte ». Le texte est créé au niveau V0 (non vérifié) et apparaît dans le référentiel ; il devra ensuite être vérifié par un valideur avant toute certification."
        ]
      },
      {
        "title": "Compléter un texte existant en y joignant le document source officiel (PDF)",
        "steps": [
          "Depuis /edulex, recherchez le texte avec « Rechercher par mot-clé… » puis « Filtrer », ou affinez par catégorie, statut, type ou niveau.",
          "Cliquez la carte du texte pour ouvrir sa fiche (/edulex/texts/[id]).",
          "Dans la section « Documents source », téléversez le fichier PDF officiel (autorisé par vos permissions edulex:update / create).",
          "Vérifiez que le document apparaît bien dans la liste des « Documents source » (badge « Officiel » le cas échéant).",
          "Au besoin, téléchargez-le via « Télécharger (PDF) » pour confirmer qu'il s'ouvre correctement et qu'il s'agit de la bonne version."
        ]
      },
      {
        "title": "Importer un lot de textes par collage CSV/TSV",
        "steps": [
          "Depuis /edulex, ouvrez le raccourci « Import d'amorçage » (ou rendez-vous sur /edulex/import).",
          "Sélectionnez le « Pays d'affectation » (drapeau + nom) auquel tous les textes du lot seront rattachés.",
          "Préparez vos données avec les colonnes attendues : titre, type, numéro officiel, code ministère, code secteur, résumé (séparateur virgule, point-virgule ou tabulation ; en-tête auto-détecté).",
          "Collez le contenu dans le champ « Données CSV / TSV collées ».",
          "Cliquez « Prévisualiser » et contrôlez le tableau de prévisualisation (Titre, Type, N°, Min., Sect.) ligne par ligne.",
          "Cliquez « Importer N ligne(s) » et lisez le message de résultat (« N texte(s) importé(s)…, X ignoré(s) »).",
          "Suivez le lien « Voir EduLex → » pour retrouver les textes importés, tous au niveau V0."
        ]
      },
      {
        "title": "Suivre l'état d'avancement d'un texte que vous avez déposé",
        "steps": [
          "Depuis /edulex, retrouvez le texte par mot-clé, ou utilisez le filtre « Tous les niveaux » → V0 pour repérer vos dépôts non encore vérifiés.",
          "Ouvrez sa fiche et consultez le badge de niveau de vérification (V0 à V4) et le badge de statut (En vigueur, À vérifier, Importé non vérifié, etc.).",
          "Lisez le « Journal de validation » pour voir les décisions déjà prises et par qui.",
          "Vérifiez la traçabilité (« Déposé par », « Validé par », version) pour situer le texte dans le circuit V0→V4.",
          "Si une source manque, complétez le texte en téléversant le document source (PDF) pour faciliter sa future vérification ; vous ne modifiez vous-même ni le niveau de vérification ni le statut « En vigueur »."
        ]
      }
    ],
    "tips": [
      "Renseignez systématiquement l'« URL source officielle » et téléversez le PDF officiel dès le dépôt : un texte bien sourcé est plus rapide à vérifier et à faire monter en niveau (V1→V4) par le valideur.",
      "Rédigez un « Résumé analytique » synthétique et fidèle : il ressort dans la recherche plein texte et guide aussi bien les lecteurs que les valideurs.",
      "Choisissez le « Type » et le « Secteur » avec soin : ils conditionnent le classement et la recherche par filtres, donc la retrouvabilité du texte.",
      "Avant un import en masse, faites toujours « Prévisualiser » et contrôlez le tableau ligne par ligne : c'est le moment de corriger les codes ministère / secteur avant l'import définitif.",
      "Gardez à l'esprit que tout ce que vous déposez ou importez part en V0 : votre travail prépare la vérification, il ne la remplace pas. Soignez l'exactitude des informations dès le dépôt pour éviter des allers-retours.",
      "Utilisez le filtre « Tous les niveaux » → V0 sur /edulex pour faire le suivi de vos propres dépôts en attente de vérification."
    ],
    "limits": [
      "Vous ne pouvez PAS vérifier les textes ni les faire progresser dans le circuit V0→V4 : le panneau « Validation à partir de sources officielles » et la « File de validation » (/edulex/validation) sont réservés au profil edulex:validate.",
      "Vous ne pouvez PAS publier un texte (« Publier (mettre en vigueur) ») : cela requiert edulex:publish.",
      "La fiche d'un texte ne propose pas d'édition libre des métadonnées (titre, type, dates, résumé) ; votre marge d'action sur un texte existant se limite au téléversement de documents source (edulex:update / create). Pour le reste, c'est le valideur qui statue.",
      "Vous ne pouvez PAS archiver un texte ni exporter le référentiel : ces actions relèvent d'edulex:archive et edulex:export.",
      "Vous ne gérez PAS les référentiels EduLex : ajouter / éditer / supprimer des pays (/edulex/countries), des ministères (/edulex/ministries) ou des secteurs (/edulex/sectors) requiert edulex:manage, que vous n'avez pas — vous n'y accédez qu'en consultation.",
      "Vous n'avez PAS accès aux modules de gouvernance administrative : Activités, Validation hiérarchique, Formulaires, Reporting institutionnel, Organisation & structures, Utilisateurs et Administration ne relèvent pas de votre périmètre.",
      "Vous n'avez PAS de droits sur EduLex Academy (parcours, quiz, badges, console d'administration des questions) : ces écrans dépendent des permissions academy.",
      "Le tableau de bord agrégé et les Archives ne reposent pas sur vos permissions EduLex (ils dépendent d'activity, report et admin:manage) : ce qui s'y affiche dépasse votre périmètre de dépôt."
    ]
  },
  {
    "roleKey": "edulex_doc_validator",
    "tagline": "Vérifier la fiabilité des textes réglementaires d'EduLex et les faire progresser, source officielle à l'appui, du niveau V0 jusqu'à la certification V4.",
    "intro": "Le Validateur documentaire (EduLex) est le garant de la qualité et de la traçabilité du référentiel réglementaire international EduLex. Sa mission consiste à examiner les textes déposés ou importés (lois, décrets, arrêtés, conventions, etc.), à confronter leur contenu aux sources officielles, puis à leur attribuer un niveau de vérification allant de V0 (non vérifié) à V4 (certifié) ainsi qu'un statut adéquat. Son périmètre est strictement documentaire : il consulte le référentiel EduLex selon le filtre Pays actif dans la barre supérieure et statue sur la fiabilité des textes, sans toutefois en créer, en importer, les publier ni administrer les référentiels associés (pays, ministères, secteurs). Il travaille principalement depuis la file de validation EduLex et les fiches de texte.",
    "access": [
      {
        "module": "EduLex — référentiel réglementaire (/edulex)",
        "what": "Consultez le référentiel sur le périmètre du filtre Pays actif : les 4 indicateurs (Textes au total, En vigueur, À vérifier [V0 / à vérifier], Certifiés V4), la recherche plein texte (titre, code, numéro officiel, résumé, étiquettes) via « Rechercher par mot-clé… » puis « Filtrer », et les listes déroulantes de filtres (catégories, statuts, types, niveaux V0 à V4) avec le lien « Réinitialiser ». Grâce à votre permission edulex:validate, le bouton « File de validation » est visible et vous mène à votre plan de travail. Ouvrez n'importe quelle carte de texte pour accéder à sa fiche. À noter : le bouton « Déposer un texte » et les raccourcis référentiels (Pays, Ministères, Secteurs, Import d'amorçage) ne s'affichent pas pour vous, faute des permissions edulex:create et edulex:manage."
      },
      {
        "module": "Validation EduLex (/edulex/validation)",
        "what": "C'est votre file de travail principale. Vous y voyez les deux compteurs « Textes à traiter » et « Non vérifiés (V0) », puis la liste des textes en attente de vérification (statuts En attente / À vérifier / Importé non vérifié / Brouillon, ou niveaux V0/V1/V2) avec leur titre, code, drapeau + pays, badge de statut et badge de niveau de vérification. Cliquez « Examiner » sur un texte pour ouvrir sa fiche et y statuer. Votre permission edulex:validate vous donne le plein pouvoir de décision sur cette file, sans bandeau d'avertissement."
      },
      {
        "module": "Fiche d'un texte EduLex (/edulex/texts/[id])",
        "what": "Vous consultez le détail complet d'un texte : métadonnées, documents source PDF (badge « Officiel »), relations avec d'autres textes (Remplace, Modifie, Abroge, Lié à, Cite), historique des versions, journal de validation et traçabilité (Déposé par, Validé par, langue, version). Vous téléchargez le texte (« Télécharger (PDF) » et « Markdown ») et ouvrez « Consulter la source officielle » si une URL est renseignée. Surtout, votre permission edulex:validate active le panneau « Validation à partir de sources officielles » : vous y saisissez la « Source officielle (URL) » et un « Commentaire de validation (facultatif) », vous attribuez le niveau en cliquant l'un des boutons V0/V1/V2/V3/V4, et vous changez le statut via le sélecteur « Statut du texte » suivi du bouton « Appliquer ». Vous lisez aussi les avertissements affichés pour les textes V0 (non vérifié) ou obsolètes (Abrogé / Remplacé / Suspendu). En revanche, le téléversement de documents source (réservé à edulex:update/create/manage) et le bouton « Publier (mettre en vigueur) » (réservé à edulex:publish) ne vous sont pas accessibles."
      },
      {
        "module": "Mon profil / Mon compte (/account)",
        "what": "Consultez votre identité, vos rôles (badge « Validateur documentaire (EduLex) »), votre type de profil, votre e-mail, votre organisation et votre pays. Vous pouvez changer votre photo et votre type de profil (qui adapte la terminologie de l'interface)."
      },
      {
        "module": "Notifications (/notifications)",
        "what": "Centre de notifications in-app : vous y recevez notamment les alertes liées aux publications EduLex et aux textes à traiter. Cliquez une notification pour la marquer lue et ouvrir le lien associé ; le bouton « Tout marquer comme lu » est disponible s'il existe des notifications non lues."
      },
      {
        "module": "Paramètres (/parametres)",
        "what": "Réglez vos préférences personnelles : « Période de bilan par défaut » et activation des « Rappels des rendez-vous ». Cliquez « Enregistrer »."
      },
      {
        "module": "Récupération de mot de passe (/mot-de-passe-oublie • /reinitialiser-mot-de-passe)",
        "what": "En cas d'oubli, demandez un lien de réinitialisation par e-mail (réponse neutre, lien valable 1 heure et à usage unique), puis définissez un nouveau mot de passe (8 caractères minimum)."
      }
    ],
    "workflows": [
      {
        "title": "Traiter la file des textes à vérifier",
        "steps": [
          "Dans le menu EduLex, ouvrez la page « Validation EduLex » (/edulex/validation), ou cliquez « File de validation » depuis /edulex.",
          "Lisez les deux compteurs en tête : « Textes à traiter » et « Non vérifiés (V0) » pour mesurer la charge.",
          "Parcourez la liste : repérez pour chaque texte son titre, son code, le drapeau + pays, le badge de statut et le badge de niveau de vérification.",
          "Cliquez « Examiner » sur le texte à instruire : sa fiche détaillée s'ouvre.",
          "Traitez les textes par priorité (les V0 et « Importé non vérifié » d'abord), puis revenez à la file pour le suivant."
        ]
      },
      {
        "title": "Vérifier un texte et lui attribuer un niveau (V0 → V4)",
        "steps": [
          "Ouvrez la fiche du texte (depuis la file via « Examiner », ou depuis une carte sur /edulex).",
          "Téléchargez le texte avec « Télécharger (PDF) » ou « Markdown », et consultez les « Documents source » (repérez le badge « Officiel »).",
          "Ouvrez « Consulter la source officielle » si une URL est présente, et confrontez le contenu du texte à la source de référence.",
          "Dans le panneau « Validation à partir de sources officielles », renseignez le champ « Source officielle (URL) » sur laquelle s'appuie votre vérification.",
          "Saisissez un « Commentaire de validation » précisant ce que vous avez contrôlé (concordance des numéros, des dates, du contenu).",
          "Cliquez le bouton du niveau atteint (V1, V2, V3 ou V4) selon le degré de fiabilité établi, puis vérifiez que le « Journal de validation » a bien enregistré votre décision (nom, date, commentaire)."
        ]
      },
      {
        "title": "Faire passer un texte au niveau V3 (vérification renforcée)",
        "steps": [
          "Sur la fiche du texte, vérifiez son niveau courant via le badge de niveau (il doit déjà se trouver à un palier inférieur, par exemple V2).",
          "Consultez les « Relations avec d'autres textes » et l'« Historique des versions » pour vous assurer que le texte n'est pas déjà rendu obsolète.",
          "Dans le panneau « Validation à partir de sources officielles », renseignez l'« Source officielle (URL) » justifiant la montée en V3.",
          "Rédigez un « Commentaire de validation » détaillant le second contrôle effectué et la concordance avec la source.",
          "Cliquez le bouton de niveau « V3 », puis confirmez la prise en compte dans le « Journal de validation » (votre nom, la date et le commentaire doivent y figurer)."
        ]
      },
      {
        "title": "Mettre à jour le statut d'un texte (obsolescence, à vérifier, etc.)",
        "steps": [
          "Ouvrez la fiche du texte concerné.",
          "Dans le panneau « Validation à partir de sources officielles », déroulez le sélecteur « Statut du texte ».",
          "Choisissez le statut correspondant à la réalité réglementaire constatée (par exemple Abrogé, Modifié, Remplacé, Suspendu, À vérifier).",
          "Renseignez le « Commentaire de validation » pour tracer la raison du changement.",
          "Cliquez « Appliquer », puis vérifiez que l'avertissement d'obsolescence apparaît bien pour les textes devenus Abrogé / Remplacé / Suspendu."
        ]
      },
      {
        "title": "Rechercher un texte précis dans le référentiel",
        "steps": [
          "Ouvrez « EduLex » (/edulex).",
          "Au besoin, ajustez le filtre Pays dans la barre supérieure pour cibler la déclinaison nationale voulue.",
          "Saisissez un mot-clé (titre, code, numéro officiel, résumé ou étiquette) dans « Rechercher par mot-clé… » puis cliquez « Filtrer ».",
          "Affinez avec les listes déroulantes : « Toutes les catégories », « Tous les statuts », « Tous les types » et « Tous les niveaux » (V0 à V4).",
          "Cliquez la carte du texte pour ouvrir sa fiche, ou utilisez « Réinitialiser » pour repartir d'une recherche vierge."
        ]
      },
      {
        "title": "Suivre la charge de textes restant à vérifier",
        "steps": [
          "Ouvrez « EduLex » (/edulex) et lisez l'indicateur « À vérifier (V0 / à vérifier) » pour estimer le travail restant sur le périmètre Pays affiché.",
          "Ouvrez « Validation EduLex » (/edulex/validation) et comparez les compteurs « Textes à traiter » et « Non vérifiés (V0) ».",
          "Filtrez la liste EduLex sur le niveau « V0 » ou sur les statuts « Importé non vérifié » / « À vérifier » pour isoler les textes prioritaires.",
          "Traitez les textes via la fiche et son panneau de validation, puis revenez vérifier l'évolution des compteurs et de l'indicateur."
        ]
      }
    ],
    "tips": [
      "Appuyez toujours votre décision sur une source officielle vérifiable : renseignez le champ « Source officielle (URL) » avant de cliquer un niveau, afin de garantir la traçabilité dans le journal de validation.",
      "Rédigez des commentaires de validation explicites (ce que vous avez contrôlé, numéros et dates concordants) : ils restent visibles dans le « Journal de validation » et éclairent les relecteurs et les publicateurs en aval.",
      "Priorisez les textes V0 et « Importé non vérifié » : ce sont eux qui faussent le plus les indicateurs et qui apparaissent avec un badge « à vérifier » dans les renvois pédagogiques tant qu'ils ne sont pas certifiés.",
      "Avant de monter un texte de plusieurs niveaux, vérifiez ses « Relations avec d'autres textes » (Remplace, Modifie, Abroge) et son « Historique des versions » pour ne pas certifier un texte déjà rendu obsolète.",
      "Distinguez les deux actions du panneau : les boutons V0–V4 appliquent directement le niveau de vérification, tandis que le changement de statut passe par le sélecteur « Statut du texte » suivi du bouton « Appliquer ».",
      "Vérifiez le filtre Pays de la barre supérieure : la file et le référentiel sont restreints au périmètre affiché ; changez-le pour traiter une autre déclinaison nationale.",
      "Surveillez la page Notifications pour réagir rapidement aux nouveaux dépôts ou imports et aux textes signalés à traiter.",
      "Exploitez les badges de niveau (V0–V4) et de statut directement dans la file pour planifier votre journée sans ouvrir chaque fiche."
    ],
    "limits": [
      "Vous ne pouvez pas déposer de nouveau texte : le bouton « Déposer un texte » et la page /edulex/texts/new sont réservés à edulex:create (la page redirige vers /edulex sans cette permission).",
      "Vous ne pouvez pas importer de textes en masse : l'« Import d'amorçage » (/edulex/import) exige edulex:create ou edulex:manage.",
      "Vous ne pouvez pas publier (mettre en vigueur) un texte : le bouton « Publier (mettre en vigueur) » dépend de edulex:publish, que vous n'avez pas.",
      "Vous ne pouvez pas téléverser de documents source sur une fiche : cette action requiert edulex:update, create ou manage.",
      "Vous ne gérez pas les référentiels EduLex : ajouter, éditer ou supprimer les Pays, les Ministères & gouvernements ou les Secteurs relève de edulex:manage ; ces raccourcis ne s'affichent même pas pour vous.",
      "Vous n'avez aucun droit sur les modules Activités, Validation hiérarchique des activités, Formulaires ni Reporting institutionnel (permissions activity:*, form:*, report:* absentes).",
      "Vous ne gérez pas les utilisateurs, l'organigramme et les structures, ni les organisations (permissions user:*, organization:* absentes).",
      "Vous n'avez pas accès à EduLex Academy ni à son administration : la consultation des parcours exige academy:read et la gestion des modules et des questions exige academy:manage, permissions que vous ne détenez pas.",
      "Le Tableau de bord n'entre pas dans votre périmètre : son affichage agrège des modules (activités, rapports, Academy) qui requièrent des permissions dont vous ne disposez pas (activity:read, report:read, academy:read) ; appuyez-vous plutôt sur les indicateurs propres à EduLex et à la file de validation.",
      "Vous n'avez pas accès à l'espace d'Administration (/admin), aux Archives (/archives) ni aux journaux d'audit, réservés à admin:read et admin:manage."
    ]
  },
  {
    "roleKey": "edulex_legal_validator",
    "tagline": "Garant de la fiabilité du référentiel réglementaire EduLex : vous vérifiez, certifiez et mettez en vigueur les textes, de leur dépôt en V0 jusqu'à leur publication.",
    "intro": "En tant que Validateur juridique (EduLex), vous êtes responsable de la qualité et de la traçabilité du référentiel réglementaire international EduLex. Votre mission consiste à examiner les textes déposés, à les faire progresser dans le circuit de vérification du niveau V0 (non vérifié) jusqu'au niveau V4 (certifié) à partir des sources officielles, puis à les mettre en vigueur. Votre périmètre est strictement celui d'EduLex : vous consultez les textes, statuez sur leur niveau de vérification et leur statut, et publiez ceux qui sont certifiés, sous réserve du filtre Pays/subdivision actif dans la barre supérieure. Vous ne déposez pas de nouveaux textes, n'importez pas en masse et ne gérez pas les référentiels de pays, ministères ou secteurs : ces tâches relèvent d'autres profils.",
    "access": [
      {
        "module": "Accueil (page d'accueil publique) — /",
        "what": "Vitrine publique de la plateforme, accessible avant connexion. Vous y retrouvez la présentation des trois piliers du produit, les statistiques de fréquentation en temps réel (LiveStats) et accédez à votre espace via « Se connecter » puis le tableau de bord ou l'espace EduLex."
      },
      {
        "module": "Tableau de bord — /dashboard",
        "what": "Votre page d'accueil personnalisée (« Bonjour, <prénom> »). Grâce à votre permission edulex:read, vous y consultez les indicateurs EduLex : « Textes EduLex disponibles » et « Textes à vérifier » (statut à vérifier ou niveau V0), ainsi que le bloc « EduLex — récents » d'où vous ouvrez directement un texte (/edulex/texts/<id>) ou rejoignez le référentiel via la flèche. Vous y voyez aussi vos demandes d'absence et la carte de parrainage. Les indicateurs d'activités, de rapports et d'Academy relèvent de permissions que vous ne détenez pas et ne vous concernent pas opérationnellement."
      },
      {
        "module": "EduLex — référentiel réglementaire — /edulex",
        "what": "Cœur de votre activité. Vous consultez les 4 KPI (Textes au total, En vigueur, À vérifier, Certifiés V4), lancez une recherche plein texte (« Rechercher par mot-clé… » puis « Filtrer ») et affinez par catégorie, statut, type et niveau (V0 à V4), avec « Réinitialiser ». Grâce à edulex:validate, le bouton « File de validation » est visible et vous mène à /edulex/validation. Vous ouvrez la fiche d'un texte en cliquant sa carte (LegalTextCard). Vous ne voyez PAS le bouton « Déposer un texte » (réservé à edulex:create) ni les raccourcis « Pays », « Ministères », « Secteurs », « Import d'amorçage » (réservés à edulex:manage/create)."
      },
      {
        "module": "Fiche d'un texte EduLex — /edulex/texts/[id]",
        "what": "Votre poste de travail principal. Vous consultez toutes les métadonnées, téléchargez le texte (« Télécharger (PDF) », « Markdown »), ouvrez la source officielle externe, et parcourez les documents source, les relations entre textes, l'historique des versions et le « Journal de validation ». Grâce à edulex:validate, vous disposez du panneau « Validation à partir de sources officielles » : champ « Source officielle (URL) », « Commentaire de validation (facultatif) », boutons de niveau V0/V1/V2/V3/V4, sélecteur « Statut du texte » + « Appliquer ». Grâce à edulex:publish, le bouton « Publier (mettre en vigueur) » s'affiche quand le statut n'est pas déjà « En vigueur ». Vous lisez la traçabilité (« Déposé par », « Validé par », langue, version). Le téléversement de documents source n'est pas dans votre périmètre (il requiert edulex:update/create/manage)."
      },
      {
        "module": "Validation EduLex — /edulex/validation",
        "what": "Votre file de travail. Vous voyez les compteurs « Textes à traiter » et « Non vérifiés (V0) », parcourez la liste des textes à traiter (titre, code, drapeau + pays, badge de statut, badge de niveau de vérification) et cliquez « Examiner » pour ouvrir une fiche et statuer via le panneau de validation. Avec edulex:validate, vous statuez réellement (sans cette permission, la file serait en lecture seule)."
      },
      {
        "module": "Notifications — /notifications",
        "what": "Votre centre de notifications in-app : vous y recevez notamment les publications EduLex et les décisions. Vous cliquez une notification pour la marquer lue et ouvrir son lien, et utilisez « Tout marquer comme lu »."
      },
      {
        "module": "Rendez-vous — /rendez-vous",
        "what": "Votre agenda personnel privé : vous créez, modifiez, marquez « fait » et supprimez vos rendez-vous, avec rappels. Ces RDV alimentent votre Bilan et votre Évaluation."
      },
      {
        "module": "Bilan & synthèse — /bilan",
        "what": "Votre bilan personnel de réalisation : vous choisissez la période (Semaine / Quinzaine / Mois), lisez votre « Taux de réalisation » et les listes « Faits » / « Non faits », et exportez en PDF."
      },
      {
        "module": "Évaluation — /evaluation",
        "what": "Votre score de productivité personnel (0–100), avec tendance, évolution sur 4 semaines et « Conseils IA » que vous générez à la demande."
      },
      {
        "module": "Distinctions & rappels à l'ordre — /distinctions",
        "what": "Vos récompenses trimestrielles selon la régularité de votre reporting et le respect des seuils d'absence. Vous consultez votre propre fiche (et celle de vos éventuels subordonnés directs) et, lorsque le pays sélectionné est la Côte d'Ivoire, écoutez le message en style ivoirien."
      },
      {
        "module": "Mon profil (Mon compte) — /account",
        "what": "Votre page personnelle : nom, avatar, rôles (badges), e-mail, organisation et pays. Vous changez votre photo et votre « Type de profil » (Personnel / École / Entreprise / Association), ce qui adapte la terminologie de l'interface."
      },
      {
        "module": "Autorisations d'absence — /absences",
        "what": "Module accessible à tout utilisateur authentifié. Si un supérieur hiérarchique vous est défini, vous « Demandez une absence » (motif, dates, jours auto-calculés, note) et suivez son statut. Vous pouvez annuler votre propre demande tant qu'elle est « En attente ». L'approbation, le refus et le réglage de la politique restent réservés aux supérieurs hiérarchiques et au super administrateur."
      },
      {
        "module": "Paramètres — /parametres",
        "what": "Vos préférences personnelles : période de bilan par défaut et activation des rappels de rendez-vous, avec « Enregistrer »."
      },
      {
        "module": "Mot de passe oublié / Nouveau mot de passe — /mot-de-passe-oublie • /reinitialiser-mot-de-passe",
        "what": "Auto-dépannage de connexion : vous demandez un lien de réinitialisation par e-mail (valable 1 heure, usage unique) puis définissez un nouveau mot de passe (min. 8 caractères)."
      }
    ],
    "workflows": [
      {
        "title": "Trouver et ouvrir un texte à vérifier",
        "steps": [
          "Ouvrez le menu EduLex puis la page /edulex.",
          "Lisez le KPI « À vérifier (V0 / à vérifier) » pour mesurer la charge.",
          "Saisissez un mot-clé dans « Rechercher par mot-clé… » (titre, code, numéro officiel, résumé, étiquettes) puis cliquez « Filtrer », ou utilisez les listes « Tous les statuts » (par ex. « À vérifier », « Importé non vérifié », « En attente de validation ») et « Tous les niveaux » (par ex. V0).",
          "Au besoin, vérifiez que le filtre Pays/subdivision de la barre supérieure correspond bien au périmètre voulu ; sinon, ajustez-le.",
          "Cliquez la carte du texte (LegalTextCard) pour ouvrir sa fiche détaillée.",
          "Si vous n'avez aucun critère précis, cliquez plutôt le bouton « File de validation » pour partir de la file de travail (voir procédure dédiée)."
        ]
      },
      {
        "title": "Traiter la file de validation EduLex",
        "steps": [
          "Depuis /edulex, cliquez « File de validation » (visible car vous disposez d'edulex:validate) pour ouvrir /edulex/validation.",
          "Consultez les compteurs « Textes à traiter » et « Non vérifiés (V0) ».",
          "Parcourez la liste : repérez le badge de statut et le badge de niveau de vérification de chaque texte.",
          "Cliquez « Examiner » sur le texte choisi pour ouvrir sa fiche.",
          "Statuez via le panneau « Validation à partir de sources officielles » (voir la procédure de montée de niveau).",
          "Revenez à la file pour traiter le texte suivant ; répétez jusqu'à vider votre périmètre."
        ]
      },
      {
        "title": "Faire progresser un texte d'un niveau (par ex. V2 vers V3)",
        "steps": [
          "Ouvrez la fiche du texte (/edulex/texts/[id]).",
          "Tenez compte de l'avertissement affiché si le texte est en V0 (non vérifié) ou obsolète (Abrogé / Remplacé / Suspendu).",
          "Téléchargez et lisez le texte (« Télécharger (PDF) » ou « Markdown ») et, si l'URL est renseignée, ouvrez « Consulter la source officielle » pour comparer aux documents source.",
          "Dans le panneau « Validation à partir de sources officielles », renseignez « Source officielle (URL) » sur laquelle vous fondez votre vérification.",
          "Ajoutez un « Commentaire de validation (facultatif) » expliquant la justification de la montée de niveau (sources confrontées, écarts éventuels).",
          "Cliquez le bouton du niveau visé (V0/V1/V2/V3/V4), par exemple V3.",
          "Vérifiez que le « Journal de validation » et la traçabilité (« Validé par », version) reflètent bien votre décision."
        ]
      },
      {
        "title": "Certifier un texte au niveau V4",
        "steps": [
          "Ouvrez la fiche du texte et assurez-vous qu'il a déjà franchi les niveaux intermédiaires de manière cohérente (consultez l'« Historique des versions » et le « Journal de validation »).",
          "Confrontez le contenu aux « Documents source » (badge « Officiel ») et à la source officielle externe.",
          "Dans le panneau « Validation à partir de sources officielles », renseignez « Source officielle (URL) » et un « Commentaire de validation » attestant la conformité.",
          "Cliquez le bouton de niveau « V4 ».",
          "Contrôlez que le KPI « Certifiés V4 » de /edulex et la mention « Validé par » se sont mis à jour."
        ]
      },
      {
        "title": "Ajuster le statut d'un texte (par ex. marquer « Abrogé » ou « Remplacé »)",
        "steps": [
          "Ouvrez la fiche du texte concerné.",
          "Consultez la section « Relations avec d'autres textes » (Remplace, Modifie, Abroge, Lié à, Cite) pour confirmer le motif du changement de statut.",
          "Dans le panneau « Validation à partir de sources officielles », ouvrez le sélecteur « Statut du texte ».",
          "Choisissez le statut adéquat (En vigueur, Abrogé, Modifié, Remplacé, Suspendu, etc.).",
          "Renseignez si possible la source officielle et un commentaire, puis cliquez « Appliquer ».",
          "Vérifiez dans le « Journal de validation » que le nouveau statut est bien enregistré."
        ]
      },
      {
        "title": "Publier un texte (le mettre en vigueur)",
        "steps": [
          "Ouvrez la fiche d'un texte vérifié dont le statut n'est pas encore « En vigueur ».",
          "Assurez-vous que son niveau de vérification et sa traçabilité (« Validé par », sources) sont satisfaisants avant publication.",
          "Cliquez le bouton « Publier (mettre en vigueur) » (visible grâce à edulex:publish).",
          "Vérifiez que le statut passe à « En vigueur » et que le KPI « En vigueur » de /edulex est incrémenté.",
          "Surveillez vos /notifications : la publication EduLex y est tracée."
        ]
      },
      {
        "title": "Téléverser un document source officiel sur une fiche",
        "steps": [
          "Vous ne pouvez PAS effectuer cette tâche : le téléversement de « Documents source » sur une fiche EduLex requiert edulex:update, edulex:create ou edulex:manage, permissions que vous ne détenez pas.",
          "Si une fiche est incomplète (document source manquant ou non officiel), signalez-le au profil habilité (déposant ou gestionnaire EduLex) via le commentaire de validation, et attendez le téléversement avant de faire progresser le niveau de vérification.",
          "Vous restez en revanche libre de consulter et de télécharger les documents source déjà présents pour mener votre vérification."
        ]
      },
      {
        "title": "Suivre l'impact de vos validations depuis le tableau de bord",
        "steps": [
          "Ouvrez /dashboard.",
          "Lisez les indicateurs « Textes EduLex disponibles » et « Textes à vérifier (statut à vérifier ou niveau V0) » pour mesurer la charge restante.",
          "Dans le bloc « EduLex — récents », ouvrez un texte récent (/edulex/texts/<id>) pour reprendre un dossier, ou suivez la flèche vers /edulex.",
          "Consultez /notifications pour repérer les nouvelles publications et décisions à traiter."
        ]
      }
    ],
    "tips": [
      "Calez le filtre Pays/subdivision de la barre supérieure AVANT de travailler : il restreint le périmètre affiché dans /edulex et dans la file de validation. EduLex CI n'est qu'une déclinaison nationale du référentiel international.",
      "Fondez chaque montée de niveau sur une source officielle vérifiable : renseignez systématiquement le champ « Source officielle (URL) » et un commentaire, car ils nourrissent le « Journal de validation » et la traçabilité (« Validé par »).",
      "Avant de certifier en V4 ou de publier, relisez l'« Historique des versions », le « Journal de validation » et les « Relations avec d'autres textes » pour éviter de mettre en vigueur un texte déjà remplacé ou abrogé.",
      "Distinguez bien les deux gestes : faire progresser le niveau de vérification (V0→V4) garantit la fiabilité, tandis que « Publier » fait passer le statut à « En vigueur ». Un texte peut être certifié sans être encore publié.",
      "Servez-vous des KPI de /edulex (« À vérifier », « Certifiés V4 », « En vigueur ») et du tableau de bord comme indicateurs de votre charge et de votre avancement.",
      "Tenez compte des avertissements affichés sur la fiche pour les textes V0 ou obsolètes : ils signalent les éléments à traiter en priorité.",
      "Le commentaire de validation est facultatif techniquement, mais le renseigner systématiquement professionnalise la traçabilité et facilite les contrôles ultérieurs."
    ],
    "limits": [
      "Vous ne pouvez PAS déposer de nouveau texte : le bouton « Déposer un texte » et la page /edulex/texts/new sont réservés à edulex:create (la page redirige vers /edulex sans cette permission).",
      "Vous ne pouvez PAS importer de textes en masse : l'« Import d'amorçage » (/edulex/import) requiert edulex:create ou edulex:manage.",
      "Vous ne gérez PAS les référentiels EduLex : les raccourcis et pages « Pays » (/edulex/countries), « Ministères » (/edulex/ministries) et « Secteurs » (/edulex/sectors) en création/édition/suppression relèvent d'edulex:manage ; sans cette permission, vous n'y ajoutez ni n'y modifiez rien.",
      "Vous ne téléversez PAS de documents source sur une fiche de texte (« Documents source ») : cela demande edulex:update, edulex:create ou edulex:manage.",
      "Vous ne pouvez pas archiver ni exporter le référentiel EduLex au-delà du téléchargement d'un texte : les permissions edulex:archive, edulex:import et edulex:export ne vous sont pas attribuées.",
      "Vous n'accédez PAS à la vue Archives consolidée (/archives) : elle requiert admin:manage. Les textes obsolètes que vous statuez (Abrogé / Remplacé / Suspendu / Archivé) restent toutefois consultables depuis le référentiel EduLex via les filtres de statut.",
      "Vous n'avez aucun accès aux modules de gouvernance : Activités, Validation hiérarchique des activités, Formulaires, Rapports, Organisation & structures, Utilisateurs et Administration sortent de votre périmètre (permissions activity, form, report, organization, user, admin non détenues).",
      "Vous n'accédez PAS à EduLex Academy ni à ses sous-pages (parcours, leçons, progression, badges, classement, administration) : elles requièrent academy:read ou academy:manage.",
      "Sur les autorisations d'absence, vous pouvez seulement demander une absence pour vous-même et annuler votre propre demande tant qu'elle est « En attente » ; vous ne pouvez ni approuver, ni refuser, ni comptabiliser des absences, ni régler la politique (réservé aux supérieurs hiérarchiques et au super administrateur)."
    ]
  },
  {
    "roleKey": "academy_editor",
    "tagline": "Vous concevez, alimentez et publiez les contenus pédagogiques d'EduLex Academy pour faire vivre la formation citoyenne adossée au référentiel réglementaire.",
    "intro": "En tant qu'Éditeur EduLex Academy, vous êtes le responsable éditorial de l'espace de formation citoyenne gamifié de la plateforme. Vous administrez les questions de quiz reliées aux textes EduLex, vous en créez de nouvelles rattachées à leur leçon et à leur secteur, et vous pilotez leur diffusion (publier / dépublier / supprimer). Vous pouvez également générer les modules d'évaluation officiels à partir des textes en vigueur et vérifiés. Votre périmètre se limite strictement au module Academy : vous n'intervenez ni sur le référentiel EduLex lui-même, ni sur la gouvernance administrative (activités, organisations, utilisateurs, rapports). Vous disposez par ailleurs des pages personnelles communes à tout utilisateur connecté (profil, notifications, paramètres).",
    "access": [
      {
        "module": "EduLex Academy (/academy)",
        "what": "Vous accédez à l'espace de formation : vous consultez votre profil de progression (XP, Série, Niveau), les 5 niveaux de compétence (Découverte, Compréhension, Application, Maîtrise, Expert / Référent), les catégories et les parcours publiés du pays sélectionné. Grâce à academy:manage, vous voyez la carte « Modules d'évaluation officiels » et générez ces modules automatiquement à partir des textes en vigueur et vérifiés, via les boutons « Générer — <pays> » et « Générer pour tous les pays »."
      },
      {
        "module": "Administration Academy (/academy/admin)",
        "what": "C'est votre console de travail principale, accessible grâce à academy:manage. Vous y consultez le total de questions et le nombre de questions publiées, et parcourez le tableau des questions (Question, Leçon, Type, Statut, nombre de réponses, tentatives, code du texte EduLex lié). Vous publiez ou dépubliez chaque question (bascule Publiée / Brouillon), vous la supprimez, et vous lancez la création d'une nouvelle question via « Nouvelle question ». Les statuts possibles sont Publiée, Brouillon et Suspendue."
      },
      {
        "module": "Academy — Nouvelle question (/academy/admin/questions/new)",
        "what": "Vous créez une question de quiz : vous sélectionnez la leçon (libellé « parcours › unité › leçon »), reliez la question à son texte EduLex source et à un secteur, puis saisissez l'énoncé et les choix de réponse via le formulaire de question. Si aucune leçon n'existe encore, la page vous invite à créer au préalable un parcours, une unité et une leçon."
      },
      {
        "module": "Academy — Parcours (/academy/path/[id])",
        "what": "Vous consultez le détail d'un parcours (niveau, catégorie, description), ses unités numérotées et leurs leçons, avec les prérequis éventuels (cadenas) et le nombre de questions par leçon. Cela vous sert de repère pour savoir où rattacher vos questions. Vous pouvez ouvrir une leçon pour lancer son quiz."
      },
      {
        "module": "Academy — Leçon / Quiz (/academy/lesson/[id])",
        "what": "Vous testez le lecteur de quiz d'une leçon (questions publiées uniquement) : vous répondez aux questions (choix unique ou multiple selon le type QCM), puis lisez le feedback pédagogique (« Bonne réponse · +X XP » ou « Réponse incorrecte ») avec l'explication et le renvoi « Voir le texte → » vers la fiche EduLex source. Cela vous permet de vérifier le rendu réel de vos questions une fois publiées."
      },
      {
        "module": "Academy — Ma progression (/academy/progress)",
        "what": "Vous consultez votre tableau de bord personnel d'apprentissage : XP cumulés, niveau et avancement vers le niveau suivant, série d'apprentissage, parcours en cours, badges obtenus et « Textes à revoir »."
      },
      {
        "module": "Academy — Badges & trophées (/academy/badges)",
        "what": "Vous parcourez la galerie de tous les badges du référentiel et votre état d'obtention (« Obtenu le <date> » ou « À débloquer » verrouillé)."
      },
      {
        "module": "Academy — Classement citoyen (/academy/leaderboard)",
        "what": "Vous consultez le classement des 50 apprenants les plus assidus (rang / médaille, niveau, série, total XP) et repérez votre propre position, surlignée avec la mention « (vous) »."
      },
      {
        "module": "Mon profil (Mon compte) (/account)",
        "what": "Vous consultez votre identité, vos rôles (badges), votre type de profil, votre e-mail, votre organisation et votre pays. Vous pouvez changer votre photo d'avatar et choisir votre type de profil (Personnel, École, Entreprise, Association)."
      },
      {
        "module": "Notifications (/notifications)",
        "what": "Vous consultez vos notifications in-app (dont les défis Academy), marquez tout comme lu et ouvrez le lien associé à chaque notification."
      },
      {
        "module": "Paramètres (/parametres)",
        "what": "Vous réglez vos préférences personnelles : période de bilan affichée par défaut et activation des rappels de rendez-vous."
      }
    ],
    "workflows": [
      {
        "title": "Créer et publier une nouvelle question de quiz",
        "steps": [
          "Ouvrez la console via /academy/admin (Administration Academy).",
          "Cliquez sur « Nouvelle question » pour ouvrir le formulaire /academy/admin/questions/new.",
          "Sélectionnez la leçon de rattachement à l'aide du libellé « parcours › unité › leçon ».",
          "Reliez la question à son texte EduLex source et choisissez le secteur correspondant.",
          "Saisissez l'énoncé et les choix de réponse dans le formulaire de question, en indiquant la ou les bonnes réponses selon le type (choix unique ou multiple).",
          "Enregistrez la question : elle apparaît en statut Brouillon dans le tableau de l'Administration Academy.",
          "De retour sur /academy/admin, repérez votre question dans le tableau et cliquez « Publier » pour la rendre active dans le quiz."
        ]
      },
      {
        "title": "Vérifier le rendu d'une question publiée côté apprenant",
        "steps": [
          "Depuis /academy, ouvrez la catégorie puis le parcours concerné, ou allez directement sur la fiche du parcours (/academy/path/[id]).",
          "Repérez l'unité et la leçon où vous avez rattaché votre question (le nombre de questions est indiqué sur la leçon).",
          "Cliquez sur la leçon pour lancer le quiz (/academy/lesson/[id]).",
          "Répondez à la question puis cliquez « Valider » pour contrôler le feedback affiché (« Bonne réponse · +X XP » ou « Réponse incorrecte ») et l'explication.",
          "Vérifiez que le lien « Voir le texte → » renvoie bien vers la fiche EduLex source attendue (notez le badge « à vérifier » si la source est en V0).",
          "Si un ajustement est nécessaire, revenez sur /academy/admin pour dépublier puis corriger la question."
        ]
      },
      {
        "title": "Dépublier ou retirer une question obsolète",
        "steps": [
          "Ouvrez /academy/admin (Administration Academy).",
          "Localisez la question dans le tableau à l'aide de sa Leçon, de son Type ou du code du texte EduLex lié.",
          "Pour la masquer temporairement aux apprenants, cliquez « Dépublier » : son statut repasse en Brouillon.",
          "Pour la retirer définitivement, cliquez « Supprimer » sur la ligne concernée.",
          "Contrôlez le compteur de questions publiées en haut de page pour confirmer la prise en compte."
        ]
      },
      {
        "title": "Générer les modules d'évaluation officiels",
        "steps": [
          "Ouvrez l'espace /academy (EduLex Academy).",
          "Repérez la carte « Modules d'évaluation officiels » (visible grâce à votre permission academy:manage).",
          "Pour le pays sélectionné dans la barre supérieure, cliquez « Générer — <pays> ».",
          "Pour couvrir l'ensemble des pays, cliquez « Générer pour tous les pays ».",
          "Les modules sont créés automatiquement à partir des textes en vigueur et vérifiés ; vérifiez ensuite leur disponibilité dans les parcours."
        ]
      },
      {
        "title": "Tenir à jour son compte et suivre les notifications",
        "steps": [
          "Ouvrez /account (Mon profil) pour vérifier votre identité, vos rôles et votre pays ; mettez à jour votre photo si besoin.",
          "Sur /parametres, réglez votre période de bilan par défaut et l'activation des rappels de rendez-vous.",
          "Consultez régulièrement /notifications pour suivre les défis Academy et les autres alertes.",
          "Cliquez « Tout marquer comme lu » lorsque vous avez traité vos notifications, ou ouvrez directement le lien associé à une notification."
        ]
      }
    ],
    "tips": [
      "Reliez systématiquement chaque question à son texte EduLex source : c'est ce lien qui alimente le feedback « Voir le texte → » et garantit la valeur pédagogique du quiz.",
      "Avant de publier, testez vos questions côté apprenant via la leçon (/academy/lesson/[id]) pour valider l'énoncé, les bonnes réponses et l'explication.",
      "Surveillez les questions dont la source EduLex porte le badge « à vérifier » (V0) : privilégiez les textes en vigueur et vérifiés pour des évaluations fiables.",
      "Préférez la bascule Publier / Dépublier à la suppression pour retirer momentanément une question, afin de conserver son historique de tentatives.",
      "Suivez les compteurs de l'Administration Academy (total et questions publiées) pour mesurer la couverture de votre catalogue de quiz.",
      "Avant de créer une question, vérifiez sur la fiche du parcours que la leçon de destination existe bien ; sinon, faites d'abord créer le parcours, l'unité et la leçon.",
      "Régénérez les modules d'évaluation officiels après l'ajout de nouveaux textes certifiés, pour garder vos évaluations à jour."
    ],
    "limits": [
      "Vous n'intervenez pas sur le référentiel EduLex lui-même : déposer, valider (V0→V4), publier, archiver ou importer des textes réglementaires, ni gérer les pays, ministères et secteurs EduLex (réservé aux permissions edulex:*).",
      "Vous ne gérez pas les comptes utilisateurs : créer, importer, activer/désactiver, réinitialiser des mots de passe ou déléguer des droits relève de user:manage.",
      "Vous n'avez pas accès à l'organigramme ni à la création/modification des organisations et structures (permissions organization:*).",
      "Vous ne créez, ne saisissez ni ne validez aucune activité ou contribution, et vous n'intervenez pas dans la validation hiérarchique (permissions activity:*).",
      "Vous ne concevez pas de formulaires de saisie (form:manage) et ne générez aucun rapport institutionnel (report:*).",
      "Vous n'accédez ni à l'espace d'administration de la plateforme, ni aux journaux d'audit, ni aux archives consolidées (permissions admin:read / admin:manage).",
      "Au sein d'Academy, votre rôle est éditorial : vous gérez les questions de quiz, mais la structure des parcours, unités et leçons doit préexister pour pouvoir y rattacher vos questions."
    ]
  },
  {
    "roleKey": "academy_learner",
    "tagline": "Apprenez la réglementation éducative de façon ludique, gagnez de l'expérience (XP) et débloquez des badges au fil de vos parcours EduLex Academy.",
    "intro": "Le Citoyen apprenant est l'utilisateur de la formation citoyenne EduLex Academy. Son périmètre se limite à l'espace Academy, où il suit des parcours gamifiés adossés au référentiel réglementaire EduLex (leçons, quiz, badges). Avec la seule permission « academy:read », il consulte, apprend et progresse : il répond aux quiz, accumule de l'expérience (XP), suit sa progression et se compare aux autres apprenants. Il n'administre rien et ne crée aucun contenu pédagogique.",
    "access": [
      {
        "module": "Accueil (page d'accueil publique) (/)",
        "what": "Avant connexion, consulter la vitrine de la plateforme : découvrir les trois piliers (Gouvernance administrative, EduLex référentiel, EduLex Academy), lire « La plateforme en temps réel » (LiveStats) et le bandeau de chiffres. Cliquer « Découvrir Academy » pour rejoindre l'espace de formation, « Se connecter » ou « Créer un compte »."
      },
      {
        "module": "EduLex Academy (/academy)",
        "what": "Point d'entrée de votre formation. Consulter votre hero de progression (compteurs XP, Série, Niveau), accéder rapidement à « Ma progression », « Badges & trophées » et « Classement ». Parcourir les 5 niveaux de compétence (Découverte, Compréhension, Application, Maîtrise, Expert / Référent), filtrer les catégories de parcours et ouvrir un parcours via « Commencer ». Le titre devient « EduLex CI Academy » lorsque le pays sélectionné est la Côte d'Ivoire. Vous ne pouvez pas générer les modules d'évaluation officiels (réservé à academy:manage)."
      },
      {
        "module": "Academy — Parcours (/academy/path/[id])",
        "what": "Consulter le détail d'un parcours (niveau, catégorie, description), parcourir ses unités numérotées et leurs leçons, repérer les prérequis (cadenas le cas échéant) et le nombre de questions par leçon. Cliquer une leçon pour lancer son quiz, ou revenir à Academy via « Retour à Academy »."
      },
      {
        "module": "Academy — Leçon / Quiz (/academy/lesson/[id])",
        "what": "Suivre le quiz interactif d'une leçon : répondre aux questions (choix unique ou multiple QCM) puis « Valider », lire le feedback pédagogique (« Bonne réponse · +X XP » ou « Réponse incorrecte ») avec l'explication et le renvoi « Voir le texte → » vers la fiche EduLex source (badge « à vérifier » si la source est de niveau V0). Avancer avec « Question suivante » puis « Terminer la leçon » et consulter l'écran de fin (bonnes réponses, XP gagnés, % de parcours), avec « Retour au parcours » ou « Recommencer »."
      },
      {
        "module": "Academy — Ma progression (/academy/progress)",
        "what": "Consulter votre tableau de bord d'apprentissage : XP cumulés, « Niveau X » et barre « n/100 vers niveau X+1 », série d'apprentissage (jours). Voir « Mes parcours » avec leur pourcentage de progression (clic pour reprendre), « Textes à revoir » (recommandations de révision reliées à EduLex) et « Mes badges » avec le lien « Voir tous les badges → »."
      },
      {
        "module": "Academy — Badges & trophées (/academy/badges)",
        "what": "Parcourir la galerie de tous les badges du référentiel et votre état d'obtention (X / Y obtenus). Chaque badge montre son icône, son nom, sa description et son statut : « Obtenu le <date> » ou « À débloquer » (verrouillé, cadenas)."
      },
      {
        "module": "Academy — Classement citoyen (/academy/leaderboard)",
        "what": "Consulter le classement des 50 apprenants les plus assidus, trié par XP puis niveau (médaille pour les 3 premiers ; rang, initiales, nom, niveau, série/flamme, total XP) et repérer votre propre position, surlignée avec la mention « (vous) »."
      },
      {
        "module": "Mon profil (Mon compte) (/account)",
        "what": "Consulter votre identité, vos rôles (badges), votre type de profil, ainsi que vos informations clés (e-mail, organisation, pays). Changer votre photo (« Changer la photo ») et votre type de profil (🏠 Personnel, 🎓 École, 🏢 Entreprise, 🤝 Association)."
      },
      {
        "module": "Notifications (/notifications)",
        "what": "Consulter vos 50 dernières notifications (dont les défis Academy), les non lues étant surlignées. Cliquer une notification pour la marquer lue et ouvrir son lien associé ; « Tout marquer comme lu » si besoin."
      },
      {
        "module": "Paramètres (/parametres)",
        "what": "Régler vos préférences personnelles : période de bilan affichée par défaut et activation des rappels de rendez-vous, puis « Enregistrer »."
      }
    ],
    "workflows": [
      {
        "title": "Démarrer un parcours de formation",
        "steps": [
          "Connectez-vous, puis depuis l'Accueil cliquez « Découvrir Academy » (ou ouvrez directement /academy).",
          "Sur la page EduLex Academy, repérez la section « Catégories de parcours » et appliquez un filtre de catégorie si vous le souhaitez.",
          "Choisissez un parcours adapté à votre niveau (les 5 niveaux vont de Découverte à Expert / Référent) et cliquez « Commencer ».",
          "Sur la fiche du parcours, parcourez les unités numérotées et leurs leçons ; vérifiez l'éventuelle mention « Prérequis » (cadenas) avant de vous lancer.",
          "Cliquez la première leçon disponible (son nombre de questions est affiché) pour ouvrir son quiz."
        ]
      },
      {
        "title": "Répondre à un quiz et terminer une leçon",
        "steps": [
          "Ouvrez une leçon depuis un parcours pour lancer le lecteur de quiz (/academy/lesson/[id]).",
          "Lisez la question, sélectionnez une réponse (choix unique) ou plusieurs réponses (QCM, choix multiple) selon le type, puis cliquez « Valider ».",
          "Lisez le feedback : « Bonne réponse · +X XP » ou « Réponse incorrecte », ainsi que l'explication associée.",
          "Au besoin, cliquez « Voir le texte → » pour ouvrir la fiche EduLex source et approfondir (un badge « à vérifier » signale une source de niveau V0).",
          "Cliquez « Question suivante » pour continuer, puis « Terminer la leçon » à la dernière question.",
          "Sur l'écran de fin, consultez vos bonnes réponses, vos « XP gagnés » et votre % de parcours ; choisissez « Retour au parcours » ou « Recommencer » pour viser un meilleur score."
        ]
      },
      {
        "title": "Suivre sa progression et identifier les textes à revoir",
        "steps": [
          "Depuis /academy, cliquez l'accès rapide « Ma progression » (ou ouvrez /academy/progress).",
          "Consultez vos « XP cumulés », votre « Niveau X » et la barre « n/100 vers niveau X+1 » pour mesurer l'effort restant.",
          "Vérifiez votre « Série d'apprentissage » (jours) et veillez à la maintenir en revenant régulièrement.",
          "Dans « Mes parcours », repérez les parcours commencés et leur pourcentage, puis cliquez l'un d'eux pour le reprendre.",
          "Parcourez « Textes à revoir » et cliquez une recommandation pour ouvrir la fiche EduLex correspondante et consolider vos connaissances avant de retenter un quiz."
        ]
      },
      {
        "title": "Consulter ses badges et viser ceux à débloquer",
        "steps": [
          "Depuis /academy ou /academy/progress, ouvrez « Badges & trophées » (/academy/badges).",
          "Lisez le compteur « X / Y obtenus » en haut de la galerie pour situer votre avancement.",
          "Identifiez les badges déjà acquis (« Obtenu le <date> ») et ceux encore verrouillés (« À débloquer », cadenas).",
          "Lisez la description de chaque badge à débloquer pour comprendre la condition à remplir.",
          "Retournez à vos parcours et leçons pour réaliser les actions correspondantes (terminer une leçon, maintenir une série, etc.) et débloquer les badges visés."
        ]
      },
      {
        "title": "Se situer dans le classement citoyen",
        "steps": [
          "Depuis /academy, cliquez l'accès rapide « Classement » (ou ouvrez /academy/leaderboard).",
          "Parcourez le classement des 50 apprenants les plus assidus, trié par XP puis niveau (médaille pour les 3 premiers).",
          "Repérez votre ligne, surlignée avec la mention « (vous) », pour connaître votre rang.",
          "Comparez votre total XP et votre série à ceux des apprenants proches pour fixer votre prochain objectif.",
          "Retournez suivre des leçons afin de gagner des XP et de progresser au classement."
        ]
      },
      {
        "title": "Personnaliser son compte et gérer ses notifications",
        "steps": [
          "Ouvrez « Mon profil » (/account) pour vérifier votre identité, votre pays et votre type de profil.",
          "Cliquez « Changer la photo » pour téléverser un avatar, ou ajustez votre « Type de profil » si nécessaire.",
          "Ouvrez « Notifications » (/notifications) pour consulter les défis et nouveautés Academy ; les non lues sont surlignées.",
          "Cliquez une notification pour la marquer lue et ouvrir le contenu associé, ou utilisez « Tout marquer comme lu ».",
          "Si besoin, ouvrez « Paramètres » (/parametres) pour régler vos préférences personnelles, puis « Enregistrer »."
        ]
      }
    ],
    "tips": [
      "Revenez chaque jour, même brièvement : la « Série d'apprentissage » se compte en jours et valorise la régularité.",
      "Après une mauvaise réponse, ouvrez systématiquement « Voir le texte → » : le feedback est relié à la source EduLex officielle, c'est le meilleur moyen de comprendre durablement.",
      "Avant de retenter une leçon, passez par « Textes à revoir » dans « Ma progression » pour cibler vos points faibles.",
      "Respectez les prérequis (cadenas) des unités : ils garantissent que vous abordez les notions dans le bon ordre.",
      "N'hésitez pas à « Recommencer » une leçon : viser 100 % de bonnes réponses maximise vos XP et accélère la montée de niveau.",
      "Si vous êtes en Côte d'Ivoire, sélectionnez « CI » dans le filtre Pays de la barre supérieure pour bénéficier de l'espace « EduLex CI Academy » et des contenus nationaux.",
      "Surveillez vos notifications : les défis Academy y sont signalés et vous orientent vers de nouvelles leçons à suivre."
    ],
    "limits": [
      "Vous ne pouvez pas créer, modifier ou publier de contenu pédagogique (parcours, unités, leçons, questions) : l'administration Academy (/academy/admin) et la création de questions sont réservées à academy:manage.",
      "Vous ne pouvez pas générer les « Modules d'évaluation officiels » depuis /academy (boutons « Générer » réservés à academy:manage).",
      "Vous n'avez pas accès au référentiel EduLex en gestion : vous ne pouvez ni déposer, ni valider, ni publier de textes réglementaires (permissions edulex:* requises). Les renvois « Voir le texte → » restent en simple consultation de la fiche EduLex.",
      "Vous ne gérez aucune activité, validation, rapport, formulaire, organisation ni compte utilisateur (permissions activity, report, form, organization, user non détenues).",
      "Vous n'avez aucun accès à l'espace d'administration ni aux journaux d'audit (/admin), réservés aux profils admin.",
      "Vous ne consultez que vos propres données d'apprentissage (XP, badges, progression) ; vous ne pilotez pas la progression d'autres apprenants."
    ]
  },
  {
    "roleKey": "public_authorized",
    "tagline": "Consulter librement le référentiel réglementaire international EduLex et se former en citoyen sur EduLex Academy, en lecture seule.",
    "intro": "Le rôle « Public autorisé » est un profil de consultation citoyenne, dont le périmètre se limite à l'apprentissage (EduLex Academy) et à la lecture du référentiel réglementaire international EduLex. Vous y accédez en lecture seule : vous parcourez et recherchez les textes réglementaires, suivez les parcours de formation gamifiés, passez les quiz et consultez votre propre progression. Vous ne participez à aucun circuit de gouvernance, de validation ou d'administration de la plateforme. Vos permissions effectives sont edulex:read (référentiel EduLex) et academy:read (EduLex Academy).",
    "access": [
      {
        "module": "Accueil (page d'accueil publique) — /",
        "what": "Vous consultez la vitrine de la plateforme, avant comme après connexion : les trois piliers du produit (Gouvernance administrative, EduLex référentiel international, EduLex Academy), les statistiques de fréquentation en temps réel (LiveStats : heure, jour, semaine, mois, année) et le bandeau de chiffres (6 pays, V0–V4, 5 niveaux, RBAC). Vous pouvez cliquer « Découvrir Academy » (vers /academy), naviguer vers EduLex (/edulex) et Academy (/academy) via le menu, et ouvrir les cartes « Accéder à l'espace » vers ces deux piliers. Les liens de connexion et de création de compte restent disponibles."
      },
      {
        "module": "EduLex — référentiel réglementaire — /edulex",
        "what": "En lecture seule (edulex:read). Vous consultez les 4 indicateurs clés (« Textes au total », « En vigueur », « À vérifier (V0 / à vérifier) », « Certifiés V4 »), effectuez une recherche plein texte (titre, code, numéro officiel, résumé, étiquettes) via le champ « Rechercher par mot-clé… » puis le bouton « Filtrer », et affinez par listes déroulantes : « Toutes les catégories », « Tous les statuts » (En vigueur, Abrogé, Modifié, Document de référence, Remplacé, Suspendu, En attente de validation, À vérifier, Archivé, Brouillon, Importé non vérifié), « Tous les types » (Constitution, Loi, Ordonnance, Décret, Arrêté, Circulaire, Convention internationale, Traité…) et « Tous les niveaux » (V0 à V4) ; le lien « Réinitialiser » remet les filtres à zéro. Vous cliquez sur une carte de texte pour ouvrir sa fiche détaillée. Le filtre Pays de la barre supérieure restreint le périmètre affiché. Les boutons « Déposer un texte », « File de validation » et les raccourcis de gestion des référentiels (Pays, Ministères, Secteurs, Import d'amorçage) ne vous sont PAS proposés."
      },
      {
        "module": "Fiche d'un texte EduLex — /edulex/texts/[id]",
        "what": "En lecture seule (edulex:read). Vous consultez le détail complet d'un texte réglementaire : ses métadonnées, son niveau de vérification (V0 à V4), son résumé analytique, ses « Relations avec d'autres textes » (Remplace, Modifie, Abroge, Lié à, Cite), son « Historique des versions », son « Journal de validation » et sa traçabilité (« Déposé par », « Validé par », langue, version). Vous téléchargez le texte via « Télécharger (PDF) » et « Markdown », consultez les « Documents source » (badge « Officiel ») et ouvrez « Consulter la source officielle » lorsque l'URL externe est renseignée. Vous voyez les avertissements affichés pour un texte V0 (non vérifié) ou obsolète (Abrogé / Remplacé / Suspendu). Vous ne pouvez ni téléverser de document source, ni valider, ni publier, ni modifier le texte : le panneau de validation V0→V4 et le bouton « Publier » ne vous sont pas accessibles."
      },
      {
        "module": "EduLex Academy — /academy",
        "what": "En lecture (academy:read). Vous accédez à l'espace de formation citoyenne gamifié : le hero avec vos compteurs « XP », « Série » et « Niveau », les accès rapides « Ma progression », « Badges & trophées » et « Classement », les 5 niveaux de compétence (Découverte, Compréhension, Application, Maîtrise, Expert / Référent), et les catégories de parcours publiés pour le pays sélectionné. Vous filtrez les catégories et lancez un parcours via « Commencer ». Le titre devient « EduLex CI Academy » lorsque le pays sélectionné est la Côte d'Ivoire. La carte « Modules d'évaluation officiels » et ses boutons « Générer » ne vous sont PAS proposés (réservés à academy:manage)."
      },
      {
        "module": "Academy — Parcours — /academy/path/[id]",
        "what": "En lecture (academy:read). Vous consultez le détail d'un parcours (niveau, catégorie, description), ses unités numérotées et leurs leçons, avec la mention « Prérequis » (cadenas) lorsque l'accès est conditionné. Vous cliquez sur une leçon (le nombre de questions est affiché) pour lancer son quiz."
      },
      {
        "module": "Academy — Leçon / Quiz — /academy/lesson/[id]",
        "what": "En lecture et participation (academy:read). Vous répondez aux questions du quiz (choix unique ou choix multiple selon le type QCM) puis « Valider », lisez le feedback pédagogique (« Bonne réponse · +X XP » ou « Réponse incorrecte ») avec l'explication et le renvoi « Voir le texte → » vers la fiche EduLex source (badge « à vérifier » si la source est en V0). Vous naviguez avec « Question suivante » puis « Terminer la leçon ». L'écran de fin affiche vos bonnes réponses, vos « XP gagnés » et le pourcentage de parcours, avec « Retour au parcours » et « Recommencer »."
      },
      {
        "module": "Academy — Ma progression — /academy/progress",
        "what": "En lecture (academy:read). Vous consultez votre tableau de bord d'apprentissage personnel : « XP cumulés », votre « Niveau X » avec la barre « n/100 vers niveau X+1 », votre « Série d'apprentissage » (en jours), « Mes parcours » avec pourcentage et barre de progression (clic vers le parcours), « Textes à revoir » (clic vers la fiche EduLex) et « Mes badges » avec le lien « Voir tous les badges → »."
      },
      {
        "module": "Academy — Badges & trophées — /academy/badges",
        "what": "En lecture (academy:read). Vous consultez la galerie de tous les badges du référentiel (icône, nom, description) et votre état d'obtention (X / Y obtenus) : « Obtenu le <date> » ou « À débloquer » (badge verrouillé avec cadenas)."
      },
      {
        "module": "Academy — Classement citoyen — /academy/leaderboard",
        "what": "En lecture (academy:read). Vous consultez le classement des 50 apprenants les plus assidus (rang ou médaille pour les 3 premiers, initiales, nom, niveau, série / flamme, total XP) et repérez votre propre position : votre ligne est surlignée avec la mention « (vous) »."
      },
      {
        "module": "Mon profil (Mon compte) — /account",
        "what": "Accessible à tout compte. Vous consultez votre identité (nom, avatar ou initiales) et vos rôles (badges), changez votre photo via « Changer la photo », choisissez votre « Type de profil » (🏠 Personnel, 🎓 École, 🏢 Entreprise, 🤝 Association) et consultez vos informations clés : e-mail, organisation, pays (drapeau + nom). Note : le type de profil adapte surtout la terminologie des modules de gouvernance, auxquels votre rôle n'a pas accès ; son effet sur votre périmètre de consultation reste donc limité."
      },
      {
        "module": "Notifications — /notifications",
        "what": "Accessible à tout compte. Vous consultez vos 50 dernières notifications in-app (les non lues étant surlignées), notamment les publications EduLex et les défis Academy. Vous cliquez « Tout marquer comme lu » et cliquez une notification pour la marquer lue et ouvrir son lien associé."
      },
      {
        "module": "Paramètres — /parametres",
        "what": "Accessible à tout compte. Vous réglez vos préférences personnelles : la « Période de bilan par défaut » et l'activation des « Rappels des rendez-vous », puis « Enregistrer ». Ces réglages concernent des modules de pilotage (Bilan, Rendez-vous) auxquels votre rôle n'a pas accès ; ils restent donc sans effet pratique pour vous tant que ces fonctions ne vous sont pas ouvertes."
      }
    ],
    "workflows": [
      {
        "title": "Rechercher et lire un texte réglementaire dans EduLex",
        "steps": [
          "Dans le menu, ouvrez « EduLex » (/edulex).",
          "Si besoin, sélectionnez le pays voulu dans le filtre Pays de la barre supérieure pour restreindre le périmètre affiché.",
          "Saisissez un mot-clé (titre, code, numéro officiel, résumé ou étiquette) dans le champ « Rechercher par mot-clé… » puis cliquez « Filtrer ».",
          "Affinez si nécessaire avec les listes déroulantes « Toutes les catégories », « Tous les statuts », « Tous les types » et « Tous les niveaux » (V0 à V4) ; utilisez « Réinitialiser » pour repartir de zéro.",
          "Cliquez sur la carte du texte recherché pour ouvrir sa fiche détaillée.",
          "Lisez le résumé analytique, les métadonnées, les relations avec d'autres textes et le journal de validation ; téléchargez le document via « Télécharger (PDF) » ou « Markdown », ou ouvrez « Consulter la source officielle »."
        ]
      },
      {
        "title": "Vérifier la fiabilité d'un texte avant de s'y fier",
        "steps": [
          "Ouvrez la fiche du texte concerné depuis /edulex.",
          "Repérez le badge de niveau de vérification : un texte « Certifié V4 » est pleinement vérifié, tandis qu'un texte V0 (non vérifié) affiche un avertissement.",
          "Vérifiez le statut affiché (En vigueur, Abrogé, Modifié, Remplacé, Suspendu…) : un statut obsolète déclenche un avertissement à l'écran.",
          "Consultez « Relations avec d'autres textes » pour savoir si le texte est remplacé, modifié ou abrogé par un autre.",
          "Au besoin, ouvrez « Consulter la source officielle » pour confronter la fiche au document d'origine."
        ]
      },
      {
        "title": "Démarrer un parcours de formation sur EduLex Academy",
        "steps": [
          "Ouvrez « Academy » (/academy) — le titre devient « EduLex CI Academy » si le pays sélectionné est la Côte d'Ivoire.",
          "Repérez votre niveau de compétence cible parmi les 5 niveaux (Découverte, Compréhension, Application, Maîtrise, Expert / Référent).",
          "Filtrez les « Catégories de parcours » pour cibler un domaine, puis cliquez « Commencer » sur le parcours choisi.",
          "Sur la page du parcours, parcourez les unités numérotées et leurs leçons (une unité verrouillée affiche un « Prérequis » à compléter d'abord).",
          "Cliquez sur une leçon (le nombre de questions est indiqué) pour lancer son quiz."
        ]
      },
      {
        "title": "Répondre à un quiz et apprendre de ses réponses",
        "steps": [
          "Lancez une leçon depuis le parcours (/academy/lesson/[id]).",
          "Lisez chaque question, sélectionnez la ou les bonnes réponses selon le type (choix unique ou multiple), puis cliquez « Valider ».",
          "Lisez le feedback affiché : « Bonne réponse · +X XP » ou « Réponse incorrecte », ainsi que l'explication pédagogique.",
          "Cliquez « Voir le texte → » pour ouvrir la fiche EduLex source et approfondir (un badge « à vérifier » signale une source encore en V0).",
          "Passez à la suite avec « Question suivante », puis « Terminer la leçon » à la dernière question.",
          "Sur l'écran de fin, consultez vos bonnes réponses, vos « XP gagnés » et le pourcentage de parcours ; choisissez « Retour au parcours » ou « Recommencer »."
        ]
      },
      {
        "title": "Suivre sa progression, ses badges et son classement",
        "steps": [
          "Depuis Academy, ouvrez « Ma progression » (/academy/progress).",
          "Consultez vos « XP cumulés », votre « Niveau X » et la barre « n/100 vers niveau X+1 », ainsi que votre « Série d'apprentissage ».",
          "Dans « Mes parcours », cliquez un parcours en cours pour le reprendre ; dans « Textes à revoir », cliquez une recommandation pour rouvrir la fiche EduLex associée.",
          "Ouvrez « Badges & trophées » (/academy/badges) pour voir vos badges obtenus et ceux « À débloquer ».",
          "Ouvrez « Classement citoyen » (/academy/leaderboard) et repérez votre position : votre ligne est surlignée avec « (vous) »."
        ]
      },
      {
        "title": "Rester informé et personnaliser son compte",
        "steps": [
          "Consultez régulièrement « Notifications » (/notifications) pour suivre les publications EduLex et les défis Academy ; utilisez « Tout marquer comme lu » au besoin, et cliquez une notification pour ouvrir son lien.",
          "Ouvrez « Mon compte » (/account) et cliquez « Changer la photo » pour téléverser un avatar si vous le souhaitez.",
          "Choisissez votre « Type de profil » (Personnel, École, Entreprise ou Association) ; gardez à l'esprit qu'il influe surtout sur la terminologie de modules auxquels votre rôle n'a pas accès.",
          "Vérifiez vos informations clés (e-mail, organisation, pays) affichées sur la fiche."
        ]
      }
    ],
    "tips": [
      "Activez le filtre Pays de la barre supérieure avant de chercher dans EduLex : il restreint d'emblée le périmètre des textes affichés et évite le bruit.",
      "Privilégiez les textes « Certifiés V4 » et au statut « En vigueur » comme références fiables ; traitez les textes V0 (non vérifié) ou obsolètes (Abrogé, Remplacé, Suspendu) avec prudence.",
      "Dans un quiz, exploitez systématiquement le lien « Voir le texte → » : il relie chaque réponse à sa source réglementaire et ancre l'apprentissage.",
      "Maintenez votre « Série d'apprentissage » en pratiquant un peu chaque jour ; suivez les « Textes à revoir » de « Ma progression » pour cibler vos points faibles.",
      "Respectez l'ordre des unités : une leçon verrouillée par un « Prérequis » se débloque en complétant d'abord l'unité requise.",
      "Combinez recherche plein texte et filtres (type, statut, niveau) pour retrouver rapidement un texte précis dans un grand référentiel."
    ],
    "limits": [
      "Vous ne pouvez pas déposer de texte réglementaire (« Déposer un texte » réservé à edulex:create), ni l'importer en masse (/edulex/import, réservé à edulex:create / edulex:manage).",
      "Vous ne pouvez pas faire progresser un texte dans le circuit de vérification V0 → V4, ni le publier, ni modifier son statut (réservé à edulex:validate / edulex:publish) ; la « File de validation » EduLex ne vous est pas ouverte pour statuer.",
      "Vous ne pouvez pas téléverser de documents source sur une fiche de texte, ni gérer les référentiels EduLex (Pays, Ministères, Secteurs — réservés à edulex:manage).",
      "Vous ne pouvez pas administrer EduLex Academy : ni créer ou publier des questions de quiz, ni générer les modules d'évaluation officiels (/academy/admin, réservé à academy:manage).",
      "Vous n'avez aucun accès aux modules de gouvernance : Activités, Validation hiérarchique, Formulaires, Rapports, Organisation & structures, Utilisateurs, Autorisations d'absence (aucune permission activity, form, report, organization ou user).",
      "Vous n'accédez pas aux espaces personnels de pilotage liés à la gouvernance (Tableau de bord agrégé, Rendez-vous, Bilan & synthèse, Évaluation, Distinctions) ni à l'espace d'administration / audit (admin:read). Les réglages « Période de bilan » et « Rappels des rendez-vous » des Paramètres restent donc sans effet pratique pour vous.",
      "Votre périmètre se limite à la consultation : vous ne validez, ne créez ni ne gérez aucune donnée de la plateforme, en dehors de votre propre profil et de vos préférences personnelles."
    ]
  }
];
