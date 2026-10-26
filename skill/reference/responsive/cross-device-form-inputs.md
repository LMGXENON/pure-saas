# Cross-Device Form Input Optimization & Virtual Keyboards

Optimizing form inputs for mobile devices requires invoking the correct virtual keyboard layout, preventing unwanted auto-zoom, and streamlining entry.

---

## 1. Responsive Viewports & Architecture

| Viewport / Dimension | Technical Specification |
| :--- | :--- |
| **Input Modes** | inputmode="numeric" for credit cards/OTP, inputmode="decimal" for currency, inputmode="email" |
| **Auto-Zoom Prevention** | Font-size must be at least 16px on iOS inputs to prevent mobile Safari from zooming the viewport |
| **Keyboard Action Keys** | enterkeyhint="next" or "done" to guide keyboard progression |

---

## 2. Code Implementation Reference

```css
<!-- Optimal Mobile Form Input -->
<input
  id="order-amount"
  type="text"
  inputmode="decimal"
  enterkeyhint="done"
  style="font-size: 16px;" /* Prevents iOS auto-zoom */
  class="h-11 px-3 rounded-lg border bg-[var(--color-surface-base)]"
/>
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Set input font-size to at least 16px (1rem) to prevent mobile Safari auto-zooming. | Never set `<meta name="viewport" content="maximum-scale=1.0, user-scalable=no">` (breaks accessibility). |
| Use explicit `inputmode` and `enterkeyhint` attributes. |  |

---

## 4. Accessibility & Viewport Reflow

- **WCAG 1.4.4 Resize Text: User must be able to zoom text up to 200% without loss of content.**

---

## 5. Anti-Slop Enforcement

- Eliminate horizontal scrollbars on mobile; ensure layouts reflow smoothly down to 320px.
