import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, SlidersHorizontal } from "lucide-react";
import Lenis from "lenis";
import SiteNav from "@/components/site-nav";
import Footer from "@/components/footer";
import {
  selectedWork,
  workCategories,
  type WorkItem,
  type WorkCategory,
} from "@/lib/work-data";

// ─────────────────────────────────────────────────────────────────────────────
// Design tokens (matches landing.tsx dark theme)
// ─────────────────────────────────────────────────────────────────────────────
const BG_DEEP        = "#05070D";
const BG_PRIMARY     = "#090B12";
const BG_SECONDARY   = "#0F1218";
const SURFACE_GLASS  = "rgba(17,24,39,0.55)";
const TEXT_PRIMARY   = "#F1F3F8";
const TEXT_SECONDARY = "#8B92A3";
const TEXT_TERTIARY  = "#5A6273";
const ACCENT_BLUE    = "#3B82F6";
const ACCENT_VIOLET  = "#8B5CF6";
const BORDER_SUBTLE  = "rgba(255,255,255,0.05)";
const BLUR_MEDIUM    = "16px";
const SHADOW_SOFT    = "0 8px 32px rgba(0,0,0,0.45)";

const FONT_DISPLAY = "'Plus Jakarta Sans', 'Inter', ui-sans-serif, system-ui, sans-serif";
const FONT_BODY    = "'DM Sans', 'Inter', ui-sans-serif, system-ui, sans-serif";
const FONT_MONO    = "'JetBrains Mono', ui-monospace, monospace";
const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EXPO_OUT_CSS = "cubic-bezier(0.16, 1, 0.3, 1)";

// Stats banner data
const workStats = [
  { value: "120+", label: "Projects shipped" },
  { value: "60+",  label: "Clients worldwide" },
  { value: "8+",   label: "Industries served" },
  { value: "98%",  label: "Client satisfaction" },
];

function useLenis() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    let rafId: number;
    const raf = (time: number) => { lenis.raf(time); rafId = requestAnimationFrame(raf); };
    rafId = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(rafId); lenis.destroy(); };
  }, []);
}

// Read query param ?filter=brand|digital|product|ai
function getInitialFilter(): "All Work" | WorkCategory {
  if (typeof window === "undefined") return "All Work";
  const raw = new URLSearchParams(window.location.search).get("filter");
  const map: Record<string, WorkCategory> = {
    brand:   "Brand & Identity",
    digital: "Digital Marketing",
    product: "Product & Software",
    ai:      "AI & Automation",
  };
  return raw && map[raw] ? map[raw] : "All Work";
}

