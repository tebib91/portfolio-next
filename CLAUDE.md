# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with Next.js 16, featuring a blog system, CV management, and visitor tracking. The site uses Vercel KV for data persistence and is deployed on Vercel.

## Development Commands

### Core Development
```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Auto-fix ESLint issues
npm run type-check   # Run TypeScript type checking
```

### Pre-Push Validation
Before committing, run these commands to match CI checks:
```bash
npm run lint && npm run type-check && npm run build
```

## Architecture

### Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 with custom utilities
- **State Management**: React Server Components + Client Components
- **Database**: Vercel KV (Redis) for blog posts and visitor tracking
- **Analytics**: Vercel Analytics + Speed Insights + Google Tag Manager
- **UI Libraries**: Radix UI, Framer Motion, Lucide React, Tabler Icons

### Key Architectural Patterns

#### 1. Data Layer
- **Blog System**: Uses Vercel KV for storage with two data access patterns:
  - `getPosts()`: Returns all blog posts from `blog:posts` key
  - `getPostBySlug(slug)`: Retrieves individual posts from `blog:post:{slug}` keys
  - Fallback logic: If individual post not found in KV, searches in all posts array
  - Seed data stored in `/src/data/blog.ts` and initialized via `/api/blog/init` endpoint

- **CV Data**: Static data stored in `/src/data/cv.ts` with type definitions in `/src/types/cv.ts`
  - The CV type defines structure for experiences, contact info, and technologies
  - Multiple API routes serve CV data in different formats (JSON, downloadable file)

- **Visitor Tracking**: Uses Redis Sets (`portfolio:visitors`) to track unique visitors
  - GET `/api/views`: Retrieves current visitor count (cached for 60s)
  - POST `/api/views`: Adds visitor ID to set and returns updated count
  - Uses `sadd` to ensure uniqueness (switched from `incr` to track unique visitors instead of total views)

#### 2. Component Architecture
- **UI Components**: Located in `/src/components/ui/`
  - Mix of custom components and Shadcn-inspired components
  - `shadcn-io/` subdirectory for Shadcn components (e.g., counting-number)
  - Uses `class-variance-authority` for component variants
  - Utility function `cn()` in `/src/lib/utils.ts` for className merging (clsx + tailwind-merge)

- **Layout Structure**: Root layout (`/src/app/layout.tsx`) provides global UI:
  - `ThemeProvider` wraps entire app (dark/light/system modes via `next-themes`)
  - `BackgroundGrid` provides animated background
  - `FloatingTechIcons` displays animated tech stack icons
  - `FloatingDockDemo` footer navigation
  - `ModeToggle` theme switcher in header
  - `VisitorCounterWrapper` tracks visitors

#### 3. Routing
- **Pages**:
  - `/` - Home page with hero, experience section, tech stack
  - `/blog` - Blog listing page (Server Component fetches posts from KV)
  - `/blog/[slug]` - Individual blog post pages (dynamic routes)

- **API Routes**:
  - `/api/views` - Visitor counter (GET/POST)
  - `/api/blog` - Get all blog posts
  - `/api/blog/[slug]` - Get individual post
  - `/api/blog/init` - Initialize blog data in KV
  - `/api/blog/seed` - Seed blog data from static file
  - `/api/cv` - Get CV data as JSON
  - `/api/cv-file` - Get CV file metadata
  - `/api/cv-download` - Download CV file

#### 4. SEO & Metadata
- Centralized SEO configuration in `/src/lib/seo.ts`
- Exports `metadata` object (Next.js Metadata API) with OpenGraph, Twitter cards
- Exports `schemaData` for structured data (JSON-LD Person schema)
- Base URL configured via `NEXT_PUBLIC_BASE_URL` env var (defaults to ahmedtabib.com)

#### 5. Styling Utilities
- **Tech Icons**: `/src/lib/tech-icons.tsx` exports icon components mapped by technology name
- **Tech Websites**: `/src/lib/tech-websites.ts` maps tech names to URLs for external links
- **CV Utils**: `/src/lib/cv-utils.ts` contains utility functions for CV data transformation

### Path Aliases
TypeScript path mapping configured in `tsconfig.json`:
- `@/*` maps to `./src/*`

Example: `import { cn } from "@/lib/utils"`

## Environment Variables

Required for production:
- `KV_REST_API_URL` - Vercel KV REST API URL
- `KV_REST_API_TOKEN` - Vercel KV REST API token

Optional:
- `NEXT_PUBLIC_BASE_URL` - Base URL for the application (defaults to https://ahmedtabib.com)
- `GOOGLE_SITE_VERIFICATION` - Google Search Console verification
- `BING_SITE_VERIFICATION` - Bing Webmaster Tools verification

## CI/CD Pipeline

GitHub Actions workflows in `.github/workflows/`:

### CI Pipeline (`ci.yml`)
Runs on push/PR to `main`, `master`, or `develop`:
- **Lint**: ESLint code quality checks
- **Type Check**: TypeScript validation
- **Build**: Next.js production build
- **Security Audit**: `npm audit` for vulnerabilities

### Deployment
Configured for automatic Vercel deployment on successful CI runs to main/master branches.

## Important Implementation Notes

### Adding New Blog Posts
1. Add post data to `/src/data/blog.ts` following the `BlogPost` type
2. Deploy the changes
3. Call `/api/blog/seed` endpoint to sync data to Vercel KV
4. The blog listing and individual post pages will automatically reflect changes

### Working with Components
- Use `cn()` utility for conditional className logic
- Follow existing patterns for Framer Motion animations
- Respect theme system (components should support dark/light modes)
- UI components use Radix UI primitives for accessibility

### Working with API Routes
- Always return proper error responses with status codes
- Use `NextResponse.json()` for API responses
- Consider caching strategies (see `/api/views` GET for example)
- Vercel KV operations should have error handling with fallbacks

### Type Safety
- Strict TypeScript mode is enabled
- Define types in `/src/types/` for shared data structures
- Use TypeScript interfaces for component props
- The project uses React 19's type definitions
