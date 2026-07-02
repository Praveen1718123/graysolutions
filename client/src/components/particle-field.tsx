import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * ParticleField — a full-bleed, monochrome 3D galaxy for the hero.
 *
 * A tilted spiral galaxy: a bright dense core (bulge), stars swept into spiral
 * arms on an inclined disk, and a faint star halo filling the rest of the
 * frame. The whole galaxy rotates slowly (real perspective → genuine depth).
 * Stars twinkle subtly, and respond to the cursor *gently and individually* —
 * a soft drift away + a glow-up — not a fast snap. Greyscale only.
 *
 * Canvas 2D, no deps. Respects prefers-reduced-motion, pauses off-screen /
 * when hidden, caps DPR.
 */

type Star = {
  x: number; y: number; z: number; // base position in galaxy space
  ox: number; oy: number;          // screen-space offset (cursor drift)
  vx: number; vy: number;          // offset velocity
  s: number;                       // size jitter
  bb: number;                      // base brightness
  tw: number;                      // twinkle phase
};

const TAU = Math.PI * 2;
// gentle gaussian-ish jitter in [-1.5, 1.5]
const rndN = () => Math.random() + Math.random() + Math.random() - 1.5;

export default function ParticleField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const parent = canvas.parentElement!;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // ── Soft glow sprite ──────────────────────────────────────────────────
    const sprite = document.createElement("canvas");
    const SP = 64;
    sprite.width = SP;
    sprite.height = SP;
    const sctx = sprite.getContext("2d")!;
    const g = sctx.createRadialGradient(SP / 2, SP / 2, 0, SP / 2, SP / 2, SP / 2);
    g.addColorStop(0, "rgba(255,255,255,0.95)");
    g.addColorStop(0.35, "rgba(255,255,255,0.45)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    sctx.fillStyle = g;
    sctx.fillRect(0, 0, SP, SP);

    // ── Build the galaxy ──────────────────────────────────────────────────
    const small = window.innerWidth < 768;
    const COUNT = small ? 2000 : 4400;
    const ARMS = 3;
    const TWIST = 3.4; // how tightly arms wrap
    const stars: Star[] = [];
    for (let i = 0; i < COUNT; i++) {
      const role = Math.random();
      let x: number, y: number, z: number, bb: number;
      if (role < 0.64) {
        // spiral-arm disk star
        const rr = Math.pow(Math.random(), 1.8); // dense toward centre
        const arm = Math.floor(Math.random() * ARMS);
        const jitter = rndN() * (0.18 + (1 - rr) * 0.25);
        const ang = arm * (TAU / ARMS) + rr * TWIST + jitter;
        const radius = 0.12 + rr * 1.05;
        x = Math.cos(ang) * radius;
        z = Math.sin(ang) * radius;
        y = rndN() * (0.04 + (1 - rr) * 0.10); // thin disk, fatter near core
        bb = 0.45 + Math.random() * 0.5;
      } else if (role < 0.80) {
        // central bulge (bright core)
        const rr = Math.pow(Math.random(), 2.2) * 0.28;
        const u = Math.random() * 2 - 1;
        const th = Math.random() * TAU;
        const rp = Math.sqrt(1 - u * u);
        x = rp * Math.cos(th) * rr;
        y = u * rr * 0.7;
        z = rp * Math.sin(th) * rr;
        bb = 0.7 + Math.random() * 0.3;
      } else {
        // faint halo / field stars — fill the frame, add depth
        const rr = 0.5 + Math.random() * 1.15;
        const u = Math.random() * 2 - 1;
        const th = Math.random() * TAU;
        const rp = Math.sqrt(1 - u * u);
        x = rp * Math.cos(th) * rr;
        y = u * rr;
        z = rp * Math.sin(th) * rr;
        bb = 0.18 + Math.random() * 0.35;
      }
      stars.push({ x, y, z, ox: 0, oy: 0, vx: 0, vy: 0, s: 0.7 + Math.random() * 0.8, bb, tw: Math.random() * TAU });
    }

    // ── Camera / projection ───────────────────────────────────────────────
    const CAM = 2.7;
    const TILT = 1.12; // disk inclination (radians) — see the galaxy at an angle
    const cosT = Math.cos(TILT);
    const sinT = Math.sin(TILT);
    let SX = 0, SY = 0, cx = 0, cy = 0;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = width / 2;
      cy = height / 2;
      const farDenom = CAM + 1.5;
      SX = (width / 2) * farDenom * 1.5;
      SY = (height / 2) * farDenom * 1.5;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    resize();

    // ── Cursor ────────────────────────────────────────────────────────────
    let pointer: { x: number; y: number } | null = null;
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
        pointer = null; return;
      }
      pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { pointer = null; };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerout", onLeave, { passive: true });

    // gentle, slow interaction (NOT a fast snap)
    const R = small ? 120 : 165;
    const R2 = R * R;
    const REPEL = small ? 0.9 : 1.25; // soft push
    const SPRING = 0.012;             // slow drift home
    const DAMP = 0.92;                // languid settle

    const order = new Array(COUNT);
    for (let i = 0; i < COUNT; i++) order[i] = i;
    const px = new Float32Array(COUNT);
    const py = new Float32Array(COUNT);
    const pz = new Float32Array(COUNT);
    const pNear = new Float32Array(COUNT);
    const pBoost = new Float32Array(COUNT);

    let raf = 0;
    let spin = 0;
    let tw = 0;
    let running = false;
    let inView = true;
    let pageVisible = true;
    const zMin = CAM - 1.6;
    const zMax = CAM + 1.6;

    const draw = () => {
      if (!reduced) { spin += 0.0011; tw += 0.035; }
      const cs = Math.cos(spin);
      const sn = Math.sin(spin);

      ctx.clearRect(0, 0, width, height);

      // galactic core bloom (centre)
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(width, height) * 0.34);
      core.addColorStop(0, "rgba(225,230,255,0.16)");
      core.addColorStop(0.4, "rgba(150,160,200,0.06)");
      core.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = core;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < COUNT; i++) {
        const a = stars[i];
        // spin around galaxy axis (y), then tilt the disk
        const rx = a.x * cs - a.z * sn;
        const rzs = a.x * sn + a.z * cs;
        const ry = a.y;
        const ty = ry * cosT - rzs * sinT;
        const tz = ry * sinT + rzs * cosT;
        const zc = CAM - tz;
        const sxB = cx + (rx * SX) / zc;
        const syB = cy + (ty * SY) / zc;
        const near = (zMax - zc) / (zMax - zMin);

        // gentle per-star cursor drift + glow boost
        let ax = -SPRING * a.ox;
        let ay = -SPRING * a.oy;
        let boost = 0;
        if (pointer) {
          const dx = (sxB + a.ox) - pointer.x;
          const dy = (syB + a.oy) - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < R2) {
            const d = Math.sqrt(d2) || 1;
            const fall = 1 - d / R;
            const f = REPEL * fall * (0.5 + near);
            ax += (dx / d) * f;
            ay += (dy / d) * f;
            boost = fall * 0.6; // stars near the cursor light up
          }
        }
        a.vx = (a.vx + ax) * DAMP;
        a.vy = (a.vy + ay) * DAMP;
        a.ox += a.vx;
        a.oy += a.vy;

        px[i] = sxB + a.ox;
        py[i] = syB + a.oy;
        pz[i] = zc;
        pNear[i] = near;
        pBoost[i] = boost;
      }

      order.sort((i: number, j: number) => pz[j] - pz[i]);

      ctx.fillStyle = "#ffffff";
      for (let k = 0; k < COUNT; k++) {
        const i = order[k];
        const x = px[i], y = py[i];
        if (x < -30 || x > width + 30 || y < -30 || y > height + 30) continue;
        const a = stars[i];
        const near = pNear[i];
        const twinkle = 0.72 + 0.28 * Math.sin(tw + a.tw);
        const size = Math.max(0.45, (small ? 0.85 : 1.2) * a.s * (0.4 + near * 1.7));
        let b = a.bb * (0.18 + near * 0.9) * twinkle + pBoost[i];
        if (b > 1) b = 1;
        if (b < 0.03) continue;

        if (b > 0.62) {
          const gs = size * (3 + pBoost[i] * 4);
          ctx.globalCompositeOperation = "lighter";
          ctx.globalAlpha = (b - 0.62) * 1.3;
          ctx.drawImage(sprite, x - gs, y - gs, gs * 2, gs * 2);
          ctx.globalCompositeOperation = "source-over";
        }
        ctx.globalAlpha = b;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (!reduced) raf = requestAnimationFrame(draw);
    };

    const start = () => { if (reduced) { draw(); return; } if (running) return; running = true; raf = requestAnimationFrame(draw); };
    const stop = () => { running = false; cancelAnimationFrame(raf); };
    const evaluate = () => { if (inView && pageVisible) start(); else stop(); };
    const io = new IntersectionObserver((e) => { inView = e[0]?.isIntersecting ?? true; evaluate(); }, { threshold: 0 });
    io.observe(parent);
    const onVis = () => { pageVisible = !document.hidden; evaluate(); };
    document.addEventListener("visibilitychange", onVis);
    evaluate();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onLeave);
    };
  }, [reduced]);

  return (
    <canvas ref={canvasRef} className={className} aria-hidden="true" style={{ display: "block", width: "100%", height: "100%" }} />
  );
}
