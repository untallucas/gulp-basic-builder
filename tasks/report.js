import { withLogs } from './report_new.js'

export function report(done) {
  return withLogs('report', Promise.resolve())
}
