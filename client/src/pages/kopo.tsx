import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import Footer from "@/components/footer";
import SiteNav from "@/components/site-nav";

import brandIdentity from "@assets/kopo/kopo-01-brand-identity.webp";
import packagingKit from "@assets/kopo/kopo-02-packaging-kit.webp";
import garmentTrims from "@assets/kopo/kopo-03-garment-trims.webp";
import capsuleCollection from "@assets/kopo/kopo-04-capsule-collection.webp";
import womenswearCapsule from "@assets/kopo/kopo-05-womenswear-capsule.webp";
import campaignHero from "@assets/kopo/kopo-06-campaign-hero.webp";
import socialKit from "@assets/kopo/kopo-07-social-kit.webp";
import ecommerceApp from "@assets/kopo/kopo-08-ecommerce-app.webp";
import storefront from "@assets/kopo/kopo-09-storefront.webp";
import brandExpression from "@assets/kopo/kopo-10-brand-expression.webp";

const ACCENT = "#1A1A1A"; // KOPO charcoal — minimal monochrome

type AssetCategory = "Brand assets" | "Marketing assets" | "Software & dev";
type GalleryItem = { src: string; category: AssetCategory; caption: string };

const galleryImages: GalleryItem[] = [
  // Brand
  { src: brandIdentity,    category: "Brand assets",     caption: "Brand identity — primary mark, alternate lockups, monochrome usage, palette, type, and mood." },
  { src: packagingKit,     category: "Brand assets",     caption: "Packaging kit — shopping bag, tissue paper, stickers, thank-you cards, dust bag, and shipping mailer." },
  { src: garmentTrims,     category: "Brand assets",     caption: "Garment trims & label system — woven neck labels, care labels, hang tags, leather patches, zipper pulls, buttons." },
  { src: storefront,       category: "Brand assets",     caption: "Retail storefront — signage, interior fit-out, and brand-led shop window." },
  { src: brandExpression,  category: "Brand assets",     caption: "Brand expression — \"Designed to endure. Built for every day.\" — mood film and editorial direction." },
  // Marketing
  { src: capsuleCollection, category: "Marketing assets", caption: "Capsule collection lookup — Spring/Summer 2024 product showcase across silhouettes." },
  { src: womenswearCapsule, category: "Marketing assets", caption: "Unisex capsule — \"Quietly bold essentials, cut for everyone.\" editorial layout." },
  { src: campaignHero,      category: "Marketing assets", caption: "Campaign hero — minimal, modern, timeless, unisex, everyday — the brand sentence." },
  { src: socialKit,         category: "Marketing assets", caption: "Social media brand kit — feed posts, story templates, sale graphics, and product features." },
  // Software & dev
  { src: ecommerceApp,      category: "Software & dev",  caption: "E-commerce site + mobile — PLP, PDP, cart, account, and the storefront in your pocket." },
];

const galleryTabs: Array<"All" | AssetCategory> = ["All", "Brand assets", "Marketing assets", "Software & dev"];

