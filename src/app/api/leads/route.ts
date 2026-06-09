import { NextRequest, NextResponse } from "next/server";
import { sendCapiEvent, capiContextFromRequest } from "@/lib/meta-capi";

interface ResolvedAnswer {
  q: string;
  a: string;
}

interface LeadPayload {
  name: string;
  email: string;
  phone?: string;
  answers: Record<number, number>;
  resolvedAnswers?: ResolvedAnswer[];
  variant: string;
  funnel: string;
  lang?: "de" | "en";
  // Dedup + match quality from browser
  eventId?: string;
  fbp?: string | null;
  fbc?: string | null;
}

const ADMIN_STYLES = `
  body { margin: 0; padding: 0; background: #f5f5f3; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
  .wrap { max-width: 560px; margin: 40px auto; background: #ffffff; border-radius: 8px; overflow: hidden; }
  .body { padding: 36px 40px; color: #1a1a1a; font-size: 15px; line-height: 1.7; }
  .body p { margin: 0 0 16px; }
  .answers { margin: 24px 0; border-top: 1px solid #e8e8e4; padding-top: 20px; }
  .answer-item { margin-bottom: 16px; }
  .answer-q { font-weight: 600; color: #1a1a1a; font-size: 13.5px; }
  .answer-a { color: #555; font-size: 13.5px; margin-top: 2px; }
  .footer { padding: 20px 40px; background: #f5f5f3; font-size: 12px; color: #999; border-top: 1px solid #e8e8e4; }
  .footer a { color: #999; text-decoration: none; }
`.replace(/\n\s*/g, " ").trim();

const CONFIRMATION_STYLES = `
  body { margin: 0; padding: 0; background: #ffffff; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }
  .content { max-width: 560px; padding: 40px 24px; color: #1a1a1a; font-size: 15px; line-height: 1.75; }
  .content p { margin: 0 0 18px; }
  .answer-item { margin-bottom: 18px; }
  .answer-q { font-weight: 600; color: #1a1a1a; }
  .answer-a { color: #555; margin-top: 2px; }
  .sig { color: #1a1a1a; margin-top: 28px; }
`.replace(/\n\s*/g, " ").trim();

function buildConfirmationHtml(name: string, greeting: string, intro: string, summaryLabel: string, answers: ResolvedAnswer[], closing: string, sign: string): string {
  const answerItems = answers
    .map(({ q, a }, i) => `<div class="answer-item"><div class="answer-q">${i + 1}. ${q}</div><div class="answer-a">${a}</div></div>`)
    .join("");

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${CONFIRMATION_STYLES}</style></head><body>
<div class="content">
  <p>${greeting} ${name},</p>
  <p>${intro}</p>
  <p>${summaryLabel}</p>
  ${answerItems}
  <p style="margin-top:18px">${closing}</p>
  <div class="sig">${sign}<br>Kasoria · kasoria.com</div>
</div>
</body></html>`;
}

function buildAdminHtml(name: string, email: string, phone: string, funnel: string, variant: string, lang: string, answers: ResolvedAnswer[]): string {
  const answerItems = answers
    .map(({ q, a }, i) => `<div class="answer-item"><div class="answer-q">${i + 1}. ${q}</div><div class="answer-a">${a}</div></div>`)
    .join("");

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${CONFIRMATION_STYLES}</style></head><body>
<div class="content">
  <p><strong>${name}</strong> — <a href="mailto:${email}" style="color:#1a1a1a">${email}</a><br>
  <span style="color:#888;font-size:13px">Telefon: ${phone} · Funnel: ${funnel} · Variante: ${variant} · Sprache: ${lang}</span></p>
  <p style="font-weight:600">Antworten:</p>
  ${answerItems}
</div>
</body></html>`;
}

