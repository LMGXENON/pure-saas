# Error Boundaries & Graceful Degradation

Component error boundaries prevent a single runtime JavaScript exception from crashing the entire application window.

---

## 1. Architectural Principles & Mechanisms

| Principle / Pattern | Concrete Implementation Detail |
| :--- | :--- |
| **Granular Boundaries** | Wrap independent widgets, charts, and feeds in local error boundaries |
| **Actionable Fallbacks** | Display an inline "Retry" button rather than a blank white screen |
| **Telemetry Reporting** | Silently log stack traces to error monitoring services (Sentry/Datadog) |

---

## 2. Code Implementation Reference

```tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props { children: ReactNode; fallbackTitle?: string; }
interface State { hasError: boolean; }

export class ComponentErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('UI Exception caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 rounded-xl border border-[var(--color-danger-subtle)] bg-[var(--color-surface-base)] text-center">
          <p className="text-xs font-semibold text-[var(--color-danger-text)]">Unable to load component</p>
          <button onClick={() => this.setState({ hasError: false })} className="mt-3 text-xs underline text-[var(--color-text-secondary)]">Retry</button>
        </div>
      );
    }
    return this.props.children;
  }
}
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Isolate third-party embeds (analytics charts, maps) within dedicated error boundaries. | Never let an unhandled render error trigger a full blank white screen. |
| Provide a user-facing retry action. |  |

---

## 4. Accessibility & Performance Verification

- **Announce error states to screen readers using role="alert".**

---

## 5. Anti-Slop Discipline

- Avoid bloated JavaScript dependencies when standard Web APIs and clean React patterns suffice.
- Ensure component boundaries remain maintainable and strictly typed.
