# Nextjs Implementation & Design Engineering Guide

> Source: Adapted from UI/UX Pro Max Stack Guidelines (`nextjs.csv`)
> Framework: Nextjs
> Rules Count: 60 verified engineering practices

This reference guide provides actionable frontend implementation patterns, anti-slop rules,
accessibility requirements, and code examples for **Nextjs** projects.

---

## Routing

### Use App Router for new projects `[Medium]`
App Router is the recommended approach in Next.js 14+

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/docs/app](https://nextjs.org/docs/app)

- **Do:** app/ directory with page.tsx
- **Don't:** pages/ for new projects

**Recommended:**
```
app/dashboard/page.tsx
```

**Avoid:**
```
pages/dashboard.tsx
```

---

### Use file-based routing `[Medium]`
Create routes by adding files in app directory

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/docs/app/building-your-application/routing](https://nextjs.org/docs/app/building-your-application/routing)

- **Do:** page.tsx for routes layout.tsx for layouts
- **Don't:** Manual route configuration

**Recommended:**
```
app/blog/[slug]/page.tsx
```

**Avoid:**
```
Custom router setup
```

---

### Colocate related files `[Low]`
Keep components styles tests with their routes

**Applies to:** nextjs 16.2

- **Do:** Component files alongside page.tsx
- **Don't:** Separate components folder

**Recommended:**
```
app/dashboard/_components/
```

**Avoid:**
```
components/dashboard/
```

---

### Use route groups for organization `[Low]`
Group routes without affecting URL

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/docs/app/building-your-application/routing/route-groups](https://nextjs.org/docs/app/building-your-application/routing/route-groups)

- **Do:** Parentheses for route groups
- **Don't:** Nested folders affecting URL

**Recommended:**
```
(marketing)/about/page.tsx
```

**Avoid:**
```
marketing/about/page.tsx
```

---

### Handle loading states `[Medium]`
Use loading.tsx for route loading UI

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)

- **Do:** loading.tsx alongside page.tsx
- **Don't:** Manual loading state management

**Recommended:**
```
app/dashboard/loading.tsx
```

**Avoid:**
```
useState for loading in page
```

---

### Handle errors with error.tsx `[High]`
Catch errors at route level

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/docs/app/building-your-application/routing/error-handling](https://nextjs.org/docs/app/building-your-application/routing/error-handling)

- **Do:** error.tsx with reset function
- **Don't:** try/catch in every component

**Recommended:**
```
app/dashboard/error.tsx
```

**Avoid:**
```
try/catch in page component
```

---

## Rendering

### Use Server Components by default `[High]`
Server Components reduce client JS bundle

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/docs/app/building-your-application/rendering/server-components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)

- **Do:** Keep components server by default
- **Don't:** Add 'use client' unnecessarily

**Recommended:**
```
export default function Page()
```

**Avoid:**
```
('use client') for static content
```

---

### Mark Client Components explicitly `[High]`
'use client' for interactive components

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/docs/app/building-your-application/rendering/client-components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)

- **Do:** Add 'use client' only when needed
- **Don't:** Server Component with hooks/events

**Recommended:**
```
('use client') for onClick useState
```

**Avoid:**
```
No directive with useState
```

---

### Push Client Components down `[High]`
Keep Client Components as leaf nodes

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/docs/app/building-your-application/rendering/client-components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)

- **Do:** Client wrapper for interactive parts only
- **Don't:** Mark page as Client Component

**Recommended:**
```
<InteractiveButton/> in Server Page
```

**Avoid:**
```
('use client') on page.tsx
```

---

### Use streaming for better UX `[Medium]`
Stream content with Suspense boundaries

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)

- **Do:** Suspense for slow data fetches
- **Don't:** Wait for all data before render

**Recommended:**
```
<Suspense><SlowComponent/></Suspense>
```

**Avoid:**
```
await allData then render
```

---

### Choose correct rendering strategy `[Medium]`
SSG for static SSR for dynamic ISR for semi-static

**Applies to:** nextjs 16.2

