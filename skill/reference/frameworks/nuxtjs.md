# Nuxtjs Implementation & Design Engineering Guide

> Source: Adapted from UI/UX Pro Max Stack Guidelines (`nuxtjs.csv`)
> Framework: Nuxtjs
> Rules Count: 67 verified engineering practices

This reference guide provides actionable frontend implementation patterns, anti-slop rules,
accessibility requirements, and code examples for **Nuxtjs** projects.

---

## Routing

### Use file-based routing `[Medium]`
Create routes under the Nuxt 4 app pages directory

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/getting-started/routing](https://nuxt.com/docs/4.x/getting-started/routing)

- **Do:** app/pages with index.vue
- **Don't:** Configure ordinary routes manually

**Recommended:**
```
app/pages/dashboard/index.vue
```

**Avoid:**
```
Custom router setup
```

---

### Use dynamic route parameters `[Medium]`
Create dynamic routes with bracket syntax under app/pages

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/getting-started/routing](https://nuxt.com/docs/4.x/getting-started/routing)

- **Do:** [id].vue for dynamic params
- **Don't:** Hardcode routes for dynamic content

**Recommended:**
```
app/pages/posts/[id].vue
```

**Avoid:**
```
app/pages/posts/post1.vue
```

---

### Use catch-all routes `[Low]`
Handle multiple path segments with [...slug] under app/pages

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/getting-started/routing](https://nuxt.com/docs/4.x/getting-started/routing)

- **Do:** [...slug].vue for catch-all
- **Don't:** Multiply nested dynamic files unnecessarily

**Recommended:**
```
app/pages/[...slug].vue
```

**Avoid:**
```
app/pages/[a]/[b]/[c].vue
```

---

### Define page metadata with definePageMeta `[High]`
Set page-level configuration and middleware

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/api/utils/define-page-meta](https://nuxt.com/docs/4.x/api/utils/define-page-meta)

- **Do:** definePageMeta for layout middleware title
- **Don't:** Manual route meta configuration

**Recommended:**
```
definePageMeta({ layout: 'admin', middleware: 'auth' })
```

**Avoid:**
```
router.beforeEach for page config
```

---

### Use validate for route params `[Medium]`
Validate dynamic route parameters before rendering

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/api/utils/define-page-meta](https://nuxt.com/docs/4.x/api/utils/define-page-meta)

- **Do:** validate function in definePageMeta
- **Don't:** Manual validation in setup

**Recommended:**
```
definePageMeta({ validate: (route) => /^\d+$/.test(route.params.id) })
```

**Avoid:**
```
if (!valid) navigateTo('/404')
```

---

## Rendering

### Use SSR by default `[High]`
Server-side rendering is enabled by default

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/guide/concepts/rendering](https://nuxt.com/docs/4.x/guide/concepts/rendering)

- **Do:** Keep ssr: true (default)
- **Don't:** Disable SSR unnecessarily

**Recommended:**
```
ssr: true (default)
```

**Avoid:**
```
ssr: false for all pages
```

---

### Use .client suffix for client-only components `[Medium]`
Mark components to render only on client

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/guide/directory-structure/components](https://nuxt.com/docs/4.x/guide/directory-structure/components)

- **Do:** ComponentName.client.vue suffix
- **Don't:** v-if with process.client check

**Recommended:**
```
Comments.client.vue
```

**Avoid:**
```
<div v-if="process.client"><Comments/></div>
```

---

### Use .server suffix for server-only components `[Low]`
Mark components to render only on server

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/guide/directory-structure/components](https://nuxt.com/docs/4.x/guide/directory-structure/components)

- **Do:** ComponentName.server.vue suffix
- **Don't:** Manual server check

**Recommended:**
```
HeavyMarkdown.server.vue
```

**Avoid:**
```
v-if="process.server"
```

---

### Use routeRules for per-route rendering `[High]`
Configure prerender SSR SPA redirects headers or cache behavior per route in nuxt.config

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/guide/concepts/rendering#route-rules](https://nuxt.com/docs/4.x/guide/concepts/rendering#route-rules)

- **Do:** routeRules with explicit path patterns
- **Don't:** Scatter rendering decisions through components

**Recommended:**
```
routeRules: { '/blog/**': { isr: 3600 } }
```

**Avoid:**
```
process.client checks for route rendering
```

---

## DataFetching

### Use useFetch for simple data fetching `[High]`
Wrapper around useAsyncData for URL fetching

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/api/composables/use-fetch](https://nuxt.com/docs/4.x/api/composables/use-fetch)

- **Do:** useFetch for API calls
- **Don't:** $fetch in onMounted

**Recommended:**
```
const { data } = await useFetch('/api/posts')
```

**Avoid:**
```
onMounted(async () => { data.value = await $fetch('/api/posts') })
```

---

### Use useAsyncData for complex fetching `[Medium]`
Fine-grained control over async data

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/api/composables/use-async-data](https://nuxt.com/docs/4.x/api/composables/use-async-data)

- **Do:** useAsyncData for CMS or custom fetching
- **Don't:** useFetch for non-URL data sources

**Recommended:**
```
const { data } = await useAsyncData('posts', () => cms.getPosts())
```

**Avoid:**
```
const { data } = await useFetch(() => cms.getPosts())
```

---

### Use $fetch for non-reactive requests `[High]`
$fetch for event handlers and non-component code

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/api/utils/dollarfetch](https://nuxt.com/docs/4.x/api/utils/dollarfetch)

- **Do:** $fetch in event handlers or server routes
- **Don't:** useFetch in click handlers

**Recommended:**
```
async function submit() { await $fetch('/api/submit', { method: 'POST' }) }
```

**Avoid:**
```
async function submit() { await useFetch('/api/submit') }
```

---

### Use lazy option for non-blocking fetch `[Medium]`
Defer data fetching for better initial load

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/api/composables/use-fetch](https://nuxt.com/docs/4.x/api/composables/use-fetch)

- **Do:** lazy: true for below-fold content
- **Don't:** Blocking fetch for non-critical data

**Recommended:**
```
useFetch('/api/comments', { lazy: true })
```

**Avoid:**
```
await useFetch('/api/comments') for footer
```

---

### Use server option intentionally `[Medium]`
Use server:false only when data depends on browser-only state

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/api/composables/use-fetch](https://nuxt.com/docs/4.x/api/composables/use-fetch)

- **Do:** server:false for localStorage or browser APIs
- **Don't:** Disable SSR merely because data is user-specific

**Recommended:**
```
useFetch('/api/preferences', { server: false }) for browser-only input
```

**Avoid:**
```
server:false for any authenticated request
```

---

### Use pick to reduce payload size `[Low]`
Select only needed fields from response

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/api/composables/use-fetch](https://nuxt.com/docs/4.x/api/composables/use-fetch)

- **Do:** pick option for large responses
- **Don't:** Fetching entire objects when few fields needed

**Recommended:**
```
useFetch('/api/user', { pick: ['id', 'name'] })
```

**Avoid:**
```
useFetch('/api/user') then destructure
```

---

### Use transform for data manipulation `[Low]`
Transform data before storing in state

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/api/composables/use-fetch](https://nuxt.com/docs/4.x/api/composables/use-fetch)

- **Do:** transform option for data shaping
- **Don't:** Manual transformation after fetch

**Recommended:**
```
useFetch('/api/posts', { transform: (posts) => posts.map(p => p.title) })
```

**Avoid:**
```
const titles = data.value.map(p => p.title)
```

---

### Handle loading and error states `[High]`
Always handle pending and error states

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/getting-started/data-fetching](https://nuxt.com/docs/4.x/getting-started/data-fetching)

- **Do:** Check status pending error refs
- **Don't:** Ignoring loading states

**Recommended:**
```
<div v-if="status === 'pending'">Loading...</div>
```

**Avoid:**
```
No loading indicator
```

---

### Use enabled for conditional async data `[Medium]`
Gate execution reactively with the enabled option instead of branching around the composable

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/api/composables/use-async-data](https://nuxt.com/docs/4.x/api/composables/use-async-data)

- **Do:** enabled: computed(() => Boolean(userId.value))
- **Don't:** Call useFetch conditionally after setup

**Recommended:**
```
useFetch('/api/user', { enabled: () => Boolean(userId.value) })
```

**Avoid:**
```
if (userId.value) await useFetch('/api/user')
```

---

### Keep async-data handlers pure `[High]`
Keep useAsyncData handlers side-effect free and use stable explicit keys

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/api/composables/use-async-data](https://nuxt.com/docs/4.x/api/composables/use-async-data)

- **Do:** Return a value from a pure handler with consistent options
- **Don't:** Mutate shared state or vary options for one key

**Recommended:**
```
useAsyncData('posts', () => $fetch('/api/posts'))
```

**Avoid:**
```
useAsyncData('posts', async () => { store.count++; })
```

---

### Respect SSR request boundaries `[High]`
Use relative useFetch URLs to proxy safe request headers and cookies; forward only an explicit allowlist to external origins

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/api/utils/dollarfetch](https://nuxt.com/docs/4.x/api/utils/dollarfetch)

- **Do:** useFetch for an internal relative URL
- **Don't:** Assume raw $fetch forwards request context or forward every incoming header

**Recommended:**
```
const { data } = await useFetch('/api/profile')
```

**Avoid:**
```
$fetch(externalUrl, { headers: useRequestHeaders() })
```

---

## Lifecycle

### Avoid side effects in script setup root `[High]`
Move side effects to lifecycle hooks

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/guide/concepts/nuxt-lifecycle](https://nuxt.com/docs/4.x/guide/concepts/nuxt-lifecycle)

- **Do:** Side effects in onMounted
- **Don't:** setInterval in root script setup

**Recommended:**
```
onMounted(() => { interval = setInterval(...) })
```

**Avoid:**
```
<script setup>setInterval(...)</script>
```

---

### Use onMounted for DOM access `[High]`
Access DOM only after component is mounted

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/api/composables/on-mounted](https://nuxt.com/docs/4.x/api/composables/on-mounted)

- **Do:** onMounted for DOM manipulation
- **Don't:** Direct DOM access in setup

**Recommended:**
```
onMounted(() => { document.getElementById('el') })
```

**Avoid:**
```
<script setup>document.getElementById('el')</script>
```

---

### Use nextTick for post-render access `[Medium]`
Wait for DOM updates before accessing elements

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/api/utils/next-tick](https://nuxt.com/docs/4.x/api/utils/next-tick)

- **Do:** await nextTick() after state changes
- **Don't:** Immediate DOM access after state change

**Recommended:**
```
count.value++; await nextTick(); el.value.focus()
```

**Avoid:**
```
count.value++; el.value.focus()
```

---

### Use onPrehydrate for pre-hydration logic `[Low]`
Run code before Nuxt hydrates the page

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/api/composables/on-prehydrate](https://nuxt.com/docs/4.x/api/composables/on-prehydrate)

- **Do:** onPrehydrate for client setup
- **Don't:** onMounted for hydration-critical code

**Recommended:**
```
onPrehydrate(() => { console.log(window) })
```

**Avoid:**
```
onMounted for pre-hydration needs
```

---

## Server

### Use server/api for API routes `[High]`
Create API endpoints in server/api directory

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/guide/directory-structure/server](https://nuxt.com/docs/4.x/guide/directory-structure/server)

- **Do:** server/api/users.ts for /api/users
- **Don't:** Manual Express setup

**Recommended:**
```
server/api/hello.ts -> /api/hello
```

**Avoid:**
```
app.get('/api/hello')
```

---

### Use defineEventHandler for handlers `[High]`
Define server route handlers

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/guide/directory-structure/server](https://nuxt.com/docs/4.x/guide/directory-structure/server)

- **Do:** defineEventHandler for all handlers
- **Don't:** export default function

**Recommended:**
```
export default defineEventHandler((event) => { return { hello: 'world' } })
```

**Avoid:**
```
export default function(req, res) {}
```

---

### Use server/routes for non-api routes `[Medium]`
Routes without /api prefix

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/guide/directory-structure/server](https://nuxt.com/docs/4.x/guide/directory-structure/server)

- **Do:** server/routes for custom paths
- **Don't:** server/api for non-api routes

**Recommended:**
```
server/routes/sitemap.xml.ts
```

**Avoid:**
```
server/api/sitemap.xml.ts
```

---

### Use getQuery and readBody for input `[Medium]`
Access query params and request body

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/guide/directory-structure/server](https://nuxt.com/docs/4.x/guide/directory-structure/server)

- **Do:** getQuery(event) readBody(event)
- **Don't:** Direct event access

**Recommended:**
```
const { id } = getQuery(event)
```

**Avoid:**
```
event.node.req.query
```

---

### Validate server input `[High]`
Always validate input in server handlers

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/guide/directory-structure/server](https://nuxt.com/docs/4.x/guide/directory-structure/server)

- **Do:** Zod or similar for validation
- **Don't:** Trust client input

**Recommended:**
```
const body = await readBody(event); schema.parse(body)
```

**Avoid:**
```
const body = await readBody(event)
```

---

## State

### Use useState for serializable shared state `[High]`
Share SSR-safe values whose contents can be serialized

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/api/composables/use-state](https://nuxt.com/docs/4.x/api/composables/use-state)

- **Do:** useState for JSON-serializable cross-component state
- **Don't:** Store classes functions or symbols

**Recommended:**
```
const count = useState('count', () => 0)
```

**Avoid:**
```
useState('service' () => new Service())
```

---

### Use unique keys for useState `[Medium]`
Prevent state conflicts with unique keys

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/api/composables/use-state](https://nuxt.com/docs/4.x/api/composables/use-state)

- **Do:** Descriptive unique keys for each state
- **Don't:** Generic or duplicate keys

**Recommended:**
```
useState('user-preferences', () => ({}))
```

**Avoid:**
```
useState('data') in multiple places
```

---

### Use Pinia for complex state `[Medium]`
Pinia for advanced state management

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/getting-started/state-management](https://nuxt.com/docs/4.x/getting-started/state-management)

- **Do:** @pinia/nuxt for complex apps
- **Don't:** Custom state management

**Recommended:**
```
useMainStore() with Pinia
```

**Avoid:**
```
Custom reactive store implementation
```

---

### Use callOnce for one-time async operations `[Medium]`
Ensure async operations run only once

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/api/utils/call-once](https://nuxt.com/docs/4.x/api/utils/call-once)

- **Do:** callOnce for store initialization
- **Don't:** Direct await in component

**Recommended:**
```
await callOnce(store.fetch)
```

**Avoid:**
```
await store.fetch() on every render
```

---

### Use useCookie for SSR-safe cookies `[High]`
Read and write cookies through the SSR-aware useCookie ref with explicit security options

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/api/composables/use-cookie](https://nuxt.com/docs/4.x/api/composables/use-cookie)

- **Do:** useCookie with sameSite secure and httpOnly where server-only
- **Don't:** Read document.cookie during SSR

**Recommended:**
```
useCookie('session', { sameSite: 'lax', secure: true })
```

**Avoid:**
```
document.cookie
```

---

### Refresh externally changed cookies `[Medium]`
Call refreshCookie when a cookie changes outside the useCookie ref

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/api/utils/refresh-cookie](https://nuxt.com/docs/4.x/api/utils/refresh-cookie)

- **Do:** refreshCookie after an external auth refresh
- **Don't:** Assume the ref observes every external change

**Recommended:**
```
await refreshCookie('session')
```

**Avoid:**
```
Keep stale session.value after external refresh
```

---

### Replace shallow-watched cookie values `[Medium]`
When cookie watch is shallow replace the top-level value to trigger serialization

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/api/composables/use-cookie](https://nuxt.com/docs/4.x/api/composables/use-cookie)

- **Do:** Assign a new object or array
- **Don't:** Mutate a nested property in place with watch:'shallow'

**Recommended:**
```
prefs.value = { ...prefs.value, theme: 'dark' }
```

**Avoid:**
```
prefs.value.theme = 'dark'
```

---

## SEO

### Use useSeoMeta for SEO tags `[High]`
Type-safe SEO meta tag management

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/api/composables/use-seo-meta](https://nuxt.com/docs/4.x/api/composables/use-seo-meta)

- **Do:** useSeoMeta for meta tags
- **Don't:** useHead for simple meta

**Recommended:**
```
useSeoMeta({ title: 'Home', ogTitle: 'Home', description: '...' })
```

**Avoid:**
```
useHead({ meta: [{ name: 'description', content: '...' }] })
```

---

### Use reactive values in useSeoMeta `[Medium]`
Dynamic SEO tags with refs or getters

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/api/composables/use-seo-meta](https://nuxt.com/docs/4.x/api/composables/use-seo-meta)

- **Do:** Computed getters for dynamic values
- **Don't:** Static values for dynamic content

**Recommended:**
```
useSeoMeta({ title: () => post.value.title })
```

**Avoid:**
```
useSeoMeta({ title: post.value.title })
```

---

### Use useHead for non-meta head elements `[Medium]`
Scripts styles links in head

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/api/composables/use-head](https://nuxt.com/docs/4.x/api/composables/use-head)

- **Do:** useHead for scripts and links
- **Don't:** useSeoMeta for scripts

**Recommended:**
```
useHead({ script: [{ src: '/analytics.js' }] })
```

**Avoid:**
```
useSeoMeta({ script: '...' })
```

---

### Include OpenGraph tags `[Medium]`
Add OG tags for social sharing

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/api/composables/use-seo-meta](https://nuxt.com/docs/4.x/api/composables/use-seo-meta)

- **Do:** ogTitle ogDescription ogImage
- **Don't:** Missing social preview

**Recommended:**
```
useSeoMeta({ ogImage: '/og.png', twitterCard: 'summary_large_image' })
```

**Avoid:**
```
No OG configuration
```

---

## Middleware

### Use defineNuxtRouteMiddleware `[High]`
Define route middleware under app/middleware

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/guide/directory-structure/app/middleware](https://nuxt.com/docs/4.x/guide/directory-structure/app/middleware)

- **Do:** defineNuxtRouteMiddleware wrapper in app/middleware
- **Don't:** Put route middleware in server/middleware

**Recommended:**
```
export default defineNuxtRouteMiddleware((to, from) => {})
```

**Avoid:**
```
export default function(to, from) {}
```

---

### Use navigateTo for redirects `[High]`
Redirect in middleware with navigateTo

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/api/utils/navigate-to](https://nuxt.com/docs/4.x/api/utils/navigate-to)

- **Do:** return navigateTo('/login')
- **Don't:** router.push in middleware

**Recommended:**
```
if (!auth) return navigateTo('/login')
```

**Avoid:**
```
if (!auth) router.push('/login')
```

---

### Reference middleware in definePageMeta `[Medium]`
Apply app/middleware entries to specific pages

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/guide/directory-structure/app/middleware](https://nuxt.com/docs/4.x/guide/directory-structure/app/middleware)

- **Do:** middleware array in definePageMeta
- **Don't:** Use global middleware for a page-specific concern

**Recommended:**
```
definePageMeta({ middleware: ['auth'] })
```

**Avoid:**
```
Global auth check for one page
```

---

### Use .global suffix for global middleware `[Medium]`
Apply named route middleware globally with .global and keep it idempotent because initial SSR middleware can run again during hydration

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/guide/directory-structure/app/middleware](https://nuxt.com/docs/4.x/guide/directory-structure/app/middleware)

- **Do:** app/middleware/auth.global.ts with repeat-safe logic
- **Don't:** Assume it runs exactly once

**Recommended:**
```
app/middleware/auth.global.ts
```

**Avoid:**
```
Increment state unconditionally on every middleware run
```

---

## ErrorHandling

### Use createError for errors `[High]`
Create errors with proper status codes

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/api/utils/create-error](https://nuxt.com/docs/4.x/api/utils/create-error)

- **Do:** createError with statusCode
- **Don't:** throw new Error

**Recommended:**
```
throw createError({ statusCode: 404, statusMessage: 'Not Found' })
```

**Avoid:**
```
throw new Error('Not Found')
```

---

### Use NuxtErrorBoundary for local errors `[Medium]`
Handle errors within component subtree

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/getting-started/error-handling](https://nuxt.com/docs/4.x/getting-started/error-handling)

- **Do:** NuxtErrorBoundary for component errors
- **Don't:** Global error page for local errors

**Recommended:**
```
<NuxtErrorBoundary @error="log"><template #error="{ error }">
```

**Avoid:**
```
error.vue for component errors
```

---

### Use clearError to recover from errors `[Medium]`
Clear error state and optionally redirect

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/api/utils/clear-error](https://nuxt.com/docs/4.x/api/utils/clear-error)

- **Do:** clearError({ redirect: '/' })
- **Don't:** Manual error state reset

**Recommended:**
```
clearError({ redirect: '/home' })
```

**Avoid:**
```
error.value = null
```

---

### Use short statusMessage `[High]`
Keep statusMessage brief for security

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/getting-started/error-handling](https://nuxt.com/docs/4.x/getting-started/error-handling)

- **Do:** Short generic messages
- **Don't:** Detailed error info in statusMessage

**Recommended:**
```
createError({ statusCode: 400, statusMessage: 'Bad Request' })
```

**Avoid:**
```
createError({ statusMessage: 'Invalid user ID: 123' })
```

---

## Link

### Use NuxtLink for internal navigation `[High]`
Client-side navigation with prefetching

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/api/components/nuxt-link](https://nuxt.com/docs/4.x/api/components/nuxt-link)

- **Do:** <NuxtLink to> for internal links
- **Don't:** <a href> for internal links

**Recommended:**
```
<NuxtLink to="/about">About</NuxtLink>
```

**Avoid:**
```
<a href="/about">About</a>
```

---

### Configure prefetch behavior `[Low]`
Control when prefetching occurs

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/api/components/nuxt-link](https://nuxt.com/docs/4.x/api/components/nuxt-link)

- **Do:** prefetchOn for interaction-based
- **Don't:** Default prefetch for low-priority

**Recommended:**
```
<NuxtLink prefetch-on="interaction">
```

**Avoid:**
```
Always default prefetch
```

---

### Use useRouter for programmatic navigation `[Medium]`
Navigate programmatically

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/api/composables/use-router](https://nuxt.com/docs/4.x/api/composables/use-router)

- **Do:** useRouter().push() for navigation
- **Don't:** Direct window.location

**Recommended:**
```
const router = useRouter(); router.push('/dashboard')
```

**Avoid:**
```
window.location.href = '/dashboard'
```

---

### Use navigateTo in composables `[Medium]`
Navigate outside components

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/api/utils/navigate-to](https://nuxt.com/docs/4.x/api/utils/navigate-to)

- **Do:** navigateTo() in middleware or plugins
- **Don't:** useRouter in non-component code

**Recommended:**
```
return navigateTo('/login')
```

**Avoid:**
```
router.push in middleware
```

---

## AutoImports

### Use Nuxt auto-imports intentionally `[Medium]`
Use auto-imported Nuxt composables and Vue APIs or explicit imports consistently

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/guide/concepts/auto-imports](https://nuxt.com/docs/4.x/guide/concepts/auto-imports)

- **Do:** Direct use of useFetch and ref where auto-imports are enabled
- **Don't:** Treat valid explicit Vue imports as an error

**Recommended:**
```
const count = ref(0)
```

**Avoid:**
```
Mix unresolved globals after disabling imports
```

---

### Use #imports for explicit Nuxt imports `[Low]`
Import Nuxt-provided composables from #imports when an explicit import is useful

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/guide/concepts/auto-imports](https://nuxt.com/docs/4.x/guide/concepts/auto-imports)

- **Do:** import useRuntimeConfig from #imports
- **Don't:** Import Nuxt virtual composables from arbitrary package paths

**Recommended:**
```
import { useRuntimeConfig } from '#imports'
```

**Avoid:**
```
import { useRuntimeConfig } from 'nuxt'
```

---

### Configure third-party auto-imports `[Low]`
Add external package auto-imports

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/guide/concepts/auto-imports](https://nuxt.com/docs/4.x/guide/concepts/auto-imports)

- **Do:** imports.presets in nuxt.config
- **Don't:** Manual imports everywhere

**Recommended:**
```
imports: { presets: [{ from: 'vue-i18n', imports: ['useI18n'] }] }
```

**Avoid:**
```
import { useI18n } everywhere
```

---

## Plugins

### Use defineNuxtPlugin `[High]`
Define plugins properly

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/guide/directory-structure/plugins](https://nuxt.com/docs/4.x/guide/directory-structure/plugins)

- **Do:** defineNuxtPlugin wrapper
- **Don't:** export default function

**Recommended:**
```
export default defineNuxtPlugin((nuxtApp) => {})
```

**Avoid:**
```
export default function(ctx) {}
```

---

### Use provide for injection `[Medium]`
Provide helpers across app

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/guide/directory-structure/plugins](https://nuxt.com/docs/4.x/guide/directory-structure/plugins)

- **Do:** return { provide: {} } for type safety
- **Don't:** nuxtApp.provide without types

**Recommended:**
```
return { provide: { hello: (name) => `Hello ${name}!` } }
```

**Avoid:**
```
nuxtApp.provide('hello', fn)
```

---

### Use .client or .server suffix `[Medium]`
Control plugin execution environment

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/guide/directory-structure/plugins](https://nuxt.com/docs/4.x/guide/directory-structure/plugins)

- **Do:** plugin.client.ts for client-only
- **Don't:** if (process.client) checks

**Recommended:**
```
analytics.client.ts
```

**Avoid:**
```
if (process.client) { // analytics }
```

---

## Environment

### Use runtimeConfig for env vars `[High]`
Access environment variables safely

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/guide/going-further/runtime-config](https://nuxt.com/docs/4.x/guide/going-further/runtime-config)

- **Do:** runtimeConfig in nuxt.config
- **Don't:** process.env directly

**Recommended:**
```
runtimeConfig: { apiSecret: '', public: { apiBase: '' } }
```

**Avoid:**
```
process.env.API_SECRET in components
```

---

### Declare keys before NUXT_ overrides `[High]`
Declare every runtimeConfig key in nuxt.config before overriding it with a matching NUXT_ environment variable

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/guide/going-further/runtime-config](https://nuxt.com/docs/4.x/guide/going-further/runtime-config)

- **Do:** Declared apiSecret and public.apiBase keys plus NUXT_API_SECRET or NUXT_PUBLIC_API_BASE
- **Don't:** Expect an undeclared environment variable to create config

**Recommended:**
```
NUXT_PUBLIC_API_BASE=https://api.example.com after declaring public.apiBase
```

**Avoid:**
```
API_BASE=https://api.example.com
```

---

### Access public config with useRuntimeConfig `[High]`
Get public config in components

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/api/composables/use-runtime-config](https://nuxt.com/docs/4.x/api/composables/use-runtime-config)

- **Do:** useRuntimeConfig().public
- **Don't:** Direct process.env access

**Recommended:**
```
const config = useRuntimeConfig(); config.public.apiBase
```

**Avoid:**
```
process.env.NUXT_PUBLIC_API_BASE
```

---

### Keep secrets in private config `[High]`
Server-only secrets in runtimeConfig root

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/guide/going-further/runtime-config](https://nuxt.com/docs/4.x/guide/going-further/runtime-config)

- **Do:** runtimeConfig.apiSecret (server only)
- **Don't:** Secrets in public config

**Recommended:**
```
runtimeConfig: { dbPassword: '' }
```

**Avoid:**
```
runtimeConfig: { public: { dbPassword: '' } }
```

---

## Performance

### Use Lazy prefix for code splitting `[Medium]`
Lazy load components with Lazy prefix

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/guide/directory-structure/components](https://nuxt.com/docs/4.x/guide/directory-structure/components)

- **Do:** <LazyComponent> for below-fold
- **Don't:** Eager load all components

**Recommended:**
```
<LazyMountainsList v-if="show"/>
```

**Avoid:**
```
<MountainsList/> for hidden content
```

---

### Use useLazyFetch for non-blocking data `[Medium]`
Alias for useFetch with lazy: true

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/api/composables/use-lazy-fetch](https://nuxt.com/docs/4.x/api/composables/use-lazy-fetch)

- **Do:** useLazyFetch for secondary data
- **Don't:** useFetch for all requests

**Recommended:**
```
const { data } = useLazyFetch('/api/comments')
```

**Avoid:**
```
await useFetch for comments section
```

---

### Use lazy hydration for interactivity `[Low]`
Delay component hydration until needed

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/guide/going-further/experimental-features](https://nuxt.com/docs/4.x/guide/going-further/experimental-features)

- **Do:** LazyComponent with hydration strategy
- **Don't:** Immediate hydration for all

**Recommended:**
```
<LazyModal hydrate-on-visible/>
```

**Avoid:**
```
<Modal/> in footer
```

---

## Configuration

### Separate app config from runtime config `[High]`
Use app.config for public reactive build-time app values and runtimeConfig for environment or secrets

**Applies to:** nuxtjs 4.5
**Documentation:** [https://nuxt.com/docs/4.x/guide/directory-structure/app/app-config](https://nuxt.com/docs/4.x/guide/directory-structure/app/app-config)

- **Do:** defineAppConfig for theme and runtimeConfig for API secrets
- **Don't:** Put secrets in app.config

**Recommended:**
```
defineAppConfig({ theme: { primary: 'blue' } })
```

**Avoid:**
```
defineAppConfig({ apiSecret: process.env.API_SECRET })
```

---

## Migration

### Migrate Nuxt 3 before adding Nuxt 4 features `[High]`
Nuxt 3 is end-of-life; use Nuxt 4 compatibility mode to surface directory app-config runtime-config and API changes

**Applies to:** nuxtjs legacy 3.x
**Documentation:** [https://nuxt.com/blog/v4-5](https://nuxt.com/blog/v4-5)

- **Do:** Enable compatibilityVersion 4 and resolve migration warnings
- **Don't:** Keep an unmaintained Nuxt 3 app while adopting Nuxt 4-only guidance

**Recommended:**
```
future: { compatibilityVersion: 4 }
```

**Avoid:**
```
// Nuxt 3 retained without an upgrade plan
```

---
