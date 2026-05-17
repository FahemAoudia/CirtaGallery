"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useState } from "react";
import { useLocale } from "@/context/LocaleContext";
import { heroChromeCopy } from "@/lib/public-ui-i18n";

type NavItem = { href: string; label: string };

type HeroMobileNavProps = {
  nav: NavItem[];
};

export function HeroMobileNav({ nav }: HeroMobileNavProps) {
  const { locale } = useLocale();
  const h = heroChromeCopy[locale];
  const [open, setOpen] = useState(false);
  const titleId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="touch-target flex items-center justify-center border border-cirta-sand/22 px-3 py-2 text-cirta-sand/90 transition hover:border-cirta-gold/45 hover:text-cirta-gold"
        aria-expanded={open}
        aria-controls={titleId}
        aria-label={h.menuOpenAria}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
        </svg>
      </button>

      {open ? (
        <>
          <button
            type="button"
            className="animate-menu-backdrop fixed inset-0 z-[88] bg-cirta-black/55 backdrop-blur-[3px]"
            aria-label={h.menuCloseAria}
            onClick={close}
          />
          <nav
            id={titleId}
            aria-label={h.menuTitle}
            className="animate-menu-panel fixed inset-y-0 right-0 z-[89] flex w-[min(100%,22.5rem)] flex-col border-l border-cirta-gold/25 bg-gradient-to-b from-cirta-ink via-[#1a1510] to-cirta-ink shadow-[-12px_0_48px_-12px_rgba(0,0,0,0.65)]"
          >
            <div className="flex items-center justify-between border-b border-cirta-sand/10 px-5 py-4">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-cirta-gold/85">
                {h.menuTitle}
              </p>
              <button
                type="button"
                onClick={close}
                className="touch-target flex items-center justify-center text-cirta-sand/70 transition hover:text-cirta-gold"
                aria-label={h.menuCloseAria}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <ul className="flex flex-1 flex-col gap-1 overflow-y-auto px-5 py-6">
              {nav.map((item, i) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className="mobile-nav-link group flex items-baseline gap-4 py-3 text-cirta-sand"
                  >
                    <span className="font-mono text-[0.62rem] tabular-nums text-cirta-gold/55">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="border-b border-transparent transition group-hover:border-cirta-gold/35">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </>
      ) : null}
    </div>
  );
}
