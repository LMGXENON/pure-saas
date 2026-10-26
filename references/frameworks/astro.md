# Astro Implementation & Design Engineering Guide

> Source: Adapted from UI/UX Pro Max Stack Guidelines (`astro.csv`)
> Framework: Astro
> Rules Count: 53 verified engineering practices

This reference guide provides actionable frontend implementation patterns, anti-slop rules,
accessibility requirements, and code examples for **Astro** projects.

---

## Architecture

### Use Islands Architecture `[High]`
Astro's partial hydration only loads JS for interactive components

**Applies to:** astro 7.1.6
**Documentation:** [https://docs.astro.build/en/concepts/islands/](https://docs.astro.build/en/concepts/islands/)

- **Do:** Interactive components with client directives
- **Don't:** Hydrate entire page like traditional SPA

**Recommended:**
```
<Counter client:load />
```

**Avoid:**
```
Everything as client component
```

---

### Default to zero JS `[High]`
Astro ships zero JS by default - add only when needed

**Applies to:** astro 7.1.6
**Documentation:** [https://docs.astro.build/en/basics/astro-components/](https://docs.astro.build/en/basics/astro-components/)

- **Do:** Static components without client directive
- **Don't:** Add client:load to everything

**Recommended:**
```
<Header /> (static)
```

**Avoid:**
```
<Header client:load /> (unnecessary)
```

---

### Choose right client directive `[Medium]`
Different directives for different hydration timing

**Applies to:** astro 7.1.6
**Documentation:** [https://docs.astro.build/en/reference/directives-reference/#client-directives](https://docs.astro.build/en/reference/directives-reference/#client-directives)

- **Do:** client:visible for below-fold client:idle for non-critical
- **Don't:** client:load for everything

**Recommended:**
```
<Comments client:visible />
```

**Avoid:**
```
<Comments client:load />
```

---

### Use content collections `[High]`
Type-safe content management for blogs docs

**Applies to:** astro 7.1.6
**Documentation:** [https://docs.astro.build/en/guides/content-collections/](https://docs.astro.build/en/guides/content-collections/)

- **Do:** Content collections for structured content
- **Don't:** Loose markdown files without schema

**Recommended:**
```
const posts = await getCollection('blog')
```

**Avoid:**
```
import.meta.glob('./posts/*.md')
```

---

### Define collection schemas `[High]`
Zod schemas for content validation

**Applies to:** astro 7.1.6
**Documentation:** [https://docs.astro.build/en/guides/content-collections/#defining-a-collection-schema](https://docs.astro.build/en/guides/content-collections/#defining-a-collection-schema)

- **Do:** Schema with required fields and types
- **Don't:** No schema validation

**Recommended:**
```
defineCollection({ schema: z.object({...}) })
```

**Avoid:**
```
defineCollection({})
```

---

## Routing

### Use file-based routing `[Medium]`
Create routes by adding .astro files in pages/

**Applies to:** astro 7.1.6
**Documentation:** [https://docs.astro.build/en/basics/astro-pages/](https://docs.astro.build/en/basics/astro-pages/)

- **Do:** pages/ directory for routes
- **Don't:** Manual route configuration

**Recommended:**
```
src/pages/about.astro
```

**Avoid:**
```
Custom router setup
```

---

### Dynamic routes with brackets `[Medium]`
Use [param] for dynamic routes

**Applies to:** astro 7.1.6
**Documentation:** [https://docs.astro.build/en/guides/routing/#dynamic-routes](https://docs.astro.build/en/guides/routing/#dynamic-routes)

- **Do:** Bracket notation for params
- **Don't:** Query strings for dynamic content

**Recommended:**
```
pages/blog/[slug].astro
```

**Avoid:**
```
pages/blog.astro?slug=x
```

---

### Use getStaticPaths for SSG `[High]`
Generate static pages at build time

**Applies to:** astro 7.1.6
**Documentation:** [https://docs.astro.build/en/reference/api-reference/#getstaticpaths](https://docs.astro.build/en/reference/api-reference/#getstaticpaths)

- **Do:** getStaticPaths for known dynamic routes
- **Don't:** Fetch at runtime for static content

**Recommended:**
```
export async function getStaticPaths() { return [...] }
```

**Avoid:**
```
No getStaticPaths with dynamic route
```

---

### Enable on-demand rendering when needed `[Medium]`
Render only dynamic routes on demand or choose server output for a mostly dynamic site

**Applies to:** astro 7.1.6
**Documentation:** [https://docs.astro.build/en/guides/on-demand-rendering/](https://docs.astro.build/en/guides/on-demand-rendering/)

- **Do:** export const prerender = false on selected routes
- **Don't:** Use removed output: 'hybrid'

**Recommended:**
```
export const prerender = false;
```

**Avoid:**
```
output: 'hybrid'
```

---

## Components

### Keep .astro for static `[High]`
Use .astro components for static content

**Applies to:** astro 7.1.6
**Documentation:** [https://docs.astro.build/en/basics/astro-components/](https://docs.astro.build/en/basics/astro-components/)

- **Do:** Astro components for layout structure
- **Don't:** React/Vue for static markup

**Recommended:**
```
<Layout><slot /></Layout>
```

**Avoid:**
```
<ReactLayout>{children}</ReactLayout>
```

---

### Use framework components for interactivity `[Medium]`
React Vue Svelte for complex interactivity

**Applies to:** astro 7.1.6
**Documentation:** [https://docs.astro.build/en/guides/framework-components/](https://docs.astro.build/en/guides/framework-components/)

- **Do:** Framework component with client directive
- **Don't:** Astro component with inline scripts

**Recommended:**
```
<ReactCounter client:load />
```

**Avoid:**
```
<script> in .astro for complex state
```

---

### Pass data via props `[Low]`
Astro components receive props in frontmatter

**Applies to:** astro 7.1.6
**Documentation:** [https://docs.astro.build/en/basics/astro-components/#component-props](https://docs.astro.build/en/basics/astro-components/#component-props)

- **Do:** Astro.props for component data
- **Don't:** Global state for simple data

**Recommended:**
```
const { title } = Astro.props;
```

**Avoid:**
```
Import global store
```

---

### Use slots for composition `[Medium]`
Named and default slots for flexible layouts

**Applies to:** astro 7.1.6
**Documentation:** [https://docs.astro.build/en/basics/astro-components/#slots](https://docs.astro.build/en/basics/astro-components/#slots)

- **Do:** <slot /> for child content
- **Don't:** Props for HTML content

**Recommended:**
```
<slot name="header" />
```

**Avoid:**
```
<Component header={<div>...</div>} />
```

---

### Colocate component styles `[Low]`
Scoped styles in component file

**Applies to:** astro 7.1.6

- **Do:** <style> in same .astro file
- **Don't:** Separate CSS files for component styles

**Recommended:**
```
<style> .card { } </style>
```

**Avoid:**
```
import './Card.css'
```

---

## Styling

### Use scoped styles by default `[Medium]`
Astro scopes styles to component automatically

**Applies to:** astro 7.1.6
**Documentation:** [https://docs.astro.build/en/guides/styling/#scoped-styles](https://docs.astro.build/en/guides/styling/#scoped-styles)

- **Do:** <style> for component-specific styles
- **Don't:** Global styles for everything

**Recommended:**
```
<style> h1 { } </style> (scoped)
```

**Avoid:**
```
<style is:global> for everything
```

---

### Use is:global sparingly `[Medium]`
Global styles only when truly needed

**Applies to:** astro 7.1.6

- **Do:** is:global for base styles or overrides
- **Don't:** is:global for component styles

**Recommended:**
```
<style is:global> body { } </style>
```

**Avoid:**
```
<style is:global> .card { } </style>
```

---

### Integrate Tailwind 4 through Vite `[Low]`
The Astro CLI configures Tailwind 4 with the official Vite plugin

**Applies to:** astro 7.1.6
**Documentation:** [https://docs.astro.build/en/guides/styling/#tailwind](https://docs.astro.build/en/guides/styling/#tailwind)

- **Do:** Use astro add tailwind or configure @tailwindcss/vite
- **Don't:** Add the deprecated @astrojs/tailwind integration

**Recommended:**
```
npx astro add tailwind
```

**Avoid:**
```
@astrojs/tailwind
```

---

### Use CSS variables for theming `[Medium]`
Define tokens in :root

**Applies to:** astro 7.1.6

- **Do:** CSS custom properties for themes
- **Don't:** Hardcoded colors everywhere

**Recommended:**
```
:root { --primary: #3b82f6; }
```

**Avoid:**
```
color: #3b82f6; everywhere
```

---

## Data

### Fetch in frontmatter `[High]`
Data fetching in component frontmatter

**Applies to:** astro 7.1.6
**Documentation:** [https://docs.astro.build/en/guides/data-fetching/](https://docs.astro.build/en/guides/data-fetching/)

- **Do:** Top-level await in frontmatter
- **Don't:** useEffect for initial data

**Recommended:**
```
const data = await fetch(url)
```

**Avoid:**
```
client-side fetch on mount
```

---

### Use Astro.glob for local files `[Medium]`
Import multiple local files

**Applies to:** astro 7.1.6

- **Do:** Astro.glob for markdown/data files
- **Don't:** Manual imports for each file

**Recommended:**
```
const posts = await Astro.glob('./posts/*.md')
```

**Avoid:**
```
import post1; import post2;
```

---

### Prefer content collections over glob `[High]`
Type-safe collections for structured content

**Applies to:** astro 7.1.6
**Documentation:** [https://docs.astro.build/en/guides/content-collections/](https://docs.astro.build/en/guides/content-collections/)

- **Do:** getCollection() for blog/docs
- **Don't:** Astro.glob for structured content

**Recommended:**
```
await getCollection('blog')
```

**Avoid:**
```
await Astro.glob('./blog/*.md')
```

---

### Use environment variables correctly `[High]`
Import.meta.env for env vars

**Applies to:** astro 7.1.6
**Documentation:** [https://docs.astro.build/en/guides/environment-variables/](https://docs.astro.build/en/guides/environment-variables/)

- **Do:** PUBLIC_ prefix for client vars
- **Don't:** Expose secrets to client

**Recommended:**
```
import.meta.env.PUBLIC_API_URL
```

**Avoid:**
```
import.meta.env.SECRET in client
```

---

## Performance

### Preload critical assets `[Medium]`
Use link preload for important resources

**Applies to:** astro 7.1.6

- **Do:** Preload fonts above-fold images
- **Don't:** No preload hints

**Recommended:**
```
<link rel="preload" href="font.woff2" as="font">
```

**Avoid:**
```
No preload for critical assets
```

---

### Optimize images with astro:assets `[High]`
Built-in image optimization

**Applies to:** astro 7.1.6
**Documentation:** [https://docs.astro.build/en/guides/images/](https://docs.astro.build/en/guides/images/)

- **Do:** <Image /> component for optimization
- **Don't:** <img> for local images

**Recommended:**
```
import { Image } from 'astro:assets';
```

**Avoid:**
```
<img src="./image.jpg">
```

---

### Use picture for responsive images `[Medium]`
Multiple formats and sizes

**Applies to:** astro 7.1.6

- **Do:** <Picture /> for art direction
- **Don't:** Single image size for all screens

**Recommended:**
```
<Picture /> with multiple sources
```

**Avoid:**
```
<Image /> with single size
```

---

### Lazy load below-fold content `[Medium]`
Defer loading non-critical content

**Applies to:** astro 7.1.6

- **Do:** loading=lazy for images client:visible for components
- **Don't:** Load everything immediately

**Recommended:**
```
<img loading="lazy">
```

**Avoid:**
```
No lazy loading
```

---

### Minimize client directives `[High]`
Each directive adds JS bundle

**Applies to:** astro 7.1.6
**Documentation:** [https://docs.astro.build/en/reference/directives-reference/#client-directives](https://docs.astro.build/en/reference/directives-reference/#client-directives)

- **Do:** Audit client: usage regularly
- **Don't:** Sprinkle client:load everywhere

**Recommended:**
```
Only interactive components hydrated
```

**Avoid:**
```
Every component with client:load
```

---

## ViewTransitions

### Use ClientRouter for client-side transitions `[Medium]`
Enable Astro client-side routing and transition fallbacks with the current component

**Applies to:** astro 7.1.6
**Documentation:** [https://docs.astro.build/en/guides/view-transitions/](https://docs.astro.build/en/guides/view-transitions/)

- **Do:** <ClientRouter /> in the shared head
- **Don't:** Use removed <ViewTransitions />

**Recommended:**
```
import { ClientRouter } from 'astro:transitions';
```

**Avoid:**
```
<ViewTransitions />
```

---

### Use transition:name `[Low]`
Named elements for morphing

**Applies to:** astro 7.1.6

- **Do:** transition:name for persistent elements
- **Don't:** Unnamed transitions

**Recommended:**
```
<header transition:name="header">
```

**Avoid:**
```
<header> without name
```

---

### Handle transition:persist `[Medium]`
Keep state across navigations

**Applies to:** astro 7.1.6

- **Do:** transition:persist for media players
- **Don't:** Re-initialize on every navigation

**Recommended:**
```
<video transition:persist id="player">
```

**Avoid:**
```
Video restarts on navigation
```

---

### Add fallback for no-JS `[High]`
Graceful degradation

**Applies to:** astro 7.1.6
**Documentation:** [https://docs.astro.build/en/guides/view-transitions/](https://docs.astro.build/en/guides/view-transitions/)

- **Do:** Content works without JS
- **Don't:** Require ClientRouter for basic navigation

**Recommended:**
```
Static content accessible
```

**Avoid:**
```
Broken without client-side routing JS
```

---

## SEO

### Use a shared head component `[High]`
Centralize title canonical and metadata without assuming a built-in SEO component

**Applies to:** astro 7.1.6
**Documentation:** [https://docs.astro.build/en/basics/astro-components/](https://docs.astro.build/en/basics/astro-components/)

- **Do:** Reusable project Head component or explicit head tags
- **Don't:** No metadata or an undocumented built-in SEO API

**Recommended:**
```
<Head title={title} description={description} />
```

**Avoid:**
```
<SEO title={title} /> // package not installed
```

---

### Generate sitemap `[Medium]`
Automatic sitemap generation

**Applies to:** astro 7.1.6
**Documentation:** [https://docs.astro.build/en/guides/integrations-guide/sitemap/](https://docs.astro.build/en/guides/integrations-guide/sitemap/)

- **Do:** @astrojs/sitemap integration
- **Don't:** Manual sitemap maintenance

**Recommended:**
```
npx astro add sitemap
```

**Avoid:**
```
Hand-written sitemap.xml
```

---

### Add RSS feed for content `[Low]`
RSS for blogs and content sites

**Applies to:** astro 7.1.6
**Documentation:** [https://docs.astro.build/en/guides/rss/](https://docs.astro.build/en/guides/rss/)

- **Do:** @astrojs/rss for feed generation
- **Don't:** No RSS feed

**Recommended:**
```
rss() helper in pages/rss.xml.js
```

**Avoid:**
```
No feed for blog
```

---

### Use canonical URLs `[Medium]`
Prevent duplicate content issues

**Applies to:** astro 7.1.6

- **Do:** Astro.url for canonical generation
- **Don't:** No canonical tags

**Recommended:**
```
<link rel="canonical" href={Astro.url}>
```

**Avoid:**
```
No canonical tags
```

---

## Integrations

### Use official integrations `[Medium]`
Astro's integration system

**Applies to:** astro 7.1.6
**Documentation:** [https://docs.astro.build/en/guides/integrations-guide/](https://docs.astro.build/en/guides/integrations-guide/)

- **Do:** npx astro add for integrations
- **Don't:** Manual configuration

**Recommended:**
```
npx astro add react
```

**Avoid:**
```
Manual React setup
```

---

### Configure integrations in astro.config `[Low]`
Centralized configuration

**Applies to:** astro 7.1.6

- **Do:** Supported integrations in the integrations array
- **Don't:** Scattered configuration

**Recommended:**
```
integrations: [react(), sitemap()]
```

**Avoid:**
```
Multiple config files
```

---

### Use adapter for deployment `[High]`
Platform-specific adapters

**Applies to:** astro 7.1.6
**Documentation:** [https://docs.astro.build/en/guides/deploy/](https://docs.astro.build/en/guides/deploy/)

- **Do:** Correct adapter for host
- **Don't:** Wrong or no adapter

**Recommended:**
```
@astrojs/vercel for Vercel
```

**Avoid:**
```
No adapter for SSR
```

---

## TypeScript

### Enable TypeScript `[Medium]`
Type safety for Astro projects

**Applies to:** astro 7.1.6
**Documentation:** [https://docs.astro.build/en/guides/typescript/](https://docs.astro.build/en/guides/typescript/)

- **Do:** tsconfig.json with astro types
- **Don't:** No TypeScript

**Recommended:**
```
Astro TypeScript template
```

**Avoid:**
```
JavaScript only
```

---

### Type component props `[Medium]`
Define prop interfaces

**Applies to:** astro 7.1.6

- **Do:** Props interface in frontmatter
- **Don't:** Untyped props

**Recommended:**
```
interface Props { title: string }
```

**Avoid:**
```
No props typing
```

---

### Use strict mode `[Low]`
Catch errors early

**Applies to:** astro 7.1.6

- **Do:** strict: true in tsconfig
- **Don't:** Loose TypeScript config

**Recommended:**
```
strictest template
```

**Avoid:**
```
base template
```

---

## Markdown

### Use MDX for components `[Medium]`
Components in markdown content

**Applies to:** astro 7.1.6
**Documentation:** [https://docs.astro.build/en/guides/integrations-guide/mdx/](https://docs.astro.build/en/guides/integrations-guide/mdx/)

- **Do:** @astrojs/mdx for interactive docs
- **Don't:** Plain markdown with workarounds

**Recommended:**
```
<Component /> in .mdx
```

**Avoid:**
```
HTML in .md files
```

---

### Configure markdown plugins `[Low]`
Extend markdown capabilities

**Applies to:** astro 7.1.6

- **Do:** remarkPlugins rehypePlugins in config
- **Don't:** Manual HTML for features

**Recommended:**
```
remarkPlugins: [remarkToc]
```

**Avoid:**
```
Manual TOC in every post
```

---

### Use frontmatter for metadata `[Medium]`
Structured post metadata

**Applies to:** astro 7.1.6

- **Do:** Frontmatter with typed schema
- **Don't:** Inline metadata

**Recommended:**
```
title date in frontmatter
```

**Avoid:**
```
# Title as first line
```

---

## API

### Use API routes for endpoints `[Medium]`
Server endpoints in pages/api

**Applies to:** astro 7.1.6
**Documentation:** [https://docs.astro.build/en/guides/endpoints/](https://docs.astro.build/en/guides/endpoints/)

- **Do:** pages/api/[endpoint].ts for APIs
- **Don't:** External API for simple endpoints

**Recommended:**
```
pages/api/posts.json.ts
```

**Avoid:**
```
Separate Express server
```

---

### Return proper responses `[Medium]`
Use Response object

**Applies to:** astro 7.1.6

- **Do:** new Response() with headers
- **Don't:** Plain objects

**Recommended:**
```
return new Response(JSON.stringify(data))
```

**Avoid:**
```
return data
```

---

### Handle methods correctly `[Low]`
Export named method handlers

**Applies to:** astro 7.1.6

- **Do:** export GET POST handlers
- **Don't:** Single default export

**Recommended:**
```
export const GET = async () => {}
```

**Avoid:**
```
export default async () => {}
```

---

## Security

### Sanitize user content `[High]`
Prevent XSS in dynamic content

**Applies to:** astro 7.1.6
**Documentation:** [https://docs.astro.build/en/reference/directives-reference/#sethtml](https://docs.astro.build/en/reference/directives-reference/#sethtml)

- **Do:** set:html only for trusted or sanitized content
- **Don't:** set:html with user input

**Recommended:**
```
<Fragment set:html={sanitized} />
```

**Avoid:**
```
<div set:html={userInput} />
```

---

### Use HTTPS in production `[High]`
Deploy behind a host or proxy that terminates TLS

**Applies to:** astro 7.1.6
**Documentation:** [https://docs.astro.build/en/guides/deploy/](https://docs.astro.build/en/guides/deploy/)

- **Do:** HTTPS for all production sites
- **Don't:** HTTP in production

**Recommended:**
```
https://example.com
```

**Avoid:**
```
http://example.com
```

---

### Validate API input `[High]`
Check and sanitize all input

**Applies to:** astro 7.1.6
**Documentation:** [https://docs.astro.build/en/guides/endpoints/](https://docs.astro.build/en/guides/endpoints/)

- **Do:** Schema validation for endpoint input
- **Don't:** Trust all input

**Recommended:**
```
const body = schema.parse(data)
```

**Avoid:**
```
const body = await request.json()
```

---

## Build

### Mix prerendered and on-demand routes `[Medium]`
Static output supports selected server-rendered routes when an adapter is configured

**Applies to:** astro 7.1.6
**Documentation:** [https://docs.astro.build/en/guides/on-demand-rendering/](https://docs.astro.build/en/guides/on-demand-rendering/)

- **Do:** Keep static output and set prerender false per dynamic route
- **Don't:** Use removed output: 'hybrid'

**Recommended:**
```
export const prerender = false
```

**Avoid:**
```
output: 'hybrid'
```

---

### Analyze bundle size `[Medium]`
Monitor JS bundle impact

**Applies to:** astro 7.1.6

- **Do:** Build output shows bundle sizes
- **Don't:** Ignore bundle growth

**Recommended:**
```
Check astro build output
```

**Avoid:**
```
No size monitoring
```

---

### Configure built-in prefetch `[Low]`
Preload likely next pages with Astro's built-in prefetch configuration

**Applies to:** astro 7.1.6
**Documentation:** [https://docs.astro.build/en/guides/prefetch/](https://docs.astro.build/en/guides/prefetch/)

- **Do:** Set prefetch true or use data-astro-prefetch
- **Don't:** Install the removed prefetch integration

**Recommended:**
```
prefetch: true
```

**Avoid:**
```
npx astro add prefetch
```

---
