# Cross-Platform Design Translation & Conventions

> Architectural guide adapted from `apple-design-skill` and cross-platform design systems.
> Consult this guide whenever designing or auditing interfaces across Web, Mobile (iOS, Android, React Native, Flutter), and Desktop (macOS, Windows, Electron, Tauri).

Design principles remain universal; platform conventions, viewport constraints, and vocabulary differ. Never water down principles—translate them accurately into the host framework's idiom.

---

## 1. Universal Vocabulary Mapping

| Concept | Apple HIG (iOS / macOS) | Web (HTML / CSS / Tailwind) | Android / Material Design | React Native / Flutter |
| :--- | :--- | :--- | :--- | :--- |
| **Canvas** | `systemBackground` | `var(--color-bg-canvas)` / `bg-canvas` | `surface` / `background` | `ThemeData.scaffoldBackgroundColor` |
| **Surface** | `secondarySystemBackground` | `var(--color-bg-surface)` / `bg-surface` | `surfaceContainer` | `Card`, `Container`, `Surface` |
| **Primary Text** | `label` | `var(--color-text-primary)` | `onSurface` | `TextTheme.bodyLarge` |
| **Secondary Text** | `secondaryLabel` | `var(--color-text-secondary)` | `onSurfaceVariant` | `TextTheme.bodyMedium` |
| **Accent / Action** | `tintColor` / `accentColor` | `var(--color-action-primary)` | `primary` | `ColorScheme.primary` |
| **Border / Divider** | `separator` | `var(--color-border-subtle)` | `outlineVariant` | `DividerThemeData` |
| **Focus Ring** | System focus ring | `var(--color-border-focus)` / `focus-visible:ring-2` | Focus state indicator | `FocusNode` / focus indicator |
| **Typography Scale** | Dynamic Type (`LargeTitle`, `Title`, `Body`) | Fluid scale (`clamp()`, `text-h1` .. `text-body`) | Typography scale (`display`, `headline`, `body`) | `TextStyle` scaled with `textScaler` |
| **System Fonts** | SF Pro, SF Mono, New York | System UI stack: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` | Roboto, Google Sans | Platform default / Roboto / SF Pro |
| **Iconography** | SF Symbols | SVG / Lucide / Heroicons | Material Symbols | Vector icons / Lucide |
| **Touch Target** | Min 44 x 44 pt | Min 44 x 44 px | Min 48 x 48 dp | Min 44 pt (`hitSlop`) / 48 dp |
| **Safe Areas** | `safeAreaInsets` | `env(safe-area-inset-*)` | Window insets (`WindowInsetsCompat`) | `SafeAreaView` / `SafeArea` |
| **Materials / Blur** | `UIBlurEffect` / Liquid Glass | `backdrop-filter: blur(12px)` | Surface tint elevation | `BackdropFilter` (Flutter) |
| **Top Navigation** | Navigation Bar / Toolbar | Header / Nav bar (`<header role="banner">`) | Top App Bar | `AppBar` / Stack navigator header |
| **Bottom Navigation** | Tab Bar (always visible) | Bottom nav bar / Mobile tab bar | Navigation Bar | `BottomNavigationBar` / Tab Navigator |
| **Modal Container** | Sheet / Popover | Native `<dialog>` / Radix Dialog / Sheet modal | Bottom Sheet / Modal Dialog | `showModalBottomSheet` / Modal |

---

## 2. Platform Conventions to Check

### Web & Responsive SaaS
- **Viewport Fluidity**: No fixed horizontal widths (`width: 1000px`) that cause horizontal scrollbars on smaller viewports. Use `max-width`, container queries (`@container`), and CSS Grid `minmax()`.
- **Keyboard Navigation**: Every interactive element must be reachable and operable via `Tab`, `Enter`, `Space`, and `Escape`. Suppressing the focus ring (`outline: none` or `focus:outline-none`) without an immediate `focus-visible` replacement is a **Critical Release Blocker**.
- **Dark Mode**: Implement via CSS custom properties scoped to `:root` and `[data-theme='dark']` (or `.dark`). Avoid hardcoding inverted hex colors directly in components.
- **Accessible Contrasts**: Normal text must satisfy at least 4.5:1 contrast against its background; large text (18pt+ or 14pt bold+) must satisfy 3:1 (WCAG 2.2 AA).

### Mobile Applications (iOS, Android, React Native, Flutter)
- **Minimum Hit Targets**: All buttons, links, icon toggles, and list items must measure at least 44x44pt (iOS) or 48x48dp (Android). If a visual icon is 20px, apply padding or hit slop to satisfy the touch target standard.
- **Safe Area Insets**: Content must never be obscured by the home indicator bar, notch, camera cutout, or status bar. Respect `safeAreaInsets`.
- **Thumb Zone Ergonomics**: Primary destructive or navigation actions should reside within the natural bottom reach zone of one-handed thumb navigation.
- **Haptic & Visual Feedback**: Taps on interactive controls must provide immediate optical feedback (`active:scale-[0.98]` or opacity change) and platform haptics where supported.

### Desktop Applications (macOS, Windows, Electron, Tauri)
- **Menu Bar Integration**: Core application actions must be exposed through the native application menu bar (`File`, `Edit`, `View`, `Window`, `Help`) with standard shortcuts (`Cmd+S`, `Cmd+F`, `Cmd+,` for Settings).
- **Multi-Window & Resize**: Support resizable window layouts gracefully. Test minimum window dimensions (e.g. 800x600px) and ensure toolbars or sidebars collapse cleanly.
- **Context Menus**: Right-click context menus should expose relevant contextual actions on list rows, canvas objects, and text fields.
- **Materials & Vibrancy**: Prefer native system materials (e.g. vibrancy on macOS) over generic web blurs that fail to match the host window frame.

---

## 3. Cross-Platform Translation Rules for Coding Agents

1. **Speak the Framework's Idiom**: When generating React Native code, write `Pressable`, `Text`, `StyleSheet`, and `useColorScheme()`. Do not dump raw HTML `<div>` or CSS classes unless requested.
2. **Preserve System Typography Behavior**: Never disable user font scaling (`allowFontScaling={false}`) unless explicitly required by a fixed geometric design (e.g. financial ticker tape with overflow clipping).
3. **Respect Reduced Motion**: Always wrap transitions and entrance animations in reduced-motion checks (`@media (prefers-reduced-motion: reduce)` on web, `AccessibilityInfo.isReduceMotionEnabled()` on mobile).
