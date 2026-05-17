import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  collection,
  featuredPieces,
  ribbonLabels,
  sidebarFacets,
} from "../src/lib/collection";
import { HOME_SECTION_DEFINITIONS } from "../src/lib/home-sections";

const dbUrl =
  process.env.DATABASE_URL ??
  process.env.STORAGE_POSTGRES_PRISMA_URL ??
  process.env.POSTGRES_PRISMA_URL ??
  process.env.STORAGE_DATABASE_URL ??
  process.env.POSTGRES_URL;

const prisma = new PrismaClient(
  dbUrl ? { datasources: { db: { url: dbUrl } } } : undefined,
);

async function main() {
  const adminEmail =
    process.env.ADMIN_EMAIL?.trim().toLowerCase() || "visionaffaire1@gmail.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "CirtaAdmin2026!";

  const hash = await bcrypt.hash(adminPassword, 12);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    create: { email: adminEmail, passwordHash: hash, role: "ADMIN" },
    update: { passwordHash: hash, role: "ADMIN" },
  });

  const moderatorEmail = process.env.MODERATOR_EMAIL?.trim().toLowerCase();
  const moderatorPassword = process.env.MODERATOR_PASSWORD;
  if (moderatorEmail && moderatorPassword) {
    const modHash = await bcrypt.hash(moderatorPassword, 12);
    await prisma.adminUser.upsert({
      where: { email: moderatorEmail },
      create: { email: moderatorEmail, passwordHash: modHash, role: "MODERATOR" },
      update: { passwordHash: modHash, role: "MODERATOR" },
    });
  }

  const count = await prisma.product.count();
  if (count === 0) {
    for (const r of ribbonLabels) {
      await prisma.ribbon.upsert({
        where: { id: r.id },
        create: {
          id: r.id,
          label: r.label,
          sortOrder: ribbonLabels.indexOf(r),
          teaserImage: "",
        },
        update: { label: r.label, sortOrder: ribbonLabels.indexOf(r) },
      });
    }
    for (const f of sidebarFacets) {
      await prisma.facet.upsert({
        where: { id: f.id },
        create: { id: f.id, label: f.label, sortOrder: sidebarFacets.indexOf(f) },
        update: { label: f.label, sortOrder: sidebarFacets.indexOf(f) },
      });
    }
    for (const item of collection) {
      await prisma.product.create({
        data: {
          sku: item.id,
          title: item.title,
          histoire: "",
          period: item.period,
          origin: item.origin,
          medium: item.medium,
          image: item.image,
          width: item.width,
          height: item.height,
          ribbonKey: item.ribbon,
          facetsJson: JSON.stringify(item.facets),
          priceCad: item.priceCad,
          sortOrder: collection.indexOf(item),
          published: true,
        },
      });
    }
    for (const piece of featuredPieces) {
      await prisma.featuredPiece.upsert({
        where: { id: piece.id },
        create: {
          id: piece.id,
          catalogRef: piece.catalogRef,
          title: piece.title,
          description: piece.description,
          meta: piece.meta,
          image: piece.image,
          width: piece.width,
          height: piece.height,
          sortOrder: featuredPieces.indexOf(piece),
        },
        update: {
          catalogRef: piece.catalogRef,
          title: piece.title,
          description: piece.description,
          meta: piece.meta,
          image: piece.image,
          width: piece.width,
          height: piece.height,
          sortOrder: featuredPieces.indexOf(piece),
        },
      });
    }
  }

  const defaults: Record<string, string> = {
    catalog_intro:
      "Douze directions — de la porcelaine au manuscrit — à parcourir comme les vitrines d’une galerie silencieuse. Filtrez par famille ou cherchez un mot : dynastie, ville, matière.",
    featured_kicker: "La traverse des empires",
    featured_title:
      "Trois pièces où se mêlent la Chine des fours, le geste du moine et le bruit des pièces anciennes.",
    featured_aside:
      "Comme dans un journal d’exposition : grandes surfaces d’images, texte mesuré, silence autour des œuvres. Ici, la marchandise reste poétique.",
    about_kicker: "Qui nous sommes",
    about_heading:
      "Un magasin de curiosités dignes des plus beaux cabinets d’amateurs.",
    about_p1:
      "Nous achetons lentement, au fil des ventes privées et des maisons fermées. Chaque objet doit pouvoir raconter sa route—mer Caspienne, Caraïbes hispaniques, caravanes du Hoggar—sans tricher sur la patine ni sur la matière.",
    about_p2:
      "Cirta Gallery relie Constantine ancienne à Paris, entre bureau d’expertise et vitrine chaleureuse. Ici, une assiette de Sèvres dialogue avec une lampe de Bohême ; un dragon laqué répond à un buste espagnol.",
    about_quote_ar:
      "« نختار التحف كما يُختار صديق قديم : ببطء، وبحبٍّ للتفاصيل، وباحترام لكل الأراضي التي مرت بها. »",
    contact_intro:
      "Une réponse sous trois jours ouvrés. Les rendez-vous sur place se réservent après échange d’emails.",
    collection_teasers_visible: "1",
  };

  for (const [key, value] of Object.entries(defaults)) {
    await prisma.siteSetting.upsert({
      where: { key },
      create: { key, value },
      update: {},
    });
  }

  for (let i = 0; i < HOME_SECTION_DEFINITIONS.length; i++) {
    const def = HOME_SECTION_DEFINITIONS[i];
    await prisma.homeSection.upsert({
      where: { sectionKey: def.key },
      create: {
        sectionKey: def.key,
        label: def.label,
        sortOrder: i,
        enabled: true,
      },
      update: {},
    });
  }

  for (const item of collection) {
    await prisma.product.updateMany({
      where: { sku: item.id },
      data: { priceCad: item.priceCad },
    });
  }

  const faqCount = await prisma.faqChatEntry.count();
  if (faqCount === 0) {
    await prisma.faqChatEntry.createMany({
      data: [
        {
          question: "Proposez-vous la livraison ?",
          answer:
            "Oui : nous emballons chaque pièce sur mesure et proposons un envoi assuré (France & Union européenne). Les frais et délais vous sont communiqués après réservation du lot.",
          sortOrder: 0,
          enabled: true,
        },
        {
          question: "Comment se passe le paiement ?",
          answer:
            "Sur le site, le panier accepte PayPal en dollars canadiens (CAD) pour les pièces tarifées. Pour les œuvres « sur demande », nous établissons un devis et un lien ou virement selon votre pays.",
          sortOrder: 1,
          enabled: true,
        },
        {
          question: "Les objets sont-ils authentiques ?",
          answer:
            "Chaque fiche indique matière, époque et provenance d’après notre expertise. Nous restons disponibles pour tout complément documentaire ou pour organiser une seconde opinion.",
          sortOrder: 2,
          enabled: true,
        },
        {
          question: "Puis-je voir la pièce avant d’acheter ?",
          answer:
            "Les rendez-vous sur rendez-vous sont possibles à Paris après échange d’emails. Nous pouvons aussi préparer des plans rapprochés ou une visio pour les collectionneurs loin de la capitale.",
          sortOrder: 3,
          enabled: true,
        },
      ],
    });
  }

  await prisma.product.updateMany({
    where: { sku: "CG-01" },
    data: {
      histoire:
        "Ce vase illustre la continuité entre les ateliers exportateurs chinois et le goût européen du XIXᵉ siècle. Le paysage lacustre, peint au cobalt sous couverte, reprend les codes des porcelaines de présentation tout en gardant une liberté graphique propre aux commandes d’exportation. Les nuances de bleu et la couronne du col témoignent d’une cuisson maîtrisée.",
    },
  });

  const histoireBySku: Record<string, string> = {
    "CG-02":
      "Figure de Maitreya dans la continuité des ateliers de vallée : sourire étroit, épaules tombantes, drapé minéral. La dorure à la feuille et les rehauts de pigment rappellent les allers-retours entre rituel monastique et commande laïque.",
    "CG-03":
      "Fragment de mobilier ou de brûle-parfum : serres crispées, écailles stylisées, patine verte qui adoucit le métal. Idéal pour une vitrine de matière — entre pierre et bronze — où l’on aime les silhouettes animales résumées en quelques cm.",
    "CG-04":
      "Vase de cabinet où le cheval devient motif principal : traits rapides au cobalt, glaçure légèrement granuleuse, pied stable pour une étagère de collection. Une pièce pour amateurs de céramique narrative, entre Chine de commande et goût européen.",
    "CG-05":
      "Santo novohispano : bois doré, visage expressif, traces d’estofado sous la patine des siècles. La sculpture populaire mexicaine offre ici un contrepoint chaleureux aux porcelaines du même salon.",
    "CG-06":
      "Buste ibérique au modelé vigoureux : barbe traitée en mèches, regard baissé, rehauts métalliques qui captent la lumière. Une présence de cabinet, entre chapelle domestique et bibliothèque d’amateur.",
    "CG-07":
      "Ensemble de monnaies classiques : argent et bronze, portraits impériaux, revers cultuels. Parfait pour constituer une vitrine numismatique ou compléter une collection thématique Méditerranée.",
    "CG-08":
      "Lustre bohémien à pendeloques : jeu de reflets, armature en laiton patiné, esprit Second Empire. Pour une salle à manger tamisée ou un bureau où l’on aime le bruit léger du cristal quand la maison s’endort.",
  };
  for (const [sku, histoire] of Object.entries(histoireBySku)) {
    await prisma.product.updateMany({ where: { sku }, data: { histoire } });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
