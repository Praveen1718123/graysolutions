// Gray Arcade — <ArcadeHero/>. The always-rendered shell: fixed aspect-ratio
// stage box (zero CLS), static poster, DOM overlays (HUD, tooltips, CTA,
// skip/replay), and the sr-only services list. The canvas engine is a
// separate chunk, dynamic-imported on idle once the stage nears the
// viewport — the game is an enhancement layer, never the content.

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useReducedMotion } from "framer-motion";
import { Link } from "wouter";
import { track } from "./analytics";
import { COPY, RING_SERVICES } from "./content";
import {
  DEBRIS_LABELS,
  getTheme,
  resolveLayoutParam,
  resolveThemeParam,
  type ArcadeLayout,
  type ArcadeThemeName,
} from "./theme";
import Hud from "./overlay/Hud";
import RingTooltip, { type ActiveTip } from "./overlay/RingTooltip";
import CtaPanel from "./overlay/CtaPanel";
import type { ArcadeEngine, StageEvent } from "./engine";

type ShellPhase =
  | "poster" // engine not loaded yet (or never will be)
  | "attract"
  | "playing"
  | "gate"
  | "complete";

const TIP_MS = 2500;

function useMedia(query: string): boolean {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

const useIsMobile = () => useMedia("(max-width: 767px)");
// The full-bleed treatment needs the copy constrained to its 56% column,
// which only happens at the site's lg breakpoint.
const useIsDesktop = () => useMedia("(min-width: 1024px)");

/** Static poster scene — runner + one ring over the theme space. Pure DOM/SVG. */
function Poster({ full = false }: { full?: boolean }) {
  // Full-bleed: the copy owns the left half, so the runner shifts right.
  const runnerX = full ? 204 : 96;
  return (
    <svg
      className="ah-poster"
      viewBox="0 0 480 240"
      // Anchor the ground when the box is wider than 2:1 (full-bleed).
      preserveAspectRatio={full ? "xMidYMax slice" : "xMidYMid slice"}
      aria-hidden="true"
    >
      {/* stardust */}
      {[
        [40, 34], [92, 88], [150, 22], [210, 64], [268, 30], [330, 96],
        [388, 48], [438, 110], [70, 150], [180, 128], [300, 150], [420, 26],
      ].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width={i % 3 === 0 ? 2 : 1} height={i % 3 === 0 ? 2 : 1} className="ah-poster-star" />
      ))}
      {/* one service ring */}
      <ellipse cx={330} cy={128} rx={14} ry={40} className="ah-poster-ring-halo" />
      <ellipse cx={330} cy={128} rx={11} ry={36} className="ah-poster-ring" />
      {/* ground */}
      <rect x={0} y={210} width={480} height={1} className="ah-poster-ground" />
      {/* runner (simplified pixel figure) */}
      <g className="ah-poster-runner" transform={`translate(${runnerX},178)`}>
        <rect x={6} y={0} width={12} height={8} />
        <rect x={4} y={10} width={14} height={12} />
        <rect x={2} y={24} width={7} height={8} />
        <rect x={15} y={22} width={7} height={10} />
        <rect x={18} y={12} width={7} height={4} />
      </g>
    </svg>
  );
}

interface ArcadeStageProps {
  themeName: ArcadeThemeName;
  layout?: ArcadeLayout;
}

