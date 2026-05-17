import { deleteFaqChatEntry, saveFaqChatEntry } from "@/app/admin/_actions";
import { ConfirmDeleteForm } from "@/components/admin/ConfirmDeleteForm";
import { prisma } from "@/lib/prisma";

export default async function AdminFaqPage() {
  const entries = await prisma.faqChatEntry.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="max-w-3xl">
      <h1 className="font-serif text-3xl font-medium tracking-tight text-cirta-brown">FAQ — widget chat</h1>
      <p className="mt-2 text-sm leading-relaxed text-cirta-brown/60">
        Ces paires question / réponse alimentent le petit module « ? » en bas à droite du site public. Les
        entrées désactivées n’apparaissent pas dans le chat.
      </p>

      <ul className="mt-10 space-y-8">
        {entries.map((e) => (
          <li
            key={e.id}
            className="border border-cirta-brown/10 bg-white/80 p-5 shadow-sm"
          >
            <form action={saveFaqChatEntry} className="space-y-3">
              <input type="hidden" name="id" value={e.id} />
              <div className="space-y-1">
                <label className="block text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-cirta-brown/45">
                  Question
                </label>
                <input
                  name="question"
                  required
                  defaultValue={e.question}
                  className="w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-cirta-brown/45">
                  Réponse
                </label>
                <textarea
                  name="answer"
                  required
                  rows={5}
                  defaultValue={e.answer}
                  className="w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm leading-relaxed"
                />
              </div>
              <div className="flex flex-wrap items-end gap-4">
                <div className="space-y-1">
                  <label className="block text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-cirta-brown/45">
                    Ordre
                  </label>
                  <input
                    name="sortOrder"
                    type="number"
                    defaultValue={e.sortOrder}
                    className="w-24 border border-cirta-brown/15 bg-white px-2 py-1.5 text-sm"
                  />
                </div>
                <label className="flex cursor-pointer items-center gap-2 text-sm text-cirta-brown/75">
                  <input
                    type="checkbox"
                    name="enabled"
                    value="true"
                    defaultChecked={e.enabled}
                  />
                  Visible dans le chat
                </label>
              </div>
              <div className="pt-1">
                <button
                  type="submit"
                  className="border border-cirta-gold/45 bg-cirta-gold/12 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.1em]"
                >
                  Enregistrer
                </button>
              </div>
            </form>
            <div className="flex flex-wrap gap-2 border-t border-cirta-brown/8 pt-3">
              <ConfirmDeleteForm
                action={deleteFaqChatEntry}
                confirmMessage={`Supprimer la question « ${e.question.slice(0, 48)}${e.question.length > 48 ? "…" : ""} » ?`}
              >
                <input type="hidden" name="id" value={e.id} />
                <button
                  type="submit"
                  className="border border-red-900/25 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-red-900/85"
                >
                  Supprimer
                </button>
              </ConfirmDeleteForm>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-12 border-t border-cirta-brown/10 pt-8">
        <h2 className="font-serif text-xl text-cirta-brown">Nouvelle entrée</h2>
        <form action={saveFaqChatEntry} className="mt-4 max-w-xl space-y-3">
          <div className="space-y-1">
            <label className="block text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-cirta-brown/45">
              Question
            </label>
            <input name="question" required className="w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm" />
          </div>
          <div className="space-y-1">
            <label className="block text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-cirta-brown/45">
              Réponse
            </label>
            <textarea
              name="answer"
              required
              rows={4}
              className="w-full border border-cirta-brown/15 bg-white px-3 py-2 text-sm"
            />
          </div>
          <input name="sortOrder" type="hidden" value={entries.length} />
          <label className="flex items-center gap-2 text-sm text-cirta-brown/75">
            <input type="checkbox" name="enabled" value="true" defaultChecked />
            Visible dans le chat
          </label>
          <button
            type="submit"
            className="border border-cirta-brown/20 bg-cirta-black/[0.03] px-5 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em]"
          >
            Créer
          </button>
        </form>
      </div>
    </div>
  );
}
