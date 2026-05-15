import React, { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Lenis from "lenis";

// Optimized assets (WebP)
import goGaugeImage from "@assets/optimized/gogauge_slide.webp";
import eagleImage from "@assets/Eagle_Web_2_1765901229010.webp";
import magicTrucksImage from "@assets/mokcup_1_1765899763586.webp";
import tixImage from "@assets/optimized/tix_iphone_mockup.webp";

// ─────────────────────────────────────────────────────────────────────────────
// Design tokens
// ─────────────────────────────────────────────────────────────────────────────
const BG_PRIMARY = "#0A0A0A";
const BG_SECONDARY = "#141414";
const TEXT_PRIMARY = "#FFFFFF";
const TEXT_SECONDARY = "#A0A0A0";
const TEXT_MUTED = "#6B6B6B";
const ACCENT_CYAN = "#A8D8FF";
const BORDER_SUBTLE = "#1F1F1F";

const FONT_DISPLAY = "'Plus Jakarta Sans', 'Inter', ui-sans-serif, system-ui, sans-serif";
const FONT_BODY = "'DM Sans', 'Inter', ui-sans-serif, system-ui, sans-serif";
const FONT_MONO = "'JetBrains Mono', ui-monospace, monospace";

// Premium easing curves
const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_OUT: [number, number, number, number] = [0.25, 0.4, 0.25, 1];

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────
const navItems = [
  { label: "Home", href: "/", external: true },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "/about", external: true },
  { label: "Contact", href: "#contact" },
];

const selectedWork = [
  {
    id: "magic-trucks",
    client: "Magic Trucks",
    scope: "Brand · Product · AI",
    href: "/case-study/magic-trucks",
    image: magicTrucksImage,
    gradient: null,
  },
  {
    id: "gva",
    client: "Gray Voice Agent",
    scope: "Product · AI · Brand",
    label: "Our product",
    href: "#",
    image: null,
    gradient: "linear-gradient(135deg, #0A1A2A 0%, #1A3A5A 50%, #2A5588 100%)",
  },
  {
    id: "eagle",
    client: "Eagle",
    scope: "Brand",
    href: "/case-study/eagle",
    image: eagleImage,
    gradient: null,
  },
  {
    id: "gogauge",
    client: "GoGauge",
    scope: "Brand · Digital · Strategy",
    href: "/case-study/gogauge",
    image: goGaugeImage,
    gradient: null,
  },
  {
    id: "cafe66",
    client: "Cafe66",
    scope: "Digital · Strategy",
    href: "#",
    image: null,
    gradient: "linear-gradient(135deg, #1A1209 0%, #3A2818 50%, #5A4028 100%)",
  },
  {
    id: "tix",
    client: "TIX",
    scope: "Brand · Product",
    label: "In development",
    href: "/case-study/tix",
    image: tixImage,
    gradient: null,
  },
];

const services = [
  { number: "01", name: "Brand",   oneLine: "The system that holds everything together." },
  { number: "02", name: "Digital", oneLine: "Where the brand meets the customer." },
  { number: "03", name: "Product", oneLine: "From the first PRD to the shipped version." },
  { number: "04", name: "AI",      oneLine: "Agents that take work off the table." },
];

const heroWords = ["We", "build", "Brand.", "Digital.", "Product.", "AI."];

// ─────────────────────────────────────────────────────────────────────────────
// Lenis smooth scroll (site-wide, respects prefers-reduced-motion)
// ─────────────────────────────────────────────────────────────────────────────
function useLenis() {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [reduced]);
}

// ─────────────────────────────────────────────────────────────────────────────
// Section reveal — fade up on scroll into view
// ─────────────────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: EXPO_OUT },
  }),
};

// ─────────────────────────────────────────────────────────────────────────────
// Discipline marquee — infinite horizontal scroll
// ─────────────────────────────────────────────────────────────────────────────
const MARQUEE_TEXT = "Brand · Digital · Product · AI · ";

