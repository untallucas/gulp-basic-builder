// MODULES IMPORT
var gulp = require('gulp')
var sass = require('gulp-sass')
var concat = require('gulp-concat')
var cleanCSS = require('gulp-clean-css')
var autoprefixer = require('gulp-autoprefixer')
var rename = require('gulp-rename')
var imagemin = require('gulp-imagemin')
var uglify = require('gulp-uglify')
var gcmq = require('gulp-group-css-media-queries')
var browserSync = require('browser-sync').create()
var del = require('del')
var fs = require('fs')
var paths = require('./gulppaths')

// ------------------------------------------------------------------------- //

// DELETE FULL DEV DIRECTORY
gulp.task('main:clean', function () {
  return del(paths.dev.base)
})

// COPY HTML/PHP/JSON CODE
gulp.task('main:markup', function () {
  return gulp
    .src(paths.src.markup + '/*.{html,php,json,md}')
    .pipe(gulp.dest(paths.dev.base))
})

// COPY HTACCESS
gulp.task('main:htaccess', function () {
  return gulp
    .src(paths.src.markup + '/.htaccess')
    .pipe(gulp.dest(paths.dev.base))
})

// PROCESS SCSS
gulp.task('main:styles', function () {
  return gulp
    .src(paths.src.styles + '/styles.scss')
    .pipe(sass())
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest(paths.dev.styles))
})

// CONCAT JS
gulp.task('main:scripts', function () {
  return gulp
    .src(paths.src.scripts + '/**/*.js')
    .pipe(concat('scripts.min.js'))
    .pipe(gulp.dest(paths.dev.scripts))
})

// COPY IMAGES
gulp.task('main:images', function () {
  return gulp
    .src(paths.src.images + '/**/*')
    .pipe(gulp.dest(paths.dev.images))
})

// COPY FONTS
gulp.task('main:fonts', function () {
  return gulp
    .src(paths.src.fonts + '/**/*')
    .pipe(gulp.dest(paths.dev.fonts))
})

// COPY PLUGINS
gulp.task('main:plugins', function () {
  return gulp
    .src(paths.src.plugins + '/**/*')
    .pipe(gulp.dest(paths.dev.plugins))
})

// COPY DOCS
gulp.task('main:docs', function () {
  return gulp
    .src(paths.src.docs + '/**/*')
    .pipe(gulp.dest(paths.dev.docs))
})

// RUN TASKS RELATED TO IMAGES / FONTS / DOCS
gulp.task('main:static',
  gulp.parallel('main:images', 'main:fonts', 'main:plugins', 'main:docs')
)

// ------------------------------------------------------------------------- //

// DELETE FULL BUILD DIRECTORY
gulp.task('build:clean', function () {
  return del(paths.dist.base)
})

// COPY HTML/PHP/JSON CODE
gulp.task('build:markup', function () {
  return gulp
    .src(paths.src.markup + '/*.{html,php,json.md}')
    .pipe(gulp.dest(paths.dist.base))
})

// COPY HTACCESS
gulp.task('build:htaccess', function () {
  return gulp
    .src(paths.src.markup + '/.htaccess')
    .pipe(gulp.dest(paths.dist.base))
})

// PROCESS AND MINIFY SCSS
gulp.task('build:styles', function () {
  return gulp
    .src(paths.src.styles + '/styles.scss')
    .pipe(sass())
    .pipe(gcmq())
    .pipe(cleanCSS())
    .pipe(rename('styles.min.css'))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'iOS 8']
    }))
    .pipe(gulp.dest(paths.dist.styles))
})

// CONCAT AND MINIFY JS
gulp.task('build:scripts', function () {
  return gulp
    .src(paths.src.scripts + '/**/*.js')
    .pipe(uglify())
    .pipe(concat('scripts.min.js'))
    .pipe(gulp.dest(paths.dist.scripts))
})

// COPY AND OPTIMIZE IMAGES
gulp.task('build:images', function () {
  return gulp
    .src(paths.src.images + '/**/*')
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({ plugins: [{ removeViewBox: true }] })
    ]))
    .pipe(gulp.dest(paths.dist.images))
})

// COPY FONTS
gulp.task('build:fonts', function () {
  return gulp
    .src(paths.src.fonts + '/**/*')
    .pipe(gulp.dest(paths.dist.fonts))
})

