import React, { useState } from "react";
import { Link } from "wouter";
import logoImage from "@assets/Group_69_(1)_1764854226570.png";

export default function Footer() {
  const [email, setEmail] = useState("");

  const navLinks = {
    left: [
      { label: "Services", href: "/services" },
      { label: "Case Studies", href: "/#case-studies" },
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blogs" },
    ],
    right: [
      { label: "Journal", href: "/blogs" },
      { label: "Careers", href: "/contact" },
      { label: "Contact", href: "/contact" },
    ],
  };

  return (
    <footer className="relative z-10">
      {/* Section 1: Let's Connect - Light Background */}
      <section 
        className="py-16 md:py-20"
        style={{ backgroundColor: '#FAFAFA' }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <h2 
            className="font-bold mb-4"
            style={{ 
              fontSize: 'clamp(32px, 4.5vw, 48px)',
              lineHeight: '1.1',
              color: '#1A1A1A',
              letterSpacing: '-0.02em',
            }}
          >
            Let's connect
          </h2>
          <p 
            className="text-lg mb-8"
            style={{ color: '#666666', maxWidth: '500px' }}
          >
            Get in touch to learn more about how we help businesses grow through design, technology, and strategy.
          </p>
          <Link href="/contact">
            <button 
              className="px-6 py-3 rounded-full font-medium text-sm flex items-center gap-2 transition-all hover:opacity-90"
              style={{ 
                backgroundColor: 'transparent', 
                color: '#1A1A1A', 
                border: '1px solid #1A1A1A' 
              }}
              data-testid="footer-contact-us"
            >
              CONTACT US
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </button>
          </Link>
        </div>
      </section>

      {/* Section 2: Newsletter - Gradient Background */}
      <section 
        className="py-10 md:py-14"
        style={{ 
          background: 'linear-gradient(135deg, #7B3FE4 0%, #E879F9 50%, #FB923C 100%)',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <h3 
              className="font-bold text-white"
              style={{ 
                fontSize: 'clamp(24px, 3vw, 32px)',
                letterSpacing: '-0.01em',
              }}
            >
              Join our newsletter
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 rounded-lg text-sm w-full sm:w-64"
                style={{ 
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: '#FFFFFF',
                }}
                data-testid="footer-email-input"
              />
              <button 
                className="px-6 py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 whitespace-nowrap"
                style={{ 
                  backgroundColor: '#1A1A1A', 
                  color: '#FFFFFF',
                }}
                data-testid="footer-subscribe"
              >
                SUBSCRIBE
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Main Footer - Dark Background */}
      <section style={{ backgroundColor: '#1A1A1A' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-12 md:py-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10">
            {/* Left - Large Brand Name */}
            <div className="flex-1">
              <div className="flex items-end gap-6 flex-wrap">
                <h2 
                  className="font-bold leading-none"
                  style={{ 
                    fontSize: 'clamp(48px, 10vw, 120px)',
                    color: '#F5F5F0',
                    letterSpacing: '-0.03em',
                    fontFamily: 'Georgia, serif',
                  }}
                >
                  Gray
                </h2>
                <div className="pb-2 md:pb-4">
                  <p 
                    className="text-base md:text-lg leading-tight"
                    style={{ color: 'rgba(255,255,255,0.6)' }}
                  >
                    Product Design<br />
                    & Technology<br />
                    Studio
                  </p>
                </div>
              </div>
            </div>

            {/* Right - Navigation Links */}
            <div className="flex gap-12 md:gap-16">
              <ul className="space-y-2">
                {navLinks.left.map((link, idx) => (
                  <li key={idx}>
                    <Link href={link.href}>
                      <span 
                        className="text-sm hover:text-white transition-colors cursor-pointer"
                        style={{ color: 'rgba(255,255,255,0.6)' }}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="space-y-2">
                {navLinks.right.map((link, idx) => (
                  <li key={idx}>
                    <Link href={link.href}>
                      <span 
                        className="text-sm hover:text-white transition-colors cursor-pointer"
                        style={{ color: 'rgba(255,255,255,0.6)' }}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-8">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center transition-colors hover:opacity-80"
              data-testid="social-instagram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(255,255,255,0.6)">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center transition-colors hover:opacity-80"
              data-testid="social-linkedin"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(255,255,255,0.6)">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="border-t"
          style={{ borderColor: 'rgba(255,255,255,0.1)' }}
        >
          <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
              <p>© 2024 Gray Solutions. All rights reserved.</p>
              <div className="flex items-center gap-4 md:gap-6 flex-wrap justify-center">
                <span>Indiqube Echo, Coimbatore, Tamil Nadu</span>
                <Link href="#">
                  <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
                </Link>
                <Link href="#">
                  <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
