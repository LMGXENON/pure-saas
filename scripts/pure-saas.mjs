#!/usr/bin/env node
/**
 * Pure SaaS CLI - Design System Validator, Token Checker, Exporter, and Review Reporter
 * Zero-dependency Node.js implementation compatible with Node >= 18.
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Lightweight Frontmatter & YAML Parser ---

export function parseFrontmatter(content) {
  if (!content || typeof content !== 'string') {
    return { data: {}, body: '' };
  }

  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    return { data: {}, body: content };
  }

  const yamlBlock = match[1];
  const body = match[2];
  const data = parseSimpleYaml(yamlBlock);
  return { data, body };
}

export function parseSimpleYaml(yamlStr) {
  const result = {};
  const lines = yamlStr.split(/\r?\n/);
  const stack = [{ obj: result, indent: -1 }];

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    // Strip comments only if # is preceded by whitespace or at start, but not inside quotes
    let lineWithoutComment = rawLine;
    const isQuoted = /^["'].*["']$/.test(rawLine.trim());
    if (!isQuoted) {
      // If there is a comment like `key: val # comment`
      // but not `key: "#123456"` or `key: #123456`
      lineWithoutComment = rawLine.replace(/(\s+#.*)$/, '');
    }
    if (!lineWithoutComment.trim()) continue;

    const indent = rawLine.search(/\S/);
    const trimmed = lineWithoutComment.trim();

    // Check if line is list item
    if (trimmed.startsWith('- ')) {
      const val = parseYamlValue(trimmed.slice(2).trim());
      while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
        stack.pop();
      }
      const parent = stack[stack.length - 1].obj;
      const key = stack[stack.length - 1].currentKey;
      if (key && Array.isArray(parent[key])) {
        parent[key].push(val);
      } else if (Array.isArray(parent)) {
        parent.push(val);
      }
      continue;
    }

    const colonIdx = trimmed.indexOf(':');
    if (colonIdx === -1) continue;

    const key = trimmed.slice(0, colonIdx).trim().replace(/^["']|["']$/g, '');
    const rawVal = trimmed.slice(colonIdx + 1).trim();

    while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }
    const currentContainer = stack[stack.length - 1].obj;

    if (rawVal === '') {
      // Determine if next non-empty line starts with '- ' (array) or a key: (object)
      let nextIsArray = false;
      for (let j = i + 1; j < lines.length; j++) {
        const nextTrimmed = lines[j].replace(/#.*$/, '').trim();
        if (nextTrimmed) {
          nextIsArray = nextTrimmed.startsWith('- ');
          break;
        }
      }
      const newContainer = nextIsArray ? [] : {};
      currentContainer[key] = newContainer;
      stack[stack.length - 1].currentKey = key;
      stack.push({ obj: newContainer, indent, currentKey: null });
    } else {
      currentContainer[key] = parseYamlValue(rawVal);
    }
  }

  return result;
}

function parseYamlValue(val) {
  if (val === 'true') return true;
  if (val === 'false') return false;
  if (val === 'null' || val === '~') return null;
  if (/^-?\d+(\.\d+)?$/.test(val)) return Number(val);
  // Remove wrapping quotes
  return val.replace(/^["']|["']$/g, '');
}

// --- Semantic Token Requirements ---

export const REQUIRED_COLOR_ROLES = [
  'color-bg-canvas',
  'color-bg-surface',
  'color-text-primary',
  'color-text-secondary',
  'color-action-primary',
  'color-border-subtle',
  'color-border-focus',
  'color-status-error',
  'color-status-success'
];

export const REQUIRED_TYPOGRAPHY_SCALES = [
  'h1',
  'h2',
  'h3',
  'body',
  'body_small',
  'label'
];

export const REQUIRED_SPACING_TOKENS = [
  'space-1',
  'space-2',
  'space-4',
  'space-6',
  'space-8'
];

// --- Validation Logic ---

export function validateDesignDocument(filePath) {
  const issues = [];
  const warnings = [];

  if (!fs.existsSync(filePath)) {
    return {
      valid: false,
      file: filePath,
      issues: [`File does not exist: ${filePath}`],
      warnings: []
    };
  }

  const raw = fs.readFileSync(filePath, 'utf8');

  // Check for unterminated frontmatter block
  if (raw.trim().startsWith('---') && !raw.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/)) {
    issues.push('Unterminated frontmatter block: file begins with "---" but lacks a closing "---".');
  }

  const { data, body } = parseFrontmatter(raw);

  // If frontmatter is missing or empty, attempt markdown section fallback
  const isBrief = filePath.includes('brief') || (data.product_name && !data.tokens);
  const isReferenceRecord = (filePath.includes('reference') && !filePath.includes('DESIGN')) || (data.source_url && !data.tokens);

  if (isBrief) {
    return validateBriefData(data, body, filePath);
  }
  if (isReferenceRecord) {
    return validateReferenceData(data, body, filePath);
  }

  // Validate DESIGN.md
  if (!data.name && !body.includes('# Design System') && !body.includes('# DESIGN')) {
    issues.push('Missing design system name (required in frontmatter "name" or H1 heading).');
  }

  if (data.status && !['draft', 'in-review', 'approved'].includes(data.status)) {
    issues.push(`Invalid status "${data.status}". Expected "draft", "in-review", or "approved".`);
  }

  // Validate Tokens
  const tokens = data.tokens || {};
  const colors = tokens.colors || {};

  // Check required color tokens
  for (const role of REQUIRED_COLOR_ROLES) {
    if (!colors[role]) {
      // Check if defined in markdown body
      const regex = new RegExp(`\`?${role}\`?:\\s*([#a-zA-Z0-9]+)`, 'i');
      if (!regex.test(body)) {
        issues.push(`Missing required semantic color token: "${role}".`);
      }
    }
  }

  // Check typography tokens
  const typography = tokens.typography || {};
  const fontFamilies = typography.font_families || {};
  if (!fontFamilies.sans && !body.includes('font_families') && !body.includes('Primary Font')) {
    issues.push('Missing primary sans-serif font family definition in typography tokens.');
  }

  const typeScale = typography.scale || {};
  for (const scale of REQUIRED_TYPOGRAPHY_SCALES) {
    if (!typeScale[scale] && !body.includes(`scale.${scale}`) && !body.includes(`**${scale}**`)) {
      warnings.push(`Recommended typography scale "${scale}" not explicitly declared.`);
    }
  }

  // Check Spacing
  const spacing = tokens.spacing || {};
  for (const sp of REQUIRED_SPACING_TOKENS) {
    if (!spacing[sp] && !body.includes(`\`${sp}\``) && !body.includes(sp)) {
      warnings.push(`Recommended spacing token "${sp}" not explicitly declared.`);
    }
  }

  // Check Accessibility declarations
  const a11y = data.accessibility || {};
  if (!a11y.tier && !body.toLowerCase().includes('wcag')) {
    issues.push('Missing accessibility target tier (e.g. "WCAG 2.2 AA").');
  }

  // Anti-slop checks on design document content
  if (body.includes('bg-gradient-to-r from-purple') || body.includes('from-indigo-500 via-purple-500')) {
    warnings.push('Unjustified generic purple/indigo gradient detected in document markup.');
  }
  if (body.includes('🚀') || body.includes('✨') || body.includes('🔥')) {
    warnings.push('Emoji detected in design specification; ensure interface icons use proper SVGs.');
  }

  // Reference specification section verification for reference-based DESIGN.md
  const isReferenceDesign = Boolean(data.source_url || data.reference_overview || /reference\s+overview/i.test(body));
  if (isReferenceDesign) {
    const requiredSections = [
      'Reference overview',
      'Design direction',
      'Page architecture',
      'Layout system',
      'Spacing system',
      'Colour system',
      'Typography',
      'Component inventory',
      'Assets',
      'Motion and interaction',
      'Responsive behaviour',
      'Technical observations',
      'Design tokens',
      'Implementation architecture',
      'Accessibility and states',
      'Implementation checklist'
    ];
    for (const section of requiredSections) {
      const pattern = new RegExp(section.replace(/\s+/g, '[\\s_-]+'), 'i');
      if (!pattern.test(body) && !data[section.toLowerCase().replace(/\s+/g, '_')]) {
        warnings.push(`Reference specification section "${section}" recommended but not explicitly found.`);
      }
    }
  }

  return {
    valid: issues.length === 0,
    file: filePath,
    type: 'DESIGN.md',
    status: data.status || 'unspecified',
    tokensFound: Object.keys(colors).length,
    issues,
    warnings
  };
}

function validateBriefData(data, body, filePath) {
  const issues = [];
  const warnings = [];

  if (!data.product_name && !body.includes('# Design Brief:')) {
    issues.push('Missing "product_name" in design brief.');
  }
  if (!body.includes('Product Purpose') && !body.includes('Purpose')) {
    issues.push('Missing "Product Purpose" section in design brief.');
  }
  if (!body.includes('Target Audience') && !data.target_audience) {
    issues.push('Missing "Target Audience" section in design brief.');
  }
  if (!body.includes('Approved Design Decisions') && !data.approved_decisions) {
    warnings.push('No "Approved Design Decisions" recorded yet.');
  }
  if (!body.includes('Anti-Slop') && !data.anti_slop_exclusions) {
    warnings.push('No explicit anti-slop exclusions declared in brief.');
  }

  return {
    valid: issues.length === 0,
    file: filePath,
    type: 'design-brief.md',
    status: data.status || 'draft',
    issues,
    warnings
  };
}

function validateReferenceData(data, body, filePath) {
  const issues = [];
  const warnings = [];

  if (!data.source_url && !body.includes('source_url:')) {
    issues.push('Missing "source_url" in reference record.');
  }
  if (!data.confidence_levels && !body.includes('confidence_levels:')) {
    issues.push('Missing explicit "confidence_levels" (measured/estimated/unknown) in reference record.');
  }

  return {
    valid: issues.length === 0,
    file: filePath,
    type: 'reference-record',
    status: data.status || 'draft',
    issues,
    warnings
  };
}

// --- Source Code Scan for Tokens & Anti-Slop ---
// Incorporates static analysis patterns adapted from zero-slop-design (MIT License, Copyright (c) 2026 zero-slop-design contributors)

const PALETTE = 'slate|gray|grey|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose';
const PALETTE_CLASS = new RegExp(`(?<![\\w-])(?:[a-z]+:)*(?:bg|text|border(?:-[trblxy])?|ring|ring-offset|outline|from|via|to|fill|stroke|decoration|shadow|accent|caret|divide|placeholder)-(?:${PALETTE})-(?:50|[1-9]00|950)(?:\\/\\d+)?(?![\\w-])`, 'g');
const UTILITY_DIMENSION = /(?<![\w-])(?:[a-z]+:)*(p[xytrbl]?|m[xytrbl]?|gap(?:-[xy])?|space-[xy]|rounded(?:-[a-z]+)?|text|tracking)-\[([^\]\s]+)\]/g;
const COLOR_FUNCTION = /\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch)\(\s*[^)]*\)/g;

export function scanSourceDirectory(srcDir, designTokens = {}) {
  const results = {
    scannedFiles: 0,
    rawColorViolations: [],
    paletteClassViolations: [],
    arbitraryDimensionViolations: [],
    unresolvedTokenRefs: [],
    colorFunctionViolations: [],
    focusSuppressionWarnings: [],
    exceptionReasonViolations: [],
    antiSlopWarnings: []
  };

  if (!fs.existsSync(srcDir)) {
    return results;
  }

  const knownColorValues = new Set(
    Object.values(designTokens.colors || {}).map(v => String(v).toLowerCase().trim())
  );
  const knownTokenNames = new Set([
    ...Object.keys(designTokens.colors || {}),
    ...Object.keys(designTokens.spacing || {}),
    ...Object.keys(designTokens.radii || {}).map(r => `radius-${r}`),
    ...Object.keys(designTokens.typography?.font_families || {}).map(f => `font-${f}`),
    ...Object.keys(designTokens.typography?.scale || {}).map(s => `font-size-${s}`),
    ...Object.keys(designTokens.layout || {}).map(l => `layout-${l}`)
  ]);

  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist') {
        continue;
      }
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (/\.(jsx?|tsx?|html|css|vue|svelte|astro|mdx)$/i.test(entry.name)) {
        results.scannedFiles++;
        inspectFile(fullPath, knownColorValues, knownTokenNames, results);
      }
    }
  }

  walk(srcDir);
  return results;
}

function inspectFile(filePath, knownColorValues, knownTokenNames, results) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);
  let ignoreNextLine = false;

  for (let idx = 0; idx < lines.length; idx++) {
    const rawLine = lines[idx];
    const lineNum = idx + 1;

    if (ignoreNextLine) {
      ignoreNextLine = false;
      continue;
    }

    // Check for inline exception bypass (e.g. /* pure-saas-ignore rule: reason */)
    const hasIgnore = rawLine.includes('pure-saas-ignore') || rawLine.includes('design-check-ignore') || rawLine.includes('EXC-');
    if (hasIgnore) {
      if (rawLine.includes('pure-saas-ignore') || rawLine.includes('design-check-ignore')) {
        const match = rawLine.match(/(?:pure-saas-ignore|design-check-ignore)(?:-next-line)?(?:\s+([a-z-]+))?(?:\s*:\s*(\S.*?))?\s*(?:\*\/|-->|\}|$)/);
        if (match) {
          const reason = match[2];
          if (!reason || reason.trim() === '') {
            results.exceptionReasonViolations.push({
              file: filePath,
              line: lineNum,
              message: 'Exception bypass comment has no explanatory reason.'
            });
          }
        }
      }
      const trimmed = rawLine.trim();
      if (trimmed.startsWith('/*') || trimmed.startsWith('//') || trimmed.includes('-next-line')) {
        ignoreNextLine = true;
      }
      continue;
    }

    // Ignore pure comment lines (//, /* ... */, or block comment stars *)
    const trimmed = rawLine.trim();
    if (trimmed.startsWith('//') || (trimmed.startsWith('/*') && trimmed.endsWith('*/')) || trimmed.startsWith('*')) {
      continue;
    }

    // Strip inline comments before inspecting code to prevent false positives in comments
    const line = rawLine.replace(/\/\*.*?\*\//g, '').replace(/\/\/.*$/, '');
    if (!line.trim()) continue;

    // Check raw hex colors in styling
    const hexMatches = line.match(/#[0-9a-fA-F]{3,8}\b/g);
    if (hexMatches) {
      for (const hex of hexMatches) {
        const normalized = hex.toLowerCase();
        if (knownColorValues.size > 0 && !knownColorValues.has(normalized)) {
          results.rawColorViolations.push({
            file: filePath,
            line: lineNum,
            value: hex,
            message: `Raw hex color ${hex} not mapped to approved DESIGN.md semantic token.`
          });
        }
      }
    }

    // Check utility palette classes bypassing design tokens (e.g. bg-blue-500, text-slate-700)
    const paletteMatches = line.match(PALETTE_CLASS);
    if (paletteMatches) {
      for (const cls of paletteMatches) {
        results.paletteClassViolations.push({
          file: filePath,
          line: lineNum,
          value: cls,
          message: `Utility palette class "${cls}" bypasses semantic design tokens. Map to semantic role instead.`
        });
      }
    }

    // Check arbitrary bracket dimensions (e.g. p-[17px], m-[11px])
    const dimMatches = line.match(UTILITY_DIMENSION);
    if (dimMatches) {
      for (const dim of dimMatches) {
        results.arbitraryDimensionViolations.push({
          file: filePath,
          line: lineNum,
          value: dim,
          message: `Arbitrary bracket utility "${dim}" bypasses spacing tokens.`
        });
      }
    }

    // Check unresolved var(--color-*) or var(--space-*)
    const varMatches = line.match(/var\(--([a-zA-Z0-9_-]+)\)/g);
    if (varMatches) {
      for (const v of varMatches) {
        const tokenName = v.slice(6, -1);
        if (knownTokenNames.size > 0 && !knownTokenNames.has(tokenName)) {
          results.unresolvedTokenRefs.push({
            file: filePath,
            line: lineNum,
            token: tokenName,
            message: `CSS variable var(--${tokenName}) is not defined in DESIGN.md tokens.`
          });
        }
      }
    }

    // Check color functions (rgb, rgba, hsl, hsla, oklch) outside of CSS custom property definitions
    if (!line.includes('--') && !line.includes('var(')) {
      const colorFuncMatches = line.match(COLOR_FUNCTION);
      if (colorFuncMatches) {
        for (const func of colorFuncMatches) {
          results.colorFunctionViolations.push({
            file: filePath,
            line: lineNum,
            value: func,
            message: `Color function "${func}" in source styling bypasses semantic design tokens.`
          });
        }
      }
    }

    // Check focus outline suppression without focus-visible replacement
    if (/(?:outline-none|focus:outline-none|outline:\s*0|outline:\s*none)/i.test(line) && !line.includes('focus-visible')) {
      results.focusSuppressionWarnings.push({
        file: filePath,
        line: lineNum,
        pattern: 'focus-suppression',
        message: 'Focus outline suppressed without visible focus replacement (WCAG 2.2 SC 2.4.7 violation).'
      });
    }

    // Check Anti-Slop patterns
    if (/bg-gradient-to-(r|br|bl|t)\s+from-(purple|indigo|pink)-/i.test(line)) {
      results.antiSlopWarnings.push({
        file: filePath,
        line: lineNum,
        pattern: 'generic-gradient-mesh',
        message: 'Generic purple/indigo hero gradient detected without documented brand justification.'
      });
    }

    if (/bg-clip-text\s+text-transparent/i.test(line)) {
      results.antiSlopWarnings.push({
        file: filePath,
        line: lineNum,
        pattern: 'gradient-text-slop',
        message: 'Transparent gradient text detected; verify text contrast against background (WCAG 1.4.3).'
      });
    }

    if (/backdrop-blur-(md|lg|xl)\s+bg-(white|black)\/(10|20)/i.test(line)) {
      results.antiSlopWarnings.push({
        file: filePath,
        line: lineNum,
        pattern: 'glassmorphism-overuse',
        message: 'Glassmorphism backdrop-blur detected. Verify high-contrast readability.'
      });
    }

    if (/[🚀✨🔥🎉💡]/.test(line) && (line.includes('<h') || line.includes('className') || line.includes('button'))) {
      results.antiSlopWarnings.push({
        file: filePath,
        line: lineNum,
        pattern: 'emoji-icon-replacement',
        message: 'Emoji used in interface markup; replace with consistent SVG iconography.'
      });
    }
  }
}

