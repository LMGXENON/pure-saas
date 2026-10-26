# Code Audit: Search Patterns, Guidelines & Framework Fixes

> Architectural code-audit guide adapted from `apple-design-skill` (HIG compliance) and `zero-slop-design-plugin` (static token and anti-slop checks).
> Load this reference whenever running `/pure-saas review` on source code or auditing a pull request.

Screenshots show what an observer captured in one viewport. Source code shows what every build and every user will actually experience.
This guide defines actionable patterns to search for, their underlying UX/WCAG guideline citations, severity ratings, and concrete replacements.

---

## 1. Audit Execution Protocol

1. **Search, then Read**: Regex and string grep matches are starting leads, not automatic conclusions. Open the matching file and confirm what actually renders in context.
2. **Four-Part Actionable Findings**: Every reported finding must follow this exact four-part format:
   - **Finding:** Specific problem and classification.
   - **Evidence:** Concrete file path and line number (`path/file.tsx:42`), plus code snippet or measured value.
   - **Impact:** User impact and severity rating (**Critical**, **Warning**, or **Info**).
   - **Fix:** Concrete, framework-idiomatic code replacement.
3. **Never Fabricate Findings or Checks**: If an area cannot be verified without running a live browser or mobile simulator, classify it honestly under `Untested Areas`.

---

## 2. High-Priority Code Inspection Patterns

| Defect Pattern | Severity | Guideline Citation | Why It Matters | Concrete Replacement |
| :--- | :--- | :--- | :--- | :--- |
| **Focus Suppression without Focus-Visible**<br>`outline-none`, `focus:outline-none`, `outline: 0`, `outline: none` without `focus-visible:` | **Critical** | WCAG 2.2 SC 2.4.7 (Focus Visible)<br>SC 2.4.11 (Focus Appearance) | Stripping outline renders interface impossible to navigate for keyboard and switch-access users. | Use `focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:outline-none` |
| **Sub-44px Touch Targets**<br>`w-6 h-6`, `w-8 h-8`, `p-1`, `height: 24px` on interactive buttons / links | **Critical** | WCAG 2.2 SC 2.5.8 (Target Size - Min)<br>Apple HIG Layout & Touch Targets | Causes tap misses, accidental triggers, and release rejections on touch screens. | Ensure button bounding box is at least 44x44px (e.g. `min-w-[44px] min-h-[44px] p-2.5` or `hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}`) |
| **Unmapped Utility Palette Classes**<br>`bg-blue-500`, `text-slate-400`, `border-gray-200` | **Warning** | Pure SaaS Token Architecture<br>Zero Slop `palette-class` rule | Hardcodes arbitrary palette values instead of semantic roles. Breaks light/dark theming and causes visual drift. | Replace with semantic tokens: `bg-surface`, `text-primary`, `text-secondary`, `border-subtle` |
| **Raw Hex / Color Functions in Styles**<br>`#ff00ea`, `rgb(240, 242, 245)`, `oklch(0.7 0.15 140)` | **Warning** | Pure SaaS Token Architecture<br>Zero Slop `color-value` & `color-function` | Bypasses `DESIGN.md` design tokens. Unaudited contrast and impossible to maintain globally. | Declare token in `DESIGN.md` and reference as `var(--color-...)` or configured semantic Tailwind class. |
| **Arbitrary Bracket Dimensions**<br>`p-[17px]`, `m-[11px]`, `rounded-[7px]`, `w-[343px]` | **Warning** | Pure SaaS Spacing Scale<br>Zero Slop `dimension-value` rule | Breaks consistent 4px/8px rhythm. Introduces fractional optical jitter. | Align with standard scale: `p-4` (16px), `rounded-lg` (8px), `w-full max-w-sm`. |
| **Generic Gradient Text & Floating Blobs**<br>`bg-clip-text text-transparent bg-gradient-to-r from-purple-...`, `backdrop-blur-3xl rounded-full bg-indigo-500/20` | **Warning** | Anti-Slop Discipline<br>WCAG 2.2 SC 1.4.3 (Contrast) | AI slop signature. Degrades text readability across varying backgrounds and looks like an untuned template. | Use solid high-contrast typography (`text-primary`) and structured surface borders (`border-subtle`) for visual hierarchy. |
| **Emoji UI Icon Replacement**<br>`<button>🚀 Launch</button>`, `<span>🔥 Hot</span>` | **Warning** | Anti-Slop Discipline<br>Accessibility (WCAG 1.1.1) | Emojis render inconsistently across OSs (Apple, Android, Windows) and screen readers announce literal emoji names ("Rocket Launch"). | Replace with accessible SVG icon (`<RocketIcon aria-hidden="true" /> Launch`). |
| **Suppressed User Font Scaling**<br>`allowFontScaling={false}`, `maxFontSizeMultiplier={1}` | **Critical** | Apple HIG Dynamic Type<br>WCAG 2.2 SC 1.4.4 (Resize Text) | Blocks low-vision users from scaling typography. App Store rejection risk under guideline 2.5.8. | Remove suppression; use flexible containers (`ScrollView`, `flex-wrap`) that expand when text scales up. |
| **Hand-Drawn Payment & Platform Marks**<br>Custom SVG or CSS recreation of Apple Pay, Google Pay, Visa | **Critical** | App Store Review Guideline 4.9<br>Apple Pay Marketing Guidelines | Hand-drawn payment marks violate trademark agreements and cause immediate App Store rejections. | Use official platform SDK: `<apple-pay-button>` on Web, `PayWithApplePayButton` on SwiftUI, `PKPaymentButton` on UIKit. |
| **Hardcoded Fixed Layout Widths**<br>`width: 1200px`, `min-width: 1024px` on root containers | **Warning** | Responsive Design<br>WCAG 2.2 SC 1.4.10 (Reflow) | Causes horizontal scrollbars on mobile and tablet viewports. | Use `max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8`. |

