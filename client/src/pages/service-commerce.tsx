import ServicePage from "@/components/service-page";
import heroImage from "@assets/stock_images/ecommerce_shopping_o_773b9c07.jpg";

const services = [
  { title: "Shopify setup & structure", desc: "Collections, navigation, policies, shipping, taxes, and clean store architecture." },
  { title: "Theme customization", desc: "High-quality UI polish on a reliable theme (no bloated hacks)." },
  { title: "Product page optimization", desc: "Better PDP layout, trust elements, sizing logic, upsells, and clarity." },
  { title: "Checkout & funnel improvements", desc: "Reduce drop-offs with smarter flows, offers, and friction removal." },
  { title: "Automations & retention", desc: "Abandoned cart, post-purchase flows, basic segmentation, and lifecycle journeys." },
  { title: "Analytics & tracking", desc: "Pixel setup + clean measurement so your ads/decisions aren't guessing." },
];

export default function ServiceCommerce() {
  return (
    <ServicePage
      title="Commerce & Shopify"
      subtitle="Storefronts that feel premium and convert — with a backend setup that won't break later."
      heroImage={heroImage}
      heroImageAlt="Ecommerce"
      ctaHeading="Ready to grow your store?"
      ctaSubtext="Let's build a commerce experience that converts and scales."
      services={services}
    />
  );
}
