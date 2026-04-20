/**
 * Centralized registry for dynamic imports to support manual preloading.
 * Adding a component here allows it to be prefetched on hover or during idle time.
 */

export const pageImports = {
  landing: () => import("@/pages/landing"),
  services: () => import("@/pages/services"),
  about: () => import("@/pages/about"),
  blogs: () => import("@/pages/blogs"),
  contact: () => import("@/pages/contact"),
  "blog-detail": () => import("@/pages/blog-detail"),
  "magic-trucks": () => import("@/pages/magic-trucks"),
  eagle: () => import("@/pages/eagle"),
  tix: () => import("@/pages/tix"),
  "gray-solutions": () => import("@/pages/gray-solutions"),
  gogauge: () => import("@/pages/gogauge"),
  // Service sub-pages
  "brand-design": () => import("@/pages/service-brand-design"),
  "brand-content": () => import("@/pages/service-brand-content"),
  "growth-performance": () => import("@/pages/service-growth-performance"),
  "product-web": () => import("@/pages/service-product-web"),
  "commerce-studio": () => import("@/pages/service-commerce-studio"),
  "automations-ai": () => import("@/pages/service-automations-ai"),
  "product-design": () => import("@/pages/service-product-design"),
  "web-platform": () => import("@/pages/service-web-platform"),
  commerce: () => import("@/pages/service-commerce"),
  "content-marketing": () => import("@/pages/service-content-marketing"),
};

/**
 * Preloads the chunk for a specific page.
 */
export function preloadPage(name: keyof typeof pageImports) {
  if (pageImports[name]) {
    pageImports[name]();
  }
}

/**
 * Map route path to preloader key
 */
export function preloadByPath(path: string) {
  const mapping: Record<string, keyof typeof pageImports> = {
    "/": "landing",
    "/services": "services",
    "/about": "about",
    "/blogs": "blogs",
    "/contact": "contact",
    "/case-study/magic-trucks": "magic-trucks",
    "/case-study/eagle": "eagle",
    "/case-study/tix": "tix",
    "/case-study/gray-solutions": "gray-solutions",
    "/case-study/gogauge": "gogauge",
    "/services/brand-design": "brand-design",
    "/services/brand-content": "brand-content",
    "/services/growth-performance": "growth-performance",
    "/services/product-web": "product-web",
    "/services/commerce-studio": "commerce-studio",
    "/services/automations-ai": "automations-ai",
    "/services/product-design": "product-design",
    "/services/web-platform": "web-platform",
    "/services/commerce": "commerce",
    "/services/content-marketing": "content-marketing",
  };

  const key = mapping[path];
  if (key) {
    preloadPage(key);
  }
}

/**
 * Strategic preloading of critical pages after initial render.
 */
export function preloadCriticalPages() {
  if (typeof window === "undefined") return;

  // Wait for browser idle
  const idleCallback = (window as any).requestIdleCallback || ((cb: any) => setTimeout(cb, 1000));
  
  idleCallback(() => {
    // Preload top-level navigation targets
    preloadPage("services");
    preloadPage("about");
    preloadPage("blogs");
  });
}
