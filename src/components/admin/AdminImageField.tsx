"use client";

import { useState } from "react";

type AdminImageFieldProps = {
  name?: string;
  initialUrl: string;
  label?: string;
  helpText?: string;
};

export function AdminImageField({
  name = "image",
  initialUrl,
  label = "Image (fichier sur votre ordinateur)",
  helpText = "JPEG, PNG, WebP ou GIF — max 12 Mo. L’image est copiée sur le serveur.",
}: AdminImageFieldProps) {
  const [value, setValue] = useState(initialUrl);
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
      if (data.url) setValue(data.url);
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cirta-brown/50">
        {label}
      </label>
      <input type="hidden" name={name} value={value} readOnly />
      <div className="flex flex-wrap items-start gap-4">
        <div>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={onPick}
            disabled={busy}
            className="max-w-full text-sm text-cirta-brown file:mr-3 file:border file:border-cirta-brown/20 file:bg-white file:px-3 file:py-2 file:text-[0.65rem] file:font-semibold file:uppercase file:tracking-[0.1em]"
          />
          {busy ? <p className="mt-1 text-[0.72rem] text-cirta-brown/50">Téléversement…</p> : null}
          {err ? (
            <p className="mt-1 text-sm text-red-700" role="alert">
              {err}
            </p>
          ) : null}
          <p className="mt-2 text-[0.68rem] text-cirta-brown/45">{helpText}</p>
        </div>
        {value ? (
          <div className="relative h-36 w-28 shrink-0 overflow-hidden border border-cirta-brown/15 bg-cirta-sand/50">
            {/* eslint-disable-next-line @next/next/no-img-element -- aperçu admin (URLs locales ou héritées) */}
            <img src={value} alt="" className="h-full w-full object-cover" />
          </div>
        ) : null}
      </div>
    </div>
  );
}
