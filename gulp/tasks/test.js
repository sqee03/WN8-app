var config = require('../config');
var gulp = require('gulp');
var karmaServer = require('karma').Server;

// Karma watch
gulp.task('test', function(done) {
    return new karmaServer({
        configFile: require('path').resolve('karma.conf.js'),
    }, done).start();
});

// Run tests once and exit
gulp.task('test-once', function(done) {
    return new karmaServer({
        configFile: require('path').resolve('karma.conf.js'),
        singleRun: true
    }, done).start();
});