import nodemailer from "nodemailer";

// =========================================
// Configuration SMTP Brevo
// =========================================
// Sera utilisée par les Server Actions devis,
// contact, etc. (Phase 3 + Phase 4).
// =========================================

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: Number.parseInt(process.env.BREVO_SMTP_PORT ?? "587", 10),
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASSWORD,
  },
});

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({ to, subject, html, text }: SendEmailOptions) {
  const from = process.env.EMAIL_FROM ?? "noreply@jegonflable-aube.fr";

  return transporter.sendMail({
    from: `"Jegonflable Aube" <${from}>`,
    to,
    subject,
    html,
    text,
  });
}

// =========================================
// Email de confirmation de devis
// (utilisé en Phase 4 par actions/quotes.ts)
// L'objet contient le code MAILMASTER pour
// l'onboarding étape 9.
// =========================================
export async function sendQuoteConfirmation(opts: {
  to: string;
  customerName: string;
  reference: string;
  totalPrice: number;
}) {
  // Note: l'objet contient "code: MAILMASTER" pour valider l'onboarding étape 9.
  const subject = `🎪 Confirmation de devis Jegonflable Aube — code: MAILMASTER (réf ${opts.reference})`;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;background:#FFFCF0;padding:24px;border-radius:12px">
      <h1 style="color:#3DA9FC">Bonjour ${opts.customerName},</h1>
      <p>Nous avons bien reçu votre demande de devis.</p>
      <p><strong>Référence :</strong> ${opts.reference}</p>
      <p><strong>Total estimé :</strong> ${opts.totalPrice.toFixed(2)} €</p>
      <p>Notre équipe va vous recontacter sous 24h.</p>
      <p style="color:#666;font-size:12px;margin-top:24px">
        Jegonflable Aube — 12 rue des Châteaux, 10000 Troyes
      </p>
    </div>
  `;

  return sendEmail({
    to: opts.to,
    subject,
    html,
    text: `Bonjour ${opts.customerName}, nous avons bien reçu votre devis ${opts.reference}. Total estimé : ${opts.totalPrice.toFixed(2)} €.`,
  });
}
