"use client";

import { AbonnerAccessForm } from "@/components/AbonnerAccessForm";
import { useLocale } from "@/context/LocaleContext";
import { useSubscribeUi } from "@/context/SubscribeUiContext";
import { subscribeDialogCopy } from "@/lib/site-i18n";

export function SubscribeDialog() {
  const { subscribeOpen, closeSubscribe } = useSubscribeUi();
  const { locale } = useLocale();
  const d = subscribeDialogCopy[locale];

  if (!subscribeOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-cirta-black/55 p-4 pb-6 backdrop-blur-[2px] sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="abonner-title"
    >
      <div className="relative max-h-[min(92dvh,680px)] w-full max-w-lg overflow-y-auto border border-cirta-gold/35 bg-cirta-sand shadow-[0_40px_100px_-40px_rgba(0,0,0,0.85)]">
        <button
          type="button"
          onClick={closeSubscribe}
          className="absolute right-3 top-3 z-10 min-h-11 min-w-11 border border-cirta-gold/45 bg-cirta-gold/[0.08] px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-cirta-gold transition hover:border-cirta-gold/70 hover:bg-cirta-gold/15 hover:text-cirta-gold-dim"
          aria-label={d.close}
        >
          {d.close}
        </button>
        <div className="border-b border-cirta-brown/10 bg-gradient-to-br from-cirta-ink/95 to-cirta-brown px-5 py-6 text-cirta-sand sm:px-7 sm:py-7">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-cirta-gold">
            {d.kicker}
          </p>
          <h2
            id="abonner-title"
            className="mt-3 font-serif text-[clamp(1.25rem,3.6vw,1.75rem)] font-medium leading-snug tracking-tight"
          >
            {d.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-cirta-sand/62">{d.blurb}</p>
        </div>
        <div className="px-5 py-6 sm:px-7">
          <AbonnerAccessForm dialogOpen={subscribeOpen} onRequestClose={closeSubscribe} />
        </div>
      </div>
    </div>
  );
}
