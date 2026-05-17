"use client";

import Link from "next/link";
import Image from "next/image";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/context/LocaleContext";
import { useCart } from "@/context/CartContext";
import { formatCad } from "@/lib/format-cad";
import {
  paypalOrderPayerDefaults,
  paypalScriptLocale,
  PAYPAL_BUYER_COUNTRY,
} from "@/lib/paypal-checkout";
import { cartArticleLine, cartCopy, paypalOrderDescription } from "@/lib/public-ui-i18n";

export function ShoppingCartDrawer() {
  const { locale } = useLocale();
  const c = cartCopy[locale];
  const {
    lines,
    cartOpen,
    setCartOpen,
    setLineQty,
    removeLine,
    clearCart,
    totalCad,
    lineCount,
    paypalClientId,
  } = useCart();

  const [thankYou, setThankYou] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const paypalHostRef = useRef<HTMLDivElement>(null);

  const paypalOk = Boolean(paypalClientId) && totalCad >= 0.01;

  useEffect(() => {
    if (cartOpen) setThankYou(false);
  }, [cartOpen]);

  useEffect(() => {
    if (!cartOpen || !paypalOk) return;
    const host = paypalHostRef.current;
    const scroller = scrollRef.current;
    if (!host || !scroller) return;

    const scrollPaymentIntoView = () => {
      const hostBottom = host.getBoundingClientRect().bottom;
      const scrollerBottom = scroller.getBoundingClientRect().bottom;
      if (hostBottom > scrollerBottom - 8) {
        scroller.scrollTo({
          top: scroller.scrollHeight,
          behavior: "smooth",
        });
      }
    };

    const observer = new ResizeObserver(() => scrollPaymentIntoView());
    observer.observe(host);
    return () => observer.disconnect();
  }, [cartOpen, paypalOk, lines.length]);

  return (
    <>
      {cartOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-[85] bg-cirta-black/40 backdrop-blur-[1px]"
          aria-label={c.closeOverlayAria}
          onClick={() => setCartOpen(false)}
        />
      ) : null}

      <aside
        className={`fixed right-0 top-0 z-[88] flex h-full max-h-[100dvh] w-full max-w-lg flex-col border-l border-cirta-brown/15 bg-cirta-sand shadow-[-24px_0_48px_-24px_rgba(0,0,0,0.35)] transition-transform duration-300 ease-out ${
          cartOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
        aria-hidden={!cartOpen}
      >
        <div className="flex items-center justify-between border-b border-cirta-brown/10 px-4 py-4 sm:px-5">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-cirta-brown/45">
              {c.drawerTitle}
            </p>
            <p className="font-serif text-lg text-cirta-brown">
              {cartArticleLine(locale, lineCount)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setCartOpen(false)}
            className="min-h-11 min-w-11 border border-cirta-brown/15 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-cirta-brown/70"
            aria-label={c.closeAria}
          >
            ✕
          </button>
        </div>

        <div
          ref={scrollRef}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5"
        >
          {thankYou ? (
            <div className="mt-10 rounded-sm border border-cirta-gold/35 bg-cirta-gold/10 px-4 py-8 text-center">
              <p className="font-serif text-lg text-cirta-brown">{c.thankYouTitle}</p>
              <p className="mt-3 text-sm leading-relaxed text-cirta-brown/70">{c.thankYouBlurb}</p>
              <button
                type="button"
                className="mt-6 border border-cirta-brown/20 px-6 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-cirta-brown"
                onClick={() => setCartOpen(false)}
              >
                {c.close}
              </button>
            </div>
          ) : lines.length === 0 ? (
            <p className="mt-8 text-center text-sm text-cirta-brown/55">{c.empty}</p>
          ) : (
            <>
              <ul className="space-y-5">
              {lines.map((line) => (
                <li
                  key={line.sku}
                  className="flex gap-3 border-b border-cirta-brown/8 pb-4"
                >
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-sm border border-cirta-brown/10">
                    <Image
                      src={line.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[0.6rem] uppercase tracking-widest text-cirta-gold-dim">
                      {line.sku}
                    </p>
                    <p className="line-clamp-2 text-sm font-medium leading-snug text-cirta-brown">
                      {line.title}
                    </p>
                    <p className="mt-1 text-xs tabular-nums text-cirta-brown/60">
                      {formatCad(line.priceCad)} × {line.qty}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <div className="flex items-center rounded-sm border border-cirta-brown/15">
                        <button
                          type="button"
                          className="min-h-9 min-w-9 text-cirta-brown hover:bg-cirta-brown/5"
                          onClick={() => setLineQty(line.sku, line.qty - 1)}
                          aria-label={c.less}
                        >
                          −
                        </button>
                        <span className="min-w-[2rem] text-center text-sm tabular-nums">{line.qty}</span>
                        <button
                          type="button"
                          className="min-h-9 min-w-9 text-cirta-brown hover:bg-cirta-brown/5"
                          onClick={() => setLineQty(line.sku, line.qty + 1)}
                          aria-label={c.more}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className="text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-red-900/75 underline-offset-2 hover:underline"
                        onClick={() => removeLine(line.sku)}
                      >
                        {c.remove}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
              </ul>

              <div className="cart-checkout mt-8 border-t border-cirta-brown/12 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-cirta-brown/45">
                {c.totalCad}
              </span>
              <span className="font-serif text-2xl font-medium tabular-nums text-cirta-brown">
                {formatCad(totalCad)}
              </span>
            </div>
            <p className="mt-2 text-[0.72rem] leading-relaxed text-cirta-brown/50">{c.taxNote}</p>

                {paypalOk ? (
                  <div ref={paypalHostRef} className="cart-paypal-host mt-5 w-full min-w-0">
                    <PayPalScriptProvider
                      options={{
                        clientId: paypalClientId!,
                        currency: "CAD",
                        intent: "capture",
                        locale: paypalScriptLocale(locale),
                        buyerCountry: PAYPAL_BUYER_COUNTRY,
                      }}
                    >
                      <PayPalButtons
                        style={{ layout: "vertical", shape: "rect", label: "pay", height: 48 }}
                        createOrder={(_, actions) =>
                          actions.order.create({
                            intent: "CAPTURE",
                            payer: paypalOrderPayerDefaults(),
                            purchase_units: [
                              {
                                amount: {
                                  currency_code: "CAD",
                                  value: totalCad.toFixed(2),
                                },
                                description: paypalOrderDescription(locale, lines.length),
                              },
                            ],
                          })
                        }
                    onApprove={async (data, actions) => {
                      await actions.order?.capture();
                      clearCart();
                      setThankYou(true);
                    }}
                  />
                </PayPalScriptProvider>
              </div>
                ) : (
                  <p className="mt-4 text-center text-xs text-cirta-brown/48">{c.paypalMissing}</p>
                )}
                <Link
                  href="#contact"
                  onClick={() => setCartOpen(false)}
                  className="mt-4 block w-full border border-cirta-brown/18 py-3 text-center text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-cirta-brown"
                >
                  {c.reserveByMessage}
                </Link>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
