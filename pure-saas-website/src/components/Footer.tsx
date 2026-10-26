import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Github, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border-subtle bg-surface-base transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="col-span-2 space-y-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-accent text-white flex items-center justify-center font-bold text-xs shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-sm tracking-tight text-text-primary">Pure SaaS</span>
            </Link>
            <p className="text-xs text-text-secondary leading-relaxed max-w-sm">
              Universal AI-agent skill and frontend engineering toolkit. Guiding coding assistants to build original, production-grade web interfaces with Apple-level craft and zero AI slop.
            </p>
            <div className="flex items-center gap-3 text-xs text-text-muted pt-1">
              <span>MIT License</span>
              <span>•</span>
              <a 
                href="https://github.com/LMGXENON/pure-saas" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-text-primary flex items-center gap-1 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Repository</span>
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-3">Product</h4>
            <ul className="space-y-2 text-xs text-text-secondary">
              <li><Link to="/features" className="hover:text-text-primary transition-colors">Capabilities & Features</Link></li>
              <li><Link to="/commands" className="hover:text-text-primary transition-colors">6 Specialist Commands</Link></li>
              <li><Link to="/showcase" className="hover:text-text-primary transition-colors">Interactive Showcase</Link></li>
              <li><Link to="/cli" className="hover:text-text-primary transition-colors">CLI Tools</Link></li>
              <li><Link to="/about" className="hover:text-text-primary transition-colors">About Pure SaaS</Link></li>
            </ul>
          </div>

          {/* Documentation Links */}
          <div>
            <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-3">Documentation</h4>
            <ul className="space-y-2 text-xs text-text-secondary">
              <li><Link to="/docs" className="hover:text-text-primary transition-colors">Documentation Portal</Link></li>
              <li><Link to="/docs?slug=getting-started-installation" className="hover:text-text-primary transition-colors">Installation Guide</Link></li>
              <li><Link to="/docs?slug=design-system-tokens" className="hover:text-text-primary transition-colors">3-Tier Tokens</Link></li>
              <li><Link to="/references" className="hover:text-text-primary transition-colors">317 Reference Guides</Link></li>
              <li><Link to="/docs?slug=faq" className="hover:text-text-primary transition-colors">FAQ & Troubleshooting</Link></li>
            </ul>
          </div>

          {/* Supported Agents */}
          <div>
            <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-3">Integrations</h4>
            <ul className="space-y-2 text-xs text-text-secondary">
              <li><Link to="/docs?slug=integrations-claude-code" className="hover:text-text-primary transition-colors">Claude Code</Link></li>
              <li><Link to="/docs?slug=integrations-cursor" className="hover:text-text-primary transition-colors">Cursor IDE</Link></li>
              <li><Link to="/docs?slug=integrations-codex" className="hover:text-text-primary transition-colors">OpenAI Codex / Agents</Link></li>
              <li><Link to="/docs?slug=getting-started-installation" className="hover:text-text-primary transition-colors">Windsurf (Codeium)</Link></li>
              <li><Link to="/docs?slug=getting-started-installation" className="hover:text-text-primary transition-colors">Gemini / Antigravity</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <p>© 2026 Pure SaaS Contributors. Open-source under MIT License.</p>
          <div className="flex items-center gap-6">
            <Link to="/features" className="hover:text-text-primary transition-colors">Features</Link>
            <Link to="/docs" className="hover:text-text-primary transition-colors">Docs</Link>
            <Link to="/commands" className="hover:text-text-primary transition-colors">Commands</Link>
            <Link to="/about" className="hover:text-text-primary transition-colors">License & Contributing</Link>
            <a 
              href="https://github.com/LMGXENON/pure-saas" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-text-primary flex items-center gap-1 transition-colors"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
