# Gray Solutions Website

## Overview

This is a modern, minimal landing page and marketing website for Gray Solutions, a digital product and AI studio. The application is built as a full-stack TypeScript web application featuring a React frontend with Vite, an Express backend, and PostgreSQL database integration. The site emphasizes clean design, lots of white space, and smooth scroll-based animations. The architecture follows a monorepo pattern with shared types and schemas between client and server.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18+ with TypeScript for type safety
- Vite as the build tool and development server
- Single Page Application (SPA) architecture using Wouter for client-side routing
- Hot Module Replacement (HMR) in development with custom Vite plugins for Replit integration

**UI Component Library**
- shadcn/ui component system (New York style variant)
- Radix UI primitives for accessible, unstyled components
- Tailwind CSS for utility-first styling with custom design tokens
- Framer Motion for advanced scroll-based animations and transitions

**Design System**
- Custom color palette: primary brand purple (#7B3FE4), gray backgrounds (#EDEDED), dark text (#1A1A1A)
- Inter font family from Google Fonts
- Consistent spacing and elevation patterns using Tailwind utilities
- Responsive design with mobile breakpoint at 768px

**State Management**
- TanStack Query (React Query) for server state management
- React hooks for local component state
- Custom hooks for responsive behavior (useIsMobile)

**Key UI Patterns**
- Fixed header that transforms on scroll (transparent to solid white with shadow)
- Scroll-triggered video expansion effect in hero section
- Pill-shaped buttons with subtle hover elevations
- Minimal navigation with text-only buttons (no background/border by default)

### Backend Architecture

**Server Framework**
- Express.js with TypeScript
- HTTP server with WebSocket polyfill for Neon serverless compatibility
- Custom logging middleware with timestamp formatting
- JSON body parsing with raw body capture for webhook support

**Database Layer**
- PostgreSQL database via Neon serverless driver
- Drizzle ORM for type-safe database queries and migrations
- Schema-first approach with Zod validation via drizzle-zod
- Migration files stored in `/migrations` directory

**API Design**
- RESTful endpoints under `/api` prefix
- Case studies resource with filtering by category
- JSON request/response format
- Error handling with appropriate HTTP status codes

**Build & Deployment**
- Custom build script using esbuild for server bundling
- Selective dependency bundling (allowlist) to optimize cold starts
- Static file serving from `dist/public` in production
- Vite middleware integration in development mode

### Data Storage

**Database Schema**

Users table:
- UUID primary key (auto-generated)
- Username (unique, required)
- Password (required, presumably hashed in practice)

Case Studies table:
- Serial integer primary key
- Title, category, description (all required text fields)
- Optional image URL
- No timestamps or soft deletes currently

**ORM & Validation**
- Drizzle ORM generates TypeScript types from schema
- Zod schemas derived from Drizzle tables for runtime validation
- Insert schemas exclude auto-generated fields (id, timestamps)
- Shared schema file between client and server ensures type consistency

**Data Access Pattern**
- Storage interface abstraction (IStorage) for potential future implementations
- DatabaseStorage class implements CRUD operations
- Methods return Promise-based results for async handling
- Filtering logic implemented at database query level

### External Dependencies

**Database**
- Neon serverless PostgreSQL (via @neondatabase/serverless)
- Connection string via DATABASE_URL environment variable
- WebSocket polyfill required for Neon driver compatibility

**UI Component Libraries**
- Radix UI: 20+ primitive component packages for accessible UI building blocks
- Lucide React: Icon library for consistent iconography
- cmdk: Command palette component
- embla-carousel-react: Carousel/slider functionality
- Framer Motion: Animation library (used for scroll effects)

**Utility Libraries**
- class-variance-authority: Type-safe variant system for components
- clsx & tailwind-merge: Conditional class name utilities
- date-fns: Date manipulation and formatting
- zod: Schema validation
- React Hook Form with resolvers: Form state management

**Development Tools**
- Replit-specific Vite plugins: cartographer, dev-banner, runtime-error-modal
- Custom meta-images plugin for OpenGraph image URL injection
- TypeScript with strict mode enabled
- ESNext module system

**Asset Management**
- Static assets in `attached_assets` directory
- Public directory for favicon and OpenGraph images
- Video assets (hero-video-horizontal.mp4) imported directly in components
- PNG logo image imported as module

**Styling & Theming**
- Tailwind CSS with @tailwindcss/vite plugin
- PostCSS with Autoprefixer
- tw-animate-css for animation utilities
- CSS custom properties for theme tokens (inline @theme)
- Dark mode support via class-based variant system