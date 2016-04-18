var config = require('../config');
var gulp = require('gulp');
var rename = require('gulp-rename');

gulp.task('json', function() {
    return gulp.src(config.source.json)
        .pipe(rename({
            dirname: 'json',
        }))
        .pipe(gulp.dest('dist'))
});