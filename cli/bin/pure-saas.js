#!/usr/bin/env node

/**
 * Pure SaaS CLI - Global executable entry point
 * Dispatches commands to the core engine in scripts/pure-saas.mjs
 */

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const enginePath = path.resolve(__dirname, '../../scripts/pure-saas.mjs');

try {
  const { runCli } = await import(enginePath);
  const exitCode = await runCli(process.argv.slice(2));
  process.exit(exitCode ?? 0);
} catch (error) {
  console.error(`Pure SaaS CLI Error: ${error.message}`);
  process.exit(1);
}

