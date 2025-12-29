import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Services from "@/pages/services";
import ServiceBrandDesign from "@/pages/service-brand-design";
import ServiceBrandContent from "@/pages/service-brand-content";
import ServiceGrowthPerformance from "@/pages/service-growth-performance";
import ServiceProductWeb from "@/pages/service-product-web";
import ServiceCommerceStudio from "@/pages/service-commerce-studio";
import ServiceAutomationsAI from "@/pages/service-automations-ai";
import ServiceProductDesign from "@/pages/service-product-design";
import ServiceWebPlatform from "@/pages/service-web-platform";
import ServiceCommerce from "@/pages/service-commerce";
import ServiceContentMarketing from "@/pages/service-content-marketing";
import About from "@/pages/about";
import Blogs from "@/pages/blogs";
import BlogDetail from "@/pages/blog-detail";
import MagicTrucks from "@/pages/magic-trucks";
import Eagle from "@/pages/eagle";
import Tix from "@/pages/tix";
import GraySolutions from "@/pages/gray-solutions";
import Contact from "@/pages/contact";

function Router() {
  return (
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
      <Route path="/blogs" component={Blogs} />
      <Route path="/blog/:slug" component={BlogDetail} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
