var config = require('../config');
var gulp = require('gulp');
var rename = require('gulp-rename');
var templateCache = require('gulp-angular-templatecache');

gulp.task('html2js', function () {
  return gulp.src([config.source.tpl.src, '!' + config.source.tpl.main])
    .pipe(templateCache('templates.js', {module: 'templateCache', standalone: true}))
    .pipe(rename({
            dirname: 'templates',
        }))
    .pipe(gulp.dest('dist'));
});