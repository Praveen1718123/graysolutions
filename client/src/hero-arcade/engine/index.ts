// Gray Arcade — engine entry. This module is the lazy chunk: the hero shell
// dynamic-imports it on idle/visibility, so nothing here may be needed for
// first paint. Assembles stage + renderer + loop + global-key input into a
// controller. The shell's playfield button drives press() directly.

import type { ArcadeTheme } from "../theme";
import {
  LOGICAL_H,
  LOGICAL_W,
  RUNNER_X_FULL,
  type QualityTier,
  type StageState,
} from "./entities";
import { bindGlobalKeys } from "./input";
import { createLoop } from "./loop";
import { createRenderer } from "./render";
import { createStage, type StageEvent } from "./stage";

export type { StageEvent } from "./stage";
export type { StageState } from "./entities";

export interface EngineOptions {
  canvas: HTMLCanvasElement;
  theme: ArcadeTheme;
  mobile: boolean;
  debrisLabels: boolean;
  /**
   * Full-bleed hero layout: transparent canvas composited over the site
   * backdrop — no space gradient, no parallax plates, no vignette; parked
   * rings shift to the right airspace clear of the hero copy.
   */
  transparent?: boolean;
  onEvent: (e: StageEvent) => void;
}

export interface ArcadeEngine {
  start(): void;
  pause(): void;
  resume(): void;
  /** A press from the playfield button (tap/click/Enter/Space). */
  press(): boolean;
  skip(): void;
  replay(): void;
  setTheme(theme: ArcadeTheme): void;
  state(): StageState;
  destroy(): void;
}

// Fixed logical resolution, DPR-capped at 2. CSS scales the canvas with
// image-rendering: pixelated, so the backing store never needs to resize.
const DPR = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);

export function createEngine(opts: EngineOptions): ArcadeEngine {
  const { canvas, mobile, debrisLabels, onEvent } = opts;

  const transparent = opts.transparent === true;
  canvas.width = Math.round(LOGICAL_W * DPR);
  canvas.height = Math.round(LOGICAL_H * DPR);
  const ctx = canvas.getContext("2d", { alpha: transparent });
  if (!ctx) throw new Error("2d context unavailable");
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  ctx.imageSmoothingEnabled = false;

  const stage = createStage(mobile, debrisLabels, onEvent, transparent ? RUNNER_X_FULL : undefined);
  const renderer = createRenderer(ctx, opts.theme, transparent);
  const loop = createLoop(
    (dt) => stage.update(dt),
    () => renderer.draw(stage.world),
    (tier: QualityTier) => stage.setQuality(tier),
  );

  // Global Space/ArrowUp only ever act mid-run while the loop is live —
  // paused (off-screen/hidden tab) or idle stages never touch page scroll.
  const unbindKeys = bindGlobalKeys({
    canConsume: () => loop.running && stage.state() === "playing",
    onPress: () => stage.press(),
  });

  // Dev-only debug handle for tuning and automated verification. tick()
  // advances the simulation manually (useful where rAF is throttled).
  if (import.meta.env.DEV) {
    (window as unknown as { __arcade?: unknown }).__arcade = {
      press: () => stage.press(),
      skip: () => stage.skip(),
      replay: () => stage.replay(),
      world: () => stage.world,
      tick: (seconds: number) => {
        const step = 1 / 60;
        for (let t = 0; t < seconds; t += step) stage.update(step);
        renderer.draw(stage.world);
      },
    };
  }

  return {
    start(): void {
      loop.start();
    },
    pause(): void {
      loop.pause();
    },
    resume(): void {
      loop.resume();
    },
    press(): boolean {
      return stage.press();
    },
    skip(): void {
      stage.skip();
    },
    replay(): void {
      stage.replay();
      loop.resume();
    },
    setTheme(theme: ArcadeTheme): void {
      renderer.setTheme(theme);
    },
    state(): StageState {
      return stage.state();
    },
    destroy(): void {
      unbindKeys();
      loop.destroy();
      renderer.dispose();
      if (import.meta.env.DEV) {
        delete (window as unknown as { __arcade?: unknown }).__arcade;
      }
    },
  };
}
