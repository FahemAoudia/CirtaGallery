import { updateAdminPassword } from "@/app/admin/_actions";

const PASSWORD_MIN = 10;

type AdminOwnPasswordFormProps = {
  sessionEmail: string;
  roleLabel?: string;
};

export function AdminOwnPasswordForm({ sessionEmail, roleLabel }: AdminOwnPasswordFormProps) {
  return (
    <section className="rounded-xl border border-cirta-brown/10 bg-white/90 p-6 shadow-sm md:p-8">
      <h2 className="font-serif text-xl font-medium text-cirta-brown">Mot de passe</h2>
      <p className="mt-2 text-sm text-cirta-brown/58">
        Compte : <span className="font-mono text-cirta-brown/80">{sessionEmail || "—"}</span>
        {roleLabel ? (
          <span className="ml-2 text-cirta-brown/45">({roleLabel})</span>
        ) : null}
      </p>
      <form action={updateAdminPassword} className="mt-6 max-w-md space-y-4">
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
