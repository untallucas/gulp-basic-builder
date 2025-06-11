import gulp from 'gulp'
import browserSync from 'browser-sync'

import paths from '../gulppaths.js'

gulp.task('serve', function (done) {
  browserSync.init({
    server: {
      baseDir: paths.dev.base
    }
  })
  done()
})
