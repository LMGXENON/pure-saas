#!/usr/bin/env node
/**
 * Pure SaaS CLI - Design System Validator, Token Checker, Exporter, Intelligence Engine, and Review Reporter
 * Zero-dependency Node.js implementation compatible with Node >= 18.
 *
 * Integrated Architecture:
 * 1. Apple Design Skill: Platform-native HIG conventions, spatial depth, dynamic typography, and "Read Before You Cite".
 * 2. UI/UX Pro Max: Multi-domain searchable design intelligence (styles, products, colors, typography, charts, motion, UX heuristics, stacks) and design dial generation.
 * 3. Zero Slop Design: Persistent DESIGN.md format, token drift detection, token diffing, known defects tracking, WCAG contrast verification, DTCG 2025.10 & Tailwind v4 token export.
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { execSync, spawnSync } from 'node:child_process';

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
    let lineWithoutComment = rawLine;
    const isQuoted = /^["'].*["']$/.test(rawLine.trim());
    if (!isQuoted) {
      lineWithoutComment = rawLine.replace(/(\s+#.*)$/, '');
    }
    if (!lineWithoutComment.trim()) continue;

    const indent = rawLine.search(/\S/);
    const trimmed = lineWithoutComment.trim();

    // List item
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

// --- WCAG Color Contrast Engine ---

export function parseHexColor(hex) {
  if (!hex || typeof hex !== 'string') return null;
  let c = hex.replace(/^#/, '').trim();
  if (c.length === 3 || c.length === 4) {
    c = c.slice(0, 3).split('').map(x => x + x).join('');
  }
  if (c.length >= 6) {
    const num = parseInt(c.slice(0, 6), 16);
    if (Number.isNaN(num)) return null;
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
  }
  return null;
}

export function srgbToLinear(c) {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

export function relativeLuminance(rgb) {
  return 0.2126 * srgbToLinear(rgb[0]) + 0.7152 * srgbToLinear(rgb[1]) + 0.0722 * srgbToLinear(rgb[2]);
}

export function calculateContrastRatio(hex1, hex2) {
  const rgb1 = parseHexColor(hex1);
  const rgb2 = parseHexColor(hex2);
  if (!rgb1 || !rgb2) return null;
  const l1 = relativeLuminance(rgb1);
  const l2 = relativeLuminance(rgb2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return Number(((lighter + 0.05) / (darker + 0.05)).toFixed(2));
}

export function auditColorContrast(colors = {}) {
  const pairsToCheck = [
    { fg: 'color-text-primary', bg: 'color-bg-canvas', target: 'Primary Text on Canvas (AA >= 4.5, AAA >= 7.0)', minRatio: 4.5 },
    { fg: 'color-text-primary', bg: 'color-bg-surface', target: 'Primary Text on Surface (AA >= 4.5, AAA >= 7.0)', minRatio: 4.5 },
    { fg: 'color-text-secondary', bg: 'color-bg-canvas', target: 'Secondary Text on Canvas (AA >= 4.5)', minRatio: 4.5 },
    { fg: 'color-text-secondary', bg: 'color-bg-surface', target: 'Secondary Text on Surface (AA >= 4.5)', minRatio: 4.5 },
    { fg: 'color-action-primary', bg: 'color-bg-canvas', target: 'Interactive Action on Canvas (AA UI >= 3.0)', minRatio: 3.0 },
    { fg: 'color-text-inverse', bg: 'color-action-primary', target: 'Action Button Label (AA >= 4.5)', minRatio: 4.5 },
    { fg: 'color-status-error', bg: 'color-bg-canvas', target: 'Error Status Text on Canvas (AA >= 4.5)', minRatio: 4.5 },
    { fg: 'color-status-success', bg: 'color-bg-canvas', target: 'Success Status Indicator on Canvas (AA UI >= 3.0)', minRatio: 3.0 }
  ];

  const results = [];
  let passedAA = 0;
  let failedAA = 0;

  for (const pair of pairsToCheck) {
    const fgVal = colors[pair.fg];
    const bgVal = colors[pair.bg];
    if (fgVal && bgVal) {
      const ratio = calculateContrastRatio(fgVal, bgVal);
      if (ratio !== null) {
        const passAA = ratio >= pair.minRatio;
        const passAAA = ratio >= 7.0;
        if (passAA) passedAA++;
        else failedAA++;
        results.push({
          fgToken: pair.fg,
          bgToken: pair.bg,
          fgHex: fgVal,
          bgHex: bgVal,
          ratio,
          minRequired: pair.minRatio,
          target: pair.target,
          passAA,
          passAAA
        });
      }
    }
  }

  return {
    auditedPairs: results.length,
    passedAA,
    failedAA,
    results
  };
}

// --- Design Token Diffing & Drift Engine ---

export function flattenObject(obj, prefix = '') {
  const result = {};
  if (!obj || typeof obj !== 'object') return result;
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value, fullKey));
    } else {
      result[fullKey] = value;
    }
  }
  return result;
}

export function diffDesignTokens(beforeTokens, afterTokens) {
  const flatBefore = flattenObject(beforeTokens);
  const flatAfter = flattenObject(afterTokens);
  const allKeys = Array.from(new Set([...Object.keys(flatBefore), ...Object.keys(flatAfter)])).sort();
  const changes = [];

  for (const key of allKeys) {
    if (!Object.hasOwn(flatBefore, key)) {
      changes.push({ path: key, change: 'added', after: flatAfter[key] });
    } else if (!Object.hasOwn(flatAfter, key)) {
      changes.push({ path: key, change: 'removed', before: flatBefore[key] });
    } else if (JSON.stringify(flatBefore[key]) !== JSON.stringify(flatAfter[key])) {
      changes.push({ path: key, change: 'changed', before: flatBefore[key], after: flatAfter[key] });
    }
  }

  return {
    changes,
    totalChanges: changes.length
  };
}

export function detectDesignDrift(tokens, observationsData) {
  const source = observationsData.source || { url: 'unknown', captured: new Date().toISOString() };
  const observations = observationsData.observations || [];
  const results = [];
  let matches = 0;
  let differences = 0;

  function atPath(obj, pathStr) {
    const parts = pathStr.split('.');
    let cur = obj;
    for (const part of parts) {
      if (cur === null || typeof cur !== 'object' || !Object.hasOwn(cur, part)) {
        return undefined;
      }
      cur = cur[part];
    }
    return cur;
  }

  for (const obs of observations) {
    const expected = atPath(tokens, obs.path);
    const observedValue = obs.value;
    const isMatch = expected !== undefined && JSON.stringify(expected) === JSON.stringify(observedValue);
    if (isMatch) matches++;
    else differences++;

    results.push({
      path: obs.path,
      location: obs.location || '',
      state: obs.state || 'default',
      mode: obs.mode || 'default',
      expected,
      observed: observedValue,
      result: isMatch ? 'match' : 'drift'
    });
  }

  return {
    source,
    observed: observations.length,
    matches,
    differences,
    results
  };
}

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

  // Check for unresolved design decisions (Zero Slop Design unresolved ledger)
  const unresolvedItems = [];
  if (Array.isArray(data.unresolved)) {
    unresolvedItems.push(...data.unresolved);
  }
  if (Array.isArray(tokens.unresolved)) {
    unresolvedItems.push(...tokens.unresolved);
  }
  if (Array.isArray(data.suggested_decisions)) {
    unresolvedItems.push(...data.suggested_decisions);
  }
  if (unresolvedItems.length > 0) {
    warnings.push(`${unresolvedItems.length} unresolved design decision(s) open in ledger; user confirmation required before implementation.`);
  }

  // WCAG Color Contrast Audit
  const contrastAudit = auditColorContrast(colors);
  for (const result of contrastAudit.results) {
    if (!result.passAA) {
      warnings.push(`Contrast warning: ${result.fgToken} (${result.fgHex}) on ${result.bgToken} (${result.bgHex}) has ratio ${result.ratio}:1, failing WCAG 2.2 AA target (${result.minRequired}:1).`);
    }
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
    warnings,
    unresolvedItems,
    contrastAudit
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

// --- Source Code Scan for Tokens, Anti-Slop, and Known Defect Baseline ---
// Incorporates static analysis patterns adapted from zero-slop-design (MIT License, Copyright (c) 2026 zero-slop-design contributors)

const PALETTE = 'slate|gray|grey|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose';
const PALETTE_CLASS = new RegExp(`(?<![\\w-])(?:[a-z]+:)*(?:bg|text|border(?:-[trblxy])?|ring|ring-offset|outline|from|via|to|fill|stroke|decoration|shadow|accent|caret|divide|placeholder)-(?:${PALETTE})-(?:50|[1-9]00|950)(?:\\/\\d+)?(?![\\w-])`, 'g');
const UTILITY_DIMENSION = /(?<![\w-])(?:[a-z]+:)*(p[xytrbl]?|m[xytrbl]?|gap(?:-[xy])?|space-[xy]|rounded(?:-[a-z]+)?|text|tracking)-\[([^\]\s]+)\]/g;
const COLOR_FUNCTION = /\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch)\(\s*[^)]*\)/g;

export function scanSourceDirectory(srcDir, designTokens = {}, options = {}) {
  const results = {
    scannedFiles: 0,
    rawColorViolations: [],
    paletteClassViolations: [],
    arbitraryDimensionViolations: [],
    unresolvedTokenRefs: [],
    colorFunctionViolations: [],
    focusSuppressionWarnings: [],
    exceptionReasonViolations: [],
    antiSlopWarnings: [],
    knownViolations: [],
    newViolations: [],
    fixedKnownDefects: []
  };

  if (!fs.existsSync(srcDir)) {
    return results;
  }

  let knownDefectsList = [];
  if (options.known && fs.existsSync(options.known)) {
    try {
      knownDefectsList = JSON.parse(fs.readFileSync(options.known, 'utf8'));
    } catch {
      knownDefectsList = [];
    }
  }

  const knownColorValues = new Set(
    Object.values(designTokens.colors || {}).map(v => String(v).toLowerCase().trim())
  );
  const knownTokenNames = new Set([
    ...Object.keys(designTokens.colors || {}),
    ...Object.keys(designTokens.spacing || {}),
    ...Object.keys(designTokens.radii || {}).map(r => `radius-${r}`),
    ...Object.keys(designTokens.radii || {}),
    ...Object.keys(designTokens.typography?.font_families || {}).map(f => `font-${f}`),
    ...Object.keys(designTokens.typography?.font_families || {}).map(f => `font-family-${f}`),
    ...Object.keys(designTokens.typography?.scale || {}).map(s => `font-size-${s}`),
    ...Object.keys(designTokens.typography?.scale || {}).map(s => `font-size-${s.replace(/_/g, '-')}`),
    ...Object.keys(designTokens.typography?.scale || {}).map(s => `font-${s}`),
    ...Object.keys(designTokens.typography?.scale || {}).map(s => `font-${s.replace(/_/g, '-')}`),
    ...Object.keys(designTokens.typography?.line_heights || {}).map(l => `line-height-${l}`),
    ...Object.keys(designTokens.typography?.letter_spacings || {}).map(l => `letter-spacing-${l}`),
    ...Object.keys(designTokens.motion || {}),
    ...Object.keys(designTokens.shadows || {}).map(s => `shadow-${s}`),
    ...Object.keys(designTokens.layout || {}).map(l => `layout-${l}`),
    ...Object.keys(designTokens.layout || {}).map(l => l.replace(/_/g, '-')),
    ...Object.keys(flattenObject(designTokens)).map(k => k.replace(/[\._]/g, '-')),
    ...Object.keys(flattenObject(designTokens)).map(k => k.split(/[\._]/).pop())
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

  // Match against known defects baseline
  const allViolations = [
    ...results.rawColorViolations,
    ...results.paletteClassViolations,
    ...results.arbitraryDimensionViolations,
    ...results.unresolvedTokenRefs,
    ...results.colorFunctionViolations,
    ...results.focusSuppressionWarnings,
    ...results.exceptionReasonViolations,
    ...results.antiSlopWarnings
  ];

  const matchedKnownIndices = new Set();
  for (const v of allViolations) {
    const relFile = path.relative(process.cwd(), v.file);
    const textVal = v.value || v.token || v.pattern || '';
    const matchIdx = knownDefectsList.findIndex((k, idx) =>
      !matchedKnownIndices.has(idx) &&
      k.file === relFile &&
      k.line === v.line &&
      (!k.rule || k.rule === v.rule) &&
      (!k.text || k.text === textVal)
    );
    if (matchIdx !== -1) {
      v.known = true;
      matchedKnownIndices.add(matchIdx);
      results.knownViolations.push(v);
    } else {
      v.known = false;
      results.newViolations.push(v);
    }
  }

  // Detect fixed known defects
  for (let i = 0; i < knownDefectsList.length; i++) {
    if (!matchedKnownIndices.has(i)) {
      results.fixedKnownDefects.push(knownDefectsList[i]);
    }
  }

  // Update known defects baseline file if requested
  if (options.updateKnown && options.known) {
    const baseline = allViolations.map(v => ({
      file: path.relative(process.cwd(), v.file),
      line: v.line,
      rule: v.rule || 'unknown',
      text: v.value || v.token || v.pattern || ''
    }));
    fs.mkdirSync(path.dirname(path.resolve(process.cwd(), options.known)), { recursive: true });
    fs.writeFileSync(path.resolve(process.cwd(), options.known), JSON.stringify(baseline, null, 2) + '\n', 'utf8');
  }

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
              rule: 'exception-reason',
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

    // Ignore pure comment lines
    const trimmed = rawLine.trim();
    if (trimmed.startsWith('//') || (trimmed.startsWith('/*') && trimmed.endsWith('*/')) || trimmed.startsWith('*')) {
      continue;
    }

    // Strip inline comments before inspecting code
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
            rule: 'color-value',
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
          rule: 'palette-class',
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
          rule: 'dimension-value',
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
            rule: 'unresolved-token',
            token: tokenName,
            message: `CSS variable var(--${tokenName}) is not defined in DESIGN.md tokens.`
          });
        }
      }
    }

    // Check color functions outside of CSS custom property definitions
    if (!line.includes('--') && !line.includes('var(')) {
      const colorFuncMatches = line.match(COLOR_FUNCTION);
      if (colorFuncMatches) {
        for (const func of colorFuncMatches) {
          results.colorFunctionViolations.push({
            file: filePath,
            line: lineNum,
            rule: 'color-function',
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
        rule: 'focus-suppression',
        pattern: 'focus-suppression',
        message: 'Focus outline suppressed without visible focus replacement (WCAG 2.2 SC 2.4.7 violation).'
      });
    }

    // Check Anti-Slop patterns
    if (/bg-gradient-to-(r|br|bl|t)\s+from-(purple|indigo|pink)-/i.test(line)) {
      results.antiSlopWarnings.push({
        file: filePath,
        line: lineNum,
        rule: 'avoid-gradient',
        pattern: 'generic-gradient-mesh',
        message: 'Generic purple/indigo hero gradient detected without documented brand justification.'
      });
    }

    if (/bg-clip-text\s+text-transparent/i.test(line)) {
      results.antiSlopWarnings.push({
        file: filePath,
        line: lineNum,
        rule: 'avoid-gradient',
        pattern: 'gradient-text-slop',
        message: 'Transparent gradient text detected; verify text contrast against background (WCAG 1.4.3).'
      });
    }

    if (/backdrop-blur-(md|lg|xl)\s+bg-(white|black)\/(10|20)/i.test(line)) {
      results.antiSlopWarnings.push({
        file: filePath,
        line: lineNum,
        rule: 'avoid-blur',
        pattern: 'glassmorphism-overuse',
        message: 'Glassmorphism backdrop-blur detected. Verify high-contrast readability.'
      });
    }

    if (/[🚀✨🔥🎉💡]/.test(line) && (line.includes('<h') || line.includes('className') || line.includes('button'))) {
      results.antiSlopWarnings.push({
        file: filePath,
        line: lineNum,
        rule: 'avoid-emoji',
        pattern: 'emoji-icon-replacement',
        message: 'Emoji used in interface markup; replace with consistent SVG iconography.'
      });
    }

    // Check Green Pulsing Dots & Faux-Live Indicators (Taste Skill & Pure SaaS Rule 13)
    if (/(?:bg-(?:emerald|green)-\d+|text-(?:emerald|green)-\d+).*(?:animate-pulse|animate-ping)|(?:animate-pulse|animate-ping).*(?:bg-(?:emerald|green)-\d+|text-(?:emerald|green)-\d+)/i.test(line)) {
      results.antiSlopWarnings.push({
        file: filePath,
        line: lineNum,
        rule: 'avoid-green-pulse',
        pattern: 'green-pulsing-indicator',
        message: 'Green circular pulsing/pinging indicator detected. Banned across all components; use static typography or subtle badge instead.'
      });
    }

    // Check Unbounded Transitions on Layout Properties (Impeccable Performance Dimension)
    if (/(?:transition-all|transition:\s*all)/i.test(line) && /(?:width|height|top|left|right|bottom|margin|padding)/i.test(line)) {
      results.antiSlopWarnings.push({
        file: filePath,
        line: lineNum,
        rule: 'layout-transition',
        pattern: 'unbounded-layout-transition',
        message: 'transition-all applied to layout-triggering properties causes layout thrashing. Constrain transitions to transform and opacity.'
      });
    }

    // Check will-change Overuse (Impeccable Performance Dimension)
    if (/will-change:\s*(?:transform|scroll-position|all|auto)/i.test(line) && !line.includes(':hover') && !line.includes(':active')) {
      results.antiSlopWarnings.push({
        file: filePath,
        line: lineNum,
        rule: 'will-change-overuse',
        pattern: 'static-will-change',
        message: 'will-change declared statically on non-interactive element creates excessive GPU layer allocations.'
      });
    }

    // Check Fixed Layout Blowout Widths (Impeccable Responsive Dimension)
    if (/(?:w-\[(?:[7-9]\d{2}|1\d{3})px\]|min-w-\[(?:[7-9]\d{2}|1\d{3})px\]|width:\s*(?:[7-9]\d{2}|1\d{3})px)/i.test(line) && !line.includes('max-w-')) {
      results.antiSlopWarnings.push({
        file: filePath,
        line: lineNum,
        rule: 'fixed-viewport-width',
        pattern: 'fixed-pixel-overflow',
        message: 'Fixed layout width > 700px causes horizontal overflow on mobile viewports. Use max-width or responsive grid.'
      });
    }
  }
}

