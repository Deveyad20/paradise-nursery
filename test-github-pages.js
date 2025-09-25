#!/usr/bin/env node

/**
 * GitHub Pages Deployment Test Script
 * Tests the build configuration for GitHub Pages deployment
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Testing GitHub Pages deployment setup...\n');

const tests = [
  {
    name: 'Check Vite Configuration',
    test: () => {
      const viteConfig = fs.readFileSync('vite.config.js', 'utf8');
      return viteConfig.includes('GITHUB_PAGES') &&
             viteConfig.includes('paradise-nursery');
    }
  },
  {
    name: 'Check Package.json Scripts',
    test: () => {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      const scripts = packageJson.scripts;
      return scripts['build:github'] &&
             scripts['predeploy:github'] &&
             scripts['deploy:github'];
    }
  },
  {
    name: 'Check GitHub Actions Workflow',
    test: () => {
      return fs.existsSync('.github/workflows/deploy.yml');
    }
  },
  {
    name: 'Check Production Environment',
    test: () => {
      return fs.existsSync('.env.production');
    }
  },
  {
    name: 'Check Dependencies',
    test: () => {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      return packageJson.devDependencies['gh-pages'];
    }
  },
  {
    name: 'Test Build Process',
    test: () => {
      try {
        execSync('npm run build:github', { stdio: 'pipe' });
        return fs.existsSync('dist/index.html');
      } catch (error) {
        return false;
      }
    }
  },
  {
    name: 'Check 404.html for SPA routing',
    test: () => {
      return fs.existsSync('public/404.html') &&
             fs.readFileSync('public/404.html', 'utf8').includes('spa-github-pages');
    }
  },
  {
    name: 'Check main.jsx for redirect handling',
    test: () => {
      const mainJsx = fs.readFileSync('src/main.jsx', 'utf8');
      return mainJsx.includes('redirectPath') &&
             mainJsx.includes('window.location.hostname');
    }
  }
];

let passed = 0;
let failed = 0;

tests.forEach((test, index) => {
  console.log(`${index + 1}. ${test.name}...`);

  try {
    if (test.test()) {
      console.log('   ✅ PASSED\n');
      passed++;
    } else {
      console.log('   ❌ FAILED\n');
      failed++;
    }
  } catch (error) {
    console.log(`   ❌ ERROR: ${error.message}\n`);
    failed++;
  }
});

console.log(`📊 Test Results: ${passed} passed, ${failed} failed\n`);

if (failed === 0) {
  console.log('🎉 All tests passed! Your app is ready for GitHub Pages deployment.\n');

  console.log('🚀 Next Steps:');
  console.log('1. Push your code to GitHub');
  console.log('2. Enable GitHub Pages in repository settings');
  console.log('3. Set source to "GitHub Actions"');
  console.log('4. Your site will be available at: https://YOUR_USERNAME.github.io/paradise-nursery/\n');

  console.log('📚 For detailed instructions, see: GITHUB_PAGES_DEPLOYMENT.md');
} else {
  console.log('❌ Some tests failed. Please check the errors above.\n');
  console.log('📚 For troubleshooting, see: GITHUB_PAGES_DEPLOYMENT.md');
}

process.exit(failed === 0 ? 0 : 1);