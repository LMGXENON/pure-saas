# Theme Flash Prevention (FOIT / FOUC) in SSR & Next.js

When using server-side rendering, a mismatch between server-rendered HTML and client localStorage can cause an ugly white flash when loading dark mode.

---

## 1. Architectural Rules & Core Principles

| Rule / Principle | Concrete Specification |
| :--- | :--- |
| **Blocking Head Script** | Execute a tiny inline script before any HTML renders to set the data-theme attribute synchronously |
| **Cookie-Based SSR** | Store theme preference in a cookie so the server can render the exact theme class on first byte |

---

## 2. Configuration & Implementation Reference

```css
<!-- Place directly at the top of <head> before stylesheets -->
<script>
  (function() {
    try {
      var saved = localStorage.getItem('theme-preference');
      var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var theme = saved === 'dark' || (saved !== 'light' && systemDark) ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {}
  })();
</script>
```

---

## 3. Best Practices (Do's & Don'ts)

| Do | Don't |
| :--- | :--- |
| Inject an inline synchronous theme detection script in the document `<head>`. | Never wait for React hydration (`useEffect`) to set the initial theme. |
| Keep the head script under 200 bytes with zero external dependencies. |  |

---

## 4. Verification & Testing Standards

- **Prevents sudden high-luminance light flashes that trigger sensory discomfort.**

---

## 5. Anti-Slop Discipline

- Eliminate hardcoded hex values; ensure all themes cleanly resolve to semantic variables.
