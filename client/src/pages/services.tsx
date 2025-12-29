import React, { useEffect, useState, useRef } from "react";
import { Link } from "wouter";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import logoImage from "@assets/Group_25_(5)_1766734675194.png";
import Footer from "@/components/footer";
import brandDesignImg from "@assets/stock_images/professional_brand_d_908b1411.jpg";
import productDesignImg from "@assets/stock_images/modern_digital_produ_807a649b.jpg";
import webPlatformImg from "@assets/stock_images/web_development_codi_7cf7da0f.jpg";
import commerceImg from "@assets/stock_images/ecommerce_shopping_o_773b9c07.jpg";
import contentMarketingImg from "@assets/stock_images/content_marketing_cr_8c06f177.jpg";
import magicTrucksThumb from "@assets/optimized/mokcup_1_1765899763586.jpg";
import eagleThumb from "@assets/optimized/Eagle_Web_2_1765901229010.jpg";
import tixThumb from "@assets/optimized/Desktop_-_4_(2)_1765460573017.jpg";
import grayThumb from "@assets/optimized/Camera_Angle_02_1765901229015.jpg";

export default function Services() {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const heroAnimRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (heroAnimRef.current) {
      const rect = heroAnimRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX.set(x);
      mouseY.set(y);
    }
  };

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

      {/* Hero Section */}
      <section 
        className="relative z-10 pt-28 md:pt-40 pb-16 md:pb-24"
        style={{ backgroundColor: '#FAFAFA', minHeight: '80vh' }}
        data-testid="section-services-hero"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[60vh]">
            {/* Left Side - Text */}
            <motion.div
              className="text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 
                className="font-bold mb-6 md:mb-8"
                style={{ 
                  fontSize: 'clamp(36px, 5vw, 56px)',
                  lineHeight: '1.1',
                  color: '#1A1A1A',
                  letterSpacing: '-0.02em',
                }}
              >
                We design, build & automate the products your customers actually use.
              </h1>
              <Link href="/contact">
                <button 
                  className="px-8 py-4 rounded-full font-medium text-base transition-all hover:opacity-90"
                  style={{ backgroundColor: '#1A1A1A', color: '#FFFFFF' }}
                  data-testid="cta-services-hero"
                >
                  Start a Project
                </button>
              </Link>
            </motion.div>

            {/* Right Side - Interactive Animation */}
            <motion.div
              ref={heroAnimRef}
              className="relative w-full aspect-square max-w-[500px] mx-auto cursor-pointer overflow-hidden rounded-3xl"
              style={{ backgroundColor: '#FFFFFF' }}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              data-testid="hero-animation"
            >
              {/* Animated Shapes */}
              <motion.div
                className="absolute"
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  backgroundColor: '#1A1A1A',
                  left: '20%',
                  top: '15%',
                }}
                animate={{
                  x: isHovering ? [0, 10, -5, 0] : 0,
                  y: isHovering ? [0, -10, 5, 0] : 0,
                  scale: isHovering ? 1.1 : 1,
                }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              />
              <motion.div
                className="absolute"
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: '#1A1A1A',
                  right: '25%',
                  top: '30%',
                }}
                animate={{
                  x: isHovering ? [0, -15, 8, 0] : 0,
                  y: isHovering ? [0, 8, -12, 0] : 0,
                  scale: isHovering ? 1.15 : 1,
                }}
                transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", delay: 0.3 }}
              />
              <motion.div
                className="absolute"
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '12px',
                  backgroundColor: '#1A1A1A',
                  left: '35%',
                  bottom: '25%',
                }}
                animate={{
                  rotate: isHovering ? [0, 45, 0] : 0,
                  scale: isHovering ? 1.2 : 1,
                }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
              />
              <motion.div
                className="absolute"
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  border: '3px solid #1A1A1A',
                  backgroundColor: 'transparent',
                  right: '15%',
                  bottom: '20%',
                }}
                animate={{
                  scale: isHovering ? [1, 1.2, 1] : 1,
                }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.7 }}
              />
              <motion.div
                className="absolute"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#1A1A1A',
                  left: '15%',
                  bottom: '40%',
                }}
                animate={{
                  y: isHovering ? [0, -20, 10, 0] : 0,
                }}
                transition={{ duration: 2.2, repeat: Infinity, repeatType: "reverse", delay: 0.2 }}
              />
              
              {/* Mouse-following diffusion effect */}
              <motion.div
                className="absolute pointer-events-none"
                style={{
                  width: '250px',
                  height: '250px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(26,26,26,0.2) 0%, rgba(26,26,26,0.1) 30%, transparent 70%)',
                  left: springX,
                  top: springY,
                  translateX: '-50%',
                  translateY: '-50%',
                  opacity: isHovering ? 1 : 0,
                  scale: isHovering ? 1.2 : 0.5,
                }}
                animate={{
                  opacity: isHovering ? 1 : 0,
                  scale: isHovering ? 1.2 : 0.5,
                }}
                transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.3 } }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Services Section - Full Width */}
      <section 
        className="relative z-10 py-16 md:py-24"
        style={{ backgroundColor: '#FFFFFF' }}
        data-testid="section-our-services"
      >
        {/* Section Header */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 mb-8">
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
            Our Services
          </h2>
        </div>

        {/* Full-Width Service Cards with Rounded Corners and Gaps */}
        <div 
          className="flex w-full gap-3 px-3"
          style={{ height: '500px' }}
        >
          {[
            {
              id: 'brand-content',
              title: 'Brand & Content Studio',
              description: 'Brand positioning, messaging, creative direction, content strategy, reels/editing, founder brand.',
              href: '/services/brand-content',
              bgVideo: '/assets/brand-content-video.mp4',
            },
            {
              id: 'growth-performance',
              title: 'Growth & Performance',
              description: 'Paid ads, funnels, landing pages, CRO, analytics, lead-gen.',
              href: '/services/growth-performance',
              bgImage: '/assets/growth-performance.gif',
            },
            {
              id: 'product-web',
              title: 'Product & Web Studio',
              description: 'UI/UX, websites, MVP builds, web apps, product design + development.',
              href: '/services/product-web',
              bgImage: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
            },
            {
              id: 'commerce-studio',
              title: 'Commerce Studio',
              description: 'Shopify builds/revamps, product pages, checkout optimization, email/SMS flows, integrations.',
              href: '/services/commerce-studio',
              bgImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
            },
            {
              id: 'automations-ai',
              title: 'Automations & AI',
              description: 'Lead capture → CRM → follow-ups → pipeline updates → dashboards. AI-assisted content ops.',
              href: '/services/automations-ai',
              bgVideo: '/assets/automations-ai-video.mp4',
            },
          ].map((service, index) => (
            <Link 
              key={service.id} 
              href={service.href} 
              data-testid={`link-service-${service.id}`}
              className={`group relative overflow-hidden cursor-pointer transition-all duration-500 ease-out rounded-2xl ${
                activeServiceIndex === index ? 'flex-[2.5]' : 'flex-1'
              }`}
              style={{ minWidth: '80px' }}
              onMouseEnter={() => setActiveServiceIndex(index)}
            >
              {'bgVideo' in service ? (
                <video
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src={service.bgVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ 
                    backgroundImage: `url(${(service as any).bgImage})`,
                  }}
                />
              )}
              <div 
                className="absolute inset-0 transition-opacity duration-500"
                style={{ 
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.3) 100%)',
                }}
              />
              
              <div className="relative z-10 h-full flex flex-col p-6">
                <div className="mt-auto">
                  <h3 
                    className="text-lg md:text-xl font-bold leading-tight text-white mb-2 transition-all duration-300"
                  >
                    {service.title}
                  </h3>
                  
                  <p 
                    className={`text-sm leading-relaxed text-white/70 transition-all duration-500 max-w-xs ${
                      activeServiceIndex === index ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'
                    }`}
                  >
                    {service.description}
                  </p>
                  
                  <div className={`transition-all duration-500 ${
                    activeServiceIndex === index ? 'opacity-100 mt-4 max-h-12' : 'opacity-0 max-h-0 mt-0 overflow-hidden'
                  }`}>
                    <span className="inline-flex items-center gap-2 text-white text-sm font-medium border border-white/50 rounded-full px-4 py-2 hover:bg-white hover:text-black transition-colors">
                      Learn More
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
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

      {/* Testimonials Section */}
      <section 
        className="py-16 md:py-24 overflow-hidden"
        style={{ backgroundColor: '#FFFFFF' }}
        data-testid="section-testimonials"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-12">
          <h2 
            className="font-bold"
            style={{ 
              fontSize: 'clamp(24px, 3vw, 36px)',
              color: '#1A1A1A',
              letterSpacing: '-0.02em',
            }}
          >
            What our clients say
          </h2>
        </div>
        
        {/* Marquee Container with Blur Edges */}
        <div className="relative">
          {/* Left Blur */}
          <div 
            className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
            style={{ 
              width: '120px',
              background: 'linear-gradient(to right, #FFFFFF 0%, transparent 100%)',
            }}
          />
          {/* Right Blur */}
          <div 
            className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
            style={{ 
              width: '120px',
              background: 'linear-gradient(to left, #FFFFFF 0%, transparent 100%)',
            }}
          />
          
          {/* Scrolling Content */}
          <motion.div
            className="flex gap-6"
            animate={{ x: [0, -1600] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {[...Array(2)].map((_, setIndex) => (
              <React.Fragment key={setIndex}>
                {[
                  {
                    quote: "Their strategic insight and hands-on approach helped us streamline operations and unlock new growth opportunities. We saw measurable results within months.",
                    name: "Cameron Williamson",
                    role: "CEO, TechStart",
                    avatar: "CW",
                  },
                  {
                    quote: "Their consultants didn't just offer advice—they rolled up their sleeves and worked alongside us to solve complex challenges and deliver real results.",
                    name: "Theresa Webb",
                    role: "Product Director",
                    avatar: "TW",
                  },
                  {
                    quote: "One of the things that impressed us most was their transparency and communication. We were kept in the loop at every stage of the project.",
                    name: "Annette Black",
                    role: "Founder, Retail Co",
                    avatar: "AB",
                  },
                  {
                    quote: "They provided clarity where we had confusion, and direction where we had chaos. One of the best investments we've made as a company.",
                    name: "Jane Cooper",
                    role: "Operations Lead",
                    avatar: "JC",
                  },
                ].map((testimonial, index) => (
                  <div
                    key={`${setIndex}-${index}`}
                    className="p-6 md:p-8 rounded-2xl flex flex-col flex-shrink-0"
                    style={{ backgroundColor: '#FAFAFA', width: '340px', minHeight: '280px' }}
                    data-testid={`testimonial-${setIndex}-${index}`}
                  >
                    <div 
                      className="text-4xl mb-4 font-serif"
                      style={{ color: '#CCCCCC' }}
                    >
                      "
                    </div>
                    <p 
                      className="text-base leading-relaxed mb-6 flex-grow"
                      style={{ color: '#666666' }}
                    >
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium"
                        style={{ backgroundColor: '#E5E5E5', color: '#1A1A1A' }}
                      >
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>
                          {testimonial.name}
                        </p>
                        <p className="text-xs" style={{ color: '#666666' }}>
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section 
        className="py-16 md:py-24"
        style={{ backgroundColor: '#FAFAFA' }}
        data-testid="section-case-studies"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between mb-12">
            <h2 
              className="font-bold"
              style={{ 
                fontSize: 'clamp(24px, 3vw, 36px)',
                color: '#1A1A1A',
                letterSpacing: '-0.02em',
              }}
            >
              See our work
            </h2>
            <Link href="/">
              <span 
                className="text-sm font-medium hover:underline cursor-pointer"
                style={{ color: '#666666' }}
                data-testid="link-view-all-work"
              >
                View all →
              </span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Magic Trucks", category: "Brand & Product", href: "/case-study/magic-trucks", thumbnail: magicTrucksThumb },
              { title: "Eagle", category: "Web Platform", href: "/case-study/eagle", thumbnail: eagleThumb },
              { title: "TIX", category: "Mobile App", href: "/case-study/tix", thumbnail: tixThumb },
              { title: "Gray Solutions", category: "Brand Identity", href: "/case-study/gray-solutions", thumbnail: grayThumb },
            ].map((caseStudy, index) => (
              <Link key={index} href={caseStudy.href}>
                <div
                  className="rounded-2xl cursor-pointer transition-all hover:shadow-lg group overflow-hidden"
                  style={{ backgroundColor: '#FFFFFF' }}
                  data-testid={`case-study-link-${index}`}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={caseStudy.thumbnail}
                      alt={caseStudy.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="p-5">
                    <span 
                      className="text-xs font-medium mb-1 block"
                      style={{ color: '#666666' }}
                    >
                      {caseStudy.category}
                    </span>
                    <h3 
                      className="text-lg font-semibold mb-2 group-hover:underline"
                      style={{ color: '#1A1A1A' }}
                    >
                      {caseStudy.title}
                    </h3>
                    <span 
                      className="text-sm font-medium"
                      style={{ color: '#1A1A1A' }}
                    >
                      View case study →
                    </span>
                  </div>
                </div>
              </Link>
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
