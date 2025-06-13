import gulp from 'gulp'

import paths from '../gulppaths.js'

export function watch() {
  gulp.watch(paths.src.markup, gulp.series('processMarkup', 'reload'))
  gulp.watch(paths.src.styles, gulp.series('processStyles', 'reload'))
  gulp.watch(paths.src.scripts, gulp.series('processScripts', 'reload'))
  gulp.watch(paths.src.images, gulp.series('processImages', 'reload'))
  gulp.watch(paths.src.fonts, gulp.series('copyFonts', 'reload'))
  gulp.watch(paths.src.docs, gulp.series('copyDocs', 'reload'))
}
