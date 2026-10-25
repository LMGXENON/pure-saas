# Pure SaaS: /pure-saas review

Conduct a rigorous, evidence-based quality review of the requested implementation or scope.

## Usage

```bash
/pure-saas review [request or scope]
```

**Scope / Target:** `$ARGUMENTS`

---

## Operational Instructions

1. **Conduct Evidence-Based Audit Across Dimensions:**
   - **Bugs & Defect Identification:** Detect broken interactions, layout errors, unhandled edge cases, and missing states.
   - **Security Weaknesses:** Identify vulnerable dependencies, improper input sanitization, insecure cookies/storage, or leaked sensitive attributes.
   - **Accessibility (WCAG 2.2 AA):** Evaluate color contrast ratios (≥4.5:1 text, ≥3:1 UI), visible focus indicators, keyboard trapping, semantic HTML landmarks, and ARIA attributes (`references/accessibility.md`).
   - **Performance Issues:** Detect unnecessary rendering, uncompressed assets, layout shifts (CLS), and inefficient DOM hierarchies.
   - **Visual Consistency & Anti-Slop:** Audit against the Top 12 AI Slop patterns (`references/anti-slop-rules.md`). Flag generic purple/cyan gradient text, monotonous 3-column cards, and emoji icons.
   - **Design Token Alignment:** Run `node scripts/pure-saas.mjs check-tokens DESIGN.md --source src` to detect unmapped styles and raw styling drift.
   - **Missing Requirements:** Compare implementation against user specifications and `DESIGN.md`.

2. **Strict Review Discipline:**
   - **Do not modify files by default.** Implement fixes only when explicitly requested by the user.
   - Separate verified defects from potential risks or unverified areas.

3. **Output Report:**
   - Prioritize findings by severity (**Critical**, **High**, **Medium**, **Low**).
   - Provide exact file references, line numbers, or reproducible evidence for each finding.
   - Supply actionable remediation recommendations.
