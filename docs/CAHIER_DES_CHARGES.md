# CLAUDE.md — Construction complète de l’application web **EduWeb Governance**

> Document de pilotage technique et fonctionnel destiné à Claude Code pour générer entièrement l’application web Node.js/TypeScript **EduWeb Governance**, incluant le management administratif, le reporting institutionnel, le référentiel réglementaire international **EduLex**, la déclinaison **EduLex CI**, et l’espace ludique d’autoévaluation **EduLex Academy**.

---

## 0. Instruction principale pour Claude Code

Tu dois construire une application web moderne, professionnelle, ergonomique, responsive et prête à évoluer en SaaS multi-organisation et multi-pays.

L’application doit être développée en **Node.js avec TypeScript**. Elle doit proposer une interface contemporaine, claire, institutionnelle, avec une excellente ergonomie, des tableaux de bord infographiques, des composants visuels soignés, une navigation fluide et une police légèrement arrondie.

L’application s’appelle :

# **EduWeb Governance**

Elle contient un module réglementaire international nommé :

# **EduLex**

La Côte d’Ivoire n’est qu’une déclinaison nationale :

# **EduLex CI**

Il faut donc concevoir le système avec un **filtre par pays**, une architecture internationale, et des données réglementaires contextualisées par pays, langue, juridiction, ministère, secteur et statut.

---

## 1. Vision générale du produit

**EduWeb Governance** est une plateforme web de gouvernance administrative destinée aux institutions, administrations publiques, ministères techniques, établissements d’enseignement, réseaux professionnels, associations structurées et organisations disposant de plusieurs niveaux hiérarchiques.

Elle permet de :

1. gérer une organisation hiérarchisée ;
2. gérer les utilisateurs, rôles, structures et permissions ;
3. configurer des formulaires d’activités ;
4. saisir, soumettre, valider, corriger et consolider les activités ;
5. générer automatiquement des rapports institutionnels ;
6. gérer un référentiel international de textes réglementaires avec EduLex ;
7. filtrer les textes réglementaires par pays, secteur, ministère, statut et niveau de validation ;
8. proposer une autoévaluation interactive et ludique de la maîtrise des textes avec EduLex Academy ;
9. offrir des tableaux de bord infographiques, des indicateurs et des exports professionnels.

Le produit doit être conçu comme une application SaaS évolutive : plusieurs institutions clientes, plusieurs pays, plusieurs langues et plusieurs référentiels nationaux doivent pouvoir coexister.

---

## 2. Stack technique recommandée

Claude Code doit générer une application moderne avec une stack Node.js cohérente.

### 2.1. Stack principale

- **Runtime** : Node.js, version LTS récente.
- **Langage** : TypeScript strict.
- **Framework web** : Next.js avec App Router.
- **UI** : React, Tailwind CSS, composants accessibles inspirés de shadcn/ui et Radix UI.
- **Icônes** : Lucide React ou équivalent.
- **Graphiques** : Recharts ou équivalent React simple et maintenable.
- **Animations sobres** : Framer Motion ou transitions CSS, sans surcharge.
- **ORM** : Prisma.
- **Base de données** : PostgreSQL en production ; SQLite possible uniquement pour un mode démo local.
- **Authentification** : Auth.js ou implémentation sécurisée avec sessions, rôles et permissions.
- **Validation** : Zod.
- **Formulaires** : React Hook Form + Zod.
- **Tests** : Vitest pour la logique, Playwright pour les parcours critiques.
- **Internationalisation** : architecture i18n dès le départ, au minimum français et anglais.

### 2.2. Contraintes de qualité

- Utiliser TypeScript en mode strict.
- Ne pas coder en dur les pays, ministères, catégories ou statuts : tout doit être paramétrable.
- Créer des composants réutilisables.
- Séparer clairement : UI, logique métier, accès données, validation, permissions.
- Prévoir des migrations Prisma propres.
- Fournir un système de seed réaliste.
- Prévoir une documentation `README.md` et des scripts de démarrage.

---

## 3. Direction artistique et ergonomie

L’application doit donner une impression de sérieux institutionnel, de modernité, de confiance, de lisibilité et d’innovation EduWeb.

### 3.1. Police

Utiliser une police légèrement arrondie, lisible et professionnelle.

Recommandation :

- `Nunito Sans` pour l’interface principale ;
- ou `Manrope` / `Plus Jakarta Sans` si le rendu est plus élégant ;
- charger la police avec `next/font/google` si possible.

La typographie doit être douce, moderne, légèrement arrondie, mais pas enfantine.

### 3.2. Style visuel

