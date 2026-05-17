"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AdminMobileNav } from "@/components/admin/AdminMobileNav";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { getAdminNavGroups, getAdminPageLabel } from "@/lib/admin-nav";
import type { AdminRole } from "@/lib/auth";

type AdminShellProps = {
  role: AdminRole;
  children: React.ReactNode;
};

export function AdminShell({ role, children }: AdminShellProps) {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const groups = getAdminNavGroups(role);
  const pageLabel = getAdminPageLabel(pathname, groups);

  return (
    <div className="flex min-h-[100dvh] bg-[#f4f0e8] text-cirta-brown">
      <AdminSidebar role={role} />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-[90] flex items-center gap-3 border-b border-cirta-brown/10 bg-[#faf7f0]/95 px-4 py-3 backdrop-blur-md lg:hidden">
          <button
            type="button"
            onClick={() => setNavOpen(true)}
            className="touch-target flex shrink-0 items-center justify-center border border-cirta-brown/15 bg-white/80 px-3 py-2 text-cirta-brown transition hover:border-cirta-gold/40"
            aria-expanded={navOpen}
            aria-label="Ouvrir le menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate font-serif text-[1.05rem] font-medium leading-tight text-cirta-brown">
              {pageLabel}
            </p>
            <p className="text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-cirta-brown/45">
              Cirta Gallery
            </p>
          </div>
        </header>

        <AdminMobileNav
          role={role}
          pathname={pathname}
          open={navOpen}
          onClose={() => setNavOpen(false)}
        />

        <main className="admin-main min-w-0 flex-1 border-cirta-brown/[0.06] bg-gradient-to-br from-cirta-sand via-[#faf7f0] to-cirta-sand/90 lg:border-l">
          <div className="admin-content mx-auto w-full min-w-0 max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
