import React, { useState, useEffect, useMemo } from "react";
import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, Calendar, Twitter, Linkedin, Link as LinkIcon } from "lucide-react";
import { getPublishedPost } from "@/lib/posts";
import Footer from "@/components/footer";
import SiteNav from "@/components/site-nav";

// ─────────────────────────────────────────────────────────────────────────────
// Design tokens — light theme, matches /blogs index
// ─────────────────────────────────────────────────────────────────────────────
const BG_PAGE      = "#FFFFFC";
const BG_CANVAS    = "#F8F9FB";
const SURFACE      = "#FFFFFF";
const BORDER_SOFT  = "#E5E7EB";
const BORDER_FAINT = "#EEF0F4";
const TEXT_PRIMARY   = "#0D1117";
const TEXT_BODY      = "#1F2937";        // slightly warmer for long-form readability
const TEXT_MUTED     = "#4B5563";
const TEXT_TERTIARY  = "#6B7180";
const ACCENT_BLUE      = "#2563EB";
const ACCENT_BLUE_SOFT = "#EEF2FF";

const FONT_DISPLAY = "'Plus Jakarta Sans', 'Inter', ui-sans-serif, system-ui, sans-serif";
const FONT_BODY    = "'DM Sans', 'Inter', ui-sans-serif, system-ui, sans-serif";
const FONT_READ    = '"Charter", "Georgia", "Cambria", "Times New Roman", serif';
const FONT_MONO    = "'JetBrains Mono', ui-monospace, monospace";

const EXPO_OUT_CSS = "cubic-bezier(0.16, 1, 0.3, 1)";

// ─────────────────────────────────────────────────────────────────────────────
// Fallback content — rich bodies for the 3 placeholder articles
// ─────────────────────────────────────────────────────────────────────────────
type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "blockquote"; text: string; cite?: string }
  | { type: "ul"; items: string[] }
  | { type: "img"; src: string; caption?: string; alt?: string };

type FallbackPost = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  publishedAt: string;
  readTime: string;
  author: { name: string; role: string };
  cover: string;
  tags: string[];
  body: Block[];
};

