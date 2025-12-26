import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import logoImage from "@assets/Group_25_(5)_1766734675194.png";
import Footer from "@/components/footer";
import heroImage from "@assets/Free_iPhone_16_Pro_PSD_Mockup_Tix_1766597838175.jpg";
import deckImage from "@assets/Tix_Deck-10_1766597838176.png";
import guidelinesImage from "@assets/Tix_Guidelines-05_1766597838176.png";
import arrowImage from "@assets/Tix_Guidelines-06_1766597838176.png";
import appIconImage from "@assets/Tix_Guidelines-07_1766597838176.png";
import moviePosterImage from "@assets/Tix_Guidelines-08_1766597838176.png";
import bagImage from "@assets/Tix_Guidelines-09_1766597838176.png";
import mobileHandImage from "@assets/Tix_Guidelines-10_1766597838176.png";

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

  const galleryTabs = ["All", "App", "Brand", "Marketing"];

  const galleryImages = [
    { src: heroImage, category: "App", caption: "TIX mobile app home screen with movie listings." },
    { src: mobileHandImage, category: "App", caption: "Mobile app shown in-hand with movie browsing." },
    { src: appIconImage, category: "Brand", caption: "TIX app icon on iPhone home screen." },
    { src: guidelinesImage, category: "Brand", caption: "TIX brand identity with movies and events." },
    { src: moviePosterImage, category: "Marketing", caption: "Book Your TIX Now promotional graphic." },
    { src: arrowImage, category: "Marketing", caption: "Movies, Events and much more campaign." },
    { src: bagImage, category: "Brand", caption: "TIX branded tote bag merchandise." },
    { src: deckImage, category: "Brand", caption: "TIX platform overview with app screens." },
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
      {/* Fixed Header */}
      <header 
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 md:px-0"
        style={{
          height: isScrolled ? '70px' : '80px',
          backgroundColor: 'transparent',
          pointerEvents: 'none',
          transition: 'height 500ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div 
          className="flex items-center justify-center"
          style={{
            pointerEvents: 'auto',
            width: isScrolled ? '180px' : '100%',
            height: isScrolled ? '44px' : '100%',
            marginTop: isScrolled ? '12px' : '0',
            backgroundColor: isScrolled ? 'rgba(255,255,255,0.92)' : '#FFFFFF',
            backdropFilter: isScrolled ? 'blur(12px)' : 'none',
            WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
            boxShadow: isScrolled ? '0 4px 24px rgba(0,0,0,0.1)' : 'none',
            borderRadius: isScrolled ? '999px' : '0',
            padding: isScrolled ? '0 24px' : '0',
            transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <Link href="/">
            <img 
              src={logoImage} 
              alt="Gray Solutions Logo" 
              className="cursor-pointer"
              style={{
                height: isScrolled ? '24px' : '36px',
                width: 'auto',
                transition: 'height 500ms cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              data-testid="logo-nav"
            />
          </Link>
        </div>
      </header>

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
                TIX — The Next-Gen Ticketing & Streaming Platform
              </h1>
              <p 
                className="text-base md:text-lg leading-relaxed mb-8"
                style={{ color: '#666666' }}
              >
                A complete brand identity and app design for India's entertainment discovery platform — bringing movies, events, and streaming together in one seamless experience.
              </p>
              
              {/* CTAs */}
              <div className="flex gap-4 mb-8">
                <button 
                  className="px-7 py-3.5 rounded-full font-medium text-sm transition-all"
                  style={{ backgroundColor: '#00D26A', color: '#000000' }}
                >
                  View App Design
                </button>
                <button 
                  className="px-7 py-3.5 rounded-full font-medium text-sm transition-all hover:bg-gray-100"
                  style={{ backgroundColor: 'transparent', color: '#1A1A1A', border: '1px solid #E5E5E5' }}
                >
                  Talk to Gray Solutions
                </button>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-2">
                {["Mobile App", "Brand Identity", "Entertainment", "India Market"].map((tag) => (
                  <span 
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-xs font-medium"
                    style={{ backgroundColor: 'rgba(0,210,106,0.1)', color: '#00D26A' }}
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
                src={heroImage} 
                alt="TIX app shown on iPhone in hand"
                className="w-full rounded-2xl"
                loading="eager"
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Challenge", text: "India's entertainment space is fragmented — movies on one app, events on another, no unified discovery. Users juggle multiple platforms with inconsistent experiences." },
              { title: "Approach", text: "Design a single platform that brings together movies, live events, and streaming with a bold visual identity that stands out in a crowded market." },
              { title: "Outcome", text: "A complete brand system with vibrant green identity, intuitive mobile app design, and marketing assets ready for launch across India's entertainment scene." },
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

      {/* Platform Banner */}
      <section className="py-8 md:py-12" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-10">
          <motion.img 
            src={deckImage}
            alt="TIX platform overview with multiple phone screens"
            className="w-full rounded-2xl"
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { num: "01", title: "Unified Discovery", text: "Movies, events, and streaming in one place — no more app-hopping." },
              { num: "02", title: "Bold Brand Identity", text: "Vibrant green stands out in a sea of red and blue entertainment apps." },
              { num: "03", title: "India-First Design", text: "Regional content, local languages, and payment methods built-in." },
              { num: "04", title: "Seamless Booking", text: "From discovery to ticket in under 30 seconds with saved preferences." },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <span 
                  className="text-4xl font-bold block mb-4"
                  style={{ color: '#D4D4D4' }}
                >
                  {item.num}
                </span>
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

      {/* Brand Guidelines Banner */}
      <section className="py-8 md:py-12" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-10">
          <motion.img 
            src={guidelinesImage}
            alt="TIX brand identity with movies and events icons"
            className="w-full rounded-2xl"
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
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
                  "Create flexible brand system for cinema partnerships, event promotions, and merchandise.",
                  "Plan for expansion into streaming and original content with scalable design patterns.",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-base" style={{ color: '#666666' }}>
                    <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#00D26A' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.img 
              src={arrowImage}
              alt="TIX movies events and more campaign"
              className="w-full rounded-2xl object-cover"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Entertainment First
              </h3>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Every screen is designed to spark excitement — from movie posters to event banners. The dark theme makes content pop while reducing eye strain during late-night browsing.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Signature Green
              </h3>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                The vibrant green (#00D26A) creates instant brand recognition. It's used strategically for CTAs, highlights, and the app icon — standing out on any home screen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Quote */}
      <section className="py-12 md:py-20" style={{ backgroundColor: '#00D26A' }}>
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
                  backgroundColor: activeGalleryTab === tab ? '#00D26A' : 'transparent',
                  color: activeGalleryTab === tab ? '#000000' : '#666666',
                  border: activeGalleryTab === tab ? 'none' : '1px solid #D4D4D4',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <Link href="/contact">
              <button 
                className="px-8 py-4 rounded-full font-medium text-base transition-all"
                style={{ backgroundColor: '#1A1A1A', color: '#FFFFFF' }}
                data-testid="cta-contact"
              >
                Start a Conversation
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
