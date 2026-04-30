# 🚀 Étape 8 — Déployer sur Vercel

> **Durée estimée : 1 jour. Trophée : Pilote Vercel (Légendaire).**

Ton site tourne en local sur ton ordi. Mais pour qu'il soit accessible depuis n'importe où (smartphone, l'ordi de Max, le tien chez toi), il faut le **déployer en ligne**. On utilise **Vercel**, la plateforme qui héberge Next.js (gratuit pour ce projet).

---

## Pré-requis

- ✅ Étape 6 terminée : ta DB Neon fonctionne
- ✅ Étape 7 terminée : ton code est sur GitHub

---

## 1. Crée ton compte Vercel

1. Va sur **https://vercel.com**.
2. Clique **Sign up** → choisis **« Continue with GitHub »**. C'est important, ça connecte directement tes repos.
3. Autorise Vercel à voir tes repos.

---

## 2. Importe ton repo

1. Sur le dashboard Vercel → bouton **« Add New… »** → **Project**.
2. Tu vois la liste de tes repos GitHub. Trouve `jegonflable-aube` → clique **Import**.
3. Vercel détecte automatiquement Next.js. Laisse les **Build Settings** par défaut.

---

## 3. Configure les variables d'environnement

⚠️ **C'est l'étape critique**. Si tu oublies une variable, ton site plantera.

Avant de cliquer Deploy, déroule **Environment Variables** et ajoute, une par une :

| Nom | Valeur |
|-----|--------|
| `DATABASE_URL` | (ta connection string Neon, la même que dans `.env.local`) |
| `NEXTAUTH_SECRET` | génère-en un nouveau avec `openssl rand -base64 32` ou utilise https://generate-secret.vercel.app/32 |
| `NEXTAUTH_URL` | **laisse vide pour l'instant** — tu reviendras quand tu auras l'URL |
| `NEXT_PUBLIC_SITE_URL` | **laisse vide pour l'instant** |
| `NEXT_PUBLIC_SITE_NAME` | `Jegonflable Aube` |
| `SKIP_ONBOARDING` | `false` |
| `BREVO_SMTP_HOST` | `smtp-relay.brevo.com` (ou laisse vide, étape 9) |
| `BREVO_SMTP_PORT` | `587` |
| `BREVO_SMTP_USER` | (vide pour l'instant — étape 9) |
| `BREVO_SMTP_PASSWORD` | (vide pour l'instant) |
| `EMAIL_FROM` | `contact@jegonflable-aube.fr` |
| `ADMIN_EMAIL` | `contact@jegonflable-aube.fr` |
| `STRIPE_ENABLED` | `false` |

> 💡 Astuce : Vercel propose un import en bloc via copier-coller depuis ton `.env.local`. Bouton **« Import .env »** au-dessus du formulaire.

---

## 4. Lance le déploiement

Clique **Deploy**. Le build prend 2-3 minutes.

Si tout va bien, tu vois un écran avec des confettis 🎉 et l'URL de ton site, du genre :

```
https://jegonflable-aube-xxxxx.vercel.app
```

**Copie cette URL.**

---

## 5. Mets à jour les 2 variables vides

1. Retourne dans **Settings → Environment Variables**.
2. Édite `NEXTAUTH_URL` → mets l'URL de ton site (ex: `https://jegonflable-aube-xxxxx.vercel.app`).
3. Édite `NEXT_PUBLIC_SITE_URL` → mets la même URL.
4. Va dans **Deployments → ...  → Redeploy** pour relancer le build avec les nouvelles vars.

---

## 6. Récupère ton code de l'étape 🔑

Une fois ton site en ligne, va sur :

```
https://TON-SITE.vercel.app/api/onboarding/vercel-check
```

Tu vas voir un JSON qui contient un champ `code` avec une valeur en MAJUSCULES.

🔑 **Trouve ce code dans le JSON** et recopie-le dans l'étape 8 de l'onboarding.

> ℹ️ **Cette route ne marche que sur Vercel** (elle vérifie la variable `process.env.VERCEL`). En local elle renvoie `deployed: false`.

---

## 7. Workflow auto-deploy

À partir de maintenant, **chaque `git push`** vers ta branche `main` redéploie automatiquement le site. C'est magique.

Pour tester :
1. Corrige un bug en local.
2. Commit + push.
3. Va sur Vercel → **Deployments** : tu vois le nouveau build qui tourne.
4. 2 minutes plus tard, ton site est à jour en prod.

---

## ❓ Si tu bloques

- **Build failed avec erreur Prisma** → as-tu bien mis `DATABASE_URL` dans Vercel ?
- **Le site charge mais 500 sur les pages DB** → ta DATABASE_URL est probablement la mauvaise (vérifie qu'elle a bien `?sslmode=require` à la fin).
- **NEXTAUTH error** → `NEXTAUTH_URL` doit être l'URL exacte de ton site Vercel (avec `https://`).

> 💡 Demande à Max si tu bloques plus de 1h.
