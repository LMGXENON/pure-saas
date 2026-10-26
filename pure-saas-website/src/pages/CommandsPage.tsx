import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { commandsData, CommandSpec } from '../data/commandsData';
import {
  Terminal,
  Check,
  Copy,
  BookOpen,
  AlertTriangle,
  Sparkles
} from 'lucide-react';

export const CommandsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const cmdParam = searchParams.get('cmd');

  const initialCommand = commandsData.find(c => c.id === cmdParam) || commandsData[0];
  const [selectedCommand, setSelectedCommand] = useState<CommandSpec>(initialCommand);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (cmdParam) {
      const match = commandsData.find(c => c.id === cmdParam);
      if (match) setSelectedCommand(match);
    }
  }, [cmdParam]);

  const handleSelectCommand = (cmd: CommandSpec) => {
    setSelectedCommand(cmd);
    setSearchParams({ cmd: cmd.id });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-canvas text-text-primary">
      {/* Header */}
      <section className="pt-12 pb-8 md:pt-16 md:pb-12 border-b border-border-subtle">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-surface-muted border border-border-subtle text-text-secondary">
            <Terminal className="w-3.5 h-3.5 text-accent" />
            <span>Independent Namespaced Slash Commands</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary leading-[1.1]">
            Command Center
          </h1>
          <p className="text-sm sm:text-base text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Pure SaaS operates via six specialized slash commands. Enter these directly into your AI coding assistant (Claude Code, Cursor, Codex, Windsurf, or Gemini).
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Quick Selection Command Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {commandsData.map((cmd) => {
            const isSelected = selectedCommand.id === cmd.id;
            return (
              <button
                key={cmd.id}
                onClick={() => handleSelectCommand(cmd)}
                className={`p-3 rounded-xl text-left border transition-all ${
                  isSelected
                    ? 'bg-accent text-white border-accent shadow-xs scale-102'
                    : 'bg-surface-base border-border-subtle hover:border-border-hover text-text-primary hover:bg-surface-hover/50'
                }`}
              >
                <div className={`font-mono text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-accent'}`}>
                  {cmd.name}
                </div>
                <div className={`text-[11px] truncate mt-1 ${isSelected ? 'text-white/80' : 'text-text-secondary'}`}>
                  {cmd.tagline.split('&')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Command Deep-Dive Panel */}
        <div className="p-6 sm:p-10 rounded-3xl bg-surface-base border border-border-subtle shadow-elevated space-y-8">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2.5 py-1 rounded-md bg-accent/10 text-accent font-bold font-mono">
                  {selectedCommand.syntax}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-surface-muted text-text-muted border border-border-subtle font-mono">
                  {selectedCommand.playbookPath}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
                {selectedCommand.name} — {selectedCommand.tagline}
              </h2>
              <p className="text-xs sm:text-sm text-text-secondary mt-1 max-w-2xl">
                {selectedCommand.role}
              </p>
            </div>

            <button
              onClick={() => handleCopy(selectedCommand.id, selectedCommand.exampleRequest)}
              className="inline-flex items-center gap-2 h-9 px-4 rounded-xl bg-surface-muted border border-border-subtle text-text-secondary hover:text-text-primary text-xs font-semibold transition-colors shrink-0 hover:bg-surface-hover"
            >
              {copiedId === selectedCommand.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedId === selectedCommand.id ? 'Copied Prompt' : 'Copy Example Prompt'}</span>
            </button>
          </div>

          {/* Core Grid: Purpose & Arguments */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xs uppercase font-bold tracking-wider text-text-muted">Purpose & Responsibility</h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {selectedCommand.purpose}
              </p>

              <div className="p-4 rounded-xl bg-surface-muted/40 border border-border-subtle space-y-2">
                <h4 className="text-xs font-bold text-text-primary">When to Use</h4>
                <p className="text-xs text-text-secondary leading-relaxed">{selectedCommand.whenToUse}</p>
              </div>

              <div className="p-4 rounded-xl bg-surface-muted/40 border border-border-subtle space-y-2">
                <h4 className="text-xs font-bold text-text-primary">Key Distinction</h4>
                <p className="text-xs text-text-secondary leading-relaxed">{selectedCommand.difference}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs uppercase font-bold tracking-wider text-text-muted">Inputs & Expected Output</h3>
              
              <div className="space-y-2">
                <span className="text-xs font-semibold text-text-primary">Input Arguments</span>
                <ul className="space-y-1">
                  {selectedCommand.arguments.map((arg, idx) => (
                    <li key={idx} className="text-xs text-text-secondary font-mono bg-surface-muted/40 p-2.5 rounded-lg border border-border-subtle">
                      {arg}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-text-primary">Expected Output Artifacts</span>
                <pre className="text-xs font-mono text-text-secondary bg-surface-muted/40 p-3 rounded-lg border border-border-subtle whitespace-pre-wrap">
                  {selectedCommand.expectedOutput}
                </pre>
              </div>
            </div>
          </div>

          {/* Example Prompt Box */}
          <div className="p-5 rounded-2xl bg-surface-muted/50 border border-border-subtle space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-text-primary flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span>Example Command Invocation</span>
              </span>
              <button
                onClick={() => handleCopy(selectedCommand.id, selectedCommand.exampleRequest)}
                className="text-[11px] font-semibold text-accent hover:underline flex items-center gap-1"
              >
                {copiedId === selectedCommand.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                <span>{copiedId === selectedCommand.id ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="p-3 bg-surface-base rounded-xl border border-border-subtle text-xs font-mono text-text-primary overflow-x-auto">
              {selectedCommand.exampleRequest}
            </div>
          </div>

          {/* Common Mistakes */}
          <div className="space-y-3 pt-2 border-t border-border-subtle">
            <h3 className="text-xs uppercase font-bold tracking-wider text-text-muted flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              <span>Common Mistakes to Avoid</span>
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedCommand.commonMistakes.map((mistake, idx) => (
                <li key={idx} className="text-xs text-text-secondary bg-surface-muted/30 p-3 rounded-xl border border-border-subtle flex items-start gap-2">
                  <span className="text-danger font-bold">✕</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Related Playbooks & Documentation Links */}
          <div className="space-y-3 pt-4 border-t border-border-subtle flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-text-muted">Authoritative Playbook:</span>
              <Link
                to={`/docs?slug=command-${selectedCommand.id === 'puresaas' ? 'puresaas' : 'puresaas-' + selectedCommand.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-muted border border-border-subtle text-xs font-medium text-text-primary hover:bg-surface-hover transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5 text-accent" />
                <span>Read Full Documentation</span>
              </Link>
            </div>

            <Link
              to="/references"
              className="text-xs font-semibold text-accent hover:underline flex items-center gap-1"
            >
              <span>Explore all 317 playbooks →</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
