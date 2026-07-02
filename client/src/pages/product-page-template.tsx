import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import SiteNav from "@/components/site-nav";
import Footer from "@/components/footer";

// Light-theme design tokens (matches the Gray Solutions Light DS v1.1)
const BG_PAGE      = "#FFFFFC";
const BG_CANVAS    = "#F8F9FB";
const SURFACE      = "#FFFFFF";
const BORDER       = "#E5E7EB";
const BORDER_SOFT  = "#EEF0F4";
const TEXT_PRIMARY = "#0D1117";
const TEXT_BODY    = "#4B5563";
const TEXT_MUTED   = "#6B7180";
const ACCENT_BLUE  = "#2563EB";
const ACCENT_BLUE_SOFT = "#EEF2FF";

const FONT_DISPLAY = "-apple-system, 'SF Pro Display', 'Inter', 'Plus Jakarta Sans', sans-serif";
const FONT_BODY    = "-apple-system, 'SF Pro Display', 'Inter', 'DM Sans', sans-serif";
const FONT_MONO    = "'SF Mono', 'JetBrains Mono', ui-monospace, monospace";
const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export type ProductPageProps = {
  /** Primary domain/tech name shown as page H1 (e.g., "Transportation Management System") */
  domain: string;
  /** Internal brand name shown as eyebrow chip (e.g., "Magic Trucks") */
  brand: string;
  /** Short positioning sub-headline */
  tagline: string;
  /** 1-2 paragraph intro */
  intro: string;
  /** Stat strip — at-a-glance numbers */
  stats?: { value: string; label: string }[];
  /** Module/capability grid */
  modules: { title: string; description: string }[];
  /** Bulleted list of business outcomes */
  benefits: string[];
  /** Industries / use cases */
  industries?: string[];
  /** Tech foundation chips */
  techStack?: string[];
  /** Status flag — "Live", "In development", "Coming soon" etc. */
  status?: string;
  /** Optional case study href if there's a related case */
  caseStudyHref?: string;
  /** Optional screenshot gallery — application UI shots with role labels */
  screenshots?: { src: string; title: string; caption: string }[];
  /** Optional brand logo (URL) shown as a contained hero visual on the right */
  logo?: string;
  /** Optional hero photo (URL) shown edge-to-edge (object-cover) on the right — takes priority over logo */
  heroImage?: string;
  /** Primary CTA label (default "Request a demo" in hero / "Book a demo" in closing) */
  primaryCtaLabel?: string;
  /** Primary CTA destination (default "/contact") */
  primaryCtaHref?: string;
  /** If true, the primary CTA opens in a new tab as an external link */
  primaryCtaExternal?: boolean;
  /** Optional override for the closing-section sub-note */
  closingNote?: string;
};

