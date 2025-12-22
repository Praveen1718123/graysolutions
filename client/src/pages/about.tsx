import React, { useEffect, useState, useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import logoImage from "@assets/Group_69_(1)_1764854226570.png";

function useCountUp(end: number, duration: number = 2000, inView: boolean) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [inView, end, duration]);

  return count;
}

function CountUpNumber({ value, suffix = "", inView }: { value: number; suffix?: string; inView: boolean }) {
  const count = useCountUp(value, 2000, inView);
  return <>{count}{suffix}</>;
}

export default function About() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved === 'dark';
    }
    return false;
  });
  const metricsRef = useRef(null);
  const metricsInView = useInView(metricsRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const colors = {
    bg: isDark ? '#0A0A0F' : '#F8F9FC',
    bgAlt: isDark ? '#12121A' : '#FFFFFF',
    bgCard: isDark ? '#1A1A24' : '#F0F2F8',
    text: isDark ? '#FFFFFF' : '#1A1A1A',
    textMuted: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(26,26,26,0.6)',
    textSubtle: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(26,26,26,0.4)',
    border: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(26,26,26,0.1)',
    accent: '#3B82F6',
    accentLight: isDark ? 'rgba(59,130,246,0.2)' : 'rgba(59,130,246,0.1)',
  };

  const services = [
    { 
      title: "Product Strategy", 
      description: "Defining what to build and why it matters",
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="20" cy="20" r="16" />
          <path d="M20 10v10l7 7" strokeLinecap="round" />
        </svg>
      )
    },
    { 
      title: "UX & Interface Design", 
      description: "Structuring flows and visuals for clarity",
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="6" y="8" width="28" height="24" rx="3" />
          <line x1="6" y1="16" x2="34" y2="16" />
          <rect x="10" y="20" width="8" height="8" rx="1" />
        </svg>
      )
    },
    { 
      title: "Brand & Identity Systems", 
      description: "Creating systems that signal trust and quality",
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20 6l14 8v12l-14 8-14-8V14l14-8z" />
          <circle cx="20" cy="20" r="6" />
        </svg>
      )
    },
    { 
      title: "Engineering", 
      description: "Building stable, maintainable digital products",
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14 12l-6 8 6 8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M26 12l6 8-6 8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="22" y1="8" x2="18" y2="32" />
        </svg>
      )
    },
    { 
      title: "Digital Consulting", 
      description: "Optimising experiences and operations",
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M8 28l8-8 6 6 10-12" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="32" cy="14" r="3" fill="currentColor" />
        </svg>
      )
    },
  ];

  const principles = [
    { 
      title: "Aesthetic clarity", 
      description: "Interfaces that are intentional, minimal, and easy to read — no visual noise.",
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="24" cy="24" r="18" />
          <circle cx="24" cy="24" r="8" />
          <circle cx="24" cy="24" r="2" fill="currentColor" />
        </svg>
      )
    },
    { 
      title: "Functional precision", 
      description: "Systems that behave predictably, scale cleanly, and do not surprise operators or end users.",
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="8" y="8" width="32" height="32" rx="4" />
          <line x1="24" y1="14" x2="24" y2="34" />
          <line x1="14" y1="24" x2="34" y2="24" />
          <circle cx="24" cy="24" r="4" />
        </svg>
      )
    },
    { 
      title: "Business alignment", 
      description: "Decisions tied to revenue, cost, risk, and long-term value — not decoration or trends.",
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M10 36l10-12 8 8 12-16" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="40" cy="16" r="4" fill="currentColor" />
        </svg>
      )
    },
  ];

  const metrics = [
    { number: 100, suffix: "+", label: "product and design engagements across consumer apps, B2B platforms, internal tools, and experience redesigns." },
    { number: 8, suffix: "+", label: "years in digital product and systems design with hands-on involvement from early strategy to delivery." },
    { display: "0→1", label: "launches and platform-scale rebuilds — defining, building, and shipping products that work in live environments." },
    { number: 10, suffix: "+", label: "domains covered including consumer products, logistics, retail, SaaS, and internal operational systems." },
  ];

  const howWeWork = [
    { step: "01", title: "Understand the context", description: "We define objectives, constraints, stakeholders, and how the product is used today." },
    { step: "02", title: "Design with intent", description: "We structure flows, states, and interfaces for clarity, predictability, and day-to-day use." },
    { step: "03", title: "Build for reliability", description: "We implement solutions that are stable, maintainable, and ready for real users — not just demos." },
    { step: "04", title: "Refine with purpose", description: "We review performance, identify friction, and adjust based on evidence, not guesswork." },
  ];

  return (
    <motion.div 
      className="min-h-screen w-full font-sans overflow-x-hidden"
      style={{ 
        backgroundColor: colors.bg,
        color: colors.text,
        fontFamily: '-apple-system, system-ui, sans-serif',
        transition: 'background-color 0.3s ease, color 0.3s ease',
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
            backgroundColor: isScrolled 
              ? (isDark ? 'rgba(18,18,26,0.92)' : 'rgba(255,255,255,0.92)') 
              : colors.bg,
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
                filter: isDark ? 'brightness(0) invert(1)' : 'none',
              }}
              data-testid="logo-nav"
            />
          </Link>
        </div>
      </header>

      {/* Theme Toggle */}
      <button
        onClick={() => setIsDark(!isDark)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
        style={{ 
          backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
          border: `1px solid ${colors.border}`,
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        }}
        data-testid="theme-toggle"
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDark ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth="2">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>

      {/* Hero Section - Full Height */}
      <section 
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{ backgroundColor: colors.bg }}
      >
        {/* Animated gradient background */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: isDark 
              ? 'radial-gradient(ellipse at 20% 30%, rgba(59,130,246,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(139,92,246,0.1) 0%, transparent 50%)'
              : 'radial-gradient(ellipse at 20% 30%, rgba(59,130,246,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(139,92,246,0.05) 0%, transparent 50%)',
            animation: 'gradientShift 15s ease-in-out infinite alternate',
          }}
        />
        <style>{`
          @keyframes gradientShift {
            0% { transform: scale(1) rotate(0deg); }
            100% { transform: scale(1.1) rotate(3deg); }
          }
        `}</style>
        
        <div className="max-w-[1120px] mx-auto px-4 md:px-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-8"
              style={{ color: colors.text, maxWidth: '1000px' }}
              data-testid="about-hero-heading"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              We design and build digital systems that people understand — and businesses rely on.
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl lg:text-2xl leading-relaxed mb-10"
              style={{ color: colors.textMuted, maxWidth: '800px' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Gray Solutions is a product, design, and technology studio focused on creating digital experiences that are aesthetically clear, operationally reliable, and aligned with measurable business objectives. We work with teams who need structured thinking, careful execution, and products that perform in real conditions.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <button 
                className="px-8 py-4 rounded-full font-medium text-base transition-all hover:scale-105"
                style={{ 
                  backgroundColor: colors.accent, 
                  color: '#FFFFFF',
                  boxShadow: `0 8px 30px ${colors.accentLight}`,
                }}
                data-testid="cta-talk-to-us"
              >
                Talk to us
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ color: colors.textSubtle }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* What We Do Section */}
      <section 
        className="py-20 md:py-32"
        style={{ backgroundColor: colors.bgAlt }}
      >
        <div className="max-w-[1120px] mx-auto px-4 md:px-10">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-16"
            style={{ color: colors.text }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            data-testid="section-what-we-do"
          >
            What we do
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="p-6 md:p-8 rounded-2xl transition-all hover:scale-[1.02]"
                style={{ 
                  backgroundColor: colors.bgCard,
                  border: `1px solid ${colors.border}`,
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                data-testid={`service-${index}`}
              >
                <div 
                  className="mb-5"
                  style={{ color: colors.accent }}
                >
                  {service.icon}
                </div>
                <h3 
                  className="text-lg font-semibold mb-3"
                  style={{ color: colors.text }}
                >
                  {service.title}
                </h3>
                <p 
                  className="text-base leading-relaxed"
                  style={{ color: colors.textMuted }}
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
        className="py-20 md:py-32"
        style={{ backgroundColor: colors.bg }}
      >
        <div className="max-w-[1120px] mx-auto px-4 md:px-10">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ color: colors.text }}
              data-testid="section-how-we-think"
            >
              How we think
            </h2>
            <p 
              className="text-lg md:text-xl leading-relaxed"
              style={{ color: colors.textMuted, maxWidth: '700px' }}
            >
              We see every product as a system that has to work for users and for the business. Three principles guide our work:
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                className="p-8 md:p-10 rounded-3xl relative overflow-hidden"
                style={{ 
                  backgroundColor: colors.bgAlt,
                  border: `1px solid ${colors.border}`,
                }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                data-testid={`principle-${index}`}
              >
                <div 
                  className="absolute top-0 right-0 w-32 h-32 opacity-5"
                  style={{ 
                    background: `radial-gradient(circle, ${colors.accent} 0%, transparent 70%)`,
                  }}
                />
                <div 
                  className="mb-6"
                  style={{ color: colors.accent }}
                >
                  {principle.icon}
                </div>
                <h3 
                  className="text-xl font-semibold mb-4"
                  style={{ color: colors.text }}
                >
                  {principle.title}
                </h3>
                <p 
                  className="text-base leading-relaxed"
                  style={{ color: colors.textMuted }}
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
        className="py-20 md:py-32"
        style={{ backgroundColor: colors.bgAlt }}
      >
        <div className="max-w-[1120px] mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 
                className="text-3xl md:text-4xl font-bold mb-8"
                style={{ color: colors.text }}
                data-testid="section-consumer-centred"
              >
                Consumer-centred by design
              </h2>
              <p 
                className="text-xl leading-relaxed"
                style={{ color: colors.text }}
              >
                We have experience designing for both end consumers and business users.
              </p>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p 
                className="text-lg leading-relaxed"
                style={{ color: colors.textMuted }}
              >
                Our decisions are informed by how people actually behave — how they scan, hesitate, decide, and drop off. These patterns shape everything from information hierarchy to interaction details.
              </p>
              <p 
                className="text-lg leading-relaxed"
                style={{ color: colors.textMuted }}
              >
                Whether the audience is a customer, an internal operator, or a partner, our approach is the same: design with intent, build with reasoning, and refine based on real behaviour.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* By the Numbers Section */}
      <section 
        ref={metricsRef}
        className="py-20 md:py-32"
        style={{ backgroundColor: colors.bg }}
      >
        <div className="max-w-[1120px] mx-auto px-4 md:px-10">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: colors.text }}
              data-testid="section-by-the-numbers"
            >
              By the numbers
            </h2>
            <p 
              className="text-lg"
              style={{ color: colors.textMuted }}
            >
              We measure ourselves by consistency, clarity, and the outcomes we enable.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-14">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                className="flex gap-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                data-testid={`metric-${index}`}
              >
                <div 
                  className="text-5xl md:text-6xl font-bold flex-shrink-0"
                  style={{ color: colors.accent, minWidth: '100px' }}
                >
                  {metric.display ? (
                    metric.display
                  ) : (
                    <CountUpNumber value={metric.number!} suffix={metric.suffix} inView={metricsInView} />
                  )}
                </div>
                <p 
                  className="text-base md:text-lg leading-relaxed pt-3"
                  style={{ color: colors.textMuted }}
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
        className="py-20 md:py-32"
        style={{ backgroundColor: colors.bgAlt }}
      >
        <div className="max-w-[1120px] mx-auto px-4 md:px-10">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: colors.text }}
              data-testid="section-how-we-work"
            >
              How we work
            </h2>
            <p 
              className="text-lg"
              style={{ color: colors.textMuted }}
            >
              Our process is structured and deliberate.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {howWeWork.map((item, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                data-testid={`how-we-work-step-${index}`}
              >
                <div 
                  className="text-6xl md:text-7xl font-bold mb-6"
                  style={{ color: colors.border }}
                >
                  {item.step}
                </div>
                <h3 
                  className="text-lg font-semibold mb-4"
                  style={{ color: colors.text }}
                >
                  {item.title}
                </h3>
                <p 
                  className="text-base leading-relaxed"
                  style={{ color: colors.textMuted }}
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
        className="py-20 md:py-32"
        style={{ 
          backgroundColor: isDark ? '#0D0D12' : '#F0F2F8',
        }}
      >
        <div className="max-w-[900px] mx-auto px-4 md:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 
              className="text-3xl md:text-4xl font-bold mb-10"
              style={{ color: colors.text }}
              data-testid="section-our-position"
            >
              Our position
            </h2>
            <motion.p 
              className="text-2xl md:text-3xl font-semibold mb-8"
              style={{ color: colors.text }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              We are not a full-service agency.
            </motion.p>
            <motion.p 
              className="text-lg md:text-xl leading-relaxed mb-6"
              style={{ color: colors.textMuted }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              We specialise in products and the systems behind them, working as an extension of the teams we support.
            </motion.p>
            <motion.p 
              className="text-lg md:text-xl leading-relaxed"
              style={{ color: colors.textMuted }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Our focus is simple: clear design, reliable execution, and outcomes that hold up over time.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="py-10 md:py-14"
        style={{ backgroundColor: isDark ? '#08080C' : '#1A1A1A' }}
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
