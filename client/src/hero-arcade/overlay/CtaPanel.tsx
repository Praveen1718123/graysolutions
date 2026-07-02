// Gray Arcade — completion panel. Fades in over the scene after the launch
// gate (and is visible by default for reduced motion / skipped states).
// Real DOM links to the existing contact and work routes — crawlable.

import { Link } from "wouter";
import { track } from "../analytics";
import { COPY, CTA_ROUTES } from "../content";

interface CtaPanelProps {
  score: number;
  /** Hide the score line when the run was skipped or never played. */
  showScore: boolean;
}

export default function CtaPanel({ score, showScore }: CtaPanelProps) {
  return (
    <div className="ah-cta" data-testid="arcade-cta-panel">
      <p className="ah-cta-heading">{COPY.completeHeading}</p>
      {showScore && (
        <p className="ah-cta-score" aria-label={`Final score ${score}`}>
          SCORE {String(score).padStart(4, "0")}
        </p>
      )}
      <div className="ah-cta-row">
        <Link
          href={CTA_ROUTES.primary}
          className="ah-btn ah-btn--primary"
          data-testid="cta-start-project-arcade"
          onClick={() => track("arcade_cta_click", { which: "start-project" })}
        >
          {COPY.ctaPrimary}
        </Link>
        <Link
          href={CTA_ROUTES.secondary}
          className="ah-btn ah-btn--secondary"
          data-testid="cta-see-work-arcade"
          onClick={() => track("arcade_cta_click", { which: "see-work" })}
        >
          {COPY.ctaSecondary}
        </Link>
      </div>
    </div>
  );
}
