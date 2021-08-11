// PATHS
module.exports = {
  src: {
    base: 'src',
    markup: 'src/*.{html,htm,php,md}',
    htaccess: 'src/.htaccess',
    modules: 'src/modules/',
    scripts: 'src/js/**/*.js',
    styles: 'src/scss/**/*.scss',
    fonts: 'src/fonts/**/*',
    images: 'src/images/**/*',
    docs: 'src/docs/**/*',
    // icons: 'src/icons'
  },

  dev: {
    base: '../bichocanasto',
    scripts: '../bichocanasto',
    styles: '../bichocanasto',
    fonts: '../bichocanasto/fonts',
    images: '../bichocanasto/images',
    docs: '../bichocanasto/docs'
  },

  dist: {
    base: 'docs',
    scripts: 'docs/js',
    styles: 'docs/css',
    fonts: 'docs/fonts',
    images: 'docs/images',
    docs: 'docs/docs'
  }
}
