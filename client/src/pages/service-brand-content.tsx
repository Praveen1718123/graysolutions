import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import logoImage from "@assets/Group_25_(5)_1766734675194.png";
import Footer from "@/components/footer";

export default function ServiceBrandContent() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whoIsFor = [
    "Founders building authority and inbound leads through content (not random posting)",
    "Brands that look \"decent\" but don't feel premium or memorable",
    "Teams creating content but lacking structure, consistency, and a strong point of view",
    "Businesses that want repeatable content systems, not one-off creatives",
  ];

  const problems = [
    "Your brand feels generic — people don't \"get it\" in 10 seconds",
    "Content is inconsistent and depends on mood, not a system",
    "You're posting but not building trust (views ≠ leads)",
    "Messaging is too broad — you attract everyone and close no one",
    "Video quality is fine, but story + hooks + structure are weak",
    "No content pillars, no series, no distribution rhythm",
    "Founder brand exists… but doesn't convert to sales conversations",
  ];

  const modules = [
    {
      title: "Brand Foundation",
      items: [
        "Positioning (who you're for, what you stand for, why you win)",
        "ICP clarity + buyer intent mapping",
        "Messaging framework (tagline, one-liner, narrative, proof points)",
        "Brand voice guidelines (how you speak consistently)",
      ],
    },
    {
      title: "Content Strategy System",
      items: [
        "Content pillars + series formats (so you're not inventing topics daily)",
        "Hook bank + angle bank (for reels + LinkedIn)",
        "Monthly content calendar with themes + objectives",
        "Competitive scan + differentiation angles",
      ],
    },
    {
      title: "Content Production (Reels + Short-form)",
      items: [
        "Script writing (hook → value → proof → CTA)",
        "Creative direction (what to shoot, how to shoot, framing, pacing)",
        "Editing (clean cuts, captions, pacing, retention-first)",
        "Templates for consistent look and feel",
      ],
    },
    {
      title: "Founder/Team Enablement",
      items: [
        "Shooting SOPs (so shooting becomes easy + repeatable)",
        "Prompting + scripting workflows (AI-assisted but human quality)",
        "Feedback loops to improve retention + conversion over time",
      ],
    },
    {
      title: "Distribution & Repurposing",
      items: [
        "Instagram + LinkedIn repurposing plan",
        "Carousels / posts derived from video content",
        "Publishing rhythm + optimization checklist",
      ],
    },
  ];

  const packages = [
    {
      name: "Brand Sprint",
      subtitle: "Strategy-first",
      description: "Best when you're unclear, rebranding, or repositioning.",
      includes: "Brand Foundation + Messaging Framework + Content Pillars + 2 weeks of content plan",
      timeline: "7–14 days",
    },
    {
      name: "Content Engine",
      subtitle: "Monthly",
      description: "Best when you want consistent outputs + quality control.",
      includes: "Content Strategy System + scripting + editing + monthly calendar + optimization loop",
      outputs: "8–16 reels/month + repurposed LinkedIn posts",
      timeline: "Monthly retainer",
    },
    {
      name: "Founder Authority System",
      subtitle: "Premium",
      description: "Best when you want to dominate a niche and convert inbound consistently.",
      includes: "Brand Sprint + Content Engine + founder narrative + series strategy + distribution system",
      timeline: "8–12 weeks initial build, then monthly",
    },
  ];

  const process = [
    {
      step: "01",
      title: "Audit & Direction",
      description: "We review your brand, competitors, current content, and audience signals.",
    },
    {
      step: "02",
      title: "Positioning & Messaging",
      description: "We lock the narrative: what you say, how you say it, and why it matters.",
    },
    {
      step: "03",
      title: "Content System Setup",
      description: "Pillars, series, hooks, templates, and calendar — so execution becomes repeatable.",
    },
    {
      step: "04",
      title: "Execution & Iteration",
      description: "We ship content, track what holds attention, and improve every month.",
    },
  ];

  const outcomes = [
    "People understand what you do within 10 seconds",
    "Your content becomes consistent, structured, and recognizable",
    "More inbound conversations (not just likes)",
    "Stronger authority in your niche + easier sales calls",
    "Brand starts to feel premium and intentional",
  ];

  const proofMetrics = [
    "Watch time / retention improvements",
    "Profile visits → inquiries uplift",
    "Content consistency (weekly output without burnout)",
    "Lead quality (more \"warm\" inbound)",
  ];

  const sampleDeliverables = [
    "Before/After brand messaging",
    "Script + edit examples",
    "Content pillar map + series framework",
    "30-day calendar sample",
  ];

  const faqs = [
    {
      q: "Do you only do editing?",
      a: "No. Editing without positioning is just polishing noise. We start with clarity, then production.",
    },
    {
      q: "Will you shoot videos for us?",
      a: "Usually you shoot with our direction + SOPs. If you want on-ground support, that's add-on / partner-based.",
    },
    {
      q: "Do you handle posting too?",
      a: "We can provide scheduling + distribution workflows. Full social management is separate.",
    },
    {
      q: "What platforms do you focus on?",
      a: "Instagram and LinkedIn by default. YouTube Shorts if it makes sense.",
    },
    {
      q: "How soon will I see results?",
      a: "You'll feel clarity fast (days). Content traction depends on consistency + niche + offer. Expect 4–8 weeks for clear signal.",
    },
    {
      q: "Do you use AI?",
      a: "Yes, for speed — not for soulless output. Strategy + creative judgment stays human.",
    },
  ];

  return (
    <div 
      className="min-h-screen w-full font-sans overflow-x-hidden"
      style={{ backgroundColor: '#FAFAFA', color: '#1A1A1A' }}
    >
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
              style={{ height: isScrolled ? '24px' : '36px', width: 'auto' }}
              data-testid="logo-nav"
            />
          </Link>
        </div>
      </header>

      <section className="pt-24 md:pt-32 pb-16 md:pb-24" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-[800px]"
          >
            <Link href="/services">
              <span className="text-sm font-medium mb-4 inline-block cursor-pointer hover:underline" style={{ color: '#666666' }}>
                ← Back to Services
              </span>
            </Link>
            <h1 
              className="font-bold mb-6"
              style={{ 
                fontSize: 'clamp(32px, 4.5vw, 52px)',
                lineHeight: '1.1',
                color: '#1A1A1A',
                letterSpacing: '-0.02em',
              }}
            >
              Build a brand people trust — and content people actually watch.
            </h1>
            <p className="text-lg md:text-xl leading-relaxed mb-8" style={{ color: '#666666' }}>
              We help founders and teams turn messy ideas into sharp positioning, clean messaging, and a content engine that compounds weekly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact">
                <button 
                  className="px-7 py-3.5 rounded-full font-medium text-sm transition-all hover:opacity-90"
                  style={{ backgroundColor: '#1A1A1A', color: '#FFFFFF' }}
                  data-testid="cta-strategy-call"
                >
                  Book a Strategy Call
                </button>
              </Link>
              <Link href="/contact">
                <button 
                  className="px-7 py-3.5 rounded-full font-medium text-sm transition-all hover:bg-gray-100"
                  style={{ backgroundColor: 'transparent', color: '#1A1A1A', border: '1px solid #E5E5E5' }}
                  data-testid="cta-audit"
                >
                  Get a Brand + Content Audit
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-8 md:py-12" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <p className="text-base md:text-lg" style={{ color: '#666666' }}>
            <strong style={{ color: '#1A1A1A' }}>What this is:</strong> A done-with-you / done-for-you studio for brand strategy + content systems + execution (reels, creative direction, editing, distribution).
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: '#1A1A1A' }}>
            Who This Is For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {whoIsFor.map((item, idx) => (
              <motion.div
                key={idx}
                className="flex items-start gap-3 p-5 rounded-xl"
                style={{ backgroundColor: '#FAFAFA' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#1A1A1A' }} />
                <p className="text-base leading-relaxed" style={{ color: '#1A1A1A' }}>{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24" style={{ backgroundColor: '#1A1A1A' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: '#FFFFFF' }}>
            Problems We Solve
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {problems.map((problem, idx) => (
              <motion.div
                key={idx}
                className="flex items-start gap-3 p-5 rounded-xl"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#E74C8C' }} />
                <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.9)' }}>{problem}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-12" style={{ color: '#1A1A1A' }}>
            What You Get
          </h2>
          <div className="space-y-6">
            {modules.map((module, idx) => (
              <motion.div
                key={idx}
                className="p-8 rounded-2xl"
                style={{ backgroundColor: '#FFFFFF' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm font-bold px-3 py-1 rounded-full" style={{ backgroundColor: '#1A1A1A', color: '#FFFFFF' }}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-xl font-semibold" style={{ color: '#1A1A1A' }}>{module.title}</h3>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-12">
                  {module.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2">
                      <span style={{ color: '#666666' }}>→</span>
                      <span className="text-base" style={{ color: '#666666' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-12" style={{ color: '#1A1A1A' }}>
            Packages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg, idx) => (
              <motion.div
                key={idx}
                className="p-8 rounded-2xl flex flex-col h-full"
                style={{ backgroundColor: idx === 2 ? '#1A1A1A' : '#FAFAFA' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <span className="text-xs font-medium tracking-wide mb-2" style={{ color: idx === 2 ? 'rgba(255,255,255,0.6)' : '#666666' }}>
                  {pkg.subtitle}
                </span>
                <h3 className="text-xl font-bold mb-3" style={{ color: idx === 2 ? '#FFFFFF' : '#1A1A1A' }}>
                  {pkg.name}
                </h3>
                <p className="text-sm mb-4" style={{ color: idx === 2 ? 'rgba(255,255,255,0.8)' : '#666666' }}>
                  {pkg.description}
                </p>
                <div className="mt-auto pt-4 border-t" style={{ borderColor: idx === 2 ? 'rgba(255,255,255,0.1)' : '#E5E5E5' }}>
                  <p className="text-sm mb-2" style={{ color: idx === 2 ? 'rgba(255,255,255,0.7)' : '#666666' }}>
                    <strong style={{ color: idx === 2 ? '#FFFFFF' : '#1A1A1A' }}>Includes:</strong> {pkg.includes}
                  </p>
                  {pkg.outputs && (
                    <p className="text-sm mb-2" style={{ color: idx === 2 ? 'rgba(255,255,255,0.7)' : '#666666' }}>
                      <strong style={{ color: idx === 2 ? '#FFFFFF' : '#1A1A1A' }}>Outputs:</strong> {pkg.outputs}
                    </p>
                  )}
                  <p className="text-sm" style={{ color: idx === 2 ? 'rgba(255,255,255,0.7)' : '#666666' }}>
                    <strong style={{ color: idx === 2 ? '#FFFFFF' : '#1A1A1A' }}>Timeline:</strong> {pkg.timeline}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-12" style={{ color: '#1A1A1A' }}>
            Our Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, idx) => (
              <motion.div
                key={idx}
                className="p-6 rounded-2xl"
                style={{ backgroundColor: '#FFFFFF' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <span className="text-3xl font-bold mb-4 block" style={{ color: '#E5E5E5' }}>{step.step}</span>
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#1A1A1A' }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#666666' }}>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: '#1A1A1A' }}>
            What "Good" Looks Like
          </h2>
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

      <section className="py-16 md:py-24" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-12" style={{ color: '#1A1A1A' }}>
            Proof
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl" style={{ backgroundColor: '#FFFFFF' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#1A1A1A' }}>Mini Results We Track</h3>
              <ul className="space-y-3">
                {proofMetrics.map((metric, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span style={{ color: '#666666' }}>→</span>
                    <span className="text-base" style={{ color: '#666666' }}>{metric}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 rounded-2xl" style={{ backgroundColor: '#FFFFFF' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#1A1A1A' }}>Sample Deliverables We Can Show</h3>
              <ul className="space-y-3">
                {sampleDeliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span style={{ color: '#666666' }}>→</span>
                    <span className="text-base" style={{ color: '#666666' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-[800px] mx-auto px-6 md:px-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: '#1A1A1A' }}>
            FAQs
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                className="rounded-xl overflow-hidden"
                style={{ backgroundColor: '#FAFAFA' }}
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
                    viewBox="0 0 20 20" 
                    fill="currentColor"
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

      <section className="py-16 md:py-24" style={{ backgroundColor: '#1A1A1A' }}>
        <div className="max-w-[800px] mx-auto px-6 md:px-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#FFFFFF' }}>
            Want your brand + content system built properly?
          </h2>
          <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Get a Brand & Content Audit and we'll tell you what's broken, what to fix first, and the fastest path to consistent inbound.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact">
              <button 
                className="px-8 py-4 rounded-full font-medium text-base transition-all hover:opacity-90"
                style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A' }}
                data-testid="cta-book-call-bottom"
              >
                Book a Call
              </button>
            </Link>
            <a 
              href="https://wa.me/1234567890" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full font-medium text-base transition-all hover:bg-white/10 inline-flex items-center justify-center gap-2"
              style={{ backgroundColor: 'transparent', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.3)' }}
              data-testid="cta-whatsapp"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
