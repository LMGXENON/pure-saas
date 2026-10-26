// pure-saas-website/src/components/AgentPromptBanner.tsx
import React, { useState } from 'react';
import { Terminal, Copy, Check } from 'lucide-react';

interface AgentPromptBannerProps {
  promptText: string;
  className?: string;
  description?: string;
}

export const AgentPromptBanner: React.FC<AgentPromptBannerProps> = ({
  promptText,
  className = '',
  description = 'Copy the installation instructions into your AI coding agent.'
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(promptText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        const ta = document.createElement('textarea');
        ta.value = promptText;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Graceful fallback
    }
  };

  return (
    <div
      className={`p-3.5 sm:p-4 rounded-xl bg-surface-base border border-border-subtle shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left transition-colors ${className}`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-surface-muted border border-border-subtle flex items-center justify-center shrink-0 text-accent">
          <Terminal className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <div className="text-xs font-semibold text-text-primary tracking-tight">
            Coding Agent Setup Prompt
          </div>
          <p className="text-[11px] text-text-secondary truncate">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? 'Copied installation prompt' : 'Copy installation prompt'}
        className="h-8 px-3 rounded-lg bg-surface-muted hover:bg-surface-hover border border-border-subtle text-text-primary text-xs font-semibold hover:border-border-default active:scale-98 transition-all inline-flex items-center justify-center gap-1.5 shrink-0"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 text-text-muted" />
            <span>Copy Prompt</span>
          </>
        )}
      </button>
    </div>
  );
};

