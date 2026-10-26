# AGENTS.md

Operating manual for AI agents working in this repository, or using Pure SaaS to design, build, and review software.

---

## 1. What This Repository Is

Pure SaaS is an open-source, universal AI-agent skill and frontend engineering toolkit. Its mission is to guide AI coding assistants in generating original, production-quality UI/UX designs while eliminating AI slop across websites, web applications, dashboards, mobile apps, desktop apps, and component libraries.

---

## 2. Command Architecture

Pure SaaS operates via **one intelligent main command and 18 specialized verbs**:

1. **`/pure-saas [request]`**: Universal entry point. Autonomously inspects context, establishes `DESIGN.md`, executes frontend code, binds tokens, integrates motion and accessibility, and verifies output.
2. **Specialized Verbs**:
   - `design`: Establish/update `DESIGN.md` tokens and contracts.
   - `landing`: High-conversion SaaS landing page with hero, proof, and pricing.
   - `review`: 5-dimension deterministic quality audit (0–20 points) with P0–P3 defect triage.
   - `polish`: Elevate visual craft, typography tracking, surface lighting, and micro-interactions.
   - `bolder`: Amplify safe, flat, or bland UI into distinctive, high-conviction creative work.
   - `quieter`: Calm aggressive, noisy, or overstimulated layouts into serene clarity.
   - `typeset`: Editorial typography hierarchy, optical tracking, and fluid clamps.
   - `layout`: Fix spatial rhythm, asymmetric balance, and 8pt grid containment.
   - `distill`: Strip visual debt and simplify complex screens to their essential core.
   - `harden`: Production robustness (empty states, edge cases, error recovery, i18n).
   - `animate`: Purposeful spring physics (`cubic-bezier(0.16, 1, 0.3, 1)`).
   - `colorize`: Strategic 5-tier color ramps and mathematical WCAG 2.2 AA contrast.
   - `delight`: Shaders, reactive canvasses, and tactile micro-surprises.
   - `adapt` / `responsive`: Multi-viewport responsive mastery (375px mobile to 1440px desktop).
   - `clarify`: UX microcopy, active button verbs, and actionable error messages.
   - `optimize`: Core Web Vitals, virtualization, and sub-frame layout stability.
   - `browser`: Playwright CLI headless browser automation and multi-viewport screenshots.
   - `3d`: Procedural Three.js 3D models (img2threejs pipeline).
   - `style`: Modular style archetype registry (Swiss, Technical, Editorial, Modern Enterprise).

---

## 3. The 8-Step Build & Verification Loop

1. **Understand Requirements & Mode:** Determine whether surface is Persuade, Operate, Read, or Experience.
2. **Inspect Context:** Check dependencies, styling system, existing tokens, and backend APIs.
3. **Select Style Archetype:** Pick from curated archetypes in `pure-saas style list`.
4. **Author DESIGN.md:** Define 3-tier semantic tokens and verify WCAG contrast math.
5. **Implement Components:** Build with 8-state interaction matrix and zero raw hex codes.
6. **Capture Real Browser Screenshots:** Test across 1440px, 768px, and 375px viewports.
7. **Forensic Audit:** Measure code against 5 dimensions (0–20 score).
8. **Fix Defects & Verify Finish:** Triage P0–P3 defects and complete deliverable.

---

## 4. Hardware-Grade Craft Floor

- **Zero Raw Hex Colors:** All colors must resolve to semantic tokens in `DESIGN.md`.
- **Zero AI Template Slop:** No purple/cyan gradient text, no identical 3-column feature cards, no repetitive kickers/eyebrows on every heading, no decorative side-stripe borders, no fake status dots, and no emoji UI icons.
- **Themed Browser Surfaces:** Apply active palette tokens to text selection (`::selection`), caret color (`caret-color`), focus rings, and custom scrollbars.
- **Never Fabricate Verification:** If an environment lacks browser inspection tools, report it as `untested`. Never claim passing verification for uninspected code.
