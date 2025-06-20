import gulp from 'gulp'
import plumber from 'gulp-plumber'
import { withLogs } from './report_new.js'

import paths from '../gulppaths.js'

const isProduction = process.env.NODE_ENV === 'prod'

export function copyFonts() {
  var targetFolder = isProduction ? paths.prod.fonts : paths.dev.fonts

  return withLogs('copyFonts', 
    gulp
      .src(paths.src.fonts)
      .pipe(plumber())
      .pipe(gulp.dest(targetFolder))
  )
}
