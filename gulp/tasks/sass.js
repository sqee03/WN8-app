var config = require('../config');
var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

var sassOpts = {
    outputStyle: 'nested',
    precison: 3,
    errLogToConsole: true,
    includePaths: config.source.sass.bootstrap
};

gulp.task('sass', function() {
    return gulp.src(config.source.sass.src)
        .pipe(sass(sassOpts))
        .pipe(rename({
            dirname: 'css'
        }))
        .pipe(gulp.dest('dist'))
});