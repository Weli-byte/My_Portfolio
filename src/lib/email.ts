import "server-only";

import nodemailer, { type Transporter } from "nodemailer";

/**
 * Email transport. Lazy-initialised, cached across requests in the same Node
 * process. Will throw on first send if any required env var is missing — loud
 * failure is preferable to a silently-dropped contact form.
 */

interface ContactEmailInput {
  name: string;
  email: string;
  message: string;
}

import { env } from "./env";

let cached: Transporter | null = null;

function getTransport(): Transporter {
  if (cached) return cached;

  cached = nodemailer.createTransport({
    pool: true,
    maxConnections: 1,
    maxMessages: 50,
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
    // Timings
    connectionTimeout: 10000,
    greetingTimeout: 5000,
    socketTimeout: 15000,
  });

  return cached;
}

/** Minimal HTML escape — sufficient for plain text wrapped into an HTML body. */
function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendContactEmail(input: ContactEmailInput): Promise<void> {
  const to = env.CONTACT_TO;
  const from = env.SMTP_FROM;

  const safeName = escapeHtml(input.name);
  const safeEmail = escapeHtml(input.email);
  const safeMessage = escapeHtml(input.message).replace(/\n/g, "<br/>");

  await getTransport().sendMail({
    from: `"Portfolio" <${from}>`,
    to,
    // Reply lands in the visitor's inbox, not the SMTP user.
    replyTo: `"${input.name}" <${input.email}>`,
    subject: `[Portfolio] New message from ${input.name}`,
    date: new Date(),
    messageId: `<${Date.now()}-${Math.random().toString(36).substring(2)}@${env.NEXT_PUBLIC_SITE_URL?.replace(/^https?:\/\//, "") || "portfolio.local"}>`,
    text: `From: ${input.name} <${input.email}>\n\n${input.message}`,
    html: `
      <div style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; line-height: 1.5;">
        <p><strong>From:</strong> ${safeName} &lt;${safeEmail}&gt;</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb;" />
        <p>${safeMessage}</p>
      </div>
    `,
  });
}
