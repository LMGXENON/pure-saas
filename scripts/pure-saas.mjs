#!/usr/bin/env node
/**
 * Pure SaaS CLI - Design System Validator, Token Checker, Exporter, and Review Reporter
 * Zero-dependency Node.js implementation compatible with Node >= 18.
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

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
  const { data, body } = parseFrontmatter(raw);

  // If frontmatter is missing or empty, attempt markdown section fallback
  const isBrief = filePath.includes('brief') || data.product_name;
  const isReference = filePath.includes('reference') || data.source_url;

  if (isBrief) {
    return validateBriefData(data, body, filePath);
  }
  if (isReference) {
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

export function scanSourceDirectory(srcDir, designTokens = {}) {
  const results = {
    scannedFiles: 0,
    rawColorViolations: [],
    unresolvedTokenRefs: [],
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
    ...Object.keys(designTokens.typography?.scale || {}).map(s => `font-size-${s}`)
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
      } else if (/\.(jsx?|tsx?|html|css|vue|svelte)$/i.test(entry.name)) {
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

  for (let idx = 0; idx < lines.length; idx++) {
    const line = lines[idx];
    const lineNum = idx + 1;

    // Check raw hex colors in styling
    const hexMatches = line.match(/#[0-9a-fA-F]{3,8}\b/g);
    if (hexMatches) {
      for (const hex of hexMatches) {
        const normalized = hex.toLowerCase();
        if (knownColorValues.size > 0 && !knownColorValues.has(normalized)) {
          // Allow comments or approved exceptions
          if (!line.includes('EXC-') && !line.includes('pure-saas-ignore')) {
            results.rawColorViolations.push({
              file: filePath,
              line: lineNum,
              value: hex,
              message: `Raw hex color ${hex} not mapped to approved DESIGN.md semantic token.`
            });
          }
        }
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

    // Check Anti-Slop patterns
    if (/bg-gradient-to-(r|br|bl|t)\s+from-(purple|indigo|pink)-/i.test(line)) {
      results.antiSlopWarnings.push({
        file: filePath,
        line: lineNum,
        pattern: 'generic-gradient-mesh',
        message: 'Generic purple/indigo hero gradient detected without documented brand justification.'
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

  if (command === 'check-tokens') {
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

  if (command === 'review-report') {
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

  if (command === 'init') {
    const templateName = args[1] || 'developer';
    const briefDest = path.resolve(process.cwd(), 'design-brief.md');
    const designDest = path.resolve(process.cwd(), 'DESIGN.md');

    if (fs.existsSync(designDest)) {
      console.warn(`Warning: DESIGN.md already exists at ${designDest}. Skipping overwrite.`);
      return 1;
    }

    const tplBriefPath = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../templates/design-brief.md');
    const tplDesignPath = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../templates/DESIGN.md');

    fs.copyFileSync(tplBriefPath, briefDest);
    fs.copyFileSync(tplDesignPath, designDest);
    console.log(`Initialized Pure SaaS project with starter templates:`);
    console.log(`  -> ${path.relative(process.cwd(), briefDest)}`);
    console.log(`  -> ${path.relative(process.cwd(), designDest)}`);
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
  check-tokens [file] [--source] Check design tokens and scan source code for raw styling or drift
  export-tokens [file] [--format] Export tokens from DESIGN.md to CSS, Tailwind, or JSON
  review-report                   Generate an honest verification report with tested vs untested areas
  init [template]                 Initialize starter design-brief.md and DESIGN.md in the current repo

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
