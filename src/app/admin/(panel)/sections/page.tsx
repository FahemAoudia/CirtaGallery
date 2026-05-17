import {
  addHomeSection,
  bulkSetHomeSections,
  deleteHomeSection,
  moveHomeSection,
  resetHomeSectionsToDefaults,
  setHomeSectionEnabled,
} from "@/app/admin/_actions";
import { ConfirmDeleteForm } from "@/components/admin/ConfirmDeleteForm";
import { HOME_SECTION_DEFINITIONS, homeSectionLabelForKey } from "@/lib/home-sections";
import { prisma } from "@/lib/prisma";

export default async function AdminSectionsPage() {
  const sections = await prisma.homeSection.findMany({ orderBy: { sortOrder: "asc" } });
  const present = new Set(sections.map((s) => s.sectionKey));
  const canAdd = HOME_SECTION_DEFINITIONS.filter((d) => !present.has(d.key));

  return (
    <div className="max-w-6xl">
      <h1 className="admin-page-title">
        Blocs de la page d’accueil
      </h1>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <p className="max-w-3xl text-sm leading-relaxed text-cirta-brown/60">
          Activez ou masquez chaque section, changez l’ordre d’affichage sur le site public, ou retirez un
          bloc (vous pourrez le rajouter ensuite). Les textes détaillés se règlent sous{" "}
          <span className="font-medium text-cirta-brown/75">Contenu du site</span> et le salon sous{" "}
          <span className="font-medium text-cirta-brown/75">Salon (vedettes)</span>.
        </p>
        <ConfirmDeleteForm
          action={resetHomeSectionsToDefaults}
          confirmTitle="Rétablir l’ordre par défaut"
          confirmMessage="Rétablir l’ordre et la visibilité prévus à la conception ? Tous les blocs seront présents, visibles, dans l’ordre d’origine (en-tête → catalogue → salon → à propos → contact → pied de page). Les blocs supprimés seront rajoutés."
          confirmLabel="Rétablir"
          tone="neutral"
          className="shrink-0"
        >
          <button
            type="submit"
            className="w-full rounded-sm border border-cirta-brown/20 bg-white/90 px-4 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-cirta-brown shadow-sm transition hover:border-cirta-gold/50 hover:bg-cirta-gold/10 sm:w-auto"
          >
            Par défaut (ordre concepteur)
          </button>
        </ConfirmDeleteForm>
      </div>

      {sections.length > 0 ? (
        <p className="mt-6 text-sm text-cirta-brown/55">
          Cochez une ou plusieurs cartes puis utilisez{" "}
          <span className="font-medium text-cirta-brown/70">Masquer la sélection</span> ou{" "}
          <span className="font-medium text-cirta-brown/70">Afficher la sélection</span>. Chaque carte
          propose aussi Masquer / Afficher pour un seul bloc. Le bouton{" "}
          <span className="font-medium text-cirta-brown/70">Par défaut (ordre concepteur)</span> ci-dessus
          rétablit l’ordre et la visibilité d’origine sans toucher aux textes du site.
        </p>
      ) : null}

      {sections.length > 0 ? (
        <section className="mt-10" aria-labelledby="active-blocks-heading">
          <h2 id="active-blocks-heading" className="sr-only">
            Blocs actifs
          </h2>
          <form
            id="home-sections-bulk"
            action={bulkSetHomeSections}
            className="mb-6 flex flex-col gap-3 rounded-sm border border-cirta-brown/12 bg-cirta-black/[0.02] p-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between"
          >
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.12em] text-cirta-brown/50">
              Sélection multiple
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="submit"
                name="intent"
                value="hide"
                className="rounded-sm border border-cirta-brown/20 bg-white/80 px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-cirta-brown transition hover:border-cirta-gold/45"
              >
                Masquer la sélection
              </button>
              <button
                type="submit"
                name="intent"
                value="show"
                className="rounded-sm border border-cirta-gold/45 bg-cirta-gold/12 px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-cirta-brown transition hover:bg-cirta-gold/20"
              >
                Afficher la sélection
              </button>
            </div>
          </form>
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {sections.map((s, i) => (
              <li key={s.id}>
                <article
                  className={`flex h-full flex-col rounded-sm border p-5 shadow-sm transition ${
                    s.enabled
                      ? "border-cirta-brown/12 bg-white/85"
                      : "border-cirta-brown/10 bg-cirta-black/[0.03] opacity-[0.88]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 flex-1 gap-3">
                      <div className="flex shrink-0 flex-col items-center pt-0.5">
                        <input
                          id={`section-check-${s.id}`}
                          type="checkbox"
                          name="ids"
                          value={s.id}
                          form="home-sections-bulk"
                          className="h-4 w-4 rounded border-cirta-brown/30 text-cirta-brown accent-cirta-brown"
                        />
                        <label
                          htmlFor={`section-check-${s.id}`}
                          className="mt-1 max-w-[3.5rem] text-center text-[0.58rem] font-semibold uppercase leading-tight tracking-[0.06em] text-cirta-brown/45"
                        >
                          Sélect.
                        </label>
                      </div>
                      <div className="min-w-0">
                      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-cirta-brown/40">
                        Ordre · {i + 1}
                      </p>
                      <h3 className="mt-1 font-serif text-lg font-medium tracking-tight text-cirta-brown">
                        {homeSectionLabelForKey(s.sectionKey)}
                      </h3>
                      <p className="mt-1 font-mono text-[0.65rem] text-cirta-brown/38">{s.sectionKey}</p>
                      </div>
                    </div>
                    <span
                      className={`shrink-0 rounded-full border px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.1em] ${
                        s.enabled
                          ? "border-cirta-gold/45 bg-cirta-gold/12 text-cirta-brown"
                          : "border-cirta-brown/15 bg-cirta-brown/[0.06] text-cirta-brown/55"
                      }`}
                    >
                      {s.enabled ? "Visible" : "Masquée"}
                    </span>
                  </div>
                  <p className="mt-3 pl-[2.75rem] text-[0.72rem] leading-relaxed text-cirta-brown/50">
                    {s.enabled
                      ? "Affichée sur la page d’accueil publique."
                      : "Non affichée sur le site ; le bloc reste configurable ici."}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2 border-t border-cirta-brown/10 pt-4">
                    <form action={moveHomeSection}>
                      <input type="hidden" name="id" value={s.id} />
                      <input type="hidden" name="dir" value="up" />
                      <button
                        type="submit"
                        disabled={i === 0}
                        className="rounded-sm border border-cirta-brown/15 px-2.5 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.08em] transition hover:border-cirta-gold/40 disabled:cursor-not-allowed disabled:opacity-35"
                      >
                        Monter
                      </button>
                    </form>
                    <form action={moveHomeSection}>
                      <input type="hidden" name="id" value={s.id} />
                      <input type="hidden" name="dir" value="down" />
                      <button
                        type="submit"
                        disabled={i === sections.length - 1}
                        className="rounded-sm border border-cirta-brown/15 px-2.5 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.08em] transition hover:border-cirta-gold/40 disabled:cursor-not-allowed disabled:opacity-35"
                      >
                        Descendre
                      </button>
                    </form>
                    <form action={setHomeSectionEnabled}>
                      <input type="hidden" name="id" value={s.id} />
                      <input type="hidden" name="enabled" value={s.enabled ? "false" : "true"} />
                      <button
                        type="submit"
                        className="rounded-sm border border-cirta-gold/45 bg-cirta-gold/12 px-2.5 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-cirta-brown transition hover:bg-cirta-gold/20"
                      >
                        {s.enabled ? "Masquer" : "Afficher"}
                      </button>
                    </form>
                    <ConfirmDeleteForm
                      action={deleteHomeSection}
                      confirmMessage={`Supprimer le bloc « ${homeSectionLabelForKey(s.sectionKey)} » de la page d’accueil ?`}
                    >
                      <input type="hidden" name="id" value={s.id} />
                      <button
                        type="submit"
                        className="rounded-sm border border-red-900/25 px-2.5 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-red-900/85 transition hover:bg-red-900/[0.04]"
                      >
                        Supprimer
                      </button>
                    </ConfirmDeleteForm>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {canAdd.length > 0 ? (
        <section
          className={`${sections.length > 0 ? "mt-14 border-t border-cirta-brown/10 pt-12" : "mt-10"}`}
          aria-labelledby="add-blocks-heading"
        >
          <h2 id="add-blocks-heading" className="font-serif text-xl text-cirta-brown">
            {sections.length > 0 ? "Ajouter un autre bloc" : "Ajouter des blocs"}
          </h2>
          <p className="mt-1 text-sm text-cirta-brown/55">
            Chaque type de section ne peut exister qu’une fois. Choisissez une carte pour l’ajouter à la
            page.
          </p>
          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {canAdd.map((d) => (
              <li key={d.key}>
                <article className="flex h-full flex-col rounded-sm border border-dashed border-cirta-brown/20 bg-cirta-black/[0.02] p-5">
                  <h3 className="font-serif text-lg font-medium tracking-tight text-cirta-brown">
                    {d.label}
                  </h3>
                  <p className="mt-1 font-mono text-[0.65rem] text-cirta-brown/38">{d.key}</p>
                  <p className="mt-3 flex-1 text-[0.72rem] leading-relaxed text-cirta-brown/48">
                    {sections.length > 0
                      ? "Pas encore ajouté. Après ajout, il apparaît dans la grille avec les autres blocs."
                      : "Pas encore ajouté. Après ajout, vous pourrez l’ordonner, le masquer ou l’afficher depuis la grille."}
                  </p>
                  <form action={addHomeSection} className="mt-4">
                    <input type="hidden" name="sectionKey" value={d.key} />
                    <button
                      type="submit"
                      className="w-full rounded-sm border border-cirta-brown/20 bg-white/80 px-4 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-cirta-brown transition hover:border-cirta-gold/50 hover:bg-cirta-gold/8"
                    >
                      Ajouter ce bloc
                    </button>
                  </form>
                </article>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <p className="mt-10 text-sm text-cirta-brown/50">Tous les types de blocs sont déjà présents.</p>
      )}
    </div>
  );
}
