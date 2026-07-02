// Gray Arcade — canvas compositor. Draws the parallax space, entities, fx,
// and in-canvas text at a fixed 480×240 logical resolution. All colors come
// from the active theme; all sprite pixels come from the atlas.

import { COPY, PARKED_RINGS } from "../content";
import type { ArcadeTheme } from "../theme";
import {
  GROUND_Y,
  LOGICAL_H,
  LOGICAL_W,
  RUNNER_H,
  RUNNER_W,
  RUNNER_X,
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

export function createRenderer(ctx: CanvasRenderingContext2D, initialTheme: ArcadeTheme): Renderer {
  let theme = initialTheme;
  let atlas: SpriteAtlas = createAtlas(theme);

  // Static prerenders rebuilt on theme change.
  let bgGradient = makeBg();
  const vignette = makeVignette();

  const sparkles: Sparkle[] = [];
  const srand = mulberry32(0x5eed);
  for (let i = 0; i < 26; i++) {
    sparkles.push({ x: srand() * LOGICAL_W, y: srand() * (LOGICAL_H - 60), phase: srand() * Math.PI * 2 });
  }

  function makeBg(): CanvasGradient {
    const g = ctx.createLinearGradient(0, 0, 0, LOGICAL_H);
    g.addColorStop(0, theme.space.top);
    g.addColorStop(1, theme.space.bottom);
    return g;
  }

  function makeVignette(): HTMLCanvasElement {
    const c = document.createElement("canvas");
    c.width = LOGICAL_W;
    c.height = LOGICAL_H;
    const vctx = c.getContext("2d");
    if (vctx) {
      const g = vctx.createRadialGradient(
        LOGICAL_W / 2,
        LOGICAL_H / 2,
        LOGICAL_H * 0.55,
        LOGICAL_W / 2,
        LOGICAL_H / 2,
        LOGICAL_W * 0.72,
      );
      g.addColorStop(0, "rgba(0,0,0,0)");
      g.addColorStop(1, "rgba(0,0,0,0.42)");
      vctx.fillStyle = g;
      vctx.fillRect(0, 0, LOGICAL_W, LOGICAL_H);
    }
    return c;
  }

  function drawGroundLine(): void {
    ctx.fillStyle = theme.ground.glow;
    ctx.fillRect(0, GROUND_Y + 1, LOGICAL_W, 3);
    ctx.fillStyle = theme.ground.line;
    ctx.fillRect(0, GROUND_Y, LOGICAL_W, 1);
  }

  function drawRunScene(world: World): void {
    // Gate (behind rings once passed, so draw first).
    const gateScreenX = world.gate.x - world.scrollX;
    if (gateScreenX > -100 && gateScreenX < LOGICAL_W + 40) {
      const pulse = 0.82 + 0.18 * Math.sin(world.t * 2.4);
      atlas.drawGate(ctx, gateScreenX, GROUND_Y, pulse);
    }

    // Rings — cleared rings dim; missed rings drift behind at full glow so
    // they stay "hoverable later" in the completed scene.
    for (const ring of world.rings) {
      const sx = ring.x - world.scrollX;
      if (sx < -60 || sx > LOGICAL_W + 60) continue;
      const flicker = 0.78 + 0.22 * Math.sin(world.t * 5 + ring.index * 1.7);
      const alpha = ring.cleared ? 0.35 : flicker;
      atlas.drawRing(ctx, ring.variant, sx, ring.cy, alpha);
    }

    // Debris.
    for (const d of world.debris) {
      const sx = d.x - world.scrollX;
      if (sx < -40 || sx > LOGICAL_W + 40) continue;
      atlas.drawRock(ctx, d.variant, sx, GROUND_Y);
      if (d.label) {
        drawTextCentered(ctx, d.label, sx + d.w / 2, GROUND_Y - 38, 1, theme.debris.label);
      }
    }

    // Runner.
    atlas.drawRunner(ctx, pickRunnerFrame(world), RUNNER_X, Math.round(world.runner.y) - RUNNER_H);
  }

  function drawCompleteScene(world: World): void {
    // Rings park in a static ascending arc; DOM hotspots sit at these same
    // fractions (PARKED_RINGS is the shared source of truth).
    PARKED_RINGS.forEach((p, i) => {
      const flicker = 0.8 + 0.2 * Math.sin(world.t * 2.2 + i * 1.3);
      atlas.drawRing(ctx, (i % 2) as 0 | 1, p.x * LOGICAL_W, p.y * LOGICAL_H, flicker);
    });
    // Runner idles at the left, facing the scene.
    atlas.drawRunner(ctx, pickRunnerFrame(world), 34, GROUND_Y - RUNNER_H);
  }

  return {
    draw(world: World): void {
      ctx.save();

      // Screen nudge on stumble — a tiny decaying shake, never violent.
      if (world.shakeT > 0) {
        const k = world.shakeT / 0.15;
        ctx.translate(Math.sin(world.t * 70) * 2 * k, Math.cos(world.t * 55) * 1.5 * k);
      }

      ctx.fillStyle = bgGradient;
      ctx.fillRect(-4, -4, LOGICAL_W + 8, LOGICAL_H + 8);

      // Parallax plates: far → near.
      atlas.drawPlate(ctx, 0, world.scrollX * 0.15);
      atlas.drawPlate(ctx, 1, world.scrollX * 0.35);
      atlas.drawPlate(ctx, 2, world.scrollX * 0.7);

      // Twinkling foreground sparkles (skipped entirely on the low tier).
      const sparkleN = SPARKLE_COUNT[world.quality];
      if (sparkleN > 0) {
        ctx.fillStyle = theme.stars[2];
        for (let i = 0; i < sparkleN; i++) {
          const s = sparkles[i];
          const tw = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(world.t * 1.8 + s.phase));
          ctx.globalAlpha = tw;
          const x = (((s.x - world.scrollX * 0.5) % LOGICAL_W) + LOGICAL_W) % LOGICAL_W;
          ctx.fillRect(x, s.y, 1, 1);
        }
        ctx.globalAlpha = 1;
      }

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
          drawTextCentered(ctx, COPY.attract, LOGICAL_W / 2, 64, 2, theme.canvasText.bright);
        }
      }

      ctx.restore();

      // Gate white-out — one ≤300ms fade, drawn unshaken.
      if (world.flashT > 0) {
        ctx.globalAlpha = Math.min(1, world.flashT / FLASH_TIME) * 0.85;
        ctx.fillStyle = theme.flash;
        ctx.fillRect(0, 0, LOGICAL_W, LOGICAL_H);
        ctx.globalAlpha = 1;
      }

      ctx.drawImage(vignette, 0, 0);
    },

    setTheme(next: ArcadeTheme): void {
      theme = next;
      atlas.dispose();
      atlas = createAtlas(theme);
      bgGradient = makeBg();
    },

    dispose(): void {
      atlas.dispose();
    },
  };
}
