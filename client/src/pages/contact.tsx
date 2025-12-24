import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import logoImage from "@assets/Group_69_(1)_1764854226570.png";

export default function Contact() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="min-h-screen w-full font-sans overflow-x-hidden"
      style={{ 
        backgroundColor: '#FAFAFA',
        color: '#1A1A1A',
        fontFamily: '-apple-system, system-ui, sans-serif',
      }}
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
            WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
            boxShadow: isScrolled ? '0 4px 24px rgba(0,0,0,0.08)' : 'none',
            borderRadius: isScrolled ? '999px' : '0',
            padding: isScrolled ? '0 24px' : '0',
            transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
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

      {/* Office Location Section */}
      <section 
        className="relative overflow-hidden"
        style={{ 
          minHeight: '70vh',
          background: '#FFFFFF',
        }}
      >
        <div 
          className="relative z-10 max-w-[1400px] mx-auto"
          style={{ 
            paddingTop: '140px',
            paddingBottom: '80px',
            paddingLeft: 'clamp(24px, 5vw, 80px)',
            paddingRight: 'clamp(24px, 5vw, 80px)',
          }}
        >
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
            style={{
              background: '#F5F5F5',
              border: '1px solid #E5E5E5',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span 
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: '#1A1A1A' }}
            />
            <span 
              className="text-xs font-medium tracking-widest uppercase"
              style={{ color: '#1A1A1A' }}
            >
              Visit Us
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            className="font-bold mb-5"
            style={{ 
              fontSize: 'clamp(32px, 4.5vw, 52px)',
              lineHeight: '1.1',
              color: '#1A1A1A',
              letterSpacing: '-0.02em',
            }}
            data-testid="contact-hero-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Office <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Location</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            className="text-base md:text-lg leading-relaxed mb-12"
            style={{ color: '#666666', maxWidth: '500px' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            Our office is conveniently located in Coimbatore, providing easy access for clients and partners.
          </motion.p>

          {/* Address Card */}
          <motion.div 
            className="max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div 
              className="p-8 rounded-2xl"
              style={{ 
                backgroundColor: '#FAFAFA',
                border: '1px solid #E5E5E5',
              }}
              data-testid="address-coimbatore"
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: 'rgba(26,26,26,0.05)' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#1A1A1A">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <h3 
                className="text-xl font-semibold mb-3"
                style={{ color: '#1A1A1A', letterSpacing: '-0.01em' }}
              >
                Coimbatore Office
              </h3>
              <p 
                className="text-base leading-relaxed"
                style={{ color: '#666666' }}
              >
                Indiqube Coworking space Coimbatore<br />
                Echo, Avinashi Rd, TNHB Colony,<br />
                Indira Nagar, Civil Aerodrome Post,<br />
                Coimbatore, Tamil Nadu 641014
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section 
        className="py-16 md:py-24 relative z-10"
        style={{ backgroundColor: '#FAFAFA' }}
      >
        <div className="max-w-[720px] mx-auto px-6 md:px-10">
          <motion.h2 
            className="font-bold mb-4 text-center"
            style={{ 
              fontSize: 'clamp(24px, 3vw, 36px)',
              color: '#1A1A1A',
              letterSpacing: '-0.02em',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Get in Touch
          </motion.h2>
          <motion.p 
            className="text-base md:text-lg text-center mb-10"
            style={{ color: '#666666' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Have a project in mind? Let's talk about it.
          </motion.p>

          <motion.form 
            className="space-y-6" 
            data-testid="contact-form"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: '#1A1A1A' }}
                >
                  First Name
                </label>
                <input 
                  type="text"
                  className="w-full px-4 py-3 rounded-xl text-base transition-all"
                  style={{ 
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E5E5',
                    color: '#1A1A1A',
                  }}
                  placeholder="John"
                  data-testid="input-first-name"
                />
              </div>
              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: '#1A1A1A' }}
                >
                  Last Name
                </label>
                <input 
                  type="text"
                  className="w-full px-4 py-3 rounded-xl text-base transition-all"
                  style={{ 
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E5E5',
                    color: '#1A1A1A',
                  }}
                  placeholder="Doe"
                  data-testid="input-last-name"
                />
              </div>
            </div>

            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: '#1A1A1A' }}
              >
                Email
              </label>
              <input 
                type="email"
                className="w-full px-4 py-3 rounded-xl text-base transition-all"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E5E5',
                  color: '#1A1A1A',
                }}
                placeholder="john@example.com"
                data-testid="input-email"
              />
            </div>

            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: '#1A1A1A' }}
              >
                Message
              </label>
              <textarea 
                className="w-full px-4 py-3 rounded-xl text-base resize-none transition-all"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E5E5',
                  color: '#1A1A1A',
                  minHeight: '150px',
                }}
                placeholder="Tell us about your project..."
                data-testid="input-message"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-4 rounded-full text-base font-medium transition-all"
              style={{ 
                backgroundColor: '#1A1A1A',
                color: '#FFFFFF',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.1)';
              }}
              data-testid="button-submit"
            >
              Send Message
            </button>
          </motion.form>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="py-12 relative z-10"
        style={{ backgroundColor: '#FAFAFA', borderTop: '1px solid #E5E5E5' }}
      >
        <div className="max-w-[1120px] mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link href="/">
              <img 
                src={logoImage} 
                alt="Gray Solutions Logo" 
                className="h-8 cursor-pointer"
              />
            </Link>
            <p 
              className="text-sm"
              style={{ color: '#666666' }}
            >
              © 2024 Gray Solutions. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
