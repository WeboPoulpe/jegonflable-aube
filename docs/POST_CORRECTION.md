# 🛠️ Remise au propre — fichiers cassés + déploiement Vercel

> **Pour qui ?** Ce guide est pour toi si :
> - Ton `npm run dev` plante avec des erreurs Prisma ou JSON ("Fin de fichier attendue")
> - Ton commit a accidentellement modifié des fichiers que tu n'as pas voulu changer (texte parasite, sauts de ligne en trop, blocs JSON en double…)
> - Ton déploiement Vercel échoue
> - Tu veux **repartir sur des bases saines** sans tout réinstaller

---

## 🆘 Symptômes typiques

| Symptôme | Probable cause |
|----------|----------------|
| `Fin de fichier attendue` (VSCode) sur un `.json` | JSON cassé (texte en trop, virgule oubliée, accolade en double) |
| `cd` qui apparaît tout seul à la fin d'un fichier `.tsx` | Tu as tapé une commande terminal dans l'éditeur |
| `Environment variable not found: DATABASE_URL` au build Vercel | Variables d'env pas configurées |
| `Cannot find module '.prisma/client'` au build Vercel | Le client Prisma n'est pas généré au build |
| `Module not found: Can't resolve 'X'` après un commit | Un fichier mal édité référence un truc qui n'existe pas |

---

## ✅ Étape 1 — Sauvegarder tes vraies corrections

Avant de tout reset, **on extrait tes vraies corrections de bugs** dans un patch, pour ne pas les perdre.

```bash
cd jegonflable-aube

# Liste les fichiers que tu avais modifiés au dernier commit
git show HEAD --name-only

# Sauvegarde les diffs des fichiers RÉELS (pas les fichiers cassés)
# Adapte la liste ci-dessous selon TES bugs corrigés
git diff HEAD~1 -- components/public/Footer.tsx components/public/GameCard.tsx > ../mes-fix.patch
```

> 💡 Ouvre `mes-fix.patch` dans VSCode pour vérifier que tes corrections sont bien dedans.

---

## ✅ Étape 2 — Récupérer le code propre depuis le repo officiel

```bash
# 1. Ajouter le repo officiel comme "upstream" (à faire UNE FOIS)
git remote add upstream https://github.com/WeboPoulpe/jegonflable-aube.git

# 2. Effacer ton commit cassé localement
git reset --hard HEAD~1

# 3. Récupérer la dernière version propre de Max
git fetch upstream
git pull upstream main

# 4. Pousser cet état propre sur ton repo perso
git push origin main --force
```

> ⚠️ `--force` réécrit l'historique distant. C'est OK ici parce qu'on **veut** effacer le commit cassé. Ne fais JAMAIS `--force` sur une branche partagée avec d'autres devs.

---

## ✅ Étape 3 — Réinstaller les dépendances

```bash
# Suppression du cache et des modules
rm -rf node_modules .next

# Réinstallation propre (génère aussi le client Prisma grâce au postinstall)
npm install
```

À la fin tu dois voir dans la console :

```
✔ Generated Prisma Client (v6.0.1)
added 430 packages
```

Le `Generated Prisma Client` est important — c'est lui qui te permet d'utiliser `db.game.findMany()`, etc.

---

## ✅ Étape 4 — Re-corriger tes bugs proprement (dans VSCode)

Maintenant que tu as un code propre, ouvre tes fichiers et **re-applique manuellement** tes corrections de bugs.

> 🚨 **Avant chaque commit, fais TOUJOURS `git diff` pour voir EXACTEMENT ce que tu vas envoyer.** Si tu vois des trucs bizarres (ton `.env`, un `cd` dans du code, des sauts de ligne nazes), tu reset le fichier avant de commit.

```bash
git diff                              # voir tes modifs (tu peux scroller)
git diff components/public/Footer.tsx # voir un fichier précis
```

Quand le `git diff` ne montre QUE ce que tu veux pousser :

```bash
git add components/public/Footer.tsx components/public/GameCard.tsx
git commit -m "🐛 fix: BUG-01 typo Mentions légales + BUG-11 key React"
git push
```

> 📌 **Format de commit obligatoire** (rappel `PROCESS.md`) :
> `🐛 fix(zone): description courte (BUG-XX)`
>
> Exemples :
> - `🐛 fix(footer): corrige typo Mentions légales (BUG-01)`
> - `🐛 fix(GameCard): ajoute la prop key sur les badges (BUG-11)`
> - `🐛 fix(db): corrige typo DATBASE_URL → DATABASE_URL (BUG-03)`

---

## 🌐 Étape 5 — Vérifier Vercel

Si tu déploies ton repo sur Vercel :

### a) Variables d'environnement (obligatoires)

Va sur **vercel.com → ton projet → Settings → Environment Variables** et vérifie que tu as **TOUTES** ces variables :

