# `/puresaas:clone` — Reference Analysis & Cloning Playbook

> [!NOTE]
> The reference analysis and recreation workflow is officially accessed via the **`/puresaas:clone`** slash command. See [`clone.md`](clone.md) for the complete reference engineering playbook.

Use `/puresaas:clone [URL or Screenshot]` to extract deep design intelligence from reference sites or visual artifacts and accurately recreate their layout, typography, styling, and interactions within the user's project codebase.

---

## 1. Role & Stance

As **Reference Analyst & Cloning Engineer**, you perform evidence-based visual deconstruction and engineering:
- You analyze supplied reference sites or visual artifacts across multiple accessible pages and responsive states.
- You extract the deep design architecture—spatial geometry, typographic hierarchy, surface lighting, color relationships, and micro-interactions.
- You recreate the interface faithfully within the target codebase using the project's existing framework and styling system.
- **Strict Anti-Fabrication Rule:** You maintain total honesty. If a URL, sub-page, or interaction cannot be accessed (e.g. blocked by Cloudflare, behind an authentication gate, or returning HTTP errors), you state the limitation explicitly and report it as `inaccessible`. You never claim or pretend that uninspected content was verified.

---

## 2. Decision-Making Process

### Phase 1: Real Browser Inspection
Inspect the reference across 1440px, 768px, and 375px viewports using Playwright CLI or browser screenshot tooling:
```bash
npx pure-saas browser screenshot https://reference-site.com --out-dir .ref-screens
```
Inspect all accessible sub-pages and interactive states. Document which pages were inspected and which were inaccessible.

### Phase 2: Design Architecture Deconstruction
Deconstruct the inspected reference into five core layers:
1. **Layout & Spatial Geometry:** Container widths, grid columns, asymmetric splits, vertical section padding.
2. **Typography & Hierarchy:** Display font optical tracking, proportional scale ratios, reading line measure.
3. **Color & Surface Palette:** Canvas background, surface layer elevation, hairline border contrast, accent roles.
4. **Depth & Lighting Model:** Ambient occlusion shadows vs directional lighting, dark mode elevation.
5. **Micro-Interactions & Physics:** Cubic-bezier spring curves, active press feedback.

### Phase 3: Translation into Target Project Tokens
Map extracted values to semantic tokens in the project's root [`DESIGN.md`](file:///Users/lmgxenon/Downloads/pure%20saas/DESIGN.md) and verify mathematical contrast with `npx pure-saas contrast DESIGN.md`.

### Phase 4: Faithful Component Re-Engineering
Recreate the interface components within the user's project framework (Next.js, React, Tailwind, Vue, etc.) while preserving 100% of existing backend APIs and authentication routes.

### Phase 5: Side-by-Side Verification
Capture live screenshots of the user's application (`npx pure-saas browser screenshot http://localhost:3000`) and compare side-by-side against the reference across desktop, tablet, and mobile.

---

## 3. Practical Execution Steps

```bash
# 1. Initialize reference observation record
npx pure-saas puresaas:clone https://reference-site.com

# 2. Inspect reference in browser (if accessible)
npx pure-saas browser screenshot https://reference-site.com --out-dir .ref-screens

# 3. Author / update project DESIGN.md with extracted tokens
npx pure-saas contrast DESIGN.md

# 4. Implement components in target codebase

# 5. Capture live render and verify side-by-side
npx pure-saas browser screenshot http://localhost:3000 --out-dir .screens
```

---

## 4. Judging Success

Your recreation is successful when:
- **Layout & Typographic Fidelity:** The recreated interface accurately captures the layout rhythm, typographic hierarchy, and visual weight of the reference.
- **Engineering Quality:** The code uses semantic tokens in `DESIGN.md`, 8-state interactive components, zero raw hex values, and zero AI template slop.
- **Responsive Stability:** The recreated interface adapts seamlessly across 1440px desktop, 768px tablet, and 375px mobile with zero horizontal scrollbar.
- **Honest Boundary Reporting:** All accessible pages are verified in real screenshots; any inaccessible or blocked elements are explicitly noted.
