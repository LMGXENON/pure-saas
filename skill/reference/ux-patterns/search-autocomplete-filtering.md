# Search Autocomplete & Instant Filter Patterns

Search autocomplete anticipates queries and displays rich matching entities with highlighted substring terms.

---

## 1. Architectural Principles & Key Aspects

| Aspect / Mechanism | Implementation Specification |
| :--- | :--- |
| **Debouncing (250-300ms)** | Prevent spamming backend APIs during continuous keystrokes |
| **Substring Highlighting** | Bold matched substrings to verify why a result was returned |
| **Keyboard Roving Focus** | Arrow down seamlessly highlights results without changing input focus |

---

## 2. Implementation Guide

```tsx
// Highlight matched substrings cleanly
export function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query) return <span>{text}</span>;
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <strong key={i} className="font-semibold text-[var(--color-accent-primary)]">{part}</strong>
        ) : (
          part
        )
      )}
    </span>
  );
}
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Show recent searches and trending keywords in the empty search state. | Do not erase search parameters upon page refresh (synchronize with URL). |
| Allow Escape to clear the input or close the suggestions panel. |  |

---

## 4. Accessibility & Interaction Integrity

- **Use aria-autocomplete="list" and role="listbox".**

---

## 5. Anti-Slop Discipline

- Avoid distracting, unnecessary motion or confetti effects for mundane actions.
- Ensure keyboard navigation operates identically to pointer interaction.
