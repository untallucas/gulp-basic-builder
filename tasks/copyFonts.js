import gulp from 'gulp'
import plumber from 'gulp-plumber'

import paths from '../gulppaths.js'

const isProduction = process.env.NODE_ENV === 'prod'

gulp.task('copyFonts', function () {
  var targetFolder = isProduction ? paths.prod.fonts : paths.dev.fonts
  return gulp
    .src(paths.src.fonts)
    .pipe(plumber())
    .pipe(gulp.dest(targetFolder))
})
