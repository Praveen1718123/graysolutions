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

  const services = [
    { title: "Product Strategy", description: "Defining what to build and why it matters" },
    { title: "UX & Interface Design", description: "Structuring flows and visuals for clarity" },
    { title: "Brand & Identity", description: "Creating systems that signal trust and quality" },
    { title: "Engineering", description: "Building stable, maintainable digital products" },
    { title: "Digital Consulting", description: "Optimising experiences and operations" },
  ];

  const principles = [
    { 
      title: "Aesthetic clarity", 
      description: "Interfaces that are intentional, minimal, and easy to read — no visual noise.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2"/>
          <circle cx="16" cy="16" r="4" fill="currentColor"/>
        </svg>
      )
    },
    { 
      title: "Functional precision", 
      description: "Systems that behave predictably, scale cleanly, and do not surprise operators or end users.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="6" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="2"/>
          <line x1="16" y1="10" x2="16" y2="22" stroke="currentColor" strokeWidth="2"/>
          <line x1="10" y1="16" x2="22" y2="16" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    { 
      title: "Business alignment", 
      description: "Decisions tied to revenue, cost, risk, and long-term value — not decoration or trends.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 24L14 16L18 20L24 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="24" cy="12" r="2" fill="currentColor"/>
        </svg>
      )
    },
  ];

  const metrics = [
    { number: "100+", label: "product and design engagements across consumer apps, B2B platforms, internal tools, and experience redesigns." },
    { number: "8+", label: "years in digital product and systems design with hands-on involvement from early strategy to delivery." },
    { number: "0→1", label: "launches and platform-scale rebuilds — defining, building, and shipping products that work in live environments." },
    { number: "10+", label: "domains covered including consumer products, logistics, retail, SaaS, and internal operational systems." },
  ];

  const howWeWork = [
    { step: "1", title: "Understand the context", description: "We define objectives, constraints, stakeholders, and how the product is used today." },
    { step: "2", title: "Design with intent", description: "We structure flows, states, and interfaces for clarity, predictability, and day-to-day use." },
    { step: "3", title: "Build for reliability", description: "We implement solutions that are stable, maintainable, and ready for real users — not just demos." },
    { step: "4", title: "Refine with purpose", description: "We review performance, identify friction, and adjust based on evidence, not guesswork." },
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
        className="pt-24 md:pt-32 pb-16 md:pb-24"
        style={{ backgroundColor: '#F6F7FA' }}
      >
        <div className="max-w-[1120px] mx-auto px-4 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6"
              style={{ color: '#1A1A1A', maxWidth: '900px' }}
              data-testid="about-hero-heading"
            >
              We design and build digital systems that people understand — and businesses rely on.
            </h1>
            <motion.p 
              className="text-lg md:text-xl leading-relaxed mb-8"
              style={{ color: 'rgba(26,26,26,0.7)', maxWidth: '70ch' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Gray Solutions is a product, design, and technology studio focused on creating digital experiences that are aesthetically clear, operationally reliable, and aligned with measurable business objectives. We work with teams who need structured thinking, careful execution, and products that perform in real conditions.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <button 
                className="px-7 py-3.5 rounded-full font-medium text-sm transition-all hover:opacity-90"
                style={{ 
                  backgroundColor: '#1A1A1A', 
                  color: '#FFFFFF'
                }}
                data-testid="cta-talk-to-us"
              >
                Talk to us
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What We Do Section */}
      <section 
        className="py-16 md:py-24"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        <div className="max-w-[1120px] mx-auto px-4 md:px-10">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-10"
            style={{ color: '#1A1A1A' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            data-testid="section-what-we-do"
          >
            What we do
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="p-5 rounded-xl"
                style={{ backgroundColor: '#F6F7FA' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                data-testid={`service-${index}`}
              >
                <h3 
                  className="text-base font-semibold mb-2"
                  style={{ color: '#1A1A1A' }}
                >
                  {service.title}
                </h3>
                <p 
                  className="text-sm leading-relaxed"
                  style={{ color: 'rgba(26,26,26,0.6)' }}
                >
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Think Section */}
      <section 
        className="py-16 md:py-24"
        style={{ backgroundColor: '#F6F7FA' }}
      >
        <div className="max-w-[1120px] mx-auto px-4 md:px-10">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ color: '#1A1A1A' }}
              data-testid="section-how-we-think"
            >
              How we think
            </h2>
            <p 
              className="text-lg leading-relaxed"
              style={{ color: 'rgba(26,26,26,0.6)', maxWidth: '60ch' }}
            >
              We see every product as a system that has to work for users and for the business. Three principles guide our work:
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                className="p-6 md:p-8 rounded-2xl"
                style={{ backgroundColor: '#FFFFFF' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                data-testid={`principle-${index}`}
              >
                <div 
                  className="mb-5"
                  style={{ color: '#1A1A1A' }}
                >
                  {principle.icon}
                </div>
                <h3 
                  className="text-lg font-semibold mb-3"
                  style={{ color: '#1A1A1A' }}
                >
                  {principle.title}
                </h3>
                <p 
                  className="text-base leading-relaxed"
                  style={{ color: 'rgba(26,26,26,0.6)' }}
                >
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Consumer-Centred by Design Section */}
      <section 
        className="py-16 md:py-24"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        <div className="max-w-[1120px] mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 
                className="text-2xl md:text-3xl font-bold mb-6"
                style={{ color: '#1A1A1A' }}
                data-testid="section-consumer-centred"
              >
                Consumer-centred by design
              </h2>
              <p 
                className="text-lg leading-relaxed mb-4"
                style={{ color: 'rgba(26,26,26,0.7)' }}
              >
                We have experience designing for both end consumers and business users.
              </p>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p 
                className="text-base leading-relaxed"
                style={{ color: 'rgba(26,26,26,0.6)' }}
              >
                Our decisions are informed by how people actually behave — how they scan, hesitate, decide, and drop off. These patterns shape everything from information hierarchy to interaction details.
              </p>
              <p 
                className="text-base leading-relaxed"
                style={{ color: 'rgba(26,26,26,0.6)' }}
              >
                Whether the audience is a customer, an internal operator, or a partner, our approach is the same: design with intent, build with reasoning, and refine based on real behaviour.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* By the Numbers Section */}
      <section 
        className="py-16 md:py-24"
        style={{ backgroundColor: '#F6F7FA' }}
      >
        <div className="max-w-[1120px] mx-auto px-4 md:px-10">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-2xl md:text-3xl font-bold mb-3"
              style={{ color: '#1A1A1A' }}
              data-testid="section-by-the-numbers"
            >
              By the numbers
            </h2>
            <p 
              className="text-base"
              style={{ color: 'rgba(26,26,26,0.6)' }}
            >
              We measure ourselves by consistency, clarity, and the outcomes we enable.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                className="flex gap-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                data-testid={`metric-${index}`}
              >
                <div 
                  className="text-4xl md:text-5xl font-bold flex-shrink-0"
                  style={{ color: '#1A1A1A', minWidth: '80px' }}
                >
                  {metric.number}
                </div>
                <p 
                  className="text-base leading-relaxed pt-2"
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
        className="py-16 md:py-24"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        <div className="max-w-[1120px] mx-auto px-4 md:px-10">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-2xl md:text-3xl font-bold mb-3"
              style={{ color: '#1A1A1A' }}
              data-testid="section-how-we-work"
            >
              How we work
            </h2>
            <p 
              className="text-base"
              style={{ color: 'rgba(26,26,26,0.6)' }}
            >
              Our process is structured and deliberate.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howWeWork.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                data-testid={`how-we-work-step-${index}`}
              >
                <div 
                  className="text-5xl md:text-6xl font-bold mb-4"
                  style={{ color: 'rgba(26,26,26,0.1)' }}
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

      {/* Our Position Section */}
      <section 
        className="py-16 md:py-24"
        style={{ backgroundColor: '#F6F7FA' }}
      >
        <div className="max-w-[900px] mx-auto px-4 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 
              className="text-2xl md:text-3xl font-bold mb-8"
              style={{ color: '#1A1A1A' }}
              data-testid="section-our-position"
            >
              Our position
            </h2>
            <p 
              className="text-xl md:text-2xl font-semibold mb-6"
              style={{ color: '#1A1A1A' }}
            >
              We are not a full-service agency.
            </p>
            <p 
              className="text-lg leading-relaxed mb-4"
              style={{ color: 'rgba(26,26,26,0.7)' }}
            >
              We specialise in products and the systems behind them, working as an extension of the teams we support.
            </p>
            <p 
              className="text-lg leading-relaxed"
              style={{ color: 'rgba(26,26,26,0.7)' }}
            >
              Our focus is simple: clear design, reliable execution, and outcomes that hold up over time.
            </p>
          </motion.div>
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
