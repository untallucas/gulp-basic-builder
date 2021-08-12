module.exports = {
  src: {
    base: 'src',
    markup: 'src/*.{html,htm,php,md}',
    htaccess: 'src/.htaccess',
    scripts: 'src/assets/js/**/*.js',
    styles: 'src/assets/scss/**/*.scss',
    fonts: 'src/assets/fonts/**/*',
    images: 'src/assets/images/**/*.{jpg,png,gif,jpeg,svg}',
    docs: 'src/assets/docs/**/*.{pdf,xls,xlsx,doc,docx}',
    icons: 'src/assets/icons',
    vendor: {
      styles: [
        './node_modules/bootstrap-sass/assets/stylesheets',
        './node_modules/slick-carousel/slick'
      ],
      scripts: [
        './node_modules/jquery/dist/jquery.js',
        './node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',
        './node_modules/slick-carousel/slick/slick.js',
        './node_modules/scrollmonitor/scrollMonitor.js',
        './node_modules/scrollmonitor-parallax/index.js',
        './node_modules/jquery.scrollto/jquery.scrollTo.js',
        './node_modules/gsap/src/uncompressed/TweenMax.js',
        './node_modules/headroom.js/dist/jQuery.headroom.min.js',
        './node_modules/headroom.js/dist/headroom.min.js',
        './node_modules/moment/moment.js'
      ],
      static: [
        './node_modules/bootstrap-sass/assets/fonts/**/*',
        './node_modules/slick-carousel/slick/fonts/**/*'
      ]
    }
  },

  dev: {
    base: 'dev',
    markup: 'dev',
    fonts: 'dev/fonts',
    icons: 'dev/icons',
    images: 'dev/images',
    scripts: 'dev/js',
    styles: 'dev/css',
    docs: 'dev/docs',
  },

  dist: {
    base: 'dist',
    markup: 'dist',
    fonts: 'dist/fonts',
    icons: 'dist/icons',
    images: 'dist/images',
    scripts: 'dist/js',
    styles: 'dist/css',
    docs: 'dist/docs',
  }
}
