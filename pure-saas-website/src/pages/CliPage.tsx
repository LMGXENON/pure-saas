import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cliData, CliCommand } from '../data/cliData';
import { Terminal, ArrowRight, HelpCircle } from 'lucide-react';
import { CodeBlock } from '../components/CodeBlock';

export const CliPage: React.FC = () => {
  const [selectedCmd, setSelectedCmd] = useState<CliCommand>(cliData[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      {/* 1. Overview */}
      <div className="max-w-3xl mb-12 border-b border-border-subtle pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-surface-muted border border-border-subtle text-text-secondary mb-4">
          <Terminal className="w-3.5 h-3.5 text-accent" />
          <span>Developer Tooling</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary leading-[1.1]">
          CLI Reference
        </h1>
        <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed">
          The Pure SaaS CLI is a zero-dependency Node.js utility for validating design tokens, auditing WCAG contrast ratios, generating design systems, and exporting themes.
        </p>
      </div>

      {/* 2. Prerequisites & Global Usage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="p-6 rounded-2xl bg-surface-base border border-border-subtle space-y-3">
          <h2 className="text-base font-bold text-text-primary">Prerequisites & Execution</h2>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            Requires Node.js 18.0.0 or higher. No global installation is required—run commands directly with <code>npx</code>:
          </p>
          <CodeBlock code="npx pure-saas [command] [options]" language="bash" />
        </div>

        <div className="p-6 rounded-2xl bg-surface-base border border-border-subtle space-y-3">
          <h2 className="text-base font-bold text-text-primary">Global Options</h2>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            Flags supported across all CLI subcommands:
          </p>
          <div className="text-xs text-text-secondary space-y-1.5 pt-1">
            <div><code>--help, -h</code> — Display help menu and syntax</div>
            <div><code>--version, -v</code> — Display installed CLI version</div>
            <div><code>--json</code> — Output machine-readable JSON for CI</div>
          </div>
        </div>
      </div>

      {/* 3. Compact Command List */}
      <div className="mb-12 overflow-x-auto rounded-2xl border border-border-subtle bg-surface-base shadow-subtle">
        <div className="p-4 sm:p-5 border-b border-border-subtle bg-surface-elevated/30 flex items-center justify-between">
          <h2 className="text-sm font-bold text-text-primary">
            Supported CLI Commands
          </h2>
          <span className="text-xs text-text-muted">Click a command to inspect options</span>
        </div>
        <table className="w-full text-left text-xs">
          <thead className="bg-surface-muted/40 text-text-muted font-semibold border-b border-border-subtle">
            <tr>
              <th className="py-3 px-4">Command</th>
              <th className="py-3 px-4">Syntax</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {cliData.map((cmd) => {
              const isSelected = selectedCmd.command === cmd.command;
              return (
                <tr
                  key={cmd.command}
                  onClick={() => setSelectedCmd(cmd)}
                  className={`cursor-pointer transition-colors ${
                    isSelected ? 'bg-accent/8 font-medium' : 'hover:bg-surface-hover/50'
                  }`}
                >
                  <td className="py-3.5 px-4 font-bold text-accent whitespace-nowrap">
                    <code>{cmd.command}</code>
                  </td>
                  <td className="py-3.5 px-4 text-text-primary whitespace-nowrap">
                    <code>{cmd.syntax}</code>
                  </td>
                  <td className="py-3.5 px-4 text-text-secondary max-w-sm truncate hidden md:table-cell">
                    {cmd.description}
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <span className="text-accent font-semibold text-xs">
                      {isSelected ? 'Viewing' : 'Inspect →'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 4. Selected Command Details */}
      <div className="p-6 sm:p-8 rounded-2xl bg-surface-base border border-border-subtle shadow-elevated space-y-6 mb-12">
        <div className="border-b border-border-subtle pb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">
            CLI Subcommand Details
          </span>
          <h3 className="text-2xl font-bold text-text-primary mt-1">
            <code>pure-saas {selectedCmd.command}</code>
          </h3>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">{selectedCmd.description}</p>
        </div>

        {/* Options Table */}
        {selectedCmd.options && selectedCmd.options.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted">Options & Flags</h4>
            <div className="rounded-xl border border-border-subtle overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-muted/40 text-text-muted font-semibold border-b border-border-subtle">
                  <tr>
                    <th className="p-3 w-1/3">Flag</th>
                    <th className="p-3">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {selectedCmd.options.map((opt, i) => (
                    <tr key={i} className="hover:bg-surface-hover/50">
                      <td className="p-3 font-semibold text-accent"><code>{opt.flag}</code></td>
                      <td className="p-3 text-text-secondary">{opt.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Example */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted">Usage Example</h4>
          <CodeBlock code={selectedCmd.example} language="bash" />
        </div>

        {/* Terminal Output Preview */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted">Sample Terminal Output</h4>
          <div className="p-4 rounded-xl bg-surface-muted/50 border border-border-subtle font-mono text-xs text-text-secondary whitespace-pre-wrap leading-relaxed">
            {selectedCmd.outputPreview}
          </div>
        </div>

        {/* Link to Documentation */}
        <div className="pt-4 border-t border-border-subtle flex items-center justify-between text-xs">
          <span className="text-text-muted">Want CI integration instructions?</span>
          <Link to="/docs?slug=cli-validation" className="text-accent font-semibold hover:underline flex items-center gap-1">
            <span>Read CLI validation guide in documentation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 5. Separate Troubleshooting Article Callout */}
      <div className="p-6 rounded-2xl bg-surface-elevated/40 border border-border-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-text-primary">CLI Troubleshooting</h3>
            <p className="text-xs text-text-secondary mt-0.5">
              Encountering node version mismatches, syntax errors, or schema validation failures?
            </p>
          </div>
        </div>
        <Link
          to="/docs?slug=troubleshooting-setup"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface-base border border-border-default text-text-primary text-xs font-medium hover:bg-surface-hover transition-colors shrink-0"
        >
          <span>View Troubleshooting Guide</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
