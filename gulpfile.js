import gulp from 'gulp'

import './tasks/copyDocs.js'
import './tasks/copyFonts.js'
import './tasks/createFavicons.js'
import './tasks/createFiles.js'
import './tasks/createHtaccess.js'
import './tasks/processImages.js'
import './tasks/processMarkup.js'
import './tasks/processScripts.js'
import './tasks/processSocial.js'
import './tasks/processStyles.js'
import './tasks/clean.js'
import './tasks/reload.js'
import './tasks/report.js'
import './tasks/serve.js'
import './tasks/watch.js'

import dotenv from 'dotenv'
dotenv.config()

// GET ENVIRONMENT FLAG
const isProduction = process.env.NODE_ENV === 'prod'

// TASK CONSTRUCTORS - DEVELOPMENT
const dev = gulp.series(
  'clean',
  gulp.parallel(
    'processMarkup',
    'processScripts',
    'processStyles',
    'processImages',
    'createHtaccess',
    'copyFonts',
    'copyDocs',
  ),
  'serve',
  'watch'
)

// TASK CONSTRUCTORS - PRODUCTION
const prod = gulp.series(
  'clean',
  gulp.parallel(
    'processMarkup',
    'processScripts',
    'processStyles',
    'processImages',
    'processSocial',
    'createHtaccess',
    'createFavicons',
    'createFiles',
    'copyFonts',
    'copyDocs',
  ),
  'report'
)

gulp.task('default', isProduction ? prod : dev)
