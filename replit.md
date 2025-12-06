# Gray Solutions - Digital Product & AI Studio

## Overview

Gray Solutions is a modern web application for a digital product and AI studio based in Tamil Nadu. The application features a marketing website with a landing page showcasing case studies and a services page highlighting the studio's capabilities. Built as a full-stack TypeScript application, it uses React with Vite on the frontend and Express with Node.js on the backend, with PostgreSQL (via Neon serverless) for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tool**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast hot module replacement
- Client-side routing using Wouter (lightweight alternative to React Router)

**UI Component System**
- Shadcn/ui component library with Radix UI primitives for accessible, unstyled components
- Tailwind CSS for utility-first styling with custom theming
- Custom brand colors: purple (#7B3FE4), gray backgrounds (#EDEDED), dark text (#1A1A1A)
- Inter font family loaded from Google Fonts

**State Management**
- TanStack Query (React Query) for server state management and data fetching
- React Hook Form with Zod resolvers for form validation
- No global client state management (relies on server state and local component state)

**Design System**
- Component aliases configured via `components.json` pointing to `@/components`
- Custom variants and animations using class-variance-authority
- Framer Motion for page transitions and animations
- Responsive design with mobile breakpoint at 768px

**Key Pages**
- Landing page: Hero section with case study filters and categories
- Services page: Multi-section layout with capabilities, roadmap, and testimonials
- Not Found (404) page for unmatched routes

### Backend Architecture

**Server Framework**
- Express.js with TypeScript for the HTTP server
- Custom logging middleware tracking request duration and response data
- Static file serving for production builds from `dist/public`
- Development mode with Vite middleware for HMR

**API Design**
- RESTful endpoints under `/api` prefix
- Case studies endpoints:
  - `GET /api/case-studies` - retrieve all or filtered by category
  - `POST /api/case-studies` - create new case studies
- JSON request/response format with explicit error handling

**Database Layer**
- Drizzle ORM for type-safe database queries
- Schema-first approach with TypeScript inference
- Storage interface pattern (`IStorage`) for database operations abstraction
- Database migrations managed via Drizzle Kit in `./migrations` directory

**Data Models**
- Users table: id (UUID), username (unique), password
- Case Studies table: id (serial), title, category, description, imageUrl (nullable)
- Zod schemas for runtime validation matching database schemas

### Build System

**Development**
- Client: Vite dev server on port 5000
- Server: tsx for TypeScript execution with NODE_ENV=development
- Hot module replacement for both frontend and backend changes

**Production Build**
- Two-stage build process via `script/build.ts`:
  1. Vite builds client to `dist/public`
  2. esbuild bundles server to `dist/index.cjs`
- Selective dependency bundling (allowlist) to reduce cold start times
- Single output file for deployment

**Custom Vite Plugins**
- `vite-plugin-meta-images`: Updates OpenGraph meta tags with Replit deployment URLs
- Replit-specific plugins (cartographer, dev-banner) for development environment
- Runtime error overlay for better debugging

### External Dependencies

**Database**
- Neon Serverless PostgreSQL via `@neondatabase/serverless`
- WebSocket polyfill (ws) for Neon's serverless driver
- Connection via DATABASE_URL environment variable

**UI Libraries**
- Radix UI components (@radix-ui/*) for accessible primitives
- Lucide React for icon system
- Embla Carousel for image carousels
- cmdk for command palette functionality

**Development Tools**
- TypeScript with strict mode enabled
- ESM module system throughout
- Path aliases: `@/` for client, `@shared/` for shared code, `@assets/` for attached assets

**Build Dependencies**
- esbuild for server bundling with selective externalization
- Vite with React and Tailwind plugins
- PostCSS with Tailwind and Autoprefixer

**Session Management**
- connect-pg-simple for PostgreSQL-backed sessions (configured but not actively used in current routes)

**Deployment Platform**
- Designed for Replit deployment with environment detection
- Production mode serves static assets and handles SPA routing
- Development mode integrates Vite middleware for live reloading