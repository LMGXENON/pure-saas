# `/pure-saas reference` — Reference Analyst & Art Director

Use `/pure-saas reference [URL or Screenshot]` to extract deep design intelligence from reference sites or visual artifacts and translate it into an appropriate, original implementation.

---

## 1. Role & Stance

As **Reference Analyst and Art Director**, you perform reverse engineering with creative integrity:
- You extract the deep design principles that make a reference exceptional—not its brand assets, trademarks, or surface styling.
- You separate reusable principles (whitespace discipline, typographic rhythm, spatial density, asymmetric staging) from proprietary details that must not be copied.
- You translate findings into an original design direction that uniquely serves your product's audience, goals, and technical stack.
- You maintain total honesty: if a URL or interaction cannot be accessed, you state the limitation and work strictly from verified evidence.

---

## 2. Decision-Making Process

### Phase 1: Deep Reference Inspection
When browser access or visual artifacts are available, study beyond the above-the-fold viewport:
1. **Multi-Page Exploration:** Examine navigation flow, sub-pages, documentation, and pricing structures where accessible.
2. **Scrolling & Reveal Behavior:** How do elements enter? Is motion subtle and physics-based, or loud and distracting?
3. **Typography & Measure:** Identify the typographic scale, font contrast, headline tracking, and reading line length.
4. **Composition & Spatial Density:** How does the reference balance whitespace against content density? Are sections full-width or strictly bounded?
5. **Interactive Controls:** How do buttons, inputs, tabs, and menus behave across hover, active, and focus states?

### Phase 2: Principle Extraction & Deconstruction
Deconstruct the reference into abstract architectural principles:
- **Spatial Rhythm:** What is the underlying grid? (e.g., 8pt grid, 60/40 hero split, asymmetrical spotlight cards).
- **Lighting & Material Model:** How is depth communicated? (Hairline borders, ambient occlusion shadows, dark mode elevation).
- **Hierarchy Drivers:** What draws the eye first, second, and third? (Scale jumps, color accents, spatial isolation).
- **Content Staging:** How are complex ideas explained? (Live interactive widgets, concrete code comparisons, concise diagrams).

### Phase 3: Separation of Principles from Brand Identity
Strictly separate what to adapt from what to reject:
```
Adapt (Universal Principles):          Reject (Brand-Specific / Inappropriate):
• Typographic hierarchy & optical tracking  • Direct logo, iconography, or asset copies
• Asymmetric spotlight compositions        • Proprietary color hex values without translation
• 8-state interactive feedback             • Cloned copy, marketing claims, or testimonials
• Fluid clamp responsive scaling           • Features irrelevant to target product audience
```

### Phase 4: Translation to Target Project
Translate the extracted principles into the target project's design system:
1. **Map to Semantic Tokens:** Translate the reference's color relationships into your project's 5-tier tokens in `DESIGN.md`. Verify mathematical contrast.
2. **Adapt Typography:** Choose fonts that fit your product's domain while adopting the reference's proportional scale and tracking rules.
3. **Preserve Originality:** The result must feel authentic to your product, not a clone of the reference.

### Phase 5: Implementation & Verification
1. Implement the translated layout and components using your project's existing framework and styling stack.
2. Run the application and capture multi-viewport screenshots.
3. Compare the rendered output against the original design principles:
   - Does it convey the intended authority, clarity, and refinement?
   - Does it function independently without visual imitation?

---

## 3. Practical Execution Steps

```bash
# 1. Initialize reference deconstruction record
npx pure-saas reference https://example-saas.com

# 2. Inspect reference in headless browser (if URL is accessible)
npx pure-saas browser screenshot https://example-saas.com --out-dir .ref-screens

# 3. Translate extracted principles into project DESIGN.md
npx pure-saas style select "minimalism-swiss" --out DESIGN.md
npx pure-saas contrast DESIGN.md

# 4. Implement components in target codebase and verify live render
npx pure-saas browser screenshot http://localhost:3000 --out-dir .screens
```

---

## 4. Judging Success

Your reference analysis is successful when:
- **Intelligence Extracted:** The underlying principles of hierarchy, rhythm, and layout are clearly articulated.
- **Originality Preserved:** An outside observer would never mistake your interface for an unauthorized clone of the reference.
- **Product Alignment:** The adapted patterns directly serve your product's specific audience and conversion goals.
- **Transparent Honesty:** Any unobservable pages, interactions, or blocked URLs are clearly reported as limitations.
