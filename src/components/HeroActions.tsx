"use client";

import { useLocale } from "@/context/LocaleContext";
import { useCart } from "@/context/CartContext";
import { useSubscribeUi } from "@/context/SubscribeUiContext";
import { heroActionsCopy } from "@/lib/public-ui-i18n";
import { ctaAbonnerShort } from "@/lib/site-i18n";

type HeroActionsProps = {
  compact?: boolean;
};

export function HeroActions({ compact = false }: HeroActionsProps) {
  const { setCartOpen, lineCount } = useCart();
  const { openSubscribe } = useSubscribeUi();
  const { locale } = useLocale();
  const cartLabel = heroActionsCopy[locale].cart;

  return (
    <div
      className={
        compact
          ? "grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-wrap sm:justify-end"
          : "flex w-full flex-wrap items-center justify-center gap-2 sm:justify-end xl:w-auto xl:justify-end"
      }
    >
      <button
        type="button"
        onClick={openSubscribe}
        className={`btn-luxury-primary w-full text-cirta-sand sm:w-auto ${compact ? "" : "shrink-0"}`}
      >
        {ctaAbonnerShort[locale]}
      </button>
      <button
        type="button"
        onClick={() => setCartOpen(true)}
        className={`btn-luxury-ghost relative w-full text-cirta-sand/90 sm:w-auto ${compact ? "" : "shrink-0"}`}
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
