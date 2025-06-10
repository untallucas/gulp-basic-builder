// TO EXECUTE
// yarn install
// yarn install:clean
// yarn code
// yarn build
// yarn restart


// MODULES IMPORT
import gulp from 'gulp'
import paths from './gulppaths.js'

import browserSync from 'browser-sync'
import chalk from 'chalk'
import concat from 'gulp-concat'
import file from 'gulp-file'
import plumber from 'gulp-plumber'
import rename from 'gulp-rename'
import replace from 'gulp-replace'
import terser from 'gulp-terser'
import sourcemaps from 'gulp-sourcemaps'
import fs from 'fs'
import { promises as fsPromises } from 'fs'

import imagemin from 'imagemin'
import pngquant from 'imagemin-pngquant'
import mozjpeg from 'imagemin-mozjpeg'
import gifsicle from 'imagemin-gifsicle'
import svgo from 'imagemin-svgo'
import through2 from 'through2'
import path from 'path'

import sharp from 'sharp'
import pngToIco from 'png-to-ico'
import { optimize } from 'svgo'

import * as sass from 'sass'
import gulpSass from 'gulp-sass'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

import dotenv from 'dotenv'
dotenv.config()


// GET ENVIRONMENT FLAG
const isProduction = process.env.NODE_ENV === 'prod'


// CLEAN WORK FOLDER
gulp.task('main:clean', async function () {
  var targetFolder = isProduction ? paths.prod.base : paths.dev.base
  return fs.promises.rm(targetFolder, { recursive: true, force: true })
})


// MARKUP
gulp.task('main:markup', function () {
  var targetFolder = isProduction ? paths.prod.base : paths.dev.base
  return gulp
    .src(paths.src.markup)
    .pipe(plumber())
    .pipe(replace('##appName##', process.env.APP_NAME))
    .pipe(replace('##appKeywords##', process.env.APP_KEYWORDS + ',' + process.env.APP_KEYWORDS.toUpperCase()))
    .pipe(replace('##appDescription##', process.env.APP_DESCRIPTION))
    .pipe(replace('##appColor##', process.env.APP_COLOR))
    .pipe(replace('##appTwitter##', process.env.APP_TWITTER))
    .pipe(replace('##appUrl##', process.env.APP_URL))
    .pipe(replace('##appAuthor##', process.env.APP_AUTHOR))
    .pipe(replace('##appAuthorTwitter##', process.env.APP_AUTHOR_TWITTER))
    .pipe(replace('##appAnalyticsId##', process.env.APP_ANALYTICS_ID))
    .pipe(gulp.dest(targetFolder))
})


// STYLES
const compileSass = gulpSass(sass)

