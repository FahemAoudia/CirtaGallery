"use client";

import { useMemo, useState } from "react";
import { productDescriptionPanelClass } from "@/lib/product-description-panel";

const COLLAPSE_LEN_DEFAULT = 200;
const COLLAPSE_LEN_COMPACT = 120;

export function ProductHistoireBlurb({
  text,
  label,
  voirPlus,
  voirMoins,
  compact = false,
}: {
  text: string;
  label: string;
  voirPlus: string;
  voirMoins: string;
  /** Aperçu court sur cartes catalogue 2 colonnes (mobile). */
  compact?: boolean;
}) {
  const collapseLen = compact ? COLLAPSE_LEN_COMPACT : COLLAPSE_LEN_DEFAULT;
  const needsToggle = useMemo(
    () => text.length > collapseLen || text.includes("\n"),
    [text, collapseLen],
  );
  const [open, setOpen] = useState(false);

  return (
    <div className={productDescriptionPanelClass}>
      <p className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-cirta-gold-dim">
        {label}
      </p>
      <p
        className={`mt-2 whitespace-pre-wrap leading-relaxed text-cirta-brown/78 ${
          compact ? "text-[0.72rem] leading-snug" : "text-sm"
        } ${needsToggle && !open ? "line-clamp-3" : ""}`}
      >
        {text}
      </p>
      {needsToggle ? (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`mt-2.5 text-left font-semibold uppercase tracking-[0.14em] text-cirta-brown/55 underline decoration-cirta-gold/40 underline-offset-4 transition hover:text-cirta-gold-dim ${
            compact ? "text-[0.62rem]" : "text-[0.72rem]"
          }`}
        >
          {open ? voirMoins : voirPlus}
        </button>
      ) : null}
    </div>
  );
}
