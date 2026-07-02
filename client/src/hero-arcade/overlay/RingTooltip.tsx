// Gray Arcade — ring tooltip chips. Two lives:
//  1. While playing: a chip auto-shows for ~2.5s when a ring is cleared
//     (bottom chip on mobile, floating near the ring on desktop).
//  2. In complete / reduced-motion states: the four rings become real DOM
//     links (hover + focus show the chip) so every service stays reachable
//     by keyboard. Hotspot positions mirror PARKED_RINGS on the canvas.

import { useState } from "react";
import { Link } from "wouter";
import { track } from "../analytics";
import { PARKED_RINGS, RING_SERVICES } from "../content";

export interface ActiveTip {
  index: number;
  xPct: number;
  yPct: number;
}

interface RingTooltipProps {
  /** Transient chip during play (null = hidden). */
  tip: ActiveTip | null;
  /** Render the four parked hotspots (complete state). */
  parked: boolean;
  /** Render as a plain focusable chip list (reduced-motion static poster). */
  staticList: boolean;
  mobile: boolean;
}

function Chip({ index, style }: { index: number; style?: React.CSSProperties }) {
  const s = RING_SERVICES[index];
  // With an explicit position the chip floats near its ring; without one it
  // docks bottom-center (the mobile behavior).
  const mode = style ? "ah-chip--float" : "ah-chip--dock";
  return (
    <div className={`ah-chip ${mode}`} style={style}>
      <span className="ah-chip-name">{s.name}</span>
      <span className="ah-chip-line">{s.line}</span>
    </div>
  );
}

export default function RingTooltip({ tip, parked, staticList, mobile }: RingTooltipProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  if (staticList) {
    // Reduced motion: plain focusable elements, no positioning tricks.
    return (
      <nav className="ah-static-services" aria-label="Services">
        {RING_SERVICES.map((s) => (
          <Link
            key={s.id}
            href={s.href}
            className="ah-static-service"
            title={s.line}
            data-testid={`arcade-ring-link-${s.id}`}
            onClick={() => track("arcade_cta_click", { which: `ring-${s.id}` })}
          >
            {s.name}
          </Link>
        ))}
      </nav>
    );
  }

  if (parked) {
    return (
      <div className="ah-hotspots">
        {RING_SERVICES.map((s, i) => {
          const p = PARKED_RINGS[i];
          const describedBy = `ah-ringtip-${s.id}`;
          const showChip = hovered === i;
          return (
            <span key={s.id}>
              <Link
                href={s.href}
                className="ah-hotspot"
                style={{ left: `${p.x * 100}%`, top: `${p.y * 100}%` }}
                aria-label={s.name}
                aria-describedby={describedBy}
                data-testid={`arcade-ring-link-${s.id}`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered((h) => (h === i ? null : h))}
                onClick={() => track("arcade_cta_click", { which: `ring-${s.id}` })}
              />
              <div id={describedBy} role="tooltip" hidden={!showChip}>
                {showChip && (
                  <Chip
                    index={i}
                    style={
                      mobile
                        ? undefined
                        : {
                            left: `${Math.min(78, Math.max(4, p.x * 100 - 10))}%`,
                            top: `${Math.max(6, p.y * 100 - 26)}%`,
                          }
                    }
                  />
                )}
              </div>
            </span>
          );
        })}
      </div>
    );
  }

  if (tip) {
    // Transient in-play chip. Mobile: fixed bottom chip; desktop: floats
    // near where the ring was cleared.
    const style: React.CSSProperties | undefined = mobile
      ? undefined
      : {
          left: `${Math.min(62, Math.max(6, tip.xPct * 100 + 8))}%`,
          top: `${Math.max(8, tip.yPct * 100 - 24)}%`,
        };
    return (
      <div role="status" aria-live="polite">
        <Chip index={tip.index} style={style} />
      </div>
    );
  }

  return null;
}