- **Do:** generateStaticParams for known paths
- **Don't:** SSR for static content

**Recommended:**
```
export const revalidate = 3600
```

**Avoid:**
```
fetch without cache config
```

---

## DataFetching

### Fetch data in Server Components `[High]`
Fetch directly in async Server Components

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/docs/app/building-your-application/data-fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)

- **Do:** async function Page() { const data = await fetch() }
- **Don't:** useEffect for initial data

**Recommended:**
```
const data = await fetch(url)
```

**Avoid:**
```
useEffect(() => fetch(url))
```

---

### Configure caching explicitly (Next.js 16.2+) `[High]`
Next.js 16 uses Cache Components and explicit cache directives instead of assuming fetch is the cache model.

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/docs/app/guides/upgrading/version-16](https://nextjs.org/docs/app/guides/upgrading/version-16)

- **Do:** Set cache semantics explicitly for static and dynamic data
- **Don't:** Assume fetch defaults alone define the cache model

**Recommended:**
```
fetch(url, { cache: 'force-cache' })
```

**Avoid:**
```
fetch(url) // Uncached in v15
```

---

### Deduplicate fetch requests `[Low]`
React and Next.js dedupe same requests

**Applies to:** nextjs 16.2

- **Do:** Same fetch call in multiple components
- **Don't:** Manual request deduplication

**Recommended:**
```
Multiple components fetch same URL
```

**Avoid:**
```
Custom cache layer
```

---

### Use Server Actions for mutations `[Medium]`
Server Actions for form submissions

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)

- **Do:** action={serverAction} in forms
- **Don't:** API route for every mutation

**Recommended:**
```
<form action={createPost}>
```

**Avoid:**
```
<form onSubmit={callApiRoute}>
```

---

### Revalidate or update data appropriately `[Medium]`
Use updateTag for immediate read-your-own-writes and revalidateTag(..., "max") for SWR invalidation.

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/docs/app/api-reference/functions/updateTag](https://nextjs.org/docs/app/api-reference/functions/updateTag)

- **Do:** Use updateTag after mutations that should be visible immediately
- **Don't:** Rely on router.refresh() as the default mutation strategy

**Recommended:**
```
revalidatePath('/posts')
```

**Avoid:**
```
router.refresh() everywhere
```

---

## Images

### Use next/image for optimization `[High]`
Automatic image optimization and lazy loading

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/docs/app/building-your-application/optimizing/images](https://nextjs.org/docs/app/building-your-application/optimizing/images)

- **Do:** <Image> component for all images
- **Don't:** <img> tags directly

**Recommended:**
```
<Image src={} alt={} width={} height={}>
```

**Avoid:**
```
<img src={}/>
```

---

### Provide width and height `[High]`
Prevent layout shift with dimensions

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/docs/app/api-reference/components/image](https://nextjs.org/docs/app/api-reference/components/image)

- **Do:** width and height props or fill
- **Don't:** Missing dimensions

**Recommended:**
```
<Image width={400} height={300}/>
```

**Avoid:**
```
<Image src={url}/>
```

---

### Use fill for responsive images `[Medium]`
Fill container with object-fit

**Applies to:** nextjs 16.2

- **Do:** fill prop with relative parent
- **Don't:** Fixed dimensions for responsive

**Recommended:**
```
<Image fill className="object-cover"/>
```

**Avoid:**
```
<Image width={window.width}/>
```

---

### Configure remote image domains `[High]`
Whitelist external image sources

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/docs/app/api-reference/components/image#remotepatterns](https://nextjs.org/docs/app/api-reference/components/image#remotepatterns)

- **Do:** remotePatterns in next.config.js
- **Don't:** Allow all domains

**Recommended:**
```
remotePatterns: [{ hostname: 'cdn.example.com' }]
```

**Avoid:**
```
domains: ['*']
```

---

### Use priority for LCP images `[Medium]`
Mark above-fold images as priority

**Applies to:** nextjs 16.2

- **Do:** priority prop on hero images
- **Don't:** All images with priority

**Recommended:**
```
<Image priority src={hero}/>
```

**Avoid:**
```
<Image priority/> on every image
```

---

## Fonts

### Use next/font for fonts `[Medium]`
Self-hosted fonts with zero layout shift

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/docs/app/building-your-application/optimizing/fonts](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)

