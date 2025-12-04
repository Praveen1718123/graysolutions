import { storage } from "./storage";
import ws from "ws";

// Configure WebSocket for Neon serverless
if (!globalThis.WebSocket) {
  globalThis.WebSocket = ws as any;
}

async function seed() {
  const caseStudies = [
    {
      title: "Magic Trucks Fleet Management",
      category: "Magic Trucks",
      description: "Real-time tracking and optimization system for logistics fleet operations",
      imageUrl: null,
    },
    {
      title: "Magic Trucks Route Optimization",
      category: "Magic Trucks",
      description: "AI-powered route planning reducing delivery times by 30%",
      imageUrl: null,
    },
    {
      title: "Switch Bee Smart Home Platform",
      category: "Switch Bee",
      description: "IoT integration platform for seamless smart home automation",
      imageUrl: null,
    },
    {
      title: "Switch Bee Energy Management",
      category: "Switch Bee",
      description: "Intelligent energy monitoring and optimization dashboard",
      imageUrl: null,
    },
    {
      title: "TIX Event Ticketing System",
      category: "TIX",
      description: "Scalable ticketing platform handling 100K+ concurrent users",
      imageUrl: null,
    },
    {
      title: "TIX Mobile Experience",
      category: "TIX",
      description: "Seamless mobile ticketing with QR code validation",
      imageUrl: null,
    },
    {
      title: "AI Receptionist Voice System",
      category: "AI Receptionist",
      description: "Natural language processing for automated customer service",
      imageUrl: null,
    },
    {
      title: "AI Receptionist Analytics Dashboard",
      category: "AI Receptionist",
      description: "Real-time insights and call analytics platform",
      imageUrl: null,
    },
    {
      title: "Gray Solutions Corporate Website",
      category: "Gray Solutions",
      description: "Modern, responsive corporate presence with case study showcase",
      imageUrl: null,
    },
    {
      title: "Gray Solutions Design System",
      category: "Gray Solutions",
      description: "Comprehensive design system and component library",
      imageUrl: null,
    },
  ];

  for (const study of caseStudies) {
    try {
      await storage.createCaseStudy(study);
      console.log(`Created: ${study.title}`);
    } catch (error) {
      console.error(`Failed to create ${study.title}:`, error);
    }
  }

  console.log("Seeding completed!");
}

seed().catch(console.error);
