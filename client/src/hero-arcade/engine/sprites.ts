// Gray Arcade — sprite atlas. Every visual slot has a programmatic canvas
// fallback so the build is never blocked on art. Real PNGs (prepped by
// scripts/prep-sprites.mjs into client/public/arcade/<theme>/) are listed in
// a manifest.json; if the manifest is missing or invalid the atlas silently
// stays on fallbacks — no per-file 404 probing (the SPA rewrite would return
// HTML for missing files anyway).

import type { ArcadeTheme } from "../theme";
import { GROUND_Y, LOGICAL_H, LOGICAL_W, RUNNER_H, RUNNER_W } from "./entities";

// Deterministic PRNG — seeded so plates/rocks are identical every load.
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeCanvas(w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d");
  if (!ctx) throw new Error("2d context unavailable");
  ctx.imageSmoothingEnabled = false;
  return [c, ctx];
}

// ── Runner pixel maps ───────────────────────────────────────────────────────
// 12×16 maps, drawn at ×2 → 24×32. Side view, facing right.
// . none  o outline  s suit  S suit shade  v visor  a accent
type Frame = readonly string[];

const RUN_A: Frame = [
  "....oooo....",
  "...osssso...",
  "...osSvvo...",
  "...osssso...",
  "....oooo....",
  "...ossso....",
  "..osssaso...",
  "..osssso.o..",
  "..oSssso....",
  "...ossso....",
  "...oSso.....",
  "..oss.oso...",
  ".oso....os..",
  ".os......o..",
  ".o..........",
  "............",
];

const RUN_B: Frame = [
  "............",
  "....oooo....",
  "...osssso...",
  "...osSvvo...",
  "...osssso...",
  "....oooo....",
  "...osssso...",
  "..o.ssaso...",
  "....oSsso...",
  "...ossso....",
  "....oso.....",
  "....oss.....",
  "....o.os....",
  ".....o.o....",
  "............",
  "............",
];

const JUMP: Frame = [
  "....oooo....",
  "...osssso...",
  "...osSvvo...",
  "...osssso...",
  "....oooo..o.",
  "...osssso.o.",
  "..ossssaso..",
  ".o.osssso...",
  ".o.oSsso....",
  "...osso.....",
  "..oss.os....",
  ".oso...os...",
  ".o......o...",
  "............",
  "............",
  "............",
];

const STUMBLE: Frame = [
  "............",
  "............",
  ".....oooo...",
  "....osssso..",
  "....oSsvvo..",
  "....osssso..",
  ".....oooo...",
  "..oossssso..",
  ".o.ssssaso..",
  "...oSsssso..",
  "...ossso.o..",
  "..oss.oss...",
  ".oso....os..",
  ".oo......oo.",
  "............",
  "............",
];

const RUNNER_FRAMES: readonly Frame[] = [RUN_A, RUN_B, JUMP, STUMBLE];
export type RunnerFrame = 0 | 1 | 2 | 3;

function paintRunnerFrame(frame: Frame, theme: ArcadeTheme): HTMLCanvasElement {
  const [c, ctx] = makeCanvas(RUNNER_W, RUNNER_H);
  const pal: Record<string, string> = {
    o: theme.runner.outline,
    s: theme.runner.suit,
    S: theme.runner.shade,
    v: theme.runner.visor,
    a: theme.runner.accent,
  };
  for (let row = 0; row < frame.length; row++) {
    for (let col = 0; col < frame[row].length; col++) {
      const color = pal[frame[row][col]];
      if (color) {
        ctx.fillStyle = color;
        ctx.fillRect(col * 2, row * 2, 2, 2);
      }
    }
  }
  return c;
}

// ── Ring fallback ───────────────────────────────────────────────────────────
export const RING_W = 56;
export const RING_H = 88;

