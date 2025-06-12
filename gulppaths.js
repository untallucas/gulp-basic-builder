const paths = {
  src: {
    base: 'src',
    markup: 'src/*.{html,htm,php,md}',
    scripts: 'src/scripts/**/*.js',
    styles: 'src/styles/**/*.scss',
    fonts: 'src/fonts/**/*.{otf,ttf,svg,eot,woff,woff2}',
    images: 'src/images/',
    social: 'src/social/',
    docs: 'src/docs/**/*.{pdf,xls,xlsx,doc,docx}',
    icons: 'src/icons/'
  },

  dev: {
    base: 'dev',
    markup: 'dev',
    scripts: 'dev/scripts',
    styles: 'dev/styles',
    fonts: 'dev/fonts',
    images: 'dev/images',
    docs: 'dev/docs'
  },

  prod: {
    base: 'prod',
    markup: 'prod',
    scripts: 'prod/scripts',
    styles: 'prod/styles',
    fonts: 'prod/fonts',
    images: 'prod/images',
    docs: 'prod/docs'
  }
}

export default paths
