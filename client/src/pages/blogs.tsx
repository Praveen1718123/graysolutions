import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import logoImage from "@assets/Group_69_(1)_1764854226570.png";

interface BlogPost {
  id: number;
  slug: string;
  category: string;
  categoryColor: string;
  title: string;
  bgColor: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "aligning-teams-efficiency",
    category: "Plan Smart",
    categoryColor: "#3B82F6",
    title: "The Key to Aligning Teams and Boosting Efficiency",
    bgColor: "#EEF4FF",
  },
  {
    id: 2,
    slug: "dynamic-workflows",
    category: "Stay Ahead",
    categoryColor: "#3B82F6",
    title: "How Dynamic Workflows Keep Teams Moving Forward",
    bgColor: "#E8F4F8",
  },
  {
    id: 3,
    slug: "task-prioritization",
    category: "Smart Priorities",
    categoryColor: "#DC2626",
    title: "Mastering Task Prioritization in Fast-Paced Teams",
    bgColor: "#FEF2F2",
  },
  {
    id: 4,
    slug: "progress-insights",
    category: "Data Driven",
    categoryColor: "#059669",
    title: "Advanced Progress Insights for Modern Teams",
    bgColor: "#ECFDF5",
  },
  {
    id: 5,
    slug: "project-sprint-overview",
    category: "Sprint Planning",
    categoryColor: "#7C3AED",
    title: "Project Sprint Overview: A Complete Guide",
    bgColor: "#F5F3FF",
  },
  {
    id: 6,
    slug: "user-activity-tracking",
    category: "User Analytics",
    categoryColor: "#DC2626",
    title: "Advanced User Activity Overview",
    bgColor: "#FEF2F2",
  },
];

export default function Blogs() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

      {/* Main Content */}
      <main className="pt-28 md:pt-32 pb-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          
          {/* Hero Section */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Pill Badge */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ 
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E5E5',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#666666' }}>
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <line x1="3" y1="9" x2="21" y2="9"/>
                <line x1="9" y1="21" x2="9" y2="9"/>
              </svg>
              <span className="text-sm font-medium" style={{ color: '#444444' }}>
                Our Blog
              </span>
            </div>
            
            <h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
              style={{ color: '#1A1A1A' }}
              data-testid="blogs-page-title"
            >
              Blog
            </h1>
            
            <p 
              className="text-base md:text-lg max-w-2xl mx-auto"
              style={{ color: '#666666' }}
            >
              Explore expert analyses, trends, and innovations shaping the decentralized future.
            </p>
          </motion.div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <motion.article
                  className="rounded-2xl overflow-hidden cursor-pointer group"
                  style={{
                    backgroundColor: '#FFFFFF',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                    border: '1px solid rgba(0,0,0,0.04)',
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
                  whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}
                  data-testid={`blog-card-${post.id}`}
                >
                  {/* Image Area */}
                  <div 
                    className="aspect-[4/3] flex items-center justify-center p-6 overflow-hidden"
                    style={{ backgroundColor: post.bgColor }}
                  >
                    {/* Placeholder UI mockup */}
                    <div className="w-full h-full rounded-xl bg-white/60 flex items-center justify-center" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-3 rounded-xl" style={{ backgroundColor: post.categoryColor + '20' }}>
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: post.categoryColor + '40' }} />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <div className="h-2 w-24 mx-auto rounded-full" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }} />
                          <div className="h-2 w-16 mx-auto rounded-full" style={{ backgroundColor: 'rgba(0,0,0,0.06)' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-5">
                    <span 
                      className="text-sm font-medium"
                      style={{ color: post.categoryColor }}
                    >
                      {post.category}
                    </span>
                    <h3 
                      className="text-lg font-bold mt-2 leading-snug group-hover:text-gray-600 transition-colors"
                      style={{ color: '#1A1A1A' }}
                    >
                      {post.title}
                    </h3>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>

        </div>
      </main>

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
