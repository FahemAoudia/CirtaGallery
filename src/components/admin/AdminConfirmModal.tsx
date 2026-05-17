"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type AdminConfirmModalProps = {
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  /** Style plus doux pour une réinitialisation plutôt qu’une suppression */
  tone?: "danger" | "neutral";
};

export function AdminConfirmModal({
  title = "Confirmer",
  message,
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  onConfirm,
  onCancel,
  tone = "danger",
}: AdminConfirmModalProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [mounted, onCancel]);

  const confirmClass =
    tone === "danger"
      ? "border border-red-900/35 bg-red-900/[0.08] text-red-950 hover:bg-red-900/[0.14]"
      : "border border-cirta-gold/50 bg-cirta-gold/18 text-cirta-brown hover:bg-cirta-gold/28";

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[240] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-confirm-title"
      aria-describedby="admin-confirm-desc"
    >
      <button
        type="button"
        className="absolute inset-0 bg-cirta-ink/55 backdrop-blur-[2px]"
        aria-label={cancelLabel}
        onClick={onCancel}
      />
      <div className="relative z-[241] w-full max-w-md rounded-sm border border-cirta-brown/15 bg-gradient-to-b from-cirta-sand via-[#faf7f0] to-cirta-sand/95 p-6 shadow-[0_32px_80px_-32px_rgba(20,14,10,0.65)]">
        <p
          id="admin-confirm-title"
          className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-cirta-gold-dim"
        >
          {title}
        </p>
        <div className="ornament-rule my-4 max-w-[10rem] opacity-80" />
        <p id="admin-confirm-desc" className="text-sm leading-relaxed text-cirta-brown/88">
          {message}
        </p>
        <div className="mt-8 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-sm border border-cirta-brown/18 bg-white/80 px-4 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-cirta-brown transition hover:border-cirta-brown/30"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`rounded-sm px-4 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] transition ${confirmClass}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
