import React, { useEffect, useState, useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import logoImage from "@assets/Group_69_(1)_1764854226570.png";
import heroVideo from "@assets/hero-video-horizontal.mp4";

export default function Services() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Header transforms after scrolling 150px (slower trigger)
      setIsScrolled(scrollY > 150);

      if (!heroRef.current) return;
      
      const heroHeight = heroRef.current.offsetHeight;
      const scrollThreshold = heroHeight * 0.5;
      
      // Calculate progress based on scroll position
      const progress = Math.min(Math.max(scrollY / scrollThreshold, 0), 1);
      
      setScrollProgress(progress);
      setIsExpanded(progress > 0.85);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const briefCards = [
    {
      title: "AI-first by default",
      description: "We design your product and ops with AI baked into the flow, not bolted on at the end."
    },
    {
      title: "From idea to live build",
      description: "Strategy, UX, UI, development and automation in one team for faster launches."
    },
    {
      title: "Small team, big output",
      description: "Direct access to the core builders, weekly sprints and clear updates."
    },
    {
      title: "Based in Tamil Nadu, building global",
      description: "We understand Tier-2/Tier-3 markets and ship to global product standards."
    }
  ];

  const roadmapSteps = [
    {
      step: "01",
      title: "Discover",
      description: "Deep dive into your product, customers and revenue goals. Turn a messy brief into a clear problem statement."
    },
    {
      step: "02",
      title: "Design",
      description: "UX flows, wireframes and high-fidelity UI in Figma so you see everything before we build."
    },
    {
      step: "03",
      title: "Build & Automate",
      description: "Ship marketing sites, web apps and automations using modern stacks and AI tools, connected to CRM, WhatsApp and payments."
    },
    {
      step: "04",
      title: "Launch & Grow",
      description: "Track performance, iterate quickly and run experiments instead of leaving you with a static project."
    }
  ];

  const capabilities = [
    {
      heading: "Product & UX Design",
      items: [
        "User research & journey mapping",
        "Information architecture & flows",
        "Wireframes and interaction design",
        "Design systems & UI libraries",
        "Clickable prototypes for testing"
      ]
    },
    {
      heading: "Web & App Development",
      items: [
        "High-converting landing pages & sites",
        "Web apps & dashboards (admin & client)",
        "CMS setup for blogs & case studies",
        "Performance, SEO and responsive layouts",
        "Integrations: payments, auth, subscriptions"
      ]
    },
    {
      heading: "Growth & Automation",
      items: [
        "Funnels for lead gen & sales",
        "WhatsApp, email & CRM automation",
        "AI chatbots / support agents",
        "Analytics, tracking & reporting",
        "A/B testing and experiment playbooks"
      ]
    }
  ];

  const testimonials = [
    {
      id: 1,
      quote: "Gray Solutions didn't just make our site look good. They plugged it into our CRM and WhatsApp so leads come in every day.",
      name: "Founder",
      role: "D2C Clothing Brand",
      position: "left"
    },
    {
      id: 2,
      quote: "We went from zero to a working logistics prototype in weeks. Clean UX and clear communication.",
      name: "Co-founder",
      role: "Logistics Startup",
      position: "right"
    },
    {
      id: 3,
      quote: "They helped us figure out what to build, not just how it should look.",
      name: "Director",
      role: "Construction & Infra Company",
      position: "left"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  // Calculate dynamic styles based on scroll progress (smoother, more gradual)
  const textOpacity = 1 - scrollProgress * 1.5;
  const textScale = 1 - scrollProgress * 0.2;
  const videoTranslateY = -scrollProgress * 80;
  const videoScale = 0.9 + scrollProgress * 0.1;
  const videoBorderRadius = 20 - scrollProgress * 8;

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
      {/* Fixed Header - Full width initially, transforms to floating pill on scroll */}
      <header 
        className="fixed top-0 left-0 right-0 z-50 flex justify-center"
        style={{
          height: isScrolled ? '80px' : '100px',
          backgroundColor: 'transparent',
          pointerEvents: 'none',
          transition: 'height 500ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div 
          className="flex items-center justify-center"
          style={{
            pointerEvents: 'auto',
            width: isScrolled ? '240px' : '100%',
            height: isScrolled ? '48px' : '100%',
            marginTop: isScrolled ? '16px' : '0',
            backgroundColor: isScrolled ? 'rgba(255,255,255,0.92)' : '#F6F7FA',
            backdropFilter: isScrolled ? 'blur(12px)' : 'none',
            WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
            boxShadow: isScrolled ? '0 4px 24px rgba(0,0,0,0.1)' : 'none',
            borderRadius: isScrolled ? '999px' : '0',
            padding: isScrolled ? '0 32px' : '0',
            transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* Logo Image */}
          <Link href="/">
            <img 
              src={logoImage} 
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

      {/* Hero Section with Scroll-based Video Expansion */}
      <section 
        ref={heroRef}
        className="relative min-h-[200vh]"
        style={{ backgroundColor: '#F6F7FA', paddingTop: '100px' }}
      >
        <div 
          className="sticky overflow-hidden"
          style={{
            top: isScrolled ? '80px' : '100px',
            height: isScrolled ? 'calc(100vh - 80px)' : 'calc(100vh - 100px)',
            transition: 'top 500ms cubic-bezier(0.4, 0, 0.2, 1), height 500ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <div className="max-w-[1120px] mx-auto px-6 md:px-10 h-full flex flex-col pt-8 md:pt-12">
            {/* Top: Text Content - Shrinks from bottom on scroll */}
            <div 
              className="hero-content z-10 pb-8 md:pb-12 text-left max-w-3xl"
              style={{
                opacity: Math.max(textOpacity, 0),
                transform: `scale(${Math.max(textScale, 0.8)})`,
                transformOrigin: 'left bottom',
                pointerEvents: isExpanded ? 'none' : 'auto'
              }}
            >
              <motion.h1 
                className="text-3xl md:text-5xl font-bold leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                data-testid="hero-heading"
              >
                We design, build & automate the products your customers actually use.
              </motion.h1>
            </div>

            {/* Video Card - Moves up with scroll */}
            <div 
              className="hero-media flex items-center justify-center flex-1"
              style={{
                position: isExpanded ? 'fixed' : 'relative',
                top: isExpanded ? '80px' : 'auto',
                left: isExpanded ? '24px' : 'auto',
                right: isExpanded ? '24px' : 'auto',
                bottom: isExpanded ? '24px' : 'auto',
                width: isExpanded ? 'calc(100vw - 48px)' : '100%',
                height: isExpanded ? 'calc(100vh - 104px)' : 'auto',
                zIndex: isExpanded ? 40 : 1,
                transform: `translateY(${videoTranslateY}px) scale(${videoScale})`,
                transformOrigin: 'center top',
              }}
            >
              <div
                className="w-full overflow-hidden shadow-xl"
                style={{
                  borderRadius: `${Math.max(videoBorderRadius, 12)}px`,
                  background: '#000',
                  height: isExpanded ? '100%' : 'auto',
                  maxWidth: isExpanded ? '100%' : '800px',
                }}
              >
                <div className="aspect-video w-full">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                    data-testid="hero-video"
                  >
                    <source src={heroVideo} type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Other Sections */}
      <motion.main 
        className="max-w-[1120px] mx-auto px-6 md:px-10 relative z-10"
        style={{ backgroundColor: '#F6F7FA' }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Section 2: Quick brief about us */}
        <motion.section 
          className="py-16 md:py-24"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-10"
            data-testid="section-brief"
          >
            Quick brief about us
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {briefCards.map((card, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-2xl bg-white cursor-pointer"
                style={{ 
                  border: '1px solid rgba(15,23,42,0.08)',
                  transition: 'all 180ms ease-out'
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -4, 
                  boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
                  borderColor: 'rgba(255,104,1,0.3)'
                }}
                data-testid={`brief-card-${index}`}
              >
                <h3 className="text-base font-semibold mb-3">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 3: Road Map */}
        <motion.section 
          className="py-16 md:py-24"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-10"
            data-testid="section-roadmap"
          >
            Road Map
          </motion.h2>
          <div className="bg-white rounded-3xl p-8 md:p-12" style={{ border: '1px solid rgba(15,23,42,0.08)' }}>
            {/* Desktop: Horizontal timeline */}
            <div className="hidden md:block relative">
              <div 
                className="absolute top-8 left-0 right-0 h-0.5"
                style={{ backgroundColor: 'rgba(255,104,1,0.2)' }}
              />
              <div className="grid grid-cols-4 gap-8 relative">
                {roadmapSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                    data-testid={`roadmap-step-${index}`}
                  >
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 relative z-10"
                      style={{ backgroundColor: '#FF6801' }}
                    >
                      {step.step}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            {/* Mobile: Vertical timeline */}
            <div className="md:hidden relative pl-8">
              <div 
                className="absolute left-3 top-0 bottom-0 w-0.5"
                style={{ backgroundColor: 'rgba(255,104,1,0.2)' }}
              />
              <div className="space-y-10">
                {roadmapSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    className="relative"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                  >
                    <div 
                      className="absolute -left-8 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: '#FF6801' }}
                    >
                      {step.step}
                    </div>
                    <h3 className="text-base font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 4: Capabilities */}
        <motion.section 
          className="py-16 md:py-24"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-10"
            data-testid="section-capabilities"
          >
            Capabilities
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {capabilities.map((cap, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                data-testid={`capability-column-${index}`}
              >
                <h3 className="text-xl font-semibold mb-5">
                  {cap.heading}
                </h3>
                <ul className="space-y-3">
                  {cap.items.map((item, idx) => (
                    <li 
                      key={idx}
                      className="text-sm text-gray-600 flex items-start gap-2"
                    >
                      <span style={{ color: '#FF6801' }}>•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 5: Client Testimonials */}
        <motion.section 
          className="py-16 md:py-24 pb-32"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-10"
            data-testid="section-testimonials"
          >
            Client Testimonials
          </motion.h2>
          <div className="space-y-6 md:space-y-0 md:relative md:min-h-[400px]">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className={`bg-white p-6 md:p-8 rounded-2xl md:absolute md:w-[45%] cursor-pointer ${
                  testimonial.position === 'right' ? 'md:right-0' : 'md:left-0'
                }`}
                style={{ 
                  border: '1px solid rgba(15,23,42,0.08)',
                  top: index === 0 ? '0' : index === 1 ? '80px' : '160px',
                  transition: 'all 180ms ease-out'
                }}
                initial={{ opacity: 0, x: testimonial.position === 'right' ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ 
                  y: -4, 
                  boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
                  borderColor: 'rgba(255,104,1,0.3)'
                }}
                data-testid={`testimonial-${testimonial.id}`}
              >
                <p className="text-base leading-relaxed mb-4">
                  "{testimonial.quote}"
                </p>
                <p className="text-sm text-gray-500">
                  — {testimonial.name}, {testimonial.role}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </motion.main>
    </motion.div>
  );
}
