// MODULES IMPORT
const gulp = require('gulp')
const paths = require('./gulppaths')

const del = require('del')
const fs = require('fs')

const rename = require('gulp-rename')
const plumber = require('gulp-plumber')
const sourcemaps = require('gulp-sourcemaps')
const changed = require('gulp-changed')
const browserSync = require('browser-sync').create()
const flags = require('minimist')(process.argv.slice(1))
const file = require('gulp-file')
const chalk = require('chalk')

const imagemin = require('gulp-imagemin')
const resize = require('gulp-images-resizer')
const ico = require('gulp-to-ico')
const replace = require('gulp-replace')

const concat = require('gulp-concat')
const uglify = require('gulp-uglify')

const prefix = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const sass = require('gulp-sass')
sass.compiler = require('node-sass')


// GET ENVIRONMENT FLAG
var isProduction = 
  flags.production || 
  flags.prod || 
  flags.deploy || 
  flags.dist || 
  flags.build || 
  false


// PROJECT VARIABLES
var appName = 'Test App'
var appTitle = 'Test App'
var appKeywords = 'test,app,application,TEST,APP,APPLICATION'
var appDescription = 'This is a test app'
var appAuthor = 'App Test | hi@apptest.com'
var appColor = '#FFCC33'
var appUrl = 'https://www.apptest.com'
var appAuthorTwitter = '@apptest'
var appAnalyticsId = 'G-12345678'


// CLEAN WORK FOLDER
gulp.task('main:clean', function () {
  var targetFolder = isProduction ? paths.dist.base : paths.dev.base
  return del(targetFolder, { force:true })
})


// MARKUP
gulp.task('main:markup', function () {
  var targetFolder = isProduction ? paths.dist.base : paths.dev.base
  return gulp
    .src(paths.src.markup)
    .pipe(plumber())
    .pipe(replace('##appName##', appName))
    .pipe(replace('##appTitle##', appTitle))
    .pipe(replace('##appKeywords##', appKeywords))
    .pipe(replace('##appDescription##', appDescription))
    .pipe(replace('##appAuthor##', appAuthor))
    .pipe(replace('##appColor##', appColor))
    .pipe(replace('##appUrl##', appUrl))
    .pipe(replace('##appAuthorTwitter##', appAuthorTwitter))
    .pipe(replace('##appAnalyticsId##', appAnalyticsId))
    .pipe(gulp.dest(targetFolder))
    .on('end', function(){
      console.log(
        chalk.green.bold('\n' + '✅ MARKUP DONE!' + '\n')
      )
    })
})


// STYLES
gulp.task('main:styles', function () {
  if (isProduction) {
    return gulp
      .src(paths.src.styles)
      .pipe(plumber())
      .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(concat('styles.css'))
        .pipe(cleanCSS())
        .pipe(prefix())
        .pipe(rename('styles.min.css'))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(paths.dist.styles))
      .on('end', function(){
        console.log(
          chalk.green.bold('\n' + '✅ STYLES DONE!' + '\n')
        )
      })      
  } else {
    return gulp
      .src(paths.src.styles)
      .pipe(plumber())
      .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('styles.css'))
        .pipe(rename('styles.min.css'))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(paths.dev.styles))
      .on('end', function(){
        console.log(
          chalk.green.bold('\n' + '✅ STYLES DONE!' + '\n')
        )
      })
  }
})


// SCRIPTS
gulp.task('main:scripts', function () {
  if (isProduction) {
    return gulp
      .src(paths.src.scripts)
      .pipe(plumber())
      .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('scripts.min.js'))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(paths.dist.scripts))
      .on('end', function(){
        console.log(
          chalk.green.bold('\n' + '✅ SCRIPTS DONE!' + '\n')
        )
      })
  } else {
    return gulp
      .src(paths.src.scripts)
      .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(concat('scripts.min.js'))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(paths.dev.scripts))
      .on('end', function(){
        console.log(
          chalk.green.bold('\n' + '✅ SCRIPTS DONE!' + '\n')
        )
      })
  }
})


