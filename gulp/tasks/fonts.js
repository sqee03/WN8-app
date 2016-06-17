var config = require('../config');
var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');

var glyphicons_path = './dist/bower_components/glyphicons-halflings-regular.*';

gulp.task('glyphicons-move', function() {
    return gulp.src(glyphicons_path)
        .pipe(gulp.dest('dist/fonts/bootstrap'))
});

gulp.task('glyphicons-clean', function() {
    return del.sync(glyphicons_path);
});

gulp.task('glyphicons', function(callback) {
    runSequence('glyphicons-move',
                'glyphicons-clean',
                callback);
});