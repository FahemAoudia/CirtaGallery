"use client";

import { useState } from "react";
import { AdminLoginForm } from "@/components/AdminLoginForm";

export function AdminLoginGate() {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div className="mt-8">
      {!showAdmin ? (
        <div className="text-center">
          <p className="text-sm text-cirta-sand/55">Connexion réservée à l’équipe.</p>
          <button
            type="button"
            onClick={() => setShowAdmin(true)}
            className="mt-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-cirta-gold/85 underline-offset-4 transition hover:text-cirta-sand hover:underline"
          >
            Je suis administrateur
          </button>
        </div>
      ) : (
        <div className="border-t border-cirta-sand/10 pt-8">
          <p className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-cirta-gold/80">
            Connexion administrateur
          </p>
          <AdminLoginForm />
        </div>
      )}
    </div>
  );
}