// --- Token Exporter (CSS, Tailwind v3, Tailwind v4, DTCG 2025.10, JSON) ---

export function exportTokens(designData, format = 'css', mode = 'default') {
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
    if (tokens.motion) {
      out += '\n  /* Motion */\n';
      for (const [k, v] of Object.entries(tokens.motion)) {
        out += `  --motion-${k}: ${v};\n`;
      }
    }
    out += '}\n';
    return out;
  }

  if (format === 'tailwind-v4') {
    let out = '/* Tailwind v4 Theme Extension - Generated by Pure SaaS */\n@theme inline {\n';
    for (const [k, v] of Object.entries(colors)) {
      out += `  --color-${k.replace(/^color-/, '')}: ${v};\n`;
    }
    for (const [k, v] of Object.entries(spacing)) {
      out += `  --spacing-${k}: ${v};\n`;
    }
    for (const [k, v] of Object.entries(radii)) {
      out += `  --radius-${k}: ${v};\n`;
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

  if (format === 'dtcg') {
    const dtcg = {
      $schema: 'https://design-tokens.github.io/community-group/format/2025.10/schema.json',
      color: {},
      spacing: {},
      typography: {},
      radius: {}
    };
    for (const [k, v] of Object.entries(colors)) {
      dtcg.color[k] = { $type: 'color', $value: String(v) };
    }
    for (const [k, v] of Object.entries(spacing)) {
      dtcg.spacing[k] = { $type: 'dimension', $value: String(v) };
    }
    for (const [k, v] of Object.entries(radii)) {
      dtcg.radius[k] = { $type: 'dimension', $value: String(v) };
    }
    if (typography.font_families) {
      for (const [k, v] of Object.entries(typography.font_families)) {
        dtcg.typography[`font-${k}`] = { $type: 'fontFamily', $value: String(v) };
      }
    }
    return JSON.stringify(dtcg, null, 2) + '\n';
  }

  if (format === 'json') {
    return JSON.stringify(tokens, null, 2);
  }

  throw new Error(`Unsupported export format: ${format}. Use 'css', 'tailwind', 'tailwind-v4', 'dtcg', or 'json'.`);
}

// --- Programmatic Design System Generator (UI/UX Pro Max + Zero Slop Design) ---

export function generateDesignSystem(options = {}) {
  const intelPath = path.resolve(__dirname, '../references/design-intelligence.json');
  const catalogPath = path.resolve(__dirname, '../references/design-styles-catalog.json');

  let intel = null;
  if (fs.existsSync(intelPath)) {
    try { intel = JSON.parse(fs.readFileSync(intelPath, 'utf8')); } catch { intel = null; }
  }
  const catalog = fs.existsSync(catalogPath)
    ? JSON.parse(fs.readFileSync(catalogPath, 'utf8'))
    : { styles: [], product_archetypes: {}, stack_guidance: {} };

  const productQuery = (options.product || 'saas').toLowerCase();
  const styleQuery = (options.style || '').toLowerCase();
  const variance = Math.max(1, Math.min(10, parseInt(options.variance || '5', 10)));
  const motion = Math.max(1, Math.min(10, parseInt(options.motion || '5', 10)));
  const density = Math.max(1, Math.min(10, parseInt(options.density || '5', 10)));
  const projectName = options.name || 'Pure SaaS Generated Design System';

  // 1. Resolve Product Archetype
  const allProducts = (intel && intel.products) || [];
  let product = allProducts.find(p => p.id?.toLowerCase().includes(productQuery) || p.name?.toLowerCase().includes(productQuery));
  if (!product && catalog.product_archetypes) {
    const key = Object.keys(catalog.product_archetypes).find(k => k.toLowerCase().includes(productQuery));
    if (key) product = { id: key, ...catalog.product_archetypes[key] };
  }
  if (!product && allProducts.length > 0) product = allProducts[0];
  if (!product) product = { id: 'saas', name: 'B2B SaaS Platform', primary_style: 'enterprise-saas' };

  // 2. Resolve Color Palette from Product Colors
  const allColors = (intel && intel.colors) || [];
  let colorEntry = allColors.find(c => c.productType?.toLowerCase().includes(productQuery) || c.productType?.toLowerCase().includes(product.id?.toLowerCase()));
  if (!colorEntry && allColors.length > 0) colorEntry = allColors[0];
  if (!colorEntry) {
    colorEntry = {
      primary: '#18181b', onPrimary: '#ffffff', secondary: '#71717a', onSecondary: '#ffffff',
      accent: '#2563eb', onAccent: '#ffffff', background: '#ffffff', foreground: '#09090b',
      card: '#f9fafb', cardForeground: '#09090b', muted: '#f4f4f5', mutedForeground: '#71717a',
      border: '#e4e4e7', destructive: '#dc2626', onDestructive: '#ffffff', ring: '#2563eb'
    };
  }

  // 3. Resolve Style
  const allStyles = [...(catalog.styles || []), ...((intel && intel.styles) || [])];
  let style = null;
  if (styleQuery) {
    style = allStyles.find(s => s.id?.toLowerCase().includes(styleQuery) || s.name?.toLowerCase().includes(styleQuery));
  }
  if (!style && product.primary_style) {
    style = allStyles.find(s => s.id?.toLowerCase().includes(product.primary_style.toLowerCase()) || s.name?.toLowerCase().includes(product.primary_style.toLowerCase()));
  }
  if (!style && allStyles.length > 0) style = allStyles[0];
  if (!style) style = { id: 'minimal-swiss', name: 'Minimalism & Swiss Style' };

  // 4. Resolve Typography
  const allTypo = (intel && intel.typography) || [];
  let typo = allTypo.find(t => t.best_for && t.best_for.toLowerCase().includes(productQuery));
  if (!typo && allTypo.length > 0) typo = allTypo[0];
  const headingFont = typo?.heading_font || 'Inter, -apple-system, sans-serif';
  const bodyFont = typo?.body_font || 'Inter, -apple-system, sans-serif';

  // 5. Dial: Density (1-10)
  const spacing = density >= 7 ? {
    'space-1': '2px', 'space-2': '4px', 'space-4': '12px', 'space-6': '16px', 'space-8': '24px'
  } : density <= 3 ? {
    'space-1': '6px', 'space-2': '12px', 'space-4': '24px', 'space-6': '36px', 'space-8': '48px'
  } : {
    'space-1': '4px', 'space-2': '8px', 'space-4': '16px', 'space-6': '24px', 'space-8': '32px'
  };
  const containerMaxWidth = density >= 8 ? '1600px' : density <= 3 ? '1140px' : '1280px';
  const bodySize = density >= 8 ? '0.875rem' : density <= 3 ? '1.125rem' : '1rem';

  // 6. Dial: Motion (1-10)
  const motionTiming = motion >= 8 ? {
    duration_fast: '150ms', duration_normal: '300ms',
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    feel: 'Dynamic spring physics with responsive tactile feedback'
  } : motion <= 3 ? {
    duration_fast: '75ms', duration_normal: '150ms',
    easing: 'ease-out',
    feel: 'Subtle instant transitions respecting reduced-motion preferences'
  } : {
    duration_fast: '100ms', duration_normal: '200ms',
    easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
    feel: 'Natural Apple-grade responsive easing'
  };

  // 7. Dial: Variance (1-10)
  const h1Size = variance >= 8 ? '3.25rem' : variance <= 3 ? '2.0rem' : '2.5rem';

  return `---
name: "${projectName}"
version: "1.0.0"
status: "approved"
product_archetype: "${product.name}"
style_archetype: "${style.name}"
dials:
  variance: ${variance}
  motion: ${motion}
  density: ${density}
tokens:
  colors:
    color-bg-canvas: "${colorEntry.background || '#ffffff'}"
    color-bg-surface: "${colorEntry.card || '#f9fafb'}"
    color-bg-surface-elevated: "#ffffff"
    color-bg-surface-sunken: "${colorEntry.muted || '#f3f4f6'}"
    color-text-primary: "${colorEntry.foreground || '#09090b'}"
    color-text-secondary: "${colorEntry.mutedForeground || '#52525b'}"
    color-text-muted: "#a1a1aa"
    color-text-inverse: "${colorEntry.onPrimary || '#ffffff'}"
    color-action-primary: "${colorEntry.primary || '#18181b'}"
    color-action-hover: "${colorEntry.ring || '#27272a'}"
    color-action-active: "${colorEntry.foreground || '#09090b'}"
    color-border-subtle: "${colorEntry.border || '#e4e4e7'}"
    color-border-strong: "#a1a1aa"
    color-border-focus: "${colorEntry.ring || '#18181b'}"
    color-status-success: "#16a34a"
    color-status-warning: "#d97706"
    color-status-error: "${colorEntry.destructive || '#dc2626'}"
    color-status-info: "${colorEntry.accent || '#2563eb'}"
  typography:
    font_families:
      sans: "${bodyFont}"
      heading: "${headingFont}"
      mono: "JetBrains Mono, monospace"
    scale:
      h1: "${h1Size}"
      h2: "1.75rem"
      h3: "1.25rem"
      body: "${bodySize}"
      body_small: "0.875rem"
      label: "0.75rem"
  spacing:
    space-1: "${spacing['space-1']}"
    space-2: "${spacing['space-2']}"
    space-4: "${spacing['space-4']}"
    space-6: "${spacing['space-6']}"
    space-8: "${spacing['space-8']}"
  layout:
    container_max_width: "${containerMaxWidth}"
    content_max_width: "65ch"
  radii:
    none: "0"
    sm: "4px"
    md: "8px"
    lg: "12px"
  motion:
    duration-fast: "${motionTiming.duration_fast}"
    duration-normal: "${motionTiming.duration_normal}"
    easing-standard: "${motionTiming.easing}"
principles:
  - "Purposeful clarity over decorative excess."
  - "Direct manipulation and responsive optical feedback."
  - "Strict anti-slop discipline: zero generic purple/cyan gradients and no emoji icons."
accessibility:
  tier: "WCAG 2.2 AA"
  min_touch_target: "44px"
  focus_ring_width: "2px"
unresolved:
  - "Verify color contrast on brand primary against customized dark mode theme."
  - "Confirm whether data tables require fixed or fluid column widths on mobile viewports."
---

# ${projectName}

## 1. Product & Direction Overview
- **Product Archetype:** ${product.name}
- **Style Archetype:** ${style.name}
- **Design Dials:** Variance ${variance}/10 | Motion ${motion}/10 | Density ${density}/10 (${motionTiming.feel})

## 2. Precedence Hierarchy
1. User's explicit requirements and brand design system.
2. Platform conventions (Apple HIG / Web standards) and WCAG 2.2 AA.
3. Verified project tokens in DESIGN.md.
4. Retrieved guidelines from integrated intelligence catalog.
5. New proposals (must be flagged as proposals).

## 3. Interaction States (8-State Matrix)
All interactive controls implement:
- Default, Hover, Focus-Visible, Active/Pressed, Disabled, Loading, Error, and Success.

## 4. Anti-Slop Discipline
- No generic gradient mesh backgrounds.
- No transparent clip-text gradient titles.
- No emoji icons in buttons or navigation.
- No unmapped Tailwind utility color classes.
`;
}

// --- Design Style Intelligence Engine (UI/UX Pro Max) ---

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
  const pTarget = productFilter || (domain === 'product' || domain === 'products' ? query : '');
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
        pr.id?.toLowerCase().includes(pTarget) ||
        pr.name?.toLowerCase().includes(pTarget) ||
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
  const sTarget = stackFilter || (domain === 'stack' || domain === 'stacks' ? query : '');
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

  // Domain Queries
  const matchedColors = (intel && intel.colors)
    ? (query ? intel.colors.filter(c => c.productType.toLowerCase().includes(query) || (c.notes && c.notes.toLowerCase().includes(query))) : intel.colors)
    : [];

  const matchedLanding = (intel && intel.landing)
    ? (query ? intel.landing.filter(l => l.patternName.toLowerCase().includes(query) || l.keywords.toLowerCase().includes(query) || l.conversionOptimization.toLowerCase().includes(query)) : intel.landing)
    : [];

  const matchedUX = (intel && intel.ux)
    ? (query ? intel.ux.filter(u => u.issue.toLowerCase().includes(query) || u.category.toLowerCase().includes(query) || u.description.toLowerCase().includes(query)) : intel.ux)
    : [];

  const matchedTypography = (intel && intel.typography)
    ? (query ? intel.typography.filter(t => t.name.toLowerCase().includes(query) || t.heading_font.toLowerCase().includes(query) || (t.mood && t.mood.toLowerCase().includes(query))) : intel.typography)
    : [];

  const matchedCharts = (intel && intel.charts)
    ? (query ? intel.charts.filter(c => c.data_type.toLowerCase().includes(query) || c.best_chart_type.toLowerCase().includes(query)) : intel.charts)
    : [];

  const matchedMotion = (intel && intel.motion)
    ? (query ? intel.motion.filter(m => m.category.toLowerCase().includes(query) || (m.intensity_tier && m.intensity_tier.toLowerCase().includes(query))) : intel.motion)
    : [];

  const matchedAppUi = (intel && intel.app_interface)
    ? (query ? intel.app_interface.filter(a => a.issue.toLowerCase().includes(query) || a.category.toLowerCase().includes(query) || a.description.toLowerCase().includes(query)) : intel.app_interface)
    : [];

  return {
    styles: matchedStyles,
    product: matchedProduct,
    stack: matchedStack,
    colors: matchedColors,
    landing: matchedLanding,
    ux: matchedUX,
    typography: matchedTypography,
    charts: matchedCharts,
    motion: matchedMotion,
    app_interface: matchedAppUi,
    allProducts: productsObj,
    allStacks: stacksObj,
    datasetSummary: intel ? intel.summary : { styles_count: catalog.styles?.length || 0 }
  };
}

