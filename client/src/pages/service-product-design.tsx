import ServicePage from "@/components/service-page";
import heroImage from "@assets/stock_images/modern_digital_produ_807a649b.jpg";

const services = [
  { title: "Solutions design & consulting", desc: "Defining technology strategies to operationalize new solutions and capabilities." },
  { title: "Product strategy & vision", desc: "Identifying product opportunities, prioritizing the right bets, and shaping the roadmap." },
  { title: "Experience design & development", desc: "Designing and validating flows fast — from wireframes to high-fidelity UI." },
  { title: "AI product strategy & development", desc: "LLM integrations, agent workflows, and AI features designed like real product — not demos." },
  { title: "Commerce experience design", desc: "Conversion-first shopping experiences across web, mobile, and marketplaces." },
  { title: "Design systems & components", desc: "A scalable UI kit that keeps your product consistent and speeds up development." },
];

export default function ServiceProductDesign() {
  return (
    <ServicePage
      title="Product & Experience Design"
      subtitle="Reimagining how people interact with your brand through digital products and experiences that drive business and human impact."
      heroImage={heroImage}
      heroImageAlt="Product Design"
      ctaHeading="Ready to build your product?"
      ctaSubtext="Let's design experiences that users love and businesses thrive on."
      services={services}
    />
  );
}