function DisciplineMarquee() {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);

  const textStyle: React.CSSProperties = {
    color: TEXT_MUTED,
    fontFamily: FONT_MONO,
    fontSize: "12px",
    letterSpacing: "0.24em",
    textTransform: "uppercase",
    paddingRight: "3rem",
    whiteSpace: "nowrap",
  };

  if (reduced) {
    return (
      <div className="overflow-hidden py-4" aria-hidden="true">
        <span style={textStyle}>{MARQUEE_TEXT.repeat(4)}</span>
      </div>
    );
  }

  return (
    <div
      className="overflow-hidden py-4"
      aria-hidden="true"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ borderTop: `1px solid ${BORDER_SUBTLE}`, borderBottom: `1px solid ${BORDER_SUBTLE}` }}
    >
      <motion.div
        className="inline-flex"
        animate={paused ? { x: undefined } : { x: ["0%", "-50%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity, repeatType: "loop" }}
        style={{ willChange: "transform" }}
      >
        <span style={textStyle}>{MARQUEE_TEXT.repeat(8)}</span>
        <span style={textStyle}>{MARQUEE_TEXT.repeat(8)}</span>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Navigation — sticky, transparent over hero, blurs on scroll
// ─────────────────────────────────────────────────────────────────────────────
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(10,10,10,0.72)" : "transparent",
          backdropFilter: scrolled ? "saturate(180%) blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "saturate(180%) blur(16px)" : "none",
          borderBottom: scrolled ? `1px solid ${BORDER_SUBTLE}` : "1px solid transparent",
        }}
      >
        <div className="mx-auto max-w-[1400px] px-5 md:px-8 lg:px-12 h-[72px] md:h-[80px] flex items-center justify-between">
          <Link href="/" className="flex items-center cursor-pointer" aria-label="Gray Solutions homepage">
            <img
              src="/assets/logo-140.webp"
              srcSet="/assets/logo-140.webp 1x, /assets/logo-280.webp 2x"
              alt="Gray Solutions"
              width={90}
              height={32}
              style={{ display: "block" }}
            />
          </Link>

          <div className="flex items-center gap-3 md:gap-5">
            <button
              onClick={() => scrollTo("#contact")}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[14px] font-medium transition-all group"
              style={{ fontFamily: FONT_BODY, color: BG_PRIMARY, backgroundColor: TEXT_PRIMARY }}
              data-testid="cta-start-project-nav"
            >
              <span>Start a project</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className="flex items-center justify-center w-11 h-11 rounded-full transition-colors"
              style={{
                color: TEXT_PRIMARY,
                border: `1px solid ${BORDER_SUBTLE}`,
                backgroundColor: "rgba(255,255,255,0.04)",
              }}
              aria-label="Open menu"
              data-testid="nav-menu-button"
            >
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="1" y1="3" x2="17" y2="3" />
                <line x1="1" y1="11" x2="17" y2="11" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EXPO_OUT }}
            className="fixed inset-0 z-[100]"
            style={{ backgroundColor: BG_PRIMARY }}
          >
            <div className="mx-auto max-w-[1400px] px-5 md:px-8 lg:px-12 h-[72px] md:h-[80px] flex items-center justify-between">
              <img
                src="/assets/logo-140.webp"
                srcSet="/assets/logo-140.webp 1x, /assets/logo-280.webp 2x"
                alt="Gray Solutions"
                width={90}
                height={32}
                style={{ display: "block" }}
              />
              <button
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center w-11 h-11 rounded-full transition-colors"
                style={{
                  color: TEXT_PRIMARY,
                  border: `1px solid ${BORDER_SUBTLE}`,
                  backgroundColor: "rgba(255,255,255,0.04)",
                }}
                aria-label="Close menu"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <line x1="3" y1="3" x2="13" y2="13" />
                  <line x1="13" y1="3" x2="3" y2="13" />
                </svg>
              </button>
            </div>

            <nav className="mx-auto max-w-[1400px] px-5 md:px-8 lg:px-12 pt-16 md:pt-24" aria-label="Main menu">
              <ul className="flex flex-col gap-4 md:gap-6">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.06, ease: EXPO_OUT }}
                  >
                    {item.external ? (
                      <Link
                        href={item.href}
                        className="block font-bold tracking-[-0.02em] cursor-pointer"
                        style={{
                          fontFamily: FONT_DISPLAY,
                          color: TEXT_PRIMARY,
                          fontSize: "clamp(40px, 7vw, 88px)",
                          lineHeight: 1.0,
                        }}
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <button
                        onClick={() => scrollTo(item.href)}
                        className="block text-left font-bold tracking-[-0.02em] w-full"
                        style={{
                          fontFamily: FONT_DISPLAY,
                          color: TEXT_PRIMARY,
                          fontSize: "clamp(40px, 7vw, 88px)",
                          lineHeight: 1.0,
                        }}
                      >
                        {item.label}
                      </button>
                    )}
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: EXPO_OUT }}
                className="mt-16 md:mt-24 flex flex-wrap items-center gap-x-8 gap-y-3 text-[14px]"
                style={{ color: TEXT_SECONDARY, fontFamily: FONT_MONO }}
              >
                <a href="mailto:connect@graysolutions.in" className="hover:text-white transition-colors">connect@graysolutions.in</a>
                <a href="tel:+916380267018" className="hover:text-white transition-colors">+91 63802 67018</a>
                <span>Coimbatore, India</span>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────────────────────
