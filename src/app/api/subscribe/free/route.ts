import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  let body: { email?: string; name?: string; phone?: string };
  try {
    body = (await req.json()) as { email?: string; name?: string; phone?: string };
  } catch {
    return NextResponse.json({ error: "Corps invalide" }, { status: 400 });
  }
  const email = body.email?.trim().toLowerCase();
  const name = body.name?.trim() || null;
  const phone = body.phone?.trim() || null;
  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Email invalide" }, { status: 400 });
  }

  await prisma.subscriber.upsert({
    where: { email },
    create: { email, name, phone, source: "newsletter" },
    update: { name: name ?? undefined, phone: phone ?? undefined },
  });

  return NextResponse.json({ ok: true });
}
