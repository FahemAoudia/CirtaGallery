"use client";

import { useCallback, useEffect, useState } from "react";
import { useLocale } from "@/context/LocaleContext";
import { faqChatCopy } from "@/lib/public-ui-i18n";

type FaqRow = { id: string; question: string; answer: string };

export function FaqChatDock() {
  const { locale } = useLocale();
  const t = faqChatCopy[locale];
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<FaqRow[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/faq", { cache: "no-store" });
      const data = (await res.json()) as { items?: FaqRow[] };
      setItems(Array.isArray(data.items) ? data.items : []);
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    if (open) void load();
  }, [open, load]);

  return (
    <div className="safe-bottom-fab fixed right-4 z-[79] flex flex-col items-end gap-2 sm:right-6">
      {open ? (
        <div
          className="flex w-[min(22rem,calc(100vw-2.5rem))] max-h-[min(28rem,72dvh)] flex-col overflow-hidden rounded-lg border border-cirta-gold/40 bg-gradient-to-b from-cirta-ink via-cirta-ink to-[#151210] text-cirta-sand shadow-[0_28px_64px_-28px_rgba(0,0,0,0.85)]"
          role="dialog"
          aria-modal="false"
          aria-labelledby="faq-chat-title"
        >
          <div className="flex items-start justify-between gap-2 border-b border-cirta-sand/10 px-4 py-3">
            <div>
              <p
                id="faq-chat-title"
                className="font-serif text-base font-medium tracking-tight text-cirta-sand"
              >
                {t.panelTitle}
              </p>
              <p className="mt-1 text-[0.72rem] leading-relaxed text-cirta-sand/50">{t.intro}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setSelectedId(null);
              }}
              className="shrink-0 rounded-sm border border-cirta-sand/15 px-2 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-cirta-sand/70 transition hover:border-cirta-gold/40 hover:text-cirta-sand"
            >
              {t.close}
            </button>
          </div>

          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-3">
            {items.length === 0 ? (
              <p className="px-1 text-center text-sm text-cirta-sand/45">{t.empty}</p>
            ) : (
              items.map((row) => (
                <div key={row.id} className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setSelectedId((cur) => (cur === row.id ? null : row.id))}
                    className={`w-full rounded-2xl rounded-br-sm border px-3 py-2.5 text-left text-sm leading-snug transition ${
                      selectedId === row.id
                        ? "border-cirta-gold/50 bg-cirta-gold/15 text-cirta-sand"
                        : "border-cirta-sand/12 bg-cirta-sand/[0.06] text-cirta-sand/88 hover:border-cirta-gold/35"
                    }`}
                  >
                    {row.question}
                  </button>
                  {selectedId === row.id ? (
                    <div className="ml-2 space-y-1 border-l-2 border-cirta-gold/35 pl-3">
                      <p className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-cirta-gold/75">
                        {t.assistant}
                      </p>
                      <div className="rounded-2xl rounded-bl-sm border border-cirta-brown/20 bg-cirta-sand/95 px-3 py-2.5 text-sm leading-relaxed text-cirta-brown shadow-inner">
                        {row.answer}
                      </div>
                    </div>
                  ) : null}
                </div>
              ))
            )}
          </div>

          <div className="border-t border-cirta-sand/10 p-3">
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              className="w-full rounded-sm border border-cirta-sand/15 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-cirta-sand/65 transition hover:border-cirta-gold/40 hover:bg-cirta-gold/10 hover:text-cirta-sand"
            >
              {t.clear}
            </button>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={t.fabAria}
        className="flex h-14 w-14 items-center justify-center rounded-full border border-cirta-gold/45 bg-cirta-ink/95 text-cirta-gold shadow-[0_16px_40px_-18px_rgba(0,0,0,0.75)] transition hover:border-cirta-sand/40 hover:text-cirta-sand sm:h-[3.25rem] sm:w-[3.25rem]"
      >
        <span className="font-serif text-lg leading-none">?</span>
      </button>
    </div>
  );
}
