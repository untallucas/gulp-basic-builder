import gulp from 'gulp'
import plumber from 'gulp-plumber'
import concat from 'gulp-concat'
import terser from 'gulp-terser'
import sourcemaps from 'gulp-sourcemaps'
import paths from '../gulppaths.js'

const isProduction = process.env.NODE_ENV === 'prod'

gulp.task('processScripts', function () {
  if (isProduction) {
    return gulp
      .src(paths.src.scripts)
      .pipe(plumber())
      .pipe(terser())
      .pipe(concat('scripts.min.js'))
      .pipe(gulp.dest(paths.prod.scripts))
  } else {
    return gulp
      .src(paths.src.scripts)
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(concat('scripts.min.js'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(paths.dev.scripts))
  }
})
