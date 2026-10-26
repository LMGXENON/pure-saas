# Layout: Spatial Rhythm, Asymmetric Balance & Grid Containment

Use `/pure-saas layout [target]` to fix awkward spacing, unbalanced containers, poor rhythm, and visual alignment defects across viewports.

---

## 1. Content Width and Container Boundaries

Inconsistent container widths across sections make pages look amateur. Pure SaaS establishes clear maximum content widths:
- **Compact / Form / Reading:** `max-w-2xl` to `max-w-3xl` (`672px` – `768px`).
- **Standard Content / Blog / Docs:** `max-w-4xl` to `max-w-5xl` (`896px` – `1024px`).
- **Standard Application / Marketing Container:** `max-w-6xl` to `max-w-7xl` (`1152px` – `1280px`).
- **Wide Dashboard / Data Grid:** `max-w-[1440px]` or full fluid width with controlled horizontal gutters (`px-6` to `px-12`).

### Container Consistency Rule
- Establish **one shared content container** with consistent maximum width and responsive horizontal padding:
  - Max Width: `max-w-6xl` (`1152px`) or `max-w-7xl` (`1280px`).
  - Mobile Padding: `px-4` (`16px`) or `px-6` (`24px`).
  - Desktop Padding: `px-8` (`32px`).
- Keep section backgrounds full-width where appropriate (e.g., alternating canvas to surface), but align inner content strictly to the shared container.
- Align the navbar, hero, feature spotlights, pricing grid, FAQ, and footer to the exact same outer grid boundaries.

---

## 2. The 8pt Spatial Grid & Proportional Spacing Scale

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
Padding between unrelated sections must always be significantly larger than spacing between related elements within a section:
- Related elements (heading + paragraph): `8px` – `16px`.
- Grouped blocks (features list): `24px` – `32px`.
- Section-to-section: `64px` – `120px`.
- **Rule of Vertical Rhythm:** There must strictly be more whitespace *above* a heading than *below* it. A heading belongs to the content that follows it, not to the section preceding it.

---

## 3. Asymmetric Visual Weight & Dynamic Balance

Symmetrical, uniform 3-card grids feel static and templated. Introduce purposeful visual weight:
- **60/40 Split Hero:** 60% width dedicated to value proposition and core CTA; 40% dedicated to live interactive UI or 3D canvas.
- **Spotlight + Rail:** One large primary card spotlighting a flagship capability (occupying 2 columns), paired with stacked secondary cards.
- **Alternating Directional Anchors:** Zig-zag narrative blocks with alternating image/copy alignment, maintaining strict vertical grid rhythm.
- **Alignment Anchors:** Align elements to clear horizontal and vertical axes. If a hero heading starts at `x = 24px`, subtext, inputs, and primary actions should share that alignment line.
