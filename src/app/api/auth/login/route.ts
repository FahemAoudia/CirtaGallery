import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { getAdminCookieName, signAdminJwt } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  let body: { email?: string; password?: string };
  try {
    body = (await req.json()) as { email?: string; password?: string };
  } catch {
    return NextResponse.json({ error: "Corps invalide" }, { status: 400 });
  }
  const email = body.email?.trim().toLowerCase();
  const password = body.password ?? "";
  if (!email || !password) {
    return NextResponse.json({ error: "Email et mot de passe requis" }, { status: 400 });
  }

  const user = await prisma.adminUser.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: "Identifiants incorrects" }, { status: 401 });
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return NextResponse.json({ error: "Identifiants incorrects" }, { status: 401 });
  }

  const role = user.role === "MODERATOR" ? "MODERATOR" : "ADMIN";
  const token = await signAdminJwt({ sub: user.id, email: user.email, role });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(getAdminCookieName(), token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
