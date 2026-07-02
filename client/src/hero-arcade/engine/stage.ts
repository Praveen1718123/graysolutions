// Gray Arcade — the scripted stage. Owns the state machine
// (attract → playing → gate → complete, plus skip) and the level timeline:
// chaos debris → four service rings (ascending) → launch gate. Difficulty is
// deliberately trivial; a visitor mashing space still reaches the gate.

import {
  AMBIENT_DRIFT,
  ATTRACT_DRIFT,
  BASE_SPEED,
  GROUND_Y,
  LOGICAL_H,
  PARTICLE_CAP,
  RING_APPROACH_DIST,
  RING_APPROACH_FACTOR,
  RUNNER_H,
  RUNNER_W,
  RUNNER_X,
  STUMBLE_SPEED_FACTOR,
  STUMBLE_TIME,
  buildWorld,
  spawnBurst,
  type QualityTier,
  type StageState,
  type World,
} from "./entities";
import { passesThroughRing, queueJump, runnerCenterY, stepRunner } from "./physics";
import { mulberry32 } from "./sprites";

export type StageEvent =
  | { type: "start" }
  | { type: "ring"; index: number; cleared: boolean; xPct: number; yPct: number }
  | { type: "gate" }
  | { type: "complete"; score: number; skipped: boolean }
  | { type: "score"; score: number }
  | { type: "stumble" };

export interface Stage {
  readonly world: World;
  update(dt: number): void;
  /** A press (space/tap). Returns true if the input was consumed. */
  press(): boolean;
  skip(): void;
  replay(): void;
  setQuality(tier: QualityTier): void;
  state(): StageState;
}

const RING_SCORE = 250;
const GATE_SCORE = 500;
const GATE_HOLD = 0.6; // s in 'gate' state before 'complete'
const FLASH_TIME = 0.3; // single ≤300ms white-out, per a11y rule

