# Surface Modes: Persuade, Operate, Read, Experience

Every frontend screen belongs to one dominant surface mode. Ambition in Pure SaaS scales to the mode: what impresses on a landing page destroys an enterprise operations console, and what makes a database table usable makes a marketing hero dead.

---

## 1. Mode: Persuade (Landing Pages, Brand Sites, Launch Pages)

### Primary Mission
Move the visitor to believe, understand, and take action. High conversion through visual authority, authentic proof, and irresistible clarity.

### Creative Ambition
- **Commitment:** Maximum visual point of view. Bold visual thesis, distinctive layout, and memorable aesthetic.
- **Hero Treatment:** High-impact hero with real interactive product UI, procedural 3D model, or kinetic canvas—never generic mockups or floating spheres.
- **Visual Rhythm:** Varied section layouts (split asymmetrical grids, full-bleed spotlights, comparison ledgers, interactive calculators).
- **Typography:** Expressive display typeface paired with a high-readability body face. Tight tracking on display headlines (-0.02em to -0.04em).
- **Motion:** One authored hero entrance moment. Subtle scroll reveals using `IntersectionObserver`. Physics-based hover states.
- **Refusals:** Refuse 3-column feature cards with icons, refuse repetitive kickers on every heading, refuse gradient text, and refuse generic vanity claims ("Trusted by 10,000+ teams").

---

## 2. Mode: Operate (Dashboards, Cloud Consoles, Productivity Tools)

### Primary Mission
Enable users to complete tasks, inspect data, make decisions, and manipulate state with minimal cognitive overhead and zero latency.

### Creative Ambition
- **Restraint & Precision:** Calm surfaces, neutral zinc/slate canvases, hairline dividers, and minimal ambient shadows.
- **Information Density:** High density with generous padding inside interactive cells (8–12px padding, 4px radii). Tabular numbers (`tabular-nums`) for currency, timestamps, and metrics.
- **Color Discipline:** 90% neutral canvas/surface. Color is reserved strictly for semantic state (status badges, error highlights, active selections).
- **Keyboard Ergonomics:** Roving `tabindex`, keyboard shortcuts (`Cmd+K`, `/`, `Escape`), and prominent focus-visible rings (`2px solid var(--color-action-focus)` with 2px offset).
- **States:** Comprehensive 8-state handling: default, hover, focus, active press, disabled, loading skeleton, error recovery, and empty state with action.
- **Refusals:** Refuse loud background gradients, refuse decorative backdrop blur, refuse floating cards where tables belong, and refuse unpaginated or unvirtualized large lists.

---

## 3. Mode: Read (Documentation, Technical Essays, Knowledge Bases)

### Primary Mission
Deliver technical or long-form information with optimal reading comfort, effortless scanning, and immediate wayfinding.

### Creative Ambition
- **Typographic Measure:** Strict 65–75 character line length for primary article body (`max-w-prose` or `68ch`).
- **Vertical Rhythm:** Strict scale hierarchy. Generous space above headings (margin-top: 2.5rem), tight space below (margin-bottom: 0.75rem).
- **Contrast & Legibility:** Minimum 7:1 contrast for body copy against canvas (AAA tier). Subtly tinted code blocks with syntax highlighting and instant copy buttons.
- **Wayfinding:** Sticky table of contents with active scroll-spy, breadcrumb navigation, and responsive drawer sidebar.
- **Refusals:** Refuse full-width text lines exceeding 85ch, refuse low-contrast secondary text, refuse intrusive animations during reading, and refuse horizontal layout blowout from code blocks.

---

## 4. Mode: Experience (Creative Tools, 3D Showcases, Interactive Canvasses)

### Primary Mission
Immerse the user in interactive exploration, creative manipulation, or tactile digital craftsmanship.

### Creative Ambition
- **Tactile Physics:** Direct manipulation, drag-and-drop handles, spring physics with physical inertia and rubber-banding.
- **Procedural Canvas / 3D:** Lightweight, code-only Three.js components or WebGL shaders. Under 5,000 polygons, 60fps target, strict memory cleanup on unmount.
- **Audio & Haptic Feedback:** Micro-interaction cues and smooth transitions between tool states.
- **Refusals:** Refuse unmanaged Three.js instances that leak WebGL contexts, refuse heavy binary GLTF downloads where parametric code suffices, and refuse jerky frame drops.
