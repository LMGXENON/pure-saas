# Motion Curve & Physics Reverse Engineering

Recreating the tactile feel of an interface requires analyzing duration, acceleration, and damping curves from live reference sites.

---

## 1. Core Dimensions & Methodology

| Dimension | Technical Detail |
| :--- | :--- |
| **Frame Rate Analysis** | Record 60fps / 120fps video to count animation frames |
| **Curve Fitting** | Fit transitions to CSS cubic-bezier parameters |
| **Stagger Offset Measurement** | Measure millisecond delay between consecutive list item entrances |

---

## 2. Implementation & Extraction Reference

```javascript
/* Reconstructed motion tokens */
--motion-duration-popover: 180ms;
--motion-ease-popover: cubic-bezier(0.16, 1, 0.3, 1);
--motion-stagger-delay: 35ms;
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Recreate physics-based deceleration curves rather than generic linear transitions. | Never slow down animations beyond 350ms for basic navigational transitions. |
| Respect prefers-reduced-motion preferences. |  |

---

## 4. Accessibility & Verification

- **Provide instant transitions for users requesting reduced motion.**

---

## 5. Anti-Slop Enforcement

- Never guess or approximate when live DOM styles or computed CSS variables can be directly verified.
