var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    cssnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    del = require('del'),
    runSequence = require('run-sequence'),
    zip = require('gulp-zip');
//var banner = require('gulp-banner');

// Banner Info ----------------------------------------
// -----------------------------------------------------------

//Include package.json
var pkg = require('./package.json');

var decoVersion = pkg.version;

// Development Tasks ----------------------------------------
// -----------------------------------------------------------

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  })
});

gulp.task('sass', function() {
  return gulp.src('app/styles/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass, log errors to console
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass())
    .pipe(sourcemaps.write({includeContent: false}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('app/css')) // Outputs it in the css folder
    .pipe(gulp.dest('dist/css')) // Outputs it in the css folder
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
});

// Watchers
gulp.task('watch', function() {
  gulp.watch('app/styles/**/*.scss', ['sass']);
  gulp.watch('app/scripts/**/*.js', browserSync.reload);
});

// Optimization Tasks ----------------------------------------
// -----------------------------------------------------------

// Optimizing CSS and JavaScript
gulp.task('useref', function() {

  return gulp.src('./app/**/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano({
           discardComments: {removeAll: true}
       })))
    .pipe(gulp.dest('dist'));
});

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
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
});

// Copy images

gulp.task('build-images', function() {
  return gulp.src('app/css/img/*.{gif,jpg,png,svg}')
      .pipe(gulp.dest('dist/img'));
});

gulp.task('build-images', function() {
  return gulp.src('app/img/*.{gif,jpg,png,svg}')
      .pipe(gulp.dest('dist/img'));
});

// Cleaning
gulp.task('clean', function() {
  return del.sync('dist').then(function(cb) {
    return cache.clearAll(cb);
  });
});

gulp.task('clean:dist', function() {
  return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});

// Archives distribution package

gulp.task('zip', () =>
    gulp.src('dist/**/*')
        .pipe(zip('Decorator-V' + decoVersion + '.zip'))
        .pipe(gulp.dest('.'))
);

exports.zip = () => (
  gulp.src('dist/**/*')
      .pipe(zip('Decorator-V' + decoVersion + '.zip'))
      .pipe(gulp.dest('.'))
);

// Build Sequences --------------------------------------------
// -----------------------------------------------------------

//Default
gulp.task('default', function(callback) {
  runSequence(['sass', 'browserSync'], 'watch',
    callback
  )
});

// Live Development with BrowserSync
gulp.task('dev', ['browserSync', 'sass'], function() {
    // Reloads the browser whenever CSS, HTML or JS files change
    gulp.watch('app/styles/**/*.scss', ['sass']);
    gulp.watch("app/**/*.html").on('change', browserSync.reload);
    gulp.watch('app/**/*.html', browserSync.reload);
    gulp.watch('scripts/**/*.js', browserSync.reload);
});

// Final Build Task
gulp.task('build', function(callback) {
  runSequence(
    'clean:dist',
    'sass',
    ['useref', 'fonts', 'build-images'],
    'zip',
    callback
  )
});
