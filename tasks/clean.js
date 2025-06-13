import gulp from 'gulp'
import fs from 'fs'

import paths from '../gulppaths.js'

const isProduction = process.env.NODE_ENV === 'prod'

export async function clean() {
  var targetFolder = isProduction ? paths.prod.base : paths.dev.base
  return fs.promises.rm(targetFolder, { recursive: true, force: true })
}
