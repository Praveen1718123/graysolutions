import React, { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

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
    image: null,
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

const testimonials = [
  {
    quote: "Gray Solutions were insanely clear from day one — scope, timelines, and what's realistic. They executed fast, shared progress without us chasing, and delivered exactly what we needed.",
    name: "Vimal Baskaran",
    role: "Founder",
    company: "GoGauge",
  },
  {
    quote: "What I liked most was their speed + structure. No random promises — just a clean plan, sharp creatives, and consistent delivery. Communication was solid throughout.",
    name: "Sarath",
    role: "Founder",
    company: "Eagle",
  },
  {
    quote: "They didn't just 'build a website' — they helped us position the brand properly. Clean UI, strong messaging, and a process that felt professional end-to-end.",
    name: "Vignesh Selvaganapathy",
    role: "Founder",
    company: "Modulr Homes",
  },
];

const faqItems = [
  {
    question: "What does Gray Solutions do?",
    answer: "We help businesses grow through clear strategy, good design, and execution that ships. That includes brand positioning, websites, social content, ad creatives, and software — built to be consistent and measurable.",
  },
  {
    question: "What does a typical timeline look like?",
    answer: "Most projects run in 2–6 weeks depending on scope. Week 1: discovery, goals, audit, direction. Weeks 2–3: strategy, copy structure, design system. Weeks 3–5: production — website, creatives, content, ads. Weeks 5–6: QA, launch, tracking, optimisation plan. If you need something faster, we can run a sprint-based delivery.",
  },
  {
    question: "What do you need from us to start?",
    answer: "To move fast and avoid rework, we usually need: your business goal (leads, conversions, awareness, hiring), your offer and pricing, access to existing assets (logo, brand files, website, social handles), any past performance data, and one decision-maker for approvals.",
  },
  {
    question: "How is pricing structured?",
    answer: "Pricing is based on scope, complexity, and speed — not hours logged. We work in three ways: project-based (fixed scope, fixed price — best for websites and launches), monthly retainer (ongoing content, ads, and optimisation — best for sustained growth), and sprint packages (short, high-output cycles — best for fast turnarounds). After discovery, you'll get a clear breakdown of deliverables and cost.",
  },
  {
    question: "What causes timelines or budgets to change?",
    answer: "Usually one of these: scope expands after kickoff (new pages, extra creatives, new features), feedback loops take longer than planned (delayed approvals), new requirements appear mid-way, or missing inputs (assets, logins, product details, past data). We'll always flag changes early and document them before moving forward.",
  },
  {
    question: "What makes Gray different from a typical agency?",
    answer: "Most agencies sell activity. We sell output that connects to a business goal. We build systems, not one-off assets. We keep things minimal and functional. We work with a small, senior team — not a layered chain of contractors. Every decision ties back to something measurable.",
  },
];

const footerCols = {
  Work: ["GoGauge", "Eagle", "Magic Trucks", "Cafe66"],
  Studio: ["Approach", "Services", "Careers"],
  Writing: ["Notes", "Newsletter", "Archive"],
  Contact: ["connect@graysolutions.in", "+91 63802 67018", "Coimbatore, India", "© 2026 Gray Solutions"],
};

const studioThemes = [
  {
    id: "technology",
    label: "01 — Technology",
    frameA: "linear-gradient(135deg, #0A0F1A 0%, #1A2540 60%, #2A3D6B 100%)",
    frameB: "linear-gradient(135deg, #1A2540 0%, #4A7FCC 50%, #A8D8FF 100%)",
  },
  {
    id: "materiality",
    label: "02 — Materiality",
    frameA: "linear-gradient(135deg, #1A1410 0%, #3A2E22 60%, #5C4A38 100%)",
    frameB: "linear-gradient(135deg, #3A2E22 0%, #8C7558 50%, #D8C5A6 100%)",
  },
  {
    id: "generative",
    label: "03 — Generative",
    frameA: "linear-gradient(135deg, #1A0A1A 0%, #3D1E40 60%, #6B2E70 100%)",
    frameB: "linear-gradient(135deg, #3D1E40 0%, #B856C2 50%, #FFAEE0 100%)",
  },
  {
    id: "craft",
    label: "04 — Craft",
    frameA: "linear-gradient(135deg, #14100A 0%, #3D2F1E 60%, #6B5036 100%)",
    frameB: "linear-gradient(135deg, #3D2F1E 0%, #C99860 50%, #FFD7A6 100%)",
  },
  {
    id: "motion",
    label: "05 — Motion",
    frameA: "linear-gradient(135deg, #0A1414 0%, #1E3D3A 60%, #2E6B66 100%)",
    frameB: "linear-gradient(135deg, #1E3D3A 0%, #58C2B5 50%, #AEFFEE 100%)",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Infinite Marquee
// Two copies of the text; Framer Motion animates x from 0% → -50% in a loop.
// ─────────────────────────────────────────────────────────────────────────────
const MARQUEE_TEXT = "Brand systems · Software in production · AI that earns its place · Built to hold up ·";

function InfiniteMarquee({ reverse = false }: { reverse?: boolean }) {
  const reduced = useReducedMotion();

  const textClass = "text-[11px] tracking-[0.18em] uppercase pr-20 whitespace-nowrap select-none";
  const textStyle = { color: "rgba(255,255,255,0.38)", fontFamily: FONT_MONO };

  if (reduced) {
    return (
      <div className="overflow-hidden py-3" aria-hidden="true">
        <span className={textClass} style={textStyle}>{MARQUEE_TEXT}</span>
      </div>
    );
  }

  return (
    <div className="overflow-hidden py-3" aria-hidden="true">
      <motion.div
        className="inline-flex"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity, repeatType: "loop" }}
        style={{ willChange: "transform" }}
      >
        <span className={textClass} style={textStyle}>{MARQUEE_TEXT}</span>
        <span className={textClass} style={textStyle}>{MARQUEE_TEXT}</span>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Fade-up on scroll (shared helper)
// ─────────────────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: [0.25, 0.4, 0.25, 1] },
  }),
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
          <Link
            href="/"
            className="text-[20px] md:text-[22px] font-bold tracking-tight text-white cursor-pointer"
            style={{ fontFamily: FONT_HEAD }}
            aria-label="Gray Solutions homepage"
          >
            Gray
          </Link>

          <nav className="hidden md:flex items-center gap-8 lg:gap-10" aria-label="Main">
            {navItems.map((item) =>
              item.external ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[14px] text-white/75 hover:text-white transition-colors cursor-pointer"
                  style={{ fontFamily: FONT_BODY }}
                >
                  {item.label}
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
            )}
            <a
              href="#contact"
              onClick={(e) => handleAnchorClick(e, "#contact")}
              className="text-[14px] font-medium px-4 lg:px-5 py-2 lg:py-2.5 rounded-full border border-white/15 hover:bg-white hover:text-black transition-all"
              style={{ fontFamily: FONT_BODY }}
            >
              Book a call →
            </a>
          </nav>

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
          <button className="p-2 -mr-2 text-white" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col gap-2 px-5 pt-10" aria-label="Mobile">
          {navItems.map((item) =>
            item.external ? (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block text-[28px] font-semibold py-3 text-white cursor-pointer"
                style={{ fontFamily: FONT_HEAD }}
              >
                {item.label}
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
          )}
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
  const reduced = useReducedMotion();
  const scrollTo = (sel: string) => {
    const el = document.querySelector(sel);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Word-by-word headline animation
  const headlineWords = ["Work", "that"];
  const wordVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: reduced ? 0 : 0.25 + i * 0.1, ease: [0.25, 0.4, 0.25, 1] },
    }),
  };

  return (
    <section
      className="relative w-full flex flex-col"
      style={{ backgroundColor: BG_DARK, minHeight: "85vh", paddingTop: "64px" }}
      aria-labelledby="hero-heading"
    >
      {/* Top marquee strip */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <InfiniteMarquee />
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center py-14 md:py-20">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8 lg:px-12 w-full">
          <motion.p
            className="text-[12px] md:text-[13px] tracking-[0.18em] uppercase text-white/55 mb-6 md:mb-8"
            style={{ fontFamily: FONT_MONO }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: reduced ? 0 : 0.1 }}
          >
            Brand · Software · AI
          </motion.p>

          <h1
            id="hero-heading"
            className="font-bold text-white leading-[0.96] tracking-[-0.02em]"
            style={{ fontFamily: FONT_HEAD, fontSize: "clamp(52px, 11vw, 140px)", maxWidth: "16ch" }}
          >
            {headlineWords.map((word, i) => (
              <motion.span
                key={word}
                className="inline-block mr-[0.22em]"
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
              >
                {word}
              </motion.span>
            ))}
            <br />
            <motion.span
              className="inline-block"
              style={{ color: ACCENT }}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: reduced ? 0 : 0.48, ease: [0.25, 0.4, 0.25, 1] }}
            >
              holds up.
            </motion.span>
          </h1>

          <motion.p
            className="mt-6 md:mt-8 text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed"
            style={{ color: TEXT_MUTED_DARK, fontFamily: FONT_BODY, maxWidth: "640px" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: reduced ? 0 : 0.68 }}
          >
            Brand systems, software, and AI built for production. Working with teams across India and the UAE since 2015.
          </motion.p>

          <motion.div
            className="mt-10 md:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: reduced ? 0 : 0.88 }}
          >
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
          </motion.div>
        </div>
      </div>

      {/* Bottom marquee strip (reverse direction) */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <InfiniteMarquee reverse />
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
        <motion.p
          className="text-[11px] md:text-[12px] tracking-[0.2em] uppercase text-white/50 mb-4 md:mb-5"
          style={{ fontFamily: FONT_MONO }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
        >
          Selected clients
        </motion.p>
        <motion.div
          className="flex flex-wrap items-center gap-x-3 sm:gap-x-5 md:gap-x-7 gap-y-2 text-white/85 text-[15px] sm:text-[17px] md:text-[20px] font-medium"
          style={{ fontFamily: FONT_HEAD, letterSpacing: "0.02em" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.1}
        >
          {clientNames.map((name, i) => (
            <React.Fragment key={name}>
              <span>{name}</span>
              {i < clientNames.length - 1 && <span className="text-white/35">·</span>}
            </React.Fragment>
          ))}
        </motion.div>
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
        <motion.div
          className="mb-12 md:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
        >
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
        </motion.div>

        <div className="flex flex-col gap-16 md:gap-24 lg:gap-28">
          {selectedWork.map((work, idx) => {
            const imageFirst = idx % 2 === 1;
            return (
              <motion.article
                key={work.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center group"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
                custom={0}
              >
                {/* Image */}
                <Link
                  href={work.href}
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
                    <div
                      className="absolute inset-0 w-full h-full"
                      style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)" }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white/30 text-[14px] tracking-[0.2em] uppercase" style={{ fontFamily: FONT_MONO }}>
                          Imagery coming soon
                        </span>
                      </div>
                    </div>
                  )}
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
                  <Link
                    href={work.href}
                    className="inline-flex items-center gap-2 text-[15px] font-medium text-white border-b border-white/30 hover:border-white pb-1 transition-colors cursor-pointer group/link"
                    style={{ fontFamily: FONT_BODY }}
                  >
                    View case study
                    <span className="transition-transform duration-200 group-hover/link:translate-x-1">→</span>
                  </Link>
                </div>
              </motion.article>
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
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
        >
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
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.1}
        >
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
        </motion.div>
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
        <motion.div
          className="mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
        >
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
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
          {services.map((s, idx) => {
            const isOpen = active === idx;
            return (
              <motion.button
                key={s.number}
                type="button"
                onClick={() => setActive(isOpen ? null : idx)}
                onMouseEnter={() => setActive(idx)}
                onMouseLeave={() => setActive(null)}
                className="text-left p-6 md:p-8 transition-colors duration-300 hover:bg-white/[0.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                style={{ backgroundColor: BG_DARK, minHeight: "180px" }}
                aria-expanded={isOpen}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={idx * 0.07}
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
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section 6 — Studio (scroll-driven crossfade with placeholder gradients)
// ─────────────────────────────────────────────────────────────────────────────
function StudioSection() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const themeRefs  = useRef<Array<HTMLDivElement | null>>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    if (typeof window === "undefined" || !wrapperRef.current) return;

    let triggers: any[] = [];
    let gsapInstance: any = null;
    let cancelled = false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();

        Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapMod, stMod]: [any, any]) => {
          if (cancelled) return;
          const gsap = gsapMod.default || gsapMod;
          const ScrollTrigger = stMod.ScrollTrigger || stMod.default;
          gsap.registerPlugin(ScrollTrigger);
          gsapInstance = gsap;

          themeRefs.current.forEach((section) => {
            if (!section) return;
            const frameA = section.querySelector(".frame-a") as HTMLElement | null;
            const frameB = section.querySelector(".frame-b") as HTMLElement | null;
            if (!frameA || !frameB) return;

            const st = ScrollTrigger.create({
              trigger: section,
              start: "top center",
              end: "bottom center",
              scrub: true,
              onUpdate: (self: any) => {
                const p = self.progress;
                frameA.style.opacity = String(1 - p);
                frameB.style.opacity = String(p);
              },
            });
            triggers.push(st);
          });
        }).catch(() => {
          themeRefs.current.forEach((section) => {
            const frameA = section?.querySelector(".frame-a") as HTMLElement | null;
            const frameB = section?.querySelector(".frame-b") as HTMLElement | null;
            if (frameA) frameA.style.opacity = "0";
            if (frameB) frameB.style.opacity = "1";
          });
        });
      },
      { rootMargin: "200px 0px" }
    );

    observer.observe(wrapperRef.current);

    return () => {
      cancelled = true;
      observer.disconnect();
      triggers.forEach((t) => t?.kill?.());
      if (gsapInstance?.ScrollTrigger) gsapInstance.ScrollTrigger.refresh?.();
    };
  }, [reducedMotion]);

  return (
    <section
      id="studio"
      ref={wrapperRef}
      className="relative w-full"
      style={{ backgroundColor: BG_DARK, scrollMarginTop: "72px" }}
      aria-labelledby="studio-heading"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 lg:px-12 pt-20 md:pt-28 pb-12 md:pb-16">
        <p
          className="text-[11px] md:text-[12px] tracking-[0.2em] uppercase text-white/50 mb-3"
          style={{ fontFamily: FONT_MONO }}
        >
          Studio
        </p>
        <h2
          id="studio-heading"
          className="font-bold text-white leading-[1.05] tracking-[-0.02em] mb-5 md:mb-6"
          style={{ fontFamily: FONT_HEAD, fontSize: "clamp(32px, 5vw, 56px)", maxWidth: "20ch" }}
        >
          One mark, <span style={{ color: ACCENT }}>five expressions.</span>
        </h2>
        <p
          className="text-[16px] md:text-[18px] leading-relaxed"
          style={{ color: TEXT_MUTED_DARK, fontFamily: FONT_BODY, maxWidth: "60ch" }}
        >
          The work we make ranges across brand, software, and AI. The studio identity reflects that range.
        </p>
      </div>

      <div className="flex flex-col">
        {studioThemes.map((theme, idx) => (
          <div
            key={theme.id}
            ref={(el) => { themeRefs.current[idx] = el; }}
            className="studio-theme relative overflow-hidden"
            style={{ height: "80vh", minHeight: "520px" }}
          >
            <div
              className="frame-a absolute inset-0 w-full h-full"
              style={{ background: theme.frameA, opacity: reducedMotion ? 0 : 1, willChange: "opacity" }}
              aria-hidden="true"
            />
            <div
              className="frame-b absolute inset-0 w-full h-full"
              style={{ background: theme.frameB, opacity: reducedMotion ? 1 : 0, willChange: "opacity" }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span
                className="font-bold tracking-[-0.04em] text-white/85"
                style={{ fontFamily: FONT_HEAD, fontSize: "clamp(72px, 14vw, 200px)", textShadow: "0 4px 40px rgba(0,0,0,0.35)" }}
              >
                Gray
              </span>
            </div>
            <span
              className="absolute top-6 left-5 md:top-8 md:left-8 lg:left-12 text-[11px] md:text-[12px] tracking-[0.2em] uppercase text-white/75 z-10"
              style={{ fontFamily: FONT_MONO }}
            >
              {theme.label}
            </span>
          </div>
        ))}
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
        <motion.div
          className="mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
        >
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
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 lg:gap-10">
          {approach.map((a, idx) => (
            <motion.div
              key={a.step}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={idx * 0.08}
            >
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section 8 — Testimonials
// ─────────────────────────────────────────────────────────────────────────────
function Testimonials() {
  return (
    <section
      className="w-full"
      style={{ backgroundColor: BG_DARK_ALT }}
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 lg:px-12 py-20 md:py-28">
        <motion.div
          className="mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
        >
          <p
            className="text-[11px] md:text-[12px] tracking-[0.2em] uppercase text-white/50 mb-3"
            style={{ fontFamily: FONT_MONO }}
          >
            What clients say
          </p>
          <h2
            id="testimonials-heading"
            className="font-bold text-white leading-[1.05] tracking-[-0.02em]"
            style={{ fontFamily: FONT_HEAD, fontSize: "clamp(28px, 4vw, 44px)", maxWidth: "30ch" }}
          >
            Straight from the people we've worked with.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i * 0.1}
              className="flex flex-col"
              style={{
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px",
                padding: "28px 28px 32px",
              }}
            >
              {/* Quote mark */}
              <span
                className="block mb-5 text-[32px] leading-none"
                style={{ color: ACCENT, fontFamily: FONT_HEAD }}
                aria-hidden="true"
              >
                "
              </span>

              <blockquote className="flex-1">
                <p
                  className="text-[15px] md:text-[16px] leading-relaxed mb-8"
                  style={{ color: "rgba(255,255,255,0.82)", fontFamily: FONT_BODY }}
                >
                  {t.quote}
                </p>
              </blockquote>

              <footer>
                <p
                  className="text-[15px] font-semibold text-white mb-0.5"
                  style={{ fontFamily: FONT_HEAD }}
                >
                  {t.name}
                </p>
                <p
                  className="text-[13px]"
                  style={{ color: "rgba(255,255,255,0.45)", fontFamily: FONT_BODY }}
                >
                  {t.role}, {t.company}
                </p>
              </footer>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section 9 — FAQ
// ─────────────────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const reduced = useReducedMotion();

  return (
    <section
      className="w-full"
      style={{ backgroundColor: BG_DARK }}
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 lg:px-12 py-20 md:py-28">
        <motion.div
          className="mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
        >
          <p
            className="text-[11px] md:text-[12px] tracking-[0.2em] uppercase text-white/50 mb-3"
            style={{ fontFamily: FONT_MONO }}
          >
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="font-bold text-white leading-[1.05] tracking-[-0.02em]"
            style={{ fontFamily: FONT_HEAD, fontSize: "clamp(28px, 4vw, 44px)", maxWidth: "24ch" }}
          >
            Questions we get asked.
          </h2>
        </motion.div>

        <div
          className="max-w-[840px]"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          {faqItems.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i * 0.05}
              >
                <button
                  className="w-full py-6 flex items-start justify-between text-left gap-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span
                    className="text-[16px] md:text-[17px] font-medium text-white leading-snug"
                    style={{ fontFamily: FONT_HEAD }}
                  >
                    {item.question}
                  </span>
                  <motion.span
                    className="flex-shrink-0 w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-white/60 mt-0.5"
                    style={{ fontFamily: FONT_BODY, fontSize: "18px", lineHeight: 1 }}
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: reduced ? 0 : 0.2, ease: "easeInOut" }}
                    aria-hidden="true"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduced ? 0 : 0.28, ease: [0.25, 0.4, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <p
                        className="pb-7 text-[15px] md:text-[16px] leading-relaxed"
                        style={{ color: TEXT_MUTED_DARK, fontFamily: FONT_BODY, maxWidth: "68ch" }}
                      >
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section 10 — Close CTA
// ─────────────────────────────────────────────────────────────────────────────
function CloseCTA() {
  return (
    <section
      id="contact"
      className="w-full"
      style={{ backgroundColor: BG_DARK, scrollMarginTop: "72px", borderTop: "1px solid rgba(255,255,255,0.08)" }}
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto max-w-[1100px] px-5 md:px-8 lg:px-12 py-24 md:py-36 text-center">
        <motion.h2
          id="cta-heading"
          className="font-bold text-white leading-[1.02] tracking-[-0.02em] mb-6 md:mb-8"
          style={{ fontFamily: FONT_HEAD, fontSize: "clamp(40px, 7vw, 88px)" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
        >
          Ready to start <br className="hidden sm:block" />something?
        </motion.h2>
        <motion.p
          className="text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed mx-auto mb-10 md:mb-12"
          style={{ color: TEXT_MUTED_DARK, fontFamily: FONT_BODY, maxWidth: "560px" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.1}
        >
          We work with founders and teams who want brand, software, or AI built well. Tell us what you're working on.
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.2}
        >
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
        </motion.div>
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
// Landing page — Phase 1 complete (11 sections)
// ─────────────────────────────────────────────────────────────────────────────
export default function Landing() {
  return (
    <div
      className="w-full"
      style={{ backgroundColor: BG_DARK, color: "#fff", fontFamily: FONT_BODY, overflowX: "hidden" }}
    >
      <Navigation />

      <main>
        <Hero />
        <ClientStrip />
        <SelectedWork />
        <InDevelopment />
        <Services />
        <StudioSection />
        <Approach />
        <Testimonials />
        <FAQ />
        <CloseCTA />
      </main>

      <LandingFooter />
    </div>
  );
}
