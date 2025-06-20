import gulp from 'gulp'
import file from 'gulp-file'
import { withLogs } from './report_new.js'

import paths from '../gulppaths.js'

import dotenv from 'dotenv-flow'
dotenv.config()


// GENERATE ROBOTS.TXT
function createRobotsTxt() {
  var fileContent = 'User-agent: *\nAllow: /'

  return withLogs('genrerateRobotsTxt',
    file('robots.txt', fileContent, { src: true })
      .pipe(gulp.dest(paths.prod.base))
  )
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

  return withLogs('genrerateHumansTxt',
    file('humans.txt', fileContent, { src: true })
      .pipe(gulp.dest(paths.prod.base))
  )
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
- Process markup files
- Compiles styles and scripts
- Copies assets files (images, fonts, and docs)
- Starts the development server
- Watches for files changes
&nbsp;  
&nbsp;  

### 🏗️&nbsp;&nbsp;Production Build
    yarn prod
- Cleans the **prod/** folder
- Process and copy markup files
- Compiles and minifies styles and scripts
- Optimizes images while preserving format
- Optimizes and copies files for social sharing
- Generates .htaccess and text based meta files
- Generates browser and applications favicons
- Copies static files (fonts, docs, etc.)
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
- **Dotenv Flow:** Environment variables management
- **Gulp + Plugins:** Tasks manager and markup templates management
- **BrowserSync:** Live server with reload
- **Sharp:** Bitmap images optimization and transformation
- **SASS + Postcss:** SCSS styles management
- **PNG-to-ICO:** Converts PNG images to ICO format
&nbsp;  
&nbsp;  

### 📂&nbsp;&nbsp;Project Structure
    src/
    ├── _partials/    → Reusable HTML partials
    ├── docs/         → Document files
    ├── fonts/        → Font files
    ├── icons/        → Base files for favicons
    ├── images/       → Images to optimize
    ├── scripts/      → Frontend JavaScript files
    ├── social/       → Social share files
    └── styles/       → SCSS stylesheets

    tasks/            → Helper functions for Gulp

    index.html        → HTML pages
    page.php          → PHP pages
`;
  return withLogs('generateReadmeMd',
    file('readme.md', fileContent, { src: true })
      .pipe(gulp.dest(paths.prod.base))
  )
}


// BUILDER
export async function generateMetaFiles(){
  await createRobotsTxt(), 
  await createHumansTxt(), 
  await createReadmeMd()
} 
