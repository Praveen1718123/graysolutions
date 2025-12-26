import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import logoImage from "@assets/Group_25_(5)_1766734675194.png";
import Footer from "@/components/footer";
import heroImage from "@assets/stock_images/modern_digital_produ_807a649b.jpg";

export default function ServiceProductDesign() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { title: "Solutions design & consulting", desc: "Defining technology strategies to operationalize new solutions and capabilities." },
    { title: "Product strategy & vision", desc: "Identifying product opportunities, prioritizing the right bets, and shaping the roadmap." },
    { title: "Experience design & development", desc: "Designing and validating flows fast — from wireframes to high-fidelity UI." },
    { title: "AI product strategy & development", desc: "LLM integrations, agent workflows, and AI features designed like real product—not demos." },
    { title: "Commerce experience design", desc: "Conversion-first shopping experiences across web, mobile, and marketplaces." },
    { title: "Design systems & components", desc: "A scalable UI kit that keeps your product consistent and speeds up development." },
  ];

  return (
    <div 
      className="min-h-screen w-full font-sans overflow-x-hidden"
      style={{ backgroundColor: '#FAFAFA', color: '#1A1A1A' }}
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

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-24" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
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
                Product & Experience Design
              </h1>
              <p className="text-lg leading-relaxed mb-8" style={{ color: '#666666' }}>
                Reimagining how people interact with your brand through digital products and experiences that drive business and human impact.
              </p>
              <Link href="/contact">
                <button 
                  className="px-7 py-3.5 rounded-full font-medium text-sm transition-all hover:opacity-90"
                  style={{ backgroundColor: '#1A1A1A', color: '#FFFFFF' }}
                >
                  Start a Project
                </button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img 
                src={heroImage}
                alt="Product Design"
                className="w-full rounded-2xl"
                loading="eager"
                decoding="async"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-12" style={{ color: '#1A1A1A' }}>
            What's Included
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                className="p-8 rounded-2xl"
                style={{ backgroundColor: '#FFFFFF' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <h3 className="text-lg font-semibold mb-3" style={{ color: '#1A1A1A' }}>
                  {service.title}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: '#666666' }}>
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#1A1A1A' }}>
        <div className="max-w-[800px] mx-auto px-6 md:px-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#FFFFFF' }}>
            Ready to build your product?
          </h2>
          <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Let's design experiences that users love and businesses thrive on.
          </p>
          <Link href="/contact">
            <button 
              className="px-8 py-4 rounded-full font-medium text-base transition-all hover:opacity-90"
              style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A' }}
            >
              Get Started
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
