// Gray Arcade — DOM glass HUD. Stage label left; score, bonus, and three
// cosmetic lives dots right. Pure CSS-variable styling so the theme switch
// is total. Contrast of text-on-panel is ≥4.5:1 in both themes.

import { COPY } from "../content";

interface HudProps {
  score: number;
  ringsCleared: number;
}

const FONT_MONO = "'JetBrains Mono', ui-monospace, monospace";

export default function Hud({ score, ringsCleared }: HudProps) {
  return (
    <div className="ah-hud" aria-hidden="true">
      <div className="ah-hud-panel">
        <span className="ah-hud-stage" style={{ fontFamily: FONT_MONO }}>
          {COPY.stageLabel}
        </span>
      </div>
      <div className="ah-hud-panel ah-hud-right">
        <span className="ah-hud-score" style={{ fontFamily: FONT_MONO }}>
          SCORE {String(score).padStart(4, "0")}
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