- Design clair, institutionnel et premium.
- Coins arrondis : cartes, boutons, badges et modales en `rounded-2xl` ou `rounded-3xl`.
- Couleurs dominantes : vert profond EduWeb, bleu institutionnel, blanc, gris doux, touches or/ambre pour les réussites.
- Utiliser des ombres légères, des cartes aérées et des espaces généreux.
- Interface responsive desktop, tablette et mobile.
- Ajouter des micro-interactions : hover, transitions, animation discrète de progression.

### 3.3. Palette proposée

- Vert EduWeb profond : `#0F766E` ou `#047857`.
- Vert clair de fond : `#ECFDF5`.
- Bleu institutionnel : `#1D4ED8`.
- Bleu nuit : `#0F172A`.
- Or / réussite : `#F59E0B`.
- Rouge alerte : `#DC2626`.
- Gris texte : `#334155`.
- Fond général : `#F8FAFC`.

### 3.4. Infographie professionnelle

Les tableaux de bord doivent être très visuels :

- cartes KPI ;
- jauges de progression ;
- courbes d’évolution ;
- diagrammes circulaires ou anneaux ;
- timelines de validation ;
- organigrammes ;
- cartes de synthèse par pays ;
- matrices de conformité ;
- barres de progression façon apprentissage ;
- badges et trophées pour EduLex Academy.

L’infographie doit rester professionnelle, lisible et exploitable par des décideurs.

---

## 4. Architecture produit

```mermaid
flowchart TD
    A[EduWeb Governance] --> B[Organisation & Structures]
    A --> C[Utilisateurs, rôles & accès]
    A --> D[Formulaires d'activités]
    A --> E[Activités & soumissions]
    A --> F[Validation hiérarchique]
    A --> G[Reporting institutionnel]
    A --> H[Tableaux de bord]
    A --> I[Notifications]
    A --> J[Archives]
    A --> K[Administration]
    A --> L[EduLex]
    L --> L1[Référentiel réglementaire international]
    L --> L2[Filtre pays et juridictions]
    L --> L3[EduLex CI]
    L --> L4[Dépôt ministériel]
    L --> L5[Validation juridique]
    L --> L6[Moteur de recherche]
    L --> L7[Archives et versions]
    L --> L8[EduLex Academy]
    L8 --> M1[Parcours ludiques]
    L8 --> M2[Quiz et cas pratiques]
    L8 --> M3[Niveaux de compétence]
    L8 --> M4[Badges, XP, classements]
```

---

## 5. Modules principaux à construire

## 5.1. Module Tableau de bord global

Créer une page d’accueil connectée qui s’adapte au profil de l’utilisateur.

Elle doit afficher :

- nombre d’activités saisies ;
- nombre d’activités validées ;
- activités en attente de validation ;
- rapports générés ;
- textes réglementaires disponibles ;
- textes à vérifier ;
- progression EduLex Academy ;
- alertes importantes ;
- échéances proches ;
- statistiques par structure, pays ou ministère selon les droits.

Le dashboard doit être fortement infographique.

---

## 5.2. Module Organisation

Fonctionnalités :

- créer une organisation cliente ;
- créer des structures hiérarchiques ;
- rattacher une structure à une structure supérieure ;
- gérer directions, sous-directions, services, antennes, régions, coordinations, équipes ;
- associer les structures à un pays et éventuellement à une région administrative ;
- visualiser l’organigramme ;
- importer une structure par fichier CSV ou Excel ;
- historiser les changements d’organisation.

Objets principaux :

- Organisation ;
- Structure ;
- Country ;
- Region ;
- Department ;
- ParentStructure ;
- StructureManager.

---

## 5.3. Module Utilisateurs, rôles et permissions

Fonctionnalités :

- créer un utilisateur ;
- attribuer un ou plusieurs rôles ;
- affecter un utilisateur à une organisation, une structure, un pays et éventuellement un ministère ;
- définir son supérieur hiérarchique ;
- activer/désactiver le compte ;
- réinitialiser le mot de passe ;
- consulter l’historique de connexion ;
- gérer les droits par module et par action.

Rôles généraux :

- Super Administrateur EduWeb ;
- Administrateur institutionnel ;
- Responsable national / central ;
- Responsable régional / intermédiaire ;
- Responsable local / chef de service ;
- Agent / contributeur ;
- Contrôleur / auditeur ;
- Lecteur simple.

Rôles spécialisés EduLex :

- Super Administrateur EduLex ;
- Administrateur pays ;
- Administrateur ministériel ;
- Service technique déposant ;
- Validateur documentaire ;
- Validateur juridique ;
- Éditeur EduLex Academy ;
- Citoyen apprenant ;
- Public autorisé.

Prévoir un RBAC complet, extensible, avec permissions fines : `create`, `read`, `update`, `delete`, `validate`, `publish`, `archive`, `export`, `import`, `manage`.

---

## 5.4. Module Formulaires d’activités

