# Keyboard Shortcuts & Global Navigation Systems

Keyboard shortcuts transform productivity web applications into power-user environments. Pure SaaS standardizes key combination handling, collision prevention, platform-adaptive modifiers (Cmd on macOS vs Ctrl on Windows), and shortcut discovery overlays.

---

## 1. Architectural Principles & Key Aspects

| Aspect / Mechanism | Implementation Specification |
| :--- | :--- |
| **Modifier Normalization** | Automatically map metaKey on Apple platforms to ctrlKey on Windows/Linux |
| **Collision Avoidance** | Never intercept browser native shortcuts (Cmd+R, Cmd+T, Cmd+W, Cmd+L) |
| **Input Context Bypassing** | Disable global single-letter keys (e.g. "?", "j", "k") when focus is inside an input, textarea, or contentEditable |
| **Discovery Overlay** | Pressing "?" triggers a grouped cheat-sheet modal of all registered shortcuts |

---

## 2. Implementation Guide

```tsx
import { useEffect } from 'react';

export function useKeyboardShortcut(
  keyCombo: string, // e.g. "mod+k", "mod+s"
  callback: (e: KeyboardEvent) => void,
  options: { enableInInputs?: boolean } = {}
) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(
        (e.target as HTMLElement)?.tagName
      ) || (e.target as HTMLElement)?.isContentEditable;

      if (isInput && !options.enableInInputs) return;

      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const modifierPressed = isMac ? e.metaKey : e.ctrlKey;

      const [mod, key] = keyCombo.toLowerCase().split('+');
      if (mod === 'mod' && modifierPressed && e.key.toLowerCase() === key) {
        e.preventDefault();
        callback(e);
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [keyCombo, callback, options.enableInInputs]);
}
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Render visual shortcut badges (<kbd>⌘K</kbd>) next to menu items and buttons. | Never hijack browser navigation shortcuts (Cmd+W, Cmd+N, Cmd+Tab). |
| Provide a shortcut cheat sheet accessible via "?" key or Help menu. | Do not fire destructive actions via single-key shortcuts without confirmation or undo. |
| Allow users to disable single-key shortcuts in accessibility settings. |  |

---

## 4. Accessibility & Interaction Integrity

- **WCAG 2.1.4 Character Key Shortcuts: If a shortcut uses only a single character, provide a mechanism to turn it off or remap it.**

---

## 5. Anti-Slop Discipline

- Avoid distracting, unnecessary motion or confetti effects for mundane actions.
- Ensure keyboard navigation operates identically to pointer interaction.
