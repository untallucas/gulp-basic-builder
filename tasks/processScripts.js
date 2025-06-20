import gulp from 'gulp'
import concat from 'gulp-concat'
import plumber from 'gulp-plumber'
import terser from 'gulp-terser'
import { withLogs } from './report_new.js'

import paths from '../gulppaths.js'

const isProduction = process.env.NODE_ENV === 'prod'

export function processScripts() {
  const stream = isProduction
    ? gulp
      .src(paths.src.scripts)
      .pipe(plumber())
      .pipe(terser())
      .pipe(concat('scripts.min.js'))
      .pipe(gulp.dest(paths.prod.scripts))
    : gulp
      .src(paths.src.scripts)
      .pipe(plumber())
      .pipe(concat('scripts.min.js'))
      .pipe(gulp.dest(paths.dev.scripts))

  return withLogs('processStyles', stream)
}
