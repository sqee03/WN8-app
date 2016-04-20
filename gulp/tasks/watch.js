var config = require('../config');
var gulp = require('gulp');
var browserSync = require('browser-sync').create();

// Watch them all!
gulp.task('watch', function() {
    gulp.watch(config.source.sass, ['sass']);
    gulp.watch(config.source.js.src, ['js']);
    gulp.watch(config.source.json, ['json']);
    gulp.watch([config.source.tpl.main, config.source.tpl.src], ['inject']).on('change', browserSync.reload);
});

// Watch CSS
gulp.task('watch-css', function() {
    gulp.watch(config.source.sass, ['sass']);
});

// Watch JS
gulp.task('watch-js', function() {
    gulp.watch(config.source.js.src, ['js']);
});

// Watch JSON
gulp.task('watch-js', function() {
    gulp.watch(config.source.json, ['json']);
});

// Html watch - with hard reload
gulp.watch([config.source.tpl.main, config.source.tpl.src]).on('change', browserSync.reload);