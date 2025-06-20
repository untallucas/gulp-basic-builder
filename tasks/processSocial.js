import { promises as fs } from 'fs'
import path from 'path'
import sharp from 'sharp';
import { withLogs } from './report_new.js'

import paths from '../gulppaths.js'

export async function processSocial() {
  return withLogs('processSocial', (async () => {
    const srcDir = paths.src.social;
    const destDir = paths.prod.base;
    const entries = await fs.readdir(srcDir, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(srcDir, entry.name)
      const destPath = path.join(destDir, entry.name)
      const ext = path.extname(entry.name).toLowerCase();
      if (!entry.isFile() || !(ext === '.jpg' || ext === '.jpeg')) continue

      await fs.mkdir(path.dirname(destPath), { recursive: true });

      await sharp(srcPath)
        .jpeg({ quality: 80, progressive: true })
        .toFile(destPath);
    }
  })())
}
