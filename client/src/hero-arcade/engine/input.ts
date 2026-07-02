// Gray Arcade — input. One interaction: space / tap = jump. Pointer input is
// scoped to the stage element; the space key is only intercepted when it
// would not steal from another interactive element, and only when the stage
// actually consumes it (attract/playing) — otherwise the page scrolls as
// normal.

export function bindInput(
  stageEl: HTMLElement,
  onPress: () => boolean,
): () => void {
  const onPointerDown = (e: PointerEvent): void => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    // Let real controls (skip, replay, CTA links, tooltip chips) work.
    const target = e.target as HTMLElement | null;
    if (target && target.closest("a, button")) return;
    onPress();
  };

  const onKeyDown = (e: KeyboardEvent): void => {
    if (e.repeat) return;
    if (e.code !== "Space" && e.code !== "ArrowUp" && e.code !== "Enter") return;
    const active = document.activeElement;
    const stageHasFocus = active === stageEl || stageEl.contains(active);
    // Space/ArrowUp work globally while the stage is on screen, but never
    // when typing in a field or when another button/link has focus.
    if (active && active !== document.body && !stageHasFocus) return;
    if (active && active !== stageEl && stageHasFocus && (active as HTMLElement).closest("a, button")) {
      return; // Enter/Space on the Skip button must click Skip, not jump.
    }
    if (e.code === "Enter" && !stageHasFocus) return;
    if (onPress()) e.preventDefault();
  };

  stageEl.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("keydown", onKeyDown);
  return () => {
    stageEl.removeEventListener("pointerdown", onPointerDown);
    window.removeEventListener("keydown", onKeyDown);
  };
}
