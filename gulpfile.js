var gulp = require('gulp'),
    requireDir = require('require-dir');

requireDir('./gulp/tasks', {recurse: true});

// Default build for development
gulp.task('default', ['clean', 'build']);