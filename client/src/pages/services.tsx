import React, { useEffect, useState, useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import logoImage from "@assets/Group_25_(5)_1766734675194.png";
import Footer from "@/components/footer";
import brandDesignImg from "@assets/stock_images/professional_brand_d_908b1411.jpg";
import productDesignImg from "@assets/stock_images/modern_digital_produ_807a649b.jpg";
import webPlatformImg from "@assets/stock_images/web_development_codi_7cf7da0f.jpg";
import commerceImg from "@assets/stock_images/ecommerce_shopping_o_773b9c07.jpg";
import contentMarketingImg from "@assets/stock_images/content_marketing_cr_8c06f177.jpg";

export default function Services() {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const capabilities = [
    {
      id: "brand-design",
      title: "Brand Design",
      image: brandDesignImg,
      href: "/services/brand-design",
    },
    {
      id: "product-design",
      title: "Product & Experience",
      image: productDesignImg,
      href: "/services/product-design",
    },
    {
      id: "web-platform",
      title: "Web & Platform",
      image: webPlatformImg,
      href: "/services/web-platform",
    },
    {
      id: "commerce",
      title: "Commerce & Shopify",
      image: commerceImg,
      href: "/services/commerce",
    },
    {
      id: "content-marketing",
      title: "Content & Marketing",
      image: contentMarketingImg,
      href: "/services/content-marketing",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="min-h-screen w-full font-sans overflow-x-hidden"
      style={{ 
        backgroundColor: '#FAFAFA',
        color: '#1A1A1A',
        fontFamily: '-apple-system, system-ui, sans-serif'
      }}
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
            backgroundColor: isScrolled ? 'rgba(255,255,255,0.92)' : '#FFFFFF',
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
              alt="Gray Logo" 
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

      {/* Capabilities Section - Horizontal Card Layout */}
      <section 
        className="relative z-10 pt-28 md:pt-32 pb-16 md:pb-24"
        style={{ backgroundColor: '#FFFFFF' }}
        data-testid="section-capabilities"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          {/* Header with Navigation */}
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <div>
              <span 
                className="text-sm font-medium tracking-wide mb-2 block"
                style={{ color: '#666666' }}
              >
                What We Do
              </span>
              <h2 
                className="text-2xl md:text-3xl font-bold"
                style={{ color: '#1A1A1A' }}
              >
                Our Capabilities
              </h2>
            </div>
            
            {/* Navigation Arrows */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={scrollLeft}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
                style={{ backgroundColor: '#F5F5F5' }}
                data-testid="capabilities-scroll-left"
              >
                <ChevronLeft size={20} style={{ color: '#1A1A1A' }} />
              </button>
              <button
                onClick={scrollRight}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
                style={{ backgroundColor: '#F5F5F5' }}
                data-testid="capabilities-scroll-right"
              >
                <ChevronRight size={20} style={{ color: '#1A1A1A' }} />
              </button>
            </div>
          </div>

          {/* Horizontal Scrolling Cards */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-hide"
            style={{ 
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {capabilities.map((capability, index) => (
              <Link key={capability.id} href={capability.href} data-testid={`link-capability-${capability.id}`}>
                <motion.div
                  className="relative flex-shrink-0 rounded-xl overflow-hidden cursor-pointer group"
                  style={{ 
                    width: 'clamp(280px, 30vw, 340px)',
                    aspectRatio: '3/4',
                    scrollSnapAlign: 'start',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  data-testid={`capability-card-${capability.id}`}
                >
                  {/* Image */}
                  <img 
                    src={capability.image}
                    alt={capability.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  
                  {/* Gradient Overlay */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.6) 100%)',
                    }}
                  />
                  
                  {/* Button Overlay */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                    <span 
                      className="px-6 py-3 rounded-sm text-sm font-medium whitespace-nowrap transition-all group-hover:shadow-lg"
                      style={{ 
                        backgroundColor: '#FFFFFF',
                        color: '#1A1A1A',
                      }}
                    >
                      {capability.title}
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section 
        className="py-16 md:py-24 relative z-10"
        style={{ backgroundColor: '#FAFAFA' }}
      >
        <div className="max-w-[1120px] mx-auto px-6 md:px-10">
          <h2 
            className="font-bold mb-12"
            style={{ 
              fontSize: 'clamp(24px, 3vw, 36px)',
              color: '#1A1A1A',
              letterSpacing: '-0.02em',
            }}
            data-testid="section-why-choose-us"
          >
            Why choose us?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Straight talk, zero fluff",
                description: "We're honest about what works and what doesn't. If your idea is bad, we'll tell you – then help you make it better. No jargon, no sugar-coating.",
                icon: (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="#1A1A1A">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                ),
              },
              {
                title: "Built for humans, powered by tech",
                description: "Yes, we love AI and automation, but we start with empathy. We design experiences that feel natural and inclusive, using technology as a tool – not a gimmick.",
                icon: (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="#1A1A1A">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                ),
              },
              {
                title: "ROI or GTFO",
                description: "We don't chase likes. We measure success in real business terms: increased conversions, lower churn, faster workflows. You'll see dashboards that track the metrics that actually matter.",
                icon: (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="#1A1A1A">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z" />
                  </svg>
                ),
              },
              {
                title: "Future-ready mindset",
                description: "While others are still buzzing about Industry 4.0, we're already testing what's next – from generative AI to immersive experiences. We help you stay ahead without chasing every fad.",
                icon: (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="#1A1A1A">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ),
              },
              {
                title: "Small team, big impact",
                description: "You get the agility and personal attention of a boutique studio with the capabilities of a larger network. We scale when needed but never make you feel like a number.",
                icon: (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="#1A1A1A">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                  </svg>
                ),
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(0,0,0,0.05)',
                }}
                data-testid={`why-choose-us-${index}`}
              >
                <div className="mb-5">
                  {item.icon}
                </div>
                <h3 
                  className="text-lg font-semibold mb-3"
                  style={{ color: '#1A1A1A' }}
                >
                  {item.title}
                </h3>
                <p 
                  className="text-base leading-relaxed"
                  style={{ color: '#666666' }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-16 md:py-24"
        style={{ backgroundColor: '#1A1A1A' }}
      >
        <div className="max-w-[900px] mx-auto px-6 md:px-10 text-center">
          <h2 
            className="font-bold mb-6"
            style={{ 
              fontSize: 'clamp(28px, 4vw, 42px)',
              color: '#FFFFFF',
              lineHeight: '1.2',
            }}
          >
            Ready to build something great?
          </h2>
          <p 
            className="text-lg mb-8"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            Let's talk about your project and see how we can help.
          </p>
          <Link href="/contact">
            <button 
              className="px-8 py-4 rounded-full font-medium text-base transition-all hover:opacity-90"
              style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A' }}
              data-testid="cta-contact"
            >
              Get in Touch
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
