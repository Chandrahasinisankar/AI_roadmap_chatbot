# AI Career Roadmap Generator

## Overview

An AI-powered web application that generates personalized career roadmaps and learning paths. Users input their career goals (target company, role, sector, desired salary, timeframe, and available study hours), and the application leverages Google's Gemini AI to create comprehensive, actionable roadmaps complete with milestones, weekly schedules, project recommendations, learning resources, and interview preparation strategies.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Language**: React with TypeScript, using Vite as the build tool and development server.

**UI Component System**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling. The design follows Material Design principles with inspiration from Linear and Notion, emphasizing clarity, progressive disclosure, and scannable hierarchies.

**Styling Approach**: Tailwind CSS with a custom design system featuring:
- CSS variables for theming (light/dark mode support)
- Custom color palette with HSL values
- Typography system using Inter (primary) and JetBrains Mono (code/technical content)
- Spacing primitives based on Tailwind's spacing scale
- Elevation and shadow utilities for depth

**Form Management**: React Hook Form with Zod validation for type-safe form handling and schema validation.

**State Management**: TanStack Query (React Query) for server state management with custom query client configuration. Includes centralized API request handling with error handling and authentication support.

**Routing**: Wouter for lightweight client-side routing.

**Key Design Decisions**:
- Component-based architecture with reusable UI primitives
- Markdown rendering for AI-generated content display using ReactMarkdown
- Accordion-based content organization for improved readability of complex roadmaps
- Custom toast notifications for user feedback
- Responsive design with mobile-first approach

### Backend Architecture

**Runtime**: Node.js with Express.js framework.

**Language**: TypeScript with ES modules for type safety and modern JavaScript features.

**API Design**: RESTful API with a single primary endpoint (`/api/generate-roadmap`) that accepts POST requests with validated roadmap parameters.

**Request Validation**: Zod schemas defined in shared directory for consistent validation between frontend and backend.

**AI Integration**: Google Gemini AI (gemini-2.0-flash model) for roadmap generation. The integration uses structured prompting to ensure consistent, comprehensive output including:
- Career overview and skill prioritization
- Monthly and weekly milestone breakdown
- Weekly study schedules
- Project recommendations with evaluation criteria
- Learning resources with real URLs
- Interview preparation strategies
- Salary negotiation guidance
- Timeline tables

**Development Features**:
- Hot module replacement (HMR) via Vite in development
- Request logging middleware for API monitoring
- Error handling with structured error responses
- Raw body preservation for webhook support

**Build Process**: 
- Frontend: Vite builds React app to `dist/public`
- Backend: esbuild bundles server code to `dist`

### Data Storage Solutions

**Current Implementation**: In-memory storage using a Map-based implementation for user data. This is a minimal storage layer with an interface-based design (`IStorage`) that allows for easy migration to persistent storage.

**Database Configuration**: Drizzle ORM configured for PostgreSQL with:
- Schema definitions in `shared/schema.ts`
- Migration directory: `./migrations`
- Neon serverless PostgreSQL support
- Connection via `DATABASE_URL` environment variable

**Storage Interface Design**: 
- Abstracted storage layer with `IStorage` interface
- CRUD operations for user management
- Ready for expansion to roadmap persistence

**Design Rationale**: The in-memory implementation allows rapid development and testing while the Drizzle configuration prepares for production-ready persistent storage when needed.

### Authentication and Authorization

**Current State**: Session infrastructure prepared but not actively enforced. The codebase includes:
- Connect-pg-simple for PostgreSQL-backed sessions
- User schema with username field
- Storage methods for user lookup and creation

**Future Implementation**: The architecture supports session-based authentication with PostgreSQL session storage, allowing for user accounts and saved roadmaps.

## External Dependencies

### Third-Party APIs

**Google Gemini AI**: Primary AI service for roadmap generation
- API Key: `GEMINI_API_KEY` environment variable
- Model: gemini-2.0-flash
- Purpose: Generates comprehensive, structured career roadmaps based on user input

### Database Services

**Neon PostgreSQL**: Serverless PostgreSQL database (configured, not actively used)
- Connection: `@neondatabase/serverless`
- Configuration: Via `DATABASE_URL` environment variable
- ORM: Drizzle with type-safe schema definitions

### UI Component Libraries

**Radix UI**: Headless UI component primitives for:
- Accordions, dialogs, popovers, dropdowns
- Form controls (checkbox, radio, select, slider, switch)
- Navigation components
- Overlay components (toast, tooltip, hover cards)

**Shadcn/ui**: Pre-built component library built on Radix UI with Tailwind styling

### Styling & Design

**Tailwind CSS**: Utility-first CSS framework with custom theme configuration
**Google Fonts**: Inter (UI/body) and JetBrains Mono (code) via CDN

### Development Tools

**Replit Integration**: 
- Vite plugins for Replit cartographer and dev banner
- Runtime error overlay for development

### Supporting Libraries

**Form & Validation**:
- React Hook Form: Form state management
- Zod: Schema validation and type inference
- @hookform/resolvers: Zod integration with React Hook Form

**Utilities**:
- date-fns: Date manipulation and formatting
- clsx & tailwind-merge: Conditional className composition
- class-variance-authority: Component variant management
- cmdk: Command palette component

**Rendering**:
- react-markdown: Markdown rendering for AI-generated content
- recharts: Charting library (configured for future analytics)