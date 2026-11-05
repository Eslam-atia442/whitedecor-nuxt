import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

/**
 * Image to WebP Converter for White Decor Nuxt Web
 * 
 * Usage:
 *   node scripts/convert-to-webp.mjs <file-or-directory> [options]
 * 
 * Options:
 *   --quality=<number>  (default: 85)
 *   --width=<number>    (optional resize width)
 *   --height=<number>   (optional resize height)
 *   --lossless          (use lossless compression)
 * 
 * Example:
 *   node scripts/convert-to-webp.mjs public/images
 *   node scripts/convert-to-webp.mjs public/images/app_logo.jpg --quality=90
 */

const args = process.argv.slice(2);
const targetPath = args.find((a) => !a.startsWith('--')) || 'public/images';

const getOption = (name, fallback) => {
  const arg = args.find((a) => a.startsWith(`--${name}=`));
  if (!arg) return fallback;
  return arg.split('=')[1];
};

const quality = Number(getOption('quality', 85));
const width = getOption('width', null) ? Number(getOption('width', null)) : null;
const height = getOption('height', null) ? Number(getOption('height', null)) : null;
const isLossless = args.includes('--lossless');

const SUPPORTED_EXT = new Set(['.png', '.jpg', '.jpeg', '.svg', '.tif', '.tiff']);

async function convertFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!SUPPORTED_EXT.has(ext)) return;

  const dir = path.dirname(filePath);
  const base = path.basename(filePath, ext);
  const outPath = path.join(dir, `${base}.webp`);

  try {
    const statBefore = await fs.stat(filePath);
    let pipeline = sharp(filePath);

    if (width || height) {
      pipeline = pipeline.resize(width, height, { fit: 'inside', withoutEnlargement: true });
    }

    await pipeline
      .webp({ quality, lossless: isLossless, effort: 6 })
      .toFile(outPath);

    const statAfter = await fs.stat(outPath);
    const saved = (((statBefore.size - statAfter.size) / statBefore.size) * 100).toFixed(1);
    const beforeKb = (statBefore.size / 1024).toFixed(1);
    const afterKb = (statAfter.size / 1024).toFixed(1);

    console.log(`✓ ${path.basename(filePath)} (${beforeKb} KB) -> ${path.basename(outPath)} (${afterKb} KB) [${saved}% saved]`);
  } catch (err) {
    console.error(`✗ Error converting ${filePath}:`, err.message);
  }
}

async function scan(currentPath) {
  const stat = await fs.stat(currentPath);
  if (stat.isFile()) {
    await convertFile(currentPath);
  } else if (stat.isDirectory()) {
    const files = await fs.readdir(currentPath);
    for (const file of files) {
      const full = path.join(currentPath, file);
      const childStat = await fs.stat(full);
      if (childStat.isDirectory()) {
        await scan(full);
      } else {
        await convertFile(full);
      }
    }
  }
}

console.log(`🎨 WebP Optimizer: scanning ${targetPath} (quality: ${quality}${isLossless ? ', lossless' : ''})...`);
scan(path.resolve(process.cwd(), targetPath))
  .then(() => console.log('✨ Conversion finished.'))
  .catch((err) => {
    console.error('Fatal error:', err);
    process.exit(1);
  });