// IMAGES
gulp.task('main:images', function () {
  if (isProduction) {
    return gulp
      .src(paths.src.images)
      .pipe(plumber())
      .pipe(changed(paths.dist.images))
      .pipe(imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({ 
          plugins: [
            { removeViewBox: true },
            { cleanupIDs: false }
          ] 
        })
      ], {
        verbose: true
      }))
      .pipe(gulp.dest(paths.dist.images))
      .on('end', function(){
        console.log(
          chalk.green.bold('\n' + '✅ IMAGES DONE!' + '\n')
        )
      })
  } else {
    return gulp
      .src(paths.src.images)
      .pipe(plumber())
      .pipe(gulp.dest(paths.dev.images))
      .on('end', function(){
        console.log(
          chalk.green.bold('\n' + '✅ IMAGES DONE!' + '\n')
        )
      })
  }
})


// SOCIAL
gulp.task('main:social', function () {
  return gulp
    .src(paths.src.social)
    .pipe(plumber())
    .pipe(gulp.dest(paths.dist.base))
    .on('end', function(){
      console.log(
        chalk.green.bold('\n' + '✅ SOCIAL DONE!' + '\n')
      )
    })
})


// FONTS
gulp.task('main:fonts', function () {
  var targetFolder = isProduction ? paths.dist.fonts : paths.dev.fonts
  return gulp
    .src(paths.src.fonts)
    .pipe(plumber())
    .pipe(gulp.dest(targetFolder))
    .on('end', function(){
      console.log(
        chalk.green.bold('\n' + '✅ FONTS DONE!' + '\n')
      )
    })
})


// DOCS
gulp.task('main:docs', function () {
  var targetFolder = isProduction ? paths.dist.docs : paths.dev.docs
  return gulp
    .src(paths.src.docs)
    .pipe(plumber())
    .pipe(gulp.dest(targetFolder))
    .on('end', function(){
      console.log(
        chalk.green.bold('\n' + '✅ DOCS DONE!' + '\n')
      )
    })
})


// HTACCESS
gulp.task('main:htaccess', function () {
  var targetFolder = isProduction ? paths.dist.base : paths.dev.base
  return gulp
    .src(paths.src.htaccess, { allowEmpty: true })
    .pipe(plumber())
    .pipe(gulp.dest(targetFolder))
    .on('end', function(){
      console.log(
        chalk.green.bold('\n' + '✅ HTACCESS DONE!' + '\n')
      )
    })
})


// CREATE FILES
gulp.task('create:robotsTxt', function () {
  var fileContent = 'User-agent: *\nAllow: /'
  return gulp
    .src(paths.src.scripts)
    .pipe(file('robots.txt', fileContent))
    .pipe(gulp.dest(paths.dist.base))
})

gulp.task('create:humansTxt', function () {
  var d = new Date();
  var fileContent = '/* TEAM */\nDeveloper: Lucas Di Mattia\nTwitter: @untallucas\nFrom: Córdoba, Argentina\n\n/* SITE */\nLast update: '+ d +'\nLanguage: English'
  return gulp
    .src(paths.src.scripts)
    .pipe(file('humans.txt', fileContent))
    .pipe(gulp.dest(paths.dist.base))
})

gulp.task('create:readmeMd', function () {
  var fileContent = 'Read this'
  return gulp
    .src(paths.src.scripts)
    .pipe(file('readme.md', fileContent))
    .pipe(gulp.dest(paths.dist.base))
})

gulp.task('main:createFiles', gulp.series('create:robotsTxt', 'create:humansTxt', 'create:readmeMd'))


