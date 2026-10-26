# Core Web Vitals Optimization (INP, CLS, LCP)

Google Core Web Vitals directly measure user experience: Interaction to Next Paint (INP < 200ms), Cumulative Layout Shift (CLS < 0.1), and Largest Contentful Paint (LCP < 2.5s).

---

## 1. Architectural Principles & Mechanisms

| Principle / Pattern | Concrete Implementation Detail |
| :--- | :--- |
| **INP (<200ms)** | Yield to main thread using setTimeout or scheduler.yield() during heavy computation |
| **CLS (<0.1)** | Set explicit aspect-ratio and width/height on all images, videos, and dynamic ads |
| **LCP (<2.5s)** | Preload hero images with fetchpriority="high", avoid blocking JavaScript in <head> |

---

## 2. Code Implementation Reference

```tsx
<!-- Zero-CLS image markup with high LCP priority -->
<img
  src="/hero-product.avif"
  alt="Pure SaaS Dashboard Preview"
  width="1200"
  height="675"
  fetchpriority="high"
  decoding="async"
  class="aspect-[16/9] w-full rounded-2xl object-cover"
/>
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Assign explicit width and height attributes to every image and video element. | Never dynamically inject banners above existing content without reserving height. |
| Use `font-display: swap` or `font-display: optional` to eliminate layout shifts on web font load. |  |

---

## 4. Accessibility & Performance Verification

- **Fast-loading accessible HTML ensures immediate availability for screen readers.**

---

## 5. Anti-Slop Discipline

- Avoid bloated JavaScript dependencies when standard Web APIs and clean React patterns suffice.
- Ensure component boundaries remain maintainable and strictly typed.
