import React, { useEffect, useState } from "react";
import { Link } from "wouter";

// Optimized assets (WebP)
import goGaugeImage from "@assets/optimized/gogauge_slide.webp";
import eagleImage from "@assets/Eagle_Web_2_1765901229010.webp";
import magicTrucksImage from "@assets/mokcup_1_1765899763586.webp";
import tixImage from "@assets/optimized/tix_iphone_mockup.webp";

// ─────────────────────────────────────────────────────────────────────────────
// Design tokens
// ─────────────────────────────────────────────────────────────────────────────
const BG_DARK = "#0A0A0A";
const BG_DARK_ALT = "#141414";
const BG_LIGHT = "#F5F2EC";
const ACCENT = "#A8D8FF";
const TEXT_MUTED_DARK = "rgba(255,255,255,0.65)";
const TEXT_MUTED_LIGHT = "rgba(10,10,10,0.65)";

const FONT_HEAD = "'Plus Jakarta Sans', 'Inter', ui-sans-serif, system-ui, sans-serif";
const FONT_BODY = "'DM Sans', 'Inter', ui-sans-serif, system-ui, sans-serif";
const FONT_MONO = "'JetBrains Mono', ui-monospace, monospace";

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────
const navItems = [
  { label: "Work", href: "#selected-work" },
  { label: "Services", href: "#services" },
  { label: "Studio", href: "#studio" },
  { label: "About", href: "/about", external: true },
  { label: "Contact", href: "#contact" },
];

const clientNames = ["GoGauge", "Eagle", "Magic Trucks", "Cafe66", "TIX"];

const selectedWork = [
  {
    id: "gogauge",
    client: "GoGauge",
    description: "Rebrand, strategy, and operating system for a logistics platform.",
    sector: "Logistics",
    year: "2024",
    href: "/case-study/gogauge",
    image: goGaugeImage,
  },
  {
    id: "eagle",
    client: "Eagle",
    description: "Fleet-wide brand revamp across digital, vehicles, merchandise, and uniforms — Dubai.",
    sector: "Freight & Industrial",
    year: "2024",
    href: "/case-study/eagle",
    image: eagleImage,
  },
  {
    id: "magic-trucks",
    client: "Magic Trucks",
    description: "B2B SaaS platform for the trucking and freight industry.",
    sector: "SaaS",
    year: "2025",
    href: "/case-study/magic-trucks",
    image: magicTrucksImage,
  },
  {
    id: "cafe66",
    client: "Cafe66",
    description: "Brand strategy, business consulting, and digital presence for a growing F&B brand.",
    sector: "F&B · Strategy & Brand",
    year: "2026",
    href: "#contact",
    image: null, // Placeholder gradient block
  },
];

const services = [
  { number: "01", name: "Branding & Identity", oneLiner: "Logo systems, guidelines, packaging, livery, merchandise, print." },
  { number: "02", name: "Digital Marketing",   oneLiner: "Social presence, content systems, campaigns, performance." },
  { number: "03", name: "Software & Product",  oneLiner: "Web apps, B2B SaaS platforms, websites, internal tools." },
  { number: "04", name: "AI & Automation",     oneLiner: "Workflow automation, AI integrations, voice and conversational systems." },
];

const approach = [
  { step: "Listen",     description: "We sit with the people closest to the problem." },
  { step: "Sketch",     description: "First drafts. Rough on purpose. Cheap to throw away." },
  { step: "Build",      description: "The version that goes into your stack." },
  { step: "Hand over",  description: "Documentation, systems, and a short note on what to watch next." },
];

const footerCols = {
  Work: ["GoGauge", "Eagle", "Magic Trucks", "Cafe66"],
  Studio: ["Approach", "Services", "Careers"],
  Writing: ["Notes", "Newsletter", "Archive"],
  Contact: ["connect@graysolutions.in", "+91 63802 67018", "Coimbatore, India", "© 2026 Gray Solutions"],
};

