export interface DocArticle {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  content: string[];
  keyRules?: { rule: string; rationale: string }[];
  codeSample?: { language: string; code: string };
}

export const docsArticles: DocArticle[] = [
  {
    slug: 'overview',
    title: 'Introduction & Core Stance',
    category: 'Foundations',
    readTime: '4 min read',
    summary: 'Pure SaaS is an open-source, universal AI-agent skill and design enforcement toolkit that transforms AI coding assistants into disciplined, production-grade product designers.',
    content: [
      'Modern LLMs default to generic, uncurated UI patterns trained indiscriminately on internet templates: centered gradient text, excessive glassmorphism blur, repetitive 3-column cards, and emoji UI icons ("AI slop").',
      'Pure SaaS enforces an uncompromising design stance rooted in Apple Human Interface Guidelines, modern web standards, WCAG 2.2 Level AA accessibility, and strict semantic token architectures.',
      'Whether using Claude Code, Cursor, Windsurf, GitHub Copilot, or Gemini / Antigravity, Pure SaaS provides the exact rules, references, and verification tooling to ensure generated interfaces look intentional, restrained, and hardware-grade.'
    ],
    keyRules: [
      { rule: 'Zero AI Slop', rationale: 'Reject generic purple/cyan blur blobs, card vomit, and fake squiggly line metrics.' },
      { rule: 'Semantic Tokens Only', rationale: 'All colors and spacing must resolve to documented design tokens in DESIGN.md.' },
      { rule: 'Preserve Backend APIs', rationale: 'Never overwrite backend endpoints, database schemas, or authentication logic during UI refactors.' }
    ]
  },
  {
    slug: 'precedence',
    title: 'The 5-Tier Precedence Model',
    category: 'Governance',
    readTime: '3 min read',
    summary: 'When conflicting requirements or styles arise, Pure SaaS resolves them through an explicit 5-tier governance hierarchy.',
    content: [
      'To prevent AI agents from hallucinating random aesthetic choices or overwriting customer branding, every design decision must be evaluated through the 5-Tier Precedence Model:',
      '1. User Requirements & Established Product Brand: The user\'s explicit instructions, existing brand identity, and approved design tokens always take absolute precedence.',
      '2. Platform Conventions & Accessibility Standards: Host platform expectations (Apple HIG for macOS/iOS, Web standards for browsers) and WCAG 2.2 AA rules govern over aesthetics.',
      '3. Verified Project Decisions & Approved Tokens: The confirmed tokens recorded in DESIGN.md. Once approved, these tokens are immutable across refactors.',
      '4. Retrieved Guidance & Reference Intelligence: Retrieved reference documents from Apple HIG, Framework Engineering Guides, and curated design intelligence.',
      '5. New Agent Proposals: Any new suggestion or style archetype not previously approved. Proposals must always be explicitly identified as proposals (status: draft, recorded in unresolved ledger).'
    ]
  },
  {
    slug: 'anti-slop',
    title: 'Anti-Slop Design Rules & Deadly Tropes',
    category: 'Visual Craft',
    readTime: '6 min read',
    summary: 'A concrete critique methodology identifying and eliminating the top 12 generic AI design anti-patterns.',
    content: [
      'AI coding agents converge on identical visual tropes because their training data is dominated by marketing templates and toy demos. Pure SaaS defines strict anti-slop review triggers:',
      '1. Purple, Indigo & Cyan Gradient Blurs: Massive blurry background blobs behind hero headings. Fix: Solid high-contrast backgrounds or crisp architectural grids.',
      '2. Excessive Glassmorphism: Slapping backdrop-blur-md bg-white/10 onto every card. Fix: Opaque surfaces with crisp hairline borders.',
      '3. "Card Vomit": Wrapping every isolated sentence into an identical rounded rectangle container repeated across 3 identical columns. Fix: Editorial typography, whitespace, and asymmetrical splits.',
      '4. Generic Centered Heroes: Centered badge pill -> massive centered heading -> 2 lines of subtext -> 2 centered buttons -> floating faux screenshot. Fix: Left-aligned 60/40 compositions or live interactive playgrounds.',
      '5. Emoji Replacing Real Icons: Using 🚀, ⚡, 🔥, 💡 as UI icons inside cards. Fix: Crisp consistent SVG iconography (Lucide, Feather).',
      '6. Fake Metrics & Slogans: Fabricating charts labeled "ARR +420%" or writing "Supercharge your workflow". Fix: Real data structures and precise, concrete product copy.'
    ]
  },
  {
    slug: 'interaction-states',
    title: 'The 8-State Component Matrix',
    category: 'Components',
    readTime: '5 min read',
    summary: 'Every interactive component must fully implement and document all 8 discrete interaction states before being considered complete.',
    content: [
      'Incomplete UI components that only implement default and hover states feel broken under real-world usage. Pure SaaS mandates the 8-state matrix:',
      '1. Default / Rest: Baseline state with balanced typography, crisp borders, and accessible resting contrast.',
      '2. Hover: Pointer device feedback (+4% luminance or subtle background tint; no layout shifts).',
      '3. Active / Pressed: Tactile down-state feedback (scale(0.98) or slight inset compression).',
      '4. Focus-Visible: 2px high-contrast ring with 2px offset for keyboard navigation (never outline: none without replacement).',
      '5. Disabled: Dimmed opacity (40-50%), not-allowed cursor, pointer-events: none, aria-disabled="true".',
      '6. Loading: Inline micro-spinner or shimmer skeleton; preserves original component bounding width to prevent layout shifts.',
      '7. Error / Invalid: Red accent border, helper text with role="alert", aria-invalid="true".',
      '8. Success / Confirmed: Emerald green checkmark or spring pulse micro-animation.'
    ],
    codeSample: {
      language: 'css',
      code: `/* Pure SaaS 8-State Button Token Architecture */
.btn-primary {
  background: var(--color-primary-base);
  color: var(--color-primary-fg);
  border: 1px solid transparent;
  transition: all 150ms var(--ease-spring-snappy);
}
.btn-primary:hover { background: var(--color-primary-hover); }
.btn-primary:active { transform: scale(0.98); }
.btn-primary:focus-visible { outline: 2px solid var(--color-focus-ring); outline-offset: 2px; }
.btn-primary:disabled { opacity: 0.45; cursor: not-allowed; pointer-events: none; }
.btn-primary[aria-busy="true"] { pointer-events: none; opacity: 0.75; }`
    }
  },
  {
    slug: 'verification',
    title: 'Evidence-Based Verification Protocol',
    category: 'Quality Assurance',
    readTime: '4 min read',
    summary: 'Pure SaaS forbids fabricated validation claims. Every test result must distinguish between verified, failed, and untested areas.',
    content: [
      'AI coding agents frequently claim "100% WCAG compliance" or "All responsive tests passed" without actually executing browser tests or inspecting computed styles.',
      'Pure SaaS mandates honest verification reporting with 4-part findings:',
      '1. Finding: The concrete defect.',
      '2. Evidence: Exact file and line (path/file.tsx:42) plus measured value.',
      '3. Impact: Severity tier (Critical, Warning, Info).',
      '4. Concrete Fix: Verified replacement code snippet.',
      'If an environment lacks a headless browser or screen reader runtime, the agent must explicitly document those checks as UNTESTED rather than fabricating a passing status.'
    ]
  }
];

