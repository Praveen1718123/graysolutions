// Gray Arcade — engine entry. This module is the lazy chunk: the hero shell
// dynamic-imports it on idle/visibility, so nothing here may be needed for
// first paint. Assembles stage + renderer + loop + input into a controller.

import type { ArcadeTheme } from "../theme";
import { LOGICAL_H, LOGICAL_W, type QualityTier, type StageState } from "./entities";
import { bindInput } from "./input";
import { createLoop } from "./loop";
import { createRenderer } from "./render";
import { createStage, type StageEvent } from "./stage";

export type { StageEvent } from "./stage";
export type { StageState } from "./entities";

export interface EngineOptions {
  canvas: HTMLCanvasElement;
  /** Element that receives pointer/keyboard input (the stage container). */
  inputEl: HTMLElement;
  theme: ArcadeTheme;
  mobile: boolean;
  debrisLabels: boolean;
  onEvent: (e: StageEvent) => void;
}

export interface ArcadeEngine {
  start(): void;
  pause(): void;
  resume(): void;
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
  const { canvas, inputEl, mobile, debrisLabels, onEvent } = opts;

  canvas.width = Math.round(LOGICAL_W * DPR);
  canvas.height = Math.round(LOGICAL_H * DPR);
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) throw new Error("2d context unavailable");
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  ctx.imageSmoothingEnabled = false;

  const stage = createStage(mobile, debrisLabels, onEvent);
  const renderer = createRenderer(ctx, opts.theme);

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
  const loop = createLoop(
    (dt) => stage.update(dt),
    () => renderer.draw(stage.world),
    (tier: QualityTier) => stage.setQuality(tier),
  );
  const unbindInput = bindInput(inputEl, () => stage.press());

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
      unbindInput();
      loop.destroy();
      renderer.dispose();
    },
  };
}
