# React Server Components (RSC) & Client Boundaries

Next.js and modern React frameworks split applications into Server Components (zero JS bundle) and Client Components (`"use client"` for interactivity).

---

## 1. Architectural Principles & Mechanisms

| Principle / Pattern | Concrete Implementation Detail |
| :--- | :--- |
| **Push Boundaries Down** | Keep parent layouts and data wrappers as Server Components; isolate client interactivity to leaf buttons |
| **Serializable Props** | Pass only JSON-serializable primitives and objects across the server-client boundary |
| **Zero-Bundle Icons** | Render SVG icons on the server to keep client JS bundles lightweight |

---

## 2. Code Implementation Reference

```tsx
// Server Component (Default in Next.js App Router)
import { ClientInteractiveButton } from './ClientButton';

export default async function DashboardPage() {
  const data = await fetchMetrics(); // Direct DB or server fetch

  return (
    <div className="p-8">
      <h1>Production Metrics</h1>
      <StaticMetricsDisplay data={data} />
      <ClientInteractiveButton id={data.id} />
    </div>
  );
}
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Mark only interactive leaf components with `"use client"`. | Never put `"use client"` at the top of the root layout file. |
| Fetch data directly on the server to reduce client-side waterfall latency. |  |

---

## 4. Accessibility & Performance Verification

- **Ensure server-rendered HTML contains full semantic markup and ARIA landmarks before JS hydration.**

---

## 5. Anti-Slop Discipline

- Avoid bloated JavaScript dependencies when standard Web APIs and clean React patterns suffice.
- Ensure component boundaries remain maintainable and strictly typed.
