"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminCookieName, verifyAdminJwt, type AdminJwtPayload } from "@/lib/auth";
import { HOME_SECTION_DEFINITIONS, homeSectionLabelForKey } from "@/lib/home-sections";
import {
  persistSiteSettingI18n,
  persistSiteSettingsI18nBatch,
  translateFrenchFields,
  translationSucceeded,
} from "@/lib/auto-translate";
import {
  CONTACT_INFO_KEYS,
  LEGACY_CONTACT_SETTING_PREFIXES,
} from "@/lib/contact-settings";
import { siteI18nStorageKey } from "@/lib/content-i18n";
import { serializeEntityI18n } from "@/lib/content-i18n";
import { setAdminFlashMessage } from "@/lib/admin-flash";
import { prisma } from "@/lib/prisma";
import {
  parseProductImagesFromForm,
  primaryCatalogImage,
  serializeProductImages,
} from "@/lib/product-images";

const ADMIN_PASSWORD_MIN_LENGTH = 10;

async function requireStaff(): Promise<AdminJwtPayload> {
  const token = (await cookies()).get(getAdminCookieName())?.value;
  if (!token) {
    throw new Error("Non autorisé");
  }
  return verifyAdminJwt(token);
}

async function requirePrimaryAdmin(): Promise<AdminJwtPayload> {
  const session = await requireStaff();
  if (session.role !== "ADMIN") {
    await setAdminFlashMessage("Cette action est réservée à l’administrateur principal.");
    redirect("/admin/moderators");
  }
  return session;
}

