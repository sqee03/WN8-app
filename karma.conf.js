module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],
    reporters: ['spec'],

    files: [
        // Bower dependencies are loaded from DIST instead of Bower folder
        // In this case we can include only dependencies which we really need
        'dist/bower_components/angular.js',

        // Angular mocks
        'node_modules/angular-mocks/angular-mocks.js',

        // App main file just for tests
        'tests/appSpec.js',

        // Template cache
        'dist/templates/templates.js',

        // App files
        'app/**/*.js',

        // Tests
        'tests/**/*.js'
    ],

    // List of files to exclude
    exclude: [
        'app/app.js'
    ]
  });
};