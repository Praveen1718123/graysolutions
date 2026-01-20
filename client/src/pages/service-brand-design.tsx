import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import logoImage from "@assets/Frame_33_copy2_2_(1)_1768895375486.png";
import Footer from "@/components/footer";
import heroImage from "@assets/stock_images/professional_brand_d_908b1411.jpg";

export default function ServiceBrandDesign() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { title: "Brand strategy & positioning", desc: "Defining your category, audience, and 'why us' so your brand isn't just another option." },
    { title: "Naming & messaging systems", desc: "Naming, tone of voice, taglines, and message hierarchy that sells without sounding salesy." },
    { title: "Visual identity systems", desc: "Logo direction, typography, color, layouts, and guidelines that scale across teams and platforms." },
    { title: "Brand design kits", desc: "Reusable templates for social, decks, proposals, and internal docs — consistent by default." },
    { title: "Packaging & product presentation", desc: "Packaging, labels, and product visuals designed to look trustable on shelf and online." },
    { title: "Creative direction", desc: "A clear visual lane for shoots, reels, ads, and web — so everything feels like one brand." },
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
                Brand Design
              </h1>
              <p className="text-lg leading-relaxed mb-8" style={{ color: '#666666' }}>
                Building brands that look premium, sound clear, and stay consistent everywhere — from first impression to repeat purchase.
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
                alt="Brand Design"
                className="w-full rounded-2xl"
                loading="lazy"
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
            Ready to build your brand?
          </h2>
          <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Let's create a brand that stands out and drives results.
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
