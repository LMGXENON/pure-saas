# Multi-Tenant Workspace & Team Switching Flow

Multi-tenant systems allow users to belong to several organizations, requiring swift workspace switching without losing route context.

---

## 1. Flow Sequence & Architectural Stages

| Stage / Step | Implementation Specification |
| :--- | :--- |
| **1. Workspace Popover Trigger** | Displays current workspace avatar, name, and role badge in the top navigation |
| **2. Search & Select Menu** | List of member workspaces with checkmark on the active tenant and a "+ New Workspace" action |
| **3. Context Transition** | Tenant ID updates in route (`/org/[id]/...`), revalidating permissions and caching |

---

## 2. Implementation Guide

```tsx
<div className="relative">
  <button className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-[var(--color-surface-hover)] text-left">
    <div className="w-6 h-6 rounded bg-neutral-800 text-white flex items-center justify-center font-bold text-xs">A</div>
    <span className="text-xs font-semibold text-[var(--color-text-primary)]">Acme Corp</span>
    <span className="text-xs text-[var(--color-text-muted)]">▼</span>
  </button>
</div>
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Keep the user on the equivalent page when switching teams if permissions allow. | Never flash data from the previous tenant during transition. |
| Provide search filtering if a user belongs to more than 5 teams. |  |

---

## 4. Accessibility & Verification Checklist

- **WAI-ARIA Menu or Listbox pattern for workspace switcher.**

---

## 5. Anti-Slop Discipline

- Avoid dark UX patterns or artificial roadblocks when users wish to export data or cancel subscriptions.
- Ensure enterprise security flows provide immediate, unambiguous feedback.
