# Bolder: Amplifying Safe, Generic, or Timid Interfaces

Use `/pure-saas bolder [target]` when an interface feels safe, flat, timid, or indistinguishable from a generic AI bootstrap template.

---

## 1. What "Bolder" Means (and What It Doesn't)

- **Bolder DOES mean:**
  - Distinctive visual thesis with high point of view.
  - Assertive typographic scale contrast (e.g. dramatic difference between headline display scale and body copy).
  - Asymmetric layout balance: breaking repetitive 3-column grids into wide spotlights, split viewports, or dramatic hero moments.
  - Deep, committed contrast: crisp whites against deep charcoal/black, or rich monochromatic saturation.
  - Real, interactive centerpiece: interactive canvas, live code sandbox, or procedural 3D model.
- **Bolder DOES NOT mean:**
  - Adding purple/cyan gradient text.
  - Adding gratuitous glassmorphism blur across every card.
  - Adding loud, distracting bounce animations that disorient users.
  - Adding fake vanity metrics or hyperbolic hype copy.

---

## 2. Creative Amplification Levers

### Lever 1: Typographic Drama
Increase the scale ratio from 1.25 (Major Third) to 1.333 (Perfect Fourth) or 1.5 (Perfect Fifth).
```css
/* Timid Display */
font-size: 2.25rem; /* 36px */

/* Bold, High-Confidence Display */
font-size: clamp(2.5rem, 5vw + 1rem, 4.5rem); /* 40px to 72px */
letter-spacing: -0.035em;
line-height: 1.05;
text-wrap: balance;
```

### Lever 2: Structural Asymmetry
Break the predictable 3-card grid:
```
Timid Grid:    [ Card 1 ]   [ Card 2 ]   [ Card 3 ]

Bolder Form:   [       Primary Hero Spotlight       ]
               [ Secondary 1 ]       [ Secondary 2 ]
```

### Lever 3: Saturated Surface Color
Instead of generic light-gray `#f3f4f6`, use an opinionated canvas:
- Pitch Black / Terminal Obsidian (`#09090b` / `#0c0d0e`) with electric accent (`#fa5d29` or `#38bdf8`).
- Warm Literary Paper (`#faf9f5` / `#f4f1ea`) with deep racing green (`#14532d`).
- Clean High-Contrast Swiss (`#ffffff`) with deep ink black (`#09090b`) and hairline borders.

---

## 3. Verification

Capture screenshots before and after. Verify that readability and accessibility were not sacrificed for boldness (all text must maintain $\ge$ 4.5:1 contrast).

