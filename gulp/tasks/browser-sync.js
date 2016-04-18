var config = require('../config');
var gulp = require('gulp');
var browserSync = require('browser-sync').create();

// Static server
gulp.task('browserSync', function() {

    var files = [
        config.build.vendor_js,
        config.build.vendor_css,
        config.build.json,
        config.build.js,
        config.build.css,
        config.build.html
    ];

    browserSync.init(files, {
        server: 'dist'
    });

    // Sass watch
    // gulp.watch('app/**/*.scss', ['sass']).on('change', browserSync.reload);

    // Html watch - with hard reload
    // gulp.watch('app/**/*.html').on('change', browserSync.reload);
});