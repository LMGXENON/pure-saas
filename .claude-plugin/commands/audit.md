# Pure SaaS: /pure-saas audit

Perform a comprehensive quality audit of an interface or component across visual hierarchy, responsive behavior, accessibility, interactions, performance, and code quality.

## Usage

```bash
/pure-saas audit [scope]
# or
/pure-saas:audit [scope]
```

**Audit Scope:** `$ARGUMENTS`

---

## Operational Instructions

1. **Evaluate Across Dimensions:**
   - **Visual Hierarchy & Design Consistency:** Heading-to-body contrast, intentional typography scale, surface elevations, and absence of generic AI slop (purple/cyan gradients, unmotivated 3-column cards, emoji icons).
   - **Layout & Spacing:** Grid structure, container max-widths, margin alignment, whitespace rhythm, and negative space balance.
   - **Responsive Behaviour:** Layout collapse at 1440px desktop, 768px tablet, and 375px mobile; horizontal overflow; touch target sizes (≥44x44px).
   - **Accessibility (WCAG 2.2 AA):** Color contrast (≥4.5:1 text, ≥3:1 UI), visible focus indicators, keyboard trapping, semantic HTML landmarks, and ARIA labels.
   - **Interactions & States:** Full 8-state matrix coverage (`default`, `hover`, `focus-visible`, `active`, `disabled`, `loading`, `empty`, `error/success`).
   - **Performance & Code Quality:** Unnecessary re-renders, oversized assets, component duplication, and styling drift.
   - **Token & `DESIGN.md` Consistency:** Run `node scripts/pure-saas.mjs check-tokens DESIGN.md --source src` to detect unmapped styles.
2. **Audit Rules:**
   - **Do not modify the project** during an audit unless the user explicitly requests fixes or runs `/pure-saas fix`.
   - Distinguish verified defects from potential risks or unverified areas.
3. **Report Output:**
   - Produce a structured audit report categorizing findings by severity (**Critical**, **High**, **Medium**, **Low**) with exact file locations, evidence, and actionable remediation steps.