// --- Token Exporter ---

export function exportTokens(designData, format = 'css') {
  const tokens = designData.tokens || {};
  const colors = tokens.colors || {};
  const spacing = tokens.spacing || {};
  const typography = tokens.typography || {};
  const radii = tokens.radii || {};

  if (format === 'css') {
    let out = ':root {\n';
    out += '  /* Semantic Colors */\n';
    for (const [k, v] of Object.entries(colors)) {
      out += `  --${k}: ${v};\n`;
    }
    out += '\n  /* Spacing */\n';
    for (const [k, v] of Object.entries(spacing)) {
      out += `  --${k}: ${v};\n`;
    }
    out += '\n  /* Border Radii */\n';
    for (const [k, v] of Object.entries(radii)) {
      out += `  --radius-${k}: ${v};\n`;
    }
    if (typography.font_families) {
      out += '\n  /* Typography: Families */\n';
      for (const [k, v] of Object.entries(typography.font_families)) {
        out += `  --font-${k}: ${v};\n`;
      }
    }
    if (typography.scale) {
      out += '\n  /* Typography: Scale */\n';
      for (const [k, v] of Object.entries(typography.scale)) {
        out += `  --font-size-${k}: ${v};\n`;
      }
    }
    if (tokens.layout) {
      out += '\n  /* Layout */\n';
      for (const [k, v] of Object.entries(tokens.layout)) {
        out += `  --layout-${k}: ${v};\n`;
      }
    }
    out += '}\n';
    return out;
  }

  if (format === 'tailwind') {
    const tailwindColors = {};
    for (const [k, v] of Object.entries(colors)) {
      tailwindColors[k] = `var(--${k}, ${v})`;
    }
    const config = {
      theme: {
        extend: {
          colors: tailwindColors,
          spacing: spacing,
          borderRadius: radii
        }
      }
    };
    return `/** @type {import('tailwindcss').Config} */\nmodule.exports = ${JSON.stringify(config, null, 2)};\n`;
  }

  if (format === 'json') {
    return JSON.stringify(tokens, null, 2);
  }

  throw new Error(`Unsupported export format: ${format}. Use 'css', 'tailwind', or 'json'.`);
}

