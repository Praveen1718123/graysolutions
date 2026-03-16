import ServicePage from "@/components/service-page";
import heroImage from "@assets/stock_images/content_marketing_cr_8c06f177.jpg";

const services = [
  { title: "Content strategy & calendar", desc: "What to post, why it matters, and how it maps to business outcomes." },
  { title: "Creative production", desc: "Reels, carousels, ad creatives, brand videos — designed to stop scroll." },
  { title: "Performance ads (Meta/Google)", desc: "Testing frameworks, targeting, creative iterations, and funnel alignment." },
  { title: "Landing page conversion", desc: "Ad → landing → conversion improvements that move numbers." },
  { title: "Personal branding content", desc: "Founder-led content that builds trust, authority, and inbound leads." },
  { title: "Reporting & optimization", desc: "Simple insights, real next steps, and continuous iteration cycles." },
];

export default function ServiceContentMarketing() {
  return (
    <ServicePage
      title="Content & Marketing"
      subtitle="Creative + distribution as a system — built to generate demand, not just 'posts'."
      heroImage={heroImage}
      heroImageAlt="Content Marketing"
      ctaHeading="Ready to grow your brand?"
      ctaSubtext="Let's create content that drives real business results."
      services={services}
    />
  );
}
