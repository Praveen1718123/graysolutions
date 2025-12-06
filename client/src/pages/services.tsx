import React from "react";
import { Link, useLocation } from "wouter";
import logoImage from "@assets/Group_69_(1)_1764854226570.png";

export default function Services() {
  const [location] = useLocation();

  const navItems = [
    { label: "Services", href: "/services" },
    { label: "About Us", href: "/about" },
    { label: "Blogs", href: "/blogs" },
    { label: "Contact Us", href: "/contact" },
  ];

  const briefItems = [
    { id: 1, title: "Innovation" },
    { id: 2, title: "Strategy" },
    { id: 3, title: "Design" },
    { id: 4, title: "Development" },
    { id: 5, title: "Growth" },
  ];

  const capabilities = [
    {
      heading: "Design",
      items: ["UI/UX Design", "Brand Identity", "Motion Graphics"],
    },
    {
      heading: "Development",
      items: ["Web Applications", "Mobile Apps", "Cloud Solutions"],
    },
    {
      heading: "Strategy",
      items: ["Digital Strategy", "Product Roadmap", "Market Research"],
    },
  ];

  const testimonials = [
    {
      id: 1,
      position: "left",
    },
    {
      id: 2,
      position: "right",
    },
    {
      id: 3,
      position: "left",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-white font-sans text-brand-text-dark">
      {/* Header */}
      <header className="h-[160px] flex-none flex flex-col bg-white relative z-10">
        <div className="flex-1 flex flex-col justify-center items-center pt-6 pb-6">
          <div className="mb-5">
            <Link href="/">
              <img 
                src={logoImage} 
                alt="Gray Solutions Logo" 
                className="h-16 w-auto cursor-pointer" 
                data-testid="logo-header"
              />
            </Link>
          </div>
          
          <nav className="w-full mx-auto">
            <ul className="flex justify-center items-center w-full gap-32">
              {navItems.map((item) => {
                const isActive = location === item.href;
                return (
                  <li key={item.label} className="flex items-center">
                    <Link href={item.href}>
                      <span 
                        className={`
                          text-[17px] tracking-tight transition-colors duration-200 cursor-pointer inline-flex items-center h-8
                          ${isActive 
                            ? "text-black font-medium" 
                            : "text-[#8A8A8A] font-normal hover:text-[#333333]"
                          }
                          focus:outline-none focus:ring-1 focus:ring-black/50 focus:rounded-sm
                        `}
                        data-testid={`nav-${item.label.toLowerCase().replace(' ', '-')}`}
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

      {/* Main Content */}
      <main className="px-8 md:px-16 lg:px-24 pb-20">
        {/* Intro Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-semibold mb-6" data-testid="section-intro">Intro</h2>
          <div className="w-full h-[300px] bg-gray-300 rounded-lg" data-testid="intro-placeholder"></div>
        </section>

        {/* Quick Brief About Us */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6" data-testid="section-brief">Quick brief about us</h2>
          <div className="grid grid-cols-5 gap-4">
            {briefItems.map((item) => (
              <div 
                key={item.id} 
                className="aspect-square bg-gray-300 rounded-lg flex items-center justify-center"
                data-testid={`brief-card-${item.id}`}
              >
              </div>
            ))}
          </div>
        </section>

        {/* Road Map */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6" data-testid="section-roadmap">Road Map</h2>
          <div className="w-full h-[350px] bg-gray-300 rounded-lg" data-testid="roadmap-placeholder"></div>
        </section>

        {/* Capabilities */}
        <section className="mb-16">
          <h2 className="text-4xl font-semibold mb-8" data-testid="section-capabilities">Capabilities</h2>
          <div className="grid grid-cols-3 gap-12">
            {capabilities.map((cap, index) => (
              <div key={index} data-testid={`capability-column-${index}`}>
                <h3 className="text-lg font-semibold mb-4">{cap.heading}</h3>
                <ul className="space-y-2">
                  {cap.items.map((item, idx) => (
                    <li key={idx} className="text-gray-600 text-sm">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Client Testimonials */}
        <section>
          <h2 className="text-4xl font-semibold mb-8" data-testid="section-testimonials">Client Testimonials</h2>
          <div className="space-y-8">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className={`flex ${testimonial.position === 'right' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className="w-[200px] h-[120px] bg-gray-300 rounded-lg"
                  data-testid={`testimonial-${testimonial.id}`}
                ></div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
