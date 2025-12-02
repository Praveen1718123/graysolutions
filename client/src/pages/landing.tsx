import React, { useState } from "react";
import { Link, useLocation } from "wouter";

export default function Landing() {
  const [activeFilter, setActiveFilter] = useState("Show All");
  const [location] = useLocation();

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

  return (
    <div className="h-screen w-full flex flex-col bg-white overflow-hidden font-sans text-brand-text-dark">
      {/* 1. Top Header Zone */}
      <header className="h-[130px] flex-none flex flex-col bg-white border-b border-brand-gray-line relative z-10">
        <div className="flex-1 flex flex-col justify-center items-center pt-6 pb-4">
          {/* Line 1: Site Title */}
          <h1 className="text-[26px] font-bold text-black tracking-tight mb-5">
            Gray Solutions
          </h1>
          
          {/* Line 2: Primary Navigation */}
          <nav className="w-full mx-auto">
            <ul className="flex justify-center items-center w-full gap-20">
              {navItems.map((item) => {
                const isActive = location === item.href;
                return (
                  <li key={item.label}>
                    <Link href={item.href}>
                      <a 
                        className={`
                          text-[17px] tracking-tight transition-colors duration-200 cursor-pointer pb-1 border-b-2
                          ${isActive 
                            ? "text-black font-medium border-black" 
                            : "text-[#8A8A8A] font-normal border-transparent hover:text-[#333333] hover:border-[#CCCCCC]"
                          }
                          focus:outline-none focus:ring-1 focus:ring-black/50 focus:rounded-sm
                        `}
                      >
                        {item.label}
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>

      {/* 2. Middle Hero Zone */}
      <main className="flex-1 w-full bg-brand-gray-bg flex items-center justify-center">
        <h2 className="text-[30px] font-medium text-[#333333] tracking-wide">
          HERO Banner
        </h2>
      </main>

      {/* 3. Bottom Case Studies Zone */}
      <footer className="h-[100px] flex-none flex flex-col bg-white border-t border-brand-gray-line relative z-10">
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
          <span className="text-[15px] text-gray-600 font-medium tracking-wide">
            Case Studies
          </span>
        </div>
      </footer>
    </div>
  );
}
