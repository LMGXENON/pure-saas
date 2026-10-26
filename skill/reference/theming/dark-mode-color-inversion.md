# Dark Mode Architecture & Color Inversion Principles

Dark mode is not an automated mathematical negative of light mode. It requires desaturating primary colors, adjusting surface elevations, and balancing luminance to reduce visual glare.

---

## 1. Architectural Rules & Core Principles

| Rule / Principle | Concrete Specification |
| :--- | :--- |
| **Desaturate Accent Hues** | Vibrant colors that look crisp on white create eye-straining chromatic vibration on dark gray |
| **Surface Elevation by Lightness** | Higher elevation = lighter surface in dark mode (e.g. #0a0a0c base -> #18181b card -> #27272a dialog) |
| **Avoid Pure Black (#000000)** | Pure black causes severe smearing on OLED screens and stark contrast fatigue; prefer deep slate/zinc tones |

---

## 2. Configuration & Implementation Reference

```css
/* Light mode vs Dark mode token pairings */
:root {
  --color-canvas: #f8fafc;
  --color-surface: #ffffff;
  --color-border: #e2e8f0;
  --color-text-primary: #0f172a;
}

[data-theme="dark"] {
  --color-canvas: #09090b;
  --color-surface: #121215;
  --color-border: rgba(255, 255, 255, 0.08);
  --color-text-primary: #f8fafc;
}
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Use deep charcoal/zinc backgrounds (#09090b) rather than harsh #000000. | Never invert images, avatars, or video elements with dark mode CSS filters. |
| Slightly desaturate bright colored tags and status badges. |  |

---

## 4. Verification & Testing Standards

- **Verify text achieves at least 4.5:1 contrast against elevated dark surfaces.**

---

## 5. Anti-Slop Discipline

- Eliminate hardcoded hex values; ensure all themes cleanly resolve to semantic variables.
