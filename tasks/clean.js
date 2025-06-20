import fs from 'fs'
import { withLogs } from './report_new.js'

import paths from '../gulppaths.js'

const isProduction = process.env.NODE_ENV === 'prod'

export function clean() {
  var targetFolder = isProduction ? paths.prod.base : paths.dev.base
  return withLogs('clean', 
    fs.promises.rm(targetFolder, { recursive: true, force: true })
  )
}
