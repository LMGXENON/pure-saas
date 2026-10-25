# Pure SaaS Accessibility Guide (WCAG 2.2 AA)

Pure SaaS mandates compliance with **WCAG 2.2 Level AA** standards for all generated web interfaces. An interface that is inaccessible is incomplete.

---

## 1. Contrast Ratios

- **Normal Text (below 18pt / 24px, or below 14pt / 18.5px bold):** Minimum contrast ratio of **4.5:1** against the background.
- **Large Text (at least 18pt / 24px, or 14pt / 18.5px bold):** Minimum contrast ratio of **3.0:1** against the background.
- **UI Components & Graphical Objects (WCAG 2.2 Non-text contrast):** Form input borders, active toggles, icons required for understanding, and focus rings must achieve at least **3.0:1** against adjacent colors.

---

## 2. Keyboard Navigation & Focus Order

- **Logical Tab Order:** DOM source order must match visual reading order. Never rearrange interactive elements visually with flexbox/grid `order` in ways that contradict keyboard navigation.
- **Visible Focus Indicator:** High-contrast focus outline must be visible on every focusable element. Never remove `:focus` or `:focus-visible` without styling a custom visible ring.
- **Skip Links:** Include a `<a href="#main-content" class="sr-only focus:not-sr-only">Skip to main content</a>` at the very top of pages with heavy navigation headers.

---

## 3. Semantic HTML & ARIA Landmarks

Prefer semantic HTML over generic `div` soup with ARIA attributes:
- Use `<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`, `<footer>`.
- Headings must follow a strict sequential hierarchy (`h1` -> `h2` -> `h3`). Never skip heading levels (e.g. jumping from `h1` directly to `h4`).
- Use `<button>` for actions, `<a>` for navigation. Never put `onClick` handlers on `<div>` or `<span>` without role, tabindex, and keyboard event handlers.

---

## 4. Forms and Error Associations

- Every input must have a programmatically linked `<label>`:
  ```html
  <label for="email-address">Email address</label>
  <input id="email-address" type="email" aria-describedby="email-error" />
  <span id="email-error" role="alert" class="text-error">Please enter a valid work email.</span>
  ```
- Error messages must use `role="alert"` or `aria-live="polite"` so screen readers announce validation failures immediately.

---

## 5. Reduced Motion Preferences

All CSS transitions, animations, and smooth scrolling must respect `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 6. Honest Accessibility Verification

- Automated linters and test tools (axe, pa11y, lighthouse) catch approximately 30%–40% of accessibility defects.
- **Never report 100% WCAG conformance solely based on an automated scan.** Document clearly:
  - What automated checks were run.
  - What manual keyboard and screen reader checks were performed.
  - What remains unverified.