Permettre à l’administrateur de créer des formulaires personnalisés.

Types de champs :

- texte court ;
- texte long ;
- date ;
- nombre ;
- liste déroulante ;
- cases à cocher ;
- bouton radio ;
- fichier joint ;
- image ;
- tableau répétable ;
- champ obligatoire/facultatif ;
- champ calculé ;
- champ lié à un texte EduLex.

Chaque formulaire doit être versionné.

---

## 5.5. Module Activités

Fonctionnalités :

- saisir une activité ;
- enregistrer comme brouillon ;
- soumettre à validation ;
- modifier avant soumission ;
- ajouter pièces jointes, images, documents ;
- associer une activité à un ou plusieurs textes EduLex ;
- voir l’état : brouillon, soumis, en examen, validé, rejeté, à corriger, consolidé, archivé ;
- suivre les corrections demandées ;
- filtrer par période, structure, agent, statut, type, texte réglementaire associé.

---

## 5.6. Module Validation hiérarchique

Le workflow doit être configurable.

Exemple :

```mermaid
sequenceDiagram
    participant Agent
    participant ChefService
    participant ResponsableRegional
    participant NiveauCentral
    Agent->>ChefService: Soumet l'activité
    ChefService-->>Agent: Demande correction ou valide
    ChefService->>ResponsableRegional: Transmet
    ResponsableRegional-->>ChefService: Valide ou rejette
    ResponsableRegional->>NiveauCentral: Consolide
    NiveauCentral->>NiveauCentral: Génère rapport final
```

Chaque action doit être tracée :

- utilisateur ;
- date/heure ;
- décision ;
- commentaire ;
- statut précédent ;
- nouveau statut ;
- adresse IP si disponible ;
- module concerné.

---

## 5.7. Module Reporting institutionnel

Fonctionnalités :

- générer des rapports hebdomadaires, mensuels, trimestriels, semestriels, annuels ou personnalisés ;
- utiliser des modèles de rapports configurables ;
- intégrer automatiquement activités validées, indicateurs, tableaux et graphiques ;
- intégrer les références réglementaires EduLex utilisées ;
- exporter en PDF, Word, Excel, CSV ;
- archiver les rapports ;
- conserver l’état des textes réglementaires au moment de la génération du rapport.

Plan type d’un rapport :

1. page de garde ;
2. sommaire ;
3. introduction ;
4. contexte ;
5. objectifs ;
6. activités réalisées ;
7. résultats obtenus ;
8. analyse des indicateurs ;
9. difficultés ;
10. solutions ;
11. recommandations ;
12. perspectives ;
13. conclusion ;
14. annexes ;
15. références réglementaires.

---

## 5.8. Module Notifications

Canaux :

- notification interne ;
- e-mail ;
- SMS ou WhatsApp en extension future.

Événements :

- échéance de saisie ;
- activité soumise ;
- activité validée ;
- rejet ou correction demandée ;
- rapport disponible ;
- texte réglementaire publié ;
- texte remplacé, abrogé ou à vérifier ;
- parcours EduLex Academy débloqué ;
- défi quotidien disponible.

---

# 6. Module international **EduLex**

EduLex est un référentiel réglementaire international. Il doit permettre d’héberger les textes de plusieurs pays. **EduLex CI** est la déclinaison ivoirienne initiale.

## 6.1. Principe international

Ne jamais concevoir EduLex comme un module limité à la Côte d’Ivoire.

Chaque texte doit être lié à :

- un pays ;
- une juridiction ;
- une langue ;
- un ministère ou organisme émetteur ;
- un secteur ;
- un type de texte ;
- un statut ;
- un niveau de vérification ;
- une source ;
- une version.

Le filtre pays doit être visible dans l’interface, notamment dans :

- la barre supérieure ;
- la page EduLex ;
- la recherche réglementaire ;
- EduLex Academy ;
- les tableaux de bord ;
- les imports ;
- les exports ;
- les rapports.

Exemples :

- EduLex CI — Côte d’Ivoire ;
- EduLex SN — Sénégal ;
- EduLex BJ — Bénin ;
- EduLex CM — Cameroun ;
- EduLex FR — France ;
- EduLex Global — textes internationaux ou supranationaux.

## 6.2. Champs de métadonnées EduLex

Chaque texte doit contenir au minimum :

- pays ;
- code pays ISO ;
- juridiction ;
- ministère émetteur ;
- direction ou service technique ;
- secteur ;
- sous-secteur ;
- type de texte ;
- titre officiel ;
- numéro officiel ;
- date de signature ;
- date de publication ;
- date d’entrée en vigueur ;
- résumé analytique ;
- mots-clés ;
- fichier officiel joint ;
- URL source ;
- statut du texte ;
- niveau de vérification ;
- texte remplacé ou modifié ;
- relation avec d’autres textes ;
- niveau de confidentialité ;
- langue ;
- version ;
- code EduLex.

