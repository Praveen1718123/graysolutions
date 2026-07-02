// Gray Arcade — theme system. Single source of truth for every color the
// arcade uses, canvas and DOM alike. DOM overlays consume the `dom` CSS
// custom properties; the canvas engine consumes the raw token values.
// No color may be hardcoded outside this file.

export type ArcadeThemeName = "cosmic" | "ember";

/** Feature flags */
export const DEBRIS_LABELS = false; // ships OFF — see content.ts DEBRIS_LABEL_TEXT
export const DEFAULT_THEME: ArcadeThemeName = "cosmic";

export interface ArcadeTheme {
  name: ArcadeThemeName;
  /** Space background vertical gradient */
  space: { top: string; bottom: string };
  /** Starfield dot colors by depth (far → near) */
  stars: [string, string, string];
  /** Soft nebula blob tints (rgba with alpha baked in) */
  nebula: [string, string];
  /** Ground line + its glow */
  ground: { line: string; glow: string };
  /** Runner pixel palette */
  runner: {
    suit: string;
    shade: string;
    visor: string;
    accent: string;
    outline: string;
  };
  debris: { fill: string; edge: string; label: string };
  /** Ring glow ramp: core (hot) → mid → outer halo (rgba) */
  ring: { core: string; mid: string; halo: string; alt: string };
  gate: { frame: string; glowA: string; glowB: string; portal: string };
  /** Particle colors (index referenced by entities) */
  particles: [string, string, string];
  /** Gate white-out flash color */
  flash: string;
  /** Edge-darkening vignette color (rgba) */
  vignette: string;
  /** In-canvas bitmap-font text (attract line, score popups) */
  canvasText: { bright: string; dim: string };
  /**
   * CSS custom properties for the DOM overlay layer (HUD, tooltips, CTA,
   * skip/replay, poster). Keys are the literal var names.
   */
  dom: Record<string, string>;
}

const cosmic: ArcadeTheme = {
  name: "cosmic",
  space: { top: "#0a0a14", bottom: "#05070D" },
  stars: ["#3d4468", "#8b93c4", "#e6ebff"],
  nebula: ["rgba(99,64,201,0.14)", "rgba(59,130,246,0.10)"],
  ground: { line: "#2b3152", glow: "rgba(139,92,246,0.25)" },
  runner: {
    suit: "#e8ecfa",
    shade: "#9aa4c8",
    visor: "#67e8f9",
    accent: "#8B5CF6",
    outline: "#232741",
  },
  debris: { fill: "#343b5c", edge: "#59628f", label: "#8b93c4" },
  ring: {
    core: "#e9e2ff",
    mid: "#8B5CF6",
    halo: "rgba(139,92,246,0.32)",
    alt: "#67e8f9",
  },
  gate: {
    frame: "#4c548a",
    glowA: "#8B5CF6",
    glowB: "#67e8f9",
    portal: "rgba(139,92,246,0.5)",
  },
  particles: ["#c4b5fd", "#67e8f9", "#e6ebff"],
  flash: "#eef0ff",
  vignette: "rgba(0,0,0,0.42)",
  canvasText: { bright: "#e6ebff", dim: "#6a7199" },
  dom: {
    "--ah-stage-bg": "linear-gradient(180deg, #0a0a14 0%, #05070D 100%)",
    "--ah-stage-border": "rgba(255,255,255,0.10)",
    "--ah-text": "#F1F3F8",
    "--ah-text-dim": "#a9b2cc",
    "--ah-hud-bg": "rgba(20,28,46,0.55)",
    "--ah-hud-border": "rgba(255,255,255,0.14)",
    "--ah-hud-text": "#EAF2FF",
    "--ah-hud-blur": "14px",
    "--ah-accent": "#8B5CF6",
    "--ah-accent-soft": "rgba(139,92,246,0.35)",
    "--ah-chip-bg": "rgba(20,28,46,0.82)",
    "--ah-chip-border": "rgba(139,92,246,0.45)",
    "--ah-chip-text": "#EAF2FF",
    "--ah-chip-text-dim": "#a9b2cc",
    "--ah-panel-bg": "rgba(13,18,33,0.78)",
    "--ah-panel-border": "rgba(255,255,255,0.14)",
    // Darker ends of the site's blue→violet ramp: white text ≥4.5:1 across
    // the whole gradient (plain #3B82F6/#8B5CF6 fail at ~3.3–3.7:1).
    "--ah-cta-grad-a": "#2563EB",
    "--ah-cta-grad-b": "#7C3AED",
    "--ah-cta-text": "#ffffff",
    "--ah-ghost-border": "rgba(255,255,255,0.22)",
    "--ah-ghost-text": "#c9d1e8",
    "--ah-focus": "#67e8f9",
    "--ah-lives": "#67e8f9",
    "--ah-poster-ring": "#8B5CF6",
    "--ah-poster-star": "#8b93c4",
    "--ah-stage-shadow":
      "inset 0 1px 0 rgba(255,255,255,0.07), 0 18px 50px -20px rgba(0,0,0,0.6)",
  },
};

