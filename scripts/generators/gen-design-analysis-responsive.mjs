import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const analysisDir = path.resolve(__dirname, '../../references/design-analysis');
const responsiveDir = path.resolve(__dirname, '../../references/responsive');

for (const dir of [analysisDir, responsiveDir]) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

const analysisGuides = [
  {
    name: 'screenshot-reference-analysis.md',
    title: 'Screenshot Reference Deconstruction & Visual Decomposition',
    overview: 'Deconstructing visual references requires breaking flat screenshots into their fundamental layers: canvas backgrounds, spatial containers, elevation shadows, typography hierarchies, and interactive affordances.',
    sections: [
      { name: 'Layer Separation', detail: 'Separate background canvases, elevation cards, borders, typography, and foreground controls' },
      { name: 'Color Palette Sampling', detail: 'Sample hex values from uncompressed areas to extract surface, text, and accent tokens' },
      { name: 'Hierarchy Mapping', detail: 'Identify the visual focal point and the primary path of user attention' }
    ],
    codeSnippet: `// 16-Section DESIGN.md Extraction Workflow
1. Capture reference at 1440px (desktop), 768px (tablet), and 375px (mobile).
2. Sample canvas background, elevated card surface, and border colors.
3. Measure primary heading, subheading, and body font sizes and line heights.
4. Document spatial padding and grid gap values.
5. Record component corner radii (R_outer, R_inner).
6. Author formal 16-section DESIGN.md specification before implementation.`,
    dos: [
      'Analyze reference screenshots across desktop, tablet, and mobile breakpoints.',
      'Check if backgrounds use subtle noise, gradients, or ambient canvas shaders.'
    ],
    donts: [
      'Never guess colors from a low-resolution compressed thumbnail.'
    ],
    accessibility: [
      'Verify that extracted color pairings meet WCAG AA contrast before using them in code.'
    ]
  },
  {
    name: 'dom-devtools-extraction.md',
    title: 'Live Website DOM & DevTools Reverse Engineering',
    overview: 'Inspecting live reference websites via browser DevTools extracts exact computed styles, CSS variables, and layout structures rather than relying on optical guesswork.',
    sections: [
      { name: 'Computed Properties', detail: 'Inspect window.getComputedStyle() for exact font-family, font-size, line-height, letter-spacing' },
      { name: 'CSS Variables', detail: 'Extract root custom properties (--color-*, --space-*)' },
      { name: 'Animation Curves', detail: 'Inspect DevTools Animations panel to scrub transitions and export cubic-bezier timings' }
    ],
    codeSnippet: `// Browser Console Snippet to Extract CSS Variables
const rootStyles = getComputedStyle(document.documentElement);
const cssVars = Array.from(document.styleSheets)
  .flatMap(sheet => {
    try { return Array.from(sheet.cssRules); } catch (e) { return []; }
  })
  .filter(rule => rule.selectorText === ':root')
  .flatMap(rule => Array.from(rule.style))
  .filter(prop => prop.startsWith('--'))
  .reduce((acc, prop) => {
    acc[prop] = rootStyles.getPropertyValue(prop).trim();
    return acc;
  }, {});
console.log(JSON.stringify(cssVars, null, 2));`,
    dos: [
      'Extract computed styles using browser automation or developer tools.',
      'Document dynamic hover and active states of buttons and cards.'
    ],
    donts: [
      'Never assume font-family based on visual appearance without checking network font files.'
    ],
    accessibility: [
      'Inspect DOM hierarchy to verify semantic headings and ARIA landmarks.'
    ]
  },
  {
    name: 'spacing-scale-reconstruction.md',
    title: 'Spacing Scale Reconstruction & Spatial Reverse Engineering',
    overview: 'Reverse engineering layouts requires identifying the underlying spatial rhythm (typically 4pt or 8pt grid) to eliminate arbitrary padding values.',
    sections: [
      { name: 'Gutter Analysis', detail: 'Measure horizontal gaps between grid columns (16px, 24px, 32px)' },
      { name: 'Padding Derivation', detail: 'Measure internal component insets and calculate standard component scales' },
      { name: 'Section Vertical Rhythm', detail: 'Measure vertical margins between major section headers (64px, 96px, 128px)' }
    ],
    codeSnippet: `/* Reconstructed Spacing Scale */
--space-card-padding: 24px;
--space-section-gap: 96px;
--space-grid-gutter: 32px;
--space-inline-gap: 8px;`,
    dos: [
      'Snap observed pixel distances to the nearest 4px or 8px grid step.',
      'Check consistency across desktop and mobile containers.'
    ],
    donts: [
      'Do not hardcode random uneven numbers like 27px or 43px.'
    ],
    accessibility: [
      'Maintain generous spacing between interactive controls.'
    ]
  },
  {
    name: 'typography-matching-pairing.md',
    title: 'Typography Matching, Pairing & Font Fallbacks',
    overview: 'Accurately reproducing a brand identity requires identifying primary display typefaces, editorial body pairings, and reliable system font stacks.',
    sections: [
      { name: 'Classification', detail: 'Identify typeface classification (Geometric Sans, Neo-Grotesque, Humanist Sans, Editorial Serif, Monospace)' },
      { name: 'Weight & Optical Sizing', detail: 'Match font weights (400, 500, 600, 700) and optical tracking' },
      { name: 'Robust Fallbacks', detail: 'Define zero-CLS system fallbacks with matching x-height and size-adjust' }
    ],
    codeSnippet: `/* Typography pairing with size-adjust to prevent CLS */
@font-face {
  font-family: 'FallbackSans';
  src: local('Arial');
  ascent-override: 95%;
  descent-override: 25%;
  size-adjust: 102%;
}

:root {
  --font-heading: 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'Geist Mono', 'SF Mono', Menlo, Consolas, monospace;
}`,
    dos: [
      'Use `size-adjust` on system fallback fonts to prevent layout shift during web font loading.',
      'Pair a distinctive heading font with a neutral, highly readable body font.'
    ],
    donts: [
      'Never mix more than two distinct font families in a single application interface.'
    ],
    accessibility: [
      'Verify font legibility at 12px and 14px sizes.'
    ]
  },
  {
    name: 'motion-curve-reconstruction.md',
    title: 'Motion Curve & Physics Reverse Engineering',
    overview: 'Recreating the tactile feel of an interface requires analyzing duration, acceleration, and damping curves from live reference sites.',
    sections: [
      { name: 'Frame Rate Analysis', detail: 'Record 60fps / 120fps video to count animation frames' },
      { name: 'Curve Fitting', detail: 'Fit transitions to CSS cubic-bezier parameters' },
      { name: 'Stagger Offset Measurement', detail: 'Measure millisecond delay between consecutive list item entrances' }
    ],
    codeSnippet: `/* Reconstructed motion tokens */
--motion-duration-popover: 180ms;
--motion-ease-popover: cubic-bezier(0.16, 1, 0.3, 1);
--motion-stagger-delay: 35ms;`,
    dos: [
      'Recreate physics-based deceleration curves rather than generic linear transitions.',
      'Respect prefers-reduced-motion preferences.'
    ],
    donts: [
      'Never slow down animations beyond 350ms for basic navigational transitions.'
    ],
    accessibility: [
      'Provide instant transitions for users requesting reduced motion.'
    ]
  },
  {
    name: 'visual-drift-comparison-gates.md',
    title: 'Visual Drift Comparison & 11-Item Quality Gates',
    overview: 'Before claiming that a recreation is complete, perform rigorous side-by-side visual comparison against the original reference across an 11-item completion gate.',
    sections: [
      { name: 'Side-by-Side Viewport Audit', detail: 'Render reference and recreation at identical 1440px, 768px, and 375px widths' },
      { name: 'Visual Difference Threshold', detail: 'Verify layout geometry, typography weights, and alignment match within strict tolerances' },
      { name: 'Honest Verification Reporting', detail: 'Explicitly record verified, failed, and untested elements' }
    ],
    codeSnippet: `// 11-Item Pure SaaS Completion Checklist
1. Semantic Tokens Enforced (Zero raw hex codes).
2. Typography Scales & Tracking Verified.
3. 8pt Spatial Grid Aligned.
4. 8-State Component Matrix Complete.
5. Light & Dark Mode Contrast Verified (>= 4.5:1).
6. Hairline Borders & Materials Styled.
7. Fluid Physics Motion Integrated.
8. Reduced Motion Honored.
9. Responsive Breakpoints Tested (375px, 768px, 1440px).
10. Backend APIs & Data Contracts Preserved.
11. Anti-Slop Audit Passed (No generic AI slop).`,
    dos: [
      'Perform honest side-by-side screenshot comparisons.',
      'Test edge cases, empty states, and error states.'
    ],
    donts: [
      'Never declare a recreation complete without testing at mobile and desktop viewports.'
    ],
    accessibility: [
      'Verify full keyboard tab navigation through the entire recreated interface.'
    ]
  }
];