## 6.3. Statuts des textes

- En vigueur ;
- Abrogé ;
- Modifié ;
- Remplacé ;
- Suspendu ;
- En attente de validation ;
- À vérifier ;
- Archivé ;
- Brouillon ;
- Importé non vérifié.

## 6.4. Niveau de vérification

Prévoir une échelle claire :

- `V0` : entrée importée ou indexée, non encore vérifiée ;
- `V1` : vérification documentaire minimale ;
- `V2` : vérification par service technique ;
- `V3` : validation juridique ou institutionnelle ;
- `V4` : texte officiellement certifié dans la base.

Afficher visuellement ce niveau avec badges colorés.

## 6.5. Codification internationale

La codification doit être internationalisée.

Format recommandé :

```text
COUNTRY-JUR-SECTOR-TYPE-YEAR-NUM-VERSION
```

Exemples :

```text
CI-PR-CST-CONST-2016-001-V3
CI-MENA-EDU-DEC-2026-004-V1
CI-MESRS-SUP-ARR-2026-012-V1
SN-MEN-EDU-LOI-2025-001-V1
BJ-MTFP-ADM-DEC-2024-019-V2
GLOBAL-UNESCO-EDU-REC-2023-001-V1
```

Pour la Côte d’Ivoire, `CI` est le code pays.

## 6.6. Sous-espaces EduLex

1. Base réglementaire internationale ;
2. Sélecteur pays et juridictions ;
3. Dépôt des textes ;
4. Circuit de validation documentaire et juridique ;
5. Codification automatique ;
6. Moteur de recherche ;
7. Archives et versions ;
8. Relations entre textes ;
9. EduLex Academy ;
10. Tableaux de bord réglementaires.

## 6.7. Dépôt des textes

Les utilisateurs autorisés doivent pouvoir déposer un texte avec :

- formulaire guidé ;
- fichier PDF ou document officiel ;
- métadonnées ;
- source ;
- pays ;
- ministère ;
- secteur ;
- statut initial ;
- niveau de vérification initial ;
- affectation à un validateur.

## 6.8. Validation EduLex

Workflow :

```mermaid
flowchart LR
    A[Dépôt service technique] --> B[Vérification documentaire]
    B --> C[Contrôle des métadonnées]
    C --> D[Vérification juridique]
    D --> E[Validation pays ou ministère]
    E --> F[Publication EduLex]
    F --> G[Archivage et versioning]
```

Aucun texte ne doit être marqué comme officiellement validé sans validation humaine.

## 6.9. Moteur de recherche EduLex

Recherche simple :

- mot-clé ;
- titre ;
- numéro ;
- ministère ;
- secteur ;
- pays.

Recherche avancée :

- pays ;
- langue ;
- juridiction ;
- type ;
- statut ;
- niveau de vérification ;
- date ;
- relation avec un autre texte ;
- source ;
- accès public/restreint.

Recherche intelligente :

- requête naturelle ;
- suggestions de textes ;
- tri par pertinence ;
- filtres visibles ;
- avertissement clair si un résultat est à vérifier.

Exemples de requêtes :

- « textes en vigueur sur la formation continue des enseignants en Côte d’Ivoire » ;
- « décrets relatifs à la fonction publique au Sénégal » ;
- « Constitution de Côte d’Ivoire » ;
- « textes abrogés dans le secteur éducation ».

---

# 7. Sous-module **EduLex Academy**

EduLex Academy est l’espace d’apprentissage, de vulgarisation et d’autoévaluation de l’appropriation des textes réglementaires.

Il doit être interactif, ludique, progressif et catégorisé avec différents niveaux de compétence, dans l’esprit de la progression d’une application d’apprentissage comme Duolingo, mais avec un style institutionnel adapté à la gouvernance, au droit et à la citoyenneté.

## 7.1. Objectifs

EduLex Academy doit permettre de :

1. vulgariser les textes réglementaires ;
2. aider les citoyens à comprendre leurs droits et devoirs ;
3. aider les agents publics à maîtriser les textes de leur secteur ;
4. proposer des parcours par pays, domaine, ministère et niveau ;
5. créer des exercices interactifs ;
6. mesurer la progression de l’utilisateur ;
7. attribuer badges, XP, niveaux, certificats ;
8. générer des statistiques de maîtrise réglementaire ;
9. relier chaque question au texte officiel correspondant.

## 7.2. Filtre pays dans EduLex Academy

L’utilisateur doit toujours pouvoir choisir le pays de référence.

Exemples :

- Tous les pays ;
- Côte d’Ivoire ;
- Sénégal ;
- Bénin ;
- Cameroun ;
- France ;
- Textes internationaux.

