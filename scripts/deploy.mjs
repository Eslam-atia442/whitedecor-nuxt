#!/usr/bin/env node
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');

const run = (command, options = {}) => {
  console.log(`\n\x1b[36m▶ ${command}\x1b[0m`);
  execSync(command, {
    stdio: 'inherit',
    cwd: projectRoot,
    ...options,
  });
};

const SSH_HOST = 'whitedecor.online';
const SSH_PORT = '21098';
const SSH_USER = 'whitboiv';
const REMOTE_PATH = '/home/whitboiv/public_html/';

async function main() {
  console.log('\n\x1b[1m\x1b[32m🚀 Starting White Decor Local CI/CD Pipeline...\x1b[0m\n');

  // Step 1: Quality Check
  console.log('\x1b[33m[1/5] Verifying TypeScript & Code Standards...\x1b[0m');
  run('npm run typecheck');

  // Step 2: Push source code to GitHub
  console.log('\n\x1b[33m[2/5] Committing & pushing source code to GitHub...\x1b[0m');
  try {
    run('git add .');
    const status = execSync('git status --porcelain', { cwd: projectRoot }).toString().trim();
    if (status) {
      const commitMsg = process.argv[2] || 'feat(web): update UI/UX, auth fixes, and checkout enhancements';
      run(`git commit -m "${commitMsg.replace(/"/g, '\\"')}"`);
    } else {
      console.log('No local changes to commit.');
    }
    run('git push origin main');
  } catch (err) {
    console.warn('\x1b[33m⚠️ Git push notice (will continue build and deployment):\x1b[0m', err.message);
  }

  // Step 3: Build static production bundle
  console.log('\n\x1b[33m[3/5] Building static production release with Nuxt...\x1b[0m');
  run('npm run generate');

  const buildPublic = join(projectRoot, 'build', 'public');
  if (!existsSync(buildPublic)) {
    throw new Error(`Build directory not found at ${buildPublic}`);
  }

  // Step 4: Deploy to Namecheap via rsync over SSH
  console.log('\n\x1b[33m[4/5] Deploying build assets to Namecheap server via SSH...\x1b[0m');
  const rsyncCmd = `rsync -avz --delete --exclude='academy' --exclude='.git' -e 'ssh -p ${SSH_PORT}' "${buildPublic}/" "${SSH_USER}@${SSH_HOST}:${REMOTE_PATH}"`;
  run(rsyncCmd);

  // Step 5: Verify Live Website
  console.log('\n\x1b[33m[5/5] Verifying live website response...\x1b[0m');
  try {
    const res = execSync(`curl -s -I "https://${SSH_HOST}" | head -n 5`, { encoding: 'utf-8' });
    console.log(res);
  } catch {
    console.log('Could not verify with curl, but files are synced.');
  }

  console.log('\n\x1b[1m\x1b[32m✨ DEPLOYMENT COMPLETE! Site is live at: https://whitedecor.online\x1b[0m\n');
}

main().catch((err) => {
  console.error('\n\x1b[31m❌ Deployment failed:\x1b[0m', err.message);
  process.exit(1);
});
