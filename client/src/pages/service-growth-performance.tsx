import React, { useEffect, useState, useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import logoImage from "@assets/Group_25_(5)_1766734675194.png";
import Footer from "@/components/footer";

export default function ServiceGrowthPerformance() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const whoIsFor = [
    { icon: "📊", title: "Businesses", desc: "Spending on ads but not getting consistent qualified leads" },
    { icon: "🎯", title: "Brands", desc: "With traffic but weak conversion (landing page / checkout / offer clarity)" },
    { icon: "👤", title: "Founders", desc: "Who want predictable pipeline, not \"hope marketing\"" },
    { icon: "⚡", title: "Teams", desc: "That need clean tracking + optimization, not just campaign launches" },
  ];

  const problems = [
    "Leads are coming, but quality is poor (low intent, low close rate)",
    "CPL is high and inconsistent — no predictable acquisition",
    "Ads are running but tracking is broken (you don't know what's working)",
    "Landing pages look fine but don't convert (message mismatch)",
    "Funnel drop-offs are ignored (no CRO loop)",
    "No retargeting / nurture system → you lose warm prospects",
  ];

  const modules = [
    {
      title: "Growth Strategy",
      icon: "🎯",
      items: [
        "ICP + intent mapping (who we target and why)",
        "Offer positioning + messaging for conversion",
        "Funnel strategy (lead → call → close)",
      ],
    },
    {
      title: "Paid Acquisition",
      icon: "📈",
      items: [
        "Campaign architecture (cold + warm + retargeting)",
        "Audience strategy + testing plan",
        "Creative strategy (angles, hooks, iterations)",
        "Budget allocation + pacing rules",
      ],
    },
    {
      title: "Funnel & Landing Pages",
      icon: "🚀",
      items: [
        "Landing page structure (headline, proof, CTA)",
        "Form optimization / lead quality controls",
        "Speed + mobile UX improvements",
        "A/B test plan (when volume supports it)",
      ],
    },
  ];

  const packages = [
    {
      name: "Launch & Baseline",
      badge: "Set A",
      description: "Best if you're starting paid growth or your setup is messy.",
      timeline: "2–3 weeks",
      features: [
        "Tracking setup",
        "Funnel strategy",
        "Campaign launch",
        "Landing page optimization",
      ],
    },
    {
      name: "Performance Management",
      badge: "Set B",
      description: "Best if you want consistent lead flow and continuous optimization.",
      timeline: "Monthly retainer",
      features: [
        "Ongoing campaign management",
        "Creative iterations",
        "CRO loop",
        "Weekly reporting",
        "Budget optimization",
      ],
      featured: true,
    },
    {
      name: "Scale System",
      badge: "Set C",
      description: "Best when you're ready to push spend with discipline.",
      timeline: "8–12 weeks + monthly",
      features: [
        "Everything in Set B",
        "Multi-funnel testing",
        "Advanced retargeting",
        "Pipeline optimization",
        "Scale playbook",
      ],
    },
  ];

  const process = [
    { step: "01", title: "Audit & Diagnosis", description: "We review your ads, tracking, landing pages, and offer." },
    { step: "02", title: "System Build", description: "We set up a clean funnel, measurement, and campaign structure." },
    { step: "03", title: "Launch & Learn", description: "We test creatives, audiences, and messaging fast — but controlled." },
    { step: "04", title: "Optimize & Scale", description: "We scale what works, cut what doesn't, and improve conversion continuously." },
  ];

  const outcomes = [
    "Lower CPL / improved CAC efficiency",
    "Higher lead quality (more qualified calls, better close rates)",
    "Cleaner tracking (you know what drives pipeline)",
    "Higher landing page conversion rates",
    "A repeatable creative + testing engine that doesn't stall",
  ];

  const faqs = [
    { q: "Do you guarantee results?", a: "No legit performance team guarantees numbers without context. We guarantee disciplined execution, tracking, and continuous optimization." },
    { q: "Do you create ad creatives too?", a: "Yes — strategy + direction + iterations. Full-scale production can be done via our Brand & Content Studio." },
    { q: "Do you handle landing pages?", a: "Yes. We either build new pages or optimize existing ones. The goal is conversion, not design vanity." },
    { q: "What ad platforms do you run?", a: "Typically Meta and Google. Depending on the business: YouTube, LinkedIn, or others." },
    { q: "How long until we see improvement?", a: "You'll see cleaner data + early performance signal in 2–4 weeks. Meaningful scaling usually takes 6–12 weeks." },
    { q: "Do you need access to our CRM?", a: "If you want serious lead-quality optimization, yes. Otherwise we're optimizing blind." },
  ];

  return (
    <div className="min-h-screen w-full font-sans overflow-x-hidden" style={{ backgroundColor: '#FAFAFA', color: '#1A1A1A' }}>
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
            backgroundColor: isScrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
            backdropFilter: isScrolled ? 'blur(12px)' : 'none',
            boxShadow: isScrolled ? '0 4px 24px rgba(0,0,0,0.1)' : 'none',
            borderRadius: isScrolled ? '999px' : '0',
            transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <Link href="/">
            <img 
              src={logoImage} 
              alt="Gray Logo" 
              className="cursor-pointer"
              style={{ height: isScrolled ? '24px' : '36px', width: 'auto', filter: isScrolled ? 'none' : 'brightness(0) invert(1)' }}
              data-testid="logo-nav"
            />
          </Link>
        </div>
      </header>

      <section className="relative w-full" style={{ height: '100vh', minHeight: '600px' }}>
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/assets/growth-performance-video.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-[800px]"
          >
            <span className="text-sm font-medium tracking-widest mb-4 block" style={{ color: 'rgba(255,255,255,0.7)' }}>
              GROWTH & PERFORMANCE
            </span>
            <h1 
              className="font-bold mb-6"
              style={{ 
                fontSize: 'clamp(36px, 5vw, 56px)',
                lineHeight: '1.1',
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
              }}
            >
              Turn attention into leads — and leads into revenue.
            </h1>
            <p className="text-lg md:text-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
              We build and optimize acquisition systems: paid ads, funnels, landing pages, and conversion improvements tied to real business metrics.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 bg-white/70 rounded-full" />
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-sm font-medium tracking-wide mb-3 block" style={{ color: '#666666' }}>What We Do</span>
              <h2 
                className="font-bold"
                style={{ fontSize: 'clamp(28px, 4vw, 42px)', lineHeight: '1.15', color: '#1A1A1A', letterSpacing: '-0.02em' }}
              >
                Growth & Performance
              </h2>
              <Link href="/contact">
                <button 
                  className="mt-6 px-6 py-3 rounded-full font-medium text-sm transition-all hover:opacity-90"
                  style={{ backgroundColor: '#1A1A1A', color: '#FFFFFF' }}
                >
                  Get a Funnel + Ads Audit
                </button>
              </Link>
            </div>
            <div>
              <p className="text-lg leading-relaxed" style={{ color: '#666666' }}>
                A performance-focused growth studio that runs paid acquisition + funnel conversion + tracking as one system (not disconnected tasks). We help you build predictable pipeline and scale with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="text-center mb-10">
            <span className="text-sm font-medium tracking-wide mb-3 block" style={{ color: '#666666' }}>Who This Is For</span>
            <h2 className="font-bold" style={{ fontSize: 'clamp(28px, 4vw, 42px)', lineHeight: '1.15', color: '#1A1A1A', letterSpacing: '-0.02em' }}>
              Built For Growth-Focused Teams
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {whoIsFor.map((item, idx) => (
              <motion.div
                key={idx}
                className="p-6 rounded-2xl"
                style={{ 
                  background: idx === 0 ? 'linear-gradient(135deg, #E8E0F0 0%, #F5F0FA 100%)' : 
                              idx === 1 ? 'linear-gradient(135deg, #E0E8F0 0%, #F0F5FA 100%)' :
                              idx === 2 ? 'linear-gradient(135deg, #F0E8E0 0%, #FAF5F0 100%)' :
                              'linear-gradient(135deg, #E0F0E8 0%, #F0FAF5 100%)',
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <span className="text-2xl mb-3 block">{item.icon}</span>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#1A1A1A' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#666666' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">
            <div>
              <span className="text-sm font-medium tracking-wide mb-3 block" style={{ color: '#666666' }}>The Problem</span>
              <h2 
                className="font-bold"
                style={{ fontSize: 'clamp(28px, 4vw, 42px)', lineHeight: '1.15', color: '#1A1A1A', letterSpacing: '-0.02em' }}
              >
                Problems We Solve
              </h2>
            </div>
            <div>
              <p className="text-lg leading-relaxed" style={{ color: '#666666' }}>
                Most businesses waste ad spend because their system is disconnected. Here's what we fix:
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {problems.map((problem, idx) => (
              <motion.div
                key={idx}
                className="flex items-start gap-3 p-5 rounded-xl"
                style={{ backgroundColor: '#FAFAFA' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#E74C8C' }} />
                <p className="text-sm leading-relaxed" style={{ color: '#1A1A1A' }}>{problem}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <span className="text-sm font-medium tracking-wide mb-3 block" style={{ color: '#666666' }}>What You Get</span>
            <h2 
              className="font-bold"
              style={{ fontSize: 'clamp(28px, 4vw, 42px)', lineHeight: '1.15', color: '#1A1A1A', letterSpacing: '-0.02em' }}
            >
              Our Modules
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {modules.map((module, idx) => (
              <motion.div
                key={idx}
                className="p-8 rounded-3xl"
                style={{ 
                  background: idx === 0 ? 'linear-gradient(180deg, #F5F0FA 0%, #FFFFFF 100%)' : 
                              idx === 1 ? 'linear-gradient(180deg, #F0F5FA 0%, #FFFFFF 100%)' :
                              'linear-gradient(180deg, #FAF5F0 0%, #FFFFFF 100%)',
                  border: '1px solid #E5E5E5',
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <span className="text-3xl mb-4 block">{module.icon}</span>
                <h3 className="text-xl font-bold mb-4" style={{ color: '#1A1A1A' }}>{module.title}</h3>
                <ul className="space-y-2">
                  {module.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2">
                      <svg className="w-4 h-4 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="#666666">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm" style={{ color: '#666666' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <span className="text-sm font-medium tracking-wide mb-3 block" style={{ color: '#666666' }}>Options</span>
            <h2 className="font-bold mb-3" style={{ fontSize: 'clamp(28px, 4vw, 42px)', lineHeight: '1.15', color: '#1A1A1A', letterSpacing: '-0.02em' }}>
              Choose Your Path
            </h2>
            <p className="text-base" style={{ color: '#666666' }}>Select the option that fits your current stage.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg, idx) => (
              <motion.div
                key={idx}
                className="p-8 rounded-3xl flex flex-col h-full"
                style={{ 
                  backgroundColor: (pkg as any).featured ? '#E8F4FF' : '#FFFFFF',
                  border: '1px solid #E5E5E5',
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <span 
                  className="text-xs font-semibold tracking-wide px-4 py-1.5 rounded-full self-start mb-4"
                  style={{ backgroundColor: (pkg as any).featured ? '#1A1A1A' : '#F0F0F0', color: (pkg as any).featured ? '#FFFFFF' : '#1A1A1A' }}
                >
                  {pkg.badge}
                </span>
                <h3 className="text-2xl font-bold mb-2" style={{ color: '#1A1A1A' }}>{pkg.name}</h3>
                <p className="text-sm mb-2" style={{ color: '#666666' }}>{pkg.description}</p>
                <p className="text-xs mb-6" style={{ color: '#999999' }}>Timeline: {pkg.timeline}</p>
                <Link href="/contact" className="mb-6">
                  <button className="w-full py-3.5 rounded-full font-medium text-sm transition-all hover:opacity-90" style={{ backgroundColor: '#1A1A1A', color: '#FFFFFF' }}>
                    Get Started
                  </button>
                </Link>
                <ul className="space-y-3 mt-auto">
                  {pkg.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start gap-3">
                      <svg className="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="#666666">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm" style={{ color: '#1A1A1A' }}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <span className="text-sm font-medium tracking-wide mb-3 block" style={{ color: '#666666' }}>How It Works</span>
            <h2 className="font-bold" style={{ fontSize: 'clamp(28px, 4vw, 42px)', lineHeight: '1.15', color: '#1A1A1A', letterSpacing: '-0.02em' }}>
              Our Process
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, idx) => (
              <motion.div
                key={idx}
                className="p-6 rounded-2xl"
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <span className="text-4xl font-bold mb-4 block" style={{ color: '#E5E5E5' }}>{step.step}</span>
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#1A1A1A' }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#666666' }}>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <span className="text-sm font-medium tracking-wide mb-3 block" style={{ color: '#666666' }}>Results</span>
            <h2 className="font-bold" style={{ fontSize: 'clamp(28px, 4vw, 42px)', lineHeight: '1.15', color: '#1A1A1A', letterSpacing: '-0.02em' }}>
              Outcomes We Aim For
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {outcomes.map((outcome, idx) => (
              <motion.div
                key={idx}
                className="flex items-start gap-3 p-5 rounded-xl"
                style={{ backgroundColor: '#FAFAFA' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="#22C55E">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <p className="text-base" style={{ color: '#1A1A1A' }}>{outcome}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-center mt-8 text-sm" style={{ color: '#999999' }}>
            (We won't promise ROAS fantasies. We'll build a system that gets you real signal and improvement.)
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="max-w-[800px] mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <h2 className="font-bold" style={{ fontSize: 'clamp(28px, 4vw, 42px)', lineHeight: '1.15', color: '#1A1A1A', letterSpacing: '-0.02em' }}>
              FAQs
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                className="rounded-xl overflow-hidden"
                style={{ backgroundColor: '#FFFFFF' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <button
                  className="w-full text-left p-5 flex items-center justify-between"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  data-testid={`faq-${idx}`}
                >
                  <span className="text-base font-medium" style={{ color: '#1A1A1A' }}>{faq.q}</span>
                  <svg 
                    className="w-5 h-5 flex-shrink-0 transition-transform duration-300"
                    style={{ transform: openFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)', color: '#666666' }}
                    viewBox="0 0 20 20" fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5">
                    <p className="text-base leading-relaxed" style={{ color: '#666666' }}>{faq.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28" style={{ backgroundColor: '#1A1A1A' }}>
        <div className="max-w-[800px] mx-auto px-6 md:px-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#FFFFFF' }}>
            Want to know why your ads/funnel aren't converting?
          </h2>
          <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Get a Funnel + Ads Audit — we'll tell you what's broken, what to fix first, and how to scale without wasting spend.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact">
              <button className="px-8 py-4 rounded-full font-medium text-base transition-all hover:opacity-90" style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A' }}>
                Book a Call
              </button>
            </Link>
            <a 
              href="https://wa.me/1234567890" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full font-medium text-base transition-all hover:bg-white/10 inline-flex items-center justify-center gap-2"
              style={{ backgroundColor: 'transparent', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.3)' }}
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <section className="py-12" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="flex justify-between items-center">
            <div className="w-1/2 pr-4">
              <Link href="/services/brand-content" className="group flex items-center gap-3">
                <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" style={{ color: '#666666' }} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <div>
                  <span className="text-xs font-medium tracking-wide block" style={{ color: '#999999' }}>Previous</span>
                  <span className="text-base font-semibold" style={{ color: '#1A1A1A' }}>Brand & Content Studio</span>
                </div>
              </Link>
            </div>
            <div className="w-1/2 pl-4 text-right">
              <Link href="/services/product-web" className="group inline-flex items-center gap-3 justify-end">
                <div>
                  <span className="text-xs font-medium tracking-wide block" style={{ color: '#999999' }}>Next</span>
                  <span className="text-base font-semibold" style={{ color: '#1A1A1A' }}>Product & Web Studio</span>
                </div>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" style={{ color: '#666666' }} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer hideNewsletter />
    </div>
  );
}
