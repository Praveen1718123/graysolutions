import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import logoImage from "@assets/Frame_33_copy2_2_(1)_1768895375486.png";
import Footer from "@/components/footer";
import heroVideo from "@assets/hero-video-horizontal.mp4";
import desktopImage from "@assets/optimized/Desktop_-_4_(2)_1765460573017.jpg";
import screenshotAbout from "@assets/optimized/screenshot_about.webp";

export default function GraySolutions() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeGalleryTab, setActiveGalleryTab] = useState("All");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const galleryTabs = ["All", "Website", "Brand", "Process"];

  const galleryImages = [
    { src: desktopImage, category: "Website", caption: "Landing page hero with immersive video background." },
    { src: screenshotAbout, category: "Website", caption: "About page with team and culture focus." },
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
              width="140"
              height="64"
              decoding="async"
              alt="Gray Solutions Logo" 
              className="cursor-pointer"
              style={{
                height: isScrolled ? '28px' : '48px',
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
                Gray Solutions — Designing Our Own Digital Identity
              </h1>
              <p 
                className="text-base md:text-lg leading-relaxed mb-8"
                style={{ color: '#666666' }}
              >
                How we applied our own design philosophy to create a website that reflects who we are: minimal, intentional, and built to move.
              </p>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap gap-2">
                {["Website Design", "Brand Identity", "Motion Design", "Self-Directed"].map((tag) => (
                  <span 
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-xs font-medium"
                    style={{ backgroundColor: '#F5F5F5', color: '#666666' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right - Hero Video */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl overflow-hidden"
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full rounded-2xl"
              >
                <source src={heroVideo} type="video/mp4" />
              </video>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Decision Section */}
      <section className="py-12 md:py-28" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <h2 
              className="text-2xl md:text-3xl font-bold mb-8"
              style={{ color: '#1A1A1A' }}
            >
              The Decision
            </h2>
            <p 
              className="text-lg leading-relaxed mb-6"
              style={{ color: '#666666' }}
            >
              We've helped dozens of companies build their digital presence. But when it came to our own website, we kept putting it off. The classic "cobbler's children have no shoes" problem.
            </p>
            <p 
              className="text-lg leading-relaxed mb-6"
              style={{ color: '#666666' }}
            >
              In late 2024, we decided: no more excuses. We would treat Gray Solutions as our most important client — and design a website that truly represents what we stand for.
            </p>
            <p 
              className="text-lg leading-relaxed"
              style={{ color: '#666666' }}
            >
              The goal wasn't just to look good. It was to demonstrate our philosophy: that great design is invisible until it needs to be seen. That motion creates emotion. That less is almost always more.
            </p>
          </motion.div>
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
            {["Website Design", "Brand Identity", "Motion Design", "UI/UX Design", "Content Strategy", "Visual Design", "Responsive Design", "SEO Optimization"].map((service, idx) => (
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

      {/* Design Principles Grid */}
      <section className="py-12 md:py-28" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-10">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-12"
            style={{ color: '#1A1A1A' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Design Principles
          </motion.h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {[
              { num: "01", title: "Motion as Meaning", text: "Every animation serves a purpose. Scroll-triggered reveals, hover states, and transitions all guide the eye naturally." },
              { num: "02", title: "Radical Simplicity", text: "We stripped away everything that didn't earn its place. No decorative elements, no clutter — just content and space." },
              { num: "03", title: "Type as Voice", text: "Typography does the heavy lifting. Bold headlines, generous line heights, and careful hierarchy create rhythm." },
              { num: "04", title: "White Space Confidence", text: "Breathing room isn't empty — it's intentional. We let elements sit, giving visitors time to absorb." },
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

      {/* Full Width Video Banner */}
      <section className="py-8 md:py-12" style={{ backgroundColor: '#1A1A1A' }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-10">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full rounded-2xl"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 md:py-28" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#1A1A1A' }}>
                The Process
              </h2>
              <p className="text-lg leading-relaxed mb-8" style={{ color: '#666666' }}>
                We followed the same process we use for clients — with one key difference: we had full creative freedom to experiment.
              </p>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#1A1A1A' }}>What We Built</h3>
              <ul className="space-y-3">
                {[
                  "Immersive video-first homepage that captures attention in 3 seconds.",
                  "Scroll-based animations that reveal content naturally as you explore.",
                  "Case study pages that showcase our work without overwhelming.",
                  "A contact experience that feels welcoming, not transactional.",
                  "Dark/light themes that respect user preferences.",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-base" style={{ color: '#666666' }}>
                    <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#1A1A1A' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <img 
                src={desktopImage}
                alt="Gray Solutions homepage design"
                className="w-full rounded-2xl object-cover"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* POV Section */}
      <section className="py-12 md:py-28" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="max-w-[900px] mx-auto px-4 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: '#1A1A1A' }}>
              Our Point of View
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#1A1A1A' }}>
                  On Design Agencies
                </h3>
                <p className="text-lg leading-relaxed" style={{ color: '#666666' }}>
                  Most agency websites try too hard to be impressive. They're filled with awards, client logos, and jargon. We wanted something different — a site that shows our work and gets out of the way.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#1A1A1A' }}>
                  On Indian Design
                </h3>
                <p className="text-lg leading-relaxed" style={{ color: '#666666' }}>
                  We're proud to be based in India, serving clients globally. Our design sensibility isn't "Indian" or "Western" — it's universal. Clean, functional, and built for the modern web.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#1A1A1A' }}>
                  On Our Future
                </h3>
                <p className="text-lg leading-relaxed" style={{ color: '#666666' }}>
                  This website will evolve. We'll add new case studies, refine interactions, and push what's possible. But the core philosophy stays: simple, intentional, and always in service of the work.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#1A1A1A' }}>
        <div className="max-w-[900px] mx-auto px-4 md:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xl md:text-2xl italic mb-4" style={{ color: '#FFFFFF' }}>
              "The best design disappears. It doesn't ask for attention — it earns it through utility and beauty working together."
            </p>
            <span className="text-base font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>— Gray Solutions Design Philosophy</span>
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 md:py-28" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-10">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-12"
            style={{ color: '#1A1A1A' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            The Outcome
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { stat: "100%", label: "In-house designed and built by our team" },
              { stat: "5", label: "Pages crafted with intention" },
              { stat: "∞", label: "Ongoing iterations and improvements" },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                className="text-center p-8 rounded-2xl"
                style={{ backgroundColor: '#FAFAFA' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <span 
                  className="text-4xl md:text-5xl font-bold block mb-3"
                  style={{ color: '#1A1A1A' }}
                >
                  {item.stat}
                </span>
                <p className="text-base" style={{ color: '#666666' }}>
                  {item.label}
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
              Let's Build Something Together
            </h2>
            <p className="text-lg mb-8" style={{ color: '#666666' }}>
              If you like what you see, imagine what we could create for your brand. Let's start a conversation.
            </p>
            <Link href="/contact">
              <button 
                className="px-8 py-4 rounded-full font-medium text-base transition-all"
                style={{ backgroundColor: '#1A1A1A', color: '#FFFFFF' }}
                data-testid="cta-contact"
              >
                Get in Touch
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
