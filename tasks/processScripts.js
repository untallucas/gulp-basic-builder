import gulp from 'gulp'
import concat from 'gulp-concat'
import plumber from 'gulp-plumber'
import terser from 'gulp-terser'

import paths from '../gulppaths.js'

const isProduction = process.env.NODE_ENV === 'prod'

export function processScripts() {
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
      .pipe(concat('scripts.min.js'))
      .pipe(gulp.dest(paths.dev.scripts))
  }
}
