# API Keys & Developer Secrets Management

Developer portals handle the generation, display, scoping, and rotation of API keys with strict one-time reveal safeguards.

---

## 1. Flow Sequence & Architectural Stages

| Stage / Step | Implementation Specification |
| :--- | :--- |
| **1. Create Key Modal** | Name the key, choose expiration duration, and set granular read/write scopes |
| **2. One-Time Secret Reveal** | Display full plaintext secret once with warning: "This key will never be shown again" |
| **3. Key Ledger** | Table showing key prefix (`sk_live_4a8...`), created date, last used date, and Revoke button |

---

## 2. Implementation Guide

```tsx
<div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs">
  <p className="font-semibold mb-2">⚠️ Copy your secret key now</p>
  <p className="text-neutral-400 mb-3">You will not be able to view this API key again after closing this window.</p>
  <div className="flex items-center justify-between p-2 rounded bg-neutral-900 border border-neutral-800 font-mono text-[11px] text-white">
    <span>sk_live_9f81a7b6c5d4e3f201</span>
    <button className="text-blue-400 hover:underline">Copy</button>
  </div>
</div>
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Show plaintext secret exactly once upon generation. | Never store or display plaintext API keys in the database or client. |
| Show "Last used" timestamp so developers can identify abandoned keys before revoking. |  |

---

## 4. Accessibility & Verification Checklist

- **Accessible confirmation alert when copying secret key.**

---

## 5. Anti-Slop Discipline

- Avoid dark UX patterns or artificial roadblocks when users wish to export data or cancel subscriptions.
- Ensure enterprise security flows provide immediate, unambiguous feedback.
