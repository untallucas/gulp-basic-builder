import gulp from 'gulp'
import file from 'gulp-file'
import { promises as fs } from 'fs'
import path from 'path'
import pngToIco from 'png-to-ico'
import sharp from 'sharp'
import { optimize as svgoOptimize } from 'svgo'
import { withLogs } from './report_new.js'

import paths from '../gulppaths.js'


// RESIZE ICON
async function iconsPNG() {
  return withLogs('iconsPNG', (async () => {
    const svgPath = path.join(paths.src.icons, 'favicon.svg')
    const svgBuffer = await fs.readFile(svgPath)
    const iconVariants = [
      { size: 64, filename: 'favicon' },
      { size: 180, filename: 'apple-touch-icon' },
      { size: 192, filename: 'icon-192' },
      { size: 512, filename: 'icon-512' }
    ]

    await fs.mkdir(paths.prod.base, { recursive: true })

    for (const { size, filename } of iconVariants) {
      const outputPath = path.join(paths.prod.base, `${filename}.png`)
      await sharp(svgBuffer)
        .resize(size, size, { fit: 'contain' })
        .png({ compressionLevel: 9, quality: 80 })
        .toFile(outputPath)
    }
  })())
}


// GENERATE ICO ICON
async function iconsICO() {
  return withLogs('iconsICO', (async () => {
    const sourceFile = await fs.readFile(path.join(paths.src.icons, 'favicon.svg'))
    const sizes = [ 16, 24, 32, 64, 128 ]
    const outputPath = path.join(paths.prod.base, 'favicon.ico')

    const pngBuffers = await Promise.all(
      sizes.map(size =>
        sharp(sourceFile)
          .resize(size, size, { fit: 'contain' })
          .png({
            compressionLevel: 9,
            quality: 80,
            palette: true
          })
          .toBuffer()
      )
    )

    const icoBuffer = await pngToIco(pngBuffers)
    await fs.mkdir(paths.prod.base, { recursive: true })
    await fs.writeFile(outputPath, icoBuffer)
  })())
}


// COPY AND OPTIMIZE SVG ICON
async function iconsSVG() {
  return withLogs('iconsSVG', (async () => {  
    await fs.mkdir(paths.prod.base, { recursive: true })
    const sourceFile = await fs.readFile(path.join(paths.src.icons, 'favicon.svg'), 'utf-8')
    const optimized = svgoOptimize(sourceFile, {
      multipass: true
    });
    await fs.writeFile(path.join(paths.prod.base, 'favicon.svg'), optimized.data, 'utf-8');
  })())
}


// GENERATE MANIFEST.JSON
function iconsManifest() {
  var fileContent = {
    name: process.env.APP_TITLE,
    short_name: process.env.APP_SHORTTITLE,
    start_url: "/",
    display: "standalone",
    background_color: process.env.APP_BACKGROUND,
    theme_color: process.env.APP_COLOR,
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  }

  return withLogs('iconsManifest',
    file('manifest.json', JSON.stringify(fileContent, null, 2), { src: true })
      .pipe(gulp.dest(paths.prod.base))
  )
}


// GENERATE MANIFEST.WEBMANIFEST
function iconsWebmanifest() {
  var fileContent = {
    name: process.env.APP_TITLE,
    short_name: process.env.APP_SHORTTITLE,
    description: process.env.APP_DESCRIPTION,
    lang: process.env.APP_LANGUAGE_ID,
    display: "standalone",
    orientation: "any",
    dir: "auto",
    scope: "/",
    start_url: "/",
    background_color: process.env.APP_BACKGROUND,
    theme_color: process.env.APP_COLOR,
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  }

  return withLogs('iconsWebManifest',
    file('manifest.webmanifest', JSON.stringify(fileContent, null, 2), { src: true })
      .pipe(gulp.dest(paths.prod.base))
  )
}


// BUILDER
export async function generateIcons(){
  await iconsPNG(),
  await iconsICO(),
  await iconsSVG(),
  await iconsManifest(),
  await iconsWebmanifest()
}
