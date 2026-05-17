"use client";

import Link from "next/link";
import { useCallback, useEffect } from "react";
import { signOut } from "@/app/admin/_actions";
import {
  getAdminNavGroups,
  isAdminNavActive,
  type AdminNavGroup,
} from "@/lib/admin-nav";
import type { AdminRole } from "@/lib/auth";

type AdminMobileNavProps = {
  role: AdminRole;
  pathname: string;
  open: boolean;
  onClose: () => void;
};

function NavPanel({
  groups,
  pathname,
  onNavigate,
}: {
  groups: AdminNavGroup[];
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <>
      <nav className="flex flex-1 flex-col gap-5 overflow-y-auto px-3 py-4" aria-label="Navigation admin">
        {groups.map((g) => (
          <div key={g.title}>
            <p className="px-2 pb-2 text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-cirta-sand/35">
              {g.title}
            </p>
            <ul className="space-y-0.5">
              {g.items.map((item) => {
                const active = isAdminNavActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      className={`touch-target block rounded-md border px-3 py-3 transition ${
                        active
                          ? "border-cirta-gold/25 bg-cirta-gold/[0.09] text-cirta-sand"
                          : "border-transparent text-cirta-sand/68 hover:border-cirta-sand/10 hover:bg-cirta-sand/[0.06] hover:text-cirta-sand"
                      }`}
                    >
                      <span className="block text-[0.82rem] font-medium leading-tight">{item.label}</span>
                      {item.desc ? (
                        <span className="mt-0.5 block text-[0.65rem] leading-snug text-cirta-sand/40">
                          {item.desc}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="space-y-1 border-t border-cirta-sand/10 p-3">
        <Link
          href="/"
          onClick={onNavigate}
          className="touch-target block rounded-md px-3 py-2.5 text-[0.75rem] text-cirta-gold/75 transition hover:bg-cirta-sand/10 hover:text-cirta-sand"
        >
          ← Voir le site public
        </Link>
        <form action={signOut}>
          <button
            type="submit"
            className="touch-target w-full rounded-md px-3 py-2.5 text-left text-[0.75rem] text-cirta-sand/50 transition hover:bg-cirta-sand/10 hover:text-cirta-sand"
          >
            Déconnexion
          </button>
        </form>
      </div>
    </>
  );
}

export function AdminMobileNav({ role, pathname, open, onClose }: AdminMobileNavProps) {
  const groups = getAdminNavGroups(role);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, handleEscape]);

  if (!open) return null;

  return (
    <>
      <button
        type="button"
        className="animate-menu-backdrop fixed inset-0 z-[200] bg-cirta-black/55 backdrop-blur-[3px] lg:hidden"
        aria-label="Fermer le menu"
        onClick={onClose}
      />
      <aside
        className="animate-admin-menu-panel fixed inset-y-0 left-0 z-[201] flex w-[min(100%,20rem)] flex-col border-r border-cirta-gold/25 bg-gradient-to-b from-[#1a1714] via-cirta-ink to-[#120f0c] text-cirta-sand shadow-[12px_0_48px_-12px_rgba(0,0,0,0.65)] lg:hidden"
        aria-label="Menu administration"
      >
        <div className="flex items-center justify-between border-b border-cirta-sand/10 px-4 py-4">
          <div>
            <p className="font-serif text-lg tracking-tight text-cirta-sand">Cirta Gallery</p>
            <p className="text-[0.58rem] font-semibold uppercase tracking-[0.28em] text-cirta-gold/85">
              Administration
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="touch-target flex items-center justify-center text-cirta-sand/70 transition hover:text-cirta-gold"
            aria-label="Fermer le menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <NavPanel groups={groups} pathname={pathname} onNavigate={onClose} />
      </aside>
    </>
  );
}
