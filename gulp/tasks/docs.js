var config = require('../config');
var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var shell = require('gulp-shell');

gulp.task('clean-docs', function() {
    return del.sync(config.docs.main);
});

gulp.task('generate-docs', shell.task([
  './node_modules/jsdoc/jsdoc.js ' +
    '-c ./docs/docsConfig.json'
]));

gulp.task('docs', function(cb) {
    runSequence('clean-docs',
                'generate-docs',
                cb);
});