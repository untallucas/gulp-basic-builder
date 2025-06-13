import gulp from 'gulp'
import file from 'gulp-file'
import { promises as fsPromises } from 'fs'
import gifsicle from 'imagemin-gifsicle'
import imagemin from 'imagemin'
import mozjpeg from 'imagemin-mozjpeg'
import path from 'path'
import pngquant from 'imagemin-pngquant'
import pngToIco from 'png-to-ico'
import { Resvg } from '@resvg/resvg-js'
import svgo from 'imagemin-svgo'

import paths from '../gulppaths.js'


// RESIZE ICON
async function renderSvgToPngVariants() {
  const svgPath = path.join(paths.src.icons, 'favicon.svg')
  const svgBuffer = await fsPromises.readFile(svgPath)
  const iconVariants = [
    { size: 64, filename: 'favicon' },
    { size: 180, filename: 'apple-touch-icon' },
    { size: 192, filename: 'icon-192' },
    { size: 512, filename: 'icon-512' }
  ]

  await fsPromises.mkdir(paths.prod.base, { recursive: true })

  for (const { size, filename } of iconVariants) {
    const resvg = new Resvg(svgBuffer, {
      fitTo: {
        mode: 'width',
        value: size
      }
    })
    const pngBuffer = resvg.render().asPng()
    const optimized = await imagemin.buffer(pngBuffer, {
      plugins: [
        pngquant(), 
        mozjpeg(), 
        gifsicle(), 
        svgo()
      ],
    })
    const outputPath = path.join(paths.prod.base, `${filename}.png`)
    await fsPromises.writeFile(outputPath, optimized)
  }
}

function iconsPNG() {
  return renderSvgToPngVariants()
}


// GENERATE ICO ICON
async function iconsICO() {
  const inputPath = path.join(paths.src.icons, 'favicon.svg')
  const svgBuffer = await fsPromises.readFile(inputPath)
  const sizes = [ 16, 24, 32, 64, 128, 256 ]
  const outputPath = path.join(paths.prod.base, 'favicon.ico')

  const pngBuffers = await Promise.all(
    sizes.map(size => {
      const resvg = new Resvg(svgBuffer, {
        fitTo: { mode: 'width', value: size }
      })
      return resvg.render().asPng()
    })
  )

  const icoBuffer = await pngToIco(pngBuffers)
  await fsPromises.mkdir(paths.prod.base, { recursive: true })
  await fsPromises.writeFile(outputPath, icoBuffer)
}


// COPY AND OPTIMIZE SVG ICON
async function optimizeAndCopySvgIcon() {
  await fsPromises.mkdir(paths.prod.base, { recursive: true })
  const sourceFile = await fsPromises.readFile(path.join(paths.src.icons, '/favicon.svg'))
  const optimized = await imagemin.buffer(sourceFile, {
    plugins: [
      mozjpeg(),
      pngquant(),
      gifsicle(),
      svgo(),
    ],
  })
  await fsPromises.writeFile(path.join(paths.prod.base, '/favicon.svg'), optimized)
}

function iconsSVG() {
  return optimizeAndCopySvgIcon()
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

  return file('manifest.json', JSON.stringify(fileContent, null, 2), { src: true })
    .pipe(gulp.dest(paths.prod.base))
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

  return file('manifest.webmanifest', JSON.stringify(fileContent, null, 2), { src: true })
    .pipe(gulp.dest(paths.prod.base))
}


// BUILDER
export const generateIcons = 
  gulp.series(
    iconsPNG,
    iconsICO,
    iconsSVG,
    iconsManifest,
    iconsWebmanifest
  )
