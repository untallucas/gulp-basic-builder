import gulp from 'gulp'
import { promises as fsPromises } from 'fs'
import path from 'path'
import imagemin from 'imagemin'
import pngquant from 'imagemin-pngquant'
import mozjpeg from 'imagemin-mozjpeg'
import gifsicle from 'imagemin-gifsicle'
import svgo from 'imagemin-svgo'

import paths from '../gulppaths.js'

const isProduction = process.env.NODE_ENV === 'prod'

async function copyImages(srcDir, destDir) {
  const entries = await fsPromises.readdir(srcDir, { withFileTypes: true })

  await fsPromises.mkdir(destDir, { recursive: true })

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name)
    const destPath = path.join(destDir, entry.name)

    if (entry.isDirectory()) {
      await copyImages(srcPath, destPath)
    } else {
      await fsPromises.copyFile(srcPath, destPath)
    }
  }
}

async function optimizeAndCopyImages(srcDir, destDir) {
  const entries = await fsPromises.readdir(srcDir, { withFileTypes: true })
  await fsPromises.mkdir(destDir, { recursive: true })

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name)
    const destPath = path.join(destDir, entry.name)

    if (entry.isDirectory()) {
      await optimizeAndCopyImages(srcPath, destPath)
    } else {
      const buffer = await fsPromises.readFile(srcPath)
      const optimized = await imagemin.buffer(buffer, {
        plugins: [
          mozjpeg(),
          pngquant(),
          gifsicle(),
          svgo(),
        ],
      })
      await fsPromises.writeFile(destPath, optimized)
    }
  }
}

gulp.task('processImages', function () {
  const srcImages = paths.src.images.replace(/\/\*\*\/\*\.\{.*\}$/, '')

  if (isProduction) {
    const targetFolder = paths.prod.images
    return optimizeAndCopyImages(srcImages, targetFolder)
  } else {
    const targetFolder = paths.dev.images
    return copyImages(srcImages, targetFolder)
  }
})
