// EXECUTE
// npm run code
// npm run build
// npm run clean

// VARIABLES
var appColor = '#FFFFFF'
var appName = 'App Name'
var appDescription = 'This is a short app description.'

// MODULES IMPORT
var gulp = require('gulp')
var paths = require('./gulppaths')
var rename = require('gulp-rename')
var plumber = require('gulp-plumber')
var sourcemaps = require('gulp-sourcemaps')
var changed = require('gulp-changed')
var del = require('del')
var browserSync = require('browser-sync').create()
var flags = require('minimist')(process.argv.slice(1))
var include = require('gulp-file-include')

var imagemin = require('gulp-imagemin')
var resize = require('gulp-images-resizer')
var ico = require('gulp-to-ico')
var replace = require('gulp-replace')

var concat = require('gulp-concat')
var uglify = require('gulp-uglify')

var prefix = require('gulp-autoprefixer')
var cleanCSS = require('gulp-clean-css')
var sass = require('gulp-sass')
sass.compiler = require('node-sass')

// ENVIRONMENT
var isProduction = flags.production || flags.prod || flags.deploy || flags.dist || flags.build || false

// FOLDER
gulp.task('main:clean', function () {
  var targetFolder = isProduction ? paths.dist.base : paths.dev.base
  return del(targetFolder)
})

// MARKUP
gulp.task('main:markup', function () {
  var targetFolder = isProduction ? paths.dist.base : paths.dev.base
  return gulp
    .src(paths.src.markup)
    .pipe(plumber())
    .pipe(include({
      basepath: paths.src.modules
    }))
    .pipe(gulp.dest(targetFolder))
})

// STYLES
gulp.task('main:styles', function () {
  if (isProduction) {
    return gulp
      .src([paths.src.styles, paths.src.modules + '**/*.scss'])
      .pipe(plumber())
      .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(concat('styles.css'))
        .pipe(cleanCSS())
        .pipe(prefix({
          browsers: ['last 2 versions', 'safari 5', 'ie 9', 'ios 6', 'android 4']
        }))
        .pipe(rename('styles.min.css'))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(paths.dist.styles))
  } else {
    return gulp
      .src([paths.src.styles, paths.src.modules + '**/*.scss'])
      .pipe(plumber())
      .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('styles.css'))
        .pipe(rename('styles.min.css'))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(paths.dev.styles))
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
  } else {
    return gulp
      .src(paths.src.scripts)
      .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(concat('scripts.min.js'))
      .pipe(sourcemaps.write('./'))
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
      .pipe(imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({ plugins: [{ removeViewBox: true }, { cleanupIDs: false }] })
      ], {
        verbose: true
      }))
      .pipe(gulp.dest(paths.dist.images))
  } else {
    return gulp
      .src(paths.src.images)
      .pipe(plumber())
      .pipe(gulp.dest(paths.dev.images))
  }
})

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

// FAVICONS
gulp.task('icons:generate-png', async function () {
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

gulp.task('icons:generate-plain-png', async function () {
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

gulp.task('icons:generate-ico', function () {
  return gulp
    .src(paths.src.icons + '/favicon.png')
    .pipe(ico('favicon.ico', { resize: true, sizes: [16, 24, 32, 64] }))
    .pipe(gulp.dest(paths.dist.base))
})

gulp.task('icons:copy-files', function () {
  return gulp
    .src(paths.src.icons + '/*.{xml,webmanifest}')
    .pipe(plumber())
    .pipe(replace('##appname##', appName))
    .pipe(replace('##appcolor##', appColor))
    .pipe(replace('##appdescription##', appDescription))
    .pipe(gulp.dest(paths.dist.base))
})

gulp.task('main:favicons', gulp.series('icons:generate-png', 'icons:generate-plain-png', 'icons:copy-files', 'icons:generate-ico'))

// CLEANUP
gulp.task('clean', function () {
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
  gulp.watch([paths.src.markup, paths.src.modules + '**/*.html'], gulp.series('main:markup', 'reload'))
  gulp.watch([paths.src.styles, paths.src.modules + '**/*.scss'], gulp.series('main:styles', 'reload'))
  gulp.watch(paths.src.scripts, gulp.series('main:scripts', 'reload'))
  gulp.watch(paths.src.images, gulp.series('main:images', 'reload'))
  gulp.watch(paths.src.fonts, gulp.series('main:fonts', 'reload'))
  gulp.watch(paths.src.docs, gulp.series('main:docs', 'reload'))
  gulp.watch(paths.src.htaccess, gulp.series('main:htaccess', 'reload'))
})

// CONSTRUCTOR
var generator = ''
if (isProduction) {
  generator = gulp.series('main:clean', gulp.parallel('main:markup', 'main:styles', 'main:scripts', 'main:images', 'main:fonts', 'main:docs', 'main:htaccess', 'main:favicons'))
} else {
  generator = gulp.series('main:clean', gulp.parallel('main:markup', 'main:styles', 'main:scripts', 'main:images', 'main:fonts', 'main:docs', 'main:htaccess'), 'serve', 'watch')
}
gulp.task('default', generator)
