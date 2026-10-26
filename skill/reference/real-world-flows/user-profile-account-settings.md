# User Profile & Account Settings Flow

Account settings house personal information, avatar uploads, password management, session termination, and permanent account deletion.

---

## 1. Flow Sequence & Architectural Stages

| Stage / Step | Implementation Specification |
| :--- | :--- |
| **1. Profile Form** | Full name, public handle, bio, and avatar upload with preview crop |
| **2. Security Section** | Password update form and "Log out of all active sessions" button |
| **3. Danger Zone Deletion** | Account deletion with typed confirmation requirement: "Type delete my account" |

---

## 2. Implementation Guide

```tsx
<div className="space-y-6 max-w-xl">
  <div className="flex items-center gap-4">
    <div className="w-16 h-16 rounded-full bg-neutral-800 border border-neutral-700 overflow-hidden flex items-center justify-center text-xl font-bold">JD</div>
    <div>
      <button className="h-8 px-3 text-xs font-medium rounded-lg border border-[var(--color-border-subtle)] hover:bg-[var(--color-surface-hover)]">Change Avatar</button>
      <p className="text-[10px] text-[var(--color-text-muted)] mt-1">JPG, GIF or PNG. Max size 2MB.</p>
    </div>
  </div>
  <div className="space-y-4">
    <TextInput label="Full Name" defaultValue="Jane Doe" />
    <TextInput label="Email Address" defaultValue="jane@example.com" />
  </div>
</div>
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Require current password verification before allowing email or password changes. | Never perform permanent account deletion with a single accidental click. |
| Provide a confirmation modal requiring typed verification for account deletion. |  |

---

## 4. Accessibility & Verification Checklist

- **Accessible file upload inputs with clear error feedback on invalid file types or sizes.**

---

## 5. Anti-Slop Discipline

- Avoid dark UX patterns or artificial roadblocks when users wish to export data or cancel subscriptions.
- Ensure enterprise security flows provide immediate, unambiguous feedback.
