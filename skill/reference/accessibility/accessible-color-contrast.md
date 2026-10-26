# Accessible Color Contrast & APCA Verification

Contrast guarantees that text and visual elements can be deciphered by users with moderate visual impairments and across challenging lighting conditions.

---

## 1. Compliance Criteria & Specifications

| Standard / Criterion | Name | Technical Requirement |
| :--- | :--- | :--- |
| **1.4.3** | Contrast (Minimum) | 4.5:1 for normal text (<18pt or <14pt bold); 3.0:1 for large text |
| **1.4.11** | Non-text Contrast | 3.0:1 for UI component borders, checkmarks, and focus rings |
| **APCA** | Advanced Perceptual Contrast Algorithm | Evaluates perceived contrast based on font-weight, polarity (light on dark vs dark on light), and spatial frequency |

---

## 2. Accessible Implementation Example

```tsx
// Pure SaaS contrast check script
$ npx pure-saas contrast DESIGN.md
// Computes exact mathematical luminance ratios for all documented token pairs
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Test contrast across both light mode and dark mode pairings. | Never place light gray text (#9ca3af) on pure white backgrounds. |
| Increase font-weight or size if a color falls near the 4.5:1 boundary. |  |

---

## 4. Testing & Verification Protocol

- **Contrast must be verified mathematically, never guessed visually.**

---

## 5. Anti-Slop Discipline

- Accessibility is non-negotiable; never disable focus rings or use inaccessible low-contrast colors for stylistic convenience.
