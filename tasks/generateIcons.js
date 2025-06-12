import gulp from 'gulp'
import file from 'gulp-file'
import sharp from 'sharp'
import pngToIco from 'png-to-ico'
import { optimize } from 'svgo'

import paths from '../gulppaths.js'

gulp.task('icons:png', async function () {
  const iconVariants = [
    { size: 64, filename: 'favicon' },
    { size: 180, filename: 'apple-touch-icon' },
    { size: 192, filename: 'icon-192' },
    { size: 512, filename: 'icon-512' }
  ]

  await Promise.all(iconVariants.map(async ({ size, filename }) => {
    const buffer = await sharp(paths.src.icons + 'favicon.png')
      .resize(size, size)
      .png({ compressionLevel: 9 })
      .toBuffer()

    const outputPath = path.join(paths.prod.base, `${filename}.png`)
    fs.writeFileSync(outputPath, buffer)
  }))
})

gulp.task('icons:ico', async function () {
  const sizes = [16, 24, 32, 64, 128, 256]
  const inputPath = path.join(paths.src.icons, 'favicon.png')
  const outputPath = path.join(paths.prod.base, 'favicon.ico')

  const tmpPngs = await Promise.all(
    sizes.map(size =>
      sharp(inputPath)
        .resize(size, size)
        .png()
        .toBuffer()
    )
  )

  const icoBuffer = await pngToIco(tmpPngs)
  fs.writeFileSync(outputPath, icoBuffer)
})

gulp.task('icons:svg', function () {
  return gulp
    .src(paths.src.icons + 'favicon.svg')
    .pipe(plumber())
    .pipe(
      through2.obj(function (file, _, cb) {
        if (!file.isBuffer()) return cb(null, file)

        try {
          const result = optimize(file.contents.toString(), {
            path: file.path,
            plugins: [
              { name: 'removeViewBox', active: true },
              { name: 'cleanupIds', active: false }
            ]
          })
          file.contents = Buffer.from(result.data)
          cb(null, file)
        } catch (err) {
          cb(err)
        }
      })
    )
    .pipe(gulp.dest(paths.prod.base))
})

gulp.task('icons:manifest', function () {
  var targetFolder = paths.prod.base
  var fileContent =
    '# MANIFEST\n' +
    '# MANIFEST\n' +
    '# MANIFEST\n' +
    '# MANIFEST\n'
  return file('manifest.json', fileContent, { src: true })
  .pipe(gulp.dest(targetFolder))
})


gulp.task(
  'generateIcons', 
  gulp.series(
    // 'icons:png', 
    // 'icons:ico', 
    // 'icons:svg', 
    'icons:manifest'
  )
)
