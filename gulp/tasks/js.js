var config = require('../config');
var gulp = require('gulp');
var rename = require('gulp-rename');

gulp.task('js', ['clean'], function() {
    return gulp.src([config.source.js.main, config.source.js.src])
        .pipe(rename({
            dirname: 'js',
        }))
        .pipe(gulp.dest('dist'))
});