var config = require('../config');
var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function(callback) {
    runSequence(['js', 'json','sass','vendor'],
                callback);
});