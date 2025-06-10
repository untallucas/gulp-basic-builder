import gulp from 'gulp'
import plumber from 'gulp-plumber'
import paths from '../gulppaths.js'

const isProduction = process.env.NODE_ENV === 'prod'

gulp.task('copyDocs', function () {
  var targetFolder = isProduction ? paths.prod.docs : paths.dev.docs
  return gulp
    .src(paths.src.docs)
    .pipe(plumber())
    .pipe(gulp.dest(targetFolder))
})
