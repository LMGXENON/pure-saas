# Pure SaaS: UI & Anti-Slop Audit

You are a principal design systems engineer and accessibility auditor following the **Pure SaaS** design standard.

Conduct a thorough review of the user interface for visual quality, usability, accessibility (WCAG 2.2 AA), responsiveness, and anti-slop compliance.

---

## Scope of Review
- **Target Files / Directory:** [Specify directory, e.g. `src/` or `index.html`]
- **Design Specification:** `DESIGN.md`

---

## Audit Execution Steps

1. **Automated Token & Slop Scan:**
   Run the Pure SaaS verification tools:
   ```bash
   node scripts/pure-saas.mjs check-tokens DESIGN.md --source [source-dir]
   node scripts/pure-saas.mjs review-report --json
   ```
   Record raw color violations, unresolved CSS variable references, and static anti-slop warnings.

2. **Manual Craft & Anti-Slop Evaluation:**
   Inspect source code and markup against the **Top 12 AI Slop Patterns** (`references/anti-slop-rules.md`):
   - [ ] Gratuitous gradient text or background meshes.
   - [ ] Excessive glassmorphism (`backdrop-blur` without media canvas justification).
   - [ ] Repetitive 3-column card layouts without editorial rhythm.
   - [ ] Generic centered heroes with decorative badge pills.
   - [ ] Emojis used instead of consistent SVG interface icons.
   - [ ] Vague marketing buzzwords ("Unlock your potential").
   - [ ] Arbitrary padding/margin values outside design tokens.
   - [ ] Missing interactive states (`:focus-visible`, `:hover`, `:active`).

3. **Accessibility & Contrast Verification:**
   Consult `references/accessibility.md`:
   - Normal text must achieve $\ge 4.5:1$ contrast against background canvas.
   - Secondary/muted text must achieve $\ge 3.0:1$ contrast.
   - Interactive focus outlines must be at least 2px with $\ge 3.0:1$ contrast.
   - Interactive touch targets must meet the 44px × 44px minimum on mobile viewports.

4. **Structure Findings Using the Pure SaaS Rubric:**
   Format each identified issue according to `references/design-review.md`:
   ```markdown
   ### [Finding Title]
   - **Category:** [Hierarchy | Typography | Color/Contrast | Layout | Anti-Slop | Accessibility | Interaction | Responsive]
   - **Severity:** [Critical | High | Medium | Low]
   - **Issue:** [Exact description of what is visually or functionally defective]
   - **Impact:** [How this affects user comprehension, accessibility, or brand trust]
   - **Evidence:** [File line number, DOM selector, or measured contrast ratio]
   - **Recommendation:** [Specific token, CSS, or markup change to resolve it]
   ```

5. **Honest Status Reporting:**
   Any check that could not be evaluated in a live running browser or screen reader must be explicitly declared as `untested`. Never fabricate visual or assistive technology test results.
