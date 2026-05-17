"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale } from "@/context/LocaleContext";
import { abonnerFormCopy } from "@/lib/site-i18n";

type AbonnerAccessFormProps = {
  /** Quand la boîte se ferme, réinitialiser les champs */
  dialogOpen?: boolean;
  onRequestClose?: () => void;
};

export function AbonnerAccessForm({
  dialogOpen = true,
  onRequestClose,
}: AbonnerAccessFormProps) {
  const { locale } = useLocale();
  const t = abonnerFormCopy[locale];
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!dialogOpen) {
      setEmail("");
      setName("");
      setPhone("");
      setMsg(null);
      setError(null);
    }
  }, [dialogOpen]);

  const inputBase =
    "min-h-11 w-full border border-cirta-brown/15 bg-white px-3 py-2.5 text-base text-cirta-brown outline-none focus:border-cirta-gold/50 sm:text-sm";
  const labelBase = "text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cirta-brown/50";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/subscribe/free", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: name.trim() || undefined,
          phone: phone.trim() || undefined,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? t.errSubscribe);
        return;
      }
      setMsg(t.subscribeSuccess);
    } finally {
      setBusy(false);
    }
  }

  if (msg) {
    return (
      <div className="rounded-sm border border-cirta-gold/30 bg-cirta-gold/10 px-4 py-5 text-center">
        <p className="whitespace-pre-line text-sm font-medium leading-relaxed text-cirta-brown" role="status">
          {msg}
        </p>
        {onRequestClose ? (
          <button
            type="button"
            onClick={onRequestClose}
            className="mt-5 min-h-11 border border-cirta-gold/45 bg-cirta-gold/[0.12] px-6 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-cirta-gold transition hover:border-cirta-gold/70 hover:bg-cirta-gold/20"
          >
            {t.close}
          </button>
        ) : null}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error ? (
        <p className="text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <div className="space-y-1">
        <label htmlFor="abo-email" className={labelBase}>
          {t.labelEmail}
        </label>
        <input
          id="abo-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className={inputBase}
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="abo-name" className={labelBase}>
          {t.labelName}
        </label>
        <input
          id="abo-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          className={inputBase}
        />
      </div>
      <div className="space-y-1">
        <label htmlFor="abo-phone" className={labelBase}>
          {t.labelPhone}
        </label>
        <input
          id="abo-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="tel"
          className={inputBase}
        />
      </div>

      <button
        type="submit"
        disabled={busy}
        className="min-h-12 w-full border border-cirta-brown/25 bg-cirta-black/[0.02] py-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-cirta-brown transition hover:border-cirta-gold/40 disabled:opacity-50"
      >
        {busy ? "…" : t.submitSubscribe}
      </button>
    </form>
  );
}
