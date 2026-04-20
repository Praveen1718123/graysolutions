import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import logoImage from "@assets/Frame_33_copy2_2_(1)_1768895375486.png";
import comingSoonBg from "@assets/optimized/coming_soon_bg.webp";

export default function Blogs() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen w-full font-sans overflow-x-hidden" style={{ backgroundColor: '#1A1A1A' }}>
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
              width="140"
              height="64"
              decoding="async"
              alt="Gray Logo" 
              className="cursor-pointer"
              style={{ height: isScrolled ? '28px' : '48px', width: 'auto', filter: isScrolled ? 'none' : 'brightness(0) invert(1)' }}
              data-testid="logo-nav"
            />
          </Link>
        </div>
      </header>

      <section 
        className="relative w-full min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${comingSoonBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <img 
          src={logoImage}
              width="140"
              height="64"
              decoding="async"
          alt="Gray Logo" 
          className="absolute top-6 right-6 md:top-10 md:right-10 z-20"
          style={{ height: '32px', width: 'auto' }}
        />
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Link href="/">
            <button 
              className="px-8 py-4 rounded-full font-medium text-base transition-all hover:opacity-90"
              style={{ backgroundColor: '#1A1A1A', color: '#FFFFFF' }}
              data-testid="btn-back-home"
            >
              Back to Home
            </button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
