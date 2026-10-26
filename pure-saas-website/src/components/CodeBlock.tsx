import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'bash', filename }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-xl bg-surface-base border border-border-subtle overflow-hidden my-4 shadow-sm">
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border-subtle bg-surface-muted/50 text-xs font-mono text-text-muted">
          <span>{filename}</span>
          <span className="uppercase text-[10px]">{language}</span>
        </div>
      )}
      <div className="relative p-4 overflow-x-auto">
        <pre className="text-xs font-mono text-text-primary leading-relaxed">
          <code>{code}</code>
        </pre>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Copied code" : "Copy code"}
          className="absolute top-3 right-3 p-1.5 rounded-lg bg-surface-elevated/80 border border-border-subtle text-text-muted hover:text-text-primary hover:bg-surface-hover backdrop-blur-xs transition-all shadow-xs"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-500 animate-scale-in" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    </div>
  );
};