// FAVICONS
gulp.task('icons:generatePng', async function () {
  var iconVariants = [
    { size: 16, filename: 'favicon-16x16' },
    { size: 32, filename: 'favicon-32x32' },
    { size: 194, filename: 'favicon-194x194' },
    { size: 36, filename: 'android-chome-36x36' },
    { size: 48, filename: 'android-chome-48x48' },
    { size: 72, filename: 'android-chome-72x72' },
    { size: 96, filename: 'android-chome-96x96' },
    { size: 144, filename: 'android-chome-144x144' },
    { size: 192, filename: 'android-chome-192x192' },
    { size: 256, filename: 'android-chome-256x256' },
    { size: 384, filename: 'android-chome-384x384' },
    { size: 512, filename: 'android-chome-512x512' },
    { size: 180, filename: 'apple-touch-icon' },
    { size: 57, filename: 'apple-touch-icon-57x57' },
    { size: 60, filename: 'apple-touch-icon-60x60' },
    { size: 72, filename: 'apple-touch-icon-72x72' },
    { size: 76, filename: 'apple-touch-icon-76x76' },
    { size: 114, filename: 'apple-touch-icon-114x114' },
    { size: 120, filename: 'apple-touch-icon-120x120' },
    { size: 144, filename: 'apple-touch-icon-144x144' },
    { size: 152, filename: 'apple-touch-icon-152x152' },
    { size: 180, filename: 'apple-touch-icon-180x180' }
  ]
  return iconVariants.forEach(function (icons) {
    gulp.src(paths.src.icons + '/favicon.png')
      .pipe(resize({
        width: icons.size,
        height: icons.size,
        format: '.png'
      }))
      .pipe(imagemin())
      .pipe(rename(function (path) {
        path.dirname = ''
        path.basename = icons.filename
        path.extname = '.png'
      }))
      .pipe(gulp.dest(paths.dist.base))
  })
})

gulp.task('icons:generatePlainPng', async function () {
  var iconVariants = [
    { size: 70, filename: 'mstile-70x70' },
    { size: 144, filename: 'mstile-144x144' },
    { size: 150, filename: 'mstile-150x150' },
    { size: 310, filename: 'mstile-310x310' }
  ]
  return iconVariants.forEach(function (icons) {
    gulp.src(paths.src.icons + '/favicon-plain.png')
      .pipe(resize({
        width: icons.size,
        height: icons.size,
        format: '.png'
      }))
      .pipe(imagemin())
      .pipe(rename(function (path) {
        path.dirname = ''
        path.basename = icons.filename
        path.extname = '.png'
      }))
      .pipe(gulp.dest(paths.dist.base))
  })
})

gulp.task('icons:generateIco', function () {
  return gulp
    .src(paths.src.icons + '/favicon.png')
    .pipe(ico('favicon.ico', { resize: true, sizes: [16, 24, 32, 64] }))
    .pipe(gulp.dest(paths.dist.base))
})

gulp.task('icons:copyFiles', function () {
  return gulp
    .src(paths.src.icons + '/*.{xml,webmanifest}')
    .pipe(plumber())
    .pipe(replace('##appname##', appName))
    .pipe(replace('##appcolor##', appColor))
    .pipe(replace('##appdescription##', appDescription))
    .pipe(gulp.dest(paths.dist.base))
})

gulp.task('main:favicons', gulp.series('icons:generatePng', 'icons:generatePlainPng', 'icons:copyFiles', 'icons:generateIco'))


// RESET
gulp.task('reset', function () {
  return del([paths.dist.base, paths.dev.base])
})


// RELOAD WEB SERVER
gulp.task('reload', function (done) {
  browserSync.reload()
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
var generator = gulp.series('main:clean', gulp.parallel('main:markup', 'main:styles', 'main:scripts', 'main:images', 'main:fonts', 'main:docs', 'main:htaccess'), 'serve', 'watch')

if (isProduction) {
  generator = gulp.series('main:clean', gulp.parallel('main:markup', 'main:styles', 'main:scripts', 'main:images', 'main:social', 'main:fonts', 'main:docs', 'main:htaccess', 'main:favicons', 'main:createFiles'))
}

gulp.task('default', generator)


// TODO
// - Create local env files?
// - Better console log
// - Create favicons files with new setup (SVG) - https://github.com/RealFaviconGenerator/gulp-real-favicon
// - Create manifest and sort of with new setup
