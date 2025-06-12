import gulp from 'gulp'

import './tasks/copyDocs.js'
import './tasks/copyFonts.js'
import './tasks/generateIcons.js'
import './tasks/generateMetaFiles.js'
import './tasks/generateHtaccess.js'
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
    'generateHtaccess',
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
    'generateHtaccess',
    'generateIcons',
    'generateMetaFiles',
    'copyFonts',
    'copyDocs',
  ),
  'report'
)

gulp.task('default', isProduction ? prod : dev)
