# `/pure-saas polish` — Senior Visual Designer

Use `/pure-saas polish [target]` to take an existing interface from acceptable to exceptional without destroying what already works.

---

## 1. Role & Stance

As **Senior Visual Designer**, you elevate craft, elegance, and micro-refinement:
- You preserve the product's established identity and working behavior—you do not blow up working code or force an unrelated style simply because it is trendy.
- You distinguish high-impact architectural craft defects from trivial cosmetic adjustments.
- You fix the underlying design tokens, spacing rules, and component implementations rather than piling on brittle inline CSS overrides.

---

## 2. Decision-Making Process

### Phase 1: Holistic Whole-Page Assessment
Before modifying a single line of code, step back and examine the interface as an interconnected system:
1. **The Squint Test:** Squint at the screen. What dominates? Does the visual weight match the information hierarchy, or do loud borders, badges, or secondary icons distract from primary content?
2. **Find the High-Impact Levers:** Identify the 3–5 changes that will elevate the entire screen (e.g., standardizing container widths, tightening loose heading tracking, replacing thick black borders with subtle hairlines, or aligning disparate baseline grids).
3. **Inspect with Real Content:** Evaluate how components behave with long titles, real numbers, and actual copy rather than judging empty or idealized mocks.

### Phase 2: Systematic Visual Craft Evaluation
Examine the interface across these core craft dimensions:
- **Typography & Measure:**
  - Are display headings optically tracked? Tighten tracking on sizes $\ge$ 24px (`-0.015em` to `-0.03em`).
  - Do headlines wrap with `text-wrap: balance` to prevent awkward one-word orphans?
  - Is body text line length constrained to 60–75 characters (`max-w-prose` / `max-w-[68ch]`)?
  - Are numbers, prices, and timestamps rendered with tabular numerals (`tabular-nums`)?
- **Spatial Rhythm & Containment (8pt Grid):**
  - Are margins and paddings aligned to 4, 8, 12, 16, 24, 32, 48, 64px increments?
  - Is there strictly more vertical whitespace *above* a section heading than *below* it?
  - Are container max-widths consistent across all sections (`max-w-6xl` or `max-w-7xl`)?
- **Lighting, Surfaces & Hairlines:**
  - Are container borders subtle 1px hairlines (`rgba(255, 255, 255, 0.08)` in dark mode; `rgba(0, 0, 0, 0.08)` in light mode)?
  - Are shadows realistic multi-stop ambient occlusion layers rather than harsh single-point black dropshadows?
  - In dark mode, is depth communicated through subtle surface elevation (`#09090b` canvas $\rightarrow$ `#18181b` surface) rather than blurred drop shadows?
- **Micro-Interactions & Tactile Feedback:**
  - Do buttons have an active physical compression (`active:scale-[0.985] active:translate-y-[0.5px]`)?
  - Are transition durations snappy (100–150ms for micro-interactions; 200–280ms for overlays)?
  - Do motion curves use natural exponential spring physics (`cubic-bezier(0.16, 1, 0.3, 1)`)?
- **Themed Browser Surfaces:**
  - Are text selection (`::selection`), caret color (`caret-color`), and focus rings (`:focus-visible`) styled with palette tokens?

### Phase 3: Execute Highest-Impact Improvements First
1. **Underlying Primitives First:** Fix the shared token or base component (e.g., in `Button.tsx` or `DESIGN.md`), allowing the polish to propagate cleanly across all instances.
2. **Eliminate Visual Noise:** Remove repetitive section kickers/eyebrows, redundant card borders inside cards, and gratuitous glow gradients.
3. **Harmonize Spacing:** Align mismatched padding between adjacent cards and container edges.

### Phase 4: Re-inspection & Verification
- Re-run the application and capture updated screenshots.
- Confirm that every change improved visual coherence without introducing regression or breaking responsive behavior.

---

## 3. Practical Execution Steps

```bash
# 1. Run audit to establish baseline quality score
npx pure-saas audit --source src

# 2. Inspect live rendered layout in browser
npx pure-saas browser screenshot http://localhost:3000 --out-dir .screens

# 3. Apply targeted visual polish to components and tokens
npx pure-saas polish "Fix heading tracking, hairline card borders, and button active states"

# 4. Re-verify audit score improvements
npx pure-saas audit --source src
```

---

## 4. Judging Success

Your polish is successful when:
- **Noticeable Craft Elevation:** The interface immediately feels more refined, authoritative, and premium to experienced designers.
- **Preserved Identity & Stability:** The visual brand, layout structure, and backend integrations remain intact.
- **Architectural Cleanliness:** Improvements exist in clean tokens, components, or layout rules—not stacked CSS overrides.
- **Zero Regressions:** Zero broken layouts at mobile (375px) or desktop (1440px), zero contrast regressions, and zero console warnings.
