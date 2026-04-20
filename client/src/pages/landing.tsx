import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { PrefetchLink } from "@/components/ui/prefetch-link";
import { Button } from "@/components/ui/button";

// import { Menu, X } from "lucide-react";

// Video is now in public/ for faster preloading
const heroVideo = "/hero-video-horizontal.mp4";
import logoImage from "@assets/Frame_33_copy2_2_(1)_1768895375486.png";
import magicTrucksImage from "@assets/mokcup_1_1765899763586.webp";
import eagleImage from "@assets/Eagle_Web_2_1765901229010.webp";
import tixImage from "@assets/Free_iPhone_16_Pro_PSD_Mockup_Tix_1766597838175.webp";

import goGaugeImage from "@assets/Go_Gauge_Slide_1-01_1767087653809.webp";

export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { label: "Services", href: "/services" },
    { label: "About Us", href: "/about" },
    { label: "Blogs", href: "/blogs" },
    { label: "Contact Us", href: "/contact" },
  ];

  const filterItems = [
    "GoGauge",
    "Eagle",
    "TIX",
    "Magic Trucks",
  ];

  const caseStudies = [
    {
      id: "gogauge",
      client: "GoGauge",
      title: "Complete brand identity for marine & logistics leader",
      image: goGaugeImage,
      href: "/case-study/gogauge",
      aspectRatio: "landscape",
    },
    {
      id: "eagle",
      client: "Eagle Industrial",
      title: "Industrial brand identity that works on site and online",
      image: eagleImage,
      href: "/case-study/eagle",
      aspectRatio: "landscape",
    },
    {
      id: "magic-trucks",
      client: "Magic Trucks",
      title: "Fleet branding and digital presence for logistics",
      image: magicTrucksImage,
      href: "/case-study/magic-trucks",
      aspectRatio: "landscape",
    },
    {
      id: "tix",
      client: "TIX",
      title: "A seamless movie and event booking experience",
      image: tixImage,
      href: "/case-study/tix",
      aspectRatio: "portrait",
    },
  ];

  return (
    <div className="h-screen w-full flex flex-col bg-white overflow-hidden font-sans text-brand-text-dark transition-colors duration-300">
      {/* 1. Top Header Zone */}
      <header className="h-auto md:h-[160px] flex-none flex flex-col bg-white relative z-10 transition-colors duration-300">
        <div className="flex-1 flex flex-col justify-center items-center pt-3 sm:pt-4 md:pt-6 pb-3 sm:pb-4 md:pb-6 px-4">
          {/* Line 1: Site Logo */}
          <div className="mb-2 sm:mb-3 md:mb-5">
            <PrefetchLink href="/">
              <picture>
                <source 
                  srcSet="/assets/logo-140.webp 140w, /assets/logo-280.webp 280w" 
                  sizes="140px"
                  type="image/webp"
                />
                <img 
                  src={logoImage} 
                  alt="Gray Solutions Logo" 
                  width="140"
                  height="64"
                  decoding="async"
                  className="h-8 sm:h-10 md:h-16 w-auto dark:invert cursor-pointer" 
                />
              </picture>
            </PrefetchLink>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden absolute right-3 sm:right-4 top-3 sm:top-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            data-testid="mobile-menu-toggle"
          >
            {mobileMenuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            )}
          </button>
          
          {/* Line 2: Primary Navigation - Desktop */}
          <nav className="hidden md:block w-full mx-auto">
            <ul className="flex justify-center items-center w-full gap-8 lg:gap-16 xl:gap-32">
              {navItems.map((item) => {
                const isActive = location === item.href;
                return (
                  <li key={item.label} className="flex items-center">
                    <PrefetchLink href={item.href}>
                      <span 
                        className={`
                          text-[15px] lg:text-[17px] tracking-tight transition-colors duration-200 cursor-pointer inline-flex items-center h-8
                          ${isActive 
                            ? "text-black dark:text-white font-medium" 
                            : "text-[#8A8A8A] font-normal hover:text-[#333333] dark:hover:text-gray-300"
                          }
                          focus:outline-none focus:ring-1 focus:ring-black/50 focus:rounded-sm
                        `}
                      >
                        {item.label}
                      </span>
                    </PrefetchLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile Navigation - Simple CSS transition */}
          <nav 
            className={`
              md:hidden w-full border-t border-gray-100 overflow-hidden transition-all duration-300 ease-in-out
              ${mobileMenuOpen ? "max-h-[300px] opacity-100 mt-3 sm:mt-4" : "max-h-0 opacity-0 mt-0"}
            `}
          >
            <ul className="flex flex-col items-center gap-3 sm:gap-4 py-3 sm:py-4">
              {navItems.map((item) => {
                const isActive = location === item.href;
                return (
                  <li key={item.label}>
                    <PrefetchLink href={item.href} onClick={() => setMobileMenuOpen(false)}>
                      <span 
                        className={`
                          text-[15px] sm:text-[16px] tracking-tight transition-colors duration-200 cursor-pointer py-1 px-2
                          ${isActive 
                            ? "text-black font-medium" 
                            : "text-[#8A8A8A] font-normal hover:text-black"
                          }
                        `}
                      >
                        {item.label}
                      </span>
                    </PrefetchLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>

      {/* 2. Middle Hero Zone - Video Only */}
      <main className="flex-1 w-full bg-white overflow-hidden min-h-[150px] sm:min-h-[200px]">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
          style={{ minHeight: 'inherit' }}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      </main>

      {/* 3. Bottom Case Studies Zone */}
      <footer className="h-auto md:h-[100px] flex-none flex flex-col bg-white dark:bg-[#111] border-t border-brand-gray-line dark:border-[#333] relative z-10 transition-colors duration-300">
        <div className="flex-1 flex flex-col items-center justify-center py-2 sm:py-3 md:py-4">
          {/* Row 1: Filters - Horizontal scroll on mobile */}
          <div className="w-full px-2 sm:px-3 md:px-4 mb-1.5 sm:mb-2 md:mb-4 overflow-x-auto scrollbar-hide">
            <ul className="flex justify-start md:justify-evenly items-center w-max md:w-full gap-1.5 sm:gap-2 md:gap-0 px-1 sm:px-2 md:px-0">
              {filterItems.map((filter) => {
                const caseStudyLinks: Record<string, string> = {
                  "Magic Trucks": "/case-study/magic-trucks",
                  "Eagle": "/case-study/eagle",
                  "TIX": "/case-study/tix",
                  "GoGauge": "/case-study/gogauge",
                };
                const caseStudyLink = caseStudyLinks[filter] || null;
                
                if (caseStudyLink) {
                  return (
                    <li key={filter} className="flex-shrink-0">
                      <PrefetchLink href={caseStudyLink}>
                        <Button
                          variant="outline"
                          className="text-[11px] sm:text-[12px] md:text-[14px] px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 h-auto min-h-[28px] sm:min-h-[32px] md:min-h-[36px] bg-white text-black border-gray-200 hover:bg-black hover:text-white hover:border-black transition-all duration-200 whitespace-nowrap"
                        >
                          {filter}
                        </Button>
                      </PrefetchLink>
                    </li>
                  );
                }
                
                return (
                  <li key={filter} className="flex-shrink-0">
                    <Button
                      variant="outline"
                      className="text-[11px] sm:text-[12px] md:text-[14px] px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 h-auto min-h-[28px] sm:min-h-[32px] md:min-h-[36px] bg-white text-black border-gray-200 hover:bg-black hover:text-white hover:border-black transition-all duration-200 whitespace-nowrap"
                    >
                      {filter}
                    </Button>
                  </li>
                );
              })}
            </ul>
          </div>
          
          {/* Row 2: Label */}
          <span className="text-[11px] sm:text-[13px] md:text-[15px] text-gray-600 dark:text-gray-400 font-medium tracking-wide transition-colors">
            Case Studies
          </span>
        </div>
      </footer>
    </div>
  );
}
