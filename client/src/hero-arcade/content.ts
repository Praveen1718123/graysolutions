// Gray Arcade — locked copy + stage data.
// Copy strings here are locked by the brief; do not reword.

export interface RingService {
  /** Ring order = fixed stage order: Brand → Growth → Product → AI */
  name: string;
  line: string;
  /** Short all-caps tag drawn in-world above the ring (bitmap font) */
  tag: string;
  /** Canonical route from client/src/data/services.ts */
  href: string;
  /** Analytics label */
  id: string;
}

export const RING_SERVICES: readonly RingService[] = [
  {
    id: "brand-content",
    name: "Branding & Digital Identity",
    line: "Logos, identity systems, brand guidelines.",
    tag: "BRAND",
    href: "/services/brand-content",
  },
  {
    id: "growth-performance",
    name: "Strategic Digital Growth",
    line: "Search, social, and content strategy.",
    tag: "GROWTH",
    href: "/services/growth-performance",
  },
  {
    id: "product-web",
    name: "Bespoke Software & Product Development",
    line: "Web apps and products, designed and built in-house.",
    tag: "PRODUCT",
    href: "/services/product-web",
  },
  {
    id: "automations-ai",
    name: "AI & Advanced Tech Integration",
    line: "AI where it makes sense — automation, voice, workflows.",
    tag: "AI",
    href: "/services/automations-ai",
  },
] as const;

export const COPY = {
  stageLabel: "STAGE 01 — CHAOS TO LAUNCH",
  attract: "HOLD SPACE / TAP TO FLY",
  attractTouch: "TAP AND HOLD TO FLY",
  coach: "HOLD TO FLY",
  controlsHint: "hold space / tap — fly",
  controlsHintTouch: "hold to fly",
  skip: "Skip",
  replay: "Replay",
  play: "▶ Play",
  playfieldAria:
    "Gray Arcade mini-game. Press to start, then hold space or tap to fly. Decorative — all services and links are available as regular content.",
  completeHeading: "One team, from first idea to shipped work.",
  ctaPrimary: "Start a project",
  ctaSecondary: "See the work",
  stageAria:
    "Gray Arcade, stage 01 — chaos to launch. A pixel runner jumps over debris, through four glowing service rings, and out through a launch gate.",
} as const;

export const CTA_ROUTES = {
  primary: "/contact",
  secondary: "/work",
} as const;

/**
 * Pain-point labels for chaos debris. Built per the brief but shipped OFF
 * (see DEBRIS_LABELS in theme.ts) — labeled debris reads as manufactured
 * urgency, which the brand voice forbids. Praveen decides after seeing both.
 */
export const DEBRIS_LABEL_TEXT: readonly string[] = [
  "OUTDATED WEBSITE",
  "NO LEADS",
  "HIGH AD SPEND",
  "MANUAL WORK",
] as const;

/**
 * Where the four rings park (as fractions of the 480×240 logical stage) once
 * the run completes — an ascending arc. The canvas draws rings here and the
 * DOM overlay places its hover/focus hotspots at the same spots, so the two
 * layers must share this table.
 */
export const PARKED_RINGS: readonly { x: number; y: number }[] = [
  { x: 0.22, y: 0.52 },
  { x: 0.40, y: 0.45 },
  { x: 0.58, y: 0.38 },
  { x: 0.76, y: 0.31 },
] as const;

/**
 * Parked positions for the full-bleed hero layout: the copy owns the left
 * half, so the arc lives in the open right airspace. Keep every ring's
 * label zone (just above the hoop) inside the canvas and clear of the
 * completion panel (right 4%, bottom ~14%).
 */
export const PARKED_RINGS_FULL: readonly { x: number; y: number }[] = [
  { x: 0.52, y: 0.57 },
  { x: 0.63, y: 0.48 },
  { x: 0.74, y: 0.40 },
  { x: 0.85, y: 0.32 },
] as const;
