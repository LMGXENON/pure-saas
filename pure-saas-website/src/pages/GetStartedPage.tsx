import React, { useState } from 'react';
import { CodeBlock } from '../components/CodeBlock';
import { Link } from 'react-router-dom';
import { 
  Terminal, 
  ArrowRight 
} from 'lucide-react';

export const GetStartedPage: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<'claude' | 'cursor' | 'windsurf' | 'copilot' | 'gemini'>('claude');

  const steps = [
    {
      num: 1,
      title: 'Understand What Pure SaaS Is & What You Need',
      summary: 'Pure SaaS is an open-source skill and design enforcement toolkit that operates directly inside your AI coding assistant.',
      detail: 'You do not need a third-party SaaS subscription, API key, or cloud account. Pure SaaS runs entirely locally inside your coding agent (Claude Code, Cursor, Windsurf, Copilot, or Gemini) and provides a standalone zero-dependency CLI for token validation.'
    },
    {
      num: 2,
      title: 'Prerequisites & System Compatibility',
      summary: 'Verify your local development environment before installing.',
      detail: 'Requirements:\n• Node.js 18.0.0 or later (only needed for running the CLI `npx pure-saas`)\n• Git version control\n• Any modern web framework (React, Next.js, Svelte, Vue, Nuxt, Astro, or HTML+Tailwind)'
    },
    {
      num: 3,
      title: 'Verified Installation Instructions by Platform',
      summary: 'Install the skill into your specific AI coding assistant.',
      detail: 'Select your coding assistant below to copy the exact verified installation instructions:'
    },
    {
      num: 4,
      title: 'Initialize Your Project Configuration',
      summary: 'Set up your project workspace with a starter design brief and DESIGN.md.',
      detail: 'In your project root terminal, run:'
    },
    {
      num: 5,
      title: 'Confirm Installation & Check Available References',
      summary: 'Verify that your coding agent has discovered the skill and can query references.',
      detail: 'Ask your agent: "Do you have access to Pure SaaS?" or test the CLI reference engine:'
    },
    {
      num: 6,
      title: 'Your First Task: Design Brief & Specification',
      summary: 'Always establish your design tokens before writing application code.',
      detail: 'Ask your coding assistant:\n"/pure-saas design Create a design specification for a minimalist developer cloud console with dark mode default."'
    },
    {
      num: 7,
      title: 'How to Invoke the Skill Correctly',
      summary: 'Distinguish between terminal commands and coding agent instructions.',
      detail: '• Terminal commands (`npx pure-saas ...`) run in your local shell to check tokens or contrast.\n• Slash commands (`/pure-saas ...`) are entered directly into your AI chat prompt.'
    },
    {
      num: 8,
      title: 'Choose the Right Specialist Command',
      summary: 'Select the command tailored to your specific phase of development.',
      detail: '• Need end-to-end design & code? Use `/pure-saas [request]`\n• Need design tokens only? Use `/pure-saas design`\n• Need visual refinement on working UI? Use `/pure-saas polish`\n• Need a read-only audit? Use `/pure-saas review`\n• Need to recreate a URL? Use `/pure-saas reference [URL]`\n• Need mobile responsiveness? Use `/pure-saas responsive`'
    },
    {
      num: 9,
      title: 'What Happens After Invocation',
      summary: 'Understand Pure SaaS\'s autonomous execution flow.',
      detail: '1. The agent inspects your repository context and existing backend APIs.\n2. It consults relevant reference guides from `references/` (e.g. Apple HIG, WCAG 2.2 AA).\n3. It writes or refines `DESIGN.md`.\n4. It implements complete working components bound to semantic tokens.\n5. It produces an honest verification report distinguishing tested, failed, and untested areas.'
    },
    {
      num: 10,
      title: 'Troubleshooting & Next Steps',
      summary: 'Where to find help when encountering errors.',
      detail: '• If contrast fails, run `npx pure-saas contrast DESIGN.md` to identify offending hex values.\n• If arbitrary Tailwind classes leak into code, run `npx pure-saas check DESIGN.md --source src`.\n• Browse the 260+ guides in the Reference Library for component specifications.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      {/* Page Title */}
      <div className="max-w-2xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-surface-muted text-accent border border-border-subtle mb-4">
          <Terminal className="w-3.5 h-3.5" />
          <span>Practical Onboarding Guide</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary leading-[1.1]">
          Get Started with Pure SaaS
        </h1>
        <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed">
          Follow this step-by-step guide to install Pure SaaS into your favorite AI coding assistant and start shipping production-grade interfaces today.
        </p>
      </div>

      {/* 10 Step Journey */}
      <div className="space-y-12">
        {steps.map((s) => (
          <div key={s.num} className="p-6 sm:p-8 rounded-2xl bg-surface-base border border-border-subtle shadow-subtle flex flex-col md:flex-row gap-6">
            <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent font-mono font-bold text-base flex items-center justify-center shrink-0">
              {s.num}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-text-primary">{s.title}</h3>
              <p className="text-xs sm:text-sm text-text-secondary mt-1 font-medium">{s.summary}</p>
              
              <div className="mt-4 text-xs text-text-secondary whitespace-pre-line leading-relaxed">
                {s.detail}
              </div>

              {/* Special interactive selector for Step 3 */}
              {s.num === 3 && (
                <div className="mt-6 space-y-4">
                  <div className="flex flex-wrap gap-2 border-b border-border-subtle pb-3">
                    {[
                      { id: 'claude', name: 'Claude Code' },
                      { id: 'cursor', name: 'Cursor' },
                      { id: 'windsurf', name: 'Windsurf' },
                      { id: 'copilot', name: 'GitHub Copilot' },
                      { id: 'gemini', name: 'Gemini / Antigravity' }
                    ].map(agent => (
                      <button
                        key={agent.id}
                        onClick={() => setSelectedAgent(agent.id as any)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          selectedAgent === agent.id
                            ? 'bg-accent text-white shadow-xs'
                            : 'bg-surface-muted text-text-secondary hover:text-text-primary'
                        }`}
                      >
                        {agent.name}
                      </button>
                    ))}
                  </div>

                  {selectedAgent === 'claude' && (
                    <div className="space-y-2">
                      <p className="text-xs text-text-secondary">Run this command in your terminal to install the skill for Claude Code:</p>
                      <CodeBlock code="claude skill add https://github.com/LMGXENON/pure-saas" language="bash" />
                    </div>
                  )}

                  {selectedAgent === 'cursor' && (
                    <div className="space-y-2">
                      <p className="text-xs text-text-secondary">Add Pure SaaS rules into your repository root <code className="text-accent font-mono">.cursorrules</code> file:</p>
                      <CodeBlock code="curl -sSL https://raw.githubusercontent.com/LMGXENON/pure-saas/main/.cursorrules >> .cursorrules" language="bash" />
                    </div>
                  )}

                  {selectedAgent === 'windsurf' && (
                    <div className="space-y-2">
                      <p className="text-xs text-text-secondary">Copy Pure SaaS instructions into your repository root <code className="text-accent font-mono">.windsurfrules</code>:</p>
                      <CodeBlock code="curl -sSL https://raw.githubusercontent.com/LMGXENON/pure-saas/main/.windsurfrules >> .windsurfrules" language="bash" />
                    </div>
                  )}

                  {selectedAgent === 'copilot' && (
                    <div className="space-y-2">
                      <p className="text-xs text-text-secondary">Add custom instructions to <code className="text-accent font-mono">.github/copilot-instructions.md</code>:</p>
                      <CodeBlock code="mkdir -p .github && curl -sSL https://raw.githubusercontent.com/LMGXENON/pure-saas/main/.github/copilot-instructions.md -o .github/copilot-instructions.md" language="bash" />
                    </div>
                  )}

                  {selectedAgent === 'gemini' && (
                    <div className="space-y-2">
                      <p className="text-xs text-text-secondary">Place the entry point in your workspace <code className="text-accent font-mono">GEMINI.md</code> file:</p>
                      <CodeBlock code="curl -sSL https://raw.githubusercontent.com/LMGXENON/pure-saas/main/GEMINI.md -o GEMINI.md" language="bash" />
                    </div>
                  )}
                </div>
              )}

              {/* Special Code block for Step 4 */}
              {s.num === 4 && (
                <div className="mt-4">
                  <CodeBlock code="npx pure-saas init" language="bash" />
                </div>
              )}

              {/* Special Code block for Step 5 */}
              {s.num === 5 && (
                <div className="mt-4">
                  <CodeBlock code="npx pure-saas ref 'button'" language="bash" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Next Step Banner */}
      <div className="mt-16 p-8 rounded-2xl bg-surface-base border border-border-default text-center flex flex-col items-center">
        <h3 className="text-xl font-bold text-text-primary">Ready to choose your command?</h3>
        <p className="text-xs sm:text-sm text-text-secondary max-w-md mt-2">
          Read our in-depth guide on the universal entry point and the five specialist commands.
        </p>
        <Link
          to="/commands"
          className="mt-6 inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-accent text-white text-xs font-semibold hover:opacity-90 transition-opacity shadow-xs"
        >
          <span>Explore All 6 Commands</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