export async function POST(request: NextRequest) {
  let payload: LeadPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, funnel, variant, answers, resolvedAnswers = [], lang = "de", eventId, fbp, fbc } = payload;

  if (!name?.trim() || !email?.trim()) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 422 });
  }

  if (process.env.NODE_ENV === "development") {
    console.log("[Lead]", { name, email, funnel, variant, answers });
  }

  // CAPI: fire server-side Lead event (deduped against browser Pixel via eventId)
  if (eventId) {
    const { clientIp, userAgent, fbp: cookieFbp, fbc: cookieFbc } = capiContextFromRequest(request);
    const [firstName, ...rest] = name.trim().split(" ");
    await sendCapiEvent({
      eventName: "Lead",
      eventId,
      eventSourceUrl: `https://check.kasoria.com/${lang === "en" ? "en/" : ""}website-check`,
      user: {
        email,
        firstName,
        lastName: rest.join(" ") || undefined,
        externalId: email,
        fbp: fbp ?? cookieFbp,
        fbc: fbc ?? cookieFbc,
        clientIp,
        userAgent,
      },
    });
  }

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const plainAnswerLines = resolvedAnswers.length > 0
      ? resolvedAnswers.map(({ q, a }, i) => `  ${i + 1}. ${q}\n     → ${a}`).join("\n\n")
      : Object.entries(answers).map(([key, value]) => `  Q${Number(key) + 1}: ${value}`).join("\n");

    // Admin notification
    await transporter.sendMail({
      from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
      to: process.env.LEAD_EMAIL ?? "kontakt@kasoria.com",
      subject: `[Kasoria Check] Neuer Lead: ${name} (${funnel}, Variante ${variant})`,
      text: [`Name: ${name}`, `E-Mail: ${email}`, `Telefon: ${payload.phone ?? "–"}`, `Funnel: ${funnel}`, `Variante: ${variant}`, ``, plainAnswerLines].join("\n"),
      html: buildAdminHtml(name, email, payload.phone ?? "–", funnel, variant, lang, resolvedAnswers),
    });

    // Confirmation to the lead
    const isEn = lang === "en";
    const confirmationPlain = isEn
      ? [`Hi ${name},`, ``, `thanks for completing the website check — we've received your answers and will get back to you personally within 1–2 business days.`, ``, `Here's a summary:`, ``, ...resolvedAnswers.map(({ q, a }, i) => `${i + 1}. ${q}\n   ${a}`), ``, `If you have any questions, just reply to this email.`, ``, `Best,\nChristian\nKasoria · kasoria.com`].join("\n")
      : [`Hallo ${name},`, ``, `vielen Dank für deinen Website-Check – wir haben deine Antworten erhalten und melden uns persönlich innerhalb von 1–2 Werktagen bei dir.`, ``, `Zusammenfassung deiner Angaben:`, ``, ...resolvedAnswers.map(({ q, a }, i) => `${i + 1}. ${q}\n   ${a}`), ``, `Falls du zwischendurch Fragen hast, antworte einfach auf diese E-Mail.`, ``, `Viele Grüße,\nChristian\nKasoria · kasoria.com`].join("\n");

    const confirmationHtml = isEn
      ? buildConfirmationHtml(name, `Hi`, `thanks for completing the website check — we've received your answers and will get back to you personally within 1–2 business days.`, `Here's a summary of your answers:`, resolvedAnswers, `If you have any questions in the meantime, just reply to this email.`, `Best,<br>Christian`)
      : buildConfirmationHtml(name, `Hallo`, `vielen Dank für deinen Website-Check – wir haben deine Antworten erhalten und melden uns persönlich innerhalb von 1–2 Werktagen bei dir.`, `Hier eine Zusammenfassung deiner Angaben:`, resolvedAnswers, `Falls du zwischendurch Fragen hast, antworte einfach auf diese E-Mail.`, `Viele Grüße,<br>Christian`);

    await transporter.sendMail({
      from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
      to: email,
      subject: isEn ? "Your website check — we'll be in touch" : "Dein Website-Check – wir melden uns",
      text: confirmationPlain,
      html: confirmationHtml,
    });
  }

  return NextResponse.json({ ok: true });
}
