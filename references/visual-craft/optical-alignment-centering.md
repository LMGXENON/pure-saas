# Optical Alignment vs Mathematical Centering

Mathematical centering frequently looks off-center to the human eye due to typographic ascenders/descenders, icon visual weight, and asymmetric shapes.

---

## 1. Craft Pillars & Core Mechanisms

| Principle / Mechanism | Concrete Specification |
| :--- | :--- |
| **Play Triangle Offset** | Play icons require ~10% horizontal rightward nudging due to triangular center of mass |
| **Cap-Height Text Centering** | Align icons to the uppercase cap-height rather than total font line-box |
| **Badge Baseline Alignment** | Nudge inline status badges by -1px for baseline balance |

---

## 2. Code & Style Implementation

```css
/* Optical adjustment for play button triangle */
.play-button svg {
  transform: translateX(1px); /* Nudges visual center of triangle */
}

/* Align icon with text cap-height */
.icon-text-row {
  display: flex;
  align-items: center;
}
.icon-text-row svg {
  margin-top: -1px; /* Optical baseline correction */
}
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Visually inspect centered play buttons and asymmetric icons and nudge by 1-2px. | Never blindly trust flexbox `items-center` without checking typographic ascender bias. |
| Check vertical icon alignment against adjacent text cap-height. |  |

---

## 4. Accessibility & Performance Verification

- **Optical CSS nudges must not disrupt container focus rings.**

---

## 5. Anti-Slop Discipline

- Avoid generic AI tropes: purple/cyan blurs, fake spherical 3D assets, unearned confetti.
- Elevate visual quality through genuine typography, materials, and physics.
