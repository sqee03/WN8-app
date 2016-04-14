var config = require('../config');
var gulp = require('gulp');
var inject = require('gulp-inject');

gulp.task('inject', function () {
  var target = gulp.src(config.source.tpl.main);
  var sources = gulp.src([config.build.js, config.build.css], {read: false});

  return target.pipe(inject(sources))
    .pipe(gulp.dest('dist'));
});