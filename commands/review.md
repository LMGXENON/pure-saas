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
   - Open [`references/deterministic-audit-matrix.md`](../references/deterministic-audit-matrix.md) for the 5-dimension scored audit system and P0–P3 defect triage.
   - Open [`references/code-audit.md`](../references/code-audit.md) for concrete grep patterns, guideline citations, and stack replacements.
   - Open [`references/cross-platform.md`](../references/cross-platform.md) for platform vocabulary and conventions.
   - Open [`references/accessibility.md`](../references/accessibility.md) for WCAG 2.2 AA requirements.
   - Open [`references/anti-slop-rules.md`](../references/anti-slop-rules.md) for anti-generic design checks.
   - Open [`references/design-review.md`](../references/design-review.md) for quality review methodology and verification reporting.

2. **Conduct Evidence-Based Audit Across 5 Scored Dimensions (0–20 Points):**
   - **Dimension 1: Accessibility (0–4 pts):** Evaluate color contrast ratios (≥4.5:1 text, ≥3:1 UI), visible focus rings (SC 2.4.7), minimum 44px touch targets (SC 2.5.8), keyboard navigation, semantic HTML landmarks, and ARIA attributes. Run `npx pure-saas contrast DESIGN.md`.
   - **Dimension 2: Performance (0–4 pts):** Detect layout thrashing, unbounded animations, `will-change` overuse, uncompressed assets, and layout shifts (CLS).
   - **Dimension 3: Theming & Tokens (0–4 pts):** Run `npx pure-saas check DESIGN.md --source src --known known-defects.json` to detect unmapped styles and raw styling drift. Check dark mode inversion symmetry.
   - **Dimension 4: Responsive Design (0–4 pts):** Verify 375px mobile, 768px tablet, and 1440px desktop layouts without horizontal overflow using `npx pure-saas browser verify <url>`.
   - **Dimension 5: Implementation Integrity (0–4 pts):** Check 8-state coverage, corner radii harmony ($R_{outer} = R_{inner} + P$), zero broken API logic, and absence of generic AI slop.

3. **Strict Review Discipline & Defect Triage:**
   - **Do not modify files by default.** Implement fixes only when explicitly requested by the user.
   - Triage every defect by severity: **P0 (Blocker)**, **P1 (Critical)**, **P2 (Warning)**, or **P3 (Minor)**.
   - Output overall performance band: **Excellent (19–20)**, **Good (16–18)**, **Acceptable (12–15)**, **Poor (8–11)**, or **Critical (0–7)**.
   - Run deterministic CLI audit:
     ```bash
     npx pure-saas audit --source src
     ```

4. **Output Report (Four-Part Actionable Findings):**
   Every actionable finding must follow this structure:
   - **Finding:** Specific defect and classification.
   - **Evidence:** Concrete file path and line (`path/file.tsx:42`), plus code snippet or measured value.
   - **Impact:** User impact and severity rating (**Critical**, **Warning**, or **Info**).
   - **Fix:** Concrete, framework-idiomatic code replacement.
