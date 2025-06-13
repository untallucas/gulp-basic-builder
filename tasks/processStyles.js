import gulp from 'gulp'
import autoprefixer from 'autoprefixer'
import concat from 'gulp-concat'
import cssnano from 'cssnano'
import gulpSass from 'gulp-sass'
import plumber from 'gulp-plumber'
import postcss from 'gulp-postcss'
import rename from 'gulp-rename'
import * as sass from 'sass'
import sourcemaps from 'gulp-sourcemaps'

import paths from '../gulppaths.js'

const isProduction = process.env.NODE_ENV === 'prod'
const compileSass = gulpSass(sass)

export function processStyles() {
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
}
