# Shadow Bloom & Ambient Occlusion Techniques

Realistic depth requires separating the soft ambient shadow (contact occlusion) from the directional key light shadow.

---

## 1. Craft Pillars & Core Mechanisms

| Principle / Mechanism | Concrete Specification |
| :--- | :--- |
| **Ambient Contact Shadow** | Tight spread, low blur, anchors object to the surface immediately below |
| **Directional Key Shadow** | Larger Y-offset, wide blur, simulates overhead illumination |
| **Color Tinted Bloom** | Sampling 5-10% of the brand accent color into the glow shadow |

---

## 2. Code & Style Implementation

```css
/* Multi-layer ambient occlusion + directional shadow */
.card-elevation {
  box-shadow:
    0 1px 2px -0.5px rgba(0, 0, 0, 0.06),   /* Ambient contact shadow */
    0 4px 8px -2px rgba(0, 0, 0, 0.08),     /* Mid-layer occlusion */
    0 16px 24px -6px rgba(0, 0, 0, 0.05);   /* Directional soft bloom */
}
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Combine at least 2 shadow declarations for natural physical lighting. | Never use single-stop dark shadows with 0 blur and 50% opacity. |
| Keep shadow blur radii proportional to elevation distance. |  |

---

## 4. Accessibility & Performance Verification

- **Do not rely solely on shadows to distinguish clickable components.**

---

## 5. Anti-Slop Discipline

- Avoid generic AI tropes: purple/cyan blurs, fake spherical 3D assets, unearned confetti.
- Elevate visual quality through genuine typography, materials, and physics.
