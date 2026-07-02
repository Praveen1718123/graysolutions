import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import Footer from "@/components/footer";
import SiteNav from "@/components/site-nav";

import brandBoard from "@assets/krft/krft-01-brand-board.webp";
import logoSystem from "@assets/krft/krft-02-logo-system.webp";
import colorTypography from "@assets/krft/krft-03-color-typography.webp";
import patternGraphic from "@assets/krft/krft-04-pattern-graphic-language.webp";
import packagingUnboxing from "@assets/krft/krft-05-packaging-unboxing.webp";
import fashionTrims from "@assets/krft/krft-06-fashion-trims.webp";
import socialKit from "@assets/krft/krft-07-social-media-kit.webp";
import ecommerceSite from "@assets/krft/krft-08-ecommerce-site.webp";
import retailEnvironment from "@assets/krft/krft-09-retail-environment.webp";
import campaignLookbook from "@assets/krft/krft-10-campaign-lookbook.webp";

const ACCENT = "#E5247B"; // krft pink

type AssetCategory = "Brand assets" | "Marketing assets";
type GalleryItem = { src: string; category: AssetCategory; caption: string };

const galleryImages: GalleryItem[] = [
  // Brand
  { src: brandBoard,         category: "Brand assets",     caption: "Brand board — positioning, palette, personality, and visual direction." },
  { src: logoSystem,         category: "Brand assets",     caption: "Logo system — primary, secondary lockups, monogram, and minimum-size rules." },
  { src: colorTypography,    category: "Brand assets",     caption: "Color system + Satoshi / Editorial New typography hierarchy." },
  { src: patternGraphic,     category: "Brand assets",     caption: "Pattern library and graphic language — repeats, motifs, and brand expression." },
  { src: packagingUnboxing,  category: "Brand assets",     caption: "Packaging system — shopping bags, gift box, mailers, tissue paper, and brand touchpoints." },
  { src: fashionTrims,       category: "Brand assets",     caption: "Apparel identity — woven labels, neck label, hang tags, size tabs, branded buttons." },
  { src: retailEnvironment,  category: "Brand assets",     caption: "Retail environment — window display, in-store walls, fitting rooms, and wayfinding." },
  // Marketing
  { src: socialKit,          category: "Marketing assets", caption: "Social media kit — Instagram posts, stories, reels covers, launch and sale templates." },
  { src: ecommerceSite,      category: "Marketing assets", caption: "E-commerce experience — PLP, PDP, and editorial-driven storefront design." },
  { src: campaignLookbook,   category: "Marketing assets", caption: "Spring/Summer campaign — \"Bold by Design, Worn Everyday\" lookbook spreads." },
];

const galleryTabs: Array<"All" | AssetCategory> = ["All", "Brand assets", "Marketing assets"];

