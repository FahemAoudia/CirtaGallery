import { SignJWT, jwtVerify } from "jose";

const COOKIE = "admin_session";

export type AdminRole = "ADMIN" | "MODERATOR";

export type AdminJwtPayload = {
  sub: string;
  email: string;
  role: AdminRole;
};

function getSecret() {
  const raw = process.env.AUTH_SECRET;
  if (raw && raw.length >= 16) {
    return new TextEncoder().encode(raw);
  }
  if (process.env.NODE_ENV !== "production") {
    return new TextEncoder().encode("dev-local-auth-secret!!");
  }
  throw new Error("AUTH_SECRET must be set (min 16 chars) in production");
}

export function getAdminCookieName() {
  return COOKIE;
}

export async function signAdminJwt(payload: { sub: string; email: string; role: AdminRole }) {
  return new SignJWT({ email: payload.email, role: payload.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function verifyAdminJwt(token: string): Promise<AdminJwtPayload> {
  const { payload } = await jwtVerify(token, getSecret());
  const roleRaw = payload.role as string | undefined;
  const role: AdminRole = roleRaw === "MODERATOR" ? "MODERATOR" : "ADMIN";
  return {
    sub: payload.sub as string,
    email: payload.email as string,
    role,
  };
}
