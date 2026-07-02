import React, { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Palette, LineChart, Code2, Sparkles, ArrowUpRight, ArrowRight, SlidersHorizontal, Mail, Send, Users, Rocket, Shield, Calendar, Phone, MapPin } from "lucide-react";
import SiteNav from "@/components/site-nav";
import Footer from "@/components/footer";
import ArcadeHero from "@/hero-arcade";
import { resolveLayoutParam } from "@/hero-arcade/theme";
import galaxyHero from "@assets/hero/galaxy-2026.webp";
import type { LucideIcon } from "lucide-react";
import Lenis from "lenis";

// Optimized assets (WebP)
import {
  selectedWork,
  workCategories,
  type WorkItem,
  type WorkCategory,
} from "@/lib/work-data";
import gvaOfficeSign from "@assets/gva/gva-office-sign.webp";
import eagleLogo from "@assets/client-logos/eagle.webp";
import cafe66Logo from "@assets/client-logos/cafe66.webp";
import kopoLogo from "@assets/client-logos/kopo.webp";
import gvaBadge from "@assets/client-logos/gva-badge-white.svg";

// ─────────────────────────────────────────────────────────────────────────────
// Design tokens (Gray Solutions Design System v1.1 — Premium polish pass)
// ─────────────────────────────────────────────────────────────────────────────
const BG_DEEP         = "#05070D";        // Page background (deeper navy-black)
const BG_PRIMARY      = "#090B12";        // Surface tier 1
const BG_SECONDARY    = "#0F1218";        // Surface tier 2 — slight lift
const SURFACE_GLASS   = "rgba(17,24,39,0.55)";   // Legacy — kept for back-compat
const SURFACE_GLASS_LO = "rgba(11,16,28,0.45)";  // Ambient cards (lighter glass)
const SURFACE_GLASS_HI = "rgba(20,28,46,0.65)";  // Prominent cards (denser glass)
const BORDER_AMBIENT  = "rgba(45,59,102,0.25)";  // Soft ambient stroke
const BORDER_GLOW     = "rgba(59,130,246,0.30)"; // Interactive stroke (was #2D3B66)
const INNER_HIGHLIGHT = "rgba(255,255,255,0.06)";// Inset top edge for glass realism
const TEXT_PRIMARY    = "#F1F3F8";        // Cleaner cool-white
const TEXT_SECONDARY  = "#8B92A3";        // Dimmer secondary (was #A3A8B3)
const TEXT_TERTIARY   = "#5A6273";        // Mono eyebrows, captions
const TEXT_MUTED      = "#5A6273";        // alias
const ACCENT_BLUE     = "#3B82F6";
const ACCENT_BLUE_SOFT = "#C7DCFF";       // Tinted icon color
const ACCENT_VIOLET   = "#8B5CF6";        // Richer violet for End-to-end gradient & accents
const ACCENT_WHITE_GLOW = "#EAF2FF";
const ACCENT_CYAN     = "#A8D8FF";        // Legacy alias
const ACCENT_GLOW_HALO = "rgba(59,130,246,0.18)"; // Atmospheric color-bleed
const BORDER_SUBTLE   = "rgba(255,255,255,0.05)";
// Shadow / Glow tokens
const SHADOW_SOFT     = "0 8px 32px rgba(0,0,0,0.45)";
const SHADOW_CINEMATIC = [
  "inset 0 1px 0 rgba(255,255,255,0.06)",
  "inset 0 -1px 0 rgba(0,0,0,0.3)",
  "0 1px 0 rgba(255,255,255,0.02)",
  "0 24px 48px -24px rgba(0,0,0,0.5)",
  "0 0 0 1px rgba(59,130,246,0.06)",
].join(", ");
const SHADOW_BLUE_GLOW = "0 0 24px rgba(59,130,246,0.35)";
// Blur tokens
const BLUR_MEDIUM     = "16px";
const BLUR_STRONG     = "32px";
const BLUR_NAV        = "24px";

const FONT_DISPLAY = "'Plus Jakarta Sans', 'Inter', ui-sans-serif, system-ui, sans-serif";
const FONT_BODY = "'DM Sans', 'Inter', ui-sans-serif, system-ui, sans-serif";
const FONT_MONO = "'JetBrains Mono', ui-monospace, monospace";

// Premium easing curves
const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_OUT: [number, number, number, number] = [0.25, 0.4, 0.25, 1];
const EXPO_OUT_CSS = "cubic-bezier(0.16, 1, 0.3, 1)";

// 5-layer soft shadow — the exact Framer/Whenevr signature
const SHADOW_5_LAYER = [
  "rgba(108, 113, 128, 0.08) 0px 2px 4px",
  "rgba(108, 113, 128, 0.07) 0px 7px 7px",
  "rgba(108, 113, 128, 0.04) 0px 17px 10px",
  "rgba(108, 113, 128, 0.01) 0px 29px 12px",
  "rgba(108, 113, 128, 0) 0px 46px 13px",
].join(", ");

// Intensified version for hover state
const SHADOW_5_LAYER_HOVER = [
  "rgba(108, 113, 128, 0.16) 0px 4px 8px",
  "rgba(108, 113, 128, 0.14) 0px 14px 14px",
  "rgba(108, 113, 128, 0.08) 0px 34px 20px",
  "rgba(108, 113, 128, 0.02) 0px 58px 24px",
  "rgba(108, 113, 128, 0) 0px 92px 26px",
].join(", ");

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────
const navItems: Array<{
  label: string;
  href: string;
  external?: boolean;
  dropdown?: { label: string; href: string }[];
}> = [
  { label: "About us", href: "/about", external: true },
  { label: "Services", href: "#services" },
  {
    label: "Products",
    href: "#products",
    dropdown: [
      { label: "Digital Products", href: "#work" },
      { label: "AI Solutions",     href: "#work" },
      { label: "Automation",       href: "#work" },
      { label: "Platforms",        href: "#work" },
      { label: "Integrations",     href: "#work" },
    ],
  },
  { label: "Work",     href: "#work" },
  { label: "Insights", href: "/blogs", external: true },
  { label: "Contact",  href: "#contact" },
];

// Stats row data
const heroStats = [
  { value: "120+", label: "Projects",          icon: "briefcase" },
  { value: "98%",  label: "Client Satisfaction", icon: "star"     },
  { value: "60+",  label: "Clients",           icon: "users"     },
  { value: "8+",   label: "Industries",        icon: "barchart"  },
];

// Featured work card data
const featuredWork = {
  eyebrow: "Latest product",
  title: "Gray Voice Agent",
  description:
    "An AI voice agent that answers every call, qualifies leads, and books meetings 24/7 — brand, product, and automation built end to end.",
  href: "/products/voice-agent-ai",
  cta: "Explore the product",
};

// Client logos for the Trusted-by strip — 8 clients in a 2×4 grid on desktop.
// `img` = white-on-transparent WebP (sharp-processed); `svg` = inline Magic Trucks cube;
// `text` = styled wordmark rendered with brand-appropriate typography.
type ClientLogo =
  | { id: string; name: string; type: "img"; src: string; maxHeight?: number }
  | { id: string; name: string; type: "svg" }
  | { id: string; name: string; type: "text"; label: string; style?: React.CSSProperties };

const clientLogos: ClientLogo[] = [
  // Row 1 — existing
  { id: "magic-trucks", name: "Magic Trucks", type: "svg" },
  { id: "eagle",        name: "Eagle",        type: "img", src: eagleLogo,  maxHeight: 30 },
  { id: "cafe66",       name: "Cafe 66",      type: "img", src: cafe66Logo, maxHeight: 36 },
  { id: "kopo",         name: "KOPO",         type: "img", src: kopoLogo,   maxHeight: 18 },
  // Row 2 — new
  {
    id: "gogauge",
    name: "GoGauge",
    type: "text",
    label: "GoGauge",
    style: { fontWeight: 700, fontSize: 15, letterSpacing: "-0.02em", fontFamily: FONT_DISPLAY },
  },
  {
    id: "gva",
    name: "Gray Voice Agent",
    type: "img",
    src: gvaBadge,
    maxHeight: 34,
  },
  {
    id: "tix",
    name: "TIX",
    type: "text",
    label: "TIX",
    style: { fontWeight: 900, fontSize: 18, letterSpacing: "-0.02em", fontFamily: FONT_DISPLAY },
  },
  {
    id: "krft",
    name: "Krft",
    type: "text",
    label: "krft.",
    style: { fontWeight: 700, fontSize: 16, letterSpacing: "-0.03em", fontFamily: FONT_DISPLAY },
  },
];

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
    transition: { duration: 0.6, delay, ease: EXPO_OUT },
  }),
};

// ─────────────────────────────────────────────────────────────────────────────
// SlidingButton — Framer-style text-slide-up hover reveal
// Renders text twice; on hover the first copy slides up & out, second slides in.
// ─────────────────────────────────────────────────────────────────────────────
type SlidingButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "gradient";
  onClick?: () => void;
  href?: string;
  className?: string;
  "data-testid"?: string;
};

