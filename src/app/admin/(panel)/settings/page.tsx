import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { purgeOrphanContactSettings, saveContactInfo, saveSiteSetting } from "@/app/admin/_actions";
import { DEFAULT_CONTACT_EMAIL_SUBJECT, SITE_CONTACT } from "@/lib/site-contact";
import { getAdminCookieName, verifyAdminJwt, type AdminRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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
  if (token) {
    try {
      const p = await verifyAdminJwt(token);
      role = p.role;
    } catch {
      /* middleware normalement déjà passé */
    }
  }
  if (role === "MODERATOR") {
    redirect("/admin/moderators");
  }

  const rows = await prisma.siteSetting.findMany({ orderBy: { key: "asc" } });
  const byKey = Object.fromEntries(rows.map((r) => [r.key, r.value])) as Record<string, string>;
  const teaserOn = (byKey.collection_teasers_visible ?? "1") !== "0";

  const usedKeys = new Set<string>([
    "collection_teasers_visible",
    "contact_intro",
    "contact_heading",
    "contact_email",
    "contact_phone_display",
    "contact_phone_e164",
    "contact_address",
    "contact_email_subject",
    ...SIMPLE_TEXT_SECTIONS.flatMap((s) => s.keys),
  ]);
  const orphanRows = rows.filter((r) => !usedKeys.has(r.key));

  return (
    <div className="min-w-0 space-y-10">
      <header>
        <h1 className="admin-page-title">Contenu du site</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-cirta-brown/60">
          Textes d’accueil, bandeau « Notre collection », coordonnées et textes de la section Contact. L’ordre des grandes
          zones :{" "}
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
          . Comptes et mots de passe :{" "}
          <Link
            href="/admin/moderators"
            className="font-medium text-cirta-brown underline-offset-2 hover:underline"
          >
            Équipe & accès
          </Link>
          .
        </p>
      </header>

      <section className="min-w-0 overflow-hidden rounded-xl border border-cirta-brown/10 bg-white/90 p-4 shadow-sm sm:p-6 md:p-8">
        <h2 className="font-serif text-xl font-medium text-cirta-brown">Bandeau « Notre collection »</h2>
        <p className="mt-2 text-sm text-cirta-brown/58">
          Miniatures sous le titre du hero : purement décoratives. Les fichiers se gèrent par rayon
          (image dédiée, indépendante des fiches produit).
        </p>
        <form action={saveSiteSetting} className="mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
          <input type="hidden" name="key" value="collection_teasers_visible" />
          <div className="min-w-0 w-full space-y-1 sm:max-w-md sm:flex-1">
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
              className="admin-select w-full min-w-0 max-w-full border border-cirta-brown/15 bg-white px-3 py-2.5 text-sm"
            >
              <option value="1">Photos visibles sous chaque rayon</option>
              <option value="0">Photos masquées (titres / liens seuls)</option>
            </select>
            <p className="text-[0.65rem] leading-snug text-cirta-brown/45 sm:hidden">
              {teaserOn ? "Afficher les photos sous chaque rayon" : "Masquer les photos (titres / liens uniquement)"}
            </p>
          </div>
          <button
            type="submit"
            className="admin-btn-primary w-full shrink-0 sm:w-auto"
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
          Textes de la colonne gauche, coordonnées affichées (courriel, téléphone, adresse) et objet des
          e-mails reçus via le formulaire.{" "}
          <strong className="font-medium text-cirta-brown/75">
            Champs vides = rien sur la vitrine
          </strong>{" "}
          (les exemples grisés dans les champs sont indicatifs uniquement).
        </p>

        <form action={saveContactInfo} className="mt-8 space-y-6">
          <div className="space-y-1.5">
            <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-cirta-brown/50">
              Titre principal (colonne gauche)
            </label>
            <textarea
              name="contact_heading"
              rows={2}
              defaultValue={byKey.contact_heading ?? ""}
              placeholder="Réserver une pièce, un passage au salon ou une expertise"
              className="w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm leading-relaxed"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-cirta-brown/50">
              Texte d’introduction (sous le titre)
            </label>
            <textarea
              name="contact_intro"
              rows={3}
              defaultValue={byKey.contact_intro ?? ""}
              placeholder="Une réponse sous trois jours ouvrés. Les rendez-vous sur place se réservent après échange d’emails."
              className="w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm leading-relaxed"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-cirta-brown/50">
                Courriel affiché
              </label>
              <input
                name="contact_email"
                type="email"
                defaultValue={byKey.contact_email ?? ""}
                placeholder={SITE_CONTACT.email}
                className="w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-cirta-brown/50">
                Téléphone (affichage)
              </label>
              <input
                name="contact_phone_display"
                defaultValue={byKey.contact_phone_display ?? ""}
                placeholder={SITE_CONTACT.phoneDisplay}
                className="w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-cirta-brown/50">
              Téléphone (chiffres, WhatsApp / appel)
            </label>
            <input
              name="contact_phone_e164"
              defaultValue={byKey.contact_phone_e164 ?? ""}
              placeholder={SITE_CONTACT.phoneE164Digits}
              className="w-full max-w-xs border border-cirta-brown/15 bg-white px-3 py-2 text-sm font-mono"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-cirta-brown/50">
              Adresse (une ligne par rangée)
            </label>
            <textarea
              name="contact_address"
              rows={5}
              defaultValue={byKey.contact_address ?? ""}
              placeholder={SITE_CONTACT.addressLines.join("\n")}
              className="w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm leading-relaxed"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-cirta-brown/50">
              Objet de l’e-mail (formulaire)
            </label>
            <input
              name="contact_email_subject"
              defaultValue={byKey.contact_email_subject ?? ""}
              placeholder={DEFAULT_CONTACT_EMAIL_SUBJECT}
              className="w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm"
            />
            <p className="text-[0.68rem] text-cirta-brown/45">
              Utilisez <span className="font-mono">{"{name}"}</span> pour le nom de l’expéditeur.
            </p>
          </div>
          <button
            type="submit"
            className="border border-cirta-gold/50 bg-cirta-gold/15 px-5 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.12em]"
          >
            Enregistrer le contact
          </button>
        </form>
      </section>

      {orphanRows.length > 0 ? (
        <section className="rounded-xl border border-amber-900/15 bg-amber-50/80 p-6">
          <h2 className="font-serif text-lg font-medium text-cirta-brown">Autres clés en base</h2>
          <p className="mt-2 text-sm text-cirta-brown/60">
            Clés présentes en base mais non classées ci-dessus (migration ou ancien test). Les anciennes
            clés <span className="font-mono">contact_ui_*</span> peuvent être retirées en un clic.
          </p>
          <form action={purgeOrphanContactSettings} className="mt-4">
            <button
              type="submit"
              className="border border-amber-900/25 bg-white px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-cirta-brown"
            >
              Supprimer les clés contact obsolètes
            </button>
          </form>
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
    </div>
  );
}
