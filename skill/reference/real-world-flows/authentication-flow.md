# Authentication & Session Lifecycle Flow

Authentication orchestrates login, multi-factor challenges (MFA/TOTP), OAuth callbacks, session expiration, and password resets with uncompromising security and visual calm.

---

## 1. Flow Sequence & Architectural Stages

| Stage / Step | Implementation Specification |
| :--- | :--- |
| **1. Identifier Entry** | User enters email; system validates format and checks for SSO federation |
| **2. Credential / MFA Challenge** | Password or Passkey prompt; if MFA is active, transitions to 6-digit TOTP input |
| **3. Token Acquisition & Cookie Set** | Receives secure HTTP-only session cookie; redirects to intended destination |
| **4. Session Expiry Warning** | Modal warns user 2 minutes before JWT expiration with one-click refresh button |

---

## 2. Implementation Guide

```tsx
// 6-digit TOTP input with auto-advance
import React, { useRef } from 'react';

export function TotpInput({ onComplete }: { onComplete: (code: string) => void }) {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value.slice(-1);
    e.target.value = val;
    if (val && index < 5) {
      inputs.current[index + 1]?.focus();
    }
    const fullCode = inputs.current.map(i => i?.value || '').join('');
    if (fullCode.length === 6) onComplete(fullCode);
  };

  return (
    <div className="flex gap-2 justify-center my-4" role="group" aria-label="Two-factor authentication code">
      {Array.from({ length: 6 }).map((_, i) => (
        <input
          key={i}
          ref={el => { inputs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          onChange={e => handleChange(e, i)}
          className="w-10 h-12 text-center text-lg font-mono font-bold rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-base)] text-[var(--color-text-primary)] focus:ring-2 focus:ring-[var(--color-focus-ring)] focus:outline-none"
        />
      ))}
    </div>
  );
}
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Auto-focus next input box during 6-digit TOTP code entry. | Never reveal whether an email address exists in the database during password reset requests. |
| Support native password manager paste into all inputs. |  |
| Preserve the intended redirect URL (`?redirect=/dashboard/settings`). |  |

---

## 4. Accessibility & Verification Checklist

- **Provide clear accessible group labels on multi-box MFA inputs.**

---

## 5. Anti-Slop Discipline

- Avoid dark UX patterns or artificial roadblocks when users wish to export data or cancel subscriptions.
- Ensure enterprise security flows provide immediate, unambiguous feedback.