function SlidingButton({
  children,
  variant = "primary",
  onClick,
  href,
  className = "",
  ...rest
}: SlidingButtonProps) {
  const baseStyle: React.CSSProperties =
    variant === "primary"
      ? { backgroundColor: TEXT_PRIMARY, color: BG_PRIMARY, fontFamily: FONT_BODY }
      : variant === "gradient"
      ? {
          background: "linear-gradient(135deg, #3B82F6 0%, #6366F1 48%, #8B5CF6 100%)",
          color: "#FFFFFF",
          fontFamily: FONT_BODY,
          border: "1px solid rgba(255,255,255,0.18)",
          boxShadow:
            "0 12px 34px -8px rgba(99,102,241,0.7), inset 0 1px 0 rgba(255,255,255,0.25)",
        }
      : {
          backgroundColor: "rgba(255,255,255,0.03)",
          color: TEXT_PRIMARY,
          border: `1px solid ${BORDER_SUBTLE}`,
          fontFamily: FONT_BODY,
        };

  const baseClasses =
    "group relative overflow-hidden inline-flex items-center justify-center rounded-full text-[15px] font-semibold min-h-[52px] px-7 py-4 transition-colors";

  const inner = (
    <>
      <span
        className="inline-flex items-center gap-2"
        style={{
          transition: `transform 300ms ${EXPO_OUT_CSS}, opacity 300ms ${EXPO_OUT_CSS}`,
        }}
      >
        {children}
      </span>
      <span
        className="absolute inset-0 inline-flex items-center justify-center gap-2"
        style={{
          transform: "translateY(100%)",
          transition: `transform 300ms ${EXPO_OUT_CSS}`,
        }}
        aria-hidden="true"
      >
        {children}
      </span>
      <style>{`
        .sliding-btn:hover > span:first-of-type { transform: translateY(-100%); opacity: 0; }
        .sliding-btn:hover > span:last-of-type { transform: translateY(0); }
      `}</style>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`sliding-btn ${baseClasses} ${className}`}
        style={baseStyle}
        {...rest}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`sliding-btn ${baseClasses} ${className}`}
      style={baseStyle}
      {...rest}
    >
      {inner}
    </button>
  );
}

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
    const onScroll = () => setScrolled(window.scrollY > 30);
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
          backgroundColor: scrolled ? "rgba(9,11,18,0.50)" : "transparent",
          backdropFilter: scrolled ? `saturate(180%) blur(${BLUR_NAV})` : "none",
          WebkitBackdropFilter: scrolled ? `saturate(180%) blur(${BLUR_NAV})` : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.04)" : "1px solid transparent",
        }}
      >
        {/* Subtle scan-line gradient under the nav when scrolled */}
        {scrolled && (
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.25) 50%, transparent 100%)",
              opacity: 0.5,
            }}
          />
        )}
        <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12 h-[60px] md:h-[68px] flex items-center justify-between">
          <Link href="/" className="flex items-center cursor-pointer" aria-label="Gray Solutions homepage">
            <img
              src="/assets/logo-140.webp"
              srcSet="/assets/logo-140.webp 1x, /assets/logo-280.webp 2x"
              alt="Gray Solutions"
              width={86}
              height={30}
              style={{ display: "block", filter: "drop-shadow(0 0 12px rgba(59,130,246,0.15))" }}
            />
          </Link>

          {/* Desktop inline menu — center */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10" aria-label="Main">
            {navItems.map((item) => {
              if (item.dropdown) {
                return (
                  <div key={item.label} className="relative group/dropdown">
                    <button
                      className="inline-flex items-center gap-1.5 text-[13px] hover:text-white transition-colors py-2"
                      style={{ fontFamily: FONT_BODY, color: "rgba(255,255,255,0.62)", letterSpacing: "-0.005em" }}
                    >
                      <span>{item.label}</span>
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 1l4 4 4-4" />
                      </svg>
                    </button>
                    {/* Dropdown panel — softer blur, refined hover */}
                    <div
                      className="absolute left-0 top-full mt-3 min-w-[240px] opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-300"
                      style={{
                        backgroundColor: "rgba(11, 16, 28, 0.75)",
                        backdropFilter: "saturate(180%) blur(40px)",
                        WebkitBackdropFilter: "saturate(180%) blur(40px)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: 18,
                        padding: 6,
                        boxShadow:
                          "0 24px 60px -20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
                      }}
                    >
                      {item.dropdown.map((sub) => (
                        <a
                          key={sub.label}
                          href={sub.href}
                          className="dropdown-link flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[13px] transition-colors"
                          style={{
                            fontFamily: FONT_BODY,
                            color: "rgba(255,255,255,0.72)",
                            letterSpacing: "-0.003em",
                          }}
                        >
                          <span>{sub.label}</span>
                          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                            <path d="M4 2l4 4-4 4" />
                          </svg>
                        </a>
                      ))}
                      <style>{`
                        .dropdown-link:hover {
                          background-color: rgba(59, 130, 246, 0.08);
                          color: #fff;
                        }
                      `}</style>
                    </div>
                  </div>
                );
              }
              return item.external ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[13px] hover:text-white transition-colors cursor-pointer"
                  style={{ fontFamily: FONT_BODY, color: "rgba(255,255,255,0.62)", letterSpacing: "-0.005em" }}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.href)}
                  className="text-[13px] hover:text-white transition-colors"
                  style={{ fontFamily: FONT_BODY, color: "rgba(255,255,255,0.62)", letterSpacing: "-0.005em" }}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 md:gap-4">
            <div className="hidden md:block">
              <button
                onClick={() => scrollTo("#contact")}
                className="nav-cta group inline-flex items-center gap-2 px-4 rounded-full text-[13px] font-medium transition-all"
                style={{
                  fontFamily: FONT_BODY,
                  color: "#E6F0FF",
                  border: "1px solid rgba(59,130,246,0.30)",
                  background:
                    "linear-gradient(180deg, rgba(59,130,246,0.06) 0%, rgba(59,130,246,0.02) 100%)",
                  height: 36,
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
                }}
                data-testid="cta-start-project-nav"
              >
                <span>Start a project</span>
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <path d="M3 11L11 3M11 3H5M11 3V9" />
                </svg>
              </button>
              <style>{`
                .nav-cta:hover {
                  background: linear-gradient(180deg, rgba(59,130,246,0.14) 0%, rgba(59,130,246,0.06) 100%) !important;
                  border-color: rgba(59,130,246,0.50) !important;
                }
              `}</style>
            </div>
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden flex items-center justify-center w-11 h-11 rounded-full transition-colors"
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
            <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12 h-[72px] md:h-[80px] flex items-center justify-between">
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

            <nav className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12 pt-16 md:pt-24" aria-label="Main menu">
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
// Rotating words for the hero — accumulate as the cycle progresses
const ROTATING_WORDS: { text: string; group: 1 | 2 | 3 }[] = [
  { text: "Brand.",      group: 1 },
  { text: "Digital.",    group: 1 },
  { text: "Product.",    group: 2 },
  { text: "AI.",         group: 2 },
  { text: "End to end.", group: 3 },
];

// Simple inline icons for the stats row + featured work card
function StatIcon({ name }: { name: string }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "briefcase":
      return (
        <svg {...common}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2" />
        </svg>
      );
    case "star":
      return (
        <svg {...common}>
          <path d="M12 3l2.6 5.7 6.2.6-4.7 4.3 1.4 6.1L12 16.9 6.5 19.7 7.9 13.6 3.2 9.3l6.2-.6L12 3z" />
        </svg>
      );
    case "users":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3.2" />
          <circle cx="17" cy="9" r="2.6" />
          <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5" />
          <path d="M15 19c0-2 1.5-3.5 4-3.5s2 1.5 2 3.5" />
        </svg>
      );
    case "barchart":
      return (
        <svg {...common}>
          <path d="M4 20V11" />
          <path d="M10 20V4" />
          <path d="M16 20v-7" />
          <path d="M22 20H2" />
        </svg>
      );
    case "arrow-right":
      return (
        <svg {...common} width={16} height={16}>
          <path d="M5 12h14" />
          <path d="M13 6l6 6-6 6" />
        </svg>
      );
    default:
      return null;
  }
}

// Hero backdrop — full-bleed cosmic galaxy, statically placed (no motion/zoom).
// Scrims keep the headline legible and dissolve the image into the page bottom.
function HeroBackdrop() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <img
        src={galaxyHero}
        alt=""
        className="absolute inset-0 w-full h-full object-contain"
        style={{ objectPosition: "center top" }}
        loading="eager"
        decoding="async"
      />

      {/* Left scrim — keeps the headline readable over the galaxy */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(5,7,13,0.92) 0%, rgba(5,7,13,0.72) 24%, rgba(5,7,13,0.34) 46%, rgba(5,7,13,0.05) 66%, rgba(5,7,13,0) 78%)",
        }}
      />

      {/* Top + bottom fades — blend into the nav and dissolve into the page */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,7,13,0.88) 0%, rgba(5,7,13,0.55) 8%, rgba(5,7,13,0) 20%, rgba(5,7,13,0) 58%, #05070D 100%)",
        }}
      />
    </div>
  );
}

// Glass card surface — design system §3 (legacy; KPI cards now use richer treatment below)
// Liquid-glass surface — translucent base; the .lg class adds gloss + cursor
// specular, and the bright inset top edge-rim lives here in the box-shadow.
const GLASS_CARD_STYLE: React.CSSProperties = {
  backgroundColor: "rgba(20,28,46,0.42)",
  backdropFilter: `saturate(190%) blur(26px)`,
  WebkitBackdropFilter: `saturate(190%) blur(26px)`,
  border: `1px solid rgba(255,255,255,0.12)`,
  borderRadius: 22,
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.40), inset 0 0 24px rgba(255,255,255,0.03), 0 14px 40px -12px rgba(0,0,0,0.55)",
};