// ─────────────────────────────────────────────────────────────────────────────
// Work tile (matches the homepage card design)
// ─────────────────────────────────────────────────────────────────────────────
function WorkCard({ item, idx }: { item: WorkItem; idx: number }) {
  const isLinkable = item.href !== "#";
  const inner = (
    <motion.article
      className="work-card group relative flex flex-col h-full overflow-hidden cursor-pointer"
      style={{
        backgroundColor: SURFACE_GLASS,
        backdropFilter: `saturate(180%) blur(${BLUR_MEDIUM})`,
        WebkitBackdropFilter: `saturate(180%) blur(${BLUR_MEDIUM})`,
        border: "1px solid rgba(45, 59, 102, 0.45)",
        borderRadius: 16,
        boxShadow: SHADOW_SOFT,
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: idx * 0.06, ease: EXPO_OUT }}
    >
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1 / 0.95" }}>
        <div
          className="absolute inset-0 transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
          style={
            item.image
              ? { backgroundImage: `url(${item.image})`, backgroundSize: "cover", backgroundPosition: "center" }
              : { background: item.gradient || BG_SECONDARY }
          }
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-12"
          style={{ background: "linear-gradient(180deg, rgba(9,11,18,0) 0%, rgba(9,11,18,0.6) 100%)" }}
          aria-hidden="true"
        />
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

      <div className="flex flex-col flex-1 p-5 lg:p-5">
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

        <p
          className="mt-1.5 flex-1"
          style={{ color: TEXT_SECONDARY, fontFamily: FONT_BODY, fontSize: "13px", lineHeight: 1.5 }}
        >
          {item.description}
        </p>

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
        .work-card { transition: border-color 300ms ${EXPO_OUT_CSS}, transform 300ms ${EXPO_OUT_CSS}; }
        .work-card:hover { border-color: rgba(59, 130, 246, 0.55) !important; }
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

// ─────────────────────────────────────────────────────────────────────────────
// /work page
// ─────────────────────────────────────────────────────────────────────────────
export default function Work() {
  useLenis();
  const [activeCategory, setActiveCategory] = useState<"All Work" | WorkCategory>(getInitialFilter);

  const filtered =
    activeCategory === "All Work"
      ? selectedWork
      : selectedWork.filter((p) => p.categories.includes(activeCategory as WorkCategory));

  return (
    <div
      className="w-full"
      style={{ backgroundColor: BG_DEEP, color: TEXT_PRIMARY, fontFamily: FONT_BODY, overflowX: "hidden" }}
    >
      <SiteNav />

      <main>
        {/* ── Hero header ───────────────────────────────────────────── */}
        <section
          className="relative w-full"
          style={{ backgroundColor: BG_DEEP, paddingTop: "120px" }}
        >
          <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12 pt-8 md:pt-12 pb-10 md:pb-14">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EXPO_OUT }}
            >
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.24em] mb-5"
                style={{
                  color: TEXT_SECONDARY,
                  fontFamily: FONT_MONO,
                  backgroundColor: SURFACE_GLASS,
                  border: "1px solid rgba(45, 59, 102, 0.45)",
                }}
              >
                Our work
              </span>
              <h1
                className="font-bold tracking-[-0.035em]"
                style={{
                  fontFamily: FONT_DISPLAY,
                  color: TEXT_PRIMARY,
                  fontSize: "clamp(40px, 6vw, 80px)",
                  lineHeight: 0.98,
                  maxWidth: "20ch",
                }}
              >
                Every project starts with a problem worth solving.
              </h1>
              <p
                className="mt-6 md:mt-8"
                style={{
                  color: TEXT_SECONDARY,
                  fontFamily: FONT_BODY,
                  fontSize: "clamp(15px, 1.1vw, 18px)",
                  lineHeight: 1.6,
                  maxWidth: 620,
                }}
              >
                We partner with ambitious teams across logistics, e-commerce, fintech, and consumer brands to ship brand systems, digital experiences, products, and AI integrations that move real numbers.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Stats banner ──────────────────────────────────────────── */}
        <section className="w-full" style={{ backgroundColor: BG_DEEP }}>
          <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12 pb-12 md:pb-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
              {workStats.map((s, idx) => (
                <motion.div
                  key={s.label}
                  className="px-5 py-5"
                  style={{
                    background:
                      "radial-gradient(120% 100% at 0% 0%, rgba(59,130,246,0.05) 0%, transparent 50%), linear-gradient(180deg, rgba(20,28,46,0.55) 0%, rgba(11,16,28,0.55) 100%)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: 18,
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.06), 0 24px 48px -24px rgba(0,0,0,0.5)",
                    backdropFilter: "saturate(180%) blur(24px)",
                    WebkitBackdropFilter: "saturate(180%) blur(24px)",
                  }}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.06, ease: EXPO_OUT }}
                >
                  <div
                    className="font-bold tracking-[-0.025em]"
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontSize: "clamp(28px, 2.4vw, 40px)",
                      lineHeight: 1,
                      background: "linear-gradient(180deg, #FFFFFF 0%, #BAC4D6 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    className="mt-2 text-[11px] uppercase tracking-[0.18em]"
                    style={{ color: TEXT_TERTIARY, fontFamily: FONT_MONO }}
                  >
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Filter tab strip ───────────────────────────────────────── */}
        <section className="w-full" style={{ backgroundColor: BG_DEEP }}>
          <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12">
            <motion.div
              className="flex items-center justify-between gap-6"
              style={{ borderBottom: `1px solid ${BORDER_SUBTLE}` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: EXPO_OUT }}
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
                      className="relative whitespace-nowrap px-3 sm:px-4 py-3.5 text-[13px] font-medium transition-colors"
                      style={{ color: isActive ? TEXT_PRIMARY : TEXT_SECONDARY, fontFamily: FONT_BODY }}
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
          </div>
        </section>

        {/* ── Project grid ──────────────────────────────────────────── */}
        <section className="w-full" style={{ backgroundColor: BG_DEEP }}>
          <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12 pt-8 md:pt-10 pb-20 md:pb-32">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
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

            {filtered.length === 0 && (
              <div
                className="text-center py-16"
                style={{ color: TEXT_SECONDARY, fontFamily: FONT_BODY }}
              >
                No projects in this category yet. New work ships regularly — check back soon.
              </div>
            )}
          </div>
        </section>

        {/* ── Bottom CTA ────────────────────────────────────────────── */}
        <section
          className="w-full"
          style={{
            backgroundColor: BG_PRIMARY,
            borderTop: `1px solid ${BORDER_SUBTLE}`,
          }}
        >
          <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12 py-20 md:py-28 text-center">
            <motion.h2
              className="font-bold tracking-[-0.03em]"
              style={{
                fontFamily: FONT_DISPLAY,
                color: TEXT_PRIMARY,
                fontSize: "clamp(32px, 5vw, 56px)",
                lineHeight: 1.05,
                maxWidth: "18ch",
                margin: "0 auto",
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EXPO_OUT }}
            >
              Have a project in mind?
            </motion.h2>
            <motion.p
              className="mt-5 mx-auto"
              style={{
                color: TEXT_SECONDARY,
                fontFamily: FONT_BODY,
                fontSize: "clamp(15px, 1.1vw, 18px)",
                lineHeight: 1.55,
                maxWidth: 520,
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: EXPO_OUT }}
            >
              Tell us what you're building. We'll come back with a plan, a scope, and a number — usually within 48 hours.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: EXPO_OUT }}
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-[14px] font-medium transition-all cursor-pointer"
                style={{
                  fontFamily: FONT_BODY,
                  color: "#FFFFFF",
                  background: `linear-gradient(180deg, ${ACCENT_BLUE} 0%, #2563EB 100%)`,
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.18), 0 0 18px rgba(59,130,246,0.30)",
                }}
              >
                <span>Start a project</span>
                <ArrowUpRight size={14} strokeWidth={1.8} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[14px] font-medium transition-all cursor-pointer"
                style={{
                  fontFamily: FONT_BODY,
                  color: TEXT_PRIMARY,
                  border: "1px solid rgba(255,255,255,0.08)",
                  backgroundColor: "rgba(255,255,255,0.03)",
                }}
              >
                See our services
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