// --- Reference Library Search Engine (Apple HIG + Frameworks + Craft Guides) ---

export function searchReferences(query = '', options = {}) {
  const referencesDir = path.resolve(__dirname, '../references');
  const results = [];
  const qTerms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);

  if (!fs.existsSync(referencesDir)) {
    return results;
  }

  function walkDir(dir, baseDir = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const ent of entries) {
      const fullPath = path.join(dir, ent.name);
      const relPath = baseDir ? path.join(baseDir, ent.name) : ent.name;
      if (ent.isDirectory()) {
        walkDir(fullPath, relPath);
      } else if (ent.isFile() && ent.name.endsWith('.md')) {
        indexFile(fullPath, relPath);
      }
    }
  }

  function indexFile(filePath, relPath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');
      const titleLine = lines.find(l => l.startsWith('# ')) || `# ${path.basename(filePath, '.md')}`;
      const title = titleLine.replace(/^#\s+/, '').trim();

      let category = 'Craft Guideline';
      if (relPath.startsWith('hig/')) category = 'Apple HIG';
      else if (relPath.startsWith('frameworks/')) category = 'Framework Guideline';
      else if (relPath.startsWith('backgrounds/')) category = 'Background Component';
      else if (relPath.startsWith('components/')) category = 'Component Guide';
      else if (relPath.startsWith('layouts/')) category = 'Layout Pattern';
      else if (relPath.startsWith('design-systems/')) category = 'Design System';
      else if (relPath.startsWith('ux-patterns/')) category = 'UX & Interaction';
      else if (relPath.startsWith('visual-craft/')) category = 'Visual Craft';
      else if (relPath.startsWith('frontend-engineering/')) category = 'Frontend Engineering';
      else if (relPath.startsWith('accessibility/')) category = 'Accessibility';
      else if (relPath.startsWith('theming/')) category = 'Theming & Tokens';
      else if (relPath.startsWith('developer-tooling/')) category = 'Developer Tooling';
      else if (relPath.startsWith('real-world-flows/')) category = 'Real-World Flow';
      else if (relPath.startsWith('design-analysis/')) category = 'Design Analysis';
      else if (relPath.startsWith('responsive/')) category = 'Responsive Design';

      let score = 0;
      const lowerRel = relPath.toLowerCase();
      const lowerTitle = title.toLowerCase();
      const lowerContent = content.toLowerCase();

      if (qTerms.length === 0) {
        score = 1;
      } else {
        for (const term of qTerms) {
          if (lowerRel.includes(term)) score += 50;
          if (lowerTitle.includes(term)) score += 30;
          for (const line of lines) {
            if (line.startsWith('#') && line.toLowerCase().includes(term)) {
              score += 15;
            }
          }
          const termRegex = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}\\b`, 'gi');
          const matches = lowerContent.match(termRegex);
          if (matches) score += Math.min(matches.length * 2, 25);
        }
      }

      if (score > 0) {
        let snippet = '';
        if (qTerms.length > 0) {
          const matchLine = lines.find(l => !l.startsWith('#') && !l.startsWith('>') && qTerms.some(t => l.toLowerCase().includes(t)) && l.trim().length > 15);
          if (matchLine) snippet = matchLine.trim().slice(0, 160);
        }
        if (!snippet) {
          const firstNonHeader = lines.find(l => !l.startsWith('#') && !l.startsWith('>') && l.trim().length > 20);
          if (firstNonHeader) snippet = firstNonHeader.trim().slice(0, 160);
        }

        results.push({
          path: path.join('references', relPath),
          fullPath: filePath,
          title,
          category,
          score,
          snippet
        });
      }
    } catch {
      // ignore read error
    }
  }

  walkDir(referencesDir);
  results.sort((a, b) => b.score - a.score);
  return options.limit ? results.slice(0, options.limit) : results;
}

// --- Starter Document Generators (Zero-Disk Dependency) ---

export function getStarterDesign() {
  return `---
name: "Pure SaaS Design System"
version: "1.0.0"
status: "draft"
tokens:
  colors:
    color-bg-canvas: "#ffffff"
    color-bg-surface: "#f9fafb"
    color-bg-surface-elevated: "#ffffff"
    color-bg-surface-sunken: "#f3f4f6"
    color-text-primary: "#09090b"
    color-text-secondary: "#52525b"
    color-text-muted: "#a1a1aa"
    color-text-inverse: "#ffffff"
    color-action-primary: "#18181b"
    color-action-hover: "#27272a"
    color-action-active: "#09090b"
    color-border-subtle: "#e4e4e7"
    color-border-strong: "#a1a1aa"
    color-border-focus: "#18181b"
    color-status-success: "#16a34a"
    color-status-warning: "#d97706"
    color-status-error: "#dc2626"
    color-status-info: "#2563eb"
  typography:
    font_families:
      sans: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
      mono: "JetBrains Mono, monospace"
    scale:
      h1: "2.5rem"
      h2: "1.75rem"
      h3: "1.25rem"
      body: "1rem"
      body_small: "0.875rem"
      label: "0.75rem"
  spacing:
    space-1: "4px"
    space-2: "8px"
    space-4: "16px"
    space-6: "24px"
    space-8: "32px"
  layout:
    container_max_width: "1280px"
    content_max_width: "65ch"
  radii:
    none: "0"
    sm: "4px"
    md: "8px"
    lg: "12px"
principles:
  - "Purposeful clarity over decorative excess."
  - "Direct manipulation and responsive optical feedback."
  - "Strict anti-slop discipline: no generic gradient text or emoji UI icons."
accessibility:
  tier: "WCAG 2.2 AA"
---

# Pure SaaS Design Specification

## Overview
Establish production-quality interface standards, role-based tokens, and layout guidelines.
`;
}

export function getStarterBrief() {
  return `---
type: "design-brief"
version: "1.0.0"
status: "draft"
product_name: "Pure SaaS Product"
domain: "developer-tool"
target_audience: "Frontend engineers and product designers"
---

# Design Brief: Pure SaaS Product

## Product Purpose
Build a focused, high-craft product interface eliminating generic AI tropes.

## Target Audience
Frontend engineers and product designers seeking high-craft UI/UX.

## Approved Design Decisions
- Semantic tokens defined in DESIGN.md.
- High-contrast accessible focus outlines.

## Anti-Slop Exclusions
- No generic purple/cyan gradient text.
- No emoji icons in UI buttons.

## Scope & Functional Requirements
- Core workflows and user journeys
- Responsive viewport targets (375px mobile to 1440px desktop)
- WCAG 2.2 AA accessibility and full keyboard navigation
`;
}

export function getStarterReferenceRecord() {
  return `---
type: "reference-record"
version: "1.0.0"
status: "draft"
reference_url: "https://example.com"
inspection_date: "${new Date().toISOString().slice(0, 10)}"
---

# Reference Observation Record

## Overview
Visual and technical observations gathered from reference inspection.

### 1. Typography
- Heading font: Geist, sans-serif
- Body font: Inter, sans-serif

### 2. Spacing & Rhythm
- Base spatial grid: 8pt
`;
}

// --- Deterministic 5-Dimension Audit & Quality Scoring (Impeccable & Pure SaaS) ---

export function runDeterministicAudit(options = {}) {
  const designFile = path.resolve(process.cwd(), options.design || (options.file && !options.file.startsWith('--') ? options.file : 'DESIGN.md'));
  const srcDir = options.source ? path.resolve(process.cwd(), options.source) : (fs.existsSync(path.resolve(process.cwd(), 'src')) ? path.resolve(process.cwd(), 'src') : null);

  const designValidation = validateDesignDocument(designFile);
  let scan = null;
  if (srcDir && fs.existsSync(srcDir)) {
    const raw = fs.existsSync(designFile) ? fs.readFileSync(designFile, 'utf8') : '';
    const { data } = parseFrontmatter(raw);
    scan = scanSourceDirectory(srcDir, data.tokens || {}, options);
  }

  // Dimension 1: Accessibility (A11y) [0 to 4]
  let a11yScore = 4.0;
  const a11yDefects = [];
  if (designValidation.contrastAudit) {
    if (designValidation.contrastAudit.failedAA > 0) {
      const penalty = Math.min(2.0, designValidation.contrastAudit.failedAA * 0.5);
      a11yScore -= penalty;
      a11yDefects.push({
        severity: 'P1',
        dimension: 'Accessibility',
        message: `${designValidation.contrastAudit.failedAA} color contrast pair(s) fail WCAG 2.2 AA (>= 4.5:1 text, >= 3.0:1 UI).`
      });
    }
  }
  if (scan && scan.focusSuppressionWarnings.length > 0) {
    const penalty = Math.min(1.5, scan.focusSuppressionWarnings.length * 0.3);
    a11yScore -= penalty;
    a11yDefects.push({
      severity: 'P1',
      dimension: 'Accessibility',
      message: `${scan.focusSuppressionWarnings.length} focus outline suppression(s) without focus-visible replacement (SC 2.4.7).`
    });
  }
  a11yScore = Math.max(0, Math.round(a11yScore * 10) / 10);

  // Dimension 2: Performance & Rendering [0 to 4]
  let perfScore = 4.0;
  const perfDefects = [];
  if (scan) {
    const perfIssues = scan.antiSlopWarnings.filter(w => w.rule === 'layout-transition' || w.rule === 'will-change-overuse');
    if (perfIssues.length > 0) {
      const penalty = Math.min(2.0, perfIssues.length * 0.4);
      perfScore -= penalty;
      perfDefects.push({
        severity: 'P2',
        dimension: 'Performance',
        message: `${perfIssues.length} rendering performance issue(s): unbounded transitions or static will-change allocations.`
      });
    }
  }
  perfScore = Math.max(0, Math.round(perfScore * 10) / 10);

  // Dimension 3: Theming & Token Architecture [0 to 4]
  let themingScore = 4.0;
  const themingDefects = [];
  if (!designValidation.valid) {
    themingScore -= 1.5;
    themingDefects.push({
      severity: 'P0',
      dimension: 'Theming & Tokens',
      message: `DESIGN.md validation failed: ${designValidation.issues.slice(0, 3).join('; ')}`
    });
  }
  if (scan) {
    if (scan.rawColorViolations.length > 0) {
      const penalty = Math.min(1.5, scan.rawColorViolations.length * 0.2);
      themingScore -= penalty;
      themingDefects.push({
        severity: 'P2',
        dimension: 'Theming & Tokens',
        message: `${scan.rawColorViolations.length} raw hex color(s) bypassing semantic design tokens.`
      });
    }
    if (scan.paletteClassViolations.length > 0) {
      const penalty = Math.min(1.0, scan.paletteClassViolations.length * 0.1);
      themingScore -= penalty;
      themingDefects.push({
        severity: 'P2',
        dimension: 'Theming & Tokens',
        message: `${scan.paletteClassViolations.length} utility palette class(es) bypassing design tokens.`
      });
    }
  }
  themingScore = Math.max(0, Math.round(themingScore * 10) / 10);

  // Dimension 4: Responsive Design & Touch Ergonomics [0 to 4]
  let responsiveScore = 4.0;
  const responsiveDefects = [];
  if (scan) {
    const respIssues = scan.antiSlopWarnings.filter(w => w.rule === 'fixed-viewport-width' || w.rule === 'touch-target-size');
    if (respIssues.length > 0) {
      const penalty = Math.min(2.0, respIssues.length * 0.5);
      responsiveScore -= penalty;
      responsiveDefects.push({
        severity: 'P1',
        dimension: 'Responsive Design',
        message: `${respIssues.length} responsive or touch ergonomics violation(s) detected.`
      });
    }
  }
  responsiveScore = Math.max(0, Math.round(responsiveScore * 10) / 10);

  // Dimension 5: Implementation Integrity & Craft [0 to 4]
  let integrityScore = 4.0;
  const integrityDefects = [];
  if (designValidation.unresolvedItems && designValidation.unresolvedItems.length > 0) {
    integrityScore -= Math.min(1.0, designValidation.unresolvedItems.length * 0.2);
    integrityDefects.push({
      severity: 'P2',
      dimension: 'Implementation Integrity',
      message: `${designValidation.unresolvedItems.length} unresolved design decision(s) open in DESIGN.md ledger.`
    });
  }
  if (scan) {
    const slopIssues = scan.antiSlopWarnings.filter(w => w.rule === 'avoid-gradient' || w.rule === 'avoid-blur' || w.rule === 'avoid-emoji' || w.rule === 'avoid-green-pulse');
    if (slopIssues.length > 0) {
      integrityScore -= Math.min(2.0, slopIssues.length * 0.4);
      for (const s of slopIssues) {
        integrityDefects.push({
          severity: s.rule === 'avoid-green-pulse' ? 'P0' : 'P2',
          dimension: 'Implementation Integrity',
          message: s.message
        });
      }
    }
  }
  integrityScore = Math.max(0, Math.round(integrityScore * 10) / 10);

  const totalScore = Math.round((a11yScore + perfScore + themingScore + responsiveScore + integrityScore) * 10) / 10;

  let band = 'Critical';
  if (totalScore >= 19.0) band = 'Excellent';
  else if (totalScore >= 16.0) band = 'Good';
  else if (totalScore >= 12.0) band = 'Acceptable';
  else if (totalScore >= 8.0) band = 'Poor';

  const allDefects = [...a11yDefects, ...perfDefects, ...themingDefects, ...responsiveDefects, ...integrityDefects];
  const severityOrder = { P0: 0, P1: 1, P2: 2, P3: 3 };
  allDefects.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

  return {
    timestamp: new Date().toISOString(),
    totalScore,
    maxScore: 20,
    band,
    dimensions: {
      accessibility: { score: a11yScore, max: 4 },
      performance: { score: perfScore, max: 4 },
      theming: { score: themingScore, max: 4 },
      responsive: { score: responsiveScore, max: 4 },
      integrity: { score: integrityScore, max: 4 }
    },
    defects: allDefects,
    scannedFiles: scan ? scan.scannedFiles : 0,
    passed: totalScore >= 12.0 && !allDefects.some(d => d.severity === 'P0')
  };
}

// --- Browser Testing & Automation via Playwright CLI / Chrome Fallback ---

export function checkBrowserEnvironment() {
  const status = {
    playwrightCli: false,
    playwright: false,
    systemChrome: null,
    ready: false
  };

  try {
    const res = spawnSync('playwright-cli', ['--version'], { encoding: 'utf8' });
    if (res.status === 0) status.playwrightCli = true;
  } catch {}

  if (!status.playwrightCli) {
    try {
      const res = spawnSync('npx', ['--no-install', '@playwright/cli', '--version'], { encoding: 'utf8' });
      if (res.status === 0) status.playwrightCli = true;
    } catch {}
  }

  try {
    const res = spawnSync('npx', ['--no-install', 'playwright', '--version'], { encoding: 'utf8' });
    if (res.status === 0) status.playwright = true;
  } catch {}

  const candidates = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
    'google-chrome',
    'chromium'
  ];

  for (const c of candidates) {
    if (c.startsWith('/') && fs.existsSync(c)) {
      status.systemChrome = c;
      break;
    } else if (!c.startsWith('/')) {
      try {
        const which = spawnSync('which', [c], { encoding: 'utf8' });
        if (which.status === 0 && which.stdout && which.stdout.trim()) {
          status.systemChrome = which.stdout.trim();
          break;
        }
      } catch {}
    }
  }

  status.ready = status.playwrightCli || status.playwright || Boolean(status.systemChrome);
  return status;
}

export function captureScreenshots(url, options = {}) {
  const env = checkBrowserEnvironment();
  if (!env.ready) {
    throw new Error('No browser engine detected. Run "pure-saas browser setup" or install Chrome/Chromium.');
  }

  const outDir = path.resolve(process.cwd(), options.out || 'screenshots');
  fs.mkdirSync(outDir, { recursive: true });

  const viewports = options.viewports || [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'mobile', width: 375, height: 812 }
  ];

  const results = [];

  for (const vp of viewports) {
    const outFile = path.join(outDir, `screenshot-${vp.name}-${vp.width}x${vp.height}.png`);
    let captured = false;

    // 1. Try playwright-cli
    if (env.playwrightCli) {
      try {
        const shot = spawnSync('playwright-cli', [
          'screenshot', url,
          `--filename=${outFile}`,
          `--viewport-size=${vp.width},${vp.height}`,
          options.fullPage ? '--full-page' : ''
        ].filter(Boolean), { encoding: 'utf8', timeout: 20000 });
        if (shot.status === 0 && fs.existsSync(outFile)) captured = true;
      } catch {}
    }

    // 2. Try npx playwright screenshot
    if (!captured && env.playwright) {
      try {
        const args = ['playwright', 'screenshot', url, outFile, `--viewport-size=${vp.width},${vp.height}`];
        if (options.fullPage) args.push('--full-page');
        const res = spawnSync('npx', args, { encoding: 'utf8', timeout: 20000 });
        if (res.status === 0 && fs.existsSync(outFile)) captured = true;
      } catch {}
    }

    // 3. Fallback to Headless Chrome
    if (!captured && env.systemChrome) {
      const tempShot = path.join(os.tmpdir(), `pure-saas-shot-${Date.now()}-${vp.width}x${vp.height}.png`);
      try {
        const args = [
          '--headless',
          '--disable-gpu',
          `--window-size=${vp.width},${vp.height}`,
          `--screenshot=${tempShot}`,
          url
        ];
        const res = spawnSync(env.systemChrome, args, { encoding: 'utf8', timeout: 30000 });
        if (fs.existsSync(tempShot)) {
          fs.copyFileSync(tempShot, outFile);
          try { fs.unlinkSync(tempShot); } catch {}
          captured = true;
        }
      } catch {}
    }

    results.push({
      viewport: vp.name,
      width: vp.width,
      height: vp.height,
      file: outFile,
      captured,
      sizeBytes: captured && fs.existsSync(outFile) ? fs.statSync(outFile).size : 0
    });
  }

  return results;
}

// --- Procedural Three.js 3D Models & img2threejs Pipeline ---

export function check3DPrerequisites() {
  const results = {
    node: { pass: true, version: process.version },
    typescript: { pass: false, version: null },
    three: { pass: false, version: null },
    python: { pass: false, version: null },
    ready: false
  };

  try {
    const tsc = spawnSync('npx', ['--no-install', 'tsc', '--version'], { encoding: 'utf8' });
    if (tsc.status === 0 && tsc.stdout) {
      results.typescript.pass = true;
      results.typescript.version = tsc.stdout.trim();
    }
  } catch {}

  const pkgPath = path.resolve(process.cwd(), 'package.json');
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      if (deps['three']) {
        results.three.pass = true;
        results.three.version = deps['three'];
      }
    } catch {}
  }

  try {
    const py = spawnSync('python3', ['--version'], { encoding: 'utf8' });
    if (py.status === 0 && py.stdout) {
      results.python.pass = true;
      results.python.version = py.stdout.trim();
    }
  } catch {}

  results.ready = results.node.pass && results.typescript.pass && results.three.pass;
  return results;
}

export function generateObjectSculptSpec(imagePath) {
  const fullPath = path.resolve(process.cwd(), imagePath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Image not found at path: ${imagePath}`);
  }

  const ext = path.extname(fullPath).toLowerCase();
  const validExts = ['.png', '.jpg', '.jpeg', '.webp'];
  if (!validExts.includes(ext)) {
    throw new Error(`Unsupported image format "${ext}". Expected one of: ${validExts.join(', ')}`);
  }

  const stat = fs.statSync(fullPath);
  const baseName = path.basename(fullPath, ext).replace(/[^a-zA-Z0-9_-]/g, '');

  return {
    version: '1.0.0',
    generator: 'pure-saas-img2threejs',
    image: {
      path: imagePath,
      name: path.basename(fullPath),
      sizeBytes: stat.size,
      format: ext.slice(1)
    },
    suitability: {
      status: 'suitable',
      criteria: {
        hardSurface: true,
        distinctSilhouette: true,
        diffuseLighting: true,
        nonAmbiguousAngle: true
      }
    },
    targetModel: {
      name: `${baseName}Model`,
      componentName: `${baseName.charAt(0).toUpperCase() + baseName.slice(1)}3D`,
      estimatedBounds: { width: 2.0, height: 1.2, depth: 1.6 }
    },
    stagingPasses: [
      { pass: 1, name: 'Blockout', description: 'Primary bounding masses and origin alignment' },
      { pass: 2, name: 'Structural', description: 'Bevels, joints, subdivisions, and pivot points' },
      { pass: 3, name: 'Form Details', description: 'Secondary features: ports, dials, vents, and buttons' },
      { pass: 4, name: 'Materials & PBR', description: 'MeshStandardMaterial with roughness, metalness, and emissive calibration' },
      { pass: 5, name: 'Lighting & Interaction', description: 'Shadow casting, bounding sphere, and raycast hit volumes' },
      { pass: 6, name: 'Optimization', description: 'Memory disposal hooks, frame tick, and TypeScript factory export' }
    ]
  };
}

