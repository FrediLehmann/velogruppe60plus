# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application for a German cycling group (Velogruppe 60+) built with TypeScript, Chakra UI, and Supabase. The app provides public tour information and admin management capabilities.

## Essential Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production  
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm types` - Generate TypeScript types from Supabase schema

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 with App Router (not Pages Router)
- **Database**: Supabase (PostgreSQL) with server-side rendering
- **UI**: Chakra UI v2 with custom theme (mapGreen palette)
- **Authentication**: Supabase Auth with middleware-based session management
- **Package Manager**: pnpm 9.12.3

### Directory Structure

```
/app/                    # Next.js App Router pages
├── layout.tsx          # Root layout with providers
├── page.tsx            # Homepage (current tour display)
├── admin/              # Protected admin section
├── alle-touren/        # All tours listing
├── tour/[id]/          # Individual tour pages
└── print/              # Print-optimized pages

/components/            # Reusable UI components
├── index.ts            # Central exports
├── [ComponentName]/    # Feature-specific components
    ├── ComponentName.tsx
    ├── components/     # Sub-components
    └── index.ts        # Clean exports

/lib/                   # Utilities and configurations
├── supabase/           # Database client setup
├── contexts/           # React contexts
└── theme/              # Chakra UI theme

/types/                 # TypeScript definitions
```

### Key Patterns

**Component Organization:**
- Each component has its own folder with index.ts for clean imports
- Sub-components organized in nested `components/` folders
- Consistent PascalCase naming and export patterns

**Data Flow:**
- Server-side data fetching with Supabase client
- React Context for tour state management (`TourContext`)
- Protected routes using middleware-based authentication

**Database Schema:**
- `touren` table: Tour information with image data and routing
- `tour_dates` table: Scheduling system with cancellation support
- Automatic `updated_at` timestamps with triggers
- Published/unpublished content system

### Authentication & Authorization

The app uses Supabase Auth with:
- Middleware-based session management in `middleware.ts`
- Protected admin routes under `/admin`
- Server-side user validation for admin operations

### Styling Approach

- Chakra UI components with custom theme in `/lib/theme`
- Custom color palette (mapGreen) for brand consistency
- Responsive design using Chakra's breakpoint arrays
- German language content (lang="de")

### Key Features

**Public:**
- Homepage displays current/next tour based on `next_tour` flag
- All tours listing with search/filter capabilities
- Individual tour detail pages with routing information
- Print-optimized tour listings

**Admin:**
- Tour management (CRUD operations)
- Date scheduling system
- Image upload functionality
- Password reset functionality

## Development Notes

- Use Server Components by default, Client Components only when needed
- Follow existing import/export patterns with index.ts files
- Maintain TypeScript strict mode compliance
- Run `pnpm types` after database schema changes
- All user-facing content is in German

## Environment Variables

Required for development:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Supabase service role key (for server functions)