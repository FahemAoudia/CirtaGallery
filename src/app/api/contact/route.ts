import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { resolveContactEmailSubject } from "@/lib/site-contact";
import { prisma } from "@/lib/prisma";

const MAX_NAME = 200;
const MAX_PHONE = 40;
const MAX_REF = 500;
const MAX_PIECE_TITLE = 300;
const MAX_MESSAGE = 8000;

const DEFAULT_CONTACT_TO = "aoudiafahem1@gmail.com";

function createTransport() {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;
  if (!host || !user || pass === undefined || pass === "") return null;
  const port = Number.parseInt(process.env.SMTP_PORT ?? "587", 10);
  const secure =
    process.env.SMTP_SECURE === "true" || port === 465;
  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

export async function POST(req: Request) {
  let body: {
    name?: string;
    email?: string;
    phone?: string;
    reference?: string;
    pieceTitle?: string;
    message?: string;
  };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const name = String(body.name ?? "")
    .trim()
    .slice(0, MAX_NAME);
  const email = String(body.email ?? "")
    .trim()
    .toLowerCase()
    .slice(0, 254);
  const phone = String(body.phone ?? "")
    .trim()
    .slice(0, MAX_PHONE);
  const reference = String(body.reference ?? "")
    .trim()
    .slice(0, MAX_REF);
  const pieceTitle = String(body.pieceTitle ?? "")
    .trim()
    .slice(0, MAX_PIECE_TITLE);
  const message = String(body.message ?? "")
    .trim()
    .slice(0, MAX_MESSAGE);

  if (!name || !email || !message) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const to = process.env.CONTACT_TO_EMAIL?.trim() || DEFAULT_CONTACT_TO;
  const transporter = createTransport();
  if (!transporter) {
    return NextResponse.json({ error: "smtp_not_configured" }, { status: 503 });
  }

  const fromRaw =
    process.env.SMTP_FROM?.trim() ||
    `Cirta Gallery <${process.env.SMTP_USER}>`;

  const settingsRows = await prisma.siteSetting.findMany({
    where: {
      key: { in: ["contact_email_subject"] },
    },
  });
  const settings = Object.fromEntries(settingsRows.map((r) => [r.key, r.value]));

  const lines = [
    `Nom : ${name}`,
    `Courriel (répondre à) : ${email}`,
    phone ? `Téléphone : ${phone}` : null,
    reference ? `Réf. catalogue : ${reference}` : null,
    pieceTitle ? `Titre de l'œuvre : ${pieceTitle}` : null,
    "",
    "— Message —",
    message,
  ].filter((l) => l !== null);

  try {
    await transporter.sendMail({
      from: fromRaw,
      to,
      replyTo: email,
      subject: resolveContactEmailSubject(settings, name),
      text: lines.join("\n"),
    });
  } catch (e) {
    console.error("[api/contact] sendMail failed", e);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
