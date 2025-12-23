import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import logoImage from "@assets/Group_69_(1)_1764854226570.png";

interface BlogPost {
  id: number;
  slug: string;
  category: string;
  title: string;
  excerpt?: string;
  imageUrl?: string;
  gradient: string;
  readTime?: string;
  featured?: boolean;
}

const placeholderPosts: BlogPost[] = [
  {
    id: 1,
    slug: "placeholder-1",
    category: "PRODUCT",
    title: "[Blog Title Placeholder]",
    excerpt: "[Brief excerpt or description will go here]",
    gradient: "linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)",
    readTime: "5 min read",
    featured: true,
  },
  {
    id: 2,
    slug: "placeholder-2",
    category: "DESIGN",
    title: "[Blog Title Placeholder]",
    gradient: "linear-gradient(135deg, #1A237E 0%, #283593 100%)",
    readTime: "4 min read",
  },
  {
    id: 3,
    slug: "placeholder-3",
    category: "STRATEGY",
    title: "[Blog Title Placeholder]",
    gradient: "linear-gradient(135deg, #EFEBE9 0%, #D7CCC8 100%)",
    readTime: "6 min read",
  },
  {
    id: 4,
    slug: "placeholder-4",
    category: "TECHNOLOGY",
    title: "[Blog Title Placeholder]",
    gradient: "linear-gradient(135deg, #FCE4EC 0%, #F8BBD9 100%)",
    readTime: "3 min read",
  },
  {
    id: 5,
    slug: "placeholder-5",
    category: "BRANDING",
    title: "[Blog Title Placeholder]",
    gradient: "linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%)",
    readTime: "7 min read",
  },
  {
    id: 6,
    slug: "placeholder-6",
    category: "INSIGHTS",
    title: "[Blog Title Placeholder]",
    gradient: "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)",
    readTime: "5 min read",
  },
];

const categories = ["All", "Product", "Design", "Strategy", "Technology", "Branding", "Insights"];

