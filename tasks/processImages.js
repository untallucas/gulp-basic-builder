import { promises as fs } from 'fs'
import path from 'path'
import sharp from 'sharp';
import { optimize as svgoOptimize } from 'svgo';

import paths from '../gulppaths.js'

const isProduction = process.env.NODE_ENV === 'prod'

export async function processImages() {
  const srcDir = paths.src.images;
  const destDir = isProduction ? paths.prod.images : paths.dev.images;
  const entries = await fs.readdir(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    const ext = path.extname(entry.name).toLowerCase();

    await fs.mkdir(path.dirname(destPath), { recursive: true });

    // COPY IMAGES WITHOUT CHANGES IN DEV
    if (!isProduction) {
      await fs.copyFile(srcPath, destPath);
      continue;
    }

    // OPTIMIZE AND COPY IMAGES IN PROD
    if (['.jpg', '.jpeg'].includes(ext)) {
      await sharp(srcPath)
        .jpeg({ quality: 80, progressive: true })
        .toFile(destPath);
    }
    else if (ext === '.png') {
      await sharp(srcPath)
        .png({ compressionLevel: 9 })
        .toFile(destPath);
    }
    else if (ext === '.webp') {
      await sharp(srcPath)
        .webp({ quality: 80, lossless: true })
        .toFile(destPath);
    }
    else if (ext === '.svg') {
      const svgContent = await fs.readFile(srcPath, 'utf8');
      const result = svgoOptimize(svgContent, {
        multipass: true
      });
      await fs.writeFile(destPath, result.data, 'utf8');
    }
    else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}
