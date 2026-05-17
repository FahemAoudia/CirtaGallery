import { updateAdminPassword } from "@/app/admin/_actions";

const PASSWORD_MIN = 10;

type AdminOwnPasswordFormProps = {
  sessionEmail: string;
  roleLabel?: string;
};

export function AdminOwnPasswordForm({ sessionEmail, roleLabel }: AdminOwnPasswordFormProps) {
  return (
    <section className="min-w-0 overflow-hidden rounded-xl border border-cirta-brown/10 bg-white/90 p-4 shadow-sm sm:p-6 md:p-8">
      <h2 className="font-serif text-xl font-medium text-cirta-brown">Mot de passe</h2>
      <div className="mt-2 min-w-0 text-sm text-cirta-brown/58">
        <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-cirta-brown/45">
          Compte
        </span>
        <p className="mt-1 min-w-0 break-all font-mono text-[0.78rem] leading-snug text-cirta-brown/85 sm:text-sm">
          {sessionEmail || "—"}
        </p>
        {roleLabel ? (
          <p className="mt-1 text-[0.72rem] text-cirta-brown/45">({roleLabel})</p>
        ) : null}
      </div>
      <form action={updateAdminPassword} className="mt-6 w-full max-w-md space-y-4">
        <div className="space-y-1">
          <label
            htmlFor="currentPassword"
            className="block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cirta-brown/50"
          >
            Mot de passe actuel
          </label>
          <input
            id="currentPassword"
            name="currentPassword"
            type="password"
            autoComplete="current-password"
            required
            className="w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm"
          />
        </div>
        <div className="space-y-1">
          <label
            htmlFor="newPassword"
            className="block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cirta-brown/50"
          >
            Nouveau mot de passe
          </label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            autoComplete="new-password"
            required
            minLength={PASSWORD_MIN}
            className="w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm"
          />
          <p className="text-[0.65rem] text-cirta-brown/45">Au moins {PASSWORD_MIN} caractères.</p>
        </div>
        <div className="space-y-1">
          <label
            htmlFor="confirmPassword"
            className="block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cirta-brown/50"
          >
            Confirmer le nouveau mot de passe
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            minLength={PASSWORD_MIN}
            className="w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm"
          />
        </div>
        <button
          type="submit"
          className="border border-cirta-gold/45 bg-cirta-gold/12 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em]"
        >
          Mettre à jour le mot de passe
        </button>
      </form>
    </section>
  );
}