Quand le pays est Côte d’Ivoire, l’espace affiche **EduLex CI Academy**.

## 7.3. Catégories de parcours

- Constitution et institutions ;
- Droits et devoirs du citoyen ;
- Éducation et formation ;
- Enseignement supérieur et recherche ;
- Fonction publique ;
- Travail et emploi ;
- Santé publique ;
- Environnement ;
- Justice et état civil ;
- Sécurité routière ;
- Fiscalité ;
- Collectivités territoriales ;
- Marchés publics ;
- Gouvernance administrative ;
- Protection des données et numérique ;
- Textes propres à un ministère ;
- Textes internationaux.

## 7.4. Niveaux de compétence

Créer une progression claire, ludique et professionnelle.

### Niveau 1 — Découverte

Objectif : identifier les notions de base.

Activités :

- reconnaître le type de texte ;
- identifier son objet ;
- associer un texte à un domaine ;
- repérer quelques mots-clés ;
- répondre à des questions simples.

### Niveau 2 — Compréhension

Objectif : comprendre le sens général.

Activités :

- interpréter une disposition ;
- repérer droits, devoirs et obligations ;
- distinguer autorisé, interdit, obligatoire ;
- identifier les acteurs concernés.

### Niveau 3 — Application

Objectif : appliquer un texte à une situation.

Activités :

- résoudre un mini-cas pratique ;
- choisir la bonne procédure ;
- identifier l’autorité compétente ;
- déterminer les conséquences d’un non-respect.

### Niveau 4 — Maîtrise

Objectif : analyser les liens et implications.

Activités :

- comparer deux textes ;
- identifier les textes modifiés ou abrogés ;
- analyser une situation administrative ;
- justifier une décision par une référence.

### Niveau 5 — Expert / Référent

Objectif : conseiller, contrôler ou former.

Activités :

- produire une note de synthèse ;
- corriger une mauvaise interprétation ;
- construire une grille de conformité ;
- proposer une conduite conforme.

## 7.5. Types d’exercices interactifs

Prévoir un moteur d’activités pouvant gérer :

- QCU ;
- QCM ;
- vrai/faux ;
- texte à trous ;
- glisser-déposer ;
- association texte/domaine ;
- association disposition/situation ;
- classement chronologique ;
- repérage du statut : en vigueur, abrogé, modifié, remplacé ;
- quiz chronométré ;
- mini-cas pratique ;
- simulation de décision administrative ;
- scénario citoyen interactif ;
- défi quotidien ;
- défi hebdomadaire ;
- révision personnalisée ;
- quiz de certification.

## 7.6. Feedback pédagogique

Après chaque réponse, afficher :

- bonne réponse ;
- explication simplifiée ;
- référence du texte ;
- article ou disposition applicable ;
- lien vers le texte complet ;
- recommandation de révision ;
- niveau de confiance du texte : V0 à V4.

## 7.7. Gamification

Fonctionnalités ludiques attendues :

- XP ;
- étoiles ;
- badges ;
- trophées ;
- streak ou série quotidienne ;
- défi quotidien ;
- défi hebdomadaire ;
- niveaux à débloquer ;
- unités verrouillées par prérequis ;
- classement institutionnel ;
- classement citoyen ;
- barre de progression ;
- score de maîtrise réglementaire ;
- attestation de parcours.

Badges proposés :

- Citoyen averti ;
- Défenseur des droits ;
- Maître des procédures ;
- Référent Constitution ;
- Expert Fonction publique ;
- Ambassadeur de la conformité ;
- Veilleur réglementaire EduLex ;
- Explorateur EduLex International.

## 7.8. Tableau de bord personnel

Afficher :

- parcours commencés ;
- parcours terminés ;
- niveau atteint ;
- XP ;
- badges ;
- textes maîtrisés ;
- textes à revoir ;
- erreurs fréquentes ;
- temps d’apprentissage ;
- taux de réussite ;
- recommandations.

## 7.9. Administration EduLex Academy

L’administrateur doit pouvoir :

- créer des catégories ;
- créer des parcours ;
- créer des unités et leçons ;
- créer des questions ;
- importer des questions par CSV/Excel ;
- rattacher chaque question à un texte EduLex ;
- définir le pays, secteur, niveau et difficulté ;
- gérer les badges ;
- gérer les certificats ;
- publier/dépublier un quiz ;
- suspendre automatiquement les questions liées à un texte abrogé ou à vérifier.

---

# 8. Parcours utilisateur attendus

## 8.1. Agent qui saisit une activité

1. Connexion ;
2. accès au tableau de bord ;
3. sélection du formulaire ;
4. saisie de l’activité ;
5. ajout de preuves ;
6. association éventuelle à un texte EduLex ;
7. soumission ;
8. suivi du statut ;
9. correction si nécessaire ;
10. validation finale.

