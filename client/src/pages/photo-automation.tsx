import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Camera, Wand2, Tags, LayoutDashboard, Download, Check, Clock } from "lucide-react";
import Footer from "@/components/footer";
import SiteNav from "@/components/site-nav";

const ACCENT = "#D14D57"; // crimson accent
const DARK = "#1A1A1A";

const PIPELINE = [
  { icon: Camera, title: "Shoot & upload", text: "Photographers upload each vendor's raw shoot to the dashboard." },
  { icon: Wand2, title: "Auto image processing", text: "Batch retouching — exposure, colour, and cleanup — applied consistently to every photo." },
  { icon: Tags, title: "Auto-renaming", text: "Files renamed to the platform's exact naming convention, automatically." },
  { icon: LayoutDashboard, title: "Dashboard", text: "Photographers manage shoots; vendors log in to view and grab their processed images." },
  { icon: Download, title: "Bulk export", text: "Download a full, on-spec set in one click — ready for the platform." },
];

const CHALLENGES = [
  "Manual, photo-by-photo retouching is slow and costly",
  "Inconsistent file naming and organisation",
  "No central place for photographers to upload or vendors to download",
  "Editing time and cost climb with every new vendor onboarded",
  "Hard to scale the process city by city",
];

const DELIVERABLES = [
  "Automated image processing & retouching",
  "Batch auto-renaming to naming convention",
  "Photographer upload & management dashboard",
  "Vendor login + download portal",
  "One-click bulk export",
  "A repeatable pipeline that scales across cities",
];

