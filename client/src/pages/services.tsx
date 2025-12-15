import React, { useEffect, useState, useRef } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import logoImage from "@assets/Group_69_(1)_1764854226570.png";
import heroVideo from "@assets/hero-video-horizontal.mp4";
import compassImage from "@assets/c53171da-9385-4eea-af3f-e82d8076d9aa_1765809639059.png";
import engineImage from "@assets/ChatGPT_Image_Dec_15,_2025,_03_52_30_PM_1765795987686.png";
import designVideo from "@assets/From_KlickPin_CF_Pushing_the_Boundaries_of_Visual_Storytelling_1765809580084.mp4";

export default function Services() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  const [expandedCapability, setExpandedCapability] = useState<number | null>(null);

  const capabilitiesData = [
    {
      id: 0,
      title: "Brand design",
      description: "Building brands that look premium, sound clear, and stay consistent everywhere — from first impression to repeat purchase.",
      items: [
        { title: "Brand strategy & positioning", desc: "Defining your category, audience, and 'why us' so your brand isn't just another option." },
        { title: "Naming & messaging systems", desc: "Naming, tone of voice, taglines, and message hierarchy that sells without sounding salesy." },
        { title: "Visual identity systems", desc: "Logo direction, typography, color, layouts, and guidelines that scale across teams and platforms." },
        { title: "Brand design kits", desc: "Reusable templates for social, decks, proposals, and internal docs — consistent by default." },
        { title: "Packaging & product presentation", desc: "Packaging, labels, and product visuals designed to look trustable on shelf and online." },
        { title: "Creative direction", desc: "A clear visual lane for shoots, reels, ads, and web — so everything feels like one brand." },
      ]
    },
    {
      id: 1,
      title: "Product & experience design",
      description: "Reimagining how people interact with your brand through digital products and experiences that drive business and human impact.",
      items: [
        { title: "Solutions design & consulting", desc: "Defining technology strategies to operationalize new solutions and capabilities." },
        { title: "Product strategy & vision", desc: "Identifying product opportunities, prioritizing the right bets, and shaping the roadmap." },
        { title: "Experience design & development", desc: "Designing and validating flows fast — from wireframes to high-fidelity UI." },
        { title: "AI product strategy & development", desc: "LLM integrations, agent workflows, and AI features designed like real product—not demos." },
        { title: "Commerce experience design", desc: "Conversion-first shopping experiences across web, mobile, and marketplaces." },
        { title: "Design systems & components", desc: "A scalable UI kit that keeps your product consistent and speeds up development." },
      ]
    },
    {
      id: 2,
      title: "Web & platform solutions",
      description: "Modern websites and platforms built to load fast, scale clean, and convert without chaos.",
      items: [
        { title: "Websites & landing pages", desc: "High-end marketing sites that are performance-first and conversion-ready." },
        { title: "Web applications & dashboards", desc: "Admin panels, portals, and internal tools built for clarity and speed." },
        { title: "MVP builds", desc: "Ship the first version fast with the right architecture to evolve later." },
        { title: "Integrations & workflows", desc: "Payments, CRM, WhatsApp, email, forms, analytics — connected end-to-end." },
        { title: "Performance & SEO foundation", desc: "Technical SEO, structure, speed, and accessibility baked in from day one." },
        { title: "Maintenance & iteration", desc: "Ongoing improvements, new pages/features, fixes, and optimization cycles." },
      ]
    },
    {
      id: 3,
      title: "Commerce design & Shopify",
      description: "Storefronts that feel premium and convert — with a backend setup that won't break later.",
      items: [
        { title: "Shopify setup & structure", desc: "Collections, navigation, policies, shipping, taxes, and clean store architecture." },
        { title: "Theme customization", desc: "High-quality UI polish on a reliable theme (no bloated hacks)." },
        { title: "Product page optimization", desc: "Better PDP layout, trust elements, sizing logic, upsells, and clarity." },
        { title: "Checkout & funnel improvements", desc: "Reduce drop-offs with smarter flows, offers, and friction removal." },
        { title: "Automations & retention", desc: "Abandoned cart, post-purchase flows, basic segmentation, and lifecycle journeys." },
        { title: "Analytics & tracking", desc: "Pixel setup + clean measurement so your ads/decisions aren't guessing." },
      ]
    },
    {
      id: 4,
      title: "Content & performance marketing",
      description: "Creative + distribution as a system — built to generate demand, not just 'posts'.",
      items: [
        { title: "Content strategy & calendar", desc: "What to post, why it matters, and how it maps to business outcomes." },
        { title: "Creative production", desc: "Reels, carousels, ad creatives, brand videos — designed to stop scroll." },
        { title: "Performance ads (Meta/Google)", desc: "Testing frameworks, targeting, creative iterations, and funnel alignment." },
        { title: "Landing page conversion", desc: "Ad → landing → conversion improvements that move numbers." },
        { title: "Personal branding content", desc: "Founder-led content that builds trust, authority, and inbound leads." },
        { title: "Reporting & optimization", desc: "Simple insights, real next steps, and continuous iteration cycles." },
      ]
    },
    {
      id: 5,
      title: "AI agents & automation",
      description: "AI that reduces work, speeds up ops, and feels native to your business.",
      items: [
        { title: "Lead response agents", desc: "Instant replies, qualification, and routing across WhatsApp/web/email." },
        { title: "Support & FAQ bots", desc: "Knowledge-based support that actually answers and escalates cleanly." },
        { title: "Internal assistants", desc: "Ops, sales, HR, and finance helpers that summarize, draft, and execute workflows." },
        { title: "RAG + knowledge systems", desc: "Your docs, SOPs, and databases turned into a searchable 'company brain'." },
        { title: "Automation pipelines", desc: "Zapier/Make/custom workflows to remove repetitive tasks end-to-end." },
        { title: "AI productization", desc: "Turn your workflows into a sellable AI feature or standalone product." },
      ]
    },
  ];

  const whatWeDoTiles = [
    { 
      id: 0, 
      headline: "When a clear direction is required before work begins",
      subtext: "We help define strategy, positioning, and clarity before diving into execution.",
      image: compassImage,
      video: null,
      gradient: "linear-gradient(180deg, #E0F4FF 0%, #B8E6FF 100%)",
    },
    { 
      id: 1, 
      headline: "When an interface needs to be designed with clarity and precision",
      subtext: "We craft intuitive UX flows, wireframes, and high-fidelity designs that users love.",
      image: null,
      video: designVideo,
      gradient: "linear-gradient(180deg, #E8E8E8 0%, #C8C8C8 100%)",
    },
    { 
      id: 2, 
      headline: "When a digital product or system needs to be built and made operational",
      subtext: "We develop websites, apps, and automations using modern technology stacks.",
      image: engineImage,
      video: null,
      gradient: "linear-gradient(180deg, #FFE8D6 0%, #FFD4B8 100%)",
    },
    { 
      id: 3, 
      headline: "When an existing experience needs improvement or performance correction",
      subtext: "We optimize and iterate on existing products to improve performance and user satisfaction.",
      image: null,
      video: null,
      gradient: "linear-gradient(180deg, #E6FFE6 0%, #C8F0C8 100%)",
    },
  ];

  const workflowSteps = [
    { 
      id: 0, 
      title: "Discover", 
      description: "Deep dive into your product, customers and revenue goals. Turn a messy brief into a clear problem statement." 
    },
    { 
      id: 1, 
      title: "Design", 
      description: "UX flows, wireframes and high-fidelity UI in Figma so you see everything before we build." 
    },
    { 
      id: 2, 
      title: "Build", 
      description: "Ship marketing sites, web apps and automations using modern stacks and AI tools, connected to CRM, WhatsApp and payments." 
    },
    { 
      id: 3, 
      title: "Launch", 
      description: "Track performance, iterate quickly and run experiments instead of leaving you with a static project." 
    },
  ];

  const WorkflowIcon = ({ step }: { step: number }) => {
    const icons = [
      // Discover - square with diagonal lines
      <svg key={0} width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="8" y="8" width="32" height="32" />
        <line x1="8" y1="8" x2="40" y2="40" />
        <line x1="8" y1="20" x2="28" y2="40" strokeDasharray="2 2" />
        <line x1="20" y1="8" x2="40" y2="28" strokeDasharray="2 2" />
      </svg>,
      // Design - paper plane folded
      <svg key={1} width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M24 8 L40 40 L24 32 L8 40 Z" />
        <line x1="24" y1="8" x2="24" y2="32" />
        <line x1="24" y1="20" x2="8" y2="40" strokeDasharray="2 2" />
      </svg>,
      // Build - 3D paper plane
      <svg key={2} width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 20 L24 8 L40 20 L24 32 Z" />
        <path d="M24 32 L24 44 L8 32 L8 20" />
        <path d="M24 32 L24 44 L40 32 L40 20" />
        <line x1="24" y1="8" x2="24" y2="32" strokeDasharray="2 2" />
      </svg>,
      // Launch - paper airplane flying
      <svg key={3} width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 40 L40 8 L32 24 L20 28 Z" />
        <path d="M20 28 L24 40 L32 24" />
        <line x1="8" y1="40" x2="20" y2="28" />
      </svg>,
    ];
    return icons[step];
  };

  const roadmapRef = useRef<HTMLElement>(null);
  const { scrollYProgress: roadmapProgress } = useScroll({
    target: roadmapRef,
    offset: ["start start", "end end"]
  });
  const smoothRoadmapProgress = useSpring(roadmapProgress, { stiffness: 80, damping: 25 });
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    return smoothRoadmapProgress.on("change", (v) => {
      const step = Math.min(3, Math.floor(v * 4));
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

      {/* What We Do Section - 4 Tiles with Hover Expand */}
      <section 
        className="relative z-10 py-16 md:py-24"
        style={{ backgroundColor: '#F6F7FA' }}
      >
        <div className="mx-auto px-3 md:px-6">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-10 px-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            data-testid="section-what-we-do"
          >
            What we do
          </motion.h2>
          
          {/* Desktop: Horizontal tiles with hover expand */}
          <div className="hidden md:flex gap-2 items-stretch w-full">
            {whatWeDoTiles.map((tile) => {
              const isActive = activeService === tile.id;
              return (
                <div
                  key={tile.id}
                  className="cursor-pointer overflow-hidden flex flex-col relative"
                  onClick={() => setActiveService(tile.id)}
                  onMouseEnter={() => setActiveService(tile.id)}
                  style={{
                    flex: isActive ? '2.5' : '1',
                    height: '420px',
                    background: tile.gradient,
                    borderRadius: '24px',
                    boxShadow: isActive ? '0 20px 60px rgba(0,0,0,0.12)' : 'none',
                    transition: 'flex 350ms cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 200ms ease',
                    willChange: 'flex',
                    transform: 'translateZ(0)',
                  }}
                  data-testid={`what-we-do-tile-${tile.id}`}
                >
                  {/* Active/Hover state - shows video + subtext */}
                  <div 
                    className="flex flex-col h-full absolute inset-0 p-6 overflow-hidden"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transition: 'opacity 250ms ease',
                      pointerEvents: isActive ? 'auto' : 'none',
                    }}
                  >
                    {/* Headline at top */}
                    <h3 
                      className="text-xl font-semibold leading-snug mb-3"
                      style={{ color: '#1A1A1A' }}
                    >
                      {tile.headline}
                    </h3>
                    
                    {/* Subtext - shown on hover */}
                    <p 
                      className="text-sm leading-relaxed mb-4"
                      style={{ color: 'rgba(26,26,26,0.6)' }}
                    >
                      {tile.subtext || 'Additional details will appear here on hover.'}
                    </p>
                    
                    {/* Video/Image at bottom */}
                    <div className="flex-1 flex items-end justify-center">
                      {tile.video ? (
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="max-w-full max-h-[200px] object-contain"
                          src={tile.video}
                        />
                      ) : tile.image ? (
                        <img 
                          src={tile.image} 
                          alt="" 
                          className="max-w-full max-h-[200px] object-contain"
                        />
                      ) : (
                        <div 
                          className="w-28 h-28 rounded-full"
                          style={{ backgroundColor: 'rgba(26,26,26,0.1)' }}
                        />
                      )}
                    </div>
                  </div>
                  
                  {/* Default/Resting state */}
                  <div 
                    className="flex flex-col h-full p-6 absolute inset-0"
                    style={{
                      opacity: isActive ? 0 : 1,
                      transition: 'opacity 250ms ease',
                      pointerEvents: isActive ? 'none' : 'auto',
                    }}
                  >
                    {/* Headline */}
                    <h3 
                      className="text-base font-semibold leading-snug"
                      style={{ color: '#1A1A1A' }}
                    >
                      {tile.headline}
                    </h3>
                    
                    {/* Image at bottom */}
                    <div className="flex-1 flex items-end justify-center">
                      {tile.image ? (
                        <img 
                          src={tile.image} 
                          alt="" 
                          className="max-w-full max-h-[180px] object-contain"
                        />
                      ) : (
                        <div 
                          className="w-24 h-24 rounded-full"
                          style={{ backgroundColor: 'rgba(26,26,26,0.1)' }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile: Horizontal scroll */}
          <div className="md:hidden overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex gap-4" style={{ width: 'max-content' }}>
              {whatWeDoTiles.map((tile) => (
                <motion.div
                  key={tile.id}
                  className="rounded-3xl overflow-hidden flex flex-col"
                  style={{
                    width: '280px',
                    height: '380px',
                    background: tile.gradient,
                    flexShrink: 0,
                  }}
                  data-testid={`what-we-do-tile-mobile-${tile.id}`}
                >
                  <div className="p-5">
                    <h3 
                      className="text-lg font-semibold leading-snug"
                      style={{ color: '#1A1A1A' }}
                    >
                      {tile.headline}
                    </h3>
                  </div>
                  <div className="flex-1 flex items-end justify-center px-5 pb-5">
                    {tile.image ? (
                      <img 
                        src={tile.image} 
                        alt="" 
                        className="max-w-full max-h-[200px] object-contain"
                      />
                    ) : (
                      <div 
                        className="w-24 h-24 rounded-full"
                        style={{ backgroundColor: 'rgba(26,26,26,0.1)' }}
                      />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section - 2 Column Layout */}
      <section 
        className="relative z-10"
        style={{ backgroundColor: '#FFFFFF', minHeight: '80vh' }}
        data-testid="section-capabilities"
      >
        <div className="w-full px-6 md:px-16 lg:px-24 py-16 md:py-24">
          {/* Mobile: Single Column */}
          <div className="md:hidden">
            {/* Left content as header on mobile */}
            <div className="mb-10">
              <span 
                className="text-sm font-medium tracking-wide mb-3 block"
                style={{ color: 'rgba(26,26,26,0.5)' }}
              >
                Capabilities
              </span>
              <h2 
                className="text-3xl font-bold mb-4"
                style={{ color: '#1A1A1A' }}
              >
                Build. Launch. Scale.
              </h2>
              <p 
                className="text-base leading-relaxed mb-6"
                style={{ color: 'rgba(26,26,26,0.6)' }}
              >
                Gray Solutions designs brands, digital products, and AI-powered systems that actually move the business.
              </p>
              <div className="flex gap-3 mb-4">
                <button 
                  className="px-6 py-3 rounded-full font-medium text-sm"
                  style={{ backgroundColor: '#1A1A1A', color: '#FFFFFF' }}
                  data-testid="cta-book-call-mobile"
                >
                  Book a Call
                </button>
                <button 
                  className="px-6 py-3 rounded-full font-medium text-sm"
                  style={{ backgroundColor: 'transparent', color: '#1A1A1A', border: '1px solid rgba(26,26,26,0.2)' }}
                  data-testid="cta-see-work-mobile"
                >
                  See Work
                </button>
              </div>
              <span 
                className="text-xs"
                style={{ color: 'rgba(26,26,26,0.4)' }}
              >
                Based in India. Working globally.
              </span>
            </div>

            {/* Accordion on mobile */}
            <div className="space-y-3">
              {[
                { id: 0, title: "Brand Design", description: "Positioning, identity, and systems that make you instantly recognizable — and consistent everywhere.", bullets: ["Brand strategy + messaging", "Visual identity + guidelines", "Templates + creative direction"], link: "Explore Brand Design →" },
                { id: 1, title: "Product & Experience Design", description: "From idea to flow to UI — we design interfaces that feel premium and work in the real world.", bullets: ["Product strategy + UX flows", "UI screens + design systems", "Prototypes + dev-ready handoff"], link: "Explore Product Design →", defaultOpen: true },
                { id: 2, title: "Web & Platform Solutions", description: "Fast, responsive websites and web apps built to scale cleanly — without tech debt mess.", bullets: ["Marketing sites + landing pages", "Portals + dashboards", "Integrations + performance"], link: "Explore Web Solutions →" },
                { id: 3, title: "Commerce & Shopify", description: "Conversion-first storefronts and Shopify builds that look premium and sell better.", bullets: ["Shopify setup + theme customization", "Product page + checkout optimization", "Tracking + basic retention automations"], link: "Explore Commerce →" },
                { id: 4, title: "Content & Performance Marketing", description: "Creative + distribution as a system — built for demand, not vanity metrics.", bullets: ["Reels, ads, carousels, brand assets", "Meta/Google ad testing loops", "Landing page conversion improvements"], link: "Explore Marketing →" },
                { id: 5, title: "AI Agents & Automation", description: "AI that reduces workload and speeds up operations — built around your actual workflows.", bullets: ["Lead-response + support agents", "RAG knowledge bots", "Automation pipelines + integrations"], link: "Explore AI Agents →" },
              ].map((item) => {
                const isExpanded = expandedCapability === item.id;
                return (
                  <div 
                    key={item.id}
                    className="rounded-2xl overflow-hidden"
                    style={{ backgroundColor: '#F6F7FA', border: '1px solid rgba(26,26,26,0.06)' }}
                    data-testid={`capability-mobile-${item.id}`}
                  >
                    <button
                      className="w-full px-5 py-4 flex items-center justify-between text-left"
                      onClick={() => setExpandedCapability(isExpanded ? null : item.id)}
                      aria-expanded={isExpanded}
                    >
                      <span className="text-base font-semibold" style={{ color: '#1A1A1A' }}>
                        {item.title}
                      </span>
                      <span style={{ color: '#1A1A1A' }}>
                        {isExpanded ? '−' : '+'}
                      </span>
                    </button>
                    <div 
                      className="overflow-hidden transition-all duration-300 ease-out"
                      style={{ maxHeight: isExpanded ? '400px' : '0', opacity: isExpanded ? 1 : 0 }}
                    >
                      <div className="px-5 pb-5">
                        <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(26,26,26,0.6)' }}>
                          {item.description}
                        </p>
                        <ul className="space-y-2 mb-4">
                          {item.bullets.map((bullet, idx) => (
                            <li key={idx} className="text-sm flex items-start gap-2" style={{ color: 'rgba(26,26,26,0.7)' }}>
                              <span style={{ color: '#1A1A1A' }}>•</span>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                        <span 
                          className="text-sm font-medium inline-flex items-center gap-1 cursor-pointer"
                          style={{ color: '#1A1A1A' }}
                        >
                          {item.link}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Desktop: 2-Column Layout - Normal page scroll with sticky left */}
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
                  Capabilities
                </span>
                <h2 
                  className="text-4xl lg:text-5xl font-bold mb-5 leading-tight"
                  style={{ color: '#1A1A1A' }}
                >
                  Build. Launch. Scale.
                </h2>
                <p 
                  className="text-lg leading-relaxed mb-8"
                  style={{ color: 'rgba(26,26,26,0.6)', maxWidth: '400px' }}
                >
                  Gray Solutions designs brands, digital products, and AI-powered systems that actually move the business.
                </p>
                <div className="flex gap-3 mb-5">
                  <button 
                    className="px-7 py-3.5 rounded-full font-medium text-sm hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#1A1A1A', color: '#FFFFFF' }}
                    data-testid="cta-book-call"
                  >
                    Book a Call
                  </button>
                  <button 
                    className="px-7 py-3.5 rounded-full font-medium text-sm hover:bg-gray-50 transition-colors"
                    style={{ backgroundColor: 'transparent', color: '#1A1A1A', border: '1px solid rgba(26,26,26,0.2)' }}
                    data-testid="cta-see-work"
                  >
                    See Work
                  </button>
                </div>
                <span 
                  className="text-xs"
                  style={{ color: 'rgba(26,26,26,0.4)' }}
                >
                  Based in India. Working globally.
                </span>
              </div>
            </div>

            {/* Right Column - Flows naturally with page scroll */}
            <div>
              <div className="space-y-3">
                {[
                  { id: 0, title: "Brand Design", description: "Positioning, identity, and systems that make you instantly recognizable — and consistent everywhere.", bullets: ["Brand strategy + messaging", "Visual identity + guidelines", "Templates + creative direction"], link: "Explore Brand Design →" },
                  { id: 1, title: "Product & Experience Design", description: "From idea to flow to UI — we design interfaces that feel premium and work in the real world.", bullets: ["Product strategy + UX flows", "UI screens + design systems", "Prototypes + dev-ready handoff"], link: "Explore Product Design →" },
                  { id: 2, title: "Web & Platform Solutions", description: "Fast, responsive websites and web apps built to scale cleanly — without tech debt mess.", bullets: ["Marketing sites + landing pages", "Portals + dashboards", "Integrations + performance"], link: "Explore Web Solutions →" },
                  { id: 3, title: "Commerce & Shopify", description: "Conversion-first storefronts and Shopify builds that look premium and sell better.", bullets: ["Shopify setup + theme customization", "Product page + checkout optimization", "Tracking + basic retention automations"], link: "Explore Commerce →" },
                  { id: 4, title: "Content & Performance Marketing", description: "Creative + distribution as a system — built for demand, not vanity metrics.", bullets: ["Reels, ads, carousels, brand assets", "Meta/Google ad testing loops", "Landing page conversion improvements"], link: "Explore Marketing →" },
                  { id: 5, title: "AI Agents & Automation", description: "AI that reduces workload and speeds up operations — built around your actual workflows.", bullets: ["Lead-response + support agents", "RAG knowledge bots", "Automation pipelines + integrations"], link: "Explore AI Agents →" },
                ].map((item) => {
                  const isExpanded = expandedCapability === item.id;
                  return (
                    <div 
                      key={item.id}
                      className="rounded-2xl overflow-hidden transition-shadow duration-200"
                      style={{ 
                        backgroundColor: '#F6F7FA', 
                        border: '1px solid rgba(26,26,26,0.06)',
                        boxShadow: isExpanded ? '0 4px 20px rgba(0,0,0,0.06)' : 'none'
                      }}
                      data-testid={`capability-${item.id}`}
                    >
                      <button
                        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 rounded-2xl"
                        onClick={() => setExpandedCapability(isExpanded ? null : item.id)}
                        aria-expanded={isExpanded}
                      >
                        <span className="text-lg font-semibold" style={{ color: '#1A1A1A' }}>
                          {item.title}
                        </span>
                        <span 
                          className="text-xl font-light w-6 h-6 flex items-center justify-center"
                          style={{ color: '#1A1A1A' }}
                        >
                          {isExpanded ? '−' : '+'}
                        </span>
                      </button>
                      <div 
                        className="overflow-hidden transition-all duration-300 ease-out"
                        style={{ 
                          maxHeight: isExpanded ? '500px' : '0', 
                          opacity: isExpanded ? 1 : 0,
                        }}
                      >
                        <div className="px-6 pb-6">
                          <p 
                            className="text-base leading-relaxed mb-5" 
                            style={{ color: 'rgba(26,26,26,0.6)' }}
                          >
                            {item.description}
                          </p>
                          <ul className="space-y-2.5 mb-5">
                            {item.bullets.map((bullet, idx) => (
                              <li 
                                key={idx} 
                                className="text-sm flex items-start gap-2.5" 
                                style={{ color: 'rgba(26,26,26,0.7)' }}
                              >
                                <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: '#1A1A1A' }} />
                                {bullet}
                              </li>
                            ))}
                          </ul>
                          <span 
                            className="text-sm font-medium inline-flex items-center gap-1 cursor-pointer hover:gap-2 transition-all"
                            style={{ color: '#1A1A1A' }}
                          >
                            {item.link}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Roadmap Section - Horizontal Scroll */}
      <section 
        ref={roadmapRef}
        className="relative z-10"
        style={{ height: '300vh' }}
      >
        <div 
          className="sticky top-0 w-full flex flex-col justify-start pt-24 md:pt-32 overflow-hidden"
          style={{ 
            height: '100vh',
            backgroundColor: '#FFFFFF',
          }}
        >
          {/* Section Title */}
          <div className="pl-8 md:pl-16 lg:pl-24 mb-10">
            <h2 
              className="text-2xl md:text-3xl font-bold"
              style={{ color: '#1A1A1A' }}
              data-testid="workflow-section-title"
            >
              Roadmap of our workflow
            </h2>
          </div>

          {/* Scrolling container - sized so 2.5 cards fit initially */}
          <motion.div 
            className="flex items-start pl-8 md:pl-16 lg:pl-24"
            style={{
              x: useTransform(smoothRoadmapProgress, [0, 1], ['0%', '-40%']),
            }}
          >
            {/* Workflow cards - Discover/Design visible, Build peeking, Launch hidden */}
            <div className="flex gap-[6vw]">
              {workflowSteps.map((step, index) => {
                const isVisible = currentStep >= index;
                
                return (
                  <div
                    key={step.id}
                    className="flex-shrink-0"
                    style={{ 
                      width: 'calc(32vw - 24px)',
                      minWidth: '280px',
                      maxWidth: '420px',
                      opacity: isVisible ? 1 : 0.4,
                      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                      transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
                      transitionDelay: `${index * 80}ms`,
                    }}
                    data-testid={`workflow-step-${index}`}
                  >
                    {/* Icon */}
                    <div className="mb-4 text-gray-900">
                      <WorkflowIcon step={index} />
                    </div>

                    {/* Title */}
                    <h3 
                      className="text-2xl md:text-3xl font-bold mb-3"
                      style={{ color: '#1A1A1A' }}
                    >
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p 
                      className="text-sm leading-relaxed"
                      style={{ color: 'rgba(26,26,26,0.5)' }}
                    >
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Horizontal timeline line - positioned below content */}
          <div 
            className="mt-16 mx-8 md:mx-16 lg:mx-24 relative"
            style={{ height: '2px' }}
          >
            {/* Background line (gray) */}
            <div 
              className="absolute inset-0"
              style={{ backgroundColor: 'rgba(26,26,26,0.2)' }}
            />
            
            {/* Progress line overlay (synced with currentStep) */}
            <div
              className="absolute top-0 left-0 h-full origin-left"
              style={{
                backgroundColor: '#1A1A1A',
                width: `${(currentStep / (workflowSteps.length - 1)) * 100}%`,
                transition: 'width 400ms ease-out',
              }}
            />

            {/* Dots positioned at each step - synced with visibility */}
            {workflowSteps.map((_, index) => {
              const isActive = currentStep >= index;
              const dotPosition = (index / (workflowSteps.length - 1)) * 100;
              return (
                <div
                  key={index}
                  className="absolute top-1/2"
                  style={{ 
                    left: `${dotPosition}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{
                      backgroundColor: isActive ? '#1A1A1A' : 'rgba(26,26,26,0.3)',
                      transition: 'all 300ms ease',
                    }}
                  />
                </div>
              );
            })}
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