// KPI card surface — liquid glass (uses backgroundColor so .lg gloss shows)
const KPI_CARD_STYLE: React.CSSProperties = {
  backgroundColor: "rgba(20,28,46,0.48)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 22,
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.45), inset 0 0 26px rgba(255,255,255,0.04), 0 18px 50px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
  backdropFilter: `saturate(190%) blur(30px)`,
  WebkitBackdropFilter: `saturate(190%) blur(30px)`,
};

const KPI_ICON_STYLE: React.CSSProperties = {
  width: 42,
  height: 42,
  borderRadius: 11,
  background:
    "linear-gradient(180deg, rgba(59,130,246,0.10) 0%, rgba(59,130,246,0.02) 100%), rgba(11,16,28,0.6)",
  border: "1px solid rgba(59,130,246,0.16)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 0 16px rgba(59,130,246,0.10)",
  color: ACCENT_BLUE_SOFT,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  transition: "box-shadow 400ms cubic-bezier(0.16,1,0.3,1), border-color 400ms",
};

// Icon container — design system §4 (used by ServiceCard etc.)
const ICON_CONTAINER_STYLE: React.CSSProperties = {
  width: 44,
  height: 44,
  borderRadius: 12,
  backgroundColor: "rgba(11, 16, 28, 0.7)",
  border: `1px solid rgba(45, 59, 102, 0.6)`,
  color: ACCENT_WHITE_GLOW,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

// Stats row — premium glass cards with cinematic depth
function StatsRow() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mt-14 lg:mt-14 relative z-10">
      {heroStats.map((s, idx) => (
        <motion.div
          key={s.label}
          className="kpi-card lg flex items-center gap-3 lg:gap-4 px-4 lg:px-5 py-4 overflow-hidden"
          style={KPI_CARD_STYLE}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: idx * 0.08, ease: EXPO_OUT }}
          whileHover={{ y: -2 }}
        >
          <div className="kpi-icon" style={KPI_ICON_STYLE}>
            <StatIcon name={s.icon} />
          </div>
          <div className="flex flex-col">
            <span
              className="font-bold tracking-[-0.025em]"
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: "clamp(28px, 2.2vw, 36px)",
                lineHeight: 1.0,
                background: "linear-gradient(180deg, #FFFFFF 0%, #BAC4D6 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
              }}
            >
              {s.value}
            </span>
            <span
              className="mt-1.5 text-[11px] uppercase tracking-[0.18em]"
              style={{ color: TEXT_TERTIARY, fontFamily: FONT_MONO }}
            >
              {s.label}
            </span>
          </div>
        </motion.div>
      ))}
      <style>{`
        .kpi-card {
          transition: background 400ms cubic-bezier(0.16,1,0.3,1), border-color 400ms, transform 400ms;
        }
        .kpi-card:hover {
          border-color: rgba(59,130,246,0.18);
          background:
            radial-gradient(120% 100% at 0% 0%, rgba(59,130,246,0.10) 0%, transparent 50%),
            linear-gradient(180deg, rgba(28,38,60,0.6) 0%, rgba(15,22,38,0.6) 100%);
        }
        .kpi-card:hover .kpi-icon {
          border-color: rgba(59,130,246,0.32) !important;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.10), 0 0 24px rgba(59,130,246,0.20) !important;
        }
      `}</style>
    </div>
  );
}

