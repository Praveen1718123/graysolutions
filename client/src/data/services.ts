// Four universal services — matching the WhatWeDo section on the homepage
// and the Services dropdown in the nav. Single source of truth.
export const services = [
  {
    id: "brand-content",
    title: "Brand & Identity",
    slug: "brand-content",
    description:
      "Logos, visual systems, brand positioning, messaging, content strategy, reels, and founder-led brand.",
    thumbnailSubtext:
      "Brand identity and content systems built to position you clearly in your market.",
    href: "/services/brand-content",
  },
  {
    id: "growth-performance",
    title: "Digital Marketing",
    slug: "growth-performance",
    description:
      "Content, social, paid ads, funnels, landing pages, CRO, analytics, and lead-gen.",
    thumbnailSubtext:
      "Performance marketing that ties spend directly to pipeline and revenue.",
    href: "/services/growth-performance",
  },
  {
    id: "product-web",
    title: "Product & Software",
    slug: "product-web",
    description:
      "Websites, web apps, MVP builds, custom software — design and development under one roof.",
    thumbnailSubtext:
      "From wireframe to live product — design and development under one roof.",
    href: "/services/product-web",
  },
  {
    id: "automations-ai",
    title: "AI & Automation",
    slug: "automations-ai",
    description:
      "Workflow automation, AI integration, voice agents, internal tools, and conversational systems.",
    thumbnailSubtext:
      "AI + automation that cuts repetitive tasks and speeds up execution across your business.",
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
    href: "https://gva.graysolutions.in/",
    inProgress: false,
  },
];

export function getUseCasesForService(serviceId: string) {
  return useCases.filter((uc) => uc.serviceIds.includes(serviceId));
}

export function getServicesForUseCase(ucServiceIds: string[]) {
  return services.filter((s) => ucServiceIds.includes(s.id));
}
