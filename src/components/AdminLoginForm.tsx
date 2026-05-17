"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Identifiants incorrects.");
        return;
      }
      router.replace("/admin");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  const field =
    "min-h-11 w-full border border-cirta-sand/20 bg-cirta-black/35 px-3 py-2.5 text-sm text-cirta-sand outline-none focus:border-cirta-gold/45 placeholder:text-cirta-sand/30";
  const label = "text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cirta-sand/50";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error ? (
        <p className="text-sm text-red-300" role="alert">
          {error}
        </p>
      ) : null}
      <div className="space-y-1">
        <label htmlFor="adm-email" className={label}>
          Courriel administrateur
        </label>
        <input
          id="adm-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className={field}
        />
      </div>
      <div className="space-y-1">
        <label htmlFor="adm-password" className={label}>
          Mot de passe
        </label>
        <input
          id="adm-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          className={field}
        />
      </div>
      <button
        type="submit"
        disabled={busy}
        className="min-h-12 w-full border border-cirta-gold/45 bg-cirta-gold/12 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-cirta-sand transition hover:bg-cirta-gold/20 disabled:opacity-50"
      >
        {busy ? "…" : "Connexion"}
      </button>
    </form>
  );
}