// --- Design Style Intelligence Engine ---

export function queryDesignIntelligence(options = {}) {
  const intelPath = path.resolve(__dirname, '../references/design-intelligence.json');
  const catalogPath = path.resolve(__dirname, '../references/design-styles-catalog.json');

  let intel = null;
  if (fs.existsSync(intelPath)) {
    try {
      intel = JSON.parse(fs.readFileSync(intelPath, 'utf8'));
    } catch {
      intel = null;
    }
  }

  const catalog = fs.existsSync(catalogPath)
    ? JSON.parse(fs.readFileSync(catalogPath, 'utf8'))
    : { styles: [], product_archetypes: {}, stack_guidance: {} };

  const catalogStyles = catalog.styles || [];
  const intelStyles = (intel && intel.styles) || [];
  const catalogIds = new Set(catalogStyles.map(s => s.id));
  const allStyles = [...catalogStyles, ...intelStyles.filter(s => !catalogIds.has(s.id))];
  const productsObj = catalog.product_archetypes || {};
  const stacksObj = catalog.stack_guidance || {};

  const query = (options.query || '').toLowerCase().trim();
  const domain = (options.domain || '').toLowerCase().trim();
  const productFilter = (options.product || '').toLowerCase().trim();
  const stackFilter = (options.stack || '').toLowerCase().trim();

  let matchedStyles = allStyles;
  if (query && query !== '--json' && (!domain || domain === 'style' || domain === 'styles')) {
    matchedStyles = allStyles.filter(s =>
      s.name.toLowerCase().includes(query) ||
      (s.category && s.category.toLowerCase().includes(query)) ||
      (s.keywords && (Array.isArray(s.keywords) ? s.keywords.some(k => k.toLowerCase().includes(query)) : String(s.keywords).toLowerCase().includes(query))) ||
      (s.best_for && (Array.isArray(s.best_for) ? s.best_for.some(b => b.toLowerCase().includes(query)) : String(s.best_for).toLowerCase().includes(query)))
    );
  }

  let matchedProduct = null;
  const pTarget = productFilter || (domain === 'product' ? query : '');
  if (pTarget) {
    const key = Object.keys(productsObj).find(k =>
      k.toLowerCase().includes(pTarget) ||
      productsObj[k].name.toLowerCase().includes(pTarget) ||
      (productsObj[k].keywords && productsObj[k].keywords.some(kw => kw.toLowerCase().includes(pTarget)))
    );
    if (key) {
      matchedProduct = { id: key, ...productsObj[key] };
    } else if (intel && intel.products) {
      const p = intel.products.find(pr =>
        pr.id.toLowerCase().includes(pTarget) ||
        pr.name.toLowerCase().includes(pTarget) ||
        (pr.keywords && pr.keywords.some(kw => kw.toLowerCase().includes(pTarget)))
      );
      if (p) matchedProduct = { id: p.id, ...p };
    }
  } else if (query && query !== '--json') {
    const key = Object.keys(productsObj).find(k =>
      k.toLowerCase().includes(query) ||
      productsObj[k].name.toLowerCase().includes(query) ||
      (productsObj[k].keywords && productsObj[k].keywords.some(kw => kw.toLowerCase().includes(query)))
    );
    if (key) matchedProduct = { id: key, ...productsObj[key] };
  }

  let matchedStack = null;
  const sTarget = stackFilter || (domain === 'stack' ? query : '');
  if (sTarget) {
    const key = Object.keys(stacksObj).find(k =>
      k.toLowerCase().includes(sTarget) ||
      (stacksObj[k].name && stacksObj[k].name.toLowerCase().includes(sTarget))
    );
    if (key) {
      matchedStack = { id: key, ...stacksObj[key] };
    } else if (intel && intel.stacks && intel.stacks[sTarget]) {
      matchedStack = { id: sTarget, name: sTarget, rules: intel.stacks[sTarget] };
    }
  } else if (query && query !== '--json') {
    const key = Object.keys(stacksObj).find(k =>
      k.toLowerCase().includes(query) ||
      (stacksObj[k].name && stacksObj[k].name.toLowerCase().includes(query))
    );
    if (key) matchedStack = { id: key, ...stacksObj[key] };
  }

  // Additional design intelligence domains from UI UX Pro Max
  const matchedTypography = (intel && intel.typography)
    ? (query ? intel.typography.filter(t => t.name.toLowerCase().includes(query) || t.heading_font.toLowerCase().includes(query) || t.mood.toLowerCase().includes(query)) : intel.typography)
    : [];
  const matchedCharts = (intel && intel.charts)
    ? (query ? intel.charts.filter(c => c.data_type.toLowerCase().includes(query) || c.best_chart_type.toLowerCase().includes(query)) : intel.charts)
    : [];
  const matchedMotion = (intel && intel.motion)
    ? (query ? intel.motion.filter(m => m.category.toLowerCase().includes(query) || m.intensity_tier.toLowerCase().includes(query)) : intel.motion)
    : [];

  return {
    styles: matchedStyles,
    product: matchedProduct,
    stack: matchedStack,
    typography: matchedTypography,
    charts: matchedCharts,
    motion: matchedMotion,
    allProducts: productsObj,
    allStacks: stacksObj,
    datasetSummary: intel ? intel.summary : { styles_count: catalog.styles?.length || 0 }
  };
}

