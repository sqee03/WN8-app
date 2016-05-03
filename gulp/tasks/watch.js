var config = require('../config');
var gulp = require('gulp');
var browserSync = require('browser-sync').create();

// Watch them all!
gulp.task('watch', function() {
    gulp.watch(config.source.sass.src, ['sass']);
    gulp.watch(config.source.js.src, ['js']);
    gulp.watch(config.source.json, ['json']);
    gulp.watch(config.source.tpl.src, ['html2js']);
    gulp.watch(config.source.tpl.main, ['inject']);
});

// Watch CSS
gulp.task('watch-sass', function() {
    gulp.watch(config.source.sass.src, ['sass']);
});

// Watch JS
gulp.task('watch-js', function() {
    gulp.watch(config.source.js.src, ['js']);
});

// Watch JSON
gulp.task('watch-json', function() {
    gulp.watch(config.source.json, ['json']);
});

// Html watch
gulp.task('watch-html', function() {
    gulp.watch(config.source.tpl.src, ['html2js']);
});

// Index watch
gulp.task('watch-index', function() {
    gulp.watch(config.source.tpl.main, ['inject']);
});