// Gray Arcade — jump physics. Deliberately generous: the stage is a
// narrative, not a challenge. Apex ≈104px clears the highest ring (96px
// above ground) with margin, and a 120ms input buffer forgives early taps.

import { GROUND_Y, RING_APERTURE, RUNNER_H, type RingEnt, type RunnerEnt } from "./entities";

export const GRAVITY = 1500; // px/s²
export const JUMP_V = -560; // px/s  → apex = v²/2g ≈ 104px
export const JUMP_BUFFER = 0.12; // s

/** Queue a jump; lands immediately if grounded, else buffers briefly. */
export function queueJump(r: RunnerEnt): void {
  r.bufferT = JUMP_BUFFER;
}

/** Advance the runner one fixed step. */
export function stepRunner(r: RunnerEnt, dt: number): void {
  if (r.bufferT > 0) {
    r.bufferT -= dt;
    if (r.grounded) {
      r.vy = JUMP_V;
      r.grounded = false;
      r.bufferT = 0;
    }
  }
  if (!r.grounded) {
    r.vy += GRAVITY * dt;
    r.y += r.vy * dt;
    if (r.y >= GROUND_Y) {
      r.y = GROUND_Y;
      r.vy = 0;
      r.grounded = true;
    }
  }
  if (r.stumbleT > 0) r.stumbleT -= dt;
  r.animT += dt;
}

/** Vertical center of the runner's body. */
export function runnerCenterY(r: RunnerEnt): number {
  return r.y - RUNNER_H / 2;
}

/** Clearance check at the moment a ring crosses the runner plane. */
export function passesThroughRing(r: RunnerEnt, ring: RingEnt): boolean {
  return Math.abs(runnerCenterY(r) - ring.cy) <= RING_APERTURE;
}
