import chalk from 'chalk'

export function report(done) {
  console.log(
    chalk.green.bold(
      '\n' +
      '+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++' +
      '\n' + '\n'
    ) +
    chalk.gray(
      '✅ Markup files processed and copied' + '\n' +
      '✅ Javascript files compiled and minified' + '\n' +
      '✅ CSS styles compiled and minified' + '\n' +
      '✅ Images optimized and copied' + '\n' +
      '✅ Social share assets optimized and copied' + '\n' +
      '✅ .htaccess file created' + '\n' +
      '✅ Browser and applications favicons created' + '\n' +
      '✅ Text files (robots.txt, humans.txt, readme.md) created' + '\n' +
      '✅ Fonts files copied' + '\n' +
      '✅ Other documents files copied' + '\n'
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
}
