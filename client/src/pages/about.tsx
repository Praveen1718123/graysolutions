import React, { useEffect, useState, useRef } from "react";
import { Link } from "wouter";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import logoImage from "@assets/Group_69_(1)_1764854226570.png";
import heroVideo from "@assets/From_KlickPin_CF_Red_and_White_Abstract_Wall_ArtJiayuan_Liang__1766475001318.mp4";
import benefitsVideo from "@assets/From_KlickPin_CF_by_Meloq_Arai_—_a_3D_Motion_Designer_@meloqar_1766508779038.mp4";
import numbersVideo from "@assets/From_KlickPin_CF_light_hero___abstract_flare_[Video]___Editing_1766512132613.mp4";
import contextGif from "@assets/From_KlickPin_CF_Kaldea_Visual_Identity_&_Website_Design_on_Be_1766516930656.gif";
import reliabilityGif from "@assets/From_KlickPin_CF_Kaldea_Visual_Identity_&_Website_Design_Behan_1766517492447.gif";
import refineGif from "@assets/From_KlickPin_CF_Kaldea_Visual_Identity_&_Website_Design_Behan_1766517702605.gif";
import designVideo from "@assets/From_KlickPin_CF_Abstract_gradient_geometric_shape_animation_[_1766517982162.mp4";
import positionGif from "@assets/From_KlickPin_CF_Motion_Abstract_-_V1___Motion_graphics_design_1766518454195.gif";

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
  const metricsRef = useRef(null);
  const metricsInView = useInView(metricsRef, { once: true, margin: "-100px" });
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { 
      title: "Digital Strategy & Experience", 
      description: "We map out where you want to go and build digital products that get you there. Our strategists marry data with intuition to find your biggest opportunities, then our designers craft experiences that feel human – not like some soulless app.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
      ),
    },
    { 
      title: "Brand & Identity", 
      description: "Your brand is more than colours and a logo. We help you figure out what you stand for and give you the tools to express it everywhere, from packaging to pixels. Think clear positioning, a voice with bite and visuals that stick.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
      ),
    },
    { 
      title: "Marketing & Growth", 
      description: "Performance without the snake oil. From organic search to paid social to influencer collabs, we focus on what moves the needle. We track ROI in real time and ditch channels that don't pay off, so you're not bleeding budget.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
        </svg>
      ),
    },
    { 
      title: "Technology & Automation", 
      description: "Fancy tech is useless if it doesn't make life easier. We build and integrate platforms, automation and AI so your workflows run smooth, your data is actionable and your team isn't stuck with manual grunt work.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
          <line x1="8" y1="21" x2="16" y2="21"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
      ),
    },
    { 
      title: "Content & Storytelling", 
      description: "People ignore ads but they share stories. Our writers, artists and video nerds create content people actually care about – from snappy copy and 3D visuals to interactive experiences – all tuned to resonate with your audience and reflect your brand's voice.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
        </svg>
      ),
    },
  ];

  const metrics = [
    { number: 100, suffix: "+", title: "product, design, marketing, and consulting engagements", description: "Across consumer apps, B2B platforms, retail brands, digital systems, and content ecosystems." },
    { number: 8, suffix: "+", title: "years across digital product, branding, marketing, and system design", description: "With hands-on involvement from early strategy to execution." },
    { display: "0→1", title: "launches, product redesigns, and platform-scale rebuilds", description: "Defining, designing, building, and improving products that function in real-world environments." },
    { number: 10, suffix: "+", title: "domains of experience", description: "Including consumer products, logistics, retail, SaaS, D2C brands, hospitality, and internal operational systems." },
  ];

  const howWeWork = [
    { step: "01", title: "Understand the context", description: "We examine objectives, constraints, behaviour patterns, operational realities, and commercial goals." },
    { step: "02", title: "Design & communicate with intent", description: "We shape flows, interfaces, communication systems, and visual identities for clarity, predictability, and long-term usability." },
    { step: "03", title: "Build for reliability", description: "We implement solutions that are stable, maintainable, and practical for the teams who operate them." },
    { step: "04", title: "Refine with purpose", description: "We review performance, identify friction, prioritise improvements, and adjust based on evidence — not assumptions." },
  ];

  return (
    <div 
      className="min-h-screen w-full font-sans overflow-x-hidden"
      style={{ 
        backgroundColor: '#FAFAFA',
        color: '#1A1A1A',
        fontFamily: '-apple-system, system-ui, sans-serif',
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
            boxShadow: isScrolled ? '0 4px 24px rgba(0,0,0,0.08)' : 'none',
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

      {/* Hero Section - Clean White with Video */}
      <section 
        className="relative overflow-hidden"
        style={{ 
          minHeight: '90vh',
          background: '#FFFFFF',
        }}
      >
        {/* Main content - Two column layout */}
        <div 
          className="relative z-10 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          style={{ 
            minHeight: '90vh',
            paddingTop: '100px',
            paddingBottom: '48px',
            paddingLeft: 'clamp(24px, 5vw, 80px)',
            paddingRight: 'clamp(24px, 5vw, 80px)',
          }}
        >
          {/* Left - Text content */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
              style={{
                background: '#F5F5F5',
                border: '1px solid #E5E5E5',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span 
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: '#1A1A1A' }}
              />
              <span 
                className="text-xs font-medium tracking-widest uppercase"
                style={{ color: '#1A1A1A' }}
              >
                ABOUT GRAY SOLUTIONS
              </span>
            </motion.div>

            {/* Headline - Reduced size */}
            <motion.h1 
              className="font-bold mb-5"
              style={{ 
                fontSize: 'clamp(32px, 4.5vw, 52px)',
                lineHeight: '1.1',
                color: '#1A1A1A',
                letterSpacing: '-0.02em',
              }}
              data-testid="about-hero-heading"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We design and build digital systems, brands, and communication frameworks.
            </motion.h1>

            {/* Subtext - Reduced size */}
            <motion.p 
              className="text-base md:text-lg leading-relaxed mb-8"
              style={{ color: '#666666', maxWidth: '500px' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              A product, design, technology, and consulting studio focused on clarity, reliability, and measurable outcomes.
            </motion.p>

            {/* CTA row */}
            <motion.div 
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <button 
                className="px-6 py-3 rounded-full font-medium text-sm transition-all"
                style={{ 
                  backgroundColor: '#1A1A1A', 
                  color: '#FFFFFF',
                  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.1)';
                }}
                data-testid="cta-talk-to-us"
              >
                Talk to us
              </button>
              
              <span className="hidden sm:block text-gray-300">·</span>
              
              <button 
                className="px-6 py-3 rounded-full font-medium text-sm transition-all"
                style={{ 
                  backgroundColor: 'transparent', 
                  color: '#1A1A1A',
                  border: '1px solid #E0E0E0',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.backgroundColor = '#F5F5F5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                data-testid="cta-view-work"
              >
                View our work
              </button>
            </motion.div>
          </div>

          {/* Right - Video Animation */}
          <motion.div 
            className="order-1 lg:order-2 flex justify-center lg:justify-end items-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ overflow: 'visible' }}
          >
            <div 
              className="relative"
              style={{ 
                width: '140%',
                maxWidth: '900px',
                marginRight: '-20%',
              }}
            >
              <video
                src={benefitsVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
                style={{
                  filter: 'grayscale(100%) contrast(1.2) brightness(1.05)',
                  imageRendering: 'crisp-edges',
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom divider line */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ 
            background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.06) 20%, rgba(0,0,0,0.06) 80%, transparent 100%)',
          }}
        />
      </section>

      {/* How We Think - 2 Column Section with Sticky Left */}
      <section 
        ref={howWeThinkRef}
        className="py-20 md:py-28 relative"
        style={{ backgroundColor: '#FAFAFA', minHeight: '100vh' }}
      >
        <div className="max-w-[1120px] mx-auto px-4 md:px-10">
          {/* Mobile Layout */}
          <div className="md:hidden space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span 
                className="text-sm font-medium tracking-wide mb-4 block"
                style={{ color: 'rgba(26,26,26,0.5)' }}
              >
                What We Do
              </span>
              <h2 
                className="text-2xl md:text-3xl font-bold mb-6"
                style={{ color: '#1A1A1A' }}
              >
                Our services
              </h2>
            </motion.div>
            
            <div className="space-y-5">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-xl flex gap-4"
                  style={{ 
                    backgroundColor: '#FFFFFF',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)',
                    border: '1px solid rgba(0,0,0,0.04)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  data-testid={`service-mobile-${index}`}
                >
                  <div className="flex-shrink-0 mt-0.5" style={{ color: '#1A1A1A' }}>
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold mb-2" style={{ color: '#1A1A1A' }}>
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#666666' }}>
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Desktop Layout - 2 Column with Sticky Left */}
          <div className="hidden md:grid md:grid-cols-2 gap-12 lg:gap-20">
            {/* Left Column - Sticky */}
            <div className="relative">
              <div 
                className="sticky"
                style={{ top: '120px' }}
              >
                <span 
                  className="text-sm font-medium tracking-wide mb-4 block"
                  style={{ color: 'rgba(26,26,26,0.5)' }}
                >
                  What We Do
                </span>
                <h2 
                  className="text-3xl lg:text-4xl font-bold mb-6"
                  style={{ color: '#1A1A1A' }}
                  data-testid="section-what-we-do"
                >
                  Our services
                </h2>
              </div>
            </div>

            {/* Right Column - Cards scroll naturally */}
            <div>
              <div className="space-y-8">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="p-10 rounded-2xl flex gap-5"
                    style={{ 
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)',
                      border: '1px solid rgba(0,0,0,0.04)',
                      minHeight: '220px',
                    }}
                    data-testid={`service-${index}`}
                  >
                    <div 
                      className="flex-shrink-0 mt-1"
                      style={{ color: '#1A1A1A' }}
                    >
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-3" style={{ color: '#1A1A1A' }}>
                        {service.title}
                      </h3>
                      <p className="text-base leading-relaxed" style={{ color: '#666666' }}>
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Extra space to enable sticky scroll effect */}
              <div style={{ height: '300px' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section 
        className="py-20 md:py-28 relative overflow-hidden"
        style={{ 
          background: 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 25%, #ffffff 50%, #f8f8f8 75%, #fafafa 100%)',
        }}
      >
        {/* Subtle animated gradient overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 20% 30%, rgba(0,0,0,0.02) 0%, transparent 50%), radial-gradient(ellipse 50% 30% at 80% 70%, rgba(0,0,0,0.015) 0%, transparent 50%)',
          }}
        />
        
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-10">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{
                  background: 'rgba(0, 0, 0, 0.04)',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                }}
              >
                <span 
                  className="text-xs font-semibold tracking-widest uppercase"
                  style={{ color: '#1A1A1A' }}
                >
                  KEY BENEFITS
                </span>
              </div>
            </motion.div>
            
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5"
              style={{ color: '#1A1A1A' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              data-testid="section-key-benefits"
            >
              Designed around real user behaviour
            </motion.h2>
            
            <motion.p 
              className="text-base md:text-lg max-w-xl mx-auto"
              style={{ color: '#666666' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Every interface, flow, and system we build is informed by how people actually behave.
            </motion.p>
          </div>
          
          {/* Main Benefits Card */}
          <motion.div
            className="rounded-3xl p-8 md:p-12"
            style={{
              backgroundColor: '#FFFFFF',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06), 0 12px 48px rgba(0,0,0,0.04)',
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
              {/* Left Benefits */}
              <div className="space-y-6">
                {[
                  { 
                    title: "Clear Decision Paths", 
                    description: "Reduce hesitation and confusion with predictable layouts.",
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="18" cy="18" r="3" />
                        <circle cx="6" cy="6" r="3" />
                        <path d="M6 21V9a9 9 0 0 0 9 9" />
                      </svg>
                    )
                  },
                  { 
                    title: "Reduced Friction", 
                    description: "Remove unnecessary steps and ambiguity in flows.",
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5" />
                        <path d="M6 12l-4 2" />
                        <path d="M18 12l4 2" />
                      </svg>
                    )
                  },
                  { 
                    title: "Faster Adoption", 
                    description: "Familiar patterns that users understand quickly.",
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                      </svg>
                    )
                  },
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex gap-4 p-4 rounded-xl transition-all duration-200 cursor-default"
                    style={{ backgroundColor: 'transparent' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    whileHover={{ 
                      y: -2, 
                      backgroundColor: 'rgba(0, 0, 0, 0.02)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                    }}
                    data-testid={`benefit-left-${index}`}
                  >
                    <motion.div 
                      className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ 
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      }}
                      whileHover={{ 
                        backgroundColor: 'rgba(0, 0, 0, 0.08)',
                      }}
                    >
                      {benefit.icon}
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-base mb-1" style={{ color: '#1A1A1A' }}>
                        {benefit.title}
                      </h4>
                      <p className="text-sm" style={{ color: '#666666' }}>
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Center Visual */}
              <motion.div 
                className="hidden lg:flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div 
                  className="w-full h-full min-h-[280px] rounded-2xl relative overflow-hidden"
                  style={{
                    background: '#f5f5f5',
                  }}
                >
                  <video
                    src={heroVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover absolute inset-0"
                    style={{
                      filter: 'grayscale(100%) contrast(1.1)',
                    }}
                  />
                </div>
              </motion.div>
              
              {/* Right Benefits */}
              <div className="space-y-6">
                {[
                  { 
                    title: "Consistent Experience", 
                    description: "Align brand, UI, and messaging across touchpoints.",
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                      </svg>
                    )
                  },
                  { 
                    title: "Operational Readiness", 
                    description: "Works for both users and operators in real conditions.",
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="M9 12l2 2 4-4" />
                      </svg>
                    )
                  },
                  { 
                    title: "Measurable Impact", 
                    description: "Improve engagement, efficiency, and conversion outcomes.",
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                        <polyline points="17 6 23 6 23 12" />
                      </svg>
                    )
                  },
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex gap-4 p-4 rounded-xl transition-all duration-200 cursor-default"
                    style={{ backgroundColor: 'transparent' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    whileHover={{ 
                      y: -2, 
                      backgroundColor: 'rgba(0, 0, 0, 0.02)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                    }}
                    data-testid={`benefit-right-${index}`}
                  >
                    <motion.div 
                      className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ 
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      }}
                      whileHover={{ 
                        backgroundColor: 'rgba(0, 0, 0, 0.08)',
                      }}
                    >
                      {benefit.icon}
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-base mb-1" style={{ color: '#1A1A1A' }}>
                        {benefit.title}
                      </h4>
                      <p className="text-sm" style={{ color: '#666666' }}>
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* By the Numbers - Full Width Stats Strip */}
      <section 
        ref={metricsRef}
        className="py-16 md:py-24 relative overflow-hidden"
        style={{ backgroundColor: '#1A1A1A' }}
      >
        {/* Video Background */}
        <video
          src={numbersVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full"
          style={{
            filter: 'grayscale(100%) contrast(1.1)',
            objectFit: 'cover',
            objectPosition: 'center center',
            minWidth: '100%',
            minHeight: '100%',
          }}
        />
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-2xl md:text-3xl font-bold mb-3"
              style={{ color: '#FFFFFF' }}
              data-testid="section-by-the-numbers"
            >
              By the numbers
            </h2>
            <p 
              className="text-base"
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              We measure ourselves by consistency, clarity, and the outcomes we enable.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-xl"
                style={{ 
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                data-testid={`metric-${index}`}
              >
                <div 
                  className="text-4xl md:text-5xl font-bold mb-3"
                  style={{ color: '#FFFFFF' }}
                >
                  {metric.display ? (
                    metric.display
                  ) : (
                    <CountUpNumber value={metric.number!} suffix={metric.suffix} inView={metricsInView} />
                  )}
                </div>
                <p 
                  className="text-sm font-medium mb-2"
                  style={{ color: 'rgba(255,255,255,0.9)' }}
                >
                  {metric.title}
                </p>
                <p 
                  className="text-xs leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                >
                  {metric.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work - 4-Box Bento Grid */}
      <section 
        className="py-20 md:py-28"
        style={{ backgroundColor: '#FAFAFA' }}
      >
        <div className="max-w-[1120px] mx-auto px-4 md:px-10">
          <motion.div
            className="mb-14"
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
              style={{ color: '#666666' }}
            >
              Our process is structured, deliberate, and consistent across brand, product, and engineering assignments.
            </p>
          </motion.div>
          
          {/* 2x2 Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {howWeWork.map((item, index) => (
              <motion.div
                key={index}
                className="rounded-3xl overflow-hidden cursor-default bg-white"
                initial={{ opacity: 0.4, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                whileHover={{ 
                  y: -4,
                  transition: { duration: 0.2 }
                }}
                data-testid={`how-we-work-step-${index}`}
              >
                {/* Visual Area with Gradient BG */}
                <div 
                  className="w-full relative overflow-hidden flex items-center justify-center"
                  style={{ 
                    height: '300px',
                    background: index === 0 
                      ? 'linear-gradient(135deg, #e8f4f8 0%, #d4e8f0 30%, #c9dce8 60%, #bdd0e0 100%)'
                      : index === 1
                      ? 'linear-gradient(135deg, #f0e8f8 0%, #e4d4f0 30%, #dac9e8 60%, #d0bde0 100%)'
                      : index === 2
                      ? 'linear-gradient(135deg, #e8f0e8 0%, #d8e8d4 30%, #cce0c9 60%, #c0d8bd 100%)'
                      : 'linear-gradient(135deg, #f8f0e8 0%, #f0e4d4 30%, #e8dac9 60%, #e0d0bd 100%)',
                  }}
                >
                  {/* Background decorative elements */}
                  <div 
                    className="absolute right-[-40px] top-[-20px] w-[180px] h-[220px] rounded-3xl opacity-30"
                    style={{ 
                      background: 'rgba(255,255,255,0.5)',
                      transform: 'rotate(12deg)',
                    }}
                  />
                  <div 
                    className="absolute left-[-30px] bottom-[-40px] w-[140px] h-[160px] rounded-3xl opacity-20"
                    style={{ 
                      background: 'rgba(255,255,255,0.6)',
                      transform: 'rotate(-8deg)',
                    }}
                  />
                  
                  {/* Card 1: GIF Animation with Black Ball */}
                  {index === 0 && (
                    <div 
                      className="absolute inset-0 flex items-center justify-center overflow-hidden"
                      style={{ background: '#FFFFFF' }}
                    >
                      <img 
                        src={contextGif}
                        alt="Context animation"
                        className="w-full h-full object-cover"
                        style={{ 
                          filter: 'grayscale(100%) contrast(1.2) brightness(0.9)',
                        }}
                      />
                    </div>
                  )}
                  
                  {/* Card 2: Video Animation - Design & Communicate */}
                  {index === 1 && (
                    <div 
                      className="absolute inset-0 flex items-center justify-center overflow-hidden"
                      style={{ background: '#FFFFFF' }}
                    >
                      <video
                        src={designVideo}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                        style={{ 
                          filter: 'grayscale(100%) contrast(1.2) brightness(0.9)',
                        }}
                      />
                    </div>
                  )}
                  
                  {/* Card 3: GIF Animation - Build for Reliability */}
                  {index === 2 && (
                    <div 
                      className="absolute inset-0 flex items-center justify-center overflow-hidden"
                      style={{ background: '#FFFFFF' }}
                    >
                      <img 
                        src={reliabilityGif}
                        alt="Reliability animation"
                        className="w-full h-full object-cover"
                        style={{ 
                          filter: 'grayscale(100%) contrast(1.2) brightness(0.9)',
                        }}
                      />
                    </div>
                  )}
                  
                  {/* Card 4: GIF Animation - Refine with Purpose */}
                  {index === 3 && (
                    <div 
                      className="absolute inset-0 flex items-center justify-center overflow-hidden"
                      style={{ background: '#FFFFFF' }}
                    >
                      <img 
                        src={refineGif}
                        alt="Refine animation"
                        className="w-full h-full object-cover"
                        style={{ 
                          filter: 'grayscale(100%) contrast(1.2) brightness(0.9)',
                        }}
                      />
                    </div>
                  )}
                </div>
                
                {/* Text Content */}
                <div className="p-6">
                  <h3 
                    className="text-xl font-bold mb-2"
                    style={{ color: '#1A1A1A' }}
                  >
                    {item.title}
                  </h3>
                  <p 
                    className="text-sm leading-relaxed"
                    style={{ color: '#555555' }}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Position - Two Column CTA */}
      <section 
        className="py-20 md:py-28"
        style={{ backgroundColor: '#f5f5f5' }}
      >
        <div className="max-w-[1120px] mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Pill Label */}
              <div 
                className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase mb-6"
                style={{ backgroundColor: '#e8e8e8', color: '#555555' }}
              >
                Our Position
              </div>
              
              <h2 
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
                style={{ color: '#1A1A1A' }}
                data-testid="section-our-position"
              >
                We're Not a
                <br />
                Traditional Agency
              </h2>
              
              <p 
                className="text-base md:text-lg leading-relaxed mb-8"
                style={{ color: '#555555' }}
              >
                We align design, engineering, and business thinking under one roof to build products, brands, and communication systems that deliver clear outcomes.
              </p>
              
              {/* Buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                  style={{ 
                    backgroundColor: '#1A1A1A', 
                    color: '#FFFFFF',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                  }}
                  data-testid="button-get-started"
                >
                  Get Started
                </a>
                <a
                  href="#work"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                  style={{ 
                    backgroundColor: 'transparent', 
                    color: '#1A1A1A',
                    border: '1.5px solid #d0d0d0'
                  }}
                  data-testid="button-view-work"
                >
                  View Our Work
                </a>
              </div>
            </motion.div>
            
            {/* Right: Image with Floating Card */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Main Image Container */}
              <div 
                className="relative rounded-2xl overflow-hidden"
                style={{ 
                  aspectRatio: '4/3',
                  backgroundColor: '#000000'
                }}
              >
                <img 
                  src={positionGif}
                  alt="Abstract motion animation"
                  className="w-full h-full"
                  style={{ 
                    filter: 'hue-rotate(180deg) saturate(0)',
                    objectFit: 'cover',
                    objectPosition: 'center 30%',
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="py-10 md:py-14"
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
    </div>
  );
}
