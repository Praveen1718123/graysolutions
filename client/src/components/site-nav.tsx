import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// Self-contained design tokens (kept in-file so the nav works on any page
// without depending on landing.tsx's constants)
// ─────────────────────────────────────────────────────────────────────────────
const TEXT_PRIMARY = "#F1F3F8";
const BORDER_SUBTLE = "rgba(255,255,255,0.05)";
const BG_PRIMARY = "#090B12";
const ACCENT_BLUE = "#3B82F6";
const FONT_BODY = "'DM Sans', 'Inter', ui-sans-serif, system-ui, sans-serif";
const FONT_DISPLAY = "'Plus Jakarta Sans', 'Inter', ui-sans-serif, system-ui, sans-serif";
const FONT_MONO = "'JetBrains Mono', ui-monospace, monospace";
const BLUR_NAV = "24px";
const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─────────────────────────────────────────────────────────────────────────────
// Nav data — cross-page anchors use full URLs so they work from any route
// ─────────────────────────────────────────────────────────────────────────────
type NavItem = {
  label: string;
  href: string;
  external?: boolean;
  dropdown?: { label: string; href: string; description?: string; tag?: string }[];
  dropdownFooter?: { label: string; href: string };
};

const navItems: NavItem[] = [
  { label: "About us", href: "/about", external: true },
  {
    label: "Services",
    href: "/services",
    external: true,
    dropdown: [
      {
        label: "Brand & Identity",
        href: "/services/brand-content",
        description: "Logos, visual systems, brand language",
      },
      {
        label: "Digital Marketing",
        href: "/services/growth-performance",
        description: "Content, social, ads, growth",
      },
      {
        label: "Product & Software",
        href: "/services/product-web",
        description: "Websites, web apps, custom software",
      },
      {
        label: "AI & Automation",
        href: "/services/automations-ai",
        description: "Workflow automation and AI integration",
      },
    ],
    dropdownFooter: { label: "View all services", href: "/services" },
  },
  {
    label: "Products",
    href: "#products",
    dropdown: [
      {
        label: "Transportation Management System",
        href: "/products/transportation-management-system",
        description: "End-to-end logistics OS — operations, driver app, shipper portal, carrier web",
        tag: "Magic Trucks",
      },
      {
        label: "Voice Agent AI",
        href: "/products/voice-agent-ai",
        description: "AI receptionist — picks up every call, qualifies leads, books meetings 24/7",
        tag: "Gray Voice Agent",
      },
      {
        label: "Hyperlocal Quick Commerce",
        href: "/products/quick-commerce",
        description: "10-minute delivery platform for D2C brands — storefront, dark store, dispatch",
        tag: "Coming soon",
      },
    ],
  },
  { label: "Work",     href: "/work", external: true },
  { label: "Blog", href: "/blogs", external: true },
  { label: "Contact",  href: "/contact", external: true },
];

// Logo filter — white on dark theme, untouched (dark wordmark) on light theme
const LOGO_FILTER_DARK =
  "brightness(0) invert(1) drop-shadow(0 0 12px rgba(59,130,246,0.15))";
const LOGO_FILTER_LIGHT = "none";

type Theme = "dark" | "light";

