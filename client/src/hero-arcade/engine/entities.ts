// Gray Arcade — world model. Entity types, stage layout constants, and the
// world builder. All coordinates are in logical canvas units (480×240);
// world-x is distance scrolled from the start line.

import { DEBRIS_LABEL_TEXT } from "../content";

// ── Stage geometry ──────────────────────────────────────────────────────────
export const LOGICAL_W = 480;
export const LOGICAL_H = 240;
export const GROUND_Y = 210; // runner feet line
export const RUNNER_X = 96; // runner's fixed screen x (left edge of sprite)
export const RUNNER_W = 24;
export const RUNNER_H = 32;

// ── Motion ──────────────────────────────────────────────────────────────────
export const BASE_SPEED = 160; // world px/s
export const ATTRACT_DRIFT = 12; // starfield drift while idle
export const AMBIENT_DRIFT = 8; // starfield drift after completion
export const RING_APPROACH_DIST = 260; // slow down inside this range
export const RING_APPROACH_FACTOR = 0.68; // ≈30% ease per brief
export const STUMBLE_TIME = 0.45; // s
export const STUMBLE_SPEED_FACTOR = 0.85;

// ── Level layout (world-x positions) ────────────────────────────────────────
// ~19–21s at BASE_SPEED with ring-approach easing. Chaos zone first, then the
// four service rings in an ascending arc, then the launch gate.
const DEBRIS_X_DESKTOP = [340, 500, 660];
const DEBRIS_X_MOBILE = [380, 640];
export const RING_LAYOUT: readonly { x: number; cy: number }[] = [
  { x: 1000, cy: 168 },
  { x: 1450, cy: 150 },
  { x: 1900, cy: 132 },
  { x: 2350, cy: 114 },
] as const;
export const RING_APERTURE = 32; // |runner center − ring center| tolerance (generous)
export const GATE_X = 2850;

export type QualityTier = 0 | 1 | 2; // 0 = high, 2 = low
export const PARTICLE_CAP: Record<QualityTier, number> = { 0: 140, 1: 80, 2: 36 };
export const SPARKLE_COUNT: Record<QualityTier, number> = { 0: 26, 1: 14, 2: 0 };

// ── Entities ────────────────────────────────────────────────────────────────
export interface RingEnt {
  index: number;
  x: number;
  cy: number;
  variant: 0 | 1;
  resolved: boolean; // has crossed the runner plane
  cleared: boolean;
}

export interface DebrisEnt {
  x: number;
  w: number;
  h: number;
  variant: 0 | 1 | 2 | 3;
  hit: boolean;
  label: string | null;
}

export interface GateEnt {
  x: number;
  passed: boolean;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  t: number;
  ttl: number;
  size: number;
  color: 0 | 1 | 2; // index into theme.particles
}

export interface Popup {
  x: number; // screen-x
  y: number;
  text: string;
  t: number;
  ttl: number;
}

export interface RunnerEnt {
  y: number; // feet y
  vy: number;
  grounded: boolean;
  bufferT: number; // jump input buffer remaining
  stumbleT: number; // stumble animation remaining
  animT: number; // run-cycle clock
}

export type StageState = "attract" | "playing" | "gate" | "complete";

export interface World {
  state: StageState;
  skipped: boolean;
  t: number; // elapsed seconds in current state machine life
  scrollX: number;
  speedFactor: number; // eased toward ring-approach target
  runner: RunnerEnt;
  rings: RingEnt[];
  debris: DebrisEnt[];
  gate: GateEnt;
  particles: Particle[];
  popups: Popup[];
  score: number;
  shakeT: number;
  flashT: number; // gate white-out remaining (single ≤300ms pulse)
  gateT: number; // time spent in 'gate' state
  quality: QualityTier;
  mobile: boolean;
}

export function buildWorld(mobile: boolean, debrisLabels: boolean): World {
  const debrisXs = mobile ? DEBRIS_X_MOBILE : DEBRIS_X_DESKTOP;
  return {
    state: "attract",
    skipped: false,
    t: 0,
    scrollX: 0,
    speedFactor: 1,
    runner: { y: GROUND_Y, vy: 0, grounded: true, bufferT: 0, stumbleT: 0, animT: 0 },
    rings: RING_LAYOUT.map((r, i) => ({
      index: i,
      x: r.x,
      cy: r.cy,
      variant: (i % 2) as 0 | 1,
      resolved: false,
      cleared: false,
    })),
    debris: debrisXs.map((x, i) => ({
      x,
      w: 18 + ((i * 7) % 8),
      h: 11 + ((i * 5) % 6),
      variant: (i % 4) as 0 | 1 | 2 | 3,
      hit: false,
      label: debrisLabels ? DEBRIS_LABEL_TEXT[i % DEBRIS_LABEL_TEXT.length] : null,
    })),
    gate: { x: GATE_X, passed: false },
    particles: [],
    popups: [],
    score: 0,
    shakeT: 0,
    flashT: 0,
    gateT: 0,
    quality: 0,
    mobile,
  };
}

/** Spawn a particle burst, respecting the current quality-tier cap. */
export function spawnBurst(
  w: World,
  x: number,
  y: number,
  count: number,
  speed: number,
  rand: () => number,
): void {
  const cap = PARTICLE_CAP[w.quality];
  const n = Math.min(count, cap - w.particles.length);
  for (let i = 0; i < n; i++) {
    const ang = rand() * Math.PI * 2;
    const v = speed * (0.35 + rand() * 0.65);
    w.particles.push({
      x,
      y,
      vx: Math.cos(ang) * v,
      vy: Math.sin(ang) * v - speed * 0.25,
      t: 0,
      ttl: 0.5 + rand() * 0.5,
      size: rand() < 0.3 ? 2 : 1,
      color: (i % 3) as 0 | 1 | 2,
    });
  }
}
