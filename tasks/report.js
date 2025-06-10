import gulp from 'gulp'
import chalk from 'chalk'

gulp.task('report', function (done) {
  console.log(
    chalk.green.bold(
      '\n' +
      '+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++' +
      '\n' + '\n'
    ) +
    chalk.gray(
      '✅ Markup files copied' + '\n' +
      '✅ Styles minified and optimized' + '\n' +
      '✅ Scripts compiled and minified' + '\n' +
      '✅ Images copied and compressed' + '\n' +
      '✅ Social share assets copied' + '\n' +
      '✅ Font files copied' + '\n' +
      '✅ Documents files copied' + '\n' +
      '✅ Htaccess file created' + '\n' +
      '✅ Favicons and identity assets created' + '\n' +
      '✅ Humans, robots and other files created' + '\n'
    ) +
    chalk.green.bold(
      '\n' + '\n' +
      '✅ SUCCESSFUL BUILD!!!' + '\n' +
      '\n' +
      '+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++' +
      '\n'
    )
  )
  done()
})
