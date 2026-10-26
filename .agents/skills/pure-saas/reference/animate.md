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
   /* Standard Snappy Spring (Enter / Deceleration) */
   --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
   
   /* Gentle Deceleration */
   --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);

   /* Swift Exit (Acceleration) */
   --ease-in-swift: cubic-bezier(0.7, 0, 0.84, 0);
   ```
3. **Snappy Durations:**
   - Micro-interactions (button press, toggle, checkbox): **100ms – 150ms**.
   - UI Transitions (dropdown open, tooltip appear, tab switch): **150ms – 250ms**.
   - Large Surface Transitions (modal fade-in, drawer slide): **250ms – 350ms**.
   - Never exceed 400ms for routine interface feedback.
4. **Respect `prefers-reduced-motion`:**
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
5. **Hardware Acceleration & GPU Constraints:**
   - Only animate `transform` (scale, translate) and `opacity`.
   - Never animate `width`, `height`, `margin`, `padding`, or `top`/`left`, which trigger costly layout reflows and frame drops.

---

## 2. Motion Anti-Patterns to Ban

- **No Perpetual Movement:** Avoid continuously pulsing badges, looping glowing gradients, or hovering elements that distract the reader from content.
- **No Staggered Scroll Delays:** Avoid hiding all text below the fold until the user scrolls, then fading each paragraph in with a 200ms delay. Users read faster than slow staggered animations allow.
- **No Cursor Parallax:** Do not tilt cards or bend headers based on mouse cursor position unless building an interactive 3D media viewer.

---

## 3. Micro-Interaction Library

- **Button Press:** `active:scale-[0.985] active:translate-y-[0.5px]` with 120ms spring curve.
- **Card Hover:** Subtle upward translation `hover:-translate-y-1` accompanied by ambient shadow bloom and hairline border shift (`border-border-strong`).
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
- **Drawer / Sheet Entrance:** Slide along primary axis (`transform: translateY(0)` from `translateY(100%)`) over 280ms with `--ease-spring`.