export default function Krft() {
  const [, setIsScrolled] = useState(false);
  const [activeGalleryTab, setActiveGalleryTab] = useState<"All" | AssetCategory>("All");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 150);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredGallery =
    activeGalleryTab === "All" ? galleryImages : galleryImages.filter((img) => img.category === activeGalleryTab);

  return (
    <div
      className="min-h-screen w-full font-sans overflow-x-hidden"
      style={{
        backgroundColor: "#FAFAFA",
        color: "#1A1A1A",
        fontFamily: "-apple-system, system-ui, sans-serif",
      }}
    >
      <SiteNav theme="light" />

      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-24" style={{ backgroundColor: "#FAFAFA" }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1
                className="font-bold mb-6"
                style={{ fontSize: "clamp(32px, 4.5vw, 52px)", lineHeight: 1.1, color: "#1A1A1A", letterSpacing: "-0.02em" }}
                data-testid="hero-headline"
              >
                Krft — Modern Womenswear, <span style={{ color: ACCENT }}>Bold</span> Everyday.
              </h1>
              <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: "#666666" }}>
                A full womenswear brand identity — wordmark, packaging, retail environment, and a season-one campaign —
                built so the brand feels confident in a boutique, on a shopping bag, and inside a phone screen.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Brand Identity", "Packaging", "Retail Environment", "Social Kit", "E-commerce", "Campaign"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-xs font-medium"
                    style={{ backgroundColor: "rgba(229,36,123,0.1)", color: ACCENT }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <img src={brandBoard} alt="Krft brand board" className="w-full rounded-2xl" loading="lazy" decoding="async" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Brief */}
      <section className="py-12 md:py-28" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-10">
          <motion.h2
            className="text-2xl md:text-3xl font-bold mb-12"
            style={{ color: "#1A1A1A" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Quick Brief
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {[
              { title: "Ambition", text: "Build a womenswear brand that feels modern, feminine, elevated, and confident — designed for women who don't dress for occasions, they dress for themselves." },
              { title: "Reality Check", text: "Most fashion D2C brands look interchangeable: same beige palette, same minimal serifs, same Instagram aesthetic. Krft needed an identity with enough conviction to stand out in a saturated category." },
              { title: "What We Shipped", text: "A complete brand system — wordmark, monogram, type system, packaging, fashion trims, retail environment, social kit, e-commerce design, and a season-one campaign — all wired through one visual language." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <h3 className="text-lg font-semibold mb-3" style={{ color: "#1A1A1A" }}>
                  {item.title}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: "#666666" }}>
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Did */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#FAFAFA" }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-10">
          <div className="text-center mb-12">
            <span className="text-sm font-medium tracking-wide mb-3 block" style={{ color: "#666666" }}>
              What We Did
            </span>
            <h2
              className="font-bold"
              style={{ fontSize: "clamp(28px, 4vw, 42px)", lineHeight: 1.15, color: "#1A1A1A", letterSpacing: "-0.02em" }}
            >
              From Brand Foundation to In-Store Reality
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Brand Identity",
              "Logo & Monogram",
              "Type System",
              "Color & Palette",
              "Pattern Library",
              "Packaging System",
              "Apparel Trims & Labels",
              "Social Media Kit",
              "E-commerce Design",
              "Retail Environment",
              "Wayfinding & Signage",
              "Campaign Lookbook",
            ].map((service, idx) => (
              <motion.div
                key={service}
                className="p-5 rounded-xl text-center"
                style={{ backgroundColor: "#FFFFFF" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
              >
                <span className="text-sm font-medium" style={{ color: "#1A1A1A" }}>
                  {service}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guidelines Banner */}
      <section className="py-8 md:py-12" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-10">
          <motion.img
            src={logoSystem}
            alt="Krft logo system — primary, secondary, monogram, color variants"
            className="w-full rounded-2xl"
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </section>

      {/* Insights */}
      <section className="py-12 md:py-28" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-10">
          <motion.h2
            className="text-2xl md:text-3xl font-bold mb-12"
            style={{ color: "#1A1A1A" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Insights
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {[
              { num: "1", title: "Color is the fastest brand asset.", text: "Krft pink does more recall work than any logo lockup. Customers remember the color before they remember the name." },
              { num: "2", title: "Packaging is the second product.", text: "For D2C apparel, the unboxing IS the brand experience. We treated mailers, tissue paper, and tags as primary surfaces — not afterthoughts." },
              { num: "3", title: "A wordmark needs a monogram.", text: "Full lockup for hero moments, monogram for tags, buttons, social avatars, and small surfaces. One identity, two registers." },
              { num: "4", title: "Retail and digital must speak the same sentence.", text: "We designed window displays, fitting rooms, and the e-commerce PDP from the same type and color system — so the boutique and the iPhone feel like one place." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="p-8 rounded-2xl"
                style={{ backgroundColor: "#FAFAFA" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <span className="text-4xl font-bold block mb-4" style={{ color: "rgba(229,36,123,0.25)" }}>
                  {item.num}
                </span>
                <h3 className="text-lg font-semibold mb-3" style={{ color: "#1A1A1A" }}>
                  {item.title}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: "#666666" }}>
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Big Bet */}
      <section className="py-12 md:py-28" style={{ backgroundColor: "#FAFAFA" }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: "#1A1A1A" }}>
                The Big Bet
              </h2>
              <p className="text-lg leading-relaxed mb-8" style={{ color: "#666666" }}>
                Build a womenswear brand that wins on conviction — not on price, not on beige minimalism, not on celebrity. A brand where every surface,
                from the swing tag to the shopfront, says the same thing.
              </p>

              <h3 className="text-xl font-semibold mb-4" style={{ color: "#1A1A1A" }}>
                The Strategy
              </h3>
              <ul className="space-y-3">
                {[
                  "Anchor the identity on one signature color — Krft pink — that travels across every touchpoint.",
                  "Pair a confident serif (Editorial New) with a clean sans (Satoshi) for a fashion-editorial feel.",
                  "Treat packaging as a brand moment, not a cost line.",
                  "Design the retail environment and e-commerce PDP from the same visual rules.",
                  "Launch with one strong seasonal campaign — \"Bold by Design, Worn Everyday\" — so the brand has a sentence, not just a logo.",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-base" style={{ color: "#666666" }}>
                    <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: ACCENT }} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
              <img src={packagingUnboxing} alt="Krft packaging and unboxing system" className="w-full rounded-2xl" loading="lazy" decoding="async" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-12 md:py-28" style={{ backgroundColor: ACCENT }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-10">
          <motion.h2
            className="text-2xl md:text-3xl font-bold mb-12"
            style={{ color: "#FFFFFF" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Impact
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-10 md:mb-16">
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: "rgba(255,255,255,0.7)" }}>
                Impact delivered (now)
              </h3>
              <ul className="space-y-3">
                {[
                  "A complete brand system ready for boutique launch, e-commerce, and wholesale",
                  "Packaging that customers photograph and post without being asked",
                  "A signature pink that does brand-recall work across every surface",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-base" style={{ color: "#FFFFFF" }}>
                    <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#FFFFFF" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: "rgba(255,255,255,0.7)" }}>
                Impact to measure (later)
              </h3>
              <ul className="space-y-3">
                {[
                  "↑ Organic UGC from packaging and store visits",
                  "↑ Repeat purchase rate (brand-led, not discount-led)",
                  "↑ Brand search volume on \"krft.\"",
                  "↓ CAC over time as recognition compounds",
                ].map((item, idx) => (
                  <li key={idx} className="text-base" style={{ color: "rgba(255,255,255,0.9)" }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <motion.div
            className="p-8 rounded-2xl text-center"
            style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xl md:text-2xl italic mb-2" style={{ color: "#FFFFFF" }}>
              "Bold by design. Worn everyday."
            </p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
              The brand sentence we built the entire system around.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery — Brand assets / Marketing assets */}
      <section className="py-12 md:py-28" style={{ backgroundColor: "#FAFAFA" }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: "#1A1A1A" }}>
              The Work — Brand & Marketing Assets
            </h2>
            <p className="text-lg" style={{ color: "#666666" }}>
              Filter between the brand foundation and the marketing system built on top of it.
            </p>
          </motion.div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {galleryTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveGalleryTab(tab)}
                className="px-5 py-2.5 rounded-full text-sm font-medium transition-all"
                style={{
                  backgroundColor: activeGalleryTab === tab ? ACCENT : "transparent",
                  color: activeGalleryTab === tab ? "#FFFFFF" : "#666666",
                  border: activeGalleryTab === tab ? "none" : "1px solid #D4D4D4",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Gallery grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {filteredGallery.map((item, idx) => (
              <motion.div
                key={`${item.src}-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <img src={item.src} alt={item.caption} className="w-full rounded-2xl mb-3" loading="lazy" decoding="async" />
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wide"
                    style={{
                      backgroundColor: item.category === "Brand assets" ? "rgba(229,36,123,0.1)" : "rgba(26,26,26,0.06)",
                      color: item.category === "Brand assets" ? ACCENT : "#1A1A1A",
                    }}
                  >
                    {item.category}
                  </span>
                </div>
                <p className="text-sm" style={{ color: "#666666" }}>
                  {item.caption}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-width campaign image */}
      <section className="py-0" style={{ backgroundColor: "#FFFFFF" }}>
        <motion.img
          src={campaignLookbook}
          alt="Krft Spring/Summer campaign lookbook spread"
          className="w-full"
          loading="lazy"
          decoding="async"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        />
      </section>

      {/* Closing CTA */}
      <section className="py-12 md:py-28" style={{ backgroundColor: "#FAFAFA" }}>
        <div className="max-w-[800px] mx-auto px-4 md:px-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: "#1A1A1A" }}>
              Launching a fashion or D2C brand?
            </h2>
            <p className="text-lg mb-8" style={{ color: "#666666" }}>
              We build identity systems that work from the swing tag to the storefront — and from Instagram to the shopping bag.
            </p>
            <Link href="/contact">
              <button
                className="px-8 py-4 rounded-full font-medium text-base transition-all hover:opacity-90"
                style={{ backgroundColor: ACCENT, color: "#FFFFFF" }}
              >
                Book a Call
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
