import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const targetDir = path.resolve(__dirname, '../../references/developer-tooling');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const tools = [
  {
    name: 'design-token-linting.md',
    title: 'Design Token Linting & Static AST Verification',
    overview: 'Static analysis tools scan codebase ASTs to detect raw hex colors, arbitrary spacing constants, and deprecated tokens before they can be merged.',
    mechanisms: [
      { name: 'AST Pattern Matching', detail: 'Flags string literals matching regex `/#([0-9a-fA-F]{3,8})/` in CSS and TSX' },
      { name: 'Token Replacement Ledger', detail: 'Suggests the correct semantic token when a hardcoded value is detected' },
      { name: 'CI Pre-Commit Hook', detail: 'Blocks git commits containing unstaged token violations' }
    ],
    codeSnippet: `// Pure SaaS AST Token Checker Command
$ npx pure-saas check DESIGN.md --source src --known known-defects.json
// Scans all files in src/ and cross-references against DESIGN.md token declarations`,
    dos: [
      'Run static token checks in git pre-commit hooks and CI pipelines.',
      'Provide automatic `--fix` suggestions where a raw hex maps directly to a semantic token.'
    ],
    donts: [
      'Do not allow engineers to disable token linting rules with file-wide ignore comments.'
    ],
    accessibility: [
      'Enforcing tokens guarantees that verified accessible color pairs are preserved.'
    ]
  },
  {
    name: 'stylelint-token-enforcement.md',
    title: 'Stylelint Configuration for Strict Token Enforcement',
    overview: 'Stylelint rules prevent arbitrary CSS declarations, enforcing the use of CSS custom properties for colors, spacing, and font sizes.',
    mechanisms: [
      { name: 'stylelint-declaration-strict-value', detail: 'Enforces that properties like `color`, `background-color`, and `border-color` must resolve to CSS variables' },
      { name: 'Disallow Hex & RGB', detail: 'Throws fatal build errors on `#hex`, `rgb()`, or `hsl()` in `.css` files' }
    ],
    codeSnippet: `// .stylelintrc.json
{
  "plugins": ["stylelint-declaration-strict-value"],
  "rules": {
    "scale-unlimited/declaration-strict-value": [
      ["/color$/", "background-color", "border-color"],
      {
        "ignoreValues": ["transparent", "inherit", "currentColor"]
      }
    ]
  }
}`,
    dos: [
      'Enforce CSS custom properties for all color declarations.',
      'Allow common safe exceptions (transparent, inherit, currentColor).'
    ],
    donts: [
      'Never allow raw color values in CSS component stylesheets.'
    ],
    accessibility: [
      'Guarantees all component colors update cleanly during theme switches.'
    ]
  },
  {
    name: 'headless-browser-regression.md',
    title: 'Visual Regression Testing with Headless Browsers',
    overview: 'Visual regression testing captures screenshots in headless Chromium/WebKit and computes pixel diffs against approved baseline snapshots.',
    mechanisms: [
      { name: 'Pixelmatch Threshold', detail: 'Set strict diff threshold (0.05% - 0.1%) to detect visual drift' },
      { name: 'Dynamic Element Masking', detail: 'Mask dates, timestamps, random avatars, and animated carousels before capturing' },
      { name: 'Cross-Viewport Matrix', detail: 'Execute test suites across 375px (mobile), 768px (tablet), and 1440px (desktop)' }
    ],
    codeSnippet: `// Playwright visual regression test
import { test, expect } from '@playwright/test';

test('homepage visual regression', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  
  // Mask dynamic timestamp element
  const timestamp = page.locator('#current-timestamp');
  
  await expect(page).toHaveScreenshot('homepage.png', {
    mask: [timestamp],
    maxDiffPixelRatio: 0.02
  });
});`,
    dos: [
      'Run visual tests against deterministic mock data.',
      'Mask dynamic elements (dates, avatars, animated graphs) to avoid false positive diffs.'
    ],
    donts: [
      'Never run visual regression tests against live production databases with fluctuating content.'
    ],
    accessibility: [
      'Verify focus rings and high-contrast modes in automated visual regression runs.'
    ]
  },
  {
    name: 'contrast-ratio-automation.md',
    title: 'Automated Contrast Ratio CI Pipelines',
    overview: 'Automating contrast validation checks mathematical WCAG luminance formulas on every build without requiring manual eyedropper checks.',
    mechanisms: [
      { name: 'Automated Token Audit', detail: 'Parses DESIGN.md and computes contrast between all defined surface and text tokens' },
      { name: 'Axe-core Browser Audits', detail: 'Scans the live DOM during end-to-end tests to catch background image contrast failures' }
    ],
    codeSnippet: `// Programmatic contrast checker
$ npx pure-saas contrast DESIGN.md
// Output:
// PASS: --color-surface-base on --color-text-primary: 14.2:1 (>= 4.5:1)
// PASS: --color-button-primary-bg on --color-button-primary-fg: 5.1:1 (>= 4.5:1)`,
    dos: [
      'Integrate contrast checking directly into pre-push git hooks.',
      'Block CI pipelines if any text token pair falls below 4.5:1.'
    ],
    donts: [
      'Never skip testing dark mode token pairs.'
    ],
    accessibility: [
      'WCAG 2.2 Level AA compliance verification.'
    ]
  },
  {
    name: 'storybook-component-catalog.md',
    title: 'Storybook Component Catalogs & State Testing',
    overview: 'Storybook provides an isolated sandbox to develop, test, and document components across all 8 core states (Default, Hover, Focus, Active, Disabled, Loading, Error, Success).',
    mechanisms: [
      { name: 'Story Args & Controls', detail: 'Interactive prop toggles for designers and developers' },
      { name: 'Play Functions', detail: 'Automated user interaction testing using @storybook/test and axe-storybook-addon' },
      { name: 'Dark/Light Addon', detail: 'Instant toolbar switching between light, dark, and high-contrast backgrounds' }
    ],
    codeSnippet: `// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  args: { children: 'Confirm Action', variant: 'primary' },
};
export default meta;

export const AllStates: StoryObj = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Button variant="primary">Default</Button>
      <Button variant="primary" isLoading>Loading</Button>
      <Button variant="primary" disabled>Disabled</Button>
    </div>
  ),
};`,
    dos: [
      'Render all 8 interaction states side-by-side in story matrices.',
      'Run automated axe accessibility checks on all stories.'
    ],
    donts: [
      'Do not maintain mock component copies in Storybook that differ from production source code.'
    ],
    accessibility: [
      'Use `@storybook/addon-a11y` to highlight WCAG violations in real time.'
    ]
  },
  {
    name: 'tailwind-arbitrary-prevention.md',
    title: 'Arbitrary Tailwind Class Prevention & ESLint Rules',
    overview: 'Arbitrary Tailwind brackets (`w-[327px]`, `bg-[#1a1a1a]`, `text-[13.5px]`) re-introduce rogue styling chaos into codebases. Pure SaaS enforces strict ESLint rules to ban them.',
    mechanisms: [
      { name: 'eslint-plugin-tailwindcss', detail: 'Flags class names containing bracket notation `[...]`' },
      { name: 'Design Dial Alignment', detail: 'Forces developers to configure design dials in tailwind.config.js rather than inventing arbitrary numbers in JSX' }
    ],
    codeSnippet: `// .eslintrc.json
{
  "plugins": ["tailwindcss"],
  "rules": {
    "tailwindcss/no-arbitrary-value": "error",
    "tailwindcss/no-custom-classname": "warn"
  }
}`,
    dos: [
      'Configure Tailwind spacing and typography scales to cover valid product requirements.',
      'Reject PRs with arbitrary color or spacing brackets.'
    ],
    donts: [
      'Never allow `bg-[#hex]` or `m-[number]` in production code.'
    ],
    accessibility: [
      'Ensures all font sizes and line heights originate from vetted accessible scales.'
    ]
  },
  {
    name: 'lighthouse-ci-auditing.md',
    title: 'Lighthouse CI Auditing & Performance Budgets',
    overview: 'Lighthouse CI automatically benchmarks performance, accessibility, SEO, and best practices on every pull request.',
    mechanisms: [
      { name: 'Performance Budget', detail: 'JavaScript bundle < 150kB gzipped, LCP < 2.5s, CLS < 0.05' },
      { name: 'Accessibility Score Gate', detail: 'Require 100/100 accessibility score in CI' },
      { name: 'Median Runs', detail: 'Execute 3 runs per URL to discard transient network anomalies' }
    ],
    codeSnippet: `// lighthouserc.json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "startServerCommand": "npm run start"
    },
    "assert": {
      "assertions": {
        "categories:accessibility": ["error", { "minScore": 1 }],
        "categories:performance": ["error", { "minScore": 0.9 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.05 }]
      }
    }
  }
}`,
    dos: [
      'Set hard failure gates on accessibility (<100) and CLS (>0.05).',
      'Track historical metric trends across release branches.'
    ],
    donts: [
      'Never disable Lighthouse CI checks to bypass failing scores.'
    ],
    accessibility: [
      'Catches missing alt tags, invalid ARIA roles, and low-contrast elements before release.'
    ]
  },
  {
    name: 'browser-devtools-inspection-workflow.md',
    title: 'Browser DevTools Inspection & Visual Audit Workflow',
    overview: 'A disciplined manual DevTools inspection workflow verifies computed metrics, rendering layers, repaint cycles, and CSS animations in real runtime engines.',
    mechanisms: [
      { name: 'Computed Styles Tab', detail: 'Verify actual rendered font-size, line-height, and padding values against tokens' },
      { name: 'Rendering Drawer', detail: 'Enable "Paint flashing" and "Layout Shift Regions" to spot jank' },
      { name: 'Animations Inspector', detail: 'Scrub CSS transitions and cubic-bezier curves at 10% speed to verify physics damping' }
    ],
    codeSnippet: `// Browser DevTools inspection checklist
1. Open DevTools (Cmd+Option+I / F12).
2. Press Cmd+Shift+P -> "Show Rendering" -> Enable "Paint flashing".
3. Interact with buttons, modals, and lists; verify no unexpected full-page repaints.
4. Toggle "Emulate CSS prefers-reduced-motion: reduce"; confirm animations halt.
5. Inspect computed colors on the Elements tab to confirm CSS variable resolution.`,
    dos: [
      'Inspect actual computed CSS values on Retina and standard resolution screens.',
      'Scrub animations at 10% speed to audit spring easing curves.'
    ],
    donts: [
      'Never claim visual verification was completed without actually inspecting the running webpage.'
    ],
    accessibility: [
      'Use the DevTools Accessibility Pane to inspect the computed Accessibility Tree.'
    ]
  }
];