export function createStage(
  mobile: boolean,
  debrisLabels: boolean,
  emit: (e: StageEvent) => void,
): Stage {
  let world = buildWorld(mobile, debrisLabels);
  const rand = mulberry32(0xa11ce);

  const runnerWorldX = (): number => world.scrollX + RUNNER_X;

  function addScore(points: number): void {
    world.score += points;
    emit({ type: "score", score: world.score });
  }

  function enterComplete(skipped: boolean): void {
    world.state = "complete";
    world.skipped = skipped;
    world.t = 0;
    emit({ type: "complete", score: world.score, skipped });
  }

  function updatePlaying(dt: number): void {
    // World speed: ease ~30% slower on ring approach so timing feels generous.
    const rwx = runnerWorldX();
    const next = world.rings.find((r) => !r.resolved);
    const approaching = next !== undefined && next.x - rwx > 0 && next.x - rwx < RING_APPROACH_DIST;
    const target = approaching ? RING_APPROACH_FACTOR : 1;
    world.speedFactor += (target - world.speedFactor) * Math.min(1, 3 * dt);
    const stumbleFactor = world.runner.stumbleT > 0 ? STUMBLE_SPEED_FACTOR : 1;
    const advance = BASE_SPEED * world.speedFactor * stumbleFactor * dt;
    world.scrollX += advance;
    world.driftX += advance;

    stepRunner(world.runner, dt);

    // Debris: miss = stumble + screen nudge, never death.
    for (const d of world.debris) {
      if (d.hit) continue;
      const overlapX = d.x < rwx + RUNNER_W - 6 && d.x + d.w > rwx + 6;
      if (overlapX && world.runner.y >= GROUND_Y - d.h) {
        d.hit = true;
        world.runner.stumbleT = STUMBLE_TIME;
        world.shakeT = 0.15;
        spawnBurst(world, RUNNER_X + RUNNER_W / 2, GROUND_Y - 4, 10, 60, rand);
        emit({ type: "stumble" });
      }
    }

    // Rings: resolve at the moment each crosses the runner plane.
    for (const ring of world.rings) {
      if (ring.resolved || ring.x > rwx) continue;
      ring.resolved = true;
      ring.cleared = passesThroughRing(world.runner, ring);
      if (ring.cleared) {
        addScore(RING_SCORE);
        spawnBurst(world, RUNNER_X + RUNNER_W / 2, ring.cy, 26, 120, rand);
        world.popups.push({
          x: RUNNER_X + RUNNER_W + 6,
          y: ring.cy - 18,
          text: `+${RING_SCORE}`,
          t: 0,
          ttl: 0.9,
        });
      }
      emit({
        type: "ring",
        index: ring.index,
        cleared: ring.cleared,
        xPct: RUNNER_X / 480,
        yPct: ring.cy / LOGICAL_H,
      });
    }

    // Launch gate.
    if (!world.gate.passed && world.gate.x <= rwx) {
      world.gate.passed = true;
      world.state = "gate";
      world.gateT = 0;
      world.flashT = FLASH_TIME;
      addScore(GATE_SCORE);
      spawnBurst(world, RUNNER_X + RUNNER_W / 2, GROUND_Y - RUNNER_H, 36, 160, rand);
      emit({ type: "gate" });
      // Give the leap-through read even if the visitor never jumped.
      if (world.runner.grounded) queueJump(world.runner);
    }
  }

  return {
    get world() {
      return world;
    },

    update(dt: number): void {
      world.t += dt;
      if (world.shakeT > 0) world.shakeT -= dt;
      if (world.flashT > 0) world.flashT -= dt;

      switch (world.state) {
        case "attract":
          // Only the starfield drifts while idle — the level itself holds
          // its start positions, so beginning the run never snaps.
          world.driftX += ATTRACT_DRIFT * dt;
          world.runner.animT += dt;
          break;
        case "playing":
          updatePlaying(dt);
          break;
        case "gate": {
          world.gateT += dt;
          const advance = BASE_SPEED * 0.6 * dt;
          world.scrollX += advance;
          world.driftX += advance;
          stepRunner(world.runner, dt);
          if (world.gateT >= GATE_HOLD) enterComplete(false);
          break;
        }
        case "complete":
          world.driftX += AMBIENT_DRIFT * dt;
          world.runner.animT += dt;
          break;
      }

      // Particles + popups tick in every state (ambient sparks keep drifting).
      for (let i = world.particles.length - 1; i >= 0; i--) {
        const p = world.particles[i];
        p.t += dt;
        if (p.t >= p.ttl) {
          world.particles.splice(i, 1);
          continue;
        }
        p.vy += 220 * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
      }
      for (let i = world.popups.length - 1; i >= 0; i--) {
        const pop = world.popups[i];
        pop.t += dt;
        pop.y -= 18 * dt;
        if (pop.t >= pop.ttl) world.popups.splice(i, 1);
      }
    },

    press(): boolean {
      switch (world.state) {
        case "attract":
          world.state = "playing";
          world.t = 0;
          emit({ type: "start" });
          return true;
        case "playing":
          queueJump(world.runner);
          return true;
        default:
          // Enter/Space = jump only while playing (a11y rule).
          return false;
      }
    },

    skip(): void {
      if (world.state === "complete") return;
      enterComplete(true);
    },

    replay(): void {
      const quality = world.quality;
      const driftX = world.driftX;
      world = buildWorld(mobile, debrisLabels);
      world.quality = quality;
      world.driftX = driftX; // starfield keeps drifting seamlessly
      // Replay skips the attract screen — the visitor asked to run again.
      world.state = "playing";
      emit({ type: "start" });
    },

    setQuality(tier: QualityTier): void {
      world.quality = tier;
      // Enforce the new cap on already-alive particles, not just new spawns.
      const cap = PARTICLE_CAP[tier];
      if (world.particles.length > cap) world.particles.length = cap;
    },

    state(): StageState {
      return world.state;
    },
  };
}

/** Runner center-y as a fraction of stage height — used by overlays. */
export function runnerYPct(world: World): number {
  return runnerCenterY(world.runner) / LOGICAL_H;
}
