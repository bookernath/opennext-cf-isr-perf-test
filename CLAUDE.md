# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js ISR (Incremental Static Regeneration) performance benchmark application deployed to Cloudflare Workers using OpenNext. The project demonstrates and benchmarks ISR performance with optimized caching configuration using Workers KV and Durable Objects.

## Development Commands

```bash
# Development
npm run dev                # Start Next.js dev server with Turbopack
npm run preview           # Build and preview with Workers runtime

# Build & Deploy
npm run build             # Build Next.js application
npm run deploy            # Build and deploy to Cloudflare Workers
npm run lint              # Run ESLint

# Cloudflare
npm run cf-typegen        # Generate TypeScript types for Cloudflare env
```

## Architecture

### Caching Strategy
- **Incremental Cache**: R2 with regional cache wrapper for performance
- **Tag Cache**: Sharded Durable Objects for high-load revalidation
- **Queue**: Durable Objects for reliable ISR processing
- **Cache Interception**: Enabled for reduced cold start times

### Key Components
- **ISR Demo Routes**: `/demo/[slug]` with 10-second revalidation
- **Pre-generated Routes**: `/demo/1`, `/demo/2`, `/demo/3`, `/demo/foo`, `/demo/bar`, `/demo/baz`
- **Dynamic Routes**: Generated on-demand for other slugs
- **External API**: Integrates with Google Cloud Function for realistic data fetching

### Configuration Files

#### `open-next.config.ts`
Main OpenNext configuration using the "large site" architecture pattern:
- R2 incremental cache with regional cache wrapper
- Durable Objects for queue and sharded tag cache
- Direct cache purge for immediate invalidation

#### `wrangler.jsonc` 
Cloudflare Workers configuration with:
- KV namespaces for caching
- R2 buckets for storage
- D1 databases for tag cache
- Durable Objects for queue and tag processing
- Smart placement mode for optimal performance

## Important Implementation Details

### ISR Configuration
- Revalidation period: 10 seconds (configured in `app/demo/[slug]/page.tsx:4`)
- Pre-generated routes defined in `slugsToPrefetch` array
- External API endpoint: `https://isr-backend-api-451041921684.us-central1.run.app/api/fakedata/{slug}`

### Performance Testing
The application is designed for benchmarking:
- Compare pre-generated vs dynamic route performance
- Monitor cache hit/miss behavior via DevTools
- Test ISR revalidation timing
- Verify global KV distribution performance

### Development Environment
- Uses `@opennextjs/cloudflare` pre-release package (pkg.pr.new)
- Next.js 15.3.5 with React 19
- Tailwind CSS 4 for styling
- TypeScript with strict configuration

## Monitoring & Observability

### Highlight.io Integration
- **Project ID**: `ng2zj60g` (configured in `.env.local`)
- **Configuration**: `app/highlight.config.ts`
- **Features Enabled**:
  - Network recording with headers and body
  - Automatic error tracking and session replay
  - Performance monitoring for ISR routes
  - Tracing for Cloudflare Workers requests
- **Environment Variable**: `NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID`

The highlight.io integration helps monitor:
- ISR performance metrics and timings
- Cache hit/miss patterns
- API response times from the Google Cloud Function
- User sessions and interactions during performance testing