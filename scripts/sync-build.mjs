import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'build');
const dest = resolve(root, '..', 'whitedecor-build');

if (!existsSync(src)) {
  console.error('Missing build/. Run `npm run build:nuxt` first.');
  process.exit(1);
}

mkdirSync(dest, { recursive: true });

for (const name of readdirSync(dest)) {
  if (name === '.git' || name === '.gitignore') continue;
  rmSync(join(dest, name), { recursive: true, force: true });
}

for (const name of readdirSync(src)) {
  cpSync(join(src, name), join(dest, name), { recursive: true });
}

console.log(`Synced ${src} -> ${dest}`);
