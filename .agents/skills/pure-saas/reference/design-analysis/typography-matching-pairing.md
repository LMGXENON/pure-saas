# Typography Matching, Pairing & Font Fallbacks

Accurately reproducing a brand identity requires identifying primary display typefaces, editorial body pairings, and reliable system font stacks.

---

## 1. Core Dimensions & Methodology

| Dimension | Technical Detail |
| :--- | :--- |
| **Classification** | Identify typeface classification (Geometric Sans, Neo-Grotesque, Humanist Sans, Editorial Serif, Monospace) |
| **Weight & Optical Sizing** | Match font weights (400, 500, 600, 700) and optical tracking |
| **Robust Fallbacks** | Define zero-CLS system fallbacks with matching x-height and size-adjust |

---

## 2. Implementation & Extraction Reference

```javascript
/* Typography pairing with size-adjust to prevent CLS */
@font-face {
  font-family: 'FallbackSans';
  src: local('Arial');
  ascent-override: 95%;
  descent-override: 25%;
  size-adjust: 102%;
}

:root {
  --font-heading: 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'Geist Mono', 'SF Mono', Menlo, Consolas, monospace;
}
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Use `size-adjust` on system fallback fonts to prevent layout shift during web font loading. | Never mix more than two distinct font families in a single application interface. |
| Pair a distinctive heading font with a neutral, highly readable body font. |  |

---

## 4. Accessibility & Verification

- **Verify font legibility at 12px and 14px sizes.**

---

## 5. Anti-Slop Enforcement

- Never guess or approximate when live DOM styles or computed CSS variables can be directly verified.
