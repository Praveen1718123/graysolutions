import React, { useEffect, useState, useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import logoImage from "@assets/Group_25_(5)_1766734675194.png";
import Footer from "@/components/footer";

export default function ServiceCommerceStudio() {
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
    { icon: "🛍️", title: "D2C Brands", desc: "Launching or rebuilding Shopify" },
    { icon: "📊", title: "Brands", desc: "With traffic but low conversion rate" },
    { icon: "📧", title: "Teams", desc: "Lacking retention systems (email/SMS) and losing repeat sales" },
    { icon: "📦", title: "Founders", desc: "Needing a clean catalog + product page system" },
  ];

  const problems = [
    "Low CVR (product page doesn't persuade)",
    "Slow store speed + bad mobile UX",
    "Weak trust signals (reviews, proof, guarantees)",
    "Checkout friction + drop-offs",
    "No email/SMS flows → zero retention",
    "Tracking is broken → ads feel like gambling",
  ];

  const modules = [
    {
      title: "Store Architecture",
      icon: "🏗️",
      items: [
        "Collections + navigation",
        "Search optimization",
        "Product display system",
      ],
    },
    {
      title: "Theme & UX",
      icon: "🎨",
      items: [
        "Premium UI design",
        "Mobile-first conversion UX",
        "Product page layout + copy blocks",
        "Trust signals + social proof",
      ],
    },
    {
      title: "Retention & Tracking",
      icon: "📈",
      items: [
        "Welcome + cart abandon flows",
        "Post-purchase sequences",
        "Pixel/GA4 setup",
        "Key event tracking",
      ],
    },
  ];

  const packages = [
    {
      name: "Shopify Launch",
      badge: "Set A",
      description: "New store, done right from the start.",
      timeline: "3–4 weeks",
      features: [
        "Store architecture",
        "Theme customization",
        "Product page system",
        "Basic tracking setup",
      ],
    },
    {
      name: "Shopify Revamp",
      badge: "Set B",
      description: "Rebuild + conversion upgrades for existing stores.",
      timeline: "4–6 weeks",
      features: [
        "Conversion audit",
        "Theme rebuild",
        "Speed optimization",
        "Checkout improvements",
        "Trust signal upgrades",
      ],
      featured: true,
    },
    {
      name: "Shopify Growth System",
      badge: "Set C",
      description: "Store + retention + tracking + monthly optimization.",
      timeline: "8–12 weeks + monthly",
      features: [
        "Everything in Set B",
        "Email/SMS flows",
        "Advanced tracking",
        "Monthly optimization",
        "Performance reporting",
      ],
    },
  ];

  const process = [
    { step: "01", title: "Audit", description: "We review your store, pages, and tracking setup." },
    { step: "02", title: "Roadmap", description: "We prioritize fixes and build a design system." },
    { step: "03", title: "Build", description: "We develop, test, and optimize for performance." },
    { step: "04", title: "Launch & Optimize", description: "We go live and continuously improve conversions." },
  ];

  const outcomes = [
    "Higher conversion rate",
    "Better average order value",
    "Better repeat purchase rate",
    "Cleaner attribution",
    "Faster store speed",
  ];

  const faqs = [
    { q: "Do you run ads too?", a: "Yes, via our Growth & Performance service (separate engagement)." },
    { q: "Do you do Shopify only?", a: "Mostly yes, to stay sharp and deliver the best results." },
    { q: "Can you migrate from Woo/Wix?", a: "Yes, we handle full migrations to Shopify." },
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
          src="/assets/commerce-studio-video.mp4"
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
              COMMERCE STUDIO
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
              Shopify stores that sell — not just "look nice."
            </h1>
            <p className="text-lg md:text-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
              We build and optimize Shopify for conversion: product pages, checkout, speed, retention flows, and tracking.
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
              <h2 className="font-bold" style={{ fontSize: 'clamp(28px, 4vw, 42px)', lineHeight: '1.15', color: '#1A1A1A', letterSpacing: '-0.02em' }}>
                Commerce Studio
              </h2>
              <Link href="/contact">
                <button className="mt-6 px-6 py-3 rounded-full font-medium text-sm transition-all hover:opacity-90" style={{ backgroundColor: '#1A1A1A', color: '#FFFFFF' }}>
                  Get a Store Audit
                </button>
              </Link>
            </div>
            <div>
              <p className="text-lg leading-relaxed" style={{ color: '#666666' }}>
                A Shopify-focused commerce studio that builds and optimizes stores for real conversion. We handle everything from product pages to retention flows and tracking.
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
              Built For E-commerce Brands
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
              <h2 className="font-bold" style={{ fontSize: 'clamp(28px, 4vw, 42px)', lineHeight: '1.15', color: '#1A1A1A', letterSpacing: '-0.02em' }}>
                Problems We Solve
              </h2>
            </div>
            <div>
              <p className="text-lg leading-relaxed" style={{ color: '#666666' }}>
                Most Shopify stores leave money on the table. Here's what we fix:
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
            <h2 className="font-bold" style={{ fontSize: 'clamp(28px, 4vw, 42px)', lineHeight: '1.15', color: '#1A1A1A', letterSpacing: '-0.02em' }}>
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
              Outcomes We Deliver
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
            Want to know what's killing your conversion?
          </h2>
          <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Get a Store Audit with prioritized fixes.
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
              <Link href="/services/product-web" className="group flex items-center gap-3">
                <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" style={{ color: '#666666' }} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <div>
                  <span className="text-xs font-medium tracking-wide block" style={{ color: '#999999' }}>Previous</span>
                  <span className="text-base font-semibold" style={{ color: '#1A1A1A' }}>Product & Web Studio</span>
                </div>
              </Link>
            </div>
            <div className="w-1/2 pl-4 text-right">
              <Link href="/services/automations-ai" className="group inline-flex items-center gap-3 justify-end">
                <div>
                  <span className="text-xs font-medium tracking-wide block" style={{ color: '#999999' }}>Next</span>
                  <span className="text-base font-semibold" style={{ color: '#1A1A1A' }}>Automations & AI</span>
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
