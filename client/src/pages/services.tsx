import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import logoImage from "@assets/Group_69_(1)_1764854226570.png";

export default function Services() {
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
        backgroundColor: '#F7F7F8',
        color: '#111827',
        fontFamily: '-apple-system, system-ui, sans-serif'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <Link href="/">
            <motion.img 
              src={logoImage} 
              alt="Gray Solutions" 
              className="h-8 w-auto cursor-pointer"
              whileHover={{ scale: 1.02 }}
              data-testid="logo-nav"
            />
          </Link>
          <Link href="/contact">
            <motion.span 
              className="text-sm font-medium text-gray-600 hover:text-[#FF6801] transition-colors cursor-pointer"
              whileHover={{ y: -1 }}
              data-testid="nav-contact"
            >
              Contact
            </motion.span>
          </Link>
        </div>
      </nav>

      <motion.main 
        className="max-w-[1200px] mx-auto px-6 md:px-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Section 1: Intro (Hero) */}
        <motion.section 
          className="py-20 md:py-32"
          variants={itemVariants}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1 
                className="text-3xl md:text-5xl font-bold leading-tight mb-6"
                style={{ color: '#111827' }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                data-testid="hero-heading"
              >
                We design, build & automate the products your customers actually use.
              </motion.h1>
              <motion.p 
                className="text-lg text-gray-600 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                data-testid="hero-subheading"
              >
                Gray Solutions is a digital product & AI studio that mixes strategy, UX, development and automation to bring your ideas to life.
              </motion.p>
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <motion.button 
                  className="px-6 py-3 rounded-full text-sm font-medium text-white shadow-md"
                  style={{ backgroundColor: '#FF6801' }}
                  whileHover={{ y: -2, boxShadow: '0 8px 25px rgba(255, 104, 1, 0.3)' }}
                  whileTap={{ y: 0 }}
                  transition={{ duration: 0.18 }}
                  data-testid="btn-strategy-call"
                >
                  Book a strategy call
                </motion.button>
                <motion.button 
                  className="px-6 py-3 rounded-full text-sm font-medium border-2 bg-transparent"
                  style={{ borderColor: '#FF6801', color: '#FF6801' }}
                  whileHover={{ y: -2, backgroundColor: 'rgba(255, 104, 1, 0.05)' }}
                  whileTap={{ y: 0 }}
                  transition={{ duration: 0.18 }}
                  data-testid="btn-view-work"
                >
                  View recent work
                </motion.button>
              </motion.div>
            </div>
            <motion.div 
              className="hidden md:block h-80 rounded-3xl"
              style={{ 
                background: 'linear-gradient(135deg, rgba(255,104,1,0.1) 0%, rgba(255,104,1,0.05) 50%, rgba(247,247,248,1) 100%)'
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
          </div>
        </motion.section>

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
                className="p-6 rounded-2xl bg-white"
                style={{ 
                  border: '1px solid rgba(15,23,42,0.08)',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ 
                  y: -4, 
                  boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
                  borderColor: 'rgba(255,104,1,0.2)'
                }}
                data-testid={`brief-card-${index}`}
              >
                <h3 className="text-base font-semibold mb-3" style={{ color: '#111827' }}>
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
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
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
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
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
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                data-testid={`capability-column-${index}`}
              >
                <h3 className="text-xl font-semibold mb-5" style={{ color: '#111827' }}>
                  {cap.heading}
                </h3>
                <ul className="space-y-3">
                  {cap.items.map((item, idx) => (
                    <motion.li 
                      key={idx}
                      className="text-sm text-gray-600 flex items-start gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 + idx * 0.05 }}
                    >
                      <span style={{ color: '#FF6801' }}>•</span>
                      {item}
                    </motion.li>
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
                className={`bg-white p-6 md:p-8 rounded-2xl md:absolute md:w-[45%] ${
                  testimonial.position === 'right' ? 'md:right-0' : 'md:left-0'
                }`}
                style={{ 
                  border: '1px solid rgba(15,23,42,0.08)',
                  top: index === 0 ? '0' : index === 1 ? '80px' : '160px'
                }}
                initial={{ opacity: 0, x: testimonial.position === 'right' ? 30 : -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
                whileHover={{ 
                  y: -4, 
                  boxShadow: '0 12px 40px rgba(0,0,0,0.08)'
                }}
                data-testid={`testimonial-${testimonial.id}`}
              >
                <p className="text-base leading-relaxed mb-4" style={{ color: '#111827' }}>
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