const responsiveGuides = [
  {
    name: 'mobile-first-breakpoint-strategy.md',
    title: 'Mobile-First Breakpoint Architecture',
    overview: 'Designing mobile-first ensures core functionality and critical content are prioritized on constrained viewports before expanding outward.',
    sections: [
      { name: 'Mobile (375px - 430px)', detail: 'Single column, full-width actions, bottom sheets, 44px minimum touch targets' },
      { name: 'Tablet (768px - 834px)', detail: '2-column bento grids, collapsible sidebars, adaptive navigation' },
      { name: 'Desktop (1024px - 1440px+)', detail: 'Multi-column dashboards, persistent side rails, dense data tables' }
    ],
    codeSnippet: `/* Standard Responsive Breakpoint Tokens */
--breakpoint-sm: 640px;   /* Small tablets / large phones */
--breakpoint-md: 768px;   /* Tablets portrait */
--breakpoint-lg: 1024px;  /* Tablets landscape / small laptops */
--breakpoint-xl: 1280px;  /* Desktop workstations */
--breakpoint-2xl: 1536px; /* Ultra-wide monitors */`,
    dos: [
      'Write mobile CSS as base styles, layering `@media (min-width: ...)` progressively.',
      'Test on actual physical devices or device emulation in DevTools.'
    ],
    donts: [
      'Never rely on desktop-only hover states for essential interactive workflows.'
    ],
    accessibility: [
      'WCAG 1.4.10 Reflow: Content must reflow down to 320px width without horizontal scrolling.'
    ]
  },
  {
    name: 'touch-target-ergonomics.md',
    title: 'Mobile Touch Ergonomics & Thumb Zones',
    overview: 'Mobile interfaces must place primary actions within natural one-handed thumb reach zones while avoiding awkward top-corner stretches.',
    sections: [
      { name: 'Natural Thumb Zone', detail: 'Bottom third of the screen accommodates primary action buttons and navigation bars' },
      { name: 'Hard-to-Reach Zone', detail: 'Top screen corners reserved for infrequent navigation back or settings icons' },
      { name: 'Hit Target Expansion', detail: 'Minimum 44x44px clickable bounding box' }
    ],
    codeSnippet: `/* Bottom sticky mobile action bar */
<div className="fixed bottom-0 left-0 right-0 p-4 bg-[var(--color-surface-base)] border-t border-[var(--color-border-subtle)] md:hidden z-30">
  <button className="w-full h-12 rounded-xl bg-[var(--color-accent-primary)] text-white font-semibold text-sm shadow-lg">
    Complete Checkout ($129)
  </button>
</div>`,
    dos: [
      'Position primary transactional CTAs in a sticky bottom bar on mobile.',
      'Ensure bottom bars respect iOS safe area insets (`env(safe-area-inset-bottom)`).'
    ],
    donts: [
      'Never force mobile users to stretch to the top left corner for routine primary actions.'
    ],
    accessibility: [
      'WCAG 2.5.8 Target Size Minimum.'
    ]
  },
  {
    name: 'fluid-typography-spacing-clamp.md',
    title: 'Fluid Typography & Spacing with CSS clamp()',
    overview: 'Fluid typography and spacing smoothly scale between mobile and desktop viewport boundaries without abrupt layout jumps.',
    sections: [
      { name: 'clamp() Formula', detail: 'clamp(min, preferred, max) — e.g. clamp(1rem, 0.8rem + 1vw, 1.5rem)' },
      { name: 'Fluid Line Heights', detail: 'Keep line-height proportional to font-size' },
      { name: 'Fluid Section Margins', detail: 'Section padding expands seamlessly from 48px on mobile to 120px on desktop' }
    ],
    codeSnippet: `:root {
  /* Scales continuously from 375px viewport to 1440px viewport */
  --fluid-h1: clamp(2rem, 1.4rem + 2.5vw, 3.5rem);
  --fluid-section-gap: clamp(3rem, 2rem + 4vw, 7.5rem);
}`,
    dos: [
      'Use fluid clamp() for hero headings and section vertical padding.',
      'Anchor minimum values to ensure legibility on 320px screens.'
    ],
    donts: [
      'Never let fluid font formulas scale text below 12px on small screens.'
    ],
    accessibility: [
      'Must support user-driven 200% font zoom without truncation.'
    ]
  },
  {
    name: 'adaptive-navigation-patterns.md',
    title: 'Adaptive Navigation Patterns: Mobile Drawer to Desktop Rail',
    overview: 'Navigation must transform gracefully between mobile bottom sheets/drawers and persistent desktop sidebars.',
    sections: [
      { name: 'Mobile Pattern', detail: 'Bottom navigation bar (3-5 core items) + full-screen slide drawer' },
      { name: 'Tablet Pattern', detail: 'Collapsible 64px icon rail with flyout labels' },
      { name: 'Desktop Pattern', detail: 'Persistent 240px sidebar with hierarchical tree categories' }
    ],
    codeSnippet: `// Adaptive navigation component
export function Navigation() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return isMobile ? <MobileBottomNav /> : <DesktopSidebar />;
}`,
    dos: [
      'Keep mobile bottom navigation bars under 5 items.',
      'Preserve active route indicators across both navigation formats.'
    ],
    donts: [
      'Do not hide global search completely on mobile devices.'
    ],
    accessibility: [
      'Ensure mobile hamburger triggers have `aria-expanded` and trap focus when open.'
    ]
  },
  {
    name: 'data-density-viewport-modes.md',
    title: 'Data Density & Responsive Viewport Adaptations',
    overview: 'Dense data grids must adapt their display density across screen sizes: comfortable spacing on touchscreens, compact high-information density on desktop workstations.',
    sections: [
      { name: 'Touch Density Mode', detail: '48px row heights, generous tap targets, secondary metadata folded into expandable rows' },
      { name: 'Workstation Compact Mode', detail: '32px row heights, monospace tabular numerals, 8+ visible columns' }
    ],
    codeSnippet: `/* Density CSS class switching */
.table-compact tr { height: 32px; font-size: 12px; }
.table-comfortable tr { height: 48px; font-size: 14px; }`,
    dos: [
      'Allow users to toggle between Compact, Normal, and Comfortable data density modes.',
      'Default to comfortable density on touch-first viewports.'
    ],
    donts: [
      'Never force tiny 10px fonts on mobile touchscreens to simulate desktop tables.'
    ],
    accessibility: [
      'Maintain legible contrast and visible focus rings in both density modes.'
    ]
  },
  {
    name: 'cross-device-form-inputs.md',
    title: 'Cross-Device Form Input Optimization & Virtual Keyboards',
    overview: 'Optimizing form inputs for mobile devices requires invoking the correct virtual keyboard layout, preventing unwanted auto-zoom, and streamlining entry.',
    sections: [
      { name: 'Input Modes', detail: 'inputmode="numeric" for credit cards/OTP, inputmode="decimal" for currency, inputmode="email"' },
      { name: 'Auto-Zoom Prevention', detail: 'Font-size must be at least 16px on iOS inputs to prevent mobile Safari from zooming the viewport' },
      { name: 'Keyboard Action Keys', detail: 'enterkeyhint="next" or "done" to guide keyboard progression' }
    ],
    codeSnippet: `<!-- Optimal Mobile Form Input -->
<input
  id="order-amount"
  type="text"
  inputmode="decimal"
  enterkeyhint="done"
  style="font-size: 16px;" /* Prevents iOS auto-zoom */
  class="h-11 px-3 rounded-lg border bg-[var(--color-surface-base)]"
/>`,
    dos: [
      'Set input font-size to at least 16px (1rem) to prevent mobile Safari auto-zooming.',
      'Use explicit `inputmode` and `enterkeyhint` attributes.'
    ],
    donts: [
      'Never set `<meta name="viewport" content="maximum-scale=1.0, user-scalable=no">` (breaks accessibility).'
    ],
    accessibility: [
      'WCAG 1.4.4 Resize Text: User must be able to zoom text up to 200% without loss of content.'
    ]
  }
];

