import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import Footer from "@/components/footer";
import SiteNav from "@/components/site-nav";

import brandBoard from "@assets/thottam/thottam-01-brand-board.webp";
import logoSystem from "@assets/thottam/thottam-02-logo-system.webp";
import typographyVisual from "@assets/thottam/thottam-03-typography-visual.webp";
import packagingSystem from "@assets/thottam/thottam-04-packaging-system.webp";
import deliveryKit from "@assets/thottam/thottam-05-delivery-kit.webp";
import mobileAppUi from "@assets/thottam/thottam-06-mobile-app-ui.webp";
import socialKit from "@assets/thottam/thottam-07-social-media-kit.webp";
import stationery from "@assets/thottam/thottam-08-stationery.webp";
import fleetStaff from "@assets/thottam/thottam-09-fleet-staff.webp";
import categoryLabels from "@assets/thottam/thottam-10-category-labels.webp";

const ACCENT = "#2F5A3D"; // thottam botanical green

type AssetCategory = "Brand assets" | "Marketing assets";
type GalleryItem = { src: string; category: AssetCategory; caption: string };

const galleryImages: GalleryItem[] = [
  // Brand
  { src: brandBoard,        category: "Brand assets",     caption: "Brand board — positioning, palette, type, icon set, and visual direction." },
  { src: logoSystem,        category: "Brand assets",     caption: "Logo system — primary, horizontal, stacked, monogram, and clear-space rules." },
  { src: typographyVisual,  category: "Brand assets",     caption: "Typography and visual language — Thottam Serif × Satoshi pairing, patterns, and photography." },
  { src: packagingSystem,   category: "Brand assets",     caption: "Packaging system — produce bags, gift box, mailers, jars, and tote bag." },
  { src: deliveryKit,       category: "Brand assets",     caption: "Delivery kit — insulated bag, packing tape, thank-you card, sticker pack, and crate label." },
  { src: stationery,        category: "Brand assets",     caption: "Stationery and business collateral — card, letterhead, invoice, ID card, and loyalty card." },
  { src: fleetStaff,        category: "Brand assets",     caption: "Fleet and staff branding — scooter, delivery van, polo tee, apron, cap, and courier bag." },
  { src: categoryLabels,    category: "Brand assets",     caption: "Product category labels — fruits, vegetables, eatables, and natural products." },
  // Marketing
  { src: mobileAppUi,       category: "Marketing assets", caption: "Mobile app UI kit — home, categories, product listing, cart, and order tracking screens." },
  { src: socialKit,         category: "Marketing assets", caption: "Social media kit — feed posts, stories, offer banners, and product highlight templates." },
];

const galleryTabs: Array<"All" | AssetCategory> = ["All", "Brand assets", "Marketing assets"];

