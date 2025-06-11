import gulp from 'gulp'
import plumber from 'gulp-plumber'
import concat from 'gulp-concat'
import rename from 'gulp-rename'
import sourcemaps from 'gulp-sourcemaps'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import * as sass from 'sass'
import gulpSass from 'gulp-sass'

import paths from '../gulppaths.js'

const isProduction = process.env.NODE_ENV === 'prod'
const compileSass = gulpSass(sass)

gulp.task('processStyles', function () {
  if (isProduction) {
    return gulp
      .src(paths.src.styles)
      .pipe(plumber())
      .pipe(compileSass({ outputStyle: 'compressed' }).on('error', compileSass.logError))
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
