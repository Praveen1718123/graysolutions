import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoImage from "@assets/Group_25_(5)_1766734675194.png";
import heroVideo from "@assets/hero-video-horizontal.mp4";
import magicTrucksImage from "@assets/optimized/mokcup_1_1765899763586.jpg";
import eagleImage from "@assets/optimized/Eagle_Web_2_1765901229010.jpg";
import tixImage from "@assets/Free_iPhone_16_Pro_PSD_Mockup_Tix_1766597838175.jpg";
import graySolutionsImage from "@assets/optimized/Desktop_-_4_(2)_1765460573017.jpg";
import goGaugeImage from "@assets/Go_Gauge_Slide_1-01_1767087653809.png";

export default function Landing() {
  const [showAllCaseStudies, setShowAllCaseStudies] = useState(false);
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
    "Modulr Homes",
    "TIX",
    "KOPO",
    "Show All",
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
      id: "modulr-homes",
      client: "Modulr Homes",
      title: "Brand positioning and website for modular construction",
      image: graySolutionsImage,
      href: "/case-study/modulr-homes",
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
    {
      id: "kopo",
      client: "KOPO",
      title: "Premium branding and content direction",
      image: magicTrucksImage,
      href: "/case-study/kopo",
      aspectRatio: "landscape",
    },
  ];

  return (
    <div className="h-screen w-full flex flex-col bg-white overflow-hidden font-sans text-brand-text-dark transition-colors duration-300">
      {/* Case Studies Modal */}
      <AnimatePresence>
        {showAllCaseStudies && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-white overflow-auto"
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white z-10 border-b border-gray-100">
              <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-4 md:py-6 flex items-center justify-between">
                <Link href="/">
                  <img 
                    src={logoImage} 
                    alt="Gray Solutions Logo" 
                    className="h-7 sm:h-8 md:h-10 cursor-pointer" 
                  />
                </Link>
                <button
                  onClick={() => setShowAllCaseStudies(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  data-testid="close-case-studies"
                >
                  <X size={24} style={{ color: '#1A1A1A' }} />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-8 md:py-16">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-bold mb-3 md:mb-4"
                style={{ 
                  fontSize: 'clamp(28px, 5vw, 52px)',
                  lineHeight: '1.1',
                  color: '#1A1A1A',
                  letterSpacing: '-0.02em',
                }}
              >
                Case Studies
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mb-8 md:mb-12"
                style={{ 
                  fontSize: 'clamp(14px, 2.5vw, 18px)',
                  color: '#666666', 
                  maxWidth: '600px' 
                }}
              >
                Selected work showcasing our approach to design, technology, and brand building.
              </motion.p>

              {/* Case Studies Grid - Single column on mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {caseStudies.map((study, index) => (
                  <motion.div
                    key={study.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <Link href={study.href}>
                      <div 
                        className="group cursor-pointer"
                        data-testid={`case-study-card-${study.id}`}
                      >
                        {/* Image Container */}
                        <div 
                          className="relative overflow-hidden rounded-lg mb-3 md:mb-4"
                          style={{ 
                            aspectRatio: study.aspectRatio === 'portrait' ? '3/4' : '4/3',
                            backgroundColor: '#F5F5F5',
                          }}
                        >
                          <img 
                            src={study.image}
                            alt={study.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                        {/* Text Content */}
                        <div>
                          <p 
                            className="text-xs sm:text-sm mb-1 sm:mb-2"
                            style={{ color: '#666666' }}
                          >
                            {study.client}
                          </p>
                          <h3 
                            className="text-base sm:text-lg font-medium leading-snug group-hover:text-gray-600 transition-colors"
                            style={{ color: '#1A1A1A' }}
                          >
                            {study.title}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Top Header Zone */}
      <header className="h-auto md:h-[160px] flex-none flex flex-col bg-white relative z-10 transition-colors duration-300">
        <div className="flex-1 flex flex-col justify-center items-center pt-3 sm:pt-4 md:pt-6 pb-3 sm:pb-4 md:pb-6 px-4">
          {/* Line 1: Site Logo */}
          <div className="mb-2 sm:mb-3 md:mb-5">
            <Link href="/">
              <img 
                src={logoImage} 
                alt="Gray Solutions Logo" 
                className="h-8 sm:h-10 md:h-16 w-auto dark:invert cursor-pointer" 
              />
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden absolute right-3 sm:right-4 top-3 sm:top-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            data-testid="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          
          {/* Line 2: Primary Navigation - Desktop */}
          <nav className="hidden md:block w-full mx-auto">
            <ul className="flex justify-center items-center w-full gap-8 lg:gap-16 xl:gap-32">
              {navItems.map((item) => {
                const isActive = location === item.href;
                return (
                  <li key={item.label} className="flex items-center">
                    <Link href={item.href}>
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
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.nav 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden w-full mt-3 sm:mt-4 border-t border-gray-100 overflow-hidden"
              >
                <ul className="flex flex-col items-center gap-3 sm:gap-4 py-3 sm:py-4">
                  {navItems.map((item) => {
                    const isActive = location === item.href;
                    return (
                      <li key={item.label}>
                        <Link href={item.href} onClick={() => setMobileMenuOpen(false)}>
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
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </motion.nav>
            )}
          </AnimatePresence>
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
                  "Gray Solutions": "/case-study/gray-solutions",
                };
                const caseStudyLink = caseStudyLinks[filter] || null;
                
                if (filter === "Show All") {
                  return (
                    <li key={filter} className="flex-shrink-0">
                      <Button
                        variant="outline"
                        onClick={() => setShowAllCaseStudies(true)}
                        className="text-[11px] sm:text-[12px] md:text-[14px] px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 h-auto min-h-[28px] sm:min-h-[32px] md:min-h-[36px] bg-white text-black border-gray-200 hover:bg-black hover:text-white hover:border-black transition-all duration-200 whitespace-nowrap"
                        data-testid="show-all-case-studies"
                      >
                        {filter}
                      </Button>
                    </li>
                  );
                }
                
                if (caseStudyLink) {
                  return (
                    <li key={filter} className="flex-shrink-0">
                      <Link href={caseStudyLink}>
                        <Button
                          variant="outline"
                          className="text-[11px] sm:text-[12px] md:text-[14px] px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 h-auto min-h-[28px] sm:min-h-[32px] md:min-h-[36px] bg-white text-black border-gray-200 hover:bg-black hover:text-white hover:border-black transition-all duration-200 whitespace-nowrap"
                        >
                          {filter}
                        </Button>
                      </Link>
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
