# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application for a German cycling group (Velogruppe 60+) built with TypeScript, Chakra UI, and Supabase. The app provides public tour information and admin management capabilities.

## Essential Commands

- `pnpm dev` - Start development server (http://localhost:3000)
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint (uses flat config with ESLint 9)
- `pnpm format` - Format code with Prettier
- `pnpm types` - Generate TypeScript types from Supabase schema (run after schema changes)

## Architecture Overview

### Tech Stack

- **Framework**: Next.js 16 with App Router (not Pages Router)
- **React**: React 19.2 (latest)
- **Database**: Supabase (PostgreSQL) with server-side rendering via @supabase/ssr
- **UI**: Chakra UI v2 with custom theme (mapGreen palette)
- **Authentication**: Supabase Auth with middleware-based session management
- **Package Manager**: pnpm 9.12.3 (required - uses packageManager field)
- **TypeScript**: Strict mode enabled with path aliases (@/\* → project root)

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

- Server-side data fetching with Supabase client (async `createClient()`)
- React Context for tour state management (`TourContext`, `AdminTourListContext`, `AllTourListContext`)
- Server Actions for mutations (use 'use server' directive)
- Cache revalidation via `revalidatePath()` after data changes
- Protected routes using layout-based authentication checks

**Database Schema:**

- `touren` table: Tour information with image data and routing
- `tour_dates` table: Scheduling system with cancellation support
- Automatic `updated_at` timestamps with triggers
- Published/unpublished content system

### Authentication & Authorization

The app uses Supabase Auth with:

- Session refresh via `lib/supabase/middleware.ts` (updateSession function)
- Protected admin routes under `/app/admin` with layout-based auth check
- Server-side user validation using `supabase.auth.getUser()`
- Redirect to `/login` for unauthenticated admin access

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

**Code Style:**

- Uses tabs (not spaces) - configured in Prettier
- Import sorting via @trivago/prettier-plugin-sort-imports
- Import order: @/ imports first, then relative imports
- Single quotes, no trailing commas, 100 char line width

**Architecture Patterns:**

- Use Server Components by default, Client Components only when needed
- Follow existing import/export patterns with index.ts files
- Use 'use server' for Server Actions (mutations and revalidations)
- All async operations use proper TypeScript typing
- Maintain TypeScript strict mode compliance

**Database & Types:**

- Run `pnpm types` after any Supabase schema changes
- Types are generated in `/types/Database.types.ts`
- Custom types extend/wrap database types (see `/types/*.types.ts`)
- Three Supabase client types:
  - `lib/supabase/server.ts` - Server Components/Actions (async createClient)
  - `lib/supabase/client.ts` - Client Components
  - `lib/supabase/middleware.ts` - Middleware session refresh

**Content:**

- All user-facing content is in German
- HTML lang attribute is "de"

## Environment Variables

Required for development:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Supabase service role key (for server functions)
