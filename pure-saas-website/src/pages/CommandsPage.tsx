import React, { useState } from 'react';
import { commandsData } from '../data/commandsData';
import { Terminal, AlertTriangle, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CommandsPage: React.FC = () => {
  const [activeCommand, setActiveCommand] = useState<string>(commandsData[0].id);

  const selected = commandsData.find(c => c.id === activeCommand) || commandsData[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      {/* Title */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-surface-muted text-accent border border-border-subtle mb-4">
          <Terminal className="w-3.5 h-3.5" />
          <span>Slash Command Suite</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary leading-[1.1]">
          Pure SaaS Commands
        </h1>
        <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed">
          Pure SaaS operates via one intelligent main command and five specialist commands. Every command is optimized for a distinct phase of the product development lifecycle.
        </p>
      </div>

      {/* Decision Matrix Table */}
      <div className="mb-14 p-6 rounded-2xl bg-surface-base border border-border-subtle shadow-subtle overflow-x-auto">
        <h3 className="text-sm font-bold text-text-primary mb-4 flex items-center gap-2">
          <span>Command Decision Matrix</span>
          <span className="text-xs text-text-muted font-normal">— Which command should I run?</span>
        </h3>
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-border-subtle text-text-muted font-semibold">
              <th className="py-2.5 pr-4">Command</th>
              <th className="py-2.5 px-4">Primary Goal</th>
              <th className="py-2.5 px-4">Edits Code?</th>
              <th className="py-2.5 px-4">Modifies DESIGN.md?</th>
              <th className="py-2.5 pl-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle text-text-secondary">
            {commandsData.map(cmd => (
              <tr key={cmd.id} className="hover:bg-surface-hover/50 transition-colors">
                <td className="py-3 pr-4 font-bold text-accent">
                  <code>{cmd.name}</code>
                </td>
                <td className="py-3 px-4">{cmd.tagline}</td>
                <td className="py-3 px-4">{cmd.id === 'review' || cmd.id === 'design' ? 'No' : 'Yes'}</td>
                <td className="py-3 px-4">{cmd.id === 'polish' ? 'Preserves' : 'Yes'}</td>
                <td className="py-3 pl-4 text-right">
                  <button
                    onClick={() => setActiveCommand(cmd.id)}
                    className="text-xs font-semibold text-accent hover:underline"
                  >
                    Inspect Details →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Interactive Command Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Command Nav Sidebar */}
        <div className="lg:col-span-4 space-y-2">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider block px-2 mb-2">
            Select Command
          </span>
          {commandsData.map(cmd => {
            const isActive = cmd.id === activeCommand;
            return (
              <button
                key={cmd.id}
                onClick={() => setActiveCommand(cmd.id)}
                className={`w-full p-4 rounded-xl text-left border transition-all flex flex-col justify-between ${
                  isActive
                    ? 'bg-surface-base border-accent shadow-elevated'
                    : 'bg-surface-elevated/40 border-border-subtle hover:bg-surface-hover hover:border-border-default'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-xs font-bold ${isActive ? 'text-accent' : 'text-text-primary'}`}>
                    <code>{cmd.name}</code>
                  </span>
                  {cmd.id === 'universal' && (
                    <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.2 rounded bg-accent/10 text-accent font-semibold">
                      Universal
                    </span>
                  )}
                </div>
                <p className="text-xs text-text-secondary line-clamp-1 mt-1">{cmd.tagline}</p>
              </button>
            );
          })}
        </div>

        {/* Selected Command Inspection Pane */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-surface-base border border-border-subtle shadow-elevated space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs px-2 py-0.5 rounded bg-accent/10 text-accent font-semibold">
                <code>{selected.syntax}</code>
              </span>
            </div>
            <h2 className="text-2xl font-bold text-text-primary mt-2">{selected.name}</h2>
            <p className="text-sm text-text-secondary mt-1">{selected.tagline}</p>
          </div>

          {/* Purpose & Differences */}
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted">Purpose & Scope</h4>
              <p className="text-xs sm:text-sm text-text-secondary mt-1 leading-relaxed">{selected.purpose}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted">When to Use vs Other Commands</h4>
              <p className="text-xs sm:text-sm text-text-secondary mt-1 leading-relaxed">{selected.difference}</p>
            </div>
          </div>

          {/* Example Request & Output */}
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted">Verified Example Request</h4>
              <div className="mt-2 p-3.5 rounded-xl bg-surface-muted/50 border border-border-subtle text-xs text-text-primary">
                <code>{selected.exampleRequest}</code>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted">Expected Behavior / Artifacts</h4>
              <div className="mt-2 p-4 rounded-xl bg-surface-elevated/40 border border-border-subtle text-xs text-text-secondary whitespace-pre-wrap leading-relaxed">
                {selected.expectedOutput}
              </div>
            </div>
          </div>

          {/* Common Mistakes */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-danger-text mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Common Mistakes to Avoid</span>
            </h4>
            <ul className="space-y-2">
              {selected.commonMistakes.map((mistake, i) => (
                <li key={i} className="text-xs text-text-secondary flex items-start gap-2 bg-red-500/5 p-2.5 rounded-lg border border-red-500/10">
                  <span className="text-danger-text font-bold select-none">✕</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Connected Reference Guides */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-accent" />
              <span>Connected Reference Documents</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selected.references.map((ref, i) => (
                <div key={i} className="p-3 rounded-lg border border-border-subtle bg-surface-elevated/30 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-medium text-text-primary block">{ref.title}</span>
                    <span className="text-[10px] text-text-muted"><code>{ref.path}</code></span>
                  </div>
                  <Link to={`/references?q=${encodeURIComponent(ref.title)}`} className="text-accent hover:underline text-[11px] font-semibold">
                    View →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
