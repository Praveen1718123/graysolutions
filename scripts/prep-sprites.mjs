#!/usr/bin/env node
// Gray Arcade — sprite prep. Takes high-res GPT-generated "pixel-art style"
// PNGs and turns them into real game assets: nearest-neighbor downscale to
// the engine's target sizes, then snap every opaque pixel to the active
// theme palette. Writes client/public/arcade/<theme>/ plus the manifest.json
// the runtime loader looks for (missing manifest = silent programmatic
// fallbacks, so this script is optional until art lands).
//
// Usage:
//   node scripts/prep-sprites.mjs --theme cosmic [--src scripts/sprites-src]
//   node scripts/prep-sprites.mjs --theme ember
//
// Drop source files named after their slots into the src dir:
//   runner.png ring_a.png ring_b.png bg_far.png bg_mid.png bg_near.png
//   gate.png rock_1.png rock_2.png rock_3.png rock_4.png
// Only files that exist are processed; the manifest lists exactly what
// shipped.

import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

// Target sizes must match the engine (see client/src/hero-arcade/engine).
// runner.png is a horizontal sheet of square frames: height fixed, width
// preserved as a multiple of the frame size.
const TARGETS = {
  runner: { height: 32 },
  ring_a: { width: 56, height: 88 },
  ring_b: { width: 56, height: 88 },
  bg_far: { width: 960, height: 240 },
  bg_mid: { width: 960, height: 240 },
  bg_near: { width: 960, height: 240 },
  gate: { width: 84, height: 116 },
  rock_1: { width: 28, height: 28 },
  rock_2: { width: 28, height: 28 },
  rock_3: { width: 28, height: 28 },
  rock_4: { width: 28, height: 28 },
};

// Palettes mirror client/src/hero-arcade/theme.ts (canvas tokens). Keep in
// sync by hand — this script must stay dependency-free from the TS build.
const PALETTES = {
  cosmic: [
    "#0a0a14", "#05070D", "#232741", "#2b3152", "#343b5c", "#3d4468",
    "#4c548a", "#59628f", "#6a7199", "#8b93c4", "#9aa4c8", "#a9b2cc",
    "#c4b5fd", "#8B5CF6", "#67e8f9", "#e9e2ff", "#e6ebff", "#e8ecfa",
    "#eef0ff", "#3B82F6",
  ],
  ember: [
    "#23211d", "#38352f", "#1c1a16", "#4a463f", "#57534b", "#6e6a5f",
    "#8d8779", "#a39d8e", "#b3ac9c", "#d8d2c4", "#dcd6c9", "#f2ede1",
    "#efe8d8", "#e05c2a", "#f0a33f", "#f6d558", "#f8ecd2",
  ],
};

function parseArgs(argv) {
  const args = { theme: "cosmic", src: "scripts/sprites-src" };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === "--theme") args.theme = argv[++i];
    else if (argv[i] === "--src") args.src = argv[++i];
  }
  if (!PALETTES[args.theme]) {
    console.error(`Unknown theme "${args.theme}" — use cosmic or ember.`);
    process.exit(1);
  }
  return args;
}

const hexToRgb = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

function snapToPalette(raw, palette) {
  const pal = palette.map(hexToRgb);
  for (let i = 0; i < raw.length; i += 4) {
    if (raw[i + 3] < 8) {
      raw[i + 3] = 0; // clean fully-transparent pixels
      continue;
    }
    let best = 0;
    let bestD = Infinity;
    for (let p = 0; p < pal.length; p++) {
      const dr = raw[i] - pal[p][0];
      const dg = raw[i + 1] - pal[p][1];
      const db = raw[i + 2] - pal[p][2];
      const d = dr * dr * 0.5 + dg * dg + db * db * 0.35; // perceptual-ish
      if (d < bestD) {
        bestD = d;
        best = p;
      }
    }
    raw[i] = pal[best][0];
    raw[i + 1] = pal[best][1];
    raw[i + 2] = pal[best][2];
  }
  return raw;
}

async function prepOne(srcPath, slot, outDir, palette) {
  const target = TARGETS[slot];
  const img = sharp(srcPath).ensureAlpha();
  const meta = await img.metadata();

  let width = target.width;
  let height = target.height;
  if (slot === "runner") {
    // Sheet: fix height, keep frame count (assume square frames in source).
    height = TARGETS.runner.height;
    const frames = Math.max(1, Math.round(meta.width / meta.height));
    width = height * frames;
  }

  const resized = await img
    .resize(width, height, { kernel: sharp.kernel.nearest, fit: "fill" })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const snapped = snapToPalette(resized.data, palette);
  await sharp(snapped, {
    raw: { width: resized.info.width, height: resized.info.height, channels: 4 },
  })
    .png({ compressionLevel: 9, palette: true })
    .toFile(path.join(outDir, `${slot}.png`));

  return `${slot}.png`;
}

async function main() {
  const { theme, src } = parseArgs(process.argv);
  const outDir = path.join("client", "public", "arcade", theme);
  mkdirSync(outDir, { recursive: true });

  if (!existsSync(src)) {
    console.error(`Source dir "${src}" not found. Create it and drop PNGs in.`);
    process.exit(1);
  }

  const available = new Set(readdirSync(src));
  const shipped = [];
  let totalBytes = 0;

  for (const slot of Object.keys(TARGETS)) {
    const file = `${slot}.png`;
    if (!available.has(file)) continue;
    await prepOne(path.join(src, file), slot, outDir, PALETTES[theme]);
    const { size } = statSync(path.join(outDir, file));
    totalBytes += size;
    shipped.push(slot);
    console.log(`  ✓ ${slot}.png (${(size / 1024).toFixed(1)} KB)`);
  }

  writeFileSync(
    path.join(outDir, "manifest.json"),
    JSON.stringify({ theme, files: shipped }, null, 2),
  );
  console.log(`\n${shipped.length} sprites → ${outDir} (${(totalBytes / 1024).toFixed(1)} KB total)`);
  if (totalBytes > 300 * 1024) {
    console.warn("⚠ Hero image asset budget is 300KB — over budget, recompress or trim.");
  }
  if (shipped.length === 0) {
    console.log("No source PNGs found — runtime keeps using programmatic fallbacks.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
