const paths = {
  src: {
    base: 'src',
    markup: 'src/*.{html,htm,php,md}',
    htaccess: 'src/.htaccess',
    scripts: 'src/assets/js/**/*.js',
    styles: 'src/assets/scss/**/*.scss',
    fonts: 'src/assets/fonts/**/*.{otf,ttf,svg,eot,woff,woff2}',
    images: 'src/assets/images/**/*.{jpg,png,gif,jpeg,webp,svg}',
    social: 'src/assets/social/**/*.jpg',
    docs: 'src/assets/docs/**/*.{pdf,xls,xlsx,doc,docx}',
    icons: 'src/assets/icons/'
  },

  dev: {
    base: 'dev',
    markup: 'dev',
    scripts: 'dev/js',
    styles: 'dev/css',
    fonts: 'dev/fonts',
    images: 'dev/images',
    docs: 'dev/docs',
    icons: 'dev'
  },

  dist: {
    base: 'public',
    markup: 'public',
    scripts: 'public/js',
    styles: 'public/css',
    fonts: 'public/fonts',
    images: 'public/images',
    docs: 'public/docs',
    icons: 'public'
  }
}

export default paths
