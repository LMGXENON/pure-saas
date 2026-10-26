# Pure SaaS Motion and Animation Guide

Motion in Pure SaaS is functional, purposeful, and restrained. It exists to communicate state changes, guide spatial relationships, and provide tactile confirmation—never as gratuitous background decoration.

---

## 1. The Core Motion Rules

1. **Performant Properties Only:** Only animate `transform` (scale, translate) and `opacity`. Never animate `width`, `height`, `top`, `left`, `margin`, or `padding`, which trigger expensive layout recalculation and paint cycles.
2. **Snappy Durations:**
   - Micro-interactions (button press, toggle, checkbox): **100ms – 150ms**.
   - UI Transitions (dropdown open, tooltip appear, tab switch): **150ms – 250ms**.
   - Large Surface Transitions (modal fade-in, drawer slide): **250ms – 350ms**.
   - Never exceed 400ms for routine interface feedback.
3. **Natural Easing Curves:**
   - **Enter (Deceleration):** `cubic-bezier(0.16, 1, 0.3, 1)` (out-expo) or `ease-out`. Elements appear quickly and settle gently.
   - **Exit (Acceleration):** `cubic-bezier(0.7, 0, 0.84, 0)` or `ease-in`. Elements leave promptly without lingering.
   - **Linear:** Use linear curves only for continuous spinners.

---

## 2. Motion Anti-Patterns to Avoid

- **No Perpetual Movement:** Avoid continuously pulsing badges, looping glowing gradients, or hovering elements that distract the reader from content.
- **No Staggered Scroll Delays:** Avoid hiding all text below the fold until the user scrolls, then fading each paragraph in with a 200ms delay. Users read faster than slow staggered animations allow.
- **No Cursor Parallax:** Do not tilt cards or bend headers based on mouse cursor position unless building an interactive 3D media viewer.

---

## 3. Mandatory Accessibility Fallback

Every animation or transition declaration must be disabled when `prefers-reduced-motion: reduce` is detected by the client.

