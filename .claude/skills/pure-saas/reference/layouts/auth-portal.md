# Authentication & Sign-in Portal Layout

Auth portals handle sign-in, account creation, password recovery, and SSO. They require rock-solid security feedback, uncluttered visual focus, and mobile responsiveness.

---

## 1. Architectural Section Breakdown

| Section / Region | Architectural Role | Suggested Token / Classes |
| :--- | :--- | :--- |
| **Split Hero or Centered Card** | Brand illustration on left, interactive auth form on right | `min-h-screen` |
| **Social / SSO Providers** | GitHub, Google, SAML SSO one-click buttons | `gap-3` |
| **Credential Form** | Email and password with reveal toggle and forgot password link | `space-y-4` |
| **Security Disclosures** | Terms of service and privacy policy links | `text-[11px] text-muted` |

---

## 2. Layout Implementation Example

```tsx
<div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[var(--color-surface-canvas)]">
  <div className="hidden lg:flex flex-col justify-between p-12 bg-[var(--color-surface-base)] border-r border-[var(--color-border-subtle)]">
    <div className="font-bold text-lg text-[var(--color-text-primary)]">Acme Engine</div>
    <div className="max-w-md">
      <blockquote className="text-xl font-medium text-[var(--color-text-primary)] leading-snug">
        "Pure SaaS helped us ship our design system 4x faster with zero generic UI bloat."
      </blockquote>
      <p className="text-xs text-[var(--color-text-secondary)] mt-4">Sarah Chen — Head of Engineering, ScaleFlow</p>
    </div>
    <div className="text-xs text-[var(--color-text-muted)]">© 2026 Acme Corp. All rights reserved.</div>
  </div>
  
  <div className="flex items-center justify-center p-8">
    <div className="w-full max-w-sm space-y-6">
      <div className="text-left">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Welcome back</h1>
        <p className="text-xs text-[var(--color-text-secondary)] mt-1">Sign in with your enterprise credentials.</p>
      </div>
      <button className="w-full h-10 rounded-lg border border-[var(--color-border-subtle)] flex items-center justify-center gap-2 text-xs font-medium hover:bg-[var(--color-surface-hover)]">
        <span>Sign in with GitHub</span>
      </button>
      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-[var(--color-border-subtle)]" />
        <span className="flex-shrink mx-4 text-[10px] uppercase text-[var(--color-text-muted)] tracking-wider">or continue with email</span>
        <div className="flex-grow border-t border-[var(--color-border-subtle)]" />
      </div>
      <form className="space-y-4">
        <TextInput label="Work Email" type="email" placeholder="name@company.com" />
        <TextInput label="Password" type="password" />
        <button type="submit" className="w-full h-10 rounded-lg bg-[var(--color-accent-primary)] text-white text-xs font-medium">Sign In</button>
      </form>
    </div>
  </div>
</div>
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Enable browser password managers via autocomplete="username" and autocomplete="current-password". | Never block copy-paste into password fields. |
| Provide clear inline error messaging for failed authentication attempts. |  |

---

## 4. Accessibility & Layout Semantics

- **Proper form landmarks and explicit labels for assistive tools.**

---

## 5. Anti-Slop Discipline

- Avoid generic centered layouts when asymmetric product-led framing communicates faster.
- Never pad sections with meaningless decorative pills or fake squiggly line metrics.
- Enforce strict responsive breakpoints across 375px, 768px, 1024px, and 1440px+.
