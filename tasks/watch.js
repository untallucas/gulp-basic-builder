import gulp from 'gulp'

import { processImages } from './processImages.js'
import { processMarkup } from './processMarkup.js'
import { processScripts } from './processScripts.js'
import { processStyles } from './processStyles.js'
import { copyDocs } from './copyDocs.js'
import { copyFonts } from './copyFonts.js'
import { reload } from './reload.js'

import paths from '../gulppaths.js'

export function watch() {
  gulp.watch(
    paths.src.markup, 
    gulp.series(
      processMarkup, 
      reload
    )
  )
  gulp.watch(
    paths.src.styles, 
    gulp.series(
      processStyles, 
      reload
    )
  )
  gulp.watch(
    paths.src.scripts, 
    gulp.series(
      processScripts, 
      reload
    )
  )
  gulp.watch(
    paths.src.images, 
    gulp.series(
      processImages, 
      reload
    )
  )
  gulp.watch(
    paths.src.fonts, 
    gulp.series(
      copyFonts, 
      reload
    )
  )
  gulp.watch(
    paths.src.docs, 
    gulp.series(
      copyDocs, 
      reload
    )
  )
}
