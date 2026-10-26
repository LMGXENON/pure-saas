// scripts/generators/generate-docs-data.mjs
// Generates the streamlined, practical documentation portal dataset for Pure SaaS

import fs from 'fs';
import path from 'path';

const docsDataPath = path.resolve('pure-saas-website/src/data/docsData.ts');

const INSTALL_PROMPT = `Configure this repository with Pure SaaS for UI and frontend engineering.
1. Run \`npx pure-saas init\` to initialize skill files, commands, and assistant rules.
2. Run \`npx pure-saas design-system --product "SaaS" --variance 5 --motion 5 --density 6 --out DESIGN.md\` to establish semantic design tokens.
3. Verify the installation by running \`npx pure-saas validate DESIGN.md\`.`;

const articles = [
  // ==========================================
  // SECTION 1: GETTING STARTED (First in Sidebar)
  // ==========================================
  {
    slug: 'getting-started-introduction',
    title: 'Introduction & Prerequisites',
    category: 'Getting Started',
    readTime: '3 min read',
    summary: 'What Pure SaaS is, how it helps AI coding agents build better SaaS interfaces, and the core system requirements.',
    agentPrompt: INSTALL_PROMPT,
    sections: [
      {
        id: 'what-is-pure-saas',
        title: 'What is Pure SaaS?',
        level: 2,
        content: [
          'Pure SaaS is an open-source skill and design enforcement toolkit for AI coding assistants — including Claude Code, Cursor, Windsurf, GitHub Copilot, and Google Gemini.',
          'Instead of leaving your AI coding agent to invent arbitrary hex codes, inconsistent spacing ratios, or inaccessible contrast levels, Pure SaaS supplies it with verified design system guidance, component blueprints, and structured workflows directly in your repository.',
          'Pure SaaS runs 100% locally on your machine. It requires no API keys, makes no external telemetry requests, and introduces zero client-side dependencies into your production web application.'
        ]
      },
      {
        id: 'prerequisites',
        title: 'Prerequisites',
        level: 2,
        content: [
          'Before setting up Pure SaaS, verify that your local development environment satisfies the following requirements:'
        ],
        list: [
          'Node.js 18.0.0 or higher (Node 20+ LTS recommended).',
          'Git 2.28 or higher for repository version control.',
          'A supported AI coding assistant (Cursor, Windsurf, Claude Code, GitHub Copilot, or Gemini/Antigravity).',
          'A modern package manager (npm, pnpm, yarn, or bun).'
        ],
        codeSample: {
          language: 'bash',
          code: 'node -v\n# Expected: v18.0.0 or higher\n\ngit --version\n# Expected: git version 2.28.0 or higher'
        }
      }
    ]
  },
  {
    slug: 'getting-started-installation',
    title: 'Installation & Setup Guide',
    category: 'Getting Started',
    readTime: '6 min read',
    summary: 'A step-by-step walkthrough covering environment verification, CLI installation, agent setup, DESIGN.md configuration, and your first task.',
    agentPrompt: INSTALL_PROMPT,
    sections: [
      {
        id: 'step-1-prerequisites',
        title: 'Step 1: Introduction and Prerequisites',
        level: 2,
        content: [
          'Pure SaaS is designed to integrate into existing or new repositories in seconds without modifying your build pipeline.',
          'Before beginning, confirm your local runtime meets the minimum version requirements:'
        ],
        codeSample: {
          language: 'bash',
          code: 'node -v\n# Must output v18.0.0 or greater\n\nnpm -v\n# Must output v9.0.0 or greater'
        },
        callout: {
          type: 'tip',
          title: 'Zero Dependencies in Production',
          text: 'Pure SaaS executes via npx and standard repository markdown files. It never adds packages to your production dependencies.'
        }
      },
      {
        id: 'step-2-supported-environments',
        title: 'Step 2: Supported Environments & Verified Requirements',
        level: 2,
        content: [
          'Pure SaaS provides native configuration support for all major AI coding environments. Each tool loads rules through its native instructions file:'
        ],
        table: {
          headers: ['Assistant / Tool', 'Rule File', 'Supported Version', 'Mode'],
          rows: [
            ['Cursor IDE', '.cursorrules', '>= 0.40.0', 'Automatic Workspace Rules'],
            ['Google Gemini / Antigravity', 'GEMINI.md', 'Latest', 'System Prompt & Skill Rules'],
            ['Windsurf (Codeium)', '.windsurfrules', '>= 1.0.0', 'Workspace Guidance'],
            ['Claude Code / Cline', '~/.claude/skills/pure-saas', 'Latest', 'Skill Integration'],
            ['GitHub Copilot', '.github/copilot-instructions.md', 'Latest', 'Custom Workspace Instructions'],
            ['Standard CLI / Terminal', 'npx pure-saas', 'Node >= 18', 'Direct Command-Line Execution']
          ]
        }
      },
      {
        id: 'step-3-installation-commands',
        title: 'Step 3: Installation Instructions',
        level: 2,
        content: [
          'Run the zero-dependency CLI initialization command in the root of your project repository:'
        ],
        codeSample: {
          language: 'bash',
          code: '# Run inside your project root\nnpx pure-saas init'
        },
        content_after: [
          'The initialization wizard automatically scans your directory structure, detects which AI tools you have installed, and creates starter configuration files.',
          'Alternatively, if you are setting up offline or in a customized sandbox, clone or copy the Pure SaaS skill folder directly into your workspace rules directory.'
        ]
      },
      {
        id: 'step-4-agent-setup',
        title: 'Step 4: Coding-Agent Setup Instructions',
        level: 2,
        content: [
          'Ensure your coding agent knows where to locate Pure SaaS instructions. Add the following reference directive to your respective editor configuration:'
        ],
        codeSample: {
          language: 'markdown',
          filename: '.cursorrules (or GEMINI.md / .windsurfrules)',
          code: `# Pure SaaS Directives
When implementing or modifying UI components, pages, or styling:
1. Always resolve colors, borders, and spacing to semantic tokens defined in DESIGN.md.
2. Adhere to the 8-state component interaction matrix (default, hover, focus, active, disabled, loading, error, success).
3. Enforce WCAG 2.2 AA contrast standards (minimum 4.5:1 for body text, 3:1 for large text).
4. Never introduce green circular pulsing/pinging status dots.`
        },
        callout: {
          type: 'important',
          title: 'Rule Loading Verification',
          text: 'If your coding agent does not seem to recognize rules, restart your IDE session or reload the window to ensure the new file is indexed.'
        }
      },
      {
        id: 'step-5-configuration-design-md',
        title: 'Step 5: Configuration & DESIGN.md',
        level: 2,
        content: [
          'The core of Pure SaaS is DESIGN.md — a single Markdown specification file in your project root that defines semantic design tokens and controls agent behavior via numeric dials.',
          'Generate an initial DESIGN.md tailored to your product archetype using the design-system generator:'
        ],
        codeSample: {
          language: 'bash',
          code: 'npx pure-saas design-system --product "SaaS Dashboard" --variance 5 --motion 5 --density 7 --out DESIGN.md'
        },
        content_after: [
          'You can customize the frontmatter parameters at any time. For instance, increase density from 5 to 8 for data-dense engineering consoles, or set variance to 3 for rigid corporate consistency.'
        ]
      },
      {
        id: 'step-6-verification',
        title: 'Step 6: Installation Verification',
        level: 2,
        content: [
          'Verify your installation using the built-in token validator and contrast auditor:'
        ],
        codeSample: {
          language: 'bash',
          code: '# 1. Check structural validity of tokens\nnpx pure-saas validate DESIGN.md\n\n# 2. Audit color pairs for WCAG 2.2 AA compliance\nnpx pure-saas contrast DESIGN.md'
        },
        content_after: [
          'Expected result: All tokens pass schema validation and all text/surface pairings satisfy the 4.5:1 contrast requirement.'
        ]
      },
      {
        id: 'step-7-first-task',
        title: 'Step 7: A First Practical Task',
        level: 2,
        content: [
          'Test Pure SaaS with a real UI task in your AI coding assistant. Paste the following prompt into your chat window:'
        ],
        codeSample: {
          language: 'text',
          code: '/pure-saas Build a clean API Key Management card in React with Tailwind CSS. Include a masked key display, copy-to-clipboard action with feedback, an expiration badge, and a revoke button with confirmation.'
        },
        content_after: [
          'Observe how the agent references DESIGN.md, avoids hardcoded arbitrary hex values, implements complete focus and hover states, and uses tabular numerals for technical strings.'
        ]
      },
      {
        id: 'step-8-troubleshooting-next-steps',
        title: 'Step 8: Troubleshooting and Next Steps',
        level: 2,
        content: [
          'If you encounter unexpected agent output or styling drift:',
          '• Run `npx pure-saas check DESIGN.md --source src` to scan your codebase for raw arbitrary styling.',
          '• Run `npx pure-saas diff DESIGN.before.md DESIGN.md` to review token changes.',
          '• Check the Troubleshooting & Diagnostics guide for common assistant edge cases.'
        ],
        callout: {
          type: 'note',
          title: 'Next Step',
          text: 'Explore the 6 Slash Commands to learn how to guide visual polish, review pull requests, and optimize responsive breakpoints.'
        }
      }
    ]
  },
  {
    slug: 'getting-started-configuration',
    title: 'Configuration & DESIGN.md',
    category: 'Getting Started',
    readTime: '4 min read',
    summary: 'Learn how DESIGN.md governs design tokens and calibrates agent behavior using frontmatter dials.',
    sections: [
      {
        id: 'design-md-overview',
        title: 'The Role of DESIGN.md',
        level: 2,
        content: [
          'Pure SaaS uses a single root-level DESIGN.md file to establish the source of truth for all styling decisions.',
          'Your AI coding agent inspects this file before authoring components. When you update tokens in DESIGN.md, the agent reflects those changes across all generated code.'
        ],
        codeSample: {
          language: 'markdown',
          filename: 'DESIGN.md',
          code: `---
product: "Acme Analytics"
archetype: "saas-dashboard"
variance: 3
motion: 4
density: 8
theme: "dark"
tokens:
  canvas: "#09090b"
  surface: "#18181b"
  border: "rgba(255, 255, 255, 0.08)"
  accent: "#0071e3"
---

# DESIGN.md — Acme Analytics Specification`
        }
      },
      {
        id: 'design-dials',
        title: 'Frontmatter Dials (1–10 Scale)',
        level: 2,
        content: [
          'You can customize three numeric dials in the frontmatter of DESIGN.md to tailor the agent\'s output:'
        ],
        table: {
          headers: ['Dial', 'Range', 'Purpose'],
          rows: [
            ['variance', '1 – 10', 'Controls creative layout freedom. Set to 2–4 for strict corporate consistency, 7–9 for expressive exploratory landing pages.'],
            ['motion', '1 – 10', 'Controls transition dynamics. Set to 1 for reduced motion, 4–5 for standard micro-interactions, 8+ for spring-revealed hero graphics.'],
            ['density', '1 – 10', 'Controls information density. Set to 2–4 for spacious marketing copy, 7–9 for compact data tables and telemetry clusters.']
          ]
        }
      }
    ]
  },
  {
    slug: 'getting-started-verifying',
    title: 'Verifying Installation',
    category: 'Getting Started',
    readTime: '2 min read',
    summary: 'Verify that Pure SaaS is properly configured and accessible to both your terminal and AI coding agent.',
    sections: [
      {
        id: 'cli-verification',
        title: '1. Verify the CLI',
        level: 2,
        content: [
          'Run the built-in validator against your DESIGN.md file:'
        ],
        codeSample: {
          language: 'bash',
          code: 'npx pure-saas validate DESIGN.md\n# Expected: ✓ All tokens valid'
        }
      },
      {
        id: 'agent-verification',
        title: '2. Verify Agent Recognition',
        level: 2,
        content: [
          'Ask your AI assistant: "What design tokens are defined in our DESIGN.md file?"',
          'The agent should open DESIGN.md, read the frontmatter, and list your canvas, surface, border, and accent colors accurately.'
        ]
      }
    ]
  },
  {
    slug: 'getting-started-first-task',
    title: 'Your First Task',
    category: 'Getting Started',
    readTime: '4 min read',
    summary: 'A simple tutorial showing how to give your AI agent a task and review the resulting interface.',
    sections: [
      {
        id: 'step-1-prompt',
        title: 'Step 1: Issue the Command',
        level: 2,
        content: [
          'In your AI coding assistant\'s chat window, enter a clear request:'
        ],
        codeSample: {
          language: 'text',
          code: '/pure-saas Build a responsive 4-column metric card cluster for a SaaS telemetry dashboard. Include P99 latency, error rate, throughput, and active nodes.'
        }
      },
      {
        id: 'step-2-agent-execution',
        title: 'Step 2: Watch the Agent Execute',
        level: 2,
        content: [
          'Pure SaaS guides the agent to:',
          '1. Retrieve component patterns from the reference library.',
          '2. Bind all styling to documented tokens in DESIGN.md.',
          '3. Implement all interactive states (hover, focus-visible, active).',
          '4. Verify contrast ratios and mobile responsiveness.'
        ]
      }
    ]
  },
  {
    slug: 'getting-started-understanding-output',
    title: 'Understanding the Output',
    category: 'Getting Started',
    readTime: '3 min read',
    summary: 'How to interpret the code, styling tokens, and verification summaries produced by Pure SaaS.',
    sections: [
      {
        id: 'output-structure',
        title: 'What Pure SaaS Produces',
        level: 2,
        content: [
          'When Pure SaaS completes a task, it outputs:',
          '• Clean, production-ready TSX/JSX components.',
          '• Semantic token bindings (using CSS variables rather than hardcoded hex values).',
          '• Full accessibility support (WCAG 2.2 AA contrast, visible keyboard focus rings).',
          '• An evidence verification summary reporting exact files modified and tests conducted.'
        ]
      }
    ]
  },
  {
    slug: 'getting-started-next-steps',
    title: 'Next Steps',
    category: 'Getting Started',
    readTime: '2 min read',
    summary: 'Where to go after completing your first task with Pure SaaS.',
    sections: [
      {
        id: 'explore-more',
        title: 'Continuing Your Journey',
        level: 2,
        content: [
          'Now that your setup is working, explore the rest of the documentation:',
          '• Learn the specialist slash commands in the Commands section.',
          '• Follow practical tutorials in the Guides section.',
          '• Discover real projects in the Community Showcase.'
        ]
      }
    ]
  },

  // ==========================================
  // SECTION 2: GUIDES & WORKFLOWS
  // ==========================================
  {
    slug: 'guide-building-components',
    title: 'Building Interactive Components',
    category: 'Guides & Workflows',
    readTime: '5 min read',
    summary: 'Learn how to generate components that satisfy the mandatory 8-state interaction matrix.',
    sections: [
      {
        id: '8-state-matrix',
        title: 'The 8-State Component Matrix',
        level: 2,
        content: [
          'Every component built with Pure SaaS must support 8 distinct interactive states:',
          '1. Default: Baseline idle state.',
          '2. Hover: Clear visual elevation, border brightening, or subtle tint.',
          '3. Focus: Unmistakable keyboard focus ring (minimum 2px with offset).',
          '4. Active: Pressed state (scale-98 or darkened surface).',
          '5. Disabled: Dimmed opacity (50%), aria-disabled="true", cursor-not-allowed.',
          '6. Loading: Non-disruptive spinner or skeleton with aria-busy="true".',
          '7. Error: Semantic red border and text with aria-invalid="true".',
          '8. Success: Calmed confirmation feedback.'
        ]
      }
    ]
  },
  {
    slug: 'guide-refactoring-legacy-ui',
    title: 'Refactoring Legacy UI & Fixing Slop',
    category: 'Guides & Workflows',
    readTime: '6 min read',
    summary: 'How to use /pure-saas polish to elevate visual craft without breaking backend APIs.',
    sections: [
      {
        id: 'refactor-rules',
        title: 'Safety Rules for Refactoring',
        level: 2,
        content: [
          'When polishing an existing codebase, Pure SaaS strictly obeys the Non-Regression Rule:',
          '• Never modify API endpoints, request payloads, or response parsing.',
          '• Preserve test IDs (data-testid) and form field names.',
          '• Never alter authentication tokens, session handling, or cookies.',
          '• Replace raw hex values with semantic tokens gradually.'
        ]
      }
    ]
  },
  {
    slug: 'guide-responsive-layouts',
    title: 'Responsive & Ergonomic Layouts',
    category: 'Guides & Workflows',
    readTime: '5 min read',
    summary: 'Designing across mobile, tablet, laptop, and ultra-wide viewports using mobile-first breakpoints.',
    sections: [
      {
        id: 'viewport-standards',
        title: 'Four Standard Viewports',
        level: 2,
        table: {
          headers: ['Device Class', 'Breakpoint', 'Layout Strategy'],
          rows: [
            ['Mobile', '375px – 430px', 'Single column, 44px+ touch targets, sticky bottom action bar, hidden secondary columns.'],
            ['Tablet', '768px – 834px', 'Two columns, collapsible sidebars, dense data tables with horizontal scroll.'],
            ['Laptop', '1024px – 1280px', 'Fixed sidebar navigation, 3-column metric grids, full table density.'],
            ['Desktop', '1440px+', 'Max-width containment (max-w-7xl), generous whitespace, multi-pane master-detail.']
          ]
        }
      }
    ]
  },
  {
    slug: 'guide-audit-and-verification',
    title: 'Evidence-Based Review & Auditing',
    category: 'Guides & Workflows',
    readTime: '4 min read',
    summary: 'How to conduct a 4-part review using /pure-saas review and report honest verification findings.',
    sections: [
      {
        id: 'four-part-finding',
        title: 'The 4-Part Audit Finding Structure',
        level: 2,
        content: [
          'Every issue identified by Pure SaaS must include four specific elements:',
          '1. Finding: Concise description of the defect.',
          '2. Evidence: Exact file path and line number (e.g. src/components/Button.tsx:42).',
          '3. Impact: Severity tier (Critical, Warning, or Info).',
          '4. Concrete Fix: Drop-in code snippet to resolve the issue.'
        ]
      }
    ]
  },

  // ==========================================
  // SECTION 3: COMMANDS
  // ==========================================
  {
    slug: 'command-pure-saas',
    title: '/pure-saas (Universal Command)',
    category: 'Commands',
    readTime: '4 min read',
    summary: 'The main intelligent entry point that autonomously inspects context, updates DESIGN.md, and implements UI.',
    sections: [
      {
        id: 'syntax-overview',
        title: 'Syntax & Usage',
        level: 2,
        codeSample: {
          language: 'text',
          code: '/pure-saas [any design, coding, or refactoring request]'
        },
        content: [
          '/pure-saas is the default command. You do not need to memorize specialist commands for routine tasks. It inspects your project, selects the appropriate workflow, and executes changes while preserving backend APIs.'
        ]
      }
    ]
  },
  {
    slug: 'command-design',
    title: '/pure-saas design',
    category: 'Commands',
    readTime: '3 min read',
    summary: 'Establish or update the root-level DESIGN.md specification before implementation.',
    sections: [
      {
        id: 'syntax-design',
        title: 'Syntax & Purpose',
        level: 2,
        codeSample: {
          language: 'text',
          code: '/pure-saas design [product description, style direction, or token requirements]'
        },
        content: [
          'Use /pure-saas design when starting a new project or updating your design tokens. It produces or updates DESIGN.md without modifying any component source code.'
        ]
      }
    ]
  },
  {
    slug: 'command-polish',
    title: '/pure-saas polish',
    category: 'Commands',
    readTime: '3 min read',
    summary: 'Elevate typography tracking, surface lighting, and micro-interactions without rebuilding working logic.',
    sections: [
      {
        id: 'syntax-polish',
        title: 'Syntax & Purpose',
        level: 2,
        codeSample: {
          language: 'text',
          code: '/pure-saas polish [file or component path]'
        },
        content: [
          'Targets visual craft: fixes letter tracking, aligns optical margins, adds subtle hairline borders, and refines hover transitions without touching existing state management.'
        ]
      }
    ]
  },
  {
    slug: 'command-review',
    title: '/pure-saas review',
    category: 'Commands',
    readTime: '4 min read',
    summary: 'Rigorous, evidence-based quality audit across bugs, security, accessibility, performance, and tokens.',
    sections: [
      {
        id: 'syntax-review',
        title: 'Syntax & Purpose',
        level: 2,
        codeSample: {
          language: 'text',
          code: '/pure-saas review [file, git commit, or pull request]'
        },
        content: [
          'Scans code for arbitrary hex colors, missing focus rings, non-semantic HTML, and WCAG contrast violations. Outputs 4-part actionable findings.'
        ]
      }
    ]
  },
  {
    slug: 'command-reference',
    title: '/pure-saas reference',
    category: 'Commands',
    readTime: '4 min read',
    summary: 'Reverse-engineer visual references via browser DevTools and recreate requested design language into DESIGN.md.',
    sections: [
      {
        id: 'syntax-reference',
        title: 'Syntax & Purpose',
        level: 2,
        codeSample: {
          language: 'text',
          code: '/pure-saas reference <URL>'
        },
        content: [
          'Instructs the agent to inspect a live reference site, extract computed CSS variables, typography ratios, and spatial tokens, and synthesize a 16-section DESIGN.md specification.'
        ]
      }
    ]
  },
  {
    slug: 'command-responsive',
    title: '/pure-saas responsive',
    category: 'Commands',
    readTime: '3 min read',
    summary: 'Optimize layouts across mobile (375-430px), tablet (768-834px), laptop (1024-1280px), and desktop (1440px+).',
    sections: [
      {
        id: 'syntax-responsive',
        title: 'Syntax & Purpose',
        level: 2,
        codeSample: {
          language: 'text',
          code: '/pure-saas responsive [file or route]'
        },
        content: [
          'Ensures touch targets meet the 44x44px minimum, tables scroll horizontally or convert into cards, and drawer navigation replaces desktop headers on small viewports.'
        ]
      }
    ]
  },

  // ==========================================
  // SECTION 4: CLI REFERENCE
  // ==========================================
  {
    slug: 'cli-overview',
    title: 'CLI Overview & Installation',
    category: 'CLI Reference',
    readTime: '3 min read',
    summary: 'Run validation, contrast audits, and token exports directly from your terminal or CI/CD pipeline.',
    sections: [
      {
        id: 'zero-dependency',
        title: 'Zero-Dependency Architecture',
        level: 2,
        content: [
          'The Pure SaaS CLI (pure-saas) is built with standard Node.js APIs and requires zero third-party dependencies.',
          'You can invoke it instantly using npx:'
        ],
        codeSample: {
          language: 'bash',
          code: 'npx pure-saas --help'
        }
      }
    ]
  },
  {
    slug: 'cli-validate-and-contrast',
    title: 'pure-saas validate & contrast',
    category: 'CLI Reference',
    readTime: '3 min read',
    summary: 'Check DESIGN.md structure and verify WCAG 2.2 AA contrast compliance.',
    sections: [
      {
        id: 'validation-commands',
        title: 'Validation Usage',
        level: 2,
        codeSample: {
          language: 'bash',
          code: '# Validate tokens in DESIGN.md\nnpx pure-saas validate DESIGN.md\n\n# Audit contrast ratios against WCAG 2.2 AA\nnpx pure-saas contrast DESIGN.md'
        }
      }
    ]
  },
  {
    slug: 'cli-export-tokens',
    title: 'pure-saas export-tokens',
    category: 'CLI Reference',
    readTime: '3 min read',
    summary: 'Export DESIGN.md tokens into CSS custom properties, Tailwind config, or Design Tokens Community Group (DTCG) JSON.',
    sections: [
      {
        id: 'export-formats',
        title: 'Supported Formats',
        level: 2,
        codeSample: {
          language: 'bash',
          code: '# Export to CSS Variables\nnpx pure-saas export-tokens DESIGN.md --format css --out src/tokens.css\n\n# Export to Tailwind v3 / v4 theme\nnpx pure-saas export-tokens DESIGN.md --format tailwind --out tailwind.theme.js\n\n# Export to DTCG standard JSON\nnpx pure-saas export-tokens DESIGN.md --format dtcg --out tokens.json'
        }
      }
    ]
  },
  {
    slug: 'cli-check-and-drift',
    title: 'pure-saas check & drift',
    category: 'CLI Reference',
    readTime: '4 min read',
    summary: 'Scan source code for arbitrary styling and detect drift between tokens and runtime observations.',
    sections: [
      {
        id: 'drift-commands',
        title: 'Drift & Source Scanning',
        level: 2,
        codeSample: {
          language: 'bash',
          code: '# Scan src folder for hardcoded colors or unapproved classes\nnpx pure-saas check DESIGN.md --source src --known known-defects.json\n\n# Compare expected tokens to measured browser observations\nnpx pure-saas drift DESIGN.md observations.json'
        }
      }
    ]
  },

  // ==========================================
  // SECTION 5: TROUBLESHOOTING & FAQ
  // ==========================================
  {
    slug: 'safety-and-guardrails',
    title: 'Safety Guardrails & Backend Integrity',
    category: 'Troubleshooting & FAQ',
    readTime: '4 min read',
    summary: 'Understand the security boundaries and non-regression guarantees enforced by Pure SaaS.',
    sections: [
      {
        id: 'safety-boundaries',
        title: 'Strict Boundaries',
        level: 2,
        content: [
          'To ensure safety, Pure SaaS explicitly restricts itself from:',
          '1. Modifying production database schemas or running migration scripts automatically.',
          '2. Deploying code to live cloud infrastructure (AWS, Vercel, Fly.io) without explicit user intervention.',
          '3. Editing private authentication keys, secrets, or .env files.',
          '4. Altering backend API contracts or test suites.'
        ]
      }
    ]
  },
  {
    slug: 'faq',
    title: 'Frequently Asked Questions',
    category: 'Troubleshooting & FAQ',
    readTime: '6 min read',
    summary: 'Answers to the most common questions regarding Pure SaaS licensing, performance, tokens, and agent capabilities.',
    sections: [
      {
        id: 'faq-list',
        title: 'Common Questions',
        level: 2,
        content: [
          'Q: Is Pure SaaS free and open source?',
          'A: Yes. Pure SaaS is 100% open source under the MIT License. You can use it in private commercial projects, client work, or open-source repositories with zero royalties.',
          '',
          'Q: Does Pure SaaS require an internet connection or send code to external servers?',
          'A: No. Pure SaaS runs entirely locally inside your coding agent and machine. It has zero external telemetry and makes no external network requests.',
          '',
          'Q: Can I use Pure SaaS with an existing component library like shadcn/ui or Radix?',
          'A: Yes! Pure SaaS works exceptionally well with shadcn/ui, Radix UI, and Headless UI. It replaces generic Tailwind classes with semantic tokens and ensures proper focus rings and hover states.',
          '',
          'Q: Why is there an absolute ban on green pulsing dots?',
          'A: Green circular pulsing/pinging dots are one of the most overused AI-generated tropes. They distract the user, fake real-time activity, and degrade visual refinement. Pure SaaS enforces clean typography and accessible status pills instead.'
        ]
      }
    ]
  },
  {
    slug: 'troubleshooting',
    title: 'Master Troubleshooting & Diagnostics',
    category: 'Troubleshooting & FAQ',
    readTime: '5 min read',
    summary: 'Comprehensive diagnostic guide for resolving agent confusion, missing reference errors, and styling inconsistencies.',
    sections: [
      {
        id: 'diagnostic-steps',
        title: 'Diagnostic Procedures',
        level: 2,
        steps: [
          {
            step: 1,
            title: 'Verify File Existence',
            description: 'Ensure DESIGN.md and SKILL.md are present in your workspace root.'
          },
          {
            step: 2,
            title: 'Run CLI Validation',
            description: 'Run npx pure-saas validate DESIGN.md to check for syntax errors or missing tokens.'
          },
          {
            step: 3,
            title: 'Clear Agent Cache',
            description: 'If your agent is ignoring instructions, restart the AI agent session or reload the IDE window to re-index workspace rules.'
          }
        ]
      }
    ]
  }
];

