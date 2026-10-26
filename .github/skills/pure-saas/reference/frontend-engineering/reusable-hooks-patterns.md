# Custom React Hooks for UI Primitives

Custom hooks package browser event listeners, media queries, and lifecycle behaviors into reusable functional primitives.

---

## 1. Architectural Principles & Mechanisms

| Principle / Pattern | Concrete Implementation Detail |
| :--- | :--- |
| **useMediaQuery** | Listens to responsive CSS media queries cleanly with cleanup |
| **useClickOutside** | Detects pointer events outside a referenced element for modal dismissal |
| **useDebounce** | Delays state updates until input stabilizes |

---

## 2. Code Implementation Reference

```tsx
// useMediaQuery hook
import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Always remove event listeners in the hook cleanup return function. | Do not call hooks conditionally or within loops. |
| Keep hook dependencies strictly declared in useEffect dependency arrays. |  |

---

## 4. Accessibility & Performance Verification

- **Support window.matchMedia("(prefers-reduced-motion: reduce)") hook for adaptive animation.**

---

## 5. Anti-Slop Discipline

- Avoid bloated JavaScript dependencies when standard Web APIs and clean React patterns suffice.
- Ensure component boundaries remain maintainable and strictly typed.