// --- Command Dispatcher & CLI ---

export async function runCli(args = process.argv.slice(2)) {
  const command = args[0] || '--help';

  if (command === '--help' || command === '-h' || command === 'help') {
    printHelp();
    return 0;
  }

  if (command === '--version' || command === '-v') {
    console.log('pure-saas v1.0.0');
    return 0;
  }

  if (command === 'validate' || command === 'validate-design') {
    const targetFile = args[1] && !args[1].startsWith('--') ? args[1] : 'DESIGN.md';
    const jsonOutput = args.includes('--json');
    const result = validateDesignDocument(path.resolve(process.cwd(), targetFile));

    if (jsonOutput) {
      console.log(JSON.stringify(result, null, 2));
    } else {
      printValidationResult(result);
    }
    return result.valid ? 0 : 1;
  }

  if (command === 'check-tokens' || command === 'tokens' || command === 'check-code') {
    const designFile = path.resolve(process.cwd(), args[1] && !args[1].startsWith('--') ? args[1] : 'DESIGN.md');
    const jsonOutput = args.includes('--json');
    const srcIndex = args.indexOf('--source');
    const srcDir = srcIndex !== -1 ? path.resolve(process.cwd(), args[srcIndex + 1]) : null;

    const validation = validateDesignDocument(designFile);
    let scanResults = null;

    if (srcDir) {
      const raw = fs.existsSync(designFile) ? fs.readFileSync(designFile, 'utf8') : '';
      const { data } = parseFrontmatter(raw);
      scanResults = scanSourceDirectory(srcDir, data.tokens || {});
    }

    const payload = {
      file: designFile,
      validation,
      scan: scanResults
    };

    if (jsonOutput) {
      console.log(JSON.stringify(payload, null, 2));
    } else {
      printValidationResult(validation);
      if (scanResults) {
        console.log(`\nSource scan: ${scanResults.scannedFiles} files checked in ${srcDir}`);
        console.log(`Raw color violations: ${scanResults.rawColorViolations.length}`);
        console.log(`Unresolved token refs: ${scanResults.unresolvedTokenRefs.length}`);
        console.log(`Anti-slop warnings: ${scanResults.antiSlopWarnings.length}`);

        for (const viol of scanResults.rawColorViolations.slice(0, 5)) {
          console.log(`  [!] ${path.relative(process.cwd(), viol.file)}:${viol.line} -> ${viol.message}`);
        }
        for (const warn of scanResults.antiSlopWarnings.slice(0, 5)) {
          console.log(`  [*] Anti-Slop: ${path.relative(process.cwd(), warn.file)}:${warn.line} -> ${warn.message}`);
        }
      }
    }

    const hasFailure = !validation.valid || (scanResults && scanResults.rawColorViolations.length > 0);
    return hasFailure ? 1 : 0;
  }

  if (command === 'export-tokens') {
    const designFile = path.resolve(process.cwd(), args[1] && !args[1].startsWith('--') ? args[1] : 'DESIGN.md');
    const fmtIndex = args.indexOf('--format');
    const format = fmtIndex !== -1 ? args[fmtIndex + 1] : 'css';
    const outIndex = args.indexOf('--out');
    const outFile = outIndex !== -1 ? path.resolve(process.cwd(), args[outIndex + 1]) : null;

    if (!fs.existsSync(designFile)) {
      console.error(`Error: Design file not found at ${designFile}`);
      return 1;
    }

    const raw = fs.readFileSync(designFile, 'utf8');
    const { data } = parseFrontmatter(raw);
    const output = exportTokens(data, format);

    if (outFile) {
      fs.mkdirSync(path.dirname(outFile), { recursive: true });
      fs.writeFileSync(outFile, output, 'utf8');
      console.log(`Tokens successfully exported to ${outFile} (${format})`);
    } else {
      console.log(output);
    }
    return 0;
  }

  if (command === 'review-report' || command === 'audit' || command === 'verify') {
    const designFile = path.resolve(process.cwd(), 'DESIGN.md');
    const briefFile = path.resolve(process.cwd(), 'design-brief.md');
    const jsonOutput = args.includes('--json');
    const srcIndex = args.indexOf('--source');
    const srcDir = srcIndex !== -1 ? path.resolve(process.cwd(), args[srcIndex + 1]) : (fs.existsSync('src') ? 'src' : null);

    const designVal = validateDesignDocument(designFile);
    const briefVal = fs.existsSync(briefFile) ? validateDesignDocument(briefFile) : null;
    let scanResults = null;

    if (srcDir && fs.existsSync(srcDir)) {
      const raw = fs.existsSync(designFile) ? fs.readFileSync(designFile, 'utf8') : '';
      const { data } = parseFrontmatter(raw);
      scanResults = scanSourceDirectory(srcDir, data.tokens || {});
    }

    const report = {
      timestamp: new Date().toISOString(),
      verified_checks: [
        'DESIGN.md schema & structural integrity',
        'Required semantic color token completeness',
        'Typography hierarchy scale check',
        'Spacing token scale consistency',
        'Static anti-slop pattern detection'
      ],
      failed_checks: designVal.issues,
      warnings: designVal.warnings.concat(scanResults ? scanResults.antiSlopWarnings.map(w => w.message) : []),
      untested_areas: [
        'Visual rendering across 375px mobile and 1440px desktop viewports (requires live browser session)',
        'Full keyboard navigation trap and screen-reader accessibility announcements (requires manual or assistive tech audit)',
        'Color contrast on dynamic alpha surfaces and composite backgrounds'
      ],
      summary: {
        design_valid: designVal.valid,
        brief_present: briefVal !== null,
        scanned_files: scanResults ? scanResults.scannedFiles : 0,
        violations_count: (scanResults ? scanResults.rawColorViolations.length : 0) + designVal.issues.length
      }
    };

    if (jsonOutput) {
      console.log(JSON.stringify(report, null, 2));
    } else {
      console.log('=== Pure SaaS Verification & Quality Report ===\n');
      console.log(`Timestamp: ${report.timestamp}`);
      console.log(`Overall Design Valid: ${report.summary.design_valid ? 'PASS' : 'FAIL'}`);
      console.log('\n[+] Verified Checks:');
      for (const c of report.verified_checks) console.log(`  ✓ ${c}`);

      if (report.failed_checks.length > 0) {
        console.log('\n[-] Failed Checks:');
        for (const f of report.failed_checks) console.log(`  ✗ ${f}`);
      }

      if (report.warnings.length > 0) {
        console.log('\n[!] Warnings & Anti-Slop Review Triggers:');
        for (const w of report.warnings) console.log(`  ! ${w}`);
      }

      console.log('\n[?] Untested Areas (Must Not Be Claimed Conforming):');
      for (const u of report.untested_areas) console.log(`  ? ${u}`);
    }

    return report.summary.violations_count === 0 ? 0 : 1;
  }

  if (command === 'style' || command === 'styles' || command === 'query') {
    const prodIdx = args.indexOf('--product');
    const productArg = prodIdx !== -1 ? args[prodIdx + 1] : '';
    const stackIdx = args.indexOf('--stack');
    const stackArg = stackIdx !== -1 ? args[stackIdx + 1] : '';
    let domainArg = '';
    let queryArg = '';

    if (command === 'query' && args[1] && !args[1].startsWith('--')) {
      domainArg = args[1];
      queryArg = args.slice(2).filter(a => !a.startsWith('--') && a !== productArg && a !== stackArg).join(' ');
    } else {
      queryArg = args.slice(1).filter(a => !a.startsWith('--') && a !== productArg && a !== stackArg).join(' ');
    }
    const jsonOutput = args.includes('--json');

    const result = queryDesignIntelligence({
      query: queryArg,
      domain: domainArg,
      product: productArg,
      stack: stackArg
    });

    if (jsonOutput) {
      console.log(JSON.stringify(result, null, 2));
      return 0;
    }

    if (result.product) {
      console.log(`=== Product Archetype: ${result.product.name} ===`);
      const kw = Array.isArray(result.product.keywords) ? result.product.keywords.join(', ') : (result.product.keywords || '');
      if (kw) console.log(`  Keywords: ${kw}`);
      if (result.product.primary_style) console.log(`  Primary Style: ${result.product.primary_style}`);
      const secStyle = result.product.secondary_style || result.product.secondary_styles;
      if (secStyle) console.log(`  Secondary Style: ${secStyle}`);
      if (result.product.landing_pattern) console.log(`  Landing Page Pattern: ${result.product.landing_pattern}`);
      if (result.product.dashboard_style) console.log(`  Dashboard Style: ${result.product.dashboard_style}`);
      if (result.product.color_focus) console.log(`  Color Focus: ${result.product.color_focus}`);
      if (result.product.key_considerations) console.log(`  Key Considerations: ${result.product.key_considerations}\n`);
    }

    if (result.stack) {
      console.log(`=== Stack Guidance: ${result.stack.name} ===`);
      const patterns = Array.isArray(result.stack.patterns)
        ? result.stack.patterns
        : (Array.isArray(result.stack.rules) ? result.stack.rules : (result.stack.patterns || result.stack.rules ? [result.stack.patterns || result.stack.rules] : []));
      for (const p of patterns) {
        console.log(`  • ${p}`);
      }
      console.log('');
    }

    console.log(`=== Pure SaaS Design Style Intelligence (${result.styles.length} matching styles) ===\n`);
    for (const style of result.styles) {
      console.log(`[${style.name}] (${style.category || 'General'})`);
      const kw = Array.isArray(style.keywords) ? style.keywords.join(', ') : (style.keywords || '');
      if (kw) console.log(`  Keywords: ${kw}`);
      const best = Array.isArray(style.best_for) ? style.best_for.join(', ') : (style.best_for || '');
      if (best) console.log(`  Best For: ${best}`);
      const avoid = Array.isArray(style.do_not_use_for)
        ? style.do_not_use_for.join(', ')
        : (Array.isArray(style.avoid_for) ? style.avoid_for.join(', ') : (style.do_not_use_for || style.avoid_for || ''));
      if (avoid) console.log(`  Avoid For: ${avoid}`);
      if (style.typography) {
        if (typeof style.typography === 'object') {
          console.log(`  Typography: ${style.typography.heading_family || ''} (headings) | ${style.typography.body_family || ''} (body)`);
        } else {
          console.log(`  Typography: ${style.typography}`);
        }
      }
      if (style.colors) {
        console.log(`  Palette: Canvas ${style.colors.canvas || ''} | Surface ${style.colors.surface || ''} | Accent ${style.colors.accent || ''}`);
      } else if (style.primary_colors || style.accent_colors) {
        console.log(`  Palette: Primary ${style.primary_colors || ''} | Accent ${style.accent_colors || ''}`);
      }
      if (style.anti_slop_notes) console.log(`  Anti-Slop: ${style.anti_slop_notes}\n`);
      else console.log('');
    }
    return 0;
  }

  if (command === 'init') {
    const templateName = args[1] || 'developer';
    const briefDest = path.resolve(process.cwd(), 'design-brief.md');
    const designDest = path.resolve(process.cwd(), 'DESIGN.md');

    if (fs.existsSync(designDest)) {
      console.warn(`Warning: DESIGN.md already exists at ${designDest}. Skipping overwrite.`);
      return 1;
    }

    const tplBriefPath = path.resolve(__dirname, '../references/templates/design-brief.md');
    const tplDesignPath = path.resolve(__dirname, '../references/templates/DESIGN.md');

    if (fs.existsSync(tplBriefPath)) {
      fs.copyFileSync(tplBriefPath, briefDest);
    } else {
      fs.writeFileSync(briefDest, getStarterBrief(), 'utf8');
    }

    if (fs.existsSync(tplDesignPath)) {
      fs.copyFileSync(tplDesignPath, designDest);
    } else {
      fs.writeFileSync(designDest, getStarterDesign(), 'utf8');
    }

    console.log(`Initialized Pure SaaS project with starter templates:`);
    console.log(`  -> ${path.relative(process.cwd(), briefDest)}`);
    console.log(`  -> ${path.relative(process.cwd(), designDest)}`);

    if (args.includes('--reference') || args.includes('-r')) {
      const refDest = path.resolve(process.cwd(), 'reference-record.md');
      const tplRefPath = path.resolve(__dirname, '../references/templates/reference-record.md');
      if (fs.existsSync(tplRefPath)) {
        fs.copyFileSync(tplRefPath, refDest);
        console.log(`  -> ${path.relative(process.cwd(), refDest)}`);
      } else {
        fs.writeFileSync(refDest, getStarterReferenceRecord(), 'utf8');
        console.log(`  -> ${path.relative(process.cwd(), refDest)}`);
      }
    }
    return 0;
  }

  console.error(`Unknown command: "${command}". Run "pure-saas --help" for available commands.`);
  return 1;
}

