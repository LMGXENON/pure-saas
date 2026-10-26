import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { commandsData, CommandSpec } from '../data/commandsData';
import { Terminal, ArrowRight, Check, Copy } from 'lucide-react';

export const CommandsPage: React.FC = () => {
  const [selectedCommand, setSelectedCommand] = useState<CommandSpec>(commandsData[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      {/* Header */}
      <div className="max-w-3xl mb-12 border-b border-border-subtle pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-surface-muted border border-border-subtle text-text-secondary mb-4">
          <Terminal className="w-3.5 h-3.5 text-accent" />
          <span>Slash Commands</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary leading-[1.1]">
          Command Guide
        </h1>
        <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed">
          Pure SaaS operates via one universal command and five specialist commands. Enter these directly into your AI coding assistant (Cursor, Claude Code, Windsurf, Copilot, or Gemini).
        </p>
      </div>

      {/* Compact Quick-Selection Table */}
      <div className="mb-12 overflow-x-auto rounded-2xl border border-border-subtle bg-surface-base shadow-subtle">
        <div className="p-4 sm:p-5 border-b border-border-subtle bg-surface-elevated/30 flex items-center justify-between">
          <h2 className="text-sm font-bold text-text-primary">
            Quick Command Comparison
          </h2>
          <span className="text-xs text-text-muted">Click any command for details</span>
        </div>
        <table className="w-full text-left text-xs">
          <thead className="bg-surface-muted/40 text-text-muted font-semibold border-b border-border-subtle">
            <tr>
              <th className="py-3 px-4">Command</th>
              <th className="py-3 px-4">Purpose</th>
              <th className="py-3 px-4">When to Use</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {commandsData.map((cmd) => {
              const isSelected = selectedCommand.id === cmd.id;
              return (
                <tr
                  key={cmd.id}
                  onClick={() => setSelectedCommand(cmd)}
                  className={`cursor-pointer transition-colors ${
                    isSelected ? 'bg-accent/8 font-medium' : 'hover:bg-surface-hover/50'
                  }`}
                >
                  <td className="py-3.5 px-4 font-bold text-accent whitespace-nowrap">
                    <code>{cmd.name}</code>
                  </td>
                  <td className="py-3.5 px-4 text-text-primary max-w-xs sm:max-w-sm truncate">
                    {cmd.tagline}
                  </td>
                  <td className="py-3.5 px-4 text-text-secondary max-w-xs truncate hidden md:table-cell">
                    {cmd.whenToUse}
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

      {/* Selected Command Details Pane */}
      <div className="p-6 sm:p-8 rounded-2xl bg-surface-base border border-border-subtle shadow-elevated space-y-8">
        {/* Title Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-2.5 py-1 rounded-md bg-accent/10 text-accent font-bold">
                <code>{selectedCommand.syntax}</code>
              </span>
            </div>
            <h3 className="text-2xl font-bold text-text-primary">{selectedCommand.name}</h3>
            <p className="text-sm text-text-secondary mt-1">{selectedCommand.tagline}</p>
          </div>

          <button
            onClick={() => handleCopy(selectedCommand.id, selectedCommand.exampleRequest)}
            className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg bg-surface-muted border border-border-subtle text-text-secondary hover:text-text-primary text-xs font-medium transition-colors shrink-0"
          >
            {copiedId === selectedCommand.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedId === selectedCommand.id ? 'Copied Example' : 'Copy Example Prompt'}</span>
          </button>
        </div>

        {/* Overview & When to Use Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted">Purpose & Scope</h4>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">{selectedCommand.purpose}</p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted">When to Use</h4>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">{selectedCommand.whenToUse}</p>
          </div>
        </div>

        {/* Practical Example */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted">Verified Example Request</h4>
          <div className="p-4 rounded-xl bg-surface-muted/50 border border-border-subtle text-xs sm:text-sm text-text-primary leading-relaxed font-normal">
            <code>{selectedCommand.exampleRequest}</code>
          </div>
        </div>

        {/* Expected Output */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted">Expected Behavior</h4>
          <div className="p-4 rounded-xl bg-surface-elevated/40 border border-border-subtle text-xs text-text-secondary whitespace-pre-wrap leading-relaxed">
            {selectedCommand.expectedOutput}
          </div>
        </div>

        {/* Footer Link to In-Depth Documentation */}
        <div className="pt-4 border-t border-border-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="text-xs text-text-muted">
            Need arguments or edge cases? Read the full article in documentation.
          </span>
          <Link
            to={`/docs?slug=${selectedCommand.id === 'universal' ? 'cmd-pure-saas' : `cmd-${selectedCommand.id}`}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
          >
            <span>Read full {selectedCommand.name} documentation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
