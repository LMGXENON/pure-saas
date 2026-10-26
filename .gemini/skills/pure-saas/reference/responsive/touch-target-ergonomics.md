# Mobile Touch Ergonomics & Thumb Zones

Mobile interfaces must place primary actions within natural one-handed thumb reach zones while avoiding awkward top-corner stretches.

---

## 1. Responsive Viewports & Architecture

| Viewport / Dimension | Technical Specification |
| :--- | :--- |
| **Natural Thumb Zone** | Bottom third of the screen accommodates primary action buttons and navigation bars |
| **Hard-to-Reach Zone** | Top screen corners reserved for infrequent navigation back or settings icons |
| **Hit Target Expansion** | Minimum 44x44px clickable bounding box |

---

## 2. Code Implementation Reference

```css
/* Bottom sticky mobile action bar */
<div className="fixed bottom-0 left-0 right-0 p-4 bg-[var(--color-surface-base)] border-t border-[var(--color-border-subtle)] md:hidden z-30">
  <button className="w-full h-12 rounded-xl bg-[var(--color-accent-primary)] text-white font-semibold text-sm shadow-lg">
    Complete Checkout ($129)
  </button>
</div>
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Position primary transactional CTAs in a sticky bottom bar on mobile. | Never force mobile users to stretch to the top left corner for routine primary actions. |
| Ensure bottom bars respect iOS safe area insets (`env(safe-area-inset-bottom)`). |  |

---

## 4. Accessibility & Viewport Reflow

- **WCAG 2.5.8 Target Size Minimum.**

---

## 5. Anti-Slop Enforcement

- Eliminate horizontal scrollbars on mobile; ensure layouts reflow smoothly down to 320px.
