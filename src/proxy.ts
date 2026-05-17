import { jwtVerify } from "jose";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAdminCookieName } from "@/lib/auth";

function secretKey() {
  const raw = process.env.AUTH_SECRET;
  if (raw && raw.length >= 16) {
    return new TextEncoder().encode(raw);
  }
  if (process.env.NODE_ENV !== "production") {
    return new TextEncoder().encode("dev-local-auth-secret!!");
  }
  return new TextEncoder().encode("");
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }
  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  const token = req.cookies.get("admin_session")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
  try {
    await jwtVerify(token, secretKey());
    return NextResponse.next();
  } catch {
    const res = NextResponse.redirect(new URL("/admin/login", req.url));
    res.cookies.set(getAdminCookieName(), "", { maxAge: 0, path: "/" });
    return res;
  }
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
