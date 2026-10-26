# Color Palette Construction & Perceptual Lightness Scales

Building accessible digital color systems requires perceptual uniformity. Pure SaaS utilizes OKLCH color spaces to avoid the hue shifts and uneven luminance steps inherent to traditional RGB and HSL.

---

## 1. Architectural Structure & Tiers

| Level / Tier | Core Role | Usage / Purpose |
| :--- | :--- | :--- |
| **OKLCH Lightness** | Perceptual brightness (L: 0% to 100%) remains uniform across hues | Guarantees predictable contrast |
| **Chroma Ramp** | Controls color saturation without blowing out contrast boundaries | Keeps hues natural |
| **Light/Dark Parity** | Step 50 in light mode corresponds to Step 950 in dark mode | Predictable theme mapping |

---

## 2. Code & Configuration Reference

```css
/* OKLCH Uniform Luminance Scale Example */
:root {
  /* Neutral Ramp (Luminance carefully calibrated) */
  --neutral-50:  oklch(0.98 0.005 240);
  --neutral-100: oklch(0.95 0.008 240);
  --neutral-200: oklch(0.89 0.012 240);
  --neutral-500: oklch(0.55 0.020 240);
  --neutral-800: oklch(0.24 0.018 240);
  --neutral-900: oklch(0.16 0.015 240);
  --neutral-950: oklch(0.11 0.012 240);

  /* Primary Brand Blue (Predictable 4.5:1 contrast against neutral-50) */
  --brand-500: oklch(0.58 0.22 255);
}
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Use OKLCH for programmatic palette generation to prevent yellow/blue luminance skew. | Never rely on HSL lightness (e.g. hsl(60, 100%, 50%) yellow has dramatically higher perceived luminance than hsl(240, 100%, 50%) blue). |
| Check contrast against both white and black before locking a primary brand color. |  |

---

## 4. Accessibility & Quality Standards

- **Verify that all text colors on their respective backgrounds achieve >= 4.5:1 ratio.**

---

## 5. Anti-Slop Enforcement

- Enforce strict token binding across all components.
- Prevent arbitrary numbers and unverified hex values in pull requests.
