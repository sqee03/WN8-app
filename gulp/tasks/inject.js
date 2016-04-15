var config = require('../config'),
    gulp = require('gulp'),
    angularFilesort = require('gulp-angular-filesort'),
    order = require('gulp-order');
    inject = require('gulp-inject');
    es = require('event-stream');

gulp.task('inject', ['build'], function () {
    var target = gulp.src(config.source.tpl.main);
    var vendor_js = gulp.src(config.build.vendor_js)
                    .pipe(order([
                        'angular.js',
                        '*.js'
                    ]))
    var vendor_css = gulp.src(config.build.vendor_css, {read: false});
    var sources_js = gulp.src(config.build.js)
                    .pipe(angularFilesort());
    var sources_css = gulp.src(config.build.css);

  return target
    .pipe(inject(es.merge(
        vendor_js,
        vendor_css
    ), {relative: true, name: 'bower'}))
    .pipe(inject(es.merge(
        sources_js,
        sources_css
    ), {relative: true}))
    .pipe(gulp.dest('dist'));
});