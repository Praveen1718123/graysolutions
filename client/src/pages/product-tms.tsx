import ProductPageTemplate from "./product-page-template";
import adminDashboard from "@assets/magic-trucks-2026/admin-dashboard.webp";
import driverHome from "@assets/magic-trucks-2026/driver-home.webp";
import shipperDashboard from "@assets/magic-trucks-2026/shipper-dashboard.webp";
import carrierDashboard from "@assets/magic-trucks-2026/carrier-dashboard.webp";

export default function ProductTms() {
  return (
    <ProductPageTemplate
      brand="Magic Trucks"
      domain="Transportation Management System"
      status="Live"
      screenshots={[
        {
          src: adminDashboard,
          title: "Operations console",
          caption: "Command center — what needs attention today across KYC, disputes, payments, and live shipments.",
        },
        {
          src: driverHome,
          title: "Driver mobile app",
          caption: "Today's trip, upcoming runs, earnings, and SOS — offline-first, iOS + Android.",
        },
        {
          src: shipperDashboard,
          title: "Shipper portal",
          caption: "Customer dashboard — book in 3 minutes, track live, manage shipments and invoices.",
        },
        {
          src: carrierDashboard,
          title: "Carrier web",
          caption: "Transporter dashboard — load offers, fleet status, financials, and document expiry.",
        },
      ]}
      tagline="End-to-end logistics OS — operations console, driver app, shipper portal, and carrier web in one platform."
      intro="Built for transporters who outgrew spreadsheets but can't afford SAP. Magic Trucks runs the full freight lifecycle — quotes, bookings, dispatch, tracking, POD capture, billing, and reconciliation — without forcing your team to change how they actually work. India-first, WhatsApp-friendly, deployable in days, not months."
      stats={[
        { value: "60%",  label: "Faster dispatch" },
        { value: "4 apps", label: "One platform" },
        { value: "100%", label: "POD coverage" },
        { value: "30 day", label: "Go-live" },
      ]}
      modules={[
        {
          title: "Operations console",
          description: "Web-based command center for dispatchers — quotes, bookings, lane planning, driver allocation, live tracking, and exceptions in a single view.",
        },
        {
          title: "Driver mobile app",
          description: "iOS + Android app for trip flow — pre-trip checks, pickup photos, in-transit updates, POD capture, earnings, and offline-first sync.",
        },
        {
          title: "Shipper portal",
          description: "Customer-facing portal for booking shipments, tracking live, downloading PODs and invoices, and managing addresses + pricing.",
        },
        {
          title: "Carrier web",
          description: "Transporter onboarding, fleet management, document KYC, payment cycles, and lane bidding — all in one operator dashboard.",
        },
        {
          title: "WhatsApp integration",
          description: "Booking confirmations, dispatch alerts, POD links, and customer support — all natively in WhatsApp Business via official APIs.",
        },
        {
          title: "Billing & reconciliation",
          description: "Auto-generated invoices, GST-ready, configurable payment terms, partial settlements, and 1-click bank reconciliation.",
        },
      ]}
      benefits={[
        "Dispatchers handle 3x more trips per day without adding headcount.",
        "100% POD coverage with timestamped, geo-tagged proof — disputes drop ~80%.",
        "Customers self-serve booking and tracking; inbound call volume cuts ~60%.",
        "Closing the books goes from 2 weeks to 2 days each month.",
        "Driver app works offline — no missed updates in low-network corridors.",
        "Onboarded fully in under 30 days with white-glove migration from spreadsheets.",
      ]}
      industries={[
        "FTL & PTL freight",
        "Last-mile logistics",
        "Cold chain",
        "Container haulage",
        "Cement & steel",
        "Express delivery",
        "Inter-city movers",
      ]}
      techStack={[
        "React + TypeScript",
        "Node.js / Express",
        "PostgreSQL",
        "Redis",
        "React Native",
        "WhatsApp Business API",
        "AWS / hosted-India",
      ]}
      caseStudyHref="/case-study/magic-trucks"
    />
  );
}
