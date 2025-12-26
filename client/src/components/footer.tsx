import React, { useState } from "react";
import { Link } from "wouter";
import logoWhite from "@assets/Group_25_(4)_1766734677573.png";
import footerBg from "@assets/image_1766744766763.png";

export default function Footer() {
  const [email, setEmail] = useState("");

  const navLinks = {
    col1: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blogs" },
      { label: "Contact", href: "/contact" },
    ],
    col2: [
      { label: "Magic Trucks", href: "/case-study/magic-trucks" },
      { label: "Eagle", href: "/case-study/eagle" },
      { label: "TIX", href: "/case-study/tix" },
      { label: "Gray", href: "/case-study/gray-solutions" },
    ],
  };

  return (
    <footer className="relative z-10">
      {/* Section 1: Newsletter - Gradient Background */}
      <section 
        className="py-6 md:py-8"
        style={{ 
          background: 'linear-gradient(90deg, #9B59B6 0%, #E74C8C 35%, #F39C12 70%, #F1C40F 100%)',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <h3 
              className="font-medium"
              style={{ 
                fontSize: 'clamp(18px, 2vw, 24px)',
                color: '#1A1A1A',
              }}
            >
              Join our newsletter
            </h3>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 text-sm w-full sm:w-56"
                style={{ 
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  border: '1px solid rgba(0,0,0,0.1)',
                  color: '#1A1A1A',
                  borderRadius: '2px',
                }}
                data-testid="footer-email-input"
              />
              <button 
                className="px-4 py-2 font-medium text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 whitespace-nowrap"
                style={{ 
                  backgroundColor: '#1A1A1A', 
                  color: '#FFFFFF',
                  borderRadius: '2px',
                }}
                data-testid="footer-subscribe"
              >
                SUBSCRIBE
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Main Footer - With Background Image */}
      <section 
        style={{ 
          backgroundColor: '#1A1A1A',
          backgroundImage: `url(${footerBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
            {/* Left - Large Brand Logo with Descriptor */}
            <div className="flex items-end gap-5 md:gap-8">
              <Link href="/">
                <img 
                  src={logoWhite}
                  alt="Gray Logo"
                  className="cursor-pointer"
                  style={{ height: 'clamp(80px, 14vw, 140px)', width: 'auto' }}
                  data-testid="footer-logo"
                />
              </Link>
              <div className="pb-1 md:pb-3">
                <p 
                  className="text-base md:text-lg leading-tight"
                  style={{ color: '#F5F0E8' }}
                >
                  Product Design<br />
                  & Technology<br />
                  Studio
                </p>
              </div>
            </div>

            {/* Right - Navigation Links */}
            <div className="flex gap-12 md:gap-16 mt-4 lg:mt-0">
              <ul className="space-y-1">
                {navLinks.col1.map((link, idx) => (
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
              <ul className="space-y-1">
                {navLinks.col2.map((link, idx) => (
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

          {/* Social Icons Row */}
          <div className="flex items-center gap-3 mt-4">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-6 h-6 flex items-center justify-center transition-colors hover:opacity-80"
              data-testid="social-instagram"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.5)">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-6 h-6 flex items-center justify-center transition-colors hover:opacity-80"
              data-testid="social-linkedin"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.5)">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="border-t"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-4">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              <span>© 2024 Gray. All rights reserved.</span>
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
      </section>
    </footer>
  );
}
