# Infinite Scroll & Virtualized Feed Patterns

Infinite scrolling provides seamless browsing for feeds and logs, but requires robust scroll restoration and footer reachability solutions.

---

## 1. Architectural Principles & Key Aspects

| Aspect / Mechanism | Implementation Specification |
| :--- | :--- |
| **IntersectionObserver** | Trigger next batch fetch 300px before the user reaches the bottom |
| **Scroll Position Restoration** | Return user to their exact scroll coordinates when navigating back |
| **Accessible Load More Button** | Provide an explicit "Load More" fallback for keyboard users and screen readers |

---

## 2. Implementation Guide

```tsx
import { useEffect, useRef } from 'react';

export function useInfiniteObserver(onIntersect: () => void, hasMore: boolean) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasMore) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) onIntersect();
    }, { rootMargin: '300px' });

    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [onIntersect, hasMore]);

  return sentinelRef;
}
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Provide an accessible "Load More" button or virtual pagination for users who prefer keyboard stepping. | Never trap users in an infinite loop that makes the page footer unreachable. |
| Keep the browser URL updated with the current page state. |  |

---

## 4. Accessibility & Interaction Integrity

- **Announce newly loaded batch counts via aria-live="polite".**

---

## 5. Anti-Slop Discipline

- Avoid distracting, unnecessary motion or confetti effects for mundane actions.
- Ensure keyboard navigation operates identically to pointer interaction.