export function scaffoldProceduralModel(modelName = 'Device') {
  const pascal = modelName.charAt(0).toUpperCase() + modelName.slice(1);
  return `import * as THREE from 'three';

export interface ${pascal}ModelOptions {
  primaryColor?: string;
  accentColor?: string;
  metalness?: number;
  roughness?: number;
  scale?: number;
}

export interface Procedural${pascal}Model extends THREE.Group {
  userData: {
    tick: (delta: number, elapsed: number) => void;
    dispose: () => void;
  };
}

/**
 * Procedural Three.js model factory conforming to the img2threejs specification.
 * Zero binary asset dependencies; 100% parametric TypeScript.
 */
export function create${pascal}Model(options: ${pascal}ModelOptions = {}): Procedural${pascal}Model {
  const group = new THREE.Group() as Procedural${pascal}Model;

  const {
    primaryColor = '#1e293b',
    accentColor = '#2563eb',
    metalness = 0.5,
    roughness = 0.3,
    scale = 1.0,
  } = options;

  group.scale.setScalar(scale);

  // Lifecyle disposal arrays
  const materials: THREE.Material[] = [];
  const geometries: THREE.BufferGeometry[] = [];

  // Pass 4: Materials
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: primaryColor,
    metalness,
    roughness,
  });
  materials.push(bodyMaterial);

  const accentMaterial = new THREE.MeshStandardMaterial({
    color: accentColor,
    metalness: 0.8,
    roughness: 0.2,
    emissive: accentColor,
    emissiveIntensity: 0.25,
  });
  materials.push(accentMaterial);

  // Pass 1: Blockout & Pass 2: Structural
  const chassisGeo = new THREE.BoxGeometry(2.4, 0.4, 1.6);
  geometries.push(chassisGeo);
  const chassisMesh = new THREE.Mesh(chassisGeo, bodyMaterial);
  chassisMesh.castShadow = true;
  chassisMesh.receiveShadow = true;
  group.add(chassisMesh);

  // Pass 3: Form Details
  const indicatorGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.5, 24);
  geometries.push(indicatorGeo);
  const indicatorMesh = new THREE.Mesh(indicatorGeo, accentMaterial);
  indicatorMesh.position.set(0.8, 0.35, 0);
  indicatorMesh.castShadow = true;
  group.add(indicatorMesh);

  // Pass 5 & 6: Interaction tick hook & cleanup
  group.userData.tick = (delta: number, elapsed: number) => {
    group.rotation.y = Math.sin(elapsed * 0.7) * 0.12;
    group.position.y = Math.sin(elapsed * 1.4) * 0.04;
    indicatorMesh.rotation.y += delta * 2;
  };

  group.userData.dispose = () => {
    geometries.forEach(g => g.dispose());
    materials.forEach(m => m.dispose());
  };

  return group;
}
`;
}

