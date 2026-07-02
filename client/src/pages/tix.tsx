import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Footer from "@/components/footer";
import heroImage from "@assets/Free_iPhone_16_Pro_PSD_Mockup_Tix_1766597838175.webp";
import deckImage from "@assets/Tix_Deck-10_1766597838176.webp";
import guidelinesImage from "@assets/Tix_Guidelines-05_1766597838176.webp";
import arrowImage from "@assets/Tix_Guidelines-06_1766597838176.webp";
import appIconImage from "@assets/Tix_Guidelines-07_1766597838176.webp";
import moviePosterImage from "@assets/Tix_Guidelines-08_1766597838176.webp";
import bagImage from "@assets/Tix_Guidelines-09_1766597838176.webp";
import mobileHandImage from "@assets/Tix_Guidelines-10_1766597838176.webp";
// 2026 TIX brand + product system (10 hero screens)
import tixBrandSystem from "@assets/tix-2026/tix-01-brand-system.webp";
import tixLogoSystem from "@assets/tix-2026/tix-02-logo-system.webp";
import tixVisualLanguage from "@assets/tix-2026/tix-03-visual-language.webp";
import tixUiKit from "@assets/tix-2026/tix-04-ui-kit.webp";
import tixCoreAppScreens from "@assets/tix-2026/tix-05-core-app-screens.webp";
import tixBookingJourney from "@assets/tix-2026/tix-06-booking-journey.webp";
import tixTicketsWallet from "@assets/tix-2026/tix-07-tickets-wallet.webp";
import tixWebDesktop from "@assets/tix-2026/tix-08-web-desktop.webp";
import tixCampaignKit from "@assets/tix-2026/tix-09-campaign-kit.webp";
import tixMockupKit from "@assets/tix-2026/tix-10-mockup-kit.webp";
import SiteNav from "@/components/site-nav";

