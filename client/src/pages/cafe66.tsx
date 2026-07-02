import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Instagram, ArrowUpRight, Check } from "lucide-react";
import Footer from "@/components/footer";
import SiteNav from "@/components/site-nav";
import { ElfsightInstagram } from "@/components/instagram-embed";
import signage from "@assets/cafe66-signage-2026.webp";

const ACCENT = "#9C4A2E"; // Café 66 terracotta
const CREAM = "#F4EADB";
const IG_PROFILE = "https://www.instagram.com/welcome_to_cafe_66";

// Elfsight Instagram Feed widget for @welcome_to_cafe_66
const ELFSIGHT_APP = "elfsight-app-08a017f5-9672-4826-8d5b-a805b20aa442";

const STATS = [
  { value: "8", label: "Short-form videos / month" },
  { value: "Monthly", label: "On-location shoots + planning" },
  { value: "Reels · Posters · Grid", label: "Every Instagram format" },
  { value: "Ongoing", label: "Creative partnership" },
];

const CHALLENGES = [
  "Build better visual consistency",
  "Showcase food and cafe ambience clearly",
  "Create more engaging Instagram reels",
  "Promote offers and menu items",
  "Improve local discovery and brand recall",
  "Make the cafe look active and trustworthy online",
];

const SCOPE = [
  "Creative direction",
  "Monthly video ad shoots",
  "8 short-form videos / month",
  "Instagram reels",
  "Food & cafe promotion creatives",
  "Campaign posters",
  "Grid creatives",
  "Offer-based content",
  "Social media content planning",
  "Local audience positioning",
];

const DELIVERABLES = [
  "8 videos per month",
  "Creative video shoot planning",
  "Food-focused reels",
  "Promotional posters",
  "Instagram grid creatives",
  "Campaign-based content",
  "Social media content direction",
  "Dynamic Instagram feed integration",
];

