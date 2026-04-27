# 🐘 Étape 6 — Brancher la base de données

> **Durée estimée : 1 jour. Trophée : Architecte de bases (Épique).**

Ton site Jegonflable Aube est censé afficher **8 jeux gonflables** depuis une base de données. Pour l'instant : pas de base. Ta mission : créer une DB **PostgreSQL** chez **Neon** (cloud, gratuit), la connecter au site, lancer la migration et y planter les données initiales (seed).

---

## 1. Crée ton compte Neon (5 min)

1. Va sur **https://neon.tech**.
2. Clique sur **Sign up** → choisis **« Sign up with GitHub »** (plus rapide). Si tu n'as pas encore de compte GitHub, on en créera un à l'étape 7. Pour l'instant tu peux utiliser ton email.
3. Une fois connecté, tu arrives sur le dashboard. Clique **« New Project »**.
4. Remplis :
   - **Project name** : `jegonflable-aube`
   - **Postgres version** : la plus récente (16+)
   - **Region** : `Europe (Frankfurt)` (le plus proche de la France)
5. Clique **« Create Project »**.

---

## 2. Récupère la connection string

Dès que ton projet est créé, Neon t'affiche une boîte avec un lien qui ressemble à :

```
postgresql://USER:PASSWORD@ep-cool-name-xxxxx.eu-central-1.aws.neon.tech/neondb?sslmode=require
```

**👉 Copie cette URL en entier**, on va en avoir besoin.

> ⚠️ **Garde-la précieusement.** Si tu fermes la fenêtre, tu peux la retrouver dans **Dashboard → Connection Details**.

---

## 3. Configure ton fichier `.env.local`

Dans VSCode, à la racine du projet (`JEGONFLABLE/`) :

1. Si le fichier `.env.local` n'existe pas, crée-le.
2. Ouvre `.env.example` à côté pour t'inspirer.
3. Ajoute cette ligne dans `.env.local` (remplace par TON URL Neon) :

```bash
DATABASE_URL="postgresql://USER:PASSWORD@ep-xxx.aws.neon.tech/neondb?sslmode=require"
```

> 🔒 **Le fichier `.env.local` est ignoré par Git** (voir `.gitignore`). Tes secrets ne seront jamais publiés.

Pendant que tu y es, ajoute aussi :

```bash
NEXTAUTH_SECRET="change-moi-en-prod"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_NAME="Jegonflable Aube"
SKIP_ONBOARDING="false"
```

---

## 4. Lance la migration

Dans ton terminal, à la racine du projet :

```bash
npm run db:push
```

Ce que ça fait :
- Lit `prisma/schema.prisma`
- Crée toutes les tables dans ta DB Neon (User, Game, Quote, etc.)

Si tout va bien, tu verras :

```
✔ Generated Prisma Client
🚀 Your database is now in sync with your Prisma schema.
```

> 🐛 **Si tu as une erreur « Environment variable not found: DATABASE_URL »** : c'est qu'il y a une **typo quelque part dans le code**. Cherche bien (un des 40 bugs de ta vraie mission t'attend ici 👀). Indice : `lib/db.ts`.

---

## 5. Lance le seed (planter les données)

```bash
npm run db:seed
```

Tu devrais voir :

```
🌱 Démarrage du seed...
✅ Admin créé : max@webomax.fr
✅ 8 jeux gonflables créés
✅ 6 paramètres créés

🎉 Seed terminé !

📋 Comptes créés :
  - max@webomax.fr / WebomaxAdmin2026!
  - stagiaire@jegonflable-aube.fr / Stagiaire2026
```

---

## 6. Vérifie visuellement avec Prisma Studio

```bash
npm run db:studio
```

Ça ouvre une interface web sur `http://localhost:5555` qui te permet de **voir et éditer ta DB** comme dans Excel. Tu devrais voir :

- 2 utilisateurs (max + stagiaire)
- 8 jeux gonflables (dont 7 publiés et 1 en brouillon)
- 6 paramètres

---

## 7. Récupère ton code de l'étape 🔑

À la fin du log de `npm run db:seed`, regarde le tout dernier message dans le terminal. Tu y verras une ligne du genre :

```
🏆 Code étape 6 : NEONLIGHT
```

Recopie ce code dans la page d'onboarding étape 6.

---

## ❓ Si tu bloques

- **« relation does not exist »** → tu as oublié `npm run db:push` avant le seed.
- **« can't reach database server »** → ton URL Neon n'est pas la bonne, ou tu as fermé/suspendu ton projet Neon (ça arrive après inactivité, juste reconnecte-toi sur neon.tech).
- **« unique constraint failed »** → tu as déjà lancé le seed, c'est OK, les `upsert` ne plantent pas en double mais relance avec `npm run db:reset` puis `npm run db:seed` si tu veux repartir propre.
- **Tu vois pas le code à la fin** → vérifie qu'aucune erreur n'est apparue avant. Le log final n'apparaît que si tout s'est bien passé.

> 💡 Demande à Max si tu bloques plus de 1h sur la même erreur. Ne perds pas une journée seul.
