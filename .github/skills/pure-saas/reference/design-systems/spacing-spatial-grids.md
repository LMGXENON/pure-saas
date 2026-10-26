# Spatial Grids, Layout Rhythm & Spacing Tokens

Spatial systems define rhythm, alignment, and balance. Pure SaaS enforces an 8pt spatial grid with 4pt micro-steps for compact UI density.

---

## 1. Architectural Structure & Tiers

| Level / Tier | Core Role | Usage / Purpose |
| :--- | :--- | :--- |
| **Micro Scale (2px, 4px)** | Icon gaps, badge insets, hairline offsets | Micro-alignment |
| **Component Scale (8px, 12px, 16px, 24px)** | Input padding, card insets, list item gaps | Tactile components |
| **Macro Scale (32px, 48px, 64px, 96px, 128px)** | Section padding, hero margins, layout gutters | Architectural breathing room |

---

## 2. Code & Configuration Reference

```css
:root {
  --space-0-5: 2px;
  --space-1:   4px;
  --space-2:   8px;
  --space-3:   12px;
  --space-4:   16px;
  --space-5:   20px;
  --space-6:   24px;
  --space-8:   32px;
  --space-12:  48px;
  --space-16:  64px;
  --space-24:  96px;
}
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Snap all margins, paddings, and component heights to multiples of 4px and 8px. | Never introduce random arbitrary spacing like 17px or 29px without an architectural justification. |
| Keep section gaps proportional to typography scale. |  |

---

## 4. Accessibility & Quality Standards

- **Adequate spacing between interactive touch targets (minimum 8px gap).**

---

## 5. Anti-Slop Enforcement

- Enforce strict token binding across all components.
- Prevent arbitrary numbers and unverified hex values in pull requests.
