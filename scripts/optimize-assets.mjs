/**
 * Asset Optimization Script
 * Uses sharp (already in dependencies) to:
 * - Convert large PNGs → WebP (max 1920px wide, quality 82)
 * - Compress large JPGs → WebP
 * - Convert animated GIFs → animated WebP
 */

import sharp from 'sharp';
import { existsSync, mkdirSync, statSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const assetsDir = path.join(root, 'attached_assets');
const optimizedDir = path.join(assetsDir, 'optimized');

if (!existsSync(optimizedDir)) mkdirSync(optimizedDir, { recursive: true });

const MB = 1024 * 1024;

function fmtSize(bytes) {
  return (bytes / MB).toFixed(1) + ' MB';
}

// Maps: input filename (relative to attached_assets) → output filename (in optimized/)
const tasks = [
  // ── TIX case study ─────────────────────────────────────────────────────────
  { in: 'Tix_Guidelines-09_1766597838176.png',     out: 'tix_bag.webp',           maxW: 1920, q: 80 },
  { in: 'Tix_Guidelines-05_1766597838176.png',     out: 'tix_guidelines_05.webp', maxW: 1920, q: 80 },
  { in: 'Tix_Guidelines-06_1766597838176.png',     out: 'tix_arrow.webp',         maxW: 1920, q: 80 },
  { in: 'Tix_Guidelines-07_1766597838176.png',     out: 'tix_app_icon.webp',      maxW: 1920, q: 80 },
  { in: 'Tix_Guidelines-08_1766597838176.png',     out: 'tix_movie_poster.webp',  maxW: 1920, q: 80 },
  { in: 'Tix_Guidelines-10_1766597838176.png',     out: 'tix_mobile_hand.webp',   maxW: 1920, q: 80 },
  { in: 'Tix_Deck-10_1766597838176.png',           out: 'tix_deck.webp',          maxW: 1920, q: 80 },
  { in: 'Free_iPhone_16_Pro_PSD_Mockup_Tix_1766597838175.jpg', out: 'tix_iphone_mockup.webp', maxW: 1600, q: 82 },

  // ── GoGauge case study ──────────────────────────────────────────────────────
  { in: 'Go_Gauge_Slide_1-01_1767087653809.png',            out: 'gogauge_slide.webp',     maxW: 1920, q: 80 },
  { in: 'Go_Gauge_Work-01_1767087653809.png',               out: 'gogauge_work.webp',      maxW: 1920, q: 80 },
  { in: 'e3b89fe5-7e4b-4ce3-a4fd-7120f52e9261_1767087653809.png', out: 'gogauge_laptop.webp', maxW: 1920, q: 80 },
  { in: '6395621_2045_1767087653808.png',                   out: 'gogauge_container.webp', maxW: 1920, q: 80 },
  { in: '2_1767087653805.png',                              out: 'gogauge_overview.webp',  maxW: 1920, q: 80 },
  { in: 'GO_GAUGE_WORKS_2_1767087653809.png',               out: 'gogauge_social.webp',    maxW: 1920, q: 80 },
  { in: 'Go_Gauge_Standee_New_1767087653809.jpg',           out: 'gogauge_standee.webp',   maxW: 1600, q: 82 },

  // ── General / other pages ───────────────────────────────────────────────────
  { in: 'Screenshot_2025-12-24_at_2.03.21_PM_1766565203775.png', out: 'screenshot_about.webp',  maxW: 1600, q: 82 },
  { in: 'image_1767108156647.png',                          out: 'hero_background.webp',   maxW: 1920, q: 80 },
  { in: 'ChatGPT_Image_Dec_29,_2025,_11_17_56_PM_1767030489424.png', out: 'coming_soon_bg.webp', maxW: 1920, q: 80 },
  { in: 'Frame_33_copy2_2_(1)_1768895375486.png',           out: 'logo.webp',              maxW: 400,  q: 90 },
  { in: 'Frame_33_copy2_1_(1)_1768900373646.png',           out: 'logo_white.webp',        maxW: 400,  q: 90 },
  { in: '3D_App_Icon_Mockup_[Qorecraft]2_1765899763581.jpg', out: 'tix_3d_icon.webp',     maxW: 1200, q: 82 },
  { in: 'Eagle_Web_3_1765901229014.jpg',                    out: 'eagle_ppe.webp',         maxW: 1600, q: 82 },
  { in: 'magic_23_1765899763585.jpg',                       out: 'magic_trucks_mobile.webp', maxW: 1200, q: 82 },

  // ── Animated GIFs → animated WebP ──────────────────────────────────────────
  { in: 'From_KlickPin_CF_Kaldea_Visual_Identity_&_Website_Design_on_Be_1766516930656.gif',  out: 'context_anim.webp',      maxW: 1200, q: 75, animated: true },
  { in: 'From_KlickPin_CF_Kaldea_Visual_Identity_&_Website_Design_Behan_1766517702605.gif', out: 'refine_anim.webp',       maxW: 1200, q: 75, animated: true },
  { in: 'From_KlickPin_CF_Kaldea_Visual_Identity_&_Website_Design_Behan_1766517492447.gif', out: 'reliability_anim.webp',  maxW: 1200, q: 75, animated: true },
  { in: 'From_KlickPin_CF_Motion_Abstract_-_V1___Motion_graphics_design_1766518454195.gif', out: 'position_anim.webp',     maxW: 900,  q: 75, animated: true },
];

let totalSaved = 0;
let passed = 0;
let failed = 0;

for (const task of tasks) {
  const inputPath  = path.join(assetsDir, task.in);
  const outputPath = path.join(optimizedDir, task.out);

  if (!existsSync(inputPath)) {
    console.log(`⚠  SKIP  (not found) ${task.in}`);
    failed++;
    continue;
  }

  const originalSize = statSync(inputPath).size;

  try {
    const pipeline = sharp(inputPath, task.animated ? { animated: true, limitInputPixels: false } : { limitInputPixels: false })
      .resize({ width: task.maxW, withoutEnlargement: true })
      .webp({ quality: task.q, effort: 4 });

    await pipeline.toFile(outputPath);

    const newSize = statSync(outputPath).size;
    const saved   = originalSize - newSize;
    const pct     = ((saved / originalSize) * 100).toFixed(0);
    totalSaved   += saved;
    passed++;

    console.log(`✅  ${task.out.padEnd(35)} ${fmtSize(originalSize).padStart(8)} → ${fmtSize(newSize).padStart(8)}  (-${pct}%)`);
  } catch (err) {
    console.error(`❌  FAIL  ${task.in}  —  ${err.message}`);
    failed++;
  }
}

console.log('\n────────────────────────────────────────────────────────');
console.log(`✔  ${passed} optimized   ✘  ${failed} failed`);
console.log(`💾  Total saved: ${fmtSize(totalSaved)}`);