// ─────────────────────────────────────────────────────────────────────────────
// Sticky Navigation
// ─────────────────────────────────────────────────────────────────────────────
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleAnchorClick = (e: React.MouseEvent, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      setMenuOpen(false);
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      setMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(10,10,10,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
        }}
      >
        <div className="mx-auto max-w-[1400px] px-5 md:px-8 lg:px-12 h-[64px] md:h-[72px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <a
              className="text-[20px] md:text-[22px] font-bold tracking-tight text-white cursor-pointer"
              style={{ fontFamily: FONT_HEAD }}
              aria-label="Gray Solutions homepage"
            >
              Gray
            </a>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10" aria-label="Main">
            {navItems.map((item) => (
              item.external ? (
                <Link key={item.label} href={item.href}>
                  <a className="text-[14px] text-white/75 hover:text-white transition-colors cursor-pointer" style={{ fontFamily: FONT_BODY }}>
                    {item.label}
                  </a>
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleAnchorClick(e, item.href)}
                  className="text-[14px] text-white/75 hover:text-white transition-colors"
                  style={{ fontFamily: FONT_BODY }}
                >
                  {item.label}
                </a>
              )
            ))}
            <a
              href="#contact"
              onClick={(e) => handleAnchorClick(e, "#contact")}
              className="text-[14px] font-medium px-4 lg:px-5 py-2 lg:py-2.5 rounded-full border border-white/15 hover:bg-white hover:text-black transition-all"
              style={{ fontFamily: FONT_BODY }}
            >
              Book a call →
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 -mr-2 text-white"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <div
        className="fixed inset-0 z-[60] md:hidden"
        style={{
          backgroundColor: BG_DARK,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 0.25s ease",
        }}
        aria-hidden={!menuOpen}
      >
        <div className="h-[64px] flex items-center justify-between px-5">
          <span className="text-[20px] font-bold tracking-tight text-white" style={{ fontFamily: FONT_HEAD }}>Gray</span>
          <button
            className="p-2 -mr-2 text-white"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col gap-2 px-5 pt-10" aria-label="Mobile">
          {navItems.map((item) => (
            item.external ? (
              <Link key={item.label} href={item.href}>
                <a
                  onClick={() => setMenuOpen(false)}
                  className="block text-[28px] font-semibold py-3 text-white cursor-pointer"
                  style={{ fontFamily: FONT_HEAD }}
                >
                  {item.label}
                </a>
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleAnchorClick(e, item.href)}
                className="block text-[28px] font-semibold py-3 text-white"
                style={{ fontFamily: FONT_HEAD }}
              >
                {item.label}
              </a>
            )
          ))}
          <a
            href="#contact"
            onClick={(e) => handleAnchorClick(e, "#contact")}
            className="mt-6 inline-flex items-center justify-center px-6 py-4 rounded-full text-[15px] font-medium bg-white text-black w-full"
            style={{ fontFamily: FONT_BODY }}
          >
            Book a call →
          </a>
        </nav>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section 1 — Hero