| Variable | Exemple |
|----------|---------|
| `DATABASE_URL` | `postgresql://user:pass@ep-xxx.aws.neon.tech/neondb?sslmode=require` |
| `NEXTAUTH_SECRET` | Une string random ≥ 32 caractères ([générateur](https://generate-secret.vercel.app/32)) |
| `NEXTAUTH_URL` | `https://TON-SITE.vercel.app` (l'URL exacte de ton déploiement) |
| `NEXT_PUBLIC_SITE_URL` | Idem que `NEXTAUTH_URL` |
| `NEXT_PUBLIC_SITE_NAME` | `Jegonflable Aube` |
| `EMAIL_FROM` | `contact@jegonflable-aube.fr` |
| `ADMIN_EMAIL` | Ton email perso |
| `BREVO_SMTP_HOST` | `smtp-relay.brevo.com` (si étape 9 faite) |
| `BREVO_SMTP_PORT` | `587` |
| `BREVO_SMTP_USER` | (ton login Brevo) |
| `BREVO_SMTP_PASSWORD` | (ta clé SMTP Brevo) |
| `STRIPE_ENABLED` | `false` |

### b) Forcer un build neuf

Une fois les variables OK :

1. **Deployments** (onglet en haut)
2. Sur le dernier déploiement → **bouton ⋮** → **Redeploy**
3. ⚠️ **Décoche** "Use existing Build Cache" (force un build complet from scratch)
4. **Redeploy**

Le build prend 2-3 minutes. Si ça plante, copie-colle le log d'erreur à Max.

---

## 🔍 Top 5 erreurs Vercel et leur solution

| Erreur du log Vercel | Cause | Solution |
|----------------------|-------|----------|
| `Environment variable not found: DATABASE_URL` | Pas dans Settings | Ajouter dans Settings → Environment Variables |
| `Cannot find module '.prisma/client'` | Client Prisma pas généré | Re-deploy avec cache vidé |
| `useState can only be used in Client Components` | Composant client sans `"use client"` | Ajouter `"use client";` en haut du fichier |
| `Failed to compile` | Erreur de syntaxe | Lis l'erreur, va à la ligne, corrige |
| `relation "Game" does not exist` | DB Neon vide | Lance `npm run db:push` puis `npm run db:seed` en local (Vercel n'auto-migre pas) |

---

## 🎓 La bonne hygiène pour ne plus jamais casser un fichier

### ✅ Avant de commit
```bash
git status      # quels fichiers j'ai modifiés ?
git diff        # qu'est-ce qui change exactement ?
```

### ✅ Si tu vois du texte parasite dans `git diff`
```bash
# Reset un fichier précis à sa version Git
git checkout -- components/public/GameCard.tsx

# Reset TOUS les fichiers (⚠️ tu perds toutes tes modifs non commitées)
git checkout -- .
```

### ✅ Si tu as commit ET push une connerie
```bash
# Annule le DERNIER commit (tes modifs reviennent en non-stagées)
git reset --soft HEAD~1

# Annule le DERNIER commit ET les modifs (⚠️ destructif)
git reset --hard HEAD~1

# Force-push pour synchroniser le distant (⚠️ écrase l'historique distant)
git push --force-with-lease
```

### ✅ Si tu as 1 fichier qui pose souci en particulier
```bash
# Récupérer la version du fichier au commit X
git checkout COMMIT_SHA -- chemin/du/fichier.tsx

# Récupérer la version du fichier sur le repo upstream officiel
git fetch upstream
git checkout upstream/main -- chemin/du/fichier.tsx
```

---

## 💡 Astuces Git pour la suite

### 1. Reset rapide d'un seul fichier
```bash
git checkout -- nom_du_fichier
```

### 2. Voir ce qui est dans ton dernier commit
```bash
git show HEAD
git show HEAD --stat        # juste la liste des fichiers
git show HEAD -- nom.tsx    # juste un fichier
```

### 3. Annuler `git add` sans toucher au code
```bash
git restore --staged nom_du_fichier
```

### 4. Comparer avec la version de Max
```bash
git fetch upstream
git diff upstream/main -- nom_du_fichier.tsx
```

---

## 🆘 Si rien ne marche : reclone propre

C'est l'**option nucléaire** mais ça résout 99% des cas en 30 secondes.

```bash
# 1. Sortir du dossier projet
cd ..

# 2. Renommer son ancien dossier (au cas où)
mv jegonflable-aube jegonflable-aube-OLD

# 3. Cloner ton fork (avec tes commits éventuels) ou le repo officiel
git clone https://github.com/TON-USERNAME/jegonflable-aube.git
# OU si tu n'as pas encore de fork :
git clone https://github.com/WeboPoulpe/jegonflable-aube.git

# 4. Entrer + installer
cd jegonflable-aube
npm install

# 5. Recopier ton .env.local (qui n'est pas dans Git)
cp ../jegonflable-aube-OLD/.env.local .

# 6. Tester
npm run dev
```

Tu retrouves un état parfaitement propre. Tes anciennes corrections (si déjà commitées sur GitHub) sont là. Celles que tu n'avais pas commit sont perdues — c'est une bonne leçon : **commit souvent, c'est gratuit**.

---

## 📞 Tu bloques ?

Suis la méthodologie de [`PROCESS.md`](./PROCESS.md) section « En cas de blocage » :
1. Lis l'erreur
2. Relis ton code
3. Cherche sur Google
4. Demande à Claude/ChatGPT
5. **Demande à Max** avec un message structuré

> ⏱️ **Règle d'or** : jamais plus d'1h bloqué sans demander.

— *Maxime, WEBOMAX*
