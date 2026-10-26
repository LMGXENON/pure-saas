import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Github,
  BookOpen,
  Scale,
  GitPullRequest,
  ExternalLink,
  Code2
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-canvas text-text-primary">
      {/* Header */}
      <section className="relative pt-16 pb-16 md:pt-24 md:pb-20 border-b border-border-subtle">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-surface-muted border border-border-subtle text-text-secondary">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Open Source Project & Architecture</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-text-primary leading-[1.08]">
            About Pure SaaS
          </h1>
          <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Pure SaaS is an open-source, universal AI-agent skill and frontend engineering toolkit dedicated to eliminating AI slop and setting a hardware-grade craft floor for AI-generated software.
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-16 md:py-20 border-b border-border-subtle">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
              The Mission: Why Pure SaaS Exists
            </h2>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              Large language models are remarkably capable of producing syntactically correct code. However, when asked to build or refactor web interfaces, they default to superficial clichés: repetitive blue-to-purple gradient text, identical three-column feature cards with generic stock icons, glowing circular badges, and unformatted raw numbers.
            </p>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              Pure SaaS changes the dynamic. Instead of prompting an agent to "make it look modern," Pure SaaS equips the agent with an authoritative design specification (DESIGN.md), 317 modular reference playbooks, and six independent specialist workflows that enforce Apple-inspired craft, typographic restraint, and WCAG 2.2 AA accessibility.
            </p>
          </div>

          {/* Core Tenets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-surface-base border border-border-subtle shadow-subtle space-y-3">
              <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center font-bold text-xs">
                01
              </div>
              <h3 className="text-base font-bold text-text-primary">Single Source of Truth</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                All visual decisions originate from DESIGN.md. No raw hex codes, arbitrary spacing numbers, or disconnected configuration files.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-base border border-border-subtle shadow-subtle space-y-3">
              <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center font-bold text-xs">
                02
              </div>
              <h3 className="text-base font-bold text-text-primary">Zero Runtime Overhead</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Pure SaaS is an AI skill and developer CLI. Your production application never bundles external Pure SaaS libraries or telemetry code.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-base border border-border-subtle shadow-subtle space-y-3">
              <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center font-bold text-xs">
                03
              </div>
              <h3 className="text-base font-bold text-text-primary">Uncompromising Honesty</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                If an environment cannot run browser tests, it reports as untested. Pure SaaS never fabricates test IDs or approval passes for unrendered code.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-base border border-border-subtle shadow-subtle space-y-3">
              <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center font-bold text-xs">
                04
              </div>
              <h3 className="text-base font-bold text-text-primary">Preserve Backend Contracts</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Pure SaaS refines and generates frontend experiences while preserving 100% of existing backend APIs, database schemas, and auth routes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Source, License & Contributing */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* License */}
          <div className="p-8 rounded-3xl bg-surface-base border border-border-subtle shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-accent">
                <Scale className="w-4 h-4" />
                <span>Open Source License</span>
              </div>
              <h3 className="text-xl font-bold text-text-primary">MIT License</h3>
              <p className="text-xs text-text-secondary max-w-lg leading-relaxed">
                Pure SaaS is completely free and open source. You can use it in commercial SaaS applications, enterprise systems, client projects, or personal tools with zero royalties or restrictions.
              </p>
            </div>
            <a
              href="https://github.com/LMGXENON/pure-saas/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-9 px-4 rounded-xl bg-surface-muted border border-border-subtle text-xs font-semibold text-text-primary hover:bg-surface-hover transition-colors shrink-0"
            >
              <span>View License</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Contributing Guide */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-accent">
              <GitPullRequest className="w-4 h-4" />
              <span>Community Contributions</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-text-primary">
              Contributing to Pure SaaS
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              We welcome contributions from designers, frontend engineers, and AI developers. Whether you are adding a new reference playbook, documenting a style archetype, improving CLI diagnostics, or refining accessibility matrices:
            </p>

            <div className="space-y-3 p-6 rounded-2xl bg-surface-muted/40 border border-border-subtle">
              <div className="flex items-start gap-3 text-xs sm:text-sm text-text-secondary">
                <span className="font-mono font-bold text-accent">1.</span>
                <span><strong>Fork the Repository:</strong> Clone your fork locally and create a clean feature branch.</span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-text-secondary">
                <span className="font-mono font-bold text-accent">2.</span>
                <span><strong>Implement Changes:</strong> Maintain single-skill architecture; link new reference guides to <code>skill/reference/</code>.</span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-text-secondary">
                <span className="font-mono font-bold text-accent">3.</span>
                <span><strong>Run Test Suites:</strong> Execute <code>npm test</code> and <code>npm run validate-refs</code> to ensure all checks pass with zero errors.</span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-text-secondary">
                <span className="font-mono font-bold text-accent">4.</span>
                <span><strong>Submit Pull Request:</strong> Detail your changes, testing procedures, and verified outputs.</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border-subtle">
            <a
              href="https://github.com/LMGXENON/pure-saas"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-9 px-4 rounded-xl bg-accent text-white font-semibold text-xs hover:opacity-90 transition-all shadow-xs"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Repository</span>
            </a>
            <Link
              to="/docs"
              className="inline-flex items-center gap-2 h-9 px-4 rounded-xl bg-surface-base border border-border-subtle text-xs font-semibold text-text-primary hover:bg-surface-hover transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span>Documentation Portal</span>
            </Link>
            <Link
              to="/references"
              className="inline-flex items-center gap-2 h-9 px-4 rounded-xl bg-surface-base border border-border-subtle text-xs font-semibold text-text-primary hover:bg-surface-hover transition-colors"
            >
              <Code2 className="w-4 h-4" />
              <span>317 Reference Playbooks</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