- **Do:** next/font/google or next/font/local
- **Don't:** External font links

**Recommended:**
```
import { Inter } from 'next/font/google'
```

**Avoid:**
```
<link href="fonts.googleapis.com"/>
```

---

### Apply font to layout `[Low]`
Set font in root layout for consistency

**Applies to:** nextjs 16.2

- **Do:** className on body in layout.tsx
- **Don't:** Font in individual pages

**Recommended:**
```
<body className={inter.className}>
```

**Avoid:**
```
Each page imports font
```

---

### Use variable fonts `[Low]`
Variable fonts reduce bundle size

**Applies to:** nextjs 16.2

- **Do:** Single variable font file
- **Don't:** Multiple font weights as files

**Recommended:**
```
Inter({ subsets: ['latin'] })
```

**Avoid:**
```
Inter_400 Inter_500 Inter_700
```

---

## Metadata

### Use generateMetadata for dynamic `[Medium]`
Generate metadata based on params

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/docs/app/building-your-application/optimizing/metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)

- **Do:** export async function generateMetadata()
- **Don't:** Hardcoded metadata everywhere

**Recommended:**
```
generateMetadata({ params })
```

**Avoid:**
```
export const metadata = {}
```

---

### Include OpenGraph images `[Medium]`
Add OG images for social sharing

**Applies to:** nextjs 16.2

- **Do:** opengraph-image.tsx or og property
- **Don't:** Missing social preview images

**Recommended:**
```
opengraph: { images: ['/og.png'] }
```

**Avoid:**
```
No OG configuration
```

---

### Use metadata API `[Medium]`
Export metadata object for static metadata

**Applies to:** nextjs 16.2

- **Do:** export const metadata = {}
- **Don't:** Manual head tags

**Recommended:**
```
export const metadata = { title: 'Page' }
```

**Avoid:**
```
<head><title>Page</title></head>
```

---

## API

### Use Route Handlers for APIs `[Medium]`
app/api routes for API endpoints

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/docs/app/building-your-application/routing/route-handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

- **Do:** app/api/users/route.ts
- **Don't:** pages/api for new projects

**Recommended:**
```
export async function GET(request)
```

**Avoid:**
```
export default function handler
```

---

### Return proper Response objects `[Medium]`
Use NextResponse for API responses

**Applies to:** nextjs 16.2

- **Do:** NextResponse.json() for JSON
- **Don't:** Plain objects or res.json()

**Recommended:**
```
return NextResponse.json({ data })
```

**Avoid:**
```
return { data }
```

---

### Handle HTTP methods explicitly `[Low]`
Export named functions for methods

**Applies to:** nextjs 16.2

- **Do:** Export GET POST PUT DELETE
- **Don't:** Single handler for all methods

**Recommended:**
```
export async function POST()
```

**Avoid:**
```
switch(req.method)
```

---