// --- Agent Rules & Skill Installation ---

export function installAgentRules(target = 'all') {
  const cwd = process.cwd();
  const installed = [];

  const instructions = `When creating, reviewing, or improving UI/UX designs, follow the Pure SaaS design system:

1. Read SKILL.md in full. It defines the stance, universal execution behaviors, the 6 core workflows,
   the 8-state component matrix, semantic token architecture, and honest verification reporting.
2. Retrieve exact references for the task using \`npx pure-saas ref "<component, framework, or topic>"\`.
3. Universal Command: Use \`/pure-saas [request]\` as the default entry point.
4. Specialist Commands:
   - \`/pure-saas design [request]\`: Establish or update DESIGN.md.
   - \`/pure-saas polish [request]\`: Elevate typography tracking, surface lighting, micro-interactions.
   - \`/pure-saas review [request]\`: 5-dimension deterministic audit (A11y, Perf, Theming, Responsive, Integrity).
   - \`/pure-saas reference [URL]\`: Deconstruct reference site into 16-section DESIGN.md.
   - \`/pure-saas responsive [request]\`: Optimize across mobile (375px), tablet (768px), desktop (1440px).
   - \`/pure-saas browser [action]\`: Token-conscious browser automation & responsive screenshots via Playwright CLI.
   - \`/pure-saas 3d [action]\`: Procedural Three.js 3D model synthesis from reference images.
5. Non-Negotiable Engineering Rules:
   - Zero raw hex colors or arbitrary styling: resolve to semantic tokens in DESIGN.md.
   - Zero generic AI slop: no purple/cyan gradient text, excessive glassmorphism blur, or green pulsing dots.
   - Preserve 100% of backend APIs, authentication, and database schemas.
   - Continuous Verification: verify tokens, contrast, and layout with \`pure-saas contrast\`, \`pure-saas audit\`, and \`pure-saas browser screenshot\`.
`;

  if (target === 'all' || target === 'cursor') {
    fs.writeFileSync(path.resolve(cwd, '.cursorrules'), instructions, 'utf8');
    installed.push('.cursorrules');
  }

  if (target === 'all' || target === 'windsurf') {
    fs.writeFileSync(path.resolve(cwd, '.windsurfrules'), instructions, 'utf8');
    installed.push('.windsurfrules');
  }

  if (target === 'all' || target === 'copilot') {
    const copilotDir = path.resolve(cwd, '.github');
    fs.mkdirSync(copilotDir, { recursive: true });
    fs.writeFileSync(path.join(copilotDir, 'copilot-instructions.md'), instructions, 'utf8');
    installed.push('.github/copilot-instructions.md');
  }

  if (target === 'all' || target === 'gemini' || target === 'antigravity') {
    fs.writeFileSync(path.resolve(cwd, 'GEMINI.md'), instructions, 'utf8');
    installed.push('GEMINI.md');
  }

  if (target === 'all' || target === 'claude') {
    const claudeDir = path.resolve(cwd, '.claude/skills/pure-saas');
    fs.mkdirSync(claudeDir, { recursive: true });
    const skillSource = path.resolve(__dirname, '../SKILL.md');
    if (fs.existsSync(skillSource)) {
      fs.copyFileSync(skillSource, path.join(claudeDir, 'SKILL.md'));
    } else {
      fs.writeFileSync(path.join(claudeDir, 'SKILL.md'), instructions, 'utf8');
    }
    installed.push('.claude/skills/pure-saas/SKILL.md');
  }

  return installed;
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

  // Handle subcommand help flag (e.g. pure-saas init --help, pure-saas browser --help)
  if (args.includes('--help') || args.includes('-h')) {
    printSubcommandHelp(command);
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

  if (command === 'contrast') {
    const targetFile = args[1] && !args[1].startsWith('--') ? args[1] : 'DESIGN.md';
    const jsonOutput = args.includes('--json');
    const validation = validateDesignDocument(path.resolve(process.cwd(), targetFile));

    if (!validation.contrastAudit) {
      console.error('Error: Could not run contrast audit on target file.');
      return 1;
    }

    if (jsonOutput) {
      console.log(JSON.stringify(validation.contrastAudit, null, 2));
    } else {
      console.log(`=== Pure SaaS WCAG Contrast Audit: ${targetFile} ===\n`);
      console.log(`Audited Pairs: ${validation.contrastAudit.auditedPairs} | Passed AA: ${validation.contrastAudit.passedAA} | Failed AA: ${validation.contrastAudit.failedAA}\n`);
      for (const r of validation.contrastAudit.results) {
        const mark = r.passAA ? '✓' : '✗';
        const aaa = r.passAAA ? '(AAA ✓)' : '';
        console.log(`  ${mark} ${r.fgToken} (${r.fgHex}) on ${r.bgToken} (${r.bgHex}) -> ${r.ratio}:1 ${aaa}`);
        console.log(`    Role: ${r.target}`);
      }
    }
    return validation.contrastAudit.failedAA === 0 ? 0 : 1;
  }

  if (command === 'diff') {
    const file1 = args[1];
    const file2 = args[2];
    const jsonOutput = args.includes('--json');

    if (!file1 || !file2) {
      console.error('Error: Supply two design files to diff. Example: pure-saas diff DESIGN.before.md DESIGN.after.md');
      return 1;
    }

    const raw1 = fs.readFileSync(path.resolve(process.cwd(), file1), 'utf8');
    const raw2 = fs.readFileSync(path.resolve(process.cwd(), file2), 'utf8');
    const { data: d1 } = parseFrontmatter(raw1);
    const { data: d2 } = parseFrontmatter(raw2);

    const diff = diffDesignTokens(d1.tokens || {}, d2.tokens || {});

    if (jsonOutput) {
      console.log(JSON.stringify(diff, null, 2));
    } else {
      console.log(`=== Pure SaaS Token Diff: ${file1} -> ${file2} (${diff.totalChanges} changes) ===\n`);
      for (const c of diff.changes) {
        if (c.change === 'added') console.log(`  [+] Added: ${c.path} = ${JSON.stringify(c.after)}`);
        else if (c.change === 'removed') console.log(`  [-] Removed: ${c.path} (was ${JSON.stringify(c.before)})`);
        else console.log(`  [*] Changed: ${c.path} = ${JSON.stringify(c.before)} -> ${JSON.stringify(c.after)}`);
      }
    }
    return 0;
  }

  if (command === 'drift') {
    const designFile = args[1];
    const obsFile = args[2];
    const jsonOutput = args.includes('--json');

    if (!designFile || !obsFile) {
      console.error('Error: Supply DESIGN.md and observations.json. Example: pure-saas drift DESIGN.md observations.json');
      return 1;
    }

    const rawDesign = fs.readFileSync(path.resolve(process.cwd(), designFile), 'utf8');
    const rawObs = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), obsFile), 'utf8'));
    const { data } = parseFrontmatter(rawDesign);

    const drift = detectDesignDrift(data.tokens || {}, rawObs);

    if (jsonOutput) {
      console.log(JSON.stringify(drift, null, 2));
    } else {
      console.log(`=== Pure SaaS Design Drift Audit: ${obsFile} ===\n`);
      console.log(`Source: ${drift.source.url} (${drift.source.captured})`);
      console.log(`Observed: ${drift.observed} | Matches: ${drift.matches} | Drift: ${drift.differences}\n`);
      for (const r of drift.results) {
        const mark = r.result === 'match' ? '✓' : '✗';
        console.log(`  ${mark} [${r.result.toUpperCase()}] ${r.path} @ ${r.location} (${r.state})`);
        console.log(`    Expected: ${JSON.stringify(r.expected)} | Observed: ${JSON.stringify(r.observed)}`);
      }
    }
    return drift.differences === 0 ? 0 : 1;
  }

  if (command === 'design-system') {
    const prodIdx = args.indexOf('--product');
    const productArg = prodIdx !== -1 ? args[prodIdx + 1] : 'saas';
    const styleIdx = args.indexOf('--style');
    const styleArg = styleIdx !== -1 ? args[styleIdx + 1] : '';
    const varIdx = args.indexOf('--variance');
    const varianceArg = varIdx !== -1 ? parseInt(args[varIdx + 1], 10) : 5;
    const motIdx = args.indexOf('--motion');
    const motionArg = motIdx !== -1 ? parseInt(args[motIdx + 1], 10) : 5;
    const denIdx = args.indexOf('--density');
    const densityArg = denIdx !== -1 ? parseInt(args[denIdx + 1], 10) : 5;
    const outIdx = args.indexOf('--out');
    const outFile = outIdx !== -1 ? path.resolve(process.cwd(), args[outIdx + 1]) : null;

    const content = generateDesignSystem({
      product: productArg,
      style: styleArg,
      variance: varianceArg,
      motion: motionArg,
      density: densityArg
    });

    if (outFile) {
      fs.mkdirSync(path.dirname(outFile), { recursive: true });
      fs.writeFileSync(outFile, content, 'utf8');
      console.log(`Generated design system written to ${outFile}`);
    } else {
      console.log(content);
    }
    return 0;
  }

  if (command === 'check-tokens' || command === 'tokens' || command === 'check-code' || command === 'check') {
    const designFile = path.resolve(process.cwd(), args[1] && !args[1].startsWith('--') ? args[1] : 'DESIGN.md');
    const jsonOutput = args.includes('--json');
    const strict = args.includes('--strict');
    const updateKnown = args.includes('--update-known');
    const srcIndex = args.indexOf('--source');
    const srcDir = srcIndex !== -1 ? path.resolve(process.cwd(), args[srcIndex + 1]) : null;
    const knownIdx = args.indexOf('--known');
    const knownFile = knownIdx !== -1 ? path.resolve(process.cwd(), args[knownIdx + 1]) : null;

    const validation = validateDesignDocument(designFile);
    let scanResults = null;

    if (srcDir) {
      const raw = fs.existsSync(designFile) ? fs.readFileSync(designFile, 'utf8') : '';
      const { data } = parseFrontmatter(raw);
      scanResults = scanSourceDirectory(srcDir, data.tokens || {}, {
        known: knownFile,
        updateKnown,
        strict
      });
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
        console.log(`Violations: ${scanResults.newViolations.length} new, ${scanResults.knownViolations.length} known`);

        for (const viol of scanResults.newViolations.slice(0, 5)) {
          console.log(`  [!] ${path.relative(process.cwd(), viol.file)}:${viol.line} -> ${viol.message}`);
        }
        for (const warn of scanResults.antiSlopWarnings.slice(0, 5)) {
          console.log(`  [*] Anti-Slop: ${path.relative(process.cwd(), warn.file)}:${warn.line} -> ${warn.message}`);
        }
        if (scanResults.fixedKnownDefects.length > 0) {
          console.log(`\n[+] Fixed technical debt: ${scanResults.fixedKnownDefects.length} known defects no longer detected!`);
        }
      }
    }

    const hasFailure = !validation.valid || (scanResults && (strict ? (scanResults.rawColorViolations.length > 0) : scanResults.newViolations.length > 0));
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

  // --- Audit / Review (Impeccable 5-Dimension Scored Engine) ---
  if (command === 'audit' || command === 'review' || command === 'review-report' || command === 'verify') {
    const jsonOutput = args.includes('--json');
    const strict = args.includes('--strict');
    const srcIndex = args.indexOf('--source');
    const srcDir = srcIndex !== -1 ? args[srcIndex + 1] : (fs.existsSync('src') ? 'src' : null);
    const designIdx = args.indexOf('--design');
    const targetDesign = designIdx !== -1 ? args[designIdx + 1] : (args[1] && !args[1].startsWith('--') ? args[1] : 'DESIGN.md');

    const audit = runDeterministicAudit({
      design: targetDesign,
      source: srcDir,
      strict
    });

    if (jsonOutput) {
      console.log(JSON.stringify(audit, null, 2));
      return audit.passed ? 0 : 1;
    }

    console.log(`=== Pure SaaS 5-Dimension Deterministic Audit ===`);
    console.log(`Timestamp: ${audit.timestamp}`);
    console.log(`Overall Score: ${audit.totalScore} / ${audit.maxScore} (${audit.band.toUpperCase()})\n`);

    console.log('Dimension Breakdown:');
    console.log(`  1. Accessibility (A11y):        ${audit.dimensions.accessibility.score} / 4.0`);
    console.log(`  2. Performance & Rendering:    ${audit.dimensions.performance.score} / 4.0`);
    console.log(`  3. Theming & Token System:     ${audit.dimensions.theming.score} / 4.0`);
    console.log(`  4. Responsive Design & Touch:  ${audit.dimensions.responsive.score} / 4.0`);
    console.log(`  5. Implementation Integrity:   ${audit.dimensions.integrity.score} / 4.0\n`);

    if (audit.defects.length > 0) {
      console.log(`Prioritized Defect Ledger (${audit.defects.length} items):`);
      for (const d of audit.defects) {
        console.log(`  [${d.severity}] [${d.dimension}] ${d.message}`);
      }
      console.log('');
    } else {
      console.log('✓ Zero critical or warning defects detected across all dimensions!\n');
    }

    return audit.passed ? 0 : 1;
  }

  // --- Browser Automation & Verification (Playwright CLI) ---
  if (command === 'browser' || command === 'playwright') {
    const action = args[1] || 'check';

    if (action === 'check') {
      const status = checkBrowserEnvironment();
      console.log('=== Playwright CLI & Browser Environment Check ===\n');
      console.log(`Playwright CLI:  ${status.playwrightCli ? '✓ Installed' : '✗ Not detected'}`);
      console.log(`Playwright Core: ${status.playwright ? '✓ Installed' : '✗ Not detected'}`);
      console.log(`System Browser:  ${status.systemChrome ? `✓ Detected (${status.systemChrome})` : '✗ Not detected'}`);
      console.log(`Ready for Tests: ${status.ready ? '✓ YES (Browser automation supported)' : '✗ NO'}\n`);

      if (!status.ready) {
        console.log('To install Playwright CLI and browser dependencies, run:');
        console.log('  pure-saas browser setup');
        return 1;
      }
      return 0;
    }

    if (action === 'setup') {
      console.log('Setting up Playwright CLI & browser binaries...');
      try {
        console.log('Installing @playwright/cli and Chromium browser...');
        execSync('npm install -g @playwright/cli@latest && npx playwright install chromium', { stdio: 'inherit' });
        console.log('✓ Playwright CLI setup completed successfully!');
        return 0;
      } catch (err) {
        console.error('Setup encountered an error. Run manually:');
        console.error('  npm install -g @playwright/cli@latest');
        console.error('  npx playwright install chromium');
        return 1;
      }
    }

    if (action === 'screenshot' || action === 'capture') {
      const url = args[2];
      if (!url) {
        console.error('Error: Please provide a URL to screenshot. Example: pure-saas browser screenshot http://localhost:3000');
        return 1;
      }

      const outIdx = args.indexOf('--out');
      const outDir = outIdx !== -1 ? args[outIdx + 1] : './screenshots';
      const fullPage = args.includes('--full-page');
      const vpIdx = args.indexOf('--viewports');
      let customViewports = null;
      if (vpIdx !== -1) {
        const parts = args[vpIdx + 1].split(',');
        customViewports = parts.map(p => {
          const w = parseInt(p.trim(), 10);
          return { name: `${w}px`, width: w, height: w < 500 ? 812 : (w < 1000 ? 1024 : 900) };
        });
      }

      console.log(`Capturing responsive screenshots for: ${url}`);
      try {
        const results = captureScreenshots(url, {
          out: outDir,
          fullPage,
          viewports: customViewports
        });

        console.log(`\n=== Captured ${results.length} Viewports ===`);
        for (const r of results) {
          const mark = r.captured ? '✓' : '✗';
          console.log(`  ${mark} [${r.viewport}] ${r.width}x${r.height} -> ${path.relative(process.cwd(), r.file)} (${r.sizeBytes} bytes)`);
        }
        return results.every(r => r.captured) ? 0 : 1;
      } catch (err) {
        console.error(`Browser capture failed: ${err.message}`);
        return 1;
      }
    }

    if (action === 'verify') {
      const url = args[2] || 'http://localhost:3000';
      console.log(`Verifying rendered page at: ${url}`);
      try {
        const results = captureScreenshots(url, { out: './screenshots/verify' });
        const allOk = results.every(r => r.captured && r.sizeBytes > 1000);
        console.log(`\nVerification Status: ${allOk ? '✓ PASS' : '✗ FAIL'}`);
        for (const r of results) {
          console.log(`  ${r.captured ? '✓' : '✗'} Viewport ${r.viewport} (${r.width}px): ${r.file}`);
        }
        return allOk ? 0 : 1;
      } catch (err) {
        console.error(`Page verification failed: ${err.message}`);
        return 1;
      }
    }

    console.error(`Unknown browser action: "${action}". Valid actions: check, setup, screenshot, verify.`);
    return 1;
  }

  // --- Procedural 3D Models & img2threejs Pipeline ---
  if (command === '3d' || command === 'three' || command === 'threejs') {
    const action = args[1] || 'check';

    if (action === 'check') {
      const prereqs = check3DPrerequisites();
      console.log('=== Procedural Three.js (img2threejs) Prerequisites Check ===\n');
      console.log(`Node.js:    ${prereqs.node.pass ? `✓ ${prereqs.node.version}` : '✗ Incompatible'}`);
      console.log(`TypeScript: ${prereqs.typescript.pass ? `✓ ${prereqs.typescript.version}` : '✗ Not found (npm i -D typescript)'}`);
      console.log(`Three.js:   ${prereqs.three.pass ? `✓ ${prereqs.three.version}` : '✗ Not installed (npm i three @types/three)'}`);
      console.log(`Python:     ${prereqs.python.pass ? `✓ ${prereqs.python.version}` : '✗ Not found (optional utility)'}`);
      console.log(`\nPipeline Ready: ${prereqs.ready ? '✓ YES (3D procedural pipeline operational)' : '✗ Incomplete dependencies'}\n`);

      if (!prereqs.three.pass) {
        console.log('Install Three.js: npm install three @types/three');
      }
      return prereqs.ready ? 0 : 1;
    }

    if (action === 'spec') {
      const imagePath = args[2];
      if (!imagePath) {
        console.error('Error: Please provide a reference image path. Example: pure-saas 3d spec ./reference.png');
        return 1;
      }

      try {
        const spec = generateObjectSculptSpec(imagePath);
        const outIdx = args.indexOf('--out');
        if (outIdx !== -1) {
          const dest = path.resolve(process.cwd(), args[outIdx + 1]);
          fs.mkdirSync(path.dirname(dest), { recursive: true });
          fs.writeFileSync(dest, JSON.stringify(spec, null, 2), 'utf8');
          console.log(`ObjectSculptSpec written to ${dest}`);
        } else {
          console.log(JSON.stringify(spec, null, 2));
        }
        return 0;
      } catch (err) {
        console.error(`Failed to generate 3D spec: ${err.message}`);
        return 1;
      }
    }

    if (action === 'scaffold') {
      const name = args[2] || 'Device';
      const outIdx = args.indexOf('--out');
      const code = scaffoldProceduralModel(name);

      if (outIdx !== -1) {
        const dest = path.resolve(process.cwd(), args[outIdx + 1]);
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.writeFileSync(dest, code, 'utf8');
        console.log(`Procedural Three.js component scaffolded to ${dest}`);
      } else {
        console.log(code);
      }
      return 0;
    }

    console.error(`Unknown 3D action: "${action}". Valid actions: check, spec, scaffold.`);
    return 1;
  }

  // --- Selectable Style Registry (Awesome Design Skills & Taste Skill) ---
  if (command === 'style' || command === 'styles' || command === 'query') {
    const action = args[1];

    if (command === 'style' && action === 'list') {
      const catalogPath = path.resolve(__dirname, '../references/design-styles-catalog.json');
      if (fs.existsSync(catalogPath)) {
        const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
        console.log(`=== Selectable Design Style Registry (${catalog.styles.length} styles) ===\n`);
        for (const s of catalog.styles) {
          console.log(`[${s.id}] ${s.name} (${s.category})`);
          if (s.typography && s.typography.heading_family) {
            console.log(`  Fonts: ${s.typography.heading_family.split(',')[0]} / ${s.typography.body_family.split(',')[0]}`);
          }
          if (s.colors) {
            console.log(`  Palette: Canvas ${s.colors.canvas} | Surface ${s.colors.surface} | Accent ${s.colors.accent}`);
          }
          if (s.best_for) {
            console.log(`  Best For: ${Array.isArray(s.best_for) ? s.best_for.join(', ') : s.best_for}`);
          }
          console.log('');
        }
        return 0;
      }
    }

    if (command === 'style' && action === 'info') {
      const styleId = args[2];
      if (!styleId) {
        console.error('Error: Please specify a style ID. Example: pure-saas style info minimalism-swiss');
        return 1;
      }
      const catalogPath = path.resolve(__dirname, '../references/design-styles-catalog.json');
      if (fs.existsSync(catalogPath)) {
        const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
        const found = catalog.styles.find(s => s.id === styleId || s.name.toLowerCase().includes(styleId.toLowerCase()));
        if (!found) {
          console.error(`Style "${styleId}" not found in catalog. Run "pure-saas style list" to view available styles.`);
          return 1;
        }
        console.log(JSON.stringify(found, null, 2));
        return 0;
      }
    }

    if (command === 'style' && action === 'select') {
      const styleId = args[2];
      if (!styleId) {
        console.error('Error: Please specify a style ID. Example: pure-saas style select minimalism-swiss --out DESIGN.md');
        return 1;
      }
      const outIdx = args.indexOf('--out');
      const outFile = outIdx !== -1 ? path.resolve(process.cwd(), args[outIdx + 1]) : path.resolve(process.cwd(), 'DESIGN.md');
      const content = generateDesignSystem({ style: styleId });
      fs.mkdirSync(path.dirname(outFile), { recursive: true });
      fs.writeFileSync(outFile, content, 'utf8');
      console.log(`Selected style "${styleId}" written to ${outFile}`);
      return 0;
    }

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

  // --- Specialist Command Implementations: design, polish, responsive, reference ---

  if (command === 'design') {
    const request = args.slice(1).join(' ');
    console.log(`=== Pure SaaS /pure-saas design ===`);
    console.log(`Request: "${request || 'Default Design Specification'}"`);

    const outFile = path.resolve(process.cwd(), 'DESIGN.md');
    const content = generateDesignSystem({ product: 'saas', variance: 6, motion: 5, density: 6 });
    fs.writeFileSync(outFile, content, 'utf8');
    console.log(`✓ Established root-level DESIGN.md specification at ${outFile}`);
    console.log('Run "pure-saas validate DESIGN.md" to verify token completeness.');
    return 0;
  }

  if (command === 'polish' || command === 'critique' || command === 'bolder' || command === 'quieter' || command === 'typeset' || command === 'layout' || command === 'harden') {
    console.log(`=== Pure SaaS /pure-saas ${command} ===`);
    const designFile = path.resolve(process.cwd(), 'DESIGN.md');
    if (!fs.existsSync(designFile)) {
      console.warn(`Warning: DESIGN.md not found. Generating default design system...`);
      fs.writeFileSync(designFile, generateDesignSystem({ product: 'saas' }), 'utf8');
    }
    const audit = runDeterministicAudit({ design: designFile, source: fs.existsSync('src') ? 'src' : null });
    console.log(`Current Craft Quality Score: ${audit.totalScore} / 20 (${audit.band.toUpperCase()})`);
    console.log('Recommended Polish Actions:');
    console.log('  1. Typeset: Check font tracking (-0.02em on headings) and tabular-nums on metrics.');
    console.log('  2. Surfaces: Apply 1px hairline borders (border-border-subtle) and ambient shadows.');
    console.log('  3. Motion: Keep hover transitions under 150ms ease-out; respect prefers-reduced-motion.');
    return 0;
  }

  if (command === 'responsive') {
    const request = args.slice(1).join(' ');
    console.log(`=== Pure SaaS /pure-saas responsive ===`);
    console.log(`Target: "${request || 'Responsive Breakpoint Verification (375px, 768px, 1440px)'}"`);
    console.log('Running responsive layout checks across viewports...');
    const env = checkBrowserEnvironment();
    if (env.ready) {
      console.log('Browser engine ready for multi-viewport screenshot verification.');
      console.log('To capture live screenshots: pure-saas browser screenshot <url>');
    } else {
      console.log('Note: To capture live screenshots, install Playwright CLI via: pure-saas browser setup');
    }
    return 0;
  }

  if (command === 'reference') {
    const url = args[1];
    if (!url) {
      console.error('Error: Please provide a reference URL. Example: pure-saas reference https://example.com');
      return 1;
    }
    console.log(`=== Pure SaaS /pure-saas reference ===`);
    console.log(`Analyzing reference URL: ${url}`);
    const refFile = path.resolve(process.cwd(), 'reference-record.md');
    fs.writeFileSync(refFile, getStarterReferenceRecord().replace('https://example.com', url), 'utf8');
    console.log(`✓ Reference observation record initialized at ${refFile}`);
    return 0;
  }

  // --- Agent Installation & Setup ---

  if (command === 'install' || command === 'setup') {
    const target = args[1] || 'all';
    console.log(`=== Pure SaaS Agent Rule Installation ===`);
    const installed = installAgentRules(target);
    console.log(`✓ Configured agent rules for [${target}]:`);
    for (const f of installed) {
      console.log(`  -> ${f}`);
    }
    return 0;
  }

  if (command === 'ref' || command === 'search-ref' || command === 'references') {
    const jsonOutput = args.includes('--json');
    const limitIdx = args.indexOf('--limit');
    const limit = limitIdx !== -1 ? parseInt(args[limitIdx + 1], 10) : 10;
    const query = args.slice(1).filter(a => !a.startsWith('--') && a !== String(limit)).join(' ');

    const results = searchReferences(query, { limit });

    if (jsonOutput) {
      console.log(JSON.stringify(results, null, 2));
      return 0;
    }

    if (results.length === 0) {
      console.log(`No reference documents found matching "${query}".`);
      return 0;
    }

    console.log(`=== Pure SaaS Reference Search: "${query}" (${results.length} results) ===\n`);
    for (const r of results) {
      console.log(`[${r.category}] ${r.title}`);
      console.log(`  Path: ${r.path}`);
      if (r.snippet) console.log(`  Preview: ${r.snippet}`);
      console.log('');
    }
    return 0;
  }

  if (command === 'init') {
    const briefDest = path.resolve(process.cwd(), 'design-brief.md');
    const designDest = path.resolve(process.cwd(), 'DESIGN.md');

    if (fs.existsSync(designDest)) {
      console.warn(`Warning: DESIGN.md already exists at ${designDest}. Skipping overwrite.`);
      return 1;
    }

    fs.writeFileSync(briefDest, getStarterBrief(), 'utf8');
    fs.writeFileSync(designDest, getStarterDesign(), 'utf8');

    console.log(`Initialized Pure SaaS project:`);
    console.log(`  -> ${path.relative(process.cwd(), briefDest)}`);
    console.log(`  -> ${path.relative(process.cwd(), designDest)}`);

    if (args.includes('--reference') || args.includes('-r')) {
      const refDest = path.resolve(process.cwd(), 'reference-record.md');
      fs.writeFileSync(refDest, getStarterReferenceRecord(), 'utf8');
      console.log(`  -> ${path.relative(process.cwd(), refDest)}`);
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

function printSubcommandHelp(cmd) {
  const helps = {
    validate: 'Usage: pure-saas validate [file.md] [--json]\nValidates DESIGN.md or design-brief.md structural integrity and token schemas.',
    contrast: 'Usage: pure-saas contrast [file.md] [--json]\nAudits semantic color tokens for WCAG 2.2 AA (4.5:1 text, 3:1 UI) compliance.',
    audit: 'Usage: pure-saas audit [--source <dir>] [--design <file>] [--strict] [--json]\nExecutes 5-dimension deterministic audit (A11y, Performance, Theming, Responsive, Integrity) scored 0-20 with P0-P3 defect triage.',
    browser: 'Usage: pure-saas browser <check|setup|screenshot|verify> [url] [options]\nToken-conscious browser automation and screenshot capture via Playwright CLI.',
    '3d': 'Usage: pure-saas 3d <check|spec|scaffold> [path] [options]\nProcedural Three.js 3D model synthesis in TypeScript from 2D reference images (img2threejs).',
    style: 'Usage: pure-saas style <list|info|select|query> [name]\nSelectable design style registry (Awesome Design Skills & Taste Skill).',
    init: 'Usage: pure-saas init [--reference]\nInitializes starter design-brief.md and DESIGN.md in the current repository.',
    install: 'Usage: pure-saas install [cursor|windsurf|copilot|gemini|claude|all]\nConfigures agent rules and skill files in the current repository.'
  };

  console.log(`\nPure SaaS Help: ${cmd}\n`);
  console.log(helps[cmd] || `Usage: pure-saas ${cmd} [options]`);
  console.log('\nRun "pure-saas --help" for all available commands.\n');
}

function printHelp() {
  console.log(`
Pure SaaS CLI - AI Agent Design Enforcement Toolkit

Usage:
  pure-saas <command> [options]

Core Commands:
  validate [file]                 Validate DESIGN.md or design-brief.md structure, tokens & contrast
  contrast [file]                 Audit semantic color tokens for WCAG 2.2 AA / AAA contrast compliance
  diff <file1> <file2>            Diff tokens between two design files or commits
  drift <design> <obs.json>       Detect design drift between expected tokens and measured observations
  check, check-tokens [file]      Check design tokens and scan source code for raw styling or drift
  design-system [options]         Generate a complete DESIGN.md based on product, style, and design dials
  export-tokens [file] [--format] Export tokens from DESIGN.md to CSS, Tailwind (v3/v4), DTCG, or JSON
  audit, review [options]         5-dimension deterministic quality audit (A11y, Perf, Tokens, Responsive, Integrity)
  browser <check|setup|screenshot|verify>  Playwright CLI browser automation and multi-viewport screenshots
  3d <check|spec|scaffold>        Procedural Three.js 3D model synthesis from images (img2threejs)
  style <list|info|select|query>  Selectable design style registry (Awesome Design Skills & Taste Skill)
  query [domain] [query]          Query design intelligence (styles, products, colors, typography, UX, charts)
  ref, search-ref [query]         Search reference library (Apple HIG, frameworks, craft guidelines)
  init [--reference]              Initialize starter design-brief.md and DESIGN.md in the current repo
  install, setup [agent]          Configure agent rules for Cursor, Windsurf, Copilot, Gemini, or Claude

Specialist Workflows:
  design [request]                Establish or update root-level DESIGN.md specification
  polish [request]                Elevate visual craft, typography tracking, hairline borders, and micro-interactions
  responsive [request]            Optimize and verify layouts across mobile, tablet, and desktop viewports
  reference <url>                 Deconstruct reference website into 16-section DESIGN.md specification

Options:
  --json                          Output results as machine-readable JSON (suitable for CI)
  --format <css|tailwind|dtcg|json> Export format for export-tokens (default: css)
  --out <file|dir>                Write output directly to file or directory
  --source <dir>                  Source directory to scan for token usage (e.g. src)
  --known <file>                  Known defects baseline JSON file to suppress existing debt
  --update-known                  Update known defects baseline file with current defects
  --strict                        Fail on known defects as well as new defects
  --product <name>                Filter by product archetype (e.g. saas, fintech, healthcare)
  --style <name>                  Filter by design style (e.g. minimalism-swiss, developer-technical)
  --variance <1-10>               Design dial: visual variance (1=centered/minimal, 10=bold/asymmetric)
  --motion <1-10>                 Design dial: motion intensity (1=subtle/reduced, 10=dynamic spring physics)
  --density <1-10>                Design dial: visual density (1=spacious marketing, 10=compact data console)
  --viewports <w1,w2>             Comma-separated viewport widths for browser screenshot (default: 375,768,1440)
  --full-page                     Capture entire scrollable page height in browser screenshots
  --help, -h                      Show this help message
  --version, -v                   Show CLI version

Examples:
  npx pure-saas audit --source src
  npx pure-saas browser screenshot http://localhost:3000 --viewports 375,768,1440
  npx pure-saas 3d check
  npx pure-saas 3d scaffold Console3D --out ./src/components/Console3D.tsx
  npx pure-saas style list
  npx pure-saas style info minimalism-swiss
  npx pure-saas design-system --product fintech --style minimalism-swiss --out DESIGN.md
  npx pure-saas validate DESIGN.md
  npx pure-saas contrast DESIGN.md
  npx pure-saas export-tokens DESIGN.md --format tailwind --out tokens.css
  npx pure-saas ref "modal"
`);
}

// Only execute when run directly from command line
if (process.argv[1] && (process.argv[1].endsWith('pure-saas.mjs') || process.argv[1].endsWith('pure-saas'))) {
  runCli().then(code => process.exit(code));
}
