"use client";

import { useMemo, useState } from "react";

const COLLAPSE_LEN_DEFAULT = 200;
const COLLAPSE_LEN_COMPACT = 72;

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
    <div
      className={
        compact
          ? "border-t border-cirta-brown/8 pt-2"
          : "rounded-sm border border-cirta-brown/12 bg-gradient-to-br from-cirta-sand/90 to-cirta-sand/50 px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]"
      }
    >
      {!compact ? (
        <p className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-cirta-gold-dim">
          {label}
        </p>
      ) : null}
      <p
        className={`whitespace-pre-wrap leading-relaxed text-cirta-brown/72 ${
          compact ? "mt-0 text-[0.68rem] leading-snug" : "mt-2 text-sm text-cirta-brown/78"
        } ${needsToggle && !open ? (compact ? "line-clamp-2" : "line-clamp-3") : ""}`}
      >
        {text}
      </p>
      {needsToggle ? (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`text-left font-semibold text-cirta-brown/55 underline decoration-cirta-gold/40 underline-offset-2 transition hover:text-cirta-gold-dim ${
            compact
              ? "mt-1.5 text-[0.58rem] uppercase tracking-[0.1em]"
              : "mt-2.5 text-[0.72rem] uppercase tracking-[0.14em] underline-offset-4"
          }`}
        >
          {open ? voirMoins : voirPlus}
        </button>
      ) : null}
    </div>
  );
}
