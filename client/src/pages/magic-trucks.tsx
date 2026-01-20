import React, { useEffect, useState, useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import logoImage from "@assets/Frame_33_copy2_2_(1)_1768895375486.png";
import Footer from "@/components/footer";
import heroImage from "@assets/optimized/mokcup_1_1765899763586.jpg";
import laptopScreens from "@assets/optimized/54066314_updlaptop_screerns0008_1765899763583.jpg";
import mobileHandImage from "@assets/magic_23_1765899763585.jpg";
import mobileGridImage from "@assets/optimized/magic_trucks_neww-01_1765899763585.jpg";
import appIconImage from "@assets/3D_App_Icon_Mockup_[Qorecraft]2_1765899763581.jpg";
import truckHighway from "@assets/optimized/Generated_Image_October_07,_2025_-_12_10PM_1765899763584.jpg";
import truckRoadside from "@assets/optimized/Generated_Image_October_07,_2025_-_12_15PM_1765899763584.jpg";
import brochureImage from "@assets/Two_Magazines_on_Table_Mockup2_1765899763586.jpg";

export default function MagicTrucks() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeGalleryTab, setActiveGalleryTab] = useState("All");
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const galleryTabs = ["All", "Desktop", "Mobile", "Brand", "Real World"];

  const galleryImages = [
    { src: laptopScreens, category: "Desktop", caption: "Operations dashboard + shipment history + tracking overview." },
    { src: mobileGridImage, category: "Mobile", caption: "Tracking, timeline updates, driver details, documents." },
    { src: mobileHandImage, category: "Mobile", caption: "Mobile tracking screen shown in-hand." },
    { src: appIconImage, category: "Brand", caption: "Magic Trucks 3D app icon mockup." },
    { src: brochureImage, category: "Brand", caption: "Magic Trucks brochure mockup on table." },
    { src: truckHighway, category: "Real World", caption: "Magic Trucks branded trailer on Indian roads." },
    { src: truckRoadside, category: "Real World", caption: "Truck livery showing identity outside the app." },
  ];

  const filteredGallery = activeGalleryTab === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeGalleryTab);

  return (
    <div 
      className="min-h-screen w-full font-sans overflow-x-hidden"
      style={{ 
        backgroundColor: '#FAFAFA',
        color: '#1A1A1A',
        fontFamily: '-apple-system, system-ui, sans-serif'
      }}
    >
      {/* Fixed Header - Pill transformation on scroll */}
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

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-24" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 
                className="font-bold mb-6"
                style={{ 
                  fontSize: 'clamp(32px, 4.5vw, 52px)',
                  lineHeight: '1.1',
                  color: '#1A1A1A',
                  letterSpacing: '-0.02em',
                }}
                data-testid="hero-headline"
              >
                Magic Trucks — Transporting Made Simple.
              </h1>
              <p 
                className="text-base md:text-lg leading-relaxed mb-8"
                style={{ color: '#666666' }}
              >
                A logistics platform concept built to reduce coordination chaos and make shipments feel predictable — for shippers, ops teams, and drivers.
              </p>
              
              {/* CTAs */}
              <div className="flex flex-wrap gap-3 md:gap-4 mb-8">
                <button 
                  className="px-5 md:px-7 py-3 md:py-3.5 rounded-full font-medium text-sm transition-all"
                  style={{ backgroundColor: '#1A1A1A', color: '#FFFFFF' }}
                >
                  View Screens
                </button>
                <button 
                  className="px-5 md:px-7 py-3 md:py-3.5 rounded-full font-medium text-sm transition-all hover:bg-gray-100"
                  style={{ backgroundColor: 'transparent', color: '#1A1A1A', border: '1px solid #E5E5E5' }}
                >
                  Talk to Gray Solutions
                </button>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-2">
                {["B2B", "FTL + Heavy Haul", "India-first workflows", "Desktop + Mobile"].map((tag) => (
                  <span 
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-xs font-medium"
                    style={{ backgroundColor: '#F5F5F5', color: '#666666' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right - Hero Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img 
                src={heroImage} 
                alt="Magic Trucks platform shown on laptop and mobile"
                className="w-full rounded-2xl"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Brief Section */}
      <section className="py-12 md:py-28" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-10">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-12"
            style={{ color: '#1A1A1A' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Quick Brief
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {[
              { title: "Ambition", text: "Make freight booking + tracking feel simple, trustworthy, and repeatable — without forcing teams to change their habits overnight." },
              { title: "Reality Check", text: "Indian logistics runs on fast coordination: calls, WhatsApp updates, manual docs, and constant follow-ups. Most tools fail because they add friction instead of removing uncertainty." },
              { title: "What We Shipped", text: "A structured shipment lifecycle concept + consistent product/brand system across desktop, mobile, and real-world identity — designed for trust and adoption." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <h3 className="text-lg font-semibold mb-3" style={{ color: '#1A1A1A' }}>
                  {item.title}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: '#666666' }}>
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Did Section */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-10">
          <div className="text-center mb-12">
            <span className="text-sm font-medium tracking-wide mb-3 block" style={{ color: '#666666' }}>What We Did</span>
            <h2 
              className="font-bold"
              style={{ fontSize: 'clamp(28px, 4vw, 42px)', lineHeight: '1.15', color: '#1A1A1A', letterSpacing: '-0.02em' }}
            >
              Full-Service Brand Partnership
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Product Design", "Web Platform", "Mobile App", "Brand Identity", "UI/UX Design", "Brochure Design", "Truck Livery", "Marketing Assets"].map((service, idx) => (
              <motion.div
                key={service}
                className="p-5 rounded-xl text-center"
                style={{ backgroundColor: '#FFFFFF' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <span className="text-sm font-medium" style={{ color: '#1A1A1A' }}>{service}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Suite Banner */}
      <section className="py-8 md:py-12" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-10">
          <motion.img 
            src={laptopScreens}
            alt="Desktop product screens collage for shipment management"
            className="w-full rounded-2xl"
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </section>

      {/* Insights Section */}
      <section className="py-12 md:py-28" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-10">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-12"
            style={{ color: '#1A1A1A' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Insights
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {[
              { num: "1", title: "People don't buy \"features.\" They buy certainty.", text: "If a user can't see current status, ETA, and next step instantly, they fall back to calling someone." },
              { num: "2", title: "Logistics is a trust business before it's a tech business.", text: "The product has to look and feel dependable — because decisions involve money, risk, and time." },
              { num: "3", title: "Adoption needs to match real behavior, not ideal behavior.", text: "Teams won't \"learn software.\" They'll use what reduces effort today and gradually adopt structure." },
              { num: "4", title: "Every shipment needs one version of truth.", text: "When status and proof are scattered, disputes happen. A single source of truth reduces chaos." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="p-8 rounded-2xl"
                style={{ backgroundColor: '#FAFAFA' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <span 
                  className="text-4xl font-bold block mb-4"
                  style={{ color: '#D4D4D4' }}
                >
                  {item.num}
                </span>
                <h3 className="text-lg font-semibold mb-3" style={{ color: '#1A1A1A' }}>
                  {item.title}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: '#666666' }}>
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Big Bet Section */}
      <section className="py-12 md:py-28" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#1A1A1A' }}>
                The Big Bet
              </h2>
              <p className="text-lg leading-relaxed mb-8" style={{ color: '#666666' }}>
                Build a logistics system that becomes the single source of truth for every shipment — while staying practical for India's real-world operations.
              </p>
              
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#1A1A1A' }}>The Strategy</h3>
              <ul className="space-y-3">
                {[
                  "Win with clarity, not complexity: make \"what's happening\" obvious, not hidden in workflows.",
                  "Standardize the shipment lifecycle: Quote → Book → Dispatch → In Transit → Proof → Closure → History.",
                  "Reduce follow-ups by design: fewer calls, fewer \"where is it\" messages, fewer misunderstandings.",
                  "Build trust beyond the app: brand + consistency makes businesses feel safe choosing you.",
                  "Optimize for repeat usage: the goal isn't one booking — it's predictable operations that bring customers back.",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-base" style={{ color: '#666666' }}>
                    <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#1A1A1A' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <img 
                src={mobileHandImage}
                alt="Mobile tracking screen shown in-hand"
                className="w-full rounded-2xl"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-12 md:py-28" style={{ backgroundColor: '#1A1A1A' }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-10">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-12"
            style={{ color: '#FFFFFF' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Impact
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-10 md:mb-16">
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Impact delivered (now)
              </h3>
              <ul className="space-y-3">
                {[
                  "A clear, structured shipment lifecycle that reduces confusion",
                  "A unified product + brand identity that signals reliability",
                  "A concept designed to scale from small teams to enterprise ops",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-base" style={{ color: '#FFFFFF' }}>
                    <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#FFFFFF' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Impact to measure (later)
              </h3>
              <ul className="space-y-3">
                {[
                  "↓ Average time to book a shipment",
                  "↑ Tracking engagement / link opens",
                  "↓ Support queries about shipment status",
                  "↑ Repeat shippers (retention)",
                ].map((item, idx) => (
                  <li key={idx} className="text-base" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Testimonial */}
          <motion.div
            className="p-8 rounded-2xl text-center"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xl md:text-2xl italic mb-4" style={{ color: '#FFFFFF' }}>
              "Now we don't chase updates — we just check the shipment and move."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12 md:py-28" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#1A1A1A' }}>
              Proof of Work
            </h2>
            <p className="text-lg" style={{ color: '#666666' }}>
              Screens, flows, and brand applications that make the system feel real.
            </p>
          </motion.div>

          {/* Gallery Tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {galleryTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveGalleryTab(tab)}
                className="px-5 py-2.5 rounded-full text-sm font-medium transition-all"
                style={{
                  backgroundColor: activeGalleryTab === tab ? '#1A1A1A' : 'transparent',
                  color: activeGalleryTab === tab ? '#FFFFFF' : '#666666',
                  border: activeGalleryTab === tab ? 'none' : '1px solid #D4D4D4',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {filteredGallery.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <img 
                  src={item.src}
                  alt={item.caption}
                  className="w-full rounded-2xl mb-3"
                  loading="lazy"
                  decoding="async"
                />
                <p className="text-sm" style={{ color: '#666666' }}>
                  {item.caption}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Real World Section */}
      <section className="py-12" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-[1400px] mx-auto">
          <motion.img 
            src={truckHighway}
            alt="Magic Trucks branded trailer on Indian roads"
            className="w-full"
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </section>

      {/* Closing CTA Section */}
      <section className="py-12 md:py-28" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="max-w-[800px] mx-auto px-4 md:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#1A1A1A' }}>
              Want your product to feel world-standard and still India-real?
            </h2>
            <p className="text-lg mb-8" style={{ color: '#666666' }}>
              We design systems that don't just look good — they reduce friction, build trust, and drive adoption.
            </p>
            <Link href="/contact">
              <button 
                className="px-8 py-4 rounded-full font-medium text-base transition-all hover:opacity-90"
                style={{ backgroundColor: '#1A1A1A', color: '#FFFFFF' }}
              >
                Book a Call
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
