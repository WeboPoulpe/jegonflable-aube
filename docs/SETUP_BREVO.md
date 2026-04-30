# 📬 Étape 9 — Configurer les emails (Brevo SMTP)

> **Durée estimée : 0.5 jour. Trophée : Facteur du web (Épique).**

Quand un client remplira le formulaire de devis, le site lui enverra un email de confirmation. Pour ça, il faut un **serveur SMTP**. On utilise **Brevo** (ex Sendinblue), un service français gratuit jusqu'à 300 emails/jour.

---

## 1. Crée ton compte Brevo

1. Va sur **https://www.brevo.com**.
2. Clique **« Sign up free »**.
3. Crée un compte avec ton email perso.
4. Confirme ton email.
5. Quand Brevo te demande des infos sur ton activité : mets **« Site web »** + nombre de contacts < 1000 (le minimum).

---

## 2. Génère une clé SMTP

1. Une fois connecté → en haut à droite, ton **avatar** → **SMTP & API**.
2. Onglet **SMTP**.
3. Tu vois déjà tes paramètres SMTP :
   - **Login** : `7xxxxxx@smtp-brevo.com`
   - **Smtp server** : `smtp-relay.brevo.com`
   - **Port** : `587`
4. Clique **« Generate a new SMTP key »** → donne-lui un nom (ex: `jegonflable-aube`) → **Generate**.
5. **COPIE LA CLÉ** générée (elle commence par `xkeysib-...`). Tu ne la reverras plus.

---

## 3. Configure `.env.local`

Ajoute dans ton `.env.local` :

```bash
BREVO_SMTP_HOST="smtp-relay.brevo.com"
BREVO_SMTP_PORT="587"
BREVO_SMTP_USER="7xxxxxx@smtp-brevo.com"
BREVO_SMTP_PASSWORD="xkeysib-XXXXXXXX..."
EMAIL_FROM="contact@jegonflable-aube.fr"
ADMIN_EMAIL="ton-email-perso@gmail.com"
```

> ⚠️ **`ADMIN_EMAIL`** : mets **ton email perso** pour pouvoir tester. En production, ce sera l'email du papa de ton stagiaire (la vraie boîte de Jegonflable Aube).

---

## 4. Configure aussi sur Vercel

Retourne sur **vercel.com → ton projet → Settings → Environment Variables** et met à jour :

- `BREVO_SMTP_HOST`
- `BREVO_SMTP_PORT`
- `BREVO_SMTP_USER`
- `BREVO_SMTP_PASSWORD`
- `ADMIN_EMAIL`

Puis **Redeploy**.

---

## 5. Teste l'envoi

1. Redémarre ton serveur local : arrête (`Ctrl+C`) puis `npm run dev`.
2. Va sur **http://localhost:3000/devis**.
3. Remplis le formulaire avec **TON email perso** comme email client.
4. Soumets.
5. **Vérifie ta boîte mail** (et tes spams !) : tu dois recevoir un email de confirmation.

---

## 6. Récupère ton code de l'étape 🔑

L'email reçu a comme **objet** quelque chose comme :

```
🎪 Confirmation de devis Jegonflable Aube — code: XXXXXXXX (réf JG-2026-...)
```

🔑 **Trouve le mot juste après `code:`** dans l'objet de l'email — c'est ton code à saisir dans l'onboarding étape 9.

---

## 🚨 Si l'email n'arrive pas

1. **Vérifie tes spams** (Brevo gratuit envoie depuis un domaine non-vérifié, ça part souvent en spam).
2. **Regarde le terminal** du `npm run dev` : si tu vois une erreur SMTP, c'est que tes credentials sont mauvais.
3. **Teste avec un autre email** (Gmail, Outlook…) au cas où.
4. **Brevo dashboard → Statistics → Email** : tu peux voir si l'email a été accepté/rejeté.

---

## 📝 Pour aller plus loin (hors stage)

- **Vérifier ton domaine** dans Brevo permet d'éviter les spams. Mais ça nécessite un vrai domaine (ex: `jegonflable-aube.fr`).
- **Templates Brevo** : tu peux créer des templates HTML jolis dans l'interface Brevo et les déclencher via l'API.

> 💡 Demande à Max si tu bloques plus de 1h.
