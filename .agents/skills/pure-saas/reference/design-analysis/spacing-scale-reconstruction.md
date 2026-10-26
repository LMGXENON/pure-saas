# Spacing Scale Reconstruction & Spatial Reverse Engineering

Reverse engineering layouts requires identifying the underlying spatial rhythm (typically 4pt or 8pt grid) to eliminate arbitrary padding values.

---

## 1. Core Dimensions & Methodology

| Dimension | Technical Detail |
| :--- | :--- |
| **Gutter Analysis** | Measure horizontal gaps between grid columns (16px, 24px, 32px) |
| **Padding Derivation** | Measure internal component insets and calculate standard component scales |
| **Section Vertical Rhythm** | Measure vertical margins between major section headers (64px, 96px, 128px) |

---

## 2. Implementation & Extraction Reference

```javascript
/* Reconstructed Spacing Scale */
--space-card-padding: 24px;
--space-section-gap: 96px;
--space-grid-gutter: 32px;
--space-inline-gap: 8px;
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Snap observed pixel distances to the nearest 4px or 8px grid step. | Do not hardcode random uneven numbers like 27px or 43px. |
| Check consistency across desktop and mobile containers. |  |

---

## 4. Accessibility & Verification

- **Maintain generous spacing between interactive controls.**

---

## 5. Anti-Slop Enforcement

- Never guess or approximate when live DOM styles or computed CSS variables can be directly verified.