// Per-theme palette so the nav works on both dark and light pages
const themePalette = {
  dark: {
    bgResting: "rgba(9,11,18,0.62)",
    bgScrolled: "rgba(9,11,18,0.80)",
    border: "rgba(255,255,255,0.10)",
    linkResting: "rgba(255,255,255,0.82)",
    linkHover: "#fff",
    iconBtnBorder: "rgba(255,255,255,0.05)",
    iconBtnBg: "rgba(255,255,255,0.04)",
    iconBtnColor: "#F1F3F8",
    ctaColor: "#E6F0FF",
    ctaBorder: "rgba(59,130,246,0.30)",
    ctaBg: "linear-gradient(180deg, rgba(59,130,246,0.06) 0%, rgba(59,130,246,0.02) 100%)",
    ctaHoverBg: "linear-gradient(180deg, rgba(59,130,246,0.14) 0%, rgba(59,130,246,0.06) 100%)",
    ctaHoverBorder: "rgba(59,130,246,0.50)",
    ddBg: "rgba(11, 16, 28, 0.75)",
    ddBorder: "rgba(255,255,255,0.06)",
    ddShadow: "0 24px 60px -20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
    ddLinkColor: "rgba(255,255,255,0.85)",
    ddDescColor: "rgba(255,255,255,0.48)",
    ddHoverBg: "rgba(255, 255, 255, 0.09)",
    ddTagBg: "rgba(59,130,246,0.12)",
    ddTagColor: "#9EC3FF",
    ddFooterBorder: "rgba(255,255,255,0.06)",
    logoFilter: LOGO_FILTER_DARK,
  },
  light: {
    bgResting: "rgba(255,255,255,0.65)",
    bgScrolled: "rgba(255,255,255,0.85)",
    border: "rgba(13,17,23,0.08)",
    linkResting: "rgba(13,17,23,0.70)",
    linkHover: "#0D1117",
    iconBtnBorder: "rgba(13,17,23,0.10)",
    iconBtnBg: "rgba(13,17,23,0.04)",
    iconBtnColor: "#0D1117",
    ctaColor: "#1A2B7F",
    ctaBorder: "rgba(37,99,235,0.35)",
    ctaBg: "linear-gradient(180deg, rgba(37,99,235,0.08) 0%, rgba(37,99,235,0.02) 100%)",
    ctaHoverBg: "linear-gradient(180deg, rgba(37,99,235,0.16) 0%, rgba(37,99,235,0.06) 100%)",
    ctaHoverBorder: "rgba(37,99,235,0.55)",
    ddBg: "rgba(255,255,255,0.92)",
    ddBorder: "rgba(13,17,23,0.08)",
    ddShadow: "0 24px 60px -20px rgba(13,17,23,0.18), inset 0 1px 0 rgba(255,255,255,0.6)",
    ddLinkColor: "#0D1117",
    ddDescColor: "rgba(13,17,23,0.55)",
    ddHoverBg: "rgba(13,17,23,0.06)",
    ddTagBg: "rgba(37,99,235,0.10)",
    ddTagColor: "#2563EB",
    ddFooterBorder: "rgba(13,17,23,0.06)",
    logoFilter: LOGO_FILTER_LIGHT,
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// SiteNav — fixed glass nav used on every page
// ─────────────────────────────────────────────────────────────────────────────
export default function SiteNav({ theme = "dark" }: { theme?: Theme } = {}) {
  const palette = themePalette[theme];
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 pt-2.5 md:pt-4 px-3 md:px-5">
        {/* Floating glass pill — wraps the whole nav (reference chrome) */}
        <div
          className="mx-auto max-w-[1200px] px-5 md:px-6 lg:px-8 h-[56px] md:h-[64px] flex items-center justify-between transition-all duration-500"
          style={{
            backgroundColor: scrolled ? palette.bgScrolled : palette.bgResting,
            backdropFilter: `saturate(180%) blur(${BLUR_NAV})`,
            WebkitBackdropFilter: `saturate(180%) blur(${BLUR_NAV})`,
            border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)"}`,
            borderRadius: 18,
            boxShadow:
              theme === "dark"
                ? "inset 0 1px 0 rgba(255,255,255,0.07), 0 16px 44px -18px rgba(0,0,0,0.6)"
                : "inset 0 1px 0 rgba(255,255,255,0.7), 0 16px 44px -20px rgba(15,23,42,0.18)",
          }}
        >
          {/* Logo — color adapts to theme via filter */}
          <Link href="/" className="flex items-center cursor-pointer" aria-label="Gray Solutions homepage">
            <img
              src="/assets/logo-140.webp"
              srcSet="/assets/logo-140.webp 1x, /assets/logo-280.webp 2x"
              alt="Gray Solutions"
              width={86}
              height={30}
              style={{ display: "block", filter: palette.logoFilter }}
            />
          </Link>

          {/* Desktop inline menu */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10" aria-label="Main">
            {navItems.map((item) => {
              if (item.dropdown) {
                // Render the label as a Link if it has a real route (e.g. Services → /services),
                // otherwise as a non-clickable button (e.g. Products which is purely a menu)
                const TriggerLabel = item.external && item.href.startsWith("/") && item.href !== "#products" ? (
                  <Link
                    href={item.href}
                    className="sitenav-link inline-flex items-center gap-1.5 text-[13px] transition-colors py-2 cursor-pointer"
                    style={{ fontFamily: FONT_BODY, color: palette.linkResting, letterSpacing: "-0.005em" }}
                  >
                    <span>{item.label}</span>
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 1l4 4 4-4" />
                    </svg>
                  </Link>
                ) : (
                  <button
                    className="sitenav-link inline-flex items-center gap-1.5 text-[13px] transition-colors py-2"
                    style={{ fontFamily: FONT_BODY, color: palette.linkResting, letterSpacing: "-0.005em" }}
                  >
                    <span>{item.label}</span>
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 1l4 4 4-4" />
                    </svg>
                  </button>
                );

                return (
                  <div key={item.label} className="relative group/dropdown">
                    {TriggerLabel}
                    {/* Dropdown panel — wider, with description + tag chips.
                        Outer wrapper uses top-full + pt-3 (a transparent bridge)
                        so hover stays continuous from the label into the menu. */}
                    <div className="absolute left-0 top-full pt-3 w-[340px] opacity-0 invisible translate-y-1 group-hover/dropdown:opacity-100 group-hover/dropdown:visible group-hover/dropdown:translate-y-0 transition-all duration-300">
                    <div
                      style={{
                        backgroundColor: palette.ddBg,
                        backdropFilter: "saturate(180%) blur(40px)",
                        WebkitBackdropFilter: "saturate(180%) blur(40px)",
                        border: `1px solid ${palette.ddBorder}`,
                        borderRadius: 18,
                        padding: 6,
                        boxShadow: palette.ddShadow,
                      }}
                    >
                      {item.dropdown.map((sub) => (
                        <a
                          key={sub.label}
                          href={sub.href}
                          className="sitenav-dd-link flex items-start gap-3 px-3.5 py-3 rounded-xl transition-colors"
                          style={{ fontFamily: FONT_BODY }}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span
                                className="text-[13px] font-medium"
                                style={{ color: palette.ddLinkColor, letterSpacing: "-0.003em" }}
                              >
                                {sub.label}
                              </span>
                              {sub.tag && (
                                <span
                                  className="text-[10px] uppercase tracking-[0.12em] px-1.5 py-0.5 rounded-md"
                                  style={{
                                    backgroundColor: palette.ddTagBg,
                                    color: palette.ddTagColor,
                                    fontFamily: FONT_MONO,
                                  }}
                                >
                                  {sub.tag}
                                </span>
                              )}
                            </div>
                            {sub.description && (
                              <p
                                className="mt-0.5 text-[12px] leading-snug"
                                style={{ color: palette.ddDescColor }}
                              >
                                {sub.description}
                              </p>
                            )}
                          </div>
                          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ color: palette.ddDescColor, marginTop: 4, flexShrink: 0 }}>
                            <path d="M4 2l4 4-4 4" />
                          </svg>
                        </a>
                      ))}
                      {item.dropdownFooter && (
                        <a
                          href={item.dropdownFooter.href}
                          className="sitenav-dd-link mt-1 flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[12px] font-medium uppercase tracking-[0.12em] transition-colors"
                          style={{
                            fontFamily: FONT_MONO,
                            color: palette.ddTagColor,
                            borderTop: `1px solid ${palette.ddFooterBorder}`,
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0,
                          }}
                        >
                          <span>{item.dropdownFooter.label}</span>
                          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                            <path d="M3 9L9 3M9 3H4M9 3V8" />
                          </svg>
                        </a>
                      )}
                    </div>
                    </div>
                  </div>
                );
              }
              return item.external ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className="sitenav-link text-[13px] transition-colors cursor-pointer"
                  style={{ fontFamily: FONT_BODY, color: palette.linkResting, letterSpacing: "-0.005em" }}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="sitenav-link text-[13px] transition-colors"
                  style={{ fontFamily: FONT_BODY, color: palette.linkResting, letterSpacing: "-0.005em" }}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 md:gap-4">
            <div className="hidden md:block">
              <a
                href="/contact"
                className="sitenav-cta group inline-flex items-center gap-2 px-4 rounded-full text-[13px] font-medium transition-all"
                style={{
                  fontFamily: FONT_BODY,
                  color: palette.ctaColor,
                  border: `1px solid ${palette.ctaBorder}`,
                  background: palette.ctaBg,
                  height: 36,
                  boxShadow:
                    theme === "dark"
                      ? "inset 0 1px 0 rgba(255,255,255,0.04)"
                      : "inset 0 1px 0 rgba(255,255,255,0.6)",
                }}
              >
                <span>Start a project</span>
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <path d="M3 11L11 3M11 3H5M11 3V9" />
                </svg>
              </a>
            </div>
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full transition-colors"
              style={{
                color: palette.iconBtnColor,
                border: `1px solid ${palette.iconBtnBorder}`,
                backgroundColor: palette.iconBtnBg,
              }}
              aria-label="Open menu"
            >
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="1" y1="3" x2="17" y2="3" />
                <line x1="1" y1="11" x2="17" y2="11" />
              </svg>
            </button>
          </div>
        </div>

        <style>{`
          .sitenav-link:hover { color: ${palette.linkHover} !important; }
          .sitenav-dd-link:hover {
            background-color: ${palette.ddHoverBg};
          }
          .sitenav-cta:hover {
            background: ${palette.ctaHoverBg} !important;
            border-color: ${palette.ctaHoverBorder} !important;
          }
        `}</style>
      </header>

      {/* Full-screen menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EXPO_OUT }}
            className="fixed inset-0 z-[100]"
            style={{ backgroundColor: BG_PRIMARY }}
          >
            <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12 h-[60px] md:h-[68px] flex items-center justify-between">
              <img
                src="/assets/logo-140.webp"
                srcSet="/assets/logo-140.webp 1x, /assets/logo-280.webp 2x"
                alt="Gray Solutions"
                width={86}
                height={30}
                style={{ display: "block", filter: LOGO_FILTER_DARK }}
              />
              <button
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center w-10 h-10 rounded-full transition-colors"
                style={{
                  color: TEXT_PRIMARY,
                  border: `1px solid ${BORDER_SUBTLE}`,
                  backgroundColor: "rgba(255,255,255,0.04)",
                }}
                aria-label="Close menu"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <line x1="3" y1="3" x2="13" y2="13" />
                  <line x1="13" y1="3" x2="3" y2="13" />
                </svg>
              </button>
            </div>

            <nav className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12 pt-16 md:pt-24" aria-label="Main menu">
              <ul className="flex flex-col gap-4 md:gap-6">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.06, ease: EXPO_OUT }}
                  >
                    {item.external ? (
                      <Link
                        href={item.href}
                        className="block font-bold tracking-[-0.02em] cursor-pointer"
                        style={{
                          fontFamily: FONT_DISPLAY,
                          color: TEXT_PRIMARY,
                          fontSize: "clamp(40px, 7vw, 88px)",
                          lineHeight: 1.0,
                        }}
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="block text-left font-bold tracking-[-0.02em] w-full"
                        style={{
                          fontFamily: FONT_DISPLAY,
                          color: TEXT_PRIMARY,
                          fontSize: "clamp(40px, 7vw, 88px)",
                          lineHeight: 1.0,
                        }}
                      >
                        {item.label}
                      </a>
                    )}
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: EXPO_OUT }}
                className="mt-16 md:mt-24 flex flex-wrap items-center gap-x-8 gap-y-3 text-[14px]"
                style={{ color: "rgba(255,255,255,0.65)", fontFamily: FONT_MONO }}
              >
                <a href="mailto:connect@graysolutions.in" className="hover:text-white transition-colors">connect@graysolutions.in</a>
                <a href="tel:+916380267018" className="hover:text-white transition-colors">+91 63802 67018</a>
                <span>Coimbatore, India</span>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
