import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import logoImage from "@assets/Group_69_(1)_1764854226570.png";
import dublinImage from "@assets/stock_images/dublin_ireland_color_dfc67244.jpg";
import laImage from "@assets/stock_images/los_angeles_modern_o_b3669598.jpg";
import remoteImage from "@assets/stock_images/woman_working_remote_bded3fda.jpg";

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
    <motion.div 
      className="min-h-screen w-full font-sans"
      style={{ 
        backgroundColor: '#F6F7FA',
        color: '#0F172A',
        fontFamily: '-apple-system, system-ui, sans-serif'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
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
            backgroundColor: isScrolled ? 'rgba(255,255,255,0.92)' : '#F6F7FA',
            backdropFilter: isScrolled ? 'blur(12px)' : 'none',
            WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
            boxShadow: isScrolled ? '0 4px 24px rgba(0,0,0,0.1)' : 'none',
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
        className="pt-32 pb-16 md:pb-24 relative z-10"
        style={{ backgroundColor: '#F6F7FA' }}
      >
        <div className="max-w-[1120px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Text & Address Cards */}
            <div>
              <span 
                className="text-sm font-medium mb-4 inline-block"
                style={{ color: '#7B3FE4' }}
              >
                [Visit Us]
              </span>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#1A1A1A' }}>
                Office <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Location</span>
              </h1>
              
              <p 
                className="text-lg leading-relaxed mb-10"
                style={{ color: 'rgba(26,26,26,0.6)' }}
              >
                Our office is conveniently located in the heart of these cities, providing easy access for clients and partners.
              </p>

              {/* Address Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* USA Headquarter */}
                <div 
                  className="p-6 rounded-2xl"
                  style={{ 
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(0,0,0,0.05)',
                  }}
                  data-testid="address-usa"
                >
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: 'rgba(123,63,228,0.1)' }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#7B3FE4">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                  <h3 
                    className="text-lg font-semibold mb-2"
                    style={{ color: '#1A1A1A' }}
                  >
                    USA Headquarter
                  </h3>
                  <p 
                    className="text-sm leading-relaxed"
                    style={{ color: 'rgba(26,26,26,0.6)' }}
                  >
                    Los Angeles, CA 90017<br />
                    United States
                  </p>
                </div>

                {/* Europe Headquarter */}
                <div 
                  className="p-6 rounded-2xl"
                  style={{ 
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(0,0,0,0.05)',
                  }}
                  data-testid="address-europe"
                >
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: 'rgba(123,63,228,0.1)' }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#7B3FE4">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                  <h3 
                    className="text-lg font-semibold mb-2"
                    style={{ color: '#1A1A1A' }}
                  >
                    Europe Headquarter
                  </h3>
                  <p 
                    className="text-sm leading-relaxed"
                    style={{ color: 'rgba(26,26,26,0.6)' }}
                  >
                    Ireland, County Dublin D02<br />
                    ABC1
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Images Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Dublin Image */}
              <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '1/1.1' }}>
                <img 
                  src={dublinImage} 
                  alt="Dublin Office" 
                  className="w-full h-full object-cover"
                />
                <div 
                  className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-sm font-medium"
                  style={{ backgroundColor: 'rgba(255,255,255,0.9)', color: '#1A1A1A' }}
                >
                  Dublin
                </div>
              </div>

              {/* Los Angeles Image */}
              <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '1/1.1' }}>
                <img 
                  src={laImage} 
                  alt="Los Angeles Office" 
                  className="w-full h-full object-cover"
                />
                <div 
                  className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-sm font-medium"
                  style={{ backgroundColor: 'rgba(255,255,255,0.9)', color: '#1A1A1A' }}
                >
                  Los Angeles
                </div>
              </div>

              {/* Remote Image - spans 2 columns */}
              <div className="col-span-2 relative rounded-2xl overflow-hidden" style={{ aspectRatio: '2/1' }}>
                <img 
                  src={remoteImage} 
                  alt="Remote Team" 
                  className="w-full h-full object-cover"
                />
                <div 
                  className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-sm font-medium"
                  style={{ backgroundColor: 'rgba(255,255,255,0.9)', color: '#1A1A1A' }}
                >
                  Remote
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section 
        className="py-16 md:py-24 relative z-10"
        style={{ backgroundColor: '#F6F7FA' }}
      >
        <div className="max-w-[720px] mx-auto px-6 md:px-10">
          <h2 
            className="text-2xl md:text-3xl font-bold mb-4 text-center"
            style={{ color: '#1A1A1A' }}
          >
            Get in Touch
          </h2>
          <p 
            className="text-lg text-center mb-10"
            style={{ color: 'rgba(26,26,26,0.6)' }}
          >
            Have a project in mind? Let's talk about it.
          </p>

          <form className="space-y-6" data-testid="contact-form">
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
                  className="w-full px-4 py-3 rounded-xl text-base"
                  style={{ 
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(0,0,0,0.1)',
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
                  className="w-full px-4 py-3 rounded-xl text-base"
                  style={{ 
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(0,0,0,0.1)',
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
                className="w-full px-4 py-3 rounded-xl text-base"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(0,0,0,0.1)',
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
                className="w-full px-4 py-3 rounded-xl text-base resize-none"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(0,0,0,0.1)',
                  color: '#1A1A1A',
                  minHeight: '150px',
                }}
                placeholder="Tell us about your project..."
                data-testid="input-message"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-4 rounded-full text-base font-medium transition-all duration-200"
              style={{ 
                backgroundColor: '#1A1A1A',
                color: '#FFFFFF',
              }}
              data-testid="button-submit"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="py-12 relative z-10"
        style={{ backgroundColor: '#F6F7FA', borderTop: '1px solid rgba(0,0,0,0.05)' }}
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
              style={{ color: 'rgba(26,26,26,0.6)' }}
            >
              © 2024 Gray Solutions. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
