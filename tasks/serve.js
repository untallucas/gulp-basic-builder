import gulp from 'gulp'
import browserSync from 'browser-sync'

import paths from '../gulppaths.js'

export function serve(done) {
  browserSync.init({
    server: {
      baseDir: paths.dev.base
    }
  })
  done()
}
