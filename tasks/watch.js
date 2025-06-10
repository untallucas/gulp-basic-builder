import gulp from 'gulp'

gulp.task('watch', function () {
  gulp.watch(paths.src.markup, gulp.series('main:markup', 'reload'))
  gulp.watch(paths.src.styles, gulp.series('main:styles', 'reload'))
  gulp.watch(paths.src.scripts, gulp.series('main:scripts', 'reload'))
  gulp.watch(paths.src.images, gulp.series('main:images', 'reload'))
  gulp.watch(paths.src.fonts, gulp.series('main:fonts', 'reload'))
  gulp.watch(paths.src.docs, gulp.series('main:docs', 'reload'))
})
