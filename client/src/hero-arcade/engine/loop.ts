// Gray Arcade — rAF loop with a fixed physics timestep and a frame-time
// monitor that degrades quality (particle counts first) before frame rate.

import type { QualityTier } from "./entities";

export interface Loop {
  start(): void;
  pause(): void;
  resume(): void;
  destroy(): void;
  readonly running: boolean;
}

const STEP = 1 / 60;
const MAX_STEPS = 4; // spiral-of-death guard
const DEGRADE_MS = 22; // sustained frames slower than this → drop a tier
const DEGRADE_FRAMES = 45;

export function createLoop(
  update: (dt: number) => void,
  render: () => void,
  onQualityChange: (tier: QualityTier) => void,
): Loop {
  let raf = 0;
  let running = false;
  let last = 0;
  let acc = 0;
  let emaMs = 16.7;
  let slowFrames = 0;
  let tier: QualityTier = 0;
  let destroyed = false;

  const frame = (now: number): void => {
    if (!running) return;
    const deltaMs = last === 0 ? 16.7 : now - last;
    last = now;

    // Adaptive quality: degrade once per sustained slow window, never above 2.
    emaMs = emaMs * 0.9 + deltaMs * 0.1;
    if (emaMs > DEGRADE_MS) {
      slowFrames++;
      if (slowFrames >= DEGRADE_FRAMES && tier < 2) {
        tier = (tier + 1) as QualityTier;
        slowFrames = 0;
        onQualityChange(tier);
      }
    } else if (slowFrames > 0) {
      slowFrames--;
    }

    acc += Math.min(deltaMs / 1000, 0.25);
    let steps = 0;
    while (acc >= STEP && steps < MAX_STEPS) {
      update(STEP);
      acc -= STEP;
      steps++;
    }
    if (steps === MAX_STEPS) acc = 0; // drop backlog rather than snowball

    render();
    raf = requestAnimationFrame(frame);
  };

  const begin = (): void => {
    if (running || destroyed) return;
    running = true;
    last = 0;
    raf = requestAnimationFrame(frame);
  };

  const halt = (): void => {
    running = false;
    cancelAnimationFrame(raf);
  };

  return {
    start: begin,
    pause: halt,
    resume: begin,
    destroy(): void {
      halt();
      destroyed = true;
    },
    get running() {
      return running;
    },
  };
}
