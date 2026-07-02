// Gray Arcade — input. The primary control surface is the shell's playfield
// <button> (native pointer/keyboard semantics). This module adds ONE nicety
// on top: while a run is actively playing AND the stage is on-screen, a
// body-focused Space/ArrowUp still flies (hold = climb), so a mouse user who
// clicked to start doesn't lose the keyboard mid-run. It never consumes keys
// in attract/complete, while paused, or when any interactive element has
// focus — page scrolling stays intact.

export interface GlobalKeyOptions {
  /** Consume the key only when this returns true (playing + on-screen). */
  canConsume: () => boolean;
  onPress: () => boolean;
  onRelease: () => void;
}

const KEYS = ["Space", "ArrowUp"];

export function bindGlobalKeys({ canConsume, onPress, onRelease }: GlobalKeyOptions): () => void {
  let consumed = false;

  const onKeyDown = (e: KeyboardEvent): void => {
    if (e.repeat) return;
    if (!KEYS.includes(e.code)) return;
    const active = document.activeElement;
    // Never steal from form fields, buttons, or links — their own semantics
    // (including the playfield button's native handlers) take precedence.
    if (active && active !== document.body && active !== document.documentElement) return;
    if (!canConsume()) return;
    consumed = true;
    if (onPress()) e.preventDefault();
  };

  const onKeyUp = (e: KeyboardEvent): void => {
    if (!KEYS.includes(e.code)) return;
    // Always release — even if focus moved or play paused mid-hold.
    if (consumed) {
      consumed = false;
      onRelease();
    }
  };

  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  return () => {
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("keyup", onKeyUp);
  };
}
