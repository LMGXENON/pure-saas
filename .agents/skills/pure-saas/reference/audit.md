# Forensic Deterministic Audit: 5-Dimension Matrix & Defect Triage

Use this playbook to evaluate an interface or codebase with scientific objectivity. Unlike subjective design critiques, the Pure SaaS audit measures concrete, verifiable code and layout properties across 5 core dimensions, scored 0–4 points each (20 points maximum).

---

## 1. The 5 Dimensions & Scoring Matrix

```
┌─────────────────────────────────┬───────┬──────────────────────────────────────────┐
│ Dimension                       │ Max   │ Core Evaluation Focus                    │
├─────────────────────────────────┼───────┼──────────────────────────────────────────┤
│ 1. Accessibility (A11y)         │ 4.0   │ WCAG 2.2 AA contrast, focus rings, a11y  │
│ 2. Performance & Rendering      │ 4.0   │ Transitions, layout shifts, CLS, paints  │
│ 3. Theming & Token System       │ 4.0   │ Zero raw hex codes, semantic token use   │
│ 4. Responsive Design & Touch    │ 4.0   │ Zero overflow, 44px touch, fluid clamp   │
│ 5. Implementation Integrity     │ 4.0   │ Console errors, HTML semantics, states   │
├─────────────────────────────────┼───────┼──────────────────────────────────────────┤
│ TOTAL COMPOSITE SCORE           │ 20.0  │ Rating: 18-20 Excellent | 15-17 Good     │
│                                 │       │         12-14 Acceptable | <12 Critical  │
└─────────────────────────────────┴───────┴──────────────────────────────────────────┘
```

### Dimension 1: Accessibility (A11y)
- **Check 1.1:** Body text contrast $\ge$ 4.5:1 against background; large text $\ge$ 3:1.
- **Check 1.2:** Interactive elements maintain visible focus indicators (`:focus-visible`). Focus outlines must never be suppressed without an explicit replacement.
- **Check 1.3:** Form controls have associated `<label>` elements or accessible `aria-label`.
- **Check 1.4:** Interactive icons carry accessible text or `aria-hidden="true"` with sibling label.
- **Check 1.5:** Touch targets on mobile viewports are at least 44x44 CSS pixels.

### Dimension 2: Performance & Rendering
- **Check 2.1:** No unbounded layout transitions (`transition: all` or transitioning `width`, `height`, `margin`, `padding`). Transitions are restricted to `opacity` and `transform`.
- **Check 2.2:** No overuse of static `will-change`. `will-change` is applied only during active transitions and removed on complete.
- **Check 2.3:** Large images use responsive `srcset` and proper aspect-ratio boxes to prevent Cumulative Layout Shift (CLS).
- **Check 2.4:** Third-party fonts are self-hosted with `font-display: swap` to prevent FOIT.

### Dimension 3: Theming & Token System
- **Check 3.1:** Zero raw hex color values (`#ffffff`, `#1e293b`) or arbitrary bracket utilities (`bg-[#...]`) in application markup.
- **Check 3.2:** All styling properties resolve to tokens defined in `DESIGN.md`.
- **Check 3.3:** Light and dark theme parity: variables invert properly without unreadable inverted text.
- **Check 3.4:** Spatial spacing strictly follows the 8pt spatial grid scale (4, 8, 12, 16, 24, 32, 48, 64px).

### Dimension 4: Responsive Design & Touch
- **Check 4.1:** Zero horizontal scrollbar or overflow at 375px mobile viewport.
- **Check 4.2:** Data tables convert to card layouts or scroll within an explicit, focusable container.
- **Check 4.3:** Desktop header navigation transitions into an accessible mobile drawer or bottom sheet.
- **Check 4.4:** Fluid typography using CSS `clamp()` prevents text clipping or wrapping blowouts.

### Dimension 5: Implementation Integrity
- **Check 5.1:** Zero JavaScript runtime exceptions or unhandled promise rejections in console.
- **Check 5.2:** Valid HTML semantics (one `<h1>`, proper heading hierarchy, `<button>` for actions, `<a>` for navigation).
- **Check 5.3:** Comprehensive interaction states handled (default, hover, focus, active, disabled, loading, error).
- **Check 5.4:** Clean exit condition: zero unresolved P0/P1 defects remaining.

---

## 2. Defect Triage System (P0–P3)

Every audit finding must be triaged into an actionable priority level:

- **[P0] Blocker:** Application cannot be used. Examples: Broken build, critical runtime crash, missing primary CTA, complete mobile layout blowout.
- **[P1] Critical Defect:** High user friction or legal compliance violation. Examples: Inaccessible text contrast (< 3:1), missing focus indicator for keyboard users, touch target < 32px on primary button.
- **[P2] Token & Style Violation:** Architectural tech debt. Examples: Raw hex colors in JSX, unbounded `transition: all`, static `will-change` memory leaks.
- **[P3] Visual Polish Suggestion:** Micro-interaction refinement. Examples: Optical tracking adjustments, shadow ambient softness, button active scale physics.

---

## 3. The 4-Part Finding Ledger

When reporting audit findings, use this structured schema:

1. **Finding:** Clear, concise description of the defect.
2. **Evidence:** Exact file path and line number (`src/components/Hero.tsx:42`), observed CSS property, or measured contrast ratio.
3. **Impact:** Priority rating ([P0], [P1], [P2], [P3]) and user consequence.
4. **Concrete Fix:** Exact code replacement diff or token mapping.

---

## 4. Visual & Code Review Checklist

- [ ] **Focal Point:** Is there an unambiguous primary visual anchor on the page?
- [ ] **Typographic Balance:** Do headlines use `text-wrap: balance` to eliminate orphans?
- [ ] **Line Measure:** Is body copy constrained to 60–75 characters per line (`max-w-prose`)?
- [ ] **Tabular Numerals:** Are numbers, currency, and counters rendered with `tabular-nums`?
- [ ] **Hairline Dividers:** Are borders defined as subtle 1px hairlines rather than thick dark frames?
- [ ] **Contrast Verification:** Run `npx pure-saas contrast DESIGN.md` to mathematically confirm AA thresholds.