export default function Tix() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeGalleryTab, setActiveGalleryTab] = useState("All");
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const galleryTabs = ["All", "Brand assets", "Software & dev", "Marketing assets"];

  const galleryImages = [
    // ── 2026 Brand + Product System ────────────────────────────────────────
    { src: tixBrandSystem,     category: "Brand assets",    caption: "TIX brand system — video-first ticket booking for concerts, festivals, sports, and live experiences." },
    { src: tixLogoSystem,      category: "Brand assets",    caption: "TIX logo system — primary, reverse, monogram, lockups, clear space, minimum size, and misuse rules." },
    { src: tixVisualLanguage,  category: "Brand assets",    caption: "TIX visual language — color, typography hierarchy, icons, buttons, chips, tags, grids, and patterns." },
    { src: tixMockupKit,       category: "Brand assets",    caption: "TIX brand application — tickets, lanyards, staff tees, hoodies, bags, ID, posters, and event signage." },
    // Software & dev
    { src: tixUiKit,           category: "Software & dev",  caption: "TIX UI kit — modular component library across forms, lists, cards, payments, status, and identity." },
    { src: tixCoreAppScreens,  category: "Software & dev",  caption: "TIX core app screens — onboarding, sign-in, home/discover, categories, event detail, and search." },
    { src: tixBookingJourney,  category: "Software & dev",  caption: "TIX booking journey — browse → seats → review → payment → confirmation in six steps." },
    { src: tixTicketsWallet,   category: "Software & dev",  caption: "TIX tickets & wallet — digital tickets, QR pass, Apple/Google Wallet, transfer, alerts, and profile." },
    { src: tixWebDesktop,      category: "Software & dev",  caption: "TIX web & desktop — landing, event listing, event detail, checkout, and organizer dashboard." },
    // Marketing
    { src: tixCampaignKit,     category: "Marketing assets", caption: "TIX campaign + marketing kit — social posts, story ads, event launches, banners, emails, billboards." },
    // ── Legacy / earlier round ─────────────────────────────────────────────
    { src: heroImage,          category: "Software & dev",  caption: "Early TIX mobile concept — home screen and movie listings (round one)." },
    { src: mobileHandImage,    category: "Software & dev",  caption: "Early TIX in-hand mockup (round one)." },
    { src: appIconImage,       category: "Brand assets",    caption: "TIX app icon on iPhone home screen." },
    { src: guidelinesImage,    category: "Brand assets",    caption: "TIX early brand identity exploration." },
    { src: moviePosterImage,   category: "Marketing assets", caption: "Book Your TIX Now — early promotional graphic." },
    { src: arrowImage,         category: "Marketing assets", caption: "Movies, Events and much more — early campaign." },
    { src: bagImage,           category: "Brand assets",    caption: "TIX branded tote bag merchandise." },
    { src: deckImage,          category: "Brand assets",    caption: "Early TIX platform deck — overview with app screens." },
  ];

  const filteredGallery = activeGalleryTab === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeGalleryTab);

  return (
    <div 
      className="min-h-screen w-full font-sans overflow-x-hidden"
      style={{ 
        backgroundColor: '#FAFAFA',
        color: '#1A1A1A',
        fontFamily: '-apple-system, system-ui, sans-serif'
      }}
    >
      <SiteNav theme="light" />

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-24" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 
                className="font-bold mb-6"
                style={{ 
                  fontSize: 'clamp(32px, 4.5vw, 52px)',
                  lineHeight: '1.1',
                  color: '#1A1A1A',
                  letterSpacing: '-0.02em',
                }}
                data-testid="hero-headline"
              >
                TIX — Watch the vibe. Book the experience.
              </h1>
              <p
                className="text-base md:text-lg leading-relaxed mb-8"
                style={{ color: '#666666' }}
              >
                A video-first event-ticketing marketplace for live concerts and festivals — full brand system, mobile + web product, organizer and admin consoles, and the launch campaign. Discover events through short video, book in seconds, carry a dynamic-QR ticket, and resell safely if plans change.
              </p>

              {/* Live CTA — primary action, made prominent */}
              <div className="mb-7">
                <a
                  href="https://tix-app-mu.vercel.app/tix"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 pl-5 pr-6 py-4 rounded-full text-base font-bold transition-all hover:-translate-y-0.5"
                  style={{
                    backgroundColor: '#1CE783',
                    color: '#06150D',
                    boxShadow: '0 16px 40px -8px rgba(28,231,131,0.7), 0 0 0 1px rgba(28,231,131,0.35)',
                  }}
                  data-testid="tix-live-link"
                >
                  <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full rounded-full animate-ping" style={{ backgroundColor: '#06150D', opacity: 0.55 }} />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: '#06150D' }} />
                  </span>
                  View the live app
                  <svg width="17" height="17" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"><path d="M3 11L11 3M11 3H5M11 3V9" /></svg>
                </a>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-2">
                {["Mobile + Web App", "Brand Identity", "Event Ticketing", "Live & Deployed"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-xs font-medium"
                    style={{ backgroundColor: 'rgba(28,231,131,0.12)', color: '#12A85F' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right - Hero Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src={tixBrandSystem}
                alt="TIX brand system — smart ticket booking platform"
                className="w-full rounded-2xl"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Brief Section */}
      <section className="py-12 md:py-28" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-10">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-12"
            style={{ color: '#1A1A1A' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Quick Brief
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: "Challenge", text: "Discovering live events is flat and text-heavy — posters and lists tell you nothing about the experience, and buying tickets means trusting a faceless flow with no easy way to resell if plans change." },
              { title: "Approach", text: "Build a video-first marketplace: short clips let people feel the vibe before they book, a fast multi-tier checkout carries a dynamic-QR ticket, and a safe resale layer plus organizer and admin consoles run the whole platform." },
              { title: "Outcome", text: "A complete, deployed product — brand system in TIX's electric green, mobile + web apps, organizer creator tools, and admin governance — live with real verified artists and end-to-end booking, resale, and check-in." },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <h3 className="text-lg font-semibold mb-3" style={{ color: '#1A1A1A' }}>
                  {item.title}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: '#666666' }}>
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Did Section */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-10">
          <div className="text-center mb-12">
            <span className="text-sm font-medium tracking-wide mb-3 block" style={{ color: '#666666' }}>What We Did</span>
            <h2 
              className="font-bold"
              style={{ fontSize: 'clamp(28px, 4vw, 42px)', lineHeight: '1.15', color: '#1A1A1A', letterSpacing: '-0.02em' }}
            >
              Full-Service Brand Partnership
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Mobile App Design", "Brand Identity", "UI/UX Design", "Marketing Assets", "Logo Design", "Merchandise", "Social Media", "Pitch Deck"].map((service, idx) => (
              <motion.div
                key={service}
                className="p-5 rounded-xl text-center"
                style={{ backgroundColor: '#FFFFFF' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <span className="text-sm font-medium" style={{ color: '#1A1A1A' }}>{service}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Banner */}
      <section className="py-8 md:py-12" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-10">
          <motion.img 
            src={deckImage}
            alt="TIX platform overview with multiple phone screens"
            className="w-full rounded-2xl"
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          />
        </div>
      </section>

      {/* Insights Section */}
      <section className="py-12 md:py-28" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-10">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-12"
            style={{ color: '#1A1A1A' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Insights
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { num: "01", title: "Video-First Discovery", text: "Short clips let fans feel the event before they book — no flat posters or guesswork." },
              { num: "02", title: "Bold Brand Identity", text: "Electric green stands out in a sea of red and blue ticketing apps." },
              { num: "03", title: "India-First Design", text: "Verified artists, regional events, local languages, and UPI-first payments built-in." },
              { num: "04", title: "Book & Resell", text: "Discovery to dynamic-QR ticket in seconds — with a safe resale layer if plans change." },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <span 
                  className="text-2xl md:text-4xl font-bold block mb-2 md:mb-4"
                  style={{ color: '#D4D4D4' }}
                >
                  {item.num}
                </span>
                <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3" style={{ color: '#1A1A1A' }}>
                  {item.title}
                </h3>
                <p className="text-sm md:text-base leading-relaxed" style={{ color: '#666666' }}>
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Guidelines Banner */}
      <section className="py-8 md:py-12" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-10">
          <motion.img 
            src={guidelinesImage}
            alt="TIX brand identity with movies and events icons"
            className="w-full rounded-2xl"
            loading="lazy"
            decoding="async"
            style={{ backgroundColor: '#FAFAFA' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          />
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 md:py-28" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#1A1A1A' }}>
                Process & Approach
              </h2>
              <p className="text-lg leading-relaxed mb-8" style={{ color: '#666666' }}>
                We designed TIX to feel exciting, modern, and distinctly Indian — while keeping the booking flow simple enough for first-time users.
              </p>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#1A1A1A' }}>The Strategy</h3>
              <ul className="space-y-3">
                {[
                  "Build a bold visual identity that cuts through entertainment app clutter with signature green.",
                  "Design mobile-first experience optimized for discovery and quick booking.",
                  "Create a flexible brand system for artist partnerships, event promotions, and merchandise.",
                  "Add a safe resale layer plus organizer and admin consoles so the whole marketplace runs end to end.",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-base" style={{ color: '#666666' }}>
                    <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#1CE783' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.img 
              src={arrowImage}
              alt="TIX movies events and more campaign"
              className="w-full rounded-2xl object-cover"
              loading="lazy"
              decoding="async"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            />
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#1A1A1A' }}>
        <div className="max-w-[1000px] mx-auto px-4 md:px-10">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-12"
            style={{ color: '#FFFFFF' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Design Principles
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Entertainment First
              </h3>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Every screen is designed to spark excitement — from artist reels to event banners. The dark theme makes content pop while reducing eye strain during late-night browsing.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Signature Green
              </h3>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                The vibrant green (#1CE783) creates instant brand recognition. It's used strategically for CTAs, highlights, and the app icon — standing out on any home screen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Quote */}
      <section className="py-12 md:py-20" style={{ backgroundColor: '#1CE783' }}>
        <div className="max-w-[900px] mx-auto px-4 md:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xl md:text-2xl italic mb-4" style={{ color: '#000000' }}>
              "Gray Solutions nailed the balance between bold branding and intuitive UX. The app feels premium without being complicated — exactly what we wanted for the Indian market."
            </p>
            <span className="text-base font-medium" style={{ color: 'rgba(0,0,0,0.7)' }}>— TIX Founding Team</span>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12 md:py-28" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-10">
          <motion.div 
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#1A1A1A' }}>
              Brand in Action
            </h2>
            <p className="text-lg" style={{ color: '#666666' }}>
              App screens, brand assets, and marketing materials.
            </p>
          </motion.div>

          {/* Gallery Tabs */}
          <div className="flex flex-wrap gap-3 mb-8">
            {galleryTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveGalleryTab(tab)}
                className="px-5 py-2.5 rounded-full text-sm font-medium transition-all"
                style={{
                  backgroundColor: activeGalleryTab === tab ? '#1CE783' : 'transparent',
                  color: activeGalleryTab === tab ? '#000000' : '#666666',
                  border: activeGalleryTab === tab ? 'none' : '1px solid #D4D4D4',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredGallery.map((img, idx) => (
              <motion.div 
                key={idx}
                className="rounded-2xl overflow-hidden"
                style={{ backgroundColor: '#FFFFFF' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <img 
                  src={img.src} 
                  alt={img.caption}
                  className="w-full aspect-[4/3] object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <p className="text-sm p-4" style={{ color: '#666666' }}>
                  {img.caption}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Steps CTA */}
      <section className="py-12 md:py-28" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="max-w-[900px] mx-auto px-4 md:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#1A1A1A' }}>
              Ready to Build Your Next Product?
            </h2>
            <p className="text-lg mb-8" style={{ color: '#666666' }}>
              We design brands and digital products that actually move the business. Let's talk about your next project.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://tix-app-mu.vercel.app/tix"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-base transition-all hover:-translate-y-0.5"
                style={{ backgroundColor: '#1CE783', color: '#06150D', boxShadow: '0 16px 40px -8px rgba(28,231,131,0.7)' }}
                data-testid="tix-live-link-bottom"
              >
                View the live app
                <svg width="17" height="17" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"><path d="M3 11L11 3M11 3H5M11 3V9" /></svg>
              </a>
              <Link href="/contact">
                <button
                  className="px-8 py-4 rounded-full font-medium text-base transition-all"
                  style={{ backgroundColor: '#1A1A1A', color: '#FFFFFF' }}
                  data-testid="cta-contact"
                >
                  Start a Conversation
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