// ─────────────────────────────────────────────────────────────────────────────
function Hero() {
  const scrollTo = (sel: string) => {
    const el = document.querySelector(sel);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      className="relative w-full flex items-center"
      style={{ backgroundColor: BG_DARK, minHeight: "85vh", paddingTop: "84px", paddingBottom: "60px" }}
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 lg:px-12 w-full">
        <p
          className="text-[12px] md:text-[13px] tracking-[0.18em] uppercase text-white/55 mb-6 md:mb-8"
          style={{ fontFamily: FONT_MONO }}
        >
          Brand · Software · AI
        </p>
        <h1
          id="hero-heading"
          className="font-bold text-white leading-[0.96] tracking-[-0.02em]"
          style={{
            fontFamily: FONT_HEAD,
            fontSize: "clamp(48px, 11vw, 140px)",
            maxWidth: "16ch",
          }}
        >
          Work that{" "}
          <span style={{ color: ACCENT }}>holds up.</span>
        </h1>
        <p
          className="mt-6 md:mt-8 text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed"
          style={{ color: TEXT_MUTED_DARK, fontFamily: FONT_BODY, maxWidth: "640px" }}
        >
          Brand systems, software, and AI built for production. Working with teams across India and the UAE since 2015.
        </p>

        <div className="mt-10 md:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <button
            onClick={() => scrollTo("#selected-work")}
            className="inline-flex items-center justify-center px-7 py-4 rounded-full text-[15px] font-medium bg-white text-black hover:bg-white/90 transition-colors min-h-[48px]"
            style={{ fontFamily: FONT_BODY }}
            data-testid="cta-see-work"
          >
            See the work →
          </button>
          <button
            onClick={() => scrollTo("#contact")}
            className="inline-flex items-center text-[15px] text-white/85 hover:text-white transition-colors min-h-[44px]"
            style={{ fontFamily: FONT_BODY }}
            data-testid="cta-book-audit"
          >
            Book a brand audit →
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 pointer-events-none"
        aria-hidden="true"
      >
        <span className="text-[11px] tracking-[0.2em] uppercase text-white/40" style={{ fontFamily: FONT_MONO }}>Scroll</span>
        <span className="block w-px h-8 bg-white/25" />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section 2 — Client Proof Strip
// ─────────────────────────────────────────────────────────────────────────────
function ClientStrip() {
  return (
    <section
      className="w-full"
      style={{
        backgroundColor: BG_DARK,
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
      aria-label="Selected clients"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 lg:px-12 py-8 md:py-10">
        <p
          className="text-[11px] md:text-[12px] tracking-[0.2em] uppercase text-white/50 mb-4 md:mb-5"
          style={{ fontFamily: FONT_MONO }}
        >
          Selected clients
        </p>
        <div
          className="flex flex-wrap items-center gap-x-3 sm:gap-x-5 md:gap-x-7 gap-y-2 text-white/85 text-[15px] sm:text-[17px] md:text-[20px] font-medium"
          style={{ fontFamily: FONT_HEAD, letterSpacing: "0.02em" }}
        >
          {clientNames.map((name, i) => (
            <React.Fragment key={name}>
              <span>{name}</span>
              {i < clientNames.length - 1 && <span className="text-white/35">·</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section 3 — Selected Work
// ─────────────────────────────────────────────────────────────────────────────
function SelectedWork() {
  return (
    <section
      id="selected-work"
      className="w-full"
      style={{ backgroundColor: BG_DARK, scrollMarginTop: "72px" }}
      aria-labelledby="selected-work-heading"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 lg:px-12 py-20 md:py-28">
        <div className="mb-12 md:mb-20">
          <p
            className="text-[11px] md:text-[12px] tracking-[0.2em] uppercase text-white/50 mb-3"
            style={{ fontFamily: FONT_MONO }}
          >
            Selected work
          </p>
          <h2
            id="selected-work-heading"
            className="font-bold text-white leading-[1.05] tracking-[-0.02em]"
            style={{ fontFamily: FONT_HEAD, fontSize: "clamp(32px, 5vw, 56px)", maxWidth: "20ch" }}
          >
            Four projects worth scrolling.
          </h2>
        </div>

        <div className="flex flex-col gap-16 md:gap-24 lg:gap-28">
          {selectedWork.map((work, idx) => {
            const imageFirst = idx % 2 === 1; // alternate
            return (
              <article
                key={work.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center group"
              >
                {/* Image */}
                <Link href={work.href}>
                  <a
                    className={`relative block lg:col-span-7 overflow-hidden rounded-xl md:rounded-2xl cursor-pointer ${imageFirst ? "lg:order-1" : "lg:order-2"}`}
                    style={{ aspectRatio: "16 / 10", backgroundColor: BG_DARK_ALT }}
                    aria-label={`View ${work.client} case study`}
                  >
                    {work.image ? (
                      <img
                        src={work.image}
                        alt={`${work.client} — ${work.description}`}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    ) : (
                      // Placeholder gradient block
                      <div
                        className="absolute inset-0 w-full h-full"
                        style={{
                          background: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)",
                        }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span
                            className="text-white/30 text-[14px] tracking-[0.2em] uppercase"
                            style={{ fontFamily: FONT_MONO }}
                          >
                            Imagery coming soon
                          </span>
                        </div>
                      </div>
                    )}
                  </a>
                </Link>

                {/* Copy */}
                <div className={`lg:col-span-5 ${imageFirst ? "lg:order-2" : "lg:order-1"}`}>
                  <div
                    className="flex items-center gap-3 mb-4 text-[11px] tracking-[0.18em] uppercase text-white/50"
                    style={{ fontFamily: FONT_MONO }}
                  >
                    <span>{work.sector}</span>
                    <span className="text-white/25">·</span>
                    <span>{work.year}</span>
                  </div>
                  <h3
                    className="font-bold text-white leading-[1.05] tracking-[-0.02em] mb-4"
                    style={{ fontFamily: FONT_HEAD, fontSize: "clamp(28px, 4vw, 44px)" }}
                  >
                    {work.client}
                  </h3>
                  <p
                    className="text-[16px] md:text-[17px] leading-relaxed mb-6"
                    style={{ color: TEXT_MUTED_DARK, fontFamily: FONT_BODY, maxWidth: "44ch" }}
                  >
                    {work.description}
                  </p>
                  <Link href={work.href}>
                    <a
                      className="inline-flex items-center gap-2 text-[15px] font-medium text-white border-b border-white/30 hover:border-white pb-1 transition-colors cursor-pointer"
                      style={{ fontFamily: FONT_BODY }}
                    >
                      View case study
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </a>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section 4 — In Development (TIX)
// ─────────────────────────────────────────────────────────────────────────────
function InDevelopment() {
  return (
    <section
      className="w-full"
      style={{ backgroundColor: BG_DARK_ALT }}
      aria-labelledby="in-development-heading"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 lg:px-12 py-20 md:py-28">
        <p
          className="text-[11px] md:text-[12px] tracking-[0.2em] uppercase text-white/50 mb-3"
          style={{ fontFamily: FONT_MONO }}
        >
          In development
        </p>
        <h2
          id="in-development-heading"
          className="font-bold text-white leading-[1.05] tracking-[-0.02em] mb-12 md:mb-16"
          style={{ fontFamily: FONT_HEAD, fontSize: "clamp(32px, 5vw, 56px)" }}
        >
          TIX
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 relative overflow-hidden rounded-xl md:rounded-2xl" style={{ aspectRatio: "16 / 10", backgroundColor: "#1a1a1a" }}>
            <img
              src={tixImage}
              alt="TIX — ticketing experience platform brand identity"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-5">
            <p
              className="text-[17px] md:text-[19px] leading-relaxed mb-6"
              style={{ color: TEXT_MUTED_DARK, fontFamily: FONT_BODY, maxWidth: "44ch" }}
            >
              A ticketing experience platform — alternative to existing event booking aggregators.
            </p>
            <div
              className="flex flex-wrap items-center gap-2 mb-8 text-[12px] tracking-[0.16em] uppercase"
              style={{ fontFamily: FONT_MONO, color: ACCENT }}
            >
              <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: ACCENT }} />
              Branding complete · Product in development
            </div>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 text-[15px] font-medium text-white border-b border-white/30 hover:border-white pb-1 transition-colors"
              style={{ fontFamily: FONT_BODY }}
            >
              Follow progress →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section 5 — Services
// ─────────────────────────────────────────────────────────────────────────────
function Services() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="w-full"
      style={{ backgroundColor: BG_DARK, scrollMarginTop: "72px" }}
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 lg:px-12 py-20 md:py-28">
        <div className="mb-12 md:mb-16">
          <p
            className="text-[11px] md:text-[12px] tracking-[0.2em] uppercase text-white/50 mb-3"
            style={{ fontFamily: FONT_MONO }}
          >
            Services
          </p>
          <h2
            id="services-heading"
            className="font-bold text-white leading-[1.05] tracking-[-0.02em]"
            style={{ fontFamily: FONT_HEAD, fontSize: "clamp(32px, 5vw, 56px)", maxWidth: "20ch" }}
          >
            Four things we do well.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
          {services.map((s, idx) => {
            const isOpen = active === idx;
            return (
              <button
                key={s.number}
                type="button"
                onClick={() => setActive(isOpen ? null : idx)}
                onMouseEnter={() => setActive(idx)}
                onMouseLeave={() => setActive(null)}
                className="text-left p-6 md:p-8 transition-colors duration-300 hover:bg-white/[0.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                style={{ backgroundColor: BG_DARK, minHeight: "180px" }}
                aria-expanded={isOpen}
              >
                <span
                  className="block text-[12px] tracking-[0.18em] uppercase mb-4"
                  style={{ color: ACCENT, fontFamily: FONT_MONO }}
                >
                  {s.number}
                </span>
                <h3
                  className="text-white font-semibold leading-tight mb-3"
                  style={{ fontFamily: FONT_HEAD, fontSize: "clamp(20px, 2vw, 22px)" }}
                >
                  {s.name}
                </h3>
                <p
                  className="text-[14px] md:text-[15px] leading-relaxed transition-all duration-300"
                  style={{
                    color: TEXT_MUTED_DARK,
                    fontFamily: FONT_BODY,
                    maxHeight: isOpen ? "200px" : "0",
                    opacity: isOpen ? 1 : 0,
                    overflow: "hidden",
                  }}
                >
                  {s.oneLiner}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section 7 — Approach
// ─────────────────────────────────────────────────────────────────────────────
function Approach() {
  return (
    <section
      className="w-full"
      style={{ backgroundColor: BG_LIGHT }}
      aria-labelledby="approach-heading"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 lg:px-12 py-20 md:py-28">
        <div className="mb-12 md:mb-16">
          <p
            className="text-[11px] md:text-[12px] tracking-[0.2em] uppercase mb-3"
            style={{ color: TEXT_MUTED_LIGHT, fontFamily: FONT_MONO }}
          >
            Approach
          </p>
          <h2
            id="approach-heading"
            className="font-bold leading-[1.05] tracking-[-0.02em]"
            style={{ color: BG_DARK, fontFamily: FONT_HEAD, fontSize: "clamp(28px, 4vw, 44px)", maxWidth: "24ch" }}
          >
            How we work, in four steps.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 lg:gap-10">
          {approach.map((a, idx) => (
            <div key={a.step}>
              <span
                className="block text-[11px] tracking-[0.2em] uppercase mb-4"
                style={{ color: TEXT_MUTED_LIGHT, fontFamily: FONT_MONO }}
              >
                {String(idx + 1).padStart(2, "0")}
              </span>
              <h3
                className="font-bold leading-tight mb-3"
                style={{ color: BG_DARK, fontFamily: FONT_HEAD, fontSize: "clamp(22px, 2vw, 26px)" }}
              >
                {a.step}
              </h3>
              <p
                className="text-[15px] md:text-[16px] leading-relaxed"
                style={{ color: TEXT_MUTED_LIGHT, fontFamily: FONT_BODY }}
              >
                {a.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section 8 — Close CTA
// ─────────────────────────────────────────────────────────────────────────────
function CloseCTA() {
  return (
    <section
      id="contact"
      className="w-full"
      style={{ backgroundColor: BG_DARK, scrollMarginTop: "72px" }}
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto max-w-[1100px] px-5 md:px-8 lg:px-12 py-24 md:py-36 text-center">
        <h2
          id="cta-heading"
          className="font-bold text-white leading-[1.02] tracking-[-0.02em] mb-6 md:mb-8"
          style={{ fontFamily: FONT_HEAD, fontSize: "clamp(40px, 7vw, 88px)" }}
        >
          Ready to start <br className="hidden sm:block" />something?
        </h2>
        <p
          className="text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed mx-auto mb-10 md:mb-12"
          style={{ color: TEXT_MUTED_DARK, fontFamily: FONT_BODY, maxWidth: "560px" }}
        >
          We work with founders and teams who want brand, software, or AI built well. Tell us what you're working on.
        </p>

        <a
          href="https://calendly.com/praveenraj"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-8 py-4 rounded-full text-[15px] font-medium bg-white text-black hover:bg-white/90 transition-colors min-h-[52px]"
          style={{ fontFamily: FONT_BODY }}
          data-testid="close-cta-book"
        >
          Book a brand audit →
        </a>

        <div
          className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-[14px] md:text-[15px]"
          style={{ color: TEXT_MUTED_DARK, fontFamily: FONT_BODY }}
        >
          <a href="mailto:connect@graysolutions.in" className="hover:text-white transition-colors">
            connect@graysolutions.in
          </a>
          <span className="hidden sm:inline text-white/25">·</span>
          <a href="tel:+916380267018" className="hover:text-white transition-colors">
            +91 63802 67018
          </a>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────────────────────────────
function LandingFooter() {
  return (
    <footer
      className="w-full"
      style={{ backgroundColor: BG_DARK, borderTop: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 lg:px-12 py-14 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8">
          {Object.entries(footerCols).map(([title, items]) => (
            <div key={title}>
              <p
                className="text-[11px] tracking-[0.2em] uppercase text-white/45 mb-4"
                style={{ fontFamily: FONT_MONO }}
              >
                {title}
              </p>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li
                    key={item}
                    className="text-[14px] md:text-[15px] text-white/80"
                    style={{ fontFamily: FONT_BODY }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Landing page (Phase 1)
// ─────────────────────────────────────────────────────────────────────────────
export default function Landing() {
  return (
    <div
      className="w-full"
      style={{
        backgroundColor: BG_DARK,
        color: "#fff",
        fontFamily: FONT_BODY,
        overflowX: "hidden",
      }}
    >
      <Navigation />

      <main>
        <Hero />
        <ClientStrip />
        <SelectedWork />
        <InDevelopment />
        <Services />
        <Approach />
        <CloseCTA />
      </main>

      <LandingFooter />
    </div>
  );
}