let created = 0;
for (const g of analysisGuides) {
  const filePath = path.join(analysisDir, g.name);
  let content = `# ${g.title}\n\n${g.overview}\n\n---\n\n## 1. Core Dimensions & Methodology\n\n| Dimension | Technical Detail |\n| :--- | :--- |\n`;
  for (const s of g.sections) {
    content += `| **${s.name}** | ${s.detail} |\n`;
  }
  content += `\n---\n\n## 2. Implementation & Extraction Reference\n\n\`\`\`javascript\n${g.codeSnippet}\n\`\`\`\n\n---\n\n## 3. Best Practices (Do's & Don'ts)\n\n| Do | Don't |\n| :--- | :--- |\n`;
  for (let i = 0; i < Math.max(g.dos.length, g.donts.length); i++) {
    content += `| ${g.dos[i] || ''} | ${g.donts[i] || ''} |\n`;
  }
  content += `\n---\n\n## 4. Accessibility & Verification\n\n`;
  for (const a of g.accessibility) {
    content += `- **${a}**\n`;
  }
  content += `\n---\n\n## 5. Anti-Slop Enforcement\n\n- Never guess or approximate when live DOM styles or computed CSS variables can be directly verified.\n`;
  fs.writeFileSync(filePath, content, 'utf8');
  created++;
}