## 8.2. Service technique qui dépose un texte EduLex

1. Connexion ;
2. sélection du pays ;
3. dépôt du texte ;
4. ajout des métadonnées ;
5. génération du code EduLex ;
6. soumission à validation ;
7. suivi du workflow ;
8. publication après validation.

## 8.3. Citoyen qui utilise EduLex Academy

1. Accès à EduLex Academy ;
2. choix du pays ;
3. choix d’une catégorie ;
4. démarrage d’un parcours ;
5. quiz progressifs ;
6. feedback immédiat ;
7. gain de XP ;
8. badge ;
9. déblocage du niveau suivant ;
10. attestation si le parcours est validé.

---

# 9. Modèle de données recommandé

Utiliser Prisma avec PostgreSQL.

## 9.1. Entités principales

- User ;
- Account ;
- Session ;
- Role ;
- Permission ;
- UserRole ;
- Organization ;
- Structure ;
- Country ;
- Region ;
- Ministry ;
- Sector ;
- ActivityForm ;
- ActivityFormField ;
- Activity ;
- ActivitySubmission ;
- Workflow ;
- WorkflowStep ;
- ValidationAction ;
- ReportTemplate ;
- Report ;
- Notification ;
- AuditLog ;
- FileAsset.

## 9.2. Entités EduLex

- LegalText ;
- LegalTextVersion ;
- LegalTextRelation ;
- LegalTextSource ;
- LegalTextAttachment ;
- LegalTextMetadata ;
- LegalValidationWorkflow ;
- LegalValidationAction ;
- LegalTextTag ;
- LegalTextCategory ;
- Jurisdiction ;
- VerificationLevel ;
- LegalStatus.

## 9.3. Entités EduLex Academy

- AcademyCategory ;
- AcademyPath ;
- AcademyUnit ;
- AcademyLesson ;
- Question ;
- QuestionChoice ;
- QuestionAttempt ;
- UserProgress ;
- UserXP ;
- Badge ;
- UserBadge ;
- Challenge ;
- ChallengeAttempt ;
- Leaderboard ;
- Certificate ;
- ReviewRecommendation.

## 9.4. Relations essentielles

- Un pays possède plusieurs ministères, secteurs et textes.
- Un texte possède plusieurs versions.
- Un texte peut modifier, remplacer ou abroger un autre texte.
- Une activité peut être liée à plusieurs textes.
- Une question Academy doit être liée à un texte, et si possible à un article ou une disposition.
- Un utilisateur peut avoir plusieurs rôles.
- Un rôle a plusieurs permissions.
- Une organisation peut opérer dans un ou plusieurs pays.

---

# 10. Routes et pages à créer

## 10.1. Pages publiques

- `/` : landing page professionnelle ;
- `/login` ;
- `/register` si mode public autorisé ;
- `/edulex` : recherche publique ou semi-publique selon configuration ;
- `/edulex/academy` : accueil public ou connecté des parcours ;
- `/about` ;
- `/contact`.

## 10.2. Espace connecté

- `/dashboard` ;
- `/organization` ;
- `/organization/structures` ;
- `/users` ;
- `/forms` ;
- `/activities` ;
- `/activities/new` ;
- `/validation` ;
- `/reports` ;
- `/reports/templates` ;
- `/notifications` ;
- `/archives` ;
- `/admin`.

## 10.3. EduLex

- `/edulex` ;
- `/edulex/search` ;
- `/edulex/texts` ;
- `/edulex/texts/new` ;
- `/edulex/texts/[id]` ;
- `/edulex/texts/[id]/versions` ;
- `/edulex/deposits` ;
- `/edulex/validation` ;
- `/edulex/countries` ;
- `/edulex/ministries` ;
- `/edulex/sectors` ;
- `/edulex/import` ;
- `/edulex/dashboard`.

## 10.4. EduLex Academy

- `/academy` ;
- `/academy/country/[countryCode]` ;
- `/academy/categories` ;
- `/academy/path/[id]` ;
- `/academy/lesson/[id]` ;
- `/academy/quiz/[id]` ;
- `/academy/progress` ;
- `/academy/badges` ;
- `/academy/leaderboard` ;
- `/academy/admin` ;
- `/academy/admin/questions` ;
- `/academy/admin/import`.

---

# 11. Composants UI à créer

## 11.1. Composants globaux

- AppShell ;
- Sidebar ;
- Topbar ;
- CountrySelector ;
- OrganizationSwitcher ;
- UserMenu ;
- Breadcrumbs ;
- PageHeader ;
- DataTable ;
- FilterBar ;
- SearchBox ;
- StatusBadge ;
- VerificationBadge ;
- EmptyState ;
- LoadingSkeleton ;
- ConfirmDialog ;
- FileUploader ;
- AuditTimeline.