let created = 0;
for (const t of tools) {
  const filePath = path.join(targetDir, t.name);
  let content = `# ${t.title}\n\n`;
  content += `${t.overview}\n\n---\n\n`;
  content += `## 1. Tooling Mechanisms & Specifications\n\n`;
  content += `| Tool / Mechanism | Operational Detail |\n`;
  content += `| :--- | :--- |\n`;
  for (const m of t.mechanisms) {
    content += `| **${m.name}** | ${m.detail} |\n`;
  }
  content += `\n---\n\n## 2. Configuration & Execution Reference\n\n`;
  content += `\`\`\`bash\n${t.codeSnippet}\n\`\`\`\n\n---\n\n`;
  content += `## 3. Best Practices (Do's & Don'ts)\n\n`;
  content += `| Do | Don't |\n| :--- | :--- |\n`;
  const maxRows = Math.max(t.dos.length, t.donts.length);
  for (let i = 0; i < maxRows; i++) {
    const doItem = t.dos[i] || '';
    const dontItem = t.donts[i] || '';
    content += `| ${doItem} | ${dontItem} |\n`;
  }
  content += `\n---\n\n## 4. Verification & Quality Gates\n\n`;
  for (const a of t.accessibility) {
    content += `- **${a}**\n`;
  }
  content += `\n---\n\n## 5. Anti-Slop Enforcement\n\n`;
  content += `- Automated tooling prevents human error and stops generic styling drift at the pull request boundary.\n`;

  fs.writeFileSync(filePath, content, 'utf8');
  created++;
}

console.log(`Created ${created} developer tooling references in references/developer-tooling/`);
