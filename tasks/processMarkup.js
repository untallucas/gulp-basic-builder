import gulp from 'gulp'
import fileInclude from 'gulp-file-include'
import plumber from 'gulp-plumber'
import replace from 'gulp-replace'

import paths from '../gulppaths.js'

const isProduction = process.env.NODE_ENV === 'prod'

export function processMarkup() {
  var targetFolder = isProduction ? paths.prod.base : paths.dev.base
  return gulp
    .src(paths.src.markup)
    .pipe(plumber())
    .pipe(replace('##appName##', process.env.APP_TITLE))
    .pipe(replace('##appKeywords##', process.env.APP_KEYWORDS + ',' + process.env.APP_KEYWORDS.toUpperCase()))
    .pipe(replace('##appDescription##', process.env.APP_DESCRIPTION))
    .pipe(replace('##appColor##', process.env.APP_COLOR))
    .pipe(replace('##appTwitter##', process.env.APP_TWITTER))
    .pipe(replace('##appUrl##', process.env.APP_URL))
    .pipe(replace('##appAuthor##', process.env.APP_AUTHOR))
    .pipe(replace('##appAuthorTwitter##', process.env.APP_AUTHOR_TWITTER))
    .pipe(replace('##appAnalyticsId##', process.env.APP_ANALYTICS_ID))
    .pipe(fileInclude({
      prefix: '@@',
      basepath: paths.src.partials,
    }))
    .pipe(gulp.dest(targetFolder))
}
