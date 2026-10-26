# Optimize: Core Web Vitals, Virtualization & Rendering Performance

Use `/pure-saas optimize [target]` to diagnose and eliminate UI performance bottlenecks, layout shifts, excessive DOM node counts, and frame drops.

---

## 1. Core Web Vitals Targets

- **Largest Contentful Paint (LCP):** $\le$ 2.5s
- **Cumulative Layout Shift (CLS):** $\le$ 0.1
- **Interaction to Next Paint (INP):** $\le$ 200ms

---

## 2. Key Optimization Strategies

1. **Eliminate Layout Shifts (Zero CLS):**
   - Reserve explicit aspect ratio space for hero images, videos, and 3D canvasses (`aspect-[16/9]` or fixed height skeleton placeholders).
   - Use `font-display: swap` with matched fallback font metrics (`size-adjust`) to avoid layout jumps when web fonts load.
2. **List Virtualization:**
   - Any table or list exceeding 100 items must use windowed virtualization (`@tanstack/react-virtual` or framework equivalent) to maintain a lean DOM.
3. **GPU Layer Constraints:**
   - Never apply `will-change: transform` globally. Apply it only to elements actively being animated, and clean it up on transition completion.
4. **Bundle & Asset Optimization:**
   - Lazy load components below the fold (`React.lazy`, dynamic imports).
   - Convert raster images to modern AVIF/WebP formats with appropriate `sizes` attributes.
