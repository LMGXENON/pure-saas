# Pure SaaS Platform & Cross-Platform Guidelines

Pure SaaS is platform-aware. While its primary target is the modern web, applications often deploy to desktop environments (Electron, Tauri), native mobile wrappers (React Native, Flutter), or multi-platform ecosystems.

Interfaces must feel natural and respectful of host platform ergonomics without imposing any single proprietary platform dogma (such as Apple HIG) where it does not belong.

---

## 1. Web Applications vs Native Platforms

| Characteristic | Modern Web Standards | Desktop (macOS / Windows / Linux) | Native Mobile (iOS / Android) |
| :--- | :--- | :--- | :--- |
| **Primary Input** | Mouse, keyboard, touch screens | Mouse, trackpad, extensive keyboard shortcuts | Touch gestures, virtual keyboards |
| **Window Frame** | Browser tab, full URL bar, viewport scroll | Window chrome, custom titlebar, traffic lights (macOS), min/max/close (Win) | Status bar, home indicator bar, notch / dynamic island safe areas |
| **Typography Stack** | Product-specific web font + system fallback | Platform native: SF Pro (macOS), Segoe UI (Windows), Ubuntu/Cantarell (Linux) | SF Pro (iOS), Roboto / Inter (Android) |
| **Hover & Tooltips** | Primary discovery mechanism for icons/hints | Rich desktop tooltips, hover status preview in footer | **No hover state exists.** Touch feedback only. |
| **Back Navigation** | Browser history, breadcrumbs | Window navigation buttons, keyboard shortcuts (`Cmd/Ctrl + [`) | Swipe-from-edge gesture, top-left back button, Android system back |

---

## 2. Desktop Shell Guidelines (Tauri, Electron)

1. **Titlebar Safe Zones:**
   - On macOS: Provide at least `72px` of left padding in the titlebar area to prevent overlapping the native traffic light buttons (`close`, `minimize`, `zoom`).
   - On Windows: Provide safe right margin for standard window controls.
   - Use `-webkit-app-region: drag;` for titlebar draggable zones, and `-webkit-app-region: no-drag;` for interactive elements inside the titlebar.
2. **Keyboard Accelerators:**
   - Support standard desktop key combinations: `Cmd` (macOS) / `Ctrl` (Windows/Linux) for actions (`Cmd+K` command palette, `Cmd+S` save, `Cmd+Z` undo).
   - Display shortcut badges in dropdown menus and command palettes using platform-appropriate symbols (`⌘`, `⇧`, `⌥`, `⌃` on macOS; `Ctrl`, `Shift`, `Alt` on Windows).

---

## 3. Mobile Web & Touch Viewport Rules

1. **Viewport Meta:** Always declare:
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
   ```
2. **Safe Area Insets:** Account for notches, camera holes, and bottom home indicator bars:
   ```css
   padding-top: env(safe-area-inset-top);
   padding-bottom: env(safe-area-inset-bottom);
   padding-left: env(safe-area-inset-left);
   padding-right: env(safe-area-inset-right);
   ```
3. **Prevent Accidental Double-Tap Zoom:**
   Buttons and interactive links should apply `touch-action: manipulation;` to eliminate the 300ms click delay on mobile web browsers without disabling pinch-to-zoom for text accessibility.
