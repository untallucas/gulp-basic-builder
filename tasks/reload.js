import gulp from 'gulp'
import browserSync from 'browser-sync'

gulp.task('reload', function (done) {
  browserSync.reload()
  done()
})
