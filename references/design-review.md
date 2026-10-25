# Pure SaaS Design Review & Critique Rubric

A design is not done when the code compiles. It is done when the rendered interface has been thoroughly reviewed against craft standards, responsiveness, accessibility, and anti-slop guidelines.

---

## 1. The Structured Critique Model

Every design review finding must follow the **Issue -> Impact -> Evidence -> Recommendation** structure:

```markdown
### [Finding Title]
- **Category:** [Hierarchy | Typography | Color/Contrast | Layout | Anti-Slop | Accessibility | Interaction | Responsive]
- **Severity:** [Critical | High | Medium | Low]
- **Issue:** [Exact description of what is visually or functionally defective]
- **Impact:** [How this affects user comprehension, accessibility, or brand trust]
- **Evidence:** [Viewport size, DOM selector, measured contrast ratio, or screenshot note]
- **Recommendation:** [Specific, concrete code or design token change to fix it]
```

### Prioritization Rule
Fix **Critical** (broken layouts, unreadable contrast < 3:1, missing keyboard navigation, unreadable text on mobile) and **High** (weak visual hierarchy, generic slop patterns, orphaned heading lines) defects before spending time on minor cosmetic polish.

---

## 2. Review Checklist

### A. Typography & Hierarchy
- [ ] Is there an unambiguous focal point on the page?
- [ ] Do headlines have `text-wrap: balance` to prevent orphaned words?
- [ ] Is body copy line length constrained between 45 and 75 characters?
- [ ] Are numeral columns and counters using tabular numbers?
- [ ] Does typography scale down cleanly on mobile without awkward wraps?

### B. Layout & Spatial Density
- [ ] Is content aligned to disciplined horizontal and vertical grid lines?
- [ ] Are section margins significantly larger than internal component padding?
- [ ] Did we avoid wrapping every single item in a rounded card?
- [ ] Does the page maintain visual interest through varied section rhythms?

### C. Color & Contrast
- [ ] Does normal body text achieve >= 4.5:1 contrast against canvas?
- [ ] Do secondary and muted texts achieve >= 3.0:1 contrast?
- [ ] Are interactive focus rings clearly distinguishable (>= 3.0:1)?
- [ ] Are colors driven exclusively by semantic tokens from `DESIGN.md`?

### D. Anti-Slop Integrity
- [ ] Are gratuitous purple/cyan gradient backgrounds absent?
- [ ] Is unnecessary glassmorphism blur removed?
- [ ] Are all icons professional SVGs from a single family (no emojis)?
- [ ] Is copy concrete, technical, and free of generic AI buzzwords?
- [ ] Are screenshots and UI diagrams real and accurate to product capabilities?

### E. Interaction & Responsiveness
- [ ] Do all buttons and links have hover, active/pressed, and visible focus states?
- [ ] Are mobile touch targets at least 44px × 44px?
- [ ] Is horizontal overflow completely eliminated across all screen sizes (360px – 1440px)?
- [ ] Do forms preserve user input if submission fails?
- [ ] Are animations disabled when `prefers-reduced-motion` is active?

---

## 3. Honest Reporting Rule

If a page, viewport, or interaction state was not directly tested in a running browser or rendering harness, **it must be reported as "Untested", never as "Passed" or "Verified".**
