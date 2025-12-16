import React, { useEffect, useState, useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import logoImage from "@assets/Group_69_(1)_1764854226570.png";

export default function MagicTrucks() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const behindTheScenes = [
    { id: 1, placeholder: "Team meeting with logistics experts" },
    { id: 2, placeholder: "Truck design workshop" },
    { id: 3, placeholder: "App prototype testing" },
    { id: 4, placeholder: "Night shoot on highway" },
    { id: 5, placeholder: "Driver interviews" },
    { id: 6, placeholder: "Final brand reveal" },
  ];

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % (behindTheScenes.length - 2));
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev - 1 + (behindTheScenes.length - 2)) % (behindTheScenes.length - 2));
  };

  return (
    <motion.div 
      className="min-h-screen w-full"
      style={{ 
        backgroundColor: '#F6F7FA',
        color: '#1A1A1A',
        fontFamily: '-apple-system, system-ui, sans-serif'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Fixed Header */}
      <header 
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: isScrolled ? 'rgba(255,255,255,0.95)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          transition: 'all 400ms ease',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-5 flex justify-between items-center">
          <Link href="/">
            <img 
              src={logoImage} 
              alt="Gray Solutions" 
              className="h-8 cursor-pointer"
              style={{ filter: isScrolled ? 'none' : 'brightness(0) invert(1)' }}
              data-testid="logo-nav"
            />
          </Link>
          <nav className="flex gap-8">
            <Link href="/services" className="text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: isScrolled ? '#1A1A1A' : '#FFFFFF' }}>
              Work
            </Link>
            <Link href="/about" className="text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: isScrolled ? '#1A1A1A' : '#FFFFFF' }}>
              About
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section - Full Viewport */}
      <section 
        className="relative h-screen flex items-end"
        style={{ backgroundColor: '#0A0A0A' }}
      >
        {/* Placeholder Background */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)',
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pb-20 md:pb-32 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span 
              className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 block"
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              Magic Trucks
            </span>
            <h1 
              className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.1] mb-6"
              style={{ color: '#FFFFFF', fontFamily: 'Georgia, serif', maxWidth: '800px' }}
              data-testid="hero-headline"
            >
              Reinventing logistics on wheels
            </h1>
          </motion.div>
        </div>

        {/* Scroll Cue */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Project Overview Section */}
      <section className="py-20 md:py-32" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
            {/* Left - Overview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 
                className="text-3xl md:text-4xl font-bold leading-tight mb-6"
                style={{ color: '#1A1A1A' }}
              >
                Taking logistics where it's never been
              </h2>
              <p 
                className="text-lg leading-relaxed"
                style={{ color: 'rgba(26,26,26,0.6)' }}
              >
                We helped Magic Trucks redefine freight delivery through cutting-edge technology, cohesive branding, and intuitive user experience. From fleet management dashboards to driver-facing apps, every touchpoint was designed to elevate the industry standard.
              </p>
            </motion.div>

            {/* Right - Project Details */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="space-y-6">
                {[
                  { label: "CLIENT", value: "Magic Trucks" },
                  { label: "PROJECT", value: "Brand & Digital Platform" },
                  { label: "SERVICES", value: "Branding, UX/UI Design, Web Development, Strategy, Motion" },
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    className="pb-6"
                    style={{ borderBottom: '1px solid rgba(26,26,26,0.1)' }}
                  >
                    <span 
                      className="text-xs font-semibold tracking-[0.15em] uppercase block mb-2"
                      style={{ color: 'rgba(26,26,26,0.4)' }}
                    >
                      {item.label}
                    </span>
                    <span className="text-base" style={{ color: '#1A1A1A' }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Narrative Section - Rewriting the Rulebook */}
      <section className="py-20 md:py-32" style={{ backgroundColor: '#F6F7FA' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 
                className="text-3xl md:text-4xl font-bold leading-tight mb-6"
                style={{ color: '#1A1A1A' }}
              >
                Rewriting the rulebook
              </h2>
              <p 
                className="text-lg leading-relaxed mb-10"
                style={{ color: 'rgba(26,26,26,0.6)' }}
              >
                This project challenged the norms of trucking — moving from plain utility to a cohesive brand experience. We designed for a new generation of drivers and logistics managers who expect clarity, reliability, and modern aesthetics.
              </p>
              {/* Image Placeholder */}
              <div 
                className="aspect-[4/5] rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: 'rgba(26,26,26,0.08)' }}
              >
                <span className="text-sm" style={{ color: 'rgba(26,26,26,0.3)' }}>Driver portrait placeholder</span>
              </div>
            </motion.div>

            {/* Right Column - Large Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center"
            >
              <div 
                className="aspect-[3/4] w-full rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: 'rgba(26,26,26,0.08)' }}
              >
                <span className="text-sm" style={{ color: 'rgba(26,26,26,0.3)' }}>Truck branding detail placeholder</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Highlight Section */}
      <section className="py-20 md:py-32" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 
                className="text-3xl md:text-4xl font-bold leading-tight mb-6"
                style={{ color: '#1A1A1A' }}
              >
                The first connected trucking platform
              </h2>
              <p 
                className="text-lg leading-relaxed"
                style={{ color: 'rgba(26,26,26,0.6)' }}
              >
                Magic Trucks introduced a connected app ecosystem — real-time fleet tracking, driver dashboards, and a modular container system that revolutionized load management. We collaborated with logistics engineers to create interfaces that work in motion.
              </p>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div 
                className="aspect-[4/3] rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: 'rgba(26,26,26,0.08)' }}
              >
                <span className="text-sm" style={{ color: 'rgba(26,26,26,0.3)' }}>App interface on tablet placeholder</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Collage Grid Section */}
      <section className="py-20 md:py-32" style={{ backgroundColor: '#F6F7FA' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Large image */}
            <motion.div 
              className="col-span-2 row-span-2 aspect-square rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: 'rgba(26,26,26,0.08)' }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-sm" style={{ color: 'rgba(26,26,26,0.3)' }}>Trucks on road placeholder</span>
            </motion.div>
            {/* Smaller images */}
            <motion.div 
              className="aspect-square rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: 'rgba(26,26,26,0.08)' }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="text-sm" style={{ color: 'rgba(26,26,26,0.3)' }}>Close-up detail</span>
            </motion.div>
            <motion.div 
              className="aspect-square rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: 'rgba(26,26,26,0.08)' }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="text-sm" style={{ color: 'rgba(26,26,26,0.3)' }}>Team member</span>
            </motion.div>
            <motion.div 
              className="aspect-square rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: 'rgba(26,26,26,0.08)' }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="text-sm" style={{ color: 'rgba(26,26,26,0.3)' }}>Hardware detail</span>
            </motion.div>
            <motion.div 
              className="aspect-square rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: 'rgba(26,26,26,0.08)' }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span className="text-sm" style={{ color: 'rgba(26,26,26,0.3)' }}>Brand application</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lifestyle / Outcome Section */}
      <section className="py-20 md:py-32" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 
                className="text-3xl md:text-5xl font-serif leading-tight mb-6"
                style={{ color: '#1A1A1A', fontFamily: 'Georgia, serif' }}
              >
                Claiming the future of logistics
              </h2>
              <p 
                className="text-lg leading-relaxed"
                style={{ color: 'rgba(26,26,26,0.6)' }}
              >
                This wasn't just a tech upgrade — it was a lifestyle shift for drivers and operators. We positioned Magic Trucks as both efficient and aspirational, transforming how the industry perceives freight delivery.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div 
                className="aspect-[4/3] rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: 'rgba(26,26,26,0.08)' }}
              >
                <span className="text-sm" style={{ color: 'rgba(26,26,26,0.3)' }}>Driver lifestyle shot placeholder</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Campaign Section - Owning the Road */}
      <section className="py-20 md:py-32" style={{ backgroundColor: '#F6F7FA' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 
                className="text-3xl md:text-4xl font-bold leading-tight mb-6"
                style={{ color: '#1A1A1A' }}
              >
                Owning the Road
              </h2>
              <p 
                className="text-lg leading-relaxed"
                style={{ color: 'rgba(26,26,26,0.6)' }}
              >
                The launch campaign used twilight cinematography and dynamic motion to capture the essence of modern logistics. We partnered with industry media and featured real drivers as brand ambassadors, creating authentic storytelling that resonated with both operators and end customers.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div 
                className="aspect-video rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: 'rgba(26,26,26,0.08)' }}
              >
                <span className="text-sm" style={{ color: 'rgba(26,26,26,0.3)' }}>Cinematic truck shot placeholder</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Behind the Scenes Carousel */}
      <section className="py-20 md:py-32" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#1A1A1A' }}>
              Behind the scenes
            </h2>
            <p className="text-lg" style={{ color: 'rgba(26,26,26,0.5)' }}>
              We literally moved mountains
            </p>
          </motion.div>

          {/* Carousel */}
          <div className="relative">
            <div className="overflow-hidden" ref={carouselRef}>
              <motion.div 
                className="flex gap-4"
                animate={{ x: `-${carouselIndex * 33.33}%` }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                {behindTheScenes.map((item) => (
                  <div 
                    key={item.id}
                    className="flex-shrink-0 w-[calc(33.33%-12px)] aspect-[4/3] rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(26,26,26,0.08)', border: '1px solid rgba(26,26,26,0.06)' }}
                  >
                    <span className="text-sm text-center px-4" style={{ color: 'rgba(26,26,26,0.3)' }}>
                      {item.placeholder}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="flex gap-3 mt-6">
              <button 
                onClick={prevSlide}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
                style={{ border: '1px solid rgba(26,26,26,0.15)' }}
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={nextSlide}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
                style={{ border: '1px solid rgba(26,26,26,0.15)' }}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Results / Metrics Section */}
      <section className="py-20 md:py-32" style={{ backgroundColor: '#1A1A1A' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {[
              { number: "500+", label: "Managed loads delivered, 12 new markets opened in 3 months" },
              { number: "10M", label: "Campaign reach across digital and traditional media channels" },
              { number: "200%+", label: "Increased operational efficiency and reduced carbon footprint" },
            ].map((metric, idx) => (
              <motion.div
                key={idx}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <div 
                  className="text-5xl md:text-6xl font-bold mb-4"
                  style={{ color: '#FFFFFF' }}
                >
                  {metric.number}
                </div>
                <p 
                  className="text-base leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                >
                  {metric.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Case Teaser */}
      <section className="py-20 md:py-32" style={{ backgroundColor: '#F6F7FA' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span 
              className="text-sm font-medium tracking-wide mb-6 block"
              style={{ color: 'rgba(26,26,26,0.5)' }}
            >
              Next Up...
            </span>
            <Link href="/services">
              <div 
                className="group cursor-pointer rounded-2xl overflow-hidden"
                style={{ backgroundColor: '#FFFFFF' }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div 
                    className="aspect-video md:aspect-auto flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(26,26,26,0.08)' }}
                  >
                    <span className="text-sm" style={{ color: 'rgba(26,26,26,0.3)' }}>Next project image</span>
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <h3 
                      className="text-2xl md:text-3xl font-bold mb-3 group-hover:opacity-70 transition-opacity"
                      style={{ color: '#1A1A1A' }}
                    >
                      Next Project Title
                    </h3>
                    <p style={{ color: 'rgba(26,26,26,0.5)' }}>
                      View case study →
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12" style={{ backgroundColor: '#1A1A1A' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <img 
              src={logoImage} 
              alt="Gray Solutions" 
              className="h-8 brightness-0 invert"
            />
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Based in India. Working globally.
            </p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
