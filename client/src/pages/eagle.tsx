import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import logoImage from "@assets/Frame_33_copy2_2_(1)_1768895375486.png";
import Footer from "@/components/footer";
import heroImage from "@assets/optimized/Eagle_Web_2_1765901229010.jpg";
import guidelinesImage from "@assets/optimized/Eagle_web_elements-04_1765901229015.jpg";
import ppeImage from "@assets/Eagle_Web_3_1765901229014.jpg";
import equipmentImage from "@assets/optimized/Camera_Angle_02_1765901229015.jpg";
import realEquipment1 from "@assets/optimized/Eagle_2_1765901229015.jpg";
import realEquipment2 from "@assets/optimized/Eagle_3_1765901229015.jpg";
import containerImage from "@assets/optimized/Eagle_Container_1765901229016.jpg";
import toteBagImage from "@assets/optimized/Eagle_Tote_Bag_1765901229016.jpg";
import wallpaper1 from "@assets/optimized/Eagle_Wallpaper-02_1765901229017.jpg";
import wallpaper2 from "@assets/optimized/Eagle_Wallpaper-03_1765901229017.jpg";

export default function Eagle() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeGalleryTab, setActiveGalleryTab] = useState("All");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const galleryTabs = ["All", "Guidelines", "Print", "PPE", "Equipment", "Industrial Scenes"];

  const galleryImages = [
    { src: guidelinesImage, category: "Guidelines", caption: "Eagle brand identity guideline preview grid." },
    { src: heroImage, category: "Print", caption: "Eagle print brochure layout spread." },
    { src: ppeImage, category: "PPE", caption: "Eagle hardhat branding in industrial context." },
    { src: equipmentImage, category: "Equipment", caption: "Eagle branding applied on industrial equipment." },
    { src: realEquipment1, category: "Equipment", caption: "Eagle identity on industrial machinery." },
    { src: realEquipment2, category: "Equipment", caption: "Eagle identity applied on forklift body." },
    { src: containerImage, category: "Industrial Scenes", caption: "Eagle container branding concept." },
    { src: toteBagImage, category: "Print", caption: "Eagle branded tote bag mockup." },
    { src: wallpaper1, category: "Industrial Scenes", caption: "Eagle identity shown on maritime shipping scene." },
    { src: wallpaper2, category: "Industrial Scenes", caption: "Eagle brand wallpaper in port context." },
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
              width="140"
              height="64"
              decoding="async"
              alt="Gray Solutions Logo" 
              className="cursor-pointer"
              style={{
                height: isScrolled ? '28px' : '48px',
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
                Eagle — Brand Built for Reliability in High-Risk Operations
              </h1>
              <p 
                className="text-base md:text-lg leading-relaxed mb-8"
                style={{ color: '#666666' }}
              >
                A full brand identity system designed to make Eagle look consistent, credible, and "enterprise-ready" across print, safety gear, equipment, and industrial environments.
              </p>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap gap-2">
                {["Brand Identity", "Guidelines", "Print + Physical Assets", "Industrial / Port Ops"].map((tag) => (
                  <span 
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-xs font-medium"
                    style={{ backgroundColor: 'rgba(220,38,38,0.1)', color: '#DC2626' }}
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
                alt="Eagle brand brochure shown in-hand"
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
              { title: "Ambition", text: "Create a brand that feels serious, dependable, and instantly recognizable—the kind of identity clients trust when operations are high-risk and time-sensitive." },
              { title: "Reality Check", text: "Industrial businesses often look inconsistent across assets: brochure says one thing, equipment looks different, and staff uniform has another style. That inconsistency silently kills trust." },
              { title: "What We Shipped", text: "A complete brand identity + usage system covering: logo rules, typography, color system, templates, and real-world applications (brochure, container, PPE, equipment branding, and wallpapers)." },
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
            {["Brand Identity", "Brand Guidelines", "Logo Design", "Print Design", "PPE Branding", "Equipment Branding", "Container Branding", "Merchandise"].map((service, idx) => (
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

      {/* Brand Guidelines Banner */}
      <section className="py-8 md:py-12" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-10">
          <motion.img 
            src={guidelinesImage}
            alt="Eagle brand identity guideline preview grid"
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
              { num: "1", title: "In industrial categories, trust is visual first.", text: "Before anyone reads your pitch, they judge your credibility by how consistent you look across environments." },
              { num: "2", title: "A brand isn't a logo — it's a repeatable system.", text: "The goal is not \"a nice design,\" it's a system teams can apply without breaking it." },
              { num: "3", title: "Real-world surfaces matter more than social posts.", text: "When your identity lives on equipment, containers, helmets, and documents, it becomes \"real\" to customers." },
              { num: "4", title: "Guidelines are the difference between brand and decoration.", text: "Without rules, teams improvise—and the brand slowly becomes noise." },
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
                  style={{ color: 'rgba(220,38,38,0.2)' }}
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
                Make Eagle feel like a company that runs clean operations—by designing an identity that stays consistent under real-world pressure.
              </p>
              
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#1A1A1A' }}>The Strategy</h3>
              <ul className="space-y-3">
                {[
                  "Build a recognizable core: a strong mark + bold identity that reads instantly at distance.",
                  "Design for environments, not just screens: assets that work in sunlight, dust, warehouses, ports, and print.",
                  "Create strict rules for consistency: so teams can roll it out across vendors without quality dropping.",
                  "Extend into physical touchpoints: brochure, equipment, containers, PPE, and brand wallpapers.",
                  "Make it scalable: templates + guidelines so future assets look like Eagle without re-designing every time.",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-base" style={{ color: '#666666' }}>
                    <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#DC2626' }} />
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
                src={ppeImage}
                alt="Eagle hardhat branding in industrial context"
                className="w-full rounded-2xl"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-12 md:py-28" style={{ backgroundColor: '#DC2626' }}>
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
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Impact delivered (now)
              </h3>
              <ul className="space-y-3">
                {[
                  "A brand system that looks enterprise-grade and operationally credible",
                  "Consistent identity across print + physical assets",
                  "Clear guidelines to prevent \"brand drift\" over time",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-base" style={{ color: '#FFFFFF' }}>
                    <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#FFFFFF' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Impact to measure (later)
              </h3>
              <ul className="space-y-3">
                {[
                  "↑ Brand recall in client meetings",
                  "↑ Proposal acceptance rate",
                  "↓ Time to create marketing collateral",
                  "↓ Rework from vendors / printers",
                ].map((item, idx) => (
                  <li key={idx} className="text-base" style={{ color: 'rgba(255,255,255,0.9)' }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Testimonial */}
          <motion.div
            className="p-8 rounded-2xl text-center"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xl md:text-2xl italic mb-4" style={{ color: '#FFFFFF' }}>
              "Now our assets finally look like one company — not five vendors."
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
              Brand in the Real World
            </h2>
            <p className="text-lg" style={{ color: '#666666' }}>
              Identity guidelines + proof of application across surfaces and environments.
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
                  backgroundColor: activeGalleryTab === tab ? '#DC2626' : 'transparent',
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

      {/* Full Width Wallpaper */}
      <section className="py-0" style={{ backgroundColor: '#FFFFFF' }}>
        <motion.img 
          src={wallpaper2}
          alt="Eagle brand wallpaper in port context"
          className="w-full"
          loading="lazy"
          decoding="async"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        />
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
              Want a brand that looks credible in the real world—not just online?
            </h2>
            <p className="text-lg mb-8" style={{ color: '#666666' }}>
              We build identity systems that teams can actually execute across vendors, assets, and environments.
            </p>
            <Link href="/contact">
              <button 
                className="px-8 py-4 rounded-full font-medium text-base transition-all hover:opacity-90"
                style={{ backgroundColor: '#DC2626', color: '#FFFFFF' }}
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
