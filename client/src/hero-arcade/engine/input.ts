// Gray Arcade — input. The primary control surface is the shell's playfield
// <button> (native click/Enter/Space semantics, no scroll-swipe misfires).
// This module adds ONE nicety on top: while a run is actively playing AND the
// stage is on-screen, a body-focused Space/ArrowUp still jumps, so a mouse
// user who clicked to start doesn't lose the keyboard mid-run. It never
// consumes keys in attract/complete, while paused, or when any interactive
// element has focus — page scrolling stays intact.

export interface GlobalKeyOptions {
  /** Consume the key only when this returns true (playing + on-screen). */
  canConsume: () => boolean;
  onPress: () => boolean;
}

export function bindGlobalKeys({ canConsume, onPress }: GlobalKeyOptions): () => void {
  const onKeyDown = (e: KeyboardEvent): void => {
    if (e.repeat) return;
    if (e.code !== "Space" && e.code !== "ArrowUp") return;
    const active = document.activeElement;
    // Never steal from form fields, buttons, or links — their own semantics
    // (including the playfield button's native click) take precedence.
    if (active && active !== document.body && active !== document.documentElement) return;
    if (!canConsume()) return;
    if (onPress()) e.preventDefault();
  };

  window.addEventListener("keydown", onKeyDown);
  return () => window.removeEventListener("keydown", onKeyDown);
}