function paintRing(theme: ArcadeTheme, variant: 0 | 1): HTMLCanvasElement {
  const [c, ctx] = makeCanvas(RING_W, RING_H);
  const cx = RING_W / 2;
  const cy = RING_H / 2;
  const ry = 36;
  const rx = 11;
  // Layered strokes stand in for baked glow (no shadowBlur — too slow).
  const layers: [number, string, number][] = [
    [9, theme.ring.halo, variant === 0 ? 0.9 : 0.75],
    [5, theme.ring.mid, 0.85],
    [2.5, variant === 0 ? theme.ring.core : theme.ring.alt, 1],
  ];
  for (const [lw, color, alpha] of layers) {
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = color;
    ctx.lineWidth = lw;
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  return c;
}

// ── Debris rocks fallback ───────────────────────────────────────────────────
function paintRock(theme: ArcadeTheme, variant: number): HTMLCanvasElement {
  const size = 28;
  const [c, ctx] = makeCanvas(size, size);
  const rand = mulberry32(1000 + variant * 97);
  const cx = size / 2;
  const cy = size / 2 + 3;
  const pts: [number, number][] = [];
  const n = 6 + Math.floor(rand() * 3);
  for (let i = 0; i < n; i++) {
    const ang = (i / n) * Math.PI * 2;
    const r = 8 + rand() * 5;
    pts.push([cx + Math.cos(ang) * r * 1.15, cy + Math.sin(ang) * r * 0.8]);
  }
  ctx.fillStyle = theme.debris.fill;
  ctx.strokeStyle = theme.debris.edge;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (const [x, y] of pts.slice(1)) ctx.lineTo(x, y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  // A couple of facet lines for the "glassy rock" read.
  ctx.globalAlpha = 0.5;
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  ctx.lineTo(cx, cy);
  ctx.lineTo(pts[Math.floor(n / 2)][0], pts[Math.floor(n / 2)][1]);
  ctx.stroke();
  ctx.globalAlpha = 1;
  return c;
}

// ── Launch gate fallback ────────────────────────────────────────────────────
export const GATE_W = 84;
export const GATE_H = 116;

function paintGate(theme: ArcadeTheme): HTMLCanvasElement {
  const [c, ctx] = makeCanvas(GATE_W, GATE_H);
  const cx = GATE_W / 2;
  // Inner portal glow.
  const portal = ctx.createRadialGradient(cx, GATE_H - 46, 4, cx, GATE_H - 46, 44);
  portal.addColorStop(0, theme.gate.portal);
  portal.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = portal;
  ctx.fillRect(0, 0, GATE_W, GATE_H);
  // Arch: two pillars + halo ring of blocks.
  ctx.fillStyle = theme.gate.frame;
  ctx.fillRect(10, 34, 8, GATE_H - 34);
  ctx.fillRect(GATE_W - 18, 34, 8, GATE_H - 34);
  for (let i = 0; i <= 8; i++) {
    const ang = Math.PI + (i / 8) * Math.PI;
    const bx = cx + Math.cos(ang) * (cx - 12);
    const by = 40 + Math.sin(ang) * 26;
    ctx.fillStyle = i % 2 === 0 ? theme.gate.glowA : theme.gate.glowB;
    ctx.fillRect(Math.round(bx) - 3, Math.round(by) - 3, 6, 6);
  }
  // Pillar glow studs.
  for (let y = 44; y < GATE_H - 6; y += 14) {
    ctx.fillStyle = theme.gate.glowA;
    ctx.fillRect(12, y, 4, 4);
    ctx.fillStyle = theme.gate.glowB;
    ctx.fillRect(GATE_W - 16, y, 4, 4);
  }
  return c;
}

// ── Parallax nebula plates fallback ─────────────────────────────────────────
export const PLATE_W = 960;

function paintPlate(theme: ArcadeTheme, depth: 0 | 1 | 2): HTMLCanvasElement {
  const [c, ctx] = makeCanvas(PLATE_W, LOGICAL_H);
  const rand = mulberry32(7 + depth * 31);
  // Nebula blobs on far + mid plates only.
  if (depth < 2) {
    const blobs = depth === 0 ? 7 : 4;
    for (let i = 0; i < blobs; i++) {
      const bx = rand() * PLATE_W;
      const by = rand() * LOGICAL_H * 0.7;
      const r = 40 + rand() * 90;
      const g = ctx.createRadialGradient(bx, by, 0, bx, by, r);
      g.addColorStop(0, theme.nebula[i % 2]);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      // Draw twice for horizontal tiling continuity at the seam.
      ctx.fillRect(bx - r, by - r, r * 2, r * 2);
      const wrapX = bx < PLATE_W / 2 ? bx + PLATE_W : bx - PLATE_W;
      const g2 = ctx.createRadialGradient(wrapX, by, 0, wrapX, by, r);
      g2.addColorStop(0, theme.nebula[i % 2]);
      g2.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g2;
      ctx.fillRect(wrapX - r, by - r, r * 2, r * 2);
    }
  }
  // Stars — density and brightness by depth.
  const counts = [90, 60, 26];
  const color = theme.stars[depth];
  ctx.fillStyle = color;
  for (let i = 0; i < counts[depth]; i++) {
    const x = Math.floor(rand() * PLATE_W);
    const y = Math.floor(rand() * (LOGICAL_H - 30));
    const s = depth === 2 && rand() < 0.35 ? 2 : 1;
    ctx.globalAlpha = 0.4 + rand() * 0.6;
    ctx.fillRect(x, y, s, s);
  }
  ctx.globalAlpha = 1;
  return c;
}

// ── PNG upgrade path ────────────────────────────────────────────────────────
export type SpriteKey =
  | "runner"
  | "ring_a"
  | "ring_b"
  | "bg_far"
  | "bg_mid"
  | "bg_near"
  | "gate"
  | "rock_1"
  | "rock_2"
  | "rock_3"
  | "rock_4";

const ALL_KEYS: readonly SpriteKey[] = [
  "runner",
  "ring_a",
  "ring_b",
  "bg_far",
  "bg_mid",
  "bg_near",
  "gate",
  "rock_1",
  "rock_2",
  "rock_3",
  "rock_4",
];

function loadImage(url: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

// ── Atlas ───────────────────────────────────────────────────────────────────
export interface SpriteAtlas {
  drawRunner(ctx: CanvasRenderingContext2D, frame: RunnerFrame, dx: number, dy: number): void;
  drawRing(ctx: CanvasRenderingContext2D, variant: 0 | 1, cx: number, cy: number, alpha: number): void;
  drawRock(ctx: CanvasRenderingContext2D, variant: number, x: number, groundY: number): void;
  drawGate(ctx: CanvasRenderingContext2D, x: number, groundY: number, alpha: number): void;
  drawPlate(ctx: CanvasRenderingContext2D, depth: 0 | 1 | 2, offsetX: number): void;
  dispose(): void;
}

/**
 * Build the atlas synchronously from programmatic fallbacks, then try to
 * upgrade individual slots from PNGs in the background. Fully silent on
 * failure by design.
 */
export function createAtlas(theme: ArcadeTheme): SpriteAtlas {
  const runnerFrames = RUNNER_FRAMES.map((f) => paintRunnerFrame(f, theme));
  const rings = [paintRing(theme, 0), paintRing(theme, 1)];
  const rocks = [0, 1, 2, 3].map((v) => paintRock(theme, v));
  const gate = paintGate(theme);
  const plates = [paintPlate(theme, 0), paintPlate(theme, 1), paintPlate(theme, 2)];

  const png: Partial<Record<SpriteKey, HTMLImageElement>> = {};
  let disposed = false;

  void (async () => {
    try {
      const res = await fetch(`/arcade/${theme.name}/manifest.json`, { cache: "force-cache" });
      if (!res.ok) return;
      const manifest: unknown = await res.json();
      const files = (manifest as { files?: unknown }).files;
      if (!Array.isArray(files)) return;
      await Promise.all(
        files
          .filter((f): f is SpriteKey => typeof f === "string" && (ALL_KEYS as readonly string[]).includes(f))
          .map(async (key) => {
            const img = await loadImage(`/arcade/${theme.name}/${key}.png`);
            if (img && !disposed) png[key] = img;
          }),
      );
    } catch {
      // Silent fallback — programmatic art keeps rendering.
    }
  })();

  return {
    drawRunner(ctx, frame, dx, dy) {
      const sheet = png.runner;
      if (sheet && sheet.height > 0) {
        // Horizontal sheet of square frames; clamp to available frames.
        // Frames render at their natural aspect (height-fit, centered on the
        // 24px logical body) so square art is never squeezed.
        const fs = sheet.height;
        const count = Math.max(1, Math.floor(sheet.width / fs));
        const i = Math.min(frame, count - 1);
        ctx.drawImage(sheet, i * fs, 0, fs, fs, dx - (RUNNER_H - RUNNER_W) / 2, dy, RUNNER_H, RUNNER_H);
      } else {
        ctx.drawImage(runnerFrames[frame], dx, dy);
      }
    },
    drawRing(ctx, variant, cx, cy, alpha) {
      const img = variant === 0 ? png.ring_a : png.ring_b;
      const src: CanvasImageSource = img ?? rings[variant];
      ctx.globalAlpha = alpha;
      ctx.drawImage(src, Math.round(cx - RING_W / 2), Math.round(cy - RING_H / 2), RING_W, RING_H);
      ctx.globalAlpha = 1;
    },
    drawRock(ctx, variant, x, groundY) {
      const key = `rock_${(variant % 4) + 1}` as SpriteKey;
      const src: CanvasImageSource = png[key] ?? rocks[variant % 4];
      ctx.drawImage(src, Math.round(x), groundY - 24, 28, 28);
    },
    drawGate(ctx, x, groundY, alpha) {
      const src: CanvasImageSource = png.gate ?? gate;
      ctx.globalAlpha = alpha;
      ctx.drawImage(src, Math.round(x), groundY - GATE_H + 6, GATE_W, GATE_H);
      ctx.globalAlpha = 1;
    },
    drawPlate(ctx, depth, offsetX) {
      const key = (["bg_far", "bg_mid", "bg_near"] as const)[depth];
      const src: CanvasImageSource = png[key] ?? plates[depth];
      const w = PLATE_W;
      const ox = ((offsetX % w) + w) % w;
      ctx.drawImage(src, -ox, 0, w, LOGICAL_H);
      ctx.drawImage(src, w - ox, 0, w, LOGICAL_H);
      // Cover the tail when the logical width exceeds one tile minus offset.
      if (w - ox < LOGICAL_W) ctx.drawImage(src, w * 2 - ox, 0, w, LOGICAL_H);
    },
    dispose() {
      disposed = true;
    },
  };
}
