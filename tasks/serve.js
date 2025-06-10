import gulp from 'gulp'
import browserSync from 'browser-sync'

gulp.task('serve', function (done) {
  browserSync.init({
    server: {
      baseDir: paths.dev.base
    }
  })
  done()
})
