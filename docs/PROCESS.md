# 🗺️ Process complet du stage — de J1 à la fin

> Ce document est **ta carte routière**. Imprime-la, garde-la ouverte, coche au fur et à mesure.

---

## 🎯 Vue d'ensemble du stage (4 semaines)

| Semaine | Phase | Objectif |
|---------|-------|----------|
| **S1 — début** | 🕵️ Onboarding code | Apprendre à explorer un projet (5 énigmes — 1h) |
| **S1 — milieu/fin** | 🛠️ Setup métier | Brancher DB / Git / Vercel / Email (4 guides longs) |
| **S2 et S3** | 🐛 Chasse aux 40 bugs | Trouver et corriger les 40 bugs/trous du site |
| **S4** | 🚀 Polish et démo | Finitions, démo finale au client (papa) |

---

## 📋 Checklist générale

Coche au fur et à mesure dans le README ou ici. Ne saute pas d'étape.

### 🟢 Jour 1 — Setup machine + onboarding code (1 journée)

- [ ] **Outils installés** : Node.js 20+, VSCode, Git, GitHub Desktop (recommandé)
- [ ] **Projet cloné** : `git clone https://github.com/WeboPoulpe/jegonflable-aube.git`
- [ ] **Dépendances installées** : `npm install`
- [ ] **Serveur lancé** : `npm run dev` → http://localhost:3000
- [ ] **Étape 1** Onboarding — Lis ta mission (README) → 🔑 trouve le code et saisis-le
- [ ] **Étape 2** Onboarding — Le murmure du terminal → 🔑 trouve le code et saisis-le
- [ ] **Étape 3** Onboarding — Le secret du jardinier → 🔑 trouve le code et saisis-le
- [ ] **Étape 4** Onboarding — L'œil du designer → 🔑 trouve le code et saisis-le
- [ ] **Étape 5** Onboarding — Ton premier bug (BUG-01 footer) → 🔑 trouve le code et saisis-le

> 🏆 Trophées attendus à la fin du jour 1 : **5 trophées** (Lecteur de docs, Souffleur de terminal, Maître jardinier, Inspecteur du DOM, Tueur de bug).

---

### 🟠 Jours 2-5 — Setup métier (4 grosses étapes)

#### Étape 6 — 🐘 Brancher la DB Neon (1 jour)

📖 **Guide complet : [`docs/SETUP_DB.md`](./SETUP_DB.md)**