// Trusted-by client logo grid + Featured work card
function TrustedAndFeatured() {
  return (
    <div className="mt-3 md:mt-4 grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 items-stretch relative z-10">
      {/* Trusted by — ambient glass, scan-line separator, hoverable logo holders */}
      <div
        className="flex flex-col p-4 lg:p-5 h-full"
        style={{
          background:
            "radial-gradient(120% 100% at 0% 0%, rgba(59,130,246,0.04) 0%, transparent 50%), linear-gradient(180deg, rgba(20,28,46,0.50) 0%, rgba(11,16,28,0.50) 100%)",
          border: "1px solid rgba(255,255,255,0.05)",
          borderRadius: 18,
          boxShadow: SHADOW_CINEMATIC,
          backdropFilter: `saturate(180%) blur(24px)`,
          WebkitBackdropFilter: `saturate(180%) blur(24px)`,
        }}
      >
        <div className="mb-3">
          <p
            className="text-[10px] lg:text-[11px] uppercase tracking-[0.24em]"
            style={{ color: TEXT_TERTIARY, fontFamily: FONT_MONO }}
          >
            Trusted by forward-thinking teams
          </p>
          {/* Scan-line separator */}
          <div
            aria-hidden="true"
            className="mt-2 h-px"
            style={{
              background:
                "linear-gradient(90deg, rgba(59,130,246,0.4) 0%, transparent 100%)",
            }}
          />
        </div>
        {/* 8 client logos in a 2×4 grid (4 cols × 2 rows) on sm+, 2×4 (2 cols × 4 rows) on mobile.
            Each holder is roughly half the previous height so the strip stays compact. */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-1">
          {clientLogos.map((logo) => (
            <div
              key={logo.id}
              className="logo-holder flex items-center justify-center"
              style={{
                minHeight: 40,
                background:
                  "linear-gradient(180deg, rgba(20,28,46,0.40) 0%, rgba(11,16,28,0.40) 100%)",
                border: "1px solid rgba(255,255,255,0.04)",
                borderRadius: 10,
                transition: `border-color 300ms ${EXPO_OUT_CSS}, transform 300ms ${EXPO_OUT_CSS}`,
              }}
              aria-label={logo.name}
            >
              {logo.type === "img" && (
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="logo-holder-img"
                  style={{
                    maxHeight: logo.maxHeight ?? 22,
                    maxWidth: "70%",
                    width: "auto",
                    objectFit: "contain",
                    opacity: 0.78,
                    transition: `opacity 300ms ${EXPO_OUT_CSS}`,
                  }}
                  loading="lazy"
                  decoding="async"
                />
              )}
              {logo.type === "svg" && (
                /* Magic Trucks: cube icon + wordmark */
                <div
                  className="flex items-center gap-1.5 logo-holder-img"
                  style={{ opacity: 0.78, transition: `opacity 300ms ${EXPO_OUT_CSS}` }}
                >
                  <svg width="12" height="14" viewBox="0 0 152 178" fill="none" aria-hidden="true">
                    <path
                      d="M0 88.31C0.12 73.67 0.24 59.03 0.34 44.39c0-0.46 0.11-0.8 0.45-1.13 0.91-0.9 1.97-1.57 3.08-2.18 8.56-4.61 16.91-9.58 25.43-14.25 5.76-3.16 11.34-6.63 17-9.96 1.9-1.12 3.9-2.04 5.88-3.02 0.74-0.36 1.36-0.01 1.94 0.32 1.84 1 3.62 2.09 5.41 3.17 2.51 1.51 5.02 3 7.51 4.53 0.53 0.33 1.04 0.72 1.52 1.13 0.77 0.67 0.74 1.17-0.07 1.82-0.74 0.6-1.58 1.04-2.43 1.45-8.09 3.85-15.74 8.5-23.45 13.04-4.5 2.64-9.04 5.22-13.54 7.85-2.03 1.19-2.05 1.74-0.04 2.96 9.04 5.5 18.1 10.96 27.13 16.47 5.5 3.36 11.1 6.57 16.65 9.86 0.54 0.32 1.08 0.66 1.56 1.07 1.33 1.1 2.66 1.07 4.12 0.24 2.58-1.49 5.16-2.99 7.74-4.49 11.78-6.84 23.57-13.64 35.36-20.45 0.94-0.55 1.9-1.07 2.8-1.68 0.88-0.6 0.88-1.09 0-1.71-2.17-1.56-4.48-2.89-6.75-4.28-16.28-9.98-32.59-19.91-48.76-30.07-2.42-1.52-5.07-2.71-7.28-4.56-1.31-1.1-1.57-1.17 0.09-2.21 2.89-1.81 5.91-3.4 8.88-5.08 1.55-0.88 3.14-1.67 4.63-2.65 1.3-0.85 2.45-0.71 3.68 0.05 4.12 2.55 8.25 5.09 12.38 7.62 14.24 8.7 28.38 17.56 42.75 26.05 4.84 2.86 9.6 5.85 14.39 8.8 2.73 1.67 2.7 1.68 2.74 4.88 0.24 19.01-0.03 38.02-0.09 57.02 0 1.32-0.54 2.07-1.6 2.66-2.98 1.67-5.93 3.37-8.92 5.03-1.4 0.78-2.71 1.71-4.2 2.35-1.44 0.62-1.59 0.51-1.81-1.07-0.25-1.72-0.04-3.44-0.03-5.16 0.02-11.89 0.05-23.78 0.07-35.66 0-1.46 0.09-2.93 0-4.39-0.12-2.12-0.5-2.28-2.32-1.33-5.8 3.02-11.43 6.35-17.1 9.59-8.74 4.99-17.48 9.98-26.21 14.98-0.25 0.14-0.5 0.29-0.75 0.43-3.03 1.77-3.02 1.83-3.08 5.3-0.28 16.05-0.1 32.1-0.18 48.15-0.01 1.63-0.11 3.27 0.18 4.89 0.13 0.73 0.41 1.05 1.19 0.78 0.38-0.13 0.75-0.28 1.09-0.49 6.56-4.11 13.4-7.75 20.09-11.64 12.87-7.47 25.77-14.88 38.67-22.31 1.24-0.71 2.36-1.63 3.71-2.15 0.97-0.38 1.02-0.36 1.21 0.67 0.09 0.51 0.11 1.03 0.11 1.54-0.02 4.48-0.04 8.96-0.08 13.44-0.01 1.12-0.1 2.24-0.15 3.35-0.04 0.82-0.7 1.16-1.26 1.51-1.65 1.03-3.34 2.01-5.02 3-21.31 12.58-42.97 24.55-64.28 37.12-1.19 0.7-2.39 1.38-3.59 2.06-0.9 0.5-1.74 0.48-2.66-0.08-15.76-9.57-31.73-18.79-47.45-28.41-0.51-0.31-1-0.66-1.53-0.96-1.2-0.68-1.7-1.68-1.64-3.06 0.18-4.28 0.07-8.55 0.01-12.83-0.02-1.26-0.07-2.52 0.09-3.78 0.16-1.25 0.32-1.36 1.48-0.97 0.72 0.24 1.37 0.59 1.99 1 8.98 5.87 18.44 10.95 27.6 16.53 3.03 1.85 6.15 3.57 9.07 5.6 0.69 0.48 1.43 0.82 2.24 1.07 0.57 0.18 0.81-0.06 0.99-0.49 0.17-0.4 0.21-0.82 0.22-1.26 0.09-14.9 0.14-29.8 0.07-44.7-0.01-2.85 0.17-5.68 0.29-8.52 0.08-1.98-0.71-3.26-2.4-4.25-8.8-5.17-17.6-10.35-26.33-15.63-5.74-3.47-11.47-6.97-17.22-10.42-1.03-0.62-2.1-1.17-3.21-1.64-0.57-0.24-0.76-0.06-0.91 0.44-0.15 0.56-0.23 1.13-0.21 1.7 0.19 5.57-0.05 11.14-0.1 16.71-0.15 18.09-0.06 36.18-0.09 54.27 0 1.17 0.22 2.35 0 3.52-0.2 1.11-0.42 1.27-1.49 0.94-0.38-0.12-0.76-0.26-1.09-0.48-3.87-2.51-7.99-4.62-11.84-7.18-0.38-0.25-0.73-0.57-1.14-0.77-1.15-0.55-1.42-1.42-1.42-2.68 0.05-14.32 0.03-28.65 0.03-42.98z"
                      fill="#FFFFFF"
                    />
                  </svg>
                  <span
                    style={{
                      color: "#FFFFFF",
                      fontFamily: FONT_DISPLAY,
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    magic trucks
                  </span>
                </div>
              )}
              {logo.type === "text" && (
                <span
                  className="logo-holder-img"
                  style={{
                    color: "#FFFFFF",
                    opacity: 0.78,
                    transition: `opacity 300ms ${EXPO_OUT_CSS}`,
                    whiteSpace: "nowrap",
                    ...logo.style,
                  }}
                >
                  {logo.label}
                </span>
              )}
            </div>
          ))}
        </div>
        <style>{`
          .logo-holder {
            transition: border-color 300ms ${EXPO_OUT_CSS}, background 300ms ${EXPO_OUT_CSS};
          }
          .logo-holder:hover {
            border-color: rgba(59,130,246,0.30) !important;
          }
          .logo-holder:hover .logo-holder-img {
            opacity: 1 !important;
          }
        `}</style>
      </div>

      {/* Featured work card §11 — denser glass, violet eyebrow, real Magic Trucks dashboard */}
      <motion.div
        className="featured-work relative overflow-hidden p-4 lg:p-5 h-full"
        style={{
          background:
            "radial-gradient(120% 100% at 100% 0%, rgba(139,92,246,0.08) 0%, transparent 50%), linear-gradient(180deg, rgba(20,28,46,0.65) 0%, rgba(11,16,28,0.65) 100%)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 18,
          boxShadow: SHADOW_CINEMATIC,
          backdropFilter: `saturate(180%) blur(24px)`,
          WebkitBackdropFilter: `saturate(180%) blur(24px)`,
        }}
        whileHover={{ y: -3 }}
        transition={{ duration: 0.4, ease: EXPO_OUT }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-5 md:gap-6 items-center h-full">
          <div className="flex flex-col gap-3">
            <p
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em]"
              style={{ color: ACCENT_VIOLET, fontFamily: FONT_MONO }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: ACCENT_VIOLET,
                  boxShadow: `0 0 8px ${ACCENT_VIOLET}`,
                }}
              />
              {featuredWork.eyebrow}
            </p>
            <h3
              className="font-bold tracking-[-0.02em]"
              style={{
                fontFamily: FONT_DISPLAY,
                color: TEXT_PRIMARY,
                fontSize: "clamp(26px, 2.2vw, 34px)",
                lineHeight: 1.1,
              }}
            >
              {featuredWork.title}
            </h3>
            <p
              className="text-[13px]"
              style={{ color: TEXT_SECONDARY, fontFamily: FONT_BODY, lineHeight: 1.55 }}
            >
              {featuredWork.description}
            </p>
            <Link
              href={featuredWork.href}
              className="featured-cta mt-2 group inline-flex items-center gap-2 self-start px-4 py-2.5 rounded-full text-[13px] font-medium cursor-pointer"
              style={{
                fontFamily: FONT_BODY,
                color: "#E6F0FF",
                border: "1px solid rgba(139,92,246,0.30)",
                background:
                  "linear-gradient(180deg, rgba(139,92,246,0.08) 0%, rgba(139,92,246,0.02) 100%)",
              }}
            >
              <span>{featuredWork.cta}</span>
              <StatIcon name="arrow-right" />
            </Link>
          </div>
          {/* Gray Voice Agent office signage mockup */}
          <div
            className="relative w-full hidden md:block overflow-hidden"
            style={{
              minHeight: 170,
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 12,
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.04), 0 12px 28px -12px rgba(0,0,0,0.5)",
            }}
            aria-hidden="true"
          >
            <img
              src={gvaOfficeSign}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              style={{ display: "block" }}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
        <style>{`
          .featured-cta {
            transition: background 300ms ${EXPO_OUT_CSS}, border-color 300ms;
          }
          .featured-cta:hover {
            background: linear-gradient(180deg, rgba(139,92,246,0.16) 0%, rgba(139,92,246,0.06) 100%) !important;
            border-color: rgba(139,92,246,0.55) !important;
          }
        `}</style>
      </motion.div>
    </div>
  );
}

function Hero() {
  const reduced = useReducedMotion();
  // Gray Arcade layout: "full" = the game spans the hero region behind this
  // copy (desktop); "card" = contained box beside it. ?layout= switches.
  const [arcadeFull] = useState(
    () => typeof window !== "undefined" && resolveLayoutParam(window.location.search) === "full",
  );

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Static headline — every word always visible, no rotation/fade-in
  const wordEl = (i: number) => {
    const w = ROTATING_WORDS[i];
    const isAccent = w.text === "End to end.";
    return (
      <span
        key={w.text}
        style={
          isAccent
            ? {
                whiteSpace: "nowrap",
                display: "inline-block",
                background: "linear-gradient(110deg, #C7DCFF 0%, #6B9EFF 40%, #8B5CF6 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
              }
            : {
                whiteSpace: "nowrap",
                display: "inline-block",
                marginRight: "0.22em",
                color: TEXT_PRIMARY,
              }
        }
      >
        {w.text}
      </span>
    );
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: BG_DEEP, paddingTop: "68px" }}
      aria-labelledby="hero-heading"
    >
      {/* Backdrop: in arcade full-bleed mode the game engine paints its own
          space scene, so the photo backdrop is dropped — one visual system,
          not two competing ones. Card mode keeps the galaxy image. */}
      {!arcadeFull && <HeroBackdrop />}

      <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12 pt-6 md:pt-10 pb-6 md:pb-8 relative z-10">
        {/* HERO REGION */}
        <div className="relative">
          <div className={arcadeFull ? "relative lg:min-h-[500px]" : "lg:flex lg:items-center lg:gap-10"}>
          {/* Hero text — left dominates (56% on desktop) */}
          <div className="lg:w-[56%] lg:pr-2 relative z-10">
            {/* Eyebrow with pulsing blue dot */}
            <div className="inline-flex items-center gap-2.5 mb-6">
              <span
                className="eyebrow-dot"
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: ACCENT_BLUE,
                }}
                aria-hidden="true"
              />
              <span
                className="text-[10px] uppercase tracking-[0.28em]"
                style={{ color: TEXT_TERTIARY, fontFamily: FONT_MONO }}
              >
                We build
              </span>
              <style>{`
                .eyebrow-dot {
                  box-shadow: 0 0 8px rgba(59,130,246,0.5);
                  animation: eyebrow-pulse 2.4s ease-in-out infinite;
                }
                @keyframes eyebrow-pulse {
                  0%, 100% { box-shadow: 0 0 8px rgba(59,130,246,0.5); }
                  50%      { box-shadow: 0 0 16px rgba(59,130,246,0.85); }
                }
                @media (prefers-reduced-motion: reduce) {
                  .eyebrow-dot { animation: none; }
                }
              `}</style>
            </div>

            {/* Headline — bigger, tighter, heavier */}
            <h1
              id="hero-heading"
              className="tracking-[-0.035em]"
              style={{
                fontFamily: FONT_DISPLAY,
                color: TEXT_PRIMARY,
                fontSize: "clamp(40px, 5vw, 76px)",
                lineHeight: 0.98,
                fontWeight: 800,
              }}
            >
              <span className="block">We build</span>
              <span className="block">
                {wordEl(0)}
                {wordEl(1)}
              </span>
              <span className="block">
                {wordEl(2)}
                {wordEl(3)}
              </span>
              <span className="block">{wordEl(4)}</span>
            </h1>

            {/* Sub-copy — dimmer, more refined, first-line weight 500 */}
            <div
              className="mt-8 flex flex-col gap-1"
              style={{
                color: TEXT_SECONDARY,
                fontFamily: FONT_BODY,
                fontSize: "clamp(14px, 1vw, 17px)",
                lineHeight: 1.55,
                maxWidth: "460px",
              }}
            >
              {/* Locked arcade-brief subline — the old line duplicated the
                  game's completion panel word-for-word on one screen */}
              <p style={{ fontWeight: 500, color: "#A8B0C0" }}>
                Brand, software, and AI work — one studio, end to end.
              </p>
            </div>

            {/* CTAs — stack on mobile, side-by-side on sm+ */}
            <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <SlidingButton
                onClick={() => scrollTo("#work")}
                variant="gradient"
                className="!min-h-[46px] !py-3 !text-[14px] w-full sm:w-auto"
                data-testid="cta-see-our-work"
              >
                <span>See our work</span>
                <span>→</span>
              </SlidingButton>
              <button
                onClick={() => scrollTo("#contact")}
                className="group inline-flex items-center justify-center sm:justify-start gap-2 text-[14px] font-medium transition-colors min-h-[44px] px-2"
                style={{ fontFamily: FONT_BODY, color: TEXT_PRIMARY }}
                data-testid="cta-start-project-hero"
              >
                <span>Start a project</span>
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <path d="M3 11L11 3M11 3H5M11 3V9" />
                </svg>
              </button>
            </div>
          </div>

          {/* Gray Arcade — Stage 01: Chaos to Launch (game is an enhancement
              layer; all copy/CTAs above are real DOM independent of it).
              Full layout: absolute layers spanning this hero region behind
              the copy on desktop, stacked card below it on mobile. */}
          <div className={arcadeFull ? "mt-10 lg:mt-0" : "mt-10 lg:mt-0 lg:flex-1 relative z-10"}>
            <ArcadeHero />
          </div>
          </div>

          {/* KPI strip removed per site audit — do not reintroduce the
              120+/98% stat counters (arcade brief §2.8, confirmed 2026-07) */}
        </div>

        {/* Trusted-by + Featured work — below the image region */}
        <TrustedAndFeatured />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// What We Do — four service cards
