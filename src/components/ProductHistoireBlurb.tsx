"use client";

import { useMemo, useState } from "react";

const COLLAPSE_LEN = 200;

export function ProductHistoireBlurb({
  text,
  label,
  voirPlus,
  voirMoins,
}: {
  text: string;
  label: string;
  voirPlus: string;
  voirMoins: string;
}) {
  const needsToggle = useMemo(() => text.length > COLLAPSE_LEN || text.includes("\n\n"), [text]);
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-sm border border-cirta-brown/12 bg-gradient-to-br from-cirta-sand/90 to-cirta-sand/50 px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
      <p className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-cirta-gold-dim">
        {label}
      </p>
      <p
        className={`mt-2 whitespace-pre-wrap text-sm leading-relaxed text-cirta-brown/78 ${
          needsToggle && !open ? "line-clamp-3" : ""
        }`}
      >
        {text}
      </p>
      {needsToggle ? (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="mt-2.5 text-left text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-cirta-brown/55 underline decoration-cirta-gold/40 underline-offset-4 transition hover:text-cirta-gold-dim"
        >
          {open ? voirMoins : voirPlus}
        </button>
      ) : null}
    </div>
  );
}
