// AUTO-GÉNÉRÉ — contenu du support de formation (syllabus, modules, glossaire, évaluation).
// Rédigé par l'atelier multi-agents « formation-curriculum ». Ne pas éditer à la main.
import type { FormationContent } from "./formation-data";

export const FORMATION: FormationContent = {
  "syllabus": {
    "intitule": "EduWeb Governance — Maîtriser la plateforme de gouvernance éducative : référentiel EduLex, pilotage administratif et formation citoyenne Academy",
    "presentation": "Ce support de formation académique outille les utilisateurs de la plateforme EduWeb Governance, déployée pour l'État de Côte d'Ivoire, autour de ses trois piliers : la gouvernance administrative (organigramme, activités, circuit de validation, rapports), le référentiel réglementaire EduLex (cycle de vérification V0→V4, mise en vigueur, référentiels pays/ministères/secteurs) et l'EduLex Academy (formation citoyenne gamifiée). Organisé en onze modules (M1 à M11) et décliné en parcours différenciés pour chacun des vingt rôles, il s'appuie sur les écrans, libellés et workflows réels du produit. L'objectif est de rendre chaque apprenant autonome et fiable sur son périmètre de permissions, dans le strict respect du modèle RBAC de la plateforme.",
    "publicCible": "Agents et cadres de l'administration éducative ivoirienne, responsables national/régional/local, directeurs et sous-directeurs, administrateurs institutionnels et super administrateur système, équipes du référentiel EduLex (déposants, validateurs documentaires et juridiques, administrateurs pays/ministère), éditeurs et apprenants de l'EduLex Academy, contrôleurs/auditeurs, lecteurs et public autorisé. Chaque profil suit le parcours correspondant à son rôle et à son périmètre de permissions.",
    "prerequis": "Aucun prérequis technique. Savoir utiliser un navigateur web et disposer d'un compte actif sur la plateforme (identifiants fournis par l'administrateur institutionnel). La maîtrise du français écrit est requise, l'interface étant intégralement en français. Pour les modules de validation et d'administration, une connaissance préalable de l'organisation administrative de rattachement et de la hiérarchie est recommandée.",
    "dureeTotale": "Tronc commun obligatoire (M1) : 1 h 30. Parcours complet pour le périmètre le plus large (Super Administrateur, ensemble des modules M1 à M11) : environ 16 heures. La durée effective dépend du parcours par rôle, de 1 h 30 (rôles de simple consultation) à 16 h (administration système).",
    "objectifsGeneraux": [
      "Se connecter, naviguer dans la barre latérale en accordéon, utiliser le filtre Pays/subdivision, gérer son profil (/account) et comprendre la déconnexion automatique par inactivité (M1)",
      "Piloter son activité au moyen du tableau de bord (KPI, graphiques), des rendez-vous, du bilan exportable en PDF, de l'évaluation avec Conseils IA et des distinctions trimestrielles (M2)",
      "Lire et faire évoluer l'organigramme (ministères techniques et structures) : rattachement, logo, déplacement par glisser-déposer ou au clic, création d'organisation, en distinguant les prérogatives exclusives du super administrateur (M3)",
      "Administrer les comptes, rôles, supérieurs hiérarchiques, délégations de droits, import CSV, activation/désactivation et réinitialisation de mot de passe selon le modèle RBAC (M4)",
      "Concevoir des formulaires, en gérer le cycle de vie, puis créer, documenter (pièces jointes, liens EduLex) et soumettre des activités (M5)",
      "Statuer dans le circuit de validation hiérarchique : Valider, Demander correction, Rejeter, Consolider, en respectant les niveaux attendus (M6)",
      "Gérer les absences : politique (congé annuel, seuil), demande par l'agent, validation par le supérieur, comptabilité par motif, ratios et alertes de seuil (M7)",
      "Générer des rapports et bilans institutionnels par périodicité et périmètre, à partir des activités validées/consolidées (M8)",
      "Maîtriser le référentiel EduLex : dépôt, types, circuit de vérification V0→V4, mise en vigueur, import, confidentialité et référentiels pays/ministères/secteurs (M9)",
      "Concevoir et suivre la formation EduLex Academy : parcours, leçons, quiz, badges, classement et progression (M10)",
      "Comprendre l'administration et la sécurité : hiérarchie de validation, sécurité des sessions (déconnexion automatique réglée par le super administrateur) et journaux d'audit (M11)"
    ],
    "modalitesPedagogiques": [
      "Exposés magistraux appuyés sur des captures et libellés réels de la plateforme (vrais écrans, vrais boutons)",
      "Démonstrations guidées pas à pas reprenant les workflows documentés des guides utilisateurs par rôle",
      "Travaux pratiques sur environnement de formation, segmentés par périmètre de permissions (chaque apprenant n'exécute que les actions autorisées par son rôle)",
      "Études de cas contextualisées (gouvernance éducative en Côte d'Ivoire) : circuit de validation hiérarchique, cycle V0→V4 d'un texte EduLex, génération d'un rapport institutionnel",
      "Parcours différenciés par rôle avec auto-apprentissage encadré et fiches mémo (accès, workflows, conseils, limites)",
      "Apprentissage par la pratique gamifiée via l'EduLex Academy (XP, badges, classement) pour la culture réglementaire"
    ],
    "modalitesEvaluation": [
      "Quiz de positionnement en début de parcours pour situer le niveau et adapter le rythme",
      "Quiz de fin de module (QCM) reprenant les notions clés et les libellés réels de l'interface",
      "Travaux pratiques évalués sur l'exécution correcte d'un workflow propre au rôle (ex. soumettre une activité, statuer une validation, déposer puis faire progresser un texte EduLex, générer un rapport)",
      "Évaluation continue via l'EduLex Academy : score de progression, badges obtenus et niveaux de compétence (Découverte, Compréhension, Application, Maîtrise, Expert/Référent)",
      "Évaluation finale par mise en situation sur le périmètre du rôle, avec grille de conformité au modèle RBAC (respect des permissions et des limites)",
      "Attestation de réussite délivrée à l'atteinte du seuil requis au quiz final et à la validation du travail pratique de fin de parcours"
    ],
    "parcoursParRole": [
      {
        "roleKey": "super_admin",
        "roleName": "Super Administrateur EduWeb",
        "objectif": "Maîtriser la totalité du système : configurer le socle de gouvernance, administrer organisations, comptes, formulaires, validation et rapports, piloter EduLex et l'Academy, et exercer les prérogatives exclusives (suppression en cascade de structures/organisations, réglage de la déconnexion automatique par inactivité) ainsi que les journaux d'audit.",
        "modules": [
          "M1",
          "M2",
          "M3",
          "M4",
          "M5",
          "M6",
          "M7",
          "M8",
          "M9",
          "M10",
          "M11"
        ],
        "dureeEstimee": "16 h"
      },
      {
        "roleKey": "institution_admin",
        "roleName": "Administrateur institutionnel",
        "objectif": "Administrer son organisation : gérer les comptes, rôles et délégations, concevoir les formulaires, valider les activités, gérer les absences et produire les rapports institutionnels, sans les prérogatives système réservées au super administrateur.",
        "modules": [
          "M1",
          "M2",
          "M3",
          "M4",
          "M5",
          "M6",
          "M7",
          "M8",
          "M11"
        ],
        "dureeEstimee": "12 h"
      },
      {
        "roleKey": "national_manager",
        "roleName": "Responsable national",
        "objectif": "Superviser la gouvernance au niveau national : suivre les KPI consolidés, valider les contributions remontant dans son circuit, gérer les absences de ses subordonnés et produire les rapports institutionnels de son périmètre.",
        "modules": [
          "M1",
          "M2",
          "M3",
          "M5",
          "M6",
          "M7",
          "M8"
        ],
        "dureeEstimee": "9 h"
      },
      {
        "roleKey": "regional_manager",
        "roleName": "Responsable régional",
        "objectif": "Piloter la gouvernance à l'échelle régionale : exploiter le filtre subdivision/région, valider les activités de son ressort, gérer les absences de ses agents et générer les rapports régionaux.",
        "modules": [
          "M1",
          "M2",
          "M3",
          "M5",
          "M6",
          "M7",
          "M8"
        ],
        "dureeEstimee": "8 h 30"
      },
      {
        "roleKey": "local_manager",
        "roleName": "Responsable local / chef de service",
        "objectif": "Encadrer un service local : suivre l'activité de l'équipe, valider et demander correction des contributions, traiter les demandes d'absence et restituer les bilans de service.",
        "modules": [
          "M1",
          "M2",
          "M5",
          "M6",
          "M7",
          "M8"
        ],
        "dureeEstimee": "8 h"
      },
      {
        "roleKey": "director_general",
        "roleName": "Directeur Général",
        "objectif": "Piloter, valider et restituer : superviser les structures placées sous son autorité, statuer dans son circuit de validation, consolider l'information dans des rapports institutionnels et s'appuyer sur EduLex et l'Academy en consultation.",
        "modules": [
          "M1",
          "M2",
          "M3",
          "M6",
          "M7",
          "M8"
        ],
        "dureeEstimee": "8 h"
      },
      {
        "roleKey": "director",
        "roleName": "Directeur",
        "objectif": "Diriger une direction : suivre les KPI, valider les activités remontant à son niveau, gérer les absences de ses subordonnés et produire les rapports de la direction.",
        "modules": [
          "M1",
          "M2",
          "M5",
          "M6",
          "M7",
          "M8"
        ],
        "dureeEstimee": "7 h 30"
      },
      {
        "roleKey": "deputy_director",
        "roleName": "Sous-Directeur",
        "objectif": "Seconder le directeur dans le pilotage et la validation : statuer sur les activités de son périmètre, suivre les absences de l'équipe et contribuer à la production des rapports.",
        "modules": [
          "M1",
          "M2",
          "M5",
          "M6",
          "M7"
        ],
        "dureeEstimee": "6 h 30"
      },
      {
        "roleKey": "agent",
        "roleName": "Agent / contributeur",
        "objectif": "Saisir, documenter (pièces jointes, liens EduLex) et soumettre ses activités au circuit de validation, demander ses absences, et exploiter ses outils personnels de productivité (rendez-vous, bilan, évaluation).",
        "modules": [
          "M1",
          "M2",
          "M5",
          "M6",
          "M7",
          "M10"
        ],
        "dureeEstimee": "6 h"
      },
      {
        "roleKey": "auditor",
        "roleName": "Contrôleur / auditeur",
        "objectif": "Observer, vérifier et tracer en lecture seule : consulter activités, rapports, référentiel EduLex et espace d'administration (admin:read), sans aucun pouvoir de création, modification ou validation, pour attester de la régularité des processus.",
        "modules": [
          "M1",
          "M2",
          "M6",
          "M8",
          "M9",
          "M11"
        ],
        "dureeEstimee": "5 h"
      },
      {
        "roleKey": "reader",
        "roleName": "Lecteur simple",
        "objectif": "Consulter la gouvernance éducative (activités, rapports, EduLex, Academy) sans créer, modifier ni valider, tout en conservant l'usage de ses espaces personnels et le suivi des parcours Academy.",
        "modules": [
          "M1",
          "M2",
          "M8",
          "M9",
          "M10"
        ],
        "dureeEstimee": "3 h 30"
      },
      {
        "roleKey": "edulex_super_admin",
        "roleName": "Super Administrateur EduLex",
        "objectif": "Maîtriser l'intégralité du cycle de vie d'un texte EduLex (dépôt V0 → certification V4 → mise en vigueur, import d'amorçage) et administrer les référentiels structurants (pays/juridictions, ministères/gouvernements, secteurs), en restant strictement cantonné au domaine EduLex.",
        "modules": [
          "M1",
          "M9",
          "M11"
        ],
        "dureeEstimee": "5 h 30"
      },
      {
        "roleKey": "edulex_country_admin",
        "roleName": "Administrateur pays (EduLex)",
        "objectif": "Piloter le référentiel EduLex de son pays : déposer, vérifier (V0→V4), fixer le statut et publier les textes, et tenir à jour les référentiels pays, ministères et secteurs de son périmètre national.",
        "modules": [
          "M1",
          "M9",
          "M11"
        ],
        "dureeEstimee": "5 h"
      },
      {
        "roleKey": "edulex_ministry_admin",
        "roleName": "Administrateur ministère (EduLex)",
        "objectif": "Gérer le référentiel EduLex à l'échelle de son ministère : déposer et faire progresser les textes dans le circuit de vérification, gérer leur statut et administrer les référentiels rattachés à son ministère.",
        "modules": [
          "M1",
          "M9"
        ],
        "dureeEstimee": "4 h 30"
      },
      {
        "roleKey": "edulex_depositor",
        "roleName": "Service technique déposant (EduLex)",
        "objectif": "Déposer correctement les textes réglementaires en V0 (titre, type, dates, confidentialité, résumé, URL source), joindre les documents source officiels et préparer les dossiers pour le circuit de validation, sans statuer sur les niveaux de vérification.",
        "modules": [
          "M1",
          "M9"
        ],
        "dureeEstimee": "3 h 30"
      },
      {
        "roleKey": "edulex_doc_validator",
        "roleName": "Validateur documentaire (EduLex)",
        "objectif": "Contrôler la complétude et la conformité documentaire des textes déposés (sources, documents officiels, métadonnées) et faire progresser leur niveau de vérification dans le volet documentaire du circuit V0→V4.",
        "modules": [
          "M1",
          "M9"
        ],
        "dureeEstimee": "4 h"
      },
      {
        "roleKey": "edulex_legal_validator",
        "roleName": "Validateur juridique (EduLex)",
        "objectif": "Assurer la vérification juridique des textes : valider les niveaux supérieurs du circuit V0→V4 à partir de sources officielles, qualifier le statut juridique (en vigueur, abrogé, remplacé, suspendu) et préparer la certification finale.",
        "modules": [
          "M1",
          "M9"
        ],
        "dureeEstimee": "4 h"
      },
      {
        "roleKey": "academy_editor",
        "roleName": "Éditeur Academy",
        "objectif": "Concevoir et publier les contenus pédagogiques d'EduLex Academy : créer et gérer les questions de quiz reliées aux textes EduLex, piloter leur diffusion (publier/dépublier/supprimer) et générer les modules d'évaluation officiels, en restant cantonné au module Academy.",
        "modules": [
          "M1",
          "M10"
        ],
        "dureeEstimee": "4 h"
      },
      {
        "roleKey": "academy_learner",
        "roleName": "Citoyen apprenant",
        "objectif": "Suivre les parcours gamifiés d'EduLex Academy adossés au référentiel : répondre aux quiz, accumuler de l'XP, débloquer des badges, suivre sa progression et se situer dans le classement citoyen.",
        "modules": [
          "M1",
          "M10"
        ],
        "dureeEstimee": "2 h 30"
      },
      {
        "roleKey": "public_authorized",
        "roleName": "Public autorisé",
        "objectif": "Consulter librement le référentiel réglementaire international EduLex (recherche, fiches de textes, téléchargement) et se former en citoyen sur EduLex Academy, en lecture seule, sans participer à aucun circuit de gouvernance ou d'administration.",
        "modules": [
          "M1",
          "M9",
          "M10"
        ],
        "dureeEstimee": "2 h 30"
      }
    ]
  },
  "modules": [
    {
      "code": "M1",
      "titre": "Prise en main et navigation",
      "objectifs": [
        "Se connecter à la plateforme depuis l'écran « Connexion » en saisissant correctement son adresse e-mail et son mot de passe, et identifier les messages d'erreur usuels.",
        "Mettre en oeuvre l'auto-dépannage de mot de passe : déclencher l'envoi d'un lien de réinitialisation puis définir un nouveau mot de passe conforme.",
        "Naviguer dans la barre latérale en accordéon (catégories Pilotage, Gouvernance, Référentiel réglementaire, Système) et la rabattre/déployer pour adapter son espace de travail.",
        "Cadrer le périmètre géographique des modules au moyen du filtre Pays / subdivision de la barre supérieure.",
        "Consulter et personnaliser son profil dans /account (photo, type de profil, rôles, e-mail, organisation, pays).",
        "Reconnaître et gérer la déconnexion automatique par inactivité (avertissement, choix « Rester connecté », reconnexion)."
      ],
      "publicCible": "Tous les utilisateurs de la plateforme EduWeb Governance, quel que soit leur rôle ou pilier d'usage (gouvernance administrative, référentiel EduLex, EduLex Academy) : du super administrateur à l'agent, en passant par les responsables, validateurs, éditeurs, apprenants et lecteurs. Aucun prérequis ; ce module constitue le socle commun avant tout module métier.",
      "contenu": [
        {
          "theme": "L'écran de connexion",
          "points": [
            "Page « Connexion » en deux volets : à gauche le formulaire (titre « Bienvenue 👋 », sous-titre « Connectez-vous pour accéder à votre espace de gouvernance. ») ; à droite un volet illustratif présentant les trois ambitions de la plateforme (Gouvernance sécurisée, EduLex international, EduLex Academy).",
            "Deux champs : « Adresse e-mail » (format vous@institution.gouv) et « Mot de passe », suivis du bouton « Se connecter ».",
            "Lien « Mot de passe oublié ? » sous le champ mot de passe ; en bas, « Pas encore de compte ? Créer un compte ».",
            "En cas d'échec, le bandeau rouge « Identifiants incorrects. » s'affiche ; une coupure réseau affiche « Erreur réseau. Réessayez. ».",
            "Comptes de démonstration intégrés (Super Admin, Agent, Validateur EduLex), pré-remplis en un clic, avec le mot de passe password123 — utiles en formation, à proscrire en production.",
            "Après connexion réussie, redirection automatique vers le « Tableau de bord » (/dashboard). Un utilisateur déjà connecté qui revient sur /login est aussi redirigé vers le tableau de bord."
          ]
        },
        {
          "theme": "Mot de passe oublié et réinitialisation",
          "points": [
            "Page « Mot de passe oublié » : un champ « Adresse e-mail » et le bouton « Envoyer le lien ».",
            "Par sécurité, le message de confirmation reste neutre : « Si un compte existe pour <e-mail>, un lien de réinitialisation vient d'être envoyé. » (vérifier la boîte de réception et le dossier spam).",
            "Le lien reçu est valable 1 heure et à usage unique ; au-delà, il devient invalide et il faut « Refaire une demande ».",
            "Page « Nouveau mot de passe » : champs « Nouveau mot de passe » (min. 8 caractères) et « Confirmer le mot de passe », bouton « Réinitialiser le mot de passe ».",
            "Contrôles de saisie : refus si moins de 8 caractères (« Mot de passe d'au moins 8 caractères requis. ») ou si les deux champs diffèrent (« Les deux mots de passe ne correspondent pas. »).",
            "Une fois le mot de passe mis à jour, un message de succès invite à se connecter via le bouton « Se connecter ».",
            "Lien « ← Retour à la connexion » présent à chaque étape."
          ]
        },
        {
          "theme": "La barre latérale en accordéon",
          "points": [
            "Barre latérale verte (visible sur écran large) regroupant la navigation par catégories repliables ; sur mobile, elle s'ouvre via le bouton « menu » (hamburger) en tiroir latéral.",
            "Accordéon à ouverture unique : déployer une catégorie referme automatiquement les autres ; la catégorie contenant la page courante est ouverte par défaut.",
            "Quatre catégories : « Pilotage » (Accueil, Tableau de bord, Rendez-vous, Bilan, Évaluation, Distinctions), « Gouvernance » (Organisation, Utilisateurs, Formulaires, Activités, Validation, Absences, Rapports), « Référentiel réglementaire » (EduLex — badge « International » —, EduLex Academy), « Système » (Guide d'utilisation, Notifications, Paramètres, Archives, Administration).",
            "Bouton en tête de barre pour « Rabattre » / « Déployer la barre latérale » : en mode réduit (rail), seules les icônes restent visibles, avec une info-bulle au survol.",
            "Le choix rabattu/déployé est mémorisé sur le poste (il persiste d'une session à l'autre dans le navigateur).",
            "Le contenu affiché dépend des permissions du rôle : une rubrique inaccessible n'apparaît pas ou renvoie un message de droits insuffisants."
          ]
        },
        {
          "theme": "Le filtre Pays / subdivision",
          "points": [
            "Situé dans la barre supérieure (à côté des notifications et du menu utilisateur), il cadre l'ensemble des modules sur un périmètre géographique (Tableau de bord, Organisation, Activités, Validation, EduLex, Academy…).",
            "Sélecteur de pays : option « Tous les pays » (icône 🌍) ou un pays précis, avec champ de recherche « Rechercher un pays… » et drapeaux ; intitulé « Filtre pays · EduLex ».",
            "Sélecteur de subdivision : n'apparaît que si un pays précis disposant de subdivisions est sélectionné ; options « Toutes les subdivisions » ou une subdivision donnée, avec recherche « Rechercher une subdivision… ».",
            "Changer de pays réinitialise automatiquement la subdivision (« Toutes subdivisions »), car une subdivision dépend de son pays.",
            "Les choix sont conservés (cookies de préférence) et s'appliquent tant qu'ils ne sont pas modifiés ; un bandeau « Organigramme filtré » confirme le cadrage dans /organization.",
            "Bon réflexe : régler le filtre avant de gérer l'organigramme, les utilisateurs ou de produire un rapport, afin d'éviter toute erreur de portée."
          ]
        },
        {
          "theme": "Mon profil (/account)",
          "points": [
            "Accessible via le menu utilisateur (en haut à droite) → « Mon profil », ou directement à l'adresse /account.",
            "Affiche votre identité (nom complet, photo ou initiales), vos rôles sous forme de badges, et trois informations clés : « E-mail », « Organisation », « Pays » (avec drapeau).",
            "Bouton « Changer la photo » pour téléverser un avatar (formats image).",
            "Carte « Type de profil » : quatre choix — Personnel 🏠, École 🎓, Entreprise 🏢, Association 🤝 — qui adaptent la terminologie du module Activités et la période de bilan par défaut ; le profil actif est rappelé.",
            "Le profil est en consultation pour l'essentiel : la modification des rôles, rattachements ou la réinitialisation par un tiers relève de l'administration des utilisateurs, pas de cette page."
          ]
        },
        {
          "theme": "Menu utilisateur et déconnexion automatique",
          "points": [
            "Le menu utilisateur (avatar + nom + rôle, en haut à droite) propose « Mon profil », « Paramètres » et « Se déconnecter ».",
            "Déconnexion manuelle : « Se déconnecter » ferme la session et renvoie vers l'écran de connexion.",
            "Déconnexion automatique par inactivité : si elle est activée, la session se ferme après une période sans action souris ni clavier ; un avertissement « Déconnexion imminente » s'affiche avec un compte à rebours.",
            "Dans cet avertissement, deux choix : « Rester connecté » (prolonge la session) ou « Se déconnecter » (immédiat). Toute action (souris, clavier, défilement) avant la fin du compte à rebours réarme aussi le délai.",
            "À l'expiration, l'utilisateur est redirigé vers l'écran de connexion avec le bandeau « Votre session a été fermée pour cause d'inactivité. Reconnectez-vous. ».",
            "Ce réglage (activation et délai de 1 à 1440 minutes) est défini globalement par le super administrateur dans /admin et s'applique à toutes les sessions, particulièrement utile sur les postes partagés."
          ]
        }
      ],
      "procedures": [
        {
          "titre": "Se connecter à la plateforme",
          "etapes": [
            "Ouvrez l'adresse de la plateforme : l'écran « Connexion » (« Bienvenue 👋 ») s'affiche.",
            "Saisissez votre « Adresse e-mail » dans le premier champ.",
            "Saisissez votre « Mot de passe » dans le second champ.",
            "Cliquez sur « Se connecter ».",
            "En cas de succès, vous arrivez sur le « Tableau de bord ». Si le bandeau « Identifiants incorrects. » apparaît, vérifiez l'e-mail et le mot de passe, puis réessayez."
          ]
        },
        {
          "titre": "Réinitialiser un mot de passe oublié",
          "etapes": [
            "Sur l'écran de connexion, cliquez sur « Mot de passe oublié ? ».",
            "Sur la page « Mot de passe oublié », saisissez votre « Adresse e-mail », puis cliquez « Envoyer le lien ».",
            "Lisez le message de confirmation, puis ouvrez votre messagerie (pensez au dossier spam) et cliquez le lien reçu dans l'heure.",
            "Sur la page « Nouveau mot de passe », saisissez un « Nouveau mot de passe » d'au moins 8 caractères, puis répétez-le dans « Confirmer le mot de passe ».",
            "Cliquez « Réinitialiser le mot de passe ».",
            "Au message de succès, cliquez « Se connecter » et identifiez-vous avec le nouveau mot de passe. (Si le lien est expiré, utilisez « Refaire une demande ».)"
          ]
        },
        {
          "titre": "Déployer ou rabattre la barre latérale et ouvrir une rubrique",
          "etapes": [
            "Repérez la barre latérale verte à gauche de l'écran (sur mobile, ouvrez-la avec le bouton « menu »).",
            "Cliquez sur l'en-tête d'une catégorie, par exemple « Gouvernance », pour la déployer ; les autres catégories se referment.",
            "Cliquez sur l'élément voulu, par exemple « Activités », pour ouvrir la page correspondante.",
            "Pour gagner de la place, cliquez le bouton « Rabattre la barre latérale » : seules les icônes restent visibles ; survolez une icône pour voir son libellé.",
            "Cliquez « Déployer la barre latérale » pour revenir à l'affichage complet. Votre choix est mémorisé pour vos prochaines visites."
          ]
        },
        {
          "titre": "Cadrer un pays et une subdivision avec le filtre géographique",
          "etapes": [
            "Dans la barre supérieure, cliquez sur le sélecteur de pays (affichant « Tous les pays » ou le pays courant).",
            "Au besoin, tapez dans « Rechercher un pays… », puis cliquez le pays voulu (ou « Tous les pays » pour tout afficher).",
            "Si le pays possède des subdivisions, cliquez sur le sélecteur de subdivision apparu à droite.",
            "Choisissez « Toutes les subdivisions » ou une subdivision précise (vous pouvez la rechercher).",
            "Vérifiez que les modules (Tableau de bord, Organisation, etc.) reflètent bien le périmètre choisi. Note : changer de pays réinitialise la subdivision."
          ]
        },
        {
          "titre": "Consulter son profil et changer son type de profil",
          "etapes": [
            "Cliquez sur votre avatar (en haut à droite) puis sur « Mon profil » (ou ouvrez /account).",
            "Vérifiez votre identité, vos rôles (badges) et les informations « E-mail », « Organisation », « Pays ».",
            "Pour changer d'avatar, cliquez « Changer la photo » et sélectionnez une image.",
            "Dans la carte « Type de profil », cliquez l'un des quatre choix : Personnel, École, Entreprise ou Association.",
            "Constatez l'adaptation de l'interface (terminologie du module Activités, période de bilan par défaut)."
          ]
        },
        {
          "titre": "Gérer la déconnexion automatique par inactivité",
          "etapes": [
            "Pendant l'utilisation, si la fenêtre « Déconnexion imminente » apparaît avec un compte à rebours, c'est que vous êtes resté inactif.",
            "Pour poursuivre votre travail, cliquez « Rester connecté » (ou faites simplement une action souris/clavier) : la session est prolongée.",
            "Pour fermer immédiatement votre session, cliquez « Se déconnecter ».",
            "Si la session a déjà expiré, vous êtes redirigé vers l'écran de connexion avec le message d'inactivité : reconnectez-vous normalement.",
            "Pour une déconnexion volontaire à tout moment, ouvrez le menu utilisateur et cliquez « Se déconnecter »."
          ]
        }
      ],
      "exercices": [
        "Connexion guidée : à partir de l'écran de connexion, utilisez le compte de démonstration « Agent » (clic sur le bouton pré-rempli, mot de passe password123), connectez-vous, vérifiez l'arrivée sur le Tableau de bord, puis déconnectez-vous via le menu utilisateur.",
        "Auto-dépannage de mot de passe : déclenchez « Mot de passe oublié ? » avec une adresse, observez le message de confirmation neutre, puis sur la page de réinitialisation testez volontairement deux mots de passe différents et un mot de passe de moins de 8 caractères pour constater les messages d'erreur attendus.",
        "Navigation et cadrage : déployez successivement les catégories « Pilotage » puis « Référentiel réglementaire » (vérifiez que l'ouverture de l'une referme l'autre), rabattez la barre latérale puis redéployez-la, et enfin sélectionnez un pays précis dans le filtre puis une subdivision ; vérifiez que les modules reflètent ce périmètre.",
        "Profil personnel : ouvrez /account, relevez vos rôles, votre organisation et votre pays, changez votre type de profil de « Personnel » à « École », puis revenez au choix initial en observant l'effet sur l'interface."
      ],
      "autoEvaluation": [
        {
          "question": "Quel message s'affiche si vous saisissez un mauvais e-mail ou mot de passe sur l'écran de connexion ?",
          "reponse": "Un bandeau rouge « Identifiants incorrects. » apparaît sous le titre du formulaire."
        },
        {
          "question": "Combien de temps un lien de réinitialisation de mot de passe reste-t-il valable, et combien de fois peut-on l'utiliser ?",
          "reponse": "Il est valable 1 heure et à usage unique ; passé ce délai ou après utilisation, il faut « Refaire une demande »."
        },
        {
          "question": "Quelle est la longueur minimale exigée pour un nouveau mot de passe ?",
          "reponse": "Au moins 8 caractères ; le formulaire refuse aussi la validation si les deux champs (« Nouveau mot de passe » et « Confirmer ») ne correspondent pas."
        },
        {
          "question": "Que se passe-t-il pour les autres catégories de la barre latérale lorsque vous en déployez une ?",
          "reponse": "L'accordéon est à ouverture unique : déployer une catégorie referme automatiquement toutes les autres."
        },
        {
          "question": "Citez les quatre catégories de la barre latérale.",
          "reponse": "Pilotage, Gouvernance, Référentiel réglementaire et Système."
        },
        {
          "question": "Quand le sélecteur de subdivision apparaît-il, et que se passe-t-il si vous changez de pays ?",
          "reponse": "Il n'apparaît que lorsqu'un pays précis ayant des subdivisions est sélectionné ; changer de pays réinitialise la subdivision sur « Toutes les subdivisions »."
        },
        {
          "question": "Quels sont les quatre types de profil disponibles dans /account et à quoi servent-ils ?",
          "reponse": "Personnel, École, Entreprise et Association ; ils adaptent la terminologie du module Activités et la période de bilan par défaut."
        },
        {
          "question": "Lorsque la fenêtre « Déconnexion imminente » s'affiche, quelles sont vos deux options et comment éviter la déconnexion ?",
          "reponse": "« Rester connecté » (prolonge la session) ou « Se déconnecter » (immédiat) ; toute action souris/clavier avant la fin du compte à rebours réarme aussi le délai."
        },
        {
          "question": "Quel message voyez-vous sur l'écran de connexion après une déconnexion automatique pour inactivité ?",
          "reponse": "« Votre session a été fermée pour cause d'inactivité. Reconnectez-vous. »"
        },
        {
          "question": "Qui peut activer et régler le délai de la déconnexion automatique par inactivité, et dans quelles bornes ?",
          "reponse": "Uniquement le super administrateur, depuis l'espace Administration (/admin), avec un délai compris entre 1 et 1440 minutes (préréglages 5/10/15/30/60/120)."
        }
      ]
    },
    {
      "code": "M2",
      "titre": "M2 — Pilotage de l'activité",
      "objectifs": [
        "Interpréter le Tableau de bord (/dashboard) : lire les huit KPI, le graphique « Évolution des activités » et le donut « Répartition par statut » pour situer l'avancement de son périmètre.",
        "Gérer son agenda personnel dans Rendez-vous (/rendez-vous) : créer, modifier, supprimer un RDV, régler un rappel et cocher « fait » / « non fait ».",
        "Produire et exporter son Bilan personnel (/bilan) : choisir la période, lire le « Taux de réalisation » et générer le PDF du bilan.",
        "Lire son score de productivité dans Évaluation (/evaluation), interpréter sa tendance et son évolution sur 4 semaines, puis générer des « Conseils IA ».",
        "Comprendre et appliquer les règles d'attribution des Distinctions trimestrielles (/distinctions) : régularité du reporting et seuils d'absence.",
        "Distinguer la portée personnelle (Bilan, Évaluation, agenda) de la portée managériale (Distinctions des subordonnés, KPI de périmètre)."
      ],
      "publicCible": "Tous les rôles de gouvernance administrative : responsables (national, régional, local), Directeur Général, Directeur, Sous-Directeur, agents/contributeurs, contrôleurs/auditeurs, lecteurs, ainsi que les administrateurs institutionnels et le super administrateur. Les modules Tableau de bord, Rendez-vous, Bilan, Évaluation et Distinctions sont accessibles à tout utilisateur authentifié ; la dimension d'encadrement (suivi des subordonnés dans /distinctions) concerne les rôles disposant de subordonnés directs.",
      "contenu": [
        {
          "theme": "Le Tableau de bord (/dashboard) : vue d'ensemble du périmètre",
          "points": [
            "Le tableau de bord ouvre sur un bandeau d'accueil personnalisé (« Bonjour, <prénom> ») et un sous-titre « Vue d'ensemble · <pays> » qui rappelle le périmètre actif (pays sélectionné ou « tous les pays »).",
            "Le filtre Pays / subdivision de la barre supérieure recadre l'ensemble des chiffres : KPI, graphiques et feeds sont recalculés sur le périmètre choisi.",
            "Première rangée de KPI : « Activités saisies », « Activités validées », « En attente de validation » (info-bulle « Soumises, en examen ou à corriger ») et « Rapports générés ».",
            "Seconde rangée de KPI : « Textes EduLex disponibles », « Textes à vérifier » (statut « à vérifier » ou niveau V0), « Parcours Academy publiés » et « Taux de validation » (part des activités validées sur l'ensemble).",
            "Graphique « Évolution des activités » : courbes des saisies et des validations sur les 6 derniers mois (sous-titre « Saisies et validations sur les 6 derniers mois »).",
            "Donut « Répartition par statut » : ventilation des activités par état du workflow ; affiche « Aucune activité pour ce périmètre » s'il n'y a pas de données.",
            "Feeds complémentaires : « Activités récentes » (avec lien « Tout voir » vers /activities) et « EduLex — récents » (textes récemment mis à jour, avec niveau de vérification).",
            "Encarts contextuels : carte de parrainage et bloc « Mes demandes d'absence » (qui affiche aussi le compteur « X à valider » pour un supérieur hiérarchique). Le bouton « Nouvelle activité » est présent mais la saisie relève du module Activités (couvert ailleurs)."
          ]
        },
        {
          "theme": "Rendez-vous (/rendez-vous) : l'agenda personnel et privé",
          "points": [
            "L'agenda est strictement personnel : chaque utilisateur ne voit et ne gère que ses propres rendez-vous, rattachés à son seul compte connecté.",
            "Un rendez-vous comporte cinq champs : « Titre » (obligatoire), « Date et heure » (obligatoire), « Lieu », « Rappel » et « Notes ».",
            "Le champ « Rappel » propose quatre choix : « Aucun rappel », « 5 min avant », « 1 h avant » et « 1 jour avant ». Le rappel par défaut est « 1 h avant » si les rappels sont activés, sinon « Aucun rappel ».",
            "Chaque RDV peut être coché « fait » / « non fait », modifié ou supprimé. Les rendez-vous se répartissent en deux sections : « À venir » et « Passés & faits ».",
            "Un RDV « honoré » (coché fait) alimente directement le Bilan et l'Évaluation : c'est le lien entre l'agenda et le pilotage de la productivité.",
            "Le réglage global d'activation des rappels se fait dans Paramètres (/parametres), via « Rappels des rendez-vous »."
          ]
        },
        {
          "theme": "Bilan & synthèse (/bilan) : la réalisation par période",
          "points": [
            "Le bilan mesure VOTRE réalisation personnelle : il combine les rendez-vous honorés et les activités validées sur la période choisie.",
            "Trois périodes sont disponibles via les onglets : « Semaine » (7 derniers jours), « Quinzaine » (15 derniers jours) et « Mois » (30 derniers jours).",
            "La période affichée par défaut dépend du « Type de profil » (préférence /parametres : Personnel et École → Semaine ; Entreprise et Association → Mois), ou de la préférence personnelle réglée dans Paramètres.",
            "Le « Taux de réalisation » est le pourcentage d'éléments réalisés (RDV honorés + activités validées) sur le total des éléments de la période, accompagné de la mention « X / Y réalisé(s) ».",
            "Deux cartes synthétisent le détail : « Rendez-vous honorés » et « Activités validées » (chacune au format réalisés / total).",
            "Deux listes complètent la vue : « Faits » et « Non faits », chaque ligne portant l'intitulé, le type (« Rendez-vous » ou « Activité ») et la date/heure.",
            "Sont comptées comme activités « faites » celles aux statuts « Validé » (VALIDATED) ou « Consolidé » (CONSOLIDATED).",
            "Le bouton « Exporter en PDF » génère un document (en-tête « Bilan d'activité — EduWeb Governance », nom, période, date de génération, taux de réalisation avec barre, et listes « Réalisés » / « Non réalisés »)."
          ]
        },
        {
          "theme": "Évaluation (/evaluation) : score de productivité et Conseils IA",
          "points": [
            "L'évaluation affiche un score de productivité personnel de 0 à 100, calculé sur les rendez-vous honorés et les activités validées de la semaine courante (7 derniers jours).",
            "Le score porte un libellé selon son niveau : ≥ 75 « Excellente productivité », ≥ 50 « Bonne productivité », ≥ 30 « Productivité moyenne », sinon « Productivité à améliorer ».",
            "La tendance est exprimée en points par rapport à la semaine précédente : « +X pts », « -X pts » ou « Stable vs semaine précédente ».",
            "Le graphique « Évolution sur 4 semaines » présente le score de chacune des quatre dernières semaines sous forme de barres.",
            "Le détail de la semaine courante distingue « RDV honorés (7 j) » et « Activités validées (7 j) », chacun au format réalisés / total.",
            "Les « Conseils IA » sont générés à la demande via « Obtenir mes conseils » (puis « Régénérer ») : 2 à 3 recommandations concrètes, ciblées sur le secteur le plus faible (rendez-vous ou activités).",
            "Les conseils nécessitent l'activation côté serveur. À défaut, le message « Les conseils IA ne sont pas encore activés sur ce serveur » s'affiche ; sans données, l'invitation est « Ajoutez des rendez-vous et des activités pour obtenir des conseils personnalisés »."
          ]
        },
        {
          "theme": "Distinctions & rappels à l'ordre (/distinctions) : la reconnaissance trimestrielle",
          "points": [
            "Les distinctions sont des récompenses virtuelles attribuées par trimestre (T1 à T4) et cumulées sur l'année ; un sélecteur d'année permet de naviguer entre les exercices.",
            "Chaque utilisateur voit sa propre fiche ; un supérieur hiérarchique voit également la fiche de ses subordonnés directs (le super administrateur voit l'ensemble des agents actifs).",
            "Trois critères conditionnent une « Belle performance » sur le trimestre : régularité du reporting (score du trimestre ≥ 50 %), affaires personnelles (< 20 % du congé annuel) et raison médicale (< 40 % du congé annuel).",
            "Les trois critères doivent être simultanément remplis pour décrocher la « Distinction de belle performance » (emblème/bouclier) ; sinon le trimestre est marqué « Performance à redresser » (émoji).",
            "Chaque trimestre affiche son état : « en cours », « à venir » ou « terminé ». Le détail du trimestre courant explicite chaque critère (Reporting : X % (faits/total), Affaires personnelles : X j (X %), Raison médicale : X j (X %)).",
            "Le cumul annuel est rappelé par un compteur « X distinction(s) » sur la fiche de chaque agent.",
            "Lorsque le pays sélectionné est la Côte d'Ivoire, un message d'encouragement ou de rappel à l'ordre en style ivoirien (nouchi) s'affiche, avec lecture audio possible (bouton d'écoute).",
            "Les seuils d'absence se mesurent par rapport au quota de congé annuel défini par la politique d'absences ; le cumul est calculé depuis le 1er janvier jusqu'à la fin du trimestre."
          ]
        },
        {
          "theme": "Articulation des modules de pilotage",
          "points": [
            "Une chaîne unique relie les modules : un RDV honoré ou une activité validée nourrit à la fois le Bilan, l'Évaluation et la composante reporting des Distinctions.",
            "Portée personnelle : Rendez-vous, Bilan et Évaluation mesurent uniquement VOTRE productivité ; ils ne consolident pas le score d'autres agents.",
            "Portée managériale : seul le module Distinctions ouvre la vue sur les subordonnés directs ; les KPI du Tableau de bord, eux, agrègent l'activité de tout le périmètre (pays / subdivision).",
            "Bonne hygiène de pilotage : cocher ses RDV « fait » et faire valider/consolider ses activités est indispensable pour que les indicateurs reflètent fidèlement le travail réalisé."
          ]
        }
      ],
      "procedures": [
        {
          "titre": "Lire son périmètre depuis le Tableau de bord",
          "etapes": [
            "Ouvrez « Tableau de bord » (/dashboard).",
            "Au besoin, ajustez le filtre Pays / subdivision dans la barre supérieure pour cadrer le périmètre ; le sous-titre « Vue d'ensemble · <pays> » confirme la sélection.",
            "Lisez les KPI : « Activités saisies », « Activités validées », « En attente de validation », « Rapports générés », puis la seconde rangée (« Textes EduLex disponibles », « Textes à vérifier », « Parcours Academy publiés », « Taux de validation »).",
            "Analysez le graphique « Évolution des activités » (saisies vs validations sur 6 mois) et le donut « Répartition par statut ».",
            "Cliquez « Tout voir » dans « Activités récentes » pour basculer vers /activities si une activité demande votre attention."
          ]
        },
        {
          "titre": "Créer un rendez-vous avec rappel",
          "etapes": [
            "Ouvrez « Rendez-vous » (/rendez-vous).",
            "Dans la carte « Nouveau rendez-vous », cliquez « Ajouter ».",
            "Renseignez le « Titre » (ex. « Réunion de coordination ») et la « Date et heure » (champs obligatoires).",
            "Complétez éventuellement le « Lieu » (ex. « Salle A / Visio ») et les « Notes ».",
            "Choisissez un « Rappel » : « Aucun rappel », « 5 min avant », « 1 h avant » ou « 1 jour avant ».",
            "Cliquez « Ajouter le rendez-vous » : il apparaît dans la section « À venir »."
          ]
        },
        {
          "titre": "Marquer un rendez-vous comme honoré",
          "etapes": [
            "Ouvrez « Rendez-vous » (/rendez-vous).",
            "Repérez le rendez-vous dans la section « À venir » ou « Passés & faits ».",
            "Cliquez la case à cocher à gauche du titre pour le marquer « fait » (le titre est barré et le RDV bascule éventuellement dans « Passés & faits »).",
            "Pour corriger une saisie, utilisez l'icône « Modifier » (crayon) ou « Supprimer » (corbeille).",
            "Vérifiez ensuite dans /bilan que ce RDV honoré est bien compté dans « Rendez-vous honorés »."
          ]
        },
        {
          "titre": "Produire et exporter son bilan en PDF",
          "etapes": [
            "Ouvrez « Bilan & synthèse » (/bilan).",
            "Choisissez la période via les onglets « Semaine », « Quinzaine » ou « Mois ».",
            "Lisez le « Taux de réalisation » (avec la mention « X / Y réalisé(s) ») et les cartes « Rendez-vous honorés » et « Activités validées ».",
            "Parcourez les listes « Faits » et « Non faits » pour repérer les éléments en retard.",
            "Cliquez « Exporter en PDF » : le navigateur télécharge le fichier (nommé bilan-<période>.pdf) pour archivage ou diffusion."
          ]
        },
        {
          "titre": "Consulter son score et générer des Conseils IA",
          "etapes": [
            "Ouvrez « Évaluation » (/evaluation).",
            "Lisez le score /100, son libellé (ex. « Bonne productivité ») et la tendance vs semaine précédente.",
            "Examinez le graphique « Évolution sur 4 semaines » et le détail « RDV honorés (7 j) » / « Activités validées (7 j) ».",
            "Dans la carte « Conseils IA », cliquez « Obtenir mes conseils ».",
            "Lisez les 2 à 3 conseils ciblés ; cliquez « Régénérer » pour en obtenir d'autres. Si le message « Les conseils IA ne sont pas encore activés sur ce serveur » apparaît, signalez-le à l'administrateur."
          ]
        },
        {
          "titre": "Vérifier ses distinctions trimestrielles (et celles de ses subordonnés)",
          "etapes": [
            "Ouvrez « Distinctions & rappels à l'ordre » (/distinctions).",
            "Sélectionnez l'année voulue dans le sélecteur d'années.",
            "Sur votre fiche (marquée « (moi) »), lisez le cumul « X distinction(s) » et l'état des quatre trimestres (T1 à T4 : belle performance, à redresser, en cours ou à venir).",
            "Ouvrez le détail du trimestre courant et vérifiez les trois critères : Reporting (≥ 50 %), Affaires personnelles (< 20 %), Raison médicale (< 40 %).",
            "Si vous encadrez des agents, parcourez leurs fiches pour repérer les franchissements de seuils ou les baisses de régularité.",
            "Pour le pays Côte d'Ivoire, lisez (ou écoutez via le bouton d'écoute) le message d'encouragement ou de rappel à l'ordre."
          ]
        },
        {
          "titre": "Régler ses préférences de pilotage",
          "etapes": [
            "Ouvrez « Paramètres » (/parametres).",
            "Choisissez la « Période de bilan par défaut » (« Profil par défaut », « Semaine », « Quinzaine » ou « Mois »).",
            "Activez ou désactivez les « Rappels des rendez-vous ».",
            "Cliquez « Enregistrer ».",
            "Rouvrez /bilan pour vérifier que la période affichée par défaut correspond à votre choix."
          ]
        }
      ],
      "exercices": [
        "Tableau de bord : sélectionnez votre pays dans le filtre supérieur, relevez les valeurs de « En attente de validation » et de « Taux de validation », puis expliquez en deux phrases ce que révèle le donut « Répartition par statut » sur l'état d'avancement de votre périmètre.",
        "Rendez-vous : créez un rendez-vous « Réunion de coordination » daté de demain, avec lieu « Salle A », rappel « 1 h avant » et une note ; marquez-le ensuite « fait », puis vérifiez dans /bilan (période Semaine) qu'il est comptabilisé dans « Rendez-vous honorés ».",
        "Bilan : positionnez-vous successivement sur « Semaine » puis « Mois », notez la variation du « Taux de réalisation », exportez le bilan de la période « Mois » en PDF et identifiez dans le document les sections « Réalisés » et « Non réalisés ».",
        "Évaluation & Distinctions : relevez votre score /100 et sa tendance, générez vos « Conseils IA », puis ouvrez /distinctions et déterminez, critère par critère (reporting ≥ 50 %, personnel < 20 %, médical < 40 %), si votre trimestre courant ouvre droit à une « Distinction de belle performance »."
      ],
      "autoEvaluation": [
        {
          "question": "Quels sont les deux éléments qui alimentent le Taux de réalisation du Bilan et le score d'Évaluation ?",
          "reponse": "Les rendez-vous honorés (cochés « fait ») et les activités validées (statuts « Validé » ou « Consolidé »)."
        },
        {
          "question": "Quelles sont les trois périodes proposées dans le Bilan, et à combien de jours correspondent-elles ?",
          "reponse": "« Semaine » (7 derniers jours), « Quinzaine » (15 derniers jours) et « Mois » (30 derniers jours)."
        },
        {
          "question": "Quelles options de rappel sont proposées lors de la création d'un rendez-vous ?",
          "reponse": "« Aucun rappel », « 5 min avant », « 1 h avant » et « 1 jour avant » (le défaut étant « 1 h avant » si les rappels sont activés)."
        },
        {
          "question": "À partir de quel score l'évaluation affiche-t-elle le libellé « Bonne productivité », et lequel correspond à un score d'au moins 75 ?",
          "reponse": "« Bonne productivité » à partir de 50/100 ; « Excellente productivité » à partir de 75/100."
        },
        {
          "question": "Quels sont les trois critères d'attribution d'une « Belle performance » trimestrielle dans les Distinctions ?",
          "reponse": "Régularité du reporting (score du trimestre ≥ 50 %), affaires personnelles (< 20 % du congé annuel) et raison médicale (< 40 % du congé annuel) — les trois devant être réunis simultanément."
        },
        {
          "question": "L'agenda Rendez-vous est-il partagé entre utilisateurs ou consultable par un supérieur ?",
          "reponse": "Non : l'agenda est strictement personnel et privé, rattaché au seul compte connecté ; aucun autre utilisateur ne peut le consulter."
        },
        {
          "question": "Que se passe-t-il si l'on clique « Obtenir mes conseils » alors que les Conseils IA ne sont pas configurés sur le serveur ?",
          "reponse": "Un message indique « Les conseils IA ne sont pas encore activés sur ce serveur » ; aucun conseil n'est généré."
        },
        {
          "question": "Dans le module Distinctions, quelles fiches un supérieur hiérarchique peut-il consulter en plus de la sienne ?",
          "reponse": "Celles de ses subordonnés directs (et, pour le super administrateur, l'ensemble des agents actifs)."
        },
        {
          "question": "Sur combien de mois et de semaines portent respectivement le graphique du Tableau de bord et celui de l'Évaluation ?",
          "reponse": "Le Tableau de bord affiche l'évolution des activités sur les 6 derniers mois ; l'Évaluation affiche l'évolution du score sur 4 semaines."
        },
        {
          "question": "Quel bouton permet d'archiver son bilan, et sous quel format le fichier est-il produit ?",
          "reponse": "Le bouton « Exporter en PDF » du module Bilan, qui produit un fichier PDF (nommé bilan-<période>.pdf)."
        }
      ]
    },
    {
      "code": "M3",
      "titre": "Organisation & organigramme",
      "objectifs": [
        "Identifier les deux familles d'apex de l'organigramme EduWeb — « Par ministère technique » et « Organisations clientes » — et lire correctement les badges de contexte (↳ sous, 🏛 ministère, organisation).",
        "Créer une organisation cliente via /organization/new en exploitant la liste recherchable des ministères du gouvernement ivoirien actuel ou la « — Saisie libre — ».",
        "Créer une structure et la rattacher à l'organigramme en renseignant tous ses champs (type, organisation, structure parente, ministère de rattachement, pays, subdivision, responsable).",
        "Déplacer une structure dans l'organigramme par les deux gestes pris en charge : le glisser-déposer et le déplacement « au clic » via la poignée GripVertical puis « Déposer ici ».",
        "Ajouter le logo d'une organisation cliente et reconnaître son affichage dans l'apex de la carte.",
        "Distinguer les prérogatives du super administrateur — suppression d'une structure et suppression en cascade d'une organisation — des droits de gestion ordinaires (organization:manage)."
      ],
      "publicCible": "Super Administrateur EduWeb (super_admin) et Administrateur institutionnel (institution_admin) pour la gestion complète de l'organigramme ; Directeur Général (director_general) en lecture pour comprendre la structure affichée. La création/édition/déplacement exige la permission organization:manage ; la suppression de structures et d'organisations est strictement réservée au super_admin.",
      "contenu": [
        {
          "theme": "L'écran « Organisation & structures » (/organization)",
          "points": [
            "La page porte le titre « Organisation & structures » et le sous-titre « Organigramme hiérarchique : ministères techniques et organisations clientes ».",
            "Deux actions sont proposées dans l'en-tête, mais uniquement aux titulaires d'organization:manage : « + Structure » (bouton secondaire, vers /organization/structures/new) et « + Organisation » (bouton principal, vers /organization/new).",
            "L'organigramme se lit en deux sections : « Par ministère technique » (chaque ministère est un apex regroupant ses structures rattachées) puis « Organisations clientes » (chaque organisation est un apex pour ses structures non rattachées à un ministère).",
            "Chaque structure affiche son nom, son type, le responsable, éventuellement la région (📍), un compteur de membres et une ligne de contexte : « ↳ sous <parent> », « 🏛 <ministère> » ou le nom de l'organisation.",
            "Quand un filtre Pays / subdivision est actif (barre supérieure), un bandeau « Organigramme filtré : » apparaît avec le drapeau et le nom du pays, et la mention « Ajustez via le filtre pays / subdivision (barre supérieure). »",
            "S'il n'existe ni ministère peuplé ni organisation, un état vide « Aucune organisation — Créez une première organisation cliente. » s'affiche."
          ]
        },
        {
          "theme": "Créer une organisation cliente",
          "points": [
            "Accès par « + Organisation » qui ouvre /organization/new, page « Nouvelle organisation » avec le lien de retour « Retour à l'organisation ».",
            "Premier champ : la liste recherchable « Ministère du gouvernement actuel (Côte d'Ivoire — pré-remplit le nom) ». Choisir un ministère pré-remplit automatiquement le nom et fixe le type sur « Ministère » ; l'option « — Saisie libre — » permet de tout saisir manuellement.",
            "Champ obligatoire « Nom de l'organisation * » (exemple proposé : « Ex. Ministère de l'Éducation nationale »). Le nom doit comporter au moins 2 caractères.",
            "Champ « Type » (facultatif) parmi : Ministère, Institution, Réseau, Association, Entreprise / Société.",
            "Champ « Pays » (facultatif) via le sélecteur de pays.",
            "Validation par « Créer l'organisation » ; un identifiant technique (slug) est généré automatiquement et l'action est tracée dans le journal d'audit."
          ]
        },
        {
          "theme": "Créer une structure",
          "points": [
            "Accès par « + Structure » (/organization/structures/new), page « Nouvelle structure » au sous-titre « Ajoutez une structure à l'organigramme. »",
            "« Nom de la structure * » obligatoire (exemple : « Ex. Service de la Formation Continue », 2 caractères minimum).",
            "« Type * » obligatoire parmi : Direction, Sous-direction, Service, Antenne, Direction régionale, Coordination, Équipe.",
            "« Organisation * » obligatoire (liste des organisations existantes).",
            "« Structure parente » : « — Aucune (racine) — » pour placer la structure à la racine, ou une structure existante pour l'imbriquer.",
            "« Ministère de rattachement (chaîne hiérarchique) » : liste recherchable, facultative ; il détermine sous quel apex « ministère technique » la structure apparaît.",
            "« Pays », « Subdivision / région » (cette dernière reste désactivée tant qu'un pays n'est pas choisi, message « — Choisir un pays d'abord — ») et « Responsable » (facultatif).",
            "Validation par « Créer la structure » ; l'action est tracée dans l'audit et renvoie à l'organigramme."
          ]
        },
        {
          "theme": "Déplacer une structure : deux gestes",
          "points": [
            "Geste 1 — glisser-déposer : la ligne d'une structure est saisissable (curseur « déplacer ») ; on la glisse sur sa destination, qui se surligne, puis on relâche. Les cibles valides sont un apex de ministère, un apex d'organisation, ou une structure parente.",
            "Geste 2 — au clic : cliquer l'icône poignée « GripVertical » d'une structure active le mode déplacement (la poignée devient une croix « X » d'annulation). Un bandeau collant « Déplacement de <nom> — cliquez sa nouvelle destination… » apparaît ; toutes les destinations valides se surlignent en vert avec la mention « Déposer ici » / « Déposer ici — racine de <apex> ».",
            "Le déplacement est appliqué immédiatement à l'écran (mise à jour optimiste) puis confirmé côté serveur ; en cas d'échec, l'affichage est restauré et un message d'erreur s'affiche.",
            "Le sous-arbre suit : les structures filles conservent leur hiérarchie interne (parentId) mais héritent du nouveau ministère et de la nouvelle organisation du nœud déplacé.",
            "Garde anti-cycle : on ne peut pas déposer une structure sur elle-même ni sur l'un de ses descendants (cibles grisées) ; le serveur refuse sinon avec « Déplacement impossible : cela créerait un cycle hiérarchique. »",
            "Une aide permanente rappelle : « Glissez-déposez une structure sur sa destination, ou cliquez son icône (poignée) puis la zone d'accueil surlignée. »"
          ]
        },
        {
          "theme": "Logo d'organisation",
          "points": [
            "Sur l'apex de chaque organisation cliente, un téléversement « Logo » (composant FileUpload, purpose logo) est proposé aux titulaires d'organization:manage.",
            "Une fois ajouté, le logo (image) remplace l'icône générique « Building2 » et s'affiche en vignette arrondie dans l'en-tête de la carte de l'organisation.",
            "Le contrôle de logo n'est pas disponible pendant qu'un déplacement est en cours (la barre d'actions de l'apex se masque tant qu'une structure est en cours de relocalisation)."
          ]
        },
        {
          "theme": "Suppression : prérogative du super administrateur",
          "points": [
            "Les icônes corbeille (Trash2) sur les structures et les organisations, ainsi que le bouton « Supprimer » de la fiche d'édition d'une structure, ne s'affichent qu'au super administrateur (isSuperAdmin).",
            "Supprimer une structure : suppression douce ; elle est refusée si des sous-structures existent, avec le message « Supprimez ou rattachez d'abord les sous-structures. »",
            "Supprimer une organisation : la confirmation indique le décompte « Cette organisation et ses N structure(s) rattachée(s) seront supprimées. » La suppression est en CASCADE — l'organisation et toutes ses structures sont supprimées (suppression douce) dans une même transaction.",
            "Le dialogue de confirmation propose « Supprimer » (rouge) et « Annuler » ; toute suppression est irréversible côté utilisateur et tracée dans le journal d'audit.",
            "Un administrateur institutionnel, même titulaire d'organization:manage, ne voit aucun bouton de suppression : l'action serveur renvoie « Suppression réservée au super administrateur. »"
          ]
        }
      ],
      "procedures": [
        {
          "titre": "Créer une organisation cliente à partir d'un ministère ivoirien",
          "etapes": [
            "Ouvrir le menu « Organisation & structures » (/organization).",
            "Cliquer « + Organisation » pour ouvrir « Nouvelle organisation » (/organization/new).",
            "Dans la liste « Ministère du gouvernement actuel », rechercher puis sélectionner le ministère voulu : le « Nom de l'organisation * » se pré-remplit et le « Type » passe à « Ministère ».",
            "Au besoin, choisir « — Saisie libre — » et renseigner manuellement le « Nom de l'organisation * » (au moins 2 caractères).",
            "Vérifier ou ajuster le « Type » et sélectionner le « Pays ».",
            "Cliquer « Créer l'organisation » : on revient à l'organigramme où la nouvelle organisation apparaît dans la section « Organisations clientes »."
          ]
        },
        {
          "titre": "Créer une structure et la rattacher à un ministère technique",
          "etapes": [
            "Depuis /organization, cliquer « + Structure » pour ouvrir « Nouvelle structure ».",
            "Saisir « Nom de la structure * » et choisir le « Type * » (Direction, Sous-direction, Service, Antenne, Direction régionale, Coordination ou Équipe).",
            "Sélectionner l'« Organisation * » de rattachement.",
            "Choisir la « Structure parente » : « — Aucune (racine) — » pour un apex, ou une structure existante pour l'imbriquer.",
            "Dans « Ministère de rattachement », rechercher et sélectionner le ministère technique afin de faire apparaître la structure sous l'apex correspondant.",
            "Renseigner « Pays », puis « Subdivision / région » (qui se débloque après le choix du pays), et désigner le « Responsable ».",
            "Cliquer « Créer la structure » : on revient à l'organigramme, structure positionnée sous le ministère choisi."
          ]
        },
        {
          "titre": "Déplacer une structure par glisser-déposer",
          "etapes": [
            "Sur /organization, repérer la structure à déplacer (curseur « déplacer » au survol de sa ligne).",
            "Saisir la ligne de la structure et la glisser vers sa destination : apex d'un ministère, apex d'une organisation, ou une structure parente.",
            "Vérifier que la destination se surligne (mention « Déposer ici ») et qu'elle n'est pas grisée (une cible grisée est la structure elle-même ou un de ses descendants).",
            "Relâcher pour déposer : le nouvel emplacement s'affiche immédiatement.",
            "Contrôler l'absence de message d'erreur ; en cas d'échec, l'organigramme revient à son état précédent et l'erreur s'affiche en haut."
          ]
        },
        {
          "titre": "Déplacer une structure au clic (poignée GripVertical)",
          "etapes": [
            "Cliquer l'icône poignée (GripVertical) à gauche de la structure : le mode déplacement s'active (la poignée devient une croix d'annulation).",
            "Lire le bandeau « Déplacement de <nom> — cliquez sa nouvelle destination : un ministère, une organisation ou une structure parente (surlignés en vert). »",
            "Cliquer la zone d'accueil surlignée en vert portant « Déposer ici » ou « Déposer ici — racine de <apex> ».",
            "Vérifier le repositionnement immédiat ; pour renoncer, cliquer « Annuler » dans le bandeau ou de nouveau la poignée (croix)."
          ]
        },
        {
          "titre": "Ajouter le logo d'une organisation",
          "etapes": [
            "Sur /organization, localiser la carte de l'organisation cliente dans la section « Organisations clientes ».",
            "Dans l'en-tête de la carte (hors mode déplacement), cliquer le contrôle « Logo ».",
            "Sélectionner un fichier image.",
            "Vérifier que la vignette du logo remplace l'icône générique dans l'apex de l'organisation."
          ]
        },
        {
          "titre": "Supprimer une organisation en cascade (super administrateur)",
          "etapes": [
            "Sur /organization, en tant que super administrateur, repérer l'icône corbeille de la carte de l'organisation.",
            "Cliquer la corbeille pour ouvrir le dialogue « Supprimer l'organisation ? ».",
            "Lire attentivement le décompte « Cette organisation et ses N structure(s) rattachée(s) seront supprimées. »",
            "Cliquer « Supprimer » pour confirmer la cascade, ou « Annuler » pour renoncer.",
            "Constater que l'organisation et ses structures ont disparu de l'organigramme."
          ]
        },
        {
          "titre": "Supprimer une structure isolée (super administrateur)",
          "etapes": [
            "S'assurer au préalable que la structure n'a plus de sous-structures (sinon la suppression est refusée : « Supprimez ou rattachez d'abord les sous-structures. »).",
            "Sur l'organigramme, survoler la structure et cliquer son icône corbeille, OU ouvrir sa fiche (crayon) puis cliquer « Supprimer ».",
            "Confirmer dans le dialogue « Supprimer la structure ? » (organigramme) ou via « Confirmer ? Oui / Non » (fiche d'édition).",
            "Vérifier le retrait de la structure de l'organigramme."
          ]
        }
      ],
      "exercices": [
        "TP1 — Création complète : créer une organisation cliente à partir d'un ministère ivoirien de la liste recherchable, puis y ajouter une structure de type « Direction » à la racine et une « Sous-direction » imbriquée dessous. Vérifier que les lignes de contexte affichent correctement « ↳ sous <Direction> » et le bon apex.",
        "TP2 — Les deux gestes de déplacement : déplacer une « Sous-direction » sous un autre parent par glisser-déposer, puis la ramener à son emplacement initial au clic (poignée GripVertical → « Déposer ici »). Observer que le sous-arbre suit et que la mise à jour est immédiate.",
        "TP3 — Garde anti-cycle et logo : tenter de déposer une structure parente sur l'une de ses propres descendantes et constater que la cible est grisée/refusée ; puis ajouter un logo à une organisation cliente et vérifier son affichage dans l'apex.",
        "TP4 — Suppressions et habilitations (à mener côté super_admin, puis observer côté institution_admin) : essayer de supprimer une structure ayant des sous-structures (message de refus attendu), supprimer une organisation et lire le décompte de cascade avant de confirmer ; vérifier qu'en tant qu'institution_admin aucune corbeille ni bouton « Supprimer » n'apparaît."
      ],
      "autoEvaluation": [
        {
          "question": "Quelles sont les deux grandes sections de lecture de l'organigramme sur /organization ?",
          "reponse": "« Par ministère technique » (chaque ministère est un apex regroupant les structures qui lui sont rattachées) et « Organisations clientes » (chaque organisation est un apex pour ses structures non rattachées à un ministère)."
        },
        {
          "question": "Que se passe-t-il quand on choisit un ministère dans la liste « Ministère du gouvernement actuel » du formulaire de nouvelle organisation ?",
          "reponse": "Le « Nom de l'organisation * » est pré-rempli avec le nom du ministère et le « Type » est automatiquement fixé sur « Ministère ». L'option « — Saisie libre — » permet de saisir le nom manuellement."
        },
        {
          "question": "Citez les sept types de structure disponibles.",
          "reponse": "Direction, Sous-direction, Service, Antenne, Direction régionale, Coordination et Équipe."
        },
        {
          "question": "Quels sont les deux gestes possibles pour déplacer une structure, et comment s'amorce le mode « au clic » ?",
          "reponse": "Le glisser-déposer de la ligne sur sa destination, et le déplacement au clic qui s'amorce en cliquant l'icône poignée (GripVertical), puis en cliquant la zone d'accueil surlignée en vert (« Déposer ici »)."
        },
        {
          "question": "Lorsqu'on déplace une structure ayant des structures filles, qu'advient-il de ces dernières ?",
          "reponse": "Le sous-arbre suit : les filles conservent leur hiérarchie interne (leur structure parente) mais héritent du nouveau ministère et de la nouvelle organisation du nœud déplacé."
        },
        {
          "question": "Pourquoi certaines destinations apparaissent-elles grisées pendant un déplacement ?",
          "reponse": "Parce que la cible est la structure elle-même ou l'un de ses descendants ; l'y déposer créerait un cycle hiérarchique, ce que le système interdit (« Déplacement impossible : cela créerait un cycle hiérarchique. »)."
        },
        {
          "question": "Qui peut supprimer une structure ou une organisation, et que voit un administrateur institutionnel ?",
          "reponse": "Seul le super administrateur (isSuperAdmin). Un administrateur institutionnel, même avec organization:manage, ne voit ni les icônes corbeille ni le bouton « Supprimer » ; l'action serveur renverrait « Suppression réservée au super administrateur. »"
        },
        {
          "question": "Que signifie « suppression en cascade » d'une organisation et qu'affiche la confirmation ?",
          "reponse": "L'organisation et toutes ses structures rattachées sont supprimées (suppression douce) dans une même transaction. La confirmation indique le décompte « Cette organisation et ses N structure(s) rattachée(s) seront supprimées. »"
        },
        {
          "question": "Que se passe-t-il si l'on tente de supprimer une structure qui possède encore des sous-structures ?",
          "reponse": "La suppression est refusée avec le message « Supprimez ou rattachez d'abord les sous-structures. » Il faut d'abord déplacer ou supprimer les sous-structures."
        },
        {
          "question": "Comment ajoute-t-on le logo d'une organisation et où apparaît-il ?",
          "reponse": "Via le contrôle « Logo » présent dans l'en-tête de la carte de l'organisation (pour les titulaires d'organization:manage, hors mode déplacement) ; une fois ajouté, le logo remplace l'icône générique dans l'apex de l'organisation."
        }
      ]
    },
    {
      "code": "M4",
      "titre": "Utilisateurs, rôles et permissions (RBAC)",
      "objectifs": [
        "Identifier le modèle de contrôle d'accès d'EduWeb (rôles groupés par périmètre Système / Gouvernance / EduLex / Academy, permissions, permissions déléguées directement) et la permission pivot user:manage.",
        "Distinguer le périmètre de visibilité du super_admin (annuaire global grâce à admin:manage) de celui de l'institution_admin (limité à sa propre organisation).",
        "Créer un compte utilisateur complet (profil, genre, rattachements, supérieur hiérarchique, rôles, mot de passe initial) et le modifier en respectant les contrôles de validation du serveur.",
        "Déléguer des permissions directes à un agent via la carte « Délégation de droits », au moyen des lots de tâches ou activité par activité, sans lui attribuer un rôle complet.",
        "Importer plusieurs comptes par fichier CSV à partir du modèle, interpréter le rapport d'import (importés / ignorés + erreurs par ligne) et corriger les rejets.",
        "Exécuter les actions d'administration d'un compte : activer/désactiver (avec coupure des sessions), réinitialiser le mot de passe et supprimer (suppression douce), en connaissant les garde-fous (auto-protection, traçabilité d'audit)."
      ],
      "publicCible": "Super Administrateur EduWeb (super_admin) et Administrateur institutionnel (institution_admin) — c'est-à-dire les détenteurs de la permission user:manage. À titre d'information pour les responsables hiérarchiques amenés à figurer comme « Supérieur hiérarchique » des comptes créés.",
      "contenu": [
        {
          "theme": "Le modèle RBAC d'EduWeb : rôles, permissions et délégation",
          "points": [
            "Trois objets articulés : le compte utilisateur (User), les rôles (Role, porteurs de permissions) et les permissions directes (directPermissions) accordées au cas par cas en plus des rôles.",
            "Les rôles sont regroupés en quatre périmètres affichés dans le formulaire : Système (SYSTEM), Gouvernance (GOVERNANCE), EduLex (EDULEX) et Academy (ACADEMY). Un compte peut cumuler plusieurs rôles.",
            "La permission pivot de tout ce module est user:manage : créer, importer, modifier, activer/désactiver, réinitialiser un mot de passe, supprimer ou déléguer des droits exige cette permission ; sans elle, la page /users s'ouvre en lecture et les actions sont refusées (« Permission requise (user:manage). »).",
            "Permissions directes vs rôles : un droit délégué (ex. activity:validate) s'ajoute aux droits hérités des rôles, sans changer le rôle de l'agent. C'est l'outil de réglage fin.",
            "Toute action d'écriture est tracée dans le journal d'audit (create, update, activate/deactivate, reset_password, delete, import, set_permissions)."
          ]
        },
        {
          "theme": "Périmètres et différences super_admin / institution_admin",
          "points": [
            "Le super_admin dispose de admin:manage : l'annuaire /users affiche TOUS les comptes, au-delà d'une seule organisation. Il peut tout gérer, partout.",
            "L'institution_admin détient user:manage mais PAS admin:manage : son annuaire est automatiquement restreint à sa propre organisation (filtre organizationId). Il gère donc les comptes de son organisation uniquement.",
            "Les deux rôles partagent exactement les mêmes écrans et actions de gestion de comptes (création, import, fiche, administration, délégation) ; seule la portée de visibilité diffère.",
            "Prérogatives réservées : seul le super_admin peut supprimer une structure ou une organisation et régler la déconnexion automatique par inactivité (hors périmètre M4, mais utile pour situer les rôles).",
            "La barre supérieure « Pays / subdivision » cadre l'ensemble des écrans : à activer avant de gérer un annuaire pour éviter les erreurs de portée."
          ]
        },
        {
          "theme": "Anatomie de la fiche utilisateur et du formulaire",
          "points": [
            "Champs obligatoires (marqués *) : Prénom, Nom, E-mail, Genre, au moins un Rôle, et — à la création seulement — le Mot de passe initial (min. 8 caractères).",
            "Rattachements facultatifs : Organisation, Structure, Pays, Ministère (sélecteur recherchable).",
            "« Supérieur hiérarchique (pour le suivi des absences) » : sélecteur recherchable d'agent. S'il est laissé vide à la création et qu'une Structure est choisie, le système le pré-remplit avec le responsable de la structure.",
            "La fiche d'un utilisateur existant (/users/[id]) présente trois cartes latérales : « Administration » (activer/désactiver, réinitialiser le mot de passe, supprimer), « Délégation de droits » et « Activité du compte » (créé le, dernière connexion).",
            "Le badge de statut « Actif » / « Inactif » figure en tête de fiche et dans le tableau."
          ]
        },
        {
          "theme": "Règles de validation et garde-fous appliqués par le serveur",
          "points": [
            "E-mail unique : à la création « Un utilisateur avec cet e-mail existe déjà. » ; en modification « Cet e-mail est déjà utilisé. ». L'e-mail est normalisé en minuscules.",
            "Mot de passe : « Un mot de passe d'au moins 8 caractères est requis. » Il est haché (jamais stocké en clair).",
            "Genre obligatoire : « Le genre est requis (Homme ou Femme). »",
            "Au moins un rôle : « Sélectionnez au moins un rôle. »",
            "Anti-cycle hiérarchique : un agent ne peut pas être son propre supérieur (« Un agent ne peut pas être son propre supérieur hiérarchique. »).",
            "Auto-protection : on ne peut ni se désactiver, ni se supprimer soi-même (cases et boutons désactivés, et refus serveur)."
          ]
        },
        {
          "theme": "Délégation de droits (permissions directes)",
          "points": [
            "Carte « Délégation de droits » sur la fiche : accorde des permissions DIRECTEMENT à l'utilisateur, en plus de ses rôles.",
            "Deux modes : les « Lots de tâches » (préréglages en un clic) et la sélection granulaire activité par activité, regroupée par module (EduLex, Activités, Validation, Rapports, Formulaires, Organisation, Utilisateurs, Academy, Administration).",
            "Lots disponibles : « Valideur EduLex » (edulex:validate), « Valideur + publication EduLex » (edulex:validate + edulex:publish), « Valideur d'activités » (activity:validate), « Éditeur Academy » (academy:manage).",
            "Le bouton d'enregistrement n'est actif que si la sélection a changé ; il affiche le nombre de droits (« Enregistrer (N droits) ») puis « Droits enregistrés ».",
            "Bonne pratique : préférer la délégation ponctuelle d'une permission précise plutôt que l'attribution d'un rôle complet quand on veut seulement habiliter un agent à une tâche."
          ]
        },
        {
          "theme": "Import CSV en masse",
          "points": [
            "Le fichier attendu comporte les colonnes : email*, prenom*, nom*, motdepasse* (8 car. min.), roles* (clés séparées par « | », ex. institution_admin|national_manager), et les facultatives telephone, pays (code ISO : CI, SN, FR…), organisation (nom exact), structure (nom exact), ministere (nom ou code).",
            "Le modèle CSV téléchargeable (« Modèle CSV ») contient un en-tête et deux lignes d'exemple, avec un BOM UTF-8 pour qu'Excel restitue correctement les accents.",
            "Le séparateur (virgule ou point-virgule) et les variantes d'en-tête (firstname/prenom, password/mdp…) sont auto-détectés ; les clés de rôle valides sont rappelées dans un panneau latéral.",
            "Validation ligne par ligne côté serveur : e-mail valide et non dupliqué (ni dans le fichier, ni en base), prénom et nom requis, mot de passe ≥ 8, au moins un rôle reconnu. Toute ligne fautive est ignorée avec un message « Ligne N : … ».",
            "Le rapport final indique « N utilisateur(s) importé(s), X ignoré(s) » et la liste détaillée des erreurs ; un écran de prévisualisation montre jusqu'à 50 lignes avant import."
          ]
        },
        {
          "theme": "Cycle de vie d'un compte : activation, mot de passe, suppression",
          "points": [
            "Désactivation : bascule le statut sur « Inactif » ET coupe immédiatement toutes les sessions actives de l'agent (déconnexion forcée). Réactivation possible à tout moment.",
            "Réinitialisation de mot de passe par l'administrateur : saisie d'un nouveau mot de passe (min. 8) puis confirmation ; message « Mot de passe réinitialisé ». À distinguer du parcours self-service « Mot de passe oublié » (jeton e-mail à usage unique, valable 1 heure).",
            "Suppression : c'est une suppression douce (soft delete) — le compte est marqué supprimé, désactivé, ses sessions coupées, mais l'historique reste exploitable. Disponible à l'unité (fiche ou ligne de tableau) ou en masse (sélection multiple → « Supprimer la sélection »).",
            "Toutes ces actions exigent une confirmation explicite et sont journalisées.",
            "Limites systématiques : impossible de se désactiver ou se supprimer soi-même (« Vous ne pouvez pas désactiver/supprimer votre propre compte. »)."
          ]
        }
      ],
      "procedures": [
        {
          "titre": "Créer un compte utilisateur complet",
          "etapes": [
            "Ouvrir « Utilisateurs » (/users), puis cliquer « Nouvel utilisateur » (bouton bleu, en haut à droite).",
            "Renseigner les champs obligatoires : « Prénom * », « Nom * », « E-mail * », « Genre * » et le « Mot de passe initial * » (min. 8 caractères).",
            "Compléter les rattachements utiles : « Organisation », « Structure », « Pays » (sélecteur drapeau), « Ministère » (sélecteur recherchable).",
            "Renseigner le « Supérieur hiérarchique (pour le suivi des absences) » ; si laissé vide alors qu'une Structure est choisie, il sera pré-rempli avec le responsable de cette structure.",
            "Dans la section « Rôles * », cocher au moins un rôle dans les blocs Système / Gouvernance / EduLex / Academy (cumul possible).",
            "Cliquer « Créer l'utilisateur » : en cas d'erreur, un bandeau rouge affiche le message précis (e-mail déjà utilisé, mot de passe trop court, rôle manquant…). Au succès, la fiche de l'utilisateur s'ouvre."
          ]
        },
        {
          "titre": "Déléguer une permission directe à un agent",
          "etapes": [
            "Ouvrir la fiche de l'agent depuis /users (clic sur son nom).",
            "Dans la colonne de droite, repérer la carte « Délégation de droits ».",
            "Option rapide : cliquer un « Lot de tâches » (ex. « + Valideur d'activités » pour accorder activity:validate).",
            "Option fine : faire défiler les modules et cocher les permissions souhaitées une à une (l'état coché s'affiche en surbrillance).",
            "Vérifier le compteur du bouton (« Enregistrer (N droits) »), puis cliquer pour valider.",
            "Confirmer l'affichage « Droits enregistrés » ; ces droits s'ajoutent aux permissions des rôles, sans modifier les rôles eux-mêmes."
          ]
        },
        {
          "titre": "Importer plusieurs comptes par CSV",
          "etapes": [
            "Depuis /users, cliquer « Modèle CSV » pour télécharger le gabarit « modele-import-utilisateurs.csv ».",
            "Compléter le fichier : colonnes requises email, prenom, nom, motdepasse (≥ 8 car.), roles (clés séparées par « | »), et facultatives telephone, pays, organisation, structure, ministere.",
            "Cliquer « Importer (CSV) » pour ouvrir /users/import ; s'appuyer sur les panneaux « Colonnes du fichier » et « Clés de rôle valides ».",
            "Glisser-déposer le fichier dans la zone prévue (ou cliquer pour parcourir) ; vérifier l'aperçu (« N ligne(s) détectée(s) »).",
            "Cliquer « Importer N utilisateur(s) ».",
            "Lire le rapport : « N utilisateur(s) importé(s), X ignoré(s) », puis la liste « Ligne N : … » des erreurs ; corriger les lignes rejetées et relancer si besoin."
          ]
        },
        {
          "titre": "Activer / désactiver un compte",
          "etapes": [
            "Ouvrir la fiche de l'utilisateur (/users/[id]).",
            "Dans la carte « Administration », cliquer « Désactiver le compte » (compte actif) ou « Activer le compte » (compte inactif).",
            "Pour une désactivation, noter que les sessions de l'agent sont immédiatement coupées : il sera déconnecté de la plateforme.",
            "Vérifier que le badge de statut passe bien à « Inactif » / « Actif ».",
            "Sur son propre compte, le bouton est désactivé (« Vous ne pouvez pas désactiver votre propre compte. »)."
          ]
        },
        {
          "titre": "Réinitialiser le mot de passe d'un utilisateur",
          "etapes": [
            "Ouvrir la fiche de l'utilisateur, carte « Administration », bloc « Réinitialiser le mot de passe ».",
            "Saisir le nouveau mot de passe (min. 8 caractères) dans le champ « Nouveau mot de passe (min. 8) ».",
            "Cliquer « Réinitialiser ».",
            "Confirmer le message « Mot de passe réinitialisé », puis communiquer le mot de passe à l'agent par un canal sûr.",
            "Rappeler à l'utilisateur qu'il peut aussi, de lui-même, utiliser « Mot de passe oublié » (lien e-mail à usage unique, valable 1 heure)."
          ]
        },
        {
          "titre": "Supprimer un ou plusieurs comptes",
          "etapes": [
            "Unitaire : sur la fiche, carte « Administration », cliquer « Supprimer le compte », puis confirmer « Oui, supprimer » dans l'encadré rouge.",
            "En masse : sur /users, cocher les comptes à supprimer (votre propre ligne n'est pas sélectionnable), puis cliquer « Supprimer la sélection ».",
            "Confirmer « Supprimer N compte(s) ? » → « Oui, supprimer ».",
            "Vérifier que les comptes disparaissent de l'annuaire (suppression douce : l'historique reste conservé, les sessions sont coupées).",
            "Noter que l'opération est journalisée à des fins d'audit."
          ]
        }
      ],
      "exercices": [
        "Créer de A à Z un compte d'agent : profil complet, rattachement à une structure, supérieur hiérarchique défini, rôle « Agent » coché et mot de passe initial conforme. Vérifier l'apparition du badge « Actif » et la présence du compte dans l'annuaire.",
        "Préparer un fichier CSV de 4 lignes contenant volontairement une erreur par type (e-mail invalide, mot de passe trop court, clé de rôle inexistante, e-mail en double), l'importer, puis lire et expliquer chaque message « Ligne N : … » du rapport d'import.",
        "Sur la fiche d'un agent existant, lui déléguer la permission activity:validate via le lot « Valideur d'activités », enregistrer, puis retirer cette permission et confirmer que le compteur du bouton et le message d'état évoluent correctement.",
        "Désactiver un compte de test (en observant la coupure de session si possible), réinitialiser son mot de passe, le réactiver, puis le supprimer en suppression douce. Tenter ensuite de désactiver son propre compte pour constater le garde-fou d'auto-protection."
      ],
      "autoEvaluation": [
        {
          "question": "Quelle permission unique conditionne toutes les actions de gestion de comptes (création, import, modification, activation, réinitialisation, suppression, délégation) ?",
          "reponse": "La permission user:manage. Sans elle, les actions sont refusées avec le message « Permission requise (user:manage). »."
        },
        {
          "question": "En quoi le périmètre de l'institution_admin diffère-t-il de celui du super_admin sur l'annuaire /users ?",
          "reponse": "Le super_admin possède admin:manage et voit TOUS les comptes, toutes organisations confondues. L'institution_admin n'a pas admin:manage : son annuaire est automatiquement limité à sa propre organisation."
        },
        {
          "question": "Que se passe-t-il pour les sessions d'un agent lorsqu'on désactive son compte ?",
          "reponse": "Toutes ses sessions actives sont immédiatement supprimées : l'agent est déconnecté de la plateforme et ne peut plus se reconnecter tant que le compte reste inactif."
        },
        {
          "question": "À quoi sert la carte « Délégation de droits » et en quoi diffère-t-elle de l'attribution d'un rôle ?",
          "reponse": "Elle accorde des permissions directes à un utilisateur, en plus de ses rôles, sans changer ses rôles. On peut utiliser un « lot de tâches » (ex. Valideur d'activités → activity:validate) ou cocher les permissions une à une. C'est l'outil de réglage fin, à préférer quand on ne veut habiliter qu'à une tâche précise."
        },
        {
          "question": "Citez trois contrôles que le serveur applique au moment de créer un utilisateur.",
          "reponse": "E-mail unique (« Un utilisateur avec cet e-mail existe déjà. »), mot de passe d'au moins 8 caractères, genre obligatoire (Homme/Femme) et au moins un rôle sélectionné. Le serveur empêche aussi qu'un agent soit son propre supérieur hiérarchique."
        },
        {
          "question": "Quelles sont les colonnes OBLIGATOIRES d'un fichier d'import CSV, et comment sépare-t-on plusieurs rôles ?",
          "reponse": "Colonnes requises : email, prenom, nom, motdepasse (≥ 8 caractères) et roles. Plusieurs clés de rôle se séparent par le caractère « | » (ex. institution_admin|national_manager). pays, organisation, structure, ministere et telephone sont facultatifs."
        },
        {
          "question": "La suppression d'un compte est-elle définitive ? Peut-on supprimer son propre compte ?",
          "reponse": "Non, c'est une suppression douce (soft delete) : le compte est marqué supprimé et désactivé, ses sessions coupées, mais l'historique est conservé. On ne peut jamais se supprimer (ni se désactiver) soi-même."
        },
        {
          "question": "Comment est renseigné le « Supérieur hiérarchique » si on le laisse vide à la création ?",
          "reponse": "S'il est laissé vide et qu'une Structure est sélectionnée, le système le pré-remplit automatiquement avec le responsable (manager) de cette structure. Ce champ conditionne le suivi et la validation des absences de l'agent."
        }
      ]
    },
    {
      "code": "M5",
      "titre": "Formulaires & saisie d'activités",
      "objectifs": [
        "Identifier les douze types de champs du concepteur de formulaires et reconnaître ceux qui exigent une liste d'options (Liste déroulante, Boutons radio, Cases à cocher).",
        "Concevoir, enregistrer et publier un formulaire d'activité versionné, en maîtrisant son cycle de vie (Brouillon, Publié, Archivé) et la règle « au moins un champ avant de publier ».",
        "Créer une activité en brouillon, la documenter (description, période, structure) et la rattacher au référentiel via les « Textes EduLex associés ».",
        "Joindre des pièces justificatives (PDF, image, Word, Excel) à une activité et soumettre celle-ci au circuit de validation hiérarchique.",
        "Distinguer les statuts du cycle de vie d'une activité (Brouillon, Soumis, En examen, Validé, Rejeté, À corriger, Consolidé, Archivé) et savoir quand une activité reste modifiable.",
        "Différencier le périmètre du concepteur de formulaires (permission form:manage) de celui de la saisie d'activités (auteur / activity:create / update)."
      ],
      "publicCible": "Administrateur institutionnel (institution_admin), seul habilité à concevoir et publier les formulaires (form:manage) ; Agent / contributeur (agent) et responsables (national, régional, local, Directeur, Sous-Directeur), auteurs et saisisseurs d'activités. Les valideurs (auditor, managers porteurs de activity:validate) y trouveront le contexte amont des activités qu'ils examineront au module M6.",
      "contenu": [
        {
          "theme": "Deux objets distincts : le formulaire et l'activité",
          "points": [
            "Le formulaire d'activité (ActivityForm) est un gabarit de saisie conçu et publié par l'Administrateur institutionnel (permission form:manage) ; il porte un titre, une description, une liste de champs typés, un statut et un numéro de version.",
            "L'activité (Activity) est une contribution saisie par un agent ou un responsable ; elle porte un intitulé, une description, une période, une structure, des textes EduLex liés et des pièces jointes, et suit un circuit de validation.",
            "Important : dans la version étudiée, la saisie d'une activité passe par un écran générique (Intitulé, Description, Structure, Période, Textes EduLex), indépendant des champs personnalisés d'un formulaire. Le concepteur de formulaires sert à structurer et versionner les modèles de recueil de l'organisation.",
            "Les deux modules sont cloisonnés par permission : un agent consulte les formulaires en lecture seule (form:read) mais ne peut ni les créer ni les publier ; il crée en revanche ses propres activités."
          ]
        },
        {
          "theme": "Le concepteur de formulaires : les douze types de champs",
          "points": [
            "L'écran « Type » propose douze types : Texte court, Texte long, Date, Nombre, Liste déroulante, Boutons radio, Cases à cocher, Fichier joint, Image, Tableau répétable, Champ calculé, Lien vers un texte EduLex.",
            "Trois types seulement ouvrent le sous-champ « Options (séparées par des virgules) » : Liste déroulante, Boutons radio et Cases à cocher. Pour les autres, ce sous-champ ne s'affiche pas.",
            "Texte court (TEXT) et Texte long (TEXTAREA) recueillent du texte libre ; Date (DATE) un calendrier ; Nombre (NUMBER) une valeur numérique.",
            "Fichier joint (FILE) et Image (IMAGE) prévoient un dépôt de pièce ; Tableau répétable (TABLE) une saisie en lignes ; Champ calculé (CALCULATED) une valeur dérivée ; Lien vers un texte EduLex (EDULEX_LINK) un rattachement au référentiel réglementaire.",
            "Chaque champ possède un Libellé, un indicateur « Requis » (case à cocher) et un ordre d'affichage que l'on règle avec les flèches Haut / Bas."
          ]
        },
        {
          "theme": "Cycle de vie d'un formulaire",
          "points": [
            "Statuts : Brouillon (DRAFT), Publié (PUBLISHED), Archivé (ARCHIVED). Le badge affiche le statut suivi de la version, par ex. « Brouillon · v1 ».",
            "Création : « Nouveau formulaire » crée d'abord un brouillon (titre + description), puis ouvre le concepteur pour composer les champs.",
            "Publication : le bouton « Publier » exige au moins un champ ; un message bloque sinon (« Ajoutez au moins un champ avant de publier. »). La publication incrémente le numéro de version.",
            "Sur un formulaire publié, on peut « Repasser en brouillon » (pour reprendre la composition) ou « Archiver » ; ces transitions sont réservées à form:manage.",
            "Suppression : « Supprimer le formulaire » réalise une suppression douce (le formulaire disparaît de la liste mais n'est pas effacé physiquement).",
            "La liste /forms est limitée à l'organisation de l'utilisateur (sauf permission admin:manage) et indique pour chaque carte le statut, le nombre de champs et la version."
          ]
        },
        {
          "theme": "Cycle de vie d'une activité",
          "points": [
            "Huit statuts : Brouillon (DRAFT), Soumis (SUBMITTED), En examen (IN_REVIEW), Validé (VALIDATED), Rejeté (REJECTED), À corriger (TO_CORRECT), Consolidé (CONSOLIDATED), Archivé (ARCHIVED).",
            "Une activité n'est modifiable QUE dans les états Brouillon, À corriger ou Rejeté ; une fois Soumise, En examen, Validée ou Consolidée, elle est verrouillée à l'édition.",
            "La soumission place l'activité au statut Soumis, horodate la soumission et démarre la chaîne de validation au niveau 0 ; une décision « Demander correction » ou « Rejeter » fait repartir la chaîne de zéro à la prochaine soumission.",
            "Seul l'auteur peut soumettre, modifier (sauf délégation activity:update) ou supprimer sa propre activité ; la suppression est douce.",
            "La validation, la demande de correction, le rejet et la consolidation relèvent de activity:validate (étudiés au module M6) et ne sont pas accessibles au simple auteur."
          ]
        },
        {
          "theme": "Documenter une activité : pièces jointes et liens EduLex",
          "points": [
            "Sur le détail d'une activité, la carte « Pièces jointes » permet de « Joindre un document » : formats acceptés PDF, images, Word (.doc, .docx) et Excel (.xls, .xlsx).",
            "Le téléversement se fait directement depuis le navigateur, avec une barre de progression (« Téléversement… X% »), puis enregistrement de la pièce. Chaque pièce est listée avec son nom et sa taille (Ko / Mo) et reste téléchargeable.",
            "Le droit de joindre une pièce est ouvert à l'auteur ainsi qu'aux porteurs de activity:update ou activity:validate.",
            "Le rattachement réglementaire se fait via « Textes EduLex associés » : une liste cochable de textes du périmètre Pays de l'utilisateur (50 plus récents), chacun affichant son titre et son code.",
            "Sur le détail, les textes liés s'affichent dans la carte « Textes EduLex associés » et renvoient vers la fiche du texte (/edulex/texts/[id]) ; ils étayent la conformité de l'activité au référentiel."
          ]
        },
        {
          "theme": "Bonnes pratiques de saisie et de conception",
          "points": [
            "Privilégier des libellés de champs explicites et un usage parcimonieux de l'attribut « Requis » pour ne pas bloquer la saisie inutilement.",
            "Pour les types à options, séparer chaque option par une virgule, sans point-virgule (ex. « Option A, Option B, Option C »).",
            "Toujours « Enregistrer » avant de « Publier » : la mention « ✓ Enregistré » confirme la prise en compte des champs.",
            "Rattacher l'activité à au moins un texte EduLex « En vigueur » pertinent renforce sa traçabilité et alimente le reporting consolidé.",
            "Documenter l'activité (pièces jointes, description claire, période réelle) AVANT de la soumettre, car la soumission verrouille l'édition jusqu'à une éventuelle demande de correction."
          ]
        }
      ],
      "procedures": [
        {
          "titre": "Concevoir et publier un formulaire d'activité (Administrateur institutionnel)",
          "etapes": [
            "Ouvrir « Formulaires d'activités » (/forms) puis cliquer « Nouveau formulaire ».",
            "Saisir le « Titre du formulaire * » (ex. « Fiche de compte rendu d'activité ») et, si utile, la « Description », puis cliquer « Créer et composer les champs ».",
            "Dans le concepteur, cliquer « Ajouter un champ » : renseigner le « Libellé » (ex. « Date de l'activité ») et choisir le « Type » dans la liste des douze types.",
            "Pour un type à options (Liste déroulante, Boutons radio, Cases à cocher), remplir « Options (séparées par des virgules) ».",
            "Cocher « Requis » pour les champs obligatoires ; répéter l'ajout pour chaque champ.",
            "Réordonner les champs avec les flèches Haut / Bas et supprimer les champs superflus via l'icône corbeille.",
            "Cliquer « Enregistrer » et attendre la mention « ✓ Enregistré ».",
            "Cliquer « Publier » (au moins un champ requis ; la version est incrémentée et le badge passe à « Publié · vN »)."
          ]
        },
        {
          "titre": "Modifier, archiver ou supprimer un formulaire existant",
          "etapes": [
            "Depuis /forms, ouvrir le formulaire concerné pour afficher le concepteur.",
            "Si le formulaire est « Publié » et qu'il faut le retoucher, cliquer « Repasser en brouillon ».",
            "Apporter les modifications de champs, puis cliquer « Enregistrer ».",
            "Republier via « Publier » (la version s'incrémente de nouveau).",
            "Pour retirer un formulaire de l'usage sans le détruire, cliquer « Archiver ».",
            "Pour le retirer définitivement de la liste, cliquer « Supprimer le formulaire » (suppression douce)."
          ]
        },
        {
          "titre": "Créer et soumettre une nouvelle activité (Agent / responsable)",
          "etapes": [
            "Depuis le Tableau de bord ou la page Activités, cliquer « Nouvelle activité ».",
            "Renseigner l'« Intitulé de l'activité * » (au moins 3 caractères) puis la « Description ».",
            "Sélectionner la « Structure » concernée (ou « — Aucune / par défaut — ») et renseigner « Début de période » et « Fin de période ».",
            "Dans « Textes EduLex associés », cocher les textes pertinents du référentiel.",
            "Cliquer « Créer le brouillon » : l'activité est enregistrée au statut Brouillon et son détail s'ouvre.",
            "Sur le détail, dans « Pièces jointes », cliquer « Joindre un document » et téléverser les justificatifs (PDF, image, Word, Excel).",
            "Une fois l'activité complète, cliquer « Soumettre à validation » : elle passe au statut Soumis, au niveau 0 du circuit, et le valideur est notifié."
          ]
        },
        {
          "titre": "Corriger une activité renvoyée « À corriger » ou « Rejetée »",
          "etapes": [
            "Ouvrir Notifications et cliquer la décision, ou retrouver l'activité dans /activities via la puce de statut « À corriger » / « Rejeté ».",
            "Lire l'« Historique de validation » pour comprendre le commentaire du valideur.",
            "Cliquer « Modifier » et ajuster l'intitulé, la description, la période, les textes EduLex ou les pièces jointes selon les remarques.",
            "Cliquer « Enregistrer les modifications ».",
            "Cliquer « Soumettre à validation » pour relancer la chaîne depuis le niveau 0."
          ]
        },
        {
          "titre": "Rattacher une activité au bon texte EduLex",
          "etapes": [
            "Ouvrir EduLex (/edulex) et rechercher le texte par mot-clé puis « Filtrer », ou affiner par Catégorie / Statut / Type / Niveau (V0–V4).",
            "Ouvrir la fiche du texte pour vérifier son intitulé, son statut (privilégier « En vigueur ») et son niveau de vérification.",
            "Revenir à l'activité, cliquer « Modifier » et cocher ce texte dans « Textes EduLex associés ».",
            "Cliquer « Enregistrer les modifications » : le texte apparaît désormais dans la carte « Textes EduLex associés » du détail."
          ]
        }
      ],
      "exercices": [
        "TP 1 — Concevoir un formulaire « Compte rendu de mission » comportant au moins : un champ Texte court (Objet), un champ Date, une Liste déroulante (avec trois options), un champ Cases à cocher et un champ Fichier joint. L'enregistrer, vérifier la mention « ✓ Enregistré », puis le publier et constater le passage en « Publié · v1 ».",
        "TP 2 — Tester la règle de publication : créer un nouveau formulaire sans aucun champ, tenter « Publier » et relever le message d'erreur affiché. Ajouter ensuite un champ, enregistrer puis publier avec succès.",
        "TP 3 — Créer une activité en brouillon (intitulé ≥ 3 caractères, description, structure, période), y rattacher deux textes EduLex « En vigueur » et joindre un document PDF, puis la soumettre à validation et vérifier qu'elle n'est plus modifiable.",
        "TP 4 — Simuler un cycle de correction : à partir d'une activité « À corriger » (ou repartir d'un brouillon rejeté), lire le commentaire dans l'historique, modifier l'activité puis la re-soumettre, et observer le retour au niveau 0 du circuit."
      ],
      "autoEvaluation": [
        {
          "question": "Combien de types de champs propose le concepteur de formulaires, et lesquels ouvrent le sous-champ « Options (séparées par des virgules) » ?",
          "reponse": "Douze types (Texte court, Texte long, Date, Nombre, Liste déroulante, Boutons radio, Cases à cocher, Fichier joint, Image, Tableau répétable, Champ calculé, Lien vers un texte EduLex). Seuls trois ouvrent les options : Liste déroulante, Boutons radio et Cases à cocher."
        },
        {
          "question": "Quelle condition faut-il remplir pour pouvoir publier un formulaire, et que se passe-t-il à la publication ?",
          "reponse": "Le formulaire doit comporter au moins un champ ; sinon le message « Ajoutez au moins un champ avant de publier. » bloque l'action. La publication fait passer le statut à « Publié » et incrémente le numéro de version."
        },
        {
          "question": "Quels sont les trois statuts d'une activité dans lesquels elle reste modifiable ?",
          "reponse": "Brouillon (DRAFT), À corriger (TO_CORRECT) et Rejeté (REJECTED). Dès qu'elle est Soumise, En examen, Validée ou Consolidée, l'activité est verrouillée à l'édition."
        },
        {
          "question": "Quels formats de pièces jointes une activité accepte-t-elle, et qui peut en joindre ?",
          "reponse": "PDF, images, Word (.doc/.docx) et Excel (.xls/.xlsx). Peuvent joindre une pièce l'auteur de l'activité ainsi que les utilisateurs disposant de activity:update ou activity:validate."
        },
        {
          "question": "Quelle permission est requise pour concevoir et publier un formulaire, et de quoi dispose un simple agent à ce sujet ?",
          "reponse": "La permission form:manage est requise pour créer, configurer, publier ou archiver un formulaire. Un agent ne dispose que de form:read : il consulte les formulaires de son organisation en lecture seule, sans pouvoir les modifier."
        },
        {
          "question": "Que provoque la soumission d'une activité, et qu'advient-il du circuit après un rejet ou une demande de correction ?",
          "reponse": "La soumission passe l'activité au statut « Soumis », l'horodate et démarre la chaîne de validation au niveau 0 ; le valideur est notifié. Après un rejet ou une demande de correction, la chaîne repart de zéro (niveau 0) à la prochaine soumission."
        },
        {
          "question": "À quoi sert la section « Textes EduLex associés » lors de la saisie d'une activité ?",
          "reponse": "Elle permet de cocher des textes du référentiel réglementaire (du périmètre Pays de l'utilisateur) pour rattacher l'activité à la base EduLex ; ces liens apparaissent ensuite sur le détail et renvoient vers la fiche de chaque texte, renforçant la traçabilité et alimentant le reporting."
        }
      ]
    },
    {
      "code": "M6",
      "titre": "Circuit de validation hiérarchique des activités",
      "objectifs": [
        "Identifier les statuts d'une activité (Brouillon, Soumis, En examen, Validé, Rejeté, À corriger, Consolidé, Archivé) et les transitions qui les relient au sein du circuit de validation.",
        "Lire et interpréter le bandeau « Circuit de validation », les compteurs et le marqueur de niveau (« Niveau X/Y · nom · à vous ») de la file /validation pour repérer les dossiers relevant de votre habilitation.",
        "Statuer correctement sur une activité en utilisant les quatre décisions du panneau « Décision de validation » : Valider, Demander correction, Rejeter, Consolider.",
        "Appliquer la règle du commentaire obligatoire pour tout rejet ou toute demande de correction, et formuler un motif actionnable.",
        "Expliquer le franchissement des niveaux d'une hiérarchie multi-étapes (passage en « En examen » vs validation finale « Validé ») et la règle d'habilitation au niveau courant.",
        "Tracer et auditer une décision via l'« Historique de validation » et la notification adressée à l'auteur."
      ],
      "publicCible": "Tout profil disposant de la permission activity:validate appelé à statuer sur les activités : agent (contributeur valideur), local_manager, deputy_director, director, director_general, regional_manager, national_manager, institution_admin et super_admin. Les profils auditor (lecture seule, sans statuer) et reader peuvent suivre ce module à titre de compréhension du circuit.",
      "contenu": [
        {
          "theme": "Vue d'ensemble du circuit de validation",
          "points": [
            "La validation est le mécanisme par lequel une activité saisie par un auteur est examinée puis statuée par un ou plusieurs valideurs avant d'être exploitable dans le reporting.",
            "Le circuit s'appuie sur une chaîne de rôles ordonnée, la « Hiérarchie de validation », configurée au niveau Administration ; le bandeau « Circuit de validation : 1. … → 2. … » l'affiche en tête de la page /validation et de la file.",
            "Une chaîne vide rétablit une validation en une seule étape : tout valideur habilité (activity:validate) peut alors statuer.",
            "Permission requise pour statuer : activity:validate. Sans elle, un bandeau d'avertissement indique que l'on peut consulter la file mais pas statuer."
          ]
        },
        {
          "theme": "Les statuts d'une activité",
          "points": [
            "Brouillon (DRAFT) : activité en cours de saisie, modifiable et soumissible par son auteur.",
            "Soumis (SUBMITTED) : l'auteur a cliqué « Soumettre à validation » ; la chaîne démarre au niveau 0.",
            "En examen (IN_REVIEW) : un niveau intermédiaire a validé ; l'activité attend le niveau suivant.",
            "Validé (VALIDATED) : la validation finale (dernier niveau, ou unique niveau) est prononcée.",
            "À corriger (TO_CORRECT) : un valideur a demandé une correction ; l'activité repart vers l'auteur (modifiable, resoumissible).",
            "Rejeté (REJECTED) : la contribution est refusée ; elle reste modifiable et resoumissible par l'auteur.",
            "Consolidé (CONSOLIDATED) : activité validée puis figée pour le reporting.",
            "Archivé (ARCHIVED) : statut de classement hors circuit actif."
          ]
        },
        {
          "theme": "La file de validation (/validation)",
          "points": [
            "Titre de page « Validation hiérarchique », sous-titre « Examinez et statuez sur les activités soumises. »",
            "La file ne liste que les activités en attente de décision : statuts Soumis, En examen et À corriger.",
            "Deux compteurs : « En attente de décision » (volume de la file) et « Validées (organisation) ».",
            "Périmètre : un valideur voit les activités de son organisation ; un profil admin:manage (dont le super administrateur) voit la file au-delà de son organisation. Le filtre Pays/subdivision de la barre supérieure restreint l'ensemble.",
            "Chaque ligne affiche l'intitulé, l'auteur, la structure, la date de soumission, une pastille « Niveau X/Y · nom » et le statut ; le suffixe « · à vous » signale les dossiers relevant de votre niveau. Le lien « Examiner » ouvre le détail de l'activité.",
            "Hors file, la liste complète /activities permet de filtrer par puce de statut (Toutes, Brouillon, Soumis, En examen, Validé, Rejeté, À corriger, Consolidé, Archivé) et de rechercher par intitulé."
          ]
        },
        {
          "theme": "Le panneau « Décision de validation »",
          "points": [
            "Affiché sur la fiche /activities/[id] pour les profils activity:validate, lorsque l'activité est dans un état statuable.",
            "Une pastille « Niveau X/Y · nom » rappelle l'étape courante du circuit.",
            "Une zone de commentaire précède les boutons : « Commentaire (obligatoire pour un rejet ou une demande de correction)… »",
            "Quatre décisions : Valider (CheckCircle), Demander correction (gold), Rejeter (rouge), Consolider — Consolider n'apparaît que sur une activité au statut Validé.",
            "Si l'activité attend un autre niveau que le vôtre, un bandeau verrouillé s'affiche : « Cette activité attend la validation du niveau « … ». Vous n'êtes pas habilité à statuer à ce niveau. » et les boutons de décision sont masqués."
          ]
        },
        {
          "theme": "Effets de chaque décision",
          "points": [
            "Valider à un niveau intermédiaire : l'activité passe « En examen », monte au niveau suivant, et l'auteur reçoit une notification de validation intermédiaire (X/Y).",
            "Valider au dernier niveau (ou en validation à une seule étape) : l'activité passe « Validé ».",
            "Demander correction : statut « À corriger », la chaîne repart de zéro à la prochaine soumission ; commentaire obligatoire ; l'auteur est notifié.",
            "Rejeter : statut « Rejeté », la chaîne repart de zéro ; commentaire obligatoire ; l'auteur est notifié.",
            "Consolider : une activité « Validé » devient « Consolidé » et est rendue disponible au reporting (aucun commentaire requis).",
            "Toute décision crée une entrée d'« Historique de validation », génère une notification à l'auteur et est consignée au journal d'audit."
          ]
        },
        {
          "theme": "Habilitation au niveau courant",
          "points": [
            "Avec une hiérarchie active, seul le rôle correspondant au niveau courant peut valider ; le super administrateur peut statuer à n'importe quel niveau.",
            "L'habilitation est vérifiée côté serveur : même en consultant un dossier, un valideur d'un autre niveau ne peut pas le valider et reçoit le message d'erreur de niveau.",
            "Le marqueur « · à vous » est l'indicateur de travail prioritaire : il désigne sans ambiguïté les dossiers où vous êtes effectivement habilité."
          ]
        },
        {
          "theme": "Configuration de la hiérarchie (rappel administrateur)",
          "points": [
            "Éditée dans Administration (/admin), carte « Hiérarchie de validation » ; ouverte à admin:manage et organization:manage (pas exclusive au super administrateur).",
            "On ordonne la chaîne de rôles valideurs avec « Monter » / « Descendre », on ajoute via « — Ajouter un niveau (rôle) — » puis « Ajouter », on retire avec « Retirer ».",
            "« Enregistrer la hiérarchie » applique la chaîne ; une chaîne vide rétablit la validation en une seule étape.",
            "Une activité soumise franchit les niveaux dans l'ordre : chaque niveau doit valider avant le suivant ; le dernier prononce la validation finale."
          ]
        },
        {
          "theme": "Traçabilité et notifications",
          "points": [
            "L'« Historique de validation » de la fiche liste chronologiquement les actions avec leur libellé : Soumission, Validation, Rejet, Demande de correction, Consolidation, l'auteur de l'action, la date et le commentaire.",
            "Chaque décision notifie l'auteur (validation, rejet, correction demandée, consolidation) avec le commentaire saisi, consultable dans son centre de notifications.",
            "Le commentaire d'un rejet ou d'une demande de correction conditionne la qualité de la nouvelle soumission : il doit être précis et actionnable."
          ]
        }
      ],
      "procedures": [
        {
          "titre": "Statuer sur une activité depuis la file de validation",
          "etapes": [
            "Ouvrez « Validation hiérarchique » (/validation) depuis le menu.",
            "Lisez le bandeau « Circuit de validation » et les compteurs « En attente de décision » et « Validées (organisation) ».",
            "Repérez une activité portant le marqueur « · à vous » sur sa pastille « Niveau X/Y · nom » : c'est un dossier en attente de votre décision.",
            "Cliquez « Examiner » pour ouvrir la fiche /activities/[id].",
            "Lisez la description, les « Textes EduLex associés », les « Pièces jointes » et l'« Historique de validation » pour apprécier la conformité.",
            "Dans le panneau « Décision de validation », cliquez « Valider ».",
            "Si vous êtes au dernier niveau, l'activité passe à « Validé » ; sinon elle passe à « En examen » et monte au niveau suivant. L'auteur est notifié."
          ]
        },
        {
          "titre": "Demander une correction ou rejeter une activité",
          "etapes": [
            "Depuis /validation, cliquez « Examiner » sur l'activité à traiter (ou ouvrez-la depuis /activities).",
            "Vérifiez que la pastille indique bien votre niveau (« · à vous ») ; sinon le bandeau « Cette activité attend la validation du niveau « … ». Vous n'êtes pas habilité à statuer à ce niveau. » s'affiche et les boutons sont masqués.",
            "Dans la zone « Commentaire (obligatoire pour un rejet ou une demande de correction)… », rédigez un motif précis et actionnable.",
            "Cliquez « Demander correction » pour renvoyer l'activité à son auteur afin qu'il l'amende (statut « À corriger »), ou « Rejeter » pour la refuser (statut « Rejeté »).",
            "L'auteur reçoit une notification ; votre motif est consigné dans l'« Historique de validation »."
          ]
        },
        {
          "titre": "Consolider une activité validée",
          "etapes": [
            "Ouvrez la fiche d'une activité au statut « Validé ».",
            "Dans le panneau « Décision de validation », repérez le bouton « Consolider » (visible uniquement sur une activité validée).",
            "Cliquez « Consolider » : l'activité passe au statut « Consolidé » et devient disponible pour le reporting.",
            "Vérifiez la trace de l'opération (entrée « Consolidation ») dans l'« Historique de validation »."
          ]
        },
        {
          "titre": "Configurer le circuit de validation (administrateur)",
          "etapes": [
            "Ouvrez Administration (/admin) et localisez la carte « Hiérarchie de validation » (nécessite admin:manage ou organization:manage).",
            "Ajoutez un niveau via « — Ajouter un niveau (rôle) — » puis le bouton « Ajouter ».",
            "Ordonnez la chaîne de rôles valideurs avec « Monter » / « Descendre », ou supprimez un niveau avec « Retirer ».",
            "Cliquez « Enregistrer la hiérarchie » ; laisser la chaîne vide rétablit une validation en une seule étape.",
            "Vérifiez le résultat : le bandeau « Circuit de validation » des pages /validation et /activities/[id] reflète désormais la nouvelle chaîne."
          ]
        }
      ],
      "exercices": [
        "File de validation : connectez-vous avec un profil disposant de activity:validate, ouvrez /validation, et dressez la liste des activités marquées « · à vous ». Justifiez, pour deux dossiers, pourquoi l'un relève de votre niveau et l'autre non, en citant la pastille « Niveau X/Y · nom ».",
        "Cycle complet à deux niveaux : faites soumettre une activité par un auteur, validez-la au premier niveau (vérifiez le passage en « En examen » et la notification d'auteur), puis validez-la au dernier niveau (vérifiez le passage en « Validé »). Relevez chaque entrée correspondante dans l'« Historique de validation ».",
        "Demande de correction : sur une activité soumise, tentez de cliquer « Demander correction » sans saisir de commentaire, observez le blocage, puis rédigez un motif actionnable et renvoyez l'activité (statut « À corriger »). Vérifiez la notification reçue côté auteur et la trace « Demande de correction » dans l'historique.",
        "Consolidation et configuration : consolidez une activité « Validé » et confirmez son passage en « Consolidé ». Puis, avec un profil administrateur, ajoutez un niveau à la « Hiérarchie de validation », enregistrez, et vérifiez que le bandeau « Circuit de validation » est mis à jour sur /validation."
      ],
      "autoEvaluation": [
        {
          "question": "Quels statuts une activité doit-elle avoir pour apparaître dans la file /validation ?",
          "reponse": "Soumis, En examen ou À corriger — ce sont les seuls statuts en attente de décision listés dans la file."
        },
        {
          "question": "Quelles sont les quatre décisions du panneau « Décision de validation » et laquelle n'apparaît que conditionnellement ?",
          "reponse": "Valider, Demander correction, Rejeter et Consolider. « Consolider » n'apparaît que lorsque l'activité est au statut « Validé »."
        },
        {
          "question": "Que devient une activité lorsqu'un valideur clique « Valider » à un niveau intermédiaire, puis au dernier niveau ?",
          "reponse": "À un niveau intermédiaire, elle passe « En examen » et monte au niveau suivant (l'auteur est notifié d'une validation intermédiaire X/Y). Au dernier niveau, elle passe « Validé »."
        },
        {
          "question": "Pour quelles décisions un commentaire est-il obligatoire, et que se passe-t-il sinon ?",
          "reponse": "Pour un rejet et pour une demande de correction. Sans commentaire, l'action est refusée (« Un commentaire est requis pour un rejet ou une demande de correction. »)."
        },
        {
          "question": "Que signifie le marqueur « · à vous » sur la pastille de niveau d'une activité ?",
          "reponse": "Il indique que l'activité attend une décision à votre niveau hiérarchique et que vous êtes effectivement habilité à statuer dessus ; c'est l'indicateur de travail prioritaire."
        },
        {
          "question": "Que se passe-t-il si vous tentez de valider une activité qui attend un autre niveau que le vôtre ?",
          "reponse": "Le panneau affiche un bandeau verrouillé « Cette activité attend la validation du niveau « … ». Vous n'êtes pas habilité à statuer à ce niveau. », les boutons sont masqués et la validation est refusée côté serveur (sauf super administrateur, qui peut statuer à tout niveau)."
        },
        {
          "question": "À quoi sert la décision « Consolider » et sur quelle activité peut-on l'appliquer ?",
          "reponse": "Elle fait passer une activité du statut « Validé » à « Consolidé » et la rend disponible au reporting ; elle ne s'applique qu'à une activité déjà validée."
        },
        {
          "question": "Comment configure-t-on le circuit de validation et que produit une chaîne vide ?",
          "reponse": "Dans Administration (/admin), carte « Hiérarchie de validation » : on ajoute des niveaux (« Ajouter un niveau (rôle) »), on les ordonne (« Monter »/« Descendre »/« Retirer ») et on clique « Enregistrer la hiérarchie ». Une chaîne vide rétablit une validation en une seule étape, où tout valideur habilité peut statuer."
        },
        {
          "question": "Où retrouve-t-on la trace d'une décision et qui est informé ?",
          "reponse": "Dans l'« Historique de validation » de la fiche (entrées Soumission, Validation, Rejet, Demande de correction, Consolidation, avec auteur, date et commentaire). L'auteur de l'activité est notifié de la décision et du commentaire ; l'action est aussi consignée au journal d'audit."
        }
      ]
    },
    {
      "code": "M7",
      "titre": "Gestion des absences — Autorisations d'absence (politique, demande, validation, ratios et alertes de seuil)",
      "objectifs": [
        "Identifier les composants du module « Autorisations d'absence » (/absences) : carte « Politique d'absences », sélecteur d'année, file « Demandes à valider », formulaire « Demander une absence », formulaire « Comptabiliser directement (validée d'office) » et cartes des agents suivis.",
        "Distinguer le circuit de demande (agent → supérieur, statut « En attente ») du circuit de comptabilisation d'office (supérieur → absence « Approuvée » d'emblée).",
        "Créer une demande d'absence pour soi-même en renseignant un motif, les dates « Du »/« Au », le « Nombre de jours » auto-calculé et une « Note au supérieur ».",
        "Valider, refuser ou comptabiliser d'office une absence d'un subordonné en respectant les garde-fous (statut « En attente », périmètre du supérieur, transition atomique anti-double-décision).",
        "Régler la politique d'absences (« Congé annuel réglementaire » et « Seuil d'alerte ») et expliquer son effet sur les ratios et les pastilles d'alerte.",
        "Interpréter la comptabilité par motif, le ratio « Cumul d'absences approuvées » et les alertes « Seuil atteint » / « Quota dépassé », et relier ces seuils aux distinctions trimestrielles."
      ],
      "publicCible": "Agents et contributeurs (demande pour soi) ; supérieurs hiérarchiques de tout grade disposant de subordonnés directs (Directeur Général, Directeur, Sous-Directeur, responsables national/régional/local, chef de service) en charge de la validation, de la comptabilisation d'office et du réglage de la politique ; super administrateur (vue sur tous les agents actifs et réglage de la politique globale). Public concerné à titre indicatif : agents + supérieurs hiérarchiques.",
      "contenu": [
        {
          "theme": "Vocabulaire et finalité du module",
          "points": [
            "Le module se nomme « Autorisations d'absence » et se trouve à l'adresse /absences ; son intitulé d'en-tête est « Autorisations d'absence », sa description : « Demandez une absence, validez celles de vos agents, et suivez les jours autorisés avec ratio sur le congé annuel ».",
            "Trois usages cohabitent dans le même écran selon la position de l'utilisateur : demander une absence pour soi (si un supérieur est défini), traiter les demandes de ses subordonnés (si on est supérieur), et régler la politique globale (supérieur disposant de subordonnés ou super administrateur).",
            "L'accès à la demande pour soi est conditionné à l'existence d'un « Supérieur hiérarchique (pour le suivi des absences) » sur le compte ; sans supérieur, l'agent ne peut pas émettre de demande (le circuit exige un destinataire).",
            "Le super administrateur voit TOUS les agents actifs ; un supérieur ne voit que lui-même et ses subordonnés directs (reports directs)."
          ]
        },
        {
          "theme": "La politique d'absences : congé annuel et seuil d'alerte",
          "points": [
            "La carte « Politique d'absences » affiche deux paramètres : « Congé annuel réglementaire » (en jours) et « Seuil d'alerte » (en jours cumulés).",
            "Valeurs par défaut tant que la politique n'a pas été configurée : congé annuel réglementaire = 30 j, seuil d'alerte = 20 j.",
            "La politique est GLOBALE (un seul réglage pour la plateforme) et s'applique à tous les agents ; chaque paramètre est borné entre 1 et 366 jours.",
            "Seuls un super administrateur ou un supérieur hiérarchique disposant d'au moins un subordonné peuvent « Modifier » la politique ; un agent sans subordonné voit la carte en lecture seule."
          ]
        },
        {
          "theme": "Les cinq motifs d'absence",
          "points": [
            "Affaires personnelles — « Demande de permission pour affaires personnelles ».",
            "Congé réglementaire — « Congé annuel réglementaire ».",
            "Formation — « Absence pour formation ».",
            "Raison médicale — « Maladie, soins ou hospitalisation ».",
            "Force majeure institutionnelle — « Travaux de réhabilitation, fermeture institutionnelle, etc. ».",
            "Chaque motif possède un code couleur dans le diagramme par motif (Aff. perso. = bleu, Congé régl. = vert, Formation = doré, Médical = rouge, Force maj. = orange)."
          ]
        },
        {
          "theme": "Les trois statuts et le cycle de vie d'une absence",
          "points": [
            "« En attente » (PENDING) : demande soumise par l'agent, en attente de décision du supérieur.",
            "« Approuvée » (APPROVED) : décision favorable du supérieur, ou comptabilisation directe d'office par le supérieur (approuvée d'emblée).",
            "« Refusée » (REFUSED) : décision défavorable ; le « Motif du refus » saisi est consigné et notifié à l'agent (affiché « Refus : … » dans l'historique).",
            "Seules les absences au statut « Approuvée » sont comptabilisées dans le ratio sur le congé annuel et dans la comptabilité par motif ; les demandes « En attente » ou « Refusée » n'entrent pas dans le cumul.",
            "L'agent peut annuler (supprimer) sa propre demande tant qu'elle est « En attente » ; après décision, seule l'intervention du supérieur (ou de l'administrateur) permet de supprimer l'enregistrement."
          ]
        },
        {
          "theme": "Calcul des jours et comptabilité",
          "points": [
            "Le « Nombre de jours » se calcule automatiquement en jours calendaires inclusifs (date de début ET date de fin comprises), avec un minimum de 1 jour ; un libellé « (auto : N) » indique la valeur proposée.",
            "La valeur auto peut être surchargée manuellement, dans la limite de 1 à 366 jours ; la date de fin doit être postérieure ou égale à la date de début.",
            "L'année de rattachement de l'absence est déterminée par l'année de la date de début ; le sélecteur d'année permet de consulter l'année courante, N-1 et N-2.",
            "La carte de chaque agent affiche la comptabilité « Jours d'absence par motif (approuvés) » sous forme de diagramme à barres horizontales, et le « Cumul d'absences approuvées » sous forme N / quota jours · pourcentage."
          ]
        },
        {
          "theme": "Ratios, seuils et alertes",
          "points": [
            "Le ratio est calculé comme : cumul des jours approuvés ÷ congé annuel réglementaire, exprimé en pourcentage (arrondi).",
            "Pastille « Seuil atteint » (barre dorée) dès que le cumul approuvé est supérieur ou égal au « Seuil d'alerte ».",
            "Pastille « Quota dépassé » (barre rouge) dès que le cumul approuvé est strictement supérieur au « Congé annuel réglementaire ».",
            "Au franchissement du seuil d'alerte (passage sous le seuil → au-dessus), une notification « Seuil d'absences atteint » (type ABSENCE_ALERT) est envoyée à l'agent concerné ET à son supérieur, avec le cumul, le seuil, le congé annuel et le dernier motif.",
            "La barre de progression est plafonnée à l'affichage à 100 %, mais le pourcentage réel peut dépasser 100 % en cas de quota dépassé."
          ]
        },
        {
          "theme": "Notifications du circuit",
          "points": [
            "À la soumission d'une demande : le supérieur reçoit « Demande d'absence à valider » (type ABSENCE_REQUEST) précisant l'agent, le nombre de jours, le motif et la période.",
            "À la décision : l'agent reçoit « Demande d'absence approuvée » ou « Demande d'absence refusée » (type ABSENCE_DECISION), avec le motif, le nombre de jours, la période et, le cas échéant, le motif du refus.",
            "Toutes ces notifications pointent vers /absences et remontent dans le centre de Notifications de chaque destinataire."
          ]
        },
        {
          "theme": "Garde-fous et périmètre d'action",
          "points": [
            "Un supérieur ne peut décider, comptabiliser d'office ou supprimer que pour ses subordonnés directs ; toute action hors périmètre est refusée (« Vous n'êtes pas le supérieur hiérarchique de cet agent. »).",
            "Transition atomique anti-double-décision : le statut « En attente » est vérifié au moment même de l'écriture ; en cas de double-clic ou de seconde session, la seconde décision est bloquée (« Cette demande a déjà été traitée. ») — aucun effet de bord (notification, comptage) n'est rejoué.",
            "Une demande déjà traitée (approuvée ou refusée) ne peut plus être décidée à nouveau.",
            "Toutes les opérations (demande, décision, comptabilisation, suppression, réglage de politique) sont journalisées dans la piste d'audit."
          ]
        },
        {
          "theme": "Lien avec les distinctions trimestrielles",
          "points": [
            "Les seuils d'absence alimentent les distinctions trimestrielles consultables dans /distinctions.",
            "Règles d'attribution liées : régularité du reporting ≥ 50 %, Affaires personnelles < 20 % du congé annuel, Raison médicale < 40 % du congé annuel.",
            "Anticiper ses demandes et respecter ces seuils (seules les absences approuvées comptent) influe favorablement sur les distinctions de l'agent."
          ]
        }
      ],
      "procedures": [
        {
          "titre": "Régler la politique d'absences (congé annuel et seuil d'alerte)",
          "etapes": [
            "Ouvrez « Autorisations d'absence » (/absences).",
            "Sur la carte « Politique d'absences », vérifiez les valeurs courantes affichées (« Congé annuel réglementaire : N j · Seuil d'alerte : N j »).",
            "Cliquez sur « Modifier » (visible uniquement pour un super administrateur ou un supérieur ayant des subordonnés).",
            "Renseignez « Congé annuel réglementaire (jours) » et « Seuil d'alerte (jours cumulés) » — chaque valeur doit être comprise entre 1 et 366.",
            "Cliquez « Enregistrer » (ou « Annuler » pour abandonner).",
            "Vérifiez que les nouvelles valeurs s'appliquent aux ratios et aux pastilles « Seuil atteint » / « Quota dépassé » des cartes d'agents."
          ]
        },
        {
          "titre": "Demander une absence pour soi-même (agent)",
          "etapes": [
            "Vérifiez au préalable qu'un « Supérieur hiérarchique (pour le suivi des absences) » est bien défini sur votre compte ; sans cela, la demande est impossible.",
            "Ouvrez « Autorisations d'absence » (/absences) et sélectionnez l'année concernée si besoin.",
            "Dans la carte « Demander une absence », cliquez « Nouvelle demande ».",
            "Choisissez le « Motif » : Affaires personnelles, Congé réglementaire, Formation, Raison médicale ou Force majeure institutionnelle.",
            "Renseignez les dates « Du » et « Au » : le « Nombre de jours » se calcule automatiquement (libellé « auto : N »), ajustable manuellement si nécessaire.",
            "Saisissez éventuellement une « Note au supérieur (facultatif) ».",
            "Cliquez « Envoyer au supérieur » : la demande passe au statut « En attente » et votre supérieur reçoit la notification « Demande d'absence à valider »."
          ]
        },
        {
          "titre": "Annuler sa propre demande en attente (agent)",
          "etapes": [
            "Ouvrez « Autorisations d'absence » (/absences) sur l'année de la demande.",
            "Sur votre carte « (moi) », dépliez la liste « N demandes / enregistrements ».",
            "Repérez la demande au statut « En attente ».",
            "Cliquez sur l'icône de suppression (corbeille, intitulée « Annuler la demande ») : l'enregistrement est retiré.",
            "Note : seules les demandes encore « En attente » peuvent être annulées par l'agent lui-même ; une fois décidée, l'absence ne relève plus que du supérieur."
          ]
        },
        {
          "titre": "Approuver ou refuser une demande d'un subordonné (supérieur)",
          "etapes": [
            "Ouvrez « Autorisations d'absence » (/absences) et sélectionnez l'année concernée.",
            "Dans la carte « Demandes à valider » (badge indiquant le nombre N), examinez chaque ligne : agent, motif (pastille colorée), période « début → fin », nombre de jours et note éventuelle.",
            "Pour valider, cliquez « Approuver » : l'absence passe « Approuvée » et entre dans le cumul ; l'agent est notifié.",
            "Pour refuser, cliquez « Refuser », saisissez éventuellement le « Motif du refus (facultatif) » (ex. « période chargée, effectif insuffisant »), puis cliquez « Confirmer le refus ».",
            "Vérifiez la mise à jour : l'agent reçoit la décision en notification ; en cas d'approbation franchissant le seuil, une alerte « Seuil d'absences atteint » part vers l'agent et vous-même."
          ]
        },
        {
          "titre": "Comptabiliser directement une absence d'office (supérieur)",
          "etapes": [
            "Ouvrez « Autorisations d'absence » (/absences).",
            "Dans la carte « Comptabiliser directement (validée d'office) », cliquez « Ajouter ».",
            "Sélectionnez l'« Agent » concerné (parmi vos subordonnés ; tous les agents pour le super administrateur).",
            "Choisissez le « Motif » puis renseignez « Du » et « Au » ; ajustez le « Nombre de jours » si la valeur auto ne convient pas.",
            "Cliquez « Enregistrer » : l'absence est créée directement au statut « Approuvée » (sans passer par « En attente ») et entre immédiatement dans le cumul et la comptabilité par motif."
          ]
        },
        {
          "titre": "Contrôler les ratios et traiter une alerte de seuil",
          "etapes": [
            "Sur la carte de chaque agent suivi, lisez le bandeau « Cumul d'absences approuvées : N / quota j · pourcentage » et la barre de progression colorée.",
            "Repérez les pastilles : « Seuil atteint » (cumul ≥ seuil d'alerte) ou « Quota dépassé » (cumul > congé annuel).",
            "Dépliez « Jours d'absence par motif (approuvés) » pour analyser la répartition (Aff. perso., Congé régl., Formation, Médical, Force maj.).",
            "Croisez avec la fiche /distinctions de l'agent (régularité du reporting ≥ 50 %, Affaires personnelles < 20 %, Raison médicale < 40 %) pour apprécier l'impact.",
            "Consultez le centre de Notifications : les alertes « Seuil d'absences atteint » y remontent et signalent les franchissements à traiter."
          ]
        }
      ],
      "exercices": [
        "TP 1 — Cycle complet d'une demande : en tant qu'agent disposant d'un supérieur, créez une demande « Formation » de 3 jours avec une « Note au supérieur », vérifiez qu'elle apparaît « En attente » dans votre historique, puis (en tant que supérieur) approuvez-la et confirmez qu'elle bascule en « Approuvée » et entre dans le « Cumul d'absences approuvées ».",
        "TP 2 — Refus motivé : soumettez une demande « Affaires personnelles » sur une période chargée, puis refusez-la côté supérieur en renseignant le « Motif du refus ». Vérifiez côté agent que la notification « Demande d'absence refusée » est reçue et que la mention « Refus : … » s'affiche dans l'historique, et que la demande n'entre PAS dans le cumul.",
        "TP 3 — Politique et alertes : fixez une politique « Congé annuel réglementaire = 30 j » et « Seuil d'alerte = 20 j », puis comptabilisez d'office des absences cumulant 22 jours approuvés pour un agent. Constatez l'apparition de la pastille « Seuil atteint », la couleur dorée de la barre et la notification « Seuil d'absences atteint » envoyée à l'agent et au supérieur.",
        "TP 4 — Comptabilité par motif et distinctions : pour un agent dont le congé annuel est de 30 j, comptabilisez des absences de manière à porter « Raison médicale » à 13 jours (> 40 % de 30). Lisez le diagramme « Jours d'absence par motif (approuvés) » puis vérifiez dans /distinctions l'incidence du dépassement du seuil « Raison médicale < 40 % »."
      ],
      "autoEvaluation": [
        {
          "question": "Quelles sont les valeurs par défaut de la politique d'absences tant qu'elle n'a pas été configurée ?",
          "reponse": "Congé annuel réglementaire = 30 jours et Seuil d'alerte = 20 jours (chaque paramètre est borné entre 1 et 366 jours)."
        },
        {
          "question": "Citez les cinq motifs d'absence proposés.",
          "reponse": "Affaires personnelles, Congé réglementaire, Formation, Raison médicale et Force majeure institutionnelle."
        },
        {
          "question": "Quels statuts d'absence existent et lequel est comptabilisé dans le ratio sur le congé annuel ?",
          "reponse": "Trois statuts : En attente, Approuvée, Refusée. Seules les absences « Approuvée » sont comptabilisées dans le ratio et la comptabilité par motif."
        },
        {
          "question": "À quelle condition un agent peut-il demander une absence pour lui-même ?",
          "reponse": "Il faut qu'un « Supérieur hiérarchique (pour le suivi des absences) » soit défini sur son compte ; sinon la demande est impossible car le circuit exige un destinataire."
        },
        {
          "question": "Comment le « Nombre de jours » est-il calculé par défaut ?",
          "reponse": "En jours calendaires inclusifs (date de début et date de fin comprises), avec un minimum de 1 jour ; la valeur auto est ajustable manuellement entre 1 et 366."
        },
        {
          "question": "Quelle est la différence entre la pastille « Seuil atteint » et la pastille « Quota dépassé » ?",
          "reponse": "« Seuil atteint » apparaît quand le cumul approuvé est ≥ au Seuil d'alerte ; « Quota dépassé » apparaît quand le cumul approuvé est strictement supérieur au Congé annuel réglementaire."
        },
        {
          "question": "Qui est notifié lorsqu'une absence approuvée fait franchir le seuil d'alerte ?",
          "reponse": "L'agent concerné ET son supérieur hiérarchique reçoivent une notification « Seuil d'absences atteint » (type ABSENCE_ALERT) précisant le cumul, le seuil, le congé annuel et le dernier motif."
        },
        {
          "question": "Que se passe-t-il si deux décisions sont prises simultanément sur la même demande (double-clic ou deux sessions) ?",
          "reponse": "Grâce à la transition atomique anti-double-décision (garde du statut « En attente » dans l'écriture), seule la première décision est appliquée ; la seconde est bloquée avec « Cette demande a déjà été traitée. » et aucun effet de bord n'est rejoué."
        },
        {
          "question": "Qui peut « Modifier » la politique d'absences ?",
          "reponse": "Un super administrateur ou un supérieur hiérarchique disposant d'au moins un subordonné ; un agent sans subordonné voit la carte en lecture seule."
        },
        {
          "question": "Quelle différence entre « Demander une absence » et « Comptabiliser directement (validée d'office) » ?",
          "reponse": "« Demander une absence » crée une demande « En attente » soumise au supérieur ; « Comptabiliser directement » est réservé au supérieur et crée l'absence d'emblée au statut « Approuvée », sans étape de validation."
        },
        {
          "question": "Une demande « En attente » peut-elle être supprimée, et par qui ?",
          "reponse": "Oui : l'agent peut annuler sa propre demande tant qu'elle est « En attente » ; le supérieur (ou le super administrateur) peut supprimer les enregistrements de ses subordonnés quel que soit le statut."
        },
        {
          "question": "Quels seuils d'absence influencent les distinctions trimestrielles ?",
          "reponse": "Régularité du reporting ≥ 50 %, Affaires personnelles < 20 % du congé annuel et Raison médicale < 40 % du congé annuel."
        }
      ]
    },
    {
      "code": "M8",
      "titre": "Rapports & bilans institutionnels",
      "objectifs": [
        "Identifier le rôle du module « Reporting institutionnel » (/reports) dans la chaîne de gouvernance et distinguer les permissions report:read, report:create et report:manage.",
        "Expliquer la règle d'agrégation : seules les activités au statut « Validé » ou « Consolidé » du périmètre choisi alimentent un rapport.",
        "Créer un rapport consolidé via ReportForm en paramétrant correctement la périodicité (Hebdomadaire à Personnalisé) et le périmètre (Pays, Organisation, Structure, dates Du/Au).",
        "Interpréter un rapport généré : page de garde, « Indicateurs », « Activités réalisées » et « Références réglementaires EduLex ».",
        "Exporter un rapport au format imprimable / PDF via le bouton « Imprimer » et le diffuser aux destinataires institutionnels.",
        "Préparer en amont la matière du reporting en consolidant les activités validées et valider la cohérence du périmètre avant génération."
      ],
      "publicCible": "Profils habilités au reporting : Administrateur institutionnel (institution_admin), Responsable national (national_manager), Responsable régional (regional_manager), Responsable local / chef de service (local_manager), Directeur Général (director_general) et tout rôle disposant de la permission report:create ou report:manage. Les profils en lecture seule (report:read : Directeur, Sous-Directeur, Contrôleur/auditeur, Lecteur) sont concernés pour la consultation et l'impression, mais ne génèrent ni ne suppriment de rapport. Le Super Administrateur (admin:manage) dispose en plus de la vue inter-organisations.",
      "contenu": [
        {
          "theme": "Place du reporting dans la gouvernance EduWeb",
          "points": [
            "Le module « Reporting institutionnel » (/reports) produit des rapports consolidés à partir des activités validées : il matérialise la remontée d'information du terrain vers le pilotage.",
            "Le reporting se situe en aval du circuit de saisie et de validation des activités : un rapport n'est fiable que si les activités sources ont été correctement validées puis consolidées.",
            "Le rapport relie trois piliers : l'activité de gouvernance administrative (les activités), le référentiel réglementaire EduLex (les textes cités) et la traçabilité institutionnelle (auteur, structure, période).",
            "Toute génération et toute suppression de rapport sont tracées dans le journal d'audit (action « generate » / « delete »)."
          ]
        },
        {
          "theme": "Permissions et périmètre de visibilité",
          "points": [
            "report:read : consultation de la liste et du détail des rapports, impression possible ; le bouton « Générer un rapport » ne s'affiche pas.",
            "report:create : composer, générer, exporter et supprimer un rapport ; report:manage : gérer pleinement les rapports.",
            "Sans la permission admin:manage, la liste des rapports est restreinte à la propre organisation de l'utilisateur (organizationId).",
            "Avec admin:manage (Super Administrateur), la liste couvre TOUS les rapports, au-delà d'une seule organisation."
          ]
        },
        {
          "theme": "Périodicité et périmètre d'un rapport",
          "points": [
            "Six périodicités disponibles : Hebdomadaire, Mensuel (valeur par défaut), Trimestriel, Semestriel, Annuel, Personnalisé.",
            "La périodicité est un libellé descriptif du rapport ; le filtrage temporel effectif des activités s'opère via les dates « Du » et « Au ».",
            "Le périmètre se compose de quatre filtres facultatifs : Pays, Organisation, Structure, et l'intervalle de dates Du/Au.",
            "Un filtre laissé vide élargit le périmètre : « Tous les pays », « Toutes les organisations », « Toutes les structures », « Toutes périodes ».",
            "Le périmètre détermine exactement les activités prises en compte : il doit être renseigné avec soin pour éviter les erreurs de portée."
          ]
        },
        {
          "theme": "Règle d'agrégation des activités",
          "points": [
            "Seules les activités au statut « Validé » (VALIDATED) ou « Consolidé » (CONSOLIDATED) sont agrégées ; les brouillons, soumissions, examens, rejets et activités à corriger sont exclus.",
            "Les activités supprimées (deletedAt) ne sont jamais comptabilisées.",
            "L'agrégation produit des indicateurs : nombre total d'activités consolidées et répartition par statut.",
            "Le rapport collecte automatiquement les références réglementaires EduLex citées par les activités agrégées (code et titre du texte).",
            "Bonne pratique : consolider les activités validées avant la génération, afin de marquer explicitement leur entrée dans le reporting."
          ]
        },
        {
          "theme": "Lecture et structure d'un rapport généré",
          "points": [
            "Page de garde : titre du rapport, mention « Rapport institutionnel », date et auteur de génération, badge de périodicité, et rappel du périmètre (Pays, Organisation, Période).",
            "Indicateurs : carte « Activités consolidées » (total) et cartes de répartition par statut.",
            "Activités réalisées : tableau Activité / Auteur / Structure / Statut.",
            "Références réglementaires EduLex : liste des textes cités (titre + code) ; mention « Aucune référence réglementaire citée » si vide.",
            "Statut du rapport : « Brouillon », « Généré » (état d'un rapport fraîchement produit) ou « Archivé »."
          ]
        },
        {
          "theme": "Export et diffusion",
          "points": [
            "L'export s'effectue depuis le détail du rapport via le bouton « Imprimer / PDF » qui ouvre la boîte de dialogue d'impression du navigateur.",
            "Le format obtenu peut être imprimé physiquement ou enregistré en PDF, pour archivage ou diffusion institutionnelle.",
            "Les éléments d'interface non destinés à l'impression (boutons, navigation) sont masqués à l'export (classe no-print).",
            "À ne pas confondre avec le « Bilan & synthèse » personnel (/bilan), qui suit le taux de réalisation individuel par période et dispose de son propre « Exporter en PDF »."
          ]
        }
      ],
      "procedures": [
        {
          "titre": "Préparer la matière : consolider les activités validées",
          "etapes": [
            "Ouvrez « Activités » (/activities) et repérez les activités au statut « Validé » de votre périmètre.",
            "Ouvrez le détail d'une activité validée prête à entrer dans le reporting.",
            "Cliquez « Consolider » : l'activité passe au statut « Consolidé » et devient éligible à l'agrégation dans un rapport.",
            "Répétez l'opération pour l'ensemble des activités à intégrer, afin de fiabiliser le futur rapport."
          ]
        },
        {
          "titre": "Générer un rapport institutionnel consolidé",
          "etapes": [
            "Ouvrez « Reporting institutionnel » (/reports) depuis le menu.",
            "Cliquez « Générer un rapport » (/reports/new). Le bouton n'apparaît qu'avec report:create ou report:manage.",
            "Dans le formulaire, saisissez le « Titre du rapport * » (au moins 3 caractères), par exemple « Rapport mensuel d'activités — Juin 2026 ».",
            "Choisissez la « Périodicité * » dans la liste : Hebdomadaire, Mensuel, Trimestriel, Semestriel, Annuel ou Personnalisé.",
            "Définissez le périmètre : « Pays » (sinon « Tous les pays »), « Organisation » (sinon « Toutes les organisations »), « Structure » (sinon « Toutes les structures »).",
            "Renseignez l'intervalle « Du » et « Au » pour borner les activités dans le temps (laissez vide pour « Toutes périodes »).",
            "Cliquez « Générer le rapport » : le système agrège les activités « Validé » / « Consolidé » du périmètre, calcule les indicateurs et collecte les références EduLex citées.",
            "Vous êtes redirigé vers la fiche du rapport généré : vérifiez la page de garde, les « Indicateurs », les « Activités réalisées » et les « Références réglementaires EduLex »."
          ]
        },
        {
          "titre": "Exporter ou imprimer un rapport",
          "etapes": [
            "Ouvrez « Reporting institutionnel » (/reports) et cliquez sur la ligne du rapport voulu pour ouvrir son détail (/reports/{id}).",
            "Contrôlez le contenu : page de garde, indicateurs, activités réalisées et références réglementaires EduLex.",
            "Cliquez « Imprimer / PDF » en haut de la fiche.",
            "Dans la boîte de dialogue du navigateur, imprimez ou choisissez « Enregistrer au format PDF ».",
            "Diffusez le document obtenu aux destinataires institutionnels concernés."
          ]
        },
        {
          "titre": "Consulter la liste des rapports de son périmètre",
          "etapes": [
            "Ouvrez « Reporting institutionnel » (/reports).",
            "Parcourez le tableau : colonnes Rapport (et pays), Périodicité, Généré par, Date, Statut.",
            "Repérez le rapport recherché à l'aide de la périodicité et de la date de génération.",
            "Cliquez sur le titre du rapport pour ouvrir son détail.",
            "Note : sans admin:manage, seuls les rapports de votre propre organisation sont listés."
          ]
        },
        {
          "titre": "Supprimer un rapport obsolète (report:create / manage)",
          "etapes": [
            "Vérifiez d'abord que le rapport n'est plus nécessaire (un rapport supprimé n'est pas régénérable à l'identique sans relancer la génération).",
            "Ouvrez le détail du rapport à retirer.",
            "Déclenchez la suppression (action réservée à report:create / report:manage) et confirmez.",
            "L'opération est tracée au journal d'audit ; vous êtes renvoyé vers la liste /reports.",
            "Au besoin, régénérez un rapport corrigé via « Générer un rapport »."
          ]
        }
      ],
      "exercices": [
        "TP1 — Chaîne complète : Consolidez au moins deux activités « Validé » de votre périmètre, puis générez un « Rapport mensuel d'activités — Juin 2026 » (Périodicité = Mensuel) restreint à votre organisation, avec un intervalle Du = 01/06/2026 / Au = 30/06/2026. Vérifiez que le total des « Indicateurs » correspond bien aux activités consolidées.",
        "TP2 — Effet du périmètre : Générez deux rapports sur la même période, l'un sans filtre Structure (« Toutes les structures »), l'autre limité à une structure précise. Comparez le nombre d'« Activités consolidées » et expliquez l'écart.",
        "TP3 — Export et diffusion : Ouvrez un rapport généré, contrôlez sa page de garde et ses « Références réglementaires EduLex », puis exportez-le en PDF via « Imprimer / PDF ». Vérifiez que la navigation et les boutons n'apparaissent pas dans le document exporté.",
        "TP4 — Lecture seule : Connecté avec un profil report:read (ex. Contrôleur/auditeur), constatez l'absence du bouton « Générer un rapport », ouvrez un rapport existant, imprimez-le, et vérifiez que la suppression n'est pas proposée."
      ],
      "autoEvaluation": [
        {
          "question": "Quels statuts d'activité sont agrégés dans un rapport institutionnel ?",
          "reponse": "Uniquement les activités au statut « Validé » (VALIDATED) et « Consolidé » (CONSOLIDATED). Les autres statuts (Brouillon, Soumis, En examen, Rejeté, À corriger, Archivé) et les activités supprimées sont exclus."
        },
        {
          "question": "Quelle permission faut-il pour voir le bouton « Générer un rapport », et que permet report:read seul ?",
          "reponse": "Le bouton « Générer un rapport » exige report:create ou report:manage. Avec report:read seul, l'utilisateur peut uniquement consulter la liste et le détail des rapports et les imprimer, sans générer ni supprimer."
        },
        {
          "question": "Citez les six périodicités proposées dans ReportForm et indiquez la valeur par défaut.",
          "reponse": "Hebdomadaire, Mensuel, Trimestriel, Semestriel, Annuel, Personnalisé. La valeur par défaut est « Mensuel »."
        },
        {
          "question": "Que se passe-t-il si l'on laisse les filtres Pays, Organisation et Structure vides ?",
          "reponse": "Le périmètre est élargi au maximum : le rapport porte sur « Tous les pays », « Toutes les organisations » et « Toutes les structures ». Si les dates Du/Au sont également vides, il couvre « Toutes périodes »."
        },
        {
          "question": "Quelles sont les quatre grandes sections d'un rapport généré ?",
          "reponse": "La page de garde (titre, périodicité, périmètre, auteur/date), les « Indicateurs » (total et répartition par statut), les « Activités réalisées » (tableau Activité/Auteur/Structure/Statut) et les « Références réglementaires EduLex »."
        },
        {
          "question": "Comment exporte-t-on un rapport et sous quel format ?",
          "reponse": "Depuis le détail du rapport, via le bouton « Imprimer / PDF » qui ouvre la boîte de dialogue d'impression du navigateur : on peut imprimer physiquement ou enregistrer au format PDF."
        },
        {
          "question": "Un Responsable national sans admin:manage voit-il les rapports d'une autre organisation ?",
          "reponse": "Non. Sans la permission admin:manage, la liste des rapports est restreinte à sa propre organisation ; seule la permission admin:manage (Super Administrateur) donne accès à tous les rapports."
        },
        {
          "question": "Pourquoi consolider les activités avant de générer un rapport, alors que les activités « Validé » sont déjà agrégées ?",
          "reponse": "Parce que la consolidation marque explicitement l'entrée d'une activité validée dans le reporting et fiabilise la matière du rapport ; c'est une bonne pratique de gouvernance, même si les statuts « Validé » et « Consolidé » sont tous deux agrégés."
        }
      ]
    },
    {
      "code": "M9",
      "titre": "Module M9 — Le référentiel réglementaire EduLex : textes, codification, vérification V0→V4 et circuit de validation",
      "objectifs": [
        "Identifier la nature internationale d'EduLex et situer chaque texte dans son contexte (pays, juridiction, ministère émetteur, secteur, type, statut, niveau de vérification et confidentialité).",
        "Déposer un texte réglementaire conforme via le formulaire guidé et expliquer la codification automatique au format PAYS-JUR-SECTEUR-TYPE-ANNÉE-NUMÉRO-VERSION.",
        "Distinguer les cinq niveaux de vérification (V0 à V4) et leur signification, et décrire le circuit de validation V0→V4 appuyé sur une source officielle.",
        "Faire progresser un texte dans le circuit depuis la « File de validation » et la fiche, en respectant l'obligation de source officielle pour V3, V4 et la mise en vigueur.",
        "Réaliser un import d'amorçage CSV/TSV en masse et en maîtriser les conséquences (textes marqués V0 / « Importé non vérifié »).",
        "Administrer les référentiels structurants d'EduLex (pays, ministères/gouvernements, secteurs) et appliquer correctement les niveaux de confidentialité et les statuts de cycle de vie."
      ],
      "publicCible": "Rôles EduLex : Super Administrateur EduLex (edulex_super_admin), Administrateur pays (edulex_country_admin), Administrateur ministériel (edulex_ministry_admin), Service technique déposant (edulex_depositor), Validateur documentaire (edulex_doc_validator) et Validateur juridique (edulex_legal_validator). À titre de sensibilisation : tout profil disposant d'edulex:read consultant le référentiel.",
      "contenu": [
        {
          "theme": "1. EduLex, un référentiel réglementaire international par conception",
          "points": [
            "EduLex est le pilier réglementaire d'EduWeb Governance : un référentiel international de textes de droit éducatif. EduLex CI (Côte d'Ivoire) n'est qu'une déclinaison nationale parmi d'autres.",
            "Chaque texte est rattaché à un pays, une juridiction et un niveau de vérification. Le filtre Pays de la barre supérieure cadre tout le travail ; la valeur « tous les pays » (ALL) donne la vision internationale complète.",
            "Page d'entrée /edulex : 4 KPI — « Textes au total », « En vigueur », « À vérifier (V0 / à vérifier) », « Certifiés V4 » — une recherche plein texte et quatre filtres (catégorie, statut, type, niveau).",
            "Bandeau de rappel permanent : « EduLex est international par conception… Les textes V0 (non vérifiés) et non en vigueur sont signalés. »",
            "Permissions clés du module : edulex:read (consulter), edulex:create (déposer / importer), edulex:validate (vérifier, changer le statut), edulex:publish (mettre en vigueur), edulex:manage (référentiels et suppression), edulex:update (téléverser des documents source)."
          ]
        },
        {
          "theme": "2. Anatomie d'un texte réglementaire et codification automatique",
          "points": [
            "Métadonnées principales : titre officiel, numéro officiel, pays, juridiction, ministère émetteur, secteur, catégorie, langue (Français / Anglais), version courante, résumé analytique et URL source officielle.",
            "Trois dates structurantes : date de signature, date de publication, date d'entrée en vigueur.",
            "Le « Code EduLex » est généré automatiquement et affiché en aperçu en temps réel dans le formulaire. Format : PAYS-JUR-SECTEUR-TYPE-ANNÉE-NUMÉRO-VERSION. Exemple : CI-MENA-EDU-DEC-2026-004-V1.",
            "Mécanique du code : le segment juridiction reprend le code ministère (ou à défaut le code juridiction, sinon « GEN ») ; le secteur vaut « GEN » s'il est absent ; le numéro est séquentiel par pays et par année (sur 3 chiffres) ; l'unicité du code est garantie par incrément automatique.",
            "Documents source : on peut téléverser des PDF officiels (badge « Officiel »). La fiche propose aussi « Télécharger (PDF) », « Markdown » et « Consulter la source officielle »."
          ]
        },
        {
          "theme": "3. Types de textes et catégories",
          "points": [
            "Textes nationaux : Constitution (CONST), Loi (LOI), Ordonnance (ORD), Décret (DEC), Arrêté (ARR), Circulaire (CIRC), Recommandation (REC).",
            "Normes internationales (EduLex Global) : Convention internationale (CONV), Traité (TRAITE), Déclaration (DECL), Pacte international (PACTE), Protocole (PROTO), Règlement (REGL), Statuts (STATUTS), Code (CODE).",
            "Le type sélectionné apparaît dans le code (segment TYPE) et conditionne la recherche par filtre « Tous les types ».",
            "Les catégories sont un axe de classement complémentaire, filtrable via « Toutes les catégories ».",
            "Relations entre textes documentées sur la fiche : Remplace, Modifie, Abroge, Lié à, Cite."
          ]
        },
        {
          "theme": "4. Les cinq niveaux de vérification V0 → V4",
          "points": [
            "V0 · Non vérifié : entrée importée ou indexée, non encore vérifiée. Tout dépôt et tout import démarrent en V0.",
            "V1 · Vérif. documentaire : vérification documentaire minimale.",
            "V2 · Service technique : vérification par le service technique.",
            "V3 · Validation juridique : validation juridique ou institutionnelle — une source officielle (URL) devient obligatoire.",
            "V4 · Certifié : texte officiellement certifié dans la base — source officielle également obligatoire.",
            "Un texte V0 affiche un avertissement : « entrée non vérifiée. Ne pas considérer comme juridiquement certifié. » Le badge de niveau est visible partout (fiche, listes, file)."
          ]
        },
        {
          "theme": "5. Statuts du texte et cycle de vie",
          "points": [
            "Statuts : En vigueur (IN_FORCE), Abrogé, Modifié, Document de référence, Remplacé, Suspendu, En attente de validation, À vérifier, Archivé, Brouillon, Importé non vérifié.",
            "Statuts d'obsolescence (avertissement « ce texte n'est pas en vigueur ») : Abrogé, Remplacé, Suspendu — relayés ensuite dans les Archives (colonne « Textes obsolètes »).",
            "Le statut initial est choisi au dépôt (par défaut « En attente de validation »). L'import force le statut « Importé non vérifié ».",
            "Niveau de vérification et statut sont deux axes indépendants : les boutons V0–V4 règlent le niveau ; le sélecteur « Statut du texte » + « Appliquer » règle le statut.",
            "La mise en vigueur (statut « En vigueur ») exige la permission edulex:publish ET une source officielle renseignée."
          ]
        },
        {
          "theme": "6. Le circuit de validation et ses garanties de traçabilité",
          "points": [
            "Deux portes d'entrée : la « File de validation » (/edulex/validation) qui regroupe les textes en attente, et la fiche individuelle via le panneau « Validation à partir de sources officielles ».",
            "La file affiche « Textes à traiter » et « Non vérifiés (V0) » et liste les textes aux statuts En attente / À vérifier / Importé non vérifié / Brouillon ou aux niveaux V0/V1/V2.",
            "Règle d'or : une « Source officielle (URL) » (Journal Officiel, SGG, portail ministériel) est obligatoire pour valider en V3 (juridique), V4 (certifié) et pour la mise en vigueur.",
            "Chaque action alimente le « Journal de validation » (décision, acteur, date, transition de niveau/statut, commentaire) et la traçabilité « Déposé par » / « Validé par ».",
            "Séparation des responsabilités : le Déposant alimente (V0) ; le Validateur documentaire vérifie (jusqu'à V4) sans publier ni téléverser ; le Validateur juridique vérifie ET publie ; les administrateurs gèrent en plus les référentiels."
          ]
        },
        {
          "theme": "7. Import d'amorçage en masse",
          "points": [
            "Accès via le raccourci « Import d'amorçage » (/edulex/import), réservé à edulex:create ou edulex:manage.",
            "Collage CSV / TSV, colonnes dans l'ordre : titre, type, numéro officiel, code ministère, code secteur, résumé. Séparateur virgule, point-virgule ou tabulation ; la 1ʳᵉ ligne d'en-tête est auto-détectée.",
            "Tous les textes importés sont marqués V0 et au statut « Importé non vérifié », rattachés au « Pays d'affectation » choisi.",
            "« Prévisualiser » affiche un tableau de contrôle (Titre, Type, N°, Min., Sect.) ; « Importer N ligne(s) » exécute l'import et renvoie un bilan « N texte(s) importé(s)…, X ignoré(s) en V0 ».",
            "Les codes ministère / secteur sont rapprochés par leur code exact (insensible à la casse) : un code inconnu n'empêche pas l'import mais ne renseigne pas le segment correspondant."
          ]
        },
        {
          "theme": "8. Niveaux de confidentialité",
          "points": [
            "Trois niveaux : Public, Restreint, Confidentiel.",
            "Choisi au dépôt (par défaut « Public ») ; affiché en badge sur la fiche du texte.",
            "L'import d'amorçage crée les textes en « Public » par défaut.",
            "La confidentialité conditionne la diffusion du texte au-delà des rôles EduLex (lecteurs, Academy, public autorisé)."
          ]
        },
        {
          "theme": "9. Référentiels structurants : pays, ministères/gouvernements, secteurs",
          "points": [
            "Pays & juridictions (/edulex/countries) : liste avec drapeau, nom, namespace/code, nombre de textes, code ISO et mention « inactif ». Ajout via « Ajouter un pays » (Nom, Code ISO, Drapeau emoji, Namespace).",
            "Ministères & gouvernements (/edulex/ministries) : déclarer un gouvernement (statut piloté par dates : À venir / En vigueur / Archivé), ajouter / éditer / supprimer des ministères (Nom, Code ex. MENA, Pays) — unitairement ou en masse.",
            "Secteurs réglementaires (/edulex/sectors) : ajouter (Nom, Code ex. EDU, Pays ou « Tous les pays » pour un secteur international), éditer, supprimer ; tableau « Secteur, Code, Pays, Textes ».",
            "La gestion des trois référentiels requiert edulex:manage. La suppression d'un texte EduLex (suppression logique) requiert également edulex:manage.",
            "Bonne pratique : créer d'abord pays, gouvernement, ministère et secteur, puis déposer ou importer, pour que les rattachements et codes soient correctement résolus."
          ]
        }
      ],
      "procedures": [
        {
          "titre": "Déposer un nouveau texte réglementaire (créé en V0)",
          "etapes": [
            "Ouvrir « EduLex » (/edulex) puis cliquer « Déposer un texte » (visible avec edulex:create).",
            "Saisir le « Titre officiel * », sélectionner le « Pays * » (drapeau + nom) et le « Type * » (Loi, Décret, Arrêté, Convention internationale…).",
            "Renseigner « Ministère émetteur » (champ de recherche), « Secteur », « Juridiction » et « Numéro officiel » (ex. 2026-004).",
            "Saisir les dates : « Date de signature », « Date de publication », « Entrée en vigueur ».",
            "Choisir le « Statut initial », la « Confidentialité » (Public / Restreint / Confidentiel) et la « Langue » (Français / Anglais).",
            "Rédiger le « Résumé analytique » et coller l'« URL source officielle ».",
            "Contrôler l'aperçu du « Code EduLex (généré automatiquement) », puis cliquer « Déposer le texte ». Le texte est créé en V0 et s'ouvre sur sa fiche."
          ]
        },
        {
          "titre": "Faire progresser un texte dans le circuit V0 → V4",
          "etapes": [
            "Depuis /edulex, cliquer « File de validation » (/edulex/validation) ou ouvrir directement la fiche du texte.",
            "Repérer le texte (titre, code, drapeau + pays, badge de statut, badge de niveau) et cliquer « Examiner ».",
            "Sur la fiche, télécharger le texte (« Télécharger (PDF) » / « Markdown »), consulter les « Documents source » et ouvrir « Consulter la source officielle » pour confronter le contenu.",
            "Dans le panneau « Validation à partir de sources officielles », renseigner la « Source officielle (URL) » et, si utile, un « Commentaire de validation (facultatif) ».",
            "Cliquer le bouton du niveau visé (V1, V2, V3, puis V4), en respectant la progression. Rappel : V3 et V4 exigent une source officielle, sinon l'action est refusée.",
            "Vérifier que le « Journal de validation » et la traçabilité (« Validé par », niveau, version) reflètent la décision."
          ]
        },
        {
          "titre": "Changer le statut d'un texte (obsolescence ou retour à vérifier)",
          "etapes": [
            "Ouvrir la fiche du texte (/edulex/texts/[id]).",
            "Dans le panneau de validation, renseigner si possible la « Source officielle (URL) » justifiant le changement et un « Commentaire de validation ».",
            "Dérouler le sélecteur « Statut du texte » et choisir le statut adéquat (Abrogé, Modifié, Remplacé, Suspendu, À vérifier, Archivé…).",
            "Cliquer « Appliquer ».",
            "Contrôler que l'avertissement d'obsolescence s'affiche pour Abrogé / Remplacé / Suspendu, et que le texte remonte dans les Archives le cas échéant."
          ]
        },
        {
          "titre": "Publier un texte certifié (mise en vigueur)",
          "etapes": [
            "Ouvrir la fiche d'un texte vérifié dont le statut n'est pas déjà « En vigueur ».",
            "S'assurer que le niveau de vérification et la traçabilité (« Validé par », sources) sont satisfaisants.",
            "Vérifier qu'une « Source officielle (URL) » est renseignée (obligatoire pour la mise en vigueur).",
            "Cliquer « Publier (mettre en vigueur) » (bouton visible avec edulex:publish).",
            "Confirmer que le statut bascule en « En vigueur », que les avertissements V0 / obsolète ont disparu et que le KPI « En vigueur » de /edulex est incrémenté."
          ]
        },
        {
          "titre": "Importer un lot de textes par collage CSV/TSV",
          "etapes": [
            "Depuis /edulex, ouvrir le raccourci « Import d'amorçage » (/edulex/import).",
            "Sélectionner le « Pays d'affectation » (drapeau + nom).",
            "Préparer les données aux colonnes attendues — titre, type, numéro officiel, code ministère, code secteur, résumé — puis les coller dans « Données CSV / TSV collées ».",
            "Cliquer « Prévisualiser » et contrôler le tableau (Titre, Type, N°, Min., Sect.) ligne par ligne.",
            "Cliquer « Importer N ligne(s) » et lire le bilan « N texte(s) importé(s)…, X ignoré(s) en V0 ».",
            "Suivre « Voir EduLex → » pour retrouver les textes importés (tous V0 / « Importé non vérifié ») et planifier leur reprise dans la file de validation."
          ]
        },
        {
          "titre": "Administrer les référentiels (pays, ministère, secteur)",
          "etapes": [
            "Pays : ouvrir « Pays » (/edulex/countries), remplir « Ajouter un pays » (Nom du pays, Code ISO, Drapeau emoji, Namespace) puis « Ajouter le pays ».",
            "Gouvernement & ministère : ouvrir « Ministères » (/edulex/ministries), au besoin « Déclarer un gouvernement » (avec ses dates d'entrée en vigueur), puis dans « Ajouter un ministère » saisir Nom, Code (ex. MENA), Pays et cliquer « Ajouter le ministère ».",
            "Secteur : ouvrir « Secteurs » (/edulex/sectors), renseigner « Nom du secteur », « Code » (ex. EDU) et « Pays » (ou « Tous les pays »), puis « Ajouter le secteur ».",
            "Contrôler la prise en compte dans les tableaux (nombre de textes, code, pays/international, gouvernement).",
            "Toutes ces actions exigent edulex:manage ; créer les référentiels avant de déposer/importer pour garantir des rattachements et un code corrects."
          ]
        }
      ],
      "exercices": [
        "TP1 — Dépôt complet : déposer un Décret fictif pour la Côte d'Ivoire, ministère MENA, secteur EDU. Avant de valider, noter le « Code EduLex » affiché en aperçu et vérifier qu'il respecte le format PAYS-JUR-SECTEUR-TYPE-ANNÉE-NUMÉRO-VERSION (ex. CI-MENA-EDU-DEC-2026-001-V1). Confirmer après dépôt que le texte est bien en V0.",
        "TP2 — Circuit V0→V4 : à partir d'un texte en V0, le faire progresser jusqu'à V2 sans source, puis tenter de passer en V3 sans renseigner d'URL. Observer le message de refus (« Une source officielle (URL) est requise pour valider en V3 »), renseigner la source, repasser en V3 puis V4, et relire le « Journal de validation ».",
        "TP3 — Import d'amorçage : préparer un fichier CSV de 5 lignes (dont une avec un code ministère volontairement erroné et une ligne sans titre). Coller, « Prévisualiser », importer, puis interpréter le bilan « importé(s) / ignoré(s) » et vérifier que tous les textes créés sont en V0 / « Importé non vérifié ».",
        "TP4 — Cycle de vie et confidentialité : sur un texte « En vigueur », le passer en « Remplacé », documenter la relation avec le texte qui s'y substitue, vérifier l'avertissement d'obsolescence et sa présence dans les Archives ; puis créer un texte en confidentialité « Restreint » et observer le badge correspondant sur la fiche."
      ],
      "autoEvaluation": [
        {
          "question": "À quel niveau de vérification entre tout texte nouvellement déposé ou importé dans EduLex ?",
          "reponse": "Au niveau V0 (non vérifié). Le dépôt comme l'import d'amorçage créent systématiquement le texte en V0 ; pour l'import, le statut est en outre « Importé non vérifié »."
        },
        {
          "question": "Quel est le format du code EduLex et que signifie chaque segment ?",
          "reponse": "PAYS-JUR-SECTEUR-TYPE-ANNÉE-NUMÉRO-VERSION (ex. CI-MENA-EDU-DEC-2026-004-V1) : code pays ISO, code juridiction (repris du code ministère, sinon « GEN »), code secteur (sinon « GEN »), type de texte, année, numéro séquentiel par pays/année sur 3 chiffres, et version. Le code est généré automatiquement et son unicité garantie."
        },
        {
          "question": "Pour quelles actions une « Source officielle (URL) » est-elle obligatoire ?",
          "reponse": "Pour valider en V3 (validation juridique), en V4 (certifié) et pour mettre un texte en vigueur (statut « En vigueur »). Sans source, l'action est refusée avec un message explicite."
        },
        {
          "question": "Quelle est la différence entre le niveau de vérification et le statut d'un texte ?",
          "reponse": "Ce sont deux axes indépendants. Le niveau de vérification (V0 à V4) mesure la fiabilité documentaire et se règle par les boutons V0–V4. Le statut (En vigueur, Abrogé, Modifié, Remplacé, Suspendu, etc.) décrit le cycle de vie réglementaire et se règle via le sélecteur « Statut du texte » suivi du bouton « Appliquer »."
        },
        {
          "question": "Quelle permission est nécessaire pour publier (mettre en vigueur) un texte, et est-ce le même rôle que celui qui dépose ?",
          "reponse": "La permission edulex:publish est requise pour la mise en vigueur. Ce n'est pas le rôle du déposant : le Service technique déposant (edulex:create) ne peut ni vérifier ni publier ; la publication relève du Validateur juridique et des administrateurs EduLex disposant d'edulex:publish."
        },
        {
          "question": "Quelles colonnes, dans quel ordre, sont attendues pour un import CSV/TSV, et quel séparateur peut-on utiliser ?",
          "reponse": "Dans l'ordre : titre, type, numéro officiel, code ministère, code secteur, résumé. Le séparateur peut être la virgule, le point-virgule ou la tabulation, et la première ligne d'en-tête est détectée automatiquement."
        },
        {
          "question": "Quels statuts déclenchent l'avertissement d'obsolescence et où retrouve-t-on ensuite ces textes ?",
          "reponse": "Les statuts Abrogé, Remplacé et Suspendu déclenchent l'avertissement « ce texte n'est pas en vigueur ». Ces textes (avec les Archivés) sont ensuite listés dans les Archives, colonne « Textes obsolètes »."
        },
        {
          "question": "Citez les trois niveaux de confidentialité et le niveau appliqué par défaut.",
          "reponse": "Public, Restreint et Confidentiel. Le niveau par défaut au dépôt et lors de l'import d'amorçage est « Public »."
        },
        {
          "question": "Quelle permission permet de gérer les référentiels pays, ministères/gouvernements et secteurs, et quel ordre de création est recommandé ?",
          "reponse": "La permission edulex:manage. Il est recommandé de créer d'abord les référentiels (pays, gouvernement, ministère, secteur) avant de déposer ou d'importer des textes, afin que les rattachements et le code EduLex soient correctement résolus."
        }
      ]
    },
    {
      "code": "M10",
      "titre": "M10 — EduLex Academy : parcours, leçons, quiz, badges, classement et progression",
      "objectifs": [
        "Identifier l'architecture pédagogique d'EduLex Academy : catégories, parcours, unités, leçons, questions, et les 5 niveaux de compétence (Découverte, Compréhension, Application, Maîtrise, Expert / Référent).",
        "Distinguer les trois rôles du module (academy_editor, academy_learner, public_authorized) et leurs permissions effectives (academy:manage vs academy:read).",
        "Créer, relier à un texte EduLex source, publier et dépublier une question de quiz (QCU, QCM, Vrai/Faux) depuis l'Administration Academy, avec les vrais libellés du formulaire.",
        "Suivre un parcours, répondre à un quiz et interpréter le feedback pédagogique (XP gagnés, explication, renvoi « Voir le texte → », badge « à vérifier » V0).",
        "Expliquer les mécaniques de gamification : attribution des XP (une seule fois par question), calcul du niveau (un niveau tous les 100 XP), série d'apprentissage, badges et classement citoyen.",
        "Générer les modules d'évaluation officiels à partir des textes en vigueur et vérifiés, et exploiter « Ma progression » pour cibler les « Textes à revoir »."
      ],
      "publicCible": "Éditeurs Academy (academy_editor) responsables de la conception et de la diffusion des questions de quiz ; Citoyens apprenants (academy_learner) qui suivent les parcours gamifiés ; Public autorisé (public_authorized) en consultation et participation aux quiz, en lecture seule sur le reste de la plateforme. Module également utile aux administrateurs et responsables institutionnels souhaitant comprendre le pilier formation.",
      "contenu": [
        {
          "theme": "Panorama d'EduLex Academy et place dans la plateforme",
          "points": [
            "EduLex Academy est le troisième pilier de la plateforme : un espace de formation citoyenne gamifié adossé au référentiel réglementaire EduLex (chaque question cite son texte source et son niveau de confiance).",
            "Le titre de l'espace s'adapte au pays sélectionné dans la barre supérieure : « EduLex Academy » par défaut, « EduLex CI Academy » lorsque la Côte d'Ivoire est sélectionnée.",
            "La page d'accueil /academy présente un « hero » de progression personnelle (compteurs XP, Série, Niveau), des accès rapides (Ma progression, Badges & trophées, Classement), les 5 niveaux de compétence, les catégories de parcours et les parcours publiés du pays.",
            "Le filtre Pays restreint les parcours affichés ; la liste ne montre que les parcours publiés (isPublished), triés par niveau puis ordre, et est plafonnée à 24 parcours."
          ]
        },
        {
          "theme": "Hiérarchie des contenus pédagogiques",
          "points": [
            "L'arborescence est : Catégorie de parcours → Parcours (Niveau 1 à 5) → Unité (numérotée, avec prérequis éventuel matérialisé par un cadenas) → Leçon → Questions.",
            "Un parcours porte un niveau de compétence, une catégorie, une description et un nombre d'unités ; chaque leçon affiche son nombre de questions.",
            "Le libellé hiérarchique d'une leçon utilisé à la création de question est de la forme « parcours › unité › leçon ».",
            "Côté éditeur, la structure (parcours, unités, leçons) doit préexister : l'éditeur Academy gère les questions, mais ne crée pas l'ossature des parcours dans son périmètre."
          ]
        },
        {
          "theme": "Les 5 niveaux de compétence",
          "points": [
            "Niveau 1 — Découverte : identifier les notions de base.",
            "Niveau 2 — Compréhension : comprendre le sens général.",
            "Niveau 3 — Application : appliquer un texte à une situation.",
            "Niveau 4 — Maîtrise : analyser liens et implications.",
            "Niveau 5 — Expert / Référent : conseiller, contrôler ou former.",
            "Chaque question créée porte également un niveau (1 à 5) qui la situe sur cette échelle de difficulté pédagogique."
          ]
        },
        {
          "theme": "Les questions de quiz : types et anatomie",
          "points": [
            "Trois types de questions : QCU (une seule bonne réponse), QCM (plusieurs bonnes réponses) et Vrai / Faux (TRUE_FALSE, deux choix prédéfinis).",
            "Une question comporte un énoncé, des choix de réponse avec la/les bonne(s) réponse(s) cochée(s), une explication pédagogique (feedback), une difficulté (Facile / Moyen / Difficile), des points, un niveau (1 à 5) et un statut.",
            "Chaque question peut être reliée à un texte EduLex source, à un article / disposition (ex. « Article 12 ») et à un secteur : ce lien alimente le renvoi « Voir le texte → » du feedback.",
            "Statuts d'une question : Publiée (active dans le quiz), Brouillon (masquée aux apprenants) et Suspendue. Seules les questions Publiée apparaissent dans le lecteur de quiz d'une leçon."
          ]
        },
        {
          "theme": "Le lecteur de quiz côté apprenant",
          "points": [
            "Le quiz d'une leçon présente les questions une à une avec une barre de progression « n / total » et le type affiché en étiquette.",
            "L'apprenant sélectionne une réponse (choix unique) ou plusieurs (QCM), puis « Valider ». Le feedback indique « Bonne réponse · +X XP » ou « Réponse incorrecte », avec l'explication et, le cas échéant, la carte du texte EduLex source.",
            "Un texte source de niveau V0 affiche un avertissement « à vérifier » dans le feedback ; le lien « Voir le texte → » ouvre la fiche EduLex.",
            "Navigation : « Question suivante » puis « Terminer la leçon » à la dernière question. L'écran de fin affiche bonnes réponses, « XP gagnés » et « % de parcours », avec « Retour au parcours » et « Recommencer »."
          ]
        },
        {
          "theme": "Gamification : XP, niveaux, série, badges, classement",
          "points": [
            "XP : les points d'une question sont attribués une seule fois, à la première bonne réponse (pas de « farming » en recommençant la même question).",
            "Niveau : un niveau est atteint tous les 100 XP (niveau = partie entière de XP/100 + 1) ; « Ma progression » affiche la barre « n/100 vers niveau X+1 ».",
            "Série d'apprentissage (streak) : comptée en jours ; elle progresse si l'on revient le lendemain, reste stable le même jour, et retombe à 1 après une interruption — la régularité est valorisée.",
            "Badges : galerie de tous les badges (Obtenu le <date> ou À débloquer) ; le badge « Citoyen averti » (clé citoyen-averti) se débloque lorsqu'un parcours atteint 100 % de progression.",
            "Classement citoyen : les 50 apprenants les plus assidus, triés par total XP puis niveau (médailles pour les 3 premiers, flamme pour la série) ; la ligne de l'utilisateur est surlignée avec « (vous) »."
          ]
        },
        {
          "theme": "Progression et révision ciblée",
          "points": [
            "« Ma progression » réunit XP cumulés, niveau et avancement, série, « Mes parcours » (avec pourcentage et barre), « Mes badges » et « Textes à revoir ».",
            "Une mauvaise réponse à une question reliée à un texte génère automatiquement une recommandation de révision (« Textes à revoir »), pointant vers la fiche EduLex source.",
            "La progression d'un parcours = nombre de questions distinctes réussies / total des questions publiées du parcours ; un parcours passe en COMPLETED à 100 %.",
            "« Textes à revoir » est l'outil de remédiation : à exploiter avant de retenter un quiz pour consolider les acquis."
          ]
        },
        {
          "theme": "Modules d'évaluation officiels et rôles",
          "points": [
            "La carte « Modules d'évaluation officiels » (visible avec academy:manage) génère automatiquement des épreuves sur les 5 niveaux à partir des textes en vigueur et vérifiés du pays, avec leurs références officielles.",
            "Boutons : « Générer — <pays> » pour le pays sélectionné et « Générer pour tous les pays » ; la génération est idempotente (re-jouable sans doublon).",
            "academy_editor (academy:manage) : conçoit, publie/dépublie/supprime les questions, génère les modules officiels — périmètre strictement limité à Academy.",
            "academy_learner et public_authorized (academy:read) : consultent et participent (quiz, progression, badges, classement) mais ne créent ni ne publient aucun contenu et ne peuvent pas générer les modules officiels."
          ]
        }
      ],
      "procedures": [
        {
          "titre": "Créer et publier une nouvelle question de quiz (academy_editor)",
          "etapes": [
            "Ouvrez l'« Administration Academy » via /academy/admin.",
            "Cliquez « Nouvelle question » pour ouvrir le formulaire (/academy/admin/questions/new).",
            "Dans « Leçon de rattachement * », choisissez la leçon au libellé « parcours › unité › leçon ».",
            "Dans « Type de question * », choisissez « QCU (une seule bonne réponse) », « QCM (plusieurs bonnes réponses) » ou « Vrai / Faux ».",
            "Saisissez l'« Énoncé * », puis dans « Réponses (cochez la/les bonne(s)) * » renseignez chaque réponse et cochez la/les bonne(s) ; en QCU/Vrai-Faux une seule réponse reste correcte, utilisez « Ajouter une réponse » au besoin.",
            "Rédigez l'« Explication pédagogique (feedback) », affichée après la réponse.",
            "Reliez la question : sélectionnez le « Texte EduLex source », précisez l'« Article / disposition » (ex. « Article 12 ») et le « Secteur ».",
            "Réglez « Difficulté » (Facile / Moyen / Difficile), « Points » et « Niveau » (1 à 5).",
            "Choisissez le « Statut » (Publiée pour activer immédiatement, sinon Brouillon), puis cliquez « Créer la question ».",
            "De retour sur /academy/admin, repérez la question dans le tableau ; si elle est en Brouillon, basculez-la sur « Publier » pour l'activer dans le quiz."
          ]
        },
        {
          "titre": "Vérifier le rendu d'une question côté apprenant (academy_editor)",
          "etapes": [
            "Depuis /academy, ouvrez la catégorie puis le parcours concerné, ou allez sur /academy/path/[id].",
            "Repérez l'unité et la leçon de rattachement (le nombre de questions est indiqué sur la leçon).",
            "Cliquez la leçon pour lancer le quiz (/academy/lesson/[id]).",
            "Répondez puis cliquez « Valider » et contrôlez le feedback (« Bonne réponse · +X XP » ou « Réponse incorrecte ») ainsi que l'explication.",
            "Vérifiez que « Voir le texte → » renvoie bien vers la fiche EduLex attendue ; notez le badge « à vérifier » si la source est en V0.",
            "Si un ajustement est nécessaire, revenez sur /academy/admin pour dépublier puis corriger la question."
          ]
        },
        {
          "titre": "Dépublier ou retirer une question obsolète (academy_editor)",
          "etapes": [
            "Ouvrez /academy/admin (Administration Academy).",
            "Localisez la question grâce à sa Leçon, son Type ou le code du texte EduLex lié.",
            "Pour la masquer temporairement, cliquez « Dépublier » : le statut repasse en Brouillon (l'historique des tentatives est conservé).",
            "Pour la retirer définitivement, cliquez « Supprimer » sur la ligne.",
            "Contrôlez en haut de page le compteur « Publiées » pour confirmer la prise en compte."
          ]
        },
        {
          "titre": "Générer les modules d'évaluation officiels (academy_editor)",
          "etapes": [
            "Ouvrez l'espace /academy (EduLex Academy).",
            "Sélectionnez le pays voulu dans le filtre Pays de la barre supérieure.",
            "Repérez la carte « Modules d'évaluation officiels » (visible grâce à academy:manage).",
            "Cliquez « Générer — <pays> » pour le pays sélectionné, ou « Générer pour tous les pays » pour couvrir l'ensemble.",
            "Les épreuves sont créées automatiquement à partir des textes en vigueur et vérifiés ; vérifiez ensuite leur disponibilité dans les parcours.",
            "Régénérez après chaque ajout de nouveaux textes certifiés pour garder les évaluations à jour."
          ]
        },
        {
          "titre": "Démarrer un parcours et terminer une leçon (academy_learner / public_authorized)",
          "etapes": [
            "Connectez-vous puis ouvrez /academy (ou cliquez « Découvrir Academy » depuis l'accueil).",
            "Dans « Catégories de parcours », appliquez un filtre si souhaité, puis choisissez un parcours adapté à votre niveau et cliquez « Commencer ».",
            "Sur la fiche du parcours, parcourez les unités numérotées et leurs leçons ; respectez les éventuels « Prérequis » (cadenas).",
            "Cliquez une leçon pour ouvrir le quiz ; pour chaque question, sélectionnez la/les réponse(s) puis « Valider ».",
            "Lisez le feedback et, après une erreur, ouvrez « Voir le texte → » pour consulter la source EduLex.",
            "Avancez avec « Question suivante », puis « Terminer la leçon » à la dernière question.",
            "Sur l'écran de fin, consultez bonnes réponses, « XP gagnés » et « % de parcours » ; choisissez « Retour au parcours » ou « Recommencer » pour viser 100 %."
          ]
        },
        {
          "titre": "Suivre sa progression et exploiter les « Textes à revoir » (academy_learner / public_authorized)",
          "etapes": [
            "Depuis /academy, cliquez l'accès rapide « Ma progression » (/academy/progress).",
            "Lisez vos « XP cumulés », votre « Niveau X » et la barre « n/100 vers niveau X+1 ».",
            "Vérifiez votre « Série d'apprentissage » (jours) et revenez régulièrement pour la maintenir.",
            "Dans « Mes parcours », cliquez un parcours commencé pour le reprendre là où vous en étiez.",
            "Parcourez « Textes à revoir » et cliquez une recommandation pour ouvrir la fiche EduLex correspondante.",
            "Consolidez vos connaissances, puis retentez le quiz concerné pour faire progresser votre pourcentage et débloquer le badge « Citoyen averti » à 100 %."
          ]
        }
      ],
      "exercices": [
        "TP1 (academy_editor) — Conception et publication : créez une question de type QCU reliée à un texte EduLex en vigueur et vérifié, avec énoncé, 3 réponses (1 correcte), explication, article et secteur ; publiez-la, puis vérifiez son apparition dans le tableau et l'incrément du compteur « Publiées ».",
        "TP2 (academy_editor) — Contrôle qualité côté apprenant : ouvrez la leçon contenant votre question TP1, répondez correctement puis incorrectement, et documentez le feedback obtenu (texte exact, XP, lien « Voir le texte → »). Reliez ensuite délibérément une question à un texte V0 et observez l'apparition du badge « à vérifier ».",
        "TP3 (academy_learner) — Parcours complet et gamification : démarrez un parcours, terminez une leçon en visant 100 % de bonnes réponses, puis relevez sur « Ma progression » les XP gagnés, le niveau atteint et la série ; vérifiez l'obtention du badge « Citoyen averti » si le parcours atteint 100 %.",
        "TP4 (academy_learner / public_authorized) — Remédiation ciblée : provoquez au moins une mauvaise réponse à une question reliée à un texte, retrouvez la recommandation dans « Textes à revoir », consultez la fiche EduLex source, puis recommencez la leçon et comparez votre nouveau pourcentage de parcours.",
        "TP5 (public_authorized) — Du référentiel à la formation : depuis /edulex, recherchez un texte certifié V4, ouvrez sa fiche, puis dans Academy suivez une leçon dont une question cite ce texte ; situez enfin votre position dans le « Classement citoyen »."
      ],
      "autoEvaluation": [
        {
          "question": "Quels sont les trois types de questions disponibles à la création d'un quiz, et lequel impose deux choix prédéfinis ?",
          "reponse": "QCU (une seule bonne réponse), QCM (plusieurs bonnes réponses) et Vrai / Faux (TRUE_FALSE). Le type Vrai / Faux impose deux choix prédéfinis (« Vrai » et « Faux »)."
        },
        {
          "question": "À quel statut une question doit-elle être pour apparaître dans le lecteur de quiz d'une leçon ?",
          "reponse": "Au statut « Publiée ». Les statuts « Brouillon » et « Suspendue » masquent la question aux apprenants ; le lecteur n'affiche que les questions publiées."
        },
        {
          "question": "Combien de fois les XP d'une question sont-ils attribués, et tous les combien d'XP gagne-t-on un niveau ?",
          "reponse": "Les XP d'une question sont attribués une seule fois, à la première bonne réponse (pas de farming). On gagne un niveau tous les 100 XP (niveau = partie entière de XP/100 + 1)."
        },
        {
          "question": "Quels sont les 5 niveaux de compétence d'EduLex Academy, dans l'ordre ?",
          "reponse": "Niveau 1 Découverte, Niveau 2 Compréhension, Niveau 3 Application, Niveau 4 Maîtrise, Niveau 5 Expert / Référent."
        },
        {
          "question": "Que se passe-t-il automatiquement lorsqu'un apprenant répond incorrectement à une question reliée à un texte EduLex ?",
          "reponse": "Une recommandation de révision est créée automatiquement et apparaît dans « Textes à revoir » de « Ma progression », avec un renvoi vers la fiche EduLex source concernée."
        },
        {
          "question": "Quel badge se débloque à 100 % de progression d'un parcours, et sur quelle base ce pourcentage est-il calculé ?",
          "reponse": "Le badge « Citoyen averti » (clé citoyen-averti). Le pourcentage de progression d'un parcours correspond au nombre de questions distinctes réussies divisé par le nombre total de questions publiées du parcours ; à 100 %, le parcours passe en COMPLETED."
        },
        {
          "question": "Quelles permissions distinguent l'Éditeur Academy des deux profils de consultation, et qu'est-ce que seul l'éditeur peut faire ?",
          "reponse": "L'Éditeur Academy détient academy:manage ; le Citoyen apprenant et le Public autorisé n'ont que academy:read. Seul l'éditeur peut créer, publier/dépublier/supprimer des questions et générer les « Modules d'évaluation officiels » (boutons « Générer — <pays> » et « Générer pour tous les pays »)."
        },
        {
          "question": "Comment le classement citoyen est-il constitué et trié ?",
          "reponse": "Il liste les 50 apprenants les plus assidus, triés par total XP décroissant puis par niveau ; les trois premiers reçoivent une médaille, la série est signalée par une flamme, et la ligne de l'utilisateur courant est surlignée avec la mention « (vous) »."
        }
      ]
    },
    {
      "code": "M11",
      "titre": "M11 — Administration & sécurité",
      "objectifs": [
        "Identifier la place du module Administration (/admin) dans la plateforme et distinguer ce qui relève du réglage exclusif du super administrateur (déconnexion automatique) de ce qui est partagé (hiérarchie de validation, ouverte à admin:manage / organization:manage).",
        "Configurer une hiérarchie de validation des activités : ordonner une chaîne de rôles de gouvernance, ajouter/retirer un niveau, et comprendre l'effet d'une chaîne vide (validation en une seule étape).",
        "Expliquer le mécanisme de validation par niveaux : progression d'une activité d'un niveau à l'autre, rôle habilité à statuer à chaque niveau, et cas du super administrateur.",
        "Activer et paramétrer la déconnexion automatique par inactivité (délai de 1 à 1440 minutes) et décrire le double dispositif client (avertissement + compte à rebours) et serveur (marge de grâce, fermeture durable de la session).",
        "Interpréter le journal d'audit : reconnaître les actions tracées (qui, quoi, quel module, quelle entité) et savoir l'exploiter, ainsi que l'historique de validation, dans une démarche de contrôle.",
        "Appliquer les bonnes pratiques de sécurité des sessions et de traçabilité, et connaître les limites et garde-fous qui s'imposent même au super administrateur."
      ],
      "publicCible": "Super Administrateur EduWeb (super_admin) — opérateur des réglages exclusifs (hiérarchie de validation, déconnexion automatique par inactivité). Contrôleur / auditeur (auditor) en lecture seule, pour vérifier le circuit configuré et exploiter les traces. Indicativement, les Administrateurs institutionnels (admin:manage / organization:manage) peuvent également éditer la hiérarchie de validation, mais NON régler la déconnexion automatique.",
      "contenu": [
        {
          "theme": "L'espace Administration (/admin) : périmètre et habilitations",
          "points": [
            "Le menu « Administration » est titré « Administration » avec le sous-titre « Configuration de la plateforme, RBAC et paramètres système ».",
            "Bandeau de statistiques RBAC en lecture : « Utilisateurs », « Pays », « Rôles », « Permissions », « Textes EduLex », plus la carte « Vos rôles » qui liste les clés de rôle du compte connecté.",
            "Deux cartes de configuration : « Hiérarchie de validation » (visible pour le super administrateur ET pour admin:manage / organization:manage) et « Sécurité des sessions — déconnexion automatique » (visible UNIQUEMENT pour le super administrateur).",
            "Le super administrateur dispose implicitement de TOUTES les permissions ; il est aussi le SEUL à pouvoir supprimer des structures/organisations et à régler la déconnexion automatique.",
            "L'auditeur accède à /admin en lecture (admin:read) : il consulte les statistiques RBAC et la chaîne de validation configurée, mais ne peut ni modifier la hiérarchie, ni régler la déconnexion automatique."
          ]
        },
        {
          "theme": "La hiérarchie de validation des activités",
          "points": [
            "Une seule hiérarchie active sert de circuit : c'est un workflow unique nommé en interne « Hiérarchie de validation » (constante WF_NAME), composé d'étapes ordonnées, chaque étape portant un rôle de gouvernance (scope GOVERNANCE).",
            "Principe affiché dans l'éditeur : « Une activité soumise franchit ces niveaux dans l'ordre : chaque niveau doit valider avant de passer au suivant ; le dernier niveau prononce la validation finale. Une chaîne vide rétablit la validation en une seule étape. »",
            "La chaîne est ordonnée et sans doublon : chaque rôle figure au plus une fois ; à l'enregistrement, le serveur ne conserve que des rôles de gouvernance existants, dédoublonnés, dans l'ordre fourni.",
            "Effet d'une chaîne vide : « Aucun niveau : validation en une seule étape (tout valideur habilité). » — n'importe quel détenteur de activity:validate peut alors statuer.",
            "Sur la page « Validation hiérarchique » (/validation), le circuit s'affiche sous forme de bandeau « Circuit de validation : 1. <rôle> → 2. <rôle> → … » et chaque activité porte une pastille « Niveau X/Y · <nom> » avec la mention « · à vous » lorsque le niveau attendu correspond à un rôle du valideur."
          ]
        },
        {
          "theme": "Mécanique de progression et règle d'habilitation par niveau",
          "points": [
            "Une activité conserve un niveau courant (validationLevel). À chaque validation, seul le rôle du niveau attendu — ou le super administrateur — peut statuer.",
            "Si un valideur tente de statuer à un niveau qui ne le concerne pas, l'action est refusée : « Cette activité attend la validation du niveau « <nom> » (X/Y). Vous n'êtes pas habilité à statuer à ce niveau. »",
            "Validation intermédiaire vs finale : tant que ce n'est pas le dernier niveau, l'activité passe « En examen » et avance au niveau suivant (notification « Validation intermédiaire (X/Y) ») ; au dernier niveau, elle passe « Validé ».",
            "Décisions possibles (permission activity:validate requise) : « Valider », « Demander correction », « Rejeter », « Consolider » (uniquement sur une activité déjà validée). Un commentaire est obligatoire pour un rejet ou une demande de correction.",
            "Un rejet ou une demande de correction remet le niveau à zéro : la chaîne repart du début à la prochaine soumission.",
            "Chaque décision est doublement tracée : un enregistrement ValidationAction (décision, commentaire, statut avant/après, auteur, date) alimente l'« Historique de validation » de l'activité, et une entrée est écrite au journal d'audit (module « validation »)."
          ]
        },
        {
          "theme": "Sécurité des sessions : la session et son cycle de vie",
          "points": [
            "À la connexion, une session est créée en base avec un jeton aléatoire (32 octets) et un cookie httpOnly « eduweb_session » (sameSite lax, secure en production), d'une durée de vie de 30 jours.",
            "À chaque requête authentifiée, la session est revérifiée côté serveur : jeton présent, non expiré, et compte toujours actif (la désactivation d'un compte coupe ses sessions).",
            "L'activité réelle est marquée par le champ lastActiveAt, mis à jour au plus une fois toutes les 30 secondes (limitation d'écriture) pour faire « glisser » le délai d'inactivité.",
            "Un garde-fou léger en périphérie (middleware) redirige vers /login en l'absence de cookie ; la validité réelle est toujours revérifiée côté serveur dans le layout de l'espace connecté.",
            "La déconnexion volontaire (logout) supprime la session en base et efface le cookie."
          ]
        },
        {
          "theme": "Déconnexion automatique par inactivité (réglage exclusif super admin)",
          "points": [
            "Carte « Sécurité des sessions — déconnexion automatique » : un interrupteur « Déconnexion automatique activée / désactivée » et un champ « Délai d'inactivité (minutes) » accompagné de préréglages (5 min, 10 min, 15 min, 30 min, 1 h, 2 h).",
            "Le délai accepté est un entier de 1 à 1440 minutes (24 h). Hors bornes, le message « Le délai doit être un entier entre 1 et 1440 minutes (24 h). » s'affiche.",
            "Le réglage est global et singleton : il « s'applique à toutes les sessions, vous compris » ; sa propagation entre instances est garantie sous 30 secondes (cache court côté serveur).",
            "Côté client (veilleur d'inactivité IdleLogout) : surveillance des événements souris/clavier/scroll/molette/tactile ; un avertissement modal « Déconnexion imminente » s'affiche avant l'échéance avec un compte à rebours en secondes et deux boutons : « Rester connecté » et « Se déconnecter ». Des « battements de cœur » (heartbeat) informent le serveur de l'activité réelle.",
            "Côté serveur (filet de sécurité) : une marge de grâce d'environ 75 secondes au-delà du délai garantit que le client déconnecte en premier ; passé ce seuil, la session est FERMÉE DURABLEMENT en base, de sorte qu'un changement ultérieur du délai global ne puisse pas la « ressusciter ».",
            "À l'expiration, l'utilisateur est redirigé vers /login avec le bandeau « Votre session a été fermée pour cause d'inactivité. Reconnectez-vous. »",
            "Désactiver l'interrupteur enregistre la valeur « null » : aucune déconnexion automatique n'est plus appliquée."
          ]
        },
        {
          "theme": "Journaux et audit (traçabilité)",
          "points": [
            "Le journal d'audit (AuditLog) consigne chaque action sensible de façon « best-effort » : il n'interrompt jamais l'opération métier, même en cas d'échec d'écriture du journal.",
            "Chaque entrée porte : l'auteur (userId), l'action (ex. create, update, delete, submit, validate, reject, set_hierarchy, set_inactivity_timeout, import, publish, upload), le module concerné (admin, validation, user, organization, edulex, activity, form, report, academy, absence), éventuellement le type et l'identifiant d'entité, et des métadonnées (ex. la liste des rôles de la hiérarchie, le délai d'inactivité retenu).",
            "Les réglages d'administration sont tracés : la modification de la hiérarchie (action « set_hierarchy », module « admin », métadonnée des clés de rôle) et le réglage de la déconnexion automatique (action « set_inactivity_timeout », module « admin », métadonnée des minutes).",
            "Pour le contrôle métier au quotidien, l'auditeur s'appuie surtout sur l'« Historique de validation » d'une activité (chronologie horodatée : Soumission, Validation, Rejet, Demande de correction, Consolidation, avec auteur et commentaire) et sur le « Journal de validation » d'un texte EduLex.",
            "Bonnes preuves d'audit : confronter la « Hiérarchie de validation » lue dans /admin aux historiques réels des activités — tout écart révèle un contournement du circuit ; conserver des copies via « Imprimer » (rapports) et « Télécharger (PDF) / Markdown » (textes EduLex) plutôt que de simples captures."
          ]
        }
      ],
      "procedures": [
        {
          "titre": "Configurer le circuit de validation des activités (hiérarchie)",
          "etapes": [
            "Ouvrir « Administration » (/admin).",
            "Dans la carte « Hiérarchie de validation », lire le rappel : les niveaux sont franchis dans l'ordre, chaque niveau valide avant le suivant, le dernier prononce la validation finale.",
            "Pour ajouter un niveau, choisir un rôle dans le sélecteur « — Ajouter un niveau (rôle) — » puis cliquer « Ajouter ».",
            "Réordonner la chaîne avec les flèches « Monter » / « Descendre » de chaque ligne ; retirer un niveau avec l'icône de corbeille (« Retirer »).",
            "Vérifier la numérotation des niveaux (1, 2, 3…) à gauche de chaque rôle.",
            "Cliquer « Enregistrer la hiérarchie » et attendre la confirmation « Hiérarchie enregistrée ».",
            "Pour revenir à une validation en une seule étape, retirer tous les niveaux (la zone affiche « Aucun niveau : validation en une seule étape ») puis enregistrer.",
            "Contrôler le résultat sur /validation : le bandeau « Circuit de validation : 1. … → 2. … » doit refléter la chaîne enregistrée."
          ]
        },
        {
          "titre": "Activer et régler la déconnexion automatique par inactivité",
          "etapes": [
            "Ouvrir « Administration » (/admin) avec un compte super administrateur (la carte n'apparaît que pour ce rôle).",
            "Repérer la carte « Sécurité des sessions — déconnexion automatique ».",
            "Basculer l'interrupteur sur « Déconnexion automatique activée ».",
            "Saisir le « Délai d'inactivité (minutes) » entre 1 et 1440, ou cliquer un préréglage (5 min / 10 min / 15 min / 30 min / 1 h / 2 h).",
            "Cliquer « Enregistrer » et attendre le message « Réglage enregistré. ».",
            "Noter l'avertissement « S'applique à toutes les sessions, vous compris. » : le réglage est global et concerne aussi votre propre session.",
            "Vérifier l'effet : après une période d'inactivité (sans souris ni clavier), une fenêtre « Déconnexion imminente » avec compte à rebours doit s'afficher ; cliquer « Rester connecté » prolonge la session, sinon la session se ferme et redirige vers /login (« Votre session a été fermée pour cause d'inactivité. »).",
            "Pour désactiver, rebasculer l'interrupteur sur « désactivée » puis « Enregistrer »."
          ]
        },
        {
          "titre": "Vérifier la conformité du circuit de validation (audit, lecture seule)",
          "etapes": [
            "Ouvrir « Administration » (/admin) et relever l'ordre exact des rôles dans « Hiérarchie de validation » (niveau 1 → niveau 2 → …).",
            "Ouvrir « Activités » (/activities) et filtrer sur « Validé » ou « Consolidé » pour cibler des activités achevées.",
            "Ouvrir le détail d'une activité et faire défiler jusqu'à « Historique de validation ».",
            "Pour chaque ligne, vérifier l'auteur, la date, le commentaire et la transition de statut, et confronter à la pastille « Niveau X/Y · <nom> ».",
            "Confirmer que chaque niveau requis a bien statué dans l'ordre configuré ; consigner tout écart (niveau sauté, décideur non habilité) comme contournement du circuit.",
            "Conserver les preuves : télécharger les pièces jointes utiles et imprimer les rapports concernés (« Imprimer »)."
          ]
        },
        {
          "titre": "Exploiter la traçabilité des réglages d'administration",
          "etapes": [
            "Identifier l'action à tracer : toute modification de la hiérarchie est journalisée (action « set_hierarchy », module « admin »), tout changement de délai d'inactivité l'est aussi (action « set_inactivity_timeout », module « admin »).",
            "Retenir que chaque entrée d'audit porte l'auteur, l'action, le module, l'entité éventuelle et des métadonnées (ex. liste des rôles retenus, valeur du délai en minutes).",
            "Croiser ces traces avec l'« Historique de validation » des activités pour documenter, dans un rapport d'audit, qui a configuré quoi et quand.",
            "Conserver les éléments de contrôle (impressions de rapports, fiches EduLex en PDF/Markdown) comme pièces justificatives plutôt que de simples captures d'écran."
          ]
        }
      ],
      "exercices": [
        "TP1 — Mettre en place une chaîne à deux niveaux : dans /admin, ajouter deux rôles de gouvernance (par exemple Sous-Directeur puis Directeur), les ordonner avec « Monter » / « Descendre », enregistrer, puis vérifier sur /validation que le bandeau affiche « Circuit de validation : 1. … → 2. … ». Retirer ensuite tous les niveaux, enregistrer, et constater le passage à la « validation en une seule étape ».",
        "TP2 — Régler la déconnexion automatique : activer l'interrupteur, fixer un délai court via un préréglage (par exemple 5 min), enregistrer, puis rester inactif pour observer la fenêtre « Déconnexion imminente » et son compte à rebours ; tester « Rester connecté ». Enfin, désactiver le réglage et confirmer qu'aucun avertissement n'apparaît plus.",
        "TP3 — Tester l'habilitation par niveau : sur une activité en attente à un niveau donné, se connecter avec un compte dont le rôle ne correspond PAS au niveau attendu et tenter de valider ; relever le message « Cette activité attend la validation du niveau « … » (X/Y). Vous n'êtes pas habilité à statuer à ce niveau. ». Puis valider avec le bon rôle et observer le passage « En examen » (niveau intermédiaire) ou « Validé » (dernier niveau).",
        "TP4 — Audit de conformité : en tant qu'auditeur, relever dans /admin l'ordre des rôles de la hiérarchie, puis ouvrir l'« Historique de validation » de trois activités validées et vérifier que chaque niveau requis a statué dans l'ordre ; rédiger une courte note de contrôle signalant tout écart et préciser quelles preuves (impressions, PDF) ont été conservées."
      ],
      "autoEvaluation": [
        {
          "question": "Quel rôle peut régler la déconnexion automatique par inactivité, et quel rôle peut éditer la hiérarchie de validation ?",
          "reponse": "Seul le super administrateur peut régler la déconnexion automatique (la carte « Sécurité des sessions — déconnexion automatique » ne s'affiche que pour lui). La « Hiérarchie de validation », elle, est aussi ouverte aux détenteurs de admin:manage ou organization:manage (en plus du super administrateur). L'auditeur n'a qu'un accès en lecture (admin:read)."
        },
        {
          "question": "Que se passe-t-il si la chaîne de la hiérarchie de validation est laissée vide ?",
          "reponse": "La validation revient à une seule étape : tout valideur habilité (détenteur de activity:validate) peut statuer. L'éditeur affiche alors « Aucun niveau : validation en une seule étape (tout valideur habilité) »."
        },
        {
          "question": "Dans une chaîne à plusieurs niveaux, qui peut statuer à un niveau donné et que se passe-t-il lors d'une validation intermédiaire ?",
          "reponse": "Seul le rôle correspondant au niveau courant — ou le super administrateur — peut statuer ; sinon l'action est refusée avec le message « Vous n'êtes pas habilité à statuer à ce niveau ». Une validation à un niveau non final fait passer l'activité « En examen » et l'avance au niveau suivant ; la validation au dernier niveau la passe « Validé »."
        },
        {
          "question": "Quelles sont les bornes acceptées pour le délai d'inactivité et que signifie « S'applique à toutes les sessions, vous compris » ?",
          "reponse": "Le délai est un entier de 1 à 1440 minutes (24 h). Le réglage est global : il s'applique à toutes les sessions ouvertes, y compris celle du super administrateur qui l'a défini."
        },
        {
          "question": "Comment l'utilisateur est-il prévenu avant une déconnexion pour inactivité, et que fait le serveur en complément ?",
          "reponse": "Côté client, le veilleur d'inactivité affiche une fenêtre « Déconnexion imminente » avec un compte à rebours et les boutons « Rester connecté » / « Se déconnecter ». Côté serveur, une marge de grâce (~75 s) garantit que le client déconnecte en premier ; passé ce seuil, la session est fermée durablement en base pour ne pas pouvoir être « ressuscitée » par un changement ultérieur du délai."
        },
        {
          "question": "Citez deux actions d'administration tracées dans le journal d'audit et indiquez ce qu'enregistre une entrée d'audit.",
          "reponse": "La modification de la hiérarchie (action « set_hierarchy ») et le réglage de la déconnexion automatique (action « set_inactivity_timeout »), toutes deux dans le module « admin ». Chaque entrée enregistre l'auteur, l'action, le module, éventuellement le type/identifiant d'entité et des métadonnées (ex. liste des rôles retenus, délai en minutes), sans jamais interrompre l'opération métier."
        },
        {
          "question": "Quelle limite s'impose même au super administrateur en matière de validation d'activité ?",
          "reponse": "Il ne peut statuer que si l'activité est au niveau qu'il est habilité à traiter ; le super administrateur peut statuer à n'importe quel niveau de la chaîne, mais les règles d'état restent : un rejet ou une demande de correction exige un commentaire, et la « Consolidation » n'est possible que sur une activité déjà validée."
        }
      ]
    }
  ],
  "glossaire": [
    {
      "terme": "Plateforme EduWeb Governance",
      "definition": "Système national de gouvernance éducative articulé autour de trois piliers : la Gouvernance administrative (organisations, structures, activités, validation, rapports), le référentiel réglementaire EduLex et l'EduLex Academy. L'interface est en français et le contexte de déploiement de référence est l'État de Côte d'Ivoire."
    },
    {
      "terme": "Gouvernance administrative",
      "definition": "Premier pilier de la plateforme : il couvre l'organigramme (organisations et structures), la gestion des comptes et des rôles, la saisie des activités, leur validation hiérarchique, la production de rapports consolidés ainsi que le suivi des absences et des distinctions."
    },
    {
      "terme": "EduLex",
      "definition": "Deuxième pilier : référentiel réglementaire qui recense les textes officiels (constitutions, lois, ordonnances, décrets, arrêtés, circulaires, conventions, etc.), chacun doté d'un code international, d'un statut juridique et d'un niveau de vérification V0 à V4."
    },
    {
      "terme": "EduLex Academy",
      "definition": "Troisième pilier : espace d'apprentissage citoyen organisé en parcours, unités et leçons, avec quiz, XP, badges et cinq niveaux de compétence (Découverte, Compréhension, Application, Maîtrise, Expert / Référent), adossé aux textes EduLex."
    },
    {
      "terme": "Organisation",
      "definition": "Entité cliente racine de l'organigramme. Elle est typée Ministère, Institution, Réseau, Association ou Entreprise / Société et regroupe l'ensemble des structures qui lui sont rattachées. Seul le super administrateur peut supprimer une organisation."
    },
    {
      "terme": "Structure",
      "definition": "Subdivision interne d'une organisation, typée Direction, Sous-direction, Service, Antenne, Direction régionale, Coordination ou Équipe. Les structures s'imbriquent via une structure parente pour former l'arborescence ; leur suppression (en cascade) est réservée au super administrateur."
    },
    {
      "terme": "Ministère technique",
      "definition": "Ministère émetteur ou de rattachement servant de cadre administratif et juridictionnel : il rattache les structures dans l'organigramme et identifie l'autorité dont émane un texte réglementaire EduLex (composante « ministère émetteur » du code EduLex)."
    },
    {
      "terme": "Activité",
      "definition": "Unité de travail saisie par un agent (intitulé, description, pièces jointes, textes EduLex associés). Elle suit un cycle de statuts — Brouillon, Soumis, En examen, Validé, Rejeté, À corriger, Consolidé, Archivé — et constitue la matière première du reporting et de l'évaluation."
    },
    {
      "terme": "Validation hiérarchique",
      "definition": "Circuit d'approbation d'une activité soumise : elle franchit, dans l'ordre, les niveaux d'une chaîne de rôles configurée par l'administration. Chaque niveau doit valider avant de passer au suivant ; le dernier niveau prononce la validation finale (statut Validé)."
    },
    {
      "terme": "Hiérarchie de validation",
      "definition": "Chaîne ordonnée de rôles paramétrée dans l'administration (« Hiérarchie de validation ») qui définit les niveaux successifs d'approbation des activités. Une chaîne vide rétablit une validation en une seule étape ouverte à tout valideur habilité."
    },
    {
      "terme": "Niveau de validation",
      "definition": "Position de l'activité dans la chaîne d'approbation (validationLevel, indexée à partir de 0). À la soumission, l'activité repart au premier niveau ; chaque validation la fait progresser d'un cran jusqu'au niveau final."
    },
    {
      "terme": "Consolidation",
      "definition": "Action de marquer « Consolidé » une activité déjà validée afin de la rendre éligible au reporting. Seules les activités au statut Validé ou Consolidé sont agrégées dans les rapports institutionnels."
    },
    {
      "terme": "Soumission",
      "definition": "Action par laquelle l'auteur envoie son activité (Brouillon) dans le circuit de validation : elle passe au statut Soumis, son niveau est réinitialisé et une entrée est inscrite à l'historique de validation."
    },
    {
      "terme": "Demande de correction / Rejet",
      "definition": "Décisions de validation alternatives à l'approbation : « Demander correction » renvoie l'activité au statut À corriger, « Rejeter » la passe à Rejeté. Dans les deux cas, un commentaire justificatif est obligatoire."
    },
    {
      "terme": "Rapport consolidé",
      "definition": "Document institutionnel (titre, périodicité, périmètre, dates) qui agrège les activités au statut Validé ou Consolidé. La périodicité peut être Hebdomadaire, Mensuelle, Trimestrielle, Semestrielle, Annuelle ou Personnalisée."
    },
    {
      "terme": "Code EduLex",
      "definition": "Identifiant international normalisé d'un texte réglementaire au format PAYS-JURIDICTION-SECTEUR-TYPE-ANNÉE-NUMÉRO-VERSION (ex. CI-MENA-EDU-DEC-2026-004-V1). Il est généré automatiquement au dépôt du texte."
    },
    {
      "terme": "Niveau de vérification (V0 → V4)",
      "definition": "Échelle de fiabilité d'un texte EduLex : V0 (non vérifié, importé ou indexé), V1 (vérification documentaire), V2 (service technique), V3 (validation juridique ou institutionnelle), V4 (texte officiellement certifié)."
    },
    {
      "terme": "V0 (Non vérifié)",
      "definition": "Niveau initial de tout texte EduLex : entrée déposée ou importée mais non encore contrôlée. Tout texte naît en V0 et doit passer par la File de validation avant publication ou mise en vigueur."
    },
    {
      "terme": "V4 (Certifié)",
      "definition": "Niveau le plus élevé de l'échelle de vérification : texte officiellement certifié dans la base, après avoir franchi les contrôles documentaire, technique et juridique."
    },
    {
      "terme": "File de validation EduLex",
      "definition": "Espace de travail des validateurs qui liste les textes à traiter (compteurs « Textes à traiter » et « Non vérifiés (V0) ») et permet de statuer texte par texte pour les faire progresser de V0 vers V4."
    },
    {
      "terme": "Statut juridique",
      "definition": "État réglementaire d'un texte EduLex, distinct de son niveau de vérification : En vigueur, Abrogé, Modifié, Remplacé, Suspendu, Document de référence, En attente, À vérifier, Archivé, Brouillon ou Importé non vérifié."
    },
    {
      "terme": "Import d'amorçage",
      "definition": "Fonction d'import en masse de textes EduLex par collage CSV/TSV : on choisit le pays d'affectation, on prévisualise puis on importe. Toutes les lignes importées sont créées au niveau V0."
    },
    {
      "terme": "RBAC (contrôle d'accès par rôles)",
      "definition": "Modèle de sécurité de la plateforme : les droits ne sont pas attribués individuellement mais via des rôles porteurs de permissions. Les permissions effectives d'un utilisateur résultent de ses rôles, complétées par d'éventuelles délégations directes."
    },
    {
      "terme": "Rôle",
      "definition": "Profil système regroupant un ensemble de permissions et rattaché à un périmètre (Gouvernance, EduLex, Academy ou Système). Exemples : Agent, Directeur, Validateur juridique, Éditeur Academy. Un compte peut cumuler plusieurs rôles."
    },
    {
      "terme": "Permission",
      "definition": "Droit élémentaire combinant un module (organisation, utilisateur, formulaire, activité, validation, rapport, edulex, academy, administration) et une action (créer, lire, modifier, supprimer, valider, publier, archiver, exporter, importer, gérer), noté « module:action » (ex. activity:validate)."
    },
    {
      "terme": "Délégation de droits",
      "definition": "Attribution de permissions directement à un utilisateur, en plus de ses rôles, depuis la carte « Délégation de droits » de sa fiche. Elle se fait par lots prédéfinis (« en un clic ») ou permission par permission."
    },
    {
      "terme": "Super administrateur EduWeb",
      "definition": "Titulaire du périmètre Système, disposant implicitement de toutes les permissions. Il détient des prérogatives exclusives : supprimer structures et organisations (en cascade) et régler la déconnexion automatique par inactivité."
    },
    {
      "terme": "Supérieur hiérarchique",
      "definition": "Compte (managerId) auquel un agent est rattaché. Il détermine les subordonnés directs (« reports directs ») suivis par un responsable, notamment pour les absences et les distinctions trimestrielles."
    },
    {
      "terme": "Subordonné direct",
      "definition": "Agent rattaché à un supérieur via son champ supérieur hiérarchique. Un responsable consulte par défaut la fiche de distinctions et les absences de ses seuls subordonnés directs (un super administrateur voit tous les agents actifs)."
    },
    {
      "terme": "Déconnexion par inactivité",
      "definition": "Fermeture automatique de la session après une période sans action souris ni clavier. Le délai (1 à 1440 minutes) est réglé globalement par le seul super administrateur ; l'utilisateur est averti juste avant et peut rester connecté. Le réglage s'applique à toutes les sessions."
    },
    {
      "terme": "Distinction trimestrielle",
      "definition": "Récompense calculée par trimestre et cumulée sur l'année : un écusson « Belle performance » est décerné lorsque les trois critères sont réunis, sinon une émoticône « Performance à redresser ». En Côte d'Ivoire, un message en style ivoirien (nouchi) accompagne le résultat."
    },
    {
      "terme": "Régularité du reporting",
      "definition": "Premier critère des distinctions : part des activités du trimestre parvenues au statut Validé ou Consolidé. Le score doit être supérieur ou égal à 50 % pour valider ce critère."
    },
    {
      "terme": "Absence approuvée",
      "definition": "Demande d'absence parvenue au statut Approuvée dans son circuit de validation (En attente → Approuvée / Refusée). Seules les absences approuvées sont comptabilisées dans les cumuls annuels et dans le calcul des distinctions."
    },
    {
      "terme": "Motif d'absence",
      "definition": "Catégorie d'une autorisation d'absence : Affaires personnelles, Congé réglementaire, Formation, Raison médicale ou Force majeure institutionnelle. Le motif conditionne les seuils appliqués aux distinctions."
    },
    {
      "terme": "Seuils d'absence (distinctions)",
      "definition": "Plafonds, exprimés en pourcentage du quota annuel de congé, conditionnant une belle performance : affaires personnelles strictement inférieures à 20 % et raison médicale strictement inférieure à 40 % du congé annuel."
    },
    {
      "terme": "Quota annuel de congé",
      "definition": "Nombre de jours d'absence de référence sur l'année, fixé par la politique globale (30 jours par défaut). Il sert de base au calcul des pourcentages d'absence et au seuil d'avertissement."
    },
    {
      "terme": "Formulaire",
      "definition": "Modèle de saisie configurable composé de champs typés (texte, date, nombre, liste, fichier, image, tableau répétable, champ calculé, lien vers un texte EduLex, etc.). Il structure la collecte de données et passe par les statuts Brouillon, Publié, Archivé."
    },
    {
      "terme": "Niveaux de compétence Academy",
      "definition": "Échelle de progression de l'apprenant en cinq paliers : 1 Découverte, 2 Compréhension, 3 Application, 4 Maîtrise, 5 Expert / Référent, chacun assorti d'un objectif pédagogique précis."
    },
    {
      "terme": "Parcours (Academy)",
      "definition": "Unité pédagogique structurante de l'EduLex Academy, organisée en parcours › unité › leçon. Les questions de quiz se rattachent à une leçon et à un texte EduLex source ; un parcours doit être publié pour être suivi."
    },
    {
      "terme": "Confidentialité",
      "definition": "Niveau de diffusion d'un texte EduLex : Public, Restreint ou Confidentiel. Il détermine la visibilité du texte au-delà des seuls critères de statut et de vérification."
    }
  ],
  "evaluationFinale": [
    {
      "question": "À l'écran de connexion, quel parcours permet à un agent qui a oublié son mot de passe de recouvrer l'accès à la plateforme EduWeb Governance ?",
      "options": [
        "Le lien « Mot de passe oublié », qui déclenche une procédure de réinitialisation",
        "La suppression définitive du compte, à recréer ensuite",
        "La saisie de n'importe quel mot de passe : le système l'accepte au premier essai",
        "L'envoi d'un courrier postal au super administrateur"
      ],
      "bonneReponse": "Le lien « Mot de passe oublié », qui déclenche une procédure de réinitialisation",
      "explication": "La récupération d'accès passe par la procédure de mot de passe oublié ; par ailleurs, un administrateur (ou le super administrateur) peut réinitialiser le mot de passe d'un compte depuis la fiche utilisateur (minimum 8 caractères)."
    },
    {
      "question": "Le réglage de la déconnexion automatique par inactivité, situé dans la carte « Sécurité des sessions — déconnexion automatique » de l'espace Administration (/admin), est accessible :",
      "options": [
        "Au seul Super Administrateur EduWeb",
        "À tout agent depuis son profil (/account)",
        "À tout responsable régional",
        "Au Contrôleur/auditeur via admin:read"
      ],
      "bonneReponse": "Au seul Super Administrateur EduWeb",
      "explication": "Le réglage de la déconnexion automatique par inactivité (délai de 1 à 1440 minutes) est une prérogative EXCLUSIVE du super administrateur ; la carte ne s'affiche que pour lui."
    },
    {
      "question": "Sur le Tableau de bord (/dashboard), quel élément reflète directement la part d'activités acceptées dans le circuit ?",
      "options": [
        "Le KPI « Taux de validation »",
        "Le bloc « Mes demandes d'absence »",
        "La carte de parrainage commercial",
        "Le feed des textes EduLex récents"
      ],
      "bonneReponse": "Le KPI « Taux de validation »",
      "explication": "Parmi les KPI du tableau de bord (Activités saisies, Activités validées, En attente de validation, Rapports générés, Textes EduLex disponibles, Textes à vérifier, Parcours Academy publiés, Taux de validation), c'est le « Taux de validation » qui exprime la proportion d'activités validées."
    },
    {
      "question": "Dans le module Bilan & synthèse (/bilan), quelle action est explicitement proposée à l'utilisateur ?",
      "options": [
        "Exporter le bilan en PDF",
        "Valider les activités de ses subordonnés",
        "Régler la déconnexion automatique",
        "Supprimer une organisation"
      ],
      "bonneReponse": "Exporter le bilan en PDF",
      "explication": "Le Bilan présente le taux de réalisation et les listes « Faits » / « Non faits » par période (Semaine / Quinzaine / Mois), avec un export PDF (« Exporter en PDF »)."
    },
    {
      "question": "Dans le module Évaluation (/evaluation), qu'obtient-on en plus du score de productivité personnel /100 et de la tendance vs semaine précédente ?",
      "options": [
        "Des « Conseils IA » personnalisés à générer",
        "La file de validation hiérarchique des activités",
        "La liste des ministères du gouvernement ivoirien",
        "Le réglage du quota de congé annuel"
      ],
      "bonneReponse": "Des « Conseils IA » personnalisés à générer",
      "explication": "L'Évaluation affiche le score /100, la tendance et l'évolution sur 4 semaines (avec le détail « RDV honorés (7 j) » / « Activités validées (7 j) »), et permet de générer des « Conseils IA » personnalisés."
    },
    {
      "question": "Dans l'organigramme (/organization), de quelles deux manières peut-on repositionner une structure sous un autre parent ?",
      "options": [
        "Par glisser-déposer ET au clic via la poignée (GripVertical → « Déposer ici »)",
        "Uniquement en supprimant puis recréant la structure",
        "Uniquement par import CSV",
        "Uniquement en contactant le support EduLex"
      ],
      "bonneReponse": "Par glisser-déposer ET au clic via la poignée (GripVertical → « Déposer ici »)",
      "explication": "La réorganisation se fait soit par glisser-déposer, soit au clic en utilisant la poignée GripVertical puis « Déposer ici »."
    },
    {
      "question": "Qui est habilité à SUPPRIMER une structure ou une organisation, opération qui entraîne une suppression en cascade des structures rattachées ?",
      "options": [
        "Le Super Administrateur EduWeb uniquement",
        "Tout Administrateur institutionnel",
        "Tout Responsable national",
        "L'Agent contributeur"
      ],
      "bonneReponse": "Le Super Administrateur EduWeb uniquement",
      "explication": "La suppression des structures et des organisations (en cascade) est une prérogative exclusive du super administrateur ; de plus, la suppression d'une structure est refusée tant que des sous-structures subsistent."
    },
    {
      "question": "Lors de la création d'une organisation cliente (/organization/new), comment pré-remplir rapidement le nom d'un ministère ivoirien ?",
      "options": [
        "En le choisissant dans la liste recherchable des ministères du gouvernement ivoirien actuel",
        "En tapant obligatoirement le code ISO du pays",
        "En important un fichier PDF du décret de nomination",
        "En sélectionnant un badge Academy"
      ],
      "bonneReponse": "En le choisissant dans la liste recherchable des ministères du gouvernement ivoirien actuel",
      "explication": "Le formulaire propose une liste recherchable des ministères du gouvernement ivoirien actuel (qui pré-remplit le nom et le type « Ministère »), ou l'option « — Saisie libre — »."
    },
    {
      "question": "Sur la fiche d'un utilisateur (/users/[id]), à quoi sert la carte « Délégation de droits » ?",
      "options": [
        "À attribuer à l'agent une permission directe au-delà de ses rôles (ex. activity:validate)",
        "À supprimer définitivement le compte de l'agent",
        "À fixer le délai de déconnexion automatique",
        "À générer un rapport institutionnel"
      ],
      "bonneReponse": "À attribuer à l'agent une permission directe au-delà de ses rôles (ex. activity:validate)",
      "explication": "La « Délégation de droits » (PermissionDelegation) permet d'accorder à un compte une permission directe supplémentaire, indépendamment des permissions héritées de ses rôles."
    },
    {
      "question": "Quel effet immédiat a la désactivation d'un compte utilisateur depuis sa fiche ?",
      "options": [
        "Elle coupe les sessions actives de l'agent",
        "Elle supprime toutes ses activités validées",
        "Elle réinitialise automatiquement son mot de passe à « 0000 »",
        "Elle le promeut super administrateur"
      ],
      "bonneReponse": "Elle coupe les sessions actives de l'agent",
      "explication": "La désactivation d'un compte coupe les sessions de l'agent ; il s'agit d'une opération réversible (activation/désactivation) distincte de la suppression douce."
    },
    {
      "question": "Lors de l'enregistrement groupé de comptes via l'import CSV (/users/import), que fournit le rapport d'import ?",
      "options": [
        "Le nombre d'importés / ignorés, avec les erreurs détaillées par ligne",
        "Uniquement un message « Terminé », sans détail",
        "Le score Academy de chaque compte",
        "La hiérarchie de validation des activités"
      ],
      "bonneReponse": "Le nombre d'importés / ignorés, avec les erreurs détaillées par ligne",
      "explication": "L'import CSV affiche un rapport indiquant les comptes importés et ignorés, ainsi que les erreurs ligne par ligne ; un modèle CSV téléchargeable et une aide sur les clés de rôle valides sont fournis."
    },
    {
      "question": "Dans le Concepteur de formulaires (/forms/new), quelle famille de type de champ est disponible parmi les suivantes ?",
      "options": [
        "Le champ « lien EduLex » reliant le formulaire au référentiel réglementaire",
        "Un champ « signature biométrique » obligatoire",
        "Un champ « paiement Mobile Money »",
        "Un champ « géolocalisation GPS continue »"
      ],
      "bonneReponse": "Le champ « lien EduLex » reliant le formulaire au référentiel réglementaire",
      "explication": "Les types de champs incluent texte court/long, date, nombre, listes, radio, cases, fichier, image, tableau répétable, champ calculé et lien EduLex ; le concepteur gère aussi le cycle de vie (Publier, Repasser en brouillon, Archiver) avec versionnage."
    },
    {
      "question": "Dans le circuit de validation (/validation), quelle série d'actions un valideur peut-il poser sur une activité au niveau hiérarchique qui lui est attribué ?",
      "options": [
        "Valider, Demander correction, Rejeter, puis Consolider une activité validée",
        "Publier en vigueur, Abroger, Suspendre",
        "Déposer un texte, Certifier V4",
        "Importer, Prévisualiser, Archiver"
      ],
      "bonneReponse": "Valider, Demander correction, Rejeter, puis Consolider une activité validée",
      "explication": "Les décisions du circuit sont Valider, Demander correction et Rejeter ; une activité validée peut ensuite être Consolidée pour être disponible au reporting. Un commentaire est obligatoire pour un rejet ou une demande de correction."
    },
    {
      "question": "Pourquoi un valideur peut-il être empêché de statuer sur une activité pourtant en attente ?",
      "options": [
        "Parce qu'il ne se trouve pas au niveau hiérarchique requis (badge « Niveau X/Y »)",
        "Parce que l'activité a déjà un export PDF",
        "Parce que son profil est de type « École »",
        "Parce que le pays sélectionné est la Côte d'Ivoire"
      ],
      "bonneReponse": "Parce qu'il ne se trouve pas au niveau hiérarchique requis (badge « Niveau X/Y »)",
      "explication": "La validation est multi-niveaux : on ne peut statuer qu'au niveau hiérarchique attribué, indiqué par le badge « Niveau X/Y » ; sinon un message le signale."
    },
    {
      "question": "Dans la Gestion des absences (/absences), que permet l'action « Comptabiliser directement (validée d'office) » ?",
      "options": [
        "Enregistrer une absence approuvée d'office sans passer par une demande de l'agent",
        "Supprimer la politique d'absences de l'organisation",
        "Convertir une absence en activité validée",
        "Bloquer le compte de l'agent concerné"
      ],
      "bonneReponse": "Enregistrer une absence approuvée d'office sans passer par une demande de l'agent",
      "explication": "Le supérieur (ou le super administrateur) peut comptabiliser directement une absence validée d'office, en choisissant l'agent, le motif, les dates et le nombre de jours, sans demande préalable de l'agent."
    },
    {
      "question": "Dans la politique d'absences, à quoi correspondent les pastilles « Seuil atteint » et « Quota dépassé » par agent ?",
      "options": [
        "À des alertes fondées sur le seuil d'alerte et le congé annuel réglementaire réglés dans la politique",
        "À des badges de l'EduLex Academy",
        "À des niveaux de vérification EduLex",
        "Au taux de validation des activités"
      ],
      "bonneReponse": "À des alertes fondées sur le seuil d'alerte et le congé annuel réglementaire réglés dans la politique",
      "explication": "La politique d'absences définit le congé annuel réglementaire (quota) et le seuil d'alerte ; la barre « Cumul d'absences approuvées » et les pastilles « Seuil atteint » / « Quota dépassé » signalent les franchissements. Seules les absences approuvées sont comptées."
    },
    {
      "question": "Lors de la génération d'un rapport institutionnel (/reports/new), quelles activités sont agrégées dans le périmètre choisi ?",
      "options": [
        "Les activités au statut « Validé » ou « Consolidé »",
        "Toutes les activités, y compris les brouillons",
        "Uniquement les activités rejetées",
        "Uniquement les rendez-vous honorés"
      ],
      "bonneReponse": "Les activités au statut « Validé » ou « Consolidé »",
      "explication": "Le rapport (titre, périodicité, pays, organisation, structure, dates) agrège les activités au statut « Validé » ou « Consolidé » du périmètre sélectionné."
    },
    {
      "question": "Dans le référentiel EduLex, quel est le niveau de vérification de tout texte nouvellement déposé ou importé, et jusqu'où peut-il progresser ?",
      "options": [
        "Il naît en V0 et peut progresser jusqu'à V4",
        "Il naît en V4 et rétrograde jusqu'à V0",
        "Il naît en V2, sans progression possible",
        "Il naît « En vigueur » et ne change plus"
      ],
      "bonneReponse": "Il naît en V0 et peut progresser jusqu'à V4",
      "explication": "Tout texte (dépôt ou import) est créé au niveau V0, puis franchit successivement V1, V2, V3 et V4 dans la File de validation, via le panneau « Validation à partir de sources officielles »."
    },
    {
      "question": "Dans l'EduLex Academy, quels sont les 5 niveaux de compétence du profil de progression ?",
      "options": [
        "Découverte, Compréhension, Application, Maîtrise, Expert / Référent",
        "Bronze, Argent, Or, Platine, Diamant",
        "V0, V1, V2, V3, V4",
        "Brouillon, Soumis, En examen, Validé, Consolidé"
      ],
      "bonneReponse": "Découverte, Compréhension, Application, Maîtrise, Expert / Référent",
      "explication": "Le profil Academy présente les XP, la série et le niveau, ainsi que 5 niveaux de compétence : Découverte, Compréhension, Application, Maîtrise et Expert / Référent ; il s'accompagne de badges et d'un classement citoyen."
    },
    {
      "question": "Dans l'espace Administration (/admin), à quoi sert l'éditeur « Hiérarchie de validation » des activités ?",
      "options": [
        "À ordonner les rôles valideurs, ajouter/retirer un niveau, puis enregistrer la chaîne",
        "À régler la photo de profil de chaque agent",
        "À publier les parcours de l'Academy",
        "À déposer un texte EduLex en V0"
      ],
      "bonneReponse": "À ordonner les rôles valideurs, ajouter/retirer un niveau, puis enregistrer la chaîne",
      "explication": "L'éditeur permet d'ordonner les rôles valideurs (Monter / Descendre / Retirer), d'ajouter un niveau et d'enregistrer ; laisser la chaîne vide rétablit une validation en une seule étape."
    }
  ]
};
