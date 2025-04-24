// TO EXECUTE
// yarn install
// yarn install:clean
// yarn code
// yarn build
// yarn restart


// MODULES IMPORT
import gulp from 'gulp'
import paths from './gulppaths.js'
import config from './appconfig.js'

import browserSync from 'browser-sync'
import chalk from 'chalk'
import changed from 'gulp-changed'
import concat from 'gulp-concat'
import file from 'gulp-file'
import plumber from 'gulp-plumber'
import rename from 'gulp-rename'
import replace from 'gulp-replace'
import uglify from 'gulp-uglify'
import fs from 'fs'

import through2 from 'through2'
import vinylBuffer from 'vinyl-buffer'
import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminJpegtran from 'imagemin-jpegtran'
import imageminWebp from 'imagemin-webp';
import imageminPngquant from 'imagemin-pngquant';
import path from 'path'
import tap from 'gulp-tap'
import { extname, basename, dirname, join } from 'path'

import sharp from 'sharp'
import pngToIco from 'png-to-ico'
import { promisify } from 'util'
import { optimize } from 'svgo'

import * as sass from 'sass'
import gulpSass from 'gulp-sass'
import prefix from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'


// GET ENVIRONMENT FLAG
const isProduction = process.env.NODE_ENV === 'production';


// CLEAN WORK FOLDER
gulp.task('main:clean', async function () {
  var targetFolder = isProduction ? paths.dist.base : paths.dev.base
  return fs.promises.rm(targetFolder, { recursive: true, force: true })
})


// MARKUP
gulp.task('main:markup', function () {
  var targetFolder = isProduction ? paths.dist.base : paths.dev.base
  return gulp
    .src(paths.src.markup)
    .pipe(plumber())
    .pipe(replace('##appName##', config.appName))
    .pipe(replace('##appKeywords##', config.appKeywords + ',' + config.appKeywords.toUpperCase()))
    .pipe(replace('##appDescription##', config.appDescription))
    .pipe(replace('##appColor##', config.appColor))
    .pipe(replace('##appTwitter##', config.appTwitter))
    .pipe(replace('##appUrl##', config.appUrl))
    .pipe(replace('##appAuthor##', config.appAuthor))
    .pipe(replace('##appAuthorTwitter##', config.appAuthorTwitter))
    .pipe(replace('##appAnalyticsId##', config.appAnalyticsId))
    .pipe(gulp.dest(targetFolder))
})


// STYLES
// const compileSass = gulpSass(sass)

gulp.task('main:styles', function () {
  if (isProduction) {
    return gulp
      .src(paths.src.styles)
      .pipe(plumber())
      .pipe(compileSass({outputStyle: 'compressed'}).on('error', compileSass.logError))
      .pipe(concat('styles.css'))
      .pipe(cleanCSS())
      .pipe(prefix())
      .pipe(rename('styles.min.css'))
      .pipe(gulp.dest(paths.dist.styles))
  } else {
    return gulp
      .src(paths.src.styles)
      .pipe(plumber())
      .pipe(compileSass().on('error', compileSass.logError))
      .pipe(concat('styles.css'))
      .pipe(rename('styles.min.css'))
      .pipe(gulp.dest(paths.dev.styles))
  }
})


// SCRIPTS
gulp.task('main:scripts', function () {
  if (isProduction) {
    return gulp
      .src(paths.src.scripts)
      .pipe(plumber())
      .pipe(uglify())
      .pipe(concat('scripts.min.js'))
      .pipe(gulp.dest(paths.dist.scripts))
  } else {
    return gulp
      .src(paths.src.scripts)
      .pipe(plumber())
      .pipe(concat('scripts.min.js'))
      .pipe(gulp.dest(paths.dev.scripts))
  }
})


