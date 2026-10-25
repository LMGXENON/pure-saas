# Pure SaaS: /pure-saas:review (Alias to /pure-saas audit)

Audit the existing UI for visual quality, usability, accessibility (WCAG 2.2 AA), responsiveness, and token consistency.

## Usage

```bash
/pure-saas review [path]
# or
/pure-saas:review [path]
```

**Scope / Target:** `$ARGUMENTS`

---

## Instructions

Execute the comprehensive quality audit workflow defined in `commands/audit.md`:
1. Audit markup against the Top 12 AI Slop patterns (`references/anti-slop-rules.md`).
2. Audit WCAG 2.2 AA accessibility (contrast, keyboard focus, semantic HTML) (`references/accessibility.md`).
3. Run token and styling drift scanner: `node scripts/pure-saas.mjs check-tokens DESIGN.md --source src`.
4. Output structured audit report with findings by severity (Critical, High, Medium, Low).
5. Do not modify files during review unless directed to apply fixes.
