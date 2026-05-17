"use client";

import { useLocale } from "@/context/LocaleContext";
import { useSubscribeUi } from "@/context/SubscribeUiContext";
import { ctaAbonnerFab } from "@/lib/site-i18n";

/** Accès rapide au formulaire Abonner */
export function SubscribeQuickFab() {
  const { openSubscribe } = useSubscribeUi();
  const { locale } = useLocale();

  return (
    <button
      type="button"
      onClick={openSubscribe}
      className="safe-bottom-fab fixed left-4 z-[78] max-w-[calc(100vw-2.5rem)] border border-cirta-gold/50 bg-cirta-ink/90 px-4 py-3 text-left text-[0.58rem] font-semibold uppercase leading-snug tracking-[0.14em] text-cirta-sand shadow-[0_16px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur-md transition hover:border-cirta-sand/40 hover:text-cirta-gold sm:left-6 sm:text-[0.62rem]"
    >
      {ctaAbonnerFab[locale]}
    </button>
  );
}
