# Typeset: Editorial Typographic Hierarchy, Optical Tracking & Fluid Clamps

Use `/pure-saas typeset [target]` to elevate typographic craft from default web styling to high-end editorial and publication standards.

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

## 2. Core Typographic Laws

1. **Optical Tracking (Letter-Spacing):**
   - Headings (above 24px) expand visually. Tighten tracking as size increases:
     - 24px–32px: `-0.015em`
     - 36px–48px: `-0.025em`
     - 60px+: `-0.035em` (never exceed `-0.04em` as letters will collide).
   - Small uppercase tags, badges, and labels (10px–12px) collapse visually. Loosen tracking: `+0.04em` to `+0.08em`.
   - Body copy (14px–18px): Standard tracking `0` or `-0.005em`.
2. **Line Length & Reading Measure:**
   - Strict 60–75 characters per line (`max-w-[68ch]` or `max-w-prose`).
   - Line-height inversely proportional to font size:
     - Display Headlines (48px+): `1.05` to `1.15`
     - Section Headings (24px–36px): `1.2` to `1.3`
     - Body Paragraphs (16px): `1.5` to `1.65`
3. **Balanced Wrapping:**
   - Headings must use `text-wrap: balance` to eliminate awkward single-word orphans on new lines.
   - Body paragraphs use `text-wrap: pretty` where supported.
4. **Fluid Typographic Scaling:**
   - Use CSS `clamp()` for smooth viewport scaling without abrupt breakpoint jumps:
   ```css
   /* Fluid Display Scale: 36px at 375px viewport to 64px at 1440px */
   --font-display-hero: clamp(2.25rem, 1.375rem + 3.75vw, 4rem);
   
   /* Fluid Section Heading: 24px to 36px */
   --font-heading-lg: clamp(1.5rem, 1.15rem + 1.5vw, 2.25rem);
   ```

---

## 3. Typography Pairings & Product Identity

Never default to generic fonts without evaluating the product identity:
- **Developer / Infrastructure SaaS:** Look for precision, geometric clarity, and unambiguous glyph distinctions (e.g., `0` vs `O`, `l` vs `1`). Good choices: *Geist, IBM Plex Sans, Space Grotesk, Plus Jakarta Sans*. Monospace: *JetBrains Mono, Fira Code, Berkeley Mono*.
- **Editorial / High-Trust / Knowledge Base:** Warmth, literary cadence, high readability at length. Good choices: *Newsreader, Source Serif 4, Fraunces, Charter, Instrument Serif*.
- **Creative / Expressive / Media Tools:** Expressive geometric cuts, dynamic display weight contrast. Good choices: *Cabinet Grotesk, Syne, Clash Display, Outfit, Sora*.
- **Modern Enterprise / Workflow:** Highly clean, rational, neutral, excellent legibility across dense data tables. Good choices: *General Sans, Inter Variable (justified when dense), Public Sans*.

### Family Restraint Rule
- Prefer **one single high-quality font family** with multiple weights (Regular 400, Medium 500, SemiBold 600, Bold 700) over pairing mismatched fonts.
- Use a secondary family (e.g., Serif for headings + Sans for UI) **only when the contrast serves a distinct storytelling role**.
- Never use a decorative display font for body copy or small metadata labels.

---

## 4. The Tabular Numbers Requirement

Always apply tabular numbers (`font-variant-numeric: tabular-nums` or `tabular-nums` in Tailwind) to:
- Currency and pricing tables
- Timestamps and countdowns
- Analytics KPI metrics and counters
- Table numeric columns

This guarantees that numbers of differing widths align perfectly along decimal columns without jumping on re-renders.
