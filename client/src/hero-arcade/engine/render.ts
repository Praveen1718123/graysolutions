// Gray Arcade — canvas compositor. Draws the parallax space, entities, fx,
// and in-canvas text at a fixed 480×240 logical resolution. All colors come
// from the active theme; all sprite pixels come from the atlas.

import { COPY, PARKED_RINGS, PARKED_RINGS_FULL } from "../content";
import type { ArcadeTheme } from "../theme";
import {
  GROUND_Y,
  LOGICAL_H,
  LOGICAL_W,
  RUNNER_H,
  SPARKLE_COUNT,
  type World,
} from "./entities";
import { drawTextCentered, drawText } from "./font";
import { createAtlas, mulberry32, type RunnerFrame, type SpriteAtlas } from "./sprites";

const FLASH_TIME = 0.3;

interface Sparkle {
  x: number;
  y: number;
  phase: number;
}

export interface Renderer {
  draw(world: World): void;
  setTheme(theme: ArcadeTheme): void;
  /** Full-bleed: logical width follows the hero's aspect (height stays 240). */
  setViewWidth(w: number): void;
  dispose(): void;
}

function pickRunnerFrame(world: World): RunnerFrame {
  const r = world.runner;
  if (r.stumbleT > 0) return 3;
  if (!r.grounded) return 2;
  if (world.state === "attract" || world.state === "complete") {
    return Math.floor(r.animT * 2.2) % 2 === 0 ? 0 : 1; // slow idle jog
  }
  return Math.floor(r.animT * 9) % 2 === 0 ? 0 : 1;
}