export default function Cafe66() {
  const [, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 150);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="min-h-screen w-full font-sans overflow-x-hidden"
      style={{ backgroundColor: "#FBF7F1", color: "#1A1A1A", fontFamily: "-apple-system, system-ui, sans-serif" }}
    >
      <SiteNav theme="light" />

      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-24" style={{ backgroundColor: "#FBF7F1" }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-block mb-4 text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
                Creative production · Social branding
              </span>
              <h1
                className="font-bold mb-6"
                style={{ fontSize: "clamp(30px, 4.3vw, 50px)", lineHeight: 1.08, color: "#1A1A1A", letterSpacing: "-0.02em" }}
                data-testid="hero-headline"
              >
                Monthly video ads & Instagram brand building for <span style={{ color: ACCENT }}>Café 66.</span>
              </h1>
              <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: "#5C534B" }}>
                An ongoing creative production and social media partnership — monthly video ad shoots, food-focused reels,
                promotional creatives, and Instagram content direction that make the cafe more visible, consistent, and
                engaging online.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={IG_PROFILE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[14px] font-medium transition-opacity hover:opacity-90"
                  style={{ backgroundColor: ACCENT, color: "#FFF" }}
                >
                  <Instagram size={16} /> Follow on Instagram
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[14px] font-medium"
                  style={{ backgroundColor: "#FFF", color: "#1A1A1A", border: "1px solid #E3D8C7" }}
                >
                  Start a project
                </Link>
              </div>
              <div className="flex flex-wrap gap-2 mt-6">
                {["Creative Direction", "Video Ad Shoots", "Instagram Reels", "Campaign Creatives", "Content Planning"].map((t) => (
                  <span key={t} className="px-3 py-1.5 rounded-full text-xs font-medium" style={{ backgroundColor: "rgba(156,74,46,0.10)", color: ACCENT }}>
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <img src={signage} alt="Café 66 storefront signage" className="w-full rounded-2xl" loading="eager" decoding="async" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-12 md:py-24" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-[900px] mx-auto px-4 md:px-10">
          <motion.h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: "#1A1A1A" }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Overview
          </motion.h2>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}>
            <p className="text-base md:text-lg leading-relaxed mb-5" style={{ color: "#5C534B" }}>
              Café 66 needed a stronger Instagram presence that could showcase its food, cafe vibe, offers, and customer
              experience in a more consistent and professional way.
            </p>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: "#5C534B" }}>
              Gray Solutions partnered with Café 66 to handle monthly creative production — video ad shoots, reels,
              campaign creatives, and social media content planning — making the brand look active, appealing, and easier
              for local customers to discover online.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats band */}
      <section className="py-12 md:py-16" style={{ backgroundColor: ACCENT }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {STATS.map((s, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.06 }}>
                <div className="font-bold" style={{ color: "#FFFFFF", fontSize: "clamp(20px, 2.2vw, 30px)", lineHeight: 1.1, letterSpacing: "-0.01em" }}>
                  {s.value}
                </div>
                <div className="mt-2 text-[12px] md:text-[13px]" style={{ color: "rgba(244,234,219,0.82)" }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="py-12 md:py-24" style={{ backgroundColor: "#FBF7F1" }}>
        <div className="max-w-[1100px] mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-start">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "#1A1A1A" }}>The Challenge</h2>
              <p className="text-base leading-relaxed" style={{ color: "#6B6258" }}>
                For a cafe brand, random food posts are not enough. Café 66 needed content that could actually move the needle.
              </p>
            </motion.div>
            <motion.ul className="space-y-3" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}>
              {CHALLENGES.map((c) => (
                <li key={c} className="flex items-start gap-3 p-4 rounded-xl" style={{ backgroundColor: "#FFFFFF", border: "1px solid #EFE6D7" }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: ACCENT }} />
                  <span className="text-[15px]" style={{ color: "#3F3933", fontWeight: 500 }}>{c}</span>
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      {/* Our Solution */}
      <section className="py-12 md:py-24" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-[900px] mx-auto px-4 md:px-10">
          <motion.h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: "#1A1A1A" }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Our Solution
          </motion.h2>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}>
            <p className="text-base md:text-lg leading-relaxed mb-5" style={{ color: "#5C534B" }}>
              Gray Solutions built a monthly creative production workflow for Café 66, focused on short-form video, food
              promotion, and Instagram-first brand presentation.
            </p>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: "#5C534B" }}>
              We support the brand with planned video shoots, reel concepts, campaign creatives, post designs, and content
              direction that keep the Instagram page active and visually consistent — every single month.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Scope + Deliverables */}
      <section className="py-12 md:py-24" style={{ backgroundColor: "#FBF7F1" }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Scope */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: "#1A1A1A" }}>Scope of Work</h2>
              <div className="flex flex-wrap gap-2">
                {SCOPE.map((s) => (
                  <span key={s} className="px-3.5 py-2 rounded-full text-[13px] font-medium" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8DCC9", color: "#3F3933" }}>
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
            {/* Deliverables */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}>
              <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: "#1A1A1A" }}>Deliverables</h2>
              <ul className="space-y-2.5">
                {DELIVERABLES.map((d) => (
                  <li key={d} className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-lg flex-shrink-0" style={{ backgroundColor: "rgba(156,74,46,0.12)", color: ACCENT }}>
                      <Check size={14} strokeWidth={2.6} />
                    </span>
                    <span className="text-[15px]" style={{ color: "#3F3933", fontWeight: 500 }}>{d}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Creative output / Instagram feed */}
      <section className="py-14 md:py-24" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-10">
          <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-flex items-center gap-2 text-sm font-medium tracking-wide mb-3" style={{ color: ACCENT }}>
              <Instagram size={16} /> Creative output, live
            </span>
            <h2 className="font-bold" style={{ fontSize: "clamp(26px, 4vw, 40px)", lineHeight: 1.15, color: "#1A1A1A", letterSpacing: "-0.02em" }}>
              The work, straight from the feed.
            </h2>
            <p className="mt-3 text-base" style={{ color: "#6B6258" }}>
              Reels, food promos, and campaign creatives — published monthly to <span style={{ color: ACCENT, fontWeight: 600 }}>@welcome_to_cafe_66</span>.
            </p>
          </motion.div>

          {/* Live Instagram feed (Elfsight) — auto-updates from @welcome_to_cafe_66 */}
          <ElfsightInstagram appClass={ELFSIGHT_APP} />

          <div className="flex justify-center mt-8">
            <a
              href={IG_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-[15px] font-medium transition-opacity hover:opacity-90"
              style={{ backgroundColor: ACCENT, color: "#FFF" }}
            >
              <Instagram size={18} /> View Café 66 on Instagram <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-14 md:py-24" style={{ backgroundColor: "#FBF7F1" }}>
        <div className="max-w-[800px] mx-auto px-4 md:px-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: "#1A1A1A" }}>
              Want a feed that keeps your brand active every month?
            </h2>
            <p className="text-lg mb-8" style={{ color: "#6B6258" }}>
              We run monthly creative production — video ads, reels, and campaign creatives — that keep local brands visible and growing.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-base transition-opacity hover:opacity-90" style={{ backgroundColor: ACCENT, color: "#FFFFFF" }}>
              Book a Call
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
