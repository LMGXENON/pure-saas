# Pure SaaS: /pure-saas accessible

Improve accessibility (WCAG 2.2 AA) and inclusive interaction across markup, styling, and behavior.

## Usage

```bash
/pure-saas accessible [request]
# or
/pure-saas:accessible [request]
```

**Target Scope:** `$ARGUMENTS`

---

## Operational Instructions

1. **Evaluate Across WCAG 2.2 AA Criteria:**
   - **Semantic Landmarks:** Ensure valid HTML5 landmark structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<aside>`) (`references/accessibility.md`).
   - **Keyboard Navigation & Focus:** All interactive elements must be reachable via `Tab` key, have visible focus rings (`outline: 2px solid var(--color-border-focus); outline-offset: 2px`), and never trap focus unintentionally.
   - **Color Contrast:** Normal text must achieve ≥ 4.5:1 contrast against its background; large text (≥18pt or bold ≥14pt) and UI component boundaries must achieve ≥ 3:1.
   - **Forms & Inputs:** Associate all form fields with explicit `<label>` tags; provide `aria-describedby` for error messages and field hints.
   - **Screen Reader Support:** Add descriptive `aria-label` or `sr-only` text for icon-only buttons; ensure modal dialogs set `aria-modal="true"` and manage focus on open/close.
   - **Motion Preferences:** Enforce `@media (prefers-reduced-motion: reduce)` to disable non-essential animations.
   - **Touch Targets:** Minimum 44x44px bounding box for all interactive controls on touch devices.
2. **Remediate Directly:** Fix discovered accessibility defects directly in HTML, CSS, and component files while strictly preserving application behavior and APIs.
3. **Honest Verification & Limitations:** Run available automated checks (e.g. axe, Lighthouse) alongside manual DOM inspection. Never treat passing an automated scan as proof of complete accessibility; report manual testing limitations honestly.
