# Typeset: Editorial Typographic Hierarchy, Optical Tracking & Fluid Clamps

Use `/pure-saas typeset [target]` to elevate typographic craft from default web styling to high-end editorial and publication standards.

---

## 1. Core Typographic Laws

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

## 2. Typography Pairings

Curated high-refinement font combinations:
- **Modern Tech / Swiss:** `Geist` (Display) + `Geist` (Body) + `Geist Mono` (Code)
- **Classic Tech:** `Inter` (Display) + `Inter` (Body) + `JetBrains Mono` (Code)
- **Editorial / Literary:** `Newsreader` or `Fraunces` (Display) + `Inter` or `Geist` (Body)
- **High-Velocity Enterprise:** `General Sans` (Display) + `Inter` (Body)

---

## 3. The Tabular Numbers Requirement

Always apply tabular numbers (`font-variant-numeric: tabular-nums` or `tabular-nums` in Tailwind) to:
- Currency and pricing tables
- Timestamps and countdowns
- Analytics KPI metrics and counters
- Table numeric columns

This guarantees that numbers of differing widths align perfectly along decimal columns without jumping on re-renders.

