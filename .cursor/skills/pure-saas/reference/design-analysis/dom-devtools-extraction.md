# Live Website DOM & DevTools Reverse Engineering

Inspecting live reference websites via browser DevTools extracts exact computed styles, CSS variables, and layout structures rather than relying on optical guesswork.

---

## 1. Core Dimensions & Methodology

| Dimension | Technical Detail |
| :--- | :--- |
| **Computed Properties** | Inspect window.getComputedStyle() for exact font-family, font-size, line-height, letter-spacing |
| **CSS Variables** | Extract root custom properties (--color-*, --space-*) |
| **Animation Curves** | Inspect DevTools Animations panel to scrub transitions and export cubic-bezier timings |

---

## 2. Implementation & Extraction Reference

```javascript
// Browser Console Snippet to Extract CSS Variables
const rootStyles = getComputedStyle(document.documentElement);
const cssVars = Array.from(document.styleSheets)
  .flatMap(sheet => {
    try { return Array.from(sheet.cssRules); } catch (e) { return []; }
  })
  .filter(rule => rule.selectorText === ':root')
  .flatMap(rule => Array.from(rule.style))
  .filter(prop => prop.startsWith('--'))
  .reduce((acc, prop) => {
    acc[prop] = rootStyles.getPropertyValue(prop).trim();
    return acc;
  }, {});
console.log(JSON.stringify(cssVars, null, 2));
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Extract computed styles using browser automation or developer tools. | Never assume font-family based on visual appearance without checking network font files. |
| Document dynamic hover and active states of buttons and cards. |  |

---

## 4. Accessibility & Verification

- **Inspect DOM hierarchy to verify semantic headings and ARIA landmarks.**

---

## 5. Anti-Slop Enforcement

- Never guess or approximate when live DOM styles or computed CSS variables can be directly verified.
