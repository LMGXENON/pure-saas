import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const targetDir = path.resolve(__dirname, '../../references/theming');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const docs = [
  {
    name: 'dark-mode-color-inversion.md',
    title: 'Dark Mode Architecture & Color Inversion Principles',
    overview: 'Dark mode is not an automated mathematical negative of light mode. It requires desaturating primary colors, adjusting surface elevations, and balancing luminance to reduce visual glare.',
    rules: [
      { rule: 'Desaturate Accent Hues', detail: 'Vibrant colors that look crisp on white create eye-straining chromatic vibration on dark gray' },
      { rule: 'Surface Elevation by Lightness', detail: 'Higher elevation = lighter surface in dark mode (e.g. #0a0a0c base -> #18181b card -> #27272a dialog)' },
      { rule: 'Avoid Pure Black (#000000)', detail: 'Pure black causes severe smearing on OLED screens and stark contrast fatigue; prefer deep slate/zinc tones' }
    ],
    codeSnippet: `/* Light mode vs Dark mode token pairings */
:root {
  --color-canvas: #f8fafc;
  --color-surface: #ffffff;
  --color-border: #e2e8f0;
  --color-text-primary: #0f172a;
}

[data-theme="dark"] {
  --color-canvas: #09090b;
  --color-surface: #121215;
  --color-border: rgba(255, 255, 255, 0.08);
  --color-text-primary: #f8fafc;
}`,
    dos: [
      'Use deep charcoal/zinc backgrounds (#09090b) rather than harsh #000000.',
      'Slightly desaturate bright colored tags and status badges.'
    ],
    donts: [
      'Never invert images, avatars, or video elements with dark mode CSS filters.'
    ],
    accessibility: [
      'Verify text achieves at least 4.5:1 contrast against elevated dark surfaces.'
    ]
  },
  {
    name: 'contrast-preservation-themes.md',
    title: 'Contrast Preservation Across Theme Variants',
    overview: 'When supporting multiple themes (e.g. Light, Dark, Midnight, High-Contrast), semantic tokens must maintain WCAG 2.2 contrast compliance in every variation.',
    rules: [
      { rule: 'Luminance Bracket Testing', detail: 'Every theme must define explicit min/max lightness values for text and background pairs' },
      { rule: 'Automated Token Audit', detail: 'Run programmatic contrast checkers across every registered theme before deployment' }
    ],
    codeSnippet: `// Pure SaaS token contrast verification
// scripts/pure-saas.mjs contrast
const ratio = getContrastRatio(theme.surfaceBase, theme.textPrimary);
if (ratio < 4.5) {
  throw new Error(\`Contrast failure in theme "\${theme.name}": ratio \${ratio}:1 < 4.5:1\`);
}`,
    dos: [
      'Automate theme contrast testing in continuous integration.',
      'Ensure interactive focus rings achieve 3:1 contrast against all theme surfaces.'
    ],
    donts: [
      'Do not assume that an accent color compliant on white is automatically compliant on dark gray.'
    ],
    accessibility: [
      'WCAG 1.4.3 Contrast (Minimum).'
    ]
  },
  {
    name: 'system-preference-detection.md',
    title: 'System Preference Detection & Reactive Switching',
    overview: 'Modern web applications should default to the user’s operating system theme preference (`prefers-color-scheme`) while providing a manual user override that persists across sessions.',
    rules: [
      { rule: 'Match Media Listener', detail: 'window.matchMedia("(prefers-color-scheme: dark)")' },
      { rule: 'User Preference Storage', detail: 'Persist explicit choices ("light", "dark", "system") in localStorage or cookies' },
      { rule: 'Instant Reaction', detail: 'Listen for OS scheme changes and update UI immediately if in "system" mode' }
    ],
    codeSnippet: `export function initThemeListener() {
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
}`,
    dos: [
      'Provide a 3-way toggle: Light, Dark, System.',
      'Synchronize theme changes across all open browser tabs via storage events.'
    ],
    donts: [
      'Never force a theme switch without allowing the user to select their preference.'
    ],
    accessibility: [
      'Ensure theme switcher is accessible via keyboard.'
    ]
  },
  {
    name: 'css-variables-runtime-themes.md',
    title: 'CSS Variables Architecture for Runtime Theming',
    overview: 'Switching themes via CSS custom properties on the root element enables instant theme switching without re-rendering React trees or downloading new stylesheets.',
    rules: [
      { rule: 'Zero Hydration Jitter', detail: 'CSS variables switch instantly without causing React component remounts' },
      { rule: 'HSL / OKLCH Channel Splitting', detail: 'Exposing raw channels allows dynamic opacity tweaks: rgba(var(--color-primary-rgb), 0.15)' }
    ],
    codeSnippet: `:root {
  --color-primary-rgb: 37, 99, 235;
}

[data-theme="dark"] {
  --color-primary-rgb: 59, 130, 246;
}

.badge {
  background: rgba(var(--color-primary-rgb), 0.12);
  color: rgb(var(--color-primary-rgb));
}`,
    dos: [
      'Define semantic CSS custom properties on `:root` and `[data-theme="dark"]`.',
      'Use CSS variables for all border, background, and text colors.'
    ],
    donts: [
      'Avoid hardcoding inline hex values in JSX elements.'
    ],
    accessibility: [
      'Instant CSS variable switching prevents flash of unstyled content.'
    ]
  },
  {
    name: 'tailwind-theme-configuration.md',
    title: 'Tailwind CSS Theme Token Integration',
    overview: 'Configuring Tailwind CSS to resolve utility classes directly to semantic CSS variables eliminates arbitrary color classes and enforces design consistency.',
    rules: [
      { rule: 'Semantic Color Mapping', detail: 'Extend theme.colors to map `surface.base` to `var(--color-surface-base)`' },
      { rule: 'Disable Hex Utilities', detail: 'Prevent teams from using raw palette classes (bg-blue-600) in component files' }
    ],
    codeSnippet: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        surface: {
          base: 'var(--color-surface-base)',
          elevated: 'var(--color-surface-elevated)',
          overlay: 'var(--color-surface-overlay)',
          hover: 'var(--color-surface-hover)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
        },
        border: {
          subtle: 'var(--color-border-subtle)',
          default: 'var(--color-border-default)',
        }
      }
    }
  }
};`,
    dos: [
      'Map Tailwind utilities directly to CSS custom properties.',
      'Use semantic class names like `bg-surface-base` and `text-text-primary`.'
    ],
    donts: [
      'Never allow arbitrary color bracket utilities like `bg-[#0f172a]`.'
    ],
    accessibility: [
      'Consistent token usage guarantees predictable contrast across all views.'
    ]
  },
  {
    name: 'theme-flash-prevention.md',
    title: 'Theme Flash Prevention (FOIT / FOUC) in SSR & Next.js',
    overview: 'When using server-side rendering, a mismatch between server-rendered HTML and client localStorage can cause an ugly white flash when loading dark mode.',
    rules: [
      { rule: 'Blocking Head Script', detail: 'Execute a tiny inline script before any HTML renders to set the data-theme attribute synchronously' },
      { rule: 'Cookie-Based SSR', detail: 'Store theme preference in a cookie so the server can render the exact theme class on first byte' }
    ],
    codeSnippet: `<!-- Place directly at the top of <head> before stylesheets -->
<script>
  (function() {
    try {
      var saved = localStorage.getItem('theme-preference');
      var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var theme = saved === 'dark' || (saved !== 'light' && systemDark) ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {}
  })();
</script>`,
    dos: [
      'Inject an inline synchronous theme detection script in the document `<head>`.',
      'Keep the head script under 200 bytes with zero external dependencies.'
    ],
    donts: [
      'Never wait for React hydration (`useEffect`) to set the initial theme.'
    ],
    accessibility: [
      'Prevents sudden high-luminance light flashes that trigger sensory discomfort.'
    ]
  },
  {
    name: 'high-contrast-modes.md',
    title: 'High Contrast Mode & Forced-Colors Adaptations',
    overview: 'Operating system high-contrast modes assist users with significant vision loss by replacing author colors with system-defined high-contrast palettes.',
    rules: [
      { rule: '@media (forced-colors: active)', detail: 'Browser ignores author backgrounds and text colors' },
      { rule: 'System Color Keywords', detail: 'Use Canvas, CanvasText, Highlight, HighlightText, ButtonText' },
      { rule: 'Transparent Borders', detail: 'Elements that rely on background contrast must have a 1px solid transparent border to remain visible' }
    ],
    codeSnippet: `/* Ensure cards and buttons remain defined in Windows High Contrast */
.card {
  border: 1px solid transparent; /* Becomes visible in forced-colors mode */
}

@media (forced-colors: active) {
  .badge-active {
    forced-color-adjust: none; /* Only use if critical to preserve brand distinction */
  }
}`,
    dos: [
      'Add 1px transparent borders to cards, inputs, and buttons so they gain solid borders in forced-colors mode.',
      'Test interfaces with Windows Contrast themes.'
    ],
    donts: [
      'Never indiscriminately apply `forced-color-adjust: none` across the entire document.'
    ],
    accessibility: [
      'Essential for low-vision users on Windows platforms.'
    ]
  },
  {
    name: 'multi-brand-theming.md',
    title: 'Multi-Brand & Tenant Token Scoping',
    overview: 'Enterprise SaaS products often serve multiple customer brands or sub-brands from a single unified codebase.',
    rules: [
      { rule: 'Tenant Scope Class', detail: 'Wrap tenant workspace containers in a scoped class: `.theme-acme`, `.theme-globex`' },
      { rule: 'Token Variable Overrides', detail: 'Override semantic brand tokens (--color-accent, --font-family-brand) within tenant classes' }
    ],
    codeSnippet: `.theme-acme {
  --color-accent-primary: #e11d48;
  --font-family-brand: 'Inter', sans-serif;
}

.theme-enterprise {
  --color-accent-primary: #0284c7;
  --font-family-brand: 'SF Pro Display', sans-serif;
}`,
    dos: [
      'Scope brand overrides strictly to CSS variables.',
      'Validate that all tenant brand accent colors meet WCAG AA requirements.'
    ],
    donts: [
      'Never duplicate entire CSS stylesheets or component libraries for each tenant.'
    ],
    accessibility: [
      'Enforce contrast limits during custom tenant color configuration.'
    ]
  }
];