export default function ProductPageTemplate({
  domain,
  brand,
  tagline,
  intro,
  stats,
  modules,
  benefits,
  industries,
  techStack,
  status,
  caseStudyHref,
  screenshots,
  logo,
  heroImage,
  primaryCtaLabel,
  primaryCtaHref,
  primaryCtaExternal,
  closingNote,
}: ProductPageProps) {
  const hasHeroVisual = Boolean(heroImage || logo);
  const ctaHref = primaryCtaHref ?? "/contact";
  const ctaExternal = Boolean(primaryCtaExternal);
  const heroCtaLabel = primaryCtaLabel ?? "Request a demo";
  const closingCtaLabel = primaryCtaLabel ?? "Book a demo";
  return (
    <div
      className="w-full"
      style={{ backgroundColor: BG_PAGE, color: TEXT_PRIMARY, fontFamily: FONT_BODY, overflowX: "hidden" }}
    >
      <SiteNav theme="light" />

      <main>
        {/* ── Hero ───────────────────────────────────────────── */}
        <section className="w-full" style={{ backgroundColor: BG_PAGE, paddingTop: "120px" }}>
          <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12 pt-8 md:pt-12 pb-12 md:pb-20">
            <div className={hasHeroVisual ? "grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center" : ""}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EXPO_OUT }}
            >
              <div className="inline-flex items-center gap-2 mb-5">
                <span
                  className="inline-flex items-center px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.18em]"
                  style={{
                    color: ACCENT_BLUE,
                    fontFamily: FONT_MONO,
                    backgroundColor: ACCENT_BLUE_SOFT,
                    border: "1px solid rgba(37,99,235,0.18)",
                  }}
                >
                  {brand}
                </span>
                {status && (
                  <span
                    className="text-[10px] uppercase tracking-[0.18em] px-2 py-1 rounded-md"
                    style={{
                      backgroundColor: "rgba(34,197,94,0.10)",
                      color: "#15803D",
                      border: "1px solid rgba(34,197,94,0.22)",
                      fontFamily: FONT_MONO,
                    }}
                  >
                    {status}
                  </span>
                )}
              </div>

              <h1
                className="font-bold tracking-[-0.025em]"
                style={{
                  fontFamily: FONT_DISPLAY,
                  color: TEXT_PRIMARY,
                  fontSize: "clamp(36px, 5.5vw, 64px)",
                  lineHeight: 1.05,
                  maxWidth: "22ch",
                }}
              >
                {domain}
              </h1>

              <p
                className="mt-5 md:mt-6 font-medium"
                style={{
                  color: TEXT_PRIMARY,
                  fontFamily: FONT_BODY,
                  fontSize: "clamp(18px, 1.5vw, 22px)",
                  lineHeight: 1.45,
                  maxWidth: 720,
                }}
              >
                {tagline}
              </p>

              <p
                className="mt-4"
                style={{
                  color: TEXT_BODY,
                  fontFamily: FONT_BODY,
                  fontSize: "clamp(15px, 1.1vw, 17px)",
                  lineHeight: 1.6,
                  maxWidth: 720,
                }}
              >
                {intro}
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {ctaExternal ? (
                  <a
                    href={ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-[14px] font-medium transition-all cursor-pointer"
                    style={{
                      color: "#FFFFFF",
                      backgroundColor: TEXT_PRIMARY,
                      border: `1px solid ${TEXT_PRIMARY}`,
                    }}
                  >
                    <span>{heroCtaLabel}</span>
                    <ArrowUpRight size={14} strokeWidth={1.8} />
                  </a>
                ) : (
                  <Link
                    href={ctaHref}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-[14px] font-medium transition-all cursor-pointer"
                    style={{
                      color: "#FFFFFF",
                      backgroundColor: TEXT_PRIMARY,
                      border: `1px solid ${TEXT_PRIMARY}`,
                    }}
                  >
                    <span>{heroCtaLabel}</span>
                    <ArrowUpRight size={14} strokeWidth={1.8} />
                  </Link>
                )}
                {caseStudyHref && (
                  <Link
                    href={caseStudyHref}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-[14px] font-medium transition-colors cursor-pointer"
                    style={{
                      color: TEXT_PRIMARY,
                      backgroundColor: SURFACE,
                      border: `1px solid ${BORDER}`,
                    }}
                  >
                    Read the case study
                  </Link>
                )}
              </div>
            </motion.div>

            {hasHeroVisual && (
              <motion.div
                className="hidden lg:flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.1, ease: EXPO_OUT }}
              >
                {heroImage ? (
                  <div
                    className="w-full overflow-hidden"
                    style={{
                      borderRadius: 20,
                      border: `1px solid ${BORDER_SOFT}`,
                      boxShadow: "0 1px 2px rgba(13,17,23,0.04), 0 24px 60px -20px rgba(13,17,23,0.22)",
                    }}
                  >
                    <img
                      src={heroImage}
                      alt={`${brand} signage`}
                      className="w-full h-full object-cover"
                      style={{ display: "block", aspectRatio: "4 / 3.4" }}
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                ) : (
                  <div
                    className="w-full flex items-center justify-center p-12"
                    style={{ backgroundColor: BG_CANVAS, border: `1px solid ${BORDER_SOFT}`, borderRadius: 20 }}
                  >
                    <img src={logo} alt={brand} className="w-full max-w-[360px] object-contain" />
                  </div>
                )}
              </motion.div>
            )}
            </div>
          </div>
        </section>

        {/* ── Stats strip ───────────────────────────────────────────── */}
        {stats && stats.length > 0 && (
          <section className="w-full" style={{ backgroundColor: BG_CANVAS, borderTop: `1px solid ${BORDER_SOFT}`, borderBottom: `1px solid ${BORDER_SOFT}` }}>
            <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12 py-10 md:py-14">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {stats.map((s, idx) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.06, ease: EXPO_OUT }}
                  >
                    <div
                      className="font-bold tracking-[-0.025em]"
                      style={{
                        fontFamily: FONT_DISPLAY,
                        color: TEXT_PRIMARY,
                        fontSize: "clamp(28px, 2.4vw, 40px)",
                        lineHeight: 1,
                      }}
                    >
                      {s.value}
                    </div>
                    <div className="mt-2 text-[12px] uppercase tracking-[0.18em]" style={{ color: TEXT_MUTED, fontFamily: FONT_MONO }}>
                      {s.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Modules / capabilities ────────────────────────────────── */}
        <section className="w-full" style={{ backgroundColor: BG_PAGE }}>
          <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12 py-20 md:py-28">
            <motion.div
              className="mb-12 md:mb-16 max-w-[680px]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: EXPO_OUT }}
            >
              <span
                className="text-[12px] font-medium tracking-wide mb-3 block"
                style={{ color: ACCENT_BLUE, fontFamily: FONT_MONO, letterSpacing: "0.12em", textTransform: "uppercase" }}
              >
                What's in the box
              </span>
              <h2
                className="font-bold tracking-[-0.025em]"
                style={{ fontFamily: FONT_DISPLAY, color: TEXT_PRIMARY, fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.1 }}
              >
                Built around the work, not bolted on after.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {modules.map((m, idx) => (
                <motion.div
                  key={m.title}
                  className="p-6"
                  style={{
                    backgroundColor: SURFACE,
                    border: `1px solid ${BORDER_SOFT}`,
                    borderRadius: 14,
                    boxShadow: "0 1px 2px rgba(13,17,23,0.04), 0 6px 24px rgba(13,17,23,0.04)",
                  }}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05, ease: EXPO_OUT }}
                >
                  <div className="text-[12px] font-medium tracking-wider mb-3" style={{ color: TEXT_MUTED, fontFamily: FONT_MONO }}>
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <h3
                    className="font-semibold tracking-[-0.015em] mb-2"
                    style={{ fontFamily: FONT_DISPLAY, color: TEXT_PRIMARY, fontSize: "clamp(18px, 1.4vw, 20px)", lineHeight: 1.25 }}
                  >
                    {m.title}
                  </h3>
                  <p style={{ color: TEXT_BODY, fontSize: 14, lineHeight: 1.55 }}>{m.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Screenshots / Application UI ──────────────────────────── */}
        {screenshots && screenshots.length > 0 && (
          <section className="w-full" style={{ backgroundColor: BG_CANVAS, borderTop: `1px solid ${BORDER_SOFT}`, borderBottom: `1px solid ${BORDER_SOFT}` }}>
            <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12 py-20 md:py-28">
              <motion.div
                className="mb-12 md:mb-16 max-w-[680px]"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: EXPO_OUT }}
              >
                <span
                  className="text-[12px] font-medium tracking-wide mb-3 block"
                  style={{ color: ACCENT_BLUE, fontFamily: FONT_MONO, letterSpacing: "0.12em", textTransform: "uppercase" }}
                >
                  The platform
                </span>
                <h2
                  className="font-bold tracking-[-0.025em]"
                  style={{ fontFamily: FONT_DISPLAY, color: TEXT_PRIMARY, fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.1 }}
                >
                  One product, every role covered.
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                {screenshots.map((shot, idx) => (
                  <motion.figure
                    key={shot.title}
                    className="overflow-hidden"
                    style={{
                      backgroundColor: SURFACE,
                      border: `1px solid ${BORDER_SOFT}`,
                      borderRadius: 18,
                      boxShadow: "0 1px 2px rgba(13,17,23,0.04), 0 12px 36px rgba(13,17,23,0.06)",
                    }}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: idx * 0.08, ease: EXPO_OUT }}
                  >
                    <div className="w-full overflow-hidden" style={{ aspectRatio: "16 / 10", backgroundColor: "#0B1018" }}>
                      <img
                        src={shot.src}
                        alt={shot.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <figcaption className="px-5 py-4">
                      <div className="text-[11px] uppercase tracking-[0.18em] mb-1" style={{ color: ACCENT_BLUE, fontFamily: FONT_MONO }}>
                        Role
                      </div>
                      <div className="font-semibold mb-1" style={{ fontFamily: FONT_DISPLAY, color: TEXT_PRIMARY, fontSize: 17, letterSpacing: "-0.01em" }}>
                        {shot.title}
                      </div>
                      <p style={{ color: TEXT_BODY, fontSize: 13, lineHeight: 1.55 }}>{shot.caption}</p>
                    </figcaption>
                  </motion.figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Benefits ─────────────────────────────────────────────── */}
        <section className="w-full" style={{ backgroundColor: BG_CANVAS }}>
          <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12 py-20 md:py-28">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: EXPO_OUT }}
              >
                <span
                  className="text-[12px] font-medium tracking-wide mb-3 block"
                  style={{ color: ACCENT_BLUE, fontFamily: FONT_MONO, letterSpacing: "0.12em", textTransform: "uppercase" }}
                >
                  Business outcomes
                </span>
                <h2
                  className="font-bold tracking-[-0.025em]"
                  style={{ fontFamily: FONT_DISPLAY, color: TEXT_PRIMARY, fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.1 }}
                >
                  Numbers move, not just dashboards.
                </h2>
                <p
                  className="mt-5"
                  style={{ color: TEXT_BODY, fontSize: "clamp(15px, 1.1vw, 17px)", lineHeight: 1.6, maxWidth: 420 }}
                >
                  What teams actually report after going live with {brand}.
                </p>
              </motion.div>

              <ul className="space-y-3">
                {benefits.map((b, idx) => (
                  <motion.li
                    key={b}
                    className="flex items-start gap-3 p-4"
                    style={{
                      backgroundColor: SURFACE,
                      border: `1px solid ${BORDER_SOFT}`,
                      borderRadius: 12,
                    }}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: idx * 0.05, ease: EXPO_OUT }}
                  >
                    <div
                      className="flex items-center justify-center shrink-0 mt-0.5"
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 8,
                        backgroundColor: ACCENT_BLUE_SOFT,
                        color: ACCENT_BLUE,
                      }}
                    >
                      <Check size={14} strokeWidth={2.4} />
                    </div>
                    <span style={{ color: TEXT_PRIMARY, fontSize: 15, lineHeight: 1.5, fontWeight: 500 }}>{b}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Industries + Tech ─────────────────────────────────────── */}
        {(industries || techStack) && (
          <section className="w-full" style={{ backgroundColor: BG_PAGE }}>
            <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12 py-20 md:py-24 grid lg:grid-cols-2 gap-12 lg:gap-16">
              {industries && (
                <div>
                  <span
                    className="text-[12px] font-medium tracking-wide mb-3 block"
                    style={{ color: ACCENT_BLUE, fontFamily: FONT_MONO, letterSpacing: "0.12em", textTransform: "uppercase" }}
                  >
                    Industries
                  </span>
                  <h3
                    className="font-bold tracking-[-0.02em] mb-5"
                    style={{ fontFamily: FONT_DISPLAY, color: TEXT_PRIMARY, fontSize: "clamp(22px, 2vw, 28px)", lineHeight: 1.15 }}
                  >
                    Where it works.
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {industries.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 text-[13px] font-medium rounded-full"
                        style={{
                          backgroundColor: SURFACE,
                          border: `1px solid ${BORDER}`,
                          color: TEXT_PRIMARY,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {techStack && (
                <div>
                  <span
                    className="text-[12px] font-medium tracking-wide mb-3 block"
                    style={{ color: ACCENT_BLUE, fontFamily: FONT_MONO, letterSpacing: "0.12em", textTransform: "uppercase" }}
                  >
                    Tech foundation
                  </span>
                  <h3
                    className="font-bold tracking-[-0.02em] mb-5"
                    style={{ fontFamily: FONT_DISPLAY, color: TEXT_PRIMARY, fontSize: "clamp(22px, 2vw, 28px)", lineHeight: 1.15 }}
                  >
                    Built on what scales.
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {techStack.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 text-[13px] font-medium rounded-full"
                        style={{
                          backgroundColor: ACCENT_BLUE_SOFT,
                          border: "1px solid rgba(37,99,235,0.18)",
                          color: ACCENT_BLUE,
                          fontFamily: FONT_MONO,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── Closing CTA ───────────────────────────────────────────── */}
        <section className="w-full" style={{ backgroundColor: TEXT_PRIMARY, color: "#FFFFFF" }}>
          <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12 py-20 md:py-28 text-center">
            <h2
              className="font-bold tracking-[-0.025em]"
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: "clamp(28px, 4vw, 48px)",
                lineHeight: 1.05,
                maxWidth: "20ch",
                margin: "0 auto",
              }}
            >
              See {brand} in action.
            </h2>
            <p
              className="mt-4 mx-auto"
              style={{ color: "rgba(255,255,255,0.65)", fontSize: "clamp(15px, 1.1vw, 17px)", lineHeight: 1.6, maxWidth: 520 }}
            >
              {closingNote ?? "Book a 30-minute walkthrough. We'll tailor it to your team's actual workflow."}
            </p>
            {ctaExternal ? (
              <a
                href={ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full text-[14px] font-medium cursor-pointer"
                style={{ backgroundColor: "#FFFFFF", color: TEXT_PRIMARY }}
              >
                <span>{closingCtaLabel}</span>
                <ArrowUpRight size={14} strokeWidth={1.8} />
              </a>
            ) : (
              <Link
                href={ctaHref}
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full text-[14px] font-medium cursor-pointer"
                style={{ backgroundColor: "#FFFFFF", color: TEXT_PRIMARY }}
              >
                <span>{closingCtaLabel}</span>
                <ArrowUpRight size={14} strokeWidth={1.8} />
              </Link>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
