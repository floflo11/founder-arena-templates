#!/usr/bin/env npx tsx
/**
 * Template Discovery Helper for AI Founders
 *
 * Usage:
 *   npx tsx find-template.ts [keyword]
 *   npx tsx find-template.ts landing
 *   npx tsx find-template.ts dashboard
 *   npx tsx find-template.ts --list
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface Template {
  id: string;
  name: string;
  source_url: string;
  description: string;
  use_cases: string[];
  features: string[];
  author: string;
  screenshot: string;
  path: string;
  tech_stack: string[];
  clone_command: string;
  collected_at: string;
}

interface Catalog {
  version: string;
  collected_at: string;
  source: string;
  usage_notes: string[];
  templates: Template[];
}

const catalogPath = path.join(__dirname, 'catalog.json');
const catalog: Catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));

const args = process.argv.slice(2);
const keyword = args[0]?.toLowerCase();

function printTemplate(t: Template, index: number) {
  const hasDownload = t.path ? '✓' : '○';
  console.log(`\n${hasDownload} [${index + 1}] ${t.name || t.id}`);
  console.log(`   ID: ${t.id}`);
  console.log(`   Use cases: ${t.use_cases.join(', ')}`);
  console.log(`   Features: ${t.features.slice(0, 5).join(', ')}`);
  console.log(`   Stack: ${t.tech_stack.join(', ') || 'unknown'}`);
  console.log(`   Clone: ${t.clone_command}`);
}

if (args.includes('--list') || args.includes('-l')) {
  console.log(`\n📦 All Templates (${catalog.templates.length} total)\n`);
  console.log('Legend: ✓ = available, ○ = metadata only\n');

  catalog.templates.forEach((t, i) => printTemplate(t, i));

  const available = catalog.templates.filter(t => t.path).length;
  console.log(`\n---\nAvailable: ${available}/${catalog.templates.length}`);
  process.exit(0);
}

if (!keyword) {
  console.log(`
Template Discovery Helper

Usage:
  npx tsx find-template.ts [keyword]     Search templates by keyword
  npx tsx find-template.ts --list        List all templates

Examples:
  npx tsx find-template.ts landing       Find landing page templates
  npx tsx find-template.ts dashboard     Find dashboard templates
  npx tsx find-template.ts portfolio     Find portfolio templates
  npx tsx find-template.ts saas          Find SaaS templates

To use a template:
  npx degit floflo11/founder-arena-templates/templates/{id} my-project
  cd my-project && pnpm install && pnpm dev
`);
  process.exit(0);
}

// Search templates
const matches = catalog.templates.filter(t => {
  const searchText = [
    t.id,
    t.name,
    t.author,
    t.description,
    ...t.use_cases,
    ...t.features,
    ...t.tech_stack
  ].join(' ').toLowerCase();

  return searchText.includes(keyword);
});

if (matches.length === 0) {
  console.log(`\nNo templates found matching "${keyword}"`);
  console.log('\nTry: landing, dashboard, portfolio, saas, ecommerce, blog');
  process.exit(1);
}

console.log(`\n🔍 Found ${matches.length} template(s) matching "${keyword}":`);
matches.forEach((t, i) => printTemplate(t, i));

const available = matches.filter(t => t.path);
if (available.length > 0) {
  console.log(`\n---\nQuick start with first match:`);
  console.log(`  ${available[0].clone_command}`);
  console.log(`  cd my-project && pnpm install && pnpm dev`);
}