## 11.2. Composants dashboard

- KPICard ;
- TrendCard ;
- DonutChartCard ;
- BarChartCard ;
- ProgressRing ;
- WorkflowTimeline ;
- ComplianceMatrix ;
- CountryMapPlaceholder ;
- RecentActivityFeed.

## 11.3. Composants EduLex

- LegalTextCard ;
- LegalTextDetail ;
- LegalTextVersionTimeline ;
- LegalRelationGraph ;
- LegalSearchAdvanced ;
- LegalDepositForm ;
- LegalValidationPanel ;
- LegalSourceBadge ;
- LegalStatusBadge ;
- LegalTextCitationBox.

## 11.4. Composants EduLex Academy

- AcademyHero ;
- PathMap ;
- UnitNode ;
- LessonCard ;
- XPBar ;
- StreakCard ;
- BadgeShelf ;
- QuizPlayer ;
- QuestionRenderer ;
- FeedbackPanel ;
- ProgressDashboard ;
- LeaderboardCard ;
- CertificatePreview.

---

# 12. Interface principale attendue

## 12.1. Topbar

La topbar doit contenir :

- logo EduWeb Governance ;
- sélecteur de pays ;
- sélecteur d’organisation ;
- recherche globale ;
- notifications ;
- menu utilisateur.

Le sélecteur de pays est essentiel pour EduLex international.

## 12.2. Sidebar

Menu recommandé :

1. Tableau de bord ;
2. Organisation ;
3. Utilisateurs ;
4. Formulaires ;
5. Activités ;
6. Validation ;
7. Rapports ;
8. EduLex ;
9. EduLex Academy ;
10. Notifications ;
11. Archives ;
12. Administration.

---

# 13. Importation des données réglementaires

Le fichier Excel initial de textes réglementaires doit être considéré comme une base d’amorçage.

Fonctionnalités d’import :

- import multi-onglets ;
- mapping des colonnes ;
- détection des doublons ;
- affectation au pays ;
- affectation au secteur ;
- affectation au ministère ;
- prévisualisation avant import ;
- validation des lignes ;
- marquage `V0` pour données non vérifiées ;
- journalisation de l’import ;
- rollback possible ;
- rapport d’import.

Pour la Côte d’Ivoire, les entrées initiales doivent être associées à :

- countryCode : `CI` ;
- countryName : `Côte d’Ivoire` ;
- namespace : `EduLex CI`.

---

# 14. Sécurité et conformité

Fonctionnalités obligatoires :

- authentification sécurisée ;
- mots de passe hachés ;
- sessions sécurisées ;
- RBAC ;
- protection CSRF si applicable ;
- validation serveur des données ;
- audit log ;
- soft delete ;
- sauvegarde prévue ;
- restriction des fichiers téléversés ;
- contrôle MIME des uploads ;
- limitation des tailles de fichiers ;
- séparation des tenants ;
- droits spécifiques par pays et organisation.

Avertissement important :

- l’application ne doit jamais présenter un texte comme juridiquement certifié si son niveau de validation ne le permet pas ;
- les résumés et quiz générés ou importés doivent pouvoir être marqués `à vérifier` ;
- afficher clairement les sources et statuts.

---

# 15. Exports attendus

Exporter :

- rapports PDF ;
- rapports Word ;
- tableaux Excel ;
- CSV ;
- fiches de textes réglementaires ;
- résultats EduLex Academy ;
- statistiques par pays, ministère, institution ou utilisateur.

Pour le PDF :

- logo ;
- titre ;
- pays ;
- période ;
- structure ;
- date de génération ;
- pagination ;
- tableaux ;
- graphiques ;
- annexes ;
- références réglementaires.

---

# 16. Critères d’acceptation MVP

Le MVP est accepté si Claude Code produit une application permettant au minimum de :

1. se connecter ;
2. gérer les rôles essentiels ;
3. sélectionner un pays ;
4. créer une organisation et des structures ;
5. créer des utilisateurs ;
6. créer un formulaire d’activité ;
7. saisir une activité ;
8. soumettre une activité ;
9. valider ou rejeter une activité ;
10. générer un rapport simple ;
11. créer un texte EduLex ;
12. rattacher un texte à un pays ;
13. codifier un texte ;
14. rechercher un texte ;
15. afficher le statut et le niveau de vérification d’un texte ;
16. créer une catégorie EduLex Academy ;
17. créer un parcours ;
18. créer un quiz ;
19. répondre à un quiz ;
20. afficher score, XP, progression et feedback ;
21. afficher un dashboard moderne.

---

# 17. Phasage de développement recommandé

## Phase 1 — Socle technique

