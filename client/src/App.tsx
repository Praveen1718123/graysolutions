import { Switch, Route } from "wouter";
import { lazy, Suspense, useEffect } from "react";
import { AuthProvider } from "@/hooks/use-auth";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import { pageImports, preloadCriticalPages } from "./lib/preloader";

// Lazy components using central registry
const Landing = lazy(pageImports.landing);
const Services = lazy(pageImports.services);
const ServiceBrandDesign = lazy(pageImports["brand-design"]);
const ServiceBrandContent = lazy(pageImports["brand-content"]);
const ServiceGrowthPerformance = lazy(pageImports["growth-performance"]);
const ServiceProductWeb = lazy(pageImports["product-web"]);
const ServiceCommerceStudio = lazy(pageImports["commerce-studio"]);
const ServiceAutomationsAI = lazy(pageImports["automations-ai"]);
const ServiceProductDesign = lazy(pageImports["product-design"]);
const ServiceWebPlatform = lazy(pageImports["web-platform"]);
const ServiceCommerce = lazy(pageImports.commerce);
const ServiceContentMarketing = lazy(pageImports["content-marketing"]);
const About = lazy(pageImports.about);
const Blogs = lazy(pageImports.blogs);
const BlogDetail = lazy(pageImports["blog-detail"]);
const MagicTrucks = lazy(pageImports["magic-trucks"]);
const Eagle = lazy(pageImports.eagle);
const Tix = lazy(pageImports.tix);
const GraySolutions = lazy(pageImports["gray-solutions"]);
const GoGauge = lazy(pageImports.gogauge);
const Contact = lazy(pageImports.contact);

// Admin Portal
const AdminAuth = lazy(() => import("@/pages/admin/auth-page"));
const AdminDashboard = lazy(() => import("@/pages/admin/dashboard"));

// Minimal loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-800 rounded-full animate-spin" />
  </div>
);

function Router() {
  useEffect(() => {
    // Preload top-level sections after initial render
    preloadCriticalPages();
  }, []);

  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/services" component={Services} />
        <Route path="/services/brand-design" component={ServiceBrandDesign} />
        <Route path="/services/brand-content" component={ServiceBrandContent} />
        <Route path="/services/growth-performance" component={ServiceGrowthPerformance} />
        <Route path="/services/product-web" component={ServiceProductWeb} />
        <Route path="/services/commerce-studio" component={ServiceCommerceStudio} />
        <Route path="/services/automations-ai" component={ServiceAutomationsAI} />
        <Route path="/services/product-design" component={ServiceProductDesign} />
        <Route path="/services/web-platform" component={ServiceWebPlatform} />
        <Route path="/services/commerce" component={ServiceCommerce} />
        <Route path="/services/content-marketing" component={ServiceContentMarketing} />
        <Route path="/about" component={About} />
        <Route path="/case-study/magic-trucks" component={MagicTrucks} />
        <Route path="/case-study/eagle" component={Eagle} />
        <Route path="/case-study/tix" component={Tix} />
        <Route path="/case-study/gray-solutions" component={GraySolutions} />
        <Route path="/case-study/gogauge" component={GoGauge} />
        <Route path="/blogs" component={Blogs} />
        <Route path="/blogs/:slug" component={BlogDetail} />
        <Route path="/contact" component={Contact} />
        
        {/* Admin Portal */}
        <Route path="/admin/auth" component={AdminAuth} />
        <Route path="/admin" component={AdminDashboard} />
        
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
