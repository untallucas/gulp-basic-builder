import gulp from 'gulp'
import file from 'gulp-file'

import paths from '../gulppaths.js'

const isProduction = process.env.NODE_ENV === 'prod'

export function generateHtaccess() {
  var targetFolder = isProduction ? paths.prod.base : paths.dev.base
  var fileContent =
    '# TURN ON URL REWRITING\n' +
    'RewriteEngine On\n' +
    '\n' +
    '# REMOVE THE NEED FOR .PHP FILE EXTENTION\n' +
    'RewriteCond %{REQUEST_FILENAME} !-d\n' +
    'RewriteCond %{REQUEST_FILENAME}\.php -f\n' +
    'RewriteRule ^(.*)$ $1.php\n'

  return file('.htaccess', fileContent, { src: true })
  .pipe(gulp.dest(targetFolder))
}
