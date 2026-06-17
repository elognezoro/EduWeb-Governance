import "server-only";

/** L'envoi d'e-mail est-il configuré (clé Resend présente) ? */
export function emailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

const FROM = process.env.EMAIL_FROM || "EduWeb Gouvernance <no-reply@governance.eduweb.ci>";

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
      body: JSON.stringify({ from: FROM, to, subject, html, text }),
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
      <p>Vous avez demandé à réinitialiser votre mot de passe sur <b>EduWeb Gouvernance</b>.</p>
      <p>Cliquez sur le bouton ci-dessous pour en choisir un nouveau. Ce lien est valable <b>1 heure</b> et utilisable une seule fois.</p>
      <p style="margin:28px 0">
        <a href="${link}" style="background:#16653b;color:#fff;text-decoration:none;padding:12px 22px;border-radius:12px;font-weight:600">Réinitialiser mon mot de passe</a>
      </p>
      <p style="font-size:13px;color:#64748b">Si vous n'êtes pas à l'origine de cette demande, ignorez cet e-mail : votre mot de passe reste inchangé.</p>
      <p style="font-size:12px;color:#94a3b8;word-break:break-all">Lien : ${link}</p>
    </div>`;
  const text = `Réinitialisation de votre mot de passe EduWeb Gouvernance.\nOuvrez ce lien (valable 1 h, usage unique) : ${link}\nSi vous n'êtes pas à l'origine de cette demande, ignorez cet e-mail.`;
  return sendEmail({ to, subject: "Réinitialisation de votre mot de passe — EduWeb Gouvernance", html, text });
}
