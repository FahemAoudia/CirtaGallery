"use client";

import { useEffect, useState } from "react";

export function AdminFlashToast({ message }: { message: string | null }) {
  const [closed, setClosed] = useState(true);

  useEffect(() => {
    if (!message) {
      setClosed(true);
      return;
    }
    setClosed(false);
    // Découpler du canal Server Action (POST forme /admin/...) pour éviter 500 / « unexpected response » en dev.
    const clearId = window.setTimeout(() => {
      void fetch("/api/admin/clear-flash", {
        method: "POST",
        credentials: "same-origin",
      }).catch(() => {});
    }, 100);
    const hideId = window.setTimeout(() => setClosed(true), 5200);
    return () => {
      window.clearTimeout(clearId);
      window.clearTimeout(hideId);
    };
  }, [message]);

  if (!message || closed) return null;

  return (
    <div
      className="pointer-events-none fixed bottom-6 right-6 z-[230] max-w-sm animate-fade-rise"
      role="status"
      aria-live="polite"
    >
      <div className="pointer-events-auto rounded-sm border border-cirta-gold/40 bg-gradient-to-br from-cirta-sand via-white to-cirta-sand/95 px-5 py-4 text-cirta-brown shadow-[0_20px_50px_-24px_rgba(30,22,16,0.55)]">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-cirta-gold-dim">Cirta Gallery</p>
        <p className="mt-2 text-sm font-medium leading-snug text-cirta-brown">{message}</p>
      </div>
    </div>
  );
}