### Validate request body `[High]`
Validate input before processing

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/docs/app/guides/data-security](https://nextjs.org/docs/app/guides/data-security)

- **Do:** Zod or similar for validation
- **Don't:** Trust client input

**Recommended:**
```
const body = schema.parse(await req.json())
```

**Avoid:**
```
const body = await req.json()
```

---

## Middleware

### Use proxy.ts for auth and request guards `[Medium]`
Next.js 16 renamed middleware to proxy to reflect its network-boundary role.

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/docs/app/guides/upgrading/version-16](https://nextjs.org/docs/app/guides/upgrading/version-16)

- **Do:** Use proxy.ts for redirects, rewrites, and lightweight request guards
- **Don't:** Keep new auth logic in middleware.ts

**Recommended:**
```
export function proxy(request)
```

**Avoid:**
```
if (!session) redirect in page
```

---

### Match specific proxy paths `[Medium]`
Configure the proxy matcher

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/docs/app/getting-started/proxy](https://nextjs.org/docs/app/getting-started/proxy)

- **Do:** config.matcher for specific routes
- **Don't:** Run proxy on all routes

**Recommended:**
```
matcher: ['/dashboard/:path*']
```

**Avoid:**
```
No matcher config
```

---

### Keep proxy runtime-safe `[High]`
Proxy runs in nodejs runtime and fetch cache options do not apply there.

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/docs/app/getting-started/proxy](https://nextjs.org/docs/app/getting-started/proxy)

- **Do:** Keep proxy logic lightweight and nodejs-compatible
- **Don't:** Use Node-incompatible code or rely on fetch cache options in proxy

**Recommended:**
```
Edge-compatible auth check
```

**Avoid:**
```
fs.readFile in middleware
```

---

### Use proxy.ts for request interception `[High]`
Next.js 16 renamed middleware to proxy; the proxy runtime is nodejs and fetch cache options have no effect there.

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/docs/app/getting-started/proxy](https://nextjs.org/docs/app/getting-started/proxy)

- **Do:** Use proxy.ts for redirects, rewrites, and lightweight guards
- **Don't:** Assume proxy is edge runtime or use fetch cache semantics there

**Recommended:**
```
export function proxy(request) { return NextResponse.next() }
```

**Avoid:**
```
export function middleware(request) { return NextResponse.next() }
```

---

### Treat middleware.ts and export function middleware as legacy `[High]`
The middleware filename and named export are deprecated in Next.js 16; use proxy.ts and export function proxy instead.

**Applies to:** nextjs legacy
**Documentation:** [https://nextjs.org/docs/app/guides/upgrading/version-16](https://nextjs.org/docs/app/guides/upgrading/version-16)

- **Do:** Rename middleware.ts to proxy.ts during migration
- **Don't:** Introduce new middleware.ts code

**Recommended:**
```
proxy.ts
```

**Avoid:**
```
middleware.ts
```

---

## Environment

### Use NEXT_PUBLIC prefix `[High]`
Client-accessible env vars need prefix

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/docs/app/building-your-application/configuring/environment-variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)

- **Do:** NEXT_PUBLIC_ for client vars
- **Don't:** Server vars exposed to client

**Recommended:**
```
NEXT_PUBLIC_API_URL
```

**Avoid:**
```
API_SECRET in client code
```

---

### Validate env vars `[High]`
Check required env vars exist

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/docs/app/guides/data-security](https://nextjs.org/docs/app/guides/data-security)

- **Do:** Validate on startup
- **Don't:** Undefined env at runtime

**Recommended:**
```
if (!process.env.DATABASE_URL) throw
```

**Avoid:**
```
process.env.DATABASE_URL (might be undefined)
```

---

### Use .env.local for secrets `[High]`
Local env file for development secrets

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/docs/app/guides/data-security](https://nextjs.org/docs/app/guides/data-security)

- **Do:** .env.local gitignored
- **Don't:** Secrets in .env committed

**Recommended:**
```
.env.local with secrets
```

**Avoid:**
```
.env with DATABASE_PASSWORD
```

---

## Performance

### Analyze bundle size `[Medium]`
Use @next/bundle-analyzer

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/docs/app/building-your-application/optimizing/bundle-analyzer](https://nextjs.org/docs/app/building-your-application/optimizing/bundle-analyzer)

- **Do:** Bundle analyzer in dev
- **Don't:** Ship large bundles blindly

**Recommended:**
```
ANALYZE=true npm run build
```

**Avoid:**
```
No bundle analysis
```

---

### Use dynamic imports `[Medium]`
Code split with next/dynamic

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading](https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading)

- **Do:** dynamic() for heavy components
- **Don't:** Import everything statically

**Recommended:**
```
const Chart = dynamic(() => import('./Chart'))
```

**Avoid:**
```
import Chart from './Chart'
```

---

