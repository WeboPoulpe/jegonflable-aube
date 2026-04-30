import nodemailer from "nodemailer";

// =========================================
// Configuration SMTP Brevo
// =========================================
// Utilisée par les Server Actions devis,
// contact, etc.
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
// L'objet contient le code MAILMASTER pour
// l'onboarding étape 9.
// =========================================
export async function sendQuoteConfirmation(opts: {
  to: string;
  customerName: string;
  reference: string;
  totalPrice: number;
}) {
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

  // BUG-06 : l'email est envoyé à l'admin au lieu du client.
  // Conséquence : le client ne reçoit jamais la confirmation,
  // mais l'admin est spammé. Et l'étape 9 onboarding ne valide pas.
  return sendEmail({
    to: process.env.ADMIN_EMAIL ?? opts.to,
    subject,
    html,
    text: `Bonjour ${opts.customerName}, nous avons bien reçu votre devis ${opts.reference}. Total estimé : ${opts.totalPrice.toFixed(2)} €.`,
  });
}

// Email de notification à l'admin (lui c'est OK qu'il reçoive)
export async function sendAdminNewQuoteNotification(opts: {
  reference: string;
  customerName: string;
  customerEmail: string;
  totalPrice: number;
}) {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) return;

  return sendEmail({
    to: adminEmail,
    subject: `🆕 Nouveau devis ${opts.reference} — ${opts.customerName}`,
    html: `
      <div style="font-family:Arial,sans-serif">
        <h2>Nouveau devis reçu</h2>
        <p><strong>Réf :</strong> ${opts.reference}</p>
        <p><strong>Client :</strong> ${opts.customerName} (${opts.customerEmail})</p>
        <p><strong>Total :</strong> ${opts.totalPrice.toFixed(2)} €</p>
        <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/devis">Voir dans le back-office</a></p>
      </div>
    `,
  });
}
