import ServicePage from "@/components/service-page";
import heroImage from "@assets/stock_images/professional_brand_d_908b1411.jpg";

const services = [
  { title: "Brand strategy & positioning", desc: "Defining your category, audience, and 'why us' so your brand isn't just another option." },
  { title: "Naming & messaging systems", desc: "Naming, tone of voice, taglines, and message hierarchy that sells without sounding salesy." },
  { title: "Visual identity systems", desc: "Logo direction, typography, color, layouts, and guidelines that scale across teams and platforms." },
  { title: "Brand design kits", desc: "Reusable templates for social, decks, proposals, and internal docs — consistent by default." },
  { title: "Packaging & product presentation", desc: "Packaging, labels, and product visuals designed to look trustable on shelf and online." },
  { title: "Creative direction", desc: "A clear visual lane for shoots, reels, ads, and web — so everything feels like one brand." },
];

export default function ServiceBrandDesign() {
  return (
    <ServicePage
      title="Brand Design"
      subtitle="Building brands that look premium, sound clear, and stay consistent everywhere — from first impression to repeat purchase."
      heroImage={heroImage}
      heroImageAlt="Brand Design"
      ctaHeading="Ready to build your brand?"
      ctaSubtext="Let's create a brand that stands out and drives results."
      services={services}
    />
  );
}
