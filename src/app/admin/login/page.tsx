import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminLoginGate } from "@/components/AdminLoginGate";
import { getAdminCookieName, verifyAdminJwt } from "@/lib/auth";

export default async function AdminLoginPage() {
  const token = (await cookies()).get(getAdminCookieName())?.value;
  if (token) {
    try {
      await verifyAdminJwt(token);
      redirect("/admin");
    } catch {
      /* afficher le formulaire */
    }
  }
  return (
    <div className="min-h-screen bg-cirta-ink flex items-center justify-center px-6 py-16 text-cirta-sand">
      <div className="pointer-events-none fixed inset-0 texture-silk opacity-[0.12]" aria-hidden />
      <div className="relative w-full max-w-md border border-cirta-gold/25 bg-cirta-black/40 p-8 shadow-[0_32px_80px_-40px_rgba(0,0,0,0.85)] backdrop-blur-sm md:p-10">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-cirta-gold">
          Administration
        </p>
        <h1 className="mt-4 font-serif text-2xl font-medium tracking-tight text-cirta-sand">
          Cirta Gallery
        </h1>
        <p className="mt-2 text-sm text-cirta-sand/55">Espace de gestion du site et du catalogue.</p>
        <AdminLoginGate />
        <p className="mt-8 text-center text-[0.7rem] text-cirta-sand/45">
          <Link href="/" className="text-cirta-gold/80 underline-offset-4 hover:underline">
            ← Retour au site
          </Link>
        </p>
      </div>
    </div>
  );
}
