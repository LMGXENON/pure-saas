# Data Fetching, Cache Invalidation & Stale-While-Revalidate

Using TanStack Query or SWR provides instantaneous background synchronization, automatic deduplication, and cache invalidation.

---

## 1. Architectural Principles & Mechanisms

| Principle / Pattern | Concrete Implementation Detail |
| :--- | :--- |
| **Stale-While-Revalidate** | Display cached data immediately while fetching fresh data in the background |
| **Targeted Invalidation** | Invalidate exact query keys upon mutation completion |
| **Window Focus Refetch** | Silently refresh stale data when user tabs back into the application |

---

## 2. Code Implementation Reference

```tsx
// TanStack Query mutation with targeted invalidation
const queryClient = useQueryClient();

const mutation = useMutation({
  mutationFn: updateProfile,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['user', 'profile'] });
    toast.success("Profile updated");
  }
});
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Structure hierarchical query keys: `['projects', projectId, 'comments']`. | Never trigger a full page reload just to refresh a modified table record. |
| Provide optimistic updates for instant UI response. |  |

---

## 4. Accessibility & Performance Verification

- **Prevent background data refetches from stealing keyboard focus.**

---

## 5. Anti-Slop Discipline

- Avoid bloated JavaScript dependencies when standard Web APIs and clean React patterns suffice.
- Ensure component boundaries remain maintainable and strictly typed.
