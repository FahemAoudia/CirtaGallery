"use client";

import { useLocale } from "@/context/LocaleContext";
import { useCart } from "@/context/CartContext";
import { useSubscribeUi } from "@/context/SubscribeUiContext";
import { heroActionsCopy } from "@/lib/public-ui-i18n";
import { ctaAbonnerShort } from "@/lib/site-i18n";

export function HeroActions() {
  const { setCartOpen, lineCount } = useCart();
  const { openSubscribe } = useSubscribeUi();
  const { locale } = useLocale();
  const cartLabel = heroActionsCopy[locale].cart;

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-2 sm:justify-end xl:w-auto xl:justify-end">
      <button
        type="button"
        onClick={openSubscribe}
        className="min-h-11 shrink-0 border border-cirta-gold/45 bg-cirta-gold/12 px-3 py-2 text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-cirta-sand transition hover:bg-cirta-gold/20 sm:text-[0.62rem]"
      >
        {ctaAbonnerShort[locale]}
      </button>
      <button
        type="button"
        onClick={() => setCartOpen(true)}
        className="relative min-h-11 shrink-0 border border-cirta-sand/25 px-4 py-2 text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-cirta-sand/90 transition hover:border-cirta-gold/40 hover:text-cirta-gold sm:text-[0.62rem]"
      >
        {cartLabel}
        {lineCount > 0 ? (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-cirta-gold px-1 text-[0.55rem] font-bold tabular-nums text-cirta-ink">
            {lineCount > 99 ? "99+" : lineCount}
          </span>
        ) : null}
      </button>
    </div>
  );
}
