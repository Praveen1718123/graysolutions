import { Switch, Route } from "wouter";
import { lazy, Suspense } from "react";
import { AuthProvider } from "@/hooks/use-auth";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
// import Landing from "@/pages/landing";
const Landing = lazy(() => import("@/pages/landing"));

// Code-split heavy pages
const Services = lazy(() => import("@/pages/services"));
const ServiceBrandDesign = lazy(() => import("@/pages/service-brand-design"));
const ServiceBrandContent = lazy(() => import("@/pages/service-brand-content"));
const ServiceGrowthPerformance = lazy(() => import("@/pages/service-growth-performance"));
const ServiceProductWeb = lazy(() => import("@/pages/service-product-web"));
const ServiceCommerceStudio = lazy(() => import("@/pages/service-commerce-studio"));
const ServiceAutomationsAI = lazy(() => import("@/pages/service-automations-ai"));
const ServiceProductDesign = lazy(() => import("@/pages/service-product-design"));
const ServiceWebPlatform = lazy(() => import("@/pages/service-web-platform"));
const ServiceCommerce = lazy(() => import("@/pages/service-commerce"));
const ServiceContentMarketing = lazy(() => import("@/pages/service-content-marketing"));
const About = lazy(() => import("@/pages/about"));
const Blogs = lazy(() => import("@/pages/blogs"));
const BlogDetail = lazy(() => import("@/pages/blog-detail"));
const MagicTrucks = lazy(() => import("@/pages/magic-trucks"));
const Eagle = lazy(() => import("@/pages/eagle"));
const Tix = lazy(() => import("@/pages/tix"));
const GraySolutions = lazy(() => import("@/pages/gray-solutions"));
const GoGauge = lazy(() => import("@/pages/gogauge"));
const Contact = lazy(() => import("@/pages/contact"));

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
        <Route path="/blog/:slug" component={BlogDetail} />
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