// Reuses GLASS_CARD_STYLE + ICON_CONTAINER_STYLE from the design system
// ─────────────────────────────────────────────────────────────────────────────
type ServiceCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  linkText: string;
  href: string;
};

function ServiceCard({ icon: Icon, title, description, linkText, href }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="service-card lg group flex flex-col h-full p-5 lg:p-6 cursor-pointer overflow-hidden"
      style={GLASS_CARD_STYLE}
      aria-label={`${title} — ${linkText}`}
    >
      {/* Icon — matches KPI icon container spec */}
      <div style={ICON_CONTAINER_STYLE} aria-hidden="true">
        <Icon size={22} strokeWidth={1.6} />
      </div>

      {/* Title */}
      <h3
        className="mt-5 font-bold tracking-[-0.02em]"
        style={{
          fontFamily: FONT_DISPLAY,
          color: TEXT_PRIMARY,
          fontSize: "clamp(18px, 1.5vw, 22px)",
          lineHeight: 1.2,
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className="mt-2 flex-1"
        style={{
          color: TEXT_SECONDARY,
          fontFamily: FONT_BODY,
          fontSize: "14px",
          lineHeight: 1.55,
        }}
      >
        {description}
      </p>

      {/* Link affordance — visual CTA, not a separate focusable element */}
      <span
        className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium transition-colors group-hover:text-white"
        style={{ color: TEXT_PRIMARY, fontFamily: FONT_BODY }}
      >
        <span>{linkText}</span>
        <ArrowUpRight
          size={14}
          strokeWidth={1.8}
          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>

      {/* Hover state — border lifts to Accent Blue glow */}
      <style>{`
        .service-card {
          transition: border-color 300ms ${EXPO_OUT_CSS}, background-color 300ms ${EXPO_OUT_CSS};
        }
        .service-card:hover {
          border-color: rgba(59, 130, 246, 0.55) !important;
          background-color: rgba(17, 24, 39, 0.7) !important;
        }
      `}</style>
    </Link>
  );
}

const whatWeDoCards: ServiceCardProps[] = [
  {
    icon: Palette,
    title: "Brand & Identity",
    description:
      "Logos, visual systems, and the language that makes a brand sound like itself.",
    linkText: "See brand work",
    href: "/services/brand-content",       // Brand & Content Studio
  },
  {
    icon: LineChart,
    title: "Digital Marketing",
    description:
      "Content, social, and the slow work of building an audience that actually shows up.",
    linkText: "See digital work",
    href: "/services/growth-performance",  // Growth & Performance
  },
  {
    icon: Code2,
    title: "Product & Software",
    description:
      "Websites, web apps, and custom software built for how your team actually works.",
    linkText: "See product work",
    href: "/services/product-web",         // Product & Web Studio
  },
  {
    icon: Sparkles,
    title: "AI & Automation",
    description:
      "Workflow automation and AI integration that removes the repetitive work, not the human judgment.",
    linkText: "See AI work",
    href: "/services/automations-ai",      // Automations & AI
  },
];

function WhatWeDo() {
  return (
    <section
      id="what-we-do"
      className="w-full"
      style={{ backgroundColor: BG_PRIMARY, scrollMarginTop: "80px" }}
      aria-labelledby="what-we-do-heading"
    >
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12 py-20 md:py-32">
        {/* Heading + intro */}
        <motion.div
          className="mb-12 md:mb-16 max-w-[760px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          <p
            className="mb-4 text-[12px] uppercase tracking-[0.24em]"
            style={{ color: TEXT_MUTED, fontFamily: FONT_MONO }}
          >
            What we do
          </p>
          <h2
            id="what-we-do-heading"
            className="font-bold tracking-[-0.025em]"
            style={{
              fontFamily: FONT_DISPLAY,
              color: TEXT_PRIMARY,
              fontSize: "clamp(36px, 5.5vw, 64px)",
              lineHeight: 1.05,
              maxWidth: "18ch",
            }}
          >
            Four things, done well.
          </h2>
          <p
            className="mt-5 md:mt-6"
            style={{
              color: TEXT_SECONDARY,
              fontFamily: FONT_BODY,
              fontSize: "clamp(15px, 1.15vw, 18px)",
              lineHeight: 1.55,
            }}
          >
            Brand work, digital growth, custom software, and AI integration — built for teams that want one partner instead of four.
          </p>
        </motion.div>

        {/* Cards — 1 col mobile, 2×2 tablet, 4 in a row desktop */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 items-stretch"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {whatWeDoCards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: EXPO_OUT }}
            >
              <ServiceCard {...card} />
            </motion.div>
          ))}
        </motion.div>

        {/* View all services CTA */}
        <motion.div
          className="mt-10 md:mt-12 flex justify-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: EXPO_OUT }}
        >
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-full text-[14px] font-medium transition-all cursor-pointer"
            style={{
              fontFamily: FONT_BODY,
              color: ACCENT_BLUE,
              border: `1px solid rgba(59, 130, 246, 0.45)`,
              backgroundColor: "rgba(59, 130, 246, 0.04)",
            }}
          >
            <span>View all services</span>
            <ArrowUpRight
              size={14}
              strokeWidth={1.8}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Selected Work — header + filter tabs + 4-up card grid
// ─────────────────────────────────────────────────────────────────────────────

// One project card — image on top, info section below with category pill + title + description + link
function WorkCard({ item, idx }: { item: WorkItem; idx: number }) {
  const isLinkable = item.href !== "#";

  const inner = (
    <motion.article
      className="work-card group relative flex flex-col h-full overflow-hidden cursor-pointer"
      style={{
        backgroundColor: SURFACE_GLASS,
        backdropFilter: `saturate(180%) blur(${BLUR_MEDIUM})`,
        WebkitBackdropFilter: `saturate(180%) blur(${BLUR_MEDIUM})`,
        border: `1px solid rgba(45, 59, 102, 0.45)`,
        borderRadius: 16,
        boxShadow: SHADOW_SOFT,
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: idx * 0.08, ease: EXPO_OUT }}
    >
      {/* Image / gradient area */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1 / 0.95" }}>
        <div
          className="absolute inset-0 transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
          style={
            item.image
              ? {
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : { background: item.gradient || BG_SECONDARY }
          }
          aria-hidden="true"
        />
        {/* Subtle bottom fade so the seam to info is soft */}
        <div
          className="absolute inset-x-0 bottom-0 h-12"
          style={{
            background:
              "linear-gradient(180deg, rgba(9,11,18,0) 0%, rgba(9,11,18,0.6) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Optional "Our product" / "In development" label */}
        {item.label && (
          <div
            className="absolute top-3 left-3 inline-flex items-center px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[0.18em]"
            style={{
              color: TEXT_PRIMARY,
              fontFamily: FONT_MONO,
              backgroundColor: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            {item.label}
          </div>
        )}
      </div>

      {/* Info section */}
      <div className="flex flex-col flex-1 p-5 lg:p-5">
        {/* Category pill */}
        <span
          className="inline-flex self-start items-center px-2.5 py-1 rounded-md text-[10px] uppercase tracking-[0.18em] mb-3"
          style={{
            color: ACCENT_BLUE,
            fontFamily: FONT_MONO,
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            border: "1px solid rgba(59, 130, 246, 0.22)",
          }}
        >
          {item.categories[0]}
        </span>

        {/* Title */}
        <h3
          className="font-bold tracking-[-0.02em]"
          style={{
            fontFamily: FONT_DISPLAY,
            color: TEXT_PRIMARY,
            fontSize: "clamp(18px, 1.5vw, 22px)",
            lineHeight: 1.15,
          }}
        >
          {item.client}
        </h3>

        {/* Description */}
        <p
          className="mt-1.5 flex-1"
          style={{
            color: TEXT_SECONDARY,
            fontFamily: FONT_BODY,
            fontSize: "13px",
            lineHeight: 1.5,
          }}
        >
          {item.description}
        </p>

        {/* View project link */}
        <span
          className="mt-4 inline-flex items-center justify-between text-[13px] font-medium"
          style={{ color: ACCENT_BLUE, fontFamily: FONT_BODY }}
        >
          <span className="transition-colors group-hover:text-white">View project</span>
          <ArrowRight
            size={14}
            strokeWidth={1.8}
            className="transition-transform group-hover:translate-x-1"
          />
        </span>
      </div>

      <style>{`
        .work-card {
          transition: border-color 300ms ${EXPO_OUT_CSS}, transform 300ms ${EXPO_OUT_CSS};
        }
        .work-card:hover {
          border-color: rgba(59, 130, 246, 0.55) !important;
        }
      `}</style>
    </motion.article>
  );

  return isLinkable ? (
    <Link href={item.href} className="block h-full cursor-pointer" aria-label={`${item.client} — View project`}>
      {inner}
    </Link>
  ) : (
    <div className="block h-full">{inner}</div>
  );
}

function SelectedWork() {
  const [activeCategory, setActiveCategory] = useState<"All Work" | WorkCategory>("All Work");

  const filtered =
    activeCategory === "All Work"
      ? selectedWork
      : selectedWork.filter((p) => p.categories.includes(activeCategory as WorkCategory));

  return (
    <section
      id="work"
      className="w-full"
      style={{ backgroundColor: BG_PRIMARY, scrollMarginTop: "80px" }}
      aria-labelledby="work-heading"
    >
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12 py-20 md:py-32">
        {/* Header row */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_auto] gap-6 lg:gap-10 items-start lg:items-end"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          {/* Left: eyebrow + title */}
          <div>
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.24em] mb-5"
              style={{
                color: TEXT_SECONDARY,
                fontFamily: FONT_MONO,
                backgroundColor: SURFACE_GLASS,
                border: `1px solid rgba(45, 59, 102, 0.45)`,
              }}
            >
              Our work
            </span>
            <h2
              id="work-heading"
              className="font-bold tracking-[-0.025em]"
              style={{
                fontFamily: FONT_DISPLAY,
                color: TEXT_PRIMARY,
                fontSize: "clamp(36px, 5vw, 60px)",
                lineHeight: 1.05,
              }}
            >
              Work that
              <br />
              drives real outcomes.
            </h2>
          </div>

          {/* Middle: description */}
          <p
            className="lg:pb-3"
            style={{
              color: TEXT_SECONDARY,
              fontFamily: FONT_BODY,
              fontSize: "clamp(14px, 1.05vw, 16px)",
              lineHeight: 1.6,
              maxWidth: "440px",
            }}
          >
            We partner with ambitious teams to build brands, digital experiences, and products that create measurable impact.
          </p>

          {/* Right: View all projects CTA */}
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-full text-[14px] font-medium transition-all whitespace-nowrap self-start lg:self-end cursor-pointer"
            style={{
              fontFamily: FONT_BODY,
              color: ACCENT_BLUE,
              border: `1px solid rgba(59, 130, 246, 0.45)`,
              backgroundColor: "rgba(59, 130, 246, 0.04)",
            }}
          >
            <span>View all projects</span>
            <ArrowUpRight
              size={14}
              strokeWidth={1.8}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </motion.div>

        {/* Filter tab strip */}
        <motion.div
          className="mt-10 md:mt-12 flex items-center justify-between gap-6"
          style={{ borderBottom: `1px solid ${BORDER_SUBTLE}` }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
        >
          <div
            className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-hide"
            role="tablist"
            aria-label="Filter projects by category"
          >
            {workCategories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat)}
                  className="relative whitespace-nowrap px-3 sm:px-4 py-3 text-[13px] font-medium transition-colors"
                  style={{
                    color: isActive ? TEXT_PRIMARY : TEXT_SECONDARY,
                    fontFamily: FONT_BODY,
                  }}
                >
                  {cat}
                  {isActive && (
                    <motion.span
                      layoutId="work-tab-underline"
                      className="absolute left-3 right-3 bottom-[-1px] h-[2px] sm:left-4 sm:right-4"
                      style={{ backgroundColor: ACCENT_BLUE }}
                      transition={{ duration: 0.4, ease: EXPO_OUT }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* "Filter" affordance (visual only) */}
          <button
            type="button"
            className="hidden md:inline-flex items-center gap-2 px-2 py-2 text-[13px] font-medium transition-colors"
            style={{ color: TEXT_SECONDARY, fontFamily: FONT_BODY }}
            aria-label="Filter projects"
            disabled
          >
            <span>Filter</span>
            <SlidersHorizontal size={14} strokeWidth={1.8} />
          </button>
        </motion.div>

        {/* Card grid */}
        <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.45, ease: EXPO_OUT }}
              >
                <WorkCard item={item} idx={idx} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom centered CTA */}
        <motion.div
          className="mt-12 md:mt-16 flex items-center justify-center gap-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EXPO_OUT }}
        >
          <span
            className="hidden sm:inline-flex text-[14px]"
            style={{ color: TEXT_MUTED, fontFamily: FONT_BODY }}
          >
            More case studies. More impact.
          </span>
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-full text-[14px] font-medium transition-all cursor-pointer"
            style={{
              fontFamily: FONT_BODY,
              color: ACCENT_BLUE,
              border: `1px solid rgba(59, 130, 246, 0.45)`,
              backgroundColor: "rgba(59, 130, 246, 0.04)",
            }}
          >
            <span>View all projects</span>
            <ArrowUpRight
              size={14}
              strokeWidth={1.8}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Blog Teaser + Newsletter
// ─────────────────────────────────────────────────────────────────────────────
type BlogCardData = {
  category: string;
  date: string;
  title: string;
  description: string;
  image: string;
  href: string;
};

const blogTeasers: BlogCardData[] = [
  {
    category: "Design",
    date: "May 24, 2025",
    title: "Building brands that stand the test of time",
    description:
      "Why strong foundations, thoughtful systems, and clarity of message never go out of style.",
    image:
      "https://images.unsplash.com/photo-1554034483-04fda0d3507b?w=900&auto=format&fit=crop&q=70",
    href: "/blogs/building-brands-that-stand-the-test-of-time",
  },
  {
    category: "Technology",
    date: "May 20, 2025",
    title: "The real impact of AI in modern workflows",
    description:
      "AI isn't about replacing people. It's about removing friction and creating more room for what matters.",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=900&auto=format&fit=crop&q=70",
    href: "/blogs/the-real-impact-of-ai-in-modern-workflows",
  },
  {
    category: "Growth",
    date: "May 16, 2025",
    title: "Content strategies that drive compounding growth",
    description:
      "A practical look at how consistent, valuable content builds momentum that lasts.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=70",
    href: "/blogs/content-strategies-that-drive-compounding-growth",
  },
];

function BlogCard({ post, idx }: { post: BlogCardData; idx: number }) {
  return (
    <motion.article
      className="blog-card group relative flex flex-col h-full overflow-hidden cursor-pointer"
      style={{
        backgroundColor: SURFACE_GLASS_LO,
        backdropFilter: `saturate(180%) blur(${BLUR_MEDIUM})`,
        WebkitBackdropFilter: `saturate(180%) blur(${BLUR_MEDIUM})`,
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: 18,
        boxShadow: SHADOW_SOFT,
      }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: idx * 0.1, ease: EXPO_OUT }}
    >
      {/* Image */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16 / 10" }}>
        <div
          className="absolute inset-0 transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
          style={{
            backgroundImage: `url(${post.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 lg:p-6">
        {/* Category + date row */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <span
            className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] uppercase tracking-[0.18em]"
            style={{
              color: ACCENT_BLUE,
              fontFamily: FONT_MONO,
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              border: "1px solid rgba(59, 130, 246, 0.22)",
            }}
          >
            {post.category}
          </span>
          <span
            className="text-[12px]"
            style={{ color: TEXT_TERTIARY, fontFamily: FONT_MONO }}
          >
            {post.date}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-bold tracking-[-0.02em] mb-3"
          style={{
            fontFamily: FONT_DISPLAY,
            color: TEXT_PRIMARY,
            fontSize: "clamp(18px, 1.5vw, 22px)",
            lineHeight: 1.2,
          }}
        >
          {post.title}
        </h3>

        {/* Description */}
        <p
          className="flex-1 text-[13px]"
          style={{
            color: TEXT_SECONDARY,
            fontFamily: FONT_BODY,
            lineHeight: 1.55,
          }}
        >
          {post.description}
        </p>

        {/* Read article */}
        <span
          className="mt-5 inline-flex items-center gap-2 text-[13px] font-medium"
          style={{ color: ACCENT_BLUE, fontFamily: FONT_BODY }}
        >
          <span className="transition-colors group-hover:text-white">Read article</span>
          <ArrowRight
            size={14}
            strokeWidth={1.8}
            className="transition-transform group-hover:translate-x-1"
          />
        </span>
      </div>

      <style>{`
        .blog-card {
          transition: border-color 300ms ${EXPO_OUT_CSS};
        }
        .blog-card:hover {
          border-color: rgba(59, 130, 246, 0.35) !important;
        }
      `}</style>
    </motion.article>
  );
}

function NewsletterCard() {
  return (
    <motion.div
      className="mt-5 md:mt-6 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6 md:gap-8 items-center p-6 md:p-7 lg:p-8"
      style={{
        background:
          "radial-gradient(120% 100% at 0% 0%, rgba(59,130,246,0.06) 0%, transparent 55%), linear-gradient(180deg, rgba(20,28,46,0.55) 0%, rgba(11,16,28,0.55) 100%)",
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: 20,
        boxShadow: SHADOW_CINEMATIC,
        backdropFilter: `saturate(180%) blur(24px)`,
        WebkitBackdropFilter: `saturate(180%) blur(24px)`,
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: EXPO_OUT }}
    >
      {/* Icon container */}
      <div
        className="hidden md:flex"
        style={{
          ...ICON_CONTAINER_STYLE,
          width: 72,
          height: 72,
          borderRadius: 18,
          background:
            "linear-gradient(180deg, rgba(59,130,246,0.12) 0%, rgba(59,130,246,0.02) 100%), rgba(11,16,28,0.6)",
          border: "1px solid rgba(59,130,246,0.20)",
          color: ACCENT_BLUE,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 0 20px rgba(59,130,246,0.12)",
        }}
        aria-hidden="true"
      >
        <Mail size={28} strokeWidth={1.6} />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2 min-w-0">
        <span
          className="text-[10px] uppercase tracking-[0.24em]"
          style={{ color: TEXT_TERTIARY, fontFamily: FONT_MONO }}
        >
          Stay in the loop
        </span>
        <h3
          className="font-bold tracking-[-0.02em]"
          style={{
            fontFamily: FONT_DISPLAY,
            color: TEXT_PRIMARY,
            fontSize: "clamp(22px, 2vw, 28px)",
            lineHeight: 1.15,
          }}
        >
          Insights straight to your inbox.
        </h3>
        <p
          className="text-[14px]"
          style={{ color: TEXT_SECONDARY, fontFamily: FONT_BODY, lineHeight: 1.55, maxWidth: 460 }}
        >
          Join 500+ readers getting monthly insights on design, tech, AI, and growth — no spam, just value.
        </p>
      </div>

      {/* Form */}
      <form
        className="flex flex-col gap-3 w-full md:w-[420px]"
        onSubmit={(e) => {
          e.preventDefault();
          // Newsletter API hook can be wired in here
        }}
      >
        <div className="flex items-stretch gap-2 p-1.5 rounded-full" style={{ backgroundColor: "rgba(11,16,28,0.6)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="flex-1 bg-transparent px-4 text-[14px] outline-none"
            style={{ color: TEXT_PRIMARY, fontFamily: FONT_BODY }}
            aria-label="Email address"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[14px] font-medium transition-all"
            style={{
              fontFamily: FONT_BODY,
              color: "#FFFFFF",
              background: `linear-gradient(180deg, ${ACCENT_BLUE} 0%, #2563EB 100%)`,
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), 0 0 18px rgba(59,130,246,0.35)",
            }}
          >
            <span>Subscribe</span>
            <ArrowRight size={14} strokeWidth={2} />
          </button>
        </div>
        <p
          className="inline-flex items-center gap-1.5 text-[12px]"
          style={{ color: TEXT_TERTIARY, fontFamily: FONT_BODY }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="6" cy="6" r="5" />
            <path d="M4 6l1.5 1.5L8 4.5" />
          </svg>
          We respect your privacy. Unsubscribe anytime.
        </p>
      </form>
    </motion.div>
  );
}

function BlogTeaser() {
  return (
    <section
      id="insights"
      className="w-full"
      style={{ backgroundColor: BG_PRIMARY, scrollMarginTop: "80px" }}
      aria-labelledby="insights-heading"
    >
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12 py-20 md:py-32">
        {/* Header */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-start lg:items-end mb-10 md:mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          <div>
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.24em] mb-5"
              style={{
                color: TEXT_SECONDARY,
                fontFamily: FONT_MONO,
                backgroundColor: SURFACE_GLASS,
                border: `1px solid rgba(45, 59, 102, 0.45)`,
              }}
            >
              From our blog
            </span>
            <h2
              id="insights-heading"
              className="font-bold tracking-[-0.025em]"
              style={{
                fontFamily: FONT_DISPLAY,
                color: TEXT_PRIMARY,
                fontSize: "clamp(36px, 5vw, 60px)",
                lineHeight: 1.05,
              }}
            >
              Ideas, insights,
              <br />
              and{" "}
              <span
                style={{
                  background: "linear-gradient(110deg, #C7DCFF 0%, #6B9EFF 60%, #8B5CF6 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  WebkitTextFillColor: "transparent",
                }}
              >
                perspectives.
              </span>
            </h2>
            <p
              className="mt-5 md:mt-6 max-w-[440px]"
              style={{
                color: TEXT_SECONDARY,
                fontFamily: FONT_BODY,
                fontSize: "clamp(14px, 1vw, 16px)",
                lineHeight: 1.6,
              }}
            >
              Thoughts on design, development, AI, and growth from the Gray Solutions team.
            </p>
          </div>

          <Link
            href="/blogs"
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-full text-[14px] font-medium transition-all whitespace-nowrap self-start lg:self-end cursor-pointer"
            style={{
              fontFamily: FONT_BODY,
              color: ACCENT_BLUE,
              border: `1px solid rgba(59, 130, 246, 0.45)`,
              backgroundColor: "rgba(59, 130, 246, 0.04)",
            }}
          >
            <span>View all articles</span>
            <ArrowUpRight
              size={14}
              strokeWidth={1.8}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </motion.div>

        {/* Blog cards — 3 in a row on desktop. Each card wraps in a Link so the whole tile
            navigates to the dedicated article page. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {blogTeasers.map((post, idx) => (
            <Link
              key={post.title}
              href={post.href}
              className="block h-full cursor-pointer"
              aria-label={`${post.title} — Read article`}
            >
              <BlogCard post={post} idx={idx} />
            </Link>
          ))}
        </div>

        {/* Newsletter card */}
        <NewsletterCard />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Close CTA — "Start a project, build what's next."
// ─────────────────────────────────────────────────────────────────────────────
const trustCards: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Send,
    title: "Quick response",
    description: "We typically reply within one business day.",
  },
  {
    icon: Users,
    title: "Experienced team",
    description: "Work with strategists, designers, and engineers.",
  },
  {
    icon: Rocket,
    title: "Outcome focused",
    description: "We build solutions that drive real impact.",
  },
  {
    icon: Shield,
    title: "Trusted partner",
    description: "Long-term thinking, clear communication.",
  },
];

function CloseCTA() {
  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: BG_DEEP, scrollMarginTop: "80px", borderTop: `1px solid ${BORDER_SUBTLE}` }}
      aria-labelledby="cta-heading"
    >
      {/* Decorative curved lines at the bottom — subtle motion signature */}
      <svg
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 w-full pointer-events-none"
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        style={{ height: "min(220px, 30vh)", opacity: 0.45 }}
      >
        <defs>
          <linearGradient id="cta-arc" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(59,130,246,0)" />
            <stop offset="50%" stopColor="rgba(59,130,246,0.45)" />
            <stop offset="100%" stopColor="rgba(139,92,246,0)" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d={`M -100 ${180 + i * 8} Q 720 ${40 - i * 16} 1540 ${180 + i * 8}`}
            fill="none"
            stroke="url(#cta-arc)"
            strokeWidth="1"
            opacity={0.5 - i * 0.08}
          />
        ))}
      </svg>

      <div className="relative mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12 pt-24 md:pt-32 pb-20 md:pb-28">
        {/* Eyebrow pill */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: EXPO_OUT }}
        >
          <span
            className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] uppercase tracking-[0.24em]"
            style={{
              color: ACCENT_BLUE_SOFT,
              fontFamily: FONT_MONO,
              backgroundColor: "rgba(59,130,246,0.06)",
              border: "1px solid rgba(59,130,246,0.30)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            Let&apos;s build something great
          </span>
        </motion.div>

        {/* Headline — "Start a project, build what's next." with gradient on second clause */}
        <motion.h2
          id="cta-heading"
          className="mt-8 md:mt-10 text-center font-bold tracking-[-0.035em] mx-auto"
          style={{
            fontFamily: FONT_DISPLAY,
            color: TEXT_PRIMARY,
            fontSize: "clamp(40px, 6.5vw, 96px)",
            lineHeight: 0.98,
            maxWidth: "18ch",
            fontWeight: 800,
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: EXPO_OUT }}
        >
          Start a project,
          <br />
          build{" "}
          <span
            style={{
              background: "linear-gradient(110deg, #C7DCFF 0%, #6B9EFF 50%, #8B5CF6 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
            }}
          >
            what&apos;s next.
          </span>
        </motion.h2>

        {/* Sub-copy */}
        <motion.p
          className="mt-6 md:mt-7 text-center mx-auto"
          style={{
            color: TEXT_SECONDARY,
            fontFamily: FONT_BODY,
            fontSize: "clamp(15px, 1.2vw, 18px)",
            lineHeight: 1.6,
            maxWidth: "640px",
          }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: EXPO_OUT }}
        >
          Have an idea, a challenge, or a roadmap? Let&apos;s talk about how we can turn it into something impactful.
        </motion.p>

        {/* CTAs — primary white pill + secondary outlined with calendar icon */}
        <motion.div
          className="mt-10 md:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: EXPO_OUT }}
        >
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-[15px] font-medium min-h-[52px] transition-all cursor-pointer"
            style={{
              fontFamily: FONT_BODY,
              color: BG_PRIMARY,
              backgroundColor: TEXT_PRIMARY,
              boxShadow: "0 8px 24px rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.06)",
            }}
            data-testid="cta-get-in-touch"
          >
            <span>Get in touch</span>
            <ArrowUpRight
              size={14}
              strokeWidth={2}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
          <a
            href="https://cal.com/graysolutions"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-[15px] font-medium min-h-[52px] transition-all"
            style={{
              fontFamily: FONT_BODY,
              color: TEXT_PRIMARY,
              border: `1px solid ${BORDER_GLOW}`,
              background:
                "linear-gradient(180deg, rgba(59,130,246,0.06) 0%, rgba(59,130,246,0.02) 100%)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            <span>Book a call</span>
            <Calendar size={14} strokeWidth={1.8} />
          </a>
        </motion.div>

        {/* Trust strip — 4 cards (or 2x2 on mobile) inside a single glass container */}
        <motion.div
          className="mt-16 md:mt-20 rounded-2xl p-3 md:p-4"
          style={{
            background:
              "radial-gradient(120% 100% at 0% 0%, rgba(59,130,246,0.04) 0%, transparent 50%), linear-gradient(180deg, rgba(20,28,46,0.50) 0%, rgba(11,16,28,0.50) 100%)",
            border: "1px solid rgba(255,255,255,0.05)",
            boxShadow: SHADOW_CINEMATIC,
            backdropFilter: `saturate(180%) blur(${BLUR_MEDIUM})`,
            WebkitBackdropFilter: `saturate(180%) blur(${BLUR_MEDIUM})`,
          }}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.35, ease: EXPO_OUT }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y divide-x-0 lg:divide-y-0 lg:divide-x" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
            {trustCards.map(({ icon: Icon, title, description }, idx) => (
              <div
                key={title}
                className="flex items-center gap-3 md:gap-4 px-3 md:px-5 py-4"
                style={{
                  borderColor: "rgba(255,255,255,0.04)",
                  // Tailwind's `divide-*` doesn't always render cleanly with custom radial bgs; explicit borders below
                  borderLeft: idx % 4 !== 0 && idx % 2 !== 0 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  borderTop: idx >= 2 ? "1px solid rgba(255,255,255,0.04)" : "none",
                }}
              >
                <div style={KPI_ICON_STYLE} aria-hidden="true">
                  <Icon size={18} strokeWidth={1.6} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span
                    className="font-semibold text-[14px]"
                    style={{ color: TEXT_PRIMARY, fontFamily: FONT_BODY }}
                  >
                    {title}
                  </span>
                  <span
                    className="mt-0.5 text-[12px] md:text-[13px]"
                    style={{ color: TEXT_SECONDARY, fontFamily: FONT_BODY, lineHeight: 1.4 }}
                  >
                    {description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact strip — email · phone · location with icons */}
        <motion.div
          className="mt-10 md:mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[14px]"
          style={{ color: TEXT_SECONDARY, fontFamily: FONT_BODY }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5, ease: EXPO_OUT }}
        >
          <a
            href="mailto:connect@graysolutions.in"
            className="inline-flex items-center gap-2 hover:text-white transition-colors"
          >
            <Mail size={14} strokeWidth={1.6} style={{ color: TEXT_TERTIARY }} />
            <span>connect@graysolutions.in</span>
          </a>
          <span style={{ color: TEXT_TERTIARY }}>·</span>
          <a
            href="tel:+916380267018"
            className="inline-flex items-center gap-2 hover:text-white transition-colors"
          >
            <Phone size={14} strokeWidth={1.6} style={{ color: TEXT_TERTIARY }} />
            <span>+91 63802 67018</span>
          </a>
          <span style={{ color: TEXT_TERTIARY }}>·</span>
          <span className="inline-flex items-center gap-2">
            <MapPin size={14} strokeWidth={1.6} style={{ color: TEXT_TERTIARY }} />
            <span>Coimbatore, India</span>
          </span>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Gray Neo cross-sell — promotes the Website-as-a-Service product before the footer
// ─────────────────────────────────────────────────────────────────────────────
function GrayNeoCTA() {
  return (
    <section
      className="relative w-full"
      style={{ backgroundColor: BG_DEEP }}
      aria-labelledby="grayneo-cta-heading"
    >
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12 pb-20 md:pb-24">
        <motion.div
          className="lg relative overflow-hidden flex flex-col md:flex-row md:items-center gap-6 md:gap-10 p-7 md:p-10"
          style={{
            backgroundColor: "rgba(20,28,46,0.55)",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: 24,
            backdropFilter: `saturate(190%) blur(${BLUR_MEDIUM})`,
            WebkitBackdropFilter: `saturate(190%) blur(${BLUR_MEDIUM})`,
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.18), 0 24px 60px -28px rgba(0,0,0,0.6)",
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EXPO_OUT }}
        >
          {/* Soft gradient glow accent */}
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 w-72 h-72 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(139,92,246,0.30) 0%, rgba(59,130,246,0) 70%)",
            }}
          />

          {/* Left: copy */}
          <div className="relative flex-1 min-w-0">
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.24em] mb-4"
              style={{
                color: ACCENT_BLUE_SOFT,
                fontFamily: FONT_MONO,
                backgroundColor: "rgba(59,130,246,0.08)",
                border: "1px solid rgba(59,130,246,0.30)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#8B5CF6" }} />
              Another service from Gray
            </span>
            <h2
              id="grayneo-cta-heading"
              className="font-bold tracking-[-0.03em]"
              style={{
                fontFamily: FONT_DISPLAY,
                color: TEXT_PRIMARY,
                fontSize: "clamp(24px, 3vw, 36px)",
                lineHeight: 1.08,
                fontWeight: 800,
              }}
            >
              Need a website for your business —{" "}
              <span
                style={{
                  background: "linear-gradient(110deg, #C7DCFF 0%, #6B9EFF 45%, #8B5CF6 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  WebkitTextFillColor: "transparent",
                }}
              >
                fast?
              </span>
            </h2>
            <p
              className="mt-3"
              style={{
                color: TEXT_SECONDARY,
                fontFamily: FONT_BODY,
                fontSize: "clamp(14px, 1.05vw, 16px)",
                lineHeight: 1.6,
                maxWidth: "52ch",
              }}
            >
              <strong style={{ color: TEXT_PRIMARY, fontWeight: 600 }}>Gray Neo</strong> builds quick,
              professional websites for businesses — get online in days, not months.
            </p>
          </div>

          {/* Right: CTA button */}
          <div className="relative shrink-0">
            <a
              href="https://neo.graysolutions.in"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full text-[15px] font-semibold transition-all hover:-translate-y-0.5 cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #3B82F6 0%, #6366F1 48%, #8B5CF6 100%)",
                color: "#FFFFFF",
                border: "1px solid rgba(255,255,255,0.18)",
                boxShadow:
                  "0 14px 36px -10px rgba(99,102,241,0.7), inset 0 1px 0 rgba(255,255,255,0.25)",
                fontFamily: FONT_BODY,
              }}
              data-testid="grayneo-cta"
            >
              <span>Explore Gray Neo</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                <path d="M3 11L11 3M11 3H5M11 3V9" />
              </svg>
            </a>
          </div>
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
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12 py-16 md:py-20">
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
      style={{ backgroundColor: BG_DEEP, color: TEXT_PRIMARY, fontFamily: FONT_BODY, overflowX: "hidden" }}
    >
      <SiteNav />

      <main>
        <Hero />
        <WhatWeDo />
        <SelectedWork />
        <BlogTeaser />
        <CloseCTA />
        <GrayNeoCTA />
      </main>

      <Footer />
    </div>
  );
}
