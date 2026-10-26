import React, { useState } from 'react';
import { cliData } from '../data/cliData';
import { CodeBlock } from '../components/CodeBlock';
import { Terminal, Search } from 'lucide-react';

export const CliPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = cliData.filter(c =>
    c.command.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      {/* Page Title */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-surface-muted text-accent border border-border-subtle mb-4">
          <Terminal className="w-3.5 h-3.5" />
          <span>Zero-Dependency Developer CLI</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary leading-[1.1]">
          Pure SaaS CLI Manual
        </h1>
        <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed">
          A standalone Node.js tool (zero external runtime dependencies) for validating DESIGN.md, checking color contrast in CI, scanning codebases for arbitrary styles, and querying curated design intelligence.
        </p>

        {/* Global Search Bar */}
        <div className="mt-8 relative max-w-md">
          <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter CLI commands (e.g. contrast, drift, export)..."
            className="w-full h-10 pl-10 pr-4 text-xs rounded-xl bg-surface-base border border-border-default text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>

      {/* CLI Commands Stack */}
      <div className="space-y-12">
        {filtered.map(cmd => (
          <div key={cmd.command} id={cmd.command} className="p-6 sm:p-8 rounded-2xl bg-surface-base border border-border-subtle shadow-subtle space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-subtle pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-accent">pure-saas {cmd.command}</span>
                <h3 className="text-lg font-bold text-text-primary mt-1">{cmd.syntax}</h3>
              </div>
              <span className="text-xs font-mono px-2 py-1 rounded bg-surface-muted text-text-secondary border border-border-subtle self-start sm:self-auto">
                CLI Command
              </span>
            </div>

            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">{cmd.description}</p>

            {/* Options Table */}
            {cmd.options.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">Options & Flags</h4>
                <div className="rounded-xl border border-border-subtle overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse">
                    <tbody className="divide-y divide-border-subtle bg-surface-elevated/20">
                      {cmd.options.map((opt, i) => (
                        <tr key={i} className="hover:bg-surface-hover/30">
                          <td className="p-3 font-mono font-semibold text-accent w-1/3">{opt.flag}</td>
                          <td className="p-3 text-text-secondary">{opt.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Practical Example */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">Usage Example</h4>
              <CodeBlock code={cmd.example} language="bash" />
            </div>

            {/* Expected Output */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">Output Preview</h4>
              <div className="p-4 rounded-xl bg-surface-muted/40 border border-border-subtle font-mono text-[11px] text-text-secondary whitespace-pre-wrap leading-relaxed">
                {cmd.outputPreview}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
