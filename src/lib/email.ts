import "server-only";

/** L'envoi d'e-mail est-il configuré (clé Resend présente) ? */
export function emailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

const SENDER_NAME = "EduWeb Governance";

/**
 * En-tête « From » : le nom d'expéditeur est TOUJOURS « EduWeb Governance ».
 * L'adresse est extraite de RESEND_FROM (ou EMAIL_FROM) — fournie seule
 * (« adresse ») ou déjà sous la forme « Nom <adresse> » —, sinon adresse par défaut.
 */
function senderFrom(): string {
  const raw = (process.env.RESEND_FROM || process.env.EMAIL_FROM)?.trim();
  const fallback = "no-reply@governance.eduweb.ci";
  if (!raw) return `${SENDER_NAME} <${fallback}>`;
  const match = raw.match(/<([^>]+)>/);
  const address = (match ? match[1] : raw).trim() || fallback;
  return `${SENDER_NAME} <${address}>`;
}

interface SendInput {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Envoie un e-mail via Resend (API REST, aucune dépendance).
 * Si non configuré, journalise et renvoie false (le flux reste fonctionnel
 * mais aucun e-mail n'est délivré tant que RESEND_API_KEY n'est pas défini).
 */
export async function sendEmail({ to, subject, html, text }: SendInput): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn(`[email] non configuré (RESEND_API_KEY absent) — e-mail « ${subject} » à ${to} non envoyé.`);
    return false;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: senderFrom(), to, subject, html, text }),
    });
    if (!res.ok) {
      console.error(`[email] échec Resend (${res.status})`, await res.text().catch(() => ""));
      return false;
    }
    return true;
  } catch (e) {
    console.error("[email] erreur réseau Resend", e);
    return false;
  }
}

/** E-mail de réinitialisation de mot de passe. */
export async function sendPasswordResetEmail(to: string, link: string): Promise<boolean> {
  const html = `
    <div style="font-family:system-ui,Segoe UI,Roboto,sans-serif;max-width:480px;margin:auto;color:#1e293b">
      <h2 style="color:#16653b">Réinitialisation de votre mot de passe</h2>
      <p>Vous avez demandé à réinitialiser votre mot de passe sur <b>EduWeb Governance</b>.</p>
      <p>Cliquez sur le bouton ci-dessous pour en choisir un nouveau. Ce lien est valable <b>1 heure</b> et utilisable une seule fois.</p>
      <p style="margin:28px 0">
        <a href="${link}" style="background:#16653b;color:#fff;text-decoration:none;padding:12px 22px;border-radius:12px;font-weight:600">Réinitialiser mon mot de passe</a>
      </p>
      <p style="font-size:13px;color:#64748b">Si vous n'êtes pas à l'origine de cette demande, ignorez cet e-mail : votre mot de passe reste inchangé.</p>
      <p style="font-size:12px;color:#94a3b8;word-break:break-all">Lien : ${link}</p>
    </div>`;
  const text = `Réinitialisation de votre mot de passe EduWeb Governance.\nOuvrez ce lien (valable 1 h, usage unique) : ${link}\nSi vous n'êtes pas à l'origine de cette demande, ignorez cet e-mail.`;
  return sendEmail({ to, subject: "Réinitialisation de votre mot de passe — EduWeb Governance", html, text });
}

/** E-mail de confirmation de compte : le clic sur le lien active le compte. */
export async function sendAccountConfirmationEmail(to: string, link: string, firstName?: string): Promise<boolean> {
  const hello = firstName ? `Bonjour ${firstName},` : "Bonjour,";
  const html = `
    <div style="font-family:system-ui,Segoe UI,Roboto,sans-serif;max-width:480px;margin:auto;color:#1e293b">
      <h2 style="color:#16653b;margin-bottom:4px">Confirmez votre compte</h2>
      <p style="color:#64748b;margin-top:0;font-size:13px">EduWeb Governance — plateforme de gouvernance éducative</p>
      <p>${hello}</p>
      <p>Merci pour votre inscription. Pour <b>activer votre compte</b>, confirmez votre adresse e-mail en cliquant sur le bouton ci-dessous.</p>
      <p style="margin:28px 0">
        <a href="${link}" style="background:#16653b;color:#fff;text-decoration:none;padding:12px 22px;border-radius:12px;font-weight:600">Confirmer mon compte</a>
      </p>
      <p style="font-size:13px;color:#64748b">Ce lien est valable <b>24&nbsp;heures</b>. Dès confirmation, votre compte est actif et vous pouvez vous connecter.</p>
      <p style="font-size:13px;color:#64748b">Si vous n'êtes pas à l'origine de cette inscription, ignorez simplement cet e-mail.</p>
      <p style="font-size:12px;color:#94a3b8;word-break:break-all">Lien : ${link}</p>
    </div>`;
  const text = `${hello}\nMerci pour votre inscription sur EduWeb Governance. Confirmez votre adresse e-mail (lien valable 24 h) pour activer votre compte : ${link}\nSi vous n'êtes pas à l'origine de cette inscription, ignorez cet e-mail.`;
  return sendEmail({ to, subject: "Confirmez votre compte — EduWeb Governance", html, text });
}
