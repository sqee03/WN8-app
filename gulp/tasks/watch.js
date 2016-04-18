var config = require('../config');
var gulp = require('gulp');

// Watch them all!
gulp.task('watch', function() {
    gulp.watch(config.source.sass, ['sass']);
    gulp.watch(config.source.js.src, ['js']);
    gulp.watch(config.source.json, ['json']);
});

// Watch CSS
gulp.task('watch-css', function() {
    gulp.watch(config.source.sass, ['sass']);
});

// Watch JS
gulp.task('watch-js', function() {
    gulp.watch(config.source.js.src, ['js']);
});