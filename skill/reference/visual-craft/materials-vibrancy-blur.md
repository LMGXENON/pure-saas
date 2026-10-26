# Materials, Vibrancy & Acrylic Backdrop Blur

Materials simulate translucent physical surfaces that adopt the color temperature of underlying content while maintaining legible contrast.

---

## 1. Craft Pillars & Core Mechanisms

| Principle / Mechanism | Concrete Specification |
| :--- | :--- |
| **Ultra-Thin Material** | 10-12px blur, 60% opacity for floating toolbars |
| **Regular Material** | 20px blur, 75% opacity for navigation headers and sheets |
| **Thick Material** | 30px blur, 88% opacity for modals and system dialogs |

---

## 2. Code & Style Implementation

```css
.material-regular {
  background-color: var(--color-material-regular-bg);
  backdrop-filter: blur(16px) saturate(160%);
  -webkit-backdrop-filter: blur(16px) saturate(160%);
  border: 1px solid var(--color-material-border);
}
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Always prefix with `-webkit-backdrop-filter` for Safari support. | Do not layer more than two blurred elements on top of each other (severe GPU performance penalty). |
| Pair translucent materials with an opaque fallback for older rendering engines. |  |

---

## 4. Accessibility & Performance Verification

- **Contrast of text overlaid on blurred materials must be verified against worst-case background imagery.**

---

## 5. Anti-Slop Discipline

- Avoid generic AI tropes: purple/cyan blurs, fake spherical 3D assets, unearned confetti.
- Elevate visual quality through genuine typography, materials, and physics.