### Avoid layout shifts `[High]`
Reserve space for dynamic content

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/docs/app/api-reference/components/image](https://nextjs.org/docs/app/api-reference/components/image)

- **Do:** Skeleton loaders aspect ratios
- **Don't:** Content popping in

**Recommended:**
```
<Skeleton className="h-48"/>
```

**Avoid:**
```
No placeholder for async content
```

---

### Use Partial Prerendering `[Low]`
Combine static and dynamic in one route

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/docs/app/building-your-application/rendering/partial-prerendering](https://nextjs.org/docs/app/building-your-application/rendering/partial-prerendering)

- **Do:** Static shell with Suspense holes
- **Don't:** Full dynamic or static pages

**Recommended:**
```
Static header + dynamic content
```

**Avoid:**
```
Entire page SSR
```

---

## Link

### Use next/link for navigation `[High]`
Client-side navigation with prefetching

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/docs/app/api-reference/components/link](https://nextjs.org/docs/app/api-reference/components/link)

- **Do:** <Link href=""> for internal links
- **Don't:** <a> for internal navigation

**Recommended:**
```
<Link href="/about">About</Link>
```

**Avoid:**
```
<a href="/about">About</a>
```

---

### Prefetch strategically `[Low]`
Control prefetching behavior

**Applies to:** nextjs 16.2

- **Do:** prefetch={false} for low-priority
- **Don't:** Prefetch all links

**Recommended:**
```
<Link prefetch={false}>
```

**Avoid:**
```
Default prefetch on every link
```

---

### Use scroll option appropriately `[Low]`
Control scroll behavior on navigation

**Applies to:** nextjs 16.2

- **Do:** scroll={false} for tabs pagination
- **Don't:** Always scroll to top

**Recommended:**
```
<Link scroll={false}>
```

**Avoid:**
```
Manual scroll management
```

---

## Config

### Use next.config.ts correctly `[Medium]`
Use current Next.js 16 config names such as cacheComponents and skipProxyUrlNormalize.

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/docs/app/api-reference/next-config-js](https://nextjs.org/docs/app/api-reference/next-config-js)

- **Do:** Proper config options
- **Don't:** Deprecated or wrong options

**Recommended:**
```
images: { remotePatterns: [] }
```

**Avoid:**
```
images: { domains: [] }
```

---

### Enable strict mode `[Medium]`
Catch potential issues early

**Applies to:** nextjs 16.2

- **Do:** reactStrictMode: true
- **Don't:** Strict mode disabled

**Recommended:**
```
reactStrictMode: true
```

**Avoid:**
```
reactStrictMode: false
```

---

### Configure redirects and rewrites `[Medium]`
Use config for URL management

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/docs/app/api-reference/next-config-js/redirects](https://nextjs.org/docs/app/api-reference/next-config-js/redirects)

- **Do:** redirects() rewrites() in config
- **Don't:** Manual redirect handling

**Recommended:**
```
redirects: async () => [...]
```

**Avoid:**
```
res.redirect in pages
```

---

## Deployment

### Use Vercel for easiest deploy `[Low]`
Vercel optimized for Next.js

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/docs/app/building-your-application/deploying](https://nextjs.org/docs/app/building-your-application/deploying)

- **Do:** Deploy to Vercel
- **Don't:** Self-host without knowledge

**Recommended:**
```
vercel deploy
```

**Avoid:**
```
Complex Docker setup for simple app
```

---

### Configure output for self-hosting `[Medium]`
Set output option for deployment target

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/docs/app/building-your-application/deploying#self-hosting](https://nextjs.org/docs/app/building-your-application/deploying#self-hosting)

- **Do:** output: 'standalone' for Docker
- **Don't:** Default output for containers

**Recommended:**
```
output: 'standalone'
```

**Avoid:**
```
No output config for Docker
```

---

## Security

### Sanitize user input `[High]`
Sanitize and validate any user-controlled data before rendering or mutating.

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/docs/app/guides/data-security](https://nextjs.org/docs/app/guides/data-security)

- **Do:** Escape sanitize validate all input
- **Don't:** Direct interpolation of user data

**Recommended:**
```
DOMPurify.sanitize(userInput)
```

**Avoid:**
```
dangerouslySetInnerHTML={{ __html: userInput }}
```

---

### Use CSP headers `[High]`
Content Security Policy for XSS protection

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy](https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy)

