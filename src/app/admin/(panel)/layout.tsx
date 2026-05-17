import { AdminFlashToast } from "@/components/admin/AdminFlashToast";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
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
    <div className="flex min-h-screen bg-[#f4f0e8] text-cirta-brown">
      <AdminSidebar role={role} />
      <main className="min-w-0 flex-1 border-l border-cirta-brown/[0.06] bg-gradient-to-br from-cirta-sand via-[#faf7f0] to-cirta-sand/90 px-6 py-8 md:px-10 md:py-11">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
      <AdminFlashToast message={flash} />
    </div>
  );
}
