"use client";

import { useMemo, useState } from "react";
import type { Product } from "@prisma/client";
import {
  emptySlotState,
  parseProductImages,
  PRODUCT_IMAGE_SLOTS,
  slotLabelFr,
  type ProductImageSlot,
} from "@/lib/product-images";

type SlotState = {
  url: string;
  caption: string;
  width: number;
  height: number;
};

type ProductImagesEditorProps = {
  product?: Product;
  defaultWidth?: number;
  defaultHeight?: number;
};

function SlotImageUpload({
  slot,
  label,
  state,
  onChange,
}: {
  slot: ProductImageSlot;
  label: string;
  state: SlotState;
  onChange: (next: SlotState) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setErr(null);
    setBusy(true);
    try {
      const fd = new FormData();
      fd.set("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
      if (!res.ok) {
        setErr(data.error ?? "Échec du téléversement");
        return;
      }
      if (data.url) onChange({ ...state, url: data.url });
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  }

  return (
    <div className="rounded-sm border border-cirta-brown/12 bg-white/90 p-3">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cirta-gold-dim">
        {label}
      </p>
      <input type="hidden" name={`image_${slot}_url`} value={state.url} readOnly />
      <input type="hidden" name={`image_${slot}_width`} value={state.width} readOnly />
      <input type="hidden" name={`image_${slot}_height`} value={state.height} readOnly />

      <div className="mt-2 flex flex-wrap items-start gap-3">
        <div className="min-w-0 flex-1">
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={onPick}
            disabled={busy}
            className="max-w-full text-sm text-cirta-brown file:mr-2 file:border file:border-cirta-brown/20 file:bg-white file:px-2 file:py-1.5 file:text-[0.6rem] file:font-semibold file:uppercase file:tracking-[0.08em]"
          />
          {busy ? <p className="mt-1 text-[0.68rem] text-cirta-brown/50">Téléversement…</p> : null}
          {err ? (
            <p className="mt-1 text-sm text-red-700" role="alert">
              {err}
            </p>
          ) : null}
        </div>
        {state.url ? (
          <div className="relative h-24 w-20 shrink-0 overflow-hidden border border-cirta-brown/15 bg-cirta-sand/50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={state.url} alt="" className="h-full w-full object-cover" />
          </div>
        ) : null}
      </div>

      <label className="mt-3 block text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-cirta-brown/45">
        Titre sous l’image (français)
      </label>
      <input
        name={`image_${slot}_caption`}
        value={state.caption}
        onChange={(e) => onChange({ ...state, caption: e.target.value })}
        placeholder={label}
        className="mt-1 w-full border border-cirta-brown/15 bg-white px-2.5 py-1.5 text-sm outline-none focus:border-cirta-gold/50"
      />
    </div>
  );
}

export function ProductImagesEditor({
  product,
  defaultWidth = 880,
  defaultHeight = 1100,
}: ProductImagesEditorProps) {
  const initial = useMemo(() => {
    const legacy = product
      ? { image: product.image, width: product.width, height: product.height }
      : undefined;
    const entries = parseProductImages(product?.imagesJson, legacy);
    return emptySlotState(entries);
  }, [product]);

  const [slots, setSlots] = useState(initial);

  function setSlot(slot: ProductImageSlot, next: SlotState) {
    setSlots((prev) => ({
      ...prev,
      [slot]: {
        ...next,
        width: next.width || defaultWidth,
        height: next.height || defaultHeight,
      },
    }));
  }

  return (
    <div className="space-y-3 border border-cirta-brown/12 bg-gradient-to-br from-cirta-sand/95 to-cirta-sand/80 p-4">
      <div>
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cirta-brown/50">
          Galerie — jusqu’à 7 vues
        </p>
        <p className="mt-1 text-[0.68rem] leading-relaxed text-cirta-brown/45">
          La <strong className="font-medium text-cirta-brown/65">face avant</strong> s’affiche sur
          la carte catalogue. Les autres vues sont accessibles dans la fiche œuvre (flèches).
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {PRODUCT_IMAGE_SLOTS.map(({ slot, labelFr }) => (
          <SlotImageUpload
            key={slot}
            slot={slot}
            label={labelFr}
            state={slots[slot]}
            onChange={(next) => setSlot(slot, next)}
          />
        ))}
      </div>
      <p className="text-[0.65rem] text-cirta-brown/40">
        Emplacements : {PRODUCT_IMAGE_SLOTS.map((s) => slotLabelFr(s.slot)).join(" · ")}
      </p>
    </div>
  );
}
