import gulp from 'gulp'
import plumber from 'gulp-plumber'
import { withLogs } from './report_new.js'

import paths from '../gulppaths.js'

const isProduction = process.env.NODE_ENV === 'prod'

export function copyDocs() {
  var targetFolder = isProduction ? paths.prod.docs : paths.dev.docs

  return withLogs('copyDocs', 
    gulp
      .src(paths.src.docs)
      .pipe(plumber())
      .pipe(gulp.dest(targetFolder))
  )
}
