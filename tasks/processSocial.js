import gulp from 'gulp'
import { promises as fsPromises } from 'fs'
import imagemin from 'imagemin'
import mozjpeg from 'imagemin-mozjpeg'
import path from 'path'

import paths from '../gulppaths.js'

export async function processSocial() {
  const srcDir = paths.src.social
  const destDir = paths.prod.base

  const entries = await fsPromises.readdir(srcDir, { withFileTypes: true })
  await fsPromises.mkdir(destDir, { recursive: true })

  for (const entry of entries) {
    const ext = path.extname(entry.name).toLowerCase()
    if (!entry.isFile() || !(ext === '.jpg' || ext === '.jpeg')) continue

    const srcPath = path.join(srcDir, entry.name)
    const destPath = path.join(destDir, entry.name)

    const buffer = await fsPromises.readFile(srcPath)
    const optimized = await imagemin.buffer(buffer, {
      plugins: [mozjpeg()]
    })

    await fsPromises.writeFile(destPath, optimized)
  }
}