- Initialiser Next.js + TypeScript ;
- configurer Tailwind ;
- configurer Prisma ;
- configurer Auth ;
- créer AppShell ;
- créer thème visuel ;
- créer seed pays et rôles.

## Phase 2 — Gouvernance administrative

- Organisation ;
- utilisateurs ;
- formulaires ;
- activités ;
- validation ;
- rapports simples ;
- dashboard administratif.

## Phase 3 — EduLex international

- pays ;
- ministères ;
- secteurs ;
- textes ;
- versions ;
- statuts ;
- codification ;
- recherche ;
- import.

## Phase 4 — EduLex Academy

- catégories ;
- parcours ;
- leçons ;
- questions ;
- quiz player ;
- feedback ;
- XP ;
- badges ;
- progression ;
- leaderboard.

## Phase 5 — Finition professionnelle

- ergonomie ;
- infographie ;
- responsive ;
- animations ;
- tests ;
- exports ;
- documentation.

---

# 18. Données de démonstration à générer

Créer un seed avec :

- pays : Côte d’Ivoire, Sénégal, Bénin, Cameroun, France, Global ;
- organisations : EduWeb, Ministère de démonstration, Direction régionale fictive ;
- structures hiérarchiques ;
- utilisateurs de test par rôle ;
- textes EduLex CI de démonstration dont Constitution ;
- catégories EduLex Academy ;
- parcours Constitution et citoyenneté ;
- questions de démonstration ;
- badges ;
- activités et rapports fictifs.

Ne pas présenter les données fictives comme des données officielles.

---

# 19. Règles de contenu juridique

- Toujours afficher la source d’un texte si disponible.
- Toujours afficher le pays.
- Toujours afficher le statut du texte.
- Toujours afficher le niveau de vérification.
- Ne jamais mélanger un texte ivoirien avec un texte d’un autre pays sans signaler la juridiction.
- Les quiz doivent citer le texte source.
- Si un texte est `V0`, afficher un avertissement.
- Si un texte est abrogé ou remplacé, l’interface doit le signaler clairement.

---

# 20. Commandes attendues

Prévoir dans `package.json` :

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest",
    "test:e2e": "playwright test",
    "db:generate": "prisma generate",
    "db:migrate": "prisma migrate dev",
    "db:seed": "tsx prisma/seed.ts",
    "db:studio": "prisma studio"
  }
}
```

---

# 21. Variables d’environnement

Créer `.env.example` :

```env
DATABASE_URL="postgresql://user:password@localhost:5432/eduweb_governance"
NEXTAUTH_SECRET="change-me"
NEXTAUTH_URL="http://localhost:3000"
APP_NAME="EduWeb Governance"
DEFAULT_COUNTRY_CODE="CI"
DEFAULT_LANGUAGE="fr"
UPLOAD_MAX_MB="20"
```

---

# 22. Exigences finales pour Claude Code

Claude Code doit :

1. générer une application complète et cohérente ;
2. privilégier la qualité du code ;
3. créer une interface réellement moderne ;
4. utiliser une police légèrement arrondie ;
5. intégrer le filtre pays partout où EduLex intervient ;
6. considérer EduLex comme international ;
7. faire d’EduLex CI une simple déclinaison nationale ;
8. intégrer EduLex Academy comme espace ludique d’autoévaluation ;
9. construire une architecture évolutive ;
10. fournir des données de démonstration ;
11. fournir une documentation claire ;
12. exécuter les tests et corriger les erreurs évidentes ;
13. ne pas se limiter à une maquette statique ;
14. produire un vrai socle applicatif maintenable.

---

# 23. Résumé produit à afficher dans la landing page

**EduWeb Governance** est une plateforme de gouvernance administrative, de reporting institutionnel et de conformité réglementaire. Elle permet aux organisations de structurer leurs activités, sécuriser leurs validations, générer des rapports fiables et s’appuyer sur un référentiel réglementaire international avec **EduLex**.

Avec **EduLex Academy**, les citoyens, agents publics et responsables administratifs peuvent apprendre, comprendre et tester leur maîtrise des textes réglementaires à travers des parcours interactifs, progressifs et ludiques.

Slogan principal :

> **Structurez vos activités, sécurisez vos validations, maîtrisez vos textes, générez vos rapports.**

Slogan EduLex :

> **Centraliser, codifier, vérifier et comprendre les textes officiels en toute confiance.**

Slogan EduLex Academy :

> **Apprendre les textes, comprendre ses droits, progresser par défis.**

---

## 24. Priorité absolue

Commencer par construire un socle propre, fonctionnel, internationalisé et visuellement professionnel. Le code doit permettre ensuite d’enrichir progressivement la plateforme avec des données réelles, des connecteurs ministériels, des exports avancés, des notifications multicanales et des modules IA de vulgarisation sous contrôle humain.

