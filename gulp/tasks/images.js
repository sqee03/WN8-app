var config = require('../config');
var gulp = require('gulp');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');

gulp.task('images', ['favicon'], function() {
    return gulp.src(config.source.images.src)
        .pipe(rename({
            dirname: 'img',
        }))
        .pipe(imagemin())
        .pipe(gulp.dest('dist'))
});

gulp.task('favicon', function() {
    return gulp.src(config.source.images.favicon)
        .pipe(gulp.dest('dist'))
});