var config = require('../config');
var gulp = require('gulp');

//Watch CSS
gulp.task('watch-css', function() {
    gulp.watch(config.source.sass.src, ['sass']);
});

//Watch JS
gulp.task('watch-js', function() {
    gulp.watch(config.source.js.src, ['js']);
});