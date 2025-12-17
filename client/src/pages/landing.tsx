import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoImage from "@assets/Group_69_(1)_1764854226570.png";
import heroVideo from "@assets/hero-video-horizontal.mp4";

export default function Landing() {
  const [activeFilter, setActiveFilter] = useState("Show All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { label: "Services", href: "/services" },
    { label: "About Us", href: "/about" },
    { label: "Blogs", href: "/blogs" },
    { label: "Contact Us", href: "/contact" },
  ];

  const filterItems = [
    "Magic Trucks",
    "Eagle",
    "TIX",
    "AI Receptionist",
    "Gray Solutions",
    "Show All",
  ];

  return (
    <div className="h-screen w-full flex flex-col bg-white overflow-hidden font-sans text-brand-text-dark transition-colors duration-300">
      {/* 1. Top Header Zone */}
      <header className="h-auto md:h-[160px] flex-none flex flex-col bg-white relative z-10 transition-colors duration-300">
        <div className="flex-1 flex flex-col justify-center items-center pt-4 md:pt-6 pb-4 md:pb-6 px-4">
          {/* Line 1: Site Logo */}
          <div className="mb-3 md:mb-5">
            <Link href="/">
              <img 
                src={logoImage} 
                alt="Gray Solutions Logo" 
                className="h-10 md:h-16 w-auto dark:invert cursor-pointer" 
              />
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden absolute right-4 top-4 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
          {mobileMenuOpen && (
            <nav className="md:hidden w-full mt-4 pb-4 border-t border-gray-100 pt-4">
              <ul className="flex flex-col items-center gap-4">
                {navItems.map((item) => {
                  const isActive = location === item.href;
                  return (
                    <li key={item.label}>
                      <Link href={item.href}>
                        <span 
                          className={`
                            text-[16px] tracking-tight transition-colors duration-200 cursor-pointer
                            ${isActive 
                              ? "text-black font-medium" 
                              : "text-[#8A8A8A] font-normal"
                            }
                          `}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.label}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}
        </div>
      </header>

      {/* 2. Middle Hero Zone - Video Only */}
      <main className="flex-1 w-full bg-white overflow-hidden min-h-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      </main>

      {/* 3. Bottom Case Studies Zone */}
      <footer className="h-auto md:h-[100px] flex-none flex flex-col bg-white dark:bg-[#111] border-t border-brand-gray-line dark:border-[#333] relative z-10 transition-colors duration-300">
        <div className="flex-1 flex flex-col items-center justify-center py-3 md:py-4">
          {/* Row 1: Filters - Horizontal scroll on mobile */}
          <div className="w-full px-2 md:px-4 mb-2 md:mb-4 overflow-x-auto">
            <ul className="flex justify-start md:justify-evenly items-center w-max md:w-full gap-2 md:gap-0 px-2 md:px-0">
              {filterItems.map((filter) => {
                const caseStudyLinks: Record<string, string> = {
                  "Magic Trucks": "/case-study/magic-trucks",
                  "Eagle": "/case-study/eagle",
                };
                const caseStudyLink = caseStudyLinks[filter] || null;
                
                if (caseStudyLink) {
                  return (
                    <li key={filter} className="flex-shrink-0">
                      <Link href={caseStudyLink}>
                        <Button
                          variant="outline"
                          className="text-[12px] md:text-[14px] px-3 md:px-4 py-1.5 md:py-2 bg-white text-black border-gray-200 hover:bg-black hover:text-white hover:border-black transition-all duration-200"
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
                      onClick={() => setActiveFilter(filter)}
                      className="text-[12px] md:text-[14px] px-3 md:px-4 py-1.5 md:py-2 bg-white text-black border-gray-200 hover:bg-black hover:text-white hover:border-black transition-all duration-200"
                    >
                      {filter}
                    </Button>
                  </li>
                );
              })}
            </ul>
          </div>
          
          {/* Row 2: Label */}
          <span className="text-[13px] md:text-[15px] text-gray-600 dark:text-gray-400 font-medium tracking-wide transition-colors">
            Case Studies
          </span>
        </div>
      </footer>
    </div>
  );
}
