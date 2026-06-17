// Génère les sources d'icône + splash pour @capacitor/assets, à partir de mobile/Logo.png.
//   node scripts/gen-mobile-assets.mjs
// Produit assets/{icon-only,icon-foreground,icon-background,splash}.png (+ mobile/ic_stat_icon.png).
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(root, "mobile", "Logo.png");
const ASSETS = path.join(root, "assets");
const MOBILE = path.join(root, "mobile");
mkdirSync(ASSETS, { recursive: true });

const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };
const CLEAR = { r: 0, g: 0, b: 0, alpha: 0 };

// Part de l'emblème (bouclier) dans la largeur du logo rogné. Ajustable.
const SHIELD_W_FACTOR = Number(process.env.SHIELD_W_FACTOR ?? 0.95);

async function trim(buf) {
  try {
    return await sharp(buf).trim({ threshold: 12 }).png().toBuffer();
  } catch {
    return await sharp(buf).png().toBuffer();
  }
}

async function square(buf, size, frac, bg) {
  const inner = Math.round(size * frac);
  const resized = await sharp(buf).resize({ width: inner, height: inner, fit: "inside" }).png().toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: bg } })
    .composite([{ input: resized, gravity: "center" }])
    .png()
    .toBuffer();
}

const meta = await sharp(SRC).metadata();
console.log(`Logo source : ${meta.width}x${meta.height}, alpha=${meta.hasAlpha}`);

// Logo complet rogné (pour le splash).
const full = await trim(await sharp(SRC).png().toBuffer());
const fm = await sharp(full).metadata();
console.log(`Logo rogné : ${fm.width}x${fm.height}`);

// Emblème : fenêtre du bouclier seul dans le logo rogné (réglée pour le logo
// actuel, 1300px de large). Surchargeable via SHIELD_LEFT / SHIELD_W si le logo change.
const cropLeft = process.env.SHIELD_LEFT ? Number(process.env.SHIELD_LEFT) : 135;
const cropW = process.env.SHIELD_W
  ? Number(process.env.SHIELD_W)
  : process.env.SHIELD_W_FACTOR
    ? Math.min(fm.width, Math.round(fm.height * SHIELD_W_FACTOR))
    : 295;
const shield = await trim(await sharp(full).extract({ left: cropLeft, top: 0, width: cropW, height: fm.height }).png().toBuffer());
const sm = await sharp(shield).metadata();
console.log(`Emblème : ${sm.width}x${sm.height} (cropW=${cropW}, facteur=${SHIELD_W_FACTOR})`);

// Icônes (1024).
await sharp(await square(shield, 1024, 0.70, WHITE)).toFile(path.join(ASSETS, "icon-only.png"));
await sharp(await square(shield, 1024, 0.62, CLEAR)).toFile(path.join(ASSETS, "icon-foreground.png"));
await sharp({ create: { width: 1024, height: 1024, channels: 4, background: WHITE } }).png().toFile(path.join(ASSETS, "icon-background.png"));

// Splash (2732) : logo complet centré sur blanc.
const splashInner = await sharp(full).resize({ width: Math.round(2732 * 0.5), fit: "inside" }).png().toBuffer();
await sharp({ create: { width: 2732, height: 2732, channels: 4, background: WHITE } })
  .composite([{ input: splashInner, gravity: "center" }])
  .png()
  .toFile(path.join(ASSETS, "splash.png"));

// Icône de notification : silhouette blanche par seuil de luminance
// (les formes sombres de l'emblème deviennent blanches, le fond blanc devient transparent).
try {
  const THRESH = Number(process.env.NOTIF_THRESHOLD ?? 200);
  // mask : 255 là où l'emblème est sombre, 0 sur le fond clair.
  const mask = await sharp(shield).flatten({ background: WHITE }).grayscale().threshold(THRESH).negate().png().toBuffer();
  const mm = await sharp(mask).metadata();
  const sil = await sharp({ create: { width: mm.width, height: mm.height, channels: 3, background: WHITE } })
    .joinChannel(mask)
    .png()
    .toBuffer();
  await sharp(await square(sil, 256, 0.9, CLEAR)).toFile(path.join(MOBILE, "ic_stat_icon.png"));
  console.log(`→ mobile/ic_stat_icon.png (silhouette notification, seuil=${THRESH})`);
} catch (e) {
  console.log("Icône de notification ignorée :", e.message);
}

console.log("OK → assets/icon-only.png, icon-foreground.png, icon-background.png, splash.png");