gulp.task('main:styles', function () {
  if (isProduction) {
    return gulp
      .src(paths.src.styles)
      .pipe(plumber())
      .pipe(compileSass({outputStyle: 'compressed'}).on('error', compileSass.logError))
      .pipe(concat('styles.css'))
      .pipe(postcss([
        autoprefixer(),
        cssnano()
      ]))
      .pipe(rename('styles.min.css'))
      .pipe(gulp.dest(paths.prod.styles))
  } else {
    return gulp
      .src(paths.src.styles)
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(compileSass().on('error', compileSass.logError))
      .pipe(concat('styles.css'))
      .pipe(rename('styles.min.css'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(paths.dev.styles))
  }
})


// SCRIPTS
gulp.task('main:scripts', function () {
  if (isProduction) {
    return gulp
      .src(paths.src.scripts)
      .pipe(plumber())
      .pipe(terser())
      .pipe(concat('scripts.min.js'))
      .pipe(gulp.dest(paths.prod.scripts))
  } else {
    return gulp
      .src(paths.src.scripts)
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(concat('scripts.min.js'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(paths.dev.scripts))
  }
})


// IMAGES
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

gulp.task('main:images', function () {
  const srcImages = paths.src.images.replace(/\/\*\*\/\*\.\{.*\}$/, '')

  if (isProduction) {
    const targetFolder = paths.prod.images
    return optimizeAndCopyImages(srcImages, targetFolder)
  } else {
    const targetFolder = paths.dev.images
    return copyImages(srcImages, targetFolder)
  }
})


// SOCIAL
gulp.task('main:social', function () {
  return gulp
    .src(paths.src.social)
    .pipe(plumber())
    .pipe(gulp.dest(paths.prod.base))
})


// FONTS
gulp.task('main:fonts', function () {
  var targetFolder = isProduction ? paths.prod.fonts : paths.dev.fonts
  return gulp
    .src(paths.src.fonts)
    .pipe(plumber())
    .pipe(gulp.dest(targetFolder))
})


// DOCS
gulp.task('main:docs', function () {
  var targetFolder = isProduction ? paths.prod.docs : paths.dev.docs
  return gulp
    .src(paths.src.docs)
    .pipe(plumber())
    .pipe(gulp.dest(targetFolder))
})


// HTACCESS
gulp.task('main:htaccess', function () {
  var targetFolder = isProduction ? paths.prod.base : paths.dev.base
  var fileContent =
    '# TURN ON URL REWRITING\n' +
    'RewriteEngine On\n' +
    '\n' +
    '# REMOVE THE NEED FOR .PHP FILE EXTENTION\n' +
    'RewriteCond %{REQUEST_FILENAME} !-d\n' +
    'RewriteCond %{REQUEST_FILENAME}\.php -f\n' +
    'RewriteRule ^(.*)$ $1.php\n'

  return file('.htaccess', fileContent, { src: true })
  .pipe(gulp.dest(targetFolder))
})


// CREATE FILES
gulp.task('create:robotsTxt', function () {
  var fileContent = 'User-agent: *\nAllow: /'
  return file('robots.txt', fileContent, { src: true })
    .pipe(gulp.dest(paths.prod.base))
})

gulp.task('create:humansTxt', function () {
  var currentDate = new Date()
  var fileContent =
    '/* TEAM */' +
    '\n' +
    'Developer: ' + process.env.APP_AUTHOR +
    '\n' +
    'Twitter: ' + process.env.APP_AUTHOR_TWITTER + process.env.APP_ANALYTICS_ID +
    '\n' +
    'From: ' + process.env.APP_AUTHOR_LOCATION +
    '&nbsp;' + '\n' +
    '/* SITE */' +
    '\n' +
    'Last update: ' + currentDate +
    '\n' +
    'Language: ' + process.env.APP_LANGUAGE
  return file('humans.txt', fileContent, { src: true })
    .pipe(gulp.dest(paths.prod.base))
})

gulp.task('create:readmeMd', function () {
  var currentDate = new Date()
  const fileContent = `
    # ${process.env.APP_TITLE}
    ## ${process.env.APP_DESCRIPTION}
    &nbsp;

    ### 🧑‍💻&nbsp;&nbsp;Author
    **Developer:** ${process.env.APP_AUTHOR}
    **Twitter/X:** https://x.com/${process.env.APP_AUTHOR_TWITTER}
    **Email:** ${process.env.APP_AUTHOR_EMAIL}
    **Location:** ${process.env.APP_AUTHOR_LOCATION}
    &nbsp;

    ### 💻&nbsp;&nbsp;Site Information
    **Last update:** ${new Date().toDateString()}
    **Language:** ${process.env.APP_LANGUAGE}
    **License:** MIT
    &nbsp;

    ### 🚀&nbsp;&nbsp;Builder Features
    - Modular structure for build tasks
    - Automatic watch of styles, scripts, and images
    - Development mode with live server
    - Production mode with image optimization, icon processing, and meta files generation
    - Smart build cleanup
    - Minification of HTML, CSS, and JS
    &nbsp;

    ### 📦&nbsp;&nbsp;Install
        yarn install
    &nbsp;

    ### 🚦&nbsp;&nbsp;Start
        yarn start
    - Builds styles, scripts, and images
    &nbsp;

    ### 👨‍💻&nbsp;&nbsp;Development Mode
        yarn dev
        yarn code
    - Cleans the **dev/** folder
    - Compiles styles and scripts
    - Copies markup files
    - Copies assets files (images, fonts, and docs)
    - Generates sourcemaps for styles and scripts
    - Starts the development server
    - Actives watcher for files changes
    &nbsp;

    ### 🏗️&nbsp;&nbsp;Production Build
        yarn build
        yarn prod
    - Cleans the **prod/** folder
    - Compiles and minifies styles and scripts
    - Minifies markup files
    - Optimizes images while preserving format
    - Copies static files (fonts, docs, etc.)
    - Copies social share assets
    - Generates site icons
    - Generates meta files
    &nbsp;

    ### 🧼&nbsp;&nbsp;Cleanup Scripts
        yarn dev:clean
    - Deletes the **dev/** folder
    <!-- end of the list -->
    &nbsp;

        yarn prod:clean
    - Deletes the **prod/** folder
    <!-- end of the list -->
    &nbsp;

        yarn reset
    - Deletes everything (dev, prod, node_modules, .cache, yarn.lock) + cleans cache
    <!-- end of the list -->
    &nbsp;

    ### 🛠️&nbsp;&nbsp;Key Dependencies
    - **Cross-env:** Environment variables management
    - **Gulp + Plugins:** Tasks manager
    - **BrowserSync:** Live server with reload
    - **Imagemin + Sharp + Plugins:** Image optimization
    - **SASS + Postcss:** For SCSS styles manegement
    - **Favicons:** For generating multiple icons from a single image
    - **PNG-to-ICO:** Converts PNG images to ICO format
    - **Through2:** Stream utility for transforming files
    &nbsp;

    ### 📂&nbsp;&nbsp;Project Structure
        src/
          ├── docs/            # Assorted static files
          ├── fonts/           # Fonts files
          ├── icons/           # Favicons base
          ├── images/          # Images
          ├── scripts/         # Frontend JS
          ├── styles/          # SCSS
          ├── _components/     # HTML partials
          └── _templates/      # HTML layouts
        tasks/                 # Helper functions
        any-file.html          # HTML pages
    `;
  return file('readme.md', fileContent, { src: true })
    .pipe(gulp.dest(paths.prod.base))
})

gulp.task('main:createFiles', gulp.series('create:robotsTxt', 'create:humansTxt', 'create:readmeMd'))


// FAVICONS
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
  return gulp
    .src(paths.src.icons + 'manifest.json')
    .pipe(plumber())
    .pipe(replace('##appName##', process.env.APP_NAME))
    .pipe(replace('##appColor##', process.env.APP_COLOR))
    .pipe(gulp.dest(paths.prod.base))
})

gulp.task('main:favicons', gulp.series('icons:png', 'icons:ico', 'icons:svg', 'icons:manifest'))


// RESTART
gulp.task('restart', async function () {
  const folders = [paths.prod.base, paths.dev.base]

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
        'main:images',
        // 'main:social',
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
