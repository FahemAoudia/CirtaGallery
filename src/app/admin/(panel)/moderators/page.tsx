import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  createAdminAccount,
  createModeratorAccount,
  deleteStaffAccount,
  resetStaffPassword,
} from "@/app/admin/_actions";
import { AdminOwnPasswordForm } from "@/components/admin/AdminOwnPasswordForm";
import { getAdminCookieName, verifyAdminJwt, type AdminRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const PASSWORD_MIN = 10;

export default async function AdminModeratorsPage() {
  const jar = await cookies();
  const token = jar.get(getAdminCookieName())?.value;
  if (!token) {
    redirect("/admin/login");
  }
  let sessionSub = "";
  let sessionEmail = "";
  let role: AdminRole = "MODERATOR";
  try {
    const p = await verifyAdminJwt(token);
    sessionSub = p.sub;
    sessionEmail = p.email;
    role = p.role;
  } catch {
    redirect("/admin/login");
  }

  const isAdmin = role === "ADMIN";

  const staffAccounts = isAdmin
    ? await prisma.adminUser.findMany({
        select: { id: true, email: true, role: true },
        orderBy: [{ role: "asc" }, { email: "asc" }],
      })
    : [];
  const adminCount = staffAccounts.filter((u) => u.role === "ADMIN").length;
  const roleLabel = role === "MODERATOR" ? "modérateur" : "administrateur";

  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-serif text-3xl font-medium tracking-tight text-cirta-brown">
          Équipe & accès
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-cirta-brown/60">
          {isAdmin ? (
            <>
              Gérez les administrateurs et modérateurs, et modifiez votre mot de passe. La rédaction des
              textes publics reste dans{" "}
              <span className="font-medium text-cirta-brown">Contenu du site</span>.
            </>
          ) : (
            <>
              Modifiez votre mot de passe ci-dessous. La gestion du catalogue et des autres sections reste
              accessible depuis le menu.
            </>
          )}
        </p>
      </header>

      <AdminOwnPasswordForm sessionEmail={sessionEmail} roleLabel={roleLabel} />

      {isAdmin ? (
        <>
          <section className="rounded-xl border border-cirta-brown/10 bg-white/90 p-6 shadow-sm md:p-8">
            <h2 className="font-serif text-xl font-medium text-cirta-brown">Comptes actifs</h2>
            <p className="mt-2 text-sm text-cirta-brown/58">
              {adminCount} administrateur{adminCount > 1 ? "s" : ""} · réinitialisez le mot de passe d’un
              autre compte ou retirez-le (sauf le vôtre et le dernier admin).
            </p>
            {staffAccounts.length === 0 ? (
              <p className="mt-6 text-sm text-cirta-brown/55">Aucun compte en base.</p>
            ) : (
              <ul className="mt-6 space-y-4">
                {staffAccounts.map((u) => {
                  const isSelf = u.id === sessionSub;
                  const canDelete =
                    !isSelf && (u.role === "MODERATOR" || (u.role === "ADMIN" && adminCount > 1));

                  return (
                    <li
                      key={u.id}
                      className="border border-cirta-brown/10 bg-white/60 px-4 py-4 text-sm"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <span className="font-mono text-cirta-brown/90">{u.email}</span>
                          <span className="ml-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-cirta-brown/40">
                            {u.role === "MODERATOR" ? "Modérateur" : "Administrateur"}
                          </span>
                          {isSelf ? (
                            <span className="ml-2 text-[0.62rem] text-cirta-gold-dim">(vous)</span>
                          ) : null}
                        </div>
                        {canDelete ? (
                          <form action={deleteStaffAccount}>
                            <input type="hidden" name="id" value={u.id} />
                            <button
                              type="submit"
                              className="text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-red-800/80 underline-offset-2 hover:underline"
                            >
                              Retirer
                            </button>
                          </form>
                        ) : null}
                      </div>

                      {!isSelf ? (
                        <form
                          action={resetStaffPassword}
                          className="mt-4 grid max-w-md gap-2 sm:grid-cols-2"
                        >
                          <input type="hidden" name="id" value={u.id} />
                          <div className="space-y-1">
                            <label
                              htmlFor={`pwd_${u.id}`}
                              className="block text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-cirta-brown/45"
                            >
                              Nouveau mot de passe
                            </label>
                            <input
                              id={`pwd_${u.id}`}
                              name="newPassword"
                              type="password"
                              required
                              minLength={PASSWORD_MIN}
                              autoComplete="new-password"
                              className="w-full border border-cirta-brown/15 bg-white px-2.5 py-1.5 text-sm"
                            />
                          </div>
                          <div className="space-y-1">
                            <label
                              htmlFor={`pwd2_${u.id}`}
                              className="block text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-cirta-brown/45"
                            >
                              Confirmer
                            </label>
                            <input
                              id={`pwd2_${u.id}`}
                              name="confirmPassword"
                              type="password"
                              required
                              minLength={PASSWORD_MIN}
                              autoComplete="new-password"
                              className="w-full border border-cirta-brown/15 bg-white px-2.5 py-1.5 text-sm"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <button
                              type="submit"
                              className="text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-cirta-brown/70 underline-offset-2 hover:text-cirta-brown hover:underline"
                            >
                              Réinitialiser le mot de passe
                            </button>
                          </div>
                        </form>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            )}
          </section>

          <div className="grid gap-8 lg:grid-cols-2">
            <section className="rounded-xl border border-cirta-gold/25 bg-cirta-gold/[0.06] p-6 shadow-sm md:p-8">
              <h2 className="font-serif text-xl font-medium text-cirta-brown">Ajouter un administrateur</h2>
              <p className="mt-2 text-sm text-cirta-brown/58">
                Accès complet : contenu du site, paramètres, équipe et catalogue.
              </p>
              <form action={createAdminAccount} className="mt-5 grid gap-4">
                <div className="space-y-1">
                  <label
                    htmlFor="admin_email"
                    className="block text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-cirta-brown/50"
                  >
                    Email
                  </label>
                  <input
                    id="admin_email"
                    name="email"
                    type="email"
                    required
                    autoComplete="off"
                    className="w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label
                    htmlFor="admin_password"
                    className="block text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-cirta-brown/50"
                  >
                    Mot de passe initial
                  </label>
                  <input
                    id="admin_password"
                    name="password"
                    type="password"
                    required
                    minLength={PASSWORD_MIN}
                    autoComplete="new-password"
                    className="w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm"
                  />
                  <p className="text-[0.65rem] text-cirta-brown/45">Minimum {PASSWORD_MIN} caractères.</p>
                </div>
                <button
                  type="submit"
                  className="border border-cirta-gold/50 bg-cirta-gold/15 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em]"
                >
                  Créer le compte administrateur
                </button>
              </form>
            </section>

            <section className="rounded-xl border border-cirta-brown/10 bg-white/90 p-6 shadow-sm md:p-8">
              <h2 className="font-serif text-xl font-medium text-cirta-brown">Ajouter un modérateur</h2>
              <p className="mt-2 text-sm text-cirta-brown/58">
                Catalogue, FAQ, abonnés et blocs — sans édition des textes globaux du site.
              </p>
              <form action={createModeratorAccount} className="mt-5 grid gap-4">
                <div className="space-y-1">
                  <label
                    htmlFor="mod_email"
                    className="block text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-cirta-brown/50"
                  >
                    Email
                  </label>
                  <input
                    id="mod_email"
                    name="email"
                    type="email"
                    required
                    autoComplete="off"
                    className="w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label
                    htmlFor="mod_password"
                    className="block text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-cirta-brown/50"
                  >
                    Mot de passe initial
                  </label>
                  <input
                    id="mod_password"
                    name="password"
                    type="password"
                    required
                    minLength={PASSWORD_MIN}
                    autoComplete="new-password"
                    className="w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm"
                  />
                  <p className="text-[0.65rem] text-cirta-brown/45">Minimum {PASSWORD_MIN} caractères.</p>
                </div>
                <button
                  type="submit"
                  className="border border-cirta-brown/20 bg-white px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em]"
                >
                  Créer le compte modérateur
                </button>
              </form>
            </section>
          </div>
        </>
      ) : null}
    </div>
  );
}