// IMAGES
gulp.task('main:images', function () {
  if (isProduction) {
    return gulp
      .src(paths.src.images)
      .pipe(plumber())
      .pipe(changed(paths.dist.images))
      .pipe(
        through2.obj(async function (file, _, cb) {
          if (!file.isBuffer()) return cb(null, file)

          const ext = path.extname(file.path).toLowerCase()
          const transformer = sharp(file.contents)

          try {
            if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
              const buffer = await sharp(file.contents)
                .toFormat('jpeg', { quality: 75, progressive: true })
                .toBuffer()
              file.contents = buffer
              cb(null, file)
            }

            else if (ext === '.svg') {
              const result = optimize(file.contents.toString(), {
                path: file.path,
                plugins: [
                  { name: 'removeViewBox', active: true },
                  { name: 'cleanupIds', active: false }
                ]
              })
              file.contents = Buffer.from(result.data)
              cb(null, file)
            }

            else if (ext === '.gif') {
              cb(null, file)
            }

            else {
              cb(null, file)
            }
          } catch (err) {
            cb(err)
          }
        })
      )
      .pipe(gulp.dest(paths.dist.images))
  } else {
    return gulp
      .src(paths.src.images)
      .pipe(plumber())
      .pipe(gulp.dest(paths.dev.images))
  }
})


// SOCIAL
gulp.task('main:social', function () {
  return gulp
    .src(paths.src.social)
    .pipe(plumber())
    .pipe(gulp.dest(paths.dist.base))
})

gulp.task('test:social', function () {
  return gulp
    .src('./src/assets/social/**/*.{jpg,jpeg,png}', { allowEmpty: true })
    .pipe(plumber()) // Maneja errores sin interrumpir el flujo
    .pipe(gulp.dest('./dist/assets/social/')); // Copia los archivos al destino
});

// FONTS
gulp.task('main:fonts', function () {
  var targetFolder = isProduction ? paths.dist.fonts : paths.dev.fonts
  return gulp
    .src(paths.src.fonts)
    .pipe(plumber())
    .pipe(gulp.dest(targetFolder))
})


// DOCS
gulp.task('main:docs', function () {
  var targetFolder = isProduction ? paths.dist.docs : paths.dev.docs
  return gulp
    .src(paths.src.docs)
    .pipe(plumber())
    .pipe(gulp.dest(targetFolder))
})


// HTACCESS
gulp.task('main:htaccess', function () {
  var targetFolder = isProduction ? paths.dist.base : paths.dev.base
  return gulp
    .src(paths.src.htaccess, { allowEmpty: true })
    .pipe(plumber())
    .pipe(gulp.dest(targetFolder))
})


// CREATE FILES
gulp.task('create:robotsTxt', function () {
  var fileContent = 'User-agent: *\nAllow: /'
  return file('robots.txt', fileContent, { src: true })
    .pipe(gulp.dest(paths.dist.base))
})

gulp.task('create:humansTxt', function () {
  var currentDate = new Date()
  var fileContent =
    '/* TEAM */' + '\n' +
    'Developer: ' + config.appAuthor + '\n' +
    'Twitter: ' + config.appAuthorTwitter + '\n' +
    'From: ' + config.appAuthorLocation + '\n\n' +
    '/* SITE */' + '\n' +
    'Last update: ' + currentDate + '\n' +
    'Language: ' + config.appLanguage
  return file('humans.txt', fileContent, { src: true })
    .pipe(gulp.dest(paths.dist.base))
})

gulp.task('create:readmeMd', function () {
  var currentDate = new Date()
  var fileContent =
    '# ' + config.appName + '  ' + '\n' +
    '## ' + config.appDescription + '  ' + '\n' +
    '&nbsp;  ' + '\n' +
    '### TEAM  ' + '\n' +
    'Developer: ' + config.appAuthor + '  ' + '\n' +
    'Twitter: ' + config.appAuthorTwitter + '  ' + '\n' +
    'From: ' + config.appAuthorLocation + '  ' + '\n' +
    '&nbsp;  ' + '\n' +
    '### SITE  ' + '\n' +
    'Last update: ' + currentDate + '  ' + '\n' +
    'Language: ' + config.appLanguage
  return file('readme.md', fileContent, { src: true })
    .pipe(gulp.dest(paths.dist.base))
})

