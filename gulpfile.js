var gulp = require('gulp');
var minifycss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var htmlclean = require('gulp-htmlclean');
var gzip = require('gulp-gzip');

var gzip_config = {
  threshold: '5kb',
  gzipOptions: { level: 8 },
  skipGrowingFiles : true
}

gulp.task('minify-css', function() {
  return gulp.src('./public/**/*.css')
  .pipe(minifycss())
  .pipe(gzip(gzip_config))
  .pipe(gulp.dest('./public'));
});

gulp.task('minify-html', function() {
  return gulp.src('./public/**/*.html')
  .pipe(htmlclean())
  .pipe(htmlmin({
    removeComments: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true,
  }))
  .pipe(gzip(gzip_config))
  .pipe(gulp.dest('./public'))
});

gulp.task('minify-js', function() {
  return gulp.src('./public/**/*.js')
  .pipe(uglify())
  .pipe(gzip(gzip_config))
  .pipe(gulp.dest('./public'));
});

gulp.task('default', [
  'minify-html','minify-css','minify-js'
]);