---

## 3. Stack-Specific Replacement Ledger

### React & Next.js
```tsx
// ❌ BAD: Suppressed focus, arbitrary padding, raw colors, emoji icon
<button className="outline-none p-[11px] bg-[#2563eb] text-white hover:bg-blue-600">
  🚀 Deploy Now
</button>

// ✅ GOOD: Semantic token, 44px min hit target, focus-visible ring, SVG icon
<button className="min-h-[44px] px-4 py-2.5 bg-action-primary text-action-primary-fg rounded-md font-medium inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-border-focus active:scale-[0.98] transition-all">
  <RocketIcon className="w-4 h-4" aria-hidden="true" />
  <span>Deploy Now</span>
</button>
```

### React Native & Expo
```tsx
// ❌ BAD: Disabled font scaling, undersized hit target, raw hex
<TouchableOpacity onPress={onPress}>
  <Text style={{ fontSize: 12, color: '#999999' }} allowFontScaling={false}>
    Save
  </Text>
</TouchableOpacity>

// ✅ GOOD: Dynamic type scaling, 44pt touch target via hitSlop, semantic colors
<Pressable
  onPress={onPress}
  hitSlop={{ top: 12, bottom: 12, left: 16, right: 16 }}
  accessibilityRole="button"
  style={({ pressed }) => [
    styles.saveButton,
    pressed && styles.pressedState
  ]}
>
  <Text style={styles.buttonText}>Save</Text>
</Pressable>
```

### Modern CSS / Tailwind v3/v4
```css
/* ❌ BAD: Raw hex colors, missing dark mode support */
.card {
  background: #ffffff;
  color: #111827;
  border: 1px solid #e5e7eb;
}

/* ✅ GOOD: Semantic CSS custom properties */
.card {
  background: var(--color-bg-surface);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-md);
}
```

---

## 4. Exception Handling

When a raw styling value or platform-specific exemption is genuinely required (e.g. brand logo color or third-party SDK constraint), document it using the standardized inline exception format:

```css
/* pure-saas-ignore raw-color: third-party stripe brand badge */
background-color: #635bff;
```
Or in JSX:
```jsx
{/* pure-saas-ignore palette-class: external vendor widget integration */}
<div className="bg-blue-500" />
```

Any exception without an explicit rule name and reason comment is flagged as an invalid bypass by `pure-saas check-tokens`.
