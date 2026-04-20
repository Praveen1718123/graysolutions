import React from "react";
import { Link } from "wouter";
import logoWhite from "@assets/Frame_33_copy2_1_(1)_1768900373646.png";
import { NewsletterForm } from "./newsletter-form";

interface FooterProps {
  hideNewsletter?: boolean;
}

export default function Footer({ hideNewsletter = false }: FooterProps) {

  const navLinks = {
    col1: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blogs" },
      { label: "Contact", href: "/contact" },
    ],
    col2: [
      { label: "GoGauge", href: "/case-study/gogauge" },
      { label: "Eagle", href: "/case-study/eagle" },
      { label: "Gray Solutions", href: "/case-study/gray-solutions" },
      { label: "TIX", href: "/case-study/tix" },
      { label: "Magic Trucks", href: "/case-study/magic-trucks" },
    ],
  };

  return (
    <footer className="relative z-10">
      {/* Section 1: Newsletter - White Background */}
      {!hideNewsletter && (
        <section 
          className="py-5 sm:py-6 md:py-8"
          style={{ 
            backgroundColor: '#FFFFFF',
          }}
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
              <h3 
                className="font-medium text-lg sm:text-xl md:text-2xl"
                style={{ 
                  color: '#1A1A1A',
                }}
              >
                Join our newsletter
              </h3>
              <NewsletterForm />
            </div>
          </div>
        </section>
      )}

      {/* Section 2: Main Footer - Solid Black Background */}
      <section 
        style={{ 
          backgroundColor: '#1A1A1A',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 py-8 sm:py-10 md:py-14">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6 sm:gap-8">
            {/* Left - Large Brand Logo with Descriptor */}
            <div className="flex items-end gap-4 sm:gap-5 md:gap-8">
              <Link href="/">
                <img 
                  src={logoWhite}
                  alt="Gray Logo"
                  className="cursor-pointer h-16 sm:h-20 md:h-28 lg:h-[140px] w-auto"
                  data-testid="footer-logo"
                />
              </Link>
              <div className="pb-0.5 sm:pb-1 md:pb-3">
                <p 
                  className="text-sm sm:text-base md:text-lg leading-tight"
                  style={{ color: '#F5F0E8' }}
                >
                  Product Design<br />
                  & Technology<br />
                  Studio
                </p>
              </div>
            </div>

            {/* Right - Navigation Links */}
            <div className="flex gap-8 sm:gap-12 md:gap-16 mt-2 lg:mt-0">
              <ul className="space-y-1.5 sm:space-y-1">
                {navLinks.col1.map((link, idx) => (
                  <li key={idx}>
                    <Link href={link.href} onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
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
              <ul className="space-y-1.5 sm:space-y-1">
                {navLinks.col2.map((link, idx) => (
                  <li key={idx}>
                    <Link href={link.href} onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
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
          <div className="flex items-center gap-4 sm:gap-3 mt-6 sm:mt-4">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-6 sm:h-6 flex items-center justify-center transition-colors hover:opacity-80"
              data-testid="social-instagram"
            >
              <svg width="18" height="18" className="sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="rgba(255,255,255,0.5)">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-6 sm:h-6 flex items-center justify-center transition-colors hover:opacity-80"
              data-testid="social-linkedin"
            >
              <svg width="18" height="18" className="sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="rgba(255,255,255,0.5)">
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
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-1.5 sm:gap-x-6 sm:gap-y-2 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              <span>© 2024 Gray. All rights reserved.</span>
              <span className="hidden sm:inline">Indiqube Echo, Coimbatore, Tamil Nadu</span>
              <span className="sm:hidden text-[11px]">Indiqube Echo, Coimbatore, TN</span>
              <div className="flex gap-4 sm:gap-6 mt-1 sm:mt-0">
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