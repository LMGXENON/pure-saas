# requestAnimationFrame Scheduling & Scroll Performance

High-frequency events like window scroll, resize, and mouse tracking must be scheduled via `requestAnimationFrame` to avoid main-thread jank.

---

## 1. Architectural Principles & Mechanisms

| Principle / Pattern | Concrete Implementation Detail |
| :--- | :--- |
| **rAF Throttling** | Throttle DOM updates to hardware refresh rate (60Hz / 120Hz) |
| **Passive Event Listeners** | Add `{ passive: true }` to scroll/touch listeners for instantaneous scrolling |
| **Transform Only** | Mutate GPU-accelerated CSS properties (`transform`, `opacity`) |

---

## 2. Code Implementation Reference

```tsx
// rAF scroll listener throttling pattern
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateParallaxPosition(window.scrollY);
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Use passive listeners on all scroll and touchmove events. | Never trigger layout thrashing (e.g. reading offsetHeight and immediately writing style.height) inside a loop. |
| Cancel pending animation frames on component unmount. |  |

---

## 4. Accessibility & Performance Verification

- **Respect reduced-motion preferences by disabling scroll-based transformations.**

---

## 5. Anti-Slop Discipline

- Avoid bloated JavaScript dependencies when standard Web APIs and clean React patterns suffice.
- Ensure component boundaries remain maintainable and strictly typed.