// Dev-only review override: ?arcade=reduced|complete forces those states so
// they can be screenshotted without OS settings or playing the full run.
function devArcadeParam(): string | null {
  if (!import.meta.env.DEV || typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("arcade");
}

function ArcadeStage({ themeName, layout = "card" }: ArcadeStageProps) {
  const devParam = devArcadeParam();
  const reduced = (useReducedMotion() ?? false) || devParam === "reduced";
  const mobile = useIsMobile();
  const desktop = useIsDesktop();
  // Full-bleed is a desktop (lg+) treatment; below that the card box stacks
  // under the copy as usual.
  const full = layout === "full" && desktop;
  const theme = useMemo(() => getTheme(themeName), [themeName]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<ArcadeEngine | null>(null);
  const tipTimer = useRef<number | undefined>(undefined);
  const abortedRef = useRef(false); // skip-before-load cancels engine creation
  const pendingReplayRef = useRef(false);
  const replayingRef = useRef(false); // suppress arcade_start after a replay

  const [phase, setPhase] = useState<ShellPhase>("poster");
  const [engineReady, setEngineReady] = useState(false);
  const [staticComplete, setStaticComplete] = useState(false); // skipped pre-engine
  const [skipped, setSkipped] = useState(false);
  const [score, setScore] = useState(0);
  const [ringsCleared, setRingsCleared] = useState(0);
  const [tip, setTip] = useState<ActiveTip | null>(null);
  const [needsPlayTap, setNeedsPlayTap] = useState(false);

  // loadEngine may resolve after a re-render — always hand it the latest
  // theme/layout rather than the values captured when the import started.
  const themeRef = useRef(theme);
  themeRef.current = theme;
  const fullRef = useRef(full);
  fullRef.current = full;

  const onEvent = useCallback((e: StageEvent) => {
    switch (e.type) {
      case "start":
        setPhase("playing");
        setTip(null);
        if (!replayingRef.current) track("arcade_start");
        replayingRef.current = false;
        break;
      case "score":
        setScore(e.score);
        break;
      case "ring":
        if (e.cleared) {
          setRingsCleared((n) => n + 1);
          setTip({ index: e.index, xPct: e.xPct, yPct: e.yPct });
          window.clearTimeout(tipTimer.current);
          tipTimer.current = window.setTimeout(() => setTip(null), TIP_MS);
          track("arcade_ring_cleared", { service: RING_SERVICES[e.index].id });
        }
        break;
      case "gate":
        setPhase("gate");
        track("arcade_gate_reached");
        break;
      case "complete":
        setPhase("complete");
        setSkipped(e.skipped);
        setTip(null);
        break;
      case "stumble":
        break;
    }
  }, []);

  // Engine loader. Shared by autoload, manual ▶ Play, and replay-from-static.
  const loadEngine = useCallback(async (): Promise<ArcadeEngine | null> => {
    if (engineRef.current) return engineRef.current;
    try {
      const mod = await import("./engine");
      const canvas = canvasRef.current;
      if (!canvas || abortedRef.current || engineRef.current) return engineRef.current;
      const engine = mod.createEngine({
        canvas,
        theme: themeRef.current,
        mobile,
        debrisLabels: DEBRIS_LABELS,
        fullBleed: fullRef.current,
        onEvent,
      });
      engineRef.current = engine;
      setEngineReady(true);
      setNeedsPlayTap(false);
      setPhase("attract");
      engine.start();
      if (pendingReplayRef.current) {
        pendingReplayRef.current = false;
        setStaticComplete(false);
        engine.replay();
      } else if (devArcadeParam() === "complete") {
        engine.skip();
      }
      return engine;
    } catch {
      // Chunk failed to load (offline, blocked) — the poster stays, the
      // hero still works as a static image.
      return null;
    }
  }, [mobile, onEvent, layout]);

  // Loading strategy: reduced motion → never; save-data / low-end mobile →
  // explicit ▶ Play; otherwise lazy-load on approach + idle.
  useEffect(() => {
    if (reduced) return;
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean };
      hardwareConcurrency?: number;
    };
    const lowEnd =
      nav.connection?.saveData === true ||
      (mobile && (nav.hardwareConcurrency ?? 8) <= 3);
    if (lowEnd) {
      if (!engineRef.current) setNeedsPlayTap(true);
      return;
    }
    // Dev review params load immediately — screenshot tooling can't wait for
    // idle scheduling in throttled/background tabs.
    if (devArcadeParam()) {
      void loadEngine();
      return;
    }
    const el = containerRef.current;
    if (!el) return;
    let cancelled = false;
    let idleId: number | undefined;
    let timeoutId: number | undefined;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        const kick = () => {
          if (cancelled || abortedRef.current) return;
          cancelled = true; // fire once — rIC and the timeout race
          void loadEngine();
        };
        // Idle if the browser grants it soon; a short timeout guarantees the
        // poster still swaps when idle callbacks are starved or throttled.
        const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number })
          .requestIdleCallback;
        if (idle) idleId = idle(kick);
        timeoutId = window.setTimeout(kick, 2500);
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      if (idleId !== undefined) {
        const cancelIdle = (window as Window & { cancelIdleCallback?: (id: number) => void })
          .cancelIdleCallback;
        if (cancelIdle) cancelIdle(idleId);
      }
    };
  }, [reduced, mobile, loadEngine]);

  // Pause when off-screen or tab hidden; resume when both return.
  useEffect(() => {
    if (!engineReady) return;
    const el = containerRef.current;
    const engine = engineRef.current;
    if (!el || !engine) return;
    let inView = true;
    let visible = !document.hidden;
    const evaluate = () => {
      if (inView && visible) engine.resume();
      else engine.pause();
    };
    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? true;
        evaluate();
      },
      { threshold: 0 },
    );
    io.observe(el);
    const onVis = () => {
      visible = !document.hidden;
      evaluate();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [engineReady]);

  // Theme can change at runtime (?theme= review flow re-mounts, but keep the
  // engine honest if a parent ever swaps the prop).
  useEffect(() => {
    engineRef.current?.setTheme(theme);
  }, [theme]);

  // If the OS reduced-motion preference flips ON mid-session, shut the game
  // down: destroy the engine and fall back to the static poster experience.
  useEffect(() => {
    if (!reduced || !engineRef.current) return;
    engineRef.current.destroy();
    engineRef.current = null;
    setEngineReady(false);
    setPhase("poster");
    setTip(null);
  }, [reduced]);

  // Teardown. The effect body re-arms the abort flag so HMR/StrictMode
  // effect re-runs don't leave engine loading permanently blocked.
  useEffect(() => {
    abortedRef.current = false;
    return () => {
      abortedRef.current = true;
      window.clearTimeout(tipTimer.current);
      engineRef.current?.destroy();
      engineRef.current = null;
    };
  }, []);

  const handleSkip = () => {
    track("arcade_skip");
    setTip(null);
    setNeedsPlayTap(false);
    if (engineRef.current) {
      engineRef.current.skip();
    } else {
      abortedRef.current = true; // stop any in-flight autoload
      setStaticComplete(true);
      setSkipped(true);
      setPhase("complete");
    }
  };

  const handleReplay = () => {
    track("arcade_replay");
    replayingRef.current = true;
    setScore(0);
    setRingsCleared(0);
    setSkipped(false);
    setTip(null);
    setNeedsPlayTap(false);
    if (engineRef.current) {
      setStaticComplete(false);
      engineRef.current.replay();
      setPhase("playing");
    } else {
      // Skipped before the engine ever loaded — load it now, then run.
      abortedRef.current = false;
      pendingReplayRef.current = true;
      void loadEngine();
    }
  };

  // Playfield: press starts the run / gives a thrust burst; holding keeps
  // the jetpack firing. Also nudges a not-yet-loaded engine for early taps.
  const handlePlayfieldDown = () => {
    if (engineRef.current) {
      engineRef.current.press();
      engineRef.current.setThrust(true);
    } else if (!reduced && !abortedRef.current) {
      void loadEngine();
    }
  };
  const handlePlayfieldUp = () => {
    engineRef.current?.setThrust(false);
  };
  const handlePlayfieldKeyDown = (e: React.KeyboardEvent) => {
    if (e.repeat) return;
    if (e.code !== "Space" && e.code !== "Enter") return;
    e.preventDefault(); // suppress the button's native click-on-keyup
    handlePlayfieldDown();
  };
  const handlePlayfieldKeyUp = (e: React.KeyboardEvent) => {
    if (e.code !== "Space" && e.code !== "Enter") return;
    e.preventDefault();
    handlePlayfieldUp();
  };

  const handlePlayTap = () => {
    setNeedsPlayTap(false);
    void loadEngine();
  };

  const complete = phase === "complete";
  const running = phase === "playing" || phase === "gate";
  const showHint = !reduced && engineReady && !complete && !needsPlayTap && !staticComplete;
  const showSkip = !reduced && !complete;
  const showCta = reduced || complete;
  const showReplay = !reduced && complete;
  const showPlayfield = !reduced && !complete && !needsPlayTap;
  // Hotspots only make sense over the canvas's parked-rings scene; static
  // states (reduced motion, skipped-before-load) get the plain chip list.
  const parkedHotspots = complete && !reduced && engineReady;
  const staticServiceList = reduced || (complete && !engineReady);

  // Shared pieces between the card and full-bleed layouts.
  const skipButton = showSkip && (
    <button type="button" className="ah-skip" onClick={handleSkip} data-testid="arcade-skip">
      {COPY.skip}
    </button>
  );

  const visual = (
    <div
      className={`ah-visual${engineReady ? " ah-visual--live" : ""}`}
      role="img"
      aria-label={COPY.stageAria}
    >
      <Poster full={full} />
      <canvas
        ref={canvasRef}
        className={`ah-canvas${engineReady ? " ah-canvas--on" : ""}`}
        aria-hidden="true"
      />
    </div>
  );

  // Playfield — the one control for the one interaction. A real button:
  // native tap/click/Enter/Space, no scroll-swipe misfires, and page
  // scrolling is never hijacked to start the game.
  const playfield = showPlayfield && (
    <button
      type="button"
      className="ah-playfield"
      onPointerDown={handlePlayfieldDown}
      onPointerUp={handlePlayfieldUp}
      onPointerLeave={handlePlayfieldUp}
      onPointerCancel={handlePlayfieldUp}
      onKeyDown={handlePlayfieldKeyDown}
      onKeyUp={handlePlayfieldKeyUp}
      aria-label={COPY.playfieldAria}
      data-testid="arcade-playfield"
    />
  );

  // Ring visuals live on the canvas, so their DOM counterparts (hotspots,
  // in-play chips) must share the canvas geometry — in full-bleed that's the
  // breakout layer, not the container grid.
  const ringOverlay = (
    <RingTooltip
      tip={running ? tip : null}
      parked={parkedHotspots}
      staticList={!full && staticServiceList}
      mobile={mobile}
      full={full}
    />
  );

  const overlays = (
    <>
      <Hud score={score} ringsCleared={ringsCleared} />

      {showCta && <CtaPanel score={score} showScore={!reduced && !skipped && score > 0} />}

      {needsPlayTap && !complete && (
        <button type="button" className="ah-play" onClick={handlePlayTap} data-testid="arcade-play">
          {COPY.play}
        </button>
      )}

      {showReplay && (
        <button
          type="button"
          className="ah-replay"
          onClick={handleReplay}
          data-testid="arcade-replay"
        >
          {COPY.replay}
        </button>
      )}

      {showHint && (
        <span className="ah-hint" aria-hidden="true">
          {COPY.controlsHint}
        </span>
      )}

      {/* Services exist twice: rings in the game AND an accessible DOM list.
          (When the chip list or ring hotspots are up, THEY are the list —
          don't expose a duplicate set of links.) */}
      {!staticServiceList && !parkedHotspots && (
        <nav className="sr-only" aria-label="Services">
          <ul>
            {RING_SERVICES.map((s) => (
              <li key={s.id}>
                <Link href={s.href}>
                  {s.name} — {s.line}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );

  if (full) {
    // Full-bleed: the game spans the hero edge to edge behind the copy.
    // Layers around the DOM content (z-10): scene+playfield below it
    // (viewport-wide), ring hotspots above it sharing the scene geometry,
    // and grid-aligned controls on the container. Skip stays the first
    // focusable in the stage.
    return (
      <div
        className="ah-full"
        style={theme.dom as React.CSSProperties}
        data-testid={`arcade-stage-${theme.name}`}
        data-state={phase}
        data-static={engineReady ? undefined : "true"}
      >
        {skipButton}
        <div ref={containerRef} className="ah-full-visual">
          {visual}
          {playfield}
        </div>
        <div className="ah-full-rings">{ringOverlay}</div>
        <div className="ah-full-ui">
          {overlays}
          {staticServiceList && (
            <RingTooltip tip={null} parked={false} staticList mobile={mobile} full={full} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="ah-stage"
      style={theme.dom as React.CSSProperties}
      data-testid={`arcade-stage-${theme.name}`}
      data-state={phase}
      data-static={engineReady ? undefined : "true"}
    >
      {skipButton}
      {visual}
      {playfield}
      {ringOverlay}
      {overlays}
    </div>
  );
}

/**
 * Public component. `?theme=cosmic|ember` switches palettes at runtime;
 * `?theme=both` stacks the two stages for side-by-side review screenshots
 * (always as cards). `?layout=full|card` switches the hero treatment —
 * full-bleed behind the copy vs the contained 2:1 box.
 */
export default function ArcadeHero() {
  const [param] = useState(() =>
    typeof window === "undefined" ? "cosmic" : resolveThemeParam(window.location.search),
  );
  const [layout] = useState<ArcadeLayout>(() =>
    typeof window === "undefined" ? "card" : resolveLayoutParam(window.location.search),
  );

  return (
    <div className="ah-root">
      <style>{ARCADE_CSS}</style>
      {param === "both" ? (
        <div className="ah-both">
          {(["cosmic", "ember"] as const).map((t) => (
            <div key={t}>
              <p className="ah-both-label">{t}</p>
              <ArcadeStage themeName={t} layout="card" />
            </div>
          ))}
        </div>
      ) : (
        <ArcadeStage themeName={param} layout={layout} />
      )}
    </div>
  );
}

// ── Overlay styles ──────────────────────────────────────────────────────────
// Everything derives from the --ah-* custom properties set per stage from
// theme.ts, so the cosmic/ember switch is total. The stage box has a fixed
// aspect ratio from first paint — zero layout shift.
const ARCADE_CSS = `
.ah-root { width: 100%; }
.ah-both { display: flex; flex-direction: column; gap: 18px; }
.ah-both-label {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 10px; letter-spacing: 0.24em; text-transform: uppercase;
  color: var(--ah-text-dim, #8B92A3); margin: 0 0 6px 2px;
}
.ah-stage {
  position: relative; width: 100%; aspect-ratio: 2 / 1;
  border-radius: 22px; overflow: hidden;
  background: var(--ah-stage-bg);
  border: 1px solid var(--ah-stage-border);
  box-shadow: var(--ah-stage-shadow);
  user-select: none; -webkit-user-select: none;
  touch-action: manipulation;
}
.ah-visual { position: absolute; inset: 0; }
.ah-playfield {
  position: absolute; inset: 0; z-index: 5;
  background: transparent; border: none; padding: 0; margin: 0;
  cursor: pointer; border-radius: 22px;
  -webkit-tap-highlight-color: transparent;
}
.ah-playfield:focus-visible { outline: 2px solid var(--ah-focus); outline-offset: -3px; }
.ah-tip-live { position: absolute; inset: 0; z-index: 20; pointer-events: none; }
.ah-poster {
  position: absolute; inset: 0; width: 100%; height: 100%;
  transition: opacity 240ms ease, visibility 0s 240ms;
}
/* The canvas replaces the poster (matters in full-bleed, where the canvas
   is transparent and would otherwise show both scenes at once). */
.ah-visual--live .ah-poster { opacity: 0; visibility: hidden; }
.ah-poster-star { fill: var(--ah-poster-star); opacity: 0.8; }
.ah-poster-ring { fill: none; stroke: var(--ah-poster-ring); stroke-width: 2.5; }
.ah-poster-ring-halo { fill: none; stroke: var(--ah-accent-soft); stroke-width: 7; }
.ah-poster-ground { fill: var(--ah-text-dim); opacity: 0.35; }
.ah-poster-runner rect { fill: var(--ah-text); }
.ah-canvas {
  position: absolute; inset: 0; width: 100%; height: 100%; display: block;
  image-rendering: pixelated;
  opacity: 0; transition: opacity 240ms ease;
}
.ah-canvas--on { opacity: 1; }

.ah-hud {
  position: absolute; top: 10px; left: 12px; right: 12px;
  display: flex; justify-content: space-between; align-items: center;
  gap: 8px; pointer-events: none;
  padding-right: 54px; /* keep clear of the Skip button */
}
.ah-hud-panel {
  display: inline-flex; align-items: center; gap: 10px;
  background: var(--ah-hud-bg);
  border: 1px solid var(--ah-hud-border);
  border-radius: 10px; padding: 5px 10px;
  backdrop-filter: blur(var(--ah-hud-blur)) saturate(160%);
  -webkit-backdrop-filter: blur(var(--ah-hud-blur)) saturate(160%);
  color: var(--ah-hud-text);
  font-size: 9px; letter-spacing: 0.18em;
}
.ah-hud-stage { white-space: nowrap; }
.ah-hud-right .ah-hud-bonus { opacity: 0.75; }
.ah-hud-lives { display: inline-flex; gap: 4px; }
.ah-hud-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--ah-lives);
  box-shadow: 0 0 6px var(--ah-accent-soft);
}
@media (max-width: 520px) {
  .ah-hud { padding-right: 78px; }
  .ah-hud-right .ah-hud-bonus { display: none; }
  .ah-hud-panel { font-size: 8px; padding: 4px 8px; }
}

.ah-skip {
  position: absolute; top: 10px; right: 12px; z-index: 30;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase;
  color: var(--ah-hud-text);
  background: var(--ah-hud-bg);
  border: 1px solid var(--ah-hud-border);
  border-radius: 8px; padding: 5px 10px; cursor: pointer;
}
.ah-skip:hover { border-color: var(--ah-accent); }
.ah-skip:focus-visible { outline: 2px solid var(--ah-focus); outline-offset: 1px; }

.ah-hint {
  position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%);
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 10px; letter-spacing: 0.14em;
  color: var(--ah-hud-text); pointer-events: none; white-space: nowrap;
  background: var(--ah-hud-bg);
  border-radius: 6px; padding: 3px 8px;
}

.ah-chip {
  position: absolute; z-index: 20; max-width: 62%;
  display: flex; flex-direction: column; gap: 2px;
  background: var(--ah-chip-bg);
  border: 1px solid var(--ah-chip-border);
  border-radius: 10px; padding: 7px 10px;
  backdrop-filter: blur(var(--ah-hud-blur));
  -webkit-backdrop-filter: blur(var(--ah-hud-blur));
  pointer-events: none;
}
.ah-chip--dock { left: 50%; bottom: 26px; transform: translateX(-50%); max-width: 86%; }
.ah-chip-name { color: var(--ah-chip-text); font-size: 11px; font-weight: 600; line-height: 1.25; }
.ah-chip-line { color: var(--ah-chip-text-dim); font-size: 10px; line-height: 1.35; }

.ah-hotspots { position: absolute; inset: 0; z-index: 15; }
.ah-hotspot {
  position: absolute; width: 44px; height: 64px;
  transform: translate(-50%, -50%);
  border-radius: 50%; display: block;
}
.ah-hotspot:focus-visible { outline: 2px solid var(--ah-focus); outline-offset: 2px; border-radius: 50%; }

.ah-static-services {
  position: absolute; left: 12px; right: 12px; bottom: 12px; z-index: 20;
  display: flex; flex-wrap: wrap; gap: 6px;
}
.ah-static-service {
  color: var(--ah-chip-text); font-size: 10px; line-height: 1.2;
  background: var(--ah-chip-bg); border: 1px solid var(--ah-chip-border);
  border-radius: 999px; padding: 4px 9px; text-decoration: none;
}
.ah-static-service:focus-visible { outline: 2px solid var(--ah-focus); outline-offset: 1px; }

.ah-cta {
  position: absolute; left: 50%; bottom: 9%; z-index: 25;
  transform: translateX(-50%);
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  width: min(88%, 420px); text-align: center;
  background: var(--ah-panel-bg);
  border: 1px solid var(--ah-panel-border);
  border-radius: 16px; padding: 18px 20px;
  backdrop-filter: blur(var(--ah-hud-blur)) saturate(160%);
  -webkit-backdrop-filter: blur(var(--ah-hud-blur)) saturate(160%);
  animation: ah-fade-in 300ms ease both;
}
@keyframes ah-fade-in { from { opacity: 0; } to { opacity: 1; } }
/* Static modes (reduced motion / skipped before load): panel sits higher so
   the service chip list stays clear at the bottom. */
.ah-stage[data-static="true"] .ah-cta { bottom: auto; top: 18%; }
.ah-cta-heading { color: var(--ah-text); font-size: 15px; font-weight: 600; line-height: 1.4; margin: 0; }
.ah-cta-score {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  color: var(--ah-text-dim); font-size: 10px; letter-spacing: 0.2em; margin: 0;
}
.ah-cta-row { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; }
.ah-btn {
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: 999px; padding: 8px 16px; font-size: 12.5px; font-weight: 600;
  text-decoration: none; cursor: pointer; min-height: 36px;
}
.ah-btn--primary {
  color: var(--ah-cta-text);
  background: linear-gradient(135deg, var(--ah-cta-grad-a), var(--ah-cta-grad-b));
}
.ah-btn--secondary {
  color: var(--ah-text);
  border: 1px solid var(--ah-ghost-border);
  background: transparent;
}
.ah-btn:focus-visible { outline: 2px solid var(--ah-focus); outline-offset: 2px; }

.ah-replay {
  position: absolute; left: 12px; bottom: 10px; z-index: 25;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase;
  color: var(--ah-ghost-text);
  background: transparent; border: 1px solid var(--ah-ghost-border);
  border-radius: 8px; padding: 5px 10px; cursor: pointer;
}
.ah-replay:hover { border-color: var(--ah-accent); }
.ah-replay:focus-visible { outline: 2px solid var(--ah-focus); outline-offset: 1px; }

.ah-play {
  position: absolute; left: 50%; top: 50%; z-index: 25;
  transform: translate(-50%, -50%);
  color: var(--ah-hud-text);
  background: var(--ah-hud-bg);
  border: 1px solid var(--ah-hud-border);
  border-radius: 999px; padding: 10px 20px; font-size: 13px; font-weight: 600;
  cursor: pointer;
  backdrop-filter: blur(var(--ah-hud-blur));
  -webkit-backdrop-filter: blur(var(--ah-hud-blur));
}
.ah-play:focus-visible { outline: 2px solid var(--ah-focus); outline-offset: 2px; }

/* ── Full-bleed hero layout ─────────────────────────────────────────────────
   The game spans the whole hero region behind the real DOM copy (z-10):
   visual layer + playfield below it (z-4), controls above it (z-20 via a
   pointer-events:none layer). The copy owns the left half, so centered
   elements shift into the right airspace. */
.ah-full { position: static; }
/* Scene + hotspot layers break out of the container to true edge-to-edge
   (the hero section clips the 100vw overshoot). The engine derives its
   logical width from this box's aspect, so pixels stay square with no
   cropping at any viewport. */
.ah-full-visual, .ah-full-rings {
  position: absolute; top: 0; bottom: 0; left: 50%;
  width: 100vw; transform: translateX(-50%);
}
.ah-full-visual {
  z-index: 4;
  /* The engine owns the hero canvas; the poster sits on the same theme
     space so the pre-engine frame and the live canvas hand off seamlessly. */
  background: var(--ah-stage-bg);
}
.ah-full-rings { z-index: 20; pointer-events: none; }
.ah-full-rings .ah-hotspot { pointer-events: auto; }
.ah-full-ui { position: absolute; inset: 0; z-index: 20; pointer-events: none; }
.ah-full-ui .ah-btn,
.ah-full-ui .ah-replay,
.ah-full-ui .ah-play,
.ah-full-ui .ah-static-service { pointer-events: auto; }
.ah-full > .ah-skip { z-index: 30; }
.ah-full .ah-playfield { border-radius: 0; }
.ah-full .ah-canvas, .ah-full .ah-poster { image-rendering: pixelated; }
/* One aligned control bar: stage label · score · lives · skip on a single
   baseline, right-aligned — not a ragged stack. */
.ah-full .ah-hud {
  left: auto; right: 64px; top: 10px;
  justify-content: flex-end; align-items: center; gap: 8px;
  padding-right: 0;
}
.ah-full .ah-hint { left: 66%; }
.ah-full .ah-cta {
  left: auto; right: 4%; bottom: 14%;
  transform: none; width: min(88%, 400px);
}
.ah-full[data-static="true"] .ah-cta { top: auto; bottom: 30%; }
.ah-full .ah-static-services {
  left: auto; right: 4%; bottom: 14%; max-width: 48%;
  justify-content: flex-end;
}
.ah-full[data-static="true"] .ah-static-services { bottom: 8%; }
.ah-full .ah-replay { left: auto; right: 12px; bottom: 10px; }
.ah-full .ah-play { left: 70%; }

/* Belt-and-suspenders: the shell never loads the engine under reduced
   motion, and this kills the remaining CSS motion too. */
@media (prefers-reduced-motion: reduce) {
  .ah-cta { animation: none; }
  .ah-canvas { transition: none; }
}
`;
