var config = require('../config');
var gulp = require('gulp');
var bowerFiles = require('main-bower-files');

gulp.task('vendor', ['clean'], function () {
  return gulp.src(bowerFiles())
        .pipe(gulp.dest('dist/bower_components'));
});