gulp.task('main:createFiles', gulp.series('create:robotsTxt', 'create:humansTxt', 'create:readmeMd'))


// FAVICONS
// const writeFileAsync = promisify(fs.writeFile)

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

    const outputPath = path.join(paths.dist.base, `${filename}.png`)
    fs.writeFileSync(outputPath, buffer)
  }))
})

gulp.task('icons:ico', async function () {
  const sizes = [16, 24, 32, 64, 128, 256]
  const inputPath = path.join(paths.src.icons, 'favicon.png')
  const outputPath = path.join(paths.dist.base, 'favicon.ico')

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
    .pipe(gulp.dest(paths.dist.base))
})

gulp.task('icons:manifest', function () {
  return gulp
    .src(paths.src.icons + 'manifest.json')
    .pipe(plumber())
    .pipe(replace('##appName##', config.appName))
    .pipe(replace('##appColor##', config.appColor))
    .pipe(gulp.dest(paths.dist.base))
})

gulp.task('main:favicons', gulp.series('icons:png', 'icons:ico', 'icons:svg', 'icons:manifest'))


// RESTART
gulp.task('restart', async function () {
  const folders = [paths.dist.base, paths.dev.base]

  await Promise.all(
    folders.map(folder =>
      fs.promises.rm(folder, { recursive: true, force: true })
    )
  )
})


// RELOAD WEB SERVER
gulp.task('reload', function (done) {
  browserSync.reload()
  done()
})


// SUCCESS REPORT TO CONSOLE
gulp.task('report', function (done) {
  console.log(
    chalk.green.bold(
      '\n' +
      '+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++' +
      '\n' + '\n'
    ) +
    chalk.gray(
      '✅ Markup files copied' + '\n' +
      '✅ Styles minified and optimized' + '\n' +
      '✅ Scripts compiled and minified' + '\n' +
      '✅ Images copied and compressed' + '\n' +
      '✅ Social share assets copied' + '\n' +
      '✅ Font files copied' + '\n' +
      '✅ Documents files copied' + '\n' +
      '✅ Htaccess file created' + '\n' +
      '✅ Favicons and identity assets created' + '\n' +
      '✅ Humans, robots and other files created' + '\n'
    ) +
    chalk.green.bold(
      '\n' + '\n' +
      '✅ SUCCESSFUL BUILD!!!' + '\n' +
      '\n' +
      '+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++' +
      '\n'
    )
  )
  done()
})


// SERVE
gulp.task('serve', function (done) {
  browserSync.init({
    server: {
      baseDir: paths.dev.base
    }
  })
  done()
})


// WATCH
gulp.task('watch', function () {
  gulp.watch(paths.src.markup, gulp.series('main:markup', 'reload'))
  gulp.watch(paths.src.styles, gulp.series('main:styles', 'reload'))
  gulp.watch(paths.src.scripts, gulp.series('main:scripts', 'reload'))
  gulp.watch(paths.src.images, gulp.series('main:images', 'reload'))
  gulp.watch(paths.src.fonts, gulp.series('main:fonts', 'reload'))
  gulp.watch(paths.src.docs, gulp.series('main:docs', 'reload'))
})


// CONSTRUCTORS
var generator =
  gulp.series(
    'main:clean',
    gulp.parallel(
      'main:markup',
      'main:styles',
      'main:scripts',
      'main:images',
      'main:fonts',
      'main:docs',
      'main:htaccess'
    ),
    'serve',
    'watch'
  )

if (isProduction) {
  generator =
    gulp.series(
      'main:clean',
      gulp.parallel(
        'main:markup',
        'main:styles',
        'main:scripts',
        // 'main:images',
        'main:social',
        'main:fonts',
        'main:docs',
        'main:htaccess',
        // 'main:favicons',
        'main:createFiles'
      ),
      'report'
    )
}

gulp.task('default', generator)
