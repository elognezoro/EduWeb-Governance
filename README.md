# EduWeb Governance

> Plateforme de **gouvernance administrative**, de **reporting institutionnel** et de **conformité réglementaire**, avec le référentiel réglementaire international **EduLex** et l'espace d'apprentissage ludique **EduLex Academy**.

**Structurez vos activités, sécurisez vos validations, maîtrisez vos textes, générez vos rapports.**

---

## ✨ Aperçu

EduWeb Governance est une application web **Next.js / TypeScript** conçue comme un SaaS **multi-organisation et multi-pays**. Elle articule trois piliers :

| Pilier | Description |
| --- | --- |
| 🏛️ **Gouvernance** | Organisations & structures, utilisateurs/RBAC, formulaires d'activités, validation hiérarchique, reporting. |
| ⚖️ **EduLex** | Référentiel réglementaire **international** (filtre par pays), codification, statuts, niveaux de vérification `V0→V4`. *EduLex CI* n'est qu'une déclinaison nationale. |
| 🎓 **EduLex Academy** | Apprentissage ludique : parcours, quiz reliés au texte source, XP, badges, niveaux de compétence. |

> ⚠️ Les données fournies par le *seed* sont **fictives** et à but de démonstration — elles ne constituent pas des données officielles.

---

## 🧱 Stack technique

- **Framework** : Next.js 15 (App Router) · React 19 · TypeScript strict
- **UI** : Tailwind CSS 3 · composants maison (inspirés shadcn/ui) · Lucide · Recharts
- **Police** : Nunito Sans (`next/font`)
- **ORM / BDD** : Prisma 6 · **SQLite** (démo locale, bascule PostgreSQL prévue)
- **Auth** : sessions serveur maison (cookie httpOnly + bcrypt) avec **RBAC**
- **Validation** : Zod

---

## 🚀 Démarrage rapide

### Prérequis
- **Node.js ≥ 20** (testé avec v24) et npm

### Installation

```bash
# 1. Installer les dépendances
npm install

# 2. Variables d'environnement
copy .env.example .env      # Windows
# cp .env.example .env      # macOS / Linux

# 3. Base de données : créer le schéma + générer le client
npm run db:migrate          # applique la migration (crée prisma/dev.db)

# 4. Données de démonstration
npm run db:seed

# 5. Lancer en développement
npm run dev
```

Ouvrez **http://localhost:3000**.

### Comptes de démonstration

Mot de passe commun : **`password123`**

| E-mail | Rôle | Usage |
| --- | --- | --- |
| `admin@eduweb.ci` | Super Administrateur EduWeb | Accès complet |
| `directeur@eduweb.ci` | Administrateur institutionnel / Responsable national | Validation, reporting |
| `agent@eduweb.ci` | Agent / contributeur | Saisie d'activités |
| `juriste@eduweb.ci` | Validateur juridique EduLex | Dépôt / validation de textes |
| `apprenant@eduweb.ci` | Citoyen apprenant | EduLex Academy |

---

## 📜 Scripts npm

| Script | Description |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Serveur de production |
| `npm run lint` | Lint (ESLint) |
| `npm run db:migrate` | Crée/applique une migration Prisma |
| `npm run db:seed` | Charge les données de démonstration |
| `npm run db:studio` | Explorateur de base Prisma Studio |
| `npm run db:reset` | Réinitialise la base puis re-seed |
| `npm run db:generate` | Régénère le client Prisma |

---

## 🗂️ Structure du projet

```
src/
├─ app/
│  ├─ (auth)/login/         # Page de connexion
│  ├─ (app)/                # Espace connecté (AppShell + middleware)
│  │  ├─ dashboard/         # Tableau de bord infographique
│  │  ├─ edulex/            # Référentiel réglementaire + détail des textes
│  │  ├─ academy/           # EduLex Academy (parcours, niveaux)
│  │  ├─ organization, users, forms, activities,
│  │  │  validation, reports, notifications,
│  │  │  archives, admin, account/   # Modules (socle + à étoffer)
│  ├─ api/auth/             # login / logout
│  ├─ page.tsx              # Landing page publique
│  └─ layout.tsx            # Layout racine + police
├─ components/
│  ├─ ui/                   # Primitives (Button, Card, Badge, Menu…)
│  ├─ layout/               # AppShell, Sidebar, Topbar, CountrySelector…
│  ├─ dashboard/            # KPICard, graphiques Recharts
│  ├─ edulex/               # LegalTextCard…
│  └─ auth/                 # LoginForm
├─ lib/                     # prisma, auth, session, country, enums, utils
└─ config/                  # navigation
prisma/
├─ schema.prisma           # Modèle de données complet
└─ seed.ts                 # Données de démonstration
```

---

## 🌍 Filtre pays (EduLex international)

EduLex est **international par conception**. Le sélecteur de pays (barre supérieure) écrit un cookie `edulex_country` lu côté serveur pour filtrer le tableau de bord, EduLex et Academy. Pays fournis par le seed : 🇨🇮 CI · 🇸🇳 SN · 🇧🇯 BJ · 🇨🇲 CM · 🇫🇷 FR · 🌐 Global.

---

## 🗄️ Passer de SQLite à PostgreSQL

1. Dans `prisma/schema.prisma`, remplacer `provider = "sqlite"` par `provider = "postgresql"`.
2. Renseigner `DATABASE_URL` (PostgreSQL) dans `.env`.
3. `npm run db:migrate` puis `npm run db:seed`.

> Le schéma a été pensé pour la portabilité : les statuts/types/niveaux sont des `String` validés côté application (`src/lib/enums.ts`), et les structures flexibles sont du JSON sérialisé.

---

## 🔐 Sécurité

- Mots de passe hachés (bcrypt), sessions httpOnly (cookie `Secure` en production).
- RBAC : rôles système et permissions fines (`module:action`).
- Avertissements EduLex : un texte `V0` (non vérifié) ou non en vigueur est **toujours signalé**, jamais présenté comme certifié.

---

## 🗺️ Feuille de route (phases)

- **Phase 1 — Socle technique** ✅ : auth, AppShell, thème, schéma, seed, dashboard, EduLex (listing/détail), Academy (parcours).
- **Phase 2 — Gouvernance** ✅ : CRUD organisations/structures/utilisateurs, concepteur de formulaires versionnés, saisie & workflow de validation d'activités, génération de rapports (impression/PDF).
- **Phase 3 — EduLex** ✅ : dépôt guidé + codification automatique, circuit de validation V0→V4 + statuts/publication, recherche avancée, gestion des référentiels (pays/ministères/secteurs), import CSV d'amorçage.
- **Phase 4 — Academy** ✅ : lecteur de quiz interactif (QCU/QCM/Vrai-Faux), feedback pédagogique citant le texte source, XP/niveaux/série, badges, classement, administration des questions.
- **Phase 5 — Finition** ◐ : impression PDF des rapports, notifications (lu/non-lu), archives, test unitaire de codification. Restent à venir : exports Word/Excel, notifications multicanales, tests e2e, accessibilité avancée.

---

*Prototype généré comme socle applicatif maintenable. Données de démonstration uniquement.*