export default function PhotoAutomation() {
  const [, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 150);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen w-full font-sans overflow-x-hidden" style={{ backgroundColor: "#FBFAF9", color: DARK, fontFamily: "-apple-system, system-ui, sans-serif" }}>
      <SiteNav theme="light" />

      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-20" style={{ backgroundColor: "#FBFAF9" }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: ACCENT }}>AI & Automation</span>
                <span className="text-[10px] uppercase tracking-[0.16em] px-2 py-1 rounded-md" style={{ backgroundColor: "rgba(209,77,87,0.12)", color: ACCENT }}>In development</span>
              </div>
              <h1 className="font-bold mb-6" style={{ fontSize: "clamp(30px, 4.3vw, 50px)", lineHeight: 1.08, letterSpacing: "-0.02em" }} data-testid="hero-headline">
                Automating vendor photography — from <span style={{ color: ACCENT }}>shoot to export.</span>
              </h1>
              <p className="text-base md:text-lg leading-relaxed mb-4" style={{ color: "#5C5650" }}>
                Gray Solutions is the photography and editing vendor for a leading travel-tech platform. We're building an
                automation that turns a slow, manual editing pipeline into a fast, self-serve system — automated image
                processing, consistent renaming, a photographer-and-vendor dashboard, and one-click bulk export.
              </p>
              <p className="text-[13px] mb-8" style={{ color: "#A89E95", fontStyle: "italic" }}>
                Client name withheld until the partnership agreement is finalised.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {["Image Processing", "Auto-Renaming", "Photographer Dashboard", "Vendor Portal", "Bulk Export"].map((t) => (
                  <span key={t} className="px-3 py-1.5 rounded-full text-xs font-medium" style={{ backgroundColor: "rgba(209,77,87,0.10)", color: ACCENT }}>{t}</span>
                ))}
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[14px] font-medium" style={{ backgroundColor: DARK, color: "#FFF" }}>
                Start a project
              </Link>
            </motion.div>

            {/* Pipeline visual (no photo needed) */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-col gap-3">
              {PIPELINE.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="flex items-start gap-4 p-4 rounded-2xl" style={{ backgroundColor: "#FFFFFF", border: "1px solid #EFEAE6", boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}>
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0" style={{ backgroundColor: idx === PIPELINE.length - 1 ? ACCENT : "rgba(209,77,87,0.10)", color: idx === PIPELINE.length - 1 ? "#FFF" : ACCENT }}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono" style={{ color: "#B9AFA6" }}>{String(idx + 1).padStart(2, "0")}</span>
                        <h3 className="font-semibold text-[15px]" style={{ color: DARK }}>{step.title}</h3>
                      </div>
                      <p className="text-[13px] mt-0.5" style={{ color: "#7A7269", lineHeight: 1.5 }}>{step.text}</p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-12 md:py-20" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-[900px] mx-auto px-4 md:px-10">
          <motion.h2 className="text-2xl md:text-3xl font-bold mb-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Overview</motion.h2>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}>
            <p className="text-base md:text-lg leading-relaxed mb-5" style={{ color: "#5C5650" }}>
              A leading travel-tech platform onboards operators across the country, and every vendor needs clean, consistent
              photography of their fleet. As their photography and editing vendor, Gray Solutions handles the shoots and the
              retouching today.
            </p>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: "#5C5650" }}>
              We're now building an automation around that work — so the editing pipeline that's manual and time-intensive
              today becomes a fast, repeatable, self-serve system. Starting with Chennai-based vendor onboarding, where the
              current cost and turnaround per vendor make automation especially valuable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="py-12 md:py-20" style={{ backgroundColor: "#FBFAF9" }}>
        <div className="max-w-[1100px] mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-start">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">The Challenge</h2>
              <p className="text-base leading-relaxed" style={{ color: "#7A7269" }}>
                Doing vendor-onboarding photography by hand doesn't scale — every new operator adds editing hours and cost.
              </p>
            </motion.div>
            <motion.ul className="space-y-3" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}>
              {CHALLENGES.map((c) => (
                <li key={c} className="flex items-start gap-3 p-4 rounded-xl" style={{ backgroundColor: "#FFFFFF", border: "1px solid #EFEAE6" }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: ACCENT }} />
                  <span className="text-[15px]" style={{ color: "#3F3933", fontWeight: 500 }}>{c}</span>
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      {/* Our Solution */}
      <section className="py-12 md:py-20" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-[900px] mx-auto px-4 md:px-10">
          <motion.h2 className="text-2xl md:text-3xl font-bold mb-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Our Solution</motion.h2>
          <motion.p className="text-base md:text-lg leading-relaxed" style={{ color: "#5C5650" }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}>
            An automation that runs the photography pipeline end to end — automated image processing, consistent file
            renaming, a dashboard for both photographers and vendors, and one-click bulk export. Onboarding photography goes
            from hours of manual editing to a near-instant, on-spec, repeatable workflow that scales across cities without
            adding editors.
          </motion.p>
        </div>
      </section>

      {/* What we're building / Deliverables */}
      <section className="py-12 md:py-20" style={{ backgroundColor: "#FBFAF9" }}>
        <div className="max-w-[1000px] mx-auto px-4 md:px-10">
          <motion.h2 className="text-2xl md:text-3xl font-bold mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>What we're building</motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {DELIVERABLES.map((d, idx) => (
              <motion.div key={d} className="flex items-center gap-3 p-4 rounded-xl" style={{ backgroundColor: "#FFFFFF", border: "1px solid #EFEAE6" }} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: idx * 0.04 }}>
                <span className="flex items-center justify-center w-6 h-6 rounded-lg flex-shrink-0" style={{ backgroundColor: "rgba(209,77,87,0.12)", color: ACCENT }}>
                  <Check size={14} strokeWidth={2.6} />
                </span>
                <span className="text-[15px]" style={{ color: "#3F3933", fontWeight: 500 }}>{d}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact band */}
      <section className="py-14 md:py-20" style={{ backgroundColor: ACCENT }}>
        <div className="max-w-[1000px] mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Clock size={28} className="mx-auto mb-4" style={{ color: "rgba(255,255,255,0.85)" }} />
            <p className="font-bold" style={{ color: "#FFFFFF", fontSize: "clamp(22px, 3vw, 34px)", lineHeight: 1.25, letterSpacing: "-0.01em" }}>
              From hours of manual editing per vendor — to a one-click, on-spec set.
            </p>
            <p className="mt-4 text-sm md:text-base" style={{ color: "rgba(255,255,255,0.8)" }}>
              Lower cost and turnaround per onboarding, consistent output every time, and a pipeline that scales city by city.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-14 md:py-24" style={{ backgroundColor: "#FBFAF9" }}>
        <div className="max-w-[800px] mx-auto px-4 md:px-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Have a manual workflow that's begging to be automated?</h2>
            <p className="text-lg mb-8" style={{ color: "#7A7269" }}>
              We build automations and internal tools that cut the repetitive work — and the cost and time that come with it.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-base" style={{ backgroundColor: DARK, color: "#FFFFFF" }}>
              Book a Call
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
