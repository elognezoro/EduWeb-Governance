# 📱 App mobile EduWeb Gouvernance (Capacitor — Android)

L'app Android est une **coque native** qui charge le site déployé (`server.url`) et
ajoute des **notifications locales** pour les rappels de rendez-vous. Le même code
web tourne sur le téléphone ; les appels de notifications sont automatiquement
ignorés dans un navigateur de bureau.

- `capacitor.config.ts` — configuration (appId, URL de prod, plugin notifications).
- `mobile/www/index.html` — écran de chargement de secours (webDir).
- `src/components/mobile/mobile-reminders.tsx` — programme les rappels au lancement.
- `src/app/(app)/reminders-actions.ts` — fournit les RDV à venir.
- Les dossiers `android/` et `ios/` sont **générés localement** (gitignorés).

---

## 1. Pré-requis (sur ta machine)

- **Node 18+** (déjà installé).
- **Android Studio** récent (Ladybug ou +) avec le **JDK 21** (fourni avec Android
  Studio) et un **SDK Android** installé.
- Un téléphone Android (câble USB, débogage USB activé) ou un émulateur.

## 2. URL de production

Déjà configurée sur **`https://governance.eduweb.ci`** dans `capacitor.config.ts`.
Pour pointer ailleurs (préprod, test), édite la ligne `PROD_URL` ou définis une
variable d'environnement avant chaque `cap sync` :

```powershell
$env:CAP_SERVER_URL = "https://governance.eduweb.ci"
```

> L'URL doit être en **HTTPS** (le cookie de session est `Secure`). La connexion
> et toute l'app fonctionnent dans la coque comme dans un navigateur.

## 3. Générer le projet Android (une seule fois)

Depuis `C:\dev\eduweb-governance` :

```powershell
$env:Path = "C:\Program Files\nodejs;$env:Path"   # si node n'est pas dans le PATH
node_modules\.bin\cap add android
node_modules\.bin\cap sync android
```

`cap add android` crée le dossier `android/`. `cap sync` y recopie la config et
les plugins (dont LocalNotifications). Relance `cap sync android` après tout
changement de `capacitor.config.ts` ou d'URL.

## 4. Icône & écran de démarrage

Les sources sont **déjà générées** depuis `mobile/Logo.png` (l'emblème bouclier
pour l'icône, le logo complet pour le splash) dans `assets/` :
`icon-only.png`, `icon-foreground.png`, `icon-background.png`, `splash.png`.
Une silhouette blanche pour les notifications est dans `mobile/ic_stat_icon.png`.

Après `cap add android`, **injecte icônes + splash** dans le projet Android :

```powershell
npm run mobile:icons          # = capacitor-assets generate --android
```

**Icône de notification** (silhouette blanche en barre d'état) — copie-la une fois :

```powershell
Copy-Item mobile\ic_stat_icon.png android\app\src\main\res\drawable\ic_stat_icon.png
```

> Si tu remplaces `mobile/Logo.png`, régénère les sources avec
> `npm run mobile:assets`, puis relance `npm run mobile:icons`. La fenêtre de
> recadrage du bouclier se règle via les variables `SHIELD_LEFT` / `SHIELD_W`.

## 5. Lancer / tester

```powershell
node_modules\.bin\cap open android
```

Android Studio s'ouvre : choisis ton appareil/émulateur et clique **Run ▶**.
L'app installe, ouvre ton site, et **demande la permission de notifications** au
premier lancement. Crée un RDV avec un rappel pour vérifier qu'une notification
locale se programme (elle se déclenche `reminderMinutes` avant l'heure du RDV,
même app fermée).

## 6. Construire l'AAB de publication (Google Play)

1. Dans Android Studio : **Build → Generate Signed Bundle / APK → Android App Bundle**.
2. Crée un **keystore** (garde-le précieusement + son mot de passe : il est requis
   pour **toutes** les mises à jour futures).
3. Build en **release** → tu obtiens un fichier `.aab`.

## 7. Publier sur Google Play (étapes à faire par toi)

> Je ne peux pas me connecter à ton compte Google, payer le compte développeur,
> ni téléverser à ta place — voici les étapes :

1. Crée un **compte Google Play Developer** sur
   <https://play.google.com/console> (frais uniques **25 $**).
2. **Créer une application** → nom « EduWeb Gouvernance », langue, type.
3. Remplis la fiche : description, **icône 512×512**, **bannière 1024×500**,
   captures d'écran (téléphone), politique de confidentialité (URL).
4. **Production → Créer une release** → téléverse le fichier `.aab`.
5. Remplis le questionnaire **contenu** (classification, publicités, sécurité des
   données) puis envoie en **examen**. La 1ʳᵉ revue prend généralement quelques jours.

## Comment marchent les rappels

- Au lancement de l'app (mobile uniquement), `MobileReminders` récupère tes RDV à
  venir (rappel actif) et programme une notification locale par RDV.
- Les notifications sont stockées par Android et se déclenchent à l'heure prévue,
  **même si l'app est fermée**.
- À chaque ouverture, les anciens rappels sont remplacés (pas de doublon).

**Limite connue (v1)** : les rappels sont (re)programmés quand tu **ouvres** l'app.
Un RDV ajouté depuis un autre appareil n'est pris en compte qu'à la prochaine
ouverture de l'app mobile. Une vraie notification « push » serveur (Firebase Cloud
Messaging + tâche planifiée) pourra être ajoutée plus tard si besoin.

## iOS (plus tard)

Non configuré pour l'instant (nécessite un **Mac** + un **compte Apple Developer
à 99 $/an**). Le code des rappels est déjà compatible iOS : il suffira d'ajouter
`@capacitor/ios` puis `cap add ios` sur un Mac.
