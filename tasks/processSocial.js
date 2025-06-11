import gulp from 'gulp'
import plumber from 'gulp-plumber'

import paths from '../gulppaths.js'

gulp.task('processSocial', function () {
  return gulp
    .src(paths.src.social)
    .pipe(plumber())
    .pipe(gulp.dest(paths.prod.base))
})
