#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const REQUIRED_NODE_VERSION = '22.15.0';
const MIN_MAJOR_VERSION = 22;

function getCurrentNodeVersion() {
  return process.version.substring(1); // Remove 'v' prefix
}

function parseVersion(version) {
  const parts = version.split('.');
  return {
    major: parseInt(parts[0], 10),
    minor: parseInt(parts[1], 10),
    patch: parseInt(parts[2], 10),
  };
}

function checkNodeVersion() {
  const currentVersion = getCurrentNodeVersion();
  const current = parseVersion(currentVersion);
  const required = parseVersion(REQUIRED_NODE_VERSION);

  console.log(`\n🔍 Checking Node.js version...`);
  console.log(`   Current: v${currentVersion}`);
  console.log(`   Required: v${REQUIRED_NODE_VERSION} or higher\n`);

  if (current.major < MIN_MAJOR_VERSION) {
    console.error(
      `❌ ERROR: Node.js version ${currentVersion} is not supported!`
    );
    console.error(
      `   This project requires Node.js ${MIN_MAJOR_VERSION}.x or higher.`
    );
    console.error(`\n   To fix this:`);
    console.error(`   1. Install NVM: https://github.com/nvm-sh/nvm`);
    console.error(`   2. Run: nvm install ${REQUIRED_NODE_VERSION}`);
    console.error(`   3. Run: nvm use ${REQUIRED_NODE_VERSION}`);
    console.error(`   4. Or simply run: nvm use\n`);
    process.exit(1);
  }

  if (
    current.major === required.major &&
    (current.minor < required.minor ||
      (current.minor === required.minor && current.patch < required.patch))
  ) {
    console.warn(`⚠️  WARNING: You're using Node.js v${currentVersion}`);
    console.warn(`   Recommended: v${REQUIRED_NODE_VERSION} or higher`);
    console.warn(`   Run: nvm use ${REQUIRED_NODE_VERSION}\n`);
  } else {
    console.log(`✅ Node.js version is compatible!\n`);
  }
}

function checkNvmrcFiles() {
  const nvmrcPaths = [
    '.nvmrc',
    'packages/server/.nvmrc',
    'packages/shared/.nvmrc',
    'packages/web/.nvmrc',
  ];

  console.log('🔍 Checking .nvmrc files...');

  const versions = new Set();
  let allMatch = true;

  for (const nvmrcPath of nvmrcPaths) {
    const fullPath = path.join(process.cwd(), nvmrcPath);
    if (fs.existsSync(fullPath)) {
      const version = fs.readFileSync(fullPath, 'utf8').trim();
      versions.add(version);

      if (version !== REQUIRED_NODE_VERSION) {
        console.error(
          `❌ ${nvmrcPath}: ${version} (expected ${REQUIRED_NODE_VERSION})`
        );
        allMatch = false;
      } else {
        console.log(`✅ ${nvmrcPath}: ${version}`);
      }
    }
  }

  if (versions.size > 1) {
    console.error(`\n❌ ERROR: Inconsistent Node versions across packages!`);
    console.error(`   Found versions: ${Array.from(versions).join(', ')}`);
    console.error(
      `   All packages must use the same Node version: ${REQUIRED_NODE_VERSION}\n`
    );
    process.exit(1);
  }

  if (!allMatch) {
    console.error(
      `\n❌ ERROR: Some .nvmrc files don't match the required version!\n`
    );
    process.exit(1);
  }

  console.log(`\n✅ All .nvmrc files are consistent!\n`);
}

// Run checks
try {
  checkNodeVersion();
  checkNvmrcFiles();
  console.log('🎉 All version checks passed!\n');
} catch (error) {
  console.error(`\n❌ Version check failed: ${error.message}\n`);
  process.exit(1);
}
