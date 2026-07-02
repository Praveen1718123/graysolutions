import ProductPageTemplate from "./product-page-template";

export default function ProductQuickCommerce() {
  return (
    <ProductPageTemplate
      brand="Quick Commerce"
      domain="Hyperlocal Quick Commerce Platform"
      status="Coming soon"
      tagline="A 10-minute delivery platform for hyperlocal D2C brands — storefront, dark-store ops, rider dispatch, and customer app in one stack."
      intro="(Dummy content — to be replaced with final copy.) A turnkey platform for brands launching their own 10-minute delivery experience. Dark-store inventory, geo-fenced catalog, real-time stock visibility, rider allocation with route optimization, and a polished customer storefront — all under your brand. Designed for cafes, pharmacies, grocery, and meal kit categories building their own last-mile instead of paying aggregator margins."
      stats={[
        { value: "10 min", label: "Delivery promise" },
        { value: "Multi-store", label: "Dark-store ops" },
        { value: "<3 s", label: "Storefront load" },
        { value: "GST", label: "India-ready" },
      ]}
      modules={[
        {
          title: "Customer storefront",
          description: "Mobile-first PWA — location detection, live ETA, real-time inventory, dynamic pricing, coupon engine, and integrated UPI/cards/COD checkout.",
        },
        {
          title: "Dark-store dashboard",
          description: "Per-store inventory, picker queues, packing flow, SKU heatmaps, low-stock alerts, and shift-level performance metrics.",
        },
        {
          title: "Rider dispatch",
          description: "Algorithmic order-to-rider allocation, route batching, live tracking, proof-of-delivery capture, and earnings ledger for delivery partners.",
        },
        {
          title: "Geo-fenced catalog",
          description: "Different catalogs and prices per dark store. Customers see only what can actually reach them in your delivery window.",
        },
        {
          title: "Promotions engine",
          description: "Build offers without code — BOGO, flat off, % off, time-window deals, first-order, referral codes, and segment-targeted pushes.",
        },
        {
          title: "Operator app",
          description: "iOS / Android app for store managers — receive orders, dispatch, escalate issues, manage stock, and clock pickers in/out.",
        },
      ]}
      benefits={[
        "Launch your own quick-commerce brand without paying 25% aggregator margins.",
        "Hit 10-minute SLA with batched dispatch and live route re-optimization.",
        "Reduce stockouts by 40-60% with real-time inventory + auto-replenishment alerts.",
        "Single customer database across web, app, and dark-store walk-ins.",
        "Operator-first design — staff trained in under 2 hours, no SOPs to memorize.",
        "(Placeholder benefit — finalize after pilot.)",
      ]}
      industries={[
        "Cafes & QSR",
        "Pharmacy",
        "Grocery & FMCG",
        "Meal kits",
        "Liquor / smoke",
        "Pet supplies",
        "Florists & gifting",
      ]}
      techStack={[
        "Next.js storefront",
        "React Native ops app",
        "Node.js + Postgres",
        "Redis + BullMQ",
        "Mapbox / Google Maps",
        "Razorpay / UPI",
        "Twilio SMS / WhatsApp",
      ]}
    />
  );
}
