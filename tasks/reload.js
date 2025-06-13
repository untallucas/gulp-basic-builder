import gulp from 'gulp'
import browserSync from 'browser-sync'

export function reload(done) {
  browserSync.reload()
  done()
}