// Add next/prev pointers automatically across the sequential articles
for (let i = 0; i < articles.length; i++) {
  if (i > 0) {
    articles[i].prev = { slug: articles[i - 1].slug, title: articles[i - 1].title };
  }
  if (i < articles.length - 1) {
    articles[i].next = { slug: articles[i + 1].slug, title: articles[i + 1].title };
  }
}

const fileContent = `// Auto-generated by scripts/generators/generate-docs-data.mjs
// Comprehensive GitBook-style documentation portal dataset for Pure SaaS

export interface DocSection {
  id: string;
  title: string;
  level?: number;
  content?: string[];
  content_after?: string[];
  callout?: {
    type: 'note' | 'tip' | 'important' | 'warning';
    title?: string;
    text: string;
  };
  table?: {
    headers: string[];
    rows: string[][];
  };
  steps?: {
    step: number;
    title: string;
    description: string;
    code?: string;
    language?: string;
  }[];
  codeSample?: {
    code: string;
    language: string;
    filename?: string;
  };
  list?: string[];
}

export interface DocArticle {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  agentPrompt?: string;
  sections: DocSection[];
  relatedReferences?: { title: string; path: string }[];
  prev?: { slug: string; title: string };
  next?: { slug: string; title: string };
}

export const docsArticles: DocArticle[] = ${JSON.stringify(articles, null, 2)};
`;

fs.writeFileSync(docsDataPath, fileContent, 'utf8');
console.log(`Successfully wrote ${articles.length} comprehensive articles to ${docsDataPath}`);