function Hero() {
  const reduced = useReducedMotion();

  const wordVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: reduced ? 0 : 0.2 + i * 0.06,
        ease: EXPO_OUT,
      },
    }),
  };

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      className="relative w-full flex flex-col justify-end"
      style={{ backgroundColor: BG_PRIMARY, minHeight: "85vh", paddingTop: "80px" }}
      aria-labelledby="hero-heading"
    >
      <DisciplineMarquee />

      <div className="flex-1 flex items-center py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8 lg:px-12 w-full">
          <h1
            id="hero-heading"
            className="font-bold tracking-[-0.025em]"
            style={{
              fontFamily: FONT_DISPLAY,
              color: TEXT_PRIMARY,
              fontSize: "clamp(48px, 9.5vw, 128px)",
              lineHeight: 0.98,
              maxWidth: "16ch",
            }}
          >
            {heroWords.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                className="inline-block mr-[0.22em]"
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
              >
                {word}
              </motion.span>
            ))}
            <motion.span
              className="inline-block"
              style={{ color: ACCENT_CYAN }}
              custom={heroWords.length}
              variants={wordVariants}
              initial="hidden"
              animate="visible"
            >
              End to end.
            </motion.span>
          </h1>

          <motion.p
            className="mt-8 md:mt-10"
            style={{
              color: TEXT_SECONDARY,
              fontFamily: FONT_BODY,
              fontSize: "clamp(18px, 1.8vw, 24px)",
              lineHeight: 1.5,
              maxWidth: "640px",
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: reduced ? 0 : 0.7, ease: EXPO_OUT }}
          >
            One team, from first idea to shipped work.
          </motion.p>

          <motion.div
            className="mt-12 md:mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: reduced ? 0 : 0.9, ease: EXPO_OUT }}
          >
            <button
              onClick={() => scrollTo("#work")}
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-full text-[15px] font-medium transition-all min-h-[52px]"
              style={{ fontFamily: FONT_BODY, color: BG_PRIMARY, backgroundColor: TEXT_PRIMARY }}
              data-testid="cta-see-work"
            >
              <span>See the work</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
            <button
              onClick={() => scrollTo("#contact")}
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-full text-[15px] font-medium transition-all min-h-[52px]"
              style={{
                fontFamily: FONT_BODY,
                color: TEXT_PRIMARY,
                border: `1px solid ${BORDER_SUBTLE}`,
                backgroundColor: "rgba(255,255,255,0.03)",
              }}
              data-testid="cta-start-project"
            >
              <span>Start a project</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Selected Work — 3+3 grid
