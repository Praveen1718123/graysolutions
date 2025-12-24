import React, { useEffect, useState, useRef } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import logoImage from "@assets/Group_69_(1)_1764854226570.png";
import heroVideo from "@assets/hero-video-horizontal.mp4";

export default function Services() {
  const [isScrolled, setIsScrolled] = useState(false);
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
          {/* Logo Image */}
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

      {/* Hero Section with Scroll-based Video Expansion */}
      <section 
        ref={heroRef}
        className="relative"
        style={{ backgroundColor: '#F6F7FA', paddingTop: '80px', height: '300vh' }}
      >
        <div 
          className="sticky overflow-hidden"
          style={{
            top: isScrolled ? '70px' : '80px',
            height: isScrolled ? 'calc(100vh - 70px)' : 'calc(100vh - 80px)',
            transition: 'top 500ms cubic-bezier(0.4, 0, 0.2, 1), height 500ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <div className="max-w-[1120px] mx-auto px-4 md:px-10 h-full flex flex-col pt-4 md:pt-8">
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
                { id: 0, title: "Digital Strategy & Experience", description: "We map out where you want to go and build digital products that get you there. Our strategists marry data with intuition to find your biggest opportunities, then our designers craft experiences that feel human – not like some soulless app." },
                { id: 1, title: "Brand & Identity", description: "Your brand is more than colours and a logo. We help you figure out what you stand for and give you the tools to express it everywhere, from packaging to pixels. Think clear positioning, a voice with bite and visuals that stick." },
                { id: 2, title: "Marketing & Growth", description: "Performance without the snake oil. From organic search to paid social to influencer collabs, we focus on what moves the needle. We track ROI in real time and ditch channels that don't pay off, so you're not bleeding budget." },
                { id: 3, title: "Technology & Automation", description: "Fancy tech is useless if it doesn't make life easier. We build and integrate platforms, automation and AI so your workflows run smooth, your data is actionable and your team isn't stuck with manual grunt work." },
                { id: 4, title: "Content & Storytelling", description: "People ignore ads but they share stories. Our writers, artists and video nerds create content people actually care about – from snappy copy and 3D visuals to interactive experiences – all tuned to resonate with your audience and reflect your brand's voice." },
              ].map((item) => {
                const isExpanded = expandedCapability === item.id;
                return (
                  <div 
                    key={item.id}
                    className="rounded-2xl overflow-hidden"
                    style={{ backgroundColor: '#F6F7FA' }}
                    data-testid={`capability-mobile-${item.id}`}
                  >
                    <button
                      className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                      onClick={() => setExpandedCapability(isExpanded ? null : item.id)}
                      aria-expanded={isExpanded}
                    >
                      <span className="text-lg font-semibold" style={{ color: '#1A1A1A' }}>
                        {item.title}
                      </span>
                      <span className="text-xl" style={{ color: '#1A1A1A' }}>
                        {isExpanded ? '−' : '+'}
                      </span>
                    </button>
                    <div 
                      className="overflow-hidden transition-all duration-300 ease-out"
                      style={{ maxHeight: isExpanded ? '500px' : '0', opacity: isExpanded ? 1 : 0 }}
                    >
                      <div className="px-6 pb-6">
                        <p className="text-base leading-relaxed" style={{ color: 'rgba(26,26,26,0.6)' }}>
                          {item.description}
                        </p>
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
                  { id: 0, title: "Digital Strategy & Experience", description: "We map out where you want to go and build digital products that get you there. Our strategists marry data with intuition to find your biggest opportunities, then our designers craft experiences that feel human – not like some soulless app." },
                  { id: 1, title: "Brand & Identity", description: "Your brand is more than colours and a logo. We help you figure out what you stand for and give you the tools to express it everywhere, from packaging to pixels. Think clear positioning, a voice with bite and visuals that stick." },
                  { id: 2, title: "Marketing & Growth", description: "Performance without the snake oil. From organic search to paid social to influencer collabs, we focus on what moves the needle. We track ROI in real time and ditch channels that don't pay off, so you're not bleeding budget." },
                  { id: 3, title: "Technology & Automation", description: "Fancy tech is useless if it doesn't make life easier. We build and integrate platforms, automation and AI so your workflows run smooth, your data is actionable and your team isn't stuck with manual grunt work." },
                  { id: 4, title: "Content & Storytelling", description: "People ignore ads but they share stories. Our writers, artists and video nerds create content people actually care about – from snappy copy and 3D visuals to interactive experiences – all tuned to resonate with your audience and reflect your brand's voice." },
                ].map((item) => {
                  const isExpanded = expandedCapability === item.id;
                  return (
                    <div 
                      key={item.id}
                      className="rounded-2xl overflow-hidden transition-shadow duration-200"
                      style={{ 
                        backgroundColor: '#F6F7FA', 
                        border: 'none',
                      }}
                      data-testid={`capability-${item.id}`}
                    >
                      <button
                        className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none"
                        onClick={() => setExpandedCapability(isExpanded ? null : item.id)}
                        aria-expanded={isExpanded}
                      >
                        <span className="text-xl font-semibold" style={{ color: '#1A1A1A' }}>
                          {item.title}
                        </span>
                        <span 
                          className="text-2xl font-light w-8 h-8 flex items-center justify-center"
                          style={{ color: '#1A1A1A' }}
                        >
                          {isExpanded ? '−' : '+'}
                        </span>
                      </button>
                      <div 
                        className="overflow-hidden transition-all duration-300 ease-out"
                        style={{ 
                          maxHeight: isExpanded ? '600px' : '0', 
                          opacity: isExpanded ? 1 : 0,
                        }}
                      >
                        <div className="px-8 pb-8">
                          <p 
                            className="text-lg leading-relaxed" 
                            style={{ color: 'rgba(26,26,26,0.6)' }}
                          >
                            {item.description}
                          </p>
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

      {/* Why Choose Us Section */}
      <section 
        className="py-16 md:py-24 relative z-10"
        style={{ backgroundColor: '#F6F7FA' }}
      >
        <div className="max-w-[1120px] mx-auto px-6 md:px-10">
          <h2 
            className="text-2xl md:text-3xl font-bold mb-12"
            style={{ color: '#1A1A1A' }}
            data-testid="section-why-choose-us"
          >
            Why choose us?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Straight talk, zero fluff",
                description: "We're honest about what works and what doesn't. If your idea is bad, we'll tell you – then help you make it better. No jargon, no sugar-coating.",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="#1A1A1A">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                ),
              },
              {
                title: "Built for humans, powered by tech",
                description: "Yes, we love AI and automation, but we start with empathy. We design experiences that feel natural and inclusive, using technology as a tool – not a gimmick.",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="#1A1A1A">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                ),
              },
              {
                title: "ROI or GTFO",
                description: "We don't chase likes. We measure success in real business terms: increased conversions, lower churn, faster workflows. You'll see dashboards that track the metrics that actually matter.",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="#1A1A1A">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z" />
                  </svg>
                ),
              },
              {
                title: "Future-ready mindset",
                description: "While others are still buzzing about Industry 4.0, we're already testing what's next – from generative AI to immersive experiences. We help you stay ahead without chasing every fad.",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="#1A1A1A">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ),
              },
              {
                title: "Small team, big impact",
                description: "You get the agility and personal attention of a boutique studio with the capabilities of a larger network. We scale when needed but never make you feel like a number.",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="#1A1A1A">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                  </svg>
                ),
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(0,0,0,0.05)',
                }}
                data-testid={`why-choose-us-${index}`}
              >
                <div className="mb-5">
                  {item.icon}
                </div>
                <h3 
                  className="text-xl font-semibold mb-3"
                  style={{ color: '#1A1A1A' }}
                >
                  {item.title}
                </h3>
                <p 
                  className="text-base leading-relaxed mb-6"
                  style={{ color: 'rgba(26,26,26,0.6)' }}
                >
                  {item.description}
                </p>
                <button 
                  className="flex items-center gap-2 text-sm font-medium"
                  style={{ color: '#1A1A1A' }}
                >
                  Read More
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
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
