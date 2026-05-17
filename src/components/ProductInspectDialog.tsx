"use client";

import Image from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { CatalogItem } from "@/lib/collection";
import { useCart } from "@/context/CartContext";
import { useLocale } from "@/context/LocaleContext";
import { localizeCatalogItem } from "@/lib/catalog-locale";
import { formatCad } from "@/lib/format-cad";
import { productCardCopy, productInspectCopy } from "@/lib/public-ui-i18n";

type InspectCtx = {
  item: CatalogItem | null;
  open: (item: CatalogItem) => void;
  close: () => void;
};

const InspectContext = createContext<InspectCtx | null>(null);

export function useProductInspect() {
  const v = useContext(InspectContext);
  if (!v) throw new Error("ProductInspectProvider manquant");
  return v;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

/** Marge de translation (px) pour le panoramique à zoom donné */
function maxPanForScale(s: number) {
  return (50 + 160 * Math.max(0, s - 1)) * Math.min(s, 2.5);
}

function ProductInspectDialogPanel() {
  const { item, close } = useProductInspect();
  const { locale } = useLocale();
  const { addItem } = useCart();
  const t = productCardCopy[locale];
  const i = productInspectCopy[locale];

  const display = useMemo(
    () => (item ? localizeCatalogItem(locale, item) : null),
    [item, locale],
  );

  const [scale, setScale] = useState(1);
  const [off, setOff] = useState({ x: 0, y: 0 });
  const [qty, setQty] = useState(1);

  const scaleRef = useRef(scale);
  scaleRef.current = scale;
  const offRef = useRef(off);
  offRef.current = off;

  const stageRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const panCleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!item) return;
    setScale(1);
    setOff({ x: 0, y: 0 });
    setQty(1);
    panCleanupRef.current?.();
    panCleanupRef.current = null;
  }, [item?.id]);

  useEffect(() => {
    if (!item) return;
    const id = requestAnimationFrame(() => closeBtnRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [item]);

  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      panCleanupRef.current?.();
      panCleanupRef.current = null;
    };
  }, [item, close]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !item) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const dir = e.deltaY > 0 ? -1 : 1;
      setScale((prev) => {
        const next = Math.round((prev + dir * 0.13) * 100) / 100;
        const clamped = clamp(next, 1, 3.85);
        if (clamped === 1) setOff({ x: 0, y: 0 });
        return clamped;
      });
    };
    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, [item]);

  useEffect(() => {
    const mp = maxPanForScale(scale);
    setOff((o) => ({
      x: clamp(o.x, -mp, mp),
      y: clamp(o.y, -mp, mp),
    }));
  }, [scale]);

  const resetView = useCallback(() => {
    setScale(1);
    setOff({ x: 0, y: 0 });
    panCleanupRef.current?.();
    panCleanupRef.current = null;
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (scaleRef.current <= 1) return;
      if (e.button !== 0) return;
      e.preventDefault();

      panCleanupRef.current?.();
      panCleanupRef.current = null;

      const pid = e.pointerId;
      const el = e.currentTarget;
      const startX = e.clientX;
      const startY = e.clientY;
      const ox0 = offRef.current.x;
      const oy0 = offRef.current.y;

      const move = (ev: PointerEvent) => {
        if (ev.pointerId !== pid) return;
        ev.preventDefault();
        const s = scaleRef.current;
        const mp = maxPanForScale(s);
        const dx = ev.clientX - startX;
        const dy = ev.clientY - startY;
        setOff({
          x: clamp(ox0 + dx, -mp, mp),
          y: clamp(oy0 + dy, -mp, mp),
        });
      };

      const up = (ev: PointerEvent) => {
        if (ev.pointerId !== pid) return;
        document.removeEventListener("pointermove", move);
        document.removeEventListener("pointerup", up);
        document.removeEventListener("pointercancel", up);
        panCleanupRef.current = null;
        try {
          el.releasePointerCapture(pid);
        } catch {
          /* */
        }
      };

      const detach = () => {
        document.removeEventListener("pointermove", move);
        document.removeEventListener("pointerup", up);
        document.removeEventListener("pointercancel", up);
      };
      panCleanupRef.current = detach;

      document.addEventListener("pointermove", move, { passive: false });
      document.addEventListener("pointerup", up);
      document.addEventListener("pointercancel", up);

      try {
        el.setPointerCapture(pid);
      } catch {
        /* */
      }
    },
    [],
  );

  if (!item || !display) return null;

  const canBuy = display.priceCad > 0;

  const handleAdd = () => {
    if (!canBuy) return;
    addItem(display, qty);
    close();
  };

  return (
    <div
      className="fixed inset-0 z-[93] flex items-center justify-center bg-cirta-black/52 p-3 backdrop-blur-[2px] sm:p-6"
      role="presentation"
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-inspect-title"
        className="relative max-h-[min(96dvh,920px)] w-full max-w-5xl overflow-y-auto border border-cirta-gold/32 bg-cirta-sand shadow-[0_40px_100px_-42px_rgba(0,0,0,0.78)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pointer-events-none absolute inset-0 texture-grain opacity-[0.35]" aria-hidden />

        <div className="relative border-b border-cirta-brown/10 bg-gradient-to-br from-cirta-ink to-cirta-brown px-4 py-5 pr-24 text-cirta-sand sm:px-7 sm:py-6 sm:pr-32">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.38em] text-cirta-gold">
            {i.sheetKicker}
          </p>
          <div className="mt-2 flex max-w-[min(100%,44rem)] flex-col gap-2.5">
            <h2
              id="product-inspect-title"
              className="font-serif text-[clamp(1.2rem,3.2vw,1.85rem)] font-medium leading-snug tracking-tight"
            >
              {display.title}
            </h2>
            <span className="w-fit rounded-sm border border-cirta-gold/35 bg-cirta-black/25 px-2.5 py-1.5 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-cirta-gold sm:text-[0.72rem]">
              {display.id}
            </span>
          </div>
          <p className="mt-3 text-[0.68rem] leading-relaxed text-cirta-sand/55 sm:text-xs">
            {i.zoomHint}
          </p>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={close}
            className="absolute right-3 top-3 z-10 min-h-11 min-w-11 border border-cirta-gold/45 bg-cirta-gold/[0.08] px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-cirta-gold transition hover:border-cirta-gold/75 hover:bg-cirta-gold/15 hover:text-cirta-sand sm:right-4 sm:top-4"
            aria-label={i.close}
          >
            {i.close}
          </button>
        </div>

        <div className="relative grid gap-0 lg:grid-cols-[1.05fr_0.95fr] lg:gap-0">
          <figure className="relative border-b border-cirta-brown/10 bg-cirta-sand/90 lg:border-b-0 lg:border-r lg:border-cirta-brown/10">
            <div
              ref={stageRef}
              aria-label={i.zoomHint}
              className={`relative aspect-[4/3] w-full overflow-hidden lg:min-h-[min(52vh,440px)] ${
                scale > 1
                  ? "touch-none cursor-grab select-none active:cursor-grabbing"
                  : "cursor-zoom-in"
              }`}
              onPointerDown={handlePointerDown}
              onDoubleClick={resetView}
            >
              <div
                className="flex h-full w-full items-center justify-center will-change-transform"
                style={{
                  transform: `translate(${off.x}px, ${off.y}px) scale(${scale})`,
                }}
              >
                <Image
                  src={display.image}
                  alt={`${display.title} — ${display.period}`}
                  width={display.width}
                  height={display.height}
                  draggable={false}
                  className="pointer-events-none max-h-full max-w-full object-contain"
                  sizes="(min-width: 1024px) 48vw, 96vw"
                  priority
                />
              </div>
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cirta-brown/15 via-transparent to-transparent"
                aria-hidden
              />
            </div>
          </figure>

          <div className="relative flex flex-col gap-5 px-5 py-6 sm:px-7 sm:py-8">
            <div className="space-y-3 text-cirta-brown">
              <p className="text-[0.74rem] font-semibold uppercase tracking-[0.12em] text-cirta-brown/82 sm:text-[0.76rem]">
                {display.period}
                <span className="mx-1.5 text-cirta-gold-dim/90 sm:mx-2">·</span>
                {display.origin}
              </p>
              <p className="text-sm leading-relaxed text-cirta-brown/88 sm:text-[0.95rem]">
                {display.medium}
              </p>
              {display.depth?.trim() ? (
                <p className="text-sm leading-relaxed text-cirta-brown/88 sm:text-[0.95rem]">
                  <span className="font-semibold text-cirta-brown/70">{t.depthLabel}</span>{" "}
                  {display.depth.trim()}
                </p>
              ) : null}
              {display.weight?.trim() ? (
                <p className="text-sm leading-relaxed text-cirta-brown/88 sm:text-[0.95rem]">
                  <span className="font-semibold text-cirta-brown/70">{t.weightLabel}</span>{" "}
                  {display.weight.trim()}
                </p>
              ) : null}
            </div>

            {display.histoire?.trim() ? (
              <div className="rounded-sm border border-cirta-brown/[0.07] bg-gradient-to-br from-cirta-sand/95 to-cirta-sand/60 px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]">
                <p className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-cirta-gold-dim">
                  {t.descriptionLabel}
                </p>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-cirta-brown/88">
                  {display.histoire.trim()}
                </p>
              </div>
            ) : null}

            <div className="mt-auto space-y-5 border-t border-cirta-brown/[0.07] pt-5">
              <div>
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-cirta-brown/48">
                  {t.priceCad}
                </p>
                <p className="font-serif text-2xl font-medium tabular-nums text-cirta-brown">
                  {canBuy ? formatCad(display.priceCad) : t.onRequest}
                </p>
              </div>

              {canBuy ? (
                <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-cirta-brown/50">
                      {t.qtyFor}
                    </span>
                    <div className="flex items-stretch border border-cirta-brown/18">
                      <button
                        type="button"
                        className="min-h-11 min-w-11 border-r border-cirta-brown/15 bg-cirta-black/[0.03] text-lg text-cirta-brown transition hover:bg-cirta-gold/15"
                        aria-label={t.decreaseQty}
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                      >
                        −
                      </button>
                      <span className="flex min-w-[2.75rem] items-center justify-center font-mono text-sm tabular-nums text-cirta-brown">
                        {qty}
                      </span>
                      <button
                        type="button"
                        className="min-h-11 min-w-11 border-l border-cirta-brown/15 bg-cirta-black/[0.03] text-lg text-cirta-brown transition hover:bg-cirta-gold/15"
                        aria-label={t.increaseQty}
                        onClick={() => setQty((q) => Math.min(99, q + 1))}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleAdd}
                    className="min-h-12 flex-1 border border-cirta-gold/42 bg-cirta-gold/14 px-6 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-cirta-brown transition hover:bg-cirta-gold/26 sm:min-w-[14rem] sm:flex-none"
                  >
                    {t.addToCart}
                    {qty > 1 ? ` (${qty})` : ""}
                  </button>
                </div>
              ) : (
                <p className="text-sm leading-relaxed text-cirta-brown/62">{t.contactOffer}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductInspectProvider({ children }: { children: ReactNode }) {
  const [item, setItem] = useState<CatalogItem | null>(null);
  const open = useCallback((raw: CatalogItem) => {
    setItem(raw);
  }, []);
  const close = useCallback(() => setItem(null), []);
  const value = useMemo(() => ({ item, open, close }), [item, open, close]);

  return (
    <InspectContext.Provider value={value}>
      {children}
      {item ? <ProductInspectDialogPanel /> : null}
    </InspectContext.Provider>
  );
}
