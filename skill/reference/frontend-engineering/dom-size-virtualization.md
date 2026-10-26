# DOM Size Optimization & Large List Virtualization

Rendering thousands of DOM elements causes high memory consumption and unresponsive scroll frames. Virtualization renders strictly the visible window.

---

## 1. Architectural Principles & Mechanisms

| Principle / Pattern | Concrete Implementation Detail |
| :--- | :--- |
| **Virtual Windowing** | Only mount elements currently inside the scroll viewport plus an overscan buffer |
| **Dynamic Heights** | Measure and cache variable row dimensions on the fly |
| **DOM Budget** | Keep total document DOM nodes under 1,500 for 60fps performance |

---

## 2. Code Implementation Reference

```tsx
// Conceptual virtualization pattern
const totalRows = 10000;
const rowHeight = 40;
const visibleCount = Math.ceil(containerHeight / rowHeight);
const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - 2); // 2 overscan
const endIndex = Math.min(totalRows, startIndex + visibleCount + 4);

const visibleItems = items.slice(startIndex, endIndex);
const offsetY = startIndex * rowHeight;
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Virtualize data tables, logs, and feeds with more than 100 items. | Never render 10,000 raw DOM nodes directly in the browser. |
| Maintain an overscan buffer (2-4 items) for smooth keyboard scrolling. |  |

---

## 4. Accessibility & Performance Verification

- **Include aria-rowcount and aria-rowindex so screen readers report correct list position.**

---

## 5. Anti-Slop Discipline

- Avoid bloated JavaScript dependencies when standard Web APIs and clean React patterns suffice.
- Ensure component boundaries remain maintainable and strictly typed.
