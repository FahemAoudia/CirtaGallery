import { AdminFlashToast } from "@/components/admin/AdminFlashToast";
import { AdminShell } from "@/components/admin/AdminShell";
import { ADMIN_FLASH_COOKIE } from "@/lib/admin-flash-constants";
import { getAdminCookieName, verifyAdminJwt, type AdminRole } from "@/lib/auth";
import { cookies } from "next/headers";

export default async function AdminPanelLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jar = await cookies();
  const flash = jar.get(ADMIN_FLASH_COOKIE)?.value ?? null;

  let role: AdminRole = "ADMIN";
  const token = jar.get(getAdminCookieName())?.value;
  if (token) {
    try {
      const payload = await verifyAdminJwt(token);
      role = payload.role;
    } catch {
      role = "ADMIN";
    }
  }

  return (
    <>
      <AdminShell role={role}>{children}</AdminShell>
      <AdminFlashToast message={flash} />
    </>
  );
}
