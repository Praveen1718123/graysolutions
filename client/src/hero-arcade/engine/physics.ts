// Gray Arcade — jetpack flight physics. One button: hold = thrust up,
// release = drift down. Deliberately gentle — capped speeds, a soft ceiling,
// and a generous ring aperture make aiming at a ring altitude trivial.

import { GROUND_Y, RING_APERTURE, RUNNER_H, type RingEnt, type RunnerEnt } from "./entities";

export const GRAVITY = 520; // px/s² falling
export const THRUST = -1150; // px/s² while thrusting (net climb ≈ −630)
export const VY_MAX = 170; // px/s speed cap both directions
export const CEIL_Y = 80; // feet never rise above this (stays under the HUD)
export const TAP_BOOST = 0.16; // s of thrust granted by a discrete tap

/** Advance the flyer one fixed step. */
export function stepFlyer(r: RunnerEnt, dt: number, thrust: boolean): void {
  r.vy += (thrust ? THRUST : 0) * dt + GRAVITY * dt;
  if (r.vy > VY_MAX) r.vy = VY_MAX;
  if (r.vy < -VY_MAX) r.vy = -VY_MAX;
  r.y += r.vy * dt;
  if (r.y >= GROUND_Y) {
    r.y = GROUND_Y;
    r.vy = 0;
    r.grounded = true;
  } else {
    r.grounded = false;
    if (r.y < CEIL_Y) {
      r.y = CEIL_Y;
      if (r.vy < 0) r.vy = 0;
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
