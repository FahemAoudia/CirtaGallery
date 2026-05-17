import Link from "next/link";
import { cookies } from "next/headers";
import {
  saveContactCmsBlock,
  saveSiteSetting,
  updateAdminPassword,
} from "@/app/admin/_actions";
import { CONTACT_CMS_FIELD_META } from "@/lib/contact-settings";
import { getAdminCookieName, verifyAdminJwt, type AdminRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const PASSWORD_MIN = 10;

const SIMPLE_TEXT_LABELS: Record<string, string> = {
  catalog_intro: "Catalogue — paragraphe sous le titre",
  featured_kicker: "Salon — ligne d’épingle",
  featured_title: "Salon — titre principal",
  featured_aside: "Salon — texte de droite",
  about_kicker: "À propos — ligne d’épingle",
  about_heading: "À propos — titre",
  about_p1: "À propos — premier paragraphe",
  about_p2: "À propos — second paragraphe",
  about_quote_ar: "À propos — citation (arabe, RTL)",
  contact_intro: "Contact — texte sous le titre (colonne gauche)",
};

const SIMPLE_TEXT_SECTIONS: { title: string; description?: string; keys: string[] }[] = [
  {
    title: "Catalogue en ligne",
    description: "Texte d’introduction au-dessus des filtres sur la page d’accueil.",
    keys: ["catalog_intro"],
  },
  {
    title: "Salon (vedettes)",
    keys: ["featured_kicker", "featured_title", "featured_aside"],
  },
  {
    title: "À propos",
    keys: ["about_kicker", "about_heading", "about_p1", "about_p2", "about_quote_ar"],
  },
];

function textareaRows(key: string): number {
  if (key.includes("quote") || key.endsWith("_p1") || key.endsWith("_p2")) return 5;
  if (
    key === "catalog_intro" ||
    key === "featured_title" ||
    key === "featured_aside" ||
    key === "about_heading"
  )
    return 5;
  return 3;
}

export default async function AdminSettingsPage() {
  const jar = await cookies();
  const token = jar.get(getAdminCookieName())?.value;
  let role: AdminRole = "ADMIN";
  let sessionEmail = "";
  if (token) {
    try {
      const p = await verifyAdminJwt(token);
      role = p.role;
      sessionEmail = p.email;
    } catch {
      /* middleware normalement déjà passé */
    }
  }

  const rows =
    role === "ADMIN"
      ? await prisma.siteSetting.findMany({ orderBy: { key: "asc" } })
      : [];
  const byKey = Object.fromEntries(rows.map((r) => [r.key, r.value])) as Record<string, string>;
  const teaserOn = (byKey.collection_teasers_visible ?? "1") !== "0";

  const usedKeys = new Set<string>([
    "collection_teasers_visible",
    "contact_intro",
    ...SIMPLE_TEXT_SECTIONS.flatMap((s) => s.keys),
    ...CONTACT_CMS_FIELD_META.map((f) => f.name),
  ]);
  const orphanRows = rows.filter((r) => !usedKeys.has(r.key));

  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-serif text-3xl font-medium tracking-tight text-cirta-brown">
          {role === "ADMIN" ? "Contenu du site" : "Compte"}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-cirta-brown/60">
          {role === "ADMIN" ? (
            <>
              Textes d’accueil, bandeau « Notre collection », formulaire de contact (français). L’ordre des
              grandes zones :{" "}
              <Link
                href="/admin/sections"
                className="font-medium text-cirta-brown underline-offset-2 hover:underline"
              >
                Blocs & ordre
              </Link>
              . Les images des rayons (vitrine uniquement) :{" "}
              <Link href="/admin/ribbons" className="font-medium text-cirta-brown underline-offset-2 hover:underline">
                Rayons
              </Link>
              . Les comptes modérateurs :{" "}
              <Link
                href="/admin/moderators"
                className="font-medium text-cirta-brown underline-offset-2 hover:underline"
              >
                Modérateurs
              </Link>
              .
            </>
          ) : (
            <>
              Vous êtes connecté en tant que <span className="font-medium text-cirta-brown">{sessionEmail}</span>{" "}
              (modérateur). Vous pouvez modifier votre mot de passe ci-dessous ; la rédaction des textes publics
              reste réservée à l’administrateur principal.
            </>
          )}
        </p>
      </header>

      <section className="rounded-xl border border-cirta-brown/10 bg-white/90 p-6 shadow-sm md:p-8">
        <h2 className="font-serif text-xl font-medium text-cirta-brown">Mot de passe</h2>
        <p className="mt-2 text-sm text-cirta-brown/58">
          Compte : <span className="font-mono text-cirta-brown/80">{sessionEmail || "—"}</span>
          {role === "MODERATOR" ? (
            <span className="ml-2 text-cirta-brown/45">(rôle modérateur)</span>
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

      {role === "ADMIN" ? null : (
        <p className="text-sm text-cirta-brown/55">
          Raccourci vers le catalogue :{" "}
          <Link href="/admin/products" className="font-medium text-cirta-brown underline-offset-2 hover:underline">
            Produits
          </Link>
          .
        </p>
      )}

      {role === "ADMIN" ? (
        <>
      <section className="rounded-xl border border-cirta-brown/10 bg-white/90 p-6 shadow-sm md:p-8">
        <h2 className="font-serif text-xl font-medium text-cirta-brown">Bandeau « Notre collection »</h2>
        <p className="mt-2 text-sm text-cirta-brown/58">
          Miniatures sous le titre du hero : purement décoratives. Les fichiers se gèrent par rayon
          (image dédiée, indépendante des fiches produit).
        </p>
        <form action={saveSiteSetting} className="mt-6 flex flex-wrap items-end gap-4">
          <input type="hidden" name="key" value="collection_teasers_visible" />
          <div className="space-y-1">
            <label
              htmlFor="collection_teasers_visible"
              className="block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cirta-brown/50"
            >
              Affichage des miniatures
            </label>
            <select
              id="collection_teasers_visible"
              name="value"
              defaultValue={teaserOn ? "1" : "0"}
              className="min-w-[16rem] border border-cirta-brown/15 bg-white px-3 py-2 text-sm"
            >
              <option value="1">Afficher les photos sous chaque rayon</option>
              <option value="0">Masquer les photos (titres / liens uniquement)</option>
            </select>
          </div>
          <button
            type="submit"
            className="border border-cirta-gold/45 bg-cirta-gold/12 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em]"
          >
            Enregistrer
          </button>
        </form>
      </section>

      {SIMPLE_TEXT_SECTIONS.map((section) => (
        <section
          key={section.title}
          className="rounded-xl border border-cirta-brown/10 bg-white/90 p-6 shadow-sm md:p-8"
        >
          <h2 className="font-serif text-xl font-medium text-cirta-brown">{section.title}</h2>
          {section.description ? (
            <p className="mt-2 text-sm text-cirta-brown/55">{section.description}</p>
          ) : null}
          <ul className="mt-8 space-y-8">
            {section.keys.map((key) => (
              <li key={key}>
                <form action={saveSiteSetting} className="space-y-2">
                  <label className="block text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-cirta-brown/50">
                    {SIMPLE_TEXT_LABELS[key] ?? key}
                    <span className="ml-2 font-mono font-normal normal-case tracking-normal text-cirta-brown/35">
                      ({key})
                    </span>
                  </label>
                  <textarea
                    name="value"
                    rows={textareaRows(key)}
                    defaultValue={byKey[key] ?? ""}
                    className="w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm leading-relaxed"
                  />
                  <input type="hidden" name="key" value={key} />
                  <button
                    type="submit"
                    className="border border-cirta-gold/45 bg-cirta-gold/10 px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em]"
                  >
                    Enregistrer
                  </button>
                </form>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="rounded-xl border border-cirta-brown/10 bg-white/90 p-6 shadow-sm md:p-8">
        <h2 className="font-serif text-xl font-medium text-cirta-brown">Contact</h2>
        <p className="mt-2 text-sm text-cirta-brown/58">
          L’introduction s’affiche en français sur la vitrine ; les autres langues gardent les textes
          intégrés au code. Les libellés du formulaire ci-dessous remplacent la version française uniquement
          (champs vides = texte par défaut du site).
        </p>

        <div className="mt-8 border-t border-cirta-brown/10 pt-8">
          <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-cirta-brown/45">
            Texte d’introduction (colonne gauche)
          </h3>
          <form action={saveSiteSetting} className="mt-4 space-y-2">
            <textarea
              name="value"
              rows={4}
              defaultValue={byKey.contact_intro ?? ""}
              className="w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm leading-relaxed"
            />
            <input type="hidden" name="key" value="contact_intro" />
            <button
              type="submit"
              className="border border-cirta-gold/45 bg-cirta-gold/10 px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em]"
            >
              Enregistrer l’intro
            </button>
          </form>
        </div>

        <div className="mt-10 border-t border-cirta-brown/10 pt-8">
          <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-cirta-brown/45">
            Formulaire — libellés & messages (français)
          </h3>
          <form action={saveContactCmsBlock} className="mt-6 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {CONTACT_CMS_FIELD_META.map((field) => (
                <div key={field.name} className="space-y-1.5">
                  <label
                    htmlFor={field.name}
                    className="block text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-cirta-brown/50"
                  >
                    {field.label}
                    <span className="ml-1.5 font-mono text-[0.6rem] font-normal normal-case text-cirta-brown/35">
                      {field.name}
                    </span>
                  </label>
                  <textarea
                    id={field.name}
                    name={field.name}
                    rows={field.rows}
                    defaultValue={byKey[field.name] ?? ""}
                    placeholder="Laisser vide pour le texte par défaut"
                    className="w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm leading-relaxed"
                  />
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="border border-cirta-gold/50 bg-cirta-gold/15 px-5 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.12em]"
            >
              Enregistrer tout le formulaire
            </button>
          </form>
        </div>
      </section>

      {orphanRows.length > 0 ? (
        <section className="rounded-xl border border-amber-900/15 bg-amber-50/80 p-6">
          <h2 className="font-serif text-lg font-medium text-cirta-brown">Autres clés en base</h2>
          <p className="mt-2 text-sm text-cirta-brown/60">
            Clés présentes en base mais non classées ci-dessus (migration ou ancien test).
          </p>
          <ul className="mt-6 space-y-6">
            {orphanRows.map((s) => (
              <li key={s.key}>
                <form action={saveSiteSetting} className="space-y-2">
                  <label className="block text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-cirta-brown/50">
                    {s.key}
                  </label>
                  <textarea
                    name="value"
                    rows={3}
                    defaultValue={s.value}
                    className="w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm"
                  />
                  <input type="hidden" name="key" value={s.key} />
                  <button
                    type="submit"
                    className="border border-cirta-brown/20 px-4 py-1.5 text-[0.65rem] font-semibold uppercase"
                  >
                    Enregistrer
                  </button>
                </form>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {rows.length === 0 ? (
        <p className="text-sm text-cirta-brown/55">
          Exécutez le seed pour initialiser les clés :{" "}
          <code className="font-mono text-xs">npx prisma db seed</code>
        </p>
      ) : null}
        </>
      ) : null}
    </div>
  );
}
