import React, { useState, useEffect, useMemo } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Calendar } from "lucide-react";
import { getPublishedPosts } from "@/lib/posts";
import Footer from "@/components/footer";
import SiteNav from "@/components/site-nav";

// ─────────────────────────────────────────────────────────────────────────────
// Design tokens (Gray Solutions light theme)
// ─────────────────────────────────────────────────────────────────────────────
const BG_PAGE     = "#FFFFFC";
const BG_CANVAS   = "#F8F9FB";
const SURFACE     = "#FFFFFF";
const BORDER_SOFT = "#E5E7EB";
const BORDER_FAINT = "#EEF0F4";
const TEXT_PRIMARY   = "#0D1117";
const TEXT_BODY      = "#4B5563";
const TEXT_MUTED     = "#6B7180";
const TEXT_TERTIARY  = "#9CA3AF";
const ACCENT_BLUE      = "#2563EB";
const ACCENT_BLUE_SOFT = "#EEF2FF";
const ACCENT_VIOLET    = "#8B5CF6";

const FONT_DISPLAY = "'Plus Jakarta Sans', 'Inter', ui-sans-serif, system-ui, sans-serif";
const FONT_BODY    = "'DM Sans', 'Inter', ui-sans-serif, system-ui, sans-serif";
const FONT_MONO    = "'JetBrains Mono', ui-monospace, monospace";

const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EXPO_OUT_CSS = "cubic-bezier(0.16, 1, 0.3, 1)";

// ─────────────────────────────────────────────────────────────────────────────
// Static fallback teasers (shown when Sanity returns no posts — same 3 from
// the home page BlogTeaser, so visitors always see a populated index)
// ─────────────────────────────────────────────────────────────────────────────
type BlogTeaser = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  author?: string;
  cover: string;
};

