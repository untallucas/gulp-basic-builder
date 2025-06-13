import gulp from 'gulp'
import file from 'gulp-file'

import paths from '../gulppaths.js'

import dotenv from 'dotenv'
dotenv.config()


// GENERATE ROBOTS.TXT
function createRobotsTxt() {
  var fileContent = 'User-agent: *\nAllow: /'
  return file('robots.txt', fileContent, { src: true })
    .pipe(gulp.dest(paths.prod.base))
}


// GENERATE HUMANS.TXT
function createHumansTxt() {
  var currentDate = new Date()
  var fileContent =
    '/* TEAM */' +
    '\n' +
    'Developer: ' + process.env.APP_AUTHOR +
    '\n' +
    'Twitter: ' + process.env.APP_AUTHOR_TWITTER +
    '\n' +
    'From: ' + process.env.APP_AUTHOR_LOCATION +
    '\n\n' +
    '/* SITE */' +
    '\n' +
    'Last update: ' + currentDate +
    '\n' +
    'Language: ' + process.env.APP_LANGUAGE
  return file('humans.txt', fileContent, { src: true })
    .pipe(gulp.dest(paths.prod.base))
}


// GENERATE README.MD
function createReadmeMd() {
const fileContent =
`
# ${process.env.APP_TITLE}
## ${process.env.APP_DESCRIPTION}
&nbsp;

### 🧑‍💻&nbsp;&nbsp;Author
**Developer:** ${process.env.APP_AUTHOR}  
**Twitter/X:** https://x.com/${process.env.APP_AUTHOR_TWITTER}  
**Email:** ${process.env.APP_AUTHOR_EMAIL}  
**Location:** ${process.env.APP_AUTHOR_LOCATION}  
&nbsp;

### 💻&nbsp;&nbsp;Site Information
**Last update:** ${new Date().toDateString()}  
**Language:** ${process.env.APP_LANGUAGE}  
**License:** MIT  
&nbsp;

### 🚀&nbsp;&nbsp;Builder Features
- Modular structure for build tasks
- Automatic watch of styles, scripts, and images
- Development mode with live server
- Production mode with image optimization, icon processing, and meta files generation
- Smart build cleanup
- Minification of HTML, CSS, and JS
&nbsp;  
&nbsp;  

### 📦&nbsp;&nbsp;Install
    yarn install
- Install packages and dependencies
&nbsp;  
&nbsp;  

### 👨‍💻&nbsp;&nbsp;Development Mode
    yarn dev
- Cleans the **dev/** folder
- Compiles styles and scripts
- Copies markup files
- Copies assets files (images, fonts, and docs)
- Generates sourcemaps for styles and scripts
- Starts the development server
- Actives watcher for files changes
&nbsp;  
&nbsp;  

### 🏗️&nbsp;&nbsp;Production Build
    yarn prod
- Cleans the **prod/** folder
- Compiles and minifies styles and scripts
- Minifies markup files
- Optimizes images while preserving format
- Copies static files (fonts, docs, etc.)
- Copies social share assets
- Generates site icons
- Generates meta files
&nbsp;  
&nbsp;  

### 🧼&nbsp;&nbsp;Cleanup Scripts
    yarn restart
- Deletes the **dev/** and **prod/** folders
<!-- end of the list -->
&nbsp;

    yarn reset
- Deletes everything (dev, prod, node_modules, .cache, yarn.lock) and cleans cache
<!-- end of the list -->
&nbsp;

### 🛠️&nbsp;&nbsp;Key Dependencies
- **CrossEnv:** Environment variables management
- **Gulp + Plugins:** Tasks manager
- **BrowserSync:** Live server with reload
- **Imagemin + Sharp + Plugins:** Image optimization
- **SASS + Postcss:** For SCSS styles manegement
- **Favicons:** For generating multiple icons from a single image
- **PNG-to-ICO:** Converts PNG images to ICO format
- **Through2:** Stream utility for transforming files
&nbsp;  
&nbsp;  

### 📂&nbsp;&nbsp;Project Structure
    src/
      ├── docs/            # Assorted static files
      ├── fonts/           # Fonts files
      ├── icons/           # Favicons base
      ├── images/          # Images
      ├── scripts/         # Frontend Javascript
      ├── styles/          # SCSS styles
      ├── _components/     # HTML partials
      └── _templates/      # HTML layouts
    tasks/                 # Helper functions
    index.html             # HTML pages
`;
  return file('readme.md', fileContent, { src: true })
    .pipe(gulp.dest(paths.prod.base))
}


// BUILDER
export const generateMetaFiles = 
  gulp.series(
    createRobotsTxt, 
    createHumansTxt, 
    createReadmeMd
  )
