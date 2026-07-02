// Gray Arcade — analytics wrapper. The repo has no event helper (verified
// 2026-07: no gtag/GTM/plausible/posthog/segment anywhere in client or
// server), so this is a no-op that logs in dev. When a real helper lands,
// route these calls through it here — call sites stay unchanged.

export type ArcadeEventName =
  | "arcade_start"
  | "arcade_ring_cleared"
  | "arcade_gate_reached"
  | "arcade_skip"
  | "arcade_replay"
  | "arcade_cta_click";

export function track(
  event: ArcadeEventName,
  props?: Record<string, string | number | boolean>,
): void {
  if (import.meta.env.DEV) {
    console.debug("[arcade]", event, props ?? {});
  }
}
