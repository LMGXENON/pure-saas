import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Layers,
  Wand2,
  CheckCircle2,
  Copy,
  Smartphone,
  Eye,
  Box,
  Terminal,
  ShieldCheck,
  Check,
  ArrowRight,
  Sliders,
  Maximize2
} from 'lucide-react';
import { CodeBlock } from '../components/CodeBlock';

export const FeaturesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'generation' | 'polish' | 'review' | 'clone' | 'responsive' | 'verification' | '3d'>('generation');
  const [copiedFeaturePrompt, setCopiedFeaturePrompt] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFeaturePrompt(id);
    setTimeout(() => setCopiedFeaturePrompt(null), 2000);
  };

  const featureDetails = {
    generation: {
      command: '/puresaas:design',
      title: 'Creative Direction & Interface Generation',
      subtitle: 'Turn vague product briefs into memorable, production-ready interfaces with authentic personality.',
      description: 'Generic AI models default to predictable blue-to-purple gradient text and identical 3-column cards. Pure SaaS replaces templates with deliberate creative direction, matching your domain to over 100 visual archetypes.',
      highlights: [
        'Selectable Style Registry: Choose from Minimal Stark, Swiss International, Corporate Clean, Linear Dark, Retro Tech, and more.',
        'Authentic Copywriting: Zero lorem ipsum. Generates realistic, domain-specific headers, telemetry metrics, and descriptions.',
        '3-Tier Token Specification: Establishes a complete DESIGN.md before generating JSX, ensuring strict light/dark parity.',
        '8-State Component Matrix: Every interactive element supports default, hover, focus, active, disabled, loading, invalid, and valid states.'
      ],
      prompt: '/puresaas:design Create a developer-first observability platform landing page in Swiss International style with bold typography, dark canvas tokens, and terminal previews.',
      codePreview: `// Generated with /puresaas:design (Swiss International Archetype)
export function ObservabilityHero() {
  return (
    <section className="relative px-6 py-20 bg-canvas border-b border-border-subtle">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded text-xs font-mono bg-surface-muted text-text-secondary border border-border-subtle">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span>telemetry.v2 // streaming engine</span>
        </div>
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-text-primary leading-[0.98]">
          Real-time traces.
          <br />
          Zero overhead.
        </h1>
        <p className="max-w-xl text-lg text-text-secondary leading-relaxed">
          High-cardinality distributed tracing compiled to native eBPF probes. Capture every sub-millisecond anomaly with deterministic sampling.
        </p>
      </div>
    </section>
  );
}`
    },
    polish: {
      command: '/puresaas:polish',
      title: 'Visual Craft & Micro-Interactions',
      subtitle: 'Elevate typography tracking, surface lighting, and transitions to Apple and Vercel standards.',
      description: 'Working code often lacks visual finesse. The polish workflow inspects existing components without altering state or business logic, calibrating letter-spacing, tightening padding, and applying physics-based spring curves.',
      highlights: [
        'Display Negative Tracking: Calibrates letter-spacing (-0.02em to -0.03em) on large headlines for compact elegance.',
        'Hairline Borders: Replaces harsh solid lines with translucent layered borders (rgba 8% to 14%).',
        'Tabular Numeric Alignment: Automatically formats figures with font-variant-numeric: tabular-nums.',
        'Spring Physics Curves: Configures cubic-bezier(0.16, 1, 0.3, 1) timing for snappy, natural micro-interactions.'
      ],
      prompt: '/puresaas:polish Polish src/components/DataGrid.tsx with hairline borders, subtle hover highlights, tabular numbers, and smooth 150ms transitions.',
      codePreview: `// Before & After Polish: Hairline Borders & Negative Tracking
<div className="rounded-xl bg-surface-base border border-border-subtle p-5 shadow-subtle hover:border-border-hover transition-colors duration-150">
  <div className="text-xs uppercase tracking-wider font-semibold text-text-muted">
    Active Deployments
  </div>
  <div className="text-3xl font-bold tracking-tight font-mono tabular-nums text-text-primary mt-2">
    1,429
  </div>
</div>`
    },
    review: {
      command: '/puresaas:review',
      title: 'Deterministic 10-Dimension Design Critic',
      subtitle: 'Audit interfaces honestly, score against WCAG 2.2 AA, and prioritize defects from P0 to P3.',
      description: 'Unlike standard AI assistants that flatter your work, Pure SaaS acts as an uncompromising design critic. It audits your UI across 10 objective dimensions and delivers a structured defect ledger with verified code fixes.',
      highlights: [
        '10-Dimension Audit: Evaluates hierarchy, typography, contrast, spacing, elevation, states, responsiveness, motion, semantics, and anti-slop.',
        'Prioritized Triage: Classifies findings from P0 (Blockers) to P3 (Subtle Polish).',
        'WCAG 2.2 AA Conformance: Calculates mathematical relative luminance to guarantee 4.5:1 text contrast.',
        'Slop Detection: Flags purple gradients, green pulsing dots, and repetitive 3-column cards.'
      ],
      prompt: '/puresaas:review Audit src/pages/BillingPage.tsx across all 10 dimensions and triage defects from P0 to P3.',
      codePreview: `=== Pure SaaS 10-Dimension Quality Audit ===
Visual Hierarchy:       1.9 / 2.0 (Clear primary CTA)
Typographic Craft:      1.8 / 2.0 (Tabular figures enforced)
Color & Contrast:       2.0 / 2.0 (100% WCAG 2.2 AA Compliant)
Responsive Ergonomics:  1.9 / 2.0 (Zero 375px overflow)
Slop Elimination:       2.0 / 2.0 (Zero AI template tropes)
Overall Score: 18.8 / 20.0 (Grade: EXCELLENT)`
    },
    clone: {
      command: '/puresaas:clone',
      title: 'Reference Reconstruction & Clean-Room Cloning',
      subtitle: 'Analyze reference websites or screenshots and recreate their design DNA inside your framework.',
      description: 'Extract layout proportions, typographic scale, and spatial grids from reference sites (e.g. Stripe, Linear, Raycast) and recreate them in your project using semantic tokens without copying proprietary brand assets.',
      highlights: [
        'DOM Extraction: Measures exact padding, line-heights, and component bounds where browser tools exist.',
        'Clean-Room Guarantee: Rebuilds layout topology without copying trademarked logos or proprietary assets.',
        'Semantic Mapping: Maps extracted hex codes directly to your DESIGN.md theme tokens.',
        'Multi-Viewport Parity: Reconstructs both desktop and mobile layouts faithfully.'
      ],
      prompt: '/puresaas:clone Recreate the hero section, interactive pricing calculator, and feature grid from https://linear.app using our Tailwind tokens.',
      codePreview: `// Recreated with /puresaas:clone (Clean-Room Semantic Rebuild)
export function LinearPricingMatrix() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-canvas">
      {/* Recreated layout with semantic token bindings */}
    </div>
  );
}`
    },
    responsive: {
      command: '/puresaas:responsive',
      title: 'Multi-Viewport Engineering (375px to 1440px)',
      subtitle: 'Eliminate horizontal overflow, calibrate touch ergonomics, and apply fluid clamp typography.',
      description: 'Mobile responsiveness is not just flex-wrap. Pure SaaS intentionally re-architects layout topology for mobile touch ergonomics (44px hit targets), thumb zones, and graceful desktop-to-mobile table conversions.',
      highlights: [
        'Zero Horizontal Overflow: Eliminates unwanted scrollbars across all screen widths.',
        'Touch Ergonomics: Ensures all interactive targets meet Apple minimum 44×44px standards.',
        'Fluid Typography: Implements css clamp() to scale display text smoothly between mobile and desktop.',
        'Adaptive Topology: Transforms complex data tables into accessible mobile card lists.'
      ],
      prompt: '/puresaas:responsive Audit src/pages/AnalyticsPage.tsx across 375px, 768px, and 1440px. Fix horizontal overflow and convert data tables to mobile card rows.',
      codePreview: `/* Pure SaaS Fluid Typography Formula */
font-size: clamp(2rem, 1.5rem + 2.5vw, 4.5rem);
line-height: 1.05;
letter-spacing: -0.03em;`
    },
    verification: {
      command: 'pure-saas browser screenshot',
      title: 'Automated Browser Screenshot Verification',
      subtitle: 'Capture real desktop, tablet, and mobile screenshots using headless Chrome or Playwright.',
      description: 'Never rely on hallucinated agent claims. Pure SaaS connects directly to your local system Chrome or Playwright CLI to capture real viewport screenshots at 1440px, 768px, and 375px to visually verify every change.',
      highlights: [
        'Real Multi-Viewport Captures: Generates verified PNGs for desktop, tablet, and mobile.',
        'System Chrome Auto-Detection: Runs natively on macOS and Linux without requiring heavy binary downloads.',
        'Honest Status Reporting: Explicitly marks unrendered surfaces as untested rather than faking approval.',
        'Regression Prevention: Visually inspect responsive breakpoints before pushing commits.'
      ],
      prompt: 'pure-saas browser screenshot http://localhost:3000 --out screenshots/',
      codePreview: `=== Capturing Responsive Screenshots for: http://localhost:3000 ===
✓ [desktop] 1440x900 -> screenshots/screenshot-desktop-1440x900.png (100058 bytes)
✓ [tablet]  768x1024 -> screenshots/screenshot-tablet-768x1024.png (99182 bytes)
✓ [mobile]  375x812  -> screenshots/screenshot-mobile-375x812.png (52678 bytes)
Capture complete: 3/3 viewports captured successfully.`
    },
    '3d': {
      command: 'pure-saas 3d scaffold',
      title: 'Procedural 3D Three.js Pipeline (img2threejs)',
      subtitle: 'Generate zero-binary-asset, parametric Three.js TypeScript models for modern SaaS interfaces.',
      description: 'Integrated with the img2threejs pipeline, Pure SaaS generates lightweight, procedural 3D models with Three.js. No multi-megabyte GLTF or FBX files to load over the network — 100% parametric TypeScript code.',
      highlights: [
        'Zero Binary Assets: Zero external 3D files. Generates compact procedural code that compiles with Vite.',
        'PBR Materials: Configures MeshStandardMaterial with calibrated roughness, metalness, and lighting.',
        'Memory Safety: Includes automatic dispose() hooks to prevent WebGL memory leaks during unmounting.',
        'Interactive Controls: Adds smooth pointer tracking, orbital rotation, and responsive canvas scaling.'
      ],
      prompt: 'pure-saas 3d scaffold ServerRack --output src/components/ServerRack3D.tsx',
      codePreview: `// Procedural Three.js Model (Zero 3D Asset Dependencies)
export function createServerRackModel(options = {}) {
  const group = new THREE.Group();
  const rackGeo = new THREE.BoxGeometry(2.0, 4.0, 1.5);
  const rackMat = new THREE.MeshStandardMaterial({
    color: '#121215',
    roughness: 0.4,
    metalness: 0.8
  });
  group.add(new THREE.Mesh(rackGeo, rackMat));
  return group;
}`
    }
  };

  const current = featureDetails[activeTab];

  return (
    <div className="min-h-screen bg-canvas text-text-primary">
      {/* Header */}
      <section className="relative pt-16 pb-16 md:pt-24 md:pb-20 border-b border-border-subtle">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-surface-muted border border-border-subtle text-text-secondary">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Real Capabilities & Engineering Workflows</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-text-primary leading-[1.08] max-w-3xl mx-auto">
            Engineered for genuine craft.
            <br />
            Built to eliminate AI slop.
          </h1>
          <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Pure SaaS equips AI coding agents with an authoritative design system, six independent specialist workflows, and automated verification tools to deliver production-ready software.
          </p>
        </div>
      </section>

      {/* Interactive Feature Deep Dive */}
      <section className="py-16 md:py-24 border-b border-border-subtle">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Navigation Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'generation', label: '1. Creative Direction', icon: Wand2 },
              { id: 'polish', label: '2. Visual Polish', icon: Sparkles },
              { id: 'review', label: '3. Design Review', icon: ShieldCheck },
              { id: 'clone', label: '4. Reference Cloning', icon: Layers },
              { id: 'responsive', label: '5. Responsive Systems', icon: Smartphone },
              { id: 'verification', label: '6. Browser Testing', icon: Eye },
              { id: '3d', label: '7. Procedural 3D', icon: Box }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-accent text-white shadow-xs scale-102'
                      : 'bg-surface-muted/60 text-text-secondary hover:text-text-primary hover:bg-surface-hover border border-border-subtle'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Feature Display Pane */}
          <div className="p-8 sm:p-10 rounded-3xl bg-surface-base border border-border-subtle shadow-elevated grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-accent/10 text-accent font-mono text-xs font-bold">
                <code>{current.command}</code>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
                {current.title}
              </h2>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                {current.description}
              </p>

              <div className="space-y-3 pt-2">
                <h3 className="text-xs uppercase font-bold tracking-wider text-text-muted">Key Capabilities</h3>
                <ul className="space-y-2.5">
                  {current.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-text-secondary">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Copyable Prompt Box */}
              <div className="p-4 rounded-xl bg-surface-muted/50 border border-border-subtle space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">Example Prompt</span>
                  <button
                    onClick={() => handleCopy(activeTab, current.prompt)}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent hover:underline"
                  >
                    {copiedFeaturePrompt === activeTab ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedFeaturePrompt === activeTab ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <p className="text-xs font-mono text-text-primary bg-surface-base p-2.5 rounded-lg border border-border-subtle">
                  {current.prompt}
                </p>
              </div>
            </div>

            {/* Code / Output Preview */}
            <div className="lg:col-span-6">
              <CodeBlock
                code={current.codePreview}
                language={activeTab === 'responsive' ? 'css' : activeTab === 'verification' || activeTab === 'review' ? 'text' : 'typescript'}
                filename={activeTab === 'verification' ? 'terminal-output' : 'implementation.tsx'}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Grid of Supporting Features */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-text-primary">
              Full-Stack Design Rigor
            </h2>
            <p className="text-sm sm:text-base text-text-secondary">
              Pure SaaS works seamlessly across the tools you already use, enforcing visual excellence and accessibility at every layer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-surface-base border border-border-subtle shadow-subtle space-y-3">
              <div className="w-9 h-9 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-text-primary">Style Archetype Dial</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Dial variance (1-10), motion (1-10), and spatial density (1-10) to generate interfaces matching your brand personality.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-base border border-border-subtle shadow-subtle space-y-3">
              <div className="w-9 h-9 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                <Maximize2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-text-primary">Multi-Host Compilation</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Build scripts compile tailored command formats for Claude Code, Cursor IDE, Windsurf, Codex, and Gemini.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-base border border-border-subtle shadow-subtle space-y-3">
              <div className="w-9 h-9 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-text-primary">100% Offline & Private</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Zero external cloud dependencies, zero telemetry, zero tokens transmitted to third-party endpoints.
              </p>
            </div>
          </div>

          {/* CTA Box */}
          <div className="p-8 sm:p-12 rounded-3xl bg-surface-elevated border border-border-subtle text-center space-y-6">
            <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-text-primary">
              Ready to elevate your frontend engineering?
            </h3>
            <p className="text-sm text-text-secondary max-w-xl mx-auto">
              Install Pure SaaS in your repository in under 30 seconds. Works out of the box with your current package setup.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/docs?slug=getting-started-installation"
                className="h-10 px-5 rounded-xl bg-accent text-white font-semibold text-xs hover:opacity-90 transition-all shadow-xs flex items-center gap-2"
              >
                <span>Read Installation Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/commands"
                className="h-10 px-5 rounded-xl bg-surface-base border border-border-subtle text-text-primary font-semibold text-xs hover:bg-surface-hover transition-colors flex items-center gap-2"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Explore 6 Commands</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

