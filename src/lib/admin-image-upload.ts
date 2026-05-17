import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { put } from "@vercel/blob";

export type StoredImage = {
  url: string;
  storage: "blob" | "local";
};

/** Enregistre une image admin : Blob sur Vercel, dossier public/uploads en local. */
export async function storeAdminProductImage(
  buf: Buffer,
  name: string,
  mime: string,
): Promise<StoredImage> {
  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();

  if (token) {
    const blob = await put(`products/${name}`, buf, {
      access: "public",
      contentType: mime,
      token,
    });
    return { url: blob.url, storage: "blob" };
  }

  if (process.env.VERCEL === "1") {
    throw new Error(
      "Stockage Blob non configuré sur Vercel. Créez un store Blob (Storage) et ajoutez BLOB_READ_WRITE_TOKEN aux variables d’environnement.",
    );
  }

  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), buf);
  return { url: `/uploads/${name}`, storage: "local" };
}