const fallbackPosts: FallbackPost[] = [
  {
    slug: "building-brands-that-stand-the-test-of-time",
    title: "Building brands that stand the test of time",
    subtitle:
      "Why strong foundations, thoughtful systems, and clarity of message never go out of style.",
    category: "Design",
    publishedAt: "2025-05-24",
    readTime: "7 min read",
    author: { name: "Gray Solutions", role: "Studio" },
    cover:
      "https://images.unsplash.com/photo-1554034483-04fda0d3507b?w=1600&auto=format&fit=crop&q=80",
    tags: ["Brand", "Design system", "Strategy"],
    body: [
      {
        type: "p",
        text: "Every few years, a new visual trend sweeps through the design world. Bold gradients give way to brutalist grids, then back to ultra-minimalist serifs, then to something neon and post-internet. Brands that chase each wave end up looking dated in eighteen months. Brands that ignore them entirely calcify into irrelevance.",
      },
      {
        type: "p",
        text: "The brands that genuinely last share three quiet, unglamorous traits: a strong foundation, a thoughtful system, and clarity of message. These aren't aesthetic choices — they're operational decisions about how a brand will continue to make sense as the company evolves, the audience matures, and the market shifts.",
      },
      { type: "h2", text: "Foundations beat aesthetics" },
      {
        type: "p",
        text: "A logo, a color palette, and a typeface are not a brand. They're outputs. What makes a brand legible across years is the foundation beneath them — a clear sense of who the brand is for, what it stands for, and how it talks. Without those, even the most beautifully crafted identity will drift.",
      },
      {
        type: "p",
        text: "Spend the first month not designing anything. Define the audience precisely. Write the brand's point of view in plain language. Decide what the brand will never do. The decisions you make in this phase will save you from re-doing the visual work in year two.",
      },
      { type: "h2", text: "Build a system, not a snapshot" },
      {
        type: "p",
        text: "A logo is a snapshot of a brand at a moment in time. A system is the rule that generates the logo, the social grid, the deck template, the product UI, and the office signage — all consistently, even when you're not in the room.",
      },
      {
        type: "p",
        text: "Systems include the obvious things — type scale, spacing rhythm, color tokens — but the most useful systems also encode less obvious decisions:",
      },
      {
        type: "ul",
        items: [
          "How does the wordmark behave at 12 pixels vs. 12 feet?",
          "What's the tone of an error message vs. a success message?",
          "When do we lead with the icon, and when with the wordmark?",
          "What happens to the brand when it shows up inside someone else's app?",
        ],
      },
      {
        type: "p",
        text: "Document these. A system that lives in one designer's head dies the moment they leave the company.",
      },
      {
        type: "blockquote",
        text: "Strong brands don't survive trends because they're trendy. They survive because the foundation underneath is sturdy enough to absorb any visual treatment.",
      },
      { type: "h2", text: "Clarity is the last word" },
      {
        type: "p",
        text: "Most rebrands fail not because the new design is bad, but because the brand was unclear about what it was trying to say in the first place. A precise message — even a plain one — outperforms a cleverly designed identity that's saying nothing.",
      },
      {
        type: "p",
        text: "Before you ship anything visual, write the single sentence the brand needs the audience to understand. If you can't write it, no amount of visual polish will fix the underlying ambiguity. If you can, every visual decision afterwards becomes easier.",
      },
      {
        type: "p",
        text: "Foundations, systems, clarity. That's it. Get those right and the visuals can change every five years without the brand ever feeling shaky.",
      },
    ],
  },
  {
    slug: "the-real-impact-of-ai-in-modern-workflows",
    title: "The real impact of AI in modern workflows",
    subtitle:
      "AI isn't about replacing people. It's about removing friction and creating more room for what matters.",
    category: "Technology",
    publishedAt: "2025-05-20",
    readTime: "8 min read",
    author: { name: "Gray Solutions", role: "Studio" },
    cover:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1600&auto=format&fit=crop&q=80",
    tags: ["AI", "Workflow", "Automation"],
    body: [
      {
        type: "p",
        text: "The conversation about AI keeps getting stuck at the wrong question. \"Will it replace my job?\" is the wrong frame. The right question is: \"Which parts of my work shouldn't be done by a human in the first place?\"",
      },
      {
        type: "p",
        text: "We've been deploying AI into client workflows for a couple of years now — not the dramatic chatbot-everywhere version, the quiet useful version. The patterns are consistent: AI works best when it removes friction from the boring, predictable parts of a process so people can spend more time on the parts that actually need them.",
      },
      { type: "h2", text: "Where AI quietly wins" },
      {
        type: "p",
        text: "The work AI does well is the work humans hate doing. Categorizing inbound tickets. Drafting first versions of routine emails. Summarizing meeting transcripts. Reading thousands of customer support conversations to surface the three things that actually need a product change. None of this is glamorous. All of it eats time.",
      },
      {
        type: "p",
        text: "A lead-routing agent that triages new inquiries before they hit a human salesperson can recover hours of weekly capacity. A drafting assistant that produces a first-pass invoice or proposal lets the human focus on negotiation, not formatting. These aren't science fiction outcomes. They're the kind of improvements you measure in minutes per task, applied across a team, across a year.",
      },
      { type: "h2", text: "Where AI quietly loses" },
      {
        type: "p",
        text: "AI loses where judgment matters. It loses where trust is being built between two people. It loses where the cost of being subtly wrong is high — legal review, executive comms, anything safety-related, anything that can't be undone.",
      },
      {
        type: "p",
        text: "The companies that get the most out of AI are the ones that draw a sharp line between those two zones. Automate the friction. Keep humans where judgment lives.",
      },
      {
        type: "blockquote",
        text: "AI doesn't remove jobs. It removes the parts of jobs no one wanted to do anyway — and exposes whether the rest of the role is worth keeping.",
      },
      { type: "h2", text: "Three rules for adoption" },
      { type: "h3", text: "1. Start with one workflow, not a platform" },
      {
        type: "p",
        text: "Don't roll out \"AI strategy.\" Pick one team, one painful workflow, and one measurable outcome. Ship that. Then go find the next one. Companies that try to be \"AI-native\" overnight usually end up with a thousand half-finished pilots.",
      },
      { type: "h3", text: "2. Treat AI like a junior teammate" },
      {
        type: "p",
        text: "Useful, fast, occasionally confidently wrong. You wouldn't let a new hire send legal correspondence without review on day one. Same rule applies. Every AI output needs a human checkpoint until the failure modes are well-understood.",
      },
      { type: "h3", text: "3. Measure time saved, not enthusiasm" },
      {
        type: "p",
        text: "It's easy to feel productive with AI tools and very hard to actually be productive. The teams that win measure the time delta on specific tasks, not the number of features they're using. If the AI workflow doesn't beat the manual one in measurable hours, kill it.",
      },
      {
        type: "p",
        text: "Done well, AI doesn't reduce headcount. It reduces fatigue. Same people, less drudgery, more attention left over for the work that actually needs them.",
      },
    ],
  },
  {
    slug: "content-strategies-that-drive-compounding-growth",
    title: "Content strategies that drive compounding growth",
    subtitle:
      "A practical look at how consistent, valuable content builds momentum that lasts.",
    category: "Growth",
    publishedAt: "2025-05-16",
    readTime: "9 min read",
    author: { name: "Gray Solutions", role: "Studio" },
    cover:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&auto=format&fit=crop&q=80",
    tags: ["Content", "Growth", "Marketing"],
    body: [
      {
        type: "p",
        text: "Most content strategies fail in the same way: they treat content as a tactic instead of a system. A flurry of posts. A burst of LinkedIn videos. A blog that gets updated for two months and then dies. The traffic graph looks like an EKG — peaks during the effort, flatlines the moment attention shifts.",
      },
      {
        type: "p",
        text: "Compounding growth comes from a different model. Each piece of content is a small asset that keeps working after it ships. Some get a flood of attention on launch day, but the more interesting ones quietly accumulate inbound — search traffic, shares, citations — for years.",
      },
      { type: "h2", text: "Compounding, not campaigns" },
      {
        type: "p",
        text: "Campaign-mode content is sprint marketing: pick a quarter, push hard, get a spike, recover. It works for product launches and seasonal moments. It does not build a moat.",
      },
      {
        type: "p",
        text: "Compounding-mode content treats every published piece as a permanent asset. The publishing cadence matters less than the durability of each piece. One article that ranks for a category-defining query for three years will outperform thirty articles that disappeared in a week.",
      },
      { type: "h2", text: "What compounds" },
      {
        type: "p",
        text: "After looking at the data on a few hundred pieces, the content that keeps earning attention shares a few traits:",
      },
      {
        type: "ul",
        items: [
          "It answers a question someone is actively searching for, not a question you wished they were asking.",
          "It takes a clear position, even an unpopular one. Hedged content gets skipped.",
          "It includes specifics — numbers, screenshots, real workflows, not generalities.",
          "It's structured to be skimmable: useful even if the reader only spends ninety seconds.",
          "It earns inbound links because someone else, somewhere, wants to point at it as evidence.",
        ],
      },
      {
        type: "p",
        text: "Notice what's missing from that list: virality. Going viral is a coin flip. Compounding is a system you can build.",
      },
      { type: "h2", text: "A practical cadence" },
      {
        type: "p",
        text: "If you're starting from zero, here's a working cadence that has held up across clients:",
      },
      { type: "h3", text: "Weekly: one piece of structured social content" },
      {
        type: "p",
        text: "One LinkedIn post, one threaded teardown, or one carousel — something that pushes a small, specific point of view. Weekly is the right cadence: frequent enough to compound, slow enough to be considered.",
      },
      { type: "h3", text: "Monthly: one durable long-form" },
      {
        type: "p",
        text: "A serious article. Two thousand words minimum. Original perspective. Real screenshots and data. This is the piece that earns search traffic and inbound links over the next two years. Don't compromise on these.",
      },
      { type: "h3", text: "Quarterly: one resource or playbook" },
      {
        type: "p",
        text: "A genuinely useful artifact — a template, a benchmark study, a structured framework. These tend to be the most-shared things you ever publish, and they sit at the top of organic search for the relevant queries for a long, long time.",
      },
      {
        type: "blockquote",
        text: "The audience doesn't reward volume. They reward whichever piece showed up exactly when they needed it. Build for the long-tail moment, not the launch day spike.",
      },
      { type: "h2", text: "Patience is the unfair advantage" },
      {
        type: "p",
        text: "Most teams quit content strategy in month nine. The compounding curve looks flat for the first six to nine months, then bends sharply upward as the back catalog starts earning compounded reach. The teams that quit in month six never see the bend. The teams that keep shipping look like overnight successes a year later.",
      },
      {
        type: "p",
        text: "Show up, be specific, take positions, and let the back catalog do the heavy lifting. That's the strategy.",
      },
    ],
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

function readTimeFromBody(blocks: Block[]): string {
  const text = blocks
    .map((b) => {
      if ("text" in b) return b.text;
      if (b.type === "ul") return b.items.join(" ");
      return "";
    })
    .join(" ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} min read`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Block renderer for fallback content (Medium-style typography)
// ─────────────────────────────────────────────────────────────────────────────
function renderBlock(block: Block, idx: number) {
  switch (block.type) {
    case "p":
      return (
        <p
          key={idx}
          className="article-p"
          style={{
            fontFamily: FONT_READ,
            color: TEXT_BODY,
            fontSize: "clamp(18px, 1.3vw, 20px)",
            lineHeight: 1.72,
            margin: "0 0 28px",
            letterSpacing: "-0.003em",
          }}
        >
          {block.text}
        </p>
      );
    case "h2":
      return (
        <h2
          key={idx}
          className="article-h2"
          style={{
            fontFamily: FONT_DISPLAY,
            color: TEXT_PRIMARY,
            fontSize: "clamp(26px, 2.4vw, 32px)",
            lineHeight: 1.2,
            margin: "56px 0 20px",
            letterSpacing: "-0.022em",
            fontWeight: 700,
          }}
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          key={idx}
          style={{
            fontFamily: FONT_DISPLAY,
            color: TEXT_PRIMARY,
            fontSize: "clamp(20px, 1.6vw, 22px)",
            lineHeight: 1.3,
            margin: "40px 0 14px",
            letterSpacing: "-0.015em",
            fontWeight: 600,
          }}
        >
          {block.text}
        </h3>
      );
    case "blockquote":
      return (
        <blockquote
          key={idx}
          style={{
            margin: "44px 0",
            paddingLeft: "clamp(20px, 2vw, 28px)",
            borderLeft: `3px solid ${ACCENT_BLUE}`,
            fontFamily: FONT_READ,
            fontStyle: "italic",
            color: TEXT_PRIMARY,
            fontSize: "clamp(20px, 1.6vw, 24px)",
            lineHeight: 1.5,
            letterSpacing: "-0.008em",
          }}
        >
          {block.text}
          {block.cite && (
            <cite
              className="block mt-3 not-italic"
              style={{ color: TEXT_TERTIARY, fontFamily: FONT_BODY, fontSize: 14 }}
            >
              — {block.cite}
            </cite>
          )}
        </blockquote>
      );
    case "ul":
      return (
        <ul
          key={idx}
          style={{
            margin: "0 0 28px",
            paddingLeft: 24,
            color: TEXT_BODY,
            fontFamily: FONT_READ,
            fontSize: "clamp(18px, 1.3vw, 20px)",
            lineHeight: 1.7,
            letterSpacing: "-0.003em",
          }}
        >
          {block.items.map((item, i) => (
            <li key={i} style={{ marginBottom: 12, listStyleType: "disc" }}>
              {item}
            </li>
          ))}
        </ul>
      );
    case "img":
      return (
        <figure key={idx} style={{ margin: "44px 0" }}>
          <img
            src={block.src}
            alt={block.alt || ""}
            style={{
              width: "100%",
              borderRadius: 12,
              border: `1px solid ${BORDER_SOFT}`,
              display: "block",
            }}
            loading="lazy"
            decoding="async"
          />
          {block.caption && (
            <figcaption
              style={{
                marginTop: 12,
                textAlign: "center",
                color: TEXT_TERTIARY,
                fontFamily: FONT_BODY,
                fontSize: 13,
                fontStyle: "italic",
              }}
            >
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Author + meta block
// ─────────────────────────────────────────────────────────────────────────────
function AuthorMeta({
  name,
  role,
  date,
  readTime,
}: {
  name: string;
  role?: string;
  date: string;
  readTime: string;
}) {
  // Generate initials for avatar
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-center gap-3">
      {/* Avatar */}
      <div
        className="flex items-center justify-center shrink-0"
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #2563EB 0%, #8B5CF6 100%)",
          color: "#FFFFFF",
          fontFamily: FONT_DISPLAY,
          fontWeight: 700,
          fontSize: 14,
          letterSpacing: "-0.01em",
        }}
        aria-hidden="true"
      >
        {initials}
      </div>
      <div className="flex flex-col">
        <span
          className="text-[14px] font-semibold"
          style={{ color: TEXT_PRIMARY, fontFamily: FONT_BODY }}
        >
          {name}
        </span>
        <span
          className="text-[12px] inline-flex items-center gap-2"
          style={{ color: TEXT_TERTIARY, fontFamily: FONT_BODY }}
        >
          {role && <span>{role}</span>}
          {role && <span style={{ color: BORDER_SOFT }}>·</span>}
          <span className="inline-flex items-center gap-1">
            <Calendar size={11} strokeWidth={1.8} />
            {date}
          </span>
          <span style={{ color: BORDER_SOFT }}>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock size={11} strokeWidth={1.8} />
            {readTime}
          </span>
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Share / actions row
// ─────────────────────────────────────────────────────────────────────────────
function ShareRow({ title, slug }: { title: string; slug: string }) {
  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
  };
  const url = typeof window !== "undefined" ? window.location.href : `https://graysolutions.in/blogs/${slug}`;
  const twIntent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const liIntent = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  const btnStyle: React.CSSProperties = {
    width: 40,
    height: 40,
    borderRadius: 999,
    border: `1px solid ${BORDER_SOFT}`,
    color: TEXT_MUTED,
    backgroundColor: SURFACE,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div className="flex items-center gap-2">
      <span
        className="text-[12px] uppercase tracking-[0.18em] mr-1"
        style={{ color: TEXT_TERTIARY, fontFamily: FONT_MONO }}
      >
        Share
      </span>
      <a
        href={twIntent}
        target="_blank"
        rel="noopener noreferrer"
        className="share-btn transition-colors"
        style={btnStyle}
        aria-label="Share on Twitter"
      >
        <Twitter size={15} strokeWidth={1.6} />
      </a>
      <a
        href={liIntent}
        target="_blank"
        rel="noopener noreferrer"
        className="share-btn transition-colors"
        style={btnStyle}
        aria-label="Share on LinkedIn"
      >
        <Linkedin size={15} strokeWidth={1.6} />
      </a>
      <button
        type="button"
        onClick={handleCopy}
        className="share-btn transition-colors"
        style={btnStyle}
        aria-label="Copy link"
      >
        <LinkIcon size={15} strokeWidth={1.6} />
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Related articles
// ─────────────────────────────────────────────────────────────────────────────
function Related({ currentSlug }: { currentSlug: string }) {
  const others = fallbackPosts.filter((p) => p.slug !== currentSlug).slice(0, 2);
  if (others.length === 0) return null;
  return (
    <section
      className="w-full"
      style={{ backgroundColor: BG_CANVAS, borderTop: `1px solid ${BORDER_FAINT}` }}
    >
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12 py-16 md:py-24">
        <div className="flex items-end justify-between mb-8 md:mb-10">
          <h2
            className="font-bold tracking-[-0.02em]"
            style={{
              fontFamily: FONT_DISPLAY,
              color: TEXT_PRIMARY,
              fontSize: "clamp(22px, 2.2vw, 32px)",
              lineHeight: 1.15,
            }}
          >
            Keep reading
          </h2>
          <Link
            href="/blogs"
            className="text-[14px] font-medium inline-flex items-center gap-1.5 cursor-pointer"
            style={{ color: ACCENT_BLUE, fontFamily: FONT_BODY }}
          >
            All articles
            <ArrowRight size={14} strokeWidth={1.8} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {others.map((post) => (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}`}
              className="related-card group block cursor-pointer"
            >
              <article
                className="flex flex-col overflow-hidden h-full"
                style={{
                  backgroundColor: SURFACE,
                  border: `1px solid ${BORDER_SOFT}`,
                  borderRadius: 18,
                  boxShadow: "0 1px 2px rgba(13,17,23,0.03), 0 6px 24px rgba(13,17,23,0.04)",
                }}
              >
                <div
                  className="w-full overflow-hidden"
                  style={{ aspectRatio: "16 / 9", backgroundColor: BG_CANVAS }}
                >
                  <div
                    className="w-full h-full transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
                    style={{
                      backgroundImage: `url(${post.cover})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    aria-hidden="true"
                  />
                </div>
                <div className="flex flex-col flex-1 p-5 lg:p-6">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span
                      className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] uppercase tracking-[0.18em]"
                      style={{
                        color: ACCENT_BLUE,
                        fontFamily: FONT_MONO,
                        backgroundColor: ACCENT_BLUE_SOFT,
                        border: `1px solid rgba(37,99,235,0.18)`,
                      }}
                    >
                      {post.category}
                    </span>
                    <span
                      className="text-[12px]"
                      style={{ color: TEXT_TERTIARY, fontFamily: FONT_MONO }}
                    >
                      {formatDate(post.publishedAt)}
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
                  <p
                    className="flex-1"
                    style={{ color: TEXT_MUTED, fontFamily: FONT_BODY, fontSize: 14, lineHeight: 1.55 }}
                  >
                    {post.subtitle}
                  </p>
                  <span
                    className="mt-4 inline-flex items-center gap-2 text-[13px] font-medium"
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
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Loading skeleton
// ─────────────────────────────────────────────────────────────────────────────
function LoadingSkeleton() {
  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: BG_PAGE }}>
      <SiteNav theme="light" />
      <main className="pt-32 pb-24">
        <div className="mx-auto max-w-[720px] px-5 md:px-8 space-y-4">
          <div className="h-5 w-24 rounded-md skeleton-bg" />
          <div className="h-12 w-full rounded-md skeleton-bg" />
          <div className="h-12 w-3/4 rounded-md skeleton-bg" />
          <div className="h-6 w-5/6 rounded-md skeleton-bg" />
          <div className="h-10 w-1/3 rounded-md skeleton-bg mt-6" />
          <div className="aspect-[16/9] w-full rounded-2xl skeleton-bg mt-6" />
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="space-y-3 mt-6">
              <div className="h-4 w-full rounded-md skeleton-bg" />
              <div className="h-4 w-11/12 rounded-md skeleton-bg" />
              <div className="h-4 w-4/5 rounded-md skeleton-bg" />
            </div>
          ))}
        </div>
      </main>
      <style>{`
        @keyframes skeleton-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .skeleton-bg {
          background: linear-gradient(90deg, #F1F3F6 25%, #E5E7EB 50%, #F1F3F6 75%);
          background-size: 200% 100%;
          animation: skeleton-shimmer 1.6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────
export default function BlogDetail() {
  const [, params] = useRoute("/blogs/:slug");
  const [dbPost, setDbPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Find fallback for this slug (works synchronously)
  const fallback = useMemo(
    () => fallbackPosts.find((p) => p.slug === params?.slug) || null,
    [params?.slug]
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!params?.slug) {
        setIsLoading(false);
        return;
      }
      try {
        const data = await getPublishedPost(params.slug);
        if (cancelled) return;
        setDbPost(data || null);
      } catch (err) {
        console.error("Error fetching blog post:", err);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [params?.slug]);

  // Scroll to top on slug change
  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, [params?.slug]);

  if (isLoading && !fallback) {
    return <LoadingSkeleton />;
  }

  // Not found — no DB post AND no fallback match
  if (!dbPost && !fallback) {
    return (
      <div
        className="min-h-screen w-full flex flex-col"
        style={{ backgroundColor: BG_PAGE, color: TEXT_PRIMARY }}
      >
        <SiteNav theme="light" />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="text-center max-w-[480px]">
            <h1
              className="font-bold mb-3"
              style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(28px, 4vw, 40px)", letterSpacing: "-0.02em" }}
            >
              Story not found.
            </h1>
            <p style={{ color: TEXT_MUTED, fontFamily: FONT_BODY, fontSize: 16, marginBottom: 24 }}>
              The article you're looking for doesn't exist or may have been moved.
            </p>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[14px] font-medium transition-colors cursor-pointer"
              style={{
                fontFamily: FONT_BODY,
                color: "#FFFFFF",
                backgroundColor: TEXT_PRIMARY,
              }}
            >
              <ArrowLeft size={14} />
              Back to articles
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Prefer DB post over the static fallback if both exist
  const usingDb = !!dbPost;
  const title = usingDb ? dbPost.title : fallback!.title;
  const subtitle = usingDb ? dbPost.excerpt || "" : fallback!.subtitle;
  const category = usingDb ? dbPost.category || "Article" : fallback!.category;
  const date = usingDb ? formatDate(dbPost.publishedAt || dbPost.createdAt) : formatDate(fallback!.publishedAt);
  const readTime = usingDb
    ? dbPost.readTime || "5 min read"
    : fallback!.readTime || readTimeFromBody(fallback!.body);
  const cover = usingDb ? dbPost.coverImage || "" : fallback!.cover;
  const author = usingDb
    ? { name: dbPost.author || "Gray Solutions", role: "Studio" }
    : fallback!.author;
  const tags = usingDb ? [dbPost.category].filter(Boolean) : fallback!.tags;
  const currentSlug = params?.slug || "";

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
        {/* ── Title block ─────────────────────────────────────────── */}
        <section className="w-full" style={{ backgroundColor: BG_PAGE, paddingTop: 100 }}>
          <div className="mx-auto max-w-[720px] px-5 md:px-8 pt-8 md:pt-12 pb-8 md:pb-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href="/blogs"
                className="inline-flex items-center gap-1.5 text-[13px] font-medium mb-8 transition-colors cursor-pointer"
                style={{ color: TEXT_MUTED, fontFamily: FONT_BODY }}
              >
                <ArrowLeft size={14} strokeWidth={1.8} />
                <span>All articles</span>
              </Link>

              <span
                className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] uppercase tracking-[0.18em] mb-5"
                style={{
                  color: ACCENT_BLUE,
                  fontFamily: FONT_MONO,
                  backgroundColor: ACCENT_BLUE_SOFT,
                  border: `1px solid rgba(37,99,235,0.18)`,
                }}
              >
                {category}
              </span>

              <h1
                className="font-bold tracking-[-0.025em]"
                style={{
                  fontFamily: FONT_DISPLAY,
                  color: TEXT_PRIMARY,
                  fontSize: "clamp(32px, 4.4vw, 52px)",
                  lineHeight: 1.1,
                  fontWeight: 800,
                  marginBottom: 16,
                }}
              >
                {title}
              </h1>

              {subtitle && (
                <p
                  style={{
                    color: TEXT_MUTED,
                    fontFamily: FONT_BODY,
                    fontSize: "clamp(17px, 1.4vw, 21px)",
                    lineHeight: 1.45,
                    marginBottom: 28,
                  }}
                >
                  {subtitle}
                </p>
              )}

              {/* Author + share row */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4" style={{ borderTop: `1px solid ${BORDER_FAINT}` }}>
                <AuthorMeta name={author.name} role={author.role} date={date} readTime={readTime} />
                <ShareRow title={title} slug={currentSlug} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Cover image — wider than text column, gives Medium-magazine feel ─── */}
        {cover && (
          <motion.section
            className="w-full"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mx-auto max-w-[1000px] px-5 md:px-8">
              <div
                className="overflow-hidden"
                style={{
                  aspectRatio: "16 / 9",
                  borderRadius: 16,
                  backgroundColor: BG_CANVAS,
                  border: `1px solid ${BORDER_SOFT}`,
                }}
              >
                <img
                  src={cover}
                  alt={title}
                  style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </motion.section>
        )}

        {/* ── Article body ────────────────────────────────────────── */}
        <article className="w-full">
          <div className="mx-auto max-w-[720px] px-5 md:px-8 pt-12 md:pt-16 pb-16 md:pb-20">
            {usingDb && dbPost.body ? (
              <div
                className="article-body"
                style={{
                  fontFamily: FONT_READ,
                  color: TEXT_BODY,
                  fontSize: "clamp(18px, 1.3vw, 20px)",
                  lineHeight: 1.72,
                  letterSpacing: "-0.003em",
                }}
                dangerouslySetInnerHTML={{ __html: dbPost.body }}
              />
            ) : fallback ? (
              <div>{fallback.body.map((block, i) => renderBlock(block, i))}</div>
            ) : (
              <p style={{ color: TEXT_TERTIARY, fontStyle: "italic" }}>This post has no content yet.</p>
            )}

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div
                className="flex flex-wrap items-center gap-2 mt-12 pt-8"
                style={{ borderTop: `1px solid ${BORDER_FAINT}` }}
              >
                {tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-[12px]"
                    style={{
                      color: TEXT_MUTED,
                      fontFamily: FONT_BODY,
                      backgroundColor: BG_CANVAS,
                      border: `1px solid ${BORDER_SOFT}`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Author footer card */}
            <div
              className="mt-10 p-6 lg:p-7 flex items-center gap-5"
              style={{
                backgroundColor: BG_CANVAS,
                border: `1px solid ${BORDER_FAINT}`,
                borderRadius: 16,
              }}
            >
              <div
                className="flex items-center justify-center shrink-0"
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #2563EB 0%, #8B5CF6 100%)",
                  color: "#FFFFFF",
                  fontFamily: FONT_DISPLAY,
                  fontWeight: 700,
                  fontSize: 18,
                  letterSpacing: "-0.01em",
                }}
                aria-hidden="true"
              >
                {author.name
                  .split(" ")
                  .map((w: string) => w[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </div>
              <div className="flex-1">
                <p
                  className="font-semibold mb-0.5"
                  style={{ color: TEXT_PRIMARY, fontFamily: FONT_BODY, fontSize: 15 }}
                >
                  Written by {author.name}
                </p>
                <p
                  style={{
                    color: TEXT_MUTED,
                    fontFamily: FONT_BODY,
                    fontSize: 13,
                    lineHeight: 1.5,
                  }}
                >
                  A studio building brand, digital, product, and AI — end to end. Based in Coimbatore, working with teams across India and the UAE.
                </p>
              </div>
              <Link
                href="/contact"
                className="hidden md:inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-medium transition-colors cursor-pointer whitespace-nowrap"
                style={{
                  fontFamily: FONT_BODY,
                  color: "#FFFFFF",
                  backgroundColor: TEXT_PRIMARY,
                }}
              >
                Get in touch
                <ArrowRight size={13} strokeWidth={1.8} />
              </Link>
            </div>
          </div>
        </article>

        {/* ── Keep reading ───────────────────────────────────────── */}
        <Related currentSlug={currentSlug} />
      </main>

      <Footer />

      <style>{`
        .share-btn:hover {
          border-color: rgba(37, 99, 235, 0.4) !important;
          color: ${ACCENT_BLUE} !important;
          background-color: ${ACCENT_BLUE_SOFT} !important;
        }
        .related-card article {
          transition: border-color 300ms ${EXPO_OUT_CSS}, box-shadow 300ms ${EXPO_OUT_CSS}, transform 300ms ${EXPO_OUT_CSS};
        }
        .related-card:hover article {
          border-color: rgba(37, 99, 235, 0.35) !important;
          box-shadow: 0 1px 2px rgba(13,17,23,0.04), 0 18px 48px rgba(13,17,23,0.08) !important;
          transform: translateY(-2px);
        }
        /* PortableText typography for Sanity content */
        .article-body p {
          margin: 0 0 28px;
        }
        .article-body h2 {
          font-family: ${FONT_DISPLAY};
          color: ${TEXT_PRIMARY};
          font-size: clamp(26px, 2.4vw, 32px);
          line-height: 1.2;
          margin: 56px 0 20px;
          letter-spacing: -0.022em;
          font-weight: 700;
        }
        .article-body h3 {
          font-family: ${FONT_DISPLAY};
          color: ${TEXT_PRIMARY};
          font-size: clamp(20px, 1.6vw, 22px);
          line-height: 1.3;
          margin: 40px 0 14px;
          letter-spacing: -0.015em;
          font-weight: 600;
        }
        .article-body blockquote {
          margin: 44px 0;
          padding-left: clamp(20px, 2vw, 28px);
          border-left: 3px solid ${ACCENT_BLUE};
          font-family: ${FONT_READ};
          font-style: italic;
          color: ${TEXT_PRIMARY};
          font-size: clamp(20px, 1.6vw, 24px);
          line-height: 1.5;
          letter-spacing: -0.008em;
        }
        .article-body a {
          color: ${ACCENT_BLUE};
          text-decoration: underline;
          text-decoration-thickness: 1px;
          text-underline-offset: 3px;
        }
        .article-body ul, .article-body ol {
          margin: 0 0 28px;
          padding-left: 24px;
        }
        .article-body li { margin-bottom: 12px; }
        .article-body img {
          width: 100%;
          border-radius: 12px;
          margin: 44px 0;
          border: 1px solid ${BORDER_SOFT};
        }
        @keyframes skeleton-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .skeleton-bg {
          background: linear-gradient(90deg, #F1F3F6 25%, #E5E7EB 50%, #F1F3F6 75%);
          background-size: 200% 100%;
          animation: skeleton-shimmer 1.6s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .skeleton-bg { animation: none; }
          .related-card:hover article { transform: none; }
        }
      `}</style>
    </div>
  );
}
