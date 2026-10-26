# Art Direction & Taste Skill Guide

> Practical visual art direction, aesthetic archetypes, and anti-generic design heuristics for AI coding agents.  
> Adapted from and compatible with **Taste Skill** (by Leonxlnx, MIT License).

---

## 1. Why Art Direction Matters in AI Code Generation

AI coding models default to a predictable visual monoculture:
- Centered heroes with uniform gradient meshes
- Repetitive 3-column feature cards with generic rounded corners
- Overused font defaults (unadjusted Inter with default tracking)
- Purple, cyan, and indigo gradient text
- Low-contrast light gray on white or dark gray on black
- Excessive glassmorphism blur and gratuitous floating elements

**Taste Skill** establishes intentional visual restraint, rhythmic layout variance, distinct typographic personality, and an active self-correction loop before code is written.

---

## 2. The 4-Stage Taste Pipeline

```
1. BRIEF & MOOD   ──► 2. DRAW & TOKENS ──► 3. BUILD & COMPOSE ──► 4. GATE & LOOK
   Infer vibe &          Establish scale,     Asymmetrical layout,   Browser screenshot,
   archetype             fonts & palette      rhythm, real images    rubric audit
```

### Stage 1: Brief & Mood Inference
Before touching code, extract three essential anchors:
1. **Product Personality:** What emotional tone should the user feel? (Quiet, clinical, tactile, brutalist, expensive, archival, industrial).
2. **Design Archetype:** Which visual language serves the domain? (See Section 3).
3. **Primary Focal Point:** What is the single most important element on the screen? (A live demo, a code snippet, a high-contrast metric, a physical object).

### Stage 2: Draw & Tokens
Map tokens to semantic CSS variables or `DESIGN.md`:
- Set explicit typographic hierarchy with purposeful tracking (`-0.025em` on display headings).
- Establish a deliberate 8pt spacing rhythm with wide breaks between sections (64px–128px).
- Define surfaces with 1px hairline borders (`rgba(255,255,255,0.08)` or `rgba(0,0,0,0.08)`) instead of diffuse shadows.

### Stage 3: Build & Dynamic Rhythm
- **Banish symmetrical 3-column card rows:** Replace them with asymmetrical split layouts, 60/40 hero grids, horizontal metric rows, or full-width interactive panes.
- **Real-world assets over empty placeholders:** Use realistic data, contextual code, and high-fidelity visuals rather than generic "Lorem Ipsum" and empty gray rectangles.

### Stage 4: Gate & Visual Self-Correction
Capture rendered screenshots via browser automation (`pure-saas browser screenshot`) and evaluate against the Taste Rubric:
- Does it look like a template, or an intentional product?
- Is there sufficient whitespace contrast?
- Are micro-interactions snappy (<200ms) with spring physics?

---

## 3. Five Curated Taste Archetypes

| Archetype | Keywords | Primary Font | Canvas / Surface | Accent / Character | Best For |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Minimalist Swiss** | Rational, crisp, spacious, grid-aligned, high-contrast | Geist / Helvetica Neue | Pure `#ffffff` / `#f8fafc` | Pure `#09090b` (Zero gradient) | Dev tools, SaaS, documentation |
| **Soft Polished** | Expensive, calm, tactile, warm, generous whitespace | Inter / SF Pro Display | Off-white `#fafaf9` / `#f5f5f4` | Deep Amber `#78350f` or Navy `#1e293b` | Consumer fintech, wellness, luxury |
| **Neo-Brutalist** | High-contrast, stark, tabular, mechanical, bold | JetBrains Mono / Space Grotesk | Pure `#000000` / `#121212` | Acid Lime `#a3e635` or Orange `#f97316` | Web3, developer CLI, music, indie |
| **Editorial Literary** | Archival, serif-driven, literary, generous margins | Newsreader / Fraunces | Warm Cream `#faf9f5` / `#f4f1ea` | Forest Green `#14532d` | Research, essays, publications |
| **Technical Terminal** | Code-first, high-density, monospace, tabular numbers | JetBrains Mono / Geist Mono | Deep Obsidian `#0c0d0e` / `#151719` | Electric Orange `#fa5d29` | Observability, cloud, APIs |

---

## 4. Anti-Slop Heuristics & Taste Rules

1. **Rule of the Hero Anchor:** A hero must contain a functioning preview, interactive terminal, or real data display. Never use an empty card with a generic title.
2. **Rule of Negative Space:** When in doubt, increase vertical spacing between sections by 1.5x. Cramped sections feel cheap; generous whitespace conveys confidence.
3. **Rule of Border Elegance:** Avoid 2px+ thick rounded outlines. Use delicate 1px hairline borders (`border border-border-subtle`).
4. **Rule of Font Hierarchy:** Never combine more than two font families. Pair one distinctive display/heading font with a highly legible neutral sans-serif or monospace body.
5. **Rule of Color Discipline:** Restrict accent colors to interactive targets, active states, and critical alerts. Do not paint every title with a multi-stop color gradient.

---

## 5. Image-to-Code Reference Workflow

When translating reference images or moodboards into code:
1. **Deconstruct the Grid:** Identify columns, margins, and horizontal baseline alignment.
2. **Sample Real Values:** Extract exact hex codes, corner radii, and padding ratios from reference elements.
3. **Preserve Content Proportions:** Maintain aspect ratios and whitespace distribution.
4. **Validate via Overlay Comparison:** Capture a screenshot of the implemented page and compare side-by-side with the reference.

---

## Attribution & License

Portions of this art-direction guidance, aesthetic archetypes, and visual anti-slop heuristics are adapted from [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill), released under the **MIT License**.  
Copyright (c) 2025-2026 Leonxlnx.