- [ ] Compte Neon créé (https://neon.tech, sign-up GitHub)
- [ ] Projet `jegonflable-aube` créé en région **Europe (Frankfurt)**
- [ ] Connection string PostgreSQL copiée
- [ ] `.env.local` créé à la racine du projet (à partir de `.env.example`)
- [ ] `DATABASE_URL` collée dans `.env.local`
- [ ] Toutes les autres variables remplies (`NEXTAUTH_SECRET`, `NEXTAUTH_URL`, etc.)
- [ ] `npm run db:push` lance et termine sans erreur
- [ ] `npm run db:seed` affiche `🎉 Seed terminé !` ET un code à la dernière ligne
- [ ] `npm run db:studio` ouvre l'interface et tu vois les 8 jeux
- [ ] 🔑 **Trouve le code secret** et saisis-le dans onboarding étape 6 → trophée **🐘 Architecte de bases**

> ⚠️ **Si erreur "Environment variable not found: DATABASE_URL"** : c'est un bug volontaire (BUG-03) dans `lib/db.ts`. Cherche bien.

---

#### Étape 7 — 🌿 Versionner avec Git (1 jour)

📖 **Guide complet : [`docs/SETUP_GIT.md`](./SETUP_GIT.md)**

- [ ] Git installé (`git --version` répond)
- [ ] Identité Git configurée (`user.name`, `user.email`)
- [ ] Compte GitHub perso créé
- [ ] Repo perso `jegonflable-aube` créé en **Private**
- [ ] Personal Access Token GitHub généré (ou GitHub Desktop installé)
- [ ] `.env.local` **bien absent** de `git status` (vérification critique 🔒)
- [ ] Premier commit créé avec le message exact donné dans le guide
- [ ] Remote ajoutée + `git push -u origin main` réussi
- [ ] Tu vois ton code en ligne sur github.com/<ton-username>/jegonflable-aube
- [ ] 🔑 **Trouve le code secret** et saisis-le dans onboarding étape 7 → trophée **🌿 Cerveau Git**

> 🚨 **Workflow obligatoire à partir de maintenant** : un commit par bug corrigé. Format : `🐛 fix(zone): description (BUG-XX)`.

---

#### Étape 8 — 🚀 Mettre en ligne sur Vercel (1 jour)

📖 **Guide complet : [`docs/SETUP_VERCEL.md`](./SETUP_VERCEL.md)**

- [ ] Compte Vercel créé (sign-up GitHub)
- [ ] Repo `jegonflable-aube` importé dans Vercel
- [ ] **TOUTES** les variables d'env recopiées de `.env.local` vers Vercel Settings
- [ ] Premier déploiement réussi (build vert)
- [ ] URL Vercel récupérée (ex: `jegonflable-aube-xxx.vercel.app`)
- [ ] `NEXTAUTH_URL` et `NEXT_PUBLIC_SITE_URL` mises à jour avec l'URL Vercel
- [ ] **Redeploy** lancé après mise à jour des variables
- [ ] Tu peux ouvrir ton site depuis ton smartphone 📱
- [ ] La route `https://TON-SITE.vercel.app/api/onboarding/vercel-check` répond avec un code dans le JSON
- [ ] 🔑 **Trouve le code secret** et saisis-le dans onboarding étape 8 → trophée **🚀 Pilote Vercel** (Légendaire)

> 🔁 **À partir de maintenant** : chaque `git push` vers `main` redéploie automatiquement le site en ~2 min.

---

#### Étape 9 — 📬 Envoi d'emails Brevo (0.5 jour)

📖 **Guide complet : [`docs/SETUP_BREVO.md`](./SETUP_BREVO.md)**

- [ ] Compte Brevo créé (https://www.brevo.com)
- [ ] Clé SMTP générée (commence par `xkeysib-...`)
- [ ] Variables `BREVO_*` remplies dans `.env.local` ET sur Vercel
- [ ] `ADMIN_EMAIL` = ton email perso (pour pouvoir tester)
- [ ] Serveur dev redémarré (`Ctrl+C` puis `npm run dev`)
- [ ] Formulaire `/devis` rempli avec ton email perso
- [ ] **Email reçu** dans ta boîte (ou tes spams !) — un code se cache dans l'objet
- [ ] 🔑 **Trouve le code secret** et saisis-le dans onboarding étape 9 → trophée **📬 Facteur du web**

> ⚠️ **Si tu ne reçois pas l'email** : c'est probablement un bug volontaire (BUG-06). Le code est OK, mais l'email part au mauvais endroit. Cherche dans `lib/email.ts`.

---

### 🔴 Semaines 2 et 3 — Chasse aux 40 bugs

Une fois l'onboarding terminé, tu attaques la mission principale.

📖 **Liste des bugs : [`BUGS_HINTS.md`](../BUGS_HINTS.md)** *(à venir, sera ajouté en Phase 8)*

**Ton workflow :**

1. Lance le projet : `npm run dev`
2. Ouvre le site, navigue dedans, **teste tout**
3. Quand tu trouves un bug, **ne le corrige pas tout de suite** :
   - Note-le dans ton journal (fichier perso ou cahier)
   - Identifie son numéro `BUG-XX` dans `BUGS_HINTS.md`
   - Lis la description
4. Corrige le bug dans le code
5. **Teste que ta correction marche** (refresh navigateur, relance le seed si besoin)
6. Commit avec format strict : `git commit -m "🐛 fix(zone): description (BUG-XX)"`
7. Push : `git push` → Vercel redéploie tout seul
8. Coche le bug dans le README, passe au suivant

**Composition des 40 bugs :**

| Type | Nombre | Description |
|------|--------|-------------|
| 🔴 **Visibles** | 14 | Plantent ou affichent une erreur claire — faciles à repérer en lançant le site |
| 🟡 **Silencieux** | 13 | Le site marche mais mal (mauvaise donnée, mauvais comportement) — il faut tester pour les voir |
| 🔧 **Trous TODO** | 13 | Commentaires `// TODO STAGIAIRE [BUG-XX]` à compléter |

> 💡 **Conseil de pro** : commence par les **bugs visibles** (faciles), puis les **trous** (cadrés), puis les **silencieux** (les plus durs).

---

### 🏁 Semaine 4 — Polish + démo

- [ ] Tous les bugs corrigés (ou liste claire de ceux qui restent + raisons)
- [ ] Site testé sur mobile + desktop + Firefox + Chrome
- [ ] Capture d'écran avant/après pour la démo finale
- [ ] Présentation de 15 min au papa client (ton fondateur de Jegonflable Aube)
- [ ] Fichier `RETOUR_STAGE.md` rempli (ce qui t'a plu, ce qui t'a frustré, ce que tu changerais)
- [ ] Trophée légendaire 👑 **Le grand boss** débloqué (si TOUS les autres trophées sont là)

---

## 🆘 En cas de blocage — méthodologie

### Avant de demander de l'aide, fais TOUJOURS dans cet ordre :

1. **Lis l'erreur** — l'erreur dit ce qui plante et où. Ne saute pas la lecture.
2. **Relis** — relis ton code, relis le commentaire, relis les indices.
3. **Cherche sur Google** — copie-colle l'erreur dans Google. 90% du temps, quelqu'un a eu le même souci.
4. **Demande à Claude/ChatGPT** — décris ton souci, montre le code qui plante. **Mais comprends ce qu'il te répond**, ne copie-colle pas aveuglément.
5. **Dévoile un indice progressif** — dans `BUGS_HINTS.md` (3 niveaux par bug). Note : utiliser un indice te coûte le trophée légendaire **🧠 Sans indice**.
6. **Demande à Max** — Slack / Discord / messagerie habituelle. Avec un message structuré :

```
🆘 Je bloque sur BUG-XX (ou étape X de l'onboarding)
- Fichier : path/du/fichier.tsx ligne 42
- Ce que j'ai déjà essayé : ...
- Ce que je vois : (copier l'erreur)
- Ma question précise : ...
```

### ⏱️ Règle d'or

**Ne reste JAMAIS plus d'1h bloqué sur le même problème sans demander.** C'est inefficace et démoralisant. Demander n'est pas une faiblesse, c'est un réflexe pro.

---

## 📦 Commandes utiles à mémoriser

| Commande | Action |
|----------|--------|
| `npm run dev` | Lancer le serveur dev |
| `npm run build` | Tester que le projet build (utile avant un push) |
| `npm run db:push` | Synchroniser le schéma Prisma avec la DB |
| `npm run db:seed` | Re-planter les données initiales |
| `npm run db:studio` | Ouvrir Prisma Studio (interface DB graphique) |
| `npm run db:reset` | ⚠️ Reset complet de la DB |
| `git status` | Voir les fichiers modifiés |
| `git add .` | Stager toutes les modifs |
| `git commit -m "..."` | Créer un commit |
| `git push` | Envoyer sur GitHub (et déclenche le redéploiement Vercel) |
| `git pull` | Récupérer les dernières modifs depuis GitHub |
| `git log --oneline` | Voir l'historique des commits |

---

## 🎓 Les 5 réflexes à acquérir pendant le stage

1. **Lire avant d'agir** — README, commentaires, erreurs, doc Next.js
2. **Faire des petits commits** — un commit = une chose, jamais tout en vrac
3. **Tester chaque correction** — corriger sans tester = créer un nouveau bug
4. **Comprendre avant de copier-coller** — si tu copies sans comprendre, tu apprends rien
5. **Demander quand bloqué** — 1h max, jamais plus

---

## 🏆 Tableau récapitulatif des trophées

### Trophées d'étapes (9)

| # | Emoji | Trophée | Rareté |
|---|-------|---------|--------|
| 1 | 📖 | Lecteur de docs | Commun |
| 2 | 💻 | Souffleur de terminal | Commun |
| 3 | 🌱 | Maître jardinier | Rare |
| 4 | 🔍 | Inspecteur du DOM | Rare |
| 5 | 🐛 | Tueur de bug | Épique |
| 6 | 🐘 | Architecte de bases | Épique |
| 7 | 🌿 | Cerveau Git | Épique |
| 8 | 🚀 | Pilote Vercel | **Légendaire** |
| 9 | 📬 | Facteur du web | Épique |

### Trophées cachés (4)

| Emoji | Trophée | Condition |
|-------|---------|-----------|
| ⚡ | Speedrunner | 5 énigmes code en moins de 30 min |
| 🧠 | Sans indice | Toutes les énigmes sans dévoiler 1 indice |
| 💎 | Perfectionniste | Aucune erreur de saisie sur les 9 codes |
| 👑 | Le grand boss | TOUS les autres trophées débloqués |

---

## 🎬 Bon stage !

Si tu suis ce guide pas-à-pas et que tu corriges les 40 bugs, tu repartiras avec :

✅ Une vraie compétence sur **Next.js 15 + Prisma + TypeScript**
✅ Un site **en ligne et fonctionnel** que tu peux montrer à ton entourage
✅ Un workflow Git/GitHub propre que **toutes les boîtes** veulent
✅ La capacité à **debugger seul** (la compétence la plus précieuse en dev)

— *Maxime, WEBOMAX*

> 💬 Question ? Souci ? Réussite à fêter ? → ping-moi sur Slack/Discord, je suis là.
