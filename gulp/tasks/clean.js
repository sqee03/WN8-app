var config = require('../config');
var gulp = require('gulp');
var clean = require('gulp-clean');

gulp.task('clean', function() {
    return gulp.src(config.build.main, {read: false})
        .pipe(clean());
});