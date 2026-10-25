# Pure SaaS: /pure-saas component

Build or improve robust, accessible, reusable UI components aligned with the design system.

## Usage

```bash
/pure-saas component [request]
# or
/pure-saas:component [request]
```

**Target Component / Request:** `$ARGUMENTS`

---

## Operational Instructions

1. **Examine Existing Library:** Inspect existing component files to prevent duplicating components or introducing incompatible patterns.
2. **Component Engineering Standards:**
   - **Semantic Design Tokens:** Strictly bind colors, spacing, typography, and radii to `DESIGN.md`. Never hardcode raw hex values or arbitrary numbers.
   - **Variant Architecture:** Define clear, typed variants (e.g. `size: "sm" | "md" | "lg"`, `variant: "primary" | "secondary" | "ghost" | "destructive"`).
   - **The 8-State Matrix:** Fully implement states: `default`, `hover`, `focus-visible`, `active/pressed`, `disabled`, `loading/pending`, `empty`, and `error/success` (`references/interaction-states.md`).
   - **Accessibility Built-In:** Proper semantic HTML tag (e.g. `<button>` for clickable triggers, `<a>` for navigation), visible focus ring with offset, appropriate ARIA roles, and keyboard event handlers (`Enter`, `Space`, `Escape`).
   - **Clean Component API:** Support composition, polymorphic `as` / `asChild` where appropriate, `ref` forwarding, and extensible `className` or style overrides.
3. **Responsive Adaptation:** Ensure component scales naturally without horizontal clipping or broken layouts across mobile (375px) to desktop (1440px).
4. **Verify & Report:** Test component across variants and states, run `node scripts/pure-saas.mjs check-tokens DESIGN.md --source src`, and report created or updated components.
