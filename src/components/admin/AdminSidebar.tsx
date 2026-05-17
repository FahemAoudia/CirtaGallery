"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/admin/_actions";
import { getAdminNavGroups, isAdminNavActive } from "@/lib/admin-nav";
import type { AdminRole } from "@/lib/auth";

export function AdminSidebar({ role }: { role: AdminRole }) {
  const pathname = usePathname();
  const groups = getAdminNavGroups(role);

  return (
    <aside className="hidden min-h-[100dvh] w-[min(100%,17.5rem)] shrink-0 flex-col border-r border-cirta-sand/10 bg-gradient-to-b from-[#1a1714] via-cirta-ink to-[#120f0c] text-cirta-sand shadow-[4px_0_24px_-8px_rgba(0,0,0,0.45)] lg:flex">
      <div className="border-b border-cirta-sand/10 px-5 py-6">
        <p className="font-serif text-lg tracking-tight text-cirta-sand">Cirta Gallery</p>
        <p className="mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.32em] text-cirta-gold/90">
          Administration
        </p>
      </div>
      <nav className="flex flex-1 flex-col gap-6 overflow-y-auto px-3 py-5" aria-label="Navigation admin">
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
                      className={`block rounded-md border border-transparent px-2.5 py-2.5 transition ${
                        active
                          ? "border-cirta-gold/25 bg-cirta-gold/[0.09] text-cirta-sand"
                          : "text-cirta-sand/68 hover:border-cirta-sand/10 hover:bg-cirta-sand/[0.06] hover:text-cirta-sand"
                      }`}
                    >
                      <span className="block text-[0.78rem] font-medium leading-tight">{item.label}</span>
                      {item.desc ? (
                        <span className="mt-0.5 block text-[0.62rem] leading-snug text-cirta-sand/40">
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
      <div className="mt-auto space-y-1 border-t border-cirta-sand/10 p-3">
        <Link
          href="/"
          className="block rounded-md px-2.5 py-2 text-[0.72rem] text-cirta-gold/75 transition hover:bg-cirta-sand/10 hover:text-cirta-sand"
        >
          ← Voir le site public
        </Link>
        <form action={signOut}>
          <button
            type="submit"
            className="w-full rounded-md px-2.5 py-2 text-left text-[0.72rem] text-cirta-sand/50 transition hover:bg-cirta-sand/10 hover:text-cirta-sand"
          >
            Déconnexion
          </button>
        </form>
      </div>
    </aside>
  );
}
