import React, { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import BlockContent from "@sanity/block-content-to-react";
import { getBlogPost, urlFor, sanityClient } from "@/lib/sanity";
import logoImage from "@assets/Frame_33_copy2_2_(1)_1768895375486.png";
import Footer from "@/components/footer";
import { ArrowLeft, Clock, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BlogDetail() {
  const [, params] = useRoute("/blog/:slug");
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const fetchPost = async () => {
      if (params?.slug) {
        try {
          const data = await getBlogPost(params.slug);
          setPost(data);
        } catch (error) {
          console.error("Error fetching blog post:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchPost();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [params?.slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-100 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-4">Story not found.</h1>
        <Link href="/blogs">
          <Button variant="outline">Back to insights</Button>
        </Link>
      </div>
    );
  }

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

      <main className="pt-32 pb-24">
        <article className="max-w-[900px] mx-auto px-4 sm:px-6 md:px-10">
          <Link href="/blogs">
            <button className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black mb-10 transition-colors">
              <ArrowLeft size={16} />
              Back to insights
            </button>
          </Link>

          <header className="mb-12">
            <div className="flex flex-wrap gap-4 items-center mb-6">
              {post.categories?.map((cat: string) => (
                <span key={cat} className="px-3 py-1 bg-gray-100 text-[10px] font-bold uppercase tracking-widest rounded-full">
                  {cat}
                </span>
              ))}
              <span className="text-gray-300">|</span>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock size={14} />
                <span>{new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] mb-8 tracking-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 py-8 border-y border-gray-100">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold">
                {post.authorName?.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold">{post.authorName}</p>
                <p className="text-xs text-gray-500">Strategy & Operations</p>
              </div>
            </div>
          </header>

          <div className="relative aspect-[21/9] rounded-3xl overflow-hidden mb-16 bg-gray-100">
            {post.mainImage && (
              <img 
                src={urlFor(post.mainImage).width(1200).url()} 
                alt={post.title}
                className="object-cover w-full h-full"
              />
            )}
          </div>

          <div className="prose prose-lg prose-gray max-w-none 
            prose-headings:font-bold prose-headings:tracking-tight 
            prose-p:leading-relaxed prose-p:text-gray-700
            prose-img:rounded-3xl prose-a:text-black prose-a:font-bold">
            <BlockContent
              blocks={post.body}
              projectId={sanityClient.config().projectId}
              dataset={sanityClient.config().dataset}
            />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
