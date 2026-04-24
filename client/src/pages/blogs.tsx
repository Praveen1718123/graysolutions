import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { getBlogPosts, urlFor } from "@/lib/sanity";
import logoImage from "@assets/Frame_33_copy2_2_(1)_1768895375486.png";
import Footer from "@/components/footer";

export default function Blogs() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const fetchPosts = async () => {
      try {
        console.log("Fetching blog posts...");
        const data = await getBlogPosts();
        console.log("Fetched posts data:", data);
        
        if (!data || !Array.isArray(data)) {
          console.error("Expected array of posts, but got:", data);
          setPosts([]);
        } else {
          setPosts(data);
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen w-full font-sans bg-white" style={{ color: '#1A1A1A' }}>
      {/* Scroll-aware Header */}
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
            backgroundColor: isScrolled ? 'rgba(255,255,255,0.92)' : 'white',
            backdropFilter: isScrolled ? 'blur(12px)' : 'none',
            boxShadow: isScrolled ? '0 4px 24px rgba(0,0,0,0.1)' : 'none',
            borderRadius: isScrolled ? '999px' : '0',
            transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <Link href="/">
            <img 
              src={logoImage}
              width="140"
              height="64"
              alt="Gray Logo" 
              className="cursor-pointer"
              style={{ height: isScrolled ? '28px' : '48px', width: 'auto' }}
            />
          </Link>
        </div>
      </header>

      <main className="pt-32 pb-24 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
        <div className="mb-16">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Insights & <span className="italic font-normal">Thought Leadership.</span>
          </motion.h1>
          <p className="text-xl text-gray-500 max-w-2xl">
            Exploring the intersection of product design, engineering, and rapid growth in the digital age.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-100 aspect-[16/10] rounded-2xl mb-4" />
                <div className="h-6 bg-gray-100 w-3/4 mb-2" />
                <div className="h-4 bg-gray-100 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-16">
            {posts.map((post, idx) => {
              if (!post.slug?.current) {
                console.warn(`Post at index ${idx} is missing a slug:`, post);
                return null;
              }
              
              return (
                <motion.article 
                  key={post.slug.current}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group cursor-pointer"
                >
                <Link href={`/blogs/${post.slug.current}`}>
                  <div>
                    <div className="relative overflow-hidden rounded-2xl aspect-[16/10] mb-6 bg-gray-100">
                      {post.mainImage && (
                        <img 
                          src={urlFor(post.mainImage).width(800).url()} 
                          alt={post.title}
                          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="space-y-3">
                      <div className="flex gap-3 text-xs font-medium uppercase tracking-wider text-gray-400">
                        {post.categories?.map((cat: string) => (
                          <span key={cat}>{cat}</span>
                        ))}
                      </div>
                      <h2 className="text-2xl font-bold leading-tight group-hover:text-gray-600 transition-colors">
                        {post.title}
                      </h2>
                      <div className="flex items-center gap-3 pt-2 text-sm text-gray-500">
                        <span className="font-medium text-black">{post.authorName}</span>
                        <span>•</span>
                        <span>{new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
              );
            })}
          </div>
        )}

        {!isLoading && posts.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-3xl">
            <h3 className="text-xl font-medium text-gray-400">No stories found yet. Check back soon!</h3>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