// COPY PLUGINS
gulp.task('build:plugins', function () {
  return gulp
    .src(paths.src.plugins + '/**/*')
    .pipe(gulp.dest(paths.dist.plugins))
})

// COPY DOCS
gulp.task('build:docs', function () {
  return gulp
    .src(paths.src.docs + '/**/*')
    .pipe(gulp.dest(paths.dist.docs))
})

// COPY ICONS
gulp.task('build:icons', function () {
  return gulp
    .src(paths.src.icons + '/**/*')
    .pipe(gulp.dest(paths.dist.icons))
})

// COPY FAVICON
gulp.task('build:favicon', function () {
  return gulp
    .src(paths.src.icons + '/favicon.ico')
    .pipe(gulp.dest(paths.dist.base))
})

// RUN TASKS RELATED TO IMAGES / FONTS / ICONS / DOCS
gulp.task('build:static',
  gulp.parallel('build:images', 'build:fonts', 'build:plugins', 'build:docs', 'build:icons', 'build:favicon')
)

// GENERATE FILES
gulp.task('build:createfiles', function (done) {
  fs.writeFile(paths.dist.base + '/robots.txt', 'User-agent: *\nAllow: /', done)
  // fs.writeFile( paths.dist.base+'/readme.md', 'contents', done )
})

// ------------------------------------------------------------------------- //

// PROCESS AND MINIFY VENDOR JS
gulp.task('vendor:scripts', function () {
  return gulp
    .src(paths.src.vendor.scripts)
    .pipe(uglify())
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest(paths.dev.scripts))
    .pipe(gulp.dest(paths.dist.scripts))
})

// PROCESS AND MINIFY VENDOR SCSS
gulp.task('vendor:styles', function () {
  return gulp
    .src(paths.src.styles + '/vendor.scss')
    .pipe(sass({
      outputStyle: 'expanded',
      includePaths: paths.src.vendor.styles
    }))
    .pipe(cleanCSS())
    .pipe(rename('vendor.min.css'))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'iOS 8']
    }))
    .pipe(gulp.dest(paths.dev.styles))
    .pipe(gulp.dest(paths.dist.styles))
})

// ------------------------------------------------------------------------- //

// RELOADS WEB SERVER
gulp.task('reload', function (done) {
  browserSync.reload()
  done()
})

// SERVES DEV SITE
gulp.task('serve', function (done) {
  browserSync.init({
    server: {
      baseDir: paths.dev.base
    }
  })
  done()
})

// ------------------------------------------------------------------------- //

// CHANGE CONTROL AND TASK RUNNER
gulp.task('watch', function () {
  gulp.watch(paths.src.markup + '/**/*.{html,php,json,md}', gulp.series('main:markup', 'reload'))
  gulp.watch(paths.src.markup + '/.htaccess', gulp.series('main:htaccess', 'reload'))
  gulp.watch(paths.src.styles + '/**/*', gulp.series('main:styles', 'reload'))
  gulp.watch(paths.src.scripts + '/**/*', gulp.series('main:scripts', 'reload'))
  gulp.watch(paths.src.images + '/**/*', gulp.series('main:images', 'reload'))
  gulp.watch(paths.src.fonts + '/**/*', gulp.series('main:fonts', 'reload'))
  // gulp.watch(paths.src.vendor + '/**/*.js', gulp.series('vendor:scripts', 'reload'))
  // gulp.watch(paths.src.vendor + '/**/*', gulp.series('vendor:styles', 'reload'))
})

// ------------------------------------------------------------------------- //

// DEFAULT
gulp.task('default', gulp.series('main:clean', gulp.parallel('main:markup', 'main:htaccess', 'main:styles', 'main:scripts', 'main:static', 'vendor:scripts', 'vendor:styles'), 'serve', 'watch'))

// BUILD
gulp.task('build', gulp.series('build:clean', gulp.parallel('build:markup', 'build:htaccess', 'build:styles', 'build:scripts', 'build:static', 'vendor:scripts', 'vendor:styles'), 'build:createfiles'))

/*
TODO:
  - separar tasks de vendors en build y dev // no repetir esos export cada vez q se toca algo
  - sourcemaps
  - why use pump
  - cachear imagenes
  - linter
  - ver si los vendor.static sirven para algo
  - https://github.com/RealFaviconGenerator/gulp-real-favicon
*/
