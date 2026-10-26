# Layout: Spatial Geometry, Proportional Spacing & Alignment Calculus

Use this reference to reason through page geometry, alignment axes, container boundaries, and spacing proportions. It prevents awkward spacing, unbalanced containers, poor rhythm, and visual alignment defects across all viewports.

Also consult [`spatial-reasoning.md`](spatial-reasoning.md) for the foundational mathematical proofs.

---

## 1. Content Width and Container Boundaries

Inconsistent container widths across sections make pages look amateur. Pure SaaS establishes clear maximum content widths:
- **Compact / Form / Reading:** `max-w-2xl` to `max-w-3xl` (`672px` – `768px`).
- **Standard Content / Blog / Docs:** `max-w-4xl` to `max-w-5xl` (`896px` – `1024px`).
- **Standard Application / Marketing Container:** `max-w-6xl` to `max-w-7xl` (`1152px` – `1280px`).
- **Wide Dashboard / Data Grid:** `max-w-[1440px]` or full fluid width with controlled horizontal gutters (`px-4 sm:px-6 lg:px-8`).

### Container Consistency Rule
- Establish **one shared content container** with consistent maximum width and responsive horizontal padding:
  - Max Width: `max-w-6xl` (`1152px`) or `max-w-7xl` (`1280px`).
  - Mobile Padding: `px-4` (`16px`) or `px-6` (`24px`).
  - Desktop Padding: `px-8` (`32px`).
- Keep section backgrounds full-width where appropriate (e.g., alternating canvas to surface), but align inner content strictly to the shared container.
- Align the navbar, hero, feature spotlights, pricing grid, FAQ, and footer to the exact same outer grid boundaries.

---

## 2. Alignment Calculus & The Single Gutter Line

The human eye tracks vertical axes with extreme sensitivity. Elements that float loosely without a shared anchor look broken.

### 2.1 The Single Gutter Line (`x = 0`)
Within every section, block, or card container:
- Establish **ONE primary vertical alignment line** at `x = 0`.
- The section eyebrow kicker, H1/H2 heading, body copy, form inputs, and primary buttons must start on the exact same x-coordinate.
- **Forbidden:** Indenting body copy arbitrarily, centering a button under left-aligned copy, or offsetting form inputs.

### 2.2 Optical Alignment vs. Geometric Bounding Boxes
- **Multi-line Text with Leading Icon:**
  - *Wrong:* `items-center` (centers the icon vertically across the entire wrapped paragraph).
  - *Correct:* `items-start`. Apply `mt-0.5` or `mt-1` (2px–4px) to the icon so its optical center aligns with the cap-height of the *first line of text*.
- **Form Label Lockup:**
  - Form field labels must lock to the top-left of the input box with a maximum gap of `6px` (`space-y-1.5`).
  - Sibling form rows must be spaced by $\ge 16px$ (`space-y-4` to `space-y-6`).

---

## 3. Proximity Mathematics & Spacing Calculus

### 3.1 Container-to-Child Inequality
The space outside an element must ALWAYS be greater than the space inside it:
$$\text{Container Outer Padding} \ge 1.5 \times \text{Internal Child Gap}$$

- If a card has `p-6` (24px) padding:
  - Internal gaps between title and description: `space-y-2` (8px) or `space-y-3` (12px).
  - Internal gaps between content groups: `space-y-4` (16px).
  - **FATAL ERROR:** Putting `gap-6` (24px) inside a `p-4` (16px) card causes content to visually burst out of its container.

### 3.2 The Law of Vertical Rhythm (Heading Belonging)
A heading belongs to the content *below* it, never to the section *above* it:
$$\text{Spacing Above Heading} \ge 2.5 \times \text{Spacing Below Heading}$$

- When separating content blocks inside a page:
  - `margin-top` / spacing before heading: `48px` – `64px` (`mt-12` to `mt-16`).
  - `margin-bottom` / spacing after heading: `12px` – `16px` (`mb-3` to `mb-4`).
- **FATAL ERROR:** Symmetrical spacing (`mt-8 mb-8`) causes the heading to float ambiguously in no-man's land.

### 3.3 The 5-Tier Spacing Scale

| Token | Size | Primary Usage | Proximity Tier |
| :--- | :--- | :--- | :--- |
| `space-1` | 4px (0.25rem) | Micro-spacing: icon-to-label gaps, tight badges | Tier 1 (Atomic) |
| `space-2` | 8px (0.5rem) | Component interior: button padding-y, tag gaps | Tier 1 (Atomic) |
| `space-3` | 12px (0.75rem) | Input internal padding, list item gaps | Tier 2 (Component) |
| `space-4` | 16px (1rem) | Standard padding: card interior, button padding-x | Tier 2 (Component) |
| `space-6` | 24px (1.5rem) | Form field groups, panel padding, grid gutter | Tier 3 (Structural) |
| `space-8` | 32px (2rem) | Section sub-group separation, card stack gaps | Tier 3 (Structural) |
| `space-12` | 48px (3rem) | Minor section separation, modal padding | Tier 4 (Sub-Section) |
| `space-16` | 64px (4rem) | Standard section padding (mobile/tablet) | Tier 4 (Sub-Section) |
| `space-24` | 96px (6rem) | Major section padding (desktop) | Tier 5 (Macro) |
| `space-32` | 128px (8rem) | Hero separation, dramatic editorial transitions | Tier 5 (Macro) |

---

## 4. Asymmetric Visual Weight & Dynamic Balance

Symmetrical, uniform 3-card grids feel static, templated, and amateur. Introduce purposeful visual weight:
- **The Anchor & Orbit Pattern:**
  - 60%–66% width dedicated to the primary anchor (live interactive demo, realistic telemetry view, or terminal canvas).
  - 34%–40% width dedicated to the secondary orbital rail (high-density metrics, recent audit trails, or quick action dials).
- **High-Density Operational Consoles:**
  - Replace empty 256px sidebars with top console bars, project switchers, and `⌘K` command search pills.
  - Apply `font-tabular` / `font-mono` to all numeric indicators to eliminate metrics jitter.
  - Use slide-over master-detail drawers for row inspection instead of empty full-page redirects.
