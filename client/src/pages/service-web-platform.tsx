import ServicePage from "@/components/service-page";
import heroImage from "@assets/stock_images/web_development_codi_7cf7da0f.jpg";

const services = [
  { title: "Websites & landing pages", desc: "High-end marketing sites that are performance-first and conversion-ready." },
  { title: "Web applications & dashboards", desc: "Admin panels, portals, and internal tools built for clarity and speed." },
  { title: "MVP builds", desc: "Ship the first version fast with the right architecture to evolve later." },
  { title: "Integrations & workflows", desc: "Payments, CRM, WhatsApp, email, forms, analytics — connected end-to-end." },
  { title: "Performance & SEO foundation", desc: "Technical SEO, structure, speed, and accessibility baked in from day one." },
  { title: "Maintenance & iteration", desc: "Ongoing improvements, new pages/features, fixes, and optimization cycles." },
];

export default function ServiceWebPlatform() {
  return (
    <ServicePage
      title="Web & Platform Solutions"
      subtitle="Modern websites and platforms built to load fast, scale clean, and convert without chaos."
      heroImage={heroImage}
      heroImageAlt="Web Development"
      ctaHeading="Ready to build your platform?"
      ctaSubtext="Let's create a web presence that scales with your business."
      services={services}
    />
  );
}