const fallbackPosts: BlogTeaser[] = [
  {
    slug: "building-brands-that-stand-the-test-of-time",
    title: "Building brands that stand the test of time",
    excerpt:
      "Why strong foundations, thoughtful systems, and clarity of message never go out of style.",
    category: "Design",
    publishedAt: "2025-05-24",
    cover:
      "https://images.unsplash.com/photo-1554034483-04fda0d3507b?w=1200&auto=format&fit=crop&q=75",
  },
  {
    slug: "the-real-impact-of-ai-in-modern-workflows",
    title: "The real impact of AI in modern workflows",
    excerpt:
      "AI isn't about replacing people. It's about removing friction and creating more room for what matters.",
    category: "Technology",
    publishedAt: "2025-05-20",
    cover:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&auto=format&fit=crop&q=75",
  },
  {
    slug: "content-strategies-that-drive-compounding-growth",
    title: "Content strategies that drive compounding growth",
    excerpt:
      "A practical look at how consistent, valuable content builds momentum that lasts.",
    category: "Growth",
    publishedAt: "2025-05-16",
    cover:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=75",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

type CardPost = {
  href: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  cover: string;
  authorName?: string;
};

function normalizeDbPost(p: any): CardPost | null {
  if (!p?.slug) return null;
  return {
    href: `/blogs/${p.slug}`,
    title: p.title,
    excerpt: p.excerpt || "",
    category: p.category || "Article",
    date: formatDate(p.publishedAt || p.createdAt),
    cover: p.coverImage || "",
    authorName: p.author,
  };
}

function normalizeFallback(p: BlogTeaser): CardPost {
  return {
    href: `/blogs/${p.slug}`,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    date: formatDate(p.publishedAt),
    cover: p.cover,
    authorName: p.author,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Card components
// ─────────────────────────────────────────────────────────────────────────────
function CategoryPill({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] uppercase tracking-[0.18em]"
      style={{
        color: ACCENT_BLUE,
        fontFamily: FONT_MONO,
        backgroundColor: ACCENT_BLUE_SOFT,
        border: `1px solid rgba(37,99,235,0.18)`,
      }}
    >
      {label}
    </span>
  );
}

function MetaRow({ date, author }: { date: string; author?: string }) {
  return (
    <div
      className="flex items-center gap-2 text-[12px]"
      style={{ color: TEXT_TERTIARY, fontFamily: FONT_MONO }}
    >
      {author && (
        <>
          <span style={{ color: TEXT_BODY, fontWeight: 500, fontFamily: FONT_BODY }}>{author}</span>
          <span>·</span>
        </>
      )}
      {date && (
        <span className="inline-flex items-center gap-1.5">
          <Calendar size={12} strokeWidth={1.6} />
          {date}
        </span>
      )}
    </div>
  );
}

function FeaturedCard({ post }: { post: CardPost }) {
  return (
    <Link
      href={post.href}
      className="blog-card group block cursor-pointer"
      aria-label={`${post.title} — Read article`}
    >
      <motion.article
        className="overflow-hidden"
        style={{
          backgroundColor: SURFACE,
          border: `1px solid ${BORDER_SOFT}`,
          borderRadius: 20,
          boxShadow: "0 1px 2px rgba(13,17,23,0.04), 0 12px 36px rgba(13,17,23,0.05)",
        }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: EXPO_OUT }}
      >
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-0 items-stretch">
          {/* Image side */}
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16 / 10", backgroundColor: BG_CANVAS }}>
            {post.cover && (
              <div
                className="absolute inset-0 transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
                style={{
                  backgroundImage: `url(${post.cover})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                aria-hidden="true"
              />
            )}
            <div
              className="absolute top-4 left-4 inline-flex items-center px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.18em]"
              style={{
                color: "#FFFFFF",
                fontFamily: FONT_MONO,
                backgroundColor: "rgba(13,17,23,0.55)",
                backdropFilter: "saturate(180%) blur(10px)",
                WebkitBackdropFilter: "saturate(180%) blur(10px)",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            >
              Featured
            </div>
          </div>

          {/* Body side */}
          <div className="flex flex-col justify-between p-7 lg:p-9">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <CategoryPill label={post.category} />
                <span className="text-[12px]" style={{ color: TEXT_TERTIARY, fontFamily: FONT_MONO }}>
                  {post.date}
                </span>
              </div>
              <h2
                className="font-bold tracking-[-0.025em] mb-4"
                style={{
                  fontFamily: FONT_DISPLAY,
                  color: TEXT_PRIMARY,
                  fontSize: "clamp(24px, 2.4vw, 34px)",
                  lineHeight: 1.15,
                }}
              >
                {post.title}
              </h2>
              {post.excerpt && (
                <p
                  className="mb-6"
                  style={{
                    color: TEXT_BODY,
                    fontFamily: FONT_BODY,
                    fontSize: "clamp(14px, 1.05vw, 16px)",
                    lineHeight: 1.6,
                  }}
                >
                  {post.excerpt}
                </p>
              )}
            </div>
            <span
              className="inline-flex items-center gap-2 text-[14px] font-medium"
              style={{ color: ACCENT_BLUE, fontFamily: FONT_BODY }}
            >
              <span className="transition-colors">Read article</span>
              <ArrowRight
                size={14}
                strokeWidth={1.8}
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

function BlogCard({ post, idx }: { post: CardPost; idx: number }) {
  return (
    <Link
      href={post.href}
      className="blog-card group block cursor-pointer h-full"
      aria-label={`${post.title} — Read article`}
    >
      <motion.article
        className="flex flex-col h-full overflow-hidden"
        style={{
          backgroundColor: SURFACE,
          border: `1px solid ${BORDER_SOFT}`,
          borderRadius: 18,
          boxShadow: "0 1px 2px rgba(13,17,23,0.03), 0 6px 24px rgba(13,17,23,0.04)",
        }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: idx * 0.08, ease: EXPO_OUT }}
      >
        {/* Image */}
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16 / 10", backgroundColor: BG_CANVAS }}>
          {post.cover && (
            <div
              className="absolute inset-0 transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
              style={{
                backgroundImage: `url(${post.cover})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              aria-hidden="true"
            />
          )}
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-5 lg:p-6">
          <div className="flex items-center justify-between gap-3 mb-3">
            <CategoryPill label={post.category} />
            <span className="text-[12px]" style={{ color: TEXT_TERTIARY, fontFamily: FONT_MONO }}>
              {post.date}
            </span>
          </div>
          <h3
            className="font-bold tracking-[-0.015em] mb-2"
            style={{
              fontFamily: FONT_DISPLAY,
              color: TEXT_PRIMARY,
              fontSize: "clamp(18px, 1.4vw, 22px)",
              lineHeight: 1.25,
            }}
          >
            {post.title}
          </h3>
          {post.excerpt && (
            <p
              className="flex-1 mb-4"
              style={{
                color: TEXT_BODY,
                fontFamily: FONT_BODY,
                fontSize: 14,
                lineHeight: 1.55,
              }}
            >
              {post.excerpt}
            </p>
          )}
          <span
            className="inline-flex items-center gap-2 text-[13px] font-medium mt-auto"
            style={{ color: ACCENT_BLUE, fontFamily: FONT_BODY }}
          >
            <span>Read article</span>
            <ArrowRight
              size={14}
              strokeWidth={1.8}
              className="transition-transform group-hover:translate-x-1"
            />
          </span>
        </div>
      </motion.article>
    </Link>
  );
}

function SkeletonCard() {
  return (
    <div
      className="overflow-hidden"
      style={{
        backgroundColor: SURFACE,
        border: `1px solid ${BORDER_SOFT}`,
        borderRadius: 18,
      }}
    >
      <div className="aspect-[16/10] w-full skeleton-bg" />
      <div className="p-5 lg:p-6 space-y-3">
        <div className="flex gap-2">
          <div className="h-5 w-16 rounded-md skeleton-bg" />
          <div className="h-5 w-24 rounded-md skeleton-bg ml-auto" />
        </div>
        <div className="h-6 w-4/5 rounded-md skeleton-bg" />
        <div className="h-4 w-full rounded-md skeleton-bg" />
        <div className="h-4 w-3/5 rounded-md skeleton-bg" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────
export default function Blogs() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await getPublishedPosts();
        if (cancelled) return;
        setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
        if (!cancelled) setPosts([]);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Normalize DB posts; fall back to static teasers if none returned (e.g. before
  // the database is live, or if it has no published posts yet).
  const cardPosts: CardPost[] = useMemo(() => {
    const fromDb = posts.map(normalizeDbPost).filter((p): p is CardPost => p !== null);
    if (fromDb.length > 0) return fromDb;
    return fallbackPosts.map(normalizeFallback);
  }, [posts]);

  const featured = cardPosts[0];
  const rest = cardPosts.slice(1);

  // Build the unique set of categories for the filter chips
  const categories = useMemo(() => {
    const set = new Set<string>();
    cardPosts.forEach((p) => p.category && set.add(p.category));
    return Array.from(set);
  }, [cardPosts]);

  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundColor: BG_PAGE,
        color: TEXT_PRIMARY,
        fontFamily: FONT_BODY,
        overflowX: "hidden",
      }}
    >
      <SiteNav theme="light" />

      <main>
        {/* ── Header / intro ──────────────────────────────────────── */}
        <section className="w-full" style={{ backgroundColor: BG_PAGE, paddingTop: 100 }}>
          <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12 pt-10 md:pt-14 pb-10 md:pb-14">
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-start lg:items-end"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EXPO_OUT }}
            >
              <div>
                <span
                  className="inline-flex items-center px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.24em] mb-5"
                  style={{
                    color: ACCENT_BLUE,
                    fontFamily: FONT_MONO,
                    backgroundColor: ACCENT_BLUE_SOFT,
                    border: `1px solid rgba(37,99,235,0.18)`,
                  }}
                >
                  Blog
                </span>
                <h1
                  className="font-bold tracking-[-0.03em]"
                  style={{
                    fontFamily: FONT_DISPLAY,
                    color: TEXT_PRIMARY,
                    fontSize: "clamp(40px, 6vw, 76px)",
                    lineHeight: 1.0,
                    fontWeight: 800,
                  }}
                >
                  Ideas, insights,
                  <br />
                  and{" "}
                  <span
                    style={{
                      background:
                        "linear-gradient(110deg, #2563EB 0%, #6366F1 55%, #8B5CF6 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    perspectives.
                  </span>
                </h1>
                <p
                  className="mt-6 md:mt-7 max-w-[600px]"
                  style={{
                    color: TEXT_BODY,
                    fontFamily: FONT_BODY,
                    fontSize: "clamp(15px, 1.15vw, 18px)",
                    lineHeight: 1.6,
                  }}
                >
                  Thoughts on design, development, AI, and growth from the Gray Solutions team.
                </p>
              </div>

              {/* Category chips — visual filter list (clicking is a future enhancement) */}
              {categories.length > 0 && !isLoading && (
                <div className="hidden lg:flex flex-wrap items-center gap-2 lg:max-w-[420px] lg:justify-end">
                  {categories.slice(0, 5).map((cat) => (
                    <span
                      key={cat}
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-[12px]"
                      style={{
                        color: TEXT_BODY,
                        fontFamily: FONT_BODY,
                        backgroundColor: SURFACE,
                        border: `1px solid ${BORDER_SOFT}`,
                      }}
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* ── Featured + Grid ─────────────────────────────────────── */}
        <section className="w-full" style={{ backgroundColor: BG_PAGE }}>
          <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12 pb-20 md:pb-28">
            {isLoading ? (
              <>
                {/* Featured skeleton */}
                <div
                  className="overflow-hidden mb-8 md:mb-10"
                  style={{
                    backgroundColor: SURFACE,
                    border: `1px solid ${BORDER_SOFT}`,
                    borderRadius: 20,
                  }}
                >
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div className="aspect-[16/10] w-full skeleton-bg" />
                    <div className="p-7 lg:p-9 space-y-4">
                      <div className="flex gap-2">
                        <div className="h-5 w-16 rounded-md skeleton-bg" />
                        <div className="h-5 w-24 rounded-md skeleton-bg" />
                      </div>
                      <div className="h-8 w-full rounded-md skeleton-bg" />
                      <div className="h-8 w-2/3 rounded-md skeleton-bg" />
                      <div className="h-4 w-full rounded-md skeleton-bg" />
                      <div className="h-4 w-3/4 rounded-md skeleton-bg" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                  {[0, 1, 2].map((i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              </>
            ) : cardPosts.length === 0 ? (
              <div
                className="text-center py-20 rounded-3xl"
                style={{ backgroundColor: BG_CANVAS, border: `1px solid ${BORDER_FAINT}` }}
              >
                <h3
                  className="font-medium"
                  style={{ color: TEXT_MUTED, fontFamily: FONT_DISPLAY, fontSize: 18 }}
                >
                  No stories yet. Check back soon.
                </h3>
              </div>
            ) : (
              <>
                {/* Featured article — full width */}
                <div className="mb-8 md:mb-10">
                  <FeaturedCard post={featured} />
                </div>

                {/* Remaining articles — 3-col grid */}
                {rest.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 items-stretch">
                    {rest.map((post, idx) => (
                      <BlogCard key={post.href} post={post} idx={idx} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* ── Newsletter band ─────────────────────────────────────── */}
        <section className="w-full" style={{ backgroundColor: BG_CANVAS, borderTop: `1px solid ${BORDER_FAINT}` }}>
          <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12 py-16 md:py-24">
            <motion.div
              className="grid lg:grid-cols-[1fr_auto] gap-8 items-center"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: EXPO_OUT }}
            >
              <div>
                <span
                  className="text-[11px] uppercase tracking-[0.24em] mb-3 block"
                  style={{ color: ACCENT_BLUE, fontFamily: FONT_MONO }}
                >
                  Stay in the loop
                </span>
                <h2
                  className="font-bold tracking-[-0.025em]"
                  style={{
                    fontFamily: FONT_DISPLAY,
                    color: TEXT_PRIMARY,
                    fontSize: "clamp(24px, 3vw, 36px)",
                    lineHeight: 1.15,
                    maxWidth: "26ch",
                  }}
                >
                  New articles, monthly. No spam, just value.
                </h2>
              </div>
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-[14px] font-medium transition-all cursor-pointer whitespace-nowrap self-start lg:self-center"
                style={{
                  fontFamily: FONT_BODY,
                  color: "#FFFFFF",
                  backgroundColor: TEXT_PRIMARY,
                }}
              >
                <span>Subscribe</span>
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.8}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        .blog-card article {
          transition: border-color 300ms ${EXPO_OUT_CSS}, box-shadow 300ms ${EXPO_OUT_CSS}, transform 300ms ${EXPO_OUT_CSS};
        }
        .blog-card:hover article {
          border-color: rgba(37, 99, 235, 0.35) !important;
          box-shadow: 0 1px 2px rgba(13,17,23,0.05), 0 18px 48px rgba(13,17,23,0.08) !important;
          transform: translateY(-2px);
        }
        @keyframes skeleton-shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .skeleton-bg {
          background: linear-gradient(90deg, #F1F3F6 25%, #E5E7EB 50%, #F1F3F6 75%);
          background-size: 200% 100%;
          animation: skeleton-shimmer 1.6s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .skeleton-bg { animation: none; }
          .blog-card:hover article { transform: none; }
        }
      `}</style>
    </div>
  );
}
