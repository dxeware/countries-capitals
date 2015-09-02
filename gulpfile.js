var gulp = require('gulp');
var connect = require('gulp-connect');
//var gutil = require('gulp-util');

// connect
gulp.task('connect', function() {
  connect.server({
    root: 'app/'
  });
});
gulp.task('default', ['connect']);
