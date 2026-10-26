# Optimistic UI Updates & Instant Feedback

Optimistic updates assume backend operations will succeed, immediately updating the visual state and rolling back with an informative alert if the server rejects the request.

---

## 1. Architectural Principles & Key Aspects

| Aspect / Mechanism | Implementation Specification |
| :--- | :--- |
| **Instant State Mutation** | Reflect toggle, like, bookmark, or creation immediately in local state |
| **Rollback Ledger** | Maintain previous snapshot in memory to restore if API promise rejects |
| **Failure Notification** | Display an undoable toast error if the server call fails |

---

## 2. Implementation Guide

```tsx
// Pattern: React optimistic update with rollback
const [likes, setLikes] = useState(120);
const [hasLiked, setHasLiked] = useState(false);

const handleToggleLike = async () => {
  const prevLikes = likes;
  const prevHasLiked = hasLiked;

  // 1. Optimistic immediate update
  setHasLiked(!hasLiked);
  setLikes(hasLiked ? likes - 1 : likes + 1);

  try {
    await api.toggleLike();
  } catch (err) {
    // 2. Rollback on failure
    setLikes(prevLikes);
    setHasLiked(prevHasLiked);
    toast.error("Could not record like. Please check connection.");
  }
};
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Use for low-risk, high-frequency interactions (favorites, toggles, upvotes, task completion). | Never use optimistic UI for destructive, unrecoverable actions or payments. |
| Quietly synchronize final server response data in the background. |  |

---

## 4. Accessibility & Interaction Integrity

- **Notify screen readers if an action fails and is rolled back.**

---

## 5. Anti-Slop Discipline

- Avoid distracting, unnecessary motion or confetti effects for mundane actions.
- Ensure keyboard navigation operates identically to pointer interaction.
