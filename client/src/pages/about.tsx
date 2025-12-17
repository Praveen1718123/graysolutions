import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import logoImage from "@assets/Group_69_(1)_1764854226570.png";

export default function About() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const metrics = [
    { number: "20+", label: "client engagements across products, brands, and platforms." },
    { number: "8+ years", label: "hands-on experience in digital product and UX." },
    { number: "Funding", label: "products we've supported have gone on to raise seed and Series A capital." },
    { number: "Revenue impact", label: "improved funnels, flows, and experiences that increased conversions and retention." },
  ];

  const howWeWork = [
    { step: "1", title: "Understand the context", description: "Clarify objectives, constraints, and current realities before proposing solutions." },
    { step: "2", title: "Design with intent", description: "Structure flows, interactions, and visuals for clarity and ease of use." },
    { step: "3", title: "Build for reliability", description: "Implement stable, maintainable systems ready for real users." },
    { step: "4", title: "Refine with data", description: "Review performance, correct friction points, and iterate with purpose." },
  ];

  return (
    <motion.div 
      className="min-h-screen w-full font-sans"
      style={{ 
        backgroundColor: '#F6F7FA',
        color: '#0F172A',
        fontFamily: '-apple-system, system-ui, sans-serif'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
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
            backgroundColor: isScrolled ? 'rgba(255,255,255,0.92)' : '#F6F7FA',
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
      <section 
        className="pt-24 md:pt-32 pb-16 md:pb-28"
        style={{ backgroundColor: '#F6F7FA' }}
      >
        <div className="max-w-[1120px] mx-auto px-4 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span 
              className="text-sm font-medium tracking-wide mb-4 block"
              style={{ color: 'rgba(26,26,26,0.5)' }}
            >
              About Gray Solutions
            </span>
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ color: '#1A1A1A', maxWidth: '900px' }}
              data-testid="about-hero-heading"
            >
              A product studio built on clarity, precision, and outcomes.
            </h1>
            <p 
              className="text-lg md:text-xl leading-relaxed mb-8"
              style={{ color: 'rgba(26,26,26,0.6)', maxWidth: '70ch' }}
            >
              Gray Solutions is a product, design, and technology studio focused on building digital experiences that are aesthetically refined, operationally reliable, and aligned with clear business objectives.
            </p>
            <button 
              className="px-7 py-3.5 rounded-full font-medium text-sm transition-all hover:bg-gray-100"
              style={{ 
                backgroundColor: 'transparent', 
                color: '#1A1A1A', 
                border: '1px solid rgba(26,26,26,0.2)' 
              }}
              data-testid="cta-talk-to-us"
            >
              Talk to us
            </button>
          </motion.div>
        </div>
      </section>

      {/* What We Stand For Section */}
      <section 
        className="py-12 md:py-28"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        <div className="max-w-[1120px] mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 
                className="text-2xl md:text-3xl font-bold mb-5"
                style={{ color: '#1A1A1A' }}
                data-testid="section-how-we-think"
              >
                How we think
              </h2>
              <p 
                className="text-lg leading-relaxed"
                style={{ color: 'rgba(26,26,26,0.6)' }}
              >
                We operate at the intersection of design, engineering, and business. Our work is guided by three principles: aesthetic clarity, functional precision, and measurable impact.
              </p>
            </motion.div>

            {/* Right Column - Three Bullets */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#1A1A1A' }}>
                  Aesthetic clarity
                </h3>
                <p className="text-base" style={{ color: 'rgba(26,26,26,0.6)' }}>
                  Interfaces that feel intentional, minimal, and easy to read.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#1A1A1A' }}>
                  Functional precision
                </h3>
                <p className="text-base" style={{ color: 'rgba(26,26,26,0.6)' }}>
                  Systems that behave predictably and scale without friction.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#1A1A1A' }}>
                  Business impact
                </h3>
                <p className="text-base" style={{ color: 'rgba(26,26,26,0.6)' }}>
                  Decisions tied to revenue, efficiency, and long-term value.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Metrics Strip */}
      <section 
        className="py-12 md:py-20"
        style={{ backgroundColor: '#F6F7FA' }}
      >
        <div className="max-w-[1120px] mx-auto px-4 md:px-10">
          <motion.h2 
            className="text-xl md:text-2xl font-bold mb-12 text-center"
            style={{ color: '#1A1A1A' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            data-testid="section-by-the-numbers"
          >
            By the numbers
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                data-testid={`metric-${index}`}
              >
                <div 
                  className="text-3xl md:text-4xl font-bold mb-3"
                  style={{ color: '#1A1A1A' }}
                >
                  {metric.number}
                </div>
                <p 
                  className="text-sm leading-relaxed"
                  style={{ color: 'rgba(26,26,26,0.6)' }}
                >
                  {metric.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section 
        className="py-12 md:py-28"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        <div className="max-w-[1120px] mx-auto px-4 md:px-10">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-12"
            style={{ color: '#1A1A1A' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            data-testid="section-how-we-work"
          >
            How we work with teams
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howWeWork.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                data-testid={`how-we-work-step-${index}`}
              >
                <div 
                  className="text-4xl font-bold mb-4"
                  style={{ color: 'rgba(26,26,26,0.15)' }}
                >
                  {item.step}
                </div>
                <h3 
                  className="text-lg font-semibold mb-3"
                  style={{ color: '#1A1A1A' }}
                >
                  {item.title}
                </h3>
                <p 
                  className="text-base leading-relaxed"
                  style={{ color: 'rgba(26,26,26,0.6)' }}
                >
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section 
        className="py-12 md:py-28"
        style={{ backgroundColor: '#F6F7FA' }}
      >
        <div className="max-w-[800px] mx-auto px-4 md:px-10 text-center">
          <motion.p 
            className="text-xl md:text-2xl leading-relaxed"
            style={{ color: 'rgba(26,26,26,0.7)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            data-testid="closing-statement"
          >
            We're not a full-service agency. We focus on building products and the systems behind them — for founders, operators, and teams that need to move with confidence.
          </motion.p>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="py-8 md:py-12"
        style={{ backgroundColor: '#1A1A1A' }}
      >
        <div className="max-w-[1120px] mx-auto px-4 md:px-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <img 
              src={logoImage} 
              alt="Gray Solutions" 
              className="h-8 brightness-0 invert"
            />
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Based in India. Working globally.
            </p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