export default function Blogs() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredPosts = activeCategory === "All" 
    ? placeholderPosts 
    : placeholderPosts.filter(post => post.category.toLowerCase() === activeCategory.toLowerCase());

  const featuredPost = filteredPosts.find(p => p.featured) || filteredPosts[0];
  const otherPosts = filteredPosts.filter(p => p.id !== featuredPost?.id);

  const isDarkCard = (gradient: string) => {
    return gradient.includes('#1A') || gradient.includes('#28') || gradient.includes('#0D');
  };

  return (
    <motion.div 
      className="min-h-screen w-full font-sans overflow-x-hidden"
      style={{ 
        backgroundColor: '#F8FAFC',
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
            backgroundColor: isScrolled ? 'rgba(255,255,255,0.92)' : '#F8FAFC',
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
      <main className="pt-24 md:pt-28 pb-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          
          {/* Category Tabs */}
          <motion.div 
            className="flex items-center gap-2 md:gap-6 mb-8 overflow-x-auto pb-2 scrollbar-hide"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className="whitespace-nowrap px-1 py-2 text-sm font-medium transition-all"
                style={{
                  color: activeCategory === category ? '#1A1A1A' : '#888888',
                  borderBottom: activeCategory === category ? '2px solid #1A1A1A' : '2px solid transparent',
                }}
                data-testid={`category-tab-${category.toLowerCase()}`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Page Title */}
          <motion.div 
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 
              className="text-4xl md:text-5xl font-bold mb-3"
              style={{ color: '#1A1A1A' }}
              data-testid="blogs-page-title"
            >
              Insights.
            </h1>
            <p 
              className="text-base md:text-lg"
              style={{ color: '#666666', maxWidth: '400px' }}
            >
              [Subtitle placeholder — brief description of your blog section will go here]
            </p>
          </motion.div>

          {/* Masonry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            
            {/* Featured Post - Large Card */}
            {featuredPost && (
              <motion.article
                className="md:col-span-1 lg:col-span-1 md:row-span-2 rounded-2xl overflow-hidden cursor-pointer group"
                style={{
                  background: featuredPost.gradient,
                  minHeight: '400px',
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                whileHover={{ scale: 1.02, y: -4 }}
                data-testid={`blog-card-${featuredPost.id}`}
              >
                <div className="p-6 md:p-8 h-full flex flex-col justify-between">
                  <div>
                    <span 
                      className="text-xs font-semibold tracking-widest uppercase"
                      style={{ color: isDarkCard(featuredPost.gradient) ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)' }}
                    >
                      {featuredPost.category}
                    </span>
                    <h2 
                      className="text-2xl md:text-3xl font-bold mt-3 leading-tight"
                      style={{ color: isDarkCard(featuredPost.gradient) ? '#FFFFFF' : '#1A1A1A' }}
                    >
                      {featuredPost.title}
                    </h2>
                    {featuredPost.excerpt && (
                      <p 
                        className="mt-3 text-sm leading-relaxed"
                        style={{ color: isDarkCard(featuredPost.gradient) ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.6)' }}
                      >
                        {featuredPost.excerpt}
                      </p>
                    )}
                  </div>
                  
                  {/* Image placeholder area */}
                  <div 
                    className="mt-6 flex-1 min-h-[120px] rounded-xl flex items-center justify-center"
                    style={{ 
                      backgroundColor: isDarkCard(featuredPost.gradient) ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                      border: `1px dashed ${isDarkCard(featuredPost.gradient) ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'}`,
                    }}
                  >
                    <span 
                      className="text-xs"
                      style={{ color: isDarkCard(featuredPost.gradient) ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)' }}
                    >
                      [Image placeholder]
                    </span>
                  </div>

                  <button 
                    className="mt-6 px-5 py-2.5 rounded-full text-sm font-medium self-start transition-all group-hover:translate-x-1"
                    style={{
                      backgroundColor: isDarkCard(featuredPost.gradient) ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)',
                      color: isDarkCard(featuredPost.gradient) ? '#FFFFFF' : '#1A1A1A',
                    }}
                    data-testid={`blog-read-${featuredPost.id}`}
                  >
                    {featuredPost.readTime || 'Read'}
                  </button>
                </div>
              </motion.article>
            )}

            {/* Other Posts */}
            {otherPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="rounded-2xl overflow-hidden cursor-pointer group"
                style={{
                  background: post.gradient,
                  minHeight: index === 4 ? '320px' : '200px',
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
                whileHover={{ scale: 1.02, y: -4 }}
                data-testid={`blog-card-${post.id}`}
              >
                <div className="p-5 md:p-6 h-full flex flex-col">
                  <span 
                    className="text-xs font-semibold tracking-widest uppercase"
                    style={{ color: isDarkCard(post.gradient) ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)' }}
                  >
                    {post.category}
                  </span>
                  <h3 
                    className="text-lg md:text-xl font-bold mt-2 leading-tight flex-1"
                    style={{ color: isDarkCard(post.gradient) ? '#FFFFFF' : '#1A1A1A' }}
                  >
                    {post.title}
                  </h3>
                  
                  {/* Small image placeholder */}
                  {index < 2 && (
                    <div 
                      className="mt-4 h-16 rounded-lg flex items-center justify-center"
                      style={{ 
                        backgroundColor: isDarkCard(post.gradient) ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                        border: `1px dashed ${isDarkCard(post.gradient) ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'}`,
                      }}
                    >
                      <span 
                        className="text-xs"
                        style={{ color: isDarkCard(post.gradient) ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)' }}
                      >
                        [Image]
                      </span>
                    </div>
                  )}

                  <button 
                    className="mt-4 px-4 py-2 rounded-full text-xs font-medium self-start transition-all group-hover:translate-x-1"
                    style={{
                      backgroundColor: isDarkCard(post.gradient) ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)',
                      color: isDarkCard(post.gradient) ? '#FFFFFF' : '#1A1A1A',
                    }}
                    data-testid={`blog-read-${post.id}`}
                  >
                    {post.readTime || 'Read'}
                  </button>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Empty State / Placeholder Notice */}
          <motion.div 
            className="mt-16 text-center py-12 rounded-2xl"
            style={{ 
              backgroundColor: '#FFFFFF',
              border: '1px dashed rgba(0,0,0,0.1)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <p className="text-sm" style={{ color: '#888888' }}>
              Content placeholders shown above. Replace with your actual blog posts.
            </p>
          </motion.div>

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
