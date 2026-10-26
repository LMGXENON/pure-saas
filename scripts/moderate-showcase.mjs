#!/usr/bin/env node
// scripts/moderate-showcase.mjs
// CLI script for repository owners to list, inspect, approve, or reject community submissions

import fs from 'fs';
import path from 'path';

const dbPath = path.resolve('pure-saas-website/data/showcase-db.json');

function loadDb() {
  if (!fs.existsSync(dbPath)) {
    console.error(`Database not found at ${dbPath}`);
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
}

function saveDb(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
}

const args = process.argv.slice(2);
const command = args[0] || 'list';

if (command === 'list') {
  const db = loadDb();
  console.log('\n=== Pure SaaS Showcase Submissions ===\n');
  const subs = db.submissions || [];
  if (subs.length === 0) {
    console.log('No submissions in the database.');
  } else {
    subs.forEach((s) => {
      const statusBadge = s.status === 'approved' ? '\x1b[32m[APPROVED]\x1b[0m' : s.status === 'rejected' ? '\x1b[31m[REJECTED]\x1b[0m' : '\x1b[33m[PENDING]\x1b[0m';
      console.log(`${statusBadge} ID: ${s.id}`);
      console.log(`  Project: ${s.name} (${s.category})`);
      console.log(`  Creator: ${s.creator} ${s.creatorHandle ? `(${s.creatorHandle})` : ''}`);
      console.log(`  Live URL: ${s.liveUrl}`);
      console.log(`  Description: ${s.description}`);
      console.log(`  Submitted: ${s.createdAt}\n`);
    });
  }
} else if (command === 'approve') {
  const id = args[1];
  if (!id) {
    console.error('Usage: node scripts/moderate-showcase.mjs approve <id>');
    process.exit(1);
  }
  const db = loadDb();
  const target = (db.submissions || []).find((s) => s.id === id);
  if (!target) {
    console.error(`Submission with ID "${id}" not found.`);
    process.exit(1);
  }
  target.status = 'approved';
  target.approvedAt = new Date().toISOString();
  saveDb(db);
  console.log(`\x1b[32mSuccessfully approved submission "${target.name}" (${id})\x1b[0m`);
} else if (command === 'reject') {
  const id = args[1];
  if (!id) {
    console.error('Usage: node scripts/moderate-showcase.mjs reject <id>');
    process.exit(1);
  }
  const db = loadDb();
  const target = (db.submissions || []).find((s) => s.id === id);
  if (!target) {
    console.error(`Submission with ID "${id}" not found.`);
    process.exit(1);
  }
  target.status = 'rejected';
  target.rejectedAt = new Date().toISOString();
  saveDb(db);
  console.log(`\x1b[31mRejected submission "${target.name}" (${id})\x1b[0m`);
} else {
  console.log('Usage:');
  console.log('  node scripts/moderate-showcase.mjs list');
  console.log('  node scripts/moderate-showcase.mjs approve <id>');
  console.log('  node scripts/moderate-showcase.mjs reject <id>');
}

