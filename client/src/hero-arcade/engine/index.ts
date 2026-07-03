// Gray Arcade — engine entry. This module is the lazy chunk: the hero shell
// dynamic-imports it on idle/visibility, so nothing here may be needed for
// first paint. Assembles stage + renderer + loop + global-key input into a
// controller. The shell's playfield button drives press() directly.

import type { ArcadeTheme } from "../theme";
import {
  LOGICAL_H,
  LOGICAL_W,
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
   * Full-bleed hero layout: the engine owns the whole hero canvas and paints
   * its own space scene (the site's photo backdrop is hidden); the runner
   * anchor, attract line, and parked rings shift right of the hero copy.
   */
  fullBleed?: boolean;
  /**
   * Track the stage element's aspect ratio (ResizeObserver): wide stages
   * grow logical width, tall stages (mobile band) grow logical height.
   * Off for the fixed 2:1 review card.
   */
  dynamicView?: boolean;
  onEvent: (e: StageEvent) => void;
}

export interface ArcadeEngine {
  start(): void;
  pause(): void;
  resume(): void;
  /** A discrete press from the playfield (tap/click/Enter/Space). */
  press(): boolean;
  /** Hold-to-fly: thrust on while the button/key is held. */
  setThrust(on: boolean): void;
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

  const fullBleed = opts.fullBleed === true;
  const dynamicView = opts.dynamicView === true || fullBleed;
  const maybeCtx = canvas.getContext("2d", { alpha: false });
  if (!maybeCtx) throw new Error("2d context unavailable");
  const ctx = maybeCtx;

  // Logical viewport: pixels stay square at any stage aspect. Wider than
  // 2:1 grows width (240 rows fixed); taller grows height (the world
  // anchors to the bottom, sky extends above). Review card stays 480×240.
  const logicalFor = (rect: { width: number; height: number }): [number, number] => {
    const aspect = rect.width / rect.height;
    if (aspect >= LOGICAL_W / LOGICAL_H) {
      return [Math.max(LOGICAL_W, Math.min(1600, Math.round(aspect * LOGICAL_H))), LOGICAL_H];
    }
    return [LOGICAL_W, Math.max(LOGICAL_H, Math.min(960, Math.round(LOGICAL_W / aspect)))];
  };

  let viewW = LOGICAL_W;
  let viewH = LOGICAL_H;
  if (dynamicView && canvas.parentElement) {
    const rect = canvas.parentElement.getBoundingClientRect();
    if (rect.width >= 1 && rect.height >= 1) [viewW, viewH] = logicalFor(rect);
  }

  // Full-bleed: anchor the runner ~42% across the initial view — clear of
  // the copy column, leading the action zone on the right.
  const stage = createStage(
    mobile,
    debrisLabels,
    onEvent,
    fullBleed ? Math.round(viewW * 0.42) : undefined,
  );
  const renderer = createRenderer(ctx, opts.theme, fullBleed);

  function applySize(w: number, h: number): void {
    viewW = w;
    viewH = h;
    canvas.width = Math.round(viewW * DPR);
    canvas.height = Math.round(viewH * DPR);
    // Resizing resets canvas context state.
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.imageSmoothingEnabled = false;
    renderer.setViewSize(viewW, viewH);
  }
  applySize(viewW, viewH);

  let ro: ResizeObserver | null = null;
  if (dynamicView && canvas.parentElement) {
    ro = new ResizeObserver((entries) => {
      const r = entries[0]?.contentRect;
      if (!r || r.width < 1 || r.height < 1) return;
      const [w, h] = logicalFor(r);
      if (w !== viewW || h !== viewH) applySize(w, h);
    });
    ro.observe(canvas.parentElement);
  }
  const loop = createLoop(
    (dt) => stage.update(dt),
    () => renderer.draw(stage.world),
    (tier: QualityTier) => stage.setQuality(tier),
  );

  // Global Space/ArrowUp only ever act mid-run while the loop is live —
  // paused (off-screen/hidden tab) or idle stages never touch page scroll.
  const unbindKeys = bindGlobalKeys({
    canConsume: () => loop.running && stage.state() === "playing",
    onPress: () => {
      stage.setThrust(true);
      return stage.press();
    },
    onRelease: () => stage.setThrust(false),
  });

  // Dev-only debug handle for tuning and automated verification. tick()
  // advances the simulation manually (useful where rAF is throttled).
  if (import.meta.env.DEV) {
    (window as unknown as { __arcade?: unknown }).__arcade = {
      press: () => stage.press(),
      setThrust: (on: boolean) => stage.setThrust(on),
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
      // Never leave thrust latched while frozen off-screen.
      stage.setThrust(false);
      loop.pause();
    },
    resume(): void {
      loop.resume();
    },
    press(): boolean {
      return stage.press();
    },
    setThrust(on: boolean): void {
      stage.setThrust(on);
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
      ro?.disconnect();
      loop.destroy();
      renderer.dispose();
      if (import.meta.env.DEV) {
        delete (window as unknown as { __arcade?: unknown }).__arcade;
      }
    },
  };
}
