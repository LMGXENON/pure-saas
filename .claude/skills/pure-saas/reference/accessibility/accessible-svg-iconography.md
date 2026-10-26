# Accessible SVG Iconography & Visual Symbols

Icons must be treated according to their functional intent: decorative icons must be hidden from screen readers, while standalone action icons require accessible labels.

---

## 1. Compliance Criteria & Specifications

| Standard / Criterion | Name | Technical Requirement |
| :--- | :--- | :--- |
| **aria-hidden="true"** | Decorative Icons | Applied to icons that accompany visible text labels to prevent duplicate screen reader announcements |
| **role="img" + aria-label** | Standalone Icons | Applied to icon-only buttons (search, close, settings) to describe their function |

---

## 2. Accessible Implementation Example

```tsx
// 1. Decorative icon next to text
<button className="flex items-center gap-2">
  <svg aria-hidden="true" className="w-4 h-4"><path d="..." /></svg>
  <span>Download Log</span>
</button>

// 2. Standalone icon button
<button aria-label="Close modal dialog" className="p-2">
  <svg aria-hidden="true" className="w-4 h-4"><path d="..." /></svg>
</button>
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Always add `aria-hidden="true"` to SVGs that accompany visible text. | Never render an icon-only button without an accessible name. |
| Always provide an explicit `aria-label` or visually hidden span on icon-only buttons. |  |

---

## 4. Testing & Verification Protocol

- **WCAG 1.1.1 Non-text Content.**

---

## 5. Anti-Slop Discipline

- Accessibility is non-negotiable; never disable focus rings or use inaccessible low-contrast colors for stylistic convenience.
