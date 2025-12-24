import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import logoImage from "@assets/Group_69_(1)_1764854226570.png";
import ctaImage from "@assets/stock_images/two_professionals_co_f8f9803a.jpg";

export default function Contact() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqItems = [
    {
      question: "What industries does Gray Solutions serve?",
      answer: "We work across various industries including logistics, manufacturing, healthcare, fintech, and B2B SaaS. Our focus is on businesses that need digital products, brand systems, or AI-powered solutions."
    },
    {
      question: "How do I know which service is right for my business?",
      answer: "We start every engagement with a discovery call to understand your goals, challenges, and timeline. From there, we recommend the right approach — whether that's a full product build, brand refresh, or targeted AI integration."
    },
    {
      question: "Do you offer customized solutions or standard frameworks?",
      answer: "Everything we build is custom. We don't believe in one-size-fits-all solutions. Each project is tailored to your specific business context, users, and growth objectives."
    },
    {
      question: "How do you measure success with clients?",
      answer: "We define success metrics upfront with every client — whether that's user adoption, conversion rates, operational efficiency, or brand recognition. We track and report on these throughout our engagement."
    },
    {
      question: "How can I get started with Gray Solutions?",
      answer: "Simply reach out via our contact form or email us at hello@graysolutions.in. We'll schedule a free discovery call to discuss your project and see if we're a good fit."
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="min-h-screen w-full font-sans overflow-x-hidden"
      style={{ 
        backgroundColor: '#FAFAFA',
        color: '#1A1A1A',
        fontFamily: '-apple-system, system-ui, sans-serif',
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

      {/* Office Location Section */}
      <section 
        className="relative overflow-hidden"
        style={{ 
          minHeight: '70vh',
          background: '#FFFFFF',
        }}
      >
        <div 
          className="relative z-10 max-w-[1400px] mx-auto"
          style={{ 
            paddingTop: '140px',
            paddingBottom: '80px',
            paddingLeft: 'clamp(24px, 5vw, 80px)',
            paddingRight: 'clamp(24px, 5vw, 80px)',
          }}
        >
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
            style={{
              background: '#F5F5F5',
              border: '1px solid #E5E5E5',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span 
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: '#1A1A1A' }}
            />
            <span 
              className="text-xs font-medium tracking-widest uppercase"
              style={{ color: '#1A1A1A' }}
            >
              Visit Us
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            className="font-bold mb-5"
            style={{ 
              fontSize: 'clamp(32px, 4.5vw, 52px)',
              lineHeight: '1.1',
              color: '#1A1A1A',
              letterSpacing: '-0.02em',
            }}
            data-testid="contact-hero-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Office Location
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            className="text-base md:text-lg leading-relaxed mb-12"
            style={{ color: '#666666', maxWidth: '500px' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            Our office is conveniently located in Coimbatore, providing easy access for clients and partners.
          </motion.p>

          {/* Address Card */}
          <motion.div 
            className="max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div 
              className="p-8 rounded-2xl"
              style={{ 
                backgroundColor: '#FAFAFA',
                border: '1px solid #E5E5E5',
              }}
              data-testid="address-coimbatore"
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: 'rgba(26,26,26,0.05)' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#1A1A1A">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <h3 
                className="text-xl font-semibold mb-3"
                style={{ color: '#1A1A1A', letterSpacing: '-0.01em' }}
              >
                Coimbatore Office
              </h3>
              <p 
                className="text-base leading-relaxed"
                style={{ color: '#666666' }}
              >
                Indiqube Coworking space Coimbatore<br />
                Echo, Avinashi Rd, TNHB Colony,<br />
                Indira Nagar, Civil Aerodrome Post,<br />
                Coimbatore, Tamil Nadu 641014
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Drop Us a Message Section */}
      <section 
        className="py-16 md:py-24 relative z-10"
        style={{ backgroundColor: '#FAFAFA' }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left - Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Badge */}
              <span 
                className="text-sm font-medium mb-6 block"
                style={{ color: '#1A1A1A' }}
              >
                [Contact]
              </span>

              {/* Heading */}
              <h2 
                className="font-bold mb-5"
                style={{ 
                  fontSize: 'clamp(32px, 4.5vw, 52px)',
                  lineHeight: '1.1',
                  color: '#1A1A1A',
                  letterSpacing: '-0.02em',
                }}
              >
                Drop Us a Message
              </h2>

              {/* Description */}
              <p 
                className="text-base md:text-lg leading-relaxed mb-10"
                style={{ color: '#666666', maxWidth: '400px' }}
              >
                We're always happy to hear from you and will get back to you as soon as possible.
              </p>

              {/* Contact Details */}
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#1A1A1A' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFFFFF">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <div>
                    <span 
                      className="text-sm block mb-1"
                      style={{ color: '#666666' }}
                    >
                      Email
                    </span>
                    <a 
                      href="mailto:hello@graysolutions.in"
                      className="text-base font-medium hover:opacity-70 transition-opacity"
                      style={{ color: '#1A1A1A' }}
                      data-testid="link-email"
                    >
                      hello@graysolutions.in
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#1A1A1A' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFFFFF">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                  </div>
                  <div>
                    <span 
                      className="text-sm block mb-1"
                      style={{ color: '#666666' }}
                    >
                      Call
                    </span>
                    <a 
                      href="tel:+919876543210"
                      className="text-base font-medium hover:opacity-70 transition-opacity"
                      style={{ color: '#1A1A1A' }}
                      data-testid="link-phone"
                    >
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#1A1A1A' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFFFFF">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                  <div>
                    <span 
                      className="text-sm block mb-1"
                      style={{ color: '#666666' }}
                    >
                      Visit Us
                    </span>
                    <a 
                      href="https://maps.google.com/?q=Indiqube+Coworking+Coimbatore"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-medium hover:opacity-70 transition-opacity"
                      style={{ color: '#1A1A1A' }}
                      data-testid="link-map"
                    >
                      See on Google Map
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right - Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <form 
                className="space-y-5" 
                data-testid="contact-form"
              >
                {/* Full Name */}
                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ color: '#1A1A1A' }}
                  >
                    Full Name
                  </label>
                  <input 
                    type="text"
                    className="w-full px-5 py-4 rounded-xl text-base transition-all focus:outline-none focus:ring-2 focus:ring-offset-0"
                    style={{ 
                      backgroundColor: '#F5F5F5',
                      border: 'none',
                      color: '#1A1A1A',
                    }}
                    placeholder="Enter your name"
                    data-testid="input-full-name"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ color: '#1A1A1A' }}
                  >
                    Email Address
                  </label>
                  <input 
                    type="email"
                    className="w-full px-5 py-4 rounded-xl text-base transition-all focus:outline-none focus:ring-2 focus:ring-offset-0"
                    style={{ 
                      backgroundColor: '#F5F5F5',
                      border: 'none',
                      color: '#1A1A1A',
                    }}
                    placeholder="Enter email address"
                    data-testid="input-email"
                  />
                </div>

                {/* Message */}
                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ color: '#1A1A1A' }}
                  >
                    Write Your Message
                  </label>
                  <textarea 
                    className="w-full px-5 py-4 rounded-xl text-base resize-none transition-all focus:outline-none focus:ring-2 focus:ring-offset-0"
                    style={{ 
                      backgroundColor: '#F5F5F5',
                      border: 'none',
                      color: '#1A1A1A',
                      minHeight: '140px',
                    }}
                    placeholder="I want to collaborate"
                    data-testid="input-message"
                  />
                </div>

                {/* Submit Button */}
                <button 
                  type="submit"
                  className="w-full py-4 rounded-full text-base font-medium transition-all flex items-center justify-center gap-3"
                  style={{ 
                    backgroundColor: '#1A1A1A',
                    color: '#FFFFFF',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  data-testid="button-submit"
                >
                  Send Message
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section 
        className="py-16 md:py-24 relative z-10"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left - Heading & CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 
                className="font-bold mb-8"
                style={{ 
                  fontSize: 'clamp(32px, 4.5vw, 52px)',
                  lineHeight: '1.1',
                  color: '#1A1A1A',
                  letterSpacing: '-0.02em',
                }}
              >
                Frequently Asked<br />
                <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Questions.</span>
              </h2>

              {/* Still have a question card */}
              <div 
                className="p-6 rounded-2xl"
                style={{ backgroundColor: '#F5F5F5' }}
              >
                <h3 
                  className="text-lg font-semibold mb-2"
                  style={{ color: '#1A1A1A' }}
                >
                  Still have a question?
                </h3>
                <p 
                  className="text-sm leading-relaxed mb-5"
                  style={{ color: '#666666' }}
                >
                  Our team is ready to assist you with anything you need.
                </p>
                <a 
                  href="tel:+919876543210"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all hover:shadow-md"
                  style={{ 
                    backgroundColor: '#FFFFFF',
                    color: '#1A1A1A',
                    border: '1px solid #E5E5E5',
                  }}
                  data-testid="button-make-call"
                >
                  Make A Call
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </a>
              </div>
            </motion.div>

            {/* Right - FAQ Accordion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="space-y-0">
                {faqItems.map((item, idx) => {
                  const isExpanded = expandedFaq === idx;
                  return (
                    <div 
                      key={idx}
                      style={{ borderBottom: '1px solid #E5E5E5' }}
                      data-testid={`faq-item-${idx}`}
                    >
                      <button
                        className="w-full py-5 flex items-center justify-between text-left focus:outline-none"
                        onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                        aria-expanded={isExpanded}
                      >
                        <span 
                          className="text-base font-medium pr-4"
                          style={{ color: '#1A1A1A' }}
                        >
                          {item.question}
                        </span>
                        <span 
                          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
                          style={{ 
                            backgroundColor: isExpanded ? '#1A1A1A' : '#F5F5F5',
                            color: isExpanded ? '#FFFFFF' : '#1A1A1A',
                          }}
                        >
                          {isExpanded ? '−' : '+'}
                        </span>
                      </button>
                      <div 
                        className="overflow-hidden transition-all duration-300 ease-out"
                        style={{ 
                          maxHeight: isExpanded ? '200px' : '0', 
                          opacity: isExpanded ? 1 : 0 
                        }}
                      >
                        <p 
                          className="pb-5 text-base leading-relaxed"
                          style={{ color: '#666666' }}
                        >
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-16 md:py-24 relative z-10"
        style={{ backgroundColor: '#1A1A1A' }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Badge */}
              <span 
                className="text-sm font-medium mb-6 block"
                style={{ color: '#FFFFFF' }}
              >
                [CTA]
              </span>

              {/* Heading */}
              <h2 
                className="font-bold mb-8"
                style={{ 
                  fontSize: 'clamp(32px, 4.5vw, 52px)',
                  lineHeight: '1.1',
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                }}
              >
                Work with Experts to<br />
                Grow Faster & Run<br />
                <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Smarter</span>
              </h2>

              {/* CTA Button */}
              <a 
                href="#contact-form"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-sm font-medium transition-all hover:shadow-lg mb-10"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  color: '#1A1A1A',
                }}
                data-testid="button-get-started"
              >
                Get Started
                <span 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#1A1A1A' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </span>
              </a>

              {/* Bullet Points */}
              <ul className="space-y-3">
                {[
                  "Schedule a Free Consultation",
                  "Discover Custom Solutions",
                  "Start Building Your Competitive Advantage"
                ].map((item, idx) => (
                  <li 
                    key={idx}
                    className="flex items-center gap-3 text-base"
                    style={{ color: '#FFFFFF' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" fill="#FFFFFF" fillOpacity="0.2" />
                      <path d="M8 12l3 3 5-6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <img 
                src={ctaImage}
                alt="Team collaborating on laptop"
                className="w-full rounded-2xl object-cover"
                style={{ maxHeight: '450px' }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="py-12 relative z-10"
        style={{ backgroundColor: '#FAFAFA', borderTop: '1px solid #E5E5E5' }}
      >
        <div className="max-w-[1120px] mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link href="/">
              <img 
                src={logoImage} 
                alt="Gray Solutions Logo" 
                className="h-8 cursor-pointer"
              />
            </Link>
            <p 
              className="text-sm"
              style={{ color: '#666666' }}
            >
              © 2024 Gray Solutions. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
