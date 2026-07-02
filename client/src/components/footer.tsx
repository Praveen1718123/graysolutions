import React, { useState } from "react";
import { Link } from "wouter";
import {
  Linkedin,
  Twitter,
  Instagram,
  Dribbble,
  MapPin,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";

// Design tokens (self-contained — footer used on every page)
const BG = "#05070D";
const TEXT_PRIMARY = "#F1F3F8";
const TEXT_SECONDARY = "#8B92A3";
const TEXT_MUTED = "#5A6273";
const BORDER = "rgba(255,255,255,0.06)";
const ACCENT_BLUE = "#3B82F6";
const FONT_BODY = "'DM Sans', 'Inter', ui-sans-serif, system-ui, sans-serif";
const FONT_DISPLAY = "'Plus Jakarta Sans', 'Inter', ui-sans-serif, system-ui, sans-serif";
const FONT_MONO = "'JetBrains Mono', ui-monospace, monospace";

type ColumnLink = {
  label: string;
  href: string;
  external?: boolean;
};

const servicesLinks: ColumnLink[] = [
  { label: "Brand & Identity",  href: "/services/brand-content"      },
  { label: "Digital Marketing", href: "/services/growth-performance" },
  { label: "Product & Software", href: "/services/product-web"       },
  { label: "AI & Automation",   href: "/services/automations-ai"     },
];

const workLinks: ColumnLink[] = [
  { label: "All Projects",       href: "/work" },
  { label: "Brand & Identity",   href: "/work?filter=brand" },
  { label: "Digital Marketing",  href: "/work?filter=digital" },
  { label: "Product & Software", href: "/work?filter=product" },
  { label: "AI & Automation",    href: "/work?filter=ai" },
];

const companyLinks: ColumnLink[] = [
  { label: "About Us",     href: "/about" },
  { label: "Our Process",  href: "/about#process" },
  { label: "Case Studies", href: "/work" },
  { label: "Careers",      href: "#" },
  { label: "Contact Us",   href: "/contact" },
];

const socialLinks = [
  { label: "LinkedIn",  href: "https://linkedin.com",  Icon: Linkedin  },
  { label: "Twitter",   href: "https://twitter.com",   Icon: Twitter   },
  { label: "Instagram", href: "https://instagram.com", Icon: Instagram },
  { label: "Dribbble",  href: "https://dribbble.com",  Icon: Dribbble  },
];

interface FooterProps {
  hideNewsletter?: boolean;
}

function ColumnLinkRow({ href, label }: ColumnLink) {
  return (
    <li>
      <a
        href={href}
        className="footer-col-link group inline-flex items-center gap-1.5 text-[14px] transition-colors"
        style={{ color: TEXT_SECONDARY, fontFamily: FONT_BODY }}
      >
        <span>{label}</span>
        <ArrowUpRight
          size={12}
          strokeWidth={1.6}
          className="transition-all opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </a>
    </li>
  );
}

export default function Footer({ hideNewsletter = false }: FooterProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "ok" : "error");
      if (res.ok) setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <footer
      className="w-full"
      style={{ backgroundColor: BG, color: TEXT_PRIMARY, fontFamily: FONT_BODY }}
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-12 pt-14 md:pt-20 pb-8">
        {/* Top divider */}
        <div className="h-px w-full" style={{ backgroundColor: BORDER }} />

        {/* Main grid */}
        <div
          className={`mt-12 md:mt-16 grid gap-10 lg:gap-12 ${
            hideNewsletter
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.25fr_0.9fr_0.9fr_0.9fr_1.4fr]"
          }`}
        >
          {/* Column 1 — Tagline + location + socials */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="inline-block cursor-pointer" aria-label="Gray Solutions homepage">
              <img
                src="/assets/logo-140.webp"
                srcSet="/assets/logo-140.webp 1x, /assets/logo-280.webp 2x"
                alt="Gray Solutions"
                width={100}
                height={36}
                style={{
                  display: "block",
                  filter:
                    "brightness(0) invert(1) drop-shadow(0 0 12px rgba(59,130,246,0.15))",
                }}
              />
            </Link>
            <p
              className="text-[14px]"
              style={{ color: TEXT_SECONDARY, lineHeight: 1.6, maxWidth: 320 }}
            >
              A creative studio building brands, digital experiences, custom software, and AI solutions for ambitious teams.
            </p>

            {/* Location pin */}
            <div className="pt-3" style={{ borderTop: `1px solid ${BORDER}` }}>
              <a
                href="https://www.google.com/maps?q=Coimbatore,+India"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full transition-colors hover:bg-white/[0.04]"
                style={{ color: TEXT_MUTED, border: `1px solid ${BORDER}` }}
                aria-label="Coimbatore, India"
              >
                <MapPin size={16} strokeWidth={1.6} />
              </a>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="footer-social inline-flex items-center justify-center w-10 h-10 rounded-full transition-colors"
                  style={{ color: TEXT_MUTED, border: `1px solid ${BORDER}` }}
                >
                  <Icon size={15} strokeWidth={1.6} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Services */}
          <div className="flex flex-col gap-5">
            <p
              className="text-[11px] uppercase tracking-[0.24em]"
              style={{ color: TEXT_MUTED, fontFamily: FONT_MONO }}
            >
              Services
            </p>
            <ul className="flex flex-col gap-3">
              {servicesLinks.map((l) => (
                <ColumnLinkRow key={l.label} {...l} />
              ))}
            </ul>
          </div>

          {/* Column 3 — Work */}
          <div className="flex flex-col gap-5">
            <p
              className="text-[11px] uppercase tracking-[0.24em]"
              style={{ color: TEXT_MUTED, fontFamily: FONT_MONO }}
            >
              Work
            </p>
            <ul className="flex flex-col gap-3">
              {workLinks.map((l) => (
                <ColumnLinkRow key={l.label} {...l} />
              ))}
            </ul>
          </div>

          {/* Column 4 — Company */}
          <div className="flex flex-col gap-5">
            <p
              className="text-[11px] uppercase tracking-[0.24em]"
              style={{ color: TEXT_MUTED, fontFamily: FONT_MONO }}
            >
              Company
            </p>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((l) => (
                <ColumnLinkRow key={l.label} {...l} />
              ))}
            </ul>
          </div>

          {/* Column 5 — Newsletter */}
          {!hideNewsletter && (
            <div className="flex flex-col gap-5">
              <p
                className="text-[11px] uppercase tracking-[0.24em]"
                style={{ color: TEXT_MUTED, fontFamily: FONT_MONO }}
              >
                Stay in the loop
              </p>
              <h3
                className="font-bold tracking-[-0.025em]"
                style={{
                  fontFamily: FONT_DISPLAY,
                  color: TEXT_PRIMARY,
                  fontSize: "clamp(20px, 1.8vw, 26px)",
                  lineHeight: 1.15,
                }}
              >
                Insights, straight to your inbox.
              </h3>
              <p
                className="text-[13px]"
                style={{ color: TEXT_SECONDARY, lineHeight: 1.55 }}
              >
                Monthly insights on design, tech, AI, and growth. No spam, just value.
              </p>

              <form onSubmit={onSubmit} className="flex flex-col gap-3">
                <div
                  className="flex items-stretch gap-1 p-1.5 rounded-2xl"
                  style={{
                    backgroundColor: "rgba(11,16,28,0.6)",
                    border: `1px solid ${BORDER}`,
                  }}
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    aria-label="Email address"
                    className="flex-1 bg-transparent px-3 py-2 text-[14px] outline-none"
                    style={{ color: TEXT_PRIMARY, fontFamily: FONT_BODY }}
                  />
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center justify-center px-4 rounded-xl transition-all"
                    style={{
                      color: "#FFFFFF",
                      background: `linear-gradient(180deg, ${ACCENT_BLUE} 0%, #2563EB 100%)`,
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.18), 0 0 16px rgba(59,130,246,0.30)",
                      minWidth: 56,
                      opacity: status === "sending" ? 0.7 : 1,
                    }}
                    aria-label="Subscribe"
                  >
                    <ArrowRight size={16} strokeWidth={2} />
                  </button>
                </div>

                <p
                  className="inline-flex items-center gap-1.5 text-[12px]"
                  style={{ color: TEXT_MUTED }}
                >
                  {status === "ok" ? (
                    <>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#22C55E" }}>
                        <circle cx="6" cy="6" r="5" />
                        <path d="M4 6l1.5 1.5L8 4.5" />
                      </svg>
                      <span>You're in. Talk soon.</span>
                    </>
                  ) : status === "error" ? (
                    <span style={{ color: "#F87171" }}>Couldn't subscribe — try again in a moment.</span>
                  ) : (
                    <>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="6" cy="6" r="5" />
                        <path d="M4 6l1.5 1.5L8 4.5" />
                      </svg>
                      <span>We respect your privacy. Unsubscribe anytime.</span>
                    </>
                  )}
                </p>
              </form>
            </div>
          )}
        </div>

        {/* Bottom row */}
        <div
          className="mt-14 md:mt-20 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[13px]"
          style={{ color: TEXT_MUTED, fontFamily: FONT_BODY, borderTop: `1px solid ${BORDER}` }}
        >
          <span>© {new Date().getFullYear()} Gray Solutions. All rights reserved.</span>
          <div className="flex items-center gap-4 md:gap-6 flex-wrap">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span style={{ color: "rgba(255,255,255,0.15)" }}>•</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <span style={{ color: "rgba(255,255,255,0.15)" }}>•</span>
            <a href="#" className="hover:text-white transition-colors">Cookies Policy</a>
          </div>
          <span style={{ color: TEXT_MUTED, fontStyle: "italic" }}>Made with clarity</span>
        </div>
      </div>

      <style>{`
        .footer-col-link:hover { color: ${TEXT_PRIMARY}; }
        .footer-social:hover {
          color: ${TEXT_PRIMARY};
          border-color: rgba(59,130,246,0.45);
          background-color: rgba(59,130,246,0.05);
        }
      `}</style>
    </footer>
  );
}
