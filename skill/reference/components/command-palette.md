# Command Palette (Cmd+K) Architecture

The command palette offers rapid keyboard-first navigation and action execution. It indexes pages, settings, and commands into a searchable modal dialog.

---

## 1. Visual Specification & State Matrix

| State | Visual Treatment | Design Token |
| :--- | :--- | :--- |
| **Closed** | Inactive, listened via global keyboard event listener (Cmd+K / Ctrl+K) | `N/A` |
| **Open & Filtering** | Centered floating overlay, top search input with search icon, instant live results below | `var(--color-surface-overlay)` |
| **Result Focused** | Active item highlighted, category tag displayed, Enter triggers action | `var(--color-surface-selected)` |

---

## 2. Implementation Guide

```tsx
// Key architecture: input focus on open, debounced query, roving activeIndex
import React, { useState, useEffect } from 'react';

export const CommandPalette: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setOpen(false)} />
      <div className="relative z-10 w-full max-w-xl rounded-2xl bg-[var(--color-surface-overlay)] border border-[var(--color-border-subtle)] shadow-2xl overflow-hidden">
        <div className="flex items-center px-4 border-b border-[var(--color-border-subtle)]">
          <span className="text-neutral-400">🔍</span>
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search..."
            className="w-full h-12 px-3 bg-transparent text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none"
          />
          <kbd className="text-[10px] bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded border border-neutral-700">ESC</kbd>
        </div>
        <div className="p-2 max-h-80 overflow-y-auto">
          <div className="text-[10px] font-semibold text-[var(--color-text-muted)] px-3 py-1 uppercase tracking-wider">Navigation</div>
          <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]">
            <span>Go to Analytics</span>
            <span className="text-[10px] text-neutral-400">Jump to view</span>
          </button>
        </div>
      </div>
    </div>
  );
};
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Listen for Cmd+K on Mac and Ctrl+K on Windows. | Do not perform heavy synchronous blocking searches in the UI thread. |
| Auto-focus search input immediately upon dialog render. |  |
| Support ArrowDown and ArrowUp to cycle active index, and Enter to execute. |  |

---

## 4. Accessibility & WCAG 2.2 AA Compliance

- **role="combobox", aria-expanded="true", aria-controls="command-results".**

---

## 5. Anti-Slop Criteria

- Avoid gratuitous animations that delay user interaction.
- Keep borders crisp (1px hairline) and ensure dark-mode contrast parity.
- Never use arbitrary Tailwind numbers or unverified hex colors; bind directly to semantic tokens.
