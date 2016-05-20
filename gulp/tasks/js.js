var config = require('../config');
var gulp = require('gulp');
var rename = require('gulp-rename');

gulp.task('js', function() {
    return gulp.src([config.source.js.main, config.source.js.src, '!'+config.source.js.tests])
        .pipe(rename({
            dirname: 'js'
        }))
        .pipe(gulp.dest('dist'))
});