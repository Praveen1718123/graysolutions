export const services = [
  {
    id: "brand-content",
    title: "Brand & Content Studio",
    slug: "brand-content",
    description: "Brand positioning, messaging, creative direction, content strategy, reels/editing, founder brand.",
    thumbnailSubtext: "Brand identity and content systems built to position you clearly in your market.",
    href: "/services/brand-content",
  },
  {
    id: "growth-performance",
    title: "Growth & Performance",
    slug: "growth-performance",
    description: "Paid ads, funnels, landing pages, CRO, analytics, lead-gen.",
    thumbnailSubtext: "Performance marketing that ties spend directly to pipeline and revenue.",
    href: "/services/growth-performance",
  },
  {
    id: "product-web",
    title: "Product & Web Studio",
    slug: "product-web",
    description: "UI/UX, websites, MVP builds, web apps, product design + development.",
    thumbnailSubtext: "From wireframe to live product — design and development under one roof.",
    href: "/services/product-web",
  },
  {
    id: "commerce-studio",
    title: "Commerce Studio",
    slug: "commerce-studio",
    description: "Shopify builds/revamps, product pages, checkout optimization, email/SMS flows, integrations.",
    thumbnailSubtext: "End-to-end commerce builds that convert browsers into buyers.",
    href: "/services/commerce-studio",
  },
  {
    id: "automations-ai",
    title: "Automations & AI",
    slug: "automations-ai",
    description: "AI + automation that cuts repetitive tasks and speeds up execution across your business.",
    thumbnailSubtext: "AI + automation that cuts repetitive tasks and speeds up execution across your business.",
    href: "/services/automations-ai",
  },
];

export const useCases = [
  {
    id: "gogauge",
    title: "GoGauge",
    slug: "gogauge",
    shortDescription: "Built complete digital identity — brand, web, and positioning for a B2B SaaS product entering a competitive market.",
    serviceIds: ["brand-content", "growth-performance", "product-web"],
    href: "/case-study/gogauge",
  },
  {
    id: "eagle",
    title: "Eagle",
    slug: "eagle",
    shortDescription: "Designed and built a web platform for a growing business, combining sharp UI with a scalable frontend.",
    serviceIds: ["product-web"],
    href: "/case-study/eagle",
  },
  {
    id: "tix",
    title: "TIX",
    slug: "tix",
    shortDescription: "Product design and development for a mobile-first ticketing app — from concept to launch.",
    serviceIds: ["product-web"],
    href: "/case-study/tix",
  },
  {
    id: "voice-agent",
    title: "Voice Agent",
    slug: "voice-agent",
    shortDescription: "We're building a voice-based agent that handles conversations, captures intent, and routes actions to the right place — reducing manual follow-ups and improving response speed.",
    serviceIds: ["automations-ai"],
    href: "/use-cases/voice-agent",
    inProgress: true,
  },
];

export function getUseCasesForService(serviceId: string) {
  return useCases.filter((uc) => uc.serviceIds.includes(serviceId));
}

export function getServicesForUseCase(ucServiceIds: string[]) {
  return services.filter((s) => ucServiceIds.includes(s.id));
}
