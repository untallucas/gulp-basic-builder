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
    icons: 'src/icons'
  },

  dev: {
    base: 'dev',
    scripts: 'dev/js',
    styles: 'dev/css',
    fonts: 'dev/fonts',
    images: 'dev/images',
    docs: 'dev/docs'
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
