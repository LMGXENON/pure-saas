# Animate: Purposeful Spring Physics & Authored Motion Moments

Use `/pure-saas animate [target]` to implement physics-based spring motion, micro-interactions, and scroll reveals that make software feel alive, responsive, and tactile.

---

## 1. Core Motion Principles

1. **One Authored Moment per Surface:**
   - Great interfaces feature one memorable entrance or interaction moment (e.g., hero canvas reveal, interactive product switch, or animated pricing toggle).
   - Never apply uniform "fade-up" animations to every single paragraph and section down the page. Repeated staggered entrances feel tedious and slow users down.
2. **Physics-Based Spring Curves:**
   - Avoid linear or generic ease-in-out timing functions. Use Apple/Linear-style exponential spring curves:
   ```css
   /* Standard Snappy Spring */
   --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
   
   /* Gentle Deceleration */
   --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
   ```
3. **Respect `prefers-reduced-motion`:**
   - Always wrap motion in accessibility media queries:
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       animation-duration: 0.01ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: 0.01ms !important;
     }
   }
   ```
4. **Hardware Acceleration & GPU Constraints:**
   - Only animate `transform` and `opacity`.
   - Never animate `width`, `height`, `margin`, `padding`, or `top`/`left`, which trigger costly layout reflows and frame drops.

---

## 2. Micro-Interaction Library

- **Button Press:** `active:scale-[0.985] active:translate-y-[0.5px]` with 120ms spring curve.
- **Card Hover:** Subtle upward translation `hover:-translate-y-1` accompanied by ambient shadow bloom.
- **Accordion FAQ Expansion:** CSS grid animation technique:
  ```css
  .accordion-content {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 250ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  .accordion-content[data-open="true"] {
    grid-template-rows: 1fr;
  }
  .accordion-inner {
    overflow: hidden;
  }
  ```

