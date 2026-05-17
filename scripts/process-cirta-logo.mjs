/**
 * One-off / maintenance: replace solid black studio background with transparency.
 * Uses edge flood-fill so dark bronze shadows inside the artwork stay opaque.
 */
import sharp from "sharp";
import { mkdir } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const inputPath = process.argv[2];
const outputPath = join(root, "public", "cirta-gallery-logo.png");

if (!inputPath) {
  console.error("Usage: node scripts/process-cirta-logo.mjs <path-to-source.png>");
  process.exit(1);
}

function isBackgroundPixel(r, g, b) {
  const mx = Math.max(r, g, b);
  const mn = Math.min(r, g, b);
  // Near-black neutrals (background + anti-alias on black), not saturated gold/bronze
  return mx < 34 && mx - mn < 12;
}

const img = sharp(inputPath).ensureAlpha();
const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
const { width: w, height: h, channels } = info;
if (channels !== 4) throw new Error("Expected RGBA");

const idx = (x, y) => (y * w + x) * 4;
const seen = new Uint8Array(w * h);
const q = [];

function tryPush(x, y) {
  if (x < 0 || y < 0 || x >= w || y >= h) return;
  const i = y * w + x;
  if (seen[i]) return;
  seen[i] = 1;
  const p = idx(x, y);
  const r = data[p],
    g = data[p + 1],
    b = data[p + 2];
  if (!isBackgroundPixel(r, g, b)) return;
  q.push(x, y);
}

for (let x = 0; x < w; x++) {
  tryPush(x, 0);
  tryPush(x, h - 1);
}
for (let y = 0; y < h; y++) {
  tryPush(0, y);
  tryPush(w - 1, y);
}

while (q.length) {
  const y = q.pop();
  const x = q.pop();
  const p = idx(x, y);
  data[p + 3] = 0;
  tryPush(x + 1, y);
  tryPush(x - 1, y);
  tryPush(x, y + 1);
  tryPush(x, y - 1);
}

await mkdir(dirname(outputPath), { recursive: true });
await sharp(data, { raw: { width: w, height: h, channels: 4 } })
  .png({ compressionLevel: 9, effort: 10 })
  .toFile(outputPath);

console.log("Wrote", outputPath, `(${w}×${h})`);
