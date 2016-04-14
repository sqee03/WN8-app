var config = require('../config');
var gulp = require('gulp');

//Watch task
gulp.task('watch', ['clean', 'inject'], function() {
    gulp.watch(config.source.sass, 'sass');
});