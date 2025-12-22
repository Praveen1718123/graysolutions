import React, { useEffect, useState, useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import logoImage from "@assets/Group_69_(1)_1764854226570.png";

function useCountUp(end: number, duration: number = 2000, inView: boolean) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [inView, end, duration]);

  return count;
}

function CountUpNumber({ value, suffix = "", inView }: { value: number; suffix?: string; inView: boolean }) {
  const count = useCountUp(value, 2000, inView);
  return <>{count}{suffix}</>;
}

export default function About() {
  const [isScrolled, setIsScrolled] = useState(false);
  const metricsRef = useRef(null);
  const metricsInView = useInView(metricsRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const principles = [
    { 
      title: "Aesthetic clarity", 
      description: "Visual and verbal systems that are intentional, minimal, and easy to understand — across both product and brand.",
    },
    { 
      title: "Functional precision", 
      description: "Digital products, flows, and communication systems that behave predictably, scale cleanly, and reduce friction for both users and operators.",
    },
    { 
      title: "Business alignment", 
      description: "Strategic decisions tied to revenue, cost, risk, growth, and long-term value — not decoration, trends, or unnecessary complexity.",
    },
  ];

  const metrics = [
    { number: 100, suffix: "+", title: "product, design, marketing, and consulting engagements", description: "Across consumer apps, B2B platforms, retail brands, digital systems, and content ecosystems." },
    { number: 8, suffix: "+", title: "years across digital product, branding, marketing, and system design", description: "With hands-on involvement from early strategy to execution." },
    { display: "0→1", title: "launches, product redesigns, and platform-scale rebuilds", description: "Defining, designing, building, and improving products that function in real-world environments." },
    { number: 10, suffix: "+", title: "domains of experience", description: "Including consumer products, logistics, retail, SaaS, D2C brands, hospitality, and internal operational systems." },
  ];

  const howWeWork = [
    { step: "01", title: "Understand the context", description: "We examine objectives, constraints, behaviour patterns, operational realities, and commercial goals." },
    { step: "02", title: "Design & communicate with intent", description: "We shape flows, interfaces, communication systems, and visual identities for clarity, predictability, and long-term usability." },
    { step: "03", title: "Build for reliability", description: "We implement solutions that are stable, maintainable, and practical for the teams who operate them." },
    { step: "04", title: "Refine with purpose", description: "We review performance, identify friction, prioritise improvements, and adjust based on evidence — not assumptions." },
  ];

  return (
    <motion.div 
      className="min-h-screen w-full font-sans overflow-x-hidden"
      style={{ 
        backgroundColor: '#FAFAFA',
        color: '#1A1A1A',
        fontFamily: '-apple-system, system-ui, sans-serif',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
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
            backgroundColor: isScrolled ? 'rgba(255,255,255,0.92)' : '#FAFAFA',
            backdropFilter: isScrolled ? 'blur(12px)' : 'none',
            WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
            boxShadow: isScrolled ? '0 4px 24px rgba(0,0,0,0.08)' : 'none',
            borderRadius: isScrolled ? '999px' : '0',
            padding: isScrolled ? '0 24px' : '0',
            transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <Link href="/">
            <img 
              src={logoImage} 
              alt="Gray Solutions Logo" 
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

      {/* Hero Section - Full Screen */}
      <section 
        className="min-h-screen flex items-center relative overflow-hidden"
        style={{ backgroundColor: '#FAFAFA' }}
      >
        <div className="max-w-[1280px] w-full mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Text Content */}
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <motion.span 
                className="text-sm font-medium tracking-widest uppercase mb-6 block"
                style={{ color: '#666666' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                About Gray Solutions
              </motion.span>
              
              <motion.h1 
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] mb-6"
                style={{ color: '#1A1A1A' }}
                data-testid="about-hero-heading"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                We design and build digital systems, brands, and communication frameworks that people understand — and businesses rely on.
              </motion.h1>
              
              <motion.p 
                className="text-base md:text-lg leading-relaxed mb-4"
                style={{ color: '#555555', maxWidth: '560px' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
              >
                Gray Solutions is a product, design, technology, and consulting studio focused on creating digital experiences that are aesthetically clear, operationally reliable, commercially grounded, and aligned with measurable business objectives.
              </motion.p>
              
              <motion.p 
                className="text-base md:text-lg leading-relaxed mb-8"
                style={{ color: '#555555', maxWidth: '560px' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
              >
                We work with teams who need structured thinking, careful execution, and outcomes that hold up in real conditions.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55 }}
              >
                <button 
                  className="px-7 py-3.5 rounded-full font-medium text-sm transition-all hover:bg-gray-100"
                  style={{ 
                    backgroundColor: 'transparent', 
                    color: '#1A1A1A',
                    border: '1px solid rgba(26,26,26,0.2)',
                  }}
                  data-testid="cta-talk-to-us"
                >
                  Talk to us
                </button>
              </motion.div>
            </motion.div>

            {/* Right - Abstract 3D Geometric Visual */}
            <motion.div
              className="order-1 lg:order-2 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div 
                className="relative w-full max-w-[480px] aspect-square"
                style={{
                  background: 'linear-gradient(135deg, #F0F0F0 0%, #E8E8E8 50%, #F5F5F5 100%)',
                  borderRadius: '24px',
                }}
              >
                {/* Animated gradient overlay */}
                <div 
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: 'radial-gradient(circle at 30% 40%, rgba(59,130,246,0.08) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(139,92,246,0.06) 0%, transparent 50%)',
                    animation: 'subtleShift 12s ease-in-out infinite alternate',
                  }}
                />
                
                {/* Abstract geometric shapes */}
                <svg 
                  viewBox="0 0 400 400" 
                  className="absolute inset-0 w-full h-full p-8"
                  style={{ opacity: 0.9 }}
                >
                  {/* Main hexagonal structure */}
                  <motion.path 
                    d="M200 50 L340 125 L340 275 L200 350 L60 275 L60 125 Z"
                    fill="none"
                    stroke="#1A1A1A"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.2 }}
                    transition={{ duration: 2, delay: 0.5 }}
                  />
                  
                  {/* Inner hexagon */}
                  <motion.path 
                    d="M200 100 L290 150 L290 250 L200 300 L110 250 L110 150 Z"
                    fill="none"
                    stroke="#1A1A1A"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.35 }}
                    transition={{ duration: 1.8, delay: 0.8 }}
                  />
                  
                  {/* Central shape */}
                  <motion.path 
                    d="M200 150 L240 175 L240 225 L200 250 L160 225 L160 175 Z"
                    fill="#1A1A1A"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.15 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    style={{ transformOrigin: '200px 200px' }}
                  />
                  
                  {/* Connecting lines */}
                  <motion.line x1="200" y1="50" x2="200" y2="150" stroke="#1A1A1A" strokeWidth="1"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1, opacity: 0.2 }} transition={{ duration: 0.6, delay: 1.5 }} />
                  <motion.line x1="340" y1="125" x2="240" y2="175" stroke="#1A1A1A" strokeWidth="1"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1, opacity: 0.2 }} transition={{ duration: 0.6, delay: 1.6 }} />
                  <motion.line x1="340" y1="275" x2="240" y2="225" stroke="#1A1A1A" strokeWidth="1"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1, opacity: 0.2 }} transition={{ duration: 0.6, delay: 1.7 }} />
                  <motion.line x1="200" y1="350" x2="200" y2="250" stroke="#1A1A1A" strokeWidth="1"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1, opacity: 0.2 }} transition={{ duration: 0.6, delay: 1.8 }} />
                  <motion.line x1="60" y1="275" x2="160" y2="225" stroke="#1A1A1A" strokeWidth="1"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1, opacity: 0.2 }} transition={{ duration: 0.6, delay: 1.9 }} />
                  <motion.line x1="60" y1="125" x2="160" y2="175" stroke="#1A1A1A" strokeWidth="1"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1, opacity: 0.2 }} transition={{ duration: 0.6, delay: 2.0 }} />
                  
                  {/* Floating dots */}
                  <motion.circle cx="200" cy="50" r="4" fill="#1A1A1A"
                    initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 2.2 }} />
                  <motion.circle cx="340" cy="125" r="4" fill="#1A1A1A"
                    initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 2.3 }} />
                  <motion.circle cx="340" cy="275" r="4" fill="#1A1A1A"
                    initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 2.4 }} />
                  <motion.circle cx="200" cy="350" r="4" fill="#1A1A1A"
                    initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 2.5 }} />
                  <motion.circle cx="60" cy="275" r="4" fill="#1A1A1A"
                    initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 2.6 }} />
                  <motion.circle cx="60" cy="125" r="4" fill="#1A1A1A"
                    initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 2.7 }} />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>

        <style>{`
          @keyframes subtleShift {
            0% { transform: scale(1) rotate(0deg); }
            100% { transform: scale(1.05) rotate(2deg); }
          }
        `}</style>
      </section>

      {/* What We Do - Narrow Strip */}
      <section 
        className="py-10 md:py-14"
        style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}
      >
        <div className="max-w-[1120px] mx-auto px-4 md:px-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 
              className="text-sm font-semibold tracking-widest uppercase mb-4"
              style={{ color: '#888888' }}
              data-testid="section-what-we-do"
            >
              What we do
            </h2>
            <p 
              className="text-base md:text-lg leading-relaxed max-w-[900px] mx-auto"
              style={{ color: '#444444' }}
            >
              We work across product strategy, UX and interface design, brand and identity systems, advertising and marketing communication, engineering, product development, business consultation, and digital optimisation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How We Think - 2 Column Section */}
      <section 
        className="py-20 md:py-28"
        style={{ backgroundColor: '#FAFAFA' }}
      >
        <div className="max-w-[1120px] mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left - Intro */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 
                className="text-2xl md:text-3xl font-bold mb-6"
                style={{ color: '#1A1A1A' }}
                data-testid="section-how-we-think"
              >
                How we think
              </h2>
              <p 
                className="text-base md:text-lg leading-relaxed"
                style={{ color: '#555555' }}
              >
                We see every product, brand, and system as part of a broader operational and commercial environment. Three principles guide our work:
              </p>
            </motion.div>

            {/* Right - Principles as Stacked Cards */}
            <div className="space-y-5">
              {principles.map((principle, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-xl"
                  style={{ 
                    backgroundColor: '#FFFFFF',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)',
                    border: '1px solid rgba(0,0,0,0.04)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  data-testid={`principle-${index}`}
                >
                  <h3 
                    className="text-base font-semibold mb-2"
                    style={{ color: '#1A1A1A' }}
                  >
                    {principle.title}
                  </h3>
                  <p 
                    className="text-sm leading-relaxed"
                    style={{ color: '#666666' }}
                  >
                    {principle.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Consumer-Centred by Design - Single Column Wide */}
      <section 
        className="py-20 md:py-28"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        <div className="max-w-[800px] mx-auto px-4 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 
              className="text-2xl md:text-3xl font-bold mb-8"
              style={{ color: '#1A1A1A' }}
              data-testid="section-consumer-centred"
            >
              Consumer-centred by design
            </h2>
            
            <p 
              className="text-lg md:text-xl leading-relaxed mb-6"
              style={{ color: '#1A1A1A' }}
            >
              We design for both end consumers and business users.
            </p>
            
            <p 
              className="text-base md:text-lg leading-relaxed mb-6"
              style={{ color: '#555555' }}
            >
              Our work is informed by how people actually behave — how they scan, hesitate, compare, decide, and drop off. These behaviour patterns shape everything from brand positioning and communication to product architecture and interaction details.
            </p>
            
            <p 
              className="text-base md:text-lg leading-relaxed"
              style={{ color: '#555555' }}
            >
              Whether the audience is a customer, operator, or decision-maker, our approach remains consistent: design with intent, communicate with clarity, build with reasoning, and refine based on real behaviour.
            </p>
          </motion.div>
        </div>
      </section>

      {/* By the Numbers - Full Width Stats Strip */}
      <section 
        ref={metricsRef}
        className="py-16 md:py-24"
        style={{ backgroundColor: '#1A1A1A' }}
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-2xl md:text-3xl font-bold mb-3"
              style={{ color: '#FFFFFF' }}
              data-testid="section-by-the-numbers"
            >
              By the numbers
            </h2>
            <p 
              className="text-base"
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              We measure ourselves by consistency, clarity, and the outcomes we enable.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-xl"
                style={{ 
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                data-testid={`metric-${index}`}
              >
                <div 
                  className="text-4xl md:text-5xl font-bold mb-3"
                  style={{ color: '#FFFFFF' }}
                >
                  {metric.display ? (
                    metric.display
                  ) : (
                    <CountUpNumber value={metric.number!} suffix={metric.suffix} inView={metricsInView} />
                  )}
                </div>
                <p 
                  className="text-sm font-medium mb-2"
                  style={{ color: 'rgba(255,255,255,0.9)' }}
                >
                  {metric.title}
                </p>
                <p 
                  className="text-xs leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                >
                  {metric.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work - 4-Step Timeline */}
      <section 
        className="py-20 md:py-28"
        style={{ backgroundColor: '#FAFAFA' }}
      >
        <div className="max-w-[1120px] mx-auto px-4 md:px-10">
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-2xl md:text-3xl font-bold mb-3"
              style={{ color: '#1A1A1A' }}
              data-testid="section-how-we-work"
            >
              How we work
            </h2>
            <p 
              className="text-base"
              style={{ color: '#666666' }}
            >
              Our process is structured, deliberate, and consistent across brand, product, and engineering assignments.
            </p>
          </motion.div>
          
          {/* Desktop: Horizontal Timeline */}
          <div className="hidden md:grid md:grid-cols-4 gap-6 relative">
            {/* Connecting line */}
            <div 
              className="absolute top-8 left-[12.5%] right-[12.5%] h-px"
              style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
            />
            
            {howWeWork.map((item, index) => (
              <motion.div
                key={index}
                className="relative p-6 rounded-xl transition-all duration-300 hover:-translate-y-1 cursor-default"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)',
                  border: '1px solid rgba(0,0,0,0.04)',
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                whileHover={{ 
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  borderColor: 'rgba(0,0,0,0.12)',
                }}
                data-testid={`how-we-work-step-${index}`}
              >
                <div 
                  className="text-xs font-semibold tracking-widest uppercase mb-4"
                  style={{ color: '#888888' }}
                >
                  Step {item.step}
                </div>
                <h3 
                  className="text-base font-semibold mb-3"
                  style={{ color: '#1A1A1A' }}
                >
                  {item.title}
                </h3>
                <p 
                  className="text-sm leading-relaxed"
                  style={{ color: '#666666' }}
                >
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Mobile: Vertical Stack */}
          <div className="md:hidden space-y-4">
            {howWeWork.map((item, index) => (
              <motion.div
                key={index}
                className="p-5 rounded-xl"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                  border: '1px solid rgba(0,0,0,0.04)',
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                data-testid={`how-we-work-step-mobile-${index}`}
              >
                <div 
                  className="text-xs font-semibold tracking-widest uppercase mb-2"
                  style={{ color: '#888888' }}
                >
                  Step {item.step}
                </div>
                <h3 
                  className="text-base font-semibold mb-2"
                  style={{ color: '#1A1A1A' }}
                >
                  {item.title}
                </h3>
                <p 
                  className="text-sm leading-relaxed"
                  style={{ color: '#666666' }}
                >
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Position - Centered Closing */}
      <section 
        className="py-20 md:py-28"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        <div className="max-w-[700px] mx-auto px-4 md:px-10 text-center">
          {/* Divider */}
          <motion.div
            className="w-16 h-px mx-auto mb-12"
            style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 64, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 
              className="text-2xl md:text-3xl font-bold mb-8"
              style={{ color: '#1A1A1A' }}
              data-testid="section-our-position"
            >
              Our position
            </h2>
            
            <p 
              className="text-lg md:text-xl font-medium mb-4"
              style={{ color: '#1A1A1A' }}
            >
              We are not a traditional agency.
            </p>
            
            <p 
              className="text-base md:text-lg leading-relaxed mb-6"
              style={{ color: '#555555' }}
            >
              We are a product, brand, and communication studio that aligns design, engineering, and business thinking under one roof.
            </p>
            
            <p 
              className="text-base md:text-lg leading-relaxed mb-6"
              style={{ color: '#555555' }}
            >
              We specialise in building products, designing brands, crafting communication systems, and supporting business decisions with clarity and structure.
            </p>
            
            <p 
              className="text-base md:text-lg leading-relaxed font-medium"
              style={{ color: '#1A1A1A' }}
            >
              Our focus is simple: clear design, reliable execution, and outcomes that hold up over time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="py-10 md:py-14"
        style={{ backgroundColor: '#1A1A1A' }}
      >
        <div className="max-w-[1120px] mx-auto px-4 md:px-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <img 
              src={logoImage} 
              alt="Gray Solutions" 
              className="h-8 brightness-0 invert"
            />
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Based in India. Working globally.
            </p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