export function createRenderer(
  ctx: CanvasRenderingContext2D,
  initialTheme: ArcadeTheme,
  fullBleed = false,
): Renderer {
  let theme = initialTheme;
  let atlas: SpriteAtlas = createAtlas(theme);
  // Full-bleed: the visible logical width tracks the hero region's aspect
  // ratio (pixel rows stay 240) so nothing is cropped or stretched.
  let viewW = LOGICAL_W;
  // Full-bleed layout: the copy owns the left half, so centered/parked
  // elements shift into the right airspace (see also the attract line).
  const parkedRings = fullBleed ? PARKED_RINGS_FULL : PARKED_RINGS;

  // Prerenders rebuilt on theme change and view resize.
  let bgGradient = makeBg();
  let vignette = makeVignette();

  // Sparkle x is a fraction of the view so they cover any width uniformly.
  const sparkles: Sparkle[] = [];
  const srand = mulberry32(0x5eed);
  for (let i = 0; i < SPARKLE_COUNT[0]; i++) {
    sparkles.push({ x: srand(), y: srand() * (LOGICAL_H - 60), phase: srand() * Math.PI * 2 });
  }

  function makeBg(): CanvasGradient {
    const g = ctx.createLinearGradient(0, 0, 0, LOGICAL_H);
    g.addColorStop(0, theme.space.top);
    g.addColorStop(1, theme.space.bottom);
    return g;
  }

  function makeVignette(): HTMLCanvasElement {
    const c = document.createElement("canvas");
    c.width = viewW;
    c.height = LOGICAL_H;
    const vctx = c.getContext("2d");
    if (vctx) {
      const g = vctx.createRadialGradient(
        viewW / 2,
        LOGICAL_H / 2,
        LOGICAL_H * 0.55,
        viewW / 2,
        LOGICAL_H / 2,
        viewW * 0.72,
      );
      g.addColorStop(0, "transparent");
      g.addColorStop(1, theme.vignette);
      vctx.fillStyle = g;
      vctx.fillRect(0, 0, viewW, LOGICAL_H);
    }
    return c;
  }

  // Ground line — fades out toward both edges in full-bleed so it reads as
  // a scene element rather than a rule slicing the hero.
  let groundStrip = makeGroundStrip();

  function makeGroundStrip(): HTMLCanvasElement {
    const c = document.createElement("canvas");
    c.width = viewW;
    c.height = 4;
    const gctx = c.getContext("2d");
    if (gctx) {
      gctx.fillStyle = theme.ground.glow;
      gctx.fillRect(0, 1, viewW, 3);
      gctx.fillStyle = theme.ground.line;
      gctx.fillRect(0, 0, viewW, 1);
      if (fullBleed) {
        gctx.globalCompositeOperation = "destination-in";
        const mask = gctx.createLinearGradient(0, 0, viewW, 0);
        mask.addColorStop(0, "rgba(0,0,0,0)");
        mask.addColorStop(0.12, "rgba(0,0,0,1)");
        mask.addColorStop(0.88, "rgba(0,0,0,1)");
        mask.addColorStop(1, "rgba(0,0,0,0)");
        gctx.fillStyle = mask;
        gctx.fillRect(0, 0, viewW, 4);
      }
    }
    return c;
  }

  function drawGroundLine(): void {
    ctx.drawImage(groundStrip, 0, GROUND_Y);
  }

  // Ambient UFO flyby — deterministic from the state clock: appears a few
  // seconds in, drifts right-to-left along the far background every ~12s.
  function drawUfo(world: World): void {
    const DELAY = 4;
    const PERIOD = 12;
    const FLIGHT = 7;
    if (world.t < DELAY) return;
    const phase = (world.t - DELAY) % PERIOD;
    if (phase > FLIGHT) return;
    const p = phase / FLIGHT;
    const x = viewW + 24 - (viewW + 60) * p;
    const y = 30 + 12 * Math.sin(phase * 1.1);
    const lightOn = Math.floor(world.t * 1.5) % 2 === 0;
    atlas.drawUfo(ctx, x, y, lightOn);
  }

  // Idle blink — the visor dims for a beat every few seconds. Character for
  // two rectangles' worth of work.
  function blinkOverlay(world: World, x: number, feetY: number): void {
    const phase = world.t % 3.4;
    if (phase < 3.2 || !world.runner.grounded) return;
    ctx.fillStyle = theme.runner.suit;
    ctx.fillRect(x + 10, feetY - RUNNER_H + 4, 6, 2);
  }

  function drawRunScene(world: World): void {
    // Gate (behind rings once passed, so draw first).
    const gateScreenX = world.gate.x - world.scrollX;
    if (gateScreenX > -100 && gateScreenX < viewW + 40) {
      const pulse = 0.82 + 0.18 * Math.sin(world.t * 2.4);
      atlas.drawGate(ctx, gateScreenX, GROUND_Y, pulse);
    }

    // Rings — cleared rings dim; missed rings drift behind at full glow so
    // they stay "hoverable later" in the completed scene.
    for (const ring of world.rings) {
      const sx = ring.x - world.scrollX;
      if (sx < -60 || sx > viewW + 60) continue;
      const flicker = 0.78 + 0.22 * Math.sin(world.t * 5 + ring.index * 1.7);
      const alpha = ring.cleared ? 0.35 : flicker;
      atlas.drawRing(ctx, ring.variant, sx, ring.cy, alpha);
    }

    // Pellets — pulsing gold dots; the arcs trace the ideal jump curve.
    ctx.fillStyle = theme.ring.core;
    for (const p of world.pellets) {
      if (p.taken) continue;
      const sx = p.x - world.scrollX;
      if (sx < -8 || sx > viewW + 8) continue;
      const pulse = 0.55 + 0.45 * (0.5 + 0.5 * Math.sin(world.t * 3 + p.x * 0.08));
      ctx.globalAlpha = 0.22 * pulse;
      ctx.fillRect(Math.round(sx) - 2, Math.round(p.y) - 2, 6, 6);
      ctx.globalAlpha = pulse;
      ctx.fillRect(Math.round(sx), Math.round(p.y), 2, 2);
    }
    ctx.globalAlpha = 1;

    // Debris.
    for (const d of world.debris) {
      const sx = d.x - world.scrollX;
      if (sx < -40 || sx > viewW + 40) continue;
      atlas.drawRock(ctx, d.variant, sx, GROUND_Y);
      if (d.label) {
        drawTextCentered(ctx, d.label, sx + d.w / 2, GROUND_Y - 38, 1, theme.debris.label);
      }
    }

    // Runner.
    atlas.drawRunner(ctx, pickRunnerFrame(world), world.runnerX, Math.round(world.runner.y) - RUNNER_H);
    if (world.state === "attract") blinkOverlay(world, world.runnerX, Math.round(world.runner.y));
  }

  function drawCompleteScene(world: World): void {
    // Rings park in a static ascending arc; the DOM hotspot layer shares the
    // canvas geometry exactly, so both sides use the same view fractions
    // (content.ts PARKED_RINGS* is the shared source of truth).
    parkedRings.forEach((p, i) => {
      const flicker = 0.8 + 0.2 * Math.sin(world.t * 2.2 + i * 1.3);
      atlas.drawRing(ctx, (i % 2) as 0 | 1, p.x * viewW, p.y * LOGICAL_H, flicker);
    });
    // Runner idles facing the scene (right of the copy in full-bleed).
    const idleX = fullBleed ? Math.round(viewW * 0.44) : 34;
    atlas.drawRunner(ctx, pickRunnerFrame(world), idleX, GROUND_Y - RUNNER_H);
    blinkOverlay(world, idleX, GROUND_Y);
  }

  return {
    draw(world: World): void {
      ctx.save();

      // Screen nudge on stumble — a tiny decaying shake, never violent.
      if (world.shakeT > 0) {
        const k = world.shakeT / 0.15;
        ctx.translate(Math.sin(world.t * 70) * 2 * k, Math.cos(world.t * 55) * 1.5 * k);
      }

      // The engine owns its canvas in both layouts: theme space gradient +
      // parallax nebula plates (driftX-driven — never snaps back).
      ctx.fillStyle = bgGradient;
      ctx.fillRect(-4, -4, viewW + 8, LOGICAL_H + 8);
      atlas.drawPlate(ctx, 0, world.driftX * 0.15, viewW);
      atlas.drawPlate(ctx, 1, world.driftX * 0.35, viewW);
      atlas.drawPlate(ctx, 2, world.driftX * 0.7, viewW);

      // Twinkling foreground sparkles (skipped entirely on the low tier).
      const sparkleN = Math.min(SPARKLE_COUNT[world.quality], sparkles.length);
      if (sparkleN > 0) {
        ctx.fillStyle = theme.stars[2];
        for (let i = 0; i < sparkleN; i++) {
          const s = sparkles[i];
          const tw = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(world.t * 1.8 + s.phase));
          ctx.globalAlpha = tw;
          const x = (((s.x * viewW - world.driftX * 0.5) % viewW) + viewW) % viewW;
          ctx.fillRect(x, s.y, 1, 1);
        }
        ctx.globalAlpha = 1;
      }

      drawUfo(world);
      drawGroundLine();

      if (world.state === "complete") {
        drawCompleteScene(world);
      } else {
        drawRunScene(world);
      }

      // Particles.
      for (const p of world.particles) {
        const fade = 1 - p.t / p.ttl;
        ctx.globalAlpha = fade;
        ctx.fillStyle = theme.particles[p.color];
        ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
      }
      ctx.globalAlpha = 1;

      // Score popups.
      for (const pop of world.popups) {
        const fade = 1 - pop.t / pop.ttl;
        ctx.globalAlpha = fade;
        drawText(ctx, pop.text, Math.round(pop.x), Math.round(pop.y), 2, theme.canvasText.bright);
      }
      ctx.globalAlpha = 1;

      // Attract line — blinks at ~1.2Hz (well under the 3Hz flash ceiling).
      if (world.state === "attract") {
        const on = world.t % 0.83 < 0.5;
        if (on) {
          const cx = fullBleed ? viewW * 0.66 : viewW / 2;
          drawTextCentered(ctx, COPY.attract, cx, 64, 2, theme.canvasText.bright);
        }
      }

      ctx.restore();

      // Gate white-out — one ≤300ms fade, drawn unshaken. Softer in
      // full-bleed so it never white-flashes over the hero copy.
      if (world.flashT > 0) {
        ctx.globalAlpha = Math.min(1, world.flashT / FLASH_TIME) * (fullBleed ? 0.45 : 0.85);
        ctx.fillStyle = theme.flash;
        ctx.fillRect(0, 0, viewW, LOGICAL_H);
        ctx.globalAlpha = 1;
      }

      ctx.drawImage(vignette, 0, 0);
    },

    setTheme(next: ArcadeTheme): void {
      theme = next;
      atlas.dispose();
      atlas = createAtlas(theme);
      bgGradient = makeBg();
      vignette = makeVignette();
      groundStrip = makeGroundStrip();
    },

    setViewWidth(w: number): void {
      if (w === viewW) return;
      viewW = w;
      vignette = makeVignette();
      groundStrip = makeGroundStrip();
    },

    dispose(): void {
      atlas.dispose();
    },
  };
}
