# Pure SaaS Layout and Composition Guide

Great interface design is composed as a whole spatial experience. Pure SaaS enforces intentional layout planning before creating individual UI sections.

---

## 1. Content Width and Alignment Anchors

- **Maximum Content Widths:**
  - Compact / Form / Reading: `max-w-2xl` to `max-w-3xl` (`672px` – `768px`).
  - Standard Content / Blog / Docs: `max-w-4xl` to `max-w-5xl` (`896px` – `1024px`).
  - Standard Application / Marketing Container: `max-w-6xl` to `max-w-7xl` (`1152px` – `1280px`).
  - Wide Dashboard / Data Grid: `max-w-[1440px]` or full fluid width with controlled horizontal gutters (`px-6` to `px-12`).
- **Alignment Anchors:**
  Align elements to clear horizontal and vertical axes. If a hero heading starts at `x = 24px`, subtext, inputs, and primary actions should share that alignment line unless deliberate asymmetry is being employed.

---

## 2. Spacing Scale and Vertical Rhythm

Use a consistent 4px/8px proportional spacing scale rather than arbitrary values:

| Token | Size | Primary Usage |
| :--- | :--- | :--- |
| `space-1` | 4px (0.25rem) | Micro-spacing: icon-to-label gaps, tight badges |
| `space-2` | 8px (0.5rem) | Component interior: button padding-y, tag gaps |
| `space-3` | 12px (0.75rem) | Input internal padding, list item gaps |
| `space-4` | 16px (1rem) | Standard padding: card interior, button padding-x |
| `space-6` | 24px (1.5rem) | Form field groups, panel padding, grid gutter |
| `space-8` | 32px (2rem) | Section sub-group separation, card stack gaps |
| `space-12` | 48px (3rem) | Minor section separation, modal padding |
| `space-16` | 64px (4rem) | Standard section padding (mobile/tablet) |
| `space-24` | 96px (6rem) | Major section padding (desktop) |
| `space-32` | 128px (8rem) | Hero separation, dramatic editorial transitions |

### Vertical Hierarchy Rule
Padding between unrelated sections must always be significantly larger than spacing between related elements within a section.
- Related elements (heading + paragraph): `8px` – `16px`.
- Grouped blocks (features list): `24px` – `32px`.
- Section-to-section: `64px` – `120px`.

---

## 3. Asymmetry and Visual Pacing

Avoid repeating the same centered, balanced block across an entire landing page.
- **Vary the rhythm:** Follow a dense, technical feature comparison with an expansive, open architectural diagram or code demonstration.
- **Intentional asymmetry:** A 60/40 or 70/30 split (e.g., prominent live terminal on the left, concise capability checklist on the right) draws focus and feels grounded.
- **Avoid "Card Vomit":** Do not wrap every feature, benefit, testimonial, and metric inside an identical rounded card. Use:
  - Clean divider lines (`border-t border-border-subtle`).
  - Direct grid alignment with generous whitespace.
  - Typographic callouts without background containers.
  - Multi-column editorial text layouts.

---

## 4. The "Anti-Three-Card" Rule

Defaulting to three identical rounded boxes side-by-side with an icon, title, and sentence is the hallmark of low-effort AI web design.
Instead, ask:
1. Are these features of equal importance? If one is the core engine, give it 65% of the viewport with a live preview, and stack the supporting two features beside it.
2. Is the content sequential? Use a stepped pipeline or timeline layout.
3. Is it data-driven? Present a dense, clear comparison table or interactive tabbed inspector.

---

## 5. Responsive Layout Strategy

- **Desktop (1024px – 1440px+):** Utilize horizontal breathing room, multi-column compositions, and sticky side navigation or contextual controls.
- **Tablet (768px – 1023px):** Transition multi-column grids to 2-column layouts; adjust padding to maintain reading measure.
- **Mobile (360px – 767px):** Single-column vertical flow with full-width action bars, drawer navigation, and touch-optimized tap targets (`>= 44px`). Never simply scale down desktop widths into cramped horizontal scroll containers unless explicitly designed as a swipeable carousel.
