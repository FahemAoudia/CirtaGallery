import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [products, ribbons, facets, featured, subscribers] = await Promise.all([
    prisma.product.count(),
    prisma.ribbon.count(),
    prisma.facet.count(),
    prisma.featuredPiece.count(),
    prisma.subscriber.count(),
  ]);

  const cards = [
    { label: "Produits publiés", value: products, href: "/admin/products" },
    { label: "Rayons", value: ribbons, href: "/admin/ribbons" },
    { label: "Catégories (facettes)", value: facets, href: "/admin/facets" },
    { label: "Mises en avant (salon)", value: featured, href: "/admin/featured" },
    { label: "Abonnés", value: subscribers, href: "/admin/subscribers" },
  ];

  return (
    <div className="max-w-5xl">
      <h1 className="admin-page-title">Tableau de bord</h1>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-cirta-brown/65">
        Gérez le catalogue, les filtres, les textes et consultez les inscriptions newsletter / PayPal.
        Les modifications sont visibles sur la page d’accueil après enregistrement.
      </p>
      <ul className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 lg:grid-cols-3">
        {cards.map((c) => (
          <li key={c.href}>
            <Link
              href={c.href}
              className="admin-card block p-4 transition hover:border-cirta-gold/35 hover:shadow-[0_16px_40px_-28px_rgba(0,0,0,0.35)] sm:p-6"
            >
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-cirta-brown/45">
                {c.label}
              </p>
              <p className="mt-1.5 font-serif text-2xl text-cirta-brown tabular-nums sm:mt-2 sm:text-3xl">{c.value}</p>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-col gap-2 sm:mt-10 sm:flex-row sm:flex-wrap">
        <Link href="/admin/sections" className="admin-btn-primary w-full sm:w-auto">
          Blocs page d’accueil
        </Link>
        <Link
          href="/admin/settings"
          className="touch-target inline-flex w-full items-center justify-center border border-cirta-brown/20 px-5 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-cirta-brown transition hover:border-cirta-gold hover:text-cirta-gold-dim sm:w-auto"
        >
          Contenu du site
        </Link>
      </div>
    </div>
  );
}
