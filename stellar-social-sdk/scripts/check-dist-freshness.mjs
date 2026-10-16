#!/usr/bin/env node
import { execSync } from 'node:child_process';

function run(cmd, opts = {}) {
  return execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], ...opts }).trim();
}

// 1. Rebuild stellar-social-sdk
execSync('npm run build', { stdio: 'inherit' });

// 2. Check if git diff reports stale files under stellar-social-sdk/dist/
try {
  execSync('git diff --exit-code -- dist/', { stdio: 'inherit' });
  console.log('OK: committed stellar-social-sdk/dist/ is up to date with src/.');
} catch {
  const staleFiles = run('git diff --name-only -- dist/').split(/\r?\n/).filter(Boolean);
  console.error('ERROR: Committed stellar-social-sdk/dist/ is stale compared to src/!');
  console.error('Stale files requiring rebuild (' + staleFiles.length + '):');
  for (const file of staleFiles) {
    console.error('  - stellar-social-sdk/' + file);
  }
  console.error('Run "cd stellar-social-sdk && npm run build" and commit the updated dist/ artifacts.');
  process.exit(1);
}