export default function Kopo() {
  const [, setIsScrolled] = useState(false);
  const [activeGalleryTab, setActiveGalleryTab] = useState<"All" | AssetCategory>("All");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 150);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredGallery =
    activeGalleryTab === "All" ? galleryImages : galleryImages.filter((img) => img.category === activeGalleryTab);

  const chipStyle = (cat: AssetCategory) => {
    if (cat === "Brand assets") return { bg: "rgba(26,26,26,0.08)", fg: "#1A1A1A" };
    if (cat === "Marketing assets") return { bg: "rgba(120,120,120,0.12)", fg: "#555555" };
    return { bg: "rgba(180,180,180,0.18)", fg: "#333333" };
  };

  return (
    <div
      className="min-h-screen w-full font-sans overflow-x-hidden"
      style={{
        backgroundColor: "#F4F1EC",
        color: "#1A1A1A",
        fontFamily: "-apple-system, system-ui, sans-serif",
      }}
    >
      <SiteNav theme="light" />

      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-24" style={{ backgroundColor: "#F4F1EC" }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1
                className="font-bold mb-6"
                style={{ fontSize: "clamp(32px, 4.5vw, 52px)", lineHeight: 1.05, color: "#1A1A1A", letterSpacing: "-0.03em" }}
                data-testid="hero-headline"
              >
                KOPO — Designed to endure. <span style={{ opacity: 0.55 }}>Built for every day.</span>
              </h1>
              <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: "#555555" }}>
                A premium unisex apparel label from Salem — identity, packaging, garment trims, social, and a full e-commerce
                storefront — built around one quiet promise: quietly bold essentials, cut for everyone, made to last.
              </p>
              <div className="mb-7">
                <a
                  href="https://kopo.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 pl-5 pr-6 py-4 rounded-full text-base font-bold transition-all hover:-translate-y-0.5"
                  style={{ backgroundColor: "#1A1A1A", color: "#FFFFFF", boxShadow: "0 16px 40px -10px rgba(26,26,26,0.55)" }}
                  data-testid="kopo-live-link"
                >
                  <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full rounded-full animate-ping" style={{ backgroundColor: "#FFFFFF", opacity: 0.6 }} />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: "#FFFFFF" }} />
                  </span>
                  Visit the live store
                  <svg width="17" height="17" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"><path d="M3 11L11 3M11 3H5M11 3V9" /></svg>
                </a>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Brand Identity", "Packaging", "Garment Trims", "Campaign", "Social Kit", "E-commerce", "Live & Deployed"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-xs font-medium"
                    style={{ backgroundColor: "rgba(26,26,26,0.08)", color: ACCENT }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <img src={campaignHero} alt="KOPO campaign — Designed to endure. Built for every day." className="w-full rounded-2xl" loading="lazy" decoding="async" />
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
              { title: "Ambition", text: "Build a premium unisex label that competes on quality and quietness — not on color, noise, or seasonal hype. Clothes without a gender line, worn for how they make you feel, made by people who fall in love with fabric first." },
              { title: "Reality Check", text: "Minimal fashion is a crowded category. Every brand uses serifs, beige palettes, and lowercase wordmarks. To be remembered, KOPO needed sharper conviction across every surface — and a real, shoppable store, not just a nice logo on Instagram." },
              { title: "What We Shipped", text: "A complete brand and product system — plus a live storefront. Identity, packaging, garment trims, the Drop 01 capsule campaign, social kit, and a fully shoppable e-commerce site with cart, checkout, and admin — all built off one charcoal-on-stone palette and one editorial type system." },
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
      <section className="py-16 md:py-24" style={{ backgroundColor: "#F4F1EC" }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-10">
          <div className="text-center mb-12">
            <span className="text-sm font-medium tracking-wide mb-3 block" style={{ color: "#666666" }}>
              What We Did
            </span>
            <h2
              className="font-bold"
              style={{ fontSize: "clamp(28px, 4vw, 42px)", lineHeight: 1.15, color: "#1A1A1A", letterSpacing: "-0.02em" }}
            >
              Brand, Marketing, and the Storefront in Your Pocket
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Brand Identity",
              "Logo System",
              "Type & Color",
              "Packaging System",
              "Garment Trims",
              "Capsule Campaign",
              "Social Media Kit",
              "Editorial Direction",
              "E-commerce Site",
              "Mobile Storefront",
              "Storefront Design",
              "Brand Application",
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

      {/* Brand identity banner */}
      <section className="py-8 md:py-12" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-10">
          <motion.img
            src={brandIdentity}
            alt="KOPO brand identity — logo, lockups, palette, typography"
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
              { num: "1", title: "Quietness is conviction.", text: "In a category that shouts, a brand that stays calm signals confidence. KOPO never raises its voice — and that's the whole point." },
              { num: "2", title: "Trims tell the truth.", text: "Customers feel a brand long before they read it — at the neck label, the hang tag, the inside seam. We treated trims as primary surfaces, not afterthoughts." },
              { num: "3", title: "One palette, every surface.", text: "Charcoal on stone runs through the wordmark, the bag, the shopfront, the PDP. That single restraint is what makes the brand recognisable from across the street." },
              { num: "4", title: "Storefront and screen are the same room.", text: "The e-commerce experience and the physical store were designed together — same type, same rhythm, same calm — so customers feel one brand, not two channels." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="p-8 rounded-2xl"
                style={{ backgroundColor: "#F4F1EC" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <span className="text-4xl font-bold block mb-4" style={{ color: "rgba(26,26,26,0.18)" }}>
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
      <section className="py-12 md:py-28" style={{ backgroundColor: "#F4F1EC" }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: "#1A1A1A" }}>
                The Big Bet
              </h2>
              <p className="text-lg leading-relaxed mb-8" style={{ color: "#555555" }}>
                Build a label that wins on restraint — where every surface, from the neck label to the storefront to the mobile cart,
                says the same calm sentence: <em>designed to endure, built for every day.</em>
              </p>

              <h3 className="text-xl font-semibold mb-4" style={{ color: "#1A1A1A" }}>
                The Strategy
              </h3>
              <ul className="space-y-3">
                {[
                  "Anchor the identity in a charcoal-on-stone palette — no accents, no seasonal shifts, no neon.",
                  "Use a geometric sans for the wordmark; pair it with a clean editorial sans for body and product detail.",
                  "Design the e-commerce site and the storefront from the same visual rules — the screen and the room match.",
                  "Treat trims, tags, and packaging as on-body brand — not afterthought accessories.",
                  "Launch with one capsule and one brand sentence, not a noisy seasonal blitz.",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-base" style={{ color: "#555555" }}>
                    <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: ACCENT }} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
              <img src={ecommerceApp} alt="KOPO e-commerce site and mobile storefront" className="w-full rounded-2xl" loading="lazy" decoding="async" />
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
                  "A full brand, marketing, and storefront system ready for launch",
                  "E-commerce and storefront designed from the same rules — one brand, two surfaces",
                  "Packaging, trims, and tags that feel premium without shouting",
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
                  "↑ Repeat purchase rate from capsule one buyers",
                  "↑ Brand search volume on \"KOPO\"",
                  "↑ Wear-photo UGC from customers in everyday life",
                  "↓ Discount-led acquisition over time",
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
            style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xl md:text-2xl italic mb-2" style={{ color: "#FFFFFF" }}>
              "Designed to endure. Built for every day."
            </p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
              The KOPO brand sentence — across the bag, the tag, the screen, and the shopfront.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery — Brand / Marketing / Software */}
      <section className="py-12 md:py-28" style={{ backgroundColor: "#F4F1EC" }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: "#1A1A1A" }}>
              The Work — Brand, Marketing & Product
            </h2>
            <p className="text-lg" style={{ color: "#666666" }}>
              Filter between the brand foundation, the marketing system, and the digital product.
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
            {filteredGallery.map((item, idx) => {
              const cs = chipStyle(item.category);
              return (
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
                      style={{ backgroundColor: cs.bg, color: cs.fg }}
                    >
                      {item.category}
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: "#666666" }}>
                    {item.caption}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Full-width storefront image */}
      <section className="py-0" style={{ backgroundColor: "#FFFFFF" }}>
        <motion.img
          src={storefront}
          alt="KOPO retail storefront"
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
      <section className="py-12 md:py-28" style={{ backgroundColor: "#F4F1EC" }}>
        <div className="max-w-[800px] mx-auto px-4 md:px-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: "#1A1A1A" }}>
              Building a label that should be felt more than heard?
            </h2>
            <p className="text-lg mb-8" style={{ color: "#555555" }}>
              We design brand, marketing, and product systems where every surface says the same calm sentence.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://kopo.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-base transition-all hover:-translate-y-0.5"
                style={{ backgroundColor: ACCENT, color: "#FFFFFF", boxShadow: "0 16px 40px -10px rgba(26,26,26,0.55)" }}
                data-testid="kopo-live-link-bottom"
              >
                Visit the live store
                <svg width="17" height="17" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"><path d="M3 11L11 3M11 3H5M11 3V9" /></svg>
              </a>
              <Link href="/contact">
                <button
                  className="px-8 py-4 rounded-full font-medium text-base transition-all hover:opacity-90"
                  style={{ backgroundColor: "transparent", color: ACCENT, border: `1px solid rgba(26,26,26,0.25)` }}
                >
                  Book a Call
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
