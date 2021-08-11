// PATHS
module.exports = {
  src: {
    base: 'src',
    markup: 'src',
    fonts: 'src/assets/fonts',
    icons: 'src/assets/icons',
    images: 'src/assets/images',
    scripts: 'src/assets/js',
    styles: 'src/assets/scss',
    plugins: 'src/assets/plugins',
    docs: 'src/assets/docs',
    vendor: {
      styles: [
        // './node_modules/bootstrap-sass/assets/stylesheets',
        // './node_modules/slick-carousel/slick'
      ],
      scripts: [
        // './node_modules/jquery/dist/jquery.js',
        // './node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',
        // './node_modules/slick-carousel/slick/slick.js',
        // './node_modules/scrollmonitor/scrollMonitor.js',
        // './node_modules/scrollmonitor-parallax/index.js',
        // './node_modules/jquery.scrollto/jquery.scrollTo.js',
        // './node_modules/gsap/dist/gsap.min.js',
        // './node_modules/headroom.js/dist/jQuery.headroom.min.js',
        // './node_modules/headroom.js/dist/headroom.min.js',
        // './node_modules/moment/moment.js'
      ],
      static: [
        // './node_modules/bootstrap-sass/assets/fonts/**/*',
        // './node_modules/slick-carousel/slick/fonts/**/*'
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
    plugins: 'dev/plugins'
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
    plugins: 'dist/plugins'
  }
}
