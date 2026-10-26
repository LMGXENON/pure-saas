import React, { useState } from 'react';
import { ShowcaseItem } from '../data/showcaseData';
import { AlertTriangle, CheckCircle2, SlidersHorizontal } from 'lucide-react';

export const BeforeAfterSlider: React.FC<{ item: ShowcaseItem }> = ({ item }) => {
  const [activeTab, setActiveTab] = useState<'after' | 'before'>('after');
  const [splitMode, setSplitMode] = useState<boolean>(false);

  return (
    <div className="rounded-2xl bg-surface-base border border-border-subtle shadow-elevated overflow-hidden">
      {/* Header Bar */}
      <div className="p-5 border-b border-border-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-surface-elevated/40">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-accent font-mono">
            {item.category}
          </span>
          <h3 className="text-base font-semibold text-text-primary mt-0.5">{item.title}</h3>
          <p className="text-xs text-text-secondary mt-1 max-w-xl">{item.headline}</p>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between sm:justify-end">
          <div className="inline-flex p-1 rounded-xl bg-surface-muted border border-border-subtle">
            <button
              onClick={() => { setActiveTab('after'); setSplitMode(false); }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'after' && !splitMode
                  ? 'bg-surface-base text-accent shadow-xs font-semibold'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Pure SaaS
            </button>
            <button
              onClick={() => { setActiveTab('before'); setSplitMode(false); }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'before' && !splitMode
                  ? 'bg-surface-base text-danger-text shadow-xs font-semibold'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Generic AI Slop
            </button>
          </div>

          <button
            onClick={() => setSplitMode(!splitMode)}
            aria-label="Toggle side-by-side split view"
            title="Toggle side-by-side comparison"
            className={`p-2 rounded-xl border transition-all ${
              splitMode
                ? 'bg-accent/10 border-accent text-accent'
                : 'bg-surface-muted border-border-subtle text-text-secondary hover:text-text-primary'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Task & Invocations */}
      <div className="px-5 py-3 border-b border-border-subtle bg-surface-muted/20 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono">
        <div>
          <span className="text-text-muted">Prompt: </span>
          <span className="text-text-primary">"{item.taskPrompt}"</span>
        </div>
        <div>
          <span className="text-text-muted">Command: </span>
          <span className="text-accent font-semibold">{item.skillCommand}</span>
        </div>
      </div>

      {/* Comparison Body */}
      {splitMode ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border-subtle">
          {/* Slop Column */}
          <div className="p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-danger-text mb-3">
                <AlertTriangle className="w-4 h-4" />
                <span>{item.before.label}</span>
              </div>
              <p className="text-xs text-text-secondary mb-4">{item.before.description}</p>
              <div className="rounded-xl overflow-hidden border border-danger-subtle bg-neutral-950 p-4 font-mono text-[11px] text-neutral-300">
                <pre className="whitespace-pre-wrap leading-relaxed">{item.before.visualCode}</pre>
              </div>
            </div>
            <ul className="mt-4 space-y-1.5 border-t border-border-subtle pt-3">
              {item.before.flaws.map((flaw, i) => (
                <li key={i} className="text-[11px] text-danger-text flex items-start gap-1.5">
                  <span className="select-none">✕</span>
                  <span>{flaw}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pure SaaS Column */}
          <div className="p-5 flex flex-col justify-between bg-accent/5">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-accent mb-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>{item.after.label}</span>
              </div>
              <p className="text-xs text-text-secondary mb-4">{item.after.description}</p>
              <div className="rounded-xl overflow-hidden border border-border-subtle bg-surface-base p-4 font-mono text-[11px] text-text-primary shadow-xs">
                <pre className="whitespace-pre-wrap leading-relaxed">{item.after.visualCode}</pre>
              </div>
            </div>
            <ul className="mt-4 space-y-1.5 border-t border-border-subtle pt-3">
              {item.after.improvements.map((imp, i) => (
                <li key={i} className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-start gap-1.5">
                  <span className="select-none">✓</span>
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : activeTab === 'after' ? (
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-accent">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>{item.after.label}</span>
            </div>
            <span className="text-[11px] text-text-muted">100% Tokenized & Accessible</span>
          </div>
          <div className="rounded-xl overflow-hidden border border-border-subtle bg-surface-elevated/40 p-4 font-mono text-xs text-text-primary">
            <pre className="whitespace-pre-wrap leading-relaxed">{item.after.visualCode}</pre>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {item.after.improvements.map((imp, i) => (
              <div key={i} className="text-xs text-text-secondary flex items-start gap-2 bg-surface-muted/40 p-2.5 rounded-lg border border-border-subtle">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>{imp}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-6 bg-red-500/5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-danger-text">
              <AlertTriangle className="w-4 h-4" />
              <span>{item.before.label}</span>
            </div>
            <span className="text-[11px] text-danger-text">Generic AI Slop Detected</span>
          </div>
          <div className="rounded-xl overflow-hidden border border-red-500/20 bg-neutral-950 p-4 font-mono text-xs text-neutral-300">
            <pre className="whitespace-pre-wrap leading-relaxed">{item.before.visualCode}</pre>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {item.before.flaws.map((flaw, i) => (
              <div key={i} className="text-xs text-danger-text flex items-start gap-2 bg-red-500/10 p-2.5 rounded-lg border border-red-500/20">
                <span className="font-bold select-none">✕</span>
                <span>{flaw}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Verified Metrics Footer */}
      <div className="px-5 py-3 border-t border-border-subtle bg-surface-elevated/30 flex flex-wrap items-center justify-between gap-4 text-xs">
        <span className="font-semibold text-text-secondary">Verified Impact:</span>
        <div className="flex flex-wrap items-center gap-6">
          {item.metrics.map((m, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-text-muted">{m.metric}:</span>
              <span className="line-through text-danger-text text-[11px]">{m.beforeVal}</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400 font-mono text-xs">{m.afterVal}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

