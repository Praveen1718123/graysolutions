// Gray Arcade — DOM glass HUD. Stage label left; score, bonus, and three
// cosmetic lives dots right. Pure CSS-variable styling so the theme switch
// is total. Contrast of text-on-panel is ≥4.5:1 in both themes.

import { useEffect, useRef, useState } from "react";
import { COPY } from "../content";

interface HudProps {
  score: number;
  ringsCleared: number;
}

const FONT_MONO = "'JetBrains Mono', ui-monospace, monospace";

/** Animate a number toward its target (~350ms ease-out); snaps for reduced motion. */
function useCountUp(target: number): number {
  const [shown, setShown] = useState(target);
  const prevRef = useRef(target);
  useEffect(() => {
    const from = prevRef.current;
    prevRef.current = target;
    if (from === target) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(target);
      return;
    }
    const t0 = performance.now();
    const dur = 350;
    let raf = 0;
    const step = (now: number): void => {
      const k = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      setShown(Math.round(from + (target - from) * eased));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return shown;
}

export default function Hud({ score, ringsCleared }: HudProps) {
  const shownScore = useCountUp(score);
  return (
    <div className="ah-hud" aria-hidden="true">
      <div className="ah-hud-panel">
        <span className="ah-hud-stage" style={{ fontFamily: FONT_MONO }}>
          {COPY.stageLabel}
        </span>
      </div>
      <div className="ah-hud-panel ah-hud-right">
        <span className="ah-hud-score" style={{ fontFamily: FONT_MONO }}>
          SCORE {String(shownScore).padStart(4, "0")}
        </span>
        <span className="ah-hud-bonus" style={{ fontFamily: FONT_MONO }}>
          BONUS ×{ringsCleared}
        </span>
        <span className="ah-hud-lives">
          {[0, 1, 2].map((i) => (
            <i key={i} className="ah-hud-dot" />
          ))}
        </span>
      </div>
    </div>
  );
}
