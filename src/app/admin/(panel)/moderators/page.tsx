import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createModeratorAccount, deleteModeratorAccount } from "@/app/admin/_actions";
import { getAdminCookieName, verifyAdminJwt } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const PASSWORD_MIN = 10;

export default async function AdminModeratorsPage() {
  const jar = await cookies();
  const token = jar.get(getAdminCookieName())?.value;
  if (!token) {
    redirect("/admin/login");
  }
  let isAdmin = false;
  try {
    const p = await verifyAdminJwt(token);
    isAdmin = p.role === "ADMIN";
  } catch {
    redirect("/admin/login");
  }
  if (!isAdmin) {
    redirect("/admin");
  }

  const staffAccounts = await prisma.adminUser.findMany({
    select: { id: true, email: true, role: true },
    orderBy: { email: "asc" },
  });

  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-serif text-3xl font-medium tracking-tight text-cirta-brown">Modérateurs</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-cirta-brown/60">
          Comptes avec accès catalogue, FAQ, abonnés et mise en page — sans édition des textes globaux du site.{" "}
          <Link href="/admin/settings" className="font-medium text-cirta-brown underline-offset-2 hover:underline">
            Contenu du site
          </Link>{" "}
          et mot de passe : page paramètres.
        </p>
      </header>

      <section className="rounded-xl border border-cirta-brown/10 bg-white/90 p-6 shadow-sm md:p-8">
        <h2 className="font-serif text-xl font-medium text-cirta-brown">Équipe</h2>
        <p className="mt-2 text-sm text-cirta-brown/58">
          L’administrateur principal ne peut pas être retiré ici ; seuls les comptes « modérateur » sont listés avec
          l’option de suppression.
        </p>
        {staffAccounts.length === 0 ? (
          <p className="mt-6 text-sm text-cirta-brown/55">Aucun compte en base.</p>
        ) : (
          <ul className="mt-6 divide-y divide-cirta-brown/10 border border-cirta-brown/10">
            {staffAccounts.map((u) => (
              <li
                key={u.id}
                className="flex flex-wrap items-center justify-between gap-3 bg-white/60 px-4 py-3 text-sm"
              >
                <div>
                  <span className="font-mono text-cirta-brown/90">{u.email}</span>
                  <span className="ml-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-cirta-brown/40">
                    {u.role === "MODERATOR" ? "Modérateur" : "Administrateur"}
                  </span>
                </div>
                {u.role === "MODERATOR" ? (
                  <form action={deleteModeratorAccount}>
                    <input type="hidden" name="id" value={u.id} />
                    <button
                      type="submit"
                      className="text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-red-800/80 underline-offset-2 hover:underline"
                    >
                      Retirer
                    </button>
                  </form>
                ) : null}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 border-t border-cirta-brown/10 pt-8">
          <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-cirta-brown/45">
            Ajouter un modérateur
          </h3>
          <form action={createModeratorAccount} className="mt-4 grid max-w-lg gap-4 sm:grid-cols-2">
            <div className="space-y-1 sm:col-span-2">
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
            <div className="space-y-1 sm:col-span-2">
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
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="border border-cirta-gold/45 bg-cirta-gold/12 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em]"
              >
                Créer le compte modérateur
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