function printValidationResult(result) {
  console.log(`Checking ${result.file}...`);
  console.log(`Type: ${result.type || 'unknown'} | Status: ${result.status}`);
  if (result.tokensFound !== undefined) {
    console.log(`Semantic color tokens discovered: ${result.tokensFound}`);
  }

  if (result.valid) {
    console.log('✓ Validation PASSED: Document satisfies all Pure SaaS structural and token requirements.');
  } else {
    console.log('✗ Validation FAILED with issues:');
    for (const issue of result.issues) {
      console.log(`  - ${issue}`);
    }
  }

  if (result.warnings && result.warnings.length > 0) {
    console.log('Warnings / Recommendations:');
    for (const w of result.warnings) {
      console.log(`  * ${w}`);
    }
  }
}

function printHelp() {
  console.log(`
Pure SaaS CLI - AI Agent Design Enforcement Toolkit

Usage:
  pure-saas <command> [options]

Commands:
  validate [file]                 Validate DESIGN.md or design-brief.md structure and required tokens
  check-tokens, tokens [file]     Check design tokens and scan source code for raw styling or drift
  export-tokens [file] [--format] Export tokens from DESIGN.md to CSS, Tailwind, or JSON
  audit, review-report, verify    Generate an honest verification report with tested vs untested areas
  style [query]                   Query curated design intelligence styles
  init [--reference]              Initialize starter design-brief.md and DESIGN.md in the current repo

Options:
  --json                          Output results as machine-readable JSON (suitable for CI)
  --format <css|tailwind|json>    Export format for export-tokens (default: css)
  --out <file>                    Write output directly to file
  --source <dir>                  Source directory to scan for token usage (e.g. src)
  --help, -h                      Show this help message
  --version, -v                   Show CLI version

Examples:
  npx pure-saas validate DESIGN.md
  npx pure-saas check-tokens DESIGN.md --source src
  npx pure-saas export-tokens DESIGN.md --format css --out styles/tokens.css
  npx pure-saas review-report --json
`);
}

// Only execute when run directly from command line
if (process.argv[1] && (process.argv[1].endsWith('pure-saas.mjs') || process.argv[1].endsWith('pure-saas'))) {
  runCli().then(code => process.exit(code));
}