for (const g of responsiveGuides) {
  const filePath = path.join(responsiveDir, g.name);
  let content = `# ${g.title}\n\n${g.overview}\n\n---\n\n## 1. Responsive Viewports & Architecture\n\n| Viewport / Dimension | Technical Specification |\n| :--- | :--- |\n`;
  for (const s of g.sections) {
    content += `| **${s.name}** | ${s.detail} |\n`;
  }
  content += `\n---\n\n## 2. Code Implementation Reference\n\n\`\`\`css\n${g.codeSnippet}\n\`\`\`\n\n---\n\n## 3. Best Practices (Do's & Don'ts)\n\n| Do | Don't |\n| :--- | :--- |\n`;
  for (let i = 0; i < Math.max(g.dos.length, g.donts.length); i++) {
    content += `| ${g.dos[i] || ''} | ${g.donts[i] || ''} |\n`;
  }
  content += `\n---\n\n## 4. Accessibility & Viewport Reflow\n\n`;
  for (const a of g.accessibility) {
    content += `- **${a}**\n`;
  }
  content += `\n---\n\n## 5. Anti-Slop Enforcement\n\n- Eliminate horizontal scrollbars on mobile; ensure layouts reflow smoothly down to 320px.\n`;
  fs.writeFileSync(filePath, content, 'utf8');
  created++;
}

console.log(`Created ${created} guides across design-analysis and responsive!`);