// ─────────────────────────────────────────────────────────────────────────────
function SelectedWork() {
  return (
    <section
      id="work"
      className="w-full"
      style={{ backgroundColor: BG_PRIMARY, scrollMarginTop: "80px" }}
      aria-labelledby="work-heading"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 lg:px-12 py-20 md:py-40">
        <motion.div
          className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          <div>
            <p
              className="mb-4 text-[12px] uppercase tracking-[0.24em]"
              style={{ color: TEXT_MUTED, fontFamily: FONT_MONO }}
            >
              Selected work
            </p>
            <h2
              id="work-heading"
              className="font-bold tracking-[-0.025em]"
              style={{
                fontFamily: FONT_DISPLAY,
                color: TEXT_PRIMARY,
                fontSize: "clamp(36px, 5.5vw, 72px)",
                lineHeight: 1.0,
                maxWidth: "20ch",
              }}
            >
              Work we&apos;ve shipped.
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedWork.map((tile, idx) => {
            const isLinkable = tile.href !== "#";
            const inner = (
              <motion.article
                className="group relative overflow-hidden cursor-pointer"
                style={{
                  backgroundColor: BG_SECONDARY,
                  borderRadius: "20px",
                  minHeight: "400px",
                  height: "100%",
                  border: `1px solid ${BORDER_SUBTLE}`,
                }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: idx * 0.08, ease: EXPO_OUT }}
              >
                {/* Background image or gradient */}
                <div
                  className="absolute inset-0 transition-all duration-[600ms] ease-out group-hover:scale-[1.04] group-hover:brightness-110"
                  style={
                    tile.image
                      ? {
                          backgroundImage: `url(${tile.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }
                      : { background: tile.gradient || BG_SECONDARY }
                  }
                  aria-hidden="true"
                />

                {/* Overlay gradient for legibility */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(10,10,10,0.05) 0%, rgba(10,10,10,0.35) 55%, rgba(10,10,10,0.88) 100%)",
                  }}
                  aria-hidden="true"
                />

                {/* Label pill (top-left) */}
                {tile.label && (
                  <div
                    className="absolute top-5 left-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] uppercase tracking-[0.18em]"
                    style={{
                      color: TEXT_PRIMARY,
                      fontFamily: FONT_MONO,
                      backgroundColor: "rgba(255,255,255,0.08)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.12)",
                    }}
                  >
                    {tile.label}
                  </div>
                )}

                {/* Hover arrow (top-right) */}
                <div
                  className="absolute top-5 right-5 flex items-center justify-center w-10 h-10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-0 translate-x-2"
                  style={{ backgroundColor: "rgba(255,255,255,0.95)", color: BG_PRIMARY }}
                  aria-hidden="true"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M3 11L11 3M11 3H5M11 3V9" />
                  </svg>
                </div>

                {/* Content (bottom) */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
                  <h3
                    className="font-bold tracking-[-0.02em] mb-2"
                    style={{
                      fontFamily: FONT_DISPLAY,
                      color: TEXT_PRIMARY,
                      fontSize: "clamp(24px, 2.6vw, 36px)",
                      lineHeight: 1.05,
                    }}
                  >
                    {tile.client}
                  </h3>
                  <p
                    className="text-[12px] uppercase tracking-[0.18em]"
                    style={{ color: "rgba(255,255,255,0.65)", fontFamily: FONT_MONO }}
                  >
                    {tile.scope}
                  </p>
                </div>
              </motion.article>
            );

            return isLinkable ? (
              <Link key={tile.id} href={tile.href} className="block cursor-pointer">
                {inner}
              </Link>
            ) : (
              <div key={tile.id} className="block">
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Services — 4 columns
// ─────────────────────────────────────────────────────────────────────────────
function Services() {
  return (
    <section
      id="services"
      className="w-full"
      style={{ backgroundColor: BG_PRIMARY, scrollMarginTop: "80px", borderTop: `1px solid ${BORDER_SUBTLE}` }}
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 lg:px-12 py-20 md:py-40">
        <motion.div
          className="mb-12 md:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          <p
            className="mb-4 text-[12px] uppercase tracking-[0.24em]"
            style={{ color: TEXT_MUTED, fontFamily: FONT_MONO }}
          >
            Services
          </p>
          <h2
            id="services-heading"
            className="font-bold tracking-[-0.025em]"
            style={{
              fontFamily: FONT_DISPLAY,
              color: TEXT_PRIMARY,
              fontSize: "clamp(36px, 5.5vw, 72px)",
              lineHeight: 1.0,
              maxWidth: "22ch",
            }}
          >
            Four disciplines, one team.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-10 lg:gap-0">
          {services.map((service, idx) => (
            <motion.div
              key={service.number}
              className="lg:pr-8 lg:pl-8 lg:first:pl-0 lg:last:pr-0"
              style={{ borderLeft: idx > 0 ? `1px solid ${BORDER_SUBTLE}` : "none" }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: EXPO_OUT }}
            >
              <span
                className="block mb-6 text-[12px] uppercase tracking-[0.24em]"
                style={{ color: TEXT_MUTED, fontFamily: FONT_MONO }}
              >
                {service.number}
              </span>
              <h3
                className="font-bold tracking-[-0.02em] mb-4"
                style={{
                  fontFamily: FONT_DISPLAY,
                  color: TEXT_PRIMARY,
                  fontSize: "clamp(32px, 3.2vw, 44px)",
                  lineHeight: 1.0,
                }}
              >
                {service.name}
              </h3>
              <p
                style={{
                  color: TEXT_SECONDARY,
                  fontFamily: FONT_BODY,
                  fontSize: "18px",
                  lineHeight: 1.55,
                }}
              >
                {service.oneLine}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Close CTA
// ─────────────────────────────────────────────────────────────────────────────
function CloseCTA() {
  return (
    <section
      id="contact"
      className="w-full"
      style={{ backgroundColor: BG_PRIMARY, scrollMarginTop: "80px", borderTop: `1px solid ${BORDER_SUBTLE}` }}
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 lg:px-12 py-32 md:py-52">
        <motion.div
          className="flex flex-col items-center text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          <h2
            id="cta-heading"
            className="font-bold tracking-[-0.03em]"
            style={{
              fontFamily: FONT_DISPLAY,
              color: TEXT_PRIMARY,
              fontSize: "clamp(48px, 7vw, 96px)",
              lineHeight: 0.98,
              maxWidth: "14ch",
            }}
          >
            Start a project.
          </h2>
          <motion.p
            className="mt-8 md:mt-10"
            style={{
              color: TEXT_SECONDARY,
              fontFamily: FONT_BODY,
              fontSize: "clamp(18px, 1.6vw, 22px)",
              lineHeight: 1.5,
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: EXPO_OUT }}
          >
            Tell us what you&apos;re building.
          </motion.p>
          <motion.a
            href="mailto:connect@graysolutions.in"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full text-[15px] font-medium transition-all mt-12 md:mt-14"
            style={{
              fontFamily: FONT_BODY,
              color: BG_PRIMARY,
              backgroundColor: TEXT_PRIMARY,
              minHeight: "52px",
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: EXPO_OUT }}
            data-testid="cta-get-in-touch"
          >
            <span>Get in touch</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </motion.a>

          <motion.div
            className="mt-10 md:mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[14px]"
            style={{ color: TEXT_MUTED, fontFamily: FONT_MONO }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.45, ease: EXPO_OUT }}
          >
            <a href="mailto:connect@graysolutions.in" className="hover:text-white transition-colors">connect@graysolutions.in</a>
            <span className="opacity-50">·</span>
            <a href="tel:+916380267018" className="hover:text-white transition-colors">+91 63802 67018</a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────────────────────────────
function LandingFooter() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer
      className="w-full"
      style={{ backgroundColor: BG_PRIMARY, borderTop: `1px solid ${BORDER_SUBTLE}` }}
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 lg:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Column 1 — wordmark */}
          <div>
            <img
              src="/assets/logo-140.webp"
              srcSet="/assets/logo-140.webp 1x, /assets/logo-280.webp 2x"
              alt="Gray Solutions"
              width={100}
              height={36}
              style={{ display: "block", filter: "brightness(0.95)" }}
            />
          </div>

          {/* Column 2 — links */}
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[15px]" style={{ fontFamily: FONT_BODY }}>
              <li>
                <button onClick={() => scrollTo("#work")} style={{ color: TEXT_SECONDARY }} className="hover:text-white transition-colors">
                  Work
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("#services")} style={{ color: TEXT_SECONDARY }} className="hover:text-white transition-colors">
                  Services
                </button>
              </li>
              <li>
                <Link href="/about" style={{ color: TEXT_SECONDARY }} className="hover:text-white transition-colors cursor-pointer">
                  About
                </Link>
              </li>
              <li>
                <button onClick={() => scrollTo("#contact")} style={{ color: TEXT_SECONDARY }} className="hover:text-white transition-colors">
                  Contact
                </button>
              </li>
            </ul>
          </nav>

          {/* Column 3 — contact */}
          <div className="flex flex-col gap-2 text-[14px]" style={{ color: TEXT_SECONDARY, fontFamily: FONT_MONO }}>
            <a href="mailto:connect@graysolutions.in" className="hover:text-white transition-colors">connect@graysolutions.in</a>
            <a href="tel:+916380267018" className="hover:text-white transition-colors">+91 63802 67018</a>
            <span>Coimbatore, India</span>
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="mt-12 md:mt-16 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-[13px]"
          style={{ color: TEXT_MUTED, fontFamily: FONT_MONO, borderTop: `1px solid ${BORDER_SUBTLE}` }}
        >
          <span>© 2026 Gray Solutions</span>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Landing Page (entry)
// ─────────────────────────────────────────────────────────────────────────────
export default function Landing() {
  useLenis();

  return (
    <div
      className="w-full"
      style={{ backgroundColor: BG_PRIMARY, color: TEXT_PRIMARY, fontFamily: FONT_BODY, overflowX: "hidden" }}
    >
      <Navigation />

      <main>
        <Hero />
        <SelectedWork />
        <Services />
        <CloseCTA />
      </main>

      <LandingFooter />
    </div>
  );
}
