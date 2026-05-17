import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { storeAdminProductImage } from "@/lib/admin-image-upload";
import { getAdminCookieName, verifyAdminJwt } from "@/lib/auth";

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_BYTES = 12 * 1024 * 1024;

export async function POST(req: Request) {
  try {
    const token = (await cookies()).get(getAdminCookieName())?.value;
    if (!token) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }
    await verifyAdminJwt(token);
  } catch {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof Blob)) {
      return NextResponse.json({ error: "Fichier manquant" }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "Fichier trop volumineux (max 12 Mo)" }, { status: 400 });
    }
    const mime = file.type;
    if (!ALLOWED.has(mime)) {
      return NextResponse.json({ error: "Format image non pris en charge" }, { status: 400 });
    }

    const ext =
      mime === "image/jpeg"
        ? "jpg"
        : mime === "image/png"
          ? "png"
          : mime === "image/webp"
            ? "webp"
            : "gif";
    const name = `${crypto.randomUUID()}.${ext}`;
    const buf = Buffer.from(await file.arrayBuffer());
    const stored = await storeAdminProductImage(buf, name, mime);

    return NextResponse.json({ url: stored.url, storage: stored.storage });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Échec du téléversement";
    const readOnly =
      e instanceof Error &&
      "code" in e &&
      (e as NodeJS.ErrnoException).code === "EROFS";
    return NextResponse.json(
      {
        error: readOnly
          ? "Le serveur ne peut pas enregistrer de fichiers localement. Configurez Vercel Blob (BLOB_READ_WRITE_TOKEN)."
          : message,
      },
      { status: 500 },
    );
  }
}
