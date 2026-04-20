import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import logoImage from "@assets/Frame_33_copy2_2_(1)_1768895375486.png";
import Footer from "@/components/footer";
import { services as allServices } from "@/data/services";
import heroImage from "@assets/Go_Gauge_Slide_1-01_1767087653809.webp";
import containerImage from "@assets/6395621_2045_1767087653808.webp";
import laptopImage from "@assets/e3b89fe5-7e4b-4ce3-a4fd-7120f52e9261_1767087653809.webp";
import brandingImage from "@assets/Go_Gauge_Work-01_1767087653809.webp";
import standeeImage from "@assets/Go_Gauge_Standee_New_1767087653809.webp";
import socialImage from "@assets/GO_GAUGE_WORKS_2_1767087653809.webp";
import overviewImage from "@assets/2_1767087653805.webp";

export default function GoGauge() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    "Brand Identity",
    "Logo Design",
    "Website Design",
    "Digital Marketing",
    "Social Media",
    "Merchandising",
    "Presentation Design",
    "Print Collateral",
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
            backgroundColor: isScrolled ? 'rgba(255,255,255,0.92)' : '#FAFAFA',
            backdropFilter: isScrolled ? 'blur(12px)' : 'none',
            boxShadow: isScrolled ? '0 4px 24px rgba(0,0,0,0.1)' : 'none',
            borderRadius: isScrolled ? '999px' : '0',
            transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <Link href="/">
            <img 
              src={logoImage}
              width="140"
              height="64"
              decoding="async"
              alt="Gray Logo" 
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

      <section className="pt-24 md:pt-32 pb-12 md:pb-24" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 
                className="font-bold mb-6"
                style={{ 
                  fontSize: 'clamp(32px, 4.5vw, 52px)',
                  lineHeight: '1.1',
                  color: '#1A1A1A',
                  letterSpacing: '-0.02em',
                }}
                data-testid="hero-headline"
              >
                GoGauge — Building a Marine & Logistics Brand from Ground Up.
              </h1>
              <p 
                className="text-base md:text-lg leading-relaxed mb-8"
                style={{ color: '#666666' }}
              >
                A complete brand identity and digital presence for GoGauge, a project forwarding and marine logistics company operating across Singapore, Malaysia, India, and UAE.
              </p>
              
              <div className="flex flex-wrap gap-2">
                {services.slice(0, 4).map((tag) => (
                  <span 
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-xs font-medium"
                    style={{ backgroundColor: '#F5F5F5', color: '#666666' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img 
                src={heroImage} 
                alt="GoGauge brand identity"
                className="w-full rounded-2xl"
                style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <span className="text-sm font-medium tracking-wide mb-3 block" style={{ color: '#666666' }}>Overview</span>
              <h2 
                className="font-bold mb-6"
                style={{ fontSize: 'clamp(28px, 4vw, 42px)', lineHeight: '1.15', color: '#1A1A1A', letterSpacing: '-0.02em' }}
              >
                A Brand Built for Global Logistics
              </h2>
            </div>
            <div>
              <p className="text-base leading-relaxed mb-4" style={{ color: '#666666' }}>
                GoGauge is a project forwarding and marine logistics company specializing in heavy transportation, engineering solutions, and multimodal transport across Asia and the Middle East.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#666666' }}>
                We partnered with GoGauge to build their complete brand identity from scratch — including logo design, brand guidelines, website, digital marketing, social media presence, and all print collateral.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-10">
          <div className="flex flex-wrap gap-3">
            {allServices
              .filter((s) => ["brand-content", "growth-performance", "product-web"].includes(s.id))
              .map((s) => (
                <Link key={s.id} href={s.href}>
                  <span
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer hover:shadow-md"
                    style={{ backgroundColor: '#F5F5F5', color: '#1A1A1A', border: '1px solid #E5E5E5' }}
                    data-testid={`service-chip-${s.id}`}
                  >
                    {s.title}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-10">
          <motion.img 
            src={overviewImage}
            alt="GoGauge complete brand materials"
            className="w-full rounded-2xl"
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </section>

      <section className="py-16 md:py-24" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-10">
          <div className="text-center mb-12">
            <span className="text-sm font-medium tracking-wide mb-3 block" style={{ color: '#666666' }}>What We Did</span>
            <h2 
              className="font-bold"
              style={{ fontSize: 'clamp(28px, 4vw, 42px)', lineHeight: '1.15', color: '#1A1A1A', letterSpacing: '-0.02em' }}
            >
              Full-Service Brand Partnership
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {services.map((service, idx) => (
              <motion.div
                key={service}
                className="p-5 rounded-xl text-center"
                style={{ backgroundColor: '#FAFAFA' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <span className="text-sm font-medium" style={{ color: '#1A1A1A' }}>{service}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <motion.img 
              src={containerImage}
              alt="GoGauge shipping container branding"
              className="w-full rounded-2xl"
              loading="lazy"
              decoding="async"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            />
            <motion.img 
              src={laptopImage}
              alt="GoGauge website on laptop"
              className="w-full rounded-2xl"
              loading="lazy"
              decoding="async"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <span className="text-sm font-medium tracking-wide mb-3 block" style={{ color: '#666666' }}>Brand Identity</span>
              <h2 
                className="font-bold mb-6"
                style={{ fontSize: 'clamp(28px, 4vw, 42px)', lineHeight: '1.15', color: '#1A1A1A', letterSpacing: '-0.02em' }}
              >
                A System Built for Scale
              </h2>
            </div>
            <div>
              <p className="text-base leading-relaxed" style={{ color: '#666666' }}>
                The GoGauge brand identity was designed to work across all touchpoints — from shipping containers to corporate presentations, from social media to trade show materials. The distinctive blue color palette and bold typography create instant recognition in the logistics industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-10">
          <motion.img 
            src={brandingImage}
            alt="GoGauge brand guidelines"
            className="w-full rounded-2xl"
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </section>

      <section className="py-16 md:py-24" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <motion.img 
              src={standeeImage}
              alt="GoGauge trade show standees"
              className="w-full rounded-2xl"
              loading="lazy"
              decoding="async"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            />
            <motion.img 
              src={socialImage}
              alt="GoGauge social media content"
              className="w-full rounded-2xl"
              loading="lazy"
              decoding="async"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28" style={{ backgroundColor: '#1A1A1A' }}>
        <div className="max-w-[800px] mx-auto px-4 md:px-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#FFFFFF' }}>
            Ready to build your brand?
          </h2>
          <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Let's create a brand identity that works across every touchpoint.
          </p>
          <Link href="/contact">
            <button className="px-8 py-4 rounded-full font-medium text-base transition-all hover:opacity-90" style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A' }}>
              Start a Project
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
