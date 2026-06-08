import { NextRequest, NextResponse } from "next/server";

interface LeadPayload {
  name: string;
  email: string;
  phone?: string;
  answers: Record<number, string>;
  variant: string;
  funnel: string;
}

export async function POST(request: NextRequest) {
  let payload: LeadPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, funnel, variant, answers } = payload;

  if (!name?.trim() || !email?.trim()) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 422 });
  }

  // TODO: replace with your email provider (Resend, Nodemailer, etc.)
  // For now: log to server console in dev, send nothing in prod until wired up
  if (process.env.NODE_ENV === "development") {
    console.log("[Lead]", { name, email, funnel, variant, answers });
  }

  // Notify via email if SMTP is configured
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

    const answerLines = Object.entries(answers)
      .map(([key, value]) => `  Q${Number(key) + 1}: ${value}`)
      .join("\n");

    await transporter.sendMail({
      from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
      to: process.env.LEAD_EMAIL ?? "kontakt@kasoria.com",
      subject: `[Kasoria Check] Neuer Lead: ${name} (${funnel}, Variante ${variant})`,
      text: `Name: ${name}\nE-Mail: ${email}\nTelefon: ${payload.phone ?? "–"}\nFunnel: ${funnel}\nVariante: ${variant}\n\nAntworten:\n${answerLines}`,
    });
  }

  return NextResponse.json({ ok: true });
}