const ember: ArcadeTheme = {
  name: "ember",
  space: { top: "#38352f", bottom: "#23211d" },
  // Grayscale-only scenery: silver stardust, graphite ground and debris.
  stars: ["#57534b", "#8d8779", "#d8d2c4"],
  nebula: ["rgba(216,210,196,0.05)", "rgba(140,134,121,0.06)"],
  ground: { line: "#4a463f", glow: "rgba(224,92,42,0.18)" },
  runner: {
    suit: "#dcd6c9",
    shade: "#8d8779",
    visor: "#f2ede1",
    accent: "#b3ac9c",
    outline: "#1c1a16",
  },
  debris: { fill: "#4a463f", edge: "#6e6a5f", label: "#a39d8e" },
  // The ember ramp is the ONLY color on screen.
  ring: {
    core: "#f6d558",
    mid: "#f0a33f",
    halo: "rgba(224,92,42,0.38)",
    alt: "#e05c2a",
  },
  gate: {
    frame: "#57534b",
    glowA: "#e05c2a",
    glowB: "#f6d558",
    portal: "rgba(240,163,63,0.5)",
  },
  particles: ["#e05c2a", "#f0a33f", "#f6d558"],
  flash: "#f8ecd2",
  vignette: "rgba(12,10,8,0.45)",
  canvasText: { bright: "#efe8d8", dim: "#8d8779" },
  dom: {
    "--ah-stage-bg": "linear-gradient(180deg, #38352f 0%, #23211d 100%)",
    "--ah-stage-border": "rgba(243,234,216,0.12)",
    "--ah-text": "#f3ead8",
    "--ah-text-dim": "#b3ac9c",
    // Ink panel with paper text.
    "--ah-hud-bg": "rgba(23,21,17,0.78)",
    "--ah-hud-border": "rgba(243,234,216,0.16)",
    "--ah-hud-text": "#f3ead8",
    "--ah-hud-blur": "10px",
    "--ah-accent": "#f0a33f",
    "--ah-accent-soft": "rgba(224,92,42,0.35)",
    "--ah-chip-bg": "rgba(23,21,17,0.88)",
    "--ah-chip-border": "rgba(240,163,63,0.5)",
    "--ah-chip-text": "#f3ead8",
    "--ah-chip-text-dim": "#b3ac9c",
    "--ah-panel-bg": "rgba(23,21,17,0.82)",
    "--ah-panel-border": "rgba(243,234,216,0.16)",
    "--ah-cta-grad-a": "#e05c2a",
    "--ah-cta-grad-b": "#f0a33f",
    "--ah-cta-text": "#1c1a16",
    "--ah-ghost-border": "rgba(243,234,216,0.28)",
    "--ah-ghost-text": "#e6dfcf",
    "--ah-focus": "#f6d558",
    "--ah-lives": "#f0a33f",
    "--ah-poster-ring": "#f0a33f",
    "--ah-poster-star": "#8d8779",
    "--ah-stage-shadow":
      "inset 0 1px 0 rgba(243,234,216,0.07), 0 18px 50px -20px rgba(0,0,0,0.55)",
  },
};

const THEMES: Record<ArcadeThemeName, ArcadeTheme> = { cosmic, ember };

export function getTheme(name: ArcadeThemeName): ArcadeTheme {
  return THEMES[name];
}

/**
 * Runtime theme selection for review: `?theme=cosmic`, `?theme=ember`, or
 * `?theme=both` (renders the two stages side by side for screenshots).
 */
export function resolveThemeParam(search: string): ArcadeThemeName | "both" {
  const v = new URLSearchParams(search).get("theme");
  if (v === "cosmic" || v === "ember" || v === "both") return v;
  return DEFAULT_THEME;
}
