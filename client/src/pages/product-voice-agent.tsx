import ProductPageTemplate from "./product-page-template";
import gvaOfficeSign from "@assets/gva/gva-office-sign.webp";

export default function ProductVoiceAgent() {
  return (
    <ProductPageTemplate
      brand="Gray Voice Agent"
      domain="Voice Agent AI"
      status="Live"
      heroImage={gvaOfficeSign}
      primaryCtaLabel="Visit the live site"
      primaryCtaHref="https://gva.graysolutions.in/"
      primaryCtaExternal
      closingNote="See Gray Voice Agent live — explore the full product on its own site."
      tagline="An AI receptionist that picks up every call, qualifies the lead, and books the meeting — 24/7, in Indian languages."
      intro="Gray Voice Agent answers your business line with a natural, human-sounding AI that understands intent, asks the right follow-ups, captures qualified leads to your CRM, and schedules meetings directly on the team's calendar. Built for sales-heavy SMBs and agencies that lose 30-40% of inbound leads to missed calls — especially after hours and on weekends."
      stats={[
        { value: "24/7", label: "Always answers" },
        { value: "12+",  label: "Indian languages" },
        { value: "<1s",  label: "Pickup latency" },
        { value: "0",    label: "Missed calls" },
      ]}
      modules={[
        {
          title: "Natural conversation",
          description: "Trained on industry-specific dialogue patterns — handles interruptions, accents, and code-switching between English, Hindi, Tamil, Telugu, and more.",
        },
        {
          title: "Lead qualification",
          description: "Custom qualifying scripts per business — budget, timeline, fit, decision-maker — captured structured and dropped into your CRM with the recording.",
        },
        {
          title: "Calendar booking",
          description: "Reads team availability across Google / Outlook calendars, books slots, sends confirmations + reminders via WhatsApp and SMS.",
        },
        {
          title: "Live transcripts",
          description: "Every call transcribed in real-time with speaker labels, sentiment, and key entities. Searchable across every conversation your business has had.",
        },
        {
          title: "CRM integration",
          description: "Native sync with HubSpot, Zoho, Salesforce, Pipedrive — or push to any API. Leads land where your sales team already lives.",
        },
        {
          title: "Voice cloning (opt-in)",
          description: "Clone your founder or top sales rep's voice so callers hear a familiar tone. Two-minute training, full opt-in disclosure.",
        },
      ]}
      benefits={[
        "Capture 100% of inbound calls — including nights, weekends, and lunch breaks.",
        "Sales-qualified leads land in CRM within 60 seconds of the call ending.",
        "Reduce SDR/receptionist workload by 70%; let the team focus on demos and closing.",
        "Multi-language handling unlocks 2-3x larger addressable customer base in India.",
        "Every conversation searchable — turn voice into your best sales-coaching dataset.",
        "Deploys in under a week with your existing phone number (DID porting included).",
      ]}
      industries={[
        "Real estate",
        "Healthcare clinics",
        "Auto dealerships",
        "Marketing agencies",
        "Logistics & transport",
        "Education & coaching",
        "Professional services",
      ]}
      techStack={[
        "GPT-4 / Claude",
        "ElevenLabs voice",
        "Twilio / Exotel telephony",
        "Whisper (transcription)",
        "Pinecone vector DB",
        "Node.js workflows",
        "WhatsApp Business API",
      ]}
    />
  );
}