- **Do:** Configure CSP in next.config.js
- **Don't:** No security headers

**Recommended:**
```
headers() with CSP
```

**Avoid:**
```
No CSP configuration
```

---

### Validate Server Action input `[High]`
Server Actions are public endpoints, so they need validation and authorization.

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/docs/app/guides/data-security](https://nextjs.org/docs/app/guides/data-security)

- **Do:** Validate and authorize in Server Action
- **Don't:** Trust Server Action input

**Recommended:**
```
Auth check + validation in action
```

**Avoid:**
```
Direct database call without check
```

---

## Caching

### Use Cache Components as the current cache model `[High]`
Cache Components is the current Next.js 16 cache model and the foundation for use cache, cacheLife, cacheTag, and updateTag.

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/blog/next-16](https://nextjs.org/blog/next-16)

- **Do:** Enable cacheComponents for routes that should use the new cache model
- **Don't:** Treat the old fetch-only mental model as the primary cache contract

**Recommended:**
```
const nextConfig = { cacheComponents: true }
```

**Avoid:**
```
const nextConfig = { experimental: { ppr: true } }
```

---

### Use use cache for cacheable functions and components `[High]`
The use cache directive marks a route, component, or function as cacheable under Cache Components.

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/docs/app/api-reference/directives/use-cache](https://nextjs.org/docs/app/api-reference/directives/use-cache)

- **Do:** Place use cache at file, component, or function scope where the result is cacheable
- **Don't:** Cache runtime-sensitive data without passing it in as arguments

**Recommended:**
```
'use cache'
export default async function Page() { }
```

**Avoid:**
```
export default async function Page() { /* uncached by accident */ }
```

---

### Set cache lifetime with cacheLife `[Medium]`
Use cacheLife with use cache to make cache freshness explicit and readable.

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/docs/app/api-reference/functions/cacheLife](https://nextjs.org/docs/app/api-reference/functions/cacheLife)

- **Do:** Choose a cacheLife profile that matches update frequency
- **Don't:** Leave cache behavior implicit when the data has a known freshness window

**Recommended:**
```
cacheLife('days')
```

**Avoid:**
```
/* implicit default */
```

---

### Tag cache entries with cacheTag `[Medium]`
Use cacheTag inside cached scopes to support targeted invalidation.

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/docs/app/api-reference/functions/cacheTag](https://nextjs.org/docs/app/api-reference/functions/cacheTag)

- **Do:** Assign stable tags to cacheable data
- **Don't:** Use broad invalidation when a specific tag is enough

**Recommended:**
```
cacheTag('posts')
```

**Avoid:**
```
/* no tag, broad invalidation later */
```

---

### Use updateTag for read-your-own-writes `[High]`
Use updateTag from Server Actions when the UI must reflect a mutation immediately.

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/docs/app/api-reference/functions/updateTag](https://nextjs.org/docs/app/api-reference/functions/updateTag)

- **Do:** Call updateTag after a successful mutation in a Server Action
- **Don't:** Use updateTag outside Server Actions

**Recommended:**
```
updateTag('cart')
```

**Avoid:**
```
revalidateTag('cart') // when immediate refresh is required
```

---

### Use revalidateTag(..., "max") for SWR invalidation `[High]`
The one-argument revalidateTag form is deprecated; profile="max" is the current stale-while-revalidate contract.

**Applies to:** nextjs 16.2
**Documentation:** [https://nextjs.org/docs/app/api-reference/functions/revalidateTag](https://nextjs.org/docs/app/api-reference/functions/revalidateTag)

- **Do:** Use revalidateTag(tag, "max") for background refresh semantics
- **Don't:** Rely on the deprecated single-argument revalidateTag(tag)

**Recommended:**
```
revalidateTag('posts', 'max')
```

**Avoid:**
```
revalidateTag('posts')
```

---
