import nodemailer, { type Transporter } from "nodemailer";

let cachedTransporter: Transporter | null = null;

/**
 * Nodemailer transporter. Uses SMTP credentials from env.
 * Falls back to a no-op console logger when SMTP is not configured
 * (so the API still works in dev without a real mailbox).
 */
function getTransporter(): Transporter | null {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user, pass },
    });
  }

  return cachedTransporter;
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  budget: string;
  projectType: string;
  message: string;
}): Promise<void> {
  const transporter = getTransporter();
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!transporter || !adminEmail) {
    console.log(
      "[MAILER] SMTP not configured — contact submission logged:\n",
      JSON.stringify(data, null, 2)
    );
    return;
  }

  const subject = `New contact submission from ${data.name}`;
  const html = `
    <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: auto; color: #111;">
      <h2 style="color: #C9A84C; margin-bottom: 16px;">New Project Inquiry</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr><td style="padding: 6px 0; color: #666; width: 120px;">Name</td><td style="padding: 6px 0;">${escapeHtml(data.name)}</td></tr>
        <tr><td style="padding: 6px 0; color: #666;">Email</td><td style="padding: 6px 0;"><a href="mailto:${escapeHtml(data.email)}" style="color:#C9A84C;">${escapeHtml(data.email)}</a></td></tr>
        <tr><td style="padding: 6px 0; color: #666;">Budget</td><td style="padding: 6px 0;">${escapeHtml(data.budget)}</td></tr>
        <tr><td style="padding: 6px 0; color: #666;">Project Type</td><td style="padding: 6px 0;">${escapeHtml(data.projectType)}</td></tr>
      </table>
      <div style="background: #f6f6f6; padding: 16px; border-radius: 8px; white-space: pre-wrap;">${escapeHtml(data.message)}</div>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: adminEmail,
    subject,
    html,
    replyTo: data.email,
  });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
