# React Render Performance & Re-render Optimization

High-frequency UI updates (e.g. typing, slider dragging, live metrics) must not trigger catastrophic whole-tree re-renders.

---

## 1. Architectural Principles & Mechanisms

| Principle / Pattern | Concrete Implementation Detail |
| :--- | :--- |
| **State Colocation** | Push state down to the lowest possible node that consumes it |
| **Fast Context Splitting** | Separate rarely changing state from high-frequency dispatch |
| **Memo Boundaries** | Use React.memo with custom comparison functions on expensive table rows and chart canvases |

---

## 2. Code Implementation Reference

```tsx
// Separate dispatch from state to prevent consumer re-renders
const CounterContext = createContext<number>(0);
const CounterDispatchContext = createContext<React.Dispatch<Action> | null>(null);

export const CounterConsumer = React.memo(() => {
  const count = useContext(CounterContext);
  return <span>{count}</span>;
});
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Colocate state to local component subtrees whenever possible. | Never put raw mousemove or scroll event coordinates into top-level page state. |
| Profile renders with React DevTools Profiler to catch cascading re-renders. |  |

---

## 4. Accessibility & Performance Verification

- **Ensure performance optimizations do not bypass required live-region text updates.**

---

## 5. Anti-Slop Discipline

- Avoid bloated JavaScript dependencies when standard Web APIs and clean React patterns suffice.
- Ensure component boundaries remain maintainable and strictly typed.
