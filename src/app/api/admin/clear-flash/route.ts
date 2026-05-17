import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_FLASH_COOKIE } from "@/lib/admin-flash-constants";
import { getAdminCookieName, verifyAdminJwt } from "@/lib/auth";

/** Efface le cookie flash hors Server Action (évite les conflits Flight / manifest en dev). */
export async function POST() {
  const jar = await cookies();
  const token = jar.get(getAdminCookieName())?.value;
  if (!token) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    await verifyAdminJwt(token);
  } catch {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  jar.delete({ name: ADMIN_FLASH_COOKIE, path: "/admin" });
  return NextResponse.json({ ok: true });
}
