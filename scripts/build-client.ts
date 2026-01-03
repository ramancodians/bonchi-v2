#!/usr/bin/env node
/**
 * Build Client Script
 * Builds the web package and outputs to server/client-dist/ for production deployment
 *
 * Usage: tsx scripts/build-client.ts
 */

import { execSync } from 'child_process';
import { existsSync, rmSync, cpSync, mkdirSync } from 'fs';
import { join, resolve } from 'path';

// Get root directory (scripts folder is one level down from root)
const ROOT_DIR = resolve(process.cwd());
const WEB_DIR = join(ROOT_DIR, 'packages', 'web');
const WEB_DIST = join(WEB_DIR, 'dist');
const SERVER_DIR = join(ROOT_DIR, 'packages', 'server');
const CLIENT_DIST = join(SERVER_DIR, 'client-dist');

console.log('🏗️  Building Web Client for Production...\n');

// Step 1: Clean previous build
console.log('📦 Step 1: Cleaning previous builds...');
if (existsSync(CLIENT_DIST)) {
  rmSync(CLIENT_DIST, { recursive: true, force: true });
  console.log('✅ Removed old client-dist');
}
if (existsSync(WEB_DIST)) {
  rmSync(WEB_DIST, { recursive: true, force: true });
  console.log('✅ Removed old web dist');
}

// Step 2: Build web package
console.log('\n📦 Step 2: Building web package...');
try {
  execSync('npm run build', {
    cwd: WEB_DIR,
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' },
  });
  console.log('✅ Web package built successfully');
} catch (error) {
  console.error('❌ Failed to build web package');
  process.exit(1);
}

// Step 3: Copy dist to server/client-dist
console.log('\n📦 Step 3: Copying build to server/client-dist...');
try {
  if (!existsSync(WEB_DIST)) {
    throw new Error('Web dist folder not found after build');
  }

  mkdirSync(CLIENT_DIST, { recursive: true });
  cpSync(WEB_DIST, CLIENT_DIST, { recursive: true });
  console.log('✅ Build copied to server/client-dist');
} catch (error) {
  console.error('❌ Failed to copy build:', error);
  process.exit(1);
}

console.log('\n✨ Client build complete! Output: packages/server/client-dist/');
console.log('🚀 Ready for production deployment\n');
