import { prisma } from "@/lib/prisma";

export default async function AdminSubscribersPage() {
  const rows = await prisma.subscriber.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="max-w-5xl">
      <h1 className="font-serif text-3xl font-medium tracking-tight">Abonnés</h1>
      <p className="mt-2 text-sm text-cirta-brown/60">
        Inscriptions gratuites (newsletter) et paiements PayPal enregistrés après capture réussie.
      </p>
      <div className="mt-8 overflow-x-auto border border-cirta-brown/10">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-cirta-brown/10 bg-cirta-black/[0.03] text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-cirta-brown/50">
            <tr>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Nom</th>
              <th className="px-4 py-3">Tél.</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">PayPal</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cirta-brown/8">
            {rows.map((s) => (
              <tr key={s.id} className="text-cirta-brown/85">
                <td className="px-4 py-3 font-mono text-xs">{s.email}</td>
                <td className="px-4 py-3">{s.name ?? "—"}</td>
                <td className="px-4 py-3 font-mono text-xs">{s.phone ?? "—"}</td>
                <td className="px-4 py-3">{s.source}</td>
                <td className="px-4 py-3 font-mono text-[0.65rem]">{s.paypalOrderId ?? "—"}</td>
                <td className="px-4 py-3 text-cirta-brown/55">{s.createdAt.toISOString().slice(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {rows.length === 0 ? (
        <p className="mt-6 text-sm text-cirta-brown/55">Aucun abonné pour le moment.</p>
      ) : null}
    </div>
  );
}
