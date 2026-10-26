# Loading Skeletons, Micro-Spinners & Shimmer States

Perceived performance is heavily dictated by loading patterns. Pure SaaS uses content-matched skeleton shimmers to eliminate Cumulative Layout Shift (CLS) and reserves spinners for inline actions.

---

## 1. Architectural Principles & Key Aspects

| Aspect / Mechanism | Implementation Specification |
| :--- | :--- |
| **Skeleton Matching** | Skeleton elements mirror the exact dimensions and typography of the incoming content |
| **Shimmer Gradient** | Subtle wave animation with 1.5s - 2s duration; respects prefers-reduced-motion |
| **Delay Thresholds** | Do not render loading indicators for operations that complete within 200ms (avoids flicker) |
| **Button Spinners** | Preserve the original button width while spinning to prevent layout shift |

---

## 2. Implementation Guide

```tsx
// Accessible skeleton primitive
export const Skeleton: React.FC<{ className?: string; rounded?: string }> = ({
  className = 'w-full h-4',
  rounded = 'rounded-md'
}) => (
  <div
    role="status"
    aria-label="Loading..."
    className={`bg-[var(--color-surface-muted)] relative overflow-hidden ${rounded} ${className}`}
  >
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
  </div>
);
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Match skeleton widths and heights precisely to typography and card dimensions. | Never flash a full-page loading spinner for fast AJAX updates. |
| Disable shimmer animation when prefers-reduced-motion is active. | Do not display generic blank rectangles without accessible loading labels. |

---

## 4. Accessibility & Interaction Integrity

- **Include role="status" and visually hidden text ("Loading...") so assistive tech is aware.**

---

## 5. Anti-Slop Discipline

- Avoid distracting, unnecessary motion or confetti effects for mundane actions.
- Ensure keyboard navigation operates identically to pointer interaction.
