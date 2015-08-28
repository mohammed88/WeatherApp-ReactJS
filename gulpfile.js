var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var server = require('gulp-server-livereload');

gulp.task('browserify', function() {
    browserify('./src/js/main.js')
      .transform('reactify')
      .bundle()
      .pipe(source('main.js'))
      .pipe(gulp.dest('dist/js'));
});

gulp.task('copy',function() {
    gulp.src('src/index.html')
      .pipe(gulp.dest('dist'));
    gulp.src('src/assets/**/*.*')
      .pipe(gulp.dest('dist/assets'));
    gulp.src('src/css/**/*.*')
      .pipe(gulp.dest('dist/css'));
});

gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(server({
      livereload: true,
      open: true
    }));
});

gulp.task('default',['browserify', 'copy', 'webserver'], function() {
    return gulp.watch('src/**/*.*', ['browserify', 'copy'])
});

