import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import logoImage from "@assets/Group_69_(1)_1764854226570.png";

export default function Services() {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.div 
      className="min-h-screen w-full bg-white font-sans text-brand-text-dark"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header - Logo Only */}
      <motion.header 
        className="h-[100px] flex-none flex flex-col bg-white relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex-1 flex flex-col justify-center items-center py-6">
          <Link href="/">
            <motion.img 
              src={logoImage} 
              alt="Gray Solutions Logo" 
              className="h-12 w-auto cursor-pointer" 
              data-testid="logo-header"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
          </Link>
        </div>
      </motion.header>

      {/* Main Content */}
      <motion.main 
        className="px-8 md:px-16 lg:px-24 pb-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Intro Section */}
        <motion.section className="mb-16" variants={itemVariants}>
          <h2 className="text-4xl font-semibold mb-6" data-testid="section-intro">Intro</h2>
          <motion.div 
            className="w-full h-[300px] bg-gray-300 rounded-lg" 
            data-testid="intro-placeholder"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          ></motion.div>
        </motion.section>

        {/* Quick Brief About Us */}
        <motion.section className="mb-16" variants={itemVariants}>
          <h2 className="text-2xl font-semibold mb-6" data-testid="section-brief">Quick brief about us</h2>
          <div className="grid grid-cols-5 gap-4">
            {briefItems.map((item, index) => (
              <motion.div 
                key={item.id} 
                className="aspect-square bg-gray-300 rounded-lg flex items-center justify-center"
                data-testid={`brief-card-${item.id}`}
                variants={cardVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Road Map */}
        <motion.section className="mb-16" variants={itemVariants}>
          <h2 className="text-2xl font-semibold mb-6" data-testid="section-roadmap">Road Map</h2>
          <motion.div 
            className="w-full h-[350px] bg-gray-300 rounded-lg" 
            data-testid="roadmap-placeholder"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          ></motion.div>
        </motion.section>

        {/* Capabilities */}
        <motion.section className="mb-16" variants={itemVariants}>
          <h2 className="text-4xl font-semibold mb-8" data-testid="section-capabilities">Capabilities</h2>
          <div className="grid grid-cols-3 gap-12">
            {capabilities.map((cap, index) => (
              <motion.div 
                key={index} 
                data-testid={`capability-column-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.15 }}
              >
                <h3 className="text-lg font-semibold mb-4">{cap.heading}</h3>
                <ul className="space-y-2">
                  {cap.items.map((item, idx) => (
                    <motion.li 
                      key={idx} 
                      className="text-gray-600 text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 + index * 0.15 + idx * 0.1 }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Client Testimonials */}
        <motion.section variants={itemVariants}>
          <h2 className="text-4xl font-semibold mb-8" data-testid="section-testimonials">Client Testimonials</h2>
          <div className="space-y-8">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={testimonial.id}
                className={`flex ${testimonial.position === 'right' ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, x: testimonial.position === 'right' ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
              >
                <motion.div 
                  className="w-[200px] h-[120px] bg-gray-300 rounded-lg"
                  data-testid={`testimonial-${testimonial.id}`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </motion.main>
    </motion.div>
  );
}
