import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Sun, Moon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import logoImage from "@assets/Group_69_(1)_1764854226570.png";

interface CaseStudy {
  id: number;
  title: string;
  category: string;
  description: string;
  imageUrl: string | null;
}

export default function Landing() {
  const [activeFilter, setActiveFilter] = useState("Show All");
  const [location] = useLocation();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const navItems = [
    { label: "Services", href: "/services" },
    { label: "About Us", href: "/about" },
    { label: "Blogs", href: "/blogs" },
    { label: "Contact Us", href: "/contact" },
  ];

  const filterItems = [
    "Magic Trucks",
    "Switch Bee",
    "TIX",
    "AI Receptionist",
    "Gray Solutions",
    "Show All",
  ];

  const { data: caseStudies = [], isLoading } = useQuery<CaseStudy[]>({
    queryKey: ["/api/case-studies", activeFilter],
    queryFn: async () => {
      const params = activeFilter !== "Show All" ? `?category=${encodeURIComponent(activeFilter)}` : "";
      const response = await fetch(`/api/case-studies${params}`);
      if (!response.ok) throw new Error("Failed to fetch case studies");
      return response.json();
    },
  });

  return (
    <div className="h-screen w-full flex flex-col bg-white dark:bg-[#111] overflow-hidden font-sans text-brand-text-dark dark:text-white transition-colors duration-300">
      {/* 1. Top Header Zone */}
      <header className="h-[130px] flex-none flex flex-col bg-white dark:bg-[#111] border-b border-brand-gray-line dark:border-[#333] relative z-10 transition-colors duration-300">
        
        {/* Theme Toggle - Absolute Top Right */}
        <button 
          onClick={toggleTheme}
          className="absolute top-6 right-8 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="flex-1 flex flex-col justify-center items-center pt-6 pb-4">
          {/* Line 1: Site Logo */}
          <div className="mb-5">
            <Link href="/">
              <img 
                src={logoImage} 
                alt="Gray Solutions Logo" 
                className="h-12 w-auto dark:invert cursor-pointer" 
              />
            </Link>
          </div>
          
          {/* Line 2: Primary Navigation */}
          <nav className="w-full mx-auto">
            <ul className="flex justify-center items-center w-full gap-32">
              {navItems.map((item) => {
                const isActive = location === item.href;
                return (
                  <li key={item.label}>
                    <Link href={item.href}>
                      <span 
                        className={`
                          text-[17px] tracking-tight transition-colors duration-200 cursor-pointer pb-1 border-b-2 border-transparent inline-block
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
        </div>
      </header>

      {/* 2. Middle Hero Zone */}
      <main className="flex-1 w-full bg-brand-gray-bg dark:bg-[#1a1a1a] overflow-y-auto transition-colors duration-300 px-8 py-12">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-[20px] font-medium text-[#333333] dark:text-gray-200">Loading case studies...</p>
          </div>
        ) : caseStudies.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-[20px] font-medium text-[#666] dark:text-gray-400">No case studies found for this category</p>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((study) => (
                <div
                  key={study.id}
                  className="bg-white dark:bg-[#222] rounded-lg p-6 border border-brand-gray-line dark:border-[#444] hover:border-brand-purple dark:hover:border-brand-purple transition-all duration-200 cursor-pointer"
                  data-testid={`case-study-${study.id}`}
                >
                  <h3 className="text-[18px] font-semibold text-black dark:text-white mb-3 tracking-tight">
                    {study.title}
                  </h3>
                  <p className="text-[14px] text-[#666] dark:text-gray-400 mb-4 leading-relaxed">
                    {study.description}
                  </p>
                  <span className="inline-block px-3 py-1 bg-brand-purple/10 dark:bg-brand-purple/20 text-brand-purple text-[12px] font-medium rounded">
                    {study.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* 3. Bottom Case Studies Zone */}
      <footer className="h-[100px] flex-none flex flex-col bg-white dark:bg-[#111] border-t border-brand-gray-line dark:border-[#333] relative z-10 transition-colors duration-300">
        <div className="flex-1 flex flex-col items-center justify-center py-4">
          {/* Row 1: Filters */}
          <div className="w-full px-4 mb-4">
             <ul className="flex justify-evenly items-center w-full">
              {filterItems.map((filter) => (
                <li key={filter}>
                  <button
                    onClick={() => setActiveFilter(filter)}
                    className={`text-[16px] transition-all duration-200 cursor-pointer ${
                      activeFilter === filter
                        ? "text-brand-purple font-semibold border-b-2 border-brand-purple"
                        : "text-brand-purple font-normal hover:text-[#5a2db0]"
                    }`}
                  >
                    {filter}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Row 2: Label */}
          <span className="text-[15px] text-gray-600 dark:text-gray-400 font-medium tracking-wide transition-colors">
            Case Studies
          </span>
        </div>
      </footer>
    </div>
  );
}
