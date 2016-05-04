var config = require('../config');
var gulp = require('gulp');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');

gulp.task('images', function() {
    return gulp.src(config.source.images)
        .pipe(rename({
            dirname: 'img',
        }))
        .pipe(imagemin())
        .pipe(gulp.dest('dist'))
});