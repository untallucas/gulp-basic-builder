import gulp from 'gulp'

import { copyDocs } from './tasks/copyDocs.js'
import { copyFonts } from './tasks/copyFonts.js'
import { generateIcons } from './tasks/generateIcons.js'
import { generateMetaFiles } from './tasks/generateMetaFiles.js'
import { generateHtaccess } from './tasks/generateHtaccess.js'
import { processImages } from './tasks/processImages.js'
import { processMarkup } from './tasks/processMarkup.js'
import { processScripts } from './tasks/processScripts.js'
import { processSocial } from './tasks/processSocial.js'
import { processStyles } from './tasks/processStyles.js'
import { clean } from './tasks/clean.js'
import { report } from './tasks/report.js'
import { serve } from './tasks/serve.js'
import { watch } from './tasks/watch.js'

import dotenv from 'dotenv-flow'
dotenv.config()

// GET ENVIRONMENT FLAG
const isProduction = process.env.NODE_ENV === 'prod'

// TASK CONSTRUCTORS - DEVELOPMENT
const dev = gulp.series(
  clean,
  gulp.parallel(
    processMarkup,
    processScripts,
    processStyles,
    processImages,
    generateHtaccess,
    copyFonts,
    copyDocs,
  ),
  serve,
  watch
)

// TASK CONSTRUCTORS - PRODUCTION
const prod = gulp.series(
  clean,
  processMarkup,
  processScripts,
  processStyles,
  processImages,
  processSocial,
  generateHtaccess,
  generateIcons,
  generateMetaFiles,
  copyFonts,
  copyDocs,
  report
)

gulp.task('default', isProduction ? prod : dev)
