# 🌿 Étape 7 — Versionner avec Git & GitHub

> **Durée estimée : 1 jour. Trophée : Cerveau Git (Épique).**

Un dev qui ne versionne pas son code = un dev qui va perdre 3 jours de travail tôt ou tard. Cette étape t'apprend les bases du **versioning** : sauvegarder ton code, l'historiser et le mettre en sécurité sur **GitHub**.

---

## 1. Vérifie que Git est installé

Dans ton terminal :

```bash
git --version
```

Tu dois voir quelque chose comme `git version 2.45.0`. Si la commande n'est pas reconnue :
- **Windows** : télécharge Git ici → https://git-scm.com/download/win et installe-le.
- Redémarre ton terminal après installation.

---

## 2. Configure ton identité Git (1 fois pour toujours)

Remplace par ton vrai nom et ton vrai email :

```bash
git config --global user.name "Ton Prénom Nom"
git config --global user.email "ton.email@exemple.fr"
```

> 📝 Ces infos apparaîtront dans chaque commit. Mets ton vrai nom — c'est ton CV de dev.

---

## 3. Initialise Git dans le projet

À la racine du projet (`JEGONFLABLE/`) :

```bash
git init
```

Tu devrais voir : `Initialized empty Git repository in .../JEGONFLABLE/.git/`

---

## 4. Vérifie ce que Git va versionner

```bash
git status
```

Tu vas voir une grosse liste de fichiers en rouge (« Untracked files »). C'est normal : tout ton projet est nouveau pour Git.

> 🔒 **`.env.local` ne doit PAS apparaître** dans cette liste (il est dans `.gitignore`). Vérifie ! Si tu le vois, on a un problème — préviens Max.

---

## 5. Premier commit

```bash
git add .
git commit -m "🚀 first commit — code: GITHUB42"
```

> ⚠️ **Recopie le message EXACTEMENT** comme ci-dessus (avec l'emoji, le tiret, les espaces). C'est le message qui débloque l'étape.

---

## 6. Crée ton compte GitHub (si pas encore fait)

1. Va sur **https://github.com**.
2. Clique **Sign up**.
3. Crée un compte avec ton email perso.
4. Confirme l'email reçu.

---

## 7. Crée un repo `jegonflable-aube`

1. Sur GitHub.com, clique sur le **+ en haut à droite** → **New repository**.
2. Remplis :
   - **Repository name** : `jegonflable-aube`
   - **Description** (optionnel) : `Site de location de jeux gonflables — projet de stage`
   - **Public** ou **Private** : **Private** (c'est plus prudent pour un projet client)
   - ⚠️ **NE COCHE PAS** « Add a README », « Add .gitignore » ni « Choose a license » — on a déjà tout.
3. Clique **Create repository**.

---

## 8. Connecte ton projet local au repo GitHub

GitHub te montre 3 lignes de commande à copier (section « ...or push an existing repository from the command line »). Ça ressemble à :

```bash
git remote add origin https://github.com/TON-USERNAME/jegonflable-aube.git
git branch -M main
git push -u origin main
```

**Copie-colle ces 3 lignes dans ton terminal et exécute-les**, l'une après l'autre.

> 🔐 **Authentification** : GitHub va te demander un mot de passe. Mais attention, depuis 2021 il faut utiliser un **token** au lieu de ton mot de passe normal :
> 1. Sur GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)** → **Generate new token (classic)**
> 2. Note : `jegonflable-aube`, expire dans 90 jours, coche `repo`.
> 3. Génère et **COPIE le token** (tu ne le reverras plus jamais).
> 4. Quand `git push` te demande le mot de passe → colle ton token.
>
> 💡 Plus pratique : installe **GitHub Desktop** (https://desktop.github.com) et tout est graphique et automatique.

---

## 9. Vérifie sur GitHub

Recharge ton repo sur github.com. Tu dois voir tous tes fichiers, et **1 commit** dans l'historique.

Clique sur l'onglet **Commits** : tu verras ton commit avec le message :

```
🚀 first commit — code: GITHUB42
```

---

## 10. Workflow pour la suite

À chaque fois que tu corriges un bug ou termines une fonctionnalité :

```bash
git add .
git commit -m "🐛 fix(footer): corrige typo Mentions légales (BUG-01)"
git push
```

> 📚 **Convention de commit** :
> - `🚀 feat:` nouvelle fonctionnalité
> - `🐛 fix:` correction de bug
> - `💄 style:` changement visuel/CSS
> - `📝 docs:` documentation
> - `♻️ refactor:` réécriture sans changement fonctionnel

Pour la chasse aux 40 bugs, fais **un commit par bug corrigé**. Ça permet à Max de voir ta progression et de revenir en arrière si besoin.

---

## ❓ Si tu bloques

- **« remote origin already exists »** → tu as déjà fait `git remote add` une fois. Lance `git remote remove origin` puis recommence.
- **« failed to push some refs »** → quelqu'un d'autre (ou toi avant) a déjà pushé un truc. Lance `git pull origin main --rebase` puis `git push`.
- **Tu as pushé un secret par erreur** → STOP, préviens Max immédiatement, il faut nettoyer l'historique.

> 💡 Demande à Max si tu bloques plus de 1h. Git fait peur, c'est normal.
