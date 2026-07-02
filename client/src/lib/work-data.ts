import goGaugeImage from "@assets/optimized/gogauge_slide.webp";
import eagleImage from "@assets/Eagle_Web_2_1765901229010.webp";
import magicTrucksImage from "@assets/mokcup_1_1765899763586.webp";
import tixImage from "@assets/tix-2026/tix-01-brand-system.webp";
import cafe66Image from "@assets/cafe66-signage-2026.webp";
import krftImage from "@assets/krft/krft-01-brand-board.webp";
import thottamImage from "@assets/thottam/thottam-01-brand-board.webp";
import kopoImage from "@assets/kopo/kopo-06-campaign-hero.webp";
import gvaImage from "@assets/gva/gva-office-sign.webp";

export type WorkCategory =
  | "Brand & Identity"
  | "Digital Marketing"
  | "Product & Software"
  | "AI & Automation";

export const workCategories: Array<"All Work" | WorkCategory> = [
  "All Work",
  "Brand & Identity",
  "Digital Marketing",
  "Product & Software",
  "AI & Automation",
];

export type WorkItem = {
  id: string;
  client: string;
  /**
   * Categories this work item belongs to. The first entry is treated as the
   * "primary" category and shown as the chip on the card.
   */
  categories: WorkCategory[];
  description: string;
  label?: string;
  href: string;
  image: string | null;
  gradient: string | null;
};

export const selectedWork: WorkItem[] = [
  {
    id: "magic-trucks",
    client: "Magic Trucks",
    categories: ["Product & Software", "AI & Automation"],
    description:
      "B2B logistics platform — operations console, driver app, shipper portal, and carrier web.",
    href: "/case-study/magic-trucks",
    image: magicTrucksImage,
    gradient: null,
  },
  {
    id: "gva",
    client: "Gray Voice Agent",
    categories: ["AI & Automation"],
    description:
      "AI voice agent that handles inbound calls, qualifies leads, and books meetings.",
    label: "Our product",
    href: "/products/voice-agent-ai",
    image: gvaImage,
    gradient: null,
  },
  {
    id: "eagle",
    client: "Eagle",
    categories: ["Brand & Identity"],
    description:
      "Fleet-wide brand revamp across digital, vehicles, merchandise, and uniforms — Dubai.",
    href: "/case-study/eagle",
    image: eagleImage,
    gradient: null,
  },
  {
    id: "gogauge",
    client: "GoGauge",
    categories: ["Brand & Identity", "Product & Software"],
    description:
      "Rebrand, strategy, and operating system for a fast-growing logistics platform.",
    href: "/case-study/gogauge",
    image: goGaugeImage,
    gradient: null,
  },
  {
    id: "cafe66",
    client: "Cafe66",
    categories: ["Digital Marketing", "Brand & Identity"],
    description:
      "Monthly video ads, reels, and Instagram content production for a local café — ongoing creative & social branding.",
    href: "/case-study/cafe66",
    image: cafe66Image,
    gradient: null,
  },
  {
    id: "tix",
    client: "TIX",
    categories: ["Product & Software", "Brand & Identity", "Digital Marketing"],
    description:
      "Video-first event-ticketing marketplace — brand system, mobile + web product, organizer & admin consoles, and campaign.",
    label: "Live",
    href: "/case-study/tix",
    image: tixImage,
    gradient: null,
  },
  {
    id: "krft",
    client: "Krft",
    categories: ["Brand & Identity", "Digital Marketing", "Product & Software"],
    description:
      "Womenswear brand — identity, packaging, retail environment, e-commerce, social kit, and campaign.",
    href: "/case-study/krft",
    image: krftImage,
    gradient: null,
  },
  {
    id: "thottam",
    client: "Thottam",
    categories: ["Brand & Identity", "Digital Marketing", "Product & Software"],
    description:
      "Farm-fresh quick commerce — identity, packaging, mobile app UI, fleet branding, and social kit.",
    href: "/case-study/thottam",
    image: thottamImage,
    gradient: null,
  },
  {
    id: "kopo",
    client: "KOPO",
    categories: ["Brand & Identity", "Digital Marketing", "Product & Software"],
    description:
      "Unisex apparel label from Salem — identity, packaging, capsule campaign, social kit, and a full e-commerce storefront.",
    label: "Live",
    href: "/case-study/kopo",
    image: kopoImage,
    gradient: null,
  },
];
