# Html Tailwind Implementation & Design Engineering Guide

> Source: Adapted from UI/UX Pro Max Stack Guidelines (`html-tailwind.csv`)
> Framework: Html Tailwind
> Rules Count: 59 verified engineering practices

This reference guide provides actionable frontend implementation patterns, anti-slop rules,
accessibility requirements, and code examples for **Html Tailwind** projects.

---

## Animation

### Use Tailwind animate utilities `[Medium]`
Built-in animations are optimized and respect reduced-motion

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/docs/animation](https://tailwindcss.com/docs/animation)

- **Do:** Use animate-pulse animate-spin animate-ping
- **Don't:** Custom @keyframes for simple effects

**Recommended:**
```
animate-pulse
```

**Avoid:**
```
@keyframes pulse {...}
```

---

### Limit bounce animations `[High]`
Continuous bounce is distracting and can conflict with reduced-motion preferences

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/docs/hover-focus-and-other-states#prefers-reduced-motion](https://tailwindcss.com/docs/hover-focus-and-other-states#prefers-reduced-motion)

- **Do:** Use animate-bounce sparingly and add motion-reduce:animate-none
- **Don't:** Multiple unbounded bounce animations

**Recommended:**
```
animate-bounce motion-reduce:animate-none
```

**Avoid:**
```
5+ elements with animate-bounce
```

---

### Transition duration `[Medium]`
Use appropriate transition speeds for UI feedback

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/docs/transition-duration](https://tailwindcss.com/docs/transition-duration)

- **Do:** duration-150 to duration-300 for UI
- **Don't:** duration-1000 or longer for UI elements

**Recommended:**
```
transition-all duration-200
```

**Avoid:**
```
transition-all duration-1000
```

---

### Hover transitions `[Low]`
Add smooth transitions on hover state changes

**Applies to:** html-tailwind 4.3

- **Do:** Add transition class with hover states
- **Don't:** Instant hover changes without transition

**Recommended:**
```
hover:bg-gray-100 transition-colors
```

**Avoid:**
```
hover:bg-gray-100 (no transition)
```

---

## Z-Index

### Use Tailwind z-* scale `[Medium]`
Consistent stacking context with predefined scale

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/docs/z-index](https://tailwindcss.com/docs/z-index)

- **Do:** z-0 z-10 z-20 z-30 z-40 z-50
- **Don't:** Arbitrary z-index values

**Recommended:**
```
z-50 for modals
```

**Avoid:**
```
z-[9999]
```

---

### Fixed elements z-index `[High]`
Fixed navigation and overlays need an intentional stacking order

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/docs/z-index](https://tailwindcss.com/docs/z-index)

- **Do:** Use documented z-* tokens for the application layer
- **Don't:** Rely only on DOM order for stacking

**Recommended:**
```
fixed top-0 z-50
```

**Avoid:**
```
fixed top-0 (no z-index)
```

---

### Negative z-index for backgrounds `[Low]`
Use negative z-index for decorative backgrounds

**Applies to:** html-tailwind 4.3

- **Do:** z-[-1] for background elements
- **Don't:** Positive z-index for backgrounds

**Recommended:**
```
-z-10 for decorative
```

**Avoid:**
```
z-10 for background
```

---

## Layout

### Container max-width `[Medium]`
Limit content width for readability

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/docs/container](https://tailwindcss.com/docs/container)

- **Do:** max-w-7xl mx-auto for main content
- **Don't:** Full-width content on large screens

**Recommended:**
```
max-w-7xl mx-auto px-4
```

**Avoid:**
```
w-full (no max-width)
```

---

### Responsive padding `[Medium]`
Adjust padding for different screen sizes

**Applies to:** html-tailwind 4.3

- **Do:** px-4 md:px-6 lg:px-8
- **Don't:** Same padding all sizes

**Recommended:**
```
px-4 sm:px-6 lg:px-8
```

**Avoid:**
```
px-8 (same all sizes)
```

---

### Grid gaps `[Medium]`
Use consistent gap utilities for spacing

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/docs/gap](https://tailwindcss.com/docs/gap)

- **Do:** gap-4 gap-6 gap-8
- **Don't:** Margins on individual items

**Recommended:**
```
grid gap-6
```

**Avoid:**
```
grid with mb-4 on each item
```

---

### Flexbox alignment `[Low]`
Use flex utilities for alignment

**Applies to:** html-tailwind 4.3

- **Do:** items-center justify-between
- **Don't:** Multiple nested wrappers

**Recommended:**
```
flex items-center justify-between
```

**Avoid:**
```
Nested divs for alignment
```

---

### Container queries `[Medium]`
Use built-in container queries and Tailwind 4.3 container-size queries for component responsiveness

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/blog/tailwindcss-v4-3](https://tailwindcss.com/blog/tailwindcss-v4-3)

- **Do:** @container with @lg variants and @container-size when both dimensions matter
- **Don't:** Install the retired container-query plugin

**Recommended:**
```
@container @lg:grid-cols-2
```

**Avoid:**
```
@tailwindcss/container-queries
```

---

### Use shrink-0 shorthand `[Low]`
Shorter class name for flex-shrink-0

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/docs/flex-shrink](https://tailwindcss.com/docs/flex-shrink)

- **Do:** shrink-0 shrink
- **Don't:** flex-shrink-0 flex-shrink

**Recommended:**
```
shrink-0
```

**Avoid:**
```
flex-shrink-0
```

---

### Use size-* for square dimensions `[Low]`
Single utility for equal width and height

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/docs/size](https://tailwindcss.com/docs/size)

- **Do:** size-4 size-8 size-12
- **Don't:** Separate h-* w-* for squares

**Recommended:**
```
size-6
```

**Avoid:**
```
h-6 w-6
```

---

### Compact label layout `[High]`
Handle chip and badge text overflow without breaking compact labels or hiding collection values

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/docs/flex-wrap](https://tailwindcss.com/docs/flex-wrap)

- **Do:** Use flex flex-wrap gap-2 for collections; for one label use whitespace-nowrap bounded min-w-0 truncate and shrink-0 controls
- **Don't:** Clip a fixed-height row let labels wrap inside a pill or let dismiss icons shrink

**Recommended:**
```
flex flex-wrap gap-2; label min-w-0 whitespace-nowrap truncate; icon shrink-0
```

**Avoid:**
```
flex h-8 overflow-hidden
```

---

## Images

### Aspect ratio `[Medium]`
Maintain consistent image aspect ratios

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/docs/aspect-ratio](https://tailwindcss.com/docs/aspect-ratio)

- **Do:** aspect-video aspect-square
- **Don't:** No aspect ratio on containers

**Recommended:**
```
aspect-video rounded-lg
```

**Avoid:**
```
No aspect control
```

---

### Object fit `[Medium]`
Control image scaling within containers

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/docs/object-fit](https://tailwindcss.com/docs/object-fit)

- **Do:** object-cover object-contain
- **Don't:** Stretched distorted images

**Recommended:**
```
object-cover w-full h-full
```

**Avoid:**
```
No object-fit
```

---

### Reserve image space `[High]`
Give image wrappers an aspect ratio or dimensions to avoid layout shifts

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/docs/aspect-ratio](https://tailwindcss.com/docs/aspect-ratio)

- **Do:** aspect-video or explicit dimensions
- **Don't:** Let images determine layout after load

**Recommended:**
```
aspect-video overflow-hidden
```

**Avoid:**
```
Image without reserved space
```

---

### Responsive image layout `[High]`
Adjust image sizing and placement mobile-first with breakpoint variants

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/docs/responsive-design](https://tailwindcss.com/docs/responsive-design)

- **Do:** w-full md:w-1/2
- **Don't:** Use a fixed desktop width at every viewport

**Recommended:**
```
w-full md:max-w-xl
```

**Avoid:**
```
w-[900px]
```

---

### SVG explicit dimensions `[High]`
Add width and height attributes to reserve intrinsic SVG space before CSS loads

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/docs/width](https://tailwindcss.com/docs/width)

- **Do:** <svg class='size-6' width='24' height='24'>
- **Don't:** SVG without intrinsic dimensions

**Recommended:**
```
<svg class='size-6' width='24' height='24'>
```

**Avoid:**
```
<svg class='size-6'>
```

---

## Typography

### Prose plugin `[Medium]`
Use @tailwindcss/typography for rich text

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/docs/typography-plugin](https://tailwindcss.com/docs/typography-plugin)

- **Do:** prose prose-lg for article content
- **Don't:** Custom styles for markdown

**Recommended:**
```
prose prose-lg max-w-none
```

**Avoid:**
```
Custom text styling
```

---

### Line height `[Medium]`
Use appropriate line height for readability

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/docs/line-height](https://tailwindcss.com/docs/line-height)

- **Do:** leading-relaxed for body text
- **Don't:** Default tight line height

**Recommended:**
```
leading-relaxed (1.625)
```

**Avoid:**
```
leading-none or leading-tight
```

---

### Font size scale `[Low]`
Use consistent text size scale

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/docs/font-size](https://tailwindcss.com/docs/font-size)

- **Do:** text-sm text-base text-lg text-xl
- **Don't:** Arbitrary font sizes

**Recommended:**
```
text-lg
```

**Avoid:**
```
text-[17px]
```

---

### Text truncation `[Medium]`
Handle long text gracefully

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/docs/text-overflow](https://tailwindcss.com/docs/text-overflow)

- **Do:** truncate or line-clamp-*
- **Don't:** Overflow breaking layout

**Recommended:**
```
line-clamp-2
```

**Avoid:**
```
No overflow handling
```

---

### Balanced heading wrapping `[Medium]`
Polish short multi-line headings without fixing exact line breaks

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/docs/text-wrap](https://tailwindcss.com/docs/text-wrap)

- **Do:** Use text-balance with a readable max-width and natural wrapping fallback
- **Don't:** Insert hardcoded br tags or blanket nonbreaking spaces

**Recommended:**
```
max-w-xl text-balance
```

**Avoid:**
```
whitespace-nowrap with manual br
```

---

### Long token resilience `[High]`
Allow URLs identifiers and user content to break without widening flex layouts

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/docs/overflow-wrap](https://tailwindcss.com/docs/overflow-wrap)

- **Do:** Use wrap-anywhere on unpredictable text and min-w-0 on its flexible parent
- **Don't:** Use break-all globally or keep the flex child at its intrinsic minimum

**Recommended:**
```
flex min-w-0 with wrap-anywhere
```

**Avoid:**
```
flex with whitespace-nowrap
```

---

## Colors

### Opacity utilities `[Low]`
Use color opacity utilities

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/docs/background-color](https://tailwindcss.com/docs/background-color)

- **Do:** bg-black/50 text-white/80
- **Don't:** Separate opacity class

**Recommended:**
```
bg-black/50
```

**Avoid:**
```
bg-black opacity-50
```

---

### Dark mode `[Medium]`
Support dark mode with dark: prefix

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/docs/dark-mode](https://tailwindcss.com/docs/dark-mode)

- **Do:** dark:bg-gray-900 dark:text-white
- **Don't:** No dark mode support

**Recommended:**
```
dark:bg-gray-900
```

**Avoid:**
```
Only light theme
```

---

### Semantic colors `[Medium]`
Define semantic design tokens with CSS-first @theme

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/docs/theme](https://tailwindcss.com/docs/theme)

- **Do:** Declare --color-primary and related tokens in @theme
- **Don't:** Repeat palette utilities in components

**Recommended:**
```
bg-primary
```

**Avoid:**
```
bg-blue-500 everywhere
```

---

### Theme color variables `[Medium]`
Declare color namespaces in @theme so Tailwind generates semantic utilities

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/docs/colors#customizing-your-colors](https://tailwindcss.com/docs/colors#customizing-your-colors)

- **Do:** @theme { --color-primary: oklch(...); }
- **Don't:** Use arbitrary CSS-variable utilities for registered tokens

**Recommended:**
```
bg-primary
```

**Avoid:**
```
bg-[var(--color-primary)]
```

---

### Use bg-linear-to-* for gradients `[Medium]`
Tailwind v4 uses bg-linear-to-* syntax for gradients

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/docs/background-image](https://tailwindcss.com/docs/background-image)

- **Do:** bg-linear-to-r bg-linear-to-b
- **Don't:** bg-gradient-to-* (deprecated in v4)

**Recommended:**
```
bg-linear-to-r from-blue-500 to-purple-500
```

**Avoid:**
```
bg-gradient-to-r from-blue-500 to-purple-500
```

---

## Spacing

### Consistent spacing scale `[Low]`
Use Tailwind spacing scale consistently

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/docs/customizing-spacing](https://tailwindcss.com/docs/customizing-spacing)

- **Do:** p-4 m-6 gap-8
- **Don't:** Arbitrary pixel values

**Recommended:**
```
p-4 (1rem)
```

**Avoid:**
```
p-[15px]
```

---

### Negative margins `[Medium]`
Use sparingly for overlapping effects

**Applies to:** html-tailwind 4.3

- **Do:** -mt-4 for overlapping elements
- **Don't:** Negative margins for layout fixing

**Recommended:**
```
-mt-8 for card overlap
```

**Avoid:**
```
-m-2 to fix spacing issues
```

---

### Space between `[Low]`
Use space-y-* for vertical lists

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/docs/space](https://tailwindcss.com/docs/space)

- **Do:** space-y-4 on flex/grid column
- **Don't:** Margin on each child

**Recommended:**
```
space-y-4
```

**Avoid:**
```
Each child has mb-4
```

---

## Forms

### Focus states `[High]`
Always show focus indicators

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/docs/hover-focus-and-other-states#focus](https://tailwindcss.com/docs/hover-focus-and-other-states#focus)

- **Do:** focus:ring-2 focus:ring-blue-500
- **Don't:** Remove focus outline

**Recommended:**
```
focus:ring-2 focus:ring-offset-2
```

**Avoid:**
```
focus:outline-none (no replacement)
```

---

### Input sizing `[Medium]`
Consistent input dimensions

**Applies to:** html-tailwind 4.3

- **Do:** h-10 px-3 for inputs
- **Don't:** Inconsistent input heights

**Recommended:**
```
h-10 w-full px-3
```

**Avoid:**
```
Various heights per input
```

---

### Disabled states `[Medium]`
Clear disabled styling

**Applies to:** html-tailwind 4.3

- **Do:** disabled:opacity-50 disabled:cursor-not-allowed
- **Don't:** No disabled indication

**Recommended:**
```
disabled:opacity-50
```

**Avoid:**
```
Same style as enabled
```

---

### Placeholder styling `[Low]`
Style placeholder text appropriately

**Applies to:** html-tailwind 4.3

- **Do:** placeholder:text-gray-400
- **Don't:** Dark placeholder text

**Recommended:**
```
placeholder:text-gray-400
```

**Avoid:**
```
Default dark placeholder
```

---

## Responsive

### Mobile-first approach `[Medium]`
Start with mobile styles and add breakpoints

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/docs/responsive-design](https://tailwindcss.com/docs/responsive-design)

- **Do:** Default mobile + md: lg: xl:
- **Don't:** Desktop-first approach

**Recommended:**
```
text-sm md:text-base
```

**Avoid:**
```
text-base max-md:text-sm
```

---

### Breakpoint testing `[High]`
Test across breakpoint boundaries and representative viewport sizes

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/docs/responsive-design](https://tailwindcss.com/docs/responsive-design)

- **Do:** Test below at and above configured breakpoints
- **Don't:** Only test on development device

**Recommended:**
```
Test mobile through 2xl boundaries
```

**Avoid:**
```
Single device testing
```

---

### Hidden/shown utilities `[Low]`
Control visibility per breakpoint

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/docs/display](https://tailwindcss.com/docs/display)

- **Do:** hidden md:block
- **Don't:** Different content per breakpoint

**Recommended:**
```
hidden md:flex
```

**Avoid:**
```
Separate mobile/desktop components
```

---

## Buttons

### Button sizing `[Medium]`
Consistent button dimensions

**Applies to:** html-tailwind 4.3

- **Do:** px-4 py-2 or px-6 py-3
- **Don't:** Inconsistent button sizes

**Recommended:**
```
px-4 py-2 text-sm
```

**Avoid:**
```
Various padding per button
```

---

### Touch targets `[High]`
Minimum 44px touch target on mobile

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/docs/min-height](https://tailwindcss.com/docs/min-height)

- **Do:** min-h-11 min-w-11 on mobile
- **Don't:** Small buttons on mobile

**Recommended:**
```
min-h-11 min-w-11
```

**Avoid:**
```
h-8 w-8 on mobile
```

---

### Loading states `[High]`
Show loading feedback and prevent duplicate activation

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/docs/opacity](https://tailwindcss.com/docs/opacity)

- **Do:** Disable the action and expose busy state
- **Don't:** Leave button clickable during loading

**Recommended:**
```
<button disabled aria-busy='true'>Saving</button>
```

**Avoid:**
```
Button without loading state
```

---

### Icon buttons `[High]`
Accessible icon-only buttons

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/docs/screen-readers](https://tailwindcss.com/docs/screen-readers)

- **Do:** aria-label on icon buttons
- **Don't:** Icon button without label

**Recommended:**
```
<button aria-label='Close'><XIcon/></button>
```

**Avoid:**
```
<button><XIcon/></button>
```

---

## Cards

### Card structure `[Low]`
Consistent card styling

**Applies to:** html-tailwind 4.3

- **Do:** rounded-lg shadow-md p-6
- **Don't:** Inconsistent card styles

**Recommended:**
```
rounded-2xl shadow-lg p-6
```

**Avoid:**
```
Mixed card styling
```

---

### Card hover states `[Medium]`
Interactive cards should have hover feedback

**Applies to:** html-tailwind 4.3

- **Do:** hover:shadow-lg transition-shadow
- **Don't:** No hover on clickable cards

**Recommended:**
```
hover:shadow-xl transition-shadow
```

**Avoid:**
```
Static cards that are clickable
```

---

### Card spacing `[Low]`
Consistent internal card spacing

**Applies to:** html-tailwind 4.3

- **Do:** space-y-4 for card content
- **Don't:** Inconsistent internal spacing

**Recommended:**
```
space-y-4 or p-6
```

**Avoid:**
```
Mixed mb-2 mb-4 mb-6
```

---

## Accessibility

### Screen reader text `[High]`
Provide context for screen readers

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/docs/screen-readers](https://tailwindcss.com/docs/screen-readers)

- **Do:** sr-only for hidden labels
- **Don't:** Missing context for icons

**Recommended:**
```
<span class='sr-only'>Close menu</span>
```

**Avoid:**
```
No label for icon button
```

---

### Focus visible `[Medium]`
Show focus only for keyboard users

**Applies to:** html-tailwind 4.3

- **Do:** focus-visible:ring-2
- **Don't:** Focus on all interactions

**Recommended:**
```
focus-visible:ring-2
```

**Avoid:**
```
focus:ring-2 (shows on click too)
```

---

### Reduced motion `[High]`
Respect user motion preferences

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/docs/hover-focus-and-other-states#prefers-reduced-motion](https://tailwindcss.com/docs/hover-focus-and-other-states#prefers-reduced-motion)

- **Do:** motion-reduce:animate-none
- **Don't:** Ignore motion preferences

**Recommended:**
```
motion-reduce:transition-none
```

**Avoid:**
```
No reduced motion support
```

---

## Performance

### Declare non-detected sources `[High]`
Tailwind v4 detects source files automatically; use @source only for ignored or external paths

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/docs/detecting-classes-in-source-files](https://tailwindcss.com/docs/detecting-classes-in-source-files)

- **Do:** @source '../node_modules/@acme/ui'
- **Don't:** Maintain a legacy content array for ordinary v4 sources

**Recommended:**
```
@source '../node_modules/@acme/ui'
```

**Avoid:**
```
content: ['./src/**/*.{js,ts,jsx,tsx}']
```

---

### JIT mode migration `[Medium]`
Tailwind v3 made JIT the default; remove obsolete mode configuration during migration

**Applies to:** html-tailwind legacy 3.x
**Documentation:** [https://tailwindcss.com/blog/just-in-time-the-next-generation-of-tailwind-css](https://tailwindcss.com/blog/just-in-time-the-next-generation-of-tailwind-css)

- **Do:** Use the v3 default compiler behavior
- **Don't:** Keep mode:'jit' as a current v4 requirement

**Recommended:**
```
Tailwind v3 defaults
```

**Avoid:**
```
mode: 'jit'
```

---

### Avoid @apply bloat `[Low]`
Use @apply sparingly

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/docs/reusing-styles](https://tailwindcss.com/docs/reusing-styles)

- **Do:** Direct utilities in HTML
- **Don't:** Heavy @apply usage

**Recommended:**
```
class='px-4 py-2 rounded'
```

**Avoid:**
```
@apply px-4 py-2 rounded;
```

---

### Use complete class tokens `[High]`
Keep utility class names statically detectable in source

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/docs/detecting-classes-in-source-files#dynamic-class-names](https://tailwindcss.com/docs/detecting-classes-in-source-files#dynamic-class-names)

- **Do:** Map variants to complete tokens like colorMap[color]
- **Don't:** Construct partial tokens with interpolation

**Recommended:**
```
const colorMap = { red: 'bg-red-500', blue: 'bg-blue-500' }
```

**Avoid:**
```
`bg-${color}-500`
```

---

## Plugins

### Official plugins `[Medium]`
Use maintained plugins only for capabilities not built into core

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/docs/functions-and-directives#plugin-directive](https://tailwindcss.com/docs/functions-and-directives#plugin-directive)

- **Do:** @tailwindcss/forms or @tailwindcss/typography
- **Don't:** Install legacy aspect-ratio or container-query plugins

**Recommended:**
```
@tailwindcss/forms
```

**Avoid:**
```
@tailwindcss/aspect-ratio
```

---

### Custom utilities `[Medium]`
Define reusable custom utilities with @utility

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/docs/adding-custom-styles#adding-custom-utilities](https://tailwindcss.com/docs/adding-custom-styles#adding-custom-utilities)

- **Do:** @utility content-auto { content-visibility: auto; }
- **Don't:** Repeat complex arbitrary values

**Recommended:**
```
@utility content-auto { content-visibility: auto; }
```

**Avoid:**
```
[content-visibility:auto] everywhere
```

---

## Interactivity

### Group and Peer `[Low]`
Style based on parent/sibling state

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-parent-state](https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-parent-state)

- **Do:** group-hover peer-checked
- **Don't:** JS for simple state interactions

**Recommended:**
```
group-hover:text-blue-500
```

**Avoid:**
```
onMouseEnter={() => setHover(true)}
```

---

## Customization

### Arbitrary Values `[Low]`
Use [] for one-off values

**Applies to:** html-tailwind 4.3
**Documentation:** [https://tailwindcss.com/docs/adding-custom-styles#using-arbitrary-values](https://tailwindcss.com/docs/adding-custom-styles#using-arbitrary-values)

- **Do:** w-[350px] for specific needs
- **Don't:** Creating config for single use

**Recommended:**
```
top-[117px] (if strictly needed)
```

**Avoid:**
```
style={{ top: '117px' }}
```

---
