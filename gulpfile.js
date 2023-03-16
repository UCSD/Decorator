
const { series } = require('gulp');

var gulp = require('gulp'),
    autoprefixer = ('gul-autoprefixer'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    useref = require('gulp-useref'),
    gulpIf = require('gulp-if'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    cssnano = require('gulp-cssnano'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    changed = require('gulp-changed'),
    runSequence = require('gulp4-run-sequence'),
    uglify = require('gulp-uglify');
    zip = require('gulp-zip');



// Banner Info ----------------------------------------
// -----------------------------------------------------------

//Include package.json
var pkg = require('./package.json');

var decoVersion = pkg.version;

// Development Tasks ----------------------------------------
// -----------------------------------------------------------

function css() {
  return gulp.src('app/styles/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass, log errors to console
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass())
    .pipe(sourcemaps.write({includeContent: false}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('app/css')) // Outputs it in the css folder
    .pipe(gulp.dest('dist/css')) // Outputs it in the css folder
    .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
      server: {
        baseDir: 'app'
      }
    });
    gulp.watch('app/**/*.scss', css);
    gulp.watch('app/**/*.html').on('change', browserSync.reload);
    gulp.watch('app/scripts/**/*.js').on('change', browserSync.reload);
}

// Optimization Tasks ----------------------------------------
// -----------------------------------------------------------

// Optimizing CSS and JavaScript
function userefS() {

  return gulp.src('./app/**/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano({
           discardComments: {removeAll: true}
       })))
    .pipe(gulp.dest('dist'));
}

// Optimizing Images
gulp.task('images', function() {
  return gulp.src('app/styles/img/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
      interlaced: true,
    })))
    .pipe(gulp.dest('dist/css/img'))
});

// Copying fonts

function fonts() {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
}

// Copy images

function buildImg() {
  return gulp.src('app/css/img/*.{gif,jpg,png,svg}')
      .pipe(gulp.dest('dist/img'));
}

function buildImg() {
  return gulp.src('app/img/*.{gif,jpg,png,svg}')
      .pipe(gulp.dest('dist/img'));
}

// Cleaning

// function clean:dist() {
//   gulp.task('clean:dist', function() {
//     return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
// }

// Archives distribution package

exports.zip = () => (
  gulp.src('dist/**/*')
      .pipe(zip('Decorator-V' + decoVersion + '.1.zip'))
      .pipe(gulp.dest('.'))
);



/// Concat Vendor Scripts

function concatVendorScripts() {
  return gulp.src([
    './app/vendor/fastclick/lib/fastclick.js',
    './app/vendor/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js',
    './app/vendor/jasny-bootstrap/js/jasny-bootstrap.min.js',
    './app/vendor/jquery-match-height/jquery.matchHeight.js'
  ])
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest('./dist/scripts'));
}


// Build Sequences --------------------------------------------
// -----------------------------------------------------------

// //Default
// gulp.task('default', gulp.series(function(callback) {
//   runSequence(['sass', 'browserSync'], 'watch',
//   callback);
// }));


// // Live Development with BrowserSync
// gulp.task('dev', gulp.series('browserSync','styles', function() {
//   // Reloads the browser whenever CSS, HTML or JS files change
//   gulp.watch('app/styles/**/*.scss', gulp.series(['sass']));
//   gulp.watch('app/styles/**/*.scss');
//   gulp.watch("app/**/*.html").on('change', browserSync.reload);
//   gulp.watch('app/**/*.html', browserSync.reload);
//   gulp.watch('scripts/**/*.js', browserSync.reload);
// }));

// // Final Build Task
// gulp.task('build', function(callback) {
//   runSequence(
//     'clean:dist',
//     'styles',
//     ['useref', 'fonts', 'build-images'],
//     'zip',
//     callback
//   )
// });

// define complex tasks


//const dev = gulp.series(watch, css);
//const build = gulp.parallel(watchFiles, browserSync);

// export tasks

exports.css = css;
exports.watch = watch;
exports.userefS = userefS;
exports.fonts = fonts;
exports.buildImg = buildImg;
exports.dev = series(watch, css);
exports.concat = series(concatVendorScripts);

exports.build = series(css, userefS, fonts, buildImg);
