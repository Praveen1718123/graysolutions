import React, { useEffect, useState, useRef } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import logoImage from "@assets/Group_69_(1)_1764854226570.png";
import heroVideo from "@assets/hero-video-horizontal.mp4";

export default function Services() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeService, setActiveService] = useState(1);
  const heroRef = useRef<HTMLElement>(null);

  const servicesTiles = [
    { 
      id: 0, number: "01", title: "Strategy & Positioning",
      details: ["Offer & package design", "ICP & buyer persona clarity", "Brand positioning & messaging", "Customer journey & funnel mapping"],
    },
    { 
      id: 1, number: "02", title: "Product & UX Design",
      details: ["UX / UI design for web & apps", "User flows, wireframes & prototypes", "Design systems & component libraries", "Usability reviews & iteration"],
    },
    { 
      id: 2, number: "03", title: "Websites & Experience",
      details: ["Marketing sites & service websites", "Conversion-focused landing pages", "Sales pages for launches & campaigns", "CMS setup (blogs, case studies, resources)"],
    },
    { 
      id: 3, number: "04", title: "Funnels & Systems",
      details: ["Lead capture → nurture → booking flows", "CRM setup & pipeline structure", "Form, payment & booking integrations", "Analytics, tracking & dashboards"],
    },
    { 
      id: 4, number: "05", title: "Content & Performance",
      details: ["Content & social media strategy", "Website & landing page copywriting", "Email / WhatsApp campaigns", "Performance review & optimisation"],
    },
  ];

  const CircleDots = ({ animate = false }: { animate?: boolean }) => (
    <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
      <g>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const angle = (i * 45 - 90) * (Math.PI / 180);
          const cx = 50 + 35 * Math.cos(angle);
          const cy = 50 + 35 * Math.sin(angle);
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={8}
              fill="#1a1a1a"
              style={animate ? {
                animation: `dotPulse 1.5s ease-in-out ${i * 0.15}s infinite`,
              } : {}}
            />
          );
        })}
      </g>
    </svg>
  );

  const LoadingSpinner = ({ animate = false }: { animate?: boolean }) => (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 100 100" 
      fill="none"
      style={animate ? { animation: 'spinSlow 8s linear infinite' } : {}}
    >
      <g>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const angle = (i * 45 - 90) * (Math.PI / 180);
          const cx = 50 + 35 * Math.cos(angle);
          const cy = 50 + 35 * Math.sin(angle);
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={8}
              fill="#1a1a1a"
              style={animate ? {
                transformOrigin: `${cx}px ${cy}px`,
                animation: `waveScale 2s ease-in-out ${i * 0.25}s infinite`,
              } : {}}
            />
          );
        })}
      </g>
    </svg>
  );

  const workflowSteps = [
    { id: 0, number: "01", title: "Brainstorm", description: "Explore ideas and understand your vision and goals." },
    { id: 1, number: "02", title: "Define", description: "Clarify scope, requirements, and success metrics." },
    { id: 2, number: "03", title: "Design", description: "Create wireframes, prototypes, and visual designs." },
    { id: 3, number: "04", title: "Build", description: "Develop and test with agile sprints and iterations." },
    { id: 4, number: "05", title: "Launch & Optimize", description: "Deploy, monitor, and continuously improve." },
  ];

  const roadmapRef = useRef<HTMLElement>(null);
  const { scrollYProgress: roadmapProgress } = useScroll({
    target: roadmapRef,
    offset: ["start start", "end end"]
  });
  const smoothRoadmapProgress = useSpring(roadmapProgress, { stiffness: 80, damping: 25 });
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    return smoothRoadmapProgress.on("change", (v) => {
      const step = Math.min(4, Math.floor(v * 5));
      setCurrentStep(step);
    });
  }, [smoothRoadmapProgress]);

  // Framer Motion scroll tracking for smooth animations
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Smooth spring for video scale
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Transform values based on scroll progress
  // Text slides up and fades out quickly
  const textTranslateY = useTransform(smoothProgress, [0, 0.15], [0, -150]);
  const textOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);
  
  // Video expands to full screen and stays there
  // 0-20%: video scales up and moves to center
  // 20-100%: video stays fullscreen (user continues scrolling but video is fixed)
  const videoScale = useTransform(smoothProgress, [0, 0.2, 1], [0.7, 1.4, 1.4]);
  const videoTranslateY = useTransform(smoothProgress, [0, 0.2, 1], [0, -30, -30]);
  const videoBorderRadius = useTransform(smoothProgress, [0, 0.15, 0.2], [24, 4, 0]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Header transforms after scrolling 150px
      setIsScrolled(scrollY > 150);
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
        className="relative"
        style={{ backgroundColor: '#F6F7FA', paddingTop: '100px', height: '300vh' }}
      >
        <div 
          className="sticky overflow-hidden"
          style={{
            top: isScrolled ? '80px' : '100px',
            height: isScrolled ? 'calc(100vh - 80px)' : 'calc(100vh - 100px)',
            transition: 'top 500ms cubic-bezier(0.4, 0, 0.2, 1), height 500ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <div className="max-w-[1120px] mx-auto px-6 md:px-10 h-full flex flex-col pt-8">
            {/* Text Content - Slides up and fades out */}
            <motion.div 
              className="hero-content z-10 pb-8 text-left max-w-3xl"
              style={{
                opacity: textOpacity,
                y: textTranslateY,
              }}
            >
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                data-testid="hero-heading"
              >
                We design, build & automate the products your customers actually use.
              </motion.h1>
            </motion.div>

            {/* Video Card - Expands to full screen */}
            <div className="hero-media flex items-center justify-center flex-1">
              <motion.div
                className="overflow-hidden"
                style={{
                  background: '#000',
                  width: '100vw',
                  scale: videoScale,
                  y: videoTranslateY,
                  borderRadius: videoBorderRadius,
                  transformOrigin: 'center center',
                  boxShadow: '0 25px 80px rgba(0,0,0,0.15)',
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
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Horizontal Tiles */}
      <section 
        className="relative z-10 py-16 md:py-24"
        style={{ backgroundColor: '#F6F7FA' }}
      >
        <div className="mx-auto" style={{ padding: '0 12px' }}>
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-10 px-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            data-testid="section-capabilities"
          >
            Capabilities
          </motion.h2>
          
          {/* Desktop: Horizontal tiles */}
          <div className="hidden md:flex gap-2 items-stretch w-full">
            {servicesTiles.map((service) => {
              const isActive = activeService === service.id;
              return (
                <div
                  key={service.id}
                  className="cursor-pointer overflow-hidden flex flex-col relative"
                  onClick={() => setActiveService(service.id)}
                  onMouseEnter={() => setActiveService(service.id)}
                  style={{
                    flex: isActive ? '2.5' : '1',
                    height: '400px',
                    backgroundColor: isActive ? '#FFFFFF' : '#F0F1F4',
                    borderRadius: '24px',
                    boxShadow: isActive ? '0 20px 60px rgba(0,0,0,0.12)' : 'none',
                    transition: 'flex 350ms cubic-bezier(0.25, 0.1, 0.25, 1), background-color 200ms ease, box-shadow 200ms ease',
                    willChange: 'flex',
                    transform: 'translateZ(0)',
                  }}
                  data-testid={`service-tile-${service.id}`}
                >
                  {/* Active/Hover state content */}
                  <div 
                    className="flex flex-col h-full absolute inset-0 p-6 overflow-hidden"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transition: 'opacity 250ms ease',
                      pointerEvents: isActive ? 'auto' : 'none',
                    }}
                  >
                    {/* Title at top */}
                    <h3 className="text-lg font-bold mb-4 relative z-10">
                      {service.title}
                    </h3>
                    
                    {/* Details list */}
                    <ul className="space-y-2 relative z-10 flex-1">
                      {service.details.map((detail, idx) => (
                        <li 
                          key={idx}
                          className="text-sm text-gray-600"
                        >
                          {detail}
                        </li>
                      ))}
                    </ul>
                    
                    {/* Bottom row: Number left, animated dots right */}
                    <div className="flex items-end justify-between mt-4">
                      <span 
                        className="text-6xl font-bold"
                        style={{ color: 'rgba(15,23,42,0.08)' }}
                      >
                        {service.number}
                      </span>
                      <div style={{ width: '100px', height: '100px' }}>
                        {service.id === 4 ? (
                          <LoadingSpinner animate={isActive} />
                        ) : (
                          <CircleDots animate={isActive} />
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Normal/Resting state content */}
                  <div 
                    className="flex flex-col h-full p-6 absolute inset-0"
                    style={{
                      opacity: isActive ? 0 : 1,
                      transition: 'opacity 250ms ease',
                      pointerEvents: isActive ? 'none' : 'auto',
                    }}
                  >
                    {/* Number at top */}
                    <span 
                      className="text-6xl font-bold mb-4"
                      style={{ color: 'rgba(15,23,42,0.15)' }}
                    >
                      {service.number}
                    </span>
                    
                    {/* Title below number */}
                    <h3 
                      className="text-lg font-bold leading-tight mb-auto"
                      style={{ color: 'rgba(15,23,42,0.9)' }}
                    >
                      {service.title}
                    </h3>
                    
                    {/* Static dots at bottom */}
                    <div className="flex justify-center" style={{ width: '100%', height: '100px' }}>
                      <div style={{ width: '100px', height: '100px' }}>
                        {service.id === 4 ? (
                          <LoadingSpinner animate={false} />
                        ) : (
                          <CircleDots animate={false} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile: Horizontal scroll slider */}
          <div className="md:hidden overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex gap-4" style={{ width: 'max-content' }}>
              {servicesTiles.map((service) => (
                <motion.div
                  key={service.id}
                  className="cursor-pointer overflow-hidden flex flex-col"
                  onClick={() => setActiveService(service.id)}
                  style={{
                    width: '260px',
                    height: '360px',
                    backgroundColor: activeService === service.id ? '#FFFFFF' : '#F0F1F4',
                    borderRadius: '24px',
                    boxShadow: activeService === service.id ? '0 20px 60px rgba(0,0,0,0.12)' : 'none',
                    transition: 'all 300ms ease-out',
                    flexShrink: 0,
                  }}
                  data-testid={`service-tile-mobile-${service.id}`}
                >
                  <div className="flex flex-col h-full">
                    {/* Visual placeholder */}
                    <div 
                      className="flex-1 m-4 mb-0 rounded-xl flex items-center justify-center"
                      style={{ 
                        background: activeService === service.id 
                          ? 'linear-gradient(135deg, #FF6801 0%, #FF8534 100%)'
                          : 'rgba(15,23,42,0.06)',
                        minHeight: '160px'
                      }}
                    >
                      <span 
                        className="text-5xl font-bold"
                        style={{ 
                          color: activeService === service.id ? 'rgba(255,255,255,0.3)' : 'rgba(15,23,42,0.15)'
                        }}
                      >
                        {service.number}
                      </span>
                    </div>
                    {/* Content */}
                    <div className="p-5">
                      <span 
                        className="text-sm font-medium mb-1 block"
                        style={{ color: activeService === service.id ? '#FF6801' : 'rgba(15,23,42,0.4)' }}
                      >
                        {service.number}.
                      </span>
                      <h3 className="text-base font-semibold mb-2">
                        {service.title}
                      </h3>
                      <p 
                        className="text-sm leading-relaxed"
                        style={{ color: activeService === service.id ? 'rgba(15,23,42,0.7)' : 'rgba(15,23,42,0.5)' }}
                      >
                        {service.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Roadmap Section - Dark with diagonal path */}
      <section 
        ref={roadmapRef}
        className="relative z-10"
        style={{ height: '400vh' }}
      >
        <div 
          className="sticky top-0 w-full overflow-hidden"
          style={{ 
            height: '100vh',
            background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
          }}
        >
          {/* Subtle grid pattern overlay */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Section Title */}
          <div className="absolute top-8 left-0 right-0 z-20 px-8 md:px-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Our Workflow
            </h2>
          </div>

          {/* SVG Diagonal Path - Top Left to Bottom Right */}
          <svg 
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1000 600"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF6801" />
                <stop offset="50%" stopColor="#FF8534" />
                <stop offset="100%" stopColor="#FFB366" />
              </linearGradient>
              <filter id="glowFilter">
                <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="softGlow">
                <feGaussianBlur stdDeviation="3" result="blur"/>
                <feMerge>
                  <feMergeNode in="blur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Background path (dim) - Diagonal S-curve */}
            <path
              d="M 50 80 C 200 80, 250 180, 300 200 C 400 240, 450 320, 550 340 C 650 360, 700 420, 800 450 C 850 470, 900 520, 950 540"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            
            {/* Animated glowing path */}
            <motion.path
              d="M 50 80 C 200 80, 250 180, 300 200 C 400 240, 450 320, 550 340 C 650 360, 700 420, 800 450 C 850 470, 900 520, 950 540"
              fill="none"
              stroke="url(#pathGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#softGlow)"
              style={{
                pathLength: smoothRoadmapProgress,
              }}
            />

            {/* Glowing orb that follows the path */}
            <motion.circle
              r="14"
              fill="#FF6801"
              filter="url(#glowFilter)"
              style={{
                offsetPath: "path('M 50 80 C 200 80, 250 180, 300 200 C 400 240, 450 320, 550 340 C 650 360, 700 420, 800 450 C 850 470, 900 520, 950 540')",
                offsetDistance: useTransform(smoothRoadmapProgress, [0, 1], ["0%", "100%"]),
              }}
            />

            {/* Checkpoint markers at each step */}
            {[
              { x: 50, y: 80 },
              { x: 300, y: 200 },
              { x: 550, y: 340 },
              { x: 800, y: 450 },
              { x: 950, y: 540 },
            ].map((pos, i) => (
              <g key={i}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="6"
                  fill={currentStep >= i ? '#FF6801' : 'rgba(255,255,255,0.15)'}
                  style={{ transition: 'fill 400ms ease' }}
                />
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="12"
                  fill="none"
                  stroke={currentStep >= i ? 'rgba(255,104,1,0.5)' : 'rgba(255,255,255,0.08)'}
                  strokeWidth="2"
                  style={{ transition: 'stroke 400ms ease' }}
                />
              </g>
            ))}
          </svg>

          {/* Step Cards - Positioned along diagonal */}
          <div className="absolute inset-0 px-8 md:px-16 py-24">
            {workflowSteps.map((step, index) => {
              const isVisible = currentStep >= index;
              const isCurrent = currentStep === index;
              const cardPositions = [
                { left: '2%', top: '8%' },
                { left: '22%', top: '25%' },
                { left: '42%', top: '42%' },
                { left: '62%', top: '58%' },
                { left: '78%', top: '72%' },
              ];
              return (
                <div
                  key={step.id}
                  className="absolute"
                  style={{
                    left: cardPositions[index].left,
                    top: cardPositions[index].top,
                    opacity: isVisible ? 1 : 0.2,
                    transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.95)',
                    transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
                    zIndex: isCurrent ? 10 : 5,
                  }}
                  data-testid={`workflow-step-${index}`}
                >
                  <div 
                    className="p-5 rounded-2xl backdrop-blur-lg"
                    style={{
                      backgroundColor: isCurrent ? 'rgba(255,104,1,0.15)' : 'rgba(255,255,255,0.06)',
                      border: isCurrent ? '1px solid rgba(255,104,1,0.4)' : '1px solid rgba(255,255,255,0.1)',
                      boxShadow: isCurrent ? '0 20px 40px rgba(255,104,1,0.15)' : 'none',
                      minWidth: '200px',
                      maxWidth: '240px',
                      transition: 'all 400ms ease',
                    }}
                  >
                    <span 
                      className="text-xs font-bold tracking-wider block mb-2"
                      style={{ color: isCurrent ? '#FF6801' : 'rgba(255,104,1,0.6)' }}
                    >
                      {step.number}
                    </span>
                    <h3 
                      className="text-lg font-semibold mb-2"
                      style={{ color: isCurrent ? '#FFFFFF' : 'rgba(255,255,255,0.8)' }}
                    >
                      {step.title}
                    </h3>
                    <p 
                      className="text-sm leading-relaxed"
                      style={{ color: isCurrent ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.4)' }}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-3">
            {workflowSteps.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: currentStep === i ? '24px' : '8px',
                  height: '8px',
                  backgroundColor: currentStep >= i ? '#FF6801' : 'rgba(255,255,255,0.2)',
                }}
              />
            ))}
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
