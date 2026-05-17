"use client";

import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import { useSubscribeUi } from "@/context/SubscribeUiContext";
import { ctaAbonnerFooter } from "@/lib/site-i18n";

type FooterExtraLinksProps = {
  cataloguePanierLabel: string;
};

export function FooterExtraLinks({ cataloguePanierLabel }: FooterExtraLinksProps) {
  const { openSubscribe } = useSubscribeUi();
  const { locale } = useLocale();

  return (
    <div className="mt-1 flex flex-col gap-2 border-t border-cirta-brown/10 pt-4">
      <button
        type="button"
        onClick={openSubscribe}
        className="text-left text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-cirta-brown/60 transition hover:text-cirta-gold-dim"
      >
        {ctaAbonnerFooter[locale]}
      </button>
      <Link
        href="#collection"
        className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-cirta-brown/60 transition hover:text-cirta-gold-dim"
      >
        {cataloguePanierLabel}
      </Link>
    </div>
  );
}
