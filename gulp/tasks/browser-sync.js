var config = require('../config');
var gulp = require('gulp');
var browserSync = require('browser-sync').create();

// Static server
gulp.task('sync', function() {

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
});