export default function Thottam() {
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
        backgroundColor: "#FAFAF5",
        color: "#1A1A1A",
        fontFamily: "-apple-system, system-ui, sans-serif",
      }}
    >
      <SiteNav theme="light" />

      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-24" style={{ backgroundColor: "#FAFAF5" }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1
                className="font-bold mb-6"
                style={{ fontSize: "clamp(32px, 4.5vw, 52px)", lineHeight: 1.1, color: "#1A1A1A", letterSpacing: "-0.02em" }}
                data-testid="hero-headline"
              >
                Thottam — <span style={{ color: ACCENT }}>Rooted in nature.</span> Delivered fast.
              </h1>
              <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: "#666666" }}>
                A complete brand identity and product system for a quick-commerce platform delivering fresh fruits,
                vegetables, eatables, and natural products — from the brand mark to the delivery crate.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Brand Identity", "Packaging", "Mobile App UI", "Fleet Branding", "Stationery", "Social Kit"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-xs font-medium"
                    style={{ backgroundColor: "rgba(47,90,61,0.12)", color: ACCENT }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <img src={brandBoard} alt="Thottam brand board" className="w-full rounded-2xl" loading="lazy" decoding="async" />
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
              { title: "Ambition", text: "Build a quick-commerce brand for fresh, natural, and farm-sourced products — one that feels trusted, premium, and honest, without trying to look like every other green-tech grocery app." },
              { title: "Reality Check", text: "The quick-commerce category is loud, neon, and discount-driven. Thottam needed to feel calmer and more credible — like a brand you'd let into your kitchen, not just a delivery tracker on your screen." },
              { title: "What We Shipped", text: "A full brand and product system — identity, packaging, delivery kit, mobile app UI, fleet and staff branding, stationery, social kit, and a category-level labelling system across the product range." },
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
      <section className="py-16 md:py-24" style={{ backgroundColor: "#FAFAF5" }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-10">
          <div className="text-center mb-12">
            <span className="text-sm font-medium tracking-wide mb-3 block" style={{ color: "#666666" }}>
              What We Did
            </span>
            <h2
              className="font-bold"
              style={{ fontSize: "clamp(28px, 4vw, 42px)", lineHeight: 1.15, color: "#1A1A1A", letterSpacing: "-0.02em" }}
            >
              From Brand Foundation to Delivery Crate
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Brand Identity",
              "Logo System",
              "Type System",
              "Color Palette",
              "Icon System",
              "Packaging System",
              "Delivery Kit",
              "Mobile App UI",
              "Fleet Branding",
              "Staff Uniform",
              "Stationery",
              "Social Media Kit",
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

      {/* Logo system banner */}
      <section className="py-8 md:py-12" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-10">
          <motion.img
            src={logoSystem}
            alt="Thottam logo system — primary, horizontal, stacked, monogram"
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
              { num: "1", title: "Calm is a differentiator in quick commerce.", text: "Most grocery apps shout — yellow, red, neon, urgency. We bet that fresh and trusted reads quieter, so Thottam wears botanical green and warm neutrals." },
              { num: "2", title: "Packaging is the trust signal.", text: "For fresh produce, the bag, jar, and crate matter more than the splash screen. The packaging system carries the brand into the customer's kitchen." },
              { num: "3", title: "Fleet branding is paid media.", text: "Every scooter, van, and uniform is a daily impression in the neighbourhood — we treated the vehicle livery as seriously as the home screen." },
              { num: "4", title: "Category labels are micro-brands.", text: "Fruits, vegetables, eatables, and natural products each got their own colour-coded label — same brand, four registers, easy shelf scanning." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="p-8 rounded-2xl"
                style={{ backgroundColor: "#FAFAF5" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <span className="text-4xl font-bold block mb-4" style={{ color: "rgba(47,90,61,0.25)" }}>
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
      <section className="py-12 md:py-28" style={{ backgroundColor: "#FAFAF5" }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: "#1A1A1A" }}>
                The Big Bet
              </h2>
              <p className="text-lg leading-relaxed mb-8" style={{ color: "#666666" }}>
                Build a quick-commerce brand that wins on trust, not on discounts. Make every surface — bag, jar, app, scooter, courier bag — feel like
                the same company that grows on the same farm.
              </p>

              <h3 className="text-xl font-semibold mb-4" style={{ color: "#1A1A1A" }}>
                The Strategy
              </h3>
              <ul className="space-y-3">
                {[
                  "Anchor the identity in nature — botanical green, blush clay, warm neutrals — instead of category-default urgency colours.",
                  "Pair a soft serif (Thottam Serif) with a clean sans (Satoshi) for a friendly, editorial tone.",
                  "Design the mobile app and the packaging from the same type and colour system so the digital experience and the physical bag feel like one brand.",
                  "Build a category labelling system so the product range can grow without breaking the look.",
                  "Treat the delivery fleet and uniforms as a core part of the brand — not afterthought ops kit.",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-base" style={{ color: "#666666" }}>
                    <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: ACCENT }} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
              <img src={packagingSystem} alt="Thottam packaging system" className="w-full rounded-2xl" loading="lazy" decoding="async" />
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
                  "A full brand and product system ready for launch in one operating city",
                  "Mobile app UI and packaging built from a single visual language",
                  "Delivery fleet and uniforms that double as daily neighbourhood media",
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
                  "↑ Repeat order rate vs. category benchmark",
                  "↑ Organic referral and word-of-mouth share",
                  "↑ Brand search volume on \"Thottam\"",
                  "↓ Reliance on discount-led acquisition",
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
              "Fresh · Pure · Trusted · Fast."
            </p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
              The four-word brand promise we built the entire system around.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery — Brand assets / Marketing assets */}
      <section className="py-12 md:py-28" style={{ backgroundColor: "#FAFAF5" }}>
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
                      backgroundColor: item.category === "Brand assets" ? "rgba(47,90,61,0.12)" : "rgba(26,26,26,0.06)",
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

      {/* Full-width fleet image */}
      <section className="py-0" style={{ backgroundColor: "#FFFFFF" }}>
        <motion.img
          src={fleetStaff}
          alt="Thottam fleet and staff branding"
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
      <section className="py-12 md:py-28" style={{ backgroundColor: "#FAFAF5" }}>
        <div className="max-w-[800px] mx-auto px-4 md:px-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: "#1A1A1A" }}>
              Launching a consumer or quick-commerce brand?
            </h2>
            <p className="text-lg mb-8" style={{ color: "#666666" }}>
              We build identity and product systems that work from the bag in the customer's hand to the home screen on their phone.
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