let created = 0;
for (const d of docs) {
  const filePath = path.join(targetDir, d.name);
  let content = `# ${d.title}\n\n`;
  content += `${d.overview}\n\n---\n\n`;
  content += `## 1. Architectural Rules & Core Principles\n\n`;
  content += `| Rule / Principle | Concrete Specification |\n`;
  content += `| :--- | :--- |\n`;
  for (const r of d.rules) {
    content += `| **${r.rule}** | ${r.detail} |\n`;
  }
  content += `\n---\n\n## 2. Configuration & Implementation Reference\n\n`;
  content += `\`\`\`css\n${d.codeSnippet}\n\`\`\`\n\n---\n\n`;
  content += `## 3. Best Practices (Do's & Don'ts)\n\n`;
  content += `| Do | Don't |\n| :--- | :--- |\n`;
  const maxRows = Math.max(d.dos.length, d.donts.length);
  for (let i = 0; i < maxRows; i++) {
    const doItem = d.dos[i] || '';
    const dontItem = d.donts[i] || '';
    content += `| ${doItem} | ${dontItem} |\n`;
  }
  content += `\n---\n\n## 4. Verification & Testing Standards\n\n`;
  for (const a of d.accessibility) {
    content += `- **${a}**\n`;
  }
  content += `\n---\n\n## 5. Anti-Slop Discipline\n\n`;
  content += `- Eliminate hardcoded hex values; ensure all themes cleanly resolve to semantic variables.\n`;

  fs.writeFileSync(filePath, content, 'utf8');
  created++;
}

console.log(`Created ${created} theming references in references/theming/`);
