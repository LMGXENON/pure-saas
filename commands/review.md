# Pure SaaS: /pure-saas review

Conduct a rigorous, evidence-based quality review of the requested implementation or scope.

## Usage

```bash
/pure-saas review [request or scope]
```

**Scope / Target:** `$ARGUMENTS`

---

## Operational Instructions

1. **Load Relevant References ("Read Before You Cite"):**
   - Open [`references/code-audit.md`](../references/code-audit.md) for concrete grep patterns, guideline citations, and stack replacements.
   - Open [`references/cross-platform.md`](../references/cross-platform.md) for platform vocabulary and conventions.
   - Open [`references/accessibility.md`](../references/accessibility.md) for WCAG 2.2 AA requirements.
   - Open [`references/anti-slop-rules.md`](../references/anti-slop-rules.md) for anti-generic design checks.
   - Open [`references/design-review.md`](../references/design-review.md) for quality review methodology and verification reporting.

2. **Conduct Evidence-Based Audit Across Dimensions:**
   - **Bugs & Defect Identification:** Detect broken interactions, layout errors, unhandled edge cases, and missing component states across the 8-state matrix.
   - **Security Weaknesses:** Identify vulnerable dependencies, improper input sanitization, insecure cookies/storage, or leaked sensitive attributes.
   - **Accessibility (WCAG 2.2 AA):** Evaluate color contrast ratios (≥4.5:1 text, ≥3:1 UI), visible focus indicators (SC 2.4.7), minimum 44px touch targets (SC 2.5.8), keyboard navigation, semantic HTML landmarks, and ARIA attributes. Run `npx pure-saas contrast DESIGN.md`.
   - **Performance Issues:** Detect unnecessary rendering, uncompressed assets, layout shifts (CLS), and inefficient DOM hierarchies.
   - **Visual Consistency & Anti-Slop:** Audit against AI Slop patterns: reject generic purple/cyan gradient text, monotonous 3-column cards, floating blur blobs, and emoji UI icons.
   - **Design Token Alignment:** Run `npx pure-saas check DESIGN.md --source src --known known-defects.json` (or `node scripts/pure-saas.mjs check-tokens DESIGN.md --source src`) to detect unmapped styles and raw styling drift. Run `npx pure-saas drift DESIGN.md observations.json`.
   - **Missing Requirements:** Compare implementation against user specifications and `DESIGN.md`.

3. **Strict Review Discipline:**
   - **Do not modify files by default.** Implement fixes only when explicitly requested by the user.
   - Separate verified defects from inferred risks or unverified areas.

4. **Output Report (Four-Part Actionable Findings):**
   Every actionable finding must follow this structure:
   - **Finding:** Specific defect and classification.
   - **Evidence:** Concrete file path and line (`path/file.tsx:42`), plus code snippet or measured value.
   - **Impact:** User impact and severity rating (**Critical**, **Warning**, or **Info**).
   - **Fix:** Concrete, framework-idiomatic code replacement.
