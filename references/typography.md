# Pure SaaS Typography Specifications

Typography establishes the structural hierarchy, reading comfort, and visual authority of an interface. In Pure SaaS, typography is a mandatory design phase that must be planned before building components.

---

## 1. Type Roles & Semantic Hierarchy

Define typography by semantic roles rather than arbitrary CSS utility combinations:

| Role | Target Usage | Recommended Scale (Desktop) | Responsive Scale (Mobile) | Line Height | Tracking (Letter Spacing) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display / Hero** | Impactful landing statements, primary stats | 48px – 72px (3rem – 4.5rem) | 32px – 40px (2rem – 2.5rem) | 1.05 – 1.15 | -0.025em to -0.035em |
| **H1 (Primary Heading)** | Page titles, primary view titles | 36px – 44px (2.25rem – 2.75rem) | 28px – 32px (1.75rem – 2rem) | 1.15 – 1.25 | -0.02em to -0.025em |
| **H2 (Section Heading)** | Major section boundaries, feature groups | 24px – 30px (1.5rem – 1.875rem) | 20px – 24px (1.25rem – 1.5rem) | 1.25 – 1.35 | -0.015em to -0.02em |
| **H3 (Subheading)** | Card titles, group labels, panel headers | 18px – 20px (1.125rem – 1.25rem) | 16px – 18px (1rem – 1.125rem) | 1.35 – 1.4 | -0.01em to 0 |
| **Body (Default)** | Explanatory text, documentation, articles | 15px – 16px (0.9375rem – 1rem) | 15px – 16px (0.9375rem – 1rem) | 1.5 – 1.65 | 0 |
| **Body Large** | Lead intro paragraphs, callouts | 18px – 20px (1.125rem – 1.25rem) | 16px – 18px (1rem – 1.125rem) | 1.45 – 1.55 | -0.005em |
| **Body Small / Caption** | Secondary notes, timestamps, helper text | 13px – 14px (0.8125rem – 0.875rem) | 12px – 13px (0.75rem – 0.8125rem) | 1.4 – 1.5 | +0.005em |
| **Label / Button** | Form labels, button copy, navigation items | 13px – 15px (0.8125rem – 0.9375rem) | 13px – 15px (0.8125rem – 0.9375rem) | 1.2 – 1.3 | 0 to +0.015em (medium/semibold) |
| **Metadata / Micro** | Tags, badges, status indicators, breadcrumbs | 11px – 12px (0.6875rem – 0.75rem) | 11px – 12px (0.6875rem – 0.75rem) | 1.2 – 1.3 | +0.02em to +0.04em (uppercase) |
| **Code / Tabular** | Code blocks, inline snippets, data tables | 13px – 14px (0.8125rem – 0.875rem) | 12px – 13px (0.75rem – 0.8125rem) | 1.45 – 1.55 | 0 (monospace / tabular nums) |

---

## 2. Choosing Typefaces with Intent

Never default to `Inter`, `Roboto`, or `system-ui` without evaluating the product identity:
- **Developer / Infrastructure SaaS:** Look for precision, geometric clarity, and unambiguous glyph distinctions (e.g., `0` vs `O`, `l` vs `1`). Good choices: *Geist, IBM Plex Sans, Space Grotesk, Plus Jakarta Sans*. Monospace: *JetBrains Mono, Fira Code, Berkeley Mono*.
- **Editorial / High-Trust / Knowledge Base:** Warmth, literary cadence, high readability at length. Good choices: *Newsreader, Source Serif 4, Fraunces, Charter, Instrument Serif*.
- **Creative / Expressive / Media Tools:** Expressive geometric cuts, dynamic display weight contrast. Good choices: *Cabinet Grotesk, Syne, Clash Display, Outfit, Sora*.
- **Modern Enterprise / Workflow:** Highly clean, rational, neutral, excellent legibility across dense data tables. Good choices: *General Sans, Inter Variable (justified when dense), Public Sans*.

### Family Restraint Rule
- Prefer **one single high-quality font family** with multiple weights (e.g., Regular 400, Medium 500, SemiBold 600, Bold 700) over pairing mismatched fonts.
- Use a secondary family (e.g., Serif for headings + Sans for UI, or Display + Sans) **only when the contrast serves a distinct storytelling role**.
- Never use a decorative display font for body copy or small metadata labels.

---

## 3. Reading Measure and Line Length

- **Body Copy Max Measure:** Limit paragraphs to **45 to 75 characters per line** (approximately `60ch` to `68ch` or `540px` to `680px`). Lines wider than 80 characters cause reader disorientation at line breaks.
- **Headings Wrapping:** Never allow headings to wrap into single orphaned words. Use `text-wrap: balance` in modern CSS:
  ```css
  h1, h2, h3, .display-text {
    text-wrap: balance;
  }
  p {
    text-wrap: pretty;
  }
  ```

---

## 4. Tabular Numerals & Data Alignment

Financial figures, metrics, counters, and table columns must use tabular figures (`font-variant-numeric: tabular-nums;` or `font-feature-settings: "tnum";`) to ensure numbers align vertically without jitter.

---

## 5. Web Font Loading and Fallbacks

1. **System Fallbacks:** Every font definition must include a matching fallback stack to prevent cumulative layout shift (CLS):
   ```css
   --font-sans: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
   --font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
   ```
2. **Font Display:** Use `font-display: swap;` for body text to avoid blank text flash.
3. **Weight Availability:** Never declare `font-weight: 800` or `italic` unless the corresponding font file or variable axis is actually loaded. Synthetic bolding and oblique rendering distort glyph geometry.
