# System Preference Detection & Reactive Switching

Modern web applications should default to the user’s operating system theme preference (`prefers-color-scheme`) while providing a manual user override that persists across sessions.

---

## 1. Architectural Rules & Core Principles

| Rule / Principle | Concrete Specification |
| :--- | :--- |
| **Match Media Listener** | window.matchMedia("(prefers-color-scheme: dark)") |
| **User Preference Storage** | Persist explicit choices ("light", "dark", "system") in localStorage or cookies |
| **Instant Reaction** | Listen for OS scheme changes and update UI immediately if in "system" mode |

---

## 2. Configuration & Implementation Reference

```css
export function initThemeListener() {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const updateTheme = () => {
    const saved = localStorage.getItem('theme-preference') || 'system';
    if (saved === 'system') {
      document.documentElement.setAttribute('data-theme', mediaQuery.matches ? 'dark' : 'light');
    } else {
      document.documentElement.setAttribute('data-theme', saved);
    }
  };

  mediaQuery.addEventListener('change', updateTheme);
  updateTheme();
}
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Provide a 3-way toggle: Light, Dark, System. | Never force a theme switch without allowing the user to select their preference. |
| Synchronize theme changes across all open browser tabs via storage events. |  |

---

## 4. Verification & Testing Standards

- **Ensure theme switcher is accessible via keyboard.**

---

## 5. Anti-Slop Discipline

- Eliminate hardcoded hex values; ensure all themes cleanly resolve to semantic variables.
