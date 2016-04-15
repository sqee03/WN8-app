var config = require('../config');
var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

gulp.task('sass', ['clean'], function() {
    return gulp.src(config.source.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(rename({
            dirname: 'css',
        }))
        .pipe(gulp.dest('dist'))
});