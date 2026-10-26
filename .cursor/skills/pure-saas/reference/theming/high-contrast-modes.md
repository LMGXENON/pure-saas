# High Contrast Mode & Forced-Colors Adaptations

Operating system high-contrast modes assist users with significant vision loss by replacing author colors with system-defined high-contrast palettes.

---

## 1. Architectural Rules & Core Principles

| Rule / Principle | Concrete Specification |
| :--- | :--- |
| **@media (forced-colors: active)** | Browser ignores author backgrounds and text colors |
| **System Color Keywords** | Use Canvas, CanvasText, Highlight, HighlightText, ButtonText |
| **Transparent Borders** | Elements that rely on background contrast must have a 1px solid transparent border to remain visible |

---

## 2. Configuration & Implementation Reference

```css
/* Ensure cards and buttons remain defined in Windows High Contrast */
.card {
  border: 1px solid transparent; /* Becomes visible in forced-colors mode */
}

@media (forced-colors: active) {
  .badge-active {
    forced-color-adjust: none; /* Only use if critical to preserve brand distinction */
  }
}
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Add 1px transparent borders to cards, inputs, and buttons so they gain solid borders in forced-colors mode. | Never indiscriminately apply `forced-color-adjust: none` across the entire document. |
| Test interfaces with Windows Contrast themes. |  |

---

## 4. Verification & Testing Standards

- **Essential for low-vision users on Windows platforms.**

---

## 5. Anti-Slop Discipline

- Eliminate hardcoded hex values; ensure all themes cleanly resolve to semantic variables.