function parseFacets(raw: string): string[] {
  return raw
    .split(/[,\s]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

async function flashAfterSave(baseMsg: string, translated: boolean) {
  await setAdminFlashMessage(
    translated ? `${baseMsg} — traductions EN / ES / ZH mises à jour.` : baseMsg,
  );
}

async function tryPersistEntityTranslations(
  table: "product" | "featuredPiece" | "faqChatEntry" | "ribbon" | "facet",
  id: string,
  fields: Record<string, string>,
): Promise<boolean> {
  try {
    const pack = await translateFrenchFields(fields);
    if (!translationSucceeded(pack)) return false;
    const json = serializeEntityI18n(pack);
    if (table === "product") {
      await prisma.product.update({ where: { id }, data: { translationsJson: json } });
    } else if (table === "featuredPiece") {
      await prisma.featuredPiece.update({ where: { id }, data: { translationsJson: json } });
    } else if (table === "faqChatEntry") {
      await prisma.faqChatEntry.update({ where: { id }, data: { translationsJson: json } });
    } else if (table === "ribbon") {
      await prisma.ribbon.update({ where: { id }, data: { translationsJson: json } });
    } else {
      await prisma.facet.update({ where: { id }, data: { translationsJson: json } });
    }
    return true;
  } catch {
    return false;
  }
}

export async function saveProduct(formData: FormData) {
  await requireStaff();
  const id = formData.get("id") as string | null;
  const sku = String(formData.get("sku") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  if (!sku || !title) {
    throw new Error("SKU et titre obligatoires");
  }
  const period = String(formData.get("period") ?? "").trim();
  const origin = String(formData.get("origin") ?? "").trim();
  const medium = String(formData.get("medium") ?? "").trim();
  const depth = String(formData.get("depth") ?? "").trim();
  const weight = String(formData.get("weight") ?? "").trim();
  const hauteur = String(formData.get("hauteur") ?? "").trim();
  const histoire = String(formData.get("histoire") ?? "").trim();
  const width = Number(formData.get("width")) || 880;
  const height = Number(formData.get("height")) || 1100;
  const imageEntries = parseProductImagesFromForm(formData, width, height);
  if (imageEntries.length === 0) {
    throw new Error("Ajoutez au moins une image (face avant recommandée).");
  }
  const imagesJson = serializeProductImages(imageEntries);
  const primary = primaryCatalogImage(imageEntries);
  const image = primary.image;
  const imgWidth = primary.width;
  const imgHeight = primary.height;
  const ribbonKey = String(formData.get("ribbonKey") ?? "").trim();
  const facetFromBoxes = formData
    .getAll("facetIds")
    .map((v) => String(v).trim())
    .filter(Boolean);
  const facetsJson =
    facetFromBoxes.length > 0
      ? JSON.stringify(facetFromBoxes)
      : JSON.stringify(parseFacets(String(formData.get("facets") ?? "")));
  const sortOrder = Number(formData.get("sortOrder")) || 0;
  const published = formData.get("published") === "on" || formData.get("published") === "true";
  const priceCad = Math.max(0, Number(formData.get("priceCad")) || 0);

  const productFields = {
    title,
    histoire,
    period,
    origin,
    medium,
    depth,
    weight,
    hauteur,
  };

  let productId = id;
  if (id) {
    await prisma.product.update({
      where: { id },
      data: {
        sku,
        title,
        period,
        origin,
        medium,
        depth,
        weight,
        hauteur,
        histoire,
        image,
        width: imgWidth,
        height: imgHeight,
        imagesJson,
        ribbonKey,
        facetsJson,
        sortOrder,
        published,
        priceCad,
      },
    });
  } else {
    const created = await prisma.product.create({
      data: {
        sku,
        title,
        period,
        origin,
        medium,
        depth,
        weight,
        hauteur,
        histoire,
        image,
        width: imgWidth,
        height: imgHeight,
        imagesJson,
        ribbonKey,
        facetsJson,
        sortOrder,
        published,
        priceCad,
      },
    });
    productId = created.id;
  }

  const translated =
    productId != null
      ? await tryPersistEntityTranslations("product", productId, productFields)
      : false;
  await flashAfterSave("Produit enregistré.", translated);
  revalidatePath("/");
  revalidatePath("/admin/products");
}

export async function deleteProduct(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("ID manquant");
  await prisma.product.delete({ where: { id } });
  await setAdminFlashMessage("Produit supprimé.");
  revalidatePath("/");
  revalidatePath("/admin/products");
}

export async function saveRibbon(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id") ?? "").trim();
  const label = String(formData.get("label") ?? "").trim();
  const sortOrder = Number(formData.get("sortOrder")) || 0;
  const teaserImage = String(formData.get("teaserImage") ?? "").trim();
  if (!id || !label) {
    throw new Error("Identifiant et label obligatoires");
  }
  await prisma.ribbon.upsert({
    where: { id },
    create: { id, label, sortOrder, teaserImage },
    update: { label, sortOrder, teaserImage },
  });
  const translated = await tryPersistEntityTranslations("ribbon", id, { label });
  await flashAfterSave("Rayon enregistré.", translated);
  revalidatePath("/");
  revalidatePath("/admin/ribbons");
  revalidatePath("/admin/settings");
}

export async function deleteRibbon(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id") ?? "");
  if (!id || id === "all") throw new Error("Suppression impossible");
  const used = await prisma.product.count({ where: { ribbonKey: id } });
  if (used > 0) throw new Error("Rayon utilisé par des produits.");
  await prisma.ribbon.delete({ where: { id } });
  await setAdminFlashMessage("Rayon supprimé.");
  revalidatePath("/");
  revalidatePath("/admin/ribbons");
}

export async function saveFacet(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id") ?? "").trim();
  const label = String(formData.get("label") ?? "").trim();
  const sortOrder = Number(formData.get("sortOrder")) || 0;
  if (!id || !label) {
    throw new Error("Identifiant et label obligatoires");
  }
  await prisma.facet.upsert({
    where: { id },
    create: { id, label, sortOrder },
    update: { label, sortOrder },
  });
  const translated = await tryPersistEntityTranslations("facet", id, { label });
  await flashAfterSave("Catégorie enregistrée.", translated);
  revalidatePath("/");
  revalidatePath("/admin/facets");
}

export async function deleteFacet(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id") ?? "");
  if (!id || id === "tout") throw new Error("Suppression impossible");
  const products = await prisma.product.findMany();
  for (const p of products) {
    try {
      const facets = JSON.parse(p.facetsJson) as string[];
      if (Array.isArray(facets) && facets.includes(id)) {
        throw new Error("Catégorie utilisée par un produit.");
      }
    } catch (e) {
      if (e instanceof Error && e.message.includes("utilisée")) throw e;
    }
  }
  await prisma.facet.delete({ where: { id } });
  await setAdminFlashMessage("Catégorie supprimée.");
  revalidatePath("/");
  revalidatePath("/admin/facets");
}

export async function saveFeatured(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id") ?? "").trim();
  const catalogRef = String(formData.get("catalogRef") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const meta = String(formData.get("meta") ?? "").trim();
  const image = String(formData.get("image") ?? "").trim();
  if (!image) {
    throw new Error("Image obligatoire (importez un fichier depuis votre ordinateur).");
  }
  const width = Number(formData.get("width")) || 1200;
  const height = Number(formData.get("height")) || 1500;
  const sortOrder = Number(formData.get("sortOrder")) || 0;
  if (!id || !title) throw new Error("ID et titre obligatoires");

  await prisma.featuredPiece.upsert({
    where: { id },
    create: {
      id,
      catalogRef,
      title,
      description,
      meta,
      image,
      width,
      height,
      sortOrder,
    },
    update: {
      catalogRef,
      title,
      description,
      meta,
      image,
      width,
      height,
      sortOrder,
    },
  });
  const translated = await tryPersistEntityTranslations("featuredPiece", id, {
    catalogRef,
    title,
    description,
    meta,
  });
  await flashAfterSave("Salon enregistré.", translated);
  revalidatePath("/");
  revalidatePath("/admin/featured");
}

export async function deleteFeatured(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("ID manquant");
  await prisma.featuredPiece.delete({ where: { id } });
  await setAdminFlashMessage("Élément du salon supprimé.");
  revalidatePath("/");
  revalidatePath("/admin/featured");
}

export async function saveSiteSetting(formData: FormData) {
  await requirePrimaryAdmin();
  const key = String(formData.get("key") ?? "").trim();
  const value = String(formData.get("value") ?? "");
  if (!key) throw new Error("Clé manquante");
  await prisma.siteSetting.upsert({
    where: { key },
    create: { key, value },
    update: { value },
  });
  const translated = await persistSiteSettingI18n(key, value);
  await flashAfterSave("Modification enregistrée.", translated);
  revalidatePath("/");
  revalidatePath("/admin/settings");
}

async function purgeLegacyContactSettings() {
  await prisma.siteSetting.deleteMany({
    where: {
      OR: LEGACY_CONTACT_SETTING_PREFIXES.map((prefix) => ({
        key: { startsWith: prefix },
      })),
    },
  });
}

export async function saveContactInfo(formData: FormData) {
  await requirePrimaryAdmin();
  const batch: { key: string; value: string }[] = [];
  for (const key of CONTACT_INFO_KEYS) {
    const value = String(formData.get(key) ?? "").trim();
    batch.push({ key, value });
    if (!value) {
      await prisma.siteSetting.deleteMany({ where: { key } });
      if (key === "contact_intro" || key === "contact_heading") {
        await prisma.siteSetting.deleteMany({
          where: { key: siteI18nStorageKey(key) },
        });
      }
    } else {
      await prisma.siteSetting.upsert({
        where: { key },
        create: { key, value },
        update: { value },
      });
    }
  }
  await purgeLegacyContactSettings();
  const translated = await persistSiteSettingsI18nBatch(
    batch.filter((b) => b.key === "contact_intro" || b.key === "contact_heading"),
  );
  await flashAfterSave("Coordonnées et textes contact enregistrés.", translated);
  revalidatePath("/");
  revalidatePath("/admin/settings");
}

/** Supprime les clés contact obsolètes et les __i18n__ orphelins (sans texte FR). */
export async function purgeOrphanContactSettings() {
  await requirePrimaryAdmin();
  await purgeLegacyContactSettings();
  for (const base of ["contact_intro", "contact_heading"] as const) {
    const fr = await prisma.siteSetting.findUnique({ where: { key: base } });
    if (!fr?.value?.trim()) {
      await prisma.siteSetting.deleteMany({
        where: { key: siteI18nStorageKey(base) },
      });
    }
  }
  await setAdminFlashMessage("Anciennes clés contact supprimées de la base.");
  revalidatePath("/");
  revalidatePath("/admin/settings");
}

export async function createFeatured(formData: FormData) {
  await requireStaff();
  const catalogRef = String(formData.get("catalogRef") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const meta = String(formData.get("meta") ?? "").trim();
  const image = String(formData.get("image") ?? "").trim();
  const width = Number(formData.get("width")) || 1200;
  const height = Number(formData.get("height")) || 1500;
  if (!title) throw new Error("Titre obligatoire");
  if (!image) {
    throw new Error("Image obligatoire (importez un fichier depuis votre ordinateur).");
  }
  const created = await prisma.featuredPiece.create({
    data: {
      catalogRef,
      title,
      description,
      meta,
      image,
      width,
      height,
      sortOrder: Number(formData.get("sortOrder")) || 0,
    },
  });
  const translated = await tryPersistEntityTranslations("featuredPiece", created.id, {
    catalogRef,
    title,
    description,
    meta,
  });
  await flashAfterSave("Élément du salon ajouté.", translated);
  revalidatePath("/");
  revalidatePath("/admin/featured");
}

export async function signOut() {
  const jar = await cookies();
  jar.set(getAdminCookieName(), "", { maxAge: 0, path: "/" });
  redirect("/admin/login");
}

const SECTION_KEYS = new Set<string>(HOME_SECTION_DEFINITIONS.map((d) => d.key));

export async function setHomeSectionEnabled(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id") ?? "").trim();
  const enabled = String(formData.get("enabled") ?? "") === "true";
  if (!id) throw new Error("ID manquant");
  await prisma.homeSection.update({ where: { id }, data: { enabled } });
  await setAdminFlashMessage("Bloc mis à jour.");
  revalidatePath("/");
  revalidatePath("/admin/sections");
}

/** Cases à cocher + boutons « Masquer / Afficher la sélection » (formulaire `id` + attribut `form` sur les cases). */
export async function bulkSetHomeSections(formData: FormData) {
  await requireStaff();
  const intent = String(formData.get("intent") ?? "").trim();
  if (intent !== "hide" && intent !== "show") return;
  const enabled = intent === "show";
  const ids = formData
    .getAll("ids")
    .map((v) => String(v).trim())
    .filter(Boolean);
  if (ids.length === 0) return;
  await prisma.homeSection.updateMany({
    where: { id: { in: ids } },
    data: { enabled },
  });
  await setAdminFlashMessage("Blocs mis à jour.");
  revalidatePath("/");
  revalidatePath("/admin/sections");
}

export async function moveHomeSection(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id") ?? "").trim();
  const dir = String(formData.get("dir") ?? "");
  if (!id || (dir !== "up" && dir !== "down")) return;

  const rows = await prisma.homeSection.findMany({ orderBy: { sortOrder: "asc" } });
  const idx = rows.findIndex((r) => r.id === id);
  if (idx < 0) return;
  const swap = dir === "up" ? idx - 1 : idx + 1;
  if (swap < 0 || swap >= rows.length) return;

  const a = rows[idx];
  const b = rows[swap];
  await prisma.$transaction([
    prisma.homeSection.update({ where: { id: a.id }, data: { sortOrder: b.sortOrder } }),
    prisma.homeSection.update({ where: { id: b.id }, data: { sortOrder: a.sortOrder } }),
  ]);
  await setAdminFlashMessage("Ordre des blocs mis à jour.");
  revalidatePath("/");
  revalidatePath("/admin/sections");
}

export async function deleteHomeSection(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) throw new Error("ID manquant");
  await prisma.homeSection.delete({ where: { id } });
  await setAdminFlashMessage("Bloc retiré de l’accueil.");
  revalidatePath("/");
  revalidatePath("/admin/sections");
}

export async function addHomeSection(formData: FormData) {
  await requireStaff();
  const sectionKey = String(formData.get("sectionKey") ?? "").trim();
  if (!SECTION_KEYS.has(sectionKey)) throw new Error("Bloc inconnu");

  const existing = await prisma.homeSection.findUnique({ where: { sectionKey } });
  if (existing) throw new Error("Ce bloc est déjà présent.");

  const agg = await prisma.homeSection.aggregate({ _max: { sortOrder: true } });
  const nextOrder = (agg._max.sortOrder ?? -1) + 1;

  await prisma.homeSection.create({
    data: {
      sectionKey,
      label: homeSectionLabelForKey(sectionKey),
      sortOrder: nextOrder,
      enabled: true,
    },
  });
  await setAdminFlashMessage("Bloc ajouté à l’accueil.");
  revalidatePath("/");
  revalidatePath("/admin/sections");
}

/** Tous les blocs d’accueil : ordre et libellés comme à la conception, tous visibles. Recrée les blocs supprimés. */
export async function resetHomeSectionsToDefaults() {
  await requireStaff();
  await prisma.$transaction(async (tx) => {
    await tx.homeSection.deleteMany({});
    for (let i = 0; i < HOME_SECTION_DEFINITIONS.length; i++) {
      const d = HOME_SECTION_DEFINITIONS[i];
      await tx.homeSection.create({
        data: {
          sectionKey: d.key,
          label: d.label,
          sortOrder: i,
          enabled: true,
        },
      });
    }
  });
  await setAdminFlashMessage("Ordre d’accueil rétabli (défaut).");
  revalidatePath("/");
  revalidatePath("/admin/sections");
}

export async function saveFaqChatEntry(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id") ?? "").trim();
  const question = String(formData.get("question") ?? "").trim();
  const answer = String(formData.get("answer") ?? "").trim();
  const sortOrder = Number(formData.get("sortOrder")) || 0;
  const enabled = formData.get("enabled") === "on" || formData.get("enabled") === "true";
  if (!question || !answer) {
    throw new Error("Question et réponse obligatoires");
  }
  let entryId = id;
  if (id) {
    await prisma.faqChatEntry.update({
      where: { id },
      data: { question, answer, sortOrder, enabled },
    });
  } else {
    const created = await prisma.faqChatEntry.create({
      data: { question, answer, sortOrder, enabled },
    });
    entryId = created.id;
  }
  const translated = entryId
    ? await tryPersistEntityTranslations("faqChatEntry", entryId, { question, answer })
    : false;
  await flashAfterSave("FAQ enregistrée.", translated);
  revalidatePath("/");
  revalidatePath("/admin/faq");
}

export async function deleteFaqChatEntry(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) throw new Error("ID manquant");
  await prisma.faqChatEntry.delete({ where: { id } });
  await setAdminFlashMessage("Question FAQ supprimée.");
  revalidatePath("/");
  revalidatePath("/admin/faq");
}

export async function updateAdminPassword(formData: FormData) {
  const session = await requireStaff();
  const current = String(formData.get("currentPassword") ?? "");
  const next = String(formData.get("newPassword") ?? "");
  const confirm = String(formData.get("confirmPassword") ?? "");
  if (!current || !next || !confirm) {
    await setAdminFlashMessage("Remplissez tous les champs du mot de passe.");
    redirect("/admin/moderators");
  }
  if (next !== confirm) {
    await setAdminFlashMessage("La confirmation ne correspond pas au nouveau mot de passe.");
    redirect("/admin/moderators");
  }
  if (next.length < ADMIN_PASSWORD_MIN_LENGTH) {
    await setAdminFlashMessage(
      `Le nouveau mot de passe doit contenir au moins ${ADMIN_PASSWORD_MIN_LENGTH} caractères.`,
    );
    redirect("/admin/moderators");
  }
  const user = await prisma.adminUser.findUnique({ where: { id: session.sub } });
  if (!user) {
    await setAdminFlashMessage("Compte introuvable.");
    redirect("/admin/moderators");
  }
  const ok = await bcrypt.compare(current, user.passwordHash);
  if (!ok) {
    await setAdminFlashMessage("Mot de passe actuel incorrect.");
    redirect("/admin/moderators");
  }
  const passwordHash = await bcrypt.hash(next, 12);
  await prisma.adminUser.update({ where: { id: session.sub }, data: { passwordHash } });
  await setAdminFlashMessage("Mot de passe mis à jour.");
  redirect("/admin/moderators");
}

async function createStaffAccount(
  formData: FormData,
  role: "ADMIN" | "MODERATOR",
  label: string,
) {
  await requirePrimaryAdmin();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) {
    await setAdminFlashMessage(`Email et mot de passe du ${label} sont requis.`);
    redirect("/admin/moderators");
  }
  if (password.length < ADMIN_PASSWORD_MIN_LENGTH) {
    await setAdminFlashMessage(
      `Mot de passe : au moins ${ADMIN_PASSWORD_MIN_LENGTH} caractères.`,
    );
    redirect("/admin/moderators");
  }
  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (existing) {
    await setAdminFlashMessage("Un compte existe déjà avec cet email.");
    redirect("/admin/moderators");
  }
  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.adminUser.create({
    data: { email, passwordHash, role },
  });
  await setAdminFlashMessage(`${label} ajouté : ${email}`);
  revalidatePath("/admin/moderators");
  redirect("/admin/moderators");
}

export async function createModeratorAccount(formData: FormData) {
  await createStaffAccount(formData, "MODERATOR", "Modérateur");
}

export async function createAdminAccount(formData: FormData) {
  await createStaffAccount(formData, "ADMIN", "Administrateur");
}

export async function deleteStaffAccount(formData: FormData) {
  const session = await requirePrimaryAdmin();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) {
    await setAdminFlashMessage("Identifiant manquant.");
    redirect("/admin/moderators");
  }
  if (id === session.sub) {
    await setAdminFlashMessage("Vous ne pouvez pas supprimer votre propre compte.");
    redirect("/admin/moderators");
  }
  const target = await prisma.adminUser.findUnique({ where: { id } });
  if (!target) {
    await setAdminFlashMessage("Compte introuvable.");
    redirect("/admin/moderators");
  }
  if (target.role === "ADMIN") {
    const adminCount = await prisma.adminUser.count({ where: { role: "ADMIN" } });
    if (adminCount <= 1) {
      await setAdminFlashMessage("Impossible de retirer le dernier administrateur.");
      redirect("/admin/moderators");
    }
  }
  await prisma.adminUser.delete({ where: { id } });
  await setAdminFlashMessage(
    target.role === "MODERATOR" ? "Modérateur supprimé." : "Administrateur supprimé.",
  );
  revalidatePath("/admin/moderators");
  redirect("/admin/moderators");
}

/** @deprecated Utiliser deleteStaffAccount */
export async function deleteModeratorAccount(formData: FormData) {
  return deleteStaffAccount(formData);
}

export async function resetStaffPassword(formData: FormData) {
  await requirePrimaryAdmin();
  const id = String(formData.get("id") ?? "").trim();
  const next = String(formData.get("newPassword") ?? "");
  const confirm = String(formData.get("confirmPassword") ?? "");
  if (!id || !next || !confirm) {
    await setAdminFlashMessage("Tous les champs du nouveau mot de passe sont requis.");
    redirect("/admin/moderators");
  }
  if (next !== confirm) {
    await setAdminFlashMessage("La confirmation ne correspond pas au nouveau mot de passe.");
    redirect("/admin/moderators");
  }
  if (next.length < ADMIN_PASSWORD_MIN_LENGTH) {
    await setAdminFlashMessage(
      `Le nouveau mot de passe doit contenir au moins ${ADMIN_PASSWORD_MIN_LENGTH} caractères.`,
    );
    redirect("/admin/moderators");
  }
  const target = await prisma.adminUser.findUnique({ where: { id } });
  if (!target) {
    await setAdminFlashMessage("Compte introuvable.");
    redirect("/admin/moderators");
  }
  const passwordHash = await bcrypt.hash(next, 12);
  await prisma.adminUser.update({ where: { id }, data: { passwordHash } });
  await setAdminFlashMessage(`Mot de passe mis à jour pour ${target.email}.`);
  revalidatePath("/admin/moderators");
  redirect("/admin/moderators");
